Laravel có rất nhiều hàm helper giúp chúng ta thuận tiện trong việc xử lý với các paths, arrays và strings. 
Trong bài này mình sẽ giới thiệu 10 hàm helper mà bạn nên biết.

# Logger
Hàm helper logger có thể sử dụng để viết một message giúp chúng ta debug. 

Ex:  
```
logger('Test write log.');
// hoặc bạn có thể truyền tham số dưới dạng mảng
logger('Test write log.', ['value' => 1]);
```

Nó sẽ ghi dòng này vào file ghi log.
```
[2019-10-22 11:07:23] local.DEBUG: Test write log.  
[2019-10-22 11:07:23] local.DEBUG: Test write log. {"value":1} 
```

Nếu bạn không truyền param cho hàm logger, nó sẽ trả về một Logger instance, cho phép bạn viết message ở các cấp độ khác nhau vào file log như emergency, alert, critical, error, warning, notice, info, debug .
Ex:
```
logger()->emergency('Test write emergency log');
logger()->alert('Test write alert log');
logger()->critical('Test write critical log');
logger()->error('Test write error log');
logger()->warning('Test write warning log');
logger()->notice('Test write notice log');
logger()->info('Test write info log');
logger()->debug('Test write debug log');
```

ví dụ trên sẽ ghi vào file log những dòng tương ứng này
```
[2019-10-23 11:12:20] local.ALERT: Test write alert log  
[2019-10-23 11:12:20] local.CRITICAL: Test write critical log  
[2019-10-23 11:12:20] local.ERROR: Test write error log  
[2019-10-23 11:12:20] local.WARNING: Test write warning log  
[2019-10-23 11:12:20] local.NOTICE: Test write notice log  
[2019-10-23 11:12:20] local.INFO: Test write info log  
[2019-10-23 11:12:20] local.DEBUG: Test write debug log  
```

# Dividing an array
Hàm helper Arr::divide() cho phép bạn chia một mảng và trả về hai mảng nhỏ hơn. Một mảng chứa các giá trị key và mảng còn lại chứa các giá trị.

Ex:
```
use Illuminate\Support\Arr;

[$keys, $values] = Arr::divide(['name' => 'James', 'age' => 33]);
```

![](https://images.viblo.asia/e6e7316c-8777-467e-a855-4b559b115be4.png)

# Blank
Hàm `blank` kiểm tra xem một giá trị có phải là 'blank' hay không. Một giá trị được xem là 'blank' là giá trị null, một chuỗi chỉ chứa khoảng trắng hoặc một mảng, chuỗi trống.

```
Ex:
blank('');
blank('   ');
blank(null);
blank(collect());
blank([]);
// Will result in: true
blank(0);
blank(true);
blank(false);
// Will result in: false
```

Ngoài ra chúng ta có 1 helper nghịch đảo với `blank` đó là `filled`.

# dump, dd
dump và dd rất tiện dụng nếu bạn muốn debug, in giá trị một hoặc nhiều biến ra màn hình hiển thị. Hàm dd() và dump() có cách dùng tương tự nhau ngoại trừ, hàm dd() sẽ hiển thị thông tin đối tượng được đưa vào và dừng luôn chương trình tại điểm đặt hàm dd() còn hàm dump() vừa hiển thị thông tin nhưng vẫn cho chương trình tiếp tục đến khi kết thúc.

Ex:
```
$items = array(
    'items' => ['Laravel', 'Symfony', 'PHPCake', 'Zend framework']
);
dd($items);
```
![](https://images.viblo.asia/8263374e-7f84-404a-bb0f-7fd70a841343.png)

# Paths
Laravel có nhiều hàm helper giúp bạn có thể sử dụng để thao tác và lấy các dường dẫn trong thư mục.

Dưới đây là các hàm helper mà Laravel cung cấp khi làm việc với paths:
* app_path : Trả về đường đường dẩn chứa folder app trong  dự án
* base_path: Trả về đường đường dẩn chứa folder toàn bộ dự án
* config_path: Trả về đường đường dẩn chứa folder config trong  dự án
* database_path: Trả về đường đường dẩn chứa folder database trong  dự án
* public_path: Trả về đường đường dẩn chứa folder public trong  dự án
* resource_path: Trả về đường đường dẩn chứa folder resource trong  dự án
* storage_path: Trả về đường đường dẩn chứa folder storage trong  dự án

Bạn có thể truyền param vào các hàm helper này, khi đó nó ở giá trị trả về sẽ được gắn thêm param truyền vào trong được dẩn.

Ex:
```
storage_path('app') // .../storage/app
```

# Slug
Để tạo một chuỗi url thân thiện với URL từ một chuỗi nhất định, bạn có thể sử dụng helper `Str::slug` của Laravel hoặc `str_slug` helper của php.

```
use Illuminate\Support\Str;

$slug = Str::slug('Laravel Is Awesome');

dd($slug); // laravel-is-awesome
```


```
$slug = str_slug('Laravel Is Awesome');

dd($slug); // laravel-is-awesome
```

Dấu tách giữa các kí tự mặc định là dấu gạch nối `-`, nhưng bạn có thể thay thế bằng cách truyền đối số thứ hai cho hàm.

```
$slug = str_slug('Laravel Is Awesome', '_');

dd($slug); // laravel_is_awesome
```

# Array has value
Hàm helper Arr: has có thể được sử dụng để kiểm tra xem một hoặc nhiều item có tồn tại trong một mảng hay không bằng cách sử dụng ký hiệu `.`,  Để kiểm tra nhiều item, chỉ cần truyền một mảng string thay vì một string.

```
use Illuminate\Support\Arr;

$blogs = ['blog' => ['title' => 'My blog', 'published' => true]];
$contains = Arr::has($blogs, 'blog.title'); 
// true
$contains = Arr::has($blogs, ['blog.title', 'blog.published']); 
// true
$contains = Arr::has($blogs, ['blog.title', 'blog.author']); 
// false
```
# UUID
Hàm helper `Str::uuid` giúp tạo ra 1 chuỗi UUID.

```
use Illuminate\Support\Str;

dd(strval(Str::uuid())); // "f548e539-6a0d-4009-b09c-cdabd4d38d96"
```

# Optional
Hàm helper `optional` cho phép truy nhập các thuộc tính của object, trong trường hợp truy nhập thuộc tính của object không tồn tại, nó trả về null, chứ không báo lỗi.

```
class Person {
    public $name = 'thanh';
}

$person = new Person;
$person->name; // thanh
optional($person)->name // thanh
$person->email; // error
optional($person)->email // null
```

# Pluck
Hàm `Arr::pluck` hoặc `array_pluck` lấy tất cả giá thị từ một mảng theo 1 key xác định.
```
use Illuminate\Support\Arr;

$parents = [
    ['parent' => ['id' => 1, 'name' => 'James']],
    ['parent' => ['id' => 2, 'name' => 'Lisa']],
];

dd(Arr::pluck($parents, 'parent.name'));// ['James', 'Lisa']
```