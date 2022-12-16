Trong dự án nhiều khi chúng ta muốn lấy bản ghi cuối cùng trong 1 table nào đó.<br>
Để giải quyết vấn đề này chúng ta có thể sử dụng hàm latest() hoặc orderBy() trong Laravel 6+.<br>
Mình sẽ demo 3 cách lấy bản ghi cuối cùng trong table ở các ví dụ bên dưới  nhé.<br>
Đầu tiên mình sẽ tạo một table items có các dữ liệu demo như bên dưới.<br>

![](https://images.viblo.asia/f2b3ae38-6952-4cbe-a8ee-7639185d1fde.png)<br>
### Using latest() belong to created_at field:
Khi sử dụng latest() mặc định nó sẽ lấy bản ghi cuối cùng dựa vào trường created_at trong table items.<br>
Thêm code vào controller như bên dưới.<br>
**app\Http\Controllers\ItemController.php**
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\Item;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $last_record = Item::latest()->first()->toArray();
        dd($last_record);
    }
}
```
**Output:**
```
array:7 [▼
  "id" => 4
  "title" => "Four"
  "description" => "Four@gmail.com"
  "is_active" => 1
  "deleted_at" => null
  "created_at" => "2021-12-30T11:16:47.000000Z"
  "updated_at" => null
]
```
### Using orderBy() belong to id field:
**app\Http\Controllers\ItemController.php**
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\Item;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $last_record = Item::orderBy('id', 'DESC')->first()->toArray();
        dd($last_record);
    }
}
```
**Output:**
```
array:7 [▼
  "id" => 4
  "title" => "Four"
  "description" => "Four@gmail.com"
  "is_active" => 1
  "deleted_at" => null
  "created_at" => "2021-12-30T11:16:47.000000Z"
  "updated_at" => null
]
```
### Using latest() belong to id field:
**app\Http\Controllers\ItemController.php**
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\Item;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $last_record = Item::latest('id')->first()->toArray();
        dd($last_record);
    }
}
```
**Output:**
```
array:7 [▼
  "id" => 4
  "title" => "Four"
  "description" => "Four@gmail.com"
  "is_active" => 1
  "deleted_at" => null
  "created_at" => "2021-12-30T11:16:47.000000Z"
  "updated_at" => null
]
```
Hy vọng bài viết này sẽ giúp ích cho các bạn!