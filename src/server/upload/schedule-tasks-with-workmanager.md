Như các bạn đã biết android Jetpack đã mang tới cho chúng ta rất nhiều thư viện tuyệt vời và Work Manager chính là một trong số đó. Vì vậy trong bài viết này, mình sẽ giới thiệu đến các bạn thư viện tuyệt vời này nhé.
# 1. WorkManager là gì ?
-  **WorkManager** là một thư viện giúp chúng ta quản lý các công việc chạy dưới nền. Nó đảm bảo rằng các công việc chỉ được thực thi khi các ràng buộc của công việc được thỏa mãn( ví dụ như chỉ thực hiện công việc khi pin trên 70% hay chỉ thực hiện công việc khi có mạng wifi,...) . Với WorkManager, các công việc hoặc tác vụ sẽ đảm bảo được thực hiện ngay cả khi chúng ta thoát ứng dụng.  - Version hiện tại của WorkManager là : **2.3.4**
# 2. Tại sao nên sử dụng WorkManager
## 2.1 Dễ dàng lập lịch
**WorkManager** giúp bạn dễ dàng tạo các tác vụ không đồng bộ và cũng cho phép bạn chỉ định rõ ràng khi nào chúng được thực thi

## 2.2 Dễ dàng truy vấn
- Chúng ta có thể dễ dàng truy vấn trạng thái của các tác vụ thông qua UUID

- **WorkManager** không chỉ cung cấp trạng thái hiện tại của tác vụ mà còn cho phép tác vụ trả về dữ liệu cụ thể dưới dạng **key-value**.

## 2.3 Hỗ trợ nhiều phiên bản android 
Hỗ trợ android từ phiên bản api 14 trở lên

## 2.4 Dễ dàng hủy bỏ các tác vụ đã được lập lịch
Work Manager cung cấp UUID cho mỗi tác vụ của bạn, sử dụng id này cho phép bạn hủy các tác vụ bất cứ lúc nào.

Chúng ta hãy cùng so sánh với các công cụ khác xem như nào nhé :
![](https://images.viblo.asia/3c14712a-c6dd-483a-a2c3-e45b7850dfcd.png)

# 3. Khi nào nên sử dụng WorkManager ?

![](https://images.viblo.asia/3c3eed05-baa1-465e-b87b-17d0b697a312.png)

- Khi bạn muốn công việc của mình được bảo vệ và chắc chắn được thực hiện => hãy sử dụng  Work Manager
- Khi bạn muốn thêm các ràng buộc về hệ thống cho công việc của mình như chỉ thực hiện công việc khi pin > 70% hay là chỉ thực hiện công việc khi có mạng => hãy sử dụng WorkManager. Các bạn có thể tham khảo thêm các ràng buộc mà WorkManager hỗ trợ tại [đây](https://developer.android.com/reference/androidx/work/Constraints.Builder)
# 4. Làm việc cùng Work Manager
## 4.1 Định nghĩa các Work Request
Để tạo ra một WorkRequest, rất đơn giản các bạn chỉ cần thực hiện đoạn code dưới đây
```
val uploadWorkRequest = OneTimeWorkRequestBuilder<UploadWorker>()
        .build()
```

Tuy nhiên, bạn có thể setup thêm các ràng buộc hoặc quản lý các  công việc của mình một cách dễ dàng

### 4.1.1 Thêm ràng buộc cho Work request

- Bạn có thể thêm các ràng buộc vào công việc của bạn để cho nó biết khi nào nó có thể chạy.
- Một công việc có thể có nhiều ràng buộc và công việc chỉ được thực thi khi tất cả các ràng buộc của nó được thỏa mãn
- Hiện tại Work Manager hỗ trợ các ràng buộc về : NetWork ( Connected, Unmetered), Battery(Not low, Charing), Storage (Not low), Content (Max delay, Max update delay)
Chúng ta cùng xem ví dụ dưới để biết cách thêm các ràng buộc cho Work Request :
```
// Tạo các ràng buộc
val constraints = Constraints.Builder()
        .setRequiresDeviceIdle(true)
        .setRequiresCharging(true)
        .build()

// thêm ràng buộc vào Work Request
val compressionWork = OneTimeWorkRequestBuilder<CompressWorker>()
        .setConstraints(constraints)
        .build()
```

### 4.1.2 Initial Delays
Trong trường hợp công việc của bạn không có ràng buộc hoặc tất cả các ràng buộc được đáp ứng khi công việc của bạn được xử lý, hệ thống có thể chọn chạy tác vụ ngay lập tức. Nếu bạn không muốn tác vụ được chạy ngay lập tức, bạn có thể chỉ định công việc của mình sẽ bắt đầu sau một độ trễ xác định.

```
// Thực thi công việc sau 10 phút
val uploadWorkRequest = OneTimeWorkRequestBuilder<UploadWorker>()
        .setInitialDelay(10, TimeUnit.MINUTES)
        .build()
```

### 4.1.3 Retries and Backoff Policy
Nếu bạn yêu cầu WorkManager thử lại công việc, bạn có thể trả về result.retry () từ công việc của mình.

Công việc của bạn sau đó được lên lịch lại với chính sách và độ trễ backoff mặc định. Độ trễ backoff chỉ định lượng thời gian tối thiểu phải chờ trước khi công việc được thử. Thời gian chờ để thử lại công việc sẽ tăng theo một giá trị mặc định

Dưới đây là một ví dụ về việc tùy chỉnh chính sách và độ trễ backoff.

```
val uploadWorkRequest = OneTimeWorkRequestBuilder<UploadWorker>()
        .setBackoffCriteria(
                BackoffPolicy.LINEAR,
                OneTimeWorkRequest.MIN_BACKOFF_MILLIS,
                TimeUnit.MILLISECONDS)
        .build()
```

### 4.1.3 Định nghĩa input/output cho các tác vụ
Tác vụ của bạn có thể yêu cầu dữ liệu được truyền vào dưới dạng tham số đầu vào hoặc được trả về kết quả. Ví dụ: tác vụ xử lý tải lên hình ảnh yêu cầu URI của hình ảnh được tải lên làm đầu vào và có thể yêu cầu URL của hình ảnh được tải lên làm đầu ra.

Các giá trị đầu vào và đầu ra được lưu trữ dưới dạng các cặp key-value trong một đối tượng Data. Code dưới đây cho thấy cách bạn có thể đặt dữ liệu đầu vào trong WorkRequest.
```
class UploadWorker(appContext: Context, workerParams: WorkerParameters)
    : Worker(appContext, workerParams) {

    override fun doWork(): Result {

            // Lấy dữ liệu đầu vào
            val imageUriInput = getInputData().getString(Constants.KEY_IMAGE_URI)
   
            // Thực thi công việc
            val response = uploadFile(imageUriInput)

            // Tạo dữ liệu trả về
            val outputData = workDataOf(Constants.KEY_IMAGE_URL to response.imageUrl)

            // trả về output
            return Result.success(outputData)
    }
}
```

Dữ liệu đầu vào và ra phải có kich thước nhỏ và các giá trị có thể là String, kiểu nguyên thủy hoặc các biến thể mảng của chúng. Kích thước tối đa là 10KB cho các đối tượng Dữ liệu

## 4.2 Lắng nghe trạng thái của công việc
Sau khi gọi **enqueue()**, Work Manager cho phép bạn lắng nghe trạng thái của công việc thông qua UUID hoặc tag của công việc
```
// Check trạng thại của công việc thông qua đối tượng WorkInfo
WorkManager.getInstance(myContext).getWorkInfoByIdLiveData(uploadWorkRequest.id)
        .observe(lifecycleOwner, Observer { workInfo ->
            if (workInfo != null && workInfo.state == WorkInfo.State.SUCCEEDED) {
                displayMessage("Work finished!")
            }
        })
```
Các trạng thái được Work  Manager cung cấp
- BLOCKED: Công việc không được hoàn thành
- ENQUEUED: Khi các ràng buộc và thời gian được đáp ứng
- RUNNING: Khi công việc được thực thi
- SUCCEEDED : Khi woker trả về Result.success()
- CANCELLED : Khi công việc bị hủy bỏ
- FAILED: Khi worker trả về Result.failure()

## 4.3 Thực thi một chuỗi công việc

WorkManager cho phép bạn tạo và liệt kê một chuỗi các công việc chỉ định với nhiều tác vụ và xác định thứ tự của chúng.  Điều này đặc biệt hữu ích khi bạn cần chạy một số tác vụ theo một thứ tự cụ thể.

-  **beginWith()**: xác định công vệc hoặc chuỗi công việc được thực thi đầu tiên
-  **then()** : xác định công việc được thực thi tiếp theo. **then()** chỉ chạy khi công việc trước đó được hoàn thành

```
WorkManager.getInstance(myContext)
    // Bắt đầu thực thi bằng chuỗi các công việc filter1, filter2, filter3 (thực thi cùng lúc)
    .beginWith(listOf(filter1, filter2, filter3))
    // compress chỉ được thực thi khi các công việc trên hoàn thành
    .then(compress)
    // upload chỉ được thực thi khi compress hoàn thành
    .then(upload)
    .enqueue()
```

- **Input Mergers**: Cho phép merger dữ liệu của các công việc chạy trước đó và truyền lại cho các công việc sau sử dụng. Như ở ví dụ trên, dữ liệu đầu ra của các công việc filter1, filter2 và filter3 sẽ được dùng làm input cho công việc compress.  WordManager cung cấp 2 kiểu input merge : OverwritingInputMerger  và ArrayCreatingInputMerger 
```
val compress: OneTimeWorkRequest = OneTimeWorkRequestBuilder<CompressWorker>()
    .setInputMerger(ArrayCreatingInputMerger::class)
    .setConstraints(constraints)
    .build()
```

## 4.4 Công việc định kì
- WorkManager cho phép tạo và thực thi các công việc định kỳ (các công việc được lặp đi lặp lại). Công việc định kỳ sẽ được thực thì lại sau một thời gian nhất định (tối thiểu là 15 phút)
- Các công việc định kỳ không được phép chain và có thể chứa các ràng buộc. Thời gian chỉ được tính khi tất cả các ràng buộc được đáp ứng
```
val constraints = Constraints.Builder()
        .setRequiresCharging(true)
        .build()

val saveRequest =
PeriodicWorkRequestBuilder<SaveImageToFileWorker>(1, TimeUnit.HOURS)
    .setConstraints(constraints)
    .build()

WorkManager.getInstance(myContext)
    .enqueue(saveRequest)
```

# Tham khảo 
https://developer.android.com/topic/libraries/architecture/workmanager