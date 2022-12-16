Swift 4 đã được ra đời khá lâu rồi nhưng có những điểm mới mà nhiều người không biết hoặc chưa tìm hiểu, trong bài viết này, những điểm mới so với swift 3 sẽ được giải thích rõ ràng. Trước khi vào tìm hiểu những điểm mới trong swift 4, nếu các bạn chưa nắm rõ về swift 3 hoặc 3.1 thì hãy tìm hiểu ở bài viết sau : [Swift 3](http://www.appcoda.com/swift3-changes/), [Swift 3.1](https://www.raywenderlich.com/695-what-s-new-in-swift-3-1)

# JSON Endcoding và Decoding
Swift 4 đã đơn giản hoá quá lưu trữ và serialize JSON so với swift 3. Giờ bạn chỉ cần tuỳ chỉnh protocol Codable, chính là sự kết hợp giữa Encodable và Decodable.

```swift
class Tutorial: Codable {
  let title: String
  let author: String
  let editor: String
  let type: String
  let publishDate: Date
  
  init(title: String, author: String, editor: String, type: String, publishDate: Date) {
    self.title = title
    self.author = author
    self.editor = editor
    self.type = type
    self.publishDate = publishDate
  }
}
let tutorial = Tutorial(title: "What's New in Swift 4?", author: "Cosmin Pupăză", editor: "Simon Ng", type: "Swift", publishDate: Date())
```
Sau khi class Tutorial đã thêm protocol Codable, hãy cùng encode nó như sau:

```swift
let encoder = JSONEncoder()
let data = try encoder.encode(tutorial)
let string = String(data: data, encoding: .utf8)
```
Đầu tiên chúng ta đã khởi tạo ra một encode object từ class JSONEncoder. Sau đó để lưu trữ tutorial thành một data JSON bằng cách sử dụng try và hàm encode(_:). Cuối cùng, chúng ta sẽ thay đổi dữ liệu trong data thành một string bằng cách mã hoá nó bằng UTF-8. Bạn sẽ thấy kết quả như sau:

![](https://images.viblo.asia/4a564228-4289-4a80-912d-17c728919c18.png)

Bây giờ hãy quay lại với object tutorial

```swift
let decoder = JSONDecoder()
let article = try decoder.decode(Tutorial.self, from: data)
let info = "\(article.title) \(article.author) \(article.editor) \(article.type) \(article.publishDate)"
```
Đầu tiên chúng ta đã khởi tạo ra một decode object từ class JSON. Sau đó để serialize tutorial thành một string bằng cách sử dụng try và hàm decode(_:). Cuối cùng, chúng ta sẽ thấy kết quả như sau:

![](https://images.viblo.asia/26a51900-77a8-4e60-af4c-6e129ed90dff.png)

# Key Path

Swift 4 làm cho việc truy cập vào thuộc tính của một object dễ dàng hơn với key path. Hãy xem đoạn code sau:

```swift
class Author {
  let name: String
  let tutorial: Tutorial
  
  init(name: String, tutorial: Tutorial) {
    self.name = name
    self.tutorial = tutorial
  }
}
let author = Author(name: "Cosmin Pupăză", tutorial: tutorial)
```
Chúng ta sẽ sử dụng class Tutorial lúc trước để tạo ra một object Tutorial cho object author. Bây giờ chúng ta sẽ lấy ra giá trị name của author bằng key path.

```swift
let authorNameKeyPath = \Author.name
let authorName = author[keyPath: authorNameKeyPath]
```
Đầu tiên sẽ tạo ra một key path với một sược chéo và dùng từ khoá "keyPath" để lấy giá trị name của author.

Chúng ta còn có thể dùng keypath để lấy cả những thuộc tính của tutorial.

```swift
let authorTutorialTitleKeyPath = \Author.tutorial.title
let authorTutorialTitle = author[keyPath: authorTutorialTitleKeyPath]
```
Bạn có thể thêm vào một key path mới vào một cái sẵn có bằng cách sử dụng hàm appending(path:) như sau: 

```swift
let authorTutorialKeyPath = \Author.tutorial
let authorTutorialNameKeyPath = authorTutorialKeyPath.appending(path: \.title)
let authorTutorialName = author[keyPath: authorTutorialNameKeyPath]
```
Chúng ta còn có thể dùng keypath để thay đổi giá trị cho thuộc tính:

```swift
class JukeBox {
  var song: String
  
  init(song: String) {
    self.song = song
  }
}
let jukeBox = JukeBox(song: "Nothing else matters")
let jukeBoxSongKeyPath = \JukeBox.song
jukeBox[keyPath: jukeBoxSongKeyPath] = "Stairway to heaven”
```

# Kết hợp Class với protocol
Bạn có thể kết hợp nhiều protocol với nhau trong swift 3 khi tạo constant và variable. Swift 4 cho phép đi xa hơn thế, bạn có thể thêm class mà vẫn dùng cùng 1 cú pháp. Bạn có thể ràng buộc một object vào một class và một protocol theo cùng 1 cách giống như trong Objective-C.
Hãy tưởng tượng rằng bạn đang làm một ứng dụng vẽ và tô màu. Thì bạn sẽ cần phải có những class và protocol như sau:

```swift
protocol Drawable {}
protocol Colourable {}
 
class Shape {}
class Line {}
```
Bây giờ hãy giả sử rằng bạn cần phải tạo ra một số kiểu đối tượng cần thiết cho ứng dụng:

```swift
class Circle: Shape, Drawable, Colourable {}
class Rectangle: Shape, Drawable, Colourable {}
class Square: Shape, Drawable, Colourable {}
 
class StraightLine: Line, Drawable {}
class DottedLine: Line, Drawable {}
 
let circle: Circle
let rectangle: Rectangle
let square: Square
 
let straightLine: StraightLine
let dottedLine: DottedLine
```
Đầu tiên, bạn tạo 3 class đó là : Circle, Rectangle và Square được kế thừa từ Shape và thoả mãn Drawable và Colourable protocol. Sau đó bạn thêm 2 class riêng rẽ là StraightLine và DottedLine được kế thừa Line và thoả mãn Drawable và Colourable. Cuôí cùng là chúng ta tạo object cho những class này.

Vấn đề ở đây là kiểu khai báo này quá rắc rối với phần việc đó là nó đẻ ra quá nhiều class con. Bạn có thể làm giản đơn quá trình này bằng cách:

```swift
let newCircle: Drawable & Colourable
let newRectangle: Drawable & Colourable
let newSquare: Drawable & Colourable
```
Chúng ta đã tạo ra một đối tượng với sự kết hợp của cả 2 protocol là Drawable và Colourable bằng operator "&". Ngoài ra còn có thể tạo typealias cho chúng:

```swift
typealias DrawableColourable = Drawable & Colourable
 
let anotherCircle: DrawableColourable
let anotherRectangle: DrawableColourable
let anotherSquare: DrawableColourable
```
Đối tượng đã thoả mãn protocol tổ hợp là DrawableColourable, nhưng nó vẫn chưa đủ bởi vì việc khởi tạo vẫn chưa được giải quyết. Ta sẽ thêm base class vào như sau:

```swift
let brandNewCircle: Shape & Drawable & Colourable
let brandNewRectangle: Shape & Drawable & Colourable
 
let brandNewSquare: Shape & Drawable & Colourable
let brandNewStraightLine: Line & Drawable
let brandNewDottedLine: Line & Drawable
```
Bạn tạo đối tượng Shape và Line và làm cho chúng thoả mãn protocol Drawable và Colourable với operator "&". Nhưng bạn vẫn có thể làm nó tuyệt vời hơn.

```swift
typealias DrawableColourableShape = Shape & Drawable & Colourable
typealias DrawableLine = Line & Drawable
 
let anotherNewCircle: DrawableColourableShape
let anotherNewRectangle: DrawableColourableShape
 
let anotherNewSquare: DrawableColourableShape
let anotherNewStraightLine: DrawableLine
let anotherNewDottedLine: DrawableLine
```
Bạn đã tạo ra alias cho kiểu DrawableColourableShape và DrawableLine và tạo đối tượng dựa trên chúng. Nó đã gọn hơn và dễ hiểu hơn nhiều.

# Range
Swift 4 thêm prefix và postfix cho việc khai báo range cho mảng để tiện cho việc tạo mảng về một phía. Đây là cách bạn lấy giá trị trong mảng trong swift 3:

```swift
let array = [1, 5, 2, 8, 4, 10]
let halfIndex = (array.count - 1) / 2
let openFirstHalf = array[0..<halfIndex]
let closedFirstHalf = array[0...halfIndex]
```
Chúng ta dùng các operator mở và đóng để mở hoặc đóng một nửa của array. Đến swift 4 ta có thể viết gọn hơn như sau :

```swift
let openFirstSlice = array[..<halfIndex]
let closedFirstSlice = array[...halfIndex]
```
Hoặc chúng ta cũng có thể lấy nửa phía sau của array. Trong swift 3:
```swift
let nextIndex = halfIndex + 1
let lastIndex = array.count - 1
let openSecondHalf = array[nextIndex..<lastIndex + 1]
let closedSecondHalf = array[nextIndex...lastIndex]
```
và swift 4:
```swift
let closedSecondSlice = array[nextIndex...]
```
Ngoài ra để tiện hơn cho việc duyệt giá trị trong vòng for, ta có thể sử dụng hàm zip(_:_:) để duyện từ vị trí mong muốn trong một array.
```swift
for (index, value) in zip(1..., array) {
  print("\(index): \(value)")
}
```
# swap và swapAt
Hàm swap(_:_:) trong swift 3 lấy 2 phần tử và thay đổi vị trí cuả chúng trong array:

```swift
var numbers = [1, 5, 2, 8, 4, 10]
swap(&numbers[0], &numbers[1])
```
Hàm này tồn tại 1 vấn đề đó là các phần tử được swap có thể bị truy suất từ phía bên ngoài. Nhưng swift 4 đã thay thế nó hoàn toàn bằng hàm swapAt(_:_:), bạn chỉ cần đưa vị trí phần tử thôi.

```swift
numbers.swapAt(0, 1)
```
Trên đây là những thay đổi khá hay trong swift 4, chúng ta sẽ đến với phần sau để tìm hiểu nốt những thay đổi còn lại. Cảm ơn các bạn đã đọc bài viết.
Ref: https://www.appcoda.com/swift4-changes/