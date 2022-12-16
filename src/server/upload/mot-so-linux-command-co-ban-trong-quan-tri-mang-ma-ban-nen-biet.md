Là một kỹ sư lập trình hệ thống, một system admin hay một DevOps… thì phần lớn thời gian bạn sẽ phải làm việc trên hệ thống Unix/Linux. Networking là một phần thiết yếu của hệ điều hành. Vì vậy, công việc giám sát, chẩn đoán và khắc phục các sự cố về mạng là một phần thiết yếu trong công việc của các quản trị viên nói chung. 

Khi nói đến quản trị mạng linux, có rất nhiều lệnh và tiện ích có sẵn hỗ trợ rất tốt cho bạn. Trong phạm vi bài viết này, mình sẽ giới thiệu đến các bạn một số **Linux Networking Commands** cơ bản và hữu ích trong danh sách của mình, thường được sử dụng trong nhiều trường hợp, cho phép bạn có thể đơn giản, nhanh chóng khắc phục các sự cố kết nối mạng nhé!

# 1. ifconfig 
`ifconfig` là viết tắt của *interface configurator* tức là trình cấu hình giao diện mạng. Đây là một trong những lệnh cơ bản nhất được sử dụng trong việc kiểm tra mạng. Ta sẽ thu được các thông tin cơ bản về cấu hình mạng khi sử dụng ifconfig như: địa chỉ ip, địa chỉ mac, MTU (Maxium Transmission Unit - là kích thước gói dữ liệu lớn nhất, được đo bằng byte, có thể truyền tải qua một mạng lưới). Lệnh này thường được sử dụng để đặt hoặc hiển thị địa chỉ IP và netmask của giao diện mạng. Nó cũng cung cấp các lệnh để bật hoặc tắt một giao diện mạng.

Một số cú pháp lệnh `ifconfig`:
- `ifconfig  -a` - Liệt kê tất cả các inteface hiện đang có, kể cả các interface không sử dụng.
- `ifconfig <interface>` - Thông tin chi tiết của một interface cụ thể.
- `ifconfig <interface> <address> netmask <address>` - Gán địa chỉ IP và Gateway cho một giao diện. Tuy nhiên, các cấu hình này sẽ được thiết lập lại sau khi hệ thống khởi động lại.
- `ifup <interface>` hay `ifdown <interface>` - Để bật hay tắt một interface.
# 2. ip
`ip` như là một phiên bản cập nhật và mới nhất của lệnh ifconfig. Lệnh ip tương tự như ifconfig, nhưng mạnh mẽ hơn rất nhiều. Với ip, bạn có thể thực hiện các nhiệm vụ quản trị mạng chỉ với một lệnh. Gần như trên các hệ thống CentOS systemd mới thì một vài chương trình cũ sẽ bị xoá bỏ mặc định khi cài đặt như ‘route‘, ‘ifconfig‘ hay ‘netstat‘. Bạn nên học cách sử dụng công cụ lệnh ‘ip’ này vì tính tiện dụng của nó. 

Một số cú pháp lệnh `ifconfig`:
- `ip a ` - Lệnh này cung cấp thông tin chi tiết của tất cả các mạng như ifconfig.
- `ip link` - Cấu hình, thêm và xóa các interface. Sử dụng `ip link show` để hiển thị tất cả các interface trên hệ thống.
- `ip address` - Hiển thị địa chỉ ip, gắn địa chỉ ip mới hoặc xóa địa chỉ ip chỉ cũ.
- `ip route` - Được sử dụng để Cấu hình quản lý bảng định tuyến.
# 3. hostname
Lệnh `hostname` trong Linux được sử dụng để xem hoặc thay đổi tên hostname hoặc system’s domain. Nó cũng có thể được dùng kiểm tra địa chỉ IP của máy tính.

Một số cú pháp lệnh `hostname`:
- `hostname` - Hiển thị hostname
- `hostname --all-ip-addresses` - Hiển thị tất cả các địa chỉ IP
- `sudo hostname <new hostname>` - Thay đổi hostname. Tuy nhiên thay đổi bằng hostname chỉ tạm thời. Sau khi reboot, hostname sẽ bị đưa trở về như cũ.
# 4. ping
`ping` là viết tắt của Packet INternet Groper. Đây là một trong những lệnh khắc phục sự cố mạng được sử dụng nhiều nhất. Về cơ bản, `ping` kiểm tra kết nối giữa 2 nút trong 1 mạng. Nó sẽ gửi các gói tin echo ICMP (Internet Control Message Protocol) và chờ đợi phản hồi. Khi những gói tin echo này được gửi đến 1 nút mạng, nút mạng đó phản hồi lại các gói tin này nếu nó đang hoạt động và đang kết nối.

Kết quả ping giữa 2 nút mạng sẽ cho ta những thông tin hữu ích như:
- Tình trạng của nút đích: nó có kết nối được tới được không
- Thời gian một vòng di chuyển giữa 2 nút: Host–Computer-Host
- Phần trăm lượng packet bị mất trong quá trình truyền

Một số cú pháp lệnh `ping`:
- `ping <destination>` - Lệnh ping gửi gói tin echo ICMP để kiểm tra kết nối mạng, destination có thể là tên miền hoặc địa chỉ ip trực tiếp
- `ping -c <number> <destination>` - Bạn có thể giới hạn số lượng gói tin bằng cách thêm " -c " vào lệnh ping.

Tốc độ phản hồi của lệnh ping sẽ bị ảnh hưởng bởi chất lượng kết nối ở hệ thống của bạn và cả vị trí của máy chủ mà bạn đang ping. Vì vậy, nếu kết nối yếu, sẽ có độ trễ lớn trong phản hồi của lệnh ping.
# 5. telnet
`telnet` là lệnh sẽ thực hiện kết nối máy chủ và máy đích thông qua một port bằng cách sử dụng giao thức telnet TCP/IP. Nếu kết nối được thiết lập có nghĩa là kết nối giữa hai máy đang hoạt động tốt.

Cú pháp của lệnh `telnet`:
```
telnet <hostname/IP address> <port>  
```

Trong trường hợp bạn không xác định một port cụ thể nào thì telnet sẽ sử dụng port mặc định là 23. Lệnh này thực sự hữu ích trong các trường hợp, khi bạn cần phải kiểm tra xem các cổng cần được mở trên máy tính của bạn và ở phía bên của máy chủ từ xa.
# 6. traceroute
Nếu như sử dụng `ping` hiển thị cho bạn thấy các gói tin bị mất mát trong kết nối thì `traceroute` cho thấy đường đi được sử dụng, trình tự các cổng mà các gói tin đi qua để có thể đến được đích. `traceroute` chính là một trong những lệnh hữu ích nhất trong khắc phục sự cố mạng qua những thông tin mà lệnh nàu cung cấp gồm:
- Cung cấp tên và xác định mọi thiết bị trên đường dẫn.
- Theo dõi lộ trình để đến đích của gói tin.
- Xác định và chỉ ra vị trí các sự cố trong kết nối mạng, độ trễ trong kết nối mạng đến từ đâu.

Cú pháp câu lệnh `traceroute`:
```
traceroute <option> <destination>
```
# 7. nslookup
`nslookup` là lệnh được sử dụng để thực hiện các tra cứu liên quan đến DNS. `nslookup` có thể cho chúng ta biết các thông tin quan trọng như MX records và địa chỉ IP liên kết với tên miền. 

Cú pháp lệnh `nslookup`:
```
nslookup <domainName>
``` 
# 8. dig
`dig` là viết tắt của Domain Information Groper, có nghĩa là công cụ tìm kiếm thông tin tên miền. Nó có tác dụng để kiểm tra và xử lí sự cố DNS Server, tìm kiếm DNS và hiển thị các nội dung được yêu cầu. Lệnh `dig` như là một phiên bản mới hơn của `nslookup`, có thể thay thế cho những công cụ cũ trước đây là `nslookup` hay `host` và được sử dụng phổ biến để khắc phục sự cố DNS vì tính linh hoạt và dễ sử dụng của nó.

Cú pháp lệnh `dig`:
- `dig <domainName>` - Đây là lệnh truy vấn DNS cơ bản. Theo mặc định, nó sẽ xuất ra các bản ghi A
- `dig <domainName> MX` - Truy vấn các bản ghi MX
- `dig <domainName> NS` - Truy vấn các bản ghi NS
- `dig <domainName> ANY` - Truy vấn tất cả các loại bản ghi
# 9. Netstat
`netstat` là một công cụ dòng lệnh rất hữu ích khi nó giúp ta hiển thị các thông tin bảng định tuyến, thông tin kết nối, trạng thái của các cổng, các cài đặt và nhiều các thống kê mạng khác nhau,... 

Một số cú pháp lệnh `netstat`:
- `netstat -i` - Liệt kê các interface
- `netstat -r` - Hiển thị bảng định tuyến

Còn có rất nhiều các biến thể khác nhau trong cú pháp câu lệnh `netstat` và về lệnh này thì trước đây mình đã từng có hẳn một viết riêng cho cách sử dụng của nó. Các bạn có thể tham khảo thêm về `netstat` tại [đây nhé](https://viblo.asia/p/linux-networking-su-dung-netstat-quan-ly-mang-tren-linux-Az45bL7oZxY). Trong tương lai mình cũng sẽ cố gắng để bổ sung các bài viết chi tiết cho cách sử dụng của từng lệnh này, các bạn hãy theo dõi và ủng hộ mình nhé :D
# Tạm kết

Network trong Linux là một chủ đề rộng, với một số lượng lớn các lệnh và công cụ hỗ trợ khác nhau. Trong bài viết này, mình đã giới thiệu đến các bạn về một số lệnh cơ bản thường được sử dụng, hy vọng sẽ giúp ích cho các bạn trong việc quản lý và bảo mật mạng của mình.
# Nguồn tham khảo
- https://mindmajix.com/linux-networking-commands-best-examples#netstat