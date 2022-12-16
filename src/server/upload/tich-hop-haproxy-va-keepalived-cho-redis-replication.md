# Mở đầu
Bạn vừa học được cách dựng 1 cụm Redis Replication với các node Master - Slave kết hợp với Redis Sentinel chạy failover siêu mượt mà, trong code bạn trỏ đến địa chỉ con Master để đọc ghi dữ liệu, tuy nhiên 1 ngày đẹp trời Node Master lăn ra chết, Sentinel tự động chuyển Master sang 1 node khác khiến code bạn chạy lỗi tóe loe. Bạn bị sếp chửi, bạn buồn, bạn lên mạng tìm kiếm cách để có thể tự động xác định được node Master mới khi quá trình Failover diễn ra. Bài viết này sẽ giúp bạn tìm ra giải pháp cho vấn đề đó.
![image.png](https://images.viblo.asia/f68c199a-2523-4ec0-b3b7-580777fe7ce3.png)
# Sơ qua Redis Replication
Hy vọng trong thời gian tới có thể viết 1 bài chi tiết về Redis Replication, còn đây là sơ lược về Redis Replication cho bạn nào chưa biết. Redis Replication sẽ gồm các node Master và Slave, node Master chịu trách nhiệm đọc-ghi, node Slave chịu trách nhiệm đọc, backup dữ liệu từ Master. Nhưng thế này thì bình thường quá, người ta nghĩ ra thêm Redis-sentinel để khi node Master down thì Sentinel sẽ tự tìm ra node Slave thích hợp (dựa trên mức độ ưu tiên replica-priority). Mô hình Redis + Sentinel thường được cài đặt sẽ như sau:
![image.png](https://images.viblo.asia/5b7c22d8-9388-4790-870e-031b727692f5.png)

Tuy nhiên có 1 số ý kiến cho rằng mô hình trên chưa tối ưu, mô hình tối ưu hơn sẽ là:
![image.png](https://images.viblo.asia/21bc940f-ec7b-48b4-981d-8d0953317a4f.png)

Khi mà service Sentinel sẽ được tách ra 1 node riêng phòng trường hợp chết cả service Redis và Sentinel.

# Bắt đầu với phần chính
![](https://images.viblo.asia/c32f0584-518c-4a07-847f-e757bf1c5a23.png)
Đó là tất cả những gì về Redis Replication bạn cần biết để đi đến phần tiếp theo. Mô hình mình hướng dẫn các bạn trong bài này sẽ như phía bên trên. Ta có cụm 2 node HAProxy + KeepAlived để tìm ra Node Master trong Redis Replication. Ơ vậy tại sao cần 2 node ??? 1 node là đủ để tìm rồi mà? Đúng vậy, 1 node là đủ để tìm được rồi, tuy nhiên Redis có Failover thì HAProxy cũng cần có Failover đó là KeepAlived để tránh trường hợp node HAProxy die thì cũng tèo cả đám. Ở đây VIP không phải là 1 node mà là Virtual IP được tạo ra để Failover. Người dùng hoặc Application sẽ truy cập redis replication qua VIP.

# Cài đặt và cấu hình KeepAlived
Ở bài này mình sử dụng CentOS nên cài đặt bằng **yum** nếu bạn sử dụng Ubuntu thì dùng **apt**, tất cả đều tương tự.

Cài đặt Keepalived với câu lệnh:

`yum -y install keepalived`

Cấu hình Keepalived tại node Master:
```
vrrp_script chk_haproxy {
    script "pkill -0 haproxy"
    interval 2
    weight 2
}
vrrp_instance VI_1 {
    interface eth0
    state MASTER
    virtual_router_id 51
    priority 101
    virtual_ipaddress {
        10.5.9.111
    }
    track_script {
        chk_haproxy
    }
}
```
Cấu hình KeepAlived tại node Slave:
```
vrrp_script chk_haproxy {
    script "pkill -0 haproxy"
    interval 2
    weight 2
}
vrrp_instance VI_1 {
    interface eth0
    state BACKUP
    virtual_router_id 51
    priority 100
    virtual_ipaddress {
        10.5.9.111
    }
    track_script {
        chk_haproxy
    }
}
```
### Giải thích:

**vrrp_script chk_haproxy** là script giúp kiểm tra service haproxy còn sống không, nếu service  chết priority sẽ bị giảm xuống và được chuyển sang cho node BACKUP

**interface:** interface mà ta setup Virtual IP (sử dụng lệnh ifconfig để xem)

**state [MASTER/BACKUP]**: Trạng thái của node

**virtual_router_id**: Giá trị này ở các node phải giống nhau

**priority**: Độ ưu tiên của node (Cao hơn sẽ là Master)

**virtual_ipaddress:** Phần khai báo VIP

**track_script:** Khai báo script bên trên


**Cấu hình để có thể bind tới địa chỉ VIP**
 
`echo 'net.ipv4.ip_nonlocal_bind = 1' >> /etc/sysctl.conf`

# Cài đặt và cấu hình KeepAlived
 Cài đặt Keepalived với câu lệnh:
 
`yum -y install haproxy`

Cấu hình tại trên cả 2 node Master và Backup

```
global
    log         127.0.0.1 local2
    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon
    stats socket /var/lib/haproxy/stats

defaults
    log                     global
    option                  redispatch
    retries                 3
    timeout http-request    10s
    timeout queue           1m
    timeout connect         10s
    timeout client          1m
    timeout server          1m
    timeout http-keep-alive 10s
    timeout check           10s
    maxconn                 3000

listen stats
    bind *:8080
    mode http
    stats enable
    stats uri /stats
    stats realm HAProxy\ Statistics
    stats admin if TRUE

listen redis_clusters
    bind *:6379
    mode tcp
    timeout connect  3h
    timeout server  3h
    timeout client  3h
    option tcp-check
    tcp-check connect                        # Dùng để connect đến back-end server
    tcp-check send AUTH\ vccloud1\r\n        # Thêm dòng này nếu như Redis có password
    tcp-check send PING\r\n                  # Check kết nối
    tcp-check expect string +PONG            # Dự đoán output trả về
    tcp-check send info\ replication\r\n     # Lấy thông tin về replication
    tcp-check expect string role:master      # Nếu trả về role là master thì xác nhận node master
    tcp-check send QUIT\r\n                  # Thoát kết nối
    tcp-check expect string +OK              # Dự đoán output trả về (bỏ cũng được)
    server redis-cluster-1 10.5.9.198:6379 check inter 1s
    server redis-cluster-2 10.5.9.105:6379 check inter 1s
    server redis-cluster-3 10.5.10.126:6379 check inter 1s
```

### Giải thích: 

**Block global** và **defaults** chứa các config toàn cục giữ nguyên như ban đầu.

**Block Listen stats** để tạo trang theo dõi trạng thái các node tại port 8080 đường dẫn /stats

**Block redis_clusters**
 
* bind *:6379; Cho phép truy cập từ mọi IP
* mode: Protocol sử dụng
* tcp-check: dùng để gửi các lệnh tcp đến back-end server tìm ra master node
* server: Khai báo các back-end Redis Cluster Server

Như vậy là đã cài đặt và cấu hình xong KeepAlived + HAProxy, giờ khởi động các service:

```
systemctl restart haproxy
systemctl restart keepalived
```

Truy cập **IP_MASTER:8080/stats** hoặc **IP_SLAVE:8080/stats** có thông số như hình là HAProxy thành công (2 node Slave down - 1 node Master Up):

![](https://images.viblo.asia/b3286486-7c08-4d44-a011-dfac943f708a.PNG)

Để test VIP  thì bạn có thể sử dụng lệnh, hiện connected là thành công

`telnet VIP 6379` 

# Kết
Đây là kết quả sau quá trình gần 1 tuần tìm hiểu của mình nên chắc chắn sẽ còn nhiều thiếu sót hoặc sai. Hy vọng bài viết này sẽ giúp được các bạn một chút trong công việc, nếu có thắc mắc gì thì comment ở dưới nhé. Để ủng hộ mình thì có thể Follow hoặc Vote Up nhé :)))). Hẹn gặp bạn ở bài viết tiếp theo.