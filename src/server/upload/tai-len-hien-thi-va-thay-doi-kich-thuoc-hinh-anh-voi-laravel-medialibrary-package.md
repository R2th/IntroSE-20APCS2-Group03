Trong bài viết này, chúng ta sẽ tìm hiểu một thư viện laravel media nổi tiếng được phát triển bởi Spatie. Package này có thể liên kết tất cả các loại tệp với các Eloquent Models của bạn.
> Vì vậy, nếu bạn đang muốn đặt ảnh đại diện cho người dùng, một tập các hình ảnh cho bài viết trên blog hay hình ảnh cho sản phẩm của bạn trong các site bán hàng. Package này sẽ có ích đấy!

Áp dụng thực tế vào một dự án website bán hàng, chúng ta sẽ sử dụng package ở trên để thêm các hình ảnh cho sản phẩm.

Trước khi chúng ta bắt đầu, hãy chắc rằng bạn đã biết cách để:

* Cài đặt một Laravel Project 
* Kết nối Project đó với database

# I. Chuẩn bị
Cài đặt một project Laravel và tạo một `Model `có tên là `Product`. Sử dụng command sau:
```
php artisan make:model Product -mr
```
 Kết quả thu được:
 
 * `Product.php` (model file)
 * `ProductController.php` (resource controller)
 * `create_product_table.php` (migration file)
 
 Thêm các trường `name` và `description`  vào bảng **product**.  Chỉnh sửa file migration như sau:

 ```PHP
 Schema::create('products', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->string('name');
    $table->string('description');
    $table->timestamps();
});
```
Trong phần chuẩn bị, mình cũng đã tạo 1 giao diện đơn giản để có thể nhập các thông tin và tạo mới một sản phẩm. Các bạn có thể tham khảo:
![](https://images.viblo.asia/1ce550e5-7c13-478e-93a2-17be81fa3aa5.png)

Trong phần tiếp theo, chúng ta sẽ đi đến bước cài đặt package **media-library**
# II. Cài đặt package
Để cài đặt package, bạn truy cập vào thư mục gốc chứa dự án qua terminal / command-line và chạy lệnh sau:
```PHP
composer require "spatie/laravel-medialibrary:^7.0.0"
```

Phiên bản mới nhất của **laravel-medialibrary** hiện tại đang là 7.0.

![](https://images.viblo.asia/18bbd63b-2746-472a-a30f-86f56aa2a733.png)

Khi package đã được cài đặt xong, chạy lệnh sau để copy file migration của package vào thư mục dự án. Sau đó chạy lệnh update lại migration.
```PHP
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="migrations"

php artisan migrate
```
![](https://images.viblo.asia/55be416c-ed31-43eb-8c80-35366fa5f69e.png)

Khi bạn chạy lệnh này, migration sẽ tạo một bảng mới trong database có tên là `media`, đây là nơi mà các thông tin về tập tin media sẽ được lưu trữ.

![](https://images.viblo.asia/c99bb568-25dc-45be-a520-c4a57b386bba.png)

Vậy là chúng ta đã cài đặt thành công package, bước tiếp theo chúng ta sẽ thay đổi một vài thứ trong Model class để có thể sử dụng các API của package.

# III. Chỉnh sửa Model Product
Để có thể sử dụng được các phương thức API của package. Chúng ta phải chỉnh sửa Model class `Product.php` như sau:
```PHP
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Product extends Model implements HasMedia
{

    use HasMediaTrait;

}
```

Có 2 thay đổi với model `Product`:

* Product model đã được implement các phương thức của interface `hasMedia `
* Product model bây giờ có thể sử dụng được `HasMediaTrait`

# IV. Tải lên, hiển thị và thay đổi kích thước hình ảnh
## 1. Tải lên
Sử dụng phương thức `addMedia` cung cấp bởi package.

Dưới đây là cách ảnh được lưu sau khi một sản phẩm mới được tạo:

```PHP
public function store(Request $request)
    {
        //Populate model
        $product = new Product($request->except(['image']));
        
        $product->save();

        //Store Image
        if($request->hasFile('image') && $request->file('image')->isValid()){
            $product->addMediaFromRequest('image')->toMediaCollection('images');
        }

        return redirect("/products/{$product->id}")->with('success', 'New Gift Added !');
    }
```
Vừa rồi, chúng ta sử dụng phương thức `addMediaFromRequest` để thêm một bức ảnh vào collection có tên `images`
File được upload sẽ được lưu tại thư mục **storage > app > public**.
Ngoài ra, có thể sử dụng một số phương thức khác như:
* `addMedia($file)`
* `addMediaFromUrl(string $url)`
* `addMediaFromRequest(string $keyName)`
* `addMultipleMediaFromRequest `

Có thể xem thêm tại:
https://docs.spatie.be/laravel-medialibrary/v7/api/adding-files/
## 2. Truy xuất và hiển thị lên trang
Tiếp theo, chúng ta sẽ lấy ra và hiển thị hình ảnh lên trang web. `mediaLibrary` cung cấp nhiều API khác nhau để lấy dữ liệu cái file media liên kết với Model. Ví dụ, lấy địa chỉ URL của hình ảnh sử dụng **getFirstMediaUrl();**
```PHP
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Product Details</div>

                <div class="card-body">
                     Product Name:  {{$product->name}} <br/><br/>

                     Product Description : {{$product->description}} <br/><br/>


                     Image: <img src="{{$product->getFirstMediaUrl('images')}}" />
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```
Chúng ta đã lấy đc URL hình ảnh của sản phẩm bằng **$product->getFirstMediaUrl** .

Tham khảo thêm tại: https://docs.spatie.be/laravel-medialibrary/v7/basic-usage/retrieving-media/

Lưu ý là để có thể hiển thị file trên trình duyệt thì bạn phải public các files được lưu trong thư mục storage. Chạy lệnh sau:
```
php artisan storage:link
```
## 3. Thay đổi kích thước
Khi bạn tải lên một hình ảnh, bạn mong muốn thay đổi kích thước của nó để hiển thị như một ảnh thu nhỏ hay bất kì kích thước nào. Package này cung cấp một cách đơn giản để thực hiện điều đó.

Bạn thêm một phương thức có tên **registerMediaConversions** vào Model và thêm các loại kích thước cho hình ảnh.

Ví dụ như:
```PHP
<?php

namespace App;

use Spatie\MediaLibrary\Models\Media;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Product extends Model implements HasMedia
{

    use HasMediaTrait;

    protected $guarded = [];

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('thumb')
              ->width(200)
              ->height(200)
              ->sharpen(10);

        $this->addMediaConversion('square')
              ->width(412)
              ->height(412)
              ->sharpen(10);
    }
}
```
Khi hình ảnh được tải lên, nó sẽ được lưu trong thư mục **conversions**

![](https://images.viblo.asia/e68c77d7-658d-4983-a270-e5aea7f9fbb6.png)

 Lấy URL của ảnh đã thay đổi kích thước qua getFirstMediaUrl method **->getFirstMediaUrl('images', 'thumb');**
 
 Ví dụ, lấy url của thumb image:
 
 ```PHP
<img src="{{$product->getFirstMediaUrl('images', 'thumb')}}" />
```

![](https://images.viblo.asia/45bfd051-5c07-4bde-aec4-c9a5dd18b454.png)

Trên đây là toàn bộ những gì về tải lên, truy xuất và thay đổi kích thước hình ảnh với Spatie medialibrary packgae. Cảm ơn các bạn đã đọc :grinning::grinning::grinning: