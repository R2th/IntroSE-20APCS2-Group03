- Việc hỗ trợ nhiều ngôn ngữ là một yếu tố cần thiết để App của bạn trở nên phổ biến trên App Store vì chung quy lại thì người sử dụng nào cũng muốn sử dụng ngôn ngữ mẹ đẻ của mình.

- Chính vì tâm lý này mà Apple đã cung cấp cho chúng ta kha khá `API` để xử lý các `resource` như `localized` với các tuỳ chỉnh cần thiết để chúng ta có thể hiển thị đa ngôn ngữ cho App.

- Việc `render` `UI` cho các quốc gia khác nhau trở nên đơn giản với việc định nghĩa sẵn của `developer`.

```swift
// English
"NewMovies" = "**New** movies";

// Swedish
"NewMovies" = "**Nya** filmer";

// Polish
"NewMovies" = "**Nowe** filmy";

// VietNam
"NewMovies" = "**Phim Mới**";
```

- Chúng ta sẽ thực hiện chia nhỏ `format` của `string` trên thành từng đoạn `text` nhỏ bằng cách sử dụng `NSAtributedString`. Chúng ta cần định nghĩa `type` cho `LocalizedString` để có thể `implement` tất cả các `logic` được yêu cầu,  tiếp đó chúng ta cần khởi tạo một `instance` với các `localized string key` để có thể xử lý `raw` `String` bằng việc sử dụng `method` `NSLocalizedString`:

```swift
struct LocalizedString {
    var key: String

    init(_ key: String) {
        self.key = key
    }

    func resolve() -> String {
        NSLocalizedString(key, comment: "")
    }
}

extension LocalizedString: ExpressibleByStringLiteral {
    init(stringLiteral value: StringLiteralType) {
        key = value
    }
}
```

- Với định dạng `type` bên trên thì chúng ta bây giờ hoàn toàn có thể sử dụng `NSAtributedString` để chuyển đổi và hiển thị `UI`.

## 1/ Attributed strings:

- Như tên định nghĩa thì `NSAtributedString` cho phép chúng ta thêm vào các thuộc tính để hiển thị cho chuỗi `String` mặc định trong trường hợp chúng ta cần có các chú thích, nhấn mạnh cho chuỗi `string` đó.

- Chúng ta cần mở rộng `LocalizedString` để có thể thực hiện điều đó bằng việc thêm vào `method` để có thể chia nhỏ chuỗi `raw localizlized` thành các `component` nhỏ với việc sử dụng `Markdown-style` `**` sau đó thêm vào `style` tuỳ chỉnh cho `component`.

```swift
extension LocalizedString {
    typealias Fonts = (default: UIFont, bold: UIFont)

    static func defaultFonts() -> Fonts {
        let font = UIFont.preferredFont(forTextStyle: .body)
        return (font, .boldSystemFont(ofSize: font.pointSize))
    }

    func attributedString(
        withFonts fonts: Fonts = defaultFonts()
    ) -> NSAttributedString {
        let components = resolve().components(separatedBy: "**")
        let sequence = components.enumerated()
        let attributedString = NSMutableAttributedString()

        return sequence.reduce(into: attributedString) { string, pair in
            let isBold = !pair.offset.isMultiple(of: 2)
            let font = isBold ? fonts.bold : fonts.default

            string.append(NSAttributedString(
                string: pair.element,
                attributes: [.font: font]
            ))
        }
    }
}
```

- Sử dụng tuỳ chỉnh trên chúng ta có thể `render` các chuỗi `localized` với các `style` đã được tuỳ chỉnh cho các `UIKit` `class` như `UILabel` hay `UITextView`.

- Để sử dụng tuỳ chỉnh trên cho `SwiftUI` chúng ta cần `refactor` lại đoạn `code` trên để có thể tái sử dụng các `render logic` tránh việc phải `copy` lại.

- Phương án `refactor` ở đây là sử dụng `generic` để giảm thiểu việc phải viết đi viết lại các đoạn `code` để `render` `UI`. Cụ thể ở đây chúng ta dùng `method` `reduce`:

```swift
private extension LocalizedString {
    func render<T>(
        into initialResult: T,
        handler: (inout T, String, _ isBold: Bool) -> Void
    ) -> T {
        let components = resolve().components(separatedBy: "**")
        let sequence = components.enumerated()

        return sequence.reduce(into: initialResult) { result, pair in
            let isBold = !pair.offset.isMultiple(of: 2)
            handler(&result, pair.element, isBold)
        }
    }
}
```

- So với `method` `NSAtributedString` cơ bản trước đó chúng ta cần tập trung cho việc chú thích thêm cũng như kết hợp các chuỗi `string` đã được truyền vào `handler`:


```swift
extension LocalizedString {
    ...

    func attributedString(
        withFonts fonts: Fonts = defaultFonts()
    ) -> NSAttributedString {
        render(
            into: NSMutableAttributedString(),
            handler: { fullString, string, isBold in
                let font = isBold ? fonts.bold : fonts.default

                fullString.append(NSAttributedString(
                    string: string,
                    attributes: [.font: font]
                ))
            }
        )
    }
}
```

## 2/ Cách sử dụng localized để sử dụng trong SwiftUI Text:
 - Một trong những tính năng không được chú ý của `Text` trong `SwiftUI` là chúng ta có sử dụng `operation` `add` để kết hợp nhiều chuỗi `string` với các tuỳ chỉnh khác nhau lại. Chúng ta cần mở rộng `API` `LocalizedString` để gọi một `method` với với tên `render` để kết hợp từng chuỗi `string` cần tuỳ chỉnh lại:

 ```swift
extension LocalizedString {
    func styledText() -> Text {
        render(into: Text("")) { fullText, string, isBold in
            var text = Text(string)

            if isBold {
                text = text.bold()
            }

            fullText = fullText + text
        }
    }
}
 ```

## 3/ Tùy chỉnh `localized` để có thể sử dụng cho cả UIKit và SwiftUI:

- Chúng ta cùng xem xét một số tùy chỉnh cho `UILabel` và `Text` khiến chúng trở nên dễ sử dụng hơn, cho phép chúng ta có thể khởi tạo trực tiếp chúng với các giá trị cũng như `style` mà ta mong muốn:

```swift
extension UILabel {
    convenience init(styledLocalizedString string: LocalizedString) {
        self.init(frame: .zero)
        attributedText = string.attributedString()
    }
}

extension Text {
    init(styledLocalizedString string: LocalizedString) {
        self = string.styledText()
    }
}
```
 
- Cách sử dụng `UILabel` cho `UIKit` cũng như `Text` cho `SwiftUI` kèm theo `string` đã được `localized` trở nên vô cùng ngắn gọn và đơn giản như sau:

```swift
// UIKit
UILabel(styledLocalizedString: "NewMovies")

// SwiftUI
Text(styledLocalizedString: "NewMovies")
```

- Cách sử dụng này kèm theo một vấn đề mà chúng ta cần lưu tâm đó là chúng ta luôn `parsing` lại mỗi `string` khi chúng các `Label` cũng như `Text` này được gọi tới, đồng nghĩa nếu chúng ta luôn `update` lại `UI` thì chúng ta cần phải `caching` chúng lại tránh việc `parsing` không cần thiết.

- Tất cả `string` mà chúng ta `parsing` được `load` từ `static resource`, chúng ta nên `cache` chúng lại một cách cẩn thận và để thực hiện điều đó chúng ta sử dụng `type` `Cache` để tùy chỉnh `method` `render` có thể `read` và `write` từ `type` `Cache`:

```swift
private extension LocalizedString {
    static let attributedStringCache = Cache<String, NSMutableAttributedString>()
static let swiftUITextCache = Cache<String, Text>()

    func render<T>(
        into initialResult: @autoclosure () -> T,
        cache: Cache<String, T>,
        handler: (inout T, String, _ isBold: Bool) -> Void
    ) -> T {
        if let cached = cache.value(forKey: key) {
    return cached
}

        let components = resolve().components(separatedBy: "**")
        let sequence = components.enumerated()

        let result = sequence.reduce(into: initialResult()) { result, pair in
            let isBold = !pair.offset.isMultiple(of: 2)
            handler(&result, pair.element, isBold)
        }

        cache.insert(result, forKey: key)
        return result
    }
}
```

- Hãy chú ý rằng `attributedStringCache` lưu giữ `NSMutableAttributedString` `instance` đó là bởi vì chúng ta làm việc với `type` chúng ta gọi `render` từ  `method``attributedString`. Không có tác dụng phụ gì khi chúng ta sử dụng những `mutable` `instance` với các `type``LocalizedString` nhưng từ bây giờ chúng ta nên `copy` tất cả các `attributed` `string` trước khi trả giá trị cho chúng để có thể tránh các tai nạn có thể xảy ra khi chia sẻ các `mutable` `state`.

```swift
extension LocalizedString {
    ...

    func attributedString(
        withFonts fonts: Fonts = defaultFonts()
    ) -> NSAttributedString {
        let string = render(
            into: NSMutableAttributedString(),
            cache: Self.attributedStringCache,
            handler: { fullString, string, isBold in
                ...
            }
        )

        return NSAttributedString(attributedString: string)
    }

    func styledText() -> Text {
        render(
            into: Text(""),
            cache: Self.swiftUITextCache,
            handler: { fullText, string, isBold in
                ...
            }
        )
    }
}
```