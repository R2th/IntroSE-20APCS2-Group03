*Bài dịch từ trang [laravel-news.com](https://laravel-news.com/eloquent-tips-tricks)*

Có vẻ như Eloquent ORM trong Laravel có cơ chế hoạt động đơn giản, nhưng bên cạnh đó có những tính năng không phải ai cũng biết. Trong bài viết này, tôi sẽ chỉ cho bạn một vài thủ thuật hay ho.

# Increments và Decrements
Đừng làm thế này:

```
$article = Article::find($article_id);
$article->read_count++;
$article->save();
```

Bạn có thể làm như thế này:

```
$article = Article::find($article_id);
$article->increment('read_count');
```

Hoặc thế này:

```
Article::find($article_id)->increment('read_count');
Article::find($article_id)->increment('read_count', 10); // +10
Product::find($produce_id)->decrement('stock'); // -1
```

# XorY methods
Eloquent có khá nhiều hàm kết hợp cả hai method  như là "làm X đi, không thì làm Y". 
Example 1 – findOrFail():

Thay vì viết kiểu này:

```
$user = User::find($id);
if (!$user) { abort (404); }
```

Hãy viết thế này:

```
$user = User::findOrFail($id);
```

Example 2 – firstOrCreate():
Viết kiểu này rất dài:

```
$user = User::where('email', $email)->first();
if (!$user) {
  User::create([
    'email' => $email
  ]);
}
```

Viết ngắn lại:

```
$user = User::firstOrCreate(['email' => $email]);
```

# Model boot() method
Trong Eloquent có một thứ rất kì diệu được gọi là boot(), bạn có thể ghi đè các hành động mặc định. 

```
class User extends Model
{
    public static function boot()
    {
        parent::boot();
        static::updating(function($model)
        {
            // do some logging
            // override some property like $model->something = transform($something);
        });
    }
}
```

Có lẽ một trong những ví dụ phổ biến nhất là tạo một số trường với giá trị mới tại thời điểm tạo model object.

```
public static function boot()
{
  parent::boot();
  self::creating(function ($model) {
    $model->uuid = (string)Uuid::generate();
  });
}
```

# Relationship with conditions and ordering
Đây là một cách điển hình để xác định mối quan hệ:

```
public function users() {
    return $this->hasMany('App\User');    
}
```

Nhưng bạn có biết rằng chúng ta đã có thể thêm where hoặc orderBy:

```
public function approvedUsers() {
    return $this->hasMany('App\User')->where('approved', 1)->orderBy('email');
}
```

# Model properties: timestamps, appends etc
Có một vài tham số của một Eloquent model, dưới dạng các thuộc tính của class đó. 

```
class User extends Model {
    protected $table = 'users';
    protected $fillable = ['email', 'password']; // which fields can be filled with User::create()
    protected $dates = ['created_at', 'deleted_at']; // which fields will be Carbon-ized
    protected $appends = ['field1', 'field2']; // additional values returned in JSON
}
```

Nhưng còn nữa cơ

```
protected $primaryKey = 'uuid'; // it doesn't have to be "id"
public $incrementing = false; // and it doesn't even have to be auto-incrementing!
protected $perPage = 25; // Yes, you can override pagination count PER MODEL (default 15)
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at'; // Yes, even those names can be overridden
public $timestamps = false; // or even not used at all
```

# Find multiple entries
Ai cũng biết cách dùng method find() rồi:
```
$user = User::find(1);
```

Nhưng chúng ta có thể tìm theo một mảng các giá trị nữa cơ:

```
$users = User::find([1,2,3]);
```

# WhereX
Chúng ta hay truy vấn kiểu này:

```
$users = User::where('approved', 1)->get();
```

Thử kiểu này đi:

```
$users = User::whereApproved(1)->get(); 
```

Đừng ngạc nhiên, bạn có thể thêm tên của bất kì trường nào vào sau từ where và truy vấn như bình thường. ^^

À, còn vài cái nữa, liên quan đến date/time:

```
User::whereDate('created_at', date('Y-m-d'));
User::whereDay('created_at', date('d'));
User::whereMonth('created_at', date('m'));
User::whereYear('created_at', date('Y'));
```

# Order by relationship
Một "mẹo nhỏ" phức tạp hơn một chút. Điều gì sẽ xảy ra nếu bạn có chủ đề trên diễn đàn nhưng muốn order chúng theo bài đăng mới nhất? Yêu cầu khá phổ biến trong các diễn đàn với các chủ đề cập nhật mới nhất được ở trên cùng, phải không?
Đầu tiên, mô tả mối quan hệ riêng biệt cho bài đăng mới nhất.
```
public function latestPost()
{
    return $this->hasOne(\App\Post::class)->latest();
}
```

Và sau đó, trong controller chúng ta sẽ làm điều kì diệu này:

```
$users = Topic::with('latestPost')->get()->sortByDesc('latestPost.created_at');
```

# Eloquent::when() – no more if-else’s

Nhiều người viết các câu query với if-else kiều này:

```
if (request('filter_by') == 'likes') {
    $query->where('likes', '>', request('likes_amount', 0));
}
if (request('filter_by') == 'date') {
    $query->orderBy('created_at', request('ordering_rule', 'desc'));
}
```

Tuy nhiên viết kiểu này tốt hơn:

```
$query = Author::query();
$query->when(request('filter_by') == 'likes', function ($q) {
    return $q->where('likes', '>', request('likes_amount', 0));
});
$query->when(request('filter_by') == 'date', function ($q) {
    return $q->orderBy('created_at', request('ordering_rule', 'desc'));
});
```

Không ngắn hơn nhiều lắm, nhưng rõ ràng việc truyền tham số sẽ ổn hơn:

```
$query = User::query();
$query->when(request('role', false), function ($q, $role) { 
    return $q->where('role_id', $role);
});
$authors = $query->get();
```

# BelongsTo Default Models
Giả sử bạn có Post thuộc về Author và sau đó là Blade code:

```
{{ $post->author->name }}
```

Nhưng nếu author bị xóa hoặc không được set vì lý do nào đó thì sao? Bạn sẽ nhận được một lỗi property of non-object. 
Tất nhiên, bạn có thể ngăn chặn nó như thế này:
```
{{ $post->author->name ?? '' }}
```

Nhưng bạn có thể làm điều đó với Eloquent relationship:
```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault();
}
```

Trong ví dụ trên, author() sẽ trả về một App\Author model rỗng nếu không có giá trị nào thuộc về Post. Chúng ta còn có thể trả về một giá trị mặc định, kiểu như:

```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Guest Author'
    ]);
}
```

# Order by Mutator
Giả sử bạn có đoạn code này:

```
function getFullNameAttribute()
{
  return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
}
```

Giờ bạn muốn order by full_name phải không? Nhưng viết kiểu này không chạy.

```
$clients = Client::orderBy('full_name')->get(); // doesn't work
```

Cách giải quyết rất đơn giản, chúng ta chỉ cần order kết quả thôi.

```
$clients = Client::get()->sortBy('full_name'); // works!
```

Chú ý, chúng ta dùng sortBy, không phải là orderBy.

# Default ordering in global scope
Điều gì sẽ xảy ra nếu bạn muốn có User :: all () luôn được sắp xếp theo trường name? Bạn có thể sử dụng global scope, thứ mà chúng ta đã từng sử dụng ở trên.
```
protected static function boot()
{
    parent::boot();

    // Order by name ASC
    static::addGlobalScope('order', function (Builder $builder) {
        $builder->orderBy('name', 'asc');
    });
}
```

# Raw query methods
Đôi khi, chúng ta cần thêm các raw queries vào các Eloquent statements. May mắn thay, chúng ta có functions cho điều đó.
```
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
Chẳng cần phải giải thích nhiều, đây là cách ngắn nhất để copy một database entry:
```
$task = Tasks::find(1);
$newTask = $task->replicate();
$newTask->save();
```

# Chunk() method for big tables
Liên quan nhiều hơn đến Collection hơn là Eloquent, nhưng vẫn rất hữu dụng khi xử lý các tập dữ liệu lớn:

```
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```

Thay vì làm kiểu này:

```
$users = User::all();
foreach ($users as $user) {
    // ...
```

# Create additional things when creating a model
Chúng ta đều biết câu lệnh này:
```
php artisan make:model Company
```

Nhưng chúng ta có thêm các phần mở rộng nữa cơ:
```
php artisan make:model Company -mcr
```

*  -m sẽ tạo migration file
*  -c sẽ tạo controller
*  -r sẽ xác nhận controller là resourceful

# Override updated_at when saving
Bạn có biết rằng -> phương thức save () có thể chấp nhận các tham số không? Kết quả là, chúng ta có thể yêu cầu nó “bỏ qua” chức năng mặc định updated_at để điền vào một giá trị nhất định.

```
$product = Product::find($id);
$product->updated_at = '2019-01-01 10:00:00';
$product->save(['timestamps' => false]);
```

# What is the result of an update()?
Đã bao giờ bạn tự hỏi đoạn code này thực sự trả về cái gì?

```
$result = $products->whereNull('category_id')->update(['category_id' => 2]);
```

Ý tôi là, cập nhật trong cơ sở dữ liệu thì nhất định rồi. Vấn đề là $result sẽ chứa cái gì?
Câu trả lời đó là: affected rows, đó chính là giá trị mà update() method sẽ trả về.

# Transform brackets into an Eloquent query
Giả sử bạn có một truy vấn như thế này:
```
... WHERE (gender = 'Male' and age >= 18) or (gender = 'Female' and age >= 65)
```

Làm thế nào để chuyển chúng thành Eloquent?

```
$q->where('gender', 'Male');
$q->orWhere('age', '>=', 18);
$q->where('gender', 'Female');
$q->orWhere('age', '>=', 65);
```

Sai rồi, phải sử dụng closure functions như một sub-queries:

```
$q->where(function ($query) {
    $query->where('gender', 'Male')
        ->where('age', '>=', 18);
})->orWhere(function($query) {
    $query->where('gender', 'Female')
        ->where('age', '>=', 65); 
})
```

# orWhere with multiple parameters
Bạn hoàn toàn có thể truyền một array vào orWhere():

```
$q->where('a', 1);
$q->orWhere(['b' => 2, 'c' => 3]);
```