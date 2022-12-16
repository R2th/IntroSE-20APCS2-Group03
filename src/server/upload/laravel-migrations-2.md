**3. Running Migrations**

Để chạy tất cả các migration 1 lần, hãy thực hiện lệnh sau:
```
php artisan migrate


Forcing Migrations To Run In Production
```
Một số hoạt động migration có thể khiến bạn mất dữ liệu. Để bảo vệ database khi chạy các migration,  bạn sẽ được nhắc xác nhận trước khi các lệnh được thực thi.
Để buộc các lệnh chạy mà không có dấu nhắc, hãy sử dụng option --force:

`php artisan migrate --force`

**a.  Rolling Back Migrations**
Để khôi phục thao tác migrate mới nhất, bạn có thể sử dụng lệnh rollback. Lệnh này quay lại lần migrate cuối cùng, có thể bao gồm nhiều file migrate:

```
php artisan migrate:rollback
```
Bạn có thể quay lại lần migrate cụ thể bằng cách thêm option cho lệnh rollback. Ví dụ: lệnh sau sẽ khôi phục 5 lần migrate gần nhất

`php artisan migrate:rollback --step=5`

Lệnh sau sẽ khôi phục hết tất cả các lần migrate:

`php artisan migrate:reset`

**Rollback & Migrate In Single Command**

Lệnh migrate: refresh sẽ khôi phục tất cả các lần migrate và sau đó thực hiện migrate. Lệnh này làm mới toàn bộ cơ sở dữ liệu.

```
php artisan migrate:refresh

// Refresh the database and run all database seeds...
php artisan migrate:refresh --seed
```

Bạn có thể rollback và migrate lại một số lần migrate bằng cách thêm option cho lệnh refresh. Ví dụ: lệnh sau sẽ khôi phục & migrate lại 5lần migrate gần nhất:

`php artisan migrate:refresh --step=5`

**Drop All Tables & Migrate**

Lệnh migrate: fresh sẽ xóa tất cả các table khỏi cơ sở dữ liệu và sau đó thực hiện lệnh migrate:

```
php artisan migrate:fresh

php artisan migrate:fresh --seed
```

**b. Tables**

**Creating Tables**

Để tạo bảng cơ sở dữ liệu mới, hãy sử dụng phương thức tạo facade Schema. Phương thức này có hai đối số. Đầu tiên là tên của bảng, trong khi thứ hai là Closure nhận đối tượng Blueprint có thể được sử dụng để xác định bảng mới:

```
Schema::create('users', function (Blueprint $table) {
    $table->bigIncrements('id');
});
```

Khi tạo bảng, bạn có thể sử dụng bất kỳ column method nào của trình tạo lược đồ để xác định các cột của bảng.

**Checking For Table / Column Existence**

Bạn có thể dễ dàng kiểm tra sự tồn tại của một bảng hoặc cột bằng các phương thức hasTable và hasColumn:

```
if (Schema::hasTable('users')) {

    //

}

if (Schema::hasColumn('users', 'email')) {

    //

}
```

**Database Connection & Table Options
**

Nếu muốn thực hiện thao tác lược đồ trên kết nối cơ sở dữ liệu không phải là kết nối mặc định, hãy sử dụng phương thức conection:

```
Schema::connection('foo')->create('users', function (Blueprint $table) {
    $table->bigIncrements('id');
});
```

Bạn có thể sử dụng các lệnh sau trên trình tạo lược đồ để xác định các option của table:


| Command | Description |
| -------- | -------- |
| $table->engine = 'InnoDB';     | Specify the table storage engine (MySQL).    |
| $table->charset = 'utf8';     | Specify a default character set for the table (MySQL).   |
| $table->collation = 'utf8_unicode_ci';     | Specify a default collation for the table (MySQL).    |
| $table->temporary();     | Create a temporary table (except SQL Server).   |

**Renaming / Dropping Tables
**
Để đổi tên bảng cơ sở dữ liệu hiện có, sử dụng phương thức đổi tên:

`Schema::rename($from, $to);`

Để loại bỏ một bảng hiện có, bạn có thể sử dụng các phương thức drop hoặc dropIfExists:

```

Schema::drop('users');


Schema::dropIfExists('users');
```


**Renaming Tables With Foreign Keys**

Trước khi đổi tên bảng, bạn nên xác minh rằng mọi ràng buộc khóa ngoại trên bảng có tên rõ ràng trong tệpmigrate của bạn thay vì để Laravel gán tên dựa trên quy ước. Nếu không, tên ràng buộc khóa ngoại sẽ đề cập đến tên bảng cũ.

Link tham khảo: [tại đây.](https://laravel.com/docs/5.8/migrations#running-migrations)