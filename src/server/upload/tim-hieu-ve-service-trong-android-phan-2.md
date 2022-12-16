Ở bài viết trước mình đã trình bày về định nghĩa, phân loại service; các phương thức quan trọng của service; khai báo trong Manifest; tạo một started service. Có thể xem lại tại đây: https://viblo.asia/p/tim-hieu-ve-service-trong-android-phan-1-LzD5d00O5jY . Ở bài viết này, mình sẽ trình bày những phần tiếp theo của Service.
## 5. Tạo một bound service
Khi tạo một service cung cấp ràng buộc liên kết, bạn phải cung cấp một **IBinder**, nó sẽ cung cấp giao diện cho người dùng có thể tương tác được với service. Có ba cách bạn có thể xác định giao diện:


**1. Extend Binder class**


Nếu service của bạn là private với ứng dụng và chạy trong cùng một process với client, bạn nên tạo giao diện bằng cách extend class **Binder** và return một instance của nó trong hàm *onBind()*. Client nhận được **Binder** và có thể sử dụng  nó để truy cập trực tiếp vào các phương thức public có sẵn trong việc implement **Binder** hoặc **Service**.
Không nên sử dụng cách này nếu như service của bạn cho phép các ứng dụng khác sử dụng.
   
   
 **2. Sử dụng Messenger**


Nếu bạn cần giao diện của mình hoạt động trên các processes khác nhau, bạn có thể tạo giao diện cho service bằng cách sử dụng **Messenger**. Khi này, service định nghĩa một **Handler** để phản hồi lại các đối tượng **Message** khác nhau. **Handler** này là cơ sở cho một **Messenger**, có thể chia sẻ một **IBinder** với client, cho phép client gửi các lệnh đến service sử dụng đối tượng **Message**. Ngoài ra, client có thể định nghĩa một **Messenger** của chính nó, vì vậy service có thể gửi lại các messages.

Đây là cách đơn giản nhất để thực hiện truyên thông liên tiến trình (IPC), bởi vì **Messenger** xếp hàng tất cả các requests vào một luồng đơn để bạn không phải thiết kế service của mình là an toàn luồng.


   **3. Sử dụng AIDL**


Ngôn ngữ định nghĩa giao diện Android (**AIDL**) phân tách các đối tượng thành các nguyên thủy mà hệ điều hành có thể hiểu và điều chỉnh chúng qua các quy trình để thực hiện **IPC**. Ở kỹ thuật trên, sử dụng một **Messenger** thì thực chất nó dựa trên cấu trúc cơ bản của AIDL. Như đã đề cập ở trên, **Messenger** tạo ra một hàng đợi của tất cả các requests của client trong một luồng duy nhất, do đó  service sẽ nhận được một yêu cầu tại một thời điểm. Tuy nhiên, nếu bạn muốn service của mình xử lý nhiều requests cùng  lúc, thì bạn có thể sử dụng trực tiếp AIDL. Trong trường hợp này, service của bạn phải an toàn luồng và có khả năng đa luồng.

Để sử dụng trực tiếp AIDL, bạn phải tạo một file .aidl, nó định nghĩa giao diện lập trình. Android SDK tools sử dụng file này để generate một abstract class nó thực hiện xử lý IPC, sau đó bạn có thể dùng service của mình extend nó.

***Chú ý:*** Hầu hết các ứng dụng không nên sử dụng AIDL để tạo một bound service, bởi vì nó có thể yêu cầu khả năng đa luồng và có thể dẫn đến việc triển khai phức tạp hơn. Như vậy, AIDL không phù hợp với hầu hết các ứng dụng nên ta sẽ không thảo luận về cách sử dụng nó.

### 5.1. Extend class Binder

Nếu service của bạn chỉ cần sử dụng cho ứng dụng local và không cần phải làm việc với các processes khác, bạn có thể sử dụng **Binder** class, nó sẽ cung cấp cho client quyền truy cập trực tiếp vào các phương thức public trong service.

***Chú ý:*** : Điều này chỉ hoạt động nếu client và service trong cùng một ứng dụng và process. Ví dụ, trong một ứng dụng âm nhạc mà bạn cần phải ràng buộc một activity với một service riêng của mình đó là play nhạc trong background.

Cách cài đặt như sau:
1. Trong service, tạo một instance của **Binder** thực hiện một trong những điều sau:
 + Chứa các phương thức public mà client có thể gọi.
 + Trả về instance của **Service** hiện tại, có các phương thức public mà client có thể gọi.
 + Trả về một instance của một class khác do service quản lý với các phương thức public mà client có thể gọi.
2. Trả về instance của **Binder** từ phương thức *onBind()*.
3. Trong client, nhận **Binder** từ callback *onServiceConnected()* và thực hiện gọi đến bound service bằng cách sử dụng các phương thức được cung cấp.

**Chú ý:** Service và client phải nằm trong cùng một ứng dụng để client có thể truyền đối tượng được trả về và gọi đúng các API của nó.  Service và client cũng phải ở trong cùng một process, bởi vì ký thuật này không thực hiện việc bất kỳ marshaling nào trong các process.


Ví dụ, dưới đây là một service cung cấp cho client quyền truy cập vào các phương thức trong service thông qua triển khai Binder:


```java
public class LocalService extends Service {
    private final IBinder mBinder = new LocalBinder();
    private final Random mGenerator = new Random();

    public class LocalBinder extends Binder {
        LocalService getService() {
            return LocalService.this;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    public int getRandomNumber() {
      return mGenerator.nextInt(100);
    }
}
```

**LocalBinder** cung cấp phương thức *getService()* cho client để lấy ra các instance hiện tại của **LocalService**. Điều này cho phép client gọi các phương thức công khai trong service. Ví dụ, client có thể gọi phương thức *getRandomNumber()* từ service.

Đây là một activity liên kết với **LocalService** và gọi *getRandomNumber()* khi nhấn một button: 

```java
public class BindingActivity extends Activity {
    LocalService mService;
    boolean mBound = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    @Override
    protected void onStart() {
        super.onStart();
        Intent intent = new Intent(this, LocalService.class);
        bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
    }

    @Override
    protected void onStop() {
        super.onStop();
        unbindService(mConnection);
        mBound = false;
    }

    public void onButtonClick(View v) {
        if (mBound) {
            int num = mService.getRandomNumber();
            Toast.makeText(this, "number: " + num, Toast.LENGTH_SHORT).show();
        }
    }

    private ServiceConnection mConnection = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName className,
                IBinder service) {
            LocalBinder binder = (LocalBinder) service;
            mService = binder.getService();
            mBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName arg0) {
            mBound = false;
        }
    };
}
```

Ví dụ trên đây cho thấy client liên kết với service bằng cách thực hiện ServiceConnection và callback onServiceConnected(). Phần tiếp theo cung cấp thêm thông tin về quá trình liên kết với service này.

***Chú ý:*** Trong ví dụ trên, phương thức onStop() sẽ hủy ràng buộc client khỏi service. Clients nên hủy ràng buộc với các service vào những thời điểm thích hợp.

### 5.2. Sử dụng một Messenger

Nếu bạn cần service của mình để giao tiếp với các process từ xa, thì bạn có thể sử dụng **Messenger** để cung cấp giao diện cho service của bạn. Kỹ thuật này cho phép bạn thực hiên truyền thông liên tiến trình (IPC) mà không cần sử dụng **AIDL**.

Sử dụng **Messenger** cho giao diện của bạn đơn giản hơn việc sử dụng AIDL vì **Messenger** xếp hàng tất cả các request đến service. Một giao diện AIDL thuần túy gửi các request đồng thời đến service, sau đó phải xử lý đa luồng.

Đối với hầu hết các ứng dụng, service không cần thực hiện đa luồng, vì vậy việc sử dụng  **Messenger** cho phép các service xử lý một nhiệm vụ tại một thời điểm. Nếu service cần thực hiện đa luồng thì hãy sử dụng AIDL để xác định giao diện.

Dưới đây là tóm tắt về cách sử dụng một **Messenger**:

1. Service implements một **Handler** nhận một callback cho mỗi request từ client.
2. Service có thể sử dụng **Handler** để tạo một đối tượng **Messenger** (tham chiếu đến **Handler**).
3. **Messenger** tạo một **IBinder** mà service trả về cho client từ hàm *onBind()*. 
4. Clients sử dụng **IBinder** để  khởi tạo **Messenger** (tham chiếu đến **Handler** của service), client sử dụng để gửi các đối tượng **Message** tới các service.
5. Service nhận mỗi **Message** trong **Handler** của nó - đặc biệt, trong phương thức *handleMessage()*.

Trong cách này, không có phương pháp nào để client gọi trên service. Thay vào đó, client gửi các thông báo (các đối tượng **Mesage**) mà service nhận được trong **Handler** của nó.

Dưới đây là một ví dụ đơn giản sử dụng giao diện **Messenger**:


```java
public class MessengerService extends Service {
    
    static final int MSG_SAY_HELLO = 1;

    static class IncomingHandler extends Handler {
        private Context applicationContext;

        IncomingHandler(Context context) {
            applicationContext = context.getApplicationContext();
        }

        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case MSG_SAY_HELLO:
                    Toast.makeText(applicationContext, "hello!", Toast.LENGTH_SHORT).show();
                    break;
                default:
                    super.handleMessage(msg);
            }
        }
    }

    Messenger mMessenger;
    
    @Override
    public IBinder onBind(Intent intent) {
        Toast.makeText(getApplicationContext(), "binding", Toast.LENGTH_SHORT).show();
        mMessenger = new Messenger(new IncomingHandler(this));
        return mMessenger.getBinder();
    }
}
```

Chú ý rằng phương thức *handleMessage()* trong **Handler** là nơi mà service nhận được **Message** được gửi đến và quyết định phải làm gì, dựa trên đối tượng nào xử lý nó.

Tất cả những gì mà một client cần làm là tạo một **Messenger** dựa trên **IBinder** được service trả về và gửi một tin nhắn bằng cách sử dụng phương thức *send()*. Ví dụ, đây là một activity đơn giản liên kết với service và cung cấp tin nhắn MSG_SAY_HELLO cho service:

```java
public class ActivityMessenger extends Activity {
    
    Messenger mService = null;

    boolean mBound;

    private ServiceConnection mConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, IBinder service{
            mService = new Messenger(service);
            mBound = true;
        }

        public void onServiceDisconnected(ComponentName className) {
         
            mService = null;
            mBound = false;
        }
    };

    public void sayHello(View v) {
        if (!mBound) return;
    
        Message msg = Message.obtain(null, MessengerService.MSG_SAY_HELLO, 0, 0);
        try {
            mService.send(msg);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    @Override
    protected void onStart() {
        super.onStart();
    
        bindService(new Intent(this, MessengerService.class), mConnection,
            Context.BIND_AUTO_CREATE);
    }

    @Override
    protected void onStop() {
        super.onStop();
       
        if (mBound) {
            unbindService(mConnection);
            mBound = false;
        }
    }
}
```

Chú ý rằng ví dụ này không cho thấy các service có thể đáp ứng với client. Nếu bạn muốn service phản hồi, bạn cũng cần tạo **Messenger** trong ứng dụng client. Khi client nhận được  callback *onServiceConnected()*, nó sẽ gửi một **Message** tới service bao gồm **Messenger** của client trong tham số **replyTo** cảu phương thức *send()*.

### 5.3. Liên kết với một service

Các thành phần của ứng dụng (client) có thể liên kết với một service bằng cách gọi *bindService()*. Hệ thống Android sau đó gọi phương thức *onBind()* của service, trả về một đối tượng **IBinder** để tương tác với service.

Liên kết là không đồng bộ, và *bindService()* trả về ngay lập tức mà không trả lại **IBinder** cho client. Để nhận được **IBinder**, client phải tạo một instance của **ServiceConnection** và truyền nó đến *bindService()*. **ServiceConnection** bao gồm một callback mà hệ thống gọi để cung cấp **IBinder**.

***Chú ý:*** Chỉ có những activity, service, và content provider có thể liên kết đến một service - bạn không thể liên kết đến một service từ một broadcast receiver.

Để liên kết đến một service từ client, làm theo các bước sau:

1. Implement **ServiceConnection**. Bạn cần override hai callback sau: 

**onServiceConnected()**: Hệ thống gọi phương thức này để chuyển **IBinder** trả vể bởi phương thức *onBind()* của service.

**onServiceDisconnected()**: Hệ thống Android gọi phương thức này khi kết nối tới service bị mất, như là khi service bị crash hoặc bị kill. Phương thức này không được gọi khi mà client unbind.
      
2. Gọi phương thức **bindService()**, truyền qua **ServiceConnection**.

Nếu phương thức trả về false thì client không có giá trị liên kết tới service. Tuy nhiên, client vẫn nên gọi *unbindService()*; nếu không, client của bạn sẽ giữ cho service  ngừng hoạt động khi không hoạt động. 
3. Khi hệ thống gọi callback *onServiceConnected()*, bạn có thể bắt đầu thực hiện các request đến service, sử dụng các phương thức do giao diện xác định.
4. Để ngắt kết nối tới service, gọi hàm *unbindService()*.

Nếu client vẫn bị ràng buộc với một service khi ứng dụng của bạn destroy client, việc này sẽ khiến client hủy liên kết. Do vậy, nên hủy liên kết ngay sau khi thực hiện tương tác với service. Và nên xem xét thời điểm phù hợp để hủy liên kết.

Dưới đây là một ví dụ kết nối client với service được tạo ra ở trên bằng cách extend class **Binder**, vì vậy nó phải trả về **IBinder** đến class **LocalService** và yêu cầu instance của **LocalService**: 

```java
LocalService mService;
private ServiceConnection mConnection = new ServiceConnection() {
    
    public void onServiceConnected(ComponentName className, IBinder service) {
      
        LocalBinder binder = (LocalBinder) service;
        mService = binder.getService();
        mBound = true;
    }

    public void onServiceDisconnected(ComponentName className) {
        Log.e(TAG, "onServiceDisconnected");
        mBound = false;
    }
};
```

Với **ServiceConnection**, client có thể bind đến một service bằng cách truyền nó tới *bindService()*, như sau:

```java
Intent intent = new Intent(this, LocalService.class);
bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
```

 + Tham số đầu tiên của *bindService()* là một Intent tường minh để liên kết. ***Chú ý:*** nếu bạn sử dụng Intent không tường minh để start một service thì nó là một mối nguy hiểm bảo mật vì bạn không thể chắc chắn rằng service nào sẽ đáp ứng với intent đó và người dùng không thể thấy service nào start. Bắt đầu với Android 5.0 (APi 21), hệ thống throw một exception nếu bạn gọi *bindService()* với một Intent không tường minh.
 + Tham số thứ hai là đối tượng **ServiceConnection**.
 + Tham số thứ ba là một flag chỉ ra hành động cho sự liên kết. Nên sử dụng cờ **BIND_AUTO_CREATE** để tạo một service nếu nó không còn sống. Ngoài ra còn có cờ **BIND_DEBUG_UNBIND** và **BIND_NOT_FOREGROUND** hoặc 0 nếu như không có gì.

***Chú ý:*** Dưới đây là một số lưu ý quan trọng khi  bind đến một service:
+ Nếu bạn chỉ cần tương tác với service trong khi activity của bạn visible, bạn nên bind trong khi *onStart()* và unbind trong *onStop()*.
+ Nếu bạn muốn activity nhận được phản hồi ngay cả khi nó bị dừng ở chế độ background, thì bạn có thể liên kết trong *onCreate()* và unbind trong *onDestroy()*.
+ Bạn thường không bind hay unbind trong *onResume()*  và *onPause()*, bởi vì những callback này sẽ được gọi ở mỗi lần chuyển đổi vòng đời và bạn nên giảm tối thiểu công việc này. Ngoài ra, nếu nhiều activity trong một ứng dụng liên kết tới cùng một service và có một sự chuyển đổi giữa hai activity, service có thể sẽ bị destroy và recreate.

### 5.4. Liên kết với một started service

Bạn có thể  tạo một service mà có thể gồm cả started và bound. Bạn có thể start một service bằng cách gọi startService(), nó cho phép service chạy vô thời hạn, và bạn có thể cho phép một client bind đến service bằng cách gọi bindService().

Nếu bạn cho phép service của bạn được started và bound, hệ thống sẽ không hủy service khi mà tất cả client unbind. Thay vào đó, bạn phải dừng service bằng cách gọi stopSelf() hoặc stopService().

Mặc dù bạn thường implement phương thức *onBind()* hoặc *onStartCommand()*, đôi khi cần thiết phải triển khai cả hai. Ví dụ, một trình phát nhạc có thể cho phép service chạy vô thời hạn và cũng cung cấp ràng buộc. Bằng cách này, một activity có thể start service để play nhạc và tiếp tục phát ngay cả khi người dùng thoát khỏi ứng dụng. Sau đó, khi người dùng quay lại ứng dụng, activity có thể liên kết với service để lấy lại quyển kiểm soát playback.

Khi có cả hai service đó chạy đồng thời thì vòng đời của service đó như thế nào?

## 6. Quản lý vòng đời của một service

Vòng đời của service thì đớn giản hơn so với vòng đời của một activity. Tuy nhiên, điều quan trọng hơn là bạn chú ý đến cách service của bạn được tạo ra và bị hủy bởi vì một service có thể chạy trong background mà người dùng không biết.
![](https://images.viblo.asia/a18e94fe-160a-48d5-97d2-0955741f4746.jpg)
Vòng đời service  — từ khi nó được tạo ra khi nó bị  hủy - có thể theo một trong hai đường dẫn sau: 
+ Started service: Service được tạo khi một thành phần khác gọi phương thức *startService()*. Service chạy vô thời hạn và nó tự dừng khi gọi *stopSelf()*. Một thành phần khác có thể dừng nó bằng cách gọi hàm *stopService()*. Khi service được dừng, hệ thống sẽ hủy nó.
+ Bound service: Service được tạo khi mà một thành phần khác (một client) gọi tới hàm *bindService()*. Client sau đó liên kết với service thông qua một **IBinder** interface. Client có thể đóng kết nối bằng cách gọi *unbindService()*. Nhiều client có thể bind đến cùng một service và khi tất cả client đó unbind, hệ thống sẽ hủy service. Service không cần phải tự dừng.

Giống như một activity, một service  có các phương thức calback mà bạn có thể thực hiện để theo dõi các thay đổi trong trạng thái của service và thực hiện công việc vào các thời điểm thích hợp. Ví dụ  sau đây thể hiện từng phương pháp vòng đời:

```java
public class ExampleService extends Service {
    int mStartMode;       
    IBinder mBinder;      
    boolean mAllowRebind; 

    @Override
    public void onCreate() {
        // The service is being created
    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Service is starting, due to a call to startService()
        return mStartMode;
    }
    @Override
    public IBinder onBind(Intent intent) {
        // A client is binding to the service with bindService()
        return mBinder;
    }
    @Override
    public boolean onUnbind(Intent intent) {
        // All clients have unbound with unbindService()
        return mAllowRebind;
    }
    @Override
    public void onRebind(Intent intent) {
        // A client is binding to the service with bindService(),
        // after onUnbind() has already been called
    }
    @Override
    public void onDestroy() {
        // The service is no longer used and is being destroyed
    }
}
```

+ Entire lifetime: nó xảy ra giữa thời điểm *onCreate()* được gọi và khi *onDestroy()* returns. 
+ Active lifetime: bắt đầu khi gọi *onStartCommand()* hoặc *onBind()*. Mỗi phương thức được nhận Intent đã được truyền cho *startService()* hoặc *bindService()*.

Hai đường dẫn này không hoàn toàn tách biệt. Bạn có thể bind đến một service mà nó  started với hàm *startService()*. Ví dụ, bạn có thể start một background music service bằng cách gọi *startService()* với một Intent để play nhạc. Sau đó,  có thể khi người dùng muốn nhận thông tin về bài hát hiện tại, một activity có thể bind đến service bằng cách gọi *bindService()*. Trong các trường hợp như vậy, *stopService()* hay* stopSelf()* không thưc sự stop service cho đến khi tất cả các client unbind.

Khi started service và bound service chạy đồng thời thì nó có vòng đời như sau:

![](https://images.viblo.asia/2882af32-3f82-4c32-91d7-d1a3806de438.png)

## Tổng kết
Trong phần 2 này mình đã trình bày về tạo một bound service; vòng đời của service. Trên đây là những kiến thức về service mà mình đã tổng hợp được, hy vọng bài viết này mang lại kiến thức cho các bạn! Cảm ơn vì đã đọc bài viết này của mình! :))))
## Tài liệu tham khảo
https://developer.android.com/guide/components/bound-services#Additional_Notes