![](https://images.viblo.asia/c9ad5626-5ba5-4302-aeae-17e74793b1bc.jpg)

Ở bài trước mình đã giới thiệu về một service của 1 service của AMAZON là IAM. Các bạn có thể xem lại ở [đây](https://viblo.asia/p/aws-huong-dan-tao-va-quan-ly-tai-khoan-iam-RnB5pXxY5PG) 

Trong bài này mình xin giới thiệu tiếp về 1 service khác là EC2.
### Amazon EC2 là gì?
* **Amazon Elastic Compute Cloud (Amazon EC2)**  là một cơ sở hạ tầng điện toán đám mây được cung cấp bởi **Amazon Web Services (AWS)** giúp cung cấp tài nguyên máy tính ảo hoá theo yêu cầu. 
* **Amazon EC2** cung cấp các ứng dụng máy tính ảo hoá có thể mở rộng về khả năng xử lý cùng các thành phần phần cứng ảo như bộ nhớ máy tính (ram), vi xử lý, linh hoạt trong việc lựa chọn các phân vùng lưu trữ dữ liệu ở các nền tảng khác nhau và sự an toàn trong quản lý dịch vụ bởi kiến trúc ảo hoá đám mây mạnh mẽ của AWS.
* **Amazon EC2** sẽ cung cấp một hoặc máy chủ ảo có thể kết hợp với nhau để dễ dàng triển khai ứng dụng nhanh nhất và đảm bảo tính sẵn sàng cao nhất. Thậm chí về mặt thanh toán bạn dễ dàng biết được các mức chi phí cần thanh toán dựa trên thông tin tài nguyên bạn sử dụng.
### Amazon EC2 Instance Là Gì?
**Amazon EC2 Instanc** là một cloud server. Với một tài khoản bạn có thể tạo và sử dụng nhiều **Amazon EC2 Instance.** Các Amazon EC2 Instance được chạy trên cùng một server vật lý và chia sẻ memory, CPU, ổ cứng... 

Tuy nhiên do tính chất của cloud service nên mỗi một Instance được hoạt động giống như một server riêng lẻ.

### Các đặc tính của Amazon EC2
##### **1.  Scaling**:
* Scaling Up/Down: Tăng/Giảm capacity(RAM, CPU,...) của Instance.
* Scaling In/Out: Tăng/Giảm số lượng Instance.
##### **2.  Security**:
* Có thể thiết lập rank IP Private dành riêng cho EC2.
* Sử dụng Security Group và Network ACLS để control inbound/outbound.
* Có thể thiết lập IPsec VPN giữa Data Center và AWS Clound.
* Delicated Instance -> Tạo EC2 trên 1 hardware physical dành riêng cho 1 khách hàng duy nhất.
##### **3.  Cost**:
* On-Demand Instance: Tính theo giờ, đáp ứng nhu cầu dùng trong thời gian ngắn. Dùng bao nhiêu, trả bấy nhiêu.
* Reserved Instance: Cho phép trả trước 1 lượng Server cho 1 hoặc 3 năm. Chi phí chỉ bằng 75% so với On-Demand. Nêú không có nhu cầu sử dụng trong thời gian dài, bạn có thể sale tại [Reserved Instance Marketplace](https://aws.amazon.com/ec2/purchasing-options/reserved-instances/marketplace/)
### Cấu Hình Amazon EC2 Instance
* Truy cập vào EC2
Sau khi tạo tài khoản và đăng nhập vào trang của AWS bạn cần đi tới mục Services và truy cập vào trang EC2 dashboard hoặc vào trực tiếp địa chỉ URL [https://console.aws.amazon.com/ec2/](https://console.aws.amazon.com/ec2/)
* Tạo instance
![](https://images.viblo.asia/280c5f3e-11ac-4a53-8b88-4ab61bfd156a.png)
* Chọn Amazon Machine Image (AMI)
Ở bước này sẽ hiển thị một danh sách để chọn ra loại Image sử dụng để cho server. Ở đây mình chọn server Linux 2 AMI - server này có thể sử dụng CLI được cài sẵn cho 1 số ngôn ngữ như **Python, Ruby, Java** và **Perl**.
Nó cũng bao gồm **Docker, PHP, MySQL, PostgreSQL,** và một số packages phổ biến khác.
![](https://images.viblo.asia/6fa36a3b-217b-4bbb-a9ea-3992afee790f.png)

* Chọn loại instance
Tiếp theo, tùy mục đích sử dụng mà chúng ta quyết định loại instance. Tùy thuộc vào chi phí bỏ ra mà performance của instance cao hay thấp. Ở đây mình chọn ** t2.micro** - để sử dụng free trong năm đầu sử dụng. Click ** Configure Instance Details** để tới bước tiếp theo.
![](https://images.viblo.asia/e16e7b1f-6a5c-4a7b-b087-f0664b322b19.png)
* Config instance detail
Ở bước này bạn có thể assign User (IAM) role, VPC, thêm instance hiện tại vào group instance đã tồn tại,... Và nhớ enable **Auto-assign Public IP**  lên nhé. Sau đó click: **Add Storage**
![](https://images.viblo.asia/fa49549b-375d-4004-a554-bda0d6dd2cff.png)
* Thay đổi root volum hoặc add thêm storage:
Ở bước này bạn có thể thêm volume bổ sung EBS hoặc thay đổi root volume
![](https://images.viblo.asia/3590199e-3627-4b2a-8384-f2105a480843.png)
* Add tag
Bước này sẽ thêm cặp key-value cho instance. Ở đây mình thêm key-value là:
Name - Learning-ec2.
![](https://images.viblo.asia/b6a3901e-ac63-47c2-b6b9-7b5ca169405d.png)
* Review
Tạo 1 cặp key pair để connect đến instance
![](https://images.viblo.asia/cb2a9c92-2576-40b6-ba02-d8365d626143.png)
Và hoàn thành.
![](https://images.viblo.asia/edc3484a-935c-4d17-a0cd-7160c79e54e6.png)
Cuối cùng là ssh đến instance và bạn có thể thao tác với instance như một máy cá nhân :D
![](https://images.viblo.asia/98cbd074-407f-4b9b-b3bf-33c50a4a591d.png)
Cảm ơn các bạn đã theo dõi bài hướng dẫn cơ bản này.

Tài liệu tham khảo: [https://linuxacademy.com](https://linuxacademy.com)