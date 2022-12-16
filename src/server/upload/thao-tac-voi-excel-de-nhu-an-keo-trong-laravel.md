# 1. Lời mở đầu
Đối với việc quản trị những website ngày nay như quản lý danh sách các sản phẩm, quản lý bộ đề câu hỏi, đề thi... thì việc tối ưu các công việc ví dụ như thêm mới các sản phẩm bằng việc nhập tay từng thông tin một vào form rồi submit sẽ tốn kha khá thời gian và công sức của người quản trị. Để giải quyết được vấn đề này, chúng ta cúần đế những giải pháp có thể giảm tải thời gian cũng như công sức để làm những công việc này thì việc làm việc với Excel sẽ là một sự lựa chọn hợp lý nhất.
![](https://images.viblo.asia/ed43bd85-a6b4-4e4e-9be4-11183055c910.jpg)

Trong bài viết này mình xin giới thiệu với các bạn một thư viện có tên là **Maatwebsite** để chúng ta có thể thao tác với Excel một cách dễ dàng(import, export). 
# 2. Cài đặt
### Yêu cầu 
Để sử dụng được thư viện này chúng ta cần có những yêu cầu như :
* PHP: ^7.0
* Laravel: ^5.5
* PhpSpreadsheet: ^1.6
* Các PHP extension: `php_zip`, `php_xml`, `php_gd2`, `php_iconv`, `php_simplexml`, `php_xmlreader`, `php_zlib` được bật.

### Cài đặt vào project
Chạy lệnh để cài đặt package cũng như `PhpSpreadsheet`
```bash
composer require maatwebsite/excel
```
Trong quá trình cài đặt package này nếu bạn gặp lỗi này tương tự mình
```
The requested PHP extension ext-gd * is missing from your system. Install or enable PHP's gd extension.
```
thì các bạn cài thêm extension `gd` là được, ở đây mình dùng php version là 7.4, bạn sửa tương tự theo version trên máy bạn.
```bash
sudo apt-get install php7.4-gd
```
các bạn đăng ký ServiceProvider trong `config/app.php`
```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]
```
chạy thêm lệnh 
```bash
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config
```
để publish config được sinh ra trong `config/excel.php`.

Như vậy là cài đặt cũng được hòm hòm rồi, giờ chúng ta sẽ đi vào tìm hiểu các chức năng hữu ích mà package cung cấp.
# 3. Tìm hiểu chức năng Export
## 3.1. Export cơ bản
Trước tiên chúng ta cần tạo một class Export được dùng để xử lý các tính năng liên quan đến export
```bash
php artisan make:export UsersExport --model=User
```
Flag `--model=User` để cho package hiểu là file này chúng ta sẽ thực thi với object nào, trong trường hợp này nó là `User`, nó sẽ tự động thêm đoạn code liên quan đến `User` vào trong function `collection`. Nếu không có flag `--model` này thì cũng chả sao nhé các anh chị em.

Câu lệnh trên sẽ giúp chúng ta một file là `app/Exports/UsersExport.php` với nội dung. 
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
Có hàm `collection` này giúp chúng ta bóc tách cái rows trong file excel ra dưới dạng collection để xử lý dễ dàng với laravel.

Tiếp theo cần phải tạo một `function` trong controller để xử lý việc download
```php:UserController.php
<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;

class UsersController extends Controller 
{
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
```
Ở đây mình export một file excel dưới dạng extension là `xlsx`, tuy nhiên bạn có thể tùy chỉnh extension theo định dạng file mà bạn mong muốn như `csv`, `tsv`, `ods`, `xls`...

Cuối cùng là tạo thêm một `route` để hoàn thành việc download đơn giản một file excel
```php:web.php
Route::get('users/export/', 'UsersController@export');
```
Kết quả

![](https://images.viblo.asia/2b1ae4f0-8865-4556-9c25-158e70b38c6d.png)

## 3.2. Thêm tiêu đề cho bảng
Để thêm tiêu đề từng column trong excel chúng ta chỉ cần thêm `WithHeadings` concern để custom tiêu đề, và các tiêu đề sẽ được trả về dưới dạng array viết trong function `headings()`
```php:UsersExport.php
<?php
class UsersExport implements FromCollection, WithHeadings
{
    public function headings(): array {
      return [
        '#',
        'Name',
        'Email',
        'Phone',
        'Birthday'
      ];
    }
}
```
## 3.3. Xác định giá trị cho từng cột
Ở phần trên mình có giới thiệu về viết tiêu đề cho bảng. Nếu như viết ở trên thì kết quả trả về từ hàm `collections` sẽ lần lượt `map` với từng cột tiêu đề mà chúng ta xác định ở trên.

Để có thể tự xác định riêng giá trị của từng cột chỉ cần `implements WithMapping` và viết thêm function `map` vô là được
```php:UsersExport.php
<?php
class UsersExport implements FromCollection, WithMapping
{
    public function map($user): array
    {
      return [
          $user->name,
          $user->email,
      ];
    }
}
```
## 3.4. Căn chỉnh chiều cao chiều rộng
Chắc chắn khi làm việc với dữ liệu lúc export ra excel, sẽ có những giá trị dài ngoằng ngoẵng khiến text bị che mất đi, mà giao diện download về nhìn cũng không đẹp đẽ gì. Để định dạng đẹp đẽ hơn chỉ cần `implements ShouldAutoSize`, nó sẽ tự động điều chỉnh độ rộng của cột sao cho phù hợp với giá trị tương ứng.
```php:UsersExport.php
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class UsersExport implements FromCollection, ShouldAutoSize, WithColumnWidths
{
    ....
}
```
Hoặc nếu chúng ta muốn tự kiểm soát động rộng của cột thì hãy `implements WithColumnWidths` và viết thêm hàm `columnWidths` với giả trị trả về là một mảng các cột và động rộng tương ứng
```php:UsersExport.php
class UsersExport implements FromCollection, WithColumnWidths
{
    return [
      'A' => 55,
      'B' => 45,            
    ];
}
```
## 3.5. Định dạng style
Với việc `implements WithStyles` sẽ giúp chúng ta dễ dàng định dạng giá trị được hiển thị trong excel
```php:UsersExport.php
class UsersExport implements WithStyles
{
    public function styles(Worksheet $sheet)
    {
        return [
            // Định dạng toàn bộ hàng đầu tiên với font chữ được in dậm
            1    => ['font' => ['bold' => true]],

            // Định dạng giá trị tại ô B2 có font là in nghiêng
            'B2' => ['font' => ['italic' => true]],

            // Định dạng font-size cho toàn bộ cột C
            'C'  => ['font' => ['size' => 16]],
        ];
    }
}
```

> Ngoài ra về phần **Export** hỗ trợ chúng ta rất nhiều trong việc thiết kế file excel cũng như xử lý sao cho mượt mà nhất, ở đây mình chỉ giới thiệu vài thứ cơ bản để các bạn có thể đọc qua là hiểu và áp dụng được luôn.

# 4. Tìm hiểu chức năng Import
## 4.1. Import cơ bản
Tương tự như chức năng `export` chúng ta cần tạo một file để xử lý việc `import`.
```bash
php artisan make:import UsersImport --model=User
```
Sau câu lệnh này sẽ tạo cho chúng ta file `UsersImport` nằm trong `app/Imports` với nội dung
```php:UsersImport.php
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
            //
        ]);
    }
}
```
Muốn lấy dữ liệu để đọc trong file excel theo tiêu đề cột thì phải `implements WithHeadingRow` để nó hiểu được là chúng ta đang sử dụng tiêu đề là key.
```php
public function model(array $row)
    {
        return new User([
            'name' => $row['name'],
            'email' => $row['email']
            ....
        ]);
    }
```
Mặc định thì `headings key` sử dụng helper `str_slug` để format lại key.

Ví dụ tiêu đề cột của bạn là "Họ và tên", thì khi gọi tới key này sẽ là `ho_va_ten`. Ngoài ta chúng ta cũng có thể tự động fornat lại định dạng key nếu muốn.

Để import file từ dưới local lên thì bạn thêm vào trong controller xử lí việc `import`
```php
Excel::import(new UsersImport, request()->file('your_file'));
```
Ở đây chúng ta sử dụng `Excel facade` và `static function import` truyền vào bên trong 2 tham số vào, tham số thứ nhất là object `UsersImport` xử lý các thao tác liên quan đến excel, và tham số thứ hai là `file` mà bạn muốn upload lên server.

Cuối cùng là tạo thêm một `route` để gọi tới controller xử lý việc import
```
Route::post('users/import', 'UserController@import');
```

## 4.2. Dòng bắt đầu của tiêu đề
Trong một số trường hợp, `headings key` của chúng ta không nằm ở dòng đầu tiêu, mà nằm ở dòng số 2 chả hạn thì viết thêm hàm `headingRow` để xử lý vấn đề này

```php:UsersImport.php
    public function headingRow(): int
    {
        return 2;
    }
```
## 4.3. Cập nhật hay tạo mới
Mặc định khi bạn import 1 file lên nó sẽ là việc tạo mới record. Tuy nhiên vấn đề này khá là bất cập khi có những trường đã tồn tại rồi thay vì tạo thêm 1 bản ghi nữa chúng ta chỉ muốn update nó thôi thì `implements WithUpserts` ngay để giải quyết việc này.

Ví dụ nếu như một email trong CSDL đã tồn tại rồi thì nó sẽ update chứ không phải tạo mới 
```php:UsersImport.php
    public function uniqueBy()
    {
        return 'email';
    }
```
Khi viết như trên các bạn có thể hiểu là chúng ta đang unique một column trong CSDL, ý là chỉ có thể có một giá trị như này trong một cột thôi.

## 4.4. Batch inserts
Khi import dữ liệu không tránh khỏi những lúc dữ liệu trả về quá nhiều dẫn đến việc quá tải, để xử lý vấn đề này thì chúng ta có thể nghĩ đến một cách là  trong một thời điểm chỉ cho phép tạo bao nhiêu dữ liệu thôi. Nếu như bạn nghĩ đến cách này thì đây là phần viết dành cho bạn =)) 

`Implements WithBatchInserts` cho phép bạn giới hạn lượng query được thực hiện
```php:UsersImport.php
    public function batchSize(): int
    {
        return 1000;
    }
```
Cũng tương tự với `Batch upsert` là chúng ta sẽ `implements WithUpserts` thay vì `WithBatchInserts`
## 4.5. Chunk reading
Cũng hơi giống với `Batch insert` thì chúng ta còn một cách khác để giải quyết việc quá tải khi dữ liệu được import quá lớn đó là `implements WithChunkReading` và thêm hàm `chunkSize` để thư viện lấy lần lượt số lượng rows được định nghĩa ra để xử lý chứ không phải lấy tất cả các bản ghi cùng một lúc sẽ dẫn đến việc server bị quá tải
```php
class DataImport implements ToCollection, WithChunkReading {
    public function chunkSize(): int
    {
        return 200;
    }
}
```
Ở trường hợp này, mỗi lần server sẽ chỉ đọc 200 bản ghi trước để xử lý rồi mới tiếp tục lấy thêm.

# Kết luận
Ngoài ra còn rất nhiều các inteface được tạo ra giúp chúng ta thao tác với việc import với excel rất dễ dàng mình không thể viết hết trong một bài viết được mà chỉ liệt kê những tính năng cơ bản và tiêu biểu của package này đem giới thiệu với các bạn.

Nếu hay hãy tặng ngay cho mình 1 upvote nhé.