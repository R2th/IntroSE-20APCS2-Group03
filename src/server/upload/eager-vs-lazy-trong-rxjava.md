Trong vài năm trở lại đây, RxJava đang dần trở thành thành phần chính trong việc phát triển phần mềm Android. RxJava có một learning curve/đường cong học tập rất cao, và một phần là bởi vì bạn thực sự đang học hai điều khác nhau cùng một lúc. Đầu tiên là việc áp dụng các operator cho một luồng các giá trị. Điều này bao gồm thực hiện các tác vụ thông thường trong RxJava mà hầu hết mọi người đều quen thuộc.

```
Observable.just(1, 2, 3, 4, 5)6
    .map { it + 5 }
    .subscribe(::println)
// Prints 6, 7, 8, 9, 10
```

Tiếp đến là mô hình asynchronous threading. Ở đây, có nhu cầu hiểu sự khác biệt giữa eager evaluation and lazy evaluation, và để biết sâu thêm một chút về cách RxJava hoạt động. Trong bài đăng này, tôi muốn xây dựng một ví dụ để so sánh eager evaluation và lazy evaluation, từ đó cho thấy lý do tại sao chúng ta có thể muốn kiểm tra lại cách RxJava hoạt động trong các trường hợp khác nhau.

## Định nghĩa
Đầu tiên, tốt nhất là chúng ta sẽ xác định một số thuật ngữ. Eager evaluation có nghĩa là khi bạn gán một biểu thức cho một biến, biểu thức được thực thi để tính toán ngay lập tức và giá trị của Biến được đặt. Điều này mang đến sự tường mình cho deterministic behavior trong phần mềm mà chúng ta viết. Đây là điều mặc định trong hầu hết các ngôn ngữ lập trình như Java, Kotlin, hoặc là C. 
Mặt khác, lazy evaluation chỉ thực thi biểu thức vào thời điểm cuối cùng trước khi Biến của nó được cần đến. Nếu bạn không bao giờ truy cập vào 1 biến bất kì, thì dòng code định nghĩa cho biến đó sẽ không bao giờ được chạy. Đây là điều mặc định cho các ngôn ngữ lập trình giống như Haskell, và rất nhiều các ngôn ngữ lập trình hàm khác (functional programming languages). 
Đối với RxJava, có thể nói rằng các toán tử eager sẽ cố gắng làm mọi việc càng sớm càng tốt, trong khi các toán tử lazy có xu hướng chờ đến giây phút cuối cùng.

## Tối giản Requests
Hãy để tưởng tượng một tình huống trong đó chúng ta có nhiều requests tới network service. Trong khi chúng ta đang xử lý yêu cầu đó, thì chúng ta muốn bỏ qua mọi yêu cầu mới. Những trường hợp như vậy thì có thể lấy ví dụ như việc tải xuống các tham số cấu hình, hay là tải lên một số loại dữ liệu, v..v...

Điều đầu tiên mà chúng ta có thể nghĩ đến là sử dụng một debounce. Tuy nhiên, một debounce sẽ chờ đợi toàn bộ thời lượng của timeout đã cho, trước khi phát ra bất kỳ dữ liệu nào. Sau khi hết thời gian , nó sẽ phát ra item gần nhất mà nó nhận được. Điều này trái ngược với những gì mà chúng ta muốn, vì chúng ta muốn network request phải bắt đầu càng sớm càng tốt.

Một cách tiếp cận khác để giải quyết vấn đề này là sử dụng Flowable và một chiến lược áp lực thích hợp. Chúng ta có thể tạo "fake" 5 lệnh bấm nút cách nhau 10ms (mili giây) mội khi người người dùng nhấn nút 1 lần. Chúng ta cũng thêm một chiến lược cho áp lực của mình, thông qua onBackpressureDrop.

Backpressure xảy ra khi downstream (công cụ bên dưới lệnh gọi onBackpressureDrop) không thể xử lý các giá trị được phát ra từ upstream (công cụ phía trên gọi đến onBackpressureDrop) đủ nhanh. Trong trường hợp của chúng ta, chúng ta đã chỉ định rằng chúng nên được loại bỏ. Chúng ta cũng có Buffer, throw an error hoặc một cái gì đó khác, như được định nghĩa bởi BackpressureStrargety enum.

```
Flowable.interval(10, TimeUnit.MILLISECONDS)
    .take(5)
    .onBackpressureDrop()
```

Bây giờ, hãy để tưởng tượng chúng ta có một số nhiệm vụ dài hạn mà chúng ta muốn thực hiện trên mỗi lần phát xạ. Bởi vì chúng ta đang thực hiện network IO, chúng ta chắc chắn sẽ thực hiện công việc này trên IO threadpool.

```
fun webRequest(i: Long) = Single.create<Long> {
    println("Preparing $i")
    Thread.sleep(100)
    it.onSuccess(i)
}.subscribeOn(Schedulers.io())
```

Chúng ta có thể mang nó đến stream của chúng ta giống như: 

```
Flowable.interval(10, TimeUnit.MILLISECONDS)
    .take(5)
    .onBackpressureDrop()
    .flatMapSingle(::webRequest)
    .subscribe { println("Got $it") }
```

Great! Chúng ta có thể đăng ký và được kết quả là...

```
Preparing 2
Preparing 3
Preparing 0
Preparing 1
Preparing 4
Got 4
Got 2
Got 3
Got 0
Got 1
```

Uhmm! Có gì đó sai sai ở đây. Các số để không đúng so với order, và chúng ta đã xử lý mọi thứ, thay vì là xử lý từng thứ một tại một thời điểm. Vậy nên ta có thể thấy điều đầu tiên là, chúng ta chưa bao giờ thực sự nói với luồng code của mình rằng chúng ta chỉ muốn xử lý một giá trị tại một thời điểm. Ta có thể thử sử dụng một ResourceSubscriber để gọi phương thức request đó. Chúng ta sẽ sửa lại code phần subscribe thành: 

```
.subscribe(object : ResourceSubscriber<Long>() {

    override fun onStart() {
        println("Start")
        request(1)
    }

    override fun onComplete() {
        println("Completed")
    }

    override fun onNext(t: Long?) {
        println("Got $t")
        request(1)
    }

    override fun onError(t: Throwable?) {
        error("This should never happen")
    }
})
```

Và đây là kết quả sau khi chạy lại...

```
Start
Preparing 0
Preparing 1
Preparing 2
Preparing 3
Preparing 4
Got 1
Got 0
Got 2
Got 4
Got 3
Completed
```

Nooo! Output của chúng ta vẫn bị sai. Vậy chuyện gì đang xảy ra? Để ý tất cả các Preparing nằm ở đầu của phần Output. Điều này có nghĩa rằng  chúng ta đang gọi mỗi trạng thái của Preparing trước khi bất kì output nào khác được xử lý bởi hàm onNext() trong ResourceSubscriber. Đó là vấn đề, bởi vì điều đó có nghĩa là mỗi khi người dùng nhấn nút thì chúng ta sẽ thực hiện một network request.

Có một phương thức tiện dụng gọi là doOnRequest, nó sẽ giúp cho ta thấy lý do tại sao ta nhận được nhiều dữ liệu hơn mong muốn. Bằng cách gọi thêm doOnRequest vào một trong hai bên của flatMapSingle, chúng ta có thể hiểu rõ hơn về những gì đang diễn ra.

```
.doOnRequest { println("A: $it") }
.flatMapSingle(::webRequest)
.doOnRequest { println("B: $it") }
```

Và Output của chúng ta là...

```
Start
B: 1
A: 9223372036854775807
Preparing 2
Preparing 0
Preparing 1
Preparing 3
Preparing 4
Got 2
B: 1
Got 0
B: 1
Got 1
B: 1
Got 3
B: 1
Got 4
B: 1
Completed
```

Đó là số lớn. NÓ chỉ ra rằng flatMapSingle rất "Eager" để hoàn thành công việc. Điều quan trọng cần nhớ là mọi toán tử trong RxJava đều tạo ra một subscription nội bộ. Trong trường hợp của Flowables, subscription này bao gồm thực hiện gọi tới request để lấy một số dữ liệu từ upstream. Mặc định, flatMapSingle chỉ yêu cầu càng nhiều dữ liệu càng tốt. Để hạn chế điều này, chúng ta có thể sử dụng cách override hàm flatMapSingle.

```
.flatMapSingle(::webRequest, false, 1)
```

Ở đây, chúng ta nói với flatMapSingle rằng ta chỉ muốn 1 đối tượng tại 1 thời điểm (our maxConcurrency value). Chúng ta sẽ có Output như sau:

```
Start
B: 1
A: 1
Preparing 0
Got 0
B: 1
Completed
```

Trông có vẻ tốt hơn rất nhiều, và đó là những gì ta thực sự muốn ở phần đầu tiên. Trong thực tế, ta có thể đơn giản ví dụ trên. Ban đầu, ta đã cố gắng hạn chế việc tải dữ liệu với một ResourceSubscriber. Điều này là không cần thiết. Bới vì chúng ta đã nói với flatMapSingle rằng ta chỉ chấp nhận một item tại một thời điểm, chúng ta có thể loại bỏ subscriber này và sử dụng 1 subscribe đơn giản hơn.

```
Flowable.interval(10, TimeUnit.MILLISECONDS)
    .take(5)
    .onBackpressureDrop()
    .flatMapSingle(::webRequest, false, 1)
    .subscribe { println("Got $it") }
```

Có các phần overrides tương tự cho các phương thức flatMap khác mà bạn có thể sử dụng để có các hành vi tương tự. Điều đáng nói ở đây là bạn nên tìm kiếm cơ hội để hạn chế luồng dữ liệu và quyết định chiến lược áp lực càng sớm càng tốt. Nó sẽ dẫn đến ít xử lý trong thời gian dài.

## Kotlin: {} vs. ()
Một điểm bất đồng khác xuất hiện rất nhiều với RxJava là hàng tiếng thời gian bị lãng phí cho sự khác biệt giữa {} và () khi gọi các toán tử. Ví dụ tiếp theo này hy vọng sẽ làm sáng tỏ sự khác biệt.

Hãy xem xét hàm createdCompletable, tạo ra một Completable mà chỉ cần in ra một nhãn nhất định, sleep trong 100ms và sau đó hoàn tất.

```
fun createCompletable(label: String) =
    Completable.create {
        println("Created Completable $label")
        Thread.sleep(100)
        it.onComplete()
    }
```

Chúng ta có thể xây dựng một chuỗi các đối tượng Completable sử dụng andThen. Một triển khai hợp lệ có thể trông giống như vậy:

```
createCompletable("A")
    .andThen { createCompletable("B") }
    .subscribe()
```

Tuy nhiên, khi chúng ta thực thi, tất cả những gì chúng ta thấy là:

```
Created Completable A
```

Vậy chuyện gì đã xảy ra với B? Chà, ta đã sử dụng {} thay vì (). Trong Kotlin, cú pháp cho phép bạn di chuyển lambdas bên ngoài method’s () với điều kiện chúng là đối số cuối cùng. Trường hợp sự nhầm lẫn này xuất hiện trong andThen sử dụng một SAM interface, CompleteableSource. Interface này chỉ có 1 methol, với signature (CompletableObserver) -> Unit. Không có gì được trả về từ methol này, vì vậy việc gọi các câu lệnh tùy ý trong nó không có hiệu lực.

Trong ví dụ trên, ta gọi createCompletable("B"). Tuy nhiên, nó không bao giờ được thực thi, bởi vì nó không bao giờ được subscribed. RxJava thì mặc định là lazy. Tạo một Completable, Single, Maybe, v..v... chỉ tạo phương thức để xử lý luồng, nhưng không bắt đầu thực thi. Luồng không được tạo và các toán tử không được gọi cho đến khi một số bên quan tâm subscribes. Chúng ta có thể khắc phục trường hợp này theo một trong hai cách. Cách 1 là sử dụng các đối số đầu vào.

```
createCompletable("A")
    .andThen { createCompletable("B").subscribe(it) }
    .subscribe()
```

Cách 2 là sử dụng () thay cho {}

```
createCompletable("A")
    .andThen(createCompletable("B"))
    .subscribe()
```

Và kết quả chúng ta nhận được là:

```
Created Completable A
Created Completable B
```

## Tổng kết
RxJava là một thư viện đồ sộ, phức tạp. Nó đang cố gắng làm nhiều việc khác nhau, và đôi khi bản chất hữu ích của nó có thể cản trở bạn theo những cách không ngờ tới. Có thể tách biệt sáng tạo khỏi thực thi và hiểu các công cụ cần thiết để xác định khi nào RxJava không "lazy" như bạn muốn là chìa khóa cho trải nghiệm hạnh phúc, thành công. Tôi hy vọng rằng bài đăng này đã có thể giải thích một số sự mơ hồ.

Link source: https://proandroiddev.com/eager-vs-lazy-in-rxjava-cf077b4757ba