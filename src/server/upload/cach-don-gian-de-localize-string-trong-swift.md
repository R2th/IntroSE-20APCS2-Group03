# Giới thiệu
**"Localize String"** là quá trình dịch các label, buttton, text và nội dung nói chung sang nhiều ngôn ngữ. Điều này rất quan trọng, bởi vì bạn có thể tưởng tượng, ứng dụng càng hỗ trợ nhiều ngôn ngữ thì càng có nhiều người dùng được khuyến khích tải xuống và sử dụng nó.

Hôm nay tôi sẽ giải thích làm thế nào bạn có thể thực hiện "Localize String" một cách dễ dàng và nhanh chóng.

# Chuẩn bị 

Đầu tiên, mở Xcode và tạo một dự án Xcode mới. Chọn "Single View App"
![](https://images.viblo.asia/cf302b84-2001-4d1b-b846-52771ef899ec.png)

Chọn class ViewController.swift và add label với text “Hello” ở giữa màn hình. 

```
override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        let width = UIScreen.main.bounds.width
        let height = UIScreen.main.bounds.height
        let label = UILabel(frame: CGRect(x: width / 2, y: height / 2, width: 120, height: 30))
        label.text = "Hello"
        label.center = CGPoint(x: width / 2, y: height / 2)
        label.textAlignment = .center
        self.view?.addSubview(label)
        
    }
```

# Thực hiện 
OK, Label đã sẵn sàng để hiện thị trong ứng dụng nhưng làm thế nào để ứng dụng sẽ hỗ trợ nhiều ngôn ngữ khác nhau, làm thế nào có thể thay đổi văn bản một cách linh hoạt?

Điều đầu tiên cần làm là thêm một file Strings vào dự án, file này sẽ chứa tất cả các chuỗi của ứng dụng, và đặt tên là "Localizations"

![](https://images.viblo.asia/8e15973a-ece2-4b5d-972c-6579cbce950a.png)

Bên trong file này chúng ta sẽ thêm các (key,value) để định nghĩa cho các text của lable:

```
/* 
  Localizable.strings
  StringLocalization
*/
"ViewController_Label_Hello" = "Hello";
```

Bây giờ cần thêm một ngôn ngữ khác cho ứng dụng.
Chọn project và bên dưới "Localizations", click icon "+". Thêm bất kì ngôn ngữ nào mà bạn cần sau đó click "Finish"

![](https://images.viblo.asia/86d0f212-75ad-40df-9617-36c959fa5b48.png)

Bây giờ quay lại file Localizable.string, ở phần File Inspector(thanh menu bên phải) chọn "Localize". Chọn ngôn ngữ mới vừa được add sau đó click on "Finish"

![](https://images.viblo.asia/88278e22-1045-4c2f-bd48-d1734555880e.png)

Quay lại file Localizable.strings sẽ có kết quả như ảnh
![](https://images.viblo.asia/3d5b9521-b549-4d11-9a71-68ed483ade12.png)

Sau đó, chọn vào file ngôn ngữ mới của bạn (Localizable.strings (tiếng Ý) trong ảnh demo) và thay đổi từ "Hello" thành "Ciao" trong tiếng ý.

Quay trở lại file ViewContoder.swift và thay thế chuỗi Hello bằng chuỗi “NSLocalizedString(“ViewController_Label_Hello”, comment: “”)”.


# Kiểm tra xem

Nếu chạy ứng dụng mà không thay đổi bất cứ điều gì, chúng ta sẽ thấy thông báo của Hello. Vì tiếng Anh là ngôn ngữ mặc định của ứng dụng.
![](https://images.viblo.asia/767e8c2a-07c3-4986-98c9-2a0031117b6c.png)

Nhưng nếu bạn chỉnh ngôn ngữ bằng cách "Settings → General → Language & Region → iPhone Language"  và đổi sang Italian. Xem điều gì sẽ xảy ra với chuỗi "Hello"

![](https://images.viblo.asia/4973d5d4-f563-47b3-9c9e-698395d1a6e1.png)

Text của label đã chuyển sang "Ciao"


# Kết luận

Đây là một cách đơn giản và nhanh nhóng giúp ứng dụng của bạn có thể thay đổi đa ngôn ngữ.



Nguồn tham khảo
https://medium.com/better-programming/how-to-easily-localize-your-app-strings-in-swift-fa28a380217b