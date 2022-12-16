Hôm nay mình sẽ giới thiệu cho các bạn cách deploy laravel (làm api backend) + nuxt js (fontend) lên server centos 7.
Bài viết này sẽ giới thiệu chi tiết từ cách cài đặt LEMP đến laravel và vuejs.


## Cài đặt môi trường LEMP

### Thêm repo

```bash
yum install epel-release
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

### Cài đặt nginx and php 7.1

```bash
yum-config-manager --enable remi-php71
yum -y install php php-opcache
yum --enablerepo=remi,remi-php71 install -y nginx php-fpm php-common
yum --enablerepo=remi,remi-php71 install -y php-zip php-mysql php-mcrypt php-xml php-mbstring
yum --enablerepo=remi,remi-php71 install -y php-opcache php-pdo php-gd
```

### Stop apache and start nginx and php-fpm

```bash
systemctl stop httpd.service # một số server cài đặt sẵn apache, nếu ko có nó sẽ báo lỗi, ko sao cả.
systemctl start nginx.service
systemctl start php-fpm.service
```

#### Php and nginx khởi động cùng hệ thống

```bash
systemctl enable nginx.service
systemctl enable php-fpm.service
```

### Cài đặt MariaDB

```bash
yum install -y mariadb mariadb-server
systemctl start mariadb.service
systemctl enable mariadb.service
```

#### setup mariaDB

```bash
/usr/bin/mysql_secure_installation
```
- Bước này sẽ cài đặt user name và password, ban đầu nó hỏi password bạn cứ enter là được.
- Các bước sau bạn chứ chọn `y` là ok.


### Cài đặt git, npm and yarn

```bash
yum install git ## để clone code, có thể cần hoặc không
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
yum install nodejs
npm install yarn -g
ssh-keygen -t rsa -C "server@gmail.com" ## tạo key để add vào git
```

### Cài đặt laravel and nuxt

#### Laravel
Cài đặt composer: 

```bash
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/bin --filename=composer
```

Dùng git clone code laravel về, cd vào laravel chạy lệnh và setup:

```bash
- setting database in .env ## cài đặt database
- run composer install
- chmod 755 for storage ## phân quyền
- run php artisan key:generate ## tạo key
- run php artisan migrate ## migrate database
```

#### Nuxt Js

chúng ta sẽ deploy nuxtjs bằng pm2, còn pm2 là cái gì các bạn tự google nhé: 

```bash
npm install pm2 -g
```

Dùng git clone code nuxtjs về và cd vào thư mục:

```bash
yarn ## get thư viện js
yarn run build
pm2 start npm --name "project_name" -- start # sau khi chạy xong bước này, nuxt js đang chạy ở port 3000, lsof -i :3000 sẽ thấy
pm2 startup  ## khởi động cùng hệ thống, hoặc tự khởi động lại khi die
pm2 save
```

Restart and update nuxt

```bash
pm2 restart events
```

### nginx config

Setup nginx như sau:  

nuxt js sẽ chạy trên domain chính, còn laravel sẽ chạy trên subdomain  là `/backend`

```bash
server {
    listen 80 default_server;
    server_name domain.com www.domain.com
    server_name dev ipv6only=on;
    index index.php index.html index.htm;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /backend {  
          alias path_to_laravel_folder/public;
          try_files $uri $uri/ @backend;  
    
          location ~ \.php {
              include /etc/nginx/fastcgi_params;
              fastcgi_pass 127.0.0.1:9000; 
              fastcgi_param SCRIPT_FILENAME path_to_laravel_folder/public/index.php;
          }
    }
    
    location @backend {
        rewrite /backend/(.*)$ /backend/index.php?/$1 last;  
    }
}
```
> Thay tên domain thành tên domain của bạn.

> thay `path_to_laravel_folder` thành đường dẫn đến thư mục laravel.

### Ghi chú

- Một số server chặn port, kể cả 80 hay 443, chúng ta cần mở port này:

```bash
systemctl stop firewalld ## turn off firewall
systemctl mask firewalld
yum install iptables-services
systemctl enable iptables
service iptables start
iptables -I INPUT -p tcp --dport 80 -j ACCEPT # mở port 80
iptables -I INPUT -p tcp --dport 443 -j ACCEPT # mở port 443
service iptables save
service iptables restart
```

## Tham khảo:
- https://hocvps.com/cai-dat-laravel/
- https://kenyaappexperts.com/blog/deploy-vue-js%E2%80%8A-with-pm2-and-nginx/