Bài viết này mình sẽ giới thiệu cho các bạn một số tips and tricks khi dùng với eloquent trong laravel. Các bạn đã từng học và làm project Laravel chắc chắn cũng biết đến eloquent với một số hàm rất thông dụng như get(), find(), all()....Ở bài viết này mình sẽ giới thiệu cho các bạn một số các hàm rất hay trong eloquent, các hàm có thể giúp code ngắn gọn hơn, dễ hiểu hơn nếu hiểu và sử dụng một cách hợp lí.

**1. find()  và findOrFail()** 
```
User::find($id) 
```
find rất quen thuộc với dev Laravel, nó sẽ tìm trong bảng users trả về bản ghi có id = $id nếu tìm thấy, nếu không thì trả về null.

```
User::findOrFail($id) 
```
findOrFail sẽ tìm trong bảng users trả về bản ghi có id = $id nếu tìm thấy, nếu không thì nó sẽ throw ra một cái error

**2. first() và firstOrFail()** 
```
User::where('id', '>', 5)->first() 
```
first sẽ tìm trong bảng users những user có id > 5 và trả về một bản ghi đầu tiên tìm thấy nếu không thì sẽ trả về null
```
User::where('id', '>', 5)->firstOrFail() 
```
firstOrFail sẽ tìm trong bảng users những user có id > 5 và trả về một bản ghi đầu tiên tìm thấy  nếu không thì nó sẽ throw ra một cái error.


**3. firstOrCreate() và firstOrNew()**

firstOrCreate sẽ tìm trong database sử dụng cặp column và giá trị truyền vào. Nếu model không được tìm thấy trong database thì một record mới sẽ được thêm với các attributes được truyền vào.
```
$user = User::firstOrCreate(
    [
        'email' => 'email@email.com'
    ], 
    [
        'firstName' => 'First',
        'lastName' => 'Last'
    ]);
```

firstOrNew giống như hàm firstOrCreate sẽ tìm record trong database bản ghi khớp với các attribute truyền vào. Tuy nhiên, nếu model không tìm tháy, một model instance mới sẽ được trả về. Tuy nhiên là model được trả về bởi firstOrNew vẫn chưa được lưu vào database. Nếu muốn lưu thì chúng ta phải gọi đến save()

**4. WhereX**
```
$posts = Post::where('user_id', 1)->get();
```
câu lệnh trên bạn có thể viết bằng cách như sau:
```
$posts = Post::whereUserId(1)->get();
```
Với dữ liệu liên quan date/time:
```
User::whereDate('created_at', date('Y-m-d'));
User::whereDay('created_at', date('d'));
User::whereMonth('created_at', date('m'));
User::whereYear('created_at', date('Y'));
```

**5. latest()**

Khi không dùng latest()
```
$post = Post::whereUserId(1)->orderBy('created_at', 'desc')->get();
```
Khi dùng latest()
```
$post = Post::whereUserId(1)->latest()->get();
```
Câu lệnh trên sẽ lấy ra post mới nhất trong database. latest() được define trong **Illuminate\Database\Query\Builder** như sau:
```
public function latest($column = 'created_at')
{
    return $this->orderBy($column, 'desc');
}
```
chúng ta có thể truyền tham số vào latest() trường mà chúng ta muốn lấy ra theo desc

**6. map()**

Ví dụ dưới đây sẽ minh họa cho cách sử dụng map().
```
$collection = User::take(2)->get();
$users = $collection->map(function ($item, $key) {
    return [$item->name. '+' .$key, $item->email. '+' .'com'];
});
$users->all();

// return 
array:2 [▼
  0 => array:2 [▼
    0 => "Thanh Trần+0"
    1 => "thanh@gmail.com+com"
  ]
  1 => array:2 [▼
    0 => "Minh Huệ+1"
    1 => "thanh2@gmail.com+com"
  ]
]
```
**7. filter()**

Ví dụ dưới đây sẽ minh họa cho cách sử dụng filter().
```
$collection = User::whereIn('id', [1, 2, 3])->get();
$users = $collection->filter(function ($item, $key) {
    return $item->id > 1;
});
$users->all();

// trả về mảng gồm 2 user có id = 2 và id = 3
array:2 [▼
      1 => User {#1315 ▶}
      2 => User {#1316 ▶}
]
```

**8. concat()**
```
$collection = User::whereId(1)->get();
$users = $collection->concat(User::whereId(2)->get());
$users->all();

// trả về mảng gồm 2 user có id = 1 và id = 2
array:2 [▼
      0 => User {#1311 ▶}
      1 => User {#1366 ▶}
]
```
**9. when()**

when dùng sẽ tránh không phải sử dụng if/else

```
$query = User::query();
$query->when($a == 1, function ($q) {
    return $q->take(2);
});
$query->when($a == 2, function ($q) {
    return $q->first();
});

Nếu a = 1 thì sẽ trả về câu query 1, a = 2 thì trả về câu query 2.
```

**10. replicate()**

Replicate tạo ra một bản sao, đây là cách tốt nhất để tạo bản sao trong cơ sở dữ liệu:

```
$user = User::findOrFail(1);
$newUser = $user->replicate();
$newUser->save();
```

**link tham khảo:**

https://laravel.com/docs/5.7/collections

https://laravel-news.com/eloquent-tips-tricks