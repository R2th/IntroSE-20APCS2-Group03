... Phần 2 này là tiếp nối cho [Phần 1](https://viblo.asia/p/diem-qua-mot-so-laravel-packages-ORNZqgr850n) mà mình đã từng trình bày trước đây.
## 1. Laravel Favicon Package
Đây là package được viết bởi Marcel Pociot cho phép chúng ta tạo ra được các favicons động dựa trên môi trường mà chúng ta cấu hình ví dụ như sau
![](https://images.viblo.asia/4a60fb91-c0a4-4651-9a62-2410c3d60881.png)
Muốn sử dụng package này thì trong template ta sử dụng hàm helper favicon(), sau đó chúng ta có thể config lại theo ý của mình ví dụ như định nghĩa lại size của favicon: 
```
<link rel="icon" type="image/png" sizes="32x32" href="{{ favicon(asset('favicon-32x32.png')) }}">
```
Sau đây là một ví dụ về việc sử dụng cấu hình môi trường mặc định, từ đó bạn có thể tự định nghĩa cho mình một cấu hình tương tự:
```
'enabled_environments' => [
    'local' => [
        'text' => 'DEV',
        'color' => '#000000',
        'background_color' => '#ffffff',
    ],
],
```
Package sử dụng [Intervention Image](http://image.intervention.io/) và tại thời điểm tác giả viết ra package này thì nó cũng hỗ trợ các trình xử lý ảnh như: gd và imagick. Nếu bạn muốn thay đổi file ICO, bạn cần thay đổi cấu hình về imagick.
Mục đích của package này vốn không dùng cho môi trường production. Những môi trường không được định nghĩa trong config sẽ đều bị trả về icon gốc.
Các bạn có thể tìm hiểu thêm về package này [tại đây](https://github.com/beyondcode/laravel-favicon)
## 2. Laravel Excel Package
Đây là một package hỗ trợ chúng ta làm việc với excel, ví dụ như:
### Xuất từ HTML/ Blade
Thử tưởng tượng nếu bạn đang có một table HTML như sau:
![](https://images.viblo.asia/113f54dd-c49a-4885-8bb3-8d72be7ac5f4.png)
Và đây là phần code phía blade:
```
<table class="table">
    <thead>
    <tr>
        <th></th>
        <th>First name</th>
        <th>Last name</th>
        <th>Email</th>
        <th>Created at</th>
        <th>Updated at</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($customers as $customer)
    <tr>
        <td>{{ $customer->id }}</td>
        <td>{{ $customer->first_name }}</td>
        <td>{{ $customer->last_name }}</td>
        <td>{{ $customer->email }}</td>
        <td>{{ $customer->created_at }}</td>
        <td>{{ $customer->updated_at }}</td>
    </tr>
    @endforeach
    </tbody>
</table>
```
Bạn có thể tái sử dụng nó vào cùng một bảng excel
Bước 1. Tạo ra class Export
```
php artisan make:export CustomersFromView --model=Customer
```
Bước 2. Sử dụng FromView để thực hiện các thao tác
```
namespace App\Exports;

use App\Customer;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class CustomersExportView implements FromView
{
    public function view(): View
    {
        return view('customers.table', [
            'customers' => Customer::orderBy('id', 'desc')->take(100)->get()
        ]);
    }
}
```
Và sau đây là kết quả của file Excel:
![](https://images.viblo.asia/199361d1-3403-4816-a6ba-98a51fd9100e.png)
Chú ý: bạn chỉ có thể xuất từ bảng HTML, không bao gồm các thẻ <html>, <body>, <div>, ...

### Xuất sang PDF, HTML và những dạng khác
Mặc dù đây là package Laravel Excel, nhưng nó cũng cung cấp xuất sang nhiều định dạng hơn. Việc đó khá đơn giản, chỉ cần thêm bào một vài tham số cho lớp:
```
return Excel::download(new CustomersExport(), 'customers.xlsx', 'Html');
```
Và kết quả sẽ như sau:
![](https://images.viblo.asia/4a3dca33-a971-4542-8655-081ea599512e.png)
![](https://images.viblo.asia/a3e4cca0-fd6f-49f8-b1e8-0feec3bb1e53.png)
Không chỉ vậy, nó còn cho phép xuất ra PDF và bạn có thể chọn tới 3 thư vieejnj cho nó. Một lần nữa, tất cả những gì bạn cần là định nghĩa tham số cuối cùng:
![](https://images.viblo.asia/b64206ca-aa76-46ac-a9af-c2f1baae42be.png)
Chú ý: Bạn có thể lựa chọn 1 phiên bản pdf bằng cách chọn 1 package với composer:
```
composer require dompdf/dompdf
```
Sau đây là file PDF sau khi đã được xuất ra:
![](https://images.viblo.asia/99bc9db5-e082-4a35-9916-c8ff60319c2c.png)

### Format các ô theo cách bạn muốn
Package này kế thừa một package khá hay - [PhpSpreadsheet](https://github.com/PHPOffice/phpspreadsheet/)
Vì thế nó cho phép chúng ta làm rất nhiều việc bao gồm cả việc định dạng các cell theo nhiều cách khác nhau.
Bước 1: gọi chúng ở header class
```
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
```
Bước 2: Sử dụng WithEvents 
```
class CustomersExportStyling implements FromCollection, WithEvents 
{ 
    // ...
```
Bước 3: Tạo ra phương thức registerEvents() với sự kiện AfterSheet
```
/**
 * @return array
 */
public function registerEvents(): array
{
    return [
        AfterSheet::class    => function(AfterSheet $event) {
            // ... HERE YOU CAN DO ANY FORMATTING
        },
    ];
}
```
Sau đây là một ví dụ đầy đủ
```
/**
 * @return array
 */
public function registerEvents(): array
{
    return [
        AfterSheet::class    => function(AfterSheet $event) {
            // All headers - set font size to 14
            $cellRange = 'A1:W1'; 
            $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(14);

            // Apply array of styles to B2:G8 cell range
            $styleArray = [
                'borders' => [
                    'outline' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                        'color' => ['argb' => 'FFFF0000'],
                    ]
                ]
            ];
            $event->sheet->getDelegate()->getStyle('B2:G8')->applyFromArray($styleArray);

            // Set first row to height 20
            $event->sheet->getDelegate()->getRowDimension(1)->setRowHeight(20);

            // Set A1:D4 range to wrap text in cells
            $event->sheet->getDelegate()->getStyle('A1:D4')
                ->getAlignment()->setWrapText(true);
        },
    ];
}
```
Và kết quả của chúng ta đây:
![](https://images.viblo.asia/061d9acc-3bcb-4601-bd14-ae45f0514d72.png)
Chúng ta có thể tìm thêm nhiều ví dụ khác [tại đây](https://phpspreadsheet.readthedocs.io/en/develop/topics/recipes/)

### Ẩn đi một số trường từ Model
Thử tưởng tượng chúng ta có một bảng users như sau
![](https://images.viblo.asia/040b2423-d227-44e1-9d7b-59c432a7c311.png)
Nào chúng ta cùng xuát thử 1 bản PDF với vís dụ đơn giản như sau:
```
class UsersExport implements FromCollection
{
    public function collection()
    {
        return User::all();
    }
}
```
Và đây là kết quả, bạn có thể thấy nhiều trường đã không xuất hiện như password và remember_token:
![](https://images.viblo.asia/1c796dbb-ff6f-45f8-85b4-7665fb48613b.png)
Đây chính là lý do vì sao chúng bị ẩn đi trong file pdf
```
class User extends Authenticatable
{
    // ...

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
```

### Biểu thức
Một vài lúc chúng ta cần sử dụng tính toán trong bảng excel, thật may mắn chúng ta có thể làm việc đó với package này:
```
use App\Customer;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;

class CustomersExportFormulas implements FromCollection, WithMapping
{
    public function collection()
    {
        return Customer::all();
    }

    /**
     * @var Customer $customer
     * @return array
     */
    public function map($customer): array
    {
        return [
            $customer->id,
            '=A2+1',
            $customer->first_name,
            $customer->last_name,
            $customer->email,
        ];
    }
}
```

Vậy là mình đã giới thiêu sơ qua về package này, để hiểu hơn về nó các bạn có thể tìm hiểu [tại đây](https://laraveldaily.teachable.com/p/export-import-with-excel-in-laravel) nhé!