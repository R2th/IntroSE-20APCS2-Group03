Load Balancing hay “Cân bằng tải” là một trong những tính năng rất quan trọng với những nhà phát triển, lập trình mạng.
 <br>Load Balancer có 2 chức năng chính
 + Tự động hân phối lưu lượng truy cập đến một nhóm các web server.
 + Có thể chuyển đổi server trong quá trình maintain hay khi phát sinh sự cố trên một server.
#  1. Các loại AWS Load Balancer
AWS cung cấp 3 loại Elastic Load Balancer
+ Classic Load Balancer (Cân bằng tải cố điển)
   <br>Cung cấp các cân bằng tải cơ bản. Dịch vụ này đã cũ, bị hạn chết về nhiều mặt nên hiện nay ít được sử dụng
+ Application Load Balancer (Cân bằng tải ứng dụng)
   <br>Tích hợp nhiều tính năng mới nhất của AWS như Host-based Routing, ….
+ Network Load Balancer
   <br>Có khả năng chịu tải kết nối trong thời gian dài và chịu tải hàng triệu request trên giây
#    2. Cách cài đặt AWS Load Balancer
Trong bài viết mình, mình sẽ đề cập qua về cách cài đặt Application Load Balancer, loại Load Balancer được sử dụng phổ biến nhất trên AWS
## Chuẩn bị serveral EC2 instance
Chuẩn bị serveral application server giống nhau. Trong trường hợp này, để có thể tạo ra được application server giống với instance đang hoạt động, chúng ta có thể tạo Image (AMI) cho instance đang hoạt động đó, sau đó từ AMI này khởi tạo instance mới.
## Tạo Elastic Load Balancer
Sau khi khởi tạo được serveral instances. Làm theo hướng dẫn bên dưới để tạo ELB cho các instances này.
### 1. Login vào tài khoản AWS 
Mở EC2 console tại  https://console.aws.amazon.com/ec2/
### 2. Từ màn hình EC2
*  Chọn Load Balancing -> Load Balancer
*  Click vào Create Load Balancer trên màn hình Load Balancer

![](https://images.viblo.asia/dc73dfbe-0ef0-4897-b303-b78e83aa4ed6.png)
### 3. Chọn loại Load Balancer

![](https://images.viblo.asia/65929633-f34c-44a5-9af4-74abb6b1f013.png)
### 4. Configure Load Balancer
* Thiết lập Tên Load Balancer
* Chọn Load Balancer Scheme: Trong mạnh local hay mạng internet
* Cài đặt Listerner cho Load Balancer
* Chọn Availability Zones cho Load Balancer

![](https://images.viblo.asia/b34d023a-0e2b-41d8-9856-0a7ed7b3be5c.png)
### 5. Thiết lập Security Group cho Load Balancer
* Select Target Group của Loan Balancer. Trong trường hợp chưa có Target Group thì tạo mới Target Group, rồi Add Target vào Target Group mới tạo.
* Cài đặt Heath Check 
<br> Cài đặt path trong Health Check để kiểm tra tình trạng server còn sống hay không.
<br> Với các site tĩnh, có thể cài đặt /index.html trong ở ping path. Tuy nhiên, trong trường hợp site động, dữ liệu data lớn, nên cài đặt path riêng chuyên cho health check.

![](https://images.viblo.asia/77321c69-51fb-4baf-8503-9a4b6f14eaa7.png)
Ngoài ra, ở Advanced heath check Settings, có thể cài đặt số healthy threshold, unhealthy threshold, time out của 1 threshold, khoảng cách thời gian giữa 2 threshold
### 6. Kiểm tra tình trạng hoạt động của Instances trên AWS
* Trên màn hinh EC2, click vào Load Balancer -> chọn Target Group.
* Trên màn hình Target Group, click vào target group chứa instance muốn kiểm tra status
    +Nếu Instances có status “healthy” -> Instance đang hoạt động bình thường
    +Nếu Instances có status “unhealthy” -> Instance không hoạt động
    
  ![](https://images.viblo.asia/034712bf-8852-4931-9acd-162a6840bbfc.png)
# Kết luận
Việc sử dụng Elastic Load Balancer trên AWS, sẽ giúp kiểm tra được tình trạng hoạt động của máy chủ, đồng thời giảm thiểu tối đa tình trạng một máy chủ bị quá tải cho hệ thống của bạn.
### Tài liệu tham khảo
https://qiita.com/okamu_/items/c051156e44c4fbd65234
<br>https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html