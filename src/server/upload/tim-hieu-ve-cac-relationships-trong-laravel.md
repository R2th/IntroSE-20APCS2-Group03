Trong cuộc sống, mọi sự vật đều liên kết với nhau, ví dụ như một cuốn sách phải có tác giả, hay một ngôi trường phải có nhiều lớp học. Ở trong cơ sở dữ liệu cũng vậy, các bảng cũng có thể liên kết với nhau. Ở trong Laravel đã cung cấp sẵn cho chúng ta các mối quan hệ để có thể giảm thiếu thời gian công sức của các lập trình viên. Nó giúp chúng ta truy vấn các bảng trở nên dễ dàng hơn.  Ở bài này chúng ta cùng nhau tìm hiểu về các loại quan hệ
* **One to One**
* **One to Many**
* **Many to Many**
* **Has One Through**
* **Has Many Through**
* **Polymorphic Relations**

### Các mối quan hệ trong Laravel
### 1. One to One
Đây là một kiểu quan hệ đơn giản nhất, mà chúng ta có thể hiểu rằng cái này chỉ phụ thuộc vào cái kia và ngược lại. Ví dụ cho dễ hình dung, ta có bảng `Users` và bảng `Avatar` thì ở đây một người dùng thì chỉ có một cái avatar và chiếc avatar này chỉ đại diện cho user đó.  Để biểu diễn mối quan hệ này ta sử dụng method `hasOne`
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    ...
    
    public function avatar()
    {
        return $this->hasOne('App\Avatar');
    }
}

```

Ở trên ta thấy tham số truyền vào đầu tiên trong method `hasOne` là tên của model liên quan đến với bảng đó. Khi ta khai báo như vậy, nếu muốn lấy avatar của user có id là 1 chả hạn, ta đơn giản chỉ làm như thế này.
```php
$avatar = User::find(1)->avatar;
```
Chú ý ở trên Eloquent sẽ tự động match cột khóa ngoại có tên `user_id` của bảng `Avatar` tương ứng với trường `id` của bảng `User`, nếu trong trường hợp khóa ngoại không đặt là `user_id` mà đặt một tên khác  thì cần truyền thêm một tham số thứ 2.
```php
return $this->hasOne('App\Avatar', 'foreign_key');
```
Tương tự với trường hợp nếu khóa chính của bảng mà bạn liên kết, bạn không đặt là `id` thì cần truyền tiếp một tham số thứ 3 để cho nó hiểu được là khóa ngoại của cột này tương ứng với khóa chính với cột kia
```php
return $this->hasOne('App\Avatar', 'foreign_key', 'local_key');
```

**Inverse**
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Avatar extends Model
{
  protected $table = 'avatar';

  public function user()
  {
    $this->belongsTo('App\User');
  }
}

```
Ở ví dụ trước thì ta có thể từ một user để gọi tới avatar tương ứng của user đó, giờ chúng ta cũng sẽ có thể truy vấn tương tự từ avatar này để truy vấn ra user thuộc về nó. 
<br>
Ở ví dụ trên, Eloquent đã tự động match cột `user_id` ở bảng `Avatar` với cột `id` của bảng `User`. Trong Eloquent mặc định xác nhận khóa ngoại là tên bảng bỏ 's' `_id`, ở trong trường hợp này là `user_id`. Nếu khóa ngoại ở bạng `Avatar` không đặt đúng theo qui chuẩn trước đó thì sẽ cần phải khai báo thêm 1 tham số thứ 2 nữa.
```php
 return $this->belongsTo('App\User', 'foreign_key');
```
Nếu như bạn không muốn map foreign key của bảng Avatar với cột `id` ở bảng `User` mà lại là 1 cột khác chả hạn thì tiếp tục thêm 1 tham số thứ 3 như sau.
```php
return $this->belongsTo('App\User', 'foreign_key', 'other_key');
```

### 2. One to Many
Mối quan hệ này để biểu thị một mối quan hệ cha-con. Ví dụ một `user` thì sẽ có nhiều bài `posts`. Thì mối quan hệ này sẽ được biểu diễn như sau.
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    
    public function posts()
    {
        return $this->hasMany('App\Post');
    }
}
```
Cũng tương tự quan hệ One-One Eloquent sẽ tự động tìm khóa ngoại ở model Post , ở trong trường hợp này eloquent sẽ tìm tới khóa ngoại là "snake case" tên model `_id`, ở ví dụ trên sẽ là `user_id`, Eloquent sẽ giả định `user_id` là khóa ngoại ở model Post. Để truy vấn tới nhiều `posts` thuộc một `user` quá đơn giản bằng cách:
```php
$user = App\User::find(1)->posts;
```
và ngược lại
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  public function user()
  {
    return $this->belongsTo('App\User');
  }
}

```

### 3. Many to Many
Quan hệ này thì nó sẽ phức tạp hơn với hai quan hệ trước nó. Ví dụ một `product` sẽ thuộc nhiều `orders` mà một `order` lại có nhiều `products` . Để biểu diễn được quan hệ này chúng ta cần sử dụng đến một bảng thế 3, mình sẽ đặt tên là `order_product`.
và đồng thời sẽ chứa 2 cột là `order_id` và `product_id`. Ở mối quan hệ này ta sẽ sử dụng method `belongsToMany`. Ví dụ biểu diễn method `Product` với bảng `order`
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function orders()
    {
        return $this->belongsToMany('App\Order');
    }
}
```
bây giờ muốn lấy ra được một `product` có bao nhiêu `order` thì chỉ cần
```php
$orders = App\Product::find(1)->orders;
```
Có một chú ý là, Eloquent sẽ tự động tìm đến bảng trung gian đặt tên theo thứ tự alphabet, trong trường hợp này bảng sẽ tên là `order_product`.  Tuy nhiên nếu bạn muốn đặt 1 cái tên khác mà không theo quy ước ví dụ là `product_order` thì chỉ cần truyền thêm tham số thứ 2 vào method `belongsToMany`.
```php
    return $this->belongsToMany('App\Order', 'product_order');
```
Tương tự bạn cũng có thể custom lại tên của 2 tên của cột liên kết tương ứng với tham số thứ 3 và thứ 4 của method `belongsToMany`.
Với tham số thứ 3 sẽ là khóa ngoại của bảng đang định nghĩa quan hệ và tham số thứ 4 là bảng chúng ta muốn join. Ví dụ trong trường hợp này.
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function orders()
    {
        return $this->belongsToMany('App\Order', 'product_order', 'product_id', 'order_id');
    }
}
```
Ngược lại, đối với bảng Order ta định nghĩa như sau:
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function product()
    {
        return $this->belongsToMany('App\Product');
    }
}
```
và chúng ta cũng tương tự như định nghĩa model `Product`, chúng ta cũng có thể truyền các tham số vào nếu muốn
```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function product()
    {
        return $this->belongsToMany('App\Product', 'product_order', 'order_id', 'product_id');
    }
}
```
**Lấy giá trị của bảng trung gian**
Để làm việc với mối quan hệ Many to Many này thì chúng ta cần sử dụng đến một bảng trung gian. Eloquent cũng hỗ trợ giúp chúng ta lấy được các giá trị của bảng này. Để truy cập đến các cột của bảng trung gian chúng ta sẽ sử dụng thuộc tính `pivot`. Ví dụ :
```php
$product = App\Product::find(1);

foreach($product->orders as $order)
{
    echo $order->pivot->created_at;
}
```
Theo mặc định thì Eloquent chỉ lấy các trường trung gian và `created_at`, `update_at` nếu chúng ta muốn lấy ra giá trị của một cột khác thì cần khai báo thêm như sau, giả sử chúng ta cần lấy thêm trường `address`
```php
return $this->belongsToMany('App\Product')->withPivot('address');
```
Hoặc là khi bạn muốn hai trường `created_at` và `update_at` của bảng trung gian tự động cập nhật giá trị thì khai báo thêm
```php
return $this->belongsToMany('App\Product')->withTimestamps();
```
Đôi khi người dùng lại muốn thay đổi tên của thuôc tính `pivot` thì phải làm như thế nào, chỉ cần sử dụng method `as` được khai báo trong model là xong. Ví dụ
```php
return $this->belongsToMany('App\Product')
                ->as('newname')
                ->withTimestamps();
```
giờ muốn truy cập các thuộc tính của bảng trung gian thay thế `pivot` thành `newname` là được.
```php
$product = App\Product::find(1);

foreach($product->orders as $order)
{
    echo $order->newname->created_at;
}
```

Một câu hỏi nữa được đặt ra là nếu muốn lấy các sản phẩm với điều kiện của bảng trung gian là hợp lệ thì sẽ như thế nào, rất đơn giản, Laravel cũng hỗ trợ chúng ta trong vấn đề này.
```php
public function products()
{
    return $this->belongsToMany(Product::class)->wherePivot('price', '>', 20000);
}
```
Ở đây sẽ lấy ra các Order có giá lớn hơn 20000.

### 4. Has One Through
Đây là một mối quan hệ liên kết các bảng với nhau thông qua một bảng trung gian
Ví dụ có 3 bảng:
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
Mặc dù bảng `history` không chứ `supplier_id` nhưng chúng ta vẫn có thể truy cập đến  `user's history` bới mối quan hệ `hasOneThrough` như sau
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    public function userHistory()
    {
        return $this->hasOneThrough('App\History', 'App\User');
    }
}
```
Với tham số thứ nhất được truyền vào là tên của model mà chúng ta muốn truy cập, tham số thứ 2 là model trung gian. Chúng ta cũng có thể custom các key liên quan đến mối quan hệ này lần lượt là các tham số sau vào hàm định nghĩa quan hệ.
```php
class Supplier extends Model
{
    public function userHistory()
    {
        return $this->hasOneThrough(
            'App\History',
            'App\User',
            'supplier_id', // Khóa ngoại của bảng trung gian user
            'user_id', // Khóa ngoại của bảng chúng ta muốn truy cập đến
            'id', // Khóa mà chúng ta muốn liên kết ở bảng supplier
            'id' // Khóa mà chúng ta muốn liên kết ở bảng user
        );
    }
}
```
hai bảng `user` và `history` chúng ta định nghia như bình thường
```php
// User.php
namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function supplier()
    {
         return $this->belongsTo(Supplier::class);
    }
}
```
```php
// Supplier.php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    public function user()
    {
         return $this->hasOne(User::class);
    }
}
```
### 5. Has Many Through
Mối quan hệ `has many through` này cung cấp cho chúng ta cách truy cập bảng liên kết dễ dàng hơn thông qua bảng trung gian. Ví dụ một `Team` có nhiều bài `Post` thông qua bảng trung gian là `User`. 
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
Mặc dù bảng `posts` không chứa khóa ngoại `team_id`, nhưng với quan hệ `hasManyThrough` sẽ cung cấp cho chúng ta lấy tất cả `posts` của một `teams` bằng cách `$team->posts`. Để thực hiện việc này thì Eloquent sẽ kiểm tra `team_id` thông qua bảng `users`.  Chúng ta sẽ biểu diễn quan hệ như sau:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    public function posts()
    {
        return $this->hasManyThrough('App\Post', 'App\User');
    }
}
```
Tham số đầu tiên của quan hệ này là tên model mà chúng ta muốn truy cập, tham số thứ hai là model trung gian. Chúng ta cũng có thể custom lại tên của các khóa ngoại bằng cách thêm các tham số, với tham số thứ 3 là khóa ngoại của bảng trung gian, tham số thứ 4 là khóa ngoại của bảng mà chúng ta muốn gọi tới, tham số thứ 5 là trường mà chúng ta muốn liên kết ở bảng đang sử dụng, tham số thứ 6 là trường mà chúng ta muốn liên kết ở bảng trung gian.
```php
class Tean extends Model
{
    public function posts()
    {
        return $this->hasManyThrough(
            'App\Post',
            'App\User',
            'country_id', // khóa ngoại của bảng trung gian
            'user_id', // khóa ngoại của bảng mà chúng ta muốn gọi tới
            'id', //trường mà chúng ta muốn liên kết ở bảng đang sử dụng
            'id' // trường mà chúng ta muốn liên kết ở bảng trung gian.
        );
    }
}
```
### 6. Polymorphic
Đây là mối quan hệ đa hình trong Laravel cho phép 1 Model có thể belongsTo nhiều Model khác mà chỉ cần dùng 1 associate.
#### 6.1 One to One Polymorphic ####
Mối quan hệ này tương tự quan hệ `One to One`, tuy nhiên mục đích của mối quan hệ này là 1 model có thể belongsTo 1 hay nhiều model khác. Ví dụ một bài `post` có một `image` và một `product` cũng có một `image`, nếu như bình thường thì các bạn phải tạo thêm 2 bảng là `post_image` để lưu ảnh của `post` và `product_iamge` để lưu ảnh của `product`, nếu có ti tỉ các bảng cần đến image thì lại phải tạo thêm bấy nhiêu bảng để lưu ảnh, vậy thì sẽ quá phức tạp và rối, vậy nên mới sinh ra mối quan hệ polymorphic này. Ví dụ :
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
Đây là cách để xây dựng mối quan hệ polymorphic này. Với `imageable_id` sẽ lưu `id` của bảng `posts` và bảng `products`, còn trường `imageable_type` sẽ lưu tên class model `Post` và `Product`. Theo convention của laravel thì bảng lưu trung gian sẽ bắt buộc phải có 2 trường `id` và `type` nhưng để rõ ràng hơn thì sẽ lưu thêm tiền tố `tên_bảng_bỏ_s +able_`.
**Cấu trúc model**
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

class Post extends Model
{
    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }
}

class Product extends Model
{
    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }
}
```
Để lấy ra image thuộc bài `posts` thì sẽ trỏ tới `image` là được.
```php
$post = App\Post::find(1);

$image = $post->image;
```
và ngược lại từ `image` có thể suy ngược lại `post` hay `product` phụ thuộc vào nó.
```php
$image = App\Image::find(1);

$imageable = $image->imageable;
```
#### 6.1 One to Many Polymorphic ####
Mối quan hệ này cũng gần giống với quan hệ `One to Many`. Ví dụ một `User` có thể comment ở cả `Post` lẫn `Video` thì chỉ cần 1 bảng `comments` trong trường hợp này
```
posts
    id - integer
    title - string
    body - text

videos
    id - integer
    title - string
    url - string

comments
    id - integer
    body - text
    commentable_id - integer
    commentable_type - string
```
**Cấu trúc model**
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

class Post extends Model
{
    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }
}

class Video extends Model
{
    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }
}
```
Lấy ra các giá trị tất cả các `comment` của `post` ta làm như sau
```php
$post = App\Post::find(1);

foreach ($post->comments as $comment) {
    echo $comment->content;
}
```
hay là từ `comment` để lấy ngược lại cái `post` hay `videos` thuộc về nó
```php
    $comment = App\Comment::find(1);

    $commentable = $comment->commentable;
```
#### 6.1 Many to Many Polymorphic ####
Quan hệ này sẽ phức tạp hơn một chút. Ví dụ một `post` hay là `video` có thể có nhiều `tags`. Sử dụng mối quan hệ `many to many polymorphic` cho phép bạn truy vấn lấy ra các `tags` thuộc về một `post` hay `video`
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
**Cấu trúc model**
```php
//post.php

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
```php
//tag.php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function posts()
    {
        return $this->morphedByMany('App\Post', 'taggable');
    }

    public function videos()
    {
        return $this->morphedByMany('App\Video', 'taggable');
    }
}
```
Ok bây giờ muốn lấy ra các `tag` thuộc về một `post` ta cũng làm tương tự nhưng mối quan hệ khác.
```php
$post = App\Post::find(1);

foreach ($post->tags as $tag) {
    //
}

```
hoặc là ngược lại
```php
$tag = App\Tag::find(1);

foreach ($tag->videos as $video) {
    //
}
```

## Kết luận
**Donate cho tác giả**: https://www.buymeacoffee.com/imphunq