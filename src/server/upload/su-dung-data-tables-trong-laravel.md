## I. Giới thiệu
- `Datatables` cung cấp cho chúng ta tìm kiếm nhanh, phân trang, sắp xếp, v.v. 
- Nó tìm các `record` thông qua `eloquent model` bằng cách sử dụng `ajax query`.
- Để có thể sử dụng được `datatables` các bạn cần có những kiến thức cơ bản liên quan tới: `M-V-C`.
## II. Cài đặt và sử dụng
- Trong phần này mình đơn giản sẻ chia thành 3 phần cơ bản chính cần quan tâm:
  - Server Side Package: `laravel-datatables` để xử lý `server-side` những dữ liệu mà `datatables` cần khi gọi `jQuery Plugin via AJAX` 
  - Client Side Library: sử dụng `datatables` để hiển thị dữ liệu từ máy chủ đến `view` của bạn.
  - Laravel Models: Tạo model `post` và `comment` để sẵn sàng cho việc chạy demo.
###   1. Install laravel-datatables
- Chúng ta sử dụng `composer` để cài đặt packet này. Sử dụng câu lệnh bên dưới.
```
$ composer require yajra/laravel-datatables-oracle:"~8.0"
```
- Để có thể sử dụng được chúng ta phải khi báo `provider` cho chúng trong file: `config/app.php`
```
'providers' => [
    ...,
    Yajra\DataTables\DataTablesServiceProvider::class,
]
'aliases' => [
    ...,
    'DataTables' => Yajra\DataTables\Facades\DataTables::class,
]
```
### 2. Initialize the views with datatables assets
- Chúng ta sẽ thêm `cdn` của `datatables` vào `view` để đảm bảo rằng không có js hoặc css nào bị chết.
```
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.css"/>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>
```
### 3. Laravel Models
- Tạo model `Post` và `Comment` cho việc demo dữ liệu. Phần này mình đã để cập ở đoạn đầu:
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'user_id'];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```


-----


```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['content', 'user_id'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```
### 4. Xử lý dữ liệu từ server về view thông quá Ajax
- Đầu tiên chúng ta sẽ tạo 1 `route` trong `routes/web.php` để phục vụ cho quá trình truyền nhận dữ liệu. 
- Việc này xử lý khá đơn giản các bạn có thể tham khảo bên dưới:
```
Route::get('ajax/posts', 'Ajax\PostController@index')->name('ajax.posts.index');
```
- Tiếp theo chúng ta sẽ qua phần quan trọng hơn đó là xử lý dữ liệu cần phải gửi về cho `view`.
- Mình sẽ tiến hành trả về cho `view` dữ liệu liên quan tới `Post`, `Comment` và `User`.
- Tiến hành sử dụng thuộc tính `addColumn` của `datatables` để thêm 2 trường mới:  `user_name` và `comments_num` phục vụ cho tối ưu dữ liệu trả về.
 ```
 <?php

namespace App\Http\Controllers\Ajax;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DataTables;
use App\Post;

class PostController extends Controller
{
    public function index()
    {
        return Datatables::of(Post::query()->with('comments', 'user'))
        ->addColumn('user_name', function($row){
            return $row->user->name;
        })
        ->addColumn('comments_num', function($row){
            return $row->comments->count();
        })
        ->make(true);
    }
}
 ```
 - Như vậy cơ bản chúng ta đã xử lý xong phần `server-side` truyền dữ liệu xuống `view` mà mình đã đề cập ở phần 1.
### 5. Hiển thị dữ liệu từ server lên view
- Cơ bản đầu tiên thì chúng ta vẫn cần phần khung xương `html` để hiển thị cái `table` dữ liệu.
```
<table id="demo_table" class="display" style="width:100%">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>User Id</th>
      <th>Comments Number</th>
    </tr>
  </thead>
</table>
```
- Tiếp theo là phần lấy dữ liệu từ `server`, chúng ta sẽ dùng `ajax` để tiến hành lấy dữ liệu:
```
$(document).ready( function () {
  $('#demo_table').DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": '{{ route('ajax.posts.index') }}',
    "columns": [
      { "data": "id" },
      { "data": "title" },
      { "data": "user_name" },
      { "data": "comments_num" },
    ]
  });
} );
```


-----


- À còn 1 phần cần quan trọng cần lưu ý đó là: 
  - Khi các bạn khai báo các thẻ `<th>` trong `HTML` thì trong phần `JS` call `ajax` để lấy dữ liệu các bạn phải chú ý đến thứ tự của chúng để đảm bảo cho việc hiển thị dữ liệu của bạn được chính xác.
  - Tiếp theo là `cdn` mình đã đề cập ban đầu. Nếu `table` của bạn không hiển thị hoặc không có hiệu ứng hãy kiểm tra lại phần thêm `cdn` này đã có thêm chưa nhé.


-----
- Cuối cùng nếu bạn không gặp phải vấn đề gì thì sẽ có kết quả như thế này với điều kiện là trong `database` của bạn phải có dữ liệu nhé :D.

![](https://images.viblo.asia/cb6926bf-5f4e-4024-a1db-7b2848295b5f.png)
### 6. Chia sẻ
- Lời cuối của bài cám ơn các bạn đã dành thời gian theo dõi bài viết của mình.
- Nếu bạn thấy có ích xin hãy share cho những người cần đến nó nhé.
- Phía dưới là 1 số nguồn mình đã tham khảo để hoàn thành bài viết:
  - https://github.com/yajra/laravel-datatables
  - https://medium.com
  - https://laravel.com