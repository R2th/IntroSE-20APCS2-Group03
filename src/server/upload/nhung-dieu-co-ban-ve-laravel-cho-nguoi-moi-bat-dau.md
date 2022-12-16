# 1. Laravel framework?
- Nếu là một người tìm hiểu về PHP và muốn bước thêm một bước tìm hiểu về 1 **framework** thì **Laravel** hẳn không còn xa lạ gì nữa rồi.
- Để có thể cài đặt **Laravel** và sử dụng thì có một vài yêu cầu về `PHP`:
    - PHP >= 5.5.9.
    - OpenSSL PHP Extension.
    - Mbstring PHP Extension.
    - Tokenizer PHP Extension.

# 2. Cài đặt Composer.
- Trong **Laravel** thì **Composer** là một trình quản lý rất tốt quan hệ giữa các gói ( thư viện) có liên quan đến nhau.
- Và tất nhiên thì bạn cần đến nó để cài đặt cái `gói thư viện` hay là `dự án mới` hoặc gì gì đó 😁😁.
- Để cài đặt `Composer` trên `window` thì chỉ cần vào: [https://getcomposer.org/download/](https://getcomposer.org/download/) 
- Sau đó tải về và cài đặt thôi.

# 3. Cài đặt Laravel và tạo project.
## 3.1 Cài đặt Laravel.
- Để cài đặt **Laravel** thì ta chạy:
```
composer global require laravel/installer
```
## 3.2 Tạo project.
- Để tại một `project` laravel thì hiện nay khá là đơn giản. Bạn chỉ cần mở `Document` của laravel lên và chạy câu lệnh `composer` của phiên bản phù hợp là được.
- VD: Để tạo một project với phiên bản **Laravel 9** như hiện tại thì chạy lệnh:
> Tất nhiên là bạn phải cd đến thư mục chứa project mà bạn muốn.
```js
composer create-project laravel/laravel ten-project
//Hoặc nếu bạn đã cài laravel
laravel new ten-project
```
> Sau khi tạo xong thì bạn cd tới project sau đó chạy lệnh **code .** là có thể mở dự án của bạn lên trong **vscode**.
# 4. Thiết lập project.
## 4.1 Thiết lập `.env`
- Trong trường hợp bạn mở project lên mà không thấy file `.env` thì bạn cần coppy và thự hiện key:generate.
```js
cp .env.example .env
php artisan key:generate
```
- Khi chạy lệnh `php artisan key:generate` thì một chuỗi random của application nhất định sẽ được thiết lập vào `APP_KEY` trong `.env`.
- Còn về tại sao cần có file `.env` thì nó dùng để chứa thông tin các môi trường thực thi khác nhau.
## 4.2. config/app.php
- Điều tiếp theo chúng la cần làm là `config` lại một số thông tin trong file `config/app.php` như `thời gian` và `ngôn ngữ` tại nơi bạn làm việc.
![image.png](https://images.viblo.asia/29809897-a625-43df-8d24-d43021fa257a.png)
- Bạn chỉ cần sửa lại 2 trường `timezone` và `locale` là được.
## 4.3 Thiết lập database.
- Hiện tại thì **Laravel** sử dụng **MySQL** là hệ quản trị mặc định nên bạn chỉ cần sửa lại `DB_DATABASE`  trong file `.env` thành tên cơ sở dữ liệu của bạn là được.
![image.png](https://images.viblo.asia/66b6e311-8bbf-45ee-a1f7-3a6e0b788186.png)

# 5. Chạy thôi nào.
- Để chạy dự án thì bạn mở `terminal` của vscode lên sau đó chạy lệnh:
```
php artisan serve
```
- Sau khi chạy ta sẽ nhận được một đường dẫn local như sau:
![image.png](https://images.viblo.asia/0ed3659b-a30c-4139-b15b-e37099056781.png)

- Sau đó bạn chỉ cần `ctrl + click` vào đường dẫn hoặc mở chorme lên và nhập đường dẫn vào sau đó enter là được.

# 6. Kết quả.
![image.png](https://images.viblo.asia/ef0b45d4-e693-4145-8b4d-58ecf425d7a0.png)

- Đây là kết quả sau khi bạn cài đặt thành công project của mình.
- Bài sau mình sẽ giới thiệu cho các bạn các phần tiếp theo của **Framework Laravel**.
- Link tham khảo: [https://laravel.com/docs/9.x](https://laravel.com/docs/9.x)
- Mong rằng bài viết này sẽ giúp đỡ được các bạn.