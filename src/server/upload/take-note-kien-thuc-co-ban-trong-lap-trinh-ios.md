Luyện lại căn bản Swift & Lập trình IOS
Ôn lại các kiến thức cơ bản về Swift & lập trình IOS

## Chap 1: Mở đầu:

1 chương trình nhỏ trong swift
có tên & đuôi là .swift như: greeting.swift

```
func greet(name: String, surname: String) { print("Greetings \(name) \(surname)")
}
let myName = "Homer"
let mySurname = "Simpson"
greet(name: myName, surname: mySurname)
```

    
## Chap 2: Variables & Properties
    
Tạo 1 biến:
Khai báo theo mẫu: var tiếp theo là tên, kiểu và giá trị:

```
var myVariable: Int = 10
myVariable = 20 // co thể thay đổi giá trị

let myNumber: Int = 10 // giá trị này sẽ ko thay đổi khi khai báo let

//Swift sẽ tự nhận loại khi gán giá trị
let myInt = 10 // số này là kiểu Int
let myDouble = 3.14 // số này là kiểu Double
let myFloat: Float = 3.14 //trường hợp này phải khai báo mới hiểu Float
Property Observers
var myProperty = 5 { 
  willSet {
    print("Will set to \(newValue). It was previously \(myProperty)") 
  }

  didSet {
    print("Did set to \(myProperty). It was previously \(oldValue)")
  }
}

myProperty = 6
// prints: Will set to 6, It was previously 5 
// prints: Did set to 6. It was previously 5
```

Note:

willSet & didSet sẽ ko được gọi trong các trường hợp:

Khởi tạo biến với giá trị ban đầu
Gán giá trị bằng chính nó.
Nhớ với willSet sẽ tương ứng với param là newValue, didSet sẽ tương ứng với param là oldValue.

Trường hợp để dễ đọc hơn thì ta có thể đưa tham số vào willSet và didSet như vd dưới & tuyệt đối ko dùng newValue & oldValue để truyền vào willSet & didSet

```
var myFontSize = 10 
{ 
  willSet(newFontSize) 
  {
    print("Will set font to \(newFontSize), it was \(myFontSize)") 
  }

  didSet(oldFontSize) {
    print("Did set font to \(myFontSize), it was \(oldFontSize)")
  } 
}
```

Lazy khi khai báo 1 biến:
Khi khai báo lazy, thì chưa chạy thì nó chưa lưu gì cả. Rất có ích cho việc tiết kiệm memory khi tính toán của biến tốn nhiều chi phí tính toán.

```
lazy var veryExpensiveVariable = expensiveMethod()

// Thường được assign đến 1 giá trị trả về của closure
lazy var veryExpensiveString = { () -> String in 
  var str = expensiveStrFetch()
  str.expensiveManipulation(integer: arc4random_uniform(5))
  return str
}()

// khi khai báo lazy thì phải dùng var
Các khai báo thông thường
class Dog {
  var name = ""
}
//Sử dụng:
let myDog = Dog()
myDog.name = "Dog1"
hoặc:

var pi = 3.14
class Circle {
  var radius = 0.0
  var circumference: Double 
  {
    get {
      return pi * radius * 2
    }
    
    set {
      radius = newValue / pi / 2 }
  } 
}
let circle = Circle()
circle.radius = 1 
print(circle.circumference) 
// Prints "6.28" 
circle.circumference = 14 
print(circle.radius) 
// Prints "2.229..."
```

Type Properties
là những property dựa trên chính type của nó, ko phải theo instance. Khai báo nó với từ khóa static như sau:

```
struct Dog {
  static var noise = "Bark!"
}


print(Dog.noise) // Bark!
```

Có thể áp dụng được cho dạng thuộc tính dạng lưu trữ & thuộc tính dạng tính toán ( dựa vào các thuộc tính lưu trữ trong type/ class để tính toán ra giá trị & nó ko dùng để lưu trữ)

Trong class thì có thể dùng từ khóa class để thay thế cho static & dùng nó để có thể override giá trị. Nhưng nó chỉ có thể áp dụng cho thuộc tính dạng tính toán. Vd:

```
class Animal {
    class var noise: String {
      return "Animal noise!" 
    }
}
class Pig: Animal {
  override class var noise: String { 
    return "Oink oink!"
  } 
}
```
// Loại này thường được dùng trong singleTon Pattern.

## Other : Note những cái cần thiết:

### Tupe trong swift:


```
let testTuple = ("abc", 123, "bcd", 456, last: "fjalsjdfljasdf")

print(testTuple.2)
print(testTuple.last)
Sử dụng Tupe như 1 giá trị trả về trong function

func tupleReturner() -> (Int, String) {
    return (3, "Hello")
}
let myTuple = tupleReturner()

print(myTuple.0) // 3
print(myTuple.1) // "Hello"

//Hoặc:
func tupleReturner() -> (anInteger: Int, aString: String) { 
  return (3, "Hello")
}
let myTuple = tupleReturner() 
print(myTuple.anInteger) // 3 
print(myTuple.aString) // "Hello"
Sử dụng typealias để đặt tên cho tupe type:

// Define a circle tuple by its center point and radius
let unitCircle: (center: (x: CGFloat, y: CGFloat), radius: CGFloat) = ((0.0, 0.0), 1.0)
func doubleRadius(ofCircle circle:(center: (x: CGFloat, y: CGFloat), radius: CGFloat))
        -> (center: (x: CGFloat, y: CGFloat), radius: CGFloat){
            return (circle.center, circle.radius * 2.0)
}

//Biểu diễn như trên rất dài
//Nếu như dùng nhiều chỗ thì có thể sử dụng typealias như sau:
// Define a circle tuple by its center point and radius
typealias Circle = (center: (x: CGFloat, y: CGFloat), radius: CGFloat)
let unitCircle: Circle = ((0.0, 0.0), 1)

func doubleRadius(ofCircle circle: Circle) -> Circle {
    // Aliased tuples also have access to value labels in the original tuple type.
    return (circle.center, circle.radius * 2.0)
}
```

**Những lợi ích khi sử dụng tuple:**

Swap 2 giá trị với nhau ko cần dùng biến tạm:

```
var a = "Marty McFly"
var b = "Emmett Brown"

(a, b) = (b, a)
print(a) // "Emmett Brown"
print(b) // "Marty McFly"
Sử dụng trong swtich case như sau:

let switchTuple = (firstCase: true, secondCase: false)

switch switchTuple {
    case (true, false):
        // do something
    case (true, true):
        // do something
    case (false, true):
        // do something
    case (false, false):
        // do something
}
```

### Enum trong Swift:

Có nhiều khác biệt hơn so với các ngôn ngữ khác:

```
protocol ChangesDirection {
    mutating func changeDirection()
}
enum Direction {
    // enumeration cases
    case up, down, left, right
    // initialise the enum instance with a case
    
    // that's in the opposite direction to another
    init(oppositeTo otherDirection: Direction) {
        self = otherDirection.opposite
    }
    // computed property that returns the opposite direction
    var opposite: Direction {
        switch self {
        case .up:
            return .down
        case .down:
            return .up
        case .left:
            return .right
        case .right:
            return .left
            
        }
    }
}
// extension to Direction that adds conformance to the ChangesDirection protocol
extension Direction: ChangesDirection {
    mutating func changeDirection() {
self = .left }
}

var dir = Direction(oppositeTo: .down) // Direction.up
dir.changeDirection() // Direction.left
let opposite = dir.opposite // Direction.right
```

### Struct trong Swift

```
struct DeliveryRange {
  var range: Double
  let center: Location
}

let storeLocation = Location(latitude: 44.9871, longitude: -93.2758)
var pizzaRange = DeliveryRange(range: 200,center: storeLocation)

print(pizzaRange.range) // 200
print(pizzaRange.center.latitude) // 44.9871

pizzaRange.range = 250
Mutating trong struct ?
Phương thức trong struct mà thay đổi được giá trị trong struct đó phải khai báo từ khóa mutating trước function đó, vd:

struct Counter {
  private var value = 0
  mutating func next() { 
    value += 1
  } 
}

//sử dụng: chỉ áp dụng được cho khai báo var
var counter = Counter() 
counter.next()
```

Struct ko thể kế thừa. Khác với class :

```
class MyView: NSView { } // works

struct MyInt: Int { } // error: inheritance from non-protocol type 'Int'

//nhưng với protocol thì ok
struct Vector: Hashable { ... } // works
```

### Sets trong Swift:

là 1 collection ko có thứ tự chứa những giá trị duy nhất & cùng 1 kiểu. vd:

```
var colors = Set<String>()

// có thể khai báo giá trị ban đầu:
var favoriteColors: Set<String> = ["Red", "Blue", "Green", "Blue"] //{"Blue", "Green", "Red"}
Cách làm việc với set

//intersect
let favoriteColors: Set = ["Red", "Blue", "Green"]
let newColors: Set = ["Purple", "Orange", "Green"]

let intersect = favoriteColors.intersect(newColors) // a AND b
// intersect = {"Green"}

// -------------------------------------------
//Tất cả giá trị với set -> union
let union = favoriteColors.union(newColors) // a OR b
// union = {"Red", "Purple", "Green", "Orange", "Blue"}

// -------------------------------------------
// Lấy những giá trị riêng giữa 2 set -> exclusiveOr
let exclusiveOr = favoriteColors.exclusiveOr(newColors) // a XOR b
// // exclusiveOr = {"Red", "Purple", "Orange", "Blue"}

// -------------------------------------------
// Giá trị ko tồn tại trong set - >subtract
let subtract = favoriteColors.subtract(newColors) // a - (a AND b) 
// subtract = {"Blue", "Red"}

// -------------------------------------------
favoriteColors.insert("Orange")
let removedColor = favoriteColors.remove("Red")

if favoriteColors.contains("Blue") 
{ 
  print("Who doesn't like blue!")
}
```

**Cách để add custom type vào set**

```
struct Starship: Hashable {
  let name: String
  var hashValue: Int { return name.hashValue }
}

func ==(left:Starship, right: Starship) -> Bool { 
  return left.name == right.name
}

//Tạo Set của Starship
let ships : Set<Starship> = [
  Starship(name:"Enterprise D"), 
  Starship(name:"Voyager"), 
  Starship(name:"Defiant") 
]
Dictionary trong swift
Cách khai báo:

var books : Dictionary<Int, String> = Dictionary<Int, String>()

//hoặc
var books = [Int: String]()
//hoặc
var books: [Int: String] = [:]
//hoặc
var books: [Int: String] = [1: "Book 1", 2: "Book 2"]

// Try cập:
let bookName = books[1]

for book in books.values { 
  print("Book Title: \(book)")
}
//output: Book Title: Book 2
//output: Book Title: Book 1

for bookNumbers in books.keys { 
  print("Book number: \(bookNumber)")
}
// outputs:
// Book number: 1
// Book number: 2
```

### Optionals trong Swift:

Optional Value và Optional Enum:
Kiểu Optional : kiểm tra giá trị có tồn tại hay ko. Kiểu như: "Có giá trị, thì nó sẽ bằng x" hoặc là "sẽ ko có giá trị nào cả"

vd:

```
let x: String? = "Hello Qui"

if let y = x {
    print(y)
}

// Neu khai bao : let x: String? = nil
// Thi se ko in ra duoc gi ca
- String? cũng chính là : Optional, ở vd trên nếu như ta in : print(x.dynamicType) thì sẽ có kết quả là Optional

- Optional<> được khai báo như sau:

enum Optional<Wrapped> {
/// The absence of a value.
case none
/// The presence of a value, stored as `Wrapped`.
 case some(Wrapped)
}
```

? và ! là 2 cách thể hiện Optionals trong Swift, vd:

```
var numberOne: Int! = nil 

var numberTwo: Int? = nil
```

? được dùng trong trường hợp giá trị chưa chắc là nil hay ko, trường hợp này thường sử dụng để chuyển String thành số, để check hợp lệ hay ko

```
let str1 = "42"
let num1: Int? = Int(str1) // 42
let str2 = "Hello, World!"
let num2: Int? = Int(str2) // nil
! được sử dụng trong trường hợp chắc chắn là type sẽ có giá trị đúng.

//myButton will not be accessed until viewDidLoad is called, 
//so a ! optional can be used here
var myButton: UIButton!
override func viewDidLoad(){
    self.myButton = UIButton(frame: self.view.frame)
    self.myButton.backgroundColor = UIColor.redColor()
    self.view.addSubview(self.myButton)
}
```

**Cách sử dụng Optional:**

```
//nếu number là nil thì sẽ ko bị crash
var number: Int?
if let unwrappedNumber = number {
    // Has `number` been assigned a value?
    print("number: \(unwrappedNumber)")// Will not enter this line
} else
{
    print("number was not assigned a value")
}
Hoặc sử dụng guard statement:

var number: Int?
guard let unwrappedNumber = number else {
    return
}
print("number: \(unwrappedNumber)")
Nil Coalescing:

func fallbackIfNil(str: String?) -> String {
    return str ?? "Fallback String"
}
print(fallbackIfNil(str: "Hi")) // Prints "Hi"
print(fallbackIfNil(str: nil)) // Prints "Fallback String"
```

### Condition trong Swift

Guard:

```
func printNum(num: Int) {
    guard num == 10 else {
        print("num is not 10")
        return
        
    }
    print("num is 10")
}
```

Nil-Coalescing Operator: ??

```
let defaultSpeed:String = "Slow"
var userEnteredSpeed:String? = nil

print(userEnteredSpeed ?? defaultSpeed) // outputs "Slow"

userEnteredSpeed = "Fast"
print(userEnteredSpeed ?? defaultSpeed) // outputs "Fast"
```

### Protocols trong swift

Gần giống với interface trong các ngôn ngữ khác.
Protocol có thể kế thừa từ Protocol khác
Protocol thì qui định các interfaces mà có thể được implmenet bởi struct, class hoặc enum

```
protocol MyProtocol {
    init(value: Int)
    func doSomething() -> Bool
    var message: String { get }
    var value: Int { get set }
    subscript(index: Int) -> Int { get }
    static func instructions() -> String
    static var max: Int { get }
    static var total: Int { get set }
}
```

**Sử dụng:**

```
struct MyStruct : MyProtocol {
// Implement the protocol's requirements here
}


class MyClass : MyProtocol {
// Implement the protocol's requirements here
}


enum MyEnum : MyProtocol {
case caseA, caseB, caseC
// Implement the protocol's requirements here
}
```

1 protocol có thể được define default implementation thông qua extension như sau:

```
extension MyProtocol {
// default implementation of doSomething() -> Bool
// conforming types will use this implementation if they don't define their own
    func doSomething() -> Bool {
        print("do something!")
        return true
    }
}
```

Protocol có thể sử dụng như 1 type:

```
func doStuff(object: MyProtocol) {
    // All of MyProtocol's requirements are available on the object print(object.message)
    print(object.doSomething())
}
let items : [MyProtocol] = [MyStruct(), MyClass(), MyEnum.caseA]
```

**Delegate pattern: sử dụng protocol**

ví dụ có 2 class Parent() , class Child(), và bây giờ mình muốn có thông báo đến thằng cha khi thằng con có sự thay đổi.

Sẽ implement như sau:

```
protocol ChildDelegate: class {
    func childDidSomething()
}

class Child {
    weak var delegate: ChildDelegate?
}

class Parent: ChildDelegate { 
   ...
   func childDidSomething() 
   { 
      print("Yay!")
   }
}

//Trong Parent xử lý:
let child = Child() 
child.delegate = self
```

Mặc định trong swift thì protocol không chấp nhận việc cài đặt optional function. Điều này chỉ có thể làm được khi protocol được đánh dấu @objc & optional đặt ở method.

Ví dụ: UITableView cài đặt behavior chung cho 1 table view trong iOS, nhưng mà user phải cài đặt 2 delegate : UITableViewDelegate & UITableViewDataSource.

Những hàm mà ko được đánh dấu là optional trong protocol thì bắt buộc phải implement.

**Implementing Hashable protocol**

```
struct Cell {
    var row: Int
    var col: Int
    init(_ row: Int, _ col: Int) {
        self.row = row
        self.col = col
    }
}

extension Cell: Hashable {
    // Satisfy Hashable requirement
    var hashValue: Int {
        get {
            return row.hashValue^col.hashValue
            
        }
    }
    // Satisfy Equatable requirement
    static func ==(lhs: Cell, rhs: Cell) -> Bool {
        return lhs.col == rhs.col && lhs.row == rhs.row
    }
}

// Now we can make Cell as key of dictonary
var dict = [Cell : String]()
dict[Cell(0, 0)] = "0, 0"
dict[Cell(1, 0)] = "1, 0"
dict[Cell(0, 1)] = "0, 1"

// Also we can create Set of Cells
var set = Set<Cell>()
set.insert(Cell(0, 0))
set.insert(Cell(1, 0))
```