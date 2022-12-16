## Introduction
Ở phần [trước](https://viblo.asia/p/amazon-web-services-concepts-introduction-to-aws-core-services-yMnKMJxmZ7P) mình đã giới thiệu qua về Amazon Web Service và khái niệm cơ bản của các core services (VPC, EC2, RDS, S3) của nó. Trong phần này mình sẽ đi sâu hơn một chút về thành phần khá quan trọng của AWS là IAM và cấu trúc con bên trong VPC.

Để dễ hình dung thì chúng ta có sơ đồ khá chí tiết và đầy đủ về các services của AWS như sau:
![](https://images.viblo.asia/28902183-adc8-4460-8f11-31a972f2ad7e.png)

Nhìn sơ qua chúng ta có thể thấy để lấy được những thông tin người dùng mong muốn thì phải qua rất nhiều công đoạn (request được điều hướng ở routes, qua gateway, tới cân bằng tải ELB, NACLs, subnet..) chứ không đơn giản là chạy một mạch tới S3 hay RDS rồi quay ngược ra thông qua EC2 như ở phần trước. Hơn nữa ở đây ngoài account creator của project (giả sử như chính là chúng ta) thì vẫn có các thành viên khác ở trong team (other accounts/users) và nếu như chúng ta muốn phân quyền hoặc hạn chế một số khả năng tương tác với các services của từng người thì lúc đó sẽ phải cần tới **IAM**.
## IAM (Identity & Access Management)
**IAM (Identity & Access Management)** là nơi mà chúng ta có thể quản lý và thiết lập quyền truy cập services cho các account khác.

Trong đó những thứ mà **IAM** quản lý cụ thể gồm:
* Users
* Groups
* IAM Access Policies
* Roles

![](https://images.viblo.asia/41d0b1f1-fe73-4688-883d-92686b73f917.png)
### Users
Mặc định, account ban đầu được tạo sẽ là root, có **toàn quyền** quản lý hệ thống. Với mỗi account/user khác được tạo thêm mặc định sẽ **không** có bất kì quyền truy cập nào vào AWS Services, và root sẽ cấp quyền truy cập vào các services cụ thể sau đó. Như hình trên thì account Matt đã được cấp quyền access vào S3 còn những account còn lại thì không.
### Groups
Với trường hợp có quá nhiều account thì thay vì cấp quyền cho từng cá nhân, chúng ta cũng có thể  quản lý dưới dạng `groups` và set quyền cho cả group đó:

![](https://images.viblo.asia/01d5bc7f-ab1c-47ea-9d42-8de4b56d2897.png)

Ở đây chúng ta cho các users vào chung group "Dev" và set quyền access S3 cho group, tức là toàn bộ accounts/users trong group "Dev" đều có quyền access vào S3.
### Roles
Không chỉ thiếp lập quyền truy cập cho account/user, **IAM** cũng cho phép chúng ta thiết lập quyền access giữa các services thông qua `Roles`. Cụ thể ở đây ta mới chỉ cho phép accounts quyền access vào S3 nhưng S3 chưa có quyền access vào services nào cả, giả sử như chúng ta muốn S3 có thể access tới EC2 và ngược lại, có thể set `role` cho chúng:

![](https://images.viblo.asia/28c9457b-6c73-4081-8a28-b7c61540256f.png)

Đó là khái niệm và các tính chất cơ bản của IAM, giờ chúng ta sẽ sang phần tiếp theo về cấu trúc bên trong của **VPC**
## VPC (Virtual Private Cloud)
   Ở phần trước mình đã giới thiệu sơ qua về `VPC`, hiểu đơn giản nó là môi trường ảo chứa và chạy các AWS services mà chúng ta tự định nghĩa ra. Nhưng bài viết này mình sẽ đi sâu hơn một tí về infrastructure, về cách mà VPC quản lý, về dải IP, khởi tạo subnet, hay cấu hình routes và cài đặt network gateway.
   
![](https://images.viblo.asia/5013c66a-3a51-4412-9e5a-e14c9d4c7b40.png)
### VPC Infrastructure
Trước tiên là về `Infrastructure (cơ sở hạ tầng)`:
* `AWS regions` là nhóm các AWS resources được đặt ở các khu vực địa lý khác nhau trên thế giới, để thuận tiên cho việc truy cập server ở nơi gần nhất
* `Regions` bao gồm tập hợp các `Availability Zones`, nhưng `Availability Zones` là gì?
* `Availability Zones` là nơi đặt các `AWS data centers (physical hardware runs AWS services)`

![](https://images.viblo.asia/0ccc47c6-a578-4a59-b8c4-6f2c9ff98eed.png)

Tiếp theo chúng ta sẽ đi sâu vào cấu trúc bên trong của VPC:

![](https://images.viblo.asia/276c4372-d9e2-4ce4-8e47-2b9e684a4f9f.png)

Để dễ hình dung, chúng ta có thể coi như VPC là một Private network trong gia đình:
* Trước tiên dữ liệu từ internet sẽ phải qua một Cable/Fiber Modem, trong VPC là `Internet Gateway`
* Sau đó được điều hướng thông qua Routes nội bộ, trong VPC là `Route Table`
* Sau đó tiếp tục đi qua Firewall, trong VPC là `Network Access Control List (NACL)`
* Cuối cùng là đến các thiết bị của người dùng, trong VPC là các `Subnet`
### Internet Gateway (IGW)
* `Internet Gateway` là thành phần cho phép các instances trong VPC của chúng ta có thể giao tiếp với internet. 
* Mặc định thì VPC lúc nào cũng có sẵn một IGW, chỉ duy nhất **một** IGW được tích hợp trong VPC tại một thời điểm
* **Không thể** loại bỏ IGW nếu như trong VPC lúc đó đang có ít nhất một AWS resources đang hoạt động (vd như EC2 instances hoặc RDS)
### Route Tables (RTs)
* `Route Tables` là nơi chứa các quy tắc (rules), cho phép điều hướng request đi đến các thành phần tương ứng trong VPC. Cụ thể như sơ đồ ở trên thì `network traffic` sẽ được `RTs` điều hướng luồng nào sẽ sang `subnet 1` luồng nào sang `subnet 2`.
* Cũng như `IGW`, `RTs` mặc định luôn có sẵn và là main `RTs` trong VPC ban đầu
* Một VPC có thể có nhiều `RTs` cùng active 
* Trong trường hợp `RTs` đang có liên kết với một subnet bất kì, chúng ta không thể xóa bỏ bất cứ route nào của chúng.
### NACL (Network Access Control Lists)
![](https://images.viblo.asia/dc2886f7-a794-4adc-ac8d-d3632e69d99b.PNG)

* `NACL (Network Access Control Lists)` là lớp bảo mật của VPC, đóng vai trò như Firewall trong việc quản lý và điều khiển các luồng data đến và đi từ một hay nhiều subnet
* Mặc định trong VPC luôn có `NACL` liên kết sẵn với default subnets
* Một `NACL` có thể liên kết với nhiều subnets
* Tuy nhiên một subnet chỉ có thể liên kết với **một** `NACL` tại một thời điểm

![](https://images.viblo.asia/e6176bd8-bda3-48cd-b8be-206b33ce2f2d.PNG)

**NACLs Rules**
* Network traffic sẽ được chia thành hai luồng `inbound` và `outbound`
* Với `NACL` mặc định ban đầu thì mọi traffic đều được cho phép với cả `inbound` và `outbound`
* Có thể tạo một custom `NACL` và liên kết nó với một subnet, mặc định thì toàn bộ traffic ở cả hai luồng `inbound` và `outbound` của `NACL` này đều bị từ chối cho đến khi ta add thêm rules cho nó
* Có thể thêm hoặc xóa các rules trong `NACL`, tuy nhiên chúng tuân theo một số quy tắc:
1. Rule Number: Rules được sắp xếp và thực hiện theo số `rule #` của chúng từ thấp đến cao
2. Sau khi một rule match với traffic phù hợp, nó lập tức được áp dụng và bỏ qua các rule cao hơn dù có thể mâu thuẫn với nó.

![](https://images.viblo.asia/880789a5-42f2-4b73-adb4-5e5644ba32ef.PNG)

### Subnet

![](https://images.viblo.asia/f4e12085-6102-4191-8199-65a9b80b7cf7.PNG)

`Subnet (subnetwork)` hiểu ngắn gọn là sub-section của network. Khi ta bắt đầu khởi tạo một VPC, nó sẽ khoanh vùng các `Availability Zones` trong khu vực `(region)` đó, sau khi tạo xong VPC, ta có thể thêm một hay nhiều `subnet` cho mỗi `Availability Zone`. Mỗi `subnet` chỉ được tạo trong phạm vi của `Availability Zone` đó và không thể mở rộng.
* Mặc định default VPC luôn có sẵn default `subnet`
* `Subnets` phải được liên kết với một `Route Tables`
* Có hai loại `subnet` là private và public (`public subnet` có route để kết nối với Internet, `private subnet` thì ngược lại)
## Summary
Qua bài viết này mình đã giới thiệu khái quát về các thành phần sâu hơn của AWS là IAM và các thành phần cấu trúc bên trong của VPC như IGN, Subnet, RTs, NACLs.. Bài viết còn nhiều thiếu sót, cảm ơn các bạn đã quan tâm và đọc bài viết.

Nguồn & tài liệu tham khảo:
* https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started.html
* https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html
* https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Security.html
* https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Route_Tables.html
* https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Internet_Gateway.html
* https://www.lucidchart.com/documents/view/703f6119-4838-4bbb-bc7e-be2fb75e89e5/0