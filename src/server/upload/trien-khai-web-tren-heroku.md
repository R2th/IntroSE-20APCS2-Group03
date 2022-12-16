# Tổng quan
Bạn có 1 website. Bạn muốn triển khai cho mọi người có thể xem. Bạn không có host

=> Bạn có thể lựa chọn Heroku để triển khai vì nó miễn phí và cung cấp Database cho bạn đủ dùng @@

 Tài liệu sẽ hướng dẫn bạn 
* Cài đặt quản lý code trên Heroku (qua git và Heroku với các thao tác pull, push)
* Kết nối database (DB) vào ứng dụng
* quản lý database (insert, view, create database như phpMyAdmin nhưng ở chế độ dòng lệnh :D)

# 1. Đăng kí tài khoản với heroku

Tài liệu: https://devcenter.heroku.com/articles/getting-started-with-laravel
### 1.1. Cài đặt: Heroku CLI (quản lý chế độ dòng lệnh)
https://devcenter.heroku.com/articles/heroku-cli

### 1.2. Tạo git như bình thường, commit, add
### 1.3. Tạo file Procfile để tạo quyền admin trên server cho đúng thư mục
```
$ echo web: vendor/bin/heroku-php-apache2 public/ > Procfile
$ git add .
$ git commit -m "Procfile for Heroku“
```
### 1.4. Login vào Heroku

Sau khi cài Heroku CLI, chạy lệnh Heroku ngon lành rồi. (Chạy cmd dưới quyền admin)
```
$ heroku login
```

### 1.5. Tạo ứng dụng Heroku: 
```
$ heroku create
```

anh Heroku, anh tạo cho em 1 cái app (bước này tạo trên giao diện cũng được mà tạo bằng lệnh cho nguy hiểm :D)

Sau bước này git sẽ liên kết remote đến 1 repository nữa là Heroku

Remove remote: https://help.github.com/articles/removing-a-remote/

### 1.6. Đẩy code lên server để chạy thôi: Push code như git, nó sẽ tự cài composer :D
```
$ git push heroku master
```
Phải là nhánh master, nhánh khác nó sẽ không hoạt động
### 1.7. Chạy thôi
```
$ heroku open
```

### 1.8. Cài đặt .env

Khi cài đặt các biến, các file môi trường trong .env, có thể cài trên giao diện cho dễ (APP_URL, APP_KEY) (phần settings)

Tham khảo: https://www.youtube.com/watch?v=R8A3h3y5Z8c

![](https://images.viblo.asia/c5d761e1-80d6-4584-8ff1-b14ea115dd71.png)

# 2. Kết nối DB

```
$heroku addons:create heroku-postgresql:hobby-dev
```
* Câu lệnh này sẽ sinh ra 1 DB cho ứng dụng: https://data.heroku.com/ đồng thời khai báo DATABASE_URL vào app cho ta. Một công đôi việc
* Việc tiếp theo là cần thực hiện migrate trong Laravel

### 2.1. Trong file config/database.php thêm các câu lệnh lên đầu
```php
$url = parse_url(getenv('DATABASE_URL'));
$host = $url['host']??null;
$username = $url['user']??null;
$password = $url['pass']??null;
$database = substr($url['path'], 1);
```
### 2.2.  Chỉnh sửa config
`'default' => env('DB_CONNECTION', 'pgsql_production’),`

![](https://images.viblo.asia/b83d5b72-4c74-4ab8-8edd-b8cb0d0ecea9.png)

### 2.3. Chạy lệnh thôi
```
$ heroku run php artisan migrate
```

# 3. Chèn dữ liệu DB, quản lý DB

* Công cụ sử dụng: PostgreSQL
* Cài đặt:  https://devcenter.heroku.com/articles/heroku-postgresql#local-setup (cài đặt trên MAC, Windows, Ubuntu)
* Sau đó bật sql shell lên quản lý: Easy (hình ảnh trên windows 10) (tìm trong serach khi cài xong – SQL Shell (qspl). Các thông số lấy ở trang https://data.heroku.com/ (phần settings)
![](https://images.viblo.asia/50bc7391-e7ab-4e70-9a31-8599db5a00c9.png)

![](https://images.viblo.asia/486fcc4e-2d82-4e93-baec-8d04a70ff9b8.png)

# 4. Một vài câu lệnh hữu ích khác
```
$ git remote rm Heroku: xóa remote hiện tại
$ heroku git:clone -a cert-hust: clone repository về
$ heroku git:remote cert-hust: thêm 1 remote
$ heroku run php artisan migrate:refresh
```
# Tài liệu tham khảo

https://devcenter.heroku.com/articles/getting-started-with-laravel

https://www.youtube.com/watch?v=R8A3h3y5Z8c