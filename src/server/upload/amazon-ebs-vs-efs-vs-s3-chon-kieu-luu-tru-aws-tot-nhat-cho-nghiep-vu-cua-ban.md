Chiến lược lưu trữ bạn chọn đóng một vai trò quan trọng trong hiệu suất bạn nhận được cũng như chi phí bạn sẽ bỏ ra. Để đạt được hiệu quả cao nhất, bạn phải phù hợp với nhu cầu điện toán, ứng dụng và xử lý của hệ thống với công nghệ lưu trữ thích hợp. Nhưng lựa chọn nào phù hợp với bạn?

Để trả lời câu hỏi này, chúng ta sẽ khám phá sự khác biệt giữa Amazon Elastic Block Store (Amazon EBS), Amazon Elastic File System (Amazon EFS) và Amazon Simple Storage Service (Amazon S3), đồng thời hiểu được các lợi ích và cách sử dụng riêng của từng giải pháp. Điều này sẽ giúp bạn dễ dàng chọn giải pháp tốt nhất để hỗ trợ các mục tiêu kinh doanh và nhu cầu lưu trữ của mình.

### Sự khác biệt giữa Amazon EBS Vs EFS Vs S3 là gì?

Amazon EFS, Amazon EBS và Amazon S3 là ba loại lưu trữ khác nhau của AWS có thể áp dụng cho các loại nhu cầu khối lượng công việc khác nhau. Chúng ta hãy xem xét kỹ hơn các tính năng chính của từng tùy chọn, cũng như những điểm giống và khác nhau.

**Amazon EBS** cung cấp khối lượng lưu trữ theo mức block (block-level) có tính khả dụng cao cho các phiên bản Amazon Elastic Compute Cloud (EC2).

Nó lưu trữ dữ liệu trên hệ thống file được giữ lại sau khi phiên bản EC2 bị tắt.

**Amazon EFS** cung cấp khả năng lưu trữ file có thể mở rộng, cũng được tối ưu hóa cho EC2 như EBS. 

Nó có thể được sử dụng như một nguồn dữ liệu chung cho bất kỳ ứng dụng hoặc khối lượng công việc nào chạy trên nhiều instances.
****
Sử dụng hệ thống tệp EFS, bạn có thể config instances để gắn([mount](https://docs.aws.amazon.com/efs/latest/ug/mounting-fs.html)) file system. 

Sự khác biệt chính giữa EBS và EFS là EBS chỉ có thể truy cập được từ một phiên bản EC2 duy nhất trong khu vực(region) AWS cụ thể của bạn, trong khi EFS cho phép bạn gắn(mount) file system trên nhiều region và intances.

Cuối cùng, **Amazon S3** là một kho lưu trữ object rất hiệu quả trong việc lưu trữ số lượng lớn các bản sao lưu hoặc tệp người dùng.

Không giống như EBS hoặc EFS, S3 không bị giới hạn ở EC2. Các tệp được lưu trữ trong S3 bucket có thể được truy cập bằng code hoặc trực tiếp từ các dịch vụ như AWS CloudFront. Đây là lý do tại sao nhiều trang web sử dụng nó để lưu giữ nội dung và tệp media của họ, những tệp này có thể được tận dụng hiệu quả từ AWS CloudFront.

Vậy làm thế nào bạn có thể lựa chọn giữa Amazon EBS vs EFS và S3? Điều đó phụ thuộc vào những lợi ích bạn đang tìm kiếm và trường hợp sử dụng cho khối lượng công việc của bạn. Hãy cùng xem xét chuyên sâu từng cái để hiểu những lợi ích và trường hợp sử dụng của chúng.


### Amazon Elastic Block Store (Amazon EBS)

Sử dụng Amazon EBS để cung cấp dung lượng lưu trữ cho các ổ đĩa của máy ảo của bạn. 

Nó lưu trữ dữ liệu trong các khối có kích thước bằng nhau và tổ chức chúng thành một hệ thống phân cấp tương tự như một hệ thống files truyền thống. 

Các ổ có kích thước được định sẵn và được gắn vào các instances EC2 theo cách tương tự như ổ đĩa trên máy vật lý. 

Dưới đây là các lợi ích và trường hợp sử dụng của EBS:

**Lợi ích của Amazon EBS**

- Tối ưu hóa hiệu suất: Tăng thông lượng bằng cách tận dụng dung lượng mạng và tối thiểu kết nối mạng giữa các instance và EBS.
- Hiệu suất độ trễ thấp: Bằng cách sử dụng SSD EBS, nó cung cấp hiệu suất I / O đáng tin cậy được mở rộng để đáp ứng nhu cầu khối lượng công việc của bạn.
- Khả năng lưu trữ an toàn và khả dụng cao: Ổ đĩa EBS cung cấp khả năng dự phòng trong Availability Zones trong khi kiểm soát truy cập và mã hóa tăng cường bảo mật.
- Khả năng hoán đổi địa lý cho nhau: Với EBS, bạn có thể sao chép snapshots  trên khắp các region AWS và đặt tài nguyên và dữ liệu ở nhiều vị trí. Điều này làm cho việc khôi phục dữ liệu, di chuyển trung tâm dữ liệu và mở rộng địa lý trở nên đơn giản.
- Sao lưu và khôi phục dữ liệu dễ dàng: snapshots theo thời gian bảo vệ dữ liệu.
- Tăng hoặc giảm quy mô nhanh chóng: EBS có thể nhanh chóng mở rộng quy mô khối lượng, đảm bảo bạn có được hiệu suất và công suất phù hợp cho các nhu cầu máy tính đang thay đổi.

**Các trường hợp sử dụng Amazon EBS**

- Kiểm thử và phát triển: Bạn có thể mở rộng quy mô, lưu trữ, nhân bản hoặc cung cấp môi trường test, dev hoặc production  của mình.
- Cơ sở dữ liệu NoSQL: EBS cung cấp cho cơ sở dữ liệu NoSQL hiệu suất độ trễ thấp và độ tin cậy mà chúng cần để đạt hiệu suất cao nhất.
- Cơ sở dữ liệu quan hệ: EBS mở rộng quy mô để đáp ứng nhu cầu lưu trữ thay đổi của bạn. Điều này làm cho nó trở thành một lựa chọn tuyệt vời để triển khai cơ sở dữ liệu, bao gồm PostgreSQL, MySQL, Oracle hoặc Microsoft SQL Server.
- Tính nhất quán trong kinh doanh: Sao chép Ảnh chụp nhanh EBS và Hình ảnh máy Amazon (AMI) để chạy các ứng dụng trong các khu vực AWS khác nhau. Điều này làm giảm mất mát dữ liệu và tăng tốc thời gian khôi phục bằng cách sao lưu các tệp nhật ký và dữ liệu thường xuyên, trên các khu vực địa lý.
- Ứng dụng quy mô doanh nghiệp: Nó có thể đáp ứng nhiều nhu cầu điện toán khác nhau của doanh nghiệp thông qua lưu trữ khối mạnh mẽ có thể hỗ trợ các ứng dụng quan trọng nhất của bạn, chẳng hạn như Microsoft Exchange, Oracle hoặc Microsoft SharePoint.


### Amazon Elastic File System (Amazon EFS)

EFS là lựa chọn tốt nhất để chạy bất kỳ ứng dụng nào có khối lượng công việc cao, yêu cầu lưu trữ có thể mở rộng và phải tạo ra đầu ra nhanh chóng. 
Nó tự động mở rộng quy mô, ngay cả khi đáp ứng khối lượng công việc đột ngột nhất. 

Sau khi hết thời gian nhu cầu lưu trữ số lượng lớn, EFS sẽ tự động giảm quy mô lại. 

EFS có thể được gắn vào các dịch vụ AWS khác nhau và được truy cập từ tất cả các máy ảo của bạn. 

Sử dụng nó để chạy dữ liệu chia sẻ hoặc để phân tích dữ liệu lớn. Bạn sẽ trả tiền cho phần bộ nhớ mà bạn thực sự sử dụng, thay vì bộ nhớ định sẵn mà cuối cùng sẽ bị lãng phí.

**Lợi ích của Amazon EFS**

- Hiệu suất mở rộng để hỗ trợ bất kỳ khối lượng công việc nào: EFS cung cấp khối lượng công việc thay đổi thông lượng cần thiết. Nó có thể cung cấp thông lượng cao hơn theo tốc độ phù hợp với tốc độ tăng trưởng đột ngột của hệ thống file, ngay cả đối với khối lượng công việc lên đến 500.000 IOPS hoặc 10 GB mỗi giây.
- Tính đàn hồi: Tự động tăng hoặc giảm bộ nhớ hệ thống file của bạn. Xóa hoặc thêm tệp không bao giờ làm ảnh hưởng đến các ứng dụng. Sau khi tạo hệ thống file EFS, bạn có thể thêm tệp mà không cần lo lắng về việc cung cấp bộ nhớ.
- Khả năng truy cập file được lưu trữ: Máy chủ vật lý và các phiên bản EC2 có thể truy cập đồng thời vào hệ thống file được chia sẻ. Các phiên bản EC2 cũng có thể truy cập hệ thống tệp EFS nằm trong các vùng AWS khác thông qua [VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html).

- Dịch vụ được quản lý toàn diện: EFS là một dịch vụ được quản lý hoàn chỉnh, có nghĩa là công ty của bạn sẽ không bao giờ phải vá, triển khai hoặc bảo trì hệ thống file của bạn.
- Tiết kiệm chi phí: Bạn chỉ cần chi trả cho đúng dung lượng mà bạn đã sử dụng, vì không có cung cấp trước, phí trả trước hoặc cam kết. Hơn nữa, bạn có thể sử dụng [Lifecycle Management](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html) để chuyển các file không được sử dụng trong một tháng sang loại lưu trữ tiết kiệm chi phí hơn, có thể giảm chi phí lên đến 85%.
- Bảo mật và tuân thủ chặt chẽ hơn: Bạn có thể truy cập an toàn vào hệ thống file bằng giải pháp bảo mật hiện tại của mình hoặc kiểm soát quyền truy cập vào hệ thống tệp EFS bằng cách sử dụng AWS Identity and Access Management (IAM), Amazon Virtual Private Cloud (Amazon VPC) hoặc quyền [POSIX](https://docs.aws.amazon.com/redshift/latest/dg/pattern-matching-conditions-posix.html). Và, EFS có thể mã hóa dữ liệu của bạn, cho dù dữ liệu đang chuyển tiếp hay ở trạng thái nghỉ. Điều này mang lại cho bạn sự bảo mật đáng tin cậy và giúp việc tuân thủ quy định dễ dàng hơn.

**Các trường hợp sử dụng Amazon EFS**
- Hỗ trợ ứng dụng theo kiểu Lift-and-shift: EFS có tính đàn hồi, khả dụng và có thể mở rộng, đồng thời cho phép bạn di chuyển các ứng dụng doanh nghiệp một cách dễ dàng và nhanh chóng mà không cần phải kiến trúc lại chúng.
- Phân tích cho dữ liệu lớn: Nó có khả năng chạy các ứng dụng dữ liệu lớn, truy cập file có độ trễ thấp và chiến lược read-after-write.
- Hệ thống quản lý nội dung và hỗ trợ web server: EFS là một hệ thống file thông lượng mạnh mẽ có khả năng cho phép các hệ thống quản lý nội dung và các ứng dụng phục vụ web, chẳng hạn như kho lưu trữ, trang web hoặc blog.
- Phát triển và kiểm thử ứng dụng: Chỉ EFS cung cấp hệ thống file chia sẻ cần thiết để chia sẻ mã nguồn và file, trên nhiều tài nguyên máy tính để tạo điều kiện cho khối lượng công việc tự động mở rộng quy mô.

### Amazon S3

Amazon S3 cung cấp khả năng lưu trữ object. Mỗi object có ID hoặc khóa duy nhất của riêng nó, để truy cập thông qua các request từ bất kỳ vị trí nào. S3 cũng hỗ trợ lưu trữ nội dung web tĩnh có thể được truy cập từ S3 bucket hoặc từ AWS CloudFront. Và S3 rất an toàn, cung cấp. “11 nines” - 99,999999999 khả năng chống chịu của dữ liệu.

**Lợi ích của Amazon S3**

- Hiệu suất mạnh mẽ, khả năng mở rộng và tính khả dụng: Nó giữ cho dữ liệu của bạn an toàn trước các lỗi, hỏng hóc và các mối đe dọa, đồng thời cung cấp dữ liệu đó khi bạn cần.
- Các Class lưu trữ tiết kiệm chi phí: Lưu trữ dữ liệu xuyên suốt các Class lưu trữ S3 giúp tiết kiệm chi phí và duy trì mức hiệu suất cao. Phân tích Class lưu trữ cho phép bạn xác định dữ liệu có thể được chuyển sang Class lưu trữ chi phí thấp hơn. Sau đó, bạn có thể thực hiện chuyển giao bằng [chính sách Vòng đời S3](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-lifecycle.html). Cuối cùng, phân tầng thông minh của S3 cho phép lưu trữ dữ liệu có các kiểu truy cập thay đổi hoặc không xác định bằng các đối tượng phân cấp, giúp giảm chi phí lưu trữ.
- Các tính năng kiểm tra, tuân thủ và bảo mật dễ dàng hơn: S3 có thể lưu trữ dữ liệu và bảo vệ dữ liệu khỏi bị truy cập trái phép bằng các công cụ mã hóa và quản lý truy cập mạnh mẽ của nó. S3 có các tính năng giúp bạn dễ dàng tuân thủ các yêu cầu quy định và [Amazon Macie](https://aws.amazon.com/macie/) có thể từ chối các yêu cầu truy cập bất thường vào dữ liệu nhạy cảm của bạn. Thêm vào đó, S3 hoạt động tốt với nhiều tính năng kiểm tra của AWS.
- Kiểm soát dữ liệu chính xác: Một loạt các công cụ quản lý cho phép bạn phân loại và báo cáo về dữ liệu. S3 có phân tích lớp lưu trữ giám sát các kiểu truy cập, trong khi Vòng đời S3 phân tích chuyển đối tượng sang lưu trữ chi phí thấp hơn. S3 Object Lock chỉ định ngày lưu giữ cho các đối tượng để ngăn việc xóa và S3 Inventory cung cấp khả năng hiển thị các đối tượng được lưu trữ cũng như mã hóa và siêu dữ liệu của chúng. Cuối cùng, [S3 Batch Operations](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/batch-ops.html) có thể chạy bảo trì quản lý lưu trữ cho hàng tỷ đối tượng trong khi AWS Lambda có thể được sử dụng để tự động hóa quy trình công việc, xác định cảnh báo và ghi nhật ký hoạt động mà không cần quản lý thêm cơ sở hạ tầng.


**Các trường hợp sử dụng Amazon S3**
- Data lake và phân tích dữ liệu lớn: Tạo Data lake để giữ dữ liệu thô ở định dạng gốc, sau đó sử dụng các công cụ học máy, truy vấn  và phân tích để rút ra thông tin chi tiết. S3 làm việc với AWS Lake Formation để tạo các Data lake, sau đó xác định các chính sách quản lý, bảo mật và kiểm tra. Cùng nhau, chúng có thể được mở rộng quy mô để đáp ứng các kho dữ liệu ngày càng tăng của bạn và bạn sẽ không bao giờ phải trả trước.
- Sao lưu và phục hồi: Các giải pháp sao lưu và khôi phục an toàn, mạnh mẽ dễ xây dựng khi bạn kết hợp S3 với các dịch vụ AWS khác, bao gồm EBS, EFS hoặc S3 Glacier. Các dịch vụ này có thể giúp bạn đáp ứng các mục tiêu về tuân thủ, thời gian khôi phục và điểm khôi phục.
- Khôi phục thảm họa đáng tin cậy: Lưu trữ S3, [S3 Cross-Region Replication](https://docs.aws.amazon.com/AmazonS3/latest/dev/crr.html)  và các dịch vụ mạng, máy tính và cơ sở dữ liệu AWS bổ sung giúp dễ dàng bảo vệ các ứng dụng, dữ liệu và hệ thống CNTT quan trọng. Nó cung cấp khả năng phục hồi nhanh chóng sau sự cố mất điện, bất kể chúng là do lỗi hệ thống, thiên tai hay lỗi của con người.
- Lưu trữ có phương pháp: S3 hoạt động liền mạch với các dịch vụ AWS khác để cung cấp khả năng lưu trữ có phương pháp. S3 Glacier và S3 Glacier Deep Archive cho phép bạn lưu trữ dữ liệu và gỡ bỏ cơ sở hạ tầng vật lý. Có ba lớp lưu trữ S3 mà bạn có thể sử dụng để giữ lại các đối tượng trong thời gian dài với tốc độ thấp nhất của chúng. Chính sách Vòng đời S3 có thể được tạo để lưu trữ các đối tượng tại bất kỳ thời điểm nào trong vòng đời của chúng hoặc bạn có thể tải trực tiếp các đối tượng lên các lớp lưu trữ một cách trực tiếp. S3 Object Lock đáp ứng các quy định tuân thủ bằng cách áp dụng các đối tượng ngày lưu giữ để tránh chúng bị xóa. S3 Glacier có thể khôi phục mọi đối tượng đã lưu trữ trong vòng vài phút.

Nguồn tham khảo:

https://www.missioncloud.com/blog/resource-amazon-ebs-vs-efs-vs-s3-picking-the-best-aws-storage-option-for-your-business