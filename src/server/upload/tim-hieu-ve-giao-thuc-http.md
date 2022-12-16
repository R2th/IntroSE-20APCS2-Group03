Là giao thức truyền siêu văn bản, nằm trong tầng Application - tầng cao nhất của bộ giao thức TCP/IP. Được sử dụng để truyền nội dung giữa Web Server đến Web Client.
Cơ chế hoạt động request - response: Client sẽ gửi request đến Server, sau đó Server sẽ xử lý gì đó và trả về response cho Client.
Đặc điểm: là 1 giao thức giao tiếp phi trạngthái ( stateless protocol) - mỗi request được xem là 1 phiên làm việc hoàn toàn độc lập - không lưu bất kỳ thông tin nào liên quan đến các lần request trước đó.
Các method thông dụng của HTTP:
 + GET:  được sử dụng để lấy lại thông tin từ Server đã cung cấp bởi sử dụng một URI đã cung cấp. Các yêu cầu sử dụng GET chỉ nhận dữ liệu và không có ảnh hưởng gì tới dữ liệu.
 + POST: một yêu cầu POST được sử dụng để gửi dữ liệu tới Server, ví dụ, thông tin khách hàng, file tải lên, …, bởi sử dụng các mẫu HTML.
 + PATCH: thay đổi một phần đại diện hiện tại của nguồn mục tiêu với nội dung được tải lên.
 + PUT: thay đổi tất cả các đại diện hiện tại của nguồn mục tiêu với nội dung được tải lên.
 + DELETE: gỡ bỏ tất cả các đại diện hiện tại của nguồn mục tiêu bởi URI.
 + HEAD: tương tự như GET, nhưng nó truyền tải dòng trạng thái và khu vực Header.
 + CONNECT: thiết lập một tunnel tới Server được xác định bởi URI đã cung cấp.
 + TRACE: trình bày một vòng lặp kiểm tra thông báo song song với path tới nguồn mục tiêu.
 + OPTIONS: miêu tả các chức năng giao tiếp cho nguồn mục tiêu.

Hai phương thức được dùng nhiều nhất trong HTTP request là GET và POST
Đặc trưng của GET:
 + Câu truy vấn của GET sẽ được đính kèm ngay vào url của HTTP Request :  /?username=”abc”&password=”def”
 + GET Request có thể được cached, bookmark và lưu trong lịch sử của trình duyệt
 + GET Request bị giới hạn về chiều dài, vì chiều dài của URL có giới hạn
 + GET Request không nên dùng với dữ liệu quan trọng, chỉ dùng để nhận dữ liệu
Đặc trưng của POST:
 + Câu truy vấn của POST sẽ được gửi trong phần message body của HTTP Request
 + POST không thể cached, bookmark hay lưu trong lịch sử của trình duyệt
 + POST không bị giới hạn về độ dài

URL của HTTP là địa chỉ định danh của tài nguyên. Khi nhập 1 URL trên trình duyệt thì trình duyệt sẽ đưa URL vào 1 request message và gửi yêu cầu đến máy chủ. Máy chủ phân tích yêu cầu và trả về thông tin cho trình duyệt, có thể là tài nguyên yêu cầu, có thể là thông báo lỗi.
URL có 4 thành phần:
 + Protocol làgiao thức sử dụng giữa client và server
 + Hostname là tên miền
 + Port là cổng TCP để server lắng nghe request từ client
 + Path-and-file-name là tên và vị trí của tài nguyên yêu cầu.
Ví dụ về URL: https://mail.google.com/mail/u/0/#inbox
 + protocol: https
 + hostname: mail.google.com
 + port: 80 là cổng mặc định của dịch vụ Web
 + /mail: trỏ đến một tệp tin hay một vị trí nằm trên máy chủ Web
 + /u/0/#inbox: các tham số khác

Các trường thông dụng trong Request Header
 + Accept: loại nội dung có thể nhận được từ thông điệp response. Ví dụ: text/plain, text/html…
 + Accept-Encoding: các kiểu nén được chấp nhận. Ví dụ: gzip, deflate, xz, exi…
 + Connection: tùy chọn điều khiển cho kết nối hiện thời. Ví dụ: keep-alive, Upgrade…
 + Cookie: thông tin HTTP Cookie từ server
 + User-Agent: thông tin về user agent của người dùng
![](https://images.viblo.asia/de202ec2-8e03-49e1-8228-6b1a594c6ece.JPG)
HTTP Request
![](https://images.viblo.asia/d88e0451-491d-4e46-bb62-8ed97f93217c.JPG)

Cookie:
+ Được lưu trữ ở trên trình duyệt người  dưới dạng key-value
+ Mỗi cookie sẽ có 1 cặp giá trị key-value tương ứng
+ Tồn tại cho đến khi nó hết hạn
Khi thực hiện một http request, thì browser sẽ dựa vào url, tìm kiếm các cookie tương ứng với domain của url vừa nhập để gửi hết cookie hiện tại lên server.
Giới hạn lưu trữ: 4kb. Trong trường hợp cookie nhiều hơn 4kb thì những giá trị cookie cũ nhất sẽ bị xóa đi
Set càng nhiều cookie thì request càng lớn -> giảm tốc độ


Response Code là mã trạng thái HTTP được server phản hồi lại mỗi khi nhận được http resquest
 + 1xx: Informational nó nghĩa là yêu cầu đã được nhận và tiến trình đang tiếp tục.
Ví dụ: 100 - Continue, 101 - Switching protocols
 + 2xx: Success (200 - OK, 202 - Accepted, 204 - No Content) nó nghĩa là hoạt động đã được nhận, được hiểu, và được chấp nhận một cách thành công.
Ví dụ: 200 - Successful , 201 - Created, 202 - Accepted, 203 - Non-authoritative information
 + 3xx: Redirection nó nghĩa là hoạt động phải được thực hiện để hoàn thành yêu cầu.
Ví dụ: 301 - Moved permanently, 302 - Moved permanently, 304 - Not modified
 + 4xx: Client Error nó nghĩa là yêu cầu chứa cú pháp không chính xác hoặc không được thực hiện
Ví dụ: 400 - Bad Request, 401 - Unauthorized, 403 - Forbidden, 404 - Not Found, 405 - Method Not Allowed, 408 - Request Timeout, 429 - Too many requests
 + 5xx: Server Error nó nghĩa là Server thất bại với việc thực hiện một yêu cầu nhìn như có vẻ khả thi.
Ví dụ: 500 - Internal Server Error, 503 - Service Unavailable, 504 - Gateway Timeout, 509 - Bandwidth Limit Exceed