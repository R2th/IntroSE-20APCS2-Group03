Khi làm việc với linux thì chúng ta không tránh khỏi phải tạo những dịch vụ của riêng bạn có thể mang lại cho bạn mức độ linh hoạt mà bạn sẽ không bao giờ gặp phải khi bị ràng buộc bởi bên thứ ba.

Điều thú vị là nó tạo ra một dịch vụ Linux khá dễ dàng: sử dụng ngôn ngữ lập trình yêu thích của bạn để viết một chương trình dài và biến nó thành một dịch vụ sử dụng systemd.

The program

Hãy tạo ra một máy chủ nhỏ bằng PHP code đơn giản sau . nhưng nó hoạt động tốt đáng ngạc nhiên =)) . Chúng tôi sẽ lắng nghe cổng UDP 10000 và trả lại bất kỳ tin nhắn nào nhận được với chuyển đổi ROT13:
```
<?php

$sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
socket_bind($sock, '0.0.0.0', 10000);

for (;;) {
    socket_recvfrom($sock, $message, 1024, 0, $ip, $port);
    $reply = str_rot13($message);
    socket_sendto($sock, $reply, strlen($reply), 0, $ip, $port);
}
```
Let’s start it:
```
$ php server.php
$ nc -u 127.0.0.1 10000
```
Hello, world!
Uryyb, jbeyq!

Thật tuyệt, nó hoạt động. Bây giờ chúng tôi muốn tập lệnh này chạy mọi lúc, được khởi động lại trong trường hợp xảy ra lỗi (restart) và thậm chí còn tồn tại khi khởi động lại máy chủ. Đó là nơi mà systemd đi vào .

Turning it into a service
Chúng ta tạo 1 file như sau .
vim /etc/systemd/system/rot13.service
```
[Unit]
Description=ROT13 demo service
After=network.target
StartLimitIntervalSec=0[Service]
Type=simple
Restart=always
RestartSec=1
User=centos
ExecStart=/usr/bin/env php /data/vng/scripts/server.php

[Install]
WantedBy=multi-user.target
```
You’ll need to:
– đặt tên người dùng thực tế của bạn sau user=
– đặt đường dẫn thích hợp cho tập lệnh của bạn trong ExecStart=

Chúng ta bắt đầu start service .
```
$ systemctl start rot13
```
kích thuộc autostart khi boot server .
```
$ systemctl enable rot13
```
Going further
Bây giờ dịch vụ của bạn (hy vọng) hoạt động, điều quan trọng là phải đi sâu hơn một chút vào các tùy chọn cấu hình và đảm bảo rằng nó sẽ luôn hoạt động như bạn mong đợi.

Bắt đầu theo đúng thứ tự

Bạn có thể đã tự hỏi những gì After = chỉ thị đã làm. Điều đó chỉ có nghĩa là dịch vụ của bạn phải được bắt đầu sau khi mạng sẵn sàng. Nếu chương trình của bạn hy vọng máy chủ MySQL sẽ hoạt động, bạn nên thêm :
```
After=mysqld.service
Restart=always
RestartSec=1
```
Theo mặc định, systemd cố gắng khởi động lại sau 100ms. Bạn có thể chỉ định số giây chờ trước khi thử khởi động lại, sử dụng:
```
StartLimitBurst=5
StartLimitIntervalSec=10
```
systemd từ bỏ khởi động lại dịch vụ của bạn nếu nó không khởi động quá 5 lần trong khoảng thời gian 10 giây.

Lệnh RestartSec cũng có tác động đến kết quả: nếu bạn đặt nó khởi động lại sau 3 giây, thì bạn không bao giờ có thể đạt được 5 lần thử lại thất bại trong vòng 10 giây.
Cách khắc phục đơn giản luôn hoạt động là đặt StartLimitIntervalSec = 0. Bằng cách này, systemd sẽ cố gắng khởi động lại dịch vụ của bạn mãi mãi.

Nguồn : https://techzones.me/2019/09/08/tao-linux-service-voi-systemd/