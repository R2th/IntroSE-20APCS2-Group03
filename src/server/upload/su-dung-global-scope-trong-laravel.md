Trong bài viết này mình sẽ chia sẻ cách định nghĩa global scope trong laravel và cách sử dụng global scope trong ứng dụng laravel 6+.<br>
Global scope là một tính năng rất hay trong  laravel. Sử dụng Global scope bạn có thể tái sử dụng được những eloquent condition giống nhau trong laravel.<br>
Trong ví dụ này mình sẽ tạo ActiveScope để lấy các sữ liệu có trạng thái active từ model và cách sử dụng với nhiều models có scope giống nhau.<br>
Bạn có thể xem ví dụ bên dưới để hiểu hơn về global scope nhé.<br>
Đầu tiên mình sẽ tạo 2 tables users, admins với dữ liệu demo như bên dưới.<br>
**Table users:**<br>

![](https://images.viblo.asia/c38cbacd-7f2d-4206-8fb8-d8b5ea4f9aee.png)<br>
**Table admins:**<br>

![](https://images.viblo.asia/c142c822-dab5-4f1f-8c82-62b954204ccd.png)<br>
### Tạo Global Scope File
Trong bước này mình sẽ tạo mới ActiveScope global scope class như bên dưới:<br>
**app\Scopes\ActiveScope.php**<br>
```PHP
<?php
  
namespace App\Scopes;
  
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
  
class ActiveScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('is_active', '=', 1);
    }
}
```
###  Định nghĩa Global Scope trong User Model
**app/Models/User.php**
```PHP
<?php
  
namespace App\Models;
  
use Illuminate\Database\Eloquent\Model;
use App\Scopes\ActiveScope;
  
class User extends Model
{
    protected $fillable = [
        'name','email','password','is_active',
    ];
  
    protected static function boot()
    {
        parent::boot();
  
        static::addGlobalScope(new ActiveScope);
    }
}
```
###  Định nghĩa Global Scope trong Admin Model
**app/Models/Admin.php**
```php
<?php
  
namespace App\Models;
  
use Illuminate\Database\Eloquent\Model;
use App\Scopes\ActiveScope;
  
class Admin extends Model
{
    protected $fillable = [
        'name','email','password','is_active',
    ];
  
    protected static function boot()
    {
        parent::boot();
  
        return static::addGlobalScope(new ActiveScope);
    }
}
```

### Tạo UserController.php
Mình tạo UserController và thêm code như bên dưới.
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use App\Scopes\ActiveScope;

class UserController extends Controller
{

    public function index()
    {
        //write code here
    }
}
```
### Kiểm tra query lấy dữ liệu
Thực hiện lấy tất cả các bản ghi có trạng  thái is_active = 1<br>
Thêm đoạn code bên dưới vào hàm index để lấy dữ liệu từ 2 bảng users,admins.<br>
```PHP
    public function index()
    {
		$users = User::select('*')->get();
		$admins = Admin::select('*')->get();
		dd($users, $admins);
    }
```
**Output dữ liệu bảng users:**<br>
```
array:1 [▼
  0 => array:7 [▼
    "id" => 2
    "name" => "user2"
    "email" => "user2@gmail.com"
    "email_verified_at" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
  ]
]
```
**Output dữ liệu bảng admins:**<br>
```
array:2 [▼
  0 => array:9 [▼
    "id" => 2
    "name" => "admin2"
    "email" => "admin2@gmail.com"
    "email_verified_at" => null
    "password" => ""
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
  ]
  1 => array:9 [▼
    "id" => 3
    "name" => "admin3"
    "email" => "admin3@gmail.com"
    "email_verified_at" => null
    "password" => ""
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
  ]
]
```
### Sự dụng withoutGlobalScope()
Thực hiện lấy tất cả các bản ghi không phân biệt trạng thái is_active của dữ liệu .<br>
```PHP
    public function index()
    {
		$users = User::select('*')->withoutGlobalScope(ActiveScope::class)->get()->toArray();
		$admins = Admin::select('*')->withoutGlobalScope(ActiveScope::class)->get()->toArray();
		dd($users, $admins);
    }
```
**Output dữ liệu bảng users:**<br>
```
array:2 [▼
  0 => array:7 [▼
    "id" => 1
    "name" => "user1"
    "email" => "user1@gmail.com"
    "email_verified_at" => null
    "is_active" => 0
    "created_at" => null
    "updated_at" => null
  ]
  1 => array:7 [▼
    "id" => 2
    "name" => "user2"
    "email" => "user2@gmail.com"
    "email_verified_at" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
  ]
]
```
**Output dữ liệu bảng admins:**<br>
```
array:3 [▼
  0 => array:9 [▼
    "id" => 1
    "name" => "admin1"
    "email" => "admin1@gmail.com"
    "email_verified_at" => null
    "password" => ""
    "remember_token" => null
    "is_active" => 0
    "created_at" => null
    "updated_at" => null
  ]
  1 => array:9 [▼
    "id" => 2
    "name" => "admin2"
    "email" => "admin2@gmail.com"
    "email_verified_at" => null
    "password" => ""
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
  ]
  2 => array:9 [▼
    "id" => 3
    "name" => "admin3"
    "email" => "admin3@gmail.com"
    "email_verified_at" => null
    "password" => ""
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
  ]
]
```
Mình hy vọng bài viết sẽ giúp ích cho các bạn!<br>
Tham khảo: https://www.itsolutionstuff.com/