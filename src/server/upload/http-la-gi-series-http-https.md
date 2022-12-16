### Mục tiêu 
1. HTTP là gì ?
2. HTTP www là gì ? 
3. HTTP request và response ? 
4. Danh sách HTTP status code ?

### 1. HTTP là gì 
- HTTP (Hypertext Transfer Protocol) là một giao thức (quy tắc truyền tin) để trao đổi thông tin giữa máy chủ Web và trình duyệt Web. Khi chúng ta thu thập thông tin trên trang chủ của Web hoặc đọc các blog, HTTP được sử dụng để giao tiếp giữa máy chủ và máy khách (người dùng).
- Một trong những tính năng của HTTP là nó rất đơn giản để hoạt động. Bất cứ khi nào thông tin được trao đổi, máy khách (chẳng hạn như trình duyệt Web) đưa ra yêu cầu và máy chủ sẽ phản hồi. 
- Quy tắc một yêu cầu (request) thì chỉ  trả lại một phản hồi (response) duy nhất. Và response cho một request sẽ luôn giống nhau trong cùng một điều kiện. 
- Vì HTTP có một đặc tính hoàn chỉnh và đơn giản nên bên cạnh sự tương tác giữa máy chủ Web và trình duyệt Web, nó còn được sử dụng rộng rãi để gọi các chức năng máy chủ từ điện thoại thông minh và ứng dụng hay gọi các dịch vụ giữa các máy chủ với nhau. Nó chủ yếu liên quan đến "REST API" và được sử dụng để gọi các chức năng của chương trình khi phát triển một ứng dụng.
- Trong nhiều trường hợp, HTTP được sử dụng kết hợp với TCP và hiếm khi kết hợp với UDP. Số cổng mà máy chủ nhận được giao tiếp HTTP thường là cổng 80. Đối với các mục đích đặc biệt, chẳng hạn như proxy HTTP (bộ lọc nội dung hiệu suất cao, v.v.), hãy sử dụng các cổng khác với cổng 80.

![image.png](https://images.viblo.asia/2e1b627a-3273-4072-8835-00fd34a3cc6e.png)

#### Kết quả xử lý và giao tiếp HTTP
Trong HTTP, giao tiếp được thiết lập bởi yêu cầu do client gửi và phản hồi của server bằng TCP/IP. Mỗi trường của tiêu đề (header) và thông báo có trong request và thao tác chúng ta muốn thực hiện được chỉ định bởi phương thức (method) của request. Các dòng trạng thái, các trường tiêu đề (header) và phần thông báo trong response và kết quả xử lý được hiển thị bằng mã trạng thái. 

###  2. HTTP www là gì ? 
WWW (World Wide Web - gọi tắt là Web) là một dịch vụ lưu trữ các tài liệu được tạo ở định dạng gọi là siêu văn bản trên máy chủ và cung cấp chức năng duyệt chúng qua mạng.
- Siêu văn bản là một tệp văn bản có các siêu liên kết (thông tin tham chiếu đến các tài liệu khác) được nhúng trong đó. Bằng cách tuân theo các siêu liên kết, có thể liên kết nhiều tài liệu với nhau. 
- WWW chủ yếu sử dụng HTML (HyperText Markup Language) để viết siêu văn bản này. Để nhận ra siêu văn bản, chúng ta cần một phương pháp để trỏ đến các tài liệu và các tệp tồn tại trên Web. Phương pháp là chúng ta sẽ sử dụng URL (Uniform Resource Locator). 
    - URL cũng được sử dụng khi chỉ định máy chủ Web trong trình duyệt Web, cũng thường được gọi là "địa chỉ trang chủ".
    - URL được sử dụng trên Web gần như được chia thành ba phần: (ex: protocol://host:port/path)
        -  protocol
            -   Là loại giao thức được sử dụng như http, https, ftp, mailto, v.v. 
        -  host (tên máy chủ)
            -  host chỉ định máy tính lưu trữ tài liệu và chỉ định tên miền hoặc địa chỉ IP của máy tính
        -  path (tên đường dẫn)
            -  path chỉ định vị trí lưu trữ tệp trong máy tính
    - Ngoài ra, chúng ta có thể chỉ định số cổng (thường là 80) được sử dụng bởi máy chủ và tên người dùng và mật khẩu được sử dụng để xác thực trong URL. 
    - URI (Uniform Resource Identifier) là một từ tương tự như URL. URI đại diện cho một khái niệm rộng hơn, bao gồm  cả URL và URN (uniform Resource Name). Do đó, trên thực tế đôi khi chúng ta gọi URL là URI.

Example: 
![image.png](https://images.viblo.asia/b16c7410-cdc9-472f-b24e-9a8dbccfe1f6.png)
#### URL của http:// không có www
- Đôi khi chúng ta truy cập một trang Web, chúng ta thấy URL của một trang Web không có www. Tuy nhiên nó vẫn hoạt động bình thường. Nó không ảnh hưởng đến SEO của Google (tối ưu hóa công cụ tìm kiếm) hoặc tốc độ hiển thị trang Web, và nó không thay đổi khi có hoặc không có www.

#### HTTP localhost là gì ? 
Có một URL chẳng hạn như http://localhost:3000. localhost đề cập đến hệ thống hiện đang được sử dụng, giao tiếp với máy khách (máy cục bộ) như thể nó là một máy chủ, và chủ yếu thử nghiệm các ứng dụng và trang Web khi phát triển ứng dụng Web và tạo trang Web. Nó được sử dụng khi thực hiện sản xuất hoặc phát triển ứng dụng, web. 
- Hiện nay còn có nhiều phần mềm giả lập server:  XAMPP, MAMP, LAMP...

| Tên | Nguồn gốc của cái tên | Hệ điều hành | 
| --- | ---| --- |
| LAMP | <b>L</b>inux-<b>A</b>pache-<b>M</b>ySQL-<b>P</b>HP | Linux |
| MAMP | <b>M</b>ac-<b>A</b>pache-<b>M</b>ySQL-<b>P</b>HP | Mac OS X & OSS (phần mềm nguồn mở) |
| XAMPP | <b>X</b>(Windows、Linux、macOS、Solaris)-<b>A</b>pache-<b>M</b>ariaDB-<b>P</b>HP-<b>P</b>arl | Window & OSS (phần mềm nguồn mở) |


### 3. HTTP request và response ? 
Sử dụng HTTP hoặc HTTPS để giao tiếp đọc thông tin từ máy chủ Web hoặc gửi thông tin đến máy chủ Web bằng trình duyệt Web. HTTPS là một trao đổi HTTP được mã hóa bằng SSL/TLS và việc trao đổi này tuân theo HTTP, nhưng sử dụng cổng 443 thay vì cổng 80.
- Giao tiếp HTTP được thực thi khi máy khách gửi một request đến máy chủ và máy chủ xử lý request rồi trả về một response cho nó.
- Các request và response HTTP về cơ bản được trao đổi dưới dạng văn bản. Ngoài thông tin dạng văn bản, thông tin nhận được từ máy chủ cũng có thể lưu trữ dữ liệu nhị phân như là hình ảnh...

![image.png](https://images.viblo.asia/15998692-1d46-4c75-827a-9157dc01be67.png)
(chúng ta sẽ tìm hiểu chi tiết hơn về request và response ở bài sau nhé )

#### 4. Danh sách HTTP status code ?
HTTP status code (mã trạng thái) là mã code server trả về sau mỗi lần gửi request. Tất cả các request mà server nhận được đều sẽ được trả về 1 response với 1 mã code gồm 3 chữ số tương ứng. 
- HTTP status code giúp xác định request có thành công hay không, nếu thất bại thì nguyên nhân là gì.

HTTP status code được chia thành 5 loại khác nhau, mỗi loại bắt đầu với 1 chữ số khác nhau và mang ý nghĩa riêng:
- 1xx (Informational – Thông tin): Các status code loại này dùng để đơn giản thông báo với client rằng server đã nhận được request. Các status code này ít được sử dụng.
- 2xx (Sucess – Thành công): Các status code loại này có ý nghĩa rằng request được server xử lý thành công.
- 3xx (Redirect – Chuyển hướng): Các status code loại này có ý nghĩa rằng server sẽ chuyển tiếp request hiện tại sang một request khác và client cần thực hiện việc gửi request tiếp theo đó để có thể hoàn tất. Thông thường khi trình duyệt nhận được status code loại này nó sẽ tự động thực hiện việc gửi request tiếp theo để lấy về kết quả.
- 4xx (Client error – Lỗi Client): Các status code loại này có ý nghĩa rằng đã có lỗi từ phía client trong khi gửi request. Ví dụ như sai URL, sai HTTP method, không có quyền truy cập vào trang…
- 5xx (Server error – Lỗi Server): Các status code loại này có ý nghĩa rằng đã có lỗi từ phía server trong khi xử lý request. Ví dụ như server quá tải, hết bộ nhớ, lỗi kết nối database…

![image.png](https://images.viblo.asia/badca0cf-79b7-45e9-87d7-744b0fe869cd.png)

### Tài liệu tham khảo.
- https://developer.mozilla.org/en-US/docs/Web/HTTP
- https://www.cloudflare.com/learning/ssl/why-is-http-not-secure/#:~:text=HTTPS%20is%20HTTP%20with%20encryption,far%20more%20secure%20than%20HTTP.
- https://stackjava.com/uncategorized/http-status-code-la-gi-cac-loai-http-status-code.html