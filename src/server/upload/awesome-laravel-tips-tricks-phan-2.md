## Giới thiệu
Ở phần 1, mình đã giới thiệu 10 tips & tricks trong Laravel

-https://viblo.asia/p/awesome-laravel-tips-tricks-phan-1-RQqKLPaNK7z

Ở phần 2 này mình sẽ trình bày tiếp các tips & tricks khác để giúp các bạn thuận lợi và thấy thú vị hơn trong quá trình làm việc. Lets go!!!

### 11. Check file view có tồn tại hay không

Chúng ta có thể kiểm tra file view có tồn tại hay không trước khi load và xử lý dữ liệu trên view.

```
if (view()->exists('custom.page')) {
    // Load the view
}
```

Hơn nữa chúng ta có thể truyền vào 1 mảng các file view và chỉ load file đầu tiên nếu nó thực sự tồn tại

```
return view()->first(['custom.dashboard', 'dashboard'], $data);
```

### 12. Artisan Command trở nên thân thiện hơn

Màn hình command luôn khiến người dùng trở nên khó hiểu bởi những câu lệnh. Nhưng Laravel là 1 framework đạt giải hoa hậu thân thiện, vì thế nó đã cung cấp những method hữu ích để xây dựng command gần gũi và có nhiều sự tương tác hơn với người dùng.

```
// Yes or no?
if ($this->confirm('Do you wish to continue?')) {
    //
}
```

Phương thức **anticipate()** gợi ý những options có sẵn khi người dùng nhập gần đúng.
```
// Open question with auto-complete options
$name = $this->anticipate('What is your name?', ['Taylor', 'Dayle']);
```

Phương thức **choice()** cho phép người dùng chỉ cần enter là có phương án default trong 1 list rồi
```
// One of the listed options with default index
$name = $this->choice('What is your name?', ['Taylor', 'Dayle'], $defaultIndex);
```

**$defaultIndex** ở đây chấp nhận key hoặc value của mảng.

### 13. Truy vấn datetime với Eloquent

Hãy xem sức mạnh của Eloquent ta đây

```
$products = Product::whereDate('created_at', '2020-03-21')->get();

$products = Product::whereMonth('created_at', '03')->get();

$products = Product::whereDay('created_at', '21')->get();

$products = Product::whereYear('created_at', date('Y'))->get();

$products = Product::whereTime('created_at', '=', '14:13:58')->get();
```

Với các method trên, chúng ta có thể dễ dàng truy vấn dữ liệu dạng datetime mà không cần phải lăn tăn.

### 14. Chỉ định thuộc tính được lấy ra với Model::all()

Bạn có 1 bảng hiển thị tất cả dữ liệu bản ghi với 1 số cột nhất định nhưng model lại có hàng trăm thuộc tính. Lúc này lấy ra tất cả thì không hay chút nào và giải pháp đơn giản là cần lấy cột nào thì truyền 1 mảng vào method **all()**

```
$users = User::all(['id', 'name', 'email']);
```

### 15. Sử dụng map() với kết quả truy vấn

Kết quả truy vấn trả ra dữ liệu dạng collection và chúng ta có thể tùy biến với nó. Method **map()** giúp chúng ta có thể thay đổi kết quả của các thuộc tính để phù hợp với bài toán.

```
$users = User::where('role_id', 1)->get()->map(function (User $user) {
    $user->some_column = some_function($user);
    
    return $user;
});
```

### 16. $loop trong foreach lồng nhau

Ở phần 1, mình đã trình bày cách dùng **$loop** trong vòng lặp **foreach**. Nhưng đó chỉ là 1 vòng lặp đơn giản. Với 2 **foreach** lồng nhau thì sao?

```
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->parent->first)
            // This is first iteration of the parent loop.
        @endif
    @endforeach
@endforeach
```

Ta có thể check item cha của item hiện tại đang xét.

### 17. Hãy sử dụng @forelse

Khi show 1 bảng dữ liệu ra blade view, hồi còn ngu ngơ mình đã làm như thế này

```
@if($users->count() > 0)
    @foreach($users as $user)
        <li> {{ $user->name }} </li>
    @endforeach
@else
    <div> No data!!! </div>
@endif
```

Đừng làm thế vì Laravel đã có directive @forelse với cú pháp gắn gọn hơn

```
@forelse ($users as $user)
    <li> {{ $user->name }} </li>
@empty
    <div> No Data !!! </div>
@endforelse
```

### 18. Validate với kiểu dữ liệu date

Với kiểu dữ liệu date sẽ có lúc bạn phải kiểm tra xem input có phải là date giống với ngày tháng của hôm qua, hôm nay hay là hôm sau.
Validation Laravel cung cấp 2 rules là **after** và **before** chấp nhận param là 1 field khác hoặc là 'tomorrow', 'today', 'yesterday' để xử lý dữ liệu kiểu date

```
$rules = [
    'start_date' => 'after:tomorrow',
    'end_date' => 'after:start_date'
];
```

### 19. GroupBy dữ liệu Collections bằng Callback function

Nếu bạn muốn GroupBy dữ liệu Collections là kết quả từ việc truy vấn từ database theo một số điều kiện của thuộc tính thì hãy sử dụng closure function

```
$users = User::all()->groupBy(function ($item) {
    return $item->created_at->format('Y-m-d');
});
```

### 20.  Blade Directives: IncludeIf, IncludeWhen, IncludeFirst
Đôi khi bạn sẽ phân vân include blade view có tồn tại không hay là load view theo điều kiện nhất định thì hãy sử dụng những directives sau

Blade view sẽ được load nếu nó tồn tại:

```
@includeIf('users.index')
```

Load theo điều kiện

```
@includeWhen(auth()->user()->role_id == 1, 'home.header')
```

Load file view đầu tiên có tồn tại trong 1 mảng danh sách các view

```
@includeFirst('adminlte.header', 'default.header')
```

## Tạm kết
Vậy là với phần 2 này mình đã giới thiệu tổng cộng 20 tips & tricks trong Laravel. Hy vọng sẽ giúp ích cho các bạn trong quá trình học tập và làm việc. Cảm ơn các bạn đã đọc. Hẹn gặp lại các bạn ở phần tiếp theo. See yaaaa!!!