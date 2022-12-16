Xin chào các anh em. Mở đầu cho series **Laravel và những điều thú vị về nó** ,  hôm nay mình sẽ giới thiệu với các bạn về cách sử dụng Migrations trong Laravel.

# 1.Giới thiệu chung.
Migration giống như một hệ thống quản lý phiên bản giống như Git nhưng dành cho cơ sở dữ liệu của bạn. Migration cho phép bạn định nghĩa các bảng trong CSDL, định nghĩa nội dung các bảng cũng như cập nhật thay đổi các bảng đó hoàn toàn bằng PHP. Đồng thời các thao tác với CSDL này còn có thể sử dụng trên các loại CSDL khác nhau như MySQL, SQL Server, Postgres, ... mà không cần phải chỉnh sửa lại code theo CSDL sử dụng.
<br>Điều kiện tiên quyết để chạy migration một cách thành công:
<ul>
    <li>Phải có kết nối với database .</li>
    <li>migrations muốn sử dụng được thì phải nằm trong thư mục App\database\migrations </li>
</ul>

# 2.Thử tạo một Migration thử xem sao.
Để tạo một migration chúng ta có 2 cách để tạo, một là chúng ta sẽ vào database/migrations tạo một file mới trong đó. Nhưng cách này thường mọi người không dùng nhiều lắm, mọi người hay dùng cách thao tác với command line.
<br>Để tạo một migration ta sẽ sử dụng câu lệnh **make:migration** 
File migration mới sẽ được đặt trong thư mục database/migrations

![](https://images.viblo.asia/a9dc3662-29a1-4946-82b9-7b2337639f21.png)

Mỗi file migration được đặt tên bao gồm timestamp để xác định thứ tự migartion với nhau.
Ví dụ để tạo mới một bảng posts mới trong CSDl ta sẽ sử dụng câu lệnh sau :
```php artisan make:migration create_table_posts_table --create=posts.```

Khi ta nhấn enter thì ngay lập tức trong file sẽ được tạo trong folder database/migration và nội dung của file sẽ như sau:
```PHP
    <?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
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
        Schema::dropIfExists('posts');
    }
}

```
Để thêm các trường của bảng posts trong CSDL ta sẽ thêm vào ```function up()``` trong file migration.
```PHP
     public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('slide_url');
            $table->string('title');
            $table->string('content');
            $table->timestamps();
        });
    }
```
Sau đó để tạo bảng trong CSDL thì chúng ta sẽ dùng câu lênh: ```php artisan migrate```
<br>Bây giờ một vấn đề phát sinh la khi chúng ta nhanh tay migrate mà sực nhớ ra là chúng ta thiếu trường **status** của bảng posts . Đừng lo , chúng ta chỉ cần tạo một file migration mới với tham số trong command là --table=posts. Lệnh sẽ là :<br> ```php artisan make:migration add_attribute_status_into_posts_table --table=posts```
```PHP
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAttributeStatusIntoPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->tinyInteger('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->dropColumn('status');
    }
}

```
Và sau đó chúng ta lại migrate như bình thường.hihi
<br>Nếu các bạn chạy lệnh php artisan migrate mà bị lỗi "class not found" thì hãy thử thực thi câu lệnh này: ```composer dump-autoload``` trước rồi lại migrate như bình thường nhé.

## Chú ý.
Suýt quên có ai để ý đến là khi chúng ta cài một project mới toanh thì đã có sẵn 2 file migration trong thư mục database/migration và khi ta migrate lần đâu tiên thì khi xem trong CSDL của chúng ta sẽ xuất hiện bảng migrations
<br>![](https://images.viblo.asia/1e588b76-f67b-4510-9ce9-3bc4ecd73a0e.png)

Các bạn chú ý đến ```column batch```, cột này chúng ta có thể hiểu là migrations tạo ở lượt mấy, ví dụ như bảng migrations ở trên 3 migration có id 1 2 3 được migrate ở lần 1, migration có id = 4 được migrate ở lần 2,...
<br>Các bạn có chú ý rằng tên migration không , nó thể hiện được thời gian mình tạo migration và 6 con số radom sau thời gian được ghi trong file migration thể hiện file migration nào được tạo trước, file migration nào được tạo sau.

<br> Một điều nữa là tại sao 1 project mới lại có 2 file sẵn migration ở trong database/migrations , mình đoán là người viết ra cái framework Laravel này tiên đoán được là một hệ thống bao giờ cũng có chức năng login/logout/regisster nên đã tạo sẵn cho mình 2 migration đấy =)))

<br> Thêm một điều nữa là khi chúng ta muốn migrate 1 file migration thôi thì chúng ta sẽ dùng câu lệnh: ```php artisan migrate --path=...```
<br>VD: chúng ta chỉ muốn chạy file migration 2014_10_12_000000_create_users_table thì chúng ta có thể tạo 1 folder mới database/migrations/users chứa file migration trên và chạy lệnh
php artisan migrate --path=database/migrations/users
# 3.Rollback\/Migrate trong một câu lệnh.
Câu lệnh ```php artisan migrate:refresh``` sẽ đầu tiên rollback lại toàn bộ migration của chương trình, và thực hiện câu lệnh migrate. Tức là thực hiện function down() xong rồi thực hiện function up() trong file migration.
<br>Câu lệnh sẽ thực hiện tái cấu trúc toàn bộ database:
<br>```php artisan migrate:refresh```
<br>```php artisan migrate:refresh --seed ```
<br>Tham số ```--seed``` là để chạy tất cả các Seeder chúng ta sẽ tìm hiểu trong bài sau .
<br>Nếu muốn thực hiện function down() với số lượng batch muốn rollback thì ta dùng câu lệnh: ```php artisan migrate:rollback -step=n```


# 4.Schema.
Bây giờ chúng ta sẽ tìm hiểu kỹ hơn ```Schema``` facade thực thi như nào nhé.
Trong file migration để dùng ```Schema``` thì chúng ta sẽ ``` use Illuminate\Support\Facades\Schema ```.
<br>
Nếu muốn tạo một bảng mới trong DB của mình thì chúng ta có thể sử dụng 
```PHP
Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
});
```
Nếu các bạn muốn kiểm tra xem ```table``` hoặc ```column``` có tồn tại hay không thì ta dùng
<br>
```PHP
if (Schema::hasTable('users')) {
    //
}

if (Schema::hasColumn('users', 'email')) {
    //
}
```
Nếu muốn đổi tên bảng từ ```post``` sang ```posts``` thì ta dùng
```PHP
Schema::rename('post', 'posts')
```
Khi chúng ta muốn xóa bảng thì có thể sử dụng ```Schema::drop()```
```PHP
Schema::drop('users');

Schema::dropIfExists('users');
```
## Các kiểu column.


| Command | Description | 
| -------- | -------- | -------- |
| `$table->bigIncrements('id');`     | Tăng ID (primary key) sư dụng như "UNSIGNED BIG INTEGER".     | 
| `$table->bigInteger('votes');`     | Tương đương với BIGINT.     | 
| `$table->binary('data');`     | Tương đương với BLOB.     | 
| `$table->boolean('confirmed');`     | Tương đương với BOOLEAN.     | 
| `$table->char('name', 4);`     | Tương đương với CHAR với độ dài cho trước.     | 
| `$table->date('created_at');`     | Tương đương với DATE.     | 
| `$table->dateTime('created_at');`     | Tương đương với DATETIME.     | 
| `$table->dateTimeTz('created_at');`     | Tương đương với DATETIME (with timezone).     | 
| `$table->decimal('amount', 5, 2);`     | Tương đương với DECIMAL với độ chính sách và phần thập phân.     | 
| `$table->double('column', 15, 8);`     | Tương đương với DOUBLE với độ chính xác, 15 chữ số và 8 ký tự tính sau dấu phảy.     | 
| `$table->enum('choices', ['foo', 'bar']);`     | Tương đương với ENUM.     | 
| `$table->float('amount', 8, 2);`     | Tương đương với FLOAT, 8 chữ số and 2 chữ số tính sau dấu phẩy.     | 
| `$table->increments('id');`     | Tăng ID (primary key) sử dụng như "UNSIGNED INTEGER".     | 
| `$table->integer('votes');` | tương đương với INTEGER |
| `$table->ipAddress('visitor')` | tương đương với IP address |
| `$table->json('options')` | tương đương với JSON |
| `$table->jsonb('options')` | tương đương với JSONB |
| `$table->longText('description')` | tương đương với LONGTEXT |
| `$table->macAddress('device')` | tương đương với MAC address |
| `$table->mediumInteger('numbers')` | tương đương với MEDIUMINT |
| `$table->mediumText('description')` | tương đương với MEDIUMTEXT |
| `$table->morphs('taggable')` | thêm INTEGER taggable_id và STRING taggable_type |
| `$table->nullableTimestamps()` | giống với timestamps(), ngoại trừ việc cho phép sử dụng NULLs |
| `$table->rememberToken()` | thêm remember_token như VARCHAR(100) NULL |
| `$table->smallInteger('votes')` | tương đương với SMALLINT |
| `$table->softDeletes()` | thêm deleted_at column để soft deletes |
| `$table->string('email')` | tương đương với VARCHAR |
| `$table->string('name', 100)` | tương đương với VARCHAR có độ dài |
| `$table->text('description')` | tương đương với TEXT |
| `$table->time('sunrise')` | tương đương với TIME |
| `$table->timeTz('sunrise')` | tương đương với TIME (với timezone) |
| `$table->tinyInteger('numbers')` | tương đương với TINYINT |
| `$table->timestamp('added_on')` | tương đương với TIMESTAMP |
| `$table->timestampTz('added_on')` | tương đương với TIMESTAMP |
| `$table->timestamps()` | thêm vào hai column created_at và updated_at |
| `$table->uuid('id')` | tương đương với UUID |
## Column Modifier
Nhiều khi chúng ta có thể muốn cột trong table có giá trị ```null``` hay ```not null```,  vì thế Laravel hỗ trợ các modifier <br>
Ví dụ như ta muốn để cột ```address``` trong table ```users``` được phép ```null```
```PHP
Schema::table('users', function ($table) {
    $table->string('address')->nullable();
});

```
Và còn rất nhiều modifier nữa các bạn có thể tham khảo tại bảng dưới đây


| Modifier | Description | 
| -------- | -------- | 
| after('column') | Đặt column "after" một column khác (MySQL Only) |
| comment('my comment') | Thêm một comment cho column |
| default($value) | Đặt giá trị "mặc định" vào column |
| first() | Đặt column "first" vào trong bảng (MySQL Only) |
| nullable() | Cho phép dữ liệu kiểu NULL có thể chèn vào column |
| storedAs(\$expression) | Tạo một cột stored (MySQL Only) |
| unsigned() | Đặt cột integer sang UNSIGNED |
| virtualAs(\$expression) | Tạo một cột virtual (MySQL Only) |
## Modifying Columns
Các bạn có thể mở terminal lên và cài thư viện ```doctrine``` để có thể sử dụng các hàm hữu ích trong nó.```composer require doctrine/dbal```
<br> Chúng ta thường hay mắc phảỉ sau khi migrate bảng rồi lại sực nhớ ra mình lại không muốn đặt tên cột như thế nữa. Để giải quyết vấn đề đó , thư viện ```doctrine``` có hàm xử lý được.
```PHP
Schema::table('users', function ($table) {
    $table->renameColumn('from', 'to');
});
```
Hay một vấn đề nữa đó chính là mình muốn giới hạn giá trị kiểu dữ liệu của một cột 
```PHP
Schema::table('users', function ($table) {
    $table->string('name', 50)->nullable()->change();
});
```
## Foreign Key Constraints
Đôi khi chúng ta muốn tạo các rằng buộc cho các bảng, chúng ta có thể sử dụng cú pháp sau để rằng buộc cho 2 bảng:
```PHP
Schema::table('posts', function ($table) {
    $table->integer('user_id')->unsigned();

    $table->foreign('user_id')->references('id')->on('users');
});
```
Chú ý nếu không migrate mà không chạy được thì các bạn có thể tách ra làm 2 file migration để chạy.
<br>Để drop một foreign ta dùng : ``` $table->dropForeign('posts_user_id_foreign');```
<br>Chúng ta nên để ý quy tắc đặt tên foreign ``` <tên_table>_<tên_khóa_ngoại>_foreign ```
<br>Bạn có thể kích hoạt hay bỏ kích hoạt việc sử dụng foreign key constraint trong migration sử dụng hai hàm sau:
```PHP
Schema::enableForeignKeyConstraints();

Schema::disableForeignKeyConstraints();
```
# 5.Kết luận.
Mình đã giới thiệu cho các những cái gì cơ bản nhất về Migration trong Laravel , hẹn các trong bài viết sau. Mọi thắc mắc cần giải đáp hãy để lại comment ở phía dưới nhé!
<br>**Tham khảo**
<br>https://laravel.com/docs/5.6/migrations