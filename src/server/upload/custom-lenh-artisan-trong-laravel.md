Hiện nay, với ngôn ngữ PHP thì framework Laravel là một trong những framework phổ biến nhất hiện nay. Có rất nhiều dự án sử dụng dụng Laravel để triển khai dự án vì những tính năng tuyệt vời của nó. Và lệnh Artisan là một trong những tính năng tuyệt vời đó. Mặc định thì Laravel cung cấp cho chúng ta một số lệnh cơ bản để chúng ta phát triển ứng dụng. Vậy làm sao chúng ta có thể tạo lệnh theo ý chúng ta, cùng tìm hiểu qua bài viết của mình nhé
<br>

![](https://images.viblo.asia/e896b942-ac9f-4a3c-a34f-670abbb3e3a3.jpg)

<br>
Artisan xây dựng dựa trên thành phần Symfony Console
<br>

Một số command cơ bản mà ứng dụng đã cung cấp cho chúng ta:
- Lấy tất cả các lệnh Artisan có sẵn:
```
php artisan list
```
- Khi bạn muốn được trợ giúp để biết về chi tiết về một command nào hay sử dụng, đối số và các options như thế nào, chúng ta có thể sử dụng command sau:
```
php artisan help command_name
```
ví dụ: Chúng ta muốn biết chi tiết về command migrate:
```
php artisan help migrate
```
Trên giao diện terminal sẽ hiển thị cho chúng ta chi tiết về command migrate
![](https://images.viblo.asia/045f76a0-d61c-47cf-b82f-6bf0f41a8491.jpg)
<br>
Các command thường sẽ được lưu ở thư mục `app/Console/Commands`. Tuy nhiên, bạn cũng có thể tùy chọn nơi bạn lưu lệnh command miễn là command của bạn được load bởi Composer, bạn cũng có thể cài đặt composer load trong file `composer.json`.
<br>
Để tạo một command mới chúng ta sử dụng lệnh Artisan `make:command` mà laravel đã cung cấp cho chúng ta. Command sau khi được tạo mới sẽ tạo một class mới được lưu trong thư mục `app/Console/Commands`. Nếu trong ứng dụng chưa có thư mục này thì sau khi tạo một command mới bằng lệnh Artisan `make:command` thì thư mục `app/Console/Commands` sẽ được tạo.
<br>
Sau khi tạo xong chúng ta vào file `kernel.php` để khai báo command
<br>
Chúng ta tạo command mới bằng lệnh sau:
```
php artisan make:command customCommand --command hello:name
```
Để biết chi tiết về lệnh `make:command` và các options của nó chúng ta sử dụng lệnh mà mình đã giới thiệu ở phần trên:
```
php artisan help make:command
```
![](https://images.viblo.asia/4aafe78a-611c-423d-9050-dfec97551191.jpg)
<br>
Như ở trong phần options của nó thì mình đã thêm option `--command hello:name` để gán tên command. Sau khi thực hiện lệnh tạo command trên chúng ta mở file `app/Console/Commands/CustomCommand.php` để sửa `signature` và `description` của command mà chúng ta tạo. 
<br>
Ở đây mình sẽ sửa lại như sau:
```php
...
protected $signature = 'hello:name {name?}';
...
protected $description = 'This is custom Artisan command';
...

public function handle()
{
    $name = $this->argument('name');
    $this->info("Hello $name, This is custom Artisan command");
}
```
fuction `handle()` sẽ được gọi khi chúng ta thực thi command. Ở đây mình sẽ lấy `name` mà khi chúng ta nhập vào khi thực thi command và hiển thị `Hello name, This is custom Artisan command`.
<br>
Sau đó chúng ta vào file `kernel.php` và thêm command của chúng ta:
```php
protected $commands = [
    Commands\CustomCommand::class,
];
```
<br>
Sau khi thực hiện các bước trên thì chúng ta kiểm tra lại xem command bằng `php artisan list`
<br>
Và để xem chi tiết về command chúng ta thực hiện:
```
php artisan help hello:name
```

![](https://images.viblo.asia/e26fd3ac-405a-44d0-b50f-eb6eadf927a5.jpg)

<br>
Cuối cùng chúng ta cùng chạy command mà chúng ta đã tạo nào:

```
php artisan hello:name Huynh
```

Kết quả sẽ hiển thị:

```
Hello Huynh, This is custom Artisan command
```