Trong bài viết này, mình xin chia sẻ những kiến thức về Service trong Android mà mình tìm hiểu được trong thời gian vừa qua. Hy vọng bài viết này sẽ hữu ích đối với các bạn.
## 1. Giới thiệu và phân loại
### 1.1 Giới thiệu
Service là một trong bốn components lớn của Android. Nó là một thành phần chạy ngầm trên hệ điều hành để thực hiện các hoạt động dài hạn trong background và nó không cung cấp giao diện người dùng. Một thành phần khác của ứng dụng có thể start một Service, và nó vẫn tiếp tục chạy trong background ngay cả khi người dùng chuyển sang ứng dụng khác. Ngoài ra, một thành phần có thể liên kết với một Service để tương tác với nó, thậm chí là thực hiện truyền thông liên tiến trình(IPC). Ví dụ, một Service có thể thực hiện các giao dịch mạng, thực hiện I/O file, hoặc tương tác với một content provider, tất cả từ background.
### 1.2 Phân loại
Có 3 loại service, đó là:

**1. Foreground**

Một Foreground service thực hiện một số hành động gây chú ý với người dùng. Ví dụ một ứng dụng nghe nhạc sẽ sử dụng service này để control nhạc. Foreground service phải hiển thị một Notification. Nó vẫn tiếp tục chạy khi mà người dùng không tương tác với ứng dụng.

**3. Background**

Background service thực hiện một hành động mà không gây được sự chú ý của người dùng. Ví dụ, nếu một ứng dụng cần sử dụng service để thực hiện thu gom bộ nhớ thì thường sẽ là background service.
- Chú ý: Nếu ứng dụng của bạn có API 26 trở lên, hệ thống sẽ đặt các hạn chế đối với các background service khi bản thân ứng dụng không ở foreground. Trong hầu hết các trường hợp như thế này, ứng dụng của bạn nên sử dụng một scheduled job thay thế.

**3. Bound**

Một service được gọi là bound khi mà một thành phần ứng dụng ràng buộc với nó bằng cách gọi bindService(). Một service ràng buộc cung cấp một giao diện client-server cho phép các thành phần tương tác với service, gửi các yêu cầu và nhận kết quả, và thậm chí là IPC. Một Bound Service chỉ chạy miễn là có một thành phần ràng buộc với nó. Có thể có nhiều thành phần ràng buộc với Bound service cùng lúc, nhưng khi tất cả hủy bỏ ràng buộc(unbound) thì service sẽ bị destroy.
 
 Mặc dù cũng có sự thảo luận về hai loại servie là started và bound, service của bạn có thể làm việc theo cả hai cách. Nó có thể được started(chạy vô thời hạn) và cũng cho phép ràng buộc. Bạn chỉ cần implement hai phương thức: onStartCommand() để cho phép các thành phần start nó và onBind() để cho phép ràng buộc.
 
 Bất kể service của bạn là started, bound hay cả hai thì mọi thành phần ứng dụng đều có thể sử dụng service nếu nó có thể sử dụng một activity - bằng cách start service với một Intent. Tuy nhiên bạn có thể  khai báo service là private trong file Manifest để ngăn chặn truy cập từ các ứng dụng khác.
 
 Một service mặc định chạy trên main thread, Service không tạo ra thread cho riêng nó và nó không chạy trong một tiến trình tách biệt trừ khi bạn chỉ định theo cách khác. Nếu service thực hiện công việc dài hạn thì bạn nên tạo một thread để thực hiện điều đó. Bằng cách sử dụng thread riêng biệt, bạn sẽ tránh được lỗi ANR.
 
 Nên sử dụng Service hay Thread:  Một service đơn giản chỉ là một thành phần có thể chạy trong background, ngay cả khi người dùng không tương tác với ứng dụng của bạn, vì vậy bạn chỉ nên tạo một service nếu đó là những gì bạn cần. Nếu bạn phải thực hiện công việc bên ngoài main thread, nhưng chỉ khi người dùng tương tác với ứng dụng của bạn, bạn nên tạo một thread mới. Ví dụ, ứng dụng phát nhạc chỉ trong khi activity còn đang chạy thì bạn nên tạo một thread trong onCreate(), bắt đầu chạy trong onStart(), và dừng nó trong onStop(). Cũng nên sử dụng AsyncTask hoặc HandlerThread thay vì cách truyền thống là sử dụng class Thread. Nhớ rằng là nếu bạn sử dụng một service, thì mặc định nó vẫn chạy trong main thread, vì vậy bạn nên tạo một thread mới trong service nếu như nó thực hiện chuyên sâu hoặc ngăn chặn các hành động.
## 2. Các phương thức quan trọng
Để tạo một service, bạn phải tạo một lớp con của Service hoặc sử dụng một trong các lớp con hiện có của nó. Khi bạn thực thi bạn phải override một vài phương thức quan trọng xử lý trong vòng đời của Service và cung cấp một cơ chế cho phép các thành phần liên kết với Service nếu thích hợp. Sau đây là một số phương thức quan trọng đó:
- *onCreate()*: Hệ thống sẽ gọi phương thức này để thực hiện cài đặt cần thiết khi mà service được khởi tạo. Nếu service đang chạy thì hàm này sẽ không được gọi.(chỉ gọi 1 lần).
- *onStartCommand()*: callback này được gọi đối với service loại forceground hoặc background. Hệ thống sẽ gọi nó nếu một thành phần nào đó gọi *startService()*. Khi phương thức này được thực thi, service này được khởi tạo và có thể chạy mãi. Có thể kết thúc service bằng cách gọi *stopService()* hoặc *stopSelf()*. Nếu bạn chỉ muốn cung cấp ràng buộc thì bạn không nên sử dụng phương thức này.
- *onBind()*: callback này được gọi với bound service. Hệ thống sẽ gọi nó khi một thành phần gọi đến *bindService()*. Khi implement phương thức này thì bạn cần trả về một IBinder, nếu không muốn thì trả về null. Từ Android 5.0(API 21) nếu bạn gọi *bindService(Intent)* với một Intent không tường minh thì hệ thống sẽ trả về một Exception.
- *onDestroy()*: callback này được gọi khi mà service không còn được sử dụng và bị hủy. Đây là phương thức cuối cùng trong vòng đời của service.
## 3. Khai báo trong Manifest
Bạn muốn dùng một Service bất kì thì bắt buộc bạn phải khai báo nó trong Mainifest như Activity và các thành phần khác.

Để khai báo một service, bạn cần một thẻ <service> bên trong thẻ <application>. Dưới đây là ví dụ:
   ```java
<manifest ... >
  ...
  <application ... >
      <service android:name=".SubService" />
      ...
  </application>
</manifest>
```
    
- Có nhiều thuộc tính khác mà bạn có thể thêm vào thẻ <service>.
    
- android:name là thuộc tính duy nhất mà bắt buộc phải có. Để giải thích cho mục đích sử dụng service hay thêm một chú thích nào đó hiển thị cho người dùng thấy, bạn có thể sử dụng thuộc tính android:description.

- Ngoài ra, nếu service có thể cho ứng dụng khác ngoài ứng dụng chứa nó sử dụng thì ta cần khai báo thêm thuộc tính android: exported = "true" ( mặc định là false). Nếu để là false thì nó sẽ giúp ngăn chặn các ứng dụng khác start service của bạn, ngay cả khi sử dụng một explicit intent.

- Kể từ android 2.3 thì khi sử dụng *Context.startService(Intent)* bạn cũng có thể set **Intent.FLAG_GRANT_READ_URI_PERMISSION** hoặc\và **Intent.FLAG_GRANT_WRITE_URI_PERMISSION** cho Intent. Điều này giúp cấp quyền truy cập service tạm thời cho các URI cụ thể trong Intent. Ngay cả khi service không được export thì tính năng này cũng vẫn cung cấp quyền truy cập.

- Nếu như bạn cần một service mà nó có thể thực hiện các giao tiếp phức tạp với clients từ xa(ngoài việc sử dụng *Context.startService(Intent)* để gửi các lệnh tới nó) thì ta còn có thể sử dụng class Message thay vì viết đầy đủ trong file AIDL. Nếu chúng ta muốn service này chạy trong remote process, ta có thể sử dụng thuộc tính android:process=”:remote” được khai báo trong Manifest.


## 4. Tạo một started service

Một thành phần khác gọi tới *startService()*, nó sẽ gọi tới phương thức *onStartCommand()* của Service. Khi một service được start thì nó có vòng đời phụ thuộc vào vòng đời của thành phần start nó. Service có thể chạy trong background vô thời hạn, kể cả thành phần start nó bị hủy. Như vậy, service sẽ tự dừng công việc của nó khi hoàn tất bằng cách gọi *stopSelf()*, hoặc một thành phần khác dừng nó bằng cách gọi *stopService().*

Một thành phần ứng dụng như là activity có thể start service bằng cách gọi *startService()* truyền một Intent gồm data để service sử dụng. Service nhận Intent này trong hàm *onStartCommand()*.

Mặc định service chạy trên main thread, nếu thực hiện các hành động dài thì service sẽ làm giảm hiệu suất của ứng dụng. Để tránh điều này, nên tạo một thread trong service.

Để tạo service, ta có thể extend từ hai class sau:
- **Service**: đây là class cơ sở cho tất cả service, khi này bạn cần tạo một thread mới để thực hiện các công việc của service. Theo mặc định thì service làm việc trên main thread, điều này làm chậm hiệu suất của hệ thống. Service sẽ tự dừng công việc của nó khi hoàn tất bằng cách gọi *stopSelf()*, hoặc một thành phần khác dừng nó bằng cách gọi *stopService()*.
- **IntentService**: đây là một lớp con của Service, nó thực hiện các công việc trên worker thread. Nó xử lý các request một cách tuần tự. Cần implement *onHandleIntent()*, nó nhận được intent cho mỗi yêu cầu start. Không thể can thiệp dừng service này, nó sẽ tự động dừng khi hoàn thành công việc.

### 4.1. Extending the IntentService class

Sử dụng IntentService khi mà không cần xử lý đồng thời nhiều request cùng một lúc.

IntentService xử lý như sau:
- Nó tạo ra một worker thread mặc định để thực thi tất cả các intent được gửi đến *onStartCommand()*, tách biệt với main thread.
- Tạo ra work queue để tại một thời điểm, nó truyền một intent đến hàm *onHandleIntent()*. Vì vậy bạn không cần lo lắng về việc chạy đa luồng.
- Service dừng khi tất cả các yêu cầu được thực thi, vì vậy bạn không bao giờ phải gọi *stopSelf()*.
- Mặc định implement *onBind()* và trả về null.
- Mặc định implement hàm *onStartCommand()* và truyền intent đến work queue, sau đó truyền tới hàm *onHandleIntent()*.

Buộc phải implement hàm *onHandleIntent()* và hàm khởi tạo cho service.

```java
public class SubService extends IntentService {

    public SubService(String name) {
        super(name);
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {

    }

    @Override
    public int onStartCommand(@Nullable Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return super.onBind(intent);
    }
}
```

### 4.2. Extending the Service class
Nếu bạn muốn service thực hiện đa luồng(thay vì xử lý các yêu cầu thông qua work queue), nên sử dụng class Service để xử lý từng Intent.

```java
public class MusicService extends Service implements BaseMediaPlayer
        , MediaPlayer.OnPreparedListener, MediaPlayer.OnCompletionListener
        , MediaPlayer.OnErrorListener {

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        if (intent != null) {
            handlerIntent(intent);
        }
        return mMyBinder;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            handlerIntent(intent);
        }
        return START_STICKY;
    }

    @Override
    public boolean onUnbind(Intent intent) {
        return super.onUnbind(intent);
    }

    @Override
    public void onDestroy() {
        release();
        stopSelf();
        super.onDestroy();
    }
```


Vì tự bạn thực hiện từng lời gọi *onStartCommand()*, bạn có thể thực hiện nhiều yêu cầu đồng thời. Bạn có thể tạo mới thread cho mỗi request và thực thi ngay lập tức thay vì chờ yêu cầu trước đó kết thúc.

Hàm *onStartCommand()* phải trả về một integer. Số integer này mô tả cách service được khôi phục khi mà bị hệ thống kill. Với Intent service thì mặc định nó xử lý việc này. Các giá trị trả về bao gồm:

- **START_STICKY**: Nếu service bị kill bởi hệ thống, khi nó khôi phục thì nó create lại và chạy vào onStartCommand với một Intent là null.
- **START_NOT_STICKY**: nếu service bị kill thì nó sẽ không được create lại, trừ khi gọi pending intent.
- **START_REDELIVER_INTENT**: nếu hệ thống kill service này sau khi onStartCommand() trả về, thì service sẽ được tạo lại và gọi vào onStartCommand() với một intent là intent cuối cùng nó nhận được trước khi bị kill. Loại này phù hợp với kiểu công việc thực hiện tự động ngay sau khi nó được khôi phục, ví dụ như là download file.
- **START_STICKY_COMPABILITY**: phiên bản tương ứng của START_STICKY, nó sẽ không đảm bảo service được phục hồi khi nó bị kill.
- **Default**: trả về giá trị mặc định, tùy thuộc vào phiên bản Android:
 <= 2.1: trả về START_STICKY_COMPABILITY, còn > 2.1: trả về START_STICKY.

### 4.3. Starting a service

Bạn có thể start một service từ một activity hoặc một thành phần khác bằng cách truyền qua một Intent đến hàm *startService()* hoặc gọi *startForegroundService()*. Hệ thống sẽ gọi hàm *onStartCommand()* của service và truyền cho nó Intent.

**Chú ý**: Nếu API level 26 (Android 8.0) hoặc cao hơn thì hệ thống hạn chế việc sử dụng backgroundService, trừ khi bản thân ứng dụng nằm trong forceground. Android O ngăn cản việc sử dụng phương thức startService() để start một service, nếu cố tình gọi nó thì sẽ có một ngoại lệ đó là **IllegalArgumentException**. Vậy làm thế nào để chạy một backgroundService trên Android O?

- Cách 1: Sử dụng một JobScheduler. (https://developer.android.com/reference/android/app/job/JobScheduler)
- Cách 2: Dùng ForcegroundService để thực hiện các nhiệm vụ. Nên gọi *startForegroundService()*. Phương thức này tạo một background service, nhưng phương thức báo hiệu với hệ thống rằng tự service này chạy trên foreground. Một khi service được tạo thì nó phải gọi tới hàm *startForeground()* trong vòng 5 giây, nếu quá thời gian giới hạn thì hệ thống sẽ dừng service và sinh ra ANR. Hoặc  gọi NotificationManager.startServiceInForeground().

Ngay sau khi gọi *startService()* thì hệ thống gọi *onStartCommand()*. Nếu service trước đây chưa từng chạy thì nó sẽ gọi *onCreate()* sau đó gọi *onStartCommand()*. (*onCreate()* chỉ gọi 1 lần).

```java
Intent intent = new Intent(this, HelloService.class);
startService(intent);
```

Nếu như gọi start service nhiều lần thì nó sẽ gọi hàm *onCreate()* một lần và *onStartCommand()* nhiều lần, nhưng chỉ gọi dừng service đúng một lần duy nhất(với *stopSelf()* hoặc *stopService()*).
### 4.4. Stopping a service
Một started service phải quản lý vòng đời của chính nó. Tức là hệ thống không dừng hoặc hủy service trừ khi nó phải khôi phục bộ nhớ hệ thống và service tiếp tục chạy khi mà *onStartCommand()* trả về. Service phải tự dừng bằng cách gọi *stopSelf()*, hoặc một thành phần khác có thể dừng nó bằng cách gọi *stopService()*.
Khi có yêu cầu dừng service với *stopSelf()* hay *stopService()* thì hệ thống sẽ hủy service càng sớm càng tốt.

Khi service của bạn xử lý nhiều yêu cầu đến *onStartCommand()* đồng thời, thì bạn nên dừng bằng cách *stopSelf(int)* để chắc chắn rằng service sẽ dừng ngay sau khi yêu cầu gần nhất được thực hiện xong. Tức là, khi bạn gọi *stopSelf(int)* bạn truyền ID của yêu cầu bắt đầu vào (startId gửi đến *onStartCommand()*). Sau đó, nếu service nhận được yêu cầu start mới trước khi bạn có thể gọi *stopSelf(int)*, ID không khớp và service không dừng lại.

Để tránh lãng phí tài nguyên và tiêu tốn pin, bạn phải dừng service khi mà nó hoàn thành xong công việc của mình.


## Tổng kết


Trên đây mình đã trình bày về định nghĩa, phân loại service; các phương thức quan trọng của service; khai báo trong Manifest; tạo một started service.
Còn nhiều phần về Service nữa và mình sẽ trình bày trong bài viết tiếp theo. Cảm ơn các bạn đã đọc bài viết này! :)))


## **Tài liệu tham khảo:**
https://developer.android.com/guide/components/services

https://medium.com/exploring-code/how-to-handle-background-services-in-android-o-f96783e65268