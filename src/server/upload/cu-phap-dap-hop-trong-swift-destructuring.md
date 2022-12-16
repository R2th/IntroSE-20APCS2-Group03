# Destructuring
Nếu bạn từng code **javascript**, hẳn bạn sẽ không còn lạ gì với cú pháp destructuring - một cú pháp rất thanh lịch để "đập hộp" và lấy giá trị ra khỏi **object**. Ngắn gọn, sạch đẹp, trông giống như này:
```javascript
let obj = { a: 1, b: 2 };
const { a, b } = obj;

console.log(a, b);
// 1 2
```

Trong **Swift** chúng ta cũng có một cú pháp tương tự, nhưng là sử dụng với **tuples**. Giả sử có 1 tuple như sau:
```swift
let data = ("one", "two", "three")
```
Nếu như bạn muốn lấy 3 giá trị trong tuple này để gán cho 3 biến theo cách thông thường thì chắc bạn sẽ viết gần giống thế này:
```swift
let one = data.0 
let two = data.1 
let three = data.2
```

Nhưng nếu sử dụng cú pháp destructuring, bạn chỉ cần viết:
```swift
let (one, two, three) = data
```

Ngắn gọn và cool ngầu hơn nhiều phải không?

Destructuring trong Swift thường được sử dụng với 3 mục đích chính: Lấy giá trị ra khỏi tuples, gán giá trị cho nhiều biến cùng lúc, và hoán đổi các giá trị với nhau.

### Lấy giá trị ra khỏi tuples
Trong ví dụ bên trên bạn đã thấy destructuring được sử dụng vì mục đích này rồi, nhưng kĩ thuật này sẽ đặc biệt có ích khi bạn làm việc với function mà **return nhiều giá trị cùng một lúc**. Ví dụ như hàm này:
```swift
func getPerson() -> (String, Int) { 
    return ("Taylor Swift", 26) 
}
```

Hàm trên trả về cả tên và tuổi. Thường thì bạn sẽ muốn gán 2 giá trị này vào 2 biến khác nhau để sử dụng cho linh hoạt. Nếu không sử dụng destructuring thì chúng ta lại phải gõ khá lê thê:
```swift
func getPerson() -> (String, Int) { 
    return ("Taylor Swift", 26) 
}

let person = getPerson()
let name = person.1
let age = person.2

print("\(name) is \(age) years old")
// Taylor Swift is 26 years old
```

Còn dùng destructuring thì chỉ cần:
```swift
let (name, age) = getPerson() 
print("\(name) is \(age) years old")
// Taylor Swift is 26 years old
```

Trường hợp bạn không cần sử dụng 1 giá trị nào đó, bạn có thể sử dụng kí hiệu _ để **bỏ qua giá trị đó**, giống như thế này:
```swift
let (_, age) = getPerson()
print("That person is \(age) years old")
// That person is 26 years old
```

### Gán giá trị cho nhiều biến cùng lúc
Tiếp theo, bạn có thể sử dụng kĩ thuật này để gán giá trị cho nhiều biến cùng lúc. Các giá trị này có thể là fix cứng, hoặc có thể là return value của 1 function nào đó:
```swift
let (captain, chef) = ("Janeway", "Neelix")
let (engineer, pilot) = (getEngineer(), getPilot())
```
Dùng kĩ thuật này với các giá trị có **liên quan chặt chẽ với nhau**, chẳng hạn như toạ độ trên bản đồ, sẽ rất có lợi cho việc đọc hiểu code.

### Hoán đổi các giá trị với nhau

Giả sử có 2 biến Int, a và b, giờ bạn làm thế nào để **hoán đổi giá trị** của 2 biến này với nhau mà **không sử dụng biến thứ 3?**

Trong hầu hết các ngôn ngữ chắc bạn sẽ làm thế này:
```swift
var a = 10 
var b = 20
a = a + b 
b = a - b 
a = a - b
print(a)
print(b)
// 20 10
```

Còn với Swift, bạn có thể dùng destructuring để làm thế này:
```swift
(b, a) = (a, b)
```

Vẫn chỉ cần một dòng duy nhất.

Như các bạn thấy, việc sử dụng cú pháp destructuring không chỉ giúp bạn tiết kiệm dòng code, mà còn giúp code của bạn dễ đọc, dễ hiểu và trông cool ngầu hơn nữa :sunglasses:.

Hi vọng bài viết của mình sẽ giúp các bạn có thêm 1 công cụ hữu ích khi code Swift  :grinning: