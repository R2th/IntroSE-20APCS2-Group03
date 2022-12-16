![Hình ảnh minh hoạ](https://images.viblo.asia/bfa50c5d-358f-4e6b-9fd0-e9d4ef143a8b.jpg)

## Vấn đề
Hôm nay chúng ta sẽ đưa đến một vấn đề không phải mới, và chắc là các bạn cũng đã từng giải quyết rồi, đó chính là **lấy một đối tượng từ quan hệ `hasMany`**, ví dụ ta có 2 đối tượng là `Post` và `Comment` như sau đây:

![](https://images.viblo.asia/a0db372d-6274-4555-a03e-2e70084b3d3a.png)

Giả sử bạn sẽ cần lấy ra một danh sách bài viết và một bình luận mới nhất từng bài viết đó, bạn sẽ làm thế nào? 

![](https://images.viblo.asia/e5599877-ecac-44e9-a9f9-59195467a558.png)

Chúng ta có rất nhiều cách để thực hiện đề bài này
1. Thực hiện bình thường bằng Laravel relationship
2. Thực hiện bằng Laravel relationship & Eager loading
3. Thực hiện bằng Dynamic relationship & Eager loading

Hãy cùng nhau tìm hiểu qua từng cách làm cũng như ưu và khuyết điểm của mỗi cách tiếp cận nhé



### Sử dụng Laravel relationship
Trong Laravel bạn dễ dàng thực hiện được việc này thông qua model `Post` và quan hệ `comments`, mình bỏ qua bước tạo project nhé, ta đi tiếp vào ví dụ dưới đây:
```php
// Trong class Post.php ta có:
public function comments()
{
  return $this->hasMany('App\Models\Comment');
}
```
Và trong controller ta chỉ cần gọi `all()` và truyền dữ liệu qua view:
```php
$posts = Post::all();
return view('list', compact('posts'));
```
Trong view sẽ có 2 cột, **tên bài viết** và **bình luận mới nhất**:
```php
<table>
    <thead>
    <tr>
        <th>Bài viết</th>
        <th>Bình luận</th>
    </tr>
    </thead>
    <tbody>
    @foreach($posts as $post)
        <tr>
            <td>{{ $post->title }}</td>
            <td>{{ $post->comments->sortByDesc('created_at')->first()->content }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
```
Kết quả:
![](https://images.viblo.asia/4acf7697-f921-4f9f-9f87-b84206c4c6eb.png)

12 lần truy vấn CSDL trong một lần, đối với ví dụ này, số lượng không phải là quá nhiều, tuy nhiên với một số lượng lớp DB đến vài ngàn bài viết thì có vẻ sẽ rất tệ.

### Sử dụng relationship và Eager loading
Như đã nói ở [bài viết trước](https://viblo.asia/p/giai-quyet-van-de-n1-trong-quan-he-cha-con-vo-tan-bang-eager-loading-vyDZOk8PZwj), vấn đề truy vấn của Laravel có thể dễ dàng giải quyết bằng Eager loading. Ta sẽ tạo các relationship trong các model Post như sau:
```php
// HasMany
public function comments()
{
  return $this->hasMany('App\Models\Comment');
}
```
Controller:
```php
$posts = Post::with('comments')->get();
```
View:
```php
<table>
    <thead>
    <tr>
        <th>Bài viết</th>
        <th>Bình luận</th>
    </tr>
    </thead>
    <tbody>
    @foreach($posts as $post)
        <tr>
            <td>{{ $post->title }}</td>
            <td>{{ $post->comments->sortByDesc('created_at')->first()->content }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
```
Kết quả:
![](https://images.viblo.asia/888b8cb5-dbd8-450d-84da-e185e0595ddb.png)

### Vẫn là Eager Loading, nhưng là `hasOne`
Như bạn thấy, chúng ta đã giảm lượng truy vấn xuống còn 2 truy vấn, bạn cũng có thể tối ưu cho code đẹp hơn bằng cách tạo quan hệ `hasOne` giữa 2 đối tượng.
```php
// HasOne
public function latest_comment()
{
  return $this->hasOne('App\Models\Comment')->latest();
}
```
Controller:
```php
$posts = Post::with('latest_comment')->get();
```
View:
```php
<table>
    <thead>
    <tr>
        <th>Bài viết</th>
        <th>Bình luận</th>
    </tr>
    </thead>
    <tbody>
    @foreach($posts as $post)
        <tr>
            <td>{{ $post->title }}</td>
            <td>{{ $post->latest_comment->content }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
```
Kết quả:
![](https://images.viblo.asia/798056e2-5566-413e-87b1-e0ef065461c3.png)

Hola! code đã đẹp và rất dễ đọc. Tuy nhiên (lại tuy nhiên) nếu bạn để ý thấy ta chỉ cần dùng 20 model (10 post và 10 comment mới nhất) nhưng ở đây lại load đến 10010 model, tức là nó sẽ lấy ra 10 bài viết và **tất cả bình luận** của 10 bài viết đó 😱😱 Nếu bạn có một máy chủ không giới hạn dung lượng, việc này không sao, tuy nhiên nó sẽ làm giảm đáng kể khả năng xử lý và có vẻ không ổn, Hãy luôn ghi nhớ:
>  Database queries first, memory usage second
>  
### Giải quyết bằng Dynamic relationship
Trong ví dụ trên, ta đã thành công trong việc giảm thiểu tối đa các truy vấn không cần thiết nhưng vô tình đã làm tăng dung lượng ram. Hãy luôn nhớ "Database queries first, memory usage second" 
Việc này có thể giải quyết bằng cách thực hiện một [Subquery Select](https://laravel.com/docs/8.x/eloquent#subquery-selects) và tạo một relationship `belongsTo` cho `Post`

![](https://images.viblo.asia/7f24ba16-1c2f-41b8-bc1b-18233ef293a1.png)

Nhìn vào hình ở trên cho dễ hiểu, khi thực hiện truy vấn, ta sẽ thêm vào một cột tên là `latest_comment_id`, cột này được lấy từ bảng `comments` với các điều kiện đặt trước.

```php
// Relationship
public function latest_comment()
{
    return $this->belongsTo('App\Models\Comment', 'latest_comment_id', 'id');
}
// Subquery
public function scopeWithLatestComment($query)
{
    $query->addSelect([
        'latest_comment_id' => Comment::select('id')
            ->whereColumn('post_id', 'posts.id')
            ->orderBy('created_at', 'desc')
            ->take(1)
    ])->with('latest_comment');
}
```
Controller:
```php
$posts = Post::withLatestComment()->get();
```
View:
```php
<table>
    <thead>
    <tr>
        <th>Bài viết</th>
        <th>Bình luận</th>
    </tr>
    </thead>
    <tbody>
    @foreach($posts as $post)
        <tr>
            <td>{{ $post->title }}</td>
            <td>{{ $post->latest_comment->content }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
```
Kết quả:
![](https://images.viblo.asia/48ed1850-2506-4133-982c-52b83d36248b.png)

Bingo! kết quả chỉ có 2 truy vấn, và 20 model được tải lên ứng dụng, bộ nhớ sử dụng đã giảm từ 33mb ~ 18mb. Vậy là vừa đảm bảo được 2 tiêu chí đặt ra. Nếu thấy bài viết này hữu ít đừng ngại chia sẻ cho bạn bè mình nhé. Cảm ơn bạn đã đọc ♥

Xem thêm các bài viết của tác giả tại blog [Heliotech](https://heliotech.me)

Tham khảo:
- https://reinink.ca/articles/dynamic-relationships-in-laravel-using-subqueries
- https://laravel.com/docs/8.x/eloquent#subquery-selects