Properties liên kết các giá trị với một class, structure hay enumeration cụ thể. Stored properties lưu trữ các giá trị constant và variable như là một phần của một instance, trong khi computed properties có nhiệm vụ tính toán hơn là lưu trữ một giá trị. Computed properties được cung cấp bởi class, structure và enums. Stored properties được cung cấp bởi chỉ class và structure.
Stored và computed properties thường được liên kết với instance của một loại (type) cụ thể. Tuy nhiên, properties cũng có thể tự liên kết với type. Những properties như vậy được biết đến như là type properties. Ngoài ra, ta còn có thể định nghĩa property observers để theo dõi sự thay đổi giá trị của property.

### Stored Properties
Một stored property là một constant hoặc variable được lưu trữ như là một phần của instance thuộc về một class hoặc structure cụ thể. Stored properties có thể là variable stored properties (với từ khoá var) hoặc constant stored properties (với từ khoá let).

**Stored Properties của Structure Instance constant**

Nếu ta tạo ra một instance của một structure và gán instance đó cho một constant, ta không thể chỉnh sửa các thuộc tính của instance, thậm chí nếu chúng được khai báo như là variable properties:

```
struct SuperMarket {
    var address: String
    let size: String
}
let vinMart = SuperMarket(address: "Danang", size: "small")
vinMart.address = "Dalat"
// Error in compiler
```

Ở đây, vinMart được khai báo như một constant, vì vậy ta không thể thay đổi giá trị của address, dù cho address là một variable property. Hành vi này xuất phát từ lý do structures là value types. Khi một instance của value type được khai báo là constant, thì tất cả các properties của nó cũng vậy. 
Tuy nhiên, điều này lại không đúng với class (reference type). Nếu ta gán một instance của reference type cho một constant, ta vẫn có thể thay đổi variable properties của instance đó.

**Lazy Stored Properties**

Một lazy stored property là một property có giá trị khởi tạo không được tính toán cho đến lần sử dụng đầu tiên của nó. Sử dụng từ khoá lazy để khai báo một lazy stored property. Lazy property luôn là một variable (với từ khoá var), bởi giá trị khởi tạo của nó sẽ không được truy cập cho đến khi quá trình khởi tạo instance được hoàn thành. Trong khi đó, constant properties luôn phải có giá trị trước khi sự khởi tạo được hoàn tất, vì thế, nó không thể là một lazy.

Lazy properties rất hữu ích trong trường hợp giá trị khởi tạo của property phụ thuộc vào các yếu tố bên ngoài, mà chưa xác định được giá trị cho đến khi việc khởi tạo một instance được hoàn thành. Nó cũng hữu ích khi giá trị khởi tạo này yêu cầu những thiết lập phức tạp hay tính toán nhiều, những công việc chỉ nên được thực hiện một khi cần thiết.

```
class LoadImage {
    /*
     LoadImage is a class to load image from an external resource.
     The class is assumed to take a nontrivial amount of time to initialize.
     */
    var imageData = "data.txt"
}
 
class ImageManager {
    lazy var loader = LoadImage()
    var data = [String]()
}
 
let manager = ImageManager()
manager.data.append("Image data")
```

Trong ví dụ trên, property loader vẫn chưa được khởi tạo, nó chỉ được khởi tạo trong lần truy cập đầu tiên, điều này sẽ giúp ta giảm thiểu lãng phí tài nguyên.

Stored Properties and Instance Variables

### Computed Properties
Ngoài stored properties, class, structure và enums còn định nghĩa computed properties, một loại property không thật sự lưu trữ value, thay vào đó, nó cung cấp getter và optional setter để nhận và set những properties và giá trị một cách gián tiếp.
Hãy xem qua ví dụ sau:
```
struct Point {
    var x = 0.0, y = 0.0
}
struct Size {
    var width = 0.0, height = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set(newCenter) {
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
var square = Rect(origin: Point(x: 0.0, y: 0.0),
                  size: Size(width: 10.0, height: 10.0))
let initialSquareCenter = square.center
square.center = Point(x: 15.0, y: 15.0)
print("square.origin is now at (\(square.origin.x), \(square.origin.y))")
// Prints "square.origin is now at (10.0, 10.0)"
```

Property center trong struct Rect là một computed property. Nó nhận giá trị của origin và size để cho ra giá trị của mình, đồng thời khi được set giá trị mới, nó sẽ làm thay đổi giá trị của origin và size tương ứng.

### Property Observers
Property observers quan sát và phản hồi sự thay đổi trong giá trị của property. Property observers được gọi mỗi khi một giá trị của property được thiết lập, thậm chí trong trường hợp giá trị mới giống với giá trị hiện tại của nó. Ta có thể thêm property observers vào bất cứ stored properties nào mà ta định nghĩa, ngoại trừ lazy. Ta cũng có thể thêm nó vào bất kỳ properties kế thừa nào được overriding trong subclass.
Ta định nghĩa observer cho một properties bằng các lựa chọn sau:
- Sử dụng willSet, được gọi trước khi giá trị được lưu trữ
- Sử dụng didSet, được gọi ngay khi một giá trị mới được lưu trữ

```
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("About to set totalSteps to \(newTotalSteps)")
        }
        didSet {
            if totalSteps > oldValue  {
                print("Added \(totalSteps - oldValue) steps")
            }
        }
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
// About to set totalSteps to 200
// Added 200 steps
stepCounter.totalSteps = 360
// About to set totalSteps to 360
// Added 160 steps
stepCounter.totalSteps = 896
// About to set totalSteps to 896
// Added 536 steps
```


### Type Properties
Instance properties là những properties thuộc về một instance của một type cụ thể. Mỗi lần ta tạo mới một instance của type đó, nó có tập hợp những giá trị của property riêng, độc lập với các instance khác. Ngược lại, type properties là những properties chỉ có duy nhất một bản sao của nó, mặc cho bao nhiêu instances được tạo ra.

Khai báo stored và computed type properties với từ khoá static.
```
struct SomeStructure {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 1
    }
}
enum SomeEnumeration {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 6
    }
}
class SomeClass {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 27
    }
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}
```
Type properties được gọi đến bằng dấu chấm, giốnh như instance properties. Tuy nhiên, type properties được truy vấn bởi type, không phải instance của type đó. Hãy xem qua ví dụ sau:
```
print(SomeStructure.storedTypeProperty)
// Prints "Some value."
SomeStructure.storedTypeProperty = "Another value."
print(SomeStructure.storedTypeProperty)
// Prints "Another value."
print(SomeEnumeration.computedTypeProperty)
// Prints "6"
print(SomeClass.computedTypeProperty)
// Prints "27"
```

Ta đã cùng nhau tìm hiểu các loại properties trong Swift, hy vọng các bạn hiểu thêm được và vận dụng một cách hiệu quả chúng vào dự án của mình.