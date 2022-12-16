Hôm nay, Mình viết hướng dẫn về tự động tìm kiếm động từ cơ sở dữ liệu bằng cách sử dụng typeahead js trong ứng dụng laravel 5.7 ( bạn cũng có thể làm trên version 5.6 nhé ).
Trong những website lớn nhất là website TMDT, các phần tìm kiếm hay nhập liệu rất cần những tính năng thông minh như gợi ý dựa trên các từ nhập vào, nó giúp cho nâng cao trải nghiệm người dùng, giúp tìm kiếm và nhập liệu trở lên đơn giản hơn, đồng thời cũng giúp cho khách hàng tìm chính xác hơn sản phẩm và họ muốn tìm kiếm. Google là một minh chứng không cần phải bàn cãi cho vấn đề này. Nó đã giúp người dùng định hướng được ngay khi chỉ gõ vào 1-2 từ trong từ khóa. Sẽ thật tuyệt với trải nghiệm người dùng khi trên website của mình có 1 tính năng tuyệt vời như ông lớn google đúng ko :). Bắt đầu nhé...

![](https://images.viblo.asia/6eca553b-689d-4b0d-a036-e32b7e06fa5c.png)

## Step1 : Install laravel 5.7
* Điều này là hiển nhiên rồi hôm nay chúng mình làm chức này trên Framwork Laravel mà

```
composer create-project --prefer-dist laravel/laravel blog
```
* Các bạn lưu ý là muốn cài được laravel thì trước hết trên Lap của cá bạn đã cài composer rồi nhé, bạn nào còn chưa biết composer là gì thì có thể tìm hiểm tại [đây](https://getcomposer.org/).
* Đối với các bạn sử dụng ubuntu thì có thể xem tai [đây](https://linuxize.com/post/how-to-install-and-use-composer-on-ubuntu-18-04/).

## Setp 2 : Install Typehead.js
1. Giới thiệu về Typeahead
Typeahead.js là một thư viện Javascript rất linh hoạt, nó có thể làm nền tảng tốt để xây dựng các tính năng tìm kiếm gợi ý thông minh. Typeahead bao gồm hai thành phần:
Typeahead: Phần chuyên xử lý giao diện người dùng
Hiển thị gợi ý đến người dùng ngay khi họ nhập liệu
Hiển thị các gợi ý ngay trên ô nhập liệu
Hỗ trợ các tùy chỉnh giao diện linh hoạt
Highlight các từ khóa trùng khớp trong phần gợi ý
Kích hoạt các sự kiện tùy chỉnh cho phép mở rộng các xử lý
Bloodhound: Bộ máy gợi ý nâng cao
Cho phép các dữ liệu được hardcode
Lấy dữ liệu từ trước để giảm độ trễ khi gợi ý
Sử dụng Local Storage giảm số lượng các request đến máy chủ.
Sử dụng rate limit và bộ đệm cho các request đến máy chủ làm giảm nhẹ tải dữ liệu
Bộ máy gợi ý Bloodhound sẽ được sử dụng để tính toán kết quả với các truy vấn cho trước và Typeahead sẽ sử dụng để render ra mã HTML. Cả hai thành phần này là độc lập, trong bài viết này chúng ta sẽ sử dụng cả hai để xây dựng công cụ tìm kiếm gợi ý thông minh.
2. Bạn có thể cài đặt gói typehead bằng 2 cách:
    1. Cách 1 là sử dụng npm :
    `npm i typeahead`
    2. Tích hợp thông qua CDN :
    Sử dụng CDN giúp file có thể được tải về nhanh hơn, tuy nhiên cũng gặp phải một vấn đề là khi cá mập cắn cáp, internet chập chờn nếu các CDN không có server ở gần Việt Nam thì các thư viện này rất khó để tải về.
    jQuery:` https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js`
    Typeahead: ` https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js`
    Chú ý: Typeahead yêu cầu jquery phiên bản từ 1.9 trở lên.
    Trong bài viết này chúng ta sẽ sử dụng cách thứ ba cho nhanh, với dự án lớn nên sử dụng cách 1 để tối ưu hóa các tài nguyên với Laravel Mix.
## Setp 3 : Xây dựng BackEnd
### 3.1 Tạo bảng Customer và dữ liệu mẫu
* Tạo ra Model Customer cùng với file migrate thông qua câu lệnh artisan make:model
```
php artisan make:model Products -m
```
###  3.2 Config lại file vừa tạo trong Migration
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
            $table->string('name', 255);
            $table->string('description', 255);
            $table->Integer('price', 255);
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
* sau đó ca bạn chạy lệnh sau để khởi tạo table ( lưu ý nhớ config datase trong file .env ứng với DB của của cá bạn nhé )
```
php artisan migrate
```
### 3.3 Tạo dữ liệu mẫu với faker
* Bây giờ chúng sẽ tạo dữ liệu mẫu cho db để tiện hơn trong việc tìm kiếm dữ liệu với typehead
- Tạo file ProductFactory.php trong thư mục database\factories và thêm code như sau :
```
<?php
use Faker\Generator as Faker;

$factory->define(App\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'description' => $faker->text,
        'price' => $faker->numberBetween(1,100);
    ];
});
```
Tiếp theo chúng ta sẽ sử dụng Laravel Seeding để tạo ra 10000 dữ liệu customer mẫu trong database.
```
php artisan make:seeder ProductTableSeeder
```
Và thêm đoạn mã sau vào file ProductTableSeeder.php trong thư mục database\seeds:
```
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
        factory(Product::class, 1000)->create();
    }
}
```
Sau đó các bạn chạy lệnh sau để tạo dữ liệu mẫu :
```
php artisan db:seed
```
và khai báo sử dụng Seeder này trong file database\seeds\DatabaseSeeder.php:
```
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ProductTableSeeder::class);
    }
}
```
### 3.2 Thiết lập Route.
* Tạo thêm một route trong routes\web.php để hiển thị thông tin chi tiết của khách hàng
```
Route::get('/search', 'SearchController@searchUsers');
```
* Tạo thêm một route trong routes\web.php để hiển thị thông tin chi tiết của khách hàng
```
Route::get('product/{id}', function() {
   $product = Product::find($id);
   return $product->name . '-' . $product->price;
});
```

### 3.3 Tạo Controller
1. Tạo controller SearchController bằng lệnh artisan:

```
php artisan make:controller SearchController
```
Thêm phương thức find vào SearchController.php trong app\Http\Controllers:
```
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class SearchController extends Controller
{
    public function find(Request $request) {
    	$product = Prodcut::where('name', 'like', '%' . $request->get('q') . '%')->get();
    	return response()->json($product);
    }
}
```
### 3.4 Tạo View
```
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Tim Kiem thong minh voi Typeheadjs trong laravel">
        <meta name="author" content="FirebirD ['www.viblo.com']">
        <title>Tim Kiem thong minh voi Typeheadjs trong laravel</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        <style type="text/css">html{position:relative;min-height:100%;}body{margin-bottom:60px;}.footer{position:absolute;bottom:0;width:100%;height:60px;background-color:#f5f5f5;}body>.container{padding:60px 15px 0;}.container.text-muted{margin: 20px 0;}.footer>.container{padding-right:15px;padding-left:15px;}code{font-size:80%;}</style>
    </head>
    <body>
        <!-- Fixed navbar -->
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Typeahead</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>

        <!-- Begin page content -->
        <div class="container">
            <div class="page-header">
                <h3>Ví dụ tìm kiếm thông minh sử dụng typeahead.js trong ứng dụng Laravel</h3>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <form class="form-inline typeahead">
                        <div class="form-group">
                            <input type="name" class="form-control search-input" id="name" autocomplete="off" placeholder="Nhập tên sản phẩm, Gía">
                        </div>
                        <button type="submit" class="btn btn-default">Tìm kiếm</button>
                    </form>
                </div>
            </div>
        </div>

        <footer class="footer">
            <div class="container">
                <p class="text-muted">Example in <a href="https://allaravel.com">laravel typehead</a></p>
            </div>
        </footer>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js"></script>
        <script>
            jQuery(document).ready(function($) {
                var engine = new Bloodhound({
                    remote: {
                        url: 'api/product?q=%QUERY%',
                        wildcard: '%QUERY%'
                    },
                    datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace
                });

                $(".search-input").typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                }, {
                    source: engine.ttAdapter(),
                    name: 'usersList',
                    templates: {
                        empty: [
                            '<div class="list-group search-results-dropdown"><div class="list-group-item">Không có kết quả phù hợp.</div></div>'
                        ],
                        header: [
                            '<div class="list-group search-results-dropdown">'
                        ],
                        suggestion: function (data) {
                            return '<a href="product/' + data.id + '" class="list-group-item">' + data.name + '</a>'
                        }
                    }
                });
            });
        </script>
    </body>
</html>
```
### 3.5 Khởi tạo Typeahead
* Typeahead có nhiều cách khởi tạo và sau đây là cách khởi tạo hay dùng nhất jQuery#typeahead(options, [*datasets]). Tính năng typeahead được áp dụng cho các input dạng text input[type=”text”] có hai tham số cho khởi tạo:
options là các tùy chọn cấu hình, một số giá trị cần quan tâm như sau:
highlight: thêm thẻ <strong> vào các từ trùng khớp trong phần gợi ý. Mặc định là false.
hint: hiển thị cả từ gợi ý trong ô nhập liệu, mặc định true.
minLength: Số ký tự tối thiểu cần nhập khi tính năng gợi ý được bắt đầu, mặc định là 1.
classNames: Cho phép sử dụng tên class khác với mặc định.
dataset: một typeahead có thể có nhiều dataset, ví dụ khi bạn tìm kiếm trong một trang bán hàng có thể trả về gợi ý cho cả sản phẩm và các tin tức liên quan đến sản phẩm. Các dataset có một số các tùy chọn cấu hình như sau:
name: tên của dataset.
source: nguồn dữ liệu dùng cho gợi ý, có thể là một instance của Bloodhound, như ở phần đầu chúng ta có nói Typeahead chỉ xử lý giao diện người dùng và Bloodhound với là bộ máy thực hiện các gợi ý.
limit: Số gợi ý tối đa sẽ được hiển thị, mặc định là 5.
```
$("#navbar-search-input").typeahead({
    hint: true,
    highlight: true,
    minLength: 1
});
```
* Khởi tạo Bloodhound
    Bloodhound là bộ máy gợi ý cho Typeahead.js, sử dụng thành phần này mang lại nhiều tính năng nâng cao hơn vì nó có thể lấy dữ liệu từ một nguồn remote và sử dụng bộ đệm để tăng tốc.
```
var engine = new Bloodhound({
    remote: {
        url: 'api/product?q=%QUERY%',
        wildcard: '%QUERY%'
    },
    datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
    queryTokenizer: Bloodhound.tokenizers.whitespace
});
```
Chúng ta sẽ thiết lập đường dẫn /find?q= trong phần Laravel, datumTokenizer cần một mảng JSON. Như vậy, chúng ta đã có dữ liệu và có thể sử dụng nó cho thiết lập source của typeahead như sau:
```
 source: engine.ttAdapter()
```
* Tạo mẫu cho các gợi ý
    Typeahead cho phép sử dụng các template để thay đổi kiểu mẫu cho các gợi ý, bạn cũng có thể sử dụng bootstrap để style:
```
templates: {
    empty: [
        '<div class="list-group search-results-dropdown"><div class="list-group-item">Không có kết quả phù hợp.</div></div>'
    ],
    header: [
        '<div class="list-group search-results-dropdown">'
    ],
    suggestion: function (data) {
         return '<a href="' + data.id + '" class="list-group-item">' + data.name + '</a>'
    }
}
```
* Code hoàn chỉnh cho Typeahead.js
```
jQuery(document).ready(function($) {
    var engine = new Bloodhound({
        remote: {
            url: 'api/product?q=%QUERY%',
            wildcard: '%QUERY%'
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    $(".search-input").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        source: engine.ttAdapter(),
        name: 'usersList',
        templates: {
            empty: [
                '<div class="list-group search-results-dropdown"><div class="list-group-item">Không có kết quả phù hợp.</div></div>'
            ],
            header: [
                '<div class="list-group search-results-dropdown">'
            ],
            suggestion: function (data) {
                return '<a href="' + data.id + '" class="list-group-item">' + data.name + '</a>'
      }
        }
    });
});
```
 
    
###  Kết Luân:
 Với việc sử dụng Typeahead trong ứng dụng Laravel, trải nghiệm người dùng được nâng cao hơn. Typeahead không chỉ sử dụng trong các phần tìm kiếm mà chúng ta có thể sử dụng trong các form nhập liệu giúp gợi ý thông tin nhập liệu. Hi vọng bài viết sẽ giúp ích cho các bạn trong các dự án riêng sử dụng Laravel
* Nguồn tham khảo : https://www.kerneldev.com/2018/02/07/laravel-autocomplete-search-with-typeahead-js/
* Nguồn tham khảo: https://allaravel.com/laravel-tutorials