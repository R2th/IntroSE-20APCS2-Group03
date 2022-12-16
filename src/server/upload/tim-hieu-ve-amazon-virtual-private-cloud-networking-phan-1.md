Trong bài này chúng ta sẽ tìm hiểu về một phần khá quan trọng trong AWS đó là mạng Virtual Private Cloud & Networking.
VPC là một phần chuyên sâu cho chứng chỉ [AWS SAA](https://aws.amazon.com/vi/certification/certified-solutions-architect-associate/) và AWS [System Ops](https://aws.amazon.com/vi/training/classroom/systems-operations-on-aws/)

 Ở mức độ cơ bản, chúng ta cần biết những thứ cơ bản như sau:
 
 - VPC, Subnets, Internet Gateways & NAT Gateway
 - Security Group, Network ACL, VPC Flow Logs
 - VPC Peering, VPC EndPoint
 - Site to Site VPN & Direct Connect
 - Transit Gateway

### I.VPC, Subnets, Internet Gateways & NAT Gateway
![image.png](https://images.viblo.asia/b230a38c-c95f-46d4-b251-03113c0b314c.png)

<div align="center">Mạng VPC</div>

* VPC hay còn gọi là Amazon Virtual Private Cloud (Amazon VPC) cho phép bạn kiểm soát hoàn toàn môi trường mạng ảo, bao gồm vị trí đặt tài nguyên, khả năng kết nối và bảo mật. Bắt đầu bằng cách thiết lập VPC của bạn trong bảng điều khiển dịch vụ AWS
* Subnet là một dãy IP trong mạng VPC. Chúng ta có thể khởi tại các tài nguyên trong subnet này, như là EC2. Việc chúng ta cần làm là định nghĩa các IPv4  CIDR block cho subnet đó. Mỗi subnet có một A-Z nhất định.
    * Public Subnet có thể kết nối được với internet thông qua internet Gateway
    * Private Subnet không thể kết nối với internet
 * Route Table: định nghĩa kết nối cho những subnet muốn kết nối với internet hoặc những subnet trong mạng kết nối lẫn nhau.

**QnA**: Làm sao để các Instance trong các subnet kết nối được với internet, hãy xem sơ đồ sau đây

 ![VPC (1).jpg](https://images.viblo.asia/33d47964-ccf5-4020-85d2-6ae43e1fcb93.jpg)
  
  * IGW (Internet gateway) giúp instance của bạn kết nối hai chiều với internet.
 
Vậy Private Subnet  vẫn kết nối với internet nhưng vẫn được privite thông qua
  * NAT Gateways được quản lý bởi AWS 
  * NAT Instance được quản lý bởi tổ chức

###   II.Network ACL & Security Group trong VPC
<br/>

**Network ACL là gì?**
* Network ACL là tường lửa để điều khiển băng thông đến hoặc từ subnet (2 chiều)
* Được gắn ở tầng Subnet 
* Rules bao gồm địa chỉ IP
* Có cả ALLOW và DENY rules

<br/>

**Security Group là gì?**
* Là tường lửa điều điều khiển traffic cho một EC2 instance
* Chỉ có ALLOW rules
* Rules bao gồm địa chỉ IPs và những Security Group  khác

<br/>

### VPC Flow Logs
- Sao lưu những thông tin liên quan đến băng thông IP, những gì diễn ra trong interface.
    - VPC Flow Log
    - Subnet Flow log
    - Elastic Network Interface Flow Logs

- Giúp giám sát và phát hiện lỗi những vấn đề về kết nối. Ví dụ như
    - Subnet đến internet
    - Subnet đến Subnet
    - Internet đến Subnet

- Sao lưu những gì liên quan đến Elastic Load Balancer,  Elasticache, RDS, Aurora, v..v..
- VPC Flow logs có thể lưu ở S3, CloudWatch Log

### VPC Peering
- Dùng để kết nối 2 mạng VPC với nhau
- Không thể di chuyển ( phải thiết lập cho mỗi VPC để giao tiếp lẫn nhau)


Ok  đã done cho phần này, mời các bạn đón độc ở các phần tiếp sao nhé.

Nguồn tham khảo
1. https://aws.amazon.com/vpc/?nc1=h_ls
2. https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html
3. https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html
4. https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html