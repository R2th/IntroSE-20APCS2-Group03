Trong bài viết trước chúng ta đã biết được một phần những thay đổi khác biệt giữa Swift 3 và 4, tiếp tục đến với phần 2 ta sẽ tìm hiểu thêm những sự thay đổi mới.

# Dictionary và Set
Dictionary và Set là hai cấu trúc lưu trữ dữ liệu hữu ích, nhưng chúng luôn thiếu một vài yếu tố cần thiết ở trong Swift 3. Vì lẽ đó mà ở trong Swift 4 đã nâng cấp chúng lên. Hãy bắt đầu với Dictionary.
Đầu tiên, đây là cách tạo dictionary bằng mảng các tuple ở trong swift 4.
```swift
let tupleArray = [("Monday", 30),  ("Tuesday", 25),  ("Wednesday", 27),  ("Thursday", 20),  ("Friday", 24),  ("Saturday", 22),  ("Sunday", 26)]
let dictionary = Dictionary(uniqueKeysWithValues: tupleArray)
```
Bạn sử dụng hàm khởi tạo của dictionary ```init(uniqueKeysWithValues:)``` để tạo một dictionary hoàn toàn mới từ mảng các tuple. Mỗi tuple là một bản ghi về nhiệt độ các ngày trong tuần, vì vậy key của nó là ngày còn giá trị chính là nhiệt độ.
Nếu bạn có sẵn hai mảng chứa key và giá trị, bạn vẫn có thể xây dựng như sau:
```swift
let keys = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let values = [30, 25, 27, 20, 24, 22, 26]
let newDictionary = Dictionary(uniqueKeysWithValues: zip(keys, values))
```
Hàm ```zip(_:_:)``` tạo ra tuple giống như trên dựa vào hai mảng đưa vào. Nhưng nếu như bạn chỉ có mảng giá trị thì sao? Đây chính là cách giải quyết: One Side Dictionary sẽ vào cuộc.
```swift
let anotherDictionary = Dictionary(uniqueKeysWithValues: zip(1..., values))
```
Bạn tạo ra một chuỗi vô hạn bằng cách bắt đầu từ 1 và kết hợp nó với giá trị của dictionary trong hàm ```zip(_:_:)```. Phần key giờ đây sẽ bắt đầu từ 1 tương ứng với thứ 2 và kết thúc bằng 7 tương đương với chủ nhật. 

Nếu như có bản ghi trùng thì sao ? Swift 4 sẽ giúp bạn quản lý các key bị trùng như sau:
```swift
let duplicatesArray = [("Monday", 30),  ("Tuesday", 25),  ("Wednesday", 27), ("Thursday", 20),  ("Friday",   24),  ("Saturday", 22),  ("Sunday", 26),  ("Monday", 28)]
let noDuplicatesDictionary = Dictionary(duplicatesArray, uniquingKeysWith: min) 
```
Bạn tạo một dictionary chỉ chứa một unique key với hàm khởi tạo ```init(_: uniquingKeysWith:)``` . Nó dùng một thuật toán nhất định để chọn giá trị cho mỗi key bị trùng. Mà ở trong trường hợp này chính là lấy giá trị nhỏ nhất trong số chúng.

Nhưng nếu như bạn muốn merge vào một số bản ghi trùng thì sao? Swift 4 vẫn sẽ giúp bạn giải quyết vấn đề này.
```swift
let duplicateTuples = [("Monday", 28),  ("Tuesday", 27)]
var mutatingDictionary = Dictionary(uniqueKeysWithValues: tupleArray)
mutatingDictionary.merge(duplicateTuples, uniquingKeysWith: min)
let updatedDictionary = mutatingDictionary.merging(duplicateTuples, uniquingKeysWith: min)
```
Dictionary trong swift 3 sẽ trả về một optional khi không có key nào tồn tại trong nó. 
```swift
var seasons = ["Spring" : 20, "Summer" : 30, "Autumn" : 10]
let winterTemperature = seasons["Winter"] ?? 0
```
Còn đối với swift 4 bạn có thể hoàn toàn đặt một giá trị mặc định khi không có key tồn tại
```swift
let winterTemperature = seasons["Winter", default: 0]
```
Ở swift 3 bạn buộc phải unwrap giá trị trong dictionary rồi mới thay đổi được giá trị. 
```swift
if let autumnTemperature = seasons["Autumn"] {
  seasons["Autumn"] = autumnTemperature + 5
}
```
và điều này không còn cần thiết nữa trong swift 4
```swift
seasons["Autumn", default: 0] += 5
```
Cả 2 hàm ```map(_:)``` và ```filter(_:)``` cũng được chỉnh sửa lại vì trong swift 3 nó trả về mảng chứ không phải dictionary.
```swift
let mappedArrayValues = seasons.map{$0.value * 2}
```
hoặc nếu bạn muốn map cả key thì như sau : 
```swift
let mappedArray = seasons.map{key, value in (key, value * 2)}
```
Còn đối với swift 4 bạn phải viết như sau : 
```swift
let mappedArray = seasons.map{season in (season.key, season.value * 2)}
```
Đây là cách viết ngắn hơn của swift 3
```swift
let mappedArrayShorthandVersion = seasons.map{($0.0, $0.1 * 2)}
```
Cả 2 cách trên đều dùng được nhưng nó vẫn trả về mảng chứ không phải là dictionary. Muốn lấy về một dictionary hãy dùng hàm sau :
```swift
let mappedDictionary = seasons.mapValues{$0 * 2}
```
Set là một mảng đặc biệt vì nó chỉ chứa các giá trị độc nhất. Tuy vậy trong swift 3 thì bạn sẽ được trả về một mảng chứ không phải một Set.
```swift
var categories: Set<String> = ["Swift", "iOS", "macOS", "watchOS", "tvOS"]
let filteredCategories = categories.filter{$0.hasSuffix("OS")}
```
# Private và Fileprivate trong Extension
Swift 3 dùng `fileprivate` để khóa dữ liệu trong một class. Và đây là cách sử dụng nó trong extension
```swift
class Person {
  fileprivate let name: String
  fileprivate let age: Int
  
  init(name: String, age: Int) {
    self.name = name
    self.age = age
  }
}
 
extension Person {
  func info() -> String {
    return "\(self.name) \(self.age)"
  }
}
 
let me = Person(name: "Cosmin", age: 31)
me.info()
```
Bạn tạo một extension cho lớp `Person` bằng cách sử dụng hàm info để can thiệp vào nó. Vì vậy bạn nên dùng `private` thay vì `fileprivate` trong swift 4 để lấy giá trị của lớp.
```swift
class Person {
  private let name: String
  private let age: Int
  // original code
}
```

# Cải thiện NSNumber
Swift 3 không thể cast được NSNumber sang UInt8.
```swift
let x = NSNumber(value: 1000)
let y = x as? UInt8
```
giá trị bên phải của y phải là nil ở trong trường hợp này vì UInt8 có giá trị từ 0 đến 255 nhưng trong swift 3 nó lại thành giá trị là 1000%256 = 232. Điều này đã được sửa trong swift 4 và trở thành nil.

# String chứa xuống dòng
Bạn tạo ra một string nhiều dòng bằng cách thêm \n để xuống dòng cho bất kì dòng mới như sau trong swift 3:
```swift
let multipleLinesSwift3 = "You can \"escape\" all of the double quotes within the text \n by formatting it with a \"\\\" backslash before e
```
Swift 4 đưa ra một cách xuống dòng mới đó là dùng ba dấu quote : """
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

# Unicode Scalar cho ký tự
Bạn không thấy ký tự unicode scalar một cách trực tiếp trong swift 3 mà phải làm như sau : 
```swift
let character: Character = "A"
let string = String(character)
let unicodeScalars = string.unicodeScalars
let startIndex = unicodeScalars.startIndex
let asciiCode = unicodeScalars[startIndex].value
```
Swift 4 đã đưa ra một cách nhanh hơn để làm điều này bằng cách sử dụng thuộc tính `unicodeScalars` để lấy:
```swift
let unicodeScalars = character.unicodeScalars
// original code
```

# Cải tiến string emoji
Swift 3 không hề đếm được số ký tự của emoji string một cách chính xác.
```swift
let emojiString = "👨‍"
let characterCountSwift3 = emojiString.characters.count
```
Đáng lẽ số ký tự emoji là 1 nhưng trong swift 3 lại đếm là 4. Điều này đã được sửa trong swift 4:
```swift
let characterCountSwift4 = emojiString.count
```
Bạn có thể dùng trực tiếp thuộc tính `count` để đếm số ký tự vì string trong swift 4 đã trở thành collections.

Cảm ơn các bạn đã đón xem, hãy tiếp tục theo dõi phần sau và cũng là phần cuối nhé.
REF: https://www.appcoda.com/swift4-changes/