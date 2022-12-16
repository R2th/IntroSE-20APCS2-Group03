Link bài viết gốc: https://medium.com/codex/swift-upgrade-your-skills-with-these-8-tips-da612111668

## 1. Cách viết lệch If...else ngắn hơn với Ternary Operators
Ternary Operators cho phép chúng ta viết if...else ngắn hơn. Cấu trúc là: `condition ? true : false`. Hãy cùng xem ví dụ dưới đây:
``` swift
let money = 100
if money > 0 {
    print("Some money")
} else {
    print("No money")
}
```
Phần `if...else` có thể viết lại với 1 ternary operator với chỉ 1 dòng:
`money > 0 ? print("Some money") : print("No money")`
## 2. "Phá huỷ" cấu trúc Tuples
Triển khai function trả về kiểu tuples chứa tên và địa chỉ email:
``` swift
func getInfo() -> (name: String, email: String) {
    return (name: "Matt", email: "matt@example.com")
}
```
Khi truy cập tuple, bạn có thể giữ thông tin khác đi kèm bởi dãn nhãn như sau:
```
let info = getInfo()
print(info.name) // prints "Matt"
print(info.email) // prints "matt@example.com"
```
Nhưng bạn cũng có thể trích xuất `name` và `email` bởi "phá huỷ cấu trúc" tuple thành 2 biến tách tời như sau:
``` swift
let (name, email) = getInfo()
print(name) // prints "Matt"
print(email) // prints "matt@example.com"
```
Ngoài ra chúng ta có thể giải quyết v.đề của việc đổi 2 giá trị mà không cần giúp đến biến thứ 3
``` swift
var a = 1
var b = 2
(a, b) = (b, a) // Now b = 2 and a = 1
```
## Đọc 1 thuộc tính mà không thể thay đổi nó
Bạn có 1 structure dành cho nhà và chứa địa chỉ của nhà:
``` swift
struct House {
    var address: String
}
```

Bạn không muốn thay đổi địa chỉ của nhà nhưng bạn chỉ muốn cho phpes đọc nó. Giống như không có quyền truy cập thuộc tính `address`, bạn hiện có thể thay đổi nó ở bất cứ đâu trong code. ( Cài đặt addres `private` sẽ không giúp ích bởi nó khiến thuộc tính không thể đọc được.)
May mắn thay, Swift đem lại `public private(set)`. Cùng với kiểu này, bạn cho phép đọc thuộc tính address bên ngoài class và không cho phép thay đổi nó.
``` swift
struct House {
    public private(set) var address: String
}
```
## 4. Identity Operator
`==` không giống với `===`!
`==` nghĩa là kiểm tra 2 giá trị cùng kiểu `Equatable`, ví dụ:
```swift
"Test" == "Test" // true
2.0 == 1.0 + 1.0 // true
```
`===` là *Identity Operator*. Hãy cùng xem ví dụ bên dưới để hiểu thêm:
```swift
class Fruit {
    var name = "Banana"
}

let fruit1 = Fruit()
let fruit2 = fruit1
fruit1 === fruit2 // returns true
```

Trong Swift, đối tượng của lớp là tham chiếu tới cùng 1 địa chỉ. Đây là lý do chúng được gọi là kiểu tham chiếu trong Swift.
*Identity Operator* dùng để kiểm tra nếu 2 lớp giống hệt nhau và có cùng chung ô địa chỉ dữ liệu. ( `let fruit2 = fruit1` tạo 1 biến `fruit2` tức là có chung địa chỉ dữ liệu `fruit1`.)
Ngoài ra, nếu bạn khó khăn trong việc biết sự khác nhau giữa structure và class, hoặc bạn lần đầu nghe về kiểu tham chiếu, bạn có thể xem thêm tại đây [Structs vs Classes in Swift.](https://medium.com/codex/structs-vs-classes-in-swift-c37ef7e7d960)
## Kiểm tra Nils trong Optionals ngắn
Bạn có 1 biến optional tên `name`, và bạn muốn kiểm tra xem tên có khác `nil`.
Thông thường bạn sẽ kiểm tra như sau
```swift
var name: String?
if name != nil {
    print(name)
} else {
    print("N/A")
}
```

Nó hoạt động, nhưng có 1 cách ngắn hơn với cách sau:
```
print(name ?? "N/A")
```
Opterator `??` được gọi là "phương thức kiểm tra giá trị rỗng". Nó trả về giá trị ở bên trái nếu không nil, và khi nil thì trả về giá trị bên phải.
## 6. Giá trị mặt định cho thông số
Có 1 cách đơn giản để gán giá trị mặc định cho thông số:
```swift
func pick(fruit: String = "banana") {
    print("I just picked up \(fruit)s")
}
```
Bằng cách này bạn có thể gọi hàm pick mà không cần thông số, và nó sử dụng giá trị banana:
```
pick() // prints "I just picked up bananas"
```
Nhưng bạn cũng có thể chọn loại trái cây khác bằng cách thêm thông số:
```
pick(fruit: "apple") // prints "I just picked up apples"
```

## 7. Thuộc tính tính toán
Thuộc tính tính toán mà giá trị sẽ được tính toán cho tới khi truy xuất giá trị.
Ví dụ, bạn có thể dùng hàm để biến đổi kilo sang pound như sau:
```
var kilos = 100.0
func kilosToPounds() -> Double {
    return kilos * 2.205
}
```

Nhưng bạn cũng có thể tạo thuộc tính `pounds` để tính toán pound bắt cứ khi nào truy cập nó
```
var pounds: Double {
    get {
        return kilos * 2.205
    }
}
```
Đọc thêm về thuộc tính tính toán tại [Getters and Setters in Swift.](https://medium.com/codex/getters-and-setters-in-swift-79a46e9401a0)

## 8. Kiểm tra tất cả item trong 1 tập hợp với 1 cặp dấu ngoặc 
Phương thức `allSatisfy` của 1 tập hợp kiểm tra tất cả giá trị bên trong nó với 1 cặp dấu ngoặc
``` swift
let dailyTemperatures = [101, 105, 108, 110]
let reallyHot = dailyTemperatures.allSatisfy { $0 >= 100 }
print(reallyHot) // prints true
```