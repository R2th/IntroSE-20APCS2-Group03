# 1. Models để làm gì?
- Nói đến **model** thì chúng ta phải nhắc đến một mô hình đó là **MVC (Model-View-Controller)**.
- **MVC** là mô hình phân chia application thành 3 thành phần chính và mỗi thành phần đảm nhiệm một nhiệm vụ riêng.
- Trong đó:

    - **Model**: chuyển xử lý các logic thao tác với DB.
    - **View**: đảm nhiệm việc hiển thị và tương tác với người dùng.
    - **Controller**: Thực hiện việc điều hướng giữa các đối tượng tham gia hệ thống.

- Những trong phần này mình chỉ nói đến nội dung chính là **Model**.

# 2. Eloquent Model
- Trong `laravel` thì **ORM** hay **Object Relational Mapping** là để chỉ việc ánh xạ các bản ghi trong `database` sang dạng đối tượng mà mã nguồn đang định dạng trong class. Nhờ có kỹ thuật **ORM** mà các lập trình viên dễ dàng thao tác với `database` hơn.
## Định nghĩa Model
- Trong `laravel` thì để có thể định nghĩa ra một `Model` ta sử dụng lệnh:
```
php artisan make:model Post
```

- Kết quả:
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
}
```
- Đặc biệt bạn có thể tạo `Model` cùng với `migration` của nó bằng cách thêm option `--migrate` hoặc `-m`
```
php artisan make:model Post -m
```

## Bảng trong database
- Như ở trên đã định nghĩa một `Model` có tên là `Post` thì Model này sẽ mặc định mapping đến bảng có tên `posts` trong databse.
- Nhưng bạn cũng có thể thay đổi nó bằng cách:
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'my_posts';
}
```
> Chú ý: bạn phải đặt tên bảng theo quy chuẩn **snake case**.

- Khi bạn khai báo `$table = 'my_posts'`  thì `Illuminate\Database\Eloquent\Model` sẽ hiểu rằng bảng mà bạn muốn mapping đến là `my_posts` mà không phải là `posts`.
- Ngoài tên bảng thì bạn cũng có thể định nghĩa khóa chính cho bảng đó (khóa mặc định sẽ là `id`) bằng cách:
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $primaryKey = 'id_post';
}
```
- Khi đó Khóa chính của bảng đó sẽ là `id_post`.
## Lấy dữ liệu từ DB
- Sau khi bạn đã định nghĩa ra `Model` thì chúng ta nên test thử xem `Model` có hoạt động không thôi.
- Ở bảng `posts` mỉnh chỉ định nghĩa 2 trường đó là `title` và `content`
- Để kiểm tra thì `laravel` cung cấp cho chúng ta một thứ là `Tinker`:
```
php artisan tinker
```
- Mình sẽ tạo một bài viết mới và lưu nó vào trong database nhé
```
$post = new App\Post
$post->title = "Bai viet moi"
$post->content = "Day la noi dung cua bai viet"
$post->save()
```
- Và đây là kết quả:

![image.png](https://images.viblo.asia/e8d5f018-5afd-427d-8419-6562ff4acdf0.png)

- Nếu bạn thấy `true` nghĩa là `Model` đã mapping đúng đến bảng `posts` trong database rồi đó.
- Được rồi bây giờ lấy dữ liệu thôi
```
//lấy tất cả dữ liệu
$posts = App\Post::all();
//truy vấn theo điều kiện
$post = App\Post::where('title', '=', 'Bai viet moi')->orderBy('id', 'DESC')->get()
//lấy một bản ghi
$post = App\Post::find(1) //hay App\Post::where('id', 1)->first()
```

## Insert và Update Models
- Insert:
```PHP
$post = new App\Post
$post->title = "Bai viet moi"
$post->content = "Day la noi dung cua bai viet"
$post->save()
```
- Update:
```PHP
$post = new App\Post::find(1)
$post->title = "Bai viet moi"
$post->content = "Day la noi dung cua bai viet"
$post->save()
```
- Update hàng loạt:
```PHP
App\Post::where('id', '>', 0)
    ->update(['title' => 'tiet de moi', 'content' => 'noi dung moi']);
```
- Sau khi chạy thì tất cả các bản ghi có `id > 0` sẽ được update lại trường `title` và `content`.

## Deleting Model
- Xóa cứng dữ liệu(xóa vĩnh viễn và không thể lấy lại):
```PHP
$post = new App\Post::find(1)
$post->delete()
//hoặc
$post = Post::where('id', 1)->delete()
```
- Xóa mềm dữ liệu(xóa nhưng có thể lấy lại):
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'title',
        'content',
        'publish'
    ];
    protected $dates = ['deleted_at'];
}
```

- Ở đây trường `deleted_at` của `Illuminate\Database\Eloquent\SoftDeletes` sẽ làm cho dữ liệu chúng ta xóa đi được đánh dấu lại bởi trường này.
- Tất nhiên là để có trường này thì bạn phải định nghĩa thêm trong file `migration` là `$table->softDeletes()`
- Bạn có thể xem những bản ghi này đã được xóa tạm thời chưa bằng cách sử dụng phương thức `trashed`:
```PHP
$post->trashed()
//để truy vấn
$post = App\Post::withTrashed()
            ->where('id', 1)
            ->get();
//để lấy lại
App\Post::withTrashed()
    ->where('id', 1)
    ->restore();
```
- Ở đây `withTrashed` giúp chúng ta truy vấn và `restore` sẽ giúp chúng ta lấy lại những bản ghi đã xóa mềm.
# 3. Mass Assignment
- Chính vì việc có thể `update hàng loạt` đã dẫn đến một lỗ hổng có tên là `Mass Assignment`.
- `Mass Assignment` là tính năng cho phép lập trình một cách tự động gán các tham số của một HTTP request vào các biến hoặc đối tượng trong lập trình.
- Chính vì vậy mà các hacker có thể thêm một số trường và thay đổi dữ liệu của nó.
- Nhưng đừng lo `laravel` đã cung cấp cho chúng ta giải pháp để ngăn chắn điều đó là `$fillable` và `$guarded`.
```PHP
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 
        'content',
    ];
}
```

- Khi bạn thêm các trường của bảng vào `$fillable` thì chỉ những trường đó có thể `update hàng loạt` và những trường khác thì không.
- Ngược lại `$guarded` sẽ chỉ định những trường không được `update hàng loạt`.
- Chính vì vậy bạn chỉ cần thêm 1 trong 2 thuộc tính đó vào trong model là có thể tránh được lỗ hổng `Mass Assignment` rồi.

> Chú ý: Bạn không nên định nghĩa 2 thuộc tính này cùng lúc vì nếu bạn định nghĩa thuộc tính **$fillable** rồi thì các trường còn lại sẽ là **$guarded** và ngược lại.

# 4. Kết luận
- Trên đây là những điều chía sẻ của mình cho các bạn về **Model** trong laravel. Rất mong nó sẽ giúp ích được cho các bạn trong việc tiếp cận với laravel.
- Cảm ơn các bạn đã đọc bài viết của mình.
- Link tham khảo: [https://laravel.com/docs/8.x/eloquent](https://laravel.com/docs/8.x/eloquent)