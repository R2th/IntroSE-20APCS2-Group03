# 1. Security Group (SG)
**Elastic Network Interface** : Elastic Network Interface (ENI) là một phần mềm cho phép instance giao tiếp với các internet resource như các AWS service, các instance khác và internet, nó cũng cho phép bạn truy cập vào hệ điều hành bên trong instance để quản lý, về mặc chức năng, ENI hoạt động giống như Internet interface của server vật lý. Mỗi instance đều có một primary network interface (primary ENI) kết nối với một mạng con (subnet). Ta không thể xóa primary ENI khỏi instance.

Security Group (SG) hoạt động giống như một tường lửa để bảo vệ instance khỏi các cuộc tấn công mạng, SG hoạt động bằng cách cấp quyền cho các traffic ra và vào instance. Một ENI phải được gắn ít nhất một hoặc nhiều SG và một SG có thể liên kết với nhiều ENI. Khi tạo SG ta phải cấu hình Inbound rule và Outbound rule.
## 1.1 Inbound rules
IB chỉ ra các traffic được phép truy cập vào ENI gắn SG chứa inbound rule đó. Một inbound rule bao gồm:
- source: là một dãy địa chỉ IP hoặc ID của một tài nguyên bên trong SG, chỉ các địa chỉ IP nằm trong dãy này mới có thể truy cập vào ENI được
- Protocol: giao thức, chỉ các request được gửi qua giao thức này
- Port range: một dãy các cổng của instance, các request chỉ được phép đi qua cổng này

Mặc định khi được tạo, SG sử dụng một cơ chế mặc định là whitelisting, từ chối tất cả traffic, vì thế ta phải tạo inbound rule để cho phép các request có theer truy cập vào
## 1.2 Outbound rules
Outbound rule định nghĩa các traffic từ trong instance gửi ra ngoài thông qua ENI, tương tự inbound rule, outbound rule cũng có 3 giá trị
- Destination:  là một dãy địa chỉ IP hoặc ID của một tài nguyên bên trong SG, định nghĩa phạm vi request bên trong instance được phép truy cập tới
- Protocol: giao thức, chỉ các request được gửi qua giao thức này
- Port range: một dãy các cổng của instance, các request chỉ được phép đi qua cổng này

Mặc định khi tạo SG, nó sẽ tạo một rule mặc định cho phép tất cả các traffic của instance truy cập ra bên ngoài. Nếu xóa rule này đi, instance sẽ không thể truy cập dược internet được nữa.
## 1.3 Stateful firewall
Một SG hoạt động theo hướng stateful, khi một request được phép truy cập instance thì SG sẽ cho phép phẩn hòi lại request đó mà không bị ảnh hưởng bởi outbound rule.
### 1.3.1. Set cả inbound rule và outbound rule

Inbound rules
![](https://images.viblo.asia/673974cd-4d4e-4541-80e1-84c30fecdd63.png)

Outbound rules
![](https://images.viblo.asia/501d106b-a29a-426c-944a-68add2d33de1.png)

Kết quả
![](https://images.viblo.asia/2a50f501-67bf-4d7f-aefb-dc86072f4d9d.png)

### 1.3.2. Set inbound rule, không set outbound rule
Inbound rules
![](https://images.viblo.asia/673974cd-4d4e-4541-80e1-84c30fecdd63.png)

Outbound rules
![](https://images.viblo.asia/9acea6aa-f5ba-4da5-bf56-9da77b5e8e65.png)

Kết quả
![](https://images.viblo.asia/2a50f501-67bf-4d7f-aefb-dc86072f4d9d.png)
# 2.Network Access Control List (NACL)
Giống security group, NACL cũng hoạt động giống như mộ tường lửa, cấp quyền cho các traffic ra và vào, tuy nhiên NACL khác với security group ở một số điểm sau:
- security group được gắn vào ENI, còn NACL được gắn vào subnet, phân quyền cho các luồng traffic ra vào trong subnet đó. Vì thế NACL không thể phân quyền giữa các instance trong cùng một subnet, để làm được điều này ta phải sử dụng security group
- Một subnet chỉ có một NACL, một NACL có thể được gắn vào nhiều subnet

Tương tự security group, NACL cũng có inbound rule và outbound rule
## 2.1 Inbound rule
Các Inbound rule định nghĩa các traffic nào được phép truy cập vào subnet, một rule bao gốm các thành phần sau:
- Rule number : Thứ tự của rule, định nghĩa thứ tự xử lý của rule
- Protocol: giao thức, chỉ các request được gửi qua giao thức này
- Port range: một dãy các cổng của instance, các request đi qua cổng này sẽ bị ảnh hưởng bởi rule
- Source: là một dãy địa chỉ IP, các địa chỉ IP nằm trong dãy này sẽ bị ảnh hưởng bởi rule
- Action: gồm hai loại cho phép (allow) và chặn (deny)
Các quy tắc (rules) của NACL được xử lý theo thứ tự tăng dần của rule number, khi tạo NACL thì nó sẽ có một rule mặc định là chặn tất cả traffic và có rule number là ( * ) , đây là rule number lớn nhất nên sẽ được xử lý cuối cùng.

![](https://images.viblo.asia/dbd7d062-1c35-43d8-9b3d-b09974fbdede.png)


Ở ví dụ trên có 2 rule trái ngược nhau là cho phép tất cả traffic và chặn tất cả traffic, 100 là rule number thấp nhất nên nó sẽ được xử lý đầu tiên, NACL hoạt động theo quy tắc xử lý theo độ tăng dần của rule number, nếu request khớp với rule nào thì nó dừng lại ở rule đó và không xử lý tiếp

## 2.2 Outbound rule
Các outbound rule định nghĩa các traffic nào được phép truy cập từ bên trong subnet ra ngoài, mỗi rule cũng chứa các thành phần giống với inbound rule.
- Rule number : Thứ tự của rule, định nghĩa thứ tự xử lý của rule
- Protocol: giao thức, chỉ các request được gửi qua giao thức này
- Port range: một dãy các cổng của instance, các request đi qua cổng này sẽ bị ảnh hưởng bởi rule
- Source: là một dãy địa chỉ IP, các địa chỉ IP nằm trong dãy này sẽ bị ảnh hưởng bởi rule
- Action: gồm hai loại cho phép (allow) và chặn (deny)

Mặc định khi tạo NACL, sẽ có một outbound rule mặc định chặn tất cả các traffic từ trong subnet ra.

## 2.3 Stateless firewall
Khác với security group, NACL hoạt động theo hướng stateless, nghĩa là nó sẽ không tự động cho phép phản hồi các request. Vì thế ta phải cấu hình cả inboud rule và outbound rule cho request khi sử dụng NACL

### 2.3.1. Set inbound rule, không set outbound rule

Inbound rules
![](https://images.viblo.asia/13833d62-1292-4680-a20a-d71b5771787e.png)

Outbound rules
![](https://images.viblo.asia/327e02a1-7dc0-4ac4-89cd-5db2043a7d0b.png)

Kết quả
![](https://images.viblo.asia/1d6fab53-c35f-419e-85d6-ee0091dead1c.png)

### 2.3.2. Set outbound rule
Outbound rules
![](https://images.viblo.asia/f90361d3-5ed6-40ed-bf6f-f7294db3c323.png)

Kết quả
![](https://images.viblo.asia/69e341ef-5e6b-4b92-8aaa-23294c0fb5e3.png)
 
Dù đã tạo outbound rule nhưng ta vẫn không truy cập được, đó là vì NACL chỉ cho phép phản hồi qua các cổng gọi là [ephemeral ports](https://aws.amazon.com/vi/premiumsupport/knowledge-center/resolve-connection-sg-acl-inbound/#:~:text=When%20a%20client%20connects%20to,allowed%20in%20the%20network%20ACL.) . Bây giờ mình sẽ set outbound rule cho `ephemeral ports`
 
![](https://images.viblo.asia/8194e744-9b0f-4a23-930e-d55069519541.png)

Kết quả
![](https://images.viblo.asia/8d426a4a-57aa-4058-aac7-62f4afd16c50.png)

# 3.Kết
Bài viết đến đây là hết, cám ơn bạn đã dành thời gian để theo dõi ^_^ 

Xem startwar trên terminal
``` telnet Towel.blinkenlights.nl```