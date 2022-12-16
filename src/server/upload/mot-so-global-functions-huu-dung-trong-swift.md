Global functions hay còn gọi là các hàm toàn cục là các functions có thể truy cập ở bất kì đâu mà không nhất thiết phải quy định một scope cụ thể. Đây là khái niệm quen thuộc với các ngôn ngữ cũ như C hay Objective-C, nhưng không được khuyến khích sử dụng trong Swift.

Vì một vài lý do mà thư viện chuẩn Swift vẫn hỗ trợ một số Global Functions và vẫn rất hữu dụng ở thời điểm hiện nay. Trong bài viết hôm nay, chúng ta sẽ đề cập tới một số Functions như vậy

## zip()
**zip** function cho phép người dùng gộp 2 hoặc nhiều Arrays vào thành một **Sequence** các Tuple. Hàm này rất hữu dụng trong trường hợp chúng ta cần lặp nhiều Arrays tại một thời điểm. Nếu không sử dụng **zip**, chúng ta sẽ phải tự tạo một vòng lặp các index và truy cập vào index tương ứng của các Array cùng lúc. **zip** cho phép chúng ta làm việc tương tự với cú pháp dạng **for-in** quen thuộc của Swift. Xem xét ví dụ sau để hiểu tác dụng của hàm này
Giả sử, chúng ta có màn hình đăng ký và sẽ phải cập nhật trạng thái của các TextField theo một logic validate được định nghĩa (chẳng hạn như hiển thị lỗi, đổi màu textfield để báo cho người dùng, ...). Đoạn code đó có thể triển khai như sau:
```swift
func updateValidationTextFields(validationResults: [FieldValidationResult],
             inTextFields textFields: [MyTextField]) {
    for i in 0..<textFields.count {
        let textField = textFields[i]
        let result = validationResults[i]
        textField.update(validationResult: result)
    }
}
```

Với việc sử dụng **zip**, cú pháp sẽ đơn giản hơn rất nhiều
```Swift
func updateValidationTextFields(validationResults: [FieldValidationResult],
             inTextFields textFields: [MyTextField]) {
    for (textField, result) in zip(textFields, validationResults) {
        textField.render(validationResult: result)
}
```
**zip** sẽ tự ghép các element chung index của các Array truyền vào thành một Tuple, do đó người dùng không cần quan tâm tới việc quản lý index. Tuy nhiên **zip** chỉ phù hợp với bài toán khi các Arrays có cùng số lượng elements và cần truy xuất các element có cùng index tại một thời điểm.

## dump()
Đa phần chúng ta sử dụng **print()** cho các hàm Debug. Tuy nhiên trong một số trường hợp, chúng ta sử dụng class trong ứng dụng. Sử dụng **print** chỉ in ra tên Class của instance đó. Muốn in ra đầy đủ tên và giá trị của các thuộc tính, chúng ta sẽ phải in trực tiếp từng thuộc tính hoặc tự tạo một custom print cho từng class để phục vụ cho việc Debug.

Swift cung cấp một Global function khác để hỗ trợ log message trong console là **dump** (có thể sử dụng từ phiên bảo SDK Xcode 8.0+). **dump** sẽ giải quyết vấn đề đã đề cập ở trên và cung cấp nhiều thông tin hữu dụng hơn để phục vụ cho quá trình Debug. Xem xét ví dụ dưới đây để hiểu rõ hơn sự khác biệt của **dump** và **print**

Giả sử chúng ta định nghĩa 2 class như sau:
```Swift
class Employee {
    var name: String
    
    init(name: String) {
        self.name = name
    }
}

class Company {
    var name: String
    var employees: [Employee]
    
    init(name: String, employees: [Employee]) {
        self.name = name
        self.employees = employees
    }
}
```

Khởi tạo instance của Class Company và sử dụng **print** và **dump** để debug trên console và so sánh kết quả

```Swift
override func viewDidLoad() {
        super.viewDidLoad()
        let employee1 = Employee(name: "Xuan Huy A")
        let employee2 = Employee(name: "Xuan Huy B")
        let company = Company(name: "Sun*", employees: [employee1, employee2])
        print(company)
        // GlobalFunction.Company
        dump(company)
        // ▿ GlobalFunction.Company #0
        // - name: "Sun*"
        // ▿ employees: 2 elements
        //   ▿ GlobalFunction.Employee #1
        //      - name: "Xuan Huy A"
        //    ▿ GlobalFunction.Employee #2
        //      - name: "Xuan Huy B"
}
```

Có thể thấy, sử dụng **dump** hiển thị đầy đủ tên, giá trị các thuộc tính của object. **dump** cũng có thể được dùng với view và hiển thị đầy đủ các lớp cha của nó

```Swift
▿ Optional(<UIView: 0x7ff59ec087d0; frame = (0 0; 428 926); autoresize = W+H; layer = <CALayer: 0x6000005393e0>>)
  - some: <UIView: 0x7ff59ec087d0; frame = (0 0; 428 926); autoresize = W+H; layer = <CALayer: 0x6000005393e0>> #0
    - super: UIResponder
      - super: NSObject
```

Ngoài ra, Swift còn cung cấp một vài tham số để thay đổi cách thông tin được log ra cho phù hợp với nhu cầu của người sử dụng như message bắt đầu mỗi đoạn log, khoảng cách lùi đầu dòng, độ sâu tối đa (khái niệm này hơi khó hiểu, bạn có thể xem ví dụ sau)

```Swift
dump(company, maxDepth: 2)
// ▿ GlobalFunction.Company #0
// - name: "Sun*"
//  ▿ employees: 2 elements
//    ▹ GlobalFunction.Employee #1
//    ▹ GlobalFunction.Employee #2
```
Nếu khai báo tham số maxDept là 2, **dump** sẽ không in ra giá trị của Employee nữa. Có thể thấy, **dump** tỏ ra hiệu quả hơn nhiều so với **print** để phục vụ cho việc Debug

## sequence()
**sequence** là một function hơi khó hiểu, nhưng nó cung cấp cho người dùng một cách hay để làm ngắn gọn các hàm đệ quy

Giả sử chúng ta cần đổi màu background của một subview và tất cả view cha của nó. Để xử lý bài toán này, chúng ta có thể sử dụng một vòng lặp While như sau
```Swift
var currentView: UIView? = self
while currentView != nil {
    currentView?.backgroundColor = .green
    currentView = currentView?.superview
}
```

Thử viết lại đoãn mã trên sử dụng **sequence**
```Swift
for view in sequence(first: self, next: { $0.superview } ) {
    view.backgroundColor = .green
}
```
**sequence** trả về giá trị dạng UnfoldFirstSequence, là một wrapper của Sequence mà phần tử trước được truyền vào closure next() tạo thành phần từ sau cho tới khi không còn giá trị trả về nữa.

## repeatElement()
Đây là một hàm tương đối dễ hiểu và dễ sử dụng. Đúng như tên gọi của nó, **repeatElement** sẽ lặp lại một object theo số lần cho trước và trả về một Sequence. Trên thực tế, chúng ta có các hàm khởi tạo chuyên biệt để tạo ra một mảng các giá trị giống nhau như sau
```Swift
let array = [Int](repeating: 0, count: 10)
```

Vậy tại sao chúng ta phải sử dụng **repeatElement()** ???

Lý do là bởi hiệu năng của function này. Việc của nó đảm nhiệm đúng nghĩa chỉ là lặp lại một giá trị nào đó. Chẳng hạn như khi chúng ta muốn thay thế một phần của Array cho trước bằng một dãy các giá trị giống nhau. 

```Swift
array.replaceSubrange(2...7, with: [Int](repeating: 1, count: 6))
print(array)
// [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
```
Nếu sử dụng  **[Int](repeating: 1, count: 6)**, ứng dụng sẽ phải khởi tạo một bộ đệm để lưu trữ giá trị của mảng này mà thực sự không sử dụng tới chúng. Thay vào đó, chúng ta nên sử dụng **repeatElement** để đem đến hiệu quả tốt hơn
```Swift
array.replaceSubrange(2...7, with: repeatElement(1, count: 6))
```
Bài toán này không gặp nhiều trong thực tế, nhưng đây vẫn là một function hay để học và vận dụng khi cần. 
#### Lưu ý
Cả 2 cách để lặp phần tử mình đề cập ở trên tốt nhất chỉ nên sử dụng với **Value type** (Struct, Enum). Vì nếu sử dụng với **Refrence Type** như Class, nó sẽ sao chép tham chiếu và lặp lại theo số lần cho trước. Do đó, chỉ cần thay đổi 1 trong số các giá trị đó, sẽ làm tất cả thay đổi theo.

## stride()
Nếu đã từng làm việc với các ngôn ngữ như C, C++ hay Java chắc hẳn các bạn đã từng tạo các vòng For theo cú pháp như sau
```Swift
for (int i = 0; i < 10; i += 2) { ... }
```
Cách viết này đã bị xoá khỏi ngôn ngữ Swift, thay vào đó Swift cung cấp cho chúng ta **stride** để phục xử lý bài toán trên
```Swift
for i in stride(from: 0, to: 10, by: 2) {
    // i nhận giá trị là các số chẵn từ 0 đến 10
}
```
#### Lưu ý:
Tham số truyền vào **stride** phải được conform Strideable protocol. Với các kiểu dữ liệu mặc định của Swift đều đã conform protocol này nên có thể sử dụng luôn.

## Một số functions khác
Bên cạnh các functions được đề cập ở trên trên, Swift còn cung cấp nhiều Functions hữu dụng rất quen thuộc khác như
- **max()** - Trả về giá trị lớn nhất trong các tham số truyền vào
- **min()** - Trả về giá trị nhỏ nhất trong các tham số truyền vào
-  **abs()** - Trả về giá trị tuyệt đối của tham số truyền vào

## Tổng kết
Có nhiều cách để giải quyết các bài toán kể trên, tuy nhiên việc tìm hiểu và vận dụng các functions cần thiết giúp cho code được đẹp và gọn hơn, dễ bảo trì cũng như đem lại một hiệu năng tốt cho ứng dụng.

# Nguồn tham khảo
https://betterprogramming.pub/useful-global-swift-functions-e028b1c2afa
https://www.clariontech.com/blog/swift-dump-over-print