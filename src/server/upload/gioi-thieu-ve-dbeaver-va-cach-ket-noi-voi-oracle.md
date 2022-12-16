**DBeaver** là phần mềm quản lý cơ sở dữ liệu hỗ trợ JDBC driver 
<br/>**DBeaver** rất trực quan và dễ sử dụng để **kết nối với nhiều cơ sở dữ liệu** khác nhau, chạy truy vấn, tạo ERD
<br/>**DBeaver** hỗ trợ các hệ quản trị cơ sở dữ liệu Oracle, MySQL, IBM DB2, SQL Server, PostgreSQL, Java DB, …
<br/>Bạn có thể tải xuống tại dbeaver.io/download/ có phiên bản miễn phí trên các hệ điều hành Windows, Mac OS X, Linux

### Một số lợi ích và tính năng của ứng dụng này:

* Câu lệnh SQL / thực thi tập lệnh
* Tự động điền và liên kết siêu dữ liệu trong trình soạn thảo SQL
* Giao diện được thiết kế hiện đại và cẩn thận, có thể cuộn trang để xem danh sách kết quả 1 cách tiện lợi
* Xuất dữ liệu (bảng, kết quả truy vấn)
* Tìm kiếm các đối tượng cơ sở dữ liệu (bảng, cột, ràng buộc, thủ tục)
* DBeaver tiêu thụ ít bộ nhớ hơn nhiều so với các chương trình phổ biến khác (SQuirreL, DBVisualizer)
* Tất cả các hoạt động cơ sở dữ liệu từ xa hoạt động ở chế độ mở khóa, vì vậy DBeaver không bị sập nếu máy chủ cơ sở dữ liệu không phản hồi hoặc có sự cố mạng liên quan

### Cách kết nối Oracle với DBeaver

Sau khi tải xuống, chúng ta có thể dễ dàng cài đặt như các ứng dụng khác
<br/>Khi đã hoàn tất quá trình cài đặt, khởi động ứng dụng, màn hình sẽ hiển thị như sau:

![](https://images.viblo.asia/06e6dabd-d439-43b4-9e2d-0a8040cbf187.png)

Click vào icon trên để kết nối database mẫu, bạn sẽ thấy bảng phía dưới hiện ra
<br/> Sau đó, Click vào **Oracle**-> **Finish** và tiếp tục 

![](https://images.viblo.asia/f5294494-b663-4db9-b39d-94afd21c3410.png)

Tiếp đến bạn sẽ thấy màn hình như sau:

![](https://images.viblo.asia/1abfdd21-fe5e-4661-995f-e57b761970d1.png)

Bạn nhập đủ thông tin vào các trường được khoanh đỏ nhé, lần lượt là: **Địa chỉ IP, tên DB , Username, Password** của database mẫu mà bạn muốn kết nối
<br/> Tiếp theo đó, **đừng vội click Finish** mà hãy click vào nút **Test Conection** ở bên trái để kiểm tra xem thông tin đã đúng chưa
<br/> Nếu có lỗi gì đó thì bạn thử kiểm tra lại tên DB xem đúng không nhé!

![](https://images.viblo.asia/067df1a5-80d0-4901-9398-4ecf7863980a.png)

Khi hiển thị pop-up như trên là đã đúng rồi, lúc này bạn chỉ cần nhấn **Finish** thôi
<br/> Màn hình hiển thị như dưới đây tức là bạn đã kết nối DB_TEST thành công rồi nhé!

![](https://images.viblo.asia/a871b580-a402-408f-9948-ed0917f7c7f2.png)


### Tips sử dụng DBeaver khi kết nối với DB Production

Có thể chúng ta rất ít khi được dùng DB của môi trường Production 
<br/>Nhưng cũng có nhiều dự án cần sử dụng DB của môi trường này để phục vụ việc test hay điều tra Bug
<br/>Thử tưởng tượng, nếu như chúng ta lỡ tay xóa hay sửa 1 dữ liệu nào đó của DB này sẽ gây ra hậu quả như thế nào???
<br/>Để tránh xảy ra sai xót này, sau khi kết nối DB, các bạn làm thêm 1 bước cấp quyền rất đơn giản này nhé:

![](https://images.viblo.asia/3cb91e19-a597-4001-a693-22723288621f.png)


Đầu tiên, Click chuột phải vào DB bạn vừa kết nối, Chọn **Edit Connection**
<br/>Cửa sổ mới hiện ra -> Chọn **General**
<br/>Ở mục **Security**, bạn Click vào **Read-only connection** (Chỉ cho phép đọc dữ liệu)
<br/>Click **OK** để xác nhận thay đổi. Vậy là bạn có thể tự tin dùng DB mà không sợ chỉnh sửa nhầm nữa rồi!

![](https://images.viblo.asia/cd49ac37-3823-43e7-8eb9-0d6b66253ab4.png)

![](https://images.viblo.asia/f6e1e00d-21af-487f-9f73-4f2723963c6b.png)