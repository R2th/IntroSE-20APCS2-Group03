Laravel đã được cập nhật lên phiên bản 6.0. Laravel 6.0 với nhiều thay đổi, tính năng mới tuyệt vời mà bạn không thể bỏ qua. Trong bài viết này hãy cũng tìm hiểu về những cải tiến của Eloquent Subquery nhé. ![Dog](https://nobi.dev/images/doge.png "This a a dog")

## "Select" subqueries

Pull request [#29567](https://github.com/laravel/framework/pull/29567) hổ trợ chèn subquery khi sử dụng hai method `select()` và `addSelect()` của query builder.

Hãy tượng tượng chúng ta có một bảng `destinations` chứa các điểm đến của các chuyến bay và một bảng `flights` chứa các chuyển bay. Bảng `flights` chứa cột `arrived_at` cho biết chuyến bay đến đích khi nào.

Sử dụng chức năng `select` kèm subquery mới ở `Laravel 6.0`, chúng ta có thể chọn tất cả các điểm đến và tên của chuyến bay gần đây nhất đã đến đích đó bằng một truy vấn duy nhất sau đây !

```php
return Destination::addSelect(['last_flight' => Flight::select('name')
    ->whereColumn('destination_id', 'destinations.id')
    ->orderBy('arrived_at', 'desc')
    ->limit(1)
])->get();
```

Thật tuyệt vời, code thật đẹp và cú pháp dễ hiểu phải không nào. Không chỉ Eloquent, bạn cũng có thể sử dụng tính năng mới này với query builder:

```php
return Destination::addSelect(['last_flight' => function ($query) {
    $query->select('name')
        ->from('flights')
        ->whereColumn('destination_id', 'destinations.id')
        ->orderBy('arrived_at', 'desc')
        ->limit(1);
}])->get();
```

## "Order by" subqueries

Ngoài ra, pull request [#29563](https://github.com/laravel/framework/pull/29563) cho phép bạn sử dụng subquery trong phương thức truy vấn `orderBy()` của query builder. Tiếp tục ví dụ của chúng ta ở trên, chúng ta có thể sử dụng tính năng này để sắp xếp các điểm đến dựa trên thời điểm chuyến bay cuối cùng đến điểm đến đó.

```php
return Destination::orderByDesc(
    Flight::select('arrived_at')
        ->whereColumn('destination_id', 'destinations.id')
        ->orderBy('arrived_at', 'desc')
        ->limit(1)
)->get();
```

Cũng như với truy vấn `select`, bạn cũng có thể sử dụng trực tiếp query builder để tạo các subquery. Ví dụ: có thể bạn muốn sắp xếp người dùng dựa trên ngày đăng nhập cuối cùng của họ:

```php
return User::orderBy(function ($query) {
    $query->select('created_at')
        ->from('logins')
        ->whereColumn('user_id', 'users.id')
        ->latest()
        ->limit(1);
})->get();
```

## "From" subqueries

Cuối cùng, pull request [#29602](https://github.com/laravel/framework/pull/29602) cho phép sử dụng subquery bên trong method `from()` của query builder:

Ví dụ: có thể bạn muốn tính tổng số donations trung bình được thực hiện bởi người dùng trong ứng dụng của bạn. Tuy nhiên, trong SQL, không thể lồng các hàm tổng hợp như sau:

```sql
AVG(SUM(amount))
```

Thay vào đó, chúng ta có thể sử dụng một subquery để tính toán điều này:

```php
return DB::table(function ($query) {
    $query->selectRaw('sum(amount) as total')
        ->from('donations')
        ->groupBy('user_id');
}, 'donations')->avg('total');
```

Một thay đổi đáng chú ý nếu bạn đang sử dụng Eloquent bên ngoài Laravel, đó là có sử thay đổi của method `table()` bên trong class `Illuminate/Database/Capsule/Manager`. Nó được thay đổi từ `table($table, $connection = null)` sang `table($table, $as = null, $connection = null)`.

Những tính năng thật tuyệt vời phải không các bạn, chúc các bạn vui vẻ. ![ahihi](/images/aigo2.gif)

Nguồn: 
[https://laravel-news.com/eloquent-subquery-enhancements](https://laravel-news.com/eloquent-subquery-enhancements "https://laravel-news.com/eloquent-subquery-enhancements")