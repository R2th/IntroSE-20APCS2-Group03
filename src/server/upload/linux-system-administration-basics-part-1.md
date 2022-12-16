Như mọi người đã biết, khi sử dụng linux thì mọi người thường chú ý đến command line để thao tác nhanh chóng và chuyên nghiệp hơn. Nên hôm nay mình sẽ tổng hợp lại một số cái mà mọi  người hay dùng và cơ bản trong hệ thống quản lý Linux.
## Basic Configuration
### Set the Hostname
Do phần hướng dẫn này hơi dài nên mọi người có thể tham khảo tại [setting your hostname](https://www.linode.com/docs/getting-started/#setting-the-hostname). Và sau khi follow xong thì bạn có thể kiếm tra bằng cách
```shell
hostname
hostname -f
```
`hostname` thì sẽ show tên hostname dạng short, còn thêm option `-f` thì là full hostname
### Set the Time Zone
Khi đặt múi giờ trên server của bạn, tốt nhất nên sử dụng múi giờ của phần lớn người dùng của bạn. Nếu bạn không chắc chắn múi giờ nào là tốt nhất, hãy cân nhắc sử dụng giờ UTC (tức là, Giờ chuẩn Greenwich).  Thường thì server sẽ cung cấp các phương thức tương tác tích hợp để thay đổi múi giờ:
#### Set the Time Zone in Debian or Ubuntu
Bạn follow command bên dưới và làm theo hướng dẫn sau khi chạy command này:
```
dpkg-reconfigure tzdata
```
#### Set the Time Zone in CentOS 7 or Arch LinuxPermalink
Đầu tiên thì chúng ta show ra list tất cả các time zones:
```
timedatectl list-timezones
```
Sử dụng các phím `Up`, `Down`, `Page Up` and `Page Down` để xem hết danh sách. Sao chép time zone bạn định set, sau đó bấm phim `q` để thoát.
Sau khi sao chép xong thì set time zones
```
timedatectl set-timezone 'Asia/Ho_Chi_Minh'
```
#### Set the Time Zone Manually on a Linux SystemPermalink
Tìm thư mục phù hợp trong `/usr/share/zoneinfo/` và link nó đến file `/etc/localtime`. ví dụ:

Giờ UTC:
```
ln -sf /usr/share/zoneinfo/UTC /etc/localtime
```
Giờ Eastern:
```
ln -sf /usr/share/zoneinfo/EST /etc/localtime
```
Giờ American Central:
```
ln -sf /usr/share/zoneinfo/US/Central /etc/localtime
```
Giờ American Eastern:
```
ln -sf /usr/share/zoneinfo/US/Eastern /etc/localtime
```
### Confgure the /etc/hosts File
File `/etc/hosts` cung cấp danh sách các địa chỉ IP với hostname tương ứng. Điều này cho phép bạn chỉ định hostname cho một địa chỉ IP ở một nơi trên máy cục bộ và sau đó có nhiều ứng dụng kết nối với tài nguyên bên ngoài thông qua hostname của chúng. Hệ thống các file lưu trữ trước DNS và các file lưu trữ luôn được kiểm tra trước khi DNS được truy vấn. Do đó, `/etc/hosts` có thể hữu ích cho việc duy trì các mạng nội bộ nhỏ cho mục đích phát triển và để quản lý các clusters.\
Một số ứng dụng yêu cầu máy tự xác định chính xác trong file `/etc/hosts`. Do đó, chúng tôi khuyên bạn nên định cấu hình tệp `/etc/hosts` ngay sau khi triển khai. Đây là một tập tin ví dụ:
```
127.0.0.1   localhost.localdomain   localhost
103.0.113.12    username.example.com   username
```
Bạn có thể chỉ định một số hostname trên mỗi dòng được phân tách bằng dấu cách. Mỗi dòng phải bắt đầu bằng một và chỉ một địa chỉ IP. Trong ví dụ trên, thay thế `103.0.113.12` bằng địa chỉ IP máy của bạn:
```
198.51.100.30   example.com
192.168.1.1     stick.example.com
```
Trong ví dụ này, tất cả các request vào `example.com` sẽ chuyển đổi thành địa chỉ IP `198.51.100.30`, bỏ qua các bản ghi DNS cho `example.com` và trả về một trang web thay thế. Dòng thứ 2 khi request vào `stick.example.com` thì sẽ chuyển thành IP  `192.168.1.1` . Đây cũng là cách mà rất hữu ích cho việc triển khai private trong máy của mình và chỉ minhf truy cập chứ không public ra ngoài.
## Network Diagnotics
Trong phần này sẽ có một số lệnh Linux cơ bản sẽ giúp bạn đánh giá và chẩn đoán các sự cố mạng. Nếu bạn nghi ngờ các vấn đề kết nối. Điều này đặc biệt hữu ích trong trường hợp các vấn đề mạng không liên tục.
### The ping Command
Lệnh ping kiểm tra kết nối giữa máy của bạn với remote address hoặc server. Mình sẽ thử ping `Google` và `216.58.217.110`:
```
ping google.com
ping 216.58.217.110
```
Các lệnh này gửi một lượng nhỏ dữ liệu (ICMP packet) đến máy chủ từ xa và chờ phản hồi. Nếu hệ thống có thể thực hiện kết nối, hệ thống sẽ báo cáo về thời gian chuyến đi khứ hồi của Google cho mỗi packet. Đây là kết quả đầu ra khi ping tới google.com:
```
PING google.com (216.58.217.110): 56 data bytes
64 bytes from 216.58.217.110: icmp_seq=0 ttl=54 time=14.852 ms
64 bytes from 216.58.217.110: icmp_seq=1 ttl=54 time=16.574 ms
64 bytes from 216.58.217.110: icmp_seq=2 ttl=54 time=16.558 ms
64 bytes from 216.58.217.110: icmp_seq=3 ttl=54 time=18.695 ms
64 bytes from 216.58.217.110: icmp_seq=4 ttl=54 time=25.885 ms
```
Cột thời gian chỉ định bằng mili giây thời lượng của chuyến đi khứ hồi cho một packet riêng lẻ. Khi bạn thu thập lượng thông tin bạn cần, hãy sử dụng **Control + C** để làm gián đoạn quá trình. Bạn sẽ được trình bày với một số thống kê sau khi quá trình được dừng lại. Điều này sẽ giống:
```
--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3007ms
rtt min/avg/max/mdev = 33.890/40.175/53.280/7.679 ms
```
Có một số điểm dữ liệu quan trọng cần chú ý: 
* Packet Loss, hoặc sự khác biệt giữa số lượng packet được gửi và số lượng packet được trả về thành công. Con số này cho thấy tỷ lệ phần trăm của các packet bị bỏ.
* Thống kê thời gian chuyến đi khứ hồi (rtt) về thông tin báo cáo dòng cuối cùng về tất cả các phản hồi ping. Đối với ping này, chúng ta thấy rằng packet round trip nhanh nhất (phút) mất 33,89 mili giây. Packet round trip trung bình (avg) mất 40.175 mili giây. Packet dài nhất (tối đa) mất 53,28 mili giây. Một đơn vị độ lệch chuẩn duy nhất (mdev) cho bốn packet này là 7,67 mili giây. 
Lệnh ping hữu ích như một công cụ chẩn đoán không chính thức để đo độ trễ mạng point to point và là công cụ để đảm bảo bạn có thể thực hiện kết nối với remote server.
### The traceroute Command
Lệnh `traceroute` là chức năng mở rộng của lệnh ping. Nó cung cấp report về routes mà các packet lấy từ locale đến remote server. Mỗi step (máy chủ trung gian) trong routes được gọi là `hop`. Thông tin route rất hữu ích khi xử lý sự cố mạng: nếu bị mất packet trong một vài bước đầu tiên, sự cố thường liên quan đến người dùng mạng cục bộ (LAN) hoặc nhà cung cấp dịch vụ Internet (ISP). Ngược lại, nếu có mất packet gần cuối route, sự cố có thể do sự cố với kết nối máy chủ.\
Dưới đây là một ví dụ về đầu ra từ lệnh `traceroute`:
```
traceroute to google.com (74.125.53.100), 30 hops max, 40 byte packets
1 207.192.75.2 (207.192.75.2) 0.414 ms 0.428 ms 0.509 ms
2 vlan804.tbr2.mmu.nac.net (209.123.10.13) 0.287 ms 0.324 ms 0.397 ms
3 0.e1-1.tbr2.tl9.nac.net (209.123.10.78) 1.331 ms 1.402 ms 1.477 ms
4 core1-0-2-0.lga.net.google.com (198.32.160.130) 1.514 ms 1.497 ms 1.519 ms
5 209.85.255.68 (209.85.255.68) 1.702 ms 72.14.238.232 (72.14.238.232) 1.731 ms 21.031 ms
6 209.85.251.233 (209.85.251.233) 26.111 ms 216.239.46.14 (216.239.46.14) 23.582 ms 23.468 ms
7 216.239.43.80 (216.239.43.80) 123.668 ms 209.85.249.19 (209.85.249.19) 47.228 ms 47.250 ms
8 209.85.241.211 (209.85.241.211) 76.733 ms 216.239.43.80 (216.239.43.80) 73.582 ms 73.570 ms
9 209.85.250.144 (209.85.250.144) 86.025 ms 86.151 ms 86.136 ms
10 64.233.174.131 (64.233.174.131) 80.877 ms 216.239.48.34 (216.239.48.34) 76.212 ms 64.233.174.131 (64.233.174.131) 80.884 ms
11 216.239.48.32 (216.239.48.32) 81.267 ms 81.198 ms 81.186 ms
12 216.239.48.137 (216.239.48.137) 77.478 ms pw-in-f100.1e100.net (74.125.53.100) 79.009 ms 216.239.48.137 (216.239.48.137) 77.437 ms
```
Thông thường hostname và địa chỉ IP ở hai bên của 1 hop thất bại rất hữu ích trong việc xác định ai vận hành máy khi xảy ra lỗi Route. Jump không thành công được chỉ định bởi các dòng có ba dấu sao `(* * *)`.\
Bạn cũng có thể muốn chuyển tiếp thông tin theo dõi đến nhà cung cấp dịch vụ Internet (ISP) nếu bạn nghi ngờ rằng vấn đề kết nối xảy ra với mạng ISP của bạn. Ghi thông tin theo dõi là đặc biệt hữu ích nếu bạn đang gặp vấn đề không liên tục về mạng.
### The mtr Command
Lệnh `mtr`, giống như công cụ theo dõi, cung cấp thông tin về route mà lưu lượng truy cập internet đi giữa máy của bạn và remote server. Tuy nhiên, mtr cung cấp thông tin bổ sung về thời gian round trip cho packet. Theo một cách nào đó, bạn có thể nghĩ về `mtr` như một sự kết hợp của `traceroute` và `ping`. Dưới đây là một ví dụ về đầu ra từ lệnh `mtr`:
```
HOST: username.example.com              Loss%   Snt     Last    Avg     Best    Wrst    StDev
    1.  256.129.75.4                    0.0%    10      0.4     0.4     0.3     0.6     0.1
    2.  vlan804.tbr2.mmu.nac.net        0.0%    10      0.3     0.4     0.3     0.7     0.1
    3.  0.e1-1.tbr2.tl9.nac.net         0.0%    10      4.3     4.4     1.3     11.4    4.1
    4.  core1-0-2-0.lga.net.google.com  0.0%    10      64.9    11.7    1.5     64.9    21.2
    5.  209.85.255.68                   0.0%    10      1.7     4.5     1.7     29.3    8.7
    6.  209.85.251.9                    0.0%    10      23.1    35.9    22.6    95.2    27.6
    7.  72.14.239.127                   0.0%    10      24.2    24.8    23.7    26.1    1.0
    8.  209.85.255.190                  0.0%    10      27.0    27.3    23.9    37.9    4.2
    9.  gw-in-f100.1e100.net            0.0%    10      24.1    24.4    24.0    26.5    0.7
```
Giống như lệnh `ping`, `mtr` theo dõi tốc độ của kết nối trong thời gian thực cho đến khi bạn thoát khỏi chương trình với **CONTROL + C**. Để `mtr` dừng tự động và tạo report sau 10 packet, hãy sử dụng  `--report` flag:
```
mtr --report
```
Xin lưu ý rằng `mtr` sẽ tạm dừng một lúc trong khi tạo đầu ra. Để biết thêm thông tin về `mtr`. Bạn có thể xem tại [đây](https://www.linode.com/docs/networking/diagnostics/diagnosing-network-issues-with-mtr/)

[To be continue]
## Tham khảo
https://www.linode.com/docs/tools-reference/linux-system-administration-basics/