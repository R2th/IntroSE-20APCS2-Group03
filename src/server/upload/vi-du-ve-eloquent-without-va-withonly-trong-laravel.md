Hello mọi người,<br>
Bài viết này mình sẽ chia sẻ cách sử dụng phương thức eloquent without() và withonly() trong laravel 8.<br>
Các bạn hãy theo dõi các ví dụ bên dưới để hiểu hơn về cách sử dụng của 2 phương thức này nhé.<br>
Đầu tiên mình sẽ tạo 3 tables với dữ liệu demo như bên dưới.<br>
**table users**<br>
![](https://images.viblo.asia/b606d08c-57ff-4cf8-b257-fcadf39023ef.png)<br>

**table payments**<br>
![](https://images.viblo.asia/4955f0d8-8def-4a5d-afd2-3959f1b3e36c.png)<br>

**table countries**<br>
![](https://images.viblo.asia/743f6d5b-52ae-4d48-a2a0-bb14b06897f4.png)<br>

Tiếp theo trong Model User mình sẽ tạo relationships cho 3 table users, payments, countries như bên dưới.<br>
**app/Models/User.php**
```PHP
<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $with = ['payments', 'country'];//đoạn này sẽ tự động thêm điều kiện with() vào câu query khi select dữ liệu từ bảng users

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}

```
> Ví dụ sử dụng query lấy tất cả dữ liệu từ bảng users

Hãy thêm code bên dưới vào trong controller như bên dưới. <br>
**app/Http/Controllers/UserController.php**
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
	    $users = User::get()->toArray();

	    dd($users);
    }
}
```
**Output:**<br>
```
array:2 [▼
  0 => array:11 [▼
    "id" => 1
    "name" => "user1"
    "email" => "user1@gmail.com"
    "country_id" => 1
    "password" => "123456"
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
    "payments" => array:1 [▼
      0 => array:5 [▼
        "id" => 1
        "user_id" => 1
        "total_money" => 14000
        "created_at" => "2021-12-30T16:51:53.000000Z"
        "updated_at" => null
      ]
    ]
    "country" => array:4 [▼
      "id" => 1
      "name" => "Viet Nam"
      "created_at" => "2021-12-31T13:35:46.000000Z"
      "updated_at" => null
    ]
  ]
  1 => array:11 [▼
    "id" => 2
    "name" => "user2"
    "email" => "user2@gmail.com"
    "country_id" => 2
    "password" => "123456"
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
    "payments" => array:1 [▼
      0 => array:5 [▼
        "id" => 2
        "user_id" => 2
        "total_money" => 20000
        "created_at" => "2021-12-30T16:51:53.000000Z"
        "updated_at" => null
      ]
    ]
    "country" => array:4 [▼
      "id" => 2
      "name" => "Thai Lan"
      "created_at" => "2021-12-31T13:35:46.000000Z"
      "updated_at" => null
    ]
  ]
]
```

> Ví dụ sử dụng phương thức without()

**app/Http/Controllers/UserController.php**<br>
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
        $users = User::without("payments")->get()->toArray();
  
        dd($users);
    }
}
```
**Output:**<br>
```
array:2 [▼
  0 => array:10 [▼
    "id" => 1
    "name" => "user1"
    "email" => "user1@gmail.com"
    "country_id" => 1
    "password" => "123456"
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
    "country" => array:4 [▼
      "id" => 1
      "name" => "Viet Nam"
      "created_at" => "2021-12-31T13:35:46.000000Z"
      "updated_at" => null
    ]
  ]
  1 => array:10 [▼
    "id" => 2
    "name" => "user2"
    "email" => "user2@gmail.com"
    "country_id" => 2
    "password" => "123456"
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
    "country" => array:4 [▼
      "id" => 2
      "name" => "Thai Lan"
      "created_at" => "2021-12-31T13:35:46.000000Z"
      "updated_at" => null
    ]
  ]
]
```

> Ví dụ sử dụng phương thức withOnly()

**app/Http/Controllers/UserController.php**<br>
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
        $users = User::withOnly("payments")->get()->toArray();
  
        dd($users);
    }
}

```
**Output:**<br>
```
array:2 [▼
  0 => array:10 [▼
    "id" => 1
    "name" => "user1"
    "email" => "user1@gmail.com"
    "country_id" => 1
    "password" => "123456"
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
    "payments" => array:1 [▶]
  ]
  1 => array:10 [▼
    "id" => 2
    "name" => "user2"
    "email" => "user2@gmail.com"
    "country_id" => 2
    "password" => "123456"
    "remember_token" => null
    "is_active" => 1
    "created_at" => null
    "updated_at" => null
    "payments" => array:1 [▶]
  ]
]
```
Hy vọng bài viết này sẽ giúp ích cho bạn!