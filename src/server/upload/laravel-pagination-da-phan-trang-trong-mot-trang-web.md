# 1. Đặt vấn đề
* Trong Laravel 5.3 trở về trước, một trang web có nhiều hơn 1 phân trang sẽ là một vấn đề thì với Laravel 5.4 đã làm cho vấn đề này trở nên khá đơn giản. 
* Tại sao phải có đa phân trang, ta xét với ví dụ sau đây: trong một website thương mại điện tử, khi thực hiện tìm kiếm, chúng ta muốn sẽ tìm kiếm từ khóa đó với cả sản phẩm và bài viết, trong khi đó nhiều website bỏ qua phần tìm kiếm cho bài viết mà chỉ tập trung vào tìm kiếm cho sản phẩm, đây là một sai lầm. Kết quả tìm kiếm đa dạng sẽ giúp trải nghiệm người dùng tốt hơn, giữ chân khách hàng lâu hơn trên website của bạn.
* Như vậy, khi thực hiện tìm kiếm trên một website thương mại điện tử chúng ta sẽ phân ra hai kết quả là một cho sản phẩm và một cho tin tức, như vậy chúng ta có 2 phân trang trong cùng một trang. Laravel Pagination giúp bạn phân trang kết quả nhanh chóng, chúng ta sẽ cùng nhau thực hiện ví dụ đa phân trong trong một trang web.
# 2. Sử dụng {{ $$model-> links() }} trong phân trang
Bạn đã được làm quen với cách phân trang hoặc cách thức truyền tham số cho phân trang. Tuy nhiên, nếu trong trang đó có hai tập kết quả và **sử dụng hai phân trang bằng {{ $$model-> links() }}** sẽ làm cho tính năng phân trang bị rối loạn , **vì nó sử dụng cùng tham số ?page=x** để biết được đang đứng ở trang nào, khi đó cả hai tập kết quả sẽ cùng chuyển đến trang x.

# 3. Ví dụ về đa phân trang với Laravel Pagination
**Mô tả đầu bài:** *Có một website có cả sản phẩm và bài viết, khi tìm kiếm chúng ta muốn kết quả phân thành hai phần: kết quả tìm kiếm sản phẩm và kết quả tìm kiếm bài viết, cả hai kết quả này đều được phân trang.*

-----
Chúng ta bắt đầu thực hiện các bước như sau:
## Bước 1: Tạo bảng và thêm dữ liệu với Laravel Migration và Laravel Seeding
    Bảng products:
    *     id: id sản phẩm
    *     name: tên sản phẩm
    *     price: giá sản phẩm
    *     content: nội dung sản phẩm
    Bảng news:
    *     id: id bài viết
    *     title: tiêu đề bài viết
    *     content: nội dung bài viết
    
### - Tạo ra các file migration bằng câu lệnh artisan make: migration
     
```
     c:\xampp\htdocs\laravel-test>php artisan make:migration create_products_table --create=products
     Created Migration: 2017_04_24_024728_create_products_table

     c:\xampp\htdocs\laravel-test>php artisan make:migration create_news_table --create=news
     Created Migration: 2017_04_24_024755_create_news_table
```

- Sửa nội dung các file migration sau:
   Với file 2018_07_24_024728_create_products_table
     
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
                $table->integer('price');
                $table->text('content');
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
   Với file 2018_07_24_024755_create_news_table:

```
        <?php

        use Illuminate\Support\Facades\Schema;
        use Illuminate\Database\Schema\Blueprint;
        use Illuminate\Database\Migrations\Migration;

        class CreateNewsTable extends Migration
        {
            /**
             * Run the migrations.
             *
             * @return void
             */
            public function up()
            {
                Schema::create('news', function (Blueprint $table) {
                    $table->increments('id');
                    $table->string('title', 255);
                    $table->text('content');
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
                Schema::dropIfExists('news');
            }
        }
```


- Thực hiện tạo ra các bảng trên bằng lệnh php artisan migration
```
        c:\xampp\htdocs\laravel-test>php artisan migrate
        Migrated: 2017_04_24_024728_create_products_table
        Migrated: 2017_04_24_024755_create_news_table
```
### - Tiếp theo, sử dụng Laravel Seeding để thêm dữ liệu test vào: 
Đầu tiên, tạo ra hai seeder cho products và news bằng câu lệnh: php artisan make:seeder
```
        c:\xampp\htdocs\laravel-test>php artisan make:seeder ProductsTablesSeeder
        Seeder created successfully.

        c:\xampp\htdocs\laravel-test>php artisan make:seeder NewsTablesSeeder
        Seeder created successfully.
```
- Thay đổi nội dung của hai file seeder này.
    Với file database\seeder\ProductsTableSeeder.php
```
        <?php

        use Illuminate\Database\Seeder;

        class ProductsTablesSeeder extends Seeder
        {
            /**
             * Run the database seeds.
             *
             * @return void
             */
            public function run()
            {
                DB::table('products')->insert([
                   ['name' => 'Sản phẩm 1', 'price' => '300000', 'content' => str_random(255)],
                   ['name' => 'Sản phẩm 2', 'price' => '400000', 'content' => str_random(255)],
                   ['name' => 'Sản phẩm 3', 'price' => '500000', 'content' => str_random(255)],
                   ['name' => 'Sản phẩm 4', 'price' => '600000', 'content' => str_random(255)],
                   ['name' => 'Sản phẩm 5', 'price' => '700000', 'content' => str_random(255)],
                   ['name' => 'Sản phẩm 6', 'price' => '800000', 'content' => str_random(255)],
                   ['name' => 'Sản phẩm 7', 'price' => '900000', 'content' => str_random(255)],
                   ['name' => 'Sản phẩm 8', 'price' => '1000000', 'content' => str_random(255)],
                ]);
            }
        }
```

   Với file database\seeder\NewsTableSeeder.php
```
        <?php

        use Illuminate\Database\Seeder;

        class NewsTablesSeeder extends Seeder
        {
            /**
             * Run the database seeds.
             *
             * @return void
             */
            public function run()
            {
                DB::table('news')->insert([
                    ['title' => 'Bài viết về sản phẩm 1', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 2', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 3', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 4', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 5', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 6', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 7', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 8', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 9', 'content' => str_random(255)],
                    ['title' => 'Bài viết về sản phẩm 10', 'content' => str_random(255)],
                ]);
            }
        }
```

- Tiếp theo, thực hiện insert dữ liệu test vào CSDL
```
        c:\xampp\htdocs\laravel-test>php artisan db:seed --class=ProductsTablesSeeder
        c:\xampp\htdocs\laravel-test>php artisan db:seed --class=NewsTablesSeeder
```

   => Như vậy chúng ta đã chuẩn bị xong phần CSDL

## Bước 2: Tạo view, route, controller xử lý phần tìm kiếm
### - Thêm route vào routes/web.php:
    `Route::post('/search', 'SearchController@searchResult');`



### - Chỉnh sửa lại phần menu.blade.php trong resources/views/layouts.
```

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
                <a class="navbar-brand" href="/">All Laravel TEnv</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/">Trang chủ</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Ví dụ <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="/first-blade-example">Ví dụ Blade 1</a></li>
                            <li><a href="/second-blade-example">Ví dụ Blade 2</a></li>
                        </ul>
                    </li>
                    {!! Form::open(array('url' => '/search', 'class' => 'navbar-form navbar-left', 'method' => 'get')) !!}
                        <div class="form-group">
                            {!! Form::text('keyword', '', array('class' => 'form-control', 'placeholder' => 'Nhập từ khóa...')) !!}
                        </div>
                        {!! Form::submit('Tìm kiếm', array('class' => 'btn btn-default')) !!}
                    {!! Form::close() !!}
                    <li><a href="/contact">Liên hệ</a></li>
                    @if(Session::has('login') && Session::get('login') == true)
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Xin chào {{ Session::get('name') }} <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="/logout">Đăng xuất</a></li>
                        </ul>
                    </li>
                    @endif
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>

```


Bây giờ chúng ta thử vào một trang bất kỳ trong project laravel-test chúng ta sẽ thấy xuất hiện công cụ tìm kiếm ở phía trên.
![](https://images.viblo.asia/45a2a6bb-9207-4858-8b66-32ed732ba635.png)

### - Tiếp theo chúng ta tạo hai Eloquent Model là Product và News:
```
        c:\xampp\htdocs\laravel-test>php artisan make:model Product
        Model created successfully.
        c:\xampp\htdocs\laravel-test>php artisan make:model News
        Model created successfully.
```

Thay đổi nội dung app\Product.php như sau:
```
        <?php

        namespace App;

        use Illuminate\Database\Eloquent\Model;

        class Product extends Model
        {
            protected $table = 'products';
            public static function productSearch($keyword, $paginate){
                return Product::where('name', 'like', '%' . $keyword . '%')->paginate($paginate, ['*'], 'pp');
            }
        }
```

Thay đổi nội dung app\News.php
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news';
    public static function newsSearch($keyword, $paginate){
    	return News::where('title', 'like', '%' . $keyword . '%')->paginate($paginate, ['*'], 'np');
    }
}
```

### - Tiếp theo tạo SearchController để xử lý tìm kiếm:
```
        c:\xampp\htdocs\laravel-test>php artisan make:controller SearchController
        Controller created successfully.
```

- Thêm phương thức searchResult() vào SearchController:
```
        <?php

        namespace App\Http\Controllers;

        use Illuminate\Http\Request;
        use App\Product;
        use App\News;

        class SearchController extends Controller
        {
            public function searchResult(Request $request){
                $keyword = $request->input('keyword');
                $pResult = null;
                $nResult = null;
                if($keyword != null){
                    $pResult = Product::productSearch($keyword, 3);
                    $nResult = News::newsSearch($keyword, 3);
                }
                return view('fontend.search')->with(compact('pResult', 'nResult'));
            }
        }
```

### Tiếp theo, tạo view search.blade.php trong resources/views/fontend để hiển thị kết quả tìm kiếm:
```

        @extends('layouts.default')

        @section('title', 'Kết quả tìm kiếm - Allaravel.com')

        @section('content')
            @php
                //dd(Request::all());
            @endphp
            <h2>Kết quả tìm kiếm cho sản phẩm</h2>
            <table class="table table-bordered">
                <tr class="success">
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá sản phẩm</th>
                    <th>Nội dung</th>
                </tr>
                @foreach($pResult as $p)
                <tr>
                    <td>{{ $p->id }}</td>
                    <td>{{ $p->name }}</td>
                    <td class="text-right">{{ number_format($p->price) }}</td>
                    <td>{{ $p->content }}</td>
                </tr>
                @endforeach
            </table>
            {{ $pResult->appends(Request::all())->links() }}

            <h2>Kết quả tìm kiếm cho bài viết</h2>
            <table class="table table-bordered">
                <tr class="success">
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Nội dung bài viết</th>
                </tr>
                @foreach($pResult as $p)
                <tr>
                    <td>{{ $p->id }}</td>
                    <td>{{ $p->title }}</td>
                    <td>{{ $p->content }}</td>
                </tr>
                @endforeach
            </table>
            {{ $nResult->appends(Request::all())->links() }}
        @endsection
```

## Bước 3: Kiểm tra kết quả đạt được trong ví dụ đa phân trang bằng Laravel Pagination
Vào một trang bất kỳ và tìm kiếm từ khóa “sản phẩm”, vì trong bước 1 chúng ta đã cố tình chèn các sản phẩm và bài viết đều có từ sản phẩm. Kết quả cho thấy hai phần phân trang tách biệt nhau rất thuận tiện cho người sử dụng.
![](https://images.viblo.asia/98651645-4c0f-400f-b715-472aa6ac1624.png)

# 4. Lời kết
Laravel Pagination là tính năng rất hay khi làm việc với kết quả truy vấn từ CSDL, bạn hoàn toàn có thể áp dụng cho nhiều các tình huống thực tế riêng. Với Laravel 5.4, việc đa phân trang trở nên đơn giản và làm cho Laravel càng trở thành một framework tuyệt vời để phát triển các ứng dụng web.

Xem thêm bài viết khác tại đây: https://viblo.asia/p/laravel-don-gian-dep-va-hieu-qua-hon-su-dung-laravel-facade-RnB5pXzr5PG