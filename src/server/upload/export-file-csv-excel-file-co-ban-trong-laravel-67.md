# Cài đặt
Việc đầu tiên là bạn phải đi cài đặt cho mình một project laravel. Các bước cơ bản này mình sẽ không nhắc lại nữa nhé. Nếu bạn vẫn thấy bỡ ngỡ thì có thể lên trang chủ của laravel để tìm cách cài đặt nhé, mới nhất đang là bản `7`. rồi: https://laravel.com/docs/7.x/installation

Để xuất file csv hoặc excel trong laravel sẽ dùng đến một thư viện đó là `maatwebsite/excel`  
Sử dụng câu lệnh sau để cài đặt:
> composer require maatwebsite/excel
> 
Mặc định `Maatwebsite\Excel\ExcelServiceProvider` sẽ được tự động đăng ký theo mặc định. Tương tự với Excel facade `Maatwebsite\Excel\Facades\Excel` .

Publish config
> php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider
> 
Và bây giờ nếu bạn muốn thay đổi config của thư viện này thì nó nằm trong file `config/excel.php`.
# Xây dựng xuất file với laravel
Mình sẽ đặt ra một bài toán cơ bản là xuất thông tin của các sản phẩm (product) ra thành file csv/ excel. Sản phẩm sẽ gồm tên sản phẩm, số lượng sản phẩm, như vậy thôi cho nhanh nhé. Giờ cùng bắt tay đi thực hiện nào.
## Tạo migration và model
Mình cần tạo migration và model product để xuất dữ liệu.
> php artisan make:model Product -m

câu lệnh này sẽ đồng thời tạo một model class là `Product` và một file migration `[timestamp].create_products_table.php` trong thư mục `database/migrations`.

Thêm một vài thông tin cho migration của chúng ta
```
public function up()
{
    Schema::create('products', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->string('name');
        $table->integer('quantity');
        $table->timestamps();
    });
}
```
Chạy migrate với câu lệnh
> php artisan migrate
> 

**Bây giờ mình sẽ giả sử là trong bảng products đã có dữ liệu rồi, chúng ra sẽ đi xuất dữ liệu từ bảng products này**
## Controller và route
Tạo file ProductController.php trong thư mục Controller, đây sẽ là nơi thực hiện các bước export file trả về cho người dùng.
> php artisan make:controller ProductController
> 
Nhớ rằng tạo route đễ điều hướng dẫn đến controller vừa tạo nhé
```web.php
Route::get('products', 'ProductController@index')->name('product.index');
Route::post('products/exportFile', 'ProductController@exportFile')->name('product.export-file');
```
Quay trở lại với controller. Tạo hai method `index` và `exportFile` trong ProductController
``` ProductController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    public function index()
    {
        // TO DO
    }

    public function exportFile()
    {
        // TO DO
    }
}
```
## Tạo view để hiển thị data
Giờ mình cần thiết kế một cái view, gồm có bảng products để hiển thị cho người dùng thấy các bản ghi trong products, và một cái nút khi nhấn vào sẽ gọi đến phần exportFile và xuất file cho người dùng.

Trước hết, cần chỉnh lại controller để khi người dùng gọi đến đường dẫn `/products` thì sẽ trả về cái view với dữ liệu là toàn bộ `products` cho chúng ta. Sửa lại hàm index của cotroller như dưới đây.
```
public function index()
{
    $products = Product::all();

    return view('products.index', compact('products'));
}
```
Lấy ra toàn bộ các products và truyền xuống view `views/products/index.blade.php`

```views/products/index.blade.php
<a href="{{ action('ProductController@exportFile') }}">Export File</a>
<table class="table table-striped">
  <thead>
    <th>ID</th>
    <th>Name</th>
    <th>Quantity</th>
  </thead>
  <tbody>
    @foreach($products as $product)
    <tr>
      <td>{{$product->id}}</td>
      <td>{{$product->name}}</td>
      <td>{{$product->quantity}}</td>
    </tr>
    @endforeach
  </tbody>
</table>
```

Như bạn có thể thấy thẻ `<a>` chính là nơi mình click để export file.
## Tạo Export class
Mình sẽ mô tả sơ qua một chút rồi mới đi thực hiện nhé. Mình cần đến một cái model, không phải laravel model đâu mà nó sẽ định nghĩa ra một collection, collection này chính là kết quả query từ db và toàn bộ những dữ liệu đó sẽ được xuất xuống file. Bắt tay vào làm là bạn sẽ hiểu ngay thôi.

> php artisan make:export ProductExport --model=Product
> 
Sau khi chạy xong câu lệnh này sẽ có một file với đường dẫn `app/Exports/ProductExport.php`
```app/Exports/ProductExport.php
<?php

namespace App\Exports;

use App\Product;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProductExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Disneyplus::all();
    }
}
```

Nhìn trên đây bạn cũng hiểu, nếu bạn không muốn in ra tất cả các bản ghi mà chỉ chọn một số bản ghi theo điều kiện thì chỉnh ở hàm collection phía trên nhé.
## Export File.
Phần chuẩn bị đã xong, mình sang phần export file nhé.
Quay lại controller. Cập nhật hàm `exportFile` như sau
```
public function export() 
{
    return Excel::download(new DisneyplusExport, 'disney.xlsx');
}
```
Nhớ use thêm `Maatwebsite\Excel\Facades\Excel;` ở controller nữa nhé.  
Đơn giản như vậy thôi khi click vào link là bạn đã có thể export file rồi.  
Ngoài ra bạn có thể export file csv như sau:
```
 return Excel::download(new DisneyplusExport, 'disney.csv');
```
Và hàng loạt các định dạng khác được thư viện này hỗ trợ, tìm hiểu thêm ở: https://docs.laravel-excel.com/3.1/exports/export-formats.html.

# Kết luận
## Tài liệu tham khảo
> https://appdividend.com/2019/09/13/how-to-import-and-export-data-in-csv-excel-in-laravel-6/
> 
Chúc bạn thực hiện thành công nhé.