Hôm nay mình sẽ tiếp tục trình bày với các bạn Phần 4 - bài viết về AWS cơ bản giành cho người mới bắt đầu. <br>
Trong phần 3, mình đã hướng dẫn các bạn: ACL, SG, EC2<br>
Chi tiết các bạn có thể xem lại link bên dưới: <br>
https://viblo.asia/p/basic-amazon-web-services-p3-maGK7429Zj2 <br>
Tiếp theo phần 3, hôm nay mình viết thêm phần 4. <br> 
Nội dung: Load Blancing AWS ( có thể gọi tắt bằng ELB hoặc LB )  <br>
## 1. Khái niệm cơ bản về Load blancing. <br>
Load blancing là khái niệm về cân bằng tải, cân bằng tải hệ thống, network, web,.. Hiểu đơn giản là để chia tải cho hệ thống mình cho nó nhẹ nhàng, có dự phòng và trơn tu hơn <br>
Ví dụ 
chúng ta có 1 website, chúng ta để ở trên 2 server, nguời dùng truy cập đông thì nó chia đều lượt truy cập theo tỷ lệ 1:1,<br>
trường hợp 1 con server chết - thì vẫn còn 1 con để chạy. <br>
Trong AWS, <br>
ELB: Elastic Loadblancing - đây là tên gọi chung nhé <br> 
ELB chia thành 3 nhánh nữa: ALB, NLB, CLB <br>
'+ ALB (Application Loadblancing) <br>
'+ NLB (Network Loadblancing) <br>
'+ CLB (Classic Loadblancing) <br>
<br> 
So sánh đơn giản về sự khác nhau 3 LB này: <br>
ALB: (Application Loadblancing):  Trong mô hình OSI, nó nằm ở layer 7  <br> 
 '-> Tức là tầng Application, hỗ trợ tốt về HTTP/HTTPS, Config SSL, không hỗ trợ Elastic IP  <br>
NLB: (Network Loadblancing) : Trong mô hình OSI, nó nằm ở layer 4 <br>
' -> Tức là tầng Transport, , hỗ trợ tốt về TCP/UDP, Config SSL cũng được, hỗ trợ Elastic IP (EIP) <br>
CLB: (Classic Loadblancing): Đây là LB cổ điển, AWS thay thế nó bằng ALB, <br>
'-> nó không hỗ trợ tốt về một số điểm như là: LB multiple port trên cùng Interface, không hỗ trợ config target bằng IP, không hỗ trợ Web socket. <br>
![](https://images.viblo.asia/c86ea0ee-e4f9-41df-8022-476079abc835.png) <br><br>
Các bạn tham khảo thêm ở đây <br>
https://aws.amazon.com/elasticloadbalancing/features/?nc=sn&loc=2 <br>
<br>

## 2. Demo về NLB  (Network Loadblancing) <br>
'-  Mình tiến hành demo về NLB (Network Loadblancing) trước luôn nhé. <br>
Mô hình NLB các bạn có thể nhìn vào hình bên dưới để dể hình dung,  <br><br>
![](https://images.viblo.asia/bb44bd7b-4aee-45bb-8833-e245fda02dc8.PNG) <br><br>
### 2.1 Chuẩn bị môi trường.
Để làm thì các bạn build sẳn: VPC, ACL, SG, 2 con EC2 (Đã cài webserver - Nginx hoặc Apache..). <br>
'-> phần này ở trong phần 2,3 mình đã hướng dẫn rồi đấy <br>
Vậy là chúng ta có sẳn 2 con EC2 rồi: <br><br>
![](https://images.viblo.asia/18265daa-a4d4-4fa5-a289-a95bb7d035af.PNG) <br><br>
### 2.2 Làm việc với NLB
Trong mục tìm kiếm, ta search từ khóa ec2, sau đó nhìn bên tay trái có mục LOAD BLANCING. <br>
Load Blancer -> Create Load Blancer. <br><br>
![](https://images.viblo.asia/e567a098-b3ae-4ec8-a1d2-f190ab475c57.png) <br><br>
Lựa chọn option là NLB nhé. <br><br>
![](https://images.viblo.asia/3745fb6b-efa7-4d6f-84aa-305e18a49496.png)<br><br>
Name: Đặt tên phù hợp<br>
Scheme: <br>
'+ Lựa chọn internet-facing (Cho phép request từ bên ngoài internet vào NLB  -> đến target)<br>
'+ Lựa chọn internal (Chỉ cho phép request từ bên trong ( IP private) vào NLB  -> đến target.) <br>
Trong mục Protocol, mặc định thì nó sẽ listen TCP traffic từ port 80,  <br> 
chúng ta cũng có thể chuyển sang TLS để dùng port 443 hoặc UDP (53) <br><br>
![](https://images.viblo.asia/c9da4954-2067-47fa-83ae-21350955e511.png)<br><br>
Tiếp đến, lựa chọn LB cho các AZ. Vì ban đầu mình tạo 2 con ec2 ở trên 2 AZ khác nhau nên ở đây mình chọn 2 nhé. <br>
Có 1 điểm đặc biệt, thì đối với NLB mình có thể chọn IPv4 Asssign là EIP nhé. Ở ALB thì không có chức năng này. <br><br>
![](https://images.viblo.asia/5b953fc6-56c9-4199-bfd9-f0c4f6e6b71c.png) <br> <br>
Trong phần Target group, ta lựa chọn instance . <br><br>
![](https://images.viblo.asia/6a657490-ce33-4001-96e3-3017ff0c6773.png) <br><br>
Lựa chọn instance xong thì nhớ add registered nhá <br><br>
![](https://images.viblo.asia/7fecc0b4-12dc-4d8a-87a4-83d949513450.PNG) <br> <br>
Review lại tổng thể <br><br>
![](https://images.viblo.asia/cdfdc43d-df45-4d18-bbfd-0db3ce7fc911.PNG) <br> <br>
Sau khi hoàn tất, vào lại Load Blancer, kiểm tra lại phần DNS Name. <br><br>
![](https://images.viblo.asia/f01566d8-3d72-45dc-ac2c-12369b8a69d6.png) <br> <br>
Trong phần target group, kiểm tra phần status: healthy nhé. <br><br>
![](https://images.viblo.asia/4041263f-6786-4c46-b06e-b68a25e1ccac.png) <br>
Như vậy là hoàn thành config NLB rồi đấy, tùy theo mô hình mà mình chỉnh lại cho phù hợp thôi. <br>
Cùng check KQ nhé <br>
### 2.3 Test kết quả NLB.
Truy cập vào server linux bất kì để test cũng được, vì ELB trên đã public ra ngoài <br>
Chạy client như hình bên dưới <br>
```
while true;
do;
wget "dns của NLB"
done;
``` 

![](https://images.viblo.asia/e58d9899-661c-479f-acf6-cb96f8952cf6.PNG) <br><br>
Chúng ta thấy nó load đều 2 con EC2 là được <br><br>
![](https://images.viblo.asia/87d4519f-c6d5-434b-b0b4-851248593ed9.png) <br><br>
Hoặc đơn giản hơn <br>
Chúng ta lấy DNS của NLB ở phía trên để truy cập bằng chrome <br>
Sau mỗi lần F5 là mình thấy nội dung web đều trỏ đều cho 2 EC2 này <br><br>
![](https://images.viblo.asia/29ee562f-0405-4e7e-8193-3ac36dde7834.png) <br> <br>

## 3. Demo về ALB (Application LoadBlancing) <br>
Cách config ALB cũng tương tượng như NLB thôi, nhưng có một vài điểm khác như bên dưới: <br>
Ta lựa chọn ALB, sau đó đặt tên các kiểu <br><br>
![](https://images.viblo.asia/53c6c837-f10d-4a5f-b0de-ea23f12c740d.PNG)<br><br>
Trong phần lựa chọn AZ này nè, ta thấy nó khác ALB là không chọn được EIP. <br><br>
![](https://images.viblo.asia/72a0ffc4-a9e8-40bb-98b3-c81e4b36c624.png) <br>
Phần khác tiếp theo đó là về protocol,<br>
ở ALB nó dùng TCP, TLS, UDP, thì bên này chuyên cho http/https <br><br>
![](https://images.viblo.asia/bf44b1d2-48b7-4f52-93eb-281d724f27cb.png)<br><br>
Cũng tiến hành add registered <br><br>
![](https://images.viblo.asia/9fcd9b7b-44a1-4301-9af1-a9713c03ac26.PNG) <br><br>
Sau khi hoàn thành nếu mục healthy có bị fail thì ta kiểm tra lại trong ec2 nhé <br> <br>
![](https://images.viblo.asia/265be050-2aef-4d1b-8aa2-3e065be4b59c.png) <br><br>
Heal check của ALB là nó default sẽ ping vào file index trong đường dẫn /var/www/html. <br>
nếu không có thì sẽ không check được. <br>
Kiểm tra xem có không, nếu không có thì ta thêm vào <br><br>
![](https://images.viblo.asia/203aaa5a-eb23-40fe-b6d9-ed9c17c219f8.PNG) <br><br>
### 3.1 Test kết quả ALB.
Kết quả thành công, ta cũng dùng trình duyệt truy cập bằng dns của ALB cho khỏe, test cho nhanh gọn <br><br>
![](https://images.viblo.asia/19aadd68-cb3e-4f71-89fb-e40aa8d6c059.png) <br><br>
Còn không thì mình sử dụng tool cURL để check <br><br>
![](https://images.viblo.asia/fed23a97-c0fc-4bac-9773-88ee5ff67a18.PNG) <br><br>
<br>
### 3.2 Các tham số basic trong Heathcheck.
Có một số tham số trong heath check các bạn để ý nhá <br>
![](https://images.viblo.asia/484973b7-26c1-4fa5-8e73-c001c26499ad.png) <br> <br>
heath check  thì nó sẽ check server, services có chạy OK không ?<br>
        Các tham số để check thường sẽ có mấy thông số sau:<br>
>              +  Ping Protocol (tcp,http,https,ssl), default là http
>               +  Ping Port ( 1 đến 65535), default ping port 80
>               +  Ping path: default - check dựa vào file index.html
>               +  Response Time Out: Valid values từ 2 đến 60, default là 5 giây
>               +  Heath check interval: thời gian giữa các lần check, từ 5 đến 300, default là 30 
>                  -> Nghĩa là cứ 30s hệ thông check 1 lần.
>               +  Unhealthy Threshold: Số lần kiểm tra thất bại trước khi thông báo, từ 2 đến 10 lần, default là 2 
>                   -> Nghĩa là cứ sau 2 lần check mà fail thì sẽ thông báo.
>               +  Healthy Threshold: Số lần kiểm tra tình trạng server OK, từ 2 đến 10 lần, default là 10 
>                   -> Nghĩa là cứ sau 10 lần check liên tiếp OK, thì thông báo OK.
>               +  Connection Draining: (default 300s) :
>                   -> ví dụ có 3 EC2, 1 EC2 bị xoá ... thì trước khi xoá, ELB sẽ move lần lượt các connection sang 2 EC2 khác. 
>                   -> mặc định khoảng 300s move xong.
### 3.3 Phân biệt listen port, forward port. <br>
Phân biệt listen port, forward port,  heathcheck trong ELB. <br>
 '- Listen port là listen từ ngoài vào ELB.  <br>
 '- Forward port là forward từ ELB đến EC2. <br> 
 '- Heathcheck nó có thể dùng port của forward để check status trong EC2 luôn. <br>
<br>
Vâng, thì bài viết của mình đến đây là kết thúc rồi. <br>
Trong phần tiếp theo, phần 5 mình sẽ viết về Auto Scale  <br> 
Bài viết mình cũng còn khá sơ sài và basic, bạn đọc thấy phần nào không ổn thì comment trao đổi để tốt hơn nhé.. <br>
Thank you ! <br><br>

Nguồn tham khảo: <br>
https://linuxacademy.com/cp/modules/view/id/161<br>
https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-network-load-balancer.html<br>
https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html<br>
https://cuongquach.com/cau-hinh-public-aws-application-load-balancer-cho-web.html<br>
https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-healthchecks.html <br>