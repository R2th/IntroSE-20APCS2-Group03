# Lời mở đầu
Xin chào các bạn, trong bài viết trước mình đã hướng dẫn các bạn tạo một **VPS** trên **Vulter**. Bài viết này mình sẽ hướng dẫn các bạn các bước chi tiết để có thể **deploy** một project **Laravel** hoàn chỉnh lên **VPS**. Bắt đầu thôi 👌

## 1. Cài đặt apache2 
### 1.1 Cài đặt apache2
```
sudo apt update
sudo apt install apache2
```
### 1.2 Điều chỉnh firewall
```
sudo ufw app list
```
- Sẽ hiển thị tab như thế này
![image.png](https://images.viblo.asia/c322a7e5-7e55-447d-b0c3-4fc42300f3d5.png)

- Có 3 cấu hình sẵn của **apache2**
    * **Apache**: Cấu hình này chỉ mở cổng 80 (lưu lượng web bình thường không được mã hóa)
    * **Apche Full**: Cấu hình này mở cả cổng 80 (lưu lượng web bình thường, không được mã hóa) và cổng 443 (lưu lượng được mã hóa **TLS/SSL**)
    * **Apache Secure**: Cấu hình này chỉ mở cổng 80 (lưu lượng web bình thường, không được mã hóa)
Bạn nên bật cấu hình hạn chế nhất cho phép lưu lượng mà bạn định cấu hình. **Vultr** chưa bật cấu hình trên cổng 80 nên bạn cần phải bật cổng này

```
sudo ufw allow 'Apache'
```

- Để kiểm tra sự thay đổi, dùng câu lệnh sau:

```
sudo ufw status
```

- Nếu **terminal** hiển thị như thế này là ok
![image.png](https://images.viblo.asia/8b3cceb8-f5f7-40e8-86fd-b3ea33873405.png)

- Kiểm tra lại nếu truy cập vào **host** hiển thị giao diện **apache** như thế này là oke
![image.png](https://images.viblo.asia/af451eec-f4cc-4c12-ba1d-130248f23bdb.png)


## 2. Cài đặt php
Bài viết này mình sẽ hướng dẫn các bạn cài đặt **php8.0**

- **Enabling PHP Repository**
```
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php
```
- **Installing PHP 8.0 with Apache**

```
sudo apt update
sudo apt install php8.0 libapache2-mod-php8.0
```
- **Install php8.0 extentsions**
```
sudo apt install php8.0-common php8.0-mysql php8.0-xml php8.0-xmlrpc php8.0-curl php8.0-gd php8.0-imagick php8.0-cli php8.0-dev php8.0-imap php8.0-mbstring php8.0-opcache php8.0-soap php8.0-zip php8.0-intl -y
```
**- Restart apache**

```
sudo systemctl restart apache2
```

  - **Configure Apache with PHP-FPM**

**Php-FPM** là một trình quản lý quy trình **FastCGI** cho **PHP**
```
sudo apt update
sudo apt install php8.0-fpm libapache2-mod-fcgid
```

Mặc định **php-fpm** không được bật trong **apche**. Để bật nó
```
sudo a2enconf php8.0-fpm
```

- **Restart apache**
```
systemctl restart apache2
```
## 3. Cài đặt mysql
```
sudo apt update
sudo apt install mysql-server
```
Để chắc chắn **server mysql** đang chạy
```
sudo systemctl start mysql.service
```
- Cấu hình **mysql**
Mình sẽ hướng dẫn các bạn tự cài đặt mật khẩu cho mình.
```
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
exit
```
Để truy cập lại vào **mysql**. Chạy lệnh sau và nhập mật khẩu của bạn.
```
mysql -u root -p
```
Ngoài ra các bạn có thể cài mật khẩu nâng cao bằng câu lệnh sau
```
sudo mysql_secure_installation
```
- Tạo một **database**
```
create database deployment;
```
## 4. Tạo user deploy
Các bạn dùng câu lệnh sau để tạo **user deploy**. Nhập mật khẩu và các thông tin hoặc bạn có thể enter để tự động nhập các thông tin mặc định
```
sudo adduser deploy
```
- Cấp quyền sudo cho **user** **deploy**
```
sudo usermod -aG sudo deploy
```
- Taọ key cho **user deploy**
```
su - deploy
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"
```
- Chuyển **user** chạy tiến trình apache thành **deploy**
```
sudo vi /etc/apache2/apache2.conf
```
Các bạn tìm đến dòng mà có **User** và **group** ![image.png](https://images.viblo.asia/c6272ab4-3ebe-4672-872b-e671ae336186.png)
Sửa thành
```
User deploy
Group deploy
```
Chuyển owner **/var/www/html**
```
sudo chown --recursive deploy:deploy /var/www/html
```
- Chuyển **user** chạy tiến trình **php-fpm** thành **deploy**
```
sudo vi /etc/php/8.0/fpm/pool.d/www.conf
```
Sửa config
```
user = www-data => user = deploy
group = www-data => group = deploy
listen.owner = www-data => listen.owner = deploy
listen.group = www-data => listen.group = deploy
```
Chuyển **owner** của **php8.0-fpm.sock**
```
sudo chown deploy /run/php/php8.0-fpm.sock
```
## 5. Cài đặt project
- Thêm **deploy keys** vào trong **repository** trên **github**. Các bạn lấy **public key** trong folder **.ssh/id_rsa.pub**. Lấy **key** đó và tạo trên **github** như thế này
![image.png](https://images.viblo.asia/63954a55-fbc2-4d26-bc59-e97b77553aea.png)
- Khi kết nối thành công các bạn có thể dùng **ssh** để clone project
```
git clone git@github.com:hoangtrunga1k55/your_project.git
cp .env.example .env
```
- **Cài đặt composer**
```
sudo apt update
cd ~
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
HASH=`curl -sS https://composer.github.io/installer.sig`
php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```
- **Cài đặt nodeJs**

Bài viết này mình sẽ hướng dẫn các bạn cài đặt **NodeJs** bằng **Nvm**
- **Install Nvm**
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
```
- **Xem danh sách version Nodejs**
```
nvm list-remote
nvm install v14.10.0
npm install
nvm run dev
```
Tuỳ chỉnh môi trường trong file **.env**
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=deployment
DB_USERNAME=root
DB_PASSWORD=password
```
- **Generate key**
```
php artisan key:generate
php artisan migrate
```
- **Restart php-fpm**
```
systemctl restart php8.0-fpm.service 
```
## 6. Cấu hình vitual host
```
 vi /etc/apache2/sites-enabled/000-default.conf
```
- Sửa **DocumentRoot** tới đường dẫn **project** của bạn`
```
DocumentRoot /home/deploy/ten_project/public
```

- Cấu hình **apache2.conf**
```
vi /etc/apache2/apache2.conf
```
Thêm cấu hình cho đường dẫn đến **project** của bạn
```
<Directory /home/deploy/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```
- **Restart apache2**
```
sudo systemctl restart apache2
```
- **Thành quả:**

![image.png](https://images.viblo.asia/d2fb5f4e-1b6c-4f4b-8ea1-ae543aa9ae8a.png)

# Kết luận
Như vậy trong bài viết này mình đã hướng dẫn các bạn cách **deploy** bằng cơm một project **Laravel** lên **VPS**. Hi vọng bài viết này sẽ giúp ích được cho các bạn. Nếu có thắc mắc hay có câu hỏi đừng ngần ngại mà hãy góp ý cho mình. Mình sẵn sàng đón nhận. Trong bài viết tới mình sẽ hướng dẫn các bạn **deploy** dự án một cách tự động bằng **Deployer**. Hi vọng sẽ nhận được sự ủng hộ của các bạn 🥰