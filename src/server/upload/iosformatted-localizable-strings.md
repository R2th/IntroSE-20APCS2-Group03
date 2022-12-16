## Giới thiệu
Với định dạng *string* như dưới đây, làm cách nào bạn có thể thực hiện nó với ***Localizable*** 

![](https://images.viblo.asia/83b5f7f4-b61b-4c21-9f16-3e0bb49dff6f.png)

Thật không may, không có nhiều phương án khi sử dụng Apple SDK, vì vậy  chúng ta thường sử dụng các phương pháp tiếp cận không được tốt. 

## Các cách tiếp cận cũ và không tối ưu
### Sử dụng chuỗi liên kết 
Một trong những cách tiếp cận phổ biến là chia văn bản thành nhiều khóa và nối chúng với nhau.

```
// Localizable.strings
"macbook.title-p1" = "M1 delivers up to ";
"macbook.title-p2" = "2.8x faster ";
"macbook.title-p3" = "processing performance than the ";
"macbook.title-p4" = "previous generation.";

// Usage.swift
let components = [
    NSAttributedString(string: NSLocalizedString("macbook.title-p1"), attributes: [
        .font: UIFont.systemFont(ofSize: 15)
    ]),
    NSAttributedString(string: NSLocalizedString("macbook.title-p2"), attributes: [
        .font: UIFont.boldSystemFont(ofSize: 15)
    ]),
    NSAttributedString(string: NSLocalizedString("macbook.title-p3"), attributes: [
        .font: UIFont.systemFont(ofSize: 15)
    ]),
    NSAttributedString(string: NSLocalizedString("macbook.title-p4"), attributes: [
        .link: URL(string: "https://support.apple.com/kb/SP799")!,
        .font: UIFont.systemFont(ofSize: 15),
        .underlineColor: UIColor.clear
    ])
]
let string = NSMutableAttributedString()
components.forEach(string.append)
label.attributedText = string

```

Vấn đề là thứ tự của các từ và cụm từ được *hard-coded*. Cấu trúc của câu thường sẽ có ngữ cảnh hoàn toàn khác trong ngôn ngữ khác nhau. Điều này thường sẽ khiến bạn không thể dịch văn bản trong các ngôn ngữ khác, nó sẽ gây nhầm lẫn trong quá trình dịch.

### Tra cứu chuỗi con
Một cách tiếp cận khác (không tốt) là sử dụng tra cứu chuỗi con để áp dụng các *attributes* (thuộc tính).

```
// Localizable.strings
"macbook.title" = "M1 delivers up to 2.8x faster processing
    performance than the previous generation";
"macbook.title-substring-bold" = "2.8x faster";
"macbook.title-substring-link" = "previous generation";

// Usage.swift
let text = NSLocalizedString("macbook.title")
let string = NSMutableAttributedString(
    string: text,
    attributes: [.font: UIFont.systemFont(ofSize: 15)]
)
if let range = text.range(of: NSLocalizedString("macbook.title-substring-bold")) {
    string.addAttributes([
        .font: UIFont.boldSystemFont(ofSize: 15)
    ], range: NSRange(range, in: text))
}
if let range = text.range(of: NSLocalizedString("macbook.title-substring-link")) {
    string.addAttributes([
        .link: URL(string: "https://apple.com")!,
        .underlineColor: UIColor.clear
    ], range: NSRange(range, in: text))
}
label.attributedText = string
```

Điều này tốt hơn một chút so với giải pháp trước đó vì nó cung cấp nhiều quyền kiểm soát hơn cho người dịch. Vẫn có thể xảy ra sự cố nếu một chuỗi con lặp lại hai lần trở lên thành một chuỗi đầy đủ - chỉ kết quả phù hợp đầu tiên mới nhận được các  *attributes*  tùy chỉnh và nó có thể là *attributes*  sai.
Nhưng vấn đề chính là đây sẽ là một vấn đề lớn khi dịch và thường có thể dẫn đến sự cố trong đó ai đó sẽ cập nhật chuỗi gốc nhưng lại quên cập nhật một trong các chuỗi con.

### HTML

Nếu bạn tìm kiếm, một trong những đề xuất phổ biến là sử dụng *HTML*. Bạn có thể sử dụng *webview* nếu bạn cần hiển thị một phần lớn của màn hình. Và đối với *label*, có một cách riêng để chuyển đổi [HTML sang NSAttributedString](https://www.hackingwithswift.com/example-code/system/how-to-convert-html-to-an-nsattributedstring).

```
// Localizable.strings
"macbook.title" = "M1 delivers up to <b>2.8x faster</b> processing
    performance than the <a href='%@'>previous generation.</a>";

// Usage.swift
let format = NSLocalizedString("macbook.title")
let string = String(format: format, "https://support.apple.com/kb/SP799")
label.attributedText = try? NSAttributedString(
    data: string.data(using: .utf8) ?? Data(),
    options: [.documentType: NSAttributedString.DocumentType.html],
    documentAttributes: nil
)
```

Bây giờ, nó đã tốt hơn, nhưng có một số vấn đề mà bạn cần lưu ý. Đầu tiên, nó không hoàn toàn mang lại kết quả như chúng ta mong muốn. Theo mặc định, nó sử dụng kiểu văn bản *WebKit*.

![](https://images.viblo.asia/94b79ef7-d9b6-4506-9f45-81b87817f001.png)

Một trong những cách bạn có thể làm nữa là sử dụng *CSS*.

```
public extension NSAttributedString {
    static func make(html: String, size: CGFloat) -> NSAttributedString? {
        let style = """
        body {
          font-family: -apple-system;
          font-size: \(size)px;
        }
        b {
          font-weight: 600;
        }
        a {
          text-decoration: none;
        }
        """

        let template = """
        <!doctype html>
        <html>
          <head>
            <style>
              \(style)
            </style>
          </head>
          <body>
            \(html)
          </body>
        </html>
        """

        return try? NSAttributedString(
            data: template.data(using: .utf8) ?? Data(),
            options: [.documentType: NSAttributedString.DocumentType.html],
            documentAttributes: nil
        )
    }
}
```

Bây giờ nó phù hợp với thiết kế mong đợi. Vẫn còn ít nhất bốn vấn đề chính mà bạn cần lưu ý:
1. Nó tạo ra các thuộc tính mà bạn có thể không nhất thiết phải muốn, chẳng hạn như *.kern, .paragraphStyle, v.v*. Bạn có thể muốn xóa những thuộc tính đó.
2. Nó chỉ hỗ trợ một tập hợp con của HTML và nó không có document cụ thể.
3. Nó có thể bị treo hoặc bị crash với một số đầu vào nhất định.
4. Nó rất chậm, nó sẽ khiến performance của bạn bị giảm đi đáng kể.

## Giải pháp đề xuất
Với HTML, bạn không cần phải nối các chuỗi hoặc tra cứu các chuỗi con, điều này thật tuyệt. Vấn đề thực sự duy nhất với HTML là thiếu khả năng kiểm soát và hiệu suất.
Hầu hết các thẻ HTML (và tất cả các thẻ mà chúng tôi quan tâm) đều là XML hợp lệ. Chúng ta có cần toàn bộ sức mạnh của WebKit để phân tích cú pháp một vài thẻ XML cơ bản không? Câu trả lời là không.

Tôi xin giới thiệu một repo, nó được gọi là [Formatting](https://github.com/kean/Formatting), nơi nó sử dụng ***XMLParser*** cơ bản để phân tích cú pháp thẻ và áp dụng các *attributes* *string* tương ứng. Toàn bộ giải pháp mất ít hơn 100 dòng code. Đây là một ví dụ:
```
let input = "M1 delivers up to <b>2.8x faster</b> processing performance
    than the <a href='%@'>previous generation.</a>"
let text = String(format: input, "https://support.apple.com/kb/SP799")

// You can define styles in one place and use them across the app
let style = FormattedStringStyle(attributes: [
    "body": [.font: UIFont.systemFont(ofSize: 15)],
    "b": [.font: UIFont.boldSystemFont(ofSize: 15)],
    "a": [.underlineColor: UIColor.clear]
])

label.attributedText = NSAttributedString(formatting: text, style: style)
```
Kết quả cho ra một UILabel tiêu chuẩn:

![](https://images.viblo.asia/a4316e2a-24c1-4110-b5e0-15d48bcff6da.png)

Và nó nhanh hơn ~200 lần so với giải pháp dựa trên phương pháp HTML.

![](https://images.viblo.asia/ee8d7685-2fa6-48a4-9434-085d4ba0a4cf.png)

Thông thường, tôi sẽ nghi ngờ khi thấy sự khác biệt về hiệu suất như thế này, nhưng không phải trong trường hợp này :v: 

[Formatting](https://github.com/kean/Formatting), chỉ thực hiện hai việc: parser XML và apply vào các attributes.

Bạn có thể sử dụng [Formatting](https://github.com/kean/Formatting) hoặc sửa đổi nó để phù hợp với nhu cầu của bạn. Bạn có toàn quyền kiểm soát để xác định những thẻ nào bạn muốn hỗ trợ và theo cách nào. Bạn cũng nhận được hiệu suất làm cho nó khả thi khi sử dụng nó ngay cả trong scrollview.

## Kết luận
Như vậy đối với bài toán sử dụng  ***Localizable***  với định dạng label nhiều thuộc tính, chúng ta có thể sử dụng parser XML và apply vào các attributes của string để có được design mong muốn và đạt được performance tốt nhất, thay vì sử dụng những cách cũ mà chúng ta hay sử dụng có thể xảy ra những rủi ro trong quá trình development.

[Nguồn](https://kean.blog/post/formatted-strings)