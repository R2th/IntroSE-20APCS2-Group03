## 1. Giới thiệu
Bài viết này mình sẽ hướng dẫn các bạn cách export file trong laravel với package **maatwebsite 3.0**. Mình viết bài này vì trong project mình đang làm có sử dụng đến chức năng này và search trên mạng thì rất nhiều bài hướng dẫn với phiên bản **maatwebsite 2.1** còn với **3.0** thì khá ít và cũng chưa có link vietsub nào hướng dẫn chi tiết nên mình sẽ viết bài này để hướng dẫn các bạn muốn dùng với phiên bản 3.0. Cũng vẫn là làm việc với **maatwebsite** nhưng cách áp dụng có đôi chút khác nhau mình sẽ giới làm ví dụ cụ thể trong bài để các bạn có thể áp dụng ngay và thực hành.
## 2. Cài đặt package

| Version  | Laravel  | Version  |
| -------- | -------- | -------- |
| 3.0	   | ^5.5     | ^7.0     |

> 
Bài này mình sẽ hướng dẫn trên môi trường Laravel 5.5.

Cài gói maatwebsite trong composer.json, chạy composer require package maatwebsite.


```php
composer require maatwebsite/excel
```

Trong config/app.php thêm vào  providers

```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]
```

Trong config/app.php thêm vào  aliases
```php
'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```
Để publish config, chạy vendor publish command:
```php
php artisan vendor:publish
```

Câu lệnh này sẽ tạo ra một file trong config là excel.php
Vậy là đã xong bước cài đặt rồi!
## 3. Export file
Mình sẽ lấy một ví dụ về xuất đơn hàng để các bạn có thể hình dung rõ hơn. Đầu tiên là tạo một route để khi click xuất file.
```html
<div class="export">
     <a href ="{{ route('export') }}" class="btn btn-info export" id="export-button"> Export file </a>
</div>
```
 Tiếp theo là chúng ta sẽ vào routes/web.php để tạo route trên
```php
Route::get('export', 'ExportController@export')->name('export');
```
Bước tiếp theo là tạo controller ExportController
```php
run command
php artisan make:controller ExportController
```
Giờ chúng ta đã có controller rồi tiếp theo vào controller thêm những dòng này dưới namspaces để chúng ta có thể sử dụng package vừa cài nhé.
```php
use Excel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
```
Class ExporController sẽ được implements từ 2 Interface FromCollection và WithHeadings
```php
class ExportController extends Controller implements FromCollection, WithHeadings
```
Trong controller này chúng ta sẽ sử dụng trait Exportable, viết dòng dưới này ở trong class ExportController.
```php
use Exportable;
```
Giờ đến bước lấy dữ liệu chúng ta sẽ xuất file. 
Tiếp theo là chúng ta sẽ implements phương thức collection() của \Maatwebsite\Excel\Concerns\FromCollection.

Trong collection() chúng ta sẽ lấy dữ liệu muốn xuất file
Ví dụ dưới đây là mình muốn xuất file của đơn hàng
```php
public function collection()
    {
        $orders = Order::all();
        foreach ($orders as $row) {
            $order[] = array(
                '0' => $row->id,
                '1' => $row->name,
                '2' => $row->address,
                '3' => $row->email,
                '4' => $row->order_date,
                '5' => number_format($row->total),
            );
        }

        return (collect($order));
    }
```

Tạo tiêu đề các cột của bảng
```php
public function headings(): array
    {
        return [
            'id',
            'Tên',
            'Địa chỉ',
            'Email',
            'Ngày đặt hàng',
            'Tổng',
        ];
    }
```
Việc cuối cùng là tiến hành download chúng ta sẽ dùng Excel::download().
```php
public function export(){
     return Excel::download(new ExcelController(), 'orders.xlsx');
}
```
Giờ hãy ấn nút Export file thôi. Và đây là kết quả sau khi xuất file.
![](https://images.viblo.asia/f406fa47-33a9-40d2-8315-fc7dd9bd5929.png)


Vậy là mình đã hướng dẫn các bạn cách xuất file với laravel sử dụng **maatwebsite 3.0**, đây là một package rất hay, các bạn có thể import file hay export ra file xlxs, csv... Các bạn có thể lên [trang chủ ](https://laravel-excel.maatwebsite.nl/3.0/)tìm hiểu thêm nhé
link tham khảo: 
https://laravel-excel.maatwebsite.nl/3.0/  và
https://laravel-news.com/laravel-excel-3-0