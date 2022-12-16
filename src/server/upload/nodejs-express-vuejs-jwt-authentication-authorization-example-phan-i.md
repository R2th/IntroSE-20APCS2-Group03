# I. Giới thiệu
Trong hướng dẫn này, chúng ta sẽ học cách xây dựng một ví dụ về  Authentication & Authorization với Node.js Express + Vue.js. Back-end sử dụng Node.js Express với jsonwebtoken để xác thực JWT và Sequelize để tương tác với cơ sở dữ liệu MySQL & Ủy quyền. Giao diện người dùng sẽ được tạo bằng Vue và Vuex. Chúng tôi cũng sẽ sử dụng vee-validate để thực hiện xác thực Biểu mẫu và vue-fontawesome để làm cho giao diện người dùng đẹp hơn.

Bài viết được chia làm 3 phần chính, ở phần mở đầu này mình chủ yếu giới thiệu về giao diện và luồng hoạt động của ứng dụng.

# II. JWT (JSON Web Token)

So với Xác thực dựa trên Session-based cần lưu trữ Session trên Cookie, lợi thế lớn của Token-based Authentication là chúng tôi lưu trữ JSON Web Token (JWT) ở phía Client: Local Storage trên Browser, Keychain trên IOS và SharedPreferences trên Android…

Vì vậy, chúng ta không cần phải xây dựng một dự án vệ tinh hoặc một module xác thực bổ sung để hỗ trợ cho ứng dụng không dùng trên trình duyệt (ví dụ như các ứng dụng mobile Android, iOS…)

Dưới đây là sơ đồ luồng hoạt động của JWT.

![](https://images.viblo.asia/fc698c77-ea96-4b0b-b744-a75a5a305066.png)

Có 3 thành phần quan trọng của JWT:

* Header
* Payload
* Signature

Chúng được kết hợp với nhau tạo thành một cấu trúc tiêu chuẩn:
```php
header.payload.signature
```
Ứng dụng Client thường đính kèm mã JWT vào header với tiền tố Bearer:
```php
Authorization: Bearer [header].[payload].[signature]
```
Hoặc chỉ cần thêm một trường x-access-token trong header
```php
x-access-token: [header].[payload].[signature]
```

III. Ví dụ Node.js Express Vue.js Authentication
Ứng dụng sử dụng Node.js Express cho back-end và Vue.js cho front-end. Quyền truy cập được xác thực bởi JWT Authentication.

* Người dùng có thể đăng ký tài khoản mới, đăng nhập bằng username & password.
* Ủy quyền theo vai trò của User(admin, moderator, user)

## 1. Screenshots

Bên dưới là ảnh chụp màn hình của App Vue.js.

- Bất kỳ ai cũng có thể truy cập trang Home trước khi đăng nhập:

![](https://images.viblo.asia/c3cd789a-dce8-4e84-be00-ba414a05ab0a.png)

– Một người dùng mới có thể đăng ký tài khoản.

![](https://images.viblo.asia/42e8a266-1cba-4891-99ad-d524b457c167.png)

- Bây giờ User có thể Đăng nhập. Nếu thành công, App sẽ hướng User đến trang Profile:

![](https://images.viblo.asia/9601d196-2438-4b05-8609-e4ed2a540b71.png)

– Giao diện của admin

![](https://images.viblo.asia/5d310394-9571-48f4-bee2-bf3f3bde3cdf.png)

- Nếu Người dùng không có vai trò Admin nhưng cố gắng truy cập trang Admin/Moderator:

![](https://images.viblo.asia/d8fac0e7-2ba2-4378-8a3b-43b93876414f.png)

# IV. Flow for User Registration and User Login

Dưới đây là diagram miêu tả quy trình mà ứng dụng Node.js sẽ thực hiện cho các tính năng Authentication (User Registration, User Login) và Authorization (phân quyền).

![](https://images.viblo.asia/985ae3a6-f36e-4ddd-8e01-6835262b89ca.png)

Chúng ta có 2 api để xác thực:

* api/auth/signup để đăng ký user
* api /aut /signin để đăng nhập

Một JWT hợp lệ để truy cập vào tài nguyên hệ thống phải có trường x-access-token trong Header của HTTP.

# V. Back-end with Node.js Express & Sequelize

## 1. Overview

Hình dưới đây mô tả tổng quan kiến trúc ứng dụng sử dụng Node.js + Express cho authentication & authorization.

![](https://images.viblo.asia/4b04b2ee-d067-4bc7-8aa1-85fbebec41a7.png)

Thông qua Express, các HTTP request hợp lệ và đúng với route đã thiết kế (xem lại bảng 3.1- danh sách các API sử dụng trong app) sẽ được kiểm tra bởi CORS Middleware trước khi vào Security layer.

Security layer bao gồm:

* JWT Authentication Middleware: có nhiệm vụ xác minh SignUp, chuỗi token.
* Authorization Middleware: Kiểm tra role của người dùng đăng nhập với các thông tin được lưu trong cơ sở dữ liệu.

Nếu gặp bất kỳ lỗi nào trong toàn bộ quá trình trên sẽ lập tức phản hồi lại cho client dưới dạng HTTP response (error code).

Các kỹ thuật được sử dụng ví dụ này (phiên bản có thể khác trong tương lai nhưng chắc không vấn đề gì đâu):

## 2. Technology

* Express 4.17.1
* bcryptjs 2.4.3
* jsonwebtoken 8.5.1
* Sequelize 5.21.3
* MySQL

## 3. Project Structure

Dưới đây là cấu trúc thư mục Node.js Express của dự án trong bài viết này:

![](https://images.viblo.asia/a145db35-a0f1-4fa9-b29f-2e28125a6f4f.png)

– config

* configure MySQL database & Sequelize
* configure Auth Key

– routes

* auth.routes.js: POST signup & signin
* user.routes.js: GET public & protected resources

– middlewares

* verifySignUp.js: check duplicate Username or Email
* authJwt.js: verify Token, check User roles in database

– controllers

* auth.controller.js: handle signup & signin actions
* user.controller.js: return public & protected content

– models for Sequelize Models

* user.model.js
* role.model.js

– server.js: import and khởi tạo các modules and routes, lắng nghe connections.

# VI. Front-end with Vue.js & Vuex

## 1.Overview

Dưới đây là sơ đồ luồng hoạt động của ứng dụng với Vue.js

![](https://images.viblo.asia/997d97cd-932e-4ec7-b4e2-a5932aaa37e5.png)

## 2. Technology

* vue: 2.6.10
* vue-router: 3.0.3
* vuex: 3.0.1
* axios: 0.19.0
* vee-validate: 2.2.15
* bootstrap: 4.3.1
* vue-fontawesome: 0.1.7

## 3. Project Structure

- Cấu trúc dự án front-end với Vue trong bài hướng dấn này.

![](https://images.viblo.asia/bb9e2508-c953-490c-af29-35571644532e.png)

# VII. Kết luận

Bây giờ chúng ta đã có một cái nhìn tổng quan về ví dụ Authentication Node.js Express + Vue.js sử dụng JWT và Vuex cùng với quy trình cho các hành động signup/login.

Chúng tôi cũng xem xét kiến ​​trúc máy chủ Node.js Express cho Xác thực JWT sử dụng jsonwebtoken & Sequelize, cũng như cấu trúc dự án Vue.js để xây dựng ứng dụng front-end hoạt động với JWT.

Các bài hướng dẫn tiếp theo chúng ta sẽ đi chi tiết hơn về cách triển phần Back-end

Chúc các bạn học vui vẻ, hẹn gặp lại!