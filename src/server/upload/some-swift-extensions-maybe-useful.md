Các tiện ích mở rộng trong Swift là một điều may mắn và nó nên được sử dụng trong các ứng dụng iOS của bạn để tăng tốc mọi thứ. Ở đây, một định nghĩa về phần mở rộng của Tài liệu lập trình Swift -

Phần mở rộng thêm chức năng mới cho một lớp, cấu trúc, kiểu liệt kê hoặc loại giao thức hiện có. Điều này bao gồm khả năng mở rộng các loại mà bạn không có quyền truy cập vào mã nguồn gốc.

Với Tiện ích mở rộng, bạn có thể thêm chức năng tùy chỉnh và sử dụng chúng trong suốt dự án của mình. Bạn cũng có thể mở rộng Lớp UIKit và thêm mã của mình cho các trường hợp sử dụng khác nhau.

Lưu ý - Tiện ích mở rộng có thể thêm chức năng mới vào một loại, nhưng chúng không thể ghi đè chức năng hiện có.
Hôm nay, chúng ta hãy xem xét một số tiện ích mở rộng Swift mà bạn có thể thêm vào dự án của mình theo nhu cầu của bạn.

## Padding UIButton

Thay vì điều chỉnh xung quanh với titleEdgesInsets và contentEdgeInsets, ta sẽ tạo tiện ích mở rộng CGSize đơn giản này, sau đó sử dụng trong các lớp con UIButton:

```
extension CGSize {
    func addingPadding(width: CGFloat, height: CGFloat) -> CGSize {
        CGSize(width: self.width + width, height: self.height + height)
    }
}

// Usage:
class PaddedButton: UIButton {
    override var intrinsicContentSize: CGSize {
        super.intrinsicContentSize.addingPadding(width: 60, height: 20)
    }
}
```

## Highlighting parts of a String

Nó phổ biến để thực hiện một số loại tô sáng chuỗi một phần khi thêm tự động hoàn thành vào một ứng dụng. Để tiết kiệm thời gian cho bản thân, tôi sử dụng phần mở rộng sau. Ví dụ minh họa việc sử dụng với một UILabel.

```
extension NSAttributedString {
    func highlighting(_ substring: String, using color: UIColor) -> NSAttributedString {
        let attributedString = NSMutableAttributedString(attributedString: self)
        attributedString.addAttribute(.foregroundColor, value: color, range: (self.string as NSString).range(of: substring))
        return attributedString
    }
}

// Usage:
label.attributedText = NSAttributedString(string: "Budapest")
label.attributedText = label.attributedText?.highlighting("Bud", using: .blue)
```

## Subscripting Array using an IndexPath

Bạn đã bao giờ viết một cái gì đó như thế này trong  tableView(_: cellForRowAt :) chưa?
```
cell.item = items[indexPath.row]
```

Binding data với các cell của bạn bằng cách sử dụng indexPath như là chỉ mục mảng là thông lệ. Tôi gần như viết dòng mã này (hoặc một cái gì đó rất giống nhau) hàng ngày và đôi khi tôi vẫn quên nối thêm .row vào đường dẫn chỉ mục. Để tiết kiệm cho mình 0,15 giây mỗi lần, tôi đã mở rộng Swift Array mặc định bằng chức năng đơn giản này:

```
extension Array {
    subscript(indexPath: IndexPath) -> Element {
        self[indexPath.row]
    }
}
```

## Finding superviews with a given type
Bạn đã bao giờ muốn truy cập vào tableViewCell của mình từ một textField được nhúng trong cell đó chưa? Có thể truy cập vào collection view từ 1 collection view cell?

```
extension UIView {
    func superview<T>(of type: T.Type) -> T? {
        return superview as? T ?? superview.flatMap { $0.superview(of: type) }
    }
}

// Example usage:
func textFieldDidBeginEditing(_ textField: UITextField) {
    // Get the cell containing the textfield.
    if let cell = textField.superview(of: TextFieldTableViewCell.self) {
        cell.toggle(isHighlighted: true)
    }
}
```

## Managing colors in your app

Với việc phát hành iOS 11, Apple đã giới thiệu các màu được đặt tên. Điều này cho phép bạn sắp xếp màu sắc của mình trong danh mục Asset, giống như bạn làm với hình ảnh của mình, siêu gọn gàng. Một vấn đề với điều này là phải tham chiếu các UIColors như thế này trong mã của bạn:

```
UIColor(named: "Primary")

extension UIColor {
    static var accent: UIColor {
        UIColor(named: "Accent")!
    }
    
    static var primary: UIColor {
        UIColor(named: "Primary")!
    }
    
    static var primaryText: UIColor {
        UIColor(named: "PrimaryText")!
    }
}
```

## Add gradient to the view

Tạo 1 CAGradientLayer
```
var gradientLayer: CAGradientLayer = {
    let gradientLayer = CAGradientLayer()
    gradientLayer.colors = [#Color1, #Color2]//Colors you want to add
    gradientLayer.startPoint = CGPoint(x: 0, y: 0)
    gradientLayer.endPoint = CGPoint(x: 1, y: 1)
    gradientLayer.frame = CGRect.zero
   return gradientLayer
}()
```

Thêm gradientLayer vào layer của View

```
yourView.layer.addSublayer(gradientLayer)
```

Đặt frame của gradientLayer
```
gradientLayer.frame = yourView.bounds
```