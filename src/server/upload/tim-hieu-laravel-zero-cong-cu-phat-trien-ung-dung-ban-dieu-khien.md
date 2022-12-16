# Laravel Zero là gì? 

Một mã nguồn mở PHP Framework được xây dựng dựa trên các thành phần của Laravel. nó nhẹ và moduls để phát triển các console-application nhanh và mạnh mẽ. Được phát triển bới Nuno Maduro kỹ sư phần mềm tại Laravel.

Laravel Zero có cú pháp đơn giản cho phép các nhà phát triển xây dựng các ứng dụng rất phức tạp nhanh hơn nhiều so với bất kỳ khung công tác nào trước đây.

Bài viết này mình sẽ giới thiệu cũng như thực hiện một Project nhỏ trên HĐH ubuntu để mọi người cùng hiểu qua về nó nhé!.

-----



# Prerequisites 
Composer (mọi người tham khảo cách cài Composer [tại đây](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04)).

PHP là tất nhiên rồi ^^!.

Nhớ kiểm tra xem bạn đã cài modules PHP này chưa nhé
> - php-mbstring
> - php-xml

 để kiểm tra bạn gõ trên terminal : 
 
 `php -m `
   
  nếu chưa có thì cài như sau 
  
  `sudo apt install php-mbstring php-xml`


-----


# Installation
Tạo một project Laravel Zero tên "hello-word" (mọi người đổi tên cũng được nhé)

`composer create-project --prefer-dist laravel-zero/laravel-zero hello-world
`

Cài xong mọi người di chuyển vào thư mục đó 

`cd hello-word`

Tiếp tục mọi người chạy lệnh

`php aplication`

![](https://images.viblo.asia/82663f11-1a22-49fd-afe1-11b55816fab4.png)

Hiển thị như hình này là ok rồi nhá.

Mở folder "hello-word" lên bạn sẽ thấy cấu trúc thư mục như này

![](https://images.viblo.asia/5df0b3a0-aa43-4a79-a404-9b9a7ab07ae4.png)



-----


# Commands 
Để tạo một command, chạy lệnh

`php hello-world make:command HelloWorldCommand`

Mở file đã được tạo ra trong `app/Commands/HelloWorldCommand.php`

Sửa theo ý của bạn

```
class HelloWorldCommand extends Command
{
    protected $signature = 'command:hello'; // sửa lại theo tên lệnh mà bạn muốn khi gõ trên terminal

    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // trong đây viết những xử lý mà bạn cần
        echo "hello world"; 
    }
}
```


-----


# Configuration
Các tệp cấu hình cho ứng dụng Laravel Zero được lưu trữ bên trong thư mục `config`.
> - config/app.php: chứa một số thông tin cho ứng dụng của bạn
> - config/commands.php: bạn có thể định cấu hình danh sách các lệnh mặc định trong đây


Ở đây mình sẽ tạo một file config riêng lưu lại messages

`touch config/hello.php`

```
<?php
    return [
        'hello_world' => 'HELLO WORLD',
    ];
```
Lúc này bạn đã có 1 file config của bạn, bạn có thể gọi nó ở bất cứ đâu theo cách gọi giống với Laravel

```
config('hello.hello_word')
```


-----


# Addons
Laravel Zero đảm bảo cho project của bạn nhẹ nhất có thể nên sẽ để bạn tự cài những phần bổ trợ mà bạn cần dùng.

`php application app:install`

![](https://images.viblo.asia/3eac8d3c-dc1f-431d-8219-350b2d96cd0c.png)

Lúc này nó sẽ hiển thị các phần bổ trợ, bạn có thể chọn. Ở hình này mình cài `dotenv`



-----


# Logging

Tương tự như ở trên, để sử dụng Log bạn chạy lệnh sau:

`php application app:install log`

![](https://images.viblo.asia/18112cd2-fa65-40fb-b247-2bdb24d32e5b.png)

Sau khi cài thành công bạn có thể sử dụng tương tự như Larvel

Ví dụ: trong file `commands/HelloWorldCommand.php` sửa lại hàm `handle()` như sau:
```
  public function handle()
    {
        Log::info(config('hello.hello_word'));
   }
```

-----



# Database
Tương tự như ở trên, để sử dụng được Eloquent giống như Laravel bạn cần chạy lệnh sau

`php application app:install database`


![](https://images.viblo.asia/ead603f1-11b8-4f49-9528-15a6e24ea296.png)

Thao tác này sẽ thêm tệp cấu hình mới cho bạn tại `config/database.php`, bạn có thể định cấu hình chi tiết cơ sở dữ liệu của mình. Theo mặc định, nó sử dụng SQLite nên bạn không cần thực hiện bất kỳ thay đổi nào trừ khi bạn muốn sử dụng một công cụ SQL khác.

Mình sẽ sửa lại để kết nối với Mysql trên máy mình, vào thư mục `config/database.php` sửa lại những chỗ dưới đây như sau:

```
'default' => env('DB_CONNECTION', 'mysql'),
 ...
 'connections' => [
     ...,
     'mysql' => [
            ...
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'test'), // tên cơ sở dữ liệu
            'username' => env('DB_USERNAME', 'root'), 
            'password' => env('DB_PASSWORD', 'password'),
            ...
     ],
]
```

Tiếp theo tạo migrate bằng câu lệnh 

`php application make:migration users`

Vào thư mục `database/migrations/[thư_mục_vừa_được_tạo_từ_câu_lệnh_trên].php` sửa lại thành:

```
class Users extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('password');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}

```

Sau đó chạy lệnh để tiến hành migrate

`php application migrate`

Nào quay trở lại với file `app/HelloWorldCommand.php` ta sẽ test thử tý, sửa lại hàm `handle()` như sau:
```
 public function handle()
    {
        Log::info(config('hello.hello_word'));

        // tạo mới 1 user
        DB::table('users')->insert([
            'name' => 'Minh Pham ' . Date('H_i_s'),
            'password' => '1111'
        ]);

        // hien thi danh sach user
        Log::info(DB::table('users')->get());
    }
```
Sửa xong lưu lại nhé.

-----


# Building the application

Khi bạn đã sẵn sàng với việc xây dựng ứng dụng, bạn có thể chạy lệnh sau để tạo một tệp thực thi:

`php application app:build`  

Khi build nó sẽ hỏi version bạn muốn build, nhập version vào rồi enter tiếp tục nhé.
![](https://images.viblo.asia/acc59f88-5fe6-4d44-9c33-32dc2b34f1e9.png)


Xong !!! giờ thì chạy câu lệnh 

`php application` 

Để xem những lệnh mà bạn đã khởi tạo nào

![](https://images.viblo.asia/bbe6461f-20ef-4990-93c3-8ca79bc0e080.jpg)

Trong hình thì bạn thấy có thêm một lệnh `command:hello` , nó chính là lệnh mà mình đã tạo ra trong file `commands/HelloWorldCommand.php`

Tiếp tục chạy lệnh 

`php application command:hello`

và xem kết quả nhé!

# Lời kết

Bài viết này mình đã giới thiệu qua cho mọi người cách sử dụng Laravel Zero, còn nhiều cái hay mình sẽ giới thiệu mọi người ở bài sau nhé.
Cảm ơn mọi ngườiii !


-----