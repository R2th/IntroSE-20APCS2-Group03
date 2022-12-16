Không nghi ngờ gì nữa, việc triển khai enums của Swift là một trong những tính năng mạnh mẽ và được yêu thích nhất mà Swift cung cấp. Thực tế là Swift enums đi xa hơn cách liệt kê đơn giản các hằng số dựa trên số nguyên và hỗ trợ những giá trị liên quan và đối sánh mẫu phức tạp, khiến chúng trở thành một ứng cử viên tuyệt vời để giải quyết nhiều loại vấn đề khác nhau.
Tuy nhiên, có một số loại trường hợp enum có thể được cho là cần tránh, vì chúng có thể dẫn chúng ta đến một số tình huống khó khăn hoặc làm cho code của chúng ta cảm thấy ít "ngớ ngẩn" hơn những gì chúng ta dự định. Hãy cùng xem xét một số trường hợp như vậy và cách chúng có thể được refactor lại bằng cách sử dụng một số language features khác của Swift.
## Representing the lack of a value
Ví dụ: giả sử chúng ta đang làm việc trên một ứng dụng podcast và chúng ta đã triển khai các category khác nhau mà ứng dụng hỗ trợ bằng cách sử dụng enum. Enum đó hiện chứa các trường hợp cho mỗi category, cũng như hai trường hợp hơi đặc biệt được sử dụng cho các podcast hoàn toàn không có category (none), cũng như một category có thể được sử dụng để tham chiếu tất cả các category cùng một lúc (all):
```
extension Podcast {
    enum Category: String, Codable {
        case none
case all
        case entertainment
        case technology
        case news
        ...
    }
}
```
Sau đó, khi triển khai các tính năng như filter, chúng ta có thể sử dụng enum ở trên để thực hiện pattern matching với giá trị Category value mà người dùng đã chọn trong UI (được đóng gói trong Filter model):
```
extension Podcast {
    func matches(filter: Filter) -> Bool {
        switch filter.category {
        case .all, category:
            return name.contains(filter.string)
        default:
            return false
        }
    }
}
```
Thoạt nhìn, hai đoạn code trên có thể trông hoàn toàn ổn. Nhưng, nếu chúng ta nghĩ về nó, thực tế là chúng ta hiện đã add một `none` case cho một category không xác định được cho là không tốt, vì Swift có một tính năng ngôn ngữ tích hợp được thiết kế riêng cho điều đó. *optionals*.
Vì vậy, nếu thay vào đó, chúng ta biến `Podcast` model’s `category` property thành một optional, thì chúng ta có thể tận dụng tất cả các tính năng mà Swift tùy chọn hỗ trợ (chẳng hạn như câu lệnh `if let` ) khi xử lý các giá trị bị thiếu như vậy:
```
struct Podcast {
    var name: String
    var category: Category?
    ...
}
```
Một điều thực sự thú vị về sự thay đổi ở trên là bất kỳ câu lệnh `switch` nào mà chúng ta đã sử dụng trước đây trên `Podcast.Category` sẽ vẫn tiếp tục hoạt động như trước đây - vì thực tế thì bản thân Loại `optional` cũng là một enum sử dụng trường hợp không để biểu thị việc thiếu giá trị - có nghĩa là code như function sau có thể hoàn toàn không thay đổi (ngoài việc sửa đổi đối số của nó thành một optional):
```
func title(forCategory category: Podcast.Category?) -> String {
    switch category {
    case .none:
    return "Uncategorized"
    case .all:
        return "All"
    case .entertainment:
        return "Entertainment"
    case .technology:
        return "Technology"
    case .news:
        return "News"
    ...
    }
}
```
Ở trên hoạt động nhờ trình biên dịch của Swift tự động làm phẳng các optional khi chúng được sử dụng trong các context pattern matching (chẳng hạn như câu lệnh switch), cho phép chúng ta giải quyết các trường hợp trong chính loại `Optional`, cũng như các trường hợp được xác định trong enum `Podcast.Category` riêng, tất cả đều nằm trong cùng một statement.
## Domain-specific enums
Tiếp theo, hãy chuyển sự chú ý của chúng ta đến trường hợp của `Podcast.Category` enum all case, điều này cũng hơi lạ nếu chúng ta nghĩ về nó. Rốt cuộc, một podcast không thể thuộc tất cả các cateogory đồng thời, vì vậy `all` case chỉ thực sự có ý nghĩa trong `Filter` model.
```
extension Filter {
    enum Category {
        case any
        case uncategorized
        case specific(Podcast.Category)
    }
}
```
Điều thực sự hay về cách tiếp cận ở trên là giờ đây chúng ta có thể triển khai toàn bộ logic filter của mình bằng cách sử dụng [pattern matching capabilities](https://www.swiftbysundell.com/articles/pattern-matching-in-swift/) của Swift - bằng cách switch filtered category và sau đó sử dụng where để đính kèm logic bổ sung cho từng trường hợp:
```
extension Podcast {
    func matches(filter: Filter) -> Bool {
        switch filter.category {
        case .any where category != nil,
             .uncategorized where category == nil,
             .specific(category):
            return name.contains(filter.string)
        default:
            return false
        }
    }
}
```
Với tất cả các thay đổi ở trên, giờ đây chúng ta có thể tiếp tục và remove `none` và `all` cases khỏi enum `Podcast.Category` chính của chúng ta - để lại cho chúng ta danh sách đơn giản hơn nhiều về từng category mà ứng dụng của chúng ta hỗ trợ:
```
extension Podcast {
    enum Category: String, Codable {
        case entertainment
        case technology
        case news
        ...
    }
}
```
## Custom cases and custom types
Khi nói đến enums như `Podcast.Category`, rất phổ biến (tại một số điểm) giới thiệu một số loại custom case có thể được sử dụng để xử lý các trường hợp một lần hoặc để cung cấp khả năng tương thích chuyển tiếp bằng cách xử lý khéo léo các trường hợp có thể được thêm từ server trong tương lai.
Một cách để triển khai điều đó sẽ là sử dụng trường hợp có associated value - trong trường hợp String đại diện cho raw value của một custom category, như sau:
```
extension Podcast {
    enum Category: Codable {
        case all
        case entertainment
        case technology
        case news
        ...
        case custom(String)
    }
}
```
Thật không may, trong khi các associated values cực kỳ hữu ích trong các context khác, thì đây không thực sự là một trong số context đó. Trước hết, bằng cách thêm một case như vậy, enum của chúng ta không thể được hỗ trợ bằng chuỗi nữa, có nghĩa là bây giờ chúng ta sẽ phải viết custom encoding and decoding code, cũng như logic để chuyển đổi các instance thành raw strings.
Vì vậy, chúng ta hãy khám phá một cách tiếp cận khác, bằng cách chuyển đổi enum `Category` thành RawRepresentable struct, một lần nữa cho phép chúng ta tận dụng logic tích hợp của Swift để encoding, decoding, và xử lý string conversions cho các loại như vậy:
```
extension Podcast {
    struct Category: RawRepresentable, Codable, Hashable {
        var rawValue: String
    }
}
```
Vì hiện tại chúng ta có thể tự do tạo các instances `Category` từ bất kỳ custom string nào mà mình muốn, nên chúng ta có thể dễ dàng hỗ trợ cả  custom categories và future categories trong tương lai mà không yêu cầu bất kỳ code bổ sung nào từ phía chúng ta. Tuy nhiên, để đảm bảo rằng code của chúng ta vẫn tương thích ngược và để giúp dễ dàng tham khảo bất kỳ danh mục nào được tích hợp sẵn - chúng ta cũng mở rộng loại mới với các API tĩnh sẽ đạt được tất cả những điều đó:
```
extension Podcast.Category {
    static var entertainment: Self {
        Self(rawValue: "entertainment")
    }

    static var technology: Self {
        Self(rawValue: "technology")
    }

    static var news: Self {
        Self(rawValue: "news")
    }
    
    ...

    static func custom(_ id: String) -> Self {
        Self(rawValue: id)
    }
}
```
Mặc dù thay đổi ở trên yêu cầu phải thêm một số mã bổ sung, nhưng giờ đây chúng ta đã đạt được một thiết lập linh hoạt hơn gần như hoàn toàn tương thích ngược. Trên thực tế, các cập nhật duy nhất mà chúng ta cần thực hiện là mã thực hiện chuyển đổi toàn diện trên các `Category` values.
Ví dụ: `title` function mà chúng ta đã xem xét trước đó đã switch một giá trị như vậy để trả về title phù hợp với một category nhất định. Vì chúng ta không còn có thể nhận được danh sách đầy đủ của từng giá trị `Category` tại compile-time, nên bây giờ chúng ta phải sử dụng một cách tiếp cận khác để tính toán các title đó. Ví dụ: trong trường hợp cụ thể này, chúng ta có thể xem đây là một cơ hội tuyệt vời để di chuyển các chuỗi đó sang file `Localizable.strings` và sau đó giải quyết các title như sau:
```
func title(forCategory category: Podcast.Category?) -> String {
    guard let id = category?.rawValue else {
        return NSLocalizedString("category-uncategorized", comment: "")
    }

    let key = "category-\(id)"
    let string = NSLocalizedString(key, comment: "")

    // Handling unknown cases by returning a capitalized version
    // of their key as a fallback title:
    guard string != key else {
        return key.capitalized
    }

    return string
}
```
## Auto-named static properties
Như một mẹo bổ sung nhanh, một nhược điểm của phương pháp dựa trên cấu trúc ở trên là giờ đây chúng ta phải xác định thủ công các string raw values cho mỗi static properties của chúng ta, nhưng đó là điều mà chúng ta có thể giải quyết bằng cách sử dụng keyword `#function` của Swift. Vì từ khóa đó sẽ được tự động thay thế bằng tên của function (hoặc, trong trường hợp của chúng ta là property) mà encapsulating function của nó đang được gọi từ đó, điều đó sẽ cung cấp cho chúng ta automatic raw value mapping giống như khi sử dụng enum:
```
extension Podcast.Category {
    static func autoNamed(_ rawValue: StaticString = #function) -> Self {
        Self(rawValue: "\(rawValue)")
    }
}
```
Với tiện ích ở trên, giờ đây chúng tôi có thể chỉ cần gọi `autoNamed ()` trong mỗi built-in category APIs và Swift sẽ tự động điền vào các raw values đó cho chúng ta:
```
extension Podcast.Category {
    static var entertainment: Self { autoNamed() }
static var technology: Self { autoNamed() }
static var news: Self { autoNamed() }
    ...

    static func custom(_ id: String) -> Self {
        Self(rawValue: id)
    }
}
```
Tuy nhiên, đáng chú ý là chúng ta phải cẩn thận một chút để không đổi tên bất kỳ static properties nào ở trên khi sử dụng `#function`-based technique đó, vì làm như vậy cũng sẽ thay đổi raw value của `Category` trong thuộc tính đó. Tuy nhiên, đó cũng là trường hợp khi sử dụng enum và mặt khác, chúng ta hiện cũng đang ngăn chặn lỗi chính tả và các lỗi khác có thể xảy ra khi xác định raw string manual.

Hy vọng bài viết sẽ có ích với các bạn

Reference: https://www.swiftbysundell.com/articles/avoiding-problematic-enum-cases-in-swift/