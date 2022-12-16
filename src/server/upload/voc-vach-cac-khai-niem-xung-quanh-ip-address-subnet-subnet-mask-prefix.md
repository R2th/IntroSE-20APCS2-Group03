*subnet, prefix, subnet mask* - các keywords không hề mới, đối với các bạn tốt nghiệp ngành IT, nhưng thường dễ quên sau một thời gian dài không đụng đến.

Mình thì mấy tuần trước có tìm hiểu về VPC - một services của AWS, thì bắt gặp một bản thiết kế bên dưới đây.

![](https://images.viblo.asia/9971f367-fa79-48c4-93ac-7b6230b3ec7a.png)

Các bạn có để ý thấy các mục ghi kiểu: *Subnet 10.0.200.0/21 (2043 IP addresses)*. 

Các bạn có thắc mắc */21* là gì? Tại sao lại là *2043 IP addresses* không? 

Nếu các bạn cũng có cùng những "trăn trở" trên thì bạn đọc đúng bài rồi đấy :D

Giả sử IP và subnet mask của bạn như sau
IP: 128.42.5.4
Subnet: 255.255.248.0

### Nhắc lại một chút về IP
Địa chỉ IP là một dãy nhị phân dài 32 bit. có dạng kiểu `10000000 00101010 00000101 00000100` Mỗi một dãy 8 bit kia gọi là *octet* 

Dãy số IP mà chúng ta hay dùng thì lại có dạng dãy số thập phân kiểu 128.42.5.4, rõ ràng là trông thập phân "dễ thở" hơn rất nhiều có phải ko :D
*Các bạn có thể dễ dàng học công thức để chuyển qua lại giữa binay <-> decimal (nhị phân <-> số thập phân)*

Để router xác định được địa chỉ IP của một thiêt bị mạng dễ dàng hơn, người ta chi mạng ra thành các network nhỏ hơn. *Hiểu nôm na, địa chỉ nhà bạn sẽ phải thuộc, một quận, quận thuộc TP, TP thuộc quốc gia. Để khi một gói tin từ Anh, gửi đến nhà bạn, lần lượt sẽ tìm đến quốc gia của bạn, rồi TP,.. rồi đến chính xác nhà bạn*

Để đáp ứng yêu cầu trên, cấu trúc IP được chia ra thành 2 phần [Phần network][Phần host] 
* Phần network chính là địa chỉ cho chính network đó
* Phần host dành để đánh cho cách thiết bị mạng ở trong network đó

Giả sử, bạn cần phải gửi một gói tin đến `128.42.5.4` , mỗi một thông tin này thì không thể xác định được network của IP này ở đâu. Vì thế ta cần thêm một thông tin là *subnet mask*.

Trong ví dụ này giả sử subnet mask là `255.255.248.0`, dãy thập phân này thực sự ra là vô nghĩa cho đến khi ta chuyển nó sang nhị phân `11111111 11111111 11111000 00000000`

Sử dụng phép AND logic giữa dãy nhị phân của *subnet mask* với địa chỉ IP (dạng nhị phân), ta sẽ được IP của network là 128.42.0.0
```
128.42.5.4      in binary: 10000000 00101010 00000101 00000100
255.255.248.0   in binary: 11111111 11111111 11111000 00000000
                           ----------------------------------- [Logical AND]
                           10000000 00101010 00000000 00000000 ------> 128.42.0.0
```
Đếm tất cả các bit 1 của *subnet mark*, ta sẽ có con số *prefix* là 21. Hiểu là 21 bit đầu đã được dùng để đánh địa chỉ cho network, vậy là ta chỉ còn `32-21=11` bit để đánh IP cho các host ở trong network đó.

### Subneting - Chia mạng con
Giả sử quản trị mạng muốn tiếp tục chia network `128.42.0.0` này ra thành 3 mạng con - *subnet* tương ứng với ba văn phòng ở 3 thành phố chẳng hạn.
Để làm điều này, admin sẽ mượng thêm 2 bit nữa - vốn đươc dành để đánh cho các host trong network, để đánh địa chỉ cho 4 *subnet*. 

| Địa chỉ Subnet |Binary | Decimal | Các Host IP |
| -------- | -------- | -------- | -------- |
| Subnet 1 |   10000000 00101010 00000000 00000000 | 128.42.0.0 | 128.42.0.1 ~ 128.42.1.254 |
| Subnet 2 |   10000000 00101010 00000010 00000000 | 128.42.2.0 | 128.42.2.1 ~ 128.42.3.254 |
| Subnet 3 |   10000000 00101010 00000100 00000000 | 128.42.4.0 | 128.42.4.1 ~ 128.42.3.254 |
| Subnet 4 |   10000000 00101010 00000110 00000000  | 128.42.6.0 | 128.42.6.1 ~ 128.42.7.254 |

Như vậy các subnet này sử dụng tổng cộng 23 bit đầu dành cho việc đánh địa chỉ cho chính cái mạng subnet đó. 
*Các bạn để ý bít thứ 22, và 23 nhé, sẽ có 4 trường hợp tất cả là 00, 01, 10, 11, tương ứng với mỗi địa chỉ cho mỗi subnet

###  Tính số lượng các các host tối đa mà ta có thể đánh địa chỉ IP trong subnet

Vì subnet kia đã dùng 23 bit đầu để đánh địa chỉ mạng rồi, 
ta sẽ có tối đa *32-23=9* bit để đánh IP cho các host trong mạng. 
Cụ thể với sub net A 128.42.0.0, trừ 2 địa chỉ 128.42.0.0 (để đánh địa chỉ cho subnet) và 128.32.1.255 (để đánh để chỉ cho broadcast *gửi tin đến Broadcast IP, thì tin đó sẽ gửi đến tất cả các host trong subnet*), thì ta sẽ còn các dãy số từ 128.42.0.1 ~ 128.42.1.254

Công thức tính số host sẽ là: 2mũ9 - 2 = 510. 

### Quay về bài toán đầu tiên

> Các bạn có để ý thấy các mục ghi kiểu: *Subnet 10.0.200.0/21 (2043 IP addresses)*. 
>Các bạn có thắc mắc */21* là gì? Tại sao lại là *2043 IP addresses* không? 
10.0.200.0/21 vậy là cậu này dùng 21 bit đầu để đánh địa chỉ network rồi.
còn 11 bit nữa để đánh cho các host trong network, 
-> số lượng các dãy số khả dụng sẽ là: 2mũ11 = 2048. Nhưng họ lại ghi *2043 IP addresses*
Google một lúc thì mình biết rằng AWS quy định 5 IP address cho mục đích khác rồi, nên chúng ta không được dùng nó nữa. 


-----
Vậy là giờ khi tìm hiểu về mấy cái VPC các thứ, chúng ta sẽ không gặp trở ngại khi bắt găp các con số IP, sẽ hiểu bản chất tại sao nó như thế, rất sướng phải ko nào :D
Cảm ơn các bạn đã đọc đến tận cuối bài viết. 

Nguồn tham khảo: 
https://networkengineering.stackexchange.com/questions/7106/how-do-you-calculate-the-prefix-network-subnet-and-host-numbers
https://support.microsoft.com/en-us/help/164015/understanding-tcp-ip-addressing-and-subnetting-basics
https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html