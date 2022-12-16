Amazon EC2

# Giới thiệu 
EC2 là viết tắt của Elastic Compute Cloud 
Cung cấp khả năng tính toán mở rộng trong  Amazon Web Service (aws) cloud. Sử dụng  EC2 giúp bạn pbạn loại bỏ về các vấn đề phần cứng, có thể phát triển và deploy ứng dụng nhanh hơn. Bạn có thể khởi toạ  một hoặc nhiều máy chủ mà bạn muốn, cũng như thiết lập bảo mật , nmạng ,và quản lý lưu trữ
Amazon EC2 cho phép bạn scale up hoặc down theo yêu cầu 

# Các tính năng của Amazon EC2
- Môi trường điện toán ảo hay còn gọi là instances
- Các templates được cấu hình sẵn cho các instances hay còn được  gọi là  Amazon Machine  Images (AMIs) , Các package  này được đóng gói lại cần thiết cho server của bạn (bao gồm hệ điều hành và các phần mêm cần thiết cho server )
- Cấu hình khác nhau cho các CPU, bộ nhớ, lưu trữ , netwworking cho các instances 
- Bảo mật thông tin khi truy cập vào các instances sử dụng key paire (AWS sẽ lưu trữ các public key và bạn giữ private key )
- Instance store volumns: Dùng cho kiểu dữ liệu tạm thời bị xoá khi  bạn stop hay terminate instance của bạn - 
- Amazone EBS volumns: Lưu trữ dữ liệu vĩnh viễn sử dụng Amazon Elastic Block Store
- Regions và Availability Zones: Multiple physical locations
- Tường lửa cho phép bạn giới hạn protocol, cổng, dải IPs để access vào các instances của bạn sử dụng security groups
- Elastic IP addresses: Static IPv4 for dynamic cloud computing 
- Metadata (tag)
- VPCs(vitual private cloud)

![](https://images.viblo.asia/3cdf29f7-e9e0-491a-a848-856ebb6e4818.png)

# Truy cập vào Amazon EC2
Amazon EC2 cung cấp web-based user interface để bạn bạn có thể truy cập vào hay còn được gọi là Amazon EC2 console. 
Ngoài ra bạn cũng có thể truy cập thông qua command line interface: 
- AWS Command Line Interface (CLI)
- AWS Tools for window Powershell 

Amazon EC2 cũng cung cấp Query API, các request GET, POST (HTTP, HTTPS )
Các Action request bạn có thể xem trên trang chủ aws https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_Operations.html

# Tạo instance 
Trước tiên bạn cần có một tài khoản trên aws (tài khoản này phải có credit card hợp lệ), sau khi tạo tài khoản bạn chờ ít nhất 24h để được kích hoạt 

![](https://images.viblo.asia/da670d9f-2a8f-48fc-8a79-8c18403ba59c.png)

![](https://images.viblo.asia/a45389d0-c97e-4bf9-a860-c3ff03e55b2b.png)

![](https://images.viblo.asia/9fed2038-682c-40f1-849b-6fbf9857e31d.png)

![](https://images.viblo.asia/b50b543f-8b1d-4dcf-aa4f-97756724ea65.png)

![](https://images.viblo.asia/ad1a1a8c-984f-4947-b09d-37c5da9d867a.png)

![](https://images.viblo.asia/1b6fac75-f7e3-4fa8-b5df-78b7bea78e12.png)

![](https://images.viblo.asia/1d64676d-2ae5-429b-b25b-773070311c97.png)

![](https://images.viblo.asia/f014b8fc-5e19-48b4-915c-9a915a809d64.png)

![](https://images.viblo.asia/2eefbd2e-315d-4b30-9183-b7d06016fc77.png)

![](https://images.viblo.asia/7dab8a55-84d4-43ec-aaf5-676f7725701e.png)

# Pricing 
HIểu về billing và giá trước khi thực hành là một điều khá qua trọng nếu như không muốn mất tiền oan
Khi mới tìm hiểu về EC2 bạn nên sử dụng AWS Free Tier
Amazon có các kiểu purchase:
- On-Demand Instances
Kiểu thanh toán được tính theo thời gian bạn sử dụng 
- Reserverd Instances
- Spot Instances

Chi tiết trên trang chủ https://aws.amazon.com/ec2/pricing/

# Tham khảo
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html