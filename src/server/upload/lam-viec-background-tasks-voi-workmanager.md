Tại Google I/O 2018 Google cho ra mắt một tính năng thực sự thú vị cho phép các nhà phát triển thực hiện các tác vụ background mà nếu theo truyền thống thì cần kiến thức chi tiết về các API level khác nhau và các thư viện tác vụ nền có sẵn cho các  API level đó.
WorkManager cung cấp chức năng mà bạn sẽ nhận được từ các API khác như JobScheduler, FirebaseJobDispatcher, AlarmManager và Services mà không cần phải nghiên cứu cái nào khả dụng cho thiết bị hoặc API level của bạn.

Có thể bạn đã thấy một vài phiên bản Android đến và đi cùng với các cách khác nhau để thực hiện tác vụ nền. Các APIs đó luôn luôn khó theo kịp khi mà Google thêm tính năng mới và tính năng cũ không còn được chấp nhận, tài liệu cũng không được rõ ràng về cách cách làm đúng một tác vụ trên background thread.

Hãy xem xét thử việc chạy một tác vụ sử dụng một JobScheduler. Hệ thống sẽ khởi động JobService của bạn khi thời gian đến, nhưng SDK tối thiểu hỗ trợ JobScheduler là phiên bản 21 nhưng cũng không ổn định và có lỗi, đến phiên bản API 23 mới thực sự có thể sử dụng. Bạn có thể đặt target devices từ SDK 21 vì vậy bạn cũng cần phải sử dụng JobDispatcher cho các thiết bị sử dụng ứng dụng ở phiên bản API đó. Vì JobScheduler có thể không khả dụng với bạn, bạn có thể sử dụng FirebaseJobDispatcher nhưng nó lại yêu cầu play services điều đó có nghĩa rằng bạn sẽ loại bỏ rất nhiều thiết bị không cài đặt Google Services. Tùy thuộc những gì bạn đang làm, bạn có thể sử dụng AlarmManager nhưng không phải lúc nào cũng là lựa chọn tốt nhất. Giải pháp cuối cùng có thể bạn sử dụng đến IntentService nhưng cũng không thực sự là giải pháp tốt.

Vậy bây giờ chúng ta quay lại nơi chúng ta bắt đầu. Trong quá khứ việc chọn một background scheduler thực sự là công việc khó đó là lý do tại sao WorkManager mới ra mắt lại thực sự tuyệt vời. Nó sẽ chọn cách thích hợp để chạy tác vụ của bạn dựa trên trạng thái ứng dụng và phiên bản API.

### WorkManager Components
WorkManager - nhận các tác vụ với các tham số  sau đó xếp công việc đó vào hàng đợi.
Worker - implements doWork() được thực thi trên background thread.
WorkRequest - đại diện cho một tác vụ. No sẽ cho bạn biết Worker nào được enqueued cũng như những ràng buộc mà nó cần đáp ứng để nó chạy. WorkRequest là một abstract class mà bạn sẽ sử dụng với OneTimeWorkRequest hoặc PeriodicWorkRequest.
WorkStatus - cung cấp dữ liệu cho mỗi đối tượng WorkRequest.

Hãy bắt tay vào làm một ví dụ đặt tất cả những thứ này lại với nhau.

Tạo một class extends Worker và implement method doWork()

```
class YourWorker: Worker {
  override fun WorkerResult doWork() {
    //do the work you want done on the background in here
     
    return WorkerResult.SUCCESS
  }
}
```

Sau khi thiết lập xong công việc của bạn. Bạn sẽ gọi WorkerManager để xếp hàng cho công việc bạn muốn thực hiện. Bạn có thể chỉ định các ràng buộc sẽ quyết định dưới điều kiện nào thì công việc của bạn được thực hiện.

```
val work: OneTimeWorkRequest  = OneTimeWorkRequest.Builder(YourWorker::class.java).build()
WorkManager.getInstance().enqueue(work)
```

Bởi vì chúng ta sử dụng OneTimeWorkRequest và chúng ta không có ràng buộc nào được chỉ định nên WorkManager sẽ chạy công việc ngay lập tức.
Nếu bạn muốn chúng ta có thẻ giới hạn WorkManager để chạy request của chúng ta một lần chỉ khi mạng được kết nối và thiết bị đang được sạc chẳng hạn.

```
val constraints: Constraints = Constraints.Builder()
   .setRequiredNetworkType(NetworkType.CONNECTED)
   .setRequiresCharging(true)
   .build()
```

Và chúng ta setup một work request chấp nhận constrains
```
val work: OneTimeWorkRequest = OneTimeWorkRequest.Builder(SomeWorker::class.java).setConstraints(constraints).build()
```

Nếu bạn muốn tác vụ được thực hiện nhiều hơn một lần, bạn sử dụng PeriodicWorkRequest đã được nhắc ở trên. Cách cài đặt cũng tương tự nhưng bạn cần chỉ định khoảng thời gian interval mà bạn muốn tác vụ chạy.

```
val recurringWork: PeriodicWorkRequest = PeriodicWorkRequest.Builder(YourWorker::class.java, 3, TimeUnit.HOURS).build()
WorkManager.getInstance().enqueue(recurringWork)
```

Điều tuyệt vời về các API này đó chính là bạn không cần phải viết bất cứ logic cho các devices khác nhau, không cần lo lắng về việc lựa chọn API tốt nhất để thực hiện tác vụ. WorkManager đã làm tất cả điều đó cho bạn.

Nếu bạn muốn chạy nhiều tác vụ trên background thread. bạn có thể nối chuỗi chúng với nhau bằng cách tạo một dãy các OneTimeWorkRequests với WorkManager

```
WorkManager.getInstance().beginWith(firstWork)
  .then(secondWork)
  .then(thirdWork)
  .enqueue()
```

Nếu bất kỳ điểm bào trong chuỗi công việc bị thất bại thì toàn bộ chuỗi sẽ ngừng lại.

Tham khảo về [WorkManager](https://developer.android.com/reference/androidx/work/WorkManager)
Bài dịch từ nguồn [Doing work with Android's new WorkManager](https://www.bignerdranch.com/blog/doing-work-with-androids-new-work-manager/)