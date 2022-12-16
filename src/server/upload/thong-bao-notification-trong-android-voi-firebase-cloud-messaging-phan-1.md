# Giới thiệu
Chào mọi người, cũng lâu lắm rồi mình mới trở lại đây. Chắc hẳn các bạn đã quá quen thuộc với các thông báo (Notification) trên các ứng dụng điện thoại chẳng hạn như Messenger, Shopee,... Thì gần đây mình có tìm hiểu về Android cũng như việc xử lý gửi và nhận các thông báo như vậy để làm đồ án trên trường. Đó là một hệ thống về bán đồ ăn vặt + quản lý shipper, nghĩa là khi có một người dùng đặt hàng thì đơn hàng sẽ được gửi dưới dạng các thông báo (Notification) đến các shipper trong một phạm vi nào đó. Đó là về đồ án của mình, còn trong bài viết này mình sẽ chia sẻ với các bạn dựa trên những gì mình đã tìm hiểu được về việc gửi và nhận thông báo với `Firebase Cloud Messaging`. Hy vọng vài viết này sẽ giúp những bạn mới làm quen với Android biết thêm về một chức năng vô cùng thú vị :D.

# Firebase Cloud Messaging là gì?

`Firebase Cloud Messaging (FCM)` là một dịch vụ gửi thông báo, tin nhắn đa nền tảng được cung cấp bởi Google, cho phép bạn gửi tin nhắn, thông báo một cách đáng tin cậy và hoàn toàn miễn phí tới các thiết bị đã được đăng ký với FCM.

Nguyên tắc hoạt động: Các thiết bị client sẽ đăng ký device_token lên cho FCM. Các thông báo, tin nhắn được soạn và gửi từ một website, từ `Notifications composer` của firebase cung cấp, .... FCM sẽ nhận những thông báo này và xử lý gửi về các thiết bị đã đăng ký với FCM từ trước. Khi các thiết bị có kết nối mạng thì thông báo sẽ được gửi về ứng dụng thành công.

# Các loại FCM Messages
Với FCM, có 2 loại thông báo, tin nhắn mà bạn có thể gửi tới ứng dụng, đó là:
* **Notification messages**: Đôi khi được gọi là "thông báo (tin nhắn) hiển thị", chúng được xử lý tự động bởi `FCM SDK`. `Notification messages` chứa các key dữ liệu đã được định nghĩa trước.  Sử dụng `Notification messages` khi bạn chỉ muốn hiển thị các thông báo đến các ứng dụng clients.
* **Data messages**:  Là thông báo (tin nhắn) sẽ được xử lý bởi các ứng dụng client. `Data messages` chứa các cặp key - value do người dùng định nghĩa. Sử dụng `Data messages` khi bạn muốn xử lý các thông báo trên chính ứng dụng của bạn.
# Nhận messages trên ứng dụng (Android)
Thông báo Firebase hoạt động khác nhau tùy thuộc vào trạng thái của ứng dụng (`Background`/`Foreground`). Trong android, để nhận Firebase message thì cần phải tạo một `service`  và extend `FirebaseMessagingService`. Để xử lý các thông báo nhận được bạn cần override phương thức `onMessageReceived`. Phương thức này xử lý được hầu hết các loại tin nhắn, ngoại trừ các trường hợp sau:
* Nhận `Notification messages` khi ứng dụng đang ở trạng thái `background`. Trong trường hợp này, thông báo sẽ được gửi đến khay hệ thống của thiết bị, khi người dùng chạm vào thông báo sẽ mở trình khởi chạy ứng dụng mặc định.
* Nhận thông báo có chưa cả `Notification messages` và `Data messages` khi ứng dụng đang ở trạng thái `background`. Trong trường hợp này, phần `Notification` sẽ được gửi đến khay hệ thống, còn phần `Data` sẽ được sử dụng cho trình khởi chạy các Activity khi chạm vào thông báo.

Tổng quát về việc xử lý nhận  Firebase messages:

| Trạng thái ứng dụng | Notification messages | Data messages | Cả 2 loại messages |
| -------- | ------------------------ | ----------------------- | ---------------|
| Foreground     | `onMessageReceived()` | `onMessageReceived()`   |`onMessageReceived()`  |
|  Background    | Khay hệ thống     | `onMessageReceived()`   |  Phần `Notification`: khay hệ thống. Phần `Data`:  phần bổ sung cho Intent. |

Sau đây chúng ta cùng tìm hiểu về loại firebase message đầu tiên là `Notification messages` bằng cách gửi và nhận chúng thông qua một ứng dụng Android nhé :D
# Tìm hiểu về Notification messages
## Cấu trúc :  
Dưới đây là cấu trúc của 1 `Notification messages`:

```
{
  "message":{
    "token":"bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
    "notification":{
      "title":"Portugal vs. Denmark",
      "body":"great match!"
    }
  }
}
```
Các key `notification`, `title`, `body` là các key dữ liệu được định nghĩa cố định trong  `Notification messages`.
## Tạo ứng dụng Android xử lý nhận Notification messages

1.    Tạo ứng dụng bằng Android Studio (version hiện tại mình đang dùng là 3.2.1).
2.    Kết nối với Google firebase
    
        *    Đầu tiên bạn cần vào [Firebase console](https://firebase.google.com/?hl=vi) để đăng nhập và tạo một project như ảnh sau:
        ![](https://images.viblo.asia/9d0df4d7-92cb-430b-873f-299afe7668b7.png)
        *    Mở ứng dụng mà bạn vừa tạo trên Android Studio và tiến hành kết nối đến Firebase của bạn:  Đầu tiên bạn cần đăng nhập tài khoản Google mà bạn đã dùng ở bước trên vào Android Studio. Sau đó click vào **Tools** -> **Firebase** , chọn phần **Cloud Messaging** , click vào **Setup**  và sau đó click vào **Connect to Firebase** để chọn Firebase project mà bạn đã tạo ở bước trước để kết nối:
                ![](https://images.viblo.asia/7e7f34aa-9dfd-4b11-b59a-367eee2a847c.png)
                ![](https://images.viblo.asia/45df3776-be8d-4b74-a5a8-981a334179c8.png)
        
        *    Thêm Firebase Cloud Messaging (FCM) vào ứng dụng: Bạn cần thêm một số FCM dependency sau đây vào file `build.grade(app)`:
                ```
                dependencies {
                    ....

                    implementation 'com.google.firebase:firebase-core:16.0.6'
                    implementation 'com.google.firebase:firebase-messaging:17.3.4'
                }

                apply plugin: 'com.google.gms.google-services'
                ```
                Sau khi thêm thì bạn cần đồng bộ lại bằng cách Click vào **Sync Now** ở góc trên bên phải của Android Studio.

 3.    Xử lý nhận thông báo và hiển thị thông báo nổi trên màn hình:
 
        Bạn cần tạo một service có tên là **MyFirebaseService** và extends từ **FirebaseMessagingService** như sau:
        ```
        public class MyFirebaseService extends FirebaseMessagingService {
            private static final String TAG = "MyFirebaseService";

            @Override
            public void onMessageReceived(RemoteMessage remoteMessage) {
                // handle a notification payload.
                if (remoteMessage.getNotification() != null) {
                    Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());
                    
                    sendNotification(remoteMessage.getNotification().getBody());
                }
            }

            @Override
            public void onNewToken(String token) {
                Log.d(TAG, "Refreshed token: " + token);

                sendRegistrationToServer(token);
            }

            private void sendRegistrationToServer(String token) {
                // TODO: Implement this method to send token to your app server.
            }

            private void sendNotification(String messageBody) {
                Intent intent = new Intent(this, MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);

                String channelId = getString(R.string.project_id);
                Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

                NotificationCompat.Builder notificationBuilder =
                        new NotificationCompat.Builder(this, channelId)
                                .setSmallIcon(R.drawable.ic_launcher_background)
                                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.ic_launcher_background))
                                .setContentTitle(getString(R.string.project_id))
                                .setContentText(messageBody)
                                .setAutoCancel(true)
                                .setSound(defaultSoundUri)
                                .setContentIntent(pendingIntent)
                                .setDefaults(Notification.DEFAULT_ALL)
                                .setPriority(NotificationManager.IMPORTANCE_HIGH)
                                .addAction(new NotificationCompat.Action(
                                        android.R.drawable.sym_call_missed,
                                        "Cancel",
                                        PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT)))
                                .addAction(new NotificationCompat.Action(
                                        android.R.drawable.sym_call_outgoing,
                                        "OK",
                                        PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT)));

                NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

                // Since android Oreo notification channel is needed.
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    NotificationChannel channel = new NotificationChannel(
                            channelId,
                            "Channel human readable title",
                            NotificationManager.IMPORTANCE_DEFAULT);

                    notificationManager.createNotificationChannel(channel);
                }

                notificationManager.notify(0, notificationBuilder.build());
            }
        }

        ```
        
        Mình sẽ giải thích sơ qua về các method ở trên nhé:
               
        * `onMessageReceived()`: Phương thức này sẽ chạy khi có thông báo từ firebase gửi về. Cần lưu ý rằng đối với loại thông báo `Notification messages` thì phương thức này chỉ chạy khi ứng dụng của bạn đang ở trạng thái `Foreground`, còn nếu ứng dụng đang ở trạng thái `Background ` thì thông báo sẽ được hiển thị trong khay thông báo của thiết bị và phương thức này sẽ không được chạy (Như bảng mình đã trình bày ở phần trên). Đây cũng chính là nguyên nhân mình tạo Service xử lý hiển thị thông báo để cho các bạn thấy rõ việc xử lý nhận thông báo của ứng dụng đối với loại thông báo là `Notification messages`.
        * `onNewToken()`: Khi một thiết bị cài đặt ứng dụng thì nó sẽ đăng ký một device_token lên cho Firebase để Firebase có thể dựa vào các token này để gửi các thông báo về thiết bị. Với phương thức này bạn có thể lấy được token đó. Bạn có thể lưu token này vào Database để phục vụ cho các chức năng chẳng hạn như gửi thông báo, tin nhắn từ một website về các thiết bị,...
        * `sendNotification()`: Đây là phương thức hiển thị thông báo đã nhận được dưới dạng một popup nổi trên màn hình thiết bị, mình đã thiết lập có thêm 2 button là **OK** và **Cancel** để phân biệt với thông báo được xử lý hiển thị trên khay hệ thống khi ứng dụng ở trạng thái `Foreground`.
 
         Tiếp theo bạn cần đăng ký Service này bằng cách copy và dán đoạn code sau vào file  `AndroidManifest.xml`:

        ```
        <service android:name=".Services.MyFirebaseService">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
        ```

        Bạn tiến hành build ứng dụng ra máy ảo (hoặc máy thật) (máy mình hơi yếu nên mình build ứng dụng ra máy thật luôn, hehe :D). Okie, vậy là đã xong 1 ứng dụng nho nhỏ nhận thông báo. Việc tiếp theo là chúng ta cần gửi thông báo để test thôi :D
        
## Gửi Notification messages

Bạn có thể gửi `Notification messages` thông qua một ứng dụng web, hoặc từ `Notification Composer` của Firebase,.... Ở bài tiếp theo về xử lý thông báo `Data messages` thì mình sẽ hướng dẫn các bạn gửi thông báo từ một ứng dụng website, còn bài này mình sẽ dùng `Notification Composer` cho đơn giản nhé :D 

Các bạn vào  [Firebase console](https://firebase.google.com/?hl=vi), đăng nhập và chọn Project tương ứng mà bạn đã tạo ở bước trên. Trên thanh sidebar bên trái các bạn chọn mục **Cloud Messaging** và click vào **Send your first message** sau đó nhập nội dung thông báo, chọn ứng dụng android mà bạn đã kết nối đến Firebase ở trên và nhấn **Publish** để gửi thông báo.

![](https://images.viblo.asia/105d5777-9a48-4402-96a1-e2dd3070da1c.png)

## Demo
Mình sẽ thực hiện gửi thông báo `Notification messages` với ứng dụng nhận ở hai trạng thái là `Foreground` và `Background`:

**1. Ứng dụng ở trạng thái `Foreground`:**

* Màn hình thiết bị trước khi gửi
![](https://images.viblo.asia/61e6ebc1-8fb9-4385-8828-ac3cb7f74e84.png)

* Nội dung thông báo
![](https://images.viblo.asia/1958039e-e85c-4090-ae09-f9f1ae960ef7.png)

* Kết quả
![](https://images.viblo.asia/8f72192b-224e-4e45-b8eb-441dd6142f87.png)
![](https://images.viblo.asia/0bc4f940-aa69-4c4b-a329-730c937bd9c4.png)

**2. Ứng dụng ở trạng thái `Background`:**

* Màn hình thiết bị trước khi gửi
![](https://images.viblo.asia/d8c13cb1-977b-4ac2-a21b-0b7e76272f76.png)
* Nội dung thông báo
![](https://images.viblo.asia/36cf21db-4671-4f38-a8ab-e935c15bc582.png)
* Kết quả
![](https://images.viblo.asia/42425932-44ec-438b-8be5-8517472a1809.png)

Bạn có thể thấy rõ ràng, trong trường hợp ứng dụng ở `Foreground` thì thông báo hiển thị nổi lên màn hình và có 2 button `OK` và `Cancel` mình đã xử lý trong `Service` nghĩa là phương thức `onMessageReceived()` đã được gọi. Ngược lại ở trạng thái `Background` thông báo chỉ có Title và content và không hề có 2 Button mình đã thêm, chứng tỏ nó không hề qua phương thức `onMessageReceived()`. Đây cũng chính là đặc điểm của thông báo dạng `Notification messages` trong `Firebase Cloud Messaging`.
 
# Kết luận

Qua bài viết này mình đã giới thiệu cho các bạn về thông báo (Notification) trong android với `Firebase Cloud Messaging`. Và hướng dẫn các bạn gửi và nhận thông báo dạng `Notification messages` thông qua một ứng dụng đơn giản. Mình cũng là newbie android và viết dựa trên những gì mình hiểu nên hy vọng bài viết này sẽ có ích cho các bạn, đặc biệt là những bạn mới tìm hiểu về Android nói chung và Notification nói riêng. 

Ở phần 2 mình sẽ trình bày về loại Firebase message còn lại là `Data messages`, hẹn gặp lại các bạn ở bài viết sau nhé :D (Đã có [Phần 2](https://viblo.asia/p/thong-bao-notification-trong-android-voi-firebase-cloud-messaging-phan-2-Qbq5QMLw5D8) nhé mọi người)
# Tham khảo
https://firebase.google.com/docs/cloud-messaging/