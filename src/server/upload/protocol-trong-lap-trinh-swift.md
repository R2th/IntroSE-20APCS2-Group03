# Khái niệm Protocol
**Protocol** được hiểu là một bản thiết kế bao gồm các thuộc tính, phương thức và các khai báo khác để thực hiện một nhiệm vụ, tính năng nào đó
**Protocol** có thể được implement bởi một Class, Struct hay Enum.
\
Khi implement một **Protocol**, ta sẽ phải khai báo, định nghĩa lại các thuộc tính, phương thức có trong Protocol đó.

# Cú pháp khai báo Protocol
Cú pháp khai báo **Protocol** tương đối giống Class, Struct hay Enum
```swift
// Khai báo Protocol
protocol Code {
    // Nội dung Protocol khai báo trong đây
}
```
Muốn Struct, Class hay Enum implement một hoặc nhiều Protocol, ta khai báo như sau 
```swift
protocol Eat {
}

struct Dev: Code, Eat {
}
```
Trường hợp khai báo implement cho một Subclass, ta phải để tên của **Superclass (Lớp cha)** lên trước tên các **Protocol**
```swift
class Human {
}

class Dev: Human, Code, Eat {
}
```

# Khai báo thuộc tính, phương thức trong Protocol
## Thuộc tính trong Protocol
Để khai báo thuộc tính trong Protocol, phải có đủ 3 yếu tố
1. Tên thuộc tính
2. Kiểu dữ liệu
3. Trạng thái của thuộc tính (get - get set)
```swift
protocol Code {
    var experience: Int { get }
    var language: String { get set }
}
```

**Lưu ý:** Thuộc tính trong Protocol phải khai báo là một **var**. Do **Protocol** mặc định những thuộc tính này ở dạng **Computed Properties** nên không thể khai báo let và phải khai báo thêm trạng thái **get** hoặc **get set** 
```swift
protocol Code {
     let level: String { get } // Error: 'let' declarations cannot be computed properties 
     var experience: Int { get }
     var language: String { get set }
}
```

Protocol hỗ trợ từ khoá **"static"** để khai báo thuộc tính thuộc về Type thay vì Instance (Protocol không hỗ trợ từ khoá **"class"**) 
 ## Phương thức trong Protocol
Khai báo phương thức trong Protocol tương tự với Class, Struct nhưng không có dấu {} và không có nội dung. \
Protocol hỗ trợ cả Type Function (khai báo **"static"**) và cả Instance Function\
**Lưu ý:** Protocol không cho phép sử dụng hằng số làm parameter cho phương thức

```swift
enum FeelHungry {
    case yes
    case no
}

protocol Human {
    static func talk()
    func eat(_ feelHungry: FeelHungry)
    func eat2(_ feelHungry: FeelHungry = .yes) // Error: Default argument not permitted in protocol method 
}
```

Nếu Struct hay Enum implement Protocol, mà khi định nghĩa các phương thức, ta muốn thay đổi thuộc tính của nó, ta sẽ phải khai báo thêm từ khoá **"mutating"** (Do Struct và Enum là kiểu **tham trị**) 
```swift
protocol Activities {
    mutating func eat()
}

enum State: Activities {
    case hungry
    case notHungry
    mutating func eat() {
        switch self {
        case .notHungry:
            print("Don't need to eat")
        case .hungry:
            print("Eat something")
            self = .notHungry
        }
    }
}
```

# Optional Protocol
Khi một Protocol chứa rất nhiều phương thức mà không muốn các đối tượng implement Protocol đó phải khai báo lại tất cả, ta sử dụng tới Optional Protocol.
Có 2 cách để khai báo Optional Protocol
## Cách 1: @objc optional
Khai báo từ khoá ```@objc optional``` trước thuộc tính, phương thức và "@objc" trước khai báo Protocol. Cách khai báo này đưa protocol về trình biên dịch của Objective - C nên chỉ class implement được Protocol này)
 ```swift
 @objc protocol OptionalMethodsProtocol {
     func mustImplement()
     @objc optional var haveNotImplement()
 }
 
 class SomeClass: OptionalMethodsProtocol {
     func mustImplement() {
     }
     // Không cần khai báo lại haveNotImplements() do đó là optional 
 }
 ```
 ## Cách 2: Extention Protocol
Đây là cách viết optional protocol phù hợp cho cả Struct, Enum lẫn Class. \
**Lưu ý:** Không khai báo được Stored Properties
```swift
protocol OptionalProtocol {
    func mustImplement()
}

extension OptionalProtocol {
    func haveNotImplement() {
    }
}

struct SomeStruct: OptionalProtocol {
    func mustImlement() {
    }
    // Không cần khai báo lại haveNotImplements() do đó là optional 
}
```

# Ứng dụng của Protocol 
1. Protocol có thể sử dụng như một kiểu dữ liệu
2. Sử dụng trong Delegate Design Pattern (Sử dụng để "bắt sự kiện", truyền dữ liệu giữa các ViewController")
3. Mở rộng đối tượng
4. Sử dụng trong nhiều thư viện tiêu chuẩn của Swift (Equable, Comparable, Hasable, Int, ...)
5. Lập trình POP (Protocol Oriented Programming)