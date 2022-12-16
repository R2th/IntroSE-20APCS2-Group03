# Laravel Cron Job
Laravel Cron Job là một trình quản lý tác vụ sẵn có, cung cấp cho ứng dụng của bạn có khả năng thực thi các lệnh cụ thể như gửi thông mail hoặc xóa người dùng không hoạt động tại một thời điểm nhất định (do chúng ta thiết lập). Trong bài viết này mình sẽ hướng dẫn các bạn cách làm thế nào để sử dụng cron job.
# Ví dụ
Hãy tưởng tượng trong DB chúng ta có 1 bảng sản phẩm `products` bây giờ chúng ta muốn cứ 12h đêm những sản phẩm nào có ngày sản xuất (`mfg_date`) là hôm nay thì sẽ chuyển status về hết hạn `2`:
- status (1: còn thời hạn ,2: hết hạn sử dụng)
- products(id, name, price, mfg_date,exp_date, status)
# Tạo Scheduling Artisan Commands
Việc đầu tiên là chúng ta sẽ di tạo command bằng cách sử dụng artisan như dưới đây:
```
php artisan make:command ProductCommand
```
Sau khi thực hiện xong lệnh trên thì trong project ở thử mục  `app/Console/Commands` sẽ sinh ra 1 file ProductCommand.php như sau:
```
<?php
 
namespace App\Console\Commands;
 
use Illuminate\Console\Command;

 
class ProductCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';
 
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
Mình sẽ giải thích một tí về ý nghĩa của các biến hàm file trên như sau:
```
protected $signature = 'command:name';
``` 
Biến này dùng để chúng ta đặt tên/ định danh cho command, như ví dụ trên thì chúng ta sẽ đặt tên như sau:
```
protected $signature = 'product:status';
```
```
protected $description = '';
```
Còn biến trên dùng mô tả cho command, VD:
```
protected $description = 'Update product status';
```
```
public function handle()
```
Còn đây là hàm mà chúng ta sẽ định nghĩa cho command này sẽ phải làm gì, như ví dụ trên chúng ta sẽ update cho các product có ngày hết hạn `mfg_date` là hôm nay `satus` là 2 (`hết hạn sử dụng`).

```
public function handle()
    {
        Contract::whereDate('exp_date', Carbon::now())->update(['status' => ProductStatus::EXPIRE]);
    }
```

Sau cùng  `ProductCommand.php` sẽ trông như thế này:

```
<?php
namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Product;
use App\Enums\ProductStatus;
use Illuminate\Console\Command;

class ProductCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'product:status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Product Status';

    /**
     * Create a new command instance.
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
        Contract::whereDate('exp_date', Carbon::now())->update(['status' => ProductStatus::EXPIRE]);
    }
}
```
# Registering the Command
Sau khi đã tạo xong Command bây giờ chúng ta phải đăng kí để cho Laravel hiểu, để làm được điều này chúng ta sẽ đăng kí `ProductCommand` trong file `app/Console/Kernel.php` như sau: 
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
        Commands\ProductCommand::class,
    ];
 
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('product:status')->daily();
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
# Starting the Laravel Scheduler

Vậy là đã đăng kí xong bây giờ chúng ta sẽ cần thêm 1 bước cuối cùng nữa để chạy Cron Job tự động như schedule chúng ta đã thiết lập, các bạn vào terminal của dự án gõ `crontab -e`

```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
sau đó save lại. 

# Tổng kết
Trên đây là bài hướng dẫn cách sử dụng Task Scheduler trong Laravel, ngoài ra các bạn có thểm tìm hiểu thêm một số hàm hữu ích trong việc thiết lập thời gian ở đây https://laravel.com/docs/5.8/scheduling#schedule-frequency-options

# Tham khảo
- https://laravel.com/docs/5.8/scheduling
- https://tutsforweb.com/how-to-set-up-task-scheduling-cron-job-in-laravel/