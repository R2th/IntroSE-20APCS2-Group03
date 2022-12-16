Chào các bạn hôm nay mình lại ngoi lên đây. 

Hôm nay mình sẽ giới thiệu cho các bạn vài mẹo khi sử dụng ELoquent Laravel nhé :)) 

# Hàm X hoặc Y 
Eloquent có 1 vài hàm kết hợp 2 hàm khác lại với nhạu. Ví dụ như "Vui lòng thực hiện X còn không thì thực hiện Y".
Điều này làm cho code của chúng ta clear hơn rất nhiều 

Vì dụ như:

+ **findOrFail();**
Thay vì viết như thế này:
```php
$user = User::find($id);
if ($user) abort(404);
```
Mình thử viết lại như thế này nhé: 
```php
$user = User::findOrFail($id);
```
+ **firstOrCreate()**
Thay vì viết như thế này: 
```php
$user = User::where('email', $email)->first();
if ($user) {
    User::create([
    'email' => email
    ])
}
```
Mình thử viết lại như thế này nhé: 
```php
  $user = User::firstOrWhere(['email' => $email]);
```
# Relationship with conditions and ordering

Chúng ta thường viết quan hệ như thế này phải không:
```php
public function users() {
 return $this->hasMany('App\User');
}
```
Nhuwng chúng ta có thể thêm where hoặc orderBy vào trong mỗi quan hệ này.

Ví dụ bạn muốn có mỗi quan hệ cụ thể cho 1 số loại người dùng và cũng được sắp xếp theo email bạn có thể viết lại như sau.
```php
public function approvedUsers() {
 return $this->hasMany('App\User')->where('status', 1)->orderBy('create_at');
}
```
# Model properties: timestamps, appends...
Có một vài "tham số (parameters)" của một mô hình Eloquent, dưới dạng các thuộc tính của lớp đó. Các kiểu phổ biến nhất có lẽ là:
```php
class User extends Model {
    protected $table = 'users';
    protected $fillable = ['email', 'password']; // trường nào có thể fill với User::create()
    protected $dates = ['created_at', 'deleted_at']; // trường nào sẽ là Carbon-ized
    protected $appends = ['field1', 'field2']; // giá trị bổ sung được trả về trong JSON
}
```
Chờ chút, có nhiều hơn bạn nghĩ:
```php
protected $primaryKey = 'uuid'; // xác định khóa chính cho bảng, mặc định là id
public $incrementing = false; // bỏ tính năng increment
protected $perPage = 25; // mặc định phân trang là 15, bạn có thể tăng giảm tùy ý
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at'; // mặc định created_at, updated_at có thể thay bằng ngay_tao, ngay_cap_nhat
public $timestamps = false; // không sử dụng timestamp
```
# Find multiple entries
Mọi người điều biết method find() đúng không:
```php
$user = User::find(1);
```
Mình khá ngạc nhiên khi ít người biết rằng nó có thể chấp nhận nhiều ID như một mảng:
```php
$users = User::find([1,2,3]);
```
# WhereX
Chúng ta hay viết như thế này đúng không:
```php
$users = User::where('approved', 1)->get();
```
Thay vì thế ta có thể viết là:
```php
$users = User::whereApproved(1)->get(); 
```
Vâng, bạn có thể thay đổi tên của bất kỳ trường nào và thêm nó vào như một hậu tố "where" . Ví dụ: status -> whereStatus, user_id -> whereUserId


Ngoài ra, có một số phương pháp được xác định trước trong Eloquent, liên quan đến ngày / giờ:
```php
User::whereDate('created_at', date('Y-m-d'));
User::whereDay('created_at', date('d'));
User::whereMonth('created_at', date('m'));
User::whereYear('created_at', date('Y'));
```
# BelongsTo Default Models
Giả sử bạn có Post belong to Author và trong code trong file Blade như sau:
```php
{{ $post->author->name }}
```
Nhưng nếu tác giả bị xóa hoặc không được đặt vì lý do nào đó thì sao? Bạn sẽ nhận được một lỗi, một cái gì đó giống như “property of non-object”.

Tất nhiên, bạn có thể ngăn chặn nó như thế này:
```php
{{ $post->author->name ?? '' }}
```
Nhưng bạn có thể làm điều đó trên Eloquent relationship level:
```php
public function author()
{
    return $this->belongsTo('App\Author')->withDefault();
}
```
Trong ví dụ, author() relation sẽ trả về đối tượng App\Author rỗng, nếu không có tác giả nào được đính kèm vào bài viết.

Hơn nữa, chúng ta có thể gán giá trị thuộc tính mặc định cho mô hình mặc định đó.
```php
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Guest Author' // tên tác giả mặc định
    ]);
}
```
# Raw query methods
Đôi khi, chúng ta cần thêm các truy vấn thô vào các câu lệnh Eloquent. May mắn thay, có chức năng cho điều đó.
```php
// whereRaw
$orders = DB::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();

// havingRaw
Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();

// orderByRaw
User::where('created_at', '>', '2016-01-01')
  ->orderByRaw('(updated_at - created_at) desc')
  ->get();
```
# Replicate: make a copy of a row
Ngắn gọn, không cần giải thích nhiều, đây là cách tốt nhất để tạo bản sao 1 hàng trong cơ sở dữ liệu:
```php
$task = Tasks::find(1);
$newTask = $task->replicate();
$newTask->save();
```
# Chunk() method for big tables
 Chính xác thì không liên quan đến Eloquent , thiên về Collection hơn, nhưng vẫn mạnh mẽ - để xử lý các tập dữ liệu lớn, bạn có thể chia nhỏ (chunk) chúng thành nhiều phần.
 Thay vì viết như thế này:
```php
$users = User::all();
foreach ($users as $user) {
    // ...
}
```
Bạn có thể làm thế này:
```php
// lấy 100 dòng ra xử lý, xong rồi lấy tiếp ...
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```
# Create additional things when creating a model
Tất cả chúng ta đều biết lệnh Artisan này:
```php
php artisan make:model Company
```
Nhưng bạn có biết có ba flag (-- hoặc -) hữu ích để tạo các file có liên quan đến model không?

```php
php artisan make:model Company -mcr
```
+ -m tạo cho file migration
+ -c tạo luôn controller
+ -r controller được tạo ở trên là resource controller
# Override updated_at when saving
Bạn có biết rằng -> phương thức save() có thể chấp nhận các tham số không? Kết quả là, chúng ta có thể yêu cầu nó “bỏ qua (ignore)” chức năng mặc định updated_at để điền vào mong muốn. Xem này:
```php
// mặc định laravel sẽ dùng updated_at là thời gian hiện tại 2018-06-13 10:00:00
$product = Product::find($id);
$product->updated_at = '2019-01-01 10:00:00';
$product->save(['timestamps' => false]);
```
Ở đây, mình sẽ ghi đè update_at mặc định bằng ngày tháng được xác định trước của mình.
#  Transform brackets into an Eloquent query
Điều gì sẽ xảy ra nếu bạn có and-or trộn lẫn trong truy vấn SQL của bạn, ví dụ như sau:
```php
... WHERE (gender = 'Male' and age >= 18) or (gender = 'Female' and age >= 65)
```
ử dụng các hàm đóng như các truy vấn con:
```php
$q->where(function ($query) {
    $query->where('gender', 'Male')
        ->where('age', '>=', 18);
})->orWhere(function($query) {
    $query->where('gender', 'Female')
        ->where('age', '>=', 65); 
})

```
# orWhere with multiple parameters
Cuối cùng, bạn có thể chuyển một mảng các tham số vào orWhere() mà không cần phải viết rời rạc.
Cách “thông thường”:
```php
$q->where('a', 1);
$q->orWhere('b', 2);
$q->orWhere('c', 3);
```
Bạn có thể làm như sau:
```php
$q->where('a', 1);
$q->orWhere(['b' => 2, 'c' => 3]);
```
# Kết thúc
Bài của mình tạm thời đến đây thôi. Nói vê Eloquent thì nó rất rộng và nhiều mọi người cùng nhau timf hiểu và chia sẻ cho mình biết với nhé> :))

Nguồn: https://laravel-news.com/eloquent-tips-tricks