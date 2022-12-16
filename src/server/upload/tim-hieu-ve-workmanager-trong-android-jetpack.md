![](https://images.viblo.asia/0c924a98-3bf0-435a-98ca-7115136c4f53.jpeg)
Trong sự kiện Google I/O 2018, Google đã release [Android Jetpack](https://android-developers.googleblog.com/2018/05/use-android-jetpack-to-accelerate-your.html)
. Nó là một bộ của những library , tools và hướng dẫn về architecture để giúp xây dựng những ứng dụng android một cách nhanh chóng và mạnh mẽ. Trong Android Jetpack , team tại Google đã release một library được thiết kế đặc biệt cho việc lên lịch và quản lý những task được chạy trong background. Nó được gọi là [WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager) 

Tại thời điểm này chúng ta có một số thư viện như [Job Scheduler API](https://developer.android.com/reference/android/app/job/JobScheduler), [Firebase Job Dispatcher](https://github.com/firebase/firebase-jobdispatcher-android), [GCM network manager](https://developers.google.com/cloud-messaging/network-manager) và một số thư viện khác cho phép lên lịch những task chạy background. Tại Sao chúng ta cần nhiều thư viện như vậy ??? Một thư viện tốt cho việc lên lịch những task chạy background cần phải đảm bảo những yếu tố nào?
Để trả lời cho câu hỏi hỏi này, chúng ta hãy xem xét hình bên dưới.
![](https://images.viblo.asia/daa52fe0-5d90-471f-85f7-ef7ba19f08bc.png)

Chúng ta hãy cùng thảo luận về bốn yêu cầu trên 

**Easy to schedule:**
- Trình lên lịch công việc (background work scheduler)lên cho phép ứng dụng lên lịch một task để có thể được chạy duy nhất trong một điều kiện cụ thể( Ví dụ Task nên chỉ được chạy duy nhất nếu device đang được sạc điện)
- Khi bạn lên lịch công việc , bạn có thể quên về task đó. Trình lên lịch (The Scheduler) phải đảm bảo rằnng, task đã được lên lịch sẽ chạy bất kỳ khi nào các điệu kiện bắt buộc phù hợp.
- Mỗi Task có thể được liên kết hoặc sâu chuỗi với các task khác để chạy nhiều task song song hoặc tuần tự.

**Easy to cancel:**
- Bạn phải có quyền điều khiển các task được thực thi. Trình lên lịch (The Scheduler)cung cấp các API để có thể cancel những task đã được lên lịch một cách dễ dàng.

**Easy to query:**
- Ứng dụng của bạn có thể được hiển thị trạng thái của những task bất kể nơi nào trong UI( ví dụ bạn lên lịch một task cho việc upload picture bất kể khi nào device đang được sạc pin và phải có kết nối internet. Bạn muốn hiển thị tỉ lệ phần trăm upload trong UI của bạn)
- Trình lên lịch (The Scheduler) phải cung cấp các API để lấy được trạng thái hiện tại của những task dễ dàng. Bạn có thể gửi data kết quả bất kể khi nào task được finish.

**Support for all android versions:**
- Các API lên làm việc giống nhau trên tất cả các version của android.(tôi biết rằng điều này nghe có vẻ là không thể)

**Vậy Các API của WorkManager có gì khác biệt!?**
 Theo như tài liệu chính thức của google thì :
 **Easy to schedule** 
 - Các API của Workmanager  làm nó dễ dàng trong việc tạo các task không đồng bộ và ngoài ra cho phép bạn xác định khi nào chúng lên chạy
     - Bạn có thể tạo một task và giao task đó cho work manger để chạy nó ngay lập tức hay bất kể khi nào device trong một điều kiện cụ thể(giống như khi device đang sạc pin và online.
     - Workmanager đảm bảo rằng task của bạn sẽ được thực thi khi điều kiện phù hợp, thậm chí khi ứng dụng của bạn force-quit hoặc device bị reboot.
     
**Easy to cancel**
Workmanager chỉ định [UUID](https://developer.android.com/reference/java/util/UUID) tới mỗi một wrok/task mà bạn muốn lên lịch. Việc sử dụng id duy nhất, bạn có thể dễ dàng cancel bất kỳ task nào tại bất cứ thời điểm nào
 **Easy to query**
  - Bạn có thể yêu cầu trạng thái(status) cuả một task, task đó đang chạy, pending hoặc đã finish bằng cách sử dụng một id duy nhất đã được gán bởi mỗi task.
  - Các API của workmanager không những trả về trạng thái của task, mà nó còn cho phép task trả về data trong định dạng key-value.
  **Support for all android versions**
  - Các API của Workmanager hỗ trợ Android API 14 và các bản cao hơn
  - Workmanager chọn một cách hợp lý nhất để chạy task của bạn dựa trên các yếu tố như cấp độ API của device và trạng thái app.
  - Nếu ứng dụng mà đang chạy, các API của WorkManager sẽ tạo một thread mới để chạy task.
  
  **Classes Và Khái Niệm**
  - [Worker](https://developer.android.com/reference/androidx/work/Worker.html): Trong thế giới của WorkManager, thì Work tương đương với một Task hay job cần thực hiện trong background. Đây là một abstract class, bạn cần phải subclass nó. Class wroker của bạn có chứa những thông tin về làm sao thực hiện task nhưng nó sẽ không có thông tin khi nào task sẽ được chạy.
  - [WorkRequest](https://developer.android.com/reference/androidx/work/WorkRequest.html): nó đại diện cho yêu cầu lập lịch công việc. Mỗi Work phải tạo WorkRequest trước khi lên lịch công việc. WorkRequest sẽ chứa một id duy nhất của Work, các rằng buộc giải thích theo hoàn cảnh nào, nhiệm vụ cần thực hiện. đây là một abstract class. Library cung cấp 2 subclass của class này: [OneTimeWorkRequest](https://developer.android.com/reference/androidx/work/OneTimeWorkRequest.html) và [PeriodicWorkRequest](https://developer.android.com/reference/androidx/work/PeriodicWorkRequest.html)
  - [WorkManager](https://developer.android.com/reference/androidx/work/WorkManager.html): là class để quản lý và lên lịch cho các task dựa trên các rằng buộc đã được định nghĩa trong WorkRequest.
  - [WorkStatus](https://developer.android.com/reference/androidx/work/WorkStatus.html): class này bao gồm các trạng thái của bất kỳ một work nào. Bạn có thể truy vấn bất kỳ status của bất kỳ work nào bằng cách sử dụng id của work đó.
  - 
  **Các Bước Để Lên Lịch Một Work**
  Trong phần này tôi sẽ giới thiệu các bạn làm sao để tạo và lên lịch một work.
  
  - Tạo một Work: tạo một class là subclass của Work. class này có một abstract method gọi là dowork(). Như tên suggest, bạn cần thực hiện công việc bạn muốn trong method này. Method này sẽ được gọi trong background hoặc worker thread. Trong method này bạn phải trả về WorkerResult. Việc trả về WorkerResult.SUCCESS để chỉ ra rằng task đã thực hiện complete và success. Việc trả về  WorkerResult.RETRY để nói với WorkManager retry work một lần nữa. Việc trả về WorkerResult.FAILURE chỉ ra rằng một hoặc nhều lỗi sảy ra. 
```java 
class DownloadWorker : Worker() {

    // Define the parameter keys:
    private val KEY_X_ARG = "X"
    private val KEY_Y_ARG = "Y"
    private val KEY_Z_ARG = "Z"

    // The result key:
    private val KEY_RESULT = "result"

    /**
     * This will be called whenever work manager run the work.
     */
    override fun doWork(): WorkerResult {
        // Fetch the arguments (and specify default values):
        val x = inputData.getLong(KEY_X_ARG, 0)
        val y = inputData.getLong(KEY_Y_ARG, 0)
        val z = inputData.getLong(KEY_Z_ARG, 0)

        val timeToSleep = x  + y + z
        Thread.sleep(timeToSleep)

        //...set the output, and we're done!
        val output = Data.Builder()
                .putInt(KEY_RESULT, timeToSleep.toInt())
                .build()

        outputData = output
        // Indicate success or failure with your return value.
        return WorkerResult.SUCCESS
    }
}
```

- Định Nghĩa các Rằng Buộc (contraints): định nghĩa các constraint để nói với WorkManager khi nào work lên được lập lịch trình. Nếu bạn không cung cấp bất kỳ constraint nào, task sẽ được thực thì ngay lập tức. Bên dưới là một ví dụ về việc tạo ra một constraint để lên lịch một work chỉ được thực hiện khi device đang được sạc pin và idle
```java
val myConstraints = Constraints.Builder()
        .setRequiresDeviceIdle(true)
        .setRequiresCharging(true)
        .build()
```

- Tạo WorkRequest: bạn có thể tạo [OneTimeWorkRequest](https://developer.android.com/reference/androidx/work/OneTimeWorkRequest.html) để chạy work chỉ một lần.
```java
val request = OneTimeWorkRequest.Builder(DownloadWorker::class.java)
       .setConstraints(myConstraints)
       .build()
```
Nếu bạn muốn tạo một work chạy định kỳ, bạn tạo [PeriodicWorkRequest](https://developer.android.com/reference/androidx/work/PeriodicWorkRequest.html) và thiết lập khoảng thời gian giữa các lần tiếp theo
```java
val request = PeriodicWorkRequest
         .Builder(DownloadWorker::class.java, 1, TimeUnit.HOURS)
         .setConstraints(myConstraints)
         .build()
```

- Lên lịch cho request:
  `WorkManager.getInstance().enqueue(request)`
  
  ![](https://images.viblo.asia/04307e75-a1fe-4dc8-af97-630c516fc0dd.png)
  
  Ở đây tôi có tạo ra một project sample dùng để download data từ network và hiển thị lên 1 list như ảnh chụp screenshoot bên dưới: 
  ![](https://images.viblo.asia/331520bd-d438-4c49-8ef1-4cd045967704.png)
  
  Tôi tạo ra một work:
  
``` java
import android.util.Log
import androidx.work.Worker
import com.raywenderlich.apps.backgroundprocessing.app.PhotosUtils

class DownloadWorker : Worker() {

    companion object {
        private const val TAG = "DownloadWorker"
    }

    override fun doWork(): WorkerResult {
        val needRetry = try {
            val jsonString = PhotosUtils.fetchJsonString()
            (jsonString == null)
        } catch (e: InterruptedException) {
            Log.e(TAG, "Error downloading JSON:" + e.message)
            true
        }

        if (needRetry) {
            Log.i(TAG, "WorkerResult.RETRY")
            return WorkerResult.RETRY
        }

        Log.i(TAG, "WorkerResult.SUCCESS")
        return WorkerResult.SUCCESS
    }

}
```

Và gọi nó trong method schedulePeriodicWorkRequest
```java
private fun schedulePeriodicWorkRequest() {
        val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .setRequiresStorageNotLow(true)
                .build()

        val workManager = WorkManager.getInstance()

        val request: WorkRequest = PeriodicWorkRequestBuilder<DownloadWorker>(15,
                TimeUnit.MINUTES)
                .setConstraints(constraints)
                .addTag(DOWNLOAD_WORK_TAG)
                .build()

        workManager.cancelAllWorkByTag(DOWNLOAD_WORK_TAG)
        workManager.enqueue(request)
    }
```

Các bạn có thể tham khảo source code đầy đủ [tại đây](https://github.com/oLeQuangHoa/AndroidBackgroundProcessing)