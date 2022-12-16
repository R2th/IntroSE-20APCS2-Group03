**Đến với bài này chúng ta sẽ cùng tìm hiểu về Browser Test trong Laravel. Let's begin.**

Như các bạn đã biết thì với các bản Laravel trước version 5.4, phần Testing cung cấp cho chúng ta nhiều method để Test HTTP request hoặc Test hành vi của trình duyệt như visit một trang, click link, button...Laravel sử dụng thành phần Symfony BrowserKit để mô phỏng một trình duyệt web nhưng nó không phải là một trình duyệt thực sự.

Với Laravel 5.4 trở đi thì điều này đã thay đổi. Mặc định thì ứng dụng sẽ chứa một thư mục Feature và một thư mục Unit. Phần test tính năng sẽ giống như test Application của các bản Laravel trước đó nhưng sẽ không bao gồm browser nữa, vì vậy nếu bạn muốn thực hiện các thao tác như visit một trang, click vào một link… bạn sẽ cần đến Dusk. Tất cả mọi thứ liên quan đến trình duyệt bây giờ sẽ là một phần của Dusk và với Dusk bây giờ chúng ta đã có một trình duyệt thực sự.
## 1/ Laravel Dusk là gì?
- Laravel Dusk là một browser automation testing tool được bắt đầu giới thiệu trong Laravel 5.4 và được dùng trong các version sau. 
- Dusk dựa trên các công cụ nguồn mở ChromeDriver và Facebook Php-webdriver. 
- Nó là công cụ hoàn hảo để kiểm thử các ứng dụng và API trong trình duyệt. 
- Theo mặc định, Dusk không yêu cầu bạn cài đặt JDK hoặc Selenium trên máy của bạn, nó sử dụng ChromeDriver.
- Và bạn cũng có thể sử dụng bất kỳ driver Selenium tương thích.
##  2/ Cài đặt Laravel Dusk
 **Điều kiện tiên quyết** 
 - Laravel 5.7
 - PHP 7.1.3+

Bạn phải thêm Dusk vào dự án của mình bằng cách run: `composer require --dev laravel/dusk`

Sau đó chạy lệnh `php artisan dusk:install` 
- Một thư mục Browser sẽ được tạo trong thư mục tests của bạn. Tiếp theo, đặt biến APP_URL trong tệp .env của bạn . Giá trị này phải khớp với URL bạn sử dụng để truy cập ứng dụng của bạn trong trình duyệt.

Mặc định Dusk dùng browser là Google Chrome. Các bạn có thể sử dụng Browser khác bằng cách vào `tests/DuskTestCase.php` và sửa lại thành: 
```
public static function prepare()
{
    // static::startChromeDriver();
}
```
Tiếp theo bạn sửa trong phương thức `driver` URL và cổng bạn chọn. Và chỉnh sửa DesiredCapabilities cần chuyển đến cho WebDriver.
```
protected function driver()
{
    return RemoteWebDriver::create(
        'http://localhost:4444/wd/hub', DesiredCapabilities::phantomjs()
    );
}
```
## 3/ Bắt đầu thực hiện Test
**a/** Trước tiên thì chúng ta tạo file Test, run `php artisan dusk:make BasicTest`

Bây giờ trong thư mục `tests\Browser` của bạn, bạn sẽ thấy tệp `BasicTest.php` trông như thế này:
```
<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class BasicTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->browse(function ($browser) {
            $browser->visit('/')
                    ->assertSee('Laravel');
        });
    }
}
```
 - Mặc định, Dusk sẽ ko mở browser khi chạy test nên bạn muốn mở browser để xem thì chỉ cần disable `--headless` trong phương thức driver()
 
**b/** Tiếp theo chúng ta sẽ test các phần Register và Login của Laravel:
- Test Register
```
    public function testRegister()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/') //Go to the homepage
                    ->clickLink('Register') //Click the Register link
                    ->assertSee('Register') //Make sure the phrase in the arguement is on the page
                    ->value('#name', 'Test')
                    ->value('#email', 'test@example.com')
                    ->value('#password', '123456')
                    ->value('#password-confirm', '123456')
                    ->click('button[type="submit"]') //Click the submit button on the page
                    ->visit('/home')
                    ->assertPathIs('/home') //Make sure you are in the home page
                    ->assertSee("You are logged in!");
        });
    }
```
Sau đó run `vendor/bin/phpunit tests/Browser/BasicTest.php` , sẽ chỉ run tệp BasicTest.php thay vì run `php artisan dusk` sẽ run tất cả tệp chứa 'Test' trong thư mục Browser
```
..                                                                  2 / 2 (100%)

Time: 2.15 seconds, Memory: 12.00MB

OK (2 tests, 4 assertions)
```
Lưu ý với Register thì khi run lại nhớ thay đổi value email để tránh bị lỗi trùng email.

- Test Login
```
    public function testLogin()
    {
        $user = factory(User::class)->create();

        $this->browse(function ($browser) use ($user) {
            $browser->visit('/login')
                    ->type('email', $user->email)
                    ->type('password', 'secret')
                    ->press('Login')
                    ->assertPathIs('/home')
                    ->visit('/home');
        });

        $this->browse(function ($first, $second) {
            $first->loginAs(User::find(1))
                  ->visit('/home');
        });
    }
```

Kết quả:
![](https://images.viblo.asia/355469b6-1355-4923-b56e-d15fc7acd1e7.gif)

- Thêm 1 phần testLogout nữa
```
    public function testLogout()
    {
        $this->browse(function ($browser) {
            $browser->visit('/home')
                    ->click('a[id="navbarDropdown"]')
                    ->click('a[onclick]')
                    ->assertPathIs('/')
                    ->assertSee('Laravel');
        });
    }
```

Run thì được kết quả 
```
...                                                                 3 / 3 (100%)

Time: 2.82 seconds, Memory: 16.00MB

OK (3 tests, 4 assertions)
```

Ngoài 'click' hay 'press' trong những ví dụ thì còn có các loại tương tác khác, có thể tham khảo tại https://laravel.com/docs/5.7/dusk#interacting-with-elements

Và Dusk cung cấp một loạt các assert mà bạn có thể thực hiện để test đối với ứng dụng của mình. https://laravel.com/docs/5.7/dusk#available-assertions

*Đối với mình thì Dusk thực sự rất thú vị và giúp cho việc test application dễ dàng và hiệu quả hơn rất nhiều*

**Bài này chúng ta đã tìm hiểu cơ bản nhất của Browser Test. Hy vọng sẽ giúp ích cho các bạn khi áp dụng vào dự án của mình. Chúc các bạn thành công :D**