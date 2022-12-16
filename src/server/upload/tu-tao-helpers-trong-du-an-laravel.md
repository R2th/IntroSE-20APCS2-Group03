Như đã hứa hẹn, bài viết lần này mình sẽ viết một tutorial nhỏ về việc tự tạo một helper để có thể sử dụng trong Laravel project của bạn. Laravel đã cung cấp rất nhiều những [helper](https://laravel.com/docs/5.7/helpers) hữu ích, tuyệt vời để chúng ta có thể làm việc với arrays, file path, strings, hay routes,.. một cách ngắn gọn, tiện lợi. Và chúng ta cũng có thể tạo ra những "awesome function" tương tự. Now let's get started :D

![](https://images.viblo.asia/5840f18d-7525-44c4-b9ca-7ecda9fd7b79.png)
## Create helper file
Vị trí của file helper thực ra tùy thuộc vào sở thích, cấu trúc có sẵn của dự án bạn , nhưng mình khuyên nên đặt nó ở các vị trí như sau:
- app/helpers.php
- app/Http/helpers.php
Mình thường đặt file custom helper của mình ở thư mục gốc của dự án. Đối với những dự án nhiều helper, và có thể phải chia module cho rõ ràng, mình sẽ tạo folder Helpers chứa bên trong list các helper được chia theo thực thể hoặc chức năng.
### Autoloading
Để có thể sử dụng được helper function mà bạn tự tạo ra, bạn phải load chúng vào chương trình khi chương trình chạy. Ở những ngày đầu làm quen, tập tành viết helper, mình thường sử dụng câu lệnh này ở đầu file:
```php
require_once ROOT . '/helpers.php';
```
PHP function không thể tự load. Tuy nhiên, chúng ta có giải pháp tốt hơn việc sử dụng *require* hay *require_once* như trên, đó là sử dụng *autoload* của Composer.
Nếu bạn tạo một project Laravel mới, bạn sẽ nhìn thấy từ khóa *autoload* hay *autoload-dev* trong file **composer.json**
```php
"autoload": {
    "classmap": [
        "database/seeds",
        "database/factories"
    ],
    "psr-4": {
        "App\\": "app/"
    }
},
"autoload-dev": {
    "psr-4": {
        "Tests\\": "tests/"
    }
},
```
Nếu bạn muốn tạo mới một file helper, Composer cung cấp sẵn từ khóa *file* (nó sẽ chưa một list các đường dẫn file) bên trong *autoload*, đó là nơi bạn có thể định nghĩa các file sẽ được autoload trong project của bạn.
```php
"autoload": {
    "files": [
        "app/helpers.php"
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
Mỗi lần bạn thêm một file mới vào list các file được autoload đó, bạn cần chạy lệnh này để cập nhật dữ liệu:
```php
composer dump-autoload
```
Bây giờ thì ở mỗi request, file helper.php sẽ được tự động load bởi vì Laravel đã require bộ autoloader của Composer trong file public/index.php
```php
require __DIR__.'/../vendor/autoload.php';
```
### Define function
Định nghĩa các functions trong file helper của bạn là một phần việc khá dễ dàng, tuy nhiên, có một vài điểm cần được lưu ý. Tất cả các file helper của Laravel được gói vào để tránh xung đột về việc định nghĩa function. 

```php
if (! function_exists('env')) {
    function env($key, $default = null) {
        // ...
    }
}
```
Điều này có thể gây khó khăn bởi vì bạn có thể gặp phải tình huống đó là bạn đang sử dụng một function mà trước đó đã được định nghĩa rồi.
Mình khuyên nên sử dụng *function_exist* để kiểm tra các helper của bạn liệu đã tồn tại hay chưa.

### Example
Khi mình sử dụng [resource routing trong Laravel](https://laravel.com/docs/5.7/controllers#restful-partial-resource-routes) mình thường thêm một vài helper để khiến việc định nghĩ của mình trở nên rõ ràng hơn. Trong quá trình implement, mình thường sử dụng một URL helper để có thể truyền một Eloquen model và trả lại một resource route bằng việc sử dụng những quy ước mà mình đã đặt ra. Ví dụ như sau:
```php
create_route($model);
edit_route($model);
show_route($model);
destroy_route($model);
```
Và bên dưới đây sẽ là đoạn mình định nghĩa *show_route* trong file app/helpers.php (những route còn lại sẽ tương tự)
```php
if (! function_exists('show_route')) {
    function show_route($model, $resource = null)
    {
        $resource = $resource ?? plural_from_model($model);

        return route("{$resource}.show", $model);
    }
}

if (! function_exists('plural_from_model')) {
    function plural_from_model($model)
    {
        $plural = Str::plural(class_basename($model));

        return Str::kebab($plural);
    }
}
```
Function *plural_from_model()* chỉ là những dòng code có thể tái sử dụng mà helper route sử dụng để dự đoán ra tên của resource route dựa trên quy ước đặt tên mà mình đã đặt ra.
Dưới đây sẽ là một ví dụ về resource name đã được lấy ra từ model:
```php
$model = new App\LineItem;
plural_from_model($model);
=> line-items

plural_from_model(new App\User);
=> users
```
Bằng việc sử dụng quy ước bạn đã định nghĩa, resource route sẽ trông như sau trong file routes/web.php:
```php
Route::resource('line-items', 'LineItemsController');
Route::resource('users', 'UsersController');
```
Và sau đó ở blade file, bạn có thể làm như sau:
```php
<a href="{{ show_route($lineItem) }}">
    {{ $lineItem->name }}
</a>
```
Nó sẽ tạo ra một đoạn HTML như sau:
```html
<a href="http://localhost/line-items/1">
    Line Item #1
</a>
```
## Sumary:
Trên đây là một ví dụ nhỏ về cách tạo một helper để bạn có thể sử dụng một cách thuận tiện trong project Laravel của bạn. Những helper sẽ giúp những dòng code của bạn rõ ràng, gọn gàng và tiết kiệm thời gian hơn. Bạn có thể nên tìm hiểu thêm về [autoload của composer](https://getcomposer.org/doc/04-schema.md#autoload) sau khi đã tự tạo được helper cho project của mình để biết rằng thực tế những điều kì diệu mà Laravel tạo ra đều được xây dựng lên từ những thứ rất đơn giản :D
## References:
https://laravel-news.com/creating-helpers?fbclid=IwAR2ZI-1rioxV-kNFixWpPwSR6TIOs1yR36J97C7dRrMgakVKxJ8goiyHxHM
https://laravel.com/docs/5.7/helpers