Laravel - Master layout với blade template
============
## 1 Giới thiệu:
 - Trong Laravel việc tạo master layout khá đơn giản, chỉ cần nắm rõ một số thủ thuật là có thể dễ dàng handle nó , giúp cho việc kế thừa và chia nhỏ các layout tốt hơn.
 ## 2 Cấu trúc tree thư mục
```
bên trong resources/views/
├── layouts
│   └── master.blade.php
├── pages
│   └── top-page
│       └── index.blade.php
└── partial
    ├── breadcrumb.blade.php
    ├── footer.blade.php
    ├── header.blade.php
    └── sidebar.blade.php
```
 

## 3 Cài đặt Master layout
```php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{--CSRF Token--}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', config('app.name', '@Master Layout'))</title>

    {{--Styles css common--}}
    <link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    @yield('style-libraries')
    {{--Styles custom--}}
    @yield('styles')
</head>
<body>
    @include('partial.header')

    @yield('content')

    @include('partial.footer')

    {{--Scripts js common--}}
    <script src="{{ asset('js/jquery-3.4.1.js') }}"></script>
    {{--Scripts link to file or js custom--}}
    @yield('scripts')
</body>
</html>
```
## 4 Sử dụng.
- Ta vừa setup ra 1 trang master layout, trang này sẽ được kế thừa và sử dụng lại khi ta muốn tạo ra 1 trang mới, trong ví dụ này là mình sẽ tạo ra trang : views/top-page/index.blade.php
- Cùng xem mình sử dụng nó thế nào nhé:
```php
@extends('layouts.master')

@section('title', 'App - Top Page')

@section('style-libraries')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css">
@stop

@section('styles')
    {{--custom css item suggest search--}}
    <style>
        .autocomplete-group { padding: 2px 5px; }
    </style>
@stop

@section('breadcrumb')
    @include('partial.breadcrumb')
@stop

@section('content')
    <div class="main-content">
        <div class="top-page">
            @yield('breadcrumb')
            <!-- this is content -->
        </div>
   </div>
@stop

@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.js"></script>
    {{--jquery.autocomplete.js--}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.4.10/jquery.autocomplete.min.js"></script>
    {{--quick defined--}}
    <script>
      $(function () {
          // your custom javascript
      });
   </script>
@stop
```
#### Giải thích 1 chút nhé
| type | Description |
| ------- | ----------- |
| `@yield('title', 'default_value')` | Cài đặt title cho trang top, nếu bạn không gọi @section ra thì mặc định giá trị là` <title>default_value</title>` |
| `@section('title', 'App - Top Page')` | gán giá trị cho thẻ title ->  `<title>App - Top Page</title>`|
| thư mục `partial/` | Dùng để chứa các phần tử chung mà trang nào cũng có thể gọi tới và sử dụng|
| thư mục `pages/` | Dùng để chứa các trang riêng biệt, chúng ta nên chia nhỏ theo chức này của từng page trong, có vậy cây thư mục sẽ tường minh hơn|
|@yield('styles'), @yield('scripts') | chúng ta có thể dễ dàng nhúng những file css, js , hoặc viết thẳng thẻ style, thẻ script bên trong những nơi mà ta chỉ định theo từng trang, điều này sẽ giảm tải load những css và js không cần thiết|
## Tổng kết:
- Trên đây mình đã giới thiệu cho các bạn cách tạo ra 1 master layout trong laravel, khá đơn giản phải không nào.
- Với việc chia nhỏ các thành phần của 1 trang html , dễ dàng kế thừa và include các partial giúp code trong gọn gàng và dễ handle hơn đúng không. cám ơn các bạn đã theo dõi bài viết của mình. Mong mọi người cùng nhau đóng góp và chia sẽ để ngày cang tiến bộ nha.