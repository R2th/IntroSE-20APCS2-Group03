# 1. Giới thiệu
## 1.1. Firebase In-App Message là gì?

Bạn có thể xem video trailer sau để hiểu thêm về firebase nhé:
{@youtube: https://youtu.be/5MRKpvKV2pg?list=PLl-K7zZEsYLmOF_07IayrTntevxtbUxDL}

Firebase In-App Messaging giúp ứng dụng của bạn có thể thu hút người dùng đang hoạt động bằng cách gửi cho họ những thông điệp tuỳ theo mục đích của bạn và khuyến khích người dùng sử dụng các tính năng chính.
Ví dụ: bạn có thể gửi tin nhắn cho người dùng để khuyến khích họ đăng ký, xem video hay mua 1 mặt hàng nào đó.

Bạn có thể tuỳ chỉnh nội dung hiển thị của tin nhắn dưới dạng banners, modals, hay images... và bạn có thể cài đặt thời điểm hiển thị chính xác giúp cho chúng có thể mang lại lợi ích cho người dùng của bạn nhiều nhất.
Sử dụng Firebase In-App Messaging để khuyến khích người dùng khám phá các tính năng: làm nổi bật hàng bán, giới thiệu 1 phiếu giảm giá trong ứng dụng bán hàng của bạn, hay cung cấp manh mối mẹo trong trò chơi của bạn, hoặc nhắc người dùng like và share trong ứng dụng mạng xã hổi của bạn.

## 1.2. Các tính năng chính

- Có thể gửi tin nhắn hấp dẫn tuỳ theo yêu cầu của bạn. Firebase In-App Messaging sẽ gửi tin nhắn khi cần thiết nhất: khi người dùng thực sự đang sử dụng app của bạn. VD: giới thiệu khuyến mãi giảm giá mua giày cho những người dùng đang tìm kiếm giày mà không ảnh hưởng đến những người dùng khác...

- Có thể chỉ định người dùng mục tiêu theo đối tượng hoặc hành vi của người dùng. Firebase In-App Messaging hoạt động với Analytics và Predictions để cung cấp cho bạn các công cụ để gửi tin nhắn đến những người dùng bạn muốn tiếp cận nhất. Có thể gửi tin nhắn dự trên nhân khẩu học của người dùng, những hành vi trong quá khứ hoặc thậm chí dự đoán về hành vi tương lai của người dùng.

- Có thể tạo tin nhắn linh hoạt tuỳ chỉnh. Firebase In-App Messaging có khả năng tuỳ chỉnh hiển thị và nội dung của tin nhắn 1 cách dễ dàng.


# 2. Cách thêm SDK

## 2.1. Add firebase
Trước tiên bạn cần phải thêm firebase vào project của bạn. Cái này không liên quan lắm mà nó lại dài miên man nên các bạn quan tâm có thể xem documents của google tại đây nhé :smile: : https://firebase.google.com/docs/ios/setup

## 2.2. Add Firebase In-App Messaging SDK

Để thêm Firebase In-App Messaging SDK bằng cocoapods bạn có thể làm như sau:

Bước 1: Sửa Podfile:
Bạn cần thêm firebase in-app message vào podfile của bạn:
```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'YourProject' do
# Comment the next line if you're not using Swift and don't want to use dynamic frameworks
use_frameworks!

# Pods for YourProject
pod 'Firebase'
pod 'Firebase/InAppMessagingDisplay'
end
```
Bước 2: chạy Pod install
Mở terminal trỏ để podfile của bạn sau đó chạy lệnh
`pod install`

Bước 3: Mở lại workspace.

Bước 4: Config trong AppDelegate:
```
import Firebase
```
Sau đó ở `application:didFinishLaunchingWithOptions:` bạn cần phải thêm: `FirebaseApp.configure()`

Bước 5: Compile và run app của bạn.

# 3. Cách tạo In-App Message từ Console.
- Bước 1: Mở firebase console mở In-App Message: https://console.firebase.google.com/project/_/inappmessaging/
![](https://images.viblo.asia/b6a63ac9-6d81-49a7-a194-13e3e75d7251.png)

- Bước 2: Chọn **New Campaign** (hoặc **Create your first campaign** nếu bạn chưa tạo campain nào):
![](https://images.viblo.asia/2ebe0dd8-89b7-477c-bf33-516d50ade2e5.png)

- Bước 3: Tuỳ chỉnh style và content của In-App Message:

Bạn có thể chọn kiểu **Modal**:
![](https://images.viblo.asia/d7e997d5-6fd0-4396-8cb7-e1a3cffd330a.png)

Hay **Image Only**:
![](https://images.viblo.asia/3df04f65-cc5e-438c-9f5e-0479ea14cdd6.png)

Hoặc **Top Banner**:
![](https://images.viblo.asia/fd9aca1d-dc76-4662-98bd-b815f8e1f25c.png)

Chú ý: với các button bạn có thể set URL hoặc deeplink cho các button. Khi đó bạn có thể bắt được sự kiện người dùng click vào button trên message và xử lý theo ý muốn.

- Bước 4: Chọn Target user
Khi test bạn có thể chọn all user được
![](https://images.viblo.asia/52c25680-e15b-44a3-9c59-329ab35cb564.png)

- Bước 5: Chọn thời điểm hiển thị In-App Message
![](https://images.viblo.asia/68be5ede-0feb-4b95-8645-98a74975e741.png)
Bạn có thể tuỳ chỉnh thời gian bắt đầu và kết thúc Campaign này.
Bạn có thể chọn trigger mở app mở mục: **Trigger this in-app message whenever any of the following events occur**
Bạn có thể chọn số lần hiển thị message ở phần: **Per-device frequency limit**

- Bước 6: Publish Campaign đó và test thử trên device


# 4. Kết luận
Qua bài viết mình đã giới thiệu ưu điểm của Firebase In-App Message và 1 cách ngắn gọn cách tích hợp Firebase In-App Message vào project của bạn.
Hi vọng bạn có thể tích hợp được Firebase In-App Messaging vào project của mình và tạo được những tính năng thú vị nhé :smiley: 


Tài liệu tham khảo:
- Get started with Firebase In-App Messaging: https://firebase.google.com/docs/in-app-messaging/get-started
- Firebase console: https://console.firebase.google.com/