# 1. Giới thiệu
Chào mọi người. Chả là mình mới join vào một dự án maintain. Vì là dự án maintain nên nhiều khi cũng rảnh rỗi và cũng bắt gặp một số kiến thức khá là hay mà mình chưa áp dụng bao giờ. Nên mình quyết định custom lại và muốn chia sẻ với mọi người. Một trong số đó là  **export file excel**. Bắt đầu thôi nào!
# 2. Cài đặt
## 2.1. Cài đặt package
Đầu tiên muốn sử dụng được thì các bạn cần cài package `maatwebsite/excel` bằng `composer` như sau:
```
composer require maatwebsite/excel
```
## 2.2. Tùy chỉnh cấu hình excel
Để làm được điều này các bạn cần chạy
```
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"
```
Lệnh này có tác dụng copy file config của `maatwebsite/excel` ra bên ngoài. File mới sẽ có tên là `config/excel`
# 3. Export bằng maatwebsite/excel
Đầu tiên các bạn cần chạy câu lệnh `artisan` để tạo ra một file export
```
php artisan make:export UserExport
```
một file UserExport sẽ được tạo ra. Nó sẽ trông như thế này
```UserExport.php
<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UserExport implements FromCollection
{
    public function collection()
    {
        return User::all();
    }
}
```
`maatwebsite/excel` hỗ trợ sẵn chúng ta một số function để chúng ta có thể dễ dàng thực thi về logic hay về hiện thị như một số function sau đây:
## 3.1. function collection()
function `collection` các bạn có thể dùng `Eloquent` hay `Query builder` để có thể lấy ra data collection mà bạn muốn hiển thị.
## 3.2. function map()
Để sử dụng `function` này file `UserExport` cần `implements` `interface` `Maatwebsite\Excel\Concerns\WithMapping`
```
public function map($row): array
    {
        return [
            $row->name,
            $row->email
        ];
    }
```
`function` này sẽ lấy `data` từ `collection` và sẽ trả về một mảng các trường mà chúng ta muốn hiển thị ra ngoài file excel.
## 3.3. function registerEvents()
Để tăng UI cho file excel  ta có thể sử dụng đến `function` này. Để sử dụng cần implements interface `Maatwebsite\Excel\Concerns\registerEvents`
```
public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $cellRange = 'A1:B1';
                $color = '93ccea';
                $event->sheet->getDelegate()->getStyle($cellRange)->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()->setRGB($color);
            }
        ];
    }
```
Ở đây mình sẽ xét phạm vi hiển thị cho file excel là **'A1:B1'** và sẽ xét **color** là **'93cc3a'**
## 3.4. fucntion headings()
Một file excel chuẩn thì phải có heading để chúng ta có thể biết ý nghĩa từng trường trong cột là gì. `maatwebsite/excel` đã hỗ trợ chúng ta điều này một cách rất đơn giản như sau:
```
public function headings(): array
    {
        return [
            'Name',
            'Email',
        ];
    }
```
**Lưu ý:** Các bạn muốn dùng function này thì phải implements interface `Maatwebsite\Excel\Concerns\WithHeadings` này nha.
## 3.5. function columnWidths()
Một function nữa mình muốn giới thiệu với các bạn đó là `columnWidths()`. Đôi khi data của bạn sẽ có một cột với nội dung rất dài như **địa chỉ**. Nếu chúng ta để độ rộng mặc định thì rất bất tiện, chúng ta sẽ phải kéo thước để hiện thị đủ nội dung. `columnWidths` sẽ giúp chúng ta giải quyết vấn đề này.
```
 public function columnWidths(): array
    {
        return [
            'Name' => 20,
            'Email' => 30,
        ];
    }
```
# 4. Tạo một controller
Chúng ta cần tạo một controller để thực thi export file
```
php artisan make:controller ExportUserController
```
Tiếp đến chúng ta cần tạo một function để xử lý export
```
 public function export()
    {
        return Excel::download(new UserExport(), 'users'.'.xlsx');
    }
```
# 5. Tạo một routes
Cuối cùng chúng ta cần tạo một routes để có thể export file.
```
Route::get('/export', 'ExportUserController@export');
```
# 6. Thành quả
![image.png](https://images.viblo.asia/03d8f8b3-83e8-42c9-88cc-f326526dbc13.png)
# 7. Kết luận
Như vậy hôm nay mình đã hướng dẫn mọi người cách export file excel bằng `maatwebsite/excel`. Hi vọng bài viết này giúp ích được cho các bạn. Các bạn có thể xem thêm bài viết của mình về [import file excel trong Laravel](https://viblo.asia/p/cach-import-data-bang-file-excel-trong-laravel-LzD5d9AzKjY). Cám ơn mọi người đã đọc bài viết của mình 🤗