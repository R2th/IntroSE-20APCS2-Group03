Bạn là một người tốt, bạn đồng cảm với các hoàn cảnh khó khăn. Và rồi một ngày đẹp trời một cô bạn dễ thương tới bên bạn, thì thầm vào tai bạn "*Ê!!! Cho mình vay 5 củ, mình có việc gấp. Ngày cuối tuần mình trả nhé*". Và chuyện gì đến cũng sẽ đến, 1 tuần trôi qua, 2 tuần trôi qua, nửa năm trồi qua. Bạn vẫn chỉ nhận đươc một câu trả lời quen thuộc. "*Vài hôm nữa mình trả nhé*". 

![](https://images.viblo.asia/716703ca-3990-439a-898f-f6c3c4662a79.jpg)

Đừng lo lắng. Có một cách tuyệt vời. Hãy cùng Laravel đòi nợ một cách văn minh nào. Cứ 0h sáng mỗi ngày. Hãy gửi cho ***Con Nợ*** của bạn 100 tin nhắn hoặc có thể nhiều hơn nhắc nhở về món nợ.  Vậy vào những hôm bạn bận, hoặc bạn ngủ sớm, thì phải làm sao. Chẳng nhẽ cứ phải đợi tới đúng 0h để gửi thì có vẻ hơi cực nhọc. Chúng ta sẽ hẹn giờ để gửi tin nhắn và Queue Job trong laravel sẽ giúp chúng ta giải quyết vấn đề này.

Ngoài ra chúng ta có thể sử dụng *cron job* để lập lịch cho việc gửi mai nhưng bài viết này mình chỉ chia sẻ đơn giản việc thực hiện gửi mail sử dụng hàng đợi. Bài viết tiếp theo mình sẽ chia sẻ về lập lịch cho các công việc***Task Scheduling - Laravel*** .
# Queue là gì?

Hàng đợi - Queue : là danh sách các Job cần làm được quản lý theo thứ tự. Laravel Queue driver được sử dụng để quản lý các job như thêm job vào hàng đợi, lấy job ra khỏi hàng đợi. Laravel có thể làm việc với nhiều các driver khác nhau như database, Redis, Amazon SQS…

Hàng đợi cho phép bạn trì hoãn một công việc mất nhiều thời gian đến một thời điểm nào nó mới xử lý.


Để hiểu hơn về phương pháp gửi email, tạo job và đẩy job vào hàng đợi. Chúng ta cùng nhau xây dựng chức năng đòi nợ văn minh này nhé!!!!
# Xây dựng chức năng gửi mail
![](https://images.viblo.asia/74ce479d-deb7-4951-a789-9950f6d25a96.png)
## 1 - Cấu hình Mail
Để mail hoạt động, chung ta có thể cấu hình cho nó trong file **.env** hoặc  nếu không thì có thể cài đặt trong **config/mail.php** với tài khoản email như sau:

*Email*: minhtu210894@gmail.com

*Password*: qehdergfjebmiksr
*  Cấu hình trong **config/mail.php**
```php
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

    'driver' => 'smtp',

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

    'host' => 'smtp.gmail.com',

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

    'port' => 587,

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
        'address' => 'minhtu210894@gmail.com',
        'name' => 'MinhTu',
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

    'encryption' => 'tls',

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

    'username' => 'minhtu210894@gmail.com',

    'password' => 'qehdergfjebmiksr',

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
*  Cấu hình trong **.env**
```php
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=minhtu210894@gmail.com
MAIL_PASSWORD=qehdergfjebmiksr
MAIL_ENCRYPTION=tls
```
## 2 - Cấu hình queue
Trong Laravel, muốn làm việc với queue, ta phải phân biệt được hai từ khóa quan trọng.
* "*queue*" là priority - mức độ ưu tiên thực thi các jobs. Có thể nhận 2 giá trị "high" hoặc "default". 

**Ví dụ:**
Chúng ta có 2 jobs, một cái có "queue" là "high", một cái có "queue" là "default". Chúng cùng được thiết lập thực thi vào "07:00:00 12/11/2017".
Khi chạy lệnh "php artisan queue:listen queue=high,default", đến đúng thời điểm, job có "queue" là "high" sẽ được ưu tiên thự thi trước.

* "*connection*" là driver - loại kết nối sẽ sử dụng. Một số driver được Laravel hỗ trợ: sync, database, redis, sqs,...

-Với ứng dụng nhỏ, chúng ta có thể tạm thời "bỏ qua" thông số "queue" và chỉ quan tâm đến "*connection*".

-Tương tự như nhiều components khác, khi muốn sử dụng queue, chúng ta cần quan tâm đến driver và các cấu hình liên quan.

-Mặc định, một project Laravel sẽ sử dụng driver sync " 'default' => env('QUEUE_CONNECTION', 'sync') ", nghĩa là các job sẽ được thự thi ngay lập tức.

-Do vậy, để trì hoãn được một job, sử dụng driver 'database' là dễ dàng và thuận tiện hơn khi mới bắt đầu.

Chúng ta có thể cấu hình queue trong file **.env** hoặc trong **config/queue.php**
1. Cấu hình trong file **.env**
```php
QUEUE_CONNECTION=database
```
2. Cấu hình trong **config/queue.php**
```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Queue Connection Name
    |--------------------------------------------------------------------------
    |
    | Laravel's queue API supports an assortment of back-ends via a single
    | API, giving you convenient access to each back-end using the same
    | syntax for every one. Here you may define a default connection.
    |
    */

    'default' => 'database',

    /*
    |--------------------------------------------------------------------------
    | Queue Connections
    |--------------------------------------------------------------------------
    |
    | Here you may configure the connection information for each server that
    | is used by your application. A default configuration has been added
    | for each back-end shipped with Laravel. You are free to add more.
    |
    | Drivers: "sync", "database", "beanstalkd", "sqs", "redis", "null"
    |
    */

    'connections' => [

        'sync' => [
            'driver' => 'sync',
        ],

        'database' => [
            'driver' => 'database',
            'table' => 'job',
            'queue' => 'default',
            'retry_after' => 90,
        ],

        'beanstalkd' => [
            'driver' => 'beanstalkd',
            'host' => 'localhost',
            'queue' => 'default',
            'retry_after' => 90,
        ],

        'sqs' => [
            'driver' => 'sqs',
            'key' => env('SQS_KEY', 'your-public-key'),
            'secret' => env('SQS_SECRET', 'your-secret-key'),
            'prefix' => env('SQS_PREFIX', 'https://sqs.us-east-1.amazonaws.com/your-account-id'),
            'queue' => env('SQS_QUEUE', 'your-queue-name'),
            'region' => env('SQS_REGION', 'us-east-1'),
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
            'queue' => 'default',
            'retry_after' => 90,
            'block_for' => null,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Failed Queue Jobs
    |--------------------------------------------------------------------------
    |
    | These options configure the behavior of failed queue job logging so you
    | can control which database and table are used to store the jobs that
    | have failed. You may change them to any database / table you wish.
    |
    */

    'failed' => [
        'database' => env('DB_CONNECTION', 'mysql'),
        'table' => 'failed_jobs',
    ],
];
```
## 3 - Tạo queue
Chúng ta sẽ tạo queue table. Câu lệnh sau đây sẽ tạo ra 1 file migration cho bảng jobs.
```bash
php artisan queue:table
```
Sau đó chúng ta thực hiện chạy migrate. để hiểu hơn về migrate thì có thể tham khảo [Tại đây](https://viblo.asia/p/migration-trong-laravel-va-nhung-dieu-can-biet-6J3ZgO3AZmB)
```bash
php artisan migrate
```
## 4 - Tạo job
Chúng ta sẽ tạo job cho việc thực hiện gửi email với tên job : **SendMailForDues**
```bash
php artisan make:job SendMailForDues
```
Câu lệnh trên sẽ tạo ra file **SendMailForDues.php** trong thư mục **app/jobs** . Chúng ta sẽ cùng thiết lập việc gửi mail trong **SendMailForDues.php** 
```php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Mail;

class SendMailForDues implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $data;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::send('emails.send_mail_for_dues', [
            'name' => $this->data['name'],
            'content' => $this->data['content'],
        ], function ($msg) {
            $msg->to($this->data['email'], 'Đòi Nợ')->subject('DoiNo2019');
        });
    }
}

```
## 5 - Tạo route
```php
 Route::get('/send-mail', 'SendEmailController@getSendEmail')->name('getSendEmail');
 
 Route::post('/send-mail', 'SendEmailController@postSendEmail')->name('postSendEmail');
```
## 6 - Xây dựng giao diện nhập thông tin con nợ nhé.
Chúng ta sẽ nhập dữ liệu đầu vào là:
* Tên con nợ
* Email của con nợ
* Hẹn giờ delay (Email sẽ được gửi đi sau bao nhiêu giờ, giả sử bây giờ là 9h, muốn gửi mail vào lúc 11 giờ. thì sẽ hẹn là 2).
* Số lượng tin nhắn cần gửi đi.
* Nội dung gửi
```html
{{ Form::open(['url' => route('postSendEmail'), 'method' => 'POST', 'class' => 'form-horizontal form-label-left']) }}
<div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
    <div class="jp_cp_right_side_wrapper">
        <div class="jp_cp_right_side_inner_wrapper">
            <h2>{{ __('Dòi Nợ Phong Cách Developer 2019') }}</h2>
            <table>
                <tbody>
                <tr>
                    <td class="td-w25">{{ __('Tên Con Nợ') }}</td>
                    <td class="td-w10">:</td>
                    <td class="td-w65">
                        {{ Form::text('name', null, ['class' => 'form-control', 'maxlength' => 100]) }}
                    </td>
                </tr>
                <tr>
                    <td class="td-w25">{{ __('Email Của Con Nợ') }}</td>
                    <td class="td-w10">:</td>
                    <td class="td-w65">
                        {{ Form::text('email', null, ['class' => 'form-control', 'maxlength' => 100]) }}
                    </td>
                </tr>
                <tr>
                    <td class="td-w25">{{ __('Gửi Đi Sau Bao Nhiêu Giờ') }}</td>
                    <td class="td-w10">:</td>
                    <td class="td-w65">
                        {{ Form::text('time', null, ['class' => 'form-control', 'maxlength' => 100]) }}
                    </td>
                </tr>
                <tr>
                    <td class="td-w25">{{ __('Số Lượng Tin Gửi Đi') }}</td>
                    <td class="td-w10">:</td>
                    <td class="td-w65">
                        {{ Form::text('amount', null, ['class' => 'form-control', 'maxlength' => 100]) }}
                    </td>
                </tr>
                <tr>
                    <td class="td-w25">{{ __('Nội Dung Dằn Mặt') }}</td>
                    <td class="td-w10">:</td>
                    <td class="td-w65">
                        {{ Form::text('content', null, ['class' => 'form-control', 'maxlength' => 100]) }}
                    </td>
                </tr>
            </table>
        </div>
        <div class="form-group">
            <div class="col-md-12 col-sm-6 col-xs-12 col-md-offset-3">
                {{ Form::button(__('Đòi Nợ Start'), ['type' => 'submit', 'name' => 'submit_save', 'class' => 'btn btn-success'] ) }}
            </div>
        </div>
</div>
{{ Form::close() }}
```
## 7 - Tạo controller gửi mail
Chúng ta sẽ đẩy job **SendMailForDues** vào hàng đợi bằng **dispatch** vs dữ liệu truyền vào là **$request->all()**. và set thời gian thực hiện job đó. Ở đây mình sẽ set thời gian delay cho job.
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendMailForDues;

class SendEmailController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getSendEmail()
    {
        return view('clients.send_mail_doi_no.doi_no');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function postSendEmail(Request $request)
    {
    //chuyển thời gian về giây.
        $time = $request->time * 60 * 60;
        for ($i = 0; $i < $request->amount; $i++) {
            dispatch(new SendMailForDues($request->all()))->delay(now()->addSeconds($time));
        }
    }
}

```
Trong trường hợp nếu chung ta không cấu hình queue trong .env hoặc trong config. Thì có thể thưc hiện trực tiếp như sau.
```
dispatch(new SendMailForDues($request->all()))->onConnection('database')->delay(now()->addSeconds($time));
```
## 9 - Tạo thông tin mail mẫu.
Tạo thư mẫu trong thư mục **view/emails/send_mail_for_dues.blade.php**
```html
 Hi, <b>{{ $name }}</b>
    <p>
        Chúc <b>{{ $name }}</b> một ngày tốt lành!
    </p>
    <p>
        Cầu xin tổ tiên độ trì cho<b>{{ $name }}</b> có sức khỏe để sống tốt, kiếm tiền để trả nợ!
    </p>
     <p>
         {{ $content }}
     </p>
    <p>
        Ở hiền gặp lành nhé <b>{{ $name }}</b>!!!
    </p>

```
## 10 - Thực hiện queue.
Laravel có một queue worker để thực thi các job đang có trong hàng đợi, bạn có thể chạy worker này bằng câu lệnh artisan:
```
php artisan queue:work
```
Hoặc
```
php artisan queue:listen connection
```
Hoặc 
```
php artisan queue:listen
```
Vậy là cứ 0h đêm mỗi ngày hàng loạt các lời nhắn thân thương sẽ được gửi tới con nợ của mình.Chả mấy mà sẽ đòi được nợ
# Kết luận
Một câu chuyện vui về việc đòi nợ bằng việc gửi mail với việc sử dụng queue hi vọng sẽ mang lại sự thỏa mái cho mọi người, kèm vào đó chúng ta có thể có những kiến thức nhất định về gửi mail , và queue, job trong Laravel. Mong mọi người có thể áp dụng cho các công việc khác của mình. Bên cạnh những phút giây thư giãn với kiến thức về Laravel.

Bài viết có thể sẽ có nhiều sai sót, mong nhận được sự góp ý từ mọi người :kissing_closed_eyes::kissing_closed_eyes::kissing_closed_eyes:

# Tài liệu tham khảo

[https://allaravel.com/laravel-tutorials/laravel-queue-xu-ly-cong-viec-kieu-hang-doi/](https://allaravel.com/laravel-tutorials/laravel-queue-xu-ly-cong-viec-kieu-hang-doi/)

[https://laravel.com/docs/5.6/queues](https://laravel.com/docs/5.6/queues)