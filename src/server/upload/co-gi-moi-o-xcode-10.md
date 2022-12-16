Phiên bản Mac OS 10.14 Mojave chuẩn bị được public cho người dùng kèm theo đó là phiên bản Xcode 10 với đầy những tính năng mới đầy hữu ích. Vậy chúng ta hãy cùng tìm hiểu Xcode trang bị thêm cho developer những gì nhé.

## 1.	Dark mode

Thứ dễ dàng nhận thấy nhất chính là giao diện của Xcode.

![](https://images.viblo.asia/de0fa6a5-c93f-4b49-9e83-3e05160a429a.png)

Cả giao diện của Mac OS 10.14 cũng như Xcode sẽ trông cực “cool ngầu” như thế này. Trông rất chuyên nghiệp phải không? Các Interface Builder cũng được hỗ trợ để có thể chuyển từ sáng sang tối. Tuy nhiên nếu không thích, bạn có thể tùy chỉnh lại giao diện một cách dễ dàng mà không cần động đến cài đặt của hệ thống.

## 2.	Trải nghiệm người dùng tăng khi code

Xcode sẽ cung cấp cho chúng ta tính năng chỉnh sửa source code nhanh, scroll cực kì mượt, ngay cả khi chỉnh sửa source code khổng lồ. Hoạt ảnh dễ nhìn, làm nổi bật lỗi và cung cấp tính năng sửa lỗi. Với sự hỗ trợ tuyệt vời của Markdown, tài liệu đi kèm của bạn cũng sẽ rất tuyệt vời.

Sử dụng Command-click để chọn biểu tượng hoặc toàn bộ cấu trúc để biến đổi hoặc cấu trúc lại code Swift, C, C ++ và Objective-C. Vì Swift là ngôn ngữ mã nguồn mở nên danh sách các phép biến đổi tiếp tục mở rộng nhờ vào sự đóng góp của cộng đồng developer.

Các thay đổi trong code của bạn được đánh dấu bên cạnh mỗi dòng, cho dù những thay đổi đó được thực hiện trên local hay commit trên remote của người trong team dự án. Ngay khi bạn nhập một dòng code mới, bạn sẽ được thông báo nếu bạn đã tạo conflict và bạn có thể nhanh chóng nhấp vào dấu báo màu đỏ để biết thêm thông tin về những thay đổi này.
![](https://images.viblo.asia/838aa608-901a-4aa8-9f09-300e1a5da712.png)

## 3.	Làm việc nhóm trên Xcode
Source control là nơi toàn bộ team của bạn cùng nhau làm việc và quản lí source code. Xcode sẽ hỗ trợ làm việc trực tiếp với nhiều nền tảng, bao gồm:

* GitHub và GitHub Enterprise
* Bitbucket Cloud và Bitbucket Server
* GitLab

Mọi việc sẽ trở nên dễ dàng hơn khi làm việc cùng team trên cloud hoặc trên các server lưu trữ. Để làm cho luồng công việc của bạn an toàn hơn, Xcode thậm chí còn tạo khóa SSH duy nhất cho bạn và tải nó lên server.

Sau khi đăng nhập vào server quản lý source code của bạn, Xcode sẽ hiển thị tất cả các repository cá nhân đã được lưu trữ của bạn. Từ cửa sổ này, bạn cũng có thể tìm kiếm các repository khác trên các server của mình và nhanh chóng kiểm tra chỉ bằng một cú nhấp chuột. Bạn thậm chí có thể rebase thay đổi của bạn khi pull phiên bản mới nhất về.

Trình điều hướng source control trong Xcode giúp bạn dễ dàng xem từng nhánh, tag và điều khiển từ xa bằng dòng thời gian commit. Bạn có thể kiểm tra một entry để xem tất cả các tệp bị ảnh hưởng hoặc nhấp đúp vào commit để xem những thay đổi. Các hành động phổ biến như tạo và merge các nhánh cũng có thể thực hiện nhanh chóng trong trình điều hướng.

## 4.	Testing
Xcode tích hợp sẵn một công cụ kiểm thử mạnh mẽ. Chạy kiểm thử đơn vị (unit test), cũng như kiểm tra giao diện người dùng và hiệu suất, trên nhiều thiết bị tại một thời điểm. Hoặc tận dụng sức mạnh xử lý của Mac để tăng tốc đáng kể thử nghiệm bằng cách sử dụng các thiết bị mô phỏng chạy song song.

Đối với việc cài đặt tích hợp liên tục, bạn có thể chạy nhiều loại thiết bị mô phỏng khác nhau để kiểm thử một cách hoàn chỉnh. Hoặc, để hoàn thành các ca kiểm thử nhanh nhất có thể, Xcode có thể sinh ra nhiều bản sao của một thiết bị mô phỏng duy nhất, chạy qua tất cả các test case của bạn để hoàn thành trong một thời gian ngắn. Bạn cũng có thể dùng một máy Mac khác trong mạng của bạn để lưu trữ Xcode Server cho việc xây dựng và thử nghiệm tự động.

## 5.	Swift 4.2
Xcode 10 bao gồm Swift 4.2, giúp biên dịch phần mềm của bạn nhanh hơn. So với Swift 4.0, trình biên dịch Swift này có thể build các ứng dụng lớn nhanh hơn gấp đôi. Với hệ thống mới này, việc chỉnh sửa, xây dựng và thử nghiệm hàng ngày của bạn sẽ nhanh hơn nhiều. Vì được tối ưu hóa cho phần cứng Mac đa lõi mới nhất, Xcode và Swift sẽ trở thành một trong những nền tảng phát triển ứng dụng nhanh nhất.

## 6.	Train model trong Playground
Playground sẽ trở nên nhạy hơn và thú vị hơn khi sử dụng. Nếu bạn thêm code mới, chỉ các dòng mới được biên dịch lại. Bạn có thể chọn chạy lại các dòng code cụ thể hoặc nhấn shift-return để chạy chương trình ngay đến dòng code bạn vừa nhập.

Mô hình mới này hoàn toàn phù hợp để làm việc với Framework Create ML mới. Train model của bạn trực tiếp trong Playground, cùng với code sẽ sử dụng model trong ứng dụng của bạn. Khi đã hoàn thành, chỉ cần kéo và thả model vào ứng dụng của bạn.
![](https://images.viblo.asia/917f00f6-cc3d-47ab-9e83-00be1a14190e.png)

Chỉ còn một thời gian ngắn nữa Xcode 10 sẽ chính thức đến tận tay các developer. Hãy cùng trông đợi những sự mới mẻ và hữu ích này nhé!

Bài viết có tham khảo nội dung từ nguồn: https://developer.apple.com/xcode/