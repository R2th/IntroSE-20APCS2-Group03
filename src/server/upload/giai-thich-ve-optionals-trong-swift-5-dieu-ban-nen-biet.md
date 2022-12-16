Đây là bài dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại đây: https://medium.com/better-programming/optionals-in-swift-explained-5-things-you-should-know-d737e2d52a9e

**Optionals** nằm trong lõi của Swift và đã tồn tại kể từ phiên bản đầu tiên của Swift. Một giá trị **Optional** cho phép chúng ta viết mã sạch trong khi đó vẫn có thể chú ý tới các giá trị có thể `nil`.
Nếu bạn mới làm quen với Swift, bạn có thể cần phải làm quen với cú pháp thêm dấu chấm hỏi vào đằng sau thuộc tính. Khi bạn đã quen với chúng, bạn thực sự có thể bắt đầu hưởng lợi từ chúng, như các ví dụ và extension dưới đây.
### Giá trị Optional trong Swift là gì?
Trước khi tìm hiểu sâu về những thứ bạn nên biết về **Optional**, đầu tiên, chúng ta nên tìm hiểu tốt về cơ bản trước.
Các thuộc tính, phương thức, đăng kí có thể trả về một **Optional**, điều này có nghĩa là giá trị được trả ra có thể tồn tại giá trị hoặc `nil`. Nhiều truy vấn có thể được nối lại với nhau được gọi là chuỗi tùy chọn (**Optional chaining**). Đây là một giải pháp thay thế cho việc **force unwrapping** được giải thích chi tiết hơn về sau.
Dưới đây là một ví dụ về **optional** `String` và **Optional chaining** để in ra số lượng các kí tự.
```
let name: String? = "Antoine van der Lee"
print(name?.count ?? 0)
```
Chú ý: toán tử `?? `(**nil coalescing**) sẽ được giải thích phía dưới.
### 1. Forced Unwrapping Optionals
**Force unwrapping** một **optional** sẽ trả về giá trị nếu nó tồn tại hoặc gây ra lỗi khi chạy ứng dụng khi giá trị của nó là `nil`.
Nhưng trước khi, chúng ta đi sâu vào việc **force unwrapping**, trước tiên hãy để lướt qua các khả năng mở ra một optional mà không cần ép buộc.
#### Làm sao để mở một giá trị optional
Có rất nhiều cách để mở một giá trị optional trong Swift. Chúng ta có thể dùng lệnh `guard`:
```
let name: String? = "Antoine van der Lee"
guard let unwrappedName = name else {
    return
}
print(unwrappedName.count)
```
Hoặc, chúng ta có thể sử dụng lệnh `if let`:
```
let name: String? = "Antoine van der Lee"
if let unwrappedName = name {
    print(unwrappedName.count)
}
```
Hoặc, chúng ta có thể sử dụng toán tử 2 dấu hỏi chấm. Nó sẽ trả về giá trị nếu có giá trị tồn tại hoặc giá trị mặc định. Ví dụ dưới đây, giá trị mặc định được là 0.
```
let name: String? = "Antoine van der Lee"
print(name?.count ?? 0)
```
#### Forced Unwrapping một optional sử dụng dấu chấm than (!)
Một optional có thể được mở một cách ép buộc, bằng cách sử dụng dấu chấm than (`!`) ngay sau giá trị optional đó.
```
var name: String? = "Antoine van der Lee"
print(name!.count)
```
Bất kể khi nào biến *name* trong ví dụ trên được gắn về `nil`, nó có thể là nguyên nhân gây ra lỗi khi chương trình đang chạy như sau đây:
```
Fatal error: Unexpectedly found nil while unwrapping an Optional value
```
#### Việc mở optional có thể được thực hiện theo chuỗi
**Optional chaining** có thể được thực hiện như sau:
```
struct BlogPost {
    let title: String?
}

let post: BlogPost? = BlogPost(title: "Learning everything about optionals")
print(post?.title?.count ?? 0)
```
Kết quả cũng sẽ giống như chúng ta sử dụng force-unwrapping:
```
let post: BlogPost? = BlogPost(title: "Learning everything about optionals")
print(post!.title!.count)
```
Hãy lưu ý rằng nếu chúng ta chỉ mở optional cuối cùng, chúng ta vẫn sẽ chỉ có được một kết quả là optional.
Ví dụ dưới đây chỉ force-unwrapping biến *title*, nhưng biến *post* thì không. Điều này có nghĩa là nếu *post* là `nil`, chúng ta vẫn có thể không lấy được *title*:
```
let post: BlogPost? = BlogPost(title: "Learning everything about optionals")
print(post?.title!.count) // Prints: Optional(35)
```
#### Optionals là cách tốt nhất, force unwrapping để bắt các lỗi khi lập trình
Hãy ưu tiên sử dụng optional như là một mặc định, tránh sử dụng dấu chấm than nếu không thực sự cần thiết. Một số còn khuyến nghị cho phép sử dụng [force-unwrapping theo luật SwiftLint](https://github.com/realm/SwiftLint/blob/master/Source/SwiftLintFramework/Rules/Idiomatic/ForceUnwrappingRule.swift). Điều này sẽ ngăn chặn được rất nhiều sự cố bất ngờ.
Tuy nhiên, thỉnh thoảng cũng có một số trường hợp tốt để sử dụng force unwrapping, như khi bắt buộc phải có lỗi khi giá trị là `nil`. Khi chúng ta muốn gỡ lỗi, sử dụng force unwrapping để bắt lỗi sớm.
### 2. Một optional là một Enum có 2 cases
Thật tốt khi biết rằng, về cơ bản Optional là một *Enum* có 2 cases:
```
enum Optional<Wrapped> {
    /// The absence of a value.
    case none

    /// The presence of a value, stored as `Wrapped`.
    case some(Wrapped)
}
```
Tuy nhiên, thay vì sử dụng case `.none`, chúng ra nên sử dụng giá trị `nil`để chỉ ra sự vắng mặt của một giá trị.
Hãy luôn nhớ rằng, chúng ta có thể định nghĩa biến `name` ở trên là optional bằng cách sử dụng enum:
```
let name = Optional.some("Antoine van der Lee")
print(name!.count)
```
Hoặc chúng ta có thể *switch* một optional như với một *enum* thông thường:
```
func printName(_ name: String?) {
    switch name {
    case .some(let unwrappedValue):
        print("Name is \(unwrappedValue)")
    case .none:
        print("Name is nil")
    }
}

printName(nil) // Prints: "Name is nil"
printName("Antoine van der Lee") // Prints: "Name is Antoine van der Lee"
```
Và nhìn vào [tài liệu](https://developer.apple.com/documentation/swift/optional) của nó, bạn có thể thấy rằng một option đi kèm với một số phương pháp tiện dụng, ví dụ như phương thức `map`:
```
let sideLength: Int? = Int("20")
let possibleSquare = sideLength.map { $0 * $0 }
print(possibleSquare) // Prints: "Optional(400)"
```
Hoặc phương thức `flatMap`, trong ví dụ dưới chỉ trả về tên nếu nó có ít nhất 5 kí tự:
```
var name: String? = "Antoine van der Lee"
let validName = name.flatMap { name -> String? in
    guard name.count > 5 else { return nil }
    return name
}
print(validName) // Prints: "Optional("Antoine van der Lee")"
```
#### Mở rộng các optional
Chúng ta đã biết rằng một optional được định nghĩa là enum, chúng ta có thể đoán rằng cũng có thể viết phần mở rộng cho nó!
Ví dụ phổ biến nhất là mở rộng optional `String` và xử lý giá trị trống:
```
extension Optional where Wrapped == String {
    var orEmpty: String {
        return self ?? ""
    }
}

var name: String? = "Antoine van der Lee"
print(name.orEmpty) // Prints: "Antoine van der Lee"
name = nil
print(name.orEmpty) // Prints: ""
```
### 3. Viết Unit Test cho optional
Khi bạn Unit Test, có một cách hay để làm việc với các optional mà không phải sử dụng tới force unwrapping. Nếu bạn sử dụng force unwrapping, bạn có nguy cơ gây ra một lỗi nghiêm trọng sẽ ngăn tất cả các unit test của bạn thành công.
Bạn có thể sử dụng `XCTUnwrap`để ném ra lỗi nếu optional không chứa giá trị:
```
func testBlogPostTitle() throws {
    let blogPost: BlogPost? = fetchSampleBlogPost()
    let unwrappedTitle = try XCTUnwrap(blogPost?.title, "Title should be set")
    XCTAssertEqual(unwrappedTitle, "Learning everything about optionals")
}
```
### 4. Các phương thức của Optional Protocol
Nếu bạn đã có kinh nghiệm với Objective-C, bạn có thể đã bỏ lỡ các phương thức của Optional Protocol.
Mặc dù có một cách tốt hơn để viết các phương thức của Optional Protocol trong Swift, cách phổ biến nhất trong các thư viện tiêu chuẩn trông như thế này:
```
protocol UITableViewDataSource : NSObjectProtocol {

    optional func numberOfSections(in tableView: UITableView) -> Int

    // ...
}
```
Điều này cho phép bạn gọi phương thức với dấu hỏi chấm như thế này:
```
let tableView = UITableView()
let numberOfSections = tableView.dataSource?.numberOfSections?(in: tableView)
```
### 5. Optional lồng nhau là hợp lệ
Mặc dù, trong [tài liệu](https://github.com/apple/swift-evolution/blob/master/proposals/0230-flatten-optional-try.md) này có đề cập cách loại bỏ một trong những nguyên nhân phổ biến nhất của các optional lồng nhau, nhưng nó vẫn là một thứ tồn tại hợp lệ!
```
var name: String?? = "Antoine van der Lee"
print(name!!.count)
```
Bạn có thể mở một optional mà vẫn trả về một optional khác. Điều này từng là trường hợp khi bạn sử dụng toán tử `try?` trong các phiên bản Swift trước đây.
Một ví dụ phổ biến là khi bạn làm việc với các dictionary có chứa các giá trị optional:
```
let nameAndAges: [String:Int?] = ["Antoine van der Lee": 28]
let antoinesAge = nameAndAges["Antoine van der Lee"]
print(antoinesAge) // Prints: "Optional(Optional(28))"
print(antoinesAge!) // Prints: "Optional(28)"
print(antoinesAge!!) // Prints: "28"
```
Bạn có thể thấy rằng về cơ bản nó chỉ yêu cầu bạn sử dụng thêm dấu chấm than hoặc dấu chấm hỏi.
### Tổng kết
Chúng ta đã đề cập đến rất nhiều điều bạn cần biết khi làm việc với các optional trong Swift. Từ những điều cơ bản của việc mở một optional bằng cách sử dụng dấu chấm than (`!!`) đến các cách thực hiện nâng cao của việc mở rộng enum Optional.