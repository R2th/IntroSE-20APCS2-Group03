![](https://images.viblo.asia/56187353-83d7-48ef-af03-0b934c9c883c.jpeg)

Trong bài viết này, mình sẽ chỉ cho bạn cách gửi email trong laravel 6 bằng cách sử dụng class có sẵn. MÌnh chia sẽ với các bạn cách tìm hiểu làm thế nào để gửi email trong laravel bằng driver SMTP. Laravel cung cấp API với driver hỗ trợ cho SMTP, SendMail, Mailgun, Sendgrid, Mandrill, Amazon SES, SpartPost, v.v.
Và ví dụ này cũng hoạt động với phiên bản laravel 5.8.

MÌnh sẽ cung cấp cho bạn một ví dụ rất đơn giản về class để gửi email trong ứng dụng laravel 6. Lợi ích của việc sử dụng máy chủ SMTP là, bạn cũng có thể gửi email trong ứng dụng laravel từ máy chủ cục bộ của mình.
## Laravel Gửi email bằng cách sử dụng các class được cung cấp
* Install laravel Fresh Setup
* Configuration SMTP in .env
* Mailable Class
* Create Controller & Method
* Create Route & Blade View
* Run Development Server
* Conclusion
## Cài đặt Laravel.
Đầu tiên tất nhiên là phải tải laravel-6 framework về local của các ban đã.Ở đây mình mặc định là các bạn biết sử dụng về Laravel, và có install composer trong máy của các bạn rồi nhé.
Các bạn mở terminal lên và thêm đoạn code bên dưới vào.
```
composer create-project --prefer-dist laravel/laravel blog
```

## Cấu hình SMTP trong .env
Các bạn vào file .env và config lại các thông tin cần thiết như bên dưới nhé.
```
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com 
MAIL_PORT=587 
MAIL_USERNAME=`Địa chỉ Mail của bạn`
MAIL_PASSWORD=`Pass của Mail`
MAIL_ENCRYPTION=tls 
```

## Tạo class Mailable
Tiếp theo chúng ta cần tạo 1 class Mailable để phục vụ cho công việc, các bạn hãy thêm đoạn code như bên dưới trong terminal.
```
php artisan make:mail MailNotify
```
```
<?php
 
namespace App\Mail;
 
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
 
class MailNotify extends Mailable
{
    use Queueable, SerializesModels;
 
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
 
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('view.name');
        //here is your blade view name
    }
}
```

## Tạo Route & blade view
Các bạn di chuyển tới routes/web.php và tạo 1 route như bên dưới.
```
 Route::get('laravel-send-email', 'EmailController@sendEMail');
```

Tiếp theo các bạn di chuyển vào thứ mục resources/views/emails, và tạo 1 file view email.blade.php với đoạn code như bên dưới nhé.
```
<!DOCTYPE html>
<html>
<head>
 <title>Laravel Send Email Example</title>
</head>
<body>
 
 <h1>This is test mail from ABC</h1>
 <p>Thank you, {{ $user->name }}</p>
 
</body>
</html> 
```
Lưu ý với các bạn là, ở đây mình chỉ giới thiệu chính về cách hoạt động gửi Mail trên class có sẵn của laravel hỗ trợ, chứ mình ko đi sâu vào việc thiết kế 1 giao diện 1 chức năng gửi mail hoàn chình, nên về phần Frontend sẽ chỉ đơn giản vậy thôi.
## Tạo Controller & Method
Tiếp theo các bạn mở terminal lên và thếm đoạn code như bên dưới để tạo 1 EmailController.
```
php artisan make:controller EmailController
```

Các bạn di chuyển tới app/Http/Controllers/EmailController.php và thêm đoạn code bên dưới vào nhé.
```
<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Redirect,Response,DB,Config;
use Mail;
class EmailController extends Controller
{
    public function sendEmail()
    {
      $user = auth()->user();
      Mail::to($user)->send(new MailNotify($user));
 
      if (Mail::failures()) {
           return response()->Fail('Sorry! Please try again latter');
      }else{
           return response()->success('Great! Successfully send in your mail');
         }
    }
}
```
Các bạn đọc qua chắc cũng hiểu đoạn code đang viết gì phải ko, easy mà :)
## Chạy dự án và Test
Bước cuối cùng là việc các bạn bật serve dưới local lên và test thứ.
```
php artisan serve

//Nếu port local của các bạn ko phải 80, thì các bạn có tùy ý đổi lại nhé, ex như bên dưới

php artisan serve --port=8080  
```

Bây giờ các bạn ra bên ngoài trình duyệt của mình theo đường dẫn:
```
http://localhost:8000/laravel-send-email

If you are not run PHP artisan server command, direct go to your browser and type the URL

http://localhost/blog/public/laravel-send-email
```

## Tổng Kêt.
Vậy là xong nhé, mình vừa hướng dẫn các bạn 1 ví dụ đơn giản về việc gửi mail thông qua việc sử dụng class mailable có sẵn của laravel. Lưu ý các bạn là nên tắt chức năng bảo vệ 2 lớp của gmail đi nhé thì các bạn mới test được.
Chúc các bạn thành công nhé.