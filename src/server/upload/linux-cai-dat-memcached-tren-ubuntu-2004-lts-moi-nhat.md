## Tổng quan
[Memcached](https://github.com/memcached/memcached/wiki/Overview)  là một hệ thống lưu trữ bộ nhớ phân tán mã nguồn mở đặc biệt. Những thông tin được lưu trữ trong Memcached là bản sao các đối tượng (objects) và dữ liệu được người dùng truy cập nhiều lần.
![](https://images.viblo.asia/a727a818-f239-4b2a-b84c-f9c23d47140c.png)

Hiểu đơn giản, **Memcached** được sử dụng để tăng tốc các ứng dụng web động bằng cách giảm tải cơ sở dữ liệu. Mỗi khi yêu cầu cơ sở dữ liệu được thực hiện, Memcached hỗ trợ thêm tải cho server với các đối tượng dữ liệu được lưu trữ trong bộ nhớ động.

Bài viết hôm nay mình chia sẻ mọi người cách cài **Memcached** trên **Ubuntu 20 LTS**

## Yêu cầu
* Ubuntu 20.04 LTS
* SSH Access with sudo privileges
* Open Ports 11211

Cập nhập các gói hệ thống
```
sudo apt-get update
```
### Step #1: Cài đặt Memcached trên Ubuntu 20.04 LTS
Cài đặt memcached và libmemcached-tools  bằng command.
```
 sudo apt-get install memcached  libmemcached-tools -y
```
Kiểm tra lại **Memcached service is running** bằng command,
```
 sudo systemctl status memcached.service
```
Output

> ● memcached.service - memcached daemon 
>
> Loaded: loaded (/lib/systemd/system/memcached.service; enabled; vendor preset: enabled) 
>
> Active: active (running) 
>
> Main PID: 10919 (memcached) 
>
> Tasks: 6 
>
> Memory: 876.0K 
>
> CPU: 16ms CGroup: /system.slice/memcached.service 
>
> └─10919 /usr/bin/memcached -m 64 -p 11211 -u memcache -l 11.4.0.13

Cho phép Memcached khởi động cùng hệ thống
```
sudo systemctl enable memcached.service
```

Output

> Synchronizing state of memcached.service with SysV init with /lib/systemd/systemd-sysv-install...
> 
> Executing /lib/systemd/systemd-sysv-install enable memcached

Bổ sung một số lệnh sau để quản lí Memcached **start, restart** và **stop** .
```
 sudo systemctl start memcached.service
 sudo systemctl restart memcached.service
 sudo systemctl stop memcached.service
```
### Step #2: Cấu hình Memcached trên Ubuntu
Tiếp theo bạn cấu hình Memcached, vì mặc định Memcached lắng nghe ở localhost. Và nếu muốn bạn cấu hình bằng cách mở **Memcached** config file  **/etc/memcached.config**
```
sudo vi /etc/memcached.config
```
Thay đổi bằng IP server private hoặc public IP như sau:

 Ở đây mình change thành IP **192.168.10.15** port **11211**
```
# memcached default config file
# 2003 - Jay Bonci <jaybonci@debian.org>
# This configuration file is read by the start-memcached script provided as
# part of the Debian GNU/Linux distribution.
# Run memcached as a daemon. This command is implied, and is not needed for the
# daemon to run. See the README.Debian that comes with this package for more
# information.
-d
# Log memcached's output to /var/log/memcached
logfile /var/log/memcached.log
# Be verbose
# -v
# Be even more verbose (print client commands as well)
# -vv
# Start with a cap of 64 megs of memory. It's reasonable, and the daemon default
# Note that the daemon will grow to this size, but does not start out holding this much
# memory
-m 64
# Default connection port is 11211
-p 11211
# Run the daemon as root. The start-memcached will default to running as root if no
# -u command is present in this config file
-u memcache
# Specify which IP address to listen on. The default is to listen on all IP addresses
# This parameter is one of the only security measures that memcached has, so make sure
# it's listening on a firewalled interface.
-l 192.168.10.15
# Limit the number of simultaneous incoming connections. The daemon default is 1024
# -c 1024
# Lock down all paged memory. Consult with the README and homepage before you do this
# -k
# Return error when memory is exhausted (rather than removing items)
# -M
# Maximize core file limit
# -r
```
Sau đó khởi động lại Memcached 
```
 sudo systemctl restart memcached.service
```
### Step #3: Cài đặt  Memcached PHP Module
Hiện nay có 2 extension được sử dụng phổ biến hiện nay đó là **memcache** và **memcached** (cùng với tên của dịch vụ Memcached).

**Memcache** được ra đời sớm hơn Memcached, dịch vụ này cung cấp các thủ tục và giao diện hướng đối tượng tới Memcached. Memcache thực hiện caching hiệu quả cao, ổn định và sửa rất nhiều lỗi bảo mật. Tuy nhiên dịch vụ này không hỗ trợ nhiều tính năng mới của dịch vụ Memcached nhưng vẫn được nhiều người lựa chọn sử dụng cho tới ngày nay.

**Memcached** ra đời muộn hơn Memcache và chúng sử dụng thư viện libmemcached để cung cấp API cho quá trình giao tiếp với dịch vụ libmemcached. Chúng cung cấp nhiều thuộc tính mới và được đánh giá là nhanh hơn Memcache. Tuy nhiên dịch vụ vẫn còn nhiều lỗi bảo mật chưa được sửa nên việc sử dụng chúng còn khá khó khăn.

Nếu chưa cài php trên ubuntu thì cài cần thêm php.

Bỏ qua bước này nếu đã cài php

 ```
sudo add-apt-repository ppa:ondrej/php
 sudo apt-get update
 sudo apt-get install -y php php-dev php-pear libapache2-mod-php
```
hoặc
```
sudo apt-get install apache2 php7.2 libapache2-mod-php7.2 php-memcached php7.2-cli
```

Cài đặt PHP Memcached 
```
 sudo apt-get install php-memcached -y
 ```
Reload hoặc Restart the Apache  
```
 sudo systemctl reload apache2
```
hoặc
```
 sudo systemctl restart apache2
```
Kiểm tra memcache đã hoạt động chưa bằng cách tạo file **info.php** file trong **/var/www/html**
```
 sudo nano /var/www/html/info.php
```
Thêm
 ```
<?php
 phpinfo();
?>
```

Nhập ip trên trình duyệt và kiểm tra 

http://localhost/info.php
### Step #4: Thêm Firewall Rule
Allow port 11211/tcp trong Firewall để Access Memcached
```
 sudo ufw allow 11211
 sudo ufw status
```

Nếu bạn sử dung Memcached trên Cloud Instance Allow the Port in Incoming hoặc Network Security Group
## Lời kết
Hy vọng với những chia sẻ trên đây của mình, các bạn đã phần nào hiểu rõ Memcache là gì? cách cài đặt, cũng như sử dụng hệ thống này trên Linux  và Ubuntu. Chúc các bạn thành công.!

Tham khảo:
[Memcached Official Page
](https://memcached.org/)