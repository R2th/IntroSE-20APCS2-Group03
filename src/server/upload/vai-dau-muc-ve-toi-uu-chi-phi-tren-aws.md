Mình dạo này cũng có lướt lướt đọc về S3 thấy bài này cũng gọi là hữu ích với đứa gà non như mình nên up lên cho cả nhà đọc thêm ạ.

Nguồn mình lượm từ bên S3 về ạ https://aws.amazon.com/vi/blogs/compute/10-things-you-can-do-today-to-reduce-aws-costs/

#### Giới thiệu về Tối Ưu Chi Phí trên AWS (AWS Cost Optimization)
AWS cung cấp các gói dịch vụ đa dạng với các mức giá khác nhau giúp cho khách hàng có thể quản lý chi phí hiệu quả, đồng thời có thể đảm bảo hiệu suất hoạt động theo nhu cầu của doanh nghiệp. Nhìn chung, quy trình tối ưu chi phí trên AWS là quản lý chi phí và mức sử dụng, phân tích dữ liệu để tìm ra các giải pháp tối ưu.

#### Chuẩn bị cái đã
Trước tiên, hãy tìm hiểu về chi phí của các dịch vụ AWS mà bạn đang sử dụng. AWS Free Tier cho phép khách hàng sử dụng một số dịch vụ của AWS miễn phí trong một giới hạn quy định cho từng dịch vụ. Hãy thử làm theo các video dưới đây để kiểm tra xem bạn có vượt quá giới hạn sử dụng miễn phí không nhé!

Tiếp theo, sử dụng AWS Cost Explorer để phân tích và theo dõi chi phí và mức sử dụng AWS. Công cụ này cung cấp các báo cáo về chi phí và mức sử dụng tổng quát (các tài khoản AWS và các dịch vụ AWS) hoặc ở cấp tài nguyên ( EC2 instance ID). Bắt đầu bằng cách xác định các tài khoản tốn nhiều chi phí nhất qua “Báo cáo chi phí theo tài khoản hàng tháng”.

Tiếp theo, xác định các dịch vụ tiêu tốn nhiều chi phí trong từng tài khoản trên. Bạn có thể xem thông tin này từ “Báo cáo chi phí dịch vụ hàng tháng”. Sử dụng đơn vị giờ, resource và tags để lọc và xác định nguồn tài nguyên phát sinh nhiều chi phí nhất.

Xem tạm ảnh này nha, Viblo đang hăm up được ảnh ạ
https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/04/05/Cost-Explorer.png


Ta hãy cùng điểm qua 10 điều mà chúng ta có thể làm ngay hôm nay để giảm thiểu chi phí với những công cụ và dịch vụ có sẵn của AWS.

### 1. Xác định các EC2 instance có mức sử dụng thấp và giảm chi phí bằng cách dừng hoặc điều chỉnh lại size
AWS Cost Explorer Resource Optimization cung cấp báo cáo về các EC2 instances không hoạt động hoặc có mức sử dụng thấp. Bạn có thể giảm chi phí bằng cách dừng hoặc giảm xuống các loại instance khác. Sử dụng AWS Instance Scheduler để tự động dừng các instance trong trường hợp này hoặc sử dụng AWS Operations Conductor để tự động điều chỉnh số lượng EC2 instances ( dựa trên các đề xuất từ AWS Cost Explore).

Xem tạm ảnh tại [đây](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/04/05/CE2.png) nha

Sử dụng AWS Compute Optimizer để theo dõi các đề xuất về giảm kích thước của instance trong cùng dòng. Thêm vào đó, nó đưa ra các gợi ý thu hẹp số lượng instance trong cùng dòng hoặc khác dòng, tăng số lượng instance để giảm bớt tắc nghẽn về hiệu suất đồng thời đề xuất cho các EC2 instance trong nhóm Auto Scaling.

### 2. Xác định Amazon EBS volumes có mức sử dụng thấp và giảm chi phí bằng snapshot sau đó xóa chúng
Các EBS volume có hoạt động rất thấp ( dưới 1 IOPS/ ngày) trong vòng liên tục 7 ngày cho thấy chúng có thể đang không được sử dụng. Bạn có thể sử dụng EBS Volumes Check của Trusted Advisor để xác định những EBS volume này. Để giảm thiểu chi phí, trước tiên hãy sử dụng Amazon Data Lifecycle Manager để tự động tạo snapshot. Ngoài ra,bạn có thể làm theo các bước sau để xoá EBS volume.

### 3. Phân tích mức sử dụng Amazon S3 và tối ưu chi phí bằng việc tận dụng các storage tier với chi phí thấp hơn
Sử dụng S3 Analytics để phân tích các dạng truy cập dữ liệu trên object data trong ít nhất 30 ngày. Công cụ này đưa ra các gợi ý giảm thiểu chi phí dựa trên S3 Infrequently Accessed (S3 IA). Sử dụng Lifecycle Policies, bạn có thể tự động di chuyển các object này vào tầng lưu trữ với chi phí thấp hơn.Ngoài ra, bạn cũng có thể sử dụng S3 Intelligent- Tiering để tự động phân tích và chuyển objects đến các tầng lưu trữ thích hợp.

### 4. Xác định các phiên bản Amazon RDS, Amazon Redshift instances với mức sử dụng thấp và giảm chi phí bằng cách dừng (RDS) và tạm dừng (Redshift)
Sử dụng RDS Idle DB instances check trong Trusted Advisor Amazon để xác định các DB instance không có bất kỳ kết nối nào trong vòng 7 ngày. Để giảm chi phí, hãy cài đặt chế độ tự động dừng các DB instances trên theo các bước được miêu tả trong bài viết này. Đối với Redshift, sử dụng Redshift clusters check trong Trusted Advisor Amazon để xác định các clusters không có kết nối trong vòng 7 ngày và nhóm có dưới 5% cluster tận dụng được 99% CPU trong 7 ngày liên tiếp. Để giảm chi phí, bạn có thể tạm dừng các cluster nói trên theo các bước hướng dẫn trong bài viết này.

Xem chút [ảnh](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/04/05/Redshift.png) nha

### 5. Phân tích mức sử dụng Amazon DynamoDB và giảm chi phí bằng Autoscaling hoặc trả phí theo On-demand 
Phân tích mức độ sử dụng DynamoDB bằng cách theo dõi 2 chỉ số bao gồm ConsumedReadCapacityUnits và  ConsumedWriteCapacityUnits trong CloudWatch. Bạn có thể sử dụng AutoScaling để tự động scale (in and out) bảng DynamoDB. Sau đó,làm theo các bước sau bạn có thể bật chế độ Auto Scaling. Bên cạnh đó, để cân bằng chi phí và hiệu suất, bạn cũng có thể chọn trả phí theo on-demand (theo nhu cầu sử dụng) hoặc theo từng yêu cầu read/write.

coi [ảnh](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/04/05/RW.png) cho rõ nha

### 6. Kiểm tra networking và giảm chi phí bằng cách xoá các bộ cân bằng tải không cần thiết
Sử dụng Trusted Advisor Idle Load Balancers để kiểm tra các bộ cân bằng tải có Requestcount ít hơn 100 trong liên tục 7 ngày. Sau đó, làm theo các bước sau để xóa các bộ cân bằng tải và giảm thiểu chi phí. Ngoài ra, bạn có thể sử dụng AWS Cost Explorer để kiểm tra chi phí truyền dữ liệu dựa vào hướng dẫn dưới đây.

 [ảnh](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/04/05/DR.png)

Nếu truyền dữ liệu từ EC2 đến public internet tốn nhiều chi phí, bạn có cân nhắc sử dụng Amazon CloudFront. Bằng cách sử dụng Amazon CloudFront Content  Delivery Network (CDN),bất kỳ hình ảnh, video, hoặc nội dung web có thể được lưu trữ tại AWS edge locations trên toàn thế giới. CloudFront loại bỏ những những sự truy cập không cần thiết để giảm tải cho server.

### 7. Sử dụng Amazon EC2 Spot Instances để tối ưu chi phí AWS
Nếu workload của bạn có thể chịu được sự gián đoạn (fault tolerane), sử dụng Spot instances có thể giúp bạn giảm đến tối đa 90% chi phí. Những workload thông thường như big data, containerized workloads, CI/CD, high-performance computing (HPC), kiểm thử phần mềm, khi sử dụng EC2 Auto Scaling, bạn có thể chọn cả On-demand và Spot instances để đáp ứng nhu cầu sử dụng. Auto Scaling tự động kiểm tra các request của Spot instances và cố gắng duy trì hiệu suất mong muốn ngay cả khi Spot instances gặp sự cố.Bạn có thể tham khảo video re:Invent 2019 để tìm hiểu thêm về Spot.

{@embed: https://www.youtube.com/watch?v=7q5AeoKsGJw}

### 8. Kiểm tra và chỉnh sửa cấu hình EC2 AutoScaling Groups
EC2 AutoScaling Group cho phép bạn mở rộng hoặc thu hẹp nhanh chóng số lượng EC2 theo nhu cầu. Bạn có thể sử dụng lệnh CLI hoặc console để kiểm tra các hoạt động scaling. Sau đó, phân tích kết quả để đánh giá liệu chính sách scaling có thể điều chỉnh để thêm các instances thích hợp hay không. Đồng thời kiểm tra lại cài đặt để đảm bảo đáp ứng được yêu cầu của người dùng với số lượng phiên bản EC2 ít nhất.

### 9. Sử dụng Reserved Instances (RI)  để giảm chi phí RDS, Redshift, ElastiCache và Elasticsearch
Đăng ký sử dụng dịch vụ RI trong vòng một năm mà không cần trả trước, bạn có thể tiết kiệm chi phí lên đến 42% so với trả phí theo nhu cầu sử dụng. Dựa vào mức sử dụng RDS, Redshift, ElastiCache, và Elasticsearch của bạn, AWS Cost Explorer RI sẽ gợi ý thanh toán. Bạn cần đảm bảo điều chỉnh các chỉ số trong vòng một năm và không trả phí trước. AWS yêu cầu cam kết sử dụng dịch vụ tối thiểu một năm nhưng điểm hòa vốn thường rơi vào tháng thứ 7 đến tháng thứ 9. Vì vậy, bạn nên thực hiện điều thứ 4 trước điều thứ 9.

### 10. Sử dụng Compute Savings Plans để giảm thiểu chi phí EC2, Fargate, và Lambda
Compute Savings Plans tự động áp dụng khi bạn sử dụng EC2 instance bất kể dòng, phiên bản, kích thước, AZ, khu vực, hệ điều hành và đồng thời cũng áp dụng cho Fargate và Lambda. Bạn chỉ cần đăng ký sử dụng Compute Savings Plans một năm mà không cần trả trước là đã có thể hưởng ưu đãi giảm giá đến 54% so với trả phí theo nhu cầu sử dụng.Ngoài ra, bạn có thể tham khảo những gợi ý từ AWS Cost Explorer và đảm bảo rằng bạn chọn gói không trả trước trong một năm. Một khi bạn đăng ký gói Savings Plans, mọi mức sử dụng điện toán đều tự động tính giá theo Savings Plans. Thêm vào đó, mọi mức sử dụng vượt quá cam kết sẽ được tính phí theo gói On-demand. Vì vậy, bạn nên thực hiện mục 1 trước mục 10.

 
Ảnh  [ Đề xuất gói Savings Plan](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/04/06/SP.png)

Với 10 gợi ý trên, bạn có thể giảm chi phí cho EC2, Fargate, Lambda, EBS, S3, ELB, RDS, Redshift, DynamoDB, ElastiCache, và Elasticsearch. Bạn có thể cài đặt AWS Budgets để nhận được thông báo khi có sự thay đổi về chi phí và mức sử dụng.

Khi cài đặt AWS Budgets, bạn có thể thiết lập cảnh báo về những chi phí được dự toán trong tương lai. Điều này sẽ giúp bạn dự đoán được các vấn đề và có các giải pháp giảm chi phí trong tương lai.

 
Nguồn tham khảo
https://aws.amazon.com/blogs/compute/10-things-you-can-do-today-to-reduce-aws-costs/