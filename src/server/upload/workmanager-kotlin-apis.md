WorkManager cung cấp một tập hợp các API giúp bạn dễ dàng lên lịch các tác vụ không đồng bộ để thực thi ngay lập tức hoặc hoãn lại dự kiến sẽ chạy ngay cả khi ứng dụng bị đóng hoặc thiết bị khởi động lại. Đối với người dùng Kotlin, WorkManager cung cấp hỗ trợ đầu tiên cho coroutines. Trong bài đăng này, tôi sẽ chỉ cho bạn những kiến thức cơ bản về WorkManager với các quy trình điều tra bằng cách xây dựng trên bảng mã WorkManager. Vậy hãy bắt đầu!

# Khái niệm cơ bản về WorkManager
Thư viện WorkManager là lựa chọn được đề xuất cho bất kỳ tác vụ nào sẽ tiếp tục chạy, ngay cả khi người dùng điều hướng khỏi màn hình cụ thể, người dùng đặt ứng dụng ở chế độ nền hoặc thiết bị khởi động lại. Các nhiệm vụ phổ biến có thể là:
* Tải lên nhật ký hoặc dữ liệu báo cáo
* Áp dụng bộ lọc cho hình ảnh và lưu hình ảnh
* Đồng bộ hóa định kỳ dữ liệu local qua mạng

Nếu nhiệm vụ trước mắt của bạn có thể kết thúc khi người dùng rời khỏi một phạm vi nhất định chẳng hạn như màn hình, chúng tôi khuyên bạn nên sử dụng Kotlin Coroutines trực tiếp.
Bộ mã WorkManager làm mờ hình ảnh và lưu kết quả trên đĩa. Hãy xem những gì cần thiết để đạt được điều này.
Chúng ta đã thêm phụ thuộc work-runtime-ktx.

```
implementation "androidx.work:work-runtime-ktx:$work_version"
```

Chúng ta bắt đầu bằng cách triển khai class Worker của riêng mình. Đây là nơi chúng ta code cho công việc thực tế mà bạn muốn thực hiện trong nền. Bạn sẽ mở rộng lớp Worker và ghi đè phương thức doWork (). Vì đây là lớp quan trọng nhất nên chúng ta sẽ đi qua chi tiết sau. Đây là cách triển khai ban đầu trông như thế nào.
```
/* Copyright 2020 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 */

class BlurWorker(ctx: Context, params: WorkerParameters) : Worker(ctx, params) {

    suspend fun doWork(): Result {
        val resourceUri = inputData.getString(KEY_IMAGE_URI)

        return try {
            if (resourceUri.isNullOrEmpty()) {
                Timber.e("Invalid input uri")
                throw IllegalArgumentException("Invalid input uri")
            }

            val outputData = blurAndWriteImageToFile(resourceUri)
            Result.success(outputData)
        } catch (throwable: Throwable) {
            Timber.e(throwable, "Error applying blur")
            Result.failure()
        }
    }
…
}
```
Sau đó, chúng tôi xây dựng yêu cầu công việc của mình, trong trường hợp của chúng tôi, chúng tôi muốn thực hiện công việc chỉ một lần nên chúng tôi sử dụng **OneTimeWorkRequest.Builder**. Như đầu vào, chúng tôi đặt Uri của hình ảnh mà chúng tôi muốn làm mờ.
Mẹo Kotlin: để tạo dữ liệu đầu vào, chúng ta có thể sử dụng hàm workDataOf tạo trình tạo dữ liệu, puts key-value và tạo dữ liệu cho chúng ta.
```
/* Copyright 2020 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 */

val blurBuilder = OneTimeWorkRequestBuilder<BlurWorker>()
val data = workDataOf(KEY_IMAGE_URI to imageUri.toString())
blurBuilder.setInputData(data)
```
Để lên lịch cho công việc và làm cho nó chạy, chúng ta sử dụng lớp WorkManager. Chúng tôi có thể cung cấp các nhiệm vụ cần thực hiện và các ràng buộc đối với các nhiệm vụ này.

# Làm cho Worker làm việc
Khi bạn sử dụng Worker, WorkManager sẽ tự động gọi Worker.doWork () trên một background thread. Kết quả trả về từ doWork () thông báo cho dịch vụ WorkManager liệu công việc có thành công hay không và trong trường hợp thất bại, liệu công việc có nên được thử lại hay không.
Worker.doWork () là một lệnh gọi đồng bộ - bạn phải thực hiện toàn bộ công việc nền của mình theo kiểu chặn và hoàn thành nó vào thời điểm phương thức thoát. Nếu bạn gọi một API không đồng bộ trong doWork () và trả về một Kết quả, thì lệnh gọi lại của bạn có thể không hoạt động bình thường.
Nhưng nếu chúng ta muốn thực hiện công việc không đồng bộ thì sao?
Hãy làm phức tạp ví dụ của chúng tôi và nói rằng chúng tôi muốn lưu Uri của tất cả các tệp đã bị làm mờ trong cơ sở dữ liệu.
Đối với điều này, tôi đã tạo:
* Một entity BlurredImage đơn giản
* Lớp DAO để insert  và get hình ảnh
* Kho dữ liệu

Nếu bạn phải thực hiện công việc không đồng bộ, như lưu dữ liệu trong cơ sở dữ liệu hoặc thực hiện các yêu cầu mạng, trong Kotlin, chúng tôi khuyên bạn nên sử dụng CoroutineWorker.

Một CoroutineWorker cho phép chúng ta thực hiện công việc không đồng bộ, bằng cách sử dụng Kotlin coroutines.
Phương thức doWork () là một phương thức tạm ngưng. Vì vậy, điều này có nghĩa là chúng ta có thể dễ dàng gọi suspending DAO của chúng ta ở đây.
```
/* Copyright 2020 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 */

class BlurWorker(ctx: Context, params: WorkerParameters) : CoroutineWorker(ctx, params) {

    override suspend fun doWork(): Result {
        val resourceUri = inputData.getString(KEY_IMAGE_URI)

        return try {
            if (resourceUri.isNullOrEmpty()) {
                Timber.e("Invalid input uri")
                throw IllegalArgumentException("Invalid input uri")
            }

            val outputData = blurAndWriteImageToFile(resourceUri)

            // save uri in the database 
           val imageDao =     ImagesDatabase.getDatabase(applicationContext).blurredImageDao()
            imageDao.insert(BlurredImage(resourceUri))

            Result.success(outputData)
        } catch (throwable: Throwable) {
            Timber.e(throwable, "Error applying blur")
            Result.failure()
        }
    }
...
}
```
Theo mặc định doWork () sử dụng Dispatchers.Default. Bạn có thể ghi đè điều này với Dispatcher mà bạn cần. Trong trường hợp của chúng ta, chúng ta không cần phải làm điều này vì Room đã chuyển công việc insert trên một Điều phối viên khác. Kiểm tra bài đăng API Room Kotlin để biết thêm chi tiết.

Hãy bắt đầu sử dụng CoroutineWorker để thực hiện công việc không đồng bộ cần hoàn thành ngay cả khi người dùng đóng ứng dụng của bạn.