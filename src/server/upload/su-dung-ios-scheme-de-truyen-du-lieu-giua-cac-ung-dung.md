### 1. Giới thiệu
Đã bao giờ bạn xử dụng một ứng dụng trên iOS nào đó mà có lúc cần phải tiến hành xác thực thông qua code được bằng tin nhắn, rồi đơn giản chỉ cần "click" vào tin nhắn gửi đến, là mã xác nhận tự động được điền vào ô nhập. Vậy làm thế nào mà các ứng dụng đó,  có thể làm được điều đó, câu trả lời đó chình là Scheme URL. Scheme URL cho phép các ứng dụng có thể tương tác được với nhau như ví dụ ở trên mình để cập. Một ứng dụng có thể đăng kí một hoặc nhiều URL Scheme. 
Một số url scheme cả một số ứng dụng mặc định có thể kể đên bao gồm:

| Tên Ứng Dụng | URL Scheme|
| -------- | -------- | 
| Mail     | mailto:     | 
| Phone     | tel:    | 
| Facetime     | facetime: | 
| Facetime Audio     | facetime-audio: | 
| Message     | sms: | 
| Apple Map     | http://maps.apple.com/ | 

Đó là những url scheme mặc định, đã được public cho phép các nhà phát triển có thể tương tác với những ứng dụng mặc định. Chúng ta cũng có thể đăng kí cho ứng dụng của chúng ta một url scheme, cho phép các ứng dụng khác có thể tương tác với.

### 2. Đăng khí URL Scheme 


![](https://images.viblo.asia/8d3f81cd-4c5b-479e-9ecf-3bf8aeb9ade2.png)

 Để đăng kí url scheme, chúng ta thông cần thêm trong file Info.plist, các bạn mở file ra rồi thêm  các thông tin như ảnh trên, trong mục Schemes mình thêm 2 giá trị "UsingScheme" và  "UsingScheme2", cả 2 đều có thể sử dụng để "invoke" ứng dụng của chúng ta lên.

### 3 . Gửi-Nhận dữ liệu qua URL Scheme
Mình sẽ viết 2 ứng dụng, một ứng dụng đã đăng ký trong Info.plist có một url scheme có giá trị là `UsingScheme` tên là `UsingScheme` giống như hình ảnh phía trên, một ứng dụng tên là `Sender` để gửi dữ liệu sang `UsingScheme` . 
#### * Sender 
```
//
//  ViewController.swift
//  Sender
//
//  Created by Tung Vu on 3/31/18.
//  Copyright © 2018 Tung Vu. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var inputTF: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func sendClick(_ sender: Any) {
        if let text = inputTF.text, !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            if let url = URL(string: String(format: "%@%@","UsingScheme://" ,text )) {
                UIApplication.shared.open(url, options: [String: Any](), completionHandler: nil)
            }
        }
        
    }

}


```
Đây là phần code của `Sender`, nhận vào một input text, tạo ra một URL với phần mở đầu là `iOSSchemeDemo://`, để gọi một ứng dụng khác khi biết được url scheme của ứng dụng đó, chúng ta sử dụng api `                    UIApplication.shared.open(url, options: [String: Any](), completionHandler: nil)
`
#### * UsingScheme
```
 public func application(_ application: UIApplication, handleOpen url: URL) -> Bool {
        NSLog("scheme value \(url.absoluteString)" )
        
        let arrData = url.absoluteString.components(separatedBy: "//")
        if arrData.count > 1, let mainVC = self.window?.rootViewController as? ViewController {
            mainVC.updateData(newValue: arrData[1])
        }
 
        return true
    }

```
 iOS đã cung cấp cho chúng ta một callback để biết được khi nào ứng dụng của ta được gọi bởi các ứng dụng khác, các bạn mở `Appdelegate.cs` lên và thêm vào đoạn code trên. Tại đây ta có thể nhận được `url` mà phía `Sender` đã gửi.
 {@youtube:https://www.youtube.com/watch?v=em9CSeG07mk&feature=youtu.be}
###  4. Mở ứng dụng khác từ ứng dụng Message của iPhone
Quay trở lại bài toán ban đầu, đó là làm sao để truyền dữ liệu từ ứng dụng Message của iPhone. Bây giờ chúng ta đã biết được url scheme của ứng dụng cần truyền rồi, đơn giản là khi cần đến buước xác nhận, hãy yêu cầu server gửi một tin nhắn với nội dung sau
```
UrlScheme://<dữ liệu>
```
Khi đó OS sẽ hiểu tin nhắn của bạn là một clickable link và chỉ việc tap vào đó để mở ứng dụng mong muốn.
Ví dụ bạn muốn gửi code 123456 đến ứng dụng `UsingScheme` thì nội dung tin nhắn sẽ là `UsingScheme://123456`
 {@youtube:https://www.youtube.com/watch?v=JvqGmxvd2AQ&feature=youtu.be}
 
 Link Source Code: https://github.com/tungvt01/iOSScheme.git