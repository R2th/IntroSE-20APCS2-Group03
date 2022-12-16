*_Task Schedule_ giúp cho chúng ta tự động thực hiện các công việc đã được lên lịch mà không cần phải chạy thủ công chúng, chúng ta cứ hình dung rằng có những tác vụ mà phải chạy hàng ngày hoặc hàng giờ thì không thể lúc nào cũng ngồi canh để tới giờ đó chúng ta lại ngồi chạy lại các tác vụ được, việc lập lịch sẽ giúp cho các công việc này tự động.*

***Xem thêm*** : [***Cài đặt và cấu hình môi trường lập trình PHP trên Ubuntu***](https://tailieu-bkhn.blogspot.com/2021/03/install-and-config-php.html)
## Crontab
Trước tiên là chúng ta đi tìm hiểu về _Crontab_ trước, Cron là một cách để tạo và chạy các lệnh theo một chu kỳ xác định. Đây là tiện ích giúp lập lịch trình để chạy những dòng lệnh bên phía server nhằm thực thi một hoặc nhiều công việc nào đó theo thời gian được lập sẵn.

Một cron schedule đơn giản là một text file. Mỗi người dùng có một cron schedule riêng, file này thường nằm ở `/var/spool/cron` . _Crontab_ files không cho phép bạn tạo hoặc chỉnh sửa trực tiếp với bất kỳ trình text editor nào, trừ phi bạn dùng lệnh `crontab`.

Để thêm 1 lịch mới vào Crontab thì bạn sử dụng lệnh: 
```bash
crontab -e
```
Sau đó kéo xuống cuối file và lên lịch cho 1 câu lệnh theo quy tắc dưới đây:

![image.png](https://images.viblo.asia/fe790e4c-8de8-4f5a-8f49-1a031a18a9e1.png)

Khung thời gian được sử dụng trong `crontab` là: **phút – giờ – ngày trong tháng – tháng – thứ trong tuần**.

Nếu khung thời gian phút là `*` thì câu lệnh được gọi mỗi phút, khung thời gian giờ là `*` thì câu lệnh được gọi mỗi giờ và tương tự với các khung thời gian còn lại. Vậy nếu chúng ta để mặc đinh khung thời gian là `* * * * *` thì câu lệnh sẽ được gọi lại mỗi phút.

Ví dụ với cách lập lịch như duới thì câu lệnh sẽ được thực hiện vào phút thứ 5 của mỗi giờ: 
```
5 * * * * /path/to/command
```

Nếu muốn lập lịch thêm cho các câu lệnh chạy vào các phút thứ 5, 10, 15 thì thêm vào như sau: 
```
5,10,15 * * * * /path/to/command
```

Để check crontab của bạn viết có đúng không có thể sử dụng website [https://crontab.guru/](https://crontab.guru/)

## Artisan Command trong Laravel 
Chắc là mọi người ai cũng biết là các câu lệnh `php artisan make:controller ControllerName` hay `php artisan make:model ModelName` để tạo ra các Controller hay Model một cách tự động, chúng chính là những Artisan command được cung cấp sẵn bởi Laravel, và chúng ta hoàn toàn có thể tạo ra những command của riêng mình.

Mình sẽ đi vào 1 ví dụ cụ thể nha, như vậy sẽ dễ nói hơn, bây giờ mình cần tạo 1 command để đồng bộ lại số dư trong ví thì mình sẽ sử dụng câu lệnh: 
```bash
php artisan make:command SyncBalanceWallet --command=wallet:sync
```

Với: 
- `SyncBalanceWallet` là tên của command
-  `wallet:sync` là chữ ký của command đó.

Sau khi chạy xong thì một lớp `SyncBalanceWallet` được tạo ra ở thư mục `\App\Console\Commands` và có dạng như là bên dưới này: 
```php
<?php

namespace App\Console\Commands;

use App\Jobs\SyncBalanceWalletJob;
use App\Models\UserWallet;
use Illuminate\Console\Command;

class SyncBalanceWallet extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wallet:sync';

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
        // Xử lý tác vụ ở đây
    }
}

```

Bạn sẽ viết code đồng bộ số dư cho ví ở trong hàm `handle`. Bây giờ chúng ta muốn rằng mỗi 5 phút thì số dư trong ví sẽ được cập nhật và đồng bộ một lần, vậy bây giờ chúng ta sẽ sử dụng `Task Schedule` trong Laravel để lập lịch mỗi 5 phút chạy command này 1 lần thì lúc đó số dư trong ví sẽ được định kì 5 phút cập nhật lại 1 lần.

## Task Schedule
Tất cả các tác vụ được lên lịch tại method `schedule` của lớp `\App\Console\Kernel`, để lên lịch cho command `SyncBalanceWallet` chúng ta thêm vào method `schedule` dòng lệnh `$schedule->command("wallet:sync")->everyFiveMinutes();`, khi đó lớp `kernel` sẽ giống: 
```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;

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
        $schedule->command("wallet:sync")->everyFiveMinutes();
    }
}
```

Vậy là đã gần xong rồi, mọi công việc đối với Laravel đã gần như hoàn thành. Bây giờ muốn các schedule này hoạt động thì chúng ta cần thêm vào `cron` để chạy câu lệnh `php artisan schedule:run` mỗi phút như sau: 
```
* * * * * php ~/CodeFolder/localhost/adtech-backend/artisan schedule:run
```
Với ` ~/CodeFolder/localhost/adtech-backend` chính là đường dẫn tới thư mục project chính của bạn.

Mình giải thích thêm nha? Mọi thứ về `cron` thì rất rõ rồi phải không, câu lệnh `php artisan schedule:run` sẽ được chạy mỗi phút, và mỗi khi chạy câu lệnh này nó sẽ tìm kiếm trong file `Kernel` nếu có job nào đúng giờ chạy thì nó sẽ chạy còn không thì sẽ không chạy. 

Ví dụ nếu job của chúng ta khai báo là chạy 5 phút 1 lần `everyFiveMinutes` thì nó sẽ chạy ở các phút thứ 5, 10, 15,... nếu thời gian lúc kiểm tra ví dụ là 9h5p hay 9h10p,... thì job sẽ được chạy.

Vậy tại sao phải lập lịch cho `cron` chạy câu lệnh `php artisan schedule:run` mỗi phút? Vì phút chính là đơn vị thấp nhất khi lập lịch, vậy chúng ta phải chạy câu lệnh `schedule:run` mỗi phút thì mới có thể quét được tất cả các trường hợp job được khai báo trong file `kernel`.

Không chỉ commend mà Laravel còn hỗ trợ lập lịch cho 1 Queue Job hay 1 câu lệnh hệ thống, bạn có thể xem thêm [TẠI ĐÂY](https://laravel.com/docs/8.x/scheduling) nha, về cấu trúc thì hoàn toàn không khác gì lập lịch cho 1 command cả.

*Tham khảo:* [https://vietnix.vn/](https://vietnix.vn/crontab/), [https://cuongquach.com/](https://cuongquach.com/cau-hinh-crontab-chay-15-phut-moi-lan.html), [https://laravel.com/docs/](https://laravel.com/docs/8.x/scheduling)