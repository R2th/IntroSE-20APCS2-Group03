## 1. Giới thiệu
Trong bất kỳ một project quản lý nào cũng không thể thiếu việc thống kê dữ liệu bằng cách export/import data. Hôm nay mình xin giới thiệu đến các bạn package **Maatwebsite/Laravel-Excel** -  một package giúp chúng ta có thể export/import data một cách dễ dàng, với rất nhiều tiện ích nữa nha.

Đầu tiên cùng mình cài đặt package nào Let's GO ^^  Ở bài viết này mình dùng phiên bản mới nhất 3.1 nha mn.
## 2. Cài đặt
### 2.1 Supported Versions
| **Version** | **Laravel Version** | **Php Version 3** | **Support** |
| -------- | -------- | -------- | -------- |
| 2.1     |  <=5.6     | <=7.0     | Unsupported since 15-5-2018    |
| 3.0     |  ^5.5     | ^7.0     |Unsupported since 31-12-2018    |
| 3.1     |  ^5.5, ^6.0, ^7.0, ^8.0   | ^7.2     |New features    |

### 2.2 Cài đặt package
Rất đơn giản, chúng ta sẽ cài đặt được package thông qua composer chỉ bằng một câu lệnh:
```
composer require maatwebsite/excel
```
Đợi một xí ạ, sau khi cài đặt xong package thì giờ đây mình có thể dùng đc r nè.
## 3. Cách sử dụng
Ưmmmmm... mình sẽ bỏ qua các bước create project laravel, migrate, seed data,... nhé! Ở đây mình đã tạo sẵn 1 project **export-project** và sử dụng luôn table users sẵn có.
**Maatwebsite/Laravel-Exce** package hỗ trợ rất nhiều kiểu định dạng đuôi file như: *.csv, *.xls, *.html,... thật tiện ích đúng không ạ. 

Đầu tiên mình sẽ tạo 1 file export **app/Exports/UsersExport.php**
```
php artisan make:export UsersExport --model=Models\User
```
Sau đó trong web.php mình có định nghĩa 1 route:
```
Route::get('export', 'App\Http\Controllers\ExportController@export')->name('export');
```
Và bước cuối cùng 1 tạo 1 ExportController:
```
php artisan make:controller ExportController
```
 Trong file Controller này mình sẽ viết 1 function export() có nội dung như sau:
 ```
<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;

/**
 * Class ExportController
 * @package App\Http\Controllers
 */
class ExportController extends Controller
{
    /**
     * Export users
     *
     * @return void
     */
    public function export()
    {
        $now = Carbon::now()->format('Y/m/d');
        $data = User::select(
            'id',
            'name',
            'email',
            'created_at'
        )->get();

        return Excel::download(new UsersExport($data, $now), 'users.xlsx');
    }
}
 ```
 Ở đây bạn có thể tự do get data theo các điều kiện mình mong muốn nha. Ngoài cách này ra bạn cũng có thể không cần xử lý dữ liệu bên Controller mà có thể xử lý ngày bên file **UsersExport** trong function collection() nè.
 Ò giờ mình vô file **UsersExport** chỉnh sửa lại một chút nào.
 ```
 <?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    /**
     * @param App\Models\User $data
     */
    public function __construct($data, $now)
    {
        $this->data = $data;
        $this->date = $now;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->data;
    }
}
 ```
 Sau đó truy cập *http://localhost:8000/export* là có thể download một file users.xlsx về máy rồi. Tuy nhiên file này mình chưa có format định dạng gì nên nó khá là xấu á huhi :cold_sweat::cold_sweat::cold_sweat:
 
 ![](https://images.viblo.asia/fb274ae6-fdd8-4e3c-9192-09a86af277cf.png)

Phần 4 này mình sẽ hướng dẫn các bạn một số format để file của mình trông lung linh hơn nha hihi.
## 4. Một số format file có thể bạn chưa biết
### 4.1 Format data
Ngoài cách trong file UsersExport implements **FromCollection** chúng ta có thể implements từ **FromArray**.
VD ở đây mình không muốn lấy cả timestamp column users.created_at mà mình muốn định dạng nó theo format khác trông dễ nhìn thì mình có thể dùng function array() để format lại chúng nạ:
```
/**
 * @return array
 */
public function array(): array
{
    foreach ($this->data as $item) {
        $data[] = [
            $item->id,
            $item->name,
            $item->email,
            Carbon::parse($item->created_at)->format('Y/m/d'),
        ];
    }

    return $this->data = $data;
}
```
Các bạn có thể format thêm/bớt bất cứ ở đây nha. Mỗi một $item tương ứng với các giá trị của 1 hàng.
### 4.2 Format heading
Một file thì không thể thiếu phần heading được đúng không ạ. Cũng tương tự như trên ở đây UsersExport mình có  implements thêm **WithHeadings**  nè. Ting Ting mình sẽ thêm heading cho file users.xlsx theo thứ tự từng column mình vừa format bên trên nha.
```
/**
 * @return array
 */
public function headings(): array
{
    // Moi mot [] đại diện cho một row
    return [
        [
            'Ngay xuat file' . $this->date,
        ],
         [
            null,
        ],
        [
            // Thu tu column
            'ID',
            'User Name',
            'Email',
            'Created_At',
        ],
    ];
}
```

### 4.3 Set StartCell
Implements **WithCustomStartCell**:
```
/**
 * @return string
 */
public function startCell(): string
{
    return 'B2';
}
```

### 4.4 Set Title
Implements **WithTitle**:
```
/**
 * @return string
 */
 public function title(): string
    {
        return 'Users_' . $this->date;
    }
```
### 4.5 Format Events
Implements **WithEvents** Giờ thì chúng mình sẽ đi format về font chữ nè, kích thước, with, color,...
```
/**
 * @return array
 */
public function registerEvents(): array
{
    $styleFontTextAll = [
        'font' => [
            'name' => 'ＭＳ Ｐゴシック',
            'size' => 8,
        ],
    ];

    $styleHeader = [
        'borders' => [
            'allBorders' => [
                'borderStyle' => Border::BORDER_THIN,
            ],
        ],
        'alignment' => [
            'horizontal' => Alignment::HORIZONTAL_CENTER,
            'vertical' => Alignment::VERTICAL_CENTER,
            'wrapText' => true,
        ],
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'color' => ['argb' => 'ffcc99'],
        ],
    ];

    $styleArray = [
        'borders' => [
            'allBorders' => [
                'borderStyle' => Border::BORDER_THIN,
            ],
        ],
        'alignment' => [
            'vertical' => Alignment::VERTICAL_CENTER,
            'wrapText' => true,
        ],
    ];

    return [
        AfterSheet::class => function (AfterSheet $event) use (
            $styleFontTextAll,
            $styleHeader,
            $styleArray
        ) {
            $endRow = sizeof($this->data) + 4;

            $event->sheet->styleCells('B4:E4', $styleHeader);
            $event->sheet->styleCells('B2:E' . $endRow, $styleFontTextAll);
            $event->sheet->getDelegate()->getStyle('B5:E' . $endRow)->applyFromArray($styleArray);

            // set width
            $event->sheet->getDelegate()->getColumnDimension('A')->setWidth(2);
            $event->sheet->getDelegate()->getColumnDimension('B')->setWidth(5);
            $event->sheet->getDelegate()->getColumnDimension('C')->setWidth(25);
            $event->sheet->getDelegate()->getColumnDimension('D')->setWidth(30);
            $event->sheet->getDelegate()->getColumnDimension('E')->setWidth(25);

            // set height
            $event->sheet->getDelegate()->getRowDimension('1')->setRowHeight(10);
            $event->sheet->getDelegate()->getRowDimension('3')->setRowHeight(10);
            $event->sheet->getDelegate()->getRowDimension('4')->setRowHeight(25);
        },
    ];
}
```

Và kết quả giờ đây mình đã có 1 trang xinh xinh như này nè!

![](https://images.viblo.asia/f804ea59-e1ba-4ace-a4d7-f10f12753aba.png)

## Kết luận
Bài viết trên mình đã chia sẻ với các bạn cách sử dụng  **Maatwebsite/Laravel-Excel** package để phục vụ cho việc export file trong một project laravel.

Để tìm hiểu kỹ hơn về package, các bạn có thể tham khảo thêm trên trang chủ của package nhé! Cảm ơn mn đã đọc bài viết của mình ạ :blush::blush::blush:

https://docs.laravel-excel.com/3.1/getting-started/
https://github.com/Maatwebsite/Laravel-Excel