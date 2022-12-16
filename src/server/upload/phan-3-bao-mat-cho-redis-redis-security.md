**Seri Redis của chúng ta gồm những phần sau:**
```
Phần 1: Cài đặt redis cơ bản + Turning redis.
Phần 2: Lệnh quản trị redis cơ bản
Phần 3: Bảo mật cho redis. (redis security)
Phần 4: Access List Redis (tính năng mới từ bản 6)
Phần 5: Các mô hình Redis replication, Ưu và nhược điểm
Phần 6: Redis Master-Salve sử dụng ACL
Phần 7: Redis Sentinel sử dụng ACL
Phần 8: Cài đặt Redis Cluster
Phần 9: Di chuyển data từ redis đơn sang cluster và ngược lại.
Phần 10: Data type trong Redis, một vài ví dụ sử dụng (String/hash/sort/list/queue/pub-sub....).
Phần 11: Một số lỗi thường gặp khi quản trị hệ thống Redis.
Phần 12: Continue...
```
# Phần 3: Bảo mật cho redis. (redis security)
Trên thế giới, có rất nhiều vụ redis phơi port ra ngoài bị chiếm quyền điều khiển để cài miner, hoặc xóa sạch dữ liệu redis, thay đổi dữ liệu để trục lợi. Vì vậy ta luôn sẵn tinh thần bảo mật cho redis:
### 1. Thay đổi Port
Thay đổi port để tránh bị scan tấn công:
```
[root@master-node ~]# /etc/init.d/redis_6379 stop
[root@master-node ~]# cat /opt/redis/conf/6379.conf  | grep 'port 6379'
port 6379
[root@master-node ~]# cat /etc/init.d/redis_6379 | grep REDISPORT
REDISPORT="6379"

# VD ta đổi thành port 6800, cần đổi ở trong file config và file khởi động.
[root@master-node ~]# vi /opt/redis/conf/6379.conf 
port 6800
[root@master-node ~]# vi /etc/init.d/redis_6379
REDISPORT="6800"

#Kiểm tra:
[root@master-node ~]# ps aux | grep redis | grep server
root      97040  0.1  0.1 165072  3032 ?        Ssl  13:09   0:00 /usr/local/bin/redis-server 127.0.0.1:6800
[root@master-node ~]# redis-cli -h 127.0.0.1 -p 6800 INFO
```

### 2. Chặn firewall 
- Nếu bạn chạy app và redis chung 1 server, giữ nguyên bind 127.0.0.1, Port redis chỉ lắng nghe nội bộ nên khá an toàn.
- Trường hợp App và redis nằm ở riêng 2 server khác nhau, ta để bind 0.0.0.0 nhưng **chú ý** Chặn Firewall hoặc chặn network ở mạng nội bộ DMZ. 

Cách public port redis như sau:
```
[root@master-node ~]# cat /opt/redis/conf/6379.conf | grep bind | grep -v '#'
bind 127.0.0.1 -::1
Sửa thành bind 0.0.0.0 . Và chú ý về Firewall, chặn không cho bên ngoài tấn công.
```

### 3. Đặt mật khẩu cho redis
Có 2 cách đặt mật khẩu, bản redis 6 ra tính năng mới ra ACL, mình khuyến khích các bạn dùng ACL này về sau. Các phần tiếp theo tôi sẽ hướng dẫn các bạn sử dụng thành thạo ACL.
```
[root@master-node conf]# redis-cli -p 6800
127.0.0.1:6800> ACL SETUSER default on >matkhau ~* &* +@all
OK
127.0.0.1:6800> CONFIG REWRITE
OK
[root@master-node conf]# redis-cli --user default --pass matkhau -p 6800 INFO
Ta kiểm tra config sẽ có thêm 1 dòng sau:
[root@master-node conf]# cat /opt/redis/conf/6379.conf | grep 'user default'
user default on #6445e373d7fcde106bfcb897ee8f0bb28589bd7797f54f1ef4e5d5447cfbd011 ~* &* +@all

Sửa lại init file, nếu không sửa bạn sẽ không bật tắt đc redis bằng init/systemd:
[root@master-node conf]# vi /etc/init.d/redis_6379  | grep cli
CLIEXEC="/usr/local/bin/redis-cli --user default --pass matkhau"

```
Cách 2: Không sử dụng ACL (không khuyến khích về sau, dùng cho các thư viện code cũ, bạn phải đảm bảo trong config đang không dùng ACL)
```
[root@master-node conf]# cat /opt/redis/conf/6379.conf | grep 'user default'
user default on #64xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe5d5447cfbd011 ~* &* +@all
Nếu có dòng này, bạn hãy comment # lại. Vì nếu ACL cách 1 đã có, thì cách 2 ở dưới bị vô hiệu.

Sửa config như sau: 
[root@master-node conf]# vi /opt/redis/conf/6379.conf
requirepass "matkhau"

Kiểm tra:
[root@master-node conf]# redis-cli -p 6800 -a matkhau INFO

Sửa init file: 
[root@master-node conf]# vi /etc/init.d/redis_6379  | grep cli
CLIEXEC="/usr/local/bin/redis-cli -a matkhau"

```

### 4. Xóa những lệnh nguy hiểm
Liệt kê những lệnh nguy hiểm (chỉ dành cho quản lý redis, không dành cho role dev, app):
```
127.0.0.1:6379> ACL CAT dangerous
 1) "replconf"
 2) "restore"
 3) "cluster"
 4) "pfdebug"
 5) "bgrewriteaof"
 6) "latency"
 7) "acl"
 8) "swapdb"
 9) "info"
10) "replicaof"
11) "migrate"
12) "flushall"
13) "flushdb"
14) "lastsave"
15) "keys"
16) "save"
17) "config"
18) "pfselftest"
19) "restore-asking"
20) "slaveof"
21) "sync"
22) "failover"
23) "debug"
24) "slowlog"
25) "role"
26) "module"
27) "psync"
28) "sort"
29) "client"
30) "monitor"
31) "bgsave"
32) "shutdown"
```
Thay command nguy hiểm xóa hết dữ liệu hoặc làm giảm hiệu năng redis. Ta sửa config như sau:
```
[root@master-node conf]# tail /opt/redis/conf/6379.conf
rename-command FLUSHALL XOAHETDATA
rename-command FLUSHDB XOADATADBHIENTAI
[root@master-node conf]# redis-cli -p 6800
127.0.0.1:6800> flushall
(error) ERR unknown command `flushall`, with args beginning with:   > OK , đã xóa lệnh flushall

```

### 5 Không cho redis chạy quyền root.
Với hệ thống dùng Systemd ta thêm User và Group=redis như sau:
```
[root@master-node ~]# adduser redis --no-create-home
[root@master-node ~]# vi /etc/systemd/system/redis.service
[Unit]
Description=Redis data structure server
Documentation=https://redis.io/documentation
Wants=network-online.target
After=network-online.target

[Service]
ExecStart=/usr/local/bin/redis-server /opt/redis/conf/6379.conf --supervised systemd --daemonize no
ExecStop=/usr/local/bin/redis-cli SHUTDOWN
#ExecStop=/usr/local/bin/redis-cli --user default --pass matkhau SHUTDOWN
LimitNOFILE=10032
User=redis
Group=redis

[Install]
WantedBy=multi-user.target

```


Với hệ thống dùng init file ta chạy thẳng start bằng user redis.
```
[root@master-node ~]# /etc/init.d/redis_6379 stop
[root@master-node ~]# adduser redis --no-create-home
[root@master-node ~]# chown -R redis.root /opt/redis
[root@master-node ~]# chown redis.redis /etc/init.d/redis_6379
[root@master-node ~]# su - redis
-bash-4.2$ /etc/init.d/redis_6379 start
Starting Redis server..
-bash-4.2$ ps aux | grep redis
redis     85679  0.3  0.1 162512  3216 ?        Ssl  08:47   0:00 /usr/local/bin/redis-server 0.0.0.0:6379
```

Ngoài ra , để bảo mật redis còn có các đề nghị sau đây:
- Phân quyền chạy và đọc file tối thiểu (file chạy là 750, file log, config là 640)
- Đặt lịch Backup log, config, dump
- Bật TLS giữa client và redis-server.


Phần sau, tôi sẽ hướng dẫn bạn một cách khác là dùng ACL để khóa các command nguy hiểm này