# Giới thiệu
- API (Application Programming Interface) là một giao diện mà một hệ thống máy tính hay ứng dụng cung cấp để cho các yêu cầu dịch vụ có thể được tạo ra từ các chương trình máy tính khác và cho phép dữ liệu có thể được trao đổi qua lại giữa chúng thông qua các phương thức `GET`, `POST`, `PUT`, `DELETE`, `PATCH`.
-  Khi khi dựng một API, bạn cần chuyển đổi dữ liệu Eloquent model và JSON được trả về bởi ứng dụng của người dùng. Lớp Laravel resource cho phép bạn chuyển đổi dễ dàng giửa model và model  collection trong JSON.
# Tạo Resource
- Để tạo một lớp resorce, bạn có thể sử dụng cửa sổ lệnh Artisan VD:  `php artisan make:resource Product`.
-  Mặc định, resource sẽ được sinh ra trong thư mục `app/Http/Resource` trong project của bạn. Resource sử dụng lớp `Illuminate\Http\Resource\Json\JsonResource`.
##  Resource Collections
- Ngoài việc tạo resource và chuyển đổi models, resource có thể chuyển đổi các collection của model. Điều này cho phép dữ liệu trả về bao gồm các liên kết liên quan đến collection của resource.
- Để tạo một resource collection, bạn nên sử dụng tham số `--collection` ở cuối câu lệnh tạo resource. Hoặc có thể thể thêm hậu tố `Collection` sau tên resource, collection resource sử dụng lớp `Illuminate\Http\Resource\Json\ResourceCollection`.
```bash
php artisan make:resource Products --collection
php artisan make:resource ProductCollection
```
# Lớp JsonResource
- Một lớp resource đại diện cho một model cần được chuyển đổi trong một cấu trúc JSON.
- Tạo lớp resource Product  `php artisan make:resource Product`
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
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
```
- Mỗi một lớp resource định nghĩa sẵn phương thức `toArray` trả về một mảng thuộc tính của đối tượng nên được chuyển đổi thành JSON khi gửi phản hổi response.
- Chúng ta có thể truy cập thuộc tính của model thông biến `$this`.
```php
use App\Http\Resources\Product as ProductResource;
use App\Models\Product;

Route::get('/product', function () {
    return new ProductResource(Product::find(1));
});
```
# Resource Collections
- Nếu bạn muốn trả về một collection của resource hoặc một paginate, bạn có thể sử dụng phương thức collection khi tạo một thể hiện resource trong route hoặc controller.
```php
use App\Http\Resources\Product as ProductResource;
use App\Models\Product;

Route::get('/products', function () {
    return ProductResource::collection(Product::all());
});
```
- Chú ý VD trên không cho phép bổ sung dữ liệu nào khi được trả về với collection. Nếu muốn bổ sung resource, bạn cần tạo một Collection
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'links' => [
                'self' => 'link-value',
            ],
        ];
    }
}
```
- Sau khi định nghĩa resource collection, nó có thể được gọi ở route hoặc controller.
```php
use App\Http\Resources\ProductCollection;
use App\Models\Product;

Route::get('/products', function () {
    return new ProductCollection(User::all());
});
```
- Khi trả về resource collection từ một route.
- Thuộc tính `$preserveKey` cho phép bạn biết các khóa collection có được giữ nguyên không `public $preserveKeys = true;`
- Thuộc tính `$collects` cho phép bạn thay đổi mapping mặc định của Collection
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * The resource that this resource collects.
     *
     * @var string
     */
    public $collects = 'App\Http\Resources\Member';
}
```
# Tài liệu tham khảo
- [Eloquent: API Resources](https://laravel.com/docs/6.x/eloquent-resources)