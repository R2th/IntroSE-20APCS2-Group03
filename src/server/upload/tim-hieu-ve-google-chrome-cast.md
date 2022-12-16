# 1. Chromecast là gì.

Phần bài viết này giành cho các bạn viết ựng có liên quan đến Video, Audio và các ứng dụng liên quan đến đa phượng tiện.

Lần đầu tiên Chromecast được gới thiệu vào năm 2013 tại US. Ngay từ phiên bản đầu tiên Google thiết kế ChromeCast nhằm để tương thích với cách ứng dụng của bên thứ 3, mục đích tạo ra ban đầu là bạn có thể truyền dẫn, chia sẻ tất cả mọi thứ lên các thiết bị TV của bạn, nhưng càng về sau thì các phiên bản kế nhiêm và cả phiên bản cuối cùng thì nó đã được thiết kế nghiêng hẳn về các ứng dụng đa phương tiện.

Đầu tiên các bạn cẩn tìm hiểu về `cast technology` là gì và cách thức nó hoạt động như thế nào trước khi bạn tìm hiểu sâu hơn về cách triển khai nó.

Điều quan trọng bạn cần hiểu là các ứng dụng `Chromecast` không đọc thông tin trực tiếp từ ứng dụng của bạn. Nó giao tiếp với ứng dụng của bạn thông qua 1 `Socket`. `Socket` đó được mở khi ứng dụng của bạn yêu cầu thiết lập 1 cầu truyền dẫn thông tin tới các Android TV hoặc các thiết bị `Chromecast` đặc thù.

![](https://images.viblo.asia/d224e153-d786-420e-99f4-53d16590483b.png)

Khi bạn cần “Cast on…”  từ 1 ứng dụng gửi (ở đây mình gọi tạm là sender app) thì thật ra là bạn đang nói với `cast device` là mở 1 trang web tĩnh, và ứng dụng web tĩnh đó được gọi là `receiver app`. Bộ ứng dụng `receiver app` này được lưu trữ online và nó sẽ được tải về khi nhận được yêu cầu kết nối từ thiết bị `sender app`.

Google khuyến nghị bạn là các ứng dụng có kết nối với thiết bị `receiver app` tốt nhất là khi cả 2 cùng sử dụng chung mạng Wifi. Vì thực chất `Sokcet`  sẽ được mở và truyền dẫn dữ liệu thông qua 1 cái gọi là `Wi-Fi Direct`, một định nghĩa về 1  giao thức truyền dẫn ngang hàng giữa các thiết bị cùng chung 1 kết nối mạng Wifi.

Oke ngưng tạm luyên thuyên về lý thuyết 1 chút, giờ chung ta sẽ bắt đầu từng chút 1 để biết các tạo ra 1 ứng dụng ChromeCast và cách chia sẻ thông tin thông qua ứng dụng ChromeCast đó. Để làm được việc đó thì các bạn cần làm các công việc theo thứ tự sau.

- Đăng ký **Cast Develop** với Google
- Tạo liên kết **ChromeCast** tới tài khoản **Cast Develop**.
- Khai báo ứng dụng **receiver app**
- Thiết lập và cấu hình **receiver app**
- Thiết lập và cấu hình **sender app**

"Các bước trên là theo kinh nghiệm mình tổng hợp ra, chứ chưa chắc 1 ứng dụng đã cầ trải qua đầy đủ các bước trên đâu nhé"
 
 Nào bây giờ chúng ta sẽ đi tìm hiểu từng bước để có thể tạo ra 1 ứng dụng có áp dụng công nghệ ChromeCast hoàn chỉnh.
 
#  2. Register a dev account
Để hoàn tất bước này, trước hết bạn cần phải có 2 thứ.

```
- A Google Account
- A credit card 💰
```

Không giống với các dịch vụ khác  của Google thuờng là miễn phí cho Deverlop nhưng dịch vụ **Chromecast**  sẽ cần 5$ để đăng ký, đó là lý do tại sao cho dù bạn chỉ là Deverlop những để phát triển "dù có là thử nghiệm" thì bạn vẫn cần 1 thẻ **credit card** với tối thiểu 5$ trong đó :D.

Đầu tiền bạn sẽ cần truy cập vào [link để có thể đăng ký tài khoản phát triển](https://cast.google.com/publish/#/signup), sau khi đăng ký xong thì bạn sẽ được chuyển tiếp để trang `Google Cast SDK Developer Console`

![](https://images.viblo.asia/06bca13f-8439-4951-ad4e-32523fcb200d.png)

Tại đây bạn bạn sẽ cần thiết lập các thông tin về ứng dụng **sender app** trong phần **Applications** và **receiver app** trong phần **Cast Receiver Devices** "thật ra mình thấy cái `Cast Receiver Devices` này có nhiều tác dụng cho việc Debug hơn là việc cung cấp sản phẩm tới người dùng sau này"


# 3. Liên kết thiết bị ChromeCast với tài khoản Develop

Click on **ADD NEW DEVICE**  tại đây bạn cần điền số **Serial Number** ở mặt sau của thiết bị **ChromeCast**, việc này chủ yếu khai báo để bạn có thể chạy **receiver app** dưới chế độ Debug trên thiết bị được khai báo.

Với 1 team size phát triển lớn thì bạn có thể thêm 3 đến 4 thiết bị **ChromeCast** vào đây để phục vụ công việc phát triển được thuận lợi hơn.

# 4. Khai báo ứng dụng Receiver App

Click on **ADD NEW APPLICATION**. Tại đây bạn cần khai báo 1 số thông tin quan trọng sau.

- Application ID, Nam của ứng dụng Android hay IOS **sender app**
- Link [**Custom Receiver**](https://developers.google.com/cast/docs/web_receiver), nơi bạn thiết kế 1 web site để nhận dữ liệu từ **sender app**

Sau khi thiết lập hoàn chỉnh các bước trên thì bạn sẽ nhận được 1 dãy ký tự có tên là **receiver_id** và **receiver_id** này sẽ được cấu hình trong **sender app** của bạn.

Nào nào cùng chú ý tới cái gọi là **Custom Receiver** 1 chút. Nó là 1 trang web tĩnh nơi nhận dữ liệu được chia sẻ từ **sender app** và hiển thị tới người xem trên thiết bị ChromeCast. Trang web này sẽ được bạn tự viết và nó cần được lưu trữ trên 1 hosting nào đó. 

Bạn cần hiểu nôm na đơn giản như thế này.  Khi thiết bị **ChromeCast** nhận được yêu cầu chia sẻ thông tin từ **sender app** kèm 1 **receiver_id** thì thiết bị sẽ sử dụng link bạn đã cấu hình trong **Custom Receiver**  để load trang web đó về thiết bị và hiển thị nó trên thiết bị đầu cuối. 

Đó là các bước hoàn chỉnh cần thiết lập trên trang [Dev Account](https://cast.google.com/publish), tới đây bạn có thể tắt trang web này đi được rồi, nhưng mà hãy nhớ dãy ký tự có tên là  **receiver_id** nhé.


# 5.  Thiết lập và cấu hình Receiver App

Bạn có thể tìm hiểu **very simple receiver** tại đường dẫn [CAF SDK](https://developers.google.com/cast/docs/web_receiver). Theo định nghĩa của Google thì **Receiver App** sẽ đảm nhận các nhiệm vụ sau.

- Cung cấp `interface` để hiển thị các nội dung trên thiết bị đầu cuối.
- Xử lý các tin nhắn từ **sender app** để hiển thị nội dụng cho người xem trên thiết bị nhận
- Xử lý các thao tác của người dùng trên thiết bị nhận và gửi trả lại thông tin cho **sender app**

Về cơ bản là nó xử lý mọi thông tin thiển thị trên màn hình của của thiết bị nhận. Và dưới đây là 1 ứng dụng cơ bản của **Receiver App** 

```html
<!doctype html>
<html>
  <head>
    <title>Estimate It</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>

    <style>
    body {
      background: white;
      color: black;
    }

    #container {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #content {
      font-family: 'Roboto', sans-serif;
      font-size: 6em;
    }
    </style>
  </head>
  <body>

    <div id="container">
      <span id="content">Waiting...</span>
    </div>

    <script src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>
    
    <script type="text/javascript">
        window.onload = function () {
          
          var ctx = cast.framework.CastReceiverContext.getInstance();
          var options = new cast.framework.CastReceiverOptions();
          var CHANNEL = 'urn:x-cast:com.github.quentin7b.estimateit';

          options.customNamespaces = Object.assign({});
          options.customNamespaces[CHANNEL] = cast.framework.system.MessageType.JSON;

          ctx.addCustomMessageListener(CHANNEL, function(customEvent) {
            var message = customEvent.data
            console.log("Message received from " + 
                        "[" +  customEvent.senderId +  "] " +
                        ": " + message);
            document.getElementById("content").innerHTML = message;
          });

          ctx.start(options);
        }
    </script>
  </body>
</html>
```

Phần thiết kế này mình cũng đi tham khảo, vì mình là lập trình viên Android hay ngắn gọn hơn mình là người lập trình cho **sender app** :D :D :D. Phần này sẽ giành cho các bạn chuyên về HTML, CSS và JS nhiều hơn.

# 6. Thiết lập và cấu hình Sender App

Toàn bộ phần huớng dẫn chi tiết của Google bạn có thể [tham khảo tại đây](https://developers.google.com/cast/docs/android_sender/integrate)

Đầu tiên bạn cần khai báo trong `build.gradle` các thư viện cần để sử dụng cho **Sender App**

```Kotlin
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.mediarouter:mediarouter:1.1.0'
    implementation 'com.google.android.gms:play-services-cast-framework:17.1.0'
```

Trong ứng dụng **Sender App** bạn cần biết 2 phần quan trọng sau đây
- **OptionsProvider** đây là Class giúp framework có thể kết nối tới **Receiver App** 
- **Activity** hoặc **Fragment** class sẽ quản lý giao tiếp và hành động liên quan tới ứng dụng  **Receiver App** 


## 6.1 OptionsProvider

Khởi tạo class CastOptionsProvider kế thừa từ [`OptionsProvider`](https://developers.google.com/android/reference/com/google/android/gms/cast/framework/OptionsProvider) của hệ thống. Dưới đây sẽ là phần cấu hình `CastOptionsProvider` cơ bản nhất
```Kotlin
class CastOptionsProvider : OptionsProvider {
  override fun getCastOptions(ctx: Context): CastOptions {
    return CastOptions
             .Builder()
             .setReceiverApplicationId(
               ctx.getString(R.string.receiver_id)
             )
             .build()
  }

  override fun getAdditionalSessionProviders(ctx: Context) = null
}
```

Và class `CastOptionsProvider` sẽ cần được khai trong trong file `manifest`
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="x.x.x">

  <application
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name">

      <meta-data
        android:name="com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME"
        android:value="x.x.x.CastOptionsProvider" />
  </application>

</manifest>
```

Sau khi hoàn tất bạn hãy tạo 1 Activity với 2 sự kiện cơ bản như sau.

- Hiển thị nút Cast và kết nối tới thiết bị Cast.
- Gửi 1 `message` tới thiết bị Cast


## 6.2 Hiển thị Button Cast

Hiển thị trên Menu của hệ thống
```Kotlin
override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        super.onCreateOptionsMenu(menu)
        Log.i("MainActivity", "onCreateOptionsMenu")

        /*
        <?xml version="1.0" encoding="utf-8"?>
           <menu xmlns:android="http://schemas.android.com/apk/res/android"
                 xmlns:app="http://schemas.android.com/apk/res-auto">
                <item
                    android:id="@+id/media_route_menu_item"
                    android:title="@string/cast"
                    app:actionProviderClass="androidx.mediarouter.app.MediaRouteActionProvider"
                    app:showAsAction="always" />
            </menu>
         */
        menuInflater.inflate(R.menu.estimate, menu)
        
        CastButtonFactory.setUpMediaRouteButton(getApplicationContext(), menu, R.id.media_route_menu_item)
        return true
    }
```

Hoặc hiển thị trên layout của ứng dụng

```xml
// activity_layout.xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
   android:layout_width="match_parent"
   android:layout_height="wrap_content"
   android:gravity="center_vertical"
   android:orientation="horizontal" >

   <android.support.v7.app.MediaRouteButton
       android:id="@+id/media_route_button"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:layout_weight="1"
       android:mediaRouteTypes="user"
       android:visibility="gone" />

</LinearLayout>
```

```Kotlin
// MyActivity.java
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState)
   setContentView(R.layout.activity_layout)

   val mediaRouteButton = findViewById<MediaRouteButton>(R.id.media_route_button);
   CastButtonFactory.setUpMediaRouteButton(getApplicationContext(), mediaRouteButton)

   mCastContext = CastContext.getSharedInstance(this);
}
```

Bạn có thể tìm hiểu thêm về **Cast Button** [tại đây](https://developers.google.com/cast/docs/design_checklist/cast-button)

Sự kiện Click vào **Cast Button** này đã được Google định nghĩa sẵn bên trong Framework. Khi bạn click vào cast button thì sẽ có 1 dialog hiển thị danh sách các thiết bị ChromeCast có cùng chung mạng Wifi với điện thoại của bạn.

![](https://images.viblo.asia/07c656cb-1a67-43a5-b1e2-fb92f8227fab.png)

## 6.3 Gửi tin nhắn tới thiết bị ChromeCast

```Kotlin
class MainActivity : AppCompatActivity() {

    private var castSession: CastSession? = null

    private val castContext by lazy { CastContext.getSharedInstance(baseContext) }

    private val nameSpace by lazy { baseContext.getString(R.string.namespace) }

    private var mediaSelector: MediaRouteSelector? = null
    private val sessionManagerListener = object : SessionManagerListener<CastSession> {
            override fun onSessionStarting(p0: CastSession?) {
            }

            override fun onSessionStarted(p0: CastSession?, p1: String?) {
                    castSession = p0
                    invalidateOptionsMenu()
            }

            override fun onSessionStartFailed(p0: CastSession?, p1: Int) {
            }

            override fun onSessionEnding(p0: CastSession?) {
  
            }

            override fun onSessionEnded(p0: CastSession?, p1: Int) {
                    if (pCastSession == castSession) {
                        cleanup()
                    }
                    invalidateOptionsMenu()
            }

            override fun onSessionResuming(p0: CastSession?, p1: String?) {
            }

            override fun onSessionResumed(p0: CastSession?, p1: Boolean) {
                    castSession = p0
                    invalidateOptionsMenu()
            }

            override fun onSessionResumeFailed(p0: CastSession?, p1: Int) {
            }

            override fun onSessionSuspended(p0: CastSession?, p1: Int) {
            }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.i("MainActivity", "onCreate")
        setContentView(R.layout.activity_estimate)
        
        btn_send_message.setOnClickListener {
            castSession?.sendMessage(nameSpace, Random().nextInt(5).toString())
        }

        mediaSelector = MediaRouteSelector.Builder()
                // On ajoute les intents auxquels on va répondre, ici c'est uniquement systemr
                .addControlCategory(MediaControlIntent.CATEGORY_REMOTE_PLAYBACK)
                // On spécifie notre app id
                .addControlCategory(CastMediaControlIntent.categoryForCast(baseContext.getString(R.string.receiver_id)))
                .build()
    }

    override fun onResume() {
        super.onResume()
        Log.i("MainActivity", "onResume")

        castContext.sessionManager.addSessionManagerListener(sessionManagerListener, CastSession::class.java)
        if (castSession == null) {
            castSession = castContext.sessionManager.currentCastSession
        }
    }

    override fun onPause() {
        Log.i("MainActivity", "onPause")

        castContext.sessionManager.removeSessionManagerListener(sessionManagerListener, CastSession::class.java)
        super.onPause()
    }

    override fun onStop() {
        cleanup()
        super.onStop()
    }

    private fun cleanup() {
        castSession = null
    }

}
```

Đầu tiên hãy đi từng bước một nào.

```Kotlin
private val castContext by lazy { CastContext.getSharedInstance(baseContext) }
```

Khi bạn khai báo ứng dụng của mình có sử dụng framework ChromeCast thì Framework sẽ tạo ra 1 `Instance` để sử dụng chung cho toàn hệ thống. Tức là các dụng  khác trong điện thoại của bạn cũng có tính năng **ChromeCast** thì cũng sẽ sử dụng chung `Instance`  của **CastContext** này. 

**CastContext** sẽ chứa các **CastSession**  mỗi 1 Session này sẽ thể hiển 1 liên kết từ thiết bị của bạn tới 1 thiết bị **ChromeCast** cùng chung trong 1 mạng Wifi. 

Khi bạn liên kết thiết bị di động củ  mình tới 1 thiết bị **ChromeCast** thì **CastContext** sẽ tạo ra 1 **CastSession** riêng cho liên kết đó, và bạn có thể lấy Session đó thông qua câu lệnh

```Kotlin
castSession = castContext.sessionManager.currentCastSession
```

Khi 1 liên kết được thiết lập thì chúng cũng có vòng đời như vòng đời của Activity hay Fragment vậy đó. Chúng ta sẽ dựa trên vòng đời của **CastSession** để biết khi nào thiết bị của mình bắt đầu liên kết và chia sẻ thông tin với thiết bị **ChromeCast**.

```Kotlin
// write code in onResume()
castContext.sessionManager.addSessionManagerListener(sessionManagerListener, CastSession::class.java)
```

và khi Fragment hay Activity call `onPause()` thì các bạn hãy remove Session đó đi.

```Kotlin
// write code in onPause()
castContext.sessionManager.removeSessionManagerListener(sessionManagerListener, CastSession::class.java)
```

Các bạn chú ý dòng code

```Kotlin
      btn_send_message.setOnClickListener {
            castSession?.sendMessage(nameSpace, Random().nextInt(5).toString())
        }
```

ở đây bắt sự kiện khi Click vào 1 button và thực hiện gửi 1 message lên tới thiết bị ChromeCast
- **nameSpace** được định nghĩa là "Không gian tên cho tin nhắn" và cần được bắt đầu bằng tiền tố "urn:x-cast:" và `nameSpace` này cũng sẽ được định nghĩa trên **Receiver App** 
- **Random().nextInt(5).toString()** đây là phần nội dung thông tin mà message gửi lên **Receiver App**  để hiển thị trên thiết bị đầu cuối.


> Tới đây mình cũng đoán là khá nhiều bạn chưa hình dùng được cơ chế hoạt động giữa **Sender App** và **Receiver App**.

Các bạn có thể hiểu đơn giản như thế này.

- Khi người dùng Click vào **CastButton** thì `Framework` sẽ hiển thị lên 1 danh sách các thiết bị **ChromeCast** có cùng chung mạng Wifi. Người dùng sau đó sẽ lựa chọn thiết bị mình muốn kết nối và chia sẻ thông tin. 
- Khi người dùng click chọn 1 thiết bị để kết nối thì `Framework` sẽ tự động kết nối tới thiết bị đó và trả về  thông tin cho **Sender App** thông qua **sessionManagerListener** và công việc của lập trình viên của chúng ta là bắt các sự kiện trong **sessionManagerListener** đó để xử lý. 
- Tất cả các thông tin mà **Sender App** muốn chia sẻ với **Receiver App** đều phải thông qua **castSession**. Như ở ví dụ trên mình chỉ gửi 1 thông tin khá là đơn giản từ ứng dụng điện thoại tới **Receiver App** để **Receiver App** hiển thị tới người xem.


Bài viết trên mình đã giới thiệu với các bạn các định nghĩa cơ bản nhất về **ChromeCast** và cách triển khai 1 ứng dụng cơ bản có tính năng **ChromeCast**. Trong phần sau mình sẽ huớng dẫn chi tiết hơn tới các bạn về 1 ứng dụng chia sẻ video từ điện thoại lên thiết bị TV thông qua Framework **ChromeCast**.