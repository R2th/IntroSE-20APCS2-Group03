Mới tập tành viết Unit Test, cứ nghĩ nó cũng là code đơn giản ý mà, ai ngờ đơn giản không tưởng. Nhiều những lỗi nhỏ nhỏ quá nên quyết định note lại đây. Có lẽ nó sẽ có ích nhỉ.
## 1. Đặt tên file test.
* Ví dụ mình viết test cho một class và đặt tên là Admin. đến lúc test, run lệnh
`./vendor/bin/phpunit --filter=Admin`

    Và kết quả ta nhận được là:

    `No tests executed!`
    
* Đấy, thế nên nhớ đặt tên có hậu tố 'Test' nhé. Hãy giữ đúng chuẩn file example, file example được đặt là 'ExampleTest.php' đó.
## 2. Khi dùng sqlite.

Khi mình tạo một migration để tạo table admins với cấu trúc như sau:
 ```php
        Schema::create('admins', function(Blueprint $table) {
            $table->smallInteger('id')->primary();
            $table->string('password', 60);
            $table->string('email', 100)->unique;
            $table->rememberToken();
        });
```
Sau đó trong quá trình làm phát hiện muốn thêm field cho admins, nên tạo thêm một migration nữa để update admins.
```php
        Schema::table('admins', function (Blueprint $table) {
            Schema::table('admins', function ($table) {
            $table->timestamps();
        });
```
**Khi cấu hình DB_CONECTION:sqlite và run phpunit sẽ gặp phải lỗi sau:**
`Doctrine\DBAL\Driver\PDOException: SQLSTATE[HY000]: General error: 1 no such column: created_user`.

Và rồi sau một hồi đọc docs [laravel](https://laravel.com/docs/5.3/migrations#columns) thì tìm được một cảnh báo như sau:
> Note: Dropping or modifying multiple columns within a single migration while using a SQLite database is not supported.
>
Kết lại là khi mọi người viết unit test mà đã viết xong hết tất cả migration, có những migration mà `MySQL Only` thì nên xem xét việc tạo một connection mysql để test thay vì dùng sqlite.
## 3. Khi khởi tạo một function dùng factory với `@before` annotation.
Khi bạn khởi tạo một `@before` annotation, function này sử dụng factory:
```php
    protected $users;

    /**
     * Init data
     *
     * @before
     *
     * @return void
     */
    public function initData()
    {
        $fields = [
            'username' => 'Example test',
            'created_user' => 'Test',
        ];
        $this->users = factory(User::class, 3)->create($fields);
    }
```
> Nếu ai chưa biết về annotation `@before` thì mình nói qua một chút như này: function này sẽ luôn chạy đầu tiên khi mà bạn run phpunit với bất kỳ function nào khác của class.

Khi run phpunit bạn sẽ thấy có lỗi như sau:

`Unable to locate factory with name [default] [App\Model\User].`

Để giải quyết lỗi này thì trong function initData bạn chỉ cần call
`$this->createApplication(); ` or `$this->refreshApplication();`.

## 4. Khi sử dụng `@testWith`

Khi sử dụng `@testWith` nên lưu ý dùng nháy `""` thay vì nháy `'` đơn cho biến. Nếu dùng nháy đơn `''`
```
    /**
     * Test scope findByFields.
     *
     * @param array $usernameTest
     * @test
     * @testWith [{'username': 'Example', 'created_user': 'Test'}]
     *
     * @return void
     */
```
 Khi run phpunit sẽ có lỗi:
 
     The data set for the @testWith annotation cannot be parsed: Syntax error

Lỗi này chỉ là do nháy đơn và nháy kép thôi. Sửa lại là lại ngon lành cành đào ngay
```
    /**
     * Test scope findByFields.
     *
     * @param array $usernameTest
     * @test
     * @testWith [{"username": "Example", "created_user": "Test"}]
     *
     * @return void
     */
```