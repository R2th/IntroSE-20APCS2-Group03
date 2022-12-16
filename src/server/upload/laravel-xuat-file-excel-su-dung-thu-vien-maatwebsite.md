Hello anh em! 
Nay mình sẽ giới thiều với mọi người thư viện maatwebsite để sử lý việc export file excel trong project laravel nào cũng bắt tay vào tạo project test thử nhé.
# Cài đặt project laravel
Vào forder muốn đặt dự án và chạy lệnh dưới đây để tạo 1 prj laravel tên project là excel nhé. Nếu lỗi  'Permission' thì chạy bằng quyền sudo là được.<br>
`$ composer create-project --prefer-dist laravel/laravel excel`
Sau đó tạo DB và chỉnh sửa file .env để kết nối DB nhé
```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=excel
DB_USERNAME=root
DB_PASSWORD=
```
Chạy lệnh để generate key <br>
`$ php artisan key:generate`<br>
Chạy migrate để tạo bảng user<br>
`$ php artisan migrate`<br>
![](https://images.viblo.asia/d03d6dbb-0877-4e73-9bbe-78f6a2119e98.png)

Vậy là đã tạo xong project laravel, tiếp theo chúng ta tạo dữ liệu mẫu cho bảng user để tý nữa mình test export nhé.<br>
**Bước 1:** Tạo 1 seeder mới cho bảng users có tên là UsersTableSeeder.php<br>
`$ php artisan make:seeder UsersTableSeeder`<br>
**Bước 2:** Giờ đây chúng ta đã có 1 file UsersTableSeeder.php trong thư mục database/seeds/ . trong function chúng ta sẽ thêm câu lệnh để chạy factory<br>
`factory(User::class, 100)->create();`<br>
và nhớ use model User vào nhé.
UsersTableSeeder.php hoàn chỉnh sẽ như sau:
``` php
<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 100)->create();
    }
}
```
Tiếp theo đăng ký seed UsersTableSeeder ở file DatabaseSeeder.php, file DatabaseSeeder.php, hoàn chỉnh sẽ như sau:
``` php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(Users::class);
    }
}
```
Xong rồi, giờ chúng ta chạy lệnh:
`php artisan db:seed`
vào db kiểm tra sẽ có 100 bản ghi mẫu trong bảng user rồi, giờ chúng ta bắt đầu test export nhé.
# Cài đặt thư viên maatwebsite
chạy lệnh sau để cài đặt thư viện
`composer require maatwebsite/excel`
Chạy lệnh sau để pulish config
`php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"`<br>
![](https://images.viblo.asia/eaeae0a0-c7c0-4e80-813d-a9895018453d.png)

# Export
* Tạo route để khi gọi đến route này sẽ export ra file
    `Route::get('export', 'ExportController@export')->name('export');`
* Tạo Controller 
   ` php artisan make:controller ExportController`
* chạy câu lệnh bên dưới, mình tạo một file tên là UsersExport để sử lý việc export
    `php artisan make:export UsersExport --model=User`
* Sau khi chạy câu lệnh bên trên, sẽ tạo cho ta file UsersExport.php trong App\Exports\UserExport.php , Sửa file thành như sau
``` php
namespace App\Exports;
 
use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
class UsersExport implements FromCollection,WithHeadings,WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::all();
       
    }
    /**
     * Returns headers for report
     * @return array
     */
    public function headings(): array {
        return [
            'ID',
            'Name',
            'Email',    
            "Created",
            "Updated"
            
        ];
    }
 
    public function map($user): array {
        return [
            $user->id,
            $user->name,
            $user->email,
            $user->created_at,
            $user->updated_at
        ];
    }
}
```
Giải thich file trên nhé
- Mình use App\User để sử dụng Eloquent trong Laravel, 
- Dùng class của Maatwebsite\Excel để sử dụng chức năng export
- Hàm headings(): tạo các cột tiêu đề
- Hàm Map($user): map những giá trị cần xuất ra với heading
- Tiếp theo ta sẽ cài đặt ở file Controller để có thể sử dụng file UsersExport.php, use App\UsersExport đển UserController.php
* Tiếp theo sửa controller
``` php
<?php

namespace App\Http\Controllers;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function export()
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
```
Vậy là xong rồi, truy câp vào đường dẫn đã tạo ở trên chúng ta sẽ xuất được ra 1 file users.xlsx rồi nhé, bạn có thể thay đổi định dạng file xuất thành users.csv hay tsv.
Cảm ơn mn đã quan tâm :))!