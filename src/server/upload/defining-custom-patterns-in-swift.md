Một trong những khía cạnh thú vị nhất của Swift là các core features được triển khai bằng chính ngôn ngữ Swift, thay vì được hard-coded vào trình biên dịch. Điều đó không chỉ tốt từ góc độ lý thuyết, mà còn mang đến cho chúng ta rất nhiều tính linh hoạt, vì nó cho phép chúng ta điều chỉnh cách ngôn ngữ hoạt động và hành xử theo những cách thực sự mạnh mẽ.
Một ví dụ về một tính năng như vậy là pattern matching, trong số những thứ khác, xác định cách thức cấu trúc control flow như switch và case. Trong bài viết này, hãy đi sâu vào thế giới pattern matching trong Swift - để xem cách chúng ta có thể xây dựng các patterns hoàn toàn tùy chỉnh và một số kỹ thuật thú vị mà chúng ta có thể sử dụng.
## Building the basics
Như tên của nó, pattern matching là match tất cả giá trị đã cho với pattern được xác định trước, thường để tìm ra nhánh mã nào để tiếp tục thực hiện chương trình. Ví dụ: mỗi khi chúng ta bật giá trị, chúng ta sẽ sử dụng tính năng pattern matchingcủa Swift:
```
func items(in section: Section) -> [Item] {
    switch section {
    case .featured:
        return dataSource.featuredItems
    case .recent:
        return dataSource.recentItems
    }
}
```
Ở trên, chúng ta match giá trị `Section` enum với hai pattern được tạo thành từ các trường hợp của nó (`featured` và `recent`) và đó là cách sử dụng matching pattern rất phổ biến trong Swift 
Để hiểu rõ hơn, hãy bắt đầu bằng cách xác định `Pattern` struct, chúng ta sẽ sử dụng để xác định các pattern dựa trên closure của chính nó. Các closure sẽ lấy một giá trị để match, và sau đó trả về kết quả dưới dạng Bool:
```
struct Pattern<Value> {
    let closure: (Value) -> Bool
}
```
Cấu trúc trên có thể đơn giản, nhưng nó thực sự cho phép chúng ta xác định tất cả các loại custom pattern, bằng cách mở rộng nó bằng [generic type constraints](https://www.swiftbysundell.com/articles/using-generic-type-constraints-in-swift-4/) để thêm [static factory methods](https://www.swiftbysundell.com/articles/static-factory-methods-in-swift/) tạo ra các pattern. Ví dụ, đây là cách chúng ta có thể định nghĩa một pattern cho phép chúng ta match một giá trị với một nhóm ứng cử viên nhất định:
```
extension Pattern where Value: Hashable {
    static func any(of candidates: Set<Value>) -> Pattern {
        Pattern { candidates.contains($0) }
    }
}
```
Tuy nhiên, trước khi chúng ta có thể sử dụng Pattern struct mới của chúng ta trong switch statement,  chúng ta cũng cần cho Swift biết cách đánh giá nó trong bối cảnh nhất định. Tất cả các hình thức matching pattern trong Swift đều được cung cấp bởi toán tử `~ =`, lấy pattern này để đánh giá làm đối số bên trái của nó và giá trị được khớp với giá trị bên phải của nó. Vì vậy, để chúng ta đưa Pattern của chúng ta vào hệ thống, tất cả những gì chúng ta phải làm là overload `~ = `với một hàm lấy một instance của struct mới của chúng ta và một giá trị để khớp - như thế này:
```
func ~=<T>(lhs: Pattern<T>, rhs: T) -> Bool {
    lhs.closure(rhs)
}
```
Với những điều đã có ở trên, giờ đây, chúng ta đã xây dựng tất cả các cơ sở hạ tầng cần thiết để xác định các custom pattern của riêng mình.
## Mix and match
Giả sử chúng ta đang làm việc trên một số dạng ứng dụng mạng xã hội, sử dụng struct `LoggedInUser` để theo dõi dữ liệu người dùng hiện đang đăng nhập - ví dụ: ID người dùng, cũng như ID của những người bạn mà họ đã thêm khi sử dụng ứng dụng:
```
struct LoggedInUser {
    let id: Identifier<User>
    var friendIDs: Set<Identifier<User>>
    ...
}
```
Giả sử chúng ta đang xây dựng một bộ view controller cho phép chúng ta hiển thị bất kỳ số lượng người dùng nào dưới dạng list - và chúng ta muốn hiển thị các biểu tượng khác nhau tùy thuộc vào loại người dùng nào chúng ta đang hiển thị. Quyết định đó hoàn toàn có thể được đưa ra trong một câu lệnh `switch` duy nhất, nhờ vào kiểu `Pattern` mới của chúng tôi và biến thể `any(of:)` nào của nó:
```
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
Ban đầu ở trên có vẻ không khác biệt so với việc viết logic bằng một chuỗi các câu lệnh `if` và `else`, nhưng nó làm cho mã của chúng tôi trở nên tường minh hơn - và cũng khiến `userID` trở thành một nguồn cho tất cả các quy tắc và kết quả có thể có.
## Comparing patterns
Chúng ta hãy tiếp tục mở rộng `Pattern` type của chúng tôi với nhiều khả năng hơn - lần này bằng cách thêm hỗ trợ cho các patter để so sánh một giá trị với một giá trị khác. Chúng ta sẽ làm điều đó bằng cách viết một phần extension bị ràng buộc bởi `Comparable` protocol của standard library (một ví dụ khác về core language feature được triển khai bằng standard Swift protocol), sẽ chứa hai phương thức - một phương thức khớp với các giá trị thấp hơn và một cho các phương thức lớn hơn:
```
extension Pattern where Value: Comparable {
    static func lessThan(_ value: Value) -> Pattern {
        Pattern { $0 < value }
    }

    static func greaterThan(_ value: Value) -> Pattern {
        Pattern { $0 > value }
    }
}
```
Ở trên rất hữu ích bất cứ lúc nào chúng tôi muốn so sánh các giá trị với nhau - như trong ví dụ sau đây, trong đó chúng ta cần xác định liệu người dùng có vượt qua ngưỡng điểm trò chơi bắt buộc hay họ có đạt được mức điểm cao mới hay không - tất cả trong một switch statement duy nhất:
```
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
## Converting key paths into patterns
Một cách khác để hình thành các pattern cực kỳ hữu ích, đó là sử dụng các [key paths](https://www.swiftbysundell.com/articles/the-power-of-key-paths-in-swift/). Các key paths đã được biểu thị bằng một loại cụ thể, KeyPath, chúng ta chỉ cần thêm một `~ =` để cho phép bất kỳ key path nào được sử dụng như một pattern:
```
func ~=<T>(lhs: KeyPath<T, Bool>, rhs: T?) -> Bool {
    rhs?[keyPath: lhs] ?? false
}
```
Với code ở trên, giờ đây chúng ta có thể tự do trộn các key path với các kiểu pattern khác, điều này sẽ cho phép chúng ta thể hiện các đoạn logic khá phức tạp chỉ bằng một câu lệnh switch.
Ví dụ: ở đây chúng ta quyết định parse một dòng văn bản thành một list item, dựa trên ký tự đầu tiên của nó - bằng cách sử dụng các `category properties` của Loại `Character` để tạo thành các pattern dựa trên key path, kết hợp với các pattern để phù hợp với optional enum trong hai trường hợp, như `where` clauses:
```
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
Chúng ta hãy xem cách chúng ta có thể thực hiện bất kỳ biểu thức dựa trên key path nào và kết hợp nó với một so sánh giá trị - cho phép chúng ta kết hợp cả hai để tạo thành các pattern mạnh mẽ hơn.
Để thực hiện điều đó, chúng ta hãy xác định overload toán tử khác, lần này là `==` - sẽ trả về một pattern kết hợp KeyPath và giá trị không đổi, như sau:
```
func ==<T, V: Equatable>(lhs: KeyPath<T, V>, rhs: V) -> Pattern<T> {
    return Pattern { $0[keyPath: lhs] == rhs }
}
```
Để giải quyết vấn đề trên, hãy giả sử rằng chúng ta hiện đang làm việc trên một ứng dụng shopping và chúng ta đang tính chi phí vận chuyển cho mỗi đơn hàng dựa trên `Destination` mà nó sẽ được gửi đến. Trong ví dụ này, chúng tôi trung tâm hậu cần được đặt tại thành phố Paris, nơi cho phép chúng tôi cung cấp vận chuyển miễn phí cho mọi người sống trong thành phố đó, cũng như giảm chi phí vận chuyển trong phạm vi châu Âu.
Vì hiện tại chúng ta có thể kết hợp các key path với các giá trị để tạo thành các pattern, chúng ta có thể dễ dàng tính toán mức chi phí vận chuyển nào dựa trên `Destination`, cụ thể như sau:
```
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
Không chỉ thực sự khác biệt, nó còn cho phép chúng ta dễ dàng chèn các quy tắc mới bất cứ khi nào cần thiết, theo cách mà không cần phải tăng độ phức tạp của code chúng ta.
## Conclusion
Thực tế là tính năng pattern matching của Swift chỉ được triển khai cụ thể cho một số ít loại hard-code, nhưng là một hệ thống hoàn toàn năng động có thể được mở rộng và tùy chỉnh, mang đến cho chúng ta một số khả năng vô cùng mạnh mẽ.
Tuy nhiên, giống như với bất kỳ hệ thống mạnh mẽ nào, điều quan trọng là phải xem xét cẩn thận thời điểm và cách triển khai nó - và luôn luôn sử dụng các kết quả call sites như hướng dẫn về loại pattenr mà chúng ta muốn có thể xây dựng. Mục tiêu cuối cùng của việc sử dụng các pattern mạnh mẽ để mô hình hóa logic phức tạp bằng cách sử dụng các câu lệnh switch là để làm cho logic đó dễ hiểu hơn.

Hy vọng bài viết sẽ có ích với các bạn

Reference: https://www.swiftbysundell.com/articles/defining-custom-patterns-in-swift/