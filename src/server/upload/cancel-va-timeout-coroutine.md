## Cancel một coroutine đang chạy

Thông thường thì đây là cách mà chúng ta sẽ cancel một coroutine đang chạy:

```kotlin
val job = launch {
    repeat(1000) { i ->
            println("I'm sleeping $i ...")
        delay(500L)
    }
}
delay(1300L) // delay một thời gian
println("main: I'm tired of waiting!")
job.cancel() // cancels job
job.join() // chờ cho đến khi job hoàn thành 
println("main: Now I can quit.")
```

Và sau đây là output của chương trình:

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
main: I'm tired of waiting!
main: Now I can quit.
```

Khi chương trình gọi lệnh `job.cancel` thì chúng ta sẽ không thấy output nào được in ra nữa như chúng ta mong đợi. Nhưng rất tiếc là đời không như mơ :<. Việc cancel coroutine không phải lúc nào cũng màu hồng như chúng ta thấy, hãy cùng xem đoạn code sau:

```kotlin
val startTime = System.currentTimeMillis()
val job = launch(Dispatchers.Default) {
    var nextPrintTime = startTime
    var i = 0
    while (i < 5) {
        // một giây in ra 2 cái message
        if (System.currentTimeMillis() >= nextPrintTime) {
            println("I'm sleeping ${i++} ...")
            nextPrintTime += 500L
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
```

và đây là output của chương trình

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
main: I'm tired of waiting!
I'm sleeping 3 ...
I'm sleeping 4 ...
main: Now I can quit.
```

Như các bạn thấy thì coroutine vẫn chạy và bơ đi việc chúng ta gọi `cancel`. Lý do mà coroutine không chịu dừng là do đoạn code coroutine ở trên của chúng ta không có tính "cộng tác" (cooperative) với việc cancel của một coroutine. Đây là điều kiện cần được phải thỏa mãn nếu muốn cho code coroutine của chúng ta  có tính cancellable.  Có nhiều cách mà chúng ta có thể sử dụng để thực hiện điều này và mình sẽ trình bày ở phần tiếp theo phía dưới.

Nếu bạn vẫn đang vò đầu bứt tai về việc tại sao 2 đoạn code gần như tương tự như nhau mà sao khi cancel lại khác nhau như vậy thì đây là keyword gợi ý dành cho bạn: `delay`. Vâng, lý do là bởi ở đoạn code đầu có sử dụng `delay` còn cái thứ hai thì không. Nguyên do sâu xa là do mỗi lần hàm `delay` được gọi thì nó sẽ thực hiện việc check xem liệu coroutine của chúng ta có bị `cancel` chưa, nếu có thì nó sẽ throw một `CancellationException`. Tất cả các suspending function trong `kotlinx.coroutines` đều cancellable. 

## Làm cho code coroutine trở nên cancellable

Có hai cách chúng ta có thể làm để code coroutine trở nên cancellable. Cách đầu tiên là định kỳ gọi môt hàm suspend nhằm mục đích check xem coroutine đã bị cancel hay chưa. Có một hàm suspend lý tưởng cho việc này là hàm [yield](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/yield.html). Cách thứ hai là chúng ta sẽ chủ động trong việc kiểm tra trạng thái của việc cancel. Chúng ta sẽ cùng xem qua cách thứ hai nhé.

Trong đoạn code thứ hai thì các bạn hãy thay `while(i < 5)` bằng `while(isActive)` và chạy lại:

```kotlin
val startTime = System.currentTimeMillis()
val job = launch(Dispatchers.Default) {
    var nextPrintTime = startTime
    var i = 0
    while (isActive) { // cancellable computation loop
        // print a message twice a second
        if (System.currentTimeMillis() >= nextPrintTime) {
            println("I'm sleeping ${i++} ...")
            nextPrintTime += 500L
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
```

Và đây là outout:

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
main: I'm tired of waiting!
main: Now I can quit.
```

Như các bạn có thể thấy thì vong lặp giờ đã bị cancel. `isActive` là một thuộc tính mở rộng của coroutine thông qua `CoroutineScope`.

## Đóng tài nguyên với finally

Các cancellable function đều throw `CancellationException` khi có sự kiện cancel xảy ra. Do vậy nên chúng ta có thể sử dụng `try {...} finally {...}`  hoặc `use`  để đóng các tài nguyên như file do các hành động finalization của chúng sẽ đảm bảo được thực hiện khi có sự kiện cancel xảy ra. Dưới đây là đoạn code sử dụng `try {...} finally {...}`:

```kotlin
val job = launch {
    try {
        repeat(1000) { i ->
                println("I'm sleeping $i ...")
            delay(500L)
        }
    } finally {
        println("I'm running finally")
    }
}
delay(1300L)
println("main: I'm tired of waiting!")
job.cancelAndJoin() 
println("main: Now I can quit.")
```

Việc gọi `cancelAndJoin()` sẽ đảm bảo là coroutine sẽ được cancel và hành động finalize được hoàn thành trước khi nháy sang câu lệnh tiếp theo. Vì vậy nên chúng ta có output của chương trình như sau:

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
main: I'm tired of waiting!
I'm running finally
main: Now I can quit.
```

## Chạy một non-cancellable block

Có một chi tiết đáng lưu ý là mọi nỗ lực gọi một hàm suspend trong block `finally` như ở đoạn code trên đều sẽ throw  một exception là `CancellationException` do coroutine gọi hàm này tại thời điểm đấy đã bị cancel rồi. Bình thường thì chẳng mấy khi chúng ta cần gọi một hàm suspend trong `finally` cả do các hành động đóng tài nguyên (đóng file, cancel job hoặc đóng một channel liên lạc nào đó) thông thường đều là hành động non-blocking và không dây dưa gì đến hàm suspend cả. Tuy nhiên trong trường hợp nếu chúng ta thực sự cần gọi một hàm suspend trong một coroutine đã bị cancel thì chúng ta có thể wrap đoạn code trong `finally` vào trong `withContext(NonCancellable){...}` như sau:

```kotlin
val job = launch {
    try {
        repeat(1000) { i ->
                println("I'm sleeping $i ...")
            delay(500L)
        }
    } finally {
        withContext(NonCancellable) {
            println("I'm running finally")
            delay(1000L)
            println("And I've just delayed for 1 sec because I'm non-cancellable")
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
```

## Timeout

Giả sử có bài toán đặt ra cho chúng ta là cần cancel một coroutine sau một khoảng thời gian nhất định thì các bạn sẽ làm như nào? Có một cách thủ công là chúng ta có thể chạy một coroutine độc lập khác và dùng nó để cancel coroutine còn lại (thông qua một đối tượng `Job` tương ứng) sau một khoảng thời gian nhất định.

Thật may là Kotlin có cung cấp cho chúng ta một hàm gọi là `withTimeout` trong trường hợp này và đây là minh họa cách sử dụng:

```kotlin
withTimeout(1300L) {
    repeat(1000) { i ->
            println("I'm sleeping $i ...")
        delay(500L)
    }
}
```

Và đây là output:

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
Exception in thread "main" kotlinx.coroutines.TimeoutCancellationException: Timed out waiting for 1300 ms
```

Exception `TimeoutCancellationException` được throw ở đây là subclass của `CancellationException`. Ở trong ví dụ `try {...} catch {...}` ở phần trước thì chúng ta sẽ không thấy stacktrace được in ra khi gọi một suspend function trong một coroutine đã bị cancel. Lý do là bởi ngoại lệ `CancellationException` được Kotlin coi là một lý do hợp lệ cho việc kết thúc một coroutine. Còn trong trường hợp này thì chúng ta đang sử dụng `withTimeout` ngay bên trong hàm `main` cho nên mọi chuyện không như vại. Nếu không muốn `TimeoutCancellationException` được throw khi timeout xảy ra thì chúng ta có thể sử dụng `withTimeoutOrNull` thay vì `withTimeout`..

Trong trường hợp chúng ta cũng cần thực hiện một số hành động final khi timeout xảy ra thì tương tự chúng ta có thể wrap đoạn code với timeout vào `try {...} catch (e: TimeoutCancellationException) {...}`

## Kết

Hi vọng sau bài viết này của mình thì các bạn sẽ chú ý hơn trong việc cancel  một coroutine đúng cách nhằm tránh hậu quả đáng tiếc xảy ra =)). Cảm ơn các bạn đã chú ý theo dõi, hẹn gặp lại các bạn trong các bài viết sau.

**Nguồn:https://kotlinlang.org/docs/reference/coroutines/cancellation-and-timeouts.html**