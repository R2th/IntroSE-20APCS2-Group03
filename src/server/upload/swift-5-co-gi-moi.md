Swift 5 đã phát hành ngày 25/3/2019 , có nhiều cái tính năng mới như là Escaping Raw Strings, handling future enumeration , result type.... Hôm nay mình xin giới thiệu cho các bạn đọc 1 số tính năng mới của swift 5 so với swift 4.2 . Ok,  cùng tìm hiểu nào!

# 1 Kiểm tra bội số nguyên
Ví dụ : Để chia a cho số b
Trong swift 4.2 bạn phải kiểm tra số b có khác 0  hay không như sau:
```
let a = 4
let b = 2
if b != 0 && a % b == 0 {
  print("a là bội của b")
}
```
Trong swift 5: bạn chỉ cần dùng hàm isMultiple(of:) để check xem số a có là bội của số b hay không? 
```
if firstNumber.isMultiple(of: secondNumber) {
    print("a là bội của b")
}
```
# 2. Escaping Raw Strings
Trong Swift 4.2 thì Escape sequences đang sử dụng **backslashes** **`(\)`** và **quote marks\(")** trong strings.
```
let escape = "You use escape sequences for \"quotes\"\\\"backslashes\" in Swift 4.2."
let multiline = """
                You use escape sequences for \"\"\"quotes\"\"\"\\\"\"\"backslashes\"\"\"
                on multiple lines
                in Swift 4.2.
                """
```
Swift 5 bạn có thể thêm dấu  # ở vị trí bắt đầu và vị trí kết thúc của chuỗi string khi bạn dùng **backslashes**  và **quote marks**
```
let raw = #"You can create "raw"\"plain" strings in Swift 5."#
let multiline = #"""
                You can create """raw"""\"""plain""" strings
                on multiple lines
                in Swift 5.
                """#
```

When using string interpolation in raw strings, you have to use a pound sign after the backslash:
Khi dùng  string interpolation trong raw string  VD: `"raw string \(a)"`  , bạn có thể dùng  dấu # sau dấu \
```
let track = "Nothing Else Matters"
print(#"My favorite tune\song is \#(track)."#)
```

Note: Bạn có thể dùng nhiều dấu # trước dấu " hoặc  sau dấu \ mà không có vấn đề gì:
```
let number = 4
let hashtag = #######"You can use the \#######(number) in Swift 5."#######  //  You can use the 4 in Swift 5.
```


In Swift 4.2, you escape backslashes inside regular expressions as follows:
Trong swift 4.2 , bạn  escape backslashes (`\`) trong biểu thức chính quy:
```
// 1
let versions = "3 3.1 4 4.1 4.2 5"
let range = NSRange(versions.startIndex..., in: versions)
// 2
let regex = try! NSRegularExpression(pattern: "\\d\\.\\d")
// 3
let minorVersions = regex.matches(in: versions, range: range)
// 4
minorVersions.forEach { print(versions[Range($0.range, in:  versions)!]) }
```

Trong swift 5 bạn chỉ cần viết 1 nửa dấu gạch chéo `\` bằng cách thay bằng dấu #
```
let regex = try! NSRegularExpression(pattern: #"\d\.\d"#)
```
# 3.  Dùng character property mới
Trong swift 4.2 để bạn convert 1 chracter từ String sang Int bạn làm như sau:
```
let id = "ID10"
var digits = 0
id.forEach { digits += Int(String($0)) != nil ? 1 : 0 }
print("Id has \(digits) digits.")
```
Tuy nhiên, Swift 5 thêm thuộc tính isNumber để kiểm tra 1 character có phải số Int.
```
id.forEach { digits += $0.isNumber ? 1 : 0 }
```
Bạn có thể vào đây để xem các thuộc tính mới [character](https://github.com/apple/swift-evolution/blob/master/proposals/0221-character-properties.md).
# 4.  Dùng Unicode Scalar Properties mới
Trong swift 4.2, bạn có thể  kiểm tra 1 kí tự  ví dụ kí tự 'a' không phải là số hay không theo cách sau:
```
let username = "bond007"
var letters = 0
username.unicodeScalars.forEach { 
  letters += (65...90) ~= $0.value || (97...122) ~= $0.value ? 1 : 0
}
print("Username has \(letters) letters.")

```
Swift 5, có thêm thuộc tính mới giúp xử lý đơn giản hơn bằng cách dùng thuộc tính isAlphabetic : 
```
username.unicodeScalars.forEach { letters += $0.properties.isAlphabetic ? 1 : 0 }
```
# 5. Xoá Subsequences
Trong swift 4.2 , Subsequences sẽ được trả về khi Custom Sequences.
```
extension Sequence {
  func remove(_ s: String) -> SubSequence {
    guard let n = Int(s) else {
      return dropLast()
    }
    return dropLast(n)
  }
}

let sequence = [5, 2, 7, 4]
sequence.remove("2") // [5, 2]
sequence.remove("two") // [5, 2, 7]

// hàm dropLast(n) : Các bạn hiểu là xoá các kí tự bắt đầu từ vị trí thứ n
```

Swift 5, đã thay thế  Subsequences thành concrete types (loại cụ thể) :
```
extension Sequence {
  func remove(_ s: String) -> [Element] {
    guard let n = Int(s) else {
      return dropLast()
    }
    return dropLast(n)
  }
}
```
# 6. Compacting Dictionaries
Swift 4.2, dùng mapValues, filter và reduce để lọc các giá trị  = nil từ dictionary như sau:
```
let students = ["Oana": "10", "Nori": "ten"]
let filterStudents = students.mapValues(Int.init)
  .filter { $0.value != nil }
  .mapValues { $0! } // dùng mapValues để  biến các giá trị của từ điển thành kiểu Int
  //  sau đó dùng filter để lọc các giá trị khác nil.
let reduceStudents = students.reduce(into: [:]) { $0[$1.key] = Int($1.value) } // ["Oana": "10"]
```
Swift 5 dùng `compactMapValues(_:)` để giải quyết vấn đề trên ([xem chi tiết tại đây](https://github.com/apple/swift-evolution/blob/master/proposals/0218-introduce-compact-map-values.md)): 
```
let mapStudents = students.compactMapValues(Int.init)
```
# 7. Renaming Dictionary Literals
Swift 4.2 dùng DictionaryLiteral để khai báo cho 1 từ điển:
```
let pets: DictionaryLiteral = ["dog": "Sclip", "cat": "Peti"]
```
**Note**:   DictionaryLiteral không phải là một dictionary hoặc 1 literal. Nó là 1 list các cặp key-value.

Swift 5 đã đổi tên DictionaryLiteral thành KeyValuePairs: 
let pets: KeyValuePairs = ["dog": "Sclip", "cat": "Peti"]

# 8. Handling Future Enumeration Cases
swift 4.2:
```
// 1
enum Post {
  case tutorial, article, screencast, course
}

// 2
func readPost(_ post: Post) -> String {
  switch post {
    case .tutorial:
      return "You are reading a tutorial."
    case .article:
      return "You are reading an article."
    default:
      return "You are watching a video."
  }
}

// 3
let screencast = Post.screencast
readPost(screencast) // "You are watching a video."
let course = Post.course
readPost(course) // "You are watching a video."
```
Trong swift 5 sẽ bổ sung đánh dấu các giá trị đang để mặc định để trong tương lai bạn có thể thay các giá trị đang là default của enum thành các giá trị cụ thể bằng cách báo warning của Xcode:
```
func readPost(_ post: BlogPost) -> String {
  switch post {
    case .tutorial:
      return "You are reading a tutorial."
    case .article:
      return "You are reading an article."
    @unknown default:
      return "You are reading a blog post."
  }
}

readPost(screencast) // "You are reading a blog post."
readPost(course) // "You are reading a blog post."
readPost(podcast) // "You are reading a blog post."

```
In this code, you mark default as @unknown, and Swift warns you that switch isn’t exhaustive. default handles .screencast, .course and .podcast because screencasts, courses and podcasts are blog posts.
Trong đoạn code trên, bạn đánh dấu @unknown, và swift sẽ báo warning rằng : Switch must be exhaustive. Xcode sẽ implement tất cả các **enumeration cases** của Enum.
# 9. Adding Result to the Standard Library
Swift 5 thêm Result vào [standard library](https://github.com/apple/swift-evolution/blob/master/proposals/0235-add-result.md):
- Kiểu **Result** type handle kết quả của asynchronous function  dùng enum với 2 case:
success and failure.
Để hiểu nó như thế nào mình sẽ đưa ra 1 ví dụ xử lý kết quả trả về khi gọi API:

```
let url = URL(string: "https://exampleapi.com/data.json")!
URLSession.shared.dataTask(with: url) { (data: Data?, response: URLResponse?, error: Error?) in
    if let error = error {
         // Handle Error
         return
     }
     guard let response = response else {
         // Handle Empty Response
         return
     }
     guard let data = data else {
         // Handle Empty Data
         return
     }
     // Handle Decode Data into Model
}
```

Từ đoạn code trên để xử lý kết quả trả về chúng ta cần dùng if let hoắc guard để check  response status code, data trả về , and decode the data ra thành  model.
Cách xử lý thanh hơi cồng kềnh , phức tạp . OK ! bây giờ các bạn thử dùng type Result trong swift 5 xem nó như thế nào nhé :
```
extension URLSession {
    func dataTask(with url: URL, completion: @escaping (Result<(URLResponse, Data), Error>) -> Void) -> URLSessionDataTask {
        return dataTask(with: url) { (data, response, error) in
            if let error = error {
                completion(.failure(error))
                return
            }
            guard let response = response, let data = data else {
                let error = NSError(domain: "error", code: 0, userInfo: nil)
                completion(.failure(error))
                return
            }
            completion(.success((response, data)))
        }
    }


URLSession.shared.dataTask(with: url) { (result) in
    switch result {
        case .success(let response, let data):
            // Handle Data and Response
            break
        case .failure(let error):
            // Handle Error
            break
     }
}
```

Cách này nhìn code khá là clear và dễ hiểu phải không nào !.
# 10. Platform Deployment Settings
Swift 5 cho phép bạn định nghĩa  số các platform  tối thiểu trong Package.swift
```
let package = Package(name: “Package”, platforms: [
  .macOS(.v10_14), 
  .iOS(.v12),
  .tvOS(.v12), 
  .watchOS(.v5)
])
```

Bạn có thể dùng macOS(), iOS(), tvOS() và watchOS() trong SupportedPlatform để set flatform tối thiểu trong Package.swift.
# 11. Flattening Nested Optionals
Swift 4.2 tạo nested optionals with try? như sau: 
```
extension Int {
  // 1
  enum DivisionError: Error {
    case divisionByZero
  }
  
  // 2
  func divideBy(_ number: Int) throws -> Int {
    guard number != 0 else {
      throw DivisionError.divisionByZero
    }
    return self / number
  }
}

// 3
let number: Int? = 10
let division = try? number?.divideBy(2) // Kiểu của division là Optional<Optional<Int>> hay chính là kiểu Int?? trong swift 4.2
if let division = division, 
   let final = division {
  print(final)
}
```
Tuy nhiên khi lên swift 5 thì nested optionals with try? :
```
// division trong swift 5 chỉ Optional<Int> hay chỉ là kiểu Int?
if let division = division {
  print(division)  // Int
}

```

try? trong swift 5 sẽ không tạo  nested optionals , bạn chỉ cần unwrap division 1 lần duy nhất khi nó đang là kiểu Int?

# 12.  Build Configuration Updates
Swift 4.2 dùng >= trong compilation conditions:

```
let favoriteNumber = 10
var evenNumber = true

#if !swift(>=5)
  evenNumber = favoriteNumber % 2 == 0
#else 
  evenNumber = favoriteNumber.isMultiple(of: 2)
#endif

#if !compiler(>=5)
  evenNumber = favoriteNumber % 2 == 0  
#else
  evenNumber = favoriteNumber.isMultiple(of: 2)
#endif

```

Swift 5 support thêm dấu  < trong compilation conditions: 
```
#if swift(<5)
  evenNumber = favoriteNumber % 2 == 0   
#else
  evenNumber = favoriteNumber.isMultiple(of: 2)  
#endif

#if compiler(<5)
  evenNumber = favoriteNumber % 2 == 0 
#else
  evenNumber = favoriteNumber.isMultiple(of: 2)   
#endif

```

# Tài Liệu Tham Khảo:
https://www.raywenderlich.com/55728-what-s-new-in-swift-5
https://medium.com/@azamsharp/understanding-result-type-in-swift-5-387d5ef9f45e