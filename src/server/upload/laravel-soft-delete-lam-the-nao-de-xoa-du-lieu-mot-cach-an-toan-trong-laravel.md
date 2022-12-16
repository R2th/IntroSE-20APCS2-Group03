# Giới thiệu về softDeletes trong Laravel
Thông thường việc query dữ liệu trong database là việc rất cơ bản, các thao tác như đọc dữ liệu, sắp xếp dữ liệu , xoá dữ liệu  và thêm mới dữ liệu được tích hợp trong laravel cũng khá đầy đủ.
Riêng việc xoá dữ liệu thì có 2 trường phái là: xoá và ẩn đi trong mỗi query. vậy 2 cách này có ưu điểm và nhược điểm gì ? chúng ta hãy đến với từng phần để hiểu rõ hơn nha.
## 1. Xoá cứng (hard delete)
* Việc xoá cứng diễn ra rất bình thường tức nghĩa là xoá đi 1 record trong table, và sẽ không phục hồi lại được (trừ khi có backup database)
* Việc này mang lại lợi ích là giải phóng không gian lưu trữ, nhưng có 1 bất lợi rất lớn là không thể phục hồi. Nên sau này người ta rất hạn chế sử dụng hard delete mà thay vào đó sẽ chuyển sang cơ chế ẩn đi thay vì xoá cứng.
- Câu lệnh xoá cứng :
```sql:mysql
DELETE FROM table_name
WHERE some_column = some_value
```
## 2.  Xoá mềm (soft delete)
Không giống như xoá cứng, việc xoá mềm chỉ đơn giản là ẩn đi 1 record trong 1 câu truy vấn, lấy ví dụ bảng users chúng ta có :
| id | name | phone | is_disabled
| ------- | ----------- |-------|----|
| 1 | Jone Doe | +849989899867| 0 |
| 2 | Maria Zoo | +849989899888| 0 |
| 3 | Marina Zoo | +849989899866| 0 |

- Câu lệnh xoá cứng  record có id 1 là:
```shell:mysql
DELETE FROM users
WHERE id = 1
```
=> sau khi chạy lệnh này thì dữ liệu của users chỉ còn :
| id | name | phone | is_disabled
| ------- | ----------- |-------|----|
| 2 | Maria Zoo | +849989899888| 0 |
| 3 | Marina Zoo | +849989899866| 0 |

- Vậy nếu áp dụng xoá mềm thì sau:
- Cơ chế hoạt động của soft delete là sẽ dựa vào 1 cột để ẩn hiện record trong những câu truy vấn , ví dụ dùng soft delete để xoá record có id 1
- Câu lệnh xoá mềm  record có id 1 là:
```shell:mysql
UPDATE users
SET is_disabled=1
WHERE id=1 
```
=> sau khi chạy lệnh này thì dữ liệu của users sẽ là :
| id | name | phone | is_disabled
| ------- | ----------- |-------|----|
| 1 | Jone Doe | +849989899867| 1 |
| 2 | Maria Zoo | +849989899888| 0 |
| 3 | Marina Zoo | +849989899866| 0 |

- Table users có id 1 không bị xoá đi mà chỉ update cột is_disabled = 1. Vậy thì làm sao chứng minh là record này đã được xoá đi:
Rất đơn giản, khi chúng ta select dữ liệu ra chỉ cần thêm điều kiện is_disabled = 0 là được, đơn giản đúng không nào.
```sql:mysql
SELECT * FROM users where is_disabled = 0
```
=> sau khi chạy lệnh này thì dữ liệu của users chỉ còn :
| id | name | phone | is_disabled
| ------- | ----------- |-------|----|
| 2 | Maria Zoo | +849989899888| 0 |
| 3 | Marina Zoo | +849989899866| 0 |
Rất Hữu ích đúng không nào, record vẫn còn đó nhưng chúng ta không select nó ra mà thôi, đó cũng là cơ chế mà softDeletes trong laravel hoạt động.

## Laravel softDeletes
- Việc sử dụng softDeletes trong laravel clear hơn rất nhiều so với dùng cách thông thường ở trên về cơ chế là giống nhau nhưng laravel đã hỗ trợ để ta có thể select bình thường mà không cần dùng tới `where is_disabled = 0` . Nếu select lúc nào cũng where thêm điều kiện này thì thật hơi phiền đúng k nào, chúng ta hãy cùng config softDeletes trong laravel nhé.
### 1. Cài đặt
- Create project laravel với tên là soft_delete_laravel:

 `composer create-project --prefer-dist laravel/laravel soft_delete_laravel`
- Ở file app/Providers/AppServiceProvider.php chúng ta thêm dòng:
```php
use Illuminate\Support\Facades\Schema; // add
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191); // add: default varchar(191)
    }
}
``` 

trong model User chúng ta thêm
```php
namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes; // add soft delete

class User extends Authenticatable
{
    use Notifiable,
        SoftDeletes;// add soft delete

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
```
- Trong migration tạo cấu trúc của bảng table chúng ta thêm:
```php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes(); // add
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
```
- Dòng  `$table->softDeletes();` sẽ tạo ra cột deleted_at với giá trị mặc định là null (tương tự với cột is_disabled có giá trị mặc địnhlà 0)
- sau đó chúng ta chạy lệnh :
`php artisan migrate`
### 2. Sử dụng Soft Deletes: 
- Xoá record: `App\User::where('id', 1)->delete();`
=> Khi ta gọi method delete cho users có id bằng 1 thì ở tại record này sẽ update cột deleted_at với giá trị khác null ( khi xoá sẽ cập nhật thời gian )
- Get dữ liệu :  `App\User::all();` sẽ lấy ra tất cả record trong bảng users không bao gồm record có deleted_at khác null. Rất clear đúng không nào.
- để lấy tất cả record bao gồm cả record đã xoá bằng softDeletes : `App\User::withTrashed()->get();`
- Để lấy ra chỉ các record đã xoá : `App\User::onlyTrashed()->get();`
- Để lấy lại record đã xoá bằng softDeletes:
`App\User::withTrashed()->where('id', 1)->restore();`
- Xoá record vĩnh viễn:  `App\User::withTrashed()->where('id', 1)->forceDelete();`
## Tổng kết
- Qua đây chúng ta thấy việc áp dụng softDeletes sẽ rất an toàn cho việc restore lại dữ liệu đã xoá. Cách áp dụng vào thiết kế database cũng rất đơn giản, nếu dùng laravel framework thì đã được hỗ trợ tận răng rồi. Một chút đóng góp nhỏ để chúng ta càng ngày càng tiến bộ hơn , rất mong các bạn cùng nhau chia sẽ để chúng ta ngày một phát triển.