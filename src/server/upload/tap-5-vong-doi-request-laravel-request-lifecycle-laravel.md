Rất vui lại gặp được các bạn trong tập ngày hôm nay. Tập này chúng ta sẽ tìm hiểu về quá trình của một request được gửi đến Laravel framework. Nếu như bạn hiểu cách thức hoạt động của một công cụ nào đó thì bạn có thể sử dụng nó một cách tự tin và hiệu quả nhất, Laravel framework cũng vậy. Chính vì thế tập này khá quan trọng cho những bạn "chân ướt chân ráo" mới tìm hiểu về framework này.

> **Khuyến cáo:** Đây là một trong những phần Laravel nâng cao, chính vì thế sẽ gây khó hiểu, mất nghị lực, quyết tâm khi học. Mình khuyên bạn hãy đọc một lần, nếu thấy không thể tiếp thu thì có thể bỏ qua.  

# I. Mô hình vòng đời request Laravel (Request Lifecycle model Laravel)

Các bạn hãy quan sát mô hình vòng đời của một request khi được gửi đến trong Laravel framework:

![](https://images.viblo.asia/b4bce647-722e-4064-ac19-b7e9e0d0573e.png)

Bây giờ mình sẽ giải thích từng chốt chặn trong mô hình trên nhé!

# II. Khởi động (Bootstrap)

Đầu tiên từ phía client sẽ gửi một request (mũi tên màu xanh) đến file `public/index.php`, nó là đích đến của tất cả các request từ client. Dù code không nhiều nhưng nó là khởi nguyên cho framework.

Mở file `public/index.php` lên và xem code của nó, các bạn sẽ thấy nó làm 3 nhiệm vụ chính để bootstrap framework.

## 1. Đăng ký cơ chế autoload (Register the auto loader)

```PHP:public/index.php
/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our application. We just need to utilize it! We'll simply require it
| into the script here so that we don't have to worry about manual
| loading any of our classes later on. It feels great to relax.
|
*/

require __DIR__.'/../vendor/autoload.php';
```

Đây là đoạn code để đăng ký autoload, một thành phần không thể thiếu trong framework. Nếu bạn nào chưa biết về cái này thì mình xin giải thích đơn giản. Autoload sẽ giúp chúng ta khởi tạo các class mà không cần phải require/include các file chứa class đó.

Chẳng hạn bạn có một project với cấu trúc thư mục như sau:
```
myproject/
|   User.php
|   index.php
|   autoload.php
```

File `User.php` chứa class `User`:

```PHP
<?php

class User
{
    public function __construct()
    {
        echo "This is User object.";
    }
}

?>
```

Bây giờ tại file `index.php`, để gọi class `User` ra thì cách thông thường bạn sẽ làm như thế này:

```PHP
<?php

require_once 'User.php';

new User();

?>
```

Nhưng với autoload, thì bạn không cần phải require file `User.php` nữa, thay vào đó:

```PHP
<?php

require_once 'autoload.php';

new User();

?>
```

Đây chỉ là một example đơn giản cho cơ chế autoload, nếu chưa hiểu rõ các bạn có thể tìm hiểu thêm trên mạng.

# 2. Chuẩn bị để khởi động ứng dụng  (Prepare to bootstrap the application)
```PHP:public/index.php
/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We need to illuminate PHP development, so let us turn on the lights.
| This bootstraps the framework and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';
```

Tại đây, Laravel framework kết nối với file `bootstrap/app.php` để chuẩn bị sẵn sàng cho việc chạy ứng dụng.

Mở file `bootstrap/app.php` các bạn sẽ thấy tại đây file này làm 3 nhiệm vụ thiết yếu để sẵn sàng cho việc bootstrap:

### a. Tạo ứng dụng (Create the application)
```PHP:bootstrap/app.php
/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);
```
Đoạn code này đơn giản chỉ là khởi tạo class `Illuminate\Foundation\Application` với tham số là đường dẫn gốc của thư mục (base directory path) để thuận tiện cho việc require/include các file khác trong quá trình chạy ứng dụng.

### b. Đăng ký các interface quan trọng (Bind important interfaces)
Các interface quan trọng bao gồm HTTP, CLI và trình xử lý ngoại lệ.
```PHP:bootstrap/app.php
/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);
```

### c. Trả về đối tượng ứng dụng (Return the application)
```PHP:bootstrap/app.php
/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;
```

Tới đây quá trình chuẩn bị đã hoàn tất cho việc bootstrap framework.

## 3. Chạy ứng dụng (Run the application)
```PHP:public/index.php
/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
```
Đoạn này sẽ nhận app object vừa trả về và thực hiện các công đoạn để chạy ứng dụng, bao gồm 2 công đoạn chính: 
* Xử lý request
* Trả về response

# III. HTTP/Console Kernel 
Tiếp theo, request sẽ được gửi đến HTTP Kernel hoặc Console Kernel, tùy thuộc vào request được gửi từ đâu. Hiện tại chúng ta chỉ quan tâm đến HTTP Kernel nằm ở file `app/Http/Kernel.php`.

HTTP Kernel kế thừa  class `Illuminate\Foundation\Http\Kernel`, class này sẽ thực việc các công việc trước khi request được thực thi như cấu hình xử lý lỗi, cấu hình logger, xác định môi trường ứng dụng và một số công việc khác.

HTTP Kernel cũng thực hiện một số middleware mặc định của Laravel buộc các request phải vượt qua trước khi được ứng dụng xử lý như kiểm tra ứng dụng có đang ở chế độ bảo trì không, xác thực CSRF (sẽ tìm hiểu ở các tập sau), thao tác với HTTP session...

HTTP Kernel như một chiếc "hộp đen" của ứng dụng, hoạt động theo cơ chế đơn giản: nhận request và trả về response.

Bắt đầu từ những chốt chặn sau đều nằm trong chiếc "hộp đen" HTTP Kernel này.

# IV. Service providers
Một trong những công việc quan trọng nhất của HTTP Kernel đó chính là load các service provider. Tất cả các service provider được cấu hình trong file `config/app.php`. Quá trình load các service provider sẽ trải qua hai quá trình:
1. Đăng ký service provider (Register service provider)
2. Khởi động service provider (Bootstrap service provider)

Các service provider khởi động nhiều thành phần khác nhau của framework như database, validation, router... Chính vì thế mà nó đóng vai trò thiết yếu trong quá trình chạy ứng dụng Laravel.

# V. Router
Sau khi hoàn tất load service provider, các request sẽ được gửi đến router. Chốt chặn này rất dễ hiểu, việc này giống như bạn tìm nhà cho một đứa trẻ đi lạc vậy. Công việc của router sẽ kiểm tra tất cả các route đã được khai báo trong các file ở thư mục `routes` so với request được gửi đến. Nếu khớp hoàn toàn với một route nào đó thì sẽ có hai hướng xử lý. Hãy quan sát mô hình ở phía trên, tại chốt chặn route có hai hướng rẽ:
1. Route -> Middleware -> Controller/Action
2. Route -> Controller/Action

Tại sao lại có hai hướng xử lý như vậy? Khi khai báo route, Laravel cho phép ta có thể ràng buộc request đi qua bằng các middleware tự tạo. Chính vì vậy mà tùy vào mỗi route có ràng buộc middleware hay không nên mình chia hai hướng xử lý như vậy để bao quát.

# VI. Middleware
Như đã nói ở trên, để ứng dụng có thể xử lý được request mà route đã đăng ký middleware thì không còn cách nào khác phải vượt qua nó. Tại đây, middleware sẽ xử lý logic theo những ràng buộc mà coder đặt ra để quyết định xem request đó có được đi tiếp hay là không.

Chẳng hạn như có một request với đường dẫn là http://localhost:8000/login, một coder muốn ràng buộc rằng nếu tồn tại session/cookie đăng nhập của client thì khi vào request này sẽ chuyển về trang chủ, còn nếu không thì vẫn hiển thị form đăng nhập để client tiếp tục. Đây là lúc sử dụng middleware để ràng buộc.

# VII. Phương thức xử lý (Handle method)
Có hai phương thức xử lý request đó chính là controller hoặc action (Closure object). Nhìn chung thì hai phương thức này đều hoạt động như nhau nhưng cách thể hiện và hiệu năng lại khác nhau. 

Controller là thành phần của mô hình MVC nên về tối ưu và hiệu năng hơn hẳn action, rất dễ dàng quản lý và mở rộng.

Về action thường dành cho những phương thức xử lý ngắn gọn như trả về một view, hay return một object, array... thường dành cho test hoặc trong quá trình học.

Tóm lại, cả hai phương thức này sau cùng cũng sẽ trả về response sau khi xử lý xong request, theo cơ chế "hộp đen" của HTTP Kernel. Qua những tập sau mình sẽ nói rõ hơn về controller và action.


# VIII. Phương thức trả về (Return method)
Quan sát trên mô hình, ta thấy có hai mũi tên màu đỏ trả về phía client, đó chính là response. Nhưng sao lại có hai hướng như vậy, đó là do chúng ta có hai cách thức để trả về response:
1. Trả về response thông qua `View`
2. Trả về response không thông qua `View`

Hai hình thức này cũng không có điểm gì khác biệt mấy, mình chia nhánh như vậy để đồng bộ mô hình. `View` chứa các template đã được khai báo sẵn, khi trả về chỉ kèm theo các tham số tùy biến. Trả về response thông qua `View` chỉ thường áp dụng khi load giao diện, phương thức hay dùng vẫn là phương thức còn lại.

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ