Có nhiều dự án thực tế ở màn hình tìm kiếm sẽ có một box tìm kiếm để nhập user name và khi nhập user name thì sẽ tìm kiếm tất cả các users có trường firt name hoặc last name giống với text tìm kiếm nhập vào ô tìm kiếm.<br>
Trong bài biết này mình sẽ chia sẻ 3 cách để tìm kiếm first name hoặc last name trong laravel version 6 trở lên nhé.<br>

> Ví dụ 1:

Hãy update code vào controller như bên dưới nhé.<br>
**app/Http/Controller/UserController**
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use DB;

class UserController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $search = "Barack Ob";
        $users = User::select("id", "first_name", "last_name")
                       ->orWhere(DB::raw("concat(first_name, ' ', last_name)"), 'LIKE', "%".$search."%")
                       ->get()->toArray();
  
        dd($users);
    }
}
```
**Output:**
```PHP
array:1 [▼
  0 => array:3 [▼
    "id" => 1
    "first_name" => "Barack"
    "last_name" => "Obama"
  ]
]
```

> Ví dụ 2:

**app/Http/Controller/UserController**
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use DB;

class UserController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $search = "Barack Ob";
        $users = User::select("id", "first_name", "last_name")
                       ->whereRaw("concat(first_name, ' ', last_name) like '%" .$search. "%' ")
                       ->get()->toArray();
  
        dd($users);
    }
}
```
**Output:**
```PHP
array:1 [▼
  0 => array:3 [▼
    "id" => 1
    "first_name" => "Barack"
    "last_name" => "Obama"
  ]
]
```

> Ví dụ 3:

**app/Http/Controller/UserController**
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use DB;

class UserController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $search = "Ob";
        $users = User::select("id", "first_name", "last_name")
                       ->where(function ($q) use ($search) {
                            $q->orWhere('first_name', 'like', "%{$search}%")
                              ->orWhere('last_name', 'like', "%{$search}%");
                        })
                       ->get()->toArray();
  
        dd($users);
    }
}
```
**Output:**
```PHP
array:1 [▼
  0 => array:3 [▼
    "id" => 1
    "first_name" => "Barack"
    "last_name" => "Obama"
  ]
]
```