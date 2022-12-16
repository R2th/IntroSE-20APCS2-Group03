# I. Gợi ý tìm kiếm với ajax trong Laravel.
Chào các bạn! Hôm nay mình xin giới thiệu cách hiển thị gợi ý khi tìm kiếm trong laravel bằng ajax, mình xin chia thành 2 bài.
- Bài 1 mình sử dụng ajax.
- Bài 2 mình sử dụng Typeahead một thư viện hỗ trợ cho việc gợi ý tìm kiếm của JavaScript rất được ưa chuộng.
- Trước khi đến với tìm kiếm sử dụng ajax chúng ta sẽ tạo những điều kiện cần để test code ajax tìm kiếm xem nó có hoạt động hay không. Các bạn có thể áp dụng trực tiếp code ajax vào sản phẩm đang làm bằng cách kéo nhanh xuống dưới và copy đoạn code ajax để sử dụng với điều kiện các bạn đã biết chút ít về ajax.
  - Chú ý: các câu lệnh chạy trong command đối với win và terminal với unbutu nhé!
## 1. Tạo bảng dữ liệu để tìm kiếm.
### 1.1 Tạo bảng với migrate.
 Tất nhiên rồi, tìm kiếm thì cần có bảng dữ liệu để tìm kiếm chứ đúng không nào. Mình tạo bảng có tên là 'products' nhé!
 ```php
php artisan make:migration products --create=products
```
 Các bạn vào database và mở file ...products.php lên cho nó vài trường dữ liệu nào (Mình sẽ tìm kiếm với 'name_product').
 ```php
 <?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Products extends Migration
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
            $table->string('name_product');
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
  Mình tạo trường 'name_product' để tìm kiếm với nó các bạn thích tìm kiếm với trường nào thì thêm vào và có thể thêm tùy ý miễn là chú ý khi truy vấn dữ liệu để không bị nhầm tên là được.
  Bây giờ các bạn tạo bảng với câu lệnh.
 ```php
 php artisan migrate
 ```
 - Chú ý là để chạy migrate các bạn nhớ cấu hình cho file .env và tạo tên database tương ứng nhé
```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shop
DB_USERNAME=root
DB_PASSWORD=
```
 Các bạn tìm và cấu hình file .env nhé! Các bạn để ý cấu hình cho phù hợp. Tên database của mình là 'shop' còn các bạn có thể tạo database khác và kết nối cho đúng là được.
### 1.2 Tạo dữ liệu mẫu với seeder.
  Để tạo dữ liệu mẫu các bạn có thể tạo trực tiếp trong cơ sở dữ liệu, mình thì thích dùng seeder hơn. Câu lệnh tạo seeder.
 ```php
 php artisan make:seeder ProductTableSeeder
 ```
  Bạn vào seeds mở file vừa tạo lên để thêm dữ liệu mẫu vào.
 ```php
 <?php

use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $data = [
            [
                'name_product'=>'iPhone',
            ],
            [
                'name_product'=>'Samsung',
            ],
            [
                'name_product'=>'HTC',
            ],
            [
                'name_product'=>'Huawei',
            ],
            [
                'name_product'=>'Oppo',
            ],
        ];
        DB::table('products')->insert($data);
    }
}

 ```
  Giờ chạy seeder nào.
 ```php
 php artisan db:seed --class=ProductTableSeeder
 ```
### 1.3 Tạo routes.
 Bạn vào web.php thêm cho mình hai routes như sau.
```php
Route::get('search', 'SearchController@getSearch');
Route::post('search/name', 'SearchController@getSearchAjax')->name('search');
```
### 1.4 tạo Controller.
 Có routes rồi thì phải tạo controller để chạy chứ đúng không nào. Lệnh tạo controller, ở đây mình tạo controller có tên là 'SearchController' các bạn có thể đặt tên khác tùy thích nhưng phải trùng với route nhé.
```php
php artisan make:controller SearchController
```
### 1.5 Tạo view.
 Bạn vào view và tạo cho mình một view với tên là 'searchajax.blade.php' và tạo dao diện search như sau.
```php
<!DOCTYPE html>
<html>
<head>
  <title>Ajax search</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <style type="text/css">
  .box{
    width:600px;
    margin:0 auto;
  }
</style>
</head>
<body>
  <br />
  <div class="container box">
   <h3 align="center">Gợi ý tìm kiếm với ajax</h3><br />   
   <div class="form-group">
    <input type="text" name="country_name" id="country_name" class="form-control input-lg" placeholder="Enter Country Name" />
    <div id="countryList"><br>
    </div>
  </div>
  {{ csrf_field() }}
</div>
</body>
</html>
```
- Lưu ý: các đường dẫn mình để online nên các bạn phải có mạng mới kết nối được nhé. Các bạn có thể kết nối trực tiếp với jquery của các bạn bằng cách tải nó về và nhúng vào project của mình.
-  Các bạn mở controller lên và mở file SearchController.php mà mình tạo bên trên lên thêm cho nó đoạn code để hiển thị view nào.
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function getSearch(Request $request)
    {
        return view('searchajax');
    }
}

```
 Các bạn chạy thử xem  đã hiển thị được view searchajax.blade.php chưa nhé.
## 3. Gợi ý tìm kiếm với ajax.
 Bây giờ mới đến phần chính.
 Trong view bạn thêm đoạn code ajax để tìm kiếm và hiển thị như sau.
```php
<!DOCTYPE html>
<html>
<head>
  <title>Ajax search</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <style type="text/css">
  .box{
    width:600px;
    margin:0 auto;
  }
</style>
</head>
<body>
  <br />
  <div class="container box">
   <h3 align="center">Gợi ý tìm kiếm với ajax</h3><br />   
   <div class="form-group">
    <input type="text" name="country_name" id="country_name" class="form-control input-lg" placeholder="Enter Country Name" />
    <div id="countryList"><br>
    </div>
  </div>
  {{ csrf_field() }}
</div>
</body>
</html>

<script>
  $(document).ready(function(){

   $('#country_name').keyup(function(){ //bắt sự kiện keyup khi người dùng gõ từ khóa tim kiếm
    var query = $(this).val(); //lấy gía trị ng dùng gõ
    if(query != '') //kiểm tra khác rỗng thì thực hiện đoạn lệnh bên dưới
    {
     var _token = $('input[name="_token"]').val(); // token để mã hóa dữ liệu
     $.ajax({
      url:"{{ route('search') }}", // đường dẫn khi gửi dữ liệu đi 'search' là tên route mình đặt bạn mở route lên xem là hiểu nó là cái j.
      method:"POST", // phương thức gửi dữ liệu.
      data:{query:query, _token:_token},
      success:function(data){ //dữ liệu nhận về
       $('#countryList').fadeIn();  
       $('#countryList').html(data); //nhận dữ liệu dạng html và gán vào cặp thẻ có id là countryList
     }
   });
   }
 });

   $(document).on('click', 'li', function(){  
    $('#country_name').val($(this).text());  
    $('#countryList').fadeOut();  
  });  

 });
</script>

```
 Bây giờ bên controller sẽ sử lý khi nhận được dữ liệu.
```php
<?php

namespace App\Http\Controllers;
use DB;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function getSearch(Request $request)
    {
        return view('searchajax');
    }

    function getSearchAjax(Request $request)
    {
        if($request->get('query'))
        {
            $query = $request->get('query');
            $data = DB::table('products')
            ->where('name_product', 'LIKE', "%{$query}%")
            ->get();
            $output = '<ul class="dropdown-menu" style="display:block; position:relative">';
            foreach($data as $row)
            {
               $output .= '
               <li><a href="data/'. $row->id .'">'.$row->name_product.'</a></li>
               ';
           }
           $output .= '</ul>';
           echo $output;
       }
    }
}

```
 - vậy là ok rồi đấy các bạn, rất đơn giản phải không nào.
 - Lưu ý: 
 + Bạn có thể chỉnh sửa hiển thị tùy ý bằng cấu hình trong controller như thêm đường dẫn, hiển thị thêm ảnh, tên, ... Thậm chí bạn còn css được.
 vd:
 ```php
  $output = '<ul class="dropdown-menu" style="display:block; position:relative">';
            foreach($data as $row)
            {
               $output .= '
               <li><a href="data/'. $row->id .'">'.$row->name_product.'</a></li>
               <img src="public/'.$row->img.'"></img>
               <p style="color:red; text-align:center">abc</p>
               ';
           }
           $output .= '</ul>';
   ```
  + Bạn có thể trả về dữ liệu kiểu json và đọc json đấy bên code của ajax bằng cách trả về kiểu dữ liệu json thay vì kiểu html
  vd: return response()->json($products);
#  4 Kết luân.
 Vậy là mình đã hướng dẫn song gợi ý tìm kiếm với ajax, ở bài sau mình sẽ giới thiệu cách dùng Typeahead để gợi ý tìm kiếm. Vì là thư viện nên Typeahead hỗ trợ rất tốt cho việc này các bạn ạ. Với Typeahead mình sẽ dùng cách trả về dữ liệu dạng json và cách đọc json để hiển thị nhé. Còn cách trả về dạng html như bài này không được ưa chuộng vì khó tái sử dụng code cho nhiều mục đích khác nhau vd như bạn làm app mà khi đọc dữ liệu trang web mà nó trả về dạng html thì bạn đọc sấp mặt rồi. Nhớ chú ý xem bài tiếp theo về  Typeahead của mình nhé. Mọi thắc mặc mọi người comment trong bài viết này. thanks!
- Nguồn tham khảo: https://www.youtube.com/watch?v=D4ny-CboZC0