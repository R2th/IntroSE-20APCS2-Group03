### **I.  Giới thiệu**
Trong những bước đầu tiên tìm hiểu về iOS của mình, tôi thường theo dõi nhưng video hướng dẫn trên Youtube.  Và tôi thường thấy những điều như sau:

```
let makeBox: UIView = {
     let view = UIView()
     return view
}()
```
Là một người đang tìm hiểu, tôi lúc đó chỉ đơn giản sao chép và sử dụng nó. Tuy nhiên, một ngày nọ, một người đã hỏi tôi, tại sao bạn lại thêm *{}* và tại sao *()* lại tồn tại ở cuối? Tôi đã không thể trả lời.  Tôi viết bài này để cho bản thân tôi của ngày xưa và cũng có thể có một chút hữu ích cho mọi người.

### **II. Mục tiêu**
Mục tiêu trong bài này, là có thể hiểu được cách khởi tạo một đối tượng bằng cách như trên.

### **III. Tạo UI Components**
Trước khi tôi bắt đầu thực hiện đoạn code  ở trên, hãy cùng nhìn lại một chút về cách viết code trước đây. Để tạo một button trong Swift, có lẽ bạn đôi lúc cũng sử dụng theo cách này:
```
// Determine Size
let buttonSize = CGRect(x: 0, y: 0, width: 100, height: 100)
// Create Instance
let bobButton = UIButton(frame: buttonSize)
bobButton.backgroundColor = .black
bobButton.titleLabel?.text = "Bob"
bobButton.titleLabel?.textColor = .white
```
Điều đó là bình thường.
Giả sử, bạn phải tạo ba nút khác, có thể bạn phải sao chép mã ở trên và sau đó thay đổi tên từ bobButton thành bulkButton. 
Nó rất tẻ nhạt.
```
// New Button 
let bobbyButton = UIButton(frame: buttonSize)
bobbyButton.backgroundColor = .black
bobbyButton.titleLabel?.text = "Bob"
bobbyButton.titleLabel?.textColor = .white
```
Nếu bạn không muốn lặp lại, bạn có thể tạo một hàm thay thế.
```
func createButton(enterTitle: String) -> UIButton {
     let button = UIButton(frame: buttonSize)
     button.backgroundColor = .black
     button.titleLabel?.text = enterTitle
     return button
}
createButton(enterTitle: "Yoyo") //
```
Tuy nhiên, trong phát triển iOS, rất hiếm khi các button tùy chỉnh trông tương tự nhau. Do đó, một hàm có thể yêu cầu nhiều tham số hơn bao gồm background color, title, border radius, shadow, v.v. Hàm của bạn có thể trông giống như:
```
func createButton(title: String, borderWidth: Double, backgrounColor, ...) -> Button 
```
Mã ở trên không lý tưởng ngay cả khi bạn thêm các tham số mặc định cho hàm. Nó làm giảm khả năng đọc. Vì vậy, nó tốt hơn để ở lại với phương pháp tẻ nhạt ở trên.
Nhưng, có cách nào chúng ta có thể làm cho nó bớt tẻ nhạt và ngăn nắp hơn không? Tất nhiên. Chúng ta đã nhìn vào quá khứ - Giờ là thời gian để bước lên và nhìn về tương lai.

### **IV. Một con đường mới**
Trước khi chúng tôi tạo các thành phần UI, trước tiên hãy trả lời câu hỏi ban đầu. *{}* có nghĩa là gì và nó có phải là một computed property?
Không, nó chỉ là một closure block.
Đầu tiên, hãy để minh họa cách tạo một đối tượng bằng cách sử dụng closure block. Tôi sẽ tạo struct gọi là Human.
```
struct Human {
         init() {
              print("Born 1996")
         }
}
```
Bây giờ, đây là cách bạn tạo một đối tượng với một closure.
```
let createBob = { () -> Human in
     let human = Human()
     return human
}

let babyBob = createBob() // "Born 1996"
```
Chỉ cần giải thích, createdBob là một closure có kiểuclosure *() -> Human* . Bạn đã tạo ra một đối tượng gọi là babyBob bằng cách gọi *createBob ()*.
Tuy nhiên, bạn phải tạo hai hằng số: *createdBob* và *babyBob*. Điều gì nếu bạn muốn làm mọi thứ trong một câu lệnh.
```
let bobby = { () -> Human in
     let human = Human()
     return human
}()
```
Bây giờ, closure thực thi chính nó thông qua việc thêm *()* vào cuối và *bobby* bây giờ có một đối tượng *Human*.
*Bạn đã học cách khởi tạo một đối tượng với một closure.*
Bây giờ, hãy để áp dụng để tạo một đối tượng UI giống với ví dụ ở trên.
```
let bobView = { () -> UIView in
     let view = UIView()
     view.backgroundColor = .black
     return view
}()
```
Rất tốt, chúng ta có thể làm cho nó ngắn hơn. Trên thực tế, chúng tôi không cần chỉ định loại closure. Thay vào đó, tất cả những gì chúng ta phải làm là chỉ định loại của biến, ví dụ: 
```
let bobbyView: UIView = {
     let view = UIView()
     view.backgroundColor = .black
     return view
}()
```
Swift có thể suy ra rằng khối đóng là () -> UIView dựa trên từ khóa *return*.

### **V. Tổng kết**
Trong bài viết này, chúng ta đã tìm hiểu sâu hơn về việc khởi tạo với *closures* trong Swift. Tôi xin kết thúc bài viết tại đây!
Bài viết được tham khảo từ [Swift Lazy Initialization with Closures](https://blog.bobthedeveloper.io/swift-lazy-initialization-with-closures-a9ef6f6312c)