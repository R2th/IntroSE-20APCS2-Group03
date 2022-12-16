Trong phần cuối của series này, bài viết sẽ giới thiệu nốt những phần thay đổi còn lại giữa swift 3 và swift 4, những chi tiết thay đổi ở phần cuối này cũng rất quan trọng cho việc lập trình của các bạn sau này. Hãy bắt đầu nào.

# Chuỗi nhiều dòng
Trong swift 3 để tạo một chuỗi nhiều dòng thì bạn sẽ xem kí tự đặc biệt là ```\n``` thêm vào mỗi dòng mà bạn muốn tạo nên, ví  dụ như sau 
```swift
let multipleLinesSwift3 = "You can \"escape\" all of the double quotes within the text \n by formatting it with a \"\\\" backslash before each and every single double quote that appears out there \n and insert inline \\n symbols before each and every new line of text \n in order to display the string on multiple lines in Swift 3.”
```

Ở trong swift 4 thì cách làm lại hoàn toàn khác biệt, bạn tạo ra dòng mới bằng cách thêm ba dấu ngoặc kép.
```swift
let multiLineStringSwift4 = """
You can display strings
on multiple lines by placing a
\""" delimiter on a separate line
both right at the beginning
and exactly at the very
end of it
and don't have to "escape" double quotes
"" in Swift 4.
"""
```

# Generic Subscripts
Ở trong Swift 4 cho phép bạn tạo các kiểu generic subscript: bao gồm cả subscript của parameter và kiểu trả về có thể là generic. Dưới đây là kiểu non-generic subscript trong swift 3 để tìm kiếm giá trị max và min trong array :

```swift
// 1
extension Array where Element: Comparable {
  // 2
  subscript(minValue: Element, maxValue: Element) -> [Element] {
    // 3
    var array: [Element] = []
    // 4
    if let minimum = self.min(), minimum == minValue {
      // 5
      array.append(minValue)
    }
    // 6 
    if let maximum = self.max(), maximum == maxValue {
      array.append(maxValue)
    }
    // 7
    return array
  }
}
```

Đây là ví dụ về hoạt động của đoạn subscript trên cho array của số và chuỗi.
```swift
let primeNumbers = [3, 7, 5, 19, 11, 13]
 
let noMinOrMaxNumber = primeNumbers[5, 11] // []
let onlyMinNumber = primeNumbers[3, 13] // [3]
let justMaxNumber = primeNumbers[7, 19] // [19]
let bothMinAndMaxNumbers = primeNumbers[3, 19] // [3, 19]
 
let greetings = ["Hello", "Hey", "Hi", "Goodbye", "Bye"]
 
let noFirstOrLastGreeting = greetings["Hello", "Goodbye"] // []
let onlyFirstGreeting = greetings["Bye", "Hey"] // ["Bye"]
let onlyLastGreeting = greetings["Goodbye", "Hi"] // ["Hi"]
let bothFirstAndLastGreeting = greetings["Bye", "Hi"] // ["Bye", "Hi"]
```
Bạn có thể làm cho đoạn subscript này hoặt động với chuỗi ở swift 4 như sau :
```swift
extension Array where Element: Comparable {
  // 1
  subscript<T: Sequence>(type: String, sequence: T) -> [T.Element] where T.Element: Equatable {
    // 2
    var array: [T.Element] = []
    // 3
    if let minimum = self.min(), let genericMinimum = minimum as? T.Element, sequence.contains(genericMinimum) {
      array.append(genericMinimum)
    }
    if let maximum = self.max(), let genericMaximum = maximum as? T.Element, sequence.contains(genericMaximum) {
      array.append(genericMaximum)
    }
    
   return array
  }
}
```
Qua đoạn code trên thì đoạn subscripts đã thực sự hữu dụng hơn đối với cả array hoặc set.
```swift
let noMinOrMaxArray = [5, 11, 23]
let numberFirstArray = primeNumbers["array", noMinOrMaxArray] // []
 
let onlyMinNumberSet: Set<Int> = [3, 13, 2, 7]
let numberFirstSet = primeNumbers["set", onlyMinNumberSet] // [3]
 
let justMaxNumberArray = [7, 19, 29, 10]
let numberSecondArray = primeNumbers["array", justMaxNumberArray] // [19]
 
let bothMinAndMaxSet: Set<Int> = [3, 17, 19]
let numberSecondSet = primeNumbers["set", bothMinAndMaxSet] // [3, 19]
 
let noFirstOrLastArray = ["Hello", "Goodbye"]
let stringFirstArray = greetings["array", noFirstOrLastArray] // []
 
let onlyFirstSet: Set<String> = ["Bye", "Hey", "See you"]
let stringFirstSet = greetings["set", onlyFirstSet] // ["Bye"]
 
let onlyLastArray = ["Goodbye", "Hi", "What's up?"]
let stringSecondArray = greetings["array", onlyLastArray] // ["Hi"]
 
let bothFirstAndLastSet: Set<String> = ["Bye", "Hi"]
let stringSecondSet = greetings["set", bothFirstAndLastSet] // ["Bye", "Hi"]
```

# String là Collection
String là Collection ở trong swift  4, bạn có thể sử dụng chúng như là array hoặc sequence và làm những công việc như array hoặc sequence. Dưới đây là ví dụ về cách bạn filter đoạn string swift 3:
```swift
let swift3String = "Swift 3"
var filteredSwift3String = ""
 
for character in swift3String.characters {
  let string = String(character)
  let number = Int(string)
  
  if number == nil {
    filteredSwift3String.append(character)
  }
}
```
Bạn sử dụng vòng lặp ```for in ``` để kiểm tra từng kí tự. Từng kí tự được ép kiểu thành chuỗi và bạn check xem chuỗi đó có thực sự là số hạng không. Cuối cùng bạn thêm kí tự được kiểm tra đó vào trong một chuỗi kết quá nếu nó thoả mãn điều kiện.

Swift 4 cho phép bạn làm điều trên dựa vào kĩ thuật lập trình hướng cấu trúc vào trong chính chuỗi đó.
```swift
let swift4String = "Swift 4”
let filteredSwift4String = swift4String.filter{Int(String($0)) == nil}
```
Swift 3 trả về một chuỗi khi tạo chuỗi khác từ string
```swift
let swift3SpaceIndex = swift3String.characters.index(of: " ")
let swift3Substring = swift3String.substring(to: swift3SpaceIndex!)
```
Bạn có thể lấy đoạn substring từ string bằng hàm ```substring(to:)```. Swift 4  có một cách lấy substring hoàn toàn mới.
```swift
let swift4SpaceIndex = swift4String.index(of: " ")
let swift4Substring = swift4String[..<swift4SpaceIndex!]
```

# Cải thiện tham chiếu từ Objective-C
Swift 3 sẽ tự động thêm vào ```@objc``` cho các selector hoặc key path sử dụng các thuộc tính hoặc hàm đến từ Objective-C
```swift
class ObjectiveCClass: NSObject {
   let objectiveCProperty: NSObject
   func objectiveCMethod() {}
  
  init(objectiveCProperty: NSObject) {
    self.objectiveCProperty = objectiveCProperty
  }
}
 
let selector = #selector(ObjectiveCClass.objectiveCMethod)
let keyPath = #keyPath(ObjectiveCClass.objectiveCProperty)
```

Swfit 4 yêu cầu bạn phải tự thêm vào kí hiệu để mọi thứ hoạt động 
```swift
class ObjectiveCClass: NSObject {
 @objc let objectiveCProperty: NSObject
 @objc func objectiveCMethod() {}
 // original code
}
```

# Tái cấu trúc Tuple ở trong Closure
Swift 3 cho phép bạn hoạt động ở bên trong các thành phần của tuple nếu nó được sử dụng như là các parameter ở trong closure.
```swift
let players = [(name: "Cristiano Ronaldo", team: "Real Madrid"), (name: "Lionel Messi", team: "FC Barcelona")]
let tupleDestructuring = players.map{name, team in (name.uppercased(), team.uppercased())}
```
Cách này không còn dùng được nữa ở trong swift 4 mà bạn sẽ phải thay thế bằng 1 trong 2 cách sau.
```swift
let tuple = players.map{player in (player.name.uppercased(), player.team.uppercased())}
```

Hoặc cách ngắn hơn dùng các biến như sau 
```swift
let shorthandArguments = players.map{($0.0.uppercased(), $0.1.uppercased())}
```
# Constrained Associated Types trong Protocols
```swift
protocol SequenceProtocol {
  associatedtype SpecialSequence: Sequence where SpecialSequence.Element: Equatable
}
```
Đầu tiên bạn một protocol của riêng bạn và bạn thêm vào kiểu tuỳ  thuộc vào nó mà phải thoả mãn protocol Sequence. Sau đó bạn sử dụng Where để gán các thuộc tính của sequence. 

Trên đây là tất cả những sự thay đổi khác biệt, cảm ơn các bạn đã  đón xem