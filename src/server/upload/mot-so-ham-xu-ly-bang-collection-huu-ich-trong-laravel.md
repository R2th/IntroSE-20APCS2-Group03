# Giới thiệu
- Collection trong Laravel là một Class có tích hợp sẵn các phương thức xử lý dữ liệu thường xuyên nhằm làm giảm thiểu tối đa thời gian cho việc code hàng ngày . Đặc biệt là làm API kết nối tới database vì dữ liệu trả về từ database có sẵn kiểu là Collection. Dưới đây là một số hàm xử lý mình thường xuyên dùng nó . 
## 1. Cách khai báo Collection
- Việc đầu tiên chúng ta muốn sử dụng hàm Collection thì phải use namespace của nó :
    -  ` use Illuminate\Support\Collection; `
- Sau khi gọi namespace thành công. Các bạn có thể khởi tạo collections bằng 2 cách sau đây : 

```php
    // cách này dùng helper function nên không cần khai báo namespace
    $collection = collect([]);
    // hoac
    $collection = Collection::make([]);
```

- Trong đó: [] là mảng giá trị các bạn truyền vào
- Lúc này các bạn **dump($collection)** thì PHP sẽ trả về cho chúng ta một object có chứa giá trị tương ứng với mảng các bạn truyền vào.

## 2. Các hàm Collection trong Laravel 
- **all** : Hàm này có tác dụng lấy ra tất cả các giá trị trong collections và trả về dưới dạng mảng.
```php
$data = Collection::make([1, 2, 3, 4, 5, 6])->all();
//output [1,2,3,4,5,6];
```
-  **filter** : Hàm này có tác dụng lọc dữ liệu và trả về các dữ liệu đã được lọc.
```php
$collection = collect(['anhnq@gmail.com', 'Quang Anh', 'PHP'])
    ->filter(function ($key, $value) {
        return $value == 't';
});
```
- Output: 
- `Array
(
    [0] => anhnq@gmail.com
)`

- **expect**: Hàm này loại bỏ đi các giá trị không cần thiết.
```php
$collection = collect(['product_id' => 1, 'price' => 100, 'discount' => false]);

$filtered = $collection->except(['product_id', 'discount']);
$filtered->all();
// output ['price'=>100]
```
- **Count**: Hàm có tác dụng đếm các phần tử trong collections.
```php
$collection = collect([1, 2, 3, 4]);

$collection->count();

//output 4
```
- **avg** : Hàm tính giá trị trung bình của các phần tử trong mảng.
```php
$data = Collection::make([1, 2, 3, 4, 5, 6])->avg();
//output 3.5
```
- **sum**: Hàm tính tổng giá trị của các phần tử.
```php
$collection = collect([1, 2, 3, 4, 5, 6, 7]);
$chunks = $collection->sum();
//output 28
```
- **chunk**: Hàm các tác dụng tách mảng ra thành các mảng con.
```php
$collection = collect([1, 2, 3, 4, 5, 6, 7]);

$chunks = $collection->chunk(4);

$chunks->toArray();
//output [[1, 2, 3, 4], [5, 6, 7]]
```
- **first**: Hàm có tác dụng trả về giá trị đầu tiên.
```php
collect([1, 2, 3, 4])->first(function ($value, $key) {
    return $value > 2;
});

// 3
```
- **get** : Hàm lấy giá trị của phần tử trong mảng.
```php
$collection = collect(['title' => 'Tieu de bai viet', 'author' => 'Quang Anh']);

$value = $collection->get('author');

// Quang Anh
```
- **SortBy**: Hàm sắp xếp lại theo thứ tự tăng dần.
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
- **SortByDesc**: Sắp xếp lại giá trị theo thứ tự giảm dần.
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
- **take**: Hàm giới hạn số lượng trả về.
```php
$collection = collect([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(3);

$chunk->all();

//output [0, 1, 2]

Hoặc lấy từ cuối lên trên.

$collection = collect([0, 1, 2, 3, 4, 5]);

$chunk = $collection->take(-2);

$chunk->all();

//output [4, 5]
```

>  Còn nhiều hàm khác các bạn có thể tham khảo tại [đây](https://laravel.com/docs/6.x/collections) nha . 
>  

# Kết thúc 
- Hy vọng nó sẽ giúp ích cho mọi người . Thank you for read .