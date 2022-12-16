Trong bài viết này, tôi hướng dẫn các bạn tạo 1 mã otp và gửi đến email của chính mình để xác thực cho mỗi lần đăng nhập. Tôi sử dụng **MailTrap**

## Các vấn đề cần xử lý:

+ Tạo 1 model Otp, tự động sinh Otp mỗi lần đăng nhập 
+ Thiết lập thời gian sống của otp
+ Gửi mail với mã Otp vừa sinh ra

## Công cụ và thư viện được sử dụng trong bài viết:

+ Spring boot 2.7.4
+ Spring tool suite 4
+ Spring data elasticsearch 4.4.2
+ Maven 3
+ Java 11
+ Elasticsearch 7.17.6
+ Kaizen Elastic

Tham khảo những bài viết sau để biết cách tạo 1 project với **Spring Boot - Thymeleaf - Elasticsearch**:

https://viblo.asia/p/tao-1-custom-token-moi-khi-dang-nhap-va-luu-vao-database-voi-spring-boot-thymeleaf-elasticsearch-ket-hop-voi-su-dung-kaizen-elastic-tao-1-function-tai-fe-trigger-goi-den-be-xin-cap-token-moi-sau-1-khoang-thoi-gian-chi-dinh-5OXLAXjaJGr

https://viblo.asia/p/tao-mot-project-voi-spring-boot-va-elasticsearch-841-su-dung-thu-vien-spring-data-elasticsearch-huong-dan-cai-dat-va-su-khac-nhau-giua-2-phien-ban-8xx-voi-7xx-elasticsearch-Rk74aRXvJeO

https://viblo.asia/p/tao-mot-project-voi-spring-boot-thymeleaf-elasticsearch-su-dung-http2-tao-service-run-elasticsearch-yZjJYjolLOE

https://viblo.asia/p/ma-hoa-thong-tin-password-trong-qua-trinh-login-register-voi-base64-su-dung-spring-boot-thymeleaf-elasticsearch-khong-su-dung-form-bXP4WPoBJ7G

Nguồn template: https://bbbootstrap.com/snippets/bootstrap-mobile-phone-verification-form-using-otp-78737873#


## 1. Cấu trúc project:

![image.png](https://images.viblo.asia/0cdd5423-597d-4744-80da-657aa09f2d7d.png)

## 2. Package "com.example.otp.application":

**Nội dung class "OtpApplication":**

![image.png](https://images.viblo.asia/259a5e0f-87bf-4a3a-888a-a3d06adcd955.png)

## 3. Package "com.example.otp.model":

**Nội dung class "Otp":**

![image.png](https://images.viblo.asia/2d93a65e-9c17-4367-9306-8186eaf2b4b6.png)

**Nội dung class "User":**

![image.png](https://images.viblo.asia/f08a8b8d-020a-41c7-b7a9-c19382420bbc.png)

## 4. Package "com.example.otp.repository":

**Nội dung class "UserRepository":**

![image.png](https://images.viblo.asia/6161df82-9f2e-4214-b888-97144b7b4f88.png)

**Nội dung class "OtpRepository":**

![image.png](https://images.viblo.asia/dba10113-9a1f-4696-9467-e96e4ed65d18.png)

## 5. Package "com.example.otp.service":

**Nội dung class "IOtpService":**

![image.png](https://images.viblo.asia/d2c0e1bc-10a3-44cc-bc70-e3cd5a36b3db.png)

**Nội dung class "OtpService":**

![image.png](https://images.viblo.asia/b5456b92-e6de-4a05-a68b-f64d046b5f45.png)

## 6. Package "com.example.otp.controller":

![image.png](https://images.viblo.asia/68b35ad1-3bfe-4639-bded-09476a6648c5.png)

## 7. Application file:

![image.png](https://images.viblo.asia/3b28befd-704f-4ca0-93d3-3ccf99d1c292.png)

Trong config tôi có enable SSL và HTTP/2, các bạn không cần làm điều này trong bài viết, tham khảo các bài viết ở trên tôi có hướng dẫn cách enable SSL và HTTP/2

Có 4 thuộc tính cần quan tâm là:

+ otp.expired.in: Thuộc tính này dùng để chỉ định thời gian sống cho Otp tính bằng phút

+ otp.max.length: Chỉ định độ dài tối đa của 1 mã otp, ở đây tôi chỉ định otp là 6 ký tự số

+ mail.trap.username: Đây là username trong mailtrap khi bạn tạo mới 1 inbox

+ mail.trap.password: Đây là password trong mailtrap khi bạn tạo mới 1 inbox

## 8. Nội dung script file:

![image.png](https://images.viblo.asia/2f58bf17-85ec-4386-ba45-3e29043d224b.png)

**Tôi có file "otp.html", tôi khai báo đường dẫn cho script file:**

![image.png](https://images.viblo.asia/6d9e5316-41a9-4d0a-8d61-ba871b521cfc.png)

Đường dẫn script file thì không phải cố định, tuỳ theo cấu trúc resources trên máy tính các bạn

## 9. Tạo phương thức tạo Otp code tự động:

**Trong class "IOtpService", tôi khai báo phương thức "generateOtp()" - "getOtpExpiredAt()" - "checkOtp()":**

![image.png](https://images.viblo.asia/2e5105dd-2698-4797-9f11-65e028f87d2c.png)

**Trong class "OtpService", tôi lấy ra giá trị thuộc tính "otp.max.length" tôi đã khai báo trong application file**

![image.png](https://images.viblo.asia/5d8bc0dc-8c2e-4445-a7d2-af6cde44e7f3.png)

**Tạo phương thức "generateOtp()":**

![image.png](https://images.viblo.asia/70eeb725-3631-435c-a6b9-cfeb5aeb2d76.png)

**Tạo phương thức "getOtpExpiredAt()":**

![image.png](https://images.viblo.asia/a7c1656f-ec6a-43b4-8da1-6cc10d0bcaf9.png)

**Tạo phương thức "checkOtp()":**

![image.png](https://images.viblo.asia/31b03ba0-8faa-40c2-873a-45c9d7ea169a.png)

## 10. Cấu hình gửi mail với MailTrap:

Để hiểu thêm về MailTrap, xem tại đây: https://help.mailtrap.io/article/40-faq#:~:text=Mailtrap%20is%20a%20fake%20SMTP,or%20flooding%20your%20own%20inboxes.

![image.png](https://images.viblo.asia/f89e4827-4dad-42a9-8fe4-e1c2a98d1462.png)

Sau khi chuẩn bị các bước trên, tiếp theo tôi hướng dẫn cấu hình để gửi mail với MailTrap:

**Bước 1: Truy cập đường dẫn:**
https://mailtrap.io/

**Bước 2: Tại trang chủ MailTrap -> đăng ký một tài khoản MailTrap, click button "Sign Up":**

![image.png](https://images.viblo.asia/3785c256-f3f6-4142-b227-1614ca1c7306.png)

**Bước 3: Các bạn chọn loại đăng ký, ở đây tôi chọn "Use Google account":**

![image.png](https://images.viblo.asia/03f12c0e-2a33-4c55-a7fe-eaa0f81a07d8.png)

**Bước 4: Sau khi tạo tài khoản thành công -> sẽ được điều hướng về trang dashboard của MailTrap, tại dashboard mục "Home" -> click button "Setup Inbox":**

![image.png](https://images.viblo.asia/bb694195-b80f-4d1f-b661-6f7b78e87c9f.png)

**Bước 5: Sau khi tạo xong "Inbox" -> tại mục "Sanbox > Inboxes", tại tab "SMTP Settings" click "Show Credentials":**

![image.png](https://images.viblo.asia/5d77be67-d868-44ff-a09f-2e10e6cd36e3.png)

Trong phần credentials chứa thông tin port - username - password nên các bạn cần giữ kỹ thông tin này

Tiếp theo, tôi cấu hình cho phần gửi mail Otp code:

Đầu tiên, tôi cần thêm 1 dependency **"javax.mail"** trong file **"pom.xml"**:

    <!-- https://mvnrepository.com/artifact/javax.mail/mail -->
    <dependency>
        <groupId>javax.mail</groupId>
        <artifactId>mail</artifactId>
        <version>1.5.0-b01</version>
    </dependency>
    
**Nội dung file pom:**

![image.png](https://images.viblo.asia/518dc501-b52a-4a84-9e58-eb624acdd564.png)

**Tôi khai báo thêm 2 thuộc tính là "mail.trap.username" và "mail.trap.password" trong application.yml:**

![image.png](https://images.viblo.asia/1209a1e2-1e01-42ac-ae97-a6988d7c74a7.png)

Usename và password các bạn sẽ thấy trong mục **"Show Credentials"** trong dashboard Mailtrap

**Tôi khai báo phương thức "sendOtp" trong class "IOtpService":**

![image.png](https://images.viblo.asia/022d8c58-57dd-4e4b-984e-e735c5b067e2.png)

**Trong class "OtpService" lấy ra giá trị các thuộc tính username - password:**

![image.png](https://images.viblo.asia/4025bb25-2dc2-4d38-988d-b3b756c24ee6.png)

**Phương thức "sendOtp" trong class "OtpService":**

![image.png](https://images.viblo.asia/35fa8753-a419-402f-b14b-d90e1c97940b.png)

**Tôi cần cập nhật lại code cho phương thức "checkInfoUserLogin" trong "OtpController", sau khi xác thực user có trong hệ thống -> generate new otp and gửi email đến user:**

![image.png](https://images.viblo.asia/88c1973a-a267-4919-b1b8-7c4221d7e37d.png)

Sau khi gửi email thành công -> redirect -> otp page

**Cập nhật lại phương thức "requestData()" trong script file:**

![image.png](https://images.viblo.asia/a1c35244-283d-4940-9f8b-39d62b252481.png)

**Phương thức load otp page trong OtpController:**

![image.png](https://images.viblo.asia/c9e9c50f-9e38-4f6b-9e28-85ceb35d0221.png)

Tôi restart lại project và kiểm tra kịch bản user đăng nhập với tài khoản đúng -> otp được generate -> gửi mail với otp code đến user

![image.png](https://images.viblo.asia/6db2c887-7dbc-4fbf-b0cf-2ac4aca3ba2d.png)

=> Load thành công otp page

**Kiểm tra database:**

![image.png](https://images.viblo.asia/54419444-f564-4714-be63-83e1f8735a99.png)

=> Thông tin otp được lưu thành công

**Kiểm tra email gửi đến user, tôi vào trang dashboard của MailTrap. mục "Inbox":**

![image.png](https://images.viblo.asia/2cdab02a-9974-4b7b-a2ef-ba46c407ee12.png)

=> Mail được gửi thành công

Tiếp theo, tôi cần xử lý tại FE sau khi nhập xong otp -> tự động call api đến BE để xác thực OTP và nếu xác thực thành công -> chuyển đến dashboard page

**Tại page "otp.html" tôi cập nhật lại 1 vài thứ:**

![image.png](https://images.viblo.asia/1ec75a9b-3803-4d4b-b554-61f3062603bd.png)

Template tôi sử dụng được thiết kế đơn giản nên tương ứng cho mỗi field là 1 thẻ "<input />" nên để bắt sự kiện sau khi user nhập full otp tôi thêm sự kiên "onchange" trong mỗi fields vá gọi đến phương thức "checkOtpCode()" trong script file. Nên để nhanh các bạn chỉ cần sửa 1 field và clone ra

**Nội dung phương thức "checkOtpCode" trong UserController:**

![image.png](https://images.viblo.asia/9032e2d2-3d27-4ac8-adb1-21522378a04a.png)

**Nội dung phương thức "checkOtpCode" trong script file:**

![image.png](https://images.viblo.asia/1ed58289-6494-4f70-a1d6-18a2916490c7.png)

**Nội dung phương thức "resendOtpCode" trong UserController:**

![image.png](https://images.viblo.asia/afadca50-0e93-46b0-a824-2bef3359722c.png)

**Nội dung phương thức "resendOtpCode" trong script file:**

![image.png](https://images.viblo.asia/c1e39587-8368-4d28-a6eb-a0eac72e2136.png)

**Nội dung phương thức "getDashBoardPage" trong UserController:**

![image.png](https://images.viblo.asia/b8890e2b-1286-4d8c-bdac-57da5052728a.png)

**Tôi restart lại project và kiểm tra kịch bản user đăng nhập với tài khoản xác thực thành công -> otp generated -> gửi mail otp và tôi nhập otp để kiểm tra:**

![image.png](https://images.viblo.asia/7e22ac19-7ab7-4788-be13-2c772903452b.png)

![image.png](https://images.viblo.asia/53965a37-efd2-4858-849c-febbe0088653.png)

![image.png](https://images.viblo.asia/cc6b6f6d-8e56-41c7-8bbd-df30a15866bf.png)

=> Load dashboard page thành công

**Tiếp theo, kiểm tra với kịch bản otp expired:**

![image.png](https://images.viblo.asia/9aa1142a-1596-499d-b1bd-b6f546f65a06.png)

**Kiểm tra với kịch bản resend otp:**

Thêm sự kiện onclick trong button "Resend" trong otp page:

![image.png](https://images.viblo.asia/49ebadcd-42d1-445d-abcd-8834f0b29bd9.png)

**OTP đầu tiên:**

![image.png](https://images.viblo.asia/18be6e25-7314-4ac5-ac88-7b4c5ed82cdc.png)

![image.png](https://images.viblo.asia/4a483b69-9dd4-41af-8289-1a7a37cc8a37.png)

**Sau khi resend OTP:**

![image.png](https://images.viblo.asia/c2ecaf7a-96d5-43c9-a2d3-afc8dadef937.png)

![image.png](https://images.viblo.asia/c25efc21-cfa3-41ba-8596-24a11b72bad5.png)

Nếu bạn nào muốn thông qua MailTrap gửi mail đến email thực sự thì có thể bỏ ra "9.99$" mua gói 1 tháng để kiểm tra, tôi đã mua gói này và kiểm tra để thấy email người nhận OTP là gmail của tôi có nhận được không:

Trước tiên, sau khi nâng cấp MailTrap, tại dashboard MailTrap cần thiết lập lại tại mục "Auto Forward", tại đây tôi thiết lập mục Email là email domain gmail của tôi, sau khi add email của tôi xong -> tôi restart lại project và thử đăng nhập để xem OTP có được forward về gmail của tôi không:

![image.png](https://images.viblo.asia/2d57d1d5-9d24-45b6-8efc-d4e77a051d14.png)

![image.png](https://images.viblo.asia/90761f55-863c-4a8e-ad74-3d0e584a0856.png)

Kiểm tra gmail:

![image.png](https://images.viblo.asia/414357f1-dc8f-4239-95bf-d48182707508.png)

=> Đã forward thành công và mail gửi đến sẽ nằm trong mục mail rác, để thiết lập nâng cao hơn, các bạn có thể add domain tại dashboard MailTrap

Cuối cùng, bài viết này không nhằm mục đích quảng cáo cho MailTrap, tôi thấy MailTrap này khá hay nên tôi muốn thử nghiệm và chia sẻ đến các bạn. 

Ngoài ra, bởi vì các bạn đã biết thông thường gửi mail chúng ta hay sử dụng SMTP gmail nhưng hiện tại từ ngày 30-05-2022 gmail đã disable tính năng "less secure" trong mục "Security" mà trước đó để có thể gửi mail dùng SMTP gmail chúng ta cần tính năng "less secure" để passed

![image.png](https://images.viblo.asia/e14c085f-c1cd-482a-9534-6486ebb54cc5.png)

Xem thêm thông tin về vấn đề này tại đây: 

https://support.google.com/accounts/answer/6010255?hl=en#:~:text=Turn%20off%20%22Less%20secure%20app%20access%22&text=Go%20to%20the%20Less%20secure,Allow%20less%20secure%20apps%20off.

Còn đây là cách để các bạn vẫn có thể sử dụng SMTP gmail để gửi mail mà không cần "less secure":

![image.png](https://images.viblo.asia/e4632cbc-4484-46e4-8f53-e79b718cd63c.png)

Nguồn: https://stackoverflow.com/questions/72480275/is-there-a-work-around-google-disabling-less-secure-apps