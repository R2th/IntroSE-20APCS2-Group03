# 1.	Application access
### 1.1. Khái niệm
**Application access** (hay ***Bảo mật ứng dụng***) là quá trình phát triển, thêm và kiểm tra các tính năng bảo mật trong các ứng dụng để ngăn ngừa các lỗ hổng bảo mật chống lại các mối đe dọa như truy cập và sửa đổi trái phép.
### 1.2. Cách kiểm tra
Khi kiểm tra điểm này của các tùy chọn bảo mật, tất cả các Vai trò cần được kiểm tra. Người kiểm tra nên tạo các tài khoản với tất cả các Vai trò có thể. Sau đó, anh ta cần sử dụng tất cả các tài khoản này để đảm bảo rằng mọi vai trò chỉ có quyền truy cập vào các biểu mẫu, menu và màn hình riêng của nó. Nếu bất kỳ xung đột truy cập nào được tìm thấy, vấn đề này cần được ghi lại với bảo mật hoàn toàn.
### 1.3.  Ví dụ
Nhân viên tiếp tân trong bệnh viện hầu như không quan tâm đến các xét nghiệm y tế trong phòng thí nghiệm vì công việc của anh ta là đăng ký các cuộc hẹn với bệnh nhân. Đó là lý do tại sao anh ta không có quyền truy cập vào các menu, biểu mẫu và thông tin khác liên quan đến các xét nghiệm trong phòng thí nghiệm vì Vai trò của anh ta trong Hệ thống quản lý bệnh viện là Lễ tân tiếp tân.

# 2. Data protection
### 2.1. Khái niệm
**Data protection** (hay ***Bảo vệ dữ liệu***) là quá trình bảo vệ thông tin quan trọng khỏi tham nhũng, thỏa hiệp hoặc mất mát.

Có ba khía cạnh chính trong bảo mật dữ liệu:

•	***Đầu tiên là*** : người dùng cụ thể chỉ nên xem hoặc sử dụng dữ liệu mà anh ta có nghĩa vụ phải xem và sử dụng. Tùy chọn này cũng được cung cấp bởi vai trò và quyền

•	***Khía cạnh thứ hai*** là về cách dữ liệu được lưu trữ trong cơ sở dữ liệu. Bạn nên hiểu rằng tất cả các dữ liệu nhạy cảm phải được mã hóa để đảm bảo an toàn. Đặc biệt mã hóa phải rất mạnh đối với một dữ liệu quan trọng và nhạy cảm như mật khẩu cho tài khoản người dùng, số thẻ tín dụng và thông tin kinh doanh khác.

•	***Khía cạnh thứ ba*** thực sự là một phần mở rộng của cái thứ hai. Nó có liên quan đến các luồng thông tin. Khi luồng dữ liệu nhạy cảm được mô tả ở trên xảy ra trong ứng dụng, mức độ bảo mật thích hợp phải được cung cấp. Sẽ không có vấn đề gì nếu luồng thông tin nằm giữa các mô-đun khác nhau của ứng dụng giữa các ứng dụng khác nhau, dữ liệu phải được mã hóa an toàn để bảo vệ nó.
### 2.2. Cách kiểm tra
Đầu tiên, người kiểm tra nên truy vấn DB về mật khẩu đến tài khoản người dùng, thông tin thanh toán của khách hàng và dữ liệu nhạy cảm khác. Sau đó, anh ta nên xác minh rằng tất cả dữ liệu này được mã hóa kỹ lưỡng đang được lưu trữ trong cơ sở dữ liệu. Mã hóa dữ liệu phù hợp cũng cần được kiểm tra khi truyền nó giữa các dạng và màn hình khác nhau. Sau đó, người kiểm tra nên xác minh xem dữ liệu có được giải mã thành công hay không sau khi đến đích. Thông tin nhạy cảm như mật khẩu tài khoản không nên được hiển thị trong biểu mẫu gửi ở bất kỳ định dạng dễ hiểu nào
### 2.3. Ví dụ
Người quản lý telesales của công ty chỉ có thể xem dữ liệu về cổ phiếu có sẵn, nhưng anh ta không có quyền truy cập vào thông tin về số lượng nguyên liệu thô được mua để sản xuất.

# 3. Brute-force attack
### 3.1. Khái niệm
Một **Brute Force Attack** (hay ***Tấn công vũ phu***) là phương pháp đơn giản nhất để đạt được quyền truy cập vào một trang web hoặc máy chủ (hoặc bất cứ điều gì đó là mật khẩu bảo vệ). Nó cố gắng kết hợp nhiều tên người dùng và mật khẩu nhiều lần cho đến khi vào được. Hành động lặp đi lặp lại này giống như một đội quân tấn công pháo đài
### 3.2. Cách kiểm tra
Điều đầu tiên cần làm là xác minh xem cơ chế đình chỉ tài khoản có hợp lệ và hoạt động tốt không. Rất đơn giản để kiểm tra: người kiểm tra phải cố gắng đăng nhập tài khoản bằng ID người dùng hoặc mật khẩu không hợp lệ để đảm bảo ứng dụng chặn thành công tài khoản đang cố đăng nhập với dữ liệu đăng ký không hợp lệ. Nếu vậy, ứng dụng này an toàn về bất kỳ loại tấn công vũ phu nào. Trong trường hợp khác, có một lỗ hổng bảo mật phải được báo cáo.
### 3.3. Ví dụ
Ví dụ phổ biến nhất về kỹ thuật bảo mật chống lại loại tấn công này là chặn tài khoản trong một khoảng thời gian. Điều này được sử dụng bởi các dịch vụ gửi thư như Email hoặc số điện thoại. Người dùng có một số lần thử liên tiếp (chủ yếu là 3 lần) để đăng nhập tài khoản. Nếu những lần thử này thất bại, hệ thống sẽ chặn tài khoản trong một thời gian (thời gian chặn thay đổi từ 30 phút đến 24 giờ).

# 4. SQL Injection and Cross Site Scripting (XSS)
### 4.1. Khái niệm
Đây là tên của hai lần hack tương tự nhau, vì vậy chúng tôi sẽ thảo luận về chúng cùng nhau:

•	**SQL Injection** là một kỹ thuật tiêm mã , được sử dụng để tấn công các ứng dụng dựa trên dữ liệu, trong đó các câu lệnh SQL độc hại được chèn vào trường nhập để thực thi

•	**Cross Site Scripting (XSS)** cho phép kẻ tấn công đưa các tập lệnh phía máy khách vào các trang web được xem bởi người dùng khác. Một lỗ hổng kịch bản chéo trang có thể được sử dụng bởi những kẻ tấn công để bỏ qua các kiểm soát truy cập, chẳng hạn như chính sách cùng nguồn gốc.
### 4.2. Cách kiểm tra
Các tập lệnh độc hại thường được tin tặc sử dụng để thao túng trang web. Đó là lý do tại sao nếu bạn muốn trang web của mình được an toàn, bạn cần một số cách để chống lại các vấn đề như vậy.
Điều đầu tiên cần làm là đảm bảo rằng tất cả độ dài của tất cả các trường đều bị giới hạn và được thực hiện. Ngoài ra, người kiểm tra phải chắc chắn rằng độ dài đã xác định sẽ tắt bất kỳ đầu vào tập lệnh hoặc thẻ nào. Mỗi khía cạnh này đều dễ kiểm tra, ví dụ: nếu độ dài của trường được xác định là 20 và dữ liệu đầu vào của bạn là (<>> ghjgjghjgjhlkjejfmgmdngjrgk, thì bạn có thể xác minh cả hai vấn đề. Điều cuối cùng cần kiểm tra là ứng dụng không hỗ trợ truy cập ẩn danh
### 4.3. Ví dụ
Chúng ta nên giới hạn trường Tên cuối cùng Tên ký tự bằng 30 ký hiệu, nhưng không giới hạn 255. Về mặt khách quan, có một số trường cần nhập thông tin lớn. Đối với các loại trường như vậy, dữ liệu cần được kiểm tra và xác nhận trước khi nó được lưu trong ứng dụng. Ngoài ra, trong các trường như vậy, không được phép sử dụng thẻ HTML hoặc tập lệnh.

**Tài liệu tham khảo**

https://www.vmware.com/topics/glossary/content/application-security?fbclid=IwAR0Ml5xhuiQwx5wx8sDQTavRPUZt5KEEgxnj0ErHymQlYaKV7Upf37PQqBU

https://searchdatabackup.techtarget.com/definition/data-protection?fbclid=IwAR3LrmxqZwBFkXpjrys2RETD37Eopcef6jLPYibQwjeMOayERqqsascOXDA

https://www.varonis.com/blog/brute-force-attack/

https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)