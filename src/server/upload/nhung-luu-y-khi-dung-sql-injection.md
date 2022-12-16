Chào mọi người, mình thấy cộng đồng rất thú vị và muốn tham gia đóng góp 1 ít kiến thức mà mình học được cho mọi người, khoảng thời gian mình làm Dev tuy không lâu năm như các a/c nhưng mình rất thường xuyên học hỏi nhiều kiến thức. Sau đây là những thứ mình muốn chia sẻ với mọi người về SQL - một thứ chắc hẳn cộng đồng lập trình chúng mình rất quan tâm.

## SQL Injection là gì?
SQL Injection là một kỹ thuật lợi dụng những lỗ hổng về câu truy vấn của các ứng dụng. Được thực hiện bằng cách chèn thêm một đoạn SQL để làm sai lệnh đi câu truy vấn ban đầu, từ đó có thể khai thác dữ liệu từ database [kiến thức cơ bản về database nè](https://en.wikipedia.org/wiki/Database). SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác như một người quản trị web, trên cơ sở dữ liệu của ứng dụng.

Dựng lên tình huống ví dụ như thế này, cơ sở dữ liệu nhận tất cả dữ liệu từ form đăng nhập, người dùng nhập dữ liệu, trong trường tìm kiếm người dùng nhập văn bản tìm kiếm, trong biểu mẫu lưu dữ liệu, người dùng nhập dữ liệu cần lưu.

Những kẻ tấn công lợi dụng lỗ hổng SQL Injection để insert và thực thi các câu lệnh SQL bất hợp pháp để lấy dữ liệu của người dùng… SQL Injection được thực hiện với ngôn ngữ lập trình SQL. SQL [viết tắt của định nghĩa Structured Query Language](https://www.dataversity.net/structured-query-language-sql/) được sử dụng để quản lý dữ liệu được lưu trữ trong toàn bộ cơ sở dữ liệu.

## Nguy cơ tiềm tàng đến từ SQL Injection
* Hack tài khoản cá nhân
* Ăn cắp hoặc sao chép dữ liệu của trang web hoặc hệ thống.
* Thay đổi dữ liệu nhạy cảm của hệ thống.
* Xóa dữ liệu nhạy cảm và quan trọng của hệ thống.
* Người dùng có thể đăng nhập vào ứng dụng với tư cách người dùng khác, ngay cả với tư cách quản trị viên.
* Người dùng có thể xem thông tin cá nhân thuộc về những người dùng khác, ví dụ chi tiết hồ sơ của người dùng khác, chi tiết giao dịch của họ,…
* Người dùng có thể sửa đổi cấu trúc của cơ sở dữ liệu, thậm chí xóa các bảng trong cơ sở dữ liệu ứng dụng.
* Người dùng có thể kiểm soát máy chủ cơ sở dữ liệu và thực thi lệnh theo ý muốn.

Ta chỉ cần nhập ký hiệu ' hoặc " vào các trường được kiểm tra. Nếu nó trả về bất kỳ thông báo bất ngờ hoặc bất thường, thì ta có thể chắc chắn rằng SQL Injection khả thi cho trường đó. Việc kiểm tra lỗ hổng này có thể được thực hiện rất dễ dàng. Mọi người có thể [hiểu thêm về sql injection](https://topdev.vn/blog/sql-injection/) mà mình tìm được ở nhiều trang công nghệ trong và ngoài nước.

Cuối cùng là chúng ta nên dùng các Framework vì các framework đều đã được test cẩn thận để phòng tránh các lỗi, trong đó có SQL Injection và hạn chế dùng code thuần tối đa nếu có thể. Framework luôn có cộng đồng hoặc các chuyên gia bảo mật giúp tìm lỗi và update liên tục, từ đó chúng ta có thể giảm bớt thời gian xử lý lỗi để tăng thời gian làm sản phẩm cũng là một điều hay.