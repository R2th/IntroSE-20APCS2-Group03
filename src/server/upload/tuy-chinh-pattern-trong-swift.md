- Một trong những đặc điểm nổi bật của Swift là có nhiều tính năng gốc được implement bằng chính Swift thay vì phải tuỳ chỉnh cứng trong complier. Về lý thuyết thì điều đó rất tiện lợi và cho chúng ta linh hoạt trong tuỳ chỉnh cách hoạt động có hiệu quả cao cho công việc.
- Ở bài viết này chúng ta sẽ cùng nghiên cứu sâu hơn về việc lựa chọn và tuỳ chỉnh pattern phù hợp trong Swift để thấy chúng ta có thể xây dựng các custom pattern hoàn chỉnh và một số kỹ thuật thú vị chúng ta có thể sử dụng sau này.

## 1/ Ví dụ đơn giản:
- `Pattern matching` là công việc khớp giá trị với các `pattern` được xác định trước đó thường để xác định ra nhánh code nào sẽ thực hiện công việc. VD: mỗi khi chúng ta `switch` dựa trên các giá trị có sẵn:

```swift
func items(in section: Section) -> [Item] {
    switch section {
    case .featured:
        return dataSource.featuredItems
    case .recent:
        return dataSource.recentItems
    }
}
```

- Bên trên chúng ta sử dụng enum `Section` để xác định 2 `pattern` được tạo trước đó (`featured` và `recent`), đây là một cách sử dụng thông thường về việc `pattern matching` trong swift, nó tí khi gây ra những ảnh hưởng không đáng có trong khi code.
- Để nói rõ hơn, chúng ta định nghĩa `Pattern` struct, chúng ta sẽ sử dụng nó để định nghĩa `closure` của chúng ta. `Closure` này sẽ lấy giá trị phù hợp và trả về kết quả `Bool`:

```swift
struct Pattern<Value> {
    let closure: (Value) -> Bool
}
```

- `struct` bên trên có vẻ đơn giản nhưng nó hoàn toàn cho phép chúng ta có thể định nghĩa các sắp xếp tuỳ chỉnh `pattern` bằng cách sử dụng `generic type constaints` để thêm các `static factory methods` để tạo các `pattern` của chúng ta.

```swift
extension Pattern where Value: Hashable {
    static func any(of candidates: Set<Value>) -> Pattern {
        Pattern { candidates.contains($0) }
    }
}
```

- Tất cả các `pattern matching` trong `Swift` đều rất mạnh mẽ, với việc sử dụng operator `~=` để dùng làm đối số bên trái và các giá trị phù hợp bên phải.

```swift
func ~=<T>(lhs: Pattern<T>, rhs: T) -> Bool {
    lhs.closure(rhs)
}
```

## 2/ Pha trộn và tuỳ chỉnh phù hợp:
- Nếu chúng ta đang làm việc trong app như mạng xã hội, khi sử dụng `LoggedInUser` struct để theo dõi date của user đã log in như id, friendId:

```swift
struct LoggedInUser {
    let id: Identifier<User>
    var friendIDs: Set<Identifier<User>>
    ...
}
```

- Bây giờ chúng ta muốn build 1 view controller để hiển thị bất kỳ số người sử dụng như một danh sách mà chúng ta muốn render các icon khác nhau phụ thuộc vào user thuộc loại nào. Quyết định đó được đưa ra bởi `switch statement`:

```swift 
private extension UserListViewController {
    func resolveIcon(for userID: Identifier<User>) -> Icon {
        switch userID {
        case loggedInUser.id:
            return .currentUser
        case .any(of: loggedInUser.friendIDs):
            return .friend
        default:
            return .anyUser
        }
    }
}
```

## 3/ Pattern so sánh:
- Tiếp tục mở rộng `Pattern` bằng cách thêm vào các chức năng. Chúng ta sẽ viết các extension sử dụng protocol `Comparable` bao gồm 2 `method`:

```swift
extension Pattern where Value: Comparable {
    static func lessThan(_ value: Value) -> Pattern {
        Pattern { $0 < value }
    }

    static func greaterThan(_ value: Value) -> Pattern {
        Pattern { $0 > value }
    }
}
```

- Đoạn code trên sẽ trở nên hữu dụng khi chúng ta muốn so sánh các giá trị hơn hoặc kém. Ở ví dụ này chúng ta chúng có thể kiểm tra user có vượt ngưỡng điểm của trò chơi không bằng cách sử dụng `switch`:

```switch
func levelFinished(withScore score: Int) {
    switch score {
    case .lessThan(50):
        showGameOverScreen()
    case .greaterThan(highscore):
        showNewHighscore(score)
    default:
        goToNextLevel()
    }
}
```

## 4/ Covert key path trong các pattern:

- Một các sử dụng khác của việc hình thành các mẫu cực kì hữu dụng là sử dụng `key-path`:

```swift
func ~=<T>(lhs: KeyPath<T, Bool>, rhs: T?) -> Bool {
    rhs?[keyPath: lhs] ?? false
}
```

- Với đoạn code trên chúng ta có thể pha trộn `key-path` với các kiểu `pattern` cho phép chúng ta có thể giải quyết các đoạn code logic phức tạp chỉ với việc sử dụng `switch statement`.
- Ởđây chúng ta đã quyết định cách phân tích một dòng văn bản trong một danh sách phụ thuộc vào first character bằng cách sử dụng `Character type` để tạo mẫu key-path, kết hợp với với các pattern phù hợp với enum `Kind`

```swift
struct ListItemParser {
    enum Kind {
        case numbered
        case unordered
    }

    let kind: Kind

    func parseLine(_ line: String) throws -> ListItem {
        // Here we're switching on an optional Character, which is
        // the type of values that Swift strings are made up of:
        switch line.first {
        case .none:
            throw Error.emptyLine
        case \.isNewline:
            return .empty
        case \.isNumber where kind == .numbered:
            return parseLineAsNumberedItem(line)
        case "-" where kind == .unordered:
            return parseLineAsUnorderedItem(line)
        case .some(let character):
            throw Error.invalidFirstCharacter(character)
        }
    }
}
```

- Để đoạn code trên hoạt động trơn tru, hãy định nghĩa 1 operator khác `==` sẽ trả về `Pattern` kết hợp `KeyPath` và một hằng số như sau:

```swift
func ==<T, V: Equatable>(lhs: KeyPath<T, V>, rhs: V) -> Pattern<T> {
    return Pattern { $0[keyPath: lhs] == rhs }
}
```

- Chúng ta đã kết hợp `key-path` với giá trị được tạo từ `pattern` chúng ta chỉ cần đơn giản implement cách chúng ta tính toán level của giá trị giao hàng với `Destination` như sau:

```swift
struct Destination {
    var address: String
    var city: String
    var country: Country
}

extension Destination {
    var shippingCost: ShippingCost {
        switch self {
        // Combining a key path with a constant value:
        case \.city == "Paris":
            return .free
        // Using a nested key path as a pattern:
        case \.country.isInEurope:
            return .reduced
        default:
            return .normal
        }
    }
}
```