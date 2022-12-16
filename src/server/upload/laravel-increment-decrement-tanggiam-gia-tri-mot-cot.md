## 1. Giới thiệu

Bài viết này mình xin giới thiệu với các bạn 2 phương thức có sẵn của Laravel là `increment()` và `decrement()` giúp chúng ta tăng hoặc giảm giá trị của 1 cột nhanh chóng và chuyên nghiệp hơn.

## 2. Phương thức `increment()`

Phương thức `increment($column, $amount, $extra = [])` tăng giá trị của 1 cột, phương thức này có 3 tham số và chấp nhậm ít nhất 1 tham số:
- `$column`: Tên cột của bạn trong *database*
- `$amount`: Giá trị bạn muốn tăng (mặc định là 1)
- `$extra`: Các cột khác muốn cập nhật sau khi tăng `$column`

Không sử dụng `increment()`
```php
$post = Post::find($postId);
$post->view_count++; // +1
$post->user_id = Auth::id(); // update user_id
$post->save();
```

Sử dụng `increment()`
```php
$post = Post::find($postId);
$post->increment('view_count', 1, ['user_id' => Auth::id()]); // view_count + 1 and update user_id
```

## 3. Phương thức `decrement()`
Phương thức `decrement($column, $amount, $extra = [])` giảm giá trị của 1 cột, phương thức này có 3 tham số và chấp nhậm ít nhất 1 tham số:
- `$column`: Tên cột của bạn trong *database*
- `$amount`: Giá trị bạn muốn giảm (mặc định là 1)
- `$extra`: Các cột khác muốn cập nhật sau khi giảm `$column`

Không sử dụng `decrement()`
```php
$post = Post::find($postId);
$post->vote_count++; // -1
$post->user_id = Auth::id(); // update user_id
$post->save();
```

Sử dụng `decrement()`
```php
$post = Post::find($postId);
$post->decrement('vote_count', 1, ['user_id' => Auth::id()]); // vote_count - 1 and update user_id
```

## 4. Tham khảo

- [Laravel doc](https://laravel.com/docs/9.x/queries#increment-and-decrement)
- [Laravel github](https://github.com/laravel/framework/blob/9.x/src/Illuminate/Database/Eloquent/Model.php#L874)

## 5. Lời kết

Trên website Laravel đã có đầy đủ hướng dẫn chi tiết về tất cả các phương thức mà laravel hỗ trợ các bạn có thể đọc cũng như thử nghiệm nhiều trường hợp để có thể sử dụng chúng một cách hiệu quả đúng trường hợp nhất nhé.

*Hi vọng chia sẻ này sẽ giúp các bạn newbie 1 phần nào trong quá trình tìm hiểu về Laravel. Nếu thấy hữu ích hãy cho mình 1 vote 👍 để thêm nhiều người biết đến chia sẻ này nhé.*

> Mình là **Công Thành** cám ơn các bạn đa theo dõi bài viết của mình, nếu có câu hỏi nào vui lòng bình luận phía dưới 👇 nhé.