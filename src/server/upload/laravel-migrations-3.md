# 4. Column
## a. Creating Columns

Các method trên Schema facade có thể được sử dụng để cập nhaantj các table hiện có. Giống như các method create, method table chấp nhận 2 đối số: tên table và Closure thể hiện Blueprint mà ta có thể sử dụng để thêm các cột vào table:
```
Schema::table('users', function (Blueprint $table) {
    $table->string('email');
});
```

### Available Column Types
Schema builder chưa nhiều loại column mà chúng ta có thể chỉ định khi build các table:


| Command | Description |
| -------- | -------- | 
| `$table->bigIncrements('id');`     |	Auto-incrementing UNSIGNED BIGINT (primary key) equivalent column.  |
| `$table->bigInteger('votes');`     |BIGINT equivalent column.  |
| `$table->binary('data');`     |  BLOB equivalent column.|
| `$table->boolean('confirmed');`     |  BOOLEAN equivalent column.|
| `$table->char('name', 100);`     |  CHAR equivalent column with an optional length.|
| `$table->date('created_at');	`     |  DATE equivalent column.|
| `$table->dateTime('created_at');	`     |  DATETIME equivalent column.|
| `$table->dateTimeTz('created_at');	`     |  DATETIME (with timezone) equivalent column.|
| `$table->decimal('amount', 8, 2);	`     |  DECIMAL equivalent column with a precision (total digits) and scale (decimal digits).|
| `$table->double('amount', 8, 2);	`     |  DOUBLE equivalent column with a precision (total digits) and scale (decimal digits).|
| `$table->enum('level', ['easy', 'hard']);	`     |  ENUM equivalent column.|
| `$table->float('amount', 8, 2);	`     |  FLOAT equivalent column with a precision (total digits) and scale (decimal digits).|
| `$table->geometry('positions');	`     |  	GEOMETRY equivalent column.|
| `$table->geometryCollection('positions');	`     |  GEOMETRYCOLLECTION equivalent column.|
| `$table->increments('id');	`     |  Auto-incrementing UNSIGNED INTEGER (primary key) equivalent column.|
| `$table->integer('votes');	`     |  INTEGER equivalent column.|
| `$table->ipAddress('visitor');	`     |  IP address equivalent column.|
| `$table->json('options');	`     |  JSON equivalent column.|
| `$table->jsonb('options');	`     |  JSONB equivalent column.|
| `$table->lineString('positions');	`     |  LINESTRING equivalent column.|
| `$table->longText('description');	`     |  LONGTEXT equivalent column.|
| `$table->macAddress('device');	`     |  MAC address equivalent column.|
| `$table->mediumIncrements('id');	`     |  Auto-incrementing UNSIGNED MEDIUMINT (primary key) equivalent column.|
| `$table->mediumInteger('votes');	`     |  	MEDIUMINT equivalent column.|
| `$table->mediumText('description');	`     | MEDIUMTEXT equivalent column. |
| `$table->morphs('taggable');	`     |  Adds taggable_id UNSIGNED BIGINT and taggable_type VARCHAR equivalent columns.|
| `$table->uuidMorphs('taggable');	`     |  	Adds taggable_id CHAR(36) and taggable_type VARCHAR(255) UUID equivalent columns.|
| `$table->multiLineString('positions');	`     |  MULTILINESTRING equivalent column.|
| `$table->multiPoint('positions');	`     |  MULTIPOINT equivalent column.|
| `$table->multiPolygon('positions');	`     |  MULTIPOLYGON equivalent column.|
| `$table->nullableMorphs('taggable');	`     |  Adds nullable versions of morphs() columns.|
| `$table->nullableUuidMorphs('taggable');	`     |  Adds nullable versions of uuidMorphs() columns.|
| `$table->nullableTimestamps();	`     |  Alias of timestamps() method.|
| `$table->point('position');	`     |  	POINT equivalent column.|
| `$table->polygon('positions');	`     |  POLYGON equivalent column.|
| `$table->rememberToken();	`     |  Adds a nullable remember_token VARCHAR(100) equivalent column.|
| `$table->set('flavors', ['strawberry', 'vanilla']);	`     |  SET equivalent column.|
| `$table->smallIncrements('id');	`     |  Auto-incrementing UNSIGNED SMALLINT (primary key) equivalent column.|
| `$table->smallInteger('votes');	`     |  SMALLINT equivalent column.|
| `$table->softDeletes();	`     |  Adds a nullable deleted_at TIMESTAMP equivalent column for soft deletes.|
| `$table->softDeletesTz();	`     |  Adds a nullable deleted_at TIMESTAMP (with timezone) equivalent column for soft deletes.|
| `$table->string('name', 100);	`     |  VARCHAR equivalent column with a optional length.|
| `$table->text('description');	`     |  TEXT equivalent column.|
| `$table->time('sunrise');	`     |  TIME equivalent column.|
| `$table->timeTz('sunrise');	`     |  	TIME (with timezone) equivalent column.|
| `$table->timestamp('added_on');	`     |  TIMESTAMP equivalent column.|
| `$table->timestampTz('added_on');	`     |  TIMESTAMP (with timezone) equivalent column.|
| `$table->timestamps();	`     |  Adds nullable created_at and updated_at TIMESTAMP equivalent columns.|
| `$table->timestampsTz();	`     |  Adds nullable created_at and updated_at TIMESTAMP (with timezone) equivalent columns.|
| `$table->tinyIncrements('id');	`     |  Auto-incrementing UNSIGNED TINYINT (primary key) equivalent column.|
| `$table->tinyInteger('votes');	`     |  TINYINT equivalent column.|
| `$table->unsignedBigInteger('votes');	`     |  	UNSIGNED BIGINT equivalent column.|
| `$table->unsignedDecimal('amount', 8, 2);	`     |  UNSIGNED DECIMAL equivalent column with a precision (total digits) and scale (decimal digits).|
| `$table->unsignedInteger('votes');	`     |  UNSIGNED INTEGER equivalent column.|
| `$table->unsignedMediumInteger('votes');	`     |  UNSIGNED MEDIUMINT equivalent column.|
| `$table->unsignedSmallInteger('votes');	`     |  UNSIGNED SMALLINT equivalent column.|
| `$table->unsignedTinyInteger('votes');	`     |  UNSIGNED TINYINT equivalent column.|
| `$table->uuid('id');	`     |  UUID equivalent column.|
| `$table->year('birth_year');	`     |  	YEAR equivalent column.|

## b. Column Modifiers

Ngoài các loại column được liệt kê ở trên, có một số "modifiers" column bạn có thể sử dụng trong khi thêm một cột vào bảng cơ sở dữ liệu. Ví dụ: để làm cho cột "nullable", bạn có thể sử dụng phương thức nullable:

```
Schema::table('users', function (Blueprint $table) {
    $table->string('email')->nullable();
});
```
Dưới đây là danh sách tất cả các modifiers column có sẵn. Danh sách này không bao gồm các index modifiers:

| Column 1 | Column 2 | 
| -------- | -------- | 
|   `->after('column')	`  |   Place the column "after" another column (MySQL)  |
|   `->autoIncrement()	`  |   Set INTEGER columns as auto-increment (primary key)  |
|   `->charset('utf8')	`  |   Specify a character set for the column (MySQL)  |
|   `->collation('utf8_unicode_ci')	`  |   Specify a collation for the column (MySQL/PostgreSQL/SQL Server)  |
|   `->comment('my comment')	`  |   Add a comment to a column (MySQL/PostgreSQL)  |
|   `->default($value)	`  |   Specify a "default" value for the column  |
|   `->first()	`  |   Place the column "first" in the table (MySQL)  |
|   `->nullable($value = true)	`  |   Allows (by default) NULL values to be inserted into the column  |
|   `->storedAs($expression)	`  |   Create a stored generated column (MySQL)  |
|   `->unsigned()	`  |  Set INTEGER columns as UNSIGNED (MySQL)   |
|   `->useCurrent()	`  |  Set TIMESTAMP columns to use CURRENT_TIMESTAMP as default value   |
|   `->virtualAs($expression)	`  |   Create an identity column with specified sequence options (PostgreSQL)  |
|   `->generatedAs($expression)	`  |   	Create an identity column with specified sequence options (PostgreSQL)  |
|   ->always()	  |  Defines the precedence of sequence values over input for an identity column (PostgreSQL)   |

## c. Modifying Columns
### Prerequisites

Trước khi sửa đổi một column, hãy đảm bảo thêm dependency doctrine / dbal vào tệp composer.json. Thư viện Doctrine DBAL được sử dụng để xác định trạng thái hiện tại của column và tạo các truy vấn SQL cần thiết để thực hiện các điều chỉnh đã chỉ định cho column đó:
```
composer require doctrine/dbal
```

### Updating Column Attributes

Method change cho phép sửa đổi một số loại column hiện có thành loại mới hoặc sửa đổi các thuộc tính của column. Ví dụ: bạn có thể muốn tăng lenght của cột chuỗi từ 25 lên 50:
```
Schema::table('users', function (Blueprint $table) {
    $table->string('name', 50)->change();
});
```
Chúng ta có thể sửa đổi column not null thành cho phép null bằng cách như sau:
```
Schema::table('users', function (Blueprint $table) {
    $table->string('name', 50)->nullable()->change();
});
```

### Renaming Columns

Để đổi tên một column, bạn có thể sử dụng phương thức renameColumn trên trình tạo Schema. Trước khi đổi tên một column, hãy nhớ thêm phụ thuộc doctrine / dbal vào tệp composer.json:
```
Schema::table('users', function (Blueprint $table) {
    $table->renameColumn('from', 'to');
});
```

## d. Dropping Columns

Để xóa một column, sử dụng phương thức dropColumn trên trình tạo Schema. 
```
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn('votes');
});
```

Bạn có thể xóa nhiều cột từ một bảng bằng cách truyền một mảng các tên column cho phương thức dropColumn:
```
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn(['votes', 'avatar', 'location']);
});
```

### Available Command Aliases

| Command | Description |
| -------- | -------- |
|  `$table->dropMorphs('morphable');`   |  Drop the morphable_id and morphable_type columns.   |
|   `$table->dropRememberToken();`	  |   Drop the remember_token column.  |
|  ` $table->dropSoftDeletes();`	  |   Drop the deleted_at column.  |
|   `$table->dropSoftDeletesTz();`	  |   Alias of dropSoftDeletes() method.  |
|   `$table->dropTimestamps();`	   |   Drop the created_at and updated_at columns.  |
|   `$table->dropTimestampsTz();	`  |  Alias of dropTimestamps() method.   |

Nguồn: [link](https://laravel.com/docs/5.8/migrations#columns).