## Mở đầu

Bài viết này sẽ hướng dẫn cách sử dụng cơ bản của Laravel Migration.

**Mục lục**

*Mở đầu*

*Môi trường*

*Add table để sử dụng trên Laravel*

*Rollback*

## Môi trường
### Laravel
```
 php artisan --version
 Laravel Framework 5.8.16
```
### Mysql
```
mysql> select version();
+-----------+
| version() |
+-----------+
| 5.7.28    |
+-----------+
1 row in set (0.00 sec)
```
## Add table và sử dụng trên Laravel
### ① Tạo Table 
- Chạy câu lệnh, nếu trả về Created Migration tức là đã tạo được.
```
$ php artisan make:migration create_tests_table
> Created Migration: yyyy_MM_dd_HHmms_create_tests_table
```
- File được tạo ra được đặt ngay dưới `project/database/migrations`.
- Theo ví dụ ghi trên thì đã tạo ra file có tên là『yyyy_MM_dd_HHmms_create_tests_table.php』
### ② Chỉnh sửa file Migration 
- Khi file đã được tạo, sẽ tiến hành thiết lập column muốn add thêm.
- Add thêm Name Column của varchar(128)
- Add thêm number của unsigned int
```
yyyy_MM_ddHHmmss_create_tests_table.php
class CreateTestsTable extends Migration
{
    public function up()
    {
        Schema::create('tests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 128)->nullable()
                ->comment('Name');          // varchar Character length 128 
            $table->integer('number')->nedned()
                ->comment('Number');          // int unsigned
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('tests');
    }
}
```
### ③ Chạy Migration file
- Khi run câu lệnh dưới đây sẽ migrate table đã tạo ở database.
```
$ php artisan migrate
> Migrating: YYYY_MM_DD_ddHHmmss_tests_table
> Migrated:  YYYY_MM_DD_ddHHmmss_tests_table
```
- Thử confirm phía Mysql xem đã migrate table được chưa.
```
mysql> DESCRIBE tests;
+------------+---------------------+------+-----+---------+----------------+
| Field      | Type                | Null | Key | Default | Extra          |
+------------+---------------------+------+-----+---------+----------------+
| id         | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| name       | varchar(128)        | YES  |     | NULL    |                |
| number     | int(10) unsigned    | NO   |     | NULL    |                |
| created_at | timestamp           | YES  |     | NULL    |                |
| updated_at | timestamp           | YES  |     | NULL    |                |
+------------+---------------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)
```
### ④ Tạo Model để sử dụng trên Laravel
- Thực hiện tạo Model từ command line.
```
$ php artisan make:model Models/Test
>Model created successfully.
```
- Nếu chạy OK thì `Test.php` được tạo ngay dưới `Project/app/Models/`.

## Rollback
- Có thể rollback file migration đã chạy. Ví dụ, trường hợp muốn back về batch 1 ở trạng thái đã chạy migrations như dưới này.
```
mysql> select * from migrations;
+----+-----------------------------------------------------+-------+
| id | migration                                           | batch |
+----+-----------------------------------------------------+-------+
| 1  | YYYY_MM_DD_HHIISS_create_test_logs                  |     1 |
| 2  | YYYY_MM_DD_HHIISS_create_sync_logs                  |     1 |
| 3  | YYYY_MM_DD_HHIISS_create_tests_table                |     2 |
| 4  | YYYY_MM_DD_HHIISS_add_column_check_type             |     3 |
+----+-----------------------------------------------------+-------+
```
- Để back về batch 1 thì cần back lại 2 batch, do đó, sẽ gắn thêm parameter vào ngay sau command `migration:rollback` để back về.
- Nếu chạy command mà không có parameter thì sẽ chỉ back về batch ngay trước đó.
```
$ php artisan migrate:rollback --step=2
> Rolling back: YYYY_MM_DD_HHIISS_add_column_check_type
> Rolled back:  YYYY_MM_DD_HHIISS_add_column_check_type
> Rolling back: YYYY_MM_DD_HHIISS_create_tests_table
> Rolled back:  YYYY_MM_DD_HHIISS_create_tests_table
```
- Confirm xem đã back về chưa.
```
mysql> select * from migrations;
+----+-----------------------------------------------------+-------+
| id | migration                                           | batch |
+----+-----------------------------------------------------+-------+
| 1  | YYYY_MM_DD_HHIISS_create_test_logs　　　　　　        |     1 |
| 2  | YYYY_MM_DD_HHIISS_create_sync_logs                  |     1 |
+----+-----------------------------------------------------+-------+
```
- Confirm xem còn table không, nếu không còn là đã rollback thành công.
```
mysql> DESCRIBE tests;
ERROR 1146 (42S02): Table 'tests' doesn't exist
```

****************************************************************************
*Link tham khảo:
https://qiita.com/MochiMochiChip/items/364a2674290543fdda9c*