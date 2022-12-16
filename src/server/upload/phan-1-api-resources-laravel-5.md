Chào các bạn,
Trong quá trình viết API, chắc ít nhất một lần ta cần transform dữ liệu để response về. Trong các trường này, có thể dùng các third-party, chẳng hạn: Fractal,... hoặc nếu response đơn giản thì dùng các class tự build. 

Các thao tác này tốn nhiều thời gian và đặc biệt không phải hàng "chính hãng" của Laravel. 

Vì vậy khi Laravel ra mắt tính năng trong version 5.5. Mình hết sức vui và hôm nay xin chia sẻ với các bạn trong bài viết này và các bài viết tiếp theo. 

Laravel Resource dựa trên tư tưởng của Fractal nên cũng không khó khăn khi tiếp cận. Để không mất thêm thời gian thì ta vào các bước sau đây nhé :)

## 1. Tạo project
- Chạy lệnh
```PHP
composer create-project laravel/laravel Laravel55Api
```
- Copy file .env.example sang .env
```PHP
php artisan key:generate
```
- Kiểm tra kết quả:
```PHP
php artisan serve
```
## 2. Tạo product resource
- API resource trong laravel 5.5 sẽ có chức năng transform dữ liệu model và model collection sang kiểu JSON. Ta tiến hành tạo product resource nhé !
```PHP
php artisan make:resource Product
```
- Kiểm tra resource bằng cách vào đường dẫn `app/Http/Resources`.
- Tiếp theo ta cần generate ra model, controller và migrations bằng command nhanh này nhé

```PHP
php artisan make:model Product -mc
```
- Mở file migrations, ta thêm các columns vào nhé

```PHP
public function up()
{
    Schema::create('products', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->integer('price');
        $table->timestamps();
    });
}
```
*Note: Ta luôn lưu `price` là kiểu integer nhé. Không lưu kiểu double.*
Tiến hành migrate vào db nhé :) 
(Để tiết kiệm thời gian thì các thao tác này các bạn tự làm nhé)

## 3. Giới thiệu product resource
- Ta đã có controller, model, migrations. Bây giờ ta tiến hành vào file product resources ( Đường dẫn đã giới thiệu ở trên)
- Như đã giới thiệu ở trên, Resource có chức năng transform model hoặc model collection sang kiểu json để response về. 
- Mở file ProductResource.php. Ta thấy có method `toArray()`, method sẽ return các attributes về kiểu Array để convert về JSON sau đó response về. 
- ok, bây giờ ta tiến hành thử nhé :)

```PHP
public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'price' => $this->price,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}
```
-> Response sẽ trả về bao gồm: Id, name, price, created_at, updated_at. Nếu ta không muốn response về thuộc tính nào thì chỉ cần remove thuộc tính trong method Array là xong.

## 4. Dùng product resource để transform dữ liệu.

Để dễ hình dung hơn thì ta wrap up các phần lại với nhau nhé :)
- Đầu tiên, để tiện cho việc show response từ resource thì ta dùng method show nhé 
```PHP
<?php

namespace App\Http\Controllers;

use App\Product;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function show ($id)
    {
        return new ProductResource(Product::find($id));
    }
}
```
- Define router cho method này trong api.php, đặt ở ngoài route middleware nhé 

```PHP
Route::get('/products/{id}', 'ProductController@show');
```
- Tiếp theo ta insert vào mẫu dữ liệu vào table products trong database nhé. Sau đó vào route này trên browser `http://127.0.0.1:8000/api/products/1`. Dữ liệu sẽ trả về như thế này:

![](https://images.viblo.asia/63788817-696f-4c21-9b32-9546558ae8b5.png)

- Đó chưa phải là tất cả. Giả sử ta price là thông tin private, sẽ không trả về trong API. Vậy lúc này ta chỉ cần remove thuộc tính này khỏi method toArray() (như đã giới thiệu ở trên)

![](https://images.viblo.asia/cf71e562-f8e2-4632-b092-183349cc0639.png)

- Giả sử ta cần thêm một thuộc tính gì đó vào response. Ta chỉ cần vào method toArray() thêm vào. 

```PHP
public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'test' => 'This is just a test', //Giả sử ta cần thêm thuộc tính test.
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}
```
-> Kết quả sẽ như thế này. 

![](https://images.viblo.asia/53550240-b9c3-4320-80ce-964cfed58cce.png)

- Giả sử ta cần ép kiểu dữ liệu.
-
```PHP
public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'test' => 'This is just a test',
        'created_at' => (string)$this->created_at,  //Ép kiểu string
        'updated_at' => (string)$this->updated_at, //Ép kiểu string
    ];
}
```
-> kết quả trả về: 
![](https://images.viblo.asia/7bae5d27-8f93-41f0-bf74-d52ee00387aa.png)

Trong bài viết này, mình đã giới thiệu các bạn các nét cơ bản của Resource Laravel. 
Trong bài viết tiếp theo, mình sẽ giới thiệu resource với pagination, resource collection, load rerource với các relationship và data wrapping. 
Cảm ơn các bạn nhé !