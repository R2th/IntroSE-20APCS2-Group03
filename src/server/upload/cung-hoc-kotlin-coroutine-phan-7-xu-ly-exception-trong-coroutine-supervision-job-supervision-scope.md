# 1. Exception trong Kotlin Coroutine
Như chúng ta đã biết, có 2 coroutine builder là: `launch { }` và `async { }`. Cùng run các đoạn code này xem thử 2 builder này `throw Exception` như thế nào.
```kotlin
runBlocking {
            GlobalScope.launch {
                println("Throwing exception from launch")
                throw IndexOutOfBoundsException()
                println("Unreached")
            }
        }
```
Output:
```
Throwing exception from launch
Exception in thread "DefaultDispatcher-worker-2 @coroutine#2" java.lang.IndexOutOfBoundsException
Throwing exception from async
Caught ArithmeticException
```
Như ví dụ trên, coroutine `throw IndexOutOfBoundsException` và stop nên `"Unreached"` không được print ra. 

Bây giờ, sẽ thử nghiệm với `async { }`

```kotlin
val deferred = GlobalScope.async {
                println("Throwing exception from async")
                throw ArithmeticException()
                println("Unreached")
}
```
Output:
```
Throwing exception from async
```
Như các bạn thấy, `ArithmeticException` đã không bị throw nhưng coroutine vẫn stop và `"Unreached"` không được print ra. Giờ ta thử thêm đoạn code `deferred.await()`
```kotlin
val deferred = GlobalScope.async {
                println("Throwing exception from async")
                throw ArithmeticException()
                println("Unreached")
}
deferred.await()
```
Output:
```
Throwing exception from async
Exception in thread "DefaultDispatcher-worker-2 @coroutine#2" java.lang.ArithmeticException
```
`ArithmeticException` đã được throw ra khi gặp hàm `await()`. 

Tóm lại, `launch { }` gặp Exception thì throw luôn, còn `async { }` khi gặp Exception thì nó đóng gói Exception đó vào biến `deferred`. Chỉ khi biến `deferred` này gọi hàm `await()` thì Exception mới được throw ra.
# 2. Catch Exception
```kotlin
fun main() = runBlocking {
    GlobalScope.launch {
        try {
            println("Throwing exception from launch")
            throw IndexOutOfBoundsException()
            println("Unreached")
        } catch (e: IndexOutOfBoundsException) {
            println("Caught IndexOutOfBoundsException")
        }
    }

    val deferred = GlobalScope.async {
        println("Throwing exception from async")
        throw ArithmeticException()
        println("Unreached")
    }
    try {
        deferred.await()
        println("Unreached")
    } catch (e: ArithmeticException) {
        println("Caught ArithmeticException")
    }
}
```
Output:
```
Throwing exception from launch
Caught IndexOutOfBoundsException
Throwing exception from async
Caught ArithmeticException
```
Chúng ta thấy Exception đã bị `catch`. Nhưng nếu như chúng ta launch 100 coroutine thì phải try catch 100 lần sao??. Đừng lo, vì đã có `CoroutineExceptionHandler`
# 3. CoroutineExceptionHandler
`CoroutineExceptionHandler` được sử dụng như một generic catch block của tất cả coroutine. Exception nếu xảy ra sẽ được bắt và trả về cho một hàm callback là `override fun handleException(context: CoroutineContext, exception: Throwable)` và chúng ta sẽ dễ dàng log hoặc handle exception trong hàm đó. 
```kotlin
val handler = CoroutineExceptionHandler { _, exception -> 
    println("Caught $exception") 
}
val job = GlobalScope.launch(handler) {
    throw AssertionError()
}
val deferred = GlobalScope.async(handler) {
    throw ArithmeticException() // Nothing will be printed, relying on user to call deferred.await()
}
joinAll(job, deferred)
```
Output:
```
Caught java.lang.AssertionError
```
Chúng ta thấy `AssertionError` trong khối `launch { }` đã bị catch và được print ra. Vì chúng ta không gọi `deferred.await()` nên `ArithmeticException` trong khối `async { }` sẽ không xảy ra. Mà cho dù chúng ta có gọi `deferred.await()` thì `CoroutineExceptionHandler` cũng sẽ không catch được Exception này vì `CoroutineExceptionHandler` không thể catch được những Exception được đóng gói vào biến `Deferred`. Vậy nên bạn phải tự catch Exception như ở mục 2 mình đã trình bày. Và thêm một chú ý nữa là `CoroutineExceptionHandler` cũng không thể catch Exception xảy ra trong khối `runBlocking { }`
# 4. Tổng hợp nhiều Exception
Sẽ như thế nào nếu nhiều children of a coroutine throw Exception. Như chúng ta đã biết khi xảy ra Exception thì coroutine cũng bị stop, chúng ta sẽ có một nguyên tắc chung là "the first exception wins", vậy exception nào xảy ra đầu tiên thì sẽ được trả về CoroutineExceptionHandler.

Như chúng ta đã biết, khi coroutine bị stop thì nó sẽ cố chạy code trong khối `finally`. Nếu như code trong khối `finally` cũng throw Exception thì sao??. Khi đó các tất cả Exception xảy ra trong tất cả khối finally sẽ bị suppressed. Chúng ta có thể in tất cả chúng ra bằng hàm `exception.getSuppressed()`
```kotlin
fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception ->
        println("Caught $exception with suppressed ${exception.suppressed.contentToString()}")
    }
    val job = GlobalScope.launch(handler) {
        launch {
            try {
                delay(Long.MAX_VALUE) // delay vô hạn
            } finally {
                throw ArithmeticException()
            }
        }
        launch {
            try {
                delay(Long.MAX_VALUE) // delay vô hạn
            } finally {
                throw IndexOutOfBoundsException()
            }
        }
        launch {
            delay(100)
            throw IOException()
        }
        delay(Long.MAX_VALUE)
    }
    job.join()
}
```
Output:
```
Caught java.io.IOException with suppressed [java.lang.ArithmeticException, java.lang.IndexOutOfBoundsException]
```
Lưu ý tính năng này chỉ sử dụng được trên  Java version 1.7+ và API level >= 19.
# 5. Supervision Job
Như chúng ta đã biết, khi một coroutine con xảy ra Exception thì các coroutine con khác bị stop. Nếu chúng ta không muốn điều này, cái chúng ta muốn là khi coroutine con xảy ra Exception thì các coroutine khác vẫn tiếp tục chạy và khi UI bị destroyed thì nó mới dừng. Khi đó, chúng ta có thể sử dụng `SupervisorJob()` thay vì `Job()`
```kotlin
fun main() = runBlocking {
    val supervisor = SupervisorJob()
    with(CoroutineScope(coroutineContext + supervisor)) {
        // launch the first child -- its exception is ignored for this example (don't do this in practice!)
        val firstChild = launch(CoroutineExceptionHandler { _, _ ->  }) {
            println("First child is failing")
            throw AssertionError("First child is cancelled")
        }
        // launch the second child
        val secondChild = launch {
            firstChild.join()
            // Cancellation of the first child is not propagated to the second child
            println("First child is cancelled: ${firstChild.isCancelled}, but second one is still active")
            try {
                delay(Long.MAX_VALUE)
            } finally {
                // But cancellation of the supervisor is propagated
                println("Second child is cancelled because supervisor is cancelled")
            }
        }
        // wait until the first child fails & completes
        firstChild.join()
        println("Cancelling supervisor")
        supervisor.cancel()
        secondChild.join()
    }
}
```
Output:
```
First child is failing
First child is cancelled: true, but second one is still active
Cancelling supervisor
Second child is cancelled because supervisor is cancelled
```
Chúng ta thấy, first child bị hủy nhưng second child vẫn active và tiếp tục chạy.
# 6. Supervision Scope
Thay vì sử dụng `SupervisorJob()` chúng ta có thể sử dụng `supervisorScope` để launch coroutine thì tác dụng nó cũng tương tự như `SupervisorJob()`. 
```kotlin
fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception ->
        println("Caught $exception")
    }
    supervisorScope {
        val first = launch(handler) {
            println("Child throws an exception")
            throw AssertionError()
        }
        val second = launch {
            delay(100)
            println("Scope is completing")
        }
    }
    println("Scope is completed")
}
```
Output:
```
Child throws an exception
Caught java.lang.AssertionError
Scope is completing
Scope is completed
```
Chúng ta thấy, first child xảy ra Exception nhưng second child vẫn tiếp tục chạy. 

`supervisorScope` cũng giống như `coroutineScope`. Nó hủy bỏ tất cả trẻ em chỉ khi chính bản thân nó đã bị cancel hoặc xảy ra exception. Nó cũng chờ đợi tất cả coroutine con trước khi bản thân nó hoàn thành.

Lưu ý khi sử dụng `supervisorScope` là mỗi coroutine con nên tự xử lý các Exception gặp phải thông qua `CoroutineExceptionHandler` hoặc catch Exception thủ công bởi vì các exception xảy ra trong các coroutine con thuộc `supervisorScope` không được truyền đến coroutine cha.
# Kết luận
Kết thúc phần 7, hy vọng bạn đã biết cách xử lý các exception trong coroutine. Sau 7 bài viết về coroutine, mình tin là đủ để các bạn sử dụng coroutine vào dự án rồi đấy :D. Cảm ơn các bạn đã theo dõi bài viết này. Hy vọng các bạn sẽ tiếp tục theo dõi những phần tiếp theo 😄

Nguồn tham khảo: 

https://kotlinlang.org/docs/reference/coroutines/exception-handling.html


Đọc lại những phần trước:

[Cùng học Kotlin Coroutine, phần 1: Giới thiệu Kotlin Coroutine và kỹ thuật lập trình bất đồng bộ](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-1-gioi-thieu-kotlin-coroutine-va-ky-thuat-lap-trinh-bat-dong-bo-gGJ59xajlX2)

[Cùng học Kotlin Coroutine, phần 2: Build first coroutine with Kotlin](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-2-build-first-coroutine-with-kotlin-Do7544Ee5M6)
    
[Cùng học Kotlin Coroutine, phần 3: Coroutine Context và Dispatcher](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-3-coroutine-context-va-dispatcher-Qbq5QkDzZD8)
    
[Cùng học Kotlin Coroutine, phần 4: Job, Join, Cancellation and Timeouts](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-4-job-join-cancellation-and-timeouts-Do75463QZM6)

[Cùng học Kotlin Coroutine, phần 5: Async & Await](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-5-async-await-naQZRxGm5vx)

[Cùng học Kotlin Coroutine, phần 6: Coroutine Scope](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-6-coroutine-scope-aWj536n8l6m)

Đọc tiếp phần 8: [Cùng học Kotlin Coroutine, phần 8: Flow (part 1 of 2)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-8-flow-part-1-of-2-bWrZnx695xw)