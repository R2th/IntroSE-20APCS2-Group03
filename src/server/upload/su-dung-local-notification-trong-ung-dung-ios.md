Bài viết sẽ giới thiệu các bước cơ bản để sử dụng Local Notifcation trong ứng dụng iOS
Bài viết sẽ tập trung vào các điểm sau:
- Hướng dẫn lập lịch và xử lý Local Notification
- Phân tích cấu trúc dữ liệu trong Local Notification
- Các bước xác thực từ người dùng để có thể gửi Local Notification
- Thiết lập xử lý sự kiện phát sinh từ Local Notification
- Xử lý Local Notification ở chế độ foreground và background.

# Local Notification là gì?
Local Notification là các thông báo ngắn ở dạng text và hiện ở trên top bar của màn hình iPhone. Các thông báo này có thể được đặt lịch và gửi trong phạm vị nội bộ iPhone.
Chức năng này thích hợp cho các chức năng hoạt động nội bộ trong thiết bị như thông báo lịch làm việc, hoặc gửi thông báo khi ứng dụng hoàn thành một tác vụ.

# Lớp quản lý Local Notification
Trong phần này ta sẽ xây dựng một lớp tiện ích cho phép ta quản lý các Local Notification. Ta đặt tên lớp này là **LocalNotificationManager**

```
class LocalNotificationManager
{
    var notifications = [Notification]()
}
```

Trong đó cấu trúc **Notification** sẽ được dùng để chứa thông tin của từng Local Notification
```
struct Notification {
    var id:String
    var title:String
    var datetime:DateComponents
}
```

Trình tự để tiến hành đặt lịch cho một Local Notifcation sẽ được thực hiện như sau:
- Kiểm tra xem người dùng đã cho phép gửi và xử lý Local Notification hay chưa.
- Nếu người dùng chưa cho phép, thì gửi thông báo xin xác thực từ người dùng.
- Nó người dùng đã cấp phép, thì tiến hành đặt lịch thông báo.
- Nếu người dùng đã từ chối cấp quyền từ trước đó thì hủy tác vụ và không đăng ký lịch thông báo nữa.

Để phục vụ cho các bước ở trên, ta sẽ định nghĩa thêm một số hàm cho lớp **LocalNotificationManager**
- **listScheduledNotifications()**: cho phép ta lấy ra danh sách các thông báo đã được đặt lịch
- **schedule()**: gửi thông báo xin cấp phép quyền đặt lịch thông báo.
- **scheduleNotifications()**: hàm thực hiện đặt lịch thông báo

Trước hết ta sẽ xem xét hàm **listScheduledNotifications()**, hàm này sẽ liệt kê các các notification đã được đặt lịch trước đó. Ta sẽ sử dụng API **getPendingNotificationRequest**s của **UNUserNotificationCenter**.

```
import UserNotifications
func listScheduledNotifications()
{
    UNUserNotificationCenter.current().getPendingNotificationRequests { notifications in

        for notification in notifications {
            print(notification)
        }
    }
}
```

# Yêu cầu người dùng cấp phép gửi Local Notification
Trước khi có thể đặt lịch thông báo, ứng dụng phải được người dùng cho phép gửi Local Notification.
Gửi thông báo yêu cầu người dùng cấp phép thông qua hàm requestAuthorization(options:completionHandler:)

```
private func requestAuthorization()
{
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in

        if granted == true && error == nil {
            self.scheduleNotifications()
        }
    }
}
```

- Sau khi hàm này được gọi, một hộp thoại sẽ mở ra để yêu cầu người dùng xác thực có cho phép ứng dụng gửi local notification hay không
- Thông báo gửi tới người dùng theo 3 hình thức **alert, badge, sound**
- Một completion handler cho biết người dùng đã xác nhận hay chưa. Như ví dụ trên, người dùng đã đồng ý cấp quyền cho ứng dụng, khi đó các tham số granted == true và error == nil

# Kiểm tra trạng thái cấp phép của Local Notification
Như đã trình bày ở phần trên, ứng sẽ chỉ lập lịch sau khi người dùng đã cấp phép. Để kiểm tra người dùng đã cấp phép cho ứng dụng hay chưa, ta sẽ sử dụng API **getNotificationSettings** của **UNUserNotificationCenter**
```
func schedule()
{
    UNUserNotificationCenter.current().getNotificationSettings { settings in

        switch settings.authorizationStatus {
        case .notDetermined:
            self.requestAuthorization()
        case .authorized, .provisional:
            self.scheduleNotifications()
        default:
            break // Do nothing
        }
    }
}
```

Ngoài ra ta cần phải lưu ý:
- Trong iOS, ứng dụng chỉ có thể yêu cầu cấp phép từ người dùng một lần duy nhất. Nếu người dùng đã từ chối cấp phép, thì nó chỉ có thể được xóa bỏ khi người dùng tùy chỉnh trong cấu hình của điện thoại.

# Đặt lịch thông báo cho Local Notification
Để đặt lịch thông báo cho Local Notification ta cần cung cấp các thông tin sau:
- Tiêu đề sẽ hiển thị khi nhận thông báo
- Thời điểm thông báo được gửi, và có lặp lại không
- Mã ID của thông báo, sẽ giúp ta dễ dàng hơn cho việc quản lý và xử lý thông báo sau này

Khi đó đoạn chương trình sẽ có cấu trúc như dưới đây
```
private func scheduleNotifications()
{
    for notification in notifications
    {
        let content      = UNMutableNotificationContent()
        content.title    = notification.title
        content.sound    = .default

        let trigger = UNCalendarNotificationTrigger(dateMatching: notification.datetime, repeats: false)

        let request = UNNotificationRequest(identifier: notification.id, content: content, trigger: trigger)

        UNUserNotificationCenter.current().add(request) { error in

            guard error == nil else { return }

            print("Notification scheduled! --- ID = \(notification.id)")
        }
    }
}
```

Trong đoạn chương trình trên, đối tượng **UNNotificationRequest** sẽ được dùng để kết nối giữa phần nội dung và điều kiện gửi thông báo.
API **UNUserNotificationCenter.add** cung cấp completion handler để xử lý sau khi một thông báo được đăng ký.

Ở đoạn chương trình trên ta đã đặt lịch theo ngày giờ, ngoài ra ta có thể đặt điều kiện gửi thông báo theo khoảng thời gian
```
let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 120, repeats: false)
```

Hoặc dựa vào khu vực qua GPS để làm điều kiện gửi thông báo:
`let trigger = UNLocationNotificationTrigger(triggerWithRegion: region, repeats: false)`

Như vậy là các hàm chức năng của lớp **LocalNotificationManager** đã hoàn thành. Ta có thể dễ dàng đặt lịch thông báo bằng đoạn chương trình dưới đây:
```
let manager = LocalNotificationManager()
manager.notifications = [
    Notification(id: "reminder-1", title: "Remember the milk!", datetime: DateComponents(calendar: Calendar.current, year: 2019, month: 4, day: 22, hour: 17, minute: 0)),
    Notification(id: "reminder-2", title: "Ask Bob from accounting", datetime: DateComponents(calendar: Calendar.current, year: 2019, month: 4, day: 22, hour: 17, minute: 1)),
    Notification(id: "reminder-3", title: "Send postcard to mom", datetime: DateComponents(calendar: Calendar.current, year: 2019, month: 4, day: 22, hour: 17, minute: 2))
]

manager.schedule()
```

Như đã trình bày phần trước, các Local Notification được quản lý dựa trên ID, khi ta đặt lịch thông báo với cùng một ID, thì Local Notification ấy sẽ được cập nhật lại.

# Xử lý khi nhận được Local Notification
Khi người dùng bấm vào Local Notification trên top bar, ứng dụng của chúng ta sẽ tự động được mở ra. Trong phần này chúng ta sẽ định nghĩa cách thức ứng dụng sẽ xử lý khi Local Notification được chọn.

Để xử lý khi nhận được Local Notification, ta sẽ có 2 tình huống sau:
- Nhận được thông báo khi ứng dụng đang không hoạt động. Ví dụ như đang hoạt động ở chế độ background hoặc đã ứng dụng đã bị đóng, khi đó hàm delegate sau sẽ được gọi
`userNotificationCenter(_:didReceive:withCompletionHandler:)`
- Nhận được thông báo khi ứng dụng đang chạy ở chế độ foreground, khi đó hàm delegate sau sẽ được gọi
`userNotificationCenter(_:willPresent:withCompletionHandler:)`

Ta cần phải định nghĩa 2 hàm trên trong AppDelegate đăng ký nó với UNUserNotificationCenter
```
extension AppDelegate: UNUserNotificationCenterDelegate
{
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void)
    {
        let id = response.notification.request.identifier
        print("Received notification with ID = \(id)")

        completionHandler()
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void)
    {
        let id = notification.request.identifier
        print("Received notification with ID = \(id)")

        completionHandler([.sound, .alert])
    }
}

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool
{
    UNUserNotificationCenter.current().delegate = self

    return true
}
```

Đối tượng response sẽ chưa toàn bộ thông tin về Local Notification nhận được. Ta có thể sử dụng thông tin này để chuyển trạng thái của ứng dụng khi người dùng bấm chọn thông báo trên top bar.

Ngoài ra ta cần gọi phương thức **completionHandler** để thông báo với hệ thống rằng ta đã xử lý xong thông báo.

# Nguồn tham khảo và chương trình Demo
- Nguồn tham khảo: https://learnappmaking.com/local-notifications-scheduling-swift/#what-is-a-local-notification
- Chương trình Demo: https://github.com/oLeThiVanAnh/R7_2019