![](https://images.viblo.asia/ed95c359-a1cf-4ec5-bfe1-2f1c00a458ea.png)

### VPC là gì?

<b>VPC</b> (<b>Virtual Private Cloud</b>) giúp bạn tạo ra một môi trường tách biệt, nơi mà bạn có thể triển khai hệ thống trong một hệ thống mạng ảo riêng mà bạn định nghĩa. Bạn có toàn quyền quyết định môi trường mạng ảo này sẽ như thế nào, bao gồm lựa chọn dải IP của riêng bạn, tạo mạng con (<b>subnet</b>), bảng định tuyến (<b>route table</b>) và cổng kết nối mạng (<b>net gateway</b>), cũng có thể sử dụng cả <b>IPv4</b> và <b>IPv6</b> cho bảo mật và dễ dàng truy cập ứng dụng, tài nguyên của bạn.

Bạn có thể dễ dàng điều chỉnh cấu hình <b>VPC</b>, tạo mạng con công khai cho các máy chủ thông qua <b>Internet</b>, đặt các hệ thống backend như cơ sở dữ liệu (<b>database</b>) hoặc máy chủ ứng dụng (<b>application server</b>) trong một mạng riêng tư không có kết nối Internet. Bạn có thể sử dụng nhiều lớp bảo mật, bao gồm nhóm bảo mật (<b>security groups</b>) và danh sách kiểm soát truy cập mạng (<b>network access control lists</b>), để có thể kiểm soát quyền truy cập vào các máy chủ (<b>EC2 instances</b>) trong từng mạng con (<b>subnet</b>).  

### Các thành phần của VPC

#### Subnet
**Subnet** chia nhỏ một mạng to thành các mạng con. Kiểm soát các mạng con thì dễ dàng hơn so với một mạng to. Thông thường sẽ chia ra public subnet cho các dịch vụ truy cập **Internet**, còn private subnet dành cho các phần nội bộ, không cần truy cập **Internet** như **database**, ...

<br/>

#### Internet Gateway
**Internet Gateway** là một thành phần quan trọng cho phép các **Instance** có thể truy cập đến **Internet**. Nó cho phép người dùng kết nối mạng con đến **Internet** bằng việc cung cấp một **route** tới **Internet**. Với sự trợ giúp của **Internet Gateway**, một Instance có thể truy cập **Internet** và các **resources** bên ngoài cũng có thể kết nối với instance này. 

<br/>

#### Security Group
Lớp bảo mật cho Instance, có thể coi như là **firewall**, cần phải định nghĩa các quy tắc trước khi **traffic** ra vào Instance. 

<br/>

#### Route Table
**Route table** có thể hiểu là một bảng định tuyến, bao gồm các quy tắc định tuyến, hiểu đơn giản đây là một cái bảng chỉ dẫn đường đi, chỉ cần nhìn vào đây là biết được sẽ phải đi tới đâu, ví dụ từ A cần đi tới B, C đi tới D.
Mỗi một subnet chỉ liên kết với 1 route table, nhưng 1 route table có thể liên kết nhiều subnet. 

<br/>

#### Network Access Control Lists
**A network access control list** (**ACL**) là một lớp bảo mật cho **VPC**, thực hiện như một **firewall** điều khiển lưu lượng vào và ra của một hay nhiều subnet. 

<br/>

#### NAT Gateway
**NAT gateway** cho phép 1 **Instance** trong **private subnet** có thể kết nối với **Internet** hoặc các dịch vụ khác của **AWS**, và hoạt động theo một chiều, nghĩa là từ **Internet** không thể kết nối đến Instance này. 

<br/>

### Tạo VPC

Dưới đây là cấu trúc của 1 **VPC**, cùng xây dựng các thành phần của **VPC** này nhé

![](https://images.viblo.asia/33f1e7f1-0837-4ff2-886b-4e3531db8d17.png)

Mục tiêu của chúng ta là setup 1 hệ thống **VPC**, gồm các thành phần **private subnet**, **public subnet**, **Route table**, **NAT gateway** cho phép **App Server** có thể kết nối được với **Internet**.

- Chọn dịch vụ **VPC**: Click vào Services, gõ `VPC` và chọn dịch vụ, điền các thông tin, **IPv4 CIDR** điền là `10.0.0.0/16`

![](https://images.viblo.asia/444ff405-3ff6-407b-8e0e-8ca87b324d51.png)

![](https://images.viblo.asia/233ddf53-92a5-4f34-873b-d55a61564a4e.png)

- Tạo subnets: lần lượt tạo các subnets với các thông tin như sau:

    + publicA: `10.0.0.0/24`
    + publicB: `10.0.1.0/24`
    + publicC: `10.0.2.0/24`
    
    + privateA: `10.0.4.0/24`
    + privateA: `10.0.5.0/24`
    + privateA: `10.0.6.0/24`
    
    + dbA: `10.0.8.0/24`
    + dbB: `10.0.9.0/24`
    + dbC: `10.0.10.0/24`
 
![](https://images.viblo.asia/7dcd03ac-2003-450f-8eff-bcdcdcc0bd5e.png)

- Assign <b>public IPv4</b> address cho subnet <b>publicA</b>, **publicB**, **publicC**: Lần lượt click vào từng **subnet**, click <b>**Actions**</b> > <b>**Modify auto-assign IP settings**.</b>

![](https://images.viblo.asia/3feda1d6-6bf6-435a-bd88-fe3a590af116.png)

- Tạo **Internet Gateway** và gắn vào **VPC**

![](https://images.viblo.asia/675de6dc-893e-4f50-8fd5-9d26b0e49c64.png)

![](https://images.viblo.asia/5e77b5af-7ecb-42e0-8f01-8533dae4e7e6.png)

- Tạo **Route Table**, trỏ đến **VPC**

![](https://images.viblo.asia/28e47955-1dd1-4a56-a003-422b27af2f18.png)

Thêm **route** cho **Route table**, với đích đến (Destination) là Internet sẽ đi qua **Internet gateway** đã tạo ở trên
(`0.0.0.0/0` là toàn bộ **IPv4**, `::0` là toàn bộ **IPv6**)

![](https://images.viblo.asia/27aa33f7-0237-4fab-a58e-8663e8dac476.png)

Gắn 3 subnets **publicA**, **publicB**, **publicC** vào **Route table**, điều này sẽ giúp kết nối các subnet này với Internet

![](https://images.viblo.asia/25bda702-e3c1-46c6-bca4-b782d56aa7c9.png)

- Tạo **Bastion Host** (hiểu đơn giản thì đây là một lớp bảo mật của **Instance**, chỉ cho phép truy cập vào **Instance** thông qua **Bastion Host**, mọi kết nối từ ngoài đều bị từ chối), gắn **Bastion Host** vào **VPC** tạo ở trên và **publicB**

Trong phần chọn network, chọn đến **VPC** đã tạo từ trước và subnet là **publicB**

![](https://images.viblo.asia/5982b6f4-177b-4f48-8198-b7336019d31e.png)

Trong phần **Security group**, tạo mới, SG này sẽ được dùng để gắn vào app server ở bước sau

![](https://images.viblo.asia/a648e96f-8d86-4c86-9db1-c924a3427eb0.png)

- Tạo **NAT gateways** trong **publicA**

![](https://images.viblo.asia/de8c7b70-16a6-4386-8c13-b9082b0e69bd.png)

Lần lượt tạo **NAT gateways** cho **publicB**, **publicC**

- Tạo **Route table** cho **privateA**, chọn **VPC** đã tạo từ trước

![](https://images.viblo.asia/e4d7846c-2e8b-4efb-b6de-2e049c1ff2bc.png)

- Trỏ **privateA** sang **NAT-gateway-A**

Tạo **route** để **privateA** kết nối với **NAT-gateway-A**.
Phần Destination điền `0.0.0.0/0` và Target chọn **NAT-gateway-A**

![](https://images.viblo.asia/0e6c3f8f-2928-4cde-9d68-51105f8df3f8.png)

Route trên có nghĩa là mọi kết nối đến Internet (`0.0.0.0/0` là toàn bộ **IPv4**) trong **privateA** sẽ được điều hướng qua **NAT-gateway-A**

- Thêm subnets vào **Route table**

Thêm subnet **privateA** và **dbA** vào Route table tạo ở trên

![](https://images.viblo.asia/69816f74-3f08-40f0-8dc9-7529de8d4bd4.png)

- Tạo **App server instance**

Trong phần network chọn **VPC** và subnet là **privateA**

![](https://images.viblo.asia/990939d1-0117-42e3-8198-b4c83082a23f.png)

Trong phần **Security groups**, chọn **bastionSG** đã tạo ở bước bên trên

![](https://images.viblo.asia/3385497e-71b4-4e5e-8ba7-432a3ef5aa47.png)

Điều này chỉ cho phép các **Instance** nằm trong cùng 1 SG mới có thể kết nối với nhau. Ở đây, chỉ **Bastion Host** mới có thể truy cập được **App server**.

- Kết nối vào **App server**

Dùng **ssh** truy cập vào **Bastion Host**, rồi từ **Bastion Host** truy cập sang **App server**, ping đến `1.1.1.1`

![](https://images.viblo.asia/2fc49a91-f2b1-44fe-8730-85803f4b9f2e.png)

Vậy là **App server** đã có thể truy cập được **Internet**. 

<br/>
<br/>


#### Tổng kết

**VPC** là một phần quan trọng của **AWS**, không chỉ để triển khai cho hệ thống thực tế, mà còn có ích trong việc thi chứng chỉ <b>AWS</b> (Cùng tìm hiểu về hệ thống chứng chỉ <b>AWS</b> qua bài viết của mình ở [<b>đây</b>](https://viblo.asia/p/tim-hieu-he-thong-chung-chi-aws-63vKjbq6K2R) nhé)
    
Cảm ơn các bạn đã đọc bài!

<br/>

#### Tài liệu tham khảo:
- Khoá học AWS Certified Solutions Architect - Associate Level
https://linuxacademy.com/cp/modules/view/id/341