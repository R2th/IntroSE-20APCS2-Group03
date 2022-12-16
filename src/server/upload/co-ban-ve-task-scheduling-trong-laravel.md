Trong thực tế khi phát triển các phần mềm, chúng ta gặp rất nhiều các chức năng đòi hỏi hệ thống phải chạy mất nhiều thời gian như gửi mail, đặt lịch nhắc nhở... trong khi những chức năng đó có thể chạy ngầm ở server mà không ảnh hưởng gì đến các thao tác của người dùng trên hệ thống. Và để tối ưu tương tác của người dùng với hệ thống, Laravel đã hỗ trợ tính năng là Task Scheduling cho phép bạn có thể khởi tạo, quản lý các chức năng chạy ngầm ở server. Bây giờ chúng ta sẽ bắt đầu tìm hiểu về Task Scheduling nhé.
## - Tạo mới task
Để tạo mới một task chúng ta sử dụng lệnh artisan của Laravel: 
```
php artisan make:command SendDailyMail
```
Sau khi chạy lệnh,  trong thư mục `app/Console/Commands` sẽ sinh ra một file `SendDailyMail.php` và có nội dung như sau: 
```
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendDailyMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send_daily_mail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Daily Mail';

    public function __construct(
    ) {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

    }
}

```
Trong đó, `signature` là tên hoặc mã định danh của lệnh và mô tả giúp cung cấp thêm thông tin về lệnh, 
`description` mô tả chức năng của task và việc xử lý logic của task sẽ được viết trong hàm `handle()`.
## - Khai báo task 
Laravel tạo sẵn một file `Kernel.php` trong thư mục `app/Console`:
```
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\SendDailyMail::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('send_daily_mail')
            ->everyday();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}

```
Ở đây, chúng ta sẽ sử dụng lệnh đã định nghĩa ở biến `signature` để khai báo task và để định nghĩa thời gian cho từng task, Laravel hỗ trợ chúng ta rất nhiều hàm như `everyDay()`, `everyMinute()...` Và đây chính là điểm vượt trội của Task Scheduling so với cronjob thuần túy. Chúng ta có thể quản lý nhiều task bằng việc khai báo các lệnh vào trong hàm `schedule`, mỗi lệnh tương ứng với một task. Còn với cronjob thuần túy, chúng ta phải kết nối vào server và khai báo từng điều kiện cho công việc bạn muốn.
## Thiết lập task trên server
Cuối cùng để cho task có thể chạy trên server theo đúng thời gian, chúng ta connect vào server bằng `ssh` và gõ `crontab -e` và thêm lệnh `* * * * * php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1`. Trong đó `* * * * *` là thời gian chúng ta định nghĩa ([Thiết lập thời gian trong cronjob](https://crontab.guru/)) để  cronjob chạy , `php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1` câu lệnh khai báo chạy các task được định nghĩa trong file `Kernel.php`.

Trên là những kiến thức cơ bản để thiết lập và sử dụng Task Scheduling của Laravel. Hy vọng giúp ích được cho các bạn.

Tài Liệu Tham Khảo: 
[Task Scheduling Laravel](https://laravel.com/docs/5.8/scheduling)