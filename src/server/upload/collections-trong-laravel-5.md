# 1. Collection Trong Laravel là gì?
Collection trong Laravel là một lớp trong lập trình hướng đối tượng, nó thay thế cho các mảng truyền thống. Giống như mảng, Collection có nhiều các item thành phần, tuy nhiên các item này có thể là các đối tượng thay cho các kiểu dữ liệu đơn giản như String, Integer… Collection có nhiều ưu điểm trong mảng truyền thống:

Collection được thiết kế có thể thay đổi kích thước (số lượng các phần tử) và sử dụng bộ nhớ động.
Cung cấp các cấu trúc dữ liệu hữu dụng giúp lập trình nhanh hơn.
Collection hỗ trợ các phần tử không đồng nhất về kiểu, trong khi mảng là tập hợp các phần tử cùng kiểu.
Collection có tính mở rộng cao, có tính thích ứng.
Collection có các phương thức được xây dựng sẵn như sắp xếp, tìm kiếm.
Laravel Collection là một mở rộng của PHP Collection với số lượng các helper method lớn Laravel Collection giúp làm việc với mảng dữ liệu rất hiệu quả. Illuminate\Support\Collection class trong Laravel được implement một số các interface PHP như:
- ArrayAccess: cung cấp khả năng truy xuất vào các đối tượng như mảng.
- IteratorAggregate
- JsonSerializable
# 2. Khai báo  và sử dụng Collections
- Để sử dụng các bạn cần phải khai báo như sau:<br>
`use Illuminate\Support\collection;`
- Sau đó khởi tạo collections bằng 2 cách:
```php
$collection = collect([]);
// hoac
$collection = conlection::make([]);
```
Trong đó: [] là mảng giá trị các bạn truyền vào.
# 3. Các Collections hay dùng
- **all**<br>
Hàm này có tác dụng lấy ra tất cả các giá trị trong collections và trả về dưới dạng mảng.

```php
$data = collection::make([1,2,3,4,5,6])->all();
//output [1,2,3,4,5,6];
```
- **filter**<br>
Hàm này có tác dụng lọc dữ liệu và trả về các dữ liệu đã được lọc.

```php
$collection = collect(['PHP', 'Ruby', 'JS'])->filter(function($key, $value)
{
    return $value == 'PHP';
});
```
Output

Array
(
    [0] => PHP
)
- **expect**<br>
Hàm này loại bỏ đi các giá trị không cần thiết.
```php

$collection = collect(['product_id' => 1, 'price' => 100, 'discount' => false]);

$filtered = $collection->except(['product_id', 'discount']);
$filtered->all();
// output ['price'=>100]
```
- **Count**<br>
Hàm có tác dụng đếm các phần tử trong collections.

```php
$collection = collect([1, 2, 3, 4]);

$collection->count();

//output 4
```
- **avg**<br>
Hàm tính giá trị trung bình của các phần tử trong mảng.
```php

$data = collection::make([1,2,3,4,5,6])->avg();`
//output 3.5
```
- **sum**<br>
Hàm tính tổng giá trị của các phần tử.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7]);
$chunks = $collection->sum();
//output 28
```
- **chunk**<br>
Hàm các tác dụng tách mảng ra thành các mảng con.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7]);

$chunks = $collection->chunk(4);

$chunks->toArray();
//output [[1, 2, 3, 4], [5, 6, 7]]
```
- **first**<br>
Hàm có tác dụng trả về giá trị đầu tiên.

```php
collect([1, 2, 3, 4])->first(function ($value, $key) {
    return $value > 2;
});

// 3
```
- **get**<br>
Hàm lấy giá trị của phần tử trong mảng.

```php
$collection = collect(['website' => 'toidicode.com', 'author' => 'abc']);

$value = $collection->get('author');

// abc
```
- **SortBy**<br>
Hàm sắp xếp lại theo thứ tự tăng dần.

```php
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
- **SortByDesc**<br>
Sắp xếp lại giá trị theo thứ tự giảm dần.

```php
$collection = collect([
    ['name' => 'Desk', 'price' => 200],
    ['name' => 'Chair', 'price' => 100],
    ['name' => 'Bookcase', 'price' => 150],
]);

$sorted = $collection->sortByDesc('price');

$sorted->values()->all();

/*
    [
        ['name' => 'Chair', 'price' => 100],
        ['name' => 'Bookcase', 'price' => 150],
        ['name' => 'Desk', 'price' => 200],
    ]
*/
```
- **Take**<br>
Hàm giới hạn số lượng trả về.

```php
$collection = collect([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(3);

$chunk->all();

//output [0, 1, 2]
-Hoặc lấy từ cuối lên trên.

$collection = collect([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(-2);

$chunk->all();

//output [4, 5]
```
- **every**<br>
Phương thức này sử dụng để kiểm tra tất cả các phần tử của Collection

```php
 $collection = collect([1, 2, 3, 4, 5]);
=> Illuminate\Support\Collection {#698
     all: [
       1,
       2,
       3,
       4,
       5,
     ],
   }
 $collection = $collection->every(function ($value, $key) {
     return $value > 3;
 });
//=> false
```

Kiểm tra xem có phải các phần tử của collection có lớn hơn 3 hay không, câu trả lời là false.

- **each()**<br>
Phương thức này lặp qua các phần tử của collection và đưa các phần tử này vào làm tham số của một hàm callback.

 ```php
$collection = collect([1, 2, 3, 4, 5]);
$collection = $collection->each(function ($value, $key) {
     if($value > 3){
             echo 'item > 3';
     } else {
             echo 'item < 3';
     }
 });
 
```
 - **collapse()**<br>
Nếu một collection có các phần tử là các mảng, nếu sử dụng collapse() nó sẽ tạo một mảng duy nhất nằm trong collection

```php
 $newCollection = collect([[1,2,3], [4,5,6], [7,8,9]]);
=> Illuminate\Support\Collection {#718
     all: [
       [
         1,
         2,
         3,
       ],
       [
         4,
         5,
         6,
       ],
       [
         7,
         8,
         9,
       ],
     ],
   }
 $collapsed = $newCollection->collapse();
 $collapsed->all();

```
- **combine()**<br>
Phương thức này sử dụng để combine key với giá trị trong collection từ hai mảng khác nhau:

```php
$keyCollection = collect(['name', 'version']);
$combined = $keyCollection->combine(['Laravel', 'Laravel 5.4']);
$combined->all();
```
=> [
     "name" => "Laravel",
     "version" => "Laravel 5.4",
   ]
- **contains()**
Phương thức này để kiểm tra xem collection có chứa một phần tử nào đó không.

```php
$frameworks = collect([
		['name' => 'Laravel', 'version' => '5.4'],
		['name' => 'Symfony', 'version' => '3.2'],
		['name' => 'CodeIgniter', 'version' => '3.1.4'],
		['name' => 'Yii', 'version' => '2.0.11']
	]);

 $frameworks->contains(['name' => 'Laravel', 'version' => '5.4']);
//=> true
 $frameworks->contains(['name' => 'PHPCake', 'version' => '3.1']);
//=> false
```
**Nguồn tham khảo:**<br>
https://techblog.vn/bai-14-collections-trong-laravel<br>
https://allaravel.com/laravel-tutorials/laravel-collection-lam-viec-voi-tap-du-lieu-lon/