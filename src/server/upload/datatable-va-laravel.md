## 1. Giới thiệu:
Bạn đang không biết nên hiển thị dữ liệu dạng bảng lên website của mình như thế nào? Bạn đang đau đầu với những chiếc thẻ `<td>` trong HTML table?
Bài viết này sẽ là giải pháp đơn giản nhưng hữu hiệu dành cho bạn! :D

Nhá trước một chiếc bảng mình dựng chỉ với 3 phút ^^
![](https://images.viblo.asia/bb9f8b19-1a3f-45d8-891d-05aea0c54be8.png)

## 2. Sơ lược qua về Data Table:
Data Table là một cách hiển thị dữ liệu dạng bảng lên website của bạn "động" và "thông minh" hơn với bảng HTML table. Nó cũng cho phép người dùng thực hiện các thao tác đơn giản như tìm kiếm, sắp xếp, lọc, phân trang và thấy được kết quả ngay trên giao diện bảng mà không cần chuyển trang.
### Công nghệ sử dụng:
Như tựa đề thì bài viết này là giải pháp dành cho các website sử dụng framework Laravel, và mình sẽ sử dụng một số package và plug-in như dưới đây:
1. Laravel 5.5+
2. jQuery DataTables v1.10.x
3. yajra/laravel-datatables: v1.5
## 3. Cài đặt:
Đầu tiên, ta cần cài đặt plug-in jQuery DataTables, bạn có thể lựa chọn 1 trong 3 cách cài đặt mà nhà phát triển đưa ra:

**CDN:** Ta có thể dễ dàng import các file vào project mà không cần cài đặt như sau:
```html
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.js"></script>
```
**NPM:** Chạy 2 câu lệnh dưới đây là ta đã có thể sử dụng datatables:
```
npm install datatables.net
npm install datatables.net-dt
```
**Bower:** Bower là một cách quản lý các package rất đáng sử dụng:
```
bower install --save datatables.net
bower install --save datatables.net-dt
```
Tiếp theo ta cần cài đặt package Laravel-DataTables bằng câu lệnh composer:
```
composer require yajra/laravel-datatables-oracle
```
Và chạy câu lệnh artisan để publish config:
```
php artisan vendor:publish --tag=datatables
```
Như vậy đã hoàn tất việc cài đặt!
## 4. Demo và các hướng tiếp cận:
Tùy theo phong cách code và requirement của dự án đang dùng, mình đưa ra 2 cách tiếp cận như sau:
### Sử dụng Datatables::make() và AJAX:
Cách này sẽ khá nhanh gọn lẹ nhưng bạn sẽ cần xử lý một chút với javaScript:

**Route:** Khai báo route để lấy dữ liệu trong `routes/app.php`:
```php
Route::get('user-data', 'UserController@getData')->name('user.data');
```
**Controller:**   Trong Controller xử lý, chúng ta use class `Datatables` và xử lý code như sau:
```php
use Yajra\Datatables\Datatables;
class UserController extends Controller
{
    public function index()
    {
        return view('users.list');
    }
    public function getData()
    {
        $users = User::with('post')->get();
        
        return Datatables::of($users)
            ->make(true);
    }
}
```
**View:** Thêm đoạn code sau ở trang view `views/users/list.blade.php` mà bạn muốn hiển thị table:
```html
<div class="table-responsive">
    <input hidden value="{{ route('category.data') }}" id="userData">
    <table class="table table-bordered" id="userTable">
        <thead>
            <tr>
                <th>@lang('user.name')</th>
                <th>@lang('user.post')</th>
                <th>@lang('user.address')</th>
                <th>@lang('user.email')</th>
            </tr>
        </thead>
    </table>
</div>
```
**javaScript**: Xử lý việc lấy dữ liệu và hiển thị với AJAX:
```javascript
$(function () {
    var urlData = $('#userData').val();
    $('#userTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: urlData,
        columns: [
            { data: 'name', name: 'name' },
            { data: 'post.name', name: 'post.name', defaultContent: "None" },
            { data: 'address', name: 'address' },
            { data: 'email', name: 'email' },
        ]
    });
});
```
### Xử lý với DataTable Controller:
Nếu bạn muốn dành thời gian tìm hiểu sâu hơn về package Laravel-DataTables thì mình recommend bạn nên dùng cách này.

**DataTable Controller:** Đầu tiên ta cần tạo mới một DataTable Controller để xử lý việc build Table:
```
php artisan datatables:make Users
```
Laravel sẽ tự động tạo mới Controller tại `app/DataTables/UsersDataTable.php` , ta tiến hành thêm các function xử lý việc dựng bảng:
```php
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;

class UsersDataTable extends DataTable
{
    public function dataTable($query)
    {
        return datatables()
            ->eloquent($query)
            ->addColumn(__('user.name'), '{{ $name }}')
            ->addColumn(__('user.post'), '{{ $post[\'name\'] }}')
            ->addColumn(__('user.address'), '{{ $address }}')
            ->addColumn(__('user.email'), '{{ $email }}')
    }
    public function query(User $model)
    {
        return $model->newQuery()->with('post');
    }
    public function html()
    {
        return $this->builder()
            ->setTableId('userTable')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->dom('Bfrtip');
    }
    protected function getColumns()
    {
        return [
            Column::make(__('user.name')),
            Column::make(__('user.post')),
            Column::make(__('user.address')),
            Column::make(__('user.email')),
        ];
    }
    protected function filename()
    {
        return 'Users_' . date('YmdHis');
    }
}
```
**Controller:**  xử lý trong UserController bạn chỉ cần dependency UsersDataTable:
```php
use App\DataTables\UsersDataTable;
class UserController extends Controller
{
       public function index(UsersDataTable $dataTable)
    {
        return $dataTable->render('users.list');
    }
}
```
**View:** Việc hiển thị view cũng được xử lý đơn giản hơn với đoạn code sau ở trang view `views/users/list.blade.php` :
```html
<div class="card-body">
    {{ $dataTable->table() }}
</div>
<script>
    {{ $dataTable->scripts() }}
</script>
```
Và đó là 2 cách tiếp cận bạn có thể dùng khi dựng bảng với DataTables và Laravel DataTables.
## 5. Tùy chỉnh DataTable:
Nếu chỉ hiển thị dữ liệu dạng text thì sẽ chẳng có gì quan ngại. Nhưng hầu hết chúng ta đều muốn có thể thêm vào một số dạng cột hay các chức năng khác nữa. Sau đây là những cách customize trong data table:
### Index Column:
Cột index với số thứ tự tự động tăng được định nghĩa trong `config/datatables.php`:
```php
/*
 * DataTables internal index id response column name.
 */
'index_column' => 'DT_RowIndex',
```
Ta sẽ thêm đoạn code sau để add cột index:
```php
Datatables::of($users)
    ->addIndexColumn()
    ->make(true);
```
Và tên của cột sẽ là `DT_RowIndex` :
```javascript
$(function () {
    var urlData = $('#userData').val();
    $('#userTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: urlData,
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex' },
            { data: 'name', name: 'name' },
            { data: 'post.name', name: 'post.name', defaultContent: "None" },
            { data: 'address', name: 'address' },
            { data: 'email', name: 'email' },
        ]
    });
});
```
### Raw Columns:
Với lựa chọn raw column, ta có thể tùy chỉnh các cột hiển thị với các thẻ HTML khác như sau:
```php
Datatables::of($users)
    //hiển thị avatar của user:
    ->addColumn(__('user.image'), function ($user) {
            $image = $user->image != null ? asset($user->image) : asset(config('user.image_default'));

            return '<img class="img-fluid" src=' . $image . '>';
        })
    //lựa chọn chỉnh sửa:
    ->addColumn(__('user.edit'), function ($user) {
            return '<a href="' . route('users.edit', $user->id) . '" 
                    class="btn btn-info"><i class="fas fa-pen"></i></a>';
            })
    ->rawColumns([__('user.edit'), __('user.image')])
    ->make(true);
```
### Searching:
Ta cũng có thể customize cho ô search ở Data Table với `filter api` như sau:
```php
DataTables::eloquent($users)
    ->filter(function ($query) {
        if (request()->has('name')) {
            $query->where('name', 'like', "%" . request('name') . "%");
        }

        if (request()->has('email')) {
            $query->where('email', 'like', "%" . request('email') . "%");
        }
    })
```
### Ordering:
Tương tự như search, ta cũng có thể không sử dụng ordering mặc định của package mà custom theo cách riêng bằng việc sử dụng `order api`:
```php
DataTables::eloquent($users)
 ->order(function ($query) {
    if (request()->has('name')) {
        $query->orderBy('name', 'asc');
    }

    if (request()->has('email')) {
        $query->orderBy('email', 'desc');
    }
 })
```
Và còn rất nhiều lựa chọn khác cho việc customize cho bảng của bạn, cũng như các thao tác trên bảng. Bạn đọc có thể tìm hiểu kĩ hơn tại document của package mình để link dưới phần tham khảo.
## 6. Kết luận:
Như vậy, mình đã giới thiệu với các bạn một số cách tiếp cận Data Table với Laravel. Mong rằng các bạn có thể bỏ túi một vài kĩ năng khi làm việc với bảng dữ liệu trong project Laravel của mình.
Cảm ơn các bạn đã đọc bài chia sẻ của mình. Nếu có điều gì chia sẻ hay góp ý, hãy viết lại dưới phần bình luận nhé!
### Tài liệu tham khảo:
* https://datatables.net/
* https://yajrabox.com/docs/laravel-datatables/master