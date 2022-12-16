![](https://images.viblo.asia/b3740a4e-cbd2-4327-ad91-e3aaaf9bffba.jpg)
Chào các bạn !
Ở bài trước mình đã có chia sẽ với các bạn cách để export file PDF trong laravel, các bạn có thể xem lại tại [đây](https://viblo.asia/p/laravel-pdf-tao-va-tai-xuong-file-pdf-trong-laravel-57-Eb85oa9BZ2G).

Trong bài viết này, mình sẽ chia sẻ với bạn từng bước nhập excel hoặc csv để lưu trữ trong cơ sở dữ liệu và cách xuất hoặc tải xuống tệp excel hoặc csv từ cơ sở dữ liệu bằng gói maatwebsite version 3 trong laravel. Đã có nhiều thay đổi mới trong phiên bản 3 maatwebsite mới. Nó đã làm đơn giản hơn và dễ sử dụng với ứng dụng laravel để nhập dữ liệu xuất vào cơ sở dữ liệu. Maatwebsite cũng hoạt động với phiên bản laravel như 5.6, 5.7, 5.8.

Các gói Maatwebsite bạn có thể dễ dàng lấy dữ liệu, bạn cũng có thể nhóm theo dữ liệu v.v ... vì vậy bây giờ mình chỉ cho bạn ví dụ đơn giản về dữ liệu bảng, bạn có thể tải xuống dưới dạng xls, xlsx và csv và bạn cũng có thể nhập dữ liệu trong tệp định dạng xls, xlsx và csv.

### Nội Dung Chính
* Cài đặt dự án Laravel
* Cài package maatWebsite
* Tạo dự liệu mẫu dự án
* Config Route
* Tạo Controller
* Create Import Export Classes
* Tạo View blade
* Triển khai code
* Phần kết luận

## Install Laravel Fresh Project
Trước tiên đó là việc cài đặt framwork laravel version 5.7
```
composer create-project --prefer-dist laravel/laravel ImportExportLaravel
```
Sau khi cài đặt thành công laravel 5.7, Các bạn chuyển đến file .env của dự án và thiết lập thông tin xác thực cơ sở dữ liệu và di chuyển bước tiếp theo.

## Install Maatwebsite Package
Tiếp theo là việc cài đặt Maatwebsite
```
composer require maatwebsite/excel
```

Bây giờ các bạn di chuyển tới thứ mục config/app.php và config như code bên dưới
```
'providers' => [
  .......
  Maatwebsite\Excel\ExcelServiceProvider::class,
 
 ],  

'aliases' => [ 
  .......
  'Excel' => Maatwebsite\Excel\Facades\Excel::class,

], 
```

Sau khi đã cài đặt và config thành công, thì các bạn chạy câu lệnh bên dưới.
```
php artisan vendor:publish
```
Câu lệnh trên sẽ tạo ra 1 file config mới trong config/excel.php

## Add Fake Records in Database
Bây giờ chúng ta cần thêm các bản ghi giả trong cơ sở dữ liệu của mình, trước tiên các bạn chạy lệnh bên dưới để tạo ra các table mẫu trong db.
```
php artisan migrate
```
Nếu trong quá trình chạy lệnh mà có sinh ra lỗi, thì cũng đừng lo lắng các bạn hãy di chuyển vào app \ Providers \ AppServiceProvider.php. và thêm đoạn code như bên dưới.
```
use Illuminate\Support\Facades\Schema;
  
 public function boot()
 {
     Schema::defaultStringLength(191);
 } 
```
lệnh này sẽ tạo giá trị default cho độ dài của chuỗi

```
php artisan tinker 
>>>factory(App\User::class, 20)->create(); 
```

## Create Controller
Giờ là tạo 1 Controller để xử lý cho công việc, các bạn chạy câu lệnh bên dưới.
```
php artisan make:controller TestController
```

Sau khi chạy lệnh thì các bạn di chuyển vào app/Http/Controller sẽ thấy có 1 file TestController được sinh ra. Bây giờ các bạn hãy edit lại code bên trong như mình nhé.
```
<?php
    
namespace App\Http\Controllers;
   
use Illuminate\Http\Request;
use App\Exports\ExportUsers;
use App\Imports\ImportUsers;
use Maatwebsite\Excel\Facades\Excel;
   
class TestController extends Controller
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function importExport()
    {
       return view('import');
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function export() 
    {
        return Excel::download(new ExportUsers, 'users.xlsx');
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function import() 
    {
        Excel::import(new ImportUsers, request()->file('file'));
            
        return back();
    }
}
```

## Add Route
Tiếp theo các bạn di chuyển tới file web.php để tạo route điều hướng.
```
Route::get('import-export', 'TestController@importExport');
Route::post('import', 'TestController@import');
Route::get('export', 'TestController@export');
```
Ở đây mình chỉ tạo ra 1 project demo cơ bản, chủ yếu là để đạt được mục đích sử dụng packsge maatwebsite cho việc export, import file excel và csv, nên mình chỉ tạo ra các file đơn giản nhé.
## Create Model
Tiếp theo các bạn chạy câu lênhj bên dưới để tạo ra 1 model.
```
php artisan make:import ImportUsers --model=User
```
Sau đó bạn thêm đoạn code như bên dưới.
```
<?php
   
namespace App\Imports;
   
use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
   
class ImportUsers implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new User([
            'name'     => $row[0],
            'email'    => $row[1], 
        ]);
    }
}
```

## Create Export Class
Tiếp theo chúng ta tạo 1 model export.
```
php artisan make:export ExportUsers --model=User
```
Và thêm đoạn code như bên dưới.
```
<?php
   
namespace App\Exports;
   
use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;
   
class ExportUsers implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::get();
    }
}
```

## Create Blade File
Bây giờ các bạn vào file views và tạo ra 1 file view.blade.php như bên dưới.
```
<!DOCTYPE html>
<html>
<head>
    <title>Laravel 5.7 Import Export Excel to database</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
</head>
<body>
    
<div class="container">
    <div class="card mt-4">
        <div class="card-header">
            Laravel 5.7 Import Export Excel to database
        </div>
        <div class="card-body">
            <form action="{{ url('import') }}" method="POST" name="importform" 
               enctype="multipart/form-data">
                {{ csrf_token() }}
                <input type="file" name="file" class="form-control">
                <br>
                <a class="btn btn-info" href="{{ url('export') }}"> 
                 Export File</a>
                <button class="btn btn-success">Import File</button>
            </form>
        </div>
    </div>
</div>
    
</body>
</html>
```

## Start Development Server
Đây là dai đoạn cuối cùng đây : các bạn có thể chạy câu lệnh bên dưới để bật server :
```
php artisan serve

nếu dự án của bạn ko phải cổng 80, thì các bạn có thể thêm tùy chọn như bên dưới

php artisan serve --port=8080  
```

Bây giờ các bạn có thể test thử chương trình trên url nhé :
```
http://localhost:8000/import-export

Or direct hit in your browser

http://localhost/ImportExportLaravel /public/import-export
```

## Phần kết luận
Trong bài viết này, mình đã hướng dẫn xong các bạn nhập dữ liệu excel vào cơ sở dữ liệu bằng gói maatwebsite. 
Các bạn hoàn toàn có thể sử dụng maatwebsite để import, export với các định dạng xls, xlsx và csv và bạn cũng có thể nhập dữ liệu trong tệp định dạng xls, xlsx và csv.

Nếu bạn có bất kỳ câu hỏi hoặc suy nghĩ nào để chia sẻ, và bình luận bên dưới nhé.