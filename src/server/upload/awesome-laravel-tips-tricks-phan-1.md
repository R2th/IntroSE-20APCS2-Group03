## Giới thiệu
Laravel là 1 framework PHP sử dụng mô hình MVC phổ biến bậc nhất hiện nay. Để trả lời cho câu hỏi tại sao nó trở nên phổ biến thì có lẽ đó là do sự hoàn chỉnh, cung cấp nhiều tính năng thú vị và quan trọng là thân thiện, dễ dàng tiếp cận với nhiều người. Document của Laravel cung cấp khá đầy đủ và chi tiết những tính năng quan trọng mà nó mang lại. Nhưng những tips & tricks dưới đây chưa chắc bạn đã tìm thấy trong Doc. Nào hãy cùng tìm hiểu nhé!!!
### 1. Invokable Controllers
Nếu bạn muốn tạo ra 1 controller với 1 action duy nhất thì từ Laravel 5.6.28 bạn có thể sử dụng magic method `__invoke()` để làm điều đó

Controller:
```
<?php
namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class ShowProfile extends Controller
{
	/**
	* Show the profile for the given user.
	*
	* @param int $id
	* @return Response
	*/
	public function __invoke($id)
	{
        return view('user.profile', ['user' => User::findOrFail($id)]);
	}
}
```

Routes không cần khai báo method:

```
Route::get('user/{id}', 'ShowProfile');
```

Để tạo 1 Invokable Controller nhanh chóng ta có thể sử dụng câu lệnh command sau:

```
php artisan make:controller ShowProfile --invokable
```

Chỉ cần thêm hậu tố `--invokable` là xong.


### 2. Unsigned Integer

Để tạo 1 khóa ngoại trong migration thay vì sử dụng `integer()` thì ta nên sử dụng `unsignedInteger()` hoặc `integer()->unsigned()`. Điều này sẽ tránh giúp chúng ta gặp lỗi SQL khi làm việc vs khóa ngoại
```
Schema::create('employees', function (Blueprint $table) {
    $table->unsignedInteger('company_id');
    $table->foreign('company_id')->references('id')->on('companies');
});
```

### 3. Thứ tự trong Migration
Nếu bạn muốn thay đổi thứ tự khi migrate DB thì ta chỉ cần thay đổi timestamp trong file name.
Ví dụ

```
// File name ban đầu
2019_02_08_069696_create_employees_table.php

//Thay đổi 1 chút timestamps của nó
2019_02_02_069696_create_employess_table.php
```

Chạy lại câu lệnh `php artisan migrate` và xem kết quả.

### 4. $loop trong Foreach

Trong vòng lặp foreach, ta có thể kiểm tra item hiện tại là item đầu tiên hay cuối cùng của vòng lặp bằng cách sử dụng biến **$loop**

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

Ngoài ra, chúng ta còn có thể biết được:
- Số lần lặp của vòng lặp thông qua `$loop->count`
- Lần lặp thứ bao nhiêu: `$loop->iteration`

### 5. Truy vấn dữ liệu thời gian với Eloquent

Trong Eloquent, để truy vấn dữ liệu kiểu thời gian thì ta có thể sử dụng những functions này `whereDay()`, `whereMonth()`, `whereYear()`, `whereDate()` và `whereTime()`.

```
$employees = Employee::whereDate('created_at', '2020-02-22')->get();
$employees = Employee::whereMonth('created_at', '12')->get();
$employees = Employee::whereDay('created_at', '31')->get();
$employees = Employee::whereYear('created_at', date('Y'))->get();
$employees = Employee::whereTime('created_at', '=', '14:13:58')->get();
```

### 6. Increments and decrements
Nếu bạn muốn tăng giảm giá trị của 1 cột trong DB 1 cách nhanh chóng thì có thể sử dụng `increment()`, `decrement()`

```
// view_count được update tăng lên 1
Post::find($post_id)->increment('view_count');

// points tăng thêm n giá trị bằng cách truyền vào đối số thứ 2
User::find($user_id)->increment('points', 50);
```

### 7. Factory callbacks

Trong quá trình sử dụng factories để seeding data, ta có thể thêm Factory Callback functions để làm 1 vài hành động mong muốn sau khi bản ghi được chèn vào.

```
$factory->afterCreating(App\User::class, function ($user, $faker) {
    $user->accounts()->save(factory(App\Account::class)->make());
});
```

### 8. Preview Mailable

Nếu bạn sử dụng Mailables để gửi email, bạn có thể xem trước kết quả mà không cần gửi trực tiếp trong trình duyệt của mình

```
Route::get('/mailable', function () {
    $invoice = App\Invoice::find(1);
    
    return new App\Mail\InvoicePaid($invoice);
});
```

### 9. Route::view

Không cần thiết phải tạo controller để phục vụ mỗi việc hiển thị view blade, thay vì làm như thế này

```
// Routes
Route::get('show', 'UserController@show');
// Controller
class UserController extends Controller
{
    public function show()
    {
        return view('users.show');
    }
}
```
Ta chỉ cần viết:
```
Route::view('show', 'users.show');
```

### 10. Directive @auth

Thay vì dùng câu lệnh if để kiểm tra người dùng đã đăng nhập, hãy sử dụng lệnh `@auth`.

```
@if(auth()->user())
    // The user is authenticated.
@endif
```

Ngắn gọn:

```
@auth
    // The user is authenticated.
@endauth
```

## Tạm kết

Trên đây là 10 tips & tricks trong Laravel mình tổng hợp lại được. Hy vọng sẽ giúp ích cho các bạn trong quá trình học tập và làm việc.
Cảm ơn các bạn đã đọc. Hẹn gặp lại các bạn ở phần tiếp theo. See yaaaa!!!