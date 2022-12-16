Ở bài viết này mình sẽ đề cập một số vấn đề:
   - Generics là gì?
   - Tại sao nên sử dụng chúng
   - Làm thế nào để viết generic function.
   - Làm thế nào để mở rộng loại generics
   - Cách dùng generic vào enum
  
###  Generic là gì?
Đầu tiên mình tạo ra một hàm cộng 2 số đơn giản sau:
```
func add(x: Int, y: Int) -> Int {
  return x + y
}
```
    
 Hàm trên trả về tổng của 2 số kiểu Int, vậy bây giờ mình muốn dùng hàm này cho các loại khác thì mình phải viết lại chúng, vd :
 ```
func add(x: Float, y: Float) -> Float {
  return x + y
}
func add(x: Double, y: Double) -> Double {
  return x + y
}
```

Điều này làm thêm nhiều dòng code lặp lại, gây nhàm chán và lãng phí thời gian. Vậy có cách nào để ta có thể viết một hàm và dùng nó cho nhiều loại dữ liệu khác nhau ???. Chúng ta có thể sử dụng Generics vào các trường hợp như vậy, bạn cứ nghĩ đơn giản Generics tức là mình viết một cái chung chung có thể dùng lại cho nhiều loại dữ liệu khác nhau. 
Trước hêt mình xin đưa ra một vài kiểu generic của Swift.

### Các vd của Swift Generics 
   Bạn có thế không nhận ra, nhưng một vài cấu trúc chung các bạn thường dùng như arrays, dictionaries và optionals là loại generic.
  **Arrays**
      Xét đoạn code sau:
      
```
 let numbers = [1,2,3]
 let firstNumber = numbers[0]
```
    
   Ở đây bạn chỉ đơn giản tạo một array gồm 3 số và lấy số đầu tiên của mảng.
   Bây giờ, bạn ấn option-click, chỉ vào numbers và firstNumber. Bạn thấy gì?
    
   ![](https://images.viblo.asia/f5ea3275-d384-48d1-9861-5386ecfdee90.png)
    
   Bạn có thể thấy chúng tự suy luận kiểu dữ liệu cho Array dựa vào thành phần khởi tạo, ở đây numbers sẽ là một Array Int và firstNumber là Int.
   Array của swift là một loại Generics. Loại Generics yêu cầu một loại tham số khởi tạo chỉ kiểu dữ liệu rõ ràng phải rõ ràng. 
   Trong trường hợp bạn không khai báo kiểu dữ liệu thì chúng sẽ tự suy luận dựa theo tham số khi khởi tạo, như trong vd trên vì tham số là kiểu 1,2,3 kiểu Int nên chúng tự suy luận ra loại dữ liệu của array là Int.
    
```
var numbersAgain: Array<Int> = []
numbersAgain.append(1)
numbersAgain.append(2)
numbersAgain.append(3)

let firstNumberAgain = numbersAgain[0] // 1
numbersAgain.append("four") // Bị báo "Cannot convert value of type ‘String’ to expected argument type ‘Int’"
```
Ở trên mình đã tạo ra numbersAgain kiểu Array Int, tại dòng cuối cùng mình thêm 1 String vào Array thì trình biên dịch sẽ báo lỗi, nó yêu cầu giá trị đầu vào phải là kiểu Int (cùng loại với kiểu các phần tử của Array). ---> Như bạn thấy hàm append được viết một cách chung chung nhất để dùng được cho các kiểu dữ liệu khác nhau (dựa vào loại dữ liệu của Array) và nó được gọi là **generic method**.

**Dictionaries**
    Dictionaries cũng là một loại generic, xem vd sau:
```
let countryCodes = ["Arendelle": "AR", "Genovia": "GN", "Freedonia": "FD"]
let countryCode = countryCodes["Freedonia"]
```
Giống như trên bạn check thử countryCodes thì nó sẽ báo là kiểu dictionary của String : String

**Optionals**
trong vd trên bạn check loại dữ liệu của countryCode là String?, nó chính là viết tắt của Optional<String>
    lại một lần nữa một thấy "< >" :]]. Bạn có thấy quen không?  Generics xuất hiện ở khắp mọi nơi trong Swift.
    Ở đây trình biên dịch cho phép bạn truy cập vào kiểu từ điển dựa vào KeyString, vì có thể các giá trị của keyString có thể là nil nên nó phải trả về kiểu Optional.
    
###   Viết một Generic Data Struct
 ```
struct Queue<Element> {
}
 ```
 
 Ở trên mình khai báo một kiểu Queue là generic, Element ở đây nó sẽ là một kiểu dữ liệu nào đó sẽ được định nghĩa lúc khởi tạo.
    
```
struct Queue<Element> {
    fileprivate var elements: [Element] = []
    mutating func enqueue(newElement: Element) {
        elements.append(newElement)
    }
    
    mutating func dequeue() -> Element? {
        guard !elements.isEmpty else { return nil }
        return elements.remove(at: 0)
    }
}


var q = Queue<Int>()

q.enqueue(newElement: 4)
q.enqueue(newElement: 2)

q.dequeue()
q.dequeue()
q.dequeue()
q.dequeue()
```

 Trong đoạn code trên, chúng ta tạo ra Queue cho kiểu Int. Vậy trong trường hợp mình muốn tạo ra với biến String hay Float  thì chỉ cần bạn thay đội tham số trong cặp dấu ngoặc nhọn là xong: Queue<String>, Queue<Float>. Thật tiện lợi đúng không nào, thay vì phải viết lặp đi lặp lại nhiều dòng code thì chung ta chỉ cần tạo ra một kiểu chung chung và dùng lại cho nhiều trường hợp.
    
###    Writing a Generic Function

```
func pairs<Key, Value>(from dictionary: [Key: Value]) -> [(Key, Value)] {
    return Array(dictionary)
}
let somePairs = pairs(from: ["minimum": 199, "maximum": 299]) 
// result is [("maximum", 299), ("minimum", 199)]

let morePairs = pairs(from: [1: "Swift", 2: "Generics", 3: "Rule"]) 
// result is [(2, "Generics"), (3, "Rule"), (1, "Swift")]```
```
Cũng giống như trên bạn tạo ra một hàm pairs và kết quả trả về của nó là một Array tuple dựa vào kiểu đầu vào của nó.

### Constraining a Generic Type
Xét Vd sau:
```
func mid<T>(array: [T]) -> T? {
  guard !array.isEmpty else { return nil }
  return array.sorted()[(array.count - 1) / 2]
}
```

Ở đây chúng ta muốn viết ra một function trả về giá trị ở giữa các giá trị trong một mảng, nhưng vấn đề ở chỗ để hàm *sorted()* hoạt động được thì các phần tử của nó phải so sánh được với nhau tức là chúng phải phù hợp với *Comparable* propocol, thay đổi dòng code trên thành:

```
func mid<T: Comparable>(array: [T]) -> T? {
  guard !array.isEmpty else { return nil }
  return array.sorted()[(array.count - 1) / 2]
}

mid(array: [3, 5, 1, 2, 4]) // 3
```

Cũng tương tự như thế, nếu ta muốn viết một function Add dùng cho nhiều loại dữ liệu khác nhau thì phải đảm vào các loại giá trị đầu vào của nó phải "nó có thể cộng được" 

```
protocol Summable { static func +(lhs: Self, rhs: Self) -> Self }
extension Int: Summable {}
extension Double: Summable {}
extension String: Summable {}

func add<T: Summable>(x: T, y: T) -> T {
  return x + y
}

let addIntSum = add(x: 1, y: 2) // 3
let addDoubleSum = add(x: 1.0, y: 2.0) // 3
let addString = add(x: "Generics", y: " are Awesome!!! :]") //  "Generics are Awesome!!! :]"
```

Ở trên bạn tạo ra một protocol *Sumable* chỉ có duy nhất hàm + để xác nhận rằng các loại dữ liệu sử dụng nó phải có hàm +, ở trên trong các extention của Int, Double, String chúng ra không cần làm gì cả vì mặc định các loại dữ liệu này đã định nghĩa hàm + rồi. Nếu bạn tạo ra một loại dữ liệu nào đó thì phải viết hàm + để cho máy tính hiểu được cách + các loại dữ liệu của bạn.

### Extending a Generic Type
Bạn có thể dùng extension cho Generic nhưng lúc viết extension cho class.
```
extension Queue {
  func peek() -> Element? {
    return elements.first
  }
}

q.enqueue(newElement: 5)
q.enqueue(newElement: 3)
q.peek() // 5
```

### Subclassing a Generic Type
Bạn có dùng generic cho class và subclass của chúng, xét vd sau:
```
class Box<T> {
  // Just a plain old box.
}

class Gift<T>: Box<T> {
  // By default, a gift box is wrapped with plain white paper
  func wrap() {
    print("Wrap with plain white paper.")
  }
}

class Rose {
  // Flower of choice for fairytale dramas
}

class ValentinesBox: Gift<Rose> {
      // A rose for your valentine
      override func wrap() {
      print("Wrap with ♥♥♥ paper.")
    }
}

class Shoe {
  // Just regular footwear
}

class GlassSlipper: Shoe {
  // A single shoe, destined for a princess
}

class ShoeBox: Box<Shoe> {
  // A box that can contain shoes
}
```
Bây giờ chúng ta sẽ chạy thử:
```
let box = Box<Rose>() // A regular box that can contain a rose
let gift = Gift<Rose>() // A gift box that can contain a rose
let shoeBox = ShoeBox()

let valentines = ValentinesBox()

gift.wrap() // plain white paper
valentines.wrap() // ♥♥♥ paper
```

### Enumerations With Associated Values
```
enum Result<Value> {
  case success(Value), failure(Error)
}

enum MathError: Error {
  case divisionByZero
}

func divide(_ x: Int, by y: Int) -> Result<Int> {
  guard y != 0 else {
    return .failure(MathError.divisionByZero)
  }
  return .success(x / y)
}

let result1 = divide(42, by: 2) // .success(21)
let result2 = divide(42, by: 0) // .failure(MathError.divisionByZero)
```

### Tổng kết
Ở trên mình đã đưa ra một cái nhìn chung về Generic trong Swift, cách tạo và dùng chúng trong các loại enum, struct, class. Bạn có thể tham khảo nguồn bài viết ở đây:
https://www.raywenderlich.com/154371/swift-generics-tutorial-getting-started