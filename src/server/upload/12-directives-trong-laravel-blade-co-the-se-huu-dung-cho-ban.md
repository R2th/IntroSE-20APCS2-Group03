# Mở đầu
Nếu các bạn đã từng sử dụng Laravel, dù là master hay newbie thì có lẽ cũng không xa lạ gì với khái niệm Blade trong Laravel. Hôm nay mình sẽ xin giới thiệu 12 directives trong Laravel Blade. Có thể có những cái bạn đã quen thuộc, nhưng cũng sẽ có những thứ bạn hiếm hoặc chưa bao giờ sử dụng. Cùng thử tìm hiểu xem nhé :smile:

# 1. @include
Bạn có thể sử dụng `@include` để đính kèm một file blade khác trong view hiện tại. Nó hoạt động như `include` của PHP cơ bản vậy
``` php
@include('layouts.sidebar')
```

Bạn cũng có thể truyền một mảng để truyền dữ liệu tới view kia như sau
``` php
@include('layouts.sidebar', ['sidebars' => $sidebars])
```

# 2. @includeWhen
Một directive mở  rộng của `@include`. Bạn sẽ có thể include một view nếu thỏa mãn  điều kiện đã cho.
``` php
@includeWhen($isUserAdmin, 'users.admin_card', ['user' => $user])
```
# 4. @push & @stack
Laravel Blade cho phép bạn định nghĩa một placeholder, trong đó sẽ gọi `@stack`, sau đó ở trong view con sẽ sử dụng `@push` để đẩy giá trị vào stack đó

``` php
// Main view
@stack('script')
```

``` php
// Chid view
@push('script')
         // content here
@endpush
```

# 5. @php
Bạn có thể sử dụng code PHP trong view như cách thông thường với việc mở và đóng thẻ PHP `<?php ?>`. Nhưng Laravel cũng cấp 1 directvie là `@php`. Cách hoạt động thì vẫn như vậy nhưng nhìn code của chúng ta trông sẽ clean hơn (theo cảm quan của mình là vậy :smile:)

``` php
@php
    // Code here
@endphp
```

# 6. @errors
Một directive khá hữu dụng cho việc validate nè

```php
@error('title')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror
```

# 7. @json
Nếu bạn cần truyền một mảng vào javascript thì sao. Đơn giản nhất thì sử dụng `json_endcode`. Và đây là một lựa chọn khác cho bản, kết quả là một nhưng lại đơn giản là nhìn code trong clean hơn thôi :smile:. Ở đây mình dùng trực tiếp trong `<script></script>`, nhưng thực tế thì không nên nhé

```php
<script>
    let posts = @json($posts)
</script
```

# 8. @verbatim
Nếu bản cần hiển thị biến Javascript trong phần lớn view, bạn có thể bọ HTML trong  `@verbatim` 
```php
@verbatim
    <div class="container">
        Hello, {{ name }}.
    </div>
@endverbatim
```

# 9. @auth, @guest
Nếu bạn có view mà chỉ muốn render cho những người dùng đăng nhập thì có thể sử dụng directive này
```php
@auth
    // The user is authenticated...
@endauth

@guest
    // The user is not authenticated...
@endguest
```

Cụ thể hơn, bạn muốn check kĩ xem quyền nào được truy cập
```php
@auth('admin')
    // The user is authenticated...
@endauth
```

# 10. @inject
Nếu bạn muốn nhận một giá trị từ Service Container vào view của mình thì có thể sử dụng directive này

```php
@inject('menu', 'App\Services\MenuService')

// then in your view

{!! $menu->render() !!}
```

# 11. @isset and @empty
Chúng ta có thể thay thể
```php
@if(isset($var))
// your logic here
@endif

@if(empty($var))
// your logic here
@endif
```

bằng

```php
@isset($var)
// your logic here
@endisset

@empty($var)
// your logic here
@endempty
```

# 12. @csrf and @method
Có lẽ `@csrf` cũng không còn xa lạ với mọi người nữa
```php
<form method="POST" action="/action">
@csrf
</form>
```

Form HTML thì sẽ không có những method như `PUT, PATCH, DELETE`. Do đó bạn cần dùng `@method` nếu bản sử dụng các phương thức này
```php
<form method="POST" action="/action">
@method('PUT')
</form>
```

Tài liệu tham khảo:

* https://www.larashout.com/12-awesome-laravel-blade-directives-to-try-today
* https://laravel.com/docs/5.8/blade