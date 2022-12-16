![](https://images.viblo.asia/896fadb4-d200-44c6-b3a9-910129742912.jpg)
### Một số khái niệm cơ bản
- OWASP (Open Web Application Security Project) là 1 dự án mở về bảo mật ứng dụng web, dự án là sự cố gắng chung của cộng đồng với mục đích giúp các doanh nghiệp có thể phát triển, mua và bảo trì các ứng dụng web một cách an toàn.
- REST (hay REpresentational State Transfer) là một kiểu kiến trúc được sử dụng trong việc giao tiếp giữa các máy tính (máy tính cá nhân và máy chủ web) trong việc quản lý các tài nguyên trên internet. REST cho phép tương tác với một hệ thống web đơn giản hơn so với việc sử dụng những request phức tạp.
- Hướng dẫn của OWASP về REST Security chỉ ra các điểm cần chú ý trong khi xây dựng hệ thống REST API để đảm bảo tính an toàn cho hệ thống.
### a) Xác thực người dùng và quản lý phiên làm việc
- RESTful nên xác thực dựa trên session (phiên làm việc), hoặc bằng cách thiết lập một session token qua phương thức POST hoặc bằng 1 API key như một tham số trong POST body hay như một cookie. Đồng thời tên tài khoản, mật khẩu, session tokens, và API keys không hiển thị trên URL.
- Bảo vệ phiên làm việc: 
+ Sử dụng session token hay API key để duy trì trạng thái của máy khách trong cache phía server.
+ Kẻ tấn công có thể trở thành một ai đó khác nhờ vào việc sử dụng các dữ liệu bắt lén được. Cân nhắc sử dụng các key mã hóa có thời gian giới hạn, mã session token hay API key cùng với thời gian và địa chỉ IP gửi tới. Nói một cách tổng quan, cần thực hiện một số cách thức để bảo vệ token xác thực được lưu trữ trên máy khách để chống lại hình thức replay attacks.
+ Không để nó dễ dàng bị giải mã.
### b) Cấp quyền
- Bảo vệ các phương thức HTTP: RESTful API sử dụng các phương thức GET (để đọc), POST (để tạo), Put (thay thế, cập nhât) và DELETE (để xóa 1 bản ghi), ta cần kiểm tra các phương thức này có được cho phép được thực hiện bởi người dùng đã gửi yêu cầu hay không để đảm bảo tính an toàn cho hệ thống.
- Định nghĩa với các URL cho phép các phương thức cụ thể khác nhau, nếu URL không hỗ trợ một phương thức nhất định nào đó thì khi client cố gắng yêu cầu sẽ nhận được mã lỗi 403 Forbidden.
- Bảo vệ các hành động đặc quyền và các tài nguyên nhạy cảm: Không phải bất kỳ ai cũng có thể truy cập vào những tài nguyên nhất định hay thực hiện các hành động nhất định, điều này là là vô cùng quan trọng. Bởi vậy cần trích xuất được quyền người dùng từ Session token hay API key để ngăn chặn các hành động hay truy cập không được quyền vào các tài nguyên nhạy cảm hoặc hành động đặc quyền.
- Chống lại các yêu cầu cross-site: Cần đảm bảo các yêu cầu PUT, POST, DELETE được bảo vệ chống lại các yêu cầu Cross Site	 (https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)
### c) Kiểm tra dữ liệu đầu vào
- Cần thực hiện việc kiểm tra dữ liệu đầu vào một cách thận trọng đề chống lại XSS, SQL injection. Tuy nhiên giả sử có nhiều client gửi liên tục hàng trăm request với lỗi đầu vào mỗi giây thì có thể làm dịch vụ rơi vào trạng tháng bận liên tục, bởi vậy cần giới hạn số lượt gửi yêu cầu mỗi giây để đảm bảo dịch vụ luôn ở trang thái sẵn sàng.
- Sử dụng bộ chuyển đổi dữ liệu an toàn: Đảm bảo bộ chuyển đổi dữ liệu đảm bảo đối với bản tin đang tới.
- Sử dụng kiểu dử liệu an toàn: Sẽ rất khó để thực hiện hầu hết các cuộc tấn công nếu chỉ cho phép các giá trị ở dạng true/false, hoặc một số, hoặc một số nhỏ các giá trị quy định trước. Bởi vậy nên sử dụng các kiểu dữ liệu an toàn nhất có thể.
- Kiểm tra content-types của gói tin đang tới: Khi thực hiện POST hay PUT dữ liệu mới, client sẽ xác định Content-Type (ví dụ như application/xml hay application/json)  của dữ liệu gửi đi. Server không bao giờ nên thừa nhận Content-Type mà luôn cần kiểm tra xem Content-Type header và nội dung có cùng loại hay không, nếu không trả về mã lỗi 406: Not Acceptable.
- Kiểm tra kiểu phản hồi: thông thường dịch vụ REST cung cấp nhiều loại phản hồi (ví dụ như application/xml hay application/json), và client xác định kiểu response mong muốn. Server cần kiểm tra header này và reject nếu kiểu response không được phép.
### d) Mã hóa dữ liệu đầu ra
- Gửi các header an ninh: Để đảm bảo trình duyệt tiếp cận đúng với nội dung của các tài nguyên nhận được, server luôn phải gửi các Content-Type header với đúng Content-type cũng như kèm theo 1 charset (ví dụ charset = utf-8). Server cũng nên gửi cả X-Content-Type-Options: nosniff để đảm bảo rằng các trình duyệt không cố gắng để phát hiện các Content-Type khác với cái thực sự được gửi (có thể dẫn tới XSS). Ngoài ra còn có một số các Security header khác nên thêm để tăng tính an toàn cho hệ thống như: X-XSS-Protection, X-Frames-Options, X-Content-Security-Policy, Strict-Transport-Security, X-Download-Options.
- Mã JSON: Bộ mã JSON sẽ ngăn chặn việc thực thi các mã JavaScript từ xa hoặc các dữ liệu đầu vào cung cấp bởi người dùng trên trình duyệt. Cân nhắc việc sử dụng .value/.innerText/.textContent thay vì dùng .innerHTML để cập nhật, điều này giúp tránh khỏi các tấn công DOM XSS đơn giản.
### e) Mã hóa
- Mã hóa khi truyền dữ liệu: Cần sử dụng TLS (Transport Layer Security) ở những nơi chứa thông tin không công khai, đặc biệt cần dùng đối với các hành động cập nhật, xóa, hay bát kỳ hình thức thay đổi dữ liệu nào khác. Áp dụng TLS góp phần cải thiện tính an toàn cho người dùng cuối.
- Mã hóa khi lưu trữ dữ liệu: Đảm bảo tất cả mật khẩu được băm và không thể bị truy cập trái phép.
- Tính toàn vẹn của các bản tin: Ngoài HTTPS/TLS, JWT (JSON Web Token) là cũng một chuẩn mở định nghĩa các truyền thông tin a toàn giữa các bên có sử dụng đối tượng JSON. JWT không chỉ được sử dụng để đảm bảo toàn vẹn dữ liệu mà còn dùng để xác thực cả bên gửi và nhận. JWT bao gồm giá trị băm chữ ký số của thân bản tin để đảm bảo rằng bản tin toàn vẹn trong suốt quá trình gửi.
### f) Mã HTTP trả về 
- REST APIs không chỉ sử dụng có mã lỗi 200 cho các phản hồi thành công và 404 cho lỗi mà cần sử dụng thêm các mã lỗi khác để kiểm tra yêu cầu tới và xác định tốt hơn các rủi ro an ninh tiềm tàng. Một số mã lỗi tiêu biểu:
- 200 OK – Phản hồi một hành động REST API đúng, hành động có thể là GET, POST, PUT, PATCH hoặc DELETE.
- 400 Bad Request – Yêu cầu không chuẩn, ví dụ như body của yêu cầu sai định dạng. 
- 401 Unauthorized – Sai hoặc không cung cấp ID/mật khẩu để xác thực.
- 403 Forbidden – Xác thực thành công nhưng người dùng không có quyền truy cập và tài nguyên đã yêu cầu.
- 404 Not Found – Khi một tài nguyên không tồn tại được yêu cầu.
- 405 Method Not Allowed – Lỗi xảy ra khi một phương thức http không được hỗ trợ.
- 429 Too Many Requests – Lỗi xảy ra khi các yêu cầu bị nghi ngờ là một cuộc tấn công Dos do có quá nhiều yêu cầu gửi đến trong thời gian xác định.

Tài liệu tham khảo: https://www.owasp.org/index.php/REST_Security_Cheat_Sheet