Trong bài viết thứ nhất về hướng dẫn cơ bản, mình đã giới thiệu với các bạn về các điều sau:
1. Tạo project
1. Cài đặt bootstrap, js, ghép theme
1. Cấu hình database
1. Repository Pattern

Ở bài viết này, mình sẽ giới thiệu tiếp với các bạn các kiến thức cơ bản tiếp theo để phát triển với Laravel
# Route
Các routes trong  `routes/web.php` xác định các route dành cho giao diện web của bạn.
<br>Các routes trong `routes/api.php` xác định các route phần mềm trung gian api
### Các phương thức trong Route
Route sẽ hỗ trợ các phương thức như sau:
```php
Route::get($uri, $callback);
Route::post($uri, $callback);
Route::put($uri, $callback);
Route::patch($uri, $callback);
Route::delete($uri, $callback);
Route::options($uri, $callback);
```
Trong đó $url: đường dẫn route và $callback : là một hành động nào đó sẽ được thực hiện để trả về.

```php
Route::redirect('/here', '/there');
```

```php
Route::view('/welcome', 'welcome');
```

### Tham số tùy chọn
Nhiều khi chúng ta sẽ cần truyền tham số trên đường dẫn, chúng ta cũng có thể truyền trong route. 
```php
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
``` 
### Tên Route
```php
Route::get('user/profile', function () {
    //
})->name('profile');
```
You may also specify route names for controller actions:
```php
Route::get('user/profile', 'UserProfileController@show')->name('profile');
```
### Middleware
Để gán function middleware cho tất cả các route trong một nhóm, bạn có thể sử dụng middleware trước khi xác định route. Middleware được thực hiện theo thứ tự chúng được liệt kê trong mảng:
```php
Route::middleware(['first', 'second'])->group(function () {
    Route::get('/', function () {
        // Uses first & second Middleware
    });

    Route::get('user/profile', function () {
        // Uses first & second Middleware
    });
});
```

### Namespaces
Namespace trong Laravel giông như PHP namespace được chỉ định với một nhóm controller.
```php
Route::namespace('Admin')->group(function () {
    // Controllers Within The "App\Http\Controllers\Admin" Namespace
});
```

### Route Prefixes
Xét ví dụ sau
```php
Route::get('manager/products', 'ProductController@index');
Route::get('manager/products/create', 'ProductController@create');
Route::post('manager/products/store', 'ProductController@store');
Route::get('manager/products/{id}/edit', 'ProductController@edit');
Route::patch('manager/products/{id}', 'ProductController@update);
Route::patch('manager/products/{id}', 'ProductController@destroy');
```
Các bạn có thấy đặc điểm chung của các route đều bắt đầu bằng manager vì thể để viết gọn lại các URL thì chúng ta sẽ sử dụng prefix để URL khi định nghĩa route ngắn gọn dễ nhìn hơn.
```php
Route::group(['prefix' => 'manager'], function () {
    Route::get('products', 'ProductController@index');
    Route::get('products/create', 'ProductController@create');
    Route::post('products/store', 'ProductController@store');
    Route::get('products/{id}/edit', 'ProductController@edit');
    Route::patch('products/{id}', 'ProductController@update);
    Route::patch('products/{id}', 'ProductController@destroy');
});
```

### Sub-Domain Routing
Tên miền phụ có thể được chỉ định tham số tuyến giống như URI route, cho phép bạn  bắt một phần của tên miền phụ để sử dụng trong route hoặc controler.
<br>Tên miền phụ có thể được chỉ định bằng cách gọi phương thức miền trước khi xác định nhóm:
```php
Route::domain('{account}.myapp.com')->group(function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```
# View
### Blade Templates
Template engine có tác dụng giúp sạch đi những đoạn code PHP nằm trong View nên tách biệt hoàn toàn giữa người cắt CSS và người code PHP.
<br>Blade rất đơn giản, nhưng lại là một templating engine đầy mạnh mẽ! Blade không giới hạn chúng ta sử dụng code PHP trong views. Tất cả các file Blade sẽ được dịch thành file code PHP và cache cho đến khi file Blade bị thay đổi, điều đó cũng có nghĩa là Blade tự làm tất cả những việc cần thiết để có thể chạy views cho ứng dụng của bạn
<br>Các file view dùng cho Blade có phần tên đuôi file là `.blade.php` và được lưu trong thư mục mặc định `resources/views`
<br>**Defining A Layout**
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
**Cú pháp tạo layout**
```php
<!-- Stored in resources/views/layouts/master.blade.php -->

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

```php
<!-- Stored in resources/views/child.blade.php -->
@extends('layouts.master')

@section('title', 'Page Title')

@section('sidebar')
    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
    <p>This is my body content.</p>
@endsection
```
* Trên đây là một ví dụ về việc tạo ra một layout cho một ứng dụng
* Mỗi session sẽ là một khu vực hiển thị giữ liệu trong ứng dụng. ta chỉ cần viết một lần và nó sẽ được gọi ra ở bất kỳ một màn hình con nào được extend
* một session được bắt đầu bởi @session('name') và kết thúc bởi @endsession
* để include một layout ta sử dụng @exends('name_layout')

**Kế thừa**
<br>Đây là phần quan trọng nhất và cũng là mục tiêu của việc tạo ra các templete trong một ngôn ngữ lập trình
<br>Một templete tốt không chỉ dễ sử dụng mà còn phải có tác dụng kế thừa để có thể sử dụng lại, tránh tối đa việc lặp code
<br>Không thể nào tạo ra một file templete mà lại chỉ dùng cho một chức năng nhất định. ta phải làm cho chúng có thể sử dụng lại ở các màn hình khác có cùng chức năng.
<br>Cú pháp: 
```php
@include('_example', ['name1' = $name])`
```
```php
<!-- resources/views/_example.blade.php -->
  <p><?php echo $name1; ?></p>
```
Giờ ta include file `_examplte` vào màn hình `example`
```php
<!-- resources/views/example.blade.php -->
<div class="article">
  @include('_example', ['name1' = $name])
</div>
```
Kết quả thu được cũng tương hệt như kết quả lúc đầu. tuy nhiên từ nay ta có thể sử include templete `_example.blade.php` vào bất kỳ đoạn nào cần sử dụng đến hiển thị `$name`
<br>**Các cú pháp trong blade templete engine**
<br>Để hiển thị giữ liệu trên view ta dùng dấu `{{ $x }}`
```php
{{ $name }}
```
Khi đó file blade sẽ tự build ra temple dạng theo dạng
```php
<?php echo $name?>
```
Hiển thị giữ liệu tồn tại 
```php
{{ {{ isset($name) ? $name : 'Hello world!' }} }}
```
Cú pháp rút gọn: `{{ $name or 'Default' }}`
<br>***Chú ý:***  Blate không chấp nhận các lệnh comment thông thường của php như `// {{ $name }}`. Lúc này mặc dù dòng code đã được comment nhưng khi được build ra view thì giữ liệu vẫn được sử lý và hiển thị bình thường.
<br>
**Cấu trúc điều khiển**
<br>**Lệnh if**
```php
@if (true)
    {{ 'is true!' }}
@else
{{ 'is false!' }}
@endif
```
Có thể thấy code đã đơn giản hơn rất nhiều so với việc ta sử dụng lệnh if với cú pháp php thông thường
<br>**Vòng lặp**
```php
@for ($i = 0; $i < 10; $i++)
    Giá trị hiện tại là {{ $i }}
@endfor
```

```php
@foreach ($users as $user)
    <p>Đây là user có mã {{ $user->id }}</p>
@endforeach
```

```php
@while (true)
    <p>Tôi đang lặp mãi mãi :(</p>
@endwhile
```

### Localization
```php
/resources
    /lang
        /en
            messages.php
        /es
            messages.php
```
Ví dụ ở trên mình muốn cài đặt ngôn ngữ tiếng việt và tiếng anh cho trang web của mình. Mình tạo 2 thư mục " en " và " vi" trong " resources\lang\ " bên trong mình file messages.php trong file này mình viết các label hiển thị ra
`resources\lang\en\messages.php`  
```php
return [
    'welcome' => 'Welcome to our application'
];
```
và
`resources\lang\vi\messages.php`
```php
return [
    'welcome' => 'Welcome to our application'
];
```
**Vậy ta thiết lập xong rồi, làm thế nào để dùng nó?**
<br>Mỗi khi muốn in label thay vì ta gõ thẳng đoạn text đó bằng ngôn ngữ ta đang dùng thì ta sẽ dùng hàm trans() để gọi tới những label chúng ta vừa thiết lập.<br> Ta dùng `trans('message.welcome')`
### Laravel Collective Form/Html
Laravel collective là một package cung cấp cho chúng ta cách viết form, html với cú pháp ngắn gọn hơn, dễ nhìn hơn.<br>
***// Không dùng Laravel collective***
```php
<form action="{{ route('posts.update', $post->id) }}" method="POST">
    @csrf
    @method('PUT')
    <div class="form-group">
        <label>Category:</label>
        <select class="form-control" name="category">
            @foreach ($categories as $category)
                <option value="{{ $category->id }}" {{ $category->id == $post->category->id ? 'selected' : '' }}>
                    {{ $category->name }}
                </option>
            @endforeach
        </select>
    </div>
</form>
```
***// Dùng Laravel collective***
```php
{!! Form::open(['method' => 'PUT', 'route' => ['posts.update', $post->id]) !!}
    <div class="form-group">
        {!!  Form::label('category', 'Category:') !!}
        {!!  Form::select('category', $categories, $post->category, ['class' => 'form-control']) !!}
    </div>
{!! Form::close() !!}
```
Để cài đặt pakage này ta cài đặt nó qua composer với câu lệnh:
`composer require laravelcollective/html`
<br>Tiếp theo ta cần config để sử dụng. Bạn vào `config/app.php` và thêm Provider và Aliases sau:
```php
'providers' => [
    // ...
    Collective\Html\HtmlServiceProvider::class,
    // ...
],

// ...

'aliases' => [
    // ...
    'Form' => Collective\Html\FormFacade::class,
    'Html' => Collective\Html\HtmlFacade::class,
    // ...
],
```
## Tham Khảo
1. https://laravel.com/docs/5.7/routing
1. https://laravel.com/docs/5.7/blade
1. https://laravel.com/docs/5.7/localization
1. https://viblo.asia/p/laravel-collective-formhtml-naQZRJyvZvx
1. https://viblo.asia/p/da-ngon-ngu-trong-laravel-i18n-WAyK8LLoKxX