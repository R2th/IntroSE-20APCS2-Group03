Hôm nay mình sẽ giới thiệu các bạn cách sử dụng jquery ajax để validate form trong laravel.

Sẽ luôn tuyệt vời nếu bạn sử dụng validate trong  laravel  cho web của bạn trong dự án laravel.Chúng ta có thể sử dụng validate trong laravel rất đơn giản mà không cần sử dụng jquery ajax. Nhưng nếu bạn muốn sử dụng validate trong laravel với jquery thì bạn không thể làm điều đó một cách dễ dàng. Tuy nhiên bạn có thể làm theo hướng dẫn sau đây.

Bắt đầu nào. 

### Bước 1: Thêm route

Trong bước đầu tiên, bạn sẽ tạo mới 2 route để demo. vì vậy hãy mở  file  **routes/web.php** của bạn và thêm route sau.

**routes/web.php**
```
Route::get('my-form','HomeController@myform');
Route::post('my-form','HomeController@myformPost');
```

### Bước 2: Tạo Controller
 Bây giờ bạn tạo controller mới là HomeController. Chạy lệnh dưới đây để tạo controller mới.
 
```
php artisan make:controller HomeController
```

Sau đó, bạn sẽ tìm thấy tệp mới trong đường dẫn này **app/Http/Controllers/HomeController.php.**

Trong controller bạn tạo 2 phương thức dưới đây:

1)myform()

2)myformPost()

Và copy mã dưới đây vào trong HomController.php

**app/Http/Controllers/HomeController.php**

```
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


    	return response()->json(['error'=>$validator->errors()->all()]);
    }
}
```

### Bước 3: Tạo View

Bước cuối hãy tạo layout  myform.blade.php(resources/views/myform.blade.php) và bạn viết code và jquery ajax như dưới đây:

**resources/views/myform.blade.php**

```
<!DOCTYPE html>
<html>
<head>
    <title>Laravel Ajax Validation Example</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
</head>
<body>


<div class="container">
    <h2>Laravel Ajax Validation</h2>


    <div class="alert alert-danger print-error-msg" style="display:none">
        <ul></ul>
    </div>


    <form>
        {{ csrf_field() }}
        <div class="form-group">
            <label>First Name:</label>
            <input type="text" name="first_name" class="form-control" placeholder="First Name">
        </div>


        <div class="form-group">
            <label>Last Name:</label>
            <input type="text" name="last_name" class="form-control" placeholder="Last Name">
        </div>


        <div class="form-group">
            <strong>Email:</strong>
            <input type="text" name="email" class="form-control" placeholder="Email">
        </div>


        <div class="form-group">
            <strong>Address:</strong>
            <textarea class="form-control" name="address" placeholder="Address"></textarea>
        </div>


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
                url: "/my-form",
                type:'POST',
                data: {_token:_token, first_name:first_name, last_name:last_name, email:email, address:address},
                success: function(data) {
                    if($.isEmptyObject(data.error)){
                        alert(data.success);
                    }else{
                        printErrorMsg(data.error);
                    }
                }
            });


        }); 


        function printErrorMsg (msg) {
            $(".print-error-msg").find("ul").html('');
            $(".print-error-msg").css('display','block');
            $.each( msg, function( key, value ) {
                $(".print-error-msg").find("ul").append('<li>'+value+'</li>');
            });
        }
    });


</script>


</body>
</html>
```

Bây giờ hãy chạy ví dụ trên bằng câu lệnh dưới đây:

```
php artisan serve
```

Mở trình duyệt với link : 

```
http://localhost:8000/my-form
```

Chúc bạn thành công.

### Tài liệu tham khảo: https://itsolutionstuff.com/post/jquery-ajax-form-validation-with-laravel-58example.html