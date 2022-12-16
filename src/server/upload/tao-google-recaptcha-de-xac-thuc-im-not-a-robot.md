Chào mọi người hôm nay mình muốn tạo hướng dẫn cho mọi người các xác thực "I'm not a robot" để tránh craw data, xác thực người dùng thật bằng google reCAPTCHA nhé.

![Ảnh minh họa](https://images.viblo.asia/5ed17988-b14d-4d9b-ae1f-db105fbca9c5.gif)
## I. Create a new recaptcha on google
### 1.1. Create new project on google
Đầu tiên, các bạn truy cập vào link [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create) và điền các thông tin vào
![Create new reCAPTCHA](https://images.viblo.asia/5be27de4-6a6f-436d-a177-2e4e39416efb.PNG)

***Lưu ý: Khi bạn test dưới localhost thì nên để dạng virtual host để tránh lỗi***
Các bạn có thể tham khảo config virtual host của mình như dưới:

Trên window thêm config này vào file `{XAMPP_PATH}\apache\conf\extra\httpd-vhosts.conf`
```
<VirtualHost *:80>
    DocumentRoot "G:/XAMPP/htdocs/test/"
    ServerName testcaptcha.test
    ServerAlias www.testcaptcha.test
    ErrorLog "logs/testcaptcha.test-error.log"
    CustomLog "logs/testcaptcha.test-access.log" common
</VirtualHost>
```

Thêm config domain vào file `C:\Windows\System32\drivers\etc`:
```
127.0.0.1    testcaptcha.test
```

=> Như vậy chỉ cần truy cập vào `testcaptcha.test` là đã vào được dự án rồi.
### 1.2.  Nhận secret-key và site-key
Khi tạo xong project trên google bạn sẽ nhận được `secret-key` và `site-key` như hình dưới đây
![Secret key and Site key](https://images.viblo.asia/15beda52-b9be-4c59-a96f-9d6f54edd96a.PNG)

## II. Setup for a project
1. Tạo thư mục dự án
2. Tạo file `composer.json` trong dự án
```
{
    "name": "test/captcha",
    "require": {
        "anhskohbo/no-captcha": "^3.1"
    }
}
```
3. Chạy command
```
composer install
```
4. Tạo view template `index.php`
```
<?php
require_once "vendor/autoload.php";

$secret  = 'xxx'; //
$sitekey = 'xx';
$captcha = new \Anhskohbo\NoCaptcha\NoCaptcha($secret, $sitekey);

if (! empty($_POST)) {
	if($captcha->verifyResponse($_POST['g-recaptcha-response'])){
		echo 'Verified';
	} else {
		echo 'Not Verified';
	}
    exit();
}

?>

<html>
  <head>
    <title>reCAPTCHA demo: Simple page</title>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  </head>
  <body>
    <form action="?" method="POST">
      <div class="g-recaptcha" data-sitekey="<?php echo $sitekey; ?>"></div>
      <br/>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
```

5. Check thành quả:
Truy cập vào `testcaptcha.test`:
![Form test](https://images.viblo.asia/5fd77ec9-4465-4407-bba3-e65e4bb787cb.PNG)

Check vào checkbox để xác thực:
![Check verified](https://images.viblo.asia/498e965b-ac2b-4b4a-8744-1be2f4cb4a50.PNG)

Kết quả xác thực trên server:
![Result verify](https://images.viblo.asia/676ee877-6352-4284-b202-bb3a92acd2d9.PNG)

Done! Như vậy đã hoàn thành việc xác thực "I'm not a robot" rùi :D
## III. Setup for Laravel
**LƯU Ý:** Cài đặt này dành cho laravel 5.5 trở lên.

Trong file `app/config/app.php` thêm dòng dưới đây vào:

### 1. Thêm ServiceProvider:
```

Anhskohbo\NoCaptcha\NoCaptchaServiceProvider::class,
```
### 2. Thêm aliases :
```

'NoCaptcha' => Anhskohbo\NoCaptcha\Facades\NoCaptcha::class,
```
### 3. Publish config file
```

php artisan vendor:publish --provider="Anhskohbo\NoCaptcha\NoCaptchaServiceProvider"
```
### 4. Configuration
Thêm `NOCAPTCHA_SECRET` and `NOCAPTCHA_SITEKEY` in .env file :

```
NOCAPTCHA_SECRET=secret-key //Key đã nhận ở trên
NOCAPTCHA_SITEKEY=site-key  //Key đã nhận ở trên
```

Còn các bước tạo view hay xác thực thì cũng giống ở mục II nhé bạn.
## IV. Kết 
Như vậy mình đã hướng dẫn xong cách tạo google reCAPTCHA để xác thực người dùng truy cập chứ không phải 1 con robot đi submit form bừa bãi rồi :D

Cảm ơn mọi người đã đọc bài viết của mình. Hẹn gặp lại vào bài viết tới nhé.
### Tham khảo
1. [https://github.com/anhskohbo/no-captcha](https://github.com/anhskohbo/no-captcha)
2. [https://www.codexworld.com/new-google-recaptcha-with-php/](https://www.codexworld.com/new-google-recaptcha-with-php/)