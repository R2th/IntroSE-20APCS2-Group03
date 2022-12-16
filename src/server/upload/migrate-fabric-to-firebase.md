Như các bạn đã biết, thì sang năm 2020, chính xác là 31/3/2020 Fabric sẽ ngừng hỗ trợ và được sáp nhập vào với Firebase. Hiện này mỗi khi vào fabric chúng ta cũng sẽ đều thấy được nội dung thông báo này: 
> We have integrated the best of Fabric into Firebase to bring you one powerful app development platform. Fabric will be deprecated on March 31, 2020. Migrate your apps to Firebase to take advantage of the latest products and features we’re building there
Vậy làm sao để chính thức migrate Fabric sang Firebase? 
Trong bài viết này mình sẽ tìm hiểu cách để migrate sang Firebase
![](https://images.viblo.asia/d416e32a-88d7-426c-b8bf-c8f825bae1ba.png)

### Chuẩn bị tài khoản google
Đầu tiên chúng ta cần phải có một tài khoản Google. Đối với các dự án của công ty thì chúng ta cần phải đảm bảo rằng tài khoản đó được phép sử dụng để migrate.
![](https://images.viblo.asia/d416e32a-88d7-426c-b8bf-c8f825bae1ba.png)
Như trong hình trên, chúng ta sẽ chọn **Migrate app to Firebase**. Tiếp theo chúng ta sẽ được ttruyển sang 1 trang web khác:
https://fabric.io/firebase_migration
Tại trang web này, chúng ta sẽ sử dụng tài khoản google đã chuẩn bị trước đó để đăng nhập và tiến hành migrate
![](https://images.viblo.asia/e0307ace-4314-4048-992f-19fb41dcc44c.png)
Sau khi đăng nhập xong, bạn sẽ thấy được giao diện tương tự như ảnh trên, tiếp tục chọn Get Started
![](https://images.viblo.asia/6f1d0696-6d5d-41a5-9770-65e70dd3de37.png)
### Tiến hành migrate
Sau khi đã hoàn thành bước trên, chúng ta sẽ tiến hành migrate app bằng cách kéo app cũ (fabric) sang Firebase
Giao diện rất đơn giản như sau: 
![](https://images.viblo.asia/7d6b9074-fd0b-4f8d-9e85-cca87fe8f481.png)
Sau khi kéo app cũ sang Firebase, chúng ta sẽ có option thay đổi app name. Tuy nhiên nếu không cần chúng ta có thể chọn luôn Next để sang bước tiếp theo:
![](https://images.viblo.asia/02c66265-6667-4c80-9aa9-91d62f9a9f59.png)
Sau khi chọn Next xong, sẽ xuất hiện 1  popup để confirm các thông tin và tiến hành migrate app. 
Sau khi migrate app xong,chúng ta sẽ thấy xuất hiện 1 thông báo với mesage : "App migrated successfully!"
### Thêm crashlytics 
Bây giờ chúng ta đã tạo ra một app mới trên firebase, và bây giờ chúng ta  có thể bắt đầu liên kết với Crashlytics.
Để làm điều này, chúng ta cần mở Firebase Console . Khi ở đó, bạn sẽ thấy một chấm đỏ nhỏ trên ứng dụng mới của mình, điều này sẽ nhắc bạn hoàn thành SDK được thiết lập để chúng tôi có thể bắt đầu sử dụng toàn bộ bộ tính năng của Firebase.
![](https://images.viblo.asia/69decb73-b1c6-4a1d-ad1c-5110f888c77c.png)
Tiếp theo, chúng ta cần hoàn thành thiết lập cho app và tải xuống **GoogleService-Info.plist** và copy vào trong project.
Sau khi đã thêm file **GoogleService-Info.plist**  chúng ta cần phải thêm đoạn text sau vào Podfile
> pod 'Firebase/Core'
sau đó tại terminal, chạy 
> pod install

Sau khi chạy xong pod, mở AppDelegate.swift và thêm đoạn code sau:
```
import UIKit
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?)
    -> Bool {
    FirebaseApp.configure()
    return true
  }
}
```

Bây giờ hãy chạy ứng dụng của bạn và ứng dụng sẽ tự động liên kết với Firebase. Và thế là chúng ta đã migrate thành công từ Fabric sang Firebase và thêm Crashlytics vào dự án. Cảm ơn các bạn đã đọc bài.