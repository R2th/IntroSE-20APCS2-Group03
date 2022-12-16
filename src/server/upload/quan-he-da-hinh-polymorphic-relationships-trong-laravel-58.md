Những lập trình viên chắc hẳn không xa lạ gì với việc tạo liên kết giữa các bảng trong database - hay người ta gọi là tạo các quan hệ giữa các bảng (relationships). Những kiểu quan hệ cơ bản như 1 - 1, 1 - nhiều, nhiều - nhiều đã khá là quen thuộc với chúng ta. Vậy nên hôm nay mình sẽ nói tới một kiểu mà có thể các bạn sinh viên sẽ thấy hơi lạ lẫm chút, đó là quan hệ đa hình (polymorphic relationships) trong laravel. 

# Giới thiệu
Trong laravel, quan hệ đa hình cho phép 1 Model có thể liên kết với nhiều hơn Model khác với chỉ 1 liên kết duy nhất (theo docs là *a single association*). Nghe xong nhiều bạn có thể chưa hiểu được rõ, vậy thì mình sẽ đi vào ví dụ cụ thể nhé :smile:

## Một - một (one to one)
### Cấu trúc bảng
Mối quan hệ một - một chắc các bạn cũng không còn lạ lẫm gì, một - một trong đa hình cũng như vậy, chỉ có điều là một Model có thể quan hệ với nhiều Model khác với chỉ một liên kết duy nhất. Ví dụ, giờ mình có 2 model là `Post` và `Product` và đều quan hệ với model `Image`. Nếu không dùng tới quan hệ đa hình thì ở trong mỗi bảng của model `Post` và `Product` đều phải thêm một cột là `image_id`. Nhưng giờ chúng ta sẽ có một câu trúc bảng như sau
```
posts
    id - integer
    title - string

products
    id - integer
    name - string

images
    id - integer
    url - string
    imageable_id - integer
    imageable_type - string
```

Cột `imageable_id` sẽ chứa id của post hoặc product, cột `imageable_type` sẽ chứa tên của model, ví dụ nếu quan hệ với bảng posts thì sẽ là: `App\Post`

### Cấu trúc Model
Model Image:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

    public function imageable()
    {
        return $this->morphTo();
    }
}
```

Model Product:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }
}
```

Model Post:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }
}
```

Giờ đây, thay vì dùng `hasOne()` và `belongTo()` thì chúng ta có `morphOne()`, `morthTo()`

### Sử dụng
Khi mà đã hoàn thành xong database và model thì chúng ta sẽ làm thế nào để sử dụng được quan hệ đa hình này đây? Thực chất thì cách sử dụng cũng giống với quan hệ 1 - 1 thông thường. Để lấy ra ảnh của bài viết:
```php
$post = App\Post::find(1);

$image = $post->image;
```

Ngược lại, nếu từ ảnh mà bạn muốn tìm ra bài viết hoặc sản phẩm:
```php
$image = App\Image::find(1);

$imageable = $image->imageable;
```

## Một nhiều (one to many)

## Cấu trúc bảng
Về mặt lý thuyết thì nó cũng như quan hệ 1 - nhiều vậy, nhưng vì là đa hình nên đương nhiên nó sẽ có thể quan hệ được với nhiều bảng và quan trọng nhất là với một liên kết (nghe từ một liên kế này chắc các bạn cũng chán rồi :smile:, nhưng đó chính là sự khác biệt của đa hình mà). Thôi cứ dùng ví dụ trực quan là dễ hiểu nhất phải không. Vẫn sẽ là bài viết và sản phẩm, giờ chúng ta có chức năng bình luận. Chúng ta sẽ không phải chia thành nhiều bảng `comments` hay phải định nghĩa riêng trong từng bảng `posts` hay `products` mà chỉ cần duy nhất 1 bảng `comments`
```
posts
    id - integer
    title - string

products
    id - integer
    namestring

comments
    id - integer
    body - text
    commentable_id - integer
    commentable_type - string
```

Nhìn cấu trúc cũng không khác gì ở trên nên mình sẽ không giải thích lại nhé :v 

## Cấu trúc Model
Model Comment:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function commentable()
    {
        return $this->morphTo();
    }
}
```

Model Post:
```php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }
}
```

Model Product:
```php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }
}
```

### Sử dụng
Để lấy ra tấ cả comments của 1 post
```php
$post = App\Post::find(1);

foreach ($post->comments as $comment) {
    \\
}
```

Ngược lại
```php
$comment = App\Comment::find(1);

$commentable = $comment->commentable;
```

## Nhiều nhiều (many to many)
### Cấu trúc bảng
Cái này sẽ phức tạp hơn một chút so với 2 cái ở trên. Nhưng nếu bạn đã nắm vững và quan hệ nhiều nhiều thông thường thì chắc vẫn sẽ ez thôi :smile:. Ví dụ của chúng ta lần này sẽ về tag. Các bạn vào nhưng trang web thì chắc không lạ lẫm gì với việc có những tag đính kèm bài viết hoặc sản phẩm đúng không. Trong bài viết và sản phẩm đều có thể sử dụng nhiều tag, và 1 tag có thể sử dụng ở nhiều sản phẩm, bài viết. Do đó chúng ta sẽ có cấu trúc bảng như dưới đây:
```
posts
    id - integer
    title - string

products
    id - integer
    name - string

tags
    id - integer
    name - string

taggables
    tag_id - integer
    taggable_id - integer
    taggable_type - string
 ```
 
 ### Cấu trúc Model
 Model Post:
 ```php
 <?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }
}
```
<br>
 Model Product:
 
 ```php
 <?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }
}
```
<br>

 Model Tag:
 ```php
 <?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function posts()
    {
        return $this->morphedByMany('App\Post', 'taggable');
    }

    public function products()
    {
        return $this->morphedByMany('App\Product', 'taggable');
    }
}
```

### Sử dụng
Lấy các tag của một bài viết
```php
$post = App\Post::find(1);

foreach ($post->tags as $tag) {
    //
}
```

Ngược lại
```php
$tag = App\Tag::find(1);

foreach ($tag->posts as $post) {
    //
}
```

# Custom Polymorphic type
Mặc định, Laravel sẽ sử dụng toàn bộ tên class (bao gồm cả đường dẫn thư mục) và lưu vào database (các cột như là `taggable_type` hay `imageable_type` đó). Tuy nhiên, bạn có thể muốn tách rời database khỏi cấu trúc của ứng dụng. Trong trường hớp đó, bạn có thể định nghĩa `morph map` để có thể sử dụng tên custom của từng model thay vì tên đầy đủ:

```php
use Illuminate\Database\Eloquent\Relations\Relation;

Relation::morphMap([
    'posts' => 'App\Post',
    'products' => 'App\Product',
]);
```

Bạn có thể đăng ký `morphMap` ở trong `boot` function của `AppServiceProvider` hoặc tạo riêng một service provider. 

**Lưu ý**: Nếu bản sử dụng `morphMap` ở một project đã hoạt động từ trước thì bạn cần phải thay đổi tất cả morphable *_type trong database thành tên trong map.

**Bài viết tham khảo:** https://laravel.com/docs/5.8/eloquent-relationships