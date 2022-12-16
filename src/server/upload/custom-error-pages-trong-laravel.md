# Giới thiệu
Mặc định trong  **Laravel**  khi chúng ta đưa ra các mã lỗi như 404, 401, 500... hệ thống sẽ xử lý và đưa ra các trang thông báo lỗi default trông rất đơn giản và không được đẹp mắt
Hôm nay mình sẽ chỉ các bạn cách custom lại các trang này và điều này rất đơn giản trong phiên bản **Laravel 8**
Vì là demo nên mình cũng chỉ tạo ra các page đơn giản thôi còn lại các bạn tự sáng tạo tùy ý nhé :))
# Tạo project
Mình sẽ tạo một project demo bằng composer 
```
composer create-project laravel/laravel example-app
```
Đợi một lát phiên bản laravel 8 mới nhất sẽ được tải về thư mục của bạn
Tiếp theo start server của project :
```
cd example-app
php artisan serve
```
Và mở url local: http://127.0.0.1:8000/
# Tạo các view erors page
Tiếp theo chúng ta sẽ tạo ra các view cho các trang sẽ hiển thị lỗi tương ứng ở thư mục **resources/views/errors**

**404.blade.php:**
```
@extends('errors.layouts')

@section('code', '401')
@section('title', __('Unauthorized'))

@section('image')
    <div style="background-image: url({{ asset('/svg/403.svg') }});" class="absolute pin bg-cover bg-no-repeat md:bg-left lg:bg-center">
    </div>
@endsection

@section('message', __('Sorry, you are not authorized to access this page.'))
```

**401.blade.php:**
```
@extends('errors.layouts')

@section('code', '404')
@section('title', __('Page Not Found'))

@section('image')
    <div style="background-image: url({{ asset('/svg/404.svg') }});" class="absolute pin bg-cover bg-no-repeat md:bg-left lg:bg-center">
    </div>
@endsection

@section('message', __('Sorry, the page you are looking for could not be found.'))
```

**500.blade.php:**
```
@extends('errors.layouts')

@section('code', '500')
@section('title', __('Error'))

@section('image')
    <div style="background-image: url({{ asset('/svg/500.svg') }});" class="absolute pin bg-cover bg-no-repeat md:bg-left lg:bg-center">
    </div>
@endsection

@section('message', __('Whoops, something went wrong on our servers.'))
```
Tương tự cho các mã lỗi khác chúng ta cũng tạo các view tương ứng cho nó
Ở trên mình đã extends errors.layouts vì vậy mình sẽ cần tạo thêm một file layouts.blade nữa trong **resources/views/errors**

**layouts.blade.php:**
```
<!doctype html>
<html lang="en">
<head>
    <title>@yield('title')</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <style>
        html {
            line-height: 1.15;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }
        body {
            margin: 0;
        }
        header,
        nav,
        section {
            display: block;
        }
        figcaption,
        main {
            display: block;
        }
        a {
            background-color: transparent;
            -webkit-text-decoration-skip: objects;
        }
        strong {
            font-weight: inherit;
        }
        strong {
            font-weight: bolder;
        }
        code {
            font-family: monospace, monospace;
            font-size: 1em;
        }
        dfn {
            font-style: italic;
        }
        svg:not(:root) {
            overflow: hidden;
        }
        button,
        input {
            font-family: sans-serif;
            font-size: 100%;
            line-height: 1.15;
            margin: 0;
        }
        button,
        input {
            overflow: visible;
        }
        button {
            text-transform: none;
        }
        button,
        html [type="button"],
        [type="reset"],
        [type="submit"] {
            -webkit-appearance: button;
        }
        button::-moz-focus-inner,
        [type="button"]::-moz-focus-inner,
        [type="reset"]::-moz-focus-inner,
        [type="submit"]::-moz-focus-inner {
            border-style: none;
            padding: 0;
        }
        button:-moz-focusring,
        [type="button"]:-moz-focusring,
        [type="reset"]:-moz-focusring,
        [type="submit"]:-moz-focusring {
            outline: 1px dotted ButtonText;
        }
        legend {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: inherit;
            display: table;
            max-width: 100%;
            padding: 0;
            white-space: normal;
        }
        [type="checkbox"],
        [type="radio"] {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 0;
        }
        [type="number"]::-webkit-inner-spin-button,
        [type="number"]::-webkit-outer-spin-button {
            height: auto;
        }
        [type="search"] {
            -webkit-appearance: textfield;
            outline-offset: -2px;
        }
        [type="search"]::-webkit-search-cancel-button,
        [type="search"]::-webkit-search-decoration {
            -webkit-appearance: none;
        }
        ::-webkit-file-upload-button {
            -webkit-appearance: button;
            font: inherit;
        }
        menu {
            display: block;
        }
        canvas {
            display: inline-block;
        }
        template {
            display: none;
        }
        [hidden] {
            display: none;
        }
        html {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            font-family: sans-serif;
        }
        *,
        *::before,
        *::after {
            -webkit-box-sizing: inherit;
            box-sizing: inherit;
        }
        p {
            margin: 0;
        }
        button {
            background: transparent;
            padding: 0;
        }
        button:focus {
            outline: 1px dotted;
            outline: 5px auto -webkit-focus-ring-color;
        }
        *,
        *::before,
        *::after {
            border-width: 0;
            border-style: solid;
            border-color: #dae1e7;
        }
        button,
        [type="button"],
        [type="reset"],
        [type="submit"] {
            border-radius: 0;
        }
        button,
        input {
            font-family: inherit;
        }
        input::-webkit-input-placeholder {
            color: inherit;
            opacity: .5;
        }
        input:-ms-input-placeholder {
            color: inherit;
            opacity: .5;
        }
        input::-ms-input-placeholder {
            color: inherit;
            opacity: .5;
        }
        input::placeholder {
            color: inherit;
            opacity: .5;
        }
        button,
        [role=button] {
            cursor: pointer;
        }
        .bg-transparent {
            background-color: transparent;
        }
        .bg-white {
            background-color: #fff;
        }
        .bg-teal-light {
            background-color: #64d5ca;
        }
        .bg-blue-dark {
            background-color: #2779bd;
        }
        .bg-indigo-light {
            background-color: #7886d7;
        }
        .bg-purple-light {
            background-color: #a779e9;
        }
        .bg-no-repeat {
            background-repeat: no-repeat;
        }
        .bg-cover {
            background-size: cover;
        }
        .border-grey-light {
            border-color: #dae1e7;
        }
        .hover\:border-grey:hover {
            border-color: #b8c2cc;
        }
        .rounded-lg {
            border-radius: .5rem;
        }
        .border-2 {
            border-width: 2px;
        }
        .hidden {
            display: none;
        }
        .flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
        }
        .items-center {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }
        .justify-center {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
        }
        .font-sans {
            font-family: Nunito, sans-serif;
        }
        .font-light {
            font-weight: 300;
        }
        .font-bold {
            font-weight: 700;
        }
        .font-black {
            font-weight: 900;
        }
        .h-1 {
            height: .25rem;
        }
        .leading-normal {
            line-height: 1.5;
        }
        .m-8 {
            margin: 2rem;
        }
        .my-3 {
            margin-top: .75rem;
            margin-bottom: .75rem;
        }
        .mb-8 {
            margin-bottom: 2rem;
        }
        .max-w-sm {
            max-width: 30rem;
        }
        .min-h-screen {
            min-height: 100vh;
        }
        .py-3 {
            padding-top: .75rem;
            padding-bottom: .75rem;
        }
        .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        .pb-full {
            padding-bottom: 100%;
        }
        .absolute {
            position: absolute;
        }
        .relative {
            position: relative;
        }
        .pin {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        .text-black {
            color: #22292f;
        }
        .text-grey-darkest {
            color: #3d4852;
        }
        .text-grey-darker {
            color: #606f7b;
        }
        .text-2xl {
            font-size: 1.5rem;
        }
        .text-5xl {
            font-size: 3rem;
        }
        .uppercase {
            text-transform: uppercase;
        }
        .antialiased {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .tracking-wide {
            letter-spacing: .05em;
        }
        .w-16 {
            width: 4rem;
        }
        .w-full {
            width: 100%;
        }
        @media (min-width: 768px) {
            .md\:bg-left {
                background-position: left;
            }
            .md\:bg-right {
                background-position: right;
            }
            .md\:flex {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
            }
            .md\:my-6 {
                margin-top: 1.5rem;
                margin-bottom: 1.5rem;
            }
            .md\:min-h-screen {
                min-height: 100vh;
            }
            .md\:pb-0 {
                padding-bottom: 0;
            }
            .md\:text-3xl {
                font-size: 1.875rem;
            }
            .md\:text-15xl {
                font-size: 9rem;
            }
            .md\:w-1\/2 {
                width: 50%;
            }
        }
        @media (min-width: 992px) {
            .lg\:bg-center {
                background-position: center;
            }
        }
    </style>
</head>
<body class="antialiased font-sans">
<div class="md:flex min-h-screen">
    <div class="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div class="max-w-sm m-8">
            <div class="text-black text-5xl md:text-15xl font-black">
                @yield('code', __('Oh no'))
            </div>

            <div class="w-16 h-1 bg-purple-light my-3 md:my-6"></div>

            <p class="text-grey-darker text-2xl md:text-3xl font-light mb-8 leading-normal">
                @yield('message')
            </p>

            <a href="{{ app('router')->has('home') ? route('home') : url('/') }}">
                <button class="bg-transparent text-grey-darkest font-bold uppercase tracking-wide py-3 px-6 border-2 border-grey-light hover:border-grey rounded-lg">
                    {{ __('Go Home') }}
                </button>
            </a>
        </div>
    </div>

    <div class="relative pb-full md:flex md:pb-0 md:min-h-screen w-full md:w-1/2">
        @yield('image')
    </div>
</div>
</body>
</html>
```
**Xem thử**
Cuối cùng để xem thử các view này chúng ta thử sửa file routes/web.php thành như sau: 
Các bạn có thể đưa các trang lỗi này trong dự án tùy vào từng router cụ thể hoặc từng case cụ thể , ở đây mình đưa trang ngay trong home page để test thử thôi nhé
```
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    abort(404);
});
```
và kết quả chúng ta sẽ được một trang thông báo lỗi trông sinh động hơn đấy
![](https://images.viblo.asia/bd946374-453b-4893-b9c1-b92e117ad253.png)
Tương tự để xem thử các trang lỗi khác abort(401);, abort(500);...
Cảm ơn các bạn đã theo dõi

Nguồn tham khảo tại : https://welcm.uk/blog/custom-error-pages-in-laravel