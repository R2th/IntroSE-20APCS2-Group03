# Giới thiệu về Fuelphp và Laravel

**Laravel**

Khi mọi người nói về PHP frameworks, một cái tên nổi tiếng nhất sẽ khiến mọi người nghĩ ngay đến là  [Laravel](https://www.hostinger.com/laravel-hosting). Framework đặc biệt này chiếm cảm tình lớn của mọi người nhờ vào cấu trúc tinh tế, dễ học và rất thoải mái khi sử dụng.

Với Lavarel, bạn có thể bắt đầu dự án web nhanh chóng. Bạn cũng có thể truy cập nhanh vào các chức năng như chứng thực người dùng, quản lý session, và caching. Nhìn chung, Laravel có tất cả chức năng bạn cần để có thể tạo được một ứng dụng PHP hiện đại.

Nếu bạn thích các yếu tố kỹ thuật thì Laravel cũng sẽ là một nền tảng ưa thích của bạn. Mã nguồn Laravel rất chắc chắn tập trung vào khía cạnh hiệu năng, và có thể mở rộng framework này bằng rất nhiều add-ons.

Laravel cũng tích hợp mượt mà với những thư viện bên thứ ba, như là Amazon Web Services (AWS), việc này sẽ dễ dàng giúp bạn xây dựng được các ứng dụng có khả năng mở rộng cực lớn. Đối với những tác vụ cần nhiều thơi gian để chạy, bạn có thể sắp hàng đợt để chạy nền tuần tự, việc này sẽ giúp cải thiện hiệu năng hơn cả.

**Fuelphp**


Là một full-stack PHP framework với khả năng cho phép người dùng tinh chỉnh theo ý muốn, [FuelPHP](http://fuelphp.com/)không chỉ hỗ trợ MVC pattern mà cả phiên bản mới là [HMVC](https://www.madetech.com/blog/hierarchical-model-view-controller-pattern) (Hierarchical MVC). Nó còn có một optional class gọi là Presenter (hồi trước thì có tên là ViewModel) với tính năng tương tự như sự kết hợp của Controller và View layers với khả năng tạo ra Views.

FuelPHP bản chất chính là một modular với khả năng mở rộng, cũng như là an toàn thông tin với các tính năng như input, URI filtering và output encoding. FuelPHP còn có nguồn tự liệu khá phong phú và thú vị mà bạn có thể tìm hiểu thêm [tại đây](https://fuelphp.com/docs/).

# Một vài so sánh
Pros:
| Fuel  | Laravel |
|--|--|
| Total flexibility | Comes with an excellent built-in ORM |
| License | Comes with its own CLI |
| Out of the box HMVC structure | Good documentation |
| Secure | Good for building RESTful APIs |
| Powerful yet lightweight ORM | Easy to write web apps with authentication |
|  | Handles event queuing |
|  | Gives developers a great degree of freedom in how they set up their project structure |
|  | Can use Symfony components |
|  | Gulp tasks in the form of Laravel Elixir |
|  | Extremely powerful template system |
|  | Easy to learn |

Cons:
| Fuel  | Laravel |
|--|--|
| Small community | Uses too much magic methods |
|  | Bloated |
|  | Hard to use model properties |
|  | Steep learning curve |
|  | Follows bad design practices |

# Cấu trúc thư mục
| Fuel  | Laravel |
|--|--|
| cache chứa cache của phần view & dữ liệu mà ta set lưu vào cache | Thư mục `storage` chứa các file compiled Blade templates của bạn, file based sessions, file caches, và những file sinh ra từ framework. Bên trong nó bao gồm `app`, `framework`, và `logs`. Thư mục `app` dùng để chứa những file sinh ra bởi ứng dụng của bạn. Thư mục `framework` chứa những file sinh ra từ framework và caches. Cuối cùng, thư mục `logs` chứa những file logs. |
| classes trong này có controller xử lí logic. model để tương tác với db & khai báo quan hệ giữa các bảng. presenter có thể hiểu nôm na là 1 middleware như bên Laravel, nhưng không nhiều tính năng | Thư mục `app` chứa một vài thư mục con bên trong như `Console`, `Http`, và `Providers`. Hãy nghĩ về `Console` và `Http` là các thư mục cung cấp AP cho phần code lỗi ứng dụng của bạn. Giao thức HTTP và CLI là hai cơ chế tương tác với ứng dụng của bạn, nhưng nó không thật sự chứa logic của ứng dụng. Bạn có thể hiểu, Chúng ta có hay cách để thực thi lệnh đến ứng dụng của bạn |
| config chứa những file config về db, router, các config của từng môi trường làm việc | Thư mục `config`, đúng như cái tên của nó, chứa tất cả những file cấu hình. Thật tuyệt vời khi bạn lướt qua tất cả các file của nó với những cấu hình có sẵn cho bạn. |
| lang dùng cho chức năng multiple language | resource/lang |
| logs ghi log dự án & code mình thực hiện | storage/logs |
| migrations chứa những file migrate db trong trường hợp ta muốn thay đổi db | Thư mục `database` chứa những file database migration và seeds. Nếu bạn muốn, bạn cũng có thể sử dụng nó để tổ chức một cơ sử dữ liệu SQLite. |
| task ta có thể định nghĩa những đoạn code để có thể chạy thông qua command. Nó giống như command bên Laravel vậy | hư mục `Console` chứa tất cả những file Artisan commands ứng dụng của bạn. Đó là những lệnh được sinh ra bằng lệnh`make:command`. Ngoài ra nó còn chứa console kernel của ứng dụng, nó là nơi bạn có thể chỉnh đăng ký Artisan commands và [scheduled tasks](https://giaphiep.com/docs/5.3/structure#) được định nghĩa. |
| themes mình thường để những file css, js của dự án sau đó dùng webpack để move nó ra folder public bên ngoài | Thư mục `resources` chứa những view và raw, những tài nguyên chưa compiled như LESS, SASS, hoặc JavaScript. Nó còn chứa tất cả các file ngôn ngữ trong ứng dụng của bạn. |
| views chứa những file view để hiển thị ra ngoài màn hình | resoruces/views |

# Method
  ## Create
**Fuel**
```php 
// create option 1  
$new = new Model_Example();  
$new->property = 'something';  
$new->save();  
  
// using array
$props = array('property' => 'something');  
$new = new Model_Example($props);  
$new->save();  
```

**Laravel**
```php
// create option 1 
$new  =  new  Example();  
$new->property  =  'something';  
$new->save();

// using array
$props = array('property' => 'something');  
$new = Example::create($props);  
```

  ## Update
  **Fuel**
```php
//update  
$entry = Model_Article::find(4);  
$entry->title = 'My first edit';  
$entry->author = 'Total n00b';  
$entry->save();  
  
$entry = Model_Article::find(4);  
$entry->set([  
'title' => 'My first edit',  
'author' => 'Total n00b'  
]);  
  
$entry->save();  
```

**Laravel**
```php
$entry  = Article::find(4);  
$entry->title  =  'My first edit';  
$entry->author  =  'Total n00b';  
$entry->save();

$entry  = Model_Article::find(4);  
$entry->update([
	'title'  =>  'My first edit',  
	'author'  =>  'Total n00b'  
]);
```

 ## Delete
  **Fuel**
```php
$entry = Model_Article::find(4);  
$entry->delete();
```

**Laravel**
```php
$entry  = Article::find(4);  
$entry->delete();
// or
App\Article::destroy(4);
```

 ## Read
 **Fuel**
```php
// Find only some columns  
Model_Article::query()->select('id', 'name');  
Model_Article::find('all', [
	'select' => [
		'id', 
		'name'
	]
]);  
// Find all columns except 'name'  
Model_Article::query()->select([
	'name' => false
]);  
Model_Article::find('all', [
	'select' => [
		['name' => false]
	]
]);  
```

**Laravel**
```php
// Find only some columns 
Article::select('id',  'name');

// Find all columns except 'name'  
Article::get()->makeHidden(['name'])

//or can put this line in Article model
protected $hidden = ['name'];
```

  ## Where condition
**Fuel**
```php
// Single where 
Model_Article::query()->where('id', 4);  
Model_Article::find('all', array(
	'where' => array('category_id' => 5)
));  
// Multiple where usage examples 
Model_Article::query()
	->where('id', 4)
	->where('category_id', '>', 1);  
Model_Article::query()->where(array(
	'id' => 4, 'category_id' => 6
));  
Model_Article::find('all', array(
	'where' => array(
		array('category_id', '=', 5), 
		array('publish', '<', time())
	)
));  
// Using or where Model_Article::query()->where('id', 4)->or_where('id', 5);  
```

**Laravel**
```php
// Single where 
Article::where('id', 4);  

// Multiple where usage examples 
Article::where('id', 4)
	->where('category_id', '>', 1);  

$whereData = [
    ['name', 'abcd'],
    ['id', '<>', '5']
];
Article::where($whereData);
```

  ## Complex where
  **Fuel**
```php
// complex where clause  
Model_Article::query()  
	->where('author', '=', 16)  
	->and_where_open()  
		->where('date', '<', time())  
		->or_where('draft', '=', 1)  
	->and_where_close();  
// creates WHERE  `author`  = 16 AND (`date`  < 1348404127 OR  `draft`  = 1)  
```

**Laravel**
```php
$article = Article::where('author',  '=',  16);
$article->where(function($query) {
	$query->where('date', '<', time())
		  ->orWhere('draft', 1);
});
```

  ## Sub query
  **Fuel**
```php
$subQuery = Model_Article::query()  
	->select('author')  
	->where('date', '<', time())  
	->where('draft', '=', 1);  
Model_Article::query()  
	->where('author', '=', 16)  
	->or_where('author', $subQuery->get_query(true))  
	->get();  
```

**Laravel**
```php
Article::>where('author', 16) 
	->orWhere('author', function($query){
	    $query->select('author')
		    ->from('article')
		    ->where('date', '<', time())  
			->where('draft',1); 
	})->get();

```

  ## Custom query
**Fuel**
```php
//Custom SQL  
`DB::query('SELECT * FROM`articles`WHERE`id`= 1')->as_object('Model_Article')->execute();`
```
**Laravel**
```php
DB::table('articles')->where('id', 1)->get();
```

# Tổng kết

Bài viết mô tả cơ bản của 2 framework... hi vọng các bạn hiểu rõ hơn về 2 framework này.

Bài viết được tham khảo từ nhiều nguồn..