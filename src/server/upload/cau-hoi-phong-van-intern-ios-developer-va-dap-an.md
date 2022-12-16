Mỗi iOS developer đều có những kiến thức đặc thù và kinh nghiệm của riêng mình thông qua các dự án. Tuy nhiên, bạn thực sự hiểu về Swift đến mức nào? Trong bài viết này, sẽ giúp bạn biết thêm về những câu hỏi phỏng vấn Swift mẫu.
Bạn có thể sử dụng những câu hỏi này để phỏng vấn ứng cử viên. Hoặc có thể tự kiểm tra bản thân, và đừng lo lắng nếu bạn không trả lời được, vì mỗi câu hỏi đều có những cách giải quyết riêng của nó :D 

Thông thường người ta chia thành 3 mức:
* Beginer: Thoải mái với người mới làm quen Swift. Bạn đã từng đọc 1 hoặc 2 quyển sách, và sử dụng Swift trong ứng dụng của chính bạn.
* Intermediate: Dành cho những người đã từng làm việc với Swift những dự án thực tế và tìm hiểu sâu về chúng.
* Advanced: Những ai đã có nhiều kinh nghiệm phát triển - thực sự hiểu và sử dụng các kỹ thuật tiên tiến

Mỗi mức, bạn sẽ có 2 loại câu hỏi:
* Câu hỏi viết: Các bài kiểm tra lập trình qua email, liên quan đến viết mã.
* Câu hỏi nói: Phỏng vấn trực tiếp hoặc qua điện thoại

# Câu hỏi cơ bản:
## Question 1:
Đọc đoạn code dưới đây
``` swift
struct Tutorial {
  var difficulty: Int = 1
}

var tutorial1 = Tutorial()
var tutorial2 = tutorial1
tutorial2.difficulty = 2

```
Giá trị của **tutorial.difficulty** và **tutorial2.difficulty** là gì? Nếu **Tutorial** là kiểu class, có điều gì khác biệt? Tại sao và tại sao không?
Đáp án:
Câu trả lời: **tutorial.difficulty** là 1 và **tutorial2.difficulty** là 2. Struct trong Swift là kiểu giá trị. Bởi bạn sao chép giá trị của biến thay vì tham chiếu. Đoạn code đã tạo 1 bản copy của tutorial 1 và gán nó cho tutorial 2. 
``` swift
var tutorial2 = tutorial1
```
Thay đỗi tutorial2 không ảnh hưởng tới tutorial1
Nếu Tutorial là kiểu class, cả 2 biến tutorial sẽ đều có giá trị là 2. Bởi Class trong Swift là kiểu tham chiếu. Khi bạn thay đổi biến tutorial 1, nó sẽ tham chiếu tới tutorial 2 và thay đổi nó.

## Question 2:
Bạn khai bảo view1 với var, và sau đó khai báo view2 với let, điều gì khác biệt ở đây với dòng cuối cùng?

``` swift
import UIKit

var view1 = UIView()
view1.alpha = 0.5

let view2 = UIView()
view2.alpha = 0.5 // Will this line compile?
```

Đáp án:
Dòng lệnh cuối cùng sẽ được chạy, view1 là kiểu variable, và bạn có thể thành đối tượng của UIView. Với let, bạn có thể gán giá trị 1 lần cho nó, vì vậy được code dưới sẽ không thực thi được
``` swift
view2 = view1 // Error: view2 is immutable
```
Tuy nhiên, UIView là kiểu lớp tham chiếu, vì thế bạn có thể thay đổi thuộc tính của view2 - điều đó có nghĩa dòng lệnh cuối cùng sẽ được thực thi:
``` swift
let view2 = UIView()
view2.alpha = 0.5 // Yes!
```

## Question 3
Đoạn code dưới sẽ sắp xếp tên theo bảng alphabe. Đoạn closure đơn gảin mà bạn cần
``` swift
var animals = ["fish", "cat", "chicken", "dog"]
animals.sort { (one: String, two: String) -> Bool in
    return one < two
}
print(animals)
```
Đáp án: 
Giá trị tham chiếu sẽ được hệ thống tự động tính toán, và trả về kiểu giá trị tương ứng, bạn có thể viết ngắn hơn như là:
```swift 
animals.sort { (one, two) in return one < two }
```

Bạn có thể thay thế $i cho tên của paramter:
```swift 
animals.sort { return $0 < $1 }
```
Trong kiểu closure đơn, bạn có thể bỏ qua từ khoá return. Giá trị của câu lệnh sẽ trở thành dữ liệu của closure:
```swift 
animals.sort { $0 < $1 }
```
Cuối cùng, khi Swift biết có thành phần từ mảng, thuộc kiểu Equatable, bạn có thể viết đơn giản là:
```swift 
animals.sort { < }
```

## Question 4
Đây là một hàm toàn cục đếm số lượng giá trị duy nhất trong một mảng:
``` swift
func countUniques<T: Comparable>(_ array: Array<T>) -> Int {
  let sorted = array.sorted()
  let initial: (T?, Int) = (.none, 0)
  let reduced = sorted.reduce(initial) {
    ($1, $0.0 == $1 ? $0.1 : $0.1 + 1)
  }
  return reduced.1
}
```
Nó sử dụng sorted, sử dụng kiểu biến T, thoá mãn Comparable.
Bạn có thể gọi nó như sau:
``` swift
countUniques([1, 2, 3, 3]) // result is 3
```
Có thể viết lại function như extension cho Array, để bạn có thể viết như sau:
``` swift
[1, 2, 3, 3].countUniques() // should print 3
```
Đáp án:
Bạn có thể viết lại countUniques( _ : ) như mở rộng của Array:
``` swift
extension Array where Element: Comparable {
  func countUniques() -> Int {
    let sortedValues = sorted()
    let initial: (Element?, Int) = (.none, 0)
    let reduced = sortedValues.reduce(initial) { 
      ($1, $0.0 == $1 ? $0.1 : $0.1 + 1) 
    }
    return reduced.1
  }
}
```
Giờ hàm đã có thể sử dụng với bất cứ kiểu generic Element thoả mãn Comparable.

## Question 5
Đây là một chức năng để chia hai nhân đôi tùy chọn. Có ba điều kiện tiên quyết để xác minh trước khi thực hiện phân chia thực tế:

* Cổ tức phải chứa một giá trị khác không.
* Số chia phải chứa một giá trị khác không.
* Số chia không được bằng 0.
``` swift
func divide(_ dividend: Double?, by divisor: Double?) -> Double? {
  if dividend == nil {
    return nil
  }
  if divisor == nil {
    return nil
  }
  if divisor == 0 {
    return nil
  }
  return dividend! / divisor!
}
```
Cái thiện function trên với việc sử dụng câu lệnh guard và không sử dụng fored unwarpping.

Đáp án:
Câu lệnh guard được giới thiệu trong Swift 2.0 cung cấp một lối thoát khi một điều kiện không được đáp ứng. Nó rất hữu ích khi kiểm tra các điều kiện tiên quyết vì nó cho phép bạn diễn đạt chúng một cách rõ ràng - không có các câu lệnh if lồng nhau. Đây là một ví dụ:
``` swift
guard dividend != nil else { return nil }
```

Bạn cũng có thể sử dụng statement cho optional binding, nó sẽ truy cập dữ liệu sau khi vượt qua câu lệnh guard:
``` swift
guard let dividend = dividend else { return .none }
```

Vì thế bạn có thể viết lại funtion divide như sau:
``` swift
func divide(_ dividend: Double?, by divisor: Double?) -> Double? {
  guard let dividend = dividend else { return nil }
  guard let divisor = divisor else { return nil }
  guard divisor != 0 else { return nil }
  return dividend / divisor
}
```

Lưu ý sự vắng mặt của các toán tử không được gói ngầm trên dòng cuối cùng vì bạn đã bỏ gói cả số bị chia và số chia và lưu trữ chúng trong các biến bất biến không tùy chọn.
Lưu ý rằng kết quả của các tùy chọn chưa được bao bọc trong một câu lệnh bảo vệ có sẵn cho phần còn lại của khối mã mà câu lệnh xuất hiện trong đó.
Bạn có thể đơn giản hóa điều này hơn nữa bằng cách nhóm các câu lệnh bảo vệ:
``` swift
func divide(_ dividend: Double?, by divisor: Double?) -> Double? {
  guard 
    let dividend = dividend,
    let divisor = divisor,
    divisor != 0 
    else { 
      return nil 
    }
  return dividend / divisor
}
```

Nguồn bài viết: https://www.raywenderlich.com/762435-swift-interview-questions-and-answers