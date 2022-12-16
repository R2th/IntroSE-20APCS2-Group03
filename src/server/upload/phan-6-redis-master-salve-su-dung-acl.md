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
# Phần 6: Redis Master-Salve với ACL
```
Mô hình:
- Master: 192.168.88.12 Port 6379
- Slave:  192.168.88.13 Port 6379
```

Các cách cài không sử dụng ACL, các bạn vui lòng search Google và Viblo. Đã có rất nhiều bài viết hướng dẫn cài Master-Slave

# Master-Slave dùng ACL.
### Bước 1: Truy cập vào redis vào đặt mật khẩu cho Replication + thêm mật khẩu user default.
```
> ACL SETUSER default on >matkhau_default
> ACL SETUSER replicate_user on >matkhau_replicate +psync +replconf +ping
> CONFIG REWRITE
(Chú ý: chạy trên cả Master và Slave, để phục vụ dựng sentinel sau này)

Kết quả, kiểm tra file config có thêm 2 dòng ở cuối cùng:
# cat /opt/redis/conf/6379.conf | tail -n 5
user default on #231d539d073fe5d91a24a56df3196aab2ace130b905d39011840923f9a893ddb ~* &* +@all
user replicate_user on #5c15dbc0958763509a8016827032339bbd3e7cd28d43a045103e69dfff37dba4 resetchannels -@all +psync +ping +replconf
```
###  Bước 2: Sửa init file ở trên cả Master và Slave. 
```
(Nhớ stop redis trước khi sửa, mật khẩu replicate không phải là mật khẩu user default )
[root@master-node]# redis-cli -p 6379 --user default --pass matkhau_default shutdown
# vim /etc/init.d/redis_6379
CLIEXEC="/usr/local/bin/redis-cli --user default --pass matkhau_default"
[root@master-node]# /etc/init.d/redis_6379 start
```

###  Bước 3. Sửa cấu hình bind trên cả Master và Slave, restart cả 2
```
# vim /opt/redis/conf/6379.conf
bind 0.0.0.0
# /etc/init.d/redis_6379 restart
```

###  Bước 4: Cấu hình Replication trên server Slave 192.168.88.13 
```
Thêm 3 dòng config này ở dưới cùng để bật replication.
# vim /opt/redis/conf/6379.conf
replicaof 192.168.88.12 6379
masteruser replicate_user
masterauth matkhau_replicate
# /etc/init.d/redis_6379 restart (restart slave)
```

### Bước 5: Kiểm tra:

Master: ( có 1 slave gọi vào)
```
# redis-cli -p 6379 --user default --pass matkhau_default info

> Replication
role:master
connected_slaves:1
slave0:ip=192.168.88.13,port=6379,state=online,offset=56,lag=0
```
Slave ( Có trạng thái là slave - up )
```
# Replication
role:slave
master_host:192.168.88.12
master_port:6379
master_link_status:up

```


Nguồn: https://redis.io/topics/acl

https://redis.io/topics/replication