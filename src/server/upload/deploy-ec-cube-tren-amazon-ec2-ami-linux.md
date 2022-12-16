Dạo gần đây mình có nghiên cứu một CMS khá lạ bên PHP, đó là EC-CUBE.
Nói qua chút về thằng này, thì EC-CUBE là một hệ thống quản trị nội dung có mã nguồn mở cho các website. Đây là một CMS phát triển tại Nhật Bản vì nó dễ dàng xử lý các chức năng và khả năng hoạt động. EC Cube hoạt động hiệu quả nhất trong việc thiết kế web bán hàng tích hợp hệ thống thanh toán online tiện lợi vô cùng với các mẫu website bán hàng chuẩn SEO giúp bạn dễ dàng lên top google.

Tuy nhiên có 1 khó khăn đó là đây là 1 CMS và PHP cũng là một ngôn ngữ mới với mình. Và mình cần build nó lên server trên EC2 trong vòng 2 ngày.
Task khá khó đối với 1 thằng chưa làm server nhiều như mình, và cũng là với hệ thống CMS khá là lạ. Tuy nhiên sau 2 ngày mò mẫm, kết hợp với kinh nghiệm đã từng làm với ruby thì cuối cùng mình cũng đã giải quyết được vấn đề này.

## 1. Cài đặt môi trường
Vì EC-CUBE là một CMS của PHP, và chạy trên nền tảng web . Cho nên dưới đây sẽ là phần mềm mà mình sẽ cài đặt:
1. Apache Version 2.4
2. Database：MySQL Ver.5.7
3. PHP Ver.7.3
Và vì chỉ là server test nên mình sử dụng con server nhỏ nhất của amazon là  t2.micro chạy hệ điều hành AMI Linux 2

### 1.1 Kiểm tra các phần mềm và timezone
Trước khi cài đặt các phần mềm, thì mình sẽ kiểm tra nó đã được cài đặt hay chưa, cũng như là set timezone của server là Asia/Tokyo.
```
sudo yum update -y
sudo yum list available | grep apache
sudo yum list available | grep http
sudo yum list available | grep php73

sudo timedatectl set-timezone Asia/Tokyo
timedatectl status
```

### 1.2 Cài đặt apache server
Lúc lựa chọn http server, thì mình khá là phân vân giữa apache và nginx. Vì 2 thằng này về điểm manh và yếu thì có thể nói là ngang ngửa nhau. Tuy nhiên khi mình tham khảo nhiều trên mạng, chủ yếu là các trang tiếng Nhật, thì với EC-CUBE này đa phần đều sử dụng apache nên mình follow theo.
```
sudo yum  install httpd.x86_64 -y
sudo yum  install httpd-devel.x86_64 -y
rpm -qa |grep http
```

Sau khi cài đặt apache xong, thì mình sẽ start service để khởi chạy apache
```
sudo chkconfig httpd on
sudo systemctl start httpd.service
sudo systemctl enable httpd.service
```

### 1.3 Cài đặt PHP và các thư viện cần thiết.
Vì EC-CUBE là một CMS viết bằng PHP, cho nên việc cài PHP là điều hiển nhiên :D
```
sudo amazon-linux-extras install php7.3 -y
sudo yum install php-gd php-mbstring libapache2-mod-php php-xml php-soap php-curl php-zip php-intl php-xmlrpc -y
```
Sư dụng lệnh ***php -v*** để kiểm tra version

### 1.4 Cài đặt Mysql Server
Để đảm bảo tính ổn định và có thể tương thích với CMS này, thì mình sẽ cài version Mysql là 5.7
```
yum info mysql
sudo yum localinstall https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm -y
sudo yum-config-manager --disable mysql80-community
sudo yum-config-manager --enable mysql57-community
yum info mysql-community-server
sudo yum install mysql-community-server -y
mysqld --version
```

Sau khi chạy lệnh ***mysqld --version*** mà nó trả về version hiện tại là 5.7 nghĩa là đã cài đặt thành công. Có thể nhiều bạn thắc mắc là khi cài đặt những lệnh trên, thì không thấy phần setting mật khẩu cho tài khoản root ở đâu cả. Phần này mình sẽ đè cập đến ở section 2.

Tương tự như apache thì mình sẽ start service để khởi chạy mysql

```
sudo systemctl start mysqld.service
sudo systemctl enable mysqld.service
systemctl status mysqld.service
```

### 1.5 Cài đặt composer
Vì EC-CUBE được xây dựng dựa trên framword Symfony của PHP, cho nên nó cũng sử dụng composer để  quản lý các thư viện.
Các bạn nên vào trang chủ để có thể xem hướng dẫn cài đặt: https://getcomposer.org/download/
Sau khi cài đặt xong, thì chúng ta cần copy file composer vào thư mục /usr/local/bin
```
sudo cp composer.phar /usr/local/bin/composer
ls -la /usr/local/bin/composer
```

### 1.6 Cài đặt git
Ngoài ra, nếu bạn cài đặt EC-CUBE từ repo trên github, hay là mong muốn deploy một ứng dụng EC-CUBE mà bạn đã custom cho riêng mình, thì bạn cần cài đặt và confit git như sau:
```
sudo yum install git
git config --global color.ui true
git config --global user.name "XXX" 
git config --global user.email "YOUR@EMAIL.com" 
ssh-keygen -t rsa -b 4096 -C "YOUR@EMAIL.com" 
```

Sử dụng lệnh ***cat ~/.ssh/id_rsa.pub*** để có thể lấy public key.
Sau đó cài đặt key ssh vào github theo đường link này: https://github.com/settings/keys

Kiểm tra kết nối đến github bằng lệnh
```
ssh -T git@github.com
```
## 2. Setting web server
### 2.1 Setting password cho tài khoản mysql
Như đã đề cập ở trước đó, thì lúc install mysql, thì nó không có bước cho chúng ta nhập mật khẩu cho tài khoản root. Vậy làm thế nào để có thể login vào mysql đây ?
Sau khi cài đặt mysql-server, thì hệ thống sẽ sinh ra một password mặc định ban đầu. Chúng ta cần thay đổi về mật khẩu của mình để có thể sử dụng mysql. Sử dụng các câu lệnh bên dưới để có thể lấy password đó:
```
sudo cat /var/log/mysqld.log | grep 'password is generated'
2020-01-22T05:31:04.321500Z 1 [Note] A temporary password is generated for root@localhost: XXXXXXXXXXX
```

OK, sau khi đã lấy được mật khẩu được khởi tạo lúc cài đặt, thì chúng ta sẽ tiến hành đổi lại theo password của mình:
```
$ mysql -u root  -p
mysql> set password for root@localhost=password('xxxx');
mysql> CREATE DATABASE suntest character set utf8;
```
### 2.2 Config apache
Bước tiếp theo là chúng ta sẽ config apache, để nó có thể trỏ đến thư mục chứa source code EC-CUBE của mình để chay ứng dụng web.
Mở file config của apache
```
sudo nano /etc/httpd/conf/httpd.conf
```

Thay đổi root và directory.

***[Ban đầu]***
```
DocumentRoot "/var/www/html" 
....

# Further relax access to the default document root:
<Directory "/var/www/html">
...
```

***[Sau khi thay đổi]***
```
DocumentRoot "/var/www/my-ec-cube" 
....

# Further relax access to the default document root:
<Directory "/var/www/my-ec-cube">
```

Trong đó thư mục my-ec-cube chính là thư mục chứa source code của mình.

Thay đổi quyền .htaccess

***[Ban đầu]***
```
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   Options FileInfo AuthConfig Limit
    #
    AllowOverride None
```

***[Sau khi thay đổi]***
```
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   Options FileInfo AuthConfig Limit
    #
    AllowOverride All
```

Cuối cùng là restart lại apache server
```
sudo chkconfig httpd on
sudo systemctl restart httpd
```
## 3. Cài đặt EC-CUBE
Về việc cài đặt EC-CUBE, thì đã có 1 bài viết khá là chi tiết ở đây. Các bạn có thể follow theo các bước này để có thể cài đặt ứng dụng EC-CUBE
https://viblo.asia/p/tim-hieu-ve-ec-cube-yMnKMMNzK7P

Trong trường hợp các bạn tiến hành cài đăt EC-CUBE từ source code sau khi custom của bản thân từ github, thì có thể thực hiện các bước sau:
- Cài đặt nodejs và npm (Chú ý là với EC-Cube 4 thì chỉ nên cài bản node 10)
```
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum install nodejs
```

- Clone vào source code từ github vào thư mục mà bạn đã config ở file httpd.conf
- Vào source code và tiến hành cài đặt ứng dụng như sau
```
cd /var/www/my-ec-cube
composer install
npm install
bin/console eccube:install
```
## 4. Xây dựng file deploy đơn giản
Một vấn đề đặt ra nữa, đó là sau khi đã install project rồi. Thì lam cách nào để có thể apply những custom mà chúng ta sẽ phát triển theo thời gian hay là phải install ec-cube lại từ đầu, kéo theo việc những dữ liệu cũ sẽ bị mất ?
Thực ra câu trả lời rât đơn giản, các bước deploy code từ github nó cũng giống như các ứng dụng khác mà thôi, chúng ta cũng sẽ thực hiên các bước như sau:

1. Pull code mà bạn muốn deploy về server.
2. Tiến hành cài đặt các thư viện cần thiết
3. Tiến hành migrate database nếu có sự thay đổi nào đó
4. Init biến môi trường nếu có
5. Tiến hành migrate data nếu có
6. Restart lại các server chạy batch nếu có

Tùy vào thiết kế system của bạn như thế nào để có thêm các bước tương ứng khác. Nhưng bên trên là 6 bước cơ bản nhất để deploy một ứng dụng web. Dưa vào các bước trên thì mình đã tiến hàn viết một file shell đơn giản như bên dưới để có thể deploy một ứng dụng web đơn giản với EC-CUBE
```
#!/bin/bash
cd /var/www/my-ec-cube;

git fetch origin;
git checkout $1
git pull origin $1;

composer install;
bin/console doctrine:migrations:migrate;
npm install;
npm run build;

cd;
```
Ngoài việc sử dụng các câu lệnh shell ra thì trong PHP có một tool dùng để tự động deploy khá là hay đó là Deployer, các bạn có thể tham khảo ở link: https://deployer.org/

## Kết luận
Có thể thấy rằng việc deploy bất kì một ứng dụng nào thực ra cũng tương tự nhau và có các bước tương đối giống nhau giữa các ngôn ngữ khác nhau. Cũng như ngôn ngữ cũng chỉ là công cụ để thực thi ý tưởng của chúng ta mà thôi, cho nên không cần phải quá phụ thuộc vào chúng.
Ngoài ra, EC-CUBE cũng là một CMS về thương mại điện tử được sử dụng khá nhiều ở bên Nhật, nếu bạn muốn xây dựng một trang bán hàng nhanh chóng thì EC-CUBE cũng là một lựa chọn không tồi