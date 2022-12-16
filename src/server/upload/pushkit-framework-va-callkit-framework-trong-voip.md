Không giống Android, IOS không cho phép các developer tạo ra các tiến trình chạy ngầm bởi vì hành động này sẽ chiếm tài nguyên của thiết bị.
Nhưng sự thật là người dùng luôn có nhu cầu nhận được các thông báo, tin nhắn từ bạn bè ngay cả khi họ không sử dụng ứng dụng, thật may mắn là IOS đã tạo ra "Push Notifications" để giải quyết tuyệt vời vấn đề đó.

Trải qua các phiên bản IOS, Push Notification ngày càng được phát triển để hiển thị nhiều thông tin hơn với người dùng như :
 - Hiển thị nội dung tin nhắn
 - Chạy một đoạn âm thanh bất kỳ
 - Hiển thị badge trên app icon
 - Hiển thị media
 - Truyền dữ liệu nhận được khi ứng dụng đươc mở

![](https://images.viblo.asia/788e6637-c39a-427d-bd24-e87cfc430013.png)

Tuy nhiên có một vấn đề là với Push Notification, developer chỉ có thể giúp người dùng và ứng dụng tương tác qua một tin nhắn với nội dung khá hạn chế, và lúc này ứng dụng vẫn đang bị đóng băng.
  
![](https://images.viblo.asia/48c6cd32-872d-4c74-bea5-25f8c3f071fb.png)


# PushKit !
Yes. Đây chính là giải pháp của Apple cho hệ điều hành của họ. 


*Cài đặt pushKit bạn chỉ cần làm giống như cài đặt push notification, các bạn có thể làm theo hướng dẫn* [push notification Raywenderlich](https://www.raywenderlich.com/156966/push-notifications-tutorial-getting-started)
*Chỉ cần các bạn lưu ý một chút :*

![](https://images.viblo.asia/5f484337-307e-41b6-ac97-ba636e66dcc3.png)

*Như trên bức hình trên đây khi tạo certificate cho pushkit chúng ta chọn VoIP Services Certificate còn với  push notification thì chúng ta chọn Apple Push Notification service SSL (Sandbox & Production). Các bạn nhớ nhé ^^*

Để implement PushKit cũng rất đơn giản chỉ cần vài dòng code nho nhỏ :)
Trong AppDelegate chúng ta thêm các đoạn mã sau :

1. Implement PKPushRegistryDelegate
```
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate,PKPushRegistryDelegate
```
2. Register PKPushRegistry
```
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {

            let voipRegistry: PKPushRegistry = PKPushRegistry(queue: mainQueue)
        
            // Set the registry's delegate to self
            voipRegistry.delegate = self

            // Set the push type to VoIP
            voipRegistry.desiredPushTypes = [PKPushTypeVoIP]

        return true
    }
```
3.Thêm các hàm delegate.
```
func pushRegistry(registry: PKPushRegistry!, didUpdatePushCredentials credentials: PKPushCredentials!, forType type: String!) {
        // Register VoIP push token (a property of PKPushCredentials) with server

        let hexString : String = UnsafeBufferPointer<UInt8>(start: UnsafePointer(credentials.token.bytes),
            count: credentials.token.length).map { String(format: "%02x", $0) }.joinWithSeparator("")

        print(hexString)
    }


    @available(iOS 8.0, *)
    func pushRegistry(registry: PKPushRegistry!, didReceiveIncomingPushWithPayload payload: PKPushPayload!, forType type: String!) {
        // Process the received push
    }
```
Đó rất đơn giản đúng không :]] . Next.

PushKit ngoài khả năng của Push Notification nó còn có khả năng tự động khởi chạy ứng dụng.

***Tự động khởi chạy ứng dụng ! Bạn có thể làm được gì nhờ điều này ?***

PushKit khác với Push Notification ở chỗ nó không tự hiển thị ra thông báo như push notification ( được hỗ trợ bởi UserNotifications Framework) , đừng lo lắng vì điều này ! Bởi vì PushKit đã cung cấp cho bạn quá nhiều sức mạnh rồi. 
Khi nhận được notification từ PushKit bạn sẽ có thể chạy bất kỳ đoạn mã nào trong ứng dụng, không những bạn có thể hiển thị thông báo, âm thanh,.. thông qua chạy một local notification mà bạn còn có thể điều chỉnh nó, giờ đây bạn có quyền lọc nội dung từ PushKit quyết định cái nào hiển thị cái nào không, bạn có thể làm những nghiệp vụ ngầm ở trọng ứng dụng.

Wow ! thật là tốt, nhưng phần hay vẫn còn phía trước.

# CallKit

Vài năm trước đây khi hai người gọi điện cho nhau bằng VOIP,  khi app đang đóng băng developer không có cách nào để khởi động ứng dụng và kết nối hai người với nhau, caller sẽ gửi cho callee push notification và  push notification thì chỉ hiển thị trong một thời gian rất ngắn, người dùng sẽ rất khó để nhận biết và kể cả khi biết được thì việc mở ứng dụng và bắt đầu đăng nhập, kết nối, ... cũng làm cho trải nghiệm của người dùng rất là tệ.

Từ phiên bản IOS 10.0+ Apple bắt đầu cung cấp CallKit ! [" Display the system-calling UI for your app's VoIP services, and coordinate your calling services with other apps and the system." ](https://developer.apple.com/documentation/callkit) để giải quyết vấn đề đó.

Thật là ảo diệu, trước IOS 10 tôi cũng như nhiều developer khác tự hỏi làm sao để có thể hiển thị một giao diện bên ngoài ứng dụng giống như android bởi vì chúng tôi thực sự muốn người dùng khi nhận được một cuộc góị VOIP có thể giống như những gì một cuộc gọi thông thuường có thể làm được và dường như nó là điều không tưởng.

![](https://images.viblo.asia/d4455630-daf7-406a-a76e-a6caa366d4f8.png)

Đây chính là mô hình hoạt động của callKit. Thực tế callKit chỉ hỗ trợ developer gọi ra giao diện gọi điện mặc định của hệ thống với một số giao tiếp nhất định, nó sẽ không có mấy ý nghĩa nếu không có PushKit.
PushKit làm nhiệm vụ khởi động app khi có push thông báo có cuộc gọi đến và khi app đã được khởi động trở lại thì nhiệm vụ tiếp theo là của PushKit mở ra màn hình cuộc gọi đến của hệ thống, và giờ đây VOIP chẳng khác gì cuộc gọi thường Yeah !
(Để biết cách implement callKit các bạn có thể làm theo hướng dẫn [callKit Raywenderlich](https://www.raywenderlich.com/150015/callkit-tutorial-ios))

# KẾT

Như vậy tôi đã giới thiệu với các bạn 2 framwork rất vi diệu của apple, nó hỗ trợ developer rất nhiều trong việc phát triển ứng dụng. Hi vọng rằng trong tương lai apple sẽ tạo ra nhiều framework hữu ích hơn nữa giúp developer có thể tương tác nhiều hơn với hệ thống và phát triển được các ứng dụng tốt hơn nữa ~