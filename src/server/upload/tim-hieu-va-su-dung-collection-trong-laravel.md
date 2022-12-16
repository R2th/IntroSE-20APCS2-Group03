Mọi người thường nói là framework laravel rất mạnh mẽ vậy thì nó mạnh mẽ ở đâu? với tôi thì bất cứ thành phần nào của Laravel đều mạnh mẽ cả. Bài hôm này chúng ta cùng tìm hiểu về 1 thành phần hết sức quan trọng trong laravel là Collection.
# Laravel Collection là gì
Laravel Collection là một class cung cấp các phương thức tập trung vào việc xử lý mảng dữ liệu một cách thuận tiện nhằm làm giảm thiểu tối đa thời gian cho các lập trình viên. Đặc biệt là làm API kết nối tới database vì dữ liệu trả về từ database có sẵn kiểu là Collection.
ví dụ về collection:
``` php
<?php
 
$users = \App\User::all();
 
// $users là một collection trả về từ model User
 
$posts = \App\User::find(1)->posts;
 
// $posts là một collection trả về từ model Post
```
# Sử dụng Laravel Collection
## Khởi tạo collection
Khởi tạo collection bằng cách đơn giản như sau

**Khởi tạo thông qua helper collect**

`$collection = collect([1, 2, 3]);`

**Khởi tạo qua class Collection**

`$collection = new \Collection([1, 2, 3, 4, 5]);`

Nhìn nó cũng không khác gì tạo mảng nhỉ

## Các Collection hay dùng.

Laravel collection có rất nhiều phương thức giúp cho lập trình viên sử lý dữ liệu dễ dàng hơn.

**all()** 

Phương thức này lấy dữ liệu trong collection trả về dữ liệu dạng mảng

`$data = Collection::make([1, 2, 3, 4, 5, 6])->all();`

//output [1,2,3,4,5,6];

**get**

Hàm lấy giá trị của phần tử trong mảng.

``` php
$collection = collect(['name' => 'viblo', 'website' => 'https://viblo.asia']);

$value = $collection->get('name');

// viblo
```

**first()**

Phương thức first() trả về phần tử đầu tiên trong collection

``` php
<?php
 
collect([1, 2, 3, 4])->first();
 
// trả về giá trị đầu tiên trong collection là 1
 
collect([1, 2, 3, 4])->first(function ($value, $key) {
    return $value > 2;
});
 
// 3
```

**pluck()**

Phương thức pluck() sẽ trả về toàn bộ giá trị của một key của mỗi phần tử trong collection

``` php
<?php
 
$collection = collect([
    ['product_id' => 'prod-100', 'name' => 'Desk'],
    ['product_id' => 'prod-200', 'name' => 'Chair'],
]);
 
$plucked = $collection->pluck('name');
 
$plucked->all();
 
// ['Desk', 'Chair']
```

**SortBy**
Hàm sắp xếp lại theo thứ tự tăng dần.

``` php
$collection = collect([
    ['name' => 'Desk', 'price' => 200],
    ['name' => 'Chair', 'price' => 100],
    ['name' => 'Bookcase', 'price' => 150],
]);

$sorted = $collection->sortBy('price');

$sorted->values()->all();

/*
    [
        ['name' => 'Chair', 'price' => 100],
        ['name' => 'Bookcase', 'price' => 150],
        ['name' => 'Desk', 'price' => 200],
    ]
*/
```

**Take**
Hàm giới hạn số lượng trả về.

``` php
$collection = collect([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(3);

$chunk->all();

//output [0, 1, 2]
```

**count**
Hàm có tác dụng đếm các phần tử trong collections.

``` php
$collection = collect([1, 2, 3, 4]);

$collection->count();

//output 4
```

**avg**
Hàm tính giá trị trung bình của các phần tử trong mảng.

``` php
$data = Collection::make([1, 2, 3, 4, 5, 6])->avg();
//output 3.5
```

**push()**

Phương thức push() sẽ thêm một phần tử mới vào cuối collection

``` php
<?php
 
$collection = collect([1, 2, 3, 4]);
 
$collection->push(5);
 
$collection->all();
 
// [1, 2, 3, 4, 5]
```

**values()**

Hàm values()  trả về giá một collection mới và tạo các key thành các số nguyên liên tiếp

``` php
<?php
 
$collection = collect([
    10 => ['product' => 'Desk', 'price' => 200],
    11 => ['product' => 'Desk', 'price' => 200]
]);
 
$values = $collection->values();
 
$values->all();
 
/*
    [
        0 => ['product' => 'Desk', 'price' => 200],
        1 => ['product' => 'Desk', 'price' => 200],
    ]
*/
```

**chumk**
Hàm các tác dụng tách một mảng ra thành các mảng con.

``` php
$collection = collect([1, 2, 3, 4, 5, 6, 7]);

$chunks = $collection->chunk(4);

$chunks->toArray();
//output [[1, 2, 3, 4], [5, 6, 7]]
```