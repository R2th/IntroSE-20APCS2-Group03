Chắc hẳn các bạn đâu đó cũng nghe tới **search autocomplete**  nó là  cách tự động gợi ý các từ  khi chúng ta gõ thực hiện tính năng tìm kiếm giúp thuận tiện cho việc tìm kiếm chính xác hơn cũng như nâng cao được trải nghiệm của người dùng. TÍnh năng này hiện tại đã và đang được rất nhiều trang web áp dụng (chắc hẳn các bạn hay search google đúng k . Chính nó đấy ). <br>
Thực ra có rất nhiều thư viện hỗ trợ cho chúng ta việc tìm kiếm này (vd typeahead, Easyautocomplete, Horsey, ...) .Tùy vào nhu cầu dự án mà mình lựa chọn và sử dụng thư viện sao cho phù hợp. <br>
Không lan man nữa , hôm nay mình xin hướng dẫn các bạn sử dụng thư viện  **jQuery Autocomplete** để thực hiện tính năng này. 
<br>
Bắt đầu thôi nào.

# Bước 1:Cài đặt ứng dụng Laravel 
Các bạn vào command gõ lệnh dưới đây để tạo project

```
composer create-project --prefer-dist laravel/laravel SearchDemo
```

# Bước 2:Tạo bảng, model Cake và dữ liệu mẫu cho nó.
    
**1.Đầu tiên tạo file migrate để tạo ra bảng cakes**
```
php artisan make:migration create_cakes_table
```
Nó sẽ sinh ra file create_cakes_table.php trong đường dẫn "database/migrations" và chúng ta sẽ vào file đó và copy nội dung sau đây:
```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCakesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cakes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);
            $table->float('price', 8, 2);
            $table->string('description', 255);
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
        Schema::dropIfExists('cakes');
    }
}

```
Sau chạy lệnh sau để tạo bảng cake:
```
php artisan migrate
```

**2. Tạo model Cake**
<br>Gõ lệnh sau để tạo model:
```
php artisan make:model:Cake
```
Nó sẽ sinh ra file  Cake.php trong đường dẫn app/Cake.php và vào file đó copy nội dung sau:

```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cake extends Model
{
    protected $guarded = ['id'];
}

```
**3. Tạo dữ liệu mẫu cho bảng cakes.**
<br>Lần lượt gõ các lệnh sau: 
```
php artisan make:seeder CakeSeederTable
php artisan make:factory CakeFactory
```

Nó sẽ sinh ra file CakeSeederTable.php và CakeFactory.php và ta sửa nội dung 2 file đó như sau:
<br>
**CakeSeederTable.php**
```
<?php

use Illuminate\Database\Seeder;

class CakeSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Cake::class, 20)->create();
    }
}

```

**CakeFactory.php**
```
<?php

use Faker\Generator as Faker;

$factory->define(\App\Cake::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
         'price' => $faker->randomElement([100, 1000]),
        'description' => $faker->text
    ];
});

```

Sau đó vào file **DatatableSeeder.php** sửa nội dung như sau:
<br>
```
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(CakeSeederTable::class);
    }
}

```
Cuối cùng chạy lệnh sau để tạo dữ liệu mẫu: 
```
php artisan db:seed --class=CakeSeederTable

```

# Bước 3: Cài đặt thư viện jQuery-Autocomplete
Có thể sử dụng 3 cách sau : 
+ Sử dụng npm:  `npm install jquery-autocomplete`
+ Có thể tải trực tiếp thư viện về và tích hợp vào trong project (https://github.com/devbridge/jQuery-Autocomplete)
+ Tích hợp thông qua CDN(https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.4.10/jquery.autocomplete.min.js)
<br>Ở đây mình tích hợp dùng CDN nhé.

# Bước 4: Xây dựng route,Controller, View

**1.Xây dựng route**

Ta vào **web.php** thêm route sau:
<br>
```
Route::get('demo-search', function () {
    return view('index');
});
Route::get('search', 'CakeController@searchByName');
```
**2.Xây dựng controller**

Tạo controller CakeController bằng câu lệnh sau:<br>
```
php artisan make:controller CakeController
```
Sửa nội dung  file CakeController thành (ở đây mình tìm kiếm theo gợi ý là name của cakes):

```
<?php

namespace App\Http\Controllers;

use App\Cake;
use Illuminate\Http\Request;

class CakeController extends Controller
{
    public function searchByName(Request $request)
    {
        $keyword = $request->input('keyword');
        $cakes = Cake::select('name')->where('name', 'LIKE', "%$keyword%")->get();
        return response()->json($cakes);
    }
}


```
**3.Xây dựng file view** 

Ở đây mình tạo ra file **index.blade.php** với nội dung như sau:
```
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Search Autocomplete</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

</head>
<body>
<div id="container" class="container">
    <div class="form-group">
        <div>Tìm kiếm</div>
        <input class="form-control" id="keyword" type="text" placeholder="Search" aria-label="Search">
    </div>
</div>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
{{--jquery.autocomplete.js--}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.4.10/jquery.autocomplete.min.js"></script>


<script>
    $(function () {
        $("#keyword").autocomplete({
            serviceUrl:'/search',
            paramName: "keyword",
            onSelect: function(suggestion) {
                $("#keyword").val(suggestion.value);
            },
            transformResult: function(response) {
                return {
                    suggestions: $.map($.parseJSON(response), function(item) {
                        return {
                            value: item.name,
                        };
                    })
                };
            },
        });
    })
</script>
</html>
{{--custom css item suggest search--}}
<style>
    .autocomplete-suggestions { border: 1px solid #999; background: #FFF; overflow: auto; }
    .autocomplete-suggestion { padding: 2px 5px; white-space: nowrap; overflow: hidden; }
    .autocomplete-selected { background: #F0F0F0; }
    /*.autocomplete-suggestions strong { font-weight: normal; color: #3399FF; }*/
    .autocomplete-group { padding: 2px 5px; }
    .autocomplete-group strong { display: block; border-bottom: 1px solid #000; }
</style>

```
**Note:** <br>
Ở trên mình có tích hợp CDN **jquery autocomplete**: 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.4.10/jquery.autocomplete.min.js"></script>
Để sử dụng thư viện thì ta sẽ gọi đến autocomplete  như sau:
```
 $("#keyword").autocomplete({
            serviceUrl:'/search',
            paramName: "keyword",
            onSelect: function(suggestion) {
                $("#keyword").val(suggestion.value);
            },
            transformResult: function(response) {
                return {
                    suggestions: $.map($.parseJSON(response), function(item) {
                        return {
                            value: item.name,
                        };
                    })
                };
            },
        });
```
**serviceUr**l:  Đường dẫn gọi ajax và response phải trả về dữ liệu json theo format sau: 
 ```
{
    // Query is not required as of version 1.2.5
    "query": "Unit", // mặc định nó sẽ search theo biến query có thể đổi biến này dùng  paramName,
    "suggestions": [
        { "value": "United Arab Emirates", "data": "AE" },
        { "value": "United Kingdom",       "data": "UK" },
        { "value": "United States",        "data": "US" }
    ]
}
```
**transformResult**: Sẽ format lại được giá trị trả về khi gọi ajax để lấy dữ liệu ra cũng như format đúng định dạng trả về mà thư viện yêu cầu để hiển thị đúng  suggests khi gõ tìm kiếm.<br>
**onSelect**: Khi click 1 ô gợi ý sẽ thực hiện làm gì.<br><br>
Đặc biệt chúng ta cũng có thể custom css được cho các ô gợi ý: <br>
-Mặc định thư viện sẽ render ra đoạn html sau:
```
<div class="autocomplete-suggestions">
    <div class="autocomplete-group"><strong>NHL</strong></div>
    <div class="autocomplete-suggestion autocomplete-selected">...</div>
    <div class="autocomplete-suggestion">...</div>
    <div class="autocomplete-suggestion">...</div>
</div>
```
-Vì vậy chúng ta có thể tùy chỉnh css như bài mình chỉnh như sau:

```
{{--custom css item suggest search--}}
<style>
    .autocomplete-suggestions { border: 1px solid #999; background: #FFF; overflow: auto; }
    .autocomplete-suggestion { padding: 2px 5px; white-space: nowrap; overflow: hidden; }
    .autocomplete-selected { background: #F0F0F0; }
    /*.autocomplete-suggestions strong { font-weight: normal; color: #3399FF; }*/
    .autocomplete-group { padding: 2px 5px; }
    .autocomplete-group strong { display: block; border-bottom: 1px solid #000; }
</style>
```

Còn có rất nhiều lựa chọn khác tùy thuộc vào yêu cầu bạn có thể tham khảo thêm ở:<br>
https://github.com/devbridge/jQuery-Autocomplete
# Bước 5: Xem thành quả

Bạn chạy lệnh sau và vào đường link http://localhost:8000/demo-search: 
```
php artisan serve
```

Cùng xem thành quả nào: <br>
![](https://images.viblo.asia/2bde0f83-5143-473d-bd0e-64ce9fd0a37b.png)

# Kết luận
Trên là những gì mà mình tìm hiểu được về thư viện **jQuery-Autocomplete** . <br>Mong rằng sẽ giúp ích được các bạn trong các dự án cũng như các bài tập trên trường... <br>Chúc các bạn thành công.!