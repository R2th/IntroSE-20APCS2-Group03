Hôm nay, tôi xin giới thiệu tới quý bạn đọc một ví dụ đơn giản sử dụng Laravel Scout và Vuejs để xây dựng một ứng dụng search đơn giản. Bài viết này chỉ cung cấp cho các bạn cách sử dụng đơn giản nhất thôi. Còn muốn hiểu sâu, hiểu kỹ thì các bạn hãy dựa trên những gì có trong bài viết này để đào sâu nghiên cứu hơn nữa nhé. 

Như tiêu đề bài viết, thì trong bài này tôi sẽ sử dụng 2 công cụ chính đó là: Laravel Scout và Vuejs

-  Laravel Scout là gì? Nếu các bạn chưa biết thì có thể tìm kiếm ngay trong tài liệu của Laravel, trong mục #Introduction có ghi là

```
Laravel Scout provides a simple, driver based solution for adding full-text search to your Eloquent models. Using model observers, Scout will automatically keep your search indexes in sync with your Eloquent records.
```

- Vuejs là gì chắc cũng không còn xa lạ với bất cứ ai làm lập trình viên. Ví tới nay, Vuejs cũng đã xuất hiện được gần 5 năm. các bạn có thể dễ dàng tra từ khóa trên google để biết thêm thông tin. 

Bây giờ chúng ta sẽ đi vào phần chi tiết của bài viết.

** Cài đặt môi trường code Laravel **

Trước tiên, tạo mới một project Laravel bằng lệnh: 

```
composer create-project --prefer-dist laravel/laravel search
```

Câu lệnh trên sẽ tạo cho chúng ta một project laravel mới với tên là search. Vì là một project hoàn toàn mới, cho nên chúng ta cần sinh key cho project bằng lệnh

```
php artisan key:generate
```

Cài đặt thành công thì màn hinh home của project như sau:

![](https://images.viblo.asia/96f21e03-71e9-4911-9368-33293ddea79e.png)

** Create Database**

Trước tiên, hay thiết lập kết nối của project tới database của bạn. copy file **.env.example** vào file **.env**. Mở file **.env** và config những thông tin như 

```
DB_CONNECTION=mysql
DB_HOST=db_host
DB_PORT=3306
DB_DATABASE=db_name
DB_USERNAME=db_user
DB_PASSWORD=db_pass
```

Tiếp theo, tạo model và migration bằng lệnh

```
php artisan make:model Product -m
```

Khi bạn cho thêm option -m vào câu lệnh tạo model, thì laravel sẽ sinh thêm cho bạn file migration. Mở file migration vừa được tạo. Sửa với nội dung sau:

```
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
            $table->string('image');
            $table->integer('price');
            $table->text('description');
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

Lưu file lại và chạy migrate để tạo bẳng bằng lệnh sau:

```
php artisan migrate
```

Seeder data:

Mở file **database/factories/ModelFactory.php** và thêm dòng code:

```
$factory->define(App\Product::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->sentence(),
        'image' => 'http://loremflickr.com/400/300?random='.rand(1, 100),
        'price' => $faker->numberBetween(3, 100),
        'description' => $faker->paragraph(2)
    ];
});
```

Bạn cũng có thể thêm trực tiếp vào database bằng việc sử dụng laravel tinker như sau:

```
php artisan tinker
factory(App\Product::class, 100)->create();
```

Bạn có thể tạo nhiều hơn 100 record bằng việc truyền số lượng bản ghi bạn muốn tạo.

Định nghĩa route và tạo controller, mở file web.php và thêm dòng này vào bên dưới

```
Route::resource('search', SearchController');
```

Sau đó, tạo mới Search controller bằng lệnh:

```
php artisan make:controller SearchController
```

Mở SearchController và thêm function mới vào:

```
class SearchController extends Controller
{
    public function search(Request $request)
    {
        // we will be back to this soon!
    }
}
```

**Cài đặt Laravel Scout**

Cài đặt Laravel Scout bằng lệnh sau:

```
composer require laravel/scout

php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```

Add thêm vào file **config/app.php***

```
Laravel\Scout\ScoutServiceProvider::class,
```

Cuối cùng, thêm trait Searchable vào Model Product như sau:

```
<?php

namespace App;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use Searchable;
}
```

**Viết method Search**

Mở file SearchController.php và sửa function search thành như sau:

```
/**
     * Search the products table.
     *
     * @param  Request $request
     * @return mixed
     */
    public function search(Request $request)
    {
        // First we define the error message we are going to show if no keywords
        // existed or if no results found.
        $error = ['error' => 'No results found, please try with different keywords.'];

        // Making sure the user entered a keyword.
        if($request->has('q')) {

            // Using the Laravel Scout syntax to search the products table.
            $posts = Product::search($request->get('q'))->get();

            // If there are results return them, if none, return the error message.
            return $posts->count() ? $posts : $error;

        }

        // Return the error message if no keywords existed
        return $error;
    }
```

Đừng quên thêm vào đầu file dòng sau:

```
use App\Product;
```

Chạy thử với trình duyệt, được kết quả sau:

![](https://images.viblo.asia/e0bdceac-1743-4eb7-8b58-83690d0889d3.png)

Mọi việc cơ bản là đã hoàn thành, chỉ còn thiết kết một chút giao diện nữa là xong. Đến đây chúng ta mới áp dụng Vuejs vào để thiết kế frontend. Mờ file **home.blade.php** và thêm code

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <title>Search with Laravel Scout and Vue.js!</title>
    </head>
    <body>
        <div class="container">
            <div class="well well-sm">
                <div class="form-group">
                    <div class="input-group input-group-md">
                        <div class="icon-addon addon-md">
                            <input type="text" placeholder="What are you looking for?" class="form-control">
                        </div>
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button">Search!</button>
                        </span>
                    </div>
                </div>
            </div>
            <div id="products" class="row list-group">
            </div>
        </div>
    </body>
</html>
```

Tới đây, tôi mới chỉ import bootstrap vào, bây giờ hãy thêm Vuejs vào cho ứng dụng

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.0.1/vue-resource.min.js"></script>
<script src="/js/app.js"></script>
```

Tiếp theo, hãy tạo file **app.js** trong thư mục **public/js/** với đoạn code sau:

```
new Vue({
    el: 'body',
});
```

**Vue.js data and bindings:***

Để có thể dùng Vue.js bindings được dữ liêu, trước tiên hãy chỉnh sửa một chút file blade của chúng ta. Thay vì sử dụng input như bên trên, hãy sử dụng input sau:

```
<input type="text" placeholder="What are you looking for?" class="form-control" v-model="query">
```

Sửa button thành 

```
<button class="btn btn-default" type="button" v-if="!loading">Search!</button>
<button class="btn btn-default" type="button" disabled="disabled" v-if="loading">Searching...</button>
```

Thêm một thao tác để hiển thị thông báo lỗi:

```
<div class="alert alert-danger" role="alert" v-if="error">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    @{{ error }}
</div>
```

Sửa button search thành 

```
<button class="btn btn-default" type="button" @click="search()" v-if="!loading">Search!</button>
```

Tiếp theo, sửa file **app.js** của bạn thành:

```
new Vue({
    el: 'body',
    data: {
        products: [],
        loading: false,
        error: false,
        query: ''
    },
    methods: {
	    search: function() {
	        // Clear the error message.
	        this.error = '';
	        // Empty the products array so we can fill it with the new products.
	        this.products = [];
	        // Set the loading property to true, this will display the "Searching..." button.
	        this.loading = true;

	        // Making a get request to our API and passing the query to it.
	        this.$http.get('/api/search?q=' + this.query).then((response) => {
	            // If there was an error set the error message, if not fill the products array.
	            response.body.error ? this.error = response.body.error : this.products = response.body;
	            // The request is finished, change the loading to false again.
	            this.loading = false;
	            // Clear the query.
	            this.query = '';
	        });
	    }
	}
});
```

Cuối cùng, để hiển thị được image của product

```
<div class="item col-xs-4 col-lg-4" v-for="product in products">
    <div class="thumbnail">
        <img class="group list-group-image" :src="product.image" alt="@{{ product.title }}" />
        <div class="caption">
            <h4 class="group inner list-group-item-heading">@{{ product.title }}</h4>
            <p class="group inner list-group-item-text">@{{ product.description }}</p>
            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <p class="lead">$@{{ product.price }}</p>
                </div>
                <div class="col-xs-12 col-md-6">
                    <a class="btn btn-success" href="#">Add to cart</a>
                </div>
            </div>
        </div>
    </div>
</div>
```

Đến đây là chúng ta đã hoàn thiện được function search có sử dụng cả vuejs để code giao diện. Chúc các bạn thành công