Operator là 1 phần không thể thiếu trong RxJava. Chúng ta có rất nhiều operators được chia ra làm nhiều loại. Trong bài viết này chúng ta sẽ tìm hiểu 2 loại và các operator quan trong trong đó.
## I. Suppressing operators:
Các operator loại này giúp chúng ta loại bỏ các phần tử được phát ra mà không thỏa mãn yêu cầu nào đó. Từ đó ngăn chặn các phần tử này không được gửi xuống Observer. 
### 1. filter():
Trong phần trước chúng ta đã sử dụng filter() qua rất nhiều ví dụ. filter() chấp nhận tham số đầu vào là 1 Predicate<T> để áp dụng cho từng phần tử được phát ra. Các phần tử thỏa mãn yêu cầu được định nghĩa trong hàm test() của interface Predicate sẽ được phép đi tiếp.
```
import io.reactivex.Observable;
public class Launcher {
 public static void main(String[] args) {
 Observable.just("Alpha", "Beta", "Gamma", "Delta", "Epsilon")
 .filter(s -> s.length() != 5)
 subscribe(s -> System.out.println("Nhan: " + s));
 }
}
```
 Kết quả: 
```
Nhan: Beta
Nhan: Epsilon    
```
###  2. take()
 Hàm take() có 2 phương thức nạp chồng: <br>
 Phương thức nạp chồng thứ nhất nhận 1 tham số đầu vào chỉ định chúng ta muốn nhận bao nhiêu phần tử được phát ra và sau đó gọi hàm onComplete() và không còn có bất kỳ phần tử nào đưuọc phát ra nữa. Ví dụ, take(3) sẽ lấy ra 3 phần tử đầu tiên: 
```
Observable.just("Alpha", "Beta", "Gamma", "Delta", "Epsilon")
 .take(3)
 .subscribe(s -> System.out.println("Nhan: " + s));
 }
```
 Kết quả: 
 ```
 Nhan: Alpha
 Nhan: Beta
 Nhan: Gamma   
```
 Phương thức còn lại nhận 2 tham số đầu vào chỉ định thời gian nhận các item được phát ra. Chúng ta thường sử dụng hàm interal() để kiểm soát được số phần tử sẽ phát ra sau khoảng thời gian nào đó: 
 ```
Observable.interval(300, TimeUnit.MILLISECONDS)
     .take(2, TimeUnit.SECONDS)
     .subscribe(i -> System.out.println("Nhan: " + i));
 sleep(5000);
    
 public static void sleep(long millis) {
     try {
         Thread.sleep(millis);
     } catch (InterruptedException e) {
     e.printStackTrace();
     }
 }
```
 Kết quả:
```
Nhan: 0
Nhan: 1
Nhan: 2
Nhan: 3
Nhan: 4
Nhan: 5
```
###  3. skip()
 Hàm skip() làm việc trái ngược với take() nó sẽ bỏ qua 1 số lượng phần tử nào đó được phát ra. Cũng như task(), skip() nhận 2 tham số đầu vào bỏ qua 1 khoảng thời gian không nhận các phần tử được phát ra và sau đó lại tiếp tục.
### 4. takeWhile() và skipWhile():
TRong trường hợp bạn muốn nhận các phần tử thỏa mãn điều kiện nào đó liên tục bạn có thể sử dụng 1 trong 2 hàm này: 
```
 Observable.range(1,100)
 .takeWhile(i -> i < 5)
 .subscribe(i -> System.out.println("RECEIVED: " + i));
```
 Tương tự với skipWhile(). Khi gặp bất kỳ 1 phần tử nào đó không thỏa mãn với yêu cầu hàm onComplete() sẽ được gọi trong trường hợp nếu sau đó có phần tử thỏa mãn chúng ta cũng không nhận phần tử đó nữa. Ví dụ như: 
```
 Observable.just(1, 5, 3, 1, 6, 2, 3)
                .takeWhile(integer -> integer <= 5)
                .subscribe(i -> System.out.println("Nhan: " + i));
```
 Kết quả:
```
Nhan: 1
Nhan: 5
Nhan: 3
Nhan: 1 
```
###  5. distinct()
 Hàm này sẽ giúp chúng ta chỉ nhận các loại phần tử 1 lần. Tức là với các phần tử bị lặp lại chúng ta chỉ nhận được 1 lần.  Việc so sánh các phần tử được phát ra như thế nào sẽ do bạn tự định nghĩa qua các hàm như hashCode()/ equals(). Ví dụ như bạn có 1 nhóm custom object Student. Đối tượng này được định nghĩa qua id, name, age. Bạn muốn in ra danh sách các học sinh không bị trùng: 
 ```
Observable.just(new Student(123, "tam", 23), new Student(113, "tam tam", 23) ,
                new Student(123, "ten ten", 23), new Student(123, "tam", 23))
                .distinct(Student::getId)
                .subscribe(i -> System.out.println("RECEIVED: " + i));
   
```
 Kết quả: 
```
RECEIVED: Student{id=123, name='tam', age=23}
RECEIVED: Student{id=113, name='tam tam', age=23}
```
### 6. distinctUntilChanged()
 Hàm này tương đối giống với hàm distinct() nhưng khi 1 phần tử được lặp lại nhiều lần gần nhau liên tục thì chỉ phần tử đó chỉ đưọc phát ra 1 lần duy nhất. Trong trường hợp nếu phần tử đó được lặp nhiều lần tại các vị trí khác nhau thì nó vẫn được phát ra tiếp. Hãy quan sát ví dụ: 
```
Observable.just(1, 1, 1, 2, 1, 3, 3, 2, 1, 1)
                .distinctUntilChanged()
                .subscribe(i -> System.out.println("RECEIVED: " + i));
```
 Kết quả: 
```
RECEIVED: 1
RECEIVED: 2
RECEIVED: 1
RECEIVED: 3
RECEIVED: 2
RECEIVED: 1
```
## II. Transforming operators
 Loại operator này giúp chúng ta chuyển đổi, biến đổi các phần tử được phát ra trước khi được chuyển tới Observer.
###  1. map()
 Đối với Observable<T> qua sử dụng map() chúng ta có thể chuyển đổi phần tử loại T sang loại R nào đó. Chúng ta đã sử dụng Operator này rất nhiều lần trước trong phần 1 ví dụ như trong biến đổi các chuỗi string sang số lượng các phần tử tương ứng của nó. 
### 2. cast()
Khi bạn có nhu cầu muốn chuyển đổi 1 phần tử dạng này sang dạng khác ví dụ như đổi 1 Observable<String> sang Observable<Object> chúng ta có thể sử dụng cast():
```
 Observable<Object> items =
                Observable.just("Alpha", "Beta", "Gamma").map(s -> (Object) s);
        items.subscribe(System.out::println);
```
 Kết quả:
```
 Alpha
Beta
Gamma
```
### 3. sorted()
Nếu bạn có 1 Observable<T> phát ra các phần tử CÓ GIỚI HẠN được implement từ Comparable<T> bạn có thể sử dụng sort() để sắp xếp các phần tử theo thứ tự. Như trong ví dụ dưới đây mình sẽ sử dụng hàm sort() để sắp xếp các đối tượng people theo tên:
```
 Observable.just(new People("Tam", 124, 21), new People("An", 321,25),
                new People("Linh", 423, 32))
                .sorted((x, y) -> Integer.compare(x.getName().codePointAt(0), y.getName().codePointAt(0)))
                .subscribe(System.out::println);
```
 Trong đó (x,y) là tham số truyền vào cho hàm compare() trong interface Comparator<People> và return kết quả so sánh.  Đây là cách viết ngắn ngọn sử dụng cho các interface có 1 phương thức abstract duy nhất như Comparator: 
```
.sorted(new Comparator<People>() {
                    @Override
                    public int compare(final People x, final People y) {
                        return Integer.compare(x.getName().codePointAt(0), y.getName().codePointAt(0));
                    }
                })
```
Kết quả:
```
People{name='An', id=321, age=25}
People{name='Linh', id=423, age=32}
People{name='Tam', id=124, age=21}
```
Về nguyên tắc hoạt động nó sẽ lưu trữ tất cả các phần tử được phát ra từ Observable sau đó sắp xếp theo thứ tự rồi mới phát ra tiếp vì vậy nếu bạn sử dụng sort() cho Observable ko có giới hạn phần tử sẽ gây ra tràn bộ nhớ OutOfMemory. <br>
Bạn cũng có thể sử dụng Comparetor đi cùng 1 hàm để xác định tiêu chí sắp xếp:
```
Observable.just(6, 5, 7, 1, 9, 8)
                .sorted(Comparator.reverseOrder())
                .subscribe(System.out::println);
```
 Kết quả: 
```
9
8
7
6
5
1
```
###  4. delay()
 Chúng ta có thể trì hoãn việc Observer nhận phần tử với hàm delay(). Nó sẽ giữ các phần tử nhận được trong khoảng thời gian được xác định trong tham số truyền vào của hàm delay() như trong ví dụ bên dưới với 5 là số lượng thời gian và TimeUnit.SECONDS tương ứng với đơn vị đo giây. Trong trường hợp quá trình phát ra phần tử phát sinh lỗi mà bạn muộn nhận được lỗi luôn mà không delay bạn sẽ sử dụng thêm tham số boolean sau TimeUnit.
   ```
public static void main(String[] args) {
        Observable.just("Alpha", "Beta", "Gamma" ,"Delta",
                "Epsilon")
                .delay(5, TimeUnit.SECONDS)
                .subscribe(s -> System.out.println("Received: " + s));
        sleep(9000);

    }

    public static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
```
Cũng giống như interval() để thực hiện delay chúng ta cần chạy nó trên 1 thread khác vì vậy để tránh việc Main thread dừng trước khi kết quả đưuọc in ra chúng ta cần cho Main thread sleep trong 1 khoảng thời gian đủ để delay và in ra kết quả lên màn hình. <br>
 Bên cạnh delay chúng ta cũng có hàm tương tự delaySubscription(), hàm này sẽ giúp chúng ta trì hoãn việc đăng ký tới Observable thay vì trì hoãn từng phần tử như trong delay().
    
## III. Collection operators
 Các hàm thuộc loại Collection sẽ giúp chúng ta tích trữ tất cả các phần tử được phát ra vào 1 collection như list, map sau đó phát ra cả danh sách trong 1 lần duy nhất. Chúng ta cùng đi qua các hàm đại diện được sử dụng nhiều trong loại operator này.
### 1. toList()
 Với 1 Observable<T> toList() sẽ gom các phần tử vào trong List<T> và sau đó phát ra phát ra cả list trong 1 lần qua Single<List<T>>. <br>
    Trong ví dụ dưới đây chúng ta sẽ lấy các phần tử string được phát ra sau đó add vào list. Sau khi Observable gọi tới onComplete(), list đã gom sẽ được phát ra gửi tới observer và in ra:
```
Observable.just("Alpha", "Beta", "Gamma", "Delta",
"Epsilon")
 .toList()
 .subscribe(s -> System.out.println("Received: " + s));
```
 Kết quả:
` Received: [Alpha, Beta, Gamma, Delta, Epsilon]`
###  2. toSortedList()
 Khác với toList(), isSortedList() sẽ gom các phần tử vào 1 list sau đó sắp xếp các phần tử trong danh sách theo thứ tự được định nghĩa qua implement Comparator và phát ra list đã được sắp xếp.
```
Observable.just(6, 2, 5, 7, 1, 4, 9, 8, 3)
 .toSortedList()
 .subscribe(s -> System.out.println("Received: " + s));
```
   Kết quả:
` Received: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
    
##   IV. Error recovery operators
 TRong phần này chúng ta xe tìm hiểu về các hàm xử lý liên quan tới error xảy ra trong quá trình phát ra phần tử. NHư chúng ta đã biết khi có lỗi hàm onError sẽ được gọi và quá trình phát ra phần tử sẽ dừng lại ngay. Trong trường hợp bạn muốn xử lý lỗi trước khi nó đi xuống Observer hoặc xử lý lỗi đó thay vì dừng chương trình bạn có thể dùng các operator dưới đây hoặc bạn có thể tự xử lý theo cách của chính bạn.
###  1. onErrorReturn() và onErrorReturnItem()
 Chúng ta có ví dụ:
 ```
Observable.just(5, 2, 4, 0, 3, 2, 8)
 .map(i -> 10 / i)
 .subscribe(i -> System.out.println("RECEIVED: " + i),
 e -> System.out.println("RECEIVED ERROR: " + e)
 );
```
 Kết quả:
```
 RECEIVED: 2
 RECEIVED: 5
 RECEIVED: 2
 RECEIVED ERROR: java.lang.ArithmeticException: / by zero
```
 Nếu bạn muốn khi có lỗi xảy trong quá trình tính toán chúng ta sẽ nhận được 1 giá trí mặc định nào đó bạn có thể dùng hàm onErrorReturnItem() và truyền vào giá trị mong muốn:
 ```
Observable.just(5, 2, 4, 0, 3, 2, 8)
 .map(i -> 10 / i)
 .onErrorReturnItem(-1)
 .subscribe(i -> System.out.println("RECEIVED: " + i),
  e -> System.out.println("RECEIVED ERROR: " + e)
 );
```
 Kết quả:
 ```
RECEIVED: 2
 RECEIVED: 5
 RECEIVED: 2
 RECEIVED: -1
```
 Bạn có thể sử dụng Function<Throwable, T> để tạo giá trị phát ra khi gặp lỗi thay vì giá trị mặc định -1 như ở ví dụ trên qua hàm onErrorReturn():
```
Observable.just(5, 2, 4, 0, 3, 2, 8)
 .map(i -> 10 / i)
 .onErrorReturn(e -> - 1)
 .subscribe(i -> System.out.println("RECEIVED: " + i),
 e -> System.out.println("RECEIVED ERROR: " + e)
 );    
```
 Chúng ta có thể thấy cả hai hàm trên đều giúp chúng ta phát ra item khi có lỗi tới observer tuy nhiên chúng ta lại không nhận được giá trí của phép toán đối với các phần tử phía sau: 3, 2, 8. Trong trường hợp này bạn nên xử lý lỗi ngay trong hàm map() nơi mà error có thể xảy ra bằng cách xử dụng try- catch: 
```
Observable.just(5, 2, 4, 0, 3, 2, 8)
                .map(i -> {
                    try {
                        return 10/i;
                    }catch (ArithmeticException e){
                        return -1;
                    }
                })
                .subscribe(i -> System.out.println("RECEIVED: " + i),
                        e -> System.out.println("RECEIVED ERROR: " + e)
                );
    
```
 Kết quả:
```
RECEIVED: 2
RECEIVED: 5
RECEIVED: 2
RECEIVED: -1
RECEIVED: 3
RECEIVED: 5
RECEIVED: 1
```
###  2. onErrorResumeNext()
 Giống như onErrorReturnItem() và onErrorReturn(), onErrorResumeNext() chỉ khác ở chỗ nó nhận 1 Observable như 1 tham số đầu vào và phát ra các item do bạn định nghĩa khi có error xảy ra.<br>
Ví dụ như trong ví dụ trên khi gặp lỗi chúng ta chuyền và 1 
```
Observable.empty và dừng phát ra phần tử khi có lỗi:
 Observable.just(5, 2, 4, 0, 3, 2, 8)
 .map(i -> 10 / i)
 .onErrorResumeNext(Observable.empty())
 .subscribe(i -> System.out.println("RECEIVED: " + i),
 e -> System.out.println("RECEIVED ERROR: " + e)
 );
```
  hoặc phát ra 1 mã lỗi là 111 chẳng hạn:
   
```
onErrorResumeNext(Observable.just(111))
```
### 3. retry()
 Hàm retry() có 5 phương thức overload. Mỗi phương thức có công dụng riêng nhưng ý tương chung đều đăng ký lắng nghe lại khi gặp lỗi với mong muốn không gặp lại lỗi ở lần sau<br>
 Nếu bạn gọi retry() không có tham số truyền vào nó sẽ lặp lại việc đăng ký lăng nghe ko giới hạn số lần cho mỗi lỗi xảy ra. Chính vì thế bạn nên lưu ý khi sử dụng hàm này. 
```
 Observable.just(5, 2, 4, 0, 3, 2, 8)
 .map(i -> 10 / i)
 .retry()
 .subscribe(i -> System.out.println("RECEIVED: " + i),
 e -> System.out.println("RECEIVED ERROR: " + e)
 );
```
 Kết quả:
```
 RECEIVED: 5
 RECEIVED: 2
 RECEIVED: 2
 RECEIVED: 5
 RECEIVED: 2
 RECEIVED: 2
 RECEIVED: 5
 RECEIVED: 2
 ...
```
 Vì vậy nó sẽ an toàn hơn nếu bạn chỉ định rõ ràng số lần lặp lại việc đăng ký với hàm retry truyền vào 1 tham số chỉ định số lần:
```
 Observable.just(5, 2, 4, 0, 3, 2, 8)
 .map(i -> 10 / i)
 .retry(2)
 .subscribe(i -> System.out.println("RECEIVED: " + i),
 e -> System.out.println("RECEIVED ERROR: " + e)
 );
```
Kết quả:
```
  RECEIVED: 2
 RECEIVED: 5
 RECEIVED: 2
 RECEIVED: 2
 RECEIVED: 5
 RECEIVED: 2
 RECEIVED: 2
 RECEIVED: 5
 RECEIVED: 2
 RECEIVED ERROR: java.lang.ArithmeticException: / by zero
```
## V. Action operators
 Cuối cùng cũng tới phần cuối của bài viết rồi :) Trong phần này mình sẽ trình bày các operators giúp cho quá trình debbug cũng như giúp chúng ta có thể nhìn thấy được quá trình hoạt động của chuỗi Observable thông qua các operator doOn.
### 1. doOnNext(), doOnComplete(), and doOnError()
1. Hàm doOnNext() giúp chúng ta nắm được các phần tử được phát ra từ 1 operator và đang đi qua và bên cạnh đó doOnNext() không tạo ra bất kỳ sự thay đổi gì tới dữ liệu. Như trong ví dụ dưới đây chúng ta sử dụng hàm doOnNext() để in ra các phần tử dc phát ra từ Observable và sắp đi vào hàm map():
```
Observable.just("Alpha", "Beta", "Gamma", "Delta",
                "Epsilon")
                .doOnNext(s -> System.out.println("Processing: " + s))
                .map(String::length)
                .subscribe(i -> System.out.println("Received: " + i));
```
 Và kết quả:
 ```
Processing: Alpha
 Received: 5
 Processing: Beta
 Received: 4
 Processing: Gamma
 Received: 5
 Processing: Delta
 Received: 5
 Processing: Epsilon
 Received: 7
```
2. Hàm doOnComplete(): 
    Với hàm doOnComplete() giúp chúng ta biết được khi nào chuỗi Observable của chúng ta hoàn thành xong:
```
Observable.just("Alpha", "Beta", "Gamma", "Delta",
"Epsilon")
 .doOnComplete(() -> System.out.println("Source is done
 emitting!"))
 .map(String::length)
 .subscribe(i -> System.out.println("Received: " + i));
```
 Kết quả:
```
 Received: 5
 Received: 4
 Received: 5
 Received: 5
 Received: 7
 Source is done emitting!
```
 Tương tự với hàm doOnError():
```
 Observable.just(5, 2, 4, 0, 3, 2, 8)
 .doOnError(e -> System.out.println("Source failed!"))
 .map(i -> 10 / i)
 .doOnError(e -> System.out.println("Division failed!"))
 .subscribe(i -> System.out.println("RECEIVED: " + i),
 e -> System.out.println("RECEIVED ERROR: " + e)
 );
```
 ở đây chúng ta sử dụng 2 hàm doOnError() chúng ta có thể thấy rõ ràng rằng hàm thứ nhất để kiểm tra Observable có lỗi hay không. Còn hàm thứ hai giúp chúng ta check phép toán chia. Và đây là kết quả:
```
 RECEIVED: 2
 RECEIVED: 5
 RECEIVED: 2
 Division failed!
 RECEIVED ERROR: java.lang.ArithmeticException: / by zero
```
 Bên cạnh 3 hàm trên chúng ta có hàm doOnTerminate(), hàm này được gọi khi onComplete() hoặc onError ().  Để thay thế cho cả 3 hàm onNext(), onError() và onComplete() chúng ta có thể dùng hàm doOnEach():
```
Observable.just(5, 2, 4, 6, 3, 2, 8)
                .map(i -> 10 / i)
                .doOnEach(i -> System.out.println("received" + i))
                .subscribe(i -> System.out.println("RECEIVED: " + i),
                        e -> System.out.println("RECEIVED ERROR: " + e)
                );
```
### 2. doOnSubscribe() and doOnDispose()
hàm doOnSubscribe() được gọi khi có sự đăng ký lắng nghe tới Observable. Và ngược lại  doOnDispose() được gọi khi hàm dispose() được gọi.
```
Observable.just("Alpha", "Beta", "Gamma", "Delta",
"Epsilon")
 .doOnSubscribe(d -> System.out.println("Subscribing!"))
 .doOnDispose(() -> System.out.println("Disposing!"))
 .subscribe(i -> System.out.println("RECEIVED: " + i));
```
 Bạn cũng có thể đoán được kết quả:
 ```
 Subscribing!
 RECEIVED: Alpha
 RECEIVED: Beta
 RECEIVED: Gamma
 RECEIVED: Delta
 RECEIVED: Epsilon
 Disposing!
```
### 3. doOnSuccess()
Đối với các loại source như Maybe, Single chúng ta không có hàm onNext(), hay doOnNext() vậy nên chúng ta có hàm doOnSuccess(). Sau khi phần tử được phát ra cuối cùng đã sẵn sàng và sắp dc chuyển về Observer hàm doOnSuccess sẽ được gọi:
 ```
Observable.just(5, 3, 7, 10, 2, 14)
 .reduce((total, next) -> total + next)
 .doOnSuccess(i -> System.out.println("Emitting: " + i))
 .subscribe(i -> System.out.println("Received: " + i));
```
 Kết quả:
```
 Emitting: 41
 Received: 41
```
 trên đây mình có dùng hàm reduce mà bên trên mình chưa giới thiệu. Đây là  hàm thuộc Reducing operators. Hàm trả về Maybe hoặc Single tùy theo tham số bạn truyền vào hàm. Ở đây mình dùng reduce để tình tổng bằng cách cộng dồn vào total. Ở đây chúng ta return Maybe.<br>
 =) Bài viết của mình tới đây là hết. phần sau chúng ta sẽ tới chương 4 của cuốn sách Learning RxJava của Thomas Nield. Mọi ý kiến đóng góp của mọi người xin hãy để lại ở phần comment bên dưới ;)