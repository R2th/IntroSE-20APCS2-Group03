### zip():
Hàm `zip` cho phép chúng ta có thể merge 2 hay nhiều mảng vào một `Sequence` của một tuple.  `Zip` rất hữu dụng chúng ta cần lặp 2 việc cùng lúc thì nếu không dùng `zip` chúng ta sẽ phải dùng `For` loop và truy cập mỗi index từ mỗi mảng, còn sử dụng `zip` cho phép chúng tatruy cập các element từ tất cả các mảng.<br>
Ví dụ, nếu chúng ta có một form đăng kí người dùng và chúng ta muốn cập nhật textFields để render một danh sách kết quả validation nhận từ backend, thường chúng ta sẽ làm như này:<br>
```
func present(validationResults: [FieldValidationResult],
             inTextFields textFields: [MyTextField]) {
    for i in 0..<textFields.count {
        let field = textFields[i]
        let result = validationResults[i]
        field.render(validationResult: result)
    }
}
```
Còn với zip thì 
```
func present(validationResults: [FieldValidationResult],
             inTextFields textFields: [MyTextField]) {
    for (field, result) in zip(textFields, validationResults) {
        field.render(validationResult: result)
    }
}
```

### dump():
Hàm dump dùng để in ra các đối tượng. Trong khi để in các đối tượng thì chúng ta dùng các syntax như `description` hay `debugDescription`, dump sẽ in nội dung của đối tượng sử dụng sự phản chiếu, cho kết quả đầu đủ hơn bao gồm cả các cấp của đối tượng đó<br>
```
class Foo: NSObject {
    let bar: String = "bar"
}

let foo = Foo()
print(foo)
// <SwiftRocks.Foo: 0x1030b9250>

dump(foo)
// ▿ <SwiftRocks.Foo: 0x1030b9250> #0
//     - super: NSObject
//    - bar: "bar"
```

### sequence()
Hàm `sequence()` để chúng ta viết hàm đệ quy trong một syntax đẹp hơn.
Giả sử chúng ta thay đổi màu nền của một subvuew và tất cả view cha của nó, có lẽ chúng ta sẽ sử dụng `while` loop như thế này:
```
var currentView: UIView? = self
while currentView != nil {
    currentView?.backgroundColor = .green
    currentView = currentView?.superview
}
```

Trong trường hợp này thì cách sủ dụng hiệu quả nhất là dùng `sequence()`, như khía cạnh của phương thức `(currentView = currentView?.superview)` luôn như nhau, chúng ta có thể sử dụng `sequence()` vào một vòng for loop như sau:
```
for view in sequence(first: self, next: { $0.superview } ) {
    view.backgroundColor = .green
}
```
`repeatElement()`
Với một đối tượng và con số được cho, kết quả là một `Sequence` có thể được lặp đối tượng đó với số lần được cho.
```
let repeated: Repeated<String> = repeatElement("SwiftRocks", count: 3)
for value in repeated {
    print(value)
}
//SwiftRocks
//SwiftRocks
//SwiftRocks
```

Hầu hết cá kiểu  liệu đều có khởi tạo đặc biệt như sau:
```
let array = [Int](repeating: 0, count: 10)
```

Vậy tạo sao chúng ta sử dụng `repeatElement`? Lý do là vì hiệu suất. Kiểu trả về của `repeatElement()` là một kiểu `Sequence Repeated<T>`, nghĩa là nó không làm gì ngoài việc cung cấp chức năng lặp. Giả sử chúng ta muốn hay thế một phần cụ thể mảng số với một số khác, một cách để thực hiện được việc này là sử dụng `replaceSubrange` với mảng khác:
```
array.replaceSubrange(2...7, with: [Int](repeating: 1, count: 6))
print(array)
// [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
```
Việc sử dụng` [Int](repeating:) ` kèm theo với nó là phải khởi tạo một mảng `buffer` ko làm gì. Nếu bạn chỉ cần chức năng lặp thì sử dụng `repeatElement` sẽ có hiệu suất tốt hơn.

```
array.replaceSubrange(2...7, with: repeatElement(1, count: 6))
```

### stride():
` stride()` là hàm được thêm vào Swift như một cách tạo vòng lập `for` để có thể bỏ qua các element nhất định:<br>
```
for (int i = 0; i < 10; i += 2) { ... }
```
Giờ chúng ta có thể sử dụng `stride` để đạt được mục đích như đoạn code trên:
```
for i in stride(from: 0, to: 10, by: 2) {
    // from 0 to 9, skipping odd numbers.
}
```

 Đây là cách chúng ta có thể thêm khái niệm "những ngày khác biệt" vào đối tượng Date để chúng ta có thể sử dụng `stride()`: (trên thực tế thì `Date()` đã cài đặt phương thức `Strideable`)
```
extension Date: Strideable {
    func advanced(by n: Int) -> Date {
        return Calendar.current.date(byAdding: .day,
                                     value: n,
                                     to: self)!
    }

    func distance(to other: Date) -> Int {
        return Calendar.current.dateComponents([.day],
                                               from: other,
                                               to: self).day!
    }
}

let startDate = Date()
let finalDate = startDate.advanced(by: 5)

for date in stride(from: startDate, to: finalDate, by: 1) {
    print(date)
}
// March 24th
// March 25th
// March 26th
// March 27th
// March 28th
```

Những hàm toàn cục khác như:<br>
    `max()`: Trả về giá trị lớn nhất của đối số.<br>
    `min()`: Trả về giá trị nhỏ nhất của đối số.<br>
    `abs()`: Trả về giá trị tuyệt đối của đối số.<br>
    
Reference: https://swiftrocks.com/useful-global-swift-functions