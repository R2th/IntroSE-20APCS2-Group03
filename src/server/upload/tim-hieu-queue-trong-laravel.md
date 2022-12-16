### Laravel Queue là gì?

Một hàng đợi (queue) là một danh sách những việc cần làm (job) được quản lý theo thứ tự. Khi chúng ta muốn thêm một công việc (job) vào hàng đợi, job phải implement interface Illuminate\Contracts\Queue\ShouldQueue.

Laravel Queue driver được sử dụng để quản lý các job như thêm job vào hàng đợi, lấy job ra khỏi hàng đợi. Laravel có thể làm việc với nhiều các driver khác nhau như database, Redis, Amazon SQS… 

Hàng đợi cho phép bạn trì hoãn một công việc mất nhiều thời gian đến một thời điểm nào nó mới xử lý. Laravel cung cấp một API thống nhất cho rất nhiều các hàng đợi ở backend khác nhau. Để hiểu nhanh các khái niệm mới chúng ta hãy bắt đầu bằng ví dụ: Bạn hãy tưởng tượng website của bạn có nhiều người vào xem và có thể đăng ký tài khoản, người đó đang ở trang đăng ký và nhập các thông tin vào form đăng ký. Khi đó chúng ta muốn thực hiện các công việc sau:

1. Kiểm tra thông tin nhập
1. Gửi một email
    
###     Một số thiết lập cho queue.

Thực hiện tạo một job mới bằng câu lệnh:
```

> php artisan make:job SendEmailJob

```

```
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMailable;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        // function khởi tạo
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to('mail@appdividend.com')->send(new SendMailable());
    }
}
```


Trong file gửi job mới được tạo ra từ EmailController. Code  chức năng sẽ như sau.

```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendEmailJob;

class EmailController extends Controller
{
    public function sendEmail()
    {
        dispatch(new SendEmailJob());

        echo 'email sent';
    }
}
```

```

public function sendEmail()
{
   $emailJob = (new SendEmailJob())->delay(Carbon::now()->addSeconds(3));
   dispatch($emailJob);

   echo 'email sent';
}

```

Mở terminal và gõ lệnh sau để start queue
```
php artisan queue:work
```

trong terminal. Nó sẽ hiển thị ra như sau, các queue job chạy lần lượt  

```
[2017-12-21 13:58:14] Processing: App\Jobs\SendEmailJob
[2017-12-21 13:58:19] Processed:  App\Jobs\SendEmailJob
```

kiểm tra trong mailtrap, bạn sẽ nhìn thấy email đã được gửi.

![](https://images.viblo.asia/659c25a0-a5e0-41f4-88fa-ed811c561110.png)


Chúng ta có thể tạo ra bao nhiêu job nếu chúng ta muốn nhưng phải đảm bảo queue đang hoạt động và tất cả config là chính xác. 

### Thiết lập thời gian timeout của job trong queue

Bạn có thể thiết lập thời gian timeout của các job bằng cách sử dụng câu lệnh artisan
```

php artisan queue:work --timeout=60
```

hoặc thiết lập trong thuộc tính $timeout của từng job
```

<?php
namespace App\Jobs;

class SendWelcome implements ShouldQueue
{
    /**
     * Số giây job có thể chạy trước khi timeout
     *
     * @var int
     */
    public $timeout = 60;
}
```

Queue worker, thực thi các job trong queue

Laravel có một queue worker để thực thi các job đang có trong hàng đợi, bạn có thể chạy worker này bằng câu lệnh artisan:

```
php artisan queue:work
```

Chú ý, câu lệnh này khi đã thực hiện sẽ chạy cho đến khi đóng cửa sổ dòng lệnh hoặc dừng nó bằng một câu lệnh. Queue worker là các tiến trình có thời gian sống dài do đó nó sẽ không cập nhật code khi có thay đổi, khi bạn thay đổi code chương trình, bạn cần khởi động lại queue worker bằng câu lệnh

```
php artisan queue:restart
```

Thiết lập thời gian nghỉ giữa các lần xử lý job

Các job trong hàng đợi được xử lý liên tục mà không có sự dừng lại nào, tùy chọn sleep sẽ xác định worker dừng lại sau bao lâu trước khi tiếp tục xử lý job tiếp theo:

```
php artisan queue:work --sleep=3
```

Sử dụng Supervisor giám sát xử lý hàng đợi trên Linux

Supervisor là một chương trình giám sát các xử lý trong hệ điều hành Linux, nó sẽ tự động khởi động lại xử lý queue:work nếu bị lỗi. Để cài đặt supervisor trên CentOS trước hết phải cài đặt python

```
$ yum install python-setuptools
$ easy_install supervisor
```

### Cài đặt supervisor trên Ubuntu

```
#sudo apt-get install supervisor
```

Supervisor có file cấu hình nằm trong thư mục /etc/supervisor/conf.d, trong này bạn có thể tạo nhiều file để bắt supervisor giám sát các xử lý.  Tạo file mail-worker.conf để giám sát cho queue:worker với nội dung

```
[program:mail-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/forge/app.com/artisan queue:work sqs --sleep=3 --tries=4
autostart=true
autorestart=true
user=forge
numprocs=6
redirect_stderr=true
stdout_logfile=/home/forge/app.com/worker.log
```

numprocs = 6 tức là Supervisor sẽ chạy 6 xử lý queue:work cùng lúc và tự động khởi động lại queue:work khi gặp lỗi. 
Sau khi thiết lập cấu hình Supervisor xong, bạn phải cập nhật cấu hình và chạy các xử lý bằng các câu lệnh như sau:

```

$supervisorctl reread
$supervisorctl update
$supervisorctl start laravel-worker:*

```


Ref . 

https://laravel.com/docs/5.6/queues

https://appdividend.com/2017/12/21/laravel-queues-tutorial-example-scratch/

http://supervisord.org/

https://allaravel.com/laravel-tutorials/laravel-queue-xu-ly-cong-viec-kieu-hang-doi/