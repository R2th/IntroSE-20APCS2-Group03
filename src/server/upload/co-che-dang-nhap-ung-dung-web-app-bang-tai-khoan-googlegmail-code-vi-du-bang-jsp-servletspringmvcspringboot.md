### Nguồn: [https://stackjava.com/install/tao-ung-dung-google-de-dang-nhap-thay-tai-khoan.html](https://stackjava.com/install/tao-ung-dung-google-de-dang-nhap-thay-tai-khoan.html)
Trong nhiều trường hợp, khi đăng nhập web, đăng ký ứng dụng, tài khoản… ta thường thấy có chức đăng nhập bằng tài khoản google+ mà không cần tài khoản của trang web/ứng dụng đó.

Ví dụ đăng nhập trang itviec.com:

![](https://stackjava.com/wp-content/uploads/2018/04/login-with-facebook-2.png)


Việc đăng nhập thông qua một bên thứ ba như google dựa trên cơ chế OAuth2.

Khi bạn chấp nhận đăng nhập bằng tài khoản google, ứng dụng web sẽ yêu cầu truy cập một số thông tin trong tài khoản google của bạn, để từ đó tự động đăng ký tài khoản và tiến hành đăng nhập.
## Tạo google app để đăng nhập với google
Truy cập [Google API Console](https://console.developers.google.com/project/_/apiui/apis/library) để tạo ứng dụng. (bạn cũng có thể sử dụng lại ứng dụng đã tạo trước đó)

![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app.png)


Nhập tên và id cho ứng dụng.

![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-1.png)


Kích hoạt dịch vụ Google+ API bằng cách:

* Nhập google+ API vào ô search
* Chọn mục Google+ API
* Ấn nút enable và chờ API được kích hoạt
![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-2.png)

![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-3.png)

Tạo chứng nhận cho API như sau:

* Chọn mục “Credentials” ở bên trái và chọn tab “OAuth consent screen”
* Chọn Email Address, nhập Product Name, và lưu lại.


![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-4.png)

Chuyển sang tab Credentials.

* Click button “Create credentials và chọn “OAuth client ID”

![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-5.png)


Phần application type chọn “Web application” (Ở đây mình sử dụng để đăng nhập cho ứng dụng web)

Phần “Authorized JavaScript origins” nhập tên miền của ứng dụng web

Phần “Authorized redirect URI” nhập đường dẫn của server xử lý code gửi về từ google.

![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-6.png)


Sau khi tạo nó sẽ hiện ra client ID và client secret

![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-7.png)

Bạn cũng có thể xem lại chi tiết về client id và client secret bằng cách chọn vào tên của credential vừa tạo ở tab “Credentials”

![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-8.png)

![](https://stackjava.com/wp-content/uploads/2018/04/create-google-app-9.png)

Dưới đây là code ví dụ đăng nhập ứng dụng web bằng tài khoản google: Mình thực hiện gửi request lấy code, access token bằng cách thủ công để mọi người có thể hiểu cách gửi/nhận và trao đổi thông tin giữa ứng dụng Google API Console với google sau đó gửi thông tin về cho ứng dụng web.

* [Code ví dụ JSP Servlet login bằng Google (Gmail/Google+)](https://stackjava.com/jsp-servlet/code-vi-du-jsp-servlet-login-bang-google-java-web.html)
* [Code ví dụ Spring Boot Security login bằng Google (Gmail)](https://stackjava.com/spring/code-vi-du-spring-boot-security-login-bang-google-gmail.html)
* [Code ví dụ Spring MVC đăng nhập bằng google/gmail](https://stackjava.com/spring/code-vi-du-spring-mvc-dang-nhap-bang-google-gmail.html)


### Tham khảo: [https://stackjava.com/install/tao-ung-dung-google-de-dang-nhap-thay-tai-khoan.html](https://stackjava.com/install/tao-ung-dung-google-de-dang-nhap-thay-tai-khoan.html)