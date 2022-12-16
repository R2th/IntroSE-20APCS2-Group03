<div align="center">
Ngày buồn, tháng nhớ, năm thương,...

Bên anh nắng rồi, bên em thì vẫn mưa

Anh thương em rồi, còn em thì vẫn chưa

Bồ câu ơi, hãy gửi bức thư của ta tới người mà ta thương yêu nhé...
</div>

500 anh em có ai nhớ đoạn thư này không? Đây chính là đoạn thư mình từng viết trong 1 bài viết đã lâu lắm rồi, có tựa là 
[Laravel Mail: Học tỏ tình phong cách Dev](https://viblo.asia/p/laravel-mail-hoc-to-tinh-phong-cach-dev-4P856PpLZY3) =))

Không biết 500 anh em đã đọc bài của mình có ai đã tỏ tình thành công hay chưa nhỉ? :)
Nếu chưa thì có thể mail bạn đã bị cho vào blacklist của nàng rồi, cùng mình tìm hiểu thêm trong bài viết này để khắc phục nhé. Biết đâu lần này anh em sẽ thành công (ahihi)

### 1. SMTP Server
![](https://images.viblo.asia/7e7b5065-db40-4861-889e-229fe90727ed.png)


**SMTP** hay Simple Mail Transfer Protocol, tạm dịch là `giao thức truyền tải thư tín đơn giản` là một chuẩn giao thức truyền tải thư điện tử qua mạng Internet.

Những máy chủ áp dụng giao thức **SMTP** để hỗ trợ người dùng gửi email được gọi là **SMTP Server**. Khi sử dụng SMTP Server, SMTP Server sẽ xác minh email gửi đi là từ một tài khoản đang hoạt động hay không,  đây là biện pháp đầu tiên giúp bảo vệ hộp thư đến của bạn khỏi những email bất hợp pháp. Nó cũng sẽ gửi lại email cho người gửi nếu email không thể gửi được. Việc này sẽ thông báo cho người gửi rằng địa chỉ email nhận bị sai hoặc email của họ đang bị chặn bởi server nhận thư. Đồng thời, với những email có dung lượng lớn (do đính kèm file hoặc video) khó gửi được hoặc không cho phép gửi, SMTP Server sẽ giúp giảm thời gian truyền tải dữ liệu và cấp quyền gửi dữ liệu dung lượng lớn. SMTP Server cũng sẽ giúp bạn có thể gửi mail đồng loạt tới số lượng lớn các emails cùng một lúc.

Bạn có thể đọc chi tiết hơn tại [đây](https://sendgrid.com/blog/what-is-an-smtp-server/).


### 2. SMTP Server Sendgrid
Có rất nhiều SMPT server lớn và được ưa chuộng sử dụng như SendGrid, Mailgun, Elastic Email, SparkPost, ... Và như tiêu đề, trong bài viết này, chúng ta sẽ tìm hiểu về Sendgrid.

![](https://images.viblo.asia/b86d86fd-b48b-48e2-ab19-228dfe7b743b.png)

[SendGrid](https://sendgrid.com/) là một trong những SMTP Server hàng đầu thế giới, cho phép bạn gửi 40.000 email FREE trong tháng đầu tiên, sau đó sẽ giới hạn 100 emails/ngày với tài khoản không mất phí. Nếu vượt quá 100 mails này bạn sẽ phải nâng cấp lên gói mất phí, thấp nhất là Essentials, với giá 14.95$/tháng để gửi được 100.000 emails/tháng.

![](https://images.viblo.asia/742d4ffd-9625-4a74-880a-2c7dd78b74b3.png)

Điểm mạnh của SendGrid là:
- Tốc độ gửi email rất nhanh và tin cậy.
- Cung cấp thư viện API dễ dàng tích hợp vào ứng dụng.
- Hỗ trợ giải pháp Email Marketing và được tích hợp vào tài khoản đăng ký, bạn có thể quản lý, thao tác và thực hiện ngay tại SendGrid mà không cần phải thông qua dịch vụ gửi Email.

Theo thống kê, đến hiện tại, SendGrid đang có hơn 80.000 tài khoản trả phí và gửi hơn 60 tỷ email mỗi tháng.


### 3. Đăng ký Sendgrid
Việc đăng ký sendgrid khá là đơn giản, đầu tiên, bạn truy cập link https://signup.sendgrid.com/

sau đó nhập thông tin để đăng ký 1 account
![](https://images.viblo.asia/a2341d7a-c461-41d0-9478-99e7af8189bc.png)
Một account free sẽ cho phép bạn gửi 100 emails/ 1 tháng. Thoải mái để cho anh em tỏ tình nhé =))

Sau khi đăng ký thành công thì bạn có thể đăng nhập tại đây https://app.sendgrid.com/login

Giờ thì tạo key để sử dụng thôi:
- Bước 1: Truy cập https://app.sendgrid.com/settings/api_keys
![](https://images.viblo.asia/5e3030e2-eaff-42af-9ab5-3fe657749e04.png)

- Bước 2: Click vào nút Create API Key, điền form và click Create & View để đăng ký
![](https://images.viblo.asia/205afb8d-f9d0-474a-b7f7-55a5cf3f1085.png)

Khi đó hệ thống sẽ cung cấp cho bạn một private key. Private key này sẽ dùng để cấu hình project của bạn.

Tiếp theo, bạn cần phải verify 1 email để config cho hệ thống. Email này chính là mail của người gửi thư.
- Bước 1: Truy cập link https://app.sendgrid.com/settings/sender_auth
![](https://images.viblo.asia/a09ee9ac-7973-4858-9c2a-427447923cb1.png)

- Bước 2: Click Verify a Single Sender, điền form
![](https://images.viblo.asia/30c68c3b-ac54-408b-b531-be25a2547e40.png)

- Bước 3: Truy cập email đã đăng ký để hoàn thành việc xác thực email.

Vậy là bạn đã có thể dử dụng email này để config project.
>> Lưu ý: Bạn buộc phải sử dụng email đã xác thực nếu không muốn gặp phải lỗi
>> `POST https://api.sendgrid.com/v3/mail/send` resulted in a `403 Forbidden``


### 4. Cấu hình Sendgrid
Đầu tiên, chúng ta cần cài đặt [larave-sendgrid-driver](https://github.com/s-ichikawa/laravel-sendgrid-driver)

Bạn có thể thêm trực tiếp require vào file composer.json
```cmd:composer.json
"require": {
    "s-ichikawa/laravel-sendgrid-driver": "~2.0"
},
```
hoặc sử dụng lệnh
```
composer require s-ichikawa/laravel-sendgrid-driver
```

>> Ở đây mình dùng phiên bản 2.0, ngoài ra bạn có thể sử dụng các phiên bản từ 3.0 trở lên.

Tiếp theo, cấu hình file .env và config

```.env
MAIL_DRIVER=sendgrid
SENDGRID_API_KEY='YOUR_SENDGRID_API_KEY'
MAIL_FROM_ADDRESS='YOUR_EMAIL'
MAIL_FROM_NAME='YOUR_NAME'
```
>> Trong đó, 
>> - YOUR_SENDGRID_API_KEY là key bạn lấy được sau khi đăng ký account ở [mục 3](https://viblo.asia/p/sendgrid-bap-can-bo-mail-khong-can-co-can-to-tinh-co-bWrZnXwb5xw#_3-dang-ky-sendgrid-2).
>> - YOUR_EMAIL là email mà bạn đã verify ở [mục 3](https://viblo.asia/p/sendgrid-bap-can-bo-mail-khong-can-co-can-to-tinh-co-bWrZnXwb5xw#_3-dang-ky-sendgrid-2)
>> - YOUR_NAME là tên của bạn (tên người gửi)
```php:config/app.php
'providers' => [
    Sichikawa\LaravelSendgridDriver\SendgridTransportServiceProvider::class
];
```

```php:config/services.php
'sendgrid' => [
    'api_key' => env('SENDGRID_API_KEY'),
],
```

```config/mail.php
'driver' => env('MAIL_DRIVER', 'sendgrid'),
'host' => env('MAIL_HOST', 'smtp.sendgrid.net'),
```

<br>

Bạn có thể đọc chi tiết hơn tại [đây](https://github.com/s-ichikawa/laravel-sendgrid-driver)

### 5. Gửi mail với Sendgrid
Đầu tiên chúng ta sẽ cần tạo 1 Mailable.

Mình sẽ tạo 1 class BaseMail để làm parent class, nhằm mục đích tái sử dụng nhé:
```php:App\Mail\BaseMail.php
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Sichikawa\LaravelSendgridDriver\SendGrid;

class BaseMail extends Mailable
{
    use Queueable, SerializesModels, SendGrid;
}
```

```php
<?php

namespace App\Mail;

use App\Mail\BaseMail;

class MailToLover extends BaseMail
{
    protected $username;

    /**
     * @param Sring $username
     */
    public function __construct($username)
    {
        $this->username = $username;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.love', [
                'username' => $this->username,
            ])
            ->subject("I love you");
    }
}
```

```resources/views/emails/love.blade.php
<div style="text-align: center;">
    <p>Gửi {{ $username }},</p>
    <p>Ngày buồn, tháng nhớ, năm thương,...</p>
    <p>Bên anh nắng rồi, bên em thì vẫn mưa</p>
    <p>Anh thương em rồi, còn em thì vẫn chưa</p>
    <p>Bồ câu ơi, hãy gửi bức thư của ta tới người mà ta thương yêu nhé...</p>
</div>
```

Tiếp theo, mình sẽ tạo 1 Job để gửi mail. Việc sử dụng queue khi gửi mail sẽ giúp các xử lý được thực hiện nhanh hơn, không để người dùng phải chờ đợi quá lâu, trong khi mail không nhất thiết phải gửi ngay lập tức.

```php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Mail\InvitationMail;
use Illuminate\Support\Facades\Mail;

class SendMailToLover implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $username;
    protected $email;
    
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($username, $email)
    {
        $this->username = $username;
        $this->email = $email;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $mail = (new MailToLover($this->username))->onQueue('emails');
        Mail::to($this->email)->send($mail);
    }
}
```

Giờ thì thử nghiệm thôi nào. Và đây là kết quả:
![](https://images.viblo.asia/f9d5acc0-4600-4d94-bee3-e6fdff9c006c.png)


Chúc anh em thành công và hẹn gặp lại mọi người trong bài viết tiếp theo ;)