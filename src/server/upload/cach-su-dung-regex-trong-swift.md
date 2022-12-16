Có lẽ vs bất kì 1 lập trình viên nào cũng đều đã từng ít nhất 1 lần sử dụng Regex. Nhưng thực sự nếu ko tìm hiểu kĩ thì nó sẽ rất khó hiểu và gây khó khăn trong quá trình code mà đụng đến nó. Do đó, mình sẽ trình bày bài viết (chính xác là mình dịch từ trang web nước ngoài) để chúng ta hiểu hơn và biết cách sử dụng Regex hơn.

Regex (viết tắt của REGular EXpression - dịch ra là biểu thức chính quy) cho phép chúng ta chạy các thao tác tìm kiếm và thay thế phức tạp trên hàng nghìn tệp văn bản chỉ trong một vài giây, vì vậy không có gì ngạc nhiên khi chúng đã được ứng dụng phổ biến trong hơn 50 năm. Apple cung cấp hỗ trợ cho các lớp biểu thức chính quy trên tất cả các nền tảng của mình - iOS, macOS, tvOS và thậm chí watchOS - tất cả đều sử dụng cùng một class, NSRegularExpression. Đó là một cách cực kỳ nhanh chóng và hiệu quả để tìm kiếm và thay thế văn bản phức tạp hàng chục nghìn lần và tất cả đều có sẵn cho các ios Developer sử dụng.

Trong bài viết này, chúng ta sẽ học cách tạo biểu thức chính quy bằng NSRegularExpression và cách đối sánh nhiều biểu thức chính quy với nhau. Để hiểu sâu hơn về biểu thức chính quy, mình đã viết một bài viết riêng tiếp nối bài viết này: Đối sánh biểu thức chính quy nâng cao với NSRegularExpression.

### **Đầu tiên, những điều căn bản**
Chúng ta hãy cùng bắt đầu từ những ví dụ đơn giản về Regex nhé. Về bản chất, Regex hay còn được gọi là biểu thức chính quy - được thiết kế để cho phép chúng ta thực hiện các tìm kiếm mờ bên trong chuỗi. Ví dụ: chúng ta biết rằng "cat" .contains ("at") là đúng nhưng nếu chúng ta muốn kết hợp bất kỳ từ có ba chữ cái nào kết thúc bằng "at" thì sao?

Đây là những gì regexes được thiết kế để giải quyết, mặc dù chúng sử dụng cú pháp hơi khó hiểu vì được base trên nền Objective-C. 

Trước tiên,  lấy 1 string mà mình muốn kiểm tra:
```
let testString = "hat"
```
Tiếp theo, bạn tạo một NSRange đại diện cho độ dài đầy đủ của chuỗi:
```
let range = NSRange(location: 0, length: testString.utf16.count)
```
Chúng ta sử dụng utf16 để tránh các vấn đề với các kí tự emoji. 

Tiếp theo, chúng ta tạo một NSRegularExpression bằng cách sử dụng một số cú pháp regex: 
```
let regex = try! NSRegularExpression(pattern: "[a-z]at")
```
Trong đó [a-z] là cách của regex để chỉ định bất kỳ chữ cái nào từ “a” đến “z”.

Cuối cùng, bạn gọi firstMatch (in : ) trên regex bạn đã tạo, truyền vào các tham số là chuỗi để tìm kiếm, bất kỳ tùy chọn đặc biệt nào và phạm vi chuỗi cần xem bên trong. Nếu chuỗi khớp với regex thì bạn sẽ lấy lại dữ liệu, ngược lại thì không. Vì vậy, nếu bạn chỉ muốn kiểm tra xem chuỗi có khớp không, hãy so sánh kết quả của firstMatch (in : ) với nil, như thế này:
```
regex.firstMatch(in: testString, options: [], range: range) != nil
```
Regex “[az] at” sẽ đối sánh thành công “hat”, cũng như “cat”, “sat”, “mat”, “bat”, v.v. - do vậy chúng ta chỉ cần tập trung vào những gì chúng tôi muốn đối sánh và NSRegularExpression sẽ thực hiện tất cả những phần còn lại. Thật thuận tiện phải không các bạn.

### **Làm cho NSRegularExpression dễ sử dụng hơn**
Trước khi đến với những ví dụ về cách sử dụng regex phức tạp hơn, hãy xem liệu chúng ta có thể làm cho NSRegularExpression thân thiện và dễ sử dụng hơn một chút hay không.

Điều dễ thấy là chúng ta đang cần tới 3 dòng code để đối sánh 1 string vô cùng đơn giản:
```
let range = NSRange(location: 0, length: testString.utf16.count)
let regex = try! NSRegularExpression(pattern: "[a-z]at")
regex.firstMatch(in: testString, options: [], range: range) != nil
```
Chúng ta có thể cải thiện điều này theo nhiều cách khác nhau, nhưng có lẽ hợp lý nhất là mở rộng NSRegularExpression để tạo và kết hợp các biểu thức dễ dàng hơn.

Đầu tiên, dòng này:
```
let regex = try! NSRegularExpression(pattern: "[a-z]at")
```
Như mình đã nói, việc tạo một phiên bản NSRegularExpression có thể gây ra lỗi vì bạn có thể cố gắng cung cấp một biểu thức chính quy không hợp lệ -  ví dụ: [a-zat   là bất hợp pháp vì chúng ta thiếu dấu đóng ].

Tuy nhiên, hầu hết thời gian sử dụng thì biểu thức chính quy  sẽ được bạn mã hóa cứng: có những thứ cụ thể bạn muốn tìm kiếm mà chúng đúng hoặc không chính xác tại thời điểm biên dịch. Nếu bạn gặp lỗi với những điều này, thường nguyên nhân xuất phát từ lỗi mã hoá. 

Do đó, việc tạo các phiên bản NSRegularExpression nên bắt đầu bằng try !. Tuy nhiên, điều đó có thể gây ra sự tàn phá với các công cụ linting như SwiftLint, vì vậy ý tưởng tốt hơn là tạo một trình khởi tạo tiện lợi để tạo regex một cách chính xác hoặc tạo ra lỗi xác nhận khi bạn đang phát triển:
```
extension NSRegularExpression {
    convenience init(_ pattern: String) {
        do {
            try self.init(pattern: pattern)
        } catch {
            preconditionFailure("Illegal regular expression: \(pattern).")
        }
    }
}
```
Lưu ý: Nếu ứng dụng của bạn dựa trên biểu thức chính quy do người dùng của bạn nhập, bạn nên sử dụng trình khởi tạo NSRegularExpression (pattern : ) thông thường để có thể xử lý các lỗi không thể tránh khỏi một cách thích hợp.

Thứ hai, những dòng này:
```
let range = NSRange(location: 0, length: testString.utf16.count)
regex.firstMatch(in: testString, options: [], range: range) != nil
```
Cái đầu tiên tạo một NSRange bao gồm toàn bộ chuỗi trong ví dụ của chúng ta và cái thứ hai tìm kiếm kết quả khớp đầu tiên trong chuỗi thử nghiệm. Điều này thật vụng về: hầu hết thời gian bạn sẽ muốn tìm kiếm toàn bộ chuỗi đầu vào và việc sử dụng firstMatch (in : ) cùng với kiểm tra nil thực sự làm xáo trộn ý định của bạn.

Vì vậy, hãy thay thế nó bằng một phần mở rộng thứ hai và hãy bao đóng các dòng đó trong một phương thức match ():
```
extension NSRegularExpression {
    func matches(_ string: String) -> Bool {
        let range = NSRange(location: 0, length: string.utf16.count)
        return firstMatch(in: string, options: [], range: range) != nil
    }
}
```
Nếu chúng ta đặt hai phần mở rộng này lại với nhau, bây giờ chúng ta có thể tạo và kiểm tra regexes một cách tự nhiên hơn nhiều:
```
let regex = NSRegularExpression("[a-z]at")
regex.matches("hat")
```
Chúng ta có thể tiến xa hơn bằng cách sử dụng tính năng nạp chồng toán tử để làm cho toán tử chứa ~ =, của Swift hoạt động với các biểu thức chính quy:
```
extension String {
    static func ~= (lhs: String, rhs: String) -> Bool {
        guard let regex = try? NSRegularExpression(pattern: rhs) else { return false }
        let range = NSRange(location: 0, length: lhs.utf16.count)
        return regex.firstMatch(in: lhs, options: [], range: range) != nil
    }
}
```
Mã đó cho phép chúng tôi sử dụng bất kỳ chuỗi nào ở bên trái và regex ở bên phải, tất cả trong một:
```
"hat" ~= "[a-z]at"
```
Lưu ý: Do rất tốn cost để tạo ra một thể hiện của NSRegularExpression, vì vậy bạn hãy nên cố gắng tạo để có thể sử dụng nhiều lần.

Tiếp sau bài này sẽ là 1 bài viết nâng cao hơn về phần sử dụng Regex, mời các bạn đón đọc. (Nguồn: http://hackingwithswift.com)