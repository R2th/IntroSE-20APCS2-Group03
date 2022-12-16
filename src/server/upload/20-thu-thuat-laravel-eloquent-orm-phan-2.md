Trong phần trước mình đã giới thiệu với các bạn 10 thủ thuật trong Laravel Eloquent. Ngày hôm nay chúng ta sẽ cùng nhau tìm hiểu nốt về 10 thủ thuật cuối cùng nhé
## 11. Order by Mutator
Hãy tưởng tượng bạn có đoạn code này:
```php
function getFullNameAttribute()
{
  return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
}
```
Và bây giờ bạn muốn order theo `full_name`. Điều đó là không thể
```php
$clients = Client::orderBy('full_name')->get(); // doesn't work
```
Giải pháp cho vấn đề này vô cùng đơn giản. Chúng ta sẽ order kết quả sau khi đã lấy chúng ra từ database:
```php
$clients = Client::get()->sortBy('full_name'); // works!
```
Sự khác nhau giữa `orderBy` và `sortBy` là `orderBy` thực hiện order ở cấp query trong khi `sortBy` thực hiện nó ở tầng object.
## 12. Default ordering in global scope
Điều gì sẽ xảy ra khi bạn muốn mỗi lần gọi `User::all()` chúng ta sẽ được một danh sách các users đã được order theo `name`. Hãy cùng trở lại với phương thức`boot()` mà mình đã giới thiệu với các bạn ở phần trước.
```php
protected static function boot()
{
    parent::boot();

    // Order by name ASC
    static::addGlobalScope('order', function (Builder $builder) {
        $builder->orderBy('name', 'asc');
    });
}
```
Tìm hiểu thêm về [Query Scopes](https://laravel.com/docs/5.6/eloquent#query-scopes) tại đây.
## 13. Raw query methods
Đôi khi bạn cần viết một câu query thuần. May mắn là Eloquent cung cấp cho chúng ta rất nhiều function để làm điều đó:
```php
// whereRaw
$orders = DB::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();

// havingRaw
Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();

// orderByRaw
User::where('created_at', '>', '2016-01-01')
  ->orderByRaw('(updated_at - created_at) desc')
  ->get();
  ```
##   14. Replicate: make a copy of a row
Có lẽ không cần phải giải thích gì nhiều, cách tốt nhất để tạo ra một bản sao của một model object là:
```php
$task = Tasks::find(1);
$newTask = $task->replicate();
$newTask->save();
```
## 15. Chunk() method for big tables
Không hẳn là liên quan đến Eloquent, nó có vẻ liên quan đến Collection nhiều hơn, nhưng vẫn rất hữu ích khi bạn cần xử lý một lượng lớn dữ liệu. Bạn có thể tách chúng ra thành từng phần nhỏ.

Thay vì thực hiện:
```php
$users = User::all();
foreach ($users as $user) {
    // ...
}
```
Chúng ta sẽ làm điều này:
```php
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```
## 16. Create additional things when creating a model
Chúng ta đều đã quá quen thuộc với  `Artisan command` này:
```php
php artisan make:model Company
```
Nhưng bạn có biết rằng còn có 3 flags hữu dụng khác nữa liên quan đến việc tạo mới model đó ?
```php
php artisan make:model Company -mcr
```
Trong đó:

- `m` sẽ tạo file migration
- `c` sẽ tạo controller tương ứng
- `r` sẽ thông báo rằng controller là một resourceful
## 17. Override updated_at when saving
Bạn có biết rằng phương thức `save()` có thể nhận thêm parameters. Thực tế là chúng ta có thể bỏ qua việc thay đổi trường `updated_at` - một chức năng mặc định được thực hiện bất chứ khi nào một record trong database có thay đổi.
```php
$product = Product::find($id);
$product->updated_at = '2019-01-01 10:00:00';
$product->save(['timestamps' => false]);
```
Ở đây chúng ta đã tự thay đổi trường `updated_at` theo ý mình.
## 18. What is the result of an update()?
Đã bao giờ bạn tự hỏi thứ gì sẽ được trả về sau khi chạy đoạn code này hay không?
```php
$result = $products->whereNull('category_id')->update(['category_id' => 2]);
```
Ý tôi là đoạn code trên sẽ thực hiện việc update nhưng sau đó thì chúng ta sẽ nhận lại được gì?
Câu trả lời là **số dòng trong database bị ảnh hưởng** sau câu lệnh update. Nếu như bạn cần kiểm tra xem đã có bao nhiêu dòng bị ảnh hưởng, bạn sẽ chẳng phải làm gì khác nữa cả vì phương thức `update()` đã trả lại con số đó giúp bạn rồi.
## 19. Transform brackets into an Eloquent query
Điều gì sẽ xảy ra khi trong câu query của bạn có các toán tử `and-or` kết hợp với nhau:
```php
... WHERE (gender = 'Male' and age >= 18) or (gender = 'Female' and age >= 65)
```
Làm thế nào để chuyển nó về dạng của Eloquent? Đây là một cách làm sai:
```php
$q->where('gender', 'Male');
$q->orWhere('age', '>=', 18);
$q->where('gender', 'Female');
$q->orWhere('age', '>=', 65);
```
Thứ tự các câu query là không chính xác. Cách làm đúng đắn sẽ hơi phức tạp một chút, đó là sử dụng` closure functions` giống như `sub-queries`:
```php
$q->where(function ($query) {
    $query->where('gender', 'Male')
        ->where('age', '>=', 18);
})->orWhere(function($query) {
    $query->where('gender', 'Female')
        ->where('age', '>=', 65); 
})
```
## 20. orWhere with multiple parameters
Điều cuối cùng mà mình muốn chia sẻ với các bạn đó là việc truyền một array vào trong phương thức `orWhere()`.
Đây là cách chúng ta thường làm:
```php
$q->where('a', 1);
$q->orWhere('b', 2);
$q->orWhere('c', 3);
```
Thay vào đó bạn có thể làm điều này:
```php
$q->where('a', 1);
$q->orWhere(['b' => 2, 'c' => 3]);
```
## Summary
Như vậy mình đã giới thiệu tới các bạn 20 tips trong Laravel Eloquent. Hi vọng bài viết sẽ giúp các bạn biết thêm về những chức năng mạnh mẽ ẩn giấu trong Eloquent cũng như việc hiểu rõ chúng để có thể sử dụng chúng hiệu quả hơn.

**Nguồn bài viết:** [20 Laravel Eloquent Tips and Tricks](https://laravel-news.com/eloquent-tips-tricks)

Blog: https://www.dnlblog.com/posts/20-thu-thuat-laravel-eloquent-orm