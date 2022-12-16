*Opaque types* là một tính năng quan trọng của Swift. Với từ khoá `some` - biểu thị một *opaque type*, bạn có thể ẩn return type cụ thể của một property hoặc một function. Và như vậy bạn có thể viết code một cách linh hoạt, súc tích.

Trong bài viết này chúng ta thảo luận về việc *opaque type* làm việc như thế nào. Và chúng ta sẽ hiểu được gì sau bài viết này:
* Làm sao để sử dụng keyword `some`.
* *Opaque type* là gì và tại sao chúng ta cần nó.
* *Opaque type* ảnh hưởng như thế nào đến SwiftUI và iOS development.
* 3 lợi thế của keyword `some`.
* Protocol với opaque type và *associated type*
# Nó là `Some` thing
Một trong những tính năng mới của Swift 5.1 là `some` keyword. Bạn có thể nhìn thấy nó lần đầu trong template SwiftUI View, giống như thế này:
```Swift
struct MyFirstView: View {
    var body: some View {
        Text("Hello world!")
    }
}
```
Bạn có thấy keyword `some` trong đó, ngay bên phải type `View`. Chính nó.

Một chút magic phía sau `some` keyword. Chúng ta sẽ tìm hiểu kỹ về nó, tìm hiểu những vấn đề mà nó giải quyết. Và tại sao nó hữu dụng trong việc iOS development.

`Some` keyword chỉ ra nó là một value. Như computed property `body` là một *opaque type*. Chúng ta che giấu thông tin type ("opaque") từ code bằng cách dùng `MyFirstView`.

Việc *implementation* của property `body` sẽ quyết định type cụ thể của property `body`. Type này sẽ không đc lộ ra từ code bằng cách sử dụng `MyFirstView`
# Opaque Types và Generics
*Opaque types* và *generics* có liên quan tới nhau. Thật sự thì opaque type được mô tả như là một *revese generic type*.
* Với generic type, người gọi sẽ quyết định type cụ thể của nó.
* Với opaque type, việc *implementation* sẽ quyết định type cụ thể của nó.

Bạn còn nhớ [Generics](https://viblo.asia/p/generics-trong-swift-bJzKmqbDK9N) chứ? Generic cho phép bạn define một placeholder type và các ràng buộc, nên nó là một function có thể chấp nhận type khác nhau. Ví dụ:
```Swift
func addition<T: Numeric>(a: T, b: T) -> T {
    return a + b
}

// Adding two integers
let resultA = addition(a: 42, b: 99)

// Adding two doubles
let resultB = addition(a: 3.1415, b: 1.618)
```
Trong đoạn code phía trên, chúng ta sử dụng generic placeholder `T`. Khi parameter `a` và `b` cùng một type `T`, thì function return một value của tyep `T`, với điều kiện type `T` tuân theo `Numeric` protocol. Kết quả là, chúng ta có thể dùng function này để cộng interger, double, ...

Phải hiểu 2 điều quan trọng sau đây:
* Type của placeholder `T` thực sự là một *placeholder*. Khi code được compile, Swift sẽ thay thế nó với `concrete types` như `Int`, `Double`. Khi bạn thử kiểm tra type của `a` hoặc `b` lúc runtime, bạn sẽ thấy rằng nó sẽ có `concrete type` tức là `Int`, `Double`, ....
* Người gọi hàm `addition(a:b:)` sẽ quyết định concrete type của placeholder `T`. Nó nói với function: *"Bây giờ bạn hãy sử dụng integer"*. Bạn có thể nói placeholder là rõ ràng, bởi vì người gọi biết `T` có type gì.

Hãy so sánh nó với *opaque type*. Hãy xem ví dụ dưới đây. Đầu tiên, ta define một protocol `Shape` và 2 shape phù hợp với protocol.
```Swift
protocol Shape {
    func describe() -> String
}

struct Square: Shape {
    func describe() -> String {
        return "I'm a square. My four sides have the same lengths."
    }
}

struct Circle: Shape {
    func describe() -> String {
        return "I'm a circle. I look like a perfectly round apple pie."
    }
}
```
Sau đó, chúng ta define một function `makeShape()` giống như thế này:
```Swift
func makeShape() -> some Shape {
    return Circle()
}
```
Hàm `makeShape()` return một value của tupe `Shape`. Nó sử dụng `some` keyword nên chứng tỏ nó sử dụng *opaque type*. Function sẽ tự quyết định concrete type sẽ được return. Trong code phía trên, chúng ta return một value của type `Circle`.
```Swfit
let shape = makeShape()
print(shape.describe())
// Output: I'm a circle. I look like a perfectly round apple pie.
```
Trong đoạn code phía trên, chúng ta đơn giản chỉ cần gọi `makeShpare()` function và in ra kết quả của `describe()` function. Và kết quả đúng như những gì ta mong đợi.

Lúc này, bạn tự hỏi tại sao chúng ta không chỉ sử dụng một protocol? Nếu bạn thử bỏ `some` keyword, đoạn code phía trên vẫn chạy rất tốt. Vậy tại sao lại cần `some`?
*Opaque types* và *protocol types* có sự khác biệt quan trọng: *opaque type* sẽ giữ lại *type identity* còn *protocol type* thì không.
* Một opaque type luôn refer đến một type cụ thể, concrete type - bạn chỉ không biết nó là cái nào.
* Một protocol thì có thể refer đến nhiều type, chỉ cần nó phù hợp với protocol.

Nói cách khác, một protocol type cho bạn sự linh hoạt hơn về type nó return. Còn một opaque type cho bạn sự nghiêm ngặt về type nó return. Chúng ta sẽ quay lại với protocol type và opaque type sau.
# Protocol Types & Associated Types
Protocol có thể có *associated types*. Một associated type có một placeholder name - nó sẽ giữ một type được sử dụng trong protocol.

Một placeholder như vậy giống với một placeholder type được tìm thấy trong *generic*. Vậy nên nó không phải là một concrete type - chỉ là một placeholder. Associated type hữu dụng khi bạn muốn define một value trong protocol, nhưng bạn không muốn chỉ định một type cụ thể cho value. Associated type cần phải được làm rõ thông qua protocol.

Hãy thêm một associated type vào `Shape` protocol mà chúng ta đã sử dụng.
```Swift
protocol Shape {
    associatedtype Color
    var color:Color { get }
    func describe() -> String
}
```
Ở phía trên `Shape` protocol, chúng ta thêm một associated type `Color`. Chúng ta sử dụng nó như một type của `color` property. Nhớ rằng type `Color` không tồn tại. Nó chỉ là một placeholder.

Tiếp theo chúng ta tạo thêm hai implementation của `Shape` protocol. 
```Swift
struct Square: Shape {
    var color: String
    func describe() -> String {
        return "I'm a square. My four sides have the same lengths."
    }
}

struct Circle: Shape {
    var color: Int
    func describe() -> String {
        return "I'm a circle. I look like a perfectly round apple pie."
    }
}
```
Chúng ta tạo một `Square` và một `Circle` struct, giống với trước, cả 2 đều phù hợp với `Shape` protocol. Và cả 2 cũng đều implement `color` property, như là một yêu cầu bởi protocol.

Họ cũng cho `color` property một *concerte type*. `Square` sử dụng string cho `color`, và `Circle` sử dụng integer cho color. Tưởng tượng đơn giản thì lúc này chúng ta có thể diễn tả một color như một string như `"Green"` hay như là một number như `255`.

Cuối cùng, chúng ta muốn build một function tạo ra một shpare. Chúng ta không quan tâm type của shape, vậy nên chúng ta có thể sử dụng `Shape` protocol như là một return type. Nó có thể return bất cứ thứ gì miễn sao nó phù hợp với `Shape` protocol. Như thế này:
```Swift
func makeShape() -> Shape {
    return Square(color: "Yellow")
}
```
Khi bạn sử dụng đoạn code trên, bạn sẽ nhận được một compile-time error rằng: *Protocol ‘Shape’ can only be used as a generic constraint because it has Self or associated type requirements*. Chờ đã, tại sao nhỉ?

Lỗi này có nghĩa là Swfit không thể cụ thể hoá *associated type* `Color`. Dựa trên khai báo hàm, return type của function là `Shape`. Giống như `Shape` có một associated type `Color`, cái được sử dụng cho `color` property. Nhưng cái gì là concrete type của `color` property?
# Wrapping Up: Opaque Types
Cái gì là concrete type của `color` property, associated type của `Shape` protocol?

Chúng ta biết, rõ ràng là như vậy. Bạn có thể rõ ràng thấy nó, dựa trên việc implementation của `makeShape()` function, concrete type của `Color` là `String` với shape mà chúng ta làm việc là `Square`. Tuy nhiên Swift không thể dựa vào thông tin đó bởi bì nó là một phần của việc implementation của function chứ không phải là của delaration function.

Swift không thể chắc chắn rằng `makeShape()` function sẽ luôn luôn return một `Shape` với một associated type là `String`. Với những gì nó biết thì associated type có thể là `Int`, `Invoice`, ...

Vậy chúng ta cần làm gì? Chúng ta thêm `some` keyword vào function declaration:
```Swift
func makeShape() -> some Shape {
    return Square(color: "Yellow")
}
```
`some` keyword sẽ giúp `Shape` có return type là một *opaque*. Thay vì `makeShapre()` return *any* type phù hợp với `Shape` protocol, thì bây giờ nó có thể return một type phù hợp với `Shape` protocol - luôn là cùng một type nhưng chúng ta không biết nó là type nào.

Cũng giống với generic type placeholder, `Shape` type được cụ thể hoá khi Swift compile code. Dựa trên việc implementation tức là code bên trong function. Khi sử dụng `Square` thì concrete type của `some Shape` là `Square`. Và cũng giống với *generic placeholder type*, chúng ta sẽ nhận được *generic* và *opaque* về type mà chúng ta return. Nó luôn luôn cùng type, chỉ là chúng ta không biết nó là gì.

Vậy,
* *Generic type placeholder* cho phép người gọi của function cụ thể một type mà nó được sử dụng trong function
* *Protocol type* cho phép bạn return any type từ một function, chỉ cần nó phù hợp với protocol.
* Nhưng nó không hoạt động với một*associated type*, bởi vì thông tin type cụ thể bị thiếu.
* Nên chúng ta sử dụng `some` keyword để tạo một *opaque type* - một *reverse generic type* và cho việc implementation function tự quyết định type cụ thể mà nó return, và type cụ thể của bất kỳ associated type.

# Tại sao Opaque type lại hữu ích
Đầu tiên, opaque type cho bạn sử dụng protocol với associated type như là một return type. Như bạn đã thấy ở những ví dụ trước, bởi vì `some` keyword làm cho `makeShape()` function có thể return một value của type `Shape`, một protocol sử dụng associated type. Nếu không dùng `some` ở đây thì sẽ bị báo lỗi.

Thứ hai, opaque type sẽ giữ lại type identity, không giống với protocol type. Bạn có thể so sánh một value return từ `makeShape()` với một cái khác bằng cách sử dụng `==` nếu bạn có sử dụng `some` keyword.

Ví dụ:
```Swift
protocol Shape: Equatable {
    ...
}

func makeShape() -> some Shape {
    return Square(color: "Purple")
}

let aShape = makeShape()
let anotherShape = makeShape()

print(aShape == anotherShape)
// Output: true
```
`Shape` phù hợp với `Equatable` protocol nên có thể sử dụng `==` function để so sánh 2 value với nhau. Nó tự động tạo ra cho chúng ta, nhưng function mặc định được declaration như sau:
```Swift
static func == (lhs: Self, rhs: Self) -> Bool
```
Bạn có thấy `Self` ở đó chứ? Nó là một placeholder khác nói đến tên của type hiện tại. Giống với placeholder `T` có thể nói đến `Int` trong một generic function, `Self` nói đến một type cụ thể khi được sử dụng trong `Shape` protocol.

Vì placeholder `Self` này nên Swift không thể synthesize một overload cho `==`, do nó không thể tự suy ra type cụ thể. Với những gì nó biết thì nó cố gắng thử so sánh một `Square` với một `Circle` thì sẽ không bao giờ hoat động.

Vậy chúng ta sẽ làm gì, như đã thấy ở phía trên, chúng ta thêm `some` vào việc declaration của `makeShape()`. Tại lúc compile time, Swift sẽ đoán ra return type cụ thể của `makeShape()` phải kà `Square`. Một lần nữa khi bạn code như vậy, chúng ta không cần biết type cụ thể trước, khi compile time, Swift sẽ đoán ra.

Thứ ba, opaque type rất quan trọng đối với SwiftUI. Nhớ `body` property chứ. Nó sử dụng *opaque type* `some View`:
```Swift
var body: some View {
    VStack(alignment: .leading) {
        Text("My hovercraft is full of eels")
            .font(.headline)
        Text("Mijn luchtkussenboot zit vol paling")
            .font(.subheadline)
    }
}
```
Type cụ thể của view này, được declared như là một `some View` - `VStack<TupleView<(Text, Text)>>`. SwiftUI sử dụng generic structures, như `VStack` để tạo một type phức tạp. Sắp các view khác nahu với nhiều subviews, và type đó chỉ thêm phức tạp.

Bạn có thể viết một `body` property cụ thể, nhưng bạn phải update type mỗi khi các thành phần của view thay đổi. Nó dễ dàng khi declare một property với `some View` -  opaque type, và hãy để implementation quyết định type cụ thể lúc compile time. 

Bài viết đến đây là hết.

Source: https://learnappmaking.com/some-swift-opaque-types-how-to/