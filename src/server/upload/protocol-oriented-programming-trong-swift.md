Chắc hẳn các bạn đã từng nghe đến hoặc đọc về Protocol Oriented Programing (POP). Bài viết dưới đây, tôi sẽ cùng các bạn áp dụng POP vào một ví dụ nhỏ để hiểu rõ hơn POP là gì.

Ở bài viết này chúng ta sẽ học cách sử dụng Protocol để animate những UI Component như UIButton, UILabel, hay UIImageView. Đồng thời tôi cũng sẽ chỉ cho các bạn sự khác biệt giữa phương pháp truyền thống và phương pháp POP.

UI
Ứng dụng này có tên là "Welcome to My House Party". Tính năng của nó là kiểm tra xem bạn có được mời tới bữa tiệc của tôi hay không, bạn sẽ phải nhập code khách mời. Nếu bạn ấn button, sẽ có hiệu ứng xảy ra. Ở đây chúng ta có 4 thành phần chính sẽ diễn ra hiệu ứng: passcodeTextField, loginButton, errorMessageLabel, và profileImageView
![](https://images.viblo.asia/675a0dd9-cb6a-4958-9b38-895fa801e292.gif)
Hai hiệu ứng ở đây là: 1. Buzzing 2. Popping (Flash)

Để hoàn toàn nắm được sức mạnh của POP ở ứng dụng thực tế, hãy so sánh nó với cách làm truyền thống. Ví dụ nếu bạn muốn animate một UIButton và UILabel, bạn cần phải subclass cả 2 và thêm phương thức vào trong đó.

```
class BuzzableButton: UIButton {
 func buzz() { // Animation Logic }
}
class BuzzableLabel: UIButton {
 func buzz() { // Animation Logic }
}
```
Và tạo hiệu ứng "buzz" khi chúng ta tap login button:
```

@IBOutlet wear var errorMessageLabel: BuzzableButton!
@IBOutlet wear var loginButton: BuzzableLabel!
@IBAction func didTapLoginButton(_ sender: UIButton) {
 errorMessageLabel.buzz()
 loginButton.buzz() 
}
```
Bạn có thấy là chúng ta đang lặp lại một số thao tác không? ở đây Logic animation có ít nhất 5 dòng và có một cách "tốt hơn"  đó là dùng extension. Vì UILabel và UIButton đều kế thừa từ UIView, chúng ta có thể thêm phương thức buzz vào extension UIView:

```
extension UIView {
 func buzz() { // Animation Logic }
}
```
Như vậy BuzzableButton và BuzzableLabel đều tồn tại phương thức buzz. Bây giờ bạn thấy tránh được việc lặp code 5 dòng xuống còn 3 dòng :D

```
class BuzzableButton: UIButton {}
class BuzzableLabel: UIButton {}
@IBOutlet wear var errorMessageLabel: BuzzableButton!
@IBOutlet wear var loginButton: BuzzableLabel!
@IBAction func didTapLoginButton(_ sender: UIButton) {
 errorMessageLabel.buzz()
 loginButton.buzz() 
}
```
 

Nhìn qua bạn thấy dòng label **errorMessageLabel** với nội dung “Please enter valid code 😂”  diễn ra hiệu ứng hơn 1 lần. Nó xuất hiện và sau đó biến mờ dần. Vậy các bạn xử lý hiệu ứng này theo cách truyền thống như thế nào? Có 2 cách để làm việc này. Đầu tiên, (một lần nữa) bạn thêm một phương thức nữa vào trong UIView.

// Extend UIView 
```
extension UIView {
 func buzz() { // Animation Logic }
 func pop() { // UILabel Animation Logic }
}
```
Tuy nhiên, nếu chúng ta thêm method này vào trong UIView, thì method pop() sẽ có thể được gọi bởi những UIComponents khác bên cạnh UILabel. Như vậy là chúng ta đang kế thừa một function không cần thiết.

Cách thứ 2 là subclass UILabel,

// Subclass UILabel
```
class BuzzableLabel: UILabel {
 func pop() { // UILabel Animation Logic }  
}
```
Cách này khá ổn, tuy nhiên chúng ta sẽ phải thay đổi tên class thành BuzzablePoppableLabe để phân biệt rõ ràng hơn.

Lúc này, nếu bạn muốn thêm một method nữa vào UILabel để chỉ rõ những gì label làm, bạn sẽ phải thay đổi tên class như BuzzablePoppableFlashableDopeFancyLovelyLabe. @@! 
Thay vì subclass chúng ta hãy cùng tạo một protocol trước. Ở đây tôi xin mạn phép bỏ qua chi tiết logic animation.

```
protocol Buzzable {}
extension Buzzable where Self: UIView {
 func buzz() { // Animation Logic}
}
```
Như vậy, bất kì một UIComponents nào tuân thủ theo Buzzable protocol sẽ phải thực thi method buzz. Không như extension khi mà chỉ những ai tuân thủ protocol sẽ phải thực hiện method đó. Hơn nữa, self.UIView được dùng để thông báo rằng protocol sẽ chỉ được tuân thủ bởi UIView hoặc những phần tử kế thừa từ UIView.

Bây giờ hãy cùng áp dụng Buzzable vào trong loginButton, passcodeTextField, errorMessageLabel, and profileImageView. Khoan, thế còn Poppable thì sao? Tương tự như vậy.

```
protocol Poppable {}
extension Poppable where Self: UIView {
 func pop() { // Pop Animation Logic }
}
 
```
Cái hay của POP đó là bạn có thể áp dụng phương thức pop cho mọi UIComponent mà không phải subclass chúng.

class MyImageView: UIImageVIew, Buzzable, Poppable
 
Như vậy, việc đặt tên cho class đã trở nên linh hoạt hơn bời vì bạn biết rõ rằng phương thức nào là thích hợp để sử dụng dựa trên protocol và tên của mỗi protocol sẽ mô tả class đó. Việc này giúp cho code chúng ta trở nên gọn gàng và tường minh hơn rất nhiều.
Tham khảo: https://www.raywenderlich.com/814-introducing-protocol-oriented-programming-in-swift-3