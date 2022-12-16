Bài viết này mình sẽ chia sẻ cách sử dụng mệnh đề where exists trong laravel 5+.<br>
Mình sẽ demo ví dụ bên dưới để các bạn dễ hiểu nhé.<br>
Đầu tiên mình sẽ tạo 2 tables với dữ liệu demo như bên dưới.<br>
**Table items:**<br>
![](https://images.viblo.asia/0eeba20b-1ffd-4588-bb88-fd96b5cf9ece.png)<br>


**Table items_city:**<br>
![](https://images.viblo.asia/032425fa-d9a5-43b2-82f2-252a3e1847cc.png)<br>

Tiếp theo tạo controller và thêm code như bên dưới.<br>
**App\Http\Controllers\ItemController**
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ItemController extends Controller
{
	public function index()
	{
	    $items = DB::table('items')
		    ->whereExists(function ($query) {
		        $query->select("items_city.id")
	              	->from('items_city')
	              	->whereRaw('items_city.item_id = items.id');
		    })
		    ->get()
		    ->toArray();

	    dd($items);
	}
}

```
Điều kiện ở trên sẽ lấy tất cả những items mà có id tồn tại trong trường item_id của bảng items_city.<br>

**Output:**
```PHP
array:3 [▼
  0 => {#300 ▼
    +"id": 1
    +"title": "Quincy Gottlieb"
    +"description": "Ipsum labore vel vel non voluptatem sed. Earum id soluta adipisci sit sunt reiciendis."
    +"is_active": 0
    +"deleted_at": null
    +"created_at": "2021-12-31 10:13:37"
    +"updated_at": "2021-12-31 10:13:37"
  }
  1 => {#302 ▼
    +"id": 3
    +"title": "Rosie Bernhard"
    +"description": "Quos tempore quas sed distinctio doloremque. Doloribus nesciunt aut ut. Sunt veniam enim autem. Nostrum illum animi culpa sunt cumque."
    +"is_active": 0
    +"deleted_at": null
    +"created_at": "2021-12-31 10:13:37"
    +"updated_at": "2021-12-31 10:13:37"
  }
  2 => {#305 ▼
    +"id": 5
    +"title": "Verner O'Keefe V"
    +"description": "Reiciendis excepturi aut esse aut odio quia fuga. Molestias eos reprehenderit deserunt quam ut totam. Aut enim molestiae provident vel beatae quae omnis."
    +"is_active": 0
    +"deleted_at": null
    +"created_at": "2021-12-31 10:13:37"
    +"updated_at": "2021-12-31 10:13:37"
  }
]
```

Hy vọng bài viết này giúp ích cho các bạn chưa biết nhé!