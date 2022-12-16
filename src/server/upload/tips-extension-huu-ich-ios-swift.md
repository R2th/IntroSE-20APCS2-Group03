# Khái niệm
## Extension
Extension nói nôm na là giúp bạn mở rộng một class có sẵn nào đó. Tức là bạn có thêm các phương thức mới vào class mà không làm thay đổi mã nguồn của 1 thư viện hay chính class của bạn chẳng hạn.
## Khi nào dùng Extension
1. Cơ bản và thông dụng nhất là bạn muốn thêm 1 phương thức mới vào 1 class có sẵn.
2. Cung cấp thêm 1 số cách để khởi tạo đối tượng
3. Đáp ứng thêm 1 hoặc nhiều giao thức
4. Thêm các thuộc tính tính toán
5. Mở rộng giao thức (Protocol)

## Cú pháp.
> Để sử dụng extension trong swift bạn sử dụng từ khóa
```
extension <Tên class muốn extension>
```

Ví dụ bạn muốn thêm method vào NSDate chẳng hạn
```
extension NSDate {
    func toString(withFormat: String) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = withFormat
        return dateFormatter.string(from: self)
    }
}
```

Thử sử dụng
```
let now = Date() // 2018-09-06 13:00:12 Đây là dạng Date
print(now.toString("yyyy-MM-dd HH:mm:ss")) //  2018-09-06 13:00:12 Sau format sẽ ra string.
```

## Các tips extension hi vọng sẽ giúp ích cho bạn trong các dự án cụ thể
### Extension Date
> Các extension này có thể vẫn chưa tối ưu. Bạn có thể tự viết theo cách của mình để tiện lợi và hiệu năng nhất có thể 

> Format Date sang string như ở trên bạn xem
> Hay 1 format time mình đã viết để format Date về dạng cách thời điểm hiện tại bao lâu

```
import Foundation
extension Date {
    func timeAgoFromNow() -> String {
        let yearComponents = Calendar.current.dateComponents([.year], from: self, to: Date())

        if let year = yearComponents.year, year > 0 {
            return "\(year) year ago"
        }
        let monthsComponents = Calendar.current.dateComponents([.month], from: self, to: Date())
        if let months = monthsComponents.month, months > 0 {
            return "\(months) month ago"
        }
        let weekComponents = Calendar.current.dateComponents([.weekOfYear], from: self, to: Date())
        if let weeks = weekComponents.weekOfYear, weeks > 0 {
            return "\(weeks) week ago"
        }
        let dayComponents = Calendar.current.dateComponents([.day], from: self, to: Date())
        if let days = dayComponents.day, days > 0 {
            return "\(days) day ago"
        } 
        let hoursComponents = Calendar.current.dateComponents([.hour], from: self, to: Date())
        if let hours = hoursComponents.hour, hours > 0 {
            return "\(hours) hours ago"
        }
        let minutesComponents = Calendar.current.dateComponents([.minute], from: self, to: Date())
        if let minutes = minutesComponents.minute, minutes > 0 {
            return "\(minutes) minutes ago"
        }
        return "just now ago"
    }
}
```
 
### Extension Fonts
> Các develop thường thích setFont custom hay setFont bên trong code. Vậy để định nghĩa 1 font thì mình thường sử dụng extension sau:
```
import UIKit

extension UIFont {
    static func quickSandRegular(size: CGFloat) -> UIFont {
        return setFont(name: "Quicksand-Regular", size: size)
    }

    static func quickSandLight(size: CGFloat) -> UIFont {
        return setFont(name: "Quicksand-Light", size: size)
    }
}
```

> Khi dùng bạn chỉ việc gọi
```
testLable.font = UIFont.quickSandRegular(size: 16)
```
### Extension UILabel
> Để có thể setup 1 label thì bạn cần set rất nhiều thuộc tính như: text, color text, font, alignment thì mình thường định nghĩa 1 extension như sau. Bạn cũng có thể định nghĩa tương tự cho button hay cái gì bạn thích
```
extension UILabel {
    func setup(text: String = "N/A", font: UIFont?, textColor: UIColor = .white, alignment: NSTextAlignment = .center) {
        self.text = text
        self.font = font
        self.textColor = textColor
        self.textAlignment = alignment
    }
}
```

> Hay với nhưng label với text đặc biệt 1 tý ví dụ như tiếng Nhật mà bạn muốn đẩy dãn cách giữa các kí tự với nhau hay dãn cách giữa các hàng với nhau thì sao. Thì Attributext sẽ phát huy tác dụng ngay bây giờ

```
extension UILabel {
 func setup(textAttribute: String = "", font: UIFont? = nil, textColor: UIColor = .white, spaceLine: CGFloat = 0.0, spaceCharacter: CGFloat = 0.0, range: NSRange? = nil, alignment: NSTextAlignment = .center) {
        self.attributedText = textAttribute.toAttributeString(font: font, colorText: textColor, spaceLine: spaceLine, spaceCharacter: spaceCharacter, range: range, alignment: alignment)
    }

    func indexOfAttributedTextCharacterAtPoint(point: CGPoint) -> Int {
        assert(self.attributedText != nil, "This method is developed for attributed string")
        let textStorage = NSTextStorage(attributedString: self.attributedText!)
        let layoutManager = NSLayoutManager()
        textStorage.addLayoutManager(layoutManager)
        let textContainer = NSTextContainer(size: self.frame.size)
        textContainer.lineFragmentPadding = 0
        textContainer.maximumNumberOfLines = self.numberOfLines
        textContainer.lineBreakMode = self.lineBreakMode
        layoutManager.addTextContainer(textContainer)

        let index = layoutManager.characterIndex(for: point, in: textContainer, fractionOfDistanceBetweenInsertionPoints: nil)
        return index
    }
}
```

### Extension NSObject
> Thông thường bạn đọc file từ file nib chẳng hạn hay đơn giản bạn muốn lấy string của class thì extension sau sẽ giúp ích cho bạn
```
extension NSObject {
    class var className: String {
        return String(describing: self).components(separatedBy: ".").last!
    }

    var className: String {
        return String(describing: type(of: self)).components(separatedBy: ".").last!
    }
}
```

> Đơn giản khi sử dụng khi bạn gọi tên 1 class thì sẽ có method className sẽ trả về cho bạn string của class đó. 
### Extension String
> Hay đơn giản khi bạn sử dụng localized - Đa ngôn ngữ trong swift thì hàm sau sẽ hữu dụng cho bạn
```
extension String {
    func localized(bundle: Bundle = .main, tableName: String = "Localizable") -> String {
        return NSLocalizedString(self, tableName: tableName, value: "**\(self)**", comment: "")
    }
    
    Hoặc
    
    var localized: String {
        return NSLocalizedString(self, tableName: nil, bundle: Bundle.main, value: "", comment: "")
    }
}
```

> Khi sử dụng chỉ cần thì method sẽ tự map với key trong localized file để trả về text cho bạn r.
```
"Test localized".localized() 
```


> Ô thế nếu bạn muốn format string thành date thì sao: Funtion sau xem có giúp ích đc k nhé,

```
extension String {
    func toDate(withFormat: String = "yyyy-MM-dd'T'HH:mm:ss.SSSZ") -> Date? {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = withFormat
        return dateFormatter.date(from: self)
    }
}
```
> Cái đống **yyyy-MM-dd'T'HH:mm:ss.SSSZ** này thì là dạng format time của bạn. 

Để tìm hiểu thêm bạn có thể xem nó là gì nhé.
> Sau đây là 1 số format thường sử dụng mình thường xem ở [FORMAT DATE STRING](http://nsdateformatter.com/)

| Ví dụ | Format |
| -------- | -------- |
| Saturday, Jun 9, 2018 | EEEE, MMM d, yyyy |
| 06/09/2018 | MM/dd/yyyy |
| 06-09-2018 06:29 | MM-dd-yyyy HH:mm |
| Jun 9, 6:29 AM | MMM d, h:mm a |
| June 2018 | MMMM yyyy |
| Jun 9, 2018 | MMM d, yyyy |
| Sat, 9 Jun 2018 06:29:50 +0000 | E, d MMM yyyy HH:mm:ss Z|
| 2018-06-09T06:29:50+0000 | yyyy-MM-dd'T'HH:mm:ssZ|
| 2018-06-09T06:29:50.0000 | yyyy-MM-dd'T'HH:mm:ss.SSSZ|
| 09.06.18 | dd.MM.yy |

### Continute
Trên đây mình đã liệt kê một số function hay sử dụng trong dự án của mình. Nếu bạn thấy hữu ích và muốn thêm nhiều extension khác thì có thể comment bên dưới nhé.