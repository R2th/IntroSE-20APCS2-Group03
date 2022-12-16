Xin chào mọi người, là một lập trình viên web có thể chúng ta đã từng làm việc với amazon web service (AWS). Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu tổng quan về nó và các dịch vụ phổ biến mà nó cung cấp. <br>
# I. Khái niệm AWS
Trước khi xem khái niệm AWS, ta nên tìm hiểu về điện toán đám mây. Điện toán đám mây (Cloud computing) là mô hình điện toán sử dụng các công nghệ máy tính và phát triển dựa vào mạng Internet. Theo tổ chức IEEE "Nó là hình mẫu trong đó thông tin được lưu trữ thường trực tại các máy chủ trên Internet và chỉ được được lưu trữ tạm thời ở các máy khách, bao gồm máy tính cá nhân, trung tâm giải trí, máy tính trong doanh nghiệp, các phương tiện máy tính cầm tay,...". Điện toán đám mây là khái niệm tổng thể bao gồm cả các khái niệm như phần mềm dịch vụ, Web 2.0 và các vấn đề khác xuất hiện gần đây, các xu hướng công nghệ nổi bật, trong đó đề tài chủ yếu của nó là vấn đề dựa vào Internet để đáp ứng những nhu cầu điện toán của người dùng. <br>
### AWS
Amazon web services là một nền tảng điện toán đám mây phát triển toàn diện được cung cấp bởi Amazon.com. Dịch vụ Web đôi khi được gọi là dịch vụ đám mây hoặc các dịch vụ điện toán từ xa. Các dịch vụ AWS đầu tiên đã được đưa ra vào năm 2006 để cung cấp các dịch vụ trực tuyến cho các trang web và các ứng dụng phía máy khách. Để giảm thiểu việc bị mất điện đột ngột và đảm bảo tính mạnh mẽ của hệ thống, AWS đa dạng về địa lý theo khu vực. Các khu vực này có trung tâm ở Đông Mỹ, Tây Mỹ (hai địa điểm), Brazil, Ireland, Singapore, Nhật Bản và Úc. Mỗi khu vực bao gồm nhiều khu vực địa lý nhỏ hơn được gọi là vùng sẵn có. <br>
AWS đang phát triển cung cấp hơn ba chục dịch vụ đa dạng bao gồm: <br>
- CloudDrive cho phép người dùng tải và truy cập nhạc, video, tài liệu và ảnh từ các thiết bị kết nối Web. Dịch vụ này cũng cho phép người dùng phát nhạc trực tuyến tới thiết bị của họ <br>
- CloudSearch, một dịch vụ tìm kiếm có thể mở rộng được sử dụng để tích hợp khả năng tìm kiếm tùy chỉnh vào các ứng dụng khác.
- Cơ sở dữ liệu Dynamo (còn gọi là DynamoDB hoặc DDB), một dịch vụ cơ sở dữ liệu NoSQL được quản lý đầy đủ được biết đến với độ trễ và khả năng mở rộng thấp
- Elastic Compute Cloud, cho phép các thuê bao kinh doanh chạy ứng dụng
- ElastiCache, dịch vụ bộ nhớ đệm được quản lý đầy đủ, tương thích với Memcached, một hệ thống lưu trữ bộ nhớ đối tượng được phân phối, mã nguồn mở, hiệu năng cao để tăng tốc các ứng dụng Web động bằng cách giảm tải cơ sở dữ liệu.
- Mechanical Turk, một giao diện chương trình ứng dụng (API) cho phép các nhà phát triển tích hợp trí thông minh con người vào các cuộc gọi thủ tục từ xa (RPC) sử dụng mạng con người để thực hiện các tác vụ mà máy tính không thích hợp.
- RedShift, dịch vụ kho dữ liệu quy mô petabyte được thiết kế cho các khối lượng công việc phân tích, kết nối với các khách hàng dựa trên SQL chuẩn và các công cụ thông minh kinh doanh.
- Dịch vụ Lưu trữ Đơn giản (S3), một dịch vụ có tốc độ cao, tốc độ thấp được thiết kế để sao lưu và lưu trữ trực tuyến các dữ liệu và các chương trình ứng dụng.
Có thể hình dung các dịch vụ qua hình dưới đây <br>
![](https://images.viblo.asia/abf2338a-cffb-48bf-adf3-56764dcf89fa.png)
# II. Các dịch vụ phổ biến
## 1. VPC
VPC cho phép ta truy cập AWS resource trên 1 mạng ảo mà tự định nghĩa. Ta có toàn quyền kiểm soát mạng ảo này từ địa chỉ IP address, cho phép truy cập internet trong mạng ảo (internet gatewat, NAT), chặn truy cập hay cho phép truy cập (Securty group - SG, Network Access Control List - NACL), cho phép các resource liên kết với nhau, hay truy cập từ 1 VPC tới 1 VPC khác từ 1 tài khoản AWS khác. Ta có thể tạo nhiều mạng con cho VPC, gọi là các subnet, có địa chỉ IP là tập con của VPC. Tập địa chỉ IP của các subnet không giao nhau.Ví dụ có thể tạo 1 mạng con public internet cho Webserver, 1 mạng con private chưa database chỉ được truy cập trừ web application mà không thể truy cập từ ngoài internet. <br>
Lợi ích của sử dụng VPC <br>
- Bảo mật: VPC cung cấp các tính năng bảo mật vô cùng mạnh mẽ, đáp ứng gần như hoàn toàn các yêu cầu security của các dự án khác nhau. (Không tính đến các yêu cầu như phải đặt datacenter ở Việt Nam nhé vì AWS chưa có datacenter ở Việt Nam)
- Đơn giản: Ta có thể setup VPC hoàn toàn bằng giao diện web console, rất đơn giản, aws giải thích rất rõ ràng, hoàn toàn có thể tự setup một VPC cho riêng mình. Khi tạo tài khoản aws đã mặc định có sẵn 1 vpc default.
- Có thể tùy chỉnh: có thể hoàn toàn tuỳ chỉnh VPC của ta từ dải địa chỉ ip, các cấu hình bảo mật, chặn truy cập, mở truy cập, mở port…
## 2. EC2
EC2 là dịch vụ Compute cloud, về cơ bản ta có thể thuê máy chủ của AWS và có thể cấu hình, chạy các dịch vụ trên đó. Và hoàn toàn có thể lựa chọn cấu hình mình mong muốn, có thể tăng hoặc giảm tài nguyên sử dụng một cách dễ dàng. Ngoài ra EC2 cũng cung cấp các cơ chế backup hoặc restore một cách nhanh chóng giúp ta restore hoặc scale hệ thống của mình một cách cự kì nhanh chóng và dễ dàng. Các đặc điểm: <br>
- Môi trường tính toán ảo được gọi là instances
- Các template được cấu hình sẵn cho các instances của ta, được gọi là amazon machine images. Các gói biết cần thiết cho máy chủ của ta (bao gồm hệ điều hành và phần mềm bổ sung)
- Các cấu hình khác nhau của CPU, bộ nhớ, dung lượng lưu trữ, và khả năng kết nối mạng cho các instances được gọi là các instance type.
- Bảo mật thông tin login cho instances  bằng cách sử dụng key pair AWS lưu key public và ta sẽ lưu trữ key private.
- Dữ liệu tạm thời bị xóa khi dừng hoặc chấm dứt instance của ta được gọi là instance store volumes
- Dung lượng lưu trữ liên tục cho dữ liệu của ta bằng Amazon Elastic Block Store (Amazon EBS) được gọi là Amazon EBS volumes
Lợi ích dùng EC2 <br>
- Ec2 cho phép ta tăng giảm dung lượng trong vài phút, có thể làm với hàng nghìn server instance cùng một lúc.
- Hoàn toàn kiểm soát các instance bao gồm quyền truy cập, khả năng tương tác với các resource aws khác. Có thể dừng bất kỳ instance, giữ lại data trên vùng boot và khởi động 1 instance giốg y như vậy. Ta cũng có thể tương tác với instance bằng web console hoặc dùng API service hoặc CLI(Command line interface)
- Ta có thể chọn nhiều loại instance, các phầm mềm được cài đặt sẵn. EC2 cho phép cấu hình CPU, RAM, ổ đĩa, loại ổ đĩa, mã hoá…
- EC2 được thiết kế để có thể tương tác với các dịch vụ khác của AWS. Ta có thể cấu hình 1 EC2 bất kỳ được truy cập dịch vụ mà không cần cung cấp các thông tin như API key, user/pass…
- Bảo mật tại AWS được ưu tiên cao nhất, chúng chỉ được làm những gì ta cho phép. với EC2, VPC sẽ bảo vệ ta khỏi những cuộc tấn công trái phép. <br>
Để cài đặt có thể làm theo hướng dẫn tại đây: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html
## 3. S3
S3 là dịch vụ lưu trữ dạng object storage. Chúng có thể lưu trữ file, ảnh, video hoặc rất nhiều thứ khác. S3 được thiết kế để đảm bảo độ bền đến 99.999999999%(11 số 9). Điều đó đảm bảo gần như chắc chắn dữ liệu của ta sẽ được an toàn. Ngoài ra các tính năng bảo mật của nó giúp bảo vệ dữ liệu, mã hoá, và những yêu cầu khắt khe về bảo mật. S3 có khả năng tích hợp với rất nhiều dịch vụ khác của AWS khác hoàn toàn nhanh chóng và dễ dàng. S3 cũng cung cấp các gói lưu trữ khác nhau phù hợp với nhu cầu sử dụng nhằm tối ưu hoá chi phí cho ta.  <br>
Các nhà phát triển cũng có thể truy cập vào AWS sử dụng giao diện điều khiển AWS, đây là giao diện dựa trên web mà Amazon cung cấp Understanding Amazon S3 Buckets: Amazon S3 lưu trữ dữ liệu dưới dạng Đối tượng và đối tượng được lưu trữ trong các thư mục được gọi là bucket. Bucket là các thùng chứa đồ vật và ta có thể có một hoặc nhiều bucket. Đối với mỗi bucket ta có thể điều khuyển truy cập đối với mỗi bucket như là tạo, xóa và hiển thị các object của bucket. Để lưu trữ Object trong Amazon S3, ta cần upload file đến bucket được chỉ định. Steps to Upload File in a Bucket: Để ta có thể tạo được bucket trên Amazon S3 và upload file lên đó trước tiên cần login vào trang aws.amazon.com với tài khoản mà bạn đã đăng kí.  <br>
Các lợi ích sử dụng S3 <br>
- Hiệu suất hàng đầu, khả năng mở rộng, tính khả dụng và độ bền: Amazon S3 được thiết kế để có độ bền dữ liệu là 99,999999999% (11 số 9) vì nó tự động tạo và lưu trữ các bản sao của tất cả các đối tượng S3 trên nhiều hệ thống. Điều này có nghĩa là dữ liệu của ta luôn có sẵn khi cần thiết và được bảo vệ khỏi các hư hỏng, lỗi và các mối đe dọa.
- Nhiều “Loại” lưu trữ cho ta lựa chọn: S3 có nhiều kiểu lưu trữ, hỗ trợ những kiểu truy cập khác nhau.Có thể cấu hình S3 intelligent-tiering cho phép tự động chuyển các kiểu lưu trữ.
- Khả năng kiểm tra, tuân thủ và bảo mật chưa từng có: Lưu trữ dữ liệu của ta trong Amazon S3 và bảo mật dữ liệu khỏi bị truy cập trái phép bằng các tính năng mã hóa và công cụ quản lý truy cập. S3 là dịch vụ lưu trữ đối tượng duy nhất cho phép ta chặn truy cập công khai vào tất cả các đối tượng ở mức bucket hoăc tài khoản với S3 Block Public Access.
# III. Kết luận
Trên đây là những gì tổng quan về AWS và một số dịch vụ phổ biến mà nó cung cấp. Ta có thể tìm hiểu thêm các dịch vụ này ở trang chủ của AWS (https://aws.amazon.com/vi/what-is-aws/) với rất nhiều các kiến thức khác. Hi vọng bài viết giúp ích cho mọi người, hẹn gặp lại!
# IV. Reference
https://aws.amazon.com/vi/what-is-aws/ <br>
https://aws.amazon.com//vpc/ <br>
https://aws.amazon.com/ec2/ <br>
https://aws.amazon.com/s3/ <br>