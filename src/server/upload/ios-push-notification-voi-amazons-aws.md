# Push Notification iOS với AWS (SNS)
Thông thường bạn đã quá quen với Push Notification xử dụng thông qua dịch vụ của google [FCM](https://firebase.google.com/docs/cloud-messaging/?gclid=Cj0KCQjwyur0BRDcARIsAEt86IB6JAGbSl9qjbOmGvq-b8st1CY28D61WH1Cj1igR6dCxhzxX2khsb8aAmK4EALw_wcB). Nhưng có bao giờ bạn đặt câu hỏi còn dịch vụ nào khác tương đương đôi khi  là vượt trội hơn chưa. Bây giờ mình sẽ giới thiệu tạo push notification cơ bản với AWS (SNS).

Push notification là một tính năng quan trọng và cần thiết trong bất kỳ ứng dụng di động nào. AWS của Amazon cung cấp dịch vụ push cho thiết bị di động thông qua Simple Notifications Service (SNS). Cá nhân mình thấy việc thực hiện push trên iOS với Swift và SNS hơi khó khăn, phần lớn là do tài liệu không có hướng dẫn chi tiết từng bước về chủ đề này cũng như việc tiếp cận yêu cầu tài khoản apple develop và nằm ngoài giới hạn của một số người. Hôm nay mình s hướng dẫn từng bước đơn giản về triển khai push notification trên iOS với Swift và SNS. Bây giờ chúng ta sẽ cùng tạo ra một ứng dụng push notification Swift / SNS awesome nào.
##  1. Tạo 1 project trên Xcode 

Mở XCode và tạo 1 ứng dụng của bạn có thể gọi ứng dụng bất cứ điều gì bạn thích, nhưng hãy chắc chắn rằng tên đó là duy nhất.

## 2. Tạo file p12 certificate: 

Tạo ID ứng dụng của bạn, kích hoạt push notification và file p12 cho ứng dụng mới của bạn.

### Create an App ID 
* Đăng nhập [ Apple developer account](https://developer.apple.com/) và lựa chọn Certificates, Identifiers and Profiles
![](https://images.viblo.asia/9b291fe9-efc0-4a25-8a69-d9185ef302d7.png)
* Chọn Identifiers
![](https://images.viblo.asia/0cd8e288-9a87-42d0-8c02-f30485fe5e7b.png)
* Chọn nút (+) để tạo mới cho ứng dụng của bạn 
* Lựa chọn APPID và con tờ niu!
![](https://images.viblo.asia/90eb438a-d490-40d4-99ff-c4960bc8d4a8.png)
* Chỉ định tên ứng dụng của bạn, ID bundel và chọn Push Notifiction, sau đó con tờ niu!
![](https://images.viblo.asia/175b17f6-c5d8-4213-8b7f-94b24b335842.png)
![](https://images.viblo.asia/6d624f74-897a-4921-8d1f-5f39076107b1.png)
* Chọn Register và hoàn tất thôi.
### Tạo Certificate từ Keychain Access
* Mở ứng dụng Keychain Access trong Mac OS X của bạn và chọn Keychain Access -> Certificate Assistant -> Request a Certificate From a Certificate Authority

![](https://images.viblo.asia/03e7cff0-1d69-440a-a884-bc15560e9e69.png)
![](https://images.viblo.asia/843615c6-4f86-440b-a9c7-3f6a0d25b885.png)

* Nhập địa chỉ email và  lựa chọn `Saved to disk’, sau đó tiếp tục.

### Tạo Development Certificate
* Quay trở lại developer account  và chọn ứng dụng của bạn đã tạo khi nãy trong list Identifiers.
* Lựa chọn configure ở mục  push notification bạn sẽ nhìn thấy bảng sau:

![](https://images.viblo.asia/2fd017e2-2cd2-40ba-a582-3bab2e35f369.png)
![](https://images.viblo.asia/2437518b-e0fb-4b61-924d-13488654be21.png)

* Ở Development SSL certificates chọn Create Certificate
![](https://images.viblo.asia/e4cdf016-a76d-47df-b5e8-774bb7573304.png)
* Chọn file a Certificate Signing Request đã tạo bằng keychain access 

* Download Development Certificate và tiếp tục bước tiếp theo thôi nào.

![](https://images.viblo.asia/08d67180-a708-4990-8cf2-7b47af5400b7.png)
### Tạo APNS .p12 certificate
* Nhấp đúp vào Development certificate đã tạo ra trong bước trước để thêm nó vào Keychain Access. Đi tới Keychain Access, chọn login tìm certification và nhấn chuột phải để export

![](https://images.viblo.asia/017a5b03-1c23-44bd-b93a-525f5fd4ca02.png)

* Nhập password cho certificate và tiếp tục
* Nhập computer admin password để hoàn tất lựa chọn nơi để lưu lại file p12 của bạn.

### Cài đặt AWS
* Create a new platform application: Đăng nhập vào AWS của bạn và chuyển đến bảng điều khiển SNS. Lựa chọn ' Create platform application '

![](https://images.viblo.asia/1a1a8be6-a32e-4c11-8c06-279966d5966c.png)

* Nhập thông tin cho ứng dụng của bạn: 

Nhập tên ứng dụng của bạn (tên duy nhất của bạn). Push notification platform nên đặt "Apple development".

![](https://images.viblo.asia/372d3da3-231c-4c8e-b702-7d998ee814ad.png)


* Kết thúc việc tạo ứng dụng trên AWS: 

Push certificate type: chọn ' iOS Push Certificate ' . Chọn ' Choose file ' và chọn tệp chứng chỉ P12 bạn đã tạo. Nhập mật khẩu của bạn nếu bạn đã tạo certificate. Nếu bạn không có mật khẩu, hãy để trống. Khi mọi thứ hoàn tất, hãy nhấp vào nút 'Create platform application '.

![](https://images.viblo.asia/bb2d40f9-5a25-4cab-a769-647569597a08.png)


Sao chép application ARN để tiếp tục config trong  XCode cho project của bạn

![](https://images.viblo.asia/7a649539-98ba-4623-af22-823aaba72ed2.png)


* Thêm SNS ARN vào app delegate của bạn: mở tệp AppDelegate.Swift 

```swift
/// The SNS Platform application ARN
let SNSPlatformApplicationArn = “arn:aws:sns:us-east-1:203525439813:app/APNS_SANDBOX/SpreebieSNSExample”
```

* Download the AWS SDK for iOS

Truy cập trang AWS SDK dành cho iOS [tại đây](https://aws-amplify.github.io/docs/ios/start) và tải xuống SDK

![](https://images.viblo.asia/59628dcd-0c4a-42f6-a9be-0a23677752b8.png)


* Unzip the SDK files and kéo vào project của bạn

SDK bạn đã tải xuống và thêm các tệp AWSCore. Framework, AWSCognito.framework và AWSSNS.framework vàoproject của bạn
+ Embed the frameworks : 
Embed các franework vừa thêm vào dự án bằng cách: YourProject -> Targets -> General -> Embedded Binaries. Add AWSCore.framework, AWSCognito.framework and AWSSNS.framework.
+ Import AWSSNS vào app delegate: import the AWSSNS framework vào AppDelegate.swift của bạn.
```swift
import AWSSNS
```

* Create a bridging header:  AWS SDK được viết bằng objective-C, bạn sẽ cần phải tạo một bridging header để cho nó có thể hoạt động với Swift

Chú ý: Việc tạo bridging header bằng new file cần phải được thêm vào build settings

Import modules vảo  bridging header
```Objective-C
#import <AWSCore/AWSCore.h>
#import <AWSCognito/AWSCognito.h>
```

* Tạo application endpoint trong app delegate

Trong AppDelegate.swift thêm đoạn mã cho didRegisterForRemoteNotificationsWithDeviceToken:
```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    /// Attach the device token to the user defaults
    var token = “”
    for i in 0..<deviceToken.count {
        token = token + String(format: “%02.2hhx”, arguments: [deviceToken[i]])
    }
    print(token)
    UserDefaults.standard.set(token, forKey: “deviceTokenForSNS”)
    /// Create a platform endpoint. In this case, the endpoint is a
    /// device endpoint ARN
    let sns = AWSSNS.default()
    let request = AWSSNSCreatePlatformEndpointInput()
    request?.token = token
    request?.platformApplicationArn = SNSPlatformApplicationArn
    sns.createPlatformEndpoint(request!).continueWith(executor: AWSExecutor.mainThread(), block: { (task: AWSTask!) -> AnyObject! in
        if task.error != nil {
            print(“Error: \(String(describing: task.error))”)
        } else {
            let createEndpointResponse = task.result! as AWSSNSCreateEndpointResponse
            if let endpointArnForSNS = createEndpointResponse.endpointArn {
                print(“endpointArn: \(endpointArnForSNS)”)
                UserDefaults.standard.set(endpointArnForSNS, forKey: “endpointArnForSNS”)
            }
        }
        return nil
    })
}
```
* Create an identity pool with Cognito: AWS Cognito quản lý xác thực và cung cấp cho bạn chứng chỉ bảo mật để thực hiện call API. Vì vậy, để ứng dụng của chúng ta thực hiện các cuộc gọi API SNS, nó phải có một danh tính pool danh sách các chức năng cho phép.
+ Truy cập Cognito: truy cập trang tổng quan AWS chính và mở Cognito

![](https://images.viblo.asia/c2f47e29-c85a-4311-858f-fa404bbd3cf0.png)

+ Manage federated identities: bấm vào nút ' Manage Federated Identities ' để mở identity pools của bạn

![](https://images.viblo.asia/6e6e4240-f539-4b48-8a62-323c1d75b1b6.png)

+ Tạo mới identity pool: nhập tên cho identity pool  và chọn ' Enable access to unauthenticated identities 

![](https://images.viblo.asia/fd91db80-da75-4e5e-9974-f9d9106bbc30.png)

* Add Cognito code: mở liên kết sample code với identity pool mới của bạn và sao chép the identity pool ID

![](https://images.viblo.asia/05504ea1-3e47-40dd-bb59-44f995d29fe2.png)

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    /// Setup AWS Cognito credentials
    let credentialsProvider = AWSCognitoCredentialsProvider(
        regionType: AWSRegionType.USEast1, identityPoolId: “us-east-1:7d5b4064-d730–44ae-a1c3-bdc3d8bdf195”)
    let defaultServiceConfiguration = AWSServiceConfiguration(
        region: AWSRegionType.USEast1, credentialsProvider: credentialsProvider)
    AWSServiceManager.default().defaultServiceConfiguration = defaultServiceConfiguration
    return true
}
```

* Enable push capability: cho phép push notifications & remote notificaton trong YourProject -> Target -> Capabilities.

![](https://images.viblo.asia/e95a9225-e50c-42e2-81a2-79a6027d7d30.png)
![](https://images.viblo.asia/0a2e5316-8227-4f48-b926-198a16818c08.png)


* Register for push notifications: 

Trong **didFinishLaunchingWithOptions**  thêm registerForPushNotifications(application: application) trước khi  return true để đăng ký push cho application.
```swift
registerForPushNotifications(application: application)
```

* Implement push notifications cho ứng dụng:
+ Implement the registerForPushNotifications method: 
```swift
func registerForPushNotifications(application: UIApplication) {
    /// The notifications settings
    if #available(iOS 10.0, *) {
        UNUserNotificationCenter.current().delegate = self
        UNUserNotificationCenter.current().requestAuthorization(options: [.badge, .sound, .alert], completionHandler: {(granted, error) in
            if (granted)
            {
                UIApplication.shared.registerForRemoteNotifications()
            }
            else{
                //Do stuff if unsuccessful…
            }
        })
    } else {
        let settings = UIUserNotificationSettings(types: [UIUserNotificationType.alert, UIUserNotificationType.badge, UIUserNotificationType.sound], categories: nil)
        application.registerUserNotificationSettings(settings)
        application.registerForRemoteNotifications()
    }
}
```

 + Implement the userNotificationCenter delegate methods:
 ```swift
 // Called when a notification is delivered to a foreground app.
@available(iOS 10.0, *)
func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    print(“User Info = “,notification.request.content.userInfo)
    completionHandler([.alert, .badge, .sound])
}
// Called to let your app know which action was selected by the user for a given notification.
@available(iOS 10.0, *)
func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    print(“User Info = “,response.notification.request.content.userInfo)
    completionHandler()
}
 ```
 
 * Chạy ứng dụng của bạn và xem kết quả thôi nào.
 Kết nối iphone của bạn và cài đặt ứng dụng thông qua Xcode Nếu quá trình hoàn tất bạn có thể thấy new endpoit ở AWS Dashboard -> SNS -> Applications -> YourApplication. Bây giờ hãy chọn Publish to Endpoint và send notification to your phone.
 ![](https://images.viblo.asia/baa8f184-e2b3-41b6-b627-d1bbd4eb4a72.png)

### Tổng kết

Vậy là trong bài viết hôm nay mình đã hướng dẫn các bạn từ a -> z trong việc tạo 1 ứng dụng push notification cho ios với dịch vụ của AWS. Cảm ơn bạn đã theo dõi hết bài viết nếu bài viết hữu ích cho mình xin 1 upvote để mình có động lực làm bài viết tiếp theo về so sánh về FCN và SNS xem chúng có gì khác nhau nhé.