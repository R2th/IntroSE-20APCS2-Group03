Laravel đã cung cấp cho người dùng rất nhiều những hàm global helpers giúp bạn có thể gọi ở bất cứ đâu trong project, chúng giúp những công việc xử lí liên quan đến mảng, đối tượng, đường dẫn, chuỗi, URL ... trở nên dễ dàng và tiện lợi hơn bao giờ hết.
Mặc dù có rất nhiều hàm helpers hỗ trợ xử lí, nhưng đôi khi tùy vào dự án và đặc thù mà bạn muốn tự tạo riêng cho mình những hàm, class để tránh việc lặp code và dễ dàng bảo trì hơn. Bài viết này sẽ giúp bạn biết được làm thế nào để tạo riêng cho mình những hàm Helpers trong Laravel.
## Tạo Helper file trong Laravel
 Ở phần này, mình sẽ giúp bạn biết cách làm thế nào đẻ tạo lên một file helper chứa những hàm có thể sử dụng global trong Laravel. 
 Bạn có thể tự tạo cho mình một file Helper.php ở bất cứ thư mục, đường dẫn nào bạn muốn. Cá nhân mình thường đặt helpers file trong `app/Helpers/Helper.php`  .
  Đầu tiên, hãy cùng tạo một thư mục `Helpers` bên dưới `app` và tạo một file Helper.php có nội dung như sau:
  ```
  if (!function_exists('env')) {
    function env()
    {
      //Xử lý hàm env()
    }
}

if (!function_exists('aFunctionName')) {
    function aFunctionName()
    {
       // Xử lý hàm aFunctionName()
    }
}
  ```
Bằng việc sử dụng phương thức function_exists(), bạn có thể kiểm tra được xem Laravel đã có hàm đó chưa,  nhằm tránh việc trùng tên hàm với những hàm helpers có sẵn. ở trường hợp này, hàm env() không được tạo do Laravel đã định nghĩa trước một hàm env rồi.

Nếu bạn sử dụng class và các phương thức của class đó , bạn sẽ cần phải thêm vào đầu file namespace tương ứng, ở trường hợp mình thì là :
`namespace App\Helpers;`
## Sử dụng file Helper
Sau khi đã tạo file Helper và định nghĩa các hàm trong đó, chúng ta cùng tìm hiểu làm sao để sử dụng file helper trong Laravel :
* Bạn có thể tự động load file helper với composer. Sau đó có thể sử dụng những function helper bất cứ đâu trong ứng dụng của bạn.
* Sử dụng Laravel service provider để đăng ký file này. Laravel sẽ load file này cùng với những dependency khác.
### Sử dụng composer để tự động load file

Cách đầu tiên khá là dễ dàng và đơn giản. Bạn chỉ cần đi đến file composer.json đặt ở thư mục root của project Laravel bạn sẽ nhìn thấy key `autoload`.
Composer có hỗ trợ key `files` ( một mảng chữa những đường dẫn file mà bạn muốn load một cách tự động).Sau khi thêm đường dẫn file vào mảng đó, file composer.json của bạn sẽ như thế này:
```javascript
"autoload": {
    "files": [
        "app/Helpers/Helper.php"
    ],
    "classmap": [
        "database/seeds",
        "database/factories"
    ],
    "psr-4": {
        "App\\": "app/"
    }
},
```
Sau khi chỉnh sửa file composer.json, nhớ chạy dump-autoload nhé. :3 
 `composer dump-autoload`
 Sau khi chạy lệnh này, helper file ủa bạn sẽ được tự động load bên trong project Laravel
###  Sử dụng service providers để load file
Nào hãy cùng tìm hiểu làm cách nào để sử dụng service providers để tự động load Helper file nhé.
Đầu tiên hãy tạo một Helper service provider nào
`php artisan make:provider HelperServiceProvider`
Bạn sẽ thấy thông báo provider tạo thành công trên màn hình console:
`Provider created successfully`
Một khi service provider được tạo thành công, mở file và đăng kí helper file bên trong hàm register của provider:
```php
public function register()
{
    $file = app_path('Helpers/Helper.php');
    if (file_exists($file)) {
        require_once($file);
    }
}
```
Ở trong một số project lớn hơn, sẽ có trường hợp bạn cần sử dụng nhiều file helper trong thư mục, bạn có thể đổi hàm register như sau: 
```javascript
public function register()
{
    foreach (glob(app_path() . '/Helpers/*.php') as $file) {
        require_once($file);
    }
}
```
Bằng cách này, nó sẽ require tất cả những file trong thư mục  `app/Helpers`
Bây giờ , sau khi đã đăng ký service provider, để Laravel load nó trong quá trình bootstraping. bạn cần đi đến file `config/app.php` và thêm dòng sau vào mảng `providers`:
`App\Providers\HelperServiceProvider::class,`
Nếu file helper của bạn có class chứa những hàm helper và bạn có những namespace xác định, bạn có thể sử dụng dễ dàng bằng cách định nghĩa một alias . Bạn có thể làm điều đó bằng cách thêm dòng sau đây vào cuối mảng `aliases` trong `config/app.php` file:

`'Helper' =&gt; App\Helpers\Helper::class,`
Bằng cách này, bạn có thể gọi helper bằng cách sử dụng keyword Helper.
## Kết luận
Trên đây là một số cách mình hay thường làm để tạo Helper file giúp tránh lặp code đồng thời giúp việc tối ưu và bảo trì tiện lợi và dễ dàng hơn. Cảm ơn đã dành thời gian đọc bài viết của mình. :3