*Thành phần trên kế thừa, nguyên tắc interface-segregation, method dispatch và unit testingị*

![](https://images.viblo.asia/d19381b6-f184-41d5-b504-c140fe6ab5e9.jpeg)


Bởi vì những lý do không sử dụng chúng lớn hơn những lợi ích mà bạn đã nhận được từ việc này. Hãy xem một trong số chúng nào:

* Thành phần trên nguyên tắc kế thừa (inheritance) và [interface-segregation principles](https://nhungdongcodevui.com/2017/04/13/solid-la-gi-nguyen-tac-4-chia-nho-interface-interface-segregation-principle-isp/).
* Method dispatch trong protocols.
* Unit Testing.

# Protocol Default Implementation
Như [Swift’s documentation ](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html) đã đề cập.

## “You can use protocol extensions to provide a default implementation to any method or computed property requirement of that protocol.”

Trong thực tế, không chỉ bạn có thể cung cấp một default implementation cho các phương thức hoặc các thuộc tính được xác định trong giao thức, bạn cũng có thể thêm các phương thức mới.

Xét ví dụ:

```
protocol SampleProtocol {
  func foo()
}
extension SampleProtocol {
  func foo() {
    print("foo")
  }
  func bar() {
    print("bar")
  }
}
class SampleClass: SampleProtocol {}
let sample: SampleProtocol = SampleClass()
sample.foo() // prints "foo"
sample.bar() // prints "bar"
```

# [Favor Composition Over Inheritance](https://www.codehub.vn/Tim-Hieu-Ve-Nguyen-Ly-Composition-over-Inheritance) (Kế thừa ưu tiên hợp đối tượng)
Theo mình, chúng ta cần 1 default implementation cho môt phương thưc hoặc một thuộc tính giống như 1 [code smell](https://martinfowler.com/bliki/CodeSmell.html).

Nếu bạn chưa biết thì 1 code smell là  một thành phần trong code có thể chỉ ra một vấn đề sâu sắc hơn (hơi trừu tượng nhỉ). Có thể có những lý do khác khiến bạn nghĩ rằng bạn cần sử dụng phương pháp này nhưng cách dễ nhất là để tránh sao chép mã.

Theo nguyên lý hướng đối tượng thì chung ta nên kế thừa ưu tiên hợp đối tượng cho mục đích đó.

Kế thừa cứng nhắc hơn, tránh thực hiện cụ thể để được injected hoặc thay đổi trong thời gian chạy, phá vỡ đóng gói, giảm mức độ dễ đọc code, làm cho việc kiểm tra khó khăn hơn, v.v.

# Interface Segregation Principle
Một lý do khác khiến bạn cần sử dụng triển khai mặc định là bạn bỏ lỡ các phương thức tùy chọn trong các giao thức Objective-C. Bạn có thể muốn cung cấp một triển khai mặc định như là một thay thế.

Một lần nữa, đây có thể không phải là cách tiếp cận tốt nhất. Nguyên tắc phân tách giao diện là một trong năm nguyên tắc RẮN và nói rằng không khách hàng nào bị  bắt buộc phải phụ thuộc vào các phương thức mà nó không sử dụng.

Nói tóm lại: Nếu đó là trường hợp khác, hãy chia giao thức của bạn thành các giao thức nhỏ hơn.

xem thêm tại: https://nhungdongcodevui.com/2017/04/13/solid-la-gi-nguyen-tac-4-chia-nho-interface-interface-segregation-principle-isp/

# Method Dispatch
Nếu chúng ta quay trở lại ví dụ đầu tiên của bài viết và cố gắng ghi đè (override) lên function thực hiện mặc định của protocal, hãy xem điều gì xảy ra:
```
protocol SampleProtocol {
    func foo()
}
extension SampleProtocol {
    func foo() {
        print("protocol foo")
    }
    func bar() {
        print("protocol bar")
    }
}
class SampleClass: SampleProtocol {
    func foo() {
        print("class foo")
    }
    func bar() {
        print("class bar")
    }
}
let sample: SampleProtocol = SampleClass()
sample.foo() // prints "class foo"
sample.bar() // prints "protocol bar"
```

Nếu bạn hoặc bất kỳ ai đọc mã của bạn, không quen với cách thức hoạt động của phương thức trong Swift, thì nó khá phản trực giác.

Và, nó cũng là một nguồn của các lỗi khó tìm.

Đây là lý do tại sao nó xảy ra:

SampleProtocol định nghĩa hai phương thức: foo() được định nghĩa trong Protocal là bắt buộc và bar() được định nghĩa trong phần mở rộng.

Các phương thức yêu cầu giao thức sử dụng dynamic dispatch, lựa chọn phương thức nào để thực thi trong runetime.

Các phương thức được định nghĩa mở rộng sử dụng static dispatch lựa chọn phương thức nào để thực thi trong building time. Điều đó có nghĩa là việc triển khai duy nhất được sử dụng sẽ là một trong những phần mở rộng. Và bạn có thể ghi đè lên nó.

# Dispatch Precedence và Constraints

Tiếp theo với vấn đề Method Dispatch, có một điều khác cần tính đến nếu bạn sử dụng các ràng buộc (Constraints):

```
protocol SampleProtocol {
    func foo()
}
extension SampleProtocol {
    func foo() {
        print("SampleProtocol")
    }
}
protocol BarProtocol {}
extension SampleProtocol where Self: BarProtocol {
    func foo() {
        print("BarProtocol")
    }
}
class SampleClass: SampleProtocol, BarProtocol {}
let sample: SampleProtocol = SampleClass()
sample.foo() // prints "BarProtocol"
```

Bạn có thể ghi đè các cài đặt mặc định (miễn là chúng được yêu cầu bởi giao thức) bằng các ràng buộc. Và các triển khai mặc định bị ràng buộc có quyền ưu tiên không bị ràng buộc.

Vì vậy, ưu tiên sẽ là: class /struct/enum tuân thủ protocol -> protocol extension bị ràng buộc -> protocol extension đơn giản.

Một lần nữa, bạn có thể đã biết điều đó rồi, nhưng chắc chắn có thể gây nhầm lẫn cho bất kỳ ai khác đọc, thay đổi hoặc gỡ lỗi code của bạn.

# Unit Testing

Giả sử rằng bạn đã viết các test cho code của mình, injecting dependencies và sử dụng mocks, bạn sẽ gặp khó khăn khi thử cả hai: mock protocols với các default implementations và kiểm tra các default implementations đó.

Khi bạn cố gắng mock protocols với các triển khai mặc định, bạn sẽ gặp phải vấn đề gửi phương thức và do đó, bạn đã  có thể mô phỏng các phương thức được xác định mở rộng:

```
protocol DependencyProtocol {}
extension DependencyProtocol {
    func foo() -> Int {
        return 0
    }
}
class SampleClass {
    let dependency: DependencyProtocol
    init(dependency: DependencyProtocol) {
        self.dependency = dependency
    }
    
    // You will never be able to mock dependency.foo()
    func sampleMethod() {
        let dependencyValue = dependency.foo()
        print(dependencyValue)
    }
}
```

Ngoài ra, bạn có thể thấy khó khăn trong việc phát hiện các phương thức mới được thêm vào khi nào và ở đâu với các cài đặt mặc định vì trình biên dịch luôn là đứa chạy đầu tiên.

Bạn có thể kết thúc bao gồm các triển khai mặc định trong các lớp khác testing, thay vì các mocked methods.

Testing các triển khai mặc định không phải là một vấn đề nhỏ vì bạn sẽ phải mã hóa và khởi tạo một dummy class phù hợp với giao thức, vì vậy bạn có thể gọi các phương thức đó.

Dummy class này sẽ phải thực hiện tất cả các phương thức cần có giao thức mà không có triển khai mặc định.

```
protocol SampleProtocol {
    func same(input: Int) -> Int
}
extension SampleProtocol {
    func double(input: Int) -> Int {
        return input * input
    }
}
// You need a dummy class so you can call protocol default implementations
class SampleProtocolDummy: SampleProtocol {
    // You need to implement notimplemented-required-methods with dummy code
    func same(input: Int) -> Int {
        return 0
    }
}
let sut: SampleProtocol = SampleProtocolDummy()
let result = sut.double(input: 2)
XCTAssertEqual(expectedResult, result)
```

Cảm ơn các bạn đã đọc đến đây.

Tham khảo: https://medium.com/better-programming/swift-why-you-should-avoid-using-default-implementations-in-protocols-eeffddbed46d