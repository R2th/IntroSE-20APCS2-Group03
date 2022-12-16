# Grouped Notifications
Cũng như mọi năm khi có một phiên bản hệ điều hành iOS mới ra sẽ có nhiều tính năng mới được giới thiệu. Trong bản iOS 12 năm nay có khá nhiều tính năng mới và Grouped Notifications là một trong số những tính năng đó. Hôm nay tôi sẽ giới thiệu qua cho các bạn về tính năng mới này.

Khi mà bạn có nhiều thông báo đến cùng một lúc, với những hệ điều hành cũng sẽ hiển thị rời rạc từng thông báo trên màn hình. Nếu số lượng quá nhiều chúng ta sẽ khó theo dõi và không biết những thông báo nào được push về là quan trọng, cần sắp xếp lên đầu để đọc. Với những bất tiện đấy Grouped Notifications được ra đời. Hỗ trợ người dùng quản lý Notifications cùng lúc.

Trong iOS 12 có 3 settings cho Grouped Notifications:
* **Automatic**: Đây là cài đặt mặc định, cài đặt này sẽ cho phép bạn groups notification một cách "thông minh" cho các ứng dụng. Dựa trên tiêu đề, nội dung...của notifications để grouped lại.
* **By App**: Cài đặt này sẽ nhóm lại những notifications của từng ứng dụng lại với nhau. Mỗi ứng dụng sẽ là một groups riêng biệt
* **Off**: Ta sẽ tắt tính năng groups notification này đi và thông báo sẽ được hiển thị rời rạc, giống như các phiên bản iOS cũ.
# Xây dựng ứng dụng Demo
Để cho dễ dàng việc test chức năng mới này chúng ta sẽ sử dụng Local Notifications để test. Sử dụng Local Notifications có thể chạy được trên máy ảo nên chúng ta không cần phải có Apple Developer Account. Nên sẽ dễ dàng hơn cho việc test.

Đầu tiên chúng ta đăng ký Local Notifications bằng đoạn code sau ở AppDelegate:
```swift
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        self.registerLocalNotifications()
        return true
    }

    // MARK: - Notifications
    func registerLocalNotifications() {
        // Ask for Notification Permissions
        let center = UNUserNotificationCenter.current()
        center.requestAuthorization(options: [.sound, .alert, .badge]) { granted, _ in
            DispatchQueue.main.async {
                if granted {
                    UIApplication.shared.registerForRemoteNotifications()
                } else {
                    // Handle error or not granted scenario
                }
            }
        }
    }
```
Sau khi đăng ký xong bạn nhớ nhấn Allow để App nhận được Notifications. Tiếp theo chúng ta sẽ sử dụng Schedule Notifications để push local notifications về Simulator của chúng ta. 
Để cho đơn giản chúng ta chỉ cần một button để push local notifications sao cho sau 5 giây chúng ta sẽ nhận được push notifications về. Chúng ta sử dụng đoạn code sau:
```swift
    // MARK: - Action
    @IBAction func testGroupedNotificationsAction(_ sender: Any) {
        self.scheduleGroupedNotifications()
    }
    
    //MARK: - Schedule Notifications
    func scheduleGroupedNotifications() {
        for i in 1...6 {
            let notificationContent = UNMutableNotificationContent()
            notificationContent.title = "Xin chào!"
            notificationContent.body = "Test chức năng Grouped Notifications!"
            notificationContent.sound = UNNotificationSound.default
            
            if i % 2 == 0 {
                notificationContent.threadIdentifier = "Test 1"
                notificationContent.summaryArgument = "Argument 1"
            } else {
                notificationContent.threadIdentifier = "Test 2"
                notificationContent.summaryArgument = "Argument 2"
            }
            // Deliver the notification in five seconds.
            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
            // Schedule the notification.
            let request = UNNotificationRequest(identifier: "\(i)5s", content: notificationContent, trigger: trigger)
            let center = UNUserNotificationCenter.current()
            center.add(request) { (error: Error?) in
                if let theError = error {
                    print(theError)
                }
            }
        }
    }
```
Trong đoạn code trên chúng ta sẽ demo với sáu local notifications được push về cùng lúc. Nhìn vào đoạn code bên trên ta thấy có hai thuộc tính threadIdentifier và summaryArgument. Trong đó:
* **threadIdentifier**: Được sử dụng là id duy nhất cho notifications đấy. Với các Notifications đăng ký với id này sẽ được nhóm lại với nhau thành một nhóm. Vây nhìn vào đoạn code ta thấy sáu notifications được nhóm thành hai nhóm riêng biệt là nhóm Test 1 và Test 2.
* **summaryArgument**: Thông tin mô tả về tên groups notifications.

Kết quả sẽ được hiển thị như hình sau:
![](https://images.viblo.asia/2133fc16-605d-43bf-9b4b-889ecca2f0e2.png)

Nguồn tham khảo: https://developer.apple.com/videos/play/wwdc2018/711/