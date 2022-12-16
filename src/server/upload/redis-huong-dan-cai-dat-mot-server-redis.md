Redis là hệ thống lưu trữ key-value với rất nhiều tính năng và được sử dụng rộng rãi và rất mạnh mẽ, thường được dân chuyên nghiệp gọi với cái tên rất ngầu là in-memory key-value store. Redis nổi bật bởi việc hỗ trợ nhiều cấu trúc dữ liệu cơ bản (hash, list, set, sorted set, string), đồng thời cho phép scripting bằng ngôn ngữ lua. Bên cạnh lưu trữ key-value trên RAM với hiệu năng cao, redis còn hỗ trợ lưu trữ dữ liệu trên đĩa cứng (persistent redis) cho phép phục hồi dữ liệu khi gặp sự cố. 
Trong thời buổi công nghệ vừa phải nhanh và an toàn ( không phải quá nhanh quá nguy hiểm nhé !) thì việc sử dụng Redis trở trành trào lưu rất hot gần đây. Và tất nhiên, không nằm ngoài xu hướng này thì mình cũng học đòi tìm hiểu xem cách sử dụng nó như thế nào .(ahihi)

# Cài đặt Redis.
Mình sẽ thực hiện việc cài đặt trên Ubuntu server 16.04. Hiện tại, muốn cài đặt Redis thì chúng ta phải build từ source code của nó, nên trước tiên mình sẽ install các package cần thiết cho việc compile source code.

``` html
$ sudo apt-get update
$ sudo apt-get install build-essential tcl
```

Tiếp đến tìm chỗ lưu source trước khi compile, ở đây mình sẽ download source code của Redis và cho vào /tmp nhé.

```html
$ cd /tmp
$ curl -O http://download.redis.io/redis-stable.tar.gz
```

Sau khi download về thì giải nén ra và cd vào trong redis-stable

```html
$ tar -xzvf redis-stable.tar.gz
$ cd redis-stable
```
Kế đến thì combo 3 bước compile source code =))

```html
$ make
$ make test
$ make install
```

# Configure Redis
Sau khi cài đặt xong thì bắt đầu config. Khác việc việc cài đặt thông thường, redis compile từ source không có sẵn ở /etc/redis, vì vậy mình phải tự tạo thôi.

```html
$ sudo mkdir /etc/redis
```
Sau đó thì copy mấy cái config mặc định của Redis vào.
```html
$ sudo cp /tmp/redis-stable/redis.conf /etc/redis
```
Ok, bây giờ thì mở lên xem thử nó có gì rồi.

```html
$ sudo nano /etc/redis/redis.conf
```
Đầu tiên chúng ta sẽ chỉ định một `supervised` cho Redis, mặc định config này sẽ là `no` . Ở ubuntu16 thì sử dụng hệ thống systemd init, nên chúng ta sẽ cho supervised của redis là systemd :
```html
. . .

# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd

. . .
```
Tiếp theo, tìm đến phần khai báo `dir`. Tùy chọn này chỉ định thư mục mà Redis sẽ sử dụng để đổ dữ liệu liên tục. Chúng ta cần chọn một vị trí mà Redis sẽ có quyền ghi và người dùng bình thường không thể xem được.
Ở đây mình khai luôn là `/var/lib/redis` nhé.

```html
. . .

# The working directory.
#
# The DB will be written inside this directory, with the filename specified
# above using the 'dbfilename' configuration directive.
#
# The Append Only File will also be created inside this directory.
#
# Note that you must specify a directory here, not a file name.
dir /var/lib/redis

. . .
```

Sau đó nhớ save lại.

# Tạo một Unit file systemd cho Redis
Vì Redis được compile từ source , nên thường là sẽ không có Unit file trong systemd, bây giờ chúng ta sẽ tạo 1 file như thế để tiện cho việc quản lý tiến trình của Redis (cụ thể là start/stop cho nó nhanh).

```html
$ sudo nano /etc/systemd/system/redis.service
```
Nội dung file trên sẽ như sau :

```html
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=redis
Group=redis
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```
- Trường `[Unit]`: Mô tả service và xác định yêu cầu service netwoking phải có sẵn trước khi Redis được start.
- Trường `[Service] : Chỉ định hành vi của service , và các user/group được phép chạy service. Kèm theo đó là khai báo file cấu hình redis của bạn nằm ở đâu.
- Trường `[Install]` : Không hiểu lắm =)). Đại loại như khai báo phần đính kèm khi start redis :v . Nói chung phần này không hiểu @@ , ai hiểu giải thích dùm mình @@

# Tạo Redis user, group và directory :
Ở mấy phần trên chỉ định user và group start Redis thì bây giờ phải tạo user thôi :v 
```html
$ sudo adduser --system --group --no-create-home redis
```
Tạo thêm `/var/lib/redis` như trong khai báo config ở trên nhé :
```html
sudo mkdir /var/lib/redis
```
Phân quyền cho thư mục mới tạo .
```html
$ sudo chown redis:redis /var/lib/redis
$ sudo chmod 770 /var/lib/redis
```

# Start và Test Redis :
Nãy vừa tạo file systemd cho Redis, giờ xài thử coi được không nhé =))
```html
$ sudo systemctl start redis
```
Check status các thứ :
```html
$ sudo systemctl status redis

● redis.service - Redis Server
   Loaded: loaded (/etc/systemd/system/redis.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2016-05-11 14:38:08 EDT; 1min 43s ago
  Process: 3115 ExecStop=/usr/local/bin/redis-cli shutdown (code=exited, status=0/SUCCESS)
 Main PID: 3124 (redis-server)
    Tasks: 3 (limit: 512)
   Memory: 864.0K
      CPU: 179ms
   CGroup: /system.slice/redis.service
           └─3124 /usr/local/bin/redis-server 127.0.0.1:6379       

. . .
```
### Test hoạt động của Redis .
Test xem Redis có hoạt động hay không, gõ `redis-cli`, bạn sẽ vào được console của redis.
```html
$ redis-cli
```
Console trông như này :
```html
127.0.0.1:6379> ping
```
Nó sẽ đáp lại =))
```html
PONG
```
Bây giờ sẽ thử set 1 key vào nhé , nó sẽ báo OK.
```html
127.0.0.1:6379> set test "Hello, this is Redis"
OK
```
Bây giờ thử gọi key vừa set nhé.
```html
127.0.0.1:6379> get test
"Hello, this is Redis"
```
Nó đã lưu key bạn vừa set, bây giờ thử restart lại coi nó còn lưu không .
```html
$ sudo systemctl restart redis
```

Thử lại :
```html
$ redis-cli
127.0.0.1:6379> get test
"Hello, this is Redis"
```
Ok, vậy là xong, nó vẫn chạy =))
Cuối cùng thì setting cho Redis start khi server reboot lại nhé.

```html
$ sudo systemctl enable redis
```
# Kết luận :
Chúng ta đã cài đặt thành công Redis, còn việc xài và sử dụng như thế nào thì còn tùy mục đích của các bạn. Thực tế thì mình chỉ nghịch đến đây thôi chứ cũng chưa biết xài vào việc gì. Bao giờ có việc cần dùng thì mình sẽ chia sẻ thêm cho các bạn biết ứng dụng thực tế nó như thế nào để dễ hiểu hơn nhé :D