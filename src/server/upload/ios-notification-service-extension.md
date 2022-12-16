Gần đây mình có tìm hiểu và làm việc với Notification Service Extension của IOS. Trước đây mình cũng chưa từng sử dụng nó bao giờ, chỉ đến khi nhận được yêu cầu làm sao khi app nhận được notification thì có thể show ảnh lên bên trong notification. Mình đã đi tìm đọc các bài viết và config theo. Tuy nhiên mình đã gặp 1 vấn đề dẫn đến thời gian cấu hình thực tế của mình dài hơn so với lúc đầu mình dự định. Bài viết này mình sẽ chia sẻ lại các bước để config và xử lý sao cho app có thể nhận được notification kèm theo ảnh một cách đơn giản nhất. Ngoài ra mình sẽ đưa ra vấn đề mình đã gặp phải.
Trước đây mình đã từng có bài viết liên quan đến việc config môi trường: [Xcode 11: Việc tạo và cấu hình môi trường là quá dễ dàng.](https://viblo.asia/p/xcode-11-viec-tao-va-cau-hinh-moi-truong-la-qua-de-dang-YWOZrBoYZQ0)
Thì trong bài viết này mình cũng sẽ config tương tự.
## Chuẩn bị
- Project đã được config push notification service
- AppID đã được enable push notification và đã có đầy đủ certificate.
- Bundle id dành riêng cho NotificationService
## Tạo và cấu hình dựa theo môi trường
### Tạo target
Đầu tiên, để tạo ra extension thì chúng ta có thể thực hiện
- chọn File -> New -> Target 
- chọn dấu + như ảnh bên dưới
![](https://images.viblo.asia/7c650acc-1304-433c-9628-8bc5f2d32074.png)

=> Sau đó thực hiện chọn Notification Service Extension, chọn Next.
Sau khi chọn Next, chúng ta sẽ cần đặt tên cho nó. Ở đây mình sẽ đặt tên là NotificationService để cho dễ nhận dạng. 
Lưu ý, bundle id này chúng ta ko thể thay đổi được ngay lúc tạo mới extension bởi vì nó luôn lấy theo config release của chúng ta. (Chúng ta sẽ update lại nó sau khi đã tạo xong)
![](https://images.viblo.asia/b0588fcb-366c-4245-8c55-d5ac5396fdc2.png)

### Cấu hình target
Việc cấu hình bundle id của notification service extension cũng tương tự giống như bài viết mình đã đề cập ở đầu bài viết, mình xin phép cũng ko nhắc lại các step.
Ở đây chúng ta sẽ cần đặt bundle id dành cho extension vừa tạo. Sau đó, sử dụng account  developer  của apple để tạo ra provisioning profile cho bundle id đó.
Lưu ý, khi tạo prosioning profile cho extension thì chúng ta cần phải sử dụng đúng certificate đã sử dụng trong target project.
Sau khi đã tiến hành tạo và thiết lập provisioning profile xong thì chúng ta có thể compile thử để xem có lỗi hay không. Nếu như quá trình build ko vấn dề gì thì sẽ chuyển xuống phần tiếp theo.
## Xử lý bóc tách data
Để thực hiện bước này, hãy đảm bảo rằng project của chúng ta đã nhận được notification từ server, dữ liệu payload từ notification đã có key có chứa image url.
Ở bước trên, khi chúng ta tạo xong Notification Service Extension thì Xcode đã tạo ra cho chúng ta 1 file NotificationService.swift
![](https://images.viblo.asia/fcc0fcfd-5fe3-4858-aa95-bf38352511b3.png)
Chúng ta sẽ cần bóc tách dữ liệu từ notification ra sao cho lấy được key có chứa image url
Hãy copy đoạn code sau vào:
```

import UserNotifications
import UIKit

class NotificationService: UNNotificationServiceExtension {
    
    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?
    
    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        
        //Media
        func failEarly() {
            contentHandler(request.content)
        }
        
        guard let content = (request.content.mutableCopy() as? UNMutableNotificationContent) else {
            return failEarly()
        }
        
        guard let apnsData = content.userInfo["fcm_options"] as? [String: Any] else {
            return failEarly()
        }
        
        guard let attachmentURL = apnsData["image"] as? String else {
            return failEarly()
        }
        
        guard let imageData = NSData(contentsOf: NSURL(string: attachmentURL)! as URL) else { return failEarly() }
        guard let attachment = UNNotificationAttachment.create(imageFileIdentifier: "image.gif", data: imageData, options: nil) else { return failEarly() }
        
        content.attachments = [attachment]
        if let c = content.copy() as? UNNotificationContent {
            contentHandler(c)
        }
        
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
    
}
extension UNNotificationAttachment {
    
    /// Save the image to disk
    static func create(imageFileIdentifier: String, data: NSData, options: [NSObject: AnyObject]?)
        -> UNNotificationAttachment? {
            
            let fileManager = FileManager.default
            let tmpSubFolderName = ProcessInfo.processInfo.globallyUniqueString
            let fileURLPath      = NSURL(fileURLWithPath: NSTemporaryDirectory())
            let tmpSubFolderURL  = fileURLPath.appendingPathComponent(tmpSubFolderName, isDirectory: true)
            
            do {
                try fileManager.createDirectory(at: tmpSubFolderURL!,
                                                withIntermediateDirectories: true,
                                                attributes: nil)
                let fileURL = tmpSubFolderURL?.appendingPathComponent(imageFileIdentifier)
                try data.write(to: fileURL!, options: [])
                let imageAttachment = try UNNotificationAttachment.init(identifier: imageFileIdentifier,
                                                                        url: fileURL!,
                                                                        options: options)
                return imageAttachment
            } catch let error {
                print("error \(error)")
            }
            
        return nil
    }
}

```

Ở trong đoạn code trên là mình đang config bóc tách image từ trong payload được gửi về từ Firebase Cloud Message. Các bạn có thể chỉnh sửa lại cho phù hợp với payload của riêng mình.
Sau khi config xong, hãy tiến hành build và test thử notification kèm theo image url
Kết quả tương tự sẽ như sau:
![](https://images.viblo.asia/99b16e53-eb1b-433e-81a8-0d6d8522393b.png)

## Kết bài.
Đầu bài thì mình có nhắc đến là mình gặp vấn đề dẫn tới thời gian thực hiện việc config này kéo dài hơn so với mình dự định ban đầu. Nguyên nhân là do Target project và target extension khác nhau về IOS Deployment Target, dẫn đến khi build lên Notification Service nó không hoạt động, mặc dù đã config đúng. Chính vấn đề này đã làm mình mất thêm thời gian để điều tra và search khắp thể loại.
Hy vọng bài viết này có thể giúp ích được cho bạn. Xin cảm ơn.