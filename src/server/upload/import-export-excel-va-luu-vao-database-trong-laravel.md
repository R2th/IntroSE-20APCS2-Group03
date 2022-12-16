# Giới thiệu
Trong hướng dẫn này, mình muốn chia sẻ với bạn cách import, export Excel hoặc file csv vào cơ sở dữ liệu trong khuôn khổ php laravel 5.7. mình sẽ chỉ cho bạn từng bước ví dụ về import csv hoặc file excel và export csv hoặc file excel bằng cách sử dụng `maatwebsite/excel` version 3 bằng composer package.

Chúng mình hầu như yêu cầu triển khai tệp excel hoặc csv tải lên dữ liệu vào bảng users, bảng product, v.v. vì nó giúp thêm nhiều bản ghi cùng một lúc. Vì vậy, nếu bạn đang làm việc trên dự án lớn thì bạn hầu như sẽ được yêu cầu tải lên dữ liệu sử dụng tệp csv. Bạn cũng cần cung cấp tính năng export tệp csv. Nếu bạn có yêu cầu tương tự thì hãy làm theo bài viết này và làm nó cho bạn.

Trong ví dụ này, chúng mình sẽ sử dụng gói trình soạn thảo maatwebsite/excel cho nhiệm vụ import và export. `maatwebsite/excel` cung cấp cách thức dễ dàng để import và export bằng database model. `maatwebsite/excel` đã uodate lên version 3 và chúng cung cấp cách tuyệt vời để import và export từ cơ sở dữ liệu, do đó trước tiên hãy làm theo một vài bước để lấy ví dụ.
![](https://images.viblo.asia/6f76882e-6916-4065-af49-2cbba4b71a7e.png)

# 1. Cài đặt project Laravel 5 (phiên bản hiện tại 5.7)
Trong bước đầu tiên, chúng mình sẽ cài đặt ứng dụng Laravel 5.7 sử dụng lệnh dưới đây, hãy mở terminal của bạn và chạy lệnh dưới đây:
```
composer create-project --prefer-dist laravel/laravel blog
```
# 2. Cài đặt Maatwebsite
Trong bước này, chúng ta cần phải cài đặt gói Maatwebsite thông qua Composer, sử dụng lệnh dưới đây:
```
composer require maatwebsite/excel
```
Bây giờ mở file config/app.php và thêm service provider cùng với aliase.

**config/app.php**
```php
'providers' => [

    ....

    Maatwebsite\Excel\ExcelServiceProvider::class,

],

'aliases' => [

    ....

    'Excel' => Maatwebsite\Excel\Facades\Excel::class,

],
```
Sau đó, bạn phải tạo tệp cấu hình publish bằng cách sử dụng lệnh sau:
```
php artisan vendor:publish
```
Nó sẽ tạo ra một tập tin cấu hình mới có tên là "config/excel.php".
# 3. Tạo bản ghi giả
Trong bước này, chúng ta tạo bảng "users" với một số bản ghi giả, chúng ta chỉ có thể import và export. Vì vậy, trước tiên bạn phải chạy migration mặc định được cung cấp bởi laravel bằng cách sử dụng lệnh sau:
```
php artisan migrate
```
Sau đó, chúng ta cần chạy lệnh sau để tạo ra người dùng giả:
```
php artisan tinker

factory(App\User::class, 20)->create();
```
# 4. Tạo route
Trong bước này, chúng ta cần tạo route của file import, export. Hãy mở file "routes / web.php" và thêm route sau.

**routes/web.php**
```php
Route::get('export', 'MyController@export')->name('export');
Route::get('importExportView', 'MyController@importExportView');
Route::post('import', 'MyController@import')->name('import');
```
# 5. Tạo Class Import
maatwebsite 3 cung cấp cách để xây dựng class import và chúng ta sử dụng trong controller. Vì vậy, cách tuyệt vời để tạo ra class import là bạn chạy lệnh sau và thay đổi file đó:
```
php artisan make:import UsersImport --model=User
```
**app/Imports/UsersImport.php**
```php
<?php
  
namespace App\Imports;
  
use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
  
class UsersImport implements ToModel
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
            'password' => \Hash::make('123456'),
        ]);
    }
}
```
# 6. Tạo Class Export
Chạy lệnh sau và thay đổi file export đó:
```
php artisan make:export UsersExport --model=User
```
**app/Exports/UsersExport.php**
```php
<?php
  
namespace App\Exports;
  
use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;
  
class UsersExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::all();
    }
}
```
# 7. Tạo controller
Ở bước này, bây giờ chúng ta sẽ tạo controller mới là MyController trong "app/Http/Controllers/MyController.php". Controller này sẽ quản lý tất cả importExportView, export and import sẽ gửi repuest và trả về response, vì vậy hãy đặt nội dung dưới đây trong file controller:
**app/Http/Controllers/MyController.php**
```php
<?php
   
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use App\Exports\UsersExport;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;
  
class MyController extends Controller
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function importExportView()
    {
       return view('import');
    }
   
    /**
    * @return \Illuminate\Support\Collection
    */
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
   
    /**
    * @return \Illuminate\Support\Collection
    */
    public function import() 
    {
        Excel::import(new UsersImport,request()->file('file'));
           
        return back();
    }
}
```
# 8. Tạo file view blade
Bước cuối cùng, hãy tạo file import.blade.php (resources/views/import.blade.php) có nội dung là:
**resources/views/import.blade.php**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Laravel 5.7 Import Export Excel to database Example - ItSolutionStuff.com</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
</head>
<body>
   
<div class="container">
    <div class="card bg-light mt-3">
        <div class="card-header">
            Laravel 5.7 Import Export Excel to database Example
        </div>
        <div class="card-body">
            <form action="{{ route('import') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <input type="file" name="file" class="form-control">
                <br>
                <button class="btn btn-success">Import User Data</button>
                <a class="btn btn-warning" href="{{ route('export') }}">Export User Data</a>
            </form>
        </div>
    </div>
</div>
   
</body>
</html>
```
Bây giờ bạn có thể kiểm tra ứng dụng Laravel 5.7 của mình.

Mình hy vọng bài viết này có thể giúp ích cho bạn trong quá trình làm dự án. Cám ơn các bạn rất nhiều!
# Tham khảo
https://itsolutionstuff.com/post/laravel-57-import-export-excel-to-database-exampleexample.html?fbclid=IwAR0tygy-sOxy77Yc6zALyYOBm_EcaCO1BRJ3qqWqi_Mlez6Nbd-IoiWMhUo