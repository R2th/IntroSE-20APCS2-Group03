![](https://images.viblo.asia/cc7c9f0e-c3b5-4da9-ae74-8d0faf607bcd.jpeg)

Sau một thời gian ngắn tự học swift (mình mới level intern thôi nghe), cũng giống như trong kotlin của android thì mình vẫn thấy phần extensions code là phần giúp code sạch sẽ và tái sử dụng code ngon nhất. Nó cũng là 1 phần không thể thiếu trong một base code dự án nữa. Nó có thể được gọi ở bất kỳ đâu - nơi nào mà chả cần kế thừa hay override vờ riết gì. Chỉ gọi ra là dùng. Khỏe thật :D

Nhưng so với swift thì ext (mình xin phép viết tắt extensions nhé) kotlin có phần viết dễ dàng hơn gọn hơn và dễ hiểu hơn nữa đấy chứ, chẳng qua do thằng kotlin update liên tục thì đường nào chả ngon. Quay lại swift, hôm nay mình sẽ note ra một số ext thường hay sử dụng trong dự án để mọi người tham khảo.

## String.trim() and Swift.trimmed
Dùng khi các bạn muốn loại bỏ khoảng cách (space) hoặc một số ký tự nào đó trong chuỗi chẳng hạn

```
extension String {
    var trimmed: String {
        self.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}
```
=>
```
var str = "  a b c d e   \n"
str.trimmed // a b c d
```

## Int.doDouble() and Double.toInt()
Thằng này hữu ích khi bạn làm việc với optional. Dùng để convert int to double hoặc ngược lại

```
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

=>
```
let a = 1.13
let b = a.toInt()
or
let a = 15
let b = a.toDouble()
```

## String.toDate(…) and Date.toString(…)
Dùng để convert string sang date hoặc ngược lại. 

```
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
=>
```
let strDate = "2020-08-20 19:00:00"
let date = strDate.toDate(format: "yyyy-MM-dd HH:mm:ss")
let strDate2 = date?.toString(format: "yyyy-MM-dd HH:mm:ss")
```

## String.asCoordinates()
Convert từ string sang tọa độ

```
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
=>
```
let strCoordinates = "17.2345, 19.2345"
let coordinates = strCoordinates.asCoordinates
```

## String.asURL()
Convert từ string sang định dạng URL

```
extension String {
    var asURL: URL? {
        URL(string: self)
    }
}
```
=>
```
let strUrl = "https://viblo.asia/"
let url = strUrl.asURL
```

## UIDevice.vibrate()
Set rung device

```
import AudioToolbox

extension UIDevice {
    static func vibrate() {
        AudioServicesPlaySystemSound(1519)
    }
}
```
=>
```
UIDevice.vibrate()
```

## String.width(…) and String.height(…)
Tính toán chiều rộng và cao của String với UIFont

```
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
=>
```
let text = "Hihihi! Hahaha"
let textHeight = text.height(withConstrainedWidth: 100, font: UIFont.systemFont(ofSize: 14))
```

## String.containsOnlyDigits
Hạn chế kiểu dữ liệu user nhập vào. Ví dụ ext cho string chỉ có dạng chữ số
```
extension String {
    var containsOnlyDigits: Bool {
        let notDigits = NSCharacterSet.decimalDigits.inverted
        return rangeOfCharacter(from: notDigits, options: String.CompareOptions.literal, range: nil) == nil
    }
}
```
=>
```
let str1 = "12345".containsOnlyDigits // true
let str2 = "12345+".containsOnlyDigits //false
```

## String.isAlphanumeric
Như thằng trên nhưng kiểm tra chuỗi không trống và không chứa các ký tự đặt biệt

```

import Foundation

extension String {
    var isAlphanumeric: Bool {
        !isEmpty && range(of: "[^a-zA-Z0-9]", options: .regularExpression) == nil
    }
}
```
=>
```
let str1 = "dasdDF123".isAlphanumeric // true
let str2 = "a_sd+s3mM.".isAlphanumeric // false
```

## String Subscripts
Cách lấy chuỗi theo dạng ký tự từ...đến

```
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
=>
```
let str1 = "Hello, world!"[7...] // world!
let str2 = "Hello, world!"[7...11] // world
```

## UIImage.squared
Ext giúp crop và scale một image thành một hình vuông chuẩn đẹp

```
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
=>
```
let img = UIImage(name: "avatar")
let imgSquared = img.squared
```

## UIImage.resized(…)
Resize lại kích thước ảnh với size tối đa được chính mình định lượng

```
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
=>
```
let img = UIImage(name: "avatar")
let imgThumb = img.resized(maxSize: 256)
```
Hoặc thêm combo hình vuông trên luôn nhé
```
let img = UIImage(name: "avatar")
let imgThumb = img.squared?.resized(maxSize: 256)
```

## Int.toString()
Convert int to String

```
extension Int {
    func toString() -> String {
        "\(self)"
    }
}
```
=>
```
let a = 13
let aAsString = a.toString()
```

## Double.toString()
Convert double sang dạng string

```
extension Double {
    func toString() -> String {
        String(format: "%.02f", self)
    }
}
```
=>
```
let a = 35.2
let aAsString = a.toString()
```

## String.asDict
Đến convert json nào

```
extension String {
    var asDict: [String: Any]? {
        guard let data = self.data(using: .utf8) else { return nil }
        return try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String: Any]
    }
}
```
=>
```
let json = "{\"hahaa\": \"hihi\"}"
let dictFromJson = json.asDict // ["hahaa": "hihi"]
```

## String.asArray
Chuyển đổi json sang array nào

```
extension String {
    var asArray: [Any]? {
        guard let data = self.data(using: .utf8) else { return nil }
        return try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [Any]
    }
}
```
=>
```
let json = "[1, 2, 3]"
let arrFromJson = json.asArray // [1, 2, 3]
```

## Bundle.appVersion
Ext giúp bạn lấy được version app từ file Info.plist. Cái này thường dùng để:
* Sending the app version to API.
* Checking available updates.
* Showing the app version on a device screen


```
extension Bundle {
    var appVersion: String? {
        self.infoDictionary?["CFBundleShortVersionString"] as? String
    }
    
    static var mainAppVersion: String? {
        Bundle.main.appVersion
    }
}
```
=>
```
let appVersion = Bundle.mainAppVersion
```

Hết bài. Hy vọng những extensions nhỏ nhoi của mình sẽ giúp được các bạn phần nào trong code. Tuy đơn giản nhưng có thể chúng ta sẽ cần dùng :D