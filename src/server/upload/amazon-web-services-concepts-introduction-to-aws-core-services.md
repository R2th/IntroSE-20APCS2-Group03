### 1. AWS Introduction
![](https://images.viblo.asia/96e8c856-17a4-421b-924c-9fb585fb182c.jpg)
 Amazon Web Services (AWS) là một trong số các dịch vụ của Amazon hoạt động dựa trên nền tảng điện toán đám mây (cloud computing), được ra mắt vào năm 2006. Amazon là nhà cung cấp Cloud Computing có doanh thu lớn nhất thế giới hiện nay với vố số khách hàng từ khắp các châu lục khác nhau trên toàn thế  giới. Trước tiên, `Cloud Computing` là gì?

 **Cloud computing** (điện toán đám mây) là mô hình điện toán sử dụng các công nghệ máy tính và phát triển dựa vào mạng Internet. Nói một cách đơn giản, điện toán đám mây là việc ảo hóa các tài nguyên tính toán và các ứng dụng. Thay vì việc ta sử dụng một hoặc nhiều máy chủ thật (ngay trước mắt, có thể sờ được, có thể ấn nút bật tắt được) thì nay chúng ta sẽ sử dụng các tài nguyên được ảo hóa (virtualized) thông qua môi trường Internet.
 
 AWS cung cấp rất nhiều service, bao gồm:
*  Compute
*  Storage
*  Database
*  Migration
*  Networking & Content Delivery
*  Developer Tools
*  Management Tools
*  Media Services
*  ...

Và còn rất nhiều dịch vụ khác, tất cả được liệt kê đầy đủ tại [trang chủ AWS](https://aws.amazon.com/).
Nhắc đến Cloud Computing, còn có một cái tên khác cũng khá quen thuộc là `Heroku`. Heroku cũng là nhà cung cấp các dịch vụ điện toán đám mây nổi tiếng. Thử so sánh một số đặc điểm giữa cả hai xem sao:


| AWS | Heroku |
| -------- | -------- |
| AWS là sản phẩm của Amazon, sở hữu nguồn tài nguyên đang tin cậy với cộng đồng hỗ trợ khổng lồ  | Heroku được xây dựng dựa trên AWS |
| Phù hợp với nhu cầu chuyên môn cao, dễ gây khó khăn cho những người mới bắt đầu | Software đôi lúc khá đơn giản, dễ làm quen với những người mới |
| Người dùng dễ dàng quản lí và truy cập tới data bất cứ lúc nào | Cấu trúc cơ sở hạ tầng được quản lí tự động |
| Công đoạn tạo máy chủ khá phức tạp | Xây dựng server khá đơn giản qua vài câu lệnh |
| Chi phí duy trì dịch vụ không quá đắt do đa dạng nhiều gói và người dùng chỉ cần trả phí cơ sở hạ tầng | Với người dùng miễn phí sẽ bị giới hạn nhiều dịch vụ (database, storage,..) và người dùng sẽ phải trả khoản phí không nhỏ để  mua các gói dịch vụ premium mà Heroku cung cấp
Cả AWS và Heroku đều có các đặc điểm kỹ thuật lẫn ưu nhược điểm khác nhau nhưng đều nhằm mục đích chung là cung cấp những dịch vụ điện toán đám mây cho người sử dụng. Tùy vào tính chất đặc thù của công việc mà chúng ta có thể lựa chọn giữa AWS và Heroku.

Quay trở lại với AWS, bên cạnh số lượng dịch vụ lớn khiến chúng ta hoa mắt, trước hết chỉ cần quan tâm đến các dịch vụ cốt lõi mà AWS cung cấp(core services) bao gồm:
![](https://images.viblo.asia/83de2a2c-f35e-48aa-a3a7-e417cb5aaff0.png)
* VPC - Virtual Private Cloud
* EC2 - Elastic Compute Cloud
* RDS - Relational database service
* S3 - Simple Storage Service

Trước tiên chúng ta sẽ bắt đầu với VPC.
### 2. Amazon VPC
![](https://images.viblo.asia/495c6f4d-6054-48c4-acc4-bede24dd02ac.png)


Tưởng tượng AWS như là Facebook, bên trong nó bao gồm các HomePage của chúng ta, bạn bè và những người dùng khác. Trong Homepage chứa các post, image, document và ta hoàn toàn có thể set quyền những ai được phép xem cũng như share cho những người khác. 

![](https://images.viblo.asia/c937d7ab-2fad-4326-aab8-1dc7d4ee5b1e.png)


Tương tự như vậy, **VPC** (Virtual Private Cloud) hiểu đơn giản là một môi trường cá nhân ảo của người dùng, chứa resources và các thành phần AWS khác như EC2, RDS.. mà người sử dụng hoàn toàn làm chủ, cho phép hoặc hạn chế  người khác truy cập đến các thành phần bên trong chúng. Nếu như ở Facebook homepage chúng ta có thể upload ảnh, bài viết, sửa nội dung, thiết lập quyền comment hoặc view.. thì với VPC chúng ta cũng có thể  thêm, chỉnh sửa, quyền access các resources, services.. theo ý muốn, và các VPC cũng private với nhau.

Giờ chúng ta sẽ đi sâu vào các AWS bên trong VPC: EC2 và RDS.
### 3. Amazon EC2
![](https://images.viblo.asia/6018fbb0-e2a0-4df4-9e2a-a4f75c7908ae.png)

Với một chiếc computer cơ bản, sẽ bao gồm đầy đủ các thành phần như CPU, OS, Drives, Ram,.. thì **EC2** (Elastic Compute Cloud) cũng tương tự, chỉ có điều nó được hiểu chính xác là một server computer hơn là những computer thông thường. EC2 cung cấp một hoặc nhiều các máy chủ ảo (EC2 **instances**) có thể mở rộng về khả năng xử lí, liên kết với nhau giúp dễ dàng triển khai ứng dụng.

VD như khi chúng ta request vào một trang web bất kì nào đó sử dụng AWS, thì trước tiên phải có VPC EC2 instance đứng ra nhận nhiệm vụ là Web Hosting, sau đó tiếp tục đảm nhiệm vai trò xử lí và gửi request đến AWS khác (RDS, S3..), nhận lại data cần thiết sau đó trả lại kết quả mà người truy cập mong muốn.

### 4. Amazon RDS
![](https://images.viblo.asia/48744604-5b68-4826-a89b-39c40d96bd88.png)

**Amazon RDS** (Amazon Relational Database Service) là dịch vụ đám mây do Amazon Web Services phát triển với mục tiêu cung cấp giải pháp cài đặt, vận hành và mở rộng dành cho relational database (cơ sơ dữ liệu có quan hệ).

Nó cung cấp khả năng tiết kiệm chi phí hiệu quả và thay đổi kích thước, nó có thể tự động hóa các nhiệm vụ quản lý tốn nhiều thời gian như dự phòng phần cứng, thiết lập cơ sở dữ liệu, vá lỗi và sao lưu.

Amazon RDS cung cấp hiệu năng nhanh, tính sẵn sàng cao, tính bảo mật và khả năng tương thích.


Các hệ quản trị cơ sở dữ liệu quan hệ mà Amazon RDS hỗ trợ hiện nay gồm có:
* PostgreSQL
* MySQL
* MariaDB
* ORACLE
* SQL Server
* Amazon Aurora

Một số đặc điểm:

* `Scalability and High Availability`: được thể hiện rõ trong trường hợp có nhiều lượt truy cập tới AWS server, với mỗi lượng truy cập nhất định, AWS sẽ tự động thêm một EC2 instance khác trong VPC để handle request, và tất cả các instances này đều tương tác được với RDS liên tục đảm bảo tất cả user đều nhận lại được data theo mong muốn. Điều này cũng đồng nghĩa với việc server sẽ luôn sẵn sàng bất cứ lúc nào và ở bất cứ đâu.
* `Elasticity`: Khi lượng truy cập của một instance nào đó không còn nữa, AWS cũng sẽ tự loại bỏ đi instance đấy
* `Fault Tolerant`: Trong trường hợp một instance A xảy ra lỗi, AWS VPC sẽ tạm thời chuyển hướng từng user của instance A sang các instance còn lại, loại bỏ instance A và sau đó khởi tạo lại một instance A mới, rồi cuối cùng chuyển số  users vừa nãy sang instance A vừa được khởi tạo

### 5. Amazon S3
![](https://images.viblo.asia/fa1f6f9c-7d42-447c-9b2e-017e01194bf1.png)

**S3** (Simple Storage Service) hiểu đơn giản là nơi để lưu trữ tất cả các loại dữ liệu mà ta muốn (hình ảnh, video, document...) và gần như không giới hạn. Dữ liệu được lưu trữ trên S3 được truy xuất mọi lúc mọi nơi, từ bất cứ thiết bị nào.

Một số đặc điểm và lợi ích của S3:
* `Tính ổn định`: Nó được thiết kế để chịu được các hỏng hóc và phục hồi hệ thống rất nhanh với thời gian tối thiểu. Amazon cung cấp một thỏa thuận cấp dịch vụ (service-level agreement – SLA) để duy trì tính sẵn sàng ở mức 99.99 %
* `Dễ dùng`: S3 được xây dụng trên các khái niệm đơn giản và cung cấp tính mềm dẻo cao cho việc phát triển các ứng dụng. Ta có thể xây dựng các lược đồ lưu trữ phức tạp hơn, nếu cần, bằng cách thêm các hàm vào các thành phần của S3
* `Tính mở rộng`: Thiết kế của S3 cung cấp một cấp độ cao về tính mở rộng và cho phép sự điều chỉnh dễ dàng trong dịch vụ khi lượng truy cập vào ứng dụng web của chúng ta tăng đột biến với lưu lượng khổng lồ
* `Quản lý linh hoạt`: S3 cung cấp khả năng quản lí và lưu trữ linh hoạt nhất. Người quản trị có thể phân loại, báo cáo, trực quan hóa xu hướng sử dụng dữ liệu để giảm chi phí và cải thiện dịch vụ. Kể từ khi Amazon S3 làm việc với AWS Lambda thì customer có thể xem log activities, xác định cảnh báo, gọi luồng công việc mà không cần bất kì cơ sở hạ tầng bổ sung nào
* `Tính năng bảo mật và tuân thủ toàn diện`: S2 hỗ trợ 3 dạng mã hóa khác nhau. S3 cung cấp tích hợp với AWS CloudTrail để ghi lại, giám sát và duy trì các hoạt động gọi API. S3 là nền tảng lưu trữ đám mây duy nhất cùng với Amazon Macie sử dụng học máy để tự động tìm kiếm, phân loại và bảo vệ dữ liệu nhạy cảm trên AWS. S3 hỗ trợ các tiêu chuẩn bảo mật và được chứng nhận bao gồm: PCI-DSS, HIPAA/HITECH, FedRAMP, EU Data Protection Directive, and FISMA giúp customer đáp ứng yêuu cầu về bảo mật đối với hầu hết các cơ quan quản lí trên toàn cầu
* `Chi phí rẻ`: Chi phí sử dụng S3 rất cạnh tranh với các giải pháp của công ty và cá nhân khác trên thị trường.

### Summary
Bài viết nhằm giới thiệu cho mọi người về Amazon Web Service và khái niệm cơ bản của các core services dựa theo ý hiểu của cá nhân, sang phần tiếp theo mình sẽ trình bày chi tiết hơn về các service này. Bài viết còn nhiều hạn chế , cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn và tài liệu tham khảo:
* https://dev.to/iriskatastic/aws-vs-heroku-comparison-55o5
* https://aws.amazon.com/documentation/
* https://linuxacademy.com/cp/library/catalog/view/AWSCourses