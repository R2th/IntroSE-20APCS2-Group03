### Tạo cron job trong Laravel

Trong thực tế khi triển khai dự án, bạn có thể phải thực hiện những tác vụ lặp đi lặp lại vào 1 thời điểm nhất định, ví dụ như gửi mail hay backup dữ liệu hệ thống ….

Laravel cung cấp một bộ lệnh đặt lịch với một cách thức đơn giản để thực hiện điều này, đó là cron job. Tất cả các tác vụ cần thực hiện sẽ được đặt trong method schedule của class app/Console/Kernel.php.

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
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        $schedule->command('inspire')
            ->everyFiveMinutes()
            ->appendOutputTo('C:\inspire.txt');
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
```

Câu lệnh artisan inspire là câu lệnh hiển thị ngẫu nhiên một câu danh ngôn, Taylor Otwell khá dị nhân khi có những câu lệnh kiểu này.

Bạn mở command line với thư mục hiện hành là thư mục gốc của dự án và thử câu lệnh php artisan inspire:


```
php artisan make:console DemoCron --command=demo:cron

app/Console/Commands/DemoCron.php
```


```

namespace App\Console\Commands;
use Illuminate\Console\Command;
use DB;
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
        DB::table('items')->insert(['name'=>'hello new']);
        $this->info('Demo:Cron Cummand Run successfully!');
    }
}
```


app/Console/Kernel.php

```

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
        Commands\Inspire::class,
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
        $schedule->command('inspire')
                 ->hourly();
        $schedule->command('demo:cron')
                 ->everyMinute();
    }
}
```

Một số các tùy chọn tần suất trong lịch thực hiện

Demo Code

```
Method	Description
->cron('* * * * *');	Run the task on a custom Cron schedule
->everyMinute();	Run the task every minute
->everyFiveMinutes();	Run the task every five minutes
->everyTenMinutes();	Run the task every ten minutes
->everyFifteenMinutes();	Run the task every fifteen minutes
................................
```

```
Below is a list of the additional schedule constraints:

Method	Description
->weekdays();	Limit the task to weekdays
->sundays();	Limit the task to Sunday
->mondays();	Limit the task to Monday
->tuesdays();	Limit the task to Tuesday
->wednesdays();	Limit the task to Wednesday
->thursdays();	
```



> php artisan demo:cron


Màn hình sẽ hiển thị ra như sau.

Demo:Cron Cummand Run successfully!

Now i added cron scheduling on every minute, you can check in your "" file fucntion like:

Bây giờ ta sẽ tạo thêm lịch vào mỗi phút. bạn có thể kiểm tra trong file app/Console/Kernel.php. hàm schedule()

> php /path/to/artisan schedule:run 1>> /dev/null 2>&1



### Ngăn chặn thực hiện công việc chồng chéo

Ngăn chặn thực hiện công việc chồng chéo
Khi thực hiện các công việc bằng lịch tự động, rất có thể một công việc trước đó chưa hoàn thành, ví dụ bạn thực hiện tự động tổng hợp số liệu 5 phút một lần, tuy nhiên lần tổng hợp trước đó do dữ liệu quá lớn vẫn chưa có kết quả, như vậy bạn không muốn thực hiện tiếp lần tổng hợp tiếp theo sau 5 phút. Với việc sử dụng phương thức withoutOverlapping, Laravel sẽ bỏ qua lịch thực hiện nếu công việc trước đó chưa hoàn thành.

> $schedule->command('report:summary')->withoutOverlapping();

Tại sao Laravel có thể làm được việc này, nó sử dụng mutex là một khái niệm trong lập trình để giải quyết vấn đề liên quan đến xử lý đa luồng. Mutex sử dụng một cờ chung, nó hoạt động giống như người gác cổng, cho phép một luồng có thể truy nhập trong khi những luồng khác bị chặn. Nó đảm bảo rằng các mã được kiểm soát sẽ chỉ được chạy bởi một luồng đơn tại một thời điểm.

Laravel tạo ra một mutex khi bắt đầu thực hiện một công việc và mỗi lần thực thi nó sẽ kiểm tra nếu mutex tồn tại, công việc đó sẽ không được thực hiện. Bạn có thể xem cách mutex hoạt động trong phương thức withoutOverlapping trong class 
Illuminate/Console/Scheduling/Event.php:

```

    public function withoutOverlapping()
    {
        $this->withoutOverlapping = true;

        return $this->then(function () {
            $this->mutex->forget($this);
        })->skip(function () {
            return $this->mutex->exists($this);
        });
    }
    
    
```
Laravel tạo ra một phương thức callback để lọc và thông báo với Schedule Manager bỏ qua công việc nếu một mutex vẫn đang tồn tại, nó cũng tạo ra một callback để xóa mutex sau khi công việc hoàn thành. Trước khi thực hiện công việc, Laravel thực hiện kiểm tra trong phương thức run của Illuminate/Console/Scheduling/Event:

```

    public function run(Container $container)
    {
        if ($this->withoutOverlapping &&
            ! $this->mutex->create($this)) {
            return;
        }

        $this->runInBackground
                    ? $this->runCommandInBackground($container)
                    : $this->runCommandInForeground($container);
    }
    
```
Trong khi một đối tượng được tạo từ Illuminate\Console\Scheduling\Schedule, trong phương thức khởi tạo của Schedule, Laravel sẽ kiểm tra nếu một thực thi của interface Illuminate\Console\Scheduling\Mutex được gắn vào container không, nếu có nó sẽ sử dụng đối tượng này, nếu không nó sử dụng một đối tượng từ class 

Illuminate\Console\Scheduling\CacheMutex:
```

    public function __construct()
    {
        $container = Container::getInstance();

        $this->mutex = $container->bound(Mutex::class)
                                ? $container->make(Mutex::class)
                                : $container->make(CacheMutex::class);
    }
    
```
Khi đó Schedule Manager sẽ đăng ký các sự kiện này và truyền vào một instance của mutex:

$this->events[] = new Event($this->mutex, $command);
Laravel mặc định sử dụng mutex có sử dụng bộ đệm, bạn có thể sử dụng phương pháp khác. Class CacheMutex chứa 3 phương thức đơn giản sử dụng các event name như là key:
```

<?php

namespace Illuminate\Console\Scheduling;

use Illuminate\Contracts\Cache\Repository as Cache;

class CacheMutex implements Mutex
{
    /**
     * The cache repository implementation.
     *
     * @var \Illuminate\Contracts\Cache\Repository
     */
    public $cache;

    /**
     * Create a new overlapping strategy.
     *
     * @param  \Illuminate\Contracts\Cache\Repository  $cache
     * @return void
     */
    public function __construct(Cache $cache)
    {
        $this->cache = $cache;
    }

    /**
     * Attempt to obtain a mutex for the given event.
     *
     * @param  \Illuminate\Console\Scheduling\Event  $event
     * @return bool
     */
    public function create(Event $event)
    {
        return $this->cache->add($event->mutexName(), true, 1440);
    }

    /**
     * Determine if a mutex exists for the given event.
     *
     * @param  \Illuminate\Console\Scheduling\Event  $event
     * @return bool
     */
    public function exists(Event $event)
    {
        return $this->cache->has($event->mutexName());
    }

    /**
     * Clear the mutex for the given event.
     *
     * @param  \Illuminate\Console\Scheduling\Event  $event
     * @return void
     */
    public function forget(Event $event)
    {
        $this->cache->forget($event->mutexName());
    }
}
```

Như ở trên đã nói, Schedule Manager có một callback để xóa mutex liên quan sau khi công việc hoàn thành, với một công việc chạy một lệnh của hệ điều hành, có thể không đảm bảo rằng mutex được xóa nhưng với callback, script có thể dừng trong khi thực thi callback để ngăn chặn một fallback được thêm vào Illuminate\Console\Scheduling\CallbackEvent::run()

```

    public function run(Container $container)
    {
        if ($this->description && $this->withoutOverlapping &&
            ! $this->mutex->create($this)) {
            return;
        }

        register_shutdown_function(function () {
            $this->removeMutex();
        });

        try {
            $response = $container->call($this->callback, $this->parameters);
        } finally {
            $this->removeMutex();
        }

        parent::callAfterCallbacks($container);

        return $response;
    }
```
        
### Task Hook

Hook là những phương thức được thực hiện trong một thời điểm nào đó của vòng đời một đối tượng, ở đây đối tượng chính là các công việc được thực hiện theo lịch. Laravel cho phép bạn có thể thực hiện một số các công việc trước hoặc sau khi một lịch thực hiện công việc được bắt đầu hoặc kết thúc thông qua các phương thức before(), after():

```

$schedule->command('emails:send')
         ->daily()
         ->before(function () {
             // Task is about to start...
         })
         ->after(function () {
             // Task is complete...
         });
         
```
Ngoài ra Laravel có các phương thức pingBefore, thenPing để có thể thực hiện ping một URL một cách tự động trước hoặc sau khi một nhiệm vụ được hoàn thành. Phương thức này là cực kỳ hữu ích để thông báo cho một dịch vụ ở ngoài.

```
$schedule->command('emails:send')
         ->daily()
         ->pingBefore($url)
         ->thenPing($url);
         
```



### Xuất dữ liệu khi chạy lịch thực hiện công việc

Laravel cung cấp rất nhiều phương thức hỗ trợ xuất dữ liệu đầu ra khi thực hiện các công việc:

Phương thức sendOutputTo xuất dữ liệu ra một file trong một thư mục:

```
$schedule->exec('ipconfig')
         ->daily()
         ->sendOutputTo($filePath);
         
```
Nếu bạn muốn ghi tiếp một file, sử dụng phương thức appendOutputTo:

```
$schedule->exec('ipconfig')
         ->daily()
         ->appendOutputTo($filePath);
         
```
Bạn cũng có thể gửi email các dữ liệu đầu ra khi thực hiện một công việc theo lịch với phương thức emailOutputTo, trước khi định nghĩa lịch thực hiện này bạn cần thiết lập Laravel Mail:

```
$schedule->exec('ipconfig')
         ->daily()
         ->appendOutputTo($filePath)
         ->emailOutputTo('admin@allaravel.com');
```

 ### Chế độ bảo trì hệ thống

Nếu bạn chuyển hệ thống sang chế độ bảo trì trong Laravel, toàn bộ các lịch thực hiện tự động thông thường sẽ không hoạt động, nếu bạn muốn một lịch tự động thực hiện ngay cả khi hệ thống được chuyển sang chế độ bảo trì, bạn có thể sử dụng phương thức evenInMaintenanceMode() khi định nghĩa lịch thực hiện.


Tài liệu tham khảo


https://itsolutionstuff.com/post/example-of-cron-job-in-laravel-5example.html

https://allaravel.com/laravel-tutorials/laravel-task-scheduling-tu-dong-hoa-cong-viec-trong-he-thong-website/

https://laravel.com/docs/5.6/scheduling