![](https://images.viblo.asia/3d49a019-58dc-4e54-be5d-2ffa2f19b0e1.png)

Bài này có một [bản audio](https://d1wuojemv4s7aw.cloudfront.net/items/3a040x373I401h0O3H1S/AKP04uJlkfkLcBZ67Uvl.mp3) của anh Miguel Piedrafita, các bạn có thể nghe thử.

Laravel đã được nhiều PHP developer sử dụng vì nó cung cấp khả năng viết code clean, luôn hoạt động tốt và có khả năng debug cao. Nó cũng hỗ trợ nhiều tính năng, đôi khi không được liệt kê trong docs, hoặc là đã bị xóa trong docs.

Mình đã làm việc với Laravel một thời gian khá dài, mình sẽ chỉ cho các bạn một vài thủ thuật để làm việc với framework Laravel.

# 1. Sử dụng local scopes khi bạn cần truy vấn nhiều thứ
Laravel có một cách hay để viết truy vấn đó là sử dụng Query Builder. Ví dụ như thế này:
```
$orders = Order::where('status', 'delivered')->where('paid', true)->get();
```

Cách này khá là hay. Cách này khiến mình tập trung vào coding laravel nhiều hơn một chút việc viết các câu lệnh SQL thuần. Nhưng đoạn code trên có thể được viết tốt hơn nếu chúng ta sử dụng local scopes.

Local scopes cho phép chúng ta tạo các Query Builder methods, chúng ta có thể xâu chuỗi khi chúng ta truy xuất data. Ví dụ, thay vì các câu lệnh `->where()`, chúng ta có thể sử dụng `->delivered()` và `->paid()`.

Đầu tiên, trong model Order, chúng ta nên thêm một số methods sau:
```
class Order extends Model
{
   ...
   public function scopeDelivered($query)
   {
      return $query->where('status', 'delivered');
   }
   
   public function scopePaid($query)
   {
      return $query->where('paid', true);
   }
}
```

Khi khai báo local scopes, bạn nên sử dụng quy ước đặt tên chuẩn đó là `scope[Something]`. Theo cách này, Laravel sẽ biết đây là một scope và sẽ sử dụng trong Query Builder của bạn.

```
$orders = Order::delivered()->paid()->get();
```

Để truy xuất động hơn, bạn có thể sử dụng dynamic local scopes. Mỗi scope đều cho phép bạn có thể truyền vào được các tham số.

```
class Order extends Model
{
   ...
   public function scopeStatus($query, string $status)
   {
      return $query->where('status', $status);
   }
}

$orders = Order::status('delivered')->paid()->get();
```

Trong bài viết này, ta sẽ tìm hiểu lý do tại sao nên sử dụng snake_case cho các trường trong cơ sở dữ liệu, và đây là lý do đầu tiên: Laravel sử dụng mặc định `where[Something]` để thay thế scope trước đó. Vì vậy, ta có thể làm như thế này:

```
$orders = Order::whereStatus('delivered')->paid()->get();
```

Laravel sẽ tìm kiếm các từ snake_case của `Something` từ `where[Something]`. Nếu bạn có trường `status` trong DB của mình, bạn có thể làm như ví dụ trên. Nếu bạn có `shipping_status`, bạn có thể sử dụng như sau:

```
$orders = Order::whereShippingStatus('delivered')->paid()->get();
```

# 2. Sử dụng Requests nếu cần
Laravel cung cấp một giải pháp tuyệt vời để validate dữ liệu truyền lên khi người dùng submit form.

Bạn có thể validate theo cách này trong controller của bạn:

```
public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ]);

    // The blog post is valid...
}
```

Nhưng khi bạn có quá nhiều dòng code trong controller, nó sẽ gây khó khăn khi debug. Bạn muốn code của mình càng tối giản càng tốt. Thì khi đó, sử dụng file Request chính là điều cần thiết.

Laravel cung cấp cho bạn một cách tuyệt vời để validate các request bằng cách tạo các class request thay vì viết ngày request ở controller một cách lỗi thời. Bạn có thể tạo file request như sau:

```
php artisan make:request StoreBlogPost
```

File `StoreBlogPostRequest` vừa được tạo sẽ nằm trong thư mục `app/Http/Requests/`:

```
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

Bây giờ, thay vì` Illuminate\Http\Request` trong class của bạn, bạn sẽ sử dụng class request vừa tạo:
```
use App\Http\Requests\StoreBlogPostRequest;

public function store(StoreBlogPostRequest $request)
{
    // The blog post is valid...
}
```

Method `authorize()` phải return về là một boolean. Nếu là false, nó sẽ throw về một `403`.

Trong class request có một hàm là `messages()`, đó là một mảng chứa các thông báo sẽ được trả về trong trường hợp validate thất bại:

```
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

```
@if ($errors->any())
   @foreach ($errors->all() as $error)
      {{ $error }}
   @endforeach
@endif
```

Trong trường hợp bạn muốn nhận thông báo validate của một trường cụ thể, bạn có thể làm như sau:

```
<input type="text" name="title" />
@if ($errors->has('title'))
   <label class="error">{{ $errors->first('title') }}</label>
@endif
```

# 3. Magic scopes
Khi truy xuất dữ liệu, bạn có thể sử dụng magic scopes đã có sẵn.

* Lấy bản ghi mới nhất theo trường `created_at`:

```
User::latest()->get();
```

* Lấy bản ghi mới nhất theo bất kỳ trường nào:

```
User::latest('last_login_at')->get();
```

* Lấy bản ghi theo thứ tự ngẫu nhiên:

```
User::inRandomOrder()->get();
```

* Chỉ chạy một phương thức truy vấn nếu có gì đó đúng:

```
User::when($request->query('sort'), function ($query, $sort) {
   if ($sort == 'new') {
      return $query->latest();
   }
   
   return $query;
})->get();
```

Thay vì `when()` bạn có thể sử dụng `unless`, ngược lại của `when()`.

# 4. Sử dụng Relationships để tránh các truy vấn lớn
Bạn đã bao giờ sử dụng một tấn tham số trong một truy vấn chỉ để có thêm các trường mình cần? Thật sự khó để viết các câu lệnh SQL đó, ngay cả với Query Builder, nhưng model đã giải quyết điều đó với [Relationships](https://laravel.com/docs/5.7/eloquent-relationships). Ban đầu có thể sẽ không quen, do lượng thông tin lớn mà tài liệu cung cấp, nhưng điều này sẽ giúp bạn hiểu rõ hơn về cách thức hoạt động và làm thế nào để ứng dụng của bạn chạy mượt hơn.

# 5. Sử dụng Jobs cho các công việc liên quan đến thời gian
[Laravel Jobs ](https://laravel.com/docs/5.7/queues) là một công cụ mạnh mẽ để chạy các tác vụ ẩn.

* Bạn muốn gửi email không?
* Bạn có muốn gửi một tin nhắn?
* Bạn có muốn xử lý hình ảnh?

Jobs  giúp bạn không phải tiêu tốn thời gian loading cho người dùng của mình vào các tác vụ tiêu tốn thời gian. Chúng có thể được đặt vào queues, có thể được ưu tiên và Laravel sẽ thực hiện queues ở hầu hết mọi nơi có thể: xử lý một số đoạn logic PHP hoặc gửi thông báo hoặc chạy event.

Mình thích sử dụng [Laravel Horizon](https://laravel.com/docs/5.7/horizon) cho queues vì nó dễ cài đặt, có thể được sử dụng Supervisor và cấu hình configuration file, ta có thể cho Horizon biết bao nhiêu quy trình mình muốn cho mỗi queues.

# 6. Stick to database standards & Accessors
Ngay từ đầu học Laravel ta đã biết rằng các biến và phương thức của bạn phải là `$camelCase` và `camelCase()`, trong khi các trường cơ sở dữ liệu phải là `snake_case`. Tại sao? Bởi vì điều này giúp chúng ta xây dựng accessors tốt hơn.

Accessor là các trường tùy chỉnh, chúng ta có thể xây dựng ngay từ model của mình. Nếu cơ sở dữ liệu của chúng ta chứa `first_name`, `last_name` và `age`, chúng ta có thể thêm một trường tùy là `name`: do `first_name` và `last_name` ghép lại. Trường `name` sẽ không được thêm vào trong DB, nó chỉ là một attribute mà model này có. Tất cả các accessors, như scopes, có cú pháp đặt tên giống như thế này: `getSomethingAttribute`:

```
class User extends Model
{
   ...
   public function getNameAttribute(): string
   {
       return $this->first_name.' '.$this->last_name;
   }
}
```

Khi sử dụng $user->name, nó sẽ trả về một concatenation.

Theo mặc định, thuộc tính `name` không được hiển thị nếu chúng ta` dd($user)`, nhưng chúng ta có thể làm xem nó bằng cách sử dụng biến `$appends`:

```
class User extends Model
{
   protected $appends = [
      'name',
   ];
   ...
   
   public function getNameAttribute(): string
   {
       return $this->first_name.' '.$this->last_name;
   }
}
```

Bây giờ, mỗi lần chúng ta `dd($user)`, chúng ta sẽ thấy rằng có thuộc tính `name` (nhưng vẫn không có trong cơ sở dữ liệu).

Tuy nhiên, hãy cẩn thận: nếu bạn đã có một trường `name`, thì `name` bên trong `$appends` không còn cần thiết.

Cùng một ví dụ trên, chúng ta có thể muốn sử dụng hàm `ucfirst()` với `name`:

```
class User extends Model
{
   protected $appends = [
      //
   ];
   ...
   
   public function getFirstNameAttribute($firstName): string
   {
       return ucfirst($firstName);
   }
   
   public function getLastNameAttribute($lastName): string
   {
      return ucfirst($lastName);
   }
}
```

Bây giờ, khi chúng ta sử dụng `$user->first_name`, nó sẽ trả về một chuỗi chữ hoa đầu tiên.

# 7. Không để các dữ liệu tĩnh liên quan đến model trong configs
Những gì tôi thích làm là để các dữ liệu tĩnh liên quan đến model trong model.

Thay vì điều này:

`BettingOdds.php`

```
class BettingOdds extends Model
{
   ...
}
```

`config/bettingOdds.php`

```
return [
   'sports' => [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ],
];
```

Và gọi chúng bằng cách sử dụng:

```
config(’bettingOdds.sports.soccer’);
```

Tôi thích làm như thế này hơn:

`BettingOdds.php`

```
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

Và gọi chúng bằng cách sử dụng:

```
BettingOdds::$sports['soccer'];
```

Tại sao? Bởi vì nó dễ sử dụng hơn trong các hoạt động tiếp theo:

```
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

Bây giờ chúng ta có thể sử dụng scopes như thế này:

```
BettingOdds::sport('soccer')->get();
```

# 8. Sử dụng collections thay vì xử lý raw-array
Trước đây, chúng ta thường làm việc với mảng theo cách sau:

```
$fruits = ['apple', 'pear', 'banana', 'strawberry'];

foreach ($fruits as $fruit) {
   echo 'I have '. $fruit;
}
```

Bây giờ, chúng ta sử dụng các phương thức nâng cao sẽ giúp xử lý dữ liệu trong các mảng. Chúng ta có thể filter, transform, iterate và modify dữ liệu trong một mảng:

```
$fruits = collect($fruits);

$fruits = $fruits->reject(function ($fruit) {
   return $fruit === 'apple';
})->toArray();

['pear', 'banana', 'strawberry']
```

Để biết thêm chi tiết, bạn có thể xem [tài liệu mở rộng về Collections.](https://laravel.com/docs/5.7/collections)

Khi làm việc với Query Builders, phương thức `->get()` trả về một instance Collection. Nhưng hãy cẩn thận để không nhầm lẫn Collection với một `Query` builder:

# 9. Sử dụng packages
Dưới đây là một số packages mình sử dụng:

* [Laravel Blade Directives](https://github.com/appstract/laravel-blade-directives)
* [Laravel CORS](https://github.com/barryvdh/laravel-cors) (bảo vệ routes của bạn khỏi origins khác)
* [Laravel Tag Helper](https://github.com/beyondcode/laravel-tag-helper) (sử dụng tốt hơn các thẻ HTML trong Blade)
* [Laravel Sluggable](https://github.com/cviebrock/eloquent-sluggable) (hữu ích khi tạo slugs)
* [Laravel Responder](https://github.com/flugger/laravel-responder) (xây dựng API JSON dễ dàng hơn)
* [Image Intervention](https://github.com/intervention/image) (xử lý hình ảnh)
* [Horizon](https://github.com/laravel/horizon) (giám sát hàng đợi với minimal configuration)
* [Socialite](https://github.com/laravel/socialite) (minimal configuration để đăng nhập với các mạng xã hội)
* [Passport](https://github.com/laravel/passport) (triển khai OAuth cho routes)
* [Spatie’s ActivityLog](https://github.com/spatie/laravel-activitylog) (theo dõi hoạt động cho các model)
* [Spatie’s Backup](https://github.com/spatie/laravel-backup) (backup files và databases)
* [Spatie’s Blade-X](https://github.com/spatie/laravel-blade-x)
* [Spatie’s Media Library](https://github.com/spatie/laravel-medialibrary) (đính kèm tệp vào model)
* [Spatie’s Response Cache](https://github.com/spatie/laravel-responsecache) (cache controller responses)
* [Spatie’s Collection Macros](https://github.com/spatie/laravel-collection-macros)

Dưới đây là một số gói tôi đã viết:

* [Befriended](https://github.com/rennokki/befriended) (like, follow và block trên các mạng xã hội)
* [Schedule](https://github.com/rennokki/schedule) (tạo thời gian biểu và kiểm tra theo giờ và ngày)
* [Rating](https://github.com/rennokki/rating)
* [Guardian](https://github.com/rennokki/guardian) (permissions system)

# 10. Tham khảo
Bài này mình tìm thấy trên Medium, thấy hay và đã dịch lại về tiếng Việt.

Nguồn: https://medium.com/@alexrenoki/pushing-laravel-further-best-tips-good-practices-for-laravel-5-7-ac97305b8cac