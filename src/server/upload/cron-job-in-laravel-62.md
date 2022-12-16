Trong bài viết này, tôi sẽ chỉ cho bạn cách thiết lập cronjob lập lịch tác vụ trong ứng dụng laravel 6.2. chúng ta sẽ tạo lệnh cron job và bạn có thể chạy cron mỗi giây, mỗi phút, mỗi giờ hoặc mỗi ngày. bạn cũng có thể viết logic cơ sở dữ liệu hoặc gửi thông báo email bằng công việc laravel cron job. tôi sẽ đưa ra ví dụ từng bước của hướng dẫn lập lịch tác vụ laravel 6.

Và các bạn cũng muốn thiết lập cron job trên máy mình thì bạn có thể làm theo hướng dẫn dưới đây

**Bước 1: Install Laravel**

Trong bước này, nếu bạn nào chưa tải source laravel về, thì bạn dùng lệnh dưới đây để download

`composer create-project --prefer-dist laravel/laravel laravelCronjob "6.*"`

> Bạn có thể lên trang chủ để xem [tại đây](https://laravel.com/docs/6.x)

**Bước 2: Create Command**

Ở bước này, bạn chạy lệnh dưới để tạo file

`
php artisan make:command DemoCron --command=demo:cron
`

Khi bạn chạy xong, bạn vào thư mục `app/Console/Commands` thì sẽ có file `DemoCron.php`

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DemoCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'demo:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        \Log::info("Cron is working fine!");

        $this->info('Demo:Cron Cummand Run successfully!');
    }
}
```

**Bước 3: Register on Task Scheduler**

Trong bước này, chúng ta cần đăng ký trong file `Kernel.php` 
Bạn mở file `Kernel.php` trong file `app/Console`

```php
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
        Commands\DemoCron::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('demo:cron')
                 ->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
```
Dưới đây là các lịch trình mà bạn có thể dùng, bạn có thể tham khảo trên trang chủ [tại đây](https://laravel.com/docs/6.x/scheduling#schedule-frequency-options)

**Bước 4: Run Scheduler Command For Test**

Trước khi chạy, bạn nên kiểm tra lại xem, cron job đã tồn tại chưa, bạn chạy lệnh này để kiểm tra
```php
php artisan list
```
Nó sẽ hiện ra tất cả các command mà bạn đã đăng ký.

Và bây giờ thì bạn có thể chạy cron job của mình, bằng lệnh dưới đây
```php
php artisan demo:cron
```

Trên đây là các bước để tạo và chạy cron job và đây là cách chạy thủ công dưới local

Khi bạn có một trang web và muốn chạy cron job tự động trên server thì bạn truy cập vào server của mình dùng `sh` truy cập vào máy chủ của mình và dùng lệnh này để kiểm tra 

```shell
crontab -e
```

Lệnh này sẽ mở cron job trên máy chủ và bạn dán lệnh này vào sau đó lưu và thoát

```shell
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

Và bạn đừng quên thay thế đường dẫn đầy đủ của bạn vào.

Bài viết của mình đến đây thôi. Hẹn các bạn vào các bài tiếp theo :kissing_heart::kissing_heart:

Các bạn có thể đọc thêm trên docs của Laravel