## 1. Giới thiệu

Bài viết này mình xin giới thiệu với các bạn 1 phương thức có sẵn của Laravel là `find()` và các cách sử dụng `find()` một cách hiệu quả nhất.

## 2. Các tham số của phương thức `find()`

Phương thức `find($id, $columns = ['*'])` có 2 tham số và yêu cầu tối thiểu 1 tham số khi sử dụng:
- `$id`: Giá trị cột khóa chính *primary_key* bạn muốn tìm, có thể truyền 1 hoặc 1 mảng các giá trị.
- `$columns`: Các cột muốn truy vấn (mặc định giá trị `$columns` sẽ là tất cả các cột `*`).

Giá trị trả về: nếu truyền `$id` là 1 mảng thì kết quả sẽ là 1 mảng các bản ghi có khóa chính nằm trong mảng `$id` và ngược lại thì chỉ trả về kết quả là 1 bản ghi có khóa chính bằng `$id`.

*Source code của phương thức `find()`*.
```php
/**
 * Find a model by its primary key.
 *
 * @param  mixed  $id
 * @param  array  $columns
 * @return \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Collection|static[]|static|null
 */
public function find($id, $columns = ['*'])
{
    if (is_array($id) || $id instanceof Arrayable) {
        return $this->findMany($id, $columns);
    }

    return $this->whereKey($id)->first($columns);
}
```

Ví dụ:
```php
$post = Post::find(1, ['id', 'title', 'url']);
```

```php
$postIds = [1, 2, 3];
$posts = Post::find($postIds, ['id', 'title', 'url']);
```

## 3. Các phương thức khác liên quan

Ngoài phương thức `find()` thì laravel còn cung cấp thêm các phương thức khác:
- `findMany($ids, $columns = ['*'])`: Tìm nhiều bản ghi theo mảng khóa chính `$ids`.
- `findOrFail($id, $columns = ['*'])`: Tìm bản ghi theo `$id` nếu không tìm thấy thì trả về *exception*.
- `findOrNew($id, $columns = ['*'])`: Tìm bản ghi theo `$id` nếu không tìm thấy thì tạo mới 1 *instance* của *model*.

## 4. Tham khảo

- [Laravel doc - Retrieving single models](https://laravel.com/docs/9.x/eloquent#retrieving-single-models)
- [Laravel github - Builder](https://github.com/guiwoda/laravel-framework/blob/master/src/Illuminate/Database/Eloquent/Builder.php#L259)

## 5. Lời kết

Trên website [Laravel](https://laravel.com/docs) đã có đầy đủ hướng dẫn chi tiết về tất cả các phương thức mà laravel hỗ trợ ngoài ra còn có trang github source [Laravel](https://github.com/laravel/framework) các bạn có thể đọc thêm cũng như thử nghiệm nhiều trường hợp để có thể sử dụng chúng một cách hiệu quả đúng trường hợp nhất nhé.

*Hi vọng chia sẻ này sẽ giúp các bạn newbie 1 phần nào trong quá trình tìm hiểu về Laravel. Nếu thấy hữu ích hãy cho mình 1 vote 👍 để thêm nhiều người biết đến chia sẻ này nhé.*

> Mình là **Công Thành** cám ơn các bạn đa theo dõi bài viết của mình, nếu có câu hỏi nào vui lòng bình luận phía dưới 👇 nhé.