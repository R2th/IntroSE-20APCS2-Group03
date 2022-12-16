Auto Layout là một trong những thủ thuật quan trọng nhất khi lập trình IOS . Và để control được nó bạn phải hiểu vòng đời của nó trong suốt quá trình phát triển để tiết kiệm thời gian tránh những sai lầm ngớ ngẩn . Nếu bạn thiếu những kiến thức này không sớm thì muộn sẽ gặp đến vấn đề về giao diện và hiệu suất trong ứng dụng của bạn . Bài viết này mình sẽ nói về các bước từng UIView với Auto Layout được kích hoạt trước khi được hiển thị .

Bài viết này dành cho những bạn đã quen với Auto Layout cơ bản . Nếu bạn chưa biết về Auto Layout , mình khuyên bạn nên tìm hiểu [Auto Layout Guide](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/AutolayoutPG/)  của Apple sau đó quay lại bài viết .

**Tổng quan về các bước** 

![](https://images.viblo.asia/c6c8da6a-5e1c-4081-ba41-290cdf22fb38.png)

Mỗi *UIView* được kích hoạt Auto Layout thông qua 3 bước khởi tạo : update , layout , render . Các bước này ko xảy ra theo 1 chiều . Nó có thể thông qua việc kích hoạt nào đó và sẽ làm cho bước đó xử lý lại 1 lần nữa.

**Update**

Bước này sẽ tính toán view frame dựa trên contrains của nó. Hệ thống sẽ thông qua phân cấp view từ trên xuống dưới ., ví dụ : từ super to subview, và gọi *updateConstraints()* cho mỗi view
Mặc dù quá trình này xảy ra tự động  , đôi khi bạn vẫn phải kích hoạt nó bằng tay . Ví dụ , khi một số trạng thái internal ảnh hưởng đến thay đổi UI , và bạn cần tính toán lại các ràng buộc ngay lập tức .

*setNeedsUpdateConstraints* làm mất hiểu lực các ràng buộc và lên kế hoạch update cho chu kỳ tiếp theo . *updateConstraintsIfNeeded* kích hoạt *updateConstraints* tại nơi mà nếu các ràng buộc trước đây bị vô hiệu hóa .

**Layout** 

Trong bước này , frame của mỗi view được update với các hình chữ nhật được tính toán trong bước Update . Nó xảy ra từ dưới lên trên , nghĩa là hệ thống sẽ thông qua các view từ sub tới superview và gọi *layoutSubview*.

*layoutSubviews* là phương thức phổ biến nhất được overriden từ toàn bộ vòng đời Auto Layout . Bạn sẽ làm điều này khi :
* Contraints không đủ để thể hiện layout của view 
* Frames được tính toán tự động 

*setNeedsLayout* và *layoutIfNeeded* là các phương thức bổ sung làm mất hiệu lực layout của view và gọi *layoutSubviews* tại nơi tương ứng . Chúng có cùng ý nghĩa giống với *setNeedsUpdateConstraints* và  *updateConstraintsIfNeeded* trong bước Update .

Khi overriden layoutSubviews:
* Đảm bảo phải gọi *super.layoutSubviews()*
* Không gọi *setNeedsLayout* hoặc *setNeedsUpdateConstraints*, nếu không sẽ xảy ra vòng lặp vô hạn .
* Không sửa đổi contraints của các view khác ngoài hệ thống phân cấp hiện tại .
* Nếu có bất kỳ contraints nào từ hệ thống phân cấp được thay đổi , bước Update sẽ được kích hoạt , sau đó sẽ là bước Layout khác , có khả năng sẽ xảy ra vòng lặp vô hạn.

**Rendering**

Bước này chịu trách nhiệm đưa các pixels tới màn hình . Mặc định , UIView chuyển tất cả công việc tới tầng CALayer mà chứa một Pixel bitmap của trạng thái view  hiện tại .
Bước này không phụ thuộc vào Auto Layout được chấp thuận bởi view hoặc không .

Phương thức cốt lỗi ở đây là *drawRect*. Trừ khi bạn đang custom vẽ OpenGL ES , Core Graphics hay UIKit thì ko cần phải ghi đè phương thức này .

Tất cả các thay đổi như màu background, thêm subview v.v  . đều được vẽ tự động . Hầu hết thời gian bạn có thể làm UI từ các view và layer khác , và không cần overriden drawRect.

**Về UIViewControllers**

Các phương thức từ bước 1 và bước 2 có các thành phần của của chúng cho viewcontroller:

* Bước Update: updateViewConstraints.
* Bước Layout: viewWillLayoutSubviews / viewDidLayoutSubviews.


Phương thức *viewDidLayoutSubviews* là quan trọng nhất trong số các phương thức . Nó được gọi để thông báo cho viewcontroller là view của nó đã hoàn thành bước Layout , tức là phạm vi của nó đã được thay đổi . Đây là cơ hội để thực hiện việc thay đổi tới một view sau khi đã đưa tới subview của nó nhưng chưa hiển thị lên màn hình .

**Intrinsic Content Size**

*Intrinsic Content Size* là kích cỡ tự nhiên của 1 view dựa trên nội dung của nó . ví dụ  intrinsic content size của image view là kích cỡ của image của image view đó .
Dưới đây là 2 thủ thuật mà sẽ giúp bạn đơn giản hóa layout và giảm số lượng constraints:

Thực hành tốt override intrinsicContentSize cho việc custome các view , trả về kích cỡ phù hợp cho nội dung của chúng .
Nếu 1 view có 1 intrinsic size chỉ cho một chiều , bạn vẫn nên override intrinsicContentSize và return UIViewNoIntrinsicMetric cho không gian không xác định .

**Alignment Rectangle**

*Alignment Rectangle* được sử dụng bởi công cụ Auto Layout để xác định vị trí các view , do đó tách frame của chúng ra khỏi nội dung đã được đặt ra. Điều quan trọng cần lưu ý là intrinsic content size đề cập đến  alignment rectangle thay vì frame

Bởi mặc định , alignment rectangle của view bằng với frame của nó được sửa đổi bởi *alignmentRectInsets* . Để kiểm soát alignment rectangle tốt hơn , bạn có thể override *alignmentRect(forFrame:)*  và *frame(forAlignmentRect:)* . 2 phương thức này phải là nghịch đảo của nhau .

Hãy xem alignment rectangle ảnh hưởng đến vị trí Auto Layout như thế nào bằng ví dụ dưới đây :

![](https://images.viblo.asia/b3ae3276-5e17-4588-bd16-4fc37bea32e0.png)

Vòng tròn ở trên image view được căn theo giữa theo cùng một cách bằng Auto Layout . Sự khác biệt duy nhất là làm thế nào bóng được thêm vào hình tròn . Bóng của hình tròn bên trái là một phần của image , tức là hình ảnh có đổ bóng . Bên phải có một bóng được thêm bới UIKit và nó chi chứa một vòng tròn.


![](https://images.viblo.asia/f3195f90-fa14-4fd2-9cca-ddd3f3446f73.png)


Chía khóa để hiểu vị trí của chúng là sự khác biệt trong alignment rectangle . Vì bóng là một phần image của view bên trái , nó cũng là một phần của alignment rectangle . Do đó tâm của alignment rectangle không khớp với tâm vòng tròn

Ngược lại , view bên phải có bóng đổ bằng UIKit . alignment rectangle của nó không bao gồm bóng , nghĩa là tâm của vòng tròn và tâm của alignment rectangle là bằng nhau .


=> Ở bài viết này mình đã giới thiệu cho các bạn về vòng đời của Auto Layout và cách để sử dụng chúng . Hẹn gặp lại các bạn ở bài viết tiếp theo

Thanks for watching <3