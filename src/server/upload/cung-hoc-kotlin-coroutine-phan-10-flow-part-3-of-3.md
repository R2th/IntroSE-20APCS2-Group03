# 1. Flow Context
Code trong khối `flow {...}` chạy trên context của nguồn thu. Ví dụ:
```kotlin
fun log(msg: String) = println("[${Thread.currentThread().name}] $msg")
           
fun foo(): Flow<Int> = flow {
    log("Started foo flow")
    for (i in 1..3) {
        emit(i) // nguồn phát
    }
}  

fun main() = runBlocking {
    foo().collect { value -> log("Collected $value") } // nguồn thu
}   
```
Output: 
```
[main] Started foo flow
[main] Collected 1
[main] Collected 2
[main] Collected 3
```
Dễ hiểu, vì hàm `collect` (nguồn thu) được gọi bên trong khối `runBlocking` (sử dụng context với dispatcher là `Dispatchers.Main`) nên code trong khối `flow` chạy trên context này tức là chạy trên `Dispatchers.Main`. 

Tuy nhiên, trong một số bài toán (đặc biệt là bài toán long-running CPU-consuming code), chúng ta mong muốn code trong khối `flow` được chạy với `Dispatchers.Default` (background thread) và update UI với `Dispatchers.Main` (main thread). Có thể chúng ta sẽ nghĩ đến ngay hàm [withContext](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-3-coroutine-context-va-dispatcher-Qbq5QkDzZD8#_2-ham-withcontext-5). `withContext` được sử dụng để thay đổi context của coroutine. Tuy nhiên code trong khối `flow { }` nó lại bảo toàn context, có nghĩa là nó đã chạy với context nào rồi thì mãi chạy trên context đó. Ko thể ép nó đổi context bằng hàm `withContext` được. Nếu dùng hàm `withContext` sẽ `throw Exception`.
```kotlin
fun foo(): Flow<Int> = flow {
    // The WRONG way to change context for CPU-consuming code in flow builder
    kotlinx.coroutines.withContext(Dispatchers.Default) {
        for (i in 1..3) {
            Thread.sleep(100) // pretend we are computing it in CPU-consuming way
            emit(i) // emit next value
        }
    }
}

fun main() = runBlocking<Unit> {
    foo().collect { value -> println(value) } 
}    
```
Output:
```
Exception in thread "main" java.lang.IllegalStateException: Flow invariant is violated:
        Flow was collected in [CoroutineId(1), "coroutine#1":BlockingCoroutine{Active}@5511c7f8, BlockingEventLoop@2eac3323],
        but emission happened in [CoroutineId(1), "coroutine#1":DispatchedCoroutine{Active}@2dae0000, DefaultDispatcher].
        Please refer to 'flow' documentation or use 'flowOn' instead
    at ...
```
Vậy giờ phải làm thế nào mới có thể đổi context cho `flow`. Đừng lo vì đã có toán tử `flowOn`.
# 2. Toán tử flowOn
Toán tử `flowOn` sẽ cho phép code trong khối `flow` được chạy trên bất kỳ context nào ta muốn. Cùng xem code:
```kotlin
fun log(msg: String) = println("[${Thread.currentThread().name}] $msg")
           
fun foo(): Flow<Int> = flow {
    for (i in 1..3) {
        Thread.sleep(100) // pretend we are computing it in CPU-consuming way
        log("Emitting $i")
        emit(i) // emit next value
    }
}.flowOn(Dispatchers.Default) // RIGHT way to change context for CPU-consuming code in flow builder

fun main() = runBlocking<Unit> {
    foo().collect { value ->
        log("Collected $value") 
    } 
}      
```
Output:
```
[DefaultDispatcher-worker-1] Emitting 1
[main] Collected 1
[DefaultDispatcher-worker-1] Emitting 2
[main] Collected 2
[DefaultDispatcher-worker-1] Emitting 3
[main] Collected 3
```
Vậy code trong nguồn phát đã chạy với `Dispatchers.Default` (background thread) và code trong nguồn thu chạy với `Dispatchers.Main` (main thread) đúng như mong muốn ban đầu của chúng ta :D. Một điều cần lưu ý ở đây là toán tử `flowOn` không có khả năng change context của coroutine đang chạy. Vậy sao nó làm được điều này?. Vì nó đã tạo ra 1 coroutine khác chạy trên context do chúng ta set trong hàm `flowOn`. Cụ thể ở đây chúng ta gọi `.flowOn(Dispatchers.Default)` thì `flowOn` sẽ tạo ra 1 coroutine chạy trên `Dispatchers.Default`.
# 3. Flow Exceptions
Nguồn thu có khả năng `throw Exception` nếu code chạy trong nguồn phát xảy ra Exception. Ví dụ:
```kotlin
fun foo(): Flow<Int> = flow {
    for (i in 3 downTo -3) {
        println("3 / $i = ${3 / i}") // nơi xảy ra exception trong nguồn phát
        emit(i) // emit next value
    }
}

fun main() = runBlocking {
     foo().collect { value ->
         println("VALUE = $value")
     }
}
```
Output:
```
3 / 3 = 1
VALUE = 3
3 / 2 = 1
VALUE = 2
3 / 1 = 3
VALUE = 1
Exception in thread "main" java.lang.ArithmeticException: / by zero
```
`Exception` đã xảy ra khi `i = 0` và hiển nhiên nguồn thu/nguồn phát đều phải dừng hoạt động. Chúng ta hoàn toàn có thể `try/catch` để catch exception này trong hàm thu.
```kotlin
fun foo(): Flow<Int> = flow {
    for (i in 3 downTo -3) {
        println("3 / $i = ${3 / i}") // nơi xảy ra exception trong nguồn phát
        emit(i) // emit next value
    }
}

fun main() = runBlocking {
    try {
        foo().collect { value ->
            println("VALUE = $value")
        }
    } catch (e: Throwable) {
        println("Caught $e")
    }
}
```
Output:
```
3 / 3 = 1
VALUE = 3
3 / 2 = 1
VALUE = 2
3 / 1 = 3
VALUE = 1
Caught java.lang.ArithmeticException: / by zero
```
Mặc dù `ArithmeticException` đã bị catch nhưng nguồn thu/nguồn phát đều dừng hoạt động sau khi catch được `Exception`. 

Bây giờ thử `throw Exception` bên trong nguồn thu xem.
```kotlin
fun foo(): Flow<Int> = flow {
    for (i in 3 downTo -3) {
        emit(i) // emit next value
    }
}

fun main() = runBlocking {
    try {
        foo().collect { value ->
            println("3 / $value = ${3 / value}") // nơi xảy ra exception trong nguồn thu
        }
    } catch (e: Throwable) {
        println("Caught $e")
    }
}
```
Output:
```
3 / 3 = 1
3 / 2 = 1
3 / 1 = 3
Caught java.lang.ArithmeticException: / by zero
```
Như vậy `try/catch` vẫn catch được `Exception` dù exception có xảy ra trong nguồn thu hay nguồn phát.

Chúng ta cũng có thể `try/catch` `Exception` bằng toán tử `catch`.
# 4. Toán tử catch
```kotlin
fun foo(): Flow<String> = flow {
    for (i in 3 downTo -3) {
        println("3 / $i = ${3 / i}")
        emit(i.toString()) // emit next value
    }
}

fun main() = runBlocking {
    foo().catch { e -> emit("Caught $e") }
        .collect { value -> println("VALUE = $value")
    }
}
```
Output:
```
3 / 3 = 1
VALUE = 3
3 / 2 = 1
VALUE = 2
3 / 1 = 3
VALUE = 1
VALUE = Caught java.lang.ArithmeticException: / by zero
```
Output của cả 2 ví dụ là như nhau mà trông code có vẻ đẹp hơn dùng `try/catch` đấy. Hơn nữa là trong toán tử `catch` cho phép chúng ta `emit` giá trị cho nguồn thu luôn. Như ví dụ trên, mình đã cho `emit` exception đó đến nguồn thu. `try/catch` thì không thể làm được điều này. Tuy nhiên toán tử `catch` lại không thể catch `Exception` xảy ra trong hàm `collect { }` (nguồn thu) như `try/catch` đã làm được ở ví dụ trên.
```kotlin
fun foo(): Flow<Int> = flow {
    for (i in 3 downTo -3) {
        emit(i) // emit next value
    }
}

fun main() = runBlocking {
    foo().catch { e -> println("Caught $e") }
        .collect { value ->
            println("3 / $value = ${3 / value}") // nơi xảy ra exception trong nguồn thu
        }
}
```
Output:
```
3 / 3 = 1
3 / 2 = 1
3 / 1 = 3
Exception in thread "main" java.lang.ArithmeticException: / by zero
```
Như vậy toán tử `catch` không thể catch được exception xảy ra trong hàm `collect { }`. Có một cách để chúng ta có thể sử dụng toán tử `catch` để catch cả exception xảy ra trong nguồn thu. Nhờ sự trợ giúp của toán tử `onEach`
# 5. Toán tử onEach
Chúng ta sẽ move code trong hàm `collect` (nơi xảy ra `Exception`) vào toán tử `onEach`. Đồng thời hàm `collect` sẽ không còn param nào nữa.
```kotlin
fun foo(): Flow<Int> = flow {
    for (i in 3 downTo -3) {
        emit(i) // emit next value
    }
}

fun main() = runBlocking {
    foo().onEach { value ->
        println("3 / $value = ${3 / value}") // nơi xảy ra Exception
    }.catch { e -> println("Caught $e") }
        .collect()
}
```
Output:
```
3 / 3 = 1
3 / 2 = 1
3 / 1 = 3
Caught java.lang.ArithmeticException: / by zero
```
Như vậy, exception đã được catch bởi toán tử `catch`.

Nếu chúng ta sử dụng toán tử `collect` sau `onEach`, thì code sau nó sẽ đợi cho đến khi `flow` kết thúc việc collect rồi mới được chạy. Ví dụ:
```kotlin
fun events(): Flow<Int> = (1..3).asFlow().onEach { delay(100) }

fun main() = runBlocking<Unit> {
    events()
        .onEach { event -> println("Event: $event") }
        .collect() // <--- Collecting the flow waits
    println("Done")
} 
```
Output:
```
Event: 1
Event: 2
Event: 3
Done
```
Như vậy, dòng code `println("Done")` đã phải đợi `flow` kết thúc việc `collect` mới được chạy. Nếu chúng ta không muốn điều này xảy ra, chúng ta muốn coroutine vẫn tiếp tục chạy xuống code phía dưới dù có đang `delay` hay `collect`. Toán tử `launchIn` sẽ giúp chúng ta.
# 6. Toán tử launchIn
Toán tử này truyền vào một param là `CoroutineScope` và return một biến `Job`. Biến job này có thể giúp chúng ta cancel code trong `flow` mà không cancel hết cả coroutine. Code trong coroutine vẫn tiếp tục chạy.
```kotlin
fun events(): Flow<Int> = (1..3).asFlow().onEach { delay(100) }

fun main() = runBlocking<Unit> {
    events()
        .onEach { event -> println("Event: $event") }
        .launchIn(this) // <--- Launching the flow in a separate coroutine
    println("Done")
}   
```
Output:
```
Done
Event: 1
Event: 2
Event: 3
```
# 7. Flow completion. Toán tử onCompletion
Đôi khi chúng ta muốn biết thời điểm `flow` vừa kết thúc tiến trình đúng ko nào. Có 2 cách để biết được điều này.

**Cách 1** là sử dụng khối `finally`
```kotlin
fun foo(): Flow<Int> = (1..3).asFlow()

fun main() = runBlocking<Unit> {
    try {
        foo().collect { value -> println(value) }
    } finally {
        println("Done")
    }
}   
```
Output:
```
1
2
3
Done
```
Như vậy sau khi tiến trình kết thúc thì nó sẽ chạy sang code khối `finally`.

**Cách 2**: Toán tử `onCompletion` sẽ giúp chúng ta:
```kotlin
fun foo(): Flow<Int> = (1..3).asFlow()

fun main() = runBlocking<Unit> {
    foo()
        .onCompletion { println("Done") }
        .collect { value -> println(value) }
}
```
Output:
```
1
2
3
Done
```
Như vậy sau khi tiến trình `flow` kết thúc nó sẽ chạy vào code trong khối `onCompletion`. Và chúng ta có thể tận dụng chỗ này để hide `progressBar` chẳng hạn. Một ưu điểm nữa của toán tử `onCompletion` là nó có thể giúp ta biết được `flow` đã kết thúc tiến trình êm ấm hay kết thúc bằng một `Exception`. Chúng ta có thể dễ dàng biết được thông qua param nullable `Throwable?`. Nếu param này mà `null` thì mọi chuyện êm ấm, nếu param này `khác null` thì exception đã xảy ra rồi đấy! 
```kotlin
fun foo(): Flow<Int> = flow {
    emit(1)
    throw RuntimeException()
}

fun main() = runBlocking<Unit> {
    foo()
        .onCompletion { cause -> if (cause != null) println("Flow completed exceptionally") }
        .catch { cause -> println("Caught exception") }
        .collect { value -> println(value) }
} 
```
Output:
```
1
Flow completed exceptionally
Caught exception
```
Cả 2 cách trên đều có thể được dùng tùy theo sở thích và style code của bạn :D
# Kết luận
Hy vọng qua bài viết này, các bạn đã nắm được các thêm một vài toán tử về `Flow` cũng như context và xử lý exception trong `Flow`. Phần tiếp theo mình sẽ viết về `Channels` và so sánh nó với `Flow`. Cảm ơn các bạn đã theo dõi bài viết này. Hy vọng các bạn sẽ tiếp tục theo dõi những phần tiếp theo. :D. 

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

[Cùng học Kotlin Coroutine, phần 8: Flow (part 1 of 3)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-8-flow-part-1-of-3-bWrZnx695xw)

[Cùng học Kotlin Coroutine, phần 9: Flow (part 2 of 3)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-9-flow-part-2-of-3-07LKXmX8ZV4)

Đọc tiếp phần 11: [Cùng học Kotlin Coroutine, phần 11: Channels (part 1 of 2)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-11-channels-part-1-of-2-bJzKmJpXZ9N)