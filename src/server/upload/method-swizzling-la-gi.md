Bạn đã bao giờ nghe tới method swizzling chưa? Chắc hắn đây không phải là một khái niệm phổ biến với đa số mọi người nhưng nó lại khá quan trọng đấy. Trong bài viết này chúng ta hãy cùng tìm hiểu xem nó là gì và sử dụng trong trường hợp nào nhé.

### Định nghĩa
Method swizzling là tiến trình của việc thay đổi cách thực thi của một selector đang tồn tại ở runtime. Nói một cách đơn giản, ta có thể thay đổi chức năng của một phương thức ở runtime. Thật sao???

Đây là một đặc tính của Objective-C runtime

Hãy xem qua ví dụ sau:

Nếu ta muốn theo dõi các key và value được thêm vào UserDefaults và thêm một tiền tố string trước tất cả các key, ta có thể chuyển qua lại giữa implementation của phương thức setValue:forKey và phương thức riêng của ta. Vì vậy tất cả các lời gọi tới phương thức setValue:forKey sẽ được dẫn đường tới một phương thức mới. Ta có thể tạo key string mới với prefix được thêm vào và gọi bản gốc của phương thức setValue:forKey với key mới này. 

Bạn có cho rằng nó sẽ bị lặp vô tận không? Thực tế là không. Ta có thể làm điều tương tự nhờ sử dụng một category trong Objc hoặc extension trong Swift. Chỉ cần tạo mới một phương thức và gọi super setValue:forKey từ phương thức mới này.

### Cách sử dụng method swizzling 
- Tạo mới một phương thức với phần implementation được custom cho thương thức mà ta muốn swizzle
- Lấy class đại diện
- Lấy tham chiếu tới selector của phương thức cũ
- Lấy tham chiếu tới selector của phương thức mới
- Yêu cầu Objective-C runtime chuyển đổi giữa hai selectors
- Voala...

Để dễ hình dung hơn, ta sẽ cùng xem qua đoạn code dưới đây:
Hãy tạo một phương thức swizzle cho phương thức description của class UIColor. Nếu ta in ra object của UIColor, nó sẽ in ra giá trị RGBA như sau
```
print(UIColor.red) // prints UIExtendedSRGBColorSpace 1 0 0 1
```

Ta có thể in ra màu bởi class UIColor đã sẵn có một phương thức description, nó sẽ trả về chuỗi string đại diện cho màu đó, hãy thử swizzle phương thức này:
```
import Foundation
import UIKit

public extension UIColor {
    @objc func colorDescription() -> String {
        return "Printing rainbow colours."
    }

    private static let swizzleDesriptionImplementation: Void = {
        let instance: UIColor = UIColor.red
        let aClass: AnyClass! = object_getClass(instance)
        let originalMethod = class_getInstanceMethod(aClass, #selector(description))
        let swizzledMethod = class_getInstanceMethod(aClass, #selector(colorDescription))
        if let originalMethod = originalMethod, let swizzledMethod = swizzledMethod {
            // switch implementation..
            method_exchangeImplementations(originalMethod, swizzledMethod)
        }
    }()

    public static func swizzleDesription() {
        _ = self.swizzleDesriptionImplementation
    }
}
```

Sau đó hãy thử thêm vào đoạn code sau:

```
override func viewDidLoad() {
    super.viewDidLoad()
    print(UIColor.red)
    print(UIColor.green)
    UIColor.swizzleDesription()
    print(“\nswizzled\n”)
    print(UIColor.red)
    print(UIColor.red)
    UIColor.swizzleDesription()
    print(“\nTrying to swizzle again\n”)
    print(UIColor.red)
    print(UIColor.red)
}
```

Output:
```
UIExtendedSRGBColorSpace 1 0 0 1
UIExtendedSRGBColorSpace 0 1 0 1
swizzled
Printing rainbow colours.
Printing rainbow colours.
Trying to swizzle again
Printing rainbow colours.
Printing rainbow colours.
```

Static member trong Swift hoàn toàn là lazy. Đó cũng là lý do tại sao swizzleDesriptionImplementation không được gọi lại và swizzling đã không xảy ra lần thứ hai. Việc đính kèm tất cả các operation chỉnh sửa phương thức trong block khởi tạo lazy của một biến computed toàn cục đảm bảo rằng phương thức sẽ được thực thi chỉ một lần.

### Hạn chế của method swizzling
- Nếu ta sử dụng swizzling bất cứ phương thức tiêu chuẩn nào của class methods, thì cần phải đảm bảo rằng việc swizzling phải thành công và phương phức swizzle mới kia được gọi tới. Nếu ta sử dụng một số framework (Firebase chẳng hạn) có sử dụng swizzling, hãy đảm bảo ta không swizzling những phương thức mà frameword đã swizzle. Nếu swizzling xảy ra nhiều lần, hoặc là code không chạy, hoặc là Firebase không hoạt động.

- Và khi iOS mới được ra đời, cũng sẽ có những thay đổi khiến cho swizzling bị thất bại, và ta cần phải luôn kiểm tra lại nó.

- Nếu ta đang tạo ra một frameword mà được sử dụng bởi rất nhiều ứng dụng, thì tốt nhất không nên dùng swizzling. Tuy nhiên, nếu ta vẫn dùng nó, hãy thông báo đến các developer của những app đó và thêm vào trong tài liệu. 

- Swizzling bên trong một subclass có thể gây ra khá nhiều phiền toái đấy.