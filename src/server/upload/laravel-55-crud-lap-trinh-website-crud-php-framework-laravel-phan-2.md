## Làm việc với Route, Controller và Model sẽ được giới thiệu trong phần này. Xây dựng dự án CRUD users với Laravel 5.5. Lập Trình Website CRUD sử dụng PHP Framework Laravel.

Chúng ta sẽ tiếp tục với thiết lập Route, Controller, Model và View trong dự án PHP Framework Laravel 5.5 CRUD users.

### Bước 5: Tạo UserController

Sử dụng câu lệnh dưới đây trong Terminal để tạo UserController:
```
php artisan make:controller UserController --resource
```
![](https://images.viblo.asia/5ad2de14-5bcd-452a-bd82-e5aa7ec717d3.png)
Câu lệnh tạo Controller sẽ tạo file UserController.php theo đường dẫn user-crud-laravel/app/Http/Controllers/UserController.php. Flag –resource giúp chúng ta tạo sẵn 7 functions với tên gọi theo chuẩn CRUD Laravel đã quy ước. File UserController.php sẽ có mã nguồn như sau:
```
<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
 
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
 
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }
 
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
 
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }
 
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }
 
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
```
Mỗi một function có một nhiệm vụ cụ thể, ví dụ index – hiển thị toàn bộ người dùng, destroy – xóa người dùng cụ thể, …

### Bước 6: Tạo Route xử lý CRUD

Tìm file web.php theo đường dẫn user-crud-laravel/routes/web.php và chỉnh sửa như sau:
```
<?php
 
Route::get('/', function () {
    return view('welcome');
});
 
Route::resource('users', 'UserController');
```
Static function resource đã được định nghĩa ở trên sẽ tạo cho chúng ta 7 routes và trỏ cụ thể vào 7 functions ở UserController. Sử dụng câu lệnh bên dưới để xem toàn bộ route của dự án PHP Framework Laravel trong Terminal:
```
php artisan route:list
```
![](https://images.viblo.asia/8c882337-7d2a-4d63-b78a-2d61d178e8db.png)
Ngoài 2 routes đầu tiên do Laravel tạo sẵn, các routes còn lại đều do static function resource của class Route bên trên tạo ra.

### Bước 7: Tạo Model User

Mặc định, Laravel đã tạo cho chúng ta model User, chúng ta tạm thời xóa model này để làm quen với câu lệnh tạo Model. Tìm file User.php theo đường dẫn user-crud-laravel/app/User.php. Sử dụng câu lệnh sau trong Terminal/GitBash để tạo Model User:
```
php artisan make:model User
```
![](https://images.viblo.asia/c5d91182-46df-49e0-9a1c-d94e05a90564.png)

Chúng ta đã có Migration, Seeder, Route, Controller và Model cho dự án Laravel 5.5 CRUD. Phần tiếp theo mình sẽ giới thiệu về View là Logic theo kiến trúc MVC chuẩn trong Laravel 5.5.