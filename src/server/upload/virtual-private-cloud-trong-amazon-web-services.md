### 1. Virtual Private Cloud (VPC)
### 

  Các VPC chính là nền tảng của tất cả các cloud server EC2, hay nói cách khác, khi bạn sử dụng EC2, điện toán đám mây, các loại máy ảo được cung cấp bởi Amazon thì nghĩa là bạn đang sử dụng VPC.

 Mỗi Virtual Private Cloud là một phần độc lập trong của AWS cloud, nó như là mạng ảo của cá nhân bạn và bạn có toàn quyền xử kiểm soát môi trường này của mình, bao gồm: 
 
 - Định nghĩa các mạng con (subnet)
- ĐỊnh nghĩa dải IP cho server (IPv4 và IPv6)
- Kiểm soát các luồng truy cập tới và đi tại server.

Cấu trúc của VPC:

![](https://images.viblo.asia/8602173d-630b-4b21-9925-3ef9818b9ae6.png)

- VPC thuộc về Region và nó sẽ trải dài trong tất cả các Availability Zones trong Region đó
- Trong một Region có nhiều VPC
- VPC có thể có một hay nhiều Subnet
- Mỗi một Subnet sẽ gắn liền với 1 Availability Zones
- Mỗi một Cloud Server sẽ được chạy trên một Subnet nhất định



Khi bạn tạo tài khoản AWS, Amazon sẽ tạo ra một VPC mặc định cho mỗi Region. Điều này cho phép bạn triển khai máy ảo cho EC2 mà không cần config quá phức tạp. Thiết lập mặc định này rất hiệu quả trong trường hợp các ứng dụng đơn giản mà ko yêu cầu nhiều subnet hoặc kiểm soát các dải IP định sử dụng.

Các VPC mặc định này sẽ có sẵn một Subnet cho mỗi AZ khiến nó sẵn sàng triển khai EC2 ngay lập tức. Khi hệ thống càng phát triển, bạn có thể tùy chỉnh VPC mặc định này hoặc tạo ra thêm các VPC mới tùy vào nhu cầu.

VPC mà AWS cung cấp đảm bảo được chất lượng bởi lẽ nó được xây dựng trên cơ sở hạ tầng mạng khổng lồ, trong đó các AZ và giữa các AZ trong cùng 1 Region với nhau là một mạng lưới AWS riêng biệt (Private AWS Ntwork) với quy mô, thông lượng lớn. Các AZ được thiết kế sao cho độ trễ trở nên cực thấp, như thể là nó được hoạt động từ một nơi tập trung vậy.


### 2. Kiểm soát luồng ra và vào của VPC (Ingress and Egress Control)
###  

VPC sở hữu các cách thức rất đa dạng để kiểm soát luồng ra vào của nó

- Security Group (hoạt động như một tường lửa ảo) là cách thức rất phổ biến để quy định luồng nào được ra, vào VPC. Ở đây chúng ta sẽ được quy định cụ thể một số yếu tố như cổng (port), giao thức (protocol), nguồn đi và điểm đến.
- Network access control lists (NACL) cũng được sử dụng để chỉ rõ những quy định (rules) về cho phép hay từ chối đối với các luồng ra vào subnet. Chúng ta có thể định nghĩa 1 NACL rồi liên kết 1 hay nhiều subnet vào NACL đó.
- VPC cũng có thể được kết nối với VPC thông qua [peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)  . Chúng ta có thể thực hiện điều này với VPC trong cùng hoặc khác tài khoản, trong cùng hoặc khác regions 
- VPC có thể truy cập thông qua VPN.
- Chúng ta có thể quy định Route Table trong VPC để kiểm soát luồng ra vào của subnet.
- Một Internet Gateway có thể được gắn với VPC để cho phép nó được truy cập với Internet bên ngoài.
- Nếu một Private Subnet muốn truy cập với Internet bên ngoài, chúng ta có thể sử dụng một NAT Gateway.
- VPC flow logs dùng để ghi lại thông tin về toàn bộ các truy cập tới mạng, dù là được thông qua hay từ chối truy cập.

### 3. Ví dụ về mô hình cấu trúc làm việc cơ bản của VPC
### 

**Tất cả các VPC đều được kết nối Internet**

![](https://images.viblo.asia/3b6a14b8-c625-488d-9bc4-950927e75fbc.png)

VPC kết nối với một Public Subnet, tức là cloud server trong VPC đó phải có địa chỉ IP Public.

Tất cả các cloud server ở đây sẽ được kết nối Internet, do đó chúng ta cần gắn một Internet Gateway cho VPC này, điều này sẽ cho phép VPC kết nối được với Internet bên ngoài.

Ngoài ra, chúng ta cũng cần định tuyến 1 router.

Ở cấu trúc này, do tiếp xúc với Internet bên ngoài, chúng ta cần lưu ý đến vấn đề bảo mật. Do đó, chúng ta cần cài đặt một Security Group (hoạt động như một tường lửa ảo) để tránh cloud server tiếp xúc với những rủi ro không cần thiết. 

Các Security Group sẽ bao gồm các luật, quy định ra nhằm điều chỉnh các luồng truy cập vào hoặc ra của VPC.

Các VPC của bạn sẽ được yêu cầu gán 1 hay nhiều Security Group, nếu bạn không chủ động gán bất kỳ một cái nào thì VPC sẽ được gán với Security Group mặc định (được AWS tạo sẵn cho mỗi VPC mặc định).

Cấu trúc này thích hợp cho việc thử nghiệm, phát triển và trong các hệ thống mà tất cả các cloud server đều đòi hỏi việc truy cập ra bên ngoài.

Nguồn tham khảo : 

https://app.pluralsight.com/library/courses/aws-network-design-getting-started