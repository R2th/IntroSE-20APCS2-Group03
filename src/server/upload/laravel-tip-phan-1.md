Nguồn laraveldaily.com 

### Tip 1 Single Action Controller
 Nếu bạn muốn tạo một controller với chỉ một action, bạn có thể sử dụng phương thức  __invoke()  để tạo một controller "invokable". 
 ```php
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
Routes 
```php
Route::get('user/{id}', 'ShowProfile');
```

Câu lệnh để generate controller này là 
```batch
php artisan make:controller ShowProfile --invokable
```

### Tip 2 Unsigned Integer 
 Để đặt foreign key trong migrations, thay vì sử dụng **integer()**, hãy sử dụng **unsignedInteger()** hoặc **integer()->unsigned()**, nếu không, bạn có thể nhận một số lỗi  SQL. 
 ```php
 Schema::create('employees', function (Blueprint $table) {
    $table->unsignedInteger('company_id');
    $table->foreign('company_id')->references('id')->on('companies');
    // ...
});
 ```
 
 Bạn có thể sử dụng **unsignedBigInteger()** trong trường hợp cột có kiểu **bigInteger()**
 ```php
 Schema::create('employees', function (Blueprint $table) {
    $table->unsignedBigInteger('company_id');
});
```

### Tip 3 Sử dụng OrderBy ngay trong Eloquent relationship 
Bạn có thể sử dụng **orderBy** ngay trong Eloquent relationship của model 
```php
public function products()
{
    return $this->hasMany(Product::class);
}
public function productsByName()
{
    return $this->hasMany(Product::class)->orderBy('name');
}
```

### Tip 4 Sắp xếp các migrations 
  Nếu muốn sắp xếp các DB migrations, bạn chỉ cần thay đổi tên file và timestamp
  Ví dụ, đổi từ **2018_08_04_070443_create_posts_table.php** thành **2018_07_04_070443_create_posts_table.php**, thì file migrations này sẽ thay đổi vị trí sắp xếp theo alphabetical 
  
  ### Tip 5 Raw DB Queries: havingRaw() 
  Bạn có thể sử dụng một số truy vấn **RAW DB QUERIES**  ở một vài nơi, bao gồm cả **havingRaw()** sau khi thực hiện **groupBy()**
  ```php
  Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();
  ```
  
  ### Tip 6 Biến $loop trong vòng lặp foreach 
  Trong vòng lặp **foreach**, bạn có thể sử dụng biến **$loop** để thực hiện rất nhiều việc 
  ```php
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
  Cụ thể các tác vụ có thể thực hiện với biến **$loop** có thể như sau 
  

| Thuộc tính | Mô tả| 
| -------- | -------- |
| $loop->index    | Lấy chỉ số index của vòng lặp hiện tại được tính bắt đầu từ 0     | 
| $loop->iteration | Lấy số lần lặp (bắt đầu từ 0) | 
| $loop->remaining | Số vòng lặp còn lại của vòng lặp |
| $loop->count | Tổng số phần tử sẽ được duyệt trong vòng lặp | 
| $loop->first | Phần tử đầu tiên trong vòng lặp | 
| $loop->last| Phần tử cuối cùng trong vòng lặp | 
| $loop->even | Các phần tử đứng vị trí chẵn trong vòng lặp |
| $loop->odd | Các phần tử đứng vị trí lẻ trong vòng lặp | 
| $loop->depth| Nesting level của các vòng lặp hiện tại |
| $loop->parent| Khi vòng lặp được nested, biến này nó sẽ trả về vòng lặp cha|

### Tip 7 Eloquent where date methods
 Trong Eloquent, chúng ta có thể sử dụng các function **whereDay(), whereMonth(), whereYear(), whereDate(), whereTime()** để query thời gian một cách chính xác. 
 ```php
 $products = Product::whereDate('created_at', '2018-01-31')->get();
 $products = Product::whereMonth('created_at', '12')->get();
 $products = Product::whereDay('created_at', '31')->get();
 $products = Product::whereYear('created_at', date('Y'))->get();
 $products = Product::whereTime('created_at', '=', '14:13:58')->get();
 ```
 
 ### Tip 8 Route group bên trong một group 
 Trong **Route**, chúng ta có thể tạo thêm một group bên trong chính group đó. 
 ```php
 Route::group(['prefix' => 'account', 'as' => 'account.'], function() {
 Route::get('login', 'AccountController@login');
 Route::get('register', 'AccountController@register');
 Route::group(['middleware' => 'auth'], function() {
 Route::get('edit', 'AccountController@edit');
 });
});
```

### Tip 9 Increments and decrements
Nếu bạn muốn một cột trong DB tăng, chỉ cần sử dụng **increment()**. Cũng không nhất thiết là mỗi lần tăng lên 1, có thể tăng mỗi lần lên 50.
```php
Post::find($post_id)->increment('view_count');
User::find($user_id)->increment('points', 50);
```

### Tip 10 Kiểm tra file view có tồn tại hay không ?
Bạn có thể kiểm tra xem file **View** có tồn tại hay khong trước khi load ra chúng
```php
if (view()->exists('custom.page')) {
// Load the view
}
```
Bạn cũng có thể load ra file View đầu tiên nếu nó tồn tại trong mảng các file view được liệt kê 
```php
return view()->first(['custom.dashboard', 'dashboard'], $data);
```