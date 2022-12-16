Trong bài viết này, mình sẽ demo cách sử dụng form validation với error messages trong laravel 8 . <br>
Chúng ta có thể sử dụng các quy tắc validation default của laravel như required, email, unique, numeric, date, ip, in_array, it, ite, max, min, image, mimes etc.<br>
Bạn có thể định nghĩa lại các error messages sẽ hiển thị cho từng trường và chúng ta sẽ sử dụng has() để check và hiển thị các error messages cho mỗi trường nhé. <br>
Các bạn hãy theo dõi demo bên dưới<br>

> Step1: Create Routes

**routes/web.php**
```PHP
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('user/create', [HomeController::class, 'create']);
Route::post('user/create', [HomeController::class, 'store']);
```

> Step2: Create Controller

Bước này mình sẽ tạo 2 methods trong Controller, method create() sẽ hiển thị form tạo user với kiểu là get request và method store() sẽ xử lý validation và save dữ liệu với kiểu là post request. Các bạn hãy thêm code như bên dưới nhé<br>
**app/Http/Controllers/HomeController.php**
```PHP
<?php
   
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use App\Models\User;
   
class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('createUser');
    }
  
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
                'name' => 'required',
                'password' => 'required|min:5',
                'email' => 'required|email|unique:users'
            ], [
                'name.required' => 'Name is required',
                'password.required' => 'Password is required'
            ]);
   
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
    
        return back()->with('success', 'User created successfully.');
    }
}
```

> Step3: Create Blade File

**resources/views/createUser.blade.php**
```PHP
<!DOCTYPE html>
<html>
<head>
    <title>Laravel 8 form validation</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
  
        <h1>Laravel 8 form validation example</h1>
   
        @if(Session::has('success'))
        <div class="alert alert-success">
            {{ Session::get('success') }}
            @php
                Session::forget('success');
            @endphp
        </div>
        @endif
   
        <form method="POST" action="{{ url('user/create') }}">
  
            {{ csrf_field() }}
  
            <div class="form-group">
                <label>Name:</label>
                <input type="text" name="name" class="form-control" placeholder="Name">
                @if ($errors->has('name'))
                    <span class="text-danger">{{ $errors->first('name') }}</span>
                @endif
            </div>
   
            <div class="form-group">
                <label>Password:</label>
                <input type="password" name="password" class="form-control" placeholder="Password">
                @if ($errors->has('password'))
                    <span class="text-danger">{{ $errors->first('password') }}</span>
                @endif
            </div>
    
            <div class="form-group">
                <strong>Email:</strong>
                <input type="text" name="email" class="form-control" placeholder="Email">
                @if ($errors->has('email'))
                    <span class="text-danger">{{ $errors->first('email') }}</span>
                @endif
            </div>
   
            <div class="form-group">
                <button class="btn btn-success btn-submit">Submit</button>
            </div>
        </form>
    </div>
</body>
</html>

```

> Step4: Chạy chương trình và kiểm tra kết quả

**Form đăng ký user**<br>
![](https://images.viblo.asia/fec6968f-34a1-4457-95b5-119b576d2ad7.png)

**Màn hình thông báo lỗi khi submit form**<br>
![](https://images.viblo.asia/13e44f62-a411-4713-95b4-98a05f503c27.png)

**Màn hình đăng ký user thành công!**<br>
![](https://images.viblo.asia/6f351cb6-641d-4b33-93e8-36012f0ed499.png)