# I.Đặt vấn đề
Ngày nay, khi làm một ứng dụng web chắc hẳn nhiều bạn đã từng nghĩ đến việc việc nhập và xuất dữ liệu vào database thông qua các file như excel, csv (nhập danh sách sản phẩm, bài viết, người dùng...) bởi nó giúp chúng ta dễ dàng thêm cũng như lấy dữ liệu từ trang web. Trong bài viết ngày hôm nay mình sẽ giới thiệu đến các bạn package `Maatwebsite/Laravel-Excel`, thứ có thể đáp ứng được hết những nhu cấu mình nêu ở trên với rất nhiều tính năng đi kèm.

Phiên bản mình dùng sẽ là phiên bản 3.1 và dưới đây mình sẽ hướng dẫn dựa trên các ví dụ nhỏ, giúp các bạn dễ hình dung trong việc tìm hiểu về package. Bắt đầu thôi nào :) 

# II.Cài đặt
## 1.Yêu cầu
* PHP: ^7.0
* Laravel: ^5.5
* PhpSpreadsheet: ^1.6
* PHP extension: php_zip, php_xml, php_gd2


| Version | Laravel Version | Php Version | Support |
|---- |----|----|----|
| 2.1 | <=5.6 | <=7.0 | Unsupported since 15-5-2018 |
| 3.0 | ^5.5 |  ^7.0 | Unsupported since 31-12-2018 |
| 3.1 | ^5.5\|^6.0 |  ^7.1 | New features |

## 2.Cài đặt package
Đầu tiên, ta ghõ dòng lệnh này vào terminal 
```
composer require maatwebsite/excel
```

Thêm provider và alias vào trong file `config/app.php`
```
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]
```
```
'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```
Việc tiếp theo là publish file config của package bằng câu lệnh
```
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"
```
Câu lệnh trên sẽ tạo ra file config `excel.php` vào trong thư mục config và đó cũng là bước cuối cùng để cài đặt package `Maatwebsite/Laravel-Excel` rồi,  giờ chúng ta sang phần tiếp theo là tìm hiểu những chức năng hay ho mà package này đem lại cho chúng ta thôi :)

# III.Tìm hiểu về tính năng xuất dữ liệu `export`
Đối với công việc `import`/`export` dữ liệu ra file Excel, package `Maatwebsite/Laravel-Excel` cung cấp cho chúng ta rất nhiều tính năng như xuất file với nhiều định dạng, export format, mapping data, xuất file qua view blade,... nhưng trong bài viết này mình chỉ liệt kê một số chức năng cơ bản mà mình hay sử dụng và mình nghĩ đủ để đáp ứng nhu cầu của các bạn <33
## 1. Xuất một file
Việc đầu tiên là chúng ta sẽ tạo thư mục `app\Exports`

Tiếp theo bạn gõ câu lệnh sau vào terminal:
```
php artisan make:export UsersExport --model=User
```
Sau khi chạy câu lệnh trên sẽ tạo ra 1 file trong thư mục `app\Export` có tên là `UserExport.php`, bạn sửa file đó với nội dung như sau:
```
<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UserExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return User::all();
    }
    //Thêm hàng tiêu đề cho bảng
    public function headings() :array {
    	return ["STT", "Tên tài khoản", "Email", "Loại"];
    }
}

```

Trong file `app\Http\Controllers\UserController.php` ta thêm hàm `export()`
```
...
use App\Exports\UserExport;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
```
Bạn có thể thay phần đuôi file trong `users.xlsx` để lấy về định dạng file mong muốn như `.xls`, `.csv`, `.ods`, `.html`, ...

Trong `routes\web.php`:
```
Route::get('users/export/', 'UsersController@export');
```
Như vậy, sau khi vào đường dẫn `user/export` thì ta sẽ nhận được một file có tên `users.xlsx` đã tạo ở trên. Trong file nhận được ở trên đã có thông tin của tất cả các trường của tất cả các `user` hiện đang có trong database.
| STT | Tên tài khoản | Email | Loại |  
|---- |----|----|----|
| 1 | 17020907 | asd@asd.com | 0 |
| 2 | 17020908 | asd@asd.com | 0 |
| 3 | 17020909 | asd@asd.com | 0 |
| ... | ... | ... | ... | ... |

## 2. Lấy dữ liệu theo điều kiện
Ở phần trên mình đã hướng dẫn export ra một file chứa tất cả user, bây giờ chúng ta sẽ export ra một file chỉ chứa thông tin của một user hoặc một số user

Trong file `UserExport.php`, ta thêm hàm `__construct()`:
```
class ClassDetailExport implements FromCollection
{
    public function __construct(int $id) {
    	$this->id = $id;
    }

    public function collection()
    {
        return ClassSubject::findOrFail($this->id);
    }
}
```

Trong `UserController.php` ta sửa như sau:
```
class UserController extends Controller {
    public function exportDetailExcel($id) 
    {
        $user = User::findOrFail($id);
        $file = Excel::download(new UserExport($id), $user->name.'.xlsx');
        return $file;
    }
}
```
Trong `routes\web.php`:
```
Route::get('export/user/{user}', 'UserController@export');
```
Vậy là bạn có thể xuất ra những file chứa `user` theo id cho trước, với các điều kiện khác các bạn làm tương tự các bước trên nhé.

## 3. Xuất file dựa theo `view` của laravel
Như mình đã nói, package này cung cấp cho chúng ta rất nhiều tính năng hữu ích trong đó có tính năng xuất file dựa trên view `.blade.php`. Theo cá nhân mình thấy tính năng này giúp cho chúng ta dễ dàng tạo ra những bảng dữ liệu theo ý mình hơn cách ở trên. 

Trong file `UsersExport.php`, bạn implements `FromView`:
```
namespace App\Exports;

use App\User;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class UsersExport implements FromView
{
    public function view(): View
    {
        return view('exports.users', [
            'users' => User::all()
        ]);
    }
}
```
Tạo file `users.blade.php` chứa thông tin của các `user`, package sẽ tự động chuyển đổi bảng `html` thành bảng `excel`:
```
<table>
    <thead>
    <tr>
        <th>STT</th>
        <th>Tên tài khoản</th>
        <th>Email</th>
        <th>Loại</th>
    </tr>
    </thead>
    <tbody>
    @foreach($users as $user)
        <tr>
            <th>{{ $loop->index+1 }}</th>
            <td>{{ $user->username }}</td>
            <td>{{ $user->email }}</td>
            <td>{{ ($user->type == 0) ? 'Sinh viên' : 'Admin' }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
```
Trong file `UserController.php` bạn sửa lại hàm `export()`
```
public function export() 
{
    return Excel::download(new UsersExport, 'users.xlsx');
}
```
## 4. Tạo các trang tính `sheet`
Chắc hẳn các bạn đều biết đến `sheet` của Excel, nó là các tab giúp chúng ta quản lý và thao tác với dữ liệu một cách dễ dàng hơn. Dưới đây mình sẽ hướng dẫn các bạn chia các `sheet` thông qua ví dụ lấy các tài khoản theo từng tháng tham gia rồi chia vào các `sheet`.

Trong file `UsersExport.php`
```
namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class UsersExport implements WithMultipleSheets
{
    use Exportable;

    protected $year;
    
    public function __construct(int $year)
    {
        $this->year = $year;
    }

    public function sheets(): array
    {
        $sheets = [];

        for ($month = 1; $month <= 12; $month++) {
            $sheets[] = new UsersPerMonthSheet($this->year, $month);
        }

        return $sheets;
    }
}
```

Tạo file `UsersPerMonthSheet.php`, bạn có thể để implements `FromQuery`, `FromCollection`, `FromView`...
```
namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithTitle;

class UsersPerMonthSheet implements FromQuery, WithTitle
{
    private $month;
    private $year;

    public function __construct(int $year, int $month)
    {
        $this->month = $month;
        $this->year  = $year;
    }

    public function query()
    {
        return User
            ::query()
            ->whereYear('created_at', $this->year)
            ->whereMonth('created_at', $this->month);
    }

    public function title(): string
    {
        return 'Month ' . $this->month;
    }
}
```
Thêm hàm export() trong controller  `UserController.php`:
```
public function export() 
{
    return (new UsersExport(2019))->download('users.xlsx');
}
```

# IV. Tìm hiểu về tính năng nhập dữ liệu `import`
## 1. Nhập một file
Việc đầu tiên là chúng ta sẽ tạo thư mục `app\Imports`

Tạo file import bằng cách gõ câu lệnh sau vào terminal:
```
php artisan make:import UsersImport --model=User
```
Trong file `UsersImport.php`:
```
namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UserImport implements ToModel, WithHeadingRow
{
    public function headingRow() : int
    {
        return 1;
    }
 
    public function model(array $row)
    {
        return new User([
            'username' => $row['username'] ?? $row['ten_tai_khoan'],
            'email' => $row['email'],
            'password' => Hash::make($row['password'] ?? $row['mat_khau'],
            'type' => $row['type'] ?? $row['loai']
        ]);
    }
}
```
Ở trên, hàm `headingRow()` có mục đích là sẽ loại bỏ những dòng tiêu đề của bảng, hàm sẽ trả về số hàng mà bạn bỏ qua, như ví dụ ở trên thì mình sẽ bỏ qua hàng chứa thông tin của cột như tên tài khoản, email, mật khẩu... Package cho phép chúng ta sử dụng các từ khóa ở phần tiêu đề để làm khóa mảng của mỗi hàng. Ví dụ trên mình nhập dữ liệu cho thuộc tính username dựa trên cột username hoặc tên tài khoản.

**Lưu ý:** 
* Nếu trong file Excel cột của bạn có tên là "Tên tài khoản" thì trong file import sẽ là `$row['ten_tai_khoan']`
* Nếu bạn nhập dữ liệu có định dạng là ngày tháng từ trong file Excel mà gặp lỗi thì hãy thử giải quyết bằng cách này, mình đã từng bị và sửa lỗi khá hiệu quả :D 
```
 'birthday' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['birthday'] ?? $row['ngay_sinh'])->format('Y-m-d')
```

Trong `UserController.php`:
```
...
use App\Imports\UserImport;

class UserController extends Controller
{
...
    public function import() 
    {
        $import = Excel::import(new UserImport, request()->file('user_file'));
        return redirect()->back()->with('success', 'Success!!!');
    }
}
```

Trong file `user.blade.php`:
```
<form action="{{URL::to('import/user')}}" method="POST" enctype="multipart/form-data">
    {{ csrf_field() }}
    <label for="user-file">
        <div class="btn sbold green"> Add
            <i class="fa fa-plus"></i>
        </div>
    </label>
    <input id="user-file" type="file" name="user_file" class="hidden" accept=".xlsx, .xls, .csv, .ods">
    <button type="submit">Import</button>
</form>
```
                 

Trong `routes\web.php`:
```
Route::post('import/user', 'UserController@import');
```

## 2.Batch inserts
Khi bạn nhập một tệp lớn đồng nghĩa với việc một số lượng lớn các hàng sẽ được nhập từ đó dẫn đến hậu quả là bị nghẽn hay gọi là thắt cổ chai và điều đó sẽ làm ảnh hưởng đến công việc nhập dữ liệu. Bằng cách implements *WithBatchInserts* chúng ta sẽ giải quyết được vấn đề đó bằng cách quyết định số lượng dòng sẽ được nhập vào database mỗi lần.
```
use Maatwebsite\Excel\Concerns\WithBatchInserts;

class UsersImport implements ToModel, WithBatchInserts
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function batchSize(): int
    {
        return 1000;
    }
}
```

## 3.Chunk reading
Khác với phần trên, chunk reading sẽ quyết định số lượng dòng sẽ đọc mỗi lần thay vì đọc tất cả rồi lưu tạm vào bộ nhớ, từ đó việc sử dụng bộ nhớ sẽ giảm đi, giúp việc kiểm soát bộ nhớ được tốt hơn.
```
use Maatwebsite\Excel\Concerns\WithChunkReading;

class UsersImport implements ToModel, WithChunkReading
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function chunkSize(): int
    {
        return 1000;
    }
}
```

Trên đây là một vài tính năng cơ bản và ữu ích mà package `Maatwebsite/Laravel-Excel` đã đem lại, giúp ích khá nhiều trong việc nhập xuất dữ liệu với Excel. Nếu bạn muốn tìm hiểu thêm các tính năng khác thì hãy đọc docs của Maatwebsite link mình để ở dưới.

Hy vọng bài viết này sẽ giúp ích được cho các bạn phần nào khi làm việc với các file như excel, ods, csv... Cảm ơn các bạn đã kiên nhẫn đọc đến cuối bài viết :)

# Tài liệu tham khảo
https://docs.laravel-excel.com/3.1