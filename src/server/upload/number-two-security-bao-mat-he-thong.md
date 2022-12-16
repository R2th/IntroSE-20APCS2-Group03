Trong bài này, chúng ta cùng tìm hiểu về tính **Bảo mật** hay là **Security Pillar**, tính chất thứ hai trong Well-Architect in AWS With Six Pillar.

### I.   Security là gì?
Security là việc bảo vệ thông tin và hệ thống, bao gồm tính bảo mật và trung thực của dữ liệu, quản lý quyền hạn người dùng và thiết lập kiểm soát để phát hiện sự cố bảo mật.

### II.  Nguyên tắc thiết kế
*  **Triển khai nền tảng đồng nhất mạnh mẽ**
*  **Cho phép truy tìm nguồn gốc** 
   <br/> Cho phép chúng ta tracking  logs và thống kê hệ thống.
* **Áp dụng bảo mật với mọi layer**, như là mạng edge, VPC, subnet, load balancer, mỗi intance, vận hành và applicaton.
* **Triển khai bảo mật một cách tự động** <br/>
* **Bảo vệ phần dữ liệu** giữ lại (data at rest) hoặc  dữ liệu được chuyển đi (in-transit)
* **Giảm thiểu hay là lấy đi những truy cập trực tiếp hoặc truy cập dữ liệu bằng thủ công**.
* **Chuẩn bị cho mọi sự kiện bảo mậ**t - Chạy mô phỏng ứng phó sự cố và sử dụng các công cụ tự động hóa để tăng tốc độ phát hiện, điều tra và phục hồi
### III. Những dịch vụ về security tiêu biểu:
#### Quản lý  truy cập đồng nhất (Identity & Access Management)
- IAM: quản lý quyền hạn cho group, user, role để truy cập các tài nguyên của AWS
- AWS STS: tạo một chứng chỉ tạm thời.
- MFA token:
- AWS Organizations: 

#### Kiểm soát hoạt động (Derective Control):
- AWS Config: enables you to assess, audit, and evaluate the configurations of your AWS resources.
Cho phép bạn ước lượng, kiểm tra và đánh giá cấu hình các tài nguyên AWS của bạn.
- AWS Cloud Trails: Track user activity and API usage -  theo dõi hoạt động của người dùng (user) và mức sử dụng API
- AWS CloudWatch: Observability of your AWS resources and applications on AWS and on-premises - (Khả năng quan sát các tài nguyên và ứng dụng AWS của bạn trên AWS và máy chủ tại chỗ)

#### Bảo vệ cơ sở hạ tầng - Infrstructure Protection
- AWS CloudFront
- AWS CloudWatch
- AWS Shield
-  AWS WAF
- AWS Inspector 

#### Bảo vệ  dữ liệu - Data protection
- KMS
- S3 
- ELB: enable https endpoint
- EBS
- RDS

#### Ứng phó sự cố - Incident Response
- IAM
- AWS CloudFormation
- AWS CloudWatch Events

<br />
Nguồn: <br />
https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-design.html