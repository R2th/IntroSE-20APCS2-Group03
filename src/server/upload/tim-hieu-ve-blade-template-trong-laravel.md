Chào các bạn. Đối với các bạn sử dụng Framework Laravel thì việc dùng Blade Template là khó thể tránh khỏi. Vậy Blade Template là gì?  nó có ưu điểm gì?  và cách sử dụng ra sao ?
Bài viết dưới đây sẽ giúp các bạn nắm được về Blade Template.
# Giới thiệu
* Blade là  một templating engine đơn giản nhưng mạnh mẽ được cung cấp bởi Laravel. 
* Không như hầu hết các templating engine khác, Blade không giới hạn bạn trong việc sử dụng mã PHP đơn giản trong View.
* Tất cả các Blade View sẽ được biên dịch thành mã PHP và được lưu vào bộ đệm cho đến khi chúng được sửa đổi. 
 * Các file Blade View có phần mở rộng là `.blade.php` và lưu trong thư mục `resources/views`.

# Kế thừa
## Xác định bố cục
* Hai trong số những lợi ích chính của việc sử dụng Blade là *kế thừa mẫu* và *kế thừa các phần*. 

* Để hiểu rõ hơn ta cùng xem 1 ví dụ đơn giản:  Đầu tiên, ta sẽ thử layout trang "chính". Vì hầu hết các ứng dụng web duy trì cùng layout chung trên các trang khác nhau, nên việc định nghĩa layout này như một Blade View duy nhất và các trang khác kế thừa nó sẽ tránh được việc lặp lại code.
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
* Như bạn có thê thấy trên đây là một file có bố cục HTML bình thường.  Nhưng hãy để ý 2 thẻ `@section` và `@yield`.
* Thẻ `@section` sẽ đánh dấu 1 phần nội dung hiển thị của trang.
* Thẻ  `@yield` sử dụng để hiển thị nội dung của 1 phần nhất định.
* Đọc có vẻ hơi khó hiểu nhưng xem tiếp phần sau bạn sẽ hiểu ra ngay thôi!
## Kế thừa bố cục
* Ở trên ta đã tạo được 1 bố cục cho các trang. Bây giờ ta tiếp tục tạo các trang con kế thừa bố cục ở trên.
```php
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
* Lệnh `@extends` để xác định bố cục mà trang sẽ kế thừa. Như ở đây là kế thừa từ file `app.blade.php`
* Phần mở rộng cho trang được đặt giữa thẻ `@section` và  `@endsection`. Phần mở rộng này khi biên dịch sẽ được đặt ở vị trí của thẻ `@section` trong file  `app.blade.php`
* thẻ `@section('key', 'value')` sẽ đặt giá trị value vào vị trí của thẻ `@yield('key')` trong file bố cục. Như ở đoạn code trên thì trình biên dịch sẽ đặt giá trị là `Page Title` vào vị trí của thẻ `@yield('title')` trong file `app.blade.php`.
* Câu lệnh dưới đây sẽ trả về 1 giá trị mặc định nếu section khai báo giá trị cho yield không được xác định.
```
@yield('content', 'default value')
```
# Hiển thị dữ liệu các biến trên View
* Để hiển thị giữ liệu trên view ta dùng cú pháp như sau
```
{{ $key }}
```
hoặc 
```
{!! $key !!}
```
* Vậy sự khác nhau giữa 2 câu lệnh trên là gì. Để hiểu rõ hơn, ta hãy thử với ví dụ sau.

* Ví dụ ta có 1 biến như sau:
```php
$name = "<strong>hello world<strong>";
```
* Và ta sẽ sử dụng 2 cách trên để hiển thị biến này lên Blade VIew.
```php
{{ $name }}
{!! $name !!}
```
* Kết quả:

<strong>hello world<strong>
    
 **hello world**

* Sau khi nhìn kết quả thì chắc hẳn các bạn cũng nhận thấy sự khác biệt rồi phải không nào.
    
#     Lệnh SWITCH
* Câu lệnh switch có thể được sử dụng trong Blade Template với cú pháp như sau:
```php
@switch($i)
    @case(1)
        First case...
        @break

    @case(2)
        Second case...
        @break

    @default
        Default case...
@endswitch
```
# Vòng lặp, các câu lệnh điều kiện
* Blade Template cung cấp các cú pháp đơn giản để thưc hiện các câu lệnh vòng lặp, điều kiện với. Các lệnh này hoạt động giống hệt như trong PHP.
* Đây là cú pháp cho các lệnh vòng lặp
```php
@for ($i = 0; $i < 10; $i++)
    The current value is {{ $i }}
@endfor

@foreach ($users as $user)
    <p>This is user {{ $user->id }}</p>
@endforeach

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users</p>
@endforelse

@while (true)
    <p>I'm looping forever.</p>
@endwhile
```
*  Còn đây là cú pháp câu điều kiện
```php
@foreach ($users as $user)
    @if ($user->type == 1)
        @continue
    @endif

    <li>{{ $user->name }}</li>

    @if ($user->number == 5)
        @break
    @endif
@endforeach
```
    
# Kết luận
*   Trên đây là những hướng dẫn cơ bản để bạn có thể hiểu và sử dụng được Blade Template. 
*   Để biết thêm nhiều hơn về Blade Template, bạn có thể truy cập đường link dưới đây:
    
    https://laravel.com/
*  Cảm ơn các bạn đã đọc bài viết của mình. Mọi thắc mắc, ý kiến đóng góp mọi người vui lòng để lại bình luận phía dưới nha!
# Tài liệu tham khảo
* https://laravel.com/docs/5.8/blade#introduction