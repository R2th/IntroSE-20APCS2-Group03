Xin chào các bạn mình là một iOS developer và thời gian gần đây mình có mầy mò sang học em Flutter. Sau khoảng thời gian 1 tháng thì đây là những chia sẻ cảm nghĩ của mình khi chuyển từ native iOS sang Flutter, bên cạnh đó là những kinh nghiệm mình rút ra được trong quá trình dev Flutter bằng VSCode hy vọng có thể giúp ích cho các bạn trong việc tiếp cận Flutter.

## Sự khác biệt giữa native thuần và Flutter
Khác biệt lớn nhất đó tất nhiên là Flutter là SDK multi platform có thể build được cả iOS và android. Flutter không chỉ giải quyết bài toán Fast Development giống như react native mà còn đảm bảo được Native Performance giống như native thuần. Thực sự thì mình ấn tượng ở khoản Fast Development của nó. 

Flutter sử dụng DART. Một ngôn ngữ lập trình hướng đối tượng do Google phát triển. DART là một static type language nên nó là AOT (Ahead of Time), compile xong hết rồi mới chạy. Trong khi đó nó cũng là JIT (Just in Time) giống như các dynamic type language. Khi dev thì nó sử dụng JIT để hỗ trợ Hot Load và build release thì dùng AOT để tối ưu hiệu năng như một native code bình thường. Việc bạn vừa code vừa có thể xem màn hình app thay đổi theo thật là một trải nghiệm vô cùng thú vị.

Tuy Dart là một ngôn ngữ mới tuy nhiên nó lại rất dễ học vì trước đó mình đã có kinh nghiệm code với javascript.

Cũng giống như android Google cũng cung cấp đầy đủ document cho Flutter. Đi từ cài đặt, hướng dẫn viết app cơ bản cho tới CI/CD, debug, test và profiling. Bộ profiling của Flutter cũng cực kì hay dùng để đo đạc các chỉ số về performance khá chi tiết. ![](https://images.viblo.asia/93c97d13-961e-4ad5-a0f2-40dca87e815c.jpg)

Trên trang github của Flutter cũng đạt hơn 37k star điều đó có thể thấy Flutter đang được cộng đồng quan tâm tới.

Flutter có 1 bộ thư viện các widget vô cùng phong phú, nếu bạn biết kết hợp các widget hiệu quả thì công việc code app của bạn vô cùng đơn giản.

Sau một khoảng thời gian làm việc với Flutter thì thực sự mình không còn thích thú với native thuần nữa.
## Tăng tốc độ code Flutter với VSCode
### Quick Fix
Hãy sử dụng tổ hợp phím tắt ( Command . ) với macOS hoặc ( ctr . ) với window để fix nhanh 1 vấn đề
![](https://images.viblo.asia/1e9099c2-006e-40f2-a9f3-8e669c88a121.png)

Việc báo thiếu import thư viện khi bạn sử dụng một widget mới là việc thường xuyên xảy ra, khi đó hãy sử dụng tổ hợp phím trên để nhanh chóng import thư viện thiếu.
### Shotcut refactor code
Việc wrap 1 widget thường xuyên phải làm trong Flutter, để nhanh chóng cho việc này thay vì phải ấn chuột phải chọn Refactor thì hãy dùng tổ hợp phím (control + shift + R )![](https://images.viblo.asia/eeba8964-60f3-4226-b341-ed42e61ead40.png)

Đôi khi mình cũng dùng tổ hợp phím này cho việc Extract widget thành các widget nhỏ hơn tiện cho việc reuse code và làm code dễ đọc hơn.

### Awesome Flutter Snippets
 Đây là extension mình khuyên các bạn nên install. Nó giúp tăng tốc độ code đáng kể khi bạn chỉ cần gõ shotcut là có thể gọi ra 1 widget với đầy đủ property requied
 ![](https://images.viblo.asia/38fd50f0-68ee-41a0-84e7-93e720b7ea81.png)
### Todo Tree
Đây là extension giúp bạn đánh dấu những việc bạn cần làm trong tương lai trong code của mình, đôi khi nó cũng để đánh dấu những điểm quan trọng mà khi bạn đọc lại code sẽ không mất nhiều thời gian tìm kiếm
![](https://images.viblo.asia/fe455313-130c-4920-96e1-74802ce177ef.png)
## Tổng kết
Trên đây là toàn bộ cảm nhận của mình sau một khoảng thời gian không quá dài tiếp xúc với Flutter. Vì là cảm nhận của mình nên còn nhiều thứ lan man mong các bạn thông cảm. Về cơ bản thì mình thấy Flutter tuy là một framework mới nhưng nó có nhiều ưu điểm so với các framework khác trong việc lập trình app mobile. Mình tin rằng trong thời gian tới thì Flutter sẽ trở thành framework đựoc nhiều người lựa chọn trong việc lập trình ứng dụng. 

Cảm ơn các bạn đã theo dõi bài viết của mình, hy vọng bài viết này mang lại những kiến thức thú vị cho bạn. Hẹn gặp lại các bạn trong bài viết lần sau.