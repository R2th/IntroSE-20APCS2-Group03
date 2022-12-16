# I, Cần cài những gì bây giờ
Bạn là 1 newbie, và vào một ngày đẹp trời, bạn nhận 1 request từ "sếp" của bạn: "Tình hình là anh có 1 con server linux, chaỵ ubuntu 20, a cần em cài giúp anh môi trường để chạy dự án abc...xyz", "ơ... dạ vâng". Xong, dù trước đó rất lâu, "có vẻ" như bạn đã từng tự cài 1 vài thứ như thế này, nhưng do làm dự án outsource dài dài, nên bạn quên luôn cách cài như thế nào, Haizzzz. Bỏ qua những thứ phức tạp như docker thì đây sẽ là bài viết "thuần" về việc cài môi trường cho 1 project, cụ thể là project Laravel nhé.
Giới thiệu 1 chút về các công nghệ mà dự án mình sẽ sử dụng nhé:

    Backend : Laravel 8, PHP 8.1
    Admin: Reactjs
    End-User: Nextjs
    DB: Mysql

WebServer mình sử dụng ở đây là Apache nhé (bạn hoàn toàn có thể dùng Ngnix để config). Bắt đầù thôi, mình sẽ cài LAMP Stack  nhé, giới thiệu lại thì LAMP theo thứ tự là Linux, Apache, Mysql và PHP. Vì đây là server Linux nên dùng LAMP, bạn có thể dùng WAMP trên Windows, MAMP trên MacOS, và XAMPP ở mọi OS trên. Bắt đầu thôi.

Vì Ubuntu 20 đã tương ứng với phần phần L (LINUX) của LAMP nên ta sẽ cài từ Apache trở đi 

### Cài đặt Apache 
Apache là phần mềm web server miễn phí mã nguồn mở. Nó đang chiếm đến khoảng 45% thị phần websites trên toàn thế giới. Tên chính thức của Apache là Apache HTTP Server, được điều hành và phát triển bởi Apache Software Foundation. Để cài nó thì khá đơn giản, chỉ cần run lệnh sau:

`$ sudo apt-get install apache2 -y`

Tiếp theo, mở trình duyệt gõ IP của server(ở local thì sẽ là localhost hoặc 127.0.0.1 đó) để kiểm tra Apache đã hoạt động chưa.
![](https://images.viblo.asia/fe909e6b-ee89-47b9-9c01-9907e801241a.png)

* Khi trình duyệt hiện ra như trên, đã cài đặt Apache thành công. Tiếp theo sẽ cài đặt MySQL.
### Cài đặt MySQL
MySQL là hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở,  được sử dụng phổ biến rộng rãi trên thế giới.
Có thể cài đặt như sau: 
```
$ sudo apt-get install mysql-server -y
```

Để cài mật khẩu cho tài khoản root :
```
$ sudo mysql
```
![](https://images.viblo.asia/fdd2e719-65f0-4bc2-8745-4ba607938695.png)

Tiếp tục : `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';`
Thay "your password" bằng mật khẩu bạn muốn

![](https://images.viblo.asia/471eda69-3e7f-40ba-b25d-86b17979ea2e.png)

Sau đó gõ exit để thoát

![](https://images.viblo.asia/9caeb6c5-c4b6-4888-9546-6782bf8e17d8.png)

Nếu muốn đổi mật khẩu của root chạy lệnh sau :
```
$ sudo mysql_secure_installation
```

![](https://images.viblo.asia/78b844f6-d99e-44e7-8e18-253b05c84ca2.png)
* Ở đây có 2 lựa chọn, nếu chọn Y sẽ sử dụng VALIDATE PASSWORD PLUGIN có nghĩa là bạn phải sử dụng mất khẩu mạnh cho cơ sở dữ liệu, như là độ dài mật khẩu phải trên 8 kí tự, in hoa, in thường, kí tự đặt biệt, etc... Còn nếu chọn N sẽ không sử dụng VALIDATE PASSWORD PLUGIN. Và ở đây cài đặt trên máy cá nhân nên cũng không cần sử VALIDATE PASSWORD PLUGIN. Nên ở đây mình sẽ chọn N để tiện cho việc cài đặt.
* Sau khi chọn N, sẽ yêu cầu bạn thiết lập mật khẩu cho MySQL. Ở đây để dễ nhớ mình sẽ đặt là: 123456

![](https://images.viblo.asia/96226670-df51-405d-b0fd-0f6b178f37d7.png)

* Gõ lại mật khẩu lần nữa. Và ấn Enter.

![](https://images.viblo.asia/1a538b6a-8f72-4358-8bc2-abd68915addc.png)

* Tiếp theo chọn Y và ấn Enter.

![](https://images.viblo.asia/c16dffe8-9e0a-424a-95c7-ef14f45f3713.png)

* Tiếp theo chọn N và ấn Enter.

![](https://images.viblo.asia/6009812f-69c7-476b-a8b0-3d742f8c0b20.png)

* Tiếp theo chọn Y và Enter.

![](https://images.viblo.asia/5d841ec1-e7a6-4a23-afb4-14b297668ebc.png)



* Tiếp theo chọn Y và Enter.

![](https://images.viblo.asia/2b9c604b-ca30-4edb-bd58-1ad8c75f0b6f.png)

Đã thay đổi xong, bây giờ  chạy 

```
$ mysql -u root -p
```

Xong nhập mật khẩu mới, nếu login thành công thì tức là bạn đã cài xong Mysql server nha, nhớ note lại mật khẩu

### Cài đặt PHP

```
sudo apt install software-properties-common && sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install php8.1 libapache2-mod-php8.1
```

Kiểm tra phiên bản PHP bằng lệnh  `php --version`

Tiếp theo ta cần cài các extension cho PHP tùy theo phiên bản php nhé:

```
sudo apt install php8.1-common php8.1-mysql php8.1-xml php8.1-xmlrpc php8.1-curl php8.1-gd php8.1-imagick php8.1-cli php8.1-dev php8.1-imap php8.1-mbstring php8.1-opcache php8.1-soap php8.1-zip php8.1-intl -y
```

Như vậy là đã thiết lập LAMP thành công ^^.

### Cài đặt Composer
Composer là công cụ để quả lý package hay library PHP. Composer sẽ cài đặt những libraries vào trong project bạn đang làm việc.

Composer yêu cầu phải có:
**php-cli** để thực thi các tập lệnh PHP trong dòng lệnh.
**unzip** để giải nén các lưu trữ.
Nếu chưa cài thì `sudo apt install php-cli unzip -y` để cài nhé

```
$ cd ~
$ curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
$ HASH=`curl -sS https://composer.github.io/installer.sig`
$ echo $HASH
$ php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
$ sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```
Sau khi cài xong gõ `composer` để kiểm tra như dưới hình là thành công, ở bước tiếp theo chỉ cần kéo project laravel về, cd vào root của project và chạy composer install

![](https://images.viblo.asia/39abe5fe-f4f9-419d-8ccf-010d6c84a160.png)

Tham khảo tại : https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04
### Cài đặt Nodejs
Để cài nodejs trước hết ta cài nvm, vì nvm cho phép ta switch giữa các bản nodejs, rất thuân tiện

```
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
source ~/.bashrc 
```

Sau đó ta có thể cài bản nodejs cần , ở đây mình chọn node 12.18.3, làm tương tự với các bản node khác

```
nvm install 12.18.3
```
Khi muốn đổi node version (sang 14 chẳng hạn) ta chỉ cần 
```
nvm install 14
nvm use 14
```

Nếu muốn để mặc định node version (ví dụ 14)
```
nvm alias default 14
```


Về cơ bản thì chúng ta đã cài xong phần môi trường, tiếp sau đây ta kéo code trên git về thư mục /var/www/html/ ( nếu thư mục chưa tồn tại  thì ta có thể tạo mới thư mục, ta hoàn toàn có thể tạo 1 thư mục bất kì nhé, không nhất thiết cứ phải là /var/www/html/ )
Giả sử tôi đang có 1 cây thư mục như sau:

![](https://images.viblo.asia/65dc213c-17bc-4b81-803c-eaf4feb84b78.png)

                  
 Với backend chạy laravel, dùng để xử lí api
 
 Admin là site quản lí, chạy reactjs
 
 User là site người dùng cuối, chạy nextjs
 
 Đối với Project User do dùng nextjs, ta cần cài thêm pm2 và start nó với 1 cổng cố định (ở đây mình chọn 3001) (phần này các bạn tự gg search để cài và chạy nhé, lưu ý cổng 3001 sẽ không được đăng kí trong /etc/apache2/ports.conf) cài xong pm2 thì enable proxy lên nhé `sudo a2enmod proxy`, ta sẽ sử dụng proxy trong config bên dưới cho việc chạy pm2.
 
 Ta sẽ bỏ qua phần thêm biến .env cho từng project ở trên , hay cài thư viện cho nó (composer install, npm install, yarn, kết nối DB, migrate, seeder, ...), sau đây mình sẽ tiếp tục phần config Apache
###  Config Virtual Host
Trong phần này ta cần chú ý tới 1 số thư mục sau 
1. /etc/apache2/ports.conf
Thư mục này để đăng kí việc port sẽ được sử dụng
```
sudo vi  /etc/apache2/ports.conf
```

![](https://images.viblo.asia/adb9529d-326e-42b7-aa85-0382fcb1214e.png)

Sau khi thêm port cần thiết gõ "Esc" =>   ": + wq" => "ENTER" để lưu

Chạy "sudo service apache2 restart" để chạy lại apache

2. /etc/hosts
Thư mục này để đăng kí Alias 

```
sudo vi  /etc/hosts
```

![](https://images.viblo.asia/106608ca-505e-4670-a575-0ed69cc56df8.png)

Phần này sẽ được liên kết tới phần ngay sau đây.

3. /etc/apache2/sites-availabels
Config trong thư mục này giúp các project tự động chạy vào index mà không cần phải "php artisan serve" với laravel hay "npm run dev" với reacjs

Chúng ta có thể sửa vào file default
```
sudo nano /etc/apache2/sites-available/000-default.conf
```

Nhưng tốt hơn hết là ta nên copy ra 1 file config mới, để tên cho dễ nhớ nhé

```
sudo su
a2enmod rewrite  // bật chế độ ghi đè
cd /etc/apache2/sites-available/  // di chuyển 
cp 000-default.conf democonfig.conf  // sao chép file
a2dissite 000-default.conf  // disable 
a2ensite democonfig.conf   // enable
vi democonfig.conf   // mở file để chỉnh sửa 
```

trong democonfig ta sẽ sửa như dưới đây :
```php
<VirtualHost *:8000>
        ServerName _
        ServerAlias project-dev   // phải trùng tên đã đăng kí trong /etc/hosts
        DocumentRoot /var/www/html/backend/public

        <Directory /var/www/html/backend/public/>
            Options Indexes FollowSymLinks MultiViews
            AllowOverride All
            Order allow,deny
            allow from all
            Require all granted
        </Directory>

        LogLevel debug
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combinedwq
</VirtualHost>

<VirtualHost *:80>
        ServerName _
        DocumentRoot /var/www/html/admin/dist

        <Directory /var/www/html/admin/dist>
            Options Indexes FollowSymLinks MultiViews
            AllowOverride All
            Order allow,deny
            allow from all
            Require all granted
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combinedwq
</VirtualHost>

<VirtualHost *:3000>
        ServerName _
        
          ProxyPreserveHost On
          ProxyPass / http://localhost:3001/                   //phần chạy pm2 nè
          ProxyPassReverse / http://localhost:3001/             //phần chạy pm2 nè
          
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combinedwq
</VirtualHost>
```
Như đã thấy ở trên , phần API mình để chạy ở cổng 8000, admin ở cổng 80, user ở cổng 3000, các cổng được đăng kí trong /etc/apache2/ports.conf, còn ServerAlias có tên trùng với tên được đăng kí trong /etc/hosts
Sau khi lưu cấu hình trên ta restart lại apache nhé : `sudo service apache2 restart`

Xong rồi, việc tiếp theo ta sẽ ra ngoài trình duyệt và tận hưởng thành quả nhé, chúc các bạn thành công!