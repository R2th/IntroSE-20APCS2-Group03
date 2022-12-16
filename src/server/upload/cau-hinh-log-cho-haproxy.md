Trong bài viết trước đã tìm hiểu cơ bản về [cấu hình hệ thống cân bằng tải sử dụng HAproxy](https://viblo.asia/p/tim-hieu-ve-load-balancing-server-voi-haproxy-ByEZkoDxZQ0). Tại màn hình stats có thể xem các thông số cơ bản của các server. Tuy nhiên để theo dõi thông tin chi tiết về từng kết nối và yêu cầu, có thể ghi log ghi log của Haproxy với việc sử dụng một Syslog server như Rsyslog, Logstash, Fluend... Haproxy cung cấp log rất chi tiết với độ chính xác mili giây vầ tạo ra nhiều thông tin về lưu lượng truy cập vào cơ sở hạ tầng của hệ thống như:
* 	Thông tin lưu lượng truy cập: timing data, connections counter, trafic size…
* 	Thông tin về các quyết định của HAproxy: content switching, filtering, percistence…
* 	Thông tin các request và response: header, status code, payloads…
Bài viết này sẽ tìm hiểu về việc cấu hình ghi log của Haprox và đọc thông báo log sử dụng Rsyslog.

### 1. Cài đặt và cấu hình rsyslog

Cài đặt Rsyslog trên ubuntu: 
`sudo apt-get install –y rsyslog`

Thêm cấu hình vào */etc/rsyslog.conf* hoặc file mới trong thư muc* /etc/rsyslog.d/haproxy.conf*
```
 # Collect log with UDP
	$ModLoad imudp
	$UDPServerAddress 127.0.0.1
	$UDPServerRun 514
	
 # Creating separate log files based on the severity
 local0.* /var/log/haproxy-traffic.log
 local0.notice /var/log/haproxy-admin.log
```
Trong ví dụ này  rsyslog lắng nghe địa chỉ looppack 127.0.0.1 trên cổng UDP mặc định 514. Cấu hình này được ghi vào các file log. File được chọn trên mức độ nghiêm trọng được ghi lại: 

**emerg**: Các lỗi như hết bộ mô tả tệp hệ điều hành.

**alert**: Một số trường hợp hiếm hoi có điều gì đó không mong muốn đã xảy ra, chẳng hạn như không thể lưu phản hồi vào bộ nhớ cache.

**crit**: Không được sử dụng.

**err**: Các lỗi như không thể phân tích cú pháp map file, không thể phân tích cú pháp tệp cấu hình HAProxy và khi thao tác trên stick table bị lỗi.

**warning**: Một số lỗi quan trọng nhưng không nghiêm trọng như không đặt được tiêu đề yêu cầu hoặc không kết nối được với máy chủ định danh DNS.

**notice**: Các thay đổi đối với trạng thái của máy chủ, chẳng hạn như UP hoặc DOWN hoặc khi máy chủ bị tắt. Các sự kiện khác khi khởi động, chẳng hạn như khởi động proxy và tải mô-đun, ghi log health check…

**info**: Kết nối TCP và các chi tiết và lỗi HTTP request.

**debug**: Có thể viết code Lua tùy chỉnh để log lại các debug message.

### 2. Cấu hình ghi log HAproxy
### 
  Cấu hình log trong file HAproxy.conf với chỉ thị log:
```
global
	    log 127.0.0.1:514  local0 info
```
Lệnh này hướng dẫn Haproxy gửi log đến Rsyslog server đang lắng nghe tại 127.0.0.1:514 với kiểm soát lượng thông tin ở mức info
Để cập nhật trên các proxy khác nhau ( *frontend, backend, listen* để gửi message đến Syslog server được cấu hình trong *defaults* với chỉ thị *log global*:
```
defaults
	    log global
	    option httplog
```
Ngoài ra có thể ghi log với mức độ nghiêm trong khác nhau tại các phần như ví dụ sau:
```
frontend fe_site1
	    log 127.0.0.1 local0 notice
	    # other configuration
	

	frontend fe_site2
	    log 127.0.0.2 local0 warning
	    # other configuration
```

### 3.	HAproxy log format

 Kiểu ghi log được xác định bởi chế độ proxy đặt trong HAproxy : TCP hoặc HTTP ( mặc định là TCP)
Chế độ TCP được thiết lập bằng cách thêm mode tcp. Ngoài ra có thể tạo lại định dạng với thiết lập log-format  có dạng:

```
log -format "% ci:% cp [% t]% ft% b /% s% Tw /% Tc /% Tt% B% ts% ac /% fc /% bc /% sc /% rc% sq /% bq "
```

Định dạng log TCP trong HAproxy
Với mode http cần thêm chỉ thị *http option* để đảm bảo các request và response HTTP được phân tích chi tiết. Định dạng log với chỉ thị log-format  với dạng như sau: 
```
log -format "% ci:% cp [% tr]% ft% b /% s% TR /% Tw /% Tc /% Tr /% Ta% ST% B% CC% CS% tsc% ac /% fc / % bc /% sc /% rc% sq /% bq% hr% hs% {+ Q} r "
```
 
### 4.	Proxy

Trong file log được tạo, nội dung được bắt đầu với frontend, backend và server mà request được gửi đến. Ví dụ với cấu hình HAproxy dưới đây, các dòng log mô tả request được định tuyến qua frontend `http-in` đến backend `static` và đến server` svr1`
```
frontend http-in
	  bind :80
	  default_backend static
	

	backend static
	  server srv1 192.168.1.10:80 check
	  server srv2 192.168.1.11:80 check
```
Cấu hình này rất quan trọng khi cần biết nơi gửi request, trong trừng hợp gặp lỗi chỉ ảnh hưởng đến một số server trong hệ thống.

### 5.	Timers

Timers được cung cấp dạnh mili giây và bao gồm các sự kiện xảy ra trong một phiên, trong định dạng TCP mặc định là``` Tw / Tc / Tt```, trong HTTP là `TR / Tw / Tc / Tr / Ta ` với ý nghĩa như sau:
*  TR: tổng thời gian nhận request ( chỉ ở mode HTTP)
* Tw: tổng thời gian dành cho hàng đợi cho 1 khe hết nối
* Tc: tổng thời gian thiết lập kết nối TCP đến server
* Tc: thời gian phản hồi của server ( chỉ ở mode HTTP)
* Ta: tổng thời gian hoạt động cho request HTTP ( chỉ ở mode HTTP)
* Tt: tổng thời gian phiên TCP, từ thời điểm proxy chấp nhận nod đến thời điểm cả 2 kết thúc đều bị đóng.

### 6.	Counters

Counter cho biết tình trạng của hệ thống khi có request. HAproxy ghi lại 5 bộ đếm cho mỗi kết nối hoặc request dưới dạng: ` 0/0/0/0/0` như sau:

* Tổng số kết nối đồng thời trên HAProxy khi phiên được ghi lại.
* Tổng số kết nối đồng thời được định tuyến qua frontend này khi phiên được ghi lại.
* Tổng số kết nối đồng thời được chuyển đến kết nối backend này khi phiên được ghi lại.
* Tổng số kết nối đồng thời vẫn hoạt động trên server nàykhi phiên được ghi lại.
* Số lần thử lại được thử khi cố gắng kết nối với frontend server.

### 7.	Bật cấu hình HAproxy

 Để ghi lại thời gian CPU xử lý request trong HAproxy, có thể thêm chỉ thị `profiling.tasks` trong global
```
global
	    profiling.tasks on
```
Các thông số có thể được ghi lại như sau:
* **date_us**: Phần micro giây của ngày.
* **cpu calls**: Số lượng lệnh gọi đến tác vụ đang xử lý luồng hoặc yêu cầu hiện tại kể từ khi nó được cấp phát. Nó được đặt lại cho mỗi yêu cầu mới trên cùng một kết nối.
* **cpu_ns_avg**: Số nano giây trung bình dành cho mỗi lần gọi tác vụ xử lý luồng hoặc yêu cầu hiện tại.
* **cpu_ns_tot**: Tổng số nano giây dành cho mỗi lần gọi tác vụ xử lý luồng hoặc yêu cầu hiện tại.
* **lat_ns_avg**: Số nano giây trung bình được sử dụng giữa thời điểm tác vụ xử lý luồng được đánh thức và thời điểm nó được gọi hiệu quả.
* **lat_ns_tot**: Tổng số nano giây giữa thời điểm tác vụ xử lý luồng được đánh thức và thời điểm được gọi hiệu quả.

Thêm các thông số này vào file log như sau:
```
log -format "% {+ Q} r cpu_calls: % [cpu_calls] cpu_ns_tot: % [cpu_ns_tot] cpu_ns_avg: % [cpu_ns_avg] lat_ns_tot: % [lat_ns_tot] lat_ns_avg: % [lat_ns_avg] 
```