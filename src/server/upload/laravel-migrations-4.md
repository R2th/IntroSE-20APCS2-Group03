# 5. Index
## a. Creating Indexes

Schema builder hỗ trợ một số loại index. Trước tiên, hãy xem xét một ví dụ chỉ định các giá trị của cột phải là unique. Để tạo index, chúng ta có thể gán unique cho column:
```
$table->string('email')->unique();
```

Ngoài ra, bạn có thể tạo index sau khi định nghĩa column. Ví dụ:
```
$table->unique('email');
```

Bạn thậm chí có thể chuyển một array các column cho method index() để tạo chỉ mục tổng hợp:
```
$table->index(['account_id', 'created_at']);
```

Laravel sẽ tự động tạo một tên index hợp lý, nhưng bạn có thể truyền đối số thứ hai cho phương thức để tự chỉ định tên:

```
$table->unique('email', 'unique_email');
```

## b. Available Index Types

Mỗi phương thức index chấp nhận một đối số thứ hai tùy chọn, để chỉ định tên của index. Nếu được bỏ qua, tên sẽ được lấy từ tên của table và column.

| Command | Description |
| -------- | -------- |
| `$table->primary('id');`  |  Adds a primary key. |
| `$table->primary(['id', 'parent_id']);	`  |  Adds composite keys. |
| `$table->unique('email');`  |  Adds a unique index. |
| `$table->index('state');`  |  Adds a plain index. |
| `$table->spatialIndex('location');`  | Adds a spatial index. (except SQLite). |

## c. Index Lengths & MySQL / MariaDB

Laravel sử dụng ký tự utf8mb4 được đặt theo mặc định, bao gồm hỗ trợ lưu trữ 'emojis' trong cơ sở dữ liệu. Nếu bạn đang chạy phiên bản MySQL cũ hơn bản phát hành 5.7.7 hoặc MariaDB cũ hơn bản phát hành 10.2.2, bạn có thể cần phải config cấu hình thủ công độ dài chuỗi mặc định được tạo bởi migration để MySQL tạo index cho chúng. Bạn có thể config cấu hình điều này bằng cách gọi phương thức Schema :: defaultStringL wavel trong AppServiceProvider của bạn:
```
use Illuminate\Support\Facades\Schema;

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    Schema::defaultStringLength(191);
}
```

Ngoài ra, bạn có thể enable tùy chọn innodb_large_prefix cho cơ sở dữ liệu của mình. Tham khảo tài liệu của cơ sở dữ liệu, để biết hướng dẫn về cách bật tùy chọn này.

## d. Renaming Indexes

Để đổi tên một chỉ mục, bạn có thể sử dụng phương thức rename. Phương thức này chấp nhận tên chỉ mục hiện tại làm đối số đầu tiên và tên mong muốn làm đối số thứ hai:
```
$table->renameIndex('from', 'to')
```

## e. Dropping Indexes

Để xóa index bạn phải chỉ định tên của index. Default, Laravel tự động gán tên hợp lý cho các index. Ghép tên bảng, tên của cột được lập index và loại index. Dưới đây là một số ví dụ:

| Column 1 | Column 2 |
| -------- | -------- |
|  `$table->dropPrimary('users_id_primary');`  |  Drop a primary key from the "users" table.  |
|  `$table->dropUnique('users_email_unique');`  |  Drop a unique index from the "users" table.  |
|  `$table->dropIndex('geo_state_index');`  |  Drop a basic index from the "geo" table.  |
|  `$table->dropSpatialIndex('geo_location_spatialindex');`  |  Drop a spatial index from the "geo" table (except SQLite).  |

Nếu bạn truyền một array column vào một method xóa index, tên index thông thường sẽ được tạo dựa trên tên bảng, cột và loại khóa:
```
Schema::table('geo', function (Blueprint $table) {
    $table->dropIndex(['state']); // Drops index 'geo_state_index'
});
```

## f. Foreign Key Constraints

Laravel cũng cung cấp hỗ trợ để tạo các ràng buộc khóa ngoại, được sử dụng để buộc toàn vẹn tham chiếu ở cấp database. Ví dụ: hãy xác định cột user_id trên table Post tham chiếu column id trên table User:
```
Schema::table('posts', function (Blueprint $table) {
    $table->unsignedBigInteger('user_id');

    $table->foreign('user_id')->references('id')->on('users');
});
```

Bạn cũng có thể chỉ định hành động mong muốn cho các thuộc tính on delete' và 'on update' của ràng buộc:
```
$table->foreign('user_id')
      ->references('id')->on('users')
      ->onDelete('cascade');
```

Để xóa khóa ngoại, bạn có thể sử dụng phương thức dropForeign. Các ràng buộc khóa ngoài sử dụng quy ước đặt tên giống như các index. Vì vậy, chúng ta sẽ ghép tên table và các column trong ràng buộc sau đó thêm vào tên '_forign':
```
$table->dropForeign('posts_user_id_foreign');
```

Hoặc, bạn có thể truyền một array sẽ tự động sử dụng tên ràng buộc thông thường khi drop:
```
$table->dropForeign(['user_id']);
```

Bạn có thể enable or disable các ràng buộc khóa ngoại trong quá trình migrate của mình bằng cách sử dụng các phương thức sau:
```
Schema::enableForeignKeyConstraints();

Schema::disableForeignKeyConstraints();
```

Nguồn: [link.](https://laravel.com/docs/5.8/migrations#indexes)