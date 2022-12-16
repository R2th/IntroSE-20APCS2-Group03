Chúng ta xây dựng hệ thống Back-End chắc hẳn luôn quan tâm và ưu tiên nhất là bảo vệ cơ sở dữ liệu (database) của service. Nếu thời điểm người dùng truy cập vào site dịch vụ của chúng ta mà họ không còn nhìn thấy thông tin lưu trữ hoặc bị sai lệch chắc chắn niềm tin của họ sẽ giảm và kéo theo nhiều điều tệ hại tiếp theo nữa.

Đó là một vấn đề nghiêm trọng, tuy nhiên trường hợp bị mất dữ liệu trong quá trình nhầm lẫn khi đang phát triển của Dev như : chạy lệnh `migrate` hoặc `migrate:fresh` đối với trường hợp không có backup thì thật sự không may mắn rồi :grinning: 

Vậy nên trong rất nhiều trường hợp backup database sẽ cứu nguy trông thấy thì chúng ta nên ưu tiên chuẩn bị nó trước khi bắt đầu mọi việc phải không nào? Bài viết này mình sẽ cùng tìm hiểu cách đơn giản nào để thực hiện công việc này nhé!

![](https://images.viblo.asia/56a060dc-f270-4862-8aa9-a4a179762ea4.jpg)


### 1. Tạo Project & Câu lệnh (Command)

Mình làm luôn một demo nhỏ để các bạn mới sẽ dễ hình dung hơn, tất nhiên bạn đã quen rồi thì có thể bỏ qua nha :slightly_smiling_face:

Điều kiện là các bạn phải cài sẵn composer rồi nha, 

`composer create-project --prefer-dist laravel/laravel dailybackupdb`

 Vậy là project **dailybackupdb** đã được tạo mới 
 
 Tạo MySQL DB cho Database của bạn, cần có các thông tin dưới đây:
 
>  DB_CONNECTION=mysql
> DB_HOST=127.0.0.1
> DB_PORT=3306
> DB_DATABASE=yourdbneedbackup
> DB_USERNAME=user
> DB_PASSWORD="pass"

 Sau khi tạo db, user , password trong mysql các bạn hãy điền thông tin của mình vào file `.env`
 
 Chạy lệnh `composer install` trong Terminal để cài đặt những thư viện cần thiết
 
 Chúng ta cần phải làm thêm bước này trước khi khởi tạo 1 command cho việc backup database vì project của bạn đang là mới hoàn toàn. Từ lần sau sẽ không cần phải làm nữa.
  
  Lần lượt chạy các câu lệnh sau:
  
```
 php artisan config:clear
 
 php artisan migrate
```

Để khởi tạo được các table trong database của bạn thì lát mới có cái mà backup phải không nào :sunglasses: 

Tạo command để backup Database :

`php artisan make:command DbBackup`

 Sau khi chạy các câu lệnh trên thì lệnh **php artisan** mới hoạt động được 
 
 Bạn tìm đến file **DbBackup.php** Và chỉnh sửa 1 chút như sau :
 
```
class DbBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:backup';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Database Backup';
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
        $filename = "backup-" . Carbon::now()->format('Y-m-d') . ".gz";
        $command = "mysqldump --user=" . env('DB_USERNAME') ." --password=" . env('DB_PASSWORD') . " --host=" . env('DB_HOST') . " " . env('DB_DATABASE') . "  | gzip > " . storage_path() . "/app/backup/" . $filename;
        $returnVar = NULL;
        $output  = NULL;
        exec($command, $output, $returnVar);
    }
}
```

Các bạn nhớ import Carbon package nha, đến lúc chạy nó sẽ báo lỗi đấy!

Như vậy cũng không quá khó phải không nào? Nếu chưa quen bạn có thể chạy lại thêm 1 - 2 lần để dễ hiểu hơn. Ok giờ chúng ta sang bước tiếp theo.

### 2. Khởi tạo Kernel

Bạn hãy vào file Kernel trong đường dẫn **app/Console/Commands**

Tạo function schedule cho nó để nhận được command đã tạo ở trên

```
class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        'App\Console\Commands\DbBackup'
    ];
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('db:backup')->daily();
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

 ```
protected function schedule(Schedule $schedule)
    {
        $schedule->command('db:backup')->daily();
    }
```

Trong function này chúng ta muốn chạy command vào thời điểm nào thì edit theo mong muốn. Ở đây mình để là daily.

### 3. Thêm crontab service

Bạn cần cài crontab để nó chạy tự động 

`crontab -e`

![](https://images.viblo.asia/6baedcde-a07d-4da9-b8e1-57f9355cede1.png)


 Sau đó thêm cài đặt :
 
 `* * * * * cd /var/www/dailybackup && php artisan schedule:run >> /dev/null 2>&1`
 
  Hãy thay thế `/var/www/dailybackup` bằng đường dẫn của project nơi bạn để. Hiện tại của mình đang để trên server nên trông nó như vậy.
  
  Các bước của chúng ta đã sắp hoàn thành rồi.
  
  Bạn cần tạo thêm 1 vài database seeder nữa và chạy lệnh cho nó import vào db để file db của chúng ta có 1 chút dữ liệu
  
  Mở file `DatabaseSeeder.php `
  
  Thêm vào function run như sau :
  
  ```
DB::table('users')->insert([
            'name' => 'User1',
            'email' => 'user1@email.com',
            'password' => bcrypt('password'),
        ]);
        DB::table('users')->insert([
            'name' => 'user2',
            'email' => 'user2@email.com',
            'password' => bcrypt('password'),
        ]);
```

Bạn chạy lệnh : php artisan db:seed

Tạo thêm folder **backup** sẵn trong đường dẫn : `storage/app/`

 Để tránh 1 vài trường hợp nó sẽ báo lỗi không tạo được folder.
 
 Bạn chạy lệnh để kiểm tra kết quả :  `php artisan db:backup`
 
**Dưới đây là kết quả của mình:**
 
 ![](https://images.viblo.asia/f6256922-c1c8-45c0-a01e-85a6496cf129.png)

Các bạn có thể thấy trong đường dẫn thư mục backup đã có file của ngày thực hiện backup:

**backup-2021-08-17.gz**
 
 
###  4. Tổng kết

Như vậy là chúng ta đã hoàn thành việc tạo 1 service backup database đơn giản mà hiệu quả, bạn yên tâm về việc cơ sở dữ liệu được backup hằng ngày để phần thời gian còn lại cho việc development rồi. Hy vọng bài viết sẽ mang lại sự hữu ích cho các bạn đang tìm hiểu cũng như gặp vướng mắc này trong công việc. Nếu còn chỗ nào chưa rõ bạn có thể để lại comment, mình và các bạn khác sẽ giúp đỡ. :wink: