Chào các bạn.

Tiếp tục với Relationships trong Laravel, bài viết này mình sẽ chia sẻ về truy vấn trong khi dùng **relationships** (Querying Relations) nhé. À, link cho bạn nào muốn tìm [phần 2](https://viblo.asia/p/eloquent-relationships-trong-laravel-phan-2-Qbq5QjELKD8) đây nhé.
## 3. Querying Relations
Như các bạn đã biết ở những phần trước, sau khi chúng ta xác định các quan hệ trong model, ta có thể gọi nó như 1 thuộc tính của model để lấy dữ liệu. Tuy nhiên, ta cũng có thể gọi nó chỉ để trả về 1 thể hiện (instance) của mối quan hệ đó mà không thực sự cần trả về dữ liệu. Hơn nữa, tất cả các loại Eloquent relationships đóng vai trò như **query builders**, vì vậy sau khi gọi quan hệ, bạn có thể tiếp tục viết thêm truy vấn, thêm ràng buộc trước khi thực hiện truy vấn với database.

Ví dụ: một model `User` có quan hệ 1 - n với model `Post` (1 user có nhiều bài post)
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Lấy tất cả các post của user
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
```
Để lấy tất cả các post của user có $id = 1, mình sẽ dùng như thế này: 
```
$user = App\User::find(1);

$posts = $user->posts;
```
Vậy nếu mình chỉ muốn lấy những post có thuộc tính `active = 1` thì sao nhỉ? Thay vì check lại kết quả bên trên, ta có thể viết thêm truy vấn sau relationship. Đơn giản như này:
```
$posts = $user->posts()->where('active', 1)->get();
```
**Chú ý**: mình gọi `posts()` chứ không phải `posts` nhé.

Tương tự, bạn có thể dùng các truy vấn của query builder khác nhé, chỉ cần đọc document và nhớ để dùng thôi :)

**orWhere**
Khi nối thêm truy vấn sau relationship, chúng ta nên chú ý `orWhere` một chút. Ví dụ cho dễ hiểu. Để lấy các post có `active = 1` hoặc `votes >= 100`, sẽ viết như này
```
$user->posts()
    ->where('active', 1)
    ->orWhere('votes', '>=', 100)
    ->get();
```
Đoạn code này tương ứng với truy vấn:  `select * from posts
where user_id = ? and active = 1 or votes >= 100` ==> **Sai** so với điều chúng ta mong đợi nhỉ. Vậy nên, khi dùng `orWhere` cần chú ý 1 chút, cần nhóm các điều kiện lại để truy vấn đúng.
```
$user->posts()
    ->where(function (Builder $query) {
        return $query->where('active', 1)
            ->orWhere('votes', '>=', 100);
    })
    ->get();
```
Tương đương: `select * from posts where user_id = ? and (active = 1 or votes >= 100)`.
### 3.1. Dynamic Properties
Như phần trước đã nói đến, khi 1 relationship được xác định, nó có thể được gọi như 1 Dynamic Properties (thuộc tính động) của model. Dynamic Properties là "lazy loading" (mình nghĩ không nên dịch từ này), nghĩa là **các relationship chỉ được load khi bạn gọi đến nó** (VD: $user->posts). 

Ở phần sau, mình sẽ nói về Eager loading, đây là 1 cách để chúng ta load trước những relationship ngay khi truy vấn dữ liệu, giúp giảm đáng kể số câu truy vấn với relations. (Các bạn nhớ đón đọc phần sau nhé).
### 3.2. Truy vấn sự tồn tại relationship
Vấn đề đặt ra khi bạn muốn truy vấn dựa trên sự tồn tại của relationship của đối tượng nào đó. Ví dụ: bạn muốn lấy ra các post mà có ít nhất 1 bình luận. Bạn sẽ làm như thế nào???

Rất đơn giản, bạn sẽ dùng phương thức `has` và `orHas` nhé.
```
$posts = Post::has('comments')->get();
```
hoặc là thêm chút ràng buộc
```
$posts = Post::has('comments', '>=', 3)->get();
```
Nếu muốn truy vấn dựa trên các relation lồng nhau, ta sẽ dùng dấu `.` nhé. Ví dụ truy vấn các post có ít nhất 1 comment có 1 votes:
```
$posts = Post::has('comments.votes')->get();
```
Nếu bạn cần những ràng buộc mạnh mẽ hơn thì dùng `whereHas` và `orWhereHas` nhé. Các phương thức này cho phép chúng ta tùy chỉnh thêm ràng buộc relationship. Ví dụ, lấy các post có comment có nội dung phù hợp điều kiện:
```
use Illuminate\Database\Eloquent\Builder;

// lấy ra các post có ít nhất 10 comment có chứa từ foo
$posts = Post::whereHas('comments', function (Builder $query) {
    $query->where('content', 'like', 'foo%');
}, '>=', 10)->get();
```
### 3.3. Truy vấn dựa trên sự không tồn tại relationship
Ngược lại với phần 3.2, ở đây chúng ta sẽ lấy ra các bài post mà không có `comment` nào cả. Ta dùng `doesntHave` và `orDoesntHave` nhé.
```
$posts = Post::doesntHave('comments')->get();
```
Tương tự như `has` ở phần 3.2, để có thể truy vấn với ràng buộc mạnh mẽ hơn, chúng ta có thể dùng `whereDoesntHave` và `orWhereDoesntHave` nhé. Ví dụ:
```
use Illuminate\Database\Eloquent\Builder;

// lấy ra các bài post không có comment có nội dung chứa từ foo
$posts = Post::whereDoesntHave('comments', function (Builder $query) {
    $query->where('content', 'like', 'foo%');
})->get();
```
### 3.4. Truy vấn với Polymorphic Relationships
Để truy vấn với Polymorphic Relationships, ta dùng phương thức `whereHasMorph`, `whereDoesntHaveMorph` và các phương thức tương ứng. Cần chú ý các tham số truyền trong các hàm này.
```
use Illuminate\Database\Eloquent\Builder;

// Lấy ra các comment của post hoặc video có title chứa từ foo
$comments = Comment::whereHasMorph(
    'commentable',
    [Post::class, Video::class],
    function (Builder $query) {
        $query->where('title', 'like', 'foo%');
    }
)->get();

// Lấy ra các comment của post có title không chứa từ foo
$comments = App\Comment::whereDoesntHaveMorph(
    'commentable',
    Post::class,
    function (Builder $query) {
        $query->where('title', 'like', 'foo%');
    }
)->get();
```
Bạn cũng có thể dùng tham số `$type` để thêm các điều kiện với relationship.
```
use Illuminate\Database\Eloquent\Builder;

$comments = Comment::whereHasMorph(
    'commentable',
    [Post::class, Video::class],
    function (Builder $query, $type) {
        $query->where('title', 'like', 'foo%');

        if ($type === Post::class) {
            $query->orWhere('content', 'like', 'foo%');
        }
    }
)->get();
```
Để có thể truy vấn từ tất cả các kiểu model, thay vì việc truyền 1 mảng các model vào tham số thứ 2 của các phương thức, ta có thể thay nó bằng dấu `*` nhé.
### 3.4. Đếm kết quả trả về từ relationship (Counting Related Models)
Nếu bạn cần đếm số lượng kết quả trả về từ 1 quan hệ và không cần load chúng thì có thể dùng phương thức `withCount` nhé. Hàm này sẽ thêm 1 cột `{relation}_count` vào trong kết quả, sau đó bạn có thể gọi ra như 1 Dynamic Properties :)
```
$posts = Post::withCount('comments')->get();

foreach ($posts as $post) {
    echo $post->comments_count;
}
```
* Nâng cao 1 chút, ta có thể đếm nhiều quan hệ, kết hợp với các ràng buộc thêm. Ví dụ:
```
$posts = Post::withCount(['votes', 'comments' => function (Builder $query) {
    $query->where('content', 'like', 'foo%');
}])->get();
```
Sau đó lấy kết quả bằng cách: 
```
echo $posts[0]->votes_count;
echo $posts[0]->comments_count;
```
* Đếm 1 quan hệ nhiều lần với nhứng điều kiện khác nhau. Ví dụ:
```
$posts = Post::withCount([
    'comments',
    'comments as pending_comments_count' => function (Builder $query) {
        $query->where('approved', false);
    },
])->get();

echo $posts[0]->comments_count;

echo $posts[0]->pending_comments_count;
```
* Nếu viết kèm với phương thức `select`, ta sẽ viết `withCount` sau `select`
* Phương thức `loadCount` giúp ta load số lượng kết quả relationship sau khi model cha đã được truy xuất.
```
$book = Book::first();

$book->loadCount('genres');
```
Để thêm ràng buộc cho hàm này, ta rẽ truyền vào 1 mảng với `key` là tên quan hệ, `value` là các `Closure` thực hiện truy vấn.
```
$book->loadCount(['reviews' => function ($query) {
    $query->where('rating', 5);
}])
```

## Tổng kết
Ở phần 3 này, mình đã chia sẻ về cách truy vấn nâng cao khi dùng relationship trong Laravel. Phần tiếp theo mình sẽ chia sẻ về Eager Loading, m.n đón đọc nha.