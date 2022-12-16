Chắc chắn các bạn đã và sẽ gặp *task* liên quan tới gửi *mail*, đây là bài chia sẻ *tips* giúp các bạn ***debug mail***  trong *Laravel* 1 cách đơn giản và nhanh nhất không cần cài đặt, cấu hình nhiều.

## 1. Setup mail
Nếu các bạn đã biết cách tạo mailable hãy bỏ qua bước này và xem nhanh [2. Cấu hình mail driver **log**](#2-cấu-hình-mailer-log).
### 1.1 Tạo mailable

Chạy lệnh sau để tạo *mailable*.
```sh
php artisan make:mail Welcome
```
Sau khi chạy lên trên bạn sẽ thấy có 1 tệp mới nằm ở `app/Mail/Welcome.php`.

Sau đó hãy tạo thêm 1 tệp chứa mẫu thiết kế mail của bạn `resources/views/email/welcome.blade.php`.
```html
{{-- resources/views/email/welcome.blade.php --}}

<div style="display: flex; justify-content: center; align-items: center; background-color: #343e9e; width: 100%; height: 150px">
    <div style="color: #FFF; font-size: 2rem">Hello {{$user->name ?? ''}}, Welcome to Laravel</div>
</div>
```
Cập nhật lại mẫu mail sẽ được sử dụng khi gửi.
- Laravel version <= 8: Sử dụng phương thức `build`
    ```php
    // app/Mail/Welcome.php

    public function build()
    {
        return $this->view('email.welcome');
    }
    ```
- Laravel version 9+: Sử dụng phương thức `content`
    ```php
    // app/Mail/Welcome.php

    public function content()
    {
        return new Content(
            view: 'email.welcome',
        );
    }
    ```
Dưới đây là tệp *mailable* hoàn chỉnh có truyền thêm biến `$user` để hiển thị thêm thông tin trong mẫu mail.
```php
// app/Mail/Welcome.php

<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Mail\Mailable;

class Welcome extends Mailable
{
    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.welcome')
            ->subject('Welcome mail')
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->to($this->user->email, $this->user->name)
            ->cc('cc@example.com', 'CC Email')
            ->bcc('bcc@example.com', 'BCC Email')
            ->replyTo('reply@example.com', 'Reply Email');
    }
}
```
### 1.2 Tạo api test
```php
// routes/web.php

Route::get('send-mail', function () {
    $user = User::first();
    Mail::send(new Welcome($user));
});
```
## 2. Cấu hình mailer **log**

Laravel hỗ trợ chúng ta rất nhiều kiểu driver: log, smtp, ses, mailgun, postmark, sendmail, failover,...

Và để ***debug*** ở local chúng ta sẽ sử dụng mail driver ***log***. Trong tệp *.env* hãy sửa biến *MAIL_MAILER* và không cần cấu hình thêm gì cả.
```env
MAIL_MAILER=log
```

Truy cập vào api test mail [localhost/send-mail](http://127.0.0.1:8000/send-mail) và thử test xem kết quả nào 😎.

Oh không có gì sảy ra, ... Không không không, hãy xem file `storage/logs/laravel.log` có gì nào.
```
# storage/logs/laravel.log

[2022-10-25 16:16:38] local.DEBUG: Message-ID: <bb777cab4191e586290af7167719fc76@laravel.test>
Date: Tue, 25 Oct 2022 16:16:38 +0000
Subject: Welcome mail
From: Laravel <hello@example.com>
Reply-To: Reply Email <reply@example.com>
To: 1 <tuan@epal.vn>
Cc: CC Email <cc@example.com>
Bcc: BCC Email <bcc@example.com>
MIME-Version: 1.0
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: quoted-printable

<div style="display: flex; justify-content: center; align-items: center; background-color: #343e9e; width: 100%; height: 150px">
    <div style="color: #FFF; font-size: 2rem">Hello , Welcome to Laravel</div>
</div>
```

Tất cả thông tin mail từ date, subject, from, to, cc, bcc,... sẽ được log lại, chúng ta có thể kiểm tra xem mình cấu hình đầy đủ chưa?, còn thiếu hay sai thông tin gì?.
Phần giao diện mail các chúng ta có thể copy phần text `<div ...</div>` và paste vào 1 trong các trang code online như [CodePen](https://codepen.io/pen/), [JsBin](https://jsbin.com/?html,output),...

{@embed: https://codepen.io/thanhdc-dev/pen/jOKOzyP}

## 3. Tham khảo
- [Laravel doc](https://laravel.com/docs/9.x/mail).

## 4. Lời kết

Trên website [Laravel](https://laravel.com/docs) đã có đầy đủ hướng dẫn chi tiết về tất cả các phương thức mà laravel hỗ trợ ngoài ra còn có trang [Laravel github source](https://github.com/laravel/framework) các bạn có thể đọc thêm cũng như thử nghiệm nhiều trường hợp để có thể sử dụng chúng một cách hiệu quả đúng trường hợp nhất nhé.

*Hi vọng chia sẻ này sẽ giúp các bạn newbie 1 phần nào trong quá trình tìm hiểu về Laravel. Nếu thấy hữu ích hãy cho mình 1 vote 👍 để thêm nhiều người biết đến chia sẻ này nhé.*

> Mình là **[Công Thành](https://viblo.asia/u/viblo.d.c.thanh)** cám ơn các bạn đa theo dõi bài viết của mình, nếu có câu hỏi nào vui lòng bình luận phía dưới 👇 nhé.

> Xem thêm series bài viết 👉 [Laravel tips](https://viblo.asia/s/laravel-tips-meo-hay-ve-laravel-r1QLxn3x4Aw)