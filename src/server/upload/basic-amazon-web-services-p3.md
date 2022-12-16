### Hôm nay mình sẽ tiếp tục trình bày với các bạn Phần 3 <br>
Bài viết về AWS cơ bản giành cho người mới bắt đầu. <br>
Trong phần 2, mình đã hướng dẫn các bạn: Basic về VPC, Public subnet, Private subnet, Internet GateWay và NAT GateWay. <br>
Chi tiết các bạn có thể xem lại link bên dưới:<br>
https://viblo.asia/p/basic-amazon-web-services-p2-bWrZnwnYlxw<br><br>
Tiếp theo phần 2, hôm nay mình viết thêm phần 3.<br>
Nội dung: ACL (Access control lis), SG (Sercurity Group), Instance EC2.<br>
mô hình vẫn follow ở Phần 2 <br><br>
![](https://images.viblo.asia/d62e2a1e-ce2e-431c-8603-56100ba37505.jpg) <br>
Ở phần 2, sau khi mình tạo VPC, Public subnet, Private subnet, Internet GateWay và NAT GateWay.
Bây giờ mình tiến hành Tạo ACL và SG nhé.
### 1. Khái niệm về ACL và SG ?
Network access control lists (ACLs) <br>
Hoạt động giống như một tường lửa cho subnet, điều khiển lưu lượng truy cập ra vào mạng ở mức subnet <br>
Có thể hiểu đơn giản, nó giống như ACL của router ở trên công ty vậy. <br> <br>
Security groups ? <br> 
Hoạt động giống như một tường lửa cho EC2 Instances, điều khiển lưu lượng truy cập ra vào mạng ở mức EC2 instance.  <br>
Có thể hiểu đơn giản, nó giống như firewall ở trên windows vậy <br> <br>
Sự khác nhau: <br>
ACL: <br>
+ Quản lý lưu lượng vào ra ở mức Subnet, <br>
+ Hỗ trợ cả Allow Rule (Cho phép) và Deny Rule (Từ chối), <br>
+ AWS xử lý các rule theo thứ tự số khi quyết định có cho phép lưu lượng truy cập,<br>
+ Tự động áp dụng cho tất cả các instance trong subnet được liên kết với (do đó, bạn không phải dựa vào người dùng để chỉ định security group)<br>
 
SG: <br> 
+ Quản lý lưu lượng vào ra ở mức Instance	<br>
+ Chỉ hỗ trợ Allow Rule (Cho phép)	<br>

### 2. Tạo ACLs <br>
Tại thanh tìm kiếm, ta search từ khoá VPC. <br> <br>
![](https://images.viblo.asia/47f50699-5db8-4e79-902f-6f6f5ef26b22.png)<br> <br>
Trong mục Security, ta lựa chọn Network ACLs <br> <br>
![](https://images.viblo.asia/329b6737-cf50-44eb-9920-2e1555c880e5.png) <br> <br>
Tiến hành đặt tên và gán vào VPC ( VPC đã tạo ở Phần 2 rồi nhé ) <br>
https://viblo.asia/p/basic-amazon-web-services-p2-bWrZnwnYlxw <br> <br>
![](https://images.viblo.asia/f7d2a89a-b593-4845-916c-8cab5482ca2a.png) <br> <br>
Sau khi tạo xong, ta Edit lại rules cho phù hợp. <br> 
Default khi tạo mới một ACLs, tất cả các rules sẽ bị deny. <br>
<br>
![](https://images.viblo.asia/32dabfe8-a032-41c2-8af0-b12669e38f93.png) <br> <br>
à, để hiểu hơn về cách thức đặt rule.  <br>
Inbound: ở ngoài internet truy cập vào.<br>
Outbound: đứng ở EC2 đi ra. <br><br>
Ở ngoài internet vào - chúng ta muốn mở port nào thì ta mở.<br>
Sau khi mở trên ACL thì mở thêm ở SG nữa nhé<br>
ví dụ: ở ngoài ta muốn ssh vào ec2, thì tất nhiên phần inbound ta phải mở port 22 rồi <br>
Trong trường hợp này, mình sẽ mở một số port cần thiết để chạy Frontend như là: 80/443, 22 (Port này để ssh đến) <br><br>
![](https://images.viblo.asia/8271c983-60f3-4e93-afa8-52680dee521f.png)<br> <br>
Phía trên là phần set inboud rules, tiếp đến ta set thêm phần outbound nữa mới OK nhé <br><br>
Trong phần outbound rules có thêm 1 rules mở port từ  32768 - 65535, đây là Ephemeral Ports.<br>
ví dụ, mình có 1 web server, <br> 
client -> request đến -> Server <br>
Xong <br>
Server -> respone lại > client <br>
thì quá trình respone này nó sẽ đính kèm thêm Ephemeral port nữa  <br>
Có thể tham khảo hình này nhé <br> <br>
![](https://images.viblo.asia/283ccb1d-be10-4a8e-956e-d307b02cd646.png) <br><br>
Set outbount rules <br> <br> 
![](https://images.viblo.asia/5bbf3f38-6ad0-4d3e-b161-7b85a641c28e.png)<br><br>

### 3. Tạo Security Groups <br>
SG cho phép quản lí lưu lượng, rules ở mức Instance (EC2) <br>
Chính vì vậy, mình cũng phải nên set rules cho nó. <br>
Tiến hành tạo SG, <br> <br>
![](https://images.viblo.asia/bbfd3bc3-9054-4d7b-ba92-d0dda08d1577.png)<br> <br>
Đặt tên và gán vào VPC <br> <br>
![](https://images.viblo.asia/915caecf-de2a-4c68-88c0-0aa2bb0a4127.png) <br> <br>
Set inbound rules <br><br>
![](https://images.viblo.asia/8b8a17e2-f9b7-4524-9209-083ba1846bb4.png) <br> <br>
Set outbound rules <br>
![](https://images.viblo.asia/41aaf580-0f1e-4bfe-90e8-0a0f63555302.png) <br> <br>
<br>
Như vậy thông qua mục (1) và mục (2) ta đã tạo được ACLs và SG <br>
Nếu như bạn đọc cảm thấy khó hình dung thì ngẫm theo hướng này nhé <br>
từ internet đi vào thì sẽ đi qua ACLs trước  sau đó đến SG và đến EC2 <br><br>
Internet -> ACLs -> SG -> EC2 <br><br>
Như vậy, nếu ta mở port 22 để connect vào ec2 chẳng hạn, thì ta phải mở trên ACLs và trên SG luôn đúng không <br>
Nếu mở ACLs mà không mở SG thì đâu đến được ec2 và ngược lại <br>
Còn phần outboud (từ ec2 đi ra ngoài internet), đi ra thì SG cứ mở all cho nó đi thoải mái. <br> <br>

### 4. Tạo Instance (EC2) <br>
Khái niệm: Nói một cách đơn giản thì Amazon Elastic Computer Cloud (Amazon EC2) hay còn gọi là Instance (Virtual Server) <br>
-> Nó là một Cloud server, một Vitual Machine ... <br>
-> Cũng giống như chúng ta dùng windows trên máy thì bây giờ mình connect vào môi trường cloud mình dùng thôi <br> <br>
Tiến hành tạo 1 con EC2 <br>
Tại thanh tìm kiếm, ta search EC2 <br><br>
![](https://images.viblo.asia/2195f6ac-1f63-4e7c-b160-6e09016a66b1.png) <br> <br>
Lựa chọn instance -> Lauch Instance <br>
![](https://images.viblo.asia/355d8ab1-2a76-4763-975c-8af5336a234c.png) <br> <br>
Lưu ý, trong khi làm lab thì ta chọn loại có chữ : "Free tier eligible", loại này AWS free cho chúng ta dùng trong khoảng 750 giờ <br><br>
![](https://images.viblo.asia/d0f7705e-d5d7-43ba-961f-44be6eea5ea1.png) <br> <br>
Lựa chọn type của Instance, loại mình đang chọn là t2.micro <br>
Cách lựa chọn type theo nhu cầu thì các bạn có thể xem như bên dưới: <br>
ví dụ: <br> 
dòng t thì thường dùng cho test, <br>
dòng a thì genera, nó cân giữa RAM và CPU <br>
dòng m, dòng r thì dùng cho máy sử dụng nhiều memory <br>
dòng c thì dùng cho máy sử dụng CPU nhiều <br>
dòng hs, dòng i thì dùng cho lưu trữ nhiều <br>
... <br>
Các bạn search để tìm hiểu thêm nhé: <br>
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html <br>
https://aws.amazon.com/ec2/instance-types/ <br>
<br> 
![](https://images.viblo.asia/a439cce2-e553-43b6-863c-41500506636d.PNG) <br><br>
lựa chọn type rồi next <br> <br>
![](https://images.viblo.asia/5631652d-bf19-458e-86c7-59bf918296a5.png) <br> <br>
Tại mục network, ta lựa chọn private subnet ( đã tạo ở phần 2) <br>
https://viblo.asia/p/basic-amazon-web-services-p2-bWrZnwnYlxw <br>
<br>
Step 5, add tags - phần này có thể tag hoặc không cũng được. <br>
Ví dụ mình để key = Name <br>
Tag = lab-architect-subnet-private <br>
Thì sau khi tạo xong ec2, mình check sẽ thấy name ec2 là: lab-architect-subnet-private <br><br>
![](https://images.viblo.asia/bbefbb7e-b1ee-4462-a122-f34ba206c269.png) <br><br>
Tiếp đến là lựa chọn Security Group (SG) <br> <br>
![](https://images.viblo.asia/aa006276-db74-4c72-a395-66acaa92337f.png)<br><br>
Review lại rules, các thông tin cần thiết -> LAUCH <br><br>
![](https://images.viblo.asia/b1875d26-fc39-40de-82fe-7c50f14c7e3a.png) <br><br>
Tạo key để ssh từ client đến server ec2 <br><br>
![](https://images.viblo.asia/df7591ce-d397-493e-a851-437968804515.png) <br><br>
Kết quả thành công ta sẽ thấy như thế này <br>
Chúng ta thấy rằng IP ở EC2 này là private IP nhé, vì ban nãy ta đã chọn private subnet <br><br>
![](https://images.viblo.asia/c9badd7b-a34f-4782-9f76-5a1bea3aa4b1.png) <br><br>
<br>
Tương tự các bước trên, ta cũng tiến hành tạo 1 EC2 có public subnet <br><br>
![](https://images.viblo.asia/c9852cfb-aa93-4643-bcde-a4f593d7665a.png) <br><br>
Kết quả: <br> <br>
![](https://images.viblo.asia/fddaf963-1ea3-4834-b467-9198dcf1422e.png) <br><br>
So sánh với private subnet <br>
![](https://images.viblo.asia/a84250c9-d48d-4e7e-8b06-e72925ac24fb.png) <br> <br>
Test KQ: <br>
Đứng từ phía client, ta sẽ ssh đến server EC2 ( Server dùng public subnet) <br><br>
![](https://images.viblo.asia/395de296-c778-481f-8f66-fe9c06edc4c4.PNG) <br><br>
Từ con server EC2 (public subnet), ta tiến hành ssh sang Server EC2 (private subnet) <br><br>
![](https://images.viblo.asia/48d905c1-5719-45ed-a137-ccb0a71754e0.png) <br><br>
Kết quả OK <br><br>

Vâng, thì bài viết của mình đến đây là kết thúc rồi.<br>
Trong phần tiếp theo, phần 4 mình sẽ viết về Load Blancing <br>
https://viblo.asia/p/basic-amazon-web-services-p4-maGK7Vge5j2 <br>
Bài viết mình cũng còn khá sơ sài và basic, bạn đọc thấy phần nào không ổn thì comment trao đổi để tốt hơn nhé..<br>
Thank you !<br>
<br>
Nguồn tham khảo:<br>
https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html <br>
https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html <br>
https://aws.amazon.com/ec2/instance-types/ <br>
https://vinasupport.com/tim-hieu-ve-network-acls-layer-bao-mat-vpc/ <br>