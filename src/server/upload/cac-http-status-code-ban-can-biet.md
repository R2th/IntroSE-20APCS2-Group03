Làm việc với web có nghĩa là bạn tiếp xúc với các HTTP response. Cho dù bạn dành thời gian chủ yếu ở Client hay Server, bạn thường quen thuộc với các status code phổ biến như 200, 404 hay 500.<br>

**HTTP Staus Code là gì ?**

`HTTP Response Status Code` là một tập hợp các số được chuẩn hóa và thống nhất xác định thông tin về phản hồi http. <br><br>
`Status Code` gồm 3 chữ số và được chia thành 5 loại, mỗi loại được sắp xếp theo chữ số đầu tiên của số. Bạn sẽ thấy những chữ viết tắt này là số đầu tiên, theo sau là hai ký tự "x". Ví dụ: "4xx".<br>
* 1xx: **Informational** (cung cấp thông tin về request trong tiến trình).
* 2xx: **Successful**  (chỉ ra rằng request đã được nhận và chấp nhận).
* 3xx: **Redirection**  (chỉ ra rằng request phải được redirect).
* 4xx: **Client Error** (lỗi ở phía client).
* 5xx: **Server Error** (lỗi ở phía server).
<br><br>

**Những Response Code phổ biến**<br><br>
**200 (OK)**<br>
Mọi thứ đều tuyệt vời! Code 200 là dấu hiệu cho thấy request đã thành công.

Điều quan trọng cần ghi nhớ là một request thành công không phải lúc nào cũng có nghĩa tương tự từ góc độ người dùng. Một truy vấn tìm kiếm đối với API có thể trả về 200, ngay cả khi response không chứa kết quả phù hợp.
<br><br>
**301 (Moved Permanently)**<br>
Mặc dù bạn có thể không thấy điều này quá thường xuyên khi thực hiện request tới API của bên thứ ba, nhưng nó rất hữu ích cho việc định cấu hình máy chủ để xử lý các tài nguyên đã di chuyển. Ví dụ: cấu trúc lại url của một trang web từ page.site.com đến site.com/page có thể sử dụng 301 để chỉ ra cho các công cụ tìm kiếm, trình duyệt và các tài nguyên phụ thuộc mà trang vẫn tồn tại, nhưng nó có một vị trí mới.
<br><br>
**401 (Unauthorized)**<br>
Sử dụng khi request không thể được xử lý vì thông tin không hợp lệ. Nếu bạn thường xuyên gặp code này, hãy đảm bảo xác nhận thông tin đăng nhập của bạn là chính xác.
<br><br>
**403 (Forbidden)**<br>
Đừng nhầm lẫn với code 401, cdde 403 dành cho các client đã được biết đến ở server, nhưng không có quyền thích hợp để truy cập tài nguyên. Code 403 có thể xảy ra khi server hoặc API có danh sách client được phê duyệt (ví dụ: tên miền hoặc địa chỉ IP) không khớp với client đưa ra request.
<br><br>
**404 (Not Found)**<br>
Phổ biến đến mức những người không phải lập trình viên cũng nhận ra nó, 404 được sử dụng khi không thể tìm thấy tài nguyên được yêu cầu. Có lẽ nó đã di chuyển và không có chuyển hướng được cung cấp. Có thể URL được cung cấp đơn giản là không chính xác. 404 không cung cấp bất kỳ dấu hiệu nào cho dù đây là sự cố tạm thời hay vĩnh viễn.
<br><br>
**408 (Request Timeout)**<br>
Khi client gửi request đến server và mất quá nhiều thời gian hoặc server quyết định đóng kết nối thay vì tiếp tục chờ đợi, code 408 được gửi. Một số server sẽ gửi cái này trên các  `idle connections` , ngay cả khi client chưa gửi request.
<br><br>
**429 (Too Many Requests)**<br>
Nếu sử dụng API của bên thứ ba trong ứng dụng của bạn, bạn có thể gặp code 429. Điều này xảy ra khi bạn đạt giới hạn tỷ lệ bằng cách gửi quá nhiều request trong một khoảng thời gian. Khung thời gian và giới hạn này sẽ khác nhau tùy thuộc vào API, nhưng response thường sẽ bao gồm các chi tiết về giới hạn và thường là tiêu đề Retry-After với thời gian bạn cần đợi trước khi đưa ra request khác.
<br><br>
**500 (Internal Server Error)**<br>
Code 500 xảy ra khi server gặp lỗi không mong muốn. Đây là code mặc định, để sử dụng khi không có code phù hợp hơn.
<br><br>
**502 (Bad Gateway)**<br>
Khi server bạn đang kết nối hoạt động như một gateway hoặc proxy, nhưng nhận được request không hợp lệ từ server mà nó đang cố gắng tiếp cận (origin server). Điều này có thể xảy ra với các proxy tiêu chuẩn hoặc thậm chí API Gateways. Gateway đang hoạt động, nhưng origin server mà nó đang cố gắng tiếp cận đang gặp sự cố.
<br><br>
**503 (Service Unavailable)**<br>
Code 503 có nghĩa là server tạm thời không khả dụng. Điều này có thể được gây ra bởi quá tải tài nguyên, bảo trì tạm thời hoặc bất kỳ tình huống nào mà vấn đề chính xác không liên quan đến yêu cầu. Kỳ vọng với response 503 là dịch vụ sẽ sớm được cung cấp trở lại.
<br><br>
**504 (Gateway Timeout)**<br>
Tương tự như 502, khi server là proxy hoặc gateway và chưa nhận được phản hồi từ origin server trong một khoảng thời gian thích hợp, nó sẽ trả về code 504. Mặc dù gốc rễ của vấn đề sẽ không rõ ràng từ phản hồi này, điều đó có nghĩa là một trong những tài nguyên phụ thuộc đang gặp sự cố mà bạn có thể muốn check gateway.
<br><br>

> Các code này được tiêu chuẩn hóa cho một lý do. Là người dùng API, nó cho phép bạn đưa ra các giả định về response nhận được. Là người tạo API, nó cung cấp cho bạn cách để tương tác với người dùng API. Tận dụng các code này để làm cho việc phát triển và sử dụng API trở nên nhất quán hơn.

<br>

**Tham Khảo:** [link](https://blog.bearer.sh/common-http-status-codes/)