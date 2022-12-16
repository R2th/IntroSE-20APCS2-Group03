Hôm nay mình sẽ cho các bạn hiểu  Eager Loading trong  laravel hoạt động thế nào và tại sao chúng ta nên sử dụng nó.

Ví dụ tôi có bảng "posts" và "comments" và chúng  liên kết với nhau. posts có nhiều comments . Tương ứng với model và method định nghĩa dưới đây: 

**Post.php**
```
<?php
   
namespace App;
  
use Illuminate\Database\Eloquent\Model;
   
class Post extends Model
{
    /**
     * Get the comments
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
```

**Comment.php**
```
<?php
   
namespace App;
  
use Illuminate\Database\Eloquent\Model;
   
class Comment extends Model
{
    /**
     * Get the post
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
```
Như trên bình thường ta muốn hiển thị tất cả các comments thuộc 1 bài viết thì ta sẽ làm như sau: 

**Display Post:**
```
$posts = Post::all();
   
foreach ($posts as $post) {
    echo $post->name;
   
    $comments = $post->comments;
    /* You can write loop again  */
}
```

Cách trên logic thực sự không sai nhưng bạn cần phải xem nó hoạt động thế nào và mất bao nhiêu câu truy vấn và hãy xem:
```
-- Select the posts i.e. Post::all();

SELECT * FROM posts;

   

-- Foreach of the posts, another query to select the comments

-- i.e. $post->comments part of the loop

SELECT * FROM comments WHERE post_id = 1

SELECT * FROM comments WHERE post_id = 2

SELECT * FROM comments WHERE post_id = 3

SELECT * FROM comments WHERE post_id = 4

SELECT * FROM comments WHERE post_id = 5

.....
```

Ta thấy mỗi vòng lặp nó thực hiện 1 truy vấn lấy ra các comments có post_id tương ứng .Vì vậy bất kì khi nào muốn hiển thị 50 bản ghi thì sẽ có 50 câu truy vấn phía sau nó.
Để giải quyết vấn đề này chúng ta sẽ sử dụng Eager Loading trong laravel như sau:
```
$posts = Post::with('comments')->get();
   
foreach ($posts as $post) {
    echo $post->name;
   
    $comments = $post->comments;
    /* You can write loop again  */
}
```
Bạn có thể thấy các câu truy vấn tương ứng như sau:
```
-- Select the posts i.e. Post::all();

SELECT * FROM posts;

   

-- Just One time get all comments with for that posts

SELECT * FROM comments WHERE post_id IN (1, 2, 3, 4, 5, ...);
```
Về cơ bản các bạn sẽ hiểu cách làm việc của eager loading và cách sử dụng nó và hãy sử dụng nó trong dự án của bạn.

Bây giờ tôi sẽ cho bạn thêm ví dụ cho Eager Loading trong laravel. Vì vậy, bạn có thể sử dụng với cách linh hoạt. Vì vậy, hãy xem dưới đây một số ví dụ:

**Eager Loading With Multiple Relationships**
```
$posts = Post::with(['comments', 'author'])->get();
```
**Eager Loading With Count**
```
$posts = Post::withCount('comments')->get();
  
// comments_count
```
**Eager Loading With Nested Relationship**

`$posts = Post::with(['comments', 'comments.user'])->get();`

**Eager Loading With Select Specific Columns**
```
$posts = Post::with(['comments:is,body'])->get();
```
**Eager Loading With Where Condition**
```
$posts = Post::with(['comments' => function ($query) {
    $query->where('type', 1);
}])->get();
```
**Eager Loading With Order By**
```
$posts = Post::with(['comments' => function ($query) {
    $query->orderBy('created_at', 'desc');
}])->get();
```
Và có thể còn nhiều hơn nữa...
Mình hy vọng các bạn có thể hiểu eager loading trong laravel và áp dụng nó vào trong ứng dụng của bạn.
Chúc các bạn thành công.
### Tài liệu tham khảo: https://itsolutionstuff.com/post/laravel-eager-loading-tutorialexample.html