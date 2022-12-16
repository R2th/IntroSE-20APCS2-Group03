![](https://images.viblo.asia/e0672793-3a83-4496-a802-0b02e42bb96e.jpeg)
<br>*iOS 13 dark mode*
<br>
Tóm lại, để áp dụng chế độ dark mode trong iOS, bạn cần chuẩn bị hai bộ màu hoặc hình ảnh. Một cho chế độ ban ngày và một cho chế độ ban đêm.

Nếu ứng dụng của bạn không có biểu tượng, màu sắc hoặc hình ảnh tùy chỉnh cho chế độ tối, thì ứng dụng này sẽ khá đơn giản. 
Nó sẽ yêu cầu một số công việc, nhưng tôi sẽ chỉ cho bạn một số cách tiếp cận để giúp bạn xử lý việc này.

## UI Element Colors (Semantic Color)

UI Element Color là một bộ đối tượng màu tiêu chuẩn mới để sử dụng với label, text, background, link và hơn thế nữa. 
Và nó chỉ có trên iOS 13, tvOS 13 trở lên.

Điều này có nghĩa là Apple cũng đã chuẩn bị hai bộ màu cho tất cả các thành phần UI hệ thống. Cái khó khăn là một tên màu thực sự được ánh xạ thành hai màu - một cho chế độ ban ngày, một cho chế độ ban đêm. Ví dụ:

```
lable.textColor = .label
```

UIColor.label nó là màu đen ở chế độ ban ngày và màu trắng ở chế độ ban đêm. Miễn là bạn sử dụng Color Element, hệ thống sẽ xử lý các thay đổi màu cho bạn khi người dùng của bạn chuyển đổi giữa chế độ ban ngày và chế độ ban đêm.

## Tích hợp vào UI Color mặc định
Nếu một số thành phần UI trong dự án của bạn đang sử dụng màu hệ thống mặc định, bạn chỉ cần thay đổi chúng thành UI Element Color mới.
```
self.label.textColor = .label
self.view.backgroundColor = .systemBackground
```

### Interface Builder

![](https://images.viblo.asia/79c77d07-4271-477e-8c71-152085849a71.png)

## Làm cách nào để chuyển đổi Chế độ tối trong Simulator?
Khi bạn mở Xcode 11 beta trở lên, có một biểu tượng environment overrides, khi bạn chạy ứng dụng của mình trong simulator. 
Nhấp vào nó và sau đó bạn có thể chuyển chế độ tối trong simulator của mình.

![](https://images.viblo.asia/c1cb77d0-1643-410c-8fdc-1ccbf19a4127.png)

## Tích hợp vào UI Color tùy chỉnh
Trong iOS 13, trình khởi tạo UIColor mới đã được giới thiệu:
```
init(dynamicProvider: @escaping (UITraitCollection) -> UIColor)
```

Bạn có thể tùy chỉnh màu của riêng bạn, dựa trên thuộc tính userInterfaceStyle từ UITraitCollection:
```
extension UIColor {
    static func myColor() -> UIColor {
        if #available(iOS 13, *) {
            return UIColor.init { (trait) -> UIColor in
                // the color can be from your own color config struct as well.
                return trait.userInterfaceStyle == .dark ? UIColor.darkGray : UIColor.orange
            }
        }
        else { return UIColor.orange }
    }
}
```

Bạn có thể chỉ cần tạo một bộ màu mới từ Assets, rồi dưới bảng điều khiển, thay đổi Giao diện sang chế độ tối, sau đó bạn có thể đặt hai màu.

![](https://images.viblo.asia/7ecc8910-c81f-4339-87a3-22ed485b99bd.png)

Sau khi cài đặt màu trong Assets, bạn có thể sử dụng tên này ở bất cứ đâu và tất nhiên, hệ thống sẽ xử lý việc thay đổi màu cho bạn khi chế độ tối được bật.

## Tích hợp vào UI hình ảnh tùy chỉnh
Tương tự như màu sắc, hình ảnh cho chế độ tối cũng có thể được đặt trong Assets.

Điểm hay của việc thiết lập màu sắc hoặc hình ảnh trong Tài sản là nó tương thích ngược. Điều đó có nghĩa là bạn không cần phải gọi if #available(iOS13, *) trong mã của bạn. Hệ thống sẽ tự động sử dụng màu sắc hoặc hình ảnh chế độ ngày cho một ứng dụng chạy iOS 12 trở về trước.

Nguồn: Medium.com