## I. Lời mở đầu:
Trong bài viết này mình sẽ giới thiệu tổng quan về AWS 

AWS là gì? Dịch vụ điện toán đám mây mà AWS cung cấp gồm những gì? Tại sao doanh nghiệp nên chọn AWS là giải pháp điện toán mây?

Cùng mình tìm hiểu về AWS nào :D :D

## II. AWS là gì?
Trước khi tìm hiểu về AWS thì mik sẽ giới thiệu qua về công nghệ điện toán đám mây

**Công nghệ điện toán đám mây**
Như nhiều người đã biết, thuật ngữ “Điện toán đám mây” (Cloud Computing) để chỉ mô hình điện toán sử dụng các công nghệ máy tính và phát triển dựa vào mạng Internet. 

```
Điện toán đám mây là hình mẫu trong đó thông tin được lưu trữ thường trực tại các máy chủ trên Internet và chỉ được được lưu trữ tạm thời ở các máy khách, bao gồm máy tính cá nhân, trung tâm giải trí, máy tính trong doanh nghiệp, các phương tiện máy tính cầm tay,…

-Theo tổ chức IEEE-
```

Dịch vụ cloud (điện toán đám mây) cung cấp công nghệ cho các công ty thuê, phục vụ qua kết nối Internet và chỉ phải trả cho những gì họ sử dụng. Điều này trái ngược với phương pháp truyền thông là mua phần cứng và phần mềm rồi tự cài đặt và bảo trì.

Có rất nhiều dịch vụ gọi chung là “cloud” ngày nay nhưng chủ yếu có 2 loại: IaaS (Infrastructure-as-a-Service) và PaaS (Platform-as-a-Service). 

IaaS là dịch vụ các công ty thuê như máy chủ hay dung lượng lưu trữ.
PaaS là dịch vụ các công ty sẽ viết ứng dụng hoạt động trên cloud, thuê tất cả những thứ cần thiết để hỗ trợ ứng dụng đó.
Ngoài ra, có một loại dịch vụ nữa là SaaS (Software-as-a-Service) cho phép các công ty thuê trực tiếp ứng dụng, truy cập qua Internet. 

Chúng bao gồm các dịch vụ như Microsoft Office 365 hay Salesforce. Tất cả các dịch vụ này được gọi chung là public cloud (đám mây công cộng).

**AWS là gì?**
`Amazon Web Services` (AWS) là nền tảng dịch vụ đám mây an toàn, mang đến khả năng tính toán, lưu trữ cơ sở dữ liệu, phân phối nội dung và các chức năng khác nhằm giúp các doanh nghiệp mở rộng và phát triển.

Trước đây muốn có một trang web hay một ứng dụng nào đó, các công ty đều phải có hệ thống server vật lý của riêng mình. Việc mua các thiết bị phần cứng đã tốn kém rồi, việc lắp đặt và cài cắm cho chúng hoạt động càng tốn thời gian hơn. Hơn nữa, việc vận hành vào bảo trì sẽ cần có nhân viên IT chuyên trách, khó khăn trong việc mở rộng khi lượng người dùng tăng cao, hay giảm xuống trong các giờ thấp điểm - Khả năng scale rất thấp. Túm lại là chi phí rất cao. Điện toán đám mây là giải pháp cho vấn đề này.

Để bắt đầu với AWS các bạn có thể đăng ký tại đây: [aws.amazon.com](https://aws.amazon.com/)
## III. Dịch vụ điện toán đám mây mà AWS cung cấp gồm những gì?

**Compute**

- Amazon Elastic Computer Cloud (EC2): dịch vụ máy chủ ảo
- Elastic Load Balacing (ELB): dịch vụ cân bằng tải
- AWS Lambda: dịch vụ triển khai code không server (serverless)
- AWS Elastic Beanstalk: triển khai các ứng dụng web
- VM Import/Export: import/export ảnh các máy ảo

**Storage and Content Delivery**

- Amazon S3: dịch vụ lưu trữ đối tượng
- Amazon Glacier: dịch vụ lưu trữ dữ liệu ít truy cập
- Amazon Elastic Block Store (EBS): dịch vụ lưu trữ dạng khối, phục vụ cho EC2 nhưng độc lập EC2.
- Amazon Elastic File System (EFS): dịch vụ lưu trữ và chia sẻ file.
- Amazon CloudFront: dịch vụ phân phối nội dung (content delivery)
- Amazon Storage Gateway: dịch vụ cổng lưu trữ dữ liệu
- Amazon AWS Import/Export Snowball: dịch vụ di chuyển dữ liệu trực tiếp lên đám mây của AWS 

**Database**

- Amazon RDS: dịch vụ cơ sở dữ liệu mô hình quan hệ Amazon Aurora, Oracle, Microsoft SQL Server, PostgreSQL, MySQL & MariaDB.
- Amazon DynamoDB: dịch vụ cơ sở dữ liệu NoSQL của Amazon
- Amazon Redshift: dịch vụ kho dữ liệu của Amazon
- Amazon ElastiCache: dịch vụ cache dữ liệu của Amazon

**Networking**

- Amazon VPC: dịch vụ mạng riêng ảo
- Amazon Direct Connect: dịch vụ thiết lập kết nối dành riêng từ AWS đến DataCenter.
- Amazon Route53: dịch vụ quản lý tên miền DNS và định tuyến đến các dịch vụ của AWS.

**Deleloper tools**

- Amazon CodeCommit: dịch vụ quản lý code, có thể giao tiếp với git.
- Amazon CodeDeploy: dịch vụ triển khai code tự động lên các máy chủ ảo EC2, Lambda
- Amazon CodePipeline: dịch vụ liên quan đến code như cập nhật, biên dịch, test, …

**Management Tools**

- Amazon CloudWatch: giám sát các nguồn tài nguyên 
- AWS CloudFormation: quản lý các nguồn tài nguyên
- AWS CloudTrail: dịch vụ lưu lại lịch sử hoạt động các dịch vụ 
- AWS Config: dịch vụ quản lý cấu hình AWS
- AWS OpsWorks: dịch vụ định nghĩa cấu trúc ứng dụng
- AWS Service Catalog: dịch vụ quảng lý danh mục dịch vụ IT trên AWS
- AWS Trusted Advisor: công cụ trực tuyến giám sát giới hạn dịch vụ

**Security and Identity**

- AWS Identity and Access Management: quản lý người dùng và quyền truy cập dịch vụ AWS
- AWS Key Management Service (KMS): quản lý khóa mã hóa các dịch vụ
- AWS Directory Service: quản lý và truy cập các tài nguyên dễ dàng
- AWS WAF: dịch vụ tường lửa cho các ứng dụng web
- AWS CloudHSM: dịch vụ bảo mật các mô đun phần cứng. Sinh và quản lý khóa mã hóa. 

## III. Tại sao doanh nghiệp nên chọn AWS là giải pháp điện toán mây?
**Nền tảng AWS đáp ứng hầu hết mọi nhu cầu sử dụng**

Hơn 60 dịch vụ sẽ sẵn sàng chỉ sau một vài thao tác với AWS, từ việc lưu trữ dữ liệu đến các công cụ triển khai, thư mục để phân phối nội dung,… Các dịch vụ mới được cung cấp nhanh chóng, không cần chi phí vốn trả trước, cho phép các doanh nghiệp đã hoạt động lâu năm, các doanh nghiệp mới thành lập, các doanh nghiệp vừa và nhỏ cũng như khách hàng trong khu vực nhà nước tiếp cận các khối hợp nhất cần thiết để đáp ứng nhanh chóng các yêu cầu kinh doanh thay đổi.

**Nhanh chóng**

AWS cho phép bạn dễ dàng tiếp cận nhiều công nghệ để bạn có thể đổi mới nhanh hơn và phát triển gần như mọi thứ mà bạn có thể tưởng tượng. Bạn có thể nhanh chóng thu thập tài nguyên khi cần từ các dịch vụ cơ sở hạ tầng, như điện toán, lưu trữ, và cơ sở dữ liệu, đến Internet of Things, machine learning, kho dữ liệu và phân tích, v.v.

Bạn có thể triển khai các dịch vụ công nghệ một cách nhanh chóng và tiến hành từ khâu ý tưởng đến khâu hoàn thiện nhanh hơn một vài cấp bậc cường độ so với trước đây. Điều này cho phép bạn tự do thử nghiệm, kiểm thử những ý tưởng mới để phân biệt trải nghiệm của khách hàng và chuyển đổi doanh nghiệp.

**Quy mô linh hoạt**

Với AWS bạn không phải cung cấp tài nguyên quá mức để xử lý các hoạt động kinh doanh ở mức cao nhất trong tương lai. Thay vào đó, bạn cung cấp lượng tài nguyên mà bạn thực sự cần. Bạn có thể tăng hoặc giảm quy mô của các tài nguyên này ngay lập tức để tăng và giảm dung lượng khi nhu cầu kinh doanh của bạn thay đổi.

**Tiết kiệm chi phí**

Nền tảng đám mây cho phép bạn thay chi phí vốn (trung tâm dữ liệu, máy chủ vật lý, v.v.) bằng chi phí biến đổi và chỉ phải chi trả cho những tài nguyên CNTT mà bạn sử dụng. Bên cạnh đó, chi phí biến đổi cũng sẽ thấp hơn nhiều so với chi phí bạn tự trang trải do tính kinh tế theo quy mô.

**Triển khai trên toàn cầu chỉ trong vài phút**

Với đám mây, bạn có thể mở rộng sang các khu vực địa lý mới và triển khai trên toàn cầu trong vài phút. Ví dụ: AWS có cơ sở hạ tầng trên toàn thế giới, vì vậy, bạn có thể triển khai ứng dụng của mình ở nhiều địa điểm thực tế chỉ bằng vài cú nhấp chuột. Đặt các ứng dụng gần hơn với người dùng cuối giúp giảm độ trễ và cải thiện trải nghiệm của họ. 

## kết
Ở bài viết này mình đã giới thiệu tổng quan về AWS, các dịch vụ của AWS và các lợi ích khi dùng AWS
bài viết còn nhiều thiều sót hi vọng nhận được sự góp ý từ mọi người

Tài liệu tham khảo:  https://aws.amazon.com/