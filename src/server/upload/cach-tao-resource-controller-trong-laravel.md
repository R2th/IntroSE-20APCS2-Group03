Trong bài viết này, mình sẽ chia sẻ cách sử dụng resource controller bằng cách sử dụng resource route trong ứng dụng laravel 5, laravel 6, laravel 7 và laravel 8. <br>
Laravel resource controller là tính năng khá thú vị để tạo ứng dụng CRUD nhanh chóng trong laravel.<br>
Bình thường khi mình tạo ứng dụng CRUD mình sẽ phải truy cập vào route và mất thời gian khai báo các routes insert, update, view, delete như bên dưới.<br>

### CRUD Route:
```PHP
Route::get('items',['as'=>'items.index','uses'=>'ItemController@index']);

Route::post('items/create',['as'=>'items.store','uses'=>'ItemController@store']);

Route::get('items/edit/{id}',['as'=>'items.edit','uses'=>'ItemController@edit']);

Route::patch('items/{id}',['as'=>'items.update','uses'=>'ItemController@update']);

Route::delete('items/{id}',['as'=>'items.destroy','uses'=>'ItemController@destroy']);

Route::get('items/{id}',['as'=>'items.view','uses'=>'ItemController@view']);
```

### Resource Route:
Với khai báo routes ở trên, mình sẽ phải tạo 6 routes cho ứng dụng CRUD. Nhưng mình sẽ tạo 6 routes đó bằng cách sử dụng resource route bên dưới:<br>
```
Route::resource('items', 'ItemController');
```
Bây giờ, mình có thể chạy lệnh dưới đây và kiểm tra tạo danh sách routes:
```
php artisan route:list
```

### Output:
```HTML

+--------+-----------+---------------------+-----------------------------+------------------------------------------------------------+------------------------------------------+
| Domain | Method    | URI                 | Name                        | Action                                                     | Middleware                               |
+--------+-----------+---------------------+-----------------------------+------------------------------------------------------------+------------------------------------------+
|        | GET|HEAD  | /                   | generated::XBEZcUfEGj63UYJf | Closure                                                    | web                                      |
|        | GET|HEAD  | api/user            | generated::i9vdaYkfbCjVyzB1 | Closure                                                    | api                                      |
|        |           |                     |                             |                                                            | App\Http\Middleware\Authenticate:sanctum |
|        | GET|HEAD  | items               | items.index                 | App\Http\Controllers\ItemController@index                  | web                                      |
|        | POST      | items               | items.store                 | App\Http\Controllers\ItemController@store                  | web                                      |
|        | GET|HEAD  | items/create        | items.create                | App\Http\Controllers\ItemController@create                 | web                                      |
|        | GET|HEAD  | items/{item}        | items.show                  | App\Http\Controllers\ItemController@show                   | web                                      |
|        | PUT|PATCH | items/{item}        | items.update                | App\Http\Controllers\ItemController@update                 | web                                      |
|        | DELETE    | items/{item}        | items.destroy               | App\Http\Controllers\ItemController@destroy                | web                                      |
|        | GET|HEAD  | items/{item}/edit   | items.edit                  | App\Http\Controllers\ItemController@edit                   | web                                      |
|        | GET|HEAD  | sanctum/csrf-cookie | generated::aARefmQCMyRZY8wA | Laravel\Sanctum\Http\Controllers\CsrfCookieController@show | web                                      |
+--------+-----------+---------------------+-----------------------------+------------------------------------------------------------+------------------------------------------+

```
Tiếp theo mình sẽ tạo resource controller bằng cách sử dụng command bên dưới,và kiểm tra ItemController trong thư mục app.<br>

### Resource Controller Command:
```
php artisan make:controller ItemController --resource --model=Item
```

Sau khi chạy thành công lệnh trên, bạn có thể thấy ItemController của mình với phương thức resource sau.<br>
### app/Http/Controllers/ItemController.php
```
<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        //
    }
}

```
Với cách này bạn có thể đơn giản sử dụng resource route và controller, để tạo nhanh chức năng CRUD trong ứng dụng của bạn.