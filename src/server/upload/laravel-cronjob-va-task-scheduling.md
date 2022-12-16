### 1. Mở đầu
Trong hướng dẫn này, tôi sẽ hướng dẫn các bạn cách thiết lập **Task Scheduling** trong Laravel 6. Cron này sẽ gọi lệnh Schduler mỗi phút. Khi câu lệnh `schedule:run` được thực thi, Laravel sẽ thực hiện các tác vụ theo lịch trình của bạn.
### 2. Task Schedule với Cronjob
Để thực hiện được thì chúng ta phải thêm một số trường mới vào bảng `users` trong cơ sở dữ liệu.
#### 2.1. Thiết lập bảng
Hãy tới file migration của bảng `users` và thêm đoạn code dưới đây vào `function up()`
```php
Schema::create('users', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->string('role')->default('user');
    $table->tinyInteger('active')->default(1);
    $table->timestamp('last_login')->nullable();
    $table->rememberToken();
    $table->timestamps();
```
Sau khi thêm đoạn code, chạy câu lệnh `php artisan migrate` để thêm những trường này vào trong bảng cơ sở dữ liệu. Ở đây tôi có thêm trường `last_login` để kiểm tra lần cuối người dùng đã đăng nhập.
#### 2.2. Tạo Command tùy chỉnh
Để tạo Command tùy chỉnh, chạy câu lện dưới đây:
```go
php artisan make:command InactiveUser
```
Sau khi thực hiện lệnh này, bạn sẽ thấy tập tin này trong thư mục `app\Console\Commands\inactiveUsers.php`.
#### 2.3. app\Console\Commands\inactiveUsers.php
Các bạn mở thư mục `app\Console\Commands\inactiveUsers.php` và sẽ thấy đoạn code này ở trong.
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class inactiveUsers extends Command
{

    protected $signature = 'command:name';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        //
    }
}
```
Trong đó, `$signature` là tên hoặc mã định danh của lệnh và mô tả giúp cung cấp thêm thông tin về lệnh, `$description` mô tả chức năng của task và việc xử lý logic của task sẽ được viết trong hàm `handle()`.
#### 2.4. Tạo thông báo
Chạy câu lệnh sau để tạo một thông báo mới
```php
php artisan make:notification NotifyInactiveUser
```
Sau khi chạy câu lênh, bạn sẽ thấy file này trong thư mục `app\Notifications\NotifyInactiveUser.php` và hãy dán đoạn code dưới đây vào file đó.
```php
<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyInactiveUser extends Notification
{
    use Queueable;

    public function __construct()
    {
        //
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('Lâu rồi bạn không sử dụng dịch vụ của chúng tôi?')
                    ->action('Hãy sử dụng nào!', route('login'))
                    ->line('Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

```
#### 2.5. Thiết lập app\Console\Commands\inactiveUsers.php
Mở file ` app\Console\Commands\inactiveUsers.php` và dán đoạn code sau đây:
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class inactiveUsers extends Command
{

    protected $signature = 'email:inactiveUsers';

    protected $description = 'Send email to Inactive Users';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $limit = Carbon::now()->subDay(7);
        $inactive_user = User::where('last_login', '<', $limit)->get();
        foreach ($inactive_user as $user) {
            $user->notify(new NotifyInactiveUser());
        }
    }
}

```
Bây giờ bạn chạy câu lệnh `php artisan list` thì bạn sẽ nhìn thấy câu lệnh tùy chỉnh trong danh sách câu lệnh Artisan của Laravel
![](https://images.viblo.asia/f2cf0404-d553-4f70-8755-0b2950aec9c6.png) <br>
Ở đây tôi sử dụng `$limit = Carbon::now()->subDay(7)` để lấy ra những người dùng có thời gian đăng nhập từ 7 ngày trước và gửi thông báo cho họ.
#### 2.6. Thiết lập Controller
Để lưu dữ liệu ở trường last_login, hãy chuyển đến controller và thêm đoạn code sau vào phương thức sau khi đăng nhập thành công của bạn.
```cpp
$user = Auth::user();
$user->last_login = Carbon::now();
$user->save();
```
Giờ đây, chúng ta đã lưu được thời gian đăng nhập của người dùng.
#### 2.7. Đăng ký Command và Scheduler
Để đăng ký Command, đi đến thư mục `app\Console\Kernel.php`. Ở file `Kernel`, đăng ký Command bên trong `$commands`. 
```php
protected $commands = [
    Commands\InactiveUsers::class,
];

protected function schedule(Schedule $schedule)
{
    $schedule->command('email:inactiveUsers')
             ->everyMinute();
}
```
Và dán đoạn code bên trên vào trong. Ở phương thức `schedule()`, ta có thể xác định được khoảng thời gian mà mình muốn xử lý Schedule. Các bạn có thể tham khảo một số mốc thời gian ở đây: https://laravel.com/docs/6.x/scheduling#schedule-frequency-options <br>
Cuối cùng chúng ta sẽ được file `Kernel` như sau:
```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{

    protected $commands = [
        Commands\InactiveUsers::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        $schedule->command('email:inactiveUsers')
                 ->everyMinute();
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
```
Bây giờ các bạn chạy câu lệnh:
```html:html
php artisan email:inactiveUsers
```
Sau đó logic của bạn sẽ làm việc. Điều đó có nghĩa là thông báo của bạn sẽ được gửi đến những người dùng đã đăng nhập 7 ngày trước.
#### 2.8. Dùng lệnh Schedule để kiểm tra
Giờ đây chúng ta đã sẵn sàng để chạy Cron, vì vậy bạn có thể kiểm tra thủ công bằng cách chạy câu lệnh:
```objectivec
php artisan schedule:run
```
Cuối cùng, bạn có thể quản lý lệnh này trong Schedule Task, bạn phải khai báo một mục vào file `crontab` của máy chủ: 
```shell
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
Hy vọng bài viết này có thể giúp được các bạn.