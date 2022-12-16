![](https://images.viblo.asia/992bd825-ac80-4654-bb84-65e3ace3ab27.jpg)

Ở topic này mình sẽ viết về cách custom lại bubble chat message theo cách đơn giản và dễ dàng nhất. Để custom một bubble chat thì sẽ có nhiều hướng tiếp cận và thực hiện nó, và có 2 cách tiếp cận mà mình biết ở đây đó là sử dụng `UIBezierPath` và sử dụng function `resizableImage(withCapInset:)`. Đối với cách sử dụng UIBezierPath sẽ khó hơn là bạn cần xác định các điểm rồi vẽ các đường lên. Cách này các bạn có thể tự vẽ hoặc sử dụng các tools hỗ trợ generate code từ hình vẽ ví dụ như [Paint Code](https://www.paintcodeapp.com/) .
![](https://images.viblo.asia/e3b96a87-37ab-4a06-8871-2a767533af0d.png)

Hình ảnh ở trên là đoạn code được tạo ra từ Paint Code, có thể thấy rằng để tạo ra một bubble message chat từ UIBezierPath là không hề dễ dàng, chưa kể đến đây mới chỉ là một bubble với size cố định, để co giãn được theo content ở trong, chúng ta phải sửa những tham số hard code thành những biến và tính toán nó cho phù hợp với content ở bên trong. 

Cách tiếp cận còn lại bằng function `resizableImage(withCapInset:)` sẽ đơn giản và dễ tiếp cận hơn.
Ý tưởng của cách tiếp cận này rất đơn giản thôi, bạn có một cái ảnh bubble message ban đầu (đủ nhỏ) và sẽ scale nó theo size mà mình tính toán của các message.

![](https://images.viblo.asia/6dfa20a0-8024-43c9-9a2f-db20d0bc9d47.png)

Vậy function  `resizableImage(withCapInset:)` làm việc này như thế nào? Scale ảnh à? có khác gì là scaleToFill của UIImageView không?.
Không nó không giống đâu, scale to Fill sẽ scale ảnh của bạn ra theo các hướng cho đến khi chạm bounds. Còn resizeableImage không làm như vậy!

![](https://images.viblo.asia/02990463-41bf-4b41-a40e-3ddf3c09b570.png)

Để mà tạo ra được ảnh lớn từ một ảnh nhỏ thì ảnh nhỏ (origin) sẽ được chia thành 9 phần như hình ở trên. Những phần được chia này sẽ phụ thuộc vào tham số mà bạn truyền vào (UIEdgeInset) ban đầu.
* Những phần 1, 3, 7, 9 là bốn góc sẽ được giữ nguyên khi mà tạo ra ảnh lớn hơn.
* Những phần 2 và 8 sẽ được kéo dài ra theo chiều ngang để lấp đầy khoảng trống tương ứng.
* Những phần 4 và 6 sẽ được kéo dài ra theo chiều dọc để lấp đầy khoảng trống tương ứng khi mà các góc đi xa ra.
* Phần 5 ở giữa sẽ được kéo dãn ra cả 2 phía.

Vậy có nghĩa là ảnh của chúng ta sẽ xác định được những góc cố định và phần content ở giữa sẽ scale theo nội dung. Đúng cái chúng ta cần tìm đây rồi đúng không. Tuy nhiên hãy lưu ý, khi chọn ảnh để resize chúng ta cần chọn ảnh có độ phân giải đủ lớn nhưng size đủ nhỏ để khi chia phần số 5 càng nhỏ càng tốt, như vậy khi resize Image sẽ không bị méo.

Bây giờ bạn có thể bắt tay vào việc code rồi. 
Bắt đầu với việc tạo model.
```
class SMessage {
    public let content: String
    public let isMine: Bool
    public let date: Date
    public let emoji: UIImage?
    
    init(content: String, isMine: Bool = true, date: Date, emoji: UIImage? = nil) {
        self.content = content;
        self.isMine = isMine;
        self.date = date;
        self.emoji = emoji;
    }
}
```

Với model này chúng ta sẽ có được ít nhất thông tin của content message, dùng để tính toán kích thước label, isMine để xác định tin nhắn này từ mình gửi hay người khác. Việc còn lại của chúng ta là tính toán kích thước dựa trên label hoặc image (nếu có) để có được kích thước chính xác để resize ảnh. 

```
        let bubbleImage = isMine ? #imageLiteral(resourceName: "bubble_mine") : #imageLiteral(resourceName: "bubble")
        let bubbleImageView = UIImageView(frame: CGRect(x: 0, y: 0, width: self.frame.width, height: self.frame.height))
        bubbleImageView.image = bubbleImage.resizableImage(withCapInsets: UIEdgeInsets(top: 17, left: 21, bottom: 17, right: 21))
        self.addSubview(bubbleImageView)
        self.sendSubviewToBack(bubbleImageView)
```
Ở đoạn code này, mình đã custom một view để hiện bubble và `self.frame.width` và `self.frame.height` là kích thước tuỳ chỉnh đã tính trước đó với content mà nó có. Các con số hard code 17 - 21 là phần inset với ảnh mà mình tạo. Đây là file mình viết các bạn có thể tham khảo [tại đây](https://github.com/oCanKhacNguyen/SChat/blob/master/SChat/OldStuff/SBubbleChatView.swift)

Mong bài viết cung cấp được thông tin giúp bạn có thể tự custom lại một bubble chat view như mong muốn.

**References:**
https://www.innofied.com/creating-old-style-message-bubble-swift/