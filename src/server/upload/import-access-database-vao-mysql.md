Bài viết này mình xin giới thiệu với các bạn làm sao để đọc được ms access database để import nó vào database mysql. Trong bài viết này mình sẽ sử dụng laravel để code ví dụ.

## Cài đặt
Có thể tóm tắt cách làm của chúng ta có 2 bước chính:
- 1 là cần export cái access db ra file csv.
- 2 là laravel excel đọc trực tiếp từ file csv để import vào databse mysql.

> Nếu là windown thì có thể đọc trực tiếp access db là ko cần convert sang csv, nhưng hiện nay chắc ít server dùng hệ điều hành windown nên mình chỉ hướng dẫn những hệ điều hành dùng linux mà thôi

trước tiên chúng ta cần cài các package cần thiết để thực hiện đọc được dữ liệu từ access database.

1. Trước tiên cài laravel excel `maatwebsite/excel`
```bash
composer require maatwebsite/excel
```

ngoài ra laravel excel required những package sau của php:

```
PHP: ^7.0
Laravel: ^5.5
PhpSpreadsheet: ^1.6
PHP extension php_zip enabled
PHP extension php_xml enabled
PHP extension php_gd2 enabled
```

các bạn có thể tham khảo ở đây https://docs.laravel-excel.com/3.1/getting-started/installation.html

2. Cài đặt mdbtools để export access db sang csv

```bash
sudo apt install mdbtools
```
mdbtools này có cách dùng khá đơn giản với một số lệnh cần dùng như sau:

```
mdb-tables link_to_database.accdb # hiển thị tất cả tên tables có trong databses
mdb-export link_to_database.accdb ten_table > ten_table.csv   # export table ten_table ra csv
```

Các bạn có thể tham khảo docs của mdbtools ở đây: https://github.com/brianb/mdbtools 

## Code

đầu tiên chúng ta cần convert file acccess db sang file csv:

```php
 protected function convertAccessDbToCsv()
    {
        try {
            $pathAccessDB = "patch_to_access_db/db_name.accdb"; // thay chỗ này
            $table = "users";
            $patchSaveCsv = "patch_save_file_csv/users.csv"; // thay chỗ này
            $command = "mdb-export {$pathAccessDB} {$table} > $patchSaveCsv";
            exec($command);
            if (file_exists($patchSaveCsv)) {
                Excel::import(new UsersImport, '$patchSaveCs'); ## gọi đến class UsersImport sau khi file được tạo ra
            }
        } catch (\Exception $exception) {
            report($exception);
        }
    }
```


Chúng ta tạo 1 file `UserImport.php` có nội dung như sau:

```php
namespace App\Imports;

use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class UsersImport implements ToCollection, WithChunkReading, WithBatchInserts, WithProgressBar, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) 
        {
            User::create([
                'name' => $row[0],
            ]);
        }
    }
}

  public function chunkSize(): int
    {
        return 5000;
    }

    public function batchSize(): int
    {
        return 5000;
    }
```


## Tham khảo

- https://docs.laravel-excel.com/