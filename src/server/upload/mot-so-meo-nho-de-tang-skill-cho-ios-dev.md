# Giới thiệu
Xin chào tất cả mọi người Swift là ngôn ngữ lập trình mới được phát triển bởi Apple Inc với mục đích hỗ trợ lập trình viên trong việc phát triển các ứng dụng chạy trên các hệ điều hành như iOS, OSX và watchOS. Swift được xây dựng dựa trên việc kế thừa các tính năng của 2 ngôn ngữ C và Objective-C.

Hôm nay mình xin phép chia sẻ một số Tip để có thể tăng skill code iOS-Swift.
# Bắt đầu
## Subscripts:
Class, struct và enum có thể define subscript. Subscripts dùng để truy cập nhanh các phần tử của collection,list hay sequence.Bạn có thể sử dụng subscripts để set và truy xuất dữ liệu với index luôn mà không cần phải gián tiếp qua phương thức khác.
Ví dụ bạn truy cập các phần tử trong Array thông qua someArray[index]
Sau đây là 2 ví dụ để mô tả dùng subscript để có thể rút gọn clear hơn:
### Không sử dụng subscripts:
```
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        self.grid = Array(repeatElement(0.0, count: rows * columns))
    }
    
    func getValue(row: Int, column: Int) -> Double{
        return grid[(row * columns) + column]
    }
    
    mutating func setValue(row: Int, column: Int, value: Double){
        grid[(row * columns) + column] = value
    }
}

var matrix = Matrix(rows: 2, columns: 2)
matrix.setValue(row: 0, column: 0, value: 1.0)
matrix.setValue(row: 0, column: 1, value: 2.0)
matrix.setValue(row: 1, column: 0, value: 3.0)
matrix.setValue(row: 1, column: 1, value: 4.0)

print(matrix.getValue(row: 0, column: 0)) //prints "1.0"
print(matrix.getValue(row: 0, column: 1)) //prints "2.0"
print(matrix.getValue(row: 1, column: 0)) //prints "3.0"
print(matrix.getValue(row: 1, column: 1)) //prints "4.0"
```
### Sử dụng subscript
```
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        self.grid = Array(repeatElement(0.0, count: rows * columns))
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            return grid[(row * columns) + column]
        }
        set {
            grid[(row * columns) + column] = newValue
        }
    }
}

var matrix = Matrix(rows: 2, columns: 2)

matrix[0,0] = 1.0
matrix[0,1] = 2.0
matrix[1,0] = 3.0
matrix[1,1] = 4.0

print(matrix[0,0]) //prints "1.0"
print(matrix[0,1]) //prints "2.0"
print(matrix[1,0]) //prints "3.0"
print(matrix[1,1]) //prints "4.0"
```
## Function vs Computed Property
### Function (or 💩 Code)
Dưới đây mình sẽ lấy ví dụ đơn giản về 2 function để tính bán kính khi biết đường kính và ngược lại
```
func getDiameter(radius: Double) -> Double {
    return radius * 2
}

func getRadius(diameter: Double) -> Double {
    return diameter / 2
}

print(getDiameter(radius: 100)) //prints "200"
print(getRadius(diameter: 100)) //prints "50"
```
### Computed Property (or ❤️ Code)
Computed Property cung cấp GET và SET. Mình sẽ làm lại ví dụ trên bằng cách sử dụng computed property 
```
var radius: Double = 100
var diameter: Double {
    get {
        return radius * 2
    }
    set {
        radius = newValue / 2
    }
}

print(diameter) //prints "200.0"

diameter = 100
print(radius) //prints "50.0"
```
## Extension
Extension dùng để thêm các function mới cho class, struct, enum hoặc protocol. Chúng ta có thể mở rộng các loại mà không cần phải truy cập vào mã nguồn ban đầu.
Dưới đây là ví dụ extention cho Double để cung cấp cơ bản các loại khoảng cách
### Dùng extension
```
extension Double {
    var m: Double { return self }
    var km: Double { return self * 1000.0 }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1000.0 }
}

let thousandCentimeter = 1000.cm
print("Thousand centimeter is \(thousandCentimeter) meters")
// Prints "Thousand centimeter is 10.0 meters"

let threeKilometer  = 3.km
print("Three km is \(threeKilometer) meters")
// Prints "Three km is 3000.0 meters"
```
### Không dùng extension(bad code)
```
func centimeterToMeter(value: Double) -> Double{
    return value / 100.0
}

func kilometerToMeter(value: Double) -> Double{
    return value * 1000.0;
}

let thousandCentimeter = 1000.0
print("Thousand centimeter is \(centimeterToMeter(value: thousandCentimeter)) meters")
// Prints "Thousand centimeter is 10.0 meters"

let threeKilometer  = 3.0
print("Three km is \(kilometerToMeter(value: threeKilometer)) meters")
// Prints "Three km is 3000.0 meters"
```
## Ternary conditional
Toán tử này là loại đặc biệt gồm có 3 phần với mẫu `question ? answer1 : answer2`. Đây là shortcut dùng để đánh giá 1 trong 2 biếu thức dựa trên `question` là `true` hay `false`.
Dưới đây là ví dụ để thay đổi giá trị của `rowHeight` dựa trên việc là `header` có hay không.
### Sử dụng Ternary conditional 
```
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
print(rowHeight)

//prints "90"
``` 
### Không sử dụng Ternary conditional(or 💩 Code)
```
let contentHeight = 40
let hasHeader = true
var rowHeight: Int
if hasHeader == true {
    rowHeight = contentHeight + 50
} else {
    rowHeight = contentHeight + 20
}
print(rowHeight) //prints "90"
```
## Nil coalescing
Toán tử nil coalescing có dạng `a ?? b`. Nó sẽ unwraps một optional a nếu a có giá trị còn nếu a là nil thì giá trị default trả về sẽ là b. Nói thì có vẻ khó hiểu nên mình sẽ đưa ra ví dụ sau: Gán giá trị `colorNameToUse` là `userDefinedColorName` nếu `userDefinedColorName` có giá trị. Còn nếu `userDefinedColorName` là nil thì giá trị sẽ được set là `defaultColorName`
### Sử dụng Nil coalescing (or 😎 Code)
```let defaultColorName = "red"
var userDefinedColorName: String?   // defaults to nil

var colorNameToUse = userDefinedColorName ?? defaultColorName
print(colorNameToUse)

//prints "red"
// userDefinedColorName is nil, so colorNameToUse is set to the default of "red"

userDefinedColorName = "green"
colorNameToUse = userDefinedColorName ?? defaultColorName
print(colorNameToUse)

//prints "green"
// Now userDefinedColorName is "green", so colorNameToUse is set to the value of userDefinedColorName of "green"

```
### Không sử dụng Nil coalescing (or 💩 Code)
```
let defaultColorName = "red"
var userDefinedColorName: String?   // defaults to nil

var colorNameToUse: String!
if let color = userDefinedColorName {
    colorNameToUse = color
} else {
    colorNameToUse = defaultColorName
}
print(colorNameToUse)

//prints "green"
//userDefinedColorName is "green", so colorNameToUse is set to the value of userDefinedColorName of "green"
```
## Optional Unwrapping (if let vs guard let)
Cả 2 thằng `if let` và `guard let` đểu có thể unwrap optional. Tuy nhiên thằng guard let hỗ trợ tốt hơn khi chúng ta cần check nhiều điều kiện lồng nhau. Nó sẽ out ra nếu gặp 1 thằng điều kiện không đáp ứng được. Hơn nữa `guard let` làm cho mã nguồn của mình dễ đọc hơn và dễ dàng maintain sau này.
Sau đây là ví dụ để tạo new user:
```
let emailField = UITextField()
emailField.text = "abcd@mail.com"
let usernameField = UITextField()
usernameField.text = "vineet"
let passwordField = UITextField()
passwordField.text = "123456"
let conifrmPasswordField = UITextField()
conifrmPasswordField.text = "123456"
```
### Sử dụng if let (or Bad Code)
```
func loginIfLet(){
    if let email = emailField.text {
        if let username = usernameField.text {
            if let password = passwordField.text {
                if let conifrmPassword = conifrmPasswordField.text {
                    if password == conifrmPassword {
                        print("Email - \(email)")
                        print("Username - \(username)")
                        print("Password - \(password)")
                    } else {
                        print("Password didn't match with conifrm password.")
                    }
                } else {
                    print("Conifrm password is empty.")
                }
            } else {
                print("Password is empty.")
            }
        } else {
            print("Username is empty.")
        }
    } else {
        print("Email is empty.")
    }
}
loginIfLet()
```
### Sử dụng guard let (or Awesome Code)
```
func loginGuardLet(){
    guard let email = emailField.text else {
        print("Email is empty.")
        return
    }
    guard let username = usernameField.text else {
        print("Username is empty.")
        return
    }
    guard let password = passwordField.text else {
        print("Password is empty.")
        return
    }
    guard let conifrmPassword = conifrmPasswordField.text else {
        print("Conifrm password is empty.")
        return
    }
    if password == conifrmPassword {
        print("Email - \(email)")
        print("Username - \(username)")
        print("Password - \(password)")
    } else {
        print("Password didn't match with conifrm password.")
    }
}
loginGuardLet()
```
## Generics
Generics là một trong những tính năng mạnh mẽ của Swift. Cho phép chúng ta viết các function linh hoạt và dễ dàng tái sử dụng với bất kì loại nào.
Đây là ví dụ mình viết chức năng để đổi chỗ 2 số nguyên và 2 kí tự. Bình thường thì ta sẽ viết 2 function cho 2 chức năng trên:
```
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}

func swapTwoStrings(_ a: inout String, _ b: inout String) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt = \(someInt)")
print("anotherInt = \(anotherInt)")
/* prints
 someInt = 107
 anotherInt = 3
 */
 
var someString = "hello"
var anotherString = "world"
swapTwoStrings(&someString, &anotherString)
print("someString = \(someString)")
print("anotherString = \(anotherString)")
/* prints
 someString = world
 anotherString = hello
 */
```
### Sử dụng Generics (or 👊 Code)
Chúng ta chỉ cần tạo 1 hàm duy nhất với bất kì kiểu dữ liệu nào cũng phù hợp
```
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)
print("someInt = \(someInt)")
print("anotherInt = \(anotherInt)")
/* prints
 someInt = 107
 anotherInt = 3
 */

var someString = "hello"
var anotherString = "world"
swapTwoValues(&someString, &anotherString)
print("someString = \(someString)")
print("anotherString = \(anotherString)")
/* prints
 someString = world
 anotherString = hello
 */
```
## Type safe using Enum
Enum định nghĩa một kiểu chung cho một nhóm các giá trị liên quan và cho phép chúng ta làm việc trên nó một cách an toàn.
### Không sử dụng Enum
```
let directionToHead = "east"
switch directionToHead {
case "north":
    print("Lots of planets have a north")
case "south":
    print("Watch out for penguins")
case "east":
    print("Where the sun rises")
case "west":
    print("Where the skies are blue")
default:
    print("Unknown direction")
}
//prints "Where the sun rises"
```
### Sử dụng enum(or 👊 Code)
Dùng enum khiến code trở nên trong sáng và clear hơn rất nhiều
```
enum CompassPoint {
    case north, south, east, west
}
let direction: CompassPoint = .east

switch direction {
case .north:
    print("Lots of planets have a north")
case .south:
    print("Watch out for penguins")
case .east:
    print("Where the sun rises")
case .west:
    print("Where the skies are blue")
}
```
# Tổng kết
Vậy là chúng ta đã trải qua một số TIP để có thể nâng cao thêm skill. Làm càng nhiều càng sai nhiều thì sẽ rút được kinh nghiệm. Không ai tự dưng mà pro được. Vậy nên mọi người có chia sẻ gì thêm có thể để lại dưới bình luận để những ai chưa biết có thể biết thêm. 
Cảm ơn mọi người
# Tài liệu tham khảo
https://developer.apple.com/documentation/

https://developerinsider.co/tips-to-become-a-better-swift-ios-developer/