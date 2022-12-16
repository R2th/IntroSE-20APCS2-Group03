# Mở đầu
Thị trường mobile hiện đang chia thành 2 thái cực chính là iOS và Android với sự chống lưng của 2 ông lớn là Apple và Google. Để phát triển ứng dụng cho 2 hệ điều hành đó thì lập trình viên cần lựa chọn những ngôn ngữ lập trình phù hợp:<br>

* Native iOS: Swift, Object - C
* Native Android: Java, Kotlin
* Cross-platform: Javascript cho React Native, C# cho Xamarin, Dart cho Flutter, etc...
<br><br>

Mặc dù các cross-platform framework đang phát triển mạnh mẽ nhưng nó vẫn không thể thay thế hoàn toàn các native framework. Trong một vài trường hợp chúng ta buộc phải viết các module riêng biệt cho iOS và Android thì việc biết về các ngôn ngữ lập trình cho từng hệ điều hành là cần thiết. Với mỗi module thì yêu cầu viết bằng một ngôn ngữ khác nhau mà bạn chỉ biết một thì phải làm sao?<br><br>
    
  
Ở bài viết này, mình sẽ giúp bạn chỉ ra những cú pháp giúp bạn đỡ bỡ ngỡ khi tiếp xúc với 2 ngôn ngữ lập trình nổi bật để tạo ứng dụng cho từng hệ điều hành. Đó là [Swift](https://docs.swift.org/swift-book/index.html) (iOS) và [Kotlin](https://kotlinlang.org/docs/reference/) (Android)



# Những cú pháp cơ bản
<br>

###### *Hello World*
**Swift**
```swift
print("Hello, world!")
```
**Kotlin**
```kotlin
println("Hello, world!")
```
<br>

###### *Variables and Constants*
**Swift**
```swift
var myVariable = 42
myVariable = 50
let explicitDouble: Double = 42
```
**Kotlin**
```kotlin
var myVariable = 42
myVariable = 50
val explicitDouble: Double = 70.0
```
<br>

###### *Type Coercion*
**Swift**
```swift
let label = "The width is "
let width = 94
let widthLabel = label + String(width)
```
**Kotlin**
```kotlin
val label = "The width is "
val width = 94
val widthLabel = label + width
```
<br>

###### *String Interpolation*
**Swift**
```swift
let apples = 3
let oranges = 5
let fruitSummary = "I have \(apples + oranges) " +
                   "pieces of fruit."
```
**Kotlin**
```kotlin
val apples = 3
val oranges = 5
val fruitSummary = "I have ${apples + oranges} " +
                   "pieces of fruit."
```
<br>

###### *Range Operator*
**Swift**
```swift
// Exclusive
let names = ["Anna", "Alex", "Brian", "Jack"]
let count = names.count
for i in 0..<count {
    print("Person \(i + 1) is called \(names[i])")
}
// Person 1 is called Anna
// Person 2 is called Alex
// Person 3 is called Brian
// Person 4 is called Jack

// Inclusive
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```
**Kotlin**
```kotlin
// Exclusive
val names = arrayOf("Anna", "Alex", "Brian", "Jack")
val count = names.count()
for (i in 0..count - 1) {
    println("Person ${i + 1} is called ${names[i]}")
}
// Person 1 is called Anna
// Person 2 is called Alex
// Person 3 is called Brian
// Person 4 is called Jack

// Inclusive
for (index in 1..5) {
    println("$index times 5 is ${index * 5}")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```
<br>

# Collections
###### *Array*
**Swift**
```swift
var shoppingList = ["catfish", "water",
    "tulips", "blue paint"]
shoppingList[1] = "bottle of water"
```
**Kotlin**
```kotlin
val shoppingList = arrayOf("catfish", "water",
    "tulips", "blue paint")
shoppingList[1] = "bottle of water"
```
<br>

###### *Maps*
**Swift**
```swift
// Tên chính thức trong Swift là Dictionary
var occupations = [
    "Malcolm": "Captain",
    "Kaylee": "Mechanic",
]
occupations["Jayne"] = "Public Relations"
```
**Kotlin**
```kotlin
val occupations = mutableMapOf(
    "Malcolm" to "Captain",
    "Kaylee" to "Mechanic"
)
occupations["Jayne"] = "Public Relations"
```
<br>

###### *Empty Collections*
**Swift**
```swift
let emptyArray = [String]()
let emptyDictionary = [String: Float]()
```
**Kotlin**
```kotlin
val emptyArray = arrayOf<String>()
val emptyMap = mapOf<String, Float>()
```
<br>

# Functions
###### *Khai báo*
**Swift**
```swift
func greet(_ name: String,_ day: String) -> String {
    return "Hello \(name), today is \(day)."
}
greet("Bob", "Tuesday")
```
**Kotlin**
```kotlin
fun greet(name: String, day: String): String {
    return "Hello $name, today is $day."
}
greet("Bob", "Tuesday")
```
<br>

###### *Trả về nhiều giá trị (Tuple)*
**Swift**
```swift
func getGasPrices() -> (Double, Double, Double) {
    return (3.59, 3.69, 3.79)
}
```
**Kotlin**
```kotlin
data class GasPrices(val a: Double, val b: Double,
     val c: Double)
fun getGasPrices() = GasPrices(3.59, 3.69, 3.79)
```
<br>

###### *Khai báo hàm với số lượng tham số không xác định*
**Swift**
```swift
func sumOf(_ numbers: Int...) -> Int {
    var sum = 0
    for number in numbers {
        sum += number
    }
    return sum
}
sumOf(42, 597, 12)
```
**Kotlin**
```kotlin
fun sumOf(vararg numbers: Int): Int {
    var sum = 0
    for (number in numbers) {
        sum += number
    }
    return sum
}
sumOf(42, 597, 12)

// sumOf() can also be written in a shorter way:
fun sumOf(vararg numbers: Int) = numbers.sum()
```
<br>

###### *Hàm trả về một hàm*
**Swift**
```swift
func makeIncrementer() -> (Int -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
let increment = makeIncrementer()
increment(7)
```
**Kotlin**
```kotlin
fun makeIncrementer(): (Int) -> Int {
    val addOne = fun(number: Int): Int {
        return 1 + number
    }
    return addOne
}
val increment = makeIncrementer()
increment(7)

// makeIncrementer can also be written in a shorter way:
fun makeIncrementer() = fun(number: Int) = 1 + number
```
<br>

###### *Định nghĩa tên tham số*
**Swift**
```swift
func area(width: Int, height: Int) -> Int {
    return width * height
}
area(width: 2, height: 3)
```
**Kotlin**
```kotlin
fun area(width: Int, height: Int) = width * height
area(width = 2, height = 3)

// This is also possible with named arguments
area(2, height = 2)
area(height = 3, width = 2)
```
<br>

###### *Các hàm của mảng*
**Swift**
```swift
let numbers = [20, 19, 7, 12]
numbers.map { 3 * $0 }
numbers.sort()
```
**Kotlin**
```kotlin
val numbers = listOf(20, 19, 7, 12)
numbers.map { 3 * it }
numbers.sorted()
```
<br>

# Class
###### *Khai báo*
**Swift**
```swift
class Shape {
    var numberOfSides = 0
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}
```
**Kotlin**
```kotlin
class Shape {
    var numberOfSides = 0
    fun simpleDescription() =
        "A shape with $numberOfSides sides."
}
```
<br>

###### *Sử dụng*
**Swift**
```swift
var shape = Shape()
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
```
**Kotlin**
```kotlin
var shape = Shape()
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
```
<br>

###### *Kế thừa*
**Swift**
```swift
class NamedShape {
    var numberOfSides: Int = 0
    let name: String

    init(name: String) {
        self.name = name
    }

    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}

class Square: NamedShape {
    var sideLength: Double

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        self.numberOfSides = 4
    }

    func area() -> Double {
        return sideLength * sideLength
    }

    override func simpleDescription() -> String {
        return "A square with sides of length " +
	       sideLength + "."
    }
}

let test = Square(sideLength: 5.2, name: "square")
test.area()
test.simpleDescription()
```
**Kotlin**
```kotlin
// Các class trong Kotlin mặc định là final
open class NamedShape(val name: String) {
    var numberOfSides = 0

    open fun simpleDescription() =
        "A shape with $numberOfSides sides."
}

class Square(var sideLength: BigDecimal, name: String) :
        NamedShape(name) {
    init {
        numberOfSides = 4
    }

    fun area() = sideLength.pow(2)

    override fun simpleDescription() =
        "A square with sides of length $sideLength."
}

val test = Square(BigDecimal("5.2"), "square")
test.area()
test.simpleDescription()
```
<br>

###### *Protocol*
**Swift**
```swift
vprotocol Nameable {
    func name() -> String
}

func f<T: Nameable>(x: T) {
    print("Name is " + x.name())
}
```
**Kotlin**
```kotlin
interface Nameable {
    fun name(): String
}

fun f<T: Nameable>(x: T) {
    println("Name is " + x.name())
}
```
<br>

###### *Extensions*
**Swift**
```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}
let oneInch = 25.4.mm
print("One inch is \(oneInch) meters")
// prints "One inch is 0.0254 meters"
let threeFeet = 3.ft
print("Three feet is \(threeFeet) meters")
// prints "Three feet is 0.914399970739201 meters"
```
**Kotlin**
```kotlin
val Double.km: Double get() = this * 1000
val Double.m: Double get() = this
val Double.cm: Double get() = this / 100
val Double.mm: Double get() = this / 1000
val Double.ft: Double get() = this / 3.28084

val oneInch = 25.4.mm
println("One inch is $oneInch meters")
// prints "One inch is 0.0254 meters"
val threeFeet = 3.0.ft
println("Three feet is $threeFeet meters")
// prints "Three feet is 0.914399970739201 meters"
```
<br>

# Tổng kết
Trong bài viết này, mình đã giới thiệu những điểm tương đồng giữa Swift và Kotlin, qua đó giúp các bạn có thể tự tin trong quá trình viết các ứng dụng trên cả 2 nền tảng iOS và Android. Happy coding!
<br><br>
Nguồn tham khảo: 
* [Swift is like Kotlin](http://nilhcem.com/swift-is-like-kotlin/)
* [Swift vs Kotlin for real iOS/Android apps](http://angelolloqui.com/blog/38-Swift-vs-Kotlin-for-real-iOS-Android-apps)