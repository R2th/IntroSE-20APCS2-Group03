![image.png](https://images.viblo.asia/88177324-d8a1-4fb3-be1b-1e0eed1acb6d.png)
Khi mới làm quen về việc xây dựng network security cho hệ thống aws, bạn có thể sẽ có nhiều thắc mắc về sự khác nhau giữa Network ACLs và Security Group, trong khi đặc điểm của chúng đều tương tự như 1 dạng firewall, ngăn chặn các truy cập trái phép từ internet. Dưới đây mình sẽ tổng hợp lại một số sự khác nhau cơ bản của 2 đối tượng này như sau. 

## Phạm vi sử dụng
Security Group được gắn với một EC2 instance còn Network ACLs được gắn với một subnet.
Network ACLs được áp dụng ở tầng subnet, vì vậy bất kể instance nào nằm trong subnet cũng đều phải tuân theo các quy tắc của Network ACLs. Khác với Security group, chúng phải được gắn chỉ định vào một instance cụ thể. Điều này có nghĩa rằng tất cả instance trong subnet được áp dụng Network ACLs rule tự động, còn đối với Security Group bạn sẽ phải gắn vào từng EC2 instance một cách thủ công.

## Statefull và Stateless
Security group là stateful, những gì thay đổi ở inbound rule cũng sẽ tự động được áp dụng cho outbound rule. 

VD: Nếu bạn set inbound rule cho port 80, nó cũng sẽ tự động open port 80 ở outbound rule.

Network ACLs là stateless, ngược lại với security group, những thay đổi ở inbound rule sẽ ko được áp dụng tự động cho outbound rule, thay vào đó ta phải cài đặt thủ công.

## Rules: Allow or Deny
Security group chỉ hỗ trợ Allow rule (mặc định những thứ nằm ngoài setting sẽ bị block) và bạn không thể chặn chỉ định 1 địa chỉ IP bất kỳ.

Network ACLs hỗ trợ cả allow và deny rule. Với deny rule bạn có thể chặn một địa chỉ IP bất kỳ truy cập đến EC2 instance của bạn.

## Rule process order
Toàn bộ rule trong một security group được áp dụng với cấp độ ngang hàng nhau. Còn đối với Network ACLs các quy tắc được áp dụng theo thứ tự của chúng (từ thấp đến cao)

## Thứ tự phòng thủ
Network ACLs sẽ là chốt chặn đầu tiên đối với inbound traffict, tiếp đó là tới Security Group.
Còn đối với outbound traffict thì sẽ qua Security group trước rồi mới tới Network ACLs.

## Số lượng
Subnet chỉ có thể gắn với một Network ACLs, trong khi đó EC2 Instance có thể có nhiều Security Group.

Bài viết tham khảo:
https://medium.com/awesome-cloud/aws-difference-between-security-groups-and-network-acls-adc632ea29ae