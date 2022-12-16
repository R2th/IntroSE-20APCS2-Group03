Đây chỉ là một cách tiếp cận thú vị. Có lẽ đối với một số bạn có thể đơn giản hơn vì dường như mọi người đều biết các kiểu CSS. Ngoài ra, nó có thể hữu ích nếu bạn cần chia sẻ cùng kiểu với Frontend codebase. Tôi nghĩ rằng, có một số trường hợp có thể hữu ích, ví dụ như khi chúng ta có một trang giống như Wikipedia hoặc một tài liệu với các tiêu đề khác nhau, các loại văn bản khác nhau.

### Classical approach
<br>
Đây là cách thực hiện cổ điển và thông thường. Chúng ta tạo NSAttributionString và sau đó chỉ cần thêm các thuộc tính cần thiết. Rõ ràng là cổ điển không có nghĩa là xấu.

```
let text = "Phong cách tạo NSAttributionString cổ điển :) ."

let font = UIFont.systemFont(ofSize: 24)
let paragraphStyle = NSMutableParagraphStyle()
paragraphStyle.firstLineHeadIndent = 4.0
paragraphStyle.alignment = .center

let attributes: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: UIColor.green,
    .paragraphStyle: paragraphStyle
]

let attributedText = NSAttributedString(string: text, attributes: attributes)
```

### CSSAttributedString approach
<br>

Đây là cách bạn có thể làm nếu bạn muốn thay đổi giao diện văn bản với sự trợ giúp của CSS.

<br>

Trước hết, bạn cần thêm một func **init()** vào **NSAttributionString** object . Vì vậy, bạn có thể khởi tạo các attributed strings một cách đơn giản. Ở đây tôi sử dụng thẻ `<p> </ p>` vì đây là thành phần văn bản cơ bản. Đừng quên rằng các thẻ có thể có kiểu trình duyệt mặc định như phông chữ mặc định cho văn bản. Trong trường hợp `<p>`, nó là một thành phần khối theo mặc định. Nó có nghĩa là nó luôn bắt đầu trên một dòng mới và lấp đầy không gian ngang sang trái và phải. Mỗi yếu tố tiếp theo sẽ được hiển thị dưới đây.

<br>

```
extension NSAttributedString {

    convenience init(text: String, styles: [String: String]) {

        // Prepare a style string for passing to the HTML attribute
        // So the final value of the style attribute will look like this
        // "color: #000;font-size: 12px;font-family: Helvetica;font-style: italic"
        let style = styles.compactMap({ (property, value) -> String in
            return "\(property): \(value)"
        }).joined(separator: ";")

        // Initialize from the styled <p> HTML tag
        // We can force-unwrap this because in case of incorrect styles the string will be initialized anyway
        try! self.init(
            data: Data("<p style=\"\(style)\">\(text)</p>".utf8),
            options: [.documentType: NSAttributedString.DocumentType.html, .characterEncoding: String.Encoding.utf8.rawValue],
            documentAttributes: nil
        )
    }

}
```

<br>

 Vì vậy, bây giờ bạn có thể tạo các chuỗi theo kiểu của bạn như thế này. Tất cả các thuộc tính được hỗ trợ trong Safari cũng phải được hỗ trợ tại đây! Nhân tiện, để sử dụng cùng một phông chữ như trong iOS, bạn có thể cung cấp `-apple-system, system-ui` cho thuộc tính `font-family`. Vì vậy, nó sẽ tự động sử dụng phông chữ San-Francisco.
 
 <br>
 
 ```
 let header = NSAttributedString(
    text: "This is a Header with CSS, hoorah!",
    styles: [
        "color" : "#89da20",
        "font-size": "24px",
        "font-family": "-apple-system, system-ui"
    ]
)
```

### Better structure

Tất nhiên, chúng ta có thể đi xa hơn. Chúng tôi có thể chuẩn bị ánh xạ cho các tiêu đề, nội dung, chú thích, v.v ... Trong trường hợp nội dung phức tạp, bạn có thể tạo toàn bộ hệ thống để tạo kiểu bằng flexbox, v.v. Tôi đã thử nghiệm tất cả các thuộc tính CSS, vì vậy hãy thử.

```
enum Styles {
    static let header = [
        "color" : "#89da20",
        "font-size": "24px",
        "font-family": "-apple-system, system-ui"
    ]
    static let body = [
        "color" : "#333",
        "font-size": "16px",
        "font-family": "-apple-system, system-ui"
    ]
    static let caption = [
        "color" : "#666",
        "font-size": "12px",
        "font-family": "-apple-system, system-ui",
        "font-style": "italic",
        "text-align": "right"
    ]
}

let header = NSAttributedString(text: "Le Mourillon", styles: Styles.header)
let body = NSAttributedString(
    text: "Le Mourillon est un des quartiers de l'Est de Toulon dont les hauteurs appartiennent à la Provence cristalline. C'est un véritable village provençal enclavé dans la ville toulonnaise, disposant de plusieurs monuments historiques (forts), églises, places, d'un musée (arts asiatiques), de son marché quotidien et de ses diverses rues commerçantes.",
    styles: Styles.body
)
let caption = NSAttributedString(text: "https://fr.wikipedia.org/wiki/Le_Mourillon", styles: Styles.caption)
```

![](https://images.viblo.asia/610ebf22-da91-4790-9658-c312f3d56e7f.png)

<br>

Bạn có thể triển khai phương thức nối cho NSAttributionStrings, vì vậy bạn có thể nối các chuỗi bằng dấu cộng.

```
extension NSAttributedString {

    static func +(lhs: NSAttributedString, rhs: NSAttributedString) -> NSAttributedString {
        let concatenatedString = NSMutableAttributedString(attributedString: lhs)
        concatenatedString.append(rhs)

        return concatenatedString
    }

}

textView.attributedText = header + body + caption
```

### Conclusion
Vì vậy, chỉ cần thử nghiệm với điều này. Và có lẽ bạn có thể tìm thấy nó phù hợp với dự án của bạn. Bài viết được dịch từ [bài viết](https://ilyagru.github.io/cssattributedstring-in-swift?utm_campaign=Swift%20Weekly&utm_medium=email&utm_source=Revue%20newsletter&fbclid=IwAR22AS5HjzZi2g4GFjuamcWGbFW1uXLDsrzmNOuMCJYM-Y8CYGIuEiEoAJM) cùng tên của tác giả **Ilya Gruzhevski**

### References
1. **[NSAttributedString Apple Documentation](https://developer.apple.com/documentation/foundation/nsattributedstring)**
2. **[W3Schools CSS reference](https://www.w3schools.com/cssref/)**