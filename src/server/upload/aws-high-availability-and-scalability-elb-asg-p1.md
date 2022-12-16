# Lời nói đầu
Gần đây mình mới có cơ hội được tham gia vào một khóa học về AWS cơ bản online rất thú vị . Nó cho mình các kiến thức nền tảng về AWS. Ngày hôm nay mình xin được viết thêm về 1 bài viết khác về những điều mình đã tìm hiểu được về AWS ELB & ASG . Đây là những kiến thức mình muốn chia sẻ với mọi người và cũng coi như một lần mình note ra để nhớ lại bài học . Và các kiến thức mình tiếp thu được trong bài thì nó không toàn diện và có thể sai sót vì đây là những kiến thức hạn hẹp của mình . Nếu có gì thiếu sót mong mọi người comment và cho mình biết . Mình rất hy vọng nó có ích cho ai đó . Cám ơn các bạn rất nhiều ! Nào mình cùng bắt đầu nhé ! 😄 😄

# Nội dung
## Scalability and High Availability  là gì ?
### Scalability
- `Scalability` tức là application của bạn có khả năng mở rộng một cách nhanh chóng đề đối ứng với các vấn đề phát sinh . Ví dụ như website của bạn 1 ngày nào đó tự nhiên trở nên hot và có quá nhiều người truy cập vào , khi đó với tài nguyên hiện hữu thì  application của bạn không đủ khả năng phục vụ hết tất cả mọi người, khi đó chúng ta cần scale nó lên .
-  Có 2 loại `Scalability`
    -  `Vertical Scalability` có nghĩa là bạn mở rộng khả năng hoạt động của chính instance đang cài app của mình
        -  Ví dụ như bạn đang dùng gói `t2.micro` của aws chẳng hạn, bạn chuyển sang dùng gói `t2.large` ==> đây chính là  `Vertical Scalability`
        -   `Vertical Scalability` thích hợp cho  các hệ thống không phân tán được điển hình như các database : RDS , Elasticache , v...v....
        -   Điểm yếu của loại này đó là  ko thể tăng kich thước lên vô hạn được chúng ta  giới hạn bởi công nghệ phần cứng
    -   `Horizontal scalability`có nghĩa là chúng ta tăng số lượng các instance cài app của chúng ta .
        -   Ví dụ như bạn đang dùng gói `t2.micro` của aws chẳng hạn, bạn có thể tăng thên 1 gói `t2.micro` ==> khi này chúng ta có 2 gói `t2.micro` để phục vụ user cho application của bạn . Đây chính là `Horizontal scalability`
        -   `Horizontal scalability`phù hợp cho các ứng dụng phân tán như các website.
        -   `Horizontal scalability` được sử dụng khá nhiều và trên lý thuyết thì nó gần như không có giới hạn (nếu có thì gần như chỉ là giới hạn về nhà cung cấp hoặc app của bạn có thể `scalability` hay không) 

### High Availability 
- `High Availability` không phải là `Scalability` nhưng chúng có liên quan đến nhau
- `High Availability` và  `Horizontal scalability` luôn là đôi bạn cùng tiến và sôngs chết có nhau chính vì thế giới hạn  của `Horizontal scalability` cũng là giới hạn của `High Availability` 
-  `High Availability` nghĩa là bạn cần running app của mình ở ít nhất 2 server khác nhau (Với AWS EC2 thì điều này có nghĩa là chạy ở 2 Avaiablility Zone khác nhau)
-  Mục tiêu của  `High Availability` đó chính là nếu 1 server có lỗi thì vẫn còn ít nhât 1 server có khả năng phục vụ user của bạn. Tránh việc app của bạn chết bất đắc kì tử vào 1 ngày đẹp trời nào đó

### Scalability and High Availability  For EC2 (AWS)

-  `Vertical Scalability` có thể tăng hoặc giảm khả năng làm việc của instance băng cách chọn lựa các gói sử dụng :
    -  Min : `t2.nano` => 0.5GB RAM + 1 vCPU
    -  Max: `u-12tbl.metal` => 12.3TB RAM + 448 vCPU
-  `Horizontal Scalability` có thể tăng hoặc giảm số lượng instance sử dụng thông qua :
    - Auto Scaling Group
    - Load Balancer

- `High Availability` Chạy nhiều instance với cùng 1 applicaiton giữa nhiều AZ với nhau
    - Auto Scaling Group với nhiều AZ 
    - Load Balancer với nhiều AZ 

## Elastic Load Balancer (ELB)
### Over view
Trước tiên để hiểu loadbalacing là gì và vì sao cần dùng nó thì thì các bạn có thể đọc bài viết [Nginx - Loadbalancing ](https://viblo.asia/p/nginx-loadbalancing-part-1-yMnKMmLmK7P#_1--loadbanlacing-la-gi--3) của mình để hiểu một cách rõ ràng hơn về khái niệm về loadbalacing.

Về cơ bản thì trong AWS  thì ELB hoạt động giống như hình sau :

![](https://images.viblo.asia/08716e60-0e8c-443f-8487-d461fd66ccdf.png)

**Vậy vì sao chúng ta cần sử dụng ELB của AWS trong khi có thể tự làm nó ?**

Câu trả lời thực tế rất đơn giản, chúng ta nên sử dụng ELB của AWS vì những lý do sau :

- Nó có 1 bô công cụ xử lý Loadbalancing rất hữu hiệu 
    -  AWS đàm bảo nó luôn hoạt động
    - AWS sẽ tự động xử lý việc cập nhật cũng như bảo trì hoạt động của ELB
    - Cung cấp bộ config rất đầy đủ để bạn thực hiện cân bằng tải theo đúng cách mà bạn muốn
- ELB có thể tích hợp với rất nhiều dịch vụ của AWS
- Đảm bảo tính bảo mật của các instance và bảo vệ các instance khỏi sự tấn công không mong muốn (Điều hướng traffic private đến các instance bằng cách sử dụng kèm với Security Group)
- Đưa cho bạn giải pháp ít tốn kém chi phí cũng như sức lực của bản thân bạn trong việc đưa sản phẩm của bạn đến người dùng

**Health Check**
- Đây là phần vô cùng quan trọng trong Loadbalancer
- Loadbalancer chỉ phân phối các request cho các instance hoạt động tốt (Healthy) để xử lý các request của client ==> và heath check chính là thứ để đánh giá xem các instance của bạn có Healthy ko
- Loadbalancer sẽ gửi 1 định kì request health check đến các instance ==> nếu instance của bạn trả về 200 thì ok còn không thì sẽ báo lỗi.

Nếu quan tâm về `Health Check` trong `nginx` các bạn có thể vào đây để xem nhé [nginx-loadbalancing-heathcheck](https://viblo.asia/p/nginx-loadbalancing-part-2-07LKXm1JZV4#_1--health-checks-3) 


**Security Group with ELB**

Như minh đã nói ở trên , ELB support rất tốt trong việc bảo vệ các instance của chúng ta trước những request tấn công từ bên ngoài thông qua `Security Group` . Dưới đây là mô hình config cơ bản và kiểu mẫu để làm được điều mình nói :

![](https://images.viblo.asia/1f07c53f-368e-4fe2-b85b-6d881aef19de.png)

- `ELB` chúng ta tạo 1 `SG` cho phép các request từ ngoài internet vào `ELB`  qua cổng 80 (HTTP), 442(HTTPS) và sẽ chuyển request này đễn  `EC2 instance` qua cổng 80 (HTTP)
- `EC2 instance` tạo 1 `SG` chỉ nhận request từ `ELB` qua cổng 80 (HTTP)
- Như vậy sẽ ko có 1 request nào từ internet có thể tấn công được vào  `EC2 instance`  ==> tuyệt vời :D

**ELB good to know**
- ELB có thể Scale up nhưng không thể scale up ngay lập tức và nếu bạn muốn scale với số lượng lớn thì nên liên lạc với aws để được hõ trợ tốt nhất
- Troubleshooting
    - 4xx là lỗi phat sinh do client gây ra
    - 5xx là lỗi phat sính do application của bạn
    - Loadbalacer error 503 có nghĩa là ko còn instance heathy có thể dùng để cấp phát request
    - Connection Limit Timeout do config sercurity group có vấn đề
- Monitoring 
    - ELB có access log để check all request đi qua ELB nên chúng ta có thể debug mỗi request qua nó
    - Ngoài ra, ELB cũng có liên kết với cloudwatch nên bạn có thể sử nó để thống kê.

## Kết luận
Ok, bài viết của mình cũng hơi dài nên mình sẽ tiếp tục chủ để này trong bài viết sắp tới. Hy vọng bài viết này sẽ giúp ích chút gì đó cho mọi người. Thân !