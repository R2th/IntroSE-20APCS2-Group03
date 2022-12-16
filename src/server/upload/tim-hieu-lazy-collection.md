# Introduction 
**Lazy Collection** là một tính năng mới của Laravel được giới thiệu trong phiên bản 6.0. Đây là một sự bổ sung cho tính năng **Collection** vô cùng hữu ích đã có trước đó của Laravel cho phép ta giảm thiểu bộ nhớ sử dụng. Vì là một tính năng mới, hiện các tài liệu về **Lazy Collection** vẫn còn hạn hẹp nên mình xin phép góp vui một bài viết đi vào tìm hiểu về **Lazy Collection** và có một cái nhìn vào cách nó hoạt động thông qua **PHP Generators**.
# Mục lục
* **I. Lazy Collection**
* **II. PHP Generators**
# I. Lazy Collection
## 1. Giới thiệu
Trong các bài toán thực tế, chúng ta sẽ có thể gặp các tình huống cần làm việc với một lượng lớn các bản ghi như dữ liệu về log hay notifications. Tuy nhiên, việc lấy ra số lượng lớn như vậy để làm việc với Collection thì không khả thi chút nào, đặc biệt với các hệ thống đã chạy lâu năm. Chương trình của chúng ta được triển khai trên một server vật lý với dung lượng RAM giới hạn, việc đọc một lượng lớn các bản ghi sẽ khiến server nhanh chóng quá tải và gây chết trang. Để giảm thiểu vấn đề này, Laravel đã cho ra đời **Lazy Collection**.
## 2. Sử dụng

### a. Tổng quát
**Lazy Collection** là một tính năng mới được thêm vào phiên bản **Laravel 6.0** cho phép ta làm việc với bộ dữ liệu lớn và duy trì bộ nhớ sử dụng lợi dụng **PHP Generators**.

### b. Khởi tạo Lazy Collection
Tương tự như **Collection**, để sử dụng **LazyCollection** ta có thể thêm `use Illuminate\Support\LazyCollection` vào đầu file.

**VD:**
```php
use Illuminate\Support\LazyCollection;

LazyCollection::make(function () {
    $handle = fopen('log.txt', 'r');

    while (($line = fgets($handle)) !== false) {
        yield $line;
    }
});
```

Bên cạnh đó, query builder cũng cung cấp cho chúng ta hàm `cursor()` trả về một **LazyCollection** cho phép ta làm việc trên nhiều bản ghi nhưng không phải tải toàn bộ vào bộ nhớ cùng lúc.

**VD:** Giả sử chúng ta có 100,000 bản ghi log hệ thống cần xử lý.
```php
use App\Models\Log;

// không dùng lazy collection, truy vấn thực hiện lấy toàn bộ 100,000 bản ghi vào RAM
Log::all()->map(function ($log, $key) {
    return parseMessage($log->message);
});

// sử dụng lazy collection, lần lượt từng model được thêm vào bộ nhớ nhưng chỉ cần 1 query
Log::cursor()->map(function ($log, $key) {
    return parseMessage($log->message);
});

```
### c. Các phương thức
Giống với **Collection**, **Lazy Collection** implement `Illuminate\Support\Enumerable` và cung cấp đầy đủ các phương thức thông thường như `all()`, `map()`, `sort()`, `where()`, v.v... Mọi người có thể xem chi tiết trong tài liệu tham khảo.

Tuy nhiên, bên cạnh đó LazyCollection cũng bao gồm các phương thức mới như:
* `takeUntilTimeout(DateTimeInterface $timeout)`: Hàm sẽ thực hiện lấy ra các giá trị tới khi hết thời gian. *(**LƯU Ý:** phương thức này có từ bản 8.x)*
* `tapEach(callable $callback)`: gần giống với `each()`, phương thức sẽ thực hiện hàm callback cho từng item nhưng chỉ thực hiện lần lượt cho từng item khi được lấy ra một cách "lazy".
* `remember()`: ghi nhớ các giá trị đã được lấy ra và bỏ qua chúng khi gặp lại.
# II. PHP Generators
Như đã nêu trên, để **Lazy Collection** có thể thực hiện lấy lần lượt các bản ghi vào bộ nhớ chúng ta sử dụng **PHP Generator**. Một hàm generator nhìn qua không khác so với một PHP function thông thường ngoại trừ việc sử dụng `yield` thay vì `return`. Vậy sự khác biệt là gì?

Giả sử ta có một hàm `countToMillion()` được cài đặt như sau
```php
function countToMillion()
{
    for($i = 1; $i <= 1000000; $i++) {
        return $i;
    }
}

dump(countToMillion());
```
**Output:**
```json
1
```
Hàm thực hiện trả về giá trị đầu tiên và dừng hoàn toàn `countToMillion()`.
Nếu ta thay đổi từ khóa `return` sang `yield`, ta sẽ có như sau:
```php
function countToMillion()
{
    for($i = 1; $i <= 1000000; $i++) {
        yield $i;
    }
}

dump(countToMillion());
```
**Output:**
```json
Generator {#1534 ▼
  executing: {
      ...
  }
  closed: false
}
```
Như ta thấy, từ khóa `yield` sẽ trả về một **Generator** object thay vì giá trị **"1"**. Vậy **Generator** object này có gì đặc biệt?

Tìm hiểu tiếp theo ta sẽ thử thực hiện in lần lượt từng số đếm tới 1 triệu. Để làm được điều đó sử dụng `return` chúng ta sẽ cần phải lưu lại 1,000,000 bản ghi vào một biến số trước khi trả về. 
```php
function countToMillion()
{
    $data = [];
    for($i = 1; $i <= 1000000; $i++) {
        $data[] = $i;
    }

    return $data;
}

foreach (countToMillion() as $number) {
    dump($number);
}
```
**Output:**
```json
1
2
3
...
1000000
```
Điều này gây tốn rất nhiều bộ nhớ. Nhưng khác với `return`, `yield` không thực sự dừng hoàn toàn phương thức của chúng ta mà thay vào đó tạm dừng ở vị trí đang đứng. Sử dụng **Generator** object chúng ta có thể thực hiện lặp qua từng `yield` để lấy giá trị tiếp theo trả về và giải phóng bộ nhớ sau khi hoàn thành.
```php
// count with yield
...
foreach (countToMillion() as $number) {
    dump($number);
}
```
**Output:**
```json
1
2
3
...
1000000
```
Dựa trên ý tưởng này, Laravel **Lazy Collection** thực hiện xử lý lần lượt các item trong **Collection** thay vì lưu tất cả vào bộ nhớ.
# Tổng kết
Vậy qua bài viết trên chúng ta đã hiểu được cách sử dụng của **Lazy Collection** và có một cái nhìn sâu hơn về cách nó hoạt động thông qua **PHP Generators**.
# Tài liệu tham khảo
1. https://www.php.net/manual/en/language.generators.syntax.php
2. https://laravel.com/docs/8.x/collections#introduction