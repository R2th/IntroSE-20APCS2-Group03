>  Bài này chúng ta sẽ cùng tìm hiểu về cách sử dụng ErrArtisan Console. trong laravel 5.8 nhé. :)
# Artisan Console
### Introduction

`Artisan` là tên của giao diện màn hình command đính kèm trong Laravel. Nó cung cấp một danh sách các câu lệnh hữu ích để sử dụng trong quá trình phát triển sản phẩm. `Artisan` được phát triển dựa trên component Symfony Console khá mạnh mẽ. Để xem danh sách các câu lệnh được cung cấp, bạn có thể sử dụng câu lệnh list:
```
php artisan list
```

Mỗi câu lệnh đều có kèm theo một màn hình "help" để hiển thị và mô tả những đối số và tuỳ chọn có thể sử dụng. Để hiển thị help, đơn giản chỉ cần gõ tên câu lệnh kèm theo từ khoá help: EX:
```
php artisan help migrate
```
    
 ### Tinker (REPL)
 
Tất cả các ứng dụng của Laravel bao gồm Tinker, REPL được cung cấp bởi package PsySH. Tinker cho phép bạn tương tác với toàn bộ ứng dụng Laravel của bạn trên command, bao gồm loquent ORM, jobs, events... Để vào môi trường Tinker, hãy chạy comand tinker Artisan:

```
php artisan tinker
```
Bạn có thể xuất bản tệp cấu hình của Tinker bằng cách sử dụng  `vendor:publish command`:
```
php artisan vendor:publish --provider="Laravel\Tinker\TinkerServiceProvider"
```

### Command Whitelist

Tinker sử dụng một danh sách trắng để xác định lệnh Artisan nào được phép chạy trong `shell` của nó. Theo mặc định, bạn có thể chạy các lệnh được biên dịch clear-compiled, down, env, inspire, migrate,  optimize, and up commands. Nếu bạn muốn liệt kê thêm các lệnh khác, bạn có thể thêm chúng vào mảng lệnh trong tệp cấu hình tinker.php:

```
'commands' => [
    // App\Console\Commands\ExampleCommand::class,
],
```

### Alias Blacklist

Thông thường, Tinker tự động gọi aliases classes khi bạn yêu cầu chúng trong Tinker. Tuy nhiên, bạn có thể muốn không bao giờ alias cho một vài lớp. Bạn có thể thực hiện điều này bằng cách liệt kê các lớp trong mảng dont_alias của tệp cấu hình tinker.php:
```
'dont_alias' => [
    App\User::class,
]
```

### Writing Commands

Ngoài các lệnh được cung cấp với `Artisan`, bạn cũng có thể xây dựng các lệnh tùy chỉnh của riêng mình. Các lệnh thường được lưu trữ trong thư mục app/Console/Commands; tuy nhiên, bạn có thể tự do chọn vị trí lưu trữ của mình miễn là các lệnh của bạn có thể được loaded bởi `Composer`.

### Generating Commands

Để tạo một command , sử dụng lệnh `make:command Artisan` command. Lệnh này sẽ tạo một lớp lệnh mới trong thư mục app/Console/Commands directory. Đừng lo lắng nếu thư mục này không tồn tại trong ứng dụng của bạn, vì nó sẽ được tạo lần đầu tiên khi bạn chạy lệnh  make:command Artisan command. Lệnh được tạo sẽ bao gồm tập các thuộc tính và phương thức mặc định có trên tất cả các lệnh:
```
 php artisan make:command SendEmails
```

### Command Structure

Khi mà câu lệnh được tạo ra, bạn nên điền vào thông tin của hai thuộc tính signature và description trong class, vì chúng sẽ được dùng để hiển thị khi mà câu lệnh list được thực thi.Phương thức handle sẽ được gọi khi mà câu lệnh được thực thi. Bạn có thể viết logic tuỳ ý trong phương thức này. Nào, hãy cùng nhau xe một ví dụ về câu lệnh.

Chú ý là chúng ta có thể inject bất cứ dependencies nào mà chúng ta cần vào trong hàm khởi tạo của câu lệnh. Laravel service container sẽ tự động inject tất cả các dependencies được đánh dầu trong hàm khởi tạo. Để mã nguồn tái sử dụng tốt hơn, khuyến khích các bạn xử lý câu lệnh một cách gọn nhẹ và chuyển giao cho application services để thực hiện công việc.
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
     * @param  \App\DripEmailer  $drip
     * @return mixed
     */
    public function handle(DripEmailer $drip)
    {
        $drip->send(User::find($this->argument('user')));
    }
}
```
## Closure Command Descriptions

Khi xác định lệnh Đóng dựa trên, bạn có thể sử dụng phương thức mô tả để thêm mô tả vào lệnh. Mô tả này sẽ được hiển thị khi bạn chạy `php artisan list` or `php artisan help ` commands:
```
Artisan::command('build {project}', function ($project) {
    $this->info("Building {$project}!");
})->describe('Build the project');
```

## Defining Input Expectations

Khi viết lệnh console, thường thu thập dữ liệu đầu vào từ người dùng thông qua các đối số hoặc tùy chọn. Laravel làm cho nó rất thuận tiện để xác định đầu vào mà bạn mong đợi từ người dùng bằng cách sử dụng signature. Thuộc tính signature cho phép bạn xác định tên, đối số và tùy chọn cho lệnh theo một cú pháp đơn, `expressive`, `route-like` syntax.

## Arguments

Tất cả các đối số và tuỳ chọn nhận được từ người dùng sẽ phải nằm trong cặp dấu ngoặc nhọn. Ở ví dụ dưới đây, câu lệnh khai báo một đối số cần thiết: `user`:
```
/**
 * The name and signature of the console command.
 *
 * @var string
 */
protected $signature = 'email:send {user}';
```
Bạn cũng có thể đặt đối số này là tuỳ chọn và cài đặt giá trị mặc định:
```
// Optional argument...
email:send {user?}

// Optional argument with default value...
email:send {user=foo}
```

### Option 

Tuỳ chọn, như đối số, cũng là một kiểu nhập vào từ người sử dụng nhưng chúng có tiền tố là hai dấu gạch ngang (`--`) khi được viết. Chúng ta có thể khai báo tuỳ chọn trong `signature` như sau:
```
/**
 * The name and signature of the console command.
 *
 * @var string
 */
protected $signature = 'email:send {user} {--queue}';
```

Ở ví dụ này, tuỳ chọn `--queue` có thể được chỉ định khi thực hiện gọi câu lệnh. Nếu như `--queue` được gọi, thì giá trị của tuỳ chọn này sẽ là `true`. Ngược lại, giá trị sẽ là `false`:
```
php artisan email:send 1 --queue
```

### Options With Values

Bạn cũng có thể điều chỉnh sao cho tuỳ chọn phải được gán với một giá trị bởi người dùng thông qua việc sử dụng kí hiệu `=` để cho biết là cần yêu cầu có dữ liệu nhập vào:
```
/**
 * The name and signature of the console command.
 *
 * @var string
 */
protected $signature = 'email:send {user} {--queue=}';
```
Trong ví dụ này, người sử dụng có thể truyền vào một giá trị cho tuỳ chọn:
```
php artisan email:send 1 --queue=default
```
Bạn cũng có thể gán giá trị mặc định cho tuỳ chọn:
```
email:send {user} {--queue=default}
```
### Option Shortcuts
Để thiết lập một shortcut khi khai báo tuỳ chọn, bạn có thể thêm vào tên của `shortcut` ngay trước tên của tuỳ chọn và dùng dấu | để ngăn cách:
```
email:send {user} {--Q|queue}
```
###  Input Arrays
Nếu bạn muốn đối số hay tuỳ chọn của dữ liệu đầu vào là một mảng, sử dụng dấu `*`:
```
email:send {user*}
```
#### Input Descriptions
Bạn có thể gán mô tả cho các đối số và tùy chọn đầu vào bằng cách tách tham số khỏi mô tả bằng dấu : Nếu bạn cần thêm một chút chỗ để xác định lệnh của mình, vui lòng trải rộng định nghĩa trên nhiều dòng:
```
/**
 * The name and signature of the console command.
 *
 * @var string
 */
protected $signature = 'email:send
                        {user : The ID of the user}
                        {--queue= : Whether the job should be queued}';
                            
```
# Command I/O

### Retrieving Input

Trong khi lệnh của bạn đang thực thi, rõ ràng bạn sẽ cần truy cập các giá trị cho các đối số và tùy chọn được lệnh của bạn chấp nhận. Để làm như vậy, bạn có thể sử dụng argument and option `methods`:
```
/**
 * Execute the console command.
 *
 * @return mixed
 */
public function handle()
{
    $userId = $this->argument('user');

    //
}
```

Nếu bạn cần truy xuất tất cả các đối số dưới dạng một mảng, hãy gọi phương thức đối số:
```
$arguments = $this->arguments();
```
Khi câu lệnh được thực thi, rõ ràng là chúng ta cần lấy được giá trị của các đối số và tuỳ chọn được nhận vào câu lệnh. Để làm được điều này, bạn cần sử dụng tới phương thức `argument` và `option`:

```
// Retrieve a specific option...
$queueName = $this->option('queue');

// Retrieve all options...
$options = $this->options();
```

Nếu đối số hoặc tùy chọn không tồn tại, null sẽ được trả về.

### Prompting For Input
Ngoài việc hiển thị đầu ra, bạn cũng có thể yêu cầu người dùng cung cấp đầu vào trong quá trình thực thi lệnh của bạn. Phương thức hỏi sẽ nhắc người dùng với câu hỏi đã cho, chấp nhận đầu vào của họ và sau đó trả lại đầu vào của người dùng về `command` của bạn:

```
/**
 * Execute the console command.
 *
 * @return mixed
 */
public function handle()
{
    $name = $this->ask('What is your name?');
}
```

Phương thức secret tương tự `ask`, nhưng đầu vào của người dùng sẽ không hiển thị với họ khi họ nhập vào bảng điều khiển. Phương pháp này hữu ích khi yêu cầu thông tin nhạy cảm như mật khẩu
```
$password = $this->secret('What is the password?');
```
### Asking For Confirmation

Nếu bạn đơn giản chỉ cần một xác nhận từ người sử dụng, bạn có thể sử dụng phương thức `confirm`. Mặc định thì phương thức này trả lại giá trị `false`. Tuy nhiên, nếu người dùng nhập vào `y` thì phương thức sẽ trả về `true`.
```
  if ($this->confirm('Do you wish to continue?')) {
    //
}
```
### Auto-Completion

 Phương pháp dự đoán có thể được sử dụng để cung cấp `auto-complete`  cho các lựa chọn có thể. Người dùng vẫn có thể chọn bất kỳ câu trả lời nào, bất kể gợi ý hoàn thành tự động:
```
$name = $this->anticipate('What is your name?', ['Taylor', 'Dayle']);
```

#### Multiple Choice Questions

Nếu bạn cần cung cấp cho người dùng một bộ lựa chọn được xác định trước, bạn có thể sử dụng phương pháp lựa chọn. Bạn có thể đặt  giá trị mặc định được trả về nếu không có tùy chọn nào được chọn:

```
 $name = $this->choice('What is your name?', ['Taylor', 'Dayle'],$defaultIndex);
```
    
#### Writing Output
Để gửi đầu ra đến `console`, use the `line`, `info`, `comment`, `question` and `error` methods. Mỗi phương thức này sẽ sử dụng  ANSI thích hợp cho mục đích của chúng. Ví dụ: hãy hiển thị một số info chung cho người dùng.  Thông thường, phương thức `info` sẽ hiển thị trong bảng điều khiển dưới dạng văn bản màu xanh lá cây:

```
    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Display this on the screen');
    }
```


Để hiển thị một thông báo lỗi, sử dụng phương pháp `error`. Văn bản thông báo lỗi thường được hiển thị màu đỏ:
```
    $this->error('Something went wrong!');
```
 Nếu bạn muốn hiển thị đầu ra giao diện điều khiển đơn giản, không màu, hãy sử dụng phương `line`:
```
  $this->line('Display this on the screen');
```
    
### Table Layouts
Phương thức `table` sẽ dễ dàng định dạng chính xác nhiều rows / columns of data.. Chỉ cần truyền vào các tiêu đề hàng. Chiều rộng và chiều cao sẽ được tính toán linh hoạt dựa trên dữ liệu đã cho:
```
$headers = ['Name', 'Email'];

$users = App\User::all(['name', 'email'])->toArray();

$this->table($headers, $users);
```

### Progress Bars
Với các tác vụ chạy lâu, thì việc sử dụng một thanh tiến trình khá là hữu ích. Sử dụng output, chúng ta có thể khởi tạo, chạy tiến trình và dừng thanh tiến trình. Bạn có thể khai báo số lượng steps khi bắt đầu tiến trình và thực hiện chạy:
```
$users = App\User::all();

$bar = $this->output->createProgressBar(count($users));

foreach ($users as $user) {
    $this->performTask($user);

    $bar->advance();
}

$bar->finish();
```
    
### Registering Commands

Do  gọi phương thức tải trong phương thức lệnh kernel's commands method, tất cả các lệnh trong thư mục app/Console/Commands  sẽ tự động được đăng ký với Artisan. Trong thực tế, bạn có thể tự do thực hiện các cuộc gọi bổ sung cho phương thức tải để quét các thư mục khác cho các lệnh Artisan:
```
/**
 * Register the commands for the application.
 *
 * @return void
 */
protected function commands()
{
$this->load(__DIR__.'/Commands');
$this->load(__DIR__.'/MoreCommands');

// ...
}
```
Bạn cũng có thể đăng ký các lệnh theo cách thủ công bằng cách thêm tên lớp của nó vào thuộc tính l$commands property of your app/Console/Kernel.php file.. Khi Artisan khởi động, tất cả các lệnh được liệt kê trong thuộc tính này sẽ được giải quyết  và được đăng ký với Artisan:
```
protected $commands = [
    Commands\SendEmails::class
]
```

## Programmatically Executing Commands

Đôi lúc bạn muốn thực thi một câu lệnh Artisan nằm ngoài CLI. Ví dụ, bạn muốn gọi một câu lệnh Artisan từ một route hay controller. Bạn có thể sử dụng `call` trong `Artisan` facade để thực hiện việc này. Phương thức `call` nhận tên của câu lệnh vào trong đối số đầu tiên, và một mảng danh sách các tham số thực thi câu lệnh ở đối số thứ hai. Mã kết quả thực thi sẽ được trả lại:
```
Route::get('/foo', function () {
    $exitCode = Artisan::call('email:send', [
        'user' => 1, '--queue' => 'default'
    ]);

        //
    });
```
Khi sử dụng `queue` trên `Artisan` facade, thì bạn của thể thực hiện câu lệnh trên hàng đợi và chúng sẽ được thực hiện ở background bởitrong ứng dụng của bạn:
```
Route::get('/foo', function () {
    Artisan::queue('email:send', [
        'user' => 1, '--queue' => 'default'
    ]);

    //
});
```
Nếu bạn cần chỉ rõ giá trị của tuỳ chọn không nhận kiểu string, ví dụ `--force` trong câu lệnh `migrate:refresh`, bạn có thể truyền vào giá trị boolean `true` hay `false`:
```
$exitCode = Artisan::call('migrate:refresh', [
    '--force' => true,
]);
```
#### Passing Array Values
Nếu lệnh của bạn xác định một tùy chọn chấp nhận một mảng, bạn có thể chuyển một mảng các giá trị cho tùy chọn đó:

```
    Route::get('/foo', function () {
    $exitCode = Artisan::call('email:send', [
        'user' => 1, '--id' => [5, 13]
    ]);
});
```

#### Passing Boolean Values

Nếu bạn cần chỉ định giá trị của một tùy chọn không chấp nhận giá trị chuỗi --force flag on the migrate:refresh command, bạn sẽ truyền  đúng hoặc sai:
```
$exitCode = Artisan::call('migrate:refresh', [
    '--force' => true,
]);
```

### Calling Commands From Other Commands

Đôi lúc bạn muốn thực thi gọi câu lệnh từ một câu lệnh Artisan khác. Bạn có thể sử dụng phương thức `call` với tên câu lệnh và danh sách các tham số truyền vào:
```
/**
 * Execute the console command.
 *
 * @return mixed
 */
public function handle()
{
    $this->call('email:send', [
        'user' => 1, '--queue' => 'default'
    ]);

    //
}
```
Nếu bạn muốn thực thi một câu lệnh và chặn không muốn hiển thị nội dung của nó ra ngoài, bạn có thể dùng `callSilent`. Phương thức này sử dụng tương tự `call`:
```
$this->callSilent('email:send', [
    'user' => 1, '--queue' => 'default'
]);
 ```

Bài viết của mình đến đây là hết hẹn gặp lại các bạn ở các bài viết tiếp theo. :)

Tài liệu tham khảo:

https://en.wikipedia.org/wiki/Laravel

https://laravel.com/docs/5.8/artisan