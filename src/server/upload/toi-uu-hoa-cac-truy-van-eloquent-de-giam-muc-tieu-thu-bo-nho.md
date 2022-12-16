### Giới thiệu
* Laravel đã phát triển một cách mạnh mẽ, vượt qua những framework khác và vươn lên trở thành framework PHP có thể nói được ưa chuộc và được cộng đồng sử dụng nhiều nhất khi phát triển web với PHP. Một trong những lợi thế chính của nó là code gọn ngàng và có trật tự.
* Trong Laravel, có thể phát triển các ứng dụng chuyên nghiệp trong một thời gian rất ngắn. Composer bổ sung những tính linh hoạt với việc quản lý các gói back-end cùng với NPM trong front-end sử dụng Laravel Mix. 
* Nó cũng có một ORM mạnh mẽ cho phép bạn truy vấn cơ sở dữ liệu một cách trơn tru và hiệu quả.
* Trong bài viết này, **Eloquent ORM** sẽ là chủ đề chính và sẽ giải thích cách tối ưu hóa các truy vấn tới cơ sở dữ liệu để giảm mức tiêu thụ bộ nhớ.
* Code sử dụng để test ở link này: [Optimization](https://github.com/barbosa89/optimization)
### Môi trường thử nghiệm
Bạn cần phải cài những một số thứ dưới đây:
* Xubuntu 18.04 LTS
* PHP 7.2
* MySQL >= 5.7
* Apache >= 2.4
* Laravel >= 5.6
* Laravel DebugBar
### Mô tả vấn đề
Chắc chắn, Eloquent ORM là rất mạnh mẽ nhưng để có thể tận dụng tối đa nó, nó là cần thiết để thực hiện một số thực hành tốt khi truy vấn vào cơ sở dữ liệu. Ví dụ:
```php
<?php 

use App\User;

$users = User::all();
```
Bên trong, Laravel đợi một loạt các tham số dưới dạng một mảng, vì nó không nhận được như mong đợi, thực thi ký tự đại diện dấu hoa thị (*) để chọn tất cả các cột.

`static Collection|Model[] all(array|mixed $columns = ['*'])`

![](https://images.viblo.asia/d614d43e-12f8-4c48-8ce5-5918f49715bf.png)
### Tại sao không sử dụng ký tự đại diện dấu hoa thị (*) trên MySQL
Lý do cơ bản là hiệu suất và sự an toàn:
* Ký tự đại diện dấu hoa thị chỉ dành cho development và testing.
* Công cụ MySQL thực hiện các truy vấn bổ sung khi sử dụng ký tự đại diện này.
* Các cột được chọn có thể không được yêu cầu hoặc không sử dụng đến.
* Lưu lượng không cần thiết được thực hiện giữa MySQL và application.
* Hiệu suất của ứng dụng bị tổn hại khi số lượng người dùng tăng lên.
* Tốc độ xử lý chậm khi các câu truy vấn lấy ra các trường không cần thiết

### Ví dụ
Tiếp theo, các truy vấn rất điển hình được hiển thị trong các web applications được sử dụng bằng Laravel:

**Truy vấn tất cả các bản ghi trong bảng người dùng**
```php
<?php 

use App\User;

# Wrong
$users = User::all();

# Right
$users = User::all(['id', 'name', 'email']);
```

**Lấy tất cả các bản ghi của bảng người dùng với các bài viết của từng người dùng bằng cách sử dụng Eager Loading**
```php
<?php 

use App\User;

# Wrong
$users = User::with('posts')->get();

# Right
$users = User::with([
    'posts' => function ($query) {
        $query->select('id', 'title', 'content', 'user_id');
    }
])->get(['id', 'name', 'email']);
```
**Truy vấn tất cả các bài post với các model quan hệ**
```php
<?php 

use App\Post;

# Wrong
$posts = Post::with(['images', 'tags', 'user'])->get();

# Right
$posts = Post::with([
        'tags' => function ($query) {
            $query->select('id', 'name'); # Many to many
        }, 
        'images' => function ($query) {
            $query->select('id', 'url', 'post_id'); # One to many
        }, 
        'user' => function ($query) {
            $query->select('id', 'name'); # One to many
        }
    ])->get(['id', 'title', 'content', 'user_id']);
```
**Truy vấn tất cả bài post có phân trang**
```php
<?php 

use App\Post;

# Wrong
$posts = Post::paginate(30);

# Right
$posts = Post::paginate(30, ['id', 'title', 'content', 'user_id']);
```
Bạn có thể invoke phương thức **with** trước phương thức **paginate** để load các model quan hệ.

**Tìm kiếm một bài post**
```php
<?php 

use App\Post;

# Wrong
$post = Post::findOrFail($id);

# Right
$post = Post::findOrFail($id, ['id', 'title', 'content']);
```
**Tìm kiếm một bài post sử dụng where**
```php
<?php 

use App\Post;

# Wrong
$post = Post::where('id', $id)->first();

# Right
$post = Post::where('id', $id)->first(['id', 'title', 'content']);
```
Sử dụng mệnh đề **Where** bạn có thể tìm kiếm nhiều bài viết với phương thức Get, nó sẽ trả về một tập hợp các object, trong khi các phương thức **First** và **Find** trở thành một object.

**Tìm kiếm bài post của người dùng được xác thực bằng các model quan hệ**
```php
<?php 

use App\User;
use App\Post;

# Wrong
$posts = User::find(auth()->user()->id)->posts()
    ->with(['images', 'tags', 'user'])
    ->get();

# Right
$posts = User::find(auth()->user()->id)->posts()
    ->with([
        'tags' => function ($query) {
            $query->select('id', 'name'); # Many to many
        }, 
        'images' => function ($query) {
            $query->select('id', 'url', 'post_id'); # One to many
        }, 
        'user' => function ($query) {
            $query->select('id', 'name'); # One to many
        }
    ])->get(['id', 'title', 'content', 'user_id']);
```
Nó có thể áp dụng để tìm kiếm bất kỳ đăng ký liên quan nào đến người dùng đã được xác thực.
**Truy vấn nâng cao**
```php
<?php 

use App\Invoice;

# Wrong
$invoice = Invoice::where('id', $id)
    ->with([
        'products',
        'products.subcategory',
        'products.subcategory.category',
        'customer',
    ])->first();

# Right
$invoice = Invoice::where('id', $id)
    ->with([
        'products' => function ($query) {
            $query->select('id', 'price', 'description', 'subcategory_id')
                ->withPivot('quantity', 'subvalue', 'taxes', 'value');
        },
        'products.subcategory' => function ($query) {
            $query->select('id', 'name', 'category_id');
        },
        'products.subcategory.category' => function ($query) {
            $query->select('id', 'name');
        },
        'customer' => function ($query) {
            $query->select('id', 'name', 'lastname', 'dni', 'addrress', 'phone');
        },
    ])->first(['id', 'subvalue', 'taxes', 'value', 'customer_id']);
```
### Tests executed
Dữ liệu được sử dụng:
* 50 users
* 1000 posts
* 2000 tags
* 1000 images

**Truy vấn tất cả người dùng có bài post**

*Wrong*
![](https://images.viblo.asia/2ca5cf3f-f645-4e9d-a98e-2b6b145e21c8.png)
*Right*
![](https://images.viblo.asia/dc955ba1-23cd-4ec7-9f71-54d6dea8f06b.png)
*Khác nhau*
* Memory: 0.36 Mb
* Time: 158,47 ms

**Truy vấn tất cả các bài post với các model quan hệ**

*Wrong*
![](https://images.viblo.asia/61141a79-d232-40d1-a002-9d935b6c4bd6.png)
*Right*
![](https://images.viblo.asia/1a6ffe19-b8cb-4a04-b4fb-a300423f4030.png)
*Khác nhau*
* Memory: 0.38 Mb
* Time: 177,45 ms
### Kết luận
Vì đây là môi trường thử nghiệm ở local nên sự khác biệt không cao lắm. Tuy nhiên, trong các ứng dụng thực tế, các tiêu thụ bộ nhớ này cao hơn nhiều và có thể quan sát thấy hiệu suất của server sẽ giảm. Nếu những kết quả này được nhân với số lượng người dùng đáng kể có thể truy cập vào ứng dụng, vấn đề sẽ trở nên đáng chú ý hơn. Trong mọi trường hợp, không nên sử dụng ký tự đại diện dấu hoa thị (*) cho môi trường sản xuất và rất có khả năng nếu ứng dụng web phát triển, server sẽ bị bão hòa.
### Mẹo để tăng hiệu suất 
**Các lệnh quan trọng từ Laravel artisan**

* Laravel <= 5.5
```
php artisan optimize
```
* Laravel > 5.5
```
php artisan config:cache

php artisan route:cache
```
* Sử dụng package [Laravel Page Speed](https://github.com/renatomarinho/laravel-page-speed)

*Nguồn tham khảo:* (https://omarbarbosa.com/optimization-of-eloquent-queries-to-reduce-memory-consumption-cjvag)