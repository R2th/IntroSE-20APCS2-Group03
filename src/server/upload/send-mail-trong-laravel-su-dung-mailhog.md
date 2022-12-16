Xin chào mọi người, khi phát triển một ứng dụng web thì các tác vụ gửi mail được sử dụng rất thường xuyên nên hôm nay, mình sẽ gửi đến mọi người cách để gửi mail trong Laravel sử dụng [MailHog](https://github.com/mailhog/MailHog) . Trong làm việc thực tế, sẽ có rất nhiều công cụ để dùng cho gửi mail như [Mailtrap](https://mailtrap.io/), MailHog,... nhưng mình đề xuất cho các bạn sử dụng MailHog, vì nó chỉ gửi ở dưới máy local nên sẽ tránh được 1 số vấn đề bảo mật sau này (lúc trước mình thường dùng Mailtrap vì nó khá tiện và đã bị các bác trong dự án khuyên không nên dùng :laughing:)

# Các bước thực hiện
## Cài đặt ứng dụng Laravel
Ở bài viết này mình sẽ sử dụng Laravel 8 để thực hiện, đầu tiên chạy câu command quen thuộc để thực hiện cài đặt ứng dụng Laravel nhé. 
```
composer create-project laravel/laravel mail-app

cd mail-app

php artisan serve
```

## Tạo route và giao diện
Trước khi tạo 1 route, thì các bạn thực hiện tạo 1 controller dùng cho việc gửi mail bằng command
```
php artisan make:controller MailController
```
Sau khi tạo xong controller thì chúng ta thêm 1 router mail và thực hiện làm 1 giao diện đơn giản cho việc gửi mail gồm 2 input là địa chỉ email người nhận vào nội dung muốn gửi. 
```routes/web.php
Route::get('/mail', [MailController::class, 'index']);

Route::post('/mail', [MailController::class, 'sendMail'])->name('send_mail');
```
![](https://images.viblo.asia/cda09d92-a761-4632-bd53-30b63a68310d.png)

## Thực hiện gửi mail
### 1. Cài đặt MailHog
Để thực hiện gửi mail các bạn cần phải thực hiện cài đặt MailHog, các bạn có thể lên lên docs của nó để xem nhé https://github.com/mailhog/MailHog. Ở đây mình sẽ cài đặt bằng docker với Dockerfile như bên dưới.

```Dockerfile
FROM mailhog/mailhog

LABEL maintainer="Mahmoud Zalt <mahmoud@zalt.me>"

CMD ["Mailhog"]

EXPOSE 1025 8025
```
Thực hiện build docker image và chạy ở port 1025 và 8025 
```
docker build .
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

### 2. Cấu hình MailHog trong .env
```
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=laravel.admin@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

### 3. Thực hiện tạo một Mailable
Thực hiện command bên dưới để tạo 1 mailable, nó sẽ được lưu trong folder `app/Mail`
```
php artisan make:mail SendMail
```
Ở trong function build các bạn có thể setting cho email như `from`, `view`, `with`, `attach`, ... Ở đoạn code dưới đây mình thực hiện gửi mail có `subject` là "Send mail contact!" sử dụng `markdown` trong file `resources/views/Mails/send_mail.blade.php` và nhận data thông qua `__construct` và gán vào biến `$this->data`(nhớ để pubic thì ở trong view mới có thể nhận được nha)
```app/Mail/SendMail.php
class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Send mail contact!')
            ->markdown('Mails.send_mail');
    }
}
```
Ở file view thì mình sẽ tạo 1 thông tin đơn giản để hiển thị nội dung mail nhé. Biến `$data` chính là `$this->data` ở file mailable phía trên.
```resources/views/Mails/send_mail.blade.php
@component('mail::message')
# Hello {{ $data['email'] }}

{{ $data['content'] }}

Thanks<br>
@endcomponent
```

### 4. Thực hiện gửi mail ở controller
Sau khi người dùng nhập email và content rồi nhấn submit, chúng ta sẽ chuyển hướng đến function `sendMail` trong `MailController`, ở đây các bạn nhớ thêm validate `required` cho `email` và `content` nhé 
```app/Http/Controllers/MailController.php
class MailController extends Controller
{
    public function sendMail(Request $request)
    {
        Mail::to($request->email)
            ->send(new SendMail($request->only(['email', 'content'])));
        $request->session()->flash('message', 'Send mail was successfully!');
        
        return view('Mails.index');
    }
}
```

## Kết quả
![](https://images.viblo.asia/08b93c6b-5e98-43cf-9a17-9b3b576a33ca.png)

# Tổng kết
Việc gửi mail cần phải cẩn thận, có thể bị gửi mail nhầm cho end users, cho user toàn hệ thống, ... vì vậy phải test lại cần thận khi thực hiên. Ngoài ra, việc gửi mail sẽ khiến cho ứng dụng load khá lâu, nên bạn nên sử dụng [Queues](https://laravel.com/docs/8.x/queues#introduction) cho việc gửi mail nhé. Cảm ơn mọi người đã theo dõi bài viết của mình.