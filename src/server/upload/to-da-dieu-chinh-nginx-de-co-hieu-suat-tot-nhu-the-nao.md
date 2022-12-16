# Giới thiệu
Xin chào, trong bài viết lần này tớ sẽ chia sẻ về cách mà tớ đang sử dụng để giúp Nginx đạt được hiệu suất tốt. Thông thường, nếu như nginx được cấu hình đúng thì có thể xử lý tối đa 400k đến 500k request mỗi giây (clustered), hầu hết tớ thấy là 50k - 80k (non-clustered) request mỗi giây và CPU đạt 30% với loại `2 x Intel Xeon` với HyperThreading được bật,  nhưng nó có thể hoạt động mà không gặp vấn đề gì trên các máy chậm hơn.

Config này được sử dụng trong môi trường test chứ không phải production, vì vậy nếu bạn muốn áp dụng thì nên tìm cách implement những cái phù hợp cho server của bạn.

# Thực hiện
## Cài đặt Nginx
Đầu tiên, chúng ta cần cài đặt nginx (bỏ qua nếu bạn đã cài sẵn rồi), ở đây mình dùng ubuntu:
```bash
sudo apt install nginx
```

## config nginx
Tiếp đến chúng ta cần backup config và sau đó bạn có thể cấu hình lại với config mới. Bạn cần mở `/etc/nginx/nginx.conf ` :
```nginx
# bạn cần set worker processes dựa trên CPU core, nginx không được hưởng từ việc settting nhiều hơn thế
worker_processes auto; # một vài version mới sẽ tự động tính toán nó

# số lượng file descriptors sử dụng cho nginx
# giới hạn cho các file descriptors trên server thường đưuọc set vởi OS
# nếu bạn không set file descriptors thì mặc định sẽ là 2000
worker_rlimit_nofile 100000;

# chỉ log những lỗi "chí mạng" (critical) :)))
error_log /var/log/nginx/error.log crit;

# cung cấp file cấu hình mà trong đó các lệnh ảnh thưởng đến connection processing được chỉ định
events {
    # xác định có bao nhiêu client sẽ được phục vụ mỗi worker
    # max clients = worker_connections * worker_processes
    # max clients cũng bị giới hạn số lượng socket connections có sẵn trên hệ thống (khoảng 64k)
    worker_connections 4000;

    # tối ưu để phục vụ nhiều client với mỗi thread, cần thiết cho linux (cho môi trường test)
    use epoll;

    # accept càng nhiều kết nối càng tốt, có thể flood worker connection nếu set cho nó quá thấp (cho môi trường test)
    multi_accept on;
}

http {
    # cache thông tin về FDs (file descriptors), files thường xuyên truy cập
    # có thể tăng hiệu suất, nhưng bạn cũng cần test các giá trị này
    open_file_cache max=200000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;

    # để boost I/O trên HDD, chúng ta có thể disable access log
    access_log off;

    # sao chép data
    # nhanh hơn đọc + ghi
    sendfile on;

    # gửi header trong 1 cục thay vì gửi từng cái
    tcp_nopush on;

    # không buffer data sent, tốt cho dữ liệu nhỏ trong thời gian thực
    tcp_nodelay on;

    # giảm data cần gửi qua network (cho môi trường test)
    gzip on;
    # gzip_static on;
    gzip_min_length 10240;
    gzip_comp_level 1;
    gzip_vary on;
    gzip_disable msie6;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types
        # text/html luôn luôn được nén bởi HttpGzipModule
        text/css
        text/javascript
        text/xml
        text/plain
        text/x-component
        application/javascript
        application/x-javascript
        application/json
        application/xml
        application/rss+xml
        application/atom+xml
        font/truetype
        font/opentype
        application/vnd.ms-fontobject
        image/svg+xml;

    # cho phép server đóng connection với client không còn được tương tác, nó sẽ giúp giải phóng bộ nhớ
    reset_timedout_connection on;

    # request timed out, mặc định là 60s
    client_body_timeout 10;

    # nếu client ngừng tương tác, giải phóng bộ nhớ, mặc định là 60s
    send_timeout 2;

    # set thời gian server sẽ đóng connection, mặc định là 75s
    keepalive_timeout 30;

    # số lượng request từ client có thể thực hiện liên tục (cho môi trường test)
    keepalive_requests 100000;
}
```
Sau khi chỉnh sửa xong, bạn cần reload nginx:
```bash
nginx -s reload
/etc/init.d/nginx start|restart
```
Nếu bạn muốn test config thì chạy lệnh sau:
```bash
nginx -t
/etc/init.d/nginx configtest
```
## Chống DDoS
Cách làm này khác xa với secure DDoS nhưng có thể làm chậm một số DDoS nhỏ. Những cấu hình này cũng trong môi trường thử nghiệm và bạn nên tự custom lại cho phù hợp.
```nginx
# giới hạn số lượng connections với mỗi IP
limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;

# giới hạn số lượng reqest cho session
limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;

# nơi mà chúng ta sẽ giới hạn bởi các giá trị trên, ở đây thì mình làm với toàn bộ server
server {
    limit_conn conn_limit_per_ip 10;
    limit_req zone=req_limit_per_ip burst=10 nodelay;
}

# nếu như request body size lớn hơn buffer size, thì sau đó toàn bộ (hoặc một phần) request body được ghi vào file tạm
client_body_buffer_size  128k;

# buffer size cho việc đọc client request header (cho môi trường test)
client_header_buffer_size 3m;

# số lượng và buffer size tối đa cho các header lớn để đọc từ yêu cầu của client
large_client_header_buffers 4 256k;

# đặt timeout cho client body (cho môi trường test)
client_body_timeout   3m;

# đặt thời gian chờ cho client gửi request header (cho môi trương test)
client_header_timeout 3m;
```

Test lại config:
```bash
nginx -t # /etc/init.d/nginx configtest
```

Nếu mọi thứ ok thì reload hoặc restart nginx:
```bash
nginx -s reload
/etc/init.d/nginx reload|restart
```
Bạn có thể test cấu hình với `tsung` và khi bạn thấy ok với kết quả nhậ được, bạn có thể nhấn `Ctr + C` (hủy) vì nó có thể chạy nhiều giờ.

# Tổng kết
Trên đây là cách tớ đã sử dụng để cài đặt nginx với hiệu suất khá ổn :)) hy vọng sẽ giúp ích cho bạn, cảm ơn bạn đã đọc đến đây <3

Happy coding !!! <3 <3 <3