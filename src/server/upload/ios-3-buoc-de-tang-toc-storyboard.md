# Giới thiệu
Khi làm việc  Storyboard với rất nhiều ViewController, đặc biệt là với IBDesignable UI, bạn sẽ mất rất nhiều thời gian khi mở Storyboard và bạn sẽ thấy tiếng quạt của thiết bị của bạn chạy vù vù 🚀 😂. 

![](https://images.viblo.asia/f5952b09-6bee-45fc-b303-a382b5768ea7.png)

Và dưới đây là 3 bước bạn có thể thực hiện để tăng tốc Storyboard.

# 1. Hủy bỏ việc sử dụng IBDesignable View nếu có thể
***IBDesignable*** là tuyệt vời để hiển thị các thuộc tính chế độ xem tùy chỉnh như *cornerRadius*, *shadow* trên *Storyboard* mà không phải xây dựng và chạy ứng dụng. Tuy nhiên, Xcode dường như sử dụng rất nhiều tài nguyên để hiển thị *IBDesignable* và đôi khi nó sẽ tự động xây dựng khi bạn chỉ cố mở Storyboard.

Nếu có thể, hãy thử xóa chế độ xem *IBDesignable* trên  và thay vào đó khởi tạo nó trong mã của bạn.

# 2. Bỏ chọn "Automatically Refresh views"
Bước tiếp theo, nếu không thể xóa *IBDesignable View* và bạn thấy rằng Xcode sẽ tự động build sau mỗi lần nhấn phím, bạn có thể thử bỏ chọn "Automatically Refresh views".

Mở *Storyboard* của bạn (đảm bảo rằng nó nằm trong tab hoạt động), sau đó bỏ chọn *Editor > Automatically Refresh Views.*.

![](https://images.viblo.asia/e950d2cd-e701-4155-9c24-bc208752eef6.png)

Điều này sẽ ngăn Xcode tự động build Storyboard mỗi khi bạn có thay đổi.

Bạn có thể kích hoạt nó trở lại khi cần thiết khi bạn hoàn thành code của mình, để xem bản xem trước trực quan được cập nhật.

Ngoài ra, bạn có thể tắt nó và nhấp vào "Refresh All Views" trong menu Editor, để làm mới *view* theo cách thủ công.

![](https://images.viblo.asia/573bbd44-72cc-4ecd-b552-5f48167f1300.png)

# 3. Sử dụng nhiều File Storyboard
Nếu bạn cho tất cả các *ViewController* vào một, cuối cùng nó sẽ bị chậm. Tôi đề nghị một *Storyboard* nên có ít hơn 15 *ViewController*.

Bạn có thể chọn một vài ViewController có liên quan, thường bên trong cùng một *NavigationController*, sau đó chọn  *Editor > Refactor to Storyboard .*

![](https://images.viblo.asia/003f99aa-04f1-4e72-a555-98779e5f1d48.png)

Xcode sau đó sẽ tạo một file *Storyboard* mới cho bạn và cũng là một tham chiếu Storyboard từ các *ViewController* trước đó. Tham chiếu Storyboard sẽ cho các *Viewcontroller* trước tiếp tục phân biệt trong *Storyboard* mới được tạo.

![](https://images.viblo.asia/49a2e15a-888d-432e-ab80-d454a284c90f.gif)

Usually I will refactor view controllers inside the same navigation controller or tab bar controller into a new storyboard, and name the storyboard based on the tab name or the flow name of the navigation controller (eg: user registration ).

Thông thường tôi sẽ cấu trúc lại các *ViewController*  bên trong cùng *NavigationViewController* hoặc *TabbarViewController* vào Storyboard mới và đặt tên cho Storyboard dựa trên tên Tab hoặc tên luồng của Navigation ViewController (ví dụ: đăng ký người dùng).

Với nhiều Storyboard, các developer khác nhau trong nhóm có thể làm việc trên các Storyboard khác nhau và conflict khi hợp nhất các nhánh tính năng khác nhau. Storyboard bản chất là một file XML, nên việc giữ cho các file XML nhỏ để việc loading hiển thị sẽ nhanh hơn.

# Kết luận
Là một iOS developer, bạn sẽ phải làm việc rất nhiều với Storyboard, vì vậy hãy chọn các phương án để cho việc làm việc với nó trở nên hiệu quả hơn. 
Hi vọng bài viết sẽ hữu ích với các bạn, cám ơn đã đọc bài viết :v: 

Tham khảo:
https://fluffy.es/3-steps-to-speed-up-storyboard/?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=email&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B458