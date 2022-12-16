### Nội dung

- Giới thiệu
- Variables and Constants
- Optionals
- String Interpolation
- Functions
- Enumerations
- Tuples
- Tổng kết

### Giới thiệu

Chắc hẳn với những bạn iOS developer Lâu năm thì ObjectiveC vẫn là một ngôn ngữ nhiều cảm xúc khi chúng ta đã có khoảng thời gian hơn 6 năm gắn bó cùng. 

Vào năm 2014, Apple đã giới thiệu một ngôn ngữ mới thay thế ObjectiveC là Swift. Swift xóa bỏ việc quản lý con trỏ không an toàn và giới thiệu nhiều tính năng mới mạnh mẽ trong khi vẫn duy trì sự tương thích với ObjectiveC và C. Sau khi phiên bản Swift 1.0 ra đời, trải qua các đợt nâng cấp. Phiên bản mới nhất của Swift là [Swift 5.0](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html)

Trong bài biết này chúng ta sẽ tìm hiểu chung về các tính năng trên Swift và so sánh nó với ObjectiveC.

**Nào chúng ta cùng bắt đầu!**

### Variables and Constants

- Khai báo biến trong Swift sử dụng từ khóa **var**

```Swift
var x = 2
var s = "Hi"
```

Bạn chú ý rằng 2 biến x và s khác kiểu dữ liệu. Kiểu dữ liệu của x là Integer trong khi s là String. Swift là ngôn ngữ an toàn và nó tự suy ra được kiểu dữ liệu của biến dựa vào giá trị gán cho biến đó. Nếu bạn muốn code của bạn trở nên dễ đọc hơn, bạn có thể chú thích thêm kiểu của biến đó theo cú pháp như sau:

```Swift
var y: Int
y = 3
```

- Khai báo hằng số cũng tương tự nhưng sử dụng từ khóa **let**. Giá trị của hằng số không cần xác định ở thời điểm biên dịch nhưng bạn bắt buộc phải gán giá trị cho nó.

```Swift
let c1 = 1 // Constant known at compile time

var v = arc4random()
let c2 = v // Constant known only at run time
```

### Optionals

Hằng số cần được cài đặt khi khai báo và biến cần được cài đặt trước khi sử dụng. Swift giới thiệu **Optional values**. Optional values có thể có value hoặc là nil.

```Swift
var s = "2014"
var x = s.toInt()
print(x)    // Optional(2014)
```

Nếu bạn gán giá trị cho s là "abc". Do đó không thể nào convert thành Integer được nên giá trị của x giờ sẽ là nil

```Swift
var s = "abc"
var x = s.toInt()
print(x)    // nil
```

### String Interpolation

Trong ObjectiveC, format của string luôn sử dụng với method **stringWithFormat:**

```Swift
NSString *user = @"Gabriel";
int days = 3;
NSString *s = [NSString stringWithFormat:@"posted by %@ (%d days ago)", user, days];
```

Swift sử dụng **string interpolation** để làm việc tương tự nhưng nó ngắn gọn hơn và dễ dàng để đọc hơn:

```Swift
let user = "Gabriel"
let days = 3
let s = "posted by \(user) \(days) ago"
```

Thậm chí bạn có thể sử dụng cho mục đích chèn kết quả của biểu thức:

```Swift
let width = 2
let height = 3
let s = "Area for square with sides \(width) and \(height) is \(width*height)"
```

### Functions

Định nghĩa Function trong Swift khác với trong ObjectiveC:

```Swift
func someFunction(s:String, i: Int) -> Bool
{
    ...    // code
}
```

Function trong Swift kiểu **first-class**. Nghĩa là bạn có thể gán function cho biến, gán chúng như là param cho function khác hoặc dùng chúng để trả dữ liệu.

```Swift
func stringLength(s:String) -> Int
{
    return countElements(s)
}

func stringValue(s:String) -> Int
{
    if let x = s.toInt()
    {
        return x
    }
    return 0
}

func doSomething(f:String -> Int, s:String) -> Int
{
    return f(s).successor()
}

let f1 = stringLength
let f2 = stringValue

doSomething(f1, "123")    // 4
doSomething(f2, "123")    // 124
```

Function cũng có thể trả về function khác.

```Swift
func compareGreaterThan(a: Int, b: Int) -> Bool
{
    return a > b
}

func compareLessThan(a: Int, b: Int) -> Bool
{
    return a < b
}

func comparator(greaterThan:Bool) -> (Int, Int) -> Bool
{
    if greaterThan
    {
        return compareGreaterThan
    }
    else
    {
        return compareLessThan
    }
}

let f = comparator(true)
println(f(5, 9))
```

### Enumerations

Enum trong Swift mạnh mẽ hơn trong ObjectiveC. Chúng có thể có cả methods và được gán giá trị:

```Swift
enum MobileDevice : String
{
    case iPhone = "iPhone", Android = "Android", WP8 = "Windows Phone8", BB = "BlackBerry"

    func name() -> String
    {
        return self.toRaw()
    }
}

let m = MobileDevice.Android
print(m.name())    // "Android"
```

Không giống như với ObjectiveC, trong Swift thì mỗi member trong enum có thể gán giá trị là: String, Characters hoặc floats chứ không chỉ là integers.

Enum cũng có thể là param:

```Swift
enum Location
{
    case Address(street:String, city:String)
    case LatLon(lat:Float, lon:Float)

    func description() -> String
    {
        switch self
        {
        case let .Address(street, city):
            return street + ", " + city
        case let .LatLon(lat, lon):
            return "(\(lat), \(lon))"
        }
    }
}

let loc1 = Location.Address(street: "2070 Fell St", city: "San Francisco")
let loc2 = Location.LatLon(lat: 23.117, lon: 45.899)
print(loc1.description())        // "2070 Fell St, San Francisco"
print(loc2.description())        // "(23.117, 45.988)"
```

### Tuples

Tuples nhóm nhiều giá trị vào một giá trị phức tạp. Giá trị trong tuple có thể là nhiều loại và các members không cần thiết phải giống kiểu dữ liệu:

```Swift
let person = ("Gabriel", "Kirkpatrick")
print(person.0) // Gabriel
```

Bạn cũng có thể đặt tên cho mỗi thành phần riêng của Tuple:

```Swift
let person = (first: "Gabriel", last: "Kirkpatrick")
print(person.first)
```

Tuple cực kì thuận tiện khi dùng như là kiểu trả về với function cần trả về nhiều hơn 1 giá trị:

```Swift
func intDivision(a: Int, b: Int) -> (quotient: Int, remainder: Int)
{
    return (a/b, a%b)
}
print(intDivision(11, 3))    // (3, 2)
let result = intDivision(15, 4)
print(result.remainder)    // 3
```

Không giống như trong ObjectiveC, Swift cung cấp cho **Switch** mạnh mẽ hơn:

```Swift
let complex = (2.0, 1.1)    // real and imaginary parts

switch complex
{
    case (0, 0):
        println("Number is zero")
    case (_, 0):
        println("Number is real")
    default:
        println("Number is imaginary")
}
```

Trong trường hợp chúng ta không quan tâm về phần số thực , chúng ta sử dụng _ để match. Bạn cũng có thể kiểm tra điều kiện trong mỗi case.

```Swift
let complex = (2.0, 1.1)

switch complex
{
    case (0, 0):
        println("Number is zero")
    case (let a, 0) where a > 0:
        println("Number is real and positive")
    case (let a, 0) where a < 0:
        println("Number is real and negative")
    case (0, let b) where b != 0:
        println("Number has only imaginary part")
    case let (a, b):
        println("Number is imaginary with distance \(a*a + b*b)")
}
```

### Tổng kết

Thông qua phần 1 của bài viết này, chúng ta đã phần nào hiểu được sự khác nhau cũng như là cải tiến trên Swift so với ObjectiveC với các khái niệm cơ bản là :
- Variables and Constants
- Optionals
- String Interpolation
- Functions
- Enumerations
- Tuples

Ở phần kế tiếp chúng ta sẽ cùng tìm hiểu về
- Classes and Structures
- Structures
- Computed Properties

**Hẹn gặp các bạn trong phần tiếp theo nhé!**

##### _Nguồn:_

[https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html)
[https://www.toptal.com/swift/from-objective-c-to-swift)
[https://docs.swift.org/swift-book/)