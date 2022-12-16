## Mở đầu
Amazon SES (Amazon Simple Email Service) là một nền tảng dành cho email cung cấp một cách dễ dàng, hiệu quả về chi phí để gửi và nhận email bằng địa chỉ email và tên miền của riêng theo cài đặt. Không chỉ vậy, yếu tố khiến cho Amazon SES ngày càng trở nên được ưa chuộng là việc đơn giản về cách sử dụng và cài đặt, tài liệu hỗ trợ hướng dẫn rõ ràng. Hãy tưởng tượng nếu bạn muốn xây dựng một hệ thống gửi email, bạn sẽ cần thiết lập quản lý máy chủ email, cấu hình mạng và địa chỉ IP... Còn với Amazon SES tất cả những việc đó đã được Amazon hỗ trợ đầy đủ, việc của bạn chỉ cần thiết lập theo hướng dẫn và sử dụng. Quá tiện đúng không :D. Bây giờ hãy cũng mình tìm hiểu về Amazon SES nhé.

##  Cài đặt Amazon SES 
- Đăng nhập vào Amazon Service

Đầu tiên để bắt đầu được với Amazon SES, chúng ta cần có một tài khoản amazon và đăng nhập vào bảng điều khiển của amazon.
Nếu bạn chưa có tài khoản thì có thể tham khảo [tại đây](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sign-up-for-aws.html)
Sau khi đã đăng nhập thành công vào bảng điều khiển của amazon SES, bạn sẽ thấy màn hình như này: 

![](https://images.viblo.asia/1fca31b8-b670-4f8a-892e-28da2b62cab9.png)

- Xác thực email

Để có thể gửi email. Amazon SES yêu cầu bạn phải xác thực email bạn dùng phục vụ cho việc gửi nhắm mục đích bảo mật.
Trong bảng điều khiển của SES, dưới mục **Identity Managment** bạn sẽ thấy 2 mục là **Domain** và **Email Address**.
Click vào **Email Address** chúng ta sẽ thấy màn hình để xác thực email của bạn

![](https://images.viblo.asia/2810749d-d6af-4614-9433-9840eb3a0ba3.png)

Click vào **Verify a New Email Address**, nhập email của bạn và tiến hành xác thực thôi. Sau khi bạn nhập email để xác thực, Amazon sẽ gửi một tin nhắn vào email vừa nhập và việc của bạn là đăng nhập vào email và click để xác thực email. (Rất đơn giản phải không :D)
Khi đã xác thực email thành công, trên bảng điều khiển **Email Address**  sẽ xuất hiện email vừa xác thực với trạng thái được **Verified**.

![](https://images.viblo.asia/9f2587ec-3d88-4bc0-ae74-4c16f824cf00.png)

Lưu ý: Nếu tài khoản amazon của bạn mới được tạo thì bạn cần xác thực email dùng để nhận mail vì tài khoản của bạn đang là tài khoản sandbox. Để nâng cấp tài khoản của bạn khỏi sanbox, bạn có thể tham khảo tại đây: 
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html

- Kiểm tra gửi mail bằng Amazon SES

Sau khi đã hoàn thành việc xác thực mail, bây giờ bạn có thể kiểm tra bằng cách gửi mail test từ tài khoản vừa được xác thực rồi. 

![](https://images.viblo.asia/648df425-eb7e-4efc-aa16-96c12faec225.png)

- Thiết lập các yêu cầu nhận mail

Sau khi đã xác thực mail, việc tiếp theo của bạn là cài đặt các `rule` để nhận mail. Dưới mục **Email Receiving** chọn **Rule Sets**
chúng ta sẽ vào màn hình tạo `rule` nhận mail.

![](https://images.viblo.asia/df96d919-371b-4638-bd37-e19ed23e854a.png)

Và đây chính là phần mình thích nhất ở Amazon SES, chúng ta có thể thiết lập nhận mail cho tài khoản cụ thể hoặc theo một domain đã được xác thực

![](https://images.viblo.asia/7703515e-ec28-40aa-8e68-ba908acf6453.png)

Sau đó, một phần rất quan trọng trong quá trính xử lý mail nhận của Amazon SES là Amazon sẽ hỗ trợ việc lưu thông tin mail vừa nhận bằng S3, thông báo cho người dùng bằng Amazon SNS (Simple Notification Service), Kích hoạt Amazon Lambda để xử lý action tiếp theo

![](https://images.viblo.asia/ba484812-a4ba-4514-b194-6b7d4db4768e.png)

Như tiêu đề bài viết, ở đây mình chọn lưu thông tin mail nhận vào s3

![](https://images.viblo.asia/3c85e50b-2b97-48c9-b39c-493d8ad93861.png)

Sau khi hoàn thành các bước, chúng ta sẽ có một rule như sau:

![](https://images.viblo.asia/c60598ce-195d-469a-959a-23eb883def05.png)

Như vậy chúng ta đã hoàn thành việc cài đặt để nhận mail từ Amazon SES
Phần tiếp theo, mình sẽ giới thiệu tiếp cho các bạn việc xử lý mail được lưu trong s3.