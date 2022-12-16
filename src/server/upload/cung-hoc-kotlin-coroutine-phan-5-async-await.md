# 1. Bài toán compose nhiều function
Giả sử bạn đang code 1 task cần call 2 API rồi sau đó cần compose lại ra 1 cục data để fill vào UI. Hoặc bài toán khác: Cho 2 function, mỗi function sẽ return về 1 kết quả kiểu `Int`. Sau đó print ra tổng của 2 kết quả lại. Ví dụ:
```kotlin
fun main() = runBlocking<Unit> {
    val time = measureTimeMillis {
        val one = printOne()
        val two = printTwo()
        println("The answer is ${one + two}")
    }
    println("Completed in $time ms")    
}

suspend fun printOne(): Int {
    delay(1000L) 
    return 10
}

suspend fun printTwo(): Int {
    delay(1000L)
    return 20
}
```
Output: 
```
The answer is 30
Completed in 2009 ms
```
Như bạn thấy, bài toán đã được giải quyết kết quả được in ra chính xác `10 + 20 = 30`. Tuy nhiên, ở đây mình đã sử dụng `runBlocking` để launch 1 coroutine duy nhất và chạy tuần tự từ trên xuống dưới. Coroutine nó chạy xong hàm `printOne()` rồi mới chạy tiếp hàm `printTwo()`, sau đó print ra tổng 2 số đó. Ở đây mình sử dụng hàm `measureTimeMillis` để đo kết quả thực hiện bài toán này khi sử dụng 1 coroutine duy nhất. Kết quả đo được là trên 2 giây 1 tí, cũng không có gì quá ngạc nhiên vì ở cả hàm `printOne()` và `printTwo()` mình đều cho `delay` 1 giây nên coroutine chắc chắn phải mất trên 2 giây để hoàn thành công việc này. Not bad!. Tuy nhiên, chắc chắn chúng ta biết rằng nếu chạy mỗi hàm trên mỗi coroutine thì kết quả sẽ nhanh hơn. Nhưng khổ cái khi launch 1 coroutine thì nó đâu có thể return về kiểu `Int` được, nó chỉ return về kiểu `Job` à ([xem lại phần 4 nếu chưa biết Job](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-4-job-join-cancellation-and-timeouts-Do75463QZM6)). Dưới đây là hình ảnh bằng chứng, trăm nghe không bằng 1 thấy. Vì nó return về kiểu` Job` nên không thể tính tổng 2 `Job` được =))

![](https://images.viblo.asia/b54b31e9-1ab3-470a-9a0f-395dea923cc6.PNG)

Đừng lo, ngoài 2 thằng dùng để launch coroutine mà mình đã biết là `runBlocking { }` và `GlobalScope.launch { }`, 2 thằng này nó return về kiểu `Job`. Nay mình sẽ biết thêm một thằng mới cũng để launch coroutine mà không return về kiểu `Job` nữa, đó là `async { }`. Chính `async` sẽ là vị anh hùng giúp ta giải quyết bài toán trên :D
# 2. Dùng Async để launch coroutine
Trước khi sử dụng `async` để giải quyết bài toán trên, mình xin phép giới thiệu sơ qua về `async` đã nhé. 
```kotlin
fun main() = runBlocking {
    val int: Deferred<Int> = async { printInt() }
    val str: Deferred<String> = async { return@async "Sun" }
    val unit: Deferred<Unit> = async { }

    println("Int = ${int.await()}")
    println("String = ${str.await()}")
}

fun printInt(): Int {
    return 10
}
```
Như bạn đã thấy ở trên, có 3 thằng lạ lạ là `async`, `Deferred<T>`, `await()`, mình sẽ giải thích từng thằng một:
* Thứ nhất: `async { }` nó cũng như `runBlocking { }` hay `launch { }` vì nó cũng được để launch 1 coroutine. Điểm khác biệt là khi sử dụng `async` để launch 1 coroutine thì coroutine đó cho phép bạn return về 1 giá trị kiểu `Int`, `String`, `Unit`, ... kiểu gì cũng được còn 2 thằng kia thì luôn return kiểu `Job` mà thằng `Job` này chỉ có thể quản lý lifecycle của coroutine chứ không mang được giá trị kết quả gì (Job does not carry any resulting value). 
* Thứ hai là `Deferred<T>`: để ý khi bạn return về kiểu `Int` trong khối block của coroutine thì kết quả trả về của `async` là kiểu `Deferred<Int>`, return kiểu `String` thì trả về kiểu `Deferred<String>`, không return gì cả thì nó sẽ trả về kiểu `Deferred<Unit>`. `Deferred` nó cũng giống `Job` vậy, nó cũng có thể quản lý lifecycle của coroutine nhưng ngon hơn thằng `Job` ở chỗ nó mang theo được giá trị kết quả trả về của coroutine. Và khi cần get giá trị này ra thì ta sử dụng hàm `await()`.
* Thứ ba là `await()`: như đã giải thích ở trên, `await()` là một member function của `Deferred` dùng để get giá trị kết quả trả về. Ví dụ biến kiểu `Deferred<Int>` thì gọi hàm `await()` sẽ trả về giá trị kiểu `Int`.

OK, vậy giờ đã đi giải quyết bài toán trên thôi :D
```kotlin
fun main() = runBlocking {
    val time = measureTimeMillis {
        val one = async { printOne() }
        val two = async { printTwo() }
        println("The answer is ${one.await() + two.await()}")
    }
    println("Completed in $time ms")
}

suspend fun printOne(): Int {
    delay(1000L)
    return 10
}

suspend fun printTwo(): Int {
    delay(1000L)
    return 20
}
```
Output: 
```
The answer is 30
Completed in 1016 ms
```
Như các bạn thấy, chỉ cần 1 giây là đã xử lý được bài toán, nhanh gấp đôi khi sử dụng 1 coroutine (mất 2 giây). Vì ở đây chúng ta sử dụng 2 coroutine cơ mà :D
# 3. Lazy Async
```kotlin
fun main() = runBlocking {
    val time = measureTimeMillis {
        val one = async(start = CoroutineStart.LAZY) { printOne() }
        val two = async(start = CoroutineStart.LAZY) { printTwo() }
        one.start() // start the first one
        two.start() // start the second one
        println("The answer is ${one.await() + two.await()}")
    }
    println("Completed in $time ms")
}

suspend fun printOne(): Int {
    delay(1000L)
    return 10
}

suspend fun printTwo(): Int {
    delay(1000L)
    return 20
}
```
```
The answer is 30
Completed in 1016 ms
```
Khi khai báo `async` kiểu `lazy` thì coroutine sẽ không chạy ngay. Nó sẽ chỉ chạy code trong block khi có lệnh từ hàm `start()`.  Để khai báo `async` theo kiểu `lazy` cũng rất dễ, chỉ cần truyền `CoroutineStart.LAZY` vào `param start` trong hàm `async` là được.

Vậy sẽ thế nào khi sử dụng `lazy async` mà không gọi hàm `start()`
```kotlin
fun main() = runBlocking {
    val time = measureTimeMillis {
        val one = async(start = CoroutineStart.LAZY) { printOne() }
        val two = async(start = CoroutineStart.LAZY) { printTwo() }
        println("The answer is ${one.await() + two.await()}")
    }
    println("Completed in $time ms")
}

suspend fun printOne(): Int {
    delay(1000L)
    return 13
}

suspend fun printTwo(): Int {
    delay(1000L)
    return 29
}
```
Output:
```
The answer is 30
Completed in 2015 ms
```
Oh no!. Kết quả mất tới 2 giây thay vì 1 giây. Cực kỳ đáng lưu ý khi sử dụng `lazy async` : nếu chúng ta chỉ gọi hàm `await()` mà không gọi hàm `start()` trên các coroutine, điều này sẽ dẫn đến việc coroutine sẽ chạy tuần tự (chạy xong con coroutine này ra kết quả rồi mới chạy tiếp con coroutine sau). Giải thích: vì dòng code `println("The answer is ${one.await() + two.await()}")` sẽ chạy tuần tự, có nghĩa là nó sẽ gọi `one.await()` trước, đợi coroutine `one` tính ra kết quả rồi mới gọi tiếp lệnh `two.await()`, tiếp tục chờ đến khi coroutine `two` kết thúc. Như vậy thì chả khác gì chạy tuần tự, nên phải lưu ý điều này khi sử dụng `lazy async` nhé =))
   
# Kết luận
Kết thúc phần 5, hy vọng bạn đã hiểu các khái niệm về `async { }` & hàm `await()` & kiểu `Deferred<T>`. Bài viết tới mình sẽ giới thiệu về `CoroutineScope` - một thứ rất là quan trọng trong Kotlin Coroutine. Cảm ơn các bạn đã theo dõi bài viết này. Hy vọng các bạn sẽ tiếp tục theo dõi những phần tiếp theo 😄

Nguồn tham khảo: 

https://kotlinlang.org/docs/reference/coroutines/composing-suspending-functions.html


Đọc lại những phần trước:

[Cùng học Kotlin Coroutine, phần 1: Giới thiệu Kotlin Coroutine và kỹ thuật lập trình bất đồng bộ](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-1-gioi-thieu-kotlin-coroutine-va-ky-thuat-lap-trinh-bat-dong-bo-gGJ59xajlX2)

[Cùng học Kotlin Coroutine, phần 2: Build first coroutine with Kotlin](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-2-build-first-coroutine-with-kotlin-Do7544Ee5M6)
    
[Cùng học Kotlin Coroutine, phần 3: Coroutine Context và Dispatcher](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-3-coroutine-context-va-dispatcher-Qbq5QkDzZD8)
    
[Cùng học Kotlin Coroutine, phần 4: Job, Join, Cancellation and Timeouts](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-4-job-join-cancellation-and-timeouts-Do75463QZM6)

Đọc tiếp phần 6: [Cùng học Kotlin Coroutine, phần 6: Coroutine Scope](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-6-coroutine-scope-aWj536n8l6m)