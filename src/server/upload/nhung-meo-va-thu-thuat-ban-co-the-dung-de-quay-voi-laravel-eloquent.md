## Giới thiệu
Xin chào các bạn, nếu như ai đã từng làm việc với Laravel Framework rồi thì chắc bạn cũng ko lạ lẫm gì với Eloquent ORM. Đây là một loại ORM mặc định của Laravel, nó nhìn chung có vẻ không khó lắm. Tuy bên ngoài vẻ đẹp hoang sơ vậy thôi nhưng bên trong nó ẩn chứa nhiều cảnh vật nên thơ hữu tình đấy các bạn ạ. Vì vậy, hôm nay mình xin giới thiệu những tips và tricks bạn có thể làm với Eloquent để giúp cho bạn làm việc dễ dàng hơn với nó. Cùng bắt đầu nhé!
## Những mẹo bạn có thể dùng để quẩy với Eloquent Model

### Tăng và giảm 

Có bao giờ bạn phải tăng và giảm 1 số trong database chưa. Kiểu như là tăng view bài viết khi có người đọc chẳng hạn.

Thay vì làm như thế này:
```php
$article = Article::find($article_id);
$article->views++;
$article->save();
```
    
Bạn có thể làm như sau:
```php
$article = Article::find($article_id);
$article->increment('views');
```
    
Hoặc là bạn cũng có thể tăng/giảm nhiều đơn vị như sau:
```php
Article::find($article_id)->increment('views', 10); // +10
Article::find($article_id)->decrement('views'); // -1
```

### WhereX ( Magic =)) )
Ví dụ bạn muốn tìm 1 User với email = 'tiendeptrai@framgia.com' chẳng hạn. Bạn sẽ làm thế nào, chắc chắn là thế này rồi:
```php
$user = User::where('email', 'tiendeptrai@framgia.com')->first();
```

Tuy nhiên bằng 1 phép thuật nào đó:
```php
$user = User::whereEmail('fsddf@gmail.com')->first();
```

![](https://media.giphy.com/media/3o84U6421OOWegpQhq/giphy.gif)

Điều đó có nghĩa là bạn có thể thay Email bằng bất cứ trường nào bạn muốn tìm, và nó tất nhiên là được: 
```php
User::whereName('Tien Dep Trai')->first();
User::whereTime('20p')->first();
```

### Vài hàm chơi nước đôi:

Bạn cần dùng hàm `find()` để tìm 1 bài viết và nếu nó không tồn tại thì trả về 404:
    
Thay vì:
```php
$article = Article::find($id);
if (!$article) { 
    abort (404); 
}
```
    
Bạn có thể:
```php
$article = Article::findOrFail($id);
```
    
Tương tự có một số hàm như:
    
**firstOrCreate**
```php
$article = Article::firstOrCreate(['name' => 'Do not stop!']); // Lấy bài viết đầu tiên với tên là 'Do not stop!' hoặc tạo mới bài viết.
```
    
**updateOrCreate**
```php
// Update sách có tên là 'Do not stop!' với price = 99.
// Nếu không tồn tại sách phù hợp thì tạo mới
$article = Article::updateOrCreate(
    ['name' => 'Do not stop!'],
    ['price' => 99]
);
```

### Một vài thuộc tính thêm của Model
Chắc chắn là bạn đã từng viết thêm thuộc tính cho model như sau để định nghĩa tên bảng/fillable:
```php
protected $table = 'users';
protected $fillable = ['email', 'password'];
```

Tuy nhiên bạn có biết còn những thuộc tính bạn có thể sử dụng sau đây:
```php
protected $primaryKey = 'uuid'; // Thay đổi primary key thay vì mặc định là id
public $incrementing = false; // Tắt auto-incrementing cho primary key
protected $perPage = 25; // Định nghĩa số bài viết trên 1 trang khi dùng pagination
const CREATED_AT = 'posted_at'; // Khi bạn muốn đổi created_at thành cột khác 
const UPDATED_AT = 'updated_time'; // Tương tự như bên trên nhưng là updated_at 
public $timestamps = false; // Hoặc là disabled chức năng này 
```

### Giá trị mặc định cho BelongsTo

Bạn cần lấy tên tác giả của bài viết chẳng hạn:

```php
{{ $article->author->name }}
```

Tuy nhiên trong một vài trường hợp nào đó, author đã bị xóa khỏi CSDL và tất nhiên bạn sẽ bị lỗi: `property of non-object`

Thêm cái này có vẻ ổn:
```php
{{ $post->author->name ?? '' }}
```

Tuy nhiên bạn có thêm giá trị default khi ko tìm thấy Author như sau:
```php
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Guest Author'
    ]);
}
```

### Accessor là gì?
Umm, ok. Bạn có user có first_name và last_name chẳng hạn. Và giờ bạn muốn lấy full name của nó để hiện thị thì sao nhỉ:
```php
{{ $user->first_name . ' ' . $user->last_name }}
```

Việc này không có gì cho đến khi bạn phải dùng ở nhiều nơi, bê cái này qua khắp mọi chỗ có vẻ sai sai nhỉ? Và nếu bạn muốn thêm middle_name vào thì sao đây =)).

Định nghĩa thêm hàm sau vào model nhé:
```php
public function getFullNameAttribute()
{
  return $this->first_name . ' ' . $this->last_name;
}
```

Sau đó:
```php
{{ $user->full_name }} // Easy phải ko nào
```


### Sắp sếp theo giá trị của Accessor
Ví dụ bạn dùng Accessor để lấy Full Name như ở bên trên kia. Và bạn muốn sắp xếp theo Accessor đó thì làm sao:
```php
$users = User::orderBy('full_name')->get(); // Chắc chắn sẽ lỗi vì full_name không có trong cấu trúc của CSDL
```

Bạn có thể dùng cách sau:
```php
$clients = User::get()->sortBy('full_name'); // Thực ra User::get() trả về 1 collection và bạn dùng sortBy() có sẵn của collection để sắp xếp
```

### Chèn Accessor vào dữ liệu khi lấy ra
Khi bạn dùng Accessor thì hiểu cơ bản nó sẽ tạo 1 thuộc tính ảo để sử dụng. Tuy nhiên khi bạn muốn chuyển về array hoặc json chẳng hạn thì sẽ không có nó trong đấy đâu nhé. Nó chỉ trả về các trường có trong CSDL đại loại như sau:
```json
{
    id: 1,
    first_name: "Tien",
    last_name: "Nguyen",
    email: "tiendeptrai@framgia.com",
    created_at: "2016-05-02 21:27:58",
    updated_at: "2016-05-03 18:09:37",
}
```

Giờ bạn muốn lấy full_name để cho API thì sao nhỉ. Thay vì phải xử lý tiếp thì thêm thuộc tính sau vào Model nhé:
```php
protected $appends = ['full_name'];
```

Nó sẽ trả về:
```json
{
    id: 1,
    first_name: "Tien",
    last_name: "Nguyen",
    full_name: "Tien Nguyen",
    email: "tiendeptrai@framgia.com",
    created_at: "2016-05-02 21:27:58",
    updated_at: "2016-05-03 18:09:37",
}
```
### Eloquent Query Scopes
Bạn muốn lấy ra các User đã được active ( với điều kiện active = 1) chẳng hạn bạn sẽ làm như sau đúng ko:
```php
User::where('active', 1)->get();
```

Tuy nhiên, ở bạn cần dùng nó nhiều lần, ở nhiều nơi và sau này nếu bạn muốn thay điều kiện là active = 9 chẳng hạn. Có vẻ căng nhỉ.
Hãy làm như sau nhé:
```php
public function scopeActive($query)
{
    return $this->where('active', 1);
}
```

Đó, giờ muốn dùng thì:
```php
User::active()->get();
```

### Nhân bản

Ví dụ như bạn thích tạo 1 bản ghi mới giống bản ghi cũ mà ko muốn mất thời gian thì làm sao? Thì dùng cái này chứ sao:

```php
$article = Article::find(1);
$newArticle = $article->replicate()->save();
```

### Sử dụng chunk() để làm việc với bảng nhiều dữ liệu

Ví dụ bạn có 1 bảng có 100.000 bản ghi và bạn muốn lấy nó ra. Nếu dùng như vậy khá là căng:
```php
$users = User::all();
foreach ($users as $user) {
    // ...
}
```

Bạn có thể chia nhỏ để select từng phần 1, giống như pagination vậy:
```php
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```

### Tạo model và những file liên quan cần thiết

Mình biết chắc chắn bạn đã từng tạo model bằng cách sau:
```php
php artisan make:model Article
```

Tuy nhiên nó chỉ tạo 1 file Model Article.php như bình thường. Nếu bạn muốn tạo thêm migration, controller hoặc thêm resource thì phải chạy thêm vài lệnh nữa. Hoặc là không =))
```php
php artisan make:model Article -mcr
```

Lệnh trên sẽ tạo những file mà bạn muốn:

-m là migration

-c là controller

-r là resource controller

### Sử dụng Eager Loading
Khi bạn muốn lấy tất cả bài viết kèm tên người viết thì bạn sẽ dùng như thế nào. Nếu bạn làm thế này:

```php
$articles = App\Article::all();

foreach ($articles as $article) {
    echo $article->author->name;
}
```

Bạn đang thực hiện đến N + 1 câu truy vấn đến database:
- Câu đầu tiên sẽ lấy toàn bộ bài viết
- N câu tiếp theo sẽ lấy ra tên của người viết theo từng quyển sách được lấy ra.

Laravel hỗ trợ chúng ta 1 cách để chỉ cần 2 câu truy vấn nhưng vẫn có kết quả như trên:

```php
$articles = App\Article::with('author')->get();

foreach ($articles as $article) {
    echo $article->author->name;
}
```

2 câu truy vấn đó sẽ như sau:
```sql
select * from books
select * from authors where id in (1, 2, 3, 4, 5, ...)
```

Giữa 2 câu truy vấn và N+1 câu truy vấn thì bạn sẽ chọn cái nào?

## Kết thúc
Trên đây là những tips và tricks giúp bạn làm việc với Eloquent 1 cách tốt và dễ dàng hơn. Chia sẻ/Upvote nếu nó có ích nhé. :D


Nguồn: https://vantien.net/lap-trinh/php/laravel/nhung-meo-va-thu-thuat-ban-co-the-dung-de-quay-voi-laravel-eloquent/

Tham khảo: 

https://laravel-news.com/eloquent-tips-tricks

https://code.tutsplus.com/tutorials/25-laravel-tips-and-tricks--pre-92818