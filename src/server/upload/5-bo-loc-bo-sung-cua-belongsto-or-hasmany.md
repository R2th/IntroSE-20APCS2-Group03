### 1. Câu lệnh Where trong Relationships
Giả sử bạn có mối quan hệ giữa **Comment** và **Post** như sau:
```php
class Post extends Model {
    
    function comments() 
    {
        return $this->hasMany(Comment::class);
    }

}
```
Bây giờ bạn chỉ muốn lọc các comment đã được approve với field **comments.approved_at IS NOT NULL**.<br>
Trong Controller bạn có thể lấy trường này bằng cách:
```php
$post = Post::find($post_id);
$comments = $post->comments()->whereNotNull('approved_at');
```
Nhưng bạn cũng có thể tạo 1 relationship riêng có việc này:
```php
class Post extends Model {
    
    function comments() 
    {
        return $this->hasMany(Comment::class);
    }

    function approved_comments()
    {
        return $this->hasMany(Comment::class)->whereNotNull('approved_at');
    }

}
```
Sau đó trong Controller bạn chỉ cần gọi nó ra :
```php
$comments = $post->approved_comments();
```
### 2. Soft-deletes withTrashed()
Nếu bạn sử dụng chức năng[ Soft Deleting](https://laravel.com/docs/5.7/eloquent#soft-deleting) và có cột deleted_at trong bảng cơ sở dữ liệu của mình, bạn có thể vẫn muốn hiển thị bản ghi gốc đó ngay cả khi nó soft-deleted.<br>
Ví dụ: bạn đang cố gắng liệt kê các bình luận với bài post của họ, trong Blade:
```php
@foreach ($comments as $comment)
    <tr>
      <td>{{ $comment->created_at }}</td>
      <td>{{ $comment->post->title ?? '' }}</td>
      <td>... more fields ...</td>
    </tr>
@endforeach
```
Và nếu bài post gốc đó bị soft-deleted, nhưng bạn vẫn muốn hiển thị nó trong danh sách bình luận thì sao?<br>
Chỉ cần thêm method **withTrashed()** trong quan hệ của bạn:
```php
class Comment extends Model {

    function post()
    {
        return $this->belongsTo(Post::class)->withTrashed();
    }
 
}
```
### 3.  orderBy() trực tiếp trong Model
Giả sử bạn muốn lấy tất cả các bình luận của bài post đã được approve theo thứ tự, sẽ là:
```php
$ordered_comments = $post->comments()->orderBy('approved_at', 'desc');
```
Tuy nhiên ta có thể chỉ định trực tiếp điều đó trong Model như sau:
```php
class Post extends Model {
    
    function comments() 
    {
        return $this->hasMany(Comment::class)->orderBy('approved_at', 'desc');
    }

}
```
Bây giờ, mỗi khi bạn gọi $ post->comments(), tất cả các bình luận sẽ được sắp xếp tự động.
### 4. Lựa chọn các trường mà bạn muốn lấy
Nếu bạn có các bảng cơ sở dữ liệu với nhiều trường, nhưng đối với một số mối quan hệ nhất định, bạn chỉ cần một vài trường trong số chúng, bạn có thể làm điều đó - một lần nữa - trực tiếp trong Model, bằng cách sử dụng phương thức select().
```php
class Comment extends Model {

    function post()
    {
        return $this->belongsTo(Post::class)->select(['id', 'title']);
    }
 
}
```
### 5. withDefault() để tránh Errors
Nếu bạn cố gắng tham chiếu thực thể parent không tồn tại nữa, bạn sẽ gặp lỗi, giống như cố gắng lấy thuộc tính của non-object. Ví dụ:
```php
@foreach ($comments as $comment)
    <tr>
      <td>{{ $comment->created_at }}</td>
      <td>{{ $comment->post->title }}</td>
      <td>... more fields ...</td>
    </tr>
@endforeach
```
Nếu bài post đã bị xóa, lỗi sẽ xuất hiện và làm chết trang web của bạn. Tất nhiên, bạn có thể ngăn điều đó bằng câu điều kiện, như trong ví dụ trên: **{{ $comment->post->title  ??  ” }}** Nhưng có cách nhìn thanh lịch hơn - bạn có thể sử dụng **withDefault()** trong mối quan hệ:
```php
public function post()
{
    return $this->belongsTo(Post::class)->withDefault();
}
```
Trong trường hợp này, sẽ không có lỗi nào được hiển thị và bất kỳ thuộc tính nào trong object không tồn tại sẽ được hiển thị dưới dạng chuỗi rỗng.<br>
Nhưng bạn có thể override các giá trị mặc định, bằng cách chỉ định chúng như tham số:
```php
public function post()
{
    return $this->belongsTo(Post::class)->withDefault([
        'title' => '[Deleted post]',
    ]);
}
```
### Kết luận
Vậy, đây là 5 cách để lọc các mối quan hệ Eloquent trong các model, mà không thực hiện điều này này trong Controller hoặc các nơi khác.<br><br>
Nguồn tham khảo: https://laraveldaily.com/did-you-know-five-additional-filters-in-belongsto-or-hasmany/?ref=LaravelCollections.com