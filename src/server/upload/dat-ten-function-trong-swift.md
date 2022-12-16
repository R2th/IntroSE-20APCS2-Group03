Xin chào các bạn,

Trong bài viết này, chúng ta sẽ cùng tìm hiểu về một vấn đề mà mình nghĩ chúng ta hay tự hỏi hàng ngày. Đó là:

***Function này đặt tên thế nào?***

Mặc dù câu hỏi này có vẻ đơn giản, nhưng việc trả lời đúng khá là khó với mình, nhất là với vốn tiêngs anh không tốt của mình. Tuy nhiên hiệu quả mang lại nếu chúng ta trả lời đúng thì rất lơn, nó làm cho codebases của chúng ta sạch hơn và dễ sử dụng hơn, như chúng ta sẽ thấy.

## Tầm quan trọng của APIs rõ ràng
Nếu bạn đã sử dụng một function từ thư viện của bên thứ ba, hãy giả sử để tạo Label ưa thích và bạn tìm thấy hai tùy chọn sau:

```swift
// A
static func makeLabel(withTitle title: String) -> FancyLabel
// B
static func configure(_ text: String) -> FancyLabel
```

Cái nào bạn sẽ cảm thấy thoải mái hơn? A hay B?

Trong trường hợp bạn vẫn còn do dự, tôi sẽ cung cấp cho bạn một gợi ý: lẽ thường cũng khiến tôi nghĩ đến lựa chọn A.

Tại sao lại chọn A?

Trước tiên, hãy phân tích lý do tại sao B không tốt như vậy: Tùy chọn B không cho chúng ta biết chính xác những gì chúng ta đang định cấu hình. Nó có phải là một instance có sẵn? Nó có tạo ra một cái mới không? Nó không nói cho chúng ta biết ý nghĩa của String mà nó mong đợi. Tất cả những gì chúng ta có thể nói trước là nó nhận được String và trả về FancyLabel, nhưng chúng ta không thể biết chính xác những gì nó làm. Có sự mơ hồ và thiếu thông tin, và đó là điều chúng ta nên tránh.

Option A, ngược lại thì rõ ràng về 3 điều sau:

* **Những gì nó cần để làm việc** - *một tiêu đề*
* **Những gì nó làm** - *nó tạo một Label*
* **Kết quả là gì** - *Label được tạo*

*Chúng tôi quan tâm đến những gì nó làm (hoặc được cho là phải làm), chứ không phải về cách nó làm điều đó. Chúng ta không quan tâm đến các hoạt động bên trong của chức năng. Đó là cách thức đóng gói hoạt động.*

Việc sử dụng chức năng này trở nên rất tự nhiên khi chỉ cần có ba điều này rõ ràng, bởi vì theo cách này chúng ta có thể biết chức năng này diễn ra như thế nào mà không có sự hiểu lầm. Đơn giản phải không nào?

Chúng ta sẽ thấy rõ hơn khi chúng ta xem cách các function này được gọi:

```swift
let labelA = FancyLabel.makeLabel(withTitle: "Hello world") // clear

let labelB = FancyLabel.configure("Hello world") // not so clear
```

Bây giờ, điều gì sẽ xảy ra nếu chúng ta dịch ví dụ đó sang một dự án thực tế với nhiều nhà phát triển làm việc trên nó? Bạn muốn đặt tên function thế nào? A hay B? Bạn muốn đồng đội của mình đặt tên cho function của họ như thế nào? A hay B?

Bạn có thể nghĩ về nó như thế này: Mỗi lần bạn xác định một function, bạn sẽ xác định một interface mà người khác sẽ sử dụng trong tương lai. Ngay cả khi nó riêng tư và thậm chí nếu bạn nghĩ rằng sẽ không có ai sử dụng nó, điều quan trọng là nó phải rõ ràng. Bởi vì bất kỳ nhà phát triển tại bất kỳ thời điểm nào cũng có thể cần phải xử lý mã nội bộ của bất kỳ lớp nào trong dự án, ngay cả chính bạn.

Tóm lại, nếu bạn bỏ công sức đặt tên cho các chức năng của mình sao cho không có sự mơ hồ về đầu vào và đầu ra của chúng là gì và các function đấy định làm gì, thì bạn có thể đỡ được rất nhiều effort khi mà người khác dùng function của bạn. Họ sẽ không cần phải mở function đó và đọc để biết được những điều trên. Bằng cách này, chúng ta đã tiết kiệm thời gian và tránh những hiểu lầm dẫn tới bug. Việc xác định các interface rõ ràng trong mã của chúng ta đi kèm với lợi ích to lớn của một codebase dễ xử lý, sử dụng, định hình và duy trì.

## Function Signatures trong Swift
Một trong những thay đổi căn bản nhất trong Swift, nếu chúng ta so sánh nó với Objective-C, và đặc biệt kể từ Swift 3.0, là cách thức hoạt động của Function Signature. Kể từ phiên bản đó, Swift không chỉ ít dài dòng hơn người tiền nhiệm mà còn rõ ràng hơn.

Hãy xem một ví dụ:

```swift
dateLabel.text = [formatter stringWithDate: [[Date alloc] init]]];

dateLabel.text = formatter.string(with: Date())
```

Chúng tôi thấy hai sự khác biệt chính ở đây. Đầu tiên, việc tạo ra instance của ngày dài hơn trong trường hợp đầu tiên, mặc dù điều đó chỉ liên quan đến tính dài dòng của Objective-C. Sau đó, chúng ta có thể quan sát rằng phiên bản Objective-C, bên cạnh rất nhiều dấu ngoặc phụ, bao gồm một từ bổ sung (Ngày) mà phiên bản Swift không có.

Sự thay đổi tinh tế - nhưng hiệu quả này thực sự có thể nhờ vào tính chất tĩnh của các loại trong Swift. Trong phiên bản Swift của hàm, bạn không thể truyền vào một đối tượng khác không phải là Ngày, vì trình biên dịch sẽ không cho phép bạn làm điều đó.

Thay đổi này là đơn giản, nhưng nó đã mở ra cánh cửa đến một thế giới mới về Function Signature. Đoạn code nói chung đã trở nên dễ chịu hơn nhiều để đọc, vì nó ngắn gọn hơn và giống với ngôn ngữ nói hơn.

Như đã đề cập, bước tiếp theo của chúng ta là nhằm mục đích làm cho Funtion ngắn nhất có thể, nhưng vẫn đủ rõ ràng để tránh sự mơ hồ.

![](https://images.viblo.asia/0c49c704-2bb6-4ca3-aa0d-9e56502ec3ec.gif)

## Làm gọn
Cuối cùng, hãy phân tích một số ví dụ về các Function Signature khác nhau và xem làm thế nào chúng ta có thể làm cho chúng trông đẹp hơn bằng cách cắt tỉa, tức là bằng cách loại bỏ một số từ.

```swift
// Signature
func moveView(view: UIView, toPoint point: CGPoint) { ... }
// Usage
moveView(view: headerView, toPoint: .zero) // ⚠️ long and redundant
```

Có thể làm gọn thành:

```swift
// Signature
func move(_ view: UIView, to point: CGPoint) { ... }
// Usage
move(headerView, to: CGPoint.zero) // 👏 clear and concise
```

Nhờ static typing, chúng ta không cần xác định rằng chúng tôi đang di chuyển một đối tượng xem trong chữ ký hàm. Vì hàm yêu cầu một đối tượng UIView, điều duy nhất bạn có thể truyền vào là một loại đối tượng đó. Tương tự với Point.

Tuy nhiên có những trường hợp ngoại lệ. Bạn vẫn cần xác định tham số là gì vì kiểu của nó có thể không đủ để mô tả nó.

```swift
// Signature
func makeButton(withTitle title: String) -> UIButton { ... }
// Usage
let button = makeButton(withTitle: "Function Naming") // 👍 good
```

Hãy xem điều gì xảy ra khi chúng ta cố gắng cắt bớt ở đây:

```swift
// Signature
func makeButton(with title: String) -> UIButton { ... }
// Usage
let button = makeButton(with: "Function Naming") // 👎 not clear
```

Điều này xảy ra vì loại (String) không khớp chính xác với ngữ nghĩa của nội dung (một tiêu đề). Một String có thể đại diện cho nhiều thứ khác ngoài tiêu đề.

Khi ở trong một tình huống như vậy, có hai cách tiếp cận khả thi mà chúng ta có thể thực hiện. Chúng ta hoặc chỉ định ngữ nghĩa của nội dung bằng cách làm cho tên tham số rõ ràng hơn, như trong phần đầu của ví dụ ở trên, hoặc, chúng ta tạo một loại mới mô tả ngữ nghĩa cụ thể hơn và sử dụng loại mới đó làm tham số. Trong ví dụ này, chúng ta có thể đã tạo một loại Tiêu đề để quản lý các tiêu đề.

## Kết Luận
* Đặt tên rất khó. Tuy nhiên, nếu thời gian bạn dành cho việc đó được đầu tư tốt thì nó làm giảm khả năng hiểu lầm và ngăn các nhà phát triển khác - hoặc chính bạn - khỏi phải xem tất cả các mã hoạt động như thế nào để cố gắng hiểu những gì nó làm. Vì vậy, hãy đầu tư thời gian vào việc đặt tên.
* Tận dụng static typing. Làm cho API của bạn rõ ràng và súc tích.
* Chia sẻ kiến thức này với các đồng đội của bạn và khuyến khích thực hành tốt.
* Thực hành! Thực hành! Thực hành!

Và hãy nhớ rằng, một chức năng phải luôn rõ ràng về 3 điều:

* Những gì nó cần - đầu vào
* Những gì nó làm - mô tả quá trình mà không phơi bày các hoạt động bên trong
* Những gì nó trả về - đầu ra

Bài viết được dịch từ: https://medium.com/appcoda-tutorials/function-naming-in-swift-dbf5d918c8e3