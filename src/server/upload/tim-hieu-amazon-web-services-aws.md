*Là một kỹ sư làm việc trong lĩnh vực phần mềm, mặc dù không trực tiếp làm công việc lập trình, nhưng hay nghe các đồng nghiệp nhắc tới AWS, hay Amazon. Nghe thấy nhiều nhưng thực tế bản thân mình không hiểu AWS to lớn như nào, vận dụng ra sao, có lợi ích gì.
Ở bài viết này là sơ lược về AWS mình đọc được, nên chia sẻ lại cho những bạn cũng mơ màng như mình*

## 1. Điện toán đám mây là gì?

Điện toán đám mây là một thuật ngữ để chỉ việc lưu trữ và truy cập dữ liệu qua internet. Nó không lưu trữ bất kỳ dữ liệu nào trên đĩa cứng của máy tính cá nhân của bạn. Trong điện toán đám mây, bạn có thể truy cập dữ liệu từ một máy chủ từ xa.

## 2. AWS là gì?

Amazon web service (AWS) - dịch vụ web của Amazon là một nền tảng cung cấp các giải pháp điện toán đám mây linh hoạt, đáng tin cậy, có thể mở rộng, dễ sử dụng và đạt hiệu quả về chi phí.

AWS là một nền tảng điện toán toàn diện, dễ sử dụng được cung cấp bởi Amazon. Nền tảng được phát triển với sự kết hợp của cơ sở hạ tầng dưới dạng dịch vụ (IaaS), nền tảng là dịch vụ (PaaS) và phần mềm đóng gói dưới dạng dịch vụ (SaaS).

## 3. Lịch sử của AWS

2002 - Dịch vụ AWS ra mắt
2006 - Ra mắt sản phẩm đám mây
2012 - Tổ chức sự kiện khách hàng đầu tiên
2015 - Doanh thu đạt 4,6 tỷ USD
2016 - Vượt doanh thu mục tiêu 10 tỷ USD
2016 - Phát hành snowball và snowmobile
2019 - Cung cấp gần 100 dịch vụ đám mây

## 4. Tầm quan trọng của dịch vụ AWS

Amazon Web Services cung cấp một loạt các sản phẩm dựa trên đám mây toàn cầu cho các mục đích kinh doanh khác nhau. Các sản phẩm bao gồm lưu trữ, cơ sở dữ liệu, phân tích, mạng, dịch vụ di động, công cụ phát triển, ứng dụng doanh nghiệp, với mô hình định giá  một khoản thanh toán khi bạn sử dụng

![](https://images.viblo.asia/3fe789da-fdea-4d11-8e92-895683b1d986.png)


## Các dịch vụ cần thiết của AWS

### Dịch vụ điện toán AWS (AWS Compute Services)

Đây chính là các dịch vụ điện toán đám mây do Amazon cung cấp:

1. **EC2** (Elastic Compute Cloud) - EC2 là một máy ảo trong đám mây mà bạn có quyền kiểm soát cấp độ hệ điều hành. Bạn có thể chạy máy chủ đám mây này bất cứ khi nào bạn muốn.
2. **LightSail** - Công cụ điện toán đám mây này tự động triển khai và quản lý máy tính, lưu trữ và khả năng kết nối mạng cần thiết để chạy các ứng dụng của bạn.
3. **Elastic Beanstalk** - Công cụ cung cấp triển khai tự động và cung cấp các tài nguyên như một trang web sản xuất có khả năng mở rộng cao.
4. **EKS** (Elastic Container Service for Kubernetes) - Công cụ cho phép bạn truy cập Kubernetes trên môi trường đám mây Amazon mà không cần cài đặt.
5. **AWS Lambda** - Dịch vụ này cho phép chạy các chức năng trong đám mây. Công cụ này là một trình tiết kiệm chi phí lớn với việc chỉ trả tiền khi các chức năng được thực thi.


### Migration

Dịch vụ di chuyển được sử dụng để truyền dữ liệu vật lý giữa trung tâm dữ liệu của bạn và AWS.

1. **DMS** (Database Migration Service) -DMS có thể được sử dụng để di chuyển cơ sở dữ liệu tại chỗ sang AWS. Nó giúp bạn di chuyển từ một loại cơ sở dữ liệu sang loại khác - ví dụ: Oracle sang MySQL.
2. **SMS**(Server Migration Service) - Dịch vụ di chuyển SMS cho phép bạn di chuyển các máy chủ tại chỗ sang AWS một cách dễ dàng và nhanh chóng.
3. **Snowball** - Snowball là một ứng dụng nhỏ cho phép bạn truyền terabyte dữ liệu bên trong và bên ngoài môi trường AWS.

### Lưu trữ (Storage)

1. **Amazon Glacier**- Đây là một dịch vụ lưu trữ chi phí cực kỳ thấp. Nó cung cấp lưu trữ an toàn và nhanh chóng để lưu trữ và sao lưu dữ liệu.
2. **Amazon Elastic Block Store** (EBS) - Nó cung cấp lưu trữ cấp khối để sử dụng với các phiên bản Amazon EC2. Khối lượng Amazon Store Block Store được gắn mạng và vẫn độc lập với vòng đời của một instance
3. **AWS Storage Gateway** - Dịch vụ AWS này đang kết nối các ứng dụng phần mềm tại chỗ với lưu trữ dựa trên đám mây. Nó cung cấp tích hợp an toàn giữa cơ sở tại chỗ của công ty và cơ sở hạ tầng lưu trữ của AWS.


### Dịch vụ an ninh (Security Services)

1. **IAM** (Identity and Access Management) - IAM là một dịch vụ bảo mật đám mây giúp bạn quản lý người dùng, gán chính sách, nhóm biểu mẫu để quản lý nhiều người dùng.
2. **Inspector** - Đây là một tác nhân mà bạn có thể cài đặt trên các máy ảo của mình, báo cáo mọi lỗ hổng bảo mật.
3. **Certificate Manager ** - Dịch vụ cung cấp chứng chỉ SSL miễn phí cho các tên miền của bạn được quản lý bởi Route53.
4. **WAF** (Web Application Firewall)  - Dịch vụ bảo mật WAF cung cấp bảo vệ cấp ứng dụng và cho phép bạn chặn SQL  injection và giúp chặn các cuộc tấn công kịch bản cross-site.
5. **Cloud Directory**  - Dịch vụ này cho phép bạn tạo các thư mục gốc, quản lý linh hoạt để phân cấp dữ liệu theo nhiều chiều.
6. **KMS** (Key Management Service) - Đây là một dịch vụ quản lý. Dịch vụ bảo mật này giúp bạn tạo và kiểm soát các khóa mã hóa, cái mà cho phép bạn mã hóa dữ liệu của mình.
7. **Organizations**  - Bạn có thể tạo các nhóm tài khoản AWS bằng dịch vụ này để quản lý cài đặt bảo mật và tự động hóa.
8. **Shield** - Shield được quản lý DDoS (Dịch vụ bảo vệ từ chối dịch vụ phân tán). Nó cung cấp các biện pháp bảo vệ chống lại các ứng dụng web chạy trên AWS.
9. **Macie** - Nó cung cấp một dịch vụ bảo mật khả năng hiển thị dữ liệu giúp phân loại và bảo vệ nội dung quan trọng nhạy cảm của bạn.
10. **GuardDuty** -  Cung cấp phát hiện mối đe dọa để bảo vệ tài khoản AWS và khối lượng công việc của bạn.


### Dịch vụ cơ sở dữ liệu (Database Services)

1. **Amazon RDS**- Dịch vụ  này dễ dàng thiết lập, vận hành và mở rộng cơ sở dữ liệu quan hệ trong đám mây.
2. **Amazon DynamoDB**- Đây là một dịch vụ cơ sở dữ liệu NoQuery nhanh, được quản lý đầy đủ. Đây là một dịch vụ đơn giản cho phép lưu trữ và truy xuất dữ liệu hiệu quả. Nó cũng cho phép bạn phục vụ bất kỳ mức lưu lượng được yêu cầu.
3. **Amazon ElastiCache**- Đây là một dịch vụ web giúp dễ dàng triển khai, vận hành và mở rộng bộ đệm trong bộ nhớ đám mây.
4. **Neptune**- Đây là một dịch vụ cơ sở dữ liệu đồ thị nhanh, đáng tin cậy và có thể mở rộng.
5. **Amazon RedShift** - Đây là giải pháp lưu trữ dữ liệu của Amazon mà bạn có thể sử dụng để thực hiện các truy vấn OLAP phức tạp.


### Phân tích (Analytics)

1. **Athena** - Dịch vụ phân tích này cho phép truy vấn SQL trên nhóm S3 để tìm tệp.
2. **CloudSearch** - Bạn nên sử dụng dịch vụ AWS này để tạo công cụ tìm kiếm được quản lý hoàn toàn cho trang web của mình.
3. **ElasticSearch** - Nó tương tự như CloudSearch. Tuy nhiên, nó cung cấp nhiều tính năng hơn như giám sát ứng dụng.
4. **Kinesis** - Dịch vụ phân tích AWS này giúp bạn truyền phát và phân tích dữ liệu thời gian thực ở quy mô lớn.
5. **QuickSight** - Nó là một công cụ phân tích kinh doanh. Nó giúp bạn tạo trực quan hóa trong bảng điều khiển cho dữ liệu trong Dịch vụ web của Amazon. Ví dụ: S3, DynamoDB, v.v.
6. **EMR** (Elastic Map Reduce) Dịch vụ phân tích AWS này chủ yếu được sử dụng để xử lý dữ liệu lớn như Spark, Splunk, Hadoop, v.v.
7. **Data Pipeline** - Cho phép bạn di chuyển dữ liệu từ nơi này sang nơi khác. Ví dụ: từ DynamoDB đến S3.

### Dịch vụ quản lý (Management Services)

1. **CloudWatch** - Cloud watch giúp bạn giám sát các môi trường AWS như EC2, RDS và sử dụng CPU. Nó cũng kích hoạt báo động phụ thuộc vào các số liệu khác nhau.
2. **CloudFormation** - Đó là một cách biến cơ sở hạ tầng trong đám mây. Bạn có thể sử dụng các mẫu để cung cấp toàn bộ môi trường sản xuất trong vài phút.
3. **CloudTrail** - Nó cung cấp một phương pháp dễ dàng để kiểm tra tài nguyên AWS. Nó giúp bạn đăng nhập tất cả các thay đổi.
4. **OpsWorks** - Dịch vụ cho phép bạn tự động triển khai Chef / Puppet trên môi trường AWS.
5. **Config** - Dịch vụ AWS này giám sát môi trường của bạn. Công cụ sẽ gửi thông báo về những thay đổi khi bạn phá vỡ một số cấu hình được xác định.
6. **Service Catalog** - Dịch vụ này giúp các doanh nghiệp lớn cho phép người dùng sẽ sử dụng dịch vụ nào và dịch vụ nào sẽ không được sử dụng.
7. **AWS Auto Scaling** - Dịch vụ cho phép bạn tự động mở rộng quy mô tài nguyên của mình dựa trên số liệu CloudWatch đã cho.
8. **Systems Manager** - Dịch vụ AWS này cho phép bạn nhóm các tài nguyên của mình. Nó cho phép bạn xác định các vấn đề và hành động với chúng.
9. **Managed Services** - Nó cung cấp khả năng quản lý cơ sở hạ tầng AWS cho phép bạn tập trung vào các ứng dụng của mình.

### Internet of Things
1. **IoT Core** - Theo Wiki Đây là dịch vụ AWS trên nền tảng đám mây được quản lý. Dịch vụ cho phép các thiết bị được kết nối như ô tô, bóng đèn, lưới cảm biến, tương tác an toàn với các ứng dụng đám mây và các thiết bị khác.
2. **IoT Device Management** - Nó cho phép bạn quản lý các thiết bị IoT của mình ở mọi quy mô.
3. **IoT Analytics**  - Dịch vụ AWS IOT này rất hữu ích để thực hiện phân tích dữ liệu được thu thập bởi các thiết bị IoT của bạn.
4. **Amazon FreeRTOS** - Hệ điều hành thời gian thực dành cho vi điều khiển này giúp bạn kết nối các thiết bị IoT trong máy chủ cục bộ hoặc vào đám mây.


### Application Services

1. **Step Functions** - Đây là một cách trực quan hóa những gì bên trong ứng dụng và những dịch vụ siêu nhỏ khác nhau mà nó đang sử dụng.
2. **SWF** (Simple Workflow Service) - Dịch vụ giúp bạn phối hợp cả nhiệm vụ tự động và nhiệm vụ do con người thực hiện.
3. **SNS** (Simple Notification Service)  - Bạn có thể sử dụng dịch vụ này để gửi thông báo dưới dạng email và SMS dựa trên các dịch vụ AWS đã cho.
4.  **SQS** (Simple Queue Service)  - Sử dụng dịch vụ AWS này để tách các ứng dụng của bạn. Đây là một dịch vụ dựa dịch vụ pull-based
5. **Elastic Transcoder**- Dịch vụ này giúp bạn thay đổi định dạng và độ phân giải của video để hỗ trợ các thiết bị khác nhau như máy tính bảng, điện thoại thông minh và máy tính xách tay có độ phân giải khác nhau.

### Triển khai và quản lý (Deployment and Management)

1. **AWS CloudTrail**: Các dịch vụ ghi lại các cuộc gọi API AWS và gửi các tệp tồn đọng cho bạn.
2. **Amazon CloudWatch**: Các công cụ giám sát các tài nguyên AWS như Amazon EC2 và Amazon RDS DB Instances. Nó cũng cho phép bạn theo dõi các số liệu tùy chỉnh được tạo bởi các ứng dụng và dịch vụ của người dùng.
3. **AWS CloudHSM**: Dịch vụ AWS này giúp bạn đáp ứng các yêu cầu tuân thủ của công ty, theo quy định và theo hợp đồng để duy trì bảo mật dữ liệu bằng cách sử dụng các thiết bị Mô-đun bảo mật phần cứng (HSM) trong môi trường AWS.


### Những công cụ phát triển (Developer Tools)

1. **Codestar** - Codestar là một dịch vụ dựa trên đám mây để tạo, quản lý và làm việc với các dự án phát triển phần mềm khác nhau trên AWS.
2. **CodeCommit** - Đây là dịch vụ kiểm soát phiên bản của AWS cho phép bạn lưu trữ mã và các tài sản khác một cách riêng tư trên đám mây.
3. **CodeBuild** - Dịch vụ nhà phát triển Amazon này giúp bạn tự động hóa quá trình xây dựng và biên dịch mã của bạn.
4. **CodeDeploy** - Đây là cách triển khai mã của bạn trong các phiên bản EC2 tự động.
5. **CodePipeline** - Nó giúp bạn tạo ra một đường dẫn triển khai như thử nghiệm, xây dựng, thử nghiệm, xác thực, triển khai trên các môi trường phát triển và sản xuất.
6. **Cloud9** - Nó là một Môi trường phát triển tích hợp để viết, chạy và gỡ lỗi mã trong đám mây.


### Dịch vụ di động (Mobile Services)

1. **Mobile Hub** - Cho phép bạn thêm, cấu hình và thiết kế các tính năng cho ứng dụng di động.
2. **Cognito** - Cho phép người dùng đăng ký bằng danh tính xã hội của người đó.
3. **Device Farm** - Giúp bạn cải thiện chất lượng ứng dụng bằng cách nhanh chóng kiểm tra hàng trăm thiết bị di động.
4. **AWS AppSync** - Là một dịch vụ GraphQL được quản lý hoàn toàn, cung cấp các tính năng lập trình ngoại tuyến và đồng bộ hóa dữ liệu theo thời gian thực.

### Business Productivity

1. **Alexa for Business** - Nó trao quyền cho tổ chức của bạn bằng giọng nói. Sử dụng Alexa, nó sẽ cho phép bạn xây dựng các kỹ năng giọng nói tùy chỉnh cho tổ chức của mình.
2. **Chime** - Có thể được sử dụng cho cuộc họp trực tuyến và hội nghị video.
3. **WorkDocs** - Giúp lưu trữ tài liệu trên đám mây
4. **WorkMail** - Cho phép bạn gửi và nhận email doanh nghiệp.


### Truyền phát trên Desktop và APP (Desktop & App Streaming)

1. **WorkSpaces** - Workspace là một VDI (Cơ sở hạ tầng màn hình ảo). Nó cho phép bạn sử dụng máy tính để bàn từ xa trong đám mây.
2. **AppStream** - Một cách truyền phát các ứng dụng máy tính để bàn tới người dùng của bạn trong trình duyệt web. Ví dụ: sử dụng MS Word trong Google Chrome.

### Trí tuệ nhân tạo (Artificial Intelligence)

1. **Lex** - Công cụ Lex giúp bạn xây dựng chatbot một cách nhanh chóng.
2. **Polly** - Đây là dịch vụ chuyển văn bản thành giọng nói của AWS cho phép bạn tạo các phiên bản âm thanh từ ghi chú của mình.
3. **Rekognition** - Đây là dịch vụ nhận diện khuôn mặt của AWS. Dịch vụ AWS này giúp bạn nhận diện khuôn mặt và đối tượng trong hình ảnh và video.
4. **SageMaker** - Cho phép bạn xây dựng, đào tạo và triển khai các mô hình học máy ở mọi quy mô.
5. **Transcribe** - Đây là dịch vụ chuyển lời nói thành văn bản của AWS cung cấp bản dịch chất lượng cao và giá cả phải chăng.
6. **Translate** - Đây là một công cụ rất giống với Google Dịch cho phép bạn dịch văn bản bằng ngôn ngữ này sang ngôn ngữ khác.


### AR & VR (Augmented Reality & Virtual Reality)

1. **Sumerian** - Sumerian là một bộ công cụ để cung cấp trải nghiệm thực tế ảo (VR) chất lượng cao trên web. Dịch vụ cho phép bạn tạo các cảnh 3D tương tác và xuất bản dưới dạng trang web để người dùng truy cập.


### Customer Engagement

1. **Amazon Connect** - Amazon Connect cho phép bạn tạo trung tâm chăm sóc khách hàng của mình trên đám mây.
2. **Pinpoint** - Pinpoint giúp bạn hiểu người dùng của mình và tương tác với họ.
3. **SES** (Simple Email Service) - Giúp bạn gửi email hàng loạt cho khách hàng với mức giá tương đối hiệu quả.


### Game Development

**GameLift**- Đây là một dịch vụ được quản lý bởi AWS. Bạn có thể sử dụng dịch vụ này để lưu trữ các máy chủ trò chơi chuyên dụng. Nó cho phép bạn mở rộng quy mô liên tục mà không cần đưa trò chơi của bạn ngoại tuyến.


## 5. Các ứng dụng của dịch vụ AWS

Các dịch vụ web của Amazon được sử dụng rộng rãi cho các mục đích điện toán khác nhau như:

- Lưu trữ Trang web
- Lưu trữ ứng dụng / lưu trữ SaaS
- Chia sẻ đa phương tiện (Hình ảnh / Video)
- Ứng dụng di động và xã hội
- Phân phối nội dung và phân phối truyền thông
- Lưu trữ, sao lưu và khắc phục thảm họa
- Môi trường phát triển và thử nghiệm
- Máy tính học thuật
- Công cụ tìm kiếm
- Mạng xã hội


## 6. Các công ty sử dụng AWS

- Instagram
- Zoopla
- Smugmug
- Pinterest
- Netflix
- Dropbox
- Etsy
- Talkbox
- Playfish
- Ftopia

### *Ưu điểm của AWS*

- AWS cho phép các tổ chức sử dụng các mô hình lập trình, hệ điều hành, cơ sở dữ liệu và kiến trúc đã quen thuộc.
- Đây là một dịch vụ hiệu quả về chi phí, cho phép bạn chỉ trả tiền cho những gì bạn sử dụng, mà không có bất kỳ cam kết dài hạn hoặc dài hạn nào.
- Bạn sẽ không cần phải chi tiền cho việc chạy và duy trì các trung tâm dữ liệu.
- Cung cấp triển khai nhanh
- Bạn có thể dễ dàng thêm hoặc loại bỏ dung lượng.
- Bạn được phép truy cập đám mây một cách nhanh chóng với khả năng vô hạn.
- Tổng chi phí sở hữu rất thấp so với bất kỳ máy chủ riêng / chuyên dụng nào.
- Cung cấp quản lý và thanh toán tập trung
- Cung cấp khả năng hỗn hợp (Hybrid)
- Cho phép bạn triển khai ứng dụng của mình ở nhiều khu vực trên khắp thế giới chỉ bằng vài cú nhấp chuột


### *Nhược điểm của AWS*
- Nếu bạn cần hỗ trợ ngay lập tức hoặc chuyên sâu hơn, bạn sẽ phải chọn các gói hỗ trợ trả phí.
- Dịch vụ web của Amazon có thể có một số vấn đề về điện toán đám mây phổ biến khi bạn chuyển sang đám mây. Ví dụ, thời gian chết, kiểm soát hạn chế và bảo vệ dự phòng.
- AWS đặt giới hạn mặc định cho các tài nguyên khác nhau giữa các vùng. Những tài nguyên này bao gồm hình ảnh, khối lượng và ảnh chụp nhanh.
- Thay đổi ở phần cứng xảy ra với ứng dụng của bạn, điều này có thể không mang lại hiệu suất và mức độ sử dụng tốt nhất cho các ứng dụng của bạn.

Tài liệu tham khảo:
https://www.guru99.com/what-is-aws.html