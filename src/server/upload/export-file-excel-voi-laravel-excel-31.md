# I. Vấn đề

   Làm việc với file không phải điều gì quá xa lạ với các dự án của laravel. Laravel-excel hay còn gọi package maatwebsite cũng quá gần gũi với những ai cần thao tác với file. Với các chức năng hữu ích như :
*     Dễ dàng xuất dữ liệu ra file Excel.
*     Sử dụng các truy vấn với tính năng phân khúc tự động để có hiệu suất tốt hơn.
*     Sử dụng hàng đợi để có hiệu suất tốt hơn.
*     Dễ dàng xuất dạng view Blade sang Excel.
*     Dễ dàng nhập dữ liệu vào file.
*     Đọc tệp Excel theo từng phần.
*     Xử lý chèn, nhập.
Với bản 3.1 mới nhất đối với mình có thể xem là khó sử dụng do doc viết khá ngắn, các chức năng mình cần hầu như không được nhắc đến. Không biết vô tình hay cố ý nhưng những bản cũ hơn mình lại thấy viết khá chi tiết và có những gì mình cần như auto dãn cách các hàng các cột, chính vì thế vừa mới lần đầu làm export với laravel-excel mình khá là rối. Nhiều lúc định cài xuống bản 2.1 cho nó dễ dùng thì lại nhận được lời khuyên của mấy anh "Do mày chưa hiểu thôi " thế là mình lại dành ra vài giờ để tiếp tục với những gì mình cần trong bản 3.1.

# II. Cài đặt
Chắc cũng không cần viết ra làm gì khi doc đã viết rất rõ cách để cài laravel rồi nhưng dành cho bạn nào lười không muốn chuyển link thì mình copy cách cài trên doc của laravel-excel qua đây cho các bạn pase cho nhanh khỏi click qua click lại mất công.

```php
composer require maatwebsite/excel
```

Lệnh sau dành cho trường hợp sau này có bản mới mà các bạn vẫn muốn dùng bản 3.1
```php
composer require maatwebsite/excel:3.1
```
Trong config/app.php thêm vào providers
```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]
```
Trong config/app.php thêm vào aliases
```php
'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```
Để publish config, chạy vendor publish command. Trong config một file mới excel.php được tạo để bạn có thể cấu hình tùy ý.
```php
php artisan vendor:publish
 ```
 Vậy là đã cài xong rùi đó khá đơn giản và nhẹ nhàng.
 
# III. Tìm hiểu về tính năng xuất dữ liệu export
package Maatwebsite/Laravel-Excel cung cấp cho chúng ta rất nhiều tính năng như xuất file với nhiều định dạng, export format, mapping data, xuất file qua view blade,... nhưng trong bài viết này mình chỉ sẽ tập trung vào phần export và những gì mình tìm hiểu được. Các phần khác các bạn có thể đọc thêm ở  [doc](https://docs.laravel-excel.com/3.1/getting-started/)
## 1. Xuất một file
Đầu tiên bạn cần tạo một file app/Exports

Tiếp theo bạn gõ câu lệnh sau vào terminal để tạo một file nhằm mục đích xử lý dữ liệu cần export ra file và cấu hình cho file excel khi được export ra.
```php
php artisan make:export ExportFile --model=User
```
User là tên model bạn cần truy vấn dữ liệu, có thể có, có thể không vì khi bạn thêm đoạn đấy file ExportFile.php được tạo ra nó sẽ use thêm cái model đấy vào thôi. Không có thì nó sẽ không use vào.
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
Bạn có thể thấy dòng user App\User dòng này được tự động thêm vào vì khi tạo file mình có thêm phần --model=User.
Giờ bạn tạo nhanh controller:
```php
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
Và router:
```php
Route::get('users/export/', 'UsersController@export');
```
Điều còn thiếu là bảng user nữa là có thể export được file rồi.
```php
php artisan make:migration create_table_users_table --create=users
```
Mở file migrate mới được tạo và thêm vài trường dữ liệu nào, đừng quên tạo model User.
```
    <?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('airline');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
```
Bạn nhớ thêm dữ liệu vào bảng users và truy cập đường dẫn router là sẽ thấy file excel đã được tải về rồi.
![](https://images.viblo.asia/251b775b-5777-4af4-a336-527a77b06d29.png)
## 2.  Tùy chỉnh
Như vậy ở trên mình đã demo nhanh cách export file excel với laravel-excel rồi. Khá dễ phải không ạ, thật ra trên doc cũng có viết rồi không quá chi tiết nhưng bạn nào biết về laravel đều có thể làm theo được.
### 2.1 Truyền data từ controller qua file export
Chắc các bạn hiểu ý mình. Khi làm file export mình gặp phải vấn đề khá chuối đó là bên phía controller cần xử lý dữ liệu trước sau đó mới export ra hay khi mình muốn export dữ liệu của user nhưng phải theo id chẳng hạn. Vấn đề là bên file export như trong ví dụ là ExportFile.php cần id trên router để lấy dữ liệu của user đó export ra file excel.
Mình đã truyền dữ liệu từ controller qua ExportFile.php như sau.

Bên controller trước khi tải file về mình sẽ truyền dữ liệu đã xử lý qua bên ExportFile.php sau đó mới tải dữ liệu xuống ví dụ:
```php
use App\Exports\ExportFile;
...
public function export($id)
{
    ...
    $point = [
        [1, 2, 3],
        [2, 5, 9]
    ]
    $data = (object) array(
            'points' => $point,
        );
    $export = new ExportFile([$data]);
    return Excel::download($export, abc.xlsx);
}
```
Như bên trên bạn có thể tùy ý gửi dữ liệu qua bên file export excel để giải quyết vấn đề như mình đưa ra bên trên, ở đây mình có thể tùy ý xử lý dữ liệu từ trước rồi sau đó mới truyền đi để export dữ liệu ra file excel. Ngoài ra bạn có thể truyền thêm nhiều giá trị khác như headings chẳng hạn hay bất cứ đữ liệu gì khác bạn cần. Ok giờ bên file export cụ thể của mình là ExportFile.php (file này là tạo từ ví dụ bên trên nằm trong app/Exports nhé kẻo các bạn không nhớ).
```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Config;

class ExportScorerFile implements FromArray
{
    use RegistersEventListeners;
    /**
    * @return \Illuminate\Support\Collection
    */

    public $points;

    public function __construct(array $points)
    {
        $this->points = $points;
    }

    public function array(): array
    {
        return $this->points[0]->points;
    }
}

```
Ở đây bạn có thể thấy mình dùng FromArray và tạo construct để hứng dữ liệu bên controller đẩy qua. Giờ thì bạn có thể truyền data đã xử lý từ controller đi để export ra file excel rồi.
### 2.2 Tự động căn chỉnh chiều cao và chiều rộng
Với dữ liệu dài loằng ngoằng thì hẳn bạn sẽ thấy có vấn đề khi bị khuất text hay không hiển thị hết đoạn text. Lúc này mình cần tự động căn chỉnh cho tất cả các hàng cần hiển thị hết dữ liệu mà không bị che khuất.
Ở đây mình dùng ShouldAutoSize đơn giản như sau:
```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Config;

class ExportScorerFile implements FromArray, ShouldAutoSize
{
    use RegistersEventListeners;
    /**
    * @return \Illuminate\Support\Collection
    */

    public $points;

    public function __construct(array $points)
    {
        $this->points = $points;
    }

    public function array(): array
    {
        return $this->points[0]->points;
    }
}
```
### 2.3 Tạo headings thành cột
Cái này trên doc cũng có nói nhưng là tạo theo hàng ngang nếu các bạn để ý có thể dễ dàng tạo theo chiều dọc bằng cách return nhiều array như sau.
```php
use Maatwebsite\Excel\Concerns\WithHeadings;
...
class ExportScorerFile implements FromArray, WithHeadings, ShouldAutoSize
{
    public function headings(): array
        {
            $headings = [
                ['a'],
                ['b'],
                ['c']
            ];

            return $headings;
        }
  }
```
Nhớ user WithHeadings cái này trên doc cũng khá rõ nên mình ví dụ qua thôi.
### 2.4 Merge hàng và căn chỉnh số sang bên trái
Dĩ nhiên việc gộp các hàng cũng thường hay xảy ra trong excel và việc số hay nằm về bên phải ô excel thì ở đây mình cũng có cách giải quyết cho hai vấn đề này.
```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Config;

class ExportScorerFile implements FromArray, WithHeadings, WithStyles, WithEvents, ShouldAutoSize
{
    use RegistersEventListeners;
    /**
    * @return \Illuminate\Support\Collection
    */

    public $points;

    public function __construct(array $points)
    {
        $this->points = $points;
    }

    public function array(): array
    {
        return $this->points[0]->points;
    }

    public function headings(): array
    {
        $headings = [
            ['a'],
            ['b'],
            ['c']
        ];

        return $headings;
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->mergeCells('A1:B1');
        $sheet->mergeCells('A2:B2');
        $sheet->mergeCells('A3:B3');
        $sheet->mergeCells('A4:B4');
        $sheet->mergeCells('A5:B5');
        $sheet->mergeCells('A6:B6');
        $sheet->mergeCells('C1:D1');
        $sheet->mergeCells('C2:D2');
        $sheet->mergeCells('C3:D3');
        $sheet->mergeCells('C4:D4');
        $sheet->mergeCells('C5:D5');
        $sheet->mergeCells('C6:D6');
        $sheet->mergeCells('A7:D7');

        $sheet->setCellValue('C1', 'Xin chao');
        $sheet->setCellValue('C2', 'Xin chao');
        $sheet->setCellValue('C3', 'Xin chao');
        $sheet->setCellValue('C4', 'Xin chao');
        $sheet->setCellValue('C5', 'Xin chao');
        $sheet->setCellValue('C6', 'Xin chao');

        foreach (range(1, 7) as $number) {
            $sheet->getStyle('C' . $number)->getAlignment()->applyFromArray(
                array('horizontal' => 'left')
            );
        }
    }
}
```

Ở đây bạn có thể dễ dàng nhận thấy mình còn có thể set giá trị cho từng ô của excel.
### 2.5 Chỉnh size và color
Ở phần 2.4 bạn có thể thấy mình có user thằng RegistersEventListeners mà không dùng, do mình xóa thiếu đó giờ mình mới dùng đến nó này.
```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Config;

class ExportScorerFile implements FromArray, WithHeadings, WithStyles, WithEvents, ShouldAutoSize
{
    use RegistersEventListeners;
    /**
    * @return \Illuminate\Support\Collection
    */

    public $points;

    public function __construct(array $points)
    {
        $this->points = $points;
    }

    public function array(): array
    {
        return $this->points[0]->points;
    }

    public function headings(): array
    {
        $headings = [
            ['a'],
            ['b'],
            ['c']
        ];

        return $headings;
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->mergeCells('A1:B1');
        $sheet->mergeCells('A2:B2');
        $sheet->mergeCells('A3:B3');
        $sheet->mergeCells('A4:B4');
        $sheet->mergeCells('A5:B5');
        $sheet->mergeCells('A6:B6');
        $sheet->mergeCells('C1:D1');
        $sheet->mergeCells('C2:D2');
        $sheet->mergeCells('C3:D3');
        $sheet->mergeCells('C4:D4');
        $sheet->mergeCells('C5:D5');
        $sheet->mergeCells('C6:D6');
        $sheet->mergeCells('A7:D7');

        $sheet->setCellValue('C1', 'Xin chao');
        $sheet->setCellValue('C2', 'Xin chao');
        $sheet->setCellValue('C3', 'Xin chao');
        $sheet->setCellValue('C4', 'Xin chao');
        $sheet->setCellValue('C5', 'Xin chao');
        $sheet->setCellValue('C6', 'Xin chao');

        foreach (range(1, 7) as $number) {
            $sheet->getStyle('C' . $number)->getAlignment()->applyFromArray(
                array('horizontal' => 'left')
            );
        }
    }
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $cellRange = 'A8:W8';
                $event->sheet->getDelegate()
                    ->getStyle($cellRange)
                    ->getFont()
                    ->setSize(13)
                    ->getColor()->setRGB('0000ff');
            }
        ];
    }
}
```

Với hàm registerEvents mình có thể tùy ý chỉnh sửa font, size, colo của file excel.

# IV. Kết luận

Như vậy mình vừa chia sẻ một chút những hiểu biết của mình sau khi tìm hiểu qua laravel-excel. Vì chưa tìm hiểu được lâu nên còn nhiều thiếu. Thank!
Tham khảo : https://docs.laravel-excel.com/3.1/exports/