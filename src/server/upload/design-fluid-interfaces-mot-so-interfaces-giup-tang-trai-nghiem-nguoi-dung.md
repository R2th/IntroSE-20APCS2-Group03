Trong một ngày rất chi là bình thường, mình ngồi lướt facebook như mọi hôm và chợt đọc được một bài đăng của anh leader trước đây chia sẻ khiến. Sau khi đọc xong thì cảm thấy rất tâm đắc và muốn đặt áp dụng những thứ đọc được này vào những sản phẩm hiện tại ngay lập tức. Nhưng tất nhiên để áp dụng thì cần sự tìm hiểu và áp dụng một cách hợp lý, nên mình quay ra viết Viblo series về nó.
Bài viết lần này khá dài nên mình sẽ viết thành một series. [Reference](https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5) các bạn có thể tìm đọc ở đây, với bài viết đầu do thời gian viết khá ngắn nên nội dung sẽ là trích xuất và tự thực hiện là chủ yếu. Các  đi vào các Interfaces và ứng dụng thực tế của chính mình.

### "Design Fluid Interfaces"
Điều đầu tiên mình cảm thấy sau khi đọc bài viết gốc là sự "lạc hậu" của mình. `Design Fluid Interfaces` là khái niệm được giới thiệu và trình bày tại WWDC 2018 và **bây giờ**, 2 năm sau mình mới đọc được và có cảm nhận về nó. Các bạn có thể đọc bài viết gốc ở trên, và tìm nghe lại bài present trong WWDC 2018 ở [đây](https://developer.apple.com/videos/play/wwdc2018/803/). Bài viết dưới đây là cảm nhận của cá nhân mình.
Nói đến `Fluid Interfaces` thì nó khá là mơ hồ, nó được miêu tả bằng các tính từ như là `nhanh`, `mượt mà`, `tự nhiên` hay `kì diệu`. Nhưng thực tế để dễ hình dung thì chúng ta có thể liên tưởng đến trải nghiệm trên các dòng máy tai thỏ của iphone (Trải nghiệm của phím home, trải nghiệm của present view trên iOS 13, ... vân vân và mây mây)

![](https://images.viblo.asia/3c3bb832-fae1-4d86-b7e2-2ed5816410b6.gif)

Đây là ví dụ khá rõ ràng về trải nghiệm này, người dùng có thể đóng app trong quá trình app đang được khởi động lên. Về mặt giao diện, chúng ta có thể thấy là giao diện hoàn toàn tương tác rất nhanh với thao tác của người dùng, và có thể dừng lại ngay tại một điểm nào đó trong tiến trình của chúng. Mọi thứ đều rất mượt mà và tự nhiên, thực sự trải nghiệm của phím `Home` trên các dòng máy này cho mình cảm giác tuyệt hơn hẳn khi dùng phim `Home` vật lý. 
Thông qua ví dụ trên có lẽ các bạn đã mường tượng một chút được về `Fluid Interfaces`. Chúng ta có thể tóm gọn 3 điều về nó như thế này:
* Fluid Interfaces sẽ làm tăng trải nghiệm của người dùng, chúng khiến mọi thứ cảm giác là rất nhanh và mượt mà
* Chúng cho người dùng cảm giác rằng họ có thể điều khiển được chúng vậy
* Tất nhiên, để làm được những thứ như vậy chúng ta sẽ mất công xây dựng hơn rồi. 

Bài viết sẽ giới thiệu 8 interfaces có thể sẽ giúp bạn tăng trải nghiệm của người dùng. Tất nhiên là đừng áp dụng cứng nhắc chúng vào. Do thời lượng bài viết dài nên mình sẽ chỉ giới thiệu intefaces đầu tiên trong bài viết này.

## Interface #1: Calculator Button
Bạn đã từng sử dụng các phím số trong app calculator của iPhone chưa vậy? Bạn có cảm thấy rằng những button đó có khác gì với các button bạn đang hằng ngày phát triển ko? Nếu câu trả lời bạn là có giống mình thì các bạn có thể interfaces này sẽ giúp bạn làm những button khô khan trước đây trở nên mềm mại hơn. Những button mình làm trước đây cảm giác chủ yếu rất là khô khan, chủ yếu là `setTitle`, `setTitleColor`, `border`, `cornerRadius`, .... tất cả chỉ là thay đổi ngoại hình của chú Button đó thôi, còn lúc khi click vào một button thì sao? Button chỉ chuyển từ màu này sang màu khác, chữ này sang chữ khác? Tất cả đều xảy ra instantly và đến khi đọc bài viết này mình nghĩ là mình có thể làm nhưng button trước đây trở nên tốt hơn một chút đó. Bây giờ thì hãy thử soi lại button của cái `calculator` của chúng ta có gì đặc biệt:

![](https://images.viblo.asia/03b8e1aa-c742-4fe9-a61c-381e69b93172.gif)

* Highlights lập tức ngay khi user chạm vào 
* Có thể tap liên tục ngay cả khi animation highlights vẫn còn đang xảy ra
* User có thể `touch down` sau đó `drag outside` để huỷ bỏ thao tác 
* User có thể `drag back` để thực hiện thao tác 

Hmm, nghe nó rất có vẻ là hơn mấy cái button nhạt nhẽo mà mình trước đây từng làm rồi đấy. Những thứ phức tạp này được tạo ra trên giả thuyết là user suy nghĩ và hành động song song với nhau. Giả thuyết thú vị, hãy thử phân tích nó xem nhé:

![](https://images.viblo.asia/7b3d57d4-99a7-4d55-b022-e77746a7e8b8.png)

Ở đây chúng ta sẽ thấy 2 luồng hành động nối tiếp và song song. Ở flow trên chúng ta đang giả thuyết rằng, user sau khi suy nghĩ xong -> đưa ra quyết định -> sau đó thực hiện hành động -> sau đó release (là thả button ra không bấm nữa). Đây là một flow rất thông thường vào đúng, giống như `water flow` vậy nó đúng trong hoàn cảnh của nó. 
Nhưng có bao giờ khi bạn bấm xong một button và lúc đó bạn mới chợt nhận ra là "Oh no, tôi không muốn thực hiện hành động này, tối muốn huỷ bỏ nó!". Mình nghĩ là sẽ có và rất nhiều là đằng khác, đó cũng chính là giả thuyết ở luồng dưới. Việc user nghĩ hay đưa ra quyết định xảy ra đồng thời với `gesture` hay còn gọi là **tay nhanh hơn não** và nếu như quyết định của chúng ta không đúng với gesture đã đưa ra trước đó thì suy nghĩ của chúng ta sẽ là làm sao để huỷ bỏ thao tác đó. 
Mấu chốt interfaces này tuyệt vời và tăng trải nghiệm người dùng ở chỗ là user có thể cancel action hay thực hiện liên tiếp chúng.

Hãy thử code ra một button **like auth** thương hiệu Apple một chút nhé
### Critical Code
Vì chúng ta customize tương tác của button nên điều đầu tiên chúng ta cần làm là tạo một  `subclass` của `UIButton`
```
CalculatorButton: UIControl {
    public var value: Int = 0 {
        didSet { label.text = “\(value)” }
    }
    private lazy var label: UILabel = { ... }()
}
```

Sau đó chúng ta sẽ gom nhóm các actions này lại thành 2 actions chính là `touchDown` và `touchUp`
```
addTarget(self, action: #selector(touchDown), for: [.touchDown, .touchDragEnter])
addTarget(self, action: #selector(touchUp), for: [.touchUpInside, .touchDragExit, .touchCancel])
```
Với `touchDown`, chúng ta sẽ cancel bỏ animation hiện tại nếu có và set highlight ngay lập tức cho button 
Còn với `touchUp`, chúng ta sẽ tạo ra một animator mới và chạy nó
```
private var animator = UIViewPropertyAnimator()
@objc private func touchDown() {
    animator.stopAnimation(true)
    backgroundColor = highlightedColor
}
@objc private func touchUp() {
    animator = UIViewPropertyAnimator(duration: 0.5, curve: .easeOut, animations: {
        self.backgroundColor = self.normalColor
    })
    animator.startAnimation()
}
```

### Kết luận 
Bài viết lần này chỉ giới thiệu duy nhất 1 trong 8 interfaces được đề cập tới nhưng mong nó sẽ giúp các bạn phần nào hiểu được và cảm thấy muốn thay đổi một cái gì đó mang tính product hơn. Các nhân mình sau khi tìm hiểu và thử áp dụng thì thấy rằng ngoài việc appearance của button như design vẽ ra thì chúng ta hoàn toàn có thể khiến nó còn tốt hơn nữa bằng việc chú trọng hơn đến việc chuyển đổi giữa các trạng thái của button hay animations khi chuyển đổi giữa các trạng thái / gesture.