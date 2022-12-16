# Giới thiệu
Blade là một template engine đơn giản nhưng mạnh mẽ được sử dụng phổ biến trong Laravel. Tất cả các views của Blade sẽ được dịch thành mã PHP thuần và được cache lại cho tới khi bị chỉnh sửa. Template này có phần ở rộng là **name**.blade.php và nằm trong thư mục resources/views.

# Kế thừa template
Lợi ích nhất của Blade template là có thể kế thừa, giúp giảm rất lớn lượng code. Bên dưới là một layout master, mình xây dựng để các layout khác có thể kế thừa

### Template cha

```
<html>
    <head>
        <title>Giới thiệu blade templates trong Laravel</title>
    </head>
    <body>
        <div class="container">
            {{-- Khai báo component con khi kế thừa --}}
            @yield('content')
        </div>
    </body>
</html>
```

### Template con
```
{{-- Kế thừa lại page master --}}
@extends('master')

{{-- Định nghĩa content đã khai báo ở yield --}}
@section('content')         
    <p>This is my body content.</p>
@endsection
```

# Truyền data từ controller sang view
Việc truyền dữ liệu từ controller sang blade template cũng rất dễ dàng, bạn có thể xem ví dụ dưới đây
### Trong controller
```
    public function index()
    {
        return view('welcome', ['name' => 'Ngo Huu Nhut']);
    }
```
### Trong view
Trong controller, chúng ta đã truyền sang **welcome.blade.php** một biến tên **name**, để hiển thị, ta chỉ cần làm như bên dưới
```
Hello, {{ $name }}.
```
# Một số cấu trúc khác trong Blade Template
### Câu lệnh điều kiện if
```
@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    I don't have any records!
@endif
```
### Vòng lặp
```
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
#### Biến $loop đặc biệt trong vòng lặp

![](https://images.viblo.asia/c4b82d3f-531f-4d25-9f9f-3a590ef9af59.png)

### Comment trong blade
Đoạn code bên dưới là cách để comment trong blade template
```
{{-- This comment will not be present in the rendered HTML --}}
```
### Form trong blade
Đặc biệt, trong form bạn cần thêm thuộc tính **@csrf**, mình sẽ ví dụ cho bạn bằng đoạn code bên dưới:
```
<form method="POST" action="/">
    @csrf
    ...
</form>
```
Bên cạnh đó, nếu bạn muốn sử dụng các method khác thì làm như sau:
```
<form action="/foo/bar" method="POST">
    @method('PUT')
    ...
</form>
```

Như vậy, qua bài viết này mình đã giới thiệu qua về blade template trong Laravel. Ngoài ra, còn rất nhiều điều hay ho khác ở template này ở link sau: https://laravel.com/docs/master/blade. Cảm ơn bạn đã theo dõi bài viết!