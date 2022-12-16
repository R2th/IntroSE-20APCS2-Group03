![](https://images.viblo.asia/ffe38b60-ae73-4bbf-b48b-888d198da2d3.jpg)
GET và POST là hai kỹ thuật phổ biến để gửi dữ liệu đến server và browser cần chúng để giao tiếp với server. Hai phương thức này khác biệt ở chỗ phương thức GET thêm dữ liệu được mã hóa vào URI trong khi trong với phương thức POST, dữ liệu được nối vào phần body chứ không phải URI. Ngoài ra, phương thức GET được sử dụng để lấy dữ liệu. Ngược lại, phương thức POST được sử dụng để lưu trữ hoặc cập nhật dữ liệu. 

Thẻ `form` được sử dụng để thể hiện nội dung của biểu mẫu. Các biểu mẫu này được điền đầy đủ dữ liệu liên quan sau đó được gửi đến server để xử lý thêm. Chức năng của biểu mẫu bao gồm hai điều quan trọng: **ACTION** - đặc tả địa chỉ của server xử lý nội dung biểu mẫu. **METHOD**  - đặc tả phương thức giao tiếp với server.

## Bảng so sánh


| Tiêu chí | GET | POST |
| -------- | -------- | -------- |
| Nơi chứa params | URI | Body |
| Múc đích | Truy xuất dữ liệu | Cập nhật dữ liệu |
| Kết quả truy vấn | Có thể đánh dấu(bookmarked) | Không thể đánh dấu |
| Bảo mật | Dễ bị tấn cồn, params hiển thị rõ ràng trên URI | An toàn hơn GET |
| Ràng buộc kiểu dữ liệu | Chỉ chấp nhận các ký tự ASCII | Không có ràng buộc nào, ngay cả dữ liệu nhị phân cũng được phép. |
| Độ dài biểu mẫu | Nên giữ ở mức tối thiểu nhất có thể | Có thể trong bất kỳ khoảng giới hạn nào |
| Hiển thị | Có thể được nhìn thấy bởi bất kỳ ai | Không hiển thị các params trong URL |
| Kích thước | Lên đến 2000 ký tự  | Lên đến 8 Mb |
| Caching | Có thể cache | Không thể cache |

## Định nghĩa phương thức GET
Phương thức GET được sử dụng để yêu cầu URL từ web server để tải các trang HTML. Đây là một phương pháp thông thường để các trình duyệt cung cấp thông tin được tính là một phần của giao thức HTTP. Phương thức GET được biểu diễn dưới dạng URL để nó có thể được đánh dấu. GET được sử dụng rộng rãi trong các công cụ tìm kiếm. Sau khi người dùng gửi truy vấn tới công cụ tìm kiếm, công cụ này sẽ thực thi truy vấn và đưa ra trang kết quả. Kết quả truy vấn có thể được đặt dưới dạng một liên kết (được đánh dấu trang). 

Phương thức GET cho phép tạo các `anchors`, giúp truy cập chương trình CGI với truy vấn mà không cần sử dụng biểu mẫu. Truy vấn được xây dựng thành một liên kết, vì vậy khi liên kết được truy cập, chương trình CGI sẽ lấy thông tin phù hợp từ cơ sở dữ liệu. 

Phương thức GET có một số vấn đề bảo mật vì dữ liệu được chèn sẽ hiển thị trong URL. Chỉ một lượng dữ liệu hạn chế mới có thể được chuyển qua phương thức GET, vì độ dài của URL mà trình duyệt có thể duyệt qua có thể là một nghìn ký tự. 

Một vấn đề khác liên quan đến phương pháp GET là nó không thể xử lý các ngôn ngữ nước ngoài. Phương thức GET không được đề xuất sử dụng nhưng vẫn còn khi các thuộc tính của phương thức không được xác định, phương thức GET được sử dụng làm mặc định. 

## Định nghĩa phương thức POST
Phương thức POST phù hợp trong điều kiện có một lượng thông tin đáng kể có thể truyền đi. Khi một server nhận được yêu cầu bởi một biểu mẫu sử dụng POST, nó sẽ tiếp tục “lắng nghe” phần thông tin còn lại. Nói một cách đơn giản, phương pháp này chuyển tất cả thông tin liên quan của đầu vào biểu mẫu ngay lập tức sau khi yêu cầu tới URL được thực hiện. 

Phương thức POST cần thiết lập hai liên hệ với web server trong khi GET chỉ tạo một liên hệ. Các yêu cầu trong POST được quản lý theo cách giống như được quản lý trong phương thức GET, nơi các khoảng trắng được thể hiện bằng dấu cộng (+) và các ký tự còn lại được mã hóa trong mẫu URL. Nó cũng có thể gửi các mục của một tệp. 

## Tổng kết
Phương thức GET và POST được sử dụng để gửi dữ liệu đến server và sự khác biệt chính giữa chúng là phương thức GET nối dữ liệu vào URI được xác định trong thuộc tính `action` của `form`. Ngược lại, phương thức POST đính kèm dữ liệu vào phần `body` được yêu cầu. Việc sử dụng phương thức GET là không phù hợp khi thông tin nhạy cảm cần được điền vào `form`. Phương thức POST hữu ích khi người dùng yêu cầu điền mật khẩu hoặc thông tin bí mật khác.

**REF**: https://techdifferences.com/difference-between-get-and-post-method-in-html.html