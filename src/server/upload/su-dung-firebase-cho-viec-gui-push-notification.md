Chào các bạn, chủ đề này mình xin nói về việc thiết lập Firebase Notification cho việc gửi và nhận tin nhắn tới ứng dụng Android trong lúc ứng dụng đang hoạt động (foreground) và lúc ứng dụng đang chạy ngầm (background). Chi tiết các phần mình sẽ trình bày như bên dưới.

# Giới Thiệu Về  Firebase Cloud Messaging (FCM)
Đầu tiên chúng ta cần tìm hiểu về Firebase Cloud Messaging là gì? Nó là một dịch vụ miễn phí của Google cung cấp một giải pháp cho việc gửi tin nhắn thông báo (notification message) đa nền tảng tới ứng dụng của người dùng.

Sử dụng FCM, bạn có thể thông báo đến một ứng dụng rằng đang có một email mới, một bản cập nhật về các tính năng mới của ứng dụng hoặc một thông tin dữ liệu nào đó thích hợp để đồng bộ… Việc gửi tin nhắn này cũng làm tăng cường tương tác với người dùng, giúp người dùng sử dụng thường xuyên ứng dụng của mình hơn như là gửi tin nhắn về các giảm giá của các sản phẩm trong ứng dụng, các sự kiện sẽ xảy ra tiếp theo trong ứng dụng… Mỗi tin nhắn gửi đến ứng dụng người dùng có kích thước tối đa là 4KB.

Với FCM, bạn có thể gửi 2 loại tin nhắn đến ứng dụng:
1. Notification messages: có thể gọi là “display message”, một loại tin nhắn gửi và hiển thị ngay lập tức, được xử lý một cách tự động từ SDK của FCM.
2. Data messages: việc nhận và hiển thị tin nhắn sẽ được ứng dụng tự quản lý tùy theo mục đích sử dụng của ứng dụng.

Tóm lại sử dụng “notification messages” khi bạn muốn FCM đảm nhận việc nhận và hiển thị tin nhắn bên trong ứng dụng của bạn một cách tự động. Ngược lại sử dụng “data messages” khi bạn muốn tự xử lý việc nhận và hiển thị dữ liệu tin nhắn.
# Các bước thiết lập từ Firebase Console cho việc gửi thông điệp
Việc thiết lập sẽ bao gồm các bước sau:
* Bước 1: Truy cập vào trang https://console.firebase.google.com thông qua địa chỉ gmail của các bạn, và tiến hành tạo 1 project cho việc gửi tin nhắn bằng cách nhấn vào nút “Add project” và đặt tên cho project của các bạn, ở đây mình tạo thử một dự án có tên là “Firebase Notification Sample”

![](https://images.viblo.asia/98674b4a-674d-4f80-96f1-d97e0875752b.png)

Sau khi tạo xong hệ thống sẽ báo như hình bên dưới, chúng ta nhấn nút “Continue” để vào giao diện quản lý chính của Firebase cho ứng dụng mới tạo.
 
 ![](https://images.viblo.asia/2a3354dc-078c-4e85-814e-fda2dd0f992e.png)
 
* Bước 2: tại thanh menu phía bên trái chúng ta chọn “Cloud Messaging” và tiến hành thiết lập loại ứng dụng là iOS, Android, Web hay Unity. Trong bài viết này chúng ta sẽ chọn cấu hình cho ứng dụng Android

![](https://images.viblo.asia/35c1b3ec-24ff-4143-9c43-f570993152b4.png)

Tiếp theo chúng ta sẽ thiết lập package name cho ứng dụng chúng ta cần tạo, đây chính là package name của ứng dụng chúng ta cần xây dựng từ Android Studio. Khi thiết lập xong nhấn nút “Register app” để hệ thống tiến hành các thao tác đăng ký ứng dụng cho bạn.

![](https://images.viblo.asia/2e8b69c4-b37d-488c-bea9-21964228dbe6.png)

* Bước 3: tiến hành download file “google-services.json” về máy tính của bạn để chuẩn bị tiến hành các bước thiết lập việc nhận tin nhắn từ phía ứng dụng của bạn.

![](https://images.viblo.asia/21f2de68-a222-439d-8e8c-12aa8b28c743.png)
# Các bước thiết lập từ phía xây dựng ứng dụng
Sau khi thiết lập xong ứng dụng từ Firebase Console, chúng ta sẽ tiếp tục thực hiện việc thiết lập một số cấu hình từ trong chính dự án của chúng ta. Các bước thiết lập như sau:

* Bước 1: ở file build.gradle của Project, thiết lập các thông tin như hình bên dưới

![](https://images.viblo.asia/c0756215-9ccb-4f7a-8d67-f62a6b418649.png)

* Bước 2: ở file build.gradle của App, thiết lập các thông tin như hình sau

![](https://images.viblo.asia/13e94a05-52c4-40f4-8534-f6ece1a0b27e.png)

* Bước 3: Copy file google-services.json mà chúng ta có được từ bước thiết lập ứng dụng trên Firebase Console vào folder “app” của ứng dụng chúng ta cần tạo.

![](https://images.viblo.asia/f929bee2-8586-4c01-8d49-cc77511a5ab9.png)

* Bước 4: trong file AndroidManifest.xml chúng ta cần tạo một service cho việc lắng nghe các thông báo gửi từ server khi app đang chạy foreground hoặc nhận các dữ liệu payload.

```xml
<service android:name=".MyFirebaseMessagingService" android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

Với Android 8.0 trở lên, chúng ta cần phải thiết lập 1 channel để app có thể nhận tin nhắn từ server, nếu không chúng ta sẽ không nhận được tin nhắn.
```xml
<!-- Set the name of the channel for Android 8.0 and higher -->
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id" />
```
# Gửi notification đến client.
## Gửi tin nhắn dạng notification message thông qua Firebase Console
Để gửi tin nhắn dạng này chúng ta vào Firebase Console và chọn ứng dụng chúng ta đã tạo, chọn menu “Cloud Messaging” và click vào “Send your first message” để đi đến màn hình gửi tin nhắn

![](https://images.viblo.asia/1202abc5-0a40-487c-a6fc-2b52bc758659.png)

Kế đến chúng ta nhập một tin nhắn đơn giản với 2 mục “Notification title” và “Notification text”, tin nhắn mà ứng dụng nhận được sẽ hiển thị cho chúng ta xem trước ở góc bên phải

![](https://images.viblo.asia/c5061a69-07f8-4a47-b9ad-ceec10b78065.png)

Kế tiếp chúng ta cần chọn Target là app chúng ta cần gửi tới, Scheduling là gửi lập tức hay một thời điểm tuỳ ý tuỳ chúng ta thiết lập. Cuối cùng nhấn nút “Review” và chọn “Publish” để thực hiện gửi.

![](https://images.viblo.asia/56fbcdbd-4da4-4601-992a-84ea9a1c0b7d.png)

Với cách gửi như trên chúng ta sẽ có 2 trường hợp:
Khi app không chạy hoặc đang chạy ở chế độ background thì tin nhắn sẽ được hiển thị trực tiếp trên thanh Notification của điện thoại, chúng ta không cần xử lý cho việc hiển thị này, việc hiển thị như hình bên dưới. Khi click vào nó sẽ mở chạy ứng dụng của chúng ta.

![](https://images.viblo.asia/cfe07059-c640-4d03-9f57-9ce160a39849.png)

Khi app đang chạy ở chế độ foreground: ứng dụng sẽ không nhận và hiển thị tin nhắn. Muốn vậy chúng ta cần tạo một class và kế thừa lớp “FirebaseMessagingService” , trong lớp này chúng ta cần override hàm “onMessageReceived” để lắng nghe các thông tin từ phía FCM gửi tới ứng dụng

```java
@Override
public void onMessageReceived(RemoteMessage remoteMessage) {
    if (remoteMessage.getNotification() != null) {
        String title = remoteMessage.getNotification().getTitle();
        String body = remoteMessage.getNotification().getBody();
        Log.d(TAG, "Message Notification Title: " + title);
        Log.d(TAG, "Message Notification Body: " + body);
        sendNotification(title, body);
    }
}
```

Sau khi lắng nghe chúng ta sẽ gửi nội dung này tới hàm “sendNotification” để tạo tin nhắn hiển thị trong Notification bar.

```java
private void sendNotification(String messageTitle, String messageBody) {
    Intent intent = new Intent(this, MainActivity.class);
    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
    PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */intent, PendingIntent.FLAG_ONE_SHOT);

    String channelId = getString(R.string.default_notification_channel_id);
    Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
    NotificationCompat.Builder notificationBuilder =
            new NotificationCompat.Builder(this, channelId)
                    .setSmallIcon(R.drawable.notification_icon_256)
                    .setContentTitle(messageTitle)
                    .setContentText(messageBody)
                    .setAutoCancel(true)
                    .setSound(defaultSoundUri)
                    .setContentIntent(pendingIntent);

    NotificationManager notificationManager =
            (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

    // Since android Oreo notification channel is needed.
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        NotificationChannel channel = new NotificationChannel(channelId,
                "Channel human readable title",
                NotificationManager.IMPORTANCE_DEFAULT);
        notificationManager.createNotificationChannel(channel);
    }

    notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());
}
```

Kết quả sẽ hiển thị như hình bên dưới khi app đang chạy và chúng ta kéo thanh notification bar xuống chúng ta sẽ thấy được tin nhắn thông báo.

![](https://images.viblo.asia/446fa0a7-feb3-42f4-927f-fe7e64d0b0b0.png)

## Gửi data message từ một payload
Việc gửi tin nhắn dưới dạng “data payload” này không được hỗ trợ từ Firebase Console, nó thường được gửi từ một phía server của ứng dụng. Server đó thường sẽ chứa thông tin token của các device, token này được gửi đến server khi chạy ứng dụng và server sử dụng thông tin token này để gửi tin nhắn đến device cần thông báo. Quy trình gửi này có thể tóm tắt trong các bước sau:

* Bước 1: server ứng dụng lựa chọn device cần thông báo, tiến hành lấy token đó kèm với tin nhắn dạng “data payload” đến cho phía Firebase server
* Bước 2: tại đây Firebase server sẽ xử lý và gửi tin nhắn đến đúng device cần nhận thông báo, Firebase server đóng vai trò như trung gian cho việc gửi tin nhắn.
* Bước 3: ứng dụng của người dùng sẽ nhận được tin nhắn từ phía Firebase gửi dưới dạng “data payload”, lắng nghe các sự kiện từ hàm “onMessageReceived”, phân tích và tạo notification đến người dùng.

Trong bài viết này chúng ta không đi đến phần thiết lập tin nhắn cho phía server, do đó chúng ta sẽ dùng postman () để kiểm tra việc gửi tin nhắn dạng payload. Các bước như sau: 
* Bước 1: lấy token từ lúc chạy ứng dụng, trong hàm onCreate của Activity ta thực hiện lắng nghe và lấy token của device
```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    FirebaseInstanceId.getInstance().getInstanceId().addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
        @Override
        public void onComplete(@NonNull Task<InstanceIdResult> task) {
            if(!task.isSuccessful()) {
                  return;
            }
            // Get new Instance ID token
            String token = task.getResult().getToken();
        }
    });
}
```
* Bước 2: lấy Server Key từ Firebase Console để chúng ta có thể gửi thông điệp tới Firebase Console. Để lấy chúng ta vào Firebase Console chọn Project Setting → Cloud Messaging

![](https://images.viblo.asia/0c68f4f9-7b8d-4bdf-9e97-69ba4ea8d59f.png)

* Bước 3: thêm code xử lý dữ liệu lắng nghe từ hàm “onMessageReceived”

```java
if (remoteMessage.getData().size() > 0) {
    Log.d(TAG, "Message data payload: " + remoteMessage.getData());
    Map<String, String> dataPayload = remoteMessage.getData();
    String title = dataPayload.get("title");
    String body = dataPayload.get("body");
    Log.d(TAG, "Message Notification Payload Title: " + title);
    Log.d(TAG, "Message Notification Payload Body: " + body);
    sendNotification(title, body);

}
```

* Bước 4: sử dụng Postman (https://www.getpostman.com/downloads/) để gửi tin nhắn, cấu trúc như mô tả bên dưới
```json
Sử dụng Postman để gửi một POST message
URL: https://fcm.googleapis.com/fcm/send
Header:
    Content-Type:application/json
    Authorization:key="SERVER API KEY insert here"
Body
     { "data": {
         "title": "Message payload title",
         "body": "Message payload body"
        ...
         },
         "to" : token_id_of_device
     }
```

Các ảnh minh hoạ cho thiết lập gửi tin từ Postman
![](https://images.viblo.asia/ce58abb8-1b73-4b33-818a-33daea8173c9.png)

![](https://images.viblo.asia/477cb563-b153-4888-9433-4132be1fc6a7.png)

Kết quả nhận được

![](https://images.viblo.asia/2a8be2a8-ce08-4d49-8d0e-136db92913a2.png)

Bài viết đến đây là kết thúc, xin cảm ơn các bạn đã đọc :bow::bow::bow:
# Tham khảo
https://firebase.google.com/docs/cloud-messaging/concept-options

https://viblo.asia/p/push-notification-voi-firebase-cloud-messaging-gDVK2GyXZLj

https://vntalking.com/push-notification-voi-firebase-trong-android.html

https://viblo.asia/p/push-notification-trong-android-voi-firebase-jvElaL0DZkw