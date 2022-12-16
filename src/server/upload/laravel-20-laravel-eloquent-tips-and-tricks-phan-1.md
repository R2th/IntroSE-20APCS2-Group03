Trong quá trình tìm hiểu về Laravel mình có thu lượm được một số tip và trick. Mình xin được chia sẻ lại cho các bạn.

Eloquent ORM có vẻ là một cơ chế đơn giản, nhưng đi xâu vào chi tiết, có rất nhiều semi-hidden function và ít được biết đến. Trong bài viết này, tôi sẽ chỉ cho các bạn một vài thủ thuật.

<br>

### 1. Increments and Decrements
Thay vì điều này:
```
$article = Article::find($article_id);
$article->read_count++;
$article->save();
```
Bạn có thể làm như bên dưới:
```
$article = Article::find($article_id);
$article->increment('read_count');
```

Bạn cũng có thể truyền thêm các tham số:

```
Article::find($article_id)->increment('read_count');
Article::find($article_id)->increment('read_count', 10); // +10
Product::find($produce_id)->decrement('stock'); // -1
```

<br>

### 2. XorY methods
Eloquent có một vài function kết hợp hai phương thức, như “hãy làm X, nếu không thì Y”.

<br>

**Ví dụ 1** : ```findOrFail()```:

Thay vì:
```
$user = User::find($id);
if (!$user) { abort (404); }
```
Hãy làm như sau:
```
$user = User::findOrFail($id);
```
**Ví dụ 2**:  ```firstOrCreate()```:

Thay vì:
```
$user = User::where('email', $email)->first();
if (!$user) {
  User::create([
    'email' => $email
  ]);
}
```
Hãy làm như sau:
```
$user = User::firstOrCreate(['email' => $email]);
```

<br>

### 3. Model boot() method

<br>

Có một nơi huyền diệu được gọi là boot () trong một Eloquent model, nơi bạn có thể ghi đè lên hành vi mặc định:
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
Có lẽ một trong những ví dụ phổ biến nhất là thiết lập giá trị một số trường tại thời điểm tạo model object. Giả sử bạn muốn tạo trường ```UUID``` tại thời điểm đó.
```
public static function boot()
{
  parent::boot();
  self::creating(function ($model) {
    $model->uuid = (string)Uuid::generate();
  });
}
```

<br>

### 4. Relationship with conditions and ordering

<br>

Đây là một cách điển hình để xác định relationship:
```
public function users() {
    return $this->hasMany('App\User');    
}
```
Nhưng bạn có biến rằng ngay tại thời điểm này, chúng ta có thể thêm các điều kiện ```where``` và ```orderBy```. Ví dụ, nếu bạn muốn một relationship cụ thể cho một số loại ```users```,   cũng như ```orderBy``` theo ```email```, bạn có thể lam như sau:

```
public function approvedUsers() {
    return $this->hasMany('App\User')->where('approved', 1)->orderBy('email');
}
```

<br>

### 5. Model properties: timestamps, appends etc.

<br>
Có một vài "tham số" của một Eloquent model, dưới dạng các property của class đó. Phổ biến nhất có lẽ là:

```
class User extends Model {
    protected $table = 'users';
    protected $fillable = ['email', 'password']; // which fields can be filled with User::create()
    protected $dates = ['created_at', 'deleted_at']; // which fields will be Carbon-ized
    protected $appends = ['field1', 'field2']; // additional values returned in JSON
}
```
Nhưng xin chờ chút, hãy xem những thứ ở dưới:
```
protected $primaryKey = 'uuid'; // it doesn't have to be "id"
public $incrementing = false; // and it doesn't even have to be auto-incrementing!
protected $perPage = 25; // Yes, you can override pagination count PER MODEL (default 15)
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at'; // Yes, even those names can be overridden
public $timestamps = false; // or even not used at all
```
Và còn nhiều hơn nữa, tôi đã liệt kê những điều thú vị nhất, để biết thêm, hãy kiểm tra code của [abstract Model class](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Database/Eloquent/Model.php) mặc định và kiểm tra tất cả các trait được sử dụng.
And there’s even more, I’ve listed the most interesting ones, for more please check out the code of default abstract Model class and check out all the traits used.

<br>

### 6. Find multiple entries

<br>

Mọi người đều biết ```find()``` method, đúng ko?
```
$user = User::find(1);
```
Tôi khá ngạc nhiên khi ít người biết rằng nó có thể chấp nhận nhiều ID như một mảng:
```
$users = User::find([1,2,3]);
```

<br>

### 7. WhereX

<br>

Có một cách đơn giản để làm điều này:
```
$users = User::where('approved', 1)->get();
```
Như sau:
```
$users = User::whereApproved(1)->get(); 
```
Vâng, bạn có thể thay đổi tên của bất kỳ field nào và thêm nó vào như một hậu tố của function ```where``` và nó sẽ hoạt động:
Ngoài ra, có một số pre-defined method  trong Eloquent, liên quan ```date/time```:
```
User::whereDate('created_at', date('Y-m-d'));
User::whereDay('created_at', date('d'));
User::whereMonth('created_at', date('m'));
User::whereYear('created_at', date('Y'));
```

<br>

### 8. Order by relationship

<br>
Một "mẹo nhỏ" phức tạp hơn một chút. Điều gì sẽ xảy ra nếu bạn có chủ đề trên diễn đàn nhưng muốn ```order``` chúng theo bài đăng mới nhất? Yêu cầu khá phổ biến trong các diễn đàn với các chủ đề cập nhật mới nhất ở trên top, phải không?

Đầu tiên, mô tả relationship riêng biệt cho bài đăng mới nhất về chủ đề:

```
public function latestPost()
{
    return $this->hasOne(\App\Post::class)->latest();
}
```
Và sau đó, trong controller của chúng ta, ta có thể làm điều "magic" này:
```
$users = Topic::with('latestPost')->get()->sortByDesc('latestPost.created_at');
```

<br>

### 9. Eloquent::when() – no more if-else’s

<br>

Nhiều người trong chúng ta viết các truy vấn có điều kiện với "if-else"  như thế này:

```
if (request('filter_by') == 'likes') {
    $query->where('likes', '>', request('likes_amount', 0));
}
if (request('filter_by') == 'date') {
    $query->orderBy('created_at', request('ordering_rule', 'desc'));
}
```

Nhưng có một cách tốt hơn bằng cách sử dụng ```when()``` function:
```
$query = Author::query();
$query->when(request('filter_by') == 'likes', function ($q) {
    return $q->where('likes', '>', request('likes_amount', 0));
});
$query->when(request('filter_by') == 'date', function ($q) {
    return $q->orderBy('created_at', request('ordering_rule', 'desc'));
});
```
Nó có thể không ngắn hơn, nhưng mạnh nhất là truyền các parameter:

```
$query = User::query();
$query->when(request('role', false), function ($q, $role) { 
    return $q->where('role_id', $role);
});
$authors = $query->get();
```

<br>

### 10. BelongsTo Default Models

<br>

Giả sử bạn có Post ```belongTo``` Author và sau đó là Blade code:
```
{{ $post->author->name }}
```
Nhưng nếu ```author``` bị xóa hoặc không được set vì một lý do nào đó thì sao? Bạn sẽ nhận được một lỗi, đại loại là "property of non-object".

Dĩ nhiên, bạn có thể phòng ngừa nó như sau: 
```
{{ $post->author->name ?? '' }}
```
Nhưng bạn có thể làm điều đó trên Eloquent relationship:

```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault();
}
```
Trong ví dụ này, author() relation sẽ trả về một empty ```App\Author``` model nếu không có ```author``` nào được đính kèm vào ```post```.
Hơn nữa, chúng ta có thể gán giá trị default property cho default modedl đó.

```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Guest Author'
    ]);
}
```

<br>

Nguồn: https://laravel-news.com/eloquent-tips-tricks