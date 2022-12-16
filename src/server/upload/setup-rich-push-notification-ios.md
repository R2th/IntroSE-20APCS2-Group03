**Notes: bài viết này chỉ hướng dẫn cho các app đã có sẵn chức năng push notification rồi, chỉ cần implement thêm rich push notification.**

Với những app cần phải implement push notification từ đầu thì bạn tham khảo các bước thực hiện ở đây nhé https://www.appcoda.com/push-notification-ios/

# Rich Push notification là gì?
Rich push notification có bản chất là push notification có hỗ trợ hiển thị ảnh, video, gif, và cả audio, chúng cũng bao gồm cả các button để tương tác

![](https://images.viblo.asia/b2ea67dc-5459-42ac-a055-afaa987eba93.png)
![](https://images.viblo.asia/9b7d8cf1-945e-4bbf-b9e4-85c1bbd82782.png)


Để cho dễ hiểu nội dung bài viết, cơ chế hoạt động của rich push notification có thể gói gọn như sau: 
- App cần có 2 thành phần là App chính và target Extension (Notification Service Extension) được add chung vào 1 App groups (để có thể truy cập data lẫn nhau)
- Khi nhận được push notification, Extension sẽ được active, chạy dưới backgound. Ở đó chúng ta sẽ download content. Sau đó đẩy về app chính hiển thị data, xử lý action khi click vào notification bên app chính.


# Cách làm

## Bước 1: setup trên Apple developer

### 1. Tạo App group mới

App groups có thể chia sẻ data giữa các app và giữa các app với extension. Điều này là cần thiết để có thể cho extension chạy dưới backgound, download data và lưu trữ lại để cho app chính có thể truy cập sử dụng sau.
Vào trang developer của apple. Vào Certificates, Identifiers & Profiles, chọn mục App Groups, chọn tạo mới 1 app group.
Ví dụ: 
![](https://images.viblo.asia/2812a932-ba12-49b9-83e7-86f34abe8e8f.png)

### 2. Tạo App ID mới cho notification extension
Sau khi tạo xong app group, cần phải tạo thêm 1 app id mới cho extension. 
![](https://images.viblo.asia/66b1093c-bd02-48bc-8a40-608aea3afc9a.png)

### 3. Enable App Groups
Bạn phải Enable App Groups cho cả 2 App ID của app Gốc và App Extension. Để sửa bạn chọn App ID, chọn Edit. Check vào mục App Groups sau đó chọn Edit
![](https://images.viblo.asia/2045c312-88e8-40b9-9a4d-3ea0a98c9ce2.png)

Sau đó check vào App group đã tạo ở trên và chọn Continue,  sau đó chọn Assign
![](https://images.viblo.asia/de842934-88fd-4aa1-96ee-45dcd1370371.png)

Đảm bảo App Groups của cả 2 App ID đã được Enable như trong hình
![](https://images.viblo.asia/db96b4cf-1354-44c2-a012-6f649681dd8d.png)

### 4. Tạo provisioning cho cả 2 app
- Nếu bạn đã tạo cho app chính rồi thì bạn chỉ cần tạo thêm cho app mới thôi nhé (nếu bạn chưa biết cách tạo có thể tham khảo trang: https://www.appcoda.com/push-notification-ios/ ở bước 5 ý: Step 5: Create a Provisioning Profile for Development)
- Sau đó bạn download về và mở ra để provisioning được import vào xcode

## Bước 2: setup trong XCode project

### 1. Tạo target Notification Extension Service
Chọn File -> New -> Target
![](https://images.viblo.asia/2c1fe56b-6e4b-402f-8420-58a570477767.png)

Chọn Notification Extension Service
![](https://images.viblo.asia/b4d940f1-c317-41fd-a584-4ebd067501ed.png)

Sau đó bạn điền thông tin cho extension, đảm bảo rằng Extension đã được Embed vào trong app chính nhé
![](https://images.viblo.asia/e120fa86-c0b9-40ec-8cc5-68e0077b430c.png)

Sau đó kích hoạt extension (Active)
![](https://images.viblo.asia/471aebc4-6b11-4c86-9752-a4bc5cb6737c.png)

Bạn cần set bundle id cho target vừa tạo chính là app extension bạn vừa tạo trên trang apple developer
![](https://images.viblo.asia/78746c97-0a71-459d-9668-34bffbbcc81f.png)

### 2. Setup App groups
- **Sau đó chọn đúng provisioning profile cho cả 2 target**

![](https://images.viblo.asia/8c89b2f4-9f70-4a0f-b713-e465eb0cbfd3.png)
![](https://images.viblo.asia/599fa4ca-6d19-40a5-8563-7d3954dba3c7.png)

- Bạn phải vào Capibilities của cả 2 (App chính vào Extension có Capabilities khác nhau nhé) và  **Enable App Groups** cho cả **2 app chính và extension** nhớ check cả vào group bạn đã tạo trên trang apple developer
![](https://images.viblo.asia/d0bfbffe-3dd9-46c0-85eb-4a51e7c8fb4c.png)

### 3. Implement code download media
Trong cây thư mục, bạn chọn target đã tạo ở trên bạn sẽ thấy có 1 file là "NotificationService.swift" - code ở đây nhé.
Bạn sẽ phải download media ở hàm `override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void)` tùy theo format json của push mà bạn phải chỉnh sửa sao cho phù hợp.

Dưới đây là code theo form của server app mình nhé: code này sẽ download file vào lưu vào **NSTemporaryDirectory()**

JSON format 
```
{
    "aps": {
        "alert": {
            "body": "Push notification body",
            "title": "Push notification title"
        },
        "mutable-content": 1
        category: "rich-apns"
    },
    "attachment": {
            "url": "https://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_2mb.mp4",
            "type": "mp4"
        }
}
```

```
import UserNotifications

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest,
                             withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = request.content.mutableCopy() as? UNMutableNotificationContent
        guard let bestAttemptContent = bestAttemptContent else {
            contentHandler(request.content)
            return
        }
        if let attachment = request.content.userInfo["attachment"] as? [String: String],
            let urlString = attachment["url"], let fileURL = URL(string: urlString), let type = attachment["type"] {
            URLSession.shared.downloadTask(with: fileURL) { (location, _, _) in
                let fileName = UUID().uuidString + "." + type
                let tmpFile = "file://".appending(NSTemporaryDirectory()).appending(fileName)
                if let location = location, let tmpUrl = URL(string: tmpFile) {
                    try? FileManager.default.moveItem(at: location, to: tmpUrl)
                    if let attachment = try? UNNotificationAttachment(identifier: "IDENTIFIER",
                                                                      url: tmpUrl, options: nil) {
                        bestAttemptContent.attachments = [attachment]
                    }
                }
                contentHandler(bestAttemptContent)
                }.resume()
        } else {
            contentHandler(bestAttemptContent)
        }
    }

    override func serviceExtensionTimeWillExpire() {
        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }

}
```

## Bước 3: Chạy thử
- Tạo file certificate để push: nếu bạn chưa tạo thì bạn có thể làm theo hướng dẫn của trang nay: https://www.appcoda.com/push-notification-ios/ tại Step 3 đó. Bạn chỉ cần tạo certificate cho app chính thôi nhé. lấy file **.p12** để push.
- Lấy device token: cái này chắc các bạn quan tâm đều biết rồi ;) nếu không thì google trong 1 nốt nhạc ra ngay ý mà ;)

- Để test thử bạn có thể vào trang  https://pushtry.com/ để bắn notification. Bạn điền devicetoken và file p12 vào nhé. sau đó có thể dùng json sau để test rich push
```
{
    "aps": {
        "alert": {
            "body": "Push notification body",
            "title": "Push notification title"
        },
        "mutable-content": 1
        category: "rich-apns"
    },
    "attachment": {
            "url": "https://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_2mb.mp4",
            "type": "mp4"
        }
}
```
- Sau đó thì xem kết quả trên device nhé ;)

# Kết luận
Với Rich Push notification bạn có thể gửi notification kèm với media như video, ảnh, audio, gif. Tuy nó phải setup nhiều thứ loằng ngoằng nhưng nó sẽ đem lại trải nghiệm rất tốt cho người dùng.

Notes: bạn cũng có thể custom layout của Rich Push với Notification Content Extension, nhưng bài này dài quá rồi nên mình không cho vào (bow)


Tài liệu tham khảo: 
- https://mobgen.github.io/halo-documentation/ios_rich_notifications.html
- https://medium.com/@tsif/ios-10-rich-push-notifications-with-media-attachments-a54dc86586c2
- https://www.appcoda.com/push-notification-ios/