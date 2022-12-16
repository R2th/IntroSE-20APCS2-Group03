Tìm hiểu về hàm generics (generic function),  kiểu generics (generic type) và hạn chế kiểu dữ liệu (type constraints)

# Generics là cái vẹo gì?
Swift là 1 ngôn ngữ an toàn về kiểu dữ liệu (type safe). Những lúc mà bạn làm  việc với kiểu dữ liệu, bạn phải chỉ định rõ chúng ra. Vd nhé, chúng ta cần một hàm mà có thể xử lý nhiều hơn 1 kiểu dữ liệu. Swift đã cung cấp cho chúng ta `Any` và `AnyObject` nhưng dùng 2 kiểu này không phải là cách làm tốt nhất. Dùng `Any` và `AnyObject` sẽ làm cho code bạn mõng hơn và bạn không có khả năng những kiểu không phù hợp trong khi compiler chạy. Generics là 1 giải pháp cho yêu cầu này.

Generic code sẽ giúp chúng ta viết 1 function có thể dùng lại với nhiều kiểu dữ liệu khác nhau nếu kiểu đó nằm trong giới hạn hạn chế mà bạn đã xác định với compiler. Nó giúp bạn tránh khỏi việc phải viết lại code khi xữ lý 1 kiểu dữ liệu khác và thể hiện rất rõ ràng, trừu tượng. Vd nhen, các kiểu như `Array, Set, Dictionary` có các element của chúng là generic type đó

Chúng ta phải in các phần tử trong 1 mãng kiểu integer và kiểu string. Ta có thể viết đơn giản như sau 
```
let integers = [1, 3, 5, 7, 9]
let strings = ["Hello", "World", "Wish", "You", "Have", "A", "Best", "Day"]

func printIntegers(array: [Int]) {
    print("\(array.map { $0 })")
}

func printStrings(array: [String]) {
    print("\(array.map { $0 })")
}

printIntegers(array: integers)
printStrings(array: strings)
```

Giả dụ như bạn muốn in toàn bộ element của 1 mãng kiểu khác như float hay là một mãng custom objects. Thế là bạn phải viết cã đống cái hàm print cho mà sml. Nếu chịu khó để ý các hàm này, thì bạn sẽ thấy là chúng chỉ có khác nhau về loại dữ liệu. Thế nên thay vì cứ copy - paste rồi đổi kiểu chúng ta dùng 1 hàm generics để dùng lại cho các type tuỳ ý.
# Lịch sử Swift Generics
![](https://images.viblo.asia/246db122-d968-4cec-b6b7-e974c8ea0cea.png)

# Hàm Generic
Hàm generic như kiểu ăn tạp, kiểu nào bỏ vào nó cũng nhai hết. Được xác định bởi 1 placeholder type là T. Tên của placeholder type nó không có ý nghĩa gì cã nên các bạn an tâm, nó chỉ nói là kiểu mãng này nên có element là kiểu T kệ pà nó là T là kiểu gì. Thực tế thì mỗi lần hàm print được gọi thì kiểu giá trị được truyền vào sẽ thay thế cho thằng T này.
```
func print<T>(array: [T]) {
     print("\(array.map { $0 })")
}

print(array: integers)
print(array: strings)
```
# Placeholder type (params đa hình)
Placeholder type T ở ví dụ trên là 1 parameter truyền vào. Bạn có thể truyền vào nhiều hơn 1 parameter bằng việt ghi thêm các params mà bạn muốn vào trong dấu `()` và cách nhau bởi đấu `,`.
Nếu chúng ta để ý thì `Array<Element>` và `Dictionary<Key, Element>` đều có các kiểu params là Element và Key, Value và chúng giúp bạn hiểu dễ dàng hơn về loại params cần truyền vào và loại generecs của hàm mà chúng dùng.

Note: Luôn đặt tên loại params bằng chữ cái in hoa (dạng như T ---> TypeParameter) để biểu thị rằng nó là placeholder của 1 kiểu dữ liệu, không phải là giá trị.

# Generic type
Ngay cã class, structure hay enum đều có thể làm việc với bất cứ loại dữ liệu nào, giống như Array và Dictionary.

Chúng ta thử tạo 1 stack nhé 
```
enum StackError: Error {
    case Empty(message: String)
}

struct Stack {
    var array: [Int] = []
    
    init(capacity: Int) {
        array.reserveCapacity(capacity)
    }
    
    mutating func push(element: Int) {
        array.append(element)
    }
    
    mutating func pop() -> Int? {
        return array.popLast()
    }
    
    func peek() throws -> Int {
        guard !isEmpty(), let lastElement = array.last else {
            throw StackError.Empty(message: "Array is empty")
        }
        return lastElement
    }
    
    func isEmpty() -> Bool {
        return array.isEmpty
    }
}

var stack = Stack(capacity: 10)
stack.push(element: 1)
stack.push(element: 2)
print(stack)
stack.pop()
stack.pop()

stack.push(element: 5)

stack.push(element: 3)
stack.push(element: 4)
print(stack)

```

Hiện tại các bạn có thể thấy thì stack này chỉ có thể dùng cho các Element có kiểu là Integer. Nếu chúng ta muốn dùng cho các kiểu khác, thì phải tạo những cái mới với kiểu mình muốn khá là mất công. Thay vào đó, ta sẽ dùng generic như dưới đây.
```
struct Stack<T> {
    var array: [T] = []
    
    init(capacity: Int) {
        array.reserveCapacity(capacity)
    }
    
    mutating func push(element: T) {
        array.append(element)
    }
    
    mutating func pop() -> T? {
        return array.popLast()
    }
    
    func peek() throws -> T {
        guard !isEmpty(), let lastElement = array.last else {
            throw StackError.Empty(message: "Array is empty")
        }
        return lastElement
    }
    
    func isEmpty() -> Bool {
        return array.isEmpty
    }
}

var stack = Stack<Int>(capacity: 10)
stack.push(element: 1)
stack.push(element: 2)
print(stack)

var strigStack = Stack<String>(capacity: 10)
strigStack.push(element: "HelloWorld")
print(strigStack)
```
:v thấy sao nào. Quá tiện lợi đúng không.
# Generic hạn chế kiểu dữ liệu (Generic type Constraints)

Mặc dù generics có thể là bất kì loại dữ liệu nào, chúng ta cũng không nên lạm dụng nó quá. Đôi lúc, sẽ hữu dụng hơn rất nhiều nên bạn biết cách hạn chế kiểu dữ liệu cho hàm và loại generics. Type constraints này sẽ chỉ định là loại dữ liệu phải phù hợp với protocol hay gì là tuỳ bạn.
Ví dụ nhé, `Dictionary` là 1 kiểu dữ liệu giới hạn dữ liệu có thể dùng để làm key cho nó. `Dictionary` cần 1 keys có thể `Hashable` để nó có thể check nó tồn tại giá trị cho keys đó chưa 1 cách nhanh nhất.

```
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
       // function body goes here
}
```

Ở ví dụ lớn trên kia, chúng ta tạo ra 1 Stack type T nhưng chúng ta không thể so sánh 2 stack với nhau bởi vì các kiểu chưa conform 1 protocol gọi là `Equatable`. Chúng ta cần sửa đổi nó thế này nếu muốn dùng
```
Stack<T: Equatable>
```
# Generic hoạt động thế nào?
Cho 1 ví dụ nè:
```
func min<T: Comparable>(_ x: T, _ y: T) -> T {
       return y < x ? y : x
}
```
Trong đoạn code trên, trình biên dịch cần 2 thông tin cần thiết để phát mã cho hàm đó là:
* Kích thước của biến kiểu T
* Địa chỉ quá tải cụ thể của hàm "<" phải được gọi khi chạy.

Bất cứ khi nào trình biên dịch bắt gặp 1 giá trị có kiểu generic, nó sẽ tự động bỏ vào 1 nơi nào đó như 1 cái hộp để chứa giá trị này. Cái hộp này phải có kích thước cố định để lưu trữ giá trị, nếu giá trị quá lớn (lớn hơn kích thước cái hộp), Swift sẽ phân bố nó trên Heap và lưu 1 tham chiếu tới giá trị trong cái hộp.

Trình biên dịch cũng duy trì một danh sách một hoặc nhiều bảng nhân chứng (witness table) cho mỗi tham số có cùng một kiểu generics chung: một để chứa giá trị của bảng nhân chứng, cộng với một protocol của bảng nhân chứng cho mỗi ràng buộc protocol (protocol constraint) trên kiểu giá trị. Các bảng nhân chứng được sử dụng để tự động gửi các lệnh gọi hàm một cách chính xác về thời gian khi được chạy

----
Tài liệu mình tham khảo ở trang này: [Power of Swift Generics — Part 1
](https://medium.com/swift-india/power-of-swift-generics-part-1-ab722a030dc2)

Cám ơn các bạn đã theo dõi. Mong các bạn thích bài viết này  ^^