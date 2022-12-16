Hôm nay mình sẽ tiếp tục trình bày với các bạn Phần 2 - bài viết về AWS cơ bản giành cho người mới bắt đầu.  <br>
Trong phần 1, mình đã hướng dẫn các bạn:  Đăng kí tài khoản AWS, tạo user, tạo group trong IAM, bảo mật với MFA  <br>
Chi tiết các bạn có thể xem lại link bên dưới:<br><br>
https://viblo.asia/p/basic-amazon-web-services-p1-ByEZkwXoZQ0

Tiếp theo phần 1, hôm nay mình sẽ mạn phép viết thêm phần 2.<br>
Nội dung: Basic về VPC,  Public subnet, Private subnet, Internet GateWay và NAT GateWay.<br>
OK, chúng ta bắt đầu luôn nhé.<br>
### 1. VPC là gì ?<br>
Theo như mình học được thì VPC ( Amazon Virtual Private Cloud ) có thể hiểu đơn giản :  Nó cũng cấp dãy network để ta làm việc với các resource của AWS.<br>
Những khái niệm liên quan đến VPC các bạn có thể xem mô hình bên dưới đây.<br><br>
![](https://images.viblo.asia/ae706fd4-9d9c-4c8a-bd52-24f7e5122702.png)<br><br>
Mô hình trên thì ta thấy có khá nhiều khái niệm: Internet GW, NAT GW, VPC Endpoint, VPC Peering, VPC Router, ....<br>
Tuy nhiên vì kiến thức cũng hạn chế nên trong bài viết này mình chỉ đề cập đến một số thành phần của VPC thôi. Những thành phần cơ bản mà chúng ta hay dùng.<br>
*  VPC: Tạo ra 1 dãy mạng để dùng cho các resource của aws.<br>
*  Subnet: public subnet & private subnet.<br>
 => Khi nào dùng public subnet, khi nào dùng private subnet  ???<br>
   + Subnet private với public giống nhau đều là mạng con của dãy mạng tạo từ VPC.<br>
   +  Public vs private khác nhau ở chỗ: <br>
      =>> Public thì mình routing ra ngoài qua internet gateway. Khi làm thế này thì ở ngoài sẽ connect vào ngược lại được.<br>
                     +   Ví dụ: ở ngoài internet ssh vào được EC2 (dùng public subnet). T/H này thường sẽ dùng cho frontend.<br><br>
      =>>  Private subnet thì mình routing ra ngoài qua NAT gateway + EIP. Ở ngoài sẽ không connect vào trong được.<br>
                      +   Ví dụ: ở ngoài internet ssh không đến được EC2 (dùng private subnet). T/H này thường  sẽ dùng cho backend.<br><br>
*  Route table (Routing): Định tuyến để những ec2 thuộc subnet đó đi ra được internet.<br>
*  Internet gateway: Cổng giao tiếp giữa mạng nội bộ và mạng internet.<br>

              
Câu hỏi đặt ra:<br>
+  nếu dùng private subnet ? mình không ssh vào được EC2 cho backend ?  thì sao mình có thể làm việc được trên đó ?<br>
=> Trong trường hợp này, có một giải pháp để bảo mật hơn đó là dùng thêm 1 con server trung gian, được gọi là bastion host.<br>
=>  Bastion host là một server trung gian - nó dùng public subnet. <br>
=> Admin -> ssh vào bastion host -> Từ bastion ssh qua Backend.<br><br>

Ok, lí thuyết là thế - bây giờ mình sẽ demo tạo VPC cho Public subnet trước. <br>
Mô hình mình sẽ làm sẽ như thế này - các bạn xem để dể hình dung.<br><br>
![](https://images.viblo.asia/9b4d9097-29b5-4b09-9c0d-65829c340dc1.jpg)<br><br>
Giải thích một tí về mô hình:<br>
Mình sẽ tiến hành tạo 1 VPC với: <br>
+ Dãy network là: 10.0.0.0/16 <br> 
+ Region US East (N.viginia) <br>
+ Gồm 2 Avaible zone:  us-east-1a, us-east-1b.<br>
+ Sau đó tạo 2 subnet: Public subnet (giành cho web server) & private subnet (giành cho DB). <br>  
+ Rồi tiến hành NAT private subnet để network private có thể ra được google.<br>
<br><br>
### 2. Tạo VPC<br>
Sau khi login vào console aws, ta search trên thanh tìm kiếm từ khoá: VPC <br><br>
![](https://images.viblo.asia/4dc9fcb7-987d-455b-b5d2-3e6a8808ac54.png)<br><br>
Click "Create VPC" -> Sau đó đặt tên và chọn dãy network phù hợp, ở đây mình chọn là 10.0.0.0/16<br><br>
![](https://images.viblo.asia/4eca0183-dfec-46da-903e-cf7e1ccb4b08.png)<br><br>
Sau khi tạo xong, click vào Action, lựa chọn Edit DNS hostname.<br><br>
![](https://images.viblo.asia/370a2048-945e-43db-a36e-98163d21ede6.png)<br><br>
Lựa chọn Enable, mục đích là khi tạo EC2 xong,  DNS hostname sẽ tự sinh cho mình nhé.<br><br>
![](https://images.viblo.asia/c5855bcd-66a1-484d-b10a-dfa66edeef74.png)<br><br>
Kết quả thành công sẽ như thế này.<br><br>
![](https://images.viblo.asia/9d819fea-56b3-45fa-876e-770e6b5f5425.PNG)<br><br>
### 3. Tạo subnet <br>
Sau khi tạo VPC xong, ta tiến hành tạo subnet.<br>
Click vào subnet -> Create<br><br>
![](https://images.viblo.asia/86ca804f-ee85-46a1-83cd-dfd3bc1a3574.png)<br><br>
Đặt tên subnet, lựa chọn VPC (VPC ban đầu, ở trên ta đã tạo ấy) ,<br>
Lựa chọn AZ , <br>
lựa chọn dãy network con (dãy mạng con nó phải nằm trong dãy mạng của VPC, tìm hiểu thêm về chia subnet nhé) <br><br>
![](https://images.viblo.asia/98ef7bf8-d9e6-406c-9fa1-ce4c67db6189.png) <br> <br>
Kết quả OK sẽ như thế này<br><br>
![](https://images.viblo.asia/58b88d58-06c3-47d4-9347-b951d3f2c89b.png)<br><br>
### 4. Tạo route table<br>
Sau khi tạo subnet xong, ta tiến hành tạo route table<br><br>
Đặt tên route table, lựa chọn VPC (VPC ban đầu, ở trên ta đã tạo đó =.=" <br>
![](https://images.viblo.asia/44f4b036-9024-4e5d-98e5-09271c569b97.png)<br><br>
Mình tính add luôn route, nhưng mà để khúc dưới - tạo xong internet gateway rồi add 1 lần luôn. <br>
### 5. Tạo internet gateway<br>
Sau khi tạo route table  xong, ta tiến hành tạo internet gateway.<br><br>
![](https://images.viblo.asia/99a1184d-267d-4730-a955-64e6f34a24be.png)<br><br>
Đặt tên Internet GW<br><br>
![](https://images.viblo.asia/4ba77da1-8cbb-4924-a4bf-32e50fc52737.png)<br><br>
Attach VPC (VPC ban đầu, ở trên ta đã tạo đó =.=" <br><br>
![](https://images.viblo.asia/187fc250-4ddd-4a98-9f6a-d9d28b027504.png)<br><br>
Kết quả OK<br><br>
![](https://images.viblo.asia/e83da8e2-2b62-4862-b82b-266485589c7c.PNG)<br>
<br>
### 6. Update Route Table
Nãy giờ mình chỉ có tạo VPC,  Public Subnet, Route Table, Internet gateway. <br>
Chừ quay lại phần Route Table, ta routing (định tuyến - tìm đường đi ..)  cho nó một tí. <br><br>
![](https://images.viblo.asia/edb44095-3505-434c-91a0-48b18f512d5e.png) <br><br>
Tiến hành add public subnet, cái subnet ban nãy mình đã tạo ở  bươc 3  ấy <br><br>
![](https://images.viblo.asia/21679664-7ea4-463a-8777-36ea81f04973.png)<br><br>
Cũng đứng ở đây, ta qua tab Routes - Routing cho nó đi ra internet.<br><br>
![](https://images.viblo.asia/cba782dd-01d7-484f-895c-f54772ae8234.png)<br><br>
Route tất cả đi ra internet gateway.<br><br>
![](https://images.viblo.asia/0abcbefe-eaa8-44ba-99e8-bec991dd4c20.png) <br><br>
### 7. Tạo Private Subnet<br>
' Tạo thì cũng giống với việc tạo public subnet, các bạn xem lại bước 3 nhé.<br>
Mình tạo sẽ như thế này,<br><br>
![](https://images.viblo.asia/d1d4e54f-5a24-4dec-9f41-c3fc6d56b50c.png)<br><br>
Đặt tên và attach vào VPC,<br><br>
![](https://images.viblo.asia/0e3228fa-892a-4e42-a071-eeeeda1d1b14.png)<br><br>
Xong rồi thì qua phần route table để add vào.<br><br>
![](https://images.viblo.asia/9bcddb6c-ac47-41f1-9394-ed1b27272ebd.png)<br><br>
Bước này quang trọng, điểm khác nhau giữa pritevate subnet với public subnet là gì ?<br>
đó là phần NAT gateway, private subnet sẽ có NAT gateway.<br>
### 8. Tạo NAT GateWay<br>
Ta tiến hành tạo NAT GW<br><br>
![](https://images.viblo.asia/4e4947b9-fdf1-49e2-a848-5851350d5dc4.png)<br><br>
Trong phần Subnet ta lựa chọn public subnet nhé ( các bạn xem lại mô hình ở trên để hình dung dể hơn )<br><br>
![](https://images.viblo.asia/3fb52530-6c45-40a6-8f0c-fe7a8774967f.png) <br><br>
Tiến hành tạo thêm 1 EIP ( Elastic IP address ) .<br>
Thêm một lưu ý nhỏ nữa. EIP vs Public có phần khác nhau nhé. <br>
EIP là IP Public tĩnh, nó sẽ không thay đổi còn IP IP Public ngược lại - khi mình reboot EC2 có thể nó sẽ nhảy IP khác. <br>
và  AWS sẽ tính phí phần này khá cao. Các bạn làm lab xong thì remove nó nhanh nhanh <br> <br>
![](https://images.viblo.asia/f1eb5f9b-5eb4-41db-bd26-218f740a21d9.png) <br> <br>
Sau khi tạo NAT GW + Tạo EIP, ta quay lại phần route table để routing cho nó. <br><br>
![](https://images.viblo.asia/8b0de00c-738f-45cb-9fad-d9df3c3986f7.png)<br><br>
Thế này nhé, Route 0.0.0.0/0 về NAT GW <br><br>
![](https://images.viblo.asia/ecaaadec-ef31-46c0-94de-a28213a1e3c4.png)<br><br>
<br><br>
Hôm nay chắc dừng bài viết tới đây thôi, tính viết thêm mà ngó có vẻ dài dài rồi.<br>
Để giành phần 3 tới mình sẽ viết về ACL, SG, EC2 - cũng tiếp nối theo mô hình này luôn.<br>
https://viblo.asia/p/basic-amazon-web-services-p3-maGK7429Zj2 <br>
Cảm ơn các bạn đã đọc bài viết,<br>
Bài viết mình cũng còn khá sơ sài và basic, mấy anh, mấy bạn thấy phần nào không ổn comment trao đổi để tốt ưu hơn nào.<br>
Thank you !<br>

Nguồn Tham khảo, <br>
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html<br>
https://cuongquach.com/aws-vpc-la-gi.html<br>
https://docs.amazonaws.cn/en_us/vpc/latest/userguide/what-is-amazon-vpc.html<br>
https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html<br>
https://www.youtube.com/watch?v=kB_EQGdOEkM<br>