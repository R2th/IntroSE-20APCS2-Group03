# Lời nói đầu
Hello các bác, em đã quay trở lại rồi đây :D. Trong bài viết lần này em xin phép quay trở về với Laravel. `Task Schedule` chắc chắn bác nào đã từng hoặc đang làm việc với Framework Laravel thì đều đã nghe đến khái niệm này.
<br>
  <br>
Trong quá khứ thì chúng ta có thể tạo một `Cron` cho mỗi tác vụ mà cần lên lịch trình trên server. Tuy nhiên điều này có thể nhanh chóng gây tổi hại, bởi vì tác vụ lịch trình của chúng ta không còn kiểm soát trong mã nguồn mà chúng ta phải SSH vào server để thêm các `cron` bổ sung.
<br>
<br>

`Laravel's command scheduler` cho phép chúng ta định nghĩa một các thuận tiện và rõ ràng 
các câu lệnh `schedule` bên trong Laravel. Khi chúng ta sử dụng `Scheduler` chỉ cần một `Cron` duy nhất trên server. Các tác vụ schedule sẽ được định nghĩa trong file `app/Console/Kernel.php` và tại phương thức `schedule`. Bây giờ em sẽ làm một ví dụ đơn giản để các bác có thể hiểu rõ hơn về `Task Schedule` nhé, bắt đầu nào.
# Ví dụ
## Khởi tạo project 
Tất nhiên rồi, chúng ta cần khởi tạo một project để thực hiện ví dụ này.
<br>

```
composer create-project --prefer-dist laravel/laravel demo_task_schedule
```

## Khởi tạo new artisan command
Các bác chạy câu lệnh sau để khởi tạo new artisan command class, Em em sẽ tạo task schedule để gửi lời chào buổi sáng, nên đặt tên file command là GoodMorning =)). 
```
php artisan make:command WordOfTheDay
```

Chạy xong command trên thì trong `app/Console` sẽ tạo ra một folder Commands, trong folder này sẽ chứa file `WordOfTheDay.php` như sau:
```
<?php
 
namespace App\Console\Commands;
 
use Illuminate\Console\Command;
 
class WordOfTheDay extends Command
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
Thay đổi giá trị của property `$signature` là `word:day`. Câu lệnh sẽ được gọi khi chạy task schedule.
```
protected $signature = 'word:day';
```
Còn với property `$description` là bạn sẽ viết đoạn mô tả sau khi bạn chạy câu lệnh command.
```
protected $description = 'Send a Daily email to all users with a word and its meaning';
```
Phương thức `Handle()` được gọi bất cứ khi nào lệnh command được executed, đây là nơi chúng ta sẽ viết code để thực hiện các tác vụ cụ thể. Ở đây em sẽ tao ra một mảng các lời chúc mà gửi qua mail cho các users.

```
public function handle()
    {
        $words = [
            'ngot ngao' => 'Em hãy tin rằng, khi anh nhắn tin vào buổi sáng chỉ có thể là lời chúc ngọt ngào: Ngày mới rạng rỡ và niềm tin em nhé!',
            'lang man' => 'Mặt trời đã mọc! hãy thức giấc đi em. Chào buổi sáng!',
            'say dam' => 'Anh gửi cho em những cái ôm và nụ hôn của tình yêu trong tin nhắn chúc buổi sáng này và chúc em có một ngày tuyệt vời!',
            'xao lol' => 'Tối qua anh đi ngủ với một nụ cười vì anh biết anh sẽ mơ thấy em…Và sáng nay anh thức dậy cũng với một nụ cười vì anh biết em không phải là một giấc mơ',
            'vui ve' => 'Chúc cho cả ngày may mắn, niềm vui nối tiếp niềm vui, còn nỗi buồn thì ở lại…! Good morning!',
        ];

        $key = array_rand($words);
        $value = $words[$key];

        $users = User::all();
        foreach ($users as $user) {
            Mail::raw("{$key} -> {$value}", function ($mail) use ($user) {
                $mail->from('tienduong@gmail.com');
                $mail->to($user->email)
                    ->subject('Word of the Day');
            });
        }

        $this->info('Word of the Day sent to All Users');
    }
```

## Đăng ký câu lệnh
Vừa rồi các bác đã tạo thành công, bây giờ sẽ cần phải đăng ký câu lệnh trong kernel. Các bác mởi file `app/Console/Kernel.php` File kernel ban đầu của chúng ta sẽ trông như thế này.
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
        // $schedule->command('inspire')
        //          ->hourly();
    }

    /**
     * Register the Closure based commands for the application.
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

Trong file này chúng ta đăng ký `command class` trong thuộc tính `commands` và chúng ta sẽ lên schedule thực hiện các câu lệnh theo các khoảng thời gian định kỳ trong phương thức  `schedule()`.
<br>
   Các bác update file`app/Console/Kernel.php` lại như sau:
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
        Commands\WordOfTheDay::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('word:day')
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
chúng ta đã thêm class `WordOfTheDay` vào `commands` property và shedule cho nó chạy mỗi ngày.




Bây giờ khi các bác chạy câu lệnh `php artisan list` trên terminal thì sẽ thấy được câu lệnh command đã được đăng ký như sau :

![](https://images.viblo.asia/81ffa7de-093a-44f0-b30f-d82026304ac4.png)

GIờ thì các bác chỉ cần chạy câu lệnh `php artisan word:day` để thực hiện executed schedule. Tuy nhiện thì các bác phải có user trong database nhé =)) 
```
$php artisan word:day
Word of the Day sent to All Users
```
đây là kết quả:

![](https://images.viblo.asia/385dfe9b-81f6-40ce-a06d-66bf50efa4e2.png)

## Sử dụng phương thức Closure/Callback 
Laravel task scheduler cho phép chúng ta thực thi 1 callback hoặc một closure định kỳ bằng cách gọi phương thức `call()`. Giờ thì các bác thử thay đổi một chút ở phương thức `schedule` trong file `app/Console/Kernel.php` như sau:
```
protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            User::where('spam_count', '>', 100)
                ->get()
                ->each
                ->delete();
        })->hourly();
    }
```
Chúng ta đã truyền một closure như một tham thứ nhất vào phương thức `call()`. Chúng ta cũng đã set là task sẽ thực thi sau mỗi giờ đồng hồ. Các bác cũng có thể tìm hiểu thêm về Task Shedule trong [ Laravel Documentation](https://laravel.com/)
<br>
## Task schedule trong laravel
Task schedule trong laravel thực thi câu lệnh artisan, shell hay một call back function một cách định kỳ dựa vào thời gian đã được định nghĩa . để làm điều đó chung ta sử dụng phương thức schedule() trong app/Console/Kernel.php như em đã thực hiện trước đó.
```
protected function schedule(Schedule $schedule)
    {
        $schedule->command('word:day')
            ->daily();
     }
```
$schedule->command('word:day') là nơi chúng ta định nghĩa câu lệnh cần thực thi và `->daily();` dùng định nghĩa tần số thực hiện câu lệnh. Ngoài `->daily()` ra thì trong laravel có cung cấp cho chúng ta nhiều phương thức khác nữa, các bạn có thể tham khảo ở [ở đây](https://laravel.com/docs/5.8/scheduling).
## Đặt lịch trên Unix, Linux
Cron là một công cụ đặt lịch thực hiện theo thời gian trong các hệ điều hành như Unix, Linux, các công việc, nhiệm vụ (job, task) được gọi là cron job. Cron là một ứng dụng daemon, là một ứng dụng chạy ngầm và được khởi tạo cùng hệ thống. Thời gian biểu chạy các ứng dụng sẽ được đưa vào một file cấu hình và file này được gọi là crontab. Vậy ở ví dụ này thì các bác chạy cronjob như sau:
```
crontab -e
```
Nó sẽ mở file server Crontab, paste đoạn code dưới đây vào trong file đó mà lưu lại.
```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
Một Cronjob như này sẽ có 2 phần chính:
<br>
Phần đầu * * * * * là thời gian biểu thực hiện một ứng dụng.
<br>
Phần còn lại là câu lệnh thực hiện ứng dụng, câu lệnh này giống như khi chúng ta chạy trong màn hình dòng lệnh (terminal).
<br> 
5 dấu * trong phần thời gian biểu cron job thể hiện tương ứng với thời gian lặp lại trong phút, giờ, ngày trong tháng, tháng và ngày trong tuần, nó có thể là một giá trị số cụ thể.
<br>
Nếu các bác set như sau:
```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1 
```
lịch này sẽ thực hiện mỗi phút một lần.
```
15 * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
 Lịch này thực hiện mỗi giờ một lần và vào phút thứ 15.
 ```
 15 2 * * 1 [command] 
 ```
 Thực hiện vào mỗi thứ hai hàng tuần vào lúc 2:15 am.
 <br>
 `cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1 ` là phần quản lý việc xuất dữ liệu của câu lệnh, sử dụng > nếu muốn ghi đè file và >> nếu muốn mở file và ghi thêm vào.
 <br>
Một trong những ưu điểm lớn nhất của Laravel schedule là chúng ta có thể tập trung vào khởi tạo câu lệnh, viết logic và Laravel sẽ làm hết những việc còn lại.
<br>
## Kết thúc
Vừa rồi thì em đã chia sẻ một chút về Laravel task schedule và có một ví dụ đơn giản, hi vọng có thể giúp các bác một phần nào đấy hiểu về tác vụ của Laravel task schedule. Cảm ơn các bác đã đón đọc.
## Tài liệu tham khảo
https://laravel.com/docs/5.8/scheduling
<br>
https://tutsforweb.com/how-to-set-up-task-scheduling-cron-job-in-laravel/