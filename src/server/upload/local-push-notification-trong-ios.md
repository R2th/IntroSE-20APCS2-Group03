Đã bao giờ các bạn tự hỏi: Mình không biết về Backend, mà muốn viết một ứng dụng có thể push thông báo tới cho người dùng thì có cách nào khác không? Chắc chắn là có rồi. Các bạn có thể sử dụng Local push notification của iOS.<br>
Local push notification phù hợp với việc tạo ra các lịch trình có sẵn để thông báo tới người dùng như nhắc nhở làm một việc gì đó.<br>
Ở bài viết này, mình sẽ hướng dẫn các bạn thực hiện config và chạy thử một demo về local push notification.<br>
# Tạo project
Mở Xcode, và tạo một new Single View App.<br>
![](https://images.viblo.asia/9c2db111-f379-4cc9-b124-9b6983c88586.png)<br>
Tiếp theo mình nhập tên và các thông tin liên quan rồi bấm Next để tạo project.<br>
![](https://images.viblo.asia/c9943e58-9ea6-4479-ac11-4f86aed12c26.png)<br>
Giao diện rất đơn giản, mình chỉ để một button gửi notification.<br>
![](https://images.viblo.asia/a5b91970-fabb-402f-bc74-2383c8964e98.png)<br>
## Xin quyền người dùng
Chắc hẳn việc xin quyền người dùng để push notification đã rất quen thuộc với các bạn.<br>
```
    func requestPermision() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { (granted, err) in
            print("granted: (\(granted)")
        }
    }
```
## Gửi thông báo
Để gửi thông báo, mình sẽ tạo một instant của UNMutableNotificationContent. Đối tượng UNMutableNotificationContent chứa dữ liệu của thông báo sẽ hiển thị bao gồm title, body, subtitle.<br>
```
        let content = UNMutableNotificationContent()
        content.title = "Local push notification"
        content.subtitle = "Local push notification"
        content.body = "Local push notification"
```
Muốn thêm Media content thì hãy sử dụng UNNotificationAttachment.<br>
```
        let imageName = "sun"
        guard let imageURL = Bundle.main.url(forResource: imageName, withExtension: "png") else { return }
        let attachment = try! UNNotificationAttachment(identifier: imageName, url: imageURL, options: .none)
        content.attachments = [attachment]
```
### Trigger
Trigger chính là cách mà mình chỉ định các điều kiện gửi thông báo. Có 3 loại trigger:
* UNTimeIntervalNotificationTrigger: Chỉ định thời gian sẽ phát ra thông báo. Ví dụ cứ 5 giây sẽ phát ra thông báo.
* UNCalendarNotificationTrigger: Chỉ định hẹn ngày giờ thông báo. Ví dụ chỉ định rõ ngày 18/12/2020 sẽ phát thông báo.
* UNLocationNotificationTrigger: Chỉ định địa điểm phát ra thông báo.

Ở bài viết này, mình sẽ sử dụng `UNTimeIntervalNotificationTrigger` sau 5 giây sẽ phát ra thông báo và không lặp lại thông báo.<br>
```
    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, 
    repeats: false)
```
> Một điều lưu ý nếu bạn muốn lặp lại thông báo thì timeInterval phải lớn hơn 60 giây. Nếu không sẽ bị crash app.
###  Tạo request
Để tạo request, mình sử dụng `UNNotificationRequest`. Sau đó dùng UNUserNotificationCenter để lên lịch để gửi. <br>
```
        let request = UNNotificationRequest(identifier: "notification.duy",  
        content: content,  
        trigger: trigger)
        UNUserNotificationCenter.current().add(request, withCompletionHandler: nil)
```

Build và run ứng dụng, Click vào Send Local push notification và chờ kết quả.<br>
![](https://images.viblo.asia/d1a5c56a-a2e1-4c15-947c-69f4324652fa.png)<br>
Chúc các bạn thành công.