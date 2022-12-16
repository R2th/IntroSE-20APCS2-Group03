* Blade trong Laravel là 1 **templating engine** - hay có thể hiểu đơn giản là *bộ máy biên dịch template* của Laravel. Laravel sẽ compiled file .blade.php thành code PHP thuần do đó chúng ta hoàn toàn có thể code PHP thuần trong file .blade.php. 
* Các file blade của Laravel có đuôi là .blade.php và được lưu ở thư mục resources/views. Hai lợi ích chính khi sử dụng blade đó là kế thừa (**inheritance**) các file blade lẫn nhau và phân chia 1 file giao diện lớn thành các file cấu thành nhỏ hơn (**sections** các file - phân chia 1 file thành các section). Sau đây ta quy ước gọi file .blade.php là 1 .blade cho gọn.

* Một file .blade không khác gì 1 file giao diện .html thông thường ngoại trừ nó có thêm các directive - (có thể gọi là các chỉ dẫn). Một directive luôn bắt đầu bằng kí tự "@" ví dụ: @section, @yield, @show ... Khi các file .blade được compiled, engine của Laravel sẽ dựa vào các directive này rồi biên dịch ra file giao diện .html ta mong muốn.

# 1. Một số directive trong Laravel:
1. @extends, @section: Phần này chắc mình không cần đề cập vì quá cơ bản rồi :rofl:
1. @yield: cho phép 1 giá trị default value như 1 tham số thứ 2,  nếu section đang được gọi bị undefinded
1. @parent: nó sẽ tương đương với nội dung của 1 section trong layout mà @parent đang đề cập đến ví dụ:
```
@yield('content', View::make('view.name'))
```
#  2. Components & Slots
 **Component** và **Slot** được sử dụng khi ta có 1 thành phần muốn tái sử dụng ở rất nhiều nơi trong giao diện:
```
<!-- /resources/views/alert.blade.php -->

<div class="alert alert-danger">
    {{ $slot }}
</div>
```
Biến **$slot** sẽ chứa nội dung chúng ta muốn inject vào component. Các component được xây dựng từ các directive @component
```
@component('alert')
    <strong>Whoops!</strong> Something went wrong!
@endcomponent
```
Chúng ta có thể inject nội dụng vào 1 slot sử dụng directive @slot. Bất kì content nào không nằm trong 1 directive @slot sẽ được truyền vào component theo biến **$slot**
```
@component('alert')
    @slot('title')
        Forbidden
    @endslot

    You are not allowed to access this resource!
@endcomponent
```
# 3. Hiển thị dữ liệu
## 3.1 Rendering JSON
Chúng ta có thể khởi tạo 1 biến Javascript và gán cho nó 1 chuỗi Json từ 1 biến mảng
```
<script>
    var app = <?php echo json_encode($array); ?>;
</script>
```
Chúng ta có 1 cú pháp gọn hơn ở đây
```
<script>
    var app = @json($array);
</script>
```
Directive @json cũng rất hữu dụng cho việc seeding các Component (khởi tạo giá trị ban đầu cho các thuộc tính) trong Vue hay các thuộc tính data-*
```
<example-component :some-prop='@json($array)'></example-component>
```
## 3.2 Blade & JavaScript Framework
Bởi vì rất nhiều các **JavaScript frameworks** (1 trong số đó là **Vuejs** ) cũng sử dụng cú pháp "**curly" braces** - "**{{  }}**" để biểu diễn 1 biểu thức nào đó sẽ hiển thị lên browser. Để phân biệt **Blade của Laravel** và các **Framework** đó -> chúng ta sử dụng symbol "**@**" để thông báo cho Blade rendering engine sẽ được build theo kiểu file .blade của Laravel
```
<h1>Laravel</h1>

Hello, @{{ name }}.
```
Ở ví dụ trên, kí tự **@** sẽ bị blade engine loại bỏ khi biên dịch và chỉ giữ lại phần bên trong 2 dấu ngoặc nhọn. Nếu như chúng ta muốn hiển thị rất nhiều biến theo kiểu file .blade thì trước mỗi 1 cú pháp "**curly" braces** - "**{{  }}**" ta đều phải thêm directive @ để Laravel hiểu để biên dịch theo kiểu blade. Nếu số lượng biến lớn thì cách này có vẻ dài dòng thay vào đó ta có thể sử dụng directive @verbatim
```
@verbatim
    <div class="container">
        Hello, {{ name }}.
    </div>
@endverbatim
```
# 3.3 Một số Control Structures
### 3.3.1 @auth và @guest 
@auth và @guest được dùng để xác định nhanh xem 1 user đã được xác thực hay chỉ là 1 guest
```
@auth
    // The user is authenticated...
@endauth

@guest
    // The user is not authenticated...
@endguest
```
Ngoài ra chúng ta có thể chỉ ra **Authentication Guard** sẽ đưuọc check khi sử dụng @auth và @guest
```
@auth('admin')
    // The user is authenticated...
@endauth

@guest('admin')
    // The user is not authenticated...
@endguest
```
### 3.3.2 @hasSection
Chúng ta cũng có thể check xem 1 section có nội dung hay không
```
@hasSection('navigation')
    <div class="pull-right">
        @yield('navigation')
    </div>

    <div class="clearfix"></div>
@endif
```
### 3.3.3 @forelse
Cấu trúc điều khiển forelse:
```
@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users</p>
@endforelse
```
### 3.3.4 Loop Variable
Blade còn cung cấp cho chúng ta 1 tính năng khi làm việc với các cấu trúc vòng lặp đó là biến **$loop**. Biến này cung cấp cho chúng ta 1 số thông tin hữu ích như current loop index hay đây có phải phần tử first hay las trong vòng lặp
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
Ngoài ra, nếu vòng loop của chúng ta đang được lồng trong 1 vòng loop khác, ta có thể truy cập đến biến $loop của vòng lặp cha thông qua thuộc tính parent.
```
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->parent->first)
            This is first iteration of the parent loop.
        @endif
    @endforeach
@endforeach
```
Ngoài ra biến $loop còn có rất nhiều thuộc tính hữu dụng khác;

| Property | Description |
| -------- | -------- |
| $loop->index     | 	The index of the current loop iteration (starts at 0).     |
| $loop->iteration	     | 	The current loop iteration (starts at 1).     |
| $loop->remaining     | The iterations remaining in the loop.     |
| $loop->count     | The total number of items in the array being iterated.     |
| $loop->first     | Whether this is the first iteration through the loop.     |
| $loop->last     | Whether this is the last iteration through the loop.     |
| $loop->even     | Whether this is an even iteration through the loop.     |
| $loop->odd     | Whether this is an odd iteration through the loop.     |
| $loop->depth     | The nesting level of the current loop.     |
| $loop->parent     | When in a nested loop, the parent's loop variable.     |

### 3.3.5 Comment
**Comments**
cú pháp comment trong Blade
```
{{-- This comment will not be present in the rendered HTML --}}
```

### 3.3.6 @php

Trong 1 số trường hợp, nếu muốn nhúng các mã PHP thuần vào views. Chúng ta có thể sử dụng directive @php để thực thi đoạn mã PHP thuần trong Blade:
```
@php
    //
@endphp
```
## 3.4 Rendering Views For Collections sử dụng @each
Chúng ta có thể kết hợp **loops** và **includes** vào trong cùng 1 câu lệnh sử dụng @each:
```
@each('view.name', $jobs, 'job')
```
Nếu mảng truyền vào rỗng thì chúng ta có thể truyền vào tham số thứ 4 như là view mặc định.
```
@each('view.name', $jobs, 'job', 'view.empty')
```
# 4. Stacks
Blade cho phép ta push các stacked javascript mà có thể được render ở đâu đó trong các view và layout khác. Đặc biệt rất hữu ích khi cần chỉ ra các thư viện Javascript được yêu cầu bởi View con:
```
@push('scripts')
    <script src="/example.js"></script>
@endpush
```
Chúng ta có thể push Stacked nhiều lần nếu cần:
```
<head>
    <!-- Head Contents -->

    @stack('scripts')
</head>
```
Nếu muốn prepend nội dung vào trước 1 stack, ta có thể sử dụng @prepend:
```
@push('scripts')
    This will be second...
@endpush

// Later...

@prepend('scripts')
    This will be first...
@endprepend
```

Tài liệu tham khảo: https://laravel.com/docs/5.8/blade