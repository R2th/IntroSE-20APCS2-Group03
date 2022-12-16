# Lời nói đầu
Xin chào các bác! lại là em đây :)) Em chắc nhiều bác khi  làm dự án đã được yêu cầu import dữ liệu file excel hoặc file csv vào database. Khi đó chúng ta thường sẽ nghĩ ngay đến các hàm xử lý mà php cung cấp sẵn như fopen để đọc file, fgetcsv để đọc file csv ... Tuy nhiên hôm nay em sẽ giới thiệu đến bạn 1 package hỗ trợ chúng ta đọc, xuất file excel hay file csv một cách rất dễ dàng và nhanh chóng. Và đó chính là maatwebsite/excel. Nhưng hôm nay em sẽ không làm import file bình thường mà em tập chung chủ yếu vào việc validate dữ liệu trong file import. Cùng bắt đầu  nhé!
# Khởi tạo project
đầu tiên thì các bác hãy tạo một project laravel mới
```sql
composer create-project --prefer-dist laravel/laravel test_import_csv_file "5.8.*"
```

# Tạo route
Sau khi install xong project thì các bác hãy vào file `web.php` và thêm như sau:
```javascript
use Illuminate\Http\Request;
...
Route::post('/import', function (Request $request) {
    return view('welcome');
})->name('import.csv');
```
để cho nhanh và thuận tiện thì em sử dụng luôn closure function ở route, không cần mất thời gian tạo controller =)) .
<br>
# Tạo view blade
Chắc chắn rồi, chúng ta cần một giao diện để thực hiện chức năng import dữ liệu. em tận dụng luôn file welcome.blade.php để thêm form import vào nhé:
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <form action="{{route('import.csv')}}" method="post" enctype="multipart/form-data">
                @csrf
                <input type="file" name="csv_file"></p>
                <button type="submit">Submit</button>
            </form>
        </div>
    </body>
</html>

```
 Giờ các bác chỉ cần config thêm database là chúng ta có thể bắt đầu thực hiên validate data từ file csv rồi.
 <br>
 # Tạo form request
 Tất nhiên rồi, để validate data records bên trong csv file thì trước tiên chúng ta cần phải validate file upload lên server trước đúng không nào.
Các bác hãy tạo một form request như sau:
```php
php artisan make:request ImportCsvFileRequest
```

Laravel sẽ tạo ra cho chúng ta file `ImportCsvFileRequest.php` với nội dùng như sau:
 ```
 <?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportCsvFileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'csv_file' => [
                'required',
                'file',
                'mimes:csv,txt',
            ],
        ];
    }
}

 ```
 # Cài đặt Laravel excel
 Ok, giờ chúng ta vào phần chính của bài viết ngày hôm nay thôi. Các bác vào [trang chủ](https://docs.laravel-excel.com/3.1/getting-started/) của laravel excel muốn tìm hiểu chi tiết hơn nhé. Tất nhiên rồi, để sử dụng được thì chúng ta phải install nó vào project.
 ```
 composer require maatwebsite/excel
 ```
  Vì chúng ta thực hiện chức năng import file nên cùng tạo file import:
  ```
  php artisan make:import UsersImport --model=User
  ```

  ```
  php artisan make:import ValidateCsvFile
  ```

  Chúng ta tạo ra 2 file import này làm gì? sao phải tạo tận 2 file import? thực ra cái tên của file đã nói lên mục đích của nói rồi. Nhưng chi tiết như nào các bác hãy chờ xem ngay sau đó nhé.
  Nôi dung của file `UsersImport.php`:
  ```
  <?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithChunkReading;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\Importable;
use App\User;

class UsersImport implements ToModel, ShouldQueue, WithChunkReading, WithStartRow
{
    use Importable;

    /**
     * @var errors
     */
    private $errors;

    /**
     * @var row
     */
    private $row = 1;

    /**
     * UsersImport constructor.
     * @param StoreEntity $store
     */
    public function __construct($errors = [])
    {
        $this->errors = $errors;
    }

    public function model(array $row)
    {
        if (array_key_exists(++$this->row, $this->errors)) {
            return null;
        }

        $validator = Validator::make($row, [
            '0' => [
                'required',
                'string',
                'max:255',
            ],
            '1' => [
                'required',
                'string',
                'email',
                'max:255',
            ],
            '2' => [
                'required',
                'string',
                'min:6',
            ],
        ]);

        if ($validator->fails()) {
            return null;
        }

        DB::beginTransaction();
        try {
            User::create([
                'name' => $row[0],
                'email' => $row[1],
                'password' => $row[2],
            ]);

            DB::commit();
        } catch (Exceptions $e) {
            DB::rollBack();
            Log::debug($e);
        }
    }

    public function chunkSize(): int
    {
        return 500;
    }

    public function startRow(): int
    {
        return 2;
    }
}
  ```

  file ValidateCsvFile.php

  ```
  <?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ValidateCsvFile implements ToCollection, WithStartRow
{
    /**
     * @var errors
     */
    public $errors = [];

    /**
     * @var isValidFile
     */
    public $isValidFile = false;

    /**
     * ValidateCsvFile constructor.
     * @param StoreEntity $store
     */
    public function __construct()
    {
        //
    }

    public function collection(Collection $rows)
    {
        $errors = [];
        if (count($rows) > 1) {
            $rows = $rows->slice(1);
            foreach ($rows as $key => $row) {
                $validator = Validator::make($row->toArray(), [
                    '0' => [
                        'required',
                        'string',
                        'max:255',
                    ],
                    '1' => [
                        'required',
                        'string',
                        'email',
                        'max:255',
                        // 'unique:users',
                    ],
                    '2' => [
                        'required',
                        'string',
                        'min:6',
                    ],
                ]);

                if ($validator->fails()) {
                    $errors[$key] = $validator;
                }
            }
            $this->errors = $errors;
            $this->isValidFile = true;
        }
    }

    public function startRow(): int
    {
        return 1;
    }
}

  ```

 và cuối cùng hàm route closure() bên file web.php cuối cùng của chúng ta sẽ như thế này:
 ```
 <?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ImportCsvFileRequest;
use App\Imports\UsersImport;
use App\Imports\ValidateCsvFile;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/import', function (ImportCsvFileRequest $request) {

    $validator = new ValidateCsvFile();
    Excel::import($validator, $request->file('csv_file'));
    if (count($validator->errors)) {
        $errors = [];
        foreach ($validator->errors as $key => $error) {
            $errors[$key] = $key;
        }
        (new UsersImport($errors))->queue($request->file('csv_file'));

        return redirect()->back()->with('error', 'row number ' . implode(',', $errors) . ' contain incorrect data');
    } elseif (!$validator->isValidFile) {
        return redirect()->back();
    }

    (new UsersImport())->queue($request->file('csv_file'));

    return redirect()->back();
})->name('import.csv');
 ```

 Mục đích của file ValidateCsvFile.php là chúng ra sẽ validate toàn bộ row có trong file, và với biến $errors chúng ta có thể hiển thị và  xác định được là row nào đang bị lỗi validate và từ đó để chúng ta có thể fix file một các thuận tiên.
 <br>
 Và với file UsersImport thì khi import vào theo từng row một thì chúng ta lại validate một lần nữa để bảo không thể pass những row với value invalid.
 <br>
 # Kết quả
 và đây là kết quả cuối cùng chúng ta đạt được:
 ![](https://images.viblo.asia/0a2c01e2-61f6-4fd6-a6c1-e737317003be.PNG)
 Vậy là chúng ta đã import thành công một file csv vào database với validate vô cùng dễ dàng.
 # Kết Luận
Vừa rồi em đã làm xong một demo khá đơn giản về validate dữ liệu khi chúng ta import vào từ file csv. Hi vọng có thể giúp các bác giải quyết phần nào vấn đề khi làm những task có liên quan đến import file. Nếu các bác có bất kỳ thắc mắc gì thì hãy commet xuống phía dưới. Trân thành cảm ơn!