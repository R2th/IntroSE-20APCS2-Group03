### Laravel helper
Laravel helper là một hàm global đơn giản mà bạn có thể sử dụng để tiết kiệm thời gian trong việc viết lặp code. Laravel cung cấp rất nhiều hàm helper để tăng tốc quá trình phát triển. Chức năng trợ giúp có thể được gọi từ bất cứ đâu trong ứng dụng. Vì vậy, nó giúp loại bỏ sự lặp code.
Sau đây là một số ví dụ sử dụng helper.

Hãy tạo một chuỗi mà trong đó mỗi chuỗi được phân tách bằng dấu gạch ngang (-) từ tiêu đề bài viết. Trong PHP, bạn phải viết đoạn mã sau

```php
<?php
    $title = 'This is my first blog post';
 
    $slug = implode('-', explode(' ', strtolower($title)));
 
    //output: this-is-my-first-blog-post
?>
```
Sử dụng helper trong laravel thì bạn chỉ cần viết như sau:

```php
<?php
    $title = 'This is my first blog post';
 
    $slug = str_slug($title, '-');
 
    //output: this-is-my-first-blog-post
?>
```

### Tự tạo helper
Có một cách khá đơn giản để custom một helper để bạn có thể dùng nhiều lần là bạn có thể viết hàm vào trong file helpers.php rồi autoload trong file composer.json. Nhưng với cách này file helpers của bạn sẽ bị phình to và khó đọc hơn. Cách sau đây giúp bạn có thể khai báo nhiều file gồm nhiều method, như vậy sẽ dễ đọc và rõ ràng hơn.

Đầu tiên hãy tạo một file provider `HelperServiceProvider.php`
```php
php artisan make:provider HelperServiceProvider
```

Sau khi tạo bạn sẽ thấy file mới được tạo ra trong `app\Providers`
Trong hàm register bạn thêm đoạn code sau 
```php
public function register()
{
    foreach (glob(app_path('Helpers') . '/*.php') as $file) {
        require_once $file;
    }
}
```

Đoạn code này sẽ chạy tất cả các file trong `app/Helpers`, bây giờ thì bạn có thể thêm nhiều file .php vào trong thư mục này, các file này sẽ được load trong project của bạn.

Tiếp theo bạn load provider này bằng cách vào config/app.php và thêm HelperServiceProvider lên trên AppServiceProvider:

```php
...
App\Providers\HelperServiceProvider::class,
App\Providers\AppServiceProvider::class,
App\Providers\AuthServiceProvider::class,
App\Providers\BroadcastServiceProvider::class,
...
```

Bây giờ hãy thử tạo một function đơn giản, tạo file `Cacbon.php` trong thư mục `app/Helpers`

```php
<?php

/**
 * Carbon helper
 *
 * @param $time
 * @param $tz
 *
 * @return Carbon\Carbon
 */
function carbon($time = null, $tz = null)
{
    return new \Carbon\Carbon($time, $tz);
}
```

 Sau đó bạn có thể sử dụng hàm cachon() ở bất cứ đâu. Vậy là từ giờ bạn có thể tạo thêm nhiều function trong file này để sử dụng helper nhanh chóng, và có thể tách ra nhiều file khác để khai báo các function có liên quan đến nhau. Như vậy sẽ dễ dàng hơn khi bạn muốn tìm lại một helper nào đó để custom hoặc xem lại.
 
#### Tham khảo
https://www.kodementor.com/create-custom-helper-functions-in-laravel-5/
https://medium.com/@dennissmink/laravel-include-your-own-helper-functions-8e744ca66e4f