# I. Package hỗ trợ thuật toán Luhn 
Laravel Luhn là một package do Vincent Prat tạo ra nhằm cung cấp các tiện ích cho việc xác thực cũng như tính toán trong các tác vụ giao dịch tín dụng, mã SIREN, và một số trường hợp khi sử dụng thuật toán Luhn.

Thuật toán Luhn được phát triển vào năm 1950 bởi kỹ sư IBM Hans Peter Luhn, đại loại nó là một phương thức kiểm tra đơn giản để xác thực một loạt các số nhận dạng. Các con số đó có thể là một dãy số trên thẻ tín dụng, hoặc cũng có thể là những con số nhận dạng dùng trong các công vụ chính phủ như số NPI được cấp cho các nhà cung cấp dịch vụ chăm sóc sức khỏe.

Sử dụng package Laravel Luhn để xác thực các con số đó như sau:
```
<?php

$validator = Validator::make($data, [
    'number1' => 'luhn', // Using shorthand notation
    'number2' => new LuhnRule(), // Using custom rule class
]);
```

Thuật toán Luhn được thể hiện qua 3 phương thức chính bao gồm `isValid()`, `computeCheckDigit()`, và `computeCheckSum()`:
```
<?php

Luhn::isValid('1234');
Luhn::computeCheckDigit('1234');
Luhn::computeCheckSum('1234');
```

Các bạn hãy [vào đây](https://github.com/marvinlabs/laravel-luhn) để tìm hiểu về cách cài đặt và sử dụng. Nếu các bạn hứng thú và muốn tìm hiểu về thuật toán Luhn, các bạn có thể tìm hiểu trên [Wikipedia](https://en.wikipedia.org/wiki/Luhn_algorithm), có thể bạn sẽ hiểu được cách hoạt động của thuật toán thông qua một số ví dụ cụ thể.

# II. Laratables
![](https://images.viblo.asia/6e9e3e7b-202d-44eb-8b3a-0f8e2ea70457.jpg)
Laratables là một package của Gaurav Makhecha nhằm xử lý AJAX phía server của DataTables trong Laravel +5.5:

Đây là một package đơn giản nhằm hỗ trợ việc hiển thị data từ eloquent models với sự hỗ trợ của AJAX. Ngoài ra có thể sử dụng các quan hệ đơn giản và tùy chỉnh giá trị của các cột.

Với package này code phía client sẽ trông giống như với việc sử dụng plugin Datatables của jQuery:

```
$('#users-table').DataTable({
    serverSide: true,
    ajax: "{{ route('admin.users.datatables') }}",
    columns: [
        { name: 'id' },
        { name: 'name' },
        { name: 'email' },
        { name: 'role.name' },
        { name: 'action', orderable: false, searchable: false }
    ],
    ...
});
```

Ở phía server:
```
use App\User;
use Freshbitsweb\Laratables\Laratables;
...
return Laratables::recordsOf(User::class);
```

Laratables có một số [ví dụ online](https://laratables.freshbits.in/). Và để cài đặt bạn hãy vào [đường dẫn](https://github.com/freshbitsweb/laratables) sau.

# III. Laravel Enum
Laravel Enum là một package được tạo ra bởi Ben Sampson nhằm hỗ trợ tạo ra enum trong PHP và generator chúng cho Laravel. Sau đây là một ví dụ về một class Enum sử dụng package nói trên:
```
<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserType extends Enum
{
    const Administrator = 0;
    const Moderator = 1;
    const Subscriber = 2;
    const SuperAdministrator = 3;
}
```

Một tính năng mà tôi rất thích  đó là chúng cung cấp cho ta rule tên là EnumValue, nó giúp chúng ta xác thực:
```
<?php

public function store(Request $request)
{
    $this->validate($request, [
        'user_type' => ['required', new EnumValue(UserType::class)],
    ]);
}
```
 Hoặc bạn cũng có thể làm như sau:
```
<?php

public function store(Request $request)
{
    $this->validate($request, [
        'user_type' => ['required', new EnumKey(UserType::class)],
    ]);
}
```
# IV. Laravolt
Laravolt Avatar được tạo bởi Bayu Hendra Winata, đại loại là package này giúp chúng ta tạo ra những hình ảnh avatar cho người dùng ứng với tên của nó, giống kiểu thế này này
![](https://images.viblo.asia/446fad8b-80ad-4f94-8845-25c90cd6b556.png)

Để sử dụng các bạn hãy làm như sau trong file blade nhé:
```
<img src="{{ Avatar::create('Joko Widodo')->toBase64() }}" />

<!-- SVG markup -->
{!! Avatar::create('Susilo Bambang Yudhoyono')->toSvg(); !!}
```

Package này có tính cấu hình cao, thậm chí bạn có thể cấu hình từng ảnh để hiển thị:

```
// width = 100, height = 200
Avatar::create('Soekarno')->setDimension(100, 200);
Avatar::create('Soekarno')->setBackground('#001122');
Avatar::create('Soekarno')->setShape('square');
```

Bạn cũng có thể xem qua cách cấu hình một cách toàn vẹn nhất:
```
<?php

return [

    // Supported: "gd", "imagick"
    'driver'    => 'gd',

    // Initial generator class
    'generator' => \Laravolt\Avatar\Generator\DefaultGenerator::class,

    // Whether all characters supplied must be replaced with their closest ASCII counterparts
    'ascii'    => false,

    // Image shape: circle or square
    'shape' => 'circle',

    // Image width, in pixel
    'width'    => 100,

    // Image height, in pixel
    'height'   => 100,

    // Number of characters used as initials.
    'chars'    => 2,

    // font size
    'fontSize' => 48,

    // convert initial letter to uppercase
    'uppercase' => false,

    // Fonts used to render text.
    // If contains more than one fonts, randomly selected based on name supplied
    'fonts'    => ['path/to/OpenSans-Bold.ttf', 'path/to/rockwell.ttf'],

    // List of foreground colors to be used, randomly selected based on name supplied
    'foregrounds'   => [
        '#FFFFFF'
    ],

    // List of background colors to be used, randomly selected based on name supplied
    'backgrounds'   => [
        '#f44336',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#2196F3',
        '#03A9F4',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFC107',
        '#FF9800',
        '#FF5722',
    ],

    'border'    => [
        'size'  => 1,

        // border color, available value are:
        // 'foreground' (same as foreground color)
        // 'background' (same as background color)
        // or any valid hex ('#aabbcc')
        'color' => 'foreground'
    ]
];
```

# V. Laravel View Models
Được tạo ra bởi Brent Roose, nôm na là nó sẽ giúp bạn thực hiện các tác vụ thay vì trong controller sang một thứ gọi là "view-model". Như chúng ta vẫn biết thực tế là Controller đóng vài trò trung gian giữa Model và View. Nó có nhiệm vụ tiếp nhận yêu cầu từ client sau đó xử lý request, load model tương ứng và gửi data qua view tương ứng rồi trả kết quả về cho client. Tuy nhiên trên thuwch tế chúng ta làm rất nhiều nhiệm vụ xử lý logic trong controller. Vì thế mà View-model sinh ra để xử lý logic thay cho controller. Chúng ta xem qua ví dụ sau đây:
```
class PostViewModel extends ViewModel
{
    public $indexUrl = null;

    public function __construct(User $user, Post $post = null)
    {
        $this->user = $user;
        $this->post = $post;

        $this->indexUrl = action([PostsController::class, 'index']); 
    }

    public function post(): Post
    {
        return $this->post ?? new Post();
    }

    public function categories(): Collection
    {
        return Category::canBeUsedBy($this->user)->get();
    }
}
```

Và chúng ta sử dụng chúng trong controller như sau:

```
class PostsController
{
    public function create()
    {
        $viewModel = new PostViewModel(
            current_user()
        );

        return view('blog.form', $viewModel);
    }

    public function edit(Post $post)
    {
        $viewModel = new PostViewModel(
            current_user(), 
            $post
        );

        return view('blog.form', $viewModel);
    }
}
```

Và trong view của bạn sẽ như sau:
```
<input type="text" value="{{ $post->title }}" />
<input type="text" value="{{ $post->body }}" />

<select>
    @foreach ($categories as $category)
        <option value="{{ $category->id }}">{{ $category->name }}</option>
    @endforeach
</select>

<a href="{{ $indexUrl }}">Back</a>
```

Và để biết thêm chi tiết về cách cài đặt, cũng như tìm hiểu về cách sử dụng package này các bạn có thể tìm hiểu [tại đây](https://github.com/spatie/laravel-view-models)