Bài viết này mình sẽ chia sẻ cách sử dụng laravel collection để lấy phần tử đầu tiên và cuối cùng trong collection.<br>
Bạn có thể lấy bản ghi đầu tiên và cuối cùng từ collection trong laravel 6+ trở nên.<br>
Các bạn xem 2 ví dụ bên dưới để hiểu hơn nhé.<br>
> Get First Item:

**Controller Code:**
```PHP
<?php

namespace App\Http\Controllers;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $collection = collect([
            [
                'id' => 1,
                'name' => 'One',
                'email' => 'one@gmail.com'
            ],
            [
                'id' => 2,
                'name' => 'Two',
                'email' => 'two@gmail.com'
            ],
            [
                'id' => 3,
                'name' => 'Three',
                'email' => 'three@gmail.com'
            ],
            [
                'id' => 4,
                'name' => 'Four',
                'email' => 'four@gmail.com'
            ]
        ]);
  
        $first = $collection->first();
          
        dd($first);
    }
}

```
**Output:**
```
array:3 [▼
  "id" => 1
  "name" => "One"
  "email" => "one@gmail.com"
]
```
> Get Last Item:

**Controller Code:**
```PHP
<?php

namespace App\Http\Controllers;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $collection = collect([
            [
                'id' => 1,
                'name' => 'One',
                'email' => 'one@gmail.com'
            ],
            [
                'id' => 2,
                'name' => 'Two',
                'email' => 'two@gmail.com'
            ],
            [
                'id' => 3,
                'name' => 'Three',
                'email' => 'three@gmail.com'
            ],
            [
                'id' => 4,
                'name' => 'Four',
                'email' => 'four@gmail.com'
            ]
        ]);
  
        $last = $collection->last();
          
        dd($last);
    }
}

```
**Output:**
```
array:3 [▼
  "id" => 4
  "name" => "Four"
  "email" => "four@gmail.com"
]
```
Hy vọng bài viết này giúp ích cho các bạn!