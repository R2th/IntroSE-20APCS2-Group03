AWS (viết tắt của cụm từ Amazon Web Services) là một hệ thống các dịch vụ điện toán đám mây cung cấp cho doanh nghiệp các giải pháp về: Storage, computing power, databases, networking, analytics, developer tools, sercurity, virtualization,… 

Amazon Web Services là nền tảng dịch vụ điện toán đám mây an toàn, mang đến khả năng tính toán, lưu trữ cơ sở dữ liệu, phân phối nội dung và các chức năng khác nhằm giúp các doanh nghiệp mở rộng và phát triển.

Trong bài viết này giới thiệu  về cách cài đặt và cấu hình WordPress trên Amazon Lightsail 

Vậy Amazon Lightsail là gì? Amazon Lightsail là một dịch vụ đám mây của Amazon, không chỉ là môi trường điện toán (Computing environment), nó còn có thể lưu trữ dữ liệu (Storage - Amazon S3 ), khả năng khôi phục dữ liệu (Snapshots - Amazon RDS).  Ngoài ra, nó cung cấp các dịch vụ khác như cân bằng tải (Elastic Load Balancing), tưởng lửa (Firewall), DNS (Route 53) kèm theo một số chức năng có sẵn khác.
![](https://images.viblo.asia/b789dcc2-3516-4192-8311-84e7c8ad6bd8.jpg)

### 1. tạo tài khoản [Amazon Lightsail](https://portal.aws.amazon.com/billing/signup)
Khi đăng kí tài khoàn thì chúng ta sẽ được sử dụng miễn phí khá chi nhiều dịch vụ của AWS, có những dịch vụ được dùng miễn phí 1 năm như Amazon EC2, Amazon S3 và Amazon DynamoDB

Còn đối với Amazon Lightsail thì được dùng thử miễn phí 1 tháng 30 ngày miễn phí trị giá 

### 2 cài đặt WordPress với Lightsail


* truy cập vào tab Lightsail chọn Create instance.

![](https://images.viblo.asia/79b8aa17-7d59-4f99-b0f1-4dbc281cda94.png)

* chọn vị trí AWS 
![](https://images.viblo.asia/cd53dea1-647f-475e-b763-b56b1a8f4f33.png)

* Chọn hệ điều hành và CMS 
trong bài viết này sẽ sữ dụng 
- Linux/Unix.
- WordPress.
![](https://images.viblo.asia/b74db037-68d0-4fc7-8a49-45e5172e1c4f.png)

* Chọn gói dịch vụ Amazon Lightsail 
chọn gói dịch vụ phù hợp với trang web của bạn ở đây thì mình sẽ chọn gói ít tiền nhất 3.5$
![](https://images.viblo.asia/23d3c75b-2c9d-4468-960f-e1021a4ad9dc.png)

cuôí cùng thì nhập tên ứng dụng và khởi tạo. 

Với Amazon Lightsail cài đặt rất dễ dàng, chỉ cần vài cú click chuột, thì chúng ta đã có một server hoàn chỉnh. 

### 3. Kết nối với máy tính thông qua SSH và lấy mật khẩu WordPress website

Lấy mật khẩu để đăng nhập vào màn hình quản trị của WordPress
* trên tab Lightsail click vào icon SSH

![](https://images.viblo.asia/a6dc2d5a-79ef-48ba-9624-876948054b88.png)

* Sau đó dùng lệnh 

```
cat $HOME/bitnami_application_password
```
để lấy mật khẩu mặc định 
![](https://images.viblo.asia/82da8980-fbe1-4890-a4a7-ae74e642603a.png)
### 4. Đăng nhập vào trang quản trị WordPress

Sau khi đăng nhập chúng ta có thể thay đổi mật khẩu cài đặt plugin và tùy biến giao diện cũng như các chức năng trên website của mình

* truy cập http://PublicIpAddress/wp-login.php 
![](https://images.viblo.asia/ab018e32-2206-4bdf-9e14-7c6b5d0fe028.png)

* Đăng nhập và cấu hình, plugin 

![](https://images.viblo.asia/7265978d-bbd3-47f1-8727-ce2e2e184f50.png)

### 5. Tạo địa chỉ IP

* truy cấp vào ứng dụng bạn vừa tạo và chọn tab Networking,  sau đó tạo địa chỉ IP.

![](https://images.viblo.asia/6dec7d34-507c-4ad1-83e9-6a71c3bb9131.png)
###  6. Trỏ tên miền cho ứng dụng 
Vẫn ở tab Networking thì ta chọn Create DNS zone. 


![](https://images.viblo.asia/640aafe3-cfa5-4690-ae3c-b5c9a9d35657.png)
Sau đó nhập tên miền và  click Create DNS zone


![](https://images.viblo.asia/70b4531f-13f3-4661-8dc4-618549b9a81e.png)

## Kết Luận 
Với Amazon Lightsail thì chúng ta có thể cài đặt một website khá chi đơn giản và dễ sử dụng như các bước ở trên (Chỉ cần click và nhập thông tin đơn giản). Tuy nhiên nhược điểm khi dùng  Amazon Lightsail thì khá cứng nhắc chúng ta sẽ bị hạn chế đội với một cài đặt nhất định khó có thể tùy biến theo ý muốn. Khó bảo trì nâng cấp.

Với những ưu nhược điểm ở trên thì Amazon Lightsail khá chi phù hợp với các website đơn giản.

## Tài liệu tham khảo 
[https://aws.amazon.com](https://aws.amazon.com/vi/getting-started/hands-on/launch-a-wordpress-website/?nc1=f_ls)