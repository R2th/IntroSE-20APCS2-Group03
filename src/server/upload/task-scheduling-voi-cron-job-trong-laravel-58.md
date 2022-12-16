Câu hỏi đặt ra tại sao chúng ta phải dùng corn job? Đơn giản vì nhiều khi chúng ta cần gửi thông báo hoặc gửi email tự động cho người dùng để cập nhật các property hoặc products. Vì vậy, tại thời điểm đó, bạn có thể xác định một số logic cơ bản cho mỗi ngày, giờ, v.v. có thể chạy và gửi email.
## Tạo Command
Đầu tiên chúng ta cần tạo các lệnh tùy chỉnh. Các lệnh tùy chỉnh sẽ thực thi với các cron job trên task scheduling.

Ở đây mình sẽ ví dụ về việc update trạng thái của chứng thư số. Mỗi ngày sẽ kiểm tra xem những chứng thư nào đã hết hạn và chuyển trang thái cho nó
```php
    php artisan make:command UpdateStatus --command=status:update
```
1 file command được tạo trong file ***app/Console/Commands/StatusUpdate.php***
```php
class StatusUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'status:update';

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
        //
    }
}
```

Phần xử lý việc update chứng thư sẽ được viết vào trong function ***handle()*** như sau

```php
public function handle()
    {
        $certificates = $this->certificate->getData(['user'], ['status' => 0]);

        foreach ($certificates as $cert) {
            if (strtotime($cert->valid_to_time) < strtotime(Carbon::now())) {
                $this->certificate->update($cert->id, ['status' => 1]);
                $cert->delete();
            }
        }
        $this->info('status:update Command Run successfully!');
    }
```

## Đăng ký trên Task Scheduler
Tiếp theo chúng ta cần xác định thời gian để chạy các command trong trong file ***Kernel.php***. 

![](https://images.viblo.asia/b9362d30-76bf-4420-8f36-0b63214e77f3.png)

Ở ví dụ này mình cho chạy vào lúc 0h hằng ngày nên sẽ dùng daily(). 

Vào ***app/Console/Kernel.php*** để cấu hình
```php
class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\StatusUpdate::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('status:update')
                ->daily();
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

Bây giờ corn job bằng lệnh 
```php
php artisan schedule:run
```
Cuối cùng để nó có thể chạy tự động, ta đặt lịch thực hiện cho từng hệ điều hành riêng. Ở đâu mình dùng HĐH Linux nên lệnh sẽ là:
```php
* * * * * php /path/to/artisan schedule:run 1>> /dev/null 2>&1
OR
* * * * * cd /đuong-dan-den-project && php artisan schedule:run >> /dev/null 2>&1
```

**Nguồn tham khảo**

https://itsolutionstuff.com/post/task-scheduling-with-cron-job-in-laravel-58example.html

https://allaravel.com/blog/laravel-task-scheduling-tu-dong-hoa-cong-viec-trong-he-thong-website