# 1. Giới thiệu Flow trong Kotlin Coroutine
`Flow` về cơ bản khá giống `Sequences` trong Kotlin nhưng khác ở chỗ `Sequences` xử lý đồng bộ còn `Flow` xử lý bất đồng bộ. Nếu bạn chưa biết về `Sequences` thì khái niệm này khiến bạn khá khó hiểu đúng hơm :D. Vậy nên trước tiên mình sẽ nói đôi chút về `Collections` và `Sequences` trong Kotlin.
## Collections vs Sequences vs Flow
Mình sẽ sử dụng `Collections` vs `Sequences` vs `Flow` cùng đưa ra lời giải cho một bài toán: Build hàm `foo()` in ra 3 số `1, 2, 3` có thời gian delay và đo thời gian thực hiện của hàm `foo`. Qua đó các bạn sẽ dễ thấy sự khác biệt giữa `Collections` vs `Sequences` vs `Flow`.

Bắt đầu với `Collections`, đại diện trong ví dụ này là `List`
```kotlin
suspend fun foo(): List<Int> {
    val list = mutableListOf<Int>()
    for (i in 1..3) {
        delay(1000)
        list.add(i)
    }

    return list
}

fun main() = runBlocking {
    val time = measureTimeMillis {
        foo().forEach { value -> println(value) }
    }
    println(time)
}
```
Output (ảnh gif):
![](https://images.viblo.asia/594d34b6-d27d-46ae-adc3-f8b685df3a68.gif)


Còn đây là khi sử dụng `Sequences`
```kotlin
fun foo(): Sequence<Int> = sequence { // sequence builder
    for (i in 1..3) {
        Thread.sleep(1000)
        yield(i)
    }
}

fun main() = runBlocking {
    val time = measureTimeMillis {
        foo().forEach { value -> println(value) }
    }
    println(time)
}
```
Output (ảnh gif):
![](https://images.viblo.asia/35d015b6-fb15-4b83-b964-f67eec3738b0.gif)

Các bạn đã thấy sự khác nhau chưa :D. 2 Output được in ra là giống nhau và thời gian thực hiện cũng bằng nhau, đều là 3 giây, nhưng khác ở chỗ thằng `List` nó đợi `add` xong cả 3 phần tử rồi mới in ra, còn trong ví dụ `Sequence` thì cứ mỗi giây thì có phần tử được `yield` và phần tử đó lập tức được in ra ngay mà không phải đợi `yield` xong cả 3 phần tử.

Còn đây là `Flow`:
```kotlin
fun foo(): Flow<Int> = flow {
    // flow builder
    for (i in 1..3) {
        delay(1000)
        emit(i) // emit next value
    }
}

fun main() = runBlocking {
    // Collect the flow
    val a = measureTimeMillis {
        foo().collect { value -> println(value) }
    }
    println(a)
}
```
Output (ảnh gif):
![](https://images.viblo.asia/2c194901-a1f2-48b0-b99a-75f0293dcf65.gif)

Về cơ bản, `Flow` khá giống `Sequence` đúng không nào, thay vì sử dụng hàm `yield` thì `Flow` sử dụng hàm `emit` và nhận các giá trị qua hàm `collect`. Các bạn chưa cần phải hiểu các đoạn code ở trên về `Flow` vì mình sẽ giải thích ở phía dưới trong cùng bài viết này.

Ở đầu bài viết, mình có nói là:  "`Flow` về cơ bản khá giống `Sequences` trong Kotlin nhưng khác ở chỗ `Sequences` xử lý đồng bộ còn `Flow` xử lý bất đồng bộ". Bây giờ chúng ta sẽ đi làm rõ sự khác nhau này nhé.
## Flow vs Sequences
`Sequence` block main thread:
```kotlin
fun foo(): Sequence<Int> = sequence { // sequence builder
    for (i in 1..3) {
        Thread.sleep(1000)
        yield(i) // yield next value
    }
}

fun main() = runBlocking {
    // Launch a concurrent coroutine to check if the main thread is blocked
    launch {
        println(Thread.currentThread().name)
        for (k in 1..3) {
            delay(1000)
            println("I'm blocked $k")
        }
    }
    val time = measureTimeMillis {
        foo().forEach { value -> println(value) }
    }
    println("$time s")
}
```
Output (ảnh gif):
![](https://images.viblo.asia/06c1d27b-ec11-41ae-bb35-5c237f1364c2.gif)

Mình có `launch` một coroutine trên main thread để kiểm tra liệu main thread có bị block không. Mình có dùng `Thread.currentThread().name` để in ra chữ `main` để chắc chắn rằng coroutine chạy trên main thread. Các bạn chú ý là coroutine chạy trên main thread nhưng nó không block main thread nhé, đây là đặc điểm của coroutine mà mình đã giới thiệu ở [phần 2](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-2-build-first-coroutine-with-kotlin-Do7544Ee5M6#_non-blocking-4). Do đó coroutine và hàm `foo` sẽ chạy song song. Và kết quả cho ta thấy rằng hàm `foo` chứa `Sequence` đã block main thread, vì vậy mà 3 dòng `I'm blocked` đã phải chờ `Sequence` in hết 3 giá trị ra trước rồi mới đến lượt nó được in ra.

Vậy khi sử dụng Flow thì sao:
```kotlin
fun foo(): Flow<Int> = flow {
    // flow builder
    for (i in 1..3) {
        delay(1000)
        emit(i) // emit next value
    }
}

fun main() = runBlocking {
    // Launch a concurrent coroutine to check if the main thread is blocked
    launch {
        println(Thread.currentThread().name)
        for (k in 1..3) {
            delay(900)
            println("I'm not blocked $k")
        }
    }
    // Collect the flow
    val time = measureTimeMillis {
        foo().collect { value -> println(value) }
    }
    println("$time s")
}
```
Output (ảnh gif):
![](https://images.viblo.asia/da965ee9-97c1-4e41-8cad-34024540a943.gif)

Tương tự đoạn code ví dụ `Sequence`, mình cũng launch một coroutine trên main thread để kiểm tra liệu main thread có bị block không. Và kết quả cho ta thấy rằng `Flow` không block main thread, bằng chứng là các số `1, 2, 3` được in ra song song với `I'm not blocked`.

Tóm lại: `Sequence` xử lý đồng bộ. Nó sử dụng `Iterator` và block main thead trong khi chờ đợi item tiếp theo được `yield`. `Flow` xử lý bất đồng bộ. Nó sử dụng một suspend function `collect` để không block main thread trong khi chờ đợi item tiếp theo được `emit`.
## Flow
Bây giờ, mình sẽ giải thích các dòng code mà mình đã sử dụng để ví dụ về `Flow`:
* Khối `flow { }` là một builder function giúp ta tạo ra 1 đối tượng `Flow`.
* Code bên trong `flow { ... }` có thể suspend, điều này có nghĩa là chúng ta có thể gọi các suspend function trong khối `flow { }`. Vì vậy function `foo()` gọi khối `flow { }` không cần thiết phải là suspend function nữa.
* Hàm `emit` dùng để emit các giá trị từ `Flow`. Hàm này là suspend function
* Hàm `collect` dùng để get giá trị được emit từ hàm `emit`. Hàm này cũng là suspend function.
# 2. Flow là nguồn dữ liệu lạnh
Các `Flow` là các luồng lạnh (cold streams) tương tự như các `Sequences`. Điều đó có nghĩa là code bên trong `flow { }` sẽ không chạy cho đến khi `Flow` gọi hàm `collect`.
```kotlin
fun foo(): Flow<Int> = flow { 
    println("Flow started")
    for (i in 1..3) {
        delay(100)
        emit(i)
    }
}

fun main() = runBlocking<Unit> {
    println("Calling foo...")
    val flow = foo()
    println("Calling collect...")
    flow.collect { value -> println(value) } 
    println("Calling collect again...")
    flow.collect { value -> println(value) } 
}
```
Output:
```
Calling foo...
Calling collect...
Flow started
1
2
3
Calling collect again...
Flow started
1
2
3
```
Chúng ta có thể thấy mặc dù gọi hàm `foo()` nhưng code trong `Flow` vẫn không chạy. Cho đến khi `Flow` gọi hàm `collect` thì code trong `Flow` mới chạy và code đó sẽ chạy lại khi chúng ta gọi lại hàm `collect`.
# 3. Flow cancellation
`Flow` tuân thủ việc các nguyên tắc cancellation chung của coroutines (xem lại [phần 4](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-4-job-join-cancellation-and-timeouts-Do75463QZM6#_4-nhung-luu-y-khi-huy-bo-mot-coroutine-3)). Việc `collect` của `flow` chỉ có thể bị hủy khi và chỉ khi `flow` đang bị suspend (chẳng hạn như gặp hàm `delay`) và ngược lại `flow` không thể bị hủy.

Đoạn code dưới đây sẽ cho các bạn thấy flow bị cancel khi hết thời gian timeout. Ta sử dụng hàm [withTimeoutOrNull](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-4-job-join-cancellation-and-timeouts-Do75463QZM6#_5-timeout---cho-coroutine-chet-bang-cach-hen-gio-8)
```kotlin
fun foo(): Flow<Int> = flow { 
    for (i in 1..3) {
        delay(2000)          
        println("Emitting $i")
        emit(i)
    }
}

fun main() = runBlocking {
    withTimeoutOrNull(5000) { // Timeout after 5s 
        foo().collect { value -> println(value) } 
    }
    println("Done")
}
```
Output:
```
Emitting 1
1
Emitting 2
2
Done
```
Trong 4 giây đầu tiên, `số 1` và `số 2` được in ra. Đến giây thứ 5, đã hết thời gian timeout mà flow đang bị suspend vì hàm `delay(2000)` (còn 1 giây nữa tức là đến giây thứ 6 thì flow mới hết suspend) nên flow bị cancel và `số 3` không được in ra.

Bây giờ mình sẽ thay hàm `delay` bằng hàm `Thread.sleep` để kiểm tra liệu flow không thể bị hủy khi nó không suspend?
```kotlin
fun foo(): Flow<Int> = flow {
    for (i in 1..3) {
        Thread.sleep(2000)
        println("Emitting $i")
        emit(i)
    }
}

fun main() = runBlocking {
    withTimeout(1000) { // Timeout after 1s
        foo().collect { value -> println(value) }
    }

    println("Done")
}
```
Output:
```
Emitting 1
1
Emitting 2
2
Emitting 3
3
Done
```
Như các bạn thấy, flow vẫn in ra cả 3 số `1, 2, 3` mặc dù đã hết thời gian timeout là 1 giây. Vậy, flow không thể bị cancel khi đang chạy hay nói các khác là khi nó không ở trạng thái suspend.
# 4. Các cách tạo ra Flow
Ngoài cách sử dụng khối `flow { }` như các đoạn code trên mình đã sử dụng để tạo ra một `Flow` thì còn có những cách khác để tạo ra đối tượng `Flow` như:
## Hàm flowOf
```kotlin
public fun <T> flowOf(vararg elements: T): Flow<T>
```
Code ví dụ:
```kotlin
fun main() = runBlocking {
    val data = flowOf(1,"abc", 3.4, "def")
    data.collect { println(it) }
}
```
Output:
```
1
abc
3.4
def
```
## .asFlow() extension function
Các `Collections`, `Arrays`, `Sequences` hay một kiểu `T` gì đó đều có thể convert sang `Flow` thông qua extension function là `asFlow()`. Hình dưới đây liệt kê đầy đủ các extension function `asFlow()`
![](https://images.viblo.asia/c09fae05-47d2-41c0-a82a-d7e758d40e42.png)
Code ví dụ:
```kotlin
fun main() = runBlocking {
    listOf(1, "abc", 3.4, "def").asFlow().collect { println(it) }
}
```
Output:
```
1
abc
3.4
def
```
# Kết luận
`Flow` thật sự là một thứ rất powerful trong Kotlin Coroutine. Hy vọng qua bài viết này, các bạn đã hiểu biết phần nào đó về `Flow`. Trong phần tiếp theo, mình sẽ giới thiệu sức mạnh thật sự của nó - đó chính là các toán tử (operators). `Flow` có rất nhiều toán tử không thua kém gì `Rx` đâu nha :D. Cảm ơn các bạn đã theo dõi bài viết này. Hy vọng các bạn sẽ tiếp tục theo dõi những phần tiếp theo. :D

Nguồn tham khảo:

https://kotlinlang.org/docs/reference/coroutines/flow.html

Đọc lại những phần trước:

[Cùng học Kotlin Coroutine, phần 1: Giới thiệu Kotlin Coroutine và kỹ thuật lập trình bất đồng bộ](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-1-gioi-thieu-kotlin-coroutine-va-ky-thuat-lap-trinh-bat-dong-bo-gGJ59xajlX2)

[Cùng học Kotlin Coroutine, phần 2: Build first coroutine with Kotlin](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-2-build-first-coroutine-with-kotlin-Do7544Ee5M6)
    
[Cùng học Kotlin Coroutine, phần 3: Coroutine Context và Dispatcher](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-3-coroutine-context-va-dispatcher-Qbq5QkDzZD8)
    
[Cùng học Kotlin Coroutine, phần 4: Job, Join, Cancellation and Timeouts](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-4-job-join-cancellation-and-timeouts-Do75463QZM6)

[Cùng học Kotlin Coroutine, phần 5: Async & Await](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-5-async-await-naQZRxGm5vx)

[Cùng học Kotlin Coroutine, phần 6: Coroutine Scope](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-6-coroutine-scope-aWj536n8l6m)

[Cùng học Kotlin Coroutine, phần 7: Xử lý Exception trong Coroutine, Supervision Job & Supervision Scope](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-7-xu-ly-exception-trong-coroutine-supervision-job-supervision-scope-naQZRDaG5vx)

Đọc tiếp phần 9: [Cùng học Kotlin Coroutine, phần 9: Flow (part 2 of 3)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-9-flow-part-2-of-3-07LKXmX8ZV4)