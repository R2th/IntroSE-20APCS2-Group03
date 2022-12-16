## 1. Định nghĩa

> Access control restricts access to parts of your code from code in other source files and modules. This feature enables you to hide the implementation details of your code, and to specify a preferred interface through which that code can be accessed and used.

Access control hạn chế quyền truy cập vào các phần trong code của bạn từ các đoạn code trong các files và modules nguồn khác. Tính năng này cho phép bạn ẩn các chi tiết trong code của bạn và chỉ định những phần code mà mã đó có thể được truy cập và sử dụng.

Bạn có thể cấp quyền truy cập cho từng loại khác nhau (class, struct, và enum), cũng như các properties, methods, initializers và subscripts của nó.

Ngoài việc cung cấp các mức kiểm soát truy cập khác nhau. Để làm giảm sự phức tạp trong phần chia Access control, swift có cung cấp giá trị mặc định cho code của bạn.


## 2. Modules và Source Files
Mô hình Access control của Swift dựa trên khái niệm của các Modules và Source Files.

- A module is a single unit of code distribution—a framework or application that is built and shipped as a single unit and that can be imported by another module with Swift’s import keyword.

(Mỗi module là 1 đơn vị phân phối code - giống như là 1 framework hoặc 1 ứng dụng mà nó build lên và phân phối như 1 đơn vị và nó có thể import vào những module khác với từ khoá 'import' trong Swift)

- A source file is a single Swift source code file within a module

Có thể hiểu như sau: mỗi source file là 1 tệp mã nguồn .swift trong 1 module.


## 3. Access Levels
Swift cung cấp 5 mức access level khác nhau. Các access levels này liên quan đến source file trong 1 entity được xác định, và cũng liên quan đến module chứa file đó

### 3.1 Access Levels
Đây là mức độ cho phép truy cập của các access level.
`Open & public > Internal > File-private > Private`

- Open và public: cho phép các đối tượng (class, function, properties ...) có thể được truy cập và sử dụng ở trong bất kỳ file nào từ module khác có import module này.
Ví dụ:
```
open class OpenClass {

    open var aProperty = true // property này có thể được gọi ở mọi file trong module có import module này.

    open func aFunction() {

    }

    public init() {

    }
}
```


- Internal access: cho phép các đối tượng có thể được truy cập và sử dụng ở từ bất kỳ 1 file khác trong cùng 1 module
Ví dụ:
```
internal class LoginViewController: UIViewController {

    // property này có thể được gọi ở file khác trong cùng module hiện tại
    internal var aProperty = true 

    // function này có thể được gọi ở file khác trong cùng module hiện tại
    internal func aFunction() { 

    }

}
```

- fileprivate access: là 1 access control giới hạn trong 1 file, thường dùng cho extension.
Ví dụ:
```
// SignUpViewController.swift

class SignUpViewController: UIViewController {

    fileprivate var username = ""
    fileprivate var password = ""

    fileprivate func login() {

    }

}

=> các thuộc tính username, password và function login chỉ có thể được gọi đến từ những đoạn code trong file: SignUpViewController.swift thôi.
```


- Private access: access control này cho phép sử dụng chỉ trong scope và **trong Swift 4 thì nó đã được mở rộng ra cho các extension khai báo trong file đó**. 
Ví dụ:
```
class Register: UIViewController {
    private var name = ""
    private var email = ""

    private func register() {

    }
}

extension Register {
    private func setup() {
        register() // Đúng. Mặc dù func register() là private nhưng vẫn call được trong extension của nó
    }
}

class OtherClass {
    init() {
        let register = Register()
        register.register() // Sai. func register() đã private không gọi được từ file khác hay class khác.
    }
}
```


Open access là có quyền truy cập cao nhất và private access có quyền truy cập thấp nhất.

Ngoài ra:
> Open access applies only to classes and class members, and it differs from public access as follows:
> 
> - Classes with public access, or any more restrictive access level, can be subclassed only within the module where they’re defined.
> - Class members with public access, or any more restrictive access level, can be overridden by subclasses only within the module where they’re defined.
> - Open classes can be subclassed within the module where they’re defined, and within any module that imports the module where they’re defined.
> - Open class members can be overridden by subclasses within the module where they’re defined, and within any module that imports the module where they’re defined.
> 
> Marking a class as open explicitly indicates that you’ve considered the impact of code from other modules using that class as a superclass, and that you’ve designed your class’s code accordingly.


### 3.2 Default Access Levels
Tất cả các đoạn code của bạn điều có access level mặc định là internal access nếu bạn không chỉ định (trừ 1 số ngoại lệ).
=> trong nhiều trường hợp bạn không cần phải chỉ định access level cho code của mình

### 3.3 Access Levels for Single-Target Apps
Khi bạn viết 1 app nhỏ đơn giản. Code của bạn thường tự chứa đựng tất cả trong đó và không cần phải code thêm ở ngoài module của ứng dụng.
=> Access level là internal access đã phù hợp với yêu cầu này => bạn không cần tuỳ chỉnh nhiều cũng có thể phù hợp với app.

Tuy nhiên bạn vẫn có thể để 1 phần code của mình dưới dạng private hoặc fileprivate nếu cần thiết.

### 3.4 Access Levels for Frameworks
Khi bạn code 1 framework, bạn cần để nó là open hoặc public. Như vậy nó mới có thể truy cập và sử dụng bởi những module khác (Bạn có thể xem cách code của các libs trên github để hiểu rõ hơn)


## 4. Access Control Syntax
Cú pháp của access control rất đơn giản, bạn chỉ cần thêm access level vào trước chỗ khai báo đối tượng:
Ví dụ:
```
public class SomePublicClass {}
internal class SomeInternalClass {}
fileprivate class SomeFilePrivateClass {}
private class SomePrivateClass {}

public var somePublicVariable = 0
internal let someInternalConstant = 0
fileprivate func someFilePrivateFunction() {}
private func somePrivateFunction() {}
```

Trong trường hợp access level là internal (default level). Bạn không cần thêm internal cũng được:
```
class SomeInternalClass {}              // ngầm hiểu là internal
let someInternalConstant = 0            // ngầm hiểu là internal
```

## 5. Custom Types
Nếu bạn muốn chỉ định access level cho 1 custom type, bạn cần chỉ định nó khi định nghĩa chúng. 
Access control của 1 type cũng ảnh hưởng đến access level của các property (kể cả methods, initializers, subscripts) của type đó. VD: Nếu bạn định nghĩa 1 class là private thì các đối tượng trong đó cũng là private, Nếu bạn khai báo 1 class là internal hoặc public thì các đối tượng trong đó nếu không chỉ định sẽ được hiểu là internal.

Ví dụ:
![](https://images.viblo.asia/a6db9d5d-4306-402e-b251-9735e9c085a6.png)

### 5.1 Tuple Types
Access level cho một loại tuple là mức access level hạn chế nhất trong tất cả các loại được sử dụng trong bộ dữ liệu đó. Ví dụ: nếu bạn tạo một bộ tuple từ hai loại khác nhau, một cái có quyền truy internal và một cái quyền truy cập private => cấp truy cập cho Tuple đó sẽ là private.

### 5.2 Enumeration Types
Các case của enum sẽ tự động nhận cùng access level với enum mà chúng phụ thuộc. Bạn không thể chỉ định access level khác cho từng case của enum.

Trong ví dụ dưới đây: CompassPoint là enum public nên tất cả các case của nó đều có quyền truy cập public:
```
public enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

## 6. Constants, Variables, Properties, and Subscripts
1 constant, variable, hoặc property không thể có quyền truy cập lớn hơn Type của nó. Ví dụ sẽ là không hợp lệ nếu viết 1 thuộc tính Public khi kiểu dữ liệu của nó là private. Giống như thế với subscript: subscript không thể có quyền truy cập lớn hơn các params của nó.

Nếu 1 constant, variable, property hoặc subscript sửa dụng Type private thì chúng phải được chỉ định là private
`private var privateInstance = SomePrivateClass()`


**Kết luận**

- Swift 4 có 5 loại access control: open, public, internal, fileprivate, private
- Bạn cần hiểu được sự khác nhau của các loại access level để có thể chọn level phù hợp cho các đoạn code của mình.

Bài viết được tham khảo + dịch từ: https://docs.swift.org/swift-book/LanguageGuide/AccessControl.html

p/s bài viết còn nhiều thiếu sót, đang được update nhé mọi người.