Một con vịt đi vào quán bar, vịt hỏi bartender: "Mày có nhìn thấy anh trai tao không?". Bartender trả lời: "Anh mày nhìn như thế nào?"

### Application con vịt

Vịt tâm sự với bartender rằng, vịt muốn làm một application về loài vịt. Kiểu 100 các món ăn làm từ thịt vịt, hoặc sự khác nhau giữa vịt và bạn, hoặc thực ra bạn chính là một con vịt :baby_chick: ... 

Bartender thấy hay hay. Ngỏ ý góp vốn làm cùng. Vịt ok. Hai người bàn luận xem app nên làm thế nào. Vịt bảo vịt sẽ nhận làm app, còn bartender làm ops, xử lý infracstructure. Bartender đồng ý, sau đó hắn đi mua 1 con server về, nối router, tạo VPN dùng AnyConnect (nghiêm túc mà), thế là một server on premise hoàn thành. :dancer:

Sau khi hoàn thành app (*100 lí do bạn là một con vịt*). Hai người cho thử nghiệm trên private server. App chạy ngon. Vịt bảo giờ phải đưa lên cloud mới sang, mới chảnh ~~chó~~ vịt (*mục đích flexibility và scalibility cũng quan trọng, nhưng chảnh vịt quan trọng hơn*). Vịt hỏi bartender đưa lên cloud thì làm thế nào? Cần dùng component gì? Bartender trả lời...


### Availability

Bartender hỏi vịt muốn độ availability ra sao? Vịt hỏi ý là uptime hả? Bartender bảo không. **Uptime là uptime. Availability là availibility.**

Nhắc tới Availability, chúng ta nhắc tới reliability và resiliency - khả năng tránh và khôi phục sau failure. Khi có độ reliability và resiliency cao, chúng ta sẽ có (*khả năng*) availability cao. Availability là **"percentage of time application perform as expected"**. 

Tức là nếu app vịt chưa tèo, health check endpoint vẫn okay đi. Nhưng khi bạn sử dụng nó bị lag, bị delay, thì đó là **poor performance :arrow_right: low availability**.

Vịt nghe xong gật gù.Thế là giờ phải tính availability xong mới chọn component phù hợp được chứ gì? Vậy tính sao?

Nghe vịt hỏi, bartender lôi ra cái bảng đã chuẩn bị sẵn:

| 99% |    99.9%    | 99.99%    | 99.999% |
| :---- | :---- | :---- | :---- |
| 3 days and 15 hours |    5 hours and 45 minutes |    ~ 1 hours    | ~ 5 minutes |

Bảng trên được tính theo dạng annual - tức **"downtime" per year**. Nếu hệ thống cúa vịt có độ availability là **99.9%.** Điều có có nghĩa doanh nghiệp của vịt chịu được mức **low availability là 5 tiếng 45 phút 1 năm.** 

### Example on AWS Cloud

App "100 lí do bạn là một con vịt" là một app monolith khá đơn giản. App có một application layer (có cả client-server) và một database sql server. Vịt bảo bartender: Đây là một **2 tier web application**. Vịt chọn availibility time là 99.9%, dùng aws cloud provider và yêu cầu đưa lên cloud càng nhanh càng tốt (*nhiều đứa đang ngăm nghe copy vịt app*). Bartender bảo ok, thế thì [lift and shift](https://www.ibm.com/cloud/learn/lift-and-shift). Bartender đưa ra bản thiết kế như sau:


![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/tkjrklfqfl_image.png)

Vịt hỏi Bartender có tự tin cái này là 99.9% không? Bartender bảo có. Dựa trên [service level argreement](https://en.wikipedia.org/wiki/Service-level_agreement#:~:text=%20Service%20level%20agreements%20are%20also%20defined%20at,a%20routine%20service%20to%20all%20the...%20More%20). Chúng ta sẽ có độ availability của các element trong bản thiết kế như sau:

| EC2 | EFS (Elastic file system)| LB (Load balancer) | RDS (relational database) |
| :--- | :--- | :--- | :--- |
| 90% |99,99%| 99,99% | 99,95% (Multi AZ) |

Bây giờ chúng ta có 4 EC2. Vậy fail rate sẽ rơi vào khoảng:

```
10 x 10 x 10 x 10 = 0.01 %
```

Chúng ta trừ đi với 100 %

```
100 - 0.01 = 99.99%
```
Tiếp đó ta **nhân với availability của từng instance**:
```
99.99 x 99.99 x 99.99 x 99.95 = 99.92%
```

99.92 đó. Bo cho 0.02 % luôn. Vịt vui. bartender vui. Hai người nắm tay nhau đưa app lên cloud.

Vậy thôi. Bài viết về vịt đến đây là hết. Nếu bạn tò mò về app vịt. Bạn có thể nghía thử app tại [đây](https://1-trong-100-lí-do-bạn-là-một-con-vịt.com)

Somewhere, xx-xx-20xx

Rice