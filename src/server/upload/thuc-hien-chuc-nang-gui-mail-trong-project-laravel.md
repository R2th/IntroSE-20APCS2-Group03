<div align="center">

# Lời nói đầu
</div>

Đầu xuân năm mới mình chợt nảy ra một ý định là sẽ gửi mail chúc mừng năm mới đến những người quen của mình, và đồng thời mình cũng nhận ra là trong series Laravel project của mình chưa đề cập đến chức năng cực kì quan trọng này. Vì vậy mình quyết định viết về một chức năng mà chắc chắn rằng trang web nào cũng sẽ cần đến.

- Khi đăng kí tài khoản trên 1 website, việc đầu tiên là bạn sẽ phải vào mail để kích hoạt tài khoản.
- Khi khách hàng đặt hàng trên website của bạn, bạn cần gửi mail xác nhận đến cho khách hàng.
- Khi website có khuyến mãi, quảng cáo qua mail là một phương pháp cực kì đơn giản và hữu dụng.
- ...

Như vậy bạn đã thấy sự thiết thực của của chức năng gửi mail chưa nào? Và ở bài viết này mình sẽ đi vào tìm hiểu 2 nội dung chính, đó là:
- Làm thế nào để có thể xay dựng được chức năng gửi mail?
- Làm thế nào để test xem chức năng gửi mail đã hoạt động đúng hay chưa?

Giờ thì cùng bắt tay vào việc thôi nào!

<div align="center">

# Nội dung
</div>

<div align="center">

## Xây dựng chức năng gửi mail
</div>

- **Bước đầu tiên**, để gửi được email, bạn sẽ phải cài đặt **Guzzle HTTP library** thông qua composer nhé:
    ```
    composer require guzzlehttp/guzzle
    ```
- Sau đó, chúng ta sẽ tạo một command để gọi chức năng gửi mail với câu lệnh:
    ```
    php artisan make:command SendMail
    ```
    ta sẽ thu được file `app\Console\Commands\SendMail` có cấu trúc như sau:
    ```php:app\Console\Commands\SendMail.php
    <?php

    namespace App\Console\Commands;

    use App\Models\User;
    use App\DripEmailer;
    use App\Mail\NewYearMail;
    use Illuminate\Support\Facades\Mail;
    use Illuminate\Console\Command;

    class SendMail extends Command
    {
        /**
         * The name and signature of the console command.
         *
         * @var string
         */
        protected $signature = 'email:newyear {user}';

        /**
         * The console command description.
         *
         * @var string
         */
        protected $description = 'Send Email for user';

        /**
         * Create a new command instance.
         *
         * @return void
         */
        public function __construct()
        {
            parent::__construct();
        }

        /**
         * Execute the console command.
         *
         * @return mixed
         */
        public function handle()
        {
            $user = User::find($this->argument('user'));
            Mail::to($user)->send(new NewYearMail());
        }
    }
    ```
    
- **Bước 2**, chúng ta sử dụng câu lệnh `php artisan make:mail NewYearMail` để tạo class NewYearMail:
    ```php:app\Mail\NewYearMail.php
    <?php

    namespace App\Mail;

    use Illuminate\Bus\Queueable;
    use Illuminate\Mail\Mailable;
    use Illuminate\Queue\SerializesModels;
    use Illuminate\Contracts\Queue\ShouldQueue;

    class NewYearMail extends Mailable
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
            return $this->view('mail.newyear')
                ->attach('/public/images/2020-new-year.png'); //đính kèm ảnh cùng với email
        }
    }
    ```

- **Bước 3**, chúng ta sẽ tạo một blade cho nội dung của email: 
    ```php:resources/views/mail/newyear.blade.php
    @section('styles')
        .md-contents {
            font-size: 1rem;
        }
    @endsection

    @section('content')
        <div class="md-contents">
            <p>
                Xin chào những người anh em thiện lành,
            </p>

            <p> 
                Nhân dịp năm mới Canh Tý 2020, xin chúc anh chị và gia đình sức khoẻ dồi dào,
                làm ăn phát đạt, cuộc sống hạnh phúc!
            </p>
        </div>
    @endsection
    ```

<div align="center">

## Test chức năng gửi mail với Mailtrap
</div>

- Trước hết hãy nói sơ qua về cách thức hoạt động của mailtrap đã nhé: 
    - Bình thường để check được nội dung mail thì bắt buộc phải gửi mail đi thì mới xem được. Nhưng để test chức năng thì bạn sẽ phải vừa sửa-vừa test liên tục dẫn đến việc sẽ bị spam hòm thư.
    - Và Mailtrap giải quyết vấn đề đó bằng cách CÓ tạo mail, CÓ gửi đi nhưng sẽ BỊ GIỮ LẠI giữa đường và lưu trong hộp thư của mailtrap, không đến được người nhận nữa. Như vậy bạn sẽ tránh được tình trạng bị spam hộp thư hoặc sử dụng mail không có thật mà vẫn có thể check được nội dung các email gửi đi.

- Sau khi bạn [đăng kí tài khoản mailtrap](https://mailtrap.io/register/signup?ref=header) thành công, truy cập vào bên trong hòm thư sẽ xuất hiện thông tin cấu hình như ảnh bên dưới. Và ở phần **Integration** thì bạn lựa chọn ngôn ngữ/framework tương ứng nhé. Như mình ở đây thì sẽ lựa chọn `Laravel`

![](https://images.viblo.asia/0aa2c68d-277e-4c2e-86d1-f5403d9e978c.png)

Sau đó copy phần thông tin cấu hình bên dưới (LÀM 1 TRONG 2 thứ thôi nhé) vào: 
- Cấu hình trong .env:
    ```php:.env
    MAIL_DRIVER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=4f248571390ff8
    MAIL_PASSWORD=15be016776c0f8
    MAIL_FROM_ADDRESS=from@example.com
    MAIL_FROM_NAME=Example
    ```

- HOẶC trong config/mail.php
    ```php:config/mail.php
    <?php
    return [
      "driver" => "smtp",
      "host" => "smtp.mailtrap.io",
      "port" => 2525,
      "from" => array(
          "address" => "from@example.com",
          "name" => "Example"
      ),
      "username" => "4f248571390ff8",
      "password" => "15be016776c0f8",
      "sendmail" => "/usr/sbin/sendmail -bs"
    ];
    ```

Cài đặt mailtrap cũng chỉ đơn giản như vậy thôi, giờ thì cùng test thử xem nó đã hoạt động chưa nhé!

Giờ chúng ta sẽ chạy câu lệnh `php artisan email:newyear 1` để gửi email cho user có id=1 và đây là kết quả mình thu được: 
![](https://images.viblo.asia/cbd7f921-faf7-49b0-a5a0-021265328301.jpg)


<div align="center">

# Tổng kết
</div>

Sau bài viết này, hi vọng các bạn đã có thể xay dựng được chức năng gửi email theo đúng ý trong sản phẩm website của mình. Nếu có bất cứ khó khăn gì trong quá trình thực hiện, bạn có thể comment xuống phía dưới hoặc đăng câu hỏi lên viblo để mọi người hỗ trợ nhé!

Cảm ơn các bạn đã theo dõi và hãy ủng hộ mình trong những bài viết tiếp theo nhé!

<div align="center">

# Tài liệu tham khảo
</div>

- Trang chủ: https://mailtrap.io/
- Laracast: https://laracasts.com
- Send mail Laravel: https://blog.mailtrap.io/send-email-in-laravel/
- Mailtrap và Testing: https://viblo.asia/p/mailtrap-va-testing-xQMGJmgNvam