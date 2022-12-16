Nếu đã từng làm project bằng Laravel thì chắc hẳn các bạn đã từng nghe về cái tên Artisan hoặc ít nhất thì cũng từng chạy các câu lệnh như `php artisan make:controller UsersController`, `php artisan migration`, `php artisan serve`... Vậy thực chất nó là gì? Qua bài viết này, mình mong rằng các bạn sẽ hiểu thêm về Laravel Artisan và có thể tự tạo được câu lệnh Artisan cho riêng mình. Bắt đầu thôi =))) 
# 1. Giới thiệu
Theo mình tìm hiểu thì **Artisan**  là giao diện dòng lệnh (command-line interface) đi kèm với Laravel được xây dựng dựa trên component Symfony Console. Nó cũng cấp cho chúng ta hàng loạt các chức năng hữu ích như xử lý các công việc thủ công bằng việc tự động hóa chúng như sinh key mã hóa, thao tác với database (migrate, seed...), tạo các template theo các mẫu khác nhau như Model, Controller, Event... từ đó rút ngắn được thời gian và tăng năng suất công việc, rất xứng đáng với cái tên của nó. Để xem danh sách các câu lệnh được hỗ trợ, bạn có thể sử dụng câu lệnh:
```
php artisan list
```

Mỗi câu lệnh đều có các tham số và tùy chọn đi kèm, để hiển thị chi tiết về câu lệnh chỉ cần để trước tên của lệnh từ khóa `help`. Ví dụ mình muốn tìm hiểu về lệnh `db:seed` thì sẽ dùng câu lệnh sau
```
php artisan help db:seed
```

# 2. Tạo câu lệnh 
Như mình đã nói ở trên, Artisan cung cấp cho chúng ta rất nhiều câu lệnh hữu ích nhưng nếu từng đó chưa đủ để phục vụ mục đích của bạn thì bạn cũng có thể tự tạo ra các câu lệnh phục vụ cho mục đích riêng của mình. Để tạo lệnh mới, chúng ta sẽ dùng lệnh `make:command` của Artisan, nó sẽ tạo ra một class cho câu lệnh này và lưu trong `app/Console/Commands`. Trong ví dụ dưới đây, chúng ta sẽ tạo ra câu lệnh để tạo ra một hoặc nhiều tài khoản có quyền admin hoặc không.

## Cấu trúc file Command
Đầu tiên chúng ta tạo `AccountCommand` bằng lệnh `php artisan make:command AccountCommand`. File AccountCommand.php sẽ được tạo ra trong folder Commands với nội dung như sau:

```
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AccountCommnad extends Command
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

Có 3 thứ cần chú ý ở đây đó là:

## Angruments và Options
Laravel cho phép khai báo tên, đối số, tùy chọn của câu lệnh thông quan biến signature dưới dạng một giá trị, biểu thức hay cú pháp. Tất cả đối số và tùy chọn đều phải đặt trong cặp dấu ngoặc nhọn.

```
protected $signature = 'create:account {username} {--admin}
```

Trong ví dụ này, tùy chọn `--admin` có thể được gọi khi chạy câu lệnh. Nếu như `--admin` được gọi thì giá trị của tùy chọn này là `true` còn nếu không thì sẽ là `false`.

```
php artisan create:account admin --admin
```

Các tùy chọn khác khi khai báo:
- Optional: `create:account {username?}`
- Default value: `create:account {username=defaultValue}`
- Shortcut: `create:account {username} {--admin|a}` ví dụ: `php artisan create:account admin -a`
- Array input: `delete:account {--id=*}` ví dụ: `php artisan delete:account --id=1 --id=2`
- Required option: `delete:account {--id=}
- Boolean option: `create:account --admin`

Bạn cũng có thể thêm mô tả cho đối số hoặc tùy chọn khi khai báo $signature để cho người khác khi dùng có thể biết được các tham số và tùy chọn đó được sử dụng với mục đích gì.
```
protected $signature = 'create:account 
                        {username: Tên tài khoản}
                        {--admin: Tạo tài khoản với quyền admin}';
```

## Description 

`protected $description = 'Command description';`

Biến $description giúp bạn thêm mô tả về câu lệnh của mình và sẽ hiển thị khi người dùng gõ lệnh `php artisan list` hay `php artisan help`
```
command
  command:name         Command description
```

## Xử lý logic

Hàm `handle()` sẽ được gọi mỗi khi command của bạn được thực hiện thế nên bạn có thể xử lý dữ liệu ở trong hàm này. Để lấy dữ liệu mà chúng ta đã nhập ở command-line Laravel cung cấp phương thức argument() để lấy tham số và option() để lấy tùy chọn. Ví dụ:
```
 /**
   * Execute the console command.
   *
   * @return mixed
   */
   public function handle()
   {
        // Lấy tham số username
        $username = $this->argument('username');
        // Lấy tất cả tham số, giá trị trả về sẽ là một mảng
        $arguments = $this->arguments();
        // Lấy tùy chọn id
        $id = $this->option('id);
        // Lấy tất cả tùy chọn, giá trị trả về sẽ là một mảng
        $options = $this->options();
   }
```

Đã bao giờ bạn cài một chương trình qua command-line và trong quá trình cài phải trả lời các câu hỏi như "Press enter to keep the default[], or type selection number:" hay "Do you wish to continue? [y|N]"? Laravel Artisan cũng cung cấp cho chúng ta các tùy chọn như vậy, ví dụ:

Lấy giá trị thông qua input từ người dùng:
```
$username = $this->ask('Username: ');
```

Câu hỏi không hiển thị nội dung khi nhập:
```
$password = $this->secret('Password: ');
```

Câu hỏi xác nhận Yes/No:
```
if ($this->confirm('Do you wish to continue? [y|N]')) {
    //
}
```

Câu hỏi lựa chọn:
```
$gender = $this->choice('What is your gender?, ['Male', 'Female'], $default);
```

# 3. Đăng ký câu lệnh
Đăng ký câu lệnh vừa tạo với Artisan bằng cách thêm tên class vào thuộc tính `$commands` trong `app/Console/Kernel.php`. Khi Artisan khởi động, tất cả các kệnh được liệt kê trong danh sách sẽ được service container giải quyết và đăng ký với Artisan:
```
protected $commands = [
    Commands\AccountCommand::class
];
```

Trong trường hợp class khai báo câu lệnh không nằm trong thư mục Commands mà nằm trong thư mục AccountCommands thì khai báo như sau:
```
/**
 * Register the commands for the application.
 *
 * @return void
 */
protected function commands()
{
    $this->load(__DIR__.'/Commands');
    $this->load(__DIR__.'/AccountCommands');

    // ...
}
```

Trên đây là những gì mình tìm hiểu được về Artisan và cách tạo các câu lệnh tùy chọn cho nó. Mong rằng qua bài viết này sẽ giúp các bạn hiểu được thêm về artisan và tạo được các câu lệnh cho riêng mình. Nếu có thắc mắc gì thì các bạn hãy để lại comment phía dưới cho mình nhé!!

# 4. Tài liệu tham khảo
https://laravel.com/docs/5.8/artisan