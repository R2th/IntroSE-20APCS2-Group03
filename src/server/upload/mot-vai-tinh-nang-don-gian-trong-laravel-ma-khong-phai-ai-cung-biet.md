### 1. where n in 1
Ý là n where trong 1 where đó. 

Giả sử bạn cần tìm danh sách các user trong bảng `users` có **first_name** là **Vu** và có tuổi là **25**.
```sql
select * from `users`
where `first_name` = 'DepTrai'
and `age` = 25;
```
OK, thường thì mình sẽ làm như sau.
```php
User::where('first_name', 'DepTrai')
    ->where('age', 25)
    ->get();
```
Tuy nhiên chúng ta có thể sử dụng như sau:
```php
User::whereFirstNameAndAge('DepTrai', 25)->get();
```

Nhìn có vẻ đẹp hơn đúng không các bạn. Thực chất thì viết như thế này chỉ để làm cho code nó đẹp hơn (theo ý cá nhân mình) thôi. Còn về query thì giống nhau. Trường hợp bạn muốn kết hợp thêm các điều kiện **where** với nhau thì các bạn chỉ việc truyền thêm vào câu query và các điều kiện tương ứng như sau.
```php
User::whereCondition1AndCondition3AndCondition4('Condition1', 'Condition2', 'Condition3', 'Condition4')->get();
```
Nhớ rằng trong câu lệnh bắt đầu bằng **where** này, số lượng điều kiện đưa ra `bên trái` sẽ phải không được vượt quá số lượng `bên phải. ` Nếu không nó sẽ báo lỗi **Undefined offset: n**.

### 2. Tìm kiếm nhiều kết quả với method find/findOrFail
Thông thường, chúng ta chỉ thường sử dụng `find`, `findOrFail` với mục đích là tìm kiếm một bản ghi duy nhất theo `primary key`.
Thực chất thì chúng ta có thể tìm kiếm với nhiều bản ghi cũng được. Sử dụng bằng thay vì truyền vào một phần tử thì ta sẽ truyền vào mới một array.
```php
$user = User::find(1); //ok
$users = User::find([1, 2, 3]) // okay.!
$user = User::findOrFail(1); //ok
$users = User::findOrFail([1, 2, 3]) // That's okay.! =))
```
Bởi tất cả chúng đều gọi đến method `findMany`:
```php
public function findMany($ids, $columns = ['*'])
{
    $ids = $ids instanceof Arrayable ? $ids->toArray() : $ids;
    if (empty($ids)) {
        return $this->model->newCollection();
    }
    return $this->whereKey($ids)->get($columns);
}
```
Ngoài ra thì với `find/findOrFail`, bạn có thể select các column mà bạn muốn lấy. 
Xem đầy đủ tại [đây](https://github.com/laravel/framework/blob/5.8/src/Illuminate/Database/Eloquent/Builder.php#L323).

### 3. Lựa chọn và sử dụng thông minh pagination
Mình cá là khá nhiều bạn đọc trên docs của Laravel mà không hề để ý đến phần này. 
Với những cơ sở dữ liệu lớn có nhiều bản ghi, việc sử dụng `paginate` thông thường sẽ không phải là một ý tưởng tốt vì nó sẽ query đếm tổng số tất cả bản ghi trên table sau đó sẽ phải tính toán tổng số page.

Thay vào đó bạn nên sử dụng `simplePaginate`. ở đây thay vì việc bạn cần hiển thị các tất cả các page thì chúng ta sẽ ưu tiên bằng cách chỉ hiện thị các `previous link` và `next link` mà thôi. 
So sánh thử sẽ có sự khác biệt:

```php
// normal pagination
\App\Models\User::paginate(15);

// select count(*) as aggregate from `users`
// select * from `users` limit 15 offset 0

LengthAwarePaginator {#399 ▼
  #total: 101
  #lastPage: 7
  #items: Collection {#439 ▶}
  #perPage: 15
  #currentPage: 1
  #path: "http://localhost:8000"
  #query: []
  #fragment: null
  #pageName: "page"
  +onEachSide: 3
  #options: array:2 [▶]
}


// simple pagination

// select * from `users` limit 16 offset 0
\App\Models\User::paginate(15);

Paginator {#254 ▼
  #hasMore: true
  #items: Collection {#253 ▶}
  #perPage: 15
  #currentPage: 1
  #path: "http://localhost:8000"
  #query: []
  #fragment: null
  #pageName: "page"
  +onEachSide: 3
  #options: array:2 [▶]
}
```
Một phần đáng chú ý nữa là mặc định, Laravel sẽ hiển thị số lượng link ở phần phân trang là 3 ( chính là phần onEachSide ). Tuy nhiên bạn có thể custom bằng cách thêm link hiển thị hoặc ít hơn bằng method  `onEachSide(number)`.
Xem chi tiết tại [đây](https://github.com/laravel/framework/blob/5.8/src/Illuminate/Database/Eloquent/Builder.php#L744)

### 4. Một chút về Eloquent Model
Trong class [Model](https://laravel.com/api/5.8/Illuminate/Database/Eloquent/Model.html), có rất nhiều các properties được thiết lập sẵn, trong đó có `$perPage`, thuộc tính này dùng để set mặc định số lượng bản ghi lấy ra theo mỗi page khi bạn sử dụng với `Eloquent's pagination`. 
```php
protected $perPage = 10; // 10 rows/page
```
- `$appends`, bạn dùng nó khi cần lấy thêm thuộc tính này vào mỗi record sau khi lấy ra từ DB. 
```php
protected $appends = ['full_name'];

public function getFullNameAttribute()
{
    return $this->first_name . ' ' . $this->last_name;
}
```
- `$touches`: Update lại thời gian `updated_at` của relationship. Giả sử bạn có một bài post có relation đến nhiều `comment`. Khi bạn xóa một  comment, thì lập tức trường `updated_at` của bài post cũng sẽ bị thay đổi theo thời gian comment bị xóa.
- Sử dụng `replicate()` để clone một instance model: 
```php
$post = App\Models\Post::find(1);

$postClone = $post->replicate();
```
- Sử dụng method `is` để check duplicate:
```php
$user = App\Models\User::find(1);

$post = App\Models\Post::find(1);

if ($user->is($post->user)) {
    //
}
```
- Sử dụng `isDirty` để check sự thay đổi của các thuộc tính. Mình thường sử dụng trong Observer.
```php
$post = App\Models\Post::find(1);

$post->title = 'Dep Trai';

if ($post->isDirty()) {
    //
}
//hoặc
if ($post->isDirty('title') {
    $question->last_edited_at = $question->updated_at;
}
```
- Sử dụng `increment`/`decrement` để tăng giảm đơn vị của attribute. 
```php
$post->increment('post_view'); //default 1

$post->decrement('post_view', 3);
```
### 5.  Sử dụng helper function
Ở đây mình giới thiệu một số hàm cần thiết và nên sử dụng nhé. 
- `optional`: nhiệm vụ của nó là cho phép truy cập vào các attribute và method của đối tượng. Nếu không tồn tại attribute và method yêu cầu, nó sẽ mặc định trả về null.  Sử dụng khi mà bạn chưa biết chắc chắn nó sẽ có attribute hay method cần tìm không.
```php
$a = null;
$b = new Model();

optional($a)->doSomething(); // null
optional($a)->someProperty; // null

optional($b)->doSomething(); // calls doSomething on the Model object
optional($b)->someProperty; // the someProperty on the model object (if it exists)
```
- `abort` : Ném ra status code và message trả về đính kém. Ví dụ. `abort(403);`, `abort(404, 'Not Found')`;
-  `now`: Dùng hàm này thay cho `Carbon`. Bạn không cần use `Carbon` nữa. `now()` tương ứng với `Carbon::now()`;
-  `tap`: Hàm này có 2 tham số, đầu tiên là value, thứ 2 là closure. Closure này thực hiện với giá trị truyền vào chính là tham số đầu tiên. Và method này trả về cái giá trị là kết quả của cái Closure kia. Ví dụ trong method `create` của `Illuminate\Database\Eloquent\Builder.php`:

```php
return tap($this->newModelInstance($attributes), function ($instance) {
    $instance->save();
});
```
tương ứng với
```php
$instance = $this->newModelInstance($attributes)->save();

return $instance;
```
Dễ hơn rồi nhỉ :D. Hàm này mình dùng thường khi muốn viết code clean hơn.Cơ mà mình thấy thích hàm này nên cho vào luôn. 

* `logger` & `info`: Ngoài việc tự động lưu `logs` trong quá trình phát triển dự án, bạn cũng có thể debug bằng cách sử dụng `logger` hoặc `info`,  chúng tương tự với việc sử dụng `Illuminate\Log\Logger::debug($message)` hay `Illuminate\Log\Logger::info($message)`. Thú thật là lúc trước mình toàn debug bằng cách `dd` với `dump`, có biết cái này đâu =)) giờ kể ra biết cũng tiện lợi phết. Nội dung của message sẽ được lưu vào `storage_path/logs/laravel-*.log`
### 6. Sử dụng artisan down để đưa application của bạn vào chế độ Maintenance mode (503)
Đôi lúc bạn cũng muốn đưa app của mình về chế độ Maintenance mode. Để làm điều này Laravel cũng hỗ trợ cho chúng ta rồi. 
```php
php artisan down
```
Hoặc cũng có thể thêm option message để hiện thông báo:
```php
php artisan down --message="Hello, 503"
```
Sau khi down rồi mà bạn muốn up thì chạy `php artisan up`.