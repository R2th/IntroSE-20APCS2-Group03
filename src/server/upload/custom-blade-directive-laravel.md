Chào các bạn hôm nay mình sẽ giới thiệu đến các bạn cách làm như thế nào để tạo ra các directive riêng của mình giống như các directives có sẵn của Laravel như `@section`, `@iyeld`,  `@foreach`. 
# Giới thiệu custom blade directive
Để define một custome blade template chúng ta sẽ sử dụng Blade:: và đặt nó trong phương thức `boot()` của file `AppServiceProvider` như sau:
```
Blade::directive('directive_name', function ($expression) {
    return $expression;
});
```
Ví dụ, mình sẽ define một directive là `@hello` trong file `AppServiceProvider` như thế này:
```
namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('hello', function ($expression) {
            return "<?php echo 'Hi '. {$expression} .','; ?>";
        });
    }
}
```
Sau đó trong file view bạn chỉ cần gọi như sau:
`@hello('ABC')`

Thử ngay trên browser chúng ta sẽ có được kết quả như sau:
![](https://images.viblo.asia/9bad8ad9-b26e-4fdc-a037-b6bbf5a47b37.png)

# Hướng dẫn defining một custom blade directive

Tuy nhiên ở phần trên chỉ là một ví dụ hết sức đơn giản, bây giờ chúng ta sẽ tạo một directive thực sự để sử dụng
## Tạo một Service Provider
Như ví dụ trên chúng ta đã define một directive bên trong AppServiceProvider điều đó vẫn ổn nó vẫn có thể hoạt động, nhưng mình khuyên các bạn nên tạo ra một service provider riêng để dễ dàng quản lý cho các custom blade directive của bạn, cụ thể mình sẽ tạo riêng một service provider `BladeServiceProvider` như bằng cách này:
```
php artisan make:provider BladeServiceProvider
```
câu lệnh trên sẽ tạo ra một file là `BladeServiceProvider.php` trong thư mục `app/Providers` từ nay chúng ta sẽ add custom blade logic vào file này. Tiếp theo chúng ta sẽ tiền hành regist  service provider này vào trong vào trong `providers` array bên trong file `config/app.php` như sau:
```
providers' => [
    ...
    App\Providers\BladeServiceProvider::class,
]
```
##  Sử dụng Service Provider
Bây giờ chúng ta sẽ làm một ví dụ nho nhỏ để sử dụng `BladeServiceProvider` như sau: Chúng ta sẽ chỉ hiển thị button xóa với điều kiện nếu giá trị id từ url khác với giá trị mà chúng ta đã thiết lập. Chúng ta sẽ add code xử lý việc hiển thị button xóa vào file `BladeServiceProvider` trong method `boot()` như sau:
```
public function boot()
{
    Blade::directive('check_id', function ($expression) {
        return "<?php if(request()->get('id') != {$expression}) : ?>";
    });

    Blade::directive('endcheck_id', function ($expression) {
        return "<?php endif; ?>";
    });
}
```
Sang bên ngoài view các bạn chỉ cần gọi như sau:
```
@check_id(10)
<a class="btn btn-danger">
    <i class="fas fa-trash"></i>
    Delete
</a>
@endcheck_id
```
Chạy thử kết quá chúng ta sẽ được như hình dưới đây:

![](https://images.viblo.asia/a40f0014-d7f3-4bb5-8a74-9301a8fe6139.png)

![](https://images.viblo.asia/afebfab1-5480-43dd-898d-f16fe66a2e48.png)

Trường hợp nếu bị lỗi hoặc view không update được thì các bạn sẽ làm như sau:
```
php artisan view:clear
```
# Kết Luận
Trên đây là mình đã hướng dẫn các bạn làm thế nào để tạo ra các custom blade directive trong laravel,  các bạn có thể dễ dàng tạo ra các custom blade directive mà  các bạn mong muốn

# Tham khảo
https://www.larashout.com/creating-custom-laravel-blade-directive
https://codeburst.io/just-in-case-laravel-create-custom-blade-directive-b60a7160949d