Trong Phần 1, chúng ta đã học cách thực hiện các tác vụ tính toán nặng trong background. Điều gì sẽ xảy ra nếu chúng ta muốn ngắt luồng tính toán đó?
Phần 2 là về Cancelling Execution - Hủy thực thi.

## Cancelling Execution có nghĩa là gì?
Chúng ta muốn có thể hủy thực thi một luồng tính toán đã được tạo bằng RxJava hoặc Coroutines. Luồng tính toán này có thể đồng bộ hoặc không.

Điều này quan trọng trong các trường hợp sử dụng khác nhau khi phát triển Android - trường hợp phổ biến nhất có thể là khi View bị destroyed. Nếu điều đó xảy ra, chúng ta có thể muốn hủy các thực thi đang diễn ra như request mạng, khởi tạo đối tượng nặng, v.v.

## RxJava
Như trong Phần 1, chúng ta sẽ bỏ qua khả năng chuyển các luồng phần tử. Làm cách nào chúng ta có thể hủy thực thi với RxJava?

Hãy tưởng tượng chúng ta tạo một bộ đếm thời gian bằng toán tử interval.
```
Observable.interval(1, TimeUnit.SECONDS)
```

Khi bạn subscribe tới observable này, bộ đếm thời gian sẽ bắt đầu và nó sẽ gửi một sự kiện đến subscriber mỗi giây sau khi đăng ký.

### Làm thế nào bạn có thể hủy bỏ hẹn giờ đó?
Khi bạn subscribe bộ hẹn giờ (gọi `.subscribe()`), nó sẽ trả về một đối tượng `Disposable`.
```
val disposable: Disposable = 
    Observable.interval(1, TimeUnit.SECONDS).subscribe()
```

Bạn có thể gọi `dispose()` trên đối tượng `Disposable` để hủy thực thi. `Observable` sẽ kết thúc việc phát ra các items.
```
disposable.dispose()
```

Như vậy, chúng ta đã hủy phép tính không đồng bộ mà `Observable` đã tạo.

### Caveats
Nếu bạn tạo Observable của riêng mình theo cách thủ công mà không sử dụng bất kỳ toán tử tạo nào (như `interval`), bạn không cần phải tự xử lý việc hủy tính toán.

Observable này chưa sẵn sàng để bị hủy. Nếu chúng ta muốn điều đó xảy ra, chúng ta cần kiểm tra xem emitter có còn được đăng ký hay không trước khi gọi nó.
```
Observable.create<Int> { emitter ->
   for (i in 1..5) {
       if (!emitter.isDisposed) {
           emitter.onNext(i)
       } else {
           break
       }
   }
       
   emitter.onComplete()
}
```

Nếu subscriber không còn, chúng ta có thể bỏ qua việc phát ra các mục còn lại. Nếu chúng ta không làm điều đó, code sẽ tiếp tục chạy và bỏ qua các lệnh gọi `emitter.onNext(i)` theo mã nguồn Observable.create.

## Coroutines
Coroutine chính là một instance của tính toán. Hủy một Coroutine có nghĩa là dừng việc thực hiện lambda suspending của nó.

> Chúng ta có thể hủy bỏ việc thực hiện với Coroutine Job, là một phần của Coroutine Context.

Coroutine Job cho thấy một phương pháp để hủy bỏ việc thực hiện Coroutine. Như chúng ta có thể mong đợi, phương thức đó được gọi là `cancel()`.

Ví dụ: Coroutine Builder `launch` trả về `Job` của Coroutine mà nó tạo.

```
val job = launch(CommonPool) {
    // my suspending block
}
```

Chúng ta có thể gán Job đó cho một biến và gọi cancel.
```
job.cancel()
```

Đó là một ví dụ về việc lấy Job từ Coroutine và hủy nó. Chúng ta có thể làm điều đó theo một cách khác không? Có, chúng ta cũng có thể chỉ định Job của một Coroutine. Chúng ta có thể làm điều đó bằng nhiều cách.

Một số Coroutine Builders (ví dụ: `launch` và `async`) lấy một tham số `parent` mà bạn có thể set Job cho Coroutine sẽ được tạo.

```
val parentJob = Job()
async(CommonPool, parent = parentJob) {
   // my suspending block
}
parentJob.cancel()
```

Một trong những lợi ích của phương pháp này là bạn có thể chia sẻ parentJob đó với nhiều Coroutines, vì vậy khi bạn gọi parentJob.cancel(), bạn sẽ hủy việc thực thi các coroutines có parentJob là Job của họ.

Cách tiếp cận này tương tự như RxJava CompositeDisposable mà bạn có thể hủy bỏ nhiều đăng ký cùng một lúc.
```
val parentJob = Job()
val deferred1 = async(CommonPool, parent = parentJob) {
    // my suspending block
}
val deferred2 = async(CommonPool, parent = parentJob) {
    // my suspending block
}
parentJob.cancel() // Cancels both Coroutines
```

LƯU Ý: Bạn nên cẩn thận khi chia sẻ Jobs giữa các Coroutines khác nhau. Khi bạn hủy bỏ một Job, bạn cần phải reassign lại nó. Bạn không thể bắt đầu một Coroutine khác với Job đó, bạn sẽ phải tạo một Coroutine mới.

> Khi bạn hủy bỏ một Job, bạn cần phải reassign lại nó.

Một cách khác để làm điều này là kết hợp các Coroutine Contexts. Bạn có thể sử dụng toán tử dấu cộng để thực hiện việc này.

```
val parentJob = Job()
launch(parentJob + CommonPool) {
   // my suspending block
}
parentJob.cancel()
```

Trong trường hợp này, kết quả Coroutine Context của Coroutine đó là sự kết hợp giữa parentJob và CommonPool. Chính sách phân luồng sẽ được xác định từ CommonPool và giá trị Job từ parentJob.

Nếu bạn muốn tìm hiểu thêm về cách kết hợp các contexts, bạn có thể đọc [phần này](https://github.com/Kotlin/kotlinx.coroutines/blob/master/ui/coroutines-guide-ui.md#lifecycle-and-coroutine-parent-child-hierarchy) của tài liệu Kotlin Coroutines.

### Caveats
Cũng giống như RxJava, bạn phải cân nhắc việc hủy trong Coroutines.

```
val job = launch(CommonPool) {
    for (i in 1..5) {
        heavyComputation()
    }
}
job.cancel()
```

Nếu chúng ta cố gắng thực thi mã này, nó sẽ lặp lại quá trình tính toán nặng 5 lần vì mã chưa sẵn sàng để bị hủy.

**Làm thế nào chúng ta có thể cải thiện nó?**

Giống như cách chúng ta kiểm tra xem subscriber có hiện diện trong RxJava hay không, chúng tôi cần kiểm tra xem Coroutine có hoạt động hay không.

```
val job = launch(CommonPool) {
    for (i in 1..5) {
        if (!isActive) { break }
        heavyComputation()
    }
}
job.cancel()
```

`isActive` là một biến internal có thể được truy cập bên trong Coroutine (`coroutineContext` là một biến khác).

Một số chức năng suspending có sẵn trong thư viện Standard Coroutines xử lý việc hủy bỏ cho chúng ta. Hãy xem xét delay.

```
val job = launch(CommonPool) {
    doSomething()
    delay(300) // It’s going to cancel at this point
    doSomething()
}
job.cancel()
```

Delay là một chức năng suspending có thể xử lý việc hủy bỏ cho chúng ta. Tuy nhiên, nếu bạn sử dụng Thread.sleep thay vì trì delay, vì nó đang chặn thread và không suspending coroutine, nên nó sẽ không hủy.

```
val job = launch(CommonPool) {
    doSomething()
    Thread.sleep(300) // It’s NOT going to cancel execution
    doSomething()
}
job.cancel()
```

Thread.sleep không hủy quá trình thực thi cho chúng ta. Nó thậm chí không phải là một chức năng suspending! Coroutine đó sẽ không bị hủy ngay cả khi chúng ta gọi job.cancel().

Thread.sleep không phải là thứ bạn nên sử dụng trong trường hợp này. Nếu bạn thực sự cần, một cách để hủy coroutine là kiểm tra xem nó có hoạt động ngay trước và sau khi chặn thread không.

```
val job = launch(CommonPool) {
    doSomething()
    if (!isActive) return
    Thread.sleep(300) // It’s NOT going to cancel execution
    if (!isActive) return
    doSomething()
}
job.cancel()
```

## Phần tiếp theo
Phần thứ ba của loạt bài này sẽ nói về việc chuyển stream các phần tử.

Sự khác biệt giữa các Observable và Channels là gì? Subjects và Broadcast Channels?

Ref: https://medium.com/capital-one-tech/coroutines-and-rxjava-an-asynchronicity-comparison-part-2-cancelling-execution-199485cdf068