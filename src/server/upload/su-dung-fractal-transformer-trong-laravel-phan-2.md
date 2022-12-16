Chào các bạn, hôm nay mình lại tiếp tục giới thiệu về sử dụng Fractal/Transformer. Ở [phần 1](https://viblo.asia/p/su-dung-fractal-transformer-trong-laravel-phan-1-bWrZnNYwZxw) mình đã giới thiệu qua về cách sử dụng. 
Chắc hẳn nhiều bạn cũng đã sử dụng công cụ này rồi. :D Mình xin vào luôn phần chính nhé. 
### Giới thiệu về Transformers
Transformers là một công cụ giúp chúng ta có thể format dữ liệu trả về của api theo một cách mà chúng ta mong muốn nhất. Tức là Transformers sẽ là một lớp ở giữa, giúp chuyển đổi dữ liệu từ các Model trước khi phía Client nhận được. <br> 
### Ví dụ

Cài đặt project Laravel: 
```
composer create-project --prefer-dist laravel/laravel ten-project
```
Các bạn nhớ config lại thông tin kết nối `db` trong file .env nhé.<br>
Giờ chúng ta sẽ tạo migrations. Để minh họa cho ví dụ thì mình sẽ tạo một bảng `Post`, một bảng `Comment` và bảng `User`.
Ở đây mình sẽ làm như sau:

```
php artisan make: model Post -mc
php artisan make: model Comment -mc
```
Tham số `mc` ở đây tức la mình muốn tạo ra thêm migration cùng với controller.
<br>Dữ liệu mình thêm cũng không có gì nhiều.  

Bảng Post: 
```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->increments('id');
        $table->unsignedInteger('user_id');
        $table->string('title');
        $table->string('contents');
        $table->timestamps();
    });
}
```
Bảng Comment: 
```php
public function up()
{
    Schema::create('comments', function (Blueprint $table) {
        $table->increments('id');
        $table->unsignedInteger('user_id');
        $table->unsignedInteger('post_id');
        $table->string('contents');
        $table->timestamps();
    });
}
```
Giờ thêm Relation cho các bảng như sau:<br>Model Post:
```php
public function comments()
{
    return $this->hasMany(Comment::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}
```
Model Comment:
```php
public function post()
{
    return $this->hasMany(Post::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}
```
Model User:
```php
public function posts()
{
    return $this->hasMany(Post::class);
}

public function comments()
{
    return $this->hasMany(Comment::class);
}
```
Các bạn hãy tự tạo `seeder` hoặc  sử dụng `Laravel tinker` để tạo data nhé. 
Sau khi các bạn đã có dữ liệu. Giờ chúng ta bắt đầu cài đặt Transformers: 
```
composer require spatie/laravel-fractal
```
Giờ test thôi :D  <br> Thử viết 1 api lấy các bài post xem nào: 

```php
Route::get('posts', 'PostController@index');
```
Controller:
```php
$post = Post::all();
```
Nhớ là phải tạo seeder đấy nha. :D <br>
Giờ chúng ta sẽ tạo transformers cho dữ liệu `posts`.
Ở đây mình sẽ tạo thêm 1 folder Transformers. Trong này sẽ có một file mình đặt tên là `PostTransformers.php` như sau:
```php
<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Post;

class PostTransformers extends TransformerAbstract
{
    public function transform(Post $post) 
    {
        return [
            'id' => $post->id,
            'user_id' => $post->user_id,
            'title' => $post->title,
            'contents' => $post->contents,
        ];
    }
}
```

Có vẻ có gì đó không ổn. Thế nhỡ muốn tìm xem ai viết bài thi làm sao nhỉ. Ở đây Fractal\Transformer cho phép chúng ta có thể Includes Data. Ví dụ, nếu bạn muốn lấy thông tin của user hoặc comment liên quan đến bài post này. Chúng ta có 2 cách khai báo như sau:
<br>Cách 1:
```php
protected $availableIncludes = ['user'];

public function transform(Post $post) 
{
    return [
        'id' => $post->id,
        'user_id' => $post->user_id,
        'title' => $post->title,
        'contents' => $post->contents,
    ];
}

public function includeUser(Post $post)
{
    $user = $post->user;

    return $this->item($user, new UserTransformers);
}
```

Chúng ta thấy được ở đây, post của chúng ta đã lấy được user bằng relation `$post->user` , sau đó dữ liệu tiếp tục được trả về qua UserTransformers.
<br>
UserTransformers:
```php
<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\User;

class UserTransformers extends TransformerAbstract
{
    public function transform(User $user) 
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
```

Tiếp, để có thể trả về được kết quả là các bài post cùng với user của bài post đó thì bên Controller ta sẽ xử lý như sau:
```php
$posts = Post::paginate(5);

return fractal()->collection($posts)
    ->transformWith(new PostTransformers)
    ->parseIncludes('user')
    ->toArray();
```

Hàm `parseIncludes` giúp chúng ta có thể lấy ra user, nơi mà trong Transformer đã định nghĩa 1 biến `$availableIncludes = ['user']`. Có nghĩa nếu PostController sử dụng phương thức `parseIncludes` thì nó xử lý dữ liệu mà PostTransformers đã dùng `$availableIncludes`. 

Cách 2: 
```php
protected $defaultIncludes = ['user'];

public function transform(Post $post) 
{
    return [
        'id' => $post->id,
        'user_id' => $post->user_id,
        'title' => $post->title,
        'contents' => $post->contents,
    ];
}

public function includeUser(Post $post)
{
    $user = $post->user;

    return $this->item($user, new UserTransformers);
}
```

Các bạn có thấy chữ `default` trong `defaultIncludes` không? Nếu bạn khai báo theo kiểu này, thì dù bên Controller bạn không gọi phương thức `parseIncludes('user')` nó cũng sẽ mặc định trả về user cho bạn rồi. Vậy nên tùy tình huống mà bên nên sử dụng `availableIncludes` hay `defaultIncludes`. <br>

Tiếp theo, mình xin giới thiệu thêm một điều nhỏ nữa đó là sử dụng Transformer kết hợp với phân trang.
Để làm được điều này bạn chỉ cần thêm vào file xử lý như sau <br>`use League\Fractal\Pagination\IlluminatePaginatorAdapter;` và phương thức `paginateWith`
<br> Ví dụ:
```php
//PostController
public function index()
{
    $posts = Post::paginate(5);
    
    return fractal()->collection($posts)
    ->transformWith(new PostTransformers)
    ->parseIncludes('user')
    ->paginateWith(new IlluminatePaginatorAdapter($posts))
    ->toArray();
}
```
### Lời kết <br>
Hiện nay, Transformers đã rất gần gũi đối với các lập trình viên. Nó dễ dàng sử dụng, dễ hiểu, và quan trọng là sử dụng cảm thấy có hiệu quả ngay lập tức. 
Bài viết của mình xin dừng lại tại đây. Mong nhận được sự theo dõi của các bạn. <br>
Các bạn có thể xem thêm  các thông về Fractal/Transformer tại [đây](https://fractal.thephpleague.com/transformers/). Tạm biệt!