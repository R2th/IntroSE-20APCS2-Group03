![](https://images.viblo.asia/0aadc396-3f5a-4fed-aa3b-60e2238f059b.png)
# Mục lục
* Phần 1: [Cùng nhau đòi nợ theo mốt 2019 với gửi Mail sử dụng Queue trong Laravel.(Part 1).](https://viblo.asia/p/cung-nhau-doi-no-theo-mot-2019-voi-gui-mail-su-dung-queue-trong-laravel-part-1-jvElawOYKkw)
* Phần 2: [Task Scheduling - Cùng nhau đòi nợ theo mốt 2019 (Part 2).](https://viblo.asia/p/task-scheduling-cung-nhau-doi-no-theo-mot-2019-part-2-djeZ14doKWz)

Như bài viết trước mình có chia sẻ cách đòi nợ một cách văn minh chuẩn 2019 với **Mail Laravel using  Queue** . Trong bài viết này mình sẽ chia sẻ tới mọi người về **Task Scheduling** trong Laravel. 

![](https://images.viblo.asia/4b4fa5f5-c916-40c8-ad0b-4f8133faa7fc.jpg)

Với những cậu bạn nào mà có suy nghĩ tích cực kiểu Nô-bi-ta như trên. Thì còn đợi gì mà không xây dựng một bảng **Con Nợ Xấu**  để lưu lại thông tin của họ vào. Rồi lập lịch mỗi ngày vào lúc 2h giờ sáng "*ANH GỬI MAIL EM NHẮC NHỚ*" về khoản nợ khó quên. Hệ thống sẽ tự động nhắc nhở các **Con Nợ Xấu** mà chúng ta không phải nhúng tay vào nữa :D Trước khi xây dựng 1 ví dụ nhỏ về việc lập lịch trong Laravel. Chúng ta cùng nhau tìm hiểu một vài khái niệm nhé.

# Laravel Schedule là gì?
Trong một hệ thống website. Có những công việc phải lặp đi lặp lại vào 1 thời gian nhất định nào đó (1 ngày 2 lần vào lúc 9h và 17h, 1 tuần 1 lần vào 8h sáng thứ 2, 1 tháng 1 lần ..v...v). Chúng ta không thể ngồi đợi tới đúng thời điểm đó rồi thực hiện được. Mà phải sử dụng cron các tác vụ. 

Vậy 1 thệ thống có 100 tác vụ thì phải viết 100 cron. Mỗi con cron sẽ thực hiện 1 tác vụ nhất định, và đó là câu chuyện của những năm về trước. Laravel Schedule sinh ra để khắc phục điều này.Nó cho phép bạn cấu hình xác định lịch trình lệnh của bạn  trong file app/Console/Kernel.php, và chỉ cần một mục Cron trên máy chủ của bạn là đủ.
```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
# Cron là gì?
+Tương tự như với Windows, Linux cũng có cách để tạo và chạy các lệnh theo một chu kỳ xác định. Trên Windows nó gọi là Task Schedule, còn với Linux là Cron.

+Cron là một tiện ích giúp lập lịch chạy những dòng lệnh bên phía server để thực thi một hoặc nhiều công việc nào đó theo thời gian được lập sẵn. Một số người gọi những công việc đó là **Cronjob** hoặc **Crontab**.
* Cronjob là các lệnh thực thi hành động đặt trước vào thời điểm nhất định.
* Crontab là nơi lưu trữ các cronjob.
### 1 - Cài đặt crontab
Thông thường thì crontab thường được cài đặt sẵn. Nhưng trong trường hơp VPS chưa được cài đặt. Bạn có thể tự cài đặt với lệnh sau:
```bash
yum install cronie
```
Muốn start crontab thì chúng ta sử dụng lệnh:
```bash
service cron start
```
### 2 - Các lệnh thường sử dụng
```bash
crontab -e: tạo hoặc chỉnh sửa file crontab 
crontab -l: hiển thị file crontab 
crontab -r: xóa file crontab
```
### 3 - Cấu trúc cronjob
Cronjob được xác định bởi 5 khoảng thời gian: Phút – Giờ – Ngày – Tháng – Ngày trong tuần (T2 -> CN)

Nếu một cột được gán ký tự  * , nó có nghĩa là tác vụ sau đó sẽ được chạy ở mọi giá trị cho cột đó.
![](https://images.viblo.asia/077dcd02-f5bb-43ec-b32e-fec3768bb259.png)

**Ví dụ**: thực thi in dòng chữ "going to sleep" vào 2 thời điểm 12h và 23h mỗi ngày vào file history_sleep.txt  .Ngoài ra chúng ta có thể chỉ định nhiều thời điểm khác cách nhau bởi giấu ',' . 
```
0 12,23 * * * echo "going to sleep" >> history_sleep.txt 
```
Để tìm hiểu thêm nhiều ví dụ về cron vui lòng tham khảo tại đây: [20 ví dụ dễ hiều về crontab trên hệ điều hành Linux.](https://viblo.asia/p/20-vi-du-de-hieu-ve-crontab-tren-he-dieu-hanh-linux-yMnKMADmK7P#_cu-phap-linux-crontab-0)
# Lập lịch hỏi thăm các con nợ xấu.
Sau khi nắm được 1 số khái niệm cơ bản. Thì chúng ta cùng nhau lập lịch cho việc đòi nợ nhé. Bài này chúng ta sẽ kế thừa phần gửi mail đã dựng sẵn ở [Phần 1](https://viblo.asia/p/cung-nhau-doi-no-theo-mot-2018-voi-gui-mail-su-dung-queue-trong-laravel-bWrZnpqv5xw) nhé.

### Bước 1: Định nghĩa các tác vụ

Tất cả các công việc của chúng ta. Sẽ được định nghĩa trong *function schedule* của *App\Console\Kernel* class. Trong thư mục *app/Console/Kernel.php*.

**Ví dụ**: Công việc của chúng ta là gửi email cho Con Nợ Xấu vào 2h sáng thứ 2 hàng tuần.
* **Cách 1** : Chúng ta thực hiện định nghĩa trực tiếp tất cả các tác vụ trong **function schedule** . 

Đối với hệ thống chỉ có 1 tác vụ thôi thì sẽ không bị rối. nhưng với 1 hệ thống có n tác vụ mà định nghĩa hết trong **function schedule** thì sẽ trở nên rối dắm và khó quản lý.

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
         $schedule->call(function () {
             $data = [
                'name' => 'Con Nợ Xấu',
                'content' => 'Cố sống tốt nhé. Ăn ở phúc đức. Ở hiền gặp lành',
                'email' => 'minhtu210894@gmail.com',
            ];
            dispatch(new SendMailForDues($data))->onConnection('sync');
        })->weekly()->mondays()->at('02:00');
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
* **Cách 2** :  Với hệ thống nhiều tác vụ , chúng ta sẽ tách chúng ra, sau đó gọi vào function schedule.

Việc này sẽ giúp dễ dàng quản lý code, dễ dàng main tain, dễ nhìn dễ hiểu hơn.Chúng ta sẽ tạo 1 command riêng cho mỗi tác vụ.
```bash
php artisan make:command SendMail
```
Lúc này chúng ta sẽ có 1 file: **SendMail.php** trong thư mục **app/Console/Commands** . Và chúng ta sẽ định nghĩa các tác vụ trong **function handle()** . Ngoài ra còn có 2 thuộc tính:
* signature : Định nghĩa cú pháp gọi tới lệnh.
* description : Mô tả chức năng của lệnh đó.
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\SendMailForDues;

class SendMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sendMailForDues';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'this using for dues';

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
        $data = [
            'name' => 'Minh Tu',
            'content' => 'Cố sống tốt nhé. Ăn ở phúc đức. Ở hiền gặp lành',
            'email' => 'minhtu210894@gmail.com',
        ];
        dispatch(new SendMailForDues($data))->onConnection('sync');
    }
}
```
Bây giờ chúng ta sẽ đăng ký chúng trong Kernel.php
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
        'App\Console\Commands\SendMail'
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
         $schedule->command('sendMailForDues')->everyMinute();
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
Ở ví dụ trên mình thiết lập cứ mỗi phút gửi mail 1 lần. chung ta có thể thiết lập thời gian tùy ý.


* **Thiết lập thời gian**

| Method| Description |
| -------- | -------- |
|->cron('* * * * *');	|chạy công việc trong custom Cron schedule|
|->everyMinute();	|chạy mỗi phút 1 lần|
|->everyFiveMinutes();|	chạy mỗi 5 phút 1 lần|
|->everyTenMinutes();	|chạy mỗi 10 phút 1 lần|
|->everyThirtyMinutes();|	chạy mỗi 30 phút 1 lần|
|->hourly();	| chạy mỗi giờ 1 lần|
|->daily();	| chạy mỗi ngày vào 00:00|
|->dailyAt('13:00');	|chạy mỗi ngày vào 13:00|
|->twiceDaily(1, 13);	|chạy 2 lần 1 ngày vào 1:00 & 13:00|
|->weekly();	|chạy mỗi tuần 1 lần|
|->monthly();|chạy mỗi tháng 1 lần|
|->yearly();	|chạy mỗi năm 1 lần|

* **Các ràng buộc bổ sung về lập lịch**

| Phương Thức | Mô tả | 
| -------- | -------- |
|->weekdays();	    | Giới hạn thực hiện lịch chỉ vào ngày cuối tuần     | 
|->sundays();|	Giới hạn thực hiện lịch chỉ vào Chủ nhật|
|->mondays();	|Giới hạn thực hiện lịch chỉ vào thứ Hai|
|->tuesdays();	|Giới hạn thực hiện lịch chỉ vào thứ Ba|
|->wednesdays();|	Giới hạn thực hiện lịch chỉ vào thứ Tư|
|->thursdays();|	Giới hạn thực hiện lịch chỉ vào thứ Năm|
|->fridays();	|Giới hạn thực hiện lịch chỉ vào thứ Sáu|
|->saturdays();|	Giới hạn thực hiện lịch chỉ vào thứ Bảy|
|->between($start, $end);|	Giới hạn thực hiện lịch ở giữa khoảng thời gian từ $start đến $end|
|->when(Closure);	|Giới hạn thực hiện lịch chỉ khi nào Closure trả về true.|

### Bước 2: Thực thi crontab.
* Chọn editor: chon enditor nano (2)
```bash
sudo select-editor
```
* Thêm cron
```bash
EDITOR=nano crontab -e
```
Sau đó thiết lập:
```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
* Start crontab
```bash
service cron start
```
Đến đây mọi thứ đã hoàn tất, cùng kiểm tra kết quả thôi nào. Chúng ta có thể xây dựng bảng **Con Nợ Xấu** rồi lưu tất cả dữ liệu vào. Tiếp theo đó là lấy tất cả dữ liệu trong bảng **Con Nợ Xấu** đó ra để đẩy vào tác vụ. Chúng ta có thể hẹn giờ tùy ý chúng ta muốn mà không phải hàng ngày đợi tới đúng giờ rồi gửi phải không. Mọi thứ sẽ tự động. 
# Kết luận
Vậy là câu chuyện vui về việc đòi nợ đã kết thúc. Hy vọng rằng qua câu chuyện này. Mọi người đã hiểu về **Crontab** và **Laravel Schedule**. Chúng ta có thể áp dụng cho các tác vụ thực tế của mình. Như gửi thông tin hàng ngày cho tất cả các users. Hay gửi báo cáo cuối ngày cho quản lý...v...v. Không thì cũng có thể rằn mặt con nợ 1 cách văn minh nhất :D :D

Bài viết có thể có nhiều thiếu sót. Rất mong nhận được các đóng góp của mọi người.:kissing_heart::kissing_heart::kissing_heart::kissing_heart:
# Tài liệu tham khảo
[https://viblo.asia/p/20-vi-du-de-hieu-ve-crontab-tren-he-dieu-hanh-linux-yMnKMADmK7P#_cu-phap-linux-crontab-0](https://viblo.asia/p/20-vi-du-de-hieu-ve-crontab-tren-he-dieu-hanh-linux-yMnKMADmK7P#_cu-phap-linux-crontab-0)

[https://laravel.com/docs/5.5/scheduling#schedule-frequency-options](https://laravel.com/docs/5.5/scheduling#schedule-frequency-options)

[https://laravel.com/docs/5.7/scheduling](https://laravel.com/docs/5.7/scheduling)

[https://dethoi.com/kien-thuc/tim-hieu-ve-cronjob-va-crontab](https://dethoi.com/kien-thuc/tim-hieu-ve-cronjob-va-crontab).