# Mở đầu.
Service là một trong 4 component lớn của Android. Nó là một thành phần hết sức quan trọng, là một Android Developer thì bắt buộc bạn phải nắm rõ và hiểu sâu về Service. Như hình vẽ bên dưới các bạn có thể thấy một robot chiến binh Android có thanh kiếm là tượng trưng cho Activity,  có hai chiếc ăng ten có thể xem là Broadcast Receiver, Intent là cánh tay, View là đôi chân. Content Provider giống như một nơi cung cấp nhiên liệu cho robot chẳng hạn. Một thành phần cũng nằm trong thân robot không thể nhìn thấy nữa là Service, là một chiếc quạt gió chạy liên tục, khi robot chiến đấu hay kể cả khi ngủ nghỉ thì chiếc quạt này vẫn chạy :) 
![](https://images.viblo.asia/2370c6a3-6499-44f1-8701-be440160b6a8.jpg)

Qua bài viết này mình xin trình bày một cách tổng quan về Service: một số khái niệm cơ bản về Service, rồi phân loại Service cũng như xem Service hoạt động như thế nào nhé. Chúng ta bắt đầu nào !
# 1. Khái niệm Service.
Một Service là một thành phần (component) có thể thực hiện các hoạt động lâu dài trong background và nó không cung cấp một giao diện người dùng. Một thành phần khác của ứng dụng có thể start nó, và nó tiếp tục chạy trong background ngay cả khi người dùng chuyển sang ứng dụng khác. Ngoài ra một thành phần có thể liên kết (bind) với một Service để tương tác với Service đó, thậm chí là thực hiện truyền thông liên tiến trình IPC (interprocess communication - IPC bạn có thể hiểu là một hoạt động chia sẽ dữ liệu qua nhiều tiến trình, thông thường sử dụng giao thức truyền thông và nó phải có Client và Server). Ví dụ: một Service có thể thực hiện các giao dịch mạng, chơi nhạc, ra vào file I/O hoặc tương tác với một content provider, tất cả đều từ background.
# 2. Phân loại Service.
Theo trang chủ developer.android.com thì Service được chia làm 3 loại khác nhau:

***2.1 Foreground Service.***

Một Foreground Service thực hiện một số thao tác mà người dùng chú ý, có thể thấy rõ ràng. Ví dụ một ứng dụng nghe nhạc có thể chơi một bản nhạc và control nó bằng Foreground Service. Một điều bắt buộc là Foreground Service phải hiện thị một Notification. Foreground Service sẽ tiếp tục chạy ngay cả khi người dùng không tương tác với ứng dụng.

***2.2 Background Service.***

Một Background Service sẽ thực hiện các hoạt động mà không được người dùng chú ý trực tiếp. Ví dụ một ứng dụng sử dụng một service để thu gom bộ nhớ chẳng hạn thì service là một Background Service, hoạt động mà người dùng không cần thiết phải để ý.

***2.3 Bound Service.***

Một service được gọi là Bound khi một thành phần của ứng dụng ràng buộc với nó bởi lời gọi bindService().  Một Bound Service cung cấp một giao diện Client - Server cho phép các thành phần tương tác với nó: gửi yêu cầu, nhận kết quả và thậm chí là IPC. Một Bound Service chỉ chạy miễn là có một thành phần ràng buộc với nó. Có thể có nhiều thành phần ràng buộc với Bound Service cùng lúc, nhưng khi tất cả tháo bỏ ràng buộc (unbound) thì nó sẽ Destroy.
Trước đây Service thường được chia là Started Service và Bound Service.
![](https://images.viblo.asia/a9f352b6-2733-405d-8b08-2bbf6fb6cf9c.png)

Một Started Service hay là Unbound Service là service được khởi động bằng phương thức startService() từ thành phần khác. Và nó sẽ tiếp tục chạy trong background kể cả khi thành phần khởi tạo nó bị phá hủy. Đây cũng là xem là một Background Service theo cách chia trên.
# 3. Độ ưu tiên các loại Service.
Hệ thống Android bắt buộc phải dừng một service khi bộ nhớ ít và phải khôi phục tài nguyên hệ thống cho Activity đang được sử dụng. Nếu Service được ràng buộc với một Activity đang sử dụng, nó ít khả năng bị giết; nếu Service được khai báo và chạy ở chế độ *Foreground* nó cũng khó biết giết. Nếu Service là *Started* và chạy lâu dài, hệ thống sẽ làm giảm vị trí ưu tiên của nó. Vì phụ thuộc vào process (bạn có thể tìm hiểu thêm), thì các loại service sẽ được xếp theo độ ưu tiên sau: *Bound Service* khó bị kill nhất, tiếp theo là *Foreground Service*và *Background Service.*

***Bound > Foreground > Background***

Vậy nếu ở *Background Service* thì Service dễ bị kill nhất nên ta phải xử lý một cách thích hợp đúng không nào. Tùy thuộc vào giá trị trả về trong *onStartCommand()* mà Service có thể được khởi động lại. Vậy có bao nhiêu giá trị trả về trong onStartCommand()?
# 4. Các giá trị trả về trong onStartCommand().
Khi Service bị hệ thống kill do thiếu bộ nhớ chẳng hạn, thì dưới đây là 3 giá trị trả về thường dùng trong onStartCommand() để thông báo với hệ thống. Tùy vào bài toán mà bạn sử dụng cho thích hợp.

***4.1 START_NOT_STICKY.***

Nếu hệ thống kill service khi giá trị này được trả về thì service này không được khởi động lại trừ khi có một Intent đang được chờ ở onStartCommand(). Đây là lựa chọn an toàn nhất để tránh chạy Service khi không cần thiết và khi ứng dụng có thể khởi động lại một cách đơn giản các công việc chưa hoàn thành.

***4.2 START_STICKY.***

Khi giá trị này được trả về trong onStartCommand, nếu service bị hệ thống kill. Nếu onStartCommand không có một intent nào chờ nó nữa thì Service sẽ được hệ thống khởi động lại với một Intent null.

***4.3 START_REDELEVER_INTENT***

Nếu Service bị kill thì nó sẽ được khởi động lại với một Intent là Intent cuối cùng mà Service được nhận. Điều này thích hợp với các service đang thực hiện công việc muốn tiếp tục ngay tức thì như download fie chẳng hạn.
Ngoài 3 giá trị trên thì trong onStartCommand() còn có thêm 2 giá trị trả về nữa là.

***4.4 START_STICKY_COMPATIBILITY***

Giá trị này cũng giống như START_STICKY nhưng nó không chắc chắn, đảm bảo khởi động lại service.

***4.5 DEFAULT.***
Là một sự lựa chọn giữa *START_STICKY_COMPATIBILITY* hoặc *START_STICKY*
```java
public @StartResult int onStartCommand(Intent intent, @StartArgFlags int flags, int startId) {
                    onStart(intent, startId);
                    return mStartCompatibility ? START_STICKY_COMPATIBILITY : START_STICKY;
 }
```
# 5. Có nên so sánh Service với một Thread hay không?
Một *Service* chỉ đơn giản là một thành phần có thể chạy trong background ngay cả khi người dùng không tương tác với ứng dụng. Đây là mục đích chính để ta tạo nên *Service*.
Còn nếu bạn muốn thực hiện một công việc ngoài Main Thread khi có người dùng tương tác với ứng dụng thì bạn nên tạo ra một *Thread* mới. Bạn nên nhớ rằng khi bạn tạo ra một Service thì mặc định Service chạy trên Main Thread, vì thế ta có thể tạo ra Thread trong Service để thực hiện công việc riêng, tăng hiệu năng cho ứng dụng, tránh block Main Thread. Qua đó ta có thể thấy *Service* và *Thread* là hai khái niệm khác biệt, như vậy ta không nên đem so sánh chúng với nhau.
# 6. Các phương thức quan trọng trong vòng đời Service.
Khi bạn tạo một service bạn phải kế thừa lớp Service của Android cung cấp. Khi bạn thực thi bạn phải override một vài phương thức quan trọng xử lý trong vòng đời của Service và cung cấp một cơ chế cho phép các thành phần liên kết với Service nếu thích hợp. Sau đây là một số phương thức quan trọng đó:

***6.1 onStartCommand().***

Hệ thống gọi phương thức này khi một thành phần khác (Activity chẳng hạn) gọi đến Service bằng câu lệnh startService(). Khi phương thức này được thực hiện, dịch vụ được khởi động và có thể chạy trong background vô thời hạn. Khi công việc hoàn thành bạn nên stop bằng cách gọi stopService() từ một thành phần khác, hoặc cho chính Service gọi stopSelf(). Nếu bạn chỉ muốn ràng buộc buộc với Service thì không nên sử dụng onStartCommand().

***6.2 onBind().***

Hệ thống sẽ gọi phương thức này khi một thành phần khác gọi đến Service bằng câu lệnh bindService(). Khi bạn triển khai phương thức này bạn phải cung cấp một giao diện để client có thể giao tiếp với Service thông qua một đối tượng IBinder do Service trả về. Khi bạn kế thừa từ lớp Service của Android bạn phải luôn luôn override phương thức này, nhưng nếu bạn không muốn ràng buộc (bind) bạn có thể return null.

***6.3 onCreate().***

Hệ thống gọi phương thức này khi Service được khởi tạo, và nó chỉ chạy một lần trước khi onStartCommand() hoặc onBind() được gọi. Nếu Service đã chạy thì phương thức này không được gọi lại lần nào nữa.

***6.4 onDestroy().***

Hệ thống gọi phương thức này khi Service không được sử dụng nữa và đang bị hủy (destroy). Bạn cũng nên giải phóng tài nguyên như các Threads, Listeners hay Receivers ở đây. Đây là phương thức cuối cùng được gọi của Service.
# 7. Khi Started và Bound Service chạy đồng thời.
Trong bài viết này mình sẽ không trình bày cách tạo một Started Service hay Bound Service. Như chúng ta đã biết StartedService được start bằng lời gọi startService() từ một thành phần nào đó và nó sẽ dừng lại khi nó gọi stopSelf() hoặc một thành phần gọi stopService().
Còn Bound Service được khởi chạy khi một thành phần gọi bindService() và nó sẽ dừng lại khi tất các các thành phần ràng buộc (bind) với nó hủy liên kết (unbind). Vậy nếu một service đồng thời có cả Started Service và Bound Service thì nó sẻ hủy khi nào. Khi Started Service gọi stopSelf() hoặc được gọi stopService() thì service vẫn chưa vào onDestroy(). Cần một điều kiện nữa để nó bị bủy nếu các thành phần ràng buộc với BoundService hủy hết liên kết. Ngược lại nếu tất cả các thành  phần ràng buộc với Bound Service unbind thì Service cũng chưa được hủy cho đến khi Started Service tự gọi stopSelf() hoặc được gọi stopService(). Dưới đây là một vòng đời của Bound Service khi nó chạy cùng với một Started Service, bạn có thể tìm hiểu thêm nhé.
![](https://images.viblo.asia/aac6127f-1a87-420f-aa1a-889d0ddcb0d8.png)

Điều kiện cần là cả hai loại service đều được hủy thì Service mới được hủy.
# 8. Running một Foreground Service.
*Foreground Service* phải được thể hiện bởi một Notification với độ ưu tiên *PRIORITYLOW* trở lên, giúp đảm bảo người dùng vẫn biết ứng dụng của mình đang làm gì ở trong service. Khi *Foreground Service* đang chạy thì ta không thể hủy bỏ Notification được. Trừ khi Service bị stopped hoặc được loại bỏ foreground. Để yêu cầu dịch vụ của bạn chạy ở foreground, ta gọi *startForeground()*. Phương thức này có hai tham số là *ID* nhận dạng Notification và một *Notification*.
```java
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
# 9. Giới thiệu Intent Service.
*Intent Service* là một lớp con của Service, nó là một lớp cung cấp một cấu trúc đơn giản để thực hiện một công việc trên một Thread khác ở background. Điều này cho phép làm một công việc lâu dài mà không ảnh hưởng đến phản hồi của giao diện người dùng. Nó không ảnh hưởng đến các sự kiện từ giao diện người dùng như đối vs AsyncTask chẳng hạn. Sau đây là các hạn chế của một *Intent Service*:
- Nó không trực tiếp tương tác được với giao diện người dùng. Muốn đưa kết quả lên giao diện ta phải gửi nó đến một Activity.
- *Intent Service* yêu cầu công việc chạy tuần tự. Nếu có một yêu cầu mới mà *Intent Service* chưa hoàn thành công việc trước  đó thì công việc mới này chưa được bắt đầu mà phải đợi cho công việc trước đó hoàn thành đã.
- Một công việc chạy trong *Intent Service* không thể bị gián đoạn.

Nhưng trong hầu hết các trường hợp, *Intent Service* là lựa chọn tốt cho khác thao tác đơn giản trong background.
Để sử dụng một *Intent Service* bạn phải kế thừa nó.
```java
public class RSSPullService extends IntentService {
    @Override
    protected void onHandleIntent(Intent workIntent) {
        // Gets data from the incoming Intent
        String dataString = workIntent.getDataString();
        ...
        // Do work here, based on the contents of dataString
        ...
    }
}
```
# 10. Khai báo trong Mainifest
Bạn muốn dùng một Service bất kì thì bắt buộc bạn phải khai báo nó trong Mainifest như Activity và các thành phần khác.
```java
<manifest ... >
  ...
  <application ... >
      <service android:name=".ExampleService" />
      ...
  </application>
</manifest>
```
Nếu service có thể cho ứng dụng khác ngoài ứng dụng chứa nó sử dụng thì ta cần khai báo thêm thuộc tính *android: exported = "true"* ( mặc định là false).
# 11. Câu hỏi.
***Câu hỏi 1.***

Nếu bạn start một Service nhiều lần thì các phương thức *onCreate()*, *onStartCommand()* và *onDestroy()* sẽ được gọi như thế nào?
```java
public class FirstService extends Service {
    public static final String TAG = FirstService.class.getSimpleName();

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate: FistService");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "onStartCommand: FistService");
        //TODO
        stopSelf();
        return super.onStartCommand(intent, flags, startId);
    }
    
    ...

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: FirstService");
    }
}
```
```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent firstIntent = new Intent(this, FirstService.class);
        startService(firstIntent);

        Intent secondIntent = new Intent(this, FirstService.class);
        startService(secondIntent);
    }
}
```
***Câu hỏi 2.***

Vẫn câu hỏi như trên nhưng với 2 hoặc nhiều service khác nhau được start xem như đồng thời.
```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent firstIntent = new Intent(this, FirstService.class);
        startService(firstIntent);

        Intent secondIntent = new Intent(this, SecondService.class);
        startService(secondIntent);
    }
}
```
Các bạn hãy tìm ra câu trả lời cho chính mình nhé ^^

***=> "There can only be one instance of a Service at a time"***
# 12.Tổng kết.
Qua bài viết này mình đã giới thiệu một cách tổng quan về Service, một thành phần rất quan trọng trong Android. Service là một chủ đề rất rộng và do thời gian cũng như lượng thông tin trong một bài viết không cho phép nên chắc chắn sẽ còn nhiều thiếu sót. Trong lần tới mình sẽ trình bày thêm những phần thực hành như làm thế nào để tạo một Background Service, Bound Service hay Foreground Service, ... một cách chi tiết để có thể phần nào giúp đỡ các bạn, đặc biệt là những người mới học Android. Cám ơn rất nhiều vì đã đọc bài viết  :)

Tài liệu tham khảo:

1.https://developer.android.com

2.https://medium.com