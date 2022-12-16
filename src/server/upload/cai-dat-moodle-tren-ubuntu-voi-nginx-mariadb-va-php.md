# Cài đặt hệ thống quản lý khóa học bằng Moodle
## Moodle là gì
Moodle là một hệ thống quản lý khóa học nguồn mở (CMS) được viết và dựa trên PHP, nó cho phép các tổ chức và tổ chức học tập tạo ra các khóa học mạnh mẽ cho sinh viên và những người dùng khác. Moodle được nhiều tổ chức đào tạo từ xa trên thế giới sử dụng để cung cấp các khóa học cho sinh viên của họ. nó miễn phí và được phát hành theo giấy phép công cộng GNU.
## Moodle cần những gì
Bạn cần một máy Linux, máy chủ web, cơ sở dữ liệu và PHP, moodle sử dụng ngăn xếp LEMP với Ubuntu làm hệ thống Moodle
# Cài đặt
## Chuẩn bị Ubuntu 18.04 LTS
Bài đăng này giả định rằng bạn đã cài đặt Ubuntu 18.04 LTS và bạn có quyền truy cập root vào hệ thống. Trước khi cài đặt phần mềm khác, hãy chạy các lệnh bên dưới để cập nhật Ubuntu:
```
sudo apt update && sudo apt dist-upgrade && sudo apt autoremove
```
## Cài đặt Nginx HTTP Server
Bây giờ Ubuntu đã được cập nhật, hãy chạy các lệnh bên dưới để cài đặt máy chủ web Nginx:
```
sudo apt install nginx
```
Sau khi cài đặt Nginx, các lệnh bên dưới có thể được sử dụng để dừng, khởi động và cho phép dịch vụ Nginx luôn khởi động khi máy tính của bạn khởi động:
```
sudo systemctl stop nginx.service
sudo systemctl start nginx.service
sudo systemctl enable nginx.service
```
## Cài đặt máy chủ cơ sở dữ liệu MariaDB
Bạn cũng sẽ cần một máy chủ cơ sở dữ liệu để chạy Moodle Young và MariaDB là một nơi tuyệt vời để bắt đầu chương trình cài đặt nó, chạy các lệnh bên dưới:
```
sudo apt install mariadb-server mariadb-client
```
Sau khi cài đặt, các lệnh bên dưới có thể được sử dụng để dừng, khởi động và cho phép dịch vụ MariaDB luôn khởi động khi máy chủ khởi động:
```
sudo systemctl stop mariadb.service
sudo systemctl start mariadb.service
sudo systemctl enable mariadb.service
```
Sau đó, chạy các lệnh bên dưới để bảo mật máy chủ MariaDB:
```
sudo mysql_secure_installationsudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```
Khi được nhắc, hãy trả lời các câu hỏi dưới đây bằng cách làm theo hướng dẫn.

Nhập mật khẩu hiện tại cho root (không nhập): Chỉ cần nhấn  Enter

Đặt mật khẩu root? [Y / n]:  Y

Mật khẩu mới:  Nhập mật khẩu

Nhập lại mật khẩu mới:  Lặp lại mật khẩu

Xóa người dùng ẩn danh? [Y / n]:  Y

Không cho phép đăng nhập root từ xa? [Y / n]:  Y

Xóa cơ sở dữ liệu kiểm tra và truy cập vào nó? [Y / n]:   Y

Tải lại bảng đặc quyền bây giờ? [Y / n]:   Y

Tiếp theo, chạy các lệnh bên dưới để mở tệp cấu hình mặc định của MySQL:
```
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```
Sau đó thêm các dòng dưới đây ngay bên dưới phần [mysqld] .
```
default_storage_engine = innodb
innodb_file_per_table = 1
innodb_file_format = Barracuda
innodb_large_prefix = 1
```
Khởi động lại máy chủ MariaDB:
```
sudo systemctl restart mariadb.service
```
Bây giờ MariaDB đã được cài đặt, hãy đi và tạo một cơ sở dữ liệu Moodle trống.

Chạy các lệnh dưới đây để đăng nhập vào máy chủ cơ sở dữ liệu. Khi được nhắc nhập mật khẩu, hãy nhập mật khẩu gốc bạn đã tạo ở trên:
```
sudo mysql -u root -p
```
Sau đó tạo một cơ sở dữ liệu gọi là moodle:
```
CREATE DATABASE moodle;
```
Tạo người dùng cơ sở dữ liệu được gọi là moodleuser với mật khẩu mới:
```
CREATE USER 'moodleuser'@'localhost' IDENTIFIED BY 'new_password_here';
```
Sau đó cấp cho người dùng quyền truy cập đầy đủ vào cơ sở dữ liệu.
```
GRANT ALL ON moodle.* TO 'moodleuser'@'localhost' IDENTIFIED BY 'user_password_here' WITH GRANT OPTION;
```
Cuối cùng, lưu các thay đổi của bạn và thoát.
```
FLUSH PRIVILEGES;
EXIT;
```
## Cài đặt PHP7.1-FPM và các mô-đun PHP có liên quan
PHP 7.1 có thể không có sẵn trong kho lưu trữ mặc định của Ubuntu để cài đặt nó, bạn sẽ phải lấy nó từ kho của bên thứ ba.

Chạy các lệnh bên dưới để thêm kho lưu trữ bên thứ ba bên dưới để nâng cấp lên PHP 7.1
```
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ondrej/php
```
Sau đó cập nhật và nâng cấp lên PHP 7.1
```
sudo apt update
```
Cuối cùng, chạy các lệnh bên dưới để cài đặt PHP 7.1 và các mô-đun liên quan 
```
sudo apt install php7.1-fpm php7.1-common php7.1-mbstring php7.1-xmlrpc php7.1-soap php7.1-gd php7.1-xml php7.1-intl php7.1-mysql php7.1-cli php7.1-mcrypt php7.1-ldap php7.1-zip php7.1-curl
```
Sau khi cài đặt PHP, hãy chạy các lệnh bên dưới để mở tệp mặc định PHP-FPM.
```
sudo nano /etc/php/7.1/fpm/php.ini
```
Sau đó thay đổi các dòng dưới đây trong tệp và lưu. Bạn có thể tăng giá trị để phù hợp với môi trường của bạn.
```
file_uploads = On
allow_url_fopen = On
memory_limit = 256M
upload_max_filesize = 64M
max_execution_time = 360
cgi.fix_pathinfo = 0
date.timezone = America/Chicago
```
## Tải xuống Moodle
Tiếp theo, chạy các lệnh bên dưới để tải xuống bản phát hành mới nhất của Moodle. Các lệnh dưới đây để tải xuống gói lưu trữ Moodle.
```
cd /tmp && wget https://download.moodle.org/download.php/direct/stable33/moodle-latest-33.tgz
```
Sau đó chạy các lệnh bên dưới để trích xuất tệp đã tải xuống vào gốc mặc định của Nginx.
```
tar -zxvf moodle-latest-33.tgz
sudo mv moodle /var/www/html/moodle
sudo mkdir /var/www/html/moodledata
```
Thay đổi sửa đổi quyền thư mục.
```
sudo chown -R www-data:www-data /var/www/html/moodle/
sudo chmod -R 755 /var/www/html/moodle/
sudo chown www-data /var/www/html/moodledata
```
##  Cấu hình trang web Nginx Moodle
Cuối cùng, định cấu hình tệp cấu hình trang Nginx cho Moodle. Tập tin này sẽ kiểm soát cách người dùng truy cập nội dung Moodle. Chạy các lệnh dưới đây để tạo một tệp cấu hình mới gọi là moodle:
```
sudo nano /etc/nginx/sites-available/moodle
```
Sau đó sao chép và dán nội dung dưới đây vào tập tin và lưu nó. Thay thế dòng được tô sáng bằng tên miền của riêng bạn và vị trí thư mục gốc:
```
server {
    listen 80;
    listen [::]:80;
    root /var/www/html/moodle;
    index  index.php index.html index.htm;
    server_name  example.com www.example.com;

    location / {
    try_files $uri $uri/ =404;        
    }
 
    location /dataroot/ {
    internal;
    alias /var/www/html/moodledata/;
    }

    location ~ [^/]\.php(/|$) {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

}
```
Lưu file và thoát.
## Kích hoạt trang Moodle
Sau khi định cấu hình Virtualhost ở trên, hãy bật nó bằng cách chạy các lệnh bên dưới
```
sudo ln -s /etc/nginx/sites-available/moodle /etc/nginx/sites-enabled/
```
## Khởi động lại Nginx
Để tải tất cả các cài đặt ở trên, hãy khởi động lại Nginx bằng cách chạy các lệnh bên dưới:
```
sudo systemctl restart nginx.service
```
Sau đó, mở trình duyệt của bạn và duyệt đến địa chỉ IP của máy chủ hoặc tên máy chủ và bạn sẽ thấy trang hướng dẫn thiết lập mặc định của Moodle:
http://example.com
![](https://images.viblo.asia/a56c042d-8a2a-434a-8228-246e762b2190.PNG)
Xác minh rằng đường dẫn và thông tin là chính xác .. sau đó nhấp vào Next.
![](https://images.viblo.asia/f212604a-eba8-45d2-a937-11328cc38b04.PNG)
Chọn loại cơ sở dữ liệu và nhấp vào Next.
![](https://images.viblo.asia/38959b21-29dd-4e27-b1e1-7e1f32b5c66a.PNG)
Nhập tên cơ sở dữ liệu, tên người dùng và mật khẩu cho người dùng và Next.
![](https://images.viblo.asia/7a6b8039-09d9-49e8-856b-c22ed64bd1de.PNG)
Và Moodle đã cài đặt và có thể tùy biến để sử dụng. 
# Tổng kết
Moodle là một hệ thống quản lý khóa học online rất phổ biến hiện nay. Nó hoàn toàn miễn phí với những developer thì có thể cài đặt và tùy biến thêm các mô-dun vào đó tùy theo yêu cầu.

Bài viết được lấy từ nguồn: [websiteforstudents.com](https://websiteforstudents.com/install-moodle-cms-on-ubuntu-18-04-lts-beta-with-nginx-mariadb-and-php-7-1-support/)