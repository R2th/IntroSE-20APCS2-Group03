# I. Tại sao chúng ta cần WorkManager và khi nào thì nên sử dụng nó?
## 1. Đặt vấn đề
![](https://images.viblo.asia/acbce748-7322-44fe-8671-d8a1d79b4c2b.png)

                                                              Hình 1

Giả sử chúng ta đang code task yêu cầu thực hiện chuỗi công việc theo thứ tự filter image khi pin thiết bị chưa cạn -> nén ảnh khi bộ nhớ lưu trữ còn trống -> upload ảnh khi có kết nối mạng (như hình trên) và đảm bảo tiến trình vẫn thực hiện khi người dùng đã thoát ứng dụng. Để giải bài toán này, tất nhiên chúng ta cần phải xử lý ở background vì nó là task cần nhiều thời gian để xử lý. Trong Android, chúng ta có nhiều cách để xử lý task ở background. Đó là: 

[Thread](https://developer.android.com/reference/java/lang/Thread)

[Executor](https://developer.android.com/reference/java/util/concurrent/Executor)

[Service](https://developer.android.com/reference/android/app/Service)

[AsyncTask](https://developer.android.com/reference/android/os/AsyncTask)

[Handler](https://developer.android.com/reference/android/os/Handler) and [Looper](https://developer.android.com/reference/android/os/Looper)

[Jobs](https://developer.android.com/reference/android/app/job/JobScheduler)

[GcmNetworkManager](https://developers.google.com/android/reference/com/google/android/gms/gcm/GcmNetworkManager)

[Sync Adapter](https://developer.android.com/training/sync-adapters/)

[Loaders](https://developer.android.com/guide/components/loaders)

[AlarmManager](https://developer.android.com/reference/android/app/AlarmManager)

Bạn biết phải lựa chọn cái nào bây giờ? :D. Khoan đã, đừng chọn vội. Bài toán còn thêm vấn đề cần giải quyết. Đó là: 

Kể từ Android M, Google cũng cho ra đời một loạt sự tối ưu hóa pin cho thiết bị. Điển hình như:

[Doze mode and App Standby (Android M)](https://developer.android.com/training/monitoring-device-state/doze-standby)

[Limited Implicit Broadcast and Background Service (Android O)](https://developer.android.com/about/versions/oreo/background)

[App Standby Buckets and Background restricted app (Android P)](https://developer.android.com/about/versions/pie/power)

Mình sẽ tạm giải thích ngắn gọn về vấn đề này: Từ Android phiên bản 6.0 Google nhận ra các dev nhà ta đã lạm dụng Background Service vô tội vạ khiến cho pin thiết bị của user bị tụt nhanh chóng. Vì vậy, ngay từ Android 6.0, Google muốn cứu lấy pin thiết bị của user bằng cách giới thiệu Doze mode. Cụ thể là khi thiết bị ở chế độ Doze, thiết bị sẽ ngắt các kết nối như interner, wifi, bluetooth v.v khi thiết bị tắt màn hình và chỉ chạy lại khi thiết bị được mở lên hay được kết nối vào nguồn điện nhằm tiết kiệm pin cho thiết bị. Tuy nhiên, việc làm này của Google dường như không ngăn cản được dev nhà mình nên sang tới phiên bản Android 8.0 Google đã mạnh tay hơn với Background Service. Cụ thể là từ android 8.0, chúng ta không thể gọi hàm startService() để start Background Service được nữa. Nếu cố chấp gọi, app sẽ ném ra một IllegalStateException.

Vậy là anh Google đã làm cho bài toán trở nên khó giải hơn rất nhiều =))

Chưa hết, khó khăn nhất của chúng ta là code phải chạy ngon lành trên mọi nền tảng (minSdk = 17 =)) )

Đây là công thức do Google đưa ra để giải bài toán trên, cũng như các loại bài toán liên quan đến background processing. 
![](https://images.viblo.asia/e3986b3e-2c3a-42af-977d-b7c40edc7f30.png)

Bài toán 1,2 và 3 thì lời giải quá đơn giản. Tuy nhiên nhìn bài toán 4 mà xem. Bài toán ở Hình 1 chính là dạng bài toán 4 này.  Và tùy yêu cầu bài toán, ta là lời giải cụ thể cho bài toán 4 như sau
![](https://images.viblo.asia/609d5a5a-3ce5-4aa0-b0d9-248212f213b6.png)

Nhìn vào bảng trên, chúng ta có thể thấy. Để giải được bài toán ở hình 1 chạy tốt trên mọi nền tảng (minSdk = 17) thì chúng ta phải kết hợp nhiều class lại (Alarm Manager + Jobs + Firebase Job Dispatcher). Nghĩ tới là thấy code rối như thế nào rồi =))

Đừng lo, vì giờ đây chúng ta đã có WorkManager đến giải cứu =))

## 2. WorkManager là gì
WorkManager là một thư viện nằm trong bộ Android Jetpack. Nó giúp chúng ta giải quyết bài toán xử lý 1 hoặc 1 chuỗi task liên tiếp ở background thỏa mãn Deferrable và Guaranteed Execution. Và quan trọng là nó chạy trên API 14+ (vậy là đủ để chạy trên 99,99% thiết bị rồi :D)
WorkManager sẽ chọn một cách thích hợp để chạy. Tùy thuộc vào nền tảng API của thiết bị, WorkManager có thể sử dụng JobScheduler, Firebase JobDispatcher hoặc AlarmManager.
![](https://images.viblo.asia/521be9aa-62d2-4970-91de-9fa31e120a05.png)

Giải thích từ ngữ:

**Deferrable** có nghĩa là task này không cần phải run ngay lập tức (ngay sau khi user click chẳng hạn) mà thực tế có thể muốn chờ một số điều kiện (chẳng hạn như chờ sau khi có kết nối mạng rồi mới thực thi hoặc thực thi ngay sau khi thoát khỏi chế độ Doze mode). Điều này có nghĩa là task này có thể thực thi ngay lập tức nếu nó thỏa mãn đủ các điều kiện cho phép. Hoặc, nó sẽ được bảo vệ, kể cả khi user có restart thiết bị, hoặc pin thiết bị đang yếu, hoặc bộ nhớ lưu trữ đã full, hoặc không có kết nối mạng, nó cũng sẽ được thực thi ngay khi các điều kiện được thỏa mãn trở lại (có kết nối mạng, pin full, bộ nhớ lưu trữ available,... :D).

**Guaranteed Execution** là đảm bảo hệ thống sẽ chạy những đoạn code này ngay cả khi ứng dụng đã bị thoát. Còn nếu task nào mà không cần chạy tiếp khi thoát app (ví dụ như bài toán 1 và bài toán 3 như hình trên) thì không cần phải xử dụng WorkManager. Còn những task nào yêu cầu chạy ngay lập tức (ngay sau khi user click chẳng hạn) và tiếp tục chạy ngay cả khi ứng dụng đã bị thoát (như yêu cầu của bài toán 2) thì có thể cân nhắc sử dụng Foreground Service :D

## 3. Khi nào cần sử dụng WorkManager
![](https://images.viblo.asia/da76b5b6-bd4c-4697-bec5-57a33ae9fcdc.png)

Như đã giải thích ở đoạn trên (mục I. 2.) kèm với sơ đồ trên, chúng ta có thể thấy không phải lúc nào cũng phải sử dụng WorkManager để xử lý các task ở background. Có thể sử dụng ForegroundService, AlarmManager hay ThreadPool để xử lý.
# II. Khám phá thư viện WorkManager
## 1. Các class và khái niệm cần nắm
API WorkManager sử dụng một số lớp khác nhau. Tuy nhiên mình thấy có các class cần chú ý sau:

[**Worker**](https://developer.android.com/reference/androidx/work/Worker): Đây là một abstract class Worker. Bạn cần extend class này để override lại hàm doWork() và code thực thi công việc tại đây. Có vẻ giống hàm doInBackground trong AsyncTask :D

[**WorkRequest**](https://developer.android.com/reference/androidx/work/WorkRequest): nhiệm vụ chính của WorkRequest là xác định lớp Worker nào sẽ thực hiện nhiệm vụ. Tuy nhiên, bạn cũng có thể thêm các chi tiết vào WorkRequest như điều kiện ràng buộc (Constraint), dữ liệu đầu vào (Input Data). Mỗi WorkRequest có một ID duy nhất được tạo tự động; bạn có thể sử dụng ID này để thực hiện những việc như cancel task hoặc get trạng thái của task. WorkRequest là một lớp trừu tượng nên bạn sẽ sử dụng một trong các lớp con của nó là OneTimeWorkRequest hoặc PeriodicWorkRequest.

[**OneTimeWorkRequest**](https://developer.android.com/reference/androidx/work/OneTimeWorkRequest): Một WorkRequest được thực thi một lần ngay sau khi thỏa mãn các điều kiện ràng buộc.

[**PeriodicWorkRequest**](https://developer.android.com/reference/androidx/work/PeriodicWorkRequest): Một WorkRequest thực thi một công việc được lặp lại liên tục. Công việc này được thực thi nhiều lần cho đến khi nó bị hủy. Thời gian lặp lại request tối thiểu là 15 phút. Lưu ý rằng việc thực thi có thể bị delay vì WorkManager tuân theo sự tối ưu hóa pin của hệ điều hành, chẳng hạn như doze mode.

[**Constraints**](https://developer.android.com/reference/androidx/work/Constraints): đây là lớp để bạn xây dựng các điều kiện ràng buộc

[**Data**](https://developer.android.com/reference/androidx/work/Data): đây là lớp để bạn xây dựng các dữ liệu đầu vào (Input Data) và kết quả đầu ra (Output Data)

[**WorkManager**](https://developer.android.com/reference/androidx/work/WorkManager): nhiệm vụ của nó là quản lý và enqueue các task. Bạn truyền đối tượng WorkRequest của bạn vào WorkManager để enqueue.

[**WorkInfo**](https://developer.android.com/reference/androidx/work/WorkInfo): chứa thông tin về một task cụ thể. WorkManager cung cấp một LiveData cho mỗi đối tượng WorkRequest. LiveData chứa đối tượng WorkInfo, bằng cách observe LiveData, bạn có thể xác định trạng thái hiện tại của tác vụ và nhận bất kỳ giá trị trả về (Output Data) nào sau khi tác vụ kết thúc.

[**WorkContinuation**](https://developer.android.com/reference/androidx/work/WorkContinuation):  Đây là lớp cần thiết khi bạn muốn thực thi một chuỗi các task liên tiếp nhau.

## 2. Flow cơ bản
Flow đơn giản nhất từ build đến thực thi 1 task có thể ngắn gọn trong 5 bước sau:

1/ Create Task -> 2/ Build WorkRequest = Pass Input Data (optional) + Add Constraint (optional) + Add Tag (optional) -> 3/ Get Input Data and Build Output Data -> 4/ Enqueue -> 5/ Observe and Get Output Data

Giả sử bạn đang viết một ứng dụng cần nén hình ảnh.  Trước tiên chúng ta cần phải implementation thư viện này vào project :D
```kotlin
implementation "android.arch.work:work-runtime-ktx:1.0.0-rc01"
```
### Bước 1: Create Task
Để tạo 1 task ta cần tạo class kế thừa class Worker.
```kotlin
class CompressWorker(context : Context, params : WorkerParameters) : Worker(context, params) {
        override fun doWork(): Result {
           return try {
                 // task cần execute ở đây là nén ảnh
                 myCompress()
                 
                 // trả về thành công sau khi execute xong
                 Result.success()
          } catch(e: Exception){
          
                 // trả về fail nếu xảy ra lỗi
	             Result.failure()
          }
}
```
### Bước 2: Build WorkRequest
Tạo 1 WorkRequest đơn giản bằng cách truyền Worker nào sẽ được thực thi.
```kotlin
val compressionWork = OneTimeWorkRequestBuilder<CompressWorker>().build()
```
Hoặc bạn có thể tạo 1 WorkRequest có set dữ liệu đầu vào, set điều kiện ràng buộc và gắn tag
```kotlin
// khởi tạo dữ liệu đầu vào
val inputData = Data.Builder().putString("extra_photo_name", "my_dog.png").build()
// khởi tạo điều kiện ràng buộc
val myConstraints = Constraints.Builder().setRequiresCharging(true).build()
// tạo WorkRequest
val compressionWork = OneTimeWorkRequestBuilder<CompressWorker>()
        .setInputData(source) // pass dữ liệu đầu vào
        .setConstraints(myConstraints) // thêm điều kiện ràng buộc
        .addTag("compress_photo") // gắn tag cho task
        .build()
```

### Bước 3: Get Input Data and Build Output Data
Get dữ liệu đầu vào và Build dữ liệu trả về sau khi task thực thi xong
```kotlin
class CompressWorker(context : Context, params : WorkerParameters) : Worker(context, params) {
    override fun doWork(): Result {   
      return try {
             // Get dữ liệu đầu vào
            val photoName = inputData.getString("extra_photo_name") // result = "my_dog.png"
            
             // task need execute
            val newSize = myCompress()
            val outputData = Data.Builder()
                   .putLong("extra_size", newSize)
                   .build();
                   
             // pass output data vào hàm success()
            Result.success(outputData)
       } catch(e: Exception){
            Result.failure()
       }
    }
}
```

### Bước 4: Enqueue
Thực thi task
```kotlin
WorkManager.getInstance().enqueue(compressionWork)
```
### Bước 5: Observe and Get Output Data
Ta sẽ get được livedata của đối tượng WorkRequest bằng Id của nó để observe và lấy kết quả trả về
```kotlin
WorkManager.getInstance().getWorkInfoByIdLiveData(compressionWork.id)
                .observe(lifecycleOwner, Observer { workInfo ->
                        // Có thể get thêm thông tin từ workInfo
                        
                        // check task được thực thi thành công
                        if (workInfo != null && workInfo.state.isFinished) {
                                // Get kết quả trả về
                               val result = workInfo.getLong(“extra_size”, 0L)
                        }
                })
```
Ngoài ra, ta cũng có thể get được livedata của đối tượng WorkRequest bằng tag mà chúng ta đã gắn trước cho nó:
```kotlin
WorkManager.getInstance().getWorkInfosByTagLiveData(compressionWork.tag)
```
Trên đây, chúng ta đã được giới thiệu qua những tính năng cơ bản của WorkManager. Và tiếp theo, chúng ta sẽ cùng khám phá những chức năng bá đạo hơn của WorkManager :D
## 3. Retry
Giả sử vì một lý do nào đó, chúng ta muốn thực thi lại task. Khi đó WorkManager cho phép chúng ta làm điều đó qua hàm retry(). Hàm này được trả về trong class extend Worker. Khi retry() WorkManager sẽ trở về hàng thái hàng đợi và đợi các điều kiện được thỏa mãn sẽ cho chạy lại đoạn code trong hàm doWork() từ đầu.
```kotlin
class CompressWorker(context : Context, params : WorkerParameters) : Worker(context, params) {
    override fun doWork(): Result {   
           return try {
                  val newSize = myCompress()
                  if (newSize <= 0) Result.retry() // Thực thi lại task
                  else {
                       Result.success()
                  }
           } catch(e: Exception){
                 Result.failure()
           }
    }
}
```
Thời gian delay mặc định để WorkManager thực thi lại là 30 giây và lần sau sẽ lâu hơn lần trước theo cấp số nhân. Chúng ta có thể custom lại con số này bằng cách setBackoffCriteria vào WorkRequest.
```kotlin
val compressionWork = OneTimeWorkRequestBuilder<CompressWorker>()      
            .setBackoffCriteria(BackoffPolicy.LINEAR, OneTimeWorkRequest.MIN_BACKOFF_MILLIS, TimeUnit.MILLISECONDS)
            .build()
```
Khoảng thời gian delay tối thiểu cho phép là 10.000 mili giây hay 10 giây (OneTimeWorkRequest.MIN_BACKOFF_MILLIS) và lần sau sẽ lâu hơn lần trước theo cấp số cộng (BackoffPolicy.LINEAR)
## 4. Cancel task
Chúng ta có thể cancel 1 task nào đó như sau:
```kotlin
WorkManager.getInstance().cancelWorkById(compressionWork.id)
```
Hoặc có thể cancel tất cả task:
```kotlin
WorkManager.getInstance().cancelAllWork()
```
Hoặc cancel tất cả task được gắn 1 tag nào đó:
```kotlin
WorkManager.getInstance().cancelAllWorkByTag("my_tag")
```
## 5. Recurring tasks (Nhiệm vụ định kỳ)
Bạn có thể có một nhiệm vụ mà bạn cần phải thực hiện nhiều lần. Ví dụ: ứng dụng trình quản lý ảnh sẽ không muốn nén ảnh một lần. Nhiều khả năng, nó sẽ muốn kiểm tra hình ảnh được chia sẻ của nó thường xuyên như vậy, và xem nếu có bất kỳ hình ảnh mới hoặc thay đổi cần phải được nén.

Để tạo một nhiệm vụ định kỳ, sử dụng lớp PeriodicWorkRequest.Builder để tạo một đối tượng PeriodicWorkRequest, sau đó enqueue PeriodicWorkRequest giống như cách bạn đã làm với đối tượng OneTimeWorkRequest. Ví dụ, giả sử chúng ta định nghĩa một lớp PhotoCheckWorker để xác định các hình ảnh cần được nén. Nếu chúng ta muốn chạy tác vụ kiểm kê mỗi 12 giờ, chúng ta sẽ tạo một đối tượng PeriodicWorkRequest như sau:
```kotlin
// create recurring task
val photoCheckWork = PeriodicWorkRequest.Builder(PhotoCheckWorker::class.java, 12, TimeUnit.HOURS).build()
// thực thi recurring task
WorkManager.getInstance().enqueue(photoCheckWork)
```
Thời gian tối thiểu để công việc được lặp lại là 15 giây.
## 6. Chained tasks (Chuỗi công việc)
![](https://images.viblo.asia/4582d806-3b16-40c3-b86c-3a77ff28a4cf.png)

Giả sử ứng dụng của bạn có ba đối tượng OneTimeWorkRequest: workA, workB và workC như hình trên. Các nhiệm vụ phải được chạy theo thứ tự đó. Để enqueue chúng, tạo một chuỗi với phương thức WorkManager.beginWith (), truyền đối tượng OneTimeWorkRequest đầu tiên; phương thức đó trả về một đối tượng WorkContinuation, nó định nghĩa một chuỗi các nhiệm vụ. Sau đó, thêm các đối tượng OneTimeWorkRequest còn lại, theo thứ tự, với WorkContinuation.then (), và cuối cùng, enqueue toàn bộ chuỗi với WorkContinuation.enqueue():

```kotlin
WorkManager.getInstance()
    .beginWith(workA)
    .then(workB)
    .then(workC)
    .enqueue()
```
Output data của workA có thể dùng là input data của workB

Bạn có thể tạo các chuỗi phức tạp hơn bằng cách nối nhiều chuỗi với các phương thức WorkContinuation.combine(). Ví dụ: giả sử bạn muốn chạy một chuỗi như sau:
![](https://images.viblo.asia/2dd335de-2440-4da1-8712-4fdcaf1bdda3.png)
```kotlin
WorkContinuation chain1 = WorkManager.getInstance()
    .beginWith(workA)
    .then(workB);
WorkContinuation chain2 = WorkManager.getInstance()
    .beginWith(workC)
    .then(workD);
WorkContinuation chain3 = WorkContinuation
    .combine(chain1, chain2)
    .then(workE);
chain3.enqueue();
```
Trong trường hợp này, WorkManager chạy workA xong rồi đến chạy workB. Nó cũng chạy workC xong rồi đến chạy workD. Sau khi cả hai chuỗi công việc chain1 và chain2, WorkManager mới bắt đầu chạy workE.
# III. Behind the Scenes - Tìm hiểu xem WorkManager chạy như thế nào
![](https://images.viblo.asia/ab4cdad0-48a0-43f5-b5cd-23eba3535f3e.png)

Giải thích:

**Internal TaskExecutor**: A single threaded Executor được WorkManager sử dụng để xử lý tất cả request để enqueue work.

**WorkManager Database**: Cơ sở dữ liệu nội bộ này sẽ lưu lại tất tần tật của Work bao gồm input data, output data và bất kỳ điều kiện ràng buộc nào trong Work. Chính nhờ DB này mà WorkManager đảm bảo work của bạn sẽ được thực thi - dù cho người dùng có khởi động lại thiết bị hay tiến trình bị gián đoạn. Tất cả các thông tin của work có thể được lấy lại từ DB này và work có thể được thực thi lại từ đầu.
Như sơ đồ hoạt động trên, sau khi enqueue WorkRequest: 

Internal TaskExecutor ngay lập tức lưu thông tin WorkRequest của bạn vào cơ sở dữ liệu WorkManager Database. 
Sau đó, khi các ràng buộc cho WorkRequest được đáp ứng (có thể là ngay lập tức), Internal TaskExecutor nói với WorkerFactory hãy tạo ra một Worker. 
Sau đó, Executor gọi phương thức doWork () và chạy bằng một background thread. 
Theo cách này, task của bạn vừa được đảm bảo chắc chắn sẽ thực thi và chạy ở background. 

Mặc định, Executor sẽ được chọn để chạy Worker. Nếu bạn không thích, WorkManager có hỗ trợ cho cả [KotlinCoroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) (extend CoroutineWorker thay vì Worker) và RxJava (extend RxWorker).

Trên đây phần hướng dẫn của mình về Work Manager. Rất cảm ơn các bạn đã đón đọc. 

Bài viết có tham khảo các nguồn: 

https://medium.com/androiddevelopers/workmanager-basics-beba51e94048?fbclid=IwAR0EjqaM-h8Y9uD12tCN5IgsGCbB9Jel3c54LnwLxh5oeyFOyv7SeuGrHzg

https://medium.com/androiddevelopers/introducing-workmanager-2083bcfc4712

https://medium.com/google-developer-experts/services-the-life-with-without-and-worker-6933111d62a6?fbclid=IwAR1LMmV7mnK725ggpRYFvL2V7b6HpZA0GicXQUd_-JZFnN2k4IXSJvr1B5I

https://developer.android.com/topic/libraries/architecture/workmanager/

https://www.youtube.com/watch?v=IrKoBFLwTN0&t=223s