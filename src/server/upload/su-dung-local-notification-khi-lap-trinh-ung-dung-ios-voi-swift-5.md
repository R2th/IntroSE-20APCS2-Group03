## 1. Xin quyền truy cập
Chúng ta sẽ không thể gửi bất kỳ 1 thông điệp nào tới người dùng trừ khi có sự cho phép của họ. Vậy nên việc đầu tiên khi muốn sử dụng Local Notification đó là xin quyền truy cập từ người dùng. Chúng ta có thể làm điều này một cách khá dễ dàng trong Swift với `UserNotification` Framework. Sau khi import Framework này, ta có thể yêu cầu quyền truy cập thông báo từ người dùng bằng đoạn code sau
```Swift
func registerLocal() {
    let center = UNUserNotificationCenter.current()

    center.requestAuthorization(options: [.alert, .badge, .sound]) { (success, error) in
        if success {
            print("success")
        } else {
            print("Something wrong")
        }
    }
}
```
Và thế là khi người dùng truy cập vào ứng dụng thì họ sẽ nhìn thấy một thông báo yêu cầu người dùng cho phép App của bạn gửi thông báo đến họ.

## 2. Thiết lập thông báo
Sau khi đã có quyền gửi thông báo, nhiệm vụ tiếp theo của chúng ta cấu hình những thông báo sẽ được gửi đến người dùng. Sẽ có 3 thứ chúng ta cần quan tâm ở đây là: content (nội dung của thông báo), trigger ( điều kiện kích hoạt thống báo) và request ( là sự kết hợp giữa content và trigger)
Giả sử ứng dụng của chúng ta muốn nhắc nhở người dùng đi ngủ đúng giờ bằng cách gửi thông báo nhắc họ đã đến giờ ngủ vào chính xác 22h30 mỗi ngày. Để làm được việc này, đầu tiên chúng ta sẽ tạo một trigger như sau
```Swift
var dateComponents = DateComponents()
dateComponents.hour = 22
dateComponents.minute = 30
let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: true)
```
Vậy là đã xong phần tạo Trigger để gửi thông báo vào chính xác một khoảng thời gian mỗi ngày, tiếp theo chúng ta sẽ phải thiết lập nội dung cho thông báo bằng cách sử dụng class `UNMutableNotificationContent`. Class có rất nhiều property cho phép chúng customize hiển thị của thông báo. Ở đây chúng ta sẽ sử dụng 3 thuộc tính chính là `title`, `body` và `sound`
```Swift
let content = UNMutableNotificationContent()
content.title = "Bed Time"
content.body = "You should go to sleep now"
content.sound = .default
```
Sau khi đã thiết lập xong content và trigger, việc còn lại của chúng ta là tạo một request với `UNNotificationRequest` sau đó add nó vào 
`UNUserNotificationCenter`

```Swift
let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)
center.add(request)
```

## 3. Demo

MÌnh sẽ thiết kế một giao diện đơn giản cho phép người dùng bật tắt chức năng nhận thông báo và chỉ định số lượng thông báo họ muốn nhận được mỗi ngày như sau ![](https://images.viblo.asia/466e0e02-9f12-4a4e-9b6b-45d83d54710a.png)

Sau khi đã làm xong giao diện, chúng ta sẽ bắt tay vào phần logic, đầu tiên chúng ta sẽ tạo một class `NotificationServices` để tiện cho việc sử dụng
![](https://images.viblo.asia/b55f2e4a-ee13-4186-b5d2-92112ff0a731.png)

Sau đó chúng ta sẽ vào trong ViewDidLoad của màn hình Reminder rồi đến hàm  `authorizeNotification`, như vậy, khi người dùng click vào màn hình này thì thông báo yêu cầu quyền truy nhập sẽ được kích hoạt.

![](https://images.viblo.asia/708c85b8-92cf-43bf-a70a-c061e8af2743.png)

Tiếp theo chúng ta sẽ cài đặt 2 phương thức sau trong class `NotificationServices`. Phương thức `setNotification` dùng để tạo và hẹn lịch cho các thông báo, phương thức còn lại có tác dụng remove toàn bộ các thông báo đang chờ khi người dùng tắt chức năng
![](https://images.viblo.asia/7bd07aa9-31ba-4dbe-aa4a-e68638bac11f.png)

Sau đó, dựa vào trạng thái của swtich mà chúng ta sẽ gọi một trong hai hàm này
![](https://images.viblo.asia/ab9d7ace-15ab-4d42-b9f9-f81e8d0310f0.png)

Như vậy, mỗi lần mình bật tính năng này, app sẽ tự động gửi thông báo cho mình vào một khung giờ cố định hằng ngày. Thông báo đầu tiên sẽ được gửi vào 7h30 sáng, mỗi thông báo sẽ được gửi cách nhau 1 tiếng (những thứ này bạn hoàn toàn có thể custom lại trong class `NotificationServices`, có thể cho người dùng tự lựa chọn những thuộc tính này).


## 4. Tổng kết
Như vậy là mình đã cùng các bạn tìm hiểu cách làm sao để sử dụng và lập lịch cho các thông báo trong IOS với Local Notification. Có thể thấy cách sử dụng Local Notification khá là đơn giản, không hề mất nhiều công sức cho việc thiết lập. Ngoài Local Notification ra chúng ta còn có một giải pháp để xử lý các thông báo trong IOS có tên gọi là Push Notification - một phương thức giúp chúng ta đẩy các thông báo từ server xuống app, tuy nhiên trong nội dung bài viết này thì mình sẽ chỉ chia sẻ về Local Notification mà thôi nên bạn nào đang có hứng thú với Push Notification thì qua các bài khác trên Google nhé :).

Tạm biệt và hẹn gặp lại các bạn trong những bài viết tiếp theo

## Nguồn tham khảo

https://www.hackingwithswift.com/books/ios-swiftui/scheduling-local-notifications
https://programmingwithswift.com/how-to-send-local-notification-with-swift-5/