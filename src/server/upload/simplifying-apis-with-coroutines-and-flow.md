Bài viết này trình bày cách đơn giản hóa các API sử dụng coroutines và Flow cũng như cách tạo bộ điều hợp của riêng bạn bằng cách sử dụng các API **pauseCancellableCoroutine** và **callbackFlow**. Đối với những người thích đi sâu vào bên trong các quy trình, những API đó sẽ được mổ xẻ và bạn sẽ thấy chúng hoạt động như thế nào.

# 1 Kiểm tra coroutine adapters đã được cài đặt ?
Trước khi viết trình bao bọc của riêng bạn cho các API hiện có, hãy kiểm tra xem bộ điều hợp hoặc chức năng mở rộng có sẵn cho trường hợp sử dụng của bạn hay không. Có các thư viện hiện có với các bộ điều hợp coroutine cho các loại phổ biến.

## 1.1 Future types
Đối với Future types, có các tích hợp cho Java 8’s CompletableFuture và Guava’s ListenableFuture. Đây chưa phải là danh sách đầy đủ, bạn có thể tìm kiếm các adapter phù hợp với các future type của bạn
```
//Chờ hoàn thành CompletionStage mà không blocking thread
suspend fun <T> CompletionStage<T>.await(): T 
//Chờ hoàn thành ListenableFuture mà không blocking thread
suspend fun <T> ListenableFuture<T>.await(): T
```

Với các chức năng này, bạn có thể loại bỏ các lệnh gọi lại và chỉ cần tạm dừng quy trình đăng ký cho đến khi kết quả được trả về.

## 1.2 Reactive Streams
Đối với các thư viện reactive streams,  được tích hợp RxJava, API Java 9 và thư viện [Reactive Streams.](https://github.com/Kotlin/kotlinx.coroutines/tree/master/reactive/kotlinx-coroutines-reactive)
```
// Transforms the given reactive Publisher into Flow.
fun <T : Any> Publisher<T>.asFlow(): Flow<T>
```

Các hàm này chuyển đổi một  reactive stream thành Flow.

## 1.3 Android specific APIs
Đối với thư viện Jetpack hoặc API nền tảng Android, hãy xem danh sách thư viện Jetpack KTX. Hiện tại, hơn 20 thư viện có phiên bản KTX, tạo ra các phiên bản nâng cấp của Java API, từ SharedPreferences đến ViewModels, SQLite và thậm chí cả Play Core.

## 1.4 Callbacks
**Callback** là một giải pháp rất phổ biến cho giao tiếp không đồng bộ. Tuy nhiên, chúng đi kèm với một số nhược điểm: thiết kế này dẫn đến các callback lồng nhau dẫn đến mã không thể hiểu được. Ngoài ra, việc xử lý lỗi phức tạp hơn vì không có cách dễ dàng để phát ra lỗi.

Trong Kotlin, bạn có thể đơn giản hóa việc gọi các lệnh gọi lại bằng coroutines, nhưng để làm được điều đó, bạn cần phải xây dựng bộ điều hợp của riêng mình.

# 2. Xây dựng bộ điều hợp của riêng bạn
Nếu bạn không tìm thấy bộ điều hợp cho trường hợp sử dụng của mình, bạn có thể dễ dàng tạo ra bộ điều hợp của riêng mình. Đối với các lệnh gọi không đồng bộ một lần, hãy sử dụng API pauseCancellableCoroutine. Đối với dữ liệu truyền trực tuyến, hãy sử dụng API callbackFlow.

Như một bài tập, các ví dụ sau sẽ sử dụng API nhà cung cấp vị trí được kết hợp từ Dịch vụ của Google Play để lấy dữ liệu vị trí. Bề mặt API đơn giản nhưng nó sử dụng các callback để thực hiện các hoạt động không đồng bộ. Với coroutines, chúng ta có thể loại bỏ các callback có thể nhanh chóng làm cho mã của chúng ta không thể đọc được khi logic trở nên phức tạp.

## 2.1 One-shot async calls

API Fused Location Provider cung cấp phương thức getLastLocation để lấy vị trí cuối cùng. API lý tưởng cho coroutines là một hàm tạm ngưng trả về chính xác điều đó. Lưu ý rằng API này trả về một Task và đã có sẵn một bộ điều hợp cho nó. Tuy nhiên, vì mục đích học tập, chúng tôi sẽ lấy nó làm ví dụ.

Chúng tôi có thể có một API tốt hơn bằng cách tạo một chức năng mở rộng trên: **FusedLocationProviderClient**
```
suspend fun FusedLocationProviderClient.awaitLastLocation(): Location
```
Vì đây là hoạt động không đồng bộ một lần, chúng tôi sử dụng hàm **suspendCancellableCoroutine**  để tạm ngưng các công việc bất đồng bộ.
**suspendCancellableCoroutine** thực thi khối mã được truyền cho nó dưới dạng tham số, sau đó tạm dừng việc thực thi chương trình trong khi chờ  công việc được tiếp tục. Công việc sẽ được tiếp tục thực thi khi phương thức resume  hoặc resumeWithException được gọi.

Chúng tôi sử dụng các lệnh callback  có thể được thêm vào phương thức getLastLocation để tiếp tục lại quy trình điều tra một cách thích hợp. Xem cách triển khai bên dưới:
```
suspend fun FusedLocationProviderClient.awaitLastLocation(): Location =

  // Create a new coroutine that can be cancelled
  suspendCancellableCoroutine<Location> { continuation ->

    // Add listeners that will resume the execution of this coroutine
    lastLocation.addOnSuccessListener { location ->
      // Resume coroutine and return location
      continuation.resume(location)
    }.addOnFailureListener { e ->
      // Resume the coroutine by throwing an exception
      continuation.resumeWithException(e)
    }

    // End of the suspendCancellableCoroutine block. This suspends the
    // coroutine until one of the callbacks calls the continuation parameter.
  }
```

Mặc dù bạn cũng sẽ tìm thấy phiên bản không thể hủy bỏ của trình tạo quy trình đăng ký này trong thư viện quy trình đăng ký (tức là tạm ngưng chương trình điều tra), bạn nên luôn chọn  suspendCancellableCoroutine  để xử lý việc hủy bỏ phạm vi quy trình đăng ký 

## 2.2 suspendCancellableCoroutine
Trong nội bộ, suspendCancellableCoroutine sử dụng suspendCoroutineUninterceptedOrReturn để  **resum** quy trình bên trong một chức năng tạm ngưng. Đối tượng **Continuation** đó bị chặn bởi CancellableContinuation sẽ kiểm soát vòng đời của chương trình điều tra từ thời điểm đó.

Sau đó, lambda được chuyển đến suspendCancellableCoroutine sẽ được thực thi và chương trình điều tra sẽ tiếp tục ngay lập tức nếu lambda trả về một kết quả hoặc sẽ bị tạm dừng cho đến khi CancellableContinuation được tiếp tục thủ công từ lambda.
```
public suspend inline fun <T> suspendCancellableCoroutine(
  crossinline block: (CancellableContinuation<T>) -> Unit
): T =
  // Get the Continuation object of the coroutine that it's running this suspend function
  suspendCoroutineUninterceptedOrReturn { uCont ->

    // Take over the control of the coroutine. The Continuation's been
    // intercepted and it follows the CancellableContinuationImpl lifecycle now
    val cancellable = CancellableContinuationImpl(uCont.intercepted(), ...)
    /* ... */
 
    // Call block of code with the cancellable continuation
    block(cancellable)
        
    // Either suspend the coroutine and wait for the Continuation to be resumed
    // manually in `block` or return a result if `block` has finished executing
    cancellable.getResult()
  }
```

## 2.3 Streaming data
Thay vào đó, nếu chúng tôi muốn nhận thông tin cập nhật vị trí định kỳ (sử dụng chức năng requestLocationUpdates) bất cứ khi nào thiết bị của người dùng di chuyển trong thế giới thực, chúng tôi cần tạo luồng dữ liệu bằng Flow. API lý tưởng sẽ giống như sau:
```
fun FusedLocationProviderClient.locationFlow(): Flow<Location>
```
Để chuyển đổi các API dựa trên gọi lại trực tuyến thành Flow, hãy sử dụng trình tạo luồng callbackFlow để tạo luồng mới. Trong lambda callbackFlow, chúng ta đang ở trong ngữ cảnh của một quy trình coroutine, do đó, có thể gọi các hàm tạm ngưng. Không giống như trình tạo luồng luồng, channelFlow cho phép các giá trị được phát ra từ một CoroutineContext khác hoặc bên ngoài một chương trình điều tra, với phương thức **offfer**.
Thông thường, bộ điều hợp luồng sử dụng callbackFlow làm theo ba bước chung sau:
1. Tạo lệnh gọi lại để thêm các phần tử vào quy trình bằng cách sử dụng phiếu mua hàng.
2. Đăng ký cuộc gọi lại.
3. Chờ người tiêu dùng hủy quy trình đăng ký và hủy đăng ký cuộc gọi lại.
## 2.4 callbackFlow
Bên trong, callbackFlow sử dụng một kênh, về mặt khái niệm rất giống với một hàng đợi chặn. Một kênh được cấu hình với dung lượng: số phần tử có thể được lưu vào bộ đệm. Kênh được tạo trong callbackFlow có dung lượng mặc định là 64 phần tử. Khi thêm phần tử mới vào một kênh đã đầy đủ, tính năng gửi sẽ tạm ngừng nhà sản xuất cho đến khi có không gian cho phần tử mới trong kênh trong khi ưu đãi sẽ không thêm phần tử vào kênh và sẽ trả về false ngay lập tức.
## 2.5 Reusing the Flow
Flows là một dòng chảy lạnh lùng và lười biếng, trừ khi được chỉ định khác với các toán tử trung gian như conflate. Điều này có nghĩa là khối xây dựng sẽ được thực thi mỗi khi một toán tử đầu cuối được gọi trên luồng. Đây có thể không phải là vấn đề lớn trong trường hợp của chúng tôi vì việc thêm trình nghe vị trí mới rất đơn giản, tuy nhiên, nó có thể tạo ra sự khác biệt trong các triển khai khác.

Sử dụng toán tử trung gian shareIn để sử dụng lại cùng một dòng chảy qua nhiều bộ thu và làm cho dòng lạnh trở nên nóng.
```
val FusedLocationProviderClient.locationFlow() = callbackFlow<Location> {
  ...
}.shareIn(
  // Make the flow follow the applicationScope
  applicationScope,
  // Emit the last emitted element to new collectors
  replay = 1,
  // Keep the producer active while there are active subscribers
  started = SharingStarted.WhileSubscribed()
)
```

# Tổng kết
Tham khảo :