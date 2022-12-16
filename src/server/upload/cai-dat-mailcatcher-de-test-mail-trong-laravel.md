# Giới thiệu
Hệ thống của bạn có chức năng gửi email và trong quá trình dev bạn cần 1 công cụ hỗ trợ để bạn test mail?
Có rất nhiều công cụ hỗ trợ bạn làm công việc này. Trong Laravel, mặc định đã có tích hợp [Mailtrap](https://mailtrap.io) rồi.
Mailtrap cung cấp một SMTP server fake dành cho developer. Nhưng nó cần có mạng để test mail và thậm chí nếu với các dự án lớn thì cần mất thêm chi phí để sử dụng.
Hôm nay mình xin giới thiệu với các bạn công cụ test mail offline, miễn phí, được cài đặt trên server, rất nhẹ và dễ sử dụng. Đó là [MailCatcher](http://mailcatcher.me).

MailCatcher là một Ruby Gem, cho phép chạy 1 SMTP Server đơn giản, có thể gửi bất kỳ email nào trên local và hiển thị nó trên giao diện web.
Sau khi cài đặt xong Mailcatcher, nó sẽ cung cấp cho bạn 2 phương thức để tương tác. Đó là SMTP và HTTP.
Phương thức SMTP giúp bạn chạy SMTP Server để gửi mail (smtp://127.0.0.1:1025). Còn HTTP, giúp bạn xem được các mail được gửi đến/gửi đi thông qua giao diện web (http://127.0.0.1:1080).

# Cài đặt Mailcatcher
Các bước cài đặt khá đơn giản, mình sẽ hướng dẫn các bạn cài trên server ubuntu, bạn chỉ cần cài theo các bước như dưới đây:

**1. Update repositories**
```sh
sudo apt-get update
```

**2. Mailcatcher Dependencies**
Mailcatcher cần Ruby để hoạt động, nên trước tiên chúng ta cần phải cài Ruby.
```sh
sudo apt-get update
sudo apt-get install -y build-essential software-properties-common
sudo apt-get install -y libsqlite3-dev ruby2.3-dev
```

**3. MailCatcher**
```sh
sudo gem install mailcatcher
```

**4. Khởi động mailcatcher**
```sh
mailcatcher
```
![](https://images.viblo.asia/590dfc76-e08b-4e54-ae8d-ddba1410e652.png)
Sau khi cài đặt, chúng ta có thể thấy các options có sẵn:
```sh
$ mailcatcher --help
Usage: mailcatcher [options]
        --ip IP                      Set the ip address of both servers
        --smtp-ip IP                 Set the ip address of the smtp server
        --smtp-port PORT             Set the port of the smtp server
        --http-ip IP                 Set the ip address of the http server
        --http-port PORT             Set the port address of the http server
    -f, --foreground                 Run in the foreground
    -v, --verbose                    Be more verbose
    -h, --help                       Display this help information
```
Sau đó chúng ta có thể bắt đầu sử dụng Mailcatcher. Nhưng chúng ta sẽ cần làm thêm 1 bước nữa để có thể truy cập webmail thông qua IP để ở mạng nào cũng đều xem webmail được.
```sh
mailcatcher --foreground --http-ip=0.0.0.0
```

**5. Khởi động cùng máy chủ.**
Tính năng này rất hữu ích để chạy Mailcatcher mỗi khi máy chủ khởi động. Điều này cho phép chúng ta không cần phải lúc nào cũng nhớ việc phải bật Mailcatcher mỗi khi nào khởi động máy chủ trên ubuntu.

- Tạo mới hoặc sửa file `/etc/init/mailcatcher.conf`:
```sh
description "Mailcatcher"

start on runlevel [2345]
stop on runlevel [!2345]

respawn

exec /usr/bin/env $(which mailcatcher) --foreground --http-ip=0.0.0.0
```
Chúng ta cấu hình Mailcatcher để chạy ngầm với tùy chọn --foreground. Sau đó, chúng ta sử dụng các câu lệnh sau để khởi động/dừng/khởi động lại mailcatcher:
```sh
sudo service mailcatcher status
sudo service mailcatcher start
sudo service mailcatcher restart
sudo service mailcatcher stop
```
Chạy lệnh `sudo service mailcatcher start` bắt đầu khởi động nó.
Sau đó, bạn có thể gõ địa chỉ IP máy chủ IP tại cổng 1080 (http://ip-server-cua-ban:1080/) để xem giao diện web!
![](https://images.viblo.asia/49eee7a4-6206-41f6-b8b7-ced8b461312a.png)

# Sử dụng trong Laravel
Việc cài đặt Mailcatcher đã xong xuôi, giờ là lúc chúng ta sử dụng nó để phục vụ cho việc gửi test mail.
Mở file .env lên và thay đoạn config như thế này vào:
```
MAIL_DRIVER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```
# Test mail
Cài đặt Mailcatcher xong, cài đặt .env xong là đủ để test mail rồi.
Để test mail, chúng ta mở code Laravel và thêm 1 đoạn code nhỏ để gửi mail đi, rồi mở web http://localhost:1080/ lên xem thử xem có mail vừa được gửi đi chưa?
- *TestMailController.php*
```php
<?php

namespace App\Http\Controllers;

use App\Mail\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;

class TestMailController extends Controller
{
    public function mail(Request $request)
    {
        Mail::send(new Test());
    }
}
```
*App\Mail\Test.php*
```php
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Test extends Mailable
{
    use Queueable, SerializesModels;

    public function build()
    {
        return $this->to('test@framgia.com')
                                ->view('emails.test');
    }
}
```
*resources/views/emails/test.blade.php*
```html
<p>Test Mail</p>
```

# Kết quả
Sau khi test với đoạn code gửi mail như trên trong Laravel, chúng ta vào webmail (http://localhost:1080/) để check kết quả nhé. Có vẻ là ngon rồi đúng không nào! :D
![](https://images.viblo.asia/4e94735a-d0e7-4c30-a440-f173410e66bb.png)

# Kết luận
MailCatcher thực sự có thể giảm bớt thời gian trong quá trình dev và test. Hãy xem xét và thử áp dụng nó cho ứng dụng Laravel của bạn. 
Mình đã sử dụng và áp dụng vào dự án của mình và cảm thấy nó thật sự có ích, nhỏ, nhẹ mà dễ sử dụng. Hy vọng bài viết này sẽ giúp các bạn có thêm sự lựa chọn trong các tool để phục vụ cho việc test mail.
Chúc các bạn vui vẻ!

# Tham khảo
- https://mailcatcher.me/
- https://prabuddha.me/setup-mailcatcher/
- https://gist.github.com/shark0der/28f55884a876f67c92ce
- https://www.vultr.com/docs/install-mailcatcher-on-ubuntu-14
- https://blog.haposoft.com/mailcatcher-test-email-laravel/
- https://laravel.com/docs/5.7/mail