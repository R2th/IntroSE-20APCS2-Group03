### 1. Migrations
Lệnh `php artisan migrate` nó sẽ ngay lập tức xây dựng database giúp chúng ta.
Tạo một table mới trong laravel, chúng ta có thể chạy lệnh: 
```
php artisan migrate:make create_users_table
```
Lỡ migrate rồi, chúng ta muốn khôi phục lại thì làm cách nào? Đơn giản, chúng ta chỉ cần chạy lệnh chạy lệnh `php artisan migrate:rollback`
Định nghĩa struct cho table với cấu trúc:
```
public function up()
{
    Schema::create('faqs', function(Blueprint $table) {
        $table->integer('id', true);
        $table->text('question');
        $table->text('answer');
        $table->timestamps();
    });
}
 
public function down()
{
    Schema::drop('faqs');
}
```
Method drop() thực hiện nghịch đảo của method up(). Nó cho phép chúng ta quay trở lại quá trình thay đổi.
### 2. Generators
Ở tip trước, chúng ta buộc phải viết schema theo cách thủ công. Tuy nhiên, với gói generators được bật, thay vào đó, chúng ta có thể thực hiện như sau:
```
php artisan generate:migration create_users_table --fields="username:string, password:string"
```
Generator sẽ lo phần còn lại. Điều này có nghĩa là, với hai lệnh, chúng ta đã có thể chuẩn bị và xây dựng một bảng cơ sở dữ liệu mới.
### 3. Commands
Laravel cho phép bạn khai báo và làm việc với command. Tạo mới một command bằng lệnh

`php artisan command:make MyCustomCommand`

Định nghĩa các thuộc tính cơ bản của command

`protected $name = 'command:name';
protected $description = 'Command description.';`

Add vào file app/start/Artisan.php

`Artisan::add(new MyCustomCommand);`
### 4. Eloquent Queries
Laravel cung cấp một trong những triển khai Active-Record mạnh mẽ nhất trong thế giới PHP. Giả sử rằng bạn có một bảng `orders`, cùng với một Order Eloquent model:
```
class Order extends Eloquent {}
```
Chúng tôi có thể dễ dàng thực hiện bất kỳ truy vấn cơ sở dữ liệu nào bằng cách sử dụng PHP đơn giản. Không cần phải ném SQL lộn xộn khắp phòng. Hãy lấy tất cả các đơn đặt hàng.
```
$orders = Order::all();
```
Done. Hoặc có thể, những đơn đặt hàng đó nên được trả lại theo thứ tự, theo ngày phát hành. Điều đó thật dễ dàng:
```
$orders = Order::orderBy('release_date', 'desc')->get();
```
Điều gì xảy ra nếu thay vì tìm một bản ghi, thay vào đó chúng ta cần lưu một đơn hàng mới vào cơ sở dữ liệu. Chắc chắn, chúng ta có thể làm được điều đó.
```
$order = new Order;
$order->title = 'Xbox One';
$order->save();
```
Finished. Với Laravel, các tác vụ từng cồng kềnh để thực hiện trở nên thực sự đơn giản.
### 5. Flexible Routing
Sử dụng routing trong Laravel  khá dễ dàng, bằng cách sử dụng closures.
```
Route::get('orders', function()
{
    return View::make('orders.index')
        ->with('orders', Order::all());
});
```
Điều này có thể hữu ích cho các dự án nhỏ và API, nhưng, đối với các dự án lớn thì sao. Laravel vẫn có thể làm tốt.
```
Route::get('orders', 'OrdersController@index');
```
Done. Để ý xem Laravel phát triển theo nhu cầu của bạn như thế nào? Sự đơn giản chính là điều làm nên sự phổ biến của framework Laravel như ngày nay.
### 6. Easy Relationships
Chúng ta làm gì trong các trường hợp khi chúng ta phải định nghĩa quan hệ? Ví dụ, một task chắc chắn sẽ thuộc về một user.
Với laravel, quan hệ giữa các table trong hệ thống trở lên đơn giản hơn bao giờ hết. Chúng ta viết quan hệ giữa các bảng dựa theo các Model Eloquent.
```
class Task extends Eloquent {
    public function user()
    {
        return $this->belongsTo('User');
    }
}
 
class User extends Eloquent {
    public function tasks()
    {
        return $this->hasMany('Task');
    }
}
```
Với điều đó, chúng ta đã hoàn thành! Hãy lấy tất cả các task của user có id là 1. Chúng ta có thể làm điều đó trong hai dòng code dưới đây:
```
$user = User::find(1);
$tasks = $user->tasks;
```
Vì chúng ta đã định nghĩa relationship từ cả 2 bảng, nếu thay vào đó chúng ta muốn tìm user của 1 task, chúng ta cũng có thể làm điều đó:
```
$task = Task::find(1);
$user = $task->user;
```
### 7.  Form Model Binding
Việc sử dụng Form Model sẽ vô cùng hữu ích khi chúng ta cần chỉnh sửa một row trong table, Form model sẽ liên kết nhanh chóng tới từng row bạn muốn chỉnh sửa.
```
{{ Form::model($order) }}
    <div>
        {{ Form::label('title', 'Title:') }}
        {{ Form::text('title') }}
    </div>
 
    <div>
        {{ Form::label('description', 'Description:') }}
        {{ Form::textarea('description') }}
    </div>
{{ Form::close() }}
```
### 8. Simple Authentication
Laravel có một cách tiếp cận xác thực đơn giản. Đơn giản chỉ cần chuyển một mảng thông tin xác thực, có thể được tìm nạp từ login form, tới Auth::attempt(). Nếu các giá trị được cung cấp khớp với những gì được lưu trữ trong bảng users, thì user đó sẽ được đăng nhập ngay lập tức.
```
$user = [
    'email' => 'email',
    'password' => 'password'
];
 
if (Auth::attempt($user))
{
    // user is now logged in!
    // Access user object with Auth::user()
}
```
Để logout, chúng ta chỉ cần định gõ url /logout
```
Route::get('logout', function()
{
    Auth::logout();
     
    return Redirect::home();
});
```
https://code.tutsplus.com/tutorials/25-laravel-tips-and-tricks--pre-92818