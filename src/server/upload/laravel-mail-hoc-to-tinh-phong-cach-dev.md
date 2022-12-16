Để giúp đỡ 500 anh em không tìm được "gấu" nhờ fulltext-search, mình đã viết bài viết này với mục đích giúp anh em có thể tỏ tình với crush thành công ;) . Cùng mình tìm hiểu nhé.
<br>

Truyện kể rằng: Ngày xửa ngày xưa, có một chàng trai thầm yêu một cô gái. Chàng đã đem tất cả tâm tình của mình viết vào một bức thư và nhờ chú bồ câu gửi bức thư cho cô gái mà anh yêu mến...

<div align="center">
Ngày buồn tháng nhớ năm thương...

Bên anh nắng rồi, bên em thì vẫn mưa

Anh thương em rồi, còn em thì vẫn chưa

Bồ câu ơi, hãy gửi bức thư của ta tới người mà ta thương yêu nhé...
</div>

Nhưng mưa giông rồi bão tố,... liệu bồ câu có thể đưa được thư tới tay cô gái mà chàng trai  thầm thương trộm nhớ hay không? 

Đừng lo, đã có Laravel, không lo gửi mail trừ khi mất mạng :D Quảng cáo đến đây là kết thúc (hahaha)
<br>
Đúng vậy, xưa bồ câu có thể không đưa nổi thư chứ giờ  có Laravel, có internet, mà anh em vẫn không dám tỏ tình thì không được nhé :D Hãy cùng mình tìm hiểu cách gửi mail bằng Laravel, để tỏ tình với crush nào ;)

### 1. Cấu hình:
- File **.env**:

Trong file .env, bạn cần thêm (hoặc sửa) đoạn code sau:
```php:.env
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=<your_email>
MAIL_PASSWORD=<password_of_your_email>
MAIL_ENCRYPTION=tls
```
Trong đó:
1. your_mail là mail của bạn: mail này sẽ đóng vai trò gửi thư.
2. password_of_your_email: mật khẩu của email mà bạn sử dụng.
>>Lưu ý: Mail sử dụng để gửi thư phải là email đã tắt xác minh 2 bước.

Ví dụ - Với trường hợp mail của mình là "onlyyou@gmail.com", và password của mail này là "520520520":
```php
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=onlyyou@gmail.com
MAIL_PASSWORD=520520520
MAIL_ENCRYPTION=tls
```
- File **config/mail.php**:

Bạn cần cấu hình 'from' => 'address' là mail của bạn và 'from' => 'name' là tên người gửi. Bạn có thể tham khảo file của mình dưới đây:
```php:config/mail.php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Mail Driver
    |--------------------------------------------------------------------------
    |
    | Laravel supports both SMTP and PHP's "mail" function as drivers for the
    | sending of e-mail. You may specify which one you're using throughout
    | your application here. By default, Laravel is setup for SMTP mail.
    |
    | Supported: "smtp", "sendmail", "mailgun", "mandrill", "ses",
    |            "sparkpost", "log", "array"
    |
    */

    'driver' => env('MAIL_DRIVER', 'smtp'),

    /*
    |--------------------------------------------------------------------------
    | SMTP Host Address
    |--------------------------------------------------------------------------
    |
    | Here you may provide the host address of the SMTP server used by your
    | applications. A default option is provided that is compatible with
    | the Mailgun mail service which will provide reliable deliveries.
    |
    */

    'host' => env('MAIL_HOST', 'smtp.gmail.com'),

    /*
    |--------------------------------------------------------------------------
    | SMTP Host Port
    |--------------------------------------------------------------------------
    |
    | This is the SMTP port used by your application to deliver e-mails to
    | users of the application. Like the host we have set this value to
    | stay compatible with the Mailgun e-mail application by default.
    |
    */

    'port' => env('MAIL_PORT', 587),

    /*
    |--------------------------------------------------------------------------
    | Global "From" Address
    |--------------------------------------------------------------------------
    |
    | You may wish for all e-mails sent by your application to be sent from
    | the same address. Here, you may specify a name and address that is
    | used globally for all e-mails that are sent by your application.
    |
    */

    'from' => [
        'address' => 'onlyyou@gmail.com',
        'name' => 'Chang trai tham men em',
    ],

    /*
    |--------------------------------------------------------------------------
    | E-Mail Encryption Protocol
    |--------------------------------------------------------------------------
    |
    | Here you may specify the encryption protocol that should be used when
    | the application send e-mail messages. A sensible default using the
    | transport layer security protocol should provide great security.
    |
    */

    'encryption' => env('MAIL_ENCRYPTION', 'tls'),

    /*
    |--------------------------------------------------------------------------
    | SMTP Server Username
    |--------------------------------------------------------------------------
    |
    | If your SMTP server requires a username for authentication, you should
    | set it here. This will get used to authenticate with your server on
    | connection. You may also set the "password" value below this one.
    |
    */

    'username' => env('MAIL_USERNAME'),

    'password' => env('MAIL_PASSWORD'),

    /*
    |--------------------------------------------------------------------------
    | Sendmail System Path
    |--------------------------------------------------------------------------
    |
    | When using the "sendmail" driver to send e-mails, we will need to know
    | the path to where Sendmail lives on this server. A default path has
    | been provided here, which will work well on most of your systems.
    |
    */

    'sendmail' => '/usr/sbin/sendmail -bs',

    /*
    |--------------------------------------------------------------------------
    | Markdown Mail Settings
    |--------------------------------------------------------------------------
    |
    | If you are using Markdown based email rendering, you may configure your
    | theme and component paths here, allowing you to customize the design
    | of the emails. Or, you may simply stick with the Laravel defaults!
    |
    */

    'markdown' => [
        'theme' => 'default',

        'paths' => [
            resource_path('views/vendor/mail'),
        ],
    ],

];

```
### 2. Thiết kế frontend:
Bạn cần tạo một view để gửi form request, và một view là mẫu thư mà bạn sẽ gửi cho crush. Như ở đây, mình sẽ tạo 2 file:
1. Form request: **form.blade.php**
```php:form.blade.php
{!! Form::open([
    'method' => 'POST',
    'route' => ['send_mail'],
]) !!}
    <div>
        {!! Form::label('Name') !!}
        {!! Form::text(
            'name',
            null,
            [
                'placeholder'=>"Your name"
            ]
        ) !!}
    </div>
    <div>
        {!! Form::label('Email') !!}
        {!! Form::text(
            'email',
            null,
            [
                'placeholder'=>"Your email"
            ]
        ) !!}
    </div>
    <div>
        {!! Form::submit('Send') !!}
    </div>
{!! Form::close() !!}

```
2. Thư mẫu: **mail.blade.php**
```php:mail.blade.php
<div>
	@if ($name)
		{{ 'Hi, ' . $name . ',' }}
		</br>
		<div>
                Ngày buồn tháng nhớ năm thương...
                Bên anh nắng rồi, bên em thì vẫn mưa
                Anh thương em rồi, còn em thì vẫn chưa
                Làm sao để em hiểu được lòng anh đây hỡi cô gái mà anh thầm thương trộm nhớ
                Yêu em,
                Chàng trai năm ấy
        </div>
	@endif
</div>
```
### 3. Xây dựng hàm xử lý phía controller:
Tạo SendmailController:
```
php artisan make:controller SendmailController
```
Sau khi thực hiện lệnh, bạn sẽ có file app/Http/Controllers/SendmailController. Tiếp theo ta sẽ viết hàm xử lý:
```php:app/Http/Controllers/SendmailController
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class SendmailController extends Controller
{
    protected $input;

    public function send(Request $request)
    {
        $this->input = $request->all();
        Mail::send(
            'mail', 
            [
                'name' => $this->input["name"],
            ],
            function($message) {
                $message->to($this->input["email"], $this->input["name"])
                    ->subject('Fall In Love');
            }
        );

        return back();
    }
}

```
Trong đó, các tham số của hàm send() lần lượt là:
    <br>
    - 'mail': template của mail mẫu (mail.blade.php) 
    <br>
    - []: mảng chứa dữ liệu trả về cho mail.blade.php
    <br>
    - function(`$message`): phương thức gửi mail, trong đó, to() có 2 tham số lần lượt là địa chỉ mail nhận và tên người nhận, subject() là tiêu đề thư.
    <br> 
### 4. Thêm route:
Cuối cùng, thêm route để là bạn đã có thể gửi mail để tỏ tình với crush rồi ;)
```php
Route::get('/mail', function () {
    return view('mail');
});

Route::post('/send', ['uses' => 'SendmailController@send', 'as' => 'send_mail']);

```
Giờ thì chạy `php artisan serve` và truy cập [http://localhost:8000/mail](http://localhost:8000/mail) để tỏ tình cho nàng thôi nào.
Nếu trong trường hợp gặp lỗi do config, bạn hãy thử chạy lệnh sau nhé:
```
php artisan cache:clear
php artisan config:cache
```
Gió đông về rồi, anh em hãy tỏ tình với crush ngay đi. Chúc anh em tỏ tình thành công. Mình cũng phải đi gửi mail đây, tạm biệt nhé!

Mãi là anh em ....

Linh tài liệu tham khảo: https://viblo.asia/p/huong-dan-gui-mail-voi-laravel-5-XQZkxZEbGwA