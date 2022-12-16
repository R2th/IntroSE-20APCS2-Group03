## Conditional Conformance
Đây là một tính năng mạnh mẽ giúp mã của bạn linh hoạt hơn. 
Bạn có thể xem cách nó hoạt động với một vài ví dụ.
### Conditional Conformance trong thư viện chuẩn
Trong Swift 4, bạn có thể so sánh các Mảng, Dictionary và các tùy chọn miễn là các phần tử của chúng là Equatable. 
Điều này hoàn toàn tốt cho các tình huống cơ bản như:
```
// Arrays of Int
let firstArray = [1, 2, 3]
let secondArray = [1, 2, 3]
let sameArray = firstArray == secondArray

// Dictionaries with Int values
let firstDictionary = ["Cosmin": 10, "George": 9]
let secondDictionary = ["Cosmin": 10, "George": 9]
let sameDictionary = firstDictionary == secondDictionary

// Comparing Int?
let firstOptional = firstDictionary["Cosmin"]
let secondOptional = secondDictionary["Cosmin"]ng
let sameOptional = firstOptional == secondOptional
```

Sử dụng toán tử **==** để kiểm tra giống nhau trong các ví dụ này, vì **Int** là **Equatable** trong Swift 4. Tuy nhiên, so sánh các phần tử optional là một tình huống phổ biến mà bạn có thể gặp phải với Swift 4 vì các phần tử optional không phù hợp với **Equatable**.
Swift 4.1 khắc phục vấn đề này bằng cách sử dụng Conditional Conformance, cho phép các kiểu optional với các kiểu **Equatable** cơ bản được so sánh:
```

// Array of Int?
let firstArray = [1, nil, 2, nil, 3, nil]
let secondArray = [1, nil, 2, nil, 3, nil]
let sameArray = firstArray == secondArray

// Dictionary with Int? values
let firstDictionary = ["Cosmin": 10, "George": nil]
let secondDictionary = ["Cosmin": 10, "George": nil]
let sameDictionary = firstDictionary == secondDictionary

// Comparing Int?? (Optional of Optional)
let firstOptional = firstDictionary["Cosmin"]
let secondOptional = secondDictionary["Cosmin"]
let sameOptional = firstOptional == secondOptional
```
**Int?** is **Equatable** in Swift 4.1, so the **==** operator works for **[Int?]**, **[String: Int?]** and **Int??**.
Một vấn đề tương tự đã được giải quyết khi so sánh các mảng của mảng (ví dụ **[[Int]]**). Trong Swift 4, bạn chỉ có thể so sánh các mảng của các Set (ví dụ: **[Set <Int>]**), vì các Set phù hợp với **Equatable**.
Swift 4.1 giải quyết điều này, vì các mảng (và Dictionary) là **Equatable** miễn là các giá trị bên trong của chúng cũng vậy.
    
```
let firstArrayOfSets = [Set([1, 2, 3]), Set([1, 2, 3])]
let secondArrayOfSets = [Set([1, 2, 3]), Set([1, 2, 3])]

// Will work in Swift 4 and Swift 4.1
// since Set<Int> is Equatable
firstArrayOfSets == secondArrayOfSets

let firstArrayOfArrays = [[1, 2, 3], [3, 4, 5]]
let secondArrayOfArrays = [[1, 2, 3], [3, 4, 5]]

// Caused an error in Swift 4, but works in Swift 4.1
// since Arrays are Equatable in Swift 4.1
firstArrayOfArrays == secondArrayOfArrays
```

Nói chung, **Optional**, **Array** và **Dictionary** của Swift 4.1 phù hợp với **Equatable** và **Hashable** bất cứ khi nào các giá trị hoặc phần tử cơ bản của chúng phù hợp với các giao thức này.
Đây là cách conditional conformance hoạt động trong thư viện chuẩn. Tiếp theo, bạn sẽ thực hiện nó trong code.

### Conditional conformance trong code
Bạn sẽ sử dụng Conditional conformance để tạo ra các nhạc cụ của riêng bạn. Thêm khối mã sau vào cuối playground để bắt đầu:

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

Bạn thực hiện theo những bước sau:
    1. **LeadInstrument** phù hợp với **Equatable**. Nó có một **brand** nhất định và một method có tên là **tune()** mà cuối cùng bạn sẽ sử dụng **tune** để điều chỉnh nhạc cụ.
    2. Bạn override **tune()** trong **Keyboard** để trả về điều chỉnh chuẩn của Keyboard.
    3. Bạn làm điều tương tự với **Guitar**.

Tiếp theo, bạn khai báo band:

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

Dưới đây, bạn thực hiện từng bước: 
    1. Bạn tạo một lớp có tên là **Band** với kiểu generic - **LeadInstrument**. Mỗi ban nhạc có một tên duy nhất và công cụ chính.
    2. Bạn sử dụng **where** để hạn chế **Band** để phù hợp với **Equatable** miễn là **LeadInstrument** làm.

Tiếp theo, xác định các ban nhạc yêu thích của bạn và so sánh chúng:
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

Trong đoạn mã này, bạn tạo hai Keyboards và Guitars cùng với các Bands thích hợp của chúng. 
Sau đó bạn so sánh trực tiếp các ban nhạc, nhờ vào sự phù hợp có điều kiện mà bạn đã xác định trước đó.

### Conditional conformance trong JSON parsing

Array, Dictionary, Set và các optional phù hợp với **Codable** nếu các phần tử của chúng tuân theo **Codable** trong Swift 4.1. Thêm đoạn mã sau vào playground của bạn để thử điều này:

```
struct Student: Codable, Hashable {
  let firstName: String
  let averageGrade: Int
}

let cosmin = Student(firstName: "Cosmin", averageGrade: 10)
let george = Student(firstName: "George", averageGrade: 9)
let encoder = JSONEncoder()

// Encode an Array of students
let students = [cosmin, george]
do {
  try encoder.encode(students)
} catch {
  print("Failed encoding students array: \(error)")
}

// Encode a Dictionary with student values
let studentsDictionary = ["Cosmin": cosmin, "George": george]
do {
  try encoder.encode(studentsDictionary)
} catch {
  print("Failed encoding students dictionary: \(error)")
}

// Encode a Set of students
let studentsSet: Set = [cosmin, george]
do {
  try encoder.encode(studentsSet)
} catch {
  print("Failed encoding students set: \(error)")
}

// Encode an Optional Student
let optionalStudent: Student? = cosmin
do {
  try encoder.encode(optionalStudent)
} catch {
  print("Failed encoding optional student: \(error)")
}
```

Bạn sử dụng mã này để mã hóa **[Student]**, **[String: Student]**, **Set<Student>** và **Student?**. Điều này hoạt động trơn tru trong Swift 4.1 vì **Student** là **Codable**, điều này làm cho các loại bộ sưu tập này phù hợp với nó.
    
### Chuyển đổi giữa trường hợp Camel và Snake Case trong quá trình mã hóa JSON
Swift 4.1 cho phép bạn chuyển đổi các thuộc tính **CamelCase** thành các khóa **snake_case** trong khi mã hóa JSON

```
var jsonData = Data()
encoder.keyEncodingStrategy = .convertToSnakeCase
encoder.outputFormatting = .prettyPrinted

do {
  jsonData = try encoder.encode(students)
} catch {
  print(error)
}

if let jsonString = String(data: jsonData, encoding: .utf8) {
  print(jsonString)
}
```

Khi tạo bộ mã hóa, bạn đặt **keyEncodingStrategy** thành **.convertToSnakeCase**. Nhìn vào giao diện console của bạn, bạn sẽ thấy:

```
var studentsInfo: [Student] = []
let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase

do {
  studentsInfo = try decoder.decode([Student].self, from: jsonData)
} catch {
  print(error)
}

for studentInfo in studentsInfo {
  print("\(studentInfo.firstName) \(studentInfo.averageGrade)")
} 
```

Lần này, bạn đặt **keyDecodingStrategy** thành **.convertFromSnakeCase**.

### Equatable và Hashable Protocols Conformance

Swift 4 yêu cầu bạn viết mã boilerplate để tạo các cấu trúc phù hợp với **Equatable** và **Hashable**:

```
struct Country: Hashable {
  let name: String
  let capital: String
  
  static func ==(lhs: Country, rhs: Country) -> Bool {
    return lhs.name == rhs.name && lhs.capital == rhs.capital
  }
  
  var hashValue: Int {
    return name.hashValue ^ capital.hashValue &* 16777619
  }
}
```

Sử dụng mã này, bạn đã triển khai thực hiện **== (lhs: rhs :)** và **hashValue** để hỗ trợ cả **Equatable** và **Hashable**. Bạn có thể so sánh các quốc gia, thêm chúng vào Set và thậm chí sử dụng chúng làm khóa Dictionary:

```
let france = Country(name: "France", capital: "Paris")
let germany = Country(name: "Germany", capital: "Berlin")
let sameCountry = france == germany

let countries: Set = [france, germany]
let greetings = [france: "Bonjour", germany: "Guten Tag"]
```

Swift 4.1 bổ sung các triển khai mặc định trong các struct cho **Equatable** và **Hashable** miễn là tất cả các thuộc tính của chúng là **Equatable** và **Hashable** cũng [SE-0185].
Điều này giúp đơn giản hóa mã của bạn, có thể viết lại đơn giản là:

```
struct Country: Hashable {
  let name: String
  let capital: String
}
```

Các **Enumerations** với các **associated values** cũng cần thêm mã để làm việc với **Equatable** và **Hashable** trong Swift 4:

```
enum BlogPost: Hashable {
  case tutorial(String, String)
  case article(String, String)
  
  static func ==(lhs: BlogPost, rhs: BlogPost) -> Bool {
    switch (lhs, rhs) {
    case let (.tutorial(lhsTutorialTitle, lhsTutorialAuthor), .tutorial(rhsTutorialTitle, 
               rhsTutorialAuthor)):
      return lhsTutorialTitle == rhsTutorialTitle && lhsTutorialAuthor == rhsTutorialAuthor
    case let (.article(lhsArticleTitle, lhsArticleAuthor), .article(rhsArticleTitle, rhsArticleAuthor)):
      return lhsArticleTitle == rhsArticleTitle && lhsArticleAuthor == rhsArticleAuthor
    default:
      return false
    }
  }
  
  var hashValue: Int {
    switch self {
    case let .tutorial(tutorialTitle, tutorialAuthor):
      return tutorialTitle.hashValue ^ tutorialAuthor.hashValue &* 16777619
    case let .article(articleTitle, articleAuthor):
      return articleTitle.hashValue ^ articleAuthor.hashValue &* 16777619
    }
  }
}
```

Bạn đã sử dụng các trường hợp liệt kê để viết các triển khai cho **== (lhs: rhs :)** và **hashValue**. Điều này cho phép bạn so sánh các bài đăng trên blog và sử dụng chúng trong Set và Dictionary:

```
let swift3Article = BlogPost.article("What's New in Swift 3.1?", "Cosmin Pupăză")
let swift4Article = BlogPost.article("What's New in Swift 4.1?", "Cosmin Pupăză")
let sameArticle = swift3Article == swift4Article

let swiftArticlesSet: Set = [swift3Article, swift4Article]
let swiftArticlesDictionary = [swift3Article: "Swift 3.1 article", swift4Article: "Swift 4.1 article"]
```

Như trường hợp đã có với **Hashable**, kích thước của mã này được giảm đáng kể trong Swift 4.1 nhờ các triển khai **Equatable** và **Hashable** mặc định:

```
enum BlogPost: Hashable {
  case tutorial(String, String)
  case article(String, String)
}
```
Bạn vừa tự cứu mình khỏi việc duy trì 20 dòng mã soạn sẵn!

![](https://images.viblo.asia/d8bf3207-2165-4026-841b-8a6ba7324ef3.png)
(còn tiếp...)
Nguồn: https://www.raywenderlich.com