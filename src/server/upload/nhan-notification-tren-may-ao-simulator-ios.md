Xin chào các bạn, đã bao giờ các bạn thắc mắc tại sao máy ảo (simulator) của Xcode không nhận được remote Notification chưa?  Mà chỉ khi build lên máy thật thì Apple mới cho nhận đc  ^^. Như thế trong một số trường hợp sẽ khá bất tiện, vì có thể số lượng device test được cung cấp trong dự án là không đủ để cho cả developer và QA cùng làm 1 lúc. 

Tuy nhiên đó chỉ là câu chuyện của ngày xưa, giờ đây chúng ta hoàn toàn có thể nhận push Notification trên máy ảo. Chỉ cần Xcode của bạn là phiên bản 11.4 trở lên, và đọc hết bài viết này là bạn sẽ làm được :v.

Đây thực sự là một tin tốt cho các iOS devevloper, bởi trong trường hợp thiếu device test, chúng ta hoàn toàn có thể dùng kỹ năng này để giảm thiêủ tối đa việc phải chờ đợi gây trì trệ, ảnh hưởng đến tiến độ dự án. Hoặc đơn giản là chẳng cần phải build ra máy thật làm gì nữa.

Ngoài ra, chúng ta hoàn toàn có thể dùng nó để làm trigger point, viết code xử lý khi nhận được notification, test format của data mà không cần dùng đến những thư viện bên ngoài nữa.
# Tạo project
Đầu tiên chúng ta sẽ tạo 1 project để làm việc. 
![](https://images.viblo.asia/6e3d2e18-a989-41bf-a072-384029c93b0b.png)

Tiếp theo là import  framework UserNotifications như bình thường. 
![](https://images.viblo.asia/c17493a8-9b34-4320-9370-05c7306cdf96.png)

Viết hàm đăng ký nhận push notìication cho app

```

    func registerForPushNotifications() {
        UNUserNotificationCenter.current()
            .requestAuthorization(options: [.alert, .sound, .badge]) {
                (granted, error) in
                print("Permission granted: \(granted)")
        }
    }
```

![](https://images.viblo.asia/75bbfb98-c667-4c45-adc6-9b6a3d4c989b.png)
![](https://images.viblo.asia/8ab5ea40-48f0-4e45-815e-d99f05015460.png)

Xong rồi chúng ta chạy app lên, app sẽ hỏi về quyền nhận thông báo của app. Hãy bấm allow
![](https://images.viblo.asia/e841de70-0021-47c2-8f09-be99ee1bdf7a.png)
# Tạo file data 
Chúng ta cần phải tạo 1 file có đuôi là .apns. Đây chính là file tượng trưng cho JSON mà app sẽ nhận về từ notifcation, chúng ta phải viết đúng format JSON mà apple quy định. 

![](https://images.viblo.asia/cdaad315-cedb-4e63-8da0-9f85cdf02a7c.png)


```
{
    "aps": {
        "alert": "Push Notifications Test",
        "sound": "default",
        "badge": 1
    }
}

```

Sau đó, kéo vào thư mục project
![](https://images.viblo.asia/dcd805a9-ac4e-4ebb-907c-683242cc4e45.png)

Từ thư mục chứa project, hãy bật terminal lên và chúng ta có câu lệnh để gửi push notification như sau:

`$ xcrun simctl push <device> com.example.my-app ExamplePush.apns"`
    
    
# Push notification
## 1. Với câu lệnh
> $ xcrun simctl push <device> com.example.my-app ExamplePush.apns"
    
1. <device> đây là ID của máy ảo bạn có thể tìm nó ở trong xcode
   ![](https://images.viblo.asia/4b801d65-1ed0-49fc-a2d8-bd785ad2b749.png)
![](https://images.viblo.asia/5d568b85-6b62-4a77-9a82-483d469c9fd0.png)
    
2. com.example.my-app : Đây là Bundle Id của app
    ![](https://images.viblo.asia/e3aeb388-429e-46a4-95e0-4745e070b096.png)
    
3. ExamplePush.apns : Tên file apns mà bạn vừa tạo
    
Trong trường hợp này của mình, câu lệnh này sẽ là
```
xcrun simctl push AD2137FC-F400-40FB-858F-240C72FA4C1A Sun.TestPushNotification  trinhTestPush.apns
```

![](https://images.viblo.asia/8f7832ea-c439-4324-a11e-57f1c570e52e.png)

## 2. Kéo thả file apns

Ngoài cách chạy lệnh trên terminal, chúng ta có thể kéo that trực tiếp file apns vào máy  ảo. Tuy nhiên chúng ta phải sửa file apns
    
```
`{"Simulator Target Bundle": "Sun.TestPushNotification",
    "aps": {
        "alert": "Push Notifications Test",
        "sound": "default",
        "badge": 1
        }
    }`
```
    
Trong đó: Simulator Target Bundle chính là bundle id của project
    
Trên đây là cách thực hiện push notification trên máy ảo. Hi vọng bài viết sẽ giúp ích cho các bạn. Cảm ơn đã đọc bài viết của mình!