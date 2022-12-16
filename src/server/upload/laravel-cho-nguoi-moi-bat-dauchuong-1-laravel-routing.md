# Laravel Routing

Chương này mình sẽ nói ngắn gọn về cách Laravel Routing 
Bao gồm.
  - Cách định nghĩa route
  - Các cách truyền tham số cho Route
  - Đặt tên route và best practices khi naming
  - Cách grouping routes
  - Redirect và Abort Request

Bài viết này cũng sẽ đề cập đến việc spoofing http methods, redirect/abort request trong Laravel

## Định nghĩa Route
Route là những url sẽ được access bởi enduser của chúng ta. Với laravel chúng ta có thể define chúng trong 
`routes/web.php` và `routes/api.php` .

☀️*Ví dụ*
```php
//routes/web.php
Route::get('/', function(){
	return view('home');
});
```

```php
//routes/api.php
Route::get('/users', function(){
	return User::all
});
```

### Các Http Verbs cho Route
Route có thể tiếp nhận các động từ của Http methods bao gồm: get, post, put, delete. Tương ứng thì Laravel Route facade cũng hỗ trợ ta tất cả những http methods trên, ngoài ra còn hỗ trợ thêm:
`Route::any` và `Route::match([{http_method_1}, {http_method_2}])`

### Xử lý Route
Chúng ta có thể pass closure trực tiếp vào định nghĩa của Route, tuy nhiên với các application lớn thì điều này có vẻ không còn phù hợp nữa. Laravel cũng cho phép chúng ta truyền vào kiểu `ControllerName@method` thay vì truyền closure vào trong Routes như bên dưới 

```php
Route::get('/', 'DashboardController@show');
```
Khi chúng ta truyền như trên thì `App\Http\Controller\DashboardController` sẽ được gọi, và hàm `show` của controller đó sẽ chạy rồi trả về kết quả cho Route.
### Tham số của Route

Chúng ta có thể truyền tham số vào trong routes bằng cách định nghĩa như bên dưới

```php
Route::get('/users/{id}', function($id){
	return User::find($id);
});
```

**Note** : Chúng ta hoàn toàn có thể truyền tên tham số của closure khác với trong route segments (tuy nhiên nó sẽ làm cho models binding không hoạt động nữa.)

```php
Route::get('/users/{id}', function($thisIsTheRealId){
	return User::find($thisIsTheRealId);
});
```

Ở trên chúng ta truyền tham số theo dạng **required (bắt buộc )**,  chúng ta hoàn toàn có thể truyền theo dạng optional. Ở đây dấu `?` ngầm định tham số `id` là không bắt buộc và có thể nhận giá trị là `defaultId`

```php
Route::get('/users/{id?}', function($id = 'defaultId'){
	return User::find($id);
});
```

### Tên của Route
Chúng ta hoàn toàn có thể đặt tên cho Routes (và việc này tôi nghĩ là nên làm, cần phải làm!).
Chúng ta có thể đặt tên cho routes như bên dưới

```php
Route::get('users/{id}, 'UserController@show')->name('users.show');'
```
Gỉa sử ở view chúng ta có reference đến màn hình show user như bên dưới 

```htmlbars
<a href="<?php echo url('users/5') ?>" />
```

Chúng ta hoàn toàn có thể thay đổi lại routes (ví dụ `/users/{id}` thay đổi thành `/users/show/{id}`) như vậy chúng ta phải thay đổi lại view của chúng ta nữa. 
Điều này chắc chắn sẽ tốn khá nhiều công sức nếu như chúng ta có rất nhiều views. Tuy nhiên nếu sử dụng routes name thì chúng ta có thể giải quyết vấn đề bên trên cực kì nhẹ nhàng 

```htmlbars
<a href="<?php echo route('users.show', ['id' => 5]) ?>" />
```
Và chúng ta có thể định nghĩa qui tắc đặt tên route theo kiểu `{resourcePlural}.{action}`  ví dụ 

  - users.index
  - users.create
  - users.store
  - users.show
  - users.index

Ngoài ra việc truyền các tham số vào trong hàm `routes()` cũng khá là đa dạng như bên dưới 

```php
// Cách 1
route('blog.posts.show', [1,2]);
// http://myapp.com/blog/1/posts/2 
//Cách 2
route('blog.posts.show, ['blogId' => 1, 'postId' => 2]');
// http://myapp.com/blog/1/posts/2 
```
Chúng ta cũng có thể không cần chỉ định rõ ràng tên các tham số ( nhưng sẽ truyền chúng theo thứ tự như closure hoặc định nghĩa của methods trong Controller.)


## Route groups
Chúng ta có thể groups các route có liên quan với nhau về mặt business (domain, cùng thao tác trên một model), hoặc các route có liên quan về mặt kỹ thuật (cùng một namespace chẳng hạn) lại cùng nhau.
Ở đây những route được groups lại cùng nhau có thể chia sẻ:
  - Middleware
  - Path (ví dụ `/api/` và `/web/`)
  - Namespace (để làm cho Controller settings ngắn hơn)
  - Subdomain routing (nếu application của chúng ta là multitenancy)
  - Name prefixes 

Việc groups các routes có liên quan lại với nhau dưới cùng một middleware, namespace ... sẽ giúp chúng ta tránh được sự lặp lại (trong code) cũng như giúp cho những developer ở tương lai ( những người sẽ chịu trách nhiệm maintainance đoạn code của chúng ta) có một cái nhìn tổng quan về các middleware, cách chúng ta tổ chức routes.

### Middleware
Middleware sẽ được nói kỹ hơn ở phần Request và Response, tuy nhiên ở đây chúng ta sẽ định nghĩa middleware là gì:
Middleware đóng vai như một lớp màn đứng giữa application của chúng ta và end-user. Nhiệm vụ của middleware chính là **filter (request) / decorate (response)**. Nói cách khác middleware sẽ tiếp xúc với request của enduser đầu tiên, và cũng tiếp xúc với response cuối cùng ngay trước khi response được trả về cho end-user

*🌈Tham khảo*
```php
Route::group(['middleware' => 'auth'], function(){
	Route::get('dashboard', function(){
		return view('dashboard');
	});

	Route::get('profile', function(){
		return view('profile');
	});
		
});
```

Chúng ta áp dụng middleware `auth` (authorization) , chỉ cho phép những user đã login được phép access vào `dashboard` và `profile` . Việc này sẽ giúp chúng ta đỡ phải lặp lại việc áp dụng middleware vào từng Controller riêng rẽ.

### Paths
Ngoài ra chúng ta có thể groups các routes chia sẻ cùng một segments lại thành một nhóm (mục đích là đỡ phải viết nhiều thôi `api\users\`, `api\workbooks` chẳng hạn, chúng ta có thể nhóm lại thành một route groups chia sẻ cùng một segments là `api`)

*🌈Tham khảo*
```php
Route::group(['prefix' => 'api'], function(){
	Route::get('users', function(){
		return User::all();
	});
	
	Route::get('workbooks', function(){
		return Workbook::all();
	});
});
```

Như vậy thì chắc là nhanh hơn nếu ta phải viết như bên dưới phải không :D

```php
Route::get('/api/users', function(){
	return User::all();
});

Route::get('/api/workbooks', function(){
	return Workbook::all();
});
```

### Subdomain routing
Đôi khi chúng ta phải phân routes theo từng subdomain (ví dụ `api.myapp.com` và `myapp.com`),  hoặc Multitenancy apps (slack chẳng hạn, khi tạo một company thì slack sẽ tạo cho chúng ta subdomain `{your_company}.slack.com`) là usecase thường dùng nhất cho trường hợp này. 

```php
Route::group(['domain' => 'api.myapp.com'], function(){
	Route::get('users', function(){
		return User::all();
	});

	Route:get('workbooks', function(){
		return Workbook::all()
	});
});
```

Trường hợp muốn truyền tham số vào trong subdomain, chúng ta có thể làm như  bên dưới

*🌈Tham khảo*
```php
Route::group('['domain' => {companyName}.myapp.com')], function(){
	Route::get('/', function($companyName){
		return view('home');
	});
	Route::get('/users/{id}', function($companyName, $id){
		//Return user model
	})
});
```

### Namespace prefixes
Chúng ta có thể settings trực tiếp từng controller cho từng routes, vì vậy đôi khi chúng ta phải lặp đi lặp lại việc settings tên class quá dài cho những controller trong cùng 1 namespace.

Ví dụ:
```php
// App\Http\Controllers\BusinessLogic\ControllerA
// App\Http\Controllers\BusinessLogic\ControllerA
Route::get('/', 'BusinessLogic\ControllerA@index');
Route::get('/dashboard', 'BusinessLogic\ControllerB@show');
```

Khi sử dụng grouping bằng namespaces chúng ta có thể viết lại thành 

*🌈Tham khảo*
```php
Route::group(['namespace' => 'BusinessLogic'], function(){
	Route::get('/', 'ControllerA@index');
	Route::get('/dashboard', 'ControllerB@show');
})
```

### Prefixes cho Name
Có thể có trường hợp chúng ta muốn đặt routes kiểu như `blog/posts/5`  và muốn `blog.posts.show` sẽ hiển thị thông tin lên. Trong trường hợp này, chúng ta có thể dùng route group để group lại tất cả resources của `blog.posts` . Ta có thể sử dụng group để wrap thông tin lại như bên dưới.

```php
Route::group(['as' => 'blog.', 'prefix' => 'blog'], function(){
	Route::group(['as' => 'posts.', 'prefix' => 'posts'], function(){
		Route::get('{id}', function($id){
			//Show post logic here
		})->name('show');
	});
});
```


## Http Method spoofing
Sẽ có khi chúng ta post một form trong laravel, tuy nhiên ở phía Server chúng ta muốn laravel nhận là một http method khác (không phải là Post). Hành động này gọi là Http method spoofing (giả dạng http method).
Chúng ta có thể thực hiện điều này bằng cách thêm tham số `_method` chỉ định http method chúng ta muốn giả dạng. 

*Ví dụ*:
```htmlbars
<form action="/tasks/3" method="POST">
	<input type="hidden" name="_method" value="DELETE"/>
</form>
```

Như vậy thì `Route::delete` sẽ bắt được request này chứ không phải `Route::post`

## Redirect
Laravel cung cấp cho ta `Redirect` facade hoặc global helper `redirect()` (cả 2 đều cùng tính năng), để điều hướng end-user.
### redirect()->to()
Chúng ta truyền url trực tiếp vào trong hàm `to()` để thực hiện điều hướng.

### redirect()->route()
Hàm này tương tự như `redirect()->to()` tuy nhiên chúng ta truyền được route name thay vì là url trực tiếp (nên tôi khuyên dùng hàm này).
```php
return redirect()->route('users.show', ['userId' => 5]);
```
### redirect()->back()
Hàm này thực hiện điều hướng về trang liền trước. 
Chúng ta có thể sử dụng `back()` trực tiếp thay vì gọi `redirect()->back()`

### redirect()->with()
Khi chúng ta điều hướng giữa các trang, chúng ta muốn truyền một vài thông tin nhất định khi điều hướng, thì `redirect()->with()` là một lựa chọn cho chúng ta.
Ví dụ 
```php
Route::get('redirect-with-key-value', function(){
	return redirect('dashboard')
	->with('error', true);
});
```
Chúng ta có thể truyền vào array thay vì là chỉ key và value

```php
Route::get('redirect-with-key-value', function(){
	return redirect('dashboard')
	->with(['error'=> true, 'message' => 'Whoops, error occurred']);
});
```

Giả sử sau khi user submit form, chúng ta validate và thấy lỗi, chúng ta muốn redirect lại màn hình nhập liệu và fill sẵn những field user đang nhập, chúng ta có thể sử dụng hàm `withInput()`

```php
Route::post('form', function(){
	return redirect('register')
	->withInput()
	->with(['error'=> true, 'message' => 'Whoops, error occurred']);
});
```


## Aborting

Aborting sẽ trả về views và redirect. Chúng ta có các hàm `abort()`, `abort_if` và `abort_unless()` 
Hai hàm  `abort_if` và `abort_unless()` nhận tham số đầu tiên là một giá trị điều kiện (true/false) để kiểm tra xem có abort request hay là không.
Hàm `abort()` nhận giá trị đầu vào là Http Status code, message và headers (array).


## Kết

Laravel routes được định nghĩa trong 2 file `routes/web.php` và `routes/api.php`
Chúng ta có thể định nghĩa segment cho từng path, có thể truyền tham số cho route cũng như grouping routes.
Định nghĩa route, có thể định nghĩa bằng **Closure** hay **Controller@methodName**
Chúng ta có thể dùng `Redirect` facade hoặc `redirect()` global helper để thực hiện redirect cũng như `abort()` và các hàm liên quan để abort request.