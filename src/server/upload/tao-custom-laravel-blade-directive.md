![](https://images.viblo.asia/9a575248-b3d3-42a3-a260-4cd7cf3898af.jpg)

Đang ngồi code vu vơ thì có ông anh ghé qua ngó ngó xong bảo: "Úi dời ôi, dùng cái **Custom Laravel Blade Directive** đi. Code 'tù' thế". Mình cũng vội vàng dạ dạ vâng vâng rồi lên `gu gồ` search thử. Thấy nó cũng không khó nhằn gì nên share lên đây cho các bạn có thể cũng chưa biết như mình :D  <br>

**Start thôi nào**

Khi ứng dụng của chúng ta được mở rộng quy mô, chúng ta cần thứ gì đó có thể tái sử dụng thay vì cứ phải lặp đi lặp lại việc copy paste code. Chúng ta thường cần viết một số điều kiện phức tạp trong views của mình, điều này làm cho views của chúng ta trở nên lộn xộn và khó bảo trì hơn.

Và... Chúng ta có thể "clean up" blade views của mình bằng việc **Custom Laravel Blade Directives**. Trong bài này, chúng ta sẽ tìm hiểu cách chúng ta custom directives và sử dụng chúng nhé.

### Laravel Blade Directives
Laravel Blade template engine biên dịch cú pháp đặc biệt của nó về code PHP và HTML. Cú pháp đặc biệt của nó bao gồm các directives, giúp cho views của mình đẹp lên bằng cách ẩn đằng sau nó những đoạn code logic 'xấu xí'.

Laravel Blade’s directives rất tiện dụng và mạnh mẽ cho một ứng dụng đơn giản nhưng code của chúng ta sẽ bắt đầu có mùi khi ứng dụng của chúng ta phát triển to lên và chúng ta sẽ có cảm giác cần refactor phần code views của mình thành custom blade directives.

Bạn có thể đã quen với các blade directives như @section, @yield, @foreach và ...

Hãy bắt đầu với việc tạo một chỉ thị đơn giản.

### Defining a Custom Blade Directive
Bạn có thể định nghĩa custom blade template bằng cách sử dụng  **Blade::** bên trong phương thức boot() của providers giống như bên dưới.
```
Blade::directive('directive_name', function ($expression) {
    return $expression;
});
```
Hãy định nghĩa một blade directive mới có tên là @hello bằng cách định nghĩa trong AppServiceProvider như bên dưới.
```
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

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
            return "&lt;?php echo 'Hello '.{$expression}; ?&gt;";
        });
    }
}
```
Sau đó trong view chúng ta có thể sử dụng chúng bằng cách gọi:
```
@hello('LaraShout')
```

### Blade Directive Practicle Example
Ví dụ trên rất dễ học, bây giờ chúng ta hãy tạo một số directive hữu ích để thực hành nhé:
### Creating Service Provider
Như chúng ta đã định nghĩa custom blade directive của mình trong `AppServiceProvider`, điều này là OK, nhưng có 1 lời khuyên cho chúng ta là nên tạo một service provider mới cho tất cả custom blade directives của chúng ta và cố gắng tránh định nghĩa trong `AppServiceProvider`.

Tạo custom service provider có tên là `BladeServiceProvider` bằng command dưới đây.
```
php artisan make:provider BladeServiceProvider
```
Command trên sẽ tạo một service provider trong folder app/Providers với 1 đoạn code có sẵn như bên dưới đây:
```
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class BladeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
```
Bây giờ trước khi thêm tùy chỉnh blade directives , hãy register với service provider này trong Laravel bằng cách thêm nó vào mảng `$providers` trong file `config/app.php`.

Thêm vào mảng `$providers` như bên dưới:
```
App\Providers\BladeServiceProvider::class,
```
Bây giờ service provide mới của chúng ta đã được đăng ký trong Laravel service container, chúng ta đã có thể bắt đầu thêm logic custom blade.
### Adding Custom Directive
Chúng ta muốn tạo một blade directive tùy chỉnh sẽ kiểm tra xem route hiện tại có bằng với route mà chúng ta sẽ cung cấp hay không.

Thêm đoạn code bên dưới trong phương thức boot() của BladeServiceProvider‘s.
```
Blade::directive('routeis', function ($expression) {
            return "&lt;?php if (fnmatch({$expression}, Route::currentRouteName())) : ?&gt;";
        });

        Blade::directive('endrouteis', function ($expression) {
            return '&lt;?php endif; ?&gt;';
        });
```
Trong đoạn code ở ví dụ trên, chúng ta đang định nghĩa hai blade directives tùy chỉnh được gọi là **routeis** và **endrouteis**.
Trong directive đầu tiên, chúng ta đang thực thi một câu lệnh if để kiểm tra xem $expression có khớp với route hiện tại hay không bằng cách sử dụng phương thức currentRouteName() bằng cách áp dụng hàm `fnmatch()` của PHP.

Trong blade directive thứ hai, chúng ta chỉ đơn giản là đóng câu lệnh if.

Bây giờ chúng ta có thể sử dụng blade directive ở trên như bên dưới.
```
@routeis('home')
// Your stuff here
@endrouteis
```
Nếu route hiện tại được đặt tên là `home`, thì nó sẽ hiển thị bất cứ thứ gì sẽ có trong directive này.

Tương tự chúng ta thử mở IDE ra và code tiếp cho trường hợp nếu route hiện tại không phải tên là `home` nhé :D

Mình xin kết thúc phần trình bày về Custom Laravel Blade Directives ở đây ạ. Thanksyou!!!


**Source**: https://www.larashout.com/creating-custom-laravel-blade-directive