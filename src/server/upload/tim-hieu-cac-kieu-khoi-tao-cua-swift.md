Các kiểu khởi tạo trong Swift là câu hỏi quen thuộc trong buổi phỏng vấn. Khái niệm này tương đối dễ hiểu khi làm việc với Struct, nhưng sẽ gặp chút khó khăn khi hỏi các câu liên quan đến việc khởi tạo Class. Swift định nghĩa 2 cơ chế khởi tạo cho các Class là Designated Initializers và Convenience Initializers. Trong bài viết này, mình sẽ chia sẻ một số câu hỏi về nội dung này mà mình tìm hiểu được
## Sự khác biệt giữa Convenience Initializers và Designated Initializers

### Designated Initializers
Designated Initializers là cơ chế khởi tạo cơ bản nhất của Class. Cơ chế này sẽ gắn giá trị cho các thuộc tính lưu trữ được định nghĩa thêm trong Class và gọi tới một hàm khởi tạo thích hợp của Superclass (lớp cha) để hoàn thành việc khởi tạo.
```Swift
class Person {
    var name: String
    
    init(name: String) {
        self.name = name
    }
}

class Employee: Person {
    var employeeId: String
    
    init(name: String, id: String) {
        employeeId = id
        super.init(name: name)
    }
}
```
Thông thường, một Class sẽ có rất ít Designated Initializers, thường sẽ chỉ có một. 
### Convenience Initializers
Convenience Initializers sẽ không khởi tạo toàn bộ các thuộc tính lưu trữ của Class mà thay vào đó, nó sẽ dựa vào một hàm khởi tạo khai báo sẵn trong Class đó, và sử dụng một số giá trị mặc định làm tham số
```Swift
class Person {
    var name: String
    
    init(name: String) {
        self.name = name
    }
}

class Employee: Person {
    var employeeId: String
    var profile: String
    
    init(name: String, id: String, profile: String) {
        self.employeeId = id
        self.profile = profile
        super.init(name: name)
    }
    
    convenience init(name: String, id: String) {
        self.init(name: name, id: id, profile: "Engineering")
    }
}
```

## Vậy tại sao cần Convenience Initializers trong khi có thể sử dụng Designated Initializers ?
Convenience Initializers có thể dịch ra là các hàm khởi tạo "tiện lợi". Các hàm khởi tạo này được sử dụng như một trình khởi tạo phụ, sẽ được gọi trong trường hợp mà người viết không yêu cầu cung cấp tất cả giá trị ban đầu các thuộc tính của lớp đó tại thời điểm khởi tạo, mà thay vào đó là các giá trị mặc định.

## Swift có cung cấp Convenience Initializers và Designated Initializers cho Struct không ?
Struct không có tính kế thừa, do đó Swift không hỗ trợ 2 cơ chế khởi tạo này cho Struct. Khi khai báo Struct, chúng ta không bắt buộc phải khởi tạo giá trị mặc định hay tạo một hàm khởi tạo cho nó. Lý do là vì Swift cung cấp sẵn cho Struct một dạng khởi tạo là Memberwise Initializers (Sẽ đề cập rõ hơn bên dưới). Tuy nhiên, chúng ta vẫn có thể tự tạo hàm khởi tạo mới (khi này Swift sẽ xoá bỏ Memberwise Initializers), và gọi tới một hàm khởi tạo được khai báo sẵn trong Struct, tương tự như Convenience Initializers, nhưng khi này sẽ gọi là Delegating Initializers.


## Delegating Initializers là gì ?
Delegating Initializers là cách khởi tạo bằng việc gọi đến một hàm khởi tạo khác được khai báo trong Struct. Cơ chế này rất hiệu quả khi chúng muốn tạo ra nhiều hàm khởi tạo với các tham số khác nhau mà không muốn lặp lại quá nhiều logic. 
Ví dụ
```Swift
struct Rect {
    var origin = Point()
    var size = Size()
    init() {}
    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

## Đoạn code sau có thể chạy được không ?
```Swift
class Employee:Person {
    var employeeId: String
    var profile: String
    
    init(name: String, id:String, profile: String) {
        self.employeeId = id
        self.profile = profile
        super.init(name: name)
    }
    
    convenience init(name: String, id: String) {
        self.init(n: name)
    }
    
    convenience init(n: String) {
        self.name = n
        self.employeeId = "not assigned"
        self.profile = "Engineering"
    }
```

Câu trả lời là không vì Swift có quy định
> Rule 3
A convenience initializer must ultimately call a designated initializer.

Có thể dịch là một convenience initializer bắt buộc phải gọi tới một designated initializer. Có thể thấy  **convenience init(name: String, id: String)**  gọi tới **convenience init(n: String)**, nhưng convenience init(n:String) không trỏ tới một designated initializer nào. Do đó vi phạm và không thể biên dịch. Muốn đoạn code chạy được, chúng ta sẽ sửa như sau
```Swift
class Employee: Person {
    var employeeId:String
    var profile:String
    
    init(name:String, id:String, profile:String) {
        self.employeeId = id
        self.profile = profile
        super.init(name: name)
    }
    
    convenience init(name:String, id:String) {
        self.init(n: name)
    }
    
    convenience init(n:String){
        self.init(name: n, id: "not assigned", profile: "Engineering")
    }
}
```

## Giải thích cơ chế Initializer Delegation cho Class
![](https://images.viblo.asia/6b45c38b-fab0-4c46-83d5-f3feb9af0b5c.png)
- Convenience Initializers sẽ uỷ quyền qua các Class
Điều này có nghĩa là Convenience Initializers có thể gọi các hàm khởi tạo khác khai báo trong Class đó nhưng không thể gọi trực tiếp tới hàm khởi tạo của Superclass
- Designated Initializers sẽ uỷ quyền cho các lớp cha
Designated Initializers sẽ gọi đến hàm khởi tạo (chỉ Designated Initializers) của Superclass để hoàn thành việc gắn giá trị cho các  Stored Properties của lớp cha. Designated Initializers không thể gọi đến Convenience Initializers của Superclass

## Giải thích khái niệm Two-Phase Initialization của Swift
Swift Documentation có giải thích Two-Phase Initialization như sau

> Class initialization in Swift is a two-phase process. In the first phase, each stored property is assigned an initial value by the class that introduced it. Once the initial state for every stored property has been determined, the second phase begins, and each class is given the opportunity to customize its stored properties further before the new instance is considered ready for use.
 
 Có thể hiểu đơn giản như sau, trong quá trình khởi tạo, Swift yêu cầu chúng ta phải cung cấp giá trị khởi tạo cho các thuộc tính trước khi cho phép truy cập tới giá trị của các thuộc tính này hay thay đổi nó. Phase 2 thực hiện sau Phase 1 khi các thuộc tính đã được gắn giá trị, và trước khi Instance có thể được sử dụng
 ```Swift
 class Person {
    var name: String
    var age: Int
    
    // Designated Initializer
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

class Employee: Person {
    var employeeCode: String
    
    init(name: String, age: Int, employeeCode: String) {
        self.name = "Huy"   
        // Báo lỗi: 'self' used in property access 'name' before 'super.init' call
        super.init(name: name, age: age)
        self.employeeCode = employeeCode
    }
}
```
## Memberwise Initializers là gì ?
Struct tự định nghĩa một hàm khởi tạo gọi là Memberwise Initializers nếu chúng ta không định nghĩa bất kì một hàm khởi tạo nào khác. Trường hợp đã khai báo default value cho Properties, chúng ta có thể bỏ qua giá trị của các thuộc tính này trong Memberwise Initializers
```Swift
struct Size {
    var width = 0.0, height = 0.0
}
let twoByTwo = Size(width: 2.0, height: 2.0)

let zeroByTwo = Size(height: 2.0)
print(zeroByTwo.width, zeroByTwo.height)
// Prints "0.0 2.0"

let zeroByZero = Size()
print(zeroByZero.width, zeroByZero.height)
// Prints "0.0 0.0"
```

## Failable Initializers là gì ?
Trong một số trường hợp cụ thể, chúng ta muốn lồng một số điều kiện trong hàm khởi tạo, nếu không thoả mãn sẽ không trả về Instance, áp dụng với cả Struct, Class hay Enum. Khi đó sẽ sử dụng Failable Initializers
Ví dụ, chúng ta chỉ muốn khởi tạo một Instance của Employee với điều kiện age trong khoảng từ 18 đến nhỏ hơn 60
```Swift
class Employee: Prson {
    var employeeId: String
    var profile: String
    var age: Int
    
init?(name: String, id:String, profile: String, age: Int) {
    if !(age >= 18, age <= 60) {
        return nil
     }
    self.employeeId = id
    self.profile = profile
    self.age = age
    super.init(name: name)
}
```

## Required Initializers là gì ?
Là dạng khởi tạo bắt buộc. Khi superclass khai báo một Required Initializers, tất cả subclass của nó phải override lại hàm khởi tạo này
Ví dụ
![](https://images.viblo.asia/47ca923b-9eef-4abd-ac4f-ac7b8997f868.png)
Required Initializers dễ gặp khi muốn custom UIView và tự định nghĩa lại init của Custom View đó. Swift sẽ yêu cầu implement required init(coder: ). Hàm này được gọi khi view được sử dụng trong Interface Builder (Storyboards, XIBs)