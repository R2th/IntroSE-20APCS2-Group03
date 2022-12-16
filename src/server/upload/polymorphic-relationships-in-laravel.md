## 1. Mở đầu
Database - các mối quan hệ giữa các bảng là một thứ không thể thiếu trong bất kỳ các dự án lớn nhỏ. Nếu bạn đang làm việc với Framework Laravel thì thật may mắn Eloquent sẽ giúp quản lý và làm việc với các mối quan hệ này một cách dễ dàng, tiện lợi.
* Eloquent hỗ trợ chúng ta tất cả 8 loại mối quan hệ khác nhau:
    * One To One
    * One To Many
    * Many To Many
    * Has One Through
    * Has Many Through
    * One To One (Polymorphic)
    * One To Many (Polymorphic)
    * Many To Many (Polymorphic)
Thực tế các mối quan hệ như: One To One, One To Many, Many To Many truyền thống có lẽ đã rất quen thuộc với các developer. Nên hôm nay mình xin giới thiệu với các bạn về mối quan hệ đa hình **(Polymorphic)** trong Laravel.
## 2. Giới thiệu về Polymorphic Relationships
- Polymorphic Relationships là một mối **quan hệ đa hình**, cho phép một Model đích có thể thuộc về một hoặc nhiều Model khác mà chỉ cần dùng 1 associate. 
- Polymorphic relationship cũng có 3 kiểu mối quan hệ:
    - One To One
    - One To Many
    - Many To Many
## 3. One To One (Polymorphic)
### 3.1. Table Structure
Cơ bản thì các mối quan hệ đa hình cũng giống như các mối quan hệ thông thường khác. Tuy nhiên một Model đích có thể **belongsTo** tới nhiều Model khác.

Vd: 1 Model Post và Model User cùng chia sẻ mối quan hệ đa hình với mối quan hệ đa hình Image. Kết quả là ta chỉ cần list ra 1 danh sách các image là có thể dùng chung cho bảng posts và users. Nếu không ta sẽ phải list 2 danh sách images cho 2 bảng, trước tiên ta sẽ đi xem cấu trúc của các bảng qua ví dụ sau nhé:
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
- Trong bảng images ta thấy có 2 column quan trọng:
    - **imageable_id:** sẽ chứa id của posts và users
    - **imageable_type:** chứa tên class Model của bảng posts hoặc users. Đây cũng chính là cách để ORM xác định "type" của model sở hữu sẽ trả về khi truy cập vào các mối quan hệ đa hình. (VD: App\Models\Post)

    => Như vậy để kết nối với 2 model Post và User ta chỉ cần list ra 1 danh sách images.

### 3.2. Model Structure
Tiếp theo đây chúng ta sẽ xem cấu trúc Model được định nghĩa như sau:
```php

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        return $this->morphOne('App\Models\Image', 'imageable');
    }
}

class User extends Model
{
    /**
     * Get the user's image.
     */
    public function image()
    {
        return $this->morphOne('App\Models\Image', 'imageable');
    }
}
```
### 3.3 Retrieving The Relationship
Khi đã xác định được Model và các bảng trong cơ sở dữ liệu, ta có thể lấy dữ liệu từ chính Model của mình. VD lấy hình ảnh của 1 bài post:
```php
$post = Post::find(1);

$image = $post->image;
```

Hoặc ta cũng có thể truy xuất dữ liệu từ Model đích thông qua tên của method thực hiện gọi đến method **morphTo**. Trong Vd trên thì đó chính là method imageable, ta có thể lấy ra 1 bài viết hay 1 user thông qua method imageable:
```php
$image = Image::find(1);

$imageable = $image->imageable;
```
## 4. One To Many (Polymorphic)
### 4.1. Table Structure
Mối quan hệ 1:N cũng tương tự với mối quan hệ 1:1 đa hình, tuy nhiên ở đây Model đích lại thuộc về nhiều Model khác.

VD: 1 post có nhiều comment nhưng 1 comment chỉ thuộc về 1 post đó và 1 video cũng có nhiều comment, nhưng 1 comment chỉ thuộc về 1 video. Ta có thể xem cấu trúc bảng sau:
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

### 4.2. Model Structure
Tiếp theo ta xem cấu trúc Model được định nghĩa như sau:
```php

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        return $this->morphMany('App\Models\Comment', 'commentable');
    }
}

class Video extends Model
{
    /**
     * Get all of the video's comments.
     */
    public function comments()
    {
        return $this->morphMany('App\Models\Comment', 'commentable');
    }
}
```
### 4.3 Retrieving The Relationship
Cũng tương tự như quan hệ 1:1 đa hình thì ở đây ta cũng có thể lấy dữ liệu từ chính Model của mình hoặc lấy dữ liệu từ Model đích thông qua name method thực hiện gọi đến **morphTo** method.

Trong Vd trên ta có thể lấy ra danh sách comments của 1 post thông qua Model Post:
```php

$post = Post::find(1);

foreach ($post->comments as $comment) {
    //
}
```
Hoặc sẽ lấy ra 1 instance Post or Video thông qua Model Comment:
```php
$comment = Comment::find(1);

$commentable = $comment->commentable;
```
## 5. Many To Many (Polymorphic)
### 5.1. Table Structure
- Về cơ bản mối quan hệ N:N đa hình cũng giống mối quan hệ Many To Many truyền thống mà ta vẫn hay dùng, tuy nhiên ở đây một model đích có thể belongsTo nhiều các model khác (đa hình). Nó phức tạp hơn một chút so với mối quan hệ 1:1 và 1:N đa hình.
- Mình sẽ lấy vd cho dễ hiểu nhé. VD bảng posts và bảng videos cùng có mối quan hệ N:N với bảng tags. Nếu dùng  quan hệ Many To Many truyền thống khi đó ta sẽ phải tạo ra 2 bảng trung gian => sẽ phải list ra 2 list danh sách các tags khi cần dùng tới. Nhưng khi bạn sử dụng mối quan hệ Many To Many đa hình, nó sẽ cho phép ta list ra 1 danh sách unique tags duy nhất.
- Để hiểu rõ hơn các bạn có thể tham khảo cấu trúc các bảng sau:
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
- Như vậy ta thấy có bảng taggables - bảng này giống như bảng pivot trong mối quan hệ N:N truyền thống, điểm chú ý ở đây có 2 column:
    - **taggable_id**: Lưu id của post or video
    - **taggable_type**: Lưu class name của Model Post hoặc Video tương ứng.
### 5.2. Model Structure
Các Model Post và Video sẽ định nghĩa một tags method gọi tới phương thức **morphToMany** trên lớp base Eloquent:
```php
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
        return $this->morphToMany('App\Models\Tag', 'taggable');
    }
}
```
### 5.3 Defining The Inverse Of The Relationship
Trong Model Tag ta cũng định các method cho mỗi Model  liên quan, trong VD trên mình cũng xác định hai method là posts và videos gọi đến **morphedByMany** method:
```php
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
### 5.4 Retrieving The Relationship
- Cũng tương tự như mối quan hệ 1:1 và 1:N đa hình thì ở đâu trong mối quan hệ N:N ta cũng có lấy dữ liệu từ chính Model của mình hoặc thông qua Model đích:
- Vd: Lấy danh sách các tags thông qua Model Post
```php
$post = App\Post::find(1);

foreach ($post->tags as $tag) {
    //
}
```
- Hay lấy ra các bài posts or videos thông qua Model đích, bằng cách gọi tới tên phương thức mà ta đã định nghĩa trong Model đích:
```php
$tag = App\Tag::find(1);

foreach ($tag->videos as $video) {
    //
}
```
## 6. Kết luận
Trên đây là mình đã giới thiệu về mối quan hệ đa hình (**Polymorphic**) trong Eloquent. Mặc dù mối quan hệ này không được sử dụng phổ biến như các mối quan hệ truyền thống, tuy nhiên mình thấy nó khá là hay. 
Các bạn có thể tham khảo thêm ở [đây](https://laravel.com/docs/5.8/eloquent-relationships#polymorphic-relationships) nhé (hihi)