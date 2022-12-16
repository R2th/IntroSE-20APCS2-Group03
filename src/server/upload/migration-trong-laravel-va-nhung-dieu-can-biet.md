![](https://images.viblo.asia/066e53d4-a186-4cc7-8201-7199f0f01a2c.jpeg)
Xin chào nhị vị huynh đệ!
Trong bài viết này mình xin giới thiệu đến các bạn 1 tính năng khá quan trọng trong Laravel, đó chính là Migration. Để xây dựng một project, trước tiên chúng ta phải xây dựng cơ sở dữ liệu cùng với dữ liệu mẫu để phục vụ cho quá trình phát triển chức năng cho project. Đối với php thông thường, bạn phải truy cập vào 1 hệ quản trị cơ sở dữ liệu nào đó để tạo CSDL bằng câu lệnh SQL hoặc bằng giao diện. Nhưng cách này khá là thủ công và bất tiện đối với 1 project có nhiều thành viên tham gia phát triển. Vậy để giải quyết vấn đề này Laravel đã cung cấp Migration và Seeder. Bài viết này mình sẽ chỉ nói về Migration để tìm hiểu kỹ hơn về Seeder có thế tham khảo [Tại đây](https://viblo.asia/p/seeder-va-model-factory-trong-laravel-gGJ59bDjKX2).
# I-Thế nào là migration?
Ta có thể hiểu Migration như 1 version control của database. Một tính năng giúp quản lý tất cả các phiên bản của database. Cho phép bạn thay đổi database, thay đổi trạng thái database. Giúp quản lý database 1 cách dễ dàng.
# II-Cấu hình database.
Muốn sử dụng được migration thì chúng ta phải cấu hình để Laravel có thể kết nối tới database. Laravel cung cấp 2 file cấu hình:
* Cấu hình trong file /.env (Thường sử dụng ở localhost)

* Cấu hình trong /config/database.php (Cấu hình thêm để chạy khi sản phẩm đã đưa thành production)

Sau đây mình sẽ giới thiệu qua về cách cấu hình. Để các ban nắm sơ qua và sau này có thể áp dụng khi cần thiết.
## 1.Cấu hình ở local.

Để cấu hình database ở local. Chúng ta vào file .env và thiết lập cài đăt như sau:

* name-host : bạn điền vào tên host, ở đây là localhost.
* name-database : bạn điền vào tên database mà bạn đã tạo.
* username-db : bạn điền vào username dùng để đăng nhập db, ở đây thường là root (mặc định đối với wamp hoặc xampp).
* password-db : bạn điền vào password dùng để đăng nhập db, ở đây thường là rỗng (mặc định đối với wamp hoặc xampp).

```php
APP_ENV=local
APP_DEBUG=true
APP_KEY=jnGIndjFo8F1i3PhgSfzodig50YoS4pc
 
DB_HOST=name-host
DB_DATABASE=name-db
DB_USERNAME=username-db
DB_PASSWORD=password-db
 
CACHE_DRIVER=file
SESSION_DRIVER=file
```
## 2.Cấu hình production.

Thiết lập cấu hình trong file config/database.php.
```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => 'mysql',

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
        ],

        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer set of commands than a typical key-value systems
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => 'predis',

        'default' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => env('REDIS_DB', 0),
        ],

        'cache' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => env('REDIS_CACHE_DB', 1),
        ],

    ],

];

```

Trong đó tại trường 'default' =>  'mysql', mysql là loại cơ sở dữ liệu bạn kết nối tới, bạn có thể thay đổi nó bằng sqlite, postgres,…

Sau đó thiết lập cấu hình cho loai cơ sở dữ liệu bạn chọn. Ở đây, chúng ta sài mysql. Chúng ta phải thiết lập cấu hình cho nó như sau.

* name-host : tên host của bạn
* name-database : tên cơ sở dữ liệu của bạn,
* username-db : username đăng nhập vào db,
* password-db : password đăng nhập vào db của bạn.
```php
'mysql' => [
			'driver'    => 'mysql',
			'host'      => env('DB_HOST', 'name-host'),
			'database'  => env('DB_DATABASE', 'name-database'),
			'username'  => env('DB_USERNAME', 'username-database'),
			'password'  => env('DB_PASSWORD', 'password-database'),
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
			'strict'    => false,
		],
```
# III-Sử dụng
## 1.Cách tạo file migration
Chúng ta có hai cách để tạo 1 file migration.

### Cách 1: Tạo thủ công bằng cách vào database/migrations tạo mới 1 file.

Thông thường thì ít khi sử dụng cách này.

### Cách 2: Tạo bằng câu lệnh command line

#### - Tạo migrations thông thường.
```
php artisan make:migration "ten_migrate"
```
####  - Tạo mới migrations cho bảng.
```
php artisan make:migration TenMigrate --create=TableName
```
####  - Tạo migrations chỉnh sửa bảng.
```
php artisan make:migration TenMigrate --table=TableName
```
***Ví du 1:*** Vậy thực tế sẽ như nào? Chúng ta cùng tạo mới 1 migration cho bảng categories với câu lệnh như sau : *php artisan make:migration createcategoriestable --create=categories*
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->increments('id');
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
        Schema::dropIfExists('categories');
    }
}
```
***Ví dụ 2:*** Chúng thử tạo 1 migration chỉnh sửa bảng với câu lệnh : *php artisan make:migration updatecategoriestable --table=categories*
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name_category')->nullable()->change();
            $table->string('description')->nullable()->change();
            $table->integer('parent_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name')->nullable()->change();
            $table->text('description')->nullable()->change();
            $table->dropColumn('parent_id');
        });
    }
}
```

Chúng ta thấy trong file migration có **function up()** và **function down()**  và để ý kỹ hơn chúng ta sẽ thấy hàm Facade Schema. Vậy chức năng của chúng để làm gì ?

- **Function up()** : Có tác dụng thực thi migration.

-Khi muốn tạo mới 1 column thì sẽ viết trong *function up()*.

-Như chúng ta thấy trong trường hợp update 1 column thì chúng ta sư dụng hàm *change()* , muốn sử dụng hàm change() ta phải cài thêm package tên là doctrine/dbal.

- **Function down()** : Có tác dụng thực thi đoạn lệnh rollback (trở về trước đó).

-Trong hàm này sẽ thực thi các câu lệnh đảo ngược với *function up()*.

-Đối với tạo mới bảng, thì mặc định *function down()* của nó sẽ là xóa bảng đó đi bằng lệnh : *Schema::dropIfExists('table_name')*.

-Đối với chỉnh sửa bảng thì trong *function down()* phải  viết các hàm ngược lại với *function up()*.
- **Hàm Facade Schema :**

Là hàm Facade mà Laravel hỗ trợ để thực hiện các chức năng như create, update, delete bảng.

-Tạo mới bảng:
```php
Schema::create('categories', function (Blueprint $table) {
//
}
```
-Chỉnh sửa bảng:
```php
 Schema::table('categories', function (Blueprint $table) {
 //
 }
```
-Đổi tên bảng: từ category thành categories
```php
Schema::rename('category', 'categories');
```
-Xóa bảng:
```php
Schema::dropIfExists('categories');
```

#### - Các câu lệnh tạo bảng hay dùng trong Migrations
| Câu Lệnh | Chú giải | 
| -------- | -------- |
| $table->bigIncrements('id');     | Tăng ID (primary key) sư dụng như "UNSIGNED BIG INTEGER".|
|$table->bigInteger('votes');| Cột tương đương với  BIGINT. |
|$table->boolean('confirmed');| Kiểu BOOLEAN .|
|$table->date('created_at');|	Tương đương kiểu date.|
|$table->dateTime('created_at');|Tương đương kiểu DATETIME.|
|$table->dateTimeTz('created_at');|	Tương đương với DATETIME (with timezone).|
|$table->decimal('amount', 8, 2);|	Cột tương đương DECIMAL với độ chính xác (tổng số) và tỷ lệ (chữ số thập phân).|
|$table->double('amount', 8, 2);|	Cột tương đương DOUBLE với độ chính xác (tổng số) và tỷ lệ (chữ số thập phân). |
|$table->enum('level', ['easy', 'hard']);|	Cột tương đương ENUM.|
|$table->float('amount', 8, 2);|	Cột tương đương FLOAT với độ chính xác (tổng số) và tỷ lệ (chữ số thập phân). |
|$table->geometry('positions');|	Cột tương đương GEOMETRY. |
|$table->geometryCollection('positions');|	Cột tương đương GEOMETRYCOLLECTION. |
|$table->increments('id');|	Cột tương đương tăng dần UNSIGNED INTEGER (khóa chính) .|
|$table->integer('votes');|Tương đương	INTEGER. |
|$table->ipAddress('visitor');|	Cột tương đương địa chỉ IP. |
|$table->json('options');|	Cột tương đương kiểu JSON. |
|$table->jsonb('options');|	Cột tương đương kiểu JSONB . |
|$table->lineString('positions');|	Cột tương đương kiểu LINESTRING . |
|$table->longText('description');| Cột tương đương kiểu	LONGTEXT. |
|$table->macAddress('device');|	Cột tương đương địa chỉ MAC.|
|$table->mediumIncrements('id');| Cột tương đương tự động gia tăng MEDIUMINT (khóa chính).|
|$table->mediumInteger('votes');| Cột tương đương kiểu MEDIUMINT. |
|$table->mediumText('description');| Cột tương đương kiểu MEDIUMTEXT . |
|$table->morphs('taggable');|	Thêm các cột tương đương taggable_idUNSIGNED BIGINT và taggable_typeVARCHAR|
|$table->multiLineString('positions');|	Cột tương đương MULTILINESTRING.|
|$table->multiPoint('positions');|Cột tương đương kiểu MULTIPOINT.|
|$table->multiPolygon('positions');| Cột tương đương  kiểu MULTIPOLYGON.|
|$table->nullableMorphs('taggable');|	Thêm các phiên bản cột morphs() không có giá trị.|
|$table->nullableTimestamps();|	Bí danh của phương thức timestamps().|
|$table->point('position');| Cột tương đương kiểu POINT.|
|$table->polygon('positions');| Cột tương đương kiểu POLYGON.|
|$table->rememberToken();|	Thêm một cột remember_token tương đương VARCHAR (100) .|
|$table->smallIncrements('id');|	Cột tương đương tự động gia tăng SMALLINT (khóa chính). |
|$table->smallInteger('votes');| Cột tương đương kiểu SMALLINT.|
|$table->softDeletes();|	Thêm  cột deleted_at tương đương TIMESTAMP có thể vô hiệu cho các lần xóa mềm.|
|$table->softDeletesTz();|	Thêm cột deleted_at tương đương TIMESTAMP (có múi giờ) có thể vô hiệu cho các lần xóa mềm.|
|$table->string('name', 100);|	Cột tương đương VARCHAR với độ dài tùy chọn.|
|$table->text('description');|Cột tương đương kiểu 	TEXT .|
|$table->time('sunrise');|	Cột tương đương kiểu TIME.|
|$table->timeTz('sunrise');	| Cột tương đương kiểu  TIME (có múi giờ) .|
|$table->timestamp('added_on');|	Cột tương đương TIMESTAMP.|
|$table->timestampTz('added_on');|	Cột tương đương TIMESTAMP (có múi giờ).|
|$table->timestamps();|	Thêm các cột rỗng created_at và updated_at tương đương TIMESTAMP.|
|$table->timestampsTz();|	Thêm các cột rỗng created_at và updated_at tương đương TIMESTAMP (có múi giờ). |
|$table->tinyIncrements('id');|	Cột tương đương tự động gia tăng TINYINT (khóa chính) .|
|$table->tinyInteger('votes');| Cột tương đương kiểu TINYINT .|
|$table->unsignedBigInteger('votes');|Cột tương đương kiểu	UNSIGNED BIGINT .|
|$table->unsignedDecimal('amount', 8, 2);|	Cột tương đương UNSIGNED DECEDAL với độ chính xác (tổng số) và tỷ lệ (chữ số thập phân). 

#### - Modifier Column

Ngoài những loại cột được liệt kê ở trên, thì còn có 1 số modifier cần sử dụng trong khi thêm cột vào cơ sở dữ liệu. Ví dụ muốn cột email  có giá trị là null thì ta sử dụng như sau: 
```php
Schema::table('users', function (Blueprint $table) {
    $table->string('email')->nullable();
});
```
Dưới đây là danh sách tất cả các thuộc tính sửa đổi cột.
|Modifier	|Description|
| -------- | -------- |
|->after('column')|	Đặt cột "sau" cột khác (MySQL)|
|->autoIncrement()|	Đặt các cột INTEGER làm tăng tự động (khóa chính)|
|->charset('utf8')|	Chỉ định một bộ ký tự cho cột (MySQL)|
|->collation('utf8_unicode_ci')|	Chỉ định collation cho cột (MySQL / SQL Server)|
|->comment('my comment')|	Thêm nhận xét vào cột (MySQL)|
|->default($value)|	Chỉ định giá trị "mặc định" cho cột|
|->first()	|Đặt cột "đầu tiên" trong bảng (MySQL)|
|->nullable($value = true)|	Cho phép (theo mặc định) giá trị NULL được chèn vào cột|
|->storedAs($expression)|	Tạo một cột được tạo được lưu trữ (MySQL)|
|->unsigned()|	Đặt các cột INTEGER là UNSIGNED (MySQL)|
|->useCurrent()|	Đặt cột TIMESTAMP để sử dụng CURRENT_TIMESTAMP làm giá trị mặc định|
|->virtualAs($expression)|	Tạo một cột virtual (MySQL)|
## 2.Cách chạy file migration

Sau khi tạo các migration chúng ta chạy nó bằng các câu lệnh thực thi như sau.
*  Chạy các migration:
```
php artisan migrate
```
*  Resest lại migration

Lệnh trên sẽ rollback toàn bộ CSDL của bạn hay đúng hơn là chạy toàn bộ function down() trong các file migration của bạn. 
```
php artisan migrate:resest
```
* Chạy lại migration

Lệnh này nhằm rollback toàn bộ CSDL đồng thời chạy lại luôn toàn bộ các file migrate của bạn
```
php artisan migrate:refesh
```
Lệnh này nhằm rollback toàn bộ CSDL đồng thời chạy lại luôn toàn bộ các file migrate đồng thời chạy tấy cả các seeder.
```
php artisan migrate:refresh --seed 
```
* Rollback migrate

Với lệnh này,toàn bộ file có batch mới nhất trong bảng migration sẽ chạy tất cả các **function down()** hay chính xác hơn là đảo ngược lại thay đổi mà nó tạo ra cho CSDL. Nếu bạn không định nghĩa nội dung cho function down thì lệnh rollback coi như không có hiệu lực đồng nghĩa với việc migration đó vẫn tồn tại trong cơ sở dữ liệu.
```
php artisan migrate:rollback
```
# IV-Kết luận
Đến đây mình hy vọng các bạn đã hiểu cách hoạt động của migration, cũng như áp dụng tạo migration thành công. Hẹn gặp các bạn trong bài viết tiếp theo. 
Hy vọng bài viết sẽ mang lại nhiều thú vị cho mọi người. Xin cảm ơn!
# V-Tài liệu tham khảo
[https://laravel.com/docs/5.6/migrations](https://laravel.com/docs/5.6/migrations)

[http://tuhocweb.com/tim-hieu-ve-migrations-trong-laravel-116.html](http://tuhocweb.com/tim-hieu-ve-migrations-trong-laravel-116.html)