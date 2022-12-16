Đôi khi bạn muốn tạo một function mà khả dụng ở mọi nơi (nó được gọi là helper function), nếu bạn vẫn chưa biết cách tạo ra nó, có thể follow bài viết này, nó có thể hữu ích với mọi người.

Nhiều tutorial, thường giới thiệu cách tạo helper function dễ dàng đơn giản bằng cách thêm function vào chính file `app/helpers.php` , file này được autoload trong file composer của bạn. Tôi nghĩ nó không được đẹp code và có thể khó đọc hiểu nếu file helpers.php phình lên quá to trong quá trình phát triển.

Tôi đã sử dụng một phương thức trong một thời gian dài nơi bạn có thể khai báo một số tệp có chứa các phương thức, điều này rõ ràng hơn và dễ đọc hơn.

## Let’s start
Đầu tiên, hãy tạo provider HelperServiceProvider.php:
```
    php artisan make:provider HelperServiceProvider
```
Một khi command này hoàn thành, bạn sẽ thấy file mới `HelperServiceProvider.php` trong folder app\Providers

Bạn có thể xóa hoàn toàn method `boot()`  vì chúng ta sẽ không sử dụng method này.

Bên trong function register() bạn thêm đoạn code sau:
```
public function register()
{
    foreach (glob(app_path('Helpers') . '/*.php') as $file) {
        require_once $file;
    }
}
```

Những gì đoạn code trên thực thi là lặp qua tất cả các file bên trong app/Helpers và require những file đó. Bây giờ bạn có thể nhập một số file PHP trong thư mục app/Helpers đó (mà bạn có muốn tạo), những file này sẽ được load vào ứng dụng của bạn. Những helper function này khả dụng trong mỗi phần của code của bạn (views, models, controllers, v.v.)

Bạn cần load provider HelperServiceProvider này bằng cách mở file `config/app.php` và thêm class `HelperServiceProvider`  phía trên class `AppServiceProvider`.

```
    ...
    App\Providers\HelperServiceProvider::class,
    App\Providers\AppServiceProvider::class,
    App\Providers\AuthServiceProvider::class,
    App\Providers\BroadcastServiceProvider::class,
    ...
```

Bây giờ, hãy thử tạo một function đơn giản, tạo một file mới có tên `Carbon.php` trong folder `app/Helpers` với các nội dung sau:
```
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
Bạn không cần phải nhập bất kỳ namespace nào. Và nếu bạn muốn, bạn có thể kiểm tra xem function có tồn tại hay không bằng cách gọi một câu lệnh if `function_exists` có thể là một idea tốt.

Bây giờ bạn có thể sử dụng `carbon()` helper ở mọi nơi trong ứng dụng mà bạn thích. Bây giờ nếu bạn cần một function khác trả về một định dạng cụ thể (đây là phần example ở trong bài viết này), bạn có thể chỉ cần thêm code ở trong cùng một file (`Carbon.php`):
```
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
function carbonFormatted($time = null, $tz = null)
{
    return carbon($time, $tz)->format('Y-m-d')
}
```
Đó là cách tôi làm để tạo ra helper của riêng mình! Bây giờ bạn có thể bắt đầu thêm vào thư mục `app/Helpers` các file PHP của riêng bạn có chứa các function helper mà bạn thường sử dụng.
## Docs reference
https://medium.com/@dennissmink/laravel-include-your-own-helper-functions-8e744ca66e4f