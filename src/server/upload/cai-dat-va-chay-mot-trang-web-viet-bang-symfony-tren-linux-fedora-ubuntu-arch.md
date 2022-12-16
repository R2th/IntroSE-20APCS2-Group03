# Giới Thiệu
Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách cài đặt và chạy một trang web viết bằng Symfony phiên bản 5.x trên Linux. Cụ thể là 3 hệ điều hành Linux đang phổ biến Fedora, Ubuntu và Arch.

Trong mỗi distro, chúng ta đều cần cài 4 packages:
- PHP 8.x
- Git
- Composer
- Symfony CLI

Chỉ có cách cài PHP trên distro khác nhau thì sẽ khác nhau, còn lại Git, Composer và Symfony CLI đều như nhau. Như vậy, mình sẽ hướng dẫn các bạn các cài đặt PHP trên mỗi distro trước, sau đó mình sẽ hướng dẫn cách cài đặt Git, Composer và Symfony CLI chung trên cả 3 distro.
# Cài PHP
## Cài PHP 8.x trên Ubuntu 20.04
Các bạn chạy lần lượt các lệnh sau và nhập mật khẩu nếu được hỏi:
```
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php8.0 libapache2-mod-php8.0
sudo systemctl restart apache2
```
Sau khi cài đặt xong, để kiểm tra xem PHP đã được cài chưa và có cài chính xác version các bạn mong muốn không thì các bạn gõ lệnh:
```
php --version
```
Nếu output của bạn gần giống như vậy thì chúng ta đã cài xong PHP (một số thông tin có thể khác nhưng bạn cần lưu ý version phải từ 8 trở lên):
```
PHP 8.0.9 (cli) (built: Jul 29 2021 12:53:58) ( NTS gcc x86_64 )
Copyright (c) The PHP Group
Zend Engine v4.0.9, Copyright (c) Zend Technologies
```
## Cài PHP 8.x trên Fedora 34
Các bạn chạy lần lượt các lệnh sau và nhập mật khẩu nếu được hỏi:
```
sudo dnf install https://rpms.remirepo.net/fedora/remi-release-34.rpm
sudo dnf module reset php
sudo dnf module install php:remi-8.0
```
Sau khi cài đặt xong, để kiểm tra xem PHP đã được cài chưa và có cài chính xác version các bạn mong muốn không thì các bạn gõ lệnh:
```
php --version
```
Nếu output của bạn gần giống như vậy thì chúng ta đã cài xong PHP (một số thông tin có thể khác nhưng bạn cần lưu ý version phải từ 8 trở lên):
```
PHP 8.0.9 (cli) (built: Jul 29 2021 12:53:58) ( NTS gcc x86_64 )
Copyright (c) The PHP Group
Zend Engine v4.0.9, Copyright (c) Zend Technologies
```
## Cài PHP 8.x trên Arch 
Lưu ý, với Arch thì bạn cần cập nhật bản mới nhất cho distro bằng lệnh :
```
sudo pacman -Syyu
```
Sau đó các bạn chạy lệnh sau:
```
sudo pacman -S php
```
Sau khi cài đặt xong, để kiểm tra xem PHP đã được cài chưa và có cài chính xác version các bạn mong muốn không thì các bạn gõ lệnh:
```
php --version
```
Nếu output của bạn gần giống như vậy thì chúng ta đã cài xong PHP (một số thông tin có thể khác nhưng bạn cần lưu ý version phải từ 8 trở lên):
```
PHP 8.0.9 (cli) (built: Jul 29 2021 12:53:58) ( NTS gcc thànhx86_64 )
Copyright (c) The PHP Group
Zend Engine v4.0.9, Copyright (c) Zend Technologies
```
# Cài Git
## Trên Ubuntu 20.04
```
sudo apt install git
```
## Trên Fedora 34
```
sudo dnf install git
```
## Trên Arch
```
sudo pacman -S git
```
 # Cài Composer
 Các bạn chạy lần lượt các lệnh sau:
 ```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
```
# Cài Symfony CLI
Các bạn chạy lệnh sau để cài Symfony CLI, lưu ý các bạn cần có wget hoặc curl trước khi cài Symfony CLI. 
```
wget https://get.symfony.com/cli/installer -O - | bash
sudo mv /home/username/.symfony/bin/symfony /usr/local/bin/symfony
```
Bạn cần thay thế username bằng username của các bạn. Ví dụ username của user trên máy mình là **lkp**, thì câu lệnh thứ 2 sẽ thành:
```
sudo mv /home/lkp/.symfony/bin/symfony /usr/local/bin/symfony
```

 # Khởi tạo dự án bằng Symfony CLI
 Để khởi tạo dự án, bạn gõ lệnh:
 ```
 symfony new projectName --version=version
 ```
 Lưu ý, bạn cần thay thế projectName thành tên project của mình và version thành phiên bản bạn muốn cài đặt. Ví dụ tên project của mình là todolo và version mình muốn cài là 5.3 thì câu lệnh sẽ thành:
 ```
 symfony new todolo --version=5.3
 ```
 Bạn có thể bỏ qua phần version để cài đặt bản mới nhất của Symfony. Ví dụ bản mới nhất thời điểm mình viết bài này là 5.3 nên khi mình gõ lệnh:
 ```
 symfony new todolo
 ```
 Thì sẽ tự động khởi tạo dự án Symfony phiên bản 5.3.
 # Chạy dự án 
 Để chạy dự án mới khởi tạo các bạn cần truy cập vào dự án mới tạo:
 ```
 cd new-project
 ```
 Ví dụ, mình mới tạo dự án tên todolo, thì mình cần chạy lệnh: 
 ```
 cd todolo
 ```
 Sau đó các bạn gõ lệnh để chạy dự án: 
 ```
 symfony serve
 ```
 Các bạn sẽ thấy terminal hiện ra những thông tin như thế này:
 ```                                                                  
 [WARNING] run "symfony server:ca:install" first if you want to   
 run the web server with TLS support, or use "--no-tls            
 " to avoid this warning                                          
                                                                  

Tailing Web Server log file (/home/lkp/.symfony/log/2982355613aafd922c24cff778aecc907ce25a5a.log)
Tailing PHP-FPM log file (/home/lkp/.symfony/log/2982355613aafd922c24cff778aecc907ce25a5a/53fb8ec204547646acb3461995e4da5a54cc7575.log)
                                                                  
[OK] Web server listening                                        
      The Web server is using PHP FPM 8.0.9                       
      http://127.0.0.1:8000                                 
                                                                  

[Web Server ] Aug 27 09:21:37 |DEBUG  | PHP    Reloading PHP versions 
[Web Server ] Aug 27 09:21:37 |DEBUG  | PHP    Using PHP version 8.0.9 (from default version in $PATH) 
[Web Server ] Aug 27 09:21:37 |INFO   | PHP    listening path="/usr/sbin/php-fpm" php="8.0.9" port=37689
[PHP-FPM    ] Aug 27 09:21:37 |NOTICE | FPM    fpm is running, pid 10546 
[PHP-FPM    ] Aug 27 09:21:37 |NOTICE | FPM    ready to handle connections 
[PHP-FPM    ] Aug 27 09:21:37 |NOTICE | FPM    systemd monitor interval set to 10000ms 
```
Các bạn lưu ý chỗ: 
```
[OK] Web server listening                                        
      The Web server is using PHP FPM 8.0.9                       
      http://127.0.0.1:8000    
```
Ở đây có nghĩa là bạn đã chạy dự án thành công. Dự án chạy trên Domain 127.0.0.1 và cổng là 8000. Như vậy, để truy cập dự án, bạn mở browser, gõ vào url: **http://127.0.0.1:8000** hoặc **localhost:8000**.
Tada, nếu các bạn thấy màn hình như thế này thì các bạn đã chạy dự án thành công. Các bạn lưu ý có thể đường dẫn thư mục trong hình **/home/lkp/Workspace/test/scratch-project** sẽ khác với các bạn, miễn sao nó là đường dẫn thư mục đến dự án của các bạn là ok:
![](https://images.viblo.asia/52289dc8-961e-4ca4-aa19-9ed58831cabb.png)
# Lời kết
Như vậy chúng ta đã cài đặt những pakages cần thiết và chạy dự án viết bằng Symfony trên Linux. Nếu có gặp lỗi, khó khăn hay bất kì thắc mắc gì, các bạn hãy tham gia cộng đồng **[Symfony Vietnam](https://www.facebook.com/groups/532036037329901)** để trao đổi thêm cũng như là giải quyết những vấn đề bạn đang gặp phải. Chúc các bạn thành công.