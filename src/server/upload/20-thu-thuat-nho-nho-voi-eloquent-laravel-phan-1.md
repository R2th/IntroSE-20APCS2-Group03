Dạo này bí chủ đề, nên chắc chẳng đao to búa lớn gì, mình xin phép giới thiệu 20 mánh khóe nho nhỏ khi lập trình laravel mà mình từng đọc được liên quan tới Eloquent. Như mọi người cũng biết Eloquent ORM là một mô hình đơn giản, tuy nhiên ẩn sâu trong nó có khá nhiều các chức năng mà chúng ta không nắm rõ được, và vô hình chung đôi lúc chúng ta cứ diễn giải một công việc đơn giải thành ra lằng nhằng khi sử dụng nó do không nắm được bản chất.

## 1. Ví dụ về increments và decrements
 Chúng ta thường:
```
$article = Article::find($article_id);
$article->read_count++;
$article->save();
```
Thay vào đó chúng ta có thể:
```
$article = Article::find($article_id);
$article->increment('read_count');
```
Ngoài ra:
```
Article::find($article_id)->increment('read_count');
Article::find($article_id)->increment('read_count', 10); // +10
Product::find($produce_id)->decrement('stock'); // -1
```
## 2. Phương thức X or Y
Eloquent cung cấp một vài hàm kết hợp hai phương thức kiểu "***Thực hiện X không thì làm Y***"
**Ví dụ 1** - `findOrFail()`:
Chúng ta thường: 
```
$user = User::find($id);
if (!$user) { 
    abort (404); 
}
```
Hãy thử như này xem:
`$user = User::findOrFail($id);`
**Ví dụ 2** -` firstOrCreate()`:
Chúng ta thường:
```
$user = User::where('email', $email)->first();
if (!$user) {
  User::create([
    'email' => $email
  ]);
}
```
Thay vào đó:
`$user = User::firstOrCreate(['email' => $email]);`
## 3. Model boot()
Có một nơi mà một model Eloquent có thể override lại các phương thức mặc định đó là trong thân của hàm boot():
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
Có lẽ một trong những ví dụ phổ biến nhất là thiết lập một số giá trị tại thời điểm model vừa được khởi tạo. Giả sử bạn muốn tạo trường UUID tại thời diểm đó:
```
public static function boot()
{
  parent::boot();
  self::creating(function ($model) {
    $model->uuid = (string)Uuid::generate();
  });
}
```
## 4. Quan hệ với điều kiện và sắp xếp
Chúng ta vẫn hay định nghĩa:
```
public function users() {
    return $this->hasMany('App\User');    
}
```
Tuy nhiên bạn có biết rằng tại thời điểm này chúng ta đã có thể chèn thêm cái điều kiện `where` hoặc `orderBy`. Ví dụ như: nếu bạn muốn một quan hệ mà chỉ lấy ra một loại người dùng thỏa mãn một điều kiện nào đó và được sắp xếp theo email, bạn có thể làm như sau:
```
public function approvedUsers() {
    return $this->hasMany('App\User')->where('approved', 1)->orderBy('email');
}
```
## 5. Một số thuộc tính của model
Chúng ta cũng có một vài thuộc tính của mô hình Eloquent, dưới dạng các thuộc tính của lớp đó. Phổ biến nhất có thể kể đến:
```
class User extends Model {
    protected $table = 'users';
    protected $fillable = ['email', 'password']; // which fields can be filled with User::create()
    protected $dates = ['created_at', 'deleted_at']; // which fields will be Carbon-ized
    protected $appends = ['field1', 'field2']; // additional values returned in JSON
}
```
Nhưng chờ chút, còn nhiều hơn thế đấy:
```
protected $primaryKey = 'uuid'; // it doesn't have to be "id"
public $incrementing = false; // and it doesn't even have to be auto-incrementing!
protected $perPage = 25; // Yes, you can override pagination count PER MODEL (default 15)
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at'; // Yes, even those names can be overridden
public $timestamps = false; // or even not used at all
```
## 6. TÌm kiếm nhiều phần tử
Mọi người đều biết về hàm `find()`
`$user = User::find(1);`
Và ok, chắc bạn đã bỏ lỡ cái này:
`$users = User::find([1,2,3]);`
## 7. Where X
Chúng ta vẫn thường:
`$users = User::where('approved', 1)->get();`
Và điều kỳ diệu đây:
`$users = User::whereApproved(1)->get(); `
Bạn có thể thay đổi tên của bất kỳ trường nào và thay nó vào phần hậu tố của `where` để nó sử dụng magic method
```
User::whereDate('created_at', date('Y-m-d'));
User::whereDay('created_at', date('d'));
User::whereMonth('created_at', date('m'));
User::whereYear('created_at', date('Y'));
```
## 8. Quan hệ Order by 
Ok, thủ thuật này sẽ phức tạp hơn một xíu. Điều gì sẽ xảy ra nếu bạn muốn sắp xếp cho những bài viết trên diễn đàn của bạn luôn là mới nhất. Đầu tiên là mô tả một quan hệ cho **latest post** 
```
public function latestPost()
{
    return $this->hasOne(\App\Post::class)->latest();
}
```
Và sau đó, trong controller của chúng ta, chúng ta sẽ thấy sự kỳ diệu:
`$users = Topic::with('latestPost')->get()->sortByDesc('latestPost.created_at');`
## 9. Phương thức when() - không cần nhiều thêm if-else
Chúng ta vẫn thường lồng các truy vấn với `if-else` như sau:
```
if (request('filter_by') == 'likes') {
    $query->where('likes', '>', request('likes_amount', 0));
}
if (request('filter_by') == 'date') {
    $query->orderBy('created_at', request('ordering_rule', 'desc'));
}
```
Nhưng hơn hết, chúng ta hãy tận dụng when():
```
$query = Author::query();
$query->when(request('filter_by') == 'likes', function ($q) {
    return $q->where('likes', '>', request('likes_amount', 0));
});
$query->when(request('filter_by') == 'date', function ($q) {
    return $q->orderBy('created_at', request('ordering_rule', 'desc'));
});
```
Nhìn thì có vẻ rườm rà, xong khi bạn muốn truyền các tham số vào thì ích lợi của nó mới bộc lộ rõ rệt:
```
$query = User::query();
$query->when(request('role', false), function ($q, $role) { 
    return $q->where('role_id', $role);
});
$authors = $query->get();
```
## 10. BelongsTo Default Models
Giả sử trong blade chúng ta có đoạn mã như sau:
`{{ $post->author->name }}`
Tuy nhiên nếu tác giả bị xóa thì giải quyết sao nhỉ. Chắc chắn là có lỗi trong trường hợp này rồi.Tất nhiên bạn cần làm như sau:
`{{ $post->author->name ?? '' }}`
Xong, chúng ta cũng có thể thực hiện chúng trong casc hafm quan hệ như sau:
```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault();
}
```
Trong ví dụ này, quan hệ `author()` sẽ trả về một model Author rỗng nếu không có tác giả nào của bài viết đó. Hơn thế chúng ta còn có thể gán giá trị mặc định cho các model đó:
```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Guest Author'
    ]);
}
```