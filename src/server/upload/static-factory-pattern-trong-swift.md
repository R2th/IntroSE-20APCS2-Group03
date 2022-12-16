Đây là bài dịch từ trang [medium.com](https://medium.com). Mời các bạn xem bài gốc tại đây: https://medium.com/swlh/static-factory-pattern-f1d4897ebc3d

Đưa mã của bạn lên một cấp độ mới với một thủ thuật đơn giản.

![](https://images.viblo.asia/664b897c-dded-4c4b-a032-2fe7e4ce8c25.jpeg)

Nếu bạn là lập trình viên iOS không thích sử dụng `storyboards` và thích viết mã (như tôi =)), thì có lẽ bạn đã từng có mã như thế này:
```
lazy var titleLabel: UILabel = {
   let button = UILabel()
   // Initialization code
   // ...
   return button
}()

lazy var subtitleLabel: UILabel = {
   let label = UILabel()
   // Initialization code
   // ...
   return label
}()

// ....
```

Vấn đề của cách tiếp cận này là làm mã của chúng ta bắt đầu phình to lên với một loạt mã khởi tạo khiến khả năng đọc của chúng ta trở nên khó khăn hơn rất nhiều.
Và, thêm một vấn đề nữa là chúng ta bắt đầu lặp lại cùng một logic khởi tạo thay vì tái sử dụng được nó.

Trong bài viết này, tôi muốn chỉ cho bạn một số cách đơn giản, gọn nhẹ để xử lý việc khởi tạo này bằng cách sử dụng những ưu điểm mà *Factory Pattern* mang lại cho chúng ta.

Toàn bộ ý tưởng đằng sau *pattern* này là đóng gói logic khởi tạo thành các *extension* có thể tùy biến để mã khởi tạo sạch hơn.

Hãy bắt đầu bằng cách tạo một hàm tĩnh trong *extension* của `UILabel`
```
extension UILabel {
   static func newLabel() -> UILabel() {
      let label = UILabel()
      return label
   }
}
```
Với cách làm này, chúng ta đã có thể đạt được một số tiến bộ so với mã ở trên:
```
lazy var title = UILabel.newLabel()
lazy var subtitle = UILabel.newLabel()
```
Chúng ta vẫn cần thêm một số khởi tạo cho các nhãn này, chẳng hạn như thiết lập văn bản và màu sắc. Điều này có thể được thực hiện trong phương thức `viewDidLoad` của `ViewController`. Tuy nhiên, chúng ta có thể đi trước một bước và làm điều đó trong hàm tĩnh mà chúng ta vừa tạo.
```

extension UILabel {
   static func newLabel(withMessage text: String, textColor: UIColor) -> UILabel {
      let label = UILabel()
      label.text = text
      label.textColor = textColor
      return label
   }
}

// .....
lazy var title = UILabel.newLabel(withMessage: "Welcome", textColor: .black)
lazy var subtitle = UILabel.newLabel(withMessage: "Create an account to start", textColor: .gray)
```
Tốt hơn nhiều rồi, phải không?

Chúng ta vẫn có thể tiếp tục và tiếp tục tùy biến chức năng khởi tạo của mình. Ví dụ: chúng ta có thể thêm phông chữ mà chúng ta muốn.
```
extension UILabel {
   static func newLabel(withMessage text: String, textColor: UIColor, font: UIFont) -> UILabel {
      let label = UILabel()
      label.text = text
      label.textColor = textColor
      label.font = font
      return label
   }
}

// .....
lazy var title = UILabel.newLabel(withMessage: "Welcome", textColor: .black, font: UIFont(name: "OpenSans-Regular", size: 24) ?? .systemFont(ofSize: 24))
lazy var subtitle = UILabel.newLabel(withMessage: "Create an account to start", textColor: .gray, font: UIFont(name: "OpenSans-Regular", size: 18) ?? .systemFont(ofSize: 24))
```
Như bạn có thể thấy, khi chúng ta thêm các tham số vào hàm khởi tạo, mã của chúng ta bắt đầu mất tính dễ đọc. Tuy nhiên, đừng lo lắng, chúng ta có thể cải thiện việc triển khai hiện tại của mình.

Đầu tiên, hãy suy nghĩ về phông chữ của nhãn. Trong hầu hết mọi ứng dụng mà chúng ta phát triển, chúng ta thường phải tuân theo một số tiêu chuẩn thiết kế nhất định. Rất có thể các nhãn tiêu đề của chúng ta phải có cùng kích thước, loại phông và màu sắc. Tương tự với phụ đề và nhãn nội dung của chúng ta. Nếu bạn nghĩ về nó, mọi thành phần giao diện người dùng đều tuân theo mô hình tương tự như vậy.

Chúng ta có thể áp dụng ý tưởng tương tự cho các phông chữ tùy chỉnh của mình như sau:
```
extension UIFont {
   enum CustomFontType: String {
      case regular = "OpenSans-Regular"
      case semiBold = "OpenSans-SemiBold"
      case bold = "OpenSans-Bold"
      case light = "OpenSans-Light"
   }

   static func customFont(type: CustomFontType, size: CGFloat) -> UIFont {
      return UIFont(name: type.rawValue, size: size) ?? UIFont.systemFont(ofSize: size)
   }

   static var titleFont: UIFont {
      return .customFont(type: .bold, size: 24)
   }

   static var subtitleFont: UIFont {
      return .customFont(type: .semiBold, size: 18)
   }

   static var regularFont: UIFont {
      return .customFont(type: .regular, size: 16)
   }
}

// ....
lazy var title = UILabel.newLabel(withMessage: "Welcome", textColor: .black, font: .titleFont)
lazy var subtitle = UILabel.newLabel(withMessage: "Create an account to start", textColor: .gray, font: .subtitleFont)
```

Và cũng có thể màu sắc sẽ phụ thuộc vào loại nhãn cũng như phông chữ. Vì vậy, chúng ta có thể đóng gói nó trong một `enum LabelType` để quản lý các loại nhãn.
```
enum LabelType {
   typealias LabelInformation = (font: UIFont, color: UIColor)

   case custom(information: LabelInformation)
   case regular
}

extension LabelType {
   static var title: Self {
      .custom(information: LabelInformation(font: .titleFont, color: .black))
   }

   static var subtitle: Self {
      .custom(information: LabelInformation(font: .subtitleFont, color: .gray))
   }

   static var body: Self {
      .custom(information: LabelInformation(font: .regularFont, color: .black))
   }
}

extension LabelType {
   var information: LabelInformation {
      switch self {
         case .custom(let labelInformation):
            return labelInformation
         default:
            return LabelInformation(font: .systemFont(ofSize: 16), color: .black)
      }
   }
}
```
Bây giờ, chúng ta có thể đặt tất cả các phần lại với nhau và cấu trúc lại chức năng khởi tạo như sau:
```
extension String {
   static var empty: String {
      return ""
   }
}

extension UILabel {
   static func newLabel(withMessage text: String = .empty, type: LabelType) -> UILabel {
      let label = UILabel()
      label.text = text
      label.font = type.information.font
      label.textColor = type.information.color
      return label
   }
}

// ....
let titleLabel = UILabel.newLabel(withMessage: "Welcome", type: .title)
let subtitleLabel = UILabel.newLabel(withMessage: "Create an account to start", type: .subtitle)
let customSizeLabel = UILabel.newLabel(withMessage: "Custom size label", type: .custom(information: LabelType.LabelInformation(font: .customFont(type: .bold, size: 32), color: .black)))
let labelWithoutText = UILabel.newLabel(type: .regular)
```

Với cách triển khai này, chúng ta có thể thiết lập một nhãn bằng cách sử dụng một trong ba cách sau:
* Với loại nhãn được xác định trước (như tiêu đề, phụ đề, v.v.) và text cho nhãn đó
* Không cần xác định trước text cho nhãn (đôi khi chúng ta chỉ cần thiết lập text sau)
* Không có loại nhãn xác định trước và một số phông chữ tùy chỉnh.

Mức độ chi tiết của tùy chỉnh sẽ phụ thuộc vào nhu cầu ứng dụng của bạn, nó có thể lớn hơn hoặc có thể nhỏ hơn. Một điều bạn cần ghi nhớ là sử dụng mẫu này sẽ cải thiện ngữ nghĩa, khả năng đọc và tính linh hoạt của mã của bạn.

Hy vọng bạn thấy điều này hữu ích. Bạn có thể xem mã đầy đủ tại [đây](https://github.com/blorenzo10/swift-utilities/blob/master/Common%20/FactoryPattern.swift)