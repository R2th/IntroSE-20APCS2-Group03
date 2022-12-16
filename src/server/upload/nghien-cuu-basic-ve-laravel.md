## Các câu lệnh cơ bản:

- Xem version php

```
php -v
```

- Xem đường dẫn php

```
which php
```

sau câu lệnh này, thấy đường dẫn dạng: `/usr/bin/php` thì kiểu này dùng mặc định php đã setup vào trong máy.
thay đổi mặc định bằng cách vào `~/.bash_profile` edit lại đường dẫn dạng như sau: `export PATH=/Applications/XAMPP/xamppfiles/bin:$PATH`

Sau khi edit xong, gọi lệnh `source ~/.bash_prpfile` để apply thay đổi.

### Debug:

Debug log in each view

```
tail -f storage/logs/laravel.log & php artisan serve
```

Debug sql query:

```
http://localhost/phpmyadmin/server_variables.php
-> Enable genrate log -> ON
```

## Cấu trúc thư mục trong Laravel:

tham khảo: https://hocwebchuan.com/tutorial/laravel/laravel_project_structure.php

## Eloquent ORM trong Laravel

- Mỗi bảng trong csdl tương ứng với 1 model. 
- Model cho phép query, insert, update table trong db.

Lệnh tạo 1 model:

```
php artisan make:model Flight

// muon tao db luon
php artisan make:model Flight --migration

php artisan make:model Flight -m
```

## Facade:

### What ?

- Facade cung cấp 1 static interface cho các Class sẵn có trong service container.
- Larvel cung cấp hầu hết đầy đủ các facade để làm việc với các features của Laravel.

vd:
```
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

### Khi nào sử dụng ?

- Có nhiều lợi ích như: ngắn gọn, dễ nhớ để sử dụng hết tất cả các features của Laravel mà ko phải nhớ hết các Class có tên rất dài.
- Sử dụng để dễ dàng tạo trong việc testing. ( dạng interface)

### Facade & Dependence Injection:

- facades use dynamic methods to proxy method calls to objects resolved from the service container, we actually can test facades just as we would test an injected class instance.

ex:

```
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

Viết test để verify Cache::get:

```
use Illuminate\Support\Facades\Cache;

/**
 * A basic functional test example.
 *
 * @return void
 */
public function testBasicExample()
{
    Cache::shouldReceive('get')
         ->with('key')
         ->andReturn('value');

    $this->visit('/cache')
         ->see('value');
}
```

### Facade work ntn?

- The Facade base class makes use of the `__callStatic()`  magic-method to defer calls from your facade to an object resolved from the container
- vd:

```
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function showProfile($id)
    {
        $user = Cache::get('user:'.$id);

        return view('profile', ['user' => $user]);
    }
}
```

## Blade Templates trong Laravel:

### What?

Blade là công cụ tạo khuôn mẫu đơn giản nhưng mạnh mẽ được cung cấp với Laravel. Ko giống như các template php engine khác, Blade ko hạn chế sử dụng code PHP trong view. Các đoạn mã Blade thì được biên dịch thành code PHP thuần & lưu vào bộ nhớ cache cho đến khi nó được thay đổi. Blade view sử dụng : `.blade.php` nằm trong thư mục `resources/views `

### Kế thừa template ( Template Inheritance):

#### Tạo 1 layout

2 Mục đích quan trong khi sử dụng blade : kế thừa template &  sections. Xem vd:

```php
<!-- Stored in resources/views/layouts/app.blade.php -->

<html>
    <head>
        <title>App Name - @yield('title')</title>
    </head>
    <body>
        @section('sidebar')
            This is the master sidebar.
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
```

Ở 1 template khác sẽ khai báo 1 section `content` thì content sẽ được vẽ ngay đoạn @yield

@section : định 1 nội dung
@yield: dùng để hiển thị nội dung của section.

#### Mở rộng cho 1 layout

Khi tạo ra 1 view con, sử dụng Blade `@extends` để chỉ định bố cục mà view con sẽ kế thừa. 
vd :

```
<!-- Stored in resources/views/child.blade.php -->

@extends('layouts.app')

@section('title', 'Page Title')

@section('sidebar')
    @parent

    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
    <p>This is my body content.</p>
@endsection
```

`@parent:` để thay thế nội dụng ở thằng view cha.

### Components & Slots

```
<!-- /resources/views/alert.blade.php -->

<div class="alert alert-danger">
    {{ $slot }}
</div>
```

Tạo component để hiển thị trong {{ $slot }}

```
@component('alert')
    <strong>Whoops!</strong> Something went wrong!
@endcomponent
```

multiple slots for a component

```
<!-- /resources/views/alert.blade.php -->

<div class="alert alert-danger">
    <div class="alert-title">{{ $title }}</div>

    {{ $slot }}
</div>
```

Define component

```
@component('alert')
    @slot('title')
        Forbidden
    @endslot

    You are not allowed to access this resource!
@endcomponent
```

#### Note Blade:

`{{ }}` : Blade gửi data qua PHP qua chức năng : htmlspecialchars.

`{!! $name !!}` : gửi mà ko muốn data escaped.

`@if` `@elseif` .. điều kiện

```
@unless (Auth::check())
    You are not signed in.
@endunless
```

```
@isset($records)
    // $records is defined and is not null...
@endisset

@empty($records)
    // $records is "empty"...
@endempty
```

Include sub-view:

```
<div>
    @include('shared.errors')

    <form>
        <!-- Form Contents -->
    </form>
</div>
```

Render View cho Collections:

```
@each('view.name', $jobs, 'job')
```

### Các lib hữu ích Laravel:

- https://github.com/anlutro/laravel-settings/
-