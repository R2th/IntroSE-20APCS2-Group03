Chào mọi người, trong bài viết lần này mình sẽ hướng dẫn các bạn cách sử dụng DynamicLink của Firebase một cách dễ dàng nhất. Gần đây dự án mình đang làm có sử dụng thằng này, mới đầu đọc tài liệu có vẻ rất đơn giản nhưng đến khi ghép vào dự án thì mình có gặp 1 số lỗi liên quan đến việc thiết lập trên Firebase App của dự án (có thể do mình đọc bị sai sót), vì vậy mình quyết định sẽ viết bài này để hướng dẫn các bạn. 
### DynamicLink là gì?
Theo mình đọc và hiểu được thì DynamicLink chính là UniversalLink mà chúng ta vẫn thường dùng trong các app IOS. Có khác đó là UniversalLink chúng ta cần phải nhờ BE cấu hình file: **apple-app-site-association** . Còn khi chúng ta sử dụng DynamicLink thì chúng ta k cần nhờ BE cấu hình file này, mà chúng ta chỉ cần thiết lập trên Firebase là file này đã được tạo và thiết lập sẵn trên Firebase.
### Để sử dụng DynamicLink cần những gì? 
1. Tạo Firebase App 
2. Đầu tiên chúng ta sẽ cần add Firebase vào project thông qua cocoapods:
```
pod 'Firebase/Analytics'
pod 'Firebase/DynamicLinks'
```

3 .Sau khi thêm Firebase vào project, chúng ta sẽ cần tải về file Google-Service trong Firebase App đã tạo ở trên
```
GoogleService-Info.plist
```
4. Thiết lập trong AppDelegate:
```
import Firebase
----
FirebaseApp.configure()
```
5. Tạo provisioning và certificate đã enable Associated Domains
6. Add AppID và TeamID vào firebase trong mục Settings/General của Firebase app 
### Tạo DynamicLink trên Firebase console
Sau khi đã chuẩn bị đầy đủ những thứ ở trên. Mở Firebase console lên : https://console.firebase.google.com/u/0/project
Và chọn đúng project sẽ dử dụng DynamicLink.
Tại menu bar bên trái, cuộn xuống dưới bạn sẽ nhìn thấy mục DynamicLink
Sau khi chọn vào mục này, chọn tiếp Get Started sẽ xuất hiện ảnh như dưới đây.
![](https://images.viblo.asia/06842a71-566f-4bf5-ac9b-f01b28da82d6.png)
Tại bước này, chúng ta sẽ tiến hành khởi tạo domain để cấu hình và xử lý action trên app. DynamicLink mặc định sẽ có dạng **name.page.link**. Nếu như muốn có domain khác chúng ta sẽ cần phải thiết lập server thông qua custom domain của Firebase.
Sau khi đã nhập xong domain, chọn  Continue để tiếp tục đến phần tạo dynamic link. 
Khi tạo xong domain, tiếp tục chọn New Dynamic Link. 
![](https://images.viblo.asia/153a9525-0804-4fc6-a7b9-4370355ebc07.png)
Trong phhần này chúng ta chỉ cần thiết lập theo các bước đã được gợi ý sẵn. *Lưu ý là chọn mở link trên ios app. 
Sau khi tạo xong chúng ta có thể vào xem preview xem link của chúng ta có thể được mở như thế nào bằng cách chọn vào dynamiclink -> preview*

### Add dynamiclink to domain
Tại menu bar bên trái, cuộn lên trên cùng chọn vào mục Authentication -> Sign-in method -> cuộn  xuống chọn  vào mục Authorized domains. 
Sau đó tiến hành add domian như phía dưới: 
Link dynamic lúc nãy mình tạo có dạng: **gglogin.page.link**
![](https://images.viblo.asia/116a239b-2e4b-405b-be68-6571f0b6d37e.png)
Tiếp tục add Whitelist URL pattern 
![](https://images.viblo.asia/3e21a85d-226d-4876-82ee-7414a4139f2d.png)
### Cài đặt trong xcode project
Step 1:Trong xcode, chọn target -> Capabilities -> Sau đó enable mục Associated Domains
Và cấu hình như phía dưới:
![](https://images.viblo.asia/6300c922-1c39-438d-a2f9-224d5dc65969.png)
Step 2: Chọn  tab Info -> URL Types
Tạo thêm 1 properties với URL Schemes là bundle id của app.
### AppDelegate.swift
```
//handle links received as Universal Links when the app is already installed (on iOS 9 and newer):
func application(_ application: UIApplication, continue userActivity: NSUserActivity,
                 restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
  let handled = DynamicLinks.dynamicLinks().handleUniversalLink(userActivity.webpageURL!) { (dynamiclink, error) in
    // ...
  }

  return handled
}

@available(iOS 9.0, *)
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any]) -> Bool {
  return application(app, open: url,
                     sourceApplication: options[UIApplication.OpenURLOptionsKey.sourceApplication] as? String,
                     annotation: "")
}

func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
  if let dynamicLink = DynamicLinks.dynamicLinks().dynamicLink(fromCustomSchemeURL: url) {
    // Handle the deep link. For example, show the deep-linked content or
    // apply a promotional offer to the user's account.
    // ...
    return true
  }
  return false
}

```

### Kết
Như vậy, theo các mục ở trên là các bạn đã có thể tự thiết lập dynamiclink cho app của mình. Với thiết lập như trên, khi các bạn click vào domain như cấu hình trên firebase, hệ thống sẽ tự mở ra app của các bạn còn việc xử lý trong app sẽ do các bạn thiết lập dựa vào path của domain.
Tài liệu của Firebase: https://firebase.google.com/docs/dynamic-links/ios/receive