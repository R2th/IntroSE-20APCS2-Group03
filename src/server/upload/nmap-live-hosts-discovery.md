## 1. Giới thiệu chung - 3 cách quét máy chủ đang hoạt động 


Chào mọi người, mở đầu series về nmap, mình sẽ giới thiệu cho các bạn cách sử dụng nmap để khám phá những máy chủ đang hoạt động. Series chủ yếu nói về cách thức và nguyên lý hoạt động của các kiểu scan nên mình sẽ tập trung đi vào chủ đề của bài.

### Có 3 cách để quét các máy chủ đang hoạt động
* Nếu người dùng có đặc quyền cao (root), quét các máy chủ đang hoạt động trong mạng local, Nmap sử dụng ARP requests.
* Nếu người dùng có đặc quyền cao quét các mục tiêu ngoài mạng local, Nmap sử dụng ICMP echo requests, TCP ACK (acknowledge) port 80, TCP SYN (synchronize) port 443 và ICMP timestamp request.
* Nếu người dùng không có đặc quyền quét các mục tiêu ngoài mạng local, Nmap sử dụng cơ chế bắt tay 3 bước TCP qua cổng 80 và 443.


Nmap theo mặc định sẽ sử dụng cơ chế ping scan để tìm các live host, trong đó -sn để không thực hiện quét port :` nmap -sn TARGETS`
## 2. Nmap host discovery using ARP and ICMP
* ### Nmap host discovery using ARP
Như đã nói ở trên, cách này chỉ có thể sử dụng được nếu bạn ở trong cùng một mạng con với mục tiêu. Nó sử dụng cơ chế hoạt động của ARP nhưng mình sẽ không nói ở đây.

Usage:  `nmap -PR -sn TARGETS`


- PR : ARP discovery
- -sn:  Không thực hiện quét port

![](https://images.viblo.asia/4c6a1b92-8666-4c7d-99b1-2d669c6ffce3.png)
* ### Nmap host discovery using ICMP

*- ICMP echo* 

Cơ chế này sử dụng cơ chết ping trên mạng (Gửi 1 ICMP echo request  và đợi ICMP echo reply), tuy nhiên tường lửa có thể chặn những yêu cầu này. ARP scan được ưu tiên trước cách này để phát hiện các host trong 1 mạng. 

Usage: `nmap -PE TARGETS `
- PE : ICMP echo
- -sn:  Không thực hiện quét port

![](https://images.viblo.asia/65934007-d075-49d3-a157-4c07be282717.png)

*- ICMP Timestamp và ICMP netmask request*

Để tránh trường hợp ICMP có thể bị tường lửa chặn, ta tìm hiểu thêm 1 số các tiếp cận như sau, gửi các gói ICMP loại khác như  ICMP Timestamp và ICMP netmask request.

Usage: `nmap -PP/-PM TARGET (sử dụng thêm -sn nếu không muốn quét port)
`
## 3. Nmap host discovery using TCP and UDP

**Trước khi bắt đầu, mình sẽ nói qua về cơ chế bắt tay 3 bước (TCP 3-way handshake):**

* **Bước 1:** Máy 1 gửi gói với cờ SYN được bật

* **Bước 2:** Máy 2 nhận được gói, nếu port mở sẽ gửi lại gói với SYN/ACK được bật, nếu không gửi lại gói với cờ RST được bật

* **Bước 3:** Máy 1 nhận được SYN/ACK, gửi lại gói ACK để xác nhận

![](https://images.viblo.asia/de598c8a-8278-46d9-a7d1-79df5e08167c.png)

* ###  TCP SYN ping

Sử dụng options -PS để thực hiện TCP SYN ping, đối với privileged user, có thể thực hiện TCP SYN ping mà không cần hoàn thành, ở bước 3 máy 1 sẽ gửi RST cho máy 2, tuy nhiên với Unprivileged user, bắt buộc phải hoàn thành quá trình này, ở bước 3 sẽ gửi gói ACK.

Usage: `nmap -PS -sn TARGETS`

* -PS: TCP SYN Ping
* -sn: Không thực hiện quét port

![](https://images.viblo.asia/9e6af8f3-3efd-4fb9-ba10-17d9d44ed46d.png)

* ### TCP ACK ping

Với cách này, nmap sẽ gửi gói với ACK flag được bật. Cách này chỉ có thể sử dụng nếu bạn chạy với privileged user, nếu không nó sẽ sử dụng cơ chế 3-way handshake. Máy 1 gửi gói ACK và nhận được gói RST nếu máy 2 đang hoạt động (Lý do nhận được RST vì không có kết nối nào gửi gói  với 1 ACK flag)

Usage: `nmap -PA -sn TARGETS`

* -PA: TCP ACK ping
*  -sn: Không thực hiện quét port

![](https://images.viblo.asia/d9481a81-f998-4df8-ae72-7f39d97b3753.png)

* ### UDP ping

Trái ngược với việc sử dụng cói TCP SYN, việc gửi gói UDP ping đến 1 cổng đang mở sẽ không nhận được phản hồi nào, cho thấy cổng UDP đang mở. Tuy nhiên nếu gửi đến một cổng UDP đang đóng, ta nhận được một gói không thể truy cập cổng ICMP, điều này cho thấy host vẫn đang hoạt động.

Usage: `nmap -PU -sn TARGETS`
* -PU: UDP Ping
* -sn: Không thực hiện quét port

![](https://images.viblo.asia/a0c50ed2-4584-4dc6-833b-6fb5240b6caf.png)

![](https://images.viblo.asia/64832477-32f5-4708-8c46-5843ab83207c.png)

## 4. Tổng kết

Như vậy ở trên mình đã liệt kê ra các cách để phát hiện ra các máy chủ đang hoạt động dựa trên dựa trên ARP, ICMP, TCP và UDP.
Trong phần kế tiếp của series, mình sẽ nói đến các phương pháp scan port bằng nmap và cách chúng hoạt động. Cảm ơn các bạn đã đọc.