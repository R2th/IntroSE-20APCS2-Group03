-----
## Tóm lược

**Kết thúc phiên** là một phần quan trọng của vòng đời phiên. Giảm đến mức tối thiểu thời gian tồn tại của mã thông báo phiên giúp làm giảm khả năng xảy ra một cuộc tấn công chiếm quyền điều khiển phiên thành công. Đây có thể được coi là biện pháp kiểm soát ngăn chặn các cuộc tấn công khác như Cross Site Scripting và Cross Site Request Forgery - các cuộc tấn công dựa vào việc người dùng có một phiên được xác thực.
![](https://images.viblo.asia/6ec7877d-1b9f-4543-be49-9d38ccb48b70.jpg)

Để kết thúc phiên an toàn yêu cầu ít nhất các thành phần sau:
* Tính sẵn có của các điều khiển giao diện người dùng cho phép người dùng đăng xuất theo cách thủ công.
* Kết thúc phiên sau một khoảng thời gian nhất định mà không có hoạt động (thời gian chờ của phiên - session timeout).
* Làm mất hiệu lực thích hợp của trạng thái phiên phía máy chủ

Ta có thể ngăn chặn việc chấm dứt phiên hiệu quả. Đối với ứng dụng web an toàn lý tưởng, người dùng có thể kết thúc bất kỳ lúc nào thông qua giao diện người dùng. Mỗi trang phải có nút đăng xuất ở nơi có thể nhìn thấy trực tiếp. Các chức năng đăng xuất không rõ ràng có thể khiến người dùng không tin tưởng vào chức năng đó. 

Một lỗi phổ biến khác khi kết thúc phiên là mã thông báo phiên phía máy khách được đặt thành giá trị mới trong khi trạng thái phía máy chủ vẫn hoạt động và có thể được sử dụng lại bằng cách đặt cookie phiên trở lại giá trị trước đó. Đôi khi chỉ một thông báo xác nhận được hiển thị cho người dùng mà không cần thực hiện thêm bất kỳ hành động nào. Điều này nên tránh. 

Một số frameworks ứng dụng web chỉ dựa vào cookie phiên để xác định người dùng đã đăng nhập. ID của người dùng được nhúng trong giá trị cookie (được mã hóa). Máy chủ ứng dụng không thực hiện bất kỳ theo dõi nào ở phía máy chủ của phiên. Khi đăng xuất, cookie phiên sẽ bị xóa khỏi trình duyệt. Tuy nhiên, vì ứng dụng không thực hiện bất kỳ theo dõi nào, nên nó không biết liệu một phiên đã đăng xuất hay chưa. Vì vậy, bằng cách sử dụng lại cookie phiên, bạn có thể có quyền truy cập vào phiên đã xác thực. Một ví dụ nổi tiếng về điều này là chức năng Xác thực Mẫu trong ASP.NET (Forms Authentication functionality in ASP.NET). 

Người dùng trình duyệt web thường không bận tâm rằng một ứng dụng vẫn đang mở và chỉ cần đóng trình duyệt hoặc một tab. Một ứng dụng web nên nhận biết về hành vi này và tự động kết thúc phiên ở phía máy chủ sau một khoảng thời gian xác định.

Việc sử dụng hệ thống đăng nhập một lần (SSO) thay vì lược đồ xác thực dành riêng cho ứng dụng thường gây ra sự tồn tại cùng lúc của nhiều phiên và các phiên này phải được kết thúc riêng biệt. 

Ví dụ: Việc chấm dứt phiên dành riêng cho ứng dụng không chấm dứt phiên trong hệ thống SSO. 
Điều hướng trở lại cổng SSO cung cấp cho người dùng khả năng đăng nhập lại vào ứng dụng mà việc đăng xuất đã được thực hiện ngay trước đó. 

Mặt khác, chức năng đăng xuất trong hệ thống SSO không nhất thiết gây ra kết thúc phiên trong các ứng dụng được kết nối.
## Mục tiêu kiểm thử
•	Đánh giá giao diện người dùng đăng xuất.

•	Phân tích thời gian chờ của phiên và liệu phiên có bị ngắt đúng cách sau khi đăng xuất hay không.
## Làm thế nào để kiểm thử?
### Kiểm thử giao diện người dùng đăng xuất - Log Out User Interface 
Xác minh sự xuất hiện và khả năng hiển thị của chức năng đăng xuất trong giao diện người dùng. Với mục đích này, hãy xem từng trang từ góc độ của người dùng có ý định đăng xuất khỏi ứng dụng web.
> Có một số thuộc tính cho thấy giao diện người dùng đăng xuất tốt:
> * Nút đăng xuất có trên tất cả các trang của ứng dụng web.
> * Nút đăng xuất phải được xác định nhanh chóng bởi người dùng muốn đăng xuất khỏi ứng dụng web.
> * Sau khi tải một trang, nút đăng xuất sẽ hiển thị mà không cần cuộn.
> * Lý tưởng nhất là nút đăng xuất được đặt trong một khu vực của trang được cố định trong cổng xem của trình duyệt và không bị ảnh hưởng bởi việc cuộn nội dung.
### Kiểm thử kết thúc phiên phía máy chủ - Server-Side Session Termination
Đầu tiên, lưu trữ các giá trị của cookie được sử dụng để xác định một phiên. Gọi chức năng đăng xuất và quan sát hành vi của ứng dụng, đặc biệt là liên quan đến cookie phiên. Cố gắng điều hướng đến một trang chỉ hiển thị trong phiên đã xác thực.

Ví dụ: Bằng cách sử dụng nút quay lại của trình duyệt. Nếu phiên bản đã lưu trong bộ nhớ cache của trang được hiển thị, hãy sử dụng nút tải lại để làm mới trang từ máy chủ. 

Nếu chức năng đăng xuất khiến cookie phiên được đặt thành giá trị mới, hãy khôi phục giá trị cũ của cookie phiên và tải lại một trang từ trang được xác thực của ứng dụng. 

Nếu kiểm thử không hiển thị bất kỳ lỗ hổng nào trên một trang cụ thể, hãy thử ít nhất một số trang khác của ứng dụng được coi là quan trọng về bảo mật, để đảm bảo rằng việc kết thúc phiên được các trang của ứng dụng nhận ra đúng cách.

> Không để dữ liệu chỉ được hiển thị bởi những người dùng đã xác thực nhưng lại được hiển thị trên các trang được kiểm thử trong khi thực hiện các bài kiểm thử. Lý tưởng nhất là ứng dụng chuyển hướng đến một trang công cộng hoặc một biểu mẫu đăng nhập trong khi truy cập các trang được xác thực sau khi kết thúc phiên. Điều này không cần thiết cho bảo mật của ứng dụng, nhưng việc đặt cookie phiên thành các giá trị mới sau khi đăng xuất thường được coi là phương pháp hay.
### Kiểm thử thời gian chờ của phiên - Session Timeout 
Cố gắng xác định thời gian chờ của phiên bằng cách thực hiện các yêu cầu đối với một trang trong khu vực được xác thực của ứng dụng web với độ trễ ngày càng tăng. Nếu hành vi đăng xuất xuất hiện, độ trễ đã sử dụng khớp với giá trị thời gian chờ của phiên.

> Các kết quả tương tự như đối với thử nghiệm chấm dứt phiên phía máy chủ được mô tả trước đây được ngoại trừ trường hợp đăng xuất do hết thời gian chờ không hoạt động.
> 
> Giá trị thích hợp cho thời gian chờ của phiên phụ thuộc vào mục đích của ứng dụng và phải là sự cân bằng giữa bảo mật và khả năng sử dụng. 
> 
> Ví dụ 1: Trong các ứng dụng ngân hàng, không có ý nghĩa gì nếu giữ một phiên không hoạt động quá 15 phút. 
> 
>  Ví dụ 2: Thời gian chờ ngắn trong wiki hoặc diễn đàn có thể làm phiền người dùng đang gõ các bài báo dài dòng với các yêu cầu đăng nhập không cần thiết. 
### Kiểm thử kết thúc phiên trong môi trường đăng nhập một lần (Single Sign-Off)
Thực hiện đăng xuất trong ứng dụng đã kiểm thử. Xác minh xem có cổng trung tâm hoặc thư mục ứng dụng cho phép người dùng đăng nhập lại vào ứng dụng mà không cần xác thực hay không. 

Kiểm thử xem ứng dụng có yêu cầu người dùng xác thực hay không nếu URL của một điểm vào ứng dụng được yêu cầu. 

Trong khi đăng nhập vào ứng dụng được kiểm thử, hãy thực hiện đăng xuất trong hệ thống SSO. Sau đó, hãy cố gắng truy cập vào một trang đã được xác thực của ứng dụng kiểm thử.
> Điều mong đợi là việc gọi một chức năng đăng xuất trong một ứng dụng web được kết nối với hệ thống SSO hoặc trong chính hệ thống SSO sẽ gây ra sự kết thúc của tất cả các phiên. Cần xác thực người dùng để có quyền truy cập vào ứng dụng sau khi đăng xuất trong hệ thống SSO và ứng dụng được kết nối.
-----
Tools: Burp Suite - Repeater

Nguồn: 
Cuốn *Web Security Testing Guide v4.2*  - Elie Saad, Rick Mitchell - owasp.ord