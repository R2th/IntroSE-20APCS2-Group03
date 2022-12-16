# Cài đặt môi trường trên server
Các công nghệ sẽ sử dụng
- Docker
- Ubuntu 16.04
- SSH
- Nginx
- PHP 7.2 packages
- Mysql
- Jenkins

Ở bài này mình sẽ dùng một web được viết bằng laravel để demo, đầu tiên chúng ta cần chuẩn bị trước mã nguồn của web và đẩy lên github.

Giống với bài trước, bài này mình cũng sẽ sử dụng docker để tạo một con server ảo với hệ điều hành là ubuntu 16.04
Nếu chưa cài docker, bạn có thể tham khảo cách cài đặt docker tại [đây](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04). Tiếp theo tạo một máy chủ web dựa trên docker, mở terminal lên và gõ lệnh sau

```
docker run -it --name laravel_deploy_server ubuntu:16.04
```
sau khi chạy thành công, bạn sẽ được đưa đến bash của máy chủ giả lập bạn vừa tạo với user root,

Máy chủ này ngoài các phần mềm mặc định của Ubuntu 16.04 ra thì không có bất kỳ một phần mềm nào khác, mình sẽ từng bước cài đặt môi trường cho nó.

## Tạo user dùng để deploy.
Mình có thể thực hiện việc deploy với user mặc định có quyền cao nhất là root, tuy nhiên nên tạo các user khác thực hiện việc này, mục đích để dễ dàng quản lý quyền truy cập vào các tài nguyên nhạy cảm của máy chủ phòng trường hợp có chuyện gì xảy ra thì có thể dùng user root để cứu vãn.

Cài đặt sudo
```
apt-get update
apt-get install sudo
```

Tạo user deploy và thêm vào group sudo
```
sudo adduser deploy
usermod -aG sudo deploy
su deploy
```

## Cài đặt Git, nano

```
sudo apt-get install git
sudo apt-get install nano
```

## Cài đặt SSH và Nginx
Sau khi tạo user deploy, mình sẽ tiến hành cài đặt ssh để phục vụ việc lấy mã nguồn trên git hub (sẽ giải thích ở mục sau) và cài nginx (đọc là engine X) để làm web server.

Cài đặt ssh
```
sudo apt-get install ssh
sudo service ssh start
```

Cài đặt Nginx
```
sudo apt-get install -y nginx
sudo service nginx start
```

Vào file cấu hình nginx
```
sudo nano /etc/nginx/sites-enabled/default
```
và thay thế bằng nội dung sau
```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html/blog/current/public;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html index.php;

	server_name localhost;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ /index.php;
	}

        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }

        error_page 404 /index.php;

	location ~ \.php$ {
          fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
          fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
          include fastcgi_params;
        }
	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	#location ~ /\.ht {
	#	deny all;
	#}
}
```

## Cài đặt PHP và Mysql
Website mình dùng trong bài này được viết bằng Laravel nên mình sẽ cài đặt PHP và cơ sở dữ liệu là MySql.

Cài đặt PHP
```
sudo apt-get install software-properties-common python-software-properties
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update
sudo apt-get install php7.2 php7.2-cli php7.2-common
sudo apt-get install php7.2-curl php7.2-gd php7.2-json php7.2-mbstring php7.2-intl php7.2-mysql php7.2-xml php7.2-zip
php -v
```

Cài đặt mysql
```
sudo apt-get install mysql-server
sudo service mysql start
```

## Cài đặt composer

```
$ sudo apt-get install curl php-cli php-mbstring git unzip
$ curl -sS https://getcomposer.org/installer -o composer-setup.php
$ php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
$ sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
$ composer
```

## Chuẩn bị thư mục và cấu hình để deploy
Bây giờ ta sẽ tạo một thư mục `blog` để chứa code dự án tại /var/www/html, và tạo một thư mục shared trong thư mục blog để lưu lại các thông tin cấu hình giữa các lần deploy

```
sudo mkdir /var/www/html/blog
cd /var/www/html/blog
sudo mkdir shared
```

## Cài đặt Jenkins
Và cuối cùng là Jenkins để phục vụ mục đích deploy: [cài đặt Jenkins](https://gist.github.com/vupdh-0867/555a8b8da86be3acc25bf40f4fc6748d#file-install_php_n_mysql-md)

Note: Trong trường hợp bạn gặp lỗi
```
E: Package 'jenkins' has no installation candidate
```

Hãy chạy lại lệnh `sudo apt update` và tìm đến dòng lỗi sau

```
GPG error: http://pkg.jenkins-ci.org/debian-stable binary/ Release: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY <key public>
```
Copy đoạn `<key public>` và chạy các lệnh sau

```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <key public>
sudo apt update
sudo apt install jenkins
sudo service jenkins start
```

Phân quyền cho user jenkins với thư mục dự án
```
chown jenkins:jenkins /var/www/html/blog/
```
# Cấu hình Jenkins
Tiếp theo là quá trình cấu hình cơ bản, mình đã viết ở bài trước [tìm hiểu về Jenkins](https://viblo.asia/p/tim-hieu-ve-jenkins-tong-quan-va-cai-dat-aWj5334p56m#_5set-up-jenkins-4)

Sau khi hoàn tất quá trình cài đặt ta sẽ được đưa vào một trang chủ thế này

![](https://images.viblo.asia/b453c216-5ebc-4e1e-9816-b2a2ed748751.png)


Tiếp theo mình nhấp vào link New Item ở góc trái phía trên, nhập tên dự án, chọn freestyle project và nhấn nút OK.

![](https://images.viblo.asia/2c3f21f3-1b0a-4618-a855-d68d5998661c.png)


Ở phần `General` Chọn `GitHub project` và nhập đường dẫn của repository github của dự án ở text box `Project url`

![](https://images.viblo.asia/ecf8a386-182d-4e2b-9710-3e1acc48980b.png)


Ở phần `Source Code Management` chọn `git` và nhập đường dẫn của repository github của dự án.
Để Jenkins có quyền truy cập và kéo code từ repository github của chúng ta về, mình cần phải cấp quyền cho nó, ở đây mình sẽ sử dụng ssh đã cài đặt ở phần 2, bây giờ chúng ta sẽ tạo ssh key bằng lệnh
```
ssh-keygen -t rsa
```
Quay trở lại màn hình jenkins, ở mục `Credential` chọn Add > Jenkins như sau

![](https://images.viblo.asia/d171804c-921b-48c7-9e05-042f9fe5cb07.png)


Trong cửa sổ hiện lên, chúng ta chọn `Kind` là *SSH Username with private key*, vào terminal lấy nội dung secret key bằng lệnh `cat ~/.ssh/id_rsa` và nhập vào như hình dứoi

![](https://images.viblo.asia/6cd5ecec-1397-48db-b382-c6b1f2dbdb36.png)


Tiếp theo ta sẽ thêm ssh public key vào github, vào terminal lấy nội dung public key bằng lệnh `cat ~/.ssh/id_rsa.pub` và thêm vào github tại [đây](https://github.com/settings/ssh/new)

![](https://images.viblo.asia/e7f2e1d0-01f3-4524-8c2b-7d51dadcfede.png)

Ở phần `Build Environment` chọn option *Delete workspace before build starts* và phần `Build` chọn *Execute shell* trong combobox **Add build step**.

Quay về Jenkins, ta nhập các đoạn lệnh để deploy vào phần ô **Command**

![](https://images.viblo.asia/876ffefd-ea1f-4ef3-888c-13e7e927b1cc.png)


```
# Prepare
project_dir=/var/www/html/blog
tmp_dir=$(pwd)
shared_dir=$project_dir/shared
release_dir=$project_dir/release
current_dir=$project_dir/current
env_file=$shared_dir/.env

# Create release folder
mkdir -p $release_dir

# Workspace
cd $tmp_dir

# Env file
cp $env_file .env
echo APP_VERSION=$(git rev-parse --short HEAD) >> .env
echo GIT_BRANCH=$(git name-rev --name-only HEAD) >> .env

# Vendors
/usr/local/bin/composer install --no-dev --optimize-autoloader

# Migrate
php artisan migrate --no-interaction --force

# Symlink
unlink $current_dir
ln -s $tmp_dir $current_dir

# Remove code in release dir
sudo chown -R jenkins:jenkins $release_dir
rm -rf $release_dir


# Copy code to release dir
cp -r $tmp_dir/. $release_dir
cd $release_dir
/usr/local/bin/composer dump-autoload

unlink $current_dir
ln -s $release_dir $current_dir

# Remove tmp dir
sudo rm -rf $tmp_dir
sudo chmod -R 777 $release_dir
```

Nhấn nút `Save` và nhấn nút `Build Now` ở góc bên trái phía trên

![](https://images.viblo.asia/3574efce-04ea-48ab-9c42-8e19225f1dd4.png)

Sau vài lần build thất bại và sửa lỗi thì cuối cùng cũng thành công :D

![](https://images.viblo.asia/0daa0844-cff9-47d9-9951-ba24fa68aebc.png)


Bây giờ ta sẽ vào trình duyệt và kiểm tra web của chúng ta đã chạy hay chưa bằng cách mở terminal lên và kiểm tra ip của docker chứa webserver của chúng ta

```
docker inspect laravel_deploy_server | grep IPAddress
```

![](https://images.viblo.asia/dbe4c70d-34f4-4f13-ad58-5961eea02952.png)

Và nhập IP vào ô địa chỉ trên trình duyệt

![](https://images.viblo.asia/cab9fd4f-14f5-4d28-973c-b1068e7ac9a3.png)

Oke, như vậy là đã deploy xong.