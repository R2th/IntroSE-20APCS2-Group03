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
(Các phần của mình viết sẽ khó hiểu và phức tạp hơn trên mạng 1 chút, vì sẽ chuyên sâu cho System+Dev quản trị redis)

# Phần 1: Cài đặt redis cơ bản + Turning redis.
## 1.1 Cài đặt: 
(Sao không cài yum hoặc apt mà lại cài từ tar.gz: Vì dễ quản lý file và config về sau, thuận tiện cho việc backup data file/config/logs/quản lý phân vùng lưu trữ, upgrade version... bla bla)

Bước 1: Tải redis từ trang chủ: https://redis.io/download . Bản hiện tại đến 2022/05 là 7.0.0 (updated), các bạn cứ chọn bản mới nhất mà cài. Vì redis build rất ổn định.
```
# yum install gcc wget -y

# mkdir -p /opt/setup

# cd /opt/setup

# wget https://github.com/redis/redis/archive/7.0.0.tar.gz

# tar -xvzf 7.0.0.tar.gz

# cd redis-7.0.0

# make

# make install
```

![](https://images.viblo.asia/300ba58e-510d-473a-9664-951c4d1744a5.png)

Khi make install, câu lệnh sẽ thực hiện copy các file chạy redis gồm (redis-server , redis-benchmark , redis-cli ) vào thư mục /usr/local/bin/

Bước 2: Cài đặt các thư mục riêng cho redis, để quản lý về sau ( như: data , conf, log)
```
# mkdir -p /opt/redis/conf

# mkdir -p /opt/redis/data

# mkdir -p /opt/redis/log

# cd /opt/setup/redis-7.0.0/utils/

# vim install_server.sh (ta comment lại dòng 82 vì có exit 1 không tương thích với systemd - lỗi ko cần thiết)
```
![](https://images.viblo.asia/35702d3c-d7c6-4f48-b65d-12c1ad1660d8.png)

Thực hiện chạy file, và khai báo như sau 
```
$ ./install_server.sh
```
![](https://images.viblo.asia/d9866bbd-1bf6-4416-95a5-ee240952c833.png)

Tắt bật redis:
```
# /etc/init.d/redis_6379 status
# /etc/init.d/redis_6379 stop
# /etc/init.d/redis_6379 start
# Bạn nào muốn dùng systemd, Đọc. Phần 3: Bảo mật cho redis. (redis security) nhé.
```
Lệnh chạy cơ bản
vào redis bằng lệnh
```
# redis-cli ping                           #(Dùng để kiểm tra redis alive)
# redis-cli set hello-world awesome1       #(đặt key hello-world có data value = awesome)
# redis-cli get hello-world                #(lấy giá trị value của key ra)
# redis-cli info                           #(xem thông tin status của redis)
# redis-cli config get                     #(Xem toàn bộ config của redis đang chạy)
# redis-cli monitor                        #(GIÁM SÁT các câu lệnh đang chạy real-time - RẤT hay)
# redis-cli client list                    #(Kiểm tra xem có bao nhiêu client, ip client đang kết nối, client đang dùng lệnh gì.)
# redis-cli info clients                   #(Xem số client đang kết nối tới redis server)
```
Ngoài việc gõ trực tiếp command trên unix. Ta có thể vào redis-cli để gõ các lệnh như sau:
```
[root@master-node ~]# redis-cli 
127.0.0.1:6379> PING
PONG
127.0.0.1:6379> SET hello-world awmsome2
OK
127.0.0.1:6379> GET hello-world
"awmsome2"
```
![](https://images.viblo.asia/3a6f868f-fcf7-4215-83f6-906877300c37.png)

## 1.2: Turning redis:
### P1: Enable vm.overcommit_memory
```
# vim /etc/sysctl.conf
vm.overcommit_memory=1
net.core.somaxconn=65535
#sudo sysctl --system
```

chạy lệnh sysctl vm.overcommit_memory=1
Khi ghi dữ liệu từ RAM xuống disk, Redis sử dụng các tiến trình con. Theo mặc định, tiến trình con này cần memory tương đương tiến trình mẹ, do nó có chứa dữ liệu tương đương. Điều này dẫn tới OS không đủ RAM cho việc ghi DB xuống Disk này > lỗi.
Tuy nhiên Linux có hỗ trợ Copy-on-write, nghĩa là chỉ cần cấp memory cho những gì tiến trình con khác với tiến trình mẹ, phần giống nhau thì dùng chung memory cho tiết kiệm. Để bật nó thì cần set overcommit_memory = 1

### P2: net.core.somaxconn (tăng hàng đợi tối đa của linux)
```
sysctl -w net.core.somaxconn=65535
cat /proc/sys/net/core/somaxconn
65535
```
### P3: Set never transparent_hugepage
Giải thích: https://kipalog.com/posts/Tinh-nang-Transparent-HugePage-trong-RHEL6-va-anh-huong
```
# cat /sys/kernel/mm/transparent_hugepage/enabled
[always] madvise never
# echo never > /sys/kernel/mm/transparent_hugepage/enabled


# vim /etc/rc.local (thêm vào cuối file rc.local để mỗi lần khởi động lại Linux, hugpage lại chuyển thành never)
echo never > /sys/kernel/mm/transparent_hugepage/enabled
```

### P4: Tăng connection kết nối
Mặc định redis seting maxclients kết nối đồng thời là 10000, nếu coder tốt thì khi mở kết nối xong sẽ gọi lệnh close (cả hệ thống lớn chắc ko đến 100 kết nối đồng thời). Vẫn để phòng trường hợp quá connection khi bị miss code ở đoạn nào đó. Ta có thể tăng Maxclients lên.
Cách 1: Thay trong redis-cli
```
127.0.0.1:6379> CONFIG GET MAXCLIENTS
"10000"
127.0.0.1:6379> CONFIG SET MAXCLIENTS 100000
OK (thực hiện tăng maxclient tạm thời)
127.0.0.1:6379> CONFIG REWRITE
OK (Thực hiện ghi đè config hiện tại / vĩnh viễn)
```
Cách 2: Thay trong config
```
vim /opt/redis/conf/6379.conf
maxclients 100000
```

Mời các bạn đón đọc: Phần 2: Lệnh quản trị redis cơ bản

(Kiến thức người viết bài có thể có góc nhìn hẹp, xin các bạn góp ý đóng góp xây dựng bài.)