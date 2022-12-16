## 1. Thực tế, AWS cung cấp bao nhiêu services ?
Amazon Web Services (AWS) là nền tảng đám mây toàn diện và được sử dụng rộng rãi nhất, cung cấp trên 200 dịch vụ đầy đủ tính năng từ các trung tâm dữ liệu trên toàn thế giới. Hàng triệu khách hàng—bao gồm các công ty khởi nghiệp tăng trưởng nhanh nhất, các tập đoàn lớn nhất cũng như các cơ quan hàng đầu của chính phủ—đều tin tưởng vào AWS để giảm chi phí, trở nên linh hoạt hơn và đổi mới nhanh hơn.

AWS gồm 26 nhóm services. Trong bài này, mình giới thiệu 13 nhóm services chính.

## 2. AWS Services
### Điện toán | Compute
- EC2 — máy chủ ảo trên đám mây
- Lambda — Chạy mã phản hồi cho sự kiện
- Elastic Beanstalk — Chạy và quản lý ứng dụng web 

### Container
- ECR ( Amazon Elastic Container Registry ) — Dễ dàng lưu trữ, quản lý và triển khai hình ảnh container
- ECS ( Amazon Elastic Container Service ) — Dịch vụ có độ bảo mật cao, đáng tin cậy và quy mô linh hoạt để chạy các container
- EKS ( Amazon Elastic Kubernetes Service )— Giải pháp đáng tin cậy nhất để chạy Kubernetes

### Lưu trữ | Storage
- S3 — Lưu trữ có khả năng thay đổi quy mô trên đám mây
- EFS — Hệ thống tập tin được quản lý toàn phần cho EC2

### Cơ sở dữ liệu | Database
- RDS — Dịch vụ cơ sở dữ liệu quan hệ được quản lý cho MySQL, PostgreSQL, Oracle, SQL Server và MariaDB
- DynamoDB — Cơ sở dữ liệu NoSQL được quản lý
- ElastiCache — Hệ thống bộ nhớ đệm trong bộ nhớ

### Kết nối mạng và phân phối nội dung | Networking and Content Delivery
- VPC — Tài nguyên trên đám mây bị cách ly
- Route53 — Hệ thống tên miền có khả năng mở rộng
- CloudFront — Hệ thống mạng phân phối nội dung toàn cầu
- API Gateway — Xây dựng, triển khai và quản lý API

### Bảo mật, định danh và tuân thủ | Security, Identity & Compliance
- IAM (AWS Identity & Access Management) — Quản lý truy cập vào các dịch vụ và tài nguyên một cách bảo mật
- Cognito — Quản lý định danh cho ứng dụng của bạn
- KMS (  AWS Key Management Service ) — Quá trình tạo và kiểm soát khóa mã hóa được quản lý
- WAF — Lọc lưu lượng truy cập web độc hại
- Shield — Bảo vệ chống DDoS

### Tích hợp ứng dụng | Application Integration
- SQS (  Amazon Simple Queue Service ) — Hàng đợi tin nhắn được quản lý
- SNS ( Amazon Simple Notification Service ) — Thông báo đẩy bằng cơ chế Pub/sub, SMS, email và di động
- EventBridge — Bus sự kiện phi máy chủ dành cho ứng dụng SaaS và các dịch vụ AWS
- Step Function — Điều phối các ứng dụng phân tán

### Front-End Web & Di động | Front-end Web & Mobile
- Amplify — Dựng và triển khai ứng dụng di động và web
- AppSync — Tăng cường sức mạnh cho ứng dụng của bạn với dữ liệu phù hợp từ nhiều nguồn, trên quy mô lớn

### Quản lý và Quản trị | Management and Governance
- Cloudwatch — Theo dõi tài nguyên và ứng dụng
- Cloudformation — Tạo và quản lý tài nguyên bằng mẫu

### Phân tích | Analytics
- Kinesis — Thao tác với dữ liệu phát trực tuyến trong thời gian thực
- Cloudsearch — Dịch vụ tìm kiếm được quản lý
- Amazon Redshift — Lưu kho dữ liệu nhanh, đơn giản và tiết kiệm chi phí
- Elasticsearch — Chạy và mở rộng cụm máy chủ Elasticsearch
- MSK (  Amazon Managed Streaming for Apache Kafka ) — Dịch vụ Apache Kafka được quản lý toàn phần

### Di chuyển và truyền dữ liệu | Migration & Transfer
- Database Migration Service — Di chuyển cơ sở dữ liệu với thời gian ngừng hoạt động tối thiểu
- Server Migration Service — Di chuyển máy chủ tại chỗ sang AWS
- AWS Migration Hub — Theo dõi các hoạt động di chuyển từ một nơi duy nhất

### Công cụ dành cho nhà phát triển | Developer Tools
- Cloud9 — Viết, chạy và gỡ lỗi mã trên IDE đám mây
- X-Ray — Phân tích và gỡ lỗi ứng dụng của bạn
- CodeCommit — Lưu trữ mã trong kho dữ liệu git riêng
- CodeBuild — Xây dựng và chạy thử mã
- CodePipeline — Phát hành phần mềm bằng phân phối liên tục
- CodeDeploy — Tự động hóa việc triển khai mã

### Machine Learning
- Amazon SageMaker — Xây dựng, đào tạo và triển khai các mô hình Machine Learning ở quy mô lớn
- Amazon Kendra — Tìm kiếm Reinvent enterprise với ML

Ngoài ra, còn rất nhiều dịch vụ khác nữa mà mình không thể liệt kê hết ở đây, đối với bài kiểm tra AWS Certified Developer - Associate (DVA-C01) có tập trung vào 1 số dịch vụ kể trên. Cảm ơn các bạn đã đọc, hẹn các bạn ở các bài viết sau.

## 3. Các khái niệm dễ gây nhầm lẫn
Trong quá trình mới bắt đầu học AWS, đôi khi có những khái niệm dễ gây nhầm lẫn, mà mình sẽ nói tới sau đây:

### 1. Private Subnet và Public Subnet
- Public Subnet là các subnet gắn với Route Table, trong Route Table định nghĩa các rules đi ra Internet thông qua Internet Gateway. Public Subnet dùng khi bạn muốn public các resources như web server, UUID trong hệ thống của AWS cho Internet. Các thực thể ngoài Internet có thể truy cập vào resource trong public subnet. 
- Private Subnet thì không có luật này. Những resources không muốn public ra Internet như database, sẽ được xây dựng trong Private Subnet, chỉ cho các thành phần nội bộ trong hệ thống được truy cập.

### 2. NACL(Network Access Control List) và SG (Security Group)
- NACL dùng để security cho toàn bộ resource trong subnet. 
NACL là stateless, nghĩa là request đi vào subnet sẽ được check qua inbound rules của NACL, và response được trả về cũng sẽ thông qua các outbound rules của NACL để check xem có được phép ra ngoài Internet không.
Ngoài ra, NACL có thể set các luật deny, dùng để detect đối với những request có lượng trafic bất thường. Trong khi đó, SG không có tính năng này.
- SG chỉ dùng để security cho các instance được gắn vào nó, như EC2
SG là stateful, nghĩa là request đi vào SG sẽ được check qua SG's rules. Khi request này được cho phép đi vào instances, SG sẽ lưu lại trạng thái của request này trong bảng trạng thái. Khi response của request được trả về, không phải check qua SG's rule, mà sẽ check trong bảng trạng thái. Nếu request được đi vào instances thì chắc chắn sẽ được đi ra ngoài Internet.

Thường thì trong các dự án rất ít khi sử dụng NACL, hoặc nếu dùng thì sẽ thiết lập các rules cho NACL sao cho đơn giản nhất có thể. Quan trọng vẫn là thiết lập rule cho SG sao cho chặt chẽ nhất. Nếu ta đều thiết lập chặt chẽ cả 2 layers này thì sẽ phát sinh ra những lỗi kết nối

### 3. EBS (Elastic Block Storage) và S3
- EBS lưu được tất cả mọi thứ do dữ liệu dưới dạng block, dữ liệu sẽ được băm nhỏ thành các block giống nhau và được lưu vào ổ đĩa.
- S3 chỉ nên lưu dữ liệu tĩnh như image, PDF, text, video,... vì S3 lưu dưới dạng object, gồm block dữ liệu và meta data để mô tả các object đó. Cơ chế lưu trữ của object không có update_in_place. Khi update object => tạo một object mới, rồi mới đẩy object đó lên S3 để lưu trữ. Những dữ liệu động như database không nên được lưu vào S3. 

### 4. NAT Instance và NAT gateway
NAT là Network Address Translation, với các resources trong private subnet, ta thường gắn thêm NAT, NAT đổi source IP của các resources thành IP của NAT, khi request được gửi ra, ngoài Internet sẽ thấy IP của NAT(public IP)
+ NAT Instance: instances được cài các chức năng của NAT
+ NAT Gateway: dịch vụ cung cấp bởi AWS
Khi dùng NAT, khuyến khích sử dụng NAT Gateway hơn. Vì NAT Gateway là dịch vụ được cung cấp bởi AWS sẽ mang lại value hơn là mình tự cài đặt.

### 5. AMI và Snapshot
- AMI (Amazon Machine Image) bản copy hoàn chỉnh của 1 instance, là 1 tài liệu mô tả, volumn mount, mount point, meta data, chi tiết permission. Như là 1 document của instances.
- Trong khi đó, Snapshot chỉ back-up lại volume. Là bản sao của một volumn.