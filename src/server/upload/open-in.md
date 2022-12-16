Trong bài này mình sẽ hướng dẫn setting ứng dụng giúp nó có thể mở các file từ bên ngoài. 
![](https://images.viblo.asia/640691d9-2d66-4106-a0d8-a546c86c4705.png)

## Setting ứng dụng
Để iOS có thể detect được các ứng dụng có thể mở được file bạn muốn. Bạn cần đăng ký nó với hệ điều hành iOS.
Để đăng ký nó bạn thực hiện như sau:
Chọn AppProject select tab info. Thêm một document Types cho ứng dụng của bạn.
![](https://images.viblo.asia/bd3ee7e1-316d-4719-8648-458908f3e7a3.png)

**Name**: Đặt tên Document type bạn muốn support.

**Types**: Nhập UTI type cho kiểu file ứng dụng của bạn có thể support. Ở đây mình ví dụ một ứng dụng giải nén file như sau.

**Icon**: Thêm icon hiển thị trên action sheet khi bạn open in app.
Về cơ bản bạn đã đăng ký với iOS ứng dụng của bạn support mở file zip. Sau khi user cài đặt và chạy ứng dụng nó sẽ đăng kí với iOS. Điều đó có nghĩa là khi bạn mở một file zip trên safari hoặc share file từ device nó sẽ suggest user tới ứng dụng cuả bạn. 

![](https://images.viblo.asia/9513a551-5acb-4f2a-8073-e9e7850da41f.png)

## Xử lý file 
Sau khi đăng ký với iOS những kiểu file mà ứng dụng bạn có thể mở thì phần tiếp theo là xử lú nó trong ứng dụng của bạn. Thông thường bạn sẽ có một hệ sinh thái các app và việc mở ứng dụng này support open file từ ứng dụng khác là khá tuyệt vời. TH bạn mở từ một nguồn không xác định thì việc đó cần bạn handle một số trường hợp ngoại lệ.

Tại AppDelegate Implement
`func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool`

```
if let scheme = url.scheme {
    if scheme.contains("APP_SCHEME"){        
        // Xử lý mở đến data trong app của bạn
    
    } else if scheme.contains("file") {
        // Xử lý mở file đã lưu trong thiết bị
    }
}
```

![](https://images.viblo.asia/745e05da-6651-4d5e-8712-bd80c105d586.png)

## Kết luận
Đây là một tính năng khá hay cho ứng dụng của bạn. 
Tài liệu tham khảo:
https://developer.apple.com/documentation/uikit/view_controllers/adding_a_document_browser_to_your_app/setting_up_a_document_browser_app