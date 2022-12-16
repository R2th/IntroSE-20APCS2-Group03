Nguồn: [https://stackjava.com/uncategorized/tao-ung-dung-facebook-de-dang-nhap-thay-tai-khoan.html](https://stackjava.com/uncategorized/tao-ung-dung-facebook-de-dang-nhap-thay-tai-khoan.html)
## Đăng nhập ứng dụng, web site bằng tài khoản facebook
Trong nhiều trường hợp, khi đăng nhập web, đăng ký ứng dụng, tài khoản… ta thường thấy có chức đăng nhập bằng facebook mà không cần tài khoản của trang web/ứng dụng đó.

Ví dụ đăng nhập trang itviec.com:

![](https://stackjava.com/wp-content/uploads/2018/04/login-with-facebook-2.png)



Tạo ứng dụng facebook để đăng nhập thay tài khoản

Vậy chức năng này hoạt động như nào?

Việc đăng nhập thông qua một bên thứ ba như facebook dựa trên cơ chế OAuth2.

Đầu tiên ta tạo một ứng dụng trên facebook (gọi tạm là ứng dụng A), khi người dùng click vào nút “Sign in with Facebook” thì nó sẽ chuyển hướng người dùng tới trang facebook để xác nhận có đồng ý cho phép ứng dụng A truy cập các thông tin tài khoản facebook của bạn không, nếu bạn đồng ý thì facebook sẽ gửi cho ứng dụng A một đoạn mã dùng để truy cập tài khoản facebook và lấy thông tin gửi về cho trang itviec.com, trang itviec.com dựa trên các thông tin đó để tạo cho bạn một tài khoản.


## Tạo ứng dụng trên facebook để đăng nhập
Truy cập trang web https://developers.facebook.com/ để tạo tài khoản.


![](https://stackjava.com/wp-content/uploads/2018/04/login-with-facebook-3.png)



Nhập tên ứng dụng. (Ở đây mình đặt tên là demo-login)


![](https://stackjava.com/wp-content/uploads/2018/04/login-facebook-2.png)




![](https://stackjava.com/wp-content/uploads/2018/04/login-facebook-3.png)



Tạo chức năng đăng nhập cho ứng dụng



![](https://stackjava.com/wp-content/uploads/2018/04/login-facebook-4.png)



Cấu hình trang web sử dụng ứng dụng demo-login để login bằng facebook. Ở đây trang web của mình là https://localhost:8443/AccessFacebook.



![](https://stackjava.com/wp-content/uploads/2018/04/login-facebook-6.png)



Phần URI chuyển hướng OAuth hợp lệ bạn sẽ nhập đường dẫn của server xử lý code gửi về từ facebook. (URI phải là https).

Khi bạn đồng ý cho ứng dụng truy cập tài khoản facebook thì facebook sẽ gửi cho bạn một chuỗi access code về địa chỉ URI này. Từ chuỗi access code này ta có thể lấy được token để gửi các request lấy thông tài khoản facebook như email, danh sách bạn bè, họ tên, ảnh đại diện…

Trong trường hợp này, khi người dùng chọn đăng nhập bằng facebook nó sẽ chuyển hướng tới trang facebook để xác nhận bạn có cho phép ứng dụng demo-login truy cập các thông tin tài khoản facebook không, nếu bạn đồng ý thì facebook sẽ gửi ngược lại một đoạn access code về https://localhost:8443/AccessFacebook/login-facebook


![](https://stackjava.com/wp-content/uploads/2018/04/login-facebook-5.png)


Cấu hình các thông tin của ứng dụng demo-login :

* Phần miền ứng dụng bạn điền tên miền trang web
* Phần URL chính sách quyền riêng tư và URL điều khoản dịch vụ bạn điền URL nơi đăng chính sách và điều khoản dịch vụ. (Mình nhập linh tinh là https://www.google.com.vn/) 2 trường này không không quan trọng nhưng bắt buộc phải có.
* Phần danh mục chọn gì tùy bạn (nhưng phải chọn)

![](https://stackjava.com/wp-content/uploads/2018/04/login-facebook-7.png)



Cuối cùng là bật (active) ứng dụng lên:


![](https://stackjava.com/wp-content/uploads/2018/04/login-facebook-8.png)


Dưới đây là code ví dụ đăng nhập ứng dụng web bằng tài khoản google:

[Code ví dụ JSP Servlet login bằng Facebook (Java Web).](https://stackjava.com/jsp-servlet/code-vi-du-jsp-servlet-login-bang-facebook-java-web.html)

[Code ví dụ Spring MVC Security, login bằng Facebook](https://stackjava.com/spring/code-vi-du-spring-mvc-security-login-bang-facebook.html)

[Code ví dụ Spring Boot Security login bằng Facebook](https://stackjava.com/spring/code-vi-du-spring-boot-security-login-bang-facebook.html)












Nguồn: [https://stackjava.com/uncategorized/tao-ung-dung-facebook-de-dang-nhap-thay-tai-khoan.html](https://stackjava.com/uncategorized/tao-ung-dung-facebook-de-dang-nhap-thay-tai-khoan.html)