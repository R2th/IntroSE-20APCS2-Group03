# 1.API 
## 1.1 API là gì?
- API là viết tắt của Application Programming Interface, phương thức kết nối với các thư viện và ứng dụng khác. 
- API là một trung gian phần mềm cho phép hai ứng dụng giao tiếp với nhau.

Ví dụ: 
Bằng tài khoản Facebook có thể đăng nhập vào rất nhiều trang web không do Facebook kiểm soát. Để người dùng có thể sử dụng thông tin cá nhân Facebook trên các trang khác, Facebook  tạo ra một API đăng nhập tài khoản Facebook => click vào nút "Đăng nhập với Facebook" trên Instagram, WhatsApp v.v... => các trang web/ứng dụng này sẽ "gọi" tới API của Facebook => Facebook xác thực danh tính =>  Báo về các trang Instagram, WhatsApp đã login => Login thành công trên các trang Instagram, WhatsApp v.v...
- Tính bảo mật của API: Người dùng sẽ không chia sẻ toàn bộ dữ liệu cá nhân của mình với server. Và ngược lại, server cũng không truy xuất toàn bộ dữ liệu mà nó có. Thay vào đó, mỗi giao tiếp chỉ chuyển các gói dữ liệu nhỏ cần thiết.
## 1.2. Ưu điểm của API 
* Kết nối mọi lúc nhờ vào Internet.
* Giao tiếp hai chiều phải được xác nhận trong các giao dịch.
* Vì giao tiếp là API hai chiều nên thông tin rất đáng tin cậy.
* Cung cấp  trải nghiệm thân thiện với người dùng.
* Cấu hình đơn giản khi được so sánh với WCF.
* Mã nguồn mở.
* Hỗ trợ chức năng RESTful một cách đầy đủ.
* Hỗ trợ đầy đủ các thành phần MVC như: routing, controller, action result, filter, model binder, IoC container, dependency injection, unit test.
## 1.3. Khuyết điểm của API
* Tốn nhiều chi phí phát triển, vận hành, chỉnh sửa.
* Đòi hỏi kiến thức chuyên sâu.
* Có thể gặp vấn đề bảo mật khi bị tấn công hệ thống.

# 2. Web API
## 2.1 Web API là gì?
- Web API là một phương thức dùng để cho phép các ứng dụng khác nhau có thể giao tiếp, trao đổi dữ liệu qua lại. Dữ liệu được Web API trả lại thường ở dạng JSON hoặc XML thông qua giao thức HTTP hoặc HTTPS.
## 2.2 Ưu điểm
- Web API hỗ trợ restful đầy đủ các phương thức: Get/Post/put/delete dữ liệu. Nó giúp bạn xây dựng các HTTP service một cách rất đơn giản và nhanh chóng. Nó cũng có khả năng hỗ trợ đầy đủ các thành phần HTTP: URI, request/response headers, caching, versioning, content forma.
- Hỗ trợ đầy đủ các thành phần MVC như: routing, controller, action result, filter, model binder, IoC container, dependency injection, unit test.
## 2.3 Phương thức hoạt động 
* Đầu tiên là xây dựng URL API để bên thứ ba có thể gửi request dữ liệu đến máy chủ cung cấp nội dung, dịch vụ thông qua giao thức HTTP hoặc HTTPS.
* Tại web server cung cấp nội dung, các ứng dụng nguồn sẽ thực hiện kiểm tra xác thực nếu có và tìm đến tài nguyên thích hợp để tạo nội dung trả về kết quả.
* Server trả về kết quả theo định dạng JSON hoặc XML thông qua giao thức HTTP/HTTPS.
* Tại nơi yêu cầu ban đầu là ứng dụng web hoặc ứng dụng di động , dữ liệu JSON/XML sẽ được parse để lấy data. Sau khi có được data thì thực hiện tiếp các hoạt động như lưu dữ liệu xuống Cơ sở dữ liệu, hiển thị dữ liệu…

# 3.RESTful API
## 3.1 RESTful API là gì?
- RESTful API (REpresentational State Transfer)  là một tiêu chuẩn dùng trong việc thiết kế API cho các ứng dụng web (thiết kế Web services) để tiện cho việc quản lý các resource. Nó chú trọng vào tài nguyên hệ thống (tệp văn bản, ảnh, âm thanh, video, hoặc dữ liệu động…), bao gồm các trạng thái tài nguyên được định dạng và được truyền tải qua HTTP.
## 3.2 Phương thức hoạt động 
- Chức năng quan trọng nhất của REST là quy định cách sử dụng các HTTP method (như GET, POST, PUT, DELETE…) và cách định dạng các URL cho ứng dụng web để quản các resource. RESTful không quy định logic code ứng dụng và không giới hạn bởi ngôn ngữ lập trình ứng dụng, bất kỳ ngôn ngữ hoặc framework nào cũng có thể sử dụng để thiết kế một RESTful API.
* GET (SELECT): Trả về một Resource hoặc một danh sách Resource.
* POST (CREATE): Tạo mới một Resource.
* PUT (UPDATE): Cập nhật thông tin cho Resource.
* DELETE (DELETE): Xoá một Resource.
Những phương thức hay hoạt động này thường được gọi là CRUD tương ứng với Create, Read, Update, Delete – Tạo, Đọc, Sửa, Xóa.
- RESTful API không sử dụng session và cookie, nó sử dụng một access_token với mỗi request.

# 4.Status code
Khi chúng ta request một API nào đó thường thì sẽ có vài status code để nhận biết sau:
* 200 OK – Trả về thành công cho những phương thức GET, PUT, PATCH hoặc DELETE.
* 201 Created – Trả về khi một Resouce vừa được tạo thành công.
* 204 No Content – Trả về khi Resource xoá thành công.
* 304 Not Modified – Client có thể sử dụng dữ liệu cache.
* 400 Bad Request – Request không hợp lệ
* 401 Unauthorized – Request cần có auth.
* 403 Forbidden – bị từ chối không cho phép.
* 404 Not Found – Không tìm thấy resource từ URI
* 405 Method Not Allowed – Phương thức không cho phép với user hiện tại.
* 410 Gone – Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.
* 415 Unsupported Media Type – Không hỗ trợ kiểu Resource này.
* 422 Unprocessable Entity – Dữ liệu không được xác thực
* 429 Too Many Requests – Request bị từ chối do bị giới hạn

**Xem thêm:**

## 1.Bổ sung giải thích các thuật ngữ khác

### 1.1.JSON 

- Là viết tắt của JavaScript Object Notation, là một kiểu định dạng dữ liệu tuân theo một quy luật nhất định mà hầu hết các ngôn ngữ lập trình hiện nay đều có thể đọc được.

### 1.2.XML 

- Là viết tắt của Extensible Markup Language (Ngôn ngữ đánh dấu mở rộng). Đây là một tập hợp con đơn giản có thể mô tả nhiều loại dữ liệu khác nhau nên rất hữu ích trong việc chia sẻ dữ liệu giữa các chương trình, hệ thống.

### 1.3 WCF

- WCF (windows communication foundations) là mô hình phát triển ứng dụng hướng dịch vụ trên nền tảng của Microsoft. 

### 1.4 MVC 

- MVC là từ viết tắt bởi 3 từ Model – View – Controller. Đây là mô hình thiết kế sử dụng trong kỹ thuật phần mềm. Mô hình source code thành 3 phần, tương ứng mỗi từ. Mỗi từ tương ứng với một hoạt động tách biệt trong một mô hình.

### 1.5 IoC container

- IoC (inversion of control): được hiểu là một nguyên lý thiết kế trong công nghệ phần mềm

### 1.6 Model Binding

- Model Binding là cơ chế map dữ liệu được gửi qua HTTP Request vào các tham số của action method trong Controller. 

### 1.7 Dependency injection

- Dependency injection có thể hiểu, việc chuyển giao nhiệm vụ khởi tạo object đó cho một ai khác và trực tiếp sử dụng các dependency đó được gọi là dependency injection.

### 1.8 UT (unit test)

- Trong kiểm thử phần mềm có 4 mức độ kiểm thử: Unit test ( kiểm thử mức đơn vị), Intergration test ( kiểm thử tích hợp), System test (kiểm thử hệ thống), Acceptance test (kiểm thử chấp nhận).
- Unit test là mức độ kiểm thử nhỏ nhất trong quy trình kiểm thử phần mềm. Unit test kiểm thử các đơn vị nhỏ nhất trong mã nguồn như method, class, module...