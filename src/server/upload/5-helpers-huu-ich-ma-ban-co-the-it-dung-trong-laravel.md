Có rất nhiều [helper](https://laravel.com/docs/5.7/helpers) trong Laravel giúp việc phát triển một web trở nên dễ dàng, thuận tiện hơn. Nếu bạn làm việc với framework, mình khuyến khích bạn tìm hiểu xem những helper nào có thể áp dụng trong công việc của mình. Ở bài viết lần này, mình muốn chỉ ra một vài helper mà mình thường xuyên dùng khi code Laravel.
![](https://images.viblo.asia/70fff7b6-fdfa-4762-a5b1-972c51954e6d.jpg)
## data_get()
Helper data_get() cho phép bạn lấy ra giá trị từ một array hoặc một object, có thể sử dụng để lấy array hoặc object lồng nhau bằng cách sử dụng ký hiệu dấu chấm  *(.)*. Helper này gần giống với array_get(). Param tùy chọn thứ 3 của data_get() có thể sử dụng để cung cấp default value trả về, nếu như key truyền vào ko tìm thấy được giá trị nào.
```php
$array = ['albums' => ['rock' => ['count' => 75]]];

$count = data_get($array, 'albums.rock.count'); // 75
$avgCost = data_get($array, 'albums.rock.avg_cost', 0); // 0

$object->albums->rock->count = 75;

$count = data_get($object, 'albums.rock.count'); // 75
$avgCost = data_get($object, 'albums.rock.avg_cost', 0); // 0
```
Nếu bạn sử dụng ký hiệu *(*)* đằng sau ký hiệu *(.)*, Laravel sẽ trả về cho bạn kết quả là một array.
```php
$array = ['albums' => ['rock' => ['count' => 75], 'punk' => ['count' => 12]]];
$counts = data_get($array, 'albums.*.count'); // [75, 12]
```
Helper *data_get()* cho phép bạn tìm một element nào đó trong array hoặc object với cùng một syntax. Bạn sẽ không cần tìm hiểu xem giá trị đó là array hay object để tìm những method hỗ trợ riêng cho từng loại nữa.

## str_plural()
Helper *str_plural()* giúp ta chuyển đổi một string từ số ít sang dạng số nhiều. Hiện tại thì chỉ đang support cho các từ bằng Tiếng Anh. Param tùy chọn thứ 2 sẽ giúp helper chọn trả về số ít hay số nhiều của string vừa truyền vào. Helper này có thể giải quyết cả những danh từ không đếm được hoặc những trường hợp đặc biệt.
```php
str_plural('dog'); // dogs
str_plural('cat'); // cats

str_plural('dog', 2); // dogs
str_plural('cat', 1); // cat

str_plural('child'); // children
str_plural('person'); // people
str_plural('fish'); // fish
str_plural('deer', 2); // deer
```
*str_plural()* có thể giúp chúng ta bỏ đi những đoạn code kiểu như thế này:
```php
{{ $count == 1 ? 'dog' : 'dogs' }}
```
và đương nhiên cũng có helper để chúng ta có thể chuyển đổi số nhiều sang số ít *str_singular()*

## route()
Helper này có thể  được sử dụng bởi nhiều developer nhất trong số 5 helper mình giới thiệu hôm nay. *route()* tạo ra URL từ một route name nào đó. Param tùy chọn thứ 2 là những biến và giá trị được thêm vào route. Laravel sẽ so khớp với các tham số trên route có sẵn, còn lại sẽ thêm vào cuối url như những query string.
```php
Route::get('burgers', 'BurgersController@index')->name('burgers');
route('burgers'); // http://example.com/burgers
route('burgers', ['order_by' => 'price']); // http://example.com/burgers?order_by=price

Route::get('burgers/{id}', 'BurgersController@show')->name('burgers.show');
route('burgers.show', 1); // http://example.com/burgers/1
route('burgers.show', ['id' => 1]); // http://example.com/burgers/1

Route::get('employees/{id}/{name}', 'EmployeesController@show')->name('employees.show');
route('employees.show', [5, 'chris']); // http://example.com/employees/5/chris
route('employees.show', ['id' => 5, 'name' => 'chris']); // http://example.com/employees/5/chris
route('employees.show', ['id' => 5, 'name' => 'chris', 'hide' => 'email']); // http://example.com/employees/5/chris?hide=email
```
Đối với param thứ 3, cũng là một optional param, chúng ta có thể truyền giá trị là *false* để lấy được một [relative URL](https://docs.microsoft.com/en-us/sql/ado/guide/data/absolute-and-relative-urls?view=sql-server-2017) thay vì một [absolute URL](https://docs.microsoft.com/en-us/sql/ado/guide/data/absolute-and-relative-urls?view=sql-server-2017) 
```php
route('burgers.show', 1, false); // /burgers/1
```
Bạn thậm chí có thể truyền một Eloquent model vào route()
```php
route('burgers.show', Burger::find(1)); // http://example.com/burgers/1
```
Nó hoạt động bởi vì base Model implements UrlRoutable interface. Mặc định nó sẽ sử dụng primary key của model đó, ở trường hợp trên chính là id, nhưng bạn có thể override nó bằng cách thêm method *getRouteKeyName()* vào model của bạn.
```php
class Burger extends Model
{
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
```
Sau đó bạn sẽ sử dụng nó như sau:
```php
Route::get('burgers/{slug}', 'BurgersController@show')->name('burgers.show');

route('burgers.show', Burger::find(1)); // http://example.com/burgers/everyones-favorite-burger
```
## abort_if()
Helper *abort_if()* trả ra một exception nếu thỏa mãn điều kiện (param thứ nhất), param thứ 2 là trang error mà bạn muốn nó đi tới, param thứ 3 là optional nhận vào đoạn text mà bạn muốn nó hiển thị ra ở trang lỗi, param optional thứ 4 nhận vào một array headers.
```php
abort_if(! Auth::user()->isAdmin(), 403);
abort_if(! Auth::user()->isAdmin(), 403, 'Sorry, you are not an admin');
abort_if(Auth::user()->isCustomer(), 403);
```
Dưới đây là 1 ví dụ khi không dùng và sau khi dùng *abort_if()*
```php
// In "admin" specific controller
public function index()
{
    if (! Auth::user()->isAdmin()) {
        abort(403, 'Sorry, you are not an admin');
    }
}

// better!
public function index()
{
    abort_if(! Auth::user()->isAdmin(), 403);
}
```

## optional()
Helper *optional()* cho phép bạn truy xuất tới các *properties* hoặc gọi các methods trong một object. Nếu object là null, giá trị trả ra sẽ là null thay vì tạo ra một error.
```php
// User 1 exists, with account
$user1 = User::find(1);
$accountId = $user1->account->id; // 123

// User 2 exists, without account
$user2 = User::find(2);
$accountId = $user2->account->id; // PHP Error: Trying to get property of non-object

// Fix without optional()
$accountId = $user2->account ? $user2->account->id : null; // null
$accountId = $user2->account->id ?? null; // null

// Fix with optional()
$accountId = optional($user2->account)->id; // null
```
## Summary:
Năm helpers vừa rồi là một phần rất nhỏ trong các helpermình hay dùng và khuyến khích các bạn tìm hiểu. Tốt hơn nữa nếu bạn có thể quen và thành thạo tất cả những helper mà Laravel cung cấp cho chúng ta, nó sẽ giúp ích rất nhiều trong việc giảm thiểu logic phức tạp cũng như số lượng các dòng code. 
Và nếu bạn muốn tự tạo những helper cho dự án Laravel của bạn, hãy chờ tới bài viết tháng sau của mình để tham khảo nhé.
## References:
https://laravel-news.com/5-laravel-helpers-make-life-easier
https://laravel.com/docs/5.7/helpers