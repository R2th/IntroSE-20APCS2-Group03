Trong phát triển ứng dụng di động đôi khi chúng ta sẽ thực hiện các yêu cầu như định hướng xử lý, truyền dữ liệu từ lớp này sang lớp khác, gọi bất kỳ phương thức hoặc hàm nào khác. Trước đây đã có Delegate pattern , đó là cách tốt nhất để kết nối  cho hai class nhưng delegation sẽ không giúp broadcasting singles hoặc thông báo các phương thức cùng một thời điểm.

### Những điểm tốt về NotificationCenter 

```
 - Về cơ bản, nó giúp cho việc observation và broadcasting singles từ một class đến nhiều class.
 - Post singles từ một class đến nhiều class.
 - Nhận singles từ nhiều class.
```

### Sử dụng nó thế nào? 

Viết NotificationCenter cho Observation: 

Receiver :

```swift
NotificationCenter.default
                  .addObserver(self,
                               selector: #selector(loginSuccess),
                 name: NSNotification.Name ("com.user.login.success"), object: nil)
```

Đây là quá trình đăng ký thông báo để receiving. Dựa trên key NotificationCenter có thể observe.

##### NotificationCenter.default  
- Đây là biến thông báo bạn có thể tạo nó trên globally trong lớp nếu bạn có nhiều thông báo.
##### addObserver 
 - Đây là class mà chúng ta sẽ thông báo cho observer.
##### selector: #selector(loginSuccess) 
 - Đây là tên của phương thức, Khi nó nhận thông báo sẽ gọi phương thức này.
##### name: NSNotification.Name(“com.user.login.success”)
- Đây là key duy nhất để phân biệt  với các notification khác. nó để gọi phương thức tương ứng khi đã đăng kí với phương thức đó.
##### object: nil
- Bên trong đối tượng, bạn có thể truyền bất kỳ đối tượng hoặc bất kỳ giá trị biến nào (Bool, String, Dictionary, Array, Int).

### Làm thế nào để post data đến notification center?

Trong quá trình này, chúng ta sẽ thực hiện phương thức gọi ở trên với sự trợ giúp của notifyCenter.
##### Broadcast (Post or Send)

Điều này sẽ gọi phương thức thông báo từ bất kỳ nơi nào không yêu cầu cùng một lớp. Nó sẽ xác định dựa trên key của observer . 

```swift
NotificationCenter.default
            .post(name: NSNotification.Name("com.user.login.success"),  
             object: nil)

```

##### Làm thế nào để pass  và nhận dữ liệu với Notification methods ?

Bước 1: viết tên method bắt đầu bằng @Objc

```swift
@objc func loginSuccess(_ notification: Notification){
       //.... code process 
}
```

Bước 2: Receiver (đăng kí  NotificationCenter Observer)

```swift
NotificationCenter.default
                  .addObserver(self,
                               selector:#selector(loginSuccess(_:)),
                 name: NSNotification.Name ("com.user.login.success"),                                           object: nil)
```

Bước 3: Post Notification

```swift
let loginResponse = ["userInfo": ["userID": 6, "userName": "John"]]
NotificationCenter.default
            .post(name:           NSNotification.Name("com.user.login.success"),  
             object: nil, 
             userInfo: loginResponse)
```

Bước 4: Xử lý nhận data


```swift
@objc func loginSuccess(_ notification: Notification){
print(notification.userInfo?["userInfo"] as? [String: Any] ?? [:]) }
 
------------------------------------------
Output - ["userID": 6, "userName": "John"]
```

Bước 5: Remove Notification 
```swift
deinit { 
  NotificationCenter.default
   .removeObserver(self, name:  NSNotification.Name("com.user.login.success"), object: nil) }
```

Tạo notification key dưới dạng Extension để tránh bất kỳ sai lầm nào khi viết lại khóa bên trong project.  Điều này sẽ giúp bạn tiết kiệm cho những thay đổi thủ công trong các project lớn. 


```swift 
extension Notification.Name {
    static var loginSuccess: Notification.Name { 
          return .init(rawValue: "UserLogin.success") }
    static var verifyUserSession: Notification.Name { 
          return .init(rawValue: "VerifyUser.session") }
}
```

Referent from Source: [Link](https://medium.com/@nimjea/notificationcenter-in-swift-104b31f59772)