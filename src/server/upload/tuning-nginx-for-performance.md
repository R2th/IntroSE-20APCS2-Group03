# 1. Giới thiệu
NGINX được biết đến là một load balancer hiệu suất cao, cache và web-server, cung cấp cho khoảng 40% hệ thống website trên thế giới. Trong hấu hết các trường hợp, cài đặt mặc định của NGINX và Linux vẫn hoạt động tốt. Tuy nhiên để đạt hiệu suất tốt hơn, đôi khi cần điều chỉnh một chút. Bài viết này thảo luận về vấn đề cài đặt NGINX và Linux để điều chỉnh một hệ thống.
# 2. Tùy chỉnh cấu hình Linux
Các cài đặt trong modern [Linux kernels](https://en.wikipedia.org/wiki/Linux_kernel) (2.6+) phù hợp với hầu hết các mục đích, nhưng thay đổi 1 số trong đó cũng có thể đem lại lợi ích. Chúng ta có thể kiểm tra nhật ký kernel cho các thông báo lỗi để biết những cài đặt quá thấp và điều chỉnh nó theo khuyến cáo. Ở đây chúng ta chỉ đề cập đến những cài đặt có ích với hệ thống trong điều kiện khối lượng công việc bình thường.
## 2.1. The Backlog Queue

  Các cài đặt sau liên quan đến các kết nối và cách chúng được xếp trong hàng đợi. Nếu bạn đang có lượng kết nối và mức hiệu suất không đồng đều, các thay đổi sau đây có thể giúp bạn:
  - `net.core.somaxconn`: Đây là số lượng kết nối tối đa có thể được xếp hàng để NGINX chấp nhận. Mặc định số này thường rất thấp, vì NGINX thường chấp nhận và xử lý kết nối rất nhanh. Nhưng nó sẽ gặp vấn đề nếu trang web của bạn có lượng truy cập lớn đột ngột. Nếu thông bão lỗi trong nhật ký kernel cho thấy giá trị này quá nhỏ thì hãy tăng nó lên cho đến khi hết lỗi.
  Chú ý: Nếu bạn đặt giá trị này lớn hơn 512, hay thay đổi tham số backlog để khớp với NGINX [listen](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen).
  - `net.core.netdev_max_backlog`: Tốc độ mà các gói được đệm bởi card mạng trước khi đưa vào CPU. Tăng giá trị này có thể cải thiện hiệu suất trên các máy có lượng băng thông lớn. 
  
## 2.2. File Descriptors
File descriptors là các tài nguyên của hệ điều hành được sử dụng để thể hiện các kết nối và các open file. NGINX có thể sử dụng tối đa 2 file cho mỗi kết nối. Đối với các hệ thống có lượng kết nối lớn, có thể cần các điều chỉnh cài đặt sau:
- `sys.fs.file-max`: giới hạn system-wide cho các file descriptors.
- `nofile`: giới hạn người dùng file descriptor. Được xét trong file `/etc/security/limits.conf`

## 2.3. Ephemeral Ports
Khi NGINX hoạt động như một proxy, mỗi kết nối để máy chủ sử dụng một cổng tạm thời. Bạn có thể thay đổi cài đặt này:
- `net.ipv4.ip_local_port_range`: phạm vi bắt đầu và kết thúc của các giá trị cổng. Nếu nhận thấy rằng bạn sắp hết cổng, hãy tăng phạm vi này lên. Cài đặt phổ biến là từ 1024 đến 65000.

# 3. Tùy chỉnh cầu hình NGINX

## 3.1. Worker Processes
NGINX có thể chạy nhiều tiến trình worker, mỗi tiến trình có khả năng xử lý số lượng lớn các kết nối đồng thời. Bạn có thể kiếm soát số lượng tiến trình worker và cách chúng xử lý các kết nối:
- [worker_processes](https://nginx.org/en/docs/ngx_core_module.html?&_ga=2.65606310.921667635.1558363509-505028202.1558363509#worker_processes): Số lượng tiến trình worker (mặc định là 1). Trong hấu hết các trường hợp, việc chạy 1 tiến trình trên mỗi lõi CPU đảm bảo hệ thống hoạt động tốt. Nhưng đôi khi bạn muốn tăng số lượng này, chẳng hạn như khi các tiến trình worker phải thực hiện nhiều đĩa I/O.
- [worker_connections](https://nginx.org/en/docs/ngx_core_module.html?&_ga=2.91844626.921667635.1558363509-505028202.1558363509#worker_connections): Đây là số lượng kết nối tối đa mà woker có thể đồng thời xử lý. Mặc ddingj là 512, nhưng hầy hết các hệ thống có đủ tài nguyên để hỗ trợ số lượng lớn hơn. Cài đặt tùy thuộc vào kích thước server và lượng truy cập thực tế.

## 3.2. Keepalive Connections (Kết nối cố định - duy trì)
[Keepalive connections](https://www.nginx.com/blog/http-keepalives-and-web-performance/) có thể tác động lớn đến hiệu suất bẳng cách giảm CPU và chi phí mạng cần thiết để mở và đóng kết nối. NGINX chấm dứt tất cả các kết nối đến client và tạo các kết nối riêng và độc lập đến các server. NGINX hỗ trợ keepalives cho cả client và server. 
Có các cài đặt sau về keepalives client:
- `keepalive_requests`: số lượng request client có thể thực hiện qua 1 kết nối keepalive duy nhất. Mặc định là 100, nhưng giá trị cao hơn có thể hữu ích khi muốn gửi 1 số lượng lớn yêu cầu từ client.
- `keepalive_timeout`: thời gian để mở một kết nối keepalive.
Các cài đặt về keepalives server:
- keepalive: số lượng kết nối keepalives đến server mở cho mỗi tiến trình worker. Không có giá trị mặc định

Để kích hoạt kết nối keepalive cho server bạn cần phải cấu hình như sau:
```
proxy_http_version 1.1;
proxy_set_header Connection "";
```

## 3.3. Access Logging (Nhật ký truy cập)
Việc ghi lại tất cả các request có gây tốn cả CPU và chu kỳ I/O. Cách để giảm thiểu việc này là bật chế độ access‑log buffering. Với buffering, thay vì thực hiện một loạt thao tác cho từng mục nhất ký riêng, NGINX giữ lại một loạt các mục và ghi chúng đồng thời trong 1 thao tác.
Để bật chế độ access‑log buffering, thêm tham `số buffer-size` cho cài đặt `access_log`.  NGINX sẽ ghi nội dung trong bộ nhớ đệm vào log khi bộ nhớ đệm đạt kích thước bằng `size` đã cài đặt. Để NGINX ghi bộ nhớ đệm sau 1 khoảng thời gian xác định, ta thêm tham số `flush=time`.
Để tắt nhật ký, chỉ cần thêm tham số `off` cho cài đặt `access_log `.

## 3.4. Limits
Bạn có thể đặt một số giới hạn để hạn chế client tiêu thụ quá nhiều tài nguyên. Tuy nhiên việc này ảnh hưởng đến hiệu suất và trải nghiệm người dụng. Tùy thuộc vào mục đích và yêu cầu của hệ thống mà tùy chỉnh cài đặt này:
- `limit_conn` và `limit_conn_zone`: giới hạn số lượng kết nối client mà NGINX chấp nhận, ví dụ: từ một địa chỉ IP duy nhất. Cài đặt giới hạn này để ngăn client cá nhận mở quá nhiều kết nối dẫn đến tiêu tốn quá nhiều tài nguyên.
- `limit_rate`: Giới hạn tốc độ mà các responses trả về cho một client, trên mỗi kết nối (để client mở nhiều kết nối có thể tiêu thụ lượng băng thông nhất ddingj cho mỗi kết nối này). Cài đặt này có thể ngăn hệ thống bị quá tải bời số lượng client nhất định, và đảm bảo chất lượng dịch vụ đồng đều với tất cả client.
- `limit_req` và `limit_req_zone`: giới hạn tỷ lệ request đang được NGINX xử lý, có lợi ích tương tự với limit_rate.
# 4. Caching and Compression

## 4.1. Caching
Bằng cách bật caching trên NGINX bạn có thể cải thiện đáng kể thời gian response cho client đồng thời giảm đáng kể tải trên server backend. 

## 4.2. Compression
Nén responses gửi đến client có thể làm giảm đáng kể kích thước của nó, vì vậy chúng sử dụng ít bằng thông hơn. Tuy nhiên việc nén dữ liệu sẽ tiêu tốn tài nguyên CPU, nên nó chỉ hưu ích khi đang cần giảm độ tiêu tốn bẳng thông của hệ thống.
Một chú ý là bạn không nên bật tính năng nén cho các đối tượng đã được nén, chẳng hạn như file JPEG.

# Nguồn
https://www.nginx.com/blog/tuning-nginx/