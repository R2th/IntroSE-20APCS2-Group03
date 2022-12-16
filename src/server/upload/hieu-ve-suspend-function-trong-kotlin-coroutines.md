Khi nói về coroutine, **_Suspend Functions_** được coi là xương sống của vấn đề đó. Vì thế nó rất quan trọng để biết trước khi ai đó có thể thực sự đánh giá về coroutines một cách đầy đủ.

Tuy hiên, để hiểu được **_Suspend Functions_** là cái gì, ngay cả sau khi đã tìm hiểu nhiều trên internet thì nó cũng không thực sự là đơn giản, đặc biệt là việc làm thế nào để nó không blocking Thread? Coroutines và Thread thực sự khác nhau như thế nào?

Trong [Kotlin official coroutines documentation](https://kotlinlang.org/docs/reference/coroutines.html#blocking-vs-suspending), nó được bắt đầu như sau

> Basically, coroutines are computations that can be suspended without blocking a thread

![img_basic]()

## Tìm hiểu về BLOCKING và SUSPENDING

Tôi đã tìm kiếm về blocking và suspending và tìm được nó trong [English Language Site](https://english.stackexchange.com/questions/117771/suspended-vs-blocked-meaning)

> A process is blocked when there is some external reason that it can not be restarted, e.g., an I/O device is unavailable, or a semaphore file is locked. A process is suspended means that the OS has stopped executing it, but that could just be for time-slicing (multitasking). There is no implication that the process can not be resumed immediately.
> 
> Neither of these words, especially blocked, are being used the same as in non-computer contexts.

Những từ ngữ trên mang tính khoa học máy tính cao và không dễ hiểu. Nhưng nó cung cấp một số gợi ý. Có điều gì đó về **_time-slicing_** và **_resume immediately_**.

### Minh họa bằng sơ đồ

Từ mô tả đã được nói ở bên trên, tôi vẽ ra sự khác biệt giữa **_Blocking_** và **_Suspending_** như dưới đây

![BLOCKING](https://cdn-images-1.medium.com/max/1600/1*t28Sfv0JdKBTNAa0ekI3Pw.png)
BLOCKING: `Function A` được hoàn thành trước khi `Function B` tiếp tục được gọi đến. Thread này đã khóa `Function A` cho đến khi hoàn thành việc xử lý.

![SUSPENDING](https://cdn-images-1.medium.com/max/1600/1*Ogq6yFxXawg7-lvMKIcn5g.png)
SUSPENDING: `Function A` khi đã được khởi chạy. nó có thể bị suspended, và để `Function B`thực thi, rồi sau đó tiếp tục resume lại. Thread không bị khóa bởi Function A.

Ngắn gọn thì suspend function là một function có khả năng được started, pause và resume (và quá trình pause và resume có thể được thực thi lại nhiều lần) và sau đó kết thúc.

### Let’s talk code, launch vs thread…

Thảo luận về coroutines mà không code thì không được ràng. Hãy xem thêm các thông tin về nó ở dưới đây

#### Chạy như Thread
Hãy bắt đầu với một ví dụ đơn giản

```kotlin
fun testRunFunction() {
    // Start a coroutine
    launch {
        println("In start : ${getThreadName()}")
        Thread.sleep(200)
        println("In ended : ${getThreadName()}")
    }

    run {
        println("Out start: ${getThreadName()}")
        Thread.sleep(300)
        println("Out ended: ${getThreadName()}")
    }
}
```

Và kết quả như dưới đây
```
Out start: main
In start : ForkJoinPool.commonPool-worker-1
In ended : ForkJoinPool.commonPool-worker-1
Out ended: main
```

![thread](https://cdn-images-1.medium.com/max/1600/1*o7372dnIEd3PJe48KO9eUg.png)

Tôt, mọi thứ thực thi trong thread...Nhưng khoan đã, tôi không chỉ sử dụng Thread{} để làm như thế. Nó có thể chạy trên các Thread khác (Ví dụ `ForkJoinPool.commonPool-worker-1`) ở bất cứ đâu. Vậy _suspend functionality_ ở đâu? Và `launch` cụ thể nó là thế nào?

#### Forcing launch to run on same thread

Nhưng chờ chút, Tôi không chỉ vẽ minh họa về suspend function ở trên để show về SINGLE THREAD. Nếu tôi force launch to run trên cùng một thread, rất có thể chúng ta xem thấy được điều gì đó.

Có một cách để làm được điều đó, đó là đặt nó trong `runBlocking` và thêm `coroutineContext` như một tham số để `launch`

```kotlin
fun testRunFunction() {
    runBlocking {
        // Start a coroutine
        launch(coroutineContext) {
            println("In start : ${getThreadName()}")
            Thread.sleep(200)
            println("In ended : ${getThreadName()}")
        }

        run {
            println("Out start: ${getThreadName()}")
            Thread.sleep(300)
            println("Out ended: ${getThreadName()}")
        }
    }
}
```

Hãy xem kết quả nhé
```
Out start: main
Out ended: main
In start : main
In ended : main
```

Tốt rồi, tất cả chúng đã chạy trên cùng một `main` thread

Dừng lại một chút đã, tại sao mà `In` lại chạy sau `Out`?

Lý do cho điều này chính là `launch` đã bị suspended cho đến khi `run` hoàn thành.

![launch_and_run](https://cdn-images-1.medium.com/max/1600/1*1AUfiYzE_tNT8DutbK1lEA.png)

Trong `run` block, không có một phương thức non-blocking nào cả, điều đó cho phép `launch` làm việc. Hiện tại, đã có ít nhất một số _suspension functionality_ được xem xét.

Nhưng, Nó có vẻ như không được hữu dụng nếu như tất cả chúng chỉ có thể được hoàn thành sau khi nơi gọi đến chúng là hoàn thành. Hãy kiểm tra thêm nữa nhé...

#### Thay thế sleep với delay

Bây giờ chúng ta sẽ sử dụng function được giới thiệu trong Kotlin đó là `delay()` để thay thế cho `Thread.sleep()`

```kotlin
fun testRunFunction() {
    runBlocking {
        // Start a coroutine
        launch(coroutineContext) {
            println("In start : ${getThreadName()}")
            delay(200)
            println("In ended : ${getThreadName()}")
        }

        run {
            println("Out start: ${getThreadName()}")
            delay(300)
            println("Out ended: ${getThreadName()}")
        }
    }
}
```
Và kết quả nhận được như dưới đây
```
Out start: main
In start : main
In ended : main
Out ended: main
```

Có sự thú vị ở đây, dường dư `In` và `Out` đã được mix với nhau trong kết quả này.
Để hiểu cách thực nó hoạt động bạn có thể xem trong diagram dưới đây

![launch_and_run_delay](https://cdn-images-1.medium.com/max/1600/1*nv0Fde66TQHzbsYXzpe28w.png)

Từ diagram, chúng ta có thể dễ dàng nhận thấy việc sử dụng `delay()` sẽ không block Thread, nhưng phát hành Thread cho coroutine khác để tiếp tục nó hoạt động, và lấy lại nó khi Thread được giải phóng.

Điều này bây giờ rõ ràng thể hiện những gì đã được đề cập [ở đây](https://kotlinlang.org/docs/tutorials/coroutines-basic-jvm.html#my-first-coroutine).

> We are using the `delay()` function that's like `Thread.sleep()`, but better: it doesn't block a thread, but only suspends the coroutine itself. The thread is returned to the pool while the coroutine is waiting, and when the waiting is done, the coroutine resumes on a free thread in the pool.

### Chạy trên Android UI Thread

Như chúng ta biết, chúng ta có thể `launch` trên cùng một Thread và chạy chúng song song. Tại sao không để chúng chạy trên Main UI Thread, cập nhật một vài giao diện song song.

Tôi viết một ứng dụng đơn giản để update trạng thái của 3 màu khác nhau với một số ngẫu nhiên để chạy đua xem màu nào kết thúc đầu tiên.

![race](https://cdn-images-1.medium.com/max/1600/1*oQDNqNdvMvtFlFA9NkZWHg.gif)

```kotlin
private fun startUpdate() {
    resetRun()

    greenJob = launch(Android) {
        startRunning(progressBarGreen)
    }

    redJob = launch(Android) {
        startRunning(progressBarRed)
    }

    blueJob =launch(Android) {
        startRunning(progressBarBlue)
    }
}

private suspend fun startRunning(
           progressBar: RoundCornerProgressBar) {
    progressBar.progress = 0f
    while (progressBar.progress < 1000 && !raceEnd) {
        delay(10)
        progressBar.progress += (1..10).random()
    }
    if (!raceEnd) {
        raceEnd = true
        Toast.makeText(this, "${progressBar.tooltipText} won!", 
              Toast.LENGTH_SHORT).show()
    }
}
```

Ở đây bạn có thể thấy chúng ta có 3 jobs cùng chạy. Và tất để đều gọi cùng function để cập nhật trạng thái của progress bar. Bar nhận được cập nhật dường như là song song với nhau. Tất cả chúng đều được chạy trên Main UI Thread mà không phải chuyển sang một thread khác.

Bạn có thể refer code ở đường link dưới đây:
[GitHub - demo_android_coroutines_race](https://github.com/elye/demo_android_coroutines_race)

Nguồn dịch bài: [Understanding suspend function of Kotlin Coroutines](https://medium.com/@elye.project/understanding-suspend-function-of-coroutines-de26b070c5ed)