Chào tất cả mọi người nha, vậy là mình đã trở lại đầy nguy hiểm sau khoảng thời gian ăn tết hơi dài rồi ạ.<br>
Và để tiếp tục câu chuyện của ngày hôm nay thì mình sẽ chia sẻ với các bạn về một package cực kỳ hữu ích trong việc export cũng như import file trong framework laravel - **Laravel Excel**.<br>
Và để không mất thời gian của các bạn mình sẽ phi vào câu chuyện ngay bây giờ :) <br>
# Giới thiệu
Laravel Excel là một trình bao bọc đơn giản nhưng thanh lịch xung quanh PhpSpreadsheet với mục tiêu đơn giản hóa việc export cũng như import file.<br>
Và đây là PhpSpreadsheet cho những bạn đang thắc mắc và tự hỏi về nó :)<br>
PhpSpreadsheet là một thư viện được viết bằng PHP thuần túy và cung cấp một tập hợp các lớp cho phép bạn đọc và ghi vào các định dạng tệp bảng tính khác nhau, như Excel và LibreOffice Calc.
## Các chức năng của Laravel Excel
* Dễ dàng xuất các bộ sưu tập sang Excel.
* Xuất truy vấn với chunking tự động cho hiệu suất tốt hơn.
* Xuất khẩu hàng đợi cho hiệu suất tốt hơn.
* Dễ dàng xuất các chế độ xem Blade sang Excel.
* Dễ dàng nhập vào bộ sưu tập.
* Đọc tệp Excel trong khối.
* Xử lý các chèn nhập theo từng batch.

## Cài đặt 
Để cài đặt Laravel Excel thì các bạn cần phải có các yêu cầu sau:
* PHP: `7.0`
* Laravel: `5.5`
* PhpSpreadsheet: `1.6`
* Các PHP extension là `php_zip, php_xml, php_gd2` đã được enabled

Sau khi đã có đủ các yêu cầu trên thì cá bạn cần cài đặt package này vào file composer.json của laravel project bằng cách mở terminal lên và chưởng câu này vào.
```
composer require maatwebsite/excel
```
Lúc này `Maatwebsite\Excel\ExcelServiceProvider` sẽ tự động được đăng ký cho bạn. Tuy nhiên, nếu bạn muốn tự đăng ký thì có thể thêm đoạn này vào file `config/app.php`<br>
```php
// Ở mục providers thêm dòng này.
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]
   // Ở mục aliases thêm dòng này.
    'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
 ]
```
# Sử dụng
## Export
Đầu tiên bạn cần tạo một export class trong thư mục `App/Export`. Hoặc có thể sử dụng command sau để tạo tự động: <br>
```
php artisan make:export ExportName --model=ModelExportName
```
Lúc này trong thư mục `App/Exports` sẽ có file của bạn vừa tạo ra. Cụ thể ở đây mình chạy lệnh `php artisan make:export UsersExport --model=User` nên sẽ có cấu trúc thư mục như thế này.<br>
```
├── app
│   ├── Exports
│   │   ├── UsersExport.php
│ 
└── composer.json
```
Lúc này file `UsersExport.php` của bạn sẽ như sau.
```php
<?php

namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    public function collection()
    {
        return User::all();
    }
}
```
Bây giờ, bạn chỉ việc gọi class export đã tạo ở trên `return Excel::download(new UsersExport, 'users.xlsx');` để export model User của bạn ra file users.xlsx.<br>
Cuối cùng là thêm một đường dẫn để truy cập khi cần export nữa là tuyệt vời. Các bạn có thể tham khảo ở ví dụ bên dưới nhé.<br>
```php
// UserController
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;

class UsersController extends Controller 
{
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
// Route
Route::get('users/export/', 'UsersController@export');
```
Sau khi làm xong những việc trên thì các bạn chỉ cần chạy command `php artisan serve` rồi vào đường dẫn `your-local-host:8000/users/export` để xem và cảm nhận :)<br>
## Import

Tương tự như lúc export, để có thể import được thì các bạn cũng cần phải tạo một import class trong thư mục `App/Imports`, còn việc tạo bằng sức cơm hay thông qua command `php artisan make:import ImportName --model=ModelImportName` thì mọi người tự quyết định nha.<br>
Sau khi tạo xong thì cấu trúc thư mục của bạn sẽ như vậy.
```
├── app
│   ├── Imports
│   │   ├── UsersImport.php
│ 
└── composer.json
```
Bây giờ hãy mở file `UsersImport.php` vừa tạo ở trên ra và thêm đoạn code phía dưới vào để thực hiện việc tạo User mới với mỗi row data mà chúng ta đã import được.

```php
<?php

namespace App\Imports;

use App\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;

class UsersImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return User|null
     */
    public function model(array $row)
    {
        return new User([
           'name'     => $row[0],
           'email'    => $row[1], 
           'password' => Hash::make($row[2]),
        ]);
    }
}
```
Cuối cùng là đưa vào controller để thực hiện việc import :v: 
```php
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;

class UsersController extends Controller 
{
    public function import() 
    {
        Excel::import(new UsersImport, 'users.xlsx');
        
        return redirect('/')->with('success', 'All good!');
    }
}
```
# Tổng kết
Trên đây là những điều cơ bản cần nắm để có thể export cũng như import file một  cách i zì trong laravel.
Ngoài ra còn có rất nhiều chức năng hữu ích như export/import multiple sheet, export/import sử dụng queue, ... mà thời gian cũng như trình english có hạn nên mình vẫn chưa thể tìm hiểu sâu hơn được.<br>
Mọi người có thể truy cập vào trang document của package tại [đây](https://docs.laravel-excel.com/3.1/getting-started/) để tìm hiểu thêm ạ.<br>
Cảm ơn vì đã đọc hết bài mà không có ném gạch :) :)