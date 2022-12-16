Ở phần trước mình đã chia sẻ 30 câu hỏi hay phỏng vấn với Laravel. Trong bài này mình sẽ chia sẻ nốt một số câu hỏi về Laravel, hi vọng sẽ giúp đỡ được nhiều bạn trong quá trình làm việc và phỏng vấn.
Các bạn có thể theo dõi toàn bộ series của mình tại đây
1. [[Laravel]Hỏi đáp về Laravel Phần 1](https://viblo.asia/p/laravelhoi-dap-ve-laravel-phan-1-1VgZva7MKAw)
2. [Laravel]Hỏi đáp về Laravel Phần 2
# I. Kiến thức
## 31. Cách truyền nhiều biến từ controller sang blade
```php
$variable = 'Best';
$variable = 'Interview';
$variable = 'Question';

return view('frontend.index', compact('variable', variable', variable'));
```
Trong file view bạn có thể hiện thị bằng cú pháp `{{ $variable }}` hoặc `{{ $variable }}` hoặc `{{ $variable }}`
## 32. Làm thế nào để upload files trong Laravel ?
Chúng ta phải gọi đến Facades có tên là `Storage` trong file controller.
```php
use Illuminate\Support\Facades\Storage;

...
if($request->hasFile(file_name')) {
      $file = Storage::putFile('YOUR FOLDER PATH', $request->file('file_name'));
}
```
## 33. Làm sao để truyền một tên bảng custom trong model ?
Chúng ta truyền vào một biến `protected $table = 'TÊN BẢNG CỦA BẠN';` trong Model.
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Login extends Model
{
    protected $table = 'admin';
    static function logout() {  
        if(session()->flush() || session()->regenerate()) {

            return true;
        }
    }
}
```
**Nếu chúng ta không truyền biến `$table` thì Laravel mặc định đặt tên bảng theo quy tắc `Tên model` + 's'**
Ví dụ : Model là `Login` thì tên bảng là `logins`
## 34. Custom validation rule trong Laravel

1.  Chạy lệnh `php artisan make:rule OlympicYear`
2.  Sau khi chạy lệnh nó sẽ sinh ra cho mình một file có đường dẫn `app/Rules/OlympicYear.php`
3.  Chúng ta có thể viết `rule` trong hàm `passes()` của class `OlympicYear.php`. Nó sẽ trả về `true hoặc false` tùy điều điện, 
```php
public function passes($attribute, $value)
{
    return $value >= 1896 && $value <= date('Y') && $value % 4 == 0;
}
```
4. Tiếp đó chúng ra có thể tùy chỉnh thông báo lỗi với hàm `message()`
```php
public function message()
{
    return ':attribute should be a year of Olympic Games';
}
```
6. Cuố cùng ở controller ta xử lí như sau 
```php
public function store(Request $request)
{
    $this->validate($request, ['year' => new OlympicYear]);
}
```

## 35. Cách để gán giá trị một biến cho toàn bộ file view

Đối với điều này, bạn phải nhận giá trị & gán giá trị trong controller với hàm construct () như thế này
```php
public function __construct() {       
    $this->middleware(function ($request, $next) {              
        $name = session()->get('businessinfo.name');  // get value from session
        View::share('user_name', $name);                   // set value for all View
        View::share('user_email', session()->get('businessinfo.email'));            

        return $next($request);
    });
}
```
## 36. Sử dụng session trong Laravel 
1.  Lấy dữ liệu từ session 

```
session()->get('key');
```
2. Lấy toàn bộ dữ liệu từ session
```
session()->all();
```
3. Xóa dữ liệu từ session
```php
session()->forget('key'); or session()->flush();
```
4. Lưu dữ liệu vào session 
```
session()->put('key', 'value');
```

## 37. Soft delete trong Laravel
**Soft delete** là một tính năng của Laravel giúp khi Model muốn `xóa mềm một` bản ghi. Tức là bản khi không thực sự bị xóa khỏi cơ sở dữ liệu. Thay vào đó, 1 cột `deleted_at` sẽ được thiết lập. Khi bật `soft deletes` cho 1 `model`. Chúng ta phải chỉ định thuộc tính `softDelete` trong model chúng ta sử dụng dụng namespace `use Illuminate\Database\Eloquent\SoftDeletes;` và chúng ta có thể sử dụng `use SoftDeletes;`trong model của chúng ta.

Sau đó chúng ta sẽ sử dụng truy vấn `delete()` thì các bản ghi sẽ không xóa khỏi cơ sở dữ liệu của chúng ta. Sau đó `deleted_at` đã được thiết lập trên bản ghi.
## 38. Thêm nhiều điều kiện AND trong truy vấn Laravel 

Chúng ta có thể thêm nhiều toán tử AND tại một điều kiện where() single cũng như thêm nhiều điện kiện where trong một truy vấn điều kiện 
```php
DB::table('client')->where('status', '=', 1)->where('name', '=', 'bestinterviewquestion.com')->get();

DB::table('client')->where(['status' => 1, 'name' => 'bestinterviewquestion.com'])->get();
```
## 39. Sử dụng join trong Laravel
```php
DB::table('admin')
            ->join('contacts', 'admin.id', '=', 'contacts.user_id')
            ->join('orders', 'admin.id', '=', 'orders.user_id')
            ->select('users.id', 'contacts.phone', 'orders.price')
            ->get();
```

## 40. Lấy ra địa chỉ IP người dùng trong Laravel
Bạn có thể sử dụng `request()->ip()`.
Hoặc bạn có thể dùng `Request::ip()` nhưng với trường hợp này bạn phải gọi namespace là `Illuminate\Support\Facades\Request.`
## 41. How to get current action name in Laravel?
```php
request()->route()->getActionMethod()
```
## 42. Eloquent ORM trong Laravel là  gì ?
ORM(Object Relational Mapping) đây là tên gọi chỉ việc ánh xạ các record dữ liệu trong hệ quản trị cơ sở dữ liệu sang dạng đối tượng mà mã nguồn đang định dạng trong class. Đây là tính năng rất quan trọng và được framework laravel hỗ trợ. Laravel cho phép làm việc với các đối tượng và quan hệ trong CSDL thông qua Eloquent. Mỗi bảng sẽ ứng với 1 Model riêng, và việc thao tác tới các bảng đó trong ứng dụng Laravel sẽ thông qua Model tương ứng đó
Có nhiều loại quan hệ:

1. Quan hệ 1 - 1
2. Quan hệ 1 - n
3. Quan hệ nhiều nhiều
4. . . .

## 43. Các cơ sở dữ liệu hỗ trợ Laravel
1.  MySQL
2.  Postgres
3.  SQLite
4.  SQL Server
## 44. Cách sử dụng cookies trong Laravel
1. Set giá trị cookie: `Cookie::put('key', 'value');`
2. Lấy giá trị cookie: `Cookie::get('key');`
3. Xóa giá trị cookie: `Cookie::forget('key')`
4. Check cookie có tồn tại hay không: `Cache::has('key')`
## 45 Bật tắt chế độ maintenance trong Laravel
```php
// Enable maintenance mode
php artisan down
// Disable maintenance mode
php artisan up
```
## 46. Hàm dd() trong Laravel
Đây là một hàm trợ giúp được sử dụng để chuyển nội dung của biến sang trình duyệt và dừng thực thi tập lệnh tiếp theo. Nó là viết tắt của Dump and Die.
```php
dd($array);
```
## 47. Thuộc tính fillable trong Model là gì?
Nó là một mảng chứa tất cả các trường của bảng có thể được tạo trực tiếp bản ghi mới trong bảng Cơ sở dữ liệu của bạn.
```php
class User extends Model {
        protected $fillable = ['username', 'password', 'phone'];
}
```
Việc khai báo `$fillable` sẽ giúp ta `Mass Assignment` khi tạo một bản ghi mới trong Laravel.
## 48. Thuộc tính guarded trong một mô hình là gì?
Ngược với fillable. Khi một trường được chỉ định guarded. Nó sẽ khoogn được `mass assignable`
```php
class User extends Model {
    protected $guarded = ['user_type'];
}
```
## 49. Lấy ra thông tin người dùng khi họ đăng nhập với Auth

```php
use Illuminate\Support\Facades\Auth;
$userinfo = Auth::user();

print_r($userinfo );
```
## 50. Laravel có hỗ trợ caching?
Có, nó hỗ trợ `caching` như Memcached và Redis. Theo mặc định, laravel được cấu hình với `caching` lưu trữ các đối tượng được lưu nối tiếp, được lưu trong các tệp. Thông thường chúng ta có thể sử dụng Memcached hoặc Redis cho các dự án lớn.
## 51. Sự khác nhau giữa {{ $username  }} và  {!! $username !!} 
`{{ $username }}` chỉ được sử dụng để hiển thị nội dung văn bản nhưng `{!! $username !!}` được sử dụng để hiển thị nội dung với các thẻ HTML nếu tồn tại.
## 52. Tạo tên cho route trong Laravel
Chúng ta có thể tạo nó bởi thuộc tính `name` trong `routes/web.php`
```php
Route::get('contact-us', 'FrontendController@contact')->name('contact');
```
Trong ví dụ trên ta định nghĩa 1 route có tên là `contact`. Giờ chúng ta có thể gọi nó ra bằng cách 
```php
<a href="{{route('contact')}}"> Go to Contact page </a>
```
# II. Tổng kết
Trên đây là  câu hỏi còn lại mình dịch được từ bài [Laravel Interview Questions and answers]. (https://www.bestinterviewquestion.com/laravel-interview-questions). 
Cảm ơn các bạn đã theo dõi toàn bộ bài dịch của mình. Hẹn gặp lại trong các bài viết tiếp theo. Thân ái và quyết thắng