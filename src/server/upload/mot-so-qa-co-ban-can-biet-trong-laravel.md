Sau đây, mình xin giới thiệu 1 số câu hỏi cơ bản về laravel kèm theo câu trả lời. Mình nghĩ nó phù hợp với những bạn đang tìm hiểu về laravel hoặc muốn đi phỏng vấn đó :D
### Q1: Facade Pattern sử dụng để làm gì?
Facades cung cấp static interface cho classes có sẵn trong application's service container. Laravel facades đóng vai trò như các proxy tĩnh đối với class bên dưới service container, cung cấp các cú pháp ngắn gọn, đơn giản trong khi vẫn duy trình tính linh hoạt của nó.

Tất cả facades laravel đều được định nghĩa với namespace `Illuminate\Support\Facades`.
```
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

### Q2: Mock 1 method static facade như thế nào?
Chúng ta có thể mock method static facade bằng cách sử dụng shouldReceive method, phương thức này sẽ trả về instance của Mockery.
```
// actual code
$value = Cache::get('key');

// testing
Cache::shouldReceive('get')
                    ->once()
                    ->with('key')
                    ->andReturn('value');
```
### Q3: Sử dụng scope như thế nào?
Scopes cho phép bạn dễ dàng sử dụng lại logic truy vấn trong models của bạn. Đĩnh nghĩa scope như sau:
```
class User extends Model {
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }

    public function scopeWomen($query)
    {
        return $query->whereGender('W');
    }
}
```
Cách dùng scope:
```
$users = User::popular()->women()->orderBy('created_at')->get();
```
Đôi khi bạn có thể muốn định nghĩa một scope với parameters. Dynamic scopes cho phép chũng ta làm điều đó:
```
class User extends Model {
    public function scopeOfType($query, $type)
    {
        return $query->whereType($type);
    }
}
```
Cách sử dụng:
```
$users = User::ofType('member')->get();
```
### Q4: Đặt tên routes trong Laravel?
Bạn có thể đặt tên route bằng cách dùng phương thức name khi định nghĩa route:
```
Route::get('user/profile', function () {
    //
})->name('profile');
```
Bạn có thể chỉ định tên route cho controller actions:
```
Route::get('user/profile', 'UserController@showProfile')->name('profile');
```
Khi bạn đã chỉ định tên cho routes của mình, bạn có thể sử dụng tên route khi Generating URLs hoặc redirects:
```
// Generating URLs...
$url = route('profile');

// Generating Redirects...
return redirect()->route('profile');
```
### Q5: Closure trong Laravel là gì?
Closure là một anonymous function. Closures thường được sử dụng như phương thức callback và có thể sử dụng như một parameter trong function.
```
function handle(Closure $closure) {
    $closure('Hello World!');
}

handle(function($value){
    echo $value;
});
```
### Q6: Một số phương thức Aggregates được cung cấp bởi query builder trong Laravel?
Hàm aggregate là một hàm trong đó các giá trị của nhiều hàng được nhóm lại với nhau như đầu vào trên các tiêu chí nhất định để tạo thành 1 giá trị đơn lẻ có ý nghĩa quan trọng hơn.

Dưới đây là danh sách một số hàm aggregates được cung cấp bởi Laravel query builder:
* count()
    ```
    $products = DB::table(‘products’)->count();
    ```
* max()
    ```
    $price = DB::table(‘orders’)->max(‘price’);
     ```
* min()
    ```
    $price = DB::table(‘orders’)->min(‘price’);
    ```
* avg()
    ```
    $price = DB::table(‘orders’)->avg(‘price’);
    ```
* sum()
    ```
    $price = DB::table(‘orders’)->sum(‘price’);
    ```
### Q7: Đôi chút về Serialization?
Khi xây dựng JSON APIs, bạn sẽ thường cần chuyển đổi models và relationships cuả bạn sang arrays hoặc JSON. Eloquent bao gồm các phương thức thuận tiện để thực hiện chuyển đổi này.

Serializing To Arrays – Để convert một model và relationships thành mảng array, bạn nên sử dụng hàm toArray.
```
$user = App\User::with(‘roles’)->first();

return $user->toArray();
```
Serializing To JSON – Để convert một model sang JSON, bạn nên sử dụng method toJson.
```
$user = App\User::find(1);

return $user->toJson();
```
### Q8: Tại sao chúng ta cần Traits trong Laravel?
Traits được thêm vào PHP với lý do rất đơn giản: PHP không hỗ trợ đa kế thừa. Nói một cách đơn giản, một class không thể extends nhiều hơn 1 class tại 1 thời điểm. Điều này trở nên khó khăn khi mà bạn cần  chức năng được khai báo trong 2 class khác nhau cũng được sử dụng bởi các lớp khác, và kết quả là bạn sẽ phải lặp lại code để hoàn thành công việc mà không bị rối.

Traits cho phép chúng ta khai báo một loại class chứa các phương thức có thể được sử dụng lại. Tốt hơn là các phương thức có thể đưa trực tiếp và bất cứ class nào mà bạn muốn sử dụng, và bạn có thể sử dụng nhiều trait trong cùng một class. Hãy xem một ví dụ đơn giản của Hello World.
```
trait SayHello
{
    private function hello()
    {
        return "Hello ";
    }

    private function world()
    {
        return "World";
    }
}

trait Talk
{
    private function speak()
    {
        echo $this->hello() . $this->world();
    }
}

class HelloWorld
{
    use SayHello;
    use Talk;

    public function __construct()
    {
        $this->speak();
    }
}

$message = new HelloWorld(); // returns "Hello World";
```

Trên đây là một số câu hỏi và giải đáp về laravel mà mình chọn lọc từ bài biết đưới đây. Các bạn có thể tham khảo thêm nhé^^

https://dev.to/fullstackcafe/23-laravel-interview-questions-answered-you-should-know-ibm

https://codingcompiler.com/laravel-interview-questions-answers/