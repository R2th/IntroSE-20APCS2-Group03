Đây là bài dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại đây: https://medium.com/flawless-app-stories/5-swift-extensions-to-make-your-life-easier-1accb384cbac

Cảm ơn bạn đã ghé qua. Hôm nay, tôi sẽ giới thiệu đến các bạn năm Swift extensions mà tôi dùng trong hầu hết các dự án iOS của mình.
### 1. Thêm padding cho `UIButton`
Tôi thường thấy mình phải thêm một số phần đệm vào `UIButton`. Thay vì phải dùng một số mẹo thay đổi `titleEdgesInsets` và `contentEdgeInsets`, tôi đã tạo ra một mở rộng đơn giản cho `CGSize`, sau đó sử dụng nó trong các lớp con của `UIButton`:
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
### 2. Làm nổi bật các phần của `String`
Thông thường, bạn muốn làm nổi bật một phần của `String` một cách tiện lợi và nhanh chóng trong một ứng dụng. Để tiết kiệm thời gian cho bản thân, tôi dùng tới tới mở rộng này. Dưới đây là ví dụ minh họa dùng cho `UILabel`
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
### 3. Subscripting `Array` với `IndexPath`
Bạn đã từng viết thứ gì tương tự như lệnh này trong khi thực hiện hàm `tableView(:cellForRowAt:)` chưa?
```
cell.item = items[indexPath.row]
```
Việc liên kết dữ liệu với các `cell` bằng cách sử dụng giá trị `row` của `indexPath` là khá thường xuyên. Tôi hầu như viết dòng mã này hàng ngày, và đôi khi tôi quên mất không thêm `.row`đằng sau `indexPath`. Để tiết kiệm 0.15 giây cho mỗi lần, tôi đã sử dụng một mở rộng của `Array` với một phương thức đơn giản như sau:
```
extension Array {
    subscript(indexPath: IndexPath) -> Element {
        self[indexPath.row]
    }
}
```
### 4. Tìm kiếm `superviews`của một kiểu cho sẵn
Có khi nào bạn muốn truy cập vào một `tableViewCell`từ một `textField` nằm trong cell đó chưa? 
Và đây là cách của tôi:
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
### 5. Nhúng một `ViewController` vào trong một  `ViewController` khác
Vấn đề chính với cách tiếp cận theo mô hình **Apple’s MVC** nằm trong chính cái tên của nó. Nó sinh ra các `ViewController`rất lớn. Chọn một kiến trúc thực sự là một chủ đề được tranh luận rất nhiều giữa các nhà phát triển iOS.
Theo tôi, vẫn hoàn toàn ổn khi gắn bó với mô hình **MVC**, khi bạn tuân thủ đúng [nguyên tắc đơn nhiệm (single responsibility principle)](https://codeburst.io/understanding-solid-principles-single-responsibility-b7c7ec0bf80) và dùng các container view trong ViewController của bạn. Điều này đảm bảo rằng ViewController chỉ có một công việc và giữ cho việc thực hiện của bạn đơn giản hơn. Một lợi ích nữa là việc tái sử dụng ViewController sẽ dễ dàng hơn, còn các giao diện phức tạp sẽ trở nên dễ quản lý hơn, vì chúng được xây dựng lên từ các thành phần giao diện nhỏ gọn mà tất cả đều tự có thể quản lý trạng thái của riêng mình.
Và đây là mở rộng tôi dùng để nhúng các ViewController:
```
extension UIViewController {
    func embed(_ vc: UIViewController, in _containerView: UIView? = nil) {
        let containerView: UIView = _containerView ?? view // Use the whole view if no container view is provided.
        containerView.addSubview(vc.view)
        NSLayoutConstraint.activate([
            vc.view.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 0),
            vc.view.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: 0),
            vc.view.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 0),
            vc.view.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: 0)
        ])
        vc.view.translatesAutoresizingMaskIntoConstraints = false
        addChild(vc)
        vc.didMove(toParent: self)
    }
}
```
### 5+1 Quản lý `Color` trong ứng dụng của bạn  
Trong bản phát hành **iOS 11**, Apple đã giới thiệu một kĩ thuật tên là **named colors**. Kĩ thuật này giúp chúng ta có thể quản lý màu sắc trong **Asset catalogs**, giống như cách chúng ta quản lý các ảnh, rất gọn gàng. Nhưng có một vấn đề với điều này là phải tham chiếu `UIColors` như thế này trong mã của bạn:
```
UIColor(named: "Primary")
```
Điều này sẽ khá dễ bị lỗi (hãy tưởng tượng phải dùng màu này ở 10 vị trí khác nhau trong ứng dụng của bạn). Và sẽ tốt hơn nếu tận dụng lợi thế của Swift (cũng như cung cấp cho chúng ta một phương thức tự động hoàn thành).
Chúng ta có thể dễ dàng có được điều này bằng cách mở rộng `UIColor` với các thuộc tính được tính cho các màu được đặt tên của chúng ta như sau:
```
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
Chú ý: không nên đặt tên cho màu sắc của bạn là “Blue”,“LightGray”, hay gì đó tương tự. Thay vào đó, hay đặt tên theo luật như trên tôi đã sử dụng: “Accent“, “ Primary”, “SecondaryText”. Điều này sẽ tránh nhầm lẫn khi cố gắng đặt tên các màu sắc. Ngoài ra, sẽ rất dễ dàng để thay đổi lược đồ màu của ứng dụng, nếu bạn cần.


-----
🎉Cảm ơn đã đọc!
Tôi hy vọng bạn tìm thấy một cái gì đó hữu ích cho các dự án của riêng bạn.

Và bạn cũng là một nhà phát triển lười biếng thông minh chứ.🙌🙌🙌