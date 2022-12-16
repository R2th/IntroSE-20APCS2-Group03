Trong lập trình, việc kiểm tra giá trị cho khớp với một biến hoặc hằng số nào đó, thì ta nghĩ ngay đến câu lệnh **if ... else**. Rất đơn giản vì câu lệnh này quá đổi quen thuộc và rất hay thường xuyên được xử dụng trong mọi ứng dụng. <br><br>
Ví dụ nhỏ về **if ...  else** <br>
```
if user.isLoggedIn {
    showMainUI()
} else if let credentials = user.savedCredentials {
    performLogin(with: credentials)
} else {
    showLoginUI()
}
```
Nhưng khi có khá nhiều giá trị để so khớp thì việc dùng **if ... else** sẽ rất cồng kềnh, rườm ra và khiến cho code khó đọc, khó gỡ lỗi hơn. Chính vì thế nên nghĩ ngay đến **switch case** nó sẽ giải quyết được các vấn đề trên.

```
switch user.loginState {
case .loggedIn:
    showMainUI()
case .loggedOutWithSavedCredentials(let credentials):
    performLogin(with: credentials)
case .loggedOut:
    showLoginUI()
}
```
### Cấu trúc switch case
**1. switch**: Xét và so sánh giá trị xem nó match với case nào

**2. case**: Là một trường hợp để so sánh giá trị trong switch. Có thể là 1 giá trị hoặc nhiều giá trị.
```
let number = 0
switch number {
case 0:
    print("number: 0") // In ra number: 0
case 1:
    print("number: 1")
case 2:
    print("number: 2")
default:
    print("default number") // In ra: default number
}
```

**or**

```
let number = 4
switch number {
case 0...10:
    print("number in 0...10") // In ra number in 0...10
case 11...20:
    print("number in 11...20")
case 21...30:
    print("number in 21...30")
default:
    print("default number")
}
```

**3. default**: Nếu không match với bất kỳ case nào thì sẽ thực hiện khối lệnh trong default
```
let number = 10
switch number {
case 0:
    print("number: 0")
case 1:
    print("number: 1")
case 2:
    print("number: 2")
default:
    print("default number") // In ra: default number
}
```

**4. falthrough**: Cho phép tiếp tục thực hiện 1 case liền kề.
```
let number = 0
switch number {
case 0:
    print("number: 0") // In ra: number:0
    fallthrough
case 1:
    print("number: 1") // In ra: number:1
case 2:
    print("number: 2") // Không có được in ra
default:
    print("default number") // Không có được in ra
}
```
**Lưu ý:** Không cần dùng **break** để thoát khỏi khối lệnh case. Nó sẽ tự động thoát cho bạn.<br><br>
Trên đây là nhưng kiến thức cơ bản về **switch statement**. Bây jo chúng ta cùng tìm hiểu thêm vài điều thú vị về nó nữa nhé.
### Tuples
Bạn có thể sử dụng tuples để kiểm tra nhiều giá trị trong cùng một switch statement. Mỗi phần tử của bộ tuple có thể được kiểm tra dựa trên giá trị hoặc khoảng thời gian khác nhau của giá trị. Ngoài ra, có thể sử dụng ký tự gạch dưới (_) (mẫu ký tự đại diện) để khớp với mọi giá trị có thể có.

```
let somePoint = (1, 1)
switch somePoint {
case (0, 0):
    print("\(somePoint) is at the origin")
case (_, 0):
    print("\(somePoint) is on the x-axis")
case (0, _):
    print("\(somePoint) is on the y-axis")
case (-2...2, -2...2):
    print("\(somePoint) is inside the box")
default:
    print("\(somePoint) is outside of the box")
}
```
> **Result:** *(1, 1) is inside the box*
> <br>Nếu somPoint = (0, 1) thì result là *(0, 1) is on the y-axis*

### Value Bindings
Một switch case có thể đặt tên cho giá trị hoặc giá trí match với hằng số hoặc biến tạm. Hành vi này được gọi là value binding, vì các giá trị được gắn kết với các hằng số tạm thời hoặc các biến trong case’s body.
```
let point = (556, 0)
switch point {
case (let x, 0):
    print("X was \(x)")
case (0, let y):
    print("Y was \(y)")
case let (x, y):
    print("X was \(x) and Y was \(y)")
}
```
> **Result:** *X was 556*
> 
### Where
switch case có thể sử dụng mệnh đề where để check thêm điều kiện bổ sung.
```
let point = (1, 1)
switch point {
case let (x, y) where x == y:
    print("x = y : \(x) == \(y)")
case let (x, y) where x == -y:
    print("x = -y : \(x) = -\(y)")
case let (x, y):
    print("\(x),\(y)")
}
```
> **Result:** *x = y : 1 == 1*
> 
### Compound Cases
Có thể combine nhiều case lại với nhau khi chúng cùng thực hiện chung một statement, khi đó các patterns sẽ phân cách nhau bằng dấu phẩy ","
```
let someCharacter: Character = "e"
switch someCharacter {
case "a", "e", "i", "o", "u":
    print("\(someCharacter) is a vowel")
case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
     "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
    print("\(someCharacter) is a consonant")
default:
    print("\(someCharacter) is not a vowel or a consonant")
}
```
### Set
```
enum Days : String {
    case Monday
    case Tuesday
    case Wednesday
    case Thursday
    case Friday
    case Saturday
    case Sunday
}

let days: Set<Days> = [.Saturday, .Sunday]

switch days {
case [.Monday, .Tuesday, .Wednesday, .Thursday, .Friday]:
    print("Tat ca cac ngay trong tuan")
case [.Saturday, .Sunday]:
    print("2 ngay cuoi tuan")
default:
    for day in days {
        print(day.rawValue)
    }
}
```
> **Result:** *2 ngay cuoi tuan*
> 
Cấu lệnh switch case ở trên tương ứng vời if...else sau:
```
if days.contains(.Monday) && days.contains(.Tuesday) && days.contains(.Wednesday)
    && days.contains(.Thursday) && days.contains(.Friday) {
    print("Tat ca cac ngay trong tuan")
} else if days.contains(.Saturday) && days.contains(.Sunday) {
    print("2 ngay cuoi tuan")
} else {
    for day in days {
        print(day.rawValue)
    }
}
```
### Kết:
Trên đây là hầu hết các trường hợp mà chúng ta có thê tận dụng sức mạnh của Switch statements để giúp cho code của cũng ta gọn gàng, clear hơn rất nhiều. Thanks.