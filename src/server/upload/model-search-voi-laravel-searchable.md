# 1. Mở đầu
Trong bài viết này mình sẽ giới thiệu về thư viện Laravel searchable, ra đời vào cuối năm 2018, đây là một thư viện hỗ trợ chức năng tìm kiếm đơn giản trên model.
# 2. Cài đặt
## 2.1 Tạo dự án và các model
Tạo mới một dự án laravel

```bash
composer create-project laravel/laravel Laravel-searchable-demo
```

Sau đó cd vào thư mục dự án và cài đặt laravel searchable bằng lệnh sau

```bash
composer require spatie/laravel-searchable
```

Trong project này mình sẽ tạo hai model phục vụ cho mục đích demo là category và product có mối quan hệ một nhiều. Mình sẽ tạo các file migration và model sử dụng các lệnh dưới đây:

```bash
php artisan make:model Product -m
php artisan make:model Category -m
```

Các câu lệnh trên sẽ sinh ra 2 file migration với tên có dạng là xxxxx_create_products_table.php và xxxxx_create_categories_table.php trong thư mục database\migrations và 2 file model là Product.php và Category.php trong thư mục app.

Chỉnh sửa nội dung các file migration của product và category như sau

- xxxxx_create_products_table.php

```php
Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('description');
            $table->string('image')->nullable();
            $table->bigInteger('category_id');
            $table->decimal('amount', 8, 2);
            $table->timestamps();
            $table->softDeletes();
        });
```

- xxxxx_create_categories_table.php

```php
Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('description');
            $table->timestamps();
 });
```

Sau đó chạy lệnh sau để tiến hành tạo table trong database

```bash
php artisan migrate
```

Và chỉnh sửa nội dung các file model Product.php và Category.php  như sau:

- Product.php

```php
<?php

namespace App;

use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Illuminate\Database\Eloquent\Model;

class Product extends Model implements Searchable
{

    protected $guarded = [];

    public function category(){
        return $this->belongsTo('App\Category');
    }

    public function getSearchResult(): SearchResult
    {
        $url = route('products.show', $this->id);

        return new SearchResult(
            $this,
            $this->name,
            $url
        );
    }
}
```

- Category.php

```php
<?php

namespace App;


use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Illuminate\Database\Eloquent\Model;

class Category extends Model implements Searchable
{

    protected $guarded = [];

    public function products(){
        return $this->hasMany('App\Gift');
    }

    public function getSearchResult(): SearchResult
    {
        $url = route('categories.show', $this->id);

        return new SearchResult(
            $this,
            $this->name,
            $url
        );
    }
}
```

$url ở đây là một biến string mình suwur dụng để lưu lại đường dẫn đến trang show của model hiện tại phục vụ cho việc đi tới trang detail của model sau này, bạn có thể không cần truyền url nếu không cần sử dụng.

## 2.2 Cấu hình cho Controller, Routes, và View
Tiếp theo, mình sẽ tạo chức năng hiển thị product và tìm kiếm.

Tạo controller

```bash
php artisan make:controller SearchController
```

Trong controller, tạo 2 action là index để hiển thị view và search để thực hiện chức năng tìm kiếm

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Searchable\Search;
use App\Http\Controllers\Controller;
use Spatie\Searchable\ModelSearchAspect;


class SearchController extends Controller
{
    /**
     * Display list of products
     *
     * @return view
     */
    public function index()
    {
        return view('search');
    }

    /**
     * search records in database and display  results
     * @param  Request $request
     * @return view
     */
    public function search(Request $request)
    {

        $searchterm = $request->input('query');

        $searchResults = (new Search())
            ->registerModel(\App\Product::class, ['name', 'description']) //apply search on field name and description
            //Config partial match or exactly match
            ->registerModel(\App\Category::class, function (ModelSearchAspect $modelSearchAspect) {
                $modelSearchAspect
                    ->addExactSearchableAttribute('name') // only return results that exactly match
                    ->addSearchableAttribute('description'); // return results for partial matches
            })
            ->perform($searchterm);

        return view('search', compact('searchResults', 'searchterm'));
    }
}
```

Ta có thể đăng ký các model sẽ được áp dụng search bằng phương thức `registerModel` với tham số thứ nhất là tên của model class và tham số thứ 2 là các thuộc tính sẽ được chỉ định để search, có thể đăng ký nhiều model bằng cách gọi nhiều lần hàm `registerModel` và cuối cùng truyền từ khóa để search vào phướng thức perform.

Ở đoạn code trên, khi sử dụng hàm `registerModel` như mình đã đăng ký cho model 'Product', mặc định cơ chế search sẽ là search *like*, còn trong trường hợp bạn muốn search chính xác thì có thể custome lại bằng cách sử dụng `ModelSearchAspect` như mình đã đăng ký cho thuộc tính `name` của model `Category`. Hiện tại laravel searchable chỉ hỗ trợ searh *like* và *exact match*

Tạo một file view có tên search.blade.php trong thư mục resources\views để hiển thị dữ liệu

`search.blade.php`

```html
<div class="container">
    <div class="row">
        <div class="col-md-10">
            <form method="get" action="{{ route('search.result') }}" class="form-inline mr-auto">
              <input type="text" name="query" value="{{ isset($searchterm) ? $searchterm : ''  }}" class="form-control col-sm-8"  placeholder="Search events or blog posts..." aria-label="Search">
              <button class="btn aqua-gradient btn-rounded btn-sm my-0 waves-effect waves-light" type="submit">Search</button>
            </form>
            <br>
            @if(isset($searchResults))
                @if ($searchResults-> isEmpty())
                    <h2>Sorry, no results found for the term <b>"{{ $searchterm }}"</b>.</h2>
                @else
                    <h2>There are {{ $searchResults->count() }} results for the term <b>"{{ $searchterm }}"</b></h2>
                    <hr />
                    @foreach($searchResults->groupByType() as $type => $modelSearchResults)
                    <h2>{{ $type }}</h2>

                    @foreach($modelSearchResults as $searchResult)
                        <ul>
                            <!-- Biến $url được cấu hình trong file model-->
                            <a href="{{ $searchResult->url }}">{{ $searchResult->title }}</a>
                        </ul>
                    @endforeach
                    @endforeach
                @endif
            @endif
        </div>
    </div>
</div>
```

Ở đây $searchResults là một instance của lớp SearchResultCollection, nếu bạn muốn tìm hiểu sâu hơn có thể tham khảo trong source code của thư viện tại [đây](https://github.com/spatie/laravel-searchable/tree/master/src)



Đăng ký route trong file web.php

```php
Route::get('search', 'SearchController@index')->name('search.index');
Route::get('search-results', 'SearchController@search')->name('search.result');
```

Bây giờ mình sẽ tạo dữ liệu mẫu như sau
 
Table categories
![](https://images.viblo.asia/718b272e-cfc5-42d6-92fe-8b6d5df4833a.png)

Table products
![](https://images.viblo.asia/b5ac7ff6-0970-4322-9999-b2a6ec8d4bb1.png)

 
Và kết quả
![](https://images.viblo.asia/156479cf-d016-44e3-8f11-37b34b1fd999.png)


# 3. Kết
Laravel Searchable gúp bạn giải quyết nhanh về chức năng search, thích hợp cho các dự án nhỏ chỉ yêu cầu về các chức năng search like và exact cho nhiều model.

Bạn có thể đóng góp thêm cho thư viện này tại đây https://github.com/spatie/laravel-searchable