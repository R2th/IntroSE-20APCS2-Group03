## Giới thiệu

Xin chào và trân thành cảm ơn mọi người đã quay trở lại !!!, trong serie này mình sẽ cùng các bạn tìm hiểu cách cấu hình để thực hiện công việc gửi một gmail đơn giản, và sẽ cùng nghiên cứu cách để tối ưu nhất cho công việc này. Chúng ta cùng bắt đầu thôi nào :)
## Nội dung

### Cấu hình tài khoản gmail

Đầu tiên các bạn cần một email cơ bản của trang web, hiểu đơn giản là các bạn cần có một email gốc để gửi cho tất cả các email khác. Mình khá chắc là các bạn sẽ không muốn một email phức tạp đâu, vì vậy mình sẽ chia sẻ cách để các bạn có một email gốc rất đơn giản. 

Yêu cầu đầu vào: Các bạn cần một tài khoản email của google :), và hết rồi !!!. Bây giờ chỉ cần cấu hình nữa là được :v

Đăng nhập vào Tài khoản Google Email của bạn và nhấp vào nút **Tài khoản Google**. Nút này được hiển thị khi bạn nhấp vào **ảnh hồ sơ trong Bảng điều khiển Gmail** của bạn như được hiển thị

![](https://images.viblo.asia/218bb271-fb7d-4b31-b7b3-7c42eed00495.png)

Khi bạn đang ở Trang **Tài khoản của tôi**, sau đó nhấp vào **Bảo mật** và cuộn xuống phía dưới và bạn sẽ tìm thấy cài đặt **'Truy cập ứng dụng kém an toàn'** . Nhấp vào nút radio để bật nó.

### Cấu hình file .env

Trong file .env của bạn cấu hình lại như sau:
```js
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=apppassword
MAIL_ENCRYPTION=tls
```
Với gmail thì ta sẽ sử dụng phương thức gửi mail là smtp, host của gmail là smtp.gmail.com, cổng để kết nối đến gmail là 587, **MAIL_USERNAME** chính là gmail của bạn và bạn cần phải thay your@gmail.com = gmail của bạn nhé. **MAIL_PASSWORD** chính là mật khẩu của gmail bạn vừa nhập

### Tạo một mail tự động
Về phần này thì laravel đã hỗ trợ bạn, chỉ cần gọi nó ra là song
```js
php artisan make:mail NameEmail
```
Trong đó name email là tên email của bạn nhé :). Sau khi bạn chạy câu lệnh trên thì nó sẽ tạo cho bạn một thư mục Mail trong App của bạn. Nó sẽ trông như sau
```js
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmailMailable extends Mailable
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
       //
   }
}
```
Tiếp theo bạn cần một view để trả về cho người dùng, bạn có thể custom nó tại thư mục resources/views và quan trọng bạn phải dẫn nó vào trong file mail phía trên của bạn. Trong phần build() bạn có thể viết đơn giản :)
```js
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmailMailable extends Mailable
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
        return $this->markdown('welcome');
    }
}
```
Với $this->view: Truy cập vào thư mục view của bạn, còn welcome thì đây là tên file hiển thị mà mình custom (Thực ra nó là file mặc định của laravel :) ).

Hiện tại mình lấy ví dụ đơn giản khi bạn không có tham số gì muốn trả ra bên phải view mà bạn custom. Nếu bạn muốn truyền biến thì thực hiện như sau
```js
<?php

namespace App\Mail;

use App\Bill;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailMailable extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $bill;
    public function __construct(Bill $bill)
    {
        //
        $this->bill=$bill;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.newEmailUser');
    }
}
```
Ở đây mình truyền sang file view một biến `$bill` và nó có kiểu là **object Bill** bây giời bên view bạn có thể sử dụng biến này bình thường như thế này `{{$bill}}`, bạn chú ý phần này vì tý nữa khi ta gọi đến nó nếu bạn không truyền vào thì nó sẽ báo lỗi nhé :).

### Sử dụng mail vừa cấu hình như thế nào
Tiếp theo khi người dùng thực hiện một tác vụ thì ta chỉ cần gọi ra ở controller mà ta cần là được

```js
Mail::to('...')->send(new SendEmailMailable());
```
Với '...' là địa chỉ mà bạn muốn gửi gmail tới.

Nếu trong trường hợp mà bên Mail bạn có truyền tham số đi, thì ở đây bạn chú ý phải truyền một tham số có kiểu trùng khớp nhé :). Bài mình thì viết như sau:
```js
$new_bill = $this->billRepository->create($arr);
Mail::to(Auth::user()->email)->send(new SendEmail($new_bill));
```
Ở đây `$new_bill` của mình là một tập dữ liệu có kiểu dữ liệu là `Bill`.

## Tạm kết
Trong bài này mình đã cùng các bạn tìm hiểu để gửi một email cơ bản đến với người sử dụng. Bài tiếp theo chúng ta sẽ cùng tìm hiểu cách sử dụng hàng đợi queue, để tránh thời gian chờ khi gửi gmail nhé :). Cảm ơn các bạn đã theo dõi !!! bài viết của mình còn nhiều thiếu sót mong các bạn đóng góp ý kiến để mình phát triển bài viết hơn nữa.