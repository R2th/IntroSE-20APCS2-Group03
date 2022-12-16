Chào các bạn. Bài tiếp theo trong series về Laravel hôm nay tôi sẽ giới thiệu về View trong Laravel.
## 1. Creating & Rendering Views
 Chúng ta có thể tạo một view bằng cách tạo một file có đuôi ***.blade.php*** trong folder ***resources/views***. Phần mở rộng ***.blade.php*** sẽ thông báo cho Laravel là tệp có chứa **Blade template** (là view engine trong Laravel). Blade template chứa HTML và các lệnh Blade cho phép chúng ta dễ dàng lặp lại các giá trị, tạo ra các câu lệnh **if**, lặp qua dữ liệu, ....
 Khi chúng ta đã tạo ra một view, chúng ta có thể trả lại nó từ trong một route hoặc một controller của Laravel bằng cách sử dụng global ***view*** helper:
```
Route::get('/', function () {
    return view('greeting', ['name' => 'James']);
});
```
Views cũng có thể được trả lại bằng **View** facade:
```
use Illuminate\Support\Facades\View;

return View::make('greeting', ['name' => 'James']);
```
Đối số đầu tiền sẽ ứng với tên tệp chúng ta đã tạo trong ***resources/views***. Đối số thứ hai là một mảng dữ liệu được cung cấp cho view. Như ví dụ trên chúng ta đang truyền biến name với value là **James** vào trong **view** **greeting**.
### Nested View Directories
Views cũng có thể được lồng trong thư mục con của ***resources/views***. Dấu "." có thể được sử dụng để tham chiếu đến các các view nằm trong thư mục con của views. Ví dụ: nếu file view của bạn được lưu trữ tại ***resource/views/admin/profile.blade***, bạn có thể trả lại nó từ trong route hoặc controller của Laravel như sau:
```
return view('admin.profile', $data);
```
### Determining If A View Exists

Nếu bạn các xác định một view có tồn tại hay không, bạn có thể sử dụng **View** facade và method **exists** để check sự tồn tại của view: 
```
use Illuminate\Support\Facades\View;

if (View::exists('emails.customer')) {
    //
}
```
### Passing Data To Views
Như bạn đã thấy ở các ví dụ trước bạn có thể chuyển một mảng các giá trị cho **view**:
```
return view('greetings', ['name' => 'Victoria']);
```
Khi chuyền dữ liệu theo cách này, dữ liệu phải là một mảng với các cặp key/value. Sau khi cung cấp dữ liệu cho một chế độ xem, bạn có thể truy cập dữ liệu trong view bằng cách sử dụng **<?php echo $name; ?>**.
Để thay thế cho việc chuyền một mảng dữ liệu vào view bạn có thể chuyền từng phần riêng lẻ vào view bằng cách sử dụng method **with**
```
return view('greeting')
            ->with('name', 'Victoria')
            ->with('occupation', 'Astronaut');
```
### Sharing Data With All Views
Đôi khi bạn cần phải hiển thị data với tất cả các view của laravel. Bạn có thể làm điều này với method **share** của **View** facade. Bạn nên gọi method share trong method **boot** của service provide. Bạn có thể thêm vào class ***App\Providers\AppServiceProvider*** hoặc tạo một provider riêng để chứa chúng:
```
<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;

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
        View::share('key', 'value');
    }
}
```
## 2. View Composers
Nếu bạn có một data mà bạn muốn liên kết với một view khi view đó được hiển thị, view composer có thể giúp bạn tổ chức logic đó vào một vị trí duy nhất. View composer sẽ hữu ích khi cùng một view của bạn được trả về bởi nhiều route hoặc controller và bạn luôn cần gửi một phần data cụ thể. Thông thường các view composer sẽ được đăng ký trong một trong các service provide của bạn. Trong ví dụ này tôi sẽ tạo một service provider ViewServiceProvider mới để chứa logic này:
```
<?php

namespace App\Providers;

use App\Http\View\Composers\ProfileComposer;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
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
        // Using class based composers...
        View::composer('profile', ProfileComposer::class);

        // Using closure based composers...
        View::composer('dashboard', function ($view) {
            //
        });
    }
}
```
Chúng ta sẽ sử dụng method composer của View facade để đăng ký view composer cho Laravel. Laravel sẽ không bao gồm thư mục mặc định cho các view composer vì vậy bạn có thể tự do sắp xếp chúng theo cách bạn muốn. Trong ví dụ trên tôi đang đặt nó nằm trong thư mục ***app/Http/View/Composers***.
Bây giờ chúng ta sẽ đăng ký một view composer phương thức **compose** của lớp App\Http\View\Composers\ProfileComposer sẽ được thực thi mỗi khi hiển thị view **profile**. Ví dụ:
```
<?php

namespace App\Http\View\Composers;

use App\Repositories\UserRepository;
use Illuminate\View\View;

class ProfileComposer
{
    /**
     * The user repository implementation.
     *
     * @var \App\Repositories\UserRepository
     */
    protected $users;

    /**
     * Create a new profile composer.
     *
     * @param  \App\Repositories\UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        // Dependencies automatically resolved by service container...
        $this->users = $users;
    }

    /**
     * Bind data to the view.
     *
     * @param  \Illuminate\View\View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('count', $this->users->count());
    }
}
```
### Attaching A Composer To Multiple Views
Bạn có thể đính kèm một view composer vào nhiều view một lúc bằng cách chuyển một mảng view làm đối số đầu tiên cho phương thức composer:
```
use App\Http\Views\Composers\MultiComposer;

View::composer(
    ['profile', 'dashboard'],
    MultiComposer::class
);
```
Phương thức composer cũng chấp nhận ký tự * làm ký tự đại diện, cho phép bạn đính kèm view composer vào tất cả các view:
```
View::composer('*', function ($view) {
    //
});
```
## 3. Optimizing Views
Theo mặc định các Blade template view được biên dịch theo yêu cầu. Khi một request được thực hiện để yêu cầu hiển thị một view, Laravel sẽ xác định xem có tồn tại một phiên bản đã biên dịch của view hay không. Nếu tệp đã tồn tại, Laravel sẽ xác định xem view chưa biên dịch có được sửa đổi gần đây hơn so với view đã biên dịch hay không. Nếu view đã biên dịch không tồn tại hoặc view chưa được biên dịch đã được sửa đổi, Laravel sẽ biên dịch lại view.
Việc biên dịch các view trong quá trình request có thể ảnh hưởng nhỏ đến hiệu xuất. Vì vậy Laravel cung cấp lệnh ***view:cache*** Artisan để biên dịch trước tất cả các view được ứng dụng của bạn sử dụng. Để tăng hiệu suất, bạn có thể muốn chạy lệnh này như một phần của quá trình triển khai code của mình:
```
php artisan view:cache
```
Bạn có thể sử dụng **view:clear** command để xóa toàn bộ cache của view:
```
php artisan view:clear
```

- Tham khảo: https://laravel.com/docs/8.x/views#nested-view-directories