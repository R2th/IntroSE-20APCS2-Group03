# Lời nói đầu
Gần đây mình mới có cơ hội được tham gia vào một khóa học về networking cơ bản rất thú vị . Nó cho mình các kiến thức nền tảng về Networking để mình hiểu hơn về hệ thống mạng . Mình đã có một bài viết chia sẻ về Networking cơ bản . Ngày hôm nay mình xin được viết thêm về 1 bài viết khác về AWS Networking cơ bản . Đây là những kiến thức mình muốn chia sẻ với mọi người  và cũng coi như một lần mình note ra để nhớ lại bài học . Và các kiến thức mình tiếp thu được trong bài thì nó không toàn diện và có thể sai sót vì đây là những kiến thức hạn hẹp của mình . Nếu có gì thiếu sót mong mọi người comment và cho mình biết . Mình rất hy vọng nó có ích cho ai đó . Cám ơn các bạn rất nhiều ! Nào mình cùng bắt đầu nhé ! :D :D

 [Basic Networking !](https://viblo.asia/p/basic-networking-1VgZvVxMZAw) 
 
  [AWS Basic Networking Structure!](#) 
# Nội dung
![](https://images.viblo.asia/efb60fe1-785a-47c8-ab3f-56e6d6be3477.png)

Hình bên trên là một kiến trúc cơ bản của của một mạng AWS . Trong khuôn khổ nội dung bài viết này mình sẽ chỉ đề cập đến các khái niệm và miêu tả chức năng của nó theo một cách dễ hiểu nhất theo một bài toán cụ thể nhé .

**Bài Toán Chung:**

- Bạn có 1 website được build trên EC2 của AWS và đã lauch thành công
- User A quyết định vào website của bạn
- Bỏ qua các vấn đề Network về mạng của User A và mạng thế giới . Chúng ta sẽ chỉ quan tâm khi request của User  A đến AWS  và cùng tìm hiểu xem Network AWS làm việc như thế nào ! 

> Nếu các bạn ban tâm đến cách hoạt động của Network User A và thế giới khi User A gửi request. Hãy click vào [đây](https://viblo.asia/p/basic-networking-1VgZvVxMZAw) để tìm hiểu cụ thể nhé.

## Internet Gateway (IG)
Tên gọi của nó đã biểu thị tất cả . Chúng ta có lẽ đã không còn gì phải nói cụ thể và chi tiết quá mức về nó . 

Hiểu đơn giản với **Bài Toán Chung** thì  `IG` là nơi đầu tiên mà request của chúng ta đi vào từ Internet , thông qua đây request sẽ đi tới `VPC` để thực hiện tiếp công việc.

## Amazon Virtual Private Cloud (VPC)
Đúng như cái tên của nó, VPC thực chất là một mạng máy ảo , nơi mà bạn toàn quyền quyết định xem bạn muốn làm gì và config theo tùy ý bạn trên mạng máy ảo đó.

Hiểu một cách ngắn gọn, với VPC, AWS cung cấp cho bạn một hệ thống mạng máy tính của riêng bạn trên AWS và việc của bạn là setup dự án của bạn ở trên đó. VPC bao gồm rất nhiều phần mình sẽ đưa ra 1 vài thành phần cơ bản cụ thể như sau:

- Route table
- Subnet
- Network Access Control Lists
- NAT
- Elastic IP
- Internet GateWay
- Sercurity Group

Quay trở lại **Bài Toán Chung**,  request của User A sẽ tới VPC , từ đây VPC sẽ thông qua các bảng chỉ dẫn `route table` để đọc xem request của User A  sẽ đi tới đâu tiếp.

## Route Table

`Route Table` là một bảng chỉ dẫn nơi mà bạn chỉ rõ ra rằng , khi request nào được đi từ đâu đến đâu . 
Nói thì có vẻ khá trưu tượng bạn có thể hiểu đơn giản như sau , request của user A đi từ `IG` vào, và việc hiện tại của `VPC` là phải đọc xem request từ `IG` vào thì sẽ phải đi tới `subnet` nào 

> Hiểu đơn giản, `Route Table` có trách nhiệm làm bảng chỉ đường cho các request vào ra cho VPC


## Network Access Control Lists (NACL)

Trươc khi request A được đi vào Subnet , nó sẽ cần phải đối mặt với `NACL` (đọc thuận mồm cứ như muối Nacl ấy nhỉ :D )

Nó là một lớp bảo mật cho VPC, thực hiện như một firewall điều khiển lưu lượng vào và ra của một hay nhiều subnet (`NACL` nằm trong VPC,  ngoài Subnet và chỉ apply cho `Subnet`).

Ở đây mình sẽ nói 1 cách tổng quan về cách mà lớp firewall này hoat động nhé . Về cơ bản, khi sử dụng `NACL` bạn sẽ cần quan tâm đến 2 rule :

![](https://images.viblo.asia/e3ec1123-33de-496b-9939-98ef7d7caae4.png)
- `Inbound`  : Rule này sẽ quyết định xem các gói tin dạng nào từ Internet --> Subnet . Như ví dụ trong hình vẽ, thì 3 request HTTP, SSH, Custom TCP sẽ được chấp thuận đi từ ngoài vào Subnet. Còn lại thì các request dạng khác sẽ bị từ chối . 

![](https://images.viblo.asia/ab87bbd9-625b-40b3-90dc-f3d3c011b629.png)
-  `Outbound`: Rule này sẽ quyết định xem các gói tin dạng nào từ Subnet --> Internet . Như ví dụ trong hình vẽ, thì 3 request HTTP, Custom TCP sẽ được chấp thuận đi từ Subnet ra ngoài . Còn lại thì các request dạng khác sẽ bị từ chối . 

Nên nhớ rằng AWS sẽ hoạt động từ trên xuống theo `Rule Number` nên tất cả các request sẽ nhận kết quả Allow / Deny phụ thuộc vào rule có  `Rule Number` nhỏ nhất thỏa mãn điều kiện

> Note 1 
> 
> Nên nhớ rằng 1 request sẽ luôn có 2 chiều của nó ,  request thì cần phải reponse trả về nên với `NACL` bạn cần config `Inbound` vs `Outbound` ra sao để request có thể thông qua được. 


> Note 2
> 
> Đôi khi cũng có lúc có request gửi từ bên trong Subnet ra ngoài mạng. Lúc này, tác dụng của `Inbound` vs `Outbound` đổi ngược cho nhau . Bạn nên chú ý và setup sao cho đúng nhé .


Quay trở lại **Bài Toán Chung**,  request của User A là giao thức HTTP cổng 80 nên sẽ được thông qua `Inbound` của `NACL` và vào `Subnet`.

Và vì là `Outbound` của `NACL` đã setup Custom TCP 32768-65525 rồi nên nó cũng sẽ ra được bình thường.

## Subnet

Subnet là sự chia nhỏ một mạng to thành các mạng con. Kiểm soát các mạng con thì dễ dàng hơn so với một mạng to. 

Subnet thì thường chia ra làm 2 loại:

- Public Subnet : Các request đi qua IG có thể vào đây
- Private Subnet : Chỉ các request trong VPN mới có thể đi vào

Như vậy, có thể hiểu đơn giản `Public` và `Private` subnet chỉ khác nhau ở chỗ duy nhất , thăng nào được gắn IG là public còn thằng nào không thì là private

Quay trở lại **Bài Toán Chung**,  request của User A sẽ từ VPC sẽ được điều chuyển đến `public subnet`, từ đây request sẽ được đưa vào từng Instance cụ thể (Trong bài viết này vào Http thì sẽ là EC2)

##  Sercurity Group (SG)

Trươc khi request A được đi vào Instance EC2 , nó sẽ cần phải đối mặt với 1 lớp firewall khác là `SG`. 

`SG` nằm trong subnet và nó chỉ được apply cho các Instance bên trong Subnet mà thôi.

Khá giôngs `NACL` cách làm việc của `SG` cũng có `Inbound` và `Outbound` , tuy nhiên cơ chế hoạt động của thằng này có 1 chút khác biệt. Cùng xem nhé :

![](https://images.viblo.asia/397dd4ac-a780-4c8b-8206-6679e95bb64b.png)

- Inbound: Quy đinh các request phù hợp được đi từ ngoài vào instance . Trong ví dụ thì Chỉ các request HTTP và SSH là đươc thông qua `SG` còn lại thì không

![](https://images.viblo.asia/5f6ef6a7-a78d-45cf-95e5-af982bd884c2.png)

- Outbound: Quy đinh các request phù hợp được đi từ trong Instance ra ngoài . Trong ví dụ thì Chỉ các request HTTP là đươc thông qua `SG` còn lại thì không


> Note :
> 
> Khác với `NACL`, `SG` chỉ có tính 1 chiều . Điều này có nghĩa răng, request nếu đi từ ngoài vào và thông  qua được Inbound thì chắc chắn sẽ ra ngoài được (Không phụ thuộc vào Outbound)
>  Outbound chỉ có giá trị khi các request là đi từ Instance ra ngoài mạng thôi nhé 

Quay trở lại **Bài Toán Chung**,  request của User A sẽ từ  `public subnet` và sẽ thông qua Inbound được vì là đi qua HTTP cổng 80 . Request hiện tại đã đến Instance và như đã nói ở trên , response từ instance sẽ thông qua được cả `SG`, `NACL` và qua `VPC` `IG` và trả về máy A

Như vậy máy A đã thành công trong việc gửi request và nhận reponse từ AWS về :D

##  So sánh NACL và SG


| Tiêu chí | NACL | SG |
| -------- | -------- | -------- |
| Đối tượng Áp dụng     | Subnet | Instance (EC2, S3, RDS)     |
| Tinh 2 chiều    | Yes | No    |
| Filter    | Có support cả 2 quyển Deny và Allow | Chỉ support Allow     |

## NAT Gateway và Elastic IP

Như các mình đã nói bên trên , only `public subnet` mới gắn `IG` để connect với ngoài môi trương internet . Thế nếu `private subnet`  muốn ra ngoài internet thì sao . (Server CronJob trong  `private subnet` cần chạy composer chẳng hạn ) Thì chúng ta cần làm thế nào.

NAT gateway cho phép bạn làm điều này. Bạn cần config NAT cho `private subnet` đông thời khai báo `router table` cho NAT này. Tuy nhiên, đến đây là phát sinh thêm bài toán .  `private subnet` đi ra ngoài môi trường thì IP định danh sẽ là gì ? Vì thế `Elastic IP` ra đời để xác định IP cho NAT nhé . Vậy là OK.

> Nếu các bạn dùng Free Tier như mình ở AWS thì cần nhớ răng `NAT Gateway` và `Elastic IP` nó sẽ ko được miễn phí ở gói `Free Tier` nên test xong thì nhớ xóa đi không tốn tiền đấy . 

# Lời kết

Cám ơn các bạn đã đọc đến tận lúc này , đây là kiến thức mình đúc rút ra được sau bài học . Nếu có gì sai sót mong mọi người góp ý thêm nhé .

Thank you very much !