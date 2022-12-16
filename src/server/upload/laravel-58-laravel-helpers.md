# 1. Giới thiệu
Laravel bao gồm một loạt các hàm global helpers Php. Nhiều trong số hàm này được sử dụng bởi chính framework; tuy nhiên, bạn có thể tự do sử dụng chúng trong các ứng dụng của riêng bạn nếu bạn thấy chúng thuận tiện
# 2. Các phương thức có sẵn
Mình xin trình bày một số phương thức sẵn có đối với Array và Object (vì những cái này hay dùng khi chúng ta code ứng dụng), còn một số loại khác như Paths, String, Url các bạn có thể tham khảo thêm [tại đây](https://laravel.com/docs/5.8/helpers)
* **Array::add()**

Phương thức Arr :: add thêm một cặp khóa / giá trị đã cho vào một mảng nếu khóa đã cho không tồn tại trong mảng hoặc được đặt thành null
```php
use Illuminate\Support\Arr;

$array = Arr::add(['name' => 'Desk'], 'price', 100);

// ['name' => 'Desk', 'price' => 100]

$array = Arr::add(['name' => 'Desk', 'price' => null], 'price', 100);

// ['name' => 'Desk', 'price' => 100]
```
* **Arr::collapse()**

Phương thức Arr :: collapse thu gọn một mảng các mảng thành một mảng duy nhất
```php
use Illuminate\Support\Arr;

$array = Arr::collapse([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
* **Arr::divide()**

Phương thức Arr :: divide trả về hai mảng, một mảng chứa các khóa và cái còn lại chứa các giá trị của mảng đã cho
```php
use Illuminate\Support\Arr;

[$keys, $values] = Arr::divide(['name' => 'Desk']);

// $keys: ['name']

// $values: ['Desk']
```
* **Arr::dot()**

Phương thức Arr :: dot làm phẳng một mảng nhiều chiều thành một mảng cấp đơn sử dụng ký hiệu "dấu chấm" để biểu thị độ sâu.
```php
use Illuminate\Support\Arr;

$array = ['products' => ['desk' => ['price' => 100]]];

$flattened = Arr::dot($array);

// ['products.desk.price' => 100]
```
* **Arr::except()**

Phương thức Arr :: except loại bỏ các cặp khóa giá trị đã cho khỏi một mảng:
```php
use Illuminate\Support\Arr;

$array = ['name' => 'Desk', 'price' => 100];

$filtered = Arr::except($array, ['price']);

// ['name' => 'Desk']
```
* **Arr::first()**

Phương thức Arr :: first trả về phần tử đầu tiên của mảng nếu thỏa mãn điều kiện đã cho:
```php
use Illuminate\Support\Arr;

$array = [100, 200, 300];

$first = Arr::first($array, function ($value, $key) {
    return $value >= 150;
});

// 200
```
Một giá trị mặc định cũng có thể được truyền làm tham số thứ ba cho phương thức. Giá trị này sẽ được trả về nếu không có giá trị nào thỏa mãn đk
```php
use Illuminate\Support\Arr;

$first = Arr::first($array, $callback, $default);
```
* **Arr::last()**

Phương thức Arr :: last() trả về phần tử cuối cùng của mảng nếu thỏa mãn đk đã cho:
```php
use Illuminate\Support\Arr;

$array = [100, 200, 300, 110];

$last = Arr::last($array, function ($value, $key) {
    return $value >= 150;
});

// 300
```
Một giá trị mặc định cũng có thể được truyền làm tham số thứ ba cho phương thức. Giá trị này sẽ được trả về nếu không có giá trị nào thỏa mãn đk
```php
use Illuminate\Support\Arr;

$first = Arr::last($array, $callback, $default);
```
* **Arr::only()**

Phương thức Arr :: only chỉ trả về các cặp khóa / giá trị được chỉ định từ mảng đã cho:
```php
use Illuminate\Support\Arr;

$array = ['name' => 'Desk', 'price' => 100, 'orders' => 10];

$slice = Arr::only($array, ['name', 'price']);

// ['name' => 'Desk', 'price' => 100]
```
* **Arr::pluck()**

Phương thức Arr :: pluck() lấy tất cả các giá trị cho một khóa đã cho từ một mảng:
```php
use Illuminate\Support\Arr;

$array = [
    ['developer' => ['id' => 1, 'name' => 'Taylor']],
    ['developer' => ['id' => 2, 'name' => 'Abigail']],
];

$names = Arr::pluck($array, 'developer.name');

// ['Taylor', 'Abigail']
```
Bạn cũng có thể chỉ định cách bạn muốn bằng danh sách các khóa, cách nhau bằng dấu phẩy:
```php
use Illuminate\Support\Arr;

$names = Arr::pluck($array, 'developer.name', 'developer.id');

// [1 => 'Taylor', 2 => 'Abigail']
```
* **Arr::random()**

Phương thức Arr :: random() trả về một giá trị ngẫu nhiên từ một mảng:
```php
use Illuminate\Support\Arr;

$array = [1, 2, 3, 4, 5];

$random = Arr::random($array);

// 4 - (retrieved randomly)
```
* **Arr::where()**

Phương thức Arr :: where() lọc một mảng bằng cách sử dụng [Closure](https://viblo.asia/p/lam-quen-voi-closures-p1-oOVlYWWnK8W):
```php
use Illuminate\Support\Arr;

$array = [100, '200', 300, '400', 500];

$filtered = Arr::where($array, function ($value, $key) {
    return is_string($value);
});

// [1 => '200', 3 => '400']
```
* **Arr::wrap()**

Phương thức Arr ::wrap() wrap giá trị đã cho trong một mảng. Nếu giá trị đã cho là một mảng, nó sẽ không bị thay đổi:
```php
use Illuminate\Support\Arr;

$string = 'Laravel';

$array = Arr::wrap($string);

// ['Laravel']
```
# 3. Kết luận
Mình vừa trình bày các phương thức có sẵn trong Laravel cho phép ta có thể thao tác với kiểu dữ liệu Array một cách thuận tiện, dễ dàng và bạn cảm thấy những phương thức sẵn có chưa đáp ứng nhu cầu của bạn, bạn hoàn toàn có thể tạo ra những phương thức của bạn, chi tiết bạn có thể xem [tại đây](https://laravel-news.com/creating-helpers)
# 4. Tài liệu tham khảo
https://laravel.com/docs/5.8/helpers