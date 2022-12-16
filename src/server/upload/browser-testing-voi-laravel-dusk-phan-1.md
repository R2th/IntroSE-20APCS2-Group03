# 1 Giới thiệu
Automation testing là một quá trình tự động chạy các bước thực hiện một test case bằng máy, giúp giảm thiểu lỗi, thời gian cũng như sự nhàm chán với việc manual testing. Đặt biệt khi về cuối dự án, số lượng test case nhiều thì việc test hồi quy sẽ tốn rất nhiều thòi gian. Hơn nữa khi hệ thống có nhiều ngôn ngữ khác nhau thì sẽ gây khó khăn cho các tester và dễ xảy ra sai xót.

Là một developer, thường thì chúng ta chỉ viết unit test trong dự án, tuy nhiên unit test chỉ giúp chúng ta cover được các dòng code (line of codes), các input và output của các function mà chúng ta đã viết chứ chưa cover được các hành động, thao tác của người dùng đối với hệ thống. Và ở phiên bản 5.4, laravel đã ra mắt một tính năng mới là laravel dusk để giúp chúng ta thực hiện điều này.

# 2 cài đặt

## 2.1 Project

Bước đầu tiên là chuẩn bị một project để thực hiện test, ở đây mình đã chuẩn bị sẵn một project mẫu gồm các chức năng đăng nhập, đăng ký, và thêm sửa xóa cơ bẩn để phục vụ cho việc test. Các bạn có thể clone về tại [đây](https://github.com/vupdh-0867/blog)

## 2.2 Cài đặt package Laravel dusk

Thêm package laravel dusk bằng lệnh sau:

```bash
composer require --dev laravel/dusk
```

Và cài đặt

```bash
php artisan dusk:install
```

Sau khi chạy lệnh trên, Laravel sẽ tạo một thư mục tests/Browser chứa các test case mấu, đồn thời tải và cài đặt chrome driver. Trường hợp chạy lệnh bị lỗi do không tương thích phiên bản chrome thì có thể thử theo một số cách sau:

- Cập nhật google chrome lên phiên bản mới nhất và sau đó chạy lại

```bash
sudo apt-get --only-upgrade install google-chrome-stable
```

- Kiểm tra phiên bản chrome hiện tại trên máy bạn (vào google chrome -> Help -> About Google Chrome) và cài đặt chrome dirver với phiên bản tương ứng bằng lệnh, vd: chrome 79.0.3945.88

```bash
php artisan dusk:chrome-driver 79
```

## 2.3 Cấu hình

Chúng ta hãy cùng xem phương thức driver trong file `DuskTestCase.php`

```php
<?php

    /**
     * Create the RemoteWebDriver instance.
     *
     * @return \Facebook\WebDriver\Remote\RemoteWebDriver
     */
    protected function driver()
    {
        $options = (new ChromeOptions)->addArguments([
            '--headless',
            '--start-maximized',
        ]);

        // ....
    }
}

```

$options là một tập hợp các tùy chọn khi chạy test, mặc định sẽ có các option `--headless` là không bật trình duyệt để mô phỏng khi chạy test, `--start-maximized` bật chrome với kích thước full màn hình để mô phỏng khi chạy test, các bạn có thể tham khảo thêm các option khác tại [đây](https://peter.sh/experiments/chromium-command-line-switches/). Ở đây mình sẽ bỏ option `--headless` để bật trình duyệt để mô phỏng khi chạy test. Code của mình sẽ như sau

```php
<?php

    /**
     * Create the RemoteWebDriver instance.
     *
     * @return \Facebook\WebDriver\Remote\RemoteWebDriver
     */
    protected function driver()
    {
        $options = (new ChromeOptions)->addArguments([
            '--start-maximized',
        ]);

        return RemoteWebDriver::create(
            'http://localhost:9515', DesiredCapabilities::chrome()->setCapability(
                ChromeOptions::CAPABILITY, $options
            )
        );
    }
}

```

## 2.3 File env

Mặc định Laravel dusk sẽ sử dụng các biến môi trường trong file .env của dự án, để quản lý các biến môi trường riêng cho laravel dusk, ta copy file .env.example thành một file tên là .env.dusk. Trong bài viết này mình chạy test ở localhost nên sẽ sủa lại biến APP_URL như sau:

*.env.dusk*

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000
```

# 3 Viết test

Giờ chúng ta sẽ tiến hành viết test. Đầu tiên mình sẽ xóa file ExampleTest.php trong thư mục tests/Browser vì ở ví dụ này mình sẽ test chức năng đăng ký của dự án này.

![](https://images.viblo.asia/30280daf-c7fb-4445-9c97-4dc4491a7f18.png)


với bốn field name, email, pasword, password confirmation với code html tương ứng như sau:

```html
<input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required>

<input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required>

<input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required>

<input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
```

Tạo file test chức năng đăng ký bằng lệnh

```bash
php artisan dusk:make RegisterTest
```

Laravel dusk sẽ sinh ra một file `RegisterTest.php` trong thư mục tests/Browser với nội dung như sau:

```php
<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class RegisterTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertSee('Laravel');
        });
    }
}

```

Mình sẽ xóa test example và thay bằng các test case của mình

- Test truy cập vào trang Register và kiểm tra xem có các element hay không

```php
    /**
     * Test go to register page and see elements.
     *
     * @return void
     */
    public function testGoToRegisterPage()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                    ->assertSee('Register')
                    // Tìm element bằng thuộc tính name
                    ->assertPresent('input[name="name"]')
                    ->assertPresent('input[name="email"]')
                    // Tìm element bằng thuộc tính id
                    ->assertPresent('#password')
                    ->assertPresent('#password-confirm')
                    // Tìm element bằng thuộc tính class
                    ->assertPresent('.btn-primary');
        });
    }
```

- Test chức năng đăng ký

```php
    /**
     * Test register feature works corectly.
     *
     * @return void
     */
    public function testRegisterFeature()
    {
        $this->browse(function (Browser $browser) {
            $password = 'Aa@12345';
            $faker = Faker::create();
            $name = $faker->name;
            $browser->visit('/register')
                    ->type('name', $name)
                    ->type('email', $faker->email)
                    ->type('password', $password)
                    ->type('password_confirmation', $password)
                    ->click('.btn-primary');

            $browser->assertSeeLink($name)
                    ->assertPathIs('/home');
        });
    }
```

Và chạy lệnh sau để chạy các test case

```bash
php artisan dusk
```

Và kết quả

![](https://images.viblo.asia/d92f1f03-4b19-499c-a05e-1584934161fb.gif)

Test result
![](https://images.viblo.asia/f1a57d65-7adf-4ced-aae3-9e9546e42ac5.png)


# 4 Kết

Trên đây là các bước cài đặt và ví dụ sơ bộ về Laravel dusk, ở phấn tiếp theo mình sẽ giới thiệu về các phần khác nhưu cách tương tác với các element, cách cấu trúc thư mục... Cảm ơn các bạn đã quan tâm theo dõi, hẹn gặp lại ở các phần sau :D

Tham khảo

- https://medium.com/employbl/use-laravel-dusk-browser-automation-and-php-to-programmatically-surf-the-web-7dc3b2232220
- https://laravel.com/docs/5.8/dusk