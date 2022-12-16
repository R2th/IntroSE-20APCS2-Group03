Chắc hẳn các bạn cũng không lạ gì với tính năng search  advance vì nó thường  có trong các dự án.
Nhưng chưa hẳn ai cũng biết cách tối ưu tính năng này  sao cho code  clear và có thể tái sử dụng chúng.
Và hôm nay mình hướng dẫn các bạn vài mẹo tối ưu code cho tính năng này.<br>
Bắt đầu nhé.

# I.Tạo nhanh project 
Ở đây mình coi như các bạn đã biết laravel cơ bản rồi nhé. Mình sẽ đi nhanh phần này.<br>

1.Tạo dự án .
```
composer create-project --prefer-dist laravel/laravel SearchAdvanceDemo
```

2.Tạo model,migration ,seeder và factory

-Migration: 
```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('detail');
            $table->float('price');
            $table->tinyInteger('status');
            $table->tinyInteger('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}

```
-Model
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = [
        'name', 'detail','image_name', 'path', 'price','type', 'status'
    ];

    public function getTypeAttribute($value)
    {
        if ($value) return 'SMART_PHONE';

        return 'LAPTOP';
    }

    public function getStatusAttribute($value)
    {
        if ($value) return 'NEW';

        return 'OLD';
    }
}

```
-Seeder:
```
<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Product::class, 30)->create();
    }
}

```
-Factory: 
```
<?php

use Faker\Generator as Faker;
use App\Product;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'detail' => $faker->text,
        'price' => $faker->randomElement([10, 100]),
        'status' => $faker->randomElement([1,2]),
        'type' => $faker->randomElement([1,2]),
    ];
});

```


Sau đó chạy lệnh: 
`  php artisan db:seed --class=ProductSeeder`
<br>
3.Tạo router, controler, View 
-Route: 
```
Route::get('product/search-advance', 'ProductController@search');
Route::post('product/search-advance', 'ProductController@getProductSearch');

```
-Controller
```
 public function search(Request $request)
    {
        return view('search-advance');
    }

    public function getProductSearch(Request $request)
    {
        $product = Product::query();

        if ($request->has('name')) {
            $product->where('name', 'LIKE', '%' . $request->name . '%');
        }

        if ($request->has('status')) {
            $product->where('status', $request->status);
        }
        if ($request->has('type')) {
            $product->where('type', $request->type);
        }

        if ($request->has('price')) {
            $product->where('price', $request->price);
        }

        $products =  $product->get();
        return view('search-product_result', ['products' => $products]);
    }

```

-View: 

Ở đây mình tạo ra 2 file view  
<br>
1. file "search-advance.blade.php" -> hiển thị màn hình search
```
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Search Advanced </title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

</head>
<body>
<div class="container">
    <div class="" style="margin-bottom: 50px; margin-top: 20px">Search advance</div>
    <div class="row" id="search" >
        <form id="search-form" action="{{ route('search_advance_product') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <div>Name:</div>
                 <input class="form-control" type="text" name="name" placeholder="name" />
            </div>

            <div class="form-group">
                <div>Status:</div>
                <select data-filter="make" name="status" class="filter-make filter form-control">
                    <option value="0">NEW</option>
                    <option value="1">OLD</option>
                </select>
            </div>
            <div class="form-group">
                <div>Type:</div>
                <select data-filter="make" name="type" class="filter-make filter form-control">
                    <option value="0">SMART_PHONE</option>
                    <option value="1">LAPTOP</option>
                </select>
            </div>

            <div class="form-group">
                <div>Price:</div>
                <select data-filter="make" class="filter-make filter form-control" name="price">
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                </select>
            </div>

            <div class="form-group col-xs-3">
                <button type="button" class="btn btn-block btn-primary" id="search-product" onclick="search()">Search</button>
            </div>
        </form>
    </div>
    <div class="row" id="products">

    </div>
</div>

</body>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>

<script>
        function search() {
                $.ajax({
                    type: "POST",
                    url: '{{ route('search_advance_product') }}',
                    data: $("#search-form").serialize(),
                    success: function(data)
                    {
                        $('#products').html(data);
                    }
                });
        }
</script>
</html>


```

2. file "search-product-result.blade.php" -> hiển thị kết quả search
```
<table class="table table-bordered">
    <tr class="success">
        <th>ID</th>
        <th>Name</th>
        <th>Detail</th>
        <th>Type</th>
        <th>Status</th>
        <th>Price</th>
    </tr>
    @foreach($products as $product)
        <tr>
            <td>{{ $product->id }}</td>
            <td>{{ $product->name }}</td>
            <td>{{ $product->detail }}</td>
            <td>{{ $product->type }}</td>
            <td>{{ $product->status }}</td>
            <td>{{ $product->price }}</td>
        </tr>
    @endforeach
</table>


```

# II. Một số tips 
Nhìn vào hàm getProductSearch dưới đây với cách viết thông thường các bạn cũng có thể hiểu.
<br>
```
 public function getProductSearch(Request $request)
    {
        $product = Product::query();

        if ($request->has('name')) {
            $product->where('name', 'LIKE', '%' . $request->name . '%');
        }

        if ($request->has('status')) {
            $product->where('status', $request->status);
        }
        if ($request->has('type')) {
            $product->where('type', $request->type);
        }

        if ($request->has('price')) {
            $product->where('price', $request->price);
        }

        $products =  $product->get();
        return view('search-product_result', ['products' => $products]);
    }
```

Nhưng với cách viết này có một số nhược điểm như là: <br>
+  Việc lặp code 
+  Khó tái sử dụng code  
+ Khó kiểm soát 
<br>
Để tối ưu được các nhược điểm trên ta sẽ thực hiện các mẹo dưới đây:
 
## 1. Dùng Local Scopes
Ta  sửa thêm các scopes vào model Product:
```
 public function scopeName($query, $request)
    {
        if ($request->has('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
        }

        return $query;
    }

    public function scopeStatus($query, $request)
    {
        if ($request->has('status')) {
            $query->where('name', $request->status);
        }

        return $query;
    }

    public function scopeType($query, $request)
    {
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        return $query;
    }

    public function scopePrice($query, $request)
    {
        if ($request->has('price')) {
            $query->where('price', $request->price);
        }

        return $query;
    }
```

Và sửa hàm **getProductSearch** trong  ProductController như sau:
```
    public function getProductSearch(Request $request)
    {
        $product = Product::query();
        $product->name($request)->price($request)->type($request)->status($request);

        $products =  $product->get();
        return view('search-product_result', ['products' => $products]);
    }
```

Nhìn vào nó có vẻ ngắn hơn và  có thể tái sử dụng code hơn rồi đó. <br>
Nhưng giả sử các field search nhiều hoặc có lúc khách hàng muốn ta thêm 1 số trường search nữa  thì ta lại phải thêm scope và mò trong controller chỗ nào dùng nó thêm vào sao ... (khó chịu nhỉ ). Cùng xem tiếp bên dưới nhé.

## 2.Tạo ra scopeFilter xử lý riêng cho việc search

Để giải quyết vấn đề ở trên ta tạo ra 1 hàm chịu trách nhiệm filter và filter các field 1 cách tự động bằng việc truyền params vào.

-Hàm **getProductSearch**  trong controller sẽ sửa thành như sau:
```
        $products = Product::filter($request)->get();

        return view('search-product_result', ['products' => $products]);
```

-Hàm filter chỉ là hàm trung chuyển gọi các hàm filter của mỗi model .
Và ta có thể viết hàm đó trong trait để các model có thể sử dụng chung.
```
trait Filterable
{
  public function scopeFilter($query, $request)
    {
        $params = $request->all();
        foreach ($params as $field => $value) {
            if ($field !==  '_token') {
                $method = 'filter' . Str::studly($field);

                if (!empty($value)) {
                    if (method_exists($this, $method)) {
                        $this->{$method}($query, $value);
                    }
                }
            }
        }

        return $query;
    }
}
```
-Hàm trên ta biết 1 scopeFilter nhận các params truyền vào  và ta sẽ auto check các phương thức trong model tương ứng với các param
(vi dụ: param có name, price... thì hàm sẽ là  filterName, filterPrice,...)
<br>
Chính vì thế ta phải sửa lại các hàm scope trong model Product tương ứng như sau:
```
 public function filterName($query, $value)
    {
        return $query->where('name', 'LIKE', '%' . $value . '%');
    }

    public function filterStatus($query, $value)
    {
        return $query->where('status', $value);
    }

    public function filterType($query, $value)
    {
        return $query->where('type', $value);
    }

    public function filterPrice($query, $value)
    {
        return $query->where('price', $value);
    }
```
-Ở trên mình đã bỏ check has('param) do ở trait mình chỉ lấy các params được gửi lên thôi và chú ý nhơ thêm trait Filterable vào model Product nhé. . 
<br>
Oke . Nhìn có vẻ ngon hơn rồi đó.  <br>Việc này có thể áp dụng cho các model khác sử dụng lại rất đơn giản phải không nào. 
<br>

Thử chạy lại xem kết quả có như nhau k nào: 
```
php artisan serve
```

![](https://images.viblo.asia/913050ed-9c7b-45d4-9f50-edbeaa23b938.png)
<br>
**Chú ý:** Bạn có  để ý  những hàm filterStatus, filterType,filterPrice chúng query  hoàn toàn giống nhau chỉ khác biến vì vậy đoạn này chúng ta thể ý tưởng viết 1 hàm chung và linh hoạt param truyền vào giúp code đỡ bị lặp nhé. Các bạn có thể tùy chỉnh hoặc tối ưu thêm những gì mà các bạn thấy có thể tối ưu nhé. Bài này mình xin dừng tại đây thôi.<br>
# Kết luận
Trên đó là gì mình học và tìm hiểu được  mong rằng có thể giúp ích được các bạn trong dự án lẫn công việc.<br>
Nguồn tham khảo: 
https://m.dotdev.co/writing-advanced-eloquent-search-query-filters-de8b6c2598db <br>
https://kipalog.com/posts/Query-filter-trong-laravel-don-gian-nhu-the-nao