Laravel Eloquent sử dụng Collections để trả về kết quả. Collections chứa các phương thức rất hữu ích làm cho chúng rất mạnh mẽ và hữu ích để sử dụng. Bạn có thể lọc chúng, sửa đổi chúng và nhiều hơn nữa với chúng rất thuận tiện. Sau đây mình sẽ đưa ra những method hữu ích trong bài hướng dẫn này.

Bây giờ bạn có một model Post. Bạn tìm tất cả các bài viết với `PHP` 

`$posts = App\Post::where('category', 'php')->get();`

Biến trên sẽ trả về một Collection. 

Bạn có thể tạo một Collection đơn giản bằng cách sử dụng `collection`
```
$collection = collect([
    [
    'user_id' => '1',
    'title' => 'Helpers in Laravel',
    'content' => 'Create custom helpers in Laravel',
    'category' => 'php'
    ],
    [
    'user_id' => '2',
    'title' => 'Testing in Laravel',
    'content' => 'Testing File Uploads in Laravel',
    'category' => 'php'
    ],
    [
    'user_id' => '3',
    'title' => 'Telegram Bot',
    'content' => 'Crypto Telegram Bot in Laravel',
    'category' => 'php'
    ],
]);
```
Bên trên là cách bạn tạo ra một Collection. Bạn có thể áp dụng tất cả các Colelction mà Laravel cung cấp.

Dưới đây mình sẽ giới thiệu cho các bạn các hàm hay dùng 

### **filter()**
Một trong những method hưu ích, giúp bạn lọc Collection với một callBack. Nó chỉ pass cho những items đúng,  còn những items  khác loại bỏ. Filter trả về một instance mới mà không làm thay đổi instance ban đầu.
```
$filter = $collection->filter(function($value, $key) {
    if ($value['user_id'] == 2) {
        return true;
    }
});
 
$filter->all();
```

`all` phương thức trả về mảng bên dưới
```
[
    1 => [
        "user_id" => 2,
        "title" => "Testing in Laravel",
        "content" => "Testing File Uploads in Laravel",
        "category" => "php"
    ]
]
```

### **search()**
Được sử dụng để tìm kiếm Collection cho một giá trị nhất định.Nếu giá trị tồn tại trong Collection, thì giá trị được trả về. Nếu giá trị không khớp thì trả về false.
```
$names = collect(['Alex', 'John', 'Jason', 'Martyn', 'Hanlin']);
 
$names->search('Jason');
// 2
```
Theo mặc định, search được thực hiện bằng cách sử dụng so sánh lỏng lẻo. Bạn có thể chuyển `true` thành đối số thứ hai cho methos `search`  để sử dụng `strict` 

Bạn cũng có thể chuyển callback function cho methos search.Nó sẽ return về `key` của items đầu tiền pass callback
```
$names = collect(['Alex', 'John', 'Jason', 'Martyn', 'Hanlin']);
 
$names->search(function($value, $key) {
    return strlen($value) == 6;
});
// 3
```

### **chunk()**

Method được sử dụng để phân chia collection thành nhiều collection nhỏ hơn. Nó rất hữu ích khi hiển thị các collection vào gird
```
$prices = collect([18, 23, 65, 36, 97, 43, 81]);
 
$prices = $prices->chunk(3);
 
$prices->toArray();
```

Response từ code trên
```
[
    0 => [
        0 => 18,
        1 => 23,
        2 => 65
    ],
    1 => [
        3 => 36,
        4 => 97,
        5 => 43
    ],
    2 => [
        6 => 81
    ]
]
```

### **dump()**

Method `dump` collection items. Nó rất hữu ích cho việc gỡ lỗi
```
$collection->whereIn('user_id', [1, 2])
    ->dump()
    ->where('user_id', 1);
```

Response từ code trên
![](https://images.viblo.asia/0d45bcbc-38d4-48a2-8ef5-b3ad120cfacb.png)

### **map()**
Được sử dụng để lặp qua collection đầy đủ. Nó chấp nhận một callback dưới dạng đối số.`value` và `key` chuyển cho callback có thể sử đổi các giá trị và trả về chúng.Cuối cùng, trả về một collection mới
```
$changed = $collection->map(function ($value, $key) {
    $value['user_id'] += 1;
    return $value;
});
 
return $changed->all();
```

Response từ code trên
```
[
    [
        "user_id" => 2,
        "title" => "Helpers in Laravel",
        "content" => "Create custom helpers in Laravel",
        "category" => "php"
    ],
    [
        "user_id" => 3,
        "title" => "Testing in Laravel",
        "content" => "Testing File Uploads in Laravel",
        "category" => "php"
    ],
    [
        "user_id" => 4,
        "title" => "Telegram Bot",
        "content" => "Crypto Telegram Bot in Laravel",
        "category" => "php"
    ]
];
```

### **whereNotIn()**
Bạn có thể sử dụng method `whereNotIn` chỉ đơn giản là lọc các `collection` của một giá trị không nằm trong mảng. 

`$collection->whereNotIn('user_id', [1, 2]);` 

### **max()**
Trả về giá trị lớn nhất của một key đã cho.Bạn có thể tìm thấy `user_id` lớn nhất.

`$collection->max('user_id');`

### **pluck()**
Trả về tất cả các giá trị cho một key.Nó rất hữu ích để trích xuất cá giá trị của một cột nào đó.

```
$title = $collection->pluck('title');
$title->all();
```
Kết quả
```
[
  "Helpers in Laravel",
  "Testing in Laravel",
  "Telegram Bot"
]
```

Và `pluck` cũng chấp nhận tham số thứ 2

```
$title = $collection->pluck('user_id', 'title');
$title->all();
```

Kết quả phía dưới như bạn nhìn thấy

```
[
    "Helpers in Laravel" => 1,
    "Testing in Laravel" => 2,
    "Telegram Bot" => 3
]
```

### **each()**
Method `each` dùng để lặp lại toàn bộ collection. Nó chấp nhận một callback với hai tham số.

```
$collection->each(function ($item, $key) {
    info($item['user_id']);
});
```

### **isEmpty()/isNotEmpty()**
Ngoài cách kiểm tra 1 collections có bản ghi nào không bằng count() thì bạn có thể sử dụng isEmpty()/isNotEmpty()

```
collect([])->isEmpty();
// true

collect([])->isNotEmpty();
// false
```

### **contains()**
Method `contains` dùng để kiểm tra nếu một collection chứa giá trị nhất địột. Nó sẽ trả về `true`  khi pass 

```
$contains = collect(['country' => 'USA', 'state' => 'NY']);
 
$contains->contains('USA');
// true
 
$contains->contains('UK');
// false
```

Nếu bạn dùng `key/value` cho method, nó sẽ kiểm tra xem giá trị đã cho có tồn tại hay không

```
$collection->contains('user_id', '1');
// true
 
$collection->contains('title', 'Not Found Title');
// false
```

Và bạn cũng có thể dùng callback cho method. Callback sẽ chạy cho mọi items trong collection và sẽ trả về kết quả nếu pass điều kiện.

```
$collection->contains(function ($value, $key) {
    return strlen($value['title']) < 13;
});
// true
```

### **forget()**
Nó sẽ loại bỏ các mục từ collection. Bạn chỉ cẩn truyền `key` và nó sẽ xóa khỏi collection

```
$forget = collect(['country' => 'usa', 'state' => 'ny']);
 
$forget->forget('country')->all();

//kết quả
[
    "state" => "ny"
]
```

> Chú ý: `forget` không hoạt động trên mảng đa chiều 


### **avg()**
Hàm này trả về giá trị trung bình

```
$avg = collect([
    ['shoes' => 10],
    ['shoes' => 35],
    ['shoes' => 7],
    ['shoes' => 68],
])->avg('shoes');

// 30
```

### **groupBy()**
Nhóm collections theo key

```
$data = new Collection([
    10 => ['user' => 1, 'skill' => 1, 'roles' => ['Role_1', 'Role_3']],
    20 => ['user' => 2, 'skill' => 1, 'roles' => ['Role_1', 'Role_2']],
    30 => ['user' => 3, 'skill' => 2, 'roles' => ['Role_1']],
    40 => ['user' => 4, 'skill' => 2, 'roles' => ['Role_2']],
]);

$result = $data->groupBy([
    'skill',
    function ($item) {
        return $item['roles'];
    },
], $preserveKeys = true);

/*
[
    1 => [
        'Role_1' => [
            10 => ['user' => 1, 'skill' => 1, 'roles' => ['Role_1', 'Role_3']],
            20 => ['user' => 2, 'skill' => 1, 'roles' => ['Role_1', 'Role_2']],
        ],
        'Role_2' => [
            20 => ['user' => 2, 'skill' => 1, 'roles' => ['Role_1', 'Role_2']],
        ],
        'Role_3' => [
            10 => ['user' => 1, 'skill' => 1, 'roles' => ['Role_1', 'Role_3']],
        ],
    ],
    2 => [
        'Role_1' => [
            30 => ['user' => 3, 'skill' => 2, 'roles' => ['Role_1']],
        ],
        'Role_2' => [
            40 => ['user' => 4, 'skill' => 2, 'roles' => ['Role_2']],
        ],
    ],
];
*/
```

### **random()**
Trả về một kết quả bất kỳ trong collection

```
$collection = collect([1, 2, 3, 4, 5]);
$collection->random();
// 4
```




Bạn có thể sử dụng các method collection này của laravel để làm việc trong các dự án riêng của bạn.

Trên đây là 15 methods hay được sử dụng nhiều. Ngoài ra có rất nhiều các methods thông dụng khác giúp xử lý collections. Bạn có thể tham khảo thêm [tại đây](https://laravel.com/docs/5.8/collections)

Chúc bạn thành công.^^