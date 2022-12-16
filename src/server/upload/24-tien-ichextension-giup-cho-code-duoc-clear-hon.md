Theo tôi, một trong những tính năng tốt nhất của cả Swift và Objective-C là phần mở rộng(extensions). Chúng cho phép bạn thêm các phương thức mới vào bất kỳ lớp nào và toàn bộ dự án sẽ có thể gọi chúng mà không cần kế thừa và nạp chồng thêm .

Là một nhà phát triển thiết bị di động, tôi làm việc với cả iOS và Android, và tôi thường thấy các hàm và phương pháp của Android ngắn hơn, gọn gàng hơn và dễ hiểu hơn trong Swift. Cùng với một số phương thức mới (phần mở rộng), chúng ta sẽ có được một đoạn mã ngắn gọn, sạch sẽ và dễ bảo trì trong Swift.

Tôi sẽ sử dụng Swift, nhưng tất cả các phần mở rộng này có thể được chuyển sang Objective-C hoặc sử dụng với Objective-C trực tiếp mà không cần chuyển đổi.

## String.trim() và Swift.trimmed

Trong 99% trường hợp khi tôi cắt Chuỗi trong Swift, tôi muốn xóa khoảng trắng và các ký hiệu tương tự khác (ví dụ: các dòng và tab mới).

Tiện ích mở rộng đơn giản này thực hiện thủ thuật:
```swift
import Foundation

extension String {
    var trimmed: String {
        self.trimmingCharacters(in: .whitespacesAndNewlines)
    }
    
    mutating func trim() {
        self = self.trimmed
    }
}
```

Sử dụng:
```
var str1 = "  a b c d e   \n"
var str2 = str1.trimmed
str1.trim()
```

## Int.toDouble() và Double.toInt()

Các phương pháp này có thể hữu ích nếu bạn làm việc với các tùy chọn. Nếu bạn có không tùy chọn Int, bạn có thể chuyển đổi nó với Double(a), trong đó "a"  là một biến số nguyên. Nhưng nếu "a" là tùy chọn, bạn không thể làm điều đó.

Hãy thêm tiện ích mở rộng vào Int và Double:

```
import Foundation

extension Int {
    func toDouble() -> Double {
        Double(self)
    }
}

extension Double {
    func toInt() -> Int {
        Int(self)
    }
}
```

Sử dụng:
```
let a = 15.78
let b = a.toInt()
```

## String.toDate(…) và Date.toString(…)

Lấy Datetừ String và định dạng Date để hiển thị hoặc gửi tới API là những công việc phổ biến. Cách chuyển đổi tiêu chuẩn cần ba dòng mã. Hãy xem cách làm cho nó ngắn hơn:
```
import Foundation

extension String {
    func toDate(format: String) -> Date? {
        let df = DateFormatter()
        df.dateFormat = format
        return df.date(from: self)
    }
}

extension Date {
    func toString(format: String) -> String {
        let df = DateFormatter()
        df.dateFormat = format
        return df.string(from: self)
    }
}
```

Sử dụng:
```
let strDate = "2020-08-10 15:00:00"
let date = strDate.toDate(format: "yyyy-MM-dd HH:mm:ss")
let strDate2 = date?.toString(format: "yyyy-MM-dd HH:mm:ss")
```

## Int.centsToDollars ()

Một số API thanh toán (ví dụ: Stripe ) thích sử dụng đơn vị tiền tệ (xu) để xử lý thanh toán. Nó cho phép tránh sự không chính xác của Floatvà Double. Đồng thời, sẽ thoải mái hơn khi sử dụng các loại này để hiển thị giá trị.

Tiện ích mở rộng này thực hiện chuyển đổi này:
```
import Foundation

extension Int {
    func centsToDollars() -> Double {
        Double(self) / 100
    }
}
```

Sử dụng:
```
let cents = 12350
let dollars = cents.centsToDollars()
```

## String.asCoferences()

Tọa độ của một địa điểm trên Trái đất có ít nhất hai số - vĩ độ và kinh độ. Một cái khác là độ cao, nhưng điều đó chỉ có ý nghĩa trong không gian 3D, điều này không phổ biến lắm trong phát triển phần mềm.

Từ API, chúng tôi nhận được hai trường riêng biệt hoặc một trường có các giá trị được phân tách bằng dấu phẩy. Phần mở rộng này cho phép thực hiện chuyển đổi các chuỗi như vậy thành CLLocationCoordinate2D.
```
import Foundation
import CoreLocation

extension String {
    var asCoordinates: CLLocationCoordinate2D? {
        let components = self.components(separatedBy: ",")
        if components.count != 2 { return nil }
        let strLat = components[0].trimmed
        let strLng = components[1].trimmed
        if let dLat = Double(strLat),
            let dLng = Double(strLng) {
            return CLLocationCoordinate2D(latitude: dLat, longitude: dLng)
        }
        return nil
    }
}
```

Sử dụng:
```
let strCoordinates = "41.6168, 41.6367"
let coordinates = strCoordinates.asCoordinates
```

## String.asURL()

iOS và macOS sử dụng URL loại để xử lý các liên kết. Nó linh hoạt hơn, cho phép lấy các thành phần và xử lý các loại URL khác nhau. Đồng thời, chúng tôi thường nhập nó hoặc lấy nó từ API String.
Khá dễ dàng để chuyển đổi một thành một khác, nhưng tiện ích mở rộng này cho phép chúng tôi xử lý các tùy chọn hoặc chuỗi chuyển đổi này:

```
import Foundation

extension String {
    var asURL: URL? {
        URL(string: self)
    }
}
```

Sử dụng:
```
let strUrl = "https://medium.com"
let url = strUrl.asURL
```

## UIDevice.vibrate()

Rung của iPhone có thể là một hiệu ứng tuyệt vời cho các lần nhấn nút và các phản hồi khác từ thiết bị. Đối với rung iPhone, có một loại âm thanh đặc biệt, được xử lý bởi AudioToolboxkhuôn khổ.

Đối AudioToolboxvới tất cả các UIViewControllers có rung là điều khó chịu và về mặt logic, rung là một chức năng của thiết bị (nó không đến từ loa mà từ chính thiết bị) hơn là phát âm thanh. 

Phần mở rộng này cho phép đơn giản hóa nó thành một dòng:
```
import UIKit
import AudioToolbox

extension UIDevice {
    static func vibrate() {
        AudioServicesPlaySystemSound(1519)
    }
}
```

Sử dụng:
```
UIDevice.vibrate()
```

## String.width(…) và String.height(…)

iOS có thể UILabeltự động tính toán kích thước bằng cách sử dụng các ràng buộc được cung cấp, nhưng đôi khi điều quan trọng là bạn phải tự đặt kích thước.

Phần mở rộng này cho phép chúng tôi tính toán Stringchiều rộng và chiều cao bằng cách sử dụng UIFont:
```
import UIKit

extension String {
    func height(withConstrainedWidth width: CGFloat, font: UIFont) -> CGFloat {
        let constraintRect = CGSize(width: width, height: .greatestFiniteMagnitude)
        let boundingBox = self.boundingRect(with: constraintRect, options: .usesLineFragmentOrigin, attributes: [.font: font], context: nil)

        return ceil(boundingBox.height)
    }

    func width(withConstrainedHeight height: CGFloat, font: UIFont) -> CGFloat {
        let constraintRect = CGSize(width: .greatestFiniteMagnitude, height: height)
        let boundingBox = self.boundingRect(with: constraintRect, options: .usesLineFragmentOrigin, attributes: [.font: font], context: nil)

        return ceil(boundingBox.width)
    }
}

extension NSAttributedString {
    func height(withConstrainedWidth width: CGFloat) -> CGFloat {
        let constraintRect = CGSize(width: width, height: .greatestFiniteMagnitude)
        let boundingBox = boundingRect(with: constraintRect, options: .usesLineFragmentOrigin, context: nil)

        return ceil(boundingBox.height)
    }

    func width(withConstrainedHeight height: CGFloat) -> CGFloat {
        let constraintRect = CGSize(width: .greatestFiniteMagnitude, height: height)
        let boundingBox = boundingRect(with: constraintRect, options: .usesLineFragmentOrigin, context: nil)

        return ceil(boundingBox.width)
    }
}
```

Sử dụng:
```
let text = "Hello, world!"
let textHeight = text.height(withConstrainedWidth: 100, font: UIFont.systemFont(ofSize: 16))
```

## String.containsOnlyDigits

Phần mở rộng bên dưới hữu ích khi bạn cần giới hạn đầu vào của người dùng hoặc xác thực dữ liệu từ API. Nó kiểm tra nếu Stringchỉ có các chữ số:
```
import Foundation

extension String {
    var containsOnlyDigits: Bool {
        let notDigits = NSCharacterSet.decimalDigits.inverted
        return rangeOfCharacter(from: notDigits, options: String.CompareOptions.literal, range: nil) == nil
    }
}
```
Sử dụng:
```
let digitsOnlyYes = "1234567890".containsOnlyDigits
let digitsOnlyNo = "12345+789".containsOnlyDigits
```

## String.isAlphanumeric

Giống như phần mở rộng trước đó, phần mở rộng này kiểm tra nội dung của String. Nó trả về true nếu chuỗi không trống và chỉ chứa các ký tự chữ và số. Một phiên bản đảo ngược của tiện ích mở rộng này có thể hữu ích để xác nhận rằng mật khẩu có các ký tự không phải chữ và số.

```
import Foundation

extension String {
    var isAlphanumeric: Bool {
        !isEmpty && range(of: "[^a-zA-Z0-9]", options: .regularExpression) == nil
    }
}
```

Sử dụng:
```
let alphanumericYes = "asd3kJh43saf".isAlphanumeric
let alphanumericNo = "Kkncs+_s3mM.".isAlphanumeric
```

## Đăng ký chuỗi

Swift 5 có một cách đăng ký  String. Việc tính toán các chỉ số và hiệu số rất khó chịu nếu bạn muốn lấy các ký tự từ 5 đến 10. Phần mở rộng này cho phép sử dụng Int  đơn giản cho mục đích này:

```

import Foundation

extension String {
    subscript (i: Int) -> Character {
        return self[index(startIndex, offsetBy: i)]
    }
    
    subscript (bounds: CountableRange<Int>) -> Substring {
        let start = index(startIndex, offsetBy: bounds.lowerBound)
        let end = index(startIndex, offsetBy: bounds.upperBound)
        if end < start { return "" }
        return self[start..<end]
    }
    
    subscript (bounds: CountableClosedRange<Int>) -> Substring {
        let start = index(startIndex, offsetBy: bounds.lowerBound)
        let end = index(startIndex, offsetBy: bounds.upperBound)
        if end < start { return "" }
        return self[start...end]
    }
    
    subscript (bounds: CountablePartialRangeFrom<Int>) -> Substring {
        let start = index(startIndex, offsetBy: bounds.lowerBound)
        let end = index(endIndex, offsetBy: -1)
        if end < start { return "" }
        return self[start...end]
    }
    
    subscript (bounds: PartialRangeThrough<Int>) -> Substring {
        let end = index(startIndex, offsetBy: bounds.upperBound)
        if end < startIndex { return "" }
        return self[startIndex...end]
    }
    
    subscript (bounds: PartialRangeUpTo<Int>) -> Substring {
        let end = index(startIndex, offsetBy: bounds.upperBound)
        if end < startIndex { return "" }
        return self[startIndex..<end]
    }
}
```

Sử dụng:
```
let subscript1 = "Hello, world!"[7...]
let subscript2 = "Hello, world!"[7...11]
```

## UIImage.squared

Khi bạn yêu cầu người dùng chụp ảnh của họ hoặc chọn ảnh hiện có làm ảnh hồ sơ, họ sẽ khó cung cấp ảnh vuông. Đồng thời, hầu hết các giao diện người dùng sử dụng hình vuông hoặc hình tròn.
Phần mở rộng này cắt những thứ được cung cấp UIImage, biến nó thành một hình vuông hoàn hảo:

```
import UIKit

extension UIImage {
    var squared: UIImage? {
        let originalWidth  = size.width
        let originalHeight = size.height
        var x: CGFloat = 0.0
        var y: CGFloat = 0.0
        var edge: CGFloat = 0.0
        
        if (originalWidth > originalHeight) {
            // landscape
            edge = originalHeight
            x = (originalWidth - edge) / 2.0
            y = 0.0
            
        } else if (originalHeight > originalWidth) {
            // portrait
            edge = originalWidth
            x = 0.0
            y = (originalHeight - originalWidth) / 2.0
        } else {
            // square
            edge = originalWidth
        }
        
        let cropSquare = CGRect(x: x, y: y, width: edge, height: edge)
        guard let imageRef = cgImage?.cropping(to: cropSquare) else { return nil }
        
        return UIImage(cgImage: imageRef, scale: scale, orientation: imageOrientation)
    }
}
```

Sử dụng:
```
let img = UIImage() // Must be a real UIImage
let imgSquared = img.squared
```

## UIImage.resize(…)

Trước khi tải ảnh lên máy chủ, bạn phải đảm bảo rằng ảnh có kích thước đủ nhỏ. iPhone và iPad có máy ảnh rất tốt và ảnh từ thư viện của chúng có kích thước không giới hạn.
Để đảm bảo UIImagekích thước đó không lớn hơn một kích thước nhất định, ví dụ: 512 pixel hoặc 1024 pixel, hãy sử dụng tiện ích mở rộng này:

```
import UIKit

extension UIImage {
    func resized(maxSize: CGFloat) -> UIImage? {
        let scale: CGFloat
        if size.width > size.height {
            scale = maxSize / size.width
        }
        else {
            scale = maxSize / size.height
        }
        
        let newWidth = size.width * scale
        let newHeight = size.height * scale
        UIGraphicsBeginImageContext(CGSize(width: newWidth, height: newHeight))
        draw(in: CGRect(x: 0, y: 0, width: newWidth, height: newHeight))
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return newImage
    }
}
```

Sử dụng:
```
let img2 = UIImage() // Must be a real UIImage
let img2Thumb = img2.resized(maxSize: 512)
```
Hai phần mở rộng cuối cùng có thể được xâu chuỗi:
```
let img = UIImage() // Must be a real UIImage
let imgPrepared = img.squared?.resized(maxSize: 512)
```

## Int.toString()

Một trong những tính năng hữu ích nhất của Java là toString() phương thức. Đó là một phương thức của tất cả các lớp và kiểu. Swift cho phép làm điều gì đó tương tự như sử dụng chuỗi suy: "\(someVar)". Nhưng có một sự khác biệt - biến của bạn là tùy chọn. Swift sẽ thêm từ optionalvào đầu ra. Java sẽ chỉ gặp sự cố, nhưng Kotlin sẽ xử lý các tùy chọn một cách tốt đẹp: someVar?.toString()sẽ trả về một Chuỗi tùy chọn, là null( nil) nếu someVarlà null( nil) hoặc Stringchứa giá trị varkhác.

Thật không may, Swift không cho phép mở rộng Any, vì vậy hãy thêm toString()phương thức ít nhất vào Int:
```
import Foundation

extension Int {
    func toString() -> String {
        "\(self)"
    }
}
```
Sử dụng:
```
let i1 = 15 
let i1AsString = i1.toString()
```

## Double.toString()

Như trong ví dụ trước, chuyển đổi Double thành String có thể rất hữu ích. Nhưng trong trường hợp này, chúng tôi sẽ giới hạn đầu ra với hai chữ số phân số. Tôi không thể nói tiện ích mở rộng này sẽ hữu ích cho mọi trường hợp, nhưng đối với hầu hết các trường hợp sử dụng, nó sẽ hoạt động tốt:

```
import Foundation

extension Double {
    func toString() -> String {
        String(format: "%.02f", self)
    }
}
```
Sử dụng:
```
let d1 = 15.67
let d1AsString = d1.toString()
```

## Double.toPrice()

Tạo Strings với giá chỉ là một cách khác để định dạng Doubles. Thuật toán này không phổ biến, nó phụ thuộc vào cài đặt khu vực. Nhưng bạn có thể sử dụng nó như một ý tưởng chung và thực hiện các điều chỉnh cho ứng dụng của mình:

```
import Foundation

extension Double {
    func toPrice(currency: String) -> String {
        let nf = NumberFormatter()
        nf.decimalSeparator = ","
        nf.groupingSeparator = "."
        nf.groupingSize = 3
        nf.usesGroupingSeparator = true
        nf.minimumFractionDigits = 2
        nf.maximumFractionDigits = 2
        return (nf.string(from: NSNumber(value: self)) ?? "?") + currency
    }
}
```

Sử dụng:
```
let dPrice = 16.50
let strPrice = dPrice.toPrice(currency: "€")
```

## String.asDict

JSON là một định dạng phổ biến để trao đổi hoặc lưu trữ dữ liệu có cấu trúc. Hầu hết các API thích sử dụng JSON. JSON là một cấu trúc JavaScript. Swift có cùng kiểu dữ liệu - từ điển.

Chuyển đổi một thành một thủ thuật khá đơn giản:
```
import Foundation

extension String {
    var asDict: [String: Any]? {
        guard let data = self.data(using: .utf8) else { return nil }
        return try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String: Any]
    }
}
```

Sử dụng:
```
let json = "{\" hello \ ": \" world \ "}" 
let dictFromJson = json.asDict
```

## String.asArray

Phần mở rộng này tương tự như phần mở rộng trước đó, nhưng nó chuyển đổi mảng JSON thành một mảng Swift:
```
import Foundation

extension String {
    var asArray: [Any]? {
        guard let data = self.data(using: .utf8) else { return nil }
        return try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [Any]
    }
}
```

Sử dụng:
```
let json2 = "[1, 2, 3]" 
let arrFromJson2 = json2.asArray
```

## String.asAttributedString

Đôi khi chúng ta cần một số kiểu đơn giản độc lập với nền tảng cho văn bản. Một cách khá phổ biến là sử dụng HTML đơn giản cho mục đích này.

UILabelcó thể hiển thị văn bản với các phần in đậm ( <strong>), văn bản được gạch chân, các đoạn lớn hơn và nhỏ hơn, v.v. Bạn chỉ cần chuyển đổi HTML sang NSAttributedStringvà gán nó cho UILabel.attributedText.

Tiện ích mở rộng này sẽ giúp bạn thực hiện nhiệm vụ đầu tiên:
```
import Foundation

extension String {
    var asAttributedString: NSAttributedString? {
        guard let data = self.data(using: .utf8) else { return nil }
        return try? NSAttributedString(data: data, options: [.documentType: NSAttributedString.DocumentType.html], documentAttributes: nil)
    }
}
```
Sử dụng:
```
let htmlString = "<p>Hello, <strong>world!</string></p>"
let attrString = htmlString.asAttributedString
```
## Bundle.appVersion

Phần mở rộng cuối cùng trong tập hợp này cho phép lấy phiên bản ứng dụng từ tệp  Info.plist . Nó có thể hữu ích cho:
* Gửi phiên bản ứng dụng tới API.
* Kiểm tra các bản cập nhật có sẵn.
* Hiển thị phiên bản ứng dụng trên màn hình thiết bị.
* Đưa phiên bản ứng dụng vào email hỗ trợ.
Tiện ích mở rộng bên dưới cho phép bạn tải phiên bản ứng dụng (hoặc nil nếu nó không có sẵn) trong một dòng mã:
```
import Foundation

extension Bundle {
    var appVersion: String? {
        self.infoDictionary?["CFBundleShortVersionString"] as? String
    }
    
    static var mainAppVersion: String? {
        Bundle.main.appVersion
    }
}
```

Sử dụng:
```
let appVersion = Bundle.mainAppVersion
```
## Phần kết luận

Tôi hy vọng những tiện ích mở rộng này đã giúp bạn làm cho mã của mình ngắn hơn và rõ ràng hơn. Vui lòng sửa đổi chúng để đáp ứng yêu cầu của bạn và đưa chúng vào các dự án của bạn.

 Link bài viết tham khảo:  https://medium.com/better-programming/24-swift-extensions-for-cleaner-code-41e250c9c4c3?fbclid=IwAR1KzYlRt0MzLbF-QlFQGyy-Fsiga1DCnKsMQuGoCvf2gnaS530nMA1Y7eM

Chúc bạn vui vẻ và hẹn gặp lại bạn lần sau!