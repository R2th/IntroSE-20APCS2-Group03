Chúng ta đã cùng tìm hiểu cơ bản về Unit Test ở bài viết trước, và ở trong bài này chúng ta cùng đi tìm hiểu cơ bản về Feature Test trong Laravel. OK bắt đầu thôi!!!!
- Lưu ý: Phải config database với laravel nhé :D
### 1/ Feature Test
- Feature Test có thể kiểm tra một phần lớn hơn code của bạn, bao gồm cả cách một số đối tượng tương tác với nhau hoặc thậm chí là một yêu cầu HTTP đầy đủ đến JSON endpoint. 
- Trong bài này, chúng ta sẽ test thử với phần login và register của Laravel.
### 2/ Tạo file Feature Test

- Mở terminal trong thư mục Laravel và gõ lệnh: `php artisan make:Test BasicFeatureTest`
### 3/ Viết basic test
- Chúng ta sẽ viết function để  test trang Login của Laravel 
```
<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BasicFeatureTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testUserCanViewLogin()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertViewIs('auth.login')->assertSee('Login');
    }
}
```
- Sau đó chạy lệnh `vendor/bin/phpunit tests/Feature/BasicFeatureTest.php`
Và nó sẽ cho ra kết quả
```
PHPUnit 7.5.1 by Sebastian Bergmann and contributors.

F                                                                   1 / 1 (100%)

Time: 89 ms, Memory: 12.00MB

There was 1 failure:

1) Tests\Feature\BasicFeatureTest::testExample
Expected status code 200 but received 404.
Failed asserting that false is true.

/var/www/html/laravel/vendor/laravel/framework/src/Illuminate/Foundation/Testing/TestResponse.php:133
/var/www/html/laravel/tests/Feature/BasicFeatureTest.php:20

FAILURES!
Tests: 1, Assertions: 1, Failures: 1.
```
- Kết quả này báo 1 lỗi: chúng ta mong muốn sẽ trả về 200 nhưng lại nhận được 404 có nghĩa là trang login hiện tại chưa có.
- Chạy lệnh `php artisan make:auth` để tạo route và view cơ bản của phần Authentication của Laravel
- Sau đó chạy lại lệnh `vendor/bin/phpunit tests/Feature/BasicFeatureTest.php`
```
PHPUnit 7.5.1 by Sebastian Bergmann and contributors.

.                                                                   1 / 1 (100%)

Time: 120 ms, Memory: 12.00MB

OK (1 test, 1 assertion)
```
- Chúng ta sẽ làm tương tự với view trang Register
```
public function testUserCanViewRegister()
{
    $response = $this->get('/register');

    $response->assertStatus(200);
    $response->assertViewIs('auth.register')->assertSee('register');
}
```

- Giờ sẽ test đến phần logic của Login và Register
    * Phần Register
    ```
    public function testCanRegister()
    {
        $this->assertGuest();
        $user = factory(User::class)->make();

        $response = $this->post('/register', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'feature',
            'password_confirmation' => 'feature'
        ]);

        $response->assertStatus(302)->assertRedirect('/home');
        $this->assertAuthenticated();
    }
    ```
    * Phần Login: 
    ```
    public function testCanLogin()
    {
        $this->assertGuest();
        $user = factory(User::class)->create([
            'password' => bcrypt('feature'),
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'feature',
        ])
            ->assertStatus(302)
            ->assertRedirect('/home');
        $this->assertAuthenticatedAs($user);
    }

    public function testUserCannotLoginWithIncorrectPassword()
    {
        $user = factory(User::class)->make([
            'password' => bcrypt('laravel'),
        ]);

        $response = $this->from('/login')->post('/login', [
            'email' => $user->email,
            'password' => 'invalid-password',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHasErrors('email');
        $this->assertTrue(session()->hasOldInput('email'));
        $this->assertFalse(session()->hasOldInput('password'));
        $this->assertGuest();
    }
    ```
Chạy lại `vendor/bin/phpunit tests/Feature/BasicFeatureTest.php` ta sẽ có đc kết quả 
```
PHPUnit 7.5.1 by Sebastian Bergmann and contributors.

.....                                                               5 / 5 (100%)

Time: 121 ms, Memory: 18.00MB

OK (5 tests, 28 assertions)
```
Như vậy là chúng ta đã tìm hiểu cơ bản về Feature Test của Laravel thông qua phần login và register, qua đó các bạn có thể áp dụng tương tự với các feature khác trong dự án của bạn :D :D