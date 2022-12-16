# I. Mailgun là gì ?
[Mailgun](https://www.mailgun.com/) là một tập hợp các API mạnh mẽ, cho phép bạn gửi email, nhận email, theo dõi email một cách dễ dàng.

[Mailgun](https://www.mailgun.com/) được tích hợp vào Laravel 5.4 thông qua các driver, do đó bạn có thể gửi email trong Laravel 5.4 một cách rất đơn giản mà không cần phải cấu hình nhiều.
# II. Hướng dẫn đăng ký tài khoản Mailgun
Đầu tiên, bạn vào trang chủ của Mailgun tại địa chỉ : https://www.mailgun.com/
Tiếp đến ấn vào nút ***Sign up*** ở góc phải để tiến hành đăng ký tài khoản [Mailgun](https://www.mailgun.com/).
![](https://images.viblo.asia/627df681-0787-47e8-b298-cbe54560a4cf.png)
* Company/Acount name : Bạn điền vào một tên bất kì nào đó cũng được (điền không dấu)![](https://images.viblo.asia/7b30d60e-e165-46b8-851e-748b619029c5.png)
* Your name : Điền tên bạn vào (điền không dấu)
* Work email : Điền địa chỉ email của bạn
* Password : Điền mật khẩu đăng nhập mailgun
* Confirm password : Nhập lại mật khẩu đăng nhập
* Mục này Add payment info now (optional) các bạn cứ để trống, đừng tick vào nếu bạn chưa muốn nhập thông tin thanh toán vào.

Sau đó tick vào mục **Tôi không phải là người máy**, rồi ấn nút **Create Account**.
![](https://images.viblo.asia/7b30d60e-e165-46b8-851e-748b619029c5.png)
Sau khi ấn nút **Create Account**, một email xác nhận sẽ được gửi đến địa chỉ email của bạn. Bạn cần vào đó và ấn vào nút **Activate Mailgun Account** như hình để xác nhận địa chỉ email.
![](https://images.viblo.asia/c1a4df15-dd52-4f9c-a4d5-22f5b2ebc912.png)
Sau khi ấn vào nút để xác nhận, tiếp đến bạn cần điền số điện thoại của bạn vào rồi ấn nút **Send Verification Code** để nhận mã kích hoạt như hình
![](https://images.viblo.asia/ea87ef8b-7725-4eb6-aa65-eb6ffbcc4a83.png)
![](https://images.viblo.asia/f9c2bd41-d67e-4a2e-a1d6-3833c27df95d.png)
Sau khi đã đăng ký thành công và được chuyển đến trang quản trị Mailgun. Các bạn vào mục **Domains**, copy **Domain Name**, và lưu lại ở 1 chỗ nào đó để sử dụng ở các phần sau
![](https://images.viblo.asia/8d816bc2-508d-4b51-a848-d52cba6b0f53.png)
Tiếp đến, ở góc phải trên trang Mailgun, bạn ấn vào link địa chỉ email của bạn rồi chọn **Account Settings**
![](https://images.viblo.asia/e92b2f56-a6b2-4f30-94eb-cc5a84f9b3c6.png)
Tiếp đến ấn vào tab API keys bạn sẽ thấy thông tin Active API Key của mình![](https://images.viblo.asia/46584615-a0ac-4bce-9d1d-953655b97234.png)
Mặc định thì nó ẩn đi, bạn ấn vào biểu tượng con mắt để hiện ra, bạn copy và lưu lại API key này để dùng cho phần sau.

Như vậy là bạn đã đăng ký thành công tài khoản Mailgun và lấy các thông tin cần thiết. Phần tiếp theo bạn có thể sử dụng Mailgun để gửi Email trong Laravel 5.4 được rồi.
# III. Cài đặt GuzzleHttp
Tiếp đến, bạn cần cài thêm thư viện **GuzzleHttp** vào mới có thể gửi email trong Laravel 5.4 được. Việc tiến hành cài **GuzzleHttp** thì cũng đơn giản, tại thư mục gốc của source code Laravel, bạn mở CMD lên và gõ lệnh sau để tiến hành cài đặt **GuzzleHttp** vào
```
composer require guzzlehttp/guzzle
```
![](https://images.viblo.asia/dfca1193-9d6f-404e-b988-bdbe4fe602ee.png)
# IV. Tiến hành gửi email trong Laravel 5.4
Sau khi đã cài đặt GuzzleHttp và có đẩy đủ thông tin bao gồm : Domain name và Mailgun API Key, bây giờ mình sẽ hướng dẫn sử dụng thông tin này để gửi email trong laravel 5.4
## a. Cấu hình file .env
Các bạn mở file .env lên và thêm một số hằng số sau vào cuối file
```
MAIL_PORT=587
MAIL_DRIVER=mailgun
MAILGUN_DOMAIN=Điền Domain names mà mình đã hướng dẫn bạn lấy ở trên
MAILGUN_SECRET=Điền Mailgun API Key mà mình đã hướng dẫn bạn lấy ở trên
```
## b. Cấu hình file mail.php
Tiếp đến mở file mail.php ở đường dẫn config/mail.php và sửa chỗ driver thành mailgun như sau
```
'driver' => env('MAIL_DRIVER', 'mailgun'),
```
Kéo xuống dưới một tí, chỗ mục from bạn điền như sau
```
'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'admin@kungfuphp.com'),// điền email gửi
        'name' => env('MAIL_FROM_NAME', 'Hoang Hieu'),// Điền tên người gửi
    ],
```
* **MAIL_FROM_ADDRESS** : Bạn điền vào 1 địa chỉ email bất kỳ (ví dụ điện abc@gmail.com vẫn được nhé, cái này chỉ là định danh mà thôi) ví dụ ở đây mình điền là admin@kungfuphp.com
* **MAIL_FROM_NAME** : Thì điền tên bạn vào, ví dụ ở đây mình điền là Hoang Hieu
## c. Cấu hình file service.php
Tiếp đến, mở file config/service.php lên và thêm đoạn này vào rồi lưu lại
```
'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],
```
## d. Tạo file UserEmail.php
Sau đó, bạn mở tại thư mục gốc của source Laravel, bạn mở CMD lên và gõ lệnh sau
```
php artisan make:mail UserEmail
```
Sau khi gõ lệnh trên, bạn vào đường dẫn app/Mail sẽ thấy file UserEmail.php đã được tạo ra và có nội dung như sau
```
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserEmail extends Mailable
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
    }
}
```
Các bạn để ý hàm `build()`, đây là hàm dùng để gọi ra view chứ nội dung email của bạn. Bạn sửa chỗ view.name thành view của bạn, chẳng hạn ở đây mình sẽ sửa thành `emails.sendemail`
```
public function build()
    {
        return $this->view('emails.sendemail');
    }
```
## e. Tạo view sendemail.blade.php
Tiếp đến, mình sẽ tao các bạn cần tạo view sendemail để chứa nội dung email của chúng ta. Tại đường dẫn resources/views, bạn tạo 1 folder đặt tên là emails, bên trong folder emails này bạn tạo 1 file đặt tên là sendemail.blade.php như sau
![](https://images.viblo.asia/12c3dcb4-6953-46ee-9503-799c2522f516.png)
File `sendemail.blade.php`, bạn thêm vào nội dung như sau
```
Hello,
This is email sent by Mailgun API and Laravel 5.4
```
## f. Tạo file controller EmailController.php
Tiếp đến, trong thư mục App/Http/Controllers, bạn tạo 1 file mới đặt tên là EmailController.php có nội dung như sau:
```
<?php

namespace App\Http\Controllers;

use Mail;
use App\User;
use App\Mail\OrderShipped;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EmailController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function sendEmailReminder(Request $request)
    {
        $id = 1; // điền 1 mã id bất kỳ của user trong bảng users 
        $user = User::findOrFail($id);

        Mail::to($user)->send(new UserEmail());
    }
}
```
## g. Tạo route gửi email
Bạn mở file `web.php` nằm trong thư mục routes và thêm vào đoạn route sau
```
Route::get('/send_email', array('uses' => 'EmailController@sendEmailReminder'));
```
## h. Tiến hành chạy thử
Tiếp đến bạn vào đường dẫn
```
localhost/website_folder/public/send_email
```
(với website_folder chính là tên folder chứa source code Laravel 5.4 của bạn).

Nếu không có thông báo lỗi hiện ra tức là bạn đã gửi email thành công, ngược lại nếu bạn thấy lỗi, thì bạn vào đường dẫn sau https://curl.haxx.se/ca/cacert.pem

Copy hết toàn bộ nội dung và lưu vào một file đặt tên là cacert.pem, file này bạn sẽ đặt vào đường dẫn sau
```
C:\wamp64\bin\php\php7.0.10
```
Ở trên là đường dẫn của wamp của mình, bạn cứ đặt lại tương ứng theo đường dẫn wamp của bạn.

Tiếp đến các bạn mở file php.ini ở đường dẫn
```
C:\wamp64\bin\apache\apache2.4.23\bin
```
Tìm đến chỗ `url.cainfo`, mở extension này ra, rồi sửa lại như sau
```
curl.cainfo = "F:\wamp64\bin\php\php7.0.10\cacert.pem"
```
Save file `php.ini` lại, restart lại Wamp. Rồi chạy lại đường dẫn
```
localhost/website_folder/public/send_email
```
Bạn sẽ thấy một email có nội dung là
```
Hello,
This is email sent by Mailgun API and Laravel 5.4
```