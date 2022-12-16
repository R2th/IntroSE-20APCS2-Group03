Laravel có lẽ không còn xa lạ gì với những PHP Developer nữa rồi, đó là một framework theo mình đánh giá có lẽ là tốt nhất hiện này của PHP với rất nhiều tính năng. Nhưng không phải tất cả những thứ mà Laravel làm được đều có ở trong documentation của nó. Dưới đây sẽ là một vài tính năng mà có thể bạn sẽ chưa được biết

## 1. getOriginal()
Sau khi làm thay đổi một biến lấy từ Model bằng cách gán giá trị mới cho phần tử của nó, bạn vẫn có thể lấy được giá trị ban đâu của phần tử đó ra bằng cách sử dụng `getOriginal`
```php
$post = Post::find($id);

dump($post->title) //Đây là tiêu đề bài viết

$post->title = 'Đây là tiêu đề đã được chỉnh sửa';

dump($post->title) //'Đây là tiêu đề đã được chỉnh sửa

dump($post->getOriginal('title')) //Đây là tiêu đề bài viết 

dump($post) //Kết quả ban đầu của $post
```

## 2. isDirty()
Kiểm tra xem giá trị của một biến lấy từ Model có bị thay đổi không (Nghe như là đang xem tâm hồn đã bị vấy bản chưa vậy :smile:)
```php
$post = Post::find($id);

dump($post->isDirty()) //false

$post->title = 'Đây là tiêu đề đã được chỉnh sửa';

dump($post->isDirty()) //true
dump($post->isDirty('title')) //true
dump($post->isDirty('content')) //false
```

## 3. Thay đổi tên cột 'deleted_at'
Nếu bạn sử dụng  ```solf delete``` trong Laravel thì thời gian dữ liệu của bạn bị xoá sẽ được lưu vào cột ```deleted_at```. Nếu bạn muốn đổi tên cột đó thì hãy làm như sau nhé

```php
class Post extends Model
{
    use SoftDeletes;

    const DELETED_AT = 'delete_time';
}
```

## 4. push()
Bạn có thể lưu lại giá của của một kết quả lấy từ model và quan hệ của nó. Mình sẽ có quan hệ giữa bài viết và tác giả là 1 nhiều: 1 bài viết sẽ có 1 tác giả. Ở trong model ```Post```

```php
class Post extends Model
{
    public function author()
    {
        return $this->belongTo(Author::class);
    }
}
```

Đoạn xử lý sẽ như sau
```php
$post = Post::find($id);
$post->title = 'Title 1';
$post->author->last_action_time = Carbon::now()->toDateTimeString();
$post->push(); //Cập nhập cả 2 bảng posts và authors trong DB
```

## 5. is()
Giúp bạn kiểm tra trùng 2 giá trị từ model
```php
$post = Post::find(1);
$samePost = Post::find(1);
$otherPost = Post::find(10);

dump($post->is($samePost)); //true;
dump($post->is($otherPost)); //false;
```

## 6. replicate()
Bạn có thể sao chép một giá trị của một model và lưu lại thành một bản ghi mới;
```
$post = Post::find($id);
$copiedPost = $post->replicate();
$copiedPost->save();
```

## 7. Chọn ra những giá trị cần lấy từ find()
Bạn có thể chỉ lấy ra những giá trị bạn muốn, nó sẽ giống như việc thay vì bạn ```select * from``` thì bạn ```select column1, column2, ... from ```
```php
$post = Post::find($id, ['title', 'content']);
$post = Post::findOrFail($id, ['title', 'content']);
```

Trên đây là một vài thứ mình nghĩ sẽ giúp ích cho bạn, cảm ơn các bạn đã đọc :smile:

Tham khảo: https://medium.com/@JinoAntony/10-hidden-laravel-eloquent-features-you-may-not-know-efc8ccc58d9e