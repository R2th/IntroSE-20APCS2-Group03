Khi mới làm quen với framework Laravel, tôi cũng như bạn rất ngạc nhiên khi biết có một công cụ dòng lệnh. Nhất là những người dùng hệ điều hành window như tôi. Đầu tiên chưa quen thấy ghét ghét nhưng càng về sau tôi lại thấy nó khá hữu ích,  nó thật sự xuất sắc khi xử lý các công việc mang tính thủ công bằng cách tự động hóa chúng.
# 1. Artisan là gì ?
> An artisan is a skilled craft worker who makes or creates things by hand that may be functional or strictly decorative - Theo wikipedia 

Còn trong Laravel thì  Artisan là giao diện command-line được thêm vào Laravel. Nó cung cấp một số lệnh hữu ích mà có thể hỗ trợ bạn trong khi xây dựng ứng dụng của mình. Để xem danh sách tất cả các lệnh Artisan có sẵn, bạn có thể sử dụng lệnh `list` để xem toàn bộ cú pháp với `Artisan`.
# 2. Tự Tạo Câu Lệnh
Chắc hẳn đối với ai làm việc với Laravel điều quen thuộc vào lệnh ` php artisan db:seed`.Nó dùng để `seed` dữ liệu vào `DB`. Nhưng hôm nay không dùng cái này nữa. Tôi sẽ tự tạo câu lệnh để `seed` dữ liệu vào `DB`.

Để tạo ra một command mới, sử dụng lệnh của Artisan make:command. Lệnh này sẽ tạo ra một command class trong app/Console/Commands. Đừng lo lắng nếu thư mục này không tồn tại trong ứng dụng của bạn, vì nó sẽ được tạo ra khi lần đầu tiên bạn chạy câu lệnh Artisan make:comand. Các command này được tạo ra sẽ bao gồm các thiết lập mặc định của properties và methods có mặt trên tất cả các command.
```
php artisan make:command UserCommand
```
Mở file UserCommand.php lên ta sẽ thấy cấu trúc class như sau 
```
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UserCommand extends Command
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
Giả thích qua một chút:
Các tham số cho câu lệnh Artisan được định nghĩa trong thuộc tính `signature`. Thuộc tính này cho phép bạn định nghĩa tên câu lệnh, tham số và các tùy chọn. Các tham số được định nghĩa trong hai dấu ngoặc nhọn {parameter}. Chúng ta cũng có thể mặc định giá trị ban đầu cho các tham số.
```
protected $signature = 'user:insert {numberOfUser=1}'
```
Ví dụ ta chạy lệnh php artisan user:insert  10 thì sẽ tạo ra 10 user.
Vậy làm sao câu lệnh `php artisan  user:insert` có thể insert được dữ liệu vào cơ sở dữ lệnh. Mấu chốt vấn đề nằm ở `handle()`,  trong `function` `handle()` ta xử lí như sau.
```

public function handle()
{
    $numberOfUser = $this->argument('numberOfUser');
    if($this->confirm('Are you sure create user?')) {
        $faker = Faker\Factory::create();
        try {
            for ($i=0; $i < $numberOfUser; $i++) { 
                DB::table('users')->insert([
                    'name'         => $faker->name,
                    'email'        => $faker->unique()->email,
                    'password'     =>  Hash::make('123456')
                    ]);
            }
            $this->info($numberOfUser  . 'user create success');
        } catch (Exception $e) {
            $this->error('Error ' . $e . ' when create users.');
        }
    }
}

```
Nhớ khai báo thêm `use Faker` `use Hash` `use DB` trên class nhé!!!
Tiếp theo, để sử dụng được câu lệnh này chúng ta cần đăng ký nó trong app\Console\Kernel.php trong thuộc tính `commands`:

```
    protected $commands = [
        Commands\UserCommand::class,
    ];

```

Thực hiện liệt kê danh sách các lệnh artisan xem đã có chưa? 
```
php artisan list
....
 user
  user:insert     Create an user by Nguyen Huu Su
....
```

   OK, bước theo là config tên `DB` trong file .`env` và chạy migrate để tạo bảng `users` trong `DB`
   Xong rồi thì mở comand line lên và chạy lệnh `php artisan user:insert 10`.
   ```
   php artisan user:insert 10

 Are you sure create user? (yes/no) [no]:
 > yes  

10 user create success

   ```
   Lên `DB` vào bảng `users` kiểm tra kết quả bạn sẽ thấy được 10 trường được thêm vào bảng. Done !
   # 3. Tổng Kết 
   Laravel Artisan giúp cho các công việc phần backend dễ chịu hơn rất nhiều, chúng ta hoàn toàn có thể tạo ra những câu lệnh thực hiện các kịch bản giúp việc viết code hoặc quản trị website. Có thể nói Laravel Artisan là một ý tưởng rất hay, một công cụ giúp cho framework Laravel đang tạo ra sự khác biệt so với các framework khác. Cũng có thể do Taylor Otwell, người phát triển ra framework Laravel là một lập trình viên lâu năm của .NET được sử dụng công cụ Microsoft Visual Studio quá tiện lợi, muốn đưa luồng gió đó vào với ngôn ngữ PHP. Chúng ta hãy cùng chờ xem, liệu Laravel còn những cái gì khác khiến chúng ta phải trầm trồ.