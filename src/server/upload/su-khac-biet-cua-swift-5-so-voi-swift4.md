![](https://images.viblo.asia/cd890683-c846-425c-89ed-5c2c28d06e77.png)

Qua các bài trước, chúng ta đã đi tìm hiểu lần lượt về các version của Swift: Swift3 với rất nhiều cải tiến đáng giá từ Swift2.x, Swift4 và hôm nay chúng ta sẽ tìm hiểu Swift5 cũng như những sự khác biệt giữa Swift5 và Swift4.
Swift5 yêu cầu Xcode 10.2 trở lên vì thế hãy đảm bảo Xcode của bạn đã được update version 10.2 hoặc mới hơn nhé!
Chúng ta cùng tìm hiểu nhé!

### Language Improvements

Có nhiều cải tiến trong ngôn ngữ ở Swift5, chúng ta cùng tìm hiểu dưới đây:

#### Testing Integer Multiples

Trong Swift 4.2, chúng ta xác định một số có phải là bội số của số khác qua đoạn code sau:

```Swift
let firstNumber = 4
let secondNumber = 2
if secondNumber != 0 && firstNumber % secondNumber == 0 {
  print("\(secondNumber) * \(firstNumber / secondNumber) = \(firstNumber)")
}
```

Đoạn code trên tiến hành kiểm tra secondNumber có giá trị khác 0 và số dư của phép chia của firstNumber cho secondNumber có bằng 0 thì sau đó mới đưa ra kết luận.

Tuy nhiên ở Swift5 thì chúng ta chỉ đơn giản sử dụng  **isMultiple(of:) to BinaryInteger ** 

```Swift
if firstNumber.isMultiple(of: secondNumber) {
  print("\(secondNumber) * \(firstNumber / secondNumber) = \(firstNumber)")
}
```

#### Escaping Raw Strings

Trong Swift 4.2 chúng ta sử dụng chuỗi thoát để biểu dấu gạch chéo ngược "\" và dấu ""




```Swift
let escape = "You use escape sequences for \"quotes\"\\\"backslashes\" in Swift 4.2."
let multiline = """
                You use escape sequences for \"\"\"quotes\"\"\"\\\"\"\"backslashes\"\"\"
                on multiple lines
                in Swift 4.2.
                """

```

Ở Swift5 bạn sử dụng dấu # ở đầu và cuối chuỗi để bạn có thể sử dụng dấu \ và dấu "" mà không gặp vấn đề gì


```Swift
let raw = #"You can create "raw"\"plain" strings in Swift 5."#
let multiline = #"""
                You can create """raw"""\"""plain""" strings
                on multiple lines
                in Swift 5.
                """#
```

Khi sử dụng string interpolation trong chuỗi string, bạn thêm # sau dấu gạch chéo là được

```Swift
let track = "Nothing Else Matters"
print(#"My favorite tune\song is \#(track)."#)

```


#### Using New Character Properties

Ở Swift 4.2 khi làm việc với kí tự thì sẽ yêu cầu như sau:

```Swift
let id = "ID10"
var digits = 0
id.forEach { digits += Int(String($0)) != nil ? 1 : 0 }
print("Id has \(digits) digits.")
```

Ở đoạn code trên bạn xác định có bao nhiêu chữ cái có chứa ký tự số ở trên. Chúng ta cùng thực hiện lại với Swift 5 thông qua đoạn code dưới đây:

```Swift
id.forEach { digits += $0.isNumber ? 1 : 0 }
```

Chúng ta sử dụng **isNumber** để check xem có phải chữ số hay không.

#### Using New Unicode Scalar Properties

Ở Swift 4.2 bạn triển khai các thuật toán xử lý cho Unicode Scalar như sau:

```Swift
let username = "bond007"
var letters = 0
username.unicodeScalars.forEach { 
  letters += (65...90) ~= $0.value || (97...122) ~= $0.value ? 1 : 0
}
print("Username has \(letters) letters.")
```

Đoạn code trên bạn kiểm tra xem có bao nhiêu chữ cái trong đoạn String. Chúng ta thực hiện lại với Swift5 như sau:

```Swift
username.unicodeScalars.forEach { letters += $0.properties.isAlphabetic ? 1 : 0 }
```

Sử dụng **isAlphabetic** để kiểm tra ký tự có phải chữ cái hay không.

### Dictionary Updates

Swift5 mang tới một số cải tiến cho Dictionary như sau:

#### Compacting Dictionaries
Swift 4.2 sử dụng mapValues, filter để lọc ra các giá trị **nil** từ dictionaries như sau:

```Swift
let students = ["Oana": "10", "Nori": "ten"]
let filterStudents = students.mapValues(Int.init)
  .filter { $0.value != nil }
  .mapValues { $0! }
let reduceStudents = students.reduce(into: [:]) { $0[$1.key] = Int($1.value) }

```

Chúng ta có thể dễ dàng thực hiện với Swift5 như sau:

```Swift
let mapStudents = students.compactMapValues(Int.init)
```

#### Handling Future Enumeration Cases

Swift 4.2 không xử lý thuộc tính enum case mới.

```Swift
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

Trường hợp nếu bạn thêm enum case **podcast**, bạn xử lý .podcase với default thậm chí podcasts không phải là video. Swift 4.2 không cảnh báo bạn vì switch đầy đủ.
 
```Swift
enum Post {
  case tutorial, article, podcast, screencast, course
}

let podcast = Post.podcast
readPost(podcast) // "You are watching a video."

```

Swift5 take care việc xử lý enumeration cases mới:

```Swift
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

Trong đoạn code trên, bạn đánh dấu default là @unknown và Swift cảnh báo bạn rằng switch không đầy đủ, mặc định handle .screencast, .course và .podcast vì screencasts, courses and podcasts là blog posts

### Kết luận

Swift5  đã bổ sung nhiều tính năng thú vị và ổn định hơn cho Swift 4.2. Có thể nói đây là một cột mốc quan trọng trong phát triển ngôn ngữ Swift vì sau đây sẽ ít thay đổi hơn.

Cám ơn bạn đã dành thời gian cho bài viết! :)

##### _Nguồn:_

[https://www.raywenderlich.com/55728-what-s-new-in-swift-5](https://www.raywenderlich.com/55728-what-s-new-in-swift-5)