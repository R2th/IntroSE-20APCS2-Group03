Xin chào mọi người.

Mình nhận thấy nhiều bạn muốn đưa website lên tên miền nhưng quy trình thường deploy 1 server mới khá mất thời gian. Hôm nay nhân lúc rảnh rỗi mình sẽ hướng dẫn các bạn cài đặt LAMP trên server VPS Ubuntu 18.04 mới hoàn toàn và deploy project Laravel lên server rất nhanh chóng bằng 1 vài script có sẵn.

Nào mình cùng bắt đầu nhé
## 1. Install Apache2
Đầu tiên mình sẽ cài Apache2 bằng các lệnh dưới,
```
sudo apt install apache2
```

Sau khi cài đặt bạn chạy lệnh dưới để kiểm tra nhé:
```
sudo ufw app list
```
Và đây là kết quả:
![List apache2](https://images.viblo.asia/a9eb97b5-7841-4efa-9bc8-20275a6b4045.PNG)

## 2. Install MYSQL 5.7
### 2.1 Install
Tiếp đến mình sẽ cài Mysql 5.7 bằng lệnh dưới
```
sudo apt install mysql-server-5.7
```

Và kiểm tra version mysql đã được cài đặt thành công hay chưa?
```
mysql --version
```

### 2.2 Create user and grant permission
Mình sẽ tạo 1 user là `admin` và password là `123456`, sau đó sẽ gán full quyền cho user này
```
mysql> CREATE USER 'admin'@'localhost' IDENTIFIED BY '123456';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
mysql> FLUSH PRIVILEGES;
```

Bạn có thể test login user này bằng command:
```
mysql -uadmin -p123456
```

### 2.3 Bind address for access
Mở file `/etc/mysql/mysql.conf.d/mysqld.cnf` bằng nano và sửa như bên dưới
```
nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

From: bind-address 127.0.0.1
To: bind-address 0.0.0.0

### 2.4 Opent port 3306
Để mở port 3306 cho bên ngoài truy cập vào, các bạn chạy command dưới:
```
iptables -I INPUT -p tcp -m tcp --dport 3306 -j ACCEPT
```
Sau khi sửa bạn đã có thể access vào database bằng tool như Navicat, Mysql Workbend, ... rùi đó 

## 3. Install PHP 7.3
Tiếp theo mình sẽ cài PHP 7.3 lên server.

Do trên 1 số server mới tạo bây giờ không còn để mặc định các package của PHP 7.3 nên mình sẽ phải thêm các package để cài bằng các command dưới:
```

sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ondrej/php
sudo apt update
sudo apt install php7.3 php7.3-fpm php7.3-common php7.3-zip php7.3-curl php7.3-xml php7.3-xmlrpc php7.3-json php7.3-mysql php7.3-pdo php7.3-gd php7.3-imagick php7.3-ldap php7.3-imap php7.3-mbstring php7.3-intl php7.3-cli php7.3-recode php7.3-tidy php7.3-bcmath php7.3-opcache
```
Sau đó kiểm tra version PHP vừa cài đặt

```
php -v
```
![Version PHP 7.3](https://images.viblo.asia/2a18edaf-1c3c-4e2f-b87f-1dee3d930b44.PNG)

## 4. Generate SSH
Tiếp theo sẽ là generate ssh key để dùng ssh key này access vào github và clone code trên server:
```
ssh-keygen -t rsa -b 4096 -C "your-email@gmail.com"
```
Tiếp theo bạn cứ enter là xong.

Sau đó bạn có thể xem ssh public của bạn bằng command:
```
cat ~/.ssh/id_rsa.pub
```
![SSH public](https://images.viblo.asia/db2950e8-773c-442e-a7e2-2c23fea95583.PNG)

## 5. Add ssh key to github
Tiếp theo bạn login vào Github của mình, vào mục Setting -> SSH and GPG keys
Click vào New key và add ssh key public của mình vào đó
![Add ssh key](https://images.viblo.asia/0ab42b97-513d-4f92-944a-628e5fb53935.PNG)

Như vậy là trên server của bạn có thể clone được source code trên github rùi!

## 6. Install composer
Để cài đặt các package của laravel mình sẽ cài composer v2.1.3 mới nhất theo tài liệu ở [đây](https://getcomposer.org/download/) :

```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

Sau đó để gõ được lệnh composer ở mọi nơi, mình sẽ dùng lệnh này:
```
sudo mv composer.phar /usr/local/bin/composer
```

## 7. Setup project laravel
Tiếp theo đến mục cài đặt cho project.
* Di chuyển vào thư mục html
```
cd /var/www/html/
```

* Clone source code từ github
```
git clone git@github.com:xxx/xxx.git newdomain
```

Copy đoạn script ngắn này lưu thành `script_deploy.sh`vào thư mục `$ROOT/deploy` trong project
```
#Setup new domain
newdomain=$1

cd /var/www/html/$newdomain
composer install

#Config .env
cp .env.example .env && mkdir -p bootstrap/cache storage/framework/{sessions,views,cache}
chmod -R 777 storage bootstrap/cache
git reset --hard

#Replace APP info in .env file
sed -i -s "s/APP_URL=http:\/\/localhost/APP_URL=https:\/\/www.${newdomain}/gI" /var/www/html/$newdomain/.env
sed -i -s "s/APP_ENV=local/APP_ENV=prod/gI" /var/www/html/$newdomain/.env
sed -i -s "s/APP_DEBUG=true/APP_DEBUG=false/gI" /var/www/html/$newdomain/.env
sed -i -s "s/LOG_CHANNEL=stack/LOG_CHANNEL=single/gI" /var/www/html/$newdomain/.env

#Setup database in .env file
sed -i -s "s/DB_DATABASE=homestead/DB_PASSWORD=${newdomain}/gI" /var/www/html/$newdomain/.env
sed -i -s "s/DB_USERNAME=homestead/DB_USERNAME=admin/gI" /var/www/html/$newdomain/.env
sed -i -s "s/DB_PASSWORD=secret/DB_PASSWORD=123456/gI" /var/www/html/$newdomain/.env

#Generate key Laravel
php artisan key:generate

#Config apache
cp deploy/apache.conf /etc/apache2/sites-available/$newdomain.conf
sed -i -s "s/domain/${newdomain}/gI" /etc/apache2/sites-available/$newdomain.conf
sudo a2ensite $newdomain.conf

echo "All done! :D"
```

** Lưu ý: **
- Bạn nên sửa lại thông tin DB cho đúng trước khi chạy script nhé

Tiếp theo copy config apache2 vào file apache2.conf vào thư mục `$ROOT/deploy`
```
<VirtualHost *:80>
        ServerName www.domain

        ServerAdmin admin@domain
        DocumentRoot /var/www/html/domain/public

        <Directory /var/www/html/domain/public>
                Options FollowSymLinks
                AllowOverride All
                DirectoryIndex index.php
                Require all granted
        </Directory>

#       ErrorLog ${APACHE_LOG_DIR}/error.log
#       CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
<VirtualHost *:80>
      ServerName domain
      ServerAlias *.domain
      Redirect permanent / https://www.domain/
</VirtualHost>
```
File config apache2 trên đây là mình config cho cả https bằng cloud flare, nếu bạn nào quan tâm bạn có thể đọc bài viết trước của mình tại [đây ](https://viblo.asia/p/them-https-cho-website-su-dung-cloudflare-yMnKM8Rj57P)

Chạy command để run script;
```
#Thêm quyền excute script
chmod +x deploy/script_deploy.sh

#Run script
./deploy/script_deploy.sh domain-of-you.com
```

All done! :D

## 8. Kết quả
Sau khi chạy command deploy trên, project của bạn đã cài đặt xong, đã config sẵn apache cho domain mới và đã enable domain.

Giờ bạn chỉ việc vào nhà cung cấp tên miền trỏ IP vào server của bạn là xong! Sau đó truy cập vào domain của bạn và thưởng thức!

### Bonus
Mình đã dùng qua 2 nhà cung cấp VPS sau và đã thấy nó có các ưu điểm:
- Dễ sử dụng, 
- Ổn định 
- Giá rẻ
- Scale bằng 1 click
- Support rất nhanh!
Bạn nào có nhu cầu thì có thể sử dụng qua xem nhé!

1. Digital Ocean

[![Digital Ocean](https://images.viblo.asia/a1fd6a02-48f2-4e1d-9a29-e06edfdfd77e.PNG)](https://www.digitalocean.com/?refcode=be488764423e&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

2. Vultr

[![Vultr](https://images.viblo.asia/9df4d305-0a0c-41ea-aad0-54648251b490.png)](https://www.vultr.com/?ref=7130487)

Thanks for reading!