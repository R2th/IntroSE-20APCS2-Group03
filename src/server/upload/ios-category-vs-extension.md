Với một iOS developer thì việc sử dụng Swift hay Objective C là điều bắt buộc trong suốt quá trình development. Với tôi, Swift đến với tôi một cách khá bất ngờ, và khi tiếp cận với Objective C ắt hẳn không chỉ riêng tôi có những khái niệm lần đầu được nghe tới và còn loay hoay không biết khi nào thì sử dụng chúng.
Vậy nên bài viết này tôi muốn giới thiệu về khái niệm được gọi là Category

### Trong Swift có tồn tại hay không khái niệm Category?
Câu trả lời là có, nhưng không được gọi với cái tên Category mà nó là Extension (với chức năng tương tự). Trong Swift, extension là một phần mở rộng cho một class, struct, enums, protocol type. Bao gồm cả việc mở rộng cho các loại mà không có quyền truy cập vào source code gốc của chúng (retroactive modeling)

Dưới đây là ví dụ về extension trong Swift

Tạo Swift file
![](https://images.viblo.asia/2d74f282-ad8f-4943-bac4-bab6ec2ccfd4.png)


Extension của UIColor
```Swift
import Foundation
import UIKit

extension UIColor {
    
    convenience init(hex: String) {
        let scanner = Scanner(string: hex)
        scanner.scanLocation = 0
        
        var rgbValue: UInt64 = 0
        
        scanner.scanHexInt64(&rgbValue)
        
        let r = (rgbValue & 0xff0000) >> 16
        let g = (rgbValue & 0xff00) >> 8
        let b = rgbValue & 0xff
        
        self.init(
            red: CGFloat(r) / 0xff,
            green: CGFloat(g) / 0xff,
            blue: CGFloat(b) / 0xff, alpha: 1
        )
    }
}
```

Và sử dụng chúng
```Swift
labelTest.textColor = UIColor.init(hex: "FFFFFF")
```

### Vậy Category trong Objective-C có gì khác biệt ?


#### Category ?

Theo documentation của Apple có nói:
> Sử dụng category để định nghĩa các phương thức bổ sung của một lớp đã có sẵn. Thường sử dụng các category để thêm các phương thức vào các lớp sẵn có, như các phương thức được xác định trong Cocoa frameworks. Các phương thức được thêm vào được kế thừa bởi các subclass và không thể phân biệt được trong thời gian chạy với các phương thức ban đầu của class.  Cũng có thể sử dụng các category của các class của chính mình.
> 
Nghe lằng nhằng quá nhỉ, nhưng tóm lại thì nó cũng giống giống như extension đó.

Chúng thường nằm trong các tệp có tên "Class + CategoryName.h", như "NSView + CustomAdditions.h" (và .m).

Một ví dụ điển hình của một category method được đưa ra dưới đây. Ở đây chúng tôi thêm một phương thức `isNumeric` vào NSString:

```ObjectiveC
@interface NSString (NumberUtils)
 
- (BOOL)isNumeric;
 
@end
 
@implementation NSString (NumberUtils)
 
- (BOOL)isNumeric
{
    NSScanner *scanner = [NSScanner scannerWithString:self];
    return [scanner scanFloat:NULL]? [scanner isAtEnd]: NO;
}
 
@end
```

Thậm chí có thể khai báo các thuộc tính mới trong một  category, nhưng ta không thể synthesize chúng. Điều đó bởi vì không thể thêm các instance variable mới vào một class thông qua một category - cấu trúc dữ liệu bên trong của class đã được quyết định tại thời điểm biên dịch và các category (được tải sau này, trong thời gian chạy) không thể thay đổi nó.

Chỉ có thể tạo các virtual property - phương thức getter / setter có cùng ngữ nghĩa với một property thông thường nhưng không được hỗ trợ bởi một instance variable. Ví dụ: Ta có thể đã khai báo phương thức isNumeric ở trên là thuộc tính chỉ đọc, như sau:

```ObjectiveC
@interface NSString (NumberUtils)
 
@property (nonatomic, readonly, getter=isNumeric) BOOL numeric;
 
@end
```

Điều này cho phép sử dụng property syntax để gọi phương thức, nhưng nó không giúp ta lưu trữ thêm dữ liệu trong class mà không thể lấy được từ các property hiện có. 

#### Sự khác biệt 

- Category cung cấp một cách để thêm các phương thức vào một class ngay cả khi source code của nó không có sẵn. ví dụ: NSString
- Extension chỉ có thể nếu mã nguồn có sẵn, bởi vì trình biên dịch biên dịch extension code & source code cùng một lúc.
- Extension tương tự như các Category trong Objective-C. (Không giống như Category trong Objective-C, Extension Swift không có tên)
- Việc thực thi của extension phải nằm trong `@implementation` của file.

Khá phổ biến khi thấy extension lớp ở đầu file .m khai báo thêm các phương thức trong class, sau đó được triển khai bên dưới trong `@implementation` của lớp. Đây là một cách để khai báo các phương thức "pseudo-private" (giả  ở chỗ chúng không thực sự riêng tư, chỉ là không bị lộ ra bên ngoài).

### Tổng kết

Trên đây là một vài ý kiến riêng của mình về vấn đề nhỏ này. Cảm ơn bạn đã theo dõi, hãy comment để thể hiện quan điểm riêng của mình và đóng góp cho bài viết được tốt hơn!

#### Refs:
> https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/Category.html#//apple_ref/doc/uid/TP40008195-CH5-SW1
> 
> https://stackoverflow.com/questions/3499704/difference-between-category-and-class-extension
> 
> https://docs.swift.org/swift-book/LanguageGuide/Extensions.html