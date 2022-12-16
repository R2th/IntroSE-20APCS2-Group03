Trong rất nhiều trường hợp dự án của chúng ta yêu cầu phải sử dụng nhiều kết nối cơ sở dử liệu trong cùng một ứng dụng, chúng ta sẽ làm việc này với ứng dụng Laravel như thế nào?


-----


## Chuẩn bị
Chúng ta sẽ sử dụng 3 database khác nhau, trong đó 2 database sử dụng MYSQL và 1 sử dụng SQL Server:
1. Database `laramultidb` với connection name là `mysql` sử dụng MySQL engine.
2. Database `laramultidb2` với connection name là `mysql2` sử dụng MySQL engine.
3. Database `laravelmultidb` với connection name là `sqlsrv` sử dụng SQL Server Engine.

Đây là file `config/database.php`:
```php
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

    'mysql2' => [
        'driver' => 'mysql',
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '3306'),
        'database' => env('DB_DATABASE2', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'unix_socket' => env('DB_SOCKET', ''),
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'strict' => true,
        'engine' => null,
    ],
    'sqlsrv' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST_SQLSRV', 'localhost'),
        'port' => env('DB_PORT_SQLSRV', '1433'),
        'database' => env('DB_DATABASE_SQLSRV', 'forge'),
        'username' => env('DB_USERNAME_SQLSRV', 'forge'),
        'password' => env('DB_PASSWORD_SQLSRV', ''),
        'charset' => 'utf8',
        'prefix' => '',
    ],

],
```
 Và file `.env`:
 ```
 DB_CONNECTION=mysql
 DB_HOST=127.0.0.1
 DB_PORT=3306
 DB_DATABASE=laramultidb
 DB_USERNAME=yourusername
 DB_PASSWORD=secret
 
 DB_DATABASE2=laramultidb2
 
 DB_HOST_SQLSRV=127.0.0.1
 DB_PORT_SQLSRV=1433
 DB_DATABASE_SQLSRV=laravelmultidb
 DB_USERNAME_SQLSRV=sa
 DB_PASSWORD_SQLSRV=secret
 ```

## Migration & Model
Khi muốn tạo migration cho cho database nào thì define connection name của database đó trong `Schema`:
 
```php
/**
 * Run the migrations.
 *
 * @return void
 */
public function up()
{
    Schema::connection('mysql2')->create('types', function (Blueprint $table) {
        $table->increments('id');
        $table->string('code')->index();
        $table->string('name');
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
    Schema::connection('mysql2')->drop('types');
}
```
File migration trên sẽ migrate table `types` vào connection `mysql2` với DB name là `laravmultidb2` , nếu không define connection name, Laravel sẽ sử dụng connection mặc định.
 
Để chỉ định connection trong model, hãy sử dụng attribute `$connection`:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $connection = 'mysql2';
}
```

## Relationship giữa các database
Yêu cầu:
```
Type (connection: mysql2) has many Post (connection: mysql)

Type (connection: mysql2) has many Mail (connection: sqlsrv)
```
Chúng ta hoàn toàn có thể làm được việc này thông qua model, chỉ định connection bằng attribute `$connection`:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $connection = 'mysql2';

    /**
     * one to many relationship with Post (mysql connection)
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'type_code', 'code');
    }

    /**
     * one to many relationship with Mail (sqlsrv connection)
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function mails()
    {
        return $this->hasMany(Mail::class, 'type_code', 'code');
    }
}
```

Model `Post` cũng tương tự:
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mail extends Model
{
    protected $connection = 'sqlsrv';

    /**
     * override date format since SQL server has own date format for timestamp fields
     * @var string 
     */
    protected $dateFormat = 'Y-m-d H:i:s';

    /**
     * one to many inversion relationship with Type (mysql2 connection)
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(Type::class, 'type_code', 'code');
    }
}
```

Seed dummy data vào các table và sử dụng tinker để test, wow, nó đã hoạt động:

![](https://images.viblo.asia/37ab08b1-bdc1-4f36-8a5c-b30b5d73e973.png)

Vậy là sử dụng relationship giữa các connection khác nhau đã thành công mỹ mãn.

## Join
Chúng ta sẽ chỉ định connection cho table thì mới thực hiện join được, nếu không sẽ báo lỗi:
```php
Post::join('laramultidb2.types as db2type', 'posts.type_code', '=', 'db2type.code')->first()
```

![](https://images.viblo.asia/2f9ca85e-9cee-475e-aa18-54743c3bf2e9.png)

Thay vì sử dụng model, chúng ta có thể sử dụng Query Builder:

![](https://images.viblo.asia/6155942c-38d5-4360-8701-1350b0603053.png)

Chỉ định connection cho query builder:

![](https://images.viblo.asia/a046c0d7-37c0-45cc-848e-5a33fe27c53a.png)

Chúng ta tiếp tục join table `mails` (SQL Server) và table `types` (MySql)

![](https://images.viblo.asia/97abbaad-968c-4c50-8b4a-d145b8f34bc5.png)

Rất tiếc, có lẽ như chúng ta ko thể join giữa các database engine khác nhau (hoặc có thể là tác giả chưa thực hiện đúng cách)

## Kết
- Chúng ta hoàn toàn có thể sử dụng nhiều kết nối cơ sở dữ liệu trên cũng 1 ứng dụng Laravel.

- Có thể sử dụng relationship giữa các connection thông qua model

- Có thể join giữa các table trên các connection khác nhau, nhưng có lẽ chúng phải cùng host / database 
engine (hoặc có thể là tác giả chưa thực hiện đúng cách)

Tham khảo: https://medium.com/teknomuslim/how-to-run-laravel-using-multiple-database-connections-d7e8dcb7ed2a