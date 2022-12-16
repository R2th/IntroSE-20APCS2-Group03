# **1.Giới thiệu**
**Laravel** tương tác với cơ sở dữ liệu thông qua **Eloquent** và **QueryBuilder**, trong qua trình làm việc có những lúc bạn muốn show câu query sql ra để kiểm tra dữ liệu hoặc ghi log lại query của chúng thì làm như thế nào ? Tât nhiên là chúng ta có thể cài đặt **laravel debugbar package**, 1 package rất hay của Laravel.

Hôm nay tôi sẽ giới thiệu đến các bạn ba cách để bạn có thể sử dụng để xem SQL thực tế đang được thực thi như thế nào. 

1. **When you want to convert Query Builder to SQL**
2. **When you want to check the SQL of multiple Query Builders**
3. **Register with a service provider and automatically output to a log file**

OK, bắt đầu thôi !.
# **2.Bắt đầu**

Trong bài viết này tôi đang sư dụng :
* **php** version 7.3
* **Laravel** Framework 7.3.0
* **MySQL** 5.7

Chúng ta sẽ bắt đầu đi vào chi tiết từng phương thức thôi nào. 

**1. When you want to convert Query Builder to SQL**

 Trong câu lệnh **Query Builder** , bạn có thể nhận được câu lệnh **SQL** bằng cách gọi phương thức **toSql()**  và phương thức **getBindings()** để nhận giá trị của nó.
    
    
   ```php
         php artisan tinker
         
        $query = \App\User::where('id', 1);
        dd($query->toSql(), $query->getBindings());
  ```
  
   ```php
         "select * from `users` where `id` = ?"
            array:1 [
              0 => 1
            ]

 ```
    
   **2.  When you want to check the SQL of multiple Query Builders**
   
   Để show nhiều **Query Builder** 1 lúc , các bạn làm theo cách sau:
   
   ```php
         \DB::enableQueryLog();
         \App\Models\User::all();
         dd(\DB::getQueryLog());
   ```
  
   ```php
        array:1 [
          0 => array:3 [
            "query" => "select * from `users`"
            "bindings" => []
            "time" => 1.4
          ]
        ]
 ```
 
 
   **3.  Register with a service provider and automatically output to a log file**
   
   Cách này chúng ta sẽ xây dựng 1  **Service Provider** để tự động ghi log vào file **laravel.log**.
   
* **Tạo một  Service Provider có tên là DataBaseQueryServiceProvider**
    ```
    $ php artisan make:provider DataBaseQueryServiceProvider
    ```

* **Cấu hình trong file config/app.php**
    ```php
         'providers' => [
        App\Providers\DataBaseQueryServiceProvider::class,
    ],
    ```

* **Nội dung file app/Providers/DataBaseQueryServiceProvider.php**
 ```php
 <?php

       namespace App\Providers;
       
        use Carbon\Carbon;
        use DateTime;
        use Illuminate\Database\Events\TransactionBeginning;
        use Illuminate\Database\Events\TransactionCommitted;
        use Illuminate\Database\Events\TransactionRolledBack;
        use Illuminate\Support\Facades\DB;
        use Illuminate\Support\Facades\Event;
        use Illuminate\Support\Facades\Log;
        use Illuminate\Support\ServiceProvider;

class DataBaseQueryServiceProvider extends ServiceProvider
{
        /**
         * Register services.
         *
         * @return void
         */
        public function register(): void
        {
            if (config('logging.enable_sql_log') === false) {
                return;
            }

            DB::listen(function ($query) {
                $sql = $query->sql;
                foreach ($query->bindings as $binding) {
                    if (is_string($binding)) {
                        $binding = "'{$binding}'";
                    } elseif ($binding === null) {
                        $binding = 'NULL';
                    } elseif ($binding instanceof Carbon) {
                        $binding = "'{$binding->toDateTimeString()}'";
                    } elseif ($binding instanceof DateTime) {
                        $binding = "'{$binding->format('Y-m-d H:i:s')}'";
                    }

                    $sql = preg_replace("/\?/", $binding, $sql, 1);
                }

                Log::debug('SQL', ['sql' => $sql, 'time' => "$query->time ms"]);
            });

            Event::listen(TransactionBeginning::class, function (TransactionBeginning $event) {
                Log::debug('START TRANSACTION');
            });

            Event::listen(TransactionCommitted::class, function (TransactionCommitted $event) {
                Log::debug('COMMIT');
            });

            Event::listen(TransactionRolledBack::class, function (TransactionRolledBack $event) {
                Log::debug('ROLLBACK');
            });
        }
}
  ```

* **Cấu hình file config/logging.php**
    ```php
        return [
    /*
    | ------------------------------------------------- -------------------------
    | Custom Log
    | ------------------------------------------------- -------------------------
    * /

    'enable_sql_log' => env('ENABLE_SQL_LOG', false),
    ];
    ```
   
* **Cấu hình file .env**

    ```php
        ENABLE_SQL_LOG=true
    ```
# **3.Test**
### routes/web.php

```php
    <?php

use App\User;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    $user = DB::transaction(function () {
        $user = factory(User::class)->create();
        $user->name = 'change name';
        $user->save();
        $user->delete();

        return factory(User::class)->create();
    });

    User::find($user->id);

    return view('welcome');
});
```

### Nội dung file storage/logs/laravel-***.log

```
[2020-06-08 04:15:55] local.DEBUG: START TRANSACTION  
[2020-06-08 04:15:55] local.DEBUG: SQL {"sql":"insert into `users` (`name`, `email`, `email_verified_at`, `password`, `remember_token`, `updated_at`, `created_at`) values ('Philip Bahringer', 'donnell98@example.net', '2020-06-08 04:15:55', 'yIXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'PBLNzyM7VL', '2020-06-08 04:15:55', '2020-06-08 04:15:55')","time":"0.42 ms"} 
[2020-06-08 04:15:55] local.DEBUG: SQL {"sql":"update `users` set `name` = 'change name', `users`.`updated_at` = '2020-06-08 04:15:55' where `id` = 1","time":"0.26 ms"} 
[2020-06-08 04:15:55] local.DEBUG: SQL {"sql":"delete from `users` where `id` = 1","time":"0.34 ms"} 
[2020-06-08 04:15:55] local.DEBUG: SQL {"sql":"insert into `users` (`name`, `email`, `email_verified_at`, `password`, `remember_token`, `updated_at`, `created_at`) values ('Mrs. Lia Buckridge Sr.', 'florence.metz@example.org', '2020-06-08 04:15:55', 'yIXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Qt7op6m3CE', '2020-06-08 04:15:55', '2020-06-08 04:15:55')","time":"0.19 ms"} 
[2020-06-08 04:15:55] local.DEBUG: COMMIT  
[2020-06-08 04:15:55] local.DEBUG: SQL {"sql":"select * from `users` where `users`.`id` = 2 limit 1","time":"0.49 ms"} 
```

Hôm nay tôi đã giới thiệu 3 cách để ghi nhật ký tất cả các truy vấn SQL trong Laravel. Hy vọng bạn có thể sử dụng kiến thức này trong các dự án của bạn !.