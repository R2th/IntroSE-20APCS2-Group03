Mặc dù bản thân tôi cũng đã làm việc tương đối nhiều với framework Laravel. Từ ngày Laravel ra version 4.2 đến bây giờ là version mới nhất 5.6. Trong Laravel có rất nhiều Tips & Tricks mà mình đã từng sử dụng qua ít nhất 1 lần. Nhưng lại chưa bao giờ tổng hợp nó lại thành một list. Hôm nay nhân lúc rảnh rỗi, tìm được bài viết này nên ghi lại đây để tiện tra cứu về sau. 

**1. Eloquent Queries**

Laravel cung cấp một trong những implementations mạnh mẽ nhất trong thế giới PHP đó là Active-Record. Ví dụ, bạn có một table _orders_ và một model là Order.php

```
class Order extends Eloquent {}
```
Với Eloquent model, chúng ta có thể dễ dàng truy vấn với bất kỳ câu query nào tới cơ sở dữ liệu. Ví dụ, lấy tất cả các đơn đặt hàng trong bảng orders. 

```
$orders = Order::orderBy('release_date', 'desc')->get();
```

Hay là thêm mới một đơn đặt hàng vào bảng orders, 

```
$order = new Order;
$order->title = 'Xbox One';
$order->save();
```

**2. Flexible Routing**

Nếu các bạn đã sử dụng qua framework Laravel thì chắc hẳn mọi người đều biết là route trong Laravel sử dụng vô cùng linh hoạt. Bạn có thể khai báo router kiểu như

```
Route::get('orders', function()
{
    return View::make('orders.index')
        ->with('orders', Order::all());
});
```

Hay ngắn gọn vào đơn giản hơn là khai báo kiểu

```
Route::get('orders', 'OrdersController@index');
```

**3. Easy Relationships**

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

Chỉ có vậy, chúng ta đã định nghĩa xong quan hệ giữa user và task. Bây giờ, việc lấy giữ liệu sẽ được thực hiện như sau:

```
$user = User::find(1);
$tasks = $user->tasks;

$task = Task::find(1);
$user = $task->user;
```

**4. Form Model Binding**

Việc sử dụng Form Model sẽ vô cùng hữu ích khi bạn cần chỉnh sửa một hàng trong table, Form model sẽ liên kết nhanh chóng tới từng hàng  bạn muốn chỉnh sửa.

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

**5. Cache Database Queries**

Khi bạn cần remember một câu query thì công việc đơn giản của bạn chỉ cần gọi method

```
$questions = Question::remember(60)->get();
```

Bây giờ, trong một giờ tiếp theo, nếu có bất kỳ request nào tới trang, thì câu query vẫn được lưu trữ và database sẽ không được chạm tới. 

**6. View Composers**

Trong nhiều trường hợp, nhiều view yêu cầu chung một biến hoặc chung một giá trị hay một phần dữ liệu  nhất định. Để không phải lặp lại code quá nhiều lần, chúng ta có thể sử dụng cách

```
View::composer('layouts.nav', function($view)
{
    $view->with('tags', ['tag1', 'tag2']);
});
```

Với việc này, mỗi khi layout _layouts/nav.blade.php_ được loaded thì nó sẽ nhận được một biến $tag truyền vào.

**7. Simple Authentication**

Laravel cung cấp methos Auth::temp() để check authentication. Nó được match với giá trị trong table user. 

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

Để logout, chúng ta chỉ cần định nghĩa route /logout cho hệ thống

```
Route::get('logout', function()
{
    Auth::logout();
     
    return Redirect::home();
});
```

**8. Resources**

Làm việc với RESTFull trong Laravel chưa bao giờ dễ dàng hơn thế. Để khai báo một resourceful controller, bạn chỉ cần sử dụng

```
Route::resource('orders', 'OrdersController');
```

Với dòng route trên, laravel sẽ định nghĩa cho chúng ta các route

- GET /orders
- GET /orders/:order
- GET /orders/create
- GET /orders/:order/edit
- POST /orders
- PUT /orders/:order
- PATCH /orders/:order
- DELETE /orders/:order

Hơn nữa, bạn có thể tạo một controller bằng câu lệnh

```
php artisan controller:make OrdersController
```

Trong controller vừa được tao ra này, mỗi một method sẽ tương ứng với sanh sách route ở trên. Ví dụ, /order tương ứng với method index.  /orders/create tương ứng với method create()

**9. Blade Templating**

File blade trong laravel có định dạng đuôi là _.blade.php_. Bạn có thể sử dụng như

```
@if ($orders->count())
    <ul>
        @foreach($orders as $order)
            <li>{{ $order->title }}</li>
        @endforeach
    </ul>
@endif
```

**10. Testing Facilities**

Laravel sử dụng composer, và nó cũng hỗ trợ sẵn sàng PHPunit để thực hiện việc viết unit test cho những dòng code

```
public function test_home_page()
{
    $this->call('GET', '/');
    $this->assertResponseOk();
}
```

```
public function test_contact_page_redirects_user_to_home_page()
{
    $postData = [
        'name' => 'Joe Example',
        'email' => 'email-address',
        'message' => 'I love your website'
    ];
 
    $this->call('POST', '/contact', $postData);
 
    $this->assertRedirectedToRoute('home', null, ['flash_message']);
}
```

**11. Remote Component**

Bạn có thể dễ dàng viết command để ssh tới server của bạn.

```
SSH::into('production')->run([
    'cd /var/www',
    'git pull origin master'
]);
```

Truyền một mảng param vào method run().

**12. Events**

```
Event::listen('user.signUp', 'UserEventHandler');

```

laravel cung cấp một  simple observer implementation để lắng nghe tất cả các sự kiện trong ứng dụng của bạn. 

**13. View All Routes**

Để xem tất cả các routes có trong ứng dụng web của bạn. Chạy câu lệnh commands sau

```
php artisan routes
```

Kết quả thu được trên màn hình như sau:

![](https://images.viblo.asia/7d84d4b2-704f-48e1-9d40-f0ce36967cb8.png)

**15. Easy Validation**

Thao tác với form thì việc validate giá trị input nhập vào là không thể thiếu. Với laravel, bạn có thể dễ dàng validate input form, custom message cho những rule cần thiết. 

```
$order = [
    'title' => 'Wii U',
    'description' => 'Game console from Nintendo'
];
 
$rules = [
    'title' => 'required',
    'description' => 'required'
];
 
$validator = Validator::make($order, $rules);
 
if ($validator->fails())
{
    var_dump($validator->messages()); // validation errors array
}
```

Gọi đến function _$order->isValid();_ để thực hiện validate

**16. Tinker Tinker**

Thao tác với database đơn giản và tiện lợi hơn rất nhiêu với Tinker. Sử dụng như sau: 

```
$ php artisan tinker
 
> $order = Order::find(1);
> var_dump($order->toArray());
> array(...)
```

Bạn có thể trực tiếp truy vấn, insert or update dữ liệu.

**17. Migrations**

Tạo một table mới trong laravel cũng không hề khó khăn. Sử dụng câu lệnh sau để khai báo một table mới

```
php artisan migrate:make create_users_table
```

Định nghĩa struct cho table với cấu trúc

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

**18. Commands**

Laravel cho phép bạn khai báo và làm việc với command. Tạo mới một command bằng lệnh

```
php artisan command:make MyCustomCommand
```
Định nghĩa các thuộc tính cơ bản của command 

```
protected $name = 'command:name';
protected $description = 'Command description.';
```

Add vào file _app/start/Artisan.php_

```
Artisan::add(new MyCustomCommand);
```

**19. Form Helpers**

Với Form Helpers, việc định nghĩa một form input trở lên dễ dàng hơn rất nhiều

```
{{ Form::open() }}
    {{ Form::text('name') }}
    {{ Form::textarea('bio') }}
    {{ Form::selectYear('dob', date('Y') - 80, date('Y')) }}
{{ Form::close() }}
```

**20. Environments**

Tất cả các config cần thiết cho ứng dụng của bạn sẽ được khai báo trong file .env. Với việc khai báo như vậy, bạn sẽ dễ dàng đưa code lên server mà không mất qua nhiều thời gian để config.