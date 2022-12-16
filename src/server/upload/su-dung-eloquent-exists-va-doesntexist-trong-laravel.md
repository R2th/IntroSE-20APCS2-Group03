Trong bài viết này mình sẽ chia sẻ cách sử dụng eloquent exists() và doesntExist() trong Laravel 6+. <br>
2 phương thức  exists() và doesntExist() trong laravel có nhiệm vụ kiểm tra xem dữ liệu có tồn tại hay không tồn tại trong database table. Khi thêm 2 phương thức này vào điều kiện, giá trị trả về sẽ là true hoặc false.<br>
Mình sẽ demo ví dụ bên dưới để các bạn hiểu hơn nhé! <br>
Đầu tiên mình sẽ tạo một bảng và dữ liệu demo như bên dưới.<br>
**Table users:**<br>
![](https://images.viblo.asia/b9a1e476-d33b-4336-99bc-440be57e0235.png)<br>

> Ví dụ về exists():

Hãy thêm code ở dưới vào controller:<br>
**App\Http\Controllers\UserController.php**<br>
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $isExist = User::select("*")
            ->where("email", "xokon@example.org")
            ->exists();
   
        if ($isExist) {
            dd('Record is available.');
        }else{
            dd('Record is not available.');
        }
    }
}

```
**Output:**<br>
```
"Record is available."
```

> Ví dụ về doesntExist():

Hãy cập nhật code vào controller như bên dưới:<br>
**App\Http\Controllers\UserController.php**<br>
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $isNotExist = User::select("*")
            ->where("email", "xokon@example.org12345")
            ->doesntExist();
   
        if ($isNotExist) {
            dd('Record is not available.');
        }else{
            dd('Record is available.');
        }
    }
}

```
**Output:**<br>
```
"Record is not available."
```

Mình hy vọng bài viết này giúp ích cho các bạn!