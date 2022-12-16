AWS networking là một thành phần quan trọng của AWS, là nền tảng cho mọi thứ chúng ta thực hiện trong AWS. Trong bài viết này chúng ta sẽ đề cập đến một số cái khái niệm rất quen thuộc cũng như vai trò và nhiệm vụ của chúng, ví dụ như Amazone Virtual Private Cloud (VPC), cách sử dụng Route 53 để quản lý tên miền và kết nối với AWS, tìm hiểu về cách mà Amazone CloudFront truyền tải nội dung web đến người dùng nhanh hơn, hay cơ chế cân bằng tải của Elastic Load Balancing (ELB).
Trước khi đi vào tìm hiểu chi tiết, chúng ta điểm qua một số khái nhiệm cơ bản
- Virtual Private Cloud (VPC)

  VPC là một mạng ảo trong AWS cloud, được cô lập rành riêng cho account của bạn , tại đây bạn có thể khởi chạy các tài nguyên cũng như dịch vụ AWS của mình một cách an toàn đồng thời có thể control hoàn toàn chúng.
Khi tạo VPC cần chỉ định 1 dải địa chỉ Ipv4 dạng 10.0.0.0/16 trong CIDR block (để biết thêm thông tin về CIDR bạn có thể tham khảo tại đây https://tools.ietf.org/html/rfc4632). Khối đầu tiên là primary CIDR, chúng ta có thể khai báo thêm các secondary CIDR nếu cần.

- Subnets

  Là dải IP trong VPC, sau khi khởi chạy các dịch vụ như EC2 vào các subnet cụ thể trong VPC, chúng ta có thể đặt chúng vào một public subnet nếu muốn các dịch vụ này public ra bên ngoài, hoặc nếu không thì  để trong private subnet
Trong một VPC có 2 phần là private subnets và public subnets tương ứng với các vùng khả dụng (Availabilty Zones - AZs). Cứ mỗi một Subnet được tạo ra, sẽ ánh xạ đến 1 AZ duy nhất
![](https://images.viblo.asia/a325156a-6c17-4581-a4f6-706c53358ed9.png)

- Rounte Tables

  Mỗi Subnets được liên kết với 1 bảng định tuyến, đồng thời quy định các route cho phép truy cập từ mạng đó. Mỗi một subnet trong VPC đều được liên kết với bảng định tuyến. Bản thân VPC cũng có 1 bảng định tuyến chính gọi là `main route table`, mặc định mọi subnet mà chúng ta tạo đều được liên kết với với bảng định tuyến này.
  
- Security Groups

  Security Groups dùng để kiểm soát lưu lượng truy cập vào/ra của các EC instances. Chúng ta có thể sử dụng Security Groups mặc định mà AWS đã tạo khi chúng ta tạo mới một instance hoặc tự define một cái để quản lý Inbound/outbound traffic.

- Network Access Control List (NACLs)

  NACLs kiểm soát lưu lượng truy cập ra/vào cho subnets. Mỗi một subnets trong VPC đều liên kết với 1 NACL.

#### 1. Amazone VPC

![](https://images.viblo.asia/b6b2b700-611f-4b70-9e29-80d457137f64.png)
VPC đi kèm với một số thành phần hoạt động cùng nhau để cho phép kết nối mạng. Hình trên hiển thị bảng điều khiển của VPC, liệt kê các tài nguyên bạn có thể sử dụng trong VPC của mình. Chúng bao gồm Subnets, Route Tables, Internet Gateways ...
* **Subnets**: Có 2 loại chính là *private* và *public*
    
    * *Private subnets*: Được sử dụng cho các tài nguyên mà không cần kết nối với mạng internet  như databases chẳng hạn.
    * *Public subnets*: Được sử dụng cho các tài nguyên mà yêu cầu phải kết nối với mạng internet bên ngoài như web servers
    * *Default subnets*: Khi tạo VPC, đồng thời cũng tạo ra một subnet mặc định và là public subnet. Subnet này vừa có Private và Public IPv4. Các instances trong VPC này có thể giao tiếp với nhau và cũng có thể truy cập Internet thông qua Internet gateway.
Trường hợp không sử dùng default subnet thì instances bên trong nó chỉ có private IPv5, do đó các instance này chỉ có thể giao tiếp với nhau. Nếu muốn giao tiếp với Internet thì cần chỉ định public IPv4 cho nó hoặc sửa đổi subnets' public IP 

     ![](https://images.viblo.asia/48231801-ca37-4211-93f4-2f27fdf9eb73.png)

* **Route Tables**

    VPC có thể có một hoặc nhiều subnets, mỗi một subnet phải được liên kết với một route table. Mỗi VPC sẽ có một route table mặc định (main). Nếu không có tuỳ chỉnh gì thì các subnets đều ngầm liên kết với route table mặc định này.
    
    ![](https://images.viblo.asia/b1eb5c12-f2d3-4761-8ab7-6073b9f581db.png)
* **Internet gateway/NAT gateway**

    *Internet gateway*: Component này cho phép các instance trong VPC có thể kết nối với Internet. 

   *NAT gateway*:  Cổng này cho phép các EC2 instances đang ở trong private Subnet có khả năng kết nối với các dịch vụ AWS khác cũng như là kết nối Internet.
#### 2. Route 53
Là dịch vụ DNS của amazone, giúp người dùng có thể truy cập vào một  trang web bằng cách dịch chuyển tên miền thành các địa chỉ IP mà máy tính có thể sử dụng và kết nối với nhau. Cách làm như sau:
    * Đăng kí tên miền
    * Route traffic đến ứng dụng của mình
#### 3. Elastic Load Balancing

AWS cung cấp dịch vụ cân bằng tải (ELB) để phân phối các ứng dụng và lưu lượng truy cập mạng một cách tự động. Ví dụ như có một lượng lớn request tới cùng 1 server, ELB sẽ phân bổ chúng ra những server khác.

ELB hỗ trợ 3 kiểu cân bằng tải
* Application Load Balancers
*  Network Load Balancers
* Classic Load Balancers

ELB có khả năng tự mở rộng khi lượng truy cập vào ứng dụng thay đổi theo thời gian. 

ELB hoạt động như thế nào ?

![](https://images.viblo.asia/2a3af812-ede2-4bff-9c59-d55d5c2b509f.png)

Trước tiên user nhận được tên miền của ELB từ DNS server, DNS server sẽ trả về 1 hoặc nhiều địa chỉ IP của máy khách, các địa chỉ IP này sẽ trỏ đến các nodes của ELB. User sẽ chọn một trong các địa chỉ IP rồi gửi đến load balancer, load balancer sẽ lựa chọn healthy instance và gửi request đến.
![](https://images.viblo.asia/4b870047-3649-4ed4-b9d2-d623a29e7209.png)
(ảnh nguồn https://medium.com)

Trong hình bên trên có 2 loại ELB là internet facing và intenal. Với Internet facing, ELB phân phối request từ phía client (Internet) vào trong các instances. Ngoài ra chúng ta cũng có thể cấu hình bộ cân bằng tải bên trong để phân phối lưu lượng truy cập nội bộ như database chẳng hạn 

AWS networking là một chủ đề khá rộng, trong bài viết này mình chỉ đề cập đến một số component thường dùng và ý nghĩa của chúng, cách mà Amazone VPC cho phép thiết lập mạng riêng biệt và an toàn trên cloud, các thành phần chính của VPC như subnets, routes, ELB

Tài liệu tham khảo: 
https://medium.com/nubego/understanding-aws-elastic-load-balancing-62bf3d2cec5f
https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html