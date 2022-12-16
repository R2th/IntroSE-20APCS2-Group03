# 1. Giới thiệu về Channels
`Channels` khá giống với `Flow` mà mình đã giới thiệu trong [phần 8](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-8-flow-part-1-of-3-bWrZnx695xw), [phần 9](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-9-flow-part-2-of-3-07LKXmX8ZV4), [phần 10](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-10-flow-part-3-of-3-aWj53G4o56m) của series này. Nó cũng giúp chúng ta transfer một luồng giá trị (stream of values). 

`Channels` khá giống với [BlockingQueue](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/BlockingQueue.html), tức là nó cũng hoạt động như một `Queue` (hàng đợi) là `FIFO (First In First Out)`, đại khái cách hoạt động của `BlockingQueue` là thằng nào vào Queue trước ta sẽ xử lý trước, thằng nào vào sau thì đợi thằng trước xong đã nhé :D). Điểm khác nhau ở đây là `BlockingQueue` nó sử dụng 2 hàm `put` (thêm vào queue) và hàm `take` (lấy từ queue ra) và 2 hàm này là chạy `blocking`  còn `Channels` sử dụng 2 hàm `send` (tương tự hàm `put`) và `receive` (tương tự hàm `take`) và 2 hàm này là suspend function tức là nó có khả năng `suspend/resume` và `non-blocking` (xem lại [blocking/non-blocking và suspend function](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-2-build-first-coroutine-with-kotlin-Do7544Ee5M6#_3-blocking-vs-non-blocking--normal-function-vs-suspend-function-2))
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>()
    val job = launch {
        for (x in 1..5) {
            channel.send(x * x)
        }
    }
    // print 5 giá trị, trước khi nhận cho delay 1s
    delay(1000) // delay 1s
    println(channel.receive()) // nhận giá trị thứ 1
    delay(1000) // delay 1s
    println(channel.receive()) // nhận giá trị thứ 2
    delay(1000) // delay 1s
    println(channel.receive()) // nhận giá trị thứ 3
    delay(1000) // delay 1s
    println(channel.receive()) // nhận giá trị thứ 4
    delay(1000) // delay 1s
    println(channel.receive()) // nhận giá trị thứ 5
    println("Done! Channel is empty?: ${channel.isEmpty} / Coroutine is completed?: ${job.isCompleted} / Coroutine is active?: ${job.isActive}")
}
```
Output:
![](https://images.viblo.asia/d029754b-1c35-4800-9846-fd14672c1ecd.gif)
Giải thích code:

`val channel = Channel<Int>()`: tạo một channel để transfer một luồng giá trị kiểu `Int`

`channel.send(value)`: thêm một giá trị vào channel

`channel.receive()`: trả về giá trị được `send` sớm nhất (first in), đồng thời remove giá trị đó ra khỏi channel

![](https://images.viblo.asia/fffd7fa9-ce6f-4d0e-97b5-8d24d7b60f96.gif)

Các bạn có thể tưởng tượng đoạn code trên hoạt động giống như các chú gấu đang xếp hàng để mua vé xem phim trong ảnh trên. Giả sử có 5 chú gấu đang đứng đợi mua vé xem phim và chỉ có 5 chiếc vé xem phim. Sau 1s đầu tiên, 1 vé được in ra (channel send) thì lập tức chú gấu đầu tiên nhận nó (channel receive) và đi ra khỏi hàng (remove khỏi channel), 1s tiếp theo đến chú gấu tiếp theo. Cứ vậy, sau 5s thì bán hết 5 vé, cũng chẳng còn chú gấu nào đang đợi nhận (channel is empty). Mình có print ra dòng cuối cùng để kiểm tra Channel is empty? (`isEmpty = true`), Coroutine nhận nhiệm vụ send vé đã completed chưa (Output là đã completed (`isCompleted = true`) và ko còn active (`isActive = false`)).

Ở đây mình cho `delay 1s` trước khi nhận đễ dễ thấy rằng: `channel` sau khi in ra 1 vé (`channel.send()`) mà chưa thấy ai nhận thì `coroutine` nhận nhiệm vụ in vé đó sẽ `suspend` lại chờ đến khi có người nhận vé đó (`channel.receive()`) thì nó mới `resume` trở lại và in tiếp.

**Vậy sẽ thế nào nếu in ra 5 vé mà không có ai nhận vé?**

Để trả lời câu hỏi này, mình sẽ dùng cùng 1 bài toán này để so sánh với Flow cho dễ hiểu. 
# 2. Channels vs Flow (Hot & Cold)
Như các bạn đã biết [Flow là một nguồn dữ liệu lạnh (cold streams)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-8-flow-part-1-of-3-bWrZnx695xw#_2-flow-la-nguon-du-lieu-lanh-4). Điều đó có nghĩa là code bên trong `flow { }` sẽ không chạy cho đến khi `Flow` gọi hàm `collect`. Như vậy nếu ko có ai nhận vé thì nó sẽ ko in vé (so smart) :D. Còn `Channels` thì khác, như mình đã nói ở trên thì khi channel `send` nó sẽ tạm `suspend` và chờ đến khi có ai đó `receive` thì nó mới `resume` và tiếp tục `send`. Vậy nên khi in ra 1 vé đầu tiên mà ế quá không có ai nhận thì `coroutine` nhận nhiệm vụ `send` sẽ bị `suspend` vĩnh viễn. Việc này rất nguy hại đến memory nên đây chính là nhược điểm lớn của thằng `Channels`. Vì vậy `Channels` còn được gọi là nguồn dữ liệu nóng (hot streams).

![](https://images.viblo.asia/1fc98566-3e0c-439b-9b11-7db4cdcb74d7.PNG)

Thử code 1 đoạn, channel ko receive.
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>()
    val job = launch {
        for (x in 1..5) {
            channel.send(x * x)
        }
    }

    println("Done! Coroutine is completed?: ${job.isCompleted} / Coroutine is active?: ${job.isActive}")
}
```
Output:

![](https://images.viblo.asia/7db22508-3e0f-46a1-a397-5854f9837485.PNG)

Nhìn vào output. Bạn ko thấy `Process finished with exit code 0` có nghĩa là process này vẫn chưa kết thúc, điều đó đã chứng minh `coroutine job` đã bị suspend forever. Hơn nữa mình còn muốn chắc chắn hơn bằng cách log ra `job.isCompleted` và `job.isActive` và kết quả trong ảnh là `job.isCompleted = false` (coroutine chưa hoàn thành task) và `job.isActive = true` (coroutine còn sống nhăn răng)

Tất nhiên ngay cả trong trường hợp: in ra 5 vé nhưng chỉ có 3 vé được nhận cũng gây ra suspend forever.
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>()
    val job = launch {
        for (x in 1..5) {
            channel.send(x * x)
        }
    }

    for (x in 1..3) { // 3 vé được nhận
        println(channel.receive())
    }
    println("Done! Coroutine is completed?: ${job.isCompleted} / Coroutine is active?: ${job.isActive}")
}
```
Output:
![](https://images.viblo.asia/cd37372d-6383-4aab-94ff-a3a09b4a4eca.PNG)

`Channels` ra đời trước `Flow`, có nghĩa là trước khi có `Flow` thì chúng ta chỉ có một cách duy nhất để transfer a stream of values là sử dụng `Channels`. Có thể nhược điểm lớn này của `Channels` cũng chính là lý do mà `Flow` ra đời. Vì vậy, xét về tính phổ biến, mức độ áp dụng vào các dự án thì `Channels` ít được áp dụng hơn `Flow`. Tuy nhiên, mình cũng muốn viết 1 bài về nó, để giúp chúng ta hiểu thêm về `Flow` và sự khác biệt giữa `Flow` và `Channels` và hoàn thành series một cách trọn vẹn :D.

**Vậy nếu chỉ có 5 vé mà cần nhận tới 10 vé thì sao?**

Thử ngay cho nóng:
```kotlin
fun main() = runBlocking { // COROUTINE NÀY MÌNH ĐẶT TÊN LÀ "run blocking cô rơ tin"
    val channel = Channel<Int>()
    val job = launch {
        for (x in 1..5) {
            channel.send(x * x)
        }
    }

    for (x in 1..10) {
        println("Coroutine is completed?: ${job.isCompleted} / Coroutine is active?: ${job.isActive}")
        println(channel.receive())
    }
    println("Done! Run blocking coroutine is active?: $isActive")
}
```
Output: 
![](https://images.viblo.asia/3b75be7b-ca37-4f8c-9970-0e970788c108.PNG)

Trước khi nhận mình thử kiểm tra xem coroutine nhận nhiệm vụ send đã hoàn thành task chưa, còn active ko?. Kết quả như trong ảnh là sau khi người in vé `send` ra 5 vé và đã có người nhận đã nhận hết 5 vé. Nó đã hoàn thành nhiệm vụ nên khi `vòng lặp for` chạy tới `i = 6` thì nó in ra `Coroutine is completed?: true / Coroutine is active?: false` . Nhưng cũng chính tại `i = 6` này channel lại receive (muốn nhận tiếp vé thứ 6), trong khi 5 vé đã được bán hết rồi vậy nên người nhận này lại bị suspend vĩnh viễn. Bằng chứng là ko thấy `Process finished with exit code 0` trong output có nghĩa là process này vẫn chưa kết thúc. Wait!, khi nảy vừa nói coroutine đã hoàn thành task (`isCompleted = true`) rồi mà sao lại có chuyện suspend nữa?. Nếu để ý lại code sẽ thấy ở trên có 2 coroutine: 1 con tên `"job"` nhận nhiệm vụ `send`, 1 con mình đặt tên là `"run blocking cô rơ tin"` nhận nhiệm vụ `receive`. Vì con coroutine `"run blocking cô rơ tin"` nhận nhiệm vụ `receive` bị suspend. Vì vậy nên chữ `"Done!"` không được print ra.

# 3. Khi nào thì cần sử dụng Channels
Bạn sẽ sử dụng `Channels` khi bạn cần gửi dữ liệu từ một coroutine đến một coroutine khác trong cùng hoặc từ một process đến một process khác. 

![](https://images.viblo.asia/a79d6e57-5ac5-4b4f-b32c-9ce0d858a7d4.png)

1 tấm ảnh hơn triệu lời nói :D. Cái ống đó chính là channel là nơi để con coroutine 1 send data vào ống, và cũng là nơi để con coroutine 2 chui vào ống xúc data ra xử lý :D

Như các ví dụ trên mình đã sử dụng 2 coroutine, 1 con để send, 1 con để receive. Vậy nếu chỉ có 1 coroutine vừa send vừa receive thì có được không?. Tất nhiên là KHÔNG!. Vì lúc vừa mới `send` xong 1 giá trị đầu tiên thì coroutine đó đã bị suspend rồi, vì vậy nên nó chưa kịp chạy đến `receive` và dẫn đến bị suspend vĩnh viễn. Ví dụ:
```kotlin
fun main() = runBlocking { // Receive coroutine
    val channel = Channel<Int>()
    val job = launch { // Send coroutine
        for (x in 1..5) {
            channel.send(x * x)
            println("con sông ngăn cách")
            println(channel.receive())
        }
    }
    println("Done! Receive coroutine is active?: $isActive / Send coroutine is active?: ${job.isActive}")
}
```
Output:
![](https://images.viblo.asia/1a84ffe5-e8d7-4a80-9798-2718e4e7a27e.PNG)

Nhìn vào output sẽ thấy `Send coroutine` đã bị suspend vĩnh viễn. Thậm chí chữ `"con sông ngăn cách"` còn không được in ra thì sao chạm đến được dòng code `channel.receive()`. Con `Send coroutine` chưa hoàn thành task nên `isActive = true` là đúng rồi, sao con `Receive coroutine` cũng `isActive = true`, nó chạy xong code in ra được chữ "Done" rồi cơ mà :D. Cái này liên quan đến bài cũ: `Một coroutine cha luôn chờ đợi để tất cả các coroutine con của nó chạy xong hoàn thành nhiệm vụ thì nó mới hoàn thành nhiệm vụ`. À phải rồi, con `Send coroutine` được `launch` bên trong con `Receive coroutine` nên nó là con của `Receive coroutine`. Và tất nhiên con chưa xong task, cha nào dám đi ngủ :D. ([Đọc lại bài cũ](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-6-coroutine-scope-aWj536n8l6m#_2-cac-dac-diem-cua-coroutine-scope-1))

Túm cái váy lại là khi channel `send`, thì `Send coroutine` bị suspend, nó sẽ resume lại khi có có 1 coroutine khác đã `receive` được cái giá trị nó vừa send. Khi channel gọi hàm `receive` cũng vậy,  `Receive coroutine` cũng sẽ bị suspend cho đến khi có 1 coroutine khác `send` giá trị để nó nhận.
# 4. Iteration over channel
Thay vì dùng vòng for thông thường, chúng ta có thể receive value bằng cách duyệt vòng lặp qua channel. Ví dụ:
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (x in 1..5) {
            channel.send(x * x)
        }
    }
    for (value in channel) println(value)
    println("Done!")
}
```
Output: 
![](https://images.viblo.asia/f48173ed-08d6-448c-acbb-cf0dff2080be.PNG)

`Receive Coroutine` đã bị suspend vĩnh viễn nên chữ `"Done"` ko được in ra. Cẩn thận khi dùng cách này `for (value in channel) println(value)` vì nó giống như một vòng lặp vô tận ấy, nó sẽ lặp cho đến khi channel đã bị close. Vậy làm thế nào để close channel.
# 5. Close channel
Đơn giản chỉ là dùng hàm `channel.close()`. 
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (x in 1..5) channel.send(x * x)
        channel.close() // we're done sending
    }
    // here we print received values using `for` loop (until the channel is closed)
    for (value in channel) println(value)
    println("Done!")
}
```
Output:
```
1
4
9
16
25
Done!

Process finished with exit code 0
```
Như các bạn thấy sau khi `send` và `receive` hết 5 giá trị thì `close` channel nên vòng lặp `for (value in channel)` sẽ bị dừng lặp và chữ `"Done"` được in ra, process kết thúc!. Cách hoạt động của hàm `close` này là khi gọi `channel.close()` nó sẽ send 1 special token đến channel, channel receive được token này sẽ hiểu và close channel, đồng thời dừng `vòng lặp for`.

Có 2 lưu ý liên quan đến việc channel bị close:

**1/ Nếu channel đã `close` nhưng vẫn cố gắng `receive` thì sẽ `throw ClosedReceiveChannelException`**
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (x in 1..5) channel.send(x * x)
        channel.close() // sau khi send xong 5 phần tử thì close
    }
    for (y in 1..10) println(channel.receive()) // send có 5 mà nhận tới 10
    println("Done!")
}
```
Output:
```
1
4
9
16
25
Exception in thread "main" kotlinx.coroutines.channels.ClosedReceiveChannelException: Channel was closed
```
**2/ Nếu channel đã `close` nhưng vẫn cố gắng `send` thì sẽ `throw ClosedReceiveChannelException`**
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (i in 1..10) {
            if (i == 5) channel.close() // nếu i = 5 thì close đi, ko được send nữa.
            channel.send(i * i) // nhưng ta vẫn cố send i = 5 -> throw ClosedSendChannelException
        }
    }
    for (y in 1..5) {
        println(channel.receive())
    }
    println("Done!")
}
```
Output:
```
1
4
9
16
Exception in thread "main" kotlinx.coroutines.channels.ClosedSendChannelException: Channel was closed
```

Chúng ta có thể custom lại `Exception` trong hàm close thay vì cho throw `ClosedSendChannelException` hay `ClosedReceiveChannelException` bằng hàm `close(cause: Throwable?)`
```kotlin
fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (i in 1..10) {
            if (i == 5) channel.close(Throwable("ta cho lệnh đóng channel lại!")) // nếu i = 5 thì close đi, ko được send nữa.
            channel.send(i * i) // nhưng ta vẫn cố send i = 5 -> throw Throwable
        }
    }
    for (y in 1..5) {
        println(channel.receive())
    }
    println("Done!")
}
```
Output:
```
1
4
9
16
Exception in thread "main" java.lang.Throwable: ta cho lệnh đóng channel lại!
```
# Kết luận
Hy vọng qua bài viết này, các bạn đã hiểu cơ bản về `Channels`. Phần tiếp theo mình sẽ giới thiệu `producers, consumers` trong `Channels` và các loại `Channels`. Cảm ơn các bạn đã theo dõi bài viết này. Hy vọng các bạn sẽ tiếp tục theo dõi những phần tiếp theo. :D. 

Nguồn tham khảo:

https://kotlinlang.org/docs/reference/coroutines/channels.html

https://medium.com/@elizarov/cold-flows-hot-channels-d74769805f9

https://www.youtube.com/watch?v=tYcqn48SMT8&feature=youtu.be

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

Đọc tiếp phần 12: [Cùng học Kotlin Coroutine, phần 12: Channels (part 2 of 2)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-12-channels-part-2-of-2-aWj5376156m)