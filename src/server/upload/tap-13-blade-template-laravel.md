Rất vui được gặp lại tất cả các bạn. Như đã nói ở tập trước thì ngày hôm nay, nội dung sẽ nói về "Blade template" trong Laravel. Tập ngày hôm nay chủ yếu chỉ học cú pháp và lợi ích của từng cú pháp đó, tuy dài nhưng không khó. Không luyên thuyên nữa, chúng ta vào bài thôi.

> Vì editor của Viblo không hỗ trợ Blade template Laravel nên đôi khi màu sắc code có chỗ khó nhìn, mong các bạn thông cảm.

# I. Giới thiệu (Introduction)
Blade là một template engine được cung cấp bởi Laravel. Đây là một engine khá mạnh mẽ, không như những các template engine khác, Blade không hạn chế việc sử dụng mã code PHP thuần túy trong template của bạn ngoài những cú pháp riêng biệt của nó. Thực tế thì Blade template được biên dịch thành các file PHP và được lưu vào cache. Blade template có đuôi mở rộng là `.blade.php` và được lưu trữ trong thư mục `resources/views`.

# II. Layout template
## 1. Xác định bố cục (Defining layout)
Có hai lợi ích chính trong việc sử dụng Blade template là layout và section. Để bắt đầu chúng ta sẽ đi vào một ví dụ đơn giản. Như các bạn đã biết, trong một ứng dụng thì đa phần các trang con đều được thừa hưởng một cấu trúc layout chung. Blade template cho phép chúng ta định nghĩa một layout cho ứng dụng với duy nhất một blade view.

```PHP:resources/views/app.blade.php
<html>
    <head>
        <title>Laravel</title>
    </head>
    <body>
        @section('sidebar')
            <h1>Sidebar</h1>
        @show
        
        @yield('content')
    </body>
</html>
```

Đây chỉ là nội dung của một đoạn mã HTML bình thường, nhưng có chút đặt biệt là nó có hai cú pháp lạ: `@section`, `@yield`. Đây chính là một trong những cú pháp riêng biệt của Blade template dùng cho mục đích kế thừa qua lại giữa parent-child. 

* `@section`: dùng để xác định một phần nội dung
* `@yield`: dùng để hiển thị nội dung của một phần đã được xác định

Hiện tại khó mà để hiểu theo giải thích bằng văn được. Để các bạn có thể hiểu chi tiết công dụng của hai cú pháp này, mình sẽ làm sáng tỏ chúng qua ví dụ.

## 2. Kế thừa layout (Extending layout)
Như đã nói ở trên, công dụng chung của hai thằng `@section` và `@yied` là dùng cho mục đích kế thừa. Blade view `app` là parent, vì nó là layout cho ứng dụng, vì vậy mình sẽ tạo một blade view `child` đóng vai trò là child kế thừa parent `app`.

```PHP:resources/views/child.blade.php
@extends('app')

@section('content')
    <h1>My content</h1>
@endsection
```

Mình đã sử dụng cú pháp `@extends`, điều này giúp blade view `child` có thể kế thừa `app`. Tiếp theo mình đã xác định nội dung cho section `content` thông qua thẻ  `@section`. Bây giờ đăng ký route và xem thử nó hoạt động như thế nào.

```PHP:routes/web.php
Route::get('/', function() {
    return view('child');
});
```

Ở đây chúng ta render view `child` chứ không phải `app` nhé. Kết qua thu được như thế này:

![](https://images.viblo.asia/a276826f-5772-4086-b2a0-e2f8adc48d7d.JPG)

Chữ "My content" xuất hiện thì khá dễ hiểu, vì chúng đã xác định nội dung cho section `content`, nên lệnh `@yield` sẽ thực hiện công việc render. Nhưng sao section `sidebar` vẫn được hiển thị? Mình dùng `@section` để xác định nội dung `sidebar` như `content` thôi mà. Hãy quan sát so sánh sau: 

Cú pháp `@section` cho section `content` thì như sau:

```PHP:resources/views/child.blade.php
@section('content')
    <h1>My content</h1>
@endsection
```

Nó có thẻ mở `@section` và thẻ đóng `@endsection`. Trong khi đó, lệnh `@section` cho section `sidebar` thì khác một chút:

```PHP:resources/views/app.blade.php
@section('sidebar')
    <h1>Sidebar</h1>
@show
```

Thẻ đóng lúc này là `@show`, chính vì thể cú pháp này không chỉ là xác định nội dung cho `sidebar` mà đồng với với `@show` nó sẽ render section này luôn. Đó là lý do vì sao mà chữ "Sidebar" lại xuất hiện.

Nhưng tại sao lại không dùng `@yield` luôn cho tiện mà phải dùng `@section` rồi đóng bằng thẻ `@show` để render? Cái gì cũng có nguyên nhân của nó cả, vì khi sử dụng `@section ... @show` trong layout thì bạn có thể làm một điều thú vị trong các trang con. Mình sẽ dẫn chứng ngay và luôn, các bạn mở file `resources/views/child.blade.php` và thêm đoạn code này vào:

```PHP:resources/views/child.blade.php
@section('sidebar')
    @parent

    <ul>
        <li>Item 1</li>
        <li>Item 1</li>
    </ul>
@endsection
```

Giờ cứ thử xem kết quả trước đã rồi mình sẽ giải thích.

![](https://images.viblo.asia/489594ce-21d2-45a1-adb2-bd298d04ca3b.JPG)

Như các bạn thấy, section `sidebar` không chỉ không mất chữ "Sidebar" mà còn có thêm cái list mình mới vừa tạo. Bây giờ hãy bắt đầu quan sát lại đoạn code vừa thêm ở trên, mình đã có thêm thẻ `@parent`. Với thẻ này thì các section được định nghĩa lại trong trang con sẽ append vào section ở blade view cha. Trong trường hợp này blade view `child` đã extend blade view `app` nên chính vì thế khi khai báo lại section `sidebar` thì nó đã append thêm cái list ở dưới chữ "Sidebar".

Vậy thử đoán xem điều gì sẽ xảy ra nếu mình bỏ đi thẻ `@parent`? Vâng, lúc này section `sidebar` được khai báo trong blade view `child` sẽ ghi đè hoàn toàn lên section `sidebar` ở blade view `app`.

![](https://images.viblo.asia/bded6f8f-cdef-458e-b6a2-ba4717fa18a1.JPG)

Nói một chút về `@section` thì ngoài cách khai báo xác định nội dung trên thì ta còn có một cú pháp khác để xác định nội dung của một phần nào đó như sau:

```PHP
@section('title', 'Laravel')
```

Thông thường với cách này thường áp dụng cho các section chứa nội dung ngắn gọn hoặc không chứa các thẻ HTML.

Ngoài ra, `@yield` còn có thể nhận tham số thứ hai làm giá trị mặc định nếu các trang con extend với nó không xác định nội dung cho phần đã khai báo.

```PHP
// Nhận giá trị mặc định là view
@yield('content', View::make('view.name'))

// Nhận giá trị mặc định là một chuỗi
@yield('content', 'default')
```

> **Lưu ý:** Kết thúc mỗi thẻ trong cú pháp Blade template không có dấu `;`.

# III. Component & Slot
Component và slot cung cấp tính năng khá giống với section và layout, nhưng có vài chỗ thì component và slot dễ hiểu hơn nhiều. Hiểu đơn giản thì component là các thành phần, còn slot là nơi chứa nội dung sẽ thay đổi nhiều lần. Hãy tưởng tượng nếu ứng dụng của bạn có nhiều xử lý cần hiện modal để thông báo, nhưng bạn lại muốn có thể sử dụng lại mà không cần phải khai báo nhiều lần. Lúc này component chính là modal, và nội dung thông báo chính là slot.

Thông thường các component được khai báo trong view, bạn có thể tự tổ chức cấu trúc thư mục để lưu trữ các component, hoặc là có thể tham khảo theo cấu trúc của mình.

```
resources/
├── views/
|   ├── components/
|   |   |   ...
```

## 1. Khởi tạo component & slot (Creating component & slot)
Bây giờ mình sẽ tạo component modal đặt trong file `resources/views/components/modal.blade.php` với nội dung sau:

```PHP:resources/views/components/modal.php
<div class="modal">
    {{ $slot }}
</div>
```

Cú pháp `{{ $slot }}` sẽ chứa nội dung thông báo thay đổi liên tục trong suốt ứng dụng.

> **Lưu ý:**: `$slot` không thể thay đổi tên biến khác.

Mọi thiết lập đã hoàn tất, giờ chỉ cần lấy ra sử dụng thôi. Mình sẽ sử dụng lại blade view `child` hồi nãy để test luôn. 

```PHP:resources/views/child.blade.php
@section('content')
    <h1>My content</h1>

    @component('components.modal')
        Đã có lỗi xảy ra
    @endcomponent
@endsection
```

Chúng ta sử dụng cặp thẻ `@component ... @endcomponent` để gọi component `components.modal`, đồng thời khai báo slot. Tham số trong `()` là tên blade view chứa component, nội dung trong cặp thẻ chính là giá trị mà `$slot` nhận được. Nạp lại server và chạy đường dẫn http://localhost:8000 ta sẽ được kết quả như hình:

![](https://images.viblo.asia/34166350-c024-4cbf-93ac-15555c0edf67.JPG)

Bạn có thể gọi một component nhiều lần như thế này:

```PHP:resources/views/child.blade.php
@section('content')
    <h1>My content</h1>

    @component('components.modal')
        Đã có lỗi xảy ra
    @endcomponent

    @component('components.modal')
        Đã hết lỗi xảy ra
    @endcomponent
@endsection
```

## 2. The first available component
Bạn cũng có thể tùy chỉnh các giao diện của component nào đó với `@componentFirst`, về tính năng thì nó cũng tương tự như `View::first`.

```PHP
@componentFirst(['custom.modal', 'modal'])
    Đã có lỗi xảy ra
@endcomponent
```

## 3. Truyền dữ liệu cho component (Passing data to component)
Đôi khi với một `$slot` thì bị hạn chế cho việc tùy chỉnh nội dung một component, chính vì thế Laravel cho phép truyền slot khác ngoài `$slot` mặc định để ứng dụng của bạn linh hoạt hơn.

```PHP:resources/views/child.blade.php
@component('components.modal')
    @slot('title')
        Lỗi!
    @endslot

    Đã có lỗi xảy ra
@endcomponent
```

Sử dụng `@slot` với tham số là tên biến nhận dữ liệu trong blade view component để khai báo một giá trị khác mà component có thể nhận.

Tại component `modal`, bạn chỉnh sửa nội dung như sau:

```PHP:resources/views/components/modal.blade.php
<div class="modal">
    <h3>{{ $title }}</h3>
    
    {{ $slot }}
</div>
```

Laravel sẽ hiểu phần nội dung bạn khai báo ở `@slot` sẽ truyền vào `$title`, còn phần chỉ nằm trong cặp thẻ `@component` thì sẽ truyền vào `$slot` mặc định. Mình xin tản mạn một chút, cú pháp `{{ $varible }}` là dùng để hiển thị dữ liệu của biến.

Và đây là kết quả sau khi tải lại trang:

![](https://images.viblo.asia/018fb917-0692-4d42-a024-58b609bec6aa.JPG)

Ngoài ra bạn có thể thay thế cách truyền dữ liệu cho component trên bằng cách:

```PHP:resources/views/child.blade.php
@component('components.alert', ['title' => 'Lỗi!'])
    Đã có lỗi xảy ra
@endcomponent
```

Tham số thứ hai trong `()` sẽ nhận một mảng chứa dữ liệu và lấy tên key làm tên biến trong component. Với cách này thông thường dùng để truyền các dữ liệu ngắn, không chứa thẻ HTML.

## 4. Aliasing component
Bạn có nghĩ mình sẽ có thể tự đặt cú pháp cho component để trông code dễ hiểu, dễ hình dung hơn không, chẳng hạn:

```PHP
@modal
    Đã có lỗi xảy ra
@endmodal
```

Laravel hiểu mong muốn của bạn, vì thế đã định nghĩa method `component` trong `Blade` facade để ta có thể dễ dàng alias cú pháp cho bất kì component nào. Laravel khuyên nên thực hiện việc này tại `AppServiceProvider`, cụ thể làm method `boot`:

```PHP:app/Provider/AppServiceProvider.php
use Illuminate\Support\Facades\Blade;

public function boot() 
{
    Blade::component('components.modal', 'modal');
}
```

Ở đây bắt buộc chúng ta phải `use` Blade facade để có thể gọi method `component` ra. Method này sẽ nhận hai tham số:
* Tham số thứ nhất là tên component
* Tham số thứ hai là tên cú pháp thay thế

Bây giờ bạn có thể khai báo component `modal` theo cú pháp sau:

```PHP
// Mặc định
@modal
    Đã có lỗi xảy ra
@endmodal

// Nếu có truyền dữ liệu thêm
@modal(['title' => 'Lỗi!'])
    Đã có lỗi xảy ra
@endmodal
```

Bạn có thể test để so sánh kết quả, đảm bảo vẫn không thay đổi gì.

# IV. Hiển thị dữ liệu (Displaying data)
Bạn có thể hiện thị dữ liệu được truyền đến blade view bằng cách đặt biến đó giữa cặp `{{ }}`, ví dụ mình đăng ký một route:

```PHP:routes/web.php
Route::get('/', function() {
    return view('home', ['name' => 'Lê Chí Huy']);
});
```

Tiếp đó các bạn tạo blade view `home` và code nó như sau:

```PHP:resources/views/home.blade.php
Welcome, {{ $name }}
```

Đây là kết quả chúng ta thu được:

![](https://images.viblo.asia/c3ed5d04-443e-459c-8c66-aa6fd3c34063.JPG)

Như bạn thấy cú pháp này vô cùng ngắn gọn để hiển thị `$name` thay vì phải code dài như thế này:

```PHP:resources/views/home.blade.php
Welcome, <?php echo $name; ?>
```

> **Lưu ý:** Bạn chỉ có thể sử dụng các cú pháp của Blade template khi đuôi mở rộng có dạng `.blade.php`.

## 1. Displaying unescaped data
Giờ các bạn thử chèn cặp thẻ `<b></b>` cho giá trị `$name` như thế này:

```PHP:routes/web.php
Route::get('/', function() {
    return view('home', ['name' => '<b>Lê Chí Huy</b>']);
});
```

Đoán xem chữ "Lê Chí Huy" có được bôi đen không? Đáp án là "Không". Vì cú pháp `{{ }}` trước khi hiển thị dữ liệu thì nó đã đưa qua hàm `htmlspecialchars`, việc này sẽ tránh các cuộc tất công XSS. Nói một cách đơn giản thì kiểu tấn công này lợi dụng việc có thể hiển thị các thẻ HTML thông qua chức năng viết bài, comment... để chèn mã script độc, tấn công hệ thống.

Vậy nếu giờ bạn muốn chèn HTML vào dữ liệu của mình thì sao? Laravel không tuyệt đường bất kỳ mong muốn nào của coder cả, họ cung cấp cho chúng ta cú pháp `{!! ... !!}` để có thể hiển thị cả mã HTML

```PHP:resources/views/home.blade.php
Welcome, {!! $name !!}
```

Một kết quả đầy mong đợi:

![](https://images.viblo.asia/1847d961-4b38-4110-b635-ac98541177b9.JPG)

> **Lưu ý:** Để tránh bị tân công XSS, bạn nên dùng cú pháp này show các dữ liệu do bạn xác định, admin cpanel xác định chứ không nên show các dữ liệu do người dùng nhập như viết bài, comment... để tránh chèn mã độc.

Cú pháp `{{ }}` không giới hạn việc hiển thị dữ liệu của biến truyền vào blade view. Bạn có thể `echo` kết quả bất kì hàm PHP nào, chẳng hạn như:

```PHP
The current UNIX timestamp is {{ time() }}.
```

## 2. Rendering JSON
Nếu bạn truyền một mảng đến blade view và muốn render nó như một JSON để gán giá trị cho biến nào đó trong đoạn mã script. Thông thường với PHP, bạn sẽ:

```PHP
<?php

echo '
    <script>
        var app = ' . json_encode($array) . ';
    </script>
';
```

Nhưng đối với Blade template Laravel thì cú pháp sẽ gọn đi rất nhiều. Thay vì gọi thủ công như thế thì ta có thể sử dụng cú pháp `@json`, nó sẽ nhận các tham số tương tự như `json_encode`.

```PHP
<script>
    var app = @json($array);

    var app = @json($array, JSON_PRETTY_PRINT);
</script>
```

Nếu như bạn truyền `@json` trong một thuộc tính của thẻ thì nên để trong nó trong cặp dấu `''`.

```PHP
<tag attr='@json($array)'></tag>
```

## 3. Blade & JavaScript Frameworks
Có một số Javascript framework sử dụng cặp `{}` làm cú pháp của mình, chính vì thế đôi khi Blade template sẽ hiểu nhầm là cú pháp của nó và compile, có thể gây lỗi. Để tránh điều đó, bạn chỉ cần thêm ký tự `@` trước câu lệnh thì Blade template sẽ hiểu nó không phải là cú pháp cần compile.

```PHP:resources/views/home.blade.php
Welcome, @{{ $name }}
```

Đây là kết quả:

![](https://images.viblo.asia/59c9e21b-d786-4aeb-956f-3625efedef27.JPG)

Nếu trong trường hợp có nhiều cú pháp Javascript framework có chứa cặp `{}` mà bạn không muốn phải cất công thêm tiền tố `@` trước từng câu lệnh. Laravel cung cấp cho chúng ta một giải pháp đó chính là đưa tất cả các cú pháp Javascript framework ấy vào trong cặp thẻ `@verbatim ... @endverbatim` như thế này:

```PHP
@verbatim
{{ $variable }}
//...
@endverbatim
```

# V. Cấu trúc điều khiển (Control structure)
Ngoài các tính năng lợi ích trên, Laravel còn cung cấp cho chúng ta các cú pháp ngắn gọn cho các cấu trúc điều khiển của PHP như if, for, foreach... Những cú pháp này rất thuận tiện, nhanh gọn nhưng lại không làm mất đi bản chất vốn có của các cấu trúc điều khiển.

## 1. Câu lệnh "if" ("if" statement)
Bạn có thể khởi tạo câu lệnh `if` bằng các thẻ `@if`, `@elseif`, `@else` và `@endif`. 

```PHP
@if (count($records) === 1)
    Có 1 
@elseif (count($records) > 1)
   Có nhiều
@else
    Không có
@endif
```

Như bạn thấy, chỉ là cú pháp khác, cách khai báo các điều kiện và hoạt động vẫn không khác gì cấu trúc điều kiện thuần túy.

Blade template cung cấp cho chúng ta thẻ `@unless`:

```PHP
@unless (Auth::check())
    Chưa đăng nhập
@endunless
```

Phương thức `Auth::check` là dùng để kiểm tra xem user có đăng nhập hay chưa. Hiện tại chúng ta chưa học tới nên chắn chắc method này sẽ trả về giá trị là `false`. Nếu các bạn đã học qua chương trình tiếng Anh phổ cập thì sẽ biết `unless` đồng nghĩa với `if not`. 

Ngoài ra còn có `@isset` và `@empty`, hai thẻ này đại diện cho hai hàm quen thuộc trong PHP là `isset` và `empty`.

```PHP
@isset($records)
    // 
@endisset

@empty($records)
    // 
@endempty
```

### a. Authentication
`@auth` và `@guest` và hai thẻ dùng để kiểm tra xem user hiện tại có đăng nhập hay chưa.

```PHP
@auth
    Đã đăng nhập
@endauth

@guest
    Chưa đăng nhập
@endguest
```

Ngoài ra bạn có thể truyền tham số cho hai thẻ này để kiểm tra trạng thái đăng nhập của user với tư cách là ai. Chẳng hạn một tài khoản có vai trò là "user" thì sau khi đăng nhập vẫn không thể truy cập vào admin cpanel được. Tính năng này được gọi là "Authentication Guard", chúng ta sẽ tìm hiểu sau.

```PHP
@auth('admin')
    Đã đăn nhập với tư cách là "admin"
@endauth

@guest('admin')
    Chưa đăng nhập với tư cách là "admin"
@endguest
```

### b. Section
Bạn có thể kiểm tra sự tồn tại của một section bằng thẻ `@hasSection` với tham số truyền vào là tên của section cần kiểm tra.

```PHP
@hasSection('navigation')
    // 
@endif
```

## 2. Câu lệnh "switch" ("switch" statement)
Lệnh switch được khởi tạo bằng các thẻ `@switch`, `@case`, `@break`, `@default` và `@endswitch`.

```PHP
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

## 3. Vòng lặp (Loop)
Cũng giống như các cấu trúc điều khiển khác, các câu lệnh loop trong Blade template vẫn được giữ nguyên cách thức hoạt động.

```PHP
// For statement
@for ($i = 0; $i < 10; $i++)
    {{ $i }} </br>
@endfor

// Foreach statement
@foreach ($array as $row)
    {{ $row['attr'] }} </br>
@endforeach

// While statement
@while (true)
    <p>I'm looping forever.</p>
@endwhile
```

Laravel cung cấp cho chúng ta thẻ `@forelse`, thẻ này hoạt động giống như là `@foreach` nhưng ta có thể kiểm tra nhanh xem object tham chiếu trong loop có rỗng hay không, nếu có thì sẽ thực thi lệnh gì đó thông qua thẻ `@empty`.

Bạn có thể test đoạn code này thì sẽ hiểu rõ thẻ `@forelse` ngay.
```PHP
@forelse ([] as $user)
    <li>{{ $user['name'] }}</li>
@empty
    <p>No users</p>
@endforelse
```

Như quan sát, mình đã truyền một mảng rỗng vào vòng lặp, lặp tức thì nó sẽ được kiểm tra qua thẻ `@empty`. Kết qua ta thu được sẽ là:

![](https://images.viblo.asia/94e94995-82c5-4bac-8015-d0bc13d42f27.JPG)

Nói về vòng lặp thì không thể thiếu `continue` và `break` được, đương nhiên hai lệnh này vẫn được Blade template chuyển cú pháp thành `@continue` và `@break`.

```PHP
@for ($i = 1; $i <= 10; $i++)
    @if ($i == 1)
        @continue
    @endif

    {{ $i }}

    @if ($i == 5)
        @break
    @endif
@endforeach
```

Nếu bạn thấy mỗi lần muốn `break` hoặc `continue` phải lồng trong một câu lệnh `if` thì hơi dài và khá rối mắc. Chính vì thế Laravel cho phép bạn truyền điều kiện vào hai thẻ `@break` và `@continue` để rút ngắn thời gian cho bạn.

```PHP
@for ($i = 1; $i <= 10; $i++)
    @continue($i == 1)

    {{ $i }}

    @break($i == 5)
@endforeach
```

## 4. Biến vòng lặp (The loop variable)
Khi sử dụng các lệnh vòng lặp `foreach`, `forelse` mặc định sẽ có sẵn `$loop` bên trong vòng lặp. Biến này cho phép ta lấy các thông tin hay sử dụng như index hiện tại, index đầu, index cuối vòng lặp...

```
@foreach ($users as $user)
    @if ($loop->first)
        This is the first iteration.
    @endif

    @if ($loop->last)
        This is the last iteration.
    @endif

    <p>This is user {{ $user->id }}</p>
@endforeach
```

Nếu bạn có các vòng lặp lồng nhau thì có thể tham chiếu  `$loop` của vòng lặp cha bằng thuộc tính `parent` trong vòng lặp con.

```PHP
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->parent->first)
            This is first iteration of the parent loop.
        @endif
    @endforeach
@endforeach
```

Dưới đây là toàn bộ các thông tin là `$loop` có thể cung cấp:



| Thuộc tính | Mô tả | 
| -------- | -------- |
| `$loop->index` | Lấy index hiện tại (bắt đầu từ 0) |
| `$loop->iteration` | Lấy số lần đã lặp hiện tại (bắt đầu từ 1) |
| `$loop->remaining` | Lấy số lần lặp còn lại |
| `$loop->count` | Lấy tổng số vòng lặp sẽ lặp |
| `$loop->first` | Nếu tại vòng lặp đầu tiên thì trả về `true` |
| `$loop->first` | Nếu tại vòng lặp cuối cùng thì trả về `true` |
| `$loop->even` | Nếu index vòng lặp hiện tại chẵn thì trả về `true` |
| `$loop->odd` | Nếu index vòng lặp hiện tại lẻ thì trả về `true` |
| `$loop->depth` | Lấy độ sâu của vòng lặp hiện tại |
| `$loop->parent` | Lấy `$loop` của vòng lặp cha trong vòng lặp con |

## 5. Comment
Blade template cũng cho phép chúng ta comment để code dễ hiểu, dễ quản lý hơn với cú pháp:

```PHP
{{-- This comment will not be present in the rendered HTML --}}
```

## 6. PHP
Bạn cũng có thể chèn code PHP vào trong Blade template trong cặp thẻ `@php ... @endphp`.

```PHP
@php
    //
@endphp
```

> **Lưu ý:** Bạn không nên qua lạm dụng thể này để thực thi một số xử lý logic phức tạp, điều này sẽ làm mất bản chất của view. Với các xử lý logic phức tạp, bạn nên thực thi ở view composer hoặc controller action, sau đó mới truyền đến view đển render.

# VI. Form
## 1. Trường CSRF (CSRF field)
Bạn còn nhớ vấn đề ở tập Routing chứ, chúng ta không thể truy cập route với phương thức `POST`, cũng như là `PUT`, `DELETE`... vì thiếu CSRF field này. Vì vậy khi khởi tạo một HTML form thì chúng ta phải khái báo CSRF field thông qua thẻ `@csrf`.

Giờ mình sẽ tạo blade view `home` với nội dung sau:

```PHP:resources/views/home.blade.php
<form method="POST" action="/post">
    @csrf
    
    <input type="submit" value="Send post">
</form>
```

Form này sẽ gửi một request với method `POST` với URI `/post` khi submit.

Sau đó các bạn đăng ký hai route này trong `routes/web.php`:

```PHP:routes/web.php
Route::get('/', function () {
    return view('home');
});

Route::post('/post', function() {
    return 'Posted';
});
```

Với route đầu tiên thì sẽ render view chứa form của chúng ta. Còn route thứ hai mang phương thức `POST` sẽ được gọi khi chúng ta click vào nút "Send post".

Bây giờ ta hãy thử truy cập đường dẫn http://localhost:8000 và F12 lên để xem source HTML của form vừa tạo.

![](https://images.viblo.asia/78cff78a-a3a3-45d2-8b9b-2c3c5eb6c08a.JPG)

`@csrf` đã tạo một input hidden với name là `_token` và value chứa CSRF token, có field này chắc chắn ta sẽ gửi được request với method `POST`. Việc cuối cùng là click vào nút "Send post" thôi. 

![](https://images.viblo.asia/27dbb2eb-15ba-4711-985b-39df9a596b50.JPG)

## 2. Trường phương thức (Method field)
Đối với những phương thức khác như `PUT`, `DELETE` và `PATCH` ta không thể khai báo trong thuộc tính `method` của thẻ `form` được, chính vì vậy Laravel cung cấp cho ta thẻ `@method` để khai báo một Unsafe HTTP method khác ngoài `POST`.

Các bạn thêm thẻ `@method` với tham số `PUT` này như sau:
```PHP:resources/views/home.blade.php
<form method="POST" action="/post">
    @method('PUT')
    @csrf
    
    <input type="submit" value="Send post">
</form>
```

Sau đó thử click nút "Send post" lại xem, chắc chắn xuất hiện lỗi:

![](https://images.viblo.asia/51b71354-35d0-448e-8630-797cf3151f88.JPG)

Vì chúng ta đã thay đổi HTTP request thành `PUT` nên ở route đăng ký cũng phải thay đổi.

```PHP:routes/web.php
Route::put('/post', function() {
    return 'Posted';
});
```

## 3. Validation error
Với cặp thẻ `@error ... @enderror` ta có thể dễ dàng bắt bất kỳ thông báo nào khi request trả về lỗi. Về "Validation error message" ta sẽ tìm hiểu ở những tập sau nên phần này mình chỉ nó qua về cú pháp để kiểm tra có tồn tại lỗi được trả về tại blade template hay không.

```PHP
// kiểm tra mặc định
@error('title')
    {{ $message }}
@enderror

// Kiểm tra trong thuộc tính
<input id="title" type="text" class="@error('title') is-invalid @enderror">
```

`@error` sẽ nhận tham số là tên lỗi mà chúng ta xử lý trước khi trả về cho blade view. Nếu `true` thì nó sẽ thực thị lệnh trong cặp thẻ.

# VII. Liên kết sub-view (Including sub-view)
`@include` trong Blade template cho phép bạn có thể liên kết một blade view với một view khác. Tất cả các biến dữ liệu ở parent view đều được truyền đến view include.

Chẳng hạn mình có cấu trúc thư mục như sau:

```
resources/
├── views/
|   ├── includes/
|   |   |   room.blade.php
|   |   home.blade.php
```

Ở blade view `home` ta code:

```PHP:resources/views/home.blade.php
@php
    $name = 'Lê Chí Huy';
@endphp

@include('includes.room')
```

Như các bạn thấy, mình đã sử dụng cú pháp `@include` với tham số là tên view liên kết cần đưa vào blade view `home` này. Ngoài ra mình có khai báo biến `$name` để thử xem là blade view `includes.room` có nhận được hay không.

Tại blade view `includes.room` mình code như sau:

```PHP:resources/views/includes/room.blade.php
{{ $name }}
```

Cuối cùng là đăng ký route để render blade view `home` ra:
```PHP:routes/web.php
Route::get('/', function () {
    return view('home');
});
```

![](https://images.viblo.asia/01eb781c-cf3a-4b04-bb81-efe40ce646a7.JPG)

Kết quả này chứng minh cho việc ta có thể lấy tất cả các dữ liệu tại view liên kết từ parent view. Ngoài ra bạn cũng có thể truyền một dữ liệu bất kì cho view liên kết thông qua tham số thứ hai của thẻ `@include`.

```PHP
@include('view.name', ['some' => 'data'])
```

## 1. Một số cú pháp khác hỗ trợ cho include (Some other syntax support for including)
Trong trường hợp nếu bạn `@include` một view không tồn tại thì framework sẽ báo lỗi. Chính vì vậy khi include một view không chắc chắn sẽ tồn tại thì ta sử dụng thẻ `@includeIf` thay cho `@include`.

```PHP
@includeIf('view.name', ['some' => 'data'])
```

Bạn cũng có thể include một view khi kiểm tra một điều kiện nào đó trả về boolean `true`.

```PHP
@includeWhen($boolean, 'view.name', ['some' => 'data'])
```

Laravel còn cung cấp thẻ `@includeFirst`, thẻ này cho phép ta include view đầu tiên trong mảng view khai báo. Nhiều bạn sẽ hiểu ngay công dụng của thẻ này nếu theo dõi các tập trước của mình.

```PHP
@includeFirst(['custom.admin', 'admin'], ['some' => 'data'])
```

Như dòng code này, nếu view `custom.admin` tồn tại thì nó sẽ include view này và bỏ qua view `admin`. Còn nếu view `custom.admin` không tồn tại thì nó sẽ bỏ qua và tiếp tục kiểm tra view `admin`.

> **Lưu ý:** Bạn nên tránh sử dụng `__DIR__` và `__FILE__` trong blade view vì chúng chỉ trả kết quả đường dẫn của các file cache hay compile view, không cung cấp thông tin cần thiết.

## 2. Aliasing include
Nếu blade view include một view nằm trong sub-directory, mà phải tham chiếu một tên rất dài. Chúng ta có thể alias cú pháp include một view nào đó giống như là component. Ta cũng sẽ làm việc này tại `AppServiceProvider`, ngay tại method `boot`.

```PHP:app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\Blade;

public function boot()
{
    Blade::include('includes.room', 'room');
}
```

Rồi bây giờ ta chỉ cần include view `includes.room` theo cú pháp đã đăng ký:

```PHP
@room(['name' => 'Lê Chí Huy'])
```

## 3. Rendering views for collections
Nếu bạn có một mảng dữ liệu và muốn truyền từng dữ liệu vào một view nào đó thì bạn có thể sử dụng `@each` thay vì `@foreach` và `@include`. 

Chẳng hạn mình có cấu trúc thư mục như sau:

```
resources/
├── views/
|   ├── includes/
|   |   |   item.blade.php
|   |   list.blade.php
```

Đầu tiên mình sẽ thử sử dụng cách thông thường đó là dùng `@foreach` và `@include`. Tại blade view `list.blade.php` mình sẽ code nội dung như sau:

```PHP:resources/views/list.blade.php
@php
    $list = ['Item #1', 'Item #2', 'Item #3'];
@endphp

<ul>
    @foreach ($list as $item)
        @include('includes.item')
    @endforeach
</ul>
```

Và blade view `includes.item`:

```PHP:resources/views/includes/item.blade.php
<li>{{ $item }}</li>
```

Sau đó chúng ta đăng ký route và chạy thử:

```PHP:routes/web.php
Route::get('/', function () {
    return view('list');
});
```

![](https://images.viblo.asia/d47f6d6a-98ac-4401-a395-406095590c29.JPG)

Bây giờ chúng ta sẽ dùng `@each` để thay thế cách trên. Ta chỉ cần thay đổi đoạn vòng lặp trong blade view `list`.

```PHP:resources/views/list.blade.php
<ul>
   @each('includes.item', $list, 'item')
</ul>
```

`@each` này sẽ nhận:
* Tham số đầu tiên là tên view include
* Tham số thứ hai là biến chứa mảng dữ liệu
* Tham số thứ ba là tên biến nhận giá trị trong view include.

Ngoài ra trong trường hợp nếu mảng dữ liệu rỗng thì ta có thể include view hiện thông báo gì đó bằng cách khai báo thêm tham số thứ tư ở `@each` với giá trị là tên view chứa nội dung thông báo.

```PHP
@each('view.name', $list, 'item', 'view.empty')
```

> **Lưu ý:** Các view được render thông qua `@each` không thể nhận các biến dữ liệu được truyền đến parent view. Nên bạn cần cần nhắc sử dụng `@foreach` và `@include` để thay thế nếu các view include cần những biến dữ liệu này.
> 

# VIII. Stacks
Nói về thuật ngữ này bằng văn bản thì rất khó hình dung nên mình sẽ đi qua ví dụ để các bạn thấy công dụng, từ đó có thể hiểu được nó. Chẳng hạn trong ứng dụng của bạn có rất nhiều trang con, tất cả các trang con đều được include với một file JS chung. Một số trang con đặc biệt sẽ có file JS riêng để xử lý. 

Đây là cấu trúc thư mục cho ví dụ:

```
resources/
├── views/
|   ├── pages/
|   |   |   login.blade.php
|   |   | ...
|   |   layout.blade.php
```

Ở blade view `layout`, ta có nội dung sau:

```PHP:resources/views/layout.blade.php
<html>
    <head>
        <script src="main.js"></script>// File JS chung
    </head>
    </body>
        @yield('page')
    </body>
</html>
```

Còn blade view `login` thì:
```PHP:resources/views/pages/login.blade.php
@extends('layout')

@section('page')
    <form name="login">
        //
    </form>
@endsection
```

Bây giờ mình muốn include file JS `login.js` thì cách nhanh nhất là bỏ dòng code include JS vào trong section `page` ở blade view `pages.login` như thế này:

```PHP:resources/views/pages/login.blade.php
@section('page')
    <form name="login">
        //
    </form>
    
    <script src="login.js"></script>
@endsection
```

Cách trên thì có thể code vẫn hoạt động bình thường nhưng sẽ cảm thấy một chút gì đó rất khó chịu, có thể gây một số phiền phức sau này như không tốt cho SEO hoặc bất đồng bộ trong code Javascript.

Laravel cung cấp cho ta một giải pháp để giải quyết tình huống trên dựa vào hai thẻ `@stack` và `@push`. Bạn hãy tưởng tưởng `@stack` giống như một kệ sách, còn `@push` giống như những cuốn sách, dù bạn đặt những cuốn sách ở đâu thì sau quá trình dọn dẹp (biên dịch) thì những cuốn sách sẽ được đưa vào kệ sách.

Tức là bây giờ mình muốn đưa cuốn sách `<script src="login.js"></script>` vào một kệ sách nào đó trong `<head>` thì mình phải khai báo kệ sách đó trước đã.

```resources/views/layout.blade.php
<head>
    <script src="main.js"></script>// File JS chung
    
    @stack('scripts')
</head>
```

Như các bạn thấy mình đã khởi tạo một kệ sách với tên là `scripts` rồi, việc cần làm bây giờ là đưa cuốn sách `<script src="login.js"></script>` về kệ sách `scripts` thôi.

Tại blade view `pages.login`, mình chỉnh sửa nội dung lại như sau:

```PHP:resources/views/pages/login.blade.php
@extends('layout')

@push('scripts')
    <script src="login.js"></script>
@endpush

@section('page')
    <form name="login">
        //
    </form>
@endsection
```

Giờ chắc các bạn đã hiểu cách hoạt động của `@stack` và `@push` rồi đúng không nào. Ngoài ra, Laravel còn cung cấp thẻ `@prepend`, thẻ này giúp ta sẽ thêm cuốn sách "yêu thích" nào đó vào đầu ngăn sách.

```PHP
@push('scripts')
    <script src="script_2.js"></script>
@endpush

// Later...

@prepend('scripts')
    <script src="script_1.js"></script>
@endprepend
```

# IX. Service injection
Cái này chắc đã quá quen thuộc rồi, Laravel cho phép chúng ta lấy một service bất kỳ có trong service container thông qua `@inject`.

```PHP
@inject('metrics', 'App\Services\MetricsService')

<div>
    Monthly Revenue: {{ $metrics->monthlyRevenue() }}.
</div>
```

# X. Mở rộng Blade (Extending Blade)
Laravel cho phép chúng ta tự định nghĩa các thẻ bằng phương thức `directive` có trong `Blade` facade. Việc này đương nhiên chúng ta cũng sẽ code trong `boot` của `AppServiceProvider`.

```PHP:app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\Blade;

public function boot()
{
    Blade::directive('print', function($expression) {
        return "<?php echo 'Printed ' . $expression; ?>";
    });
}
```

Quan sát đoạn code trên, tại method `Blade::directive`:
* Tham số thứ nhất là tên thẻ
* Tham số thứ hai là một Closure object, nó sẽ chứa biến dữ liệu nhận được qua các tham số của thẻ trong blade view. Trong Closure này, ta sẽ `return` mã PHP được viết dưới dạng chuỗi.


Sau khi đăng ký xong, ta có thể test thẻ `@print` như sau:

```PHP
@print('Lê Chí Huy')
```

Nếu bạn muốn truyền nhiều tham số cho thẻ của mình thì bạn có thể xử lý chuỗi `$expression` để lấy các giá trị tham số.

Để mình test cho các bạn xem, tại Closure object mình sẽ dump `$expression`.

```PHP:app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\Blade;

public function boot()
{
    Blade::directive('print', function($expression) {
        dd($expression);
        
        return "<?php echo 'Printed ' . $expression; ?>";
    });
}
```

Sau đó mình thử gọi `@print` và truyền nhiều tham số vào nó:

```PHP
@print('Lê', 'Chí', 'Huy')
```

Đây là kết quả:

![](https://images.viblo.asia/e1b56b9d-2105-49e2-90c0-6d8c0792a4b8.JPG)

Như các bạn thấy, `$expression` trả về chuỗi với dạng:

```
'value1', 'value2', 'value3', ...
```

Các bạn có thể tùy biến để có thể lấy các giá trị tham số từ `$expression`.

> **Lưu ý:** Trong khi phát triển ứng dụng, nếu có sử dụng thẻ riêng trong blade view thì sau mỗi lần sửa đổi code xử lý trong mỗi thẻ riêng thì phải chạy lệnh Artisan `view:clear` để xóa cache và compile lại các view.

Ngoài ra bạn cũng có thể tự tạo cho mình lệnh điều kiện riêng có thể gọi trong blade view bằng method `Blade::if` được đăng ký tại `boot` của `AppServiceProvider`.

```PHP:app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\Blade;

public function boot()
{
    Blade::if('env', function ($environment) {
        return app()->environment($environment);
    });
}
```

Với `Blade::if` thì:
* Tham số thứ nhất là tên lệnh điều kiện,
* Tham số thứ hai là Closure nhận biến giá trị truyền vào và trả về boolean

Như đăng ký trên, nó sẽ kiểm tra môi trường hiện tại của ứng dụng, nếu trùng khớp thì sẽ trả về `true`, còn không thì trả về `false`.

Ta có thể sử dụng trong blade view như sau:

```PHP
@env('local')
    // The application is in the local environment...
@elseenv('testing')
    // The application is in the testing environment...
@else
    // The application is not in the local or testing environment...
@endenv
```

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ