Vừa rồi thì mình có nhận task làm một service chạy ngầm trong app (tức là khi tắt app đi thì nó vẫn chạy vi vu ấy). Thật tình là trước giờ, cũng biết, cũng có làm ví dụ về service đó nhưng  công việc thì chủ yếu là thao tác với activity, fragment, xử lý api,...nên phần này cũng thấy hơi khoai (vì trước giờ mình chưa làm bao giờ, tự cảm thấy hổ thẹn với anh em làm android, task này với mấy anh em làm phát một chứ mấy :pensive:). 
Cũng may, sau ít thời gian tìm hiểu thì mình cũng làm được và chạy ổn :sweat_smile: (phù phù)

### Giới thiệu nhẹ tý
Việc gì cũng phải có phần mở đầu (phần dạo đầu ngon nghẻ thì mới dễ lên chứ :sweat_smile:sweat_smile:), nói vậy thôi chứ phần này chủ yếu dành cho anh em nào chưa làm nhiều với service như mình nắm được mấy cái kiến thức basic về service.
##### Service là gì?
Service là một trong bốn component của android. Nghe tên service thì hẳn anh em cũng hình dung được chức năng nó là gì rồi, đó là thực hiện các thao tác ngầm dưới hệ thống mà người dùng không cần tương tác với nó. Ví dụ như service download một file trên internet, lúc này việc download file sẽ diễn ra dưới hệ thống, sẽ thông báo với người dùng khi nào download xong, người dùng không cần tương tác gì cả. Hoặc như service play nhạc, sau khi chạy thì dù tắt app đi thì nhạc vẫn play như bình thường.

##### Các loại service
Trong android, thì chúng ta khá khó phân là có bao nhiêu service, tài liệu về service trên trang chủ https://developer.android.com/reference/android/app/Service cũng khá là chung chung. Nhưng nhìn chung lại chúng ta có thể hiểu là có 2 loại service trong android (vì 2 cái này hay được dùng nhất) là StartService và BindService (Một số anh em có thể nói là còn loại service nữa là IntentService, nhưng bản chất của IntentService cũng là extends từ Service mà ra, sẽ tự hủy khi hoàn thành tác vụ được giao)
* StartService: khởi tạo và chạy 1 service, vòng đời sẽ bắt đầu từ onCreate()  --> onStartCommand() { xử lý logic ở đây}  và gọi onDestroy khi được kết thúc bởi client hoặc tự bản thân kết thúc
* BindService: khởi tạo và chạy 1 service, vòng đời sẽ bắt đầu từ onCreate()  --> onBind() { xử lý logic ở đây}  và gọi onUnbind khi được gọi unbind từ client, gọi destroy khi tất cả ràng buộc từ client với nó đã bị hủy
###### Tạo service trong android
Để tạo một service trong android thì anh em cần extends từ class Service và implement một số hàm cần thiết
` public class MyService extends Service {}`
và khai báo nó trong Manifest
```xml
    <application...>
        <service android:name=".MyService" />
    </application>
```
### Trở lại vấn đề
Màn dạo đâu bao nhiêu đó xem như đã đủ lên rồi :sweat_smile:, chúng ta cùng trở lại vấn đề là xây dựng một service chạy ngầm trong android, ngay cả khi người dùng kill app thì vẫn hoạt động bình thường.
Như đã nói ở trên để tạo một service thì chúng ta cần tạo một class và extends từ class Service của hệ thống, ở đây mình xây dựng một class gọi là LogService có nhiệm vụ là log ra một message mỗi 1s.
```java
public class LogService extends Service {
    
    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
```
Đăng ký service trong manifes,... thế là xong bước khởi tạo service, tiếp theo là cần tạo một đối tượng để thực hiện việc log message mỗi 1s, ở đây mình sẽ chọn Handler để thực hiện việc này
```java 
Handler mHandler = new Handler(); 
```
Như đã nói ở trên, việc xử lý logic code sẽ diễn ra trong hàm onStartCommand(), vì vậy mình sẽ vào hàm này để chỉnh sửa phần code log message của mình
```java
mHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Log.d("LogService", "run: " + new Date().toString());
                mHandler.postDelayed(this, 1000);
            }
        }, 1000);
return START_NOT_STICKY;
```
Ở đây mình return về START_NOT_STICKY vì mình không muốn start lại service khi nó xảy ra lỗi, chi tiết bạn có thể xem trên trang chủ của nó. Xong phần xử lý logic việc log message, chúng ta cùng qua MainActivity chạy service và xem kết quả thử. Ở MainActivity chúng ta theo phần này vào:
```java
Intent intent = new Intent(this, LogService.class);
startService(intent);
```
Cùng xem kết quả nào: 
![](https://images.viblo.asia/e8fff39e-42d7-4ca1-bd31-7d01b5032c56.jpg)
Message đã được log mỗi 1s, nhưng các bạn có thể nhận ra là khi kill app đi (là tắt hoàn toàn bằng cách swipe bỏ) thì service lúc này cũng sẽ ngoe theo, trường hợp nhấn vào phím HOME trên thiết bị để app xuống background thì service vẫn hoạt động. Nhưng ở đây mình muốn là service vẫn sẽ hoạt động dù cho người dùng kill app đi, vậy phải làm thế nào đây ta?

##### Càng vào sâu thì càng gây cấn :grin:
Như đã nói ở trên, service đã bị ngoe khi app bị kill hoàn toàn. Vậy muốn nó vẫn chạy thì cần phải thêm chút tinh hoa cho phần xử lý. 

Qua quá trình tìm tòi, lục lọi các tài liệu trên internet thì mình tìm được giải pháp đó là thêm hàm startForegound trong phần xử logic của service (đại khái là hàm này sẽ giúp service chạy ngầm trong hệ thống và ko ảnh hưởng khi app bị kill), bắt tay vào làm luôn vì đang lên mà ko làm ngay thì tụt hứng mất. Xem qua hàm startForegound thì thấy cấu trúc nó thế này
```java
void startForegound(int id, Notification notification)
```
Như vậy thì mình cần truyền vào một cái id và một cái notification (notification này dùng để thông báo cho người dùng là service đang chạy ngầm). Lười xây dựng notification quá thử truyền vào ```null``` xem thế nào![]
![](https://images.viblo.asia/84a941e2-e227-4dd7-8a40-ddb95acfab9a.PNG)

Ăn ngay ```exception``` , vậy thì phải truyền vào cho nó một cái notification thôi, thử xây dựng và truyền vào vậy:
```java
startForegound(123,notification)
```
Chạy lên xem thế nào
![](https://images.viblo.asia/c992e714-2da9-4842-9707-06d76b29032a.jpg)
OK, service chạy ngon ngẽ rùi, còn có cái notification ở trên nữa. Thử kill app luôn xem sau

![](https://images.viblo.asia/b080b784-fa38-40e7-97ff-faf9b884c70c.jpg)

Oh, service không hề bị ảnh hưởng mà vẫn chạy bình thường. Ok, thế là coi như đã hoàn thành.
### Kết luận
Như vậy, chúng ta đã lên tới đỉnh rồi và mình đã hướng dẫn các bạn xây dựng cái service chạy ngầm trong Android, ngay cả khi kill app thì vẫn hoạt động bình thường. Có đóng góp gì các bạn hãy để lại comment chúng ta cùng nhau thảo luận nhé.



##### Bài khá dài, chắc các bạn cũng lười đọc :sweat_smile:, mình sẽ cố gắng viết gọn hơn cho các bài sau này. Cảm ơn các bạn đã theo dõi ^^.