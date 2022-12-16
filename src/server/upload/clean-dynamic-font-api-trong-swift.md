Xin chào các bạn,
Hiện nay có một vài cách để tải phông chữ tùy chỉnh vào ứng dụng của bạn.

- Đưa chúng vào bundle của bạn và tải chúng vào lúc khởi chạy qua *info.plist*
- Tự động tải phông chữ sau khi khởi chạy, có thể ngay cả từ *remote url*

Tải nhiều phông chữ thông qua *info.plist* thường không thực tế vì nó có ảnh hưởng bất lợi đến thời gian khởi chạy ứng dụng của bạn. Tuy nhiên nó không cần phải viết code để tải các phông chữ vào bộ nhớ và đảm bảo chúng tồn tại tốt trước khi bạn cần truy cập chúng. Và một ưu điểm khác là các phông chữ được nạp theo cách này có thể được định nghĩa trong *XIB* và *Storyboard*.

Tự động tải phông chữ có lợi thế là có thể tải phông chữ theo nhu cầu và thậm chí bạn có thể tải chúng xuống từ remote url. Cách tiếp cận này cũng không yêu cầu bạn sử dụng *info.plist* của bạn.

Gần đây mình đã làm việc trên một ứng dụng có chứa khoảng 15-20 phông chữ, hầu hết trong số đó không được yêu cầu trong khoảng thời gian đầu sử dụng ứng dụng. Vì vậy, mình đã chọn cách tự động tải phông chữ theo yêu cầu.

Với mục đích của bài viết này, mình muốn tập trung vào mẫu API mà mình đã sử dụng trên các ứng dụng khác nhau.


# API Implementation

Khi tự động tải phông chữ, mình thường cần 3 thông tin: tên, tên file và đuôi của phông chữ.

```
public protocol FontCacheDescriptor: Codable {
    var fontName: String { get }
    var fileName: String { get }
    var fileExtension: String { get }
}
```

Bây giờ mình có một kiểu mô tả phông chữ tùy chỉnh của mình. Trong hầu hết các trường hợp trên ứng dụng iOS, mình xử lý phông chữ *TrueType* (ttf), vì vậy mình sẽ mặc định *implement* cho nó.

```
public extension FontCacheDescriptor {
    public var fileExtension: String {
        return "ttf"
    }
}
```

Cách tiếp cận mình khuyến khích sử dụng các kiểu *enum*. Với kiến thức đó, hãy thêm một extensuon khác để sử dụng *rawValue* khi enum của chúng ta là *RawRepresentable*.

```
public extension FontCacheDescriptor where Self: RawRepresentable, Self.RawValue == String {
      public var fontName: String {
          return rawValue
      }

      public var fileName: String {
          return rawValue
      }
  }
```

Để tải phông chữ tùy chỉnh này của mình, chúng ta cần thực hiện các bước sau.

- Đăng ký phông chữ với hệ thống và tải nó vào bộ nhớ (chỉ khi nó chưa được lưu trữ)
- Nếu bạn đang nhắm tới phiên bản iOS 11+, hãy mở rộng kích thước phông chữ dựa trên *UIContentSizeCategoy* hiện tại
- Tạo mô tả cho phông chữ

Hay thêm một *convenience initializer* cho UIFont.

```
extension UIFont {

    public convenience init(descriptor: FontCacheDescriptor, size: CGFloat) {
        FontCache.cacheIfNeeded(named: descriptor.fileName, fileExtension: descriptor.fileExtension)
        let size = UIFontMetrics.default.scaledValue(for: size)
        let descriptor = UIFontDescriptor(name: descriptor.fontName, size: size)
        self.init(descriptor: descriptor, size: 0)
    }

}
```

## Cách sử dụng API

Với tất cả các đoạn code đã được viết, bây giờ chúng ta có thể dễ dàng tạo các API xung quanh phông chữ tùy chỉnh của chúng ta để sử dụng trong các đoạn code UI.

Giả sử chúng ta có một phông chữ được gọi là Graphik và nó có 4 biến thể.

```
extension UIFont {
    
    // The `rawValue` MUST match the filename (without extension)
    public enum Graphik: String, FontCacheDescriptor {
        case regular = "GraphikAltWeb-Regular"
        case medium = "GraphikAltWeb-Medium"
        case regularItalic = "GraphikAltWeb-RegularItalic"
        case mediumItalic = "GraphikAltWeb-MediumItalic"
    }
    
    /// Makes a new font with the specified variant, size
    public convenience init(graphik: Graphik, size: CGFloat) {
        self.init(descriptor: graphik, size: size)
    }
    
}
```

Bây giờ đoạn code UI của chúng ta chỉ đơn giản là tạo một *instance* của phông chữ này.

```
let font = UIFont(graphik: .regular, size: 16)
```

### Kết luận
API này cung cấp một cách tiếp cận đơn giản và gọn nhẹ mang lại nhiều lợi ích:

- Linh động hỗ trợ kiểu font 
- Linh động tải font chữ 
- Font được lưu vào bộ nhớ đệm


Source: https://152percent.com/blog/2018/7/3/dynamic-font-api-swift?utm_campaign=Revue%20newsletter&utm_medium=Swift%20Weekly%20Newsletter%20Issue%20122&utm_source=Swift%20Weekly