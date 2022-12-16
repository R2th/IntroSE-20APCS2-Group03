Phần 1: https://viblo.asia/p/laravel-20-laravel-eloquent-tips-and-tricks-phan-1-Do754JR4ZM6

### 10. BelongsTo Default Models

Hãy xem bạn có ```Post``` phụ thuộc vào ```Author``` và ở Blade code của bạn:

```
{{ $post->author->name }}
```

Nhưng điều gì sẽ xảy ra nếu author bị xóa, hoặc không được xét vì 1 vài lý do? Bạn sẽ gặp 1 error, một cái gì đó giống như ```“property of non-object”```.
Dĩ nhiên, bạn có thể ngăn chặn nó bằng cách:
```
{{ $post->author->name ?? '' }}
```

Tuy nhiên, bạn có thể thực hiện nó trên Eloquent relationship:
```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault();
}
```
Trong ví dụ này, ```author()``` relation sẽ trả về một empty ```App\Author``` model nếu không có author nào được đính kèm vào bài đăng.

Hơn nữa, chúng ta có thể gán các giá trị default property  cho default model đó.
```
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Guest Author'
    ]);
}
```

### 11. Order by Mutator

Hãy tưởng tượng bạn có điều này:

```
function getFullNameAttribute()
{
  return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
}
```

Bây giờ, bạn muốn order by theo ```full_name```?  Nó sẽ không hoạt động:
```
$clients = Client::orderBy('full_name')->get(); // doesn't work
```
Giải pháp khá đơn giản. Chúng ta cần order kết quả sau khi chúng ta ```get``` chúng:

```
$clients = Client::get()->sortBy('full_name'); // works!
```
Lưu ý tên function là khác nhau, nó không phải là ```orderBy``` mà nó là ```sortBy```.

### 12. Default ordering in global scope

Điều gì sẽ xảy ra nếu bạn muốn ```User::all()``` luôn được sắp xếp theo field ```name```? Bạn có thể chỉ định một global scope. Hãy quay lại method ```boot()``` mà chúng ta đã đề cập ở trên.

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

Đọ thêm về [Query Scopes tại đây](https://laravel.com/docs/5.6/eloquent#query-scopes).

### 13. Raw query methods

Đôi khi chúng ta cần thêm raw query vào Eloquent statement của chúng ta. May mắn, có functions cho điều này:

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

### 14. Replicate: make a copy of a row

Không cần phải giải thích sâu, ở đây, cách tốt nhất để tạo một bản sao của cơ sở dữ liệu:

```
$task = Tasks::find(1);
$newTask = $task->replicate();
$newTask->save();
```

### 15. Chunk() method for big tables

Không chính xác là Eloquent related, nó hơn về Collection, nhưng vẫn mạnh mẽ  để xử lý các bộ dữ liệu lớn hơn, bạn có thể chia nhỏ chúng thành từng mảnh.

Thay vì:
```
$users = User::all();
foreach ($users as $user) {
    // ...
```

Bạn có thể làm:

```
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```

### 16. Create additional things when creating a model

Tất cả chúng ta đều biết câu lệnh Artisan này:

```
php artisan make:model Company
```

Nhưng bạn có biết có 3 flags hữu ích để generate các file có liên quan tới model?
```
php artisan make:model Company -mcr
```
* -m sẽ tạo 1 migration file
* -c sẽ tạo 1 controller
* -r sẽ chỉ định rằng controller đó thành resourceful

### 17. Override updated_at when saving

Bạn có biết phương thức ```save()``` có thể chấp nhận các parameter không? Kết quả là chúng ta có thể nói với nó về việc "ignore" ```updated_at``` chức năng mặc định để được fill vào với timestamp hiện tại. Hãy xem:
```
$product = Product::find($id);
$product->updated_at = '2019-01-01 10:00:00';
$product->save(['timestamps' => false]);
```
Ở đây, chúng ta đã ghi đè default ```updated_at``` với define được xác định trước.

### 18. What is the result of an update()?

Bạn đã bao giờ tự hỏi những gì code này thực sự return?
```
$result = $products->whereNull('category_id')->update(['category_id' => 2]);
```

Ý tôi là, update được thực hiện trong cơ sở dữ liệu, nhưng biến ```$result``` chứa những gì?

Câu trả lời là nhiều rows bị thay đổi, Vì vậy, nếu bạn cần kiểm tra xem có bao nhiêu row bị ảnh hưởng, bạn không cần phải gọi bất cứ điều gì khác ngoài phương thức ```update()```, nó sẽ trả về cho bạn con số này.

### 19. Transform brackets into an Eloquent query

Điều gì xảy ra nếu bạn có and-or mix trong SQL query của bạn, giống như thế này:
```
... WHERE (gender = 'Male' and age >= 18) or (gender = 'Female' and age >= 65)
```

Làm thế nào để dịch nó sang Eloquent? đây là 1 cách sai:
```
$q->where('gender', 'Male');
$q->orWhere('age', '>=', 18);
$q->where('gender', 'Female');
$q->orWhere('age', '>=', 65);
```
Order  sẽ không chính xác. Cách đúng phức tap hơn một chút, sử dụng các hàm clossure như sub-queries:

```
$q->where(function ($query) {
    $query->where('gender', 'Male')
        ->where('age', '>=', 18);
})->orWhere(function($query) {
    $query->where('gender', 'Female')
        ->where('age', '>=', 65); 
})
```

### 20. orWhere with multiple parameters

Cuối cùng, bạn có thể pass một array của paramenter vào ```orWhere()```. Cách thông thường:

```
$q->where('a', 1);
$q->orWhere('b', 2);
$q->orWhere('c', 3);
```
Bạn có thể làm nó giống như sau:

```
$q->where('a', 1);
$q->orWhere(['b' => 2, 'c' => 3]);
```


Hy vọng những chia sẻ trên có thể giúp bạn có giúp ích cho bạn trong việc lập trình với Laravel.

Tài liệu: https://laravel-news.com/eloquent-tips-tricks