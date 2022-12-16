Ở bài viết này mình sẽ nói về một số điểm mới trong Swift 4.1 (Xcode 9.3 trở lên)

# Tổng hợp hàm sẵn khi dùng Equatable và Hashable

protocol Equatable cho phép Swift có thể so sánh chúng với nhau. Khi chúng ta nói "5 == 5", Swift có thể so sánh được bởi vì kiểu Int thõa mãn protocol Equatable. Tức là các đối tượng hay các loai giá trị muốn so sánh được với nhau thì chúng phải thõa mãn protocol Equatable.

Tuy nhiên, việc dùng protocol có thể gây phiên nhiễu. Xét vd:
```
struct Person {
    var firstName: String
    var lastName: String
    var age: Int
    var city: String
}
```

Ở đây tôi tạo ra kiểu Person và muốn chúng có thể so sánh với nhau thì chúng phải thõa mãn protocol Equatable

```
struct Person: Equatable {
    var firstName: String
    var lastName: String
    var age: Int
    var city: String

    static func ==(lhs: Person, rhs: Person) -> Bool {
        return lhs.firstName == rhs.firstName && lhs.lastName == rhs.lastName && lhs.age == rhs.age && lhs.city == rhs.city
    }
}
```
 Như các bạn thấy, đoạn code trên cũng khá nhàm chán, không được đẹp mắt.
 
 Trong Swift 4,1 bạn có thể dùng Equatable - Nó có thể tự tạo ra phương thức "==", mặc định thì nó sẽ so sánh tất cả thuộc tính với nhau giống như đoạn code trên, Vì thể công việc hết sức khó khăn của bạn là chỉ thêm Equatable trước loại giá trị của bạn, và Swift sẽ làm hết phần còn lại.
 
 Tất nhiên, nếu thật sự bạn muốn code lại toán tử "==" thì bạn vẫn có thể làm như cũ được.
 
 Trong Swift 4.1 cũng đã tổng hợp sẵn protocol Hashable, điều này có nghĩa là thuộc tính hashValue sẽ được tạo tự động. Hashable có thể gây một chút phiền phức để sử dụng bởi vì bạn cần phải return lại một giá trị hash duy nhất cho mọi object. Điều này rất quan trọng, bởi vì nó cho phép bạn dùng objects như key của kiểu dictionary và lưu chúng trong các loại tập hợp.
 
 Trước đó chúng ta thường sử dụng nó kiểu thế này:
 
 ```
var hashValue: Int {
    return firstName.hashValue ^ lastName.hashValue &* 16777619
} 
 ```
 
 Cho đến hiện tại thì có vẻ nó đã không còn cần thiết đối với Swift 4.1, mặc đù đối với Equatable bạn vẫn muốn viết theo phương pháp riêng của bạn nếu nó thật sự cần. 
 
 Lưu ý: Phần tích hợp sẵn dùng khi so sánh tất cả các thuộc tính của là phù hợp với kiểu Equatable  hoặc Hashable.
 Xem thêm tại https://github.com/apple/swift-evolution/blob/master/proposals/0185-synthesize-equatable-hashable.md
 
#  Sử dụng Protocol dựa trên các điều kiện protocol trước đó.
 
 Trong swift 4.1
 ```
// 1 
class LeadInstrument: Equatable {
  let brand: String
  
  init(brand: String) {
    self.brand = brand
  }
  
  func tune() -> String {
    return "Standard tuning."
  }
  
  static func ==(lhs: LeadInstrument, rhs: LeadInstrument) -> Bool {
    return lhs.brand == rhs.brand
  }
}

// 2
class Keyboard: LeadInstrument {
  override func tune() -> String {
    return "Keyboard standard tuning."
  }
}

// 3
class Guitar: LeadInstrument {
  override func tune() -> String {
    return "Guitar standard tuning."
  }
}
 ```
 
 1) Tạo ra LeadInstrument phù hợp với Equatable. Nó có chứa một thuộc tính là brand và một phương thức tune().
 2)  Overide tune() trong Keyboard là  "Keyboard standard tuning."
 3)  Overide tune() trong Guitar là  "Guitar standard tuning."
 
  ```
// 1  
class Band<LeadInstrument> {
  let name: String
  let lead: LeadInstrument
  
  init(name: String, lead: LeadInstrument) {
    self.name = name
    self.lead = lead
  }
}

// 2
extension Band: Equatable where LeadInstrument: Equatable {
  static func ==(lhs: Band<LeadInstrument>, rhs: Band<LeadInstrument>) -> Bool {
    return lhs.name == rhs.name && lhs.lead == rhs.lead
  }
}
 ```
 
 1) Tạo ra một class Band là một generic của LeadInstrument. Mỗi Band sẽ có một name và một lead.
 2) Sử dụng where vào Band, làm nó phù hợp với Equatable trong tất cả các trường hợp  LeadInstrument phù hợp với Equatable.

```
// 1
let rolandKeyboard = Keyboard(brand: "Roland")
let rolandBand = Band(name: "Keys", lead: rolandKeyboard)
let yamahaKeyboard = Keyboard(brand: "Yamaha")
let yamahaBand = Band(name: "Keys", lead: yamahaKeyboard)
let sameBand = rolandBand == yamahaBand

// 2
let fenderGuitar = Guitar(brand: "Fender")
let fenderBand = Band(name: "Strings", lead: fenderGuitar)
let ibanezGuitar = Guitar(brand: "Ibanez")
let ibanezBand = Band(name: "Strings", lead: ibanezGuitar)
let sameBands = fenderBand == ibanezBand
```

Trong đoạn code trên, chúng ta đã tạo ra các loại Band và bạn có thể so sánh chúng trực tiếp với nhau nhờ vào sự tuân thủ các điều kiện đã định nghĩa ở trên.