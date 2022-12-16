Hế lô các bạn ^^

Hôm nay mình sẽ chỉ cho bạn vài thủ thuật có thể nó sẽ giúp ích cho bạn khi viết code sử dụng Frameword Laravel nhé.
### 1. Dùng scopes khi bạn cần truy vấn nhiều thứ
Chúng ta có thể sử dụng Query Builder để viêt truy vấn trong laravel. Nó trông như thế này:
```
$orders = Order::where('status', 'delivered')->where('paid', true)->get();
```
Trông khá là đơn giản, nhưng đoạn code này có thể được viết tốt hơn nếu chúng ta sử dụng phạm vi cục bộ (local scopes) đấy.

Local scopes cho phép chúng ta tạo ra các hàm Query Builder mà chúng ta có thể xâu chuỗi khi chúng ta truy xuất dữ liệu. 

Ví dụ, thay vì câu lệnh ->where(), chúng ta có thể sử dụng ->delivery() và ->pay() một cách rõ ràng hơn.

Đầu tiên, chúng ta sẽ thêm vài hàm trong Order model của chúng ta:
```
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
Khi khai báo local scopes, chúng ta đặt tên  *scope[Something]* để Larave biết rằng đây là scope và sẽ sử dụng nó trong Query Builder.

$query mà chúng ta truyền vào trong hàm scope được laravel tự động injected và là query builder instance.
```
$orders = Order::delivered()->paid()->get();
```
Để truy xuất động, bạn có thể sử dụng dynamic local scopes. Mỗi scope cho bạn truyền vào các tham số.
```
class Order extends Model
{
   ...
   public function scopeStatus($query, string $status) {
      return $query->where('status', $status);
   }
}
$orders = Order::status('delivered')->paid()->get();
```
Theo mặc định, Laravel sử dụng *where[Something]* để thay thế scope trước đó. Vì vậy, bạn có thể viết:
```
Order::whereStatus('delivered')->paid()->get();
```
Laravel sẽ tìm kiếm phiên bản snake_case của Something từ where[Something]. Nếu bạn có status trong DB của mình, bạn sẽ sử dụng ví dụ trước. Nếu bạn có shipping_status, bạn có thể sử dụng như sau:
```
Order::whereShippingStatus('delivered')->paid()->get();
```
Đây cũng là lý do tại sao chúng ta nên sử dụng snake_case cho các trường trong Database đó ạ :D
### 2. Sử dụng file Requests
Có bạn nào còn validate trong controller của mình nữa không ạ ^^. Kiểu như này
```
public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => ['required', 'unique:posts', 'max:255'],
        'body' => 'required',
    ]);
    // The blog post is valid...
}
```
Nếu đang có sử dụng trong controller thì chúng ta có thể tách ra để controller của mình rõ ràng, bớt phức tạp hơn nha. Vì laravel đã cung cấp cho chúng ta 1 cách *so cute* để xác thực bằng cách tạo ra request classes và sử dụng chúng.
```
php artisan make:request StoreBlogPost
```
Bên trong folder *app/Http/Requests/* bạn sẽ tìm thấy file của mình.
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
           'title' => ['required', 'unique:posts', 'max:255'],
           'body' => 'required',
       ];
   }
}
```
Và chúng ta có thể dùng class vừa tạo ra ở trên trong controller như thế này:
```
use App\Http\Requests\StoreBlogPostRequest;
public function store(StoreBlogPostRequest $request)
{
    // The blog post is valid...
}
```
Hàm authorize() phải là một boolean. Nếu sai, nó sẽ throw ra 403. Vì vậy hãy đảm bảo chúng ta bắt được nớ trong hàm *render()* ở *app/Exceptions/Handler.php*
```
public function render($request, Exception $exception)
{
   if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
      //
   }
return parent::render($request, $exception);
}
```
Trong request class, chúng ta có thể sử dụng hàm *messages()*, là một mảng chứa các thông báo sẽ được trả về trong trường hợp xác thực không thành công:
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
           'title' => ['required', 'unique:posts', 'max:255'],
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
Để bắt chúng, bạn có thể dùng errors variable trong blade files của bạn:
```
@if ($errors->any())
   @foreach ($errors->all() as $error)
      {{ $error }}
   @endforeach
@endif
```
Trong trường hợp bạn muốn nhận một thông báo xác thực trường cụ thể, bạn có thể thực hiện như sau:
```
<input type="text" name="title" />
@if ($errors->has('title'))
   <label class="error">{{ $errors->first('title') }}</label>
@endif
```
### 3. Magic scopes
Khi xây dựng mọi thứ, bạn có thể sử dụng magic scope đã được nhúng sẵn:
* Lấy kết quả created_at, giảm dần:
```
User::latest()->get();
```
* Lấy kết quả theo bất kỳ trường nào, giảm dần:

```
User::latest('last_login_at')->get();
```
* Lấy kết quả ngẫu nhiên:

```
User::inRandomOrder()->get();
```
* Chỉ chạy mộtquery method nếu điều gì đó đúng:

```
// Let's suppose the user is on news page, and wants to sort it by newest first
// mydomain.com/news?sort=new
User::when($request->query('sort'), function ($query, $sort) {
   if ($sort == 'new') {
      return $query->latest();
   }
   
   return $query;
})->get();``
```
Thay vì when(), bạn có thể sử dụng unless. Nó ngược lại với when().
### 4. Bám sát database standards & Accessors
Laravel dạy bạn ngay từ đầu rằng các biến và phương thức của bạn phải là $camelCase camelCase() trong khi các trường cơ sở dữ liệu của bạn phải là solid_case. Tại sao? Bởi vì điều này giúp chúng ta xây dựng accessors tốt hơn.

Accessors là các trường tùy chỉnh mà chúng ta có thể xây dựng ngay từ model của mình. Nếu cơ sở dữ liệu của chúng ta chứa first_name, last_name và age, chúng ta có thể thêm một trường tùy chỉnh có tên là name ghép nối first_name và last_name.

Đừng lo lắng, điều này sẽ không được viết trong DB bằng bất kỳ phương tiện nào. Nó chỉ là một thuộc tính tùy chỉnh mà model cụ thể này có. Tất cả các accessors, giống như scopes, đều có cú pháp đặt tên tùy chỉnh: getSomethingAttribute:
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
Khi sử dụng $user->name, nó sẽ trả về tên đầy đủ.
Theo mặc định, thuộc tính name không được hiển thị nếu chúng ta dd($user), nhưng chúng ta có thể làm cho điều này khả dụng bằng cách sử dụng biến $appends:
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

Trên đây là một số tip khi các bạn dùng laravel. Các bạn có thể tham khảo link bài viết gốc đây ạ: 
https://faun.pub/pushing-laravel-further-best-tips-good-practices-for-laravel-5-7-ac97305b8cac