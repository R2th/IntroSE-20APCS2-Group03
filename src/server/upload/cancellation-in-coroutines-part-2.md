Trong quá trình phát triển, cũng như trong cuộc sống, chúng ta biết điều quan trọng là tránh làm nhiều việc hơn mức cần thiết vì nó có thể lãng phí bộ nhớ và năng lượng. Nguyên tắc này cũng áp dụng cho coroutines. Bạn cần đảm bảo rằng bạn kiểm soát vòng đời của coroutine và hủy quy coroutine đó khi không còn cần thiết nữa - đây là điều thể hiện tính đồng thời có cấu trúc. Đọc tiếp để tìm hiểu thông tin chi tiết của việc hủy coroutine.

## Gọi Cancel

Khi khởi chạy nhiều coroutines, bạn có thể gặp khó khăn khi phải theo dõi chúng hoặc hủy từng hành động riêng lẻ. Thay vào đó, chúng ta có thể dựa vào việc hủy bỏ toàn bộ các scope coroutines khởi chạy vì điều này sẽ hủy tất cả các coroutines con đã tạo:

```
// giả sử chúng ta có một scope được xác định cho lớp này của ứng dụng
val job1 = scope.launch { … }
val job2 = scope.launch { … }
scope.cancel()
```

> Hủy scople sẽ hủy bỏ các con của nó

Đôi khi bạn có thể chỉ cần hủy một coroutine, có thể là một phản ứng đối với thông tin người dùng nhập. Việc gọi job1.cancel đảm bảo rằng chỉ có coroutine cụ thể đó bị hủy bỏ và tất cả các anh chị em khác không bị ảnh hưởng:

```
// giả sử chúng ta có một scope được xác định cho lớp này của ứng dụng
val job1 = scope.launch { … }
val job2 = scope.launch { … }
// coroutine đầu tiên sẽ bị cancelled và những cái khác sẽ không bị ảnh hưởng
job1.cancel()
```

> Một child bị hủy không ảnh hưởng đến các anh chị em khác


Coroutines xử lý việc hủy bỏ bằng cách đưa ra một exception đặc biệt: CancelException. Nếu bạn muốn cung cấp thêm chi tiết về lý do hủy, bạn có thể cung cấp một instance của CancelException khi gọi .cancel vì đây là signature đầy đủ của method:

` fun cancel(cause: CancellationException? = null)`

Nếu bạn không cung cấp instance CancelException của riêng mình, thì một CancellationExceptiony mặc định sẽ được tạo:

```
public override fun cancel(cause: CancellationException?) {
    cancelInternal(cause ?: defaultCancellationException())
}
```

Bởi vì CancelException được ném ra, sau đó bạn sẽ có thể sử dụng cơ chế này để xử lý việc hủy coroutine. Tìm hiểu thêm về cách thực hiện việc này trong phần Handling cancellation bên dưới.

Bên dưới, child Job thông báo cho parent của nó về việc cancellation thông qua Exception. Parent sử dụng nguyên nhân của việc cancellation để xác định xem nó có cần phải xử lý Exception hay không. Nếu child bị hủy do CancelException, thì parent không cần thực hiện hành động nào khác.

> ⚠️Khi bạn cancel một scope, bạn sẽ không thể launch các coroutine mới trong scope đã hủy.

Nếu bạn đang sử dụng các thư viện KTX androidx trong hầu hết các trường hợp, bạn không tạo scope của riêng mình và do đó bạn không chịu trách nhiệm hủy chúng. Nếu bạn đang làm việc trong phạm vi của ViewModel, sử dụng viewModelScope hoặc, nếu bạn muốn khởi chạy các coroutines gắn với lifecycle scope, bạn sẽ sử dụng lifecycleScope. Cả viewModelScope và lifecycleScope đều là các đối tượng CoroutineScope bị hủy bỏ vào đúng thời điểm. Ví dụ: khi ViewModel bị cleared, nó sẽ cancel các coroutines được khởi chạy trong scope của nó.

## Tại sao coroutine của tôi không dừng lại?

Nếu chúng tôi chỉ gọi cancel, điều đó không có nghĩa là coroutine sẽ dừng lại. Nếu bạn đang thực hiện một số phép tính tương đối nặng, chẳng hạn như đọc từ multiple files, thì không có gì có thể tự động ngăn code của bạn chạy.
Hãy lấy một ví dụ đơn giản hơn và xem điều gì sẽ xảy ra. Giả sử rằng chúng ta cần in “Xin chào” hai lần một giây bằng cách sử dụng coroutines. Chúng tôi sẽ để coroutines chạy trong một giây và sau đó hủy bỏ quy trình đó. Một phiên bản của việc triển khai có thể trông như thế này:


```
import kotlinx.coroutines.*
 
fun main(args: Array<String>) = runBlocking<Unit> {
   val startTime = System.currentTimeMillis()
    val job = launch (Dispatchers.Default) {
        var nextPrintTime = startTime
        var i = 0
        while (i < 5) {
            // print a message twice a second
            if (System.currentTimeMillis() >= nextPrintTime) {
                println("Hello ${i++}")
                nextPrintTime += 500L
            }
        }
    }
    delay(1000L)
    println("Cancel!")
    job.cancel()
    println("Done!")
}
```

Hãy xem điều gì xảy ra từng bước. Khi gọi launch, chúng ta đang tạo một coroutine mới ở trạng thái hoạt động. Chúng tôi đang để coroutine chạy trong 1000 mili giây. Vì vậy, bây giờ chúng ta thấy in:

```
Hello 0
Hello 1
Hello 2
```

Sau khi job.cancel được gọi, coroutine của chúng ta sẽ chuyển sang trạng thái Cancelling. Nhưng sau đó, chúng ta thấy rằng Hello 3 và Hello 4 vẫn được in ra. Chỉ sau khi hoàn thành công việc, coroutine chuyển sang trạng thái Cancelled.

Công việc của coroutine không chỉ dừng lại khi Cancel được gọi. Thay vào đó, chúng tôi cần sửa đổi mã của mình và kiểm tra xem coroutine có hoạt động định kỳ hay không.

> Việc hủy bỏ mã coroutine cần phải hợp tác!

## Làm cho coroutine của bạn có thể bị hủy bỏ (Cancellable)
Bạn cần đảm bảo rằng tất cả các công việc coroutine mà bạn đang thực hiện đều hợp tác với việc cancellation, do đó, bạn cần kiểm tra việc cancellation định kỳ hoặc trước khi bắt đầu bất kỳ long running task nào. Ví dụ: nếu bạn đang đọc multiple files từ disk, trước khi bạn bắt đầu đọc từng file, hãy kiểm tra xem coroutine đã bị cancel hay chưa. Như vậy, bạn tránh thực hiện công việc chuyên sâu về CPU khi không cần thiết nữa.

```
val job = launch {
    for (file in files) {
        // VIỆC CẦN LÀM kiểm tra việc hủy bỏ
        readFile (tệp)
    }
}
```
Tất cả các chức năng tạm ngưng từ kotlinx.coroutines đều có thể bị hủy: withContext, delay, v.v. Vì vậy, nếu bạn đang sử dụng bất kỳ chức năng nào trong số chúng, bạn không cần phải kiểm tra việc hủy và dừng thực thi hoặc throw CancellationException. Tuy nhiên, nếu bạn không sử dụng chúng, để làm cho mã coroutine của bạn hợp tác, chúng tôi có hai lựa chọn:
* Kiểm tra `job.isActive` hoặc `ensureActive ()`
* Để công việc khác diễn ra bằng cách sử dụng `yield ()`


Kiểm tra trạng thái hoạt động của Job
Một tùy chọn nằm trong while (i <5) của chúng ta để thêm một kiểm tra khác cho trạng thái coroutine:
```
// Vì chúng ta đang ở trong launch block, chúng ta có quyền truy cập vào job.isActive
while (i <5 && isActive)
```
Điều này có nghĩa là công việc của chúng ta chỉ nên được thực hiện trong khi coroutine đang hoạt động. Điều này cũng có nghĩa là khi chúng ta thoát khỏi while, nếu chúng ta muốn thực hiện một số hành động khác, chẳng hạn như logging nếu job bị hủy, chúng ta có thể thêm dấu kiểm cho `!IsActive` và thực hiện hành động của mình tại đó.

Thư viện Coroutines cung cấp một method hữu ích khác - `ensureActive ()`. Cách thực hiện của nó là:
```
fun Job.ensureActive (): Unit {
    if (! isActive) {
         throw getCancellationException ()
    }
}
```
Bởi vì method này ngay lập tức ném nếu job không hoạt động, chúng ta có thể đặt điều này là điều đầu tiên chúng ta làm trong vòng lặp while của mình:
```
while (i <5) {
    ensureActive ()
    …
}
```
Bằng cách sử dụng `ensureActive`, bạn tránh được việc thực hiện câu lệnh if do `isActive` yêu cầu, giảm số lượng mã soạn sẵn bạn cần viết, nhưng mất tính linh hoạt để thực hiện bất kỳ hành động nào khác như logging.
## Để công việc khác diễn ra bằng cách sử dụng yield()
Nếu công việc bạn đang làm là 
1) CPU nặng, 
2) Có thể làm cạn kiệt thread pool 
3) Bạn muốn cho phép thread hiện công việc khác mà không cần phải thêm nhiều thread vào pool, 

thì hãy sử dụng yield(). Hoạt động đầu tiên được thực hiện bởi lợi nhuận sẽ được kiểm tra xem đã hoàn thành và thoát khỏi couroutine bằng cách throw CancelException nếu job đã được hoàn thành. `yield` có thể là hàm đầu tiên được gọi trong kiểm tra định kỳ, giống như `ensureActive ()` đã đề cập ở trên.

## `Job.join so với Deferred.await Cancellation`
Có hai cách để đợi kết quả từ coroutine: jobs được trả về từ `launch` có thể gọi `join` và `Deferred` (một loại Job) được trả về từ async có thể là `await`.

`Job.join` tạm dừng coroutine cho đến khi công việc hoàn thành. Cùng với `job.cancel `nó hoạt động như bạn mong đợi:

* Nếu bạn đang gọi` job.cancel` rồi đến `job.join`, coroutine sẽ tạm dừng cho đến khi job hoàn thành.
* Việc gọi `job.cancel` sau khi `job.join` không có tác dụng, vì công việc đã hoàn thành.

Bạn sử dụng `Deferred` khi bạn quan tâm đến kết quả của coroutine. Kết quả này được trả về bởi `Deferred.await` khi coroutine hoàn tất. Deferred là type của Job, và nó cũng có thể bị hủy bỏ.

Cuộc gọi `await` trên deferred đã bị `cancel` sẽ tạo ra một `JobCancellationException`.
```
val deferred = async {…}
deferred.cancel ()
val result = deferred.await () // throws JobCancellationException!
```
Đây là lý do tại sao chúng tôi nhận được Exception: vai trò của `await` là tạm dừng coroutine cho đến khi kết quả được tính toán; vì coroutine bị hủy nên không thể tính được kết quả. Do đó, việc gọi `await` sau khi cancel sẽ dẫn đến `JobCancellationException: Job was cancelled`

Mặt khác, nếu bạn đang gọi `deferred.cancel `sau khi deferred.await thì sẽ không có gì xảy ra, vì coroutine đã hoàn tất.

## Xử lý ảnh hưởng của Cancellation
Giả sử bạn muốn thực hiện một hành động cụ thể khi coroutine bị hủy: đóng bất kỳ resrouces nào bạn có thể đang sử dụng, logging việc hủy hoặc một số code dọn dẹp khác mà bạn muốn thực thi. Có một số cách chúng ta có thể làm điều này:

### Kiểm tra! IsActive
Nếu bạn đang định kỳ kiểm tra `isActive`, thì khi thoát khỏi vòng lặp while, bạn có thể dọn dẹp resources. Code của chúng tati ở trên có thể được cập nhật thành:
```
while (i <5 && isActive) {
    // in một tin nhắn hai lần một giây
    nếu như (…) {
        println (“Hello ${i++}”)
        nextPrintTime + = 500L
    }
}
// the coroutine work is completed so we can cleanup
println(“Clean up!”)
```

Vì vậy, bây giờ, khi coroutine không còn actuve, while sẽ bị break và chúng ta có thể thực hiện công việc dọn dẹp của mình.

### Try catch finally
Vì một `CancellationException` được ném ra khi một coroutine bị hủy, nên chúng ta có thể kết thúc công việc suspending của mình trong `try / catch` và trong khối `finally`, chúng ta có thể thực hiện công việc dọn dẹp của mình.
```
val job = launch {
   try {
      work()
   } catch (e: CancelException) {
      println (“Work cancelled!”)
    } finally {
      println ("Clean up!")
    }
}
delay (1000L)
println (“Cancel!”)
job.cancel ()
println (“Done!”)
```
Tuy nhiên, nếu công việc dọn dẹp mà chúng ta cần thực hiện là suspending, thì code ở trên sẽ không hoạt động nữa, vì khi coroutine ở trạng thái Cancelling, nó không thể tạm ngừng nữa. [Xem Code đầy đủ tại đây.](https://play.kotlinlang.org/#eyJ2ZXJzaW9uIjoiMS4zLjQxIiwiY29kZSI6ImltcG9ydCBrb3RsaW54LmNvcm91dGluZXMuKlxuXG5zdXNwZW5kIGZ1biB3b3JrKCl7XG4gICAgdmFsIHN0YXJ0VGltZSA9IFN5c3RlbS5jdXJyZW50VGltZU1pbGxpcygpXG4gICAgdmFyIG5leHRQcmludFRpbWUgPSBzdGFydFRpbWVcbiAgICB2YXIgaSA9IDBcbiAgICB3aGlsZSAoaSA8IDUpIHtcbiAgICAgICAgeWllbGQoKVxuICAgICAgICAvLyBwcmludCBhIG1lc3NhZ2UgdHdpY2UgYSBzZWNvbmRcbiAgICAgICAgaWYgKFN5c3RlbS5jdXJyZW50VGltZU1pbGxpcygpID49IG5leHRQcmludFRpbWUpIHtcbiAgICAgICAgICAgIHByaW50bG4oXCJIZWxsbyAke2krK31cIilcbiAgICAgICAgICAgIG5leHRQcmludFRpbWUgKz0gNTAwTFxuICAgICAgICB9XG4gICAgfVxufVxuZnVuIG1haW4oYXJnczogQXJyYXk8U3RyaW5nPikgPSBydW5CbG9ja2luZzxVbml0PiB7XG4gICB2YWwgam9iID0gbGF1bmNoIChEaXNwYXRjaGVycy5EZWZhdWx0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgIFx0d29yaygpXG4gICAgICAgIH0gY2F0Y2ggKGU6IENhbmNlbGxhdGlvbkV4Y2VwdGlvbil7XG4gICAgICAgICAgICBwcmludGxuKFwiV29yayBjYW5jZWxsZWQhXCIpXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBwcmludGxuKFwiQ2xlYW4gdXAhXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsYXkoMTAwMEwpXG4gICAgcHJpbnRsbihcIkNhbmNlbCFcIilcbiAgICBqb2IuY2FuY2VsKClcbiAgICBwcmludGxuKFwiRG9uZSFcIilcbn0iLCJwbGF0Zm9ybSI6ImphdmEiLCJhcmdzIjoiIn0=)

> Coroutine ở trạng thái cancelling không thể suspend!

Để có thể gọi các chức năng suspend khi một coroutine bị cancelled, chúng ta sẽ cần chuyển đổi công việc dọn dẹp mà chúng ta cần thực hiện trong một `CoroutineContext` `NonCancellable`. Điều này sẽ cho phép code tạm dừng và sẽ giữ coroutine ở trạng thái Cancelling cho đến khi công việc được hoàn thành.
```
val job = launch {
   try {
      work()
   } catch (e: CancellationException){
      println(“Work cancelled!”)
    } finally {
      withContext(NonCancellable){
         delay(1000L) // or some other suspend fun 
         println(“Cleanup done!”)
      }
    }
}
delay(1000L)
println(“Cancel!”)
job.cancel()
println(“Done!”)
```

Kiểm tra cách hoạt động của điều này trong thực tế[ tại đây](https://pl.kotl.in/ufZRQSa7o).

## suspendCancellableCoroutine và invokeOnCancellation
Nếu bạn đã chuyển đổi các callbacks lại thành các coroutines bằng cách sử dụng phương thức `suspendCoroutine`, thì thay vào đó, bạn nên sử dụng `suspendCancellableCoroutine`. Công việc cần thực hiện khi hủy có thể được thực hiện bằng cách sử dụng `continuation.invokeOnCancellation`:
```
suspend fun work() {
   return suspendCancellableCoroutine { continuation ->
       continuation.invokeOnCancellation { 
          // do cleanup
       }
   // rest of the implementation
}
```
Để nhận ra lợi ích của structured concurrency và đảm bảo rằng chúng ta không làm những công việc không cần thiết, bạn cần đảm bảo rằng bạn cũng đang làm cho code của mình có thể hủy được.

Sử dụng CoroutineScope được định nghĩa trong Jetpack: `viewModelScope` hoặc `lifecycleScope` để hủy công việc của họ khi scope của chúng hoàn thành. Nếu bạn đang tạo `CoroutineScope` của riêng mình, hãy đảm bảo rằng bạn đang gắn nó với job và gọi cancel khi cần.

Việc hủy bỏ coroutine cần phải hợp tác, vì vậy hãy đảm bảo bạn cập nhật mã của mình để kiểm tra việc hủy bỏ lazy và tránh làm nhiều việc hơn mức cần thiết.