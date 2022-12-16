# Animation

Animation là một thuộc tính thay đổi theo thời gian. Thường sẽ là 1 thuộc tính của một thực thể nào đó trong giao diện. Thuộc tính thay đổi có thể là vị trí: Một thực thể nào đó có thể di chuyển hoặc thay đổi kích thước, không nhảy đột ngột, theo một tỷ lệ. Hay một backgroud  của view có thể thay đổi từ đỏ sang xanh, không chuyển đổi màu đột ngột mà mờ dần từ màu này sang màu khác. Hoặc có thể thay đổi từ mờ đục sang trong suốt, không biến mất đột ngột, nhưng mờ dần đi.

Nếu không có sự hỗ trợ, việc chúng ta tiếp cận đến animation là ngoài sự tưởng tượng. Từ việc có quá nhiều những thay đổi - thay đổi theo tính toán, thời gian, làm mới màn hình, quản lý luồng, và còn vân vân mây mây thứ nữa. Nhưng may mắn thay, mọi thứ hoàn toàn đã được hỗ trợ. Bạn không phải là người thực hiện chi tiết việc quản lý thực thi như nào; bạn chỉ cần mô tả nó và bạn yêu cầu thực hiện và Done  bạn sẽ có animation theo yêu cầu. 

Yêu cầu một hình ảnh động có thể đơn giản như thiết lập một giá trị thuộc tính hoặc việc thay đổi background chỉ đơn giản trong 1 dòng code 

`myLayer.backgroundColor = UIColor.red.cgColor` // Animation backgroundColor thành màu đỏ

Animation rất dễ tiếp cận vì Apple muốn tạo điều kiện cho sự phổ cập animation trong kho ứng dụng của họ. Animation không chỉ là sự tiện dụng mà nó làm rõ rằng đang thay đổi hoặc đáp ứng cho nhu cầu người sử dụng và rất quan trọng đối với các đối tượng trong giao diện iOS.

## Drawing, Animation, and Threading
Animation dựa trên một sự thật thú vị về cách iOS vẽ thực thể trên màn hình: Bản vẽ không thực sự diễn ra tại thời điểm bạn đưa ra các lệnh vẽ . Khi bạn đưa ra một lệnh yêu cầu một khung nhìn được vẽ lại, hệ thống ghi nhớ lệnh của bạn nhiệm vụ và đánh dấu chi tiết cần phải được vẽ lại. Sau đó, khi tất cả mã của bạn đã chạy và hệ thống đã sẵn sàng, nó sẽ vẽ lại tất cả chi tiết cần vẽ lại.  Aniamtion cũng hoạt động tương tự như vậy, và là một phần của quy trình. Khi bạn yêu cầu một Animation được thực hiện, Animation sẽ không bắt đầu xảy ra trên màn hình cho đến khi chi tiết đó bắt đầu được vẽ lại trong lần tiếp theo (Bạn có thể buộc một animation bắt đầu ngay lập tức, nhưng đây là bất bình thường). Giống như một bộ phim (đặc biệt là phim hoạt hình cổ điển), animation có các khung hình. Một giá trị animation không thay đổi trơn tru và liên tục; nó thay đổi từng bước nhỏ, tạo ra ảo ảnh mượt mà, liên tục thay đổi. Ảo ảnh này sảy ra khi vật thể thay đổi một cách định kỳ, nhanh chóng, làm mới màn hình thường xuyên liên tục và các khung hình được vẽ lại với những thay đổi gia tăng liên tục giữa các lần khiến người nhìn ảo tưởng rằng nó thực sự thay đổi một cách mượt mà. Apple gọi các thành phần hệ thống chịu trách nhiệm cho việc này máy chủ Animation. 

Ví dụ: khi bạn tạo hiệu ứng chuyển động của View từ vị trí thứ nhất  sang vị trí thứ  2, bạn có thể gửi một chuỗi các sự kiện như thế này:
+ Bạn định vị lại toạ độ của view. View bây giờ được đặt ở vị trí 2, nhưng không được vẽ lại ngay, vì vậy nó vẫn được miêu tả ở vị trí 1.
+  Bạn đặt một Animation của View từ vị trí thứ nhất đến vị trí thứ 2.
+  Phần còn lại code của bạn chạy sẽ chạy đến khi hoàn tất.
+  Sau khi các đoạn code còn lại đã hoàn tất chúng bắt đầu được vẽ lại. Nếu không có hình ảnh động, view bây giờ sẽ đột nhiên được miêu tả ở vị trí 2. Nhưng  nếu có một hình ảnh động,  animation sẽ xuất hiện. Nó bắt đầu với chế độ xem được mô tả ở vị trí  thứ nhất, vì vậy đó là những gì người dùng nhìn thấy.
+ Animation được tiến hành, mỗi khung hình của Animation, mô tả chế độ xem ở vị trí trung gian giữa vị trí 1 và vị trí 2. 
+ Animation kết thúc, view kết thúc ở vị trí 2.  Animation bị xóa, cho thấy view thực sự ở vị trí 2 nơi bạn đặt nó trong bước đầu tiên.

Máy chủ Animation hoạt động trên một luồng độc lập và bạn không cần phải lo lắng về các chi tiết việc phải cài đặt hay cấu hình cho nó.  Ngoài ra code của bạn  có thể chạy độc lập và cũng có thể đồng thời với Animation - đó là ý nghĩa của đa luồng - vì vậy sự giao tiếp giữa Animation và mã của bạn có thể yêu cầu một số logic nhât định cho những người tay to.

Việc sắp xếp code của bạn nhận được sự kiện khi Animation kết thúc là một nhu cầu phổ biến. Hầu hết các API Animation cung cấp một cách để thiết lập sự kiện như vậy. Một lần sử dụng một Animation đã kết thúc sẽ thông báo để có thể kết hợp các Animation lại với nhau: một Animation kết thúc và sau đó một Animation khác bắt đầu theo trình tự.

Ngoài ra còn các sự kiện tác động đến Animation của bạn chẳng hạn như người dùng click vào nút home trong khi Animation đang thực hiện để đẩy ứng dụng xuống backgroud , hoặc việc có cuộc gọi đến sẽ làm chuyển ứng dụng của bạn xuống trạng thái inactive và điều gì sẽ sảy ra với Animation của bạn liệu nó ở vị trí cuối cùng hay sẽ quay về vị trí ban đầu khi chưa có Animation ?
Câu trả lời là khi ứng dụng của bạn hoạt động trở lại, mọi thứ đều ở trạng thái cuối cùng mà bạn đã cài đặt. Nhưng nếu bạn muốn ứng dụng của mình tiếp tục với animation điều đó sẽ yêu cầu một số đoạn code từ bạn.

## Image View and Image Animation
UIImageView cung cấp một hình thức Animtion đơn giản. Tuy nhiên, đôi khi nó có thể là tất cả những gì bạn cần. Bạn khởi tạo UIImageView với một mảng của UIImages. Mảng này đại diện cho các khung hình hình ảnh của một Animation hình đơn giản khi bạn gửi yêu cầu bắt đầu Animation, hình ảnh được hiển thị lần lượt, với tốc độ khung hình được xác định bởi thuộc tính animationDuration, lặp lại với số lần được xác định bởi thuộc tính animationRepeatCount (mặc định là 0, nghĩa là lặp lại mãi mãi), hoặc cho đến khi nhận được thông điệp stopAnimating. Trước và sau khi Animation, chế độ xem hình ảnh tiếp tục hiển thị hình ảnh của nó hoặc highlightImage của nó. 
Ví dụ: giả sử chúng ta muốn một hình ảnh của Sao Hỏa xuất hiện và nhấp nháy ba lần trên màn hình. Điều này dường như có thể yêu cầu một số loại giải pháp dựa trên Timer, nhưng nó lại đơn giản hơn rất nhiều khi sử dụng animating UIImageView :
```
let mars = UIImage(named: "Mars")!
let empty = UIGraphicsImageRenderer(size:mars.size).image {_ in}
let arr = [mars, empty, mars, empty, mars]
let iv = UIImageView(image:empty)
iv.frame.origin = CGPoint(100,100)
self.view.addSubview(iv)
iv.animationImages = arr
iv.animationDuration = 2
iv.animationRepeatCount = 1
iv.startAnimating()
```

UIImage cung cấp một dạng  Animation cho UIImageView. Cũng giống như với UIImageView, điều này có nghĩa là bạn đã ghép trước nhiều hình ảnh tạo thành một chuỗi các khung hình. Bạn có thể tạo một hình ảnh hoạt hình bằng một trong các phương thức lớp UIImage này:
+ animatedImage(with:duration: ) Như với các hình ảnh động của UIImageView, bạn cung cấp một chuỗi các UIImage và thời lượng cho toàn bộ Animation.
+ animatedImageNamed(:duration: ) Bạn cung cấp tên của một tệp hình ảnh duy nhất, như với init (named : ).
+ animatedResizableImageNamed(:capInsets:resizingMode:duration: ) Kết hợp một hình ảnh animation với một hình ảnh có thể thay đổi kích thước . 

Một hình ảnh hoạt hình có thể xuất hiện trong giao diện ở bất cứ nơi nào UIImage có thể xuất hiện trong giao diện. Trong ví dụ này, mình sẽ xây dựng một chuỗi các vòng tròn màu đỏ có kích thước khác nhau, xây dựng một hình ảnh animation và sẽ hiển thị trong một UIButton:
```
var arr = [UIImage]()
let w : CGFloat = 18
for i in 0 ..< 6 {
 let r = UIGraphicsImageRenderer(size:CGSize(w,w))
 arr += [r.image { ctx in
 let con = ctx.cgContext
 con.setFillColor(UIColor.red.cgColor)
 let ii = CGFloat(i)
 con.addEllipse(in:CGRect(0+ii,0+ii,w-ii*2,w-ii*2))
 con.fillPath()
 }]
}
let im = UIImage.animatedImage(with:arr, duration:0.5)
b.setImage(im, for:.normal) // b là 1 button trong giao diện
```

Trong iOS 11, hệ thống nhận diện được GIF hoạt hình. Thật không may, nó không được tự hiểu làm Animation cho bạn! Nếu bạn muốn hiển thị một GIF Animation trong UIImageView hoặc dưới dạng UIImage Animating, tùy thuộc vào bạn phân tách vào các khung riêng lẻ.

## View Animation
Tất cả cac animation cuối cùng là các lớp Animation. Tuy nhiên, đối với một số thuộc tính nhất định bạn có thể tạo hiệu ứng trực tiếp cho UIView: alpha, bounds, center, frame, transform và backgroundColor của nó nếu chế độ xem không định nghĩa lại draw( : ). Thuộc tính hiệu ứng UIVisualEffectView có thể Animation giữa nil và UIBlurEffect. Trong iOS 11,thuộc tính cornerRadius của layer view cũng có thể Animate. 

### A Brief History of View Animation
API Animation đã trải qua qua ba giai đoạn chính. Các giai đoạn cũ hơn không bị phản đối hoặc loại bỏ, cả ba giai đoạn đều có thể có mặt đồng thời:
+ Begin and commit


Quay trở lại vào buổi ban đầu của iOS, một Animation được xem là không hoàn hảo khi sử dụng một chuỗi các phương thức lớp của lớp UIView. Để sử dụng API này, bạn gọi startAnimations, định nghĩa animation, đặt thuộc tính có thể animate và thực thi Animation bằng cách gọi commitAnimations. Ví dụ:
```
UIView.beginAnimations(nil, context: nil)
UIView.setAnimationDuration(1)
self.view.backgroundColor = .red
UIView.commitAnimations()
```
+ Block-based animation


Trong Objective-C đã giới thiệu, toàn bộ hoạt động định nghĩa Animation đã được giảm xuống thành một phương thức lớp UIView duy nhất mà bạn phải làm trong 1 block trong đó bạn phải xác định thuộc tính cần animate. Trong Swift, Objective-C Block là một hàm - thường là một hàm ẩn danh:
```
UIView.animate (withDuration: 1) {
self.view.backgroundColor = .red
}
```
+ Property animator


iOS 10 đã giới thiệu một đối tượng mới - UIViewPropertyAnimator .
```
let anim = UIViewPropertyAnimator(duration: 1, curve: .linear) {
 self.view.backgroundColor = .red
}
anim.startAnimation()
```

Mặc dù  begin-and-commit animation vẫn tồn tại, nhưng bạn thương không sử dụng nó. Blockbased Animation hoàn toàn thay thế nó ngoại trừ trong một tình huống đặc biệt khi bạn muốn một Animation lặp đi lặp lại một số lần cụ thể.
Property animator  không thay thế block-based animation; Thay vào đó, nó hỗ trợ và mở rộng. Có những Animation như lặp lại animation, animation tự động chuyển đổi, animation chuyển tiếp property animator không thể giúp bạn, và bạn sẽ tiếp tục sử dụng block-based animation. Nhưng đối với phần lớn các chế độ xem cơ bản, property animator mang lại một số lợi thế có chẳng hạn như multiple completion functionvà khả năng tạm dừng, tiếp tục, đảo ngược và tương tác bằng cách chạm vào view của animation.

### Property Animator Basics
Các phương thức và thuộc tính không chỉ của UIViewPropertyAnimator mà còn có cả từ sự kế thừa giao thức UIViewImplicitlyAnimating và UIViewAnimating

+ Giao thức UIViewAnimating
Là lớp áp dụng giao thức UIViewAnimating, UIViewPropertyAnimator có thể bắt đầu Animation bằng startAnimation, tạm dừng với pauseAnimation và stopped với stopAnimation ( : ) và finishAnimation (at: ).
Thuộc tính State của nó thể hiện trạng thái hiện tại của Animation(UIViewAnimatingState)  có thể là  inactive, active, hoặc .stopped  và thuộc tính isRunning xác định đang chạy hay đã dừng lại.
UIViewAnimating cũng cung cấp hai thuộc tính có thể thiết lập:
-  Thuộc tính fractionComplete  xác định "frame" hiện tại của Animation.
- Thuộc tính isReversed cho biết Animation có đang bình thường hay đảo ngược.


+ Giao thức UIViewImplicitlyAnimating
Là lớp áp dụng giao thức UIViewImplicitlyAnimating, UIViewPropertyAnimator có thể thể nhận được sự kiện khi nào Animation kết thúc với addCompletion ( : ). Hoặc cũng có thể được cung cấp thêm chức năng Animation, với addAnimations ( : ) hoặc addAnimations ( : delayFactor : ). Animation được xác định bởi nhiều function animation được kết hợp bổ sung cho nhau. UIViewImplicitlyAnimating cũng  được cung cấp phương thức continueAnimation(withTimingParameter: termsFactor : ) cho phép một hoạt hình tạm dừng được tiếp tục với thời gian và thời hạn xác định.


+ UIViewPropertyAnimator 

UIViewPropertyAnimator cũng cung cấp một số thuộc tính có thể thiết lập:
-  **isInterruptible** default true, trình Animation có thể bị tạm dừng hoặc dừng lại.
- **isUserInteractionEnables** default true  chế độ xem Animation có thể là lấy sự kiện khi đang thực hiện.
-  **scrubsLinearly** là true default thì khi tạm dừng Animation, đường cong Animation tạm thời được thay thế bằng đường cong tuyến tính.


Như bạn có thể thấy, một property animator đi kèm với khả năng kiểm soát animation từ sau nó bắt đầu. Bạn có thể tạm dừng animation ở giữa quá trình, cho phép người dùng điều khiển animation kết hợp với tương tác trực tiếp, tiếp tục animation, đảo ngược animation và hơn thế nữa. Dưới đây là một ví dụ việc khởi tạo 1 animation đơn giản với  property animator
```
let anim = UIViewPropertyAnimator(duration: 1, curve: .linear) {
 self.view.backgroundColor = .red
}
anim.startAnimation()
```


Trong mã trên, đối tượng UIViewPropertyAnimator được khởi tạo như một biến cục bộ và không lưu giữ lại nó. Tuy nhiên, animation động hoạt động được bởi vì máy chủ Animation giữ lại nó cho chúng ta trong suốt vòng đời của nó. Ngoài ra chúng ta có thể giữ một liên kết đến thuộc tính của nó nếu chúng ta sẽ cần sử dụng ở nơi nào khác nào đó.


Sẽ rất hữu ích khi chúng ta biết về trạng thái của animation trong khi nó đang thực thi. Tại thời điểm Animation bắt đầu với startAnimation, trạng thái của nó được thay đổi, như sau:
+ Animation bắt đầu ở trạng thái .inactive.
+  Khi startAnimation được gọi, Animator ngay lập tức thay đổi trạng thái thành .active và isRunning được đặt thành false (tạm dừng).
+ Animator sau đó ngay lập tức chuyển lại trạng thái thành .active với isRunning đặt thành true. Tuy nhiên, "Animation" sẽ bắt đầu chạy cho đến lần vẽ lại tiếp theo khung hình. 


Tuy nhiên, animation không bắt đầu chạy cho đến thời điểm vẽ lại tiếp theo. Khi Animation được thiết lập chuyển động, nó sẽ tiếp tục cho đến khi hoàn thành và sau đó chạy qua các trạng thái tương tự ngược lại:
+  Animator đang chạy ở trạng thái .active với isRunning là true.
+  Khi animation kết thúc, Animator ngay sau đó chuyển trạng thái sang .active với isRunning đặt thành true (tạm dừng).
+  Animator sau đó ngay lập tức chuyển trở lại trạng thái .inactive. 


Để dừng một Animation, hãy gửi cho nó thông báo stopAnimation (_ : ). Các animation sau đó đi vào trạng thái .stopped . Thông thường bạn sẽ gọi finishAnimation (at :), sau đó trình hoạt hình trở lại .inactive.

Trong ios 11 Lỗi runtime sảy ra khi xoá animator trong khi nó bị tạm dừng (.active nhưng isRunning là false) hoặc dừng (.stopped). Ứng dụng của bạn sẽ gặp sự cố crash nếu điều đó xảy ra. Nếu bạn tạm dừng một animator, bạn phải gọi stopAnimation (true) hoặc nếu không thì gọi stopAnimation (false) Tiếp theo là finishAnimation (at :), do đó đưa nó trở lại trạng thái .inactive trước Animator biến mất