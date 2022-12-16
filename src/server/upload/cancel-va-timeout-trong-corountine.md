# Cancel và Timeout

## Cancel lệnh thực thi của coroutine
Trong một ứng dụng với thời gian chạy dài, bạn có thể cần kiểm soát chi tiết trên các coroutines của mình. Ví dụ: một người dùng có thể đã đóng trang đã khởi chạy coroutine và bây giờ kết quả của nó không còn cần thiết nữa và hoạt động của nó có thể bị hủy. Hàm khởi chạy trả về một Job có thể được sử dụng để hủy coroutine đang chạy:

```
val job = launch {
    repeat(1000) { i ->
        println("job: I'm sleeping $i ...")
        delay(500L)
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancel() // cancels the job
job.join() // waits for job's completion 
println("main: Now I can quit.")
```

Nó tạo ra output như sau:
```
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
main: Now I can quit.
```
Ngay khi luồng chính gọi job.cancel, chúng ta không thấy bất kỳ output nào từ coroutine khác vì nó đã bị hủy. Ngoài ra còn có hàm mở rộng *cancelAndJoin* kết hợp cancel và join các yêu cầu.

## Cancel là hợp tác
Một mã coroutine phải hợp tác để được hủy bỏ. Tất cả các chức năng suspending trong kotlinx.coroutines đều có thể cancel . Chúng kiểm tra việc hủy coroutine và ném *CancellationException* khi bị hủy. Tuy nhiên, nếu một coroutine đang làm việc trong một tính toán và không kiểm tra hủy bỏ, thì nó không thể bị hủy, như ví dụ sau đây cho thấy:

```
val startTime = System.currentTimeMillis()
val job = launch(Dispatchers.Default) {
    var nextPrintTime = startTime
    var i = 0
    while (i < 5) { // computation loop, just wastes CPU
        // print a message twice a second
        if (System.currentTimeMillis() >= nextPrintTime) {
            println("job: I'm sleeping ${i++} ...")
            nextPrintTime += 500L
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
```

Chạy nó để thấy rằng nó tiếp tục in *"I'm sleeping"* ngay cả sau khi hủy cho đến khi công việc tự hoàn thành sau năm lần lặp.

## Làm cho code tính toán có thể cancel được
Có hai cách tiếp cận để làm cho mã tính toán có thể cancel được. Đầu tiên là định kỳ gọi một hàm suspend để kiểm tra hủy bỏ. Có một hàm [yield](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/yield.html) là một lựa chọn tốt cho mục đích đó. Một cách khác là kiểm tra rõ ràng tình trạng hủy bỏ. Cùng thử cách tiếp cận thứ 2.

Thay thế `while (i < 5)` trong ví dụ trước bằng `while (isActive)` và chạy lại nó.

```
val startTime = System.currentTimeMillis()
val job = launch(Dispatchers.Default) {
    var nextPrintTime = startTime
    var i = 0
    while (isActive) { // cancellable computation loop
        // print a message twice a second
        if (System.currentTimeMillis() >= nextPrintTime) {
            println("job: I'm sleeping ${i++} ...")
            nextPrintTime += 500L
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
```

Như bạn có thể thấy, bây giờ vòng lặp này bị hủy bỏ. *isActive* là một thuộc tính mở rộng có sẵn bên trong coroutine thông qua đối tượng CoroutineScope .
(Cách 1 có lẽ giống với trò cancel AsyncTask)

## Đóng resource với finally
Do hàm suspending có thể cancel được sẽ throw 1 CancellationException nên ta có thể dùng try catch và finally để "dọn dẹp" những resource không còn dùng nữa. Cách làm này có lẽ khá quen thuộc với những Java coder.
```
val job = launch {
    try {
        repeat(1000) { i ->
            println("job: I'm sleeping $i ...")
            delay(500L)
        }
    } finally {
        println("job: I'm running finally")
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
```

Cả *join* và *cancelAndJoin* đều chờ tất cả các hành động hoàn tất, vì vậy ví dụ trên tạo ra kết quả sau:

```
job: I'm sleeping 0 ...
job: I'm sleeping 1 ...
job: I'm sleeping 2 ...
main: I'm tired of waiting!
job: I'm running finally
main: Now I can quit.
```

## Chạy khối lệnh không thể cancel
Bất kỳ nỗ lực nào để sử dụng hàm suspending trong finally của ví dụ trước đều gây ra CancellingException , vì coroutine chạy mã này bị hủy. Thông thường, đây không phải là vấn đề, vì tất cả các hoạt động đóng được xử lý tốt (đóng tệp, cancel 1 job, hoặc đóng bất kỳ loại kênh liên lạc nào) thường không chặn và không liên quan đến bất kỳ hàm suspend nào. Tuy nhiên, trong trường hợp hiếm hoi khi bạn cần phải suspend trong một coroutine đã cancel bạn có thể bỏ mã tương ứng trong *withContext(NonCancellable) {...}*

```
val job = launch {
    try {
        repeat(1000) { i ->
            println("job: I'm sleeping $i ...")
            delay(500L)
        }
    } finally {
        withContext(NonCancellable) {
            println("job: I'm running finally")
            delay(1000L)
            println("job: And I've just delayed for 1 sec because I'm non-cancellable")
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
```

## Timeout
Lý do thực tế rõ ràng nhất để hủy bỏ việc thực thi một coroutine là vì thời gian thực hiện của nó đã vượt quá thời gian chờ. Mặc dù bạn có thể theo dõi thủ công tham chiếu đến Job tương ứng và khởi chạy một coroutine riêng để hủy bỏ theo dõi sau khi delay, có một hàm *withTimeout* sẵn sàng để thực hiện. Nhìn vào ví dụ sau:

```
withTimeout(1300L) {
    repeat(1000) { i ->
        println("I'm sleeping $i ...")
        delay(500L)
    }
}
```

Nó tạo ra output sau:

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
Exception in thread "main" kotlinx.coroutines.TimeoutCancellationException: Timed out waiting for 1300 ms
```

*TimeoutCancellationException* đó được throw bởi withTimeout là một lớp con của *CancellationException* . Chúng ta không thấy stack trace của nó được in trên console trước đây. Đó là bởi vì bên trong một coroutine bị hủy bỏ *CancellationException* được coi là một lý do bình thường để hoàn thành coroutine. Tuy nhiên, trong ví dụ này, chúng ta đã sử dụng *withTimeout* ngay bên trong hàm main.

Vì việc cancel chỉ là một ngoại lệ, tất cả các tài nguyên được đóng theo cách thông thường. Bạn có thể bọc mã với timeout trong một khối try {...} catch (e: TimeoutCancellationException) {...} nếu bạn cần thực hiện một số hành động bổ sung cụ thể đối với bất kỳ loại timeout nào hoặc sử dụng hàm *withTimeoutOrNull* tương tự với *withTimeout* nhưng trả null thay vì throw ngoại lệ:

```
val result = withTimeoutOrNull(1300L) {
    repeat(1000) { i ->
        println("I'm sleeping $i ...")
        delay(500L)
    }
    "Done" // will get cancelled before it produces this result
}
println("Result is $result")
```

Không còn ngoại lệ khi chạy mã này:

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
Result is null
```

Nguồn https://kotlinlang.org/docs/reference/coroutines/cancellation-and-timeouts.html