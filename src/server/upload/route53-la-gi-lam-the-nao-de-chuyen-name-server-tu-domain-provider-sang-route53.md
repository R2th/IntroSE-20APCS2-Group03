## Route53 là gì?

Amazon Route 53 là một dịch vụ web đám mây (DNS) có khả năng duy trì mở rộng cao. Nó được thiết kế để cung cấp cho các nhà phát triển và doanh nghiệp cách để định tuyến end user đến các ứng dụng Internet một cách đáng tin cậy và hiệu quả bằng việc dịch tên như www.example.com vào địa chỉ IP như 192.0.2.1 để các máy tính có thể kết nối đến nhau. Router 53 cũng hoàn toàn tuân thủ IPv6.

Amazon Route 53 kết nối hiệu quả các request của người dùng với hệ thống infra đang chạy trong AWS - chẳng hạn như các instance Amazon EC2, Elastic Load Balancer hoặc Amazon S3  bucket - và cũng có thể được sử dụng để định tuyến người dùng đến các hệ thống infra ngoài AWS. Lưu lượng truy cập Amazon Route 53 giúp bạn dễ dàng quản lý lưu lượng trên toàn cầu thông qua nhiều loại định tuyến khác nhau, bao gồm Định tuyến dựa trên độ trễ (Latency Based Routing), DNS địa lý (Geo DNS), Geoproximity và Round Robin có trọng số (Weighted Round Robin) - tất cả những thứ có thể kết hợp với DNS chịu lỗi để cho phép nhiều loại định tuyến và kiến thức chịu lỗi. Sử dụng trình chỉnh sửa trực quan đơn giản của Amazon Route 53 Traffic Flow, bạn có thể dễ dàng quản lý cách các end user đưuocj định tuyến tới endpoint của ứng dụng của bạn - kể cả trong một AWS region đơn lẻ hay phân phối ra toàn cầu. Amazon Route 53 cũng cũng cấp việc đăng ký tên miền, bạn có thể mua và quản lý các tên miền ví dụ như example.com và Amazon Route 53 sẽ tự động điều chỉnh DNS setting cho domain của bạn.

### Các loại định tuyến của Route 53

Simple routing policy – Sử dụng cho một tài nguyên duy nhất thực hiện một chức năng nhất định cho tên miền của bạn, ví dụ: máy chủ web phục vụ nội dung cho trang web example.com.

Failover routing policy – Sử dụng khi bạn muốn cấu hình chuyển đổi dự phòng thụ động.

Geolocation routing policy – Sử dụng khi bạn muốn định tuyến người dùng dựa vào vị trí địa lý 

Geoproximity routing policy – Sử dụng khi bạn muốn định tuyến lưu lượng dựa trên vị trí của tài nguyên của mình và, tùy ý, chuyển lưu lượng truy cập từ tài nguyên ở vị trí này sang tài nguyên khác.

Latency routing policy – Sử dụng khi bạn có tài nguyên trong nhiều Vùng AWS và bạn muốn định tuyến lưu lượng truy cập đến khu vực cung cấp độ trễ tốt nhất.

Multivalue answer routing policy – Sử dụng khi bạn muốn Route 53 trả lời các truy vấn DNS với tối đa tám bản ghi healthy (khoẻ mạnh) được chọn ngẫu nhiên.

Weighted routing policy – Sử dụng để định tuyến lưu lượng truy cập đến nhiều tài nguyên theo tỷ lệ mà bạn chỉ định.

## Chuyển Name Server từ Domain provider sang Route53

Tôi đã đăng ký được domain của mình từ Domain provider, nhưng tôi không muốn quản lý domain này ở console của Domain provider mà muốn làm việc đó thông qua Amazon Route 53, vậy tôi phải làm thế nào?

### Tạo Host Zone mới ở Route 53

- Login vào AWS, từ phần Services chọn vào Route 53 và mở ra dashboard
- Chọn vào mục Host zone ở side menu
- Ấn vào Create Host Zone, sau đó nhập tên miền của bạn, để trống mục Comment, và chọn Public Host Zone cho mục Type, sau đó ấn Create
- Lúc này Host Zone mới được tạo ra, cùng với đó sẽ có một tập các Name Server (NS) record được tạo ra
- Các DNS server này sẽ được sử dụng sau

### Thao tác với Console của Domain provider

- Đăng nhập vào tài khoản Console của Domain provider
- Chọn vào Domain bạn muốn chuyển sang quản lý ở Route 53
- Tạo ra các record mới có type là Name Server (NS) và Value là các giá trị của các record được tạo ra khi ta tạo mới Route53

Lúc này việc quản lý domain đã được chuyển sang Route 53.

### Kiểm tra lại

Bạn vào terminal, gõ câu lệnh sau (giả sử tên miền của bạn là example.com)

```
~:$ nslookup -type=ns example.com
```

Kết quả sẽ hiển thị ra theo dạng như sau nếu bạn thiết lập thành công

```
Server:         8.8.8.8
Address:        8.8.8.8#53

Non-authoritative answer:
example.com   nameserver = ns-1101.awsdns-09.org.
example.com   nameserver = ns-1859.awsdns-40.co.uk.
example.com   nameserver = ns-393.awsdns-49.com.
example.com   nameserver = ns-950.awsdns-54.net.
```

### Trỏ tên miền vào IP mong muốn

- Quay trở lại màn hình quản lý Route 53
- Ấn vào Create record set
- Mục Name để mặc định là tên miền của bạn, mục Type bạn hãy chọn A - IPv4 address, mục Value hãy điền IP của server bạn muốn trỏ đến, mục TTL hãy để default
- Ấn Create

Hãy kiểm tra lại bằng cách vào Browser và truy cập vào tên miền, nội dung ở server của bạn đã hiển thị lên rồi đó.