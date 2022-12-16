Mới đầu làm quen với AWS EC2 thì chúng ta thường tập trung vào việc làm thế nào để sử dụng EC2, làm thế nào để có thể deploy ứng dụng web lên đó và thêm một số config cho ứng dụng của chúng ta chạy được. Cơ bản thì mọi người đã tự build cho mình một EC2 có thể chạy được nhưng để nó có thể hoạt động an toàn ở trên Cloud thì thực sự là chưa, nếu chỉ dừng lại ở những việc trên thì EC2 của bạn không khác gì ngồi nhà vàng giữa làng trộm vậy đó :):). Vậy thì làm thế nào để tăng tính bảo mật cho instance hay nói cách khác là làm thế nào để tăng độ khó game cho những hacker. 

AWS cũng cấp cho chúng ta nhiều service và cũng có nhiều cách để chúng ta tăng tính bảo mật cho instance như dùng security group, access control list, bastion,.... Ở phạm vi bài viết này mình sẽ giới thiệu với mn 2 tính năng do AWS cung cấp đó Security Group(SG) và Network Access Control Lists nhé.

![](https://images.viblo.asia/2c6cf8f7-4ecd-4f84-af55-cdc30e1df77e.jpg)

### Security Group - SG
- Security group giống như một tường lửa ảo bao quanh instance của mình, nó kiểm soát các luồng dữ liệu đi vào(inbound) và đi ra(outbound) instance( EC2).
- Khi khởi tạo EC2 mọi người có thể chọn maximum 5 SG cho mỗi EC2. Trường hợp không chỉ định SG nào khi khởi tạo EC2 thì sẽ được gán vào SG default. SG default cho phép tất cả các traffic vào và ra EC2.
- Để kiểm soát được các lưu lượng vào và ra EC2 thì chúng ta sử dụng **Rule** để cấp phép cho ai được vào cổng nào và ra cổng nào.
- Một số điểm về SG:
    - SG chỉ có **Rule** cho phép(allow) chứ không có **Rule** không cho phép(deny)
    - Nếu một traffic được cho phép đi vào(có nghĩa là ở inbound của SG mọi người có set Rule cho phép traffic này đi qua) thì chắc chắn được đi ra và không quan tâm đến ở Outbound bạn đã set những Rule gì. Bởi vì rule ở Outbound chỉ áp dụng khi chúng ta đi từ EC2 ra ngoài Internet chứ không phải response của EC2 cho Internet. Và đây là điểm mà mọi người dễ nhầm lẫn nhất khi làm việc với SG. Ví dụ ở phía dưới Inbound mình đang cho phép từ Internet đi vào qua cổng 80 và giao thức TCP nhưng ở Outbound mình không set rule cho phép nào cả nhưng ở Internet mình vẫn có thể telnet đến EC2 qua port 80.
    
    ![](https://images.viblo.asia/86b6dda7-2b0e-4605-aa31-df43b07173ff.png)

    ![](https://images.viblo.asia/19a35348-2ce2-4e8c-82bb-6ddb2b80a55e.png)
 
    -  SG chỉ được dùng trong VPC chỉ định khi tạo SG.
### Network Access Control List - ACL
- Cũng giống như SG, ACl cũng được xem như tường lửa nhưng ở phạm vi rộng hơn, nó kiểm soát các traffic vào và ra ở level subnet.
- Một số đặc điểm của ACL:
    - Khi tạo một VPC thì mặc định sẽ được gán với ACL default, ACL default cho phép tất cả traffic inbound và outbound
    - Khi tạo mới một ACL thì mặc định sẽ chặn tất cả traffic inbound và outbound
    - ACL cũng dùng **Rule** để kiểm soát việc các traffic vào và ra. ACL có rule cho phép(allow rule) và rule không cho phép(deny rule)
    -  ACL có thể áp dụng cho nhiều subnet, và mỗi subnet chỉ có thể liên kết đến một ACL
    -  Các rule trong ACL được đánh số thứ tự(Rule#) và thứ tự ưu tiên sẽ đi từ rule# nhỏ đến lớn. VD như hình dưới mình có set 2 rule về ssh: rule#100 cho phép ssh và rule#110 mình không cho phép ssh và như mình nói ở trên thì ở đây rule#100 nhỏ hơn nên sẽ áp dụng rule này nên theo như lý thuyết thì case này mình vẫn có thể ssh vào EC2 nhé.
    ![](https://images.viblo.asia/6a4fd356-7428-499a-a788-c18f5daddffc.png)


### Ephemeral Port
![](https://images.viblo.asia/e6c99371-f131-4feb-b3a7-73391ce97c06.png)

Ephemeral Port là gì? Vì sao lại cần Ephemeral Port

- Bạn đã bao giờ đến quán cà phê mà thanh toán tiền lúc gọi nước ở quầy chưa?. Khi chúng ta chọn nước và thanh toán tiền tại quầy thì nhân viên sẽ đưa cho mình một thẻ có ghi số và sau khi nước chuẩn bị xong thì nhân viên sẽ dựa vào số ban đầu ở trên thẻ đã đưa cho mình để tìm đến đúng vị trí và giao nước cho mình. Như vậy ephemeral port cũng tương tự như cái thẻ ghi số ở trên vậy nhưng khác một tí là thay vì thẻ được cung cấp bởi nhân viên quán thì thẻ đó do chính chúng ta tạo nên.
- Nhìn hình trên mọi người sẽ thấy được khi một request từ Internet đến Server thì sẽ có 2 thông số đó là địa chỉ IP và port của điểm đầu(source) và điểm cuối(destination), thì port của điểm đầu(source) được gọi là ephemeral port.
- Mục đích của ephemeral port là để server xác định được request là của ai và đi vào từ port nào(port ở đây là port của client) để khi response thì server sẽ xác định được đúng client cần response dựa trên port ban đầu do client cung cấp.
- Ephemeral port là do client cung cấp và cũng tuỳ thuộc vào mỗi hệ điều hành thì range port này cũng khác nhau. Cụ thể thì mn có thể tham khảo ở Document của AWS nhé(https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports)
### Tổng kết

| Security Group | Access Control Lists |
| -------- | -------- |
| Giống như tường lửa cho Instance | Giống như tường lửa cho subnet |
| Chỉ hỗ trợ rule cho phép(allow) | Hỗ trợ cả cho phép(allow) và không cho phép(deny) rule
|Stateful - Các traffic được đi vào thì sẽ được đi ra | Stateless - Các traffic được đi vào và phải thoả mãn rule đi ra thì mới đi ra được |
| Có thể set tối đa 5 SG cho một Instance | Chỉ có thể set duy nhất một ACL cho một subnet |
| SG khi vừa tạo thì mặc định sẽ chặn tất cả các Inbound và cho phép all traffic Outbound | ACL khi vừa tạo thì mặc định sẽ chặn tất cả các Inbound và Outbound |
| Tất cả các rule có trong các SGs của EC2 sẽ được áp dụng  | Cách kiểm tra Rule sẽ theo thứ tự từ nhỏ đến lớn của Rule# |

### Tài liệu tham khảo
- [Aws Document - Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [Aws Document - Network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)