Part 1: https://viblo.asia/p/ios-swift-tong-hop-tat-ca-tu-khoa-trong-ngon-ngu-swift-part-1-E375zEAdlGW

Part 2: https://viblo.asia/p/ios-swift-tong-hop-tat-ca-tu-khoa-trong-ngon-ngu-swift-part-2-naQZRwrvlvx

Part 3: https://viblo.asia/p/ios-swift-tong-hop-tat-ca-tu-khoa-trong-ngon-ngu-swift-part-3-gGJ59gepZX2

### Keywords Using Patterns
**_** : Nói chung là bỏ qua giá trị khi nó match dc đó.

```
for _ in 0..<3 {
    print("Just loop 3 times, index has no meaning")
}

hoặc

let _ = Singleton() //Ignore value or unused variable
``` 

### Keywords Using #
**#available** : Kiểm tra điều kiện lúc runtime, ví dụ như kiểm tra version ios.

```
if #available(iOS 10, *) {
    print("iOS 10 APIs are available")
}
```
-----
**#colorLiteral** : ra bộ chọn màu.

```
let aColor = #colorLiteral //Brings up color picker
```
-----
**#column** : Biết mình đang ở cột nào.

```
class Person {
    func printInfo() {
        print("Some person info - on column \(#column)") 
    }
}
let aPerson = Person()
aPerson.printInfo() //Some person info - on column 53
```
-----
**#if #elseif #else #endif** : Kiểm tra điều kiện như là đang xài hệ điều hành nào, version bao nhiêu…

```
#if os(iOS)
    print("Compiled for an iOS device")
#elseif os(macOS)
    print("Compiled on a mac computer")
#endif
```
-----
**#file** : Trả về tên file chứa nó.

```
class Person {
    func printInfo() {
        print("Some person info - inside file \(#file)") 
    }
}

let aPerson = Person()
aPerson.printInfo() //Some person info - inside file /*file path to the Playground file I wrote it in*/
```
-----
**#function** :trả về tên của function chứa nó, trong getter, setter thì sẽ trả về tên thuộc tính, trong 1 số hàm như init hoặc subscript thì sẽ trả về tên của từ khoá đó, nếu đặt ở ngay đầu file thì sẽ trả về tên của module hiện tại.

```
class Person {
    func printInfo() {
        print("Some person info - inside function \(#function)") 
    }
}

let aPerson = Person()
aPerson.printInfo() //Some person info - inside function printInfo()
```
-----
**#imageLiteral** : show nguyên kho hình lên cho mình chọn.

```
let anImage = #imageLiteral //Brings up a picker to select an image inside the playground file
```
-----
**#line** : Trả về số dòng hiện tại.

```
class Person {
    func printInfo() {
        print("Some person info - on line number \(#line)") 
    }
}
let aPerson = Person()
aPerson.printInfo() //Some person info - on line number 5
```
-----
**#selector** : nói chung là đảm bảo hàm nào đó tồn tại và gắn vào 1 action nào đó.

```
//Static checking occurs to make sure doAnObjCMethod exists
control.sendAction(#selector(doAnObjCMethod), to: target, forEvent: event)
```
-----
**#sourceLocation** : gọi dòng này xong là reset số dòng với tên file, không còn đúng như trước lúc gọi.

```
#sourceLocation(file:"foo.swift", line:6)
//Reports new values
print(#file)
print(#line)
//This resets the source code location back to the default values numbering and filename
#sourceLocation()
print(#file)
print(#line)
```

### Keywords For Specific Context(s)

**convenience** : đúng theo nghĩa của nó là tiện lợi, chạy dựa trên designated initializer, mình có viết 1 bài về nó ở đây.

```
class Person {
    var name:String
    init(_ name:String) {
        self.name = name
    }
    convenience init() {
        self.init("No Name")
    }
}

let me = Person()
print(me.name)//Prints "No Name"
```
-----
**dynamic** : Nói chung là chạy bằng Objective-C runtime và Swift runtime sẽ cho ra kết quả khác nhau, thêm dynamic vào thì coi như nó chạy bằng Objective-C runtime.

```
class Person {
    //Implicitly has the "objc" attribute now too
    //This is helpful for interop with libs or
    //Frameworks that rely on or are built
    //Around Obj-C "magic" (i.e. some KVO/KVC/Swizzling)
    dynamic var name:String?
}
```
-----
**didSet** : sau khi gán xong thì nó sẽ thực hiện câu lệnh bên trong didSet

```
var data = [1,2,3] {
    didSet {
        tableView.reloadData()
    }
}
```
-----
**final** : Ngăn không cho kế thừa nữa.

```
final class Person {}
class Programmer : Person {} //Compile time error
```
-----
**get** : dùng để trả về giá trị 1 giá trị nào đó.

```
class Person {
    var name:String {
        get { return self.name }
        set { self.name = newValue}
    }
    var indirectSetName:String {
        get {
            if let aFullTitle = self.fullTitle {
                return aFullTitle
            }
            return ""
        }
        set (newTitle) {
            //If newTitle was absent, newValue could be used
            self.fullTitle = "\(self.name) :\(newTitle)"
        }
     }
}
```

**indirect** : Chỉ ra enum có 1 case khác liên quan tới giá trị của 1 hoặc nhiều case trong enum đó

```
indirect enum Entertainment {
    case eventType(String)
    case oneEvent(Entertainment)
    case twoEvents(Entertainment, Entertainment)
}

let dinner = Entertainment.eventType("Dinner")
let movie = Entertainment.eventType("Movie")
let dateNight = Entertainment.twoEvents(dinner, movie)
```
-----
**lazy** : biến nào có lazy thì nó chỉ được tính toán khi nó được gọi ra, giúp tiết kiệm bộ nhớ hơn.

```
class Person {
    lazy var personalityTraits = {
        //Some crazy expensive database  hit
        return ["Nice", "Funny"]
    }()
}

let aPerson = Person()
aPerson.personalityTraits //Database hit only happens now once it's accessed for the first time
```
-----
**mutating** : Cho phép thay đổi giá trị của thuộc tính của struct hoặc enum.

```
struct Person {
    var job = ""
    
    mutating func assignJob(newJob:String) {
        self = Person(job: newJob)
    }
}

var aPerson = Person()
aPerson.job //""
aPerson.assignJob(newJob: "iOS Engineer at Buffer")
aPerson.job //iOS Engineer at Buffer
```
-----
**nonmutating** : Chỉ ra rằng hàm setter không thay đổi được instance chứa nó.

```
enum Paygrade {
    case Junior, Middle, Senior, Master
    var experiencePay:String? {
        get {
            database.payForGrade(String(describing:self))
        }
        nonmutating set {
            if let newPay = newValue {
                database.editPayForGrade(String(describing:self), newSalary:newPay)
            }
        }
    }
}

let currentPay = Paygrade.Middle
//Updates Middle range pay to 45k, but doesn't mutate experiencePay
currentPay.experiencePay = "$45,000"
```
-----
**optional** : Sử dụng để khai báo hàm optional trong protocol.

```
@objc protocol Foo {
    func requiredFunction()
    @objc optional func optionalFunction()
}

class Person : Foo {
    func requiredFunction() {
        print("Conformance is now valid")
    }
}
```
-----
**override** : Chỉ ra rằng lớp con đang ghi đè lên biến hoặc hàm của lớp cha

```
class Person {
    func printInfo() {
        print("I'm just a person!")
    }
}

class Programmer : Person {
    override func printInfo() {
        print("I'm a person who is a dev!")
    }
}
let aPerson = Person()
let aDev = Programmer()
aPerson.printInfo() //I'm just a person!
aDev.printInfo() //I'm a person who is a dev!
```
-----
**required** : đảm bảo rằng mọi lớp con phải thực thi hàm khởi tạo cho trước.

```
class Person {
    var name:String?
    required init(_ name:String) {
        self.name = name
    }
}
class Programmer : Person {
    //Excluding this init(name:String) would be a compiler error
    required init(_ name: String) {
        super.init(name)
    }
}
```
-----
**set** : trong hàm set có thể làm gì thì làm, set giá trị cho chính property chứa nó hoặc property khác cũng được.

```
class Person {
    var name:String {
        get { return self.name }
        set { self.name = newValue}
    }
    var indirectSetName:String {
        get {
            if let aFullTitle = self.fullTitle {
                return aFullTitle
            }
            return ""
        }
        set (newTitle) {
            //If newTitle was absent, newValue could be used
            self.fullTitle = "\(self.name) :\(newTitle)"
        }
    }
}
```
-----
**Type** : có thể là class type, struct type, enum type hoặc protocol type.

```
class Person {}
class Programmer : Person {}
let aDev:Programmer.Type = Programmer.self
```
-----
**unowned** : Cho phép 1 instance tham chiếu tới 1 instance khác mà không làm tăng reference count, đảm bảo rằng instance đã tham chiếu tới có lifetime bằng hoặc lâu hơn chính nó.

```
class Person {
    var occupation:Job?
}

//Khi nào người mất thì job mới mất
class Job {
    unowned let employee:Person
    
    init(with employee:Person) {
        self.employee = employee
    }
}
```
-----
**weak** : Cho phép 1 instance tham chiếu tới 1 instance khác mà không làm tăng reference count, nhưng instance đã tham chiếu kia có lifetime ngắn hơn (có thể bị huỷ trước)

```
class Person {
    var residence:House?
}

class House {
    weak var occupant:Person?
}

var me:Person? = Person()
var myHome:House? = House()
me!.residence = myHome
myHome!.occupant = me
me = nil
myHome!.occupant //Is now nil
```
-----
**willSet** : bên trên có cái didSet là khi nào gán xong mới chạy mấy câu lệnh bên trong, còn willSet thì được gọi ngay trước khi biến được gán đâu đó. Nó có newValue là giá trị sẽ được gán đó.

```
class Person {
    var name:String? {
        willSet(newValue) {print("I've got a new name, it's \(newValue)!")}
    }
}

let aPerson = Person()
aPerson.name = "Jordan" //Prints out "I've got a new name, it's Jordan!" right before name is assigned to
```