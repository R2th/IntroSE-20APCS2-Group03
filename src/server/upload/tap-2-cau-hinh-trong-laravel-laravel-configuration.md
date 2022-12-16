Chào mừng các bạn đã quay trở lại, trong tập này mình sẽ nói về cấu hình trong Laravel và hướng dẫn các bạn cách để thao tác với nó. Nào, bắt đầu thôi!

# I. Cấu hình môi trường (Environment configuration)

Các thao tác về cấu hình môi trường ta thường xoay quay ở file `.env` và các file ở thư mục `config`.

## 1. Lấy cấu hình môi trường (Retrieving environment configuration)

Để lấy các thiết lập từ file `.env` chúng ta sử dụng hàm `env()`.

**Ví dụ:** Lấy cấu hình của `APP_DEBUG` trong `.env` để setup cho `config/app.php`

```PHP:config/app.php
'debug' => env('APP_DEBUG', false)
```

Trong hàm `env()`:

* Tham số đầu tiên chính là tên của cấu hình môi trường.
* Tham số thứ hai chính là giá trị mặc định (default value), hàm `env()` sẽ trả về giá trị này nếu không tồn tại cấu hình môi trường ở tham số đầu tiên. Trong trường hợp này, nếu file `.env` không có `APP_DEBUG` thì hàm `env('APP_DEBUG', false)` sẽ trả về `(bool) false`.

## 2. Xác định môi trường hiện tại (Determining current environment)

Chúng ta sẽ sử dụng phương thức `environment` từ `App` facade:

```PHP
$currentEnv = App::environment() // (string)
```

Phương thức trên có thể nhận một tham số là `(string)` hoặc `(array)` cho phép chúng ta kiểm tra môi trường hiện tại:

 ```PHP
 if (App::environment('local')) { 
    // This is local environment
}

if (App::environment(['local', 'production']) {
    // This is local enviroment or product environment
}
```

## 3. Ẩn biến môi trường từ trang debug (Hiding environment variables form debug page)

Giả sử tôi mắc phải một lỗi nào đó khi request, trong request đó có một trường `password` quan trọng. Đây là đoạn code để test ở file `routes/web.php`:

```PHP:routes/web.php
Route::get('/', function () {
    $_POST['password'] = '123456';

    echo $f;
});
```

Như bạn thấy, tôi đã set một giá trị cho `$_POST['password']` và ở dưới tôi đã code lệnh `echo` một biến chưa được xác định (underfined variable).

Bây giờ tôi nạp server và chạy thử trên trình duyệt, một debug page hiện ra, báo lỗi về đoạn code trên. Các bạn roll chuột xuống phía dưới ở cột bên phải, bạn sẽ thấy ngay ở **Post Data**, trường `password` của chúng ta đã bị lộ.

![](https://images.viblo.asia/aa480505-08db-4071-8f8c-ab3558dca1be.JPG)

Thông thường thì password khi code sẽ được mã hóa nhưng đây cũng là một vấn đề đáng quan ngại, vậy có cách nào để khắc phục không? Laravel cung cấp cho chúng ta config `debug_blacklist` giúp giải quyết vấn đề này.

Tại file `config/app.php`, hãy thêm đoạn code này và quay lại trang debug:

```PHP:config/app.php
'debug_blacklist' => [
    '_ENV' => [
        'APP_KEY',
        'DB_PASSWORD',
    ],

    '_SERVER' => [
        'APP_KEY',
        'DB_PASSWORD',
    ],

    '_POST' => [
        'password',
    ],
]
```

Khi quay lại trang debug chúng ta thấy password đã được mã hóa.

![](https://images.viblo.asia/0cc46f3a-5113-43ae-9e08-ec32b03811f7.JPG)

> **Lưu ý:** Một vài biến có sẵn có cả trong biến môi trường và biến máy chủ/request, chính vì thế khi muốn blacklist biến nào thì phải thêm ở cả `_ENV` và `_SERVER`. Chẳng hạn ở đoạn code trên, tôi đã blacklist hai biến `APP_KEY` và `DB_PASSWORD`  ở `_ENV` và `_SERVER`.

# II. Truy cập giá trị cấu hình (Accessing Configuration Values)
Bạn có thể truy cập dễ dàng các giá trị của cấu hình thông qua hàm `config()`.

**Ví dụ:** Lấy giá trị của cấu hình timezone.

```PHP
$value = config('app.timezone');
```
Ngoài chức năng trên, hàm `config()` này có thể thay đổi giá trị của cấu hình mà không cần phải thao tác trên file `.env` hay bất kỳ file nào ở thư mục `config`:

```PHP
config(['app.timezone' => 'Asia/Ho_Chi_Minh']);
```
Để mình giải thích thêm về đoạn `app.timezone`, đây chính là tham số trỏ đến cấu hình `timezone` ở file `config/app.php`

![](https://images.viblo.asia/eb12543a-33e6-4a10-a889-2eb4753c8259.JPG)

Từ đó ta có thể rút ra được, để thao tác với bất kì cấu hình nào đã được khai báo, ta sẽ trỏ nó theo cú pháp `name_file_config.name_config`.

> **Lưu ý:** Bạn có thể tự tạo cho mình một file config, hoặc tự định nghĩa một config vào những file có sẵn, kể cả `.env` miễn bạn code theo đúng quy cách có sẵn.

# III. Cache cấu hình (Configuration Caching)

Laravel cung cấp một chức năng có thể cache những cấu hình đã thiết lập, tại commander bạn gõ lệnh

> php artisan config:cache

Khi thực thi lệnh này, dù bạn có thay đổi gì ở file `.env` hay các file config thì các giá trị cấu hình vẫn giữ nguyên. Chức năng này dùng khi bạn chuẩn bị deloy dự án của mình.

Nếu bạn muốn thay đổi, có thể dùng lệnh bên dưới để xóa cache:

> php artisan cache:clear

Mình sẽ dừng lại phần này ở đây, ta có thể tìm hiểu sâu hơn khi tới tập *"Cache Laravel"*.

# IV. Chế độ bảo trì (Maintenance mode)

Đôi khi hệ thống bạn cũng cần được bảo trì, để làm điều này chỉ cần chạy lệnh:

> php artisan down

Khi chạy lại hệ thống, sẽ trả về một trang lỗi với mã 503. 

Bạn có thể cung cấp một thông báo đến hệ thống kèm theo thời gian quay trở lại với lệnh sau:

> php artisan down --message="Maintenancing..." --retry=3600

Tham số `retry` sẽ tính theo đơn vị giây.

Trong khi bảo trì bạn có thể cho phép một số địa chỉ IP cụ thể để có thể truy cập vào hệ thống.

> php artisan down --allow=127.0.0.1 --allow=192.168.0.0/1

Khi quá trình bảo trì đã hoàn tất, bạn có thể khởi động lại với lệnh:

> php artisan up

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ