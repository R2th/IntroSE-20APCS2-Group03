Tuần này, tôi trình bày lại những gì tôi đã học được về Virtual Private Cloud (VPC) của Amazon. Nếu bạn muốn xem những gì tôi đã học được về AWS, hãy xem [Tổng quan về DynamoDB](https://lewisdgavin.medium.com/aws-dynamodb-overview-184e53aedcd6) và [Tổng quan về S3](https://lewisdgavin.medium.com/aws-s3-overview-6fe9ca2a1e0a).

Bài viết này mang tính chất tham khảo nhiều hơn nếu bạn đang nghĩ đến việc làm Exam "AWS Developer Associate".

# VPC là gì?
VPC là một mạng ảo dành riêng cho bạn trong AWS để bạn nắm giữ tất cả các dịch vụ AWS của mình. Nó là một trung tâm dữ liệu logic trong AWS và sẽ có gateways, route tables, network access control lists (ACL), subnets và security groups.

Những điều cần lưu ý:

* Mỗi subnet tồn tại trong 1 vùng khả dụng.
* Security groups là trạng thái, ACL không trạng thái.
* VPC có thể được xem xét trong cùng một tài khoản và trên các tài khoản AWS.
* Tính năng ngang hàng bắc cầu không được phép, nghĩa là bạn không thể chuyển từ VPC này sang VPC khác, thông qua VPC khác. Bạn phải có quyền truy cập trực tiếp.


# Tại sao sử dụng VPC?

Khi bạn mở một dịch vụ trong một public cloud, nó sẽ mở ra toàn cầu và có thể gặp rủi ro trước các cuộc tấn công từ internet. Để khóa các instances của bạn và bảo mật chúng trước các cuộc tấn công từ bên ngoài, bạn khóa chúng trong VPC. VPC hạn chế loại lưu lượng truy cập, địa chỉ IP và cả những người dùng có thể truy cập instances của bạn.

Điều này ngăn những khách không mong muốn truy cập vào tài nguyên của bạn và bảo vệ bạn khỏi những thứ như tấn công DDOS. Không phải tất cả các dịch vụ đều yêu cầu quyền truy cập internet, vì vậy chúng có thể được khóa an toàn trong mạng riêng. Sau đó, bạn chỉ có thể hiển thị một số máy nhất định với Internet.

Rõ ràng, nếu bạn muốn cài đặt phần mềm hoặc truy cập Internet từ các private instances bị chặn khỏi Internet, thì đây là một vấn đề. Tuy nhiên, có một vài giải pháp cho vấn đề này mà tôi sẽ trình bày tiếp theo.

# NAT Instances

Một NAT instance có thể được sử dụng để giải quyết vấn đề “làm cách nào để cài đặt mọi thứ từ internet trên các private instance được bảo mật của tôi”?

Một NAT instance được tạo trong một public subnet có quyền truy cập vào internet. Sau khi bạn cho phép truy cập từ private instance của mình vào NAT, private instance của bạn sau đó sẽ có thể thực hiện các yêu cầu với internet. Quyền truy cập này là một cách, tức là ai đó từ internet không thể truy cập instance của bạn.

Những điều cần lưu ý:
* Một NAT instance phải nằm trong một public subnet..
* Nó phải có Elastic IP
* Phải có một route từ private subnet của bạn vào NAT instance.
* Bạn có thể tạo tính khả dụng cao theo cách thủ công bằng cách sử dụng Autoscaling groups và multiple subnets.
* Khác với Bastian vì NAT được sử dụng để cung cấp truy cập internet vào các private instances, một Bastian được sử dụng để quản lý instances bằng SSH chẳng hạn.
* Chúng hiện không được dùng nữa và được thay thế bằng NAT Gateways.

![](https://images.viblo.asia/e360ea76-f074-4c82-8fa3-37de8f6ea1ee.png)
Ảnh lấy từ: [wrathofchris.wordpress.com](https://wrathofchris.wordpress.com/2014/04/14/crossing-the-amazon-vpc-boundary/)

# NAT Gateways

NAT Gateways về cơ bản đã thay thế các NAT instance vì chúng cho phép cùng một quyền truy cập vào internet từ một private subnet với cùng một bảo mật. Tuy nhiên, chúng dễ dàng thiết lập và mở rộng hơn nhiều vì tất cả đều do Amazon quản lý.

Những điều cần lưu ý:
* Scale tự động lên đến 10Gbps
* Không cần patch thủ công - amazon sẽ lo việc này
* Không liên kết với các security groups
* Tự động gán một public IP

# Network Access Control Lists (ACL)
Theo mặc định, VPC sẽ đi kèm với Network ACL và nó sẽ cho phép tất cả truy cập vào và ra. Tuy nhiên, nếu bạn tạo Network ACL mặc định, nó sẽ **block** tất cả lưu lượng đến và đi và bạn sẽ phải tự cho phép truy cập theo cách thủ công.

Mỗi subnet trong VPC phải được kết nối với Network ACL, tuy nhiên, mỗi subnet chỉ có thể được kết nối với 1 VPC tại một thời điểm. Tuy nhiên, ACL có thể được kết nối với nhiều subnet khác nhau.

Những điều cần ghi nhớ:
* Network ACL chứa danh sách các quy tắc có thứ tự để cho phép truy cập.
* Quy ước là bắt đầu từ 100 rules và tăng dần theo số lượng 100.
* Các rules sẽ được xem xét để đảm bảo nếu bạn muốn cho phép tất cả truy cập ssh ngoài một địa chỉ IP nhất định, bạn hãy thêm block rule của mình trước khi cho phép tất cả rule.
* Có các rules riêng biệt cho truy cập vào và ra, vì vậy bạn phải thiết lập các rules cho từng loại.
* Chúng không có trạng thái có nghĩa là phản hồi đối với truy cập vào phụ thuộc vào các rules truy cập ra và điều này áp dụng theo cách khác.
* Chặn địa chỉ IP bằng Network ACL chứ không phải Security groups


# Resiliency (Khả năng phục hồi)

Để có khả năng phục hồi, bạn nên luôn có 2 public subnets và 2 private subnets và đảm bảo cả hai đều ở các vùng khả dụng khác nhau. Điều tương tự cũng áp dụng cho Elastic Load Balancers (Bộ cân bằng tải).

Các NAT Instances khó hơn một chút để có tính khả dụng cao, vì vậy chúng tôi khuyên bạn nên sử dụng NAT Gateways để thay thế, vì tất cả điều này đều được thực hiện và không cần làm thủ công.

Bạn luôn có thể theo dõi lưu lượng trong VPC của mình bằng cách bật [VPC flow logs](https://www.lewisgavin.co.uk/AWS-VPC/).


***Bài viết được dịch từ: https://medium.com/datadriveninvestor/aws-vpc-for-beginners-eee01e7083d1***