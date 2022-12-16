Hôm nay mình sẽ chia sẻ với các bạn cách deploy Laravel project lên AWS ubuntu instance. Trong phần này mình sẽ giới thiệu với các bạn các thao tác trên server, ok bắt đầu nhé.

### Chuẩn bị
Các bạn cần có 1 tài khoản aws, trong bài viết này mình sẽ sử dụng tài khoản aws free 1 năm, các bạn cũng có thể đăng ký tại trang chủ của [AWS](https://aws.amazon.com/), đăng ký rất đơn giản chỉ cần nhập thông tin và thẻ visa. Sau khi đăng ký các bạn xong thì hãy tạo 1 instance(ubuntu) trong EC2 service, mình sẽ không đi chi tiết vào phần này.

> Chú ý: khi tạo instance nhớ add thêm rule http trong tab **Configure Security Group** và khi tạo instance aws sẽ cấp chúng ta 1 private key bằng 1 file .pem

![](https://images.viblo.asia/1f146bdd-8a18-4572-b32c-515ec082fbd3.jpg)

### SSH vào server tạo tài khoản và thiết lập SSH

Đầu tiên kết nối với EC2 instance bằng cách sử dụng private key mà aws cung cấp cho chúng ta.
```shell
ssh -i mykey.pem ubuntu@public-dns.compute-1.amazonaws.com
```

Tiếp theo, chúng ta sẽ tạo user. Chúng ta sẽ chỉ định rõ đường dẫn home, shell mặc định sẽ sử dụng bash và thêm user vào trong admin group

```shell
sudo adduser --home /home/cuong --shell /bin/bash --ingroup admin *username*
```

Sau khi thêm mới user, chúng ta sẽ thêm quyền sudo cho user và user sẽ không cần nhập khẩu khi sử dụng sudo bằng cách thêm đoạn sau đây vào trong file `/etc/sudoers`

```shell
# Mở file
sudo nano /etc/sudoers
# Thêm dòng này
username ALL=(ALL) NOPASSWD:ALL
```

Tiêp theo, chúng ta sẽ thiết lập SSH. 
Bây giờ, chúng ta sẽ copy file chứa ssh key của máy lên server, nếu máy bạn chưa có file ssh key thì có thể xem cách tạo tại đây [setup ssh key on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1604)

```shell
scp -i mykey.pem ~/.ssh/id_rsa.pub ubuntu@public-dns.compute-1.amazonaws.com:/tmp/
```

Quay lại server vào copy file này vào thư mục home của user chúng ta vừa tạo.

```shell
su username
cd ~
mkdir .ssh
cat /tmp/id_rsa.pub > .ssh/authorized_keys
chmod 600 .ssh/*
chmod 700 .ssh/
```

Bây giờ chúng ta có thể kết nối vào server bằng user mà chúng ta vừa tạo và không cần nhập mật khẩu

```shell
ssh username@public-dns.compute-1.amazonaws.com
```

### Cài đặt Web Server

Trong bài viết này mình sẽ sử dụng Apache và PHP 7.2

Cài đặt Apache web server bằng lệnh sau
```shell
sudo apt-get install apache2
```
Sau khi cài đặt hoàn tất, bạn có thể start Apache
```shell
sudo systemctl start apache2
```
Ngoài ra, bạn có thể kích hoạt tự động mở Apache mỗi khi server khởi động bằng lệnh sau
```shell
sudo systemctl enable apache2
```
Kiểm tra trạng thái của Apache
```shell
sudo systemctl status apache2
```

Tiếp theo, chúng ta cài đặt **Ondřej Surý’s PPA**  do PHP 7.2 được cài đặt bằng **Ondřej Surý’s PPA**
```shell
sudo apt-get install software-properties-common python-software-properties
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update
```
Cài đặt php 7.2 bằng lệnh sau
```shell
sudo apt-get install php7.2 php7.2-cli php7.2-common php7.2-fpm
```
Cài đặt các php 7.2 extensions cần thiết
```shell
sudo apt-get install php7.2-curl php7.2-gd php7.2-json php7.2-mbstring php7.2-intl php7.2-mysql php7.2-xml php7.2-zip php7.2-bcmath
```
Kiểm tra php version
```
php -v
```

### Thêm Swap cho server
Mặc định khi tạo EC2 ubuntu instance nó không tạo swap cho mình nên mình sẽ chia sẻ thêm phần này.

Để chắc chắn, chúng ta sẽ kiểm tra xem server có swap chưa
```shell
free -m
```
```shell
              total       used       free     shared    buffers     cached
Mem:          3953        154       3799          0          8         83
-/+ buffers/cache:         62       3890
Swap:            0          0          0
```
Kiểm tra dung lượng ổ cứng
```shell
df -h
```
```shell
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda         59G  1.3G   55G   3% /
none            4.0K     0  4.0K   0% /sys/fs/cgroup
udev            2.0G   12K  2.0G   1% /dev
tmpfs           396M  312K  396M   1% /run
none            5.0M     0  5.0M   0% /run/lock
none            2.0G     0  2.0G   0% /run/shm
none            100M     0  100M   0% /run/user
```
Ở đây server chưa có swap và ổ cứng vẫn còn trống 55Gb.

Tiếp theo mình sẽ tạo swap 4Gb bằng lệnh sau
```shell
sudo fallocate -l 4G /swapfile
```

Chúng ta có thể xác nhận lại dụng lượng swap bằng lệnh
```shell
ls -lh /swapfile
```
```shell
-rw-r--r-- 1 root root 4.0G Apr 28 17:19 /swapfile
```

Chúng ta cần điểu chỉnh lại quyền cho swapfile để bất kỳ ai cũng không đọc được
```
sudo chmod 600 /swapfile
```
Kiểm tra lại quyền của swapfile
```shell
ls -lh /swapfile
```
```shell
-rw------- 1 root root 4.0G Apr 28 17:19 /swapfile
```
File swap đã sẵn sàng nên chúng ta sẽ kích hoạt swap bằng lệnh
```shell
sudo mkswap /swapfile
sudo swapon /swapfile
```
Bây giờ chúng ta kiểm tra lại xem server đã có swap chưa
```shell
free -m
```
```shell
             total       used       free     shared    buffers     cached
Mem:          3953        101       3851          0          5         30
-/+ buffers/cache:         66       3887
Swap:         4095          0       4095
```

### Cài đặt Composer và Laravel

Cài đặt **Composer**
```shell
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/bin/composer
```

Cài đặt **Laravel** thông qua composer. Ở đây chúng ta sử dụng Apache nên sẽ tạo project trong thư mục `/var/www/html`
```shell
composer create-project laravel/laravel /var/www/html/my-app
```

Điểu chỉnh quyền cho project
```
chown -R www-data:www-data /var/www/html/my-app

chmod -R 755 /var/www/html/my-app/storage
```

Thiết lập **Document Root**
Mở config của Apache
```
sudo nano /etc/apache2/sites-available/000-default.conf
```
Sửa document root
```
DocumentRoot /var/www/html/my-app/public
```
Sau đó restart lại Apache
```shell
sudo systemctl restart apache2
```

Ok bây giờ chúng ta sẽ truy cập vào IP hoặc public dns của server để xem kết quả.
![](https://images.viblo.asia/0c8c7b00-f7e1-460c-9e1d-6b0d723a99b7.png)

Trong phần này mình đã giới thiệu với các bạn cách thao tác với server, trong phần sau mình sẽ chia sẻ với các bạn cách viết script deploy cho Laravel. Thank for reading!!!!!!!!