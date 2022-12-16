Chào mọi người hôm nay mình lại ngoi lên đây, từ giờ mình sẽ bắt đầu viết 1 series về laravel vừa để chia sẻ cho mọi người và vừa để củng cố lại kiến thức của bản thân.
Bài hôm nay mình sẽ giới thiệu vơí các bạn về 
**Eloquent: Relationships** trong laravel
# Giới Thiệu
Như chúng ta đã biết khi ta thiết kế cơ sở dữ liệu thì các bảng thường có liên quan tới nhau, Ví dụ như bảng bài viết thì sẽ kết nối với bảng comment hoặc like chẳng hạn. Ví dụ như comment 1 cấp thì PHP thuần xử lý cũng khá dễ đúng không, Nhưng nếu nhiều cấp thì sao, Chúng ta cũng phải xử lý khá khá đấy nhé :) 

Nhưng đến với laravel thì các bạn không phải lo nữa.

**Eloquent** giúp cho quản lý và làm việc với những quan hệ này một cách đơn giản và hỗ trợ nhiều kiểu quan hệ:
* *One To One*
* *One To Many*
* *Many To Many*
* *Has Many Through*
* *Polymorphic Relations*
* *Many To Many Polymorphic Relations*

# One To One (một - một)(hasOne) 
Quan hệ một - mội quan hệ đơn giản, Ví dụ, một **Post** model có thể liên quan đến một **Tag**.
Để định nghĩa mối quan hệ này, chúng ta tạo 1 phương thức tag trong Post Model.
Hàm tag sẽ trả về kết quản của phương thức hasOne dựa trên lớp Eloquent Model.
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Get the Tag record associated with the Post.
     */
    public function tag()
    {
        return $this->hasOne('App\Tag');
    }
}
```
Tham số truyền vào đầu tiên của phương thúc hasOne là tên của Model liên quan. Một khi quan hệ đã được định nghĩa, chúng ta có thể truy suât bản ghi liên quan bằng cách sử dụng các thuộc tính động của Eloquent.

Ví dụ ta lấy ra 1 bài post có id = 1 và kèm theo tag của nó thì ta có thể viết như sau .

```php
$post = Post::find(1)->tag;
```
+ Đến đây nhiều bạn thắc mắc là cơ chế như thế nào mà nó lại có thể kết nối được đúng không.Như **php** thuần là các bạn phải thêm 1 khóa ngoại là **postid** để có thể kết nối được đúng không
Nhưng đến với **Eloquent** nó đã làm việc này thay cho bạn, nó đã giả sử khóa ngoại của relationship dựa trên tên của Model.
+ Trong trường hợp trên thì model **Tag** đã tự đông được gỉa sử một khóa ngoại là **post_id** 


Nếu bạn muốn ghi đè quy tắc này, bạn có thể truyền vào 1 tham số thứ 2 vào phương thức **hasOne**
```php
return $this->hasOne('App\Tag', 'foreign_key');
```
Ngoài ra Eloquent còn giả sử rằng khóa ngoại có 1 giá trị tương ứng với cột **id** (hay khóa chính do chính bạn đặt $primaryKey) của bảng chứa khóa chính,

Hay nói cách khác, Eloquent sẽ tự tìm kiếm giá trị của **post id** trong cột **post_id** của record **Tag** 

Nếu như bạn muốn sử dụng 1 cột khác cột id bạn cần phải truyền vào phương thức hasOne 1 thamg số thứ 3 để chỉ định khóa chính này: 
```php
return $this->hasOne('App\Phone', 'foreign_key', 'local_key');
```
## Defining The Inverse Of The Relationship
Là quan hệ 1-1 chúng ta có thể diễn giải ví dụ trên là 1 bài viết thì có 1 tag vậy 1 tag sẽ thuộc 1 bài viết đúng không nào.
Vậy ên chúng ta có thể truy cập model **Post** trên Model **Tag**. Chúng ta có thể định nghĩa ngược hàm **hasOne** bằng cách sử dụng hàm **belongsTo**

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag` extends Model
{
    /**
     * Get the post that owns the tag.
     */
    public function user()
    {
        return $this->belongsTo('App\Post');
    }
}
```
Trong ví dụ trên Eloquent cũng sẽ so sánh **post_id** từ model **Tag** với **id** trong model **Post**

ELoquent xác định tên khóa ngoại mặc định bằng tên của bảng chứa khóa chính kèm theo sau là _id
Tuy nhiên nếu khóa ngoại của model Tag không phải là post_id thì bạn phải truyền tên khóa ngoại vào như là 1 tham số thứ 2 của hàm ***belongsTo***:
```php
public function post()
{
    return $this->belongsTo('App\POst', 'foreign_key');
}
```
Nếu model cha không sử dung id là primary key, hoặc bạn muốn join với 1 bảng khác bạn phải truyền tham số thứ 3 vào hàm belongsTo để chỉ định khóa này: 
```php
public function post()
{
    return $this->belongsTo('App\Post', 'foreign_key', 'other_key');
}
```
# One To Many (một - nhiều)(hasMany)
Chúng ta có 1 bài viết và comment của bài viết đấy thì lúc đấy chúng ta sẽ có quan hệ 1- nhiều.  Một bài viết thì sẽ có nhiều comment
lúc đấy để lấy được comment của bài viết thì chúng ta sẽ sử dụng phương thức hasMany trong model **Post**
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Get the comments for the blog post.
     */
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
```
Lưu ý rằng, Eloquent sẽ tự động xác định cột khóa ngoại trên model Commeny
Eloquent sẽ sử dụng đinh dang "snake case" là tên của model cộng với _id.Nên với ví dụ này sẽ coi khóa ngoại của model Comment là post_id.

Khi quan hệ đã được định nghĩa, chúng ta có thể truy cập danh sách comment bằng cách sử dụng thuộc tính **comments**
```php
$comments = App\Post::find(1)->comments;

foreach ($comments as $comment) {
    //
}
```
Tất nhiên các quan hệ cũng được dùng như query builders, bạn có thể thêm các ràng buộc khác cho những comments bằng cách gọi phương thước comments và tiếp tục thêm điều kiện vào truy vấn 
```php
$comments = App\Post::find(1)->comments()->where('created_ad', '2017')->first();
```
Giống như phương thức hasOne bạn cũng có thể định nghĩa khóa chính và khóa ngoại riêng cho mình bằng cách truyền tham số vào phương thức **hasMany**
```php
return $this->hasMany('App\Comment', 'foreign_key');

return $this->hasMany('App\Comment', 'foreign_key', 'local_key');
```
## One To Many (Inverse)
Bây giờ chúng ta có thể truy cập toàn bộ comment của bài Post, vậy ta cũng có thể định nghĩa 1 quan hệ để cho phép comment có thể truy cập vào bài biết
Chúng ta định nghĩa 1 hàm ngược trong model con gọi phương thức **belongsTo**:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /**
     * Get the post that owns the comment.
     */
    public function post()
    {
        return $this->belongsTo('App\Post');
    }
}
```
Khi đã định nghĩa chúng ta có thể lấy thông tin model Post cho 1 comment bằng cách truy cập vào "**dynamic property**" post
```php
$comment = App\Comment::find(1);

echo $comment->post->title;
```
Giống như phương thức hasOne bạn cũng có thể định nghĩa khóa chính và khóa ngoại riêng cho mình bằng cách truyền tham số vào phương thức **hasMany**
```php
return $this->belongsTo('App\Post', 'foreign_key');

return $this->belongsTo('App\Comment', 'foreign_key', 'local_key');
```
**KẾT LUẬN.**

Có lẽ bài hôm nay mình chi giới thiệu về 2 mối quan hệ của laravel thôi. Chứ nói hết thì sẽ rất nhiều. Các bạn chờ đón bài viết tiếp theo nhé