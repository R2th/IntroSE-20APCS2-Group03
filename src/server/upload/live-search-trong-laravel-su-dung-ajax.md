Ngày nay đối với mọi trang web dù là blog hay website thương mại, một thanh tìm kiếm luôn luôn là cần thiết. Tuy nhiên những ngày tháng của một thanh tìm kiếm theo cách đơn giản đã qua. Hiện nay một thanh tìm kiếm live, tức là có thể hiển thị kết quả tìm tiếm tức thì khiến cho quá trình sử dụng của người dùng dễ dàng hơn rất nhiều. Hôm nay mình sẽ hướng dẫn các bạn tạo một thanh live search trong Laravel sử dụng Ajax.
# Thiết lập thông tin database trong .env
Truy cập vào file .env trong project của bạn và thiết lập thông tin của file .env tại phần database như sau:

```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database.name
DB_USERNAME=database.username
DB_PASSWORD=database.password
```

Với `database.name`, `database.username`, `database.password` lần lượt là tên của cơ sở dữ liệu, tên của người dùng và mật khẩu truy cập cơ sở dữ liệu.

# Tạo migration
Giờ chúng ta cần tạo một bảng để lưu trữ dữ liệu, sử dụng câu lệnh sau để tạo một migration, ở đây mình tạo một bảng có tên là 'products'
```php
php artisan make:migration create_products_table --create=products
```

Sau khi chạy xong câu lệnh migration, bạn sẽ thấy một file mới được tạo ở **database/migration/<date>_create_products_table.php**
<br/>
<br/>
Mình sẽ thêm một số trường cho bảng này, ở đây mình sẽ dùng trường 'title' để tìm kiếm.
```php
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
            $table->string('title');
            $table->string('description');
            $table->integer('price');
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

Sau khi viết xong migration, bây giờ chúng ta sẽ tạo bảng, chạy câu lệnh sau:
```php
php artisan migrate
```

Sau khi chạy xong, bạn có thể kiểm tra cơ sở dữ liệu của bạn. Một bảng mới có tên là 'products' đã được thêm vào cơ sở dữ liệu của bạn với các trường đã được định nghĩa trong file migration.

# Tạo controller
Sau khi đã cơ sở dữ liệu đã sẵn sàng, bước tiếp theo chúng ta sẽ tạo controller. Chạy câu lệnh sau để tạo controller:
```php
php artisan make:controller LiveSearchController
```

Giờ đi đến **app/Http/controller/LiveSearchController.php** và chỉnh sửa như sau:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class LiveSearchController extends Controller
{
    public function index()
    {
        $products = DB::table('products')->get();

        return view('search.search', compact('products'));
    }

    public function search(Request $request)
    {
        if ($request->ajax()) {
            $output = '';
            $products = DB::table('products')->where('title', 'LIKE', '%' . $request->search . '%')->get();
            if ($products) {
                foreach ($products as $key => $product) {
                    $output .= '<tr>
                    <td>' . $product->id . '</td>
                    <td>' . $product->title . '</td>
                    <td>' . $product->description . '</td>
                    <td>' . $product->price . '</td>
                    </tr>';
                }
            }
            
            return Response($output);
        }
    }
}
```
<br/>

Mình sẽ giải thích một chút về đoạn code trên. Đầu tiên mình tạo một hàm **index** để trả về giao diện (mình sẽ tạo giao diện này trong bước tiếp theo). Sau đó là hàm **search** sẽ lấy dữ liệu từ thanh tìm kiếm, truyền nó vào Ajax và thực thi câu lệnh query, câu lệnh sẽ tìm kiếm tất cả dữ liệu từ bảng products mà có title giống với giá trị trên thanh tìm kiếm. Sau đó mình sẽ tạo một đoạn code HTML để trả về kết quả.

# Tạo route
Sau khi đã có controller, chúng ta sẽ định nghĩa một số route để sử dụng controller. Chúng ta sẽ định nghĩa 2 route tương ứng với 2 hàm chúng ta đã tạo trong controller.

Vào file **routes/web.php** và thêm vào hai route sau:
```php
Route::get('/', 'LiveSearchController@index');
Route::get('/search', 'LiveSearchController@search');
```

# Tạo view
Tạo một file **search.blade.php** trong project của bạn tại **resources/views/search** và thêm đoạn code sau:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta name="_token" content="{{ csrf_token() }}">
        <title>Live Search</title>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3>Products info </h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group">
                                <input type="text" class="form-controller" id="search" name="search"></input>
                            </div>
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                @if ($products)
                                    @foreach ($products as $product)
                                        <tr>
                                            <td>{{$product->id}}</td>
                                            <td>{{$product->title}}</td>
                                            <td>{{$product->description}}</td>
                                            <td>{{$product->price}}</td>
                                        </tr>
                                    @endforeach
                                @endif
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        <script type="text/javascript">
            $('#search').on('keyup',function(){
                $value = $(this).val();
                $.ajax({
                    type: 'get',
                    url: '{{ URL::to('search') }}',
                    data: {
                        'search': $value
                    },
                    success:function(data){
                        $('tbody').html(data);
                    }
                });
            })
            $.ajaxSetup({ headers: { 'csrftoken' : '{{ csrf_token() }}' } });
        </script>
    </body>
</html>
```

<br/>

Trong đoạn code trên thứ chúng ta cần quan tâm là đoạn script, nơi mình cài đặt phương thức ajax để tìm kiếm. Đoạn script này thực hiện bắt sự kiện mỗi khi bạn gõ vào thanh tìm kiếm, nó sẽ lấy dữ liệu ở ô input và gửi giá trị đến **/search**,  và như chúng ta đã định nghĩa trong route, dữ liệu sẽ được gửi vào hàm **search** trong controller. Và việc còn lại là của controller, nó sẽ tìm kiếm trong cơ sở dữ liệu và trả response về cho Ajax. Sau khi nhận được , dữ liệu trả về sẽ được hiển thị ra dưới hạng HTML.

# Tổng kết
Trên đây mình đã hướng dẫn các bạn sử dụng Ajax để thực hiện live search trong Laravel, tuy nhiên đây chỉ là một cách thủ công để thực hiện live search và cách sử dụng này chỉ phù hợp với các hệ thống nhỏ, ngoài ra còn nhiều cách thực hiện khác. Mọi thắc mắc liên quan đến bài viết mọi người có thể comment bên dưới nhé.