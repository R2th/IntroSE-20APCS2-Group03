# Sails.js là gì?

Sails.js được xây dựng dựa trên Express.js (Express là 1 Framework của Node.js), cộng với các chức năng nâng cao giúp giảm thiếu tối đa thời gian lập trình.

Sails.js kế thừa mô hình MVC (Model-View-Controller), cơ chế hoạt động khá giống các Framework của PHP như Laravel,…

Sails.js được tích hợp Socket.io, cực kỳ thích hợp cho ứng dụng chat hoặc trò trơi trực tuyến.

# Đặc điểm

**100% JavaScript**

Xây dựng trên Sails có nghĩa là ứng dụng của bạn được viết hoàn toàn bằng JavaScript, ngôn ngữ mà bạn và nhóm của bạn đã sử dụng trong trình duyệt.

**Any database**

Sails bundles là một ORM mạnh mẽ, cung cấp lớp truy cập dữ liệu đơn giản để làm việc, bất kể bạn đang sử dụng cơ sở dữ liệu nào.

**Auto-generated REST APIs**

Sails đi kèm với bản thiết kế giúp khởi động phần phụ trợ của ứng dụng mà không cần viết bất kỳ mã nào.

**Front-end agnostic**

Sails tương thích với mọi front-end: Angular, React, iOS, Android, Windows Phone, phần cứng tùy chỉnh hoặc những thứ khác hoàn toàn.


**Easy WebSocket integration**

Sails dịch các socket messages đến cho bạn, chúng tự động tương thích với mọi tuyến đường trong ứng dụng Sails của bạn.


**Professional support**

Sails cung cấp hỗ trợ thương mại để tăng tốc phát triển và đảm bảo thực hành tốt nhất trong code của bạn.

# Cấu trúc thư mục

```
- api
- app.js
- assets
- config
- Gruntfile.js
- node_modules
- package.json
- README.md
- tasks
- views
```

api là thư mục chưa toàn bộ core của api bao gồm controllers, models, policies, responses, services … Controllers và models sẽ được khởi tạo khi chạy lệnh: `sails generate api users`

```
- controllers/
--- UserController.js
- models/
--- User.js
- policies/
--- sessionAuth.js
- responses/
--- badRequest.js
--- forbidden.js
--- notFound.js
- services/
```

assets là thư mục chứa ảnh, js, style css, template ..

```
- assets
--- images
--- js
--- styles
--- templates
```

config là thư mục chứa tất cả các config của ứng dụng như biến môi trường ENV, routes, session … 

tasks là thư mục chứa các tasks để sync, copy, minify như uglify, concat, cssmin … 

views là thư mục chưa toàn bộ view response như 403.ejs, 500.ejs, layout.ejs 

appjs chính là linh hồn của ứng dụng, là file core của mọi ứng dụng Nodejs.

# Lifecycle

**(1) Load Configuration "Overrides"**

Tập hợp các giá trị config được truyền vào trong command line, trong các biến môi trường và trong config programmatic (nghĩa là các tùy chọn được truyền cho sails.load hoặc sails.lift.). Khi một ứng dụng được khởi động thông qua giao diện command-line (tức là bằng cách gõ sails lift hoặc sails console), các giá trị của bất kỳ tệp .sailsrc nào cũng sẽ được hợp nhất vào phần config overrides. Các giá trị overrides này sẽ được ưu tiên hơn bất kỳ config người dùng nào gặp phải trong bước tiếp theo.

**(2) Load User Configuration**

Trừ khi hook userconfiguration bị vô hiệu hóa rõ ràng, Sails tiếp theo sẽ tải các tệp cấu hình trong thư mục config (và các thư mục con) bên dưới thư mục làm việc hiện tại.
Xem [Concepts > Configuration](https://sailsjs.com/documentation/concepts/configuration) để biết thêm chi tiết về cấu hình người dùng. Cài đặt cấu hình từ bước 1 sẽ được hợp nhất trên đầu các giá trị này để tạo thành đối tượng sails.config.

**(3) Load Hooks**

Tiếp theo, Sails sẽ tải các hook khác. Core hooks sẽ tải trước, tiếp theo là user hooks và installable hooks. Lưu ý rằng các hook thường bao gồm cấu hình của riêng chúng sẽ được sử dụng làm giá trị mặc định trong sails.config. Ví dụ: nếu không có cài đặt port nào được cấu hình vào thời điểm này, giá trị mặc định của http hook  là 1337 sẽ được sử dụng.


**(4) Assemble Router**

Sails chuẩn bị core Router, sau đó emit nhiều sự kiện trên đối tượng sails thông báo các hook mà họ có thể bind routes một cách an toàn.

**(5) Expose global variables**

Sau khi tất cả các hook đã được khởi tạo, Sails hiển thị các biến toàn cục (theo mặc định: sails object, models, services, _ và async)

**(6) Initialize App Runtime**

Bước này không chạy khi sử dụng sails.load (). Để chạy bước Initialize, thay vào đó, hãy sử dụng sails.lift()

Chạy function bootstrap (sails.config.bootstrap)

Bắt đầu đính kèm servers (theo mặc định: Express và Socket.io)

# Tổng kết
Trên đây là phần tìm hiểu cơ bản về sails js.. chúng ta sẽ tìm hiểu chi tiết hơn ở phần sau

Tài liệu tham khảo

[https://sailsjs.com/documentation/reference/application/advanced-usage/lifecycle](https://sailsjs.com/documentation/reference/application/advanced-usage/lifecycle)

[https://sailsjs.com/](https://sailsjs.com/)