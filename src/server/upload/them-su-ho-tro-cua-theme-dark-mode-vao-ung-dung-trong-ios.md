## Chế độ Dark Mode: thêm sự hỗ trợ cho dứng dụng của bạn trong Swift 
> Dark Mode được giới thiệu trong iOS 13 và được công bố tại WWDC 2019. Nó thêm một chủ đề tối hơn cho iOS và cho phép bạn làm như thế tương tự cho ứng dụng của bạn. Đây là một sự bổ sung tuyệt vời vì nó cung cấp cho người dùng của bạn để họ có thể trải nghiệm ứng dụng với một thiết kế mới lạ, đặc sắc hơn. 

Trong bài viết này, mình sẽ chia sẻ với bạn những trải nghiệm của mình sau khi thêm chế độ Dark Mode cho ứng dụng của mình.

### 1. Cách thoát khỏi và tắt chế độ Dark Mode 
Trước khi mình  đi sâu vào việc áp dụng kiểu giao diện Dark Mode, mình muốn nói ngay với bạn cách bạn có thể thoát khỏi chế độ này. Khi bạn bắt đầu xây dựng ứng dụng của mình bằng Xcode 11, bạn sẽ nhận thấy rằng giao diện đã tối hơn vì đã được bật theo mặc định. 

Nếu bạn không thích chế độ Dark Mode, bạn có thể vô hiệu hóa nó bằng cách thêm **UIUserInterfaceStyle** vào file **Info.plist** của bạn và đặt nó thành **`Light`**. 

### 2. Ghi đè chế độ Dark Mode cho mỗi ViewController

Bạn có thể ghi đè kiểu giao diện người dùng trên mỗi **ViewController** và đặt nó thành **`.light`** hoặc **`.dark`** bằng code sau:

```
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        overrideUserInterfaceStyle = .dark
    }
}
```

### 3. Ghi đè chế độ Dark Mode cho mỗi View 

Bạn có thể làm tương tự cho một **UIView**, ví dụ:

```
let view = UIView()
view.overrideUserInterfaceStyle = .dark
```

### 4. Ghi đè chế độ Dark Mode cho mỗi Window

Ghi đè kiểu giao diện người dùng trên mỗi **Window** có thể hữu ích nếu bạn muốn tắt chế độ Dark Mode thì viết code như sau:

```
UIApplication.shared.windows.forEach { window in
    window.overrideUserInterfaceStyle = .dark
}
```

Lưu ý rằng mình đang sử dụng mảng windows ở đây vì thuộc tính **`keyWindow`** trong shared của **`UIApplication`** không được dùng nữa từ iOS 13. Không khuyến khích sử dụng nó vì các ứng dụng hiện tại có thể hỗ trợ nhiều scenes mà tất cả đều có window đính kèm.

### 5. Cách bật chế độ Dark Mode để test  

Nếu bạn bắt đầu thực hiện giao diện Dark Mode trong ứng dụng của mình, điều quan trọng là phải có cách test tốt nhất. Có nhiều cách để kích hoạt và chuyển đổi chế độ xuất hiện mà tất cả đều có ưu điểm riêng của chúng.

### 5.1 Kích hoạt chế độ Dark Mode trên trình giả lập

Điều hướng đến trang **Developer** trong ứng dụng cài đặt trên trình giả lập của bạn và bật công tắc cho giao diện tối:

![](https://images.viblo.asia/48f91e15-9329-4e7d-be82-78290a886fdf.png)

### 5.2 Kích hoạt chế độ Dark Mode trên thiết bị

Trên thiết bị, bạn có thể bật chế độ Dark Mode bằng cách điều hướng đến trang **Hiển thị & Độ sáng** trong ứng dụng cài đặt. Tuy nhiên, trong quá trình phát triển, việc thêm một tùy chọn vào trung tâm điều khiển sẽ nhanh chóng chuyển đổi giữa chế độ tối và sáng như [sau.](https://www.avanderlee.com/wp-content/uploads/2019/02/control_centre_dark_mode_switch.mp4)

### 5.3 Chuyển sang chế độ Dark Mode từ menu debug 

Khi làm việc trong Xcode với trình giả lập mở, bạn có thể muốn sử dụng cửa sổ ghi đè môi trường thay thế. Điều này cho phép bạn nhanh chóng chuyển đổi ngoại hình trong khi gỡ lỗi:

![](https://images.viblo.asia/c4d076e0-0104-4197-a729-8abab43b3dce.png)

Lưu ý: Nếu bạn không thấy tùy chọn này, bạn có thể đang chạy trên thiết bị iOS 12 trở xuống.

### 5.4 Kích hoạt chế độ Dark Mode trong Storyboards

Trong khi làm việc với các Views của bạn bên trong Storyboard, có thể hữu ích khi đặt giao diện thành tối trong Storyboard. Bạn có thể tìm thấy tùy chọn này bên cạnh lựa chọn thiết bị ở phía dưới:

![](https://images.viblo.asia/82762d95-af90-4839-bb2b-50a7b15fd762.png)

### 6. Kết luận 

Mình đã đề cập đến rất nhiều cách để điều chỉnh chế độ **Dark Mode** trong ứng dụng của bạn. Hy vọng rằng, điều này sẽ giúp bạn thực hiện chế độ này hiệu quả hơn một chút!

Vậy là bài viết của mình đến đây là hết 😁. Mong rằng bài viết của mình sẽ giúp các bạn áp dụng được vào project

Cảm ơn các bạn đã theo dõi bài viết. 😃