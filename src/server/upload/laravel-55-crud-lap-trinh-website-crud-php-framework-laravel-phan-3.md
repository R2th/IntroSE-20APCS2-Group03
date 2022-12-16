## Xây dựng View trong Laravel và tính logic của dự án Xây Dựng Ứng Dụng Website Laravel 5.5 CRUD. Lập Trình Website CRUD PHP Framework Laravel – Phần 3.

### BƯỚC 8: BỐ CỤC VIEW LARAVEL

Trước khi làm việc với View và logic của dự án, chúng ta sẽ xây dựng Layout (bố cục) của dự án Laravel CRUD.

**Cấu Trúc Thư Mục Layout Laravel CRUD**

Trong thư mục **user-crud-laravel/resources/views/layout**, tạo file **master.blade.php**, **header.blade.php** và **footer.blade.php**. 

Trong thư mục **user-crud-laravel/resources/views/layout/components**, tạo file **title.blade.php**.
![](https://images.viblo.asia/8e584df2-d19f-41b8-8e8d-88061f48b53d.png)
Mã Nguồn File **master.blade.php**
```
<!DOCTYPE html>
<html lang="en">
 
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="{{asset('./favicon.ico')}}">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>User CRUD Laravel Demo</title>
  <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
  <link rel="stylesheet" href="{{asset('css/styles.css')}}">
</head>
 
<body>
  @include('layout.header')
  <hr>
  @section('content') @show
  <hr>
  @include('layout.footer')
</body>
 
</html>
```
File **master.blade.php** bao gồm khai báo HTML đơn giản, sử dụng làm bố cục áp dụng cho các trang khác mà không cần khai báo lại. Function asset của Laravel hỗ trợ chúng ta truy cập tới đường dẫn user-crud-laravel/public. Từ đó, chúng ta có thể gọi các file của CSS, JavaScript,… Trong file trên, chúng ta đã nhúng file của CSS Framework Bootstrap và style tự khai báo.

Ngoài ra, chúng gọi tới các file header, layout nằm trong thư mục layout của dự án Laravel CRUD này bằng function include của PHP. Và tạo ra một section có tên là content, các trang khác kế thừa từ trang master sẽ điền thông tin vào phần content này.

Mã Nguồn File **header.blade.php**
```
<div class="container my-3">
  <div class="d-flex flex-row">
    <div class="col-12 px-0">
      <div class="d-flex flex-row align-items-center">
        <div class="col-1 pl-0">
          <form action="{{route('users.index')}}" method="get">
            <button class="btn btn-primary rounded-0 font-weight-bold">Home</button>
          </form>
        </div>
        <div class="col-10">
          <h1 class="text-center font-weight-bold text-uppercase">user crud laravel</h1>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
  </div>
</div>
```

Mã nguồn trên bao gồm các thành phần HTML và các class đã được định nghĩa sẵn trong CSS Framework Bootstrap 4.

Đặc biệt, ở dòng 6, có một dòng lệnh liên quan đến route – users.index sẽ được giới thiệu ở Bước 9: Read – Đọc Người Dùng. Mã nguồn này sẽ có nhiệm vụ gọi tới đường dẫn có tên là users.index – hiển thị tất cả người dùng.

Mã Nguồn File **footer.blade.php**
```
<div class="container mb-5">
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-uppercase text-muted">
          user crud laravel
        </span>
        <form action="{{route('users.create')}}" method="get">
          <button type="submit" class="btn btn-info text-uppercase font-weight-bold rounded-0">
            create a new user
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
```

Ở dòng 8, HTML form gọi tới route tên là users.create, chuyển hướng đến trang thêm mới người dùng.

Mã Nguồn File **title.blade.php**
```
<div class="container">
  <div class="row">
    <div class="col-12">
      <span class="badge badge-success text-uppercase text-left">{{$slot}}</span>
    </div>
  </div>
</div>
```
File bao gồm thành phần HTML và các class CSS, nội dung thay đổi phần trong biến $slot. Chúng ta sẽ gọi tới file này ở các trang khác.

### BƯỚC 9: READ – R TRONG CRUD – ĐỌC NGƯỜI DÙNG


Kiểm tra lại 7 routes đã tạo từ phần 2, dòng được bôi đỏ là 2 routes dành cho việc hiển thị:
![](https://images.viblo.asia/61d09568-7768-4a71-8ee9-909ad86470fa.png)

**Đọc Toàn Bộ Người Dùng – Index**

Route đầu tiên là /users, phương thức làm việc là GET. Tên route này trong dự án user-crud-laravel là users.index, sẽ được sử dụng để gọi ra trong tương lai từ View hoặc chuyển hướng từ Controller. Function index trong UserController sẽ hoạt động khi người dùng truy cập đường dẫn tới route.

Trong file UserController.php, chúng ta khai báo mã nguồn như sau. Gọi tới Model User trong UserController, trong file dưới là dòng 6:
```
<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\User; // sử dụng model User
 
class UserController extends Controller
```
Trong function index, thêm mã nguồn từ dòng 17 -> 23:
```
public function index()
  {
      $users = User::paginate(10);
      return view(
          'users.index',
          ['users' => $users]
      );
  }
```
Đoạn mã trên sử dụng Model User và static function paginate với đối số là 10, nhằm lấy 10 dữ liệu trong mỗi trang hiển thị. Lấy toàn bộ dữ liệu trong bảng users và gán dữ liệu này vào biến $users. Dòng lệnh 18, UserController gọi tới file view nằm trong thư mục: user-crud-laravel/resources/views/users/index.blade.php, file này chúng ta phải tạo ra.
![](https://images.viblo.asia/b0bcebb5-737e-4b46-86ee-167012d68111.png)
UserController gửi một array dữ liệu qua view, với key là users và dữ liệu giá trị nằm trong biến $users. Mã nguồn bên dưới sẽ hiển thị toàn bộ người dùng trong file view index.blade.php, có sử dụng CSS Framework Bootstrap 4:
```
@extends('layout.master')
@section('content')
@component('layout.components.title')
index page
@endcomponent
<div class="container mt-3">
  <div class="row">
    <div class="col-12">
      <table class="table table-hover table-bordered">
        <thead>
          <tr class="text-center">
            <th scope="col" class="">#</th>
            <th scope="col" class="">Name</th>
            <th scope="col" class="">Email</th>
            <th scope="col" class="">Action</th>
          </tr>
        </thead>
        <tbody>
          @foreach($users as $user)
          <tr class="text-center">
            <th scope="row">{{$user->id}}</th>
            <td>{{$user->name}}</td>
            <td>{{$user->email}}</td>
            <td class="d-flex align-items-center justify-content-around">
              <form action="{{route('users.show',$user->id)}}" method="get">
                <button class="btn btn-sm btn-primary rounded-0">
                  Show
                </button>
              </form>
              <form action="{{route('users.edit',$user->id)}}" method="get">
                <button class="btn btn-sm btn-warning rounded-0">
                  Edit
                </button>
              </form>
              <form action="{{route('users.destroy',$user->id)}}" method="post">
                <input type="hidden" name="_token" value="{{csrf_token()}}">
                <input type="hidden" name="_method" value="delete">
                <button class="btn btn-sm btn-danger rounded-0">
                  Delete
                </button>
              </form>
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
      <div class="d-flex justify-content-center">{{$users->links()}}</div>
    </div>
  </div>
</div>
@endsection
```
Mã nguồn trên sử dụng vòng lặp foreach để đọc dữ liệu từ biến $users, là key được gửi từ UserController và in ra dữ liệu người dùng theo bảng HTML.

Khởi động máy chủ ảo thông qua Terminal bằng câu lệnh:
```
php artisan serve
```
![](https://images.viblo.asia/78a855cc-fe3d-49e9-bec6-828a670f4bdc.png)
Truy cập đường dẫn 127.0.0.1:8000/users hoặc localhost:8000/users thông qua trình duyệt web:
![](https://images.viblo.asia/133c54b8-9c09-4e4f-bb39-1ebf408c5143.png)

**Đọc Cụ Thể Một Người Dùng – Show**

Route có tên là users.show điều hướng truy cập từ đường dẫn localhost:8000/users/{user}. user sẽ là id của người dùng trong table users, ví dụ localhost:8000/users/5. Route này trỏ tới function show của UserController:
```
public function show($user)
    {
        $user = User::find($user);
        return view(
            'users.show',
            ['user' => $user]
        );
    }
```
Function show nhận đối số là biến $user, chính là {user} hay còn gọi là id được đường dẫn truyền lên máy chủ. Class hay model User tìm kiếm người dùng trong table users và gán giá trị vào biến $user.

Sau đó, UserController gọi tới file view theo đường dẫn user-crud-laravel/resources/views/users/show.blade.php:
![](https://images.viblo.asia/efb0a4d2-fcb0-47c4-99e2-66250c427e33.png)

UserController gửi dữ liệu của biến $user qua view với tên là user. File view có mã nguồn như sau:
```
@extends('layout.master')
@section('content')
@component('layout.components.title')
show page
@endcomponent
<div class="container mt-3">
  <div class="row">
    <div class="col-12">
      <table class="table table-hover table-bordered">
        <thead class="">
          <tr class="text-center">
            <th scope="col" class="">#</th>
            <th scope="col" class="">Name</th>
            <th scope="col" class="">Email</th>
            <th scope="col" class="">Password</th>
            <th scope="col" class="">Created Date</th>
            <th scope="col" class="">Updated Date</th>
            <th scope="col" class="">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center">
            <th scope="row">{{$user->id}}</th>
            <td>{{$user->name}}</td>
            <td>{{$user->email}}</td>
            <td>{{$user->password}}</td>
            <td>{{$user->created_at}}</td>
            <td>{{$user->updated_at}}</td>
            <td class="d-flex border-0 align-items-center">
              <form action="{{route('users.edit',$user->id)}}" method="get">
                <button class="btn btn-sm btn-warning mx-2 rounded-0">
                  Edit
                </button>
              </form>
              <form action="{{route('users.destroy',$user->id)}}" method="post">
                <input type="hidden" name="_token" value="{{csrf_token()}}">
                <input type="hidden" name="_method" value="delete">
                <button class="btn btn-sm btn-danger mx-2 rounded-0">
                  Delete
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
@endsection
```
Click vào button show người dùng từ trang xem tất cả người dùng. Hoặc truy cập đường dẫn localhost:8000/users/6, chúng ta có giao diện:![](https://images.viblo.asia/2bacfd27-07a6-4463-b8d8-2049fdedb625.png)

Chúng ta đã tạo Layout Laravel và Logic của tính năng READ trong Laravel CRUD. Phần tiếp theo, làm việc với 3 tính năng Create – Update và Delete dữ liệu trong CRUD User Laravel.

Các bạn có thể tham khảo phần cuối tại: https://namcoi.com/laravel-5-5-crud-lap-trinh-website-crud-php-framework-laravel-phan-4/