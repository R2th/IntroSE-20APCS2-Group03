**Giới thiệu**

Như phần 1 mình đã giới thiệu cho các bạn một số thông tin cơ bản về Firebase Cloud Message , Nếu các bạn chưa đọc về phần 1 về Fire Cloud Message các bạn có thể đọc từ đây [Phần 1](https://viblo.asia/p/firebase-cloud-messaging-924lJxbWKPM) 

Qua phần 2 này mình sẽ hưỡng dẫn các bạn gửi tin nhắn từ Cloud Messaging từ Firebase tới thiết bị qua 3 cách:

* Gửi cho tất cả thiết bị
 
* Gửi cho 1 thiết bị cụ thể

* Gửi cho 1 chủ đề.

Từ việc tạo mới 1 project .
 
Bây giờ chúng ta cùng nhau tạo 1 ứng dụng  mới theo những bước sau :


1. Tạo mới 1 project từ Android Studio của bạn 

Bạn có thể đặt tên ứng dụng của bạn với bất kỳ một tên nào tùy thích với mình mình sẽ đặt tên project là : Demo_Android_FCM

![](https://images.viblo.asia/ac86598d-8755-4b43-b724-375d9c9d1f55.png)


2. Thực hiện cấu hình trên Firebase
Các bạn truy cập vào [link ](https://console.firebase.google.com/u/0/)sau để thực hiện tạo một project trên Firebase 

![](https://images.viblo.asia/5d46f90a-728f-4685-841e-4529be3484c9.png)

Tạo project với tên mà bạn thích để lưu nó trên Firebase . Ví dụ : mình đặt là  tên là DemoAndroidFCM

Sau khi bạn tạo xong  bạn sẽ thấy Firebase hỗ trợ nhiều nền tảng khác nhau như : Android , Ios, Web.  Nhưng bài này mình chỉ hướng dẫn các bạn trên nền tảng Android.

![](https://images.viblo.asia/fb1debd3-30a6-4589-9e02-12f0e04ae585.png)



**Thêm Firebase tới project của bạn**

Trong project android của bạn . Bạn vào AndroidManifest.xml bạn lấy đường dẫn package của bạn với mình là  : package="vn.home.htm.demo_android_fcm"

Bạn copy vào package trong project của bạn vào : **Android package name  ** 

![](https://images.viblo.asia/b0b661cb-9f32-4a21-8b26-bded92dbdf95.png)

Tải cấu hình file Json về máy tính của bạn

![](https://images.viblo.asia/8d98b9aa-efc0-4079-af8e-0f6098ee5821.png)

Thêm firebase tới SDK

![](https://images.viblo.asia/4aec58bc-fdb3-451e-8ca0-a7ab83fe8bfd.png)

Giờ chúng ta đã hoàn thành việc tạo 1 project trong Firebase. Giờ chúng ta cùng nhau thực hiện trong project trong android studio của bạn

Bước 1 : Thêm file json vào trong Project của bạn :

![](https://images.viblo.asia/b707f81f-9016-4329-8370-1dd13a8c8976.png)

Bước 2 :
Thêm dòng sau  vào Project-Level build.gradle :

`classpath 'com.google.gms:google-services:3.0.0'`

Thêm dòng sau vào App-Level build.gradle :

```
compile 'com.google.firebase:firebase-core:9.6.1'
compile 'com.google.firebase:firebase-messaging:9.6.1'
apply plugin: 'com.google.gms.google-services'
```

Xem hình dưới để các bạn được rõ hơn :

![](https://images.viblo.asia/7194847a-9be7-4bfc-b6c3-cda0aa3ca5e5.png)


Bước 3 :
Thêm 2 service cho Project của bạn như sau :

FirebaseInstanceIdServiceAndroid.class :

![](https://images.viblo.asia/223a7d4d-f423-4ccc-9384-1f652e6d597c.png)

và MyFirebaseMessage.class

![](https://images.viblo.asia/3458c32b-fa6b-4a17-a1fc-c79411bc20a8.png)


Trong AndroidManifest.xml bạn cấp quyền ứng dụng của bạn:

`<uses-permission android:name="android.permission.INTERNET"/>`

thêm vào 2 service mình đã tạo ở trên :

```
        <service android:name=".FirebaseInstanceIdService">
            <intent-filter>
                <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
            </intent-filter>
        </service>
        <service
            android:name=".MyFirebaseMessage"
            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT"/>
            </intent-filter>
        </service>
```
        
Cuối cùng là mình chạy ứng dụng của các bạn lên và xem token lấy được từ Logcat của các bạn (Như bài trước mình đã nói các bạn phải có Google Play Service và phiên bản Android 4.0 hoặc cao hơn. ). 

![](https://images.viblo.asia/14a3c758-c3c4-4305-b6b8-6143a3e313b3.png)

Bạn lưu token các bạn lấy được để qua bước sau mình sẽ hướng dẫn cách bạn sử dụng token đó để làm sao có thể gửi tin nhắn từ Firebase Cloud Message tới thiết bị cụ thế. 

Bước tiếp theo, Gửi tin nhắn từ Firebase Cloud Message 

Có 3 cách gửi tin nhắn tới  thiết bị của cách bạn : 

* Gửi theo thiết bị cụ thể

* Gửi theo nhóm
 
* Gửi cho tất cả thiết bị 

Cả 3 cách trên bạn vào https://console.firebase.google.com để gửi tin nhắn tới ứng dụng của bạn 

![](https://images.viblo.asia/50aba61e-5383-4010-a60f-efed42ecfa60.png)

Cách 1 : Gửi theo thiết bị cụ thể .
Bạn chọn mục Single device  và dán token của bạn vào FCM registration token như sau :

![](https://images.viblo.asia/051507ef-b44e-498a-8852-262bd54428a4.png)

Sau khi bạn nhấn nút gửi đi sau 1 thời gian bạn sẽ nhận được tin nhắn dưới điện thoại của bạn :

![](https://images.viblo.asia/79c77ec0-c0fe-452f-8d27-7aedade707fd.png)

Cách 2: Gửi theo nhóm.
Mình sẽ tạo nhóm là  : HaiMT như đoạn code sau 

```
FirebaseMessaging.getInstance().subscribeToTopic("HaiMT").addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                String msg = "OK";
                if (!task.isSuccessful()) {
                    msg = "Fail";
                }
                Log.d(TAG, msg);
                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
            }
        });
```

Trên Firebase bạn sẽ tạo như sau :

![](https://images.viblo.asia/2f1a5ff0-fcc2-4065-81df-9b71d86f453e.png)

Sau đó bạn nhấn nút gửi bạn sẽ nhận được tin nhắn dưới client như sau :

![](https://images.viblo.asia/110a99fb-5c26-4b20-8762-67bd024f7340.png)

Cách 3: Gửi cho tất cả các thiết bị.
Cách này bạn chỉ cần chọn mục User segment  với nội dung và title của bạn và nhấn nút gửi

Bài này mình thực hành để mình có thể lấy được tin nhắn từ Firebase Cloud Message hy vọng nó hữu ích có thể giúp các bạn. 

Cảm ơn các bạn đã đọc qua bài viết của mình .
Bạn có thể tham khảo về Firebase Clould Message từ mục dành riêng cho android theo link tham giảo dưới đây : 
https://firebase.google.com/docs/cloud-messaging/android/client