Nếu bạn đã làm việc với framework Laravel thì chắc hẳn bạn có sử dụng đến Artisan rồi, Ở bài này chúng ta sẽ tìm hiểu rõ hơn về artisan và các ứng dụng của nó.
# Laravel Artisan là gì ?
Laravel artisan là một công cụ dòng lệnh được tích hợp sãn trong các project laravel được xây dựng dựa trên component Symfony Console, nó cung cấp rất nhiều các chức năng hữu ích như xử lý các công việc thủ công bằng việc tự động hóa chúng  giúp việc xây dự án dễ dàng hơn, giảm thời gian viết code.

Các công dụng cơ bản của laravel artisan gồm:
* Thao tác với cơ sở dữ liệu: tạo model, migrate, thêm dữ liệu vào db ...
* Thao tác với queue, schedule
* Thao tác tạo route, controller, event ...
* Tạo key mã hóa, tạo Auth, tạo command...
* Chạy các công cụ ngoài như Tinker, hoặc cho phép người dùng tạo ra các công cụ tùy thích.
* ...

Sử dụng câu lệnh `php artisan list` để xem danh sách các câu lệnh hỗ trợ bởi Artisan:

![](https://images.viblo.asia/29e8ca41-9fe8-471f-ae4b-e21b9601deca.png)

Mỗi câu lệnh đều có kèm theo một màn hình trợ giúp để hiển thị và mô tả những đối số và tuỳ chọn có thể sử dụng. Để xem màn hình trợ giúp chỉ cần gõ tên câu lệnh kèm theo từ khoá help:

`php artisan help migrate`
# Một số câu lệnh cơ bản
Tạo file migration
`php artisan make:migration`

Chạy các file migration để tạo databasse
`php artisan migration`

Tạo model
`php artisan make:model`

Generate key mã hóa
`php artisan key:generate`

Tạo request để validate dữ liệu
`php artisan make:request`
...

Trên đây là 1 số lệnh cơ bản, toàn bộ lệnh artisan bạn có thể xem bằng lệnh `php artisan list`


# Tạo câu lệnh Artisan
Để tạo lệnh mới, chúng ta sẽ dùng lệnh make:command của Artisan, nó sẽ tạo ra một class có các khung mã nguồn cơ bản cho câu lệnh này và lưu trong app/Console/Commands

`php artisan make:command RemindToChatwork`

Câu lệnh trên sẽ tạo một class tại app/Console/Commands/RemindToChatwork.php. Khi tạo một câu lệnh, tuỳ chọn --command có thể được gán giá trị trên màn hình terminal:

`php artisan make:command RemindToChatwork --command=remind:send`

Chạy lệnh `php artisan list` sẽ thấy command này.

![](https://images.viblo.asia/919a09b7-42bd-4e1f-b402-88201ecebb6b.png)

# Cấu trúc câu lệnh
Khi mà câu lệnh được tạo ra, cần điền vào thông tin của hai thuộc tính signature và description trong class, vì chúng sẽ được dùng để hiển thị khi chạy câu lệnh php artisan list

Ta có thể truyền bất cứ dependencies nào mà chúng ta cần vào trong hàm khởi tạo của câu lệnh. Laravel service container sẽ tự động truyền tất cả các dependencies được đánh dấu trong hàm khởi tạo. 

``` php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RemindToChatwork extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'remind:send';

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
     * @return int
     */
    public function handle()
    {
        return 0;
    }
}
```

Function handle sẽ được gọi khi mà câu lệnh được thực thi. Có thể viết logic tuỳ ý trong phương thức này.

Sửa code trong function handle thử chạy command này bằng lệnh `php artisan remind:send` xem có thực thi doe trong handle hay không.

![](https://images.viblo.asia/3a66e227-bd84-4575-81b4-f25acf4806fa.png)

Vậy là đã thực thi code rồi.

# Định nghĩa các tham số và tùy chọn cho câu lệnh Artisan
Artisan định nghĩa các tham số trong thuộc tính $signature. Thuộc tính này dùng để định nghĩa tên câu lệnh, tham số và các tùy chọn. Các tham số được định nghĩa trong cặp dấu ngoặc nhọn {parameter}. Có thể định nghĩa tham số mặc định.

![](https://images.viblo.asia/4c82df1b-c6a0-435d-a51c-a4bff51e8953.png)

Sau đó khi run command ta có thể truyền tham số vào,

ví dụ : `php artisan remind:send Thinh 10`

Trong function handle ta nhận tham số và các tùy chọn như sau
```
public function handle()
{
    // Lấy tham số dạng người dùng
    $userType = $this->argument('userName');
    // Lấy tất cả các tham số
    $arguments = $this->arguments();
    // Lấy tùy chọn
    $isQueue = $this->option('optionName');
    // Lấy tất cả các tùy chọn
    $options = $this->options();
}
```
# Kết bài
Qua bài này ta biết những điều cơ bản về laravel artisan và biết được nó là một công cụ rất hữu ích. Cảm ơn và hẹn mọi người ở bài tiếp theo.