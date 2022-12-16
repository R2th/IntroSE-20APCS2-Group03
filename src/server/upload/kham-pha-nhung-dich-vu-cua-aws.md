Các bài viết trước:

1. [Ứng dụng AWS trong thực tế](https://viblo.asia/p/aws-amazon-web-services-la-gi-ung-dung-trong-thuc-te-4dbZNN98ZYM)
2. [Bạn có thể làm gì với AWS](https://viblo.asia/p/ban-co-the-lam-gi-voi-aws-aWj53bjpl6m)
3. [Lợi ích khi sử dụng AWS](https://viblo.asia/p/loi-ich-khi-su-dung-aws-LzD5dLWz5jY)
4. [Cách tính cho phí dịch vụ AWS](https://viblo.asia/p/cach-tinh-chi-phi-dich-vu-aws-maGK70BBZj2)

Phần cứng dùng để tính toán, lưu trữ, và mạng là nền tảng của đám mây AWS. 

AWS chạy những dịch vụ này trên phần cứng. API hoạt động như một giao diện giữa dịch vụ AWS và ứng dụng của bạn.

![Ví dụ dịch vụ AWS](https://images.viblo.asia/49b0322d-ab6c-4a72-b367-ced032c841df.png)

Bạn có thể quản lí những dịch vụ bằng cách gửi yêu cầu đến API theo cách thủ công thông qua giao diện web Management Console, giao diện command-line, hoặc lập trình thông qua SDK. 

Máy ảo có những tính năng đặc biệt: chẳng hạn bạn có thể kết nối máy ảo thông qua SSH và có được quyền truy cập quản trị viên. Điều này có nghĩa là bạn có thể cài đặt bất kỳ phần mềm nào bạn thích trên máy ảo.

Những dịch vụ khác như là dịch vụ cơ sở dữ liệu NoSQL, cho phép tính năng của chúng thông qua API và che giấu mọi thứ đằng sau nó. 

Hình minh họa dưới đây cho thấy quản trị viên cài đặt ứng dụng web PHP trên máy ảo và quản lý các dịch vụ phụ thuộc như cơ sở dữ liệu NoSQL được sử dụng bởi ứng dụng.

![Quản trị các dịch vụ](https://images.viblo.asia/f370be82-7276-4012-83c7-49c36bc0c553.png)

Người dùng gửi các yêu cầu HTTP đến máy ảo. Máy ảo này đang chạy máy chủ web cùng với ứng dụng web PHP tùy chỉnh. Máy chủ web cần giao tiếp với dịch vụ AWS để trả lời yêu cầu từ người dùng. Ví dụ: Ứng dụng cần truy vấn dữ liệu từ cơ sở dữ liệu NoSQL, lưu trữ file tĩnh, và gửi email. Giao tiếp giữa ứng dụng web và dịch vụ AWS do API xử lý như hình dưới:

![Xử lý yêu cầu từ người dùng](https://images.viblo.asia/caafc474-e165-44c0-a6e6-4f9b3d303048.png)

Số lượng dịch vụ có sẵn có thể làm cho bạn kinh sợ khi lần đầu trải nghiệm. Khi truy cập vào giao diện web của AWS bạn sẽ thấy tổng quan với danh sách 98 dịch vụ. Trên hết, những dịch vụ mới được công bố liên tục trong mỗi năm tại hội thảo lớn tại Las Vegas, AWS re:Invent.

AWS cung cấp các dịch vụ trong các danh mục sau:

![Danh sách dịch vụ AWS](https://images.viblo.asia/454df889-cb1b-4137-bc6b-772dcf50ba5c.png)

Có quá nhiều dịch vụ để chúng ta tìm hiểu, vì vậy chúng ta chỉ tập trung vào những dịch vụ giúp bạn bắt đầu một cách nhanh chóng, cũng như là những dịch vụ được sử dụng nhiều nhất. Dưới đây là những dịch vụ chúng ta sẽ tìm hiểu:

* EC2—Virtual machines
* ELB—Load balancers
* Lambda—Executing functions
* Elastic Beanstalk—Deploying web applications
* S3—Object store
* EFS—Network filesystem
* Glacier—Archiving data
* RDS—SQL databases
* DynamoDB—NoSQL database
* ElastiCache—In-memory key-value store
* VPC—Private network
* CloudWatch—Monitoring and logging
* CloudFormation—Automating your infrastructure
* OpsWorks—Deploying web applications
* IAM—Restricting access to your cloud resources
* Simple Queue Service—Distributed queues

Chúng ta thiếu ít nhất 3 chủ đề quan trọng: continuous delivery, Docker/containers, và Big Data. Khi có thời gian chúng ta sẽ cùng tìm hiểu những vấn đề này.
Khi tìm hiểu tới đây ban sẽ đặt ra dấu hỏi (?) làm thế nào để tương tác với những dịch vụ này? Phần tiếp theo sẽ giải thích về giao diện web, giao diện command-line, SDKs và truy cập nguồn tài nguyên AWS.

Bài tiếp theo:

[Tương tác với AWS](https://viblo.asia/p/tuong-tac-voi-aws-YWOZrjPNZQ0)

Cảm ơn các bạn đã quan tâm. Nếu các bạn có gì thắc mắc hãy mạnh dạn để lại bình luận bên dưới. Mình sẽ trả lời các bạn trong thời gian sớm nhất.

Nguồn tham khảo: **Amazon Web Services in Action, 2nd Edition (Michael Wittig và Andreas Wittig).**