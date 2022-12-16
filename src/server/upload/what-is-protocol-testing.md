Trước khi có thể kiểm thử protocol , chúng ta hãy cùng tìm hiểu về nó nhé :
# 1.Protocol là gì?

Khi máy tính giao tiếp với nhau, có một bộ các quy tắc và điều kiện chung mà mỗi máy tính phải tuân theo. Nói cách khác, các giao thức này xác định cách thức truyền dữ liệu giữa các thiết bị điện toán và qua mạng.

# 2.  Protocol Testing là gì?

Kiểm thử giao thức được định nghĩa là loại Kiểm thử phần mềm kiểm tra các giao thức truyền thông trong các lĩnh vực Chuyển mạch, Không dây, VoIP, Định tuyến, Chuyển mạch, v.v.

# 3. Routed và Routing Protocols
Giao thức được phân thành hai loại:
+ Ruted protocols
+ Routing protocols

Routed Protocols: là giao thức lớp 3 được dùng để truyền dữ liệu từ một thiết bị đầu cuối này đen một thiết bị khác trên mạng. Các routed protocol là các gói L3 trong đó mang thông tin của các ứng dụng đến các lớp cao hơn.. Nó mang theo lưu lượng người dùng như e-mail, lưu lượng truy cập web, tệp tin , v.v. Các giao thức được định tuyến là IP, IPX và AppleTalk.
Routing protocols: là giao thức được dùng giữa các router để gửi và nhận các cập nhật về các mạng tồn tại trong một tổ chức, qua đó các quá trình định tuyến có thể dùng để xác định đường đi của gói trên mạng. Ví dụ: RIP, IGRP, EIGRP, v.v.
Nói một cách đơn giản, Routed Protocols giống như một chiếc xe buýt được sử dụng để vận chuyển trong khi các Routing protocols là tín hiệu trên đường.

Dựa trên kết nối khác nhau được sử dụng. Các công ty như CISCO, JUNIPER, ALCATEL sản xuất các thiết bị mạng như bộ định tuyến, modem, điểm truy cập không dây, v.v ... sử dụng các giao thức khác nhau để liên lạc, ví dụ: Cisco sử dụng EIGRP, OSPF, v.v. Kiểm tra giao thức không có gì ngoài việc kiểm tra EIGRP (Enhanced Interior Gateway Routing Protocol) hoặc OSPF (Open Shortest Path First) hoặc bất kỳ giao thức nào khác đang hoạt động theo tiêu chuẩn tương ứng.

# 4. Các loại giao thức


| Các loại giao thức | Mục đích của giao thức |
| -------- | -------- |
| TCP / IP     |  Nó được sử dụng để gửi thông tin trong các gói nhỏ qua Internet     |
| UDP/ ICMP    | Nó được sử dụng để gửi một lượng nhỏ thông tin trong các gói dữ liệu qua internet     | 
| POP3 và SMTP     | Nó được sử dụng để gửi và nhận thư điện tử     | 
|Hypertext Transfer Protocol     | Nó được sử dụng để chuyển trang HTML thành dạng mã hóa để cung cấp bảo mật cho dữ liệu quan trọng     | 
|FTP    | Nó được sử dụng để vận chuyển các tệp tin qua mạng từ nút này sang nút khác     | 

***Chú thích:***
* > TCP/IP- Transmission Control Protocol/ Internet protocol
* > UDP / ICMP- User Datagram Protocol/Internet Control Message Protocol
* > POP3/SMTP- Post Office Protocol / Simple Mail Transfer Protocol
* > HTTP- Hyper Text Transfer Protocol
* > FTP- File Transfer Protocol

# 5. Các loại giao thức mạng khác nhau (L2 và L3)

Mô hình OSI có tổng cộng 7 lớp giao thức mạng, trong đó lớp 2 và lớp 3 là rất quan trọng.

**Lớp 2**: Đây là lớp liên kết dữ liệu. Mac address, Ethernet, Token Ring, và Frame Relay là tất cả các ví dụ về lớp liên kết Dữ liệu này.

**Lớp 3**: Đây là lớp mạng nhằm xác định đường dẫn tốt nhất có sẵn trong mạng hay không để có thể liên lạc. Địa chỉ IP là ví dụ cho lớp 3.

# 6. Phương pháp kiểm thử Protocol

* Để kiểm thử giao thức, bạn cần trình phân tích và mô phỏng giao thức
* Phân tích giao thức đảm bảo giải mã thích hợp cùng với phân tích các cuộc gọi và phiên làm việc . Giả lập mô phỏng các thực thể khác nhau của yếu tố mạng
* Thông thường, kiểm thử giao thức được DUT thực hiện cho các thiết bị khác như thiết bị chuyển mạch và bộ định tuyến, định cấu hình giao thức trong đó
* Sau đó kiểm tra cấu trúc gói tin được gửi bởi các thiết bị
* Kiểm tra khả năng mở rộng, hiệu suất, thuật toán giao thức, v.v. của thiết bị bằng cách sử dụng các công cụ như lxNetworks, Scacco và Wireshark

# 7.  Các loại thử nghiệm để kiểm tra giao thức

Kiểm thử giao thức bao gồm kiểm tra chức năng, hiệu suất, ngăn xếp giao thức, khả năng tương tác, vv Trong quá trình kiểm thử giao thức, 3 yếu tố cơ bản cần thiết là:

* Tính chính xác: Chúng tôi có nhận được gói X khi chúng tôi mong đợi không
* Độ trễ: Gói tin mất bao lâu để vận chuyển trong hệ thống
* Băng thông: Có bao nhiêu gói tin của chúng tôi có thể gửi mỗi giây

Kiểm thử giao thức có thể được tách thành hai loại. Kiểm thử tin cậy/tắc nghẽn và kiểm thử chức năng. Kiểm thử tin cậy/tắc nghẽn bao gồm  kiểm thử chịu tải, kiểm thử tắc nghẽn, kiểm thử hiệu suất, v.v ... Trong khi kiểm thử chức năng bao gồm kiểm thử tiêu cực, kiểm thử tuân thủ, kiểm thử khả năng tương tác, v.v.

Kiểm thử sự phù hợp: Các giao thức được triển khai trên sản phẩm được kiểm tra về sự tuân thủ như IEEE, RFC, v.v.

Kiểm tra khả năng tương tác: Khả năng tương tác của các nhà cung cấp khác nhau được kiểm tra. Thử nghiệm này được thực hiện sau khi thử nghiệm tuân thủ được thực hiện trên nền tảng thích hợp

Kiểm thử tính năng mạng:  tính năng của các sản phẩm mạng được kiểm tra về chức năng , sau đó tham chiếu với tài liệu thiết kế. Ví dụ: các tính năng có thể là bảo mật cổng trên một công tắc, ACL trên bộ định tuyến, v.v.

# 8. Các trường hợp kiểm tra mẫu về kiểm tra giao thức của các thiết bị mạng

Dưới đây là trường hợp thử nghiệm mẫu cho bộ định tuyến


| Test Name |   Testcase | 
| -------- | -------- | 
| Một Vlan trên một Switch   | Xây dựng hai Vlan khác nhau. Kiểm tra khả năng hiển thị giữa các máy chủ trên các Vlan khác nhau   |
| Ba Vlan đối xứng trên một Switch  | Tạo ba Vlan không đối xứng khác nhau. Kiểm tra khả năng hiển thị giữa các máy chủ  |
| Spanning Tree: Root Path Biến đổi chi phí   | Kiểm tra cách Root Path Cost thay đổi sau một biến thể cấu trúc liên kết |
| Cây Spanning: Chặn cổng    | Kiểm tra cách giao thức cây bao trùm tránh sự hình thành các chu kỳ trong mạng, chặn các liên kết dự phòng, với sự hiện diện của Vlan  |
|Cầu gốc khác nhau cho MSTI khác nhau    | Cho thấy mỗi MSTI có thể có Root Bridge khác nhau |
|Tầm nhìn giữa các khu vực STP khác nhau  | Với cùng các Vlan kiểm tra mức độ hiển thị giữa các vùng STP khác nhau|
| Hiệu suất chuyển đổi điện thoại  |Tạo 1000 cuộc gọi điện thoại và kiểm tra xem công tắc điện thoại vẫn hoạt động hay hiệu suất của nó bị suy giảm| 
| Thử nghiệm âm tính cho thiết bị    | Nhập khóa không chính xác và kiểm tra người dùng để xác thực. Nó không nên cho phép người dùng truy cập  | 
|Tốc độ đường truyền     |  Kiểm tra thiết bị hoạt động ở tốc độ 10Gbps, sử dụng tất cả băng thông có sẵn để xử lý lưu lượng đến| 
| Tỷ lệ hội thoại giao thức   | Theo dõi cuộc hội thoại TCP giữa hai thiết bị và xác minh rằng mỗi thiết bị có hành vi đúng | 
| Thời gian đáp ứng để bắt đầu phiên  | Đo thời gian phản hồi của thiết bị với yêu cầu mời để bắt đầu phiên   | 

# 9. Công cụ kiểm tra giao thức

## Scapy để chế tạo gói

Scapy  là một chương trình thao tác gói tương tác mạnh mẽ. Nó cho phép bạn: 

* Tạo gói
* Giải mã các gói trên mạng
* Chụp gói và phân tích chúng
* Tiêm các gói vào mạng

Về cơ bản, scapy chủ yếu thực hiện hai việc: nhận câu trả lời và gửi gói tin. Bạn xác định các gói, nó sẽ gửi chúng, nhận câu trả lời, khớp các yêu cầu với câu trả lời và trả về một danh sách các cặp gói và một danh sách các gói chưa khớp.

Nó cũng có thể xử lý những thứ khác cũng như định tuyến theo dõi, kiểm tra đơn vị, tấn công hoặc khám phá mạng, phát triển giao thức mới, thăm dò, v.v.

Scapy cho phép chúng ta viết một tập lệnh Python cho phép chúng ta thực hiện một tác vụ như gửi và nhận gói hoặc sniffing các gói. Ví dụ, scapy có thể sniffing gói dữ liệu bằng cách sử dụng tập lệnh Python. Lệnh mở getdit được nhập trong trình chỉnh sửa

```
#gedit scapysniff.py
#!/usr/bin/env python
from scapy.all import*

a= sniff(count=10)
a.nsummary()

save, and change the mode of the file into an executable form
#chmod+x scapysniff.py
# ./scaotsbuff.py
```

Nó sẽ sniff 10 gói và ngay sau khi sniff được 10 gói, nó sẽ in tóm tắt. Scapy cũng là một mảng lệnh để gửi và nhận gói tin cùng một lúc

[Download Scapy here](http://www.secdev.org/projects/scapy/)


## Công cụ phân tích Wireshark

Công cụ được sử dụng để kiểm thử giao thức - Wireshark. Nó cho phép bắt lại các gói tin trong thời gian thực và hiển thị chúng ở dạng người sử dụng có thể đọc được. Nó cho phép đào sâu vào lưu lượng mạng và kiểm tra các gói tin riêng lẻ bằng cách sử dụng mã và bộ lọc.

Wireshark bắt lại các gói tin giúp xác định thời điểm khi phiên được thiết lập, khi sự di chuyển dữ liệu chính xác được bắt đầu và số lượng dữ liệu được gửi mỗi lần, v.v.


Wireshark có một bộ các tính năng phong phú bao gồm:

* Kiểm tra hàng trăm giao thức được thêm vào mỗi lúc. 
* Bắt trực tiếp và phân tích ngoại tuyến
* Phân tích sự phong phú của VoIP
* Trình duyệt đóng gói ba ngăn tiêu chuẩn
* Chạy trên nhiều nền tảng như Windows, Linux, OSX, v.v.
* Dữ liệu mạng đã bắt có thể được duyệt qua GUI
* Giải mã hỗ trợ nhiều giao thức như IPsec, ISAKMP, SSL / TLS
* Dữ liệu trực tiếp có thể được đọc từ Ethernet, ATM, Bluetooth, USB, mã thông báo, v.v.
* Đầu ra có thể được xuất sang CSV, XML, văn bản thuần túy, v.v.

[Download Wireshark](https://www.wireshark.org/download.html)

## TTCN

Bộ kiểm thử TCCN chứa nhiều trường hợp kiểm thử được viết bằng ngôn ngữ lập trình TTCN và nó được sử dụng để kiểm thử các hệ thống phản ứng hoặc kiểm thử hành vi.

*Ví dụ, để tạo ra máy pha cà phê, nó đã cung cấp cho bạn bằng cách đút một đồng đô la nhưng  sẽ không phản hồi nếu có bất cứ thứ gì nhỏ hơn một đô la được đưa vào nó. Để sử dụng ngôn ngữ TCCN3 như vậy. Nó cho phép chúng ta chạy kiểm thử trước khi máy pha cà phê thực tế đưa ra dưới dạng sản phẩm. Sau khi kết nối bộ kiểm thử TCCN3 với bên ngoài thiết bị. Hệ thống kiểm tra phát ra kích thích ( là đồng đô la) và nhận được phản hồi ( là cà phê).*

![](https://images.viblo.asia/4d3a13e2-32b2-41df-879b-601687cf1ceb.png)

TCCN3 có thể được sử dụng trong các lĩnh vực khác nhau như: 

* Truyền thông di động (LTE, WiMAX, 3G, v.v.)
* Công nghệ băng thông rộng (ATM, DSL)
* Nền tảng Middleware (Dịch vụ web, CORBA, v.v.)
* Giao thức Internet (SIP, IMS, IPv6)
* Thẻ thông minh
* Ô tô (AutoSAR, MOST, CAN)

Trong TCCN gồm:

* Bộ kiểm thử nghiệm
* Các trường hợp kiểm thử
* Các bước kiểm tra
* Khai báo biến
* Khai báo bộ đếm thời gian
* Tạo PDU, v.v.

TCCN có thể được tích hợp với các loại hệ thống của các ngôn ngữ khác như ASN.1, XML, C / C ++. Định dạng ngôn ngữ cốt lõi TCCN3 là văn bản ngoài ra còn có các định dạng khác như dạng bảng, đồ họa và trình bày.

# Tài liệu tham khảo 

https://www.guru99.com/protocol-testing.html