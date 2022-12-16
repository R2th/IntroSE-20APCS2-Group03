### Sử dụng local scopes khi bạn query mọi thứ

Laravel có một cách hay để viết các query cho database của bạn bằng cách sử dụng Query Builder. Giống như đoạn code này:

```php
$orders = Order::where('status', 'delivered')->where('paid', true)->get();
```

Điều này khá tốt. Nó khiến nhiều người từ bỏ SQL và tập chung vào coding vì nó dễ tiếp cận hơn. Nhưng đoạn code này có thể được viết tốt hơn nếu chúng ta sử dụng local scopes.

Local scopes cho phép chúng ta ra các phương thức Query Bullder của riêng mình. Chúng ta có thể xâu chuỗi chúng khi cố gắng truy xuất dữ liệu. VD: Thay vì dùng các câu lệnh `->where()`, chúng ta có thể sử dụng `->delivered()` và `->paid()` theo cách clean hơn.

Đầu tiên, trong model `Order` chúng ta thêm 1 số phương thức:
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

Khi khai báo local scopes, bạn nên sử dụng cách đặt tên chính xác `scope[Something]`. Theo cách này laravel sẽ biết đây là một scope và sẽ sử dụng nó trong Query Builder của bạn. Bạn phải đảm bảo đối số đầu tiên được tự động inject vào laravel và là đối tượng của Query Builder.

```php
$orders = Order::delivered()->paid()->get();
```

Để sử dụng động hơn, bạn có thể dùng dynamic local scopes. Mỗi scope đều cho phép bạn đưa ra các tham số.

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

Ở phần sau bài viết này, bạn sẽ hiểu lý do tại sao bạn nên sử dụng `snake_case` cho các trường trong cơ sở dữ liệu, nhưng đây là lý do đầu tiên: Laravel mặc định sử dụng `where[Something]` để thay thế scope trước đó. Vì vậy, thay vì trước đây bạn có thể làm: 

```php
Order::whereStatus('delivered')->paid()->get();
```

Laravel sẽ tìm kiếm `snake_case` của `Something` trong `where[Something]`. Nếu bạn có `status` trong DB, bạn sẽ sử dụng như ví dụ trước.

### Sử dụng Request files

Laravel cung cấp cho bạn một cách để validate form bằng eloquent. Nếu có một request POST hoặc một request GET, nó sẽ không thể validate nếu bạn cần nó.

Bạn có thể valdidate theo cách này trong controller:

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

Nhưng khi bạn có quá nhiều code trong các phương thức của controller, nó có thể khá khó chịu. Bạn muốn giảm càng nhiều càng tốt code của mình trong controller. Ít nhất, đây là điều đầu tiên tôi nghĩ nếu tôi phải viết nhiều logic.

Laravel cung cấp cho bạn một cách dễ thương để validate các request bằng cách tạo các class request và sử dụng chúng thay vì các lớp `Request` lỗi thời. Bạn chỉ cần tạo request của bạn:

``` shell
php artisan make:request StoreBlogPost
```

Trong thư mục `app/Http/Requests/` bạn sẽ tìm thấy request file của mình:

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

Bây giờ, thay vì dùng `Illuminate\Http\Request` trong phương thức của bạn, bạn hãy thay thế nó bằng class vừa tạo:

```php
use App\Http\Requests\StoreBlogPostRequest;
public function store(StoreBlogPostRequest $request)
{
    // The blog post is valid...
}
```

Phương thức `authorize()` phải trả về boolean. Nếu nó trả về false thì sẽ throw lỗi `403`, vì vậy hãy đảm bảo bạn catch nó trong phương thức `render()` của file `pp/Exceptions/Handler.php`:

```php
public function render($request, Exception $exception)
{
   if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
      //
   }
   return parent::render($request, $exception);
}
```

Trong class `StoreBlogPostRequest` chúng ta còn thiếu một phương thức đó chính là `messages()`. phương thức này trả về một mảng các message báo lỗi mỗi khi request lỗi.

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

```php
@if ($errors->any())
   @foreach ($errors->all() as $error)
      {{ $error }}
   @endforeach
@endif
```

Trong trường hợp bạn muốn lấy message cho một trường xác định thì bạn làm như sau:

```php
<input type="text" name="title" />
@if ($errors->has('title'))
   <label class="error">{{ $errors->first('title') }}</label>
@endif
```

### Magic scopes

Khi bạn xây dựng một thứ gì đó, bạn có thể sử dụng magic scopes đã có sẵn.

* Lấy kết quả theo `created_at` giảm dần

```php
User::latest()->get();
```

* Lấy kết quả theo một trường xác định giảm dần

```php
User::latest('last_login_at')->get();
```

* Lấy kết quả theo thứ tự ngẫu nhiên

``` php
User::inRandomOrder()->get();
```

* Chạy phương thức query theo điều kiện

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

Thay vì sử dụng `when()` bạn có thể sử dụng `unless`, `unless` ngược lại với `when`.


Nguồn: https://medium.com/@alexrenoki/pushing-laravel-further-best-tips-good-practices-for-laravel-5-7-ac97305b8cac