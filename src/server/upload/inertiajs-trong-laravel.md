# InertiaJS là gì
InertiaJs là một framework javascript để tạo ra một server-driven single page app với mục tiêu là cho phép developer có thể xây dựng các ứng dụng phía client phong phú mà không cần phức tạp trong việc xây dựng toàn bộ single page app với API đi kèm. Nó không dùng để thay thế framework hiện tại mà dùng để bổ sung và hoàn thiện cho chúng.

*Bài viết này sẽ đi tìm hiểu Inertia cho ứng dụng với Vue và Laravel. Từ đó bạn cũng hoàn toàn có thể sử dụng cho bất kỳ server-side framework cũng như client-side framework nào có hỗ trợ dynamic component*
# Sử dụng InertiaJS
Để sử dụng Inertia bạn sẽ phải thiết lập ở cả phía client và server.
## InertiaJS cho Laravel
### Cài đặt
Sử dụng composer để cài đặt Inertia cho laravel
> composer require inertiajs/inertia-laravel
> 
### Cài đặt template gốc
Bước đầu tiên để thiết lập inertia trong laravel là phải tạo ra một root template. Theo như lời khuyên trên doc thì mình nên sử dụng file `app.blade.php` bởi lẽ mặc định của thằng Inertia sẽ sử dụng file này, nếu bạn muốn sử dụng file khác thì bạn sẽ phải thực hiện thêm một bước nữa để thiết lập sử dụng `Inertia::setRootView()`:

```AppServiceProvider.php
public function register()
{
    Inertia\Inertia::setRootView('name');
}
```

Root template sẽ bao gồm phần js và css dùng chung cho toàn bộ ứng dụng (assets) cùng @inertia directive. Nhìn chung trông nó sẽ như thế này
``` app.blade.php
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<meta name="csrf-token" content={{ csrf_token() }}>
<link href="{{ asset('css/app.css') }}" rel="stylesheet">
<script src="{{ asset('js/app.js') }}" defer></script>
</head>
<body class="hold-transition skin-blue sidebar-mini">

@inertia

</body>
</html>
```

Giải thích một chút về `@inertia` derective, nó dùng để tạo ra một base `div` chứa thuộc tính `data-page` sẽ bao gồm các thông tin đầu vào của trang. Trông nó sẽ như dưới đây
```
<div id="app" data-page="{{ json_encode($page) }}"></div>
```
### Thêm Inertia Middleware
Việc tiếp theo đó là thêm `Inertia\Middleware` middleware vào group middlewarre `web` trong file `app/Http/Kernel.php`

Thằng middleware này làm nhiệm vụ giám sát các thay đổi asset và sửa các trường hợp với http code là 302 redirect. Phải đặt middleware này sau bất kỳ middleware nào liên quan đến session.
```Kernel.php
protected $middlewareGroups = [
    'web' => [
        // ...
        \Inertia\Middleware::class,
    ]
];
```
### Inertia Response
Sử dụng `Inertia::render` để trả về response trong controller, hàm này có hau đối số là tên của component và dữ liệu cho component (props).

```
use Inertia\Inertia;

class EventsController extends Controller
{
    public function show(Event $event)
    {
        return Inertia::render('Event', [
            'event' => $event->only('id', 'title', 'start_date', 'description'),
        ]);
    }
}
```
Ngoài ra còn có thể sử dụng phương thức `with()` tương tự như laravel thông thường để truyền dữ liệu xuống component:
```
use Inertia\Inertia;

class EventsController extends Controller
{
    public function show(Event $event)
    {
        return Inertia::render('Event')
            ->with('event', $event->only('id', 'title', 'start_date', 'description'));
    }
}
```

Mình có lưu ý một chút nếu component của bạn không nằm luôn dưới thư mục `js/components` thì tên component trong render sẽ phải có cả đường dẫn đến component đó.

### Redirect
Khi tạo một request mà không phải là phương thức GET, phải đảm bảo rằng respond vẫn thích hợp với Inertia response. Ví dụ nếu bạn muốn tạo một user mới endpoint của hàm store nên chuyển hướng đến GET endpoint ví dụ như trang user index. Inertia sẽ tự động redirect và update phù hợp. Dưới đây là một ví dụ đơn giản
```
class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', ['users' => User::all()]);
    }

    public function store()
    {
        User::create(
            Request::validate([
                'first_name' => ['required', 'max:50'],
                'last_name' => ['required', 'max:50'],
                'email' => ['required', 'max:50', 'email'],
            ])
        );

        return Redirect::route('users');
    }
}
```
*Lưu ý:* Nếu bạn redirect sau phương thức PUT, PATCH hoặc DELETE bạn phải sử dụng response code là 303, nếu không, request tiếp theo sẽ không được coi là một GET request. Redirect 303 cũng gần giống như redirect 302 ngoại trừ request tiếp theo sẽ được thay đổi thành GET request.
### Sharing data
Để chia sẻ dữ liệu đến tất cả các component có thể sử dụng `Inertia::share($key, $data)`.
```
Inertia::share('app.name', Config::get('app.name'));

Inertia::share('auth.user', function () {
    return auth()->user() ?? null;
});
```
Ngoài ra còn có thể lấy dữ liệu đã được chia sẻ với cùng method này `Inertia::share($key)`, nếu không tìm thấy key này phương thức sẽ trả về null.

### Truy cập dữ liệu trong root template
Có những tình huống bạn sẽ muốn truy cập prop data trong blade template gốc, ví dụ bạn muốn thêm thẻ meta như twitter card hoặc facebook open graph, bạn có thể sử dụng biến `$page`
```
<meta name="twitter:title" content="{{ $page['props']['event']->title }}">
```
Đôi khi bạn muốn cung cấp dữ liệu chỉ dùng trong blade, truy cập như một biến blade thông thường mà không được gửi tới javascript component có thể sử dụng `withViewData()` method. 
```
return Inertia::render('Event', ['event' => $event])->withViewData(['meta' => $event->meta]);
```
```
// truy cập trong blade
<meta name="description" content="{{ $meta }}">
```
### Version
Các sigle page app thường có một vấn để chung đó là refresh asset site khi chúng đã được thay đổi. Inertia làm cho quá trình chuyển đổi này trở nên dễ dàng hơn bằng cách tùy chọn theo dõi version tài sản trong trang của bạn, trong trường hợp nó thay đổi, Inertia sẽ tự động thực hiện một lượt truy cập đến một page cứng thay vì truy cập ajax đến yêu cầu tiếp theo.

Để cho phép refresh tài sản trang tự động, việc đầu tiên là gọi đến phương thức `Inertia::version($version)` trong phiên bản hiện tại. Nên gọi trong AppServiceProvider
```AppServiceProvider.php
Inertia::version($version);
```
Nếu sử dụng laravel mix, bạn có thể sử dụng `mix-manifest.json`
```
Inertia::version(function () {
    return md5_file(public_path('mix-manifest.json'));
});
```
Cuối cùng chắc chắn rằng bạn đã thiết lập version trong `webpack.mix.js` để kích hoạt bộ đệm.
# Tài liệu tham khảo
> https://github.com/inertiajs/inertia-laravel