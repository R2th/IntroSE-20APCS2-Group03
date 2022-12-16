Xin chào mn, trong phần này mình sẽ tiếp tục viết về chủ đề Relationship trong laravel, các bạn có thể ghé qua 1 chút về [phần trước](https://viblo.asia/p/nhung-dieu-can-biet-ve-relationships-trong-laravel-phan-1-V3m5WmMgZO7) nếu chưa đọc nha. Còn bây giờ ta sẽ vào luôn vấn đề.
# Polymorphic Relations
Quan hệ **đa hình** cho phép 1 model thuộc về nhiều hơn 1 model khác. 
## One To One

Giả sử 1 user sẽ có 1 ảnh đại diện duy nhất, 1 post cũng sẽ chỉ có 1 ảnh bìa duy nhất. Như vậy cả user và post đều có  1 quan hệ chung đó là ảnh. Thông thường thì ta sẽ dùng 2 relation tương ứng với user và post như thế này :

 - 1 user   **has**   1 image
 - 1 post **has**  1 image

Với 2 quan hệ này ta sẽ phải tạo thêm 2 bảng để lưu ảnh, 1 cho users và 1 cho posts.
Cũng chạy tốt đó, nhưng thực tế sẽ không ai làm như vậy cả, vì ta có thể tối ưu hơn nếu sử dụng mối quan hệ đa hình, cụ thể là ta chỉ cần sử dụng 1 bảng images duy nhất cho cả  users và posts. Trước tiên, hãy kiểm tra các cấu trúc bảng cần thiết để xây dựng mối quan hệ này.
###  Table Structure
```php
posts
    id - integer
    title - string
    body - text

users
    id - integer
    name - string
    address - string

images
    id - integer
    url - text
    imageable_id - integer
    imageable_type - string
```

Hai cột quan trọng cần lưu ý là cột image_id và image_type trong bảng images. Cột image_id sẽ chứa giá trị id của user hoặc post. Trong khi cột image_type sẽ chứa tên lớp của model sở hữu image. Cột image_type là cách ORM xác định "type" của model sở hữu sẽ trả về khi truy cập vào các mối quan hệ imageable ( ở đây là User::class hoặc Post::class).
### Model Structure
Để xây dựng mối quan hệ 1:1 đa hình trong laravel thì trong Model class ta sẽ làm như sau:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Trong App/Models/image.php
class Image extends Model
{
    /**
     * Get all of the owning imageable models.
     */
    public function imageable()
    {
        return $this->morphTo();
    }
}

// Trong App/Models/post.php
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

// Trong App/Models/user.php
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
Chú ý là từ "imageable" trong relation của model user và post phải trùng với tên relation "imageable" của model image đấy nhé. Nhìn lên 1 chút thì 2 cột imageable_id và imageable_type cũng phải có phần imageable ở đầu, các relation đa hình đều sẽ được định danh chuẩn bằng cách lấy tên bảng (số ít) + "able". Các bạn cũng có thể thử đặt tên khác đi thử xem thế nào nha.

Khi đã định nghĩa các models và các tables trong cơ sở dữ liệu, chúng ta có thể sử dụng mối quan hệ 1:1 đa hình. Ví dụ để truy xuất đến các image của các bài post, chúng ta có thể sử dụng thuộc tính động image.
```php
     $post = Post::find(1);
     $image = $post->image;
```
Ngược lại, chúng từ 1 Model Image chúng ta cũng có thể suy ngược lại Model User hoặc Post phụ thuộc vào loại Model nào sở hữu Model Image này.
```php
    $image = Image::find(1);
    $imageable = $image->imageable;
```
## One To Many
Mối quan hệ 1:N đa hình giống với mối quan hệ 1:1 đa hình chỉ khác ở chỗ đây là quan hệ 1:N tương tự như quan hệ giữa các bảng trong cơ sơ dữ liệu. 

Giả sử 1 User có thể comment nhiều lần ở cả bài post và video. Sử dụng mối quan hệ đa hình chúng ta chỉ cần dùng 1 bảng comments duy nhất cho 2 relation này. 
### Table Structure

```php
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

### Model Structure
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Trong App/Models/comment.php
class Comment extends Model
{
    /**
     * Get all of the owning commentable models.
     */
    public function commentable()
    {
        return $this->morphTo();
    }
}

// Trong App/Models/post.php
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


// Trong App/Models/comment.php
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
Dễ dàng nhận ra sự khác nhau giữa 1-1 với 1-n ở đây là "morphOne" với "morphMany" (tất nhiên là phải có thêm chữ s vào tên relation để thể hiện ý nghĩa 1-n).

Khi đã định nghĩa xong Model và tạo ra các tables như trên, chúng ta có thể sử dụng mối quan hệ đa hình này. Ví dụ, bâu giờ nếu muốn lấy tất cả các comments của 1 bài Post chúng ta có thể sử dụng thuộc tính động comments
```php
$post = Post::find(1);

foreach ($post->comments as $comment) {
    //
}
```

Ngược lại, từ 1 Model đa hình chúng ta có thể truy cập ngược lại Model đang sở hữu quan hệ đa hình này bằng cách truy cập vào tên của method mà đã gọi method morphTo(). Trong case này đó là method commentable trong model comment:
```php
    $comment = Comment::find(1);
    $commentable = $comment->commentable;
```
Kết quả trả ra phụ thuộc vào loại model đang sở hữu comment (ở đây sẽ là 1 instance của Post hoặc Video).

## Many To Many
Giả sử ta có các relation sau:

- 1 post có nhiều tag chủ đề
- 1 video có nhiều tag chủ đề
- 1 tag chủ đề có thể dùng lại ở cả post và video

### Table Structure
Với các quan hệ trên ta có thể đưa ra cấu trúc bảng như dưới đây:
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
Phân tích 1 chút, ở bảng taggables ta có 3 cột lần lượt là :

- tag_id : ứng với id của tag ( là primary key trong bảng tags)
- taggable_id: ứng với id của model instance sở hữu tag ( primary key của bảng posts hoặc videos)
- taggable_type: ứng với "type" của model sở hữu (Post::class hoặc Video::class)

### Model Structure
Định nghĩa các mối quan hệ trên model. Cả 2 model Post và Video đều có 1 method tags() và gọi đến method morphToMany:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Trong App/Models/post.php
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

// Trong App/Models/video.php
class Video extends Model
{
    /**
     * Get all of the tags for the video.
     */
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
```

Còn trong model Tag, chúng ta sẽ định nghĩa 1 method cho mỗi 1 Model nó có quan hệ. Ở đây là method pots và method videos:
```php
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

Bây giờ, nếu muốn lấy tất cả các tags của 1 bài Post ta sẽ dùng thuộc tính động tags:
```php
$post = App\Post::find(1);

foreach ($post->tags as $tag) {
    //
}
```
Ngược lại, chúng ta cũng có thể truy xuất đến Model sở hữu mối quan hệ đa hình từ 1 Model đa hình bằng cách truy cập vào tên của phương thức mà call đến method morphedByMany. Trong trường hợp này đó là method posts và videos trong model Tag

```php
$tag = App\Tag::find(1);

foreach ($tag->videos as $video) {
    //
}
```

Tài liệu tham khảo: https://laravel.com/docs/8.x/eloquent-relationships