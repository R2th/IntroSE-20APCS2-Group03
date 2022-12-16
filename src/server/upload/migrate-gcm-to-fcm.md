Bạn có thể migrate một app Android có sẵn đang sử dụng GCM sang Firebase Cloud Messaging (FCM) với hướng dẫn dưới đây. Trước khi bắt đầu, có một số điều cần nhớ:
- GCM và FCM SDKs không thể cùng tồn tại trên một ứng dụng.
- GCM token được lấy thông qua GoogleCloudMessaging.register() hoặc InstanceID.getToken() có thể sử dụng trên FCM mà không cần thay đổi hoặc làm mới.

### 1. Import project GCM của bạn dưới dạng Firebase project

Các hướng dẫn dưới đây áp dụng được khi bạn đang muốn thêm Firebase vào một project Google Cloud có sẵn cho GCM. 

1. Trong Firebase console, chọn `Add Project`.
2. Chọn GCM project của bạn từ danh sách dự án Google Cloud có sẵn, sau đó chọn `Add Firebase`.
3. Trong màn hình "Firebase welcome", chọn `Add Firebase to your Android App`.
4. Điền tên package và SHA-1, rồi chọn `Add App`. Một file `google-services.json` mới cho Firebase của bạn sẽ được tải về. Copy file đó về project của bạn. Thường là để trong `/appp`.
5. Chọn `Continue` và tiếp tục làm theo hướng dấn chi tiết đẻ thêm "Google Services plugin" trong "Android Studio"

* Chú ý: Nếu Google tạo thêm server key bổ sung cho dự bạn của bạn, thường là có gắn label auto created by Google Service". Bạn hãy sử dụng key mới này thay cho key cũ.

### 2. Chuyển đổi sang FCM trong app-level build.gradle

Trước:

```
dependencies {
  compile "com.google.android.gms:play-services-gcm:17.0.0"
}
```

Sau:

```
dependencies {
  compile "com.google.firebase:firebase-messaging:20.1.0"
}
```

### 3. Sửa file manifest

SDK FCM tự động thêm tất cả các quyền cần thiết cũng như chức năng khi nhận được yêu cầu. Hãy chắc chắn rằng phải xóa các phần tử lỗi thời (vì chúng có thể gây trùng lặp) ra khỏi manifest của dự án.
Remove from `AndroidManifest.xml`

```
<uses-permission android:name="android.permission.WAKE_LOCK" />
<permission android:name="<your-package-name>.permission.C2D_MESSAGE"
            android:protectionLevel="signature" />
<uses-permission android:name="<your-package-name>.permission.C2D_MESSAGE" />

...

<receiver
    android:name="com.google.android.gms.gcm.GcmReceiver"
    android:exported="true"
    android:permission="com.google.android.c2dm.permission.SEND" >
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />
        <category android:name="com.example.gcm" />
    </intent-filter>
</receiver>
```

### 4. Cập nhật server endpoints

Cập nhật code server để sử dụng endpoints mới của FCM, để có thể gửi tin nhắn qua HTTPP và XMPPP. Lưu ý rằng, version mới của `gcm-http.googleapis.com/gcm/` là `fcm.googleapis.com/fcm/` (không có "http")

![](https://images.viblo.asia/80326509-4656-48f6-9110-302cf64954fa.png)

FCM hỗ trợ các giao thức HTTP và XMPP cùng gần giống với các giao thức của GCM, vì vậy bạn không cần update logic gửi tin.  

*Chú ý: Tương đương với FCM,  giao thức GCM HTTP chỉ được gắn nhãn "legacy" để phân biệt rõ ràng với API HTTP v1. API được hỗ trợ đầy đủ và Google tạm thời chưa có kế hoạch loại bỏ nó.

### 5. Next steps and optional migration tasks
Tùy thuộc vào tính năng GCM nào mà ứng dụng của bạn sử dụng, bạn có thể có các task migration bổ sung để thực hiện. Hầu hết các ứng dụng có thể cần phải migrate InstanceIDListenerService để hoạt động được với FCM.

- Thường là bắt buộc: migrate InstanceIDListenerService
Thực hiện bước này nếu bạn cần truy cập mã thông báo đăng ký thiết bị vì:
* Bạn gửi tin nhắn đến các thiết bị cụ thể .
* Bạn gửi tin nhắn đến các nhóm thiết bị .
* Bạn đăng ký thiết bị cho các topic với API quản lý đăng ký.

- Tùy chọn: migrate GcmListenerService
Thực hiện bước này nếu bạn cần xử lý các tin nhắn đến, chẳng hạn như khi:
* Ứng dụng của bạn nhận được tin nhắn chỉ có dữ liệu.
* Ứng dụng của bạn nhận được `notification payloads` khi ứng dụng đang ở `foreground`.
* Ứng dụng của bạn nhận được lỗi trong trường hợp lỗi upstream message.

- Tùy chọn: cậ nhật việc sử dụng GcmPubSub
Thực hiện bước này nếu:
Nếu bạn cần đăng ký thiết bị mới cho topic. Các thiết bị đã đăng ký một topic trước khi migrate sẽ tiếp tục nhận được tin nhắn. Ví dụ, một thiết bị đã đăng ký `topics/news` trong GCM vẫn sẽ tiếp tục nhận được tin nhắn từ `/news` sau khi migrate sang FCM (lưu ý, tiền tố "topics" là không bắt buộc trong FCM).

- Trường hợp đặc biệt: Migrate GCM sang một dự án Firebase có sẵn
Thực hiện bước này nếu:
Bạn đã có một dự án Firebase và bạn muốn di chuyển ứng dụng GCM  và người dùng của nó sang dự án Firebase này. Tình huống này đòi hỏi nhiều task bổ sung khác.

### 6. Config FCM với AWS SNS

FCM tương thích ngược với GCM. Các bước để thiết lập FCM trên AWS giống hệt với quy trình thiết lập GCM và (ít nhất là tại thời điểm này).
Tuy nhiên, nếu bạn đang gửi `data payloads` đến thiết bị Android thì chúng sẽ không được xử lý trừ khi bạn triển khai dịch vụ phía client server mở rộng FirebaseMessagingService. Trình tạo message JSON mặc định trong bảng điều khiển AWS gửi data messages, cái mà ứng dụng của bạn sẽ bỏ qua trừ khi dịch vụ nói trên được triển khai.  Để giải quyết vấn đề này, bạn có thể cung cấp `notification payload` tùy chỉnh mà thiết bị của bạn sẽ nhận được (miễn là ứng dụng của bạn không ở foreground).

Các bước bạn cần thực hiện để kiểm tra GCM / FCM trên ứng dụng của bạn với SNS là:
1. Tạo Platform Application trên SNS, chọn Google Cloud Messaging (GCM) cho Push Notification Platform và điền Server API key vào field API key.
2. Chọn Platform Application và click nút "Create platform endpoint".
3. Điền InstanceID (Device Token) được tạo từ ứng dụng của bạn. Bạn phải mở rộng FirebaseInstanceIDService và ghi đè phương thức onTokenRefresh để thấy điều này trong Ứng dụng Android của bạn. 
4. Click nút "Add endpoint".
5. Click vào link ARN của  platform ứng dụng của bạn.
6. Chọn endpoint gần nhất vừa được tạo và click nút "Publish to endpoint".
7. Chọn định dạng `JSON Message`, và click nút "JSON message generator".
8. Điền nội dung tin nhắn rồi click nút "Generate JSON".
Message được tạo bởi SNS sẽ có dạng:

```
{
"GCM": "{ \"data\": { \"message\": \"test message\" } }"
}
```

Như chúng tôi đã đề cập trước đó, `data payloads` sẽ bị bỏ qua nếu không có dịch vụ nào nhận được chúng. 
Nếu muốn kiểm tra mà không cần viết quá nhiều code, vì vậy thay vào đó ta nên gửi một `notification payload`. 

```
{
"GCM": "{ \"notification\": { \"text\": \"test message\" } }"
}
```

9. Thực hiện gửi message.
Trước khi thực hiện gửi hãy đảm bảo ứng dụng của bạn không chạy trên thiết bị và nhấn nút `Publish Message`. Sau đó bạn sẽ thấy popup thông báo xuất hiện trên thiết bị của bạn.

### Tham khảo
https://developers.google.com/cloud-messaging/android/android-migrate-fcm
https://stackoverflow.com/questions/38300450/fcm-with-aws-sns