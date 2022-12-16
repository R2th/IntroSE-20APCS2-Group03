### Lời mở đầu
Hôm nay mình xin chia sẻ về 1 công cụ giúp ta tạo ra các website tĩnh 1 cách linh hoạt :D . Trong thời buổi công nghệ đang chuyển biến mạnh, rất nhiều các công cụ sinh ra để phục vụ mục đích cho dân lập trình . Đối với tạo website tĩnh rất nhiều framework hỗ trợ như là Nuxt, Hugo, Jigsaw. Phạm vi bài viết này mình xin nói về Jigsaw - Một công cụ mình thấy khá gọn và cú pháp dễ hiểu nhất là đối với ai đã từng làm việc qua Laravel . Start thôi :d 

### Cài đặt
Với Jigsaw chúng ta có thể cài đặt thông qua composer bằng lệnh sau 
```sh
$ mkdir my-site && cd my-site
$ composer require tightenco/jigsaw
```
Xong, chúng ta chạy lệnh dưới đây để tiến hành tạo ra cấu trúc thư mục của Jigsaw
```sh
$ ./vendor/bin/jigsaw init
```

Cấu trúc thư mục sau khi đã được tạo ra, chúng ta sẽ làm việc chủ yếu ở thư mục `source`

[![vzUSLt.png](https://a.imge.to/2019/12/10/vzUSLt.png)](https://imge.to/i/vzUSLt)

### Biên dịch và cấu hình
Tiến hành build ra trang web tĩnh ta có thể chạy lệnh sau từ thư mục gốc của dự án 
```sh
$ ./vendor/bin/jigsaw build
```
Hoặc cho môi trường production
```sh
$ ./vendor/bin/jigsaw build production
```
Sau đó ta có thể chạy lệnh sau để tiến hành theo dõi sản phẩm của mình
```sh
$ ./vendor/bin/jigsaw serve
```
Trong trường hợp chúng ta sử dụng Laravel Mix để biên dịch
```sh
$ npm install && npm run watch
```
Mặc định tính năng Laravel Mix trong jigsaw sẽ mix các file js css từ thư mục `source/_assets` tới `source/assets/build` để sửa các đường dẫn này chúng ta sẽ tìm tới file `webpack.mix.js`

Jigsaw cũng hỗ trợ cho ta cấu hình các biến môi trường tại file `config.php`, ngoài ra có những biến ta cấu hình riêng cho production thì ta sẽ tạo ra 1 file `config.production.php` , trong này ta chỉ cần cấu hình các biến thay đổi về bản chất jigsaw sẽ tự gộp tất cả các biến môi trường ở 2 file và sẽ ghi đè các biến được khai báo trong `config.production.php`
```php
// Example config.php
return  [
	'production'  =>  false,
	'baseUrl'  =>  '',
	'collections'  =>  [],
	'titleWeb' => 'Sun Asterisk VN'
];
```
```php
// Example config.production.php
return  [
	'production'  =>  true,
];
```
Chúng ta có thể gọi các biến này trong Blade Template Engine ( Sẽ được giới thiệu ngay dưới đây thôi :D ) theo cú pháp sau :
```php
@section('body')
<h1>Post Example</h1>
<p>
	{{  $page->titleWeb  }}
</p>
@endsection
```
### Tạo nội dung
Jigsaw hỗ trợ biên dịch từ file Markdown và Blade Template engine rất thuận tiện cho việc tạo nội dung , với những bạn nào đã sử dụng qua Laravel chắc chả còn xa lạ gì nữa nhỉ :D 
Trước hết chúng ta sẽ có 1 file `master.blade.php` trong thư mục `source/_layouts`

```php
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<link rel="stylesheet" href="{{ mix('css/main.css',  'assets/build') }}">
	</head>
	<body>
		@yield('body')
	</body>
</html>
```
Tiếp là 1 file nội dung sẽ kế thừa từ `master.blade.php` như khi chúng ta code View trong Laravel vậy
```php
# File : post.blade.php
@extends('_layouts.master')
@section('body')
<h1>Post Example</h1>
<p>
	{{  $page->titleWeb  }}
</p>
@endsection
```
## Note : 
Biến $page trên mặc định từ Jigsaw, trong ví dụ trên ta thấy nó truy cập vào thuộc tính titleWeb từ file `config.php` Ngoài ra chúng ta có thể gọi 1 số phương thức sau từ $page
```sh
$page->getPath() : trả về đường dẫn trang hiện tại từ thư  mục gốc
$page->getUrl() : trả về URL đầy đủ nếu baseUrl được cấu hình trong config.php
$page->getFilename() : trả về tên tệp của trang, không có phần mở rộng
$page->getExtension() : trả về phần mở rộng của trang hiện tại
```

Và 1 file Markdown `content.md` ( lưu ý là chúng ta thay đổi phần extends với section tương ứng với thư mục của dự án nhé )
```markdown
---
extends:  _layouts.master
section:  body
---
### Sun Asterisk
https://sunasterisk.vn
![Sun Logo](https://image.bnews.vn/MediaUpload/Content/2019/03/04/151429_01.png)
```

Tiến hành biên dịch thôi 
```sh
$ ./vendor/bin/jigsaw build
```
Ta sẽ thấy có 1 folder `build_local` xuất hiện và các file blade cũng như markdown đã được biên dịch thành các thư mục kèm file index.html chứa nội dung bên trong `build_local`

[![vzgq14.png](https://a.imge.to/2019/12/10/vzgq14.png)](https://imge.to/i/vzgq14)

Đối với một người học về laravel như mình thì mình khá thích cách viết nội dung của Jigsaw như này :d Nhưng còn một thắc mắc nhỏ , trong `master.blade.php` có thể sử dụng yield để cho các view con có thể kế thừa nội dung từ master layouts. Vậy mình có thể sử dụng @include như trong Laravel để chèn Header hay Footer được không nhỉ. Chắc chắn rồi đều từ 1 Blade engine ra thì mình nghĩ là làm được thôi. Cùng thử nhé :d

Đầu tiên mình tạo thư mục `_partials` và có file `header.blade.php` ( lưu ý là tên thư mục các bạn để thế nào cũng được nhé , và cho chúng nằm trong /source )

```html
# Ex : _partials/header.blade.php
<h1>Header Content</h1>
```

Tiếp đến ở `master.blade.php` mình sửa lại thành như sau 
```php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">
    </head>
    <body>
        @include('_partials.header')
        // hoặc @include('_partials.header', ['page_title' => 'My Website'])
        // Nếu mình muốn truyền các biến qua bên header, khi đó trang header mình sẽ gọi $nameVar tương ứng
        @yield('body')
    </body>
</html>
```

Save lại thôi nào , mình sử dụng `npm run watch` trong quá trình dev nên khi save nó sẽ tự build cho mình 

[![vzUSLt.png](https://i.imgur.com/FLSD3dP.png)](https://imge.to/i/vzUSLt)

### Làm việc với collection

Làm gì đó thú vị hơn đi , thử lấy các post từ 1 API Json về xem thế nào nhỉ :-? 
Mình vào sửa `config.blade.php` như sau 

```php
<?php

return [
    'production' => false,
    'baseUrl' => '',
    'collections' => [
        'reddit' => [
            'extends' => '_layouts.reddit',
            'items' => function () {
                $posts = json_decode(file_get_contents('https://www.reddit.com/r/aww.json?raw_json=1'));
                return collect($posts->data->children)->map(function ($post) {
                    return [
                        'id' => $post->data->id,
                        'title' => $post->data->title,
                        'thumbnail' => $post->data->thumbnail,
                        'content' => "![alt text](".$post->data->preview->images[0]->source->url.")"
                    ];
                });
            },
        ],
    ],
];
```

Ở trên mình có 1 item reddit trong biến collections , ở đây mình khai báo extends để nó sẽ hiển thị nội dung theo 1 file template nào đó ( trong ví dụ này của mình là _layouts/reddit.blade.php )
và trong các items mình sẽ viết 1 function lấy về các bài viết từ 1 file json sau đó map chúng ra các trường dữ liệu mình cần :-?
Và cuối cùng trong file template mình liệt kê danh sách các items như khi làm view trong laravel , dùng @foreach XD

```php
@extends('_layouts.master')
@section('body')
<h1>Post Example</h1>
<p>
    <ul>
        @foreach ($reddit as $post)
        <li><a href="{{ $post->getUrl() }}">{{ $post->title }}</a>
        @endforeach
    </ul>
</p>
@endsection
```

Và đây là kết quả 

[![vzgq14.png](https://i.imgur.com/u9Lhz9s.png)](https://i.imgur.com/u9Lhz9s.png)

Jigsaw còn hỗ trợ rất nhiều các function khác như phân trang , lọc , sắp xếp bla bla 
Bài viết của mình còn thiếu xót nhiều lắm mong các bạn đóng góp thêm để mình cải thiện cho các bài sau :D . Hy vọng với những gì mình tìm hiểu và chia sẻ , các bạn sẽ có thêm những công cụ tuyệt vời hơn trong con đường làm web của mình !

#### Tài liệu tham khảo : 
https://jigsaw.tighten.co/docs/installation/