## I. AWS là gì
Trước đó ta nên tìm hiểu về điện toán đám mây. 
[Điện toán đám mây]((https://vi.wikipedia.org/wiki/%C4%90i%E1%BB%87n_to%C3%A1n_%C4%91%C3%A1m_m%C3%A2y)) (Cloud computing) là mô hình điện toán sử dụng các công nghệ máy tính và phát triển dựa vào mạng Internet. Theo tổ chức IEEE  "Nó là hình mẫu trong đó thông tin được lưu trữ thường trực tại các máy chủ trên Internet và chỉ được được lưu trữ tạm thời ở các máy khách, bao gồm máy tính cá nhân, trung tâm giải trí, máy tính trong doanh nghiệp, các phương tiện máy tính cầm tay,...". Điện toán đám mây là khái niệm tổng thể bao gồm cả các khái niệm như phần mềm dịch vụ, Web 2.0 và các vấn đề khác xuất hiện gần đây, các xu hướng công nghệ nổi bật, trong đó đề tài chủ yếu của nó là vấn đề dựa vào Internet để đáp ứng những nhu cầu điện toán của người dùng.

Vậy AWS là gì?
> AWS viết tắt của từ Amazon Web Service là một tập hợp các dịch vụ điện toán đám mây cung cấp:  storage, computing power, databases, networking, analytics, developer tools, sercurity, virtualization.

Có hàng triệu khách hàng đang tận dụng các sản phẩm và giải pháp của AWS để xây dụng các ứng dụng phức tạp với khả năng mở rộng, linh hoạt và độ tin cậy cao..

## II. Các service cơ bản
Amazon Web Service cung cấp nhiều service, ứng dụng:
* Tính toán (Compute)
* Lưu trữ (Storage)
* Phân phối mạng và nội dung (Networking & Content Delivery)
* Các Công cụ phát triển (Developer Tools)
* Các công cụ quản lý (Management Tools)
* Phân tích (Analys)
* Học máy (Machine Learning)
* Công nghệ thực tế ảo (AR & VR)
* Cam kết khách hàng (Customer Engagement)
* Tích hợp ứng dụng (Application Intergration)
* Năng suất nghiệp vụ (Business Productivity)
* Ứng dụng máy tính và Streaming (Desktop & App Streaming)

Mỗi dịch vụ trên lại chia ra các dịch vụ nhỏ hơn, ví dụ dịch vụ lưu trữ gồm dịch vụ lưu trữ đơn giản (Amazon Simple Storage Service – S3), lưu trữ theo khối (Amazon Elastic Block Storage – EBS), hệ thống file (Amazon Elastic File System – EFS)…
Ở bài viết này mình chỉ giới thiệu sơ lược qua về các Core AWS Service.

Các service cơ bản của AWS ta có thể hình dung qua hình ảnh dưới đây.
Bao gồm: VPC, EC2, RDS, S3

![](https://images.viblo.asia/6bd9ef1b-5412-4c77-8786-fe7329c813c3.png)

### 1. VPCs
> Amazon Virtual Private Cloud (Amazon VPC) 
is your private section of AWS, where you can place AWS resources and allow/restrict access to them


VPC cho phép bạn chạy các AWS resource trên 1 mạng ảo mà bạn định nghĩa. Bạn có toàn quyền kiểm soát môi trường mạng ảo bao gồm chọn phạm vi IP address, tạo subnet và cấu hình bảng định tiến và cổng mạng. Bạn có thể sử dụng cả IPv4 và IPv6 trong VPC để truy cập an toàn và dễ dàng truy cập vào tài nguyên và ứng dụng.
Bạn có thể dễ dàng tùy chỉnh cấu hình mạng cho VPC. Ví dụ:  Bạn có thể tạo ra 1 mạng con public cho web server của bạn mà có thể truy cập bằng internet và đặt backend system ví dụ như database, server trong 1 mạng con private internet không truy cập được. Bạn có thể tận dụng nhiều lớp bảo mật bao gồm nhóm bảo mật và kiểm soát danh sách truy cập.

**Lợi ích của VPC:**
* `Bảo mật`: VPC cung cấp các tính năng bảo mạt chẳng hạn như các security group và kiểm soát danh sách các network truy cập, cho phép lọc trong và ngoài ở các level instance và level subnet. Ngoài ra bạn có thể lưu trữ dữ liệu trong Amazon S3 và hạn chế quyền truy cập để nó chỉ có thể truy cập qua các instance trong VPC của bạn
* `Đơn giản`: Bạn có thể tạo 1 VPC nhanh chóng và đơn giản sử dụng AWS Management Console. Bạn có thể chọn 1 trong các thiết lập mạng phù hợp nhất với nhu cầu của mình và chọn "Start VPC Wizard." Subnet, bảng định tuyến, security group được tạo tự động cho bạn để có thể tập trung vào việc tạo ứng dụng chạy trên VPC
* `Khả dụng và độ tin cậy cao`: Amazon VPC cung cấp tất cả các lợi ích giống như phần còn lại của nền tảng AWS. Bạn có thể mở rộng resource lên hoặc xuống, chọn Amazon EC2 phù hợp với kích cỡ của ứng dụng của bạn và chỉ trả tiền cho các tài nguyên bạn sử dụng

### 2. EC2

> Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.
> 
> Amazon Elastic Compute Cloud (Amazon EC2)  là một trong những dịch vụ mà AWS cung cấp giải pháp điện toán đám mây cho phép người dùng có thể tạo, thiết lập và sử dụng VPS một cách dễ dàng


Giao diện của EC2 cho phép bạn cấu hình dung lượng với ma sát tối thiểu. Nó cung cấp cho bạn toàn quyền kiểm soát tài nguyên của bạn. EC2 giảm thời gian cài đặt và khởi động máy ảo, cho phép bạn nhanh chóng cung cấp dung lượng có thể tăng hoặc giảm một cách nhanh chóng khi các yêu cầu tính toán của bạn thay đổi.  Cung cấp cho các nhà phát triển các tools để xây dựng các ứng dụng có khả năng phục hồi thất bạn và cách ly chúng khỏi những lỗi phổ biến

**Lợi ích của EC2:**
* `Tính đàn hồi`: EC2 cho phép bạn tăng và giảm dung lượng trong vòng vài phút. Bạn có thể thực hiện trên một, hàng trăm hoặc thậm chí hàng nghìn server instance cùng một lúc.
* `Kiểm soát hoàn toàn`: Bạn có toàn quyền kiểm soát các instance bao gồm quyền truy cập root và khả năng tương tác với chúng như bạn làm trên bất kì máy nào. Có thể dừng bất kì instance trong khi giữ lại data trên vùng boot và sau đó khởi động lại bằng 1 instance giống như vậy sử dụng web service api. Instance có thể được khởi động lại từ xa bằng cách sử dụng các API service và bạn cũng có quyền truy cập vào nó bằng cách sử dụng console. 
* `Dịch vụ cloud hosting linh hoạt`:  Bạn có thể chọn nhiều loại instance, hệ điều hành và gói phần mềm.  EC2 cho phép bạn cấu hình bộ nhớ CPU và kích thước phân vùng khởi động tối ưu  cho hệ điều hành và ứng dụng của bạn.
* `Tích hợp`:  Amazon EC2 được tích hợp với hầu hết các dịch vụ AWS như Amazon Simple Storage Service (Amazon S3), Amazon Relational Database Service (Amazon RDS), và Amazon Virtual Private Cloud (Amazon VPC) cung cấp giải pháp hoàn chỉnh, bảo mật, xử lý query và lưu trữ trên nhiều ứng dụng
* `Đáng tin cậy`:  Amazon EC2 thỏa thuận cam kết 99,99% khả dụng cho từng region Amazon EC2.
* `Bảo mật`: Bảo mật tại AWS được ưu tiên cao nhất. EC2 hoạt động kết hợp với VPC giúp bảo mật một cách mạnh mẽ resource của bạn
* `Không tốn kém`: Bạn phải trả chi phí rất thấp so với những gì thực sự dùng. 
* `Dễ khởi động`: Có nhiều cách để bắt đầu với EC2. Bạn có thể sử dụng [AWS Management Console](https://aws.amazon.com/ec2/getting-started/#console), the AWS Command Line Tools (CLI), hoặc AWS SDKs. AWS sẽ cung cấp gói sử dụng miễn phí cho năm đầu tiên bạn dùng.

### 3. RDS (AMAZON Relational database service)
> RDS (AMAZON Relational database service) giúp dễ dàng thiết lập, vận hành và mở rộng cơ sở dữ liệu quan hệ trong cloud. Nó cung cấp khả năng tiết kiệm chi phí và có thể thay đổi kích cỡ khi tự động hóa các công việc của quản trị như cung cấp phần cứng, thiết lập cơ sở dữ liệu, sao lưu... 

Amazon RDS có sẵn trên 1 số loại instance database - tối ưu hóa bộ nhớ, perfomance. Cung cấp cho bạn 6 công cụ cơ sở dữ liệu quen thuộc để lựa chọn:


![](https://images.viblo.asia/88a94ad6-5dab-4944-85d6-c20a77eaa26b.png)

Bạn có thể sử dụng [AWS Database Migration Service](https://aws.amazon.com/dms/) để dễ dàng migrate hoặc replicate database hiện có của bạn cho RDS

**Các lợi ích của RDS:**
*  `Dễ quản lí`: RDS giúp dễ dàng chuyển từ project sang deployment. Sử dụng [ AWS Management Console](https://console.aws.amazon.com/rds/home) và [ AWS RDS Command-Line Interface] (https://docs.aws.amazon.com/cli/latest/reference/rds/index.html) hoặc đơn giản [API calls](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/Welcome.html) để truy cập vào cơ sở dữ liệu trên production trong vài phút. Không cần cung cấp cơ sở hạ tầng và không cần cài đặt,  maintaining phần mềm cơ sở dữ liệu.

*  `Khả năng mở rộng cao`: Bạn có thể mở rộng tài nguyên lưu trữ và tính toán cơ sở dữ liệu chỉ với vài cú click hoặc gọi API, thường không có thời gian chết. Nhiều loại engine của Amazon RDS cho phép bạn khởi động 1 hoặc nhiều [ Read Replicas](https://aws.amazon.com/rds/details/read-replicas/) để giảm tải lưu lượng đọc từ database của bạn
*  `Có sẵn và bền`:  Amazon RDS chạy trên cùng một cơ sở hạ tầng có độ tin cậy cao được sử dụng bởi các dịch vụ web khác của Amazon. Khi bạn cung cấp một DB instance [Multi-AZ ](https://aws.amazon.com/rds/details/multi-az/) Amazon RDS sao chép đồng bộ dữ liệu vào một instance dự phòng trong một vùng khả dụng khác (Availability Zone AZ). Amazon RDS có nhiều tính năng khác giúp tăng cường độ tin cậy cho cơ sở dữ liệu trên production, bao gồm sao lưu tự động, database snapshots và thay thế máy chủ tự động.
*  `Fast`: Amazon RDS hỗ trợ các ứng dụng cơ sở dữ liệu khắt khe nhất. Bạn có thể chọn giữa hai tùy chọn lưu trữ được hỗ trợ SSD: một tùy chọn được tối ưu hóa cho các ứng dụng OLTP hiệu suất cao và một ứng dụng khác cho mục đích sử dụng tiết kiệm chi phí.
*  `Bảo mật`: Amazon RDS giúp dễ dàng kiểm soát quyền truy cập mạng vào cơ sở dữ liệu của bạn . RDS cho phép bạn chạy database của mình trong [Amazon VPC](https://aws.amazon.com/vpc/) cho phép tách biệt cơ sở dữ liệu của bạn và kết nối với cơ sở hạ tầng thông qua IPsec VPN. 
*  `Không tốn kém`: Bạn trả mức giá rất thấp và chỉ cho các tài nguyên bạn thực sự tiêu thụ.

### 4. S3
Amazon S3 (Amazon Simple Storage Service) là đối tượng lưu trữ được xây dựng để lưu trữ và truy xuất bất kỳ số lượng dữ liệu từ bất cứ đâu -các trang web, ứng dụng di động, dữ liệu từ các thiết bị hoặc cảm biến loT. Nó được thiết kế để cung cấp độ bền 99.999999999%  và lưu trữ data cho hàng triệu ứng dụng.  S3 cung cấp khả năng bảo mật và đáp ứng những yêu cầu khắt khe nhất về các quy định. Nó mang đến cho khách hàng sự linh hoạt trong cách họ quản lí dữ liệu để tối ưu hóa cho phí, kiểm soát truy cập. 
Amazon S3 là dịch vụ lưu trữ đám mây được hỗ trợ nhiều nhất với sự tích hợp từ cộng đồng bên thứ 3, các đối tác tích hợp hệ thống và các dịch vụ AWS khác

**Các lợi ích của S3**:
* `Độ bền, tính tin cậy và khả năng mở rộng`: S3 chạy trên cơ sở hạ tầng tầng điện toán đám mây lớn nhất thế giới (tham khảo [tại đây](https://aws.amazon.com/about-aws/global-infrastructure/)) độ bền vững lên tới 99.999999999%. Dữ liệu trong Amazon S3 Standard, S3 Standard-IA, and Amazon Glacier storage được phân phối trên tối thiểu 3 vùng khả dụng rách biệt về mặt địa lý(Availability Zones (AZs)) và Amazon S3 cũng có thể tự động sao chép dữ liệu tới bất kỳ khu vực AWS nào khác. Cơ sở hạ tầng nằm trên toàn cầu (Global Infrastructure): Amazon Web Service có các trung tâm dữ liệu, máy chủ rải rác khắp trên thế giới. AWS cloud mở rộng 54 vùng khả dụng trên 18 khu vực địa lý. 

![](https://images.viblo.asia/e3ce39e4-fc77-4505-9911-8f836961d004.png)

* `Tính năng bảo mật và tuân thủ toàn diện`: S2 hỗ trợ 3 dạng mã hóa khác nhau. S3 cung cấp tích hợp với AWS CloudTrail để ghi lại, giám sát và duy trì các hoạt động gọi  API. S3 là nền tảng lưu trữ đám mây duy nhất cùng với [Amazon Macie](https://aws.amazon.com/macie/) sử dụng học máy để tự động tìm kiếm, phân loại và bảo vệ dữ liệu nhạy cảm trên AWS. S3 hỗ trợ các tiêu chuẩn bảo mật và được chứng nhận bao gồm: PCI-DSS, HIPAA/HITECH, FedRAMP, EU Data Protection Directive, and FISMA giúp customer đáp ứng yêuu cầu về bảo mật đối với hầu hết các cơ quan quản lí trên toàn cầu
* `Truy vấn tại địa điểm`: Amazon S3 cho phép bạn chạy phân tính Big Data trên dữ liệu của bạn mà không cần di chuyển data vào 1 hệ thống phân tích.  [Amazon Athena](https://aws.amazon.com/athena/) cung cấp cho bất kỳ ai biết truy vấn truy vấn SQL theo yêu cầu với số lượng lớn dữ liệu phi cấu trúc. [Amazon Redshift Spectrum](https://aws.amazon.com/redshift/spectrum/)  cho phép bạn chạy các truy vấn mở rộng trên kho dữ liệu và S3 của bạn.
* `Quản lý linh hoạt`: S3 cung cấp khả năng quản lí và lưu trữ linh hoạt nhất. Người quản trị có thể phân loại, báo cáo, trực quan hóa xu hướng sử dụng dữ liệu để giảm chi phí và cải thiện dịch vụ. Kể từ  khi Amazon S3 làm việc với AWS Lambda thì customer có thể xem log activities, xác định cảnh báo, gọi luồng công việc mà không cần bất kì cơ sở hạ tầng bổ sung nào.
* `Được hỗ trợ tốt nhất`: Ngoài việc tích hợp với hầu hết các dịch vụ của AWS, S3 còn được hỗ trợ bởi hàng chục nghìn nhà tư vấn, tích hợp hệ thống và các đối tác nhà cung cấp phần mềm độc lập. Ví dụ như các đối tác về giải pháp như: [ Archiving](https://aws.amazon.com/archive/) và [ Disaster Recovery](https://aws.amazon.com/disaster-recovery/). 
* `Chuyển dữ liệu dễ dàng, linh hoạt`: 
Bạn có thể chọn từ nhiều lựa chọn để chuyển dữ liệu của bạn vào hoặc ra ngoài Amazon S3. Các API đơn giản và đáng tin cậy của S3 giúp dễ dàng chuyển dữ liệu thông qua internet.  Amazon S3 Transfer Acceleration là một ý tưởng cho việc upload data trên các khoảng cách địa lý lớn. AWS Direct Connect cung cấp băng thông nhất quán và truyền dữ liệu độ trễ thấp để chuyển dữ liệu lớn sang AWS sử dụng kết nối mạng chuyên dụng. Bạn có thể sử dụng  [AWS Snowball](https://aws.amazon.com/snowball/) và [ AWS Snowball Edge](https://aws.amazon.com/snowball-edge/) để truyền dữ liệu petabyte hoặc  [AWS Snowmobile](https://aws.amazon.com/snowmobile/)cho các bộ dữ liệu thậm chí còn lớn hơn. AWS Storage Gateway cung cấp cho bạn một thiết bị vật lý hoặc ảo để sử dụng tại chỗ để dễ dàng di chuyển khối lượng hoặc các tệp tin vào AWS Cloud.


Hẹn gặp lại các bạn vào các bài viết sau về AWS. Hi vọng bài viết sẽ giúp bạn hiểu hơn về Amazon Web Service.

**Nguồn tham khảo**:

https://aws.amazon.com/ec2/ 

https://aws.amazon.com/s3/ 

https://aws.amazon.com/vpc/ 

https://aws.amazon.com/rds/

https://stackjava.com/aws/series-aws-phan-1-gioi-thieu-aws-amazon-web-servivce.html