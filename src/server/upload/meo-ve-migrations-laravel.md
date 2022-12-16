Đôi khi, đặc biệt trong các dự án lớn. Có thể bạn sẽ gặp phải những trường hợp tạo migration cho bảng, hoặc cột đã tồn tại. Thật là tốt, khi Laravel đã có một cách nhanh chóng để kiểm tra nó.

Một ví dụ migration như thế này:

```
public function up()
{
  Schema::create('flights', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('airline');
    $table->timestamps();
  });
}
```

Nếu như bảng **flights** đã tồn tại, bạn sẽ gặp lỗi. Và giải pháp để giải quyết vấn đề này là ta dùng phương thức **Schema::hasTable()**.

```
public function up()
{
  if (!Schema::hasTable('flights')) {
    Schema::create('flights', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name');
      $table->string('airline');
      $table->timestamps();
    });
  }
}
```

Vì vậy, nếu bảng **flights** không tồn tại, thì ta sẽ tạo ra nó. Kết hợp với việc kiểm tra có tồn tại cột nào không, ta có thể dùng **Schema::hasColumn()**.

```
public function up()
{
  if (Schema::hasTable('flights')) {
    Schema::table('flights', function (Blueprint $table) {
      if (!Schema::hasColumn('flights', 'departure_time')) {
	$table->timestamp('departure_time');
      } 
    });
  }
}
```

Tài liệu tham khảo:

https://laravel.com/

https://laraveldaily.com/quick-tip-for-migrations-check-if-table-column-already-exists/