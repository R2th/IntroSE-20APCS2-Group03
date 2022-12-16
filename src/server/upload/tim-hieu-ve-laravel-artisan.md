### 1. Laravel Artisan ?

Artisan là giao diện dòng lệnh đi kèm với Laravel. Nó cung cấp một số lệnh hữu ích hỗ trợ bạn trong quá trình bạn xây dựng ứng dụng của mình. Để xem danh sách tất cả các lệnh Artisan có sẵn, bạn có thể sử dụng lệnh danh sách:

```
php artisan list
```

Mỗi lệnh cũng bao gồm một "help" hiển thị và mô tả các đối số và tùy chọn có sẵn của lệnh. Để xem màn hình trợ giúp, ta thực hiện câu lệnh lệnh :

```
php artisan help migrate
```

Laravel Artisan là một công cụ dòng lệnh được tích hợp sẵn trong các dự án sử dụng Laravel, nó cung cấp rất nhiều các chức năng trợ giúp việc xây dự án, giảm thời gian viết code cũng như tự động hóa một số công việc. Laravel Artisan xứng đáng với cái tên của nó, nó thật sự xuất sắc khi xử lý các công việc mang tính thủ công bằng cách tự động hóa chúng.

Hỗ trợ các công việc liên quan đến vận hành dự án như tối ưu hóa, chuyển ứng dụng sang chế độ bảo trì, chạy các công việc ngầm theo kiểu hàng đợi (queue job), tạo và thay đổi sử dụng bộ đệm dữ liệu.
Các công việc xử lý cơ sở dữ liệu như migrate, đưa dữ liệu vào database, tạo dữ liệu kiểm thử.
Artisan cũng có thể tạo các template là các Class trong lập trình theo các mẫu khác nhau như tạo ra các Model, Controller, Event…
Các công việc liên quan đến bảo mật như cài đặt xác thực người dùng, sinh key mã hóa và các việc liên quan đến sử dụng OAuth2.
Chạy các công cụ ngoài như Tinker, hoặc cho phép người dùng tạo ra các công cụ tùy thích.

Bạn có thể sử dụng câu lệnh php artisan list để xem danh sách các câu lệnh hỗ trợ bởi Artisan:

```

>php artisan list
Laravel Framework 5.4.19

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
      --env[=ENV]       The environment the command should run under
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output,
 2 for more verbose output and 3 for debug

Available commands:
  clear-compiled       Remove the compiled class file
  down                 Put the application into maintenance mode
  env                  Display the current framework environment
  help                 Displays help for a command
  inspire              Display an inspiring quote
  list                 Lists commands
  migrate              Run the database migrations
  optimize             Optimize the framework for better performance
  serve                Serve the application on the PHP development server
  tinker               Interact with your application
  up                   Bring the application out of maintenance mode
 app
  app:name             Set the application namespace
 auth
  auth:clear-resets    Flush expired password reset tokens
 cache
  cache:clear          Flush the application cache
  cache:forget         Remove an item from the cache
  cache:table          Create a migration for the cache database table
 config
  config:cache         Create a cache file for faster configuration loading
  config:clear         Remove the configuration cache file
 db
  db:seed              Seed the database with records
 event
  event:generate       Generate the missing events and listeners based on regist
ration
 key
  key:generate         Set the application key
 make
  make:auth            Scaffold basic login and registration views and routes
  make:command         Create a new Artisan command
  make:controller      Create a new controller class
  make:event           Create a new event class
  make:job             Create a new job class
  make:listener        Create a new event listener class
  make:mail            Create a new email class
  make:middleware      Create a new middleware class
  make:migration       Create a new migration file
  make:model           Create a new Eloquent model class
  make:notification    Create a new notification class
  make:policy          Create a new policy class
  make:provider        Create a new service provider class
  make:request         Create a new form request class
  make:seeder          Create a new seeder class
  make:test            Create a new test class
 migrate
  migrate:install      Create the migration repository
  migrate:refresh      Reset and re-run all migrations
  migrate:reset        Rollback all database migrations
  migrate:rollback     Rollback the last database migration
  migrate:status       Show the status of each migration
 notifications
  notifications:table  Create a migration for the notifications table
 passport
  passport:client      Create a client for issuing access tokens
  passport:install     Run the commands necessary to prepare Passport for use
  passport:keys        Create the encryption keys for API authentication
 queue
  queue:failed         List all of the failed queue jobs
  queue:failed-table   Create a migration for the failed queue jobs database tab
le
  queue:flush          Flush all of the failed queue jobs
  queue:forget         Delete a failed queue job
  queue:listen         Listen to a given queue
  queue:restart        Restart queue worker daemons after their current job
  queue:retry          Retry a failed queue job
  queue:table          Create a migration for the queue jobs database table
  queue:work           Start processing jobs on the queue as a daemon
 route
  route:cache          Create a route cache file for faster route registration
  route:clear          Remove the route cache file
  route:list           List all registered routes
 schedule
  schedule:run         Run the scheduled commands
 session
  session:table        Create a migration for the session database table
 storage
  storage:link         Create a symbolic link from "public/storage" to "storage/
app/public"
 vendor
  vendor:publish       Publish any publishable assets from vendor packages
 view
  view:clear           Clear all compiled view files
  
```

### 2. Laravel REPL

REPL là gì? REPL viết tắt của Read – Eval – Print Loop, còn được biết đến với tên language shell, đơn giản là một ngôn ngữ cho phép lặp đi lặp lại các việc Đọc dữ liệu, Tính toán dữ liệu và In ra màn hình. Các ứng dụng Laravel trong đó có Tinker là một ngôn ngữ REPL được hỗ trợ bởi PsySH.

```
>php artisan tinker
Psy Shell v0.8.3 (PHP 5.6.20 ΓÇö cli) by Justin Hileman
New version is available (current: v0.8.3, latest: v0.8.8)
>>>
```

### 3.Câu lệnh tạo Laravel Artisan


Ngoài các lệnh được cung cấp với Artisan, bạn cũng có thể tạo các lệnh tùy chỉnh của riêng mình. Các lệnh thường được lưu trữ trong thư mục `app / Console / Commands;` tuy nhiên, bạn có thể tự do chọn vị trí lưu trữ của riêng mình miễn là lệnh của bạn có thể được Composer tải.

> Tạo câu lệnh
> 

Để tạo một lệnh mới, sử dụng lệnh make: lệnh Artisan. Lệnh này sẽ tạo một lớp lệnh mới trong thư mục app / Console / Commands. Đừng lo lắng nếu thư mục này không tồn tại trong ứng dụng của bạn, vì nó sẽ được tạo lần đầu tiên bạn chạy lệnh make: command Artisan. Lệnh được tạo sẽ bao gồm tập hợp các thuộc tính và phương thức mặc định có mặt trên tất cả các lệnh:

```
php artisan make:command SendEmails
```

> Cấu trúc lệnh
> 

Sau khi tạo lệnh, bạn nên điền vào các đặc tính chữ ký và mô tả của lớp, nó sẽ được sử dụng khi hiển thị lệnh của bạn trên màn hình danh sách. Phương thức xử lý sẽ được gọi khi lệnh của bạn được thực thi. Bạn có thể đặt logic lệnh của bạn trong phương thức này. Để tái sử dụng mã nhiều hơn, thực hành tốt là giữ cho các lệnh giao diện điều khiển của bạn sáng và để chúng trì hoãn các dịch vụ ứng dụng để hoàn thành nhiệm vụ của chúng. 

Trong ví dụ bên dưới, lưu ý rằng chúng tôi đưa vào một lớp dịch vụ để thực hiện việc "nâng hạng nặng" trong việc gửi các e-mail.Chúng ta hãy xem xét một lệnh ví dụ. Lưu ý rằng chúng ta có thể tiêm bất kỳ phụ thuộc nào chúng ta cần vào hàm tạo hoặc phương thức xử lý của lệnh. Container dịch vụ Laravel sẽ tự động tiêm tất cả các phụ thuộc kiểu-hinted trong phương thức khởi tạo hoặc phương thức xử lý:

```

<?php

namespace App\Console\Commands;

use App\User;
use App\DripEmailer;
use Illuminate\Console\Command;

class SendEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:send {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send drip e-mails to a user';

    /**
     * The drip e-mail service.
     *
     * @var DripEmailer
     */
    protected $drip;

    /**
     * Create a new command instance.
     *
     * @param  DripEmailer  $drip
     * @return void
     */
    public function __construct(DripEmailer $drip)
    {
        parent::__construct();

        $this->drip = $drip;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->drip->send(User::find($this->argument('user')));
    }
}

```


Sau khi đăng ký xong, bạn sẽ thấy thông tin câu lệnh user:create khi thực hiện liệt kê các lệnh artisan (php artisan list) và cũng có thể thực hiện được lệnh php artisan user:create như các lệnh artisan sẵn có.

###  4. Định nghĩa các tham số câu lệnh Artisan

Các tham số cho câu lệnh Artisan được định nghĩa trong thuộc tính $signature. Thuộc tính này cho phép bạn định nghĩa tên câu lệnh, tham số và các tùy chọn. Các tham số được định nghĩa trong hai dấu ngoặc nhọn {parameter}. Chúng ta cũng có thể mặc định giá trị ban đầu cho các tham số.

```

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create {userType} {numberOfUser=1}';
```

Khi đó, muốn tạo ra 20 user có quyền quản trị chúng ta sẽ thực hiện php artisan user:create admin 20

Các tùy chọn trong câu lệnh Artisan cũng được định nghĩa trong $signature, cũng được đưa vào hai dấu ngoặc nhọn với tiền tố là –, ví dụ {–options}, có hai loại tùy chọn là loại nhận giá trị và loại không.

```

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create {userType} {numberOfUser} {--queue}';
```


Trong ví dụ trên –queue sẽ được sẽ được xác định khi thực hiện câu lệnh artisan, khi đó giá trị này trong tùy chọn sẽ là true, ngược lại nếu không truyền –queue thì giá trị này trong tùy chọn sẽ là false. Giả sử câu lệnh php artisan user:create admin 20 –queue là sẽ tạo ra 20 quản trị viên bằng cách đưa công việc này vào hàng đợi của hệ thống.

Các tùy chọn cũng có thể viết ngắn gọn hơn {–Q|queue} khi đó bạn có thể thay –queue trong câu lệnh artisan thành -Q. Giống như khi chúng ta thực hiện kiểm tra phiên bản của Laravel Artisan:

>php artisan --version
Laravel Framework 5.4.23

>php artisan -V
Laravel Framework 5.4.23

Cả tham số và tùy chọn ở trên đều có thể đưa vào câu lệnh dưới dạng mảng, khi đó chúng ta sử dụng ký tự * để hàm ý các đầu vào là dạng mảng:

```

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:delete {user*}';
```


Khi đó thực hiện php artisan user:delete 1 2 3 thì tham số user sẽ là một mảng [1, 2, 3]. Tương tự cho tùy chọn, chúng ta cũng sử dụng *:
```

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:delete {--id=*}';
```

Câu lệnh artisan sẽ như sau: php artisan user:delete –id=1 –id=2

Với thuộc tính signature chúng ta cũng có thể đưa vào các text mô tả cho từng tham số hoặc tùy chọn như vậy khi liệt kê danh sách các lệnh artisan chúng ta dễ dàng biết các tham số và tùy chọn này để làm gì.

```

/**
 * The name and signature of the console command.
 *
 * @var string
 */
protected $signature = 'user:create 
                       {userType : Type of user example admin, user...} 
                       {numberOfUser=1 : Number of user will create, default one user created} {--queue}';

```

### 5. Closure Commands

Closure based commands cung cấp một cách định nghĩa khác của console commands như classes. Giống như route Closures là thay thế cho các controllers, Trong hàm commands của file app/Console/Kernel.php, Laravel loads file routes/console.php
```

/**
 * Register the Closure based commands for the application.
 *
 * @return  void
 */
protected function commands()
{
    require base_path('routes/console.php');
}
```

Mặc dù file này không được định nghĩa HTTP routes, nó định nghĩa console based entry points (routes) vào ứng dụng. Bên trong file này, bạn có thể định nghĩa tất cả Closure based routes sử dụng hàm Artisan::command. Hàm command chấp nhận hai tham số: command signature và một Closure nhận tham số và tùy chọn:
```

Artisan::command('post:create {active=0} {numberOfPost=1} {--queue}', function ($active, $numberOfPost) {
    $this->info('Create post successfully');
});
```

Ngoài ra để nhận tham số command và options, command Closures ngoài ra có thể type-hint thêm các dependencies bạn muốn để giải quyết khỏi service container

```

use DB;
use Faker;

Artisan::command('post:create {active=0} {numberOfPost=1}', function ($active, $numberOfPost) {
    $faker = Faker\Factory::create();
    try {
        for ($i = 0; $i < $numberOfPost; $i++) {
            DB::table('posts')->insert([
                'title' => $faker->name,
                'content' => $faker->text($maxNbChars = 500);
            ]);
        }
        $thís->info($numberOfPost . ' create successfully');
    } catch (Exception $e) {
        $this->error('Error' . $e . 'when create post');
    }
});
```


### 6. Miêu tả Closure Command

Khi bạn định nghĩa một Close based command, bạn có thể sử dụng hàm describe để thêm nhiều miêu tả cho command. Miêu tả này thể hiện khi bạn chạy lệnh php artisan list hoặc php artisan help

```
use DB;
use Faker;

Artisan::command('post:create {active=0} {numberOfPost=1}', function ($active, $numberOfPost) {
    $faker = Faker\Factory::create();
    try {
        for ($i = 0; $i < $numberOfPost; $i++) {
            DB::table('posts')->insert([
                'title' => $faker->name,
                'content' => $faker->text($maxNbChars = 500);
            ]);
        }
        $thís->info($numberOfPost . ' create successfully');
    } catch (Exception $e) {
        $this->error('Error' . $e . 'when create post');
    }
})->describe('Create new post');
```

### 7.Đăng ký câu lệnh với hệ thống

Chúng ta định nghĩa các câu lệnh artisan, tiếp theo chúng ta cần đăng ký câu lệnh với hệ thống bằng cách đưa chúng vào thuộc tính commands trong lớp Kernel (app/Console/Kernel.php):

```
protected $commands = [
    Commands\UserCommand::class
];
```

Sau khi đăng ký xong, bạn sẽ thấy thông tin câu lệnh user:create khi thực hiện liệt kê các lệnh artisan (php artisan list) và cũng có thể thực hiện được lệnh php artisan user:create như các lệnh artisan sẵn có.


### 8. Chạy câu lệnh Artisan trong chương trình

Các câu lệnh artisan có thể thực hiện trong mã chương trình khi thực hiện phương thức call với facade Artisan, trong phần Bật chế độ bảo trì website bằng ứng dụng chúng ta hoàn toàn có thể thực hiện:

```

Route::get('turn-on-maintanence-mode', function(){
    Artisan::call('down');
});
```

Nếu bạn muốn các câu lệnh này thực hiện trong hàng đợi của hệ thống, sử dụng phương thức queue:
```

Route::get('/foo', function () {
    Artisan::queue('email:send', [
        'user' => 1, '--queue' => 'default'
    ]);

    //
});
```

Chúng ta cũng có thể thực hiện việc truyền giá trị cho các tham số và tùy chọn khi thực thi câu lệnh:
```

$exitCode = Artisan::call('user:create', [
    'userType' => 'admin',
    'numberOfUser' => 10
]);
```



Tham khảo

https://laravel.com/docs/5.6/artisanáo

https://allaravel.com/laravel-tutorials/laravel-artisan-la-gi-tai-sao-noi-cong-cu-nay-cuc-huu-ich/