In-App Messaging là một loại tin nhắn nó là các thông báo được nhắm đến người dùng khi họ đang sử dụng ứng dụng dành cho thiết bị di động hoặc máy tính để bàn. Nó cho phép các nhà tiếp thị thu hút người dùng vào đúng thời điểm, để tạo điều kiện giới thiệu, chia sẻ cập nhật sản phẩm, cung cấp hỗ trợ hoặc quảng cáo các ưu đãi có liên quan.
Và thông báo này chỉ được gửi khi người dùng hoạt động trong một ứng dụng, chúng là một cách đặc biệt hiệu quả để tăng lực kéo với những người dùng tương tác nhiều nhất của bạn. Khả năng tận dụng của chúng cho cả ứng dụng web và ứng dụng di động khiến chúng trở thành thành phần chính của chiến lược tiếp thị, hỗ trợ và tích hợp gắn kết. 

Hôm nay mình sẽ giới thiệu cho các bạn về In-App Messaging của Firebase, tuy chỉ là bản Beta nhưng cũng đáng để chờ đợi từ Google phát triển thêm cho tính năng này.

# 1. Thêm In-App Messaging SDK vào project.
Vào trong mục `build.gradle` và thêm vào dòng sau:
```
dependencies {
      // khai báo thư viện này để dự án luôn tương thích với phiên bản firebase.
    implementation platform('com.google.firebase:firebase-bom:28.0.1')

    implementation 'com.google.firebase:firebase-inappmessaging-display-ktx'
    implementation 'com.google.firebase:firebase-analytics-ktx'
}
```

Tiếp đến là sync lại project và build lên máy, khi đó bạn mở log của Android Studio và tìm ID sau:

```
I/FIAM.Headless: Starting InAppMessaging runtime with Installation ID dXtaKf05T1yAnGE3z2ueIj
```

Id này là định danh cho thiết bị đã cài app có tích hợp in-app messaging, để trên Firebase console có thể gửi đến thiết bị được chỉ định nhờ vào ID (nó cũng giống với token khi bạn sử dụng Push Notification).

# 2. Tạo một In-app messaging:
Bạn vào Firebase console và chọn In-app messaging:
Đến đây thì lại có nét tương đồng với Push notification, bạn có thể custom layout theo ý mình và gửi thông báo đến cho người. 
In-app messaging cung cấp cho mình 4 loại layout để mình custom.
![](https://images.viblo.asia/c734c4fd-b960-4371-9ece-a58c1c2f8253.png)

## Card	
+ Tin nhắn có cấu trúc với hai nút tác vụ.
+ Cung cấp cho người dùng một sự lựa chọn.

![](https://images.viblo.asia/962dae90-16ec-4111-b501-6e214ebd5341.png)

## Modal
+ Hộp thoại tin nhắn linh hoạt với một nút tác vụ.
+ Chỉ tiêu đề thư là bắt buộc - sử dụng những gì bạn cần.

![](https://images.viblo.asia/e0b2a8fa-6aca-4632-a651-cfb89fa20b06.png)

## Image only
+ Tải lên thông điệp được thiết kế tùy chỉnh của bạn.!

![](https://images.viblo.asia/dce0b201-4bef-4167-97a0-7123f52cdb8a.png)

## Banner
+Thông báo giống như tin nhắn.
+ Không chiếm nhiều không gian màn hình.

![](https://images.viblo.asia/99f85014-ea26-4102-976f-a0bd62b19bf2.png)



Ở đây mình đang chọn loại Modal, trong thông báo này có cả title, body, hình ảnh và cả button kèm theo đó là đường link khi người dùng click vào button đó.


![](https://images.viblo.asia/e0b2a8fa-6aca-4632-a651-cfb89fa20b06.png)

Ở phần tiếp theo, bạn có thể đặt tên và mô tả cho campain hiện tại và app nào sẽ nhận loại thông báo này
![](https://images.viblo.asia/de45a1c9-d012-4956-97e6-4714eeea3d5f.png)

Và có thể lập lịch để gửi campain này.![](https://images.viblo.asia/84444049-7553-4849-9b04-8cfe6067fa6f.png)
Cũng giống push notification để test trên một device cụ thể chỉ cần nhập ID đã lấy được từ lúc build app và gửi thôi.
![](https://images.viblo.asia/e584ff3c-cf73-4539-bb4a-a2136fba757a.png)

Kết quả:
![](https://images.viblo.asia/7c4e68cd-854a-478e-aa1d-d8078954061f.png)

Khi click vào button:
![](https://images.viblo.asia/0bba053d-4f94-4f88-87fa-35fe60231285.png)

# 3. Sửa đổi hành vi của tin nhắn.
Với một số tích hợp SDK In-App messaging của Firebase, bạn có thể điều chỉnh hành vi của tin nhắn, phản hồi khi người dùng tương tác với tin nhắn.

Tạo một class implement sự kiện tự In-app messaging.
```
class MyClickListener : FirebaseInAppMessagingClickListener {

    override fun messageClicked(inAppMessage: InAppMessage, action: Action) {
        val url: String? = action.actionUrl

        val metadata : CampaignMetadata? = inAppMessage.campaignMetadata

    }
}
```

Ở `MainActivity.class` 

```
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val listener = MyClickListener()
        FirebaseInAppMessaging.getInstance().addClickListener(listener);
    }
}
```

Hiện tại In-app messaging vẫn đang là bản Beta nên vẫn chưa ổn định, nhưng mình mong team dev Google sẽ hoàn thành sớm tính năng này, mình thì tính năng này khá hay :D. Thanks mọi người đã dành chút ít thời gian cho bài viết này. <3 <3 <3 

# Link tham khảo

> https://firebase.google.com/docs/in-app-messaging?authuser=0