## Tạo cùng lúc cả Model và Migration trong Laravel
Đây là một thủ thuật rất phổ biến và có thể bạn đã biết. Tuy nhiên mình vẫn liệt kê ra vì trang chủ Laravel không đề cập tới và sử dụng nó sẽ giúp chúng ta đỡ thêm một bước. Lấy một ví dụ nhỏ khi bạn build một blog bằng Laravel mà muốn tạo cả Model cũng như Migration file cho các posts. Bình thường thì bạn sẽ lần lượt chạy 2 câu lệnh Artisan như sau:
```
$ php artisan make:migration create_posts_table
$ php artisan make:model Post
Tuy nhiên thực ra chúng ta chỉ cần dùng 1 câu lệnh là đủ:
$ php artisan make:model Post -m
```
Rất đơn giản phải không :D?

## Eloquent Query Scopes

Sử dụng lại ví dụ về Blog ở mục trên, giả sử table posts của chúng ta có một cột is_published lưu giữ một trong 2 giá trị 0 và 1 (tương ứng với false và true). Bây giờ ở trang blog index, chúng ta chỉ cho phép người dùng xem những bài viết đã được published, tức là is_published = 1. Vậy làm thế nào để lọc các bài post chưa được published sử dụng Eloquent? Câu trả lời rất đơn giản: sử dụng truy vấn where
Post::where('is_published', true)->get();
Chỉ cần như vậy là đã ổn. Tuy nhiên nếu như chúng ta muốn sử dụng lại câu truy vấn trên ở một vài nơi khác. Bạn có thể làm vậy tuy nhiên nó không hợp với nguyên tắc lập trình DRY cho lắm. Thay vào đó, chúng ta có thể sử dụng Eloquent Query Scopes để code dễ đọc và tái sử dụng hơn. Ở trong Post model, chúng ta sẽ tạo method mới tên là scopePublished:

```
class Post extends Model
{
    public function scopePublished($query)
    {
        return $this->where('is_published', true);
    }
}
```
Để lấy ra các bài post đã được publish, đơn giản chúng ta chỉ cần gọi
`Post::published()->get();`
Laravel sẽ hiểu và tự động dịch sang method scopePublished. Lưu ý rằng bất cứ method nào ở trong Eloquent mà có tiền tố là scope đều được Laravel auto translate như kiểu vừa rồi. (Chả biết phải diễn tả thế nào cho chuẩn nữa :D) 

## Dynamic Method Names
Cũng khá tương tự như scope và accesor. Chúng ta thử lấy ví dụ với method where chẳng hạn:
```

// Post::where('published', 1)->get();
Post::wherePublished(1)->get();

// Post::where('category', null)->get();
Post::whereNull('category')->get();

// Post::where('category', '!=', null)->get();
Post::whereNotNull('category')->get();
```

Một chút dễ đọc hơn, thế là đủ!

## Eloquent Relationships tự động orderBy
Giả sử chúng ta có mối quan hệ một nhiều giữa bảng Categories và Products. Chúng ta thường hiển thị danh sách các product ra ngoài View. Nếu chúng ta muốn sắp xếp thứ tự theo bảng chữ cái thì chúng ta có method orderBy của Eloquent. Nhưng cứ mỗi lần hiển thị lại phải query y như vậy tiếp hay sao? Chúng ta nên định nghĩa thứ tự sắp xếp ngay ở trong Model.

Bình thường thì Model Products sẽ có dạng như này:
```

class Category extends Model
{
    public function products()
    {
        return $this->hasMany('App\Product');
    }
}
```
Bây giờ chúng ta có thể tự động sắp xếp các products theo title ở bất cứ query nào mà có sử dụng mối quan hệ này:
```

    public function products()
    {
        return $this->hasMany('App\Product')->orderBy('name');
```
    }
Bây giờ mọi thứ đã có trật tự cả rồi!

[Nguồn](https://kipalog.com/posts/Thu-thuat-Eloquent-trong-Laravel)