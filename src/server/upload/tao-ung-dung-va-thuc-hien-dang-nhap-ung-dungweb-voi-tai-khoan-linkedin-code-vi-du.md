Nguồn: [https://stackjava.com/install/tao-ung-dung-linkedin-de-dang-nhap-thay-tai-khoan.html](https://stackjava.com/install/tao-ung-dung-linkedin-de-dang-nhap-thay-tai-khoan.html)

Tạo ứng dụng Linkedin để đăng nhập thay tài khoản

(Xem thêm: [Tạo ứng dụng facebook để đăng nhập thay tài khoản](https://stackjava.com/uncategorized/tao-ung-dung-facebook-de-dang-nhap-thay-tai-khoan.html))

(Xem thêm: [Tạo ứng dụng google+ để đăng nhập thay tài khoản](https://stackjava.com/install/tao-ung-dung-google-de-dang-nhap-thay-tai-khoan.html))
## Đăng nhập ứng dụng, web site bằng tài khoản Linkedin
(Linkedin là một mạng xã hội về kinh doanh và định hướng việc làm, bạn muốn tìm việc hay tuyển dụng thì cứ lên linkedin.com mà đăng bài)

Tương tự như việc dùng tài khoản google hoặc facebook để đăng nhập các ứng dụng/webiste. Việc dùng tài khoản linkedin để đăng nhập ứng dụng/web site khác phổ biến.
Ví dụ:
![](https://stackjava.com/wp-content/uploads/2018/04/create-linkedin-app-0.png)

## Tạo app trên linkedin để áp dụng chức năng đăng nhập với linkedin
Truy cập trang https://www.linkedin.com/developer/apps để tạo ứng dụng (trước đó bạn đã phải tạo và đăng nhập tài khoản linkedin rồi nhé)

Chọn menu “My Apps” rồi sau đấy click vào button “Create Application”
![](https://stackjava.com/wp-content/uploads/2018/04/create-linkedin-app-1.png)

Nhập thông tin cho ứng dụng (nếu bạn chỉ làm demo thì nhập linh tinh cho nó đủ các trường bắt buộc là được):

![](https://stackjava.com/wp-content/uploads/2018/04/create-linkedin-app-2.png)

Sau khi submit nó sẽ tạo một ứng dụng với Client ID và Client Secret như dưới đây.

Chọn các quyền mà ứng dụng của bạn muốn truy cập ở mục “Default Application Permissions”:

* Ở đây mình chỉ sử dụng để đăng nhập nên chỉ cần quyền r_basicprofile (các thông tin cơ bản như id, name)

Ở mục OAuth 2.0 nhập url mà server của bạn sẽ dùng để xử lý code trả về từ linkedin.

Click Update.

![](https://stackjava.com/wp-content/uploads/2018/04/create-linkedin-app-3.png)

Okay, done!

Tạo ứng dụng trên linked đơn giản thế thôi chứ không phức tạp như tạo ứng dụng trên facebook, google.

Dưới đây là code ví dụ thực hiện đăng nhập ứng dụng web bằng tài khoản linkedin:

* [Code ví dụ JSP Servlet đăng nhập (login) bằng Linkedin](https://stackjava.com/jsp-servlet/code-vi-du-jsp-servlet-dang-nhap-login-bang-linkedin.html)
*  [Code ví dụ Spring Boot Security đăng nhập bằng Linkedin](https://stackjava.com/spring/code-vi-du-spring-boot-security-dang-nhap-bang-linkedin.html)
*  [Code ví dụ Spring MVC Security đăng nhập bằng LinkedIn](https://stackjava.com/spring/code-vi-du-spring-mvc-security-dang-nhap-bang-linkedin.html)

Nguồn: [https://stackjava.com/install/tao-ung-dung-linkedin-de-dang-nhap-thay-tai-khoan.html](https://stackjava.com/install/tao-ung-dung-linkedin-de-dang-nhap-thay-tai-khoan.html)