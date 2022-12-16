- Trên thực tế nhiều khi chúng ta hay phải đối mặt với một câu hỏi tưởng chừng như rất đơn giản: **How should I name this function?**
- Mặc dù câu hỏi này có vẻ đơn giản, thế nhưung việc trả lời đúng sẽ xác định mức độ chuyên nghiệp của bạn. Nó sẽ làm cho code của chúng ta rõ ràng và dễ sử dụng hơn.

### Tầm quan trọng của việc API rõ ràng
- Giả sử khi bạn sử dụng API của một bên thứ 3 và có 2 lựa chọn như sau:

```
// A
static func makeLabel(withTitle title: String) -> FancyLabel
// B
static func configure(_ text: String) -> FancyLabel
```
- Nếu là bạn thì bạn sẽ chọn lựa chọn nào? Tất nhiên bạn sẽ không do dự để lựa chọn lựa chọn A đúng không. Nhưng mà vì sao lại là lựa chọn A?
- Đầu tiên nên hiểu vì sao lựa chọn B không tốt. Nhìn vào lựa chọn B thì câu thắc mắc đầu tiên của bạn sẽ là chả biết chính xác nó làm cái vẹo gì. Nó có phải cái gì đó mới, nó trả ra một cái gì đó mới ư? Mà input là một chuỗi chả biết nó sẽ cần điều kiện gì không. Tóm lại bạn đọc xong chả hiểu vẹo gì. Nhìn vào nó bạn có thể biết duy nhất thông tin nó trả ra là một FancyLabel, thật là mơ hồ... Nên là tránh chứ còn sao nữa.
- Vậy còn lựa chọn A thì sao? oh, hoá ra nó rất rõ ràng
    - Đầu vào nó cần cái gì: 1 title
    - Nó làm gì: nó tạo một label
    - Kết quả: nó trả ra cho bạn một label
    
*Tóm lại:* Chúng ta quan tâm nó làm gì chứ không quan tâm cách nó làm, cũng không quan tâm bên trong nó hoạt động ra làm sao. Đó chính là cách thức đóng gói hoạt động.

- Nhìn lại 2 lựa chọn trên thì khi sử dụng cũng vậy, nó cũng khác nhau:
```
let labelA = FancyLabel.makeLabel(withTitle: "Hello world") // clear
let labelB = FancyLabel.configure("Hello world") // not so clear
```
- Điều gì sẽ xảy ra khi chúng ta sử dụng nó trong dự án thực tế? Bạn sẽ đặt là A hay B, bạn muốn đồng nghiệp của bạn viết code là A hay B? Khi bạn viết ra nó thì bạn hãy nghĩ những gì bạn viết người khác có thể sử dụng và ngược lại. Dù cho những thứ bạn viết ra là private thì cũng nên rõ ràng, rành mạch. Bởi vì bất cứ lúc nào cũng có thể có một ai đó động tới phần của bạn, hoặc thời gian sau đó chính bạn là người đọc lại (lúc đó chắc lại nghĩ ông méo nào viết mà viết thế này, show blame for line thì lại là chính bạn ahihi).
- Nếu bạn viết phần code của bạn rõ ràng, rành mạch thì tỉ lệ tái sử dụng bởi người khác sẽ cao hơn rất nhiều. Còn không người khác đọc vào không hiểu thì tâm lý đầu tiên của họ sẽ là viết lại một phần code khác (khả năng cùng chức năng với phần code của bạn là rất cao) để đáp ứng công việc. Khi họ sử dụng lại thì khả năng bug sẽ giảm, vì có thể trước đó phần code của bạn đã hoàn thành bài test rồi.

Bạn nên đầu tư thời gian nghĩ về việc đặt tên :D

### Function Signatures
- Kể từ khi có Swift thì mọi thứ trở nên dễ dàng hơn rất nhiều, rõ ràng, rành mạch, dễ hiểu lại còn ngắn gọn nữa. Đơn giản các bạn nhìn vào ví dụ sau:
```
dateLabel.text = [formatter stringWithDate: [[Date alloc] init]]];
dateLabel.text = formatter.string(with: Date())
```
- Có 2 điểm khác biệt ở đây
    - Khởi tạo ngắn hơn Objective C
    - Ít ngoặc hơn.
- Thay đổi này của Swift tuy đơn giản nhưng có vẻ nó đã mở ra một điều gì mới mẻ hơn, dễ đọc, ngắn gọn hơn.

### Pruning (Cắt tỉa)
- Chúng ta cùng xem xét ví dụ sau để xem có giảm bớt được từ ngữ nào không nhé.
```
// Signature
func moveView(view: UIView, toPoint point: CGPoint) { ... }
// Usage
moveView(view: headerView, toPoint: .zero) // ⚠️ long and redundant
```
- Sau khi cắt tỉa giảm bớt thì bạn xem có nên viết như sau không.
```
// Signature
func move(_ view: UIView, to point: CGPoint) { ... }
// Usage
move(headerView, to: CGPoint.zero) // 👏 clear and concise
```
- Nhưng đôi khi ngắn chưa chắc đã rõ ràng. Các bạn xem ví dụ sau nhé:
```
// Signature
func makeButton(withTitle title: String) -> UIButton { ... }
// Usage
let button = makeButton(withTitle: "Function Naming") // 👍 good
```
- Thay vì các bạn viết ngắn hơn như sau (không nên sử dụng). Bởi vì khi bạn sử dụng
```
// Signature
func makeButton(with title: String) -> UIButton { ... }
// Usage
let button = makeButton(with: "Function Naming") // 👎 not clear
```
- Bạn có 2 cách tiếp cận. Hoặc chỉ định ngữ nghĩa của nội dung bằng cách thêm tham số rõ ràng hơn. Hoặc tạo một loại mới mô tả ngữ nghĩa cụ thể và sử dụng loại mới đó làm tham số.

### Final Thoughts
- Việc đặt tên là rất khó, bạn cần dành thời gian suy nghĩ về nó. Đặt tên tốt, có đầu tư thì khả năng hiểu nhầm cho chính bạn và người khác sẽ giảm.
- Bạn nên tập trung cho API bạn viết ra thật rõ ràng, rành mạch, ko mất nhiều thời gian để hiểu.
- Để làm tốt các điều đó duy nhất chỉ có một cách đó là luyện tập, luyện tập và luyện tập thôi.
- Có 3 điều mỗi khi viết code bạn cần trả lời
    - What it needs — input
    - What it does — describe the process without exposing the inner workings
    - What it returns — output

Nguồn tham khảo: [Medium](https://medium.com/appcoda-tutorials/function-naming-in-swift-dbf5d918c8e3. )

Cám ơn các bạn đã đọc.