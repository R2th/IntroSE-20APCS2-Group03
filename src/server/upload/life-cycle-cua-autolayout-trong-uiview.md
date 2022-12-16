**Auto Layout là một trong những khái niệm cơ bản và quan trọng nhất trong iOS. Do vậy việc nắm vững và hiểu rõ vòng đời nó là rất cần thiết đối với lập trình viên iOS, giúp tiết kiệm thời gian và tránh bug ảnh hưởng đến UI và performance của app của bạn. Bài viết này sẽ giới thiệu tổng quan về các bước mà  một UIView với Auto Layout sẽ thực thi trước khi hiển thị lên màn hình.**

![alt](http://www.vadimbulavin.com/img/autolayout_1.svg)

Mỗi một UIView với  Auto Layout đều trải qua 3 bước ở trên sau khi khởi tạo: update, layout and render. Các bước này không diễn ra theo một chiều nhất địch, chúng ta có thể qquay lại cũng như là repeat lại toàn bộ vòng đời từ đầu. 

## Update
Ở bước này, frame của view sẽ được tính toán dựa trên các constraint mà chúng ta thiết lập. Hệ thống sẽ duyệt qua view hiearchy theo chiều từ trên xuống dưới tức là từ super- -> subview, và gọi method  updateConstraints() ở mỗi view.

Mặc dù quá trình này diễn ra tự động, tuy nhiên thì thỉnh thoảng bạn cũng cần phải khởi động bước này bằng tay. Ví dụ, trong app của bạn có một vài event xảy ra và bạn cần tính toán lại constraint ngay lập tức mỗi khi event đó trigger. MethodsetNeedsUpdateConstraints sẽ vô hiệu các constraints và thiết lập schedule update cho vòng đời tiếp theo. Sau đóupdateConstraintsIfNeeded sẽ triggers updateConstraints nếu contraints đã bị vô hiệu trước đó. 

## Layout
Ở bước này, frame của từng view được update theo khung hình đã được tính toán ở bước Update trước đó, quy trình diễn ra theo chiều từ dưới lên trên, tức là từ subview -> superview và gọi đến method  layoutSubviews

layoutSubviews là method  được override nhiều nhất trong vòng đời của Auto Layout. Bạn sẽ làm việc này khi:  

Constraints không diễn tả được hết layout của view.
Tính toán frame bằng code.
Ở bước này chúng ta còn có thêm 2 method bổ trợ nữa,  setNeedsLayout vô hiệu layout của view và  layoutIfNeeded gọi tới layoutSubviews nếu như layout đã bị vô hiệu trước đó. Chúng tương tự như  setNeedsUpdateConstraints và updateConstraintsIfNeeded ở bước Update

Khi override layoutSubviews: chúng ta cần lưu ý những điều sau:

Chúng ta phải gọi bằng cú pháp super.layoutSubviews().
Không gọi đến  setNeedsLayout hoặc setNeedsUpdateConstraints, nếu bạn không muốn tạo ra một vòng lặp vô hạn.
Không chỉnh sửa constraint của những view bên ngoài hiearchy.
 

## Rendering
Bước cuối cùng này sẽ chịu trách nhiệm cho việc hiển thị các pixel lên màn hình. Mặc định là UIView sẽ truyền vào  CALayer một đối tượng chứa pixel bitmap của view hiện tại. Đây là một quá trình độc lập và nó không liên quan đến việc bạn enable Auto Layout hay không.

Method cần lưu ý ở đây là  drawRect. Trừ khi bạn đang làm về custom  OpenGL ES, Core Graphicsor UIKit , bạn sẽ không cần phải override method này. 

Mọi thay đổi như thay đổi màu background, thêm subview...đều được xử lý tự động. Bạn cũng có thể xử lý UI từ các view và layer khác mà không cần override method drawRect.

## Xử lý bên UIViewControllers
Các method từ bước 1 và 2 đều có phiên bản tương ứng ở bên ViewController:

Update phase: updateViewConstraints.
Layout phase: viewWillLayoutSubviews / viewDidLayoutSubviews.
Method viewDidLayoutSubviews là method quan trọng nhất, nó có nhiệm vụ thông báo cho view controller biết rằng view đã hoàn thành bước Layout, có nghĩa là bounds đã được thay đổi. Đây là lúc xử lsy các thay đổi vè view sau khi các subview được hoàn thiện nhưng vẫn chưa hiển thị lên trên màn hình.

## Intrinsic Content Size
Intrinsic content size là size thực sự của view dựa trên các nội dung của nó. Ví dụ view intrinsic của một imageview là size của bức ảnh bên trong đó.

Ở đây tôi có hai mẹo nhỏ giúp cho các bạn có thể đơn giản hóa layout của mình cũng như giảm số lượng constraint: 

Override  intrinsicContentSize với custom views, điều này sẽ trả về kích thước chính xác nhất cho nội dung bên trong.
Nếu một view có intricsize cho một dimension, bạn vẫn phải override intrinsicContentSize và trả về UIViewNoIntrinsicMetric 
Alignment Rectangle
Alignment rectangles được sử dụng bởi Auto Layout để ấn định vị trí của views, từ đó tách bạch frame của chúng ra khỏi những content được layout. Có một điểm quan trọng cần lưu ý ở đây đó là  intrinsic content size sẽ tham chiếu tới  alignment rectangle thay vì  frame.

Mặc định thì  alignment rectangle của view sẽ bằng với frame của nó sau khi được tùy biến bằng alignmentRectInsets. Các bạn có thể override lại hai method  alignmentRect(forFrame:) vàframe(forAlignmentRect:). để tùy biến lại giá trị này.

Hãy cùng xem  alignment rectangle ảnh hưởng tới Auto Layout như thế nào qua ví dụ sau đây:
![alt](http://www.vadimbulavin.com/img/alignment_rect_1.svg)

Hai vòng tròn trên là hai imageview được AutoLayout giống nhau. Điểm khác biệt duy nhất là việc xử lý đổ bóng vào trong từng hình tròn. Bóng của hình bên trái là một phần của image bên trong, có nghĩa là ảnh đã có sẵn hiệu ứng đổ bóng. Còn hình bên phải là được đổ bóng thủ công bằng UIKit, và hình bên trong chỉ là một vòng tròn mà thôi.

![alt](http://www.vadimbulavin.com/img/alignment_rect_2.svg)

Điểm mấu chốt để nắm và hiểu được ví trí bố cục thật sự là sự khác biệt của alignment rectangles. Ở hình bên trái thì bóng đen là một phần cùa image, cũng đồng thời là một phần của  alignment rectangle. Do đó center của alignment rectangle sẽ không match với center của hình tròn. 

Ngược lại thì view bên phải có hiệu ứng bóng được vẽ bằng UIKit, do vậy alignment rectangle dcủa nó sẽ không bao gồm bóng đen, hay nói cách khác là center của hình tròn và center của  alignment rectanglecenter là giống nhau.

## Tổng kết
Như vậy là qua bài viết trên, chúng ta đã có được cái nhìn tổng quát về những thành phần quan trọng trong 3 bước xử lý với AutoLayout của UIView trước khi hiển thị lên màn hình. Thêm vào đó, chúng ta còn biết được thế nào là  intrinsic content size và alignment rectangle cũng như vai trò của chúng. Hy vọng bài viết này sẽ giúp các bạn có thêm kiến thức để nâng cao kỹ năng UI của mình. 

Nguồn bài viết : http://www.vadimbulavin.com/view-auto-layout-life-cycle/