# Method GET là gì?

- Phương thức GET được sử dụng để nối dữ liệu vào URL trong cặp tên hoặc giá trị. Nếu bạn sử dụng GET, độ dài của URL sẽ bị giới hạn. Nó giúp người dùng gửi kết quả. GET tốt hơn cho dữ liệu không yêu cầu bất kỳ bảo mật nào hoặc có hình ảnh hoặc tài liệu phức tạp.
# Method POST là gì?

- POST là một phương thức được hỗ trợ bởi HTTP và mô tả rằng máy chủ web chấp nhận dữ liệu được bao gồm trong nội dung request. POST thường được sử dụng để gửi dữ liệu do người dùng tạo đến máy chủ

# Các tính năng của GET

- Rất dễ dàng để đánh dấu dữ liệu bằng phương pháp GET.
- Giới hạn độ dài Url của phương thức GET là có giới hạn.
- Bạn chỉ có thể sử dụng phương pháp này để truy xuất dữ liệu từ thanh địa chỉ trong trình duyệt.
- Phương pháp này cho phép dễ dàng lưu trữ dữ liệu.

# Các tính năng của POST

- Dữ liệu được truyền bằng phương thức POST sẽ không hiển thị trong các tham số truy vấn trong URL trình duyệt.
- Các tham số của phương thức POST không được lưu trong lịch sử trình duyệt.
- Không có hạn chế trong việc gửi độ dài của dữ liệu.
- Nó giúp bạn gửi dữ liệu đến máy chủ an toàn hơn.

# Ưu điểm của GET

- Phương thức GET có thể truy xuất thông tin được xác định bởi request-URI (Uniform Resource Identifier - Định danh tài nguyên đồng nhất).
- Yêu cầu GET có thể được xem trong lịch sử trình duyệt.
- Nó cho phép bạn lưu kết quả của một biểu mẫu HTML.
- Dễ dàng sử dụng phương thức GET để yêu cầu dữ liệu cần thiết.

# Ưu điểm của POST

- Bạn có thể gửi yêu cầu chấp nhận thực thể như một tài nguyên mới.
- Bạn có thể gửi dữ liệu do người dùng tạo đến máy chủ.
- Nó rất hữu ích khi bạn không muốn dữ liệu phải giữ trong URL.
- POST là một phương pháp an toàn vì các yêu cầu của nó không được lưu trong lịch sử trình duyệt.
- Bạn có thể dễ dàng truyền một lượng lớn dữ liệu.
- Bạn có thể giữ dữ liệu ở chế độ riêng tư.
- Phương pháp này có thể được sử dụng để gửi dữ liệu nhị phân cũng như ASCII.

# Nhược điểm của GET

- GET không thể được sử dụng để gửi tài liệu văn bản lớn hoặc hình ảnh.
- Yêu cầu GET chỉ có thể được sử dụng để truy xuất dữ liệu
- Phương thức GET không thể được sử dụng để chuyển thông tin nhạy cảm như tên người dùng và mật khẩu.
- Độ dài của URL bị giới hạn.
- Nếu bạn sử dụng phương pháp GET, trình duyệt sẽ gắn dữ liệu vào URL.

# Nhược điểm của POST

- Dữ liệu được gửi bởi phương thức POST không hiển thị trong URL.
- Bạn không thể thấy các yêu cầu POST trong lịch sử trình duyệt.
- Phương pháp này không tương thích với nhiều thiết lập tường lửa.
- Phương thức POST mất nhiều thời gian khi tải lên tệp nhị phân lớn.


# Sự khác biệt giữa GET và POST:

| GET | POST |
| -------- | -------- |
| - Trong phương thức GET, các giá trị được hiển thị trong Url.     | - Trong phương thức POST, các giá trị không hiển thị trong URL.     |
| - GET có giới hạn về độ dài của các giá trị, thường là 255 ký tự.     | - POST không có giới hạn về độ dài của các giá trị vì chúng được gửi qua phần thân của HTTP.    |
| - Hiệu suất của GET tốt hơn so với POST.    | - Hiệu suất thấp hơn so với phương thức GET do tốn nhiều thời gian để bao gồm các giá trị POST trong phần thân HTTP.    |
| - Phương thức này chỉ hỗ trợ các kiểu dữ liệu chuỗi.     | - Phương pháp này hỗ trợ các kiểu dữ liệu khác nhau, chẳng hạn như chuỗi, số, nhị phân, v.v.     |
| - Kết quả GET có thể được đánh dấu (Bookmarked).     | - Kết quả POST không thể được đánh dấu (Bookmarked).     |
| - GET thường có thể lưu vào bộ nhớ cache.    | - POST hầu như không thể lưu vào bộ nhớ cache.     |
| - Các thông số của phương thức vẫn còn trong lịch sử trình duyệt web.     | - Các thông số không được lưu trong lịch sử trình duyệt web.     |

# KẾT LUẬN:
- Trong phương thức GET, các giá trị được hiển thị trong URL trong khi ở phương thức POST, các giá trị KHÔNG hiển thị trong URL.
- GET có giới hạn về độ dài của các giá trị, thường là 255 ký tự trong khi POST không có giới hạn về độ dài của các giá trị vì chúng được gửi qua phần thân của HTTP.
- Phương thức GET chỉ hỗ trợ các kiểu dữ liệu chuỗi trong khi phương thức POST hỗ trợ các kiểu dữ liệu khác nhau, chẳng hạn như chuỗi, số, nhị phân, v.v.
- Yêu cầu GET thường có thể lưu vào bộ nhớ cache trong khi yêu cầu POST hầu như không thể lưu vào bộ nhớ cache.
- Hiệu suất của GET tốt hơn so với POST.

Nguồn tham khảo: https://www.guru99.com/difference-get-post-http.html