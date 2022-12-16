> Type less, read less, produce more

### Extension
ví dụ như việc bình phương 1 số, ta sẽ thường code như sau:
``` swift
// Okay Version
func square(x: Int) -> Int { return x * x }

var squaredOFFive = square(x: 5)

square(x:squaredOFFive) // 625
```
Rõ ràng là variable `squaredOFFive` là không cần thiết mà chúng ta vẫn phải viết. Thay vào đó hãy code dùng extension như sau:
```swift
// Better Version
extension Int {
 var squared: Int { return self * self }
}

5.squared // 25

5.squared.squared // 625
```

### Generics
Ví dụ việc in tất cả elements của 1 mảng
```swift
// Bad Code
var stringArray = ["Bob", "Bobby", "SangJoon"]
var intArray = [1, 3, 4, 5, 6]
var doubleArray = [1.0, 2.0, 3.0]

func printStringArray(a: [String]) { for s in a { print(s) } }

func printIntArray(a: [Int]) { for i in a { print(i) } }

func printDoubleArray(a: [Double]) {for d in a { print(d) } }
```
Quá nhiều functions, Hãy tạo chỉ 1 thôi:
```swift
// Awesome Code
func printElementFromArray<T>(a: [T]) {
 for element in a { print(element) }
}
```

### For Loop vs While Loop
Ví dụ về việc in ra "count" 5 lần:
```swift
// Okay Code
var i = 0

while 5 > i {
  print("Count")
  i += 1
}
```
Bạn tạo ra variable "i" để chắc chắn vòng lặp `while` có thể thoát ra =)) 
> Listen, more variables → more memorization → more headache → more bugs → more life problems.
Thay vì đó:
```swift
for _ in 1...5 { print("Count") }
```

### Optional Unwrapping
Về cách sử dụng `guard let` vs `if let`
Giả sử, tạo 1 program cho việc chào đón user mới:
```swift
var myUsername: Double?
var myPassword: Double?

// Hideous Code
func userLogIn() {
 if let username = myUsername {
  if let password = myPassword {
   print("Welcome, \(username)"!)
  }
 }
}
```
Bạn thấy ngay `pyramid of doom` bởi vì dùng quá nhiều lệnh `if` lồng nhau. Ta có thể làm gọn gàng hơn như sau:
```swift
func userLogIn() {
 guard let username = myUsername, let password = myPassword else { return }
 print("Welcome, \(username)!")
}
```
### Lựa chọn giữa Property vs Function
Ví dụ về việc tìm đường kính của một vòng tròn:
```swift
// 💩 Code
func getDiameter(radius: Double) -> Double { return radius * 2}
func getRadius(diameter: Double) -> Double { return diameter / 2}

getDiameter(radius: 10) // return 20
getRadius(diameter: 200) // return 100
getRadius(diameter: 600) // return 300
```
Bạn đã tạo ra 2 functions `loại trừ` lẫn nhau. Tốt nhất hãy kết nối chúng với nhau như sau:
```swift
// Good Code
var radius: Double = 10

var diameter: Double {
 get { return radius * 2}
 set { radius = newValue / 2}
}

radius // 10
diameter // 20
diameter = 1000
radius // 500
```
>  More connections → less extra typing → fewer typos → fewer bugs → fewer life problems. 

### Enum to Type Safe
 Ví dụ về việc bán vé:
 ```swift
 // Simply Bad

switch person {
 case "Adult": print("Pay $7")
 case "Child": print("Pay $3")
 case "Senior": print("Pay $4")
 default: print("You alive, bruh?")
}
 ```
 “Adult”, “Child”, “Senior”  -> Bạn đang hard code. Bạn phải gõ đúng tất cả giá trị của các string cho mỗi trường hợp, đó là việc làm mất thời gian và dễ sai sót.
 ```swift
 // Beautiful Code
enum People { case adult, child, senior }
var person = People.adult
switch person {
 case .adult: print("Pay $7")
 case .child: print("Pay $3")
 case .senior: print("Pay $4")
}
 ```
 Bạn sẽ không bao giờ gặp phải lỗi typo, bởi vì `.adult`, `.child`, `.senior` sẽ highlight tự động. 
 
 ### Nil Coalescing
 Ví dụ về việc user chọn Twitter theme color
 ```swift
 // Long Code

var userChosenColor: String?
var defaultColor = "Red"
var colorToUse = ""

if let Color = userChosenColor { colorToUse = Color } else
 { colorToUse = defaultColor }
 ```
 Quá dài, thay vì đó
 ```swift
 var colorToUse = userChosenColor ?? defaultColor
 ```
 
 ### Conditional Coalescing
 Ví dụ: tăng chiều cao nếu bạn vuốt keo theo kiểu đầu dựng
 ```swift
 // Simply Verbose
var currentHeight = 185
var hasSpikyHair = true
var finalHeight = 0

if hasSpikyHair { finalHeight = currentHeight + 5}
 else { finalHeight = currentHeight }
 ```
 Quá dài, thay vào đó:
 ```swift
 // Lovely Code
finalHeight = currentHeight + (hasSpikyHair ? 5: 0)
 ```
 
 ### Functional Programming
 Ví dụ: Tìm số chẵn
 ```swift
 // Imperative (a.k.a boring)
var newEvens = [Int]()

for i in 1...10 {
 if i % 2 == 0 { newEvens.append(i) }
}

print(newEvens) // [2, 4, 6, 8, 10]
 ```
 Chúng ta ko cần phải xem toàn bộ quá trình, tôi đang lãng phí thời gian khi phải xem xét vòng `for-loop` chạy ntn. Hãy khiến nó rõ ràng hơn:
 ```swift
 // Declarative 😎
var evens = Array(1...10).filter { $0 % 2 == 0 }
print(evens) // [2, 4, 6, 8, 10]
 ```
 
>  Functional Programming is phenomenal.
> Functional Programming makes you look smart.

### Closure vs Func
```swift
// Normal Function
func sum(x: Int, y: Int) -> Int { return x + y }
var result = sum(x: 5, y: 6) // 11
```
Bạn không cần phải ghi nhớ tên của function và cả variable, bạn chỉ cần 1 thứ.
```swift
// Closure
var sumUsingClosure: (Int, Int) -> (Int) = { $0 + $1 }
sumUsingClosure(5, 6) // 11
```

### Tài liệu tham khảo:
Dịch và tham khảo từ: 
- https://www.bobthedeveloper.io/blog/10-tips-to-become-a-better-swift-developer
- https://developer.apple.com/videos/play/wwdc2015/414/