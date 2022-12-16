# Giới thiệu
Trong suốt quá trình phát triển web, chúng ta thường tập trung thời gian cho những tính năng khó và lớn trước, sau đó là những phần "râu ria" như breadcrumb, favicon,... Breadcrumbs là một trong những thứ chúng ta không nghĩ đến cho đến khi cần đến nó.Thế nhưng để tạo ra breadcrumb như ý và đúng đường dẫn không phải lúc nào cũng đơn giản. Thật may mắn tác giả **davejamesmiller** đã mang đến cho cộng đồng Laravel một package hết sức "useful": **Laravel Breadcrumbs**
# Cài đặt
Sử dụng command thông qua composer nhé các bạn:
```composer require davejamesmiller/laravel-breadcrumbs:5.x```
# Sử dụng như thế nào?
## Định nghĩa Breadcrumbs
Giả sử website của mình có navigation bar với các thành phần:
* Home
* About
* Blog
* Blog  > Category
* Blog > Category > Post

Chúng ta cần tạo file `breadcrumbs.php` tại folder `routes` có nội dung như thế này:
```php
<?php

// Home
Breadcrumbs::for('home', function ($trail) {
    $trail->push('Home', route('home'));
});

// Home > About
Breadcrumbs::for('about', function ($trail) {
    $trail->parent('home');
    $trail->push('About', route('about'));
});

// Home > Blog
Breadcrumbs::for('blog', function ($trail) {
    $trail->parent('home');
    $trail->push('Blog', route('blog'));
});

// Home > Blog > [Category]
Breadcrumbs::for('category', function ($trail, $category) {
    $trail->parent('blog');
    $trail->push($category->title, route('category', $category->id));
});

// Home > Blog > [Category] > [Post]
Breadcrumbs::for('post', function ($trail, $post) {
    $trail->parent('category', $post->category);
    $trail->push($post->title, route('post', $post->id));
});
```
## Giải thích
Từ code trên các bạn cũng có thể hiểu sơ qua được rằng:
Chúng ta sử dụng facade `Breadcrumbs` để định nghĩa một breadcrumbs, gán thành phần cha, gán URL.
 - Để định nghĩa một thành phần breadcrumbs:
 ```php 
 Breadcrumbs::for('home', function ($trail) {
    $trail->push('Home', route('home'));
});
```
Trong đó `push` sẽ gán URL cho breadcrumbs thông qua router hoặc với trường hợp
```php 
// Home > Blog > [Category]
Breadcrumbs::for('category', function ($trail, $category) {
    $trail->parent('blog');
    $trail->push($category->title, route('category', $category->id));
});
```
**Lưu ý**
Chúng ta có rất nhiều cách để sinh URL, không nhất thiết phải sử dụng `route()` các bạn nhé :D
- `url('path/to/route')` (`URL::to()`)
- `secure_url('path/to/route')`
- `route('routename')` hoặc `route('routename', 'param')` hoặc `route('routename', ['param1', 'param2'])` (`URL::route()`)
- ``action('controller@action')`` (``URL::action()``)
- Hoặc có thể set cứng URL (`'http://www.example.com/'`)

## Render
Để render ra ngoài view các bạn chỉ cần sử dụng ```{{ Breadcrumbs::render('tên_breadcrumbs_đã_định_nghĩa') }}``` ở bên trong ```Blade```
Ví dụ bạn muốn render ra ngoài view thành phần `'home'`:

```blade
{{ Breadcrumbs::render('home') }}
```
Out put:
> Home

Hoặc một thành phần có cả cha
```blade
{{ Breadcrumbs::render('blog') }}
```

Output:

> [Home](#) / Blog

Với trường hợp cần tham số truyền vào:
This is a dynamically generated page pulled from the database:

```php
Breadcrumbs::for('post', function ($trail, $post) {
    $trail->parent('blog');
    $trail->push($post->title, route('post', $post));
});
```

```blade
{{ Breadcrumbs::render('post', $post) }}
```
Output:
> [Home](#) / [Blog](#) / Post Title
> 
## Một số lưu ý 
1. Mặc định package sẽ dùng style của Bootstrap  4, chúng ta có thể thay đổi style cho breadcrumbs bằng cách:
Đầu tiên chạy command:
```bash
php artisan vendor:publish --provider="DaveJamesMiller\Breadcrumbs\BreadcrumbsServiceProvider"
```

sau đó mở file `config/breadcrumbs.php` và sửa dòng:

```php
    'view' => 'breadcrumbs::bootstrap4',
```

- `breadcrumbs::bootstrap4` – [Bootstrap 4](https://getbootstrap.com/docs/4.0/components/breadcrumb/)
- `breadcrumbs::bootstrap3` – [Bootstrap 3](http://getbootstrap.com/components/#breadcrumbs)
- `breadcrumbs::bootstrap2` – [Bootstrap 2](http://getbootstrap.com/2.3.2/components.html#breadcrumbs)
- `breadcrumbs::bulma` – [Bulma](http://bulma.io/documentation/components/breadcrumb/)
- `breadcrumbs::foundation6` – [Foundation 6](http://foundation.zurb.com/sites/docs/breadcrumbs.html)
- `breadcrumbs::materialize` – [Materialize](http://materializecss.com/breadcrumbs.html)
- `breadcrumbs::uikit` – [UIkit](https://getuikit.com/docs/breadcrumb)
- `breadcrumbs::json-ld` – [JSON-LD Structured Data](https://developers.google.com/search/docs/data-types/breadcrumbs) 
- Hoặc sử dụng style do bạn tự làm: `partials.breadcrumbs`
2. Mặc định với thành phần cuối cùng sẽ không được gán link, các bạn có thể custom lại bằng cách thêm một chút logic ở ngoài Blade
- Tạo một file blade với nội dung:

```php
@if (count($breadcrumbs))

    <ol class="breadcrumb">
        @foreach ($breadcrumbs as $breadcrumb)

            @if ($breadcrumb->url && !$loop->last)
                <li class="breadcrumb-item"><a href="{{ $breadcrumb->url }}">{{ $breadcrumb->title }}</a></li>
            @else
                <li class="breadcrumb-item active">{{ $breadcrumb->title }}</li>
            @endif

        @endforeach
    </ol>

@endif
```
Sau đó thay đổi thành value của 
```php
    'view' => 'breadcrumbs::path.to.custom_breadcrumb',
```
# Kết
Laravel Breadcrumbs là một package cực kỳ hữu dụng, chúng ta có thể giảm tải rất nhiều logic ở ngoài Blade bằng cách sử dụng nó, trên đây là một số tính năng cơ bản, nếu muốn hiểu rõ và custom mạnh hơn các bạn có thể tham khảo tại [đây](https://github.com/davejamesmiller)