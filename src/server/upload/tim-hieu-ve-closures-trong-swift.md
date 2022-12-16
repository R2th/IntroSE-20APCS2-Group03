Closure, chắc hẳn là một khái niệm đã quá quen, nhưng còn @escaping, @non-escaping, @autoclosure? Liệu bạn đã hiểu rõ bản chất của nó cùng cách sử dụng chưa? Hãy cùng tìm hiểu sâu hơn về tất cả những khái niệm trên trong bài viết này nhé.

> Closures are self-contained blocks of functionality that can be passed around and used in your code.

Closures có thể capture và lưu trữ tham chiếu tới bất cứ constants và biến nào từ context mà nó được định nghĩa. Có thể hiểu closure là một function không có tên, và nó capture bất kỳ giá trị nào trong môi trường của nó. Function và closure là first-class object trong Swift, tức là ta có thể lưu trữ, truyền chúng như arguments trong function, và đối xử với chúng theo cách mà ta làm với những giá trị khác hay object khác. Truyền closure như completion handler là một phương thức phổ biến trong các API. Thư viện Standar Swift sử dụng closure phần lớn vào mục đích xử lý event và callbacks.

Trước khi tìm hiểu về closure, hãy cùng điểm qua các khái niệm của function đã nhé.

### Function là gì?
Functions là những đoạn code được đóng gói lại nhằm thực hiện một task cụ thể nào đó. Ta cần cung cấp tên function theo sát chức năng của nó, và sử dụng tên này để gọi function khi cần. Functions có thể không có param hoặc có nhiều param, và trả về nhiều param hoặc không trả gì.

```
func sumOf(_ a: Int, _ b: Int) -> Int {
    return a + b
}
```

### Function Types
Function type được tạo bởi param type và return type của function đó. Như trong ví dụ trên, thì function type của nó là (Int, Int) -> Int

Function type có thể được sử dụng như là param hoặc return type của một function, và nó được gán cho biến như sau:

`var mathFunction: (Int, Int) -> Int = sumOf`

Function là một trường hợp đặc biệt của closures. Closure xuất hiện dưới ba dạng sau:
- Global functions: Có tên và không thể capture giá trị
- Nested functions: Có tên và có thể capture giá trị từ function lồng ngoài đang chứa nó
- Closure expressions: Không có tên và có thể capture giá trị từ những nội dung quanh nó

### Closure Expression:
Closure được tạo ra bằng việc đặt một function type bên trong dấu ngoặc móc và từ khoá "in" phía sau return type:

```
{ (params) -> (returnType) in
    // Statement
}
```

Hãy cùng xem qua ví dụ sau:
```
// No parameter and return nothing
let sayHello: () -> Void = {
    print("Hello")
}

sayHello()

// Closure take one parameter and return 1 parameter
let value: (Int) -> Int = { (value1) in
    return value1
}
```

### Viết tắt tên của argument
Các argument của closure có thể được truy cập bằng cách gọi đến vị trí của chúng, ví dụ như $0, $1, $2...

```
let digitSquare: (Int) -> Int {
    print($0)
    return $0 * $0
}
```


### Return ngầm từ closure
Những closure chỉ có một câu lệnh đơn có thể trả kết quả theo kiểu ngầm mà không cần sử dụng từ khoá return.

```
let digitSquare: (Int) -> Int { $0 * $0 }
```

### Trailing closure
Nếu ta cần truyền closure expression khá dài như là param cuối cùng của một function, thì nó có thể được viết như một trailing closure. Trailing closure được viết ngay sau dấu ngoặc đơn của function dù rằng nó vẫn là một tham số của function. Khi sử dụng trailing closure, ta không khai báo tên cho tham số này.

Theo cách thông thường khi khai báo và sử dụng closure:
```
    func sumOf(a: Int, b: Int, onCompletion: (Int) -> Void) {
        let sum = a + b
        onCompletion(sum)
    }
    
    func test() {
        sumOf(a: 10, b: 23, onCompletion: { sum in
            print("Sum is: ", sum)
        })
    }
```

Sử dụng trailing closure khi closure là tham số cuối cùng của function:
```
    func sumOf(a: Int, b: Int, onCompletion: (Int) -> Void) {
        let sum = a + b
        onCompletion(sum)
    }
    
    func test() {
        sumOf(a: 10, b: 23) { sum in
            print("Sum is: ", sum)
        }
    }
```

### Capturing Values
Closure có thể lưu lại constant và variable từ bối cảnh xung quanh nơi mà nó được định nghĩa. Sau đó, closure này sẽ tham chiếu tới và thay đổi giá trị của constant và variable ngay bên trong closure, ngay cả khi phạm vi gốc định nghĩa những giá trị này đã được giải phóng. Ví dụ đơn giản nhất của việc capture value là function lồng, function này được viết ngay bên trong nội dung của một function khác. Function lồng có thể capture các tham số của function cha, và cả những constant, variable được định nghĩa bên trong function đó.

Hãy cũng xem qua ví dụ sau để hiểu rõ hơn:
```
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}
```

Để tối ưu hoá, Swift có thể capture và lưu lại một bản copy của giá trị nếu giá trị đó không bị thay đổi bởi closure, và nếu giá trị đó không bị thay đổi sau khi closure được tạo ra. Swift cũng xử lý tất cả việc quản lý bộ nhớ liên quan đến giải phóng các biến khi chúng không còn cần đến nữa.

Ngoài ra để đơn giản hoá những closure quá dài trong đối số của function, ta có thể sử dụng typealias.

### Non-escaping Closures
Các param của closure mặc định thoát khỏi closure ở các phiên bản trước Swift 3. Một closure sẽ không thoát khỏi nội dung của function nếu closure param được đánh dấu là non-escaping. Từ Swift 3, mọi thứ được đảo ngược. Khi ta truyền closure như một tham số của function, closure được thực thi với function body và trả về compiler. Khi việc thực thi kết thúc, closure được truyền vào sẽ thoát khỏi phạm vi của function và không còn tồn tại trong bộ nhớ.

Lưu ý:
> Closure param mặc định là non-escaping, sử dụng từ khoá @escaping với closure param để thoát khỏi thực thi của closure.

Non-escaping closure có vòng đời như sau:
- Truyền closure vào làm tham số của function
- Thực thi function và closure
- Function return


### Escaping Closures
Một closure được gọi là escape khỏi function khi closure này được truyền vào function làm tham số, nhưng được gọi đến sau khi function return. Việc đánh dấu closure với từ khoá @escaping sẽ báo cho ta biết ta cần phải tham chiếu tới self bên trong closure. Khi khai báo function với param có chứa một closure, ta có thể dùng @escaping trước param type để chỉ định rằng closure này được phép escape.

Để closure có thể escape ta có thể lưu nó bên trong một variable được định nghĩa bên ngoài function. Ví dụ, có nhiều function bắt đầu một operation bất đồng bộ có closure argument như một completion handler. Function này trả về sau khi nó bắt đầu operation, nhưng closure vẫn chưa được gọi đến cho đến khi operation được hoàn thành, vì vậy closure cần phải escape, để được gọi sau này. Hãy cùng xem ví dụ sau:

```
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}
```

Function someFunctionWithEscapingClosure() sử dụng một closure như tham số của nó và thêm nó vào một mảng được định nghĩa bên ngoài function. Nếu ta không dùng @escaping với param của function thì ta sẽ gặp phải lỗi từ compiler. 

Sử dụng @escaping với closure, ta phải tham chiếu tới self bên trong closure. Ví dụ, với đoạn code trên, closure truyền vào someFunctionWithEscapingClosure() là một escaping closure, nghĩa là nó cần phải tham chiếu tới self. Ngược lại, nếu closure non-escaping thì nó có thể hoặc không cần tham chiếu tới self.

```
func someFunctionWithNonescapingClosure(closure: () -> Void) {
    closure()
}

class SomeClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { self.x = 100 }
        someFunctionWithNonescapingClosure { x = 200 }
    }
}

let instance = SomeClass()
instance.doSomething()
print(instance.x)
// Prints "200"

completionHandlers.first?()
print(instance.x)
// Prints "100"
```

### Autoclosures
Thuộc tính @autoclosure cho phép ta định nghĩa một tham số mà nó tự động được bọc bên trong một closure. Nó không có bất cứ tham số nào, và khi được gọi tới, nó trả về giá trị của expression được bọc bên trong nó. Cú pháp tiện lợi này giúp ta có thể bỏ đi dấu ngoặc quanh function param bằng cách viết expression bình thường thay vì phải viết rõ closure ra.

Ví dụ, function assert(condition:message:file:line:) sử dụng một autoclosure cho câu lệnh điều kiện và tham số của message, tham số điều kiện của nó được thực thi chỉ ở chế độ build debug và tham số message được thực thi nếu điều kiện bị false.

```
func assert(_ expression: @autoclosure () -> Bool,
            _ message: @autoclosure () -> String) {}
```

Một autoclosure cho phép ta trì hoãn việc thực thi, bởi code bên trong closure sẽ không được chạy cho đến khi ta gọi closure. Việc này sẽ hữu ích đối với những đoạn code có tác dụng phụ hoặc tốn kém, bởi nó giúp ta quản lý được khi nào thì thực thi code. Hãy cùng xem ví dụ sau:

```
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
print(customersInLine.count)
// Prints "5"

let customerProvider = { customersInLine.remove(at: 0) }
print(customersInLine.count)
// Prints "5"

print("Now serving \(customerProvider())!")
// Prints "Now serving Chris!"
print(customersInLine.count)
// Prints "4"
```

Mặc dù thành phần đầu tiên của mảng customersInLine bị loại bỏ bởi đoạn code bên trong closure, nhưng nó vẫn không bị loại cho đến khi closure thực sự được gọi đến. Nếu closure không bao giờ được gọi, thì closure sẽ không bao giờ thực thi, nghĩa là phần tử của mảng cũng sẽ không bao giờ bị loại đi. Ngoài ra, type của customerProvider không phải là String mà là () -> String (một function không có param và trả về một String).

Ta cũng sẽ nhận được kết quả của trì hoãn thực thi như trên khi truyền closure làm param của một function.


```
// customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: { customersInLine.remove(at: 0) } )
// Prints "Now serving Alex!"
```

Function serve(customer:) ở trên nhận một explicit closure làm param và trả về tên của customer. Còn trong phiên bản dưới đây của serve(customer:) thì nó cũng thực thi cùng một nhiệm vụ, nhưng thay vì nhận param là explicit closure, nó nhận một autoclosure được đánh dấu bằng từ khoá @autoclosure. Nhờ vậy ta có thể gọi đến function với String argument thay vì sử dụng closure. Argument này sẽ tự động được chuyển đổi thành một closure nhờ nó là một thuộc tính @autoclosure.

```
// customersInLine is ["Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customersInLine.remove(at: 0))
// Prints "Now serving Ewa!"
```

Nếu bạn muốn một autoclosure cho phép escape, thì hãy sử dụng cả hai từ khoá @autoclosure và @escaping.