Nếu các bạn đã học về `cơ sở dữ liệu` thì hẳn mọi người đều biết giữa các bảng có liên kết với nhau. Ở trong `Laravel` chũng cung cấp cho chúng các `Relationships` giúp việc truy vấn trở nên dễ dàng hơn.

# 1. One to One
- Đây là kiểu quan hệ đơn giản nhất, nó thể hiện cho việc `một người có một thứ và thứ đó chỉ thuộc về người này`.
- Như bạn có bảng `users` và bảng `phones` thì một `user` có 1 cái điện thoại và `phone` đó chỉ thuộc về `user` đó.
- Trong `laravel` để tạo quan hệ cho 2 model có quan hệ `One to One` ta sử dụng phương thức `hasOne`.
```PHP
<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class User extends Model
{
    /**
     * Get the phone associated with the user.
     */
    public function phone()
    {
        return $this->hasOne(Phone::class);
    }
}
```
- Sau khi tạo `quan hệ` xong ta có thể truy vấn tới `phone` mà có `user` có tên là `Nguyen Van A` như sau:
```PHP
User::where('name', 'Nguyen Van A')->phone;
```
- Ngoài ra bạn cũng có thể định nghĩa khóa ngoại cho quan hệ này bằng cách thêm tham số thứ 2:
```php
return $this->hasOne(Phone::class, 'foreign_key');
```

- Ngược lại đối với model `Phone` ta sử dụng phương thức `belongsTo` để định nghĩa `Inverse` với model `User`:
```PHP
<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Phone extends Model
{
    /**
     * Get the user that owns the phone.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```
- Giống với  model `User` bạn cũng có thể định nghĩa khóa ngoại bằng cách thêm tham số thứ 2 và tất nhiên là bạn cũng có thể truy vấn tới `user` tương ứng.

# 2. One to Many
- Quan hệ này biểu thị cho mối quan hệ `cha-con`. Ví dụ như một `user` có nhiều `posts` nhưng các bài `post` chỉ thuộc một `user`.
- Mối quan hệ này được biểu diễn như sau:
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
```
- Giống với quan hệ `One to One` bạn cũng có thể thêm tham số thứ 2 để định nghĩa khóa ngoại.
- Và bạn cũng phải định nghĩa `Inverse` cho model `Post`
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

# 3. Many to Many
- Quan hệ này phức tạp hơn 2 quan hệ `One to One` và `One to Many` ví như một `Product` sẽ thuộc nhiều `Orders` và một `Order` cũng có nhiều `Products`.
- Để biểu diễn được quan hệ này thì chúng ta phải có một bảng thứ 3 là `product_order` và chưa 2 trường là `product_id` và `order_id`.
- Sau khi có bảng trung gian thì chúng ta định nghĩa quan hệ này thông qua phương thức `belongsToMany` ở cả 2 model.
```PHP
namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }
}
```
```PHP
namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function product()
    {
        return $this->belongsToMany(Product::class);
    }
}
```
- Và để định nghĩa khóa ngoại thì bạn cần thêm tham số thứ 2, thứ 3 và thứ 4.
- Trong đó:

    - `Tham số thứ 2` tương ứng với bảng trung gian.
    - `Tham số thứ 3` và `tham số thứ 4` tương ứng với khóa ngoại của 2 bảng cần tạo quan hệ.

```PHP
namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'product_order', 'product_id', 'order_id');
    }
}
```
- Tất nhiên trong một số trường hợp thì bảng trung gian của bạn cũng có thể có thêm các trường khác nữa thì trong `Laravel` cung cấp cho bạn một phương thức là `pivot` để lấy ra các trường đó. ví dụ:
```PHP
$product = Product::find(1);

foreach($product->orders as $order)
{
    echo $order->pivot->created_at;
}
```
- Để có thể lấy được thì bạn cần phải định nghĩa tròng model như sau:
```PHP
namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('total_price');
    }
}
```

# 4. Các quan hệ nâng cao
- Ngoài 3 quan hệ cơ bản ở trên thì `laracel` có cung cấp thêm cho bạn các quan hệ nâng cao khác.
## 4.1 Has One Through
- Đây là một mối quan hệ liên kết các bảng với nhau thông qua một bảng trung gian Ví dụ có 3 bảng:
```
users
    id - integer
    supplier_id - integer

suppliers
    id - integer

history
    id - integer
    user_id - integer
```
- Mặc dù bảng `history` không chứa `supplier_id` nhưng chúng ta vẫn có thể truy cập đến lịch sử của user đó bới mối quan hệ `hasOneThrough` như sau:
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    public function userHistory()
    {
        return $this->hasOneThrough(History::class, User::class);
    }
}
```
- Với tham số thứ nhất được truyền vào là tên của model mà chúng ta muốn truy cập, tham số thứ 2 là model trung gian.
- Còn ở hai bảng `user` và `history` chúng ta định nghĩa như bình thường.
## 4.2 Has Many Through
- Mối quan hệ `has many through` này cung cấp cho chúng ta cách truy cập bảng liên kết dễ dàng hơn thông qua bảng trung gian.
```
teams
    id - integer
    name - string

users
    id - integer
    team_id - integer
    name - string

posts
    id - integer
    user_id - integer
    title - string
```
- Giống như `Has One Through` bạn cũng có thể lấy ra tất cả bài `posts` của một `team` bằng cách `$team->posts`.
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    public function posts()
    {
        return $this->hasManyThrough(Post::class, User::class);
    }
}
```
## 4.3 One to One Polymorphic
- Mối quan hệ này tương tự quan hệ `One to One`, nhưng mục đích của mối quan hệ này là 1 model có thể belongsTo 1 hay nhiều model khác.
- Ví dụ một bài `post` có 1 `image` và 1 `product` cũng có 1 `image` thì bạn cần tạo thêm 2 bảng là `post_image` và `product_image` để lưu ảnh cho chúng thì với `Polymorphic` thì bạn chỉ cần 1 bảng `images` là đủ:
```
posts
    id - integer
    name - string

products
    id - integer
    name - string

images
    id - integer
    url - string
    imageable_id - integer
    imageable_type - string
```
- Trong đó:
    - `imageable_id` là `id` của bảng `products` hoặc `posts`.
    - `imageable_type` chứa tên của model `App\Models\Product` hoặc `App\Models\Post`.

- **Model Image**:
```PHP
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
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
```
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
```

- Để lấy ra `image`
```PHP
$post = Post::find(1);

$image = $post->image;
```
- Bạn cũng có thể truy vấn ngược để lấy ra `post` hoặc `product`:
```PHP
$image = Image::find(1);

$imageable = $image->imageable;
```
## 4.4 One to Many Polymorphic
- Quan hệ này khá giống với quan hệ `One to One Polymorphic` bạn chỉ cần thay `morphOne` thành `morphMany` là được. Vì giống với cách định nghĩa ở trên nên mình sẽ không nhắc lại nữa.
## 4.5 Many to Many Polymorphic
- Vì là quan hệ `Many to Many` nên bạn cũng cần tạp ra một bảng trung gian.
- Ví dụ một `post` hay là `video` có thể có nhiều `tags`. Sử dụng mối quan hệ `many to many polymorphic` cho phép bạn truy vấn lấy ra các `tags` thuộc về một `post` hay `video`.
```
posts
    id - integer
    name - string

videos
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
- Cấu trúc model
```PHP
//post.php

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
```
```PHP
class Tag extends Model
{
    public function posts()
    {
        return $this->morphedByMany(Post::class, 'taggable');
    }

    public function videos()
    {
        return $this->morphedByMany(Video::class, 'taggable');
    }
}
```
- Muốn lấy ra các tag thuộc về một post ta cũng làm tương tự nhưng mối quan hệ khác.
```PHP
$post = Post::find(1);

foreach ($post->tags as $tag) {
    //
}
```
- hoặc là ngược lại:
```PHP
$tag = Tag::find(1);

foreach ($tag->videos as $video) {
    //
}
```
# 5. Kết luận
- Bài viết này mình giói thiệu cho các bạn về `Relationships` trong laravel. Mong răng nó sẽ giúp ích được cho các bạn.
- Link tham khảo: https://laravel.com/docs/8.x/eloquent-relationships