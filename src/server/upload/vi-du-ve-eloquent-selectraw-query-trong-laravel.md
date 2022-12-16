Hello mọi người!<br>
Trong bài viết này mình sẽ chia sẻ cách sử dụng hàm selectraw() query với Laravel 8.<br>
Các bạn có thể sử dụng hàm selectraw() với những phiên bản laravel 6+.<br>
Mình sẽ demo ví dụ bên dưới để các bạn dễ hiểu nhé.<br>
Trước tiên mình tạo table posts với dữ liệu demo như bên dưới.<br>

![](https://images.viblo.asia/8ebe3d58-8892-45c8-9518-e5894130b49e.png)<br>

> Ví dụ 1

Hãy thêm code vào controller như bên dưới.<br>
**app\Http\Controllers\PostController.php**
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use DB;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::select("*")
            ->selectRaw('price + ? as price_with_bonus', [500])
            ->get()
            ->toArray();
            
        dd($posts);
    }
}
```
**Output:**<br>
```
array:2 [▼
  0 => array:7 [▼
    "id" => 1
    "title" => "PHP"
    "body" => "Khóa Học PHP"
    "price" => 100
    "created_at" => "2021-12-28T10:26:59.000000Z"
    "updated_at" => null
    "price_with_bonus" => 600
  ]
  1 => array:7 [▼
    "id" => 2
    "title" => "Laravel"
    "body" => "Khóa Học Laravel"
    "price" => 100
    "created_at" => "2021-12-29T10:27:27.000000Z"
    "updated_at" => null
    "price_with_bonus" => 600
  ]
]
```
> Ví dụ 2

Hãy cập nhật code trong controller như bên dưới nhé.<br>
**app\Http\Controllers\PostController.php**
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use DB;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::select("*")
            ->select('*', DB::raw('price + 400 as price_with_bonus'))
            ->get()
            ->toArray();

        dd($posts);
    }
}

```
**Output:**<br>
```
array:2 [▼
  0 => array:7 [▼
    "id" => 1
    "title" => "PHP"
    "body" => "Khóa Học PHP"
    "price" => 100
    "created_at" => "2021-12-28T10:26:59.000000Z"
    "updated_at" => null
    "price_with_bonus" => 500
  ]
  1 => array:7 [▼
    "id" => 2
    "title" => "Laravel"
    "body" => "Khóa Học Laravel"
    "price" => 100
    "created_at" => "2021-12-29T10:27:27.000000Z"
    "updated_at" => null
    "price_with_bonus" => 500
  ]
]
```
Hy vọng bài viết này sẽ giúp ích cho các bạn!