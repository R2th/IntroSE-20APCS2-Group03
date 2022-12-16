<img src="https://lh3.googleusercontent.com/LH1N74jBSy8silWkD-rVXlNlvNfMe4VyQXin7iz_Ww6b_JB_E9dVxbkOdkXMSPXL3Q_3r0w=s170">

**1. Session là gì?**

Session theo tiếng anh là phiên. Đúng vậy session giúp chúng ta lưu lại một phiên làm việc của người dùng. Một phiên có hiệu lực khi bạn gắn và mất khi bạn xóa đi hoặc đóng trình duyệt. Phiên rất hữu ích cho chúng ta để xác thực người dùng vì vậy chúng rất hữu ích cho các developer.

**2. Cách sử dụng session trong Laravel 6**

**2.1 Lấy session**

**2.1.1 Lấy thông qua Request**

```
<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
     public function show(Request $request, $id)
     {
          $value = $request->session()->get('key');
     }
}

//tạo session
$request->session()->put('key', 'value');
```


Nếu Session không tồn tại thì xử lý như thế nào?


```
//Trả về giá trị mặc định
$value = $request->session()->get('key', 'default');

//hoặc
$value = $request->session()->get('key', function () {
     return 'default';
});
```


**2.1.2 Lấy thông qua Session**

```
Route::get('home', function () {
     // lấy dữ liệu của một key
     $value = session('key');
     
     // lấy dữ liệu của một key, nếu không tồn tại sẽ trả về mặc định.
     $value = session('key', 'default');
     
     // tạo session
     session(['key' => 'value']);
});
```

<img src="https://lh3.googleusercontent.com/yFKp4zB2lO_SGqqysto7HWpoBgU2GCA8LT_yHQfo18OEdaNpq8qSDVLgixgAqmTkK6DVZQ=s136" >


**2.1.3 Lấy toàn bộ dữ liệu Session**

`$data = $request->session()->all();`

**2.1.4 Kiểm tra tồn tại session**
```
//không tính null
if ($request->session()->has('users')) {
//
}

//null cũng được nếu nó là giá trị của session được gán
if ($request->session()->exists('users')) {
//
}
```
**2.1.5 Xài một lần rồi bỏ**
```
//chỉ áp dụng cho 1 hành động tiếp theo
$request->session()->flash('status', 'Task was successful!');
```
**2.1.6 Xóa session**
```
// xóa một session
$request->session()->forget('key');

// xóa nhiều session
$request->session()->forget(['key1', 'key2']);

// xóa tất cả session
$request->session()->flush();
```
**Kết Luận**

Như vậy mình đã hướng dẫn các bạn sử dụng Session trong laravel 6. Bản thân mình nghĩ chỉ nên nhớ một cách sử dụng thôi thì tốt hơn là nhớ nhiều cách vì chúng làm việc cũng tương tự nhau. Bản thân mình thì sử dụng Request để làm mọi thứ với session vì nó tiện hơn.