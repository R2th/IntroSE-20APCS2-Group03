# Giới thiệu
Với mục đích đưa các chức năng email vào ứng dụng iOS, **MFMailComposeViewController** là một View Controller cho phép cung cấp những tính năng email cơ bản nhất như soạn và gửi thư.
Ngoài ra nó còn cho phép người dùng thiết lập các giá trị mặc định như danh sách người gửi, tiêu đề, nội dung thư.
Bài viết này sẽ từng bước tích hợp View Controller này vào ứng dụng iOS của bạn.

# Khởi tạo.
**MFMailComposeViewController** là một thành phần trong framework **MessageUI** nên ta cần phải khao báo thư viện này để sử dụng.
`import MessageUI`

Bước tiếp theo, ta cần phải kiểm tra xem ứng dụng có quyền gửi email hay không, bằng cách thêm đoạn chương trình dưới đây

```
func composeEmail() {
    guard MFMailComposeViewController.canSendMail() else {
        let alert = UIAlertController(title: "Send email", message: "This device cannot send emails.", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
 
        self.present(alert, animated: true, completion: nil)
        return       
    }
}
```

Phương thức **canSendMail** sẽ kiểm tra xem ứng dụng có thể gửi mail không, nếu không sẽ hiển thị thông báo lỗi.

# Cấu hình đối tượng MFMailComposeViewController
Trước tiên ta cần khởi tạo View Controller **MFMailComposeViewController**
```
let email = MFMailComposeViewController()
email.mailComposeDelegate = self
```

Ngoài ra ta có thể khởi tạo các giá trị sau trước khi hiển thị giao diện soạn mail
- Tiêu đề của mail

`email.setSubject("New post on my site!")`

- Danh sách người nhận
**email.setToRecipients(["some@body.abc", "another@recipient.xyz", "john@thefamous.doe"])**
Ngoài ra ta có thể sử dụng các chức năng CC và BCC để thay đổi danh sách người nhận thông qua 2 phương thức **setCcRecipients()** và **setBccRecipients()**

-Thông tin người gửi

`email.setPreferredSendingEmailAddress("gabriel@serialcoder.dev")`

- Nội dụng mail dưới dạng HTML hoặc là dạng Text

`email.setMessageBody("This is a sample message!", isHTML: false)`

Toàn bộ đoạn chương trình cho các bước trên:
```
func composeEmail() {
    guard MFMailComposeViewController.canSendMail() else {
        let alert = UIAlertController(title: "Send email", message: "This device cannot send emails.", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        self.present(alert, animated: true, completion: nil)
        return        
    }
    
    let email = MFMailComposeViewController()
    email.mailComposeDelegate = self
    
    // Set email subject.
    email.setSubject("New post on my site!")
    
    // Set recipients.
    email.setToRecipients(["some@body.abc", "another@recipient.xyz", "john@thefamous.doe"])
 
    // Set the From field email address.
    email.setPreferredSendingEmailAddress("gabriel@serialcoder.dev")
    
    // Set email body.
    email.setMessageBody("This is a sample text!", isHTML: false)
    
    // Present the email compose view controller.
    self.present(email, animated: true, completion: nil)
}
```

# Thực thi phương thức của mail delegate
MFMailComposeViewController cung cấp phương thức cho phép theo dõi lỗi và trạng thái của mail thông qua 2 tham số:
- error: để kiểm soát lỗi
- result; để theo dõi trạng thái của mail

```
extension UIViewController: MFMailComposeViewControllerDelegate {
    public func mailComposeController(_ controller: MFMailComposeViewController,
                                      didFinishWith result: MFMailComposeResult,
                                      error: Error?) {        
        guard error == nil else {
            print(error!.localizedDescription)
            controller.dismiss(animated: true, completion: nil)
            return
        }
        
        switch result {
            case .sent: print("The email was sent")
            case .saved: print("The email was saved")
            case .cancelled: print("The email was cancelled")
            case .failed: print("Failed to send email")
            @unknown default: break
        }
        
        controller.dismiss(animated: true, completion: nil)
    }
}
```

# Nguồn tham khảo
https://serialcoder.dev/text-tutorials/ios-tutorials/email-composer-on-ios/