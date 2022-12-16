# Giới thiệu
Với các bạn làm dự án mà yêu cầu chạy trên môi trường `web` và `app` ..., để đồng bộ hóa dữ liệu thì chúng ta sẽ cần xây dựng `Api` cho dự án của mình, bài viết này mình sẽ hướng dẫn mọi người xây dựng `API` đúng chuẩn `RESTful` với `framework Laravel` version 5.7, vì sử dụng framework Laravel nên mọi người nên tìm hiểu cơ bản về laravel trước khi đọc bài viết.
# HTTP Request
Để bắt đầu xây dựng API đầu tiền chúng ta sẽ đi tìm hiểu qua về HTTP request,  HTTP request có tất cả 9 loại method , 2 loại được sử dụng phổ biến nhất là GET và POST

> 1. GET: được sử dụng để lấy thông tin từ sever theo URI đã cung cấp.
> 2. HEAD: giống với GET nhưng response trả về không có body, chỉ có header
> 3. POST: gửi thông tin tới sever thông qua các biểu mẫu http (đăng kí chả hạn ...)
> 4. PUT: ghi đè tất cả thông tin của đối tượng với những gì được gửi lên
> 5. PATCH: ghi đè các thông tin được thay đổi của đối tượng.
> 6. DELETE: xóa tài nguyên trên server.
> 7. CONNECT: thiết lập một kết nối tới server theo URI.
> 8. OPTIONS: mô tả các tùy chọn giao tiếp cho resource.
> 9. TRACE: thực hiện một bài test loop - back theo đường dẫn đến resource.
# Router RESTful
**Phía trên mình đã giới thiệu qua về các method của `HTTP request`, giờ sẽ đi áp dụng vào `router` của `laravel`.**

Viết Api thì mọi người sẽ khai báo router vào file `routes/api.php` thay vì sử dụng file `routes/web.php`.

Mình sẽ giải thích qua về các setting mặc định cho file `api.php` trong laravel 1 chút
- Url: những `router` được khai báo trong file này mặc định có `prefix url` là api (ví dụ: viblo.asia/api/products)
- Middleware: mặc định sẽ được gán `Middleware Group` là `api`, tìm trong file `app/Http/Kernel` sẽ thấy  2 `middleware` thuộc `Middleware Group: api` là `throttle` (giới hạn request / time) và `bindings` (model binding).

Mọi người có thể tùy chỉnh giá trị mặc định này trong method `mapApiRoutes` trong file `app/Providers/RouteServiceProvider.php`

Tiếp theo để thực hiện các thao tác đơn giản như `CRUD` (Create, Read, Update, Delete) mình sẽ tạo các `router`
```php
// Lấy danh sách sản phẩm
Route::get('products', 'Api\ProductController@index')->name('products.index');

// Lấy thông tin sản phẩm theo id
Route::get('products/{id}', 'Api\ProductController@show')->name('products.show');

// Thêm sản phẩm mới
Route::post('products', 'Api\ProductController@store')->name('products.store');

// Cập nhật thông tin sản phẩm theo id
# Sử dụng put nếu cập nhật toàn bộ các trường
Route::put('products/{id}', 'Api\ProductController@update')->name('products.update');
# Sử dụng patch nếu cập nhật 1 vài trường
Route::patch('products/{id}', 'Api\ProductController@update')->name('products.update');

// Xóa sản phẩm theo id
Route::delete('products/{id}', 'Api\ProductController@destroy')->name('products.destroy');
```

Mặc định `router` đã được gán `middleware bindings`, nếu muốn sử dụng `model binding` trong `controller` thì chúng ta sửa lại tham số trong `router` như sau:
```php
Route::get('products/{product}', 'Api\ProductController@show')->name('products.show');

Route::put('products/{product}', 'Api\ProductController@update')->name('products.update');

Route::patch('products/{product}', 'Api\ProductController@update')->name('products.update');

Route::delete('products/{product}', 'Api\ProductController@destroy')->name('products.destroy');
```


Ngoài ra trong laravel cũng hỗ trợ chúng ta 1 cách khai báo ngắn gọn hơn
```php
Route::apiResource('products', 'Api\ProductController');
```

Nếu không muốn sử dụng toàn bộ `method` trong `apiResource` mọi người có thể chỉ định sử dụng 1 vài `method` bằng hàm `only`
```php
Route::apiResource('products', 'Api\ProductController')->only(['index', 'show']);
```
Hoặc nếu muốn loại bỏ đi 1 số method không dùng thì có thể sử dụng hàm  `except`
```php
Route::apiResource('products', 'Api\ProductController')->except(['show', 'update']);
```

# Resource Controllers
**Tương ứng với các `Router RESTful` ở phía trên, đặc biệt nếu mọi người dùng method `apiResource` thì  `laravel` cũng hỗ trợ chúng ta các `method` xử lí tương ứng trong `controller`**

Để tạo ra Resource Controllers chúng ta chạy lệnh sau
```
php artisan make:controller Api/ProductController --api
```
FIle ProductController tạo ra sẽ như sau 
```php
<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
```
Ngoài ra nếu muốn sử dụng `model binding` khi tạo `Resource Controllers` thì dùng lệnh bên dưới
```
php artisan make:controller Api/ProductController --api --model=Models/Product
```
FIle `ProductController` tạo ra sẽ như sau, mọi người để ý tham số của các phương thức `show`, `update`, `destroy` sẽ thay đổi 1 chút
```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
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
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
```
**Phía dưới mình có demo 1 đoạn code đơn giản trong `controller` kết hợp với `model binding` và `route apiResource` khi xây dựng API**
```php
 <?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Product[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Product|\Illuminate\Database\Eloquent\Model
     */
    public function store(Request $request)
    {
        return Product::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return Product
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Product $product
     * @return bool
     */
    public function update(Request $request, Product $product)
    {
        return $product->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @throws \Exception
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }
}
```
**Mặc định khi sử dụng `router apiResource` thì dữ liệu trả về sẽ tự động được chuyển sang kiểu `JSON` và sẽ có `status` tương ứng nên mọi người chỉ cần `return` dữ liệu ra là ok, còn nếu muốn tùy biến `status` trả về thì có thể tham khảo cách phía dưới của mình, phía dưới mình có sử dụng `class Illuminate\Http\Response` để lấy status thay vì fix giá trị vào ví dụ như HTTP_OK tương ứng sẽ là 200**
```php
<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::all();

        return response()->json($products, Response::HTTP_OK);
    }
}
```

# Eloquent Resources
Khi xây dựng API, bạn có thể cần `transform` dữ liệu từ controller trước khi trả về cho người dùng ứng dụng của bạn, laravel cũng đã hỗ trợ điều này với `Eloquent Resources`

Để tạo ra 1 class chuyển đổi chúng ta chạy lệnh sau

```
php artisan make:resource Product
```

File app/Http/Resources/Product.php sẽ có nội dung như sau
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
```

Mình sẽ tùy chỉnh dữ liệu trả về là chỉ có `title` và `price`
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'title' => $this->title,
            'price' => $this->price,
        ];
    }
}
```

Ở controller thì mình sẽ sửa lại như sau
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\Product as ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Product[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        $products = Product::all();
    
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Product|\Illuminate\Database\Eloquent\Model
     */
    public function store(Request $request)
    {
        $product = Product::create($request->all());

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return Product
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Product $product
     * @return bool
     */
    public function update(Request $request, Product $product)
    {
        return $product->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @throws \Exception
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }
}
```
**Ngoài giới hạn dữ liệu trả về như `title` hay `price`, laravel cũng hỗ trợ rất nhiều thứ như thêm relationships, data ..., mọi người có thể đọc thêm tại đây https://laravel.com/docs/5.7/eloquent-resources**
# Ý nghĩa response status trong HTTP
* 200: Ok. Mã cơ bản có ý nghĩa là thành công trong hoạt động.
* 201: Đối tượng được tạo, được dùng trong hàm store.
* 204: Không có nội dung trả về. Hoàn thành hoạt động nhưng sẽ không trả về nội dung gì.
* 206: Trả lại một phần nội dung, dùng khi sử dụng phân trang.
* 400: Lỗi. Đây là lỗi cơ bản khi không vượt qua được xác nhận yêu cầu từ server.
* 401: Unauthorized. Lỗi do yêu cầu authen.
* 403: Forbidden. Lỗi này người dùng vượt qua authen, nhưng không có quyền truy cập.
* 404: Not found. Không tìm thấy yêu cầu tương tứng.
* 500: Internal server error.
* 503: Service unavailable.
# Authorization
Hiện tại có 3 cơ chế Authorize chính:

* HTTP Basic
* JSON Web Token (JWT)
* OAuth2

Tùy thuộc vào service của bạn, mà hãy chọn loại Authorize có mức độ phù hợp, cố gắng giữ nó càng đơn giản càng tốt.
# API Document
Ai cũng biết việc viết API docs là cần thiết, tuy nhiên để có một API docs hoàn chỉnh cũng tiêu tốn kha khá thời gian. Nhất là trong lúc dự án gấp rút thì mọi người thường chỉ để API docs ở mức ... dùng được case chính.

API document là một phần tương tự như Unit Test vậy - lấy ngắn để nuôi dài.

Nếu không được chăm sóc kỹ, thì đến lúc maintain hoặc thay đổi spec thì hậu quả sẽ rất thảm khốc, dưới đây là một số lưu ý lúc viết docs:

* Mô tả đầy đủ về params request: gồm những params nào, datatype, require hay optional.
* Nên đưa ra các ví dụ về HTTP requests và responses với data chuẩn.
* Cập nhật Docs thường xuyên, để sát nhất với API có bất cứ thay đổi gì.
* Format, cú pháp cần phải nhất quán, mô tả rõ ràng, chính xác.
# Tài liệu tham khảo
* https://laravel.com/docs/5.7/routing
* https://laravel.com/docs/5.7/eloquent-resources
* https://laravel.com/docs/5.7/controllers