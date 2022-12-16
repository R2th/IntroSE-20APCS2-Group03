Trong bài viết này, bạn sẽ học được cách dùng UIVisualEffectView để tạo ra hiệu ứng glass(nền mờ) cho ứng dụng của bạn 
# Giới thiệu
Kể từ sau iOS 7, hiệu ứng nền mờ bắt đầu xuất hiện nhiều trong các ứng dụng, sử dụng một cách hợp lý, hiệu ứng này sẽ giúp cho ứng dụng của bạn trở nên hấp dẫn hơn về mặt thị giác trong mắt người dùng

Apple sử dụng tính năng làm mờ ở cấp độ hệ thống để mang lại hiệu quả tuyệt vời. Hai ví dụ đáng chú ý là Control Center và iOS 14 Widget Center. Nền mờ được sử dụng trong những ứng dụng này giữ nguyên bối cảnh của một hành động - Trung tâm điều khiển và Trung tâm tiện ích không phải là ứng dụng của riêng chúng, thay vào đó chúng là các bảng hiển thị phía trên ứng dụng đang hoạt động.

Notification Center cũng sử dụng hiệu ứng làm mờ, nhưng thay vì làm mờ toàn bộ nền, mỗi phần mở rộng hoặc thông báo của Notification Center có nền mờ riêng. Ngoài việc trông đẹp mắt, độ mờ này giúp mỗi yếu tố nổi bật ở mức vừa phải.

![](https://images.viblo.asia/5d07759e-1ed9-4e2f-93cf-f66196ae6002.png)

# Hiệu ứng làm mờ bằng UIVisualEffectView
# 
UIKit cung cấp toàn bộ các tính năng tốt về hiệu ứng hình ảnh. UIBlurEffect, một class con của UIVisualEffect, đặc biệt có liên quan, vì nó cung cấp các hiệu ứng làm mờ đẹp mắt mà bạn thấy trong thanh điều hướng, Trung tâm thông báo và Trung tâm điều khiển - và bạn cũng có thể sử dụng nó trong các ứng dụng của mình.

### Thêm UIBlurEffect

Trong ViewController của bạn, hãy thêm đoạn code như sau để thêm hiệu ứng mờ vào view của bạn 

```
// 1
view.backgroundColor = .clear
// 2
let blurEffect = UIBlurEffect(style: .light)
// 3
let blurView = UIVisualEffectView(effect: blurEffect)
// 4
blurView.translatesAutoresizingMaskIntoConstraints = false
view.insertSubview(blurView, at: 0)
```

Giải thích đoạn code trên: 
* 1. Để UIVisualEffectView thực sự làm mờ nội dung, superview của nó phải trong suốt. Để làm cho nó trong suốt, hãy thay đổi màu nền của view thành rõ ràng.
* 2. Tạo UIBlurEffect với style UIBlurEffect.Style.light. Điều này xác định kiểu mờ. Có nhiều style khác nhau.
* 3. Tạo một UIVisualEffectView với hiệu ứng mờ bạn vừa tạo. Lớp này là một lớp con của UIView. Mục đích duy nhất của nó là xác định và hiển thị các hiệu ứng hình ảnh phức tạp.
* 4. Tắt tính năng auto-resizing masks, chuyển thành constraint trong blurView.

Bây giờ bạn cần đảm bảo BlurView được bố trí phù hợp với phần còn lại của khung nhìn. Thêm mã sau vào cuối viewDidLoad:
```
NSLayoutConstraint.activate([
  blurView.topAnchor.constraint(equalTo: view.topAnchor),
  blurView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
  blurView.heightAnchor.constraint(equalTo: view.heightAnchor),
  blurView.widthAnchor.constraint(equalTo: view.widthAnchor)
])
```

### Thêm Vibrancy vào hiệu ứng Blur

Hiệu ứng làm mờ rất tuyệt vời ‚nhưng như thường lệ, Apple đã đưa nó lên một tầm cao mới với UIVibrancyEffect. Vibrancy, khi được sử dụng kết hợp với UIVisualEffectView, sẽ điều chỉnh màu sắc của nội dung để tạo cảm giác sống động hơn.

Hình ảnh sau đây cho thấy cách vibrancy làm cho các nhãn và biểu tượng của bạn bật ra khỏi màn hình, đồng thời hòa trộn với chính nền:
![](https://images.viblo.asia/66d67bed-1a27-4ab5-bcbc-7af40a78aef8.png)

Trong ViewController của bạn, thực hiện add đoạn code sau để thêm hiệu ứng Vibrancy: 

```
// 1
let vibrancyEffect = UIVibrancyEffect(blurEffect: blurEffect)
// 2
let vibrancyView = UIVisualEffectView(effect: vibrancyEffect)
vibrancyView.translatesAutoresizingMaskIntoConstraints = false
// 3
vibrancyView.contentView.addSubview(optionsView)
// 4
blurView.contentView.addSubview(vibrancyView)
```

Sau đó thêm các constraint :
```
NSLayoutConstraint.activate([
  vibrancyView
    .heightAnchor
    .constraint(equalTo: blurView.contentView.heightAnchor),
  vibrancyView
    .widthAnchor
    .constraint(equalTo: blurView.contentView.widthAnchor),
  vibrancyView
    .centerXAnchor
    .constraint(equalTo: blurView.contentView.centerXAnchor),
  vibrancyView
    .centerYAnchor
    .constraint(equalTo: blurView.contentView.centerYAnchor)
])

NSLayoutConstraint.activate([
  optionsView
    .centerXAnchor
    .constraint(equalTo: vibrancyView.contentView.centerXAnchor),
  optionsView
    .centerYAnchor
    .constraint(equalTo: vibrancyView.contentView.centerYAnchor)
])
```

Ở đầu function ViewDidLoad khởi tạo blurEffect: 
```
let blurEffect = UIBlurEffect(style: .dark)
```

Chúc bạn ứng dụng thành công Hiệu ứng thú vị này vào ứng dụng của mình