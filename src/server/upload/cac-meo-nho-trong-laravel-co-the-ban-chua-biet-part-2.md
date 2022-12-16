Laravel là một trong những Framework PHP phổ biến hiện nay, với sự hỗ trợ tuyệt vời cho hầu hết yêu cầu của lập trình viên. Tuy nhiên, bên cạnh những tính năng được viết trong documents thì Laravel còn khá nhiều tính năng ẩn. Trong bài viết này, mình sẽ chia sẽ những mẹo về Laravel mà mình sưu tầm được.

Xem thêm: [Các mẹo nhỏ trong Laravel có thể bạn chưa biết. (Part 1)](https://viblo.asia/p/cac-meo-nho-trong-laravel-co-the-ban-chua-biet-part-1-Eb85ooyj52G)

## 1. Model all: columns
Khi sử dụng `Model::all()`, bạn có thể chọn các cột muốn lấy từ database.
```php
$users = User::all(['id', 'name', 'email']);
```

## 2. Cách tránh lỗi trong {{ $post->user->name }} nếu user không tồn tại?
Khi định nghĩa relationship, bạn có thể gán model mặc định với `withDefault()` để  tránh lỗi khi gọi `{{ $post->user->name }}` nếu `$post->user` không tồn tại.
```php
/**
    * Get the author of the post.
    */
public function user(){
    return $this->belongsTo(User::class)->withDefault();
}
```

## 3. Điều kiện trong relationship.
```php
class Category extends Model
{
	public function posts()
	{
		return $this->hasMany(Post::class)->where('status', '!=', 'hide');
	}
}
```

## 4. Viết gọn where trong Query Builder
3 đoạn code dưới đây là tương tự nhau:
```
$products = Product::where('category', '=', 3)->get();

$products = Product::where('category', 3)->get();

$products = Product::whereCategory(3)->get();
```

## 5. Update parent timestamps relationship
Khi một Model có quan hệ `belongsTo` hoặc `belongsToMany` một Model khác, ví dụ Comment `belongsTo` Post. Nếu bạn muốn update timestamp của parent Model khi child Model được update, ví dụ khi Comment được update thì trường updated_at của Post cũng được update theo. Bạn chỉ cần thêm thuộc tính `$touches` vào Model.

```php
class Comment extends Model
{
    protected $touches = ['post'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
```
Khi bạn thực hiện update comment như dưới đây, trường updated_at của Post sẽ tự động update.
```
$comment = App\Comment::find(1);

$comment->text = 'Edit to this comment!';

$comment->save();
```
Nếu có thuộc tính `$touches` nhưng trong một số trường hợp bạn không muốn update timestamp của parent Model, bạn chỉ cần thêm options ```['touch' => false]``` và method ```save()```.

```
$comment = App\Comment::find(1);

$comment->text = 'Edit to this comment!';

$comment->save(['touch' => false]);
```