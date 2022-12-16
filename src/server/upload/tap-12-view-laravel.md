Hello, chào mừng các bạn đã quay trở lại với series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" cùng với mình. Trong tập hôm nay, chúng ta sẽ cùng đi tìm hiểu về một component rất quen thuộc và sẽ đơn giản rất nhiều so với các component còn lại, đó chính là "View". Nghe cái tên thôi cũng đủ biết nó làm gì rồi phải không. Chính vì thế, ở tập hôm nay mình sẽ đi vào vấn đề chính luôn mà không phải tản mản sơ lược về "View" nữa.

# I. Khởi tạo view (Creating view)
Không giống với phần lớn component, view không được tạo bằng lệnh Artisan mà chỉ có thể thực hiện theo cách thủ công. Toàn bộ các viewer sẽ nằm trong thư mục `resources/views`. 

> Chúng ta sẽ có hai loại file view:
> 1. Template thuần: có nghĩa trong đó chỉ chứa các mã PHP, HTML, CSS, Javascript... thông thường, đuôi mở rộng file là `.php`
> 2. Blade template: đây là một view engine của Laravel, chúng ta sẽ sử dụng những cú pháp riêng biệt để có thể làm code nhanh hơn, ngắn gọn hơn rất nhiều, đuôi mở rộng file là `.blade.php`.

Nhưng trong tập này chúng ta chỉ sử dụng template thuần để dẫn chứng, ở trong tập sau mình sẽ nói về blade template.

Ví dụ giờ mình sẽ tạo một file view `home.php` với nội dung sau:

```PHP:resouces/views/home.php
<h1>Home page</h1>
```

Để có thể xuất view này cho client, các bạn khai báo route như sau:

```PHP:routes/web.php
Route::get('/home', function () {
    return view('home');
});
```

Chúng ta sử dụng một global helper function `view` để có thể trả về một view nào đó với tham số là tên của view (không lấy đuôi mở rộng).

Truy cập đường dẫn http://localhost:8000/home chắc chắn bạn sẽ nhận được kết quả:

![](https://images.viblo.asia/01ecd0fc-eb6e-46f9-9be8-96ac015adf4c.JPG)

View trong Laravel có thể phân chia cấp thư mục để dễ dàng quản lý. Chẳng hạn ứng dụng của bạn có client-side và admin-side, nên bạn muốn các view của admin-side sẽ nằm ở trong một thư mục `resources/views/admin`. 

Về việc khởi tạo, bạn vẫn thao tác như bình thường. Đầu tiên tạo thư mục `admin` trong `resources/views`. Tiếp theo mình sẽ tạo một file `setting.php` chẳng hạn và đặt nó nằm trong `resources/views/admin`. Ta sẽ có được cấu trúc thư mục như sau:

```
resources/
├── views/
|   ├── admin/
|   |   |   setting.php 
|   |   home.php
```

Bây giờ chúng ta làm thể nào để truy cập view `admin/setting.php`? Các bạn hãy quan sát đoạn code sau:

```PHP
Route::get('/admin/setting', function() {
    return view('admin.setting');
});
```

Vẫn là hàm `view` quen thuộc, nhưng lần tham số truyền vào có chút đặc biệt, đó là có thêm dấu `.`. Với dấu `.` này, Laravel sẽ hiểu là chúng ta đang đi vào sub-directory `admin/setting`.

# II. Truyền dữ liệu cho view (Passing data to view)
Ta có thể truyền dữ liệu cho view thông qua tham số thứ hai của hàm `view`.

```PHP:routes/web.php
Route::get('/home', function () {
    return view('home', ['name' => 'Lê Chí Huy']);
});
```

Để nhận giá trị `name` này thì tại view `home` ta chỉ cần khai báo `$name`.

```PHP:resources/views/home.php
// ...
<h2>Welcome, <?php echo $name; ?></h2>
```

> Để lấy dữ liệu được truyền tới view, ta chỉ cần khai báo biến có tên trùng với tên key trong mảng dữ liệu.

Bạn có thể sử dụng method `with` để truyền dữ liệu thay cho cách trên:

```PHP
Route::get('/home', function () {
    return view('home')->with('name', 'Lê Chí Huy');
});
```

> Phương thức `with` này có thể truyền theo 2 cách:
> 1. Nếu bạn chỉ truyền một key thì có thể sử dụng cú pháp `with($key, $value)`.
> 2. Nếu bạn truyền một mảng dữ liệu thì sử dụng cú pháp `with($data)`.

Ngoài ra, bạn có thể truyền dữ liệu cho tất cả các view có trong source code với method `share` trong view facade. Phương thức này sẽ được khi báo ở `AppServiceProvider` tại method `boot`:

```PHP:app/Providers/AppServiceProvider.php
public function boot()
{
    View::share('key', 'value');
}
```

Như thế này thì tất cả các file view đều có thể gọi `$key` với giá trị là `value`.

# III. Một số phương thức view (Some view's method)
Cũng như các component khác, view facade cung cấp cho chúng ta một số method để có thể tương tác với component này.

## 1. Xác định tồn tại của một view (Determining if a view exists)

Nếu bạn muốn kiểm tra xem view có tồn tại hay không thì view facade cung cấp cho chúng ta method `exists` để làm điều này, nếu tồn tại view sẽ trả về `true`.

```PHP
use Illuminate\Support\Facades\View;

if (View::exists('admin.setting')) {
    //
}
```

## 2. The first available view

Chúng ta có thể tùy chỉnh thứ tự xuất hiện một tập hợp cái template thông qua method `first`.
Method này sẽ nhận một mảng các view được ưu tiên xuất hiện theo thứ tự từ trái qua phải, chẳng hạn:

```PHP:routes/web.php
Route::get('/', function () {
    return view()->first(['no_exist', 'welcome']);
});
```

Ở đây global helper function `view` sẽ trả về một object nên ta có thể tham chiếu tiếp đến method `first`. Như các bạn thấy, mình đã cố tình nhập view `no_exist` (view này không hề tồn tại trong source code) ở phần tử đầu tiên trong mảng. Như đã nói ở trên, Laravel sẽ lần lượt kiểm tra các view này từ trái qua phải, nếu view nào không tồn tại thì nó sẽ bỏ qua. Đến đây chắc các bạn cũng đoán được kết quả như thế nào rồi đúng không? Vâng, sau khi chạy đường dẫn http://localhost:8000 thì chúng ta nhận được view `welcome`.

Bạn có thể sử dụng view facade để thay cho cú pháp trên:

```PHP
use Illuminate\Support\Facades\View;

return View::first(['no_exist', 'welcome']);
```

Thông thường ta hay ứng dụng phương thức này cho các hệ thống có thể tùy chỉnh hoặc ghi đè  giao diện.

# IV. View composer
Đây có vẻ là phần trừu tượng, khó hình dung nhất trong component này. View composer là các callback hoặc là các phương thức được gọi lại khi một view sắp sửa xuất ra (render). Nếu bạn có một dữ liệu nào đó mà bạn muốn truyền vào một view khi nó chuẩn bị render thì view composer sẽ giúp bạn tổ chức logic, tách rời, dễ kiểm soát. Nôm na dễ hiểu view composer thực hiện công việc truyền dữ liệu cho view, nhưng theo một cách đầy "khoa học".

## 1. Đăng ký view composer (Registering view composer)
Bây giờ chúng ta sẽ đăng ký view composer trong service container như là một service provider. Đầu tiên ta khởi tạo provider `ViewComposerProvider` với lệnh Artisan sau:

> php artisan make:provider ViewComposerProvider

Nên nhớ hãy liệt kệ `ViewComposerProvider` vừa khởi tạo trong mảng `providers` ở `config/app.php`.

```PHP:config/app.php
'providers' => [
    // ..
    App\Providers\ViewComposerProvider::class,
],
```

Tiếp theo mở file `app/Providers/ViewComposerProvider.php` lên và thay đổi nội dung nó thành:

```PHP:app/Providers/ViewComposerProvider.php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewComposerProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        // Registering composer with Class
        View::composer(
            'profile', 'App\Http\View\Composers\ProfileComposer'
        );

        // Registering composer with Closure
        View::composer('dashboard', function ($view) {
            //
        });
    }
}
```

Trước tiên, chúng ta sẽ phân tích từ đoạn code một.

Ta đã `use` View facade vào class này để có thể thực hiện composer. Nếu việc binding được viết ở method `register` thì composer lại được viết ở `boot`.

Bây giờ hãy quan sát đoạn code trong method `boot` sẽ thấy có hai cách để đăng ký view composer.

### a. Đăng ký composer với class (Registering composer with class)
Ở cách đầu tiên:
* Tham số thứ nhất đó chính là tên của view cần truyền dữ liệu. 
* Tham số thứ hai sẽ chứa namespace class thực hiện việc compose

Mặc định thì Laravel không tạo thư mục chứa các file composer mà để chúng ta tự tổ chức. Bạn có thể tạo cấp thư mục như sau để chứa các composer:

```
app/
├── Http/
|   ├── View/
|   |   ├── Composers/
|   |   |   |   ProfileComposer.php 
```

Trong file `ProfileComposer.php` chúng ta sẽ code như thế này:

```PHP:app/Http/View/Composers/ProfileComposer.php
<?php

namespace App\Http\View\Composers;

use Illuminate\View\View;

class ProfileComposer
{
    public function compose(View $view)
    {
        $view->with('name', 'Lê Chí Huy');
    }
}
```

Bắt buộc trong file composer phải định nghĩa method `compose` và inject cho nó class `Illuminate\View\View`, từ đó ta mới có thể dùng phương thức `with` để truyền dữ liệu cho view đã đăng ký ở `ViewComposerProvider`.

Cách hoạt động của hình thức đăng ký composer với class đó là khi một view tương ứng chuẩn bị  render thì sẽ gọi phương thức `compose` của class đã đăng ký chung với view đó. Trong trường hợp trên thì khi view `profile` sắp render thì `ProfileComposer@compose` sẽ được thực thi để truyền các dữ liệu.

"Nói có sách, mách có chứng", chúng ta sẽ tạo thử view `profile` và xem nó hoạt động ra sao.

```PHP:resources/views/profile.php
<h1>Profile <?php echo $name ?></h1>
```

Tiếp đó là đăng ký một route để render view `profile`:

```PHP:routes/web.php
Route::get('/profile', function () {
    return view('profile');
});
```

Như bạn thấy thì mình không truyền bất cứ dữ liệu nào vào hàm `view` cả, bây giờ thử nạp server và kết quả thu được là:

![](https://images.viblo.asia/b379d9a6-2bda-4c55-94bf-d7f098609ec0.JPG)

> **Lưu ý:** Tất cả các file composer đều resolve thông qua service container, vì vậy ta có thể type-hint bất kỳ dependency class nào cần thiết trong phương thức `__construct`.

### b. Đăng ký composer với closure (Registering composer with closure)
Với cách này sẽ ngắn gọn hơn so với đăng ký theo class vì chúng ta không cần phải khởi tạo file composer mà chỉ cần truyền dữ liệu trực tiếp thông qua Closure.

```PHP:app/Providers/ViewComposerProvider.php
View::composer('dashboard', function ($view) {
    $view->with('name', 'Lê Chí Huy');
});
```

Mình đã truyền dữ liệu cho view `dashboard` thông qua `$view` của Closure.

Giờ hãy thử tạo view `dashboard` với nội dung:

```PHP:resources/views/dashboard.php
<h1>Welcome, <?php echo $name; ?></h1>
```

Sau đó là đăng ký route:

```PHP:routes/web.php
Route::get('/', function () {
    return view('dashboard');
});
```

Rồi, nạp server và kiểm chứng thôi.

> Vậy cân nhắc lựa chọn từng cách đăng ký view composer sao cho hợp lý đây? Thì đây là ý kiến riêng của mình, đối với các view mà sẽ nhận dữ liệu từ database thì nên đăng ký composer theo class để dễ dàng type-hint các dependency class cần thiết cho việc lấy dữ liệu. Còn nếu chỉ là truyền một số dữ liệu đơn giản, thao tác nhanh thì nên cân nhắc để chọn cách đăng ký composer theo closure để giảm tốn thời gian, rườm rà.

Bạn có thể đăng ký một view composer cho nhiều view khác nhau bằng cách chuyển tham số thứ nhất về dạng mảng và liệt kê các view cần thiết.

```PHP
View::composer(
    ['profile', 'dashboard'],
    'App\Http\View\Composers\ProfileComposer'
);
```

Trong trường hợp bạn muốn tất cả các view đều được truyền một dữ liệu chung thì bạn có thể sử dụng ký tự `*` để thay thế tên view, framework sẽ hiểu là bạn đã chọn tất cả các view đang có trong source code.

```PHP
View::composer('*', function ($view) {
    //
});
```

## 2. View creator
Về hình thức thì view creator chẳng khác gì mấy so vớ view composer, tuy nhiên về cách hoạt động thì có sự khác biệt về trình tự. Nếu composer thực thi khi view sắp sửa render thì creator lại thực thi khi vừa khởi tạo view thay vì chờ nó chuẩn bị render.

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ