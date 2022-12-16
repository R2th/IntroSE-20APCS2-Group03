Eloquent ORM trong Laravel thoạt nhìn có vẻ như đơn giản nhưng ẩn sâu dưới lớp vỏ bọc đó là nhiều chức năng bí ẩn nhưng lại ít được biết đến. Trong bài viết này mình sẽ giới thiệu đến các bạn 20 trong số những chức năng thú vị nhưng mạnh mẽ đó.
## 1. Increments and Decrements
Khi chúng ta cần increments một trường của một record, có thể bạn sẽ sử dụng một đoạn code như thế này:
```php
$article = Article::find($article_id);
$article->read_count++;
$article->save();
```
Bạn có thể thay nó bằng đoạn code sau:
```php
$article = Article::find($article_id);
$article->increment('read_count');
```
Ngoài ra, mọi thứ cũng sẽ hoạt động tốt nếu như bạn sử dụng:
```php
Article::find($article_id)->increment('read_count');
Article::find($article_id)->increment('read_count', 10); // +10
Product::find($produce_id)->decrement('stock'); // -1
```
## 2. XorY methods
Eloquent có khá nhiều chức năng kết hợp hai phương thức. Có thể hiểu đơn giản nó như là: *"hãy làm cho tôi việc **X** nhé, nếu không được thì làm **Y** giúp tôi"*.
###
##### Ví dụ 1- `findOrFail()`:
Thay vì sử dụng:
```php
$user = User::find($id);
if (!$user) { abort (404); }
```
Hãy làm đơn giản hơn:
```php
$user = User::findOrFail($id);
```
Chắc hẳn phương thức trên cũng đã quá quen thuộc với chúng ta rồi.
###

##### Ví dụ 2 - `firstOrCreate()`:
Khi bạn cần tìm một record có thuộc tính thỏa mãn một điều kiện, nếu không tìm thấy thì sẽ tạo mới một record với chính thuộc tính đó:
```php
$user = User::where('email', $email)->first();
if (!$user) {
  User::create([
    'email' => $email
  ]);
}
```
Mọi thứ chạy tốt và cũng dễ hiểu nhưng chúng ta có thể làm ngắn hơn:
```php
$user = User::firstOrCreate(['email' => $email]);
```
## 3. Model `boot()` method:
Trong mô hình Eloquent, khi bạn muốn override những phương thức mặc định của một model, hãy làm nó ở trong `boot()`:

```php
class User extends Model
{
    public static function boot()
    {
        parent::boot();
        static::updating(function($model)
        {
            // override some logging
        });
    }
}
```
Có lẽ một trong những ví dụ phổ biến nhất là khi bạn muốn đặt giá trị cho một trường nào đó tại thời điểm tạo mới một model object:
```php
public static function boot()
{
  parent::boot();
  self::creating(function ($model) {
    $model->uuid = (string)Uuid::generate();
  });
}
```
## 4. Relationship with conditions and ordering
Đây là cách mà chúng ta thường dùng để định nghĩa một quan hệ:
```php
public function users() {
    return $this->hasMany('App\User');    
}
```
Nhưng bạn có biết chúng ta cũng có thể tạo ra một quan hệ khác bằng việc kết hợp thêm điều kiện vào quan hệ ban đầu hay không?

Cụ thể, nếu như bạn muốn có một quan hệ chỉ bao gồm các users có trạng thái `approved`  và được `order` theo email thì bạn có thể làm như sau:
```php
public function approvedUsers() {
    return $this->hasMany('App\User')->where('approved', 1)->orderBy('email');
}
```
## 5. Model properties: timestamps, appends etc.
Có một vài tham số của một Eloquent model, chúng được thể hiện dưới dạng các thuộc tính trong class. Các tham số phổ biến nhất có lẽ là:
```php
class User extends Model {
    protected $table = 'users';
    protected $fillable = ['email', 'password']; // which fields can be filled with User::create()
    protected $dates = ['created_at', 'deleted_at']; // which fields will be Carbon-ized
    protected $appends = ['field1', 'field2']; // additional values returned in JSON
}
```
Nhưng cũng còn nhiều thứ khác nữa:
```php
protected $primaryKey = 'uuid'; // it doesn't have to be "id"
public $incrementing = false; // and it doesn't even have to be auto-incrementing!
protected $perPage = 25; // Yes, you can override pagination count PER MODEL (default 15)
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at'; // Yes, even those names can be overridden
public $timestamps = false; // or even not used at all
```
Đó là những thuộc tính theo tôi là thú vị nhất. Để tìm hiểu thêm các bạn có thể kiểm tra code của các [abstract Model class](https://github.com/laravel/framework/blob/5.6/src/Illuminate/Database/Eloquent/Model.php) và xem chúng đã sử dụng những gì.
## 6. Find multiple entries
Chắc hẳn ai cũng đã từng sử dụng method `find()` rồi phải không?
```php
$user = User::find(1);
```
Nhưng tôi không chắc là có nhiều người biết nó cũng có thể nhận vào nhiều ID như là một mảng:
```php
$users = User::find([1,2,3]);
```
## 7. WhereX
Chắc hẳn chúng ta đã thường xuyên làm điều tương tự như thế này:
```php
$users = User::where('approved', 1)->get();
```
Và đây là những gì bạn cũng có thể làm:
```php
$users = User::whereApproved(1)->get(); 
```
Đúng vậy, bạn có thể kết hợp bất kỳ tên trường nào với tiền tố `where` và chúng sẽ làm việc như những gì bạn mong muốn.

Bạn cũng có thể sử dụng những method đã được định nghĩa từ trước liên quan đến **date/time**:
```php
User::whereDate('created_at', date('Y-m-d'));
User::whereDay('created_at', date('d'));
User::whereMonth('created_at', date('m'));
User::whereYear('created_at', date('Y'));
```
## 8. Order by relationship
Một thủ thuật phức tạp hơn. Bạn sẽ làm gì nếu như bạn có một diễn đàn với nhiều topics nhưng bạn lại muốn order chúng dựa vào bài viết mới nhất. Đó cũng là một yêu cầu khá phổ biến trong các diễn đàn khi các topics có những bài viết được cập nhật mới nhất sẽ được đưa lên đầu.

Đầu tiên chúng ta hãy tạo ra một quan hệ giữa **post** mới nhất và **topic**:
```php
public function latestPost()
{
    return $this->hasOne(\App\Post::class)->latest();
}
```

Tiếp theo, ở trong `controller` chúng ta thực hiện một phép thuật:
```php
$topics = Topic::with('latestPost')->get()->sortByDesc('latestPost.created_at');
```
## 9. Eloquent::when() – no more if-else’s
Nhiều người trong chúng ta đã từng viết các câu queries phụ thuộc vào điều kiện được đưa vào. Nó có thể trông giống thế này:
```php
if (request('filter_by') == 'likes') {
    $query->where('likes', '>', request('likes_amount', 0));
}
if (request('filter_by') == 'date') {
    $query->orderBy('created_at', request('ordering_rule', 'desc'));
}
```
Nhưng có một cách tốt hơn đó là sử dụng `when():`
```php
$query = Author::query();
$query->when(request('filter_by') == 'likes', function ($q) {
    return $q->where('likes', '>', request('likes_amount', 0));
});
$query->when(request('filter_by') == 'date', function ($q) {
    return $q->orderBy('created_at', request('ordering_rule', 'desc'));
});
```
Nó có thể không ngắn hơn nhưng sẽ rất hiệu quả nếu như chúng ta đưa vào các tham số:
```php
$query = User::query();
$query->when(request('role', false), function ($q, $role) { 
    return $q->where('role_id', $role);
});
$authors = $query->get();
```
## 10. BelongsTo Default Models
Hãy tưởng tượng bạn có các bài viết thuộc về một tác giả nào đó, ở ngoài view chúng ta có đoạn code sau:
```php
{{ $post->author->name }}
```
Nhưng sẽ thế nào nếu như `author` của `post` đó bị xóa hay không được set vì một lý do nào đó. Bạn sẽ gặp những thông báo lỗi tương tự như "*property of non-object*".
Tất nhiên là chúng ta có thể ngăn chặn bằng cách sử dụng:
```php
{{ $post->author->name ?? '' }}
```
Nhưng bạn cũng có thể làm điều đó ở tầng Eloquent:
```php
public function author()
{
    return $this->belongsTo('App\Author')->withDefault();
}
```
Quan hệ `author()` lúc này sẽ trả về một empty object của `App\Author` trong trường hợp `author` của `post` không tồn tại. Hoặc chúng ta cũng có thể gán những giá trị mặc định cho empty object đó:

```php
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Guest Author'
    ]);
}
```
### Summary
Vừa rồi là 10 thủ thuật trong Eloquent mình giới thiệu với các bạn trong phần này.
Ở phần sau sẽ là những thủ thuật phức tạp và thú vị hơn thế nữa.

**Nguồn bài viết:** [20 Laravel Eloquent Tips and Tricks](https://laravel-news.com/eloquent-tips-tricks)

Blog: https://www.dnlblog.com/posts/20-thu-thuat-laravel-eloquent-orm