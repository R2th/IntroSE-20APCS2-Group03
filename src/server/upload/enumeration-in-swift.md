# Enumerations
> **Enum định nghĩa kiểu chung cho 1 nhóm các giá trị liên quan và cho phép bạn làm việc với những giá trị này một cách an toàn trong code.**
# Cú pháp
Khai báo tương tự như khái báo `class` hay `struct`, bắt đầu với `enum` sau đó đặt tên cho `enum` vào cuối cùng là cặp ngoặc nhọn:
```
enum SomeEnumeration {
    // enumeration definition goes here
}
```
Ví dụ `enum` về 4 hướng chính của một cái la bàn:
```
enum CompassPoint {
    case north
    case south
    case east
    case west
}
```
Các giá trị được định nghĩa trong một `enum` (north, south, east và west) là những `case` trong một `enum` . Sử dụng từ khoá `case` để thêm một giá trị mới vào `enum`

> `enum` mặc định không có giá trị `integer`, không giống như C và Objective-C. Trong ví dụ CompassPoint ở trên, north, south, east và west không ngầm định bằng 0, 1, 2 hay 3. Thay vào đó, giá trị của các `case` bên trong một `enum` dựa vào `type` của `enum` đó.
> 
Nhiều `case` có thể viết trên cùng một dòng, cách biệt bởi dấu phẩy:

```
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```
Khai báo một biến kiểu `enum`: 
```
var directionToHead = CompassPoint.west
```
hoặc:
```
var directionToHead: CompassPoint = .west
```
Kiểu dữ liệu của biến directionToHead đã được biết, vì thế bạn có thể bỏ tên của `enum` đi và viết trực tiếp như cách 2 thay vì gọi từ tên của `enum` như cách 1 để khiến code gọn hơn.
# Sử dụng Switch với enum
So sánh các điều kiện với switch:
```
directionToHead = .south
switch directionToHead {
    case .north:
        print("Lots of planets have a north")
    case .south:
        print("Watch out for penguins")
    case .east:
        print("Where the sun rises")
    case .west:
        print("Where the skies are blue")
}
// Prints "Watch out for penguins"
```
# Vòng lặp các case trong enum
Giả sử bạn cần đếm số lượng các `case` trong một `enum` thì sao? Dễ! Ta có thể làm điều này bằng cách tạo một mảng chứa các `case` và đếm số lượng phần tử của nó, vậy làm thế nào để tạo được mảng chứa các phần tử của nó? Thật may, `Swift` đã cung cấp sẵn cho chúng ta protocol `CaseIterable`, protocol này sẽ tạo thêm một biến `allCase` là mảng chứa các `case` trong `enum` đó:
```
enum Beverage: CaseIterable {
    case coffee, tea, juice
}
let numberOfChoices = Beverage.allCases.count
print("\(numberOfChoices) beverages available")
// Prints "3 beverages available"
```
Sử dụng vòng lặp:
```
for beverage in Beverage.allCases {
    print(beverage)
}
// coffee
// tea
// juice
```
# Raw Value
Set giá trị cho từng `case` để tiện sử dụng:
```
enum Country: String {
    case vietnam = "Việt Nam"
    case china = "Trung Quốc"
    case cambodia = "Campuchia"
}
print(Country.vietnam.rawValue)
print(Country.china.rawValue)
print(Country.cambodia.rawValue)
//Việt Nam
//Trung Quốc
//Campuchia

enum Number: Int {
    case one = 1
    case two = 2
    case three = 3
}
print(Number.one.rawValue)
print(Number.two.rawValue)
print(Number.three.rawValue)
//1
//2
//3
```
#### Ngầm định Raw Value
`Swift` tự ngầm định giá trị của các case trong enum nếu kiểu của nó là String hoặc Int:
```
enum Country: String {
    case vietnam
    case china
    case cambodia
}
print(Country.vietnam.rawValue)
print(Country.china.rawValue)
print(Country.cambodia.rawValue)
//vietnam
//china
//cambodia

enum Number: Int {
    case one
    case two
    case three
}
print(Number.one.rawValue)
print(Number.two.rawValue)
print(Number.three.rawValue)
//0
//1
//2

enum Number: Int {
    case one = 2
    case two
    case three
    case four
    case five
}
print(Number.one.rawValue)
print(Number.two.rawValue)
print(Number.three.rawValue)
//2
//3
//and so on...
```
#### Khởi tạo từ Raw Value
Ta có thể khởi tạo một `instance` của `enum` bằng cách sử dụng .init(rawValue: ) của enum:
```
enum Country: String {
    case vietnam
    case china
    case cambodia
}

let country = Country(rawValue: "vietnam")
//country is of type Country? and equals Country.vietnam
```
Lưu ý, khi được khởi tạo với .init(rawValue: ), biến sẽ là kiểu `optional`

Trên đây là một số định nghĩa cũng như cú pháp và cách sử dụng cơ bản của `enum` trong `Swift`.
Nguồn tham khảo: https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html