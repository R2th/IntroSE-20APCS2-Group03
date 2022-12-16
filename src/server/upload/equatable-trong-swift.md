#  Equatable
Các giá trị tuân theo protocol `Equatable` có thể được đánh giá về sự bằng nhau hoặc không bằng nhau. Sự phù hợp với `Equatable` yêu cầu triển khai toán tử bằng nhau (==).

Ví dụ, hãy xem xét struct Binomen sau:

```Swift
struct Binomen {
    let genus: String
    let species: String
}

let 🐺 = Binomen(genus: "Canis", species: "lupus")
let 🐻 = Binomen(genus: "Ursus", species: "arctos")
```
Chúng ta có thể cho value phù hợp với `Equatable` thông qua một phần extension, implement method cho toán tử `==` như sau:

```Swift
extension Binomen: Equatable {
    static func == (lhs: Binomen, rhs: Binomen) -> Bool {
        return lhs.genus == rhs.genus &&
                lhs.species == rhs.species
    }
}

🐺 == 🐺 // true
🐺 == 🐻 // false
```
Thật dễ dàng, phải không?

Thực ra, nó thậm chí còn dễ dàng hơn thế - kể từ Swift 4.1, trình biên dịch có thể tự động tổng hợp sự phù hợp cho các struct mà các thuộc tính được lưu trữ của chúng đều có các kiểu là `Equatable`. Chúng ta có thể thay thế tất cả mã trong extension bằng cách chỉ cần sử dụng `Equatable` trong khai báo Binomen:
```Swift
struct Binomen: Equatable {
    let genus: String
    let species: String
}

🐺 == 🐺 // true
🐺 == 🐻 // false
```
# Lợi ích của Equatable 
Equatability không chỉ sử dụng toán tử `==` mà còn có thể coi nó là một value, như việc nó được tìm thấy trong một tập hợp và được so khớp trong một câu lệnh switch.
```Swift
[🐺, 🐻].contains(🐻) // true

func commonName(for binomen: Binomen) -> String? {
    switch binomen {
    case 🐺: return "gray wolf"
    case 🐻: return "brown bear"
    default: return nil
    }
}
commonName(for: 🐺) // "gray wolf"
```
`Equatable` cũng là một yêu cầu để tuân thủ `Hashable`, một kiểu quan trọng khác trong Swift.

Tất cả điều này để nói rằng nếu một kiểu có ngữ nghĩa tương đương - nếu hai giá trị của kiểu đó có thể được coi là bằng nhau hoặc không bằng nhau - thì nó phải tuân theo `Equatable`.
# Giới hạn của Automatic Synthesis
Thư viện tiêu chuẩn Swift và hầu hết các framework trong Apple SDK đều làm rất tốt việc áp dụng `Equatable` cho các type có ý nghĩa. Trên thực tế, bạn khó có thể gặp phải tình huống mà automatic synthesis không hoạt động.

Thay vào đó, trở ngại phổ biến nhất đối với tổng hợp tự động liên quan đến các bộ giá trị. Hãy xem xét loại Trinomen này:
```Swift
struct Trinomen {
    let genus: String
    let species: (String, subspecies: String?) // 🤔
}

extension Trinomen: Equatable {}
// 🛑 Type 'Trinomen' does not conform to protocol 'Equatable'
```
các tuple không phải là nominal type, vì vậy chúng không thể phù hợp với Equatable. Nếu bạn muốn so sánh hai trinomina cho bằng nhau, bạn phải viết mã tuân thủ cho Equatable.
# Conditional Conformance to Equality
Ngoài tính năng automatic synthesis của `Equatable`, Swift 4.1 còn bổ sung một tính năng quan trọng khác: conditional conformance.

Để minh họa điều này, hãy xem xét type chung sau đại diện cho một số lượng của một cái gì đó:
```Swift
struct Quantity<Thing> {
    let count: Int
    let thing: Thing
}
```
`Quantity` có thể conform theo `Equatable` không? Chúng ta biết rằng các số nguyên là tương đương, vì vậy nó thực sự phụ thuộc vào `Thing` mà chúng ta đang nói đến.

Conditional conformance mà Swift 4.1 cho phép chúng ta thực hiện là tạo một phần extension trên một kiểu có mệnh đề điều kiện. Chúng ta có thể sử dụng điều đó ở đây để diễn đạt theo chương trình rằng _ “một số lượng của một sự vật là tương đương nếu bản thân sự vật đó là tương đương”:
```Swift
extension Quantity: Equatable where Thing: Equatable {}
```
Và chỉ với tuyên bố đó, Swift có mọi thứ cần thiết để tổng hợp sự phù hợp có điều kiện của Equatable, cho phép chúng tôi thực hiện những việc sau:
```Swift
let oneHen = Quantity<Character>(count: 1, thing: "🐔")
let twoDucks = Quantity<Character>(count: 2, thing: "🦆")
oneHen == twoDucks // false
```
Cũng có thể áp dụng cho Array nếu phần tử trong Array đó conform theo `Equatable`
```Swift
[🐺, 🐻] == [🐺, 🐻] // true
```
# Equality by Reference
Đối với các loại tham chiếu, khái niệm bình đẳng trở nên đồng nhất với identity. Có nghĩa là hai struct Name có cùng giá trị sẽ bằng nhau, nhưng hai Object Person có thể có cùng tên và vẫn là những người khác nhau.

Đối với các loại đối tượng tương thích với Objective-C, toán tử `==` đã được cung cấp từ phương thức isEqual:
```Swift
import Foundation

class ObjCObject: NSObject {}

ObjCObject() == ObjCObject() // false
```
Đối với các kiểu tham chiếu Swift (nghĩa là các lớp), sự bình đẳng có thể được đánh giá bằng cách sử dụng identity equality operator (===):
```Swift
class Object: Equatable {
    static func == (lhs: Object, rhs: Object) -> Bool {
        return lhs === rhs
    }
}

Object() == Object() // false
```

Điều đó nói rằng, ngữ nghĩa tương đương cho các loại tham chiếu thường không đơn giản như kiểm tra identity equality, vì vậy trước khi bạn thêm `Equatable` vào tất cả các lớp của mình, hãy tự hỏi liệu làm như vậy có thực sự hợp lý hay không.

Bài viết đến đây là hết. Nguồn: https://nshipster.com/equatable-and-comparable/#the-limits-of-automatic-synthesis