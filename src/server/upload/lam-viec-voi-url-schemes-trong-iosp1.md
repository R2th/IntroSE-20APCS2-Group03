### 1.URL Schemes là gì?
- URL Schemes một tính năng thú vị được cung cấp bởi SDK iOS cho phép các lập trình viên IOS khởi chạy app IOS và các app của bên thứ ba thông qua URL. Ví dụ: giả sử app của bạn hiển thị một số điện thoại và bạn muốn thực hiện cuộc gọi bất cứ khi nào người dùng chạm vào số đó. Bạn có thể sử dụng URL schemes cụ thể để khởi chạy app điện thoại tích hợp và tự động quay số. 
- Tương tự, bạn có thể sử dụng URL scheme khác để khởi chạy  Mail để gửi một tin nhắn SMS. Ngoài ra, bạn có thể tạo một URL scheme  tùy chỉnh cho app của riêng bạn để các app khác có thể khởi chạy app của bạn qua một URL.
### 2.Sử dụng URL schemes:
- Để bắt đầu, các bạn hãy [download demo app](https://github.com/appcoda/QRCodeReader). Lưu ý là app chỉ chạy trên thiết bị thật.
- Đối với hầu hết các app tích hợp sẵn, Apple cung cấp hỗ trợ cho các URL schemes . Ví dụ: bạn sử dụng **mailto** schemes để mở app **Mail** (ví dụ mailto:support@appcoda.com) hoặc **tel** để bắt đầu một cuộc gọi điện thoại (ví dụ tel://123456789). Để mở một app với URL schemes tùy chỉnh, tất cả những gì bạn cần làm là gọi **open(_:options:completionHandler:)** phương thức của **UIApplication**:
```javascript
UIApplication.shared.open(url, options: [:], completionHandler: nil)
```
- Bây giờ, chúng ta sẽ sửa đổi app demo để mở app tương ứng khi mã QR được decode. Mở  Xcode project và chọn QRScannerController.swift. Thêm một method trợ giúp được gọi là** launchApp** trong class:
```javascript
func launchApp(decodedURL: String) {
    let alertPrompt = UIAlertController(title: "Open App", message: "You're going to open \(decodedURL)", preferredStyle: .actionSheet)
    let confirmAction = UIAlertAction(title: "Confirm", style: UIAlertActionStyle.default, handler: { (action) -> Void in
        
        if let url = URL(string: decodedURL) {
            if UIApplication.shared.canOpenURL(url) {
                UIApplication.shared.open(url, options: [:], completionHandler: nil)
            }
        }
    })
    
    let cancelAction = UIAlertAction(title: "Cancel", style: UIAlertActionStyle.cancel, handler: nil)
    
    alertPrompt.addAction(confirmAction)
    alertPrompt.addAction(cancelAction)
    
    present(alertPrompt, animated: true, completion: nil)
}
```
- Method **launchApp** lấy một URL được decode từ mã QR và tạo ra một alert. Nếu người dùng nhấn nút Xác nhận, app sẽ tạo một URL object và mở nó.  Sau đó, iOS sẽ mở app tương ứng dựa trên URL đã chọn.
- Trong method **metadataOutput** được gọi khi một mã QR được tìm thấy, thêm một dòng code để gọi **launchAppphương** thức:
```javascript
launchApp(decodedURL: metadataObj.stringValue!)
```
- Thêm vào phía trên dòng code vừa được add:
```javascript
messageLabel.text = metadataObj.stringValue
```
- Giờ hãy complie and run app. Dùng camera của bạn chọn 1 trong số các QR code. App sẽ nhắc bạn với một hành động khi mã QR được decode. Khi bạn nhấn vào nút Xác nhận, nó sẽ mở ứng dụng Điện thoại và bắt đầu cuộc gọi.
![alt](https://www.appcoda.com/wp-content/uploads/2018/01/url-schemes-2-1240x768.png)
- Nhưng có một vấn đề nhỏ với ứng dụng hiện tại. Nếu bạn nhìn vào phần hiển thị console log, bạn sẽ thấy cảnh báo sau:
```javascript
2018-31-03 10:39:05.343934+0800 QRCodeReader[33092:8714123] Warning: Attempt to present <UIAlertController: 0x10282dc00> on <QRCodeReader.QRScannerController: 0x107213aa0> while a presentation is in progress!
```
- Các method **launchAppphương**  được gọi mỗi khi một Bar Code hoặc  QR Code được quét. Vì vậy, app có thể present các **UIAlertController** khác khi đã có một **UIAlertController** được present . Để giải quyết vấn đề, chúng ta phải kiểm tra xem app đã present một **UIAlertController** object trước khi gọi method **present(_:animated:completion:)** hay chưa?
- Trong iOS, khi bạn present một viewController bằng cách sử dụng method  **present(:animated:completion:**) ,viewController được lưu trữ trong  **presentedViewControllee** của **viewController** hiện tại. Ví dụ, khi **QRScannerController** object gọi method **present(:animated:completion:)** để  present object **UIAlertController**, property **presentedViewController**  được xem là **UIAlertController** object. Khi **UIAlertController** object bị loại bỏ,giá trị  **presentedViewController**  sẽ được đặt thành **nil**.
- Tất cả những gì bạn cần làm là đặt đoạn code sau vào phần đầu của  method **launchApp**:
```javascript
if presentedViewController != nil {
    return
}
```
- Bạn có thể nhận thấy là app không thể mở hai URL này:
```javascript
- fb://feed
- whatsapp://send?text=Hello!
```
- Các URL này được gọi là URL Schemes  tùy chỉnh được tạo bởi các app của bên thứ ba. Đối với iOS 9 trở lên, ứng dụng không thể mở các URL tùy chỉnh này. Apple đã thực hiện một thay đổi nhỏ để xử lý URL Schemes, đặc biệt cho method **canOpenURL()**. Nếu URL Schemes  không được đăng ký trong plist, method này sẽ trả về false. Nếu bạn quan sát console log, bạn sẽ thấy lỗi như sau:
```javascript
2018-31-03 11:08:26.771183+0800 QRCodeReader[33113:8719488] -canOpenURL: failed for URL: "fb://feed" - error: "This app is not allowed to query for scheme fb"
```
- Điều này giải thích lý do tại sao các  app không thể mở Facebook và Whatsapp ngay cả khi nó có thể decode URL của chúng. Chúng ta sẽ xem thêm về URL Schemes  tùy chỉnh trong phần tiếp theo và tôi sẽ  chỉ cho bạn cách khắc phục sự cố này.