## Giới thiệu
Trong loạt bài viết này, tôi sẽ so sánh [Kotlin Coroutine](https://kotlinlang.org/docs/reference/coroutines.html) và [RxJava](https://github.com/ReactiveX/RxJava), bởi vì chúng đều giải quyết vấn đề chung trong phát triển Android: Xử lý bất đồng bộ.

## Use case 1: Khởi tạo đối tượng heavy khi khởi chạy ứng dụng
Hiệu năng của [Launch-Time](https://developer.android.com/topic/performance/launch-time.html) là rất quan trọng. Nếu bạn muốn ứng dụng của mình khởi chạy thật nhanh, điều quan trọng là cách bạn xử lý việc khởi tạo Object.

Có một số tính toán có thể mất một chút thời gian (ví dụ: khởi tạo các đối tượng heavy). Bạn không muốn điều đó thực hiện trong UI thread! Nếu không, ứng dụng của bạn sẽ bỏ qua khung hình và người dùng sẽ có trải nghiệm bị lag. Điều gì có thể ảnh hưởng đến trải nghiệm này? Khởi tạo SDK, tạo đối tượng crypto,...

Đối với trường hợp sử dụng đầu tiên này, chúng ta chỉ muốn thực hiện một hoạt động heavy trong background thread.

### RxJava
Mặc dù RxJava là một thư viện Reactive Extensions cho JVM, bạn cũng có thể sử dụng nó để chạy các tác vụ không đồng bộ trong background thread.

Trong trường hợp này, chúng ta bỏ qua khả năng RxJava trong việc truyền các stream phần tử, mà chỉ muốn xử lý bất đồng bộ trong khởi tạo.

Với RxJava, một [Completable](http://reactivex.io/RxJava/javadoc/io/reactivex/Completable.html) sẽ giúp chúng ta thực hiện điều này. Một **Completable** đại diện cho một tính toán trì hoãn mà không có bất kỳ giá trị nào mà chỉ trả về dấu hiệu cho việc hoàn thành hay xảy ra ngoại lệ.

**Cách dùng một Completable để khởi tạo các đối tượng mà chúng ta muốn:**
```
fun initializeObjectsAsync(): Completable {
    return Completable.create { emitter ->
        try {
            heavyInitialization()
            if (emitter != null && !emitter.isDisposed) {
                emitter?.onComplete()
            }
        } catch (e: Exception) {
            if (emitter != null && !emitter.isDisposed) {
                emitter?.onError(e)
            }
        }
    }
}
```

Như bạn có thể thấy, chúng ta đã tạo một function sẽ trả về một đối tượng **Completable**. Bên trong function, chúng ta đang tạo **Completable** tùy chỉnh với `Completable.create` sẽ lấy một `emitter` (đối tượng có khả năng sẽ đăng ký nó).

Sau khi thực hiện quá trình khởi tạo heavy, chúng ta sẽ thông báo cho emitter rằng nó đã thành công. Nếu có lỗi, chúng ta sẽ thông báo về lỗi đã xảy ra. Điều này là do emitter thuộc loại [CompletableEmitter](http://reactivex.io/RxJava/javadoc/io/reactivex/CompletableEmitter.html) với `onComplete` và `onError` là các phương thức có sẵn để thông báo kết quả cho `Subscriber`.

Một cách khác bạn có thể thực hiện là với `Completable.fromCallable()`
```
fun initializeObjectsAsync(): Completable {
    return Completable.fromCallable({
            heavyInitialization()
    })
}
```

**Cách chúng ta có thể sử dụng Function trên:**
Như chúng ta đã biết, `Completables` là kiểu **cold** Observables trong RxJava. Điều đó có nghĩa là chỉ khi chúng ta subscribe thì code bên trong `Completable.create` mới được thực thi. Một điều cần lưu ý là nó sẽ được thực thi mỗi khi bạn subscribe.

Chúng ta phải subscribe với `Completable` đã tạo trong hàm `initializeObjectsAsync`.
```
fun initializeObjects() {
    initializeObjectsAsync()
        .subscribeOn(Schedulers.computation())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe({
            // The initialization succeeded!
            // We can perform UI changes here 
        }, {
            // An Error occurred!
        })
}
```

Làm cách nào để nói với RxJava rằng chúng ta muốn quá trình khởi tạo được thực thi trên background thread? Chúng ta sử dụng toán tử [`subscribeOn`](http://reactivex.io/documentation/operators/subscribeon.html) để nói với RxJava rằng code bên trong `Completable.create` được thực thi trên background thread.

Muốn thực hiện một số thay đổi về giao diện người dùng khi quá trình khởi tạo hoàn tất, chúng ta sẽ sử dụng toán tử [`observeOn`](http://reactivex.io/documentation/operators/observeon.html) để cho RxJava biết mình muốn lắng nghe kết quả trên Android main thread.

> Chỉ khi bạn subscribe với `Completable`, code bên trong `Completable.create` mới được thực thi.

Sau khi xác định thread, chúng ta muốn `subscribe` để bắt đầu `Completable` và nhận thông báo khi nó hoàn thành. Chúng ta làm điều đó với `.subscribe(successBlockOfCode, failBlockOfCode)`. Chúng ta chuyển hai khối code: khối đầu tiên xác định kịch bản thành công và khối thứ hai xác định kịch bản thất bại.

Nếu chúng ta muốn code này được thực thi khi tạo `Activity` trên Android, có thể gọi function này trong phương thức `onCreate`.

```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    initializeObjects()
}
```

Cách chúng ta có thể làm điều tương tự với Coroutines?

### Kotlin Coroutines
Với Coroutines, điều này thậm chí còn đơn giản hơn! Về mặt khái niệm, coroutine tương tự như một thread theo nhiều cách khác nhau: chúng ta có thể viết mã tuần tự có thể chạy trên một thread cụ thể.

Tôi sẽ viết một bài đăng khác về phân luồng thread trong cả RxJava và Coroutines. Hiện tại, bạn cần biết rằng chúng ta có thể xác định chính sách phân luồng của một coroutine bên trong [`CoroutineContext`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.coroutines.experimental/-coroutine-context/index.html) với một [`CoroutineDispatcher`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/-coroutine-dispatcher/). Chúng ta có thể tạo một coroutine với một `CoroutineContext` cụ thể và một `CoroutineBuilder`.

> CoroutineBuilder là một function tạo một Coroutine, chạy một khối code và cho phép bạn truy cập vào kết quả của nó ở một số dạng. Ví dụ về CoroutineBuilder là: launch, async, runBlocking…

Giả sử chúng ta muốn gọi phương thức `heavyInitialization()` như chúng ta đã làm trước đó trong phương thức `onCreate`, chúng ta có thể tạo một Coroutine với CoroutineBuilder [`launch`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/launch.html) và thực hiện khởi tạo heavy trong khối code đang được chạy.

```
fun initializeObjects() {
    launch(CommonPool) {
        heavyInitialization()
    }
}
```

[`CommonPool`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/-common-pool/) CoroutineDispatcher tương tự như `Schedulers.computation()` trong RxJava. Thao tác này sẽ chạy code trong background thread và chúng ta không phải lo lắng về bất kỳ điều gì khác.

Hãy bắt chước ví dụ mà chúng ta đã xây dựng với RxJava: chúng ta muốn biết khi nào nó hoàn thành khởi tạo các đối tượng heavy và xử lý lỗi nếu xảy ra.

```
fun initializeObjects() {
    launch(CommonPool) {
        try {
            heavyInitialization()
            // The initialization succeeded!
            withContext(UI) {
                // We can perform UI changes here
            }
        } catch (e: Exception) {
            // An Error occurred!
        }
    }
}
```

Vì code bên trong một Coroutine (gọi là **suspending lambda**) được thực thi tuần tự, dòng code sau `heavyInitialization()` sẽ được thực thi khi khởi tạo thành công.

Như trước đây, chúng ta có thể wrap lời gọi hàm bên trong một khối try catch để xử lý lỗi. Nó sẽ hoạt động theo cách tương tự.

Làm cách nào chúng ta có thể chuyển sang UI thread và thực hiện các thay đổi UI? Có một hàm mà bạn có thể gọi bên trong một Coroutine có tên [`withContext`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/with-context.html) sử dụng một CoroutineContext khác để chạy khối code bên trong nó. Về cơ bản, nó sẽ chuyển sang Android UI thread để thực thi code đó.


> UI CoroutineContext mà chúng ta thấy trong ví dụ không phải là một phần của thư viện Kotlin Coroutines tiêu chuẩn. Vì nó dành riêng cho Android nên nó có sẵn trong thư viện sau: `org.jetbrains.kotlinx:kotlinx-coroutines-android:$kotlin_coroutines_version`.

## Use Case 2: Xử lý background với bài toán Fibonacci
Đối với Use Case thứ hai này, ngoài việc thực thi một cái gì đó trong background, chúng ta cũng muốn trả về một giá trị. Bây giờ, chúng ta muốn tính Fibonacci của một số khi người dùng nhập vào và click button bắt đầu tính.

Bây giờ chúng ta có đoạn code sau để tính Fibonacci của một số:
```
private fun fib(n: Long): Long {        
    return if (n <= 1) n        
    else fib(n - 1) + fib(n - 2)    
}
```

Làm thế nào chúng ta có thể tính toán giá trị này trong background và trả về kết quả?

### RxJava
Chúng ta đã thấy hầu hết các khái niệm này trong use case đầu tiên. Chúng ta cần một toán tử building của RxJava có thể trả về một đối tượng. Chúng ta có thể sử dụng [**Single**](http://reactivex.io/documentation/single.html) cho nó!

```
fun fibonacciAsync(number: Long): Single<Long> = 
    Single.create({ emitter ->
            val result = fib(number) 
            if (emitter != null && !emitter.isDisposed) {       
                 emitter.onSuccess(result)
            }
})
```

Code bên trong `Single.create` sẽ được thực thi khi chúng ta đăng ký và có thể sử dụng nó giống như cách chúng ta đã làm trước đây. Khi nhận được tương tác của người dùng, chúng ta chỉ cần subscribe tới Single mà phương thức fibonacci trả về.

Bạn cũng có thể sử dụng function `fromCallable` mà chúng ta đã thấy trong ví dụ về Completable:
```
fun fibonacciAsync(number: Long): Single<Long> = 
    Single.fromCallable({
        return fib(number)
    })
```

Chúng ta truyền tham số là giá trị số cho function đó, giá trị này cũng sẽ được sử dụng bên trong khối code Single.create. Ví dụ, chúng ta có thể lấy số đó từ một EditText.
```
@OnClick(R.id.my_button)
fun onButtonClicked() { 
    fibonacciAsync(numberInputEditText.text.toString().toLong())
       .subscribeOn(Schedulers.computation())
       .observeOn(AndroidSchedulers.mainThread())
       .subscribe({ fibonacciNumber -> 
           //Update UI with the result 
           myTextView.text = fibonacciNumber
       },{
           // Error happened
       })
}
```

Mỗi khi user click vào nút, chúng ta sẽ tính toán một số Fibonacci mới. Nếu người dùng thay đổi giá trị bên trong `numberInputEditText`, kết quả sẽ khác!

### Kotlin Coroutines
Ví dụ này dễ dàng như ví dụ trên. Khi người dùng nhấn vào nút, chúng ta muốn start một Coroutine và tính Fibonacci của số đã nhập. Chúng ta đã biết mọi thứ cần thiết để làm điều đó:

```
@OnClick(R.id.my_button)
fun onButtonClicked() { 
    launch(CommonPool) {
        val result = fib(
            numberInputEditText.text.toString().toLong()
        )
        withContext(UI) {
            fibonacciResultTextView.text = result
        }
    }
}
```

## Phần tiếp theo?
Phần thứ hai của loạt bài này chúng ta sẽ tìm hiểu về **Cancelling Execution**!

Làm thế nào để bạn hủy một Observable? Và một Coroutine?

Ref: https://medium.com/capital-one-tech/coroutines-and-rxjava-an-asynchronicity-comparison-part-1-asynchronous-programming-e726a925342a