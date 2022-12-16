# Introduction
- Để tìm hỗ hổng bảo mật trong một ứng dụng Web, cần phải dành thời gian tìm hiểu trước về framework xây dựng ra nó.
- Trong bài viết này, tôi sẽ giới thiệu tới các bạn một Framework để xây dựng website đó là CakePHP. Sau khi đọc bài viết, các bạn sẽ có kiến thức căn bản về CakePHP và có thể kiểm soát được các lỗi bảo mật trong Framework này.
- CakePHP version tại thời điểm viết bài là 3.8.4. Theo dõi cập nhật [tại đây](https://github.com/cakephp/cakephp).

# Framework Overview
- CakePHP là một framework phát triển web chạy trên PHP. Giống như những Framework phổ biến khác, nó được xây dựng theo mô hình MVC.

![](https://images.viblo.asia/a1fccdfa-3f1d-42cd-9530-d7b4c8735831.png)

- Quá trình request có thể được mô tả như sau:
    + Request gửi từ HTTP client được xử lý bởi **Controller**.
    + Controller tương tác với **Model** để lấy dữ liệu.
    + Cuối cùng, dữ liệu được hiển thị lên **View** cho client.

# Application Routes
- **Controller** đóng vai trò quan trọng trong việc xử lý request. Nó là điển hình để nhìn thấy một path như là "/Articles" được xử lý bởi lớp ArticlesController.php. Controller được đặt tên theo quy ước: [Conventions](https://book.cakephp.org/3.0/en/intro/conventions.html)

![](https://images.viblo.asia/59330866-1e97-48df-8685-f437882c6111.png)

- Tuy nhiên, "**routes.php**" (app/Config) có thể sửa đổi để định nghĩa routes tùy chỉnh. Ví dụ như trên, nếu ta muốn MyArticles là đường dẫn mặc định ta sẽ cấu hình trong routes.php như sau:
![](https://images.viblo.asia/1f79ec9a-45fe-4b3b-9ed1-8ac1bf43b5e3.png)

- Kết quả sau cấu hình:
![](https://images.viblo.asia/ff86d515-910b-4546-9e9e-20c330c0640b.png)

- Framework tích hợp **RoutesShell** có thể được sử dụng để liệt kê tất cả các routes. Trong thư mục project chạy lệnh: ***bin/cake routes***.
- Tham khảo thêm [routing documentation](https://book.cakephp.org/3.0/en/development/routing.html)

# Model
- Cũng giống như các Framework khác, CakePHP sử dụng *Object-relational mapping (ORM)* để giúp Dev tương tác với Database một cách đơn giản.
- ORM là một thứ "magic" đằng sau Model. Model bao gồm các *Table* và *Entity*, biểu diễn cho các bảng cơ sở dữ liệu. Bạn có thể tìm thấy table và entity trong project theo đường dẫn *src/Model/Table* và *src/Model/Entity*.
![](https://images.viblo.asia/c779a131-392f-4b1c-9279-fc33fc93d353.png)

- Đối với việc truy vấn database nếu không cẩn thận có thể bị lợi dụng lỗ hỏng *SQL injection* (SQLi).  Tuy nhiên, việc phát hiện ra các lỗ hổng SQLi không phải là rõ ràng trong tất cả các phần. Bạn có thể tìm hiểu về SQL injection [tại đây](https://book.cakephp.org/3.0/en/orm/query-builder.html#sql-injection-prevention)

# View
- View có nhiệm vụ hiển thị giao diện cho client có thể là HTML, XML, JSON, PDF file...
- Cake sử dụng [view template files](https://book.cakephp.org/3.0/en/views.html#view-templates) (.ctp) để xử lý hiển thị data gửi về.
- Các file được đặt trong folder "src/Template" và tên được đặt theo Controller sử dụng file đó, và theo hành động tương ứng với nó.
- Ví dụ: 
![](https://images.viblo.asia/b2811c44-3f27-4cb6-88ad-889b47434778.png)

- View templates "sử dụng cú pháp PHP thay thế cho các cấu trúc điều khiển và output" vì thế ban đầu trông nó hơi lạ. Ví dụ cho vòng lặp "*foreach*":
![](https://images.viblo.asia/7e993c1f-4519-41a4-b47d-4280f739e949.png)

- Để truyền Data từ Controller sang View ta sử dụng method "*set*". [Documentation for setting view variables](https://book.cakephp.org/3.0/en/controllers.html#setting-view-variables).
![](https://images.viblo.asia/e8aaab9e-94eb-4038-a176-b0891ca1ee47.png)
- Và trong View ta lấy ra giá trị đó như sau:
![](https://images.viblo.asia/0ef284d1-540b-40c2-b4d1-a62e4b4daa0a.png)

- CakePHP cung cấp một method "*h()*", nó là một wrapper cho [*htmlspecialchars()*](https://www.php.net/manual/en/function.htmlspecialchars.php) và mục đích của nó là mã hóa dữ liệu đầu ra.
- Ngoài ra, còn có các component như [layouts](https://book.cakephp.org/3.0/en/views.html#layouts), [elements](https://book.cakephp.org/3.0/en/views.html#elements), [view blocks](https://book.cakephp.org/3.0/en/views.html#using-view-blocks)

# Controller
- Routing quy định Controller nào sẽ xử lý request. Controller logic dựa trên các *actions*. Actions được định nghĩa như các *public method* trong Controller.
- Những method sẽ xử lý request và trả về response (thường là một View).
- Ví dụ một path để kích hoạt action *update* trong ArticlesController như sau *"/Articles/update"*:
![](https://images.viblo.asia/bf4f3673-6b48-4685-9203-a0b61372e3f4.png)

- Code:
![](https://images.viblo.asia/17d60a28-d19b-49d7-9989-b1fbac8d0166.png)

- ***Note***: Tất cả các Controller sẽ kế thừa từ **AppController** (Hãy ghi nhớ điều này). Còn có một **PagesController** mặc định để phục vụ nội dung tĩnh.
- Trong tài liệu có đề cập đến các [callback methods](https://book.cakephp.org/3.0/en/controllers.html#controller-callback-methods), trong đó có **beforeFilter** - method được gọi trước tất cả các action trong Controller. Method này được sử dụng trong [AuthenticationComponent](https://book.cakephp.org/3.0/en/controllers/components/authentication.html#making-actions-public) để cho phép một action được truy cập công khai. Ví dụ: định nghĩa method sau đây sẽ cho phép truy cập action mà không cần phải xác thực ([Authorization](https://book.cakephp.org/3.0/en/tutorials-and-examples/blog-auth-example/auth.html))

![](https://images.viblo.asia/55a2ad97-0a96-4e6f-a169-5c59af7eb0db.png)

# HTTP Requests
- Với CakePHP ta không cần sử dụng $_GET và $_POST để lấy ra request. CakePHP cung cấp cho chúng ta một đối tượng đó là **request**.
- Ví dụ một số biểu thức thường sử dụng:
![](https://images.viblo.asia/2733187d-e948-4f77-b227-1dc7650be49b.png)

- Đối tượng *request* cũng bao gồm *session data*. Session data có thể truy cập từ Controller, View, Helper, Cell và Component. Chúng ta không cần sử dụng $_SESSION nữa! Tài liệu về [Session](https://book.cakephp.org/3.0/en/development/sessions.html#accessing-the-session-object)
![](https://images.viblo.asia/3d661d2e-2c25-4a21-8087-f6c9defde3e9.png)
- Đọc thêm tài liệu về [Cake request docs](https://book.cakephp.org/3.0/en/controllers/request-response.html#cake-request)

# Middleware
- [Middleware](https://book.cakephp.org/3.0/en/controllers/middleware.html) có thể được sử dụng để sửa đổi requests và responses. Mọi dữ liệu do người dùng kiểm soát từ HTTP client có thể truy cập bằng middleware.
- Tùy vào từng ứng dụng, có thể có nhiều lớp middleware xử lý một request trước khi nó đến Controller. Hãy ghi nhớ mỗi ứng dụng sẽ có các middleware khác nhau.
![](https://images.viblo.asia/ec395f96-0641-4404-acc7-5b20096e0fa6.png)

- Một Middleware có thể được áp dụng cho toàn bộ ứng dụng hoặc áp dụng cho phạm vi cụ thể. Hãy xem src/Application.php và config/routes.php để hiểu cách sử dụng Middleware.
- Các lớp MIddleware nên được đặt trong thư mục src/Middleware. Trong CakePHP có tích hợp một số Middleware như: 
    - [CsrfProtectionMiddleware](https://book.cakephp.org/3.0/en/controllers/middleware.html#cross-site-request-forgery-csrf-middleware)
    - [SecurityHeadersMiddleware](https://book.cakephp.org/3.0/en/controllers/middleware.html#security-header-middleware)
    - [EncryptedCookieMiddleware](https://book.cakephp.org/3.0/en/controllers/middleware.html#encrypted-cookie-middleware)
    
# Security
- Ngoài một số Middleware để cập ở trên, CakePHP cung cấp một số tool để giúp nhà phát triển tăng cường bảo mật như [Security Utility](https://book.cakephp.org/3.0/en/core-libraries/security.html) và [Security Component](https://book.cakephp.org/3.0/en/controllers/components/security.html). Nó xử lý các nhiệm vụ như encryption, hashing, enforing SSL...

# Kết luận
- Trong bài viết này, mình đã giới thiệu một cách tổng quan nhất về framwork CakePHP. Từ đây bạn hoàn toàn có thể tự tin bắt đầu với Framework này, nó không phải là quá khó. Sự khác biệt chính là framework đóng gói dữ liệu theo cách riêng của nó, một khi bạn đã hiểu rõ cách thức hoạt động của nó thì nó thực sự rất đơn giản.
- Bạn có thể tham khảo thêm tài liệu mình để phía dưới nhé ^.^

# Tài liệu tham khảo
- [Intro to CakePHP for Bug Hunters](https://medium.com/tenable-techblog/intro-to-cakephp-for-bug-hunters-97b89f8876bd)
- [CakePHP Cookbook](https://cakephp.org/)