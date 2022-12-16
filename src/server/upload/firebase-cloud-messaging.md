**Firebase Clound Messaging (FCM)** là giải pháp tin nhắn đa nền tảng cho phép bạn phân phối tin nhắn đáng tin cậy mà hoàn toàn không tốn một chi phí nào.

Sử dụng FCM , bạn có thể thông báo tới ứng dụng client rằng một email mới hay dự liệu mới đã sẵn sàng để đồng bộ. Bạn có thể gửi tin nhắn thông báo để thúc đẩy tương tác và giữ chân người dùng.
Cho các trường hợp tin nhắn cấp bách, một tin nhắn có thể chuyển tải lên tới 4kb tới ứng dụng Client.


Việc sử dụng Google Cloud Message  không được chấp nhận thì sao ?

Tìm hiểu thêm về cách chuyển sang FCM [tại đậy](https://developers.google.com/cloud-messaging/android/android-migrate-fcm)


### Vậy nó làm việc như thế nào chúng ta cùng tìm hiểu nhé .
Việc thực thi FCM bao gồm 2 hợp thành chính cho việc gửi và nhận :
1. Môi trường đáng tin cậy như Cloud Functions cho Firebase hoặc máy chủ ứng dụng để xây dựng , nhắm mục tiêu và gửi tin nhắn
2. Android, IOS, hoặc web(JavaScript) ứng dụng client là việc nhận tin nhắn

Bạn có thể gửi tin nhắn qua SDK Admin  hoặc HTTP và XMPP APIs. Cho việc kiểm tra và việc gửi tin nhắn tiếp thị , Bạn cũng có thể sử dụng Notifications composer.

**Bước thực thi**
1) Thiết Lập FCM SDK 
 Thiết lập  Firebase và FCM  trên ứng dụng của bạn theo hướng dẫn để thiết lập trên nền tảng của ban
2) Phát triển ứng dụng client của bạn
 Thêm việc xử lý tin nhắn, đăng kí chủ đề hoặc các tính năng tùy chọn khác tới ứng dụng client của bạn. Trong suốt sự phát triển , bạn có thể dễ dàng gửi tin nhắn thử nghiệm từ Notifications Composer. 
3) Phát triển ứng dụng server của bạn
Quyết định xem bạn có muốn sử dụng SDK Admin hoặc một trong số các giao thức  máy chủ để tạo logic gửi của bạn hay không- logic để xác thực, xây dựng yêu cầu gửi, xử lý câu trả lời ..v..v. Sau đó xây dựng logic trong môi trường đáng tin cậy của bạn. Lưu ý rằng nếu bạn muốn sử dụng gửi tin nhắn từ ứng dụng client , bạn phải sử dụng XMPP, và Cloud Functions không hỗ trợ kết lỗi liên tục theo yêu cầu cầu của XMPP

**Bước tiếp theo**

Chạy ví dụ trên Android. Nhiều ví dụ chạy và xem code để gửi tin nhắn kiểm tra tới thiết bị đơn sử dụng Firebase Console
Hướng dẫn cho Android
Thêm Firebase Cloud Messaging tới Android
Thiết lập môi trường đáng tin cậy, Nếu bạn viết logic gửi đi của bạn bằng Node.js, bạn có thể sử dụng Admin Node.js SDK FCM API và dễ dàng deploy code của bạn trên Cloud Function cho Firebase.
Học nhiều hơn về gửi tải trọng dữ liệu, thiết lập mức độ  ưu tiên của tin nhắn  và một số lựa chọn tin nhắn khác mà sẵn sàng với FCM
Chuyển GCM đang tồn tại ở IOS hoặc Android của bạn sang việc sử dụng Firebase Cloud Mesage

**Thiết lập Firebase Cloud Mesaging cho ứng dụng Android**

Để viết FCM cho ứng dụng của bạn. chúng ta sử dụng [FirebaseMessaging](https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/package-summary) API và Android Studio 1.4 hoặc cao hơn với Gradle. Hướng dẫn ở trang này là sau khi bạn đã hoàn thành các bước thêm Firebase tới dự án android của bạn.

FCM clients yêu cầu thiết bị chạy trên Android 4.0 hoặc cao hơn cũng đã cài đặt Google Play Store, hoặc máy ảo chạy trên android 4.0 với Google APIs. Lưu ý rằng bạn không bị giới hạn việc triển khai ứng dụng android của bạn thông qua Google Play Store

**Thiết lập Firebase và  FCM SDK**
1. Nếu bạn chưa thêm Firebase vào dự án của bạn, bạn có thể bắt đầu từ [đây](https://firebase.google.com/docs/android/setup)  

2. Trong Android Studio, thêm FCM dependency tới file app-level build.gradle của bạn:
`implementation 'com.google.firebase:firebase-messaging:17.0.0'`

**Chỉnh sửa AndroidManifest:**
- 1 service thừa kế từ FirebaseMessagingService. Đây là cần thiết nếu bạn muốn xử lý bất kì tin nhắn thông báo nào  trên ứng dụng của bạn chạy dưới background. Để nhận thông báo trong foreground ứng dụng, để nhận dữ liệu, để gửi các thư ngược lại và nhiều hơn nữa  ... Bạn phải thừa kế từ service này.

```
<service
    android:name=".MyFirebaseMessagingService">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT"/>
    </intent-filter>
</service>
```

- 1 service thừa kế FirebaseInstanceIdService để xử lý việc tạo, tái tạo , và cập nhập lại việc đăng kí token. Đây là cần thiết cho việc gửi  tới 1 thiết bị cụ thể hoặc tạo 1 nhóm thiết bị .

```
<service
    android:name=".MyFirebaseInstanceIDService">
    <intent-filter>
        <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
    </intent-filter>
</service>
```

- (Không bắt buộc) Trong thành phần ứng dụng, các thành phần để thiết lập mặc định icon và màu. Android sử dụng các giá trị này khi các tin nhắn đến không thiết lập icon hoặc màu sắc 
```
<!-- Set custom default icon. This is used when no icon is set for incoming notification messages.
     See README(https://goo.gl/l4GJaQ) for more. -->
<meta-data
    android:name="com.google.firebase.messaging.default_notification_icon"
    android:resource="@drawable/ic_stat_ic_notification" />
<!-- Set color used with incoming notification messages. This is used when no color is set for the incoming
     notification message. See README(https://goo.gl/6BKBk7) for more. -->
<meta-data
    android:name="com.google.firebase.messaging.default_notification_color"
    android:resource="@color/colorAccent" />
```

- (Không bắt buộc) Từ Android 8.0 (API level 26) và cao hơn, các thông báo đã được hỗ trợ và đề xuất. FCM cung cấp thông báo mặc định với cài đặt cơ bản. Còn nếu bạn muốn thông báo với giao diện của riêng mình, bạn hãy đặt default_notification_channel id thành ID thông báo của bạn như hình bên dưới.  FCM sẽ sử dụng giá trị này với bất cứ tin nhắn nào đến mà không thiết lập thông báo nào 

```
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id"/>
```

Nếu FCM quan trọng đối với chức năng của các ứng dụng android, hãy đảm bảo rằng  minSdkVersion 8 hoặc cao hơn trong build.gradle  ứng dụng. Điều này đảm bảo rằng , ứng dụng của bạn không thể được cài đặt trong môi trường  mà nó không thể chạy được đúng như ý muôn.

**Truy xuất đăng kí token của thiết bị**

Trong khi khởi tạo ứng dụng, FCM SDK đã tạo ra token đăng kí  cho ứng dụng của bạn. Nếu bạn muốn chú trọng vào thiết bị đơn lẻ hoặc tạo nhóm thiêt bị , bạn sẽ cần truy xuất vào token này bằng cách thừa kế FirebaseInstanceIdService

Phần này mô tả làm sao để lấy ra token và làm sao để theo dõi thay đổi token. Bới vì token có thể được tái sử dụng sau khi khởi động lại . Bạn  lên truy xuất để cập nhập token đăng kí mới nhất

Token đăng kí  cỏ thể bị thay đổi khi :
* Ứng dụng xóa ID;
* Ứng dụng  lưu lại trên thiết bị mới
* Người sử dụng gỡ/cài  lại ứng dụng
* Người sử xóa toàn bộ dữ liệu của ứng dụng

**Lấy token đăng kí hiện tại**

Khi bạn cần truy xuất token hiện tại , bạn gọi hàm FirebaseInstanceId.getInstance().getToken(). Hàm này trả về null nếu token không có sự thay đổi

Theo dõi việc sinh token
Hàm onTokenRefresh được kích hoạt bất cứ khi nào token mới được sinh ra. Bạn phải chắc chắn rằng bạn đã thêm service vào AndroidManifest của bạn. Sau đó bạn gọi hàm getToken trong onTokenRefresh như đoạn code bên dưới đây :

```
@Override
public void onTokenRefresh() {
    // Get updated InstanceID token.
    String refreshedToken = FirebaseInstanceId.getInstance().getToken();
    Log.d(TAG, "Refreshed token: " + refreshedToken);

    // If you want to send messages to this application instance or
    // manage this apps subscriptions on the server side, send the
    // Instance ID token to your app server.
    sendRegistrationToServer(refreshedToken);
}
```

Sau khi bạn nhận được token, bạn có thể gửi nó tới ứng dụng server của bạn và lưu nó lại bằng phương pháp của bạn. 

**Kiểm tra  Google Play services**

Nhiều ứng dụng  dựa vào Play Services SDK  nên kiểm tra thiết bị có thích hợp Google Play services APK trước khi truy xuất  vào các chức năng của Google Play Services. Nó được nhắc nhở trong 2 nơi : trong  hàm onCreate và trong onResume. Kiểm tra trong onCreate() để chắc chắn rằng ứng dụng không thể sử dụng mà không cần kiểm tra thành công. Kiểm tra trong onResume() đảm bảo rằng nếu người sử dụng quay trở lại  ứng dụng đang chạy thông qua một số phương pháp khác ví dụ như nút quay lại ....

Nếu thiết bị không phù hợp với Version của Google Play Services , ứng dụng của bạn có thể gọi GoogleApiAvailability.makeGooglePlayServicesAvailable() để cho phép người sử dụng tải Google Play Services từ Play Store

**Ngăn ngừa việc khởi tạo**

Firebase sinh ra cá thể ID, Mà FCM sử dụng để tạo ra token và Analytics sử dụng để thu thập dữ liệu. Khi 1 cá thể ID được tạo ra. Thư viện sẽ tải lên số nhận dạng và dữ liệu cấu hình Firebase. Nếu bạn muốn ngăn tự động sản sinh cá thể ID, hãy tắt tự động chạy cho FCM và Analytics (Bạn phải tắt cả hai) bằng cách thêm metadata values tới AndroidManifest.xml của bạn.

```
<?xml version="1.0" encoding="utf-8"?>
<application>
  <meta-data android:name="firebase_messaging_auto_init_enabled"
             android:value="false" />
  <meta-data android:name="firebase_analytics_collection_enabled"
             android:value="false" />
</application>
```

Để bật lại FCm, trong lúc chạy gọi :

`FirebaseMessaging.getInstance().setAutoInitEnabled(true);`

Bài sau mình sẽ hưỡng dẫn các bạn gửi tin nhắn từ Cloud Messaging từ Firebase tới thiết bị qua 3 cách :
+ Gửi cho tất cả thiết bị
+ Gửi cho 1 thiết bị cụ thể
+ Gửi cho 1 chủ đề.

Cảm ơn bạn đã đọc qua bài viết của mình. 

Tài liệu tham khảm :

https://firebase.google.com/docs/cloud-messaging/

https://firebase.google.com/docs/cloud-messaging/android/client

Bạn có thể làm theo video sau : https://www.youtube.com/watch?v=trx5beU4g6E