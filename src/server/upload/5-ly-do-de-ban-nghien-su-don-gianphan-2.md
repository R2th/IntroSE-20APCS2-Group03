Tiếp số lần trước, mình đã giới thiệu lý do số #1. Tính Modul hóa. 

### Lý do #2: Khả năng tái sử dụng(Reusability)
Bạn đã dừng copy 1 đoạn code từ phần này sang phần khác trong project của bạn chưa? Bạn có thể dự đoán 1 số đoạn code có khả năng sẽ sử dụng hoặc tương tự nhau. Dù thế nào đi nữa, nhưng đoạn code đó phải được modul hóa. Bạn có thể cung cấp một ố thong tin đầu vào mà bạn có và trả về kết quả bạn dự định(kiểu dữ liệu trả về). Hãy cùng tôi phá vỡ 1 số đoạn mã( không Reusability)
Một số thứ cần một kiểu chuyển đổi định dạng ngày tháng. Giả sử trong suốt ứng dụng của bạn, ngày luôn hiện thị theo cùng một định dạng
```
 dd MMM yyyy
```
Chúng ta nhận data 1 ngày trong json mà server trả về có định dạng như sau:
```
yyyy-MM-dd’T’HH:mm:ssZZZZZ
```
Làm thế nào để chúng ta có chuyển đổi để phù hợp định dạng của phần còn lại của ứng dụng?
Đoạn code không thể tái sử dụng:
```
// String date from server
let dateString = “1996–12–19T16:39:57–08:00”
// DateFormatter, to transform the string into a date
let dfToDate = DateFormatter()
dfToDate.dateFormat = “yyyy-MM-dd’T’HH:mm:ssZZZZZ”
// Date from server
let d = dfToDate.date(from: dateString) // “Dec 20, 1996, 12:39 AM”
```

```
// DateFormatter, to transform the date into the format we want
let dfToString = DateFormatter()
dfToString.dateFormat = “dd MMM yyyy”
// Formatted string from date
dfToString.string(from: d!) // “20 Dec 1996”
```

Đoạn code trên nó hoạt động nhưng bạn sẽ phải tạo lại mỗi lần bạn sử dụng với 6 dòng code trên.

Đoạn mã có thể tái sử dụng:
Bản có thể tạo một method tái sử để chuyển đổi định dạng với extension chuyển đổi từ Data sang String:

```
extension Date {
   func toString() -> String {
      let dfToString = DateFormatter()
      dfToString.dateFormat = “dd MMM yyyy”
      return dfToString.string(from: self)
   }
}
extension String {
   func toDate() -> Date? {
      let dfToDate = DateFormatter()
      dfToDate.dateFormat = “yyyy-MM-dd’T’HH:mm:ssZZZZZ”
      return dfToDate.date(from: self)
   }
}
```

Sau đó, tất cả bạn cần làm để đổi định dạng ngày của bạn như sau:
```
// String to Date
dateString.toDate()
// Date to String
date.toString()
```
Rất tuyệt đúng ko? Bạn chỉ mất 2 dòng code để làm điều đó.<br>
**Lời bình:** Điều này tưởng như rất đơn giản, nhưng lại mang cho dự án rất nhiều lợi ích: <br>
* Code sẽ ngắn gọn hơn, clean hơn
* Tính modul hóa cao hơn, maintainability cao hơn,
Mặc dù vậy, trong khi làm dự án gồm nhiều thành viên đôi khi ta có thể bỏ qua điều này.

### Lý do #3: Khả năng duy trì và bảo trì(Maintainability)
Thật dễ dàng bỏ qua khả năng bảo trì
```
Future me can deal with that!
— Past (scumbag) me
```

Bằng cách dành thời gian để tạo ra các modul, đoạn code tái sử dụng, bạn đã tự động làm cho việc bảo trì dự án của bạn một cách dễ dàng hơn. Ví dụ, quay lại việc chuyển đổi định dạng ngày ở trên. Giả sử bạn quyết dịnh thay đổi định dạng mà bạn hiên thị ngày từ kiểu "dd MMM yyyy" sang "yyyy, dd MMM"
Vì định dạng ngày đang xử lý duy nhất ở một đoạn code, đó là phần extension, tất cả những gì bạn   cần làm là sửa nó:
```
extension Date {
   func toString() -> String {
      let dfToString = DateFormatter()
      dfToString.dateFormat = “yyyy, MMM dd”
      return dfToString.string(from: self)
   }
}
```
Không chỉ tiết kiệm thời gian, bằng cách đó bạn không phải tìm tất cả các đoạn code thực thi chuyển đổi ngày đó để sửa lại, nhưng bạn không có gì đảm bảo là bản không bỏ sót. Như cách trên ta đã có thể tránh được các lỗi đó!
Một lợi thế lớn khác của  tính modul hóa là nó rất dễ để kiểm ra(test). Một số dev thậm chí đã áp dụng TDD(Test Driven Development) cho project của họ, để chính họ bặt buộc phải tạo các modul code ngày từ đầu!
```
Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. This is opposed to software development that allows software to be added that is not proven to meet requirements.
— Wikipedia
```

### Lý do #4: Tính nhất quán(Consistency)

Tính nhất quán là một khía cạnh khó nhất để duy trì trong một ứng dụng. Đặc biệt là dự án đó được phát triển từ nhiều thành viên khác nhau. Trừ khi tất cả các lý do để đảm bảo tính đơn giản được để cập ở trên được áp dụng, việc giữ tính nhất quán của ứng dụng vẫn sẽ là một thách thức lớn.
Có rất nhiều lớp để giữ sự nhất quán(thống nhất), từ  thiết kế, từ code front-end đến code back-end. Đây là lý do tại sao các pattern được phát minh, một cách định rõ các làm thực hiện nó. Một pattern sẽ giúp bạn không chỉ là lập trình hoặc thiết kế một cách nhất quán(thống nhất) không nhưng nó còn giúp bất cứ ai tham gia vào công việc của bạn thì đều nhanh chóng hiểu những thứ đang diễn ra.
Là một dev iOS, bạn có thể chọn từ nhiều các pattern khác nhau, tôi sẽ không nêu cụ thể nó ở bài viết này, nhưng tôi sẽ đưa cho các bạn địa chỉ link hữu ích: 
```
https://github.com/ochococo/Design-Patterns-In-Swift
```

### Lý do #5: Khả năng có thể đọc(Readability)

Cuối cùng nhưng không kém phần quan trọng là khả năng có thể đọc. Mỗi dev nên cố gắng để code rõ ràng và dễ đọc! Mục tiêu của bạn không nên là Shakespeare , mà nên là Beatrix Potter(tác giả nổi tiếng dành cho trẻ em).
Code của bạn không phải là có ấn ý hay có nhiều cách hiểu mà nên đi thẳng vào vấn đề và rõ ràng như ban ngày.

Một khi bạn phấn đấu cho sự đơn giản, những lý do trên sẽ trở nên gây nghiện. Bạn sẽ đặt cầu hỏi cho từng bước phát triển sản phẩm: liệu có cách nào đơn giản hơn những gì bạn đang làm không? nó có phải modul không? Có tái sử dụng được không? Có thích hợp được không? Có đọc được không? Có duy trì và bảo trì được không?
```
Simplicity is the ultimate sophistication.
— Leonardo da Vinci
```
Link gốc bài viết: https://swiftsailing.net/https-swiftsailing-net-5-reasons-to-be-addicted-to-simplicity-64cacbd85488