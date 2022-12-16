## Mở Đầu:
Chắc hẳn các bạn sử dụng laravel không còn quá xa lạ với các câu lệnh `Product->all()` hay `Product->where('name', 'Vương Đại Chất')->get()` các bạn cũng đã từng thắc mắc nó là gì đúng không ạ :). Thực chất chúng là collection

Collections là một tập hợp nhiều kết quả bởi Eloquent, mỗi collection đều là một instance từ `Illuminate\Database\Eloquent\Collection` được sử dụng để xử lý dữ liệu, nhằm giảm thiểu tối đa thời gian cho các lập trình viên.
## Nội dung

### Cách khai báo một Collections

Trước tiên, muốn sử dụng được collection bạn cần khai báo namespace của nó. Hãy thêm dòng này vào đầu file php của bạn.
```rust:js
use Illuminate\Support\Collection;
```
Sau đó, bạn có thể tạo collection bằng 1 trong 2 cách sau đây.
```shell:js
//Tạo collection từ mảng
$collection = collect([1, 2, 3]);
//Hoặc có thể sử dụng
$collection = Collection::make([1, 2, 3]);
```
### Các hàm hay sử dụng
**isEmpty()/isNotEmpty()**

Ngoài cách kiểm tra 1 **collections** có bản ghi nào không bằng `count()` thì bạn có thể sử dụng` isEmpty()/isNotEmpty()`
```rust:js
collect([])->isEmpty();
// true

collect([])->isNotEmpty();
// false
```
**max()/min()**

`max()/min()` giúp bạn lấy ra field có giá trị lớn/nhỏ nhất trong một tập hợp **collections**
```html:js
$max = collect([['foo' => 10], ['foo' => 20]])->max('foo');
// 20
$min = collect([['foo' => 10], ['foo' => 20]])->min('foo');
// 10
```
**toArray()/toJson(**)

Chuyển từ dạng Object sang dạng mảng hoặc kiểu dữ liệu Json.
```perl:js
$collection = collect(['name' => 'G2', 'vote' => 200]);
$collection->toArray();

$collection = collect(['name' => SKT, 'vote' => 250]);
$collection->toJson();
```
**where()/whereIn()/whereNotIn()**

 Lọc **collections** theo key
```php:js
$collection = collect([
    ['name' => 'G2', 'vote' => 200],
    ['name' => 'SKT', 'vote' => 250],
]);
$filtered = $collection->where('vote', 200);
$filtered->all();
/*
    [
        ['name' => 'G2', 'vote' => 200],
    ]
*/
```
**map()**

Tạo ra 1 **collection** mới dựa trên 1 **collection** cũ với 1 số thay đổi

```c:js
$collection = collect([1, 2, 3, 4, 5]);
$multiplied = $collection->map(function ($item, $key) {
    return $item * 2;
});
$multiplied->all();
// [2, 4, 6, 8, 10]
```

**groupBy()**

Gộp các item của **collection** theo 1 **key** nhất định
```php:js
$collection = collect([
    ['account_id' => 'account-x10', 'product' => 'Chair'],
    ['account_id' => 'account-x10', 'product' => 'Bookcase'],
    ['account_id' => 'account-x11', 'product' => 'Desk'],
]);
$grouped = $collection->groupBy('account_id');
$grouped->toArray();
/*
    [
        'account-x10' => [
            ['account_id' => 'account-x10', 'product' => 'Chair'],
            ['account_id' => 'account-x10', 'product' => 'Bookcase'],
        ],
        'account-x11' => [
            ['account_id' => 'account-x11', 'product' => 'Desk'],
        ],
    ]
*/
```

**has()**

Cho phép kiểm tra một item có tồn tại trong collection hay không?
```shell:js
$collection = collect(['account_id' => 1, 'product' => 'Desk']);

$collection->has('email');

    // false
```
### Higher order messages
Hãy tưởng tượng chúng ta có một mảng dữ liệu lớn **invoices** và các bạn muốn tính **pay** cho từng **invoices**. Khi các bạn sử collection thì các bạn có đoạn code đơn giản như sau
```perl:js
$invoices->each(function($invoice) {
    $invoice->pay();
});
```
Với **Higher order messages** thì chúng ta có thể viết đơn giản như sau
```erlang:js
$invoices->each->pay()
```
Nếu ví dụ trên vẫn chưa thuyết phục được bạn sử dụng **Higher order messages** thì chúng ta cùng đến ví dụ 2 nhé :)
```javascript:js
$employees->reject(function($employee) {
    return $employee->retired; 
})->each(function($employee){
    $employee->sendPayment();
});
```
Với việc sử **Higher order messages** các bạn có thể viết đơn giản lại như sau
```erlang:js
$employees->reject->retired->each->sendPayment();
```
### Lazy Collection
**Lazy collection** sử dụng **PHP generators** để cho phép chúng ta làm việc với một tập dữ liệu rất lớn và giữ cho mức sử dụng bộ nhớ ở mức thấp. Ví dụ bạn làm việc với các phương thức **collection** truyền thống, khi các bạn làm việc trong một bộ dữ liệu cực lớn lên tới vài chục nghìn bản ghi, **collection** sẽ load chúng cùng một lúc, bùm lỗi quá tải bộ nhớ. Để khắc phục điều này chúng ta sử dụng method **cursor()**. Method này cho phép chỉ thực hiện 1 câu truy vấn duy nhất và chỉ 1 Eloquent model được load ra tại 1 thời điểm.
```html:js
// không sử dụng lazy collection
$users = App\User::all()->filter(function ($user) {
    return $user->id > 500;
});

// sử dụng lazy collection
$users = App\User::cursor()->filter(function ($user) {
    return $user->id > 500;
});

foreach ($users as $user) {
    echo $user->id;
}
```
### Read Large File
Ngoài ra chúng ta có thể sử dụng **lazy collection** để đọc hàng GB khổng lồ. Method make() dùng để tạo 1 lazy collection class object

Ví dụ, chúng ta lấy 4 bản ghi với method chuck(), load các bản ghi vào LogEntry model và lặp qua các bản ghi đó.
```markdown:js
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
Điểm chú ý ở đây chính là việc ta sử dụng hàm yield của php thay cho return như Collection. Thay vì dừng thực thi hàm và trả về (return), yield trả về giá trị khi giá trị đó cần sử dụng đến mà không lưu trữ tất cả các giá trị trong bộ nhớ.
## Kết luận
Trong bài viết này mình đã cùng các bạn tìm hiểu về Collections rất mong nhận được những đóng góp của các bạn để mình cải thiện bài viết !!!
## Link tham khảo
https://laravel.com/docs/5.8/collections

https://viblo.asia/p/laravel-collections-mot-so-methods-thong-dung-XL6lAPoBZek

https://viblo.asia/p/laravel-collection-MVpvKNQwkKd