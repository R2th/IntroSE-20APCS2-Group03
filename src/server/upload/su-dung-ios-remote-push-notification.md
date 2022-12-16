Remote Push notification là cung cụ cho phép hiển thị thông tin tới người dùng khi không ở trong ứng dụng, và điều hướng người dùng sang ứng dụng khi cần thiết. Các sự kiện quan trọng có thể hiển thị dưới hình thức khác nhau như badges, âm thanh và banner.

Bài viết này sẽ từng bước sử dụng các tính năng cở bản của Remote Push Notification
Trước khi vào bài học, ta cần chuẩn bị các công cụ sau:
- Xcode 10
- Swift 4.2
- Một tài khoản Apple Developer Program Membership
- Công cụ Push notification - Có thể tải tại https://github.com/onmyway133/PushNotifications

# Cơ chế hoạt động của Remote Push Notification
Hình dưới đây là luồng hoạt động của Remote Push Notification
![](https://images.viblo.asia/6b068b8e-88b4-4473-825e-10aff0c8930d.png)

# Đăng ký chức năng App Push Notification
Trước hết ta cần lấy một token từ dịch vụ APNS (Apple Push Notification Service). Đây là dịch vụ của Apple để quản lý bảo mật và sử dụng dữ liệu người dùng

App token và App ID là duy nhất cho một ứng dụng, và được sử dụng trong class **UNUserNotificationCenter**. Ngoài ra ta cũng phải kích hoạt chức năng Push Notification để ứng dụng có thể nhận được sự kiện
![](https://images.viblo.asia/db883a01-e98d-4570-8dbb-d748ac596b50.png)

Ta sẽ dùng AppID và Provisioning profile được tạo ở bước trên để cấu hình cho Projection, và request có thể được gửi tới APNS.
Ta sẽ đăng ký các phương thức thông qua class UNUserNotificationCenter. Như ví dụ dưới đây, ta sẽ sử dụng Sound và Badge. Nếu user xác nhận đồng ý, ứng dụng sẽ request App token thông qua phương thức **registerForRemoteNotifications**
![](https://images.viblo.asia/01c646c8-d96a-4666-bc46-33701db28376.png)

Sau khi đăng ký thành công, ứng dụng sẽ nhận được một token. Token này chỉ tồn tại tạm thời và không nên lưu trữ trong ứng dụng. Token này chỉ hợp lệ khi người dùng không cài đặt lại ứng dụng và restore lại thiết bị.

Các phương thức khác:
- Provisional:
- Critical: Cho phép các thông báo khẩn cấp và cần được được cấp phép của Apple
- Carplay: Tùy chọn này chỉ được sử dụng khi được Apple cấp phép, cho phép hiển thị Push Notification trên Carplay Hud.

# Nhận Token từ APNS
Sau khi gửi yêu cầu thành công qua hàm **registerForRemoteNotifications**, **application:didRegisterForRemoteNotificationsWithDeviceToken** sẽ được gọi trong **AppDelegate**
![](https://images.viblo.asia/058ba1db-8e2e-40bb-8882-3e4d7c9d1609.png)

## Cập nhật thông tin Thiết bị/ Người dùng lưu trên Backend server
Công đoạn này nhằm mục đích cho phép server của bạn ghi nhận những thiết bị nào đã đăng ký và cho phép Push Notification.
Để không phải mất công cho server, chúng ta sẽ sử dụng một công cụ dựng sẵn tại https://github.com/onmyway133/PushNotifications, nó cho phép ta giao tiếp với APNS.

# Provider gửi request tới APNS
Chỉ những request đã xác thực thông qua token mới có thể gửi tới APNS.
Ta cần phải tạo một token trong Apple Member Center, và lưu token này dưới dạng đuôi mở rộng .p8
![](https://images.viblo.asia/56f7d64d-bece-443e-aeec-9f9c07e45659.png)

Tiếp đó ta sẽ sử dụng token này để cấu hình cho ứng dụng đã download ở bước trên. Cấu hình cho server gồm có:
- File token .p8
- Token-key
- Team-Id
- Bundle-ID
![](https://images.viblo.asia/2740994d-623e-42b5-ac44-947e7831e745.png)

Nếu bạn muốn hiển thị thông báo ngay khi ứng dụng được mở, ta cần phải thực thi phương thức userNotificationCenter:center:willPresent:withCompletionhandler: và truyền các tùy chọn như code dưới đây
![](https://images.viblo.asia/0972a609-a024-427e-a3ba-eefca948d659.png)

## APNS gửi Push Notification
Gói tin Push Notification có cấu trúc dạng JSON, với kích thước tối đa 4KB. Và có dạng như dưới đây
```
{
   "aps" : {
      "alert" : {
         "title" : "Hello World",
         "subtitle" : "This is awesome"
         "body” : “Even more Content",
         "thread_identifier": "Master-Thread"
      },
     "badge": 12,
     "sound": "customSound.caf"
   },
   "custom-data" : {
     "custom-element": "custom-value"
   }
}
HTTP HEADER FIELDS
apns-collapse-id
```
- aps - Phần header được định nghĩa bởi Apple
- alert - chứa thông điệp của các đối tượng
- title - Tiêu đề của thông báo
- subtitle - Tiêu đề phụ của thông báo
- body - phần nội dung sẽ bị ẩn khi người dùng touch hoặc sử dụng face-id
- thread_identifier  - Được sử dụng cho nhóm các thông báo

Apple sẽ nhóm tất cả các thông báo có cùng ID. Nếu thông báo không có ID sẽ được nhóm chung lại với nhau
- custom-data - Cấu trúc JSON mở rộng sẽ được đưa vào bên trong aps object
- apns-collapse-id  - là HTTP-Header Field nhằm chỉ ra message mới sẽ thay thế message cũ

# Xử lý khi nhận được thông báo
Sau khi nhận được push notifcation, ta có thể tương tác xử lý thông qua delegate của **UNNotificationCenter** như đoạn chương trình sau:
![](https://images.viblo.asia/d7da7389-48af-4401-9e63-478e6e3dab68.png)

Trường **response.identifier** có thể được sử dụng để nhận biệt giữa các thông báo, và giá trị mặc định là **UNNotificationDefaultActionIdentifier**

# Custom actions
Ta hoàn toàn có thể mở rộng các loại xử lý khác nhau bên trong ứng dụng của mình, mỗi loại xử lý bao gồm ID và tập hợp các xử lý, ta sẽ thêm những xử lý nào vào UNUserNotification.
![](https://images.viblo.asia/29e9f7aa-120e-467c-90d3-89e0f4b7894a.png)

Mỗi xử lý tương ứng với một button bên dưới thông báo.
```
{
   "aps" : {
      "alert" : {
         "title" : "Hello Push",
      }
      "category": "custom"
   }
}
```

# Tùy biến nội dung.
Tùy theo nhu cầu sử dụng, nội dung của push notification có thể thay đổi cấu trúc hoặc bổ sung nhiều thông tin hơn. Notification service extension được sử dụng với mục đích này. Ta có thể dễ dàng thêm vào ứng dụng của mình,
![](https://images.viblo.asia/c9575d9c-3663-4247-af99-63ce1834d6e6.png)
Sau khi được thêm vào dự án, hệ thống cho phép 30 giây để thực hiện các tác vụ trong hàm didReceive. Sau khi thời gian này hết hàm serviceExtensionTimeWillExpire  sẽ được gọi. Ta có thể dùng hàm này để xử lý dữ liệu trước khi thông báo được hiển thị
![](https://images.viblo.asia/008f873d-985a-4a61-8e84-2929460a1b05.png)


# Tùy biến giao diện.
Tương tự như nội dung, ta cũng có thể tùy biến giao diện của thông báo. iOS cung cấp công cụ **notification content extension** để xử lý tình huống này. Sau khi thêm phần mở rộng này, ta sẽ thêm ViewController, plist và Storyboard để tùy biến theo mong muốn của ứng dụng.
![](https://images.viblo.asia/425bce29-0620-4e4b-90b0-a3cfe09d2c15.png)

Giao diện tùy biến sẽ hiển thị phụ thuộc vào loại xử lý đã được mở rộng ở các bước trên, và tên của loại xử lý có thể thay đổi thông qua biến target của dự án, hoặc dựa vào pList file của extension.
![](https://images.viblo.asia/94986ffe-b39f-4a5b-be2b-bc4dc2145e84.png)


# Kết luận
Qua những bước cơ bản ở trên, mọi người sẽ có những kiến thức cơ bản về Remote push notification.

Nguồn thao khảo: 
https://medium.com/ios-os-x-development/learn-master-%EF%B8%8F-ios-remote-push-notifications-in-2018-in-under-10-minutes-825ca6bee092