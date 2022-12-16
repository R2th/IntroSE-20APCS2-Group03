Laravel 9 tiếp tục cải tiến được thực hiện trong Laravel 8.x bằng cách giới thiệu hỗ trợ cho các thành phần Symfony 6.0, Symfony Mailer, Flysystem 3.0, cải tiến `route:list` đầu ra, trình điều khiển cơ sở dữ liệu Laravel Scout, cú pháp Eloquent accessor / mutator, liên kết thông qua Enums và nhiều loại sửa các lỗi khác và cải tiến.
# PHP Version
Laravel 9 yêu cầu sử dụng phiên bản PHP 8,0 - 8,1 và Symfony 6.0
## Controller route groups
Bạn có thể sử dụng controller phương thức của lớp của Laravel 9 Route
```
use App\Http\Controllers\PostController;

Route::controller(PostController::class)->group(function () {
    Route::get('/post/{id}', 'show');
    Route::post('/post', 'store');
});
```
## Better accessors and mutators in Eloquent
Trong Laravel 9, bạn có thể sử dụng `Illuminate \ Database \ Eloquent \ Casts \ Attribute` để khai báo một tiền tố. Sử dụng một lệnh gọi phương thức, bây giờ bạn có thể vừa lấy và set thuộc tính.
```
use Illuminate\Database\Eloquent\Casts\Attribute;

public function username(): Attribute
{
  return new Attribute(
    get: fn ($value) => strtoupper($value),
    set: fn ($value) => $value,
  );
}
```
## Fulltext indexes and where clauses
Nếu bạn đang sử dụng `MySQL` hoặc `PostgreSQL` trong ứng dụng Laravel của mình, bây giờ bạn có thể sử dụng `fulltext` phương pháp trên định nghĩa cột trong `migration` của mình để tạo chỉ mục toàn văn bản.
```
$table->text('content')->fullText();
```

Sau đó, bạn có thể sử dụng các phương thức `whereFullText` và `orWhereFullText` để thêm vào câu truy vấn của mình.
```
$laravelPosts = DB::table('post')
           ->whereFullText('content', 'laravel')
           ->get();
```
## The new Scout database engine
Laravel v9 ra mắt với công cụ cơ sở dữ liệu Laravel Scout mới. Nó cung cấp khả năng tìm kiếm toàn văn bản cho các mô hình Eloquent. Công cụ này sẽ sử dụng các mệnh đề “where-like” khi lọc kết quả từ cơ sở dữ liệu của bạn.
Để sử dụng bạn chỉ cần thêm vào `model` của mình: `Laravel\Scout\Searchable`
```
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Article extends Model
{
    use Searchable;
}
```
## Breeze API with Next.js
Laravel v9 bao gồm triển khai giao diện người dùng Next.js trong Breeze. Bằng cách sử dụng bộ khung này, bạn có thể xây dựng các ứng dụng Laravel đóng vai trò như phần phụ trợ và giao diện người dùng JavaScript bằng cách sử dụng xác thực Laravel Sanctum.
## Inline Blade rendering
Nếu bạn cần chuyển đổi một mẫu Blade thành HTML, bây giờ bạn có thể làm điều đó với Blade nội tuyến.
```
use Illuminate\Support\Facades\Blade;

return Blade::render('Hello, {{ $name }}', ['name' => 'Stephan Miller']);
```
## New query builder interface
Giao diện trình tạo truy vấn mới trong Eloquent giúp bạn có thể nhập các truy vấn gợi ý Eloquent. Trước đây, rất khó để biết liệu bạn có đang xử lý hay không , hay để các developer đoán xem cần khắc phục điều gì bất cứ khi nào TypeError xuất hiện.
```
return Model::query()
  ->whereNotExists(function($query) {
    // $query is a Query\Builder
  })
  ->whereHas('relation', function($query) {
    // $query is an Eloquent\Builder
  })
  ->with('relation', function($query) {
    // $query is an Eloquent\Relation
  });
```
## Implicit route bindings with enums
Bây giờ bạn có thể nhập các gợi ý với một enum PHP trong Laravel của bạn. Sau đó, Laravel sẽ chỉ gọi ra biến trong enum hợp lệ trong URI và sẽ trả về 404 nếu một trong các enum không được tìm thấy.
```
enum Fruit: string
{
    case Apple = 'apple';
    case Cherry = 'cherry';
}
```
Sử dụng trong router
```
Route::get('/fruits/{fruit}', function (Fruit $fruit) {
    return $fruit->value;
});
```
## Forced scope route bindings
Laravel 9 có thể tự động xác định phạm vi truy vấn để truy xuất một mô hình lồng nhau bởi parent của nó bằng cách sử dụng các quy ước để đoán tên mối quan hệ kế thừa. Ví dụ:
```
use App\Models\Article;
use App\Models\User;

Route::get('/users/{user}/articles/{article}', function (User $user, Article $article) {
    return $article;
})->scopeBindings();
```
Bạn cũng có thể sử dụng các ràng buộc phạm vi
```
use App\Models\Article;
use App\Models\User;

Route::get('/users/{user}/articles/{article}', function (User $user, Article $article) {
    return $article;
})->scopeBindings();
```
## Bootstrap 5 pagination views
Thay vì việc viết phân trang của riêng mình bạn có thể phân trang với các chế độ xem phân trang trong Bootstrap 5.
```
use Illuminate\Pagination\Paginator;

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    Paginator::useBootstrapFive();
}
```
## New helpers
Laravel 9 đang sử dụng PHP 8, `\Illuminate\Support\Str` sẽ sử dụng các hàm chuỗi PHP 8, đi kèm với một số phương thức mới, bao gồm `str_contains`, `str_starts_with` và `str_ends_with`. Những trợ giúp mới bao gồm `append` và `snake`.