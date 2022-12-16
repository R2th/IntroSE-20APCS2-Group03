# Giới thiệu

Như ta đã biết đối tượng **NSAttributedString**  của framework **UIKit** cho phép quản lý các ký tự và các thuộc tính của từng ký tự này trong chuỗi. 
Thư viện **SwiftRichString** cung cấp các cơ chế tiện ích cho phép người lập trình dễ dạng định nghĩa và tương tác với NSAttributedString, định hình string style và tái sự dụng nó trong toàn bộ ứng dụng

Các tính năng nổi bật:
- Dễ dàng định nghĩa các thuộc tính thông qua cơ chế Style
-  Cho phép quản lý và gán nhãn cho từng Style để có thể dễ dàng tái sử dụng trong toàn ứng dụng.
-  Tích hợp với Interface Builder cho phép dễ dàng làm việc với các UIControl như UILabel, UITextField, UITextView.

# Các đối tượng cơ bản Style, StyleGroup và StyleRegEx

SwiftRichString xây dựng dựa trên một protocol chung (gọi là **StyleProtocol**) cho phép áp dụng các thuộc tính style cho **String** và **SwiftRichString**. 

### Style
Đối tượng Style cho phép đóng gói các thuộc tính style có thể có của một String.
```
let style = Style {
	$0.font = SystemFonts.Helvetica_Bold.font(size: 20)
	$0.color = UIColor.green
	// ... set any other attribute
}

let attrString = "Some text".set(style: style) // attributed string
```

### Style Group
StyleGroup cho phép ta áp dụng Style cho từng đoạn trong chuỗi  dựa vào cơ chế đặt tag trong chuỗi.
Ta có thể dễ dàng sử dụng thông qua ví dụ dưới đây:
```
let bodyStyle: Style = ...
let h1Style: Style = ...
let h2Style: Style = ...
let group = StyleGroup(base: bodyStyle, ["h1": h1Style, "h2": h2Style])

let attrString = "Some <h1>text</h1>, <h2>welcome here</h2>".set(style: group)
```
Ở đoạn code trên:
- Ta khai báo một Style tên là bodyStyle để định nghĩa tất cả các thuộc tính Style áp dụng cho toàn bộ chuỗi
-  Hai style còn lại sẽ dùng để áp dụng cho các chuỗi nằm trong thẻ h1 và h2.

### StyleRegEx
StyleRegEx  cho phép ta định nghĩa Style cho từng thành phần trong chuỗi dựa trên các biểu thức chính quy (Regular Expression).
Ví dụ dưới đây cho phép ta highlight các chuỗi con có định dạng của một địa chỉ email.
```
let emailPattern = "([A-Za-z0-9_\\-\\.\\+])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]+)"
let style = StyleRegEx(pattern: emailPattern) {
	$0.color = UIColor.red
	$0.backColor = UIColor.yellow
}
		
let attrString = "My email is hello@danielemargutti.com and my website is http://www.danielemargutti.com".(style: style!)
```
Kết quả nhận được:
![](https://images.viblo.asia/898d918e-1512-4eb2-b13a-ac3bf31174b5.png)

# Sử dụng StyleManager để tái sử dụng Style trong ứng dụng
**SwiftRichString** cung cấp đối tượng StyleManager cho phép người dùng gán nhãn và tái sử dụng các Style đã định nghĩa trước đó.

Khai báo thông qua cú pháp sau:
```
let base = Style {
  $0.font = SystemFonts.Helvetica.font(size: 12)
}
 
let h1 = Style {
  $0.font = SystemFonts.Helvetica_Bold.font(size: 15)
  $0.color = UIColor.red
}
 
let h2 = h1.byAdding {
  $0.alignment = .center
  $0.traitVariants = [TraitVariant.italic]
}
 
Styles.register("MyStyle", style: StyleGroup(base: base, ["h1" : h1, "h2" : h2]))
```

Tái sử dụng thông qua đoạn code dưới đây:
```
let str = "Hello <h1>\(username)</h1>\nWelcome <h2>here!<h2>"
self.label?.styledText = str.set(style: StyleNames."MyStyle")
```

# Tích hợp với Interface Builder
Bên cạnh việc cho phép người dùng quản lý và tái sử dụng các Style, người dùng còn có thể sử dụng nó để lựa chọn cho các UICotrol thông qua Interface Builder thông qua thuộc tính Style Name. Các đối tượng UIControl hỗ trợ gồm:
- UILabel
- UITextView
- UITextField

![](https://images.viblo.asia/d6a269db-8f61-4ab1-be95-ea20afc374ad.png)

Ví dụ ở trên cho phép gán Style MyStyle đã định nghĩa trước cho một đối tượng UILabel.


# Kết hợp giữa String và Attributed String
**SwiftRichString**  cung cấp các hàm tiện ích để cho phép dễ dàng áp dụng Style cho plain text hoặc atributed string, và kết hợp với các hàm xử lý chuỗi sẵn có của Swift.

```
let body: Style = Style { ... }
let big: Style = Style { ... }
let attributed: AttributedString = "hello ".set(style: body)

// the following code produce an attributed string by
// concatenating an attributed string and two plain string
// (one styled and another plain).
let attStr = attributed + "\(username)!".set(style:big) + ". You are welcome!"
```

Các hàm xử lý chuỗi của **SwiftRichString**  gồm các hàm cơ bản sau:
- **set(style: String, range: NSRange? = nil)**: cho phép áp dụng một Style đã định nghĩa trước cho toàn bộ string hoặc một đoạn của string, kết quả đầu ra là một Atributed string.
- **set(styles: [String], range: NSRange? = nil)**:  cho phép áp dụng nhiều Style đã định nghĩa trước ho toàn bộ string hoặc một đoạn của string, kết quả đầu ra là một Atributed string.
- **set(style: StyleProtocol, range: NSRange? = nil)** : cho phép áp dụng một StyleProtocol đã định nghĩa trước ho toàn bộ string hoặc một đoạn của string, kết quả đầu ra là một Atributed string,
 - **set(style: [StyleProtocol, range]: NSRange? = nil)** : cho phép áp dụng nhiều đối tượng StyleProtocol đã định nghĩa trước ho toàn bộ string hoặc một đoạn của string, kết quả đầu ra là một Atributed string,

# Kết luận
Thông qua các đoạn code đơn giản ở trên, ta thấy rằng việc định nghĩa và tái sử dụng NSAttributedString  trở nên đơn giản hơn rất nhiều.
Rất mong **SwiftRichString** sẽ là một công cụ hữu dụng của mọi người trong các dự án sắp tới.

# Nguồn tham khảo
- https://github.com/malcommac/SwiftRichString
- https://developer.apple.com/documentation/foundation/nsattributedstring?changes=_2
- https://medium.com/ios-os-x-development/nsattributedstring-in-swift-bf0561f102c9