Notification trong Android giúp bạn dễ dàng thông báo đến User những thông tin quan trọng hoặc những nhắc nhở cần thiết để đảm bảo rằng User của bạn không bị miss bất kì thông tin nào. Mình sẽ đi nhanh qua những điều cơ bản nhất để bạn có thể bắt đầu cũng như implement một Push Notification trong Android. 

## First 
Để bắt đầu trước tiên chúng ta cần setup một vài thứ về Firebase trong ứng dụng của chúng ta. Đầu tiên chúng ta cần tạo một project trên [Firebase console](https://console.firebase.google.com/u/0/?pli=1) sau đó chúng ta sẽ thêm app chúng ta vào project này. Chỉ cần click Project của bạn, tiếp theo nhấn vào button **[+ Add app]** và sau đó là Android icon. Sau khi thành công bạn sẽ thấy một vài thông tin cơ bản của project, và chúng ta sẽ cần download file cầu hình `google-services.json`, file này sẽ cần cho việc connect với Firebase và App của chúng ta. 


## Connecting your app to Firebase
Bây giờ sau khi setup xong một số thứ trên Firebase console, chúng ta sẽ cần add một vài thứ nữa vào `build.gradle` file của project. Và bạn cũng đừng quên việc thêm Google’s maven repository vào block `repositories` cũng như block `allprojects` nhé. 

```
buildscript {
  repositories {
    google()
    // ... Your other repo's go here
  }

  dependencies {
    // ... Your other dependencies
    classpath 'com.google.gms:google-services:4.2.0'
  }
}

allprojects {
  // ...

  repositories {
    google()
    // ... Your other repo's go here
  }
}
```

sau khi xong, chúng ta tiếp tục di chuyển đến file `build.gradle` trong app và add các dependency của Firebase cũng như apply các Google Services plugin ở đầu file. 

```
dependencies {
  // ... Put your other dependencies here
 
  implementation 'com.google.firebase:firebase-core:16.0.9'
}

apply plugin: 'com.google.gms.google-services' // Make sure you apply the plugin at the bottom of the file
```

Bên cạnh đó bạn cũng đừng quên thêm file cấu hình `google-services.json` đã được download lúc nãy, chúng ta cần put nó vào directory của `app`, phần còn lại chúng sẽ tự giải quyết.

## Lấy message của chúng ta???
Chúng ta đã vừa hook app với Firebase project, và giờ chúng ta sẽ kết hợp nó với cloud message. [FCM](https://firebase.google.com/docs/cloud-messaging) (Firebase Cloud Messaging) là một tiêu chuẩn mới cho notifications kể từ khi Google bỏ đi GCM. Để sử dụng nó chúng ta sẽ cần add dependency này vào file build.gradle của app. 

`implementation 'com.google.firebase:firebase-messaging:18.0.0'`

Nếu chúng ta muốn có quyền control việc xử lý notification trong foreground, xử lý dữ liệu payload trong notification hoặc muốn nhắm vào các thiết bị đơn lẻ hay các groups đặc biệt khi gửi một notification chẳng hạn, thì chúng ta sẽ cần một [`Service`](https://developer.android.com/guide/components/services) được extend từ [`FirebaseMessagingService`](https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/FirebaseMessagingService), ở đây mình gọi là `MessagingService.kt`.

```
class MessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        // Sync your token with the backend here (optional)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage?) {
        // Handle the incoming message here
    }
}
```

Về cơ bản đây sẽ là nơi chúng ta xử lý các message đến, hoặc có thể refresh/create token. Bạn có thể gửi token đến backend trong callback `onNewToken`như ví dụ, ngoài ra bạn có thể làm một vài việc cũng như build notification trong `onMessageReceived`. Hãy nhớ rằng, không nhất thiết phải build notification để show bây giờ, chúng ta sẽ làm điều đó sau. 

Đừng quên khai báo `MessageService` của chúng ta trong `Manifest.xml`nhé, vì nếu không làm điều này service của chúng ta sẽ không hoạt động đâu.

```
<!-- Replace <mypackage> with the package of MessagingService -->
<service
    android:name="<mypackage>.MessagingService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

OK!!! Bây giờ chúng ta có thể xử lý thông báo đến thông qua messaging service của chúng ta rồi. 

## Nhưng onMessageReceived của chúng ta đang không được gọi 😐
Điều này liên quan đến cách hệ thống xử lý notification của chúng ta và cũng sẽ phụ thuộc vào payload của thông báo của bạn. Mặc định thì `onMessageReceived` chỉ được gọi khi app ở **foreground**.  Có nghĩa rằng app đang ở **background** hoặc không opened, hệ thống sẽ tự handle notification cho chúng ta.

Nếu bạn muốn handle notification trong 2 trường hợp thì bạn sẽ có 2 option: Sau khi click notification hoặc xử lý ngay lặp tức khi nó đến. 

```
{
  "message":{
    "token":"...",
    "notification":{
      "title":"This is your notification's title",
      "body":"This is the body text of your notification"
    },
    "data" : {
      "first_name" : "Android",
      "last_name" : "Roboto"
    }
  }
}
```

Mỗi khi có một `title` hoặc một `body` trong thông báo của chúng ta, hệ thống sẽ xử lý nó trong background. Khi có data trong payload và bạn click vào notification, bạn có thể xử lý nó trong service. 

Nếu không có `title` và `body` trong thông báo, thông báo đến sẽ luôn get service của chúng ta. Có nghĩa rằng chúng ta phải tự xây dựng notification nếu muốn show nó. 

## Các notification channels thì sao???
Từ Android O (API 26), chúng ta có support cho các notification channels. Nếu chúng ta không định nghĩa bất kì thứ gì. Tất cả thông báo của chúng ta sẽ kết thúc trong default channel. Tuy nhiên chúng ta có thể xác định default channel  bằng việc add snippet sau trong manifest. 

```

<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/my_default_notification_channel" />
```

Nếu thông báo không chứa channel id, chúng sẽ kết thúc trong custom default channel này. 

Bên cạnh đó, chúng ta hoàn toàn có thể định nghĩa channels của chính chúng ta, bạn có thể làm nó trong class `Application`.

```
class MyApp : Application() {
  override fun onCreate() {
    super.onCreate()

    // Create notification channels
    initNotificationChannels()

    // ... Do other stuff
  }

  private fun initNotificationChannels() {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          // Build your channel
          val myChannel = NotificationChannel(
                  MessagingService.MY_CHANNEL_ID,
                  getString(R.string.my_channel_title), // The channel title in the app settings 
                  NotificationManager.IMPORTANCE_DEFAULT)
                  .apply {
                      // The description of the channel in the app settings
                      description = getString(R.string.channel_podcasts_description)
                  }

          // Register the channel with the system
          val notificationManager: NotificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
          notificationManager.createNotificationChannel(myChannel)
      }
  }
  ```
  
  Giờ đây, bạn có thể delegate notifications cho channel của mình thông qua payload của  thông báo hoặc thông qua dịch vụ MessagingService của bạn.
  
  *Hi vọng những gì mình đã trình bày trên có thể giúp ích phần nào cho bạn dễ dàng hơn trọng việc quản lý hoặc implement notification trong Android*
  
  ## Tham khảo
  1. https://proandroiddev.com/notifications-on-android-the-basics-9cc648b4fd1d