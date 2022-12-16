Trong bài viết này mình sẽ chia sẻ cách sử dụng Ajax để validation Form và hiển thị error messages cho từng trường trên màn hình.<br>
Nếu các bạn không muốn sử dụng Ajax để validation form thì có thể tham khảo bài viết trước của mình tại link sau: [Validation Form với Error Messages trong Laravel 8](https://viblo.asia/p/validation-form-voi-error-messages-trong-laravel-8-Az45bRmz5xY)<br>
Các bạn hãy theo dõi ví dụ bên dưới để hiểu hơn về cách hoạt động của nó nhé.<br>
> Step 1: Add Route

**routes/web.php**
```PHP
<?php

use Illuminate\Support\Facades\Route;

Route::get('my-form','HomeController@myform');
Route::post('my-form','HomeController@myformPost')->name('my.form');
```

> Step 2: Create Controller

Bước này mình sẽ tạo 2 methods trong Controller, method myform() sẽ hiển thị form tạo user với kiểu là get request và method myformPost() sẽ xử lý validation dữ liệu với kiểu là post request. <br>
**app/Http/Controllers/HomeController.php**
```PHP
<?php
   
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use Validator;
   
class HomeController extends Controller
{

    /**
     * Display a listing of the myform.
     *
     * @return \Illuminate\Http\Response
     */
    public function myform()
    {
        return view('myform');
    }
     
    /**
     * Display a listing of the myformPost.
     *
     * @return \Illuminate\Http\Response
     */
    public function myformPost(Request $request)
    {
     
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'address' => 'required',
        ]);
     
        if ($validator->passes()) {
            return response()->json(['success'=>'Added new records.']);
        }
     
        return response()->json(['errors'=>$validator->errors()]);
    }
}
```

> Step 3: Create View File

Bước này mình sẽ tạo file myform.blade.php và thêm code html và code jquery sử dụng ajax.<br>
**resources/views/myform.blade.php**
```PHP
<!DOCTYPE html>
<html>
<head>
    <title>Laravel 8 Ajax Validation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
    <style type="text/css">
        .error_msg {color: red;}
    </style>
</head>
<body>
       
<div class="container">
    <h2>Laravel 8 Ajax Validation</h2>
       
    <div class="alert alert-danger print-error-msg" style="display:none">
        <ul></ul>
    </div>
       
    <form>
        {{ csrf_field() }}
        <div class="form-group">
            <label>First Name:</label>
            <input type="text" name="first_name" class="form-control" placeholder="First Name">
        </div>
        <p class="error_msg" id="first_name"></p>
       
        <div class="form-group">
            <label>Last Name:</label>
            <input type="text" name="last_name" class="form-control" placeholder="Last Name">
        </div>
        <p class="error_msg" id="last_name"></p>
       
        <div class="form-group">
            <strong>Email:</strong>
            <input type="text" name="email" class="form-control" placeholder="Email">
        </div>
        <p class="error_msg" id="email"></p>
       
        <div class="form-group">
            <strong>Address:</strong>
            <textarea class="form-control" name="address" placeholder="Address"></textarea>
        </div>
        <p class="error_msg" id="address"></p>
       
        <div class="form-group">
            <button class="btn btn-success btn-submit">Submit</button>
        </div>
    </form>
</div>
       
<script type="text/javascript">
       
    $(document).ready(function() {
        $(".btn-submit").click(function(e){
            e.preventDefault();
       
            var _token = $("input[name='_token']").val();
            var first_name = $("input[name='first_name']").val();
            var last_name = $("input[name='last_name']").val();
            var email = $("input[name='email']").val();
            var address = $("textarea[name='address']").val();
       
            $.ajax({
                url: "{{ route('my.form') }}",
                type:'POST',
                data: {_token:_token, first_name:first_name, last_name:last_name, email:email, address:address},
                success: function(data) {
                    if($.isEmptyObject(data.errors)){
                        $(".error_msg").html('');
                        alert(data.success);
                    }else{
                        let resp = data.errors;
                        for (index in resp) {
                            $("#" + index).html(resp[index]);
                        }
                    }
                }
            });
       
        }); 
    });


</script>


</body>
</html>

```

> Step4: Chạy chương trình và kiểm tra kết quả


**Form đăng ký user**<br>
![](https://images.viblo.asia/720f156f-ceab-4896-a7b6-ce443d56d607.png)

**Màn hình thông báo lỗi khi submit form bằng Ajax**<br>
![](https://images.viblo.asia/ee9d3661-96a6-4e4f-92a3-82427b369460.png)

**Màn hình đăng ký user thành công!**<br>
![](https://images.viblo.asia/4c78d217-23e5-4c5b-a161-d1be1175b612.png)