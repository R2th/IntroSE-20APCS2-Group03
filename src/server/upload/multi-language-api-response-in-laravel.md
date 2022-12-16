# Giới thiệu
![](https://images.viblo.asia/521b7e0e-052b-48b9-9f42-c245642f623e.jpg)
Trong bất kỳ một dự án lớn nhỏ hiện nay thì, một website đã ngôn ngữ không còn xa lạ gì đối với tất cả các lập trình viên. Để tạo 1 website đa ngôn ngữ thì có nhiều cách nhưng làm thế nào để nó tối ưu và dễ dàng bảo trì cũng như phát triển thì đó vẫn là câu hỏi của nhiều bạn.
Trong thời đại mà RESTful API trở thành xương sống của các ứng dụng đa nền tảng thì hôm nay mình xin giới thiệu với các bạn cách làm một ứng dụng cơ bản đa ngôn ngữ sử dụng API Response.
# Language Setup
Laravel cung cấp và hỗ trợ sẵn chúng ta multi language ([Localozation](https://laravel.com/docs/5.8/localization)). Ở đây mình sử dụng một cách đơn giản đó là chúng ta có thể làm đó là sử dụng request header.

![](https://images.viblo.asia/aaf7c4ec-0214-4bac-8c04-383576b5cccc.jpeg)

Chúng ta sẽ sử dụng truyền lên Header **X-localization** request để xác định sẽ sử dụng ngôn ngữ nào trong ứng dụng.
## Các bước thực hiện
### 1. Create project Laravel
Run comman: `composer create-project --prefer-dist laravel/laravel multi-language`
Sau khi create xong, mở project chúng ta thấy Laravel đã cung cấp sẵn cho chúng ta thư mục **resources/lang** chứa các ngôn ngữ trong ứng dụng của bạn. Tại đây bạn có thể thêm bất cứ ngôn ngữ nào bạn muốn. VD ứng dụng của mình sẽ có 2 ngôn ngữ là English (en) và Japanese (ja).

![](https://images.viblo.asia/390059ad-6186-4c34-9e81-c274fc955950.png)

Sau đó ta tạo thêm các thư mục con **nameFile.php** cho nó, lưu ý là các thư mục con này phải có tên giống nhau và các keys trong các thư mục cũng trùng tên với nhau. VD trong multi-language project của mình:
* File **resources/lang/en/messages.php**
```
<? php 

return [ 
'hello' => 'Hello. This is using English. ' 
];
```
* File **resources/lang/ja/messages.php**
```
<? php 

return [ 
'hello' => 'こんにちは。 これは英語を使用しています。' 
];
```
Chúng ta đã xong bước thiết lập cơ bản đa ngôn ngữ cho ứng dụng. Bước tiếp theo chúng ta sẽ đi Create Language Middleware
### 2. Create Language Middleware
Run comman: `php artisan make:middleware LocalizationMiddleware`

Tiếp theo chúng ta sẽ đi cấu hình LocalizationMiddleware nhé:
```
<?php

namespace App\Http\Middleware;

use Closure;

class LocalizationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //Check header request and set language defaut
        $lang = ($request->hasHeader('X-localization')) ? $request->header('X-localization') : 'ja';
        //Set laravel localization
        app()->setLocale($lang);

        //Continue request
        return $next($request);
    }
}
```
Ở đây mình sẽ thực hiện kiểm tra header request truyền lên. Và nếu k có sẽ set mặc định cho ứng dụng sử dụng ngôn ngữ tiếng Nhật :smile::smile::smile:
### 3. Registered Middleware
* Mình sẽ k đi sâu về Middleware, để hiểu hơn về nó các bạn xem ở [đây](https://laravel.com/docs/5.8/middleware) nhé!
* Bạn đăng ký middleware trong **app/Http/Kernel.php** tại thuộc tính $routeMiddleware để gán middleware đó cho một route cụ thể.
```
protected $routeMiddleware = [
    /**
    * other middlewares
    * ...
    */
    'language' => \App\Http\Middleware\LocalizationMiddleware::class,
];
```
### 4. Call Middleware
Bước cuối cùng sau khi đăng ký middleware => bây giờ chúng ta sẽ tạo một Controller để gọi tới middleware multi language:

Run comman `php artisan make:controller MultiLanguageController --resource`

Sau khi tạo xong controller, mình sẽ demo một VD đơn giản như sau:
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MultiLanguageController extends Controller
{
    /**
     * Show greetings
     *
     * @param Request $request [description]
     * @return [type] [description]
     */
    public function index(Request $request)
    {
        $data = [
            'message' => trans('messages.hello'),
        ];

        return response()->json($data, 200);
    }
}
```

Tạo một api cho function index()
```
// Routes/api.php
Route::get(‘multi-language’, ‘MultiLanguageController@index’)
      ->middleware(‘language’);
```

Run comman: `php artisan service`

Ting ting vậy là chúng ta đã tạo xong một ứng dụng đơn giản Laravel đa ngôn ngữ rồi nè. Để kiểm tra api này mình sử postman nhé :D
* Use X-localization=ja
![](https://images.viblo.asia/3a2b4fbd-517e-4ab1-a795-8de5f90af061.png)
* Use X-localization=en
![](https://images.viblo.asia/00537553-1465-4c9a-88b1-9586b1d0e77c.png)

Trên đây là ví dụ đơn giản về đa ngôn ngữ trong Laravel, cảm ơn mn đã đọc :kissing_heart: