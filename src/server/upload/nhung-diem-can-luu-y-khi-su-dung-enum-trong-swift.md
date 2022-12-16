- `Enum` là một trong những `API` mạnh mẽ được yêu thích nhất trong `Swift`. Thực tế là trong `Swift` thì `Enum` được phát triển cẩn thận để người dùng có thể sử dụng trong nhiều trường hợp với nhiều `type` khác nhau.

- Tuy nhiên vẫn có một số loại trường hợp chúng ta cần tránh khi sử dụng `Enum` vì rất có thể chúng ta sẽ tự làm chúng ta trở nên ngớ ngẩn cũng như việc `code` trở nên khó đọc khó hnhau

# 1/ Liệt kê thiếu trường `case`:

- Lấy ví dụ cụ thể khi làm việc với app `Podcast` với các danh mục khác nhau và hai `case` đặc biệt sử dụng cho toàn bộ `podcast` hoặc không sử dụng cho bất kỳ một `podcast` nào:

```swift
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

- Sau đó chúng ta sẽ triển khai một `filter` để so sánh `string value` người dùng đã chọn trong quá trình sử dụng app `Podcast`:

```swift
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

- Mới nhìn thì triển khai trên trông có vẻ ổn. Tuy nhiên, nếu chúng ta dừng lại suy nghĩ kỹ 1 tẹo thì bản thân trong `Swift` cũng có một tính năng giải quyết cho trường hợp `value` của `variable` có thể có hoặc không, đó là `optronglđã

- Vì vậy chúng ta sẽ  sử dụng `optional` cho `category` trong `struct` `Podcast` để tận dụng tất cả các tính năng mà `Swift` đã hỗ trợ xử lý các giá trị `optional` (`if let`) :

```swift
struct Podcast {
    var name: String
    var category: Category?
    ...
}
```

- Sử dụng `switch` ở đây là một điều thú vị khi chúng ta có thể áp dụng `optional` `Category` ở bên trên mà `function` hoàn toàn không thay đổi cơ chế hoạt động. Cụ thể ở đây chúng ta sử dụng `case none` để liệt kê các `case` chúng ta đã `lack`:

```swift 
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

## 2/ Sử dụng tên cụ thể cho từng case:

- Trên thực tế thì một `podcast` không thể thuộc tất cả các `category` nên trường hợp `all` chỉ phát huy tác dụng khi sử dụng cùng `filter`.

- Vì vậy, thay vì bao gồm trường hợp đó trong danh mục Danh mục chính của chúng tôi, thay vào đó, hãy tạo một loại chuyên dụng cụ thể cho miền lọc. Bằng cách đó, chúng tôi có thể phân tách các mối quan tâm khá gọn gàng và vì chúng tôi đang sử dụng các loại lồng nhau, chúng tôi có thể đặt địa chỉ mới của mình sử dụng cùng tên Danh mục, chỉ lần này nó sẽ được lồng trong mô hình Bộ lọc của chúng tôi - như thế này:

- Thay vì chỉ sử dụng các `case` trong `enum` `Category` chúng ta sẽ tạo một `enum` riêng để sử dụng riêng cho `Filter`. Bằng cách này chúng ta có thể tách biệt rõ ràng các danh mục khi chúng ta bắt đầu sử dụng `nested-type` như sau:

```swift 
extension Filter {
    enum Category {
        case any
        case uncategorized
        case specific(Podcast.Category)
    }
}
```

- Bằng cách sử dụng `where` trong `switch-case` chúng ta đã triển khai được `logic filter` một cách cụ thể và ngắn gọn dễ hiểu hơn:

```swift 
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
  một
}
```

- Giờ đây chúng ta có thể tiếp tGc với việc xóa tất cả các `case`  khỏi danh sách `Podcast.Category` để có một danh sách đơn giản hơn nhiều về từng danh mục:

```swift
extension Podcast {
    enum Category: String, Codable {
        case entertainment
        case technology
        case news
        ...
    }
}
```

## 3/ Các trường hợp với các `custom type`:

- `Enum` `Podcast.Category` cần được lưu ý về khả năng có thể mở rộng tron tương lai khi chúng ta bổ sung các `case`. Để làm được điều này chúng ta có thể xem việc tạo một `case` tuỳ chình với `type` cụ thể.

- Như vây thì `case` cần có `associated-value` như việc chúng ta có `rawValue` dưới dạng `String` để đại diện cho `category` `custom`:

```swift
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

- Trong khi `associated-value` có thể hữu ích trong một số bối cảnh thì ở bối cảnh này nó lại không phát huy được sức mạnh vì trong tương lai với các `custom-type` đặc biệt chúng ta sẽ cần có thể các `method` để `decode` hoặc `encode` các value pyhù hợp với `rawValue`.

- Vì vậy chúng ta cần khám phá một hướng tiếp cận khác như chuyển đổi `enum` `Categor` thành `RawRepresentable`. Chúng ta sẽ sử dụng tính năng có sẵn của `Swift` để thực hiện việc `encode`/`decode` khi làm việc với `string value` của `rawValue`.

```swift
extension Podcast {
    struct Category: RawRepresentable, Codable, Hashable {
        var rawValue: String
    }
}
```

- Chúng ta hiện tại có thể tự do khởi tạo `Category` từ bất kỳ `custom string` mà chúng ta muốn để có thể phù hợp với các tính năng trong tương lai. Tuy nhiên để đảm bảo tính năng mới có thể tương thích ngược lại thì chúng ta cần sử dụng các `static` cho các `type` mới:

```swift 
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

- Chúng ta có `function` có tên `titie` trả về `String` ứng với từng `case` của `Category` khi sử dụng `switch` `method`. Tuy nhiên với những thay đổi bên trên chúng ta cần có điều chỉnh thích hợp để trả về các giá trị cho `title` thích hợp. Chúng ta sẽ di chuyển các giá trị `string` đó sang `Localizable.string` và thực hiện các xử lý cần thiết trước khi trả về giá trị `String` cuối cùng cho `title`:

```swift 
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

## 4/ Đặt tên tự động cho `static property`:
function
- Đây thực chất là một ịnh mà chúng ta cần bổ sung thêm khi một nhược điểm của phương pháp dựa trên `code-base` ở trên là giờ đây chúng ta phải thủ công xác định các `rawValue` cho mỗi `static property` song đó là điều mà chúng ta có thể dễ dàng giải quyết với việc sử dụng `keyword` `#function` để tự động thay thế  tên của `function` (hoặc `property`) như sau:

```swift 
extension Podcast.Category {
    static func autoNamed(_ rawValue: StaticString = #function) -> Self {
        Self(rawValue: "\(rawValue)")
    }
ion
```

- Với `extension` ở trên thì chỉ cần gọi đến `autoNamed()` tronvàmỗi `API` `category` được tích hợp sẵn và `Swift` sẽ tự động điền các `rawValue` đó cho chúng ta:

```swift 
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