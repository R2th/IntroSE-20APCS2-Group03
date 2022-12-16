**I. Giới thiệu**

 Push notifications cho phép cung cấp thông tin hữu ích cho khách hàng từ server đến thiết bị của người dùng. Tuy nhiên chúng ta cũng phải biết cách sử dụng Push notifications đúng cách để tránh gây phiền phức cho người dùng. Chúng ta dùng một ứng dụng nào đó cũng vậy, chúng ta cảm thấy rất bực mình khi 12 giờ đêm có một thông báo đến thiết bị của mình. Để xây dựng một service cho Push notification hết sức phức tạp, đặc biệt là khi chúng ta không hỗ trợ back-end cho Push notifications, lúc này chúng ta phải tìm hiểu xem có những service push notifications đã có sẵn. Các bạn cũng đã rất quen thuộc với Firebase, OneSignal, .... Nhưng hôm nay tôi sẽ suggest cho các bạn một service khá tốt nữa đó là Urban Airship. Giờ chúng ta hãy xem làm thế nào chúng ta có thể sử dụng Urban Airship để push notification đến ứng dụng của mình 

**II. Tạo project trên Dashboad Urban Airship**

Bước 1: Đăng ký, đăng nhập 

Việc tạo tài khoản trên [Urban Airship ](https://go.urbanairship.com/welcome/) cũng rất đơn giản. Bạn hãy lựa chọn loại tài khoản phù hợp với mục đích sử dụng của mình để đăng ký. 
Nếu bạn đã có tài khoản rồi hay đăng nhập luôn để tiếp tục sử dụng 

Bước 2: Tạo project mới 

![](https://images.viblo.asia/057da1e4-73cc-4f45-822f-51bb0d6cc16d.png)

Sau khi đăng nhập bạn click New Project để tạo mới
Nhập đầy đủ thông tin cần thiết cho Project 
Click Creat Project để hoàn thành

Bước 3: Set Up project 

Như các service khác (Firebase, OneSigna...) chúng ta cũng phải cung cấp Certificate cho Urban Airship.

![](https://images.viblo.asia/e8f5f915-3cef-42c0-8d08-a7d1763c2ee5.png)

Bạn hãy chọn file Certificate tương ứng với ứng dụng và submit như trong ảnh, sau đó click Save Certificate để hoàn thành việc set up 

Vậy là chúng ta đã có project của mình trên Dashboard của Urban Airship. Giờ chúng ta hãy install Urban Airship cho ứng dụng của mình nhé. 

**III. Install**

Nếu các bạn dùng Cocoa Pod thì chỉ cần thêm vào pod file như sau: 

```
use_frameworks! 
target "Your_Application_Name" do 
pod 'UrbanAirship-iOS-SDK' 
end
```

Nếu các bạn dùng Carthage : 

`github "urbanairship/ios-library"`

Nếu các bạn thủ công hơn một chút thì như bao SDK khác 

Download phiên bản mới nhất của [Urban Airship IOS SDK](https://bintray.com/urbanairship/iOS/urbanairship-sdk/10.0.3)
Add SDK vào project của mình. 

Các bạn lưu ý là phải add AirshipKit.framework file vào Embedded Binaries trong General tab nữa nhé. 

![](https://images.viblo.asia/95133690-90e3-4aea-834a-e2a7b595125a.png)

Tiếp theo các bạn hãy Enable Push Notification Capability trong Xcode 
![](https://images.viblo.asia/d5b99577-b3c6-4bf6-982a-ac475ecae230.png)

Tích Remote notifications trong Background modes 

![](https://images.viblo.asia/3ed901bd-87df-462b-a3ae-c2efe493ba5a.png)

**IV. Config Urban Airship and Set up Code**

Khi đã install Urban Airship IOS SDK các bạn sẽ thấy file AirshipConfig.plist. Lúc này có 4 key cần chúng ta config. đó là developmentAppKey, development AppSecret, productionAppKey, productionAppSecret. Vậy 4 key này lấy ở đâu ? 

Bây giờ các bạn lại quay trở lại Dashboard của Urban Airship. Chọn project -> Chọn Settings -> API andIntegration. Lúc này chúng ta có thể thấy được 2 key: App Key và App Secret Key. 

Nếu các bạn dùng Certtificate production khi hay fill 2 key này vào roductionAppKey, productionAppSecret trong AirshipConfig.plist và nếu development thì cũng làm tương tự như vậy. 

Để nhận được Notification từ Urban Airship các bạn chỉ việc thêm đoạn code sau vào didFinishLaunchingWithOptions trong Appdelegate file 

```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
// Override point for customization after application launch.
UAirship.takeOff()
UAirship.push()?.userPushNotificationsEnabled = true
UAirship.push()?.defaultPresentationOptions = [.alert,.badge,.sound]
return true
}
```

Vậy là chúng ta đã hoàn thành việc setup khi sử dụng Urban Airship Push Notifications. 

**V. Kết luận**

Cảm nhận của mình khi dùng Urban Airship rất tốt. Việc setup cũng không đến nỗi phức tạp, hơn nữa Urban Airship còn rất nhiều các tính năng khác để support chúng ta trong việc xử lý Push Notifications. Ở bài sau mình sẽ giới thiệu các bạn những tính năng thú vị đó, mong rằng sẽ giúp ích được các bạn xử lý những yêu cầu "khoai" của khách hàng. 
Link tham khảo: https://medium.com/@aishurao199/urban-airship-push-notification-for-ios-24ee28b5680e
Docs Urban Airship: https://docs.airship.com/api/ua/