## Setup

Với những bạn chưa biết thì coroutine là một trong những tính năng khá hot của Kotlin. Nó mang lại cho lập trình viên khả năng xử lý concurrency một cách dễ dàng. Bài viết này dành cho những bạn đã nắm được cơ bản về coroutine, với những bạn chưa biết về nó thì có thể đọc bài [này](https://viblo.asia/p/gioi-thieu-ve-kotlin-coroutines-tren-jvm-V3m5W1EgZO7) . Hiện tại coroutine đã vượt qua giai đoạn thử nghiêm nên các bạn có thể an tâm sử dụng nhé. Để sử dụng bản mới nhất thì với các bạn cần thêm 2 dependency này:

```gradle
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.0.1'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.0.1'
```

Ngoài ra thì các bạn cũng cần nâng version plugin của Kotlin lên 1.3 nữa.

## Đặt vấn đề

Giả sử ban đầu chúng ta có đoạn code như này:

```kotlin
class Printer {
 
    fun count() {
        GlobalScope.launch {
            GlobalScope.launch {
                while (true) {
                    println("1st nested")
                    delay(1000)
                }
            }
            GlobalScope.launch {
                while (true) {
                    println("2nd nested")
                    delay(1000)
                }
            }
            while (true) {
                println("Parent coroutine")
                delay(1000)
            }
        }
    }
}
```

Trong đoạn code này chúng ta đã start 3 coroutine và cho nó liên tục in ra các xâu có nội dung khác nhau. Giả sử dưới một điều kiện đặc biệt nào đó chúng ta muốn hủy cả 3 coroutine cúng một lúc thì chúng ta sẽ làm thế nào? Để làm được điều này thì chúng ta sẽ phải lưu lại các `Job` được trả về bởi `launch` và cancel chúng:

```kotlin
class Printer {
    private var firstCoroutine: Job? = null
    private var secondCoroutine: Job? = null
    private var parentCoroutine: Job? = null

    fun count() {
        parentCoroutine = GlobalScope.launch {
            firstCoroutine = GlobalScope.launch {
                while (true) {
                    println("1st nested")
                    delay(1000)
                }
            }
            secondCoroutine = GlobalScope.launch {
                while (true) {
                    println("2nd nested")
                    delay(1000)
                }
            }
            while (true) {
                println("Parent coroutine")
                delay(1000)
            }
        }
    }

    fun cancelAll() {
        firstCoroutine?.cancel()
        secondCoroutine?.cancel()
        parentCoroutine?.cancel()
        println("===All canceled===")
    }
}
```

Có một vấn đề sinh ra là giả sử nếu chúng ta có nhiều hơn 3 coroutine ở trên thì chúng ta sẽ phải tạo ra thêm bấy nhiêu biến `Job` cho nó. Nếu cứ code như vậy thì thực sự rất khó chịu cho người code và lúc đọc cũng rất đau mắt :<. Nếu đã sử dụng RxJava thì các bạn có thể thấy là nó handle trường hợp này rất gọn bằng `CompositeDisposable`: Một `CompositeDisposable` sẽ giữ các `Disposable` tương ứng với các `Job` của coroutine và chỉ cần gọi `dispose()` là mọi thứ ngon lành cành đào ngay.

## Giải pháp

Chúng ta có thể cho `firstCoroutine` và `secondCoroutine` chạy dưới context của `parentCoroutine`. Khi này thì nếu  `parentCoroutine` bị cancel thì cả 2 thằng kia cũng chết theo luôn.

```kotlin
class Printer {
    private var parentCoroutine: Job? = null

    fun count() {
        parentCoroutine = GlobalScope.launch {
            GlobalScope.launch(context = coroutineContext) {
                while (true) {
                    println("1st nested")
                    delay(1000)
                }
            }
            GlobalScope.launch(context = coroutineContext) {
                while (true) {
                    println("2nd nested")
                    delay(1000)
                }
            }
            while (true) {
                println("Parent coroutine")
                delay(1000)
            }
        }
    }

    fun cancelAll() {
        parentCoroutine?.cancel()
        println("===All canceled===")
    }
}
```

Có một điều lưu ý là thứ tự bị cancel của các coroutine là hoàn toàn ngẫu nhiên chứ không có quy luật gì cả cho nên nếu yêu cầu của chúng ta là phải cancel một cách có trình tự các coroutine thì chúng ta không dùng `launch` được nữa mà phải dùng `async` và `await`.

Cảm ơn các bạn đã chú ý theo dõi :D