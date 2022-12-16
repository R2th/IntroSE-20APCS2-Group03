<div align="center">
    
# Lời nói đầu
</div>

- Bài viết này xuất phát từ một bài toán cũng khá hay gặp trong thực tế, đó là khi quản lí của bạn hoặc các bộ phận `non-tech` trong công ty  muốn xem danh sách thống kê của hệ thống (danh sách người dùng/sản phẩm/...). Có 2 phương án có thể được sử dụng:
    - **Cách 1:** Bạn tạo tài khoản có quyền admin trên server product cho họ tự vào trang admin xem.
    - **Cách 2:** Bạn sẽ lấy từ CSDL, xuất ra file Excel để tiện cho việc tính toán, thống kê sau này.
- Nếu bạn chọn **cách 1**, bài toán được giải quyết trong 1 nốt nhạc và bạn cũng sẽ không cần phải đọc tiếp nữa đâu, còn nếu bạn chọn **cách 2**, bài viết này chính là thứ bạn cần. Và công cụ chúng ta sẽ sử dụng là package `maatwebsite/excel`.
- Và đây là một số ưu điểm mà **Laravel Excel** đưa ra:
    - Dễ dàng export/import collections ra file Excel.
    - Tự động chunking (chia nhỏ) collections để tổi ưu performance.
    - Đọc file Excel theo từng nhóm/khối (chunks).
    - Xử lí import theo từng batch.

<div align="center">
    
# Nội dung
</div>

<div align="center">
    
## Cài đặt 
</div>

- Trước khi tiến hành cài đặt thì chúng ta cùng xem qua một số requirement để lựa chọn phiên bản phù hợp nhé. Còn nếu bạn làm với mục đích tìm tòi học hỏi thì mình nghĩ cứ **phiên bản mới nhất** (tại thời điểm viết bài là phiên bản **3.1**) mà chiến thôi 


    | Version| Require Laravel | Require PHP | Support Time |
    | -------- | -------- | -------- | -------- |
    | 2.1     | <= 5.6     | <= 7.0     |Unsupported since 15-5-2018 |
    | 3.0    | ^5.5     | ^7.0     |Unsupported since 31-12-2018 |
    | 3.1     | ^5.5/^6.0     | ^7.1     |New features |

- Ngoài yêu cầu về phiên bản của PHP và Laravel thì còn một số yêu cầu khác như:
    - `PhpSpreadsheet`: ^1.6 (đối với version **3.1**)
    - PHP extension `php_zip` is enabled.
    - PHP extension `php_xml` is enabled.
    - PHP extension `php_gd2` is enabled.

- Khi đã đảm bảo rằng môi trường bạn cài đặt đã đáp ứng đủ các yêu cầu thì bạn có thể cài đặt thông qua composer với câu lệnh:
    ```bash
    composer require maatwebsite/excel
    ```
    
- Sau đó bạn kiểm tra trong file `config/app.php` phần providers và alias xem đã có Maatwebsite chưa, bình thường thì nó sẽ được tự động add vào sau khi chạy câu lệnh cài đặt:
    ```php:app.php
    'providers' => [
        /*
         * Package Service Providers...
         */
        Maatwebsite\Excel\ExcelServiceProvider::class,
    ]
    
    'aliases' => [
        ...
        'Excel' => Maatwebsite\Excel\Facades\Excel::class,
    ]
    ```

- Cuối cùng để publish config, chúng ta chạy câu lệnh bên dưới thì sẽ tạo ra một file config `config/excel.php` chứa các thiết lập cần thiết.
    ```bash
    php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"
    ```
    
<div align="center">
    
##  
</div>

<div align="center">
    
##  Export

</div>

- Để có thể thực hiện chức năng export ra file Excel, việc đầu tiên ta cần làm là tạo 1 class export trong thư mục `app\Exports`.
    - **Cách 1**: sử dụng câu lệnh
        ```bash
        php artisan make:export XxxExport --model=Xxx
        ```
    - **Cách 2**: tạo thủ công bằng tay theo đường dẫn `app\Exports`:
        ```XxxExport.php
        <?php

        namespace App\Exports;

        use App\Models\Xxx;
        use Maatwebsite\Excel\Concerns\FromCollection;

        class XxxExport implements FromCollection
        {
            public function collection()
            {
                return Xxx::all();
            }
        }
        ```

- Tiếp theo là thêm function export vào trong controller để thực hiện export file: 
     ```XxxController.php
        <?php

        namespace App\Http\Controllers;

        use App\Exports\XxxExport;
        use Maatwebsite\Excel\Facades\Excel;

        class XxxController extends Controller 
        {
            public function export() 
            {
                return Excel::download(new XxxExport, 'xxxx.xlsx'); //download file export
                return Excel::store(new XxxExport, 'xxxx.xlsx', 'disk-name'); //lưu file export trên ổ cứng
            }
        }
    ```

- Và 1 route để gọi controller đó
    ```route.php
    Route::get('xxxs/export/', 'XxxController@export');
    ```

- Bên trên là các bước đơn giản để có thể export file, ngoài ra, có thể bạn sẽ cần custom 1 số thứ ví dụ như:
    - **Định dạng file export:** mặc định thì phần đuôi file `.xlsx` sẽ xác định định dạng của file. Tuy nhiên bạn cũng có thể truyền thêm tham số để có thể  khai báo 1 cách rõ ràng hơn ntn 
        ```php
        return (new XxxExport)->download('xxx.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        //ngoài ra còn có các định dạng khác thường dùng như 
        // - \Maatwebsite\Excel\Excel::CSV
        // - \Maatwebsite\Excel\Excel::XLS
        // - \Maatwebsite\Excel\Excel::HTML
        ```
        
    - **Định dạng cột dữ liệu:**
        - Nếu bạn muốn tự động điều chỉnh độ rộng cột, bạn chỉ cần implement thêm `ShouldAutoSize`.
            ```php
            namespace App\Exports;

            use Maatwebsite\Excel\Concerns\ShouldAutoSize;

            class InvoicesExport implements ShouldAutoSize
            {
                ...
            }
            ```
        - Để định dạng dữ liệu đặc biệt (ngày tháng/tiền) thì bạn sẽ cần implement `WithColumnFormatting`.
            ```php
            class InvoicesExport implements WithColumnFormatting
            {
                public function columnFormats(): array
                {
                    return [
                        'B' => NumberFormat::FORMAT_DATE_DDMMYYYY,
                        'C' => NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE,
                    ];
                }
            }
            ```

    - **Viết test cho chức năng export:** nếu các bạn đã từng chật vật với automation test (unit/feature) thì anh em chắc chắn sẽ thích điều này vì trong document của Laravel Excel đã hướng dẫn viết test cho bạn rồi. Tất nhiên là bạn phải tự custom cho phù hợp với project của bạn nhé 
        ```XxxTest.php
        /**
        * @test
        */
        public function user_can_download_invoices_export() 
        {
            Excel::fake();

            $this->actingAs($this->givenUser())
                 ->get('/invoices/download/xlsx');

            Excel::assertDownloaded('filename.xlsx', function(InvoicesExport $export) {
                // Assert that the correct export is downloaded.
                return $export->collection()->contains('#2018-01');
            });
        }
        ```
        
<div align="center">
    
##  Import

</div>

- Import về cơ bản cũng tương tự với export, bao gồm tạo một import class trong thư mục `app\Imports\XxxxImport.php` và thêm function `import` vào trong controller như sau:
    ```XxxImport.php
    <?php

    namespace App\Imports;

    use App\Xxx;
    use Maatwebsite\Excel\Concerns\ToModel;

    class XxxImport implements ToModel
    {
        /**
         * @param array $row
         *
         * @return Xxx|null
         */
        public function model(array $row)
        {
            return new User([
               'name' => $row[0],
               'email' => $row[1], 
            ]);
        }
    }
    ```
    
    ```XxxController.php
    use App\Imports\XxxImport;
    use Maatwebsite\Excel\Facades\Excel;
    use App\Http\Controllers\Controller;

    class XxxController extends Controller 
    {
        public function import() 
        {
            Excel::import(new XxxImport, 'xxxx.xlsx');

            return redirect('/')->with('success', 'All good!');
        }
    }
    ```

- Tất nhiên thực tế sẽ không đơn giản như vậy mà bạn sẽ cần phải tuỳ chỉnh thêm một số chứ năng nữa:
    - **Validate dữ liệu:** có người từng nói với mình rằng, đừng baoh tin vào "người dùng". Đó là lí do vì sao bạn phải validate tất cả những gì mà người dùng nhập/submit vào hệ thống của bạn. Và khi import dữ liệu, thì bạn cũng sẽ phải validate dữ liệu trong sheet có hợp lệ hay không.
       
       Và để có thể validate dữ liệu các cột import dữ liệu, bạn sẽ cần thêm method `rule()` vào trong import class. Để tham khảo thêm nhiều rule khác, bạn có thể xem ở [đây](https://laravel.com/docs/master/validation#available-validation-rules).
       ```php
       public function rules(): array
        {
            return [
                '1' => Rule::in(['patrick@maatwebsite.nl']),
                // ngoài việc sử dụng số thứ tự các cột, bạn cũng có thể sử dụng tên cột để validate như sau: 
                'email' => Rule::in(['patrick@maatwebsite.nl']), //để sử dụng được tên cột, bạn cần implement thêm `WithHeadingRow` vào trong import class.
            ];
        }
       ```
       Ngoài ra, bạn cũng sẽ cần hiển thị thông báo validate message cho người dùng biết để thay đổi dữ liệu cho phù hợp với `customValidationMessages()`
       ```php
        public function customValidationMessages()
        {
            return [
                '1.in' => 'Custom message for :attribute.',
            ];
        }
       ```
    - **Progress Bar (trong command console):** đây cũng là 1 chức năng khá hay, đối với việc import lượng dữ liệu lớn, bạn sẽ cần phải theo dõi xem quá trình import đã thực hiện được đến đâu thay vì phải ngồi chờ trong vô vọng mà ko biết phải chờ đến bao giờ :D. Đầu tiên, bạn cần phải implement `WithProgressBar` vào trong import class ở đường dẫn `app\Imports\XxxImport`, sau đó tạo một command để chạy chức năng import, ví dụ như sau:
        ```php
        <?php

        namespace App\Console\Commands;

        use App\Imports\UsersImport;
        use Illuminate\Console\Command;

        class ImportExcel extends Command
        {
            protected $signature = 'import:excel';

            protected $description = 'Laravel Excel importer';

            public function handle()
            {
                $this->output->title('Starting import');
                (new UsersImport)->withOutput($this->output)->import('users.xlsx');
                $this->output->success('Import successful');
            }
        }
        ```
        Và khi bạn gõ lệnh `php artisan import:excel` để thực hiện quá trình import, bạn sẽ thấy tiêu đề `Starting import`, thanh `progress bar` và thông báo thành công sau khi import (nếu ko có lỗi) `Import successful`.
    - **Viết test:** tương tự như phần export thì Laravel Excel cũng đã cung cấp test mẫu cho phần Import, bạn có thể tham khảo ở trong link document nhé, mình sẽ không liệt kê lại trong đây nữa.
    
<div align="center">
    
# Lời kết
</div>

Bản thân mình thấy đây là một chức năng khá cần thiết khi bạn cần import/export dữ liệu, data một cách nhanh chóng. Nếu bài viết có ích, hãy upvote ủng hộ mình nhé. Còn nếu bạn thấy còn điều gì "lấn cấn", hãy comment xuống phía dưới để chúng ta cùng thảo luận nhé!

Cảm ơn các bạn đã dành thời gian ủng hộ bài viết của mình!

<div align="center">
    
# Tài liệu tham khảo
</div>

- Laravel-excel: https://docs.laravel-excel.com/3.1/getting-started/
- https://www.google.com/