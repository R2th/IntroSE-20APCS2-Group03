Laravel 6.0 đã giới thiệu Lazy Collection. Lazy collection sử dụng [PHP generators](https://www.php.net/manual/en/language.generators.overview.php) để cho phép chúng ta làm việc với một tập dữ liệu rất lớn và giữ cho mức sử dụng bộ nhớ ở mức thấp. Ví dụ với 60.000 bản ghi user.
Nếu bây giờ chúng ta lấy ra tất cả các bản ghi cùng 1 lúc thì sao? Chúng ta nhận được lỗi 500 do quá tải bộ nhớ, bởi vì tất cả 60.000 user đều được tải vào bộ nhớ cùng lúc.
```php
$users = \App\User::all();
```
Và để loại bỏ việc sử dụng bộ nhớ này chúng ta sử dụng method `cursor()` . Method này cho phép chỉ thực hiện 1 câu truy vấn duy nhất và chỉ 1 Eloquent model được load ra tại 1 thời điểm .

Trong ví dụ này, việc gọi `filter` sẽ không được thực thi cho đến khi từng user được lặp lại, làm giảm đáng kể việc sử dụng bộ nhớ
```php
$users = App\User::cursor()->filter(function ($user) {
    return $user->id > 500;
});

foreach ($users as $user) {
    echo $user->id;
}
```
### Read Large File
Ngoài ra chúng ta có thể sử dụng lazy collection để đọc hàng GB khổng lồ. Method `make()` dùng để tạo 1 lazy collection class object 

Ví dụ, chúng ta lấy 4 bản ghi với method `chuck()`, load các bản ghi vào LogEntry  model và lặp qua các bản ghi đó.
```php
use App\LogEntry;
use Illuminate\Support\LazyCollection;

LazyCollection::make(function () {
    $handle = fopen('log.txt', 'r');

    while (($line = fgets($handle)) !== false) {
        yield $line;
    }
})
->chunk(4)
->map(function ($lines) {
    return LogEntry::fromLines($lines);
})
->each(function (LogEntry $logEntry) {
    // Process the log entry...
});
```
Điểm chú ý ở đây chính là việc ta sử dụng hàm `yield` của php thay cho`return` như Collection. Thay vì dừng thực thi hàm và trả về (return), `yield` trả về giá trị khi giá trị đó cần sử dụng đến mà không lưu trữ tất cả các giá trị trong bộ nhớ.

Ban có thể tìm hiểu thêm về yield [tại đây](https://www.php.net/manual/en/language.generators.syntax.php) :)

**Kết luận**

Như vậy LazyCollection giúp chúng ta thao tác với cơ sở dữ liệu rất lớn nhưng vẫn giữ mức sử dụng bộ nhớ thấp hơn rất nhiều so với Collection.

**Nguồn tham khảo**

https://laravel.com/docs/master/collections#lazy-collections

https://webomnizz.com/working-with-lazy-collection-in-laravel-6/

https://blog.haposoft.com/so-sanh-lazy-collection-va-collection-trong-laravel-6-0/