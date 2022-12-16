Đây là chuỗi bài viết theo phong thái dễ hiểu, đơn giản, cơ bản, phù hợp với những người bắt đầu với Laravel từ con số 0. 
# Laravel Views
   Phần này sẽ bao gồm các nội dung sau:
* Layout page
* Asset File
* Lấy dữ liệu từ database để hiển thị
## Layout page
Một trang web sẽ có rất nhiều view hay có nhiều màn hình giao diện khác nhau. Nhưng nếu một số hoặc toàn bộ các màn hình đó có điểm chung hay những đoạn code HTML chung thì việc mỗi file đều có nội dung này sẽ rất dư thừa, và vi phạm nguyên tắc **DRY - Don't Repeat Yourself**. Để có thể khắc phục được điều này ta sẽ tách phần chung đó ra một file riêng. Trong file này sẽ gọi nội dung riêng biệt của các file views còn lại và in ra. File này thường đặt tên là `layout.blade.php`. Để dễ hiểu hơn hãy đi vào thực tế nhé.

File `resources/views/welcome.blade.php` thực tế có phần `<head>` rất dài, và nội dung riêng biệt thường ở trong phần `<body>`. Chúng ta sẽ copy toàn bộ trừ phần nội dung riêng biệt trong body sang file  `resources/views/layout.blade.php`.
Có thể tạo file mới bằng câu lệnh sau trên terminal `touch resources/views/layout.blade.php`. Trong phần nội dung thẻ `<body>` chúng ta thêm dòng code `@yield('content')`. Nội dung file layout view sẽ như sau.
```html:resources/views/info.blade.php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        ...
        
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @yield('content')
        </div>
    </body>
</html>
```
File welcome view ta cũng sẽ chỉnh tương ứng như sau:
```html:resources/views/welcome.blade.php
#Cho ta biết file này là nội dung thêm của file `layout.blade.php`.
@extends('layout')

#Nội dung riêng biệt được đặt trong cặp @section('tên section')~@endsection
@section('content')
    <div class="flex-center position-ref full-height">
       ...

        <div class="content">
            <div class="title m-b-md">
                Laravel
            </div>

            <div class="links">
                <a href="https://laravel.com/docs">Docs</a>
                <a href="https://laracasts.com">Laracasts</a>
                <a href="https://laravel-news.com">News</a>
                <a href="https://blog.laravel.com">Blog</a>
                <a href="https://nova.laravel.com">Nova</a>
                <a href="https://forge.laravel.com">Forge</a>
                <a href="https://vapor.laravel.com">Vapor</a>
                <a href="https://github.com/laravel/laravel">GitHub</a>
            </div>
        </div>
    </div>
@endsection
```
Với file info view ta cũng sẽ làm tương tự.
```html:resources/views/info.blade.php
@extends('layout')

@section('content')
    {{ $detail->body }}
    Hello
@endsection
```
Lúc này dòng code trong file `resources/views/layout.blade.php` là `@yield('content')` sẽ tìm tất cả section có tên là content trong các file mà `@extends('layout')`. Chúng ta có thể định nghĩa nhiều section trong file và gọi ra ở file `layout` một cách tùy thích.
## Asset File
Trong các project web sẽ luôn có các file css, js dành cho frontend. Có 2 cách để implement các file này trong laravel.

**Cách 1**
Cho các file css, js tương ứng vào các thư mục `public/css` và `public/js`. Sau đó có thể áp dụng vào view như sau.
```html:
<link href="css/*.css" rel="stylesheet" type="text/css" media="all">
```
Thư mục public đúng như tên gọi sẽ public những file bên trong, người dùng có thể xem thông qua F12.
> Thực hành: [Tại đây](https://laracasts.com/series/laravel-6-from-scratch/episodes/15)

**Cách 2 - Khuyên dùng**
Cho các file sass, js tương ứng vào các thư mục `resources/sass` và `resources/js`. Sau đó require file đó vào các file:
```scss:resources/sass/app.scss
@import './default.css';
@import './fonts.css';
```
```js:resources/js/app.js
require('./bootstrap');
```
Toàn bộ những file sass, js này sẽ được thành một file css và js duy nhất là `public/css/app.css` và `public/js/app.js` nhờ laravel-mix. Khi đó các file sass, js này được gọi asset files. 
> Để cài đặt laravel-mix, bạn cần có NodeJS. Sau đó, chạy câu lệnh `npm install` để cài thêm các thư viện mở rộng, trong đó có laravel-mix.
> 
> ```json:package.json
> {
>    ...
>    "devDependencies": {
>        "axios": "^0.19",
>        "cross-env": "^7.0",
>        "laravel-mix": "^5.0.1",
>        "lodash": "^4.17.19",
>        "resolve-url-loader": "^3.1.0",
>        "sass": "^1.15.2",
>        "sass-loader": "^8.0.0",
>        "vue-template-compiler": "^2.6.11"
>    }
>}
> ```
Mỗi khi có chỉnh sửa gì về các file js, css xong, chạy lệnh `npm run dev` hoặc là `npm run watch` để có thể render ra `public/css/app.css` và `public/js/app.js`. Sau đó có thể áp dụng vào view như sau.
```html
<link href="{{ mix('css/app.css') }}" rel="stylesheet" media="all">
```
***Cách này được khuyên dùng bởi vì thay vì phải public rất nhiều file css, js gây tốn hiệu năng những mặt như truy vấn, tìm kiếm,... thì việc chỉ load css, js từ một file sẽ có sự tối ưu về hiệu năng.***
> Thực hành: [Tại đây](https://laracasts.com/series/laravel-6-from-scratch/episodes/17)
## Lấy dữ liệu từ database để hiển thị - Render Dynamic Data
Ở phần này chúng ta hãy thử tạo một bảng mới có dữ liệu để hiển thị ở `about view`. Tạo model `Article` kèm file migration như sau:
```
# Lệnh này sẽ đồng thời tạo ra file migration
php artisan make:model Article -m
```
```php:database/migrations/[time_stamp]_create_articles_table.php
    ...
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            # Tên bài báo
            $table->string('title');
            # Tóm tắt sơ qua bài báo
            $table->text('excerpt');
            # Nội dung bài báo
            $table->text('body');
            $table->timestamps();
        });
    }
    ...
```
Sau đó bạn có thể tạo 4 bản ghi tùy ý bằng cách sử dụng `Tinker` như sau.
```
php artisan tinker
$article = new App\Article
$article->title = 'Getting to know us'
$article->excerpt = 'Lorem ipsum dolor sit amet consectetur adipiscing elit'
$article->body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis nibh et neque laoreet, ut tempor magna tristique. Donec posuere, massa a aliquet malesuada, nunc diam commodo leo, ut maximus dui sem et arcu. Ut id risus at massa lobortis rutrum at a nibh. Nulla nec vulputate orci. Cras non molestie turpis, venenatis convallis velit.'
$article->save()
```
Hoặc là sử dụng laravel seed. Tham khảo tại [đây](https://viblo.asia/p/tim-hieu-ve-seeder-trong-laravel-bWrZn1MmKxw).

Hãy thử test việc lấy dữ liệu ra có thành công hay không bằng cách viết trong `routes/web.php` như như sau.
```php:routes/web.php
    ...
    use App\Article;
    ...
    Route::get('/about', function () {
        
        # Lấy tất cả bản ghi trong bảng articles. Cẩn thận đối với bảng dữ liệu lớn (không nên dùng)
        $articles = Article::all();
        # Lấy 2 bản ghi đầu tiên trong bảng articles.
        $articles = Article::take(2)->get();
        # Lấy tất cả bản ghi nhưng phân trang, mỗi trang 2 bản ghi. Hạn chế không lấy tất cả cùng một lúc, tăng hiệu năng.
        $articles = Article::paginate(2);
        # Lấy 3 bản ghi mới tạo gần đây nhất.
        $articles = Article::take(3)->latest()->get();

        # Kiểm tra trực tiếp kết quả lấy dữ liệu trên trình duyệt.
        return $articles;
    });
```
Ngoài ra còn có nhiều cách truy vấn dữ liệu trong laravel, tham khảo tại [đây](https://laravel.com/docs/7.x/queries). Sau khi làm quen với một số cách, ta lựa chọn cách phù hợp với trường hợp này.
```php:routes/web.php
    ...
    use App\Article;
    ...
    Route::get('/about', function () {
        
        $articles = Article::take(3)->latest()->get();

        return view('about', [
            'articles' => $articles
        ]);
    });
```
Sau đó, ở file about view, ta viết lại như sau để in ra dữ liệu.
```html:resources/views/about.blade.php
<div id="sidebar">
    ...
    <ul class="style1">
        @foreach ($articles as $article)
        <li class="first">
            <h3>{{ $article->title}}</h3>
            <p><a href="#">{{ $article->excerpt }}</a></p>
        </li>
        @endforeach
    </ul>
    ...
</div>
```
Cú pháp laravel `@foreach` sẽ tương đương với `<?php foreach ?>` mà larvavel sẽ giúp chúng ta thông dịch điều này, điều này sẽ giúp chúng ta code đơn giản hơn. `{{ }}` cũng là cú pháp của laravel để chúng ta nhúng đoạn code laravel trong file php.

Bây giờ chúng ta sẽ tạo ra view cho từng bài article, lần này sẽ để xử lý ở controller, cho đúng với flow của laravel, hay mô hình MVC hơn nhé.

Khai báo và sửa các file code sau:
```php:routes/web.php
Route::get('/articles/{article}', 'ArticlesController@show');
```
```php:app/Http/Controllers/ArticlesController.php
<?php

namespace App\Http\Controllers;

use App\Article;

class ArticlesController extends Controller
{
    public function show($articleId) {
        $article = Article::findOrFail($articleId);

        return view('articles.show',['article' => $article]);
    }
}
```
```php:resources/views/articles/show.blade.php
@extends('layout')

@section('content')
<div id="wrapper">
	<div id="page" class="container">
		<div id="content">
			<div class="title">
				<h2>{{ $article->title }}</h2>
				<span class="byline">{{ $article->excerpt}}</span> </div>
			<p><img src="/images/banner.jpg" alt="" class="image image-full" /> </p>
			<p>{{ $article->body }}</p>
		</div>
	</div>
</div>
@endsection
```
Sửa lại file about view:
```html:resources/views/about.blade.php
<div id="sidebar">
    ...
    <ul class="style1">
        @foreach ($articles as $article)
        <li class="first">
            <h3><a href="/articles/{{$article->id}}">{{ $article->title}}</a></h3>
            <p><a href="#">{{ $article->excerpt }}</a></p>
        </li>
        @endforeach
    </ul>
    ...
</div>
```
Cuối cùng, hãy chuyển đến làm trang hiển thị toàn bộ bài báo. Ta thêm method index trong `app/Http/Controllers/ArticlesController.php`
```php:app/Http/Controllers/ArticlesController.php
    ...
    public function index()
    {
        $articles = Article::latest()->get();

        return view('articles.index',['articles' => $articles]);
    }
    ...
```
```html:resources/views/articles/index.blade.php
@extends('layout')

@section('content')
<div id="wrapper">
    <div id="page" class="container">
        @foreach($articles as $article)
        <div id="content">
            <div class="title">
                <h2><a href="/articles/{{ $article->id }}">{{ $article->title }}</a></h2>
                <p><img src="/images/banner.jpg" alt="" class="image image-full" /> </p>
                <span class="byline">{{ $article->excerpt}}</span>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endsection
```
```php:routes/web.php
    ...
    Route::get('/articles', 'ArticlesController@index');
    ...
```
Trên đây là những bài thực hành rất linh động để hiểu về cách lấy dữ liệu từ trong DB để hiển thị thực tế trên view.

Ngoài ra, để hiển thị đẹp hơn ở thanh điều hướng: "Khi bấm ở các thanh điều hướng thì box oval xanh sẽ chuyển sự hiển thị theo". 
![](https://images.viblo.asia/7f43051d-262b-4716-bf2e-bbf77a0ff6d5.png)
Ta có thể sửa file code dưới như sau:
```html:resources/views/layout.blade.php
    <div id="menu">
        <ul>
            #Kiểm tra xem request hiện tại ở đâu, và hiển thị box oval xanh tương ứng tương ứng với vị trí đó.
            <li class="{{ Request::is('/') ? 'current_page_item' : '' }}"><a href="/" accesskey="1" title="">Homepage</a></li>
            <li><a href="#" accesskey="2" title="">Our Clients</a></li>
            <li class="{{ Request::is('about') ? 'current_page_item' : '' }}"><a href="/about" accesskey="3" title="">About Us</a></li>
            <li class="{{ Request::is('articles*') ? 'current_page_item' : '' }}"><a href="/articles" accesskey="4" title="">Articles</a></li>
            <li><a href="#" accesskey="5" title="">Contact Us</a></li>
        </ul>
    </div>
```
> Phần này xin được tạm kết tại đây!
> Nguồn tham khảo: https://laracasts.com/series/laravel-6-from-scratch/