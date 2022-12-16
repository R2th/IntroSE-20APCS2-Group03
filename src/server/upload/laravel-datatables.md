![](https://images.viblo.asia/6c45437b-ec89-4068-b113-b6e0a162e941.png)
# Giới thiệu
Chào các bạn, hôm nay mình xin phép chia sẻ đến mọi người một thư viện vô cùng hữu ích đó là Laravel DataTables. Thư viện chuyên dụng để xử lý server side cho plugin [DataTables](https://datatables.net/). Chắc hẳn các bạn đã biết đến DataTables là 1 plugin Jquery vô cùng tuyệt vời, giúp chúng ta hiển thị danh sách các bản ghi, phân trang, tìm kiếm, order, limit.... với tốc độ rất nhanh và tích hợp tất cả trong một. 
Và DataTable có 2 kiểu xử lý dữ liệu là Client-side progressing và Server-side progressing. Cụ thể thì Client-side progressing có nghĩa là toàn bộ dữ liệu được tải lên sẵn và thư viện DataTable sẽ làm việc còn lại là xử lý tìm kiếm, phân trang, order.... Như vậy ta có thể thây ngay kiểu xử lý dữ liệu thế này chỉ phù hợp với một lượng dữ liệu nhỏ, nếu dữ liệu lớn ta không thể tải chúng cùng một lúc lên trình duyệt được. Theo khuyến cáo nếu có dưới 10.000 bản ghi thì ta có thể sử dụng Client-side progressing tuy nhiên nếu ta có khoảng 100.000 bản ghi thì đó là chuyện khác. Việc tải 100.000 bản ghi lên trình duyệt trước là một thảm họa, nó có thể gây treo trình duyệt của bạn và đây là lúc bạn nghĩ đến kiểu xử lý dữ liệu thứ 2 của DataTables đó là Server-side progressing. Hiểu đơn giản là mỗi lần ta thực hiện 1 thao tác tìm kiếm, order hay nhảy sang trang mới thì đều cần gửi request ajax lên server để tải về tập dữ liệu phù hợp và DataTables sẽ phụ trách việc hiển thị nó lên trình duyệt. Khi đó mọi thứ xử lý trên server để query dữ liệu và trả về các thông số theo yêu cầu của DataTables là bạn phải tự thiết kế. Và thư viện Laravel DataTables mà mình đã nói ở đầu bài sẽ giải quyết bài toán này... Bắt đầu nhé.
# Cài đặt và demo
Để cài đặt package này ta cài qua composer như sau 
```bash
composer require yajra/laravel-datatables-oracle:^8.0
```

Publish config và assets
```
php artisan vendor:publish --tag=datatables
```

Và ở file blade bạn cần thêm vào file js và css của thư viện DataTables. Ví dụ như sau
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel DataTables Tutorial</title>

        <!-- Bootstrap CSS -->
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="//cdn.datatables.net/1.10.7/css/jquery.dataTables.min.css">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <style>
            body {
                padding-top: 40px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            @yield('content')
        </div>

        <!-- jQuery -->
        <script src="//code.jquery.com/jquery.js"></script>
        <!-- DataTables -->
        <script src="//cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
        <!-- Bootstrap JavaScript -->
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        <!-- App scripts -->
        @stack('scripts')
    </body>
</html>
```

Tiếp theo ta cần tạo route và controller
Route:
```php
Route::controller('datatables', 'DatatablesController', [
    'anyData'  => 'datatables.data',
    'getIndex' => 'datatables',
]);
```

Controller:
```php
namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Yajra\Datatables\Datatables;

class DatatablesController extends Controller
{
    /**
     * Displays datatables front end view
     *
     * @return \Illuminate\View\View
     */
    public function getIndex()
    {
        return view('datatables.index');
    }

    /**
     * Process datatables ajax request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function anyData()
    {
        return Datatables::of(User::query())->make(true);
    }
}
```

Tiếp theo ta tạo view cơ bản
```php
@extends('layouts.master')

@section('content')
    <table class="table table-bordered" id="users-table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
        </thead>
    </table>
@stop

@push('scripts')
<script>
$(function() {
    $('#users-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: '{!! route('datatables.data') !!}',
        columns: [
            { data: 'id', name: 'id' },
            { data: 'name', name: 'name' },
            { data: 'email', name: 'email' },
            { data: 'created_at', name: 'created_at' },
            { data: 'updated_at', name: 'updated_at' }
        ]
    });
});
</script>
@endpush
```


Mọi thứ đã xong mở trình duyệt chạy link {localhost}/datatables ta có ngay kết quả như sau:
![](https://images.viblo.asia/605b23e4-9997-495b-80e5-45c0e7ceadfb.png)
Trên đây là hướng dẫn cơ bản nhất để chạy Laravel DataTables dành cho beginner mà mình lấy luôn trên trang chủ của thư viện. Tiếp theo chúng ta sẽ đi tìm hiểu chi tiết cách sử dụng.

# Cách sử dụng
Laravel DataTables hỗ trợ xử lý cho 3 engines chính đó là Eloquent, Query Builder và Collection. Ví dụ với trường hợp Basic:
Eloquent:
```php
public function getBasicData()
{
    $users = User::select(['id','name','email','created_at','updated_at']);

    return Datatables::of($users)->make();
}
```
Query Builder:
```php
public function getBasicData()
{
    $users = DB::table('users')->select(['id', 'name', 'email', 'created_at', 'updated_at']);

    return Datatables::of($users)->make();
}
```
Collection:
```php
public function getBasicData()
{
    $users = User::select(['id', 'name', 'email', 'created_at', 'updated_at'])->get();

    return Datatables::of($users)->make();
}
```

Như vậy ta thấy chỉ có cách lấy dữ liệu khác nhau còn cách dùng đều tương tự.  

### Column Editing
Mục này là để chỉnh sửa dữ liệu khi hiển thị ra table trong đó có thêm, sửa xóa cột. Ví dụ để thêm 1 cột là cột Action chứa 2 button view và delete đồng thời với cột hiển thị ảnh avatar thì ta cần sửa với dữ liệu gốc là link avatar và dữ liệu sau khi sửa là thẻ img chứa ảnh đó:
```php
DataTables::of($users)
    ->editColumn('avatar', function ($user) {
        return '<img src="' . $user->avatar . '" alt="" class="img-circle img-avatar-list">';
    })
    ->addColumn('action', function ($user) {
        return '<a href="'. route('admin.users.show', $user->id) .'" class="btn btn-xs btn-warning"><i class="fa fa-eye"></i> View</a> <a href="javascript:void(0)" data-id="' . $user->id . '" class="btn btn-xs btn-danger btn-delete"><i class="fa fa-times"></i> Delete</a>';
    })
    ->rawColumns(['avatar', 'action'])
    ->make(true);
```

Trong đó có hàm `rawColumns` mục đích để  hiển thị các thẻ html mà mình đã thêm vào vì mặc định Laravel DataTables sẽ escapse hết toàn bộ kí tự html để chống XSS attack. Và kết quả hiển thị ra sẽ như thế này cho dễ hình dung:

![](https://images.viblo.asia/6e0f0f0d-ff95-4886-be92-2874418dc573.png)

### Row Editing
Tương tự như Column thì Row Editing sẽ là chỉnh sửa thông tin từng hàng. Ví dụ như set row id, row class, row data, row attributes:
Ví dụ:
```php
->setRowId(function ($user) {
    return $user->id;
})
->setRowClass(function ($user) {
    return $user->id % 2 == 0 ? 'alert-success' : 'alert-warning';
})
->setRowData([
    'data-id' => function($user) {
        return 'row-' . $user->id;
    },
    'data-name' => function($user) {
        return 'row-' . $user->name;
    },
])
->setRowAttr([
    'color' => function($user) {
        return $user->color;
    },
])
```

### Searching
Ở phần này ta có thể config cho phần search. Ví dụ có một cột fullname mình tự thêm bằng cách nối first name và last name thì khi search nó sẽ không thể tự search được vì trong database không có cột full name vì vậy ta cần viết lại đoạn này như sau:
```php
$model = App\User::select([
            'id',
            DB::raw("CONCAT(users.first_name,'-',users.last_name) as fullname"),
            'email',
            'created_at',
            'updated_at',
        ]);

    return DataTables::eloquent($model)
                ->filterColumn('fullname', function($query, $keyword) {
                    $sql = "CONCAT(users.first_name,'-',users.last_name)  like ?";
                    $query->whereRaw($sql, ["%{$keyword}%"]);
                })
                ->toJson();
```

Hoặc ở một case khác mình muốn thêm 1 ô search riêng để search email chẳng hạn thì mình phải viết như sau:
```php
DataTables::eloquent($model)
    ->filter(function ($query) {
        if (request()->has('email')) {
            $query->where('email', 'like', "%" . request('email') . "%");
        }
    })
    ->toJson();
```
### Sorting/Ordering
Phần này ta có thể viết lại để custom cho việc order các field trong database. Ví dụ khi ta click vào cột fullname ở trên thì ta chỉ muốn order theo last name trong database thôi thì ta sẽ viết như sau:
```php
DataTables::eloquent($model)
    ->orderColumn('fullname', '-first_name $1')
    ->toJson();
```

# Tổng kết
Như vậy mình vừa giới thiệu xong cách sử dụng Laravel Datatables để xử lý server-side cho Datatables. Ngoài ra Laravel Datatables còn có các plugin rất hữu ích để đưa toàn bộ các xử lý vào trong Laravel: Ví dụ như Html Builder, Buttons, Editor. Các bạn có thể tìm hiểu thêm tại [đây](https://yajrabox.com/docs/laravel-datatables/master/html-installation). Bài viết đã dài mình xin kết thúc tại đây cảm ơn các bạn đã theo dõi.
### Tham khảo
* https://datatables.yajrabox.com
* https://datatables.net/