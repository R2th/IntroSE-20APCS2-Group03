> `@autoclosure` trong Swift là một loại closure cho phép bỏ qua dấu ngoặc nhọn và làm cho nó trông giống như một biểu thức bình thường. Tuy nhiên đi sâu vào chi tiết hơn thì nó vẫn  là một closure.  Việc sử dụng nó cho phép chúng ta có thể cải thiện hiệu quả code của mình hơn. Từ khóa `@autoclosure` có thể là mới đối với bạn và đối với nhiều người trong chúng ta, thật khó để đưa ra các trường hợp sử dụng cho nó. Tuy nhiên, nếu quan sát kỹ, bạn sẽ nhận thấy rằng nó được sử dụng trong các thư viện API Swift tiêu chuẩn mà bạn đang sử dụng hàng ngày

### 1. `@autoclosure` là gì?

Tất cả nằm trong tên gọi của nó: `@autoclosure` tự động tạo một closure từ một đối số được truyền cho một function. Chuyển một đối số thành một closure cho phép chúng ta trì hoãn yêu cầu thực tế của đối số.

Hãy giải thích điều này chi tiết hơn bằng cách sử dụng ví dụ code sau. Trong ví dụ này, chúng ta đã tạo method `debugLog` và struct `Person` mà chúng ta sẽ in ra:

```
struct Person: CustomStringConvertible {
     let name: String
     
     var description: String {
         print("Asking for Person description.")
         return "Person name is \(name)"
     }
 }

 let isDebuggingEnabled: Bool = false
 
 func debugLog(_ message: String) {
     /// You could replace this in projects with #if DEBUG
     if isDebuggingEnabled {
         print("[DEBUG] \(message)")
     }
 }

 let person = Person(name: "Eval")
 debugLog(person.description)
 
 // Prints:
 // Asking for Person description. 
```

Mặc dù chúng ta đã tắt debugging, struct `Person` vẫn được yêu cầu description của nó. Điều này là do đối số `message` của `debugLog` được tính trực tiếp.

Chúng ta có thể giải quyết vấn đề này bằng cách sử dụng closure:

```
 let isDebuggingEnabled: Bool = false

 func debugLog(_ message: () -> String) {
     /// You could replace this in projects with #if DEBUG
     if isDebuggingEnabled {
         print("[DEBUG] \(message())")
     }
 }

 let person = Person(name: "Eval")
 debugLog({ person.description })

 // Prints:
 // -
```

Closure `message()` chỉ được gọi khi debugging được bật. Bạn có thể thấy rằng bây giờ chúng ta cần phải chuyển đối số closure vào method `debugLog` nên nhìn trông không được đẹp mắt cho lắm. 

Chúng ta có thể cải thiện đoạn code này bằng cách sử dụng từ khóa `@autoclosure`:

```
 let isDebuggingEnabled: Bool = false
 
 func debugLog(_ message: @autoclosure () -> String) {
     /// You could replace this in projects with #if DEBUG
     if isDebuggingEnabled {
         print("[DEBUG] \(message())")
     }
 }

 let person = Person(name: "Eval")
 debugLog(person.description)

 // Prints:
 // - 
```

Logic bên trong phương thức `debugLog` vẫn giữ nguyên và vẫn phải làm việc với một closure. Tuy nhiên, về mức độ thực hiện bây giờ chúng ta có thể truyền đối số như thể nó là một biểu thức bình thường. Nó trông vừa clean và quen thuộc khi chúng ta đã tối ưu hóa code debug logging của mình.

`@autoclosure` cho phép trì hoãn quá trình tính toán thực tế của đối số, giống như chúng ta đã thấy trước đây với các lazy collections và lazy properties. Trên thực tế, nếu debugging không được bật, chúng ta sẽ không còn tính toán debug descriptions như trước đây nữa!

### 2. Ví dụ về các API Swift tiêu chuẩn sử dụng `@autoclosure`

Bây giờ chúng ta đã biết cách `@autoclosure` hoạt động, chúng ta có thể xem qua các thư viện API tiêu chuẩn sử dụng từ khóa này.

Một ví dụ phổ biến là function [`assert(condition:message:file:line:)`](https://developer.apple.com/documentation/swift/1541112-assert) . Điều kiện của nó chỉ được đánh giá `#if DEBUG` là true và  message của nó chỉ được gọi nếu điều kiện không thành công. Cả hai đối số đều là auto closure. Trên thực tế, nhiều API testing sử dụng tính năng `@autoclosure`.  Ví dụ như [đây](https://github.com/apple/swift-corelibs-xctest/blob/main/Sources/XCTest/Public/XCTAssert.swift#L159): 

```
public func XCTAssert(_ expression: @autoclosure () throws -> Bool, _ message: @autoclosure () -> String = "", file: StaticString = #file, line: UInt = #line) {
    XCTAssertTrue(try expression(), message(), file: file, line: line)
}
```

### 3. Kết luận 

`@autoclosure` có thể là một giải pháp tuyệt vời để ngăn chặn công việc không cần thiết nếu code không thực sự được sử dụng. Về mức độ thực hiện, mọi thứ trông giống nhau, chi tiết hơn thì chúng ta đã tối ưu hóa code của mình.

Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃