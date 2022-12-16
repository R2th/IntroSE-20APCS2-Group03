Như các bạn đã biết Laravel Blade là một công cụ để thể hiện view trong Laravel, hay nói cách khác nôm na khi chạy lên chương trình thì nó sẽ như một file HTML vậy. Chúng được tạo bởi các file có đuôi là `.blade.php` và nằm trong thư mục `resource/views` của framework Laravel. Và hôm nay mình sẽ giới thiệu 12 Directives mà bạn sẽ có thể hay phải dùng tới khi làm việc với Laravel Blade nhé, bắt đầu nào :D

## @include
Đầu tiên là phải kể đến `@include` một Directive hay dùng nhất khi chúng ta làm việc với view blade, nó cho phép đưa một view ở một file blade khác vào view này của bạn. Ví dụ một trang có 3 phần cơ bản là *header.blade.php*, *content.blade.php*, *footer.blade.php* thì ở trong file `content.blade.php` ta có thể include phần view header và footer như sau:
```php
@include('header')

    <body>
        // your content
    </body>

@inlcude('footer')
```
Hoặc bạn cũng có thể truyền kèm theo một mảng dữ liệu qua view như sau:
```php
@include ( 'partials.sidebar' , [ 'menu' => $menu])
```
## @push and @stack
Laravel Blade cho phép xác định một trình giữ chỗ được gọi stack và sau đó đẩy các giá trị sang stack đó. Điều này có thể rất hữu ích để gọi một hoặc nhiều file javascript theo yêu cầu của từng trang view khác nhau.
```php
@push('scripts')
    <script src="/example.js"></script>
@endpush
```
```php
<head>
    <!-- Head Contents -->

    @stack('scripts')
</head>
```
## @php
Đối với các mã PHP thì Blade cho phép sử dụng trong View của Laravel, chúng ta chỉ cần mở mã PHP bằng các `@php` và đóng lại khối mã PHP đó bằng `@endphp` là ok, đơn giản phải không :v:
```php
@php
 // code php here
@endphp
```
## @hasSection
Khi tạo bố cục phức tạp trong Laravel Blade, bạn có thể kiểm tra xem một phần có nội dung bằng cách sử dụng `@hasSection` để thực hiện việc kiểm tra này.
```php
@hasSection('navigation')
    <div class="pull-right">
        @yield('navigation')
    </div>

    <div class="clearfix"></div>
@endif
```
## @each
`@each` của Laravel Blade cho phép bạn kết hợp vòng lặp và đưa vào một dòng. Ví dụ:
```php
@each('view.name', $jobs, 'job')
```
Trong đó, `view.name` là phần view sẽ hiển thị cho từng phần của `$job`, còn `$job` sẽ là biến dùng để lặp để gán từng phần vào biến `job`. Ngoài ra bạn cũng có thể truyền đối số thứ tư để hiển thị view nếu đối tượng hoặc mảng đó rỗng
```php
@each('view.name', $jobs, 'job', 'view.empty')
```
## @includeWhen
`@includeWhen` là phần mở rộng của `@include`. Lệnh này sẽ bao gồm một view nếu điều kiện đã cho là đúng.
```php
@includeWhen ($ isUserAdmin, 'users.admin_card' , [ 'user' => $ user])
```
Trong ví dụ trên thì `@includeWhen()` sẽ kiểm tra giá trị của biến `$isUserAdmin` và nếu biến đó đúng, nó sẽ bao gồm cả view của riêng quản trị viên là `users.admin_card`.
## @json
Đôi khi bạn có thể chuyển một mảng vào view của mình với ý định hiển thị nó dưới dạng JSON để khởi tạo một biến JavaScript. Ví dụ:
```js
<script>
    var app = <?php echo json_encode($array); ?>;
</script>
```
Tuy nhiên, thay vì gọi thủ công json_encode, bạn có thể sử dụng lệnh `@json` của Blade. Lệnh này chấp nhận các đối số tương tự như json_encode của PHP
```php
<script>
    var app = @json($array);

    var app = @json($array, JSON_PRETTY_PRINT);
</script>
```
## @forelse
Ví dụ giờ bạn phải hiển thị hết tên của một danh sách người dùng thì bạn chỉ việc dùng `@foreach` để lặp đúng không? Nhưng nếu thêm yêu cầu là phải kiểm tra xem danh sách đó có dữ liệu hay chưa thì bạn lại thêm câu điều kiện `@if` vào như sau:
```php
@if($users->count() > 0)
	@foreach($users as $user)
		{{ $user->name }}
	@endforeach
@else
	No Users Found	
@endif
```
Tuy nhiên, trong Laravel Blade `@forelse` sẽ làm code của bạn gọn gàng hơn rất nhiều đó :)))
```php
@forelse($users as $user)
	{{ $user->name }}
@empty
	No Users Found
@endforelse

// đơn giản và clear hơn rất nhiều đúng không :P
```
## @verbatim
Nếu bạn đang hiển thị các biến JavaScript trong một phần lớn của view, bạn có thể gói HTML trong `@verbatim` để bạn không phải đặt tiền tố cho mỗi câu lệnh echo Blade bằng một ký hiệu @ nữa
```php
@verbatim
    <div class="container">
        Hello, {{ name }}.
    </div>
@endverbatim
```
## @isset and @empty
Thông thường trong PHP chúng ta sử dụng hàm **isset()** và **empty()** để kiểm tra xem giá trị của biến có trống hay không thì trong Laravel Blade sẽ cung cấp `@isset()` và `@empty()` để thay thế mã PHP thông thường.
```php
@if(isset($users))
// your logic here
@endif

@if(empty($users))
// your logic here
@endif
```
Trong Blade sẽ thành như sau:
```php
@isset($users)
// your logic here
@endisset

@empty($users)
// your logic here
@endempty
```
## @inject
`@inject` được sử dụng để truy xuất từ Service Container của Laravel và đưa vào view của bạn.

Đối số đầu tiên được truyền cho @inject này là một tên biến mà service sẽ được đặt vào, trong khi đối số thứ hai là Service mà bạn muốn gọi đến.
```php
@inject('menu', 'App\Services\MenuService')

// then in your view

{!! $menu->render() !!}
```
## @csrf and @method
Khi bạn tạo Form trong Blade thì cần dùng `@csrf` để khai báo trường CSRF ẩn dùng để xác thực yêu cầu.
```php
<form method="POST" action="/profile">
    @csrf

    ...
</form>
```
Bên cạnh đó thì từ khi HTML không hỗ trợ các method `PUT, PATCH và DELETE` thì trong Blade  bạn sẽ cần phải thêm một method ẩn `_method` để spoof những động từ HTTP. Lệnh `@method` trong Blade có thể tạo trường này cho bạn:
```php
<form action="/foo/bar" method="POST">
    @method('PUT')

    ...
</form>
```
-----
Trên đây 12 Directives trong số rất nhiều Directives khác của Laravel Blade mà mình đề cập tới, mong qua bài này sẽ giúp được cho các bạn ít nhiều khi làm project của mình. Cảm ơn các bạn đã đọc bài, xin chào và hẹn gặp lại! :grin::kissing_heart:

## Tài liệu tham khảo
https://laravel.com/docs/5.8/blade

https://medium.com/search?q=laravel%20blade