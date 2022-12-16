### Giới thiệu

![](https://viblo.asia/uploads/c591b126-8581-4519-b8d7-f4c62b33fdd2.png)

Một trong những lưu ý thay đổi lớn nhất với các nhà phát triển khi chuyển từ Objective-C sang Swift đó là việc mở rộng của **Value types**(kiểu giá trị) và **Reference types** (kiểu tham chiếu) 
Vậy Value types  và Reference types là gì? Chúng khác nhau như thế nào?
Chúng ta hãy cùng tìm hiểu nhé!

### Reference Types

Các instance chia sẻ từ một bản copy của dữ liệu và type sử dụng được định nghĩa  như là **class**
Trong Objective-C và hầu hết các ngôn ngữ lập trình hướng đối tượng khác, bạn giữ tham chiếu đến đối tượng. 
Chúng ta quan sát ví dụ sau:
```Swift
// Reference Types:

class Dog {
  var wasFed = false
}
```
Chúng ta tạo một class **Dog**, sau đó tạo các instance cho Dog class:
```Swift
let dog = Dog()
```
Thêm một object khác để giữ reference tới cùng **dog**
```Swift
let puppy = dog
```
Ở đây **dog** và **puppy** trỏ vào cùng một địa chỉ ô nhớ.

![](https://viblo.asia/uploads/6d637eaa-2062-4db4-8d0a-481fb6e6beb2.png)

Set thức ăn cho vật nuôi bằng cách:
```Swift
puppy.wasFed = true
```
Và sau đây là kết quả:
```Swift
dog.wasFed     // true
puppy.wasFed   // true
```

Việc thay đổi trong một instance sẽ ảnh hưởng tới những cái khác khi chúng reference chung một object.

### Value Types

Mỗi instance giữ một bản copy duy nhất của dữ liệu, thường định nghĩa như: **struct**, **enum** hoặc **tuple**
Chúng ta quan sát ví dụ sau:

```Swift
// Value Types:

var a = 42
var b = a
b+=1

a    // 42
b    // 43
```

Ở đây bạn có thể thấy giá trị của **a** và **b** là không giống nhau.
Nếu bạn khai báo chúng là kiểu reference types thì cả **a** và **b**  sẽ cùng là 43 vì chúng cùng trỏ chung vùng địa chỉ ô nhớ.

Tương tự với Cat struct:

```Swift
struct Cat {
  var wasFed = false
}

var cat = Cat()
var kitty = cat
kitty.wasFed = true

cat.wasFed        // false
kitty.wasFed      // true
```

![](https://viblo.asia/uploads/13c03e36-d0e8-4157-a78d-e19d24936b72.png)

### Mutability (tính thay đổi)

**var** và **let** có chức năng khác nhau với reference types và value types

* Với reference types, let nghĩa là **reference** không thay đổi. Hiểu cách khác là bạn không thể thay đổi references của instance nhưng bạn có thể thay đổi bản thân instance đó.
* Với value types, let nghĩa là **instance** không thay đổi. Không thuộc tính của instance có thể thay đổi được, bất kể nó được khai báo là let hoặc var.
=> Dễ dàng control sự thay đổi với value types hơn.

### Which to Use and When (sử dụng ở đâu và khi nào)

Bây giờ bạn đã biết sự khác nhau giữa hai loại, vậy khi nào bạn nên sử dụng chúng?

#### When to Use a Value Type

Chúng ta sử dụng value types trong những trường hợp sau:
* So sánh **instance data** với "==" 

```Swift
struct Point: CustomStringConvertible {
  var x: Float
  var y: Float

  var description: String {
    return "{x: \(x), y: \(y)}"
  }
}
```

```Swift
let point1 = Point(x: 2, y: 3)
let point2 = Point(x: 2, y: 3)
```

Dưới đây ví dụ thực hiện so sánh "=="
```Swift
extension Point: Equatable { }
func ==(lhs: Point, rhs: Point) -> Bool {
  return lhs.x == rhs.x && lhs.y == rhs.y
}
```

* Bạn muốn bản sao có trạng thái độc lập
```Swift
struct Shape {
  var center: Point
}

let initialPoint = Point(x: 0, y: 0)
let circle = Shape(center: initialPoint)
var square = Shape(center: initialPoint)
```

* Dữ liệu sẽ được sử dụng trong code trên nhiều threads
Việc đảm bảo dữ liệu của bạn có thể truy cập trên nhiều threads và equal trên các threads, bạn có thể sử dụng reference type và thực hiện **locking**(không hề đơn giản)
Nếu mỗi thread có thể sở hữu dữ liệu riêng  thì sử dụng value types sẽ giảm sự tranh luận vì mỗi chủ của dữ liệu sở hữu bản sao duy nhất chứ k phải dùng chung.

#### When to Use a Reference Type

* So sánh **instance identity** với "===" 
* Bạn muốn tạo trạng thái chia sẻ, có thể thay đổi.

Đôi khi bạn muốn một phần dữ liệu được lưu trữ như là một instance và được truy cập và biến đổi bởi nhiều người tiêu dùng.
Một đối tượng thông thường với trạng thái chia sẻ, có thể thay đổi là một tài khoản ngân hàng được chia sẻ. Bạn có thể thực hiện một đại diện cơ bản của một tài khoản và người như sau:

```Swift
class Account {
  var balance = 0.0
}

class Person {
  let account: Account
  init(_ account: Account) {
    self.account = account
  }
}
```


```Swift
let account = Account()

let person1 = Person(account)
let person2 = Person(account)

person2.account.balance += 100.0

person1.account.balance    // 100
person2.account.balance    // 100
```

### Kết Luận

 Trong bài viết này chúng ta đã tìm hiểu về khái niệm của từng types trong Swift và sự khác nhau giữa chúng. 
Trong phần tiếp theo, chúng ta sẽ cùng đi tìm hiểu sâu hơn về từng loại, cũng như sử dụng chúng trong các project thực tế như thế nào.
Cám ơn bạn đã dành thời gian cho bài viết! :)

##### _Nguồn:_

[https://www.raywenderlich.com/112027/reference-value-types-in-swift-part-1](https://www.raywenderlich.com/112027/reference-value-types-in-swift-part-1)
[https://developer.apple.com/swift/blog/?id=10](https://developer.apple.com/swift/blog/?id=10)