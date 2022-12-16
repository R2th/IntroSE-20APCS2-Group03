Xin chào mọi người. Hôm nay mình xin giới thiệu một số phương thức xử lý với Collection trong Laravel mà chúng ta hay gặp. Mình xin được bắt đầu luôn nhé.
<br>
Collection thật sự gần gũi với chúng ta. Bằng chứng là khi bạn chỉ cần xử lý một câu đơn giản như sau thì dữ liệu trả về sẽ là một collection:
```php
$users = User::where('conditional')->get();
//hoặc
$users = User::all();
//đơn giản hơn là sử dụng method collect
$collection = collect(['a', 'b', 'c']);
```
Trong Laravel Collection, có nhiều phương thức hỗ trợ rất cần thiết trong quá trình làm việc, chúng ta sẽ tìm hiểu ngay dưới đây.
#### 1. keys()
Method `keys` trả về tập hợp các key của data. Ví dụ:
```php
$users = User::all();

$keys = $users->keys();
// => result:
=> Collection {
  #items: array:4 [
    0 => 0
    1 => 1
    2 => 2
    ...
  ]
}

$keys->all();
// => result: 
[
    0 => 0
    1 => 1
    2 => 2
    ...
]
```

#### 2. keyBy()
Như tên gọi của nó. Hàm này sẽ lấy giá trị bạn chọn và set nó làm key. Ví dụ:
```php
$collection = collect([
    ['id' => 1, 'name' => 'Vu'],
    ['id' => 2, 'name' => 'Manh'],
]);

$keyed = $collection->keyBy('id');

$keyed->all();
// => result:
[
    1 => ['id' => 1, 'name' => 'Vu'],
    2 => ['id' => 2, 'name' => 'Manh']
]
```
#### 3. values()
Hàm này sẽ đảo lộn tất cả lại các giá trị và sắp xếp lại các key. Ví dụ:
```php
$users = collect([
    5 => ['id' => 5, 'name' => 'Vu'],
    6 => ['id' => 6, 'name' => 'Hieu']
]);

$users->values()->all();
// => result:
[
   0 => ['id' => 5, 'name' => 'Vu'],
   1 => ['id' => 6, 'name' => 'Hieu']
]
```
#### 4. push()
Như tên gọi của nó, hàm `push` sẽ đẩy 1 phần tử vào `Collection`.
Ví dụ: 
```php
$collection = collect([
    ['id' => 1, 'name' => 'Vu']
  ]
);
$collection->push(['id' => 2, 'name' => 'Hieu']);

// result: 
Collection {#503
  #items: array:2 [
    0 => array:2 [
      "id" => 1
      "name" => "Vu"
    ]
    1 => array:2 [
      "id" => 2
      "name" => "Hieu"
    ]
  ]
}
```

#### 5. pull()
Ngược lại với hàm `push`, hàm `pull` sẽ loại bỏ 1 phần tử khỏi `Collection`.
```php
$user = collect(['id' => 1', 'name' => 'Vu', 'phone' => 0123456789])
$user->pull('phone');
// result: 
Collection {
  #items: array:2 [
    "id" => 1
    "name" => "Vu"
  ]
}
```
#### 6. sortBy()
Hàm này sẽ sắp xếp lại collection theo key.
```php
$users = collect([
    ['id' => 1, 'name' => 'Vu', 'age' => 19],
    ['id' => 2, 'name' => 'Manh', 'age' => 24],
    ['id' => 3, 'name' => 'Hieu', 'age' => 20],
]);

$data = $users->sortBy('age');
// => result: 

Collection {#474
  #items: array:3 [
    0 => array:3 [
      "id" => 1
      "name" => "Vu"
      "age" => 19
    ]
    2 => array:3 [
      "id" => 3
      "name" => "Hieu"
      "age" => 20
    ]
    1 => array:3 [
      "id" => 2
      "name" => "Manh"
      "age" => 24
    ]
  ]
}
// => using method values() to return new collection with the keys reset
$data->values();
// => result
Collection {#102
  #items: array:3 [
    0 => array:3 [
      "id" => 1
      "name" => "Vu"
      "age" => 19
    ]
    1 => array:3 [
      "id" => 3
      "name" => "Hieu"
      "age" => 20
    ]
    2 => array:3 [
      "id" => 2
      "name" => "Manh"
      "age" => 24
    ]
  ]
}
```
#### 7. sum()
Hàm này trả về tổng giá trị các item trong collection
```php
$users = collect([
    ['name' => 'Vu', 'age' => 24],
    ['name' => 'Manh', 'age' => 23],
]);

$users->sum('age');

//=> result:47
```
#### 8. filter()
Trả về giá trị thỏa mãn điều kiện trong hàm callback.
```php
$users = collect([
    ['name' => 'Vu', 'age' => 24],
    ['name' => 'Manh', 'age' => 1],
]);

$users->filter(function ($value) {
    return $value['age'] > 1;
});

// => result: 
array:1 [
  0 => array:2 [
    "name" => "Vu"
    "age" => 24
  ]
]
```
#### 9. mapWithKeys()
Hàm này sẽ trả về dữ liệu trong `Collection` theo mỗi `key / value` của hàm callback:
```php
$users = collect([
    [
        'id' => 1,
        'name' => 'Vu',
        'email' => 'vunguyen10111995@gmail.com'
    ],
    [
        'id' => 2,
        'name' => 'Manh',
        'email' => 'manh@example.com'
    ]
]);

$keyed = $collection->mapWithKeys(function ($item) {
    return [$item['email'] => $item['id']];
});

//  => result:
Collection {
  #items: array:2 [
    "vunguyen10111995@gmail.com" => 1
    "manh@example.com" => 2
  ]
}
```
#### 10. merge()
Hàm này sẽ gộp các giá trị tương ứng có cùng key lại, nếu giá trị đưa vào gộp không có key trùng với giá trị có sẵn, nó sẽ được thêm vào như một phần tử mới. Nếu trùng, nó sẽ overwrite lại value của key đó trong Collection.
```php
$collection = collect(['id' => 1, 'age' => 24]);

$merged = $collection->merge(['age' => 200, 'name' => 'Vu']);

// => result:
Collection {#102
  #items: array:3 [
    "id" => 1
    "age" => 200
    "name" => "Vu"
  ]
}
```

Trên đây là một số method hữu dụng mà chúng ta hay gặp phải và cần xử lý với `Collection`. Tuy nhiên không phải lúc nào chúng ta cũng nhớ và có thể áp dụng được. Ngoài ra, Laravel Collection còn hỗ trợ rất nhiều các methods khác như `when`, `where`, `whereIn`... Tất cả đều có tại [Laravel Colelction](https://laravel.com/docs/5.7/collections). Mình xin dừng bài viết ở đây. Cảm ơn các bạn đã đọc bài viết của mình. Xin cảm ơn.

#### Tham khảo
Laravel Collection: https://laravel.com/docs/5.7/collections