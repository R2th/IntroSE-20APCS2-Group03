Chào các bạn. Các bạn đã đọc hết phần 1 chưa nhỉ? Nếu chưa tìm thấy thì các bạn click [vào đây](https://viblo.asia/p/eloquent-relationships-trong-laravel-phan-1-Do754G7XlM6) nhé. :)

Cùng nhau xem phần 2 có thêm những kiến thức gì về **Relationships** trong Laravel nhé.

## **2. Các quan hệ cơ bản**
### 2.4. Has One Through
Quan hệ này được xác định giữa 2 quan hệ thông qua 1 quan hệ khác. 
Ví dụ: Mối 1 nhà cung cấp (supplier) có 1 người dùng (user), mỗi người dùng lại có 1 lịch sử người dùng (history). Khi đó, nhà cung cấp có thể liên kết với lịch sử người dùng thông qua (through) người dùng.
Ta sẽ xem cấu trúc database của 3 model này nhé.
```
suppliers
    id - integer

users
    id - integer
    supplier_id - integer

histories
    id - integer
    user_id - integer
```
Mặc dù trong bảng `histories` không có trường `supplier_id` nhưng model `supplier` vẫn có thể truy cập tới lịch sử của người dùng bằng quan hệ `hasOneThrough`. Cùng xem ví dụ code để biết cách sử dụng nhé.

Model Suppliers:
```
<?php

namespace App/Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    /**
     * Get the user's history.
     */
    public function userHistory()
    {
        return $this->hasOneThrough(History::class, User::class);
    }
}
```
Tham số đầu tiên của function `hasOneThrough` là model đích mà bạn cần truy cập đến. Tham số thứ 2 là model trung gian ở giữa. Ở đây, các key được dùng mặc định là `model_id`. Vì vậy, nếu các key của bạn khác với mặc định, bạn phải khai báo nó thành các tham số sau của function `hasOneThrough`.

* Tham số thứ 3 là khóa ngoại trong bảng trung gian
* Tham số thứ 4 là khóa ngoại trong bảng đích muốn truy cập
* Tham số thứ 5 là khóa chính của model hiện tại
* Tham số thứ 6 là khóa chính của bảng trung gian

Ví dụ: 
```
class Supplier extends Model
{
    public function userHistory()
    {
        return $this->hasOneThrough(
            History::class,
            User::class,
            'supplier_id', // Khóa ngoại của bảng users
            'user_id', // Khóa ngoại của bảng history
            'id', // Khóa chính của bảng suppliers
            'id' // Khóa chính của bảng users
        );
    }
}
```
### 2.5. Has Many Through
Quan hệ này tương tự như Has One Through, khác ở chỗ model gốc có thể có liên hệ với nhiều đối tượng của model đích. Ví dụ, 1 đất nước (country) có nhiều user, mỗi user có nhiều bài post. Khi đó, ta có thể xác định quan hệ giữa `country` và `post` thông qua `user`. Xem thiết kế database chút nhé.
```
countries
    id - integer

users
    id - integer
    country_id - integer

posts
    id - integer
    user_id - integer
```

Giống như quan hệ trước, ở bảng `posts` cũng không có trường `country_id`, nhưng chúng ta vẫn có thể tạo quan hệ cho chúng thông qua bảng `users`, dùng function `hasManyThrough()`. 
```
<?php

namespace App/Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /**
     * Get all of the posts for the country.
     */
    public function posts()
    {
        return $this->hasManyThrough(Post::class, User::class);
    }
}
```
Các tham số truyền vào function giống với function `hasOneThrough()` bên trên nên mình không viết lại nữa nhé.

## 3. Polymorphic Relationships
Một quan hệ đa hình (polymorphic) cho phép 1 model có thể thuộc về nhiều model khác nhau sử dụng 1 liên kết duy nhât. Ví dụ đơn giản như khi bạn chỉ dùng 1 bảng `images` để lưu trữ hình ảnh nhưng sẽ có thể lưu hình ảnh của `user` và cả của `post`. Làm thế nào để lấy hình ảnh đúng với user hay post? Cùng xem nhé.
### 3.1. One To One (Polymorphic)
Quan hệ **One To One (Polymorphic)** tương tự như quan hệ one to one bình thường. Khác ở chỗ model đích có thể thuộc về (belongTo) nhiều model khác nhau trong cùng 1 liên kết.

Ví dụ: Ta có model `Post` và `User`, mỗi post hay mỗi user có 1 image. Thay vì phải tạo 2 bảng `image` để lưu hình hình của post và user, chúng ta có thể dùng 1 bảng để lưu hình ảnh cho 2 model này. 

**Cấu trúc database** như sau:
```
posts
    id - integer
    name - string

users
    id - integer
    name - string

images
    id - integer
    url - string
    imageable_id - integer
    imageable_type - string
```
Các bạn hãy chú ý 2 cột `imageable_id` và `imageable_type` của bảng `images`. Cột `imageable_id` sẽ lưu lại ID của `post` hoặc `user`, cột `imageable_type` sẽ lưu tên class của model cha (model mà nó thuộc về). 

Cùng xem cách **define model** nhé.
```
class Image extends Model
{
    /**
     * Get the owning imageable model.
     */
    public function imageable()
    {
        return $this->morphTo();
    }
}

class Post extends Model
{
    /**
     * Get the post's image.
     */
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}

class User extends Model
{
    /**
     * Get the user's image.
     */
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
```
Sau khi định nghĩa model, bạn có thể dùng `image` như 1 thuộc tính động của model `post` hay `user` để truy xuất dữ liệu. 
```
$post = Post::find(1);

$image = $post->image;
```
Giống như những quan hệ bình thường ở phần trước thôi, đúng không? :) 

Vậy nếu mình có 1 `image`, muốn truy xuất xem nó thuộc model cha nào thì sao nhỉ? Bạn hãy để ý function `imageable()` ở class `Image`, trong function này có sử dụng `morphTo()`.
```
$image = Image::find(1);

$imageable = $image->imageable;
```
Kết quả trả về sẽ là 1 Post hoặc 1 User, phụ thuộc vào kiểu model sở hữu image đó.
### 3.2. One To Many (Polymorphic)
Tương tự như quan hệ OneToMany bình thường, quan hệ One To Many (Polymorphic) cũng xác định quan hệ 1 - n giữa 2 model nhưng khác là 1 model đích có thể thuộc về nhiều model cha. 

Ví dụ: Ta có model `Post`, `Comment` và `Video`. 1 post hay 1 video có thể có nhiều comment. Thay vì dùng 2 bảng khác nhau để lưu comment của post và video, ta có thể chỉ dùng 1 bảng để lưu tất cả comment.

**Cấu trúc database** như sau:
```
posts
    id - integer
    title - string

videos
    id - integer
    title - string

comments
    id - integer
    body - text
    commentable_id - integer
    commentable_type - string
```
Giống như quan hệ  1 - 1, ta có trường `commentable_id` xác định ID của đối tượng cha, trường `commentable_type` xác định kiểu đối tượng cha.

Cùng xem cách **define model** nhé.
```
class Comment extends Model
{
    /**
     * Get the owning commentable model.
     */
    public function commentable()
    {
        return $this->morphTo();
    }
}

class Post extends Model
{
    /**
     * Get all of the post's comments.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

class Video extends Model
{
    /**
     * Get all of the video's comments.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
```
**Cách truy xuất dữ liệu**
Tương tự quan hệ 1 - 1, sau khi định nghĩa model, ta có thể dùng `comments` như 1 thuộc tính động của model. 
Ví dụ lấy các comment của 1 post:
```
$post = Post::find(1);

foreach ($post->comments as $comment) {
    //Code xử lý
}
```
Tương tự để truy xuất ngược lại model cha, ta sẽ dùng `commentable` với model `Comment`.
```
$comment = Comment::find(1);

$commentable = $comment->commentable;
```
### 3.3. Many To Many (Polymorphic)
Quan hệ này phức tạp hơn 2 quan hệ trước 1 chút. Ví dụ luôn cho dễ hiểu nhé. Ta có 3 model `Post`, `Video` và `Tag`. 1 post hay 1 video có nhiều tag, 1 tag cũng có thể thuộc nhiều post hoặc video. Giống như quan hệ n - n bình thường, ta cũng sẽ có 1 bảng trung gian.

**Cấu trúc database** như sau:
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

**Cách define model**

Với model Post và Video, ta sẽ có method `tags()` sử dụng `morphToMany()` để lấy các tag.
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Get all of the tags for the post.
     */
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
```
Với model Tag, ta sẽ có 2 method `posts()` và `videos()` tương ứng với 2 model trong quan hệ, dùng `morphedByMany()`
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * Get all of the posts that are assigned this tag.
     */
    public function posts()
    {
        return $this->morphedByMany(Post::class, 'taggable');
    }

    /**
     * Get all of the videos that are assigned this tag.
     */
    public function videos()
    {
        return $this->morphedByMany(Video::class, 'taggable');
    }
}
```
Sau khi define model, ta có thể truy xuất dữ liệu giống như các quan hệ trên.
```
// lấy các tag tương ứng với post
$post = Post::find(1);

foreach ($post->tags as $tag) {
    //Code xử lý
}

// truy xuất ngược: lấy các video tương ứng với tag
$tag = Tag::find(1);

foreach ($tag->videos as $video) {
    //Code xử lý
}
```

### Note: Custom Polymorphic Types
Theo mặc định, Laravel sẽ dùng tên đầy đủ của model để lưu vào trường `*_type` trong bảng con. Như với ví dụ ở quan hệ 1 - n Polymorphic, mặc định thì trường `commentable_type` sẽ lưu là `App\Video` hoặc `App\Post`. Nếu bạn thấy như vậy bất tiện, hoặc không muốn lưu lại cấu trúc thư mục ở trong DB thì bạn có thể custom lại bằng cách tạo 1 **"morph map"**. 

Ví dụ:
```
use Illuminate\Database\Eloquent\Relations\Relation;

Relation::morphMap([
    'posts' => 'App\Post',
    'videos' => 'App\Video',
]);
```
Bạn có thể đăng kí nó trong function `boot` trong file `AppServiceProvider` hoặc tạo 1 service provider khác, tùy bạn :)

Trong trường hợp DB của bạn đã có bản ghi lưu lại tên cũ ở trường `*_type`thì phải đổi lại nhé.

## Tổng kết phần 2
Phần này mình note lại về các quan hệ **through** và **quan hệ đa hình (Polymorphic)**. Chúc bạn thành công :). Hẹn các bạn phần sau với những kiến thức khác về relationship trong Laravel nhé.

### Tài liệu tham khảo
https://laravel.com/docs/6.x/eloquent-relationships#querying-relations