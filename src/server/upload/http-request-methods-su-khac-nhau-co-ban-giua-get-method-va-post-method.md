Đối với các lập trình viên web nói chung thì chúng ta không thể nào mà không nghe đến các từ như get hoặc post, nó thực sự rất phổ biến
 
# HTTP request methods
   Đầu tiên phải nói đến là có tất cả 9 loại request, get và post là 2 loại thông dụng được sử dụng nhiều.
   
*  GET: được sử dụng để lấy thông tin từ sever theo URI đã cung cấp.
 
*  HEAD: giống với GET nhưng response trả về không có body, chỉ có header 
 
*  POST: gửi thông tin tới sever thông qua các biểu mẫu http( đăng kí chả hạn..) 
 
* PUT: ghi đè tất cả thông tin của đối tượng với những gì được gửi lên 
* PATCH: ghi đè các thông tin được thay đổi của đối tượng. 
 
*  DELETE: xóa tài nguyên trên server. 
 
*  CONNECT: thiết lập một kết nối tới server theo URI. 
 
*  OPTIONS: mô tả các tùy chọn giao tiếp cho resource. 
 
*  TRACE: thực hiện một bài test loop - back theo đường dẫn đến resource.


# So sánh sự khác nhau giữa GET và POST

vậy sự khác nhau giữa GET và POST như thế nào, chúng ta cùng tìm hiểu nhé.

HTTP POST requests cung cấp dữ liệu từ máy khách (trình duyệt) đến máy chủ trong phần message body. Ngược lại,GET request bao gồm tất cả dữ liệu bắt buộc trong URL. Các biểu mẫu trong HTML có thể sử dụng một trong hai phương thức bằng cách chỉ định method = "POST" hoặc method = "GET" (mặc định) trong phần tử <form>. Phương thức được chỉ định xác định cách dữ liệu biểu mẫu được gửi tới máy chủ. Khi phương thức là GET, tất cả dữ liệu biểu mẫu được mã hóa thành URL, được nối vào action URL dưới dạng query string parameters. Với POST, dữ liệu biểu mẫu xuất hiện trong phần message body của HTTP request.

**Bảng so sánh**



|          | GET      | POST     |
| -------- | -------- | -------- |
| **History**     | Các tham số vẫn lưu trong lịch sử trình duyệt vì chúng là một phần của URL     | Các tham số không được lưu trong lịch sử trình duyệt     |
|**Bookmarked**	 |Có thể được Bookmarked. | Không thể  Bookmarked|
|**BACK button/re-submit behaviour**|GET requests được thực hiện lại nhưng có thể không được gửi lại cho máy chủ nếu HTML được lưu trữ trong bộ nhớ cache của trình duyệt.|Trình duyệt thường thông báo cho người dùng rằng dữ liệu sẽ cần phải được gửi lại.|
|**Encoding type (enctype attribute)**|Áp dụng /x-www-form-urlencoded	|multipart/form-data or application/x-www-form-urlencoded sử dụng mã hóa nhiều phần cho dữ liệu nhị phân.|
|**Parameters**	|có thể gửi nhưng dữ liệu tham số được giới hạn cho những gì chúng ta có thể đưa vào dòng yêu cầu (URL). An toàn nhất để sử dụng ít hơn 2000 thông số, một số máy chủ xử lý tối đa 64000|Có thể gửi các tham số, bao gồm cả việc tải tệp lên máy chủ.|
|**Hacked**|Easier to hack for script kiddies|Khó khăn hơn để hack|
|**Restrictions on form data type**|Có, chỉ cho phép ký tự ASCII|Không hạn chế. Dữ liệu nhị phân cũng được cho phép.|
|**Security**|GET kém an toàn hơn so với POST vì dữ liệu được gửi hiện trên URL. Vì vậy, nó được lưu trong lịch sử trình duyệt|POST an toàn hơn GET vì các tham số không được lưu trữ trong lịch sử trình duyệt hoặc trong nhật ký máy chủ web.|
|**Restrictions on form data length**|Có hạn chế, vì dữ liệu biểu mẫu nằm trong URL và độ dài URL bị hạn chế. Giới hạn độ dài URL an toàn thường là 2048 ký tự nhưng khác nhau tùy theo trình duyệt và máy chủ web.|Không hạn chế|
|**Khả năng sử dụng**|Phương thức GET không nên được sử dụng khi gửi mật khẩu hoặc các thông tin nhạy cảm khác.|Phương thức POST được sử dụng khi gửi mật khẩu hoặc thông tin nhạy cảm khác.|
|**Visibility**	|Phương thức GET hiển thị trên URL nên ai cũng có thể nhìn thấy và có giới hạn về lượng thông tin cần gửi|POST method variables không được hiển thị trong URL.|
|**Cached**|Có thể được lưu trữ| Không được lưu trong bộ nhớ cache|





-----



*Bài viết được tổng hợp lại từ: https://www.diffen.com/difference/GET-vs-POST-HTTP-Requests và các nguồn khác nữa.*