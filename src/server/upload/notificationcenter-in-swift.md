# 1. Giới thiệu chung
Trong một ứng dụng IOS việc update event giữa các màn hình khác nhau được diễn ra rất thường xuyên. Một trong những cơ chế giúp chúng ta có thể update event giữa các màn hình khác nhau một các hiệu quả đó chính là NotificationCenter. Rất đơn giản, NotificationCenter là một cơ chế giúp truyền phát thông báo đến các observers đã registered nó. 
Một số lợi ích mà NotificationCenter đem lại cho chúng ta:
- Có thể lắng nghe được event từ **một class** phát ra cho **nhiều class**.
- Có thể lắng nghe được event từ  **nhiều class** phát ra cho **một class**.
- Có thể lắng nghe được event phát ra từ **nhiều class** phát ra cho **nhiều class**.
# 2. Setup NotificationCenter
Để setup 1 hệ thống NotificationCenter hoạt động chúng ta sẽ phải setup 2 thành phần chính gồm: **bộ thu** ( **Receiver** ) và **bộ phát** ( **Broadcast** or **Post** or **Send** ) . Cùng bắt đầu thôi :D 
## 2.1 Receiver: Bộ Thu
``` swift
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(loginSuccess),
                                               name: NSNotification.Name("com.user.login.success"),
                                               object: nil)
                                               
                                               
        @objc func loginSuccess() {
            print("Login Successfully")
        }
```
Đây là quá trình chúng ta setup bộ thu event. Chúng ta sẽ cùng nhau phân tích từng thành phần nhé:
- **NotificationCenter.default** : Đây là tạo ra 1 NotificaitonCenter.
- **addObserver(self** : Chỉ định lớp hiện tại sẽ nhận notification.
- **selector: #selector(loginSuccess)** : Chỉ định method sẽ được gọi khi mà nhận notification. Ở đây chính là method loginSuccess. Hiểu đơn giản thì có nghĩa là hàm loginSuccess sẽ được gọi khi có thông báo. (Còn thông báo ở đâu á :v Do bộ phát nó phát ra nha :D )
- **name: NSNotification.Name("com.user.login.success")** : Đây chính là **notification key** , cái này là duy nhất. Nó dùng định danh cái kênh mà chúng ta muốn lắng nghe. Một ví dụ dễ hiểu là khi chúng ta nghe đài FM tần số 90.5 Mhz chẳng hạn. Khi chúng ta setup đài về tần số 90.5 Mhz thì chúng ta sẽ bắt được sóng của kênh này và quẩy. Tương tự vậy, **name: NSNotification.Name("com.user.login.success")** có là cái Observer này sẽ lắng nghe ở *'kênh'* **com.user.login.success**.
- **object: nil)** : Bên trong object, bạn có thể pass cho bất kỳ object nào khác hoặc bất kỳ varibale value khác ( Bool, String, Int, ....). Hiện tại chúng ta không pass cho cháu nào cả nên tạm thời set là nil nhé.

## 2.2 Broadcast ( Post or Send): Bộ Phát
Sau khi setup xong **bộ thu ( Reciever )**. Chúng ta tiếp tục setup **bộ phát( Broadcast )** nhé. **Broadcast** sẽ có nhiệm vụ phát đi tất cả thông báo tới các **bộ thu ( Receivers)** mà đã đăng ký lắng nghe nó. Cơ chế cũng rất đơn giản, nó sẽ phát tín hiệu đến kênh có **key** ở trong tham số **"name:"**.
``` swift
        NotificationCenter.default.post(name: NSNotification.Name("com.user.login.success"),
                                        object: nil)
```
Các thành phần của **bộ phát** cũng có tương tự chức năng như **bộ thu**. Vì vậy chúng ta sẽ chuyển qua phần tiếp theo để tìm hiểu xem flow của **NotificationCenter** hoạt động ra sao nhé.
# 3. Flow
Sau đây sẽ là một ví dụ về các để có thể nhận được nhận được data từ NotificationCenter .
### Bước 1:
Đầu tiên chúng ta sẽ viết một method với từ khoá **@objc** ở đầu. **Tại sao chung ta lại phải làm vậy ?** - *Đôi khi code Objective-C tương tác với code Swift và mã này phải được bật trong code Objective-C, đó là lý do tại sao chúng ta phải làm điều này*.
``` swift
        @objc func loginSuccess(_ notification: Notification){
               //.... code process
        }
```

### Bước 2: Register một NotificationCenter Observer
``` swift
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(loginSuccess(_:)),
                                               name: NSNotification.Name("com.user.login.success"),
                                               object: nil)
```
Bạn để ý chút nhé. method loginSuccess(:) đã có params nha.
### Bước 3: Post Notification
``` swift
        let loginResponse = ["userInfo": ["userID": 6, "userName": "John"]]
        
        NotificationCenter.default.post(name: NSNotification.Name("com.user.login.success"),
                                        object: nil,
                                        userInfo: loginResponse)
```
 Hàm bên trên có nghĩa là chúng ta sẽ phát một thông báo đến **key: com.user.login.success** kèm theo **userInfo** là **loginResponse**.
 ### Bước 4: Handle Data
``` swift
        @objc func loginSuccess(_ notification: Notification){
            print(notification.userInfo?["userInfo"] as? [String: Any] ?? [:])
        }
                        ------------------------------------------
                Output - ["userID": 6, "userName": "John"]
```
Bên trên chúng ta mới viết method **loginSuccess** nhưng chưa hề handle bên trong method. Ở đây chúng ta có thể hiểu là data từ **userInfo** sau khi được **Receiver** nhận sẽ truyền sang method **loginSuccess** khi gọi nó. Và từ đó chúng ta hoàn toàn có thể sử dụng data này :D.
### Bước 5: Remove Notification
NotificationCenter không tự động remove vì vậy trong hàm deinit của ViewController chúng ta nên remove cháu NotificationCenter này để tiết kiệm bộ nhớ nhé.
``` swift
    deinit {
        NotificationCenter.default.removeObserver(self,
                                                  name: NSNotification.Name("com.user.login.success"),
                                                  object: nil)
    }
```
# 4. Tổng kết
Trong bài viết này chúng ta đã cùng nhau tìm hiểu cơ chế của NotificationCenter và cách setup NotifcationCenter. Rất mong đã mang đến cho bạn đọc những kiến thức thu vị. Một số tài liệu tham khảo thêm:
- https://developer.apple.com/documentation/foundation/notificationcenter
- https://learnappmaking.com/notification-center-how-to-swift/
- https://medium.com/@nimjea/notificationcenter-in-swift-104b31f59772