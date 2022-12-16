- Hello anh em, lại là mình đây. Sau một thời gian vật lộn với dự án thì hôm nay cũng đã có thời gian viết bài chia sẻ kiến thức với mọi người. 
- Với các bạn sinh viên hay các bạn mới ra trường thì đầu tiên sẽ thường tập trung vào việc code và tìm hiểu thêm kiến thức. Môi trường các bạn làm việc thường là dưới máy tính cá nhân hay còn gọi là môi trường local. Ở môi trường này thì ứng dụng của bạn đang được phát triển, mọi người chưa thể truy cập vào website của bạn thông qua internet. Để ứng dụng của bạn có thể được người dùng truy cập, thao tác thông qua internet, các bạn cần có 1 server để deploy ứng dụng của mình lên để chạy. Và đó sẽ chính là nội dung bài viết của mình hôm nay.
# Chuẩn bị
- Những gì bạn cần chuẩn bị đó là:
    * Server, server của mình trong bài này cài CENTOS 7 cho nên những câu lệnh trong bài mình sẽ dùng những câu lệnh cho hệ điều hành CENTOS 7
   * 1 ứng dụng Laravel đã được đẩy lên github
   * OK v là đủ r =)) giờ thì quất thôi
# SSH lên server
- Đầu tiên bạn cần tạo public key trên máy tính cá nhân của mình. Các bạn chưa biết các tạo public key có thể tham khảo qua [đây](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- Các bạn cần được user root trên server tạo account truy cập với public key đã tạo ở trên. Ví dụ ở đây mình có account như sau:
    - User name: tran.quang.hiep
- Sau khi đã có account. Bạn tiến hành SSH lên server thông qua câu lệnh sau: (Ở đây mình ví dụ server có địa chỉ IP: 10.0.7.20)
```
ssh tran.quang.hiep@10.0.7.20
```
- Bạn cần được cấp quyền để thao tác trên server, hoặc nếu bạn có user root, bạn có  thể chuyển qua user root dùng câu lếnh sau:
```
su -
```
- Sau đó nhập mật khẩu user root.
# Cài đặt các phần mềm cần thiết
- Bây giờ bạn đã ssh được lên server. Tiếp theo bạn cần cài những phần mềm cần thiết phục vụ cho việc chạy project của bạn.
- Kiểm tra hệ điều hành và version để cài đặt phần mềm phù hợp:
```
cat /etc/*-release
```
- Như của mình thì chạy câu lệnh trên sẽ cho kết quả như sau:
```
CentOS Linux release 7.7.1908 (Core)
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"

CentOS Linux release 7.7.1908 (Core)
CentOS Linux release 7.7.1908 (Core)
```
 ## Cài Yum Repositories
 - Đầu tiên, bạn cần cho phép REMI và EPEL repositories để có các gói cập nhật (PHP, Nginx, MariaDB,..) sử dụng các câu lệnh sau:
```
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
```
## Cài đặt Nginx, PHP và MySQL
- Cài đặt Nginx trên Centos7 dùng lệnh sau:
```
yum install nginx
```
- Sau khi Nginx đã được cài, start web server và cho phép và cho phép nó khởi động lúc khởi động hệ thống và sau đó xác minh trạng thái bằng các lệnh sau:
```
systemctl start nginx
systemctl enable nginx
systemctl status nginx
```
- Bạn cần public cổng 80 để làm cổng vào ra dữ liệu cho ứng dụng web của bạn:
```
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --reload 
```
-  Chạy lệnh sau để cài MySQL
```
yum install mariadb-server php-mysql
systemctl start mariadb.service
/usr/bin/mysql_secure_installation
```
- Tiếp theo là cài PHP
```
yum install yum-utils
yum-config-manager --enable remi-php72
yum install php php-fpm php-common php-xml php-mbstring php-json php-zip
```
- Start và enable PHP-FPM service và kiểm tra nó đã bật và chạy chưa
```
systemctl start php-fpm
systemctl enable php-fpm
systemctl status php-fpm
```
## Cài đặt composer
- Cài composer bằng các lệnh sau:
```
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer
```
- Di chuyển vào thư mục `var/www/html` và clone project Laravel của bạn về
```
cd /var/www/html/
git clone "project github url"
```
- Sau đó cd vào thư mục project và cài đặt project như khi bạn cài đặt project dưới local.
## Tạo file config 
- Bạn cần kết nối Nginx server block cho project, để truy cập nó từ trình duyệt. Tạo 1 file `.conf` trong thư mục `/etc/nginx/conf.d/`
```
vi /etc/nginx/conf.d/testsite.conf
```
- Dưới đây là 1 file config mẫu của mình:
```
server {
        listen 80;
        server_name 10.0.7.20;

        root /var/www/html/website_thuongmai/public;

        index index.php index.html;

        log_not_found off;
        access_log /var/log/nginx/royshop-access.log;
        error_log /var/log/nginx/royshop-error.log;

        #location ~ /\. { deny all; }
        #location = /favicon.ico { }
        #location = /robots.txt { }

        location / {
           try_files $uri $uri/ /index.php?$query_string;
        }

```
- Lưu file lại và restart Nginx để available những thay đổi
```
systemctl restart nginx
```
- Cuối cùng, truy cập `10.0.7.20` để xem kết quả nào !!!!
# Kết luận
- Vậy là mình đã hướng dẫn xong các bước để deploy 1 project laravel cơ bản nhất. 
- Mình cũng vừa mới tập tành deploy, thành công phát là lên share anh em luôn. Nên còn gì thiếu xót thì mong được các bạn góp ý.
- Sắp tới mình sẽ tìm hiểu sâu hơn về deploy. Nên nếu có cơ hội mình sẽ viết thêm các bài chia sẻ nữa để ae cùng tham khảo.
- Thanks for reading !!!
# Tài liệu tham khảo
- https://www.tecmint.com/install-laravel-in-centos/