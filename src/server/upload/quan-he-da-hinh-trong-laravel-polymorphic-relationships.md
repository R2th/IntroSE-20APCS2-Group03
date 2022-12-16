Mối quan hệ đa hình trong Laravel cho phép 1 Model có thể belongsTo nhiều Model khác mà chỉ cần dùng 1 associate.
# 1. Mối quan hệ One To One (Polymorphic):
## 1.1 Table Structure
Mối quan hệ này cho phép 1 Model có thể belongsTo 1 hoặc nhiều Model khác. Ví dụ: 1 Model Post và 1 Model User có thể cùng chia sẻ mối quan hệ đa hình với Model Image. Kết quả, chúng ta chỉ cần dùng 1 list ảnh duy nhất có thể dùng chung cho cả các bài Post và tài khoản User. Nếu không chúng ta sẽ phải có 2 list ảnh riêng 1 cho Post và 1 cho User.
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

Trong bảng images có 2 trường đặc biệt đó là: 
1. imageable_id - chứa giá trị Id của User hoặc Post
2. imageable_type: Chứa tên class của Model User hoặc Post - dùng để xác định xem Model nào sẽ được trả về khi truy cập vào mối quan hệ imageable

## 1.2 Model Structure
Cách định nghĩa Model trong Laravel để xây dựng mối quan hệ 1:1 đa hình
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

class Post extends Model
{
    /**
     * Get the post's image.
     */
    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }
}

class User extends Model
{
    /**
     * Get the user's image.
     */
    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }
}
```

## 1.3 Retrieving The Relationship
Khi đã định nghĩa các models và các tables trong cơ sở dữ liệu, chúng ta có thể sử dụng mối quan hệ 1:1 đa hình. Ví dụ để truy xuất đến các image của các bài post, chúng ta có thể sử dụng thuộc tính động **image**

```
    $post = App\Post::find(1);
    $image = $post->image;
```
Ngược lại, chúng từ 1 Model Image chúng ta cũng có thể suy ngược lại Model User hoặc Post phụ thuộc vào loại Model nào sở hữu Model Image này
```
    $image = App\Image::find(1);

    $imageable = $image->imageable;
```
# 2. Mối quan hệ One To Many (Polymorphic)
## 2.1 Table Structure
Mối quan hệ 1:N đa hình giống với mối quan hệ 1:1 đa hình chỉ khác ở chỗ đây là quan hệ 1:N tương tự như quan hệ giữa các bảng trong cơ sơ dữ liệu. Ví dụ, 1 User có thể comment ở cả bài post và video. Sử dụng mối quan hệ đa hình chúng ta chỉ cần dùng 1 bảng **comments** duy nhất cho 2 TH này. Giả sử ta xây dụng cấu trúc bảng như sau:
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
## 2.2 Model Structure
Định nghĩa cấu trúc Model cần có để có thể sử dụng mối quan hệ đa hình 1:N
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

class Post extends Model
{
    /**
     * Get all of the post's comments.
     */
    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }
}

class Video extends Model
{
    /**
     * Get all of the video's comments.
     */
    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }
}
```
## 2.3 Retrieving The Relationship
Khi đã định nghĩa xong Model và tạo ra các tables như trên, chúng ta có thể sử dụng mối quan hệ đa hình này. Ví dụ, bâu giờ nếu muốn lấy tất cả các comments của 1 bài Post chúng ta có thể sử dụng thuộc tính động **comments**
```
$post = App\Post::find(1);

foreach ($post->comments as $comment) {
    //
}
```

Ngược lại, từ 1 Model đa hình chúng ta có thể truy cập ngược lại Model đang sở hữu quan hệ đa hình này bằng cách truy cập vào tên của method mà đã gọi method **morphTo()**. Trong TH này đó là method **commentable** trong model **comment**
```
    $comment = App\Comment::find(1);

    $commentable = $comment->commentable;
```

quan hệ commentable trong model Comment sẽ trả về 1 instance của Post hoặc Video phụ thuộc vào loại model đang sở hữu comment

# 3. Mối quan hệ Many To Many (Polymorphic)
## 3.1 Table Structure

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
## 3.2 Model Structure
Định nghĩa các mối quan hệ trên model. Cả 2 model Post và Video đều có 1 method **tags()** và gọi đến method **morphToMany** 
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Get all of the tags for the post.
     */
    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }
}
```
 
## 3.3 Defining The Inverse Of The Relationship
Trong model Tag, chúng ta sẽ định nghĩa 1 method cho mỗi 1 Model nó có quan hệ. Ở đây là method **pots** và method **videos**
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * Get all of the posts that are assigned this tag.
     */
    public function posts()
    {
        return $this->morphedByMany('App\Post', 'taggable');
    }

    /**
     * Get all of the videos that are assigned this tag.
     */
    public function videos()
    {
        return $this->morphedByMany('App\Video', 'taggable');
    }
}
```

## 3.3 Retrieving The Relationship

Bây giờ, nếu muốn lấy tất cả các tags của 1 bài Post ta sẽ dùng thuộc tính động **tags**:
```
$post = App\Post::find(1);

foreach ($post->tags as $tag) {
    //
}

```
Ngược lại, chúng ta cũng có thể truy xuất đến Model sở hữu mối quan hệ đa hình từ 1 Model đa hình bằng cách truy cập vào tên của phương thức mà call đến method **morphedByMany**. Trong trường hợp này đó là method **posts** và videos trong model **Tag**
```
$tag = App\Tag::find(1);

foreach ($tag->videos as $video) {
    //
}
```

Bài viết có tham khảo từ các nguồn:
https://laravel.com/docs/5.8/eloquent-relationships#polymorphic-relationships