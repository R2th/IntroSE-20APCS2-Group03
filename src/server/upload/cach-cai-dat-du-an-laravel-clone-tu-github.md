Hôm nay mình sẽ giới thiệu cho các bạn cách clone dự án laravel trên github và cài đặt nó chạy trên môi trường local
<br>
**Chú ý**: Máy các bạn phải cài sẵn apche hoặc nginx, mysql,php , npm(node), git.
<br>
Bắt đầu nào.
<br>
Trong bài này mình sử dụng repository sau:  https://github.com/rappasoft/laravel-5-boilerplate
<br>
### Bước 1: Mở Terminal và thực hiện clone dự án và vào thư mục dự án bằng câu lệnh sau:
```
git clone https://github.com/rappasoft/laravel-boilerplate.git
cd laravel-5-boilerplate
```
### Bước 2: Chạy composer và npm để cài đặt các gói cần thiết trong dự án
```
composer install
npm install 
```
### Bước 3: Tạo database và config database
Vào mysql workbech hoặc adminer tạo ra database mới <br>
Ví dụ tạo database có tên là **:laravel-5-boilerplate**
<br>

Sau đó ta thực hiện lệnh sau để copy ra file env:
<br>
```
cp .env.example .env
```
Cập nhật file env của bạn như sau:
```
DB_CONNECTION=mysql          
DB_HOST=127.0.0.1            
DB_PORT=3306                 
DB_DATABASE=laravel-5-boilerplate       
DB_USERNAME=root             
DB_PASSWORD=   
```
### Bước 4: Tạo ra key cho dự án 
```
php artisan key:generate
```
### Bước 5: Tạo ra các bảng và dữ liệu mẫu cho database
```
php artisan migrate
php artisan db:seed
```
### Bước 7: Xây dựng các styles và scripts
```
npm run <command>
```
Các lệnh(command) khả dụng được liệt kê ở đầu tệp package.json dưới từ khóa 'scripts'.
### Bước8: Storage:link
```
php artisan storage:link
```
Sau khi cài dự án bạn phải chạy lệnh trên để  public thư mục lưu trữ của bạn khi người dùng upload ảnh.
### Bước 9: Chạy Phpunit ( https://github.com/rappasoft/laravel-5-boilerplate)
Sau khi dự án của bạn được cài đặt, bạn hãy chạy **phpunit**. để đảm bảo tất cả các chức năng đang hoạt động chính xác.
<br>
Từ gốc của dự án của bạn chạy:
```
phpunit
```
### Bước 10: Login vào dự án
Sau khi cài đặt xong và và bạn có thế vào trình duyệt và login vào dự án với dữ liệu sau:
```
Username: admin@admin.com
Password: secret
```
 Các dự án khác cũng clone và thực hiện tương tự các bước như trên
<br>
Chúc các bạn thành công :) 
<br>
Bài viết được lược và dịch từ: https://forum.laragon.org/topic/175/tutorial-how-to-work-with-laravel-projects-on-github