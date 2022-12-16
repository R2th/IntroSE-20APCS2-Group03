Trong bài viết này mình sẽ chia sẻ cách tạo một query Scope trong model và cách sử dụng của nó.<br>
Bạn có thể sử dụng tính năng này từ laravel 6+ trở nên, để hiểu hơn các bạn hãy xem ví dụ bên dưới nhé.<br>
Trước khi đi vào ví dụ mình sẽ tạo 1 table Post có dữ liệu demo như bên dưới.<br>
![](https://images.viblo.asia/c7aa9266-a6a6-46ed-9684-42d5f972410d.png)<br>

### Create Scope in Model
Trong model Post mình sẽ thêm scope là lấy dữ liệu trong bảng post có cột created_at bằng với ngày hiện tại.<br>
**app/Models/Post.php**
```PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * Scope a query to only include popular users.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('created_at', \Carbon\Carbon::today());
    }

}
```

### Use Scope Query in Controller
Mình sẽ tạo một controller là PostController để in ra dữ liệu như bên dưới nhé.<br>
**app/Http/Controller/PostController.php**
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
    	$posts = Post::select("*")->today()->get()->toArray();
    	dd($posts);
    }
}
```
**Output:**
```
array:2 [▼
  0 => array:6 [▼
    "id" => 2
    "title" => "Laravel"
    "body" => "Learn Laravel"
    "status" => 1
    "created_at" => "2021-12-29T10:27:27.000000Z"
    "updated_at" => "2021-12-29T10:27:27.000000Z"
  ]
  1 => array:6 [▼
    "id" => 3
    "title" => "Javascript"
    "body" => "Learn Javascript"
    "status" => 1
    "created_at" => "2021-12-29T10:27:27.000000Z"
    "updated_at" => "2021-12-29T10:27:27.000000Z"
  ]
]
```
### Dynamic Scope in Model
Trong model Post mình sẽ thêm scope chỉ lấy các bản ghi có trang thái status = 1 bằng cách truyền tham số động ở controller nhé.<br>
Mình sẽ cập nhật code model như bên dưới.<br/>
**app/Models/Post.php**
```PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * Scope a query to only include popular users.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('created_at', \Carbon\Carbon::today());
    }

    /**
     * Scope a query to only include popular users.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeStatus($query, $type)
    {
        return $query->where('status', $type);
    }
}

```

Tiếp theo cập nhật code trong controller.<br>
**app/Http/Controller/PostController.php**
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
		$posts = Post::select("*")->status(1)->get()->toArray();
    	dd($posts);
    }
}
```
**Output:**
```
array:2 [▼
  0 => array:6 [▼
    "id" => 2
    "title" => "Laravel"
    "body" => "Learn Laravel"
    "status" => 1
    "created_at" => "2021-12-29T10:27:27.000000Z"
    "updated_at" => "2021-12-29T10:27:27.000000Z"
  ]
  1 => array:6 [▼
    "id" => 3
    "title" => "Javascript"
    "body" => "Learn Javascript"
    "status" => 1
    "created_at" => "2021-12-29T10:27:27.000000Z"
    "updated_at" => "2021-12-29T10:27:27.000000Z"
  ]
]
```
Cách sử dụng global scope trong laravel: https://viblo.asia/p/su-dung-global-scope-trong-laravel-aWj53zmwl6m<br>
Hy vọng bài viết này giúp ích cho các bạn!