Như cái tiêu đề, tôi lưu lại một số thứ hay ho về CDN để sau mà quên thì còn có cái mà đọc.

## CDN là gì?
Sờ lại một chút về khái niệm CDN cho đỡ bỡ ngỡ...

Cái tên CDN (Content Delivery Network) cũng đã nói lên một phần ý nghĩa, không cần phô trương và màu mè **hiểu đơn giản** nó là một mạng lưới phân phối nội dung.

## Mục đích CDN?
CDN hướng tới nhóm dịch vụ web, cụ thể hơn nội dung ở đây bao gồm: HTML, JavaScript, CSS, Images, Videos...

Do vậy, CDN phục vụ một số mục đích chính sau:
- Cải thiện thời gian tải trang web --> Đây là mục đích lớn nhất của CDN.
- Giảm tỉ lệ nghẽn mạng.
- Tăng tính khả dụng và dự phòng của nội dung.
- Bảo vệ website khỏi các cuộc tấn công DDOS.

Ngoài ra, còn nhiều mục đích nữa tuy nhiên những mục đích trên có lẽ là lớn nhất để doanh nghiệp quyết định sử dụng CDN cho website của họ rồi.

## Logical Topology
<p align="center">
<img src="https://cloudflare.com/img/learning/cdn/what-is-a-cdn/what-is-a-cdn.png">
<br>
<em>Logical CDN Topology (Source: Cloudflare)</em>
</p>

Trên thực tế, mỗi `CDN Server` được gọi là POP (Point of Presence). Mỗi POP sẽ bao gồm một cụm thiết bị (Router, Server...) với đầy đủ chức năng phục vụ tối ưu tốc độ tải website.

Tôi sẽ nói kỹ hơn ở phần sau =))

## Làm thế nào CDN có thể đạt được các mục đích trên?
Hmm đi từ mô hình OSI cho dễ hiểu nhé!
```
================================
|         APPLICATION          | --> Ứng dụng công nghệ mới (HTTP/3)
================================
|         PRESENTATION         | --> Nén dữ liệu làm giảm dung lượng
================================
|           SESSION            | --> Ứng dụng công nghệ mới (TLS1.3) (thực ra TLS nằm ở cả ở tầng SESSION và PRESENTATION cơ mà vẽ khó quá nên thôi =)))
================================
|          TRANSPORT           |
================================
|           NETWORK            | --> Giảm khoảng cách người dùng và dịch vụ lưu trữ
================================
|          DATA LINK           |
================================
|           PHYSICAL           | --> Tối ưu hóa phần cứng lưu trữ
================================
```
OK, từ mô hình trên giờ chúng ta đi từng cái một nhé!

## Physical Layer
Thực ra, tôi gán việc *tối ưu hóa phần cứng lưu trữ* vào `Physical Layer` là sai lắm rồi nhưng mục đích của tôi chỉ đơn giản là để cho người đọc dễ mường tượng thôi.

`Physical Layer` liên quan đến phần cứng network chứ liên quan vẹo gì đến phần cứng lưu trữ chớ .... nhưng thôi bạn đọc cứ tạm chấp nhận thế đi cho dễ hiểu nhé =))

Nói là *tối ưu hóa phần cứng lưu trữ* cho nó văn vẻ chứ thực ra là đầu tư phần cứng cho `Cache Server` và thuật toán xử lý cache một cách hợp lý, thông minh nhất.
- Các thuật toán cơ bản nhất thường được sử dụng để xử lý cache:
    - Least Frequently Used (LFU) 
    - Least Recently Used (LRU)
    - Most Recently Used (MRU)
- Loại phần cứng được sử dụng hợp lý cho từng loại thuật toán trên:
    - Cache Memory (RAM)
    - Flash Cache (SSD)

## Network Layer
Phần này tôi sẽ đề cập đến 2 nội dung liên quan đến giảm độ trễ `Network Layer`:
- Công nghệ network nội tại mỗi POP.
- Công nghệ DNS Anycast điều hướng lưu lượng người dùng theo vị trí địa lý vào POP gần nhất.

**DNS ANYCAST**

Phần này, tôi sẽ mô tả cách mà DNS Anycast *giảm khoảng cách người dùng và dịch vụ lưu trữ*.

<p align="center">
<img src="https://vnnic.vn/sites/default/files/images/DNS-MoHinhTrienKhaiAnycashChoDNSQuocGiaQuaMangVNIX.png">
<br>
<em>DNS Anycast (Source: VNNIC)</em>
</p>

Khái niệm `anycast` khá đơn giản, chúng ta có thể hiểu là 1 IP được quảng bá từ nhiều khu vực địa lý (cụ thể là từ nhiều nước). Khi thực hiện `request` đến DNS, giao thức định tuyến BGP (Border Gateway Protocol) sẽ dựa vào tập hợp `attributes` của nó để chọn đường đi ngắn nhất đến server DNS đó. Với một mạng lưới CDN càng dày đặc và phân bố một cách hợp lý thì *khoảng cách giữa người dùng và POP* sẽ càng gần.

BGP là một giao thức mạng khá phức tạp chạy trên port 179/TCP. Danh sách `attributes` được liệt kê ở dưới.

Tôi sẽ không đi sâu phân tích BGP, nếu có nhu cầu muốn tìm hiểu, bạn có thể đọc thêm ở [đây](https://networklessons.com/bgp/bgp-attributes-and-path-selection)

```
Weight
Local Preference
Originate
AS path length
Origin code
MED
eBGP path over iBGP path
Shortest IGP path to BGP next hop
Oldest Path
Router ID
Neighbor IP address
```
Một ví dụ đơn giản và dễ thấy nhất chính là DNS Server của Google `8.8.8.8` `8.8.4.4` mà chúng ta hay sử dụng. Wooooooooo.... **SO FAST!** =))

DNS (Domain Name System) phục vụ phân giải tên miền ra địa chỉ IP và ngược lại. Vậy khi DNS được tích hợp vào CDN nó sẽ hỗ trợ việc phân giải tên miền nội dung ra địa chỉ và trỏ vào đúng `CDN Cache Server` được đặt bên trong POP chứa `DNS Server` đó.

Bản chất `anycast` đã hỗ trợ giảm thiểu các cuộc tấn công DDOS do các cuộc tấn công DDOS trải rộng trên nhiều dải IP trên khắp thế giới và mỗi IP được điều hướng đến một cụm POP khác nhau do vậy lưu lượng tấn công được phân tán trên tất cả các cụm POP.

**Chú ý:** Khi quảng bá dải IP Anycast ra hướng quốc tế thì bạn phải quảng bá dải địa chỉ /24, đây là quy định quốc tế vì nếu quảng bá các dải quá nhỏ thì số lượng route quảng bá trên toàn thế giới cực lớn làm ảnh hưởng hiệu năng của các thiết bị router biên. Ví dụ như ông Google, DNS Anycast là 8.8.8.8 nhưng khi quảng bá ra quốc tế thì ông Google vẫn phải quảng bá dải 8.8.8.0/24.

--> Do vậy khi xây dựng DNS Anycast, nhà cung cấp dịch vụ phải chuẩn bị một dải IP /24 của riêng ISP đó.

**Kết luận:** Vậy việc giảm khoảng cách người dùng và dịch vụ lưu trữ ở đây nghĩa là người dùng ở khu vực nào thì được điều hướng đến cụm POP ở khu vực đó làm giảm thiểu khoảng cách về địa lý từ đó làm giảm độ trễ ở lớp mạng.

**KIẾN TRÚC LEAF-SPINE NỘI TẠI POP**

Ở phần `DNS Anycast` tôi đã nói đến cách *giảm khoảng cách người dùng và dịch vụ lưu trữ*.

Phần này, tôi sẽ nói về nội tại POP và cách giảm thiểu độ trễ bên trong mỗi POP.

Về cơ bản, POP gồm một số thành phần cơ bản: Router, DNS Server, Cache Server.

**Chú ý:** trong mô hình CDN hiện đại, không chỉ có 3 thành phần trên mà còn có thể có một số thành phần sau:
- GSLB (Global Server Load Balancing) phục vụ điều hướng lưu lượng tối ưu hiệu năng cho DNS Server theo một cơ chế thông minh hơn. Còn thông minh hơn như nào thì tôi sẽ để ngỏ, bạn đọc tự tìm hiểu thêm [nhé](https://www.cloudflare.com/learning/cdn/glossary/global-server-load-balancing-gslb/)!
- DDOS Layer 4 Protection: phục vụ ngăn chặn các cuộc tấn công DDOS Layer 4 (SYN Flood, UDP Flood....)
- DDOS Layer 7 Protection: phục vụ ngăn chặn các cuộc tấn công DDOS Layer 7 (HTTP Flood, Slowloris...)

**NOTES:** Ở trên ta đã thấy `DNS Anycast` đã giảm thiểu phần nào sự ảnh hưởng của DDOS. Việc tích hợp thêm lớp `DDOS Protection` tại mỗi POP sẽ giảm thiểu thêm lần nữa sự ảnh hưởng của các cuộc tấn công DDOS. Vậy nghĩa là ta đã có 2 lớp bảo vệ DDOS rồi đấy =))

Thành phần cơ bản chỉ đơn giản như vậy nhưng đối với một số nhà cung cấp CDN siêu lớn  thì số lượng `request` cũng siêu lớn (Cloudflare là một ví dụ). Vậy họ sẽ phải xây dựng hẳn một DC (Data Center) thu nhỏ đóng vai trò là POP trong đó mạng BackBone của họ xây dựng theo mô hình `Leaf-Spine` và ứng dụng công nghệ `VxLAN`.

<p align="center">
<img src="https://img-en.fs.com/community/wp-content/uploads/2016/03/spine-leaf-vs-3-tier-1024x378.png">
<br>
<em>Leaf-Spine và Traditional Architecture (Source: https://community.fs.com)</em>
</p>

Vậy mô hình `Leaf-Spine` kết hợp với `VxLAN` có những ưu điểm gì? (Chý ý: dưới đây chỉ là những ưu điểm hỗ trợ cho việc tối ưu CDN, ngoài ra còn nhiều ưu điểm khác nữa nhé!)
- Về mặt vật lý, dễ dàng mở rộng theo chiều ngang.
- Về mặt network, tận dụng ECMP (Equal-cost multi-path) và UDP Header của `VxLAN` để tăng tốc độ truyền tải gói tin trong mạng. Có thể đọc thêm ở [đây](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/sdn-vxlan.html)
- Ngoài ra, còn mở ra một chân trời để tích hợp SDN (Software Defined Networking).

**Một chút ngoài lề:**
BGP là giao thức chịu trách nhiệm điều hướng lưu lượng trong nội tại POP cũng như lưu lượng từ người dùng đến POP.

Tuy nhiên, với xu thế phát triển mạnh mẽ của AI, Cloud Platform thì Facebook và Google đang tiên phong cho việc phát triển một giao thức mạng mới thông minh hơn, bảo mật hơn:
- Facebook đang phát triển giao thức `Open/R`, repo của nó ở [đây](https://github.com/facebook/openr)
- Google đang phát triển `Espresso`, repo thì tui chưa tìm thấy, bạn nào có thì chia sẻ cho tui với nhé =))

Hiện tại, các giao thức này chỉ được sử dụng trong môi trường mạng của Facebook và Google; BGP vẫn là giao thức chính cho mạng toàn cầu.

## Ứng dụng TLS1.3
Tôi sẽ không nhắc lại TLS là cái gì nữa, tôi sẽ đi thẳng vào các cải tiến của TLS1.3 và thử so sánh với TLS1.2 xem nó hơn ở cái gì nhé!

Cải tiến của TLS1.3:
- TLS false start
- Zero Round Trip Time (0-RTT) (roundtrip - là 1 lần trao đổi bản tin giữa client và server bao gồm `request + response`)

**HTTPS Request**
Trước tiên, cùng nhìn lại RTT của HTTPS Request:

(1) Truy xuất DNS để lấy được thông tin IP Domain (1 RTT)

(2) TCP Handshake bao gồm SYN, ACK (1 RTT)

(3) TLS Handshake bao gồm `Key Exchange + Encrypted Connection` (2 RTT)

(4) HTTP Data Sending (1 RTT)

--> Vậy từ đây có thể thấy 1 request bao gồm: `4 RTT + DNS`

**TLS FALSE START**

`TLS False Start` cho phép `client` và `server` bắt đầu truyền dữ liệu đã được mã hóa khi mà quá trình `handshake` mới chỉ hoàn thành một phần.

Vậy hoàn thành một phần ở đây nghĩa là như nào?

Trước tiên, thử nhìn lại RTT TLS1.2.

<p align="center">
<img src="https://www.thesslstore.com/blog/wp-content/uploads/2017/01/SSL_Handshake_10-Steps-1.png">
<br>
<em>RTT TLS1.2 (Source: thesslstore.com)</em>
</p>

Cái ảnh nó chia ra nhiều bước để mình nhìn được rõ hơn thông tin trao đổi thôi, còn thực chất TLS1.2 bao gồm 2 RTT:
- Trao đổi các thông tin khóa mã hóa.
- Thiết lập kết nối mã hóa.

Giờ nhìn sang thằng TLS1.3 xem nhé!

<p align="center">
<img src="https://www.thesslstore.com/blog/wp-content/uploads/2018/03/TLS_1_3_Handshake.jpg">
<br>
<em>RTT TLS1.3 (Source: thesslstore.com)</em>
</p>

Vậy điểm khác biệt ở đây là ở đoạn cuối kia kìa, `client` trả cho `server` bản tin `Client Finished` mà không cần phải chờ thằng `server` trả lời như TLS1.2.

Do vậy, sau khi gửi cho `server` bản tin `Client Finished`, `client` có thể truyền dữ liệu luôn --> có thể thấy ở đây TLS1.3 chỉ cần `1 RTT` để hoàn tất `handshake` (so với TLS1.2 là `2 RTT`).

**Kết luận:** Như vậy với TLS1.3 ta có thể giảm bớt `1 RTT` khi bắt đầu khởi tạo kết nối mới, nghĩa là ta chỉ tốn `3RTT + DNS` thay vì `4RTT + DNS` TLS1.2.

**ZERO ROUND TRIP TIME (0-RTT)**

`0-RTT` là tính năng hướng tới các kết nối đã khởi tạo trước đó, nó làm giảm RTT cho quá trình `handshake` khi tái sử dụng các kết nối đã khởi tạo trước đó.

Tính năng `0-RTT` là hệ quả của `TLS False Start` nghĩa là trong quá trình `TLS Handshake` của một kết nối hoàn toàn mới ta chỉ tốn `1 RTT`. Khi tái sử dụng một kết nối đã khởi tạo trước đó, `sessionID` hoặc `session Ticket` được sử dụng để giảm thiểu thời gian `TLS handshake` --> do đó, với kết nối mới tốn `1 RTT` còn với việc tái sử dụng kết nối đã có ta tốn `0 RTT`.

**Thông tin ngoài lề:** Mỗi CDN có một công nghệ cho việc quản lý, mã hóa `sessionID` `session Ticket`. Các bạn có thể tham khảo thêm ở [đây](https://blog.cloudflare.com/tls-session-resumption-full-speed-and-secure/).

**Kết luận:** Vậy ta có bảng so sánh nho nhỏ như sau:

```
============================================
|             |    TLS1.2   |    TLS1.3    |
============================================
| Kết nối mới |  4RTT + DNS |  3RTT + DNS  |
============================================
| Kết nối cũ  |  3RTT + DNS |  2RTT + DNS  |
============================================
```

## HTTP/3 (QUIC)
HTTP/3 (QUIC - Quick UDP Internet Connections) là sự thay đổi từ TCP sang UDP cho quá trình khởi tạo kết nối ban đầu.

Về cơ bản, ta cũng đã biết việc thiết lập kết nối UDP sẽ nhanh hơn TCP rồi nhỉ? Vậy cùng nhìn qua sự thay đổi khi chuyển từ HTTP TCP sang HTTP UDP nhé!

<p align="center">
<img src="https://blog.cloudflare.com/content/images/2018/07/http-request-over-tcp-tls@2x.png">
<br>
<em>HTTP request with TCP Connection (Source: Cloudflare)</em>
</p>
<p align="center">
<img src="https://blog.cloudflare.com/content/images/2018/07/http-request-over-quic@2x.png">
<br>
<em>QUIC with UDP Connection (Source: Cloudflare)</em>
</p>

Tuy nhiên, đây là chuẩn HTTP mới đang trong quá trình hoàn thiện và chưa được sử dụng rộng rãi.

Một số trình duyệt đã cho ra bản beta hỗ trợ QUIC tuy nhiên hiện tại chưa có nhiều website sử dụng QUIC và bản beta cũng chưa hoàn thiện.

Bạn có thể dựng nginx http3 bằng bản docker có sẵn ở [đây](https://hub.docker.com/r/nwtgck/nginx-http3) để test và sử dụng một số công cụ sau để truy cập:
- [quiche](https://github.com/cloudflare/quiche) của Cloudflare.
- [curl](https://github.com/yurymuski/curl-http3) hỗ trợ HTTP/3.


Vậy phần tản mạn đến đây có lẽ kết thúc được rồi, chỉ là chém gió mấy thứ góp nhặt được. 

**Nếu có chỗ nào sai hoặc thiếu cần sửa chữa, bổ sung các bạn góp ý giúp tôi nhé! NGÀN LẦN XIN ĐA TẠ!!**