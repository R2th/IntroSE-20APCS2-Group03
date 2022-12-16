# **1.What is Laravel Seeding and Laravel Migration ?**
Laravel Seeding là một class chứa code để tạo ra các dummy data (dữ liệu mẫu) cho **database** trong quá trình xây dựng ứng dụng

Laravel Migration là một chức năng giống như một control **database** có tác dụng quản lý cũng như lưu trữ lại cấu trúc của **database** giúp cho việc sửa đổi database trở lên dễ dàng hơn.

# **2.Trouble**
Trong quá trình phát triển ứng dụng thì việc **migration** và **seeder** là hầu như anh em nào cũng trải qua, ví dụ như chúng ta chạy câu lệnh dưới: 

```
php artisan migrate:fresh --seed
```

**Command Line** này xóa tất cả các bảng và thực hiện lại tất cả **Migration** , tiếp đến sẽ **seeder** lại dữ liệu dummy của Database.

Nhưng có 1 vấn đề xảy ra là khi xóa  các table là các bản ghi cũ có thể vẫn còn hoặc bạn không thể xóa chúng đúng cách do các ràng buộc về khóa ngoại. (**foreign key constraints**)

Nếu **Project** của bạn hơn 20 table thì làm sao để xử lý chúng ? 

# **3.Solutions**

Để xử lý vấn đề trên thì mình sử dụng **package** sau : 
```
$  composer require doctrine/dbal
```

Đó là một thư viện phải có nếu bạn muốn thay đổi lại định nghĩa **table**. Sau khi **install** thì chúng ta tiến hành theo các bước sau :

* **Tạo 1 Seeder**

```
php artisan make:seeder TruncateAllTables
```

* **Overwrite code vào file vừa tạo**

```
<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TruncateAllTables extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema:: disableForeignKeyConstraints();

        foreach ($this->getTargetTableNames() as $tableName) {
            DB:: table($tableName)->truncate();
        }

        Schema:: enableForeignKeyConstraints();
    }

    /**
     * @return mixed
     */
    private function getTargetTableNames(): array
    {
        $excludes = ['migrations'];
        return array_diff($this->getAllTableNames(), $excludes);
    }

    /**
     * @return array
     */
    private function getAllTableNames(): array
    {
        return DB:: connection()->getDoctrineSchemaManager()->listTableNames();
    }
}

```
* **Register nó với  DatabaseSeederclass.**

```
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TruncateAllTables::class);
    }
}
```

* **Execute Command**
```
php artisan db:seed --class=TruncateAllTables
```

Database seeding completed successfully.

Hy vọng với cách này có thể giúp anh em giải quyết được vấn đề truncate nhiều table nhưng bị ràng buộc bởi **foreign key constraints** !

Thân ái chào tậm biệt, quyết thắng !