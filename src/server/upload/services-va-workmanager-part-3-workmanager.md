Xin chào, hôm nay tôi sẽ đi vào phần 3 của Series bài viết Services và WorkManager.
Google I/O 2018 đã cho ra mắt WorkManager. Vậy ta cùng xem WorkManager là gì?
> WorkManager ra đời nhằm mục đích đơn giản hóa việc phát triển bằng cách cung cấp 1 API xử lý tiến trình chạy dưới background. Nó có thể giúp cho những job chạy ngay cả khi app không được sử dụng trước đó. Nó sử dụng JobScheduler và Firebase JobDispatcher để thực hiện. Nếu app của bạn đang ở foreground, nó có thể làm các tác vụ trực tiếp lên tiến trình của bạn.
Đây chính xác là những gì chúng ta đang cần, một trình bao bọc đơn giản cho tất cả các thực thi ở dười nền.
WorkManager có một số thành phần:
- WorkManager làm việc với các đối số, ràng buộc và enqueue nó.
- Work - chỉ có một phương thức để thực hiện doWork() được thực thi trên thread nền. Đólà nơi mà tất cả các nhiệm vụ nền của bạn nên được thực hiện. Cố gắng giữ nó đơn giản nhất có thể.
- WorkRequest - request để xác định các Worker nào được enqueue với đối số gì và ràng buộc thế nào. (ví dụ như internet, sạc...)
- WorkResult - Success, Failure, Retry
- Data - Tập hợp các key/value được truyền từ/đến Worker
Đầu tiên, chúng ta sẽ tạo một class mới extending Worker mà implement doWork()
```
public class LocationUploadWorker extends Worker {
    ...
     //Upload last passed location to the server
    public WorkerResult doWork() {
        ServerReport serverReport = new ServerReport(getInputData().getDouble(LOCATION_LONG, 0),
                getInputData().getDouble(LOCATION_LAT, 0), getInputData().getLong(LOCATION_TIME,
                0));
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef =
                database.getReference("WorkerReport v" + android.os.Build.VERSION.SDK_INT);
        myRef.push().setValue(serverReport);
        return WorkerResult.SUCCESS;
    }
}
```

Sau đó gọi WorkManager để thực hiện nó:

```
Constraints constraints = new Constraints.Builder().setRequiredNetworkType(NetworkType
            .CONNECTED).build();
Data inputData = new Data.Builder()
            .putDouble(LocationUploadWorker.LOCATION_LAT, location.getLatitude())
            .putDouble(LocationUploadWorker.LOCATION_LONG, location.getLongitude())
            .putLong(LocationUploadWorker.LOCATION_TIME, location.getTime())
            .build();
OneTimeWorkRequest uploadWork = new OneTimeWorkRequest.Builder(LocationUploadWorker.class)
            .setConstraints(constraints).setInputData(inputData).build();
WorkManager.getInstance().enqueue(uploadWork);
```

WorkManager sẽ đảm nhiệm phần còn lại. Nó sẽ chọn một schedule tốt nhất để enqueue công việc của bạn. Nó lưu tất cả đối số, work detail và update trạng thái các job. 

Bạn có thể subscribe sử dụng LiveData để lắng nghe các status:

```
WorkManager.getInstance().getStatusById(locationWork.getId()).observe(this,
        workStatus -> {
    if(workStatus!=null && workStatus.getState().isFinished()){
         ...
    }
});
```

Cấu trúc của WorkManager sẽ như sau:

![](https://images.viblo.asia/1e245f4d-624b-40d8-8709-ebdcc8bd1af9.png)

Bạn tạo ra một Work mới, chỉ định Work đó thực hiện công việc gì với Arguments và Constraint nào. WorkManager sẽ lưu các Work vào DB bằng cách sử dụng Room và ngay lập tức enqueue các Work. 

Nó chọn một schedule tối ưu nhất (Jobscheduler, JobDispatcher, Executor aka GreedyScheduler, AlarmManager) và gọi hàm doWork() để thực thi. 

Kết quả sẽ được publish trên LiveData và output có sẵn sử dụng các Argument.

Rất đơn giản đúng không? Tất nhiên là nó có thể làm được nhiều hơn nữa.

Lấy ví dụ, có một công việc định kỳ bạn có thể lên schedule :

```
Constraints constraints = new Constraints.Builder().setRequiredNetworkType
        (NetworkType.CONNECTED).build();
PeriodicWorkRequest locationWork = new PeriodicWorkRequest.Builder(LocationWork
        .class, 15, TimeUnit.MINUTES).addTag(LocationWork.TAG)
        .setConstraints(constraints).build();
WorkManager.getInstance().enqueue(locationWork);
```

Bạn cũng có thể ghép thành một chuỗi các công việc tuần tự:

```
WorkManager.getInstance(this)
        .beginWith(Work.from(LocationWork.class))
        .then(Work.from(LocationUploadWorker.class))
        .enqueue();
```

Hay trong `paralel`:

```
WorkManager.getInstance(this).enqueue(Work.from(LocationWork.class, 
        LocationUploadWorker.class));
```

Lưu ý: Bạn không thể tạo chuỗi các công việc định kỳ và các công việc chỉ làm 1 lần với nhau.

Ngoài ra, có rất nhiều thứ khác mà bạn có thể làm với WorkManager như: cancel Work, combine Worl, chain Work, merger các đối số từ work này sang work khác. Hãy thử đọc tài liệu, có rất nhiều ví dụ hay.

Bây giờ chúng ta sẽ thử làm một ví dụ thực: 

-Bài toán đưa ra là cần xây dựng một ứng dụng theo dõi vị trí của user sau mỗi 15 phút.

Trước tiên chúng ta sẽ tạo một job để get giá trị location. ví dụ chúng to dùng Latch để truy vấn GPS location.

```
public class LocationWork extends Worker {

    ...

    public WorkerResult doWork() {
        Log.d(TAG, "doWork: Started to work");
        handlerThread = new HandlerThread("MyHandlerThread");
        handlerThread.start();
        looper = handlerThread.getLooper();
        locationTracker = new LocationTracker(getApplicationContext(), looper);
        locationTracker.start();
        try {
            locationWait = new CountDownLatch(1);
            locationWait.await();
            Log.d(TAG, "doWork: Countdown released");
        } catch (InterruptedException e) {
            Log.d(TAG, "doWork: CountdownLatch interrupted");
            e.printStackTrace();
        }

        cleanUp();
        return WorkerResult.SUCCESS;
    }
 

}
```

Và lên lịch để thực thi:

```
PeriodicWorkRequest locationWork = new PeriodicWorkRequest.Builder(
    LocationWork.class, 15, TimeUnit.MINUTES).addTag(LocationWork.TAG).build();
WorkManager.getInstance().enqueue(locationWork);
```

Khi đã nhận được vị trí, chúng ta sẽ release Latch và clear các bản ghi:

```
public class LocationWork extends Worker {

    ...
  
    static void reportFinished() {
        if (locationWait != null) {
            Log.d(TAG, "doWork: locationWait down by one");
            locationWait.countDown();
        }
    }
  
    private void cleanUp() {
        Log.d(TAG, "Work is done");
        locationTracker.stop();
        handlerThread.quit();
        looper.quit();
        handlerThread.quit();
    }

}
```

Khi LocationTracker nhận được dữ liệu, chúng ta phải tải nó lên server, việc này cũng cần phải lên một schedule:

```
//location obtained, need to send it to server
    private void broadcastLocation(Location location) {
        //release latch
        reportFinished();
        //We need to sure that device have internet live
        Constraints constraints = new Constraints.Builder().setRequiredNetworkType
                (NetworkType.CONNECTED).build();
        
        //Parse our location to Data to use it as input for our worker
        Data inputData = new Data.Builder()
                .putDouble(LocationUploadWorker.LOCATION_LAT, location.getLatitude())
                .putDouble(LocationUploadWorker.LOCATION_LONG, location.getLongitude())
                .putLong(LocationUploadWorker.LOCATION_TIME, location.getTime())
                .build();
        //worker itself
        OneTimeWorkRequest uploadWork = new OneTimeWorkRequest.Builder
                (LocationUploadWorker.class).setConstraints(constraints).setInputData
                (inputData).build();
        //Schedule it 
        WorkManager.getInstance().enqueue(uploadWork);
}
```

```
public class LocationUploadWorker extends Worker {
    //...
  
    public WorkerResult doWork() {
      //get Data out from input
        double longitude = getInputData().getDouble(LOCATION_LONG, 0);
        double latitude = getInputData().getDouble(LOCATION_LAT, 0);
        long time = getInputData().getLong(LOCATION_TIME, 0);
        String osVersion = "WorkerReport v" + Build.VERSION.SDK_INT;
        //construct our report for server format
        ServerReport serverReport = new ServerReport(longitude, latitude, time);
     
        //Report it to firebise server
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference(osVersion);
        myRef.push().setValue(serverReport);
      
        return WorkerResult.SUCCESS;
    }
}
```

Nhìn rất đơn giản và thực sự là nó đơn giản. Không có các JobSchedulers/JobDispatcher/Greed Executors phức tạp, không có boilerplate code.
Bạn tạo một work, lên lịch cho nó và hoàn thành nó. Đơn giản như thế

![](https://images.viblo.asia/adf9fc33-53d7-492c-b24f-0de34fd374dd.gif)

### Tổng kết:

Chạy ở background ngày càng phức tạp hơn theo ý muốn tiết kiệm pin cho user trong các version Android sau này. Nhưng cũng rất may là chúng ta có WorkManager được tạo ra giúp việc xử lý nền trở nên đơn giản và tự nhiên hơn.

Happy coding!

[Nguồn](https://medium.com)