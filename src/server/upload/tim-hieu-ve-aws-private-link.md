### 1. Giới thiệu về AWS Private Link
AWS Private Link là một cách an toàn để kết nối VPC tới các dịch vụ AWS khác. 

- Đường truyền này sẽ không đi qua Internet, nó sẽ luôn nằm trong AWS network
- Private Link giúp đơn giản hóa cấu trúc mạng của bạn vì Private Link không yêu cầu config:
    - Internet Gateway
    - NAT Device
    - Địa chỉ IP Public
    - Kết nối VPN

Các dịch vụ mà Private Link hỗ trợ gồm:
- Dịch vụ của bạn trên AWS
- Những dịch vụ được lưu trữ tại tài khoản AWS khác
- Các dịch vụ third-party được cung cấp trên AWS Marketplace

AWS Marketplace là một danh mục kỹ thuật số với hàng nghìn danh sách phần mềm từ các nhà cung cấp(vendor) phần mềm độc lập giúp bạn dễ dàng tìm kiếm, kiểm tra, mua và triển khai phần mềm chạy trên AWS.

### 2. Mô hình sử dụng AWS Private Link

![](https://images.viblo.asia/9f318980-b259-495e-9e69-518b795dbd8b.png)

Nguồn: https://app.pluralsight.com/library/courses/aws-network-design-getting-started

Trước hết, bạn có một VPC và một private subnet cùng với một Instance (EC2 chẳng hạn) trong đó.

EC2 đó muốn sử dụng một dịch vụ ở một Private Subnet khác, ở trong một VPC khác.

Bằng cách sử dụng Private Link, bạn có thể config một giao diện VPC Endpoint trong VPC của bạn, đi kèm với nó là một Elastic Network Interface(ENI) được cấp một Private IP từ Private Subnet của bạn

Chức năng của ENI là cho phép EC2 của bạn kết nối tới các tài nguyên mạng khác, bao gồm các dịch vụ AWS, EC2 khác, server vật lý và mạng Intetnet.

Bạn có thể định nghĩa một security group để kiểm soát những Ec2 nào có thể truy cập hay nói cách khác là sử dụng dịch vụ mà bạn đang kết nối.

Khi mà bạn đã có một VPC Endpoint, bạn kết nối với AWS Private Link, từ đây bạn có thể tìm Endpoint của dịch vụ (cũng sử dụng Private Link).

Khi mà bạn đã xác định được Endpoint của dịch vụ đó, traffic sẽ đi tới Network Load Balancer tại VPC của Dịch vụ đó, và cuối cùng là tới dịch vụ của người cung cấp dịch vụ

Lợi ích của mô hình sử dụng Private Link:
- Giảm số lượng các phần mà người cung cấp hay người sử dụng dịch vụ phải tham gia bảo trì, theo dõi, config.
- Đảm bảo tất cả Traffic nằm trong AWS network
- Không thể bị kết nối từ public Internet
- ENI chỉ trả về Response tới những traffic ra ngoài, điều này khiến nó không thể bị truy cập từ VPC của người cung cấp dịch vụ

### 3. Lợi ích của Private Link

**3.1 Đảm bảo an toàn cho Traffic** 

Kết nối các VPC của bạn với các dịch vụ trong AWS một cách an toàn và có thể mở rộng với AWS PrivateLink. 

Traffic sử dụng AWS PrivateLink không đi qua public internet, giảm nguy cơ tiếp xúc với các yếu tố đe dọa như brute force  và các cuộc tấn công từ chối dịch vụ phân tán (DDOS).

Bạn có thể sử dụng private IP và các security group để các dịch vụ của bạn hoạt động như thể chúng được lưu trữ trực tiếp trên mạng riêng của bạn. 

Bạn cũng có thể đính kèm endpoint policy, cho phép bạn kiểm soát chính xác ai có quyền truy cập vào một dịch vụ cụ thể.

**3.2 Đơn giản hóa việc quản lý cấu trúc mạng**

Bạn có thể kết nối các dịch vụ trên các tài khoản khác nhau và các VPC của Amazon mà không cần các quy tắc tường lửa, định nghĩa đường dẫn hoặc route table. 

Không cần config Internet Gateway, kết nối ngang hàng VPC hoặc quản lý Định tuyến liên miền không phân lớp VPC (CIDR). 

Vì AWS PrivateLink đơn giản hóa kiến trúc mạng của bạn nên bạn sẽ dễ dàng quản lý mạng toàn cầu của mình hơn.

**3.3 Thúc đẩy việc sử dụng cloud**

Dễ dàng di chuyển các ứng dụng vật lý truyền thống sang các dịch vụ Software as a service (Saas) được lưu trữ trên đám mây với AWS PrivateLink dễ dàng hơn. 

Vì dữ liệu của bạn không được tiếp xúc với Internet nơi nó có thể bị xâm phạm, nên bạn có thể di chuyển và sử dụng nhiều dịch vụ đám mây hơn với sự tự tin rằng traffic của bạn vẫn an toàn. 

Bạn không còn phải lựa chọn giữa việc sử dụng một dịch vụ và hiển thị dữ liệu quan trọng của mình lên Internet. 

Nguồn tham khảo:

https://app.pluralsight.com/library/courses/aws-network-design-getting-started

https://aws.amazon.com/privatelink/