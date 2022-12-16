![](https://images.viblo.asia/e20ad8fc-c23a-45dd-a0e2-09c7b3b01b77.jpg)
Trong thời đại công nghệ 4.0, database chiếm vị trí quan trọng và trở thành một phần không thể thiếu trong hầu hết các hoạt động đời sống hàng ngày, là trái tim, là tài sản của người dùng, của doanh nghiệp chính vì vậy việc đảm bảo an toàn cho cơ sở dữ liệu là việc làm rất quan trọng, chúng ta cùng tìm hiểu các hiểm họa về vấn đề mất an toàn cơ sở dữ liệu để từ đó có những biện pháp phòng tránh.

# 1. Excesive privileges ( đặc quyền quá lớn )
### Mô tả
Nếu người dùng được gán các đặc quyền vượt quá yêu cầu trong chức năng công việc của họ, những đặc quyền này có thể bị lạm dụng bởi cá nhân hoặc kẻ tấn công xâm phạm tài khoản của họ cho các mục đích xấu. hoặc một người đã nghỉ việc nhưng vẫn còn tài khoản có quyền sử dụng csdl.<br>
Ví dụ : một nhân viên ngân hàng với công việc là chỉ được thay đổi thông tin liên lạc của những người nắm giữ tài khoản. Tuy nhiên, người này có thể lạm dụng quyền vượt mức của mình để tăng số dư tài khoản tiết kiệm của một đồng nghiệp.
### Biện pháp phòng tránh
* Phân quyền chính sách cho từng tài khoản
* Khi 1 người thay đổi vai trò phải cập nhật lại các quyền phù hợp với vai trò đó
* Xóa quyền khi tài khoản không còn sử dụng hoặc không có quyền đó nữa
# 2. Privilege abuse ( Lạm dụng quyền )
### Mô tả
Người dùng lạm dụng các đặc quyền hợp pháp của mình để thực hiện những mục đích không hợp pháp.<br>
ví dụ : 1 nhân viên quản lý thông tin khách hàng nhưng lại bán thông tin của khách hàng cho 1 tổ chức khác
### Biện pháp phòng tránh
* Người dùng truy cập dữ liệu nên được giới hạn mức độ truy cập dữ liệu. Trong ví dụ trên có thể giới hạn số lượng truy cập tối đa trong một ngày đến mức hợp lý, hạn chế vị trí truy cập, các hạn chế về thời gian trong ngày sẽ giảm thiểu rủi do.

* Ứng dụng và cơ sở dữ liệu không hiển thị các giao diện cho phép truy vấn tùy ý và xuất dữ liệu hàng loạt.
* Ghi lại lịch sử truy vấn dữ liệu, kiểm tra thường xuyên và giới hạn càng ít người sử dụng dữ liệu càng tốt
* Áp dụng chính sách đảm bảo an toàn nhân lực
# 3. Unauthorized privilege elevator ( nâng quyền bất hợp pháp )
### Mô tả
Kẻ tấn công có thể dựa trên các điểm yếu trong phần mềm cơ sở dữ liệu để biến các đặc quyền truy nhập của một người dùng bình thường thành quyền truy nhập của một người quản trị. Những điểm yếu này có thể tìm thấy trong các thủ tục được lưu, trong các hàm được xây dựng bên trong, trong việc thực thi giao thức, thậm chí trong các câu lệnh SQL.
### Biện pháp phòng tránh
Hiểm họa này có thể bị ngăn chặn bằng việc kết hợp các hệ thống ngăn chặn xâm nhập (IPS) và kiểm soát truy nhập mức truy vấn. IPS sẽ kiểm tra lưu lượng cơ sở dữ liệu để nhận ra các mẫu phù hợp với những điểm yếu đã biết. Chẳng hạn, với một hàm có điểm yếu đã biết, thì một IPS có thể chặn tất cả các truy nhập tới hàm đó, hoặc (nếu có thể) chỉ chặn những truy nhập (của các tấn công) tới hàm này.
# 4. SQL injection
### Mô tả
SQL injection là một kỹ thuật cho phép những kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web và các thông báo lỗi của hệ quản trị cơ sở dữ liệu trả về để inject (tiêm vào) và thi hành các câu lệnh SQL bất hợp pháp. SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác, delete, insert, update, v.v. trên cơ sở dữ liệu của ứng dụng, thậm chí là server mà ứng dụng đó đang chạy.
### Biện pháp phòng tránh
* Tránh sử dụng các truy vấn động trong, sử dụng các câu lệnh được viết sẵn và truyền vào các tham số truy vấn SQL
* Kiểm tra dữ liều đầu vào, sử lý những ký tự đặc biệt trước khi thực hiện câu lệnh truy vấn
* Cơ sở dữ liệu NoSQL cũng có thể bị tấn công, nên việc kiểm tra dữ liệu đầu vào là rất quan trọng
# 5. Weak Authentication (Xác thực yếu)
### Mô tả
Ứng dụng có cơ chế xác thực yếu, hacker dễ dàng quét mật khẩu của các tài khoản quản lý csdl
### Biện pháp phòng tránh
* Thực hiện các biện pháp kiểm soát đăng nhập như khóa tài khoản sau một số lần thử không hợp lệ. Sử dụng danh sách đen mật khẩu để ngăn người dùng chọn mật khẩu phổ biến như 123456.
* Bắt buộc  sử dụng mật khẩu mạnh.
* Yêu cầu người dùng thay đổi mật khẩu định kỳ, cân nhắc sử dụng xác thực đa nhân tố
*  Lưu mật khẩu dưới dạng băm
# 6. Weak auditing (Kiểm toán yếu)
### Mô tả 
Đối với bất kỳ hoạt động nào liên quan đến CSDL, cần phải ghi lại một cách tự động tất cả các giao dịch CSDL nhạy cảm và/hoặc các giao dịch bất thường.<br>
Các cơ chế kiểm toán là tuyến hàng rào bảo vệ CSDL cuối cùng. Nếu kẻ tấn công có thể phá vỡ các hàng rào khác thì cơ chế kiểm toán dữ liệu vẫn có thể xác định sự tồn tại của một xâm nhập sau những hành động của kẻ tấn công trước đó. Những vết kiểm toán thu được tiếp tục có thể dùng để xác định người dùng nào vừa thực hiện các hành động này, đồng thời qua vết kiểm toán có thể phục hồi lại hệ thống.<br>
Cơ chế kiểm toán yếu đồng nghĩa với việc hệ thống không thể ghi lại đầy đủ những hành động của người dùng, dẫn đến việc không thể phát hiện và ngăn chặn kịp thời những hành động tấn công của người dùng hoặc một nhóm người dùng.
### Biện pháp phòng tránh
* Xây dựng hệ thông kiểm toán, ghi lại nhật ký người dùng  ở mức chi tiết và độc lập với tất cả người dùng.
* Xây dựng các quy tắc cảnh báo tự động về các trường hợp sử dụng sai trái
# 7. Denial of service (Tấn công từ chối dịch vụ)
### Mô tả
Các cuộc tấn công dựa trên việc sử dụng tài nguyên, chẳng hạn như liên tục gửi các truy vấn phức tạp đến tài nguyên máy chủ.
### Biện pháp phòng tránh
* Nhận biết và giới hạn các request gửi đến tiên tục từ 1 IP
* Có thể mở rộng server
# 8. Exposure of backup data (lộ dữ liệu dự phòng)
### Mô tả
Các hệt thống đều backup dữ liệu để phòng trường hợp xấu, nhưng việc quản lý dữ liệu lỏng lẻo khiến cho việc hacker dễ dàng tấn công lấy dữ liệu đó.
### Biện pháp phòng tránh
* Lưu dữ liệu dự phòng tại những nơi an toàn, hạn chế người có khả năng sử dụng csdl dự phòng
* Tất cả các bản sao cơ sở dữ liệu cần thiết phải được mã hóa.
# 9.  Insecure system architecture (kiến trúc hệ thống không an toàn)
### Mô tả
Các điểm yếu trong hệ điều hành bên dưới (Windows 2000, UNIX, …) và các điểm yếu trong các dịch vụ được cài đặt trên một máy chủ cơ sở dữ liệu có thể dẫn tới truy nhập bất hợp pháp, sự sửa đổi dữ liệu hay từ chối dịch vụ. Chẳng hạn, sâu Blaster lợi dụng một điểm yếu của Windows 2000 để tạo ra các điều kiện cho tấn công từ chối dịch vụ.
### Biện pháp phòng tránh
* Cập nhật các bản vá phần mềm thường xuyên
* Sử dụng hệ thống phát hiện xâm nhập (ids) và ngăn chặn xâm nhập (IPS), IPS kiểm tra lưu lượng cơ sở dữ liệu và xác định được những tấn công nhắm vào các điểm yếu đã biết.
# 10.  Lợi dụng các điểm yếu trong giao thức giao tiếp cơ sở dữ liệu
### Mô tả
Các nhà cung cấp cơ sở dữ liệu phát hiện ra một số lượng ngày càng tăng các điểm yếu an toàn trong các giao thức giao tiếp cơ sở dữ liệu. Chẳng hạn 4 trong 7 điểm yếu về giao thức trong IBM DB2 đã được xác định và sửa chữa, 11 trong số 23 điểm yếu cơ sở dữ liệu liên quan đến giao thức đã được xác định trong Oracle gần đây. Sâu SQL Slammer2 cũng khai thác điểm yếu trong giao thức của Microsoft SQL Server để gây ra tấn công từ chối dịch vụ. Ngoài ra, các hoạt động của giao thức không hề được lưu lại trong các vết kiểm toán cho nên càng gây khó khăn cho việc phát hiện lỗi và phát hiện các tấn công.
### Biện pháp phòng tránh
Có thể giải quyết tấn công này bằng công nghệ phê duyệt giao thức. Công nghệ này sẽ phân tích lưu lượng cơ sở dữ liệu cơ bản và so sánh nó với lưu lượng thông thường. Trong trường hợp lưu lượng hiện tại không phù hợp với lưu lượng cơ sở dữ liệu như mong đợi thì hệ thống sẽ phát ra cảnh báo, thậm chí là chặn luôn hành động đang thực hiện.
# Kết luận 
Hiện nay vấn đề đảm bảo an toàn thông tin cho doanh nghiệp là hết sức quan trọng, không chỉ những nhân viên đảm bảo an toàn thông tin làm việc này mà chính những người sử dụng dữ liệu cũng phải ý thức sử dụng và bảo vệ dữ liệu.<br>
Có nhiều loại tấn công khác nhau vào CSDL và chúng có thể được sử dụng kết hợp với nhau để tăng sức mạnh, vì thế một chiến lược phòng thủ nhiều lớp là cần thiết để bảo vệ CSDL một cách tốt nhất bên cạnh đó các doanh nghiệp cần có chương trình đào tạo cho nhân viên của họ về các rủi ro đối với vấn đề bảo mật, an toàn.
###### tài liệu tham khảo từ rất nhiều nguồn :smile: