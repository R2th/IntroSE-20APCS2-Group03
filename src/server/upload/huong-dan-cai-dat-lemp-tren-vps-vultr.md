Chào mọi người, hôm nay mình xin chia sẻ đến mọi người cách cài đặt LEMP Stack trên VPS Vultr mà mình tự tổng hợp được, hi vọng bài thú vị với mọi người.
![](https://images.viblo.asia/2789fc45-41c1-406a-ae37-14dbf25ebdcb.png)
- Sau khi đăng ký và tài khoản, nạp tiền và chọn lựa các gói VPS tùy vào số tiền của mình, bạn đã có 1 VPS để vọc vạch rồi đó :D . Ở đây mình mua VPS gói 5$/1 tháng. Và vì mình ở Việt Nam nên sẽ lựa chọn Location ở Singapore hoặc Tokyo để có tốc độ ổn định nhất.
- Sau khi đã có VPS, chúng ta có thể lựa chọn hệ điều hành mong muốn cho VPS của mình. Ở đây mình lựa chọn CentOS 7. Như các bạn có thể thấy ở đây sau khi Vultr cung cấp cho chúng ta địa chỉ IP và Password chúng ta có thể truy cập vào VPS bằng Terminal, ngoài ra Vultr cũng hỗ trợ chúng ta có thể Shutdown, Restart, Reinstall,... rất tiện và nhanh chóng. 
![](https://images.viblo.asia/3a672410-acf7-47cf-b69a-ee6d0da2b0b6.png)

- Các bước cơ bản đã xong, chúng ta có thể bắt đầu nghịch ngợm được rồi ^^!
# 1. Cài Nginx
- Truy cập vào VPS bằng ssh, sau đó nhập password:
```
ssh root@IP Address
```
- Cài CentOS 7 EPEL repository cho server:
```
sudo yum install epel-release
```
- Cài đặt Nginx:
```
sudo yum install nginx
```
- Khởi động Nginx:
```
systemctl start nginx.service
```
- Cài đặt tự động khởi động Nginx:
```
systemctl enable nginx.service
```
- Xong, bây giờ chúng ta có thể truy cập địa chỉ IP trên trình duyệt để kiểm tra xem cài đặt Nginx đã thành công hay chưa. Tuy nhiên, Vultr thường bị block port 80, do đó trước khi truy cập ta có thể mở port bằng lệnh sau:
```
/sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT
```
# 2. Cài PHP
- Cài đặt Wget:
```
yum install wget
```
- Cài PHP:
    - PHP 5.4: `yum -y install php`
    - PHP >= 7.0: 
        - `wget http://rpms.remirepo.net/enterprise/remi-release-7.rpm
	rpm -Uvh remi-release-7.rpm
	yum install yum-utils -y
	yum-config-manager --enable remi-php7x`(7x là phiên bản PHP muốn cài)
        -  `yum --enablerepo=remi,remi-php72 install php-fpm php-common`
        -  `yum --enablerepo=remi,remi-php72 install php-opcache php-pecl-apcu php-cli php-pear php-pdo php-mysqlnd php-pgsql php-pecl-mongodb php-pecl-redis php-pecl-memcache php-pecl-memcached php-gd php-mbstring php-mcrypt php-xml`
    -  `php -v` để kiểm tra kết quả.
-  Cấu hình Nginx kết hợp PHP:
    -  Tạo file default.conf trong thư mục conf.d của nginx: `nano /etc/nginx/conf.d/default.conf`
    -  Sửa nội dung file:
    ```
    server {  
        listen   80;
        server_name  SERVER_IP_OR_DOMAIN;

        # note that these lines are originally from the "location /" block
        root   /usr/share/nginx/html;
        index index.php index.html index.htm;

        location / {
            try_files $uri $uri/ /index.php?q=$uri&$args;
        }
        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }

        location ~ \.php$ {
            try_files $uri $uri/ /index.php?q=$uri&$args;
            fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }
    ```
    Ở đây sửa lại các thông tin SERVER_IP, Domain cho thích hợp; update lại đường dẫn root tới thư mục chứa source code
    - Kiểm tra config xem có vấn đề không: `sudo nginx -t`
    - Thay đổi config của php-fpm:
    ```
    user = apache => user = nginx
	group = apache => group = nginx
	listen.owner = nobody => listen.owner = nginx
	listen.group = nobody => listen.group = nginx
	;listen = 127.0.0.1:9000 => listen = /var/run/php-fpm/php-fpm.sock
    ```
     - Khởi động lại nginx và php-fpm để cập nhật:
     ```
     sudo systemctl restart nginx
	sudo systemctl enable nginx
	sudo systemctl restart php-fpm
	sudo systemctl enable php-fpm
    ```
# 3. Cài Git, Nodejs-NPM, Composer
- Cài git: `yum install git`
- Cài NodeJs, NPM:
`curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
	sudo yum install nodejs`
- Cài Composer: 
```
sudo yum -y update
sudo curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```