![](https://s3.ap-south-1.amazonaws.com/mindorks-server-uploads/integrating-work-manager-in-android.png)

Chạy tác vụ nền là một nhiệm vụ rất khó khăn trong Android. Làm việc với AlarmManager, Firebase JobDispatcher hoặc Job Dispatcher không đảm bảo thực thi tác vụ trong Android. Đây là vấn đề lớn phải không?


> WorkManager đã giải quyết vấn đề này cho chúng tôi.


### WorkManager là gì?

WorkManager là một phần thư viện của Android Jetpack, giúp bạn dễ dàng lên lịch các tác vụ không đồng bộ, không đồng bộ được dự kiến ​​sẽ chạy ngay cả khi ứng dụng thoát hoặc khởi động lại thiết bị, tức là ngay cả ứng dụng của bạn khởi động lại do bất kỳ vấn đề nào Trình quản lý công việc đảm bảo tác vụ theo lịch trình sẽ thực thi lại. Điều đó thật tuyệt phải không?

Trong blog này, chúng tôi sẽ nói về cách tích hợp WorkManager trong dự án của bạn và tính năng và tùy chỉnh nâng cao hơn nhiều giúp cuộc sống của bạn dễ dàng trong việc lên lịch các tác vụ.

Vì vậy, hãy bắt đầu.

Để tích hợp trình quản lý công việc trong dự án của bạn,


```kotlin
dependencies {
  def work_version = "2.2.0"
    implementation "androidx.work:work-runtime:$work_version"
  }
  ```
  
  Bây giờ, như một bước tiếp theo, chúng tôi sẽ tạo một lớp Worker. Lớp Worker chịu trách nhiệm thực hiện công việc đồng bộ trên một luồng nền do người quản lý công việc cung cấp.
  
  
  ```kotlin
  class YourWorkerClass(appContext: Context, workerParams: WorkerParameters): Worker(appContext, workerParams) {

    override fun doWork(): Result {
        // Your work here.

        // Your task result
        return Result.success()
    }
}
```

Trong lớp trên,

* Phương thức doWork () chịu trách nhiệm thực thi tác vụ của bạn trên luồng nền. Bất cứ nhiệm vụ nào bạn muốn thực hiện đều phải được viết ở đây.
* Kết quả trả về trạng thái của công việc được thực hiện trong phương thức doWork (). Nếu nó trả về result.success () thì có nghĩa là tác vụ đã thành công nếu trạng thái là result.failure (), tác vụ không thành công và cuối cùng, nếu nó trả về result.retry () thì có nghĩa là tác vụ sẽ thực hiện lại sau một số thời gian.

> Bây giờ, hãy cấu hình cách thực hiện tác vụ


Chúng ta cần tạo một WorkRequest để xác định cách thức và thời điểm công việc nên được chạy. Nó có hai loại,
* OneTimeWorkRequest - Chỉ chạy nhiệm vụ một lần
* PeriodicWorkTimeRequest - Chạy tác vụ sau khoảng thời gian nhất định.

```kotlin
val yourWorkRequest = OneTimeWorkRequestBuilder<YourWorkerClass>().build()
```

và một khi chúng tôi đã xác định yêu cầu công việc của mình, chúng tôi có thể lên lịch tác vụ bằng cách sử dụng

```kotlin
WorkManager.getInstance(context).enqueue(yourWorkRequest)
```

Đó là nó, đây là cách bạn có thể lên lịch tác vụ của mình bằng Work Manager. Điều này thật đơn giản phải không?

### Bây giờ, hãy nói về tùy chỉnh mà chúng ta có thể làm trong quá trình thực thi tác vụ.


Chúng tôi có thể thêm các ràng buộc cụ thể trong WorkRequest để tùy chỉnh nó. Để thêm các ràng buộc, chúng tôi sử dụng

```kotlin
val myConstraints = Constraints.Builder()
    .setRequiresDeviceIdle(true) //checks whether device should be idle for the WorkRequest to run
    .setRequiresCharging(true) //checks whether device should be charging for the WorkRequest to run
    .setRequiredNetworkType(NetworkType.CONNECTED) //checks whether device should have Network Connection
    .setRequiresBatteryNotLow(true) // checks whether device battery should have a specific level to run the work request
    .setRequiresStorageNotLow(true) // checks whether device storage should have a specific level to run the work request
    .build()
```
và để thêm nó trong yêu cầu công việc của chúng tôi, chúng tôi sử dụng
```kotlin
val yourWorkRequest = OneTimeWorkRequestBuilder<YourWorkerClass>()
    .setConstraints(myConstraints)
    .build()
```

Ở đây, chúng tôi đặt các ràng buộc được xác định ở trên thành workRequest được xác định trước đó. Bây giờ, yêu cầu công việc này sẽ chỉ chạy nếu tất cả các ràng buộc được thỏa mãn.

Chúng tôi cũng có thể đặt Nhiệm vụ định kỳ sẽ chạy sau khoảng thời gian nhất định. Để chạy một workRequest chạy định kỳ, chúng tôi sử dụng,

```kotlin
val yourPeriodicWorkRequest =
PeriodicWorkRequestBuilder<YourPeriodicWorkerClass>(1, TimeUnit.HOURS)
    .setConstraints(myConstraints)
    .build()
```


Điều này sẽ chạy mỗi 1 giờ theo định kỳ vì chúng tôi đã đặt khoảng thời gian là 1 giờ.

> Khoảng thời gian tối thiểu để chạy một tác vụ định kỳ là 15 phút. 

Nếu bạn không muốn tác vụ được chạy ngay lập tức, bạn có thể chỉ định công việc của mình sẽ bắt đầu sau một độ trễ ban đầu tối thiểu bằng cách sử dụng:
```kotlin
val yourWorkRequest = OneTimeWorkRequestBuilder<YourWorkerClass>()
        .setInitialDelay(10, TimeUnit.MINUTES)
        .build()
 ```
 
 Điều này sẽ chạy sau một sự chậm trễ ban đầu là 10 phút.
 
 Bây giờ, hãy kiểm tra một số tính năng tuyệt vời mà chúng tôi có trong Trình quản lý công việc
 
 
 ### Kiểm tra trạng thái của WorkManager của bạn
 Nếu chúng ta muốn thực hiện một số tác vụ khi WorkManager thực thi tác vụ thành công như hiển thị Toast hoặc thứ gì khác, chúng ta cần kiểm tra trạng thái của tác vụ. Để kiểm tra trạng thái chúng tôi sử dụng,
 ```kotlin
 WorkManager.getInstance(context).getWorkInfoByIdLiveData(yourWorkRequest.id)
        .observe(lifecycleOwner, Observer { workInfo ->
            if (workInfo != null && workInfo.state == WorkInfo.State.SUCCEEDED) {
                //Toast
            }
        })
 ```
 
 Tại đây, chúng tôi quan sát trạng thái của LiveData để cập nhật giao diện người dùng
 
 
 ### Xâu chuỗi các nhiệm vụ
 
 Chúng ta có thể xâu chuỗi nhiều nhiệm vụ theo hai cách.
 
 * Chaining in Series
* Parallel Chaining

Hãy nói về họ từng người một.

#### Chaining in Series
Giả sử chúng ta có hai workRequest,

```kotlin
val yourWorkRequestOne = ...
val yourWorkRequestTwo = ...
```
và chúng ta cần xâu chuỗi chúng thành chuỗi. Để làm điều này, chúng tôi sẽ sử dụng
```kotlin
WorkManager.getInstance(context).beginWith(yourWorkRequestOne)
.then(yourWorkRequestTwo)
.enqueue()
```
Ở đây, đầu tiên, việc thực thi sẽ bắt đầu với WorkRequest của bạn WorkRequest và sau đó nó sẽ thực thi cái thứ hai. Điều này được gọi là chuỗi chuỗi các nhiệm vụ.

#### Parallel Chaining

Trong trường hợp này, chúng ta có thể xâu chuỗi các tác vụ song song bằng cách sử dụng như sau
```kotlin
WorkManager.getInstance(myContext)
    .beginWith(listOf(work1, work2, work3))
    .then(work4)
    .then(work5)
    .enqueue()
```

Ở đây, work1, work2 và work3 sẽ thực thi song song và sau đó khi tất cả chúng được thực thi thì chỉ có work4 sẽ thực thi và work5 tuần tự.

> Lưu ý: Nếu tác vụ đầu tiên thất bại, tác vụ tiếp theo sẽ thực hiện phản hồi thất bại và nếu tác vụ đầu tiên bị hủy, tất cả các tác vụ sau cũng sẽ bị hủy. 

Để hủy tác vụ chúng ta sử dụng,
```kotlin
WorkManager.cancelWorkById(workRequest.id)
```

#### Input/output for your task

Trong khi chạy công việc / tác vụ, chúng ta có thể cần một số đầu vào để nhân viên chạy. Ví dụ như, tìm nạp chi tiết người dùng hiện tại sẽ yêu cầu id người dùng của người dùng. Để vượt qua điều đó như đầu vào chúng ta sử dụng,

```kotlin
val userId = workDataOf(Constants.USER_ID to String)

val yourWorkRequest = OneTimeWorkRequestBuilder<YourWorkerClass>()
        .setInputData(userId)
        .build()
```

và để có được đầu vào trong lớp worker chúng ta có,
```kotlin
class YourWorkerClass(appContext: Context, workerParams: WorkerParameters)
    : Worker(appContext, workerParams) {
    override fun doWork(): Result {
        val userId = getInputData().getString(Constants.USER_ID)
        val userDetail = getDetail(userId)
        // Create the output of the work
        val firstName = workDataOf(Constants.DETAIL to userDetail.firstName)
        // Return the output
        return Result.success(firstName)

    }
}
```

Ở đây, chúng tôi nhận đầu vào bằng cách sử dụng getInputData (). GetString () và chúng tôi chuyển nó đến getDetail () làm tham số để lấy chi tiết người dùng.

Bây giờ, để chuyển tên của Người dùng làm đầu ra, chúng tôi chuyển đầu ra trong Result.Success (/ ** Đầu ra của bạn ** /).
 
 Đây là cách chúng tôi có thể tích hợp trình quản lý công việc trong dự án Android của mình.

Chúc bạn học vui

#### [Link reference](https://blog.mindorks.com/integrating-work-manager-in-android)