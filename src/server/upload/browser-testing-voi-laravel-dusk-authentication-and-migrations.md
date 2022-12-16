# 1.Giới thiệu
Ở bài viết này(link) mình đã hướng dẫn các bước cài đặt cơ bản. Bài viết này hướng dẫn cách bạn có thể làm việc với cơ sở dữ liệu của mình khi test Laravel Dusk.

Việc đầu tiên là tạo cơ sở dữ liệu riêng phục vụ cho việc test, tránh ảnh huổng tới dữ liệu gốc của Laravel app. Chúng ta sẽ cấu hình trong file .env.dusk như sau.

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_dusk
DB_USERNAME=root
DB_PASSWORD=
```

Ở đây mình đã tạo một database là `laravel_dusk` và sử dụng hệ quản trị cơ sở dữ liệu Mysql

# 2.Sử dụng DatabaseMigations trong Dusk

Mặc định Laravel cung cấp ba traits là `DatabaseMigrations`, `DatabaseTransactions` và `RefreshDatabase` để làm việc với database trong testing. Tuy nhiên khi testing với dusk chúng ta chỉ có thể sử dụng `DatabaseMigrations` vì `DatabaseTransaction` không được áp dụng trong browser test (HTTP Request) và `RefreshDatabase` thì được xây dựng dựa trên `DatabaseTransaction`.

Bạn chỉ cần import `DatabaseMigrations` trong các file chứa test case, nó sẽ chạy toàn bộ các phương thức `up()` trước mỗi test và sau đó chạy toàn bộ các phương thức `down()` sau mỗi test. Ngĩa là nó sẽ tạo các table, thêm/sửa các column trước khi test và sau đó drop tất cả sau khi quá trình test kết thúc

Phương thức `up()` và `down()` khi tạo một table
```php
<?php

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
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}

```

Để sử dụng `DatabaseMigrations` chỉ cần import từ `Illuminate\Foundation\Testing\DatabaseMigrations` và use trong class định nghĩa các test case như sau

```php
<?php

namespace Tests\Browser;

use App\User;
use Tests\DuskTestCase;
use Laravel\Dusk\Chrome;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ExampleTest extends DuskTestCase
{
    use DatabaseMigrations;

    /** @test */
    public function userLoginTest(){

        $user = factory('App\User')->create();

        $this->browse(function (Browser $browser) use($user) {
            $browser->loginAs($user)
                ->visit('/home')
                ->assertSee('Dashboard');
        });
    }
}
```

DatabaseMigations thực hiện điều này bằng cách chạy lệnh `php artisan migrate` trong phương thức setUp() trước khi chạy test và sau đó chạy lệnh `php artisan migrate:rollback` sau khi chạy mỗi test trong phương thức `tearDown()`. Xem thêm [setUp và tearDown method](https://www.dyclassroom.com/phpunit/phpunit-fixtures-setup-and-teardown)  

Như bạn có thể thấy trong ví dụ trên, ta cũng có thể sử dụng factory methods để tạo dữ liệu test trong cơ sở dữ liệu, sau đó sử dụng các dữ liệu này trong dusk test.

## 2.1 Tạo dữ liệu mẫu trước khi chạy Dusk Test.

Sau khi tạo các table cho database bằng migrate, ta có thể tạo một số dữ liệu cần thiết vào cơ sở dữ liệu mẫu để phục vụ cho Laravel app bằng seeding sử dụng lệnh 

```
php artisan db:seed
```
Bạn cũng có thể thực hiện việc này bằng overide lại phương thức `setUp()` và chạy lệnh trên ngay trong phương thức này
```php

public function setUp()
{
    parent::setUp();
    $this->artisan('db:seed');
}
```

Điều này đảm bảo rằng dữ liệu mẫu sẽ được tạo trước khi test.

## 2.2 Nhược điểm của việc sử dụng DatabaseMigrations

Sử dụng DatabaseMigations sẽ tốn rất nhiều thời gian để thực hiện test. Trong trường hợp cơ sở dữ liệu lớn với rất nhiều table, DatabaseMigations sẽ tạo tất cả các bảng trước khi test và sẽ hủy chúng sau khi test, quá trình này sẽ mất rất nhiều thời gian.


Vì vậy, thay vì sử dụng DatabaseMigations bạn có thể chạy lệnh migrate và db:seed thủ công trước khi test và trong trường hợp bạn chỉ muốn xóa dữ liệu sau khi test nhưng vẫn giữ nguyên các table thì có thể sử dụng phương thức truncate để xóa dữ liệu trong các table trong phương thức tearDown()

```php
    public function tearDown()
    {
        User::truncate();
        parent::tearDown();
    }
```

# 3.Authentication
## 3.1 Login và Logout trong Laravel Dusk

Khi muốn test một chức năng nào đó yêu cầu người dùng phải đăng nhập vào trước, bạn có thể sử dụng phương thức `loginAs` được cung cấp bởi laravel dusk

```php
/** @test */
public function testAuthentication()
{
    $this->browse(function (Browser $browser) {
        $browser->loginAs(User::find(1))
                ->visit('/home')
                ->assertSee('Dashboard');
    });
}
```
Điều này sẽ giúp ta có thể login ngay mà không cần phải đi từ trang login vào và giúp tiết kiệm rất nhiều thời gian. Phương thức `loginAs` nhận tham số là đối tượng của class User hoặc id của user hay thậm chí là email

```php
$browser->loginAs(1);
$browser->loginAs('emailid@testemail.com');
$browser->loginAs($user);
```

Ngược lại, khi bạn muốn đăng xuất, chỉ cần gọi đến phương thức `logOut()`

### 3.2 Authentication test

Laravel dusk cung cấp một số phương thức giúp bạn có thể test các chức năng authentication. 
Để kiểm tra khi người dùng sử dụng web với role là khách vãng lai (guest) ta có thể sử dụng phương thức `assertGuest()`

```php
/** @test */
public function testAuthentication()
{
    $this->browse(function (Browser $browser) {
        $browser->loginAs(User::find(1))
                ->visit('/home')
                ->assertSee('Dashboard')
                ->logout()
                ->assertGuest();
    });
}
```

Và ngược lại bạn cũng có thể kiểm tra người dùng đã đăng nhập thành công hay chưa dựa vào phương thức `assertAuthenticated()`

```php
/** @test */
public function testAuthentication()
{
    $this->browse(function (Browser $browser) {
       $browser->loginAs(User::find(1))
                 ->visit('/home')
                ->assertSee('Dashboard')
                ->assertAuthenticated();
    });
}
```

Hoặc cũng có thể kiểm tra người dùng đã đăng nhập với một user cụ thể bằng `assertAuthenticatedAs()`

```php
/** @test */
public function testAuthentication()
{
    $this->browse(function (Browser $browser) {
       $browser->loginAs(1)
                 ->visit('/home')
                ->assertSee('Dashboard')
                ->assertAuthenticatedAs(User::find(1));
    });
}
```

# 4.Kết
Trên đây là phần giới thiệu DatabaseMigations và các cách để làm việc với authentication trong laravel dusk. Cảm ơn các bạn đã quan tâm theo dõi, hẹn gặp lại ở các phần sau 😄