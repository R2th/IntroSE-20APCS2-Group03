# Mở đầu
Hôm nay mình muốn giới thiệu đến các bạn một ứng dụng khá là hay, thường được cài đặt cùng với cụm Redis Replicaiton để bổ sung khả năng Fail-over hay tăng khả năng High Availability cho Redis. Nếu các bạn đã từng thử setup 1 cụm Redis Replication tiêu chuẩn với 1 node Master với chức năng đọc ghi và 2 node Slave để backup dữ liệu thì chắc các bạn sẽ không còn lạ gì với từ Sentinel. Sentinel được cài đặt và cấu hình vô cùng dễ dàng, cùng với đó là cách hoạt động rất dễ hiểu. Chúng ta cũng bắt đầu tìm hiểu nhé.
![image.png](https://images.viblo.asia/2c75b4ac-3ad4-4d94-b277-a5cd7c6bf5ee.png)

# Redis Sentinel là cái gì?
Redis Sentinel dùng để giám sát các node trong cụm Redis, ví dụ như hình trên, các node có service redis-sentinel sẽ giám sát các node Master và Slave trong cụm Replication, sau đó sẽ ghi lại log các hoạt động như restart, stop, start của service redis-server. 

Nghe có vẻ hay đấy, vậy ghi lại để làm gì? Việc ghi lại log này sẽ phục vụ cho việc Fail-over (Chuyển đổi dự phòng). Nếu như trước đây bạn chỉ cài đặt lên cụm replication thì khi node Master có vấn đề (down) thì bạn sẽ phải login vào server, khắc phục thủ công bằng tay bằng cách nâng 1 con slave bất kỳ lên làm Master . Tuy nhiên khi sử dụng Sentinel thì service này sẽ giúp bạn tự động hóa việc này.

Sau 1 khoảng thời gian nhất định khi Sentinel không thể kết nối với Master node bằng cách gửi command `PING` đi mà không nhận được về `PONG` thì sẽ đánh dấu Node này đã bị down. Tiếp theo để đảm bảo tính chính xác, node này sẽ hỏi các node Sentinel khác rằng "ê mày có thấy thằng Master này down không?" . Nếu 1 số node nhất định cùng đồng ý rằng thằng Master này down (số node cần được xác định bằng thông số quorum trong config với công thức `số node sentinel/2 + 1`  tương đương hơn 1 nửa) thì các node Sentinel sẽ cùng nhau bầu ra 1 Master mới. Còn nếu số node không đủ như yêu cầu thì quá trình bầu ra Master mới sẽ bị hoãn.

Oke giờ chúng ta sẽ cùng tìm ra 1 node Slave phù hợp để biến nó thành Master. Vậy trong các node Slave còn lại, node nào sẽ được chọn làm Master? Dựa trên các tiêu chí nào? Khá đơn giản, việc chọn ra master tiếp theo dựa trên thông số `slave-priority` được cấu hình trong file config `/etc/redis/redis.conf`, nếu thông số không được cấu hình thì Sentinel sẽ tự gen ra ID bất kỳ và node nào có ID thấp hơn sẽ được chọn làm Master.

# Cài đặt và cấu hình
### Cài đặt
```
apt install redis-sentinel -y (Ubuntu và Debian)
yum install redis-sentinel -y (CentOS)
```
 
 ### Cấu hình
 Cấu hình Sentinel thì cũng khá đơn giản, dưới đây là cấu hình mẫu của mình:
```
daemonize yes
pidfile "/var/run/redis/redis-sentinel.pid"
logfile "/var/log/redis/redis-sentinel.log"
bind 0.0.0.0
port 26379
dir "/var/lib/redis"
sentinel monitor mymaster 10.5.9.198 6379 2
sentinel down-after-milliseconds mymaster 3000
sentinel failover-timeout mymaster 10000
sentinel auth-pass mymaster password
maxclients 4064
sentinel current-epoch 1
```
Giải thích các thông số chính:
* **bind:** Địa chỉ mà bạn muốn Sentinel lắng nghe (ở đây 0.0.0.0 tức là bạn có thể truy cập từ mọi IP)
* **port:** port mà Sentinel hoạt động
* **sentinel monitor:** Khai báo địa chỉ node master cần giám sát (các thông số lần lượt là <tên cụm> <Master_IP> <Master_Port> < quorum>)
* **sentinel down-after-milliseconds:** Khai báo thời gian mà Sentinel sẽ xác định node Master đã down (ở đây sau khi 3s không kết nối được Master thì Sentinel sẽ cho rằng node này đã down).
* **sentinel failover-timeout:** Thời gian sẽ hủy quá trình fail-over nếu chưa thành công.
* **sentinel auth-pass:** Nếu Node Master bạn có password thì thêm config này để có thể truy cập được, không có pass thì bỏ dòng này.

# Thử nghiệm
Sau khi đã cấu hình xong, Sentinel sẽ kết nối đến Master Node lấy các thông tin về Slave Node và Sentinel Node để giám sát. Cùng với đó các node Sentinel cũng sẽ giám sát chéo nhau.

Thử stop node Master, trên các node Sentinel sử dụng câu lệnh `tail -f /var/log/redis/redis-sentinel.log` để xem quá trình fail-over.
![image.png](https://images.viblo.asia/c4ef6b3e-9bec-46b6-a0ab-eb8d32939d7c.png)

1. Đầu tiên Sentinel xác định node master đã down nên khởi tạo **vote-for-leader**
1. Xác định số node sentinel cần thiết để vote master 3 > 2 (thỏa mãn)
2. Cập nhật lại cấu hình, tiến hành thay đổi Master **switch-master** sang node **10.5.9.126**
3. Cập nhật các Slave mới cho node Master và Master cho các node Slave. Kết thúc quá trình fail-over.

Ngoài ra, redis sentinel còn có khả năng giám sát nhiều master cùng lúc bằng cách sử dụng command `sentinel monitor <name> <MASTER_IP> <MASTER_PORT> <quorum>`

# Kết
Sentinel là một cộng cụ giúp đơn giản mà vô cùng hiệu quả trong việc thực hiện Fail-over, bằng cách kết hợp thêm HAProxy + KeepAlived mà mình hướng dẫn ở [bài trước](https://viblo.asia/p/tich-hop-haproxy-va-keepalived-cho-redis-replication-V3m5WQagZO7) thì bạn có thể tạo ra 1 cụm Redis có độ bền, khả năng chịu lỗi cao.

Chúc các bạn thử nghiệm thành công! :D

# Tham khảo
https://redis.io/topics/sentinel

https://www.fatalerrors.org/a/redis-sentry-mode.html

https://www.fatalerrors.org/a/redis-s-master-slave-architecture-sentry-mode.html