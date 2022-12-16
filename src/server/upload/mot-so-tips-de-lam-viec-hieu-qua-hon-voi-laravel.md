# 1. Sử dụng local scopes khi bạn cần truy vấn.
Laravel có một cách hay để viết truy vấn cơ sở dữ liệu  bằng Query Builder. 
```php
$orders = Order::where('status', 'delivered')->where('paid', true)->get();
```

Điều này khá hay. Điều này giúp tôi tập trung vào logic, điều này dễ tiếp cận hơn đối với tôi. Nhưng đoạn mã này có thể được viết tốt hơn nếu chúng ta sử dụng local scopes.

Local scopes cho phép chúng ta tạo các Query Builder methods, chúng ta có thể xâu chuỗi khi  cố gắng truy xuất dữ liệu. Ví dụ: thay vì -> where (), chúng ta có thể sử dụng -> deliver () và -> pay () theo cách hay hơn như sau.

Đầu tiên, trong Order model, chúng ta nên thêm một số methods:
```php
class Order extends Model
{
   ...
   public function scopeDelivered($query) {
      return $query->where('status', 'delivered');
   }
public function scopePaid($query) {
      return $query->where('paid', true);
   }
}

```

Khi khai báo local scopes, bạn nên sử dụng cách đặt tên chính xác cho scope[Something]. Bằng cách này, Laravel sẽ biết rằng đây là một scope và sẽ sử dụng nó trong Query Builder của bạn. Hãy chắc chắn rằng bạn bao gồm đối số đầu tiên được chèn tự động bởi Laravel và là query builder instance.

```php
$orders = Order::delivered()->paid()->get();

```

Để truy xuất động hơn, bạn có thể sử dụng dynamic local scopes. Mỗi scope cho phép bạn truyền các tham số.

```php 
class Order extends Model
{
   ...
   public function scopeStatus($query, string $status) {
      return $query->where('status', $status);
   }
}
$orders = Order::status('delivered')->paid()->get();

```

Ở phần sau của bài viết này, bạn sẽ tìm hiểu lý do tại sao bạn nên sử dụng snake_case cho các trường cơ sở dữ liệu, nhưng đây là lý do đầu tiên: Laravel sử dụng theo mặc định where[Something] để thay thế scope trước đó. Thay vì trước đó, bạn có thể làm:
```php
Order::whereStatus('delivered')->paid()->get();

```

Laravel sẽ tìm kiếm phiên bản snake_case của Something từ where[Something]. Nếu bạn có trạng thái trong DB của mình, bạn sẽ sử dụng ví dụ trước. Nếu bạn có shipping_status, bạn có thể sử dụng:
```php
Order::whereShippingStatus('delivered')->paid()->get();

```

# 2. Sử dụng Requests files
Laravel cung cấp cho bạn một cách hùng hồn để validate các biểu mẫu của bạn. Dù đó là yêu cầu POST hay yêu cầu GET, nó sẽ không validate nó nếu bạn cần.

Bạn có thể validate theo cách này trong controller của bạn:

```php 
public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ]);
    // The blog post is valid...
}

```

Nhưng khi bạn có quá nhiều code trong các controller methods của mình, điều đó có thể khá khó chịu. Bạn muốn giảm càng nhiều code càng tốt trong controller của mình. Ít nhất, đây là điều đầu tiên tôi nghĩ nếu tôi phải viết nhiều logic. .

Laravel cung cấp cho bạn một cách dễ dàng để validate requests bằng cách tạo request classes và sử dụng chúng thay vì old-fashioned Request class. Bạn chỉ cần tạo yêu cầu của mình:

```php 
php artisan make:request StoreBlogPost

```

Trong folder app/Http/Requests/ folder bạn sẽ tìm thấy file request của bạn:

```php 
class StoreBlogPostRequest extends FormRequest
{
   public function authorize()
   {
      return $this->user()->can('create.posts');
   }
   
   public function rules()
   {
       return [
         'title' => 'required|unique:posts|max:255',
         'body' => 'required',
       ];
   }
}

```

Bây giờ, thay vì Illuminate\Http\Request trong method của bạn, bạn nên thay thế bằng lớp vừa tạo:

```php 
use App\Http\Requests\StoreBlogPostRequest;

public function store(StoreBlogPostRequest $request)
{
    // The blog post is valid...
}

```

Phương thức authorize () phải là boolean. Nếu sai, nó sẽ trả về 403, vì vậy hãy đảm bảo bạn bắt được nó trong phương thức render() của app/Exceptions/Handler.php:
```php 
public function render($request, Exception $exception)
{
   if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
      //
   }
   
   return parent::render($request, $exception);
}

```

Phương thức bị thiếu ở đây, trong request class, là hàm message(), là một array chứa các thông báo sẽ được trả về trong trường hợp validation thất bại:

```php 
class StoreBlogPostRequest extends FormRequest
{
   public function authorize()
   {
      return $this->user()->can('create.posts');
   }
   
   public function rules()
   {
       return [
         'title' => 'required|unique:posts|max:255',
         'body' => 'required',
       ];
   }
   
   public function messages()
   {
      return [
        'title.required' => 'The title is required.',
        'title.unique' => 'The post title already exists.',
        ...
      ];
   }
}

```

Để bắt chúng trong controller của bạn, bạn có thể sử dụng biến errors trong các file blade của mình:

```php 
@if ($errors->any())
   @foreach ($errors->all() as $error)
      {{ $error }}
   @endforeach
@endif

```

Trong trường hợp bạn muốn nhận validation message của một trường cụ thể, bạn có thể làm như vậy sau đó (nó sẽ trả về một thực thể false-boolean nếu validation passed được thông qua cho trường đó):

```php 
<input type="text" name="title" />
@if ($errors->has('title'))
   <label class="error">{{ $errors->first('title') }}</label>
@endif

```

# 3. Magic scopes

Khi building mọi thứ, bạn có thể sử dụng magic scopes đã được embedded

Lấy kết quả theo created_at , giảm dần (descending):
```php 
User::latest()->get();

```

Lấy kết quả theo field , giảm dần (descending):

```php 
User::latest('last_login_at')->get();

```

Lấy kết quả theo random của field order , giảm dần (descending):
```php 
User::inRandomOrder()->get();

```

Chỉ chạy query method nếu có gì đó đúng:
```php 
// Let's suppose the user is on news page, and wants to sort it by newest first
// mydomain.com/news?sort=new
User::when($request->query('sort'), function ($query, $sort) {
   if ($sort == 'new') {
      return $query->latest();
   }
   
   return $query;
})->get();

```

Thay vì when() bạn có thể sử dụng unless, nó ngược lại với when().

# 4. Sử dụng Relationships để tránh big queries
Bạn đã bao giờ sử dụng một tấn liên kết trong một truy vấn chỉ để có thêm thông tin chưa? Rất khó để viết các lệnh SQL đó, ngay cả với Query Builder, nhưng các models đã làm điều đó với Relationships. Ban đầu bạn sẽ không quen thuộc , do lượng thông tin cao mà tài liệu cung cấp, nhưng điều này sẽ giúp bạn hiểu rõ hơn về cách mọi thứ hoạt động và làm thế nào để ứng dụng của bạn chạy mượt mà hơn.

Xem Relationships’ documentation [tại đây](https://laravel.com/docs/5.7/eloquent-relationships).

# 5. Không lưu static data liên quan đến model trong config.

Điều tôi thích làm là lưu trữ static data liên quan đến model bên trong model. Tôi sẽ cho bạn xem.
Thay vì viết file: BettingOdds.php
```php 
class BettingOdds extends Model
{
   ...
}
```

Trong file: config/bettingOdds.php
```php 
return [
   'sports' => [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ],
];

```

và truy cập chúng bằng cách sử dụng: 
```php 
config(’bettingOdds.sports.soccer’);

```

Tôi sẽ làm như thế này:
```php 
class BettingOdds extends Model
{
   protected static $sports = [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ];
}

```

và truy cập chúng bằng cách sử dụng: 
```php 
BettingOdds::$sports['soccer'];

```

Tại sao? Bởi vì nó dễ sử dụng hơn trong các hoạt động tiếp theo:
```php 
class BettingOdds extends Model
{
   protected static $sports = [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ];
   
public function scopeSport($query, string $sport)
   {
      if (! isset(self::$sports[$sport])) {
         return $query;
      }
      
      return $query->where('sport_id', self::$sports[$sport]);
   }
}

```

Bây giờ chúng ta có thể sử dụng scopes:

```php 
BettingOdds::sport('soccer')->get();

```

# 6. Sử dụng collections thay vì xử lý raw-array
Trước đây, chúng ta đã quen làm việc với các array theo cách thô:
```php 
$fruits = ['apple', 'pear', 'banana', 'strawberry'];

foreach ($fruits as $fruit) {
   echo 'I have '. $fruit;
}

```

Bây giờ, chúng ta có thể sử dụng các advanced methods sẽ giúp chúng ta xử lý dữ liệu trong các arrays. Chúng ta có thể filter, transform, iterate and modify dữ liệu trong một array:

```php 
$fruits = collect($fruits);
$fruits = $fruits->reject(function ($fruit) {
   return $fruit === 'apple';
})->toArray();
['pear', 'banana', 'strawberry']

```

Để biết thêm chi tiết, kiểm tra tài liệu mở rộng về [Collections](https://laravel.com/docs/5.7/collections).

Khi làm việc với Query Builders, phương thức ->get() trả về một Collection instance. Nhưng hãy cẩn thận để không nhầm lẫn Collection với Query builder:
* Trong Query Builder, chúng tôi không truy xuất bất kỳ dữ liệu nào. Chúng tôi có rất nhiều phương thức liên quan đến truy vấn: orderBy(), where(), v.v.
* Sau khi chúng tôi nhấn ->get (), dữ liệu được truy xuất, bộ nhớ đã được sử dụng, nó trả về một thể hiện Collection instance. Một số Query Builder methods không khả dụng hoặc chúng có tên, nhưng tên của chúng là khác nhau. .

Nếu bạn có thể filter data ở cấp Query Builder, hãy làm điều đó! Đừng dựa vào việc filtering khi nói đến Collection instance - bạn sẽ sử dụng quá nhiều bộ nhớ ở một số nơi và bạn không muốn. Bắt đầu kết quả của bạn và sử dụng chỉ mục ở cấp độ DB.

Bài viết được dịch từ: https://medium.com/@alexrenoki/pushing-laravel-further-best-tips-good-practices-for-laravel-5-7-ac97305b8cac