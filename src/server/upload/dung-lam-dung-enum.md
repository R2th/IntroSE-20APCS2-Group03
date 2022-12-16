Nhà tâm lý học người Mỹ Abraham Maslow có một câu nói rất nổi tiếng

> Nếu dụng cụ duy nhất bạn có chỉ là một chiếc búa, thì mọi vấn đề đều trông giống cái đinh

Câu nói này rất phù hợp với lập trình. Mỗi vấn đề đều có nhiều cách tiếp cận với ưu nhược điểm riêng tuỳ theo ngữ cảnh và ràng buộc. Không có giải pháp nào luôn hợp lý hoặc luôn tệ trong tất cả các trường hợp, kể cả Singleton 😉.  `enum` cũng vậy. Nó là một tính năng ngôn ngữ linh hoạt và mạnh mẽ, tuy nhiên việc lạm dụng `enum` không chỉ làm giảm chất lượng code mà còn khiến codebase khó mở rộng hơn.

## Bản chất của enum
Trong tài liệu của mình, Apple chỉ ra rằng `enum` được tạo ra để [định nghĩa một type với mục đích chứa các giá trị liên quan tới nhau](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html). Nói cách khác, hãy dùng `enum` để nhóm một tập giá trị hữu hạn, cố định, và có quan hệ với nhau. Ví dụ như `enum` định nghĩa phương hướng

```swift
//Tạo enum Direction ở đây là hợp lý bởi
//các case liên quan tới nhau và số lượng case là hữu hạn
enum Direction {
    case top
    case left
    case bottom
    case right
}
```
## Vấn đề của enum
Một khi được định nghĩa, bạn sẽ không thể thêm `case` để mở rộng `enum` mà không làm ảnh hướng tới những chỗ nó được sử dụng. Điều này có thể mang lại lợi ích nếu bạn không dùng `default case` bởi Xcode sẽ giúp tránh việc bỏ lọt code. Tuy nhiên, đây cũng là một nhược điểm lớn trong trường hợp code hiện giờ không quan tâm tới `case` mới đó.

### Dùng enum để model các Error phức tạp
Chắc hẳn bạn đã từng dùng `enum` để nhóm các loại `Error` cho tầng Networking như dưới đây

```swift
enum APIError: Error {
    case invalidData(Data)
    case parsingError(Error)
    case noConnection
    case unknown(code: Int, description: String)
    //... các case khác ...
}
```

Thoạt nhìn, việc tạo `APIError` là hợp lý bởi chúng đều là lỗi liên quan đến Networking và giờ đây bạn có thể gõ cú pháp `.parsingError` hay `.invalidData` cực kì tiện lợi. Mặc dù vậy, hướng tiếp cận này có 2 nhược điểm lớn:
- Bạn không bao giờ muốn `switch` toàn bộ `case` của nó
- Nó không phải là cách tối ưu bởi `struct` là công cụ tốt hơn để giải quyết bài toán này
<br>

Trong quá trình sử dụng, ngoại trừ các function trong thân `APIError`, việc `switch` toàn bộ `case` là không cần thiết. Có thể bạn chỉ quan tâm đến lỗi `.noConnection` để hiện alert riêng và các lỗi khác sẽ dùng chung một kiểu alert. Cũng có thể bạn chỉ quan tâm đến một vài lỗi nhất định để xử lý logic code nhưng chắc chắn không bao giờ là tất cả `case` cùng lúc. Lý do là bởi ngoài việc cùng miêu tả lỗi Networking, các error trên không có quan hệ gì với nhau.<br>

Hơn nữa, về mặt logic, việc dùng `enum` ở đây là sai bởi số lỗi có thể xảy ra khi xử lý API là vô hạn. Điều này trái ngược trực tiếp với bản chất của enum được nhắc đến ở trên. Trong trường hợp này, model `APIError` bằng `struct` phù hợp hơn rất nhiều

```swift
struct InvalidData: Error {
    let data: Data
}

struct ParsingError: Error {
    let underlyingError: Error
}

struct NoConnection: Error { }

struct Unknown: Error {
    let code: Int
    let description: String
}
```

Nếu thực sự muốn nhóm các lỗi vào một kiểu `Error`, bạn chỉ cần tạo riêng một `protocol` và conform chúng với `protocol` đó

```swift
protocol APIError: Error { }

extension InvalidData: APIError { }
extension ParsingError: APIError { }
extension NoConnection: APIError { }
extension Unknown: APIError { }
```

Việc model `APIError` bằng `struct` và `protocol` giúp code linh hoạt hơn khi giờ đây việc tạo ra các `Error` mới không làm ảnh hưởng đến codebase. Bạn cũng có thể cung cấp hàm khởi tạo custom cho chúng, hay conform từng lỗi với các `protocol` khác nhau một cách dễ dàng thay vì những `switch` statement cồng kềnh trong `enum`. Cuối cùng, việc thêm và truy cập biến trong `struct` đơn giản hơn so với associated value trong `enum` rất nhiều.<br>

Sử dụng `enum` để model các `Error` đơn giản và hữu hạn là điều nên làm. Tuy nhiên, nếu tập `Error` đó lớn, hoặc chứa nhiều data đính kèm như các lỗi liên quan đến API thì `struct` là một lựa chọn tốt hơn hẳn. Trong thực tế, Apple cũng chọn cách này khi model [`URLError`](https://developer.apple.com/documentation/foundation/urlerror) cho tầng Networking của `Foundation`.

### Dùng enum để config code
Một sai lầm phổ biến nữa là dùng `enum` để config `UIView`, `UIViewController`, hoặc các object nói chung

```swift
enum MessageCellType {
    case text
    case image
    case join
    case leave
}

extension MessageCellType {
    var backgroundColor: UIColor {
        switch self {
        case .text: return .blue
        case .image: return .red
        case .join: return .yellow
        case .leave: return .green
        }
    }
    
    var font: UIFont {
        switch self {
        case .text: return .systemFont(ofSize: 16)
        case .image: return .systemFont(ofSize: 14)
        case .join: return .systemFont(ofSize: 12, weight: .bold)
        case .leave: return .systemFont(ofSize: 12, weight: .light)
        }
    }
    
    //...
}

class TextCell: UITableViewCell {
    func style(with type: MessageCellType) {
        contentView.backgroundColor = type.backgroundColor
        textLabel?.font = type.font
    }
}
```

`MessageCellType` định nghĩa các style cho giao diện của cell ứng với từng loại message để tái sử dụng ở nhiều màn khác nhau. Các thuộc tính chung có thể kể đến như `backgroundColor` hay `UIFont`.<br>

Giống với `APIError`, vấn đề đầu tiên của `MessageCellType` là bạn không muốn `switch` toàn bộ `case` của nó. Với mỗi loại cell, bạn chỉ muốn dùng một type nhất định để config cell đó. Việc `switch` tất cả các `case` ở hàm `cellForRow(at:)` là không hợp lý bởi bạn luôn phải trả ra `fatalError` hoặc một `UITableViewCell` bù nhìn để thoả mãn Xcode vì số lượng subclass của `UITableViewCell` là vô hạn 🤷‍♂️.<br>

Một vấn đề khác với `MessageCellType` là việc khó mở rộng. Bản chất của `enum` là tính hoàn thiện và hữu hạn. Khi thêm bất kì `case` mới nào, bạn đều phải update tất cả các `switch` statement sử dụng nó. Điều này đặc biệt tệ trong trường hợp bạn đang viết thư viện vì giờ đây thay đổi của bạn sẽ phá hỏng code từ phía client.<br>

Giải pháp cho `MessageCellType` là biến nó thành `struct` và tạo ra các biến `static` thuộc type này

```swift
struct MessageCellType {
    let backgroundColor: UIColor
    let font: UIFont
}

extension MessageCellType {
    static let text = MessageCellType(backgroundColor: .blue, font: .systemFont(ofSize: 16))
    static let image = MessageCellType(backgroundColor: .red, font: .systemFont(ofSize: 14))
    static let join = MessageCellType(backgroundColor: .yellow, font: .systemFont(ofSize: 12, weight: .bold))
    static let leave = MessageCellType(backgroundColor: .green, font: .systemFont(ofSize: 12, weight: .light))
}
```

Refactor từ `enum` thành `struct` giúp việc thêm config mới không còn là vấn đề bởi nó không hề ảnh hưởng tới codebase. Một lợi ích nhỏ nữa là bạn vẫn được gõ cú pháp `.join` hay `.leave` quen thuộc khi truyền chúng vào trong function

```swift
let cell = TextCell()
cell.style(with: .join)
```

## Tổng kết
Trước khi tạo `enum`, hãy luôn nhớ rằng
> Enum dùng để `switch`. Nếu bạn không chắc rằng mình muốn `switch` nó thì hãy sử dụng `struct` và `protocol`

Truy cập trang cá nhân của mình tại [linhta.dev](https://linhta.dev)  để đọc  các chủ đề iOS chuyên sâu khác và được cập nhật thường xuyên hơn nhé.