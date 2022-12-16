Để có thể xây dựng một hệ thống dựa trên AWS, ngoài các dịch vụ chính như EC2 để làm Cloud Server, S3 để lưu trữ, thì AWS cũng cung cấp các dịch vụ khác để có thể kết nối chúng lại, vừa mang lại sự tiện lợi, vừa đảm bảo bảo mật, tốc độ, ...

Dưới đây là 2 dịch vụ khá nổi tiếng mang lại sự tiện dụng rất lớn cho hệ thống của bạn

### 1. Route 53 (DNS)

Route 53 là một dịch vụ được đặt tên từ 2 thứ. 

Đầu tiên là Route 66, một con đường cao tốc huyền thoại đi xuyên đất nước của Mỹ.
Thứ 2 là Port 53, đây là cổng dịch vụ DNS, nơi nhận các request gọi đến DNS của server.
Kết hợp lại và chúng ta có Route 53.

![](https://images.viblo.asia/2d477015-9da2-4856-973c-77cd437c6769.jpg)


Amazon Route 53 là dịch vụ Domain Name System (DNS).
- Tuân theo đầy đủ chuẩn IPv6
- Có DNS server ở khắp thế giới

Route 53 cũng cung cấp khả năng để đăng ký tên miền. Bạn có thể tự đăng ký và mua tên miền sử dụng Route 53 console và Route 53 sẽ tự động config các cài đặt về DNS cho tên miền đó.

**Lưu ý**: Những tên miền "vô tình" được đăng ký sai tên, sẽ không thể thay đổi và cũng sẽ không được hoàn phí. Bạn sẽ mất chi phí để mua thêm một tên miền mới.

Bạn có thể sử dụng Amazon Route 53 để kiểm tra tình trạng DNS, qua đó định tuyến lưu lượng truy cập đến các tên miền đanh hoạt động hoặc giám sát độc lập tình trạng của ứng dụng và các điểm cuối của ứng dụng.

Ở mức độ toàn cầu, Route 53 cung cấp 3 giải pháp để quản lý lưu lượng truy cập:
- Dựa trên độ trễ (latency)
- Dựa trên khoảng cách địa lý
- Dựa theo thuật toán điều phối vòng tròn (Weighted Round Robin).

3 phương pháp này có thể kết hợp đồng thời nhằm giải quyết vấn đề chịu lỗi (failover) của DNS nhằm tạo ra một kiến trúc có độ trễ thấp và chịu lỗi tốt.

Tóm lại, Lợi ích khi sử dụng Route 53 gồm:
- Độ có sẵn cao và đáng tin cậy
- Linh hoạt (điều chỉnh định tuyến bằng giao diện của amazon).
- Dễ dàng kết hợp với các service khác của amazon (Elastic Load Balancing, AWS Elastic Beanstalk, VPC, S3, ..)
- Đơn giản, tốc độ cao
- Hiệu quả về chi phí (chỉ tính phí theo lượng sử dụng)
- Bảo mật
- Đáp ứng được các hệ thống lớn.




### 2. Elastic Load Balancing (ELB)

Cân Bằng Tải (ELB) là một dịch vụ điều phối luồng truy cập nhằm tránh cho một server gặp tình huống quá tải. ELB hoạt động dựa trên cơ chế Auto-Scaling

ELB sẽ điều phối sao cho lượng truy cập vào các server là cân bằng, hoặc theo tùy chỉnh của người dùng (80 - 20 chẳng hạn). 

Ngoài ra, với cơ chế Auto-Scaling, lượng tài nguyên sẽ được tối ưu, tăng giảm dựa trên yêu cầu tùy từng vào thời điểm. Điều này sẽ cực kỳ hữu ích với các hệ thống có những khoảng thời gian truy cập cao điểm vào những khung giờ nhất định trong ngày hoặc những ngày nhất định trong tuần. Đây cũng là một lợi thế về việc tiết kiệm chi phí so với sử dụng một server vật lý của chính chúng ta.

ELB cung cấp cách thức để có thể điều phối luồng truy cập tới: 
- Các Cloud Server (EC2) thông qua cách thức Auto-scaling Group
- Địa chỉ IP
- Các hàm Lambda
- Ngoài ra ELB cũng hoạt động trên hệ thống kết hợp, tức là hệ thống gồm cả Cloud Server và Server vật lý của người dùng.

Bạn có thể tùy chỉnh cách thức hoạt động của ELB dựa trên một số tiêu chí như:

- Chỉ nhận các request từ private subnet hoặc là nhận cả những request từ Internet. 
- Thiết lập các listeners dựa trên giao thức (protocol) và cổng (port)
- Chọn Availability Zone (AZ)
- Thiết lập các Target Group để quy định xem các request sẽ đi đến đâu (EC2, Lambda Function) hay là điều phối lượng truy cập cụ thể.
- ELB cũng cung cấp một giao điện trực quan để bạn có thể theo dõi tình trạng của ELB, xem là các request có bị tập trung vào một server, hay là có những request nào đang bị gửi đến những server gặp sự cố.

AWS cung cấp 3 gói ELB khác nhau, ngoại trừ 1 gói classic, thì 2 gói còn lại sẽ được chia ra dựa theo nhu cầu sử dụng của hệ thống

![](https://images.viblo.asia/7cb4b77c-a422-4ef7-ab5e-23383bf22698.png)

Về cơ bản thì gói **Network Load Balancer** sẽ không quan tâm đến nội dung của request mà sẽ chỉ chuyển tiếp các request trong khi **Application Load Balancer** kiểm tra nội dung của request header HTTP/HTTPS (content-type, cookies, vị trí người dùng, ..) để xác định nơi định tuyến yêu cầu.

Điều này cũng dẫn đến việc **Network Load Balancer** đôi khi cũng sẽ gửi nhầm request đến những server đang gặp sự cố hoặc đang ngoại tuyến, còn **Application Load Balancer** sẽ không vướng phải vào sai lầm này vì thực tế thì nó không chỉ kiểm tra tình trạng của server dựa trên response thành công (status code 200 chẳng hạn) mà nó sẽ còn tính toán kết quả được kỳ vọng dựa trên tham số đầu vào.

Nguồn tham khảo:

https://aws.amazon.com/route53/

https://app.pluralsight.com/library/courses/aws-network-design-getting-started