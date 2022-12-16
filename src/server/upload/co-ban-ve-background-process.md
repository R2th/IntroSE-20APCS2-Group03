# Guide to background processing
## Giới thiệu chung về Background process:
Tất cả các ứng dụng android đều có 1 thread chính là UI thread. Thread này sẽ chịu trách nhiệm trong việc tính toán, vẽ giao diện, tương tác với người dùng và xử lý các sự kiện trong vòng đời của các thành phần trong ứng dụng. Nếu UI thread có quá nhiều công việc cần xử lý sẽ gây ra hiện tượng chậm, treo ứng dụng gây ra sự khó chịu cho người dùng. Do vậy tất cả các công việc mất nhiều thời gian để hoàn thành nên được tách ra thực hiện ở 1 thread riêng. Nói chung các công việc cần nhiều hơn một vài mili giây nên được tách ra.<br> Khi tách công việc ra các luồng riêng, bạn nên cân nhắc các yếu tố sau đây để chọn đối tượng thực hiện công việc của bạn sao cho hiệu quả:
1. **Công việc có thể trì hoãn được không, hoặc nó có cần xảy ra ngay lập tức?** Ví dụ như bạn cần lấy dự liệu từ mạng để hiện thị khi người dùng click vào button, công việc đó cần được hoàn thành ngay lập tức. Tuy nhiên, nếu bạn muộn tải log nên server thì công việc này chúng ta có thể trì hoãn mà không ảnh hưởng đến người dùng.
2. **Khi nào công việc được bắt đầu  thực hiện, hệ điều hành có cần chú ý giữ tiến trình hoạt động?** Ví dụ như decode và hiện thị ảnh bitmap chỉ cần thiết khi ứng dụng vẫn còn trên foreground và tiến trình vẫn còn tồn tại. Tuy nhiên, trong ứng dụng phát nhạc bài hát vẫn được phát dù ứng dụng có còn được duy trì trên foreground.
3. **Đó có phải là công việc được bắt đầu để phản hồi lại các sự kiện từ hệ thống?** Các sự kiện của hệ thống có thể là: trạng thái của kết nối mạng thay đổi, tình trạng pin, trình trạng bộ nhớ vv... Ví dụ như Bạn sẽ trao đổi dữ liệu với server khi người dùng tắt chế độ máy bay trên thiết bị. Trong trường hợp này nếu tiến trình của ứng dụng đã dead, bạn sẽ cần khởi tạo lại khi thiết bị trở lại trạng thái online.
<br>Sau khi xác định được các yếu tố trên ta có bảng: 
![](https://images.viblo.asia/d8c2f995-74ce-4499-93a3-42e646b01c25.PNG)
<br><br>
## ThreadPools
1. ThreadPools là công cụ làm việc hiệu quả khi bạn có công việc cần được hoàn thành chỉ khi ứng dụng trên Foreground. 
2. ThreadPools cung cấp một lượng các background thread giúp bạn lưu trữ và xủ lý các công việc.  
3. Trong trường hợp bạn sử dụng ThreadPools và cần kiểm tra các sự kiện xảy ra của hệ thống bạn có thể sử dụng BroadcastReceiver để kiểm tra.
### Cơ bản về ThreadPools
* Bên trong ThreadPool các nhiệm vụ được chèn vào một Blocking Queue (hàng đợi) nơi mà các Thread sẽ lấy chúng ra và thực thi lần lượt. Mỗi khi có 1 task mới được thêm vào Queue, sau đó chỉ có 1 thread nhàn rỗi sẽ vào queue và lấy chúng ra, các thread nhàn rỗi còn lại phải chờ sau khi thread trước đó lấy nhiệm vụ ra thành công.
* Để làm việc với ThreadPools chúng ta sử dụng ThreadPoolExecutor. ThreadPoolExecutor hỗ trợ việc thêm task vào Queue, hủy task, và thực hiện các tas có mức độ ưu tiên cao hơn. Bên cạnh đó ThreadPoolExecutor giảm được chi phí do tạo ra quá nhiều thread.
## Foreground services
1. Với các công việc cần được thực  hiện ngay và người dùng cần biết được những gì bạn đang làm thậm chí cả khi người dùng không tương tác trực tiếp với ứng dụng bạn nên sử dụng foreground service 
2. Khi bạn sử dụng foreground service hệ thống sẽ cho rằng bạn đang làm công việc quan trọng và tiến trình thực hiện công việc này nên được duy trì. 
3. Foreground service cần phải show thông báo trên status bar với mức độ ưu tiên từ PRIORITY_LOW trở lên để chắc chắn rằng người dùng biết được những gì ứng dụng của bạn đang thực hiện.
### Cách sử dụng foreground service: 
1. Để tạo forefround service, chúng ta gọi phương thức startForeground().
Trong phương thức này có 2 tham số.
* Tham số thứ nhất: ID của Notification được show trên status bar. ID này cho bạn định nghĩa những phải thỏa mãn khác 0. 
* Tham số thứ hai: Notification được hiện thị cho foreground service.
```
Intent notificationIntent = new Intent(this, ExampleActivity.class);
PendingIntent pendingIntent =
        PendingIntent.getActivity(this, 0, notificationIntent, 0);

Notification notification =
          new Notification.Builder(this, CHANNEL_DEFAULT_IMPORTANCE)
    .setContentTitle(getText(R.string.notification_title))
    .setContentText(getText(R.string.notification_message))
    .setSmallIcon(R.drawable.icon)
    .setContentIntent(pendingIntent)
    .setTicker(getText(R.string.ticker_text))
    .build();

startForeground(ONGOING_NOTIFICATION_ID, notification);
```
2. Để hủy service khỏi foreground sử dụng phương thức stopForeground(). Nếu bạn muốn xóa notification trên status bar truyền vào tham số "true" và ngược lại. Khi bạn muốn dừng service sử dụng phương thức stopSelf().
## WorkManager
1. Bạn có thể sử dụng WorkManager cho cả cho cả các công việc cần được hoàn thành ngay và các công việc có thể trì hoãn.
2. WorkManager là thư viên Android thích hợp cho xử lý các công việc cần được trì hoãn vì đợi chờ cho các sự kiện thích hợp. 
3. WorkManager sử dụng nền tảng JobScheduler bất cứ khi nào có thể để tối ưu hóa pin thiết bị.
4. WorkManager được thiết kế hướng cho các công việc yêu cầu chắc chắn được thực hiện dù app của bạn có đang tồn tại hay không như upload dữ liệu lên server. Còn các công việc sẽ bị hủy khi ứng dụng của bạn không còn hoạt động chúng ta nên suwtr dụng ThreadPools.
5. Trong khi ứng dụng của bạn đang chạy cùn thời điểm với WorkManager thực hiện công việc thì công việc này sẽ được tách ra 1 luồng mới. TRong trường hợp còn lại, WorkManager sẽ sử dụng 1 trong các đối tượng: JobScheduler, Firebase JobDispatcher, AlarmManager để thực hiện công việc của bạn. Bạn sẽ không cần quan tâm  việc chọn sử dụng đối tượng nào để hoàn thành công việc của mình.
### Cơ bản về cách sử dụng WorkManager:
Giả sử xây dựng ứng dụng lưu trữ ảnh và cần nén ảnh định kỳ. Chúng ta sử dụng WorkManager để thực hiện việc nén ảnh. Trong trường họp này bạn không quan tâm khi nào ảnh sẽ được nén.
<br> Sau đây là các bước xây dựng WorkManager chung:
1. Xây dựng sub class của Worker class và override phương thức doWork() để thực hiện công việc của bạn, trong trường họp này là nén ảnh:
```
public class CompressWorker extends Worker {
    @Override
    public Worker.Result doWork() {

        // Do the work here--in this case, compress the stored images.
        // In this example no parameters are passed; the task is
        // assumed to be "compress the whole library."
        myCompress();

        // Indicate success or failure with your return value:
        return Result.SUCCESS;

        // (Returning RETRY tells WorkManager to try this task again
        // later; FAILURE says not to try again.)
    }
}
```
2. Tiếp theo tạo object của OneTimeWorkRequest dựa vào Worker, sau đó lưu trữ công việc vào WorkManager.
```
OneTimeWorkRequest compressionWork =
        new OneTimeWorkRequest.Builder(CompressWorker.class)
    .build();
WorkManager.getInstance().enqueue(compressionWork);
```
WorkManager sẽ chọn thời điểm phù hợp để thực hiện công việc. Trong hầu hết các trường hợp, nếu bạn không chỉ ra sự ràng buộc khi nào thực hiện công việc thì WorkManager sẽ thực hiện công  việc ngay lập tức. 

3. Khi bạn có nhu cầu muốn chỉ định khi nào thục hiện công việc của mình, bạn cần sử dụng object OneTimeWorkRequest.Builder để tạo ra OneTimeWorkRequest. Trong trường hợp này việc nén ảnh được chỉ định xảy ra khi thiết bị đang nghỉ và đang sạc pin.
```
// Create a Constraints that defines when the task should run
Constraints myConstraints = new Constraints.Builder()
    .setRequiresDeviceIdle(true)
    .setRequiresCharging(true)
    // Many other constraints are available, see the
    // Constraints.Builder reference
     .build();

// ...then create a OneTimeWorkRequest that uses those constraints
OneTimeWorkRequest compressionWork =
                new OneTimeWorkRequest.Builder(CompressWorker.class)
     .setConstraints(myConstraints)
     .build();
```

4. Hủy công việc: 
Khi bạn muốn hủy công việc sau khi bạn đã cho nó vào hàng đợi công việc của WorkManager, bạn cần sử dụng đến ID của công việc đó qua đối tượng WorkRequest.
```
UUID compressionWorkId = compressionWork.getId();
WorkManager.getInstance().cancelWorkById(compressionWorkId);
```
Tuy nhiên bạn cũng có thể gặp phải trường hợp hủy công việc đã được hoàn thành.
<br>
Tham khảo: https://developer.android.com/guide/background/