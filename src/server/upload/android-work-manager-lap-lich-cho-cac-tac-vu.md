Trong Google I/0 2018, Google đã ra mắt [Android Jetpack](https://developer.android.com/jetpack/). Android Jetpack là một set các thư viện, công cụ và mẫu kiến trúc để cho các developer có thể xây dựng các ứng dụng một cách đơn giản nhanh chóng và tuyệt vời. Một trong số đó là gói Architecture, ở những phần trước mình đã hướng dẫn cho các bạn cách sử dụng với LiveData, Room, ViewModel. Trong bài hôm nay mình sẽ tiếp tục giới thiệu  tới các bạn một thư viện nữa trong gói Architecture đó là Work Manager. Work Manager là một thư viện được thiết kế cho việc lập lịch và quản lý các tác vụ ngầm.
 
 Bạn có thể nói rằng tại thời điểm hiện tại chúng ta đã có Job Scheduler API hỗ trợ lập lịch cho các tác vụ ngày  bên trong hệ điều hành android. Chúng ta cũng có GCM network manager, Firebase Job Dispatcher, Evernote's android job và rất nhiều các thư viện khác cho phép việc lập lịch cho các tác vụ ngầm. vậy tại sao chúng ta lại cần một thư viện khác để lập lịch?
 
 Để trả lời câu hỏi này, chúng ta cùng đi vào tìm hiểu ma trận phát triển của lập lịch công việc ngầm. Đâyt chính là 4 trụ cột chính cho việc lập lịch cho một tác vụ
 # I. Background work scheduler evolution matrix:
 ![](https://images.viblo.asia/a40fba4a-ace6-4023-9ad7-14f792419cee.png)
 Chúng ta bắt đầu đi vào từng trụ cột chính 
 ## 1. Easy to schedule (Dễ dàng lập lịch)
 - Trình lập lịch ngầm cần cho phép ứng dụng lập lịch cho một task có thể chạy dưới một số điều kiện nhất định (Ví dụ một task chỉ có thể chạy khi device đang được sạc, chẳng hạn việc Upgrade OS)
 - Mỗi khi bạn lên lịch cho các tác vụ, các bạn không cần phải quan tâm đến tác vụ đó nữa, Trình lập lịch ngầm cần bảo đảm rằng tác vụ này cần được chạy ngay lập tức khi các điều kiện yêu caafud dược thỏa mãn
 - Mỗi tác vụ có thể liên kết với các tác vụ khác để có thể chạy nhiều tác vụ tuần tự hoặc song song
 
 ## 2. Easy to cancel (Dễ dàng hủy bỏ)
 - Bạn phải có quyền kiểm soát việc thực thi các tác vụ, vậy Trình lập lịch ngầm cần cung cấp API để có thể hủy các tác vụ đã được lên lịch một cách dễ dàng
 
 ## 3. Easy to query (Dễ dàng truy vấn)
 - Ứng dụng của bạn có thể hiện thị các trạng thái của của tác vụ ở trên UI. Giả sử bạn lên lịch cho một tác vụ thực hiện việc upload một bức ảnh ngay khi thiết bị đang được sạc và có kết nối internet. Bạn có thể muốn hiển thị tiến độ upload của bạn lên UI
 - Trình lập lịch cần cung cấp một API để lấy ra trạng thái hiện tại của tác vụ một cách dễ dàng. Nếu có thể trả về kết quả ngay khi tác vụ được hoàn thành thì lại càng tốt
 
 ## 4. Support for all android version (Hỗ trợ tất cả các version của android)
 - Như các bạn biết thì hiện tại android có vô số các version từ android 1.6 Donut cho đến Android 9.0 Peneat. Trình lập lịch cần hoạt động ổn định trên mọi thiết bị với các hệ điều hành các khác. Mặc dù nghe điều này dường như rất vô lí.

Chúng ta cùng bắt đầu so sánh các trình lập lịch thông qua ma trận trên nhé

# II. What makes WorkManager APIs different⁉️
Theo như tài liệu đầy đủ và chính thức của google về Work Manager API

## 1. Easy to schedule
- Work Manager API giúp dễ dàng tạo các tác vụ không đồng bộ và cũng cho phép bạn chỉ định rõ ràng khi nào chúng nên thực thi
- Bạn có thể tạo 1 tác vụ và chuyển giao tác vụ này cho Work Manager thực hiện nó ngay lập tức hoặc khi nào thiết bị đang trong một số điều kiện nhất định (Chẳng hạn chỉ chạy trong khi thiết bị đang được sạc và có kết nối mạng). 
- Work Manager đảm bảo rằng tác vụ của bạn sẽ chỉ chạy khi các điều kiện đưa ra được thỏa mãn, thậm chí ngay cả khi ứng dụng của bạn bị buộc dừng hoặc thiết bị bị khởi độnglại

## 2. Easy to cancel
- Work Manager cung cấp UUID cho mỗi một tác vụ của bạn, sử dụng id này cho phép bạn có thể hủy bỏ bất cứ tác vụ tại bất cứ thời gian nào

## 3. Easy to query
- Bạn có thể truy vấn đến trạng thái của một tác vụ - liệu nó có đang được thực thi, tạm dừng hay đã kết thúc bằng sử dụng id đã được cung cấp cho mỗi tác vụ như mình vừa nói ở trên
- Work Manager API không chỉ cung cấp trạng thái hiện tại của tác vụ mà nó còn cho phép tác vụ trả về các dự liệu cụ thể dưới dạng key-value
- Work Manager sử dụng LiveData để trả về dữ liệu và trạng thái của công việc. Activity của bạn có thể quan sát LiveData này và sẽ nhậnđược thông báo khi tác vụ kết thúc. (Thông tin chi tiết sẽ được hướng dẫn ở dưới)

## 4. Support for all android version
-  Work Manager hỗ trợ mọi device từ 14 trở lên
-  Work Manager chọn những cách thích hợp để thực hiện tác vụ của bạn dựa trên các yếu tố như API của thiết bị và trạng thái của ứng dụng. Nếu một ứng dụng đang được chạy, Work Manager sẽ tạo ra một luông mới để thực hiện tác vụ. Nếu ứng dụng không được khởi chạy Work Manager sẽ sử dụng JobScheduler API hoặc Firebase Job dispatcher hoặc Alarm Manager API để thực hiện các tác vụ đã được lên lịch

![](https://images.viblo.asia/831327ab-667c-4692-b527-4e8848c89b2b.png)

Như vậy Work Manager thỏa mãn cả 4 trụ cột của ma trận lập lịch. Trừ điều cuối cùng, Hỗ trợ tất cả các version của android.

# III. Class and Concepts
Work Manager API được xậy dựng dựa trên một vài class cơ bản
## 1. Worker: 
Trong thế giới của Work Manager, Worker tương đương với tác vụ hoặc công việc cần được thực hiện dưới background. Đây là một abstract class. Bạn cần extends nó. Class Worker của bạn cần chưa thông tin về cách thực thi các tác vụ nhưng không chưa thông tin về khi nào nó được thực thi (HOW not WHEN)
## 2. Worker Request
Nó đại diện cho việc lập lịch cho các request. Mỗi một Worker có thể tạo một WorkRequest trước khi lập tác vụ đó được thực thi. Một Worker Request cần chưa một id duy nhất của tác vụ, các ràng buộc giải thích rõ ràng khi nào một tác vụ được thực thi. Đây là một abstract class và bạn cũng cần extend nó. Work Manager cung cấp sẵn 2 subclass của WorkerRequest là [OnTimeWorkRequest](https://developer.android.com/reference/androidx/work/OneTimeWorkRequest.html) và [PeriodicWorkRequest](https://developer.android.com/reference/androidx/work/PeriodicWorkRequest)
## 3. Work Manager
Đây là class cho phép quản lý và lập lịch cho các tác vụ dựa trên sự ràng buộc đã được định nghĩa trong WorkRequest
## 4. Work Status 
Đây là class định nghĩa trạng thái của bất cứ Worker nào, bạn có thể truy vấn trạng thái của bất cứ Worker nào thông qua id duy nhất của request đó.

# IV. Workflow to schedule work
Chúng ta cùng đi vào thực tế và tìm hiểu cách để tạo ra và thực thi một tác vụ với Work Manager nhé
## 1. Create the work
- Tạo một class là class con của Worker class. Class này có một abstract menthod cần override là [doWork()](https://developer.android.com/reference/androidx/work/Worker.html#doWork%28%29). Thông qua cái tên của nó các bạn cũng biết nhiệm vụ của nó rồi đúng không nào? Bạn cần viết các đoạn code biểu diễn các tác vụ mà bạn muốn thực hiện dưới background. Menthod này sẽ được thực hiện dưới background/ Worker thread.
- Ở kết quả trả về bạn cần trả về muộn WorkerResult. Trả về WorkerResult.SUCCESS cho biết rằng công việc đã được hoàn thành. Trả về WorkerResult.RETRY để WorkManager thực hiện lại công việc này. Trả về WorkerResult.FAILURE cho biết có 1 hoặc một số lỗi đã xảy ra trong quá trình thực hiện
```
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

## 2. Define constraints
- Định nghĩa các ràng buộc để cho Work Manager biết khi nào tác vụ cần được thực thi. Nếu bạn không định nghĩa các ràng buộc này thì tác vụ sẽ được thực thi ngay lập tức
- Đây là một ví dụ về ràng buộc tác vụ chỉ được chạy khi thiết bị đang được sạc và nhàn rỗi
```
val myConstraints = Constraints.Builder()
        .setRequiresDeviceIdle(true)
        .setRequiresCharging(true)
        .build()
```

## 3. Create the Work Request
Bạn có thể khởi tạo [OneTimeWorkRequest](https://developer.android.com/reference/androidx/work/OneTimeWorkRequest) để thực thi tác vụ chỉ 1 lần
```
val request = OneTimeWorkRequest.Builder(DownloadWorker::class.java)
       .setConstraints(myConstraints)
       .build()
```

Nếu bạn muốn thực thi tác vụ định kì bạn có thể sử dung [PeriodicWorkRequest](https://developer.android.com/reference/androidx/work/PeriodicWorkRequest) và định nghĩa chu kì của nó
```
val request = PeriodicWorkRequest
         .Builder(DownloadWorker::class.java, 1, TimeUnit.HOURS)
         .setConstraints(myConstraints)
         .build()
```

## 4. Schedule the request
Bạn lập lịch cho request thông qua WorkManager
```
WorkManager.getInstance().enqueue(request)
```
![](https://images.viblo.asia/b2ed653f-d356-4db1-9537-c9935e913334.png)

## 5. Input parameters and return values
**Cài đặt các giá trị đầu nào**
- Khi tạo một WorkRequest các bạn có thể truyền dữ liệu đầu vào cho WorkRequest thông qua [androix.work.Data](https://developer.android.com/reference/androidx/work/Data.html). Nó tương tự như Bundle, cá bạn có thể truyền dữ liệu dưới dạng Key-Value
- Tạo một Data với tất cả các giá trị yêu cầu dưới dạng Key-Value sau đó set data khi khởi tạo Work Request thông qua menthod[ setInputData()](https://developer.android.com/reference/androidx/work/WorkRequest.Builder#setinputdata)
```
val myData = Data.Builder()
        .putLong(KEY_X_ARG, 42)
        .putLong(KEY_Y_ARG, 421)
        .putLong(KEY_Z_ARG, 8675309)
        .build()
val request = OneTimeWorkRequest.Builder(DownloadWorker::class.java)
        .setInputData(myData)
        .build()
```
**Đọc giá trị đầu vào và viết các giá trị đầu ra**
- Bạn có thể đọc tất cả các giá trị đầu nào này thông qua gọi menthod [getInputData()](https://developer.android.com/reference/androidx/work/Worker#getinputdata). Sau khi thực hiện công việc bạn có thể gọi menthod [setOutputData()](https://developer.android.com/reference/androidx/work/Worker#setoutputdata) để xác định dữ liệu trả về cho Worker này
```
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
**Lắng nghe các dữ liệu đầu ra.**
Work Manager quản lý thông qua LiveData của tất cả các WorkStatus cho tất cả các Work Request. Ứng dụng có thể lắng nghe các LiveData để có thể được thông báo ngay khi Work Status có sự thay đổi
Bạn Có thể lắng nghe output data thông qua gọi hàm getOutputData()
```
WorkManager.getInstance()
  .getStatusById(request.id)
  .observe(this@MainActivity, Observer {
    it?.let {
      // Get the output data from the worker.
      val workerResult = it.outputData     
      // Check if the task is finished?
      if (it.state.isFinished) {
        Toast.makeText(this, "Work completed.", Toast.LENGTH_LONG)
            .show()
      } else {
        Toast.makeText(this, "Work failed.", Toast.LENGTH_LONG)
            .show()
      }
    }
})
```

## 6. Cancel a task
Bạn có thể hủy một tác vụ sau khi bạn lên lịch cho nó. Để cancel 1 task các bạn sử dụng như sau
```
val compressionWorkId:UUID = compressionWork.getId()
WorkManager.getInstance().cancelWorkById(compressionWorkId)
```

# V. When you should use work manager?
Nếu bạn nghĩ ràng Work Manager rất dễ dàng để đọc và sử dụng, Điều gì sẽ xảy ra nếu chúng ta sử dụng WorkManager để thực hiện tất cả các tác vụ ngầm?
Điều đó không vấn đề gì cả. Bạn hãy lưu ý rằng Work manager phù hợp để thực hiện các tác vụ cần được đảm bảo thông qua các ràng buộc điều kiện, và nó hoàn toàn có thể bị trì hoãn cho đến khi điều kiện được thỏa mãn. Tất cả các trường hợp khác thì tôi khuyến khích các bạn sử dụng Intent Service hoặc Foreground service.

Trên đây phần hướng dẫn của mình về Work Manager. Rất cảm ơn các bạn đã đón đọc.
Bài viết có tham khảo các nguồn
Medium https://medium.com/exploring-code/exploring-jetpack-scheduling-tasks-with-work-manager-fba20d7c69bf
Android