# 1. SendChannel, ReceiveChannel
Ở bài trước, chúng ta đã biết `Channel` có 2 function chính là `send()` và `receive()`, ở bài này chúng ta sẽ biết thêm 2 interface là `SendChannel`, `ReceiveChannel`. `SendChanel` nó cũng là 1 channel nhưng chỉ dùng để send value, ko dùng để receive. Như vậy nó sẽ có một số function chính như sau:
```kotlin
/**
    Hàm dùng để close channel
*/
public fun close(cause: Throwable? = null): Boolean

/**
    Return `true` nếu channel đã bị close
*/
public val isClosedForSend: Boolean

/**
    Hàm dùng để send value
*/
public suspend fun send(element: E)
```
Tương tự, `ReceiveChannel` cũng là 1 channel nhưng chỉ dùng để receive value, ko dùng để send. Một số function chính như sau:
```kotlin
/**
    Hàm dùng để close channel
*/
public fun cancel(cause: CancellationException? = null) 

/**
    Return `true` nếu channel đã bị close
*/
public val isClosedForReceive: Boolean 

/**
    Returns `true` if this channel is empty
*/
public val isEmpty: Boolean

/**
    Receive value và remove value đó ra khỏi channel
*/
public suspend fun receive(): E
```
Và đây là interface `Channel`. Nó kế thừa cả `SendChannel` và `ReceiveChannel` nên nó vừa có thể send, vừa có thể receive.
```kotlin
public interface Channel<E> : SendChannel<E>, ReceiveChannel<E>
```
# 2. Hàm produce, actor
Như chúng ta đã biết ở bài trước để tạo ra 1 Channel thì chỉ đơn giản là `Channel<T>()`. Nhưng chúng ta có thể sử dụng các hàm `produce`, `actor` để đơn giản hóa việc tạo ra một coroutine và một Channel:
## 2.1. Hàm produce
Hàm này cho phép chúng ta sử dụng các function của 1 `SendChannel` nhưng lại return 1 `ReceiveChannel`. Ví dụ:
```kotlin
fun CoroutineScope.produceSquares(): ReceiveChannel<Int> = produce {
    // Chúng ta có thể sử dụng các hàm của SendChannel trong block này. 
    // Ở đây mình dùng hàm send
    for (x in 1..5) send(x * x)
}
```
Bây giờ thử ứng dụng nó để giao tiếp giữa 2 coroutine xem hàm `produce` tiện lợi như thế nào nhé.
```kotlin
fun CoroutineScope.produceSquares(): ReceiveChannel<Int> = produce {  // coroutine A
    for (x in 1..5) send(x * x)
}

fun main() = runBlocking {                                            // coroutine B
    // hàm produceSquares() trả về 1 ReceiveChannel. Nhờ đó mà ta có thể receive giá trị dễ dàng
    val squares: ReceiveChannel<Int> = produceSquares()    
    
    // Hàm consumeEach là 1 extension function của ReceiveChannel.
    // Nó giúp chúng ta receive value và cho phép thực hiện 1 action gì đấy với giá trị vừa receive được.
    squares.consumeEach {
        println("number $it")
    }
    println("Done!")
}
```
Output:
```
number 1
number 4
number 9
number 16
number 25
Done!
```
Như vậy chúng ta đã truyền dữ liệu từ coroutine A sang coroutine B chỉ với 1 ít dòng code.
## 2.2. Hàm actor
Hàm này cho phép chúng ta sử dụng các function của 1 `ReceiveChannel` nhưng lại return 1 `SendChannel`. Ví dụ:
```kotlin
fun CoroutineScope.myActor(): SendChannel<Int> = actor {
    // Chúng ta có thể sử dụng các hàm của ReceiveChannel trong block này. 
    // Ở đây mình dùng hàm receive
    val value = receive()         
    println(value)			
}
```
Tương tự mình cũng sử dụng nó để giao tiếp giữa 2 coroutine.
```kotlin
fun CoroutineScope.myActor(): SendChannel<Int> = actor {
    val value = receive()     // ở đây sẽ nhận được giá trị 123
    println(value)			
}

fun main() = runBlocking {
     // hàm myActor() return SendChannel nên ta có thể dùng nó để send data
    val myActor = myActor()           
    myActor.send(123)
    println("Done!")
}
```
Output:
```
123
Done!
```
# 3. Các loại Channel
## 3.1. Rendezvous channel (Unbuffered channel / Default channel)
Ở bài trước, chúng ta đã biết khi channel send mà ko có ai nhận thì con coroutine nhận nhiệm vụ send đó sẽ bị suspend cho đến khi có ai đó nhận giá trị nó vừa send. Tương tự, khi channel receive mà ko có giá trị để receive (channel is empty) thì con coroutine nhận nhiệm vụ receive này cũng bị suspend cho đến khi có ai đó send cho nó giá trị để nó nhận. 

Channel được mình giới thiệu ở bài trước chính là loại channel mặc định hay còn gọi là `Rendezvous channel` hay `Unbuffered channel`. Vì nó ko có buffer nên nó mới bị suspend như vậy. Để biết buffer là gì thì chúng ta đến với loại thứ 2: `Buffered Channel`

Chúng ta có thể tạo ra 1 Rendezvous channel bằng cách:
```kotlin
val channel = Channel<Int>() // vì nó là default
```
hoặc
```kotlin
val channel = Channel<Int>(capacity = Channel.RENDEZVOUS)
```

![](https://images.viblo.asia/ca7aaf5a-07d4-4ca5-9479-aaac08b93b83.png)

Nhìn hình có thể thấy coroutine one nó đang có 1 data nhưng lại bị suspend, ko thể send qua channel vì coroutine two còn đang bận xử lý. Cái ống đó tượng trưng cho channel.
## 3.2. Buffered Channel
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>(capacity = 4) // tạo ra 1 buffered channel với capacity = 4
    val sender = launch {
        // launch 1 coroutine để send data
        repeat(10) { // send 10 data
            channel.send(it) // hàm send sẽ bị suspend khi buffer is full
            println("Sending $it") // in ra sau khi send
        }
    }

    // cố ý ko nhận data để xem thằng send có bị suspend ko
    delay(1000)
    sender.cancel() // cancel sender coroutine
}
```
Output:
```
Sending 0
Sending 1
Sending 2
Sending 3
```
Vì sao mình cố ý không nhận data mà thằng coroutine send data nó không bị suspend mà mãi đến khi in ra được 4 data nó mới bị suspend. Chính là nhờ buffer đấy, ở đây mình tạo ra 1 channel có buffer bằng 4 nên khi nào buffer full thì nó mới bị suspend. Các giá trị buffer được lưu trữ trong 1 `Array`. Ví dụ mình tạo bufferd channel với capacity = 4 thì sẽ có 1 Array với size = 4 lưu trữ 4 data được buffered này. Khác với thằng Unbuffered channel ở trên, Unbuffered channel có capacity = 0 (ko có buffer) nên chỉ cần send 1 giá trị mà ko có ai nhận thì nó lập tức bị suspend.

![](https://images.viblo.asia/bf46bcc8-cb66-478c-9b38-d9be6e1e2b5f.png)

Nhìn vào ảnh có thể thấy channel vẫn nhận data từ thằng coroutine one send tới, cho đến khi full rồi mà thằng coroutine receive nó vẫn chưa đến nhận được thì channel ko nhận data nữa nên thằng coroutine send bị suspend. Còn khi channel receive mà ko có giá trị để receive (channel is empty) thì con coroutine nhận nhiệm vụ receive này cũng bị suspend (giống Unbuffered channel)

Cách tạo ra 1 buffered channel, bạn muốn channel có buffer bằng bao nhiêu thì truyền số đó vào param `capacity`.
```kotlin
val channel = Channel<Int>(capacity = ???)
```
## 3.3. Conflated channel
`Conflated channel` Là 1 buffered channel nhưng capacity chỉ bằng 1. Thằng này khác thằng bufferd channel ở chỗ mặc dù chỉ có capacity = 1 nhưng khi full nó ko suspend thằng coroutine sender mà cho phép thằng sender tiếp tục send value, giá trị mới nhất sẽ overwrite lên giá trị cũ. Tức là lúc nào trong channel cũng chỉ có tối đa 1 giá trị mà thôi.

![](https://images.viblo.asia/6b1ee57c-a3b2-450d-ae5b-c7cb551b4cba.png)

Như vậy Conflated channel ko bao giờ suspend coroutine sender. Cho nó send thoải mái. Còn khi channel receive mà ko có giá trị để receive (channel is empty) thì con coroutine nhận nhiệm vụ receive này cũng bị suspend (giống Unbuffered channel). Code ví dụ cho dễ hiểu:
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>(Channel.CONFLATED)
    val sender = launch {
        repeat(5) { // send 5 giá trị
            println("Sending $it")
            channel.send(it)
        }
    }
    delay(1000) // delay 1s để nó send đủ cả 5 giá trị rồi mới nhận
    channel.consumeEach { println("item = $it") } // in ra tất cả giá trị nhận được
    sender.cancel() // cancel sender coroutine
}
```
Output:
```
Sending 0
Sending 1
Sending 2
Sending 3
Sending 4
item = 4
```
Nhìn vào output có thể thấy thằng coroutine sender đã send đủ 5 giá trị nhưng thằng coroutine receiver chỉ nhận được đúng 1 giá trị cuối cùng là `item = 4`.

Cách tạo ra 1 Conflated channel:
```kotlin
val channel = Channel<Menu>(capacity = Channel.CONFLATED)
```
## 3.4. Unlimited channel
Cái tên nó đã nói lên tất cả. Nó là 1 buffered channel nhưng `capacity = vô tận`. Khác với buffered channel lưu trữ buffered data trong 1 `Array` thì `Unlimited channel` lưu trữ data trong 1 `LinkedList`. Vì là `List` nên nó lưu trữ vô hạn, tất nhiên khi hết memory để lưu trữ thì nó sẽ throw `OutOfMemoryException`. Vì buffer vô hạn nên coroutine sender không bao giờ bị suspend. Cho nó send data vô tư thoải mái luôn. Nhưng nếu channel is empty, coroutine nhận cũng sẽ bị suspend (giống Unbuffered channel)

![](https://images.viblo.asia/c8883f41-84ef-409e-b268-7761db477d2c.png)

Code ví dụ:
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>(Channel.UNLIMITED)
    val sender = launch {
        repeat(7) { // send 7 data
            channel.send(it)
        }
    }
    delay(1000) 
    // cố tình delay 1s để coroutine receiver ko thể receive value. Xem coroutine sender có bị suspend ko?
    
    repeat(7) { // nhận 7 data
        val value = channel.receive()
        println("number $value")
    }
    sender.cancel() // cancel sender coroutine
}
```
Output:
```
number 0
number 1
number 2
number 3
number 4
number 5
number 6
```
Như các bạn thấy, coroutine sender ko bị suspend kể cả khi không có ai nhận. Nó cứ send đủ 7 data và cuối cùng sau 1s bị delay thì thằng coroutine receiver cũng chui vào ống channel và nhận đủ cả 7 data :D. 

Cách tạo ra 1 Unlimited channel:
```kotlin
val channel = Channel<Int>(Channel.UNLIMITED)
```

# Kết luận
Hy vọng qua bài viết này, các bạn đã hiểu thêm về `Channels`. Đây cũng là phần cuối của series Cùng học Kotlin Coroutine này. Cảm ơn các bạn đã theo dõi chặng đường dài hơn 1 năm này :D. Series tiếp theo của mình sẽ viết toàn tập về `ngôn ngữ Kotlin trong lập trình Android`. Hy vọng các bạn đón đọc ủng hộ :D

Nguồn tham khảo:

https://kotlinlang.org/docs/reference/coroutines/channels.html

https://proandroiddev.com/kotlin-coroutines-channels-csp-android-db441400965f

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

[Cùng học Kotlin Coroutine, phần 10: Flow (part 3 of 3)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-10-flow-part-3-of-3-aWj53G4o56m)

[Cùng học Kotlin Coroutine, phần 11: Channels (part 1 of 2)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-11-channels-part-1-of-2-bJzKmJpXZ9N)