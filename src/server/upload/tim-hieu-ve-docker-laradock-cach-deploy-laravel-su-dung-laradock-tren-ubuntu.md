# 1. Docker container là gì
**Docker** là một chương trình máy tính thực hiện ảo hóa cấp hệ điều hành còn được gọi là container hóa. Docker, Inc đã phát triển nó. **Docker** là một nền tảng mở cho các nhà phát triển và hệ thống để xây dựng, vận chuyển và chạy các ứng dụng phân tán, cho dù trên máy tính xách tay, máy ảo trung tâm dữ liệu hoặc đám mây.

**Container image** là gói phần mềm nhẹ, độc lập, có thể thực hiện được của một phần mềm bao gồm mọi thứ bạn cần để chạy nó: code, runtime, system tools, system libraries, settings.

**Docker** là công cụ được thiết kế để giúp tạo, triển khai và chạy các ứng dụng dễ dàng hơn bằng cách sử dụng các containers.

Các **containers** cho phép nhà phát triển đóng gói một ứng dụng với tất cả các phần cần thiết, chẳng hạn như thư viện và các phụ thuộc khác, và gửi tất cả ra dưới dạng một gói.

**Docker** là một dự án nguồn mở để tự động hóa việc triển khai các ứng dụng dưới dạng các **containers** di động, tự cung cấp, có thể chạy trên đám mây hoặc tại chỗ.
# 2. Laradock
Laradoc là một môi trường phát triển PHP đầy đủ cho Docker.

Nó bao gồm Docker Images được đóng gói sẵn, tất cả được cấu hình sẵn để cung cấp một môi trường phát triển PHP tuyệt vời. chi tiết về laradock bạn có thể xem [tại đây](https://laradock.io/)
# 3. Cài đặt laravel trên docker container
Đầu tiên, chúng ta sẽ cài đặt docker trên ubuntu, sau đó clone repository của laradock và bắt đầu cấu hình nó.
bạn chạy các lệnh sau để cài docker
```php
1. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
2. sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
3. sudo apt-get update
4. apt-cache policy docker-ce
5. sudo apt-get install -y docker-ce
```
Để xem bạn đã cài đặt thành công hay chưa sử dụng command sau:
```php
docker -v // xem version của docker
```
Ngoài ra bạn cần cài đặt thêm một số containers khác: NGINX, PHP, Composer, MySQL, Redis and Beanstalkd
## 3.1 Cài đặt laravel 5.6 trong thư mục của bạn
Bạn có thể cài đặt Laravel trong thư mục dự án thông thường của mình bằng lệnh sau.
```php
composer create-project laravel/laravel test_laravel --prefer-dist
```
truy cập vào thư mục bằng lệnh sau
```php
cd test_laravel
```
Tiếp theo thay đổi databse trong file .env như sau
```php
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=doc
DB_USERNAME=root
DB_PASSWORD=root
```
## 3.2 Clone laradock repository
```php
git clone https://github.com/Laradock/laradock.git
```
sau khi chạy xong sẽ tạo ra thư mục laradock với cấu trúc nhau:
![](https://images.viblo.asia/3bed4d93-0295-4e31-ba0f-73c06b37ee6f.png)
## 3.3 Thay đổi file môi trường
truy cập vào thư mục **laradock**, thay đổi tên file env-example thành .env
```php
cp env-example .env
```
## 3.4 Chạy các containers
```php
docker-compose up -d nginx mysql phpmyadmin redis workspace
```
Nếu đây là lần đầu tiên của bạn, thì sẽ mất 15-20 phút để cài đặt tất cả các containers từng cái một và tạo môi trường cho docker container. Nó sẽ khởi động máy chủ nginx, máy chủ mysql, phpmyadmin. 

Bạn có thể liệt kê các container đang chạy của mình bằng lệnh sau.
```php
docker ps
```
restart containers sử dụng câu lệnh sau
```php
docker restart $(docker ps -q)
```
kill hết tất cả các containers
```php
docker kill $(docker ps -a -q)
```
stop hết các containers
```php
docker stop $(docker ps -aq)
```
gõ trên browser  http://localhost nếu kết quả như sau thì bạn cài đặt thành công
![](https://images.viblo.asia/e654288b-1188-409b-a1ab-269cded027f0.png)
## 3.5 Truy cập vào csdl thông qua phpMyAdmin
bạn có thể truy cập đến phpMyAdmin tại cổng 8080 trên browser  http://localhost:8080
login vào trang phpmyadmin với server='mysql', username='root' và password='root'.  tạo database, với cái tên là **"doc"** được viết trong file .env.

![](https://images.viblo.asia/2c7177e8-4dff-460b-a0d4-be721e765e85.png)
```php
docker-compose exec workspace bash
```
chạy các câu lệnh artisan của laravel như bình thường
```
php artisan migrate // migrate database
php artisan make:controller testController // tạo file testController.php
php artisan make:model testModel // tạo file testModel.php
....
```
# 4. Tài liệu tham khảo
https://appdividend.com/2018/04/12/how-to-setup-laravel-in-docker-container/?fbclid=IwAR3jAB6DEkLVLb6RQr54YtIQ58mL6qa5CyIRGvIj4-kCY4i8H33xGZN1UiU