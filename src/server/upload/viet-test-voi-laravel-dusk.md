## Mở đầu
Tất cả chúng ta đều hiểu rằng testing là công việc quan trọng đối với mọi dự án. Nhằm giúp cho các developer có thể thực hiện test ứng dụng dễ dàng hơn thì ở bản Laravel 5.4 cho ra đời Dusk. Ở bài viết hôm nay mình sẽ nói rõ hơn về Dusk để xem nó giúp được gì cho chúng ta trong việc test ứng dụng Laravel nhé.

Laravel Dusk cung cấp API thử nghiệm và tự động hóa trình duyệt dễ sử dụng. Theo mặc định, Dusk không yêu cầu bạn cài đặt JDK hoặc Selenium trên máy của bạn. Thay vào đó, Dusk sử dụng cài đặt [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/home) độc lập. Tuy nhiên, bạn có thể tự do sử dụng bất kỳ trình điều khiển tương thích Selenium nào khác mà bạn muốn.
## Cài đặt
Để bắt đầu, bạn vào terminal gõ lệnh sau để cài đặt Dusk:
```
composer require --dev laravel/dusk:"^4.0"
```
Khi Dusk đã được cài đặt bạn cần đăng ký **Laravel\Dusk\DuskServiceProvide**r service provider. Bạn cần đăng ký provider này trong phương thức register của AppServiceProvider để giới hạn môi trường mà Dusk được sử dụng.
```
<?php
...
public function register()
{
    if ($this->app->environment(\'local\', \'testing\')) {
        $this->app->register(DuskServiceProvider::class);
    }
}
...
```
Sau khi cài đặt gói Dusk , chạy lệnh **dusk:install** 
```
php artisan dusk:install
```
Khi chạy xong thì một thư mục Browser sẽ được tạo ra trong thư mục tests.
> Đừng quên thêm APP_URL của bạn vào file .env vì Dusk sẽ cần nó để duyệt ứng dụng của bạn.
Để chạy test của bạn, sử dụng lệnh
```
php artisan dusk
```

## Sử dụng các trình duyệt khác
Theo mặc định, Dusk sử dụng Google Chrome và cài đặt[ ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/home) độc lập để chạy thử nghiệm trình duyệt của bạn. Tuy nhiên, bạn có thể khởi động máy chủ Selenium của riêng mình và chạy thử nghiệm với bất kỳ trình duyệt nào bạn muốn.

Để bắt đầu, hãy mở tệp **tests / DuskTestCase.php**, đây là trường hợp thử nghiệm Dusk cơ sở cho ứng dụng của bạn. Trong tệp này, bạn có thể xóa cuộc gọi đến phương thức **startChromDriver**. Điều này sẽ ngăn Dusk tự động khởi động ChromeDriver:
```
/**
 * Prepare for Dusk test execution.
 *
 * @beforeClass
 * @return void
 */
public static function prepare()
{
    // static::startChromeDriver();
}
```

Tiếp theo, bạn có thể sửa đổi phương thức **drive** để kết nối với URL và cổng bạn chọn. Ngoài ra, bạn có thể sửa đổi "các khả năng mong muốn" cần được chuyển đến WebDriver:

```
/**
 * Create the RemoteWebDriver instance.
 *
 * @return \Facebook\WebDriver\Remote\RemoteWebDriver
 */
protected function driver()
{
    return RemoteWebDriver::create(
        'http://localhost:4444/wd/hub', DesiredCapabilities::phantomjs()
    );
}
```
## Bắt đầu
Để tạo một Dusk test, hãy sử dụng lệnh **dusk:make**. File test được tạo sẽ được đặt trong thư mục tests / Browser:
```
php artisan dusk:make LoginTest
```

Sau khi tạo file test, chúng ta có thể sửa đổi nó để điều hướng đến trang đăng nhập, nhập một số thông tin đăng nhập và nhấp vào nút "Đăng nhập". Để tạo một phiên bản trình duyệt, gọi phương thức **browse**:
```
public function testBasicExample()
    {
        $user = factory(User::class)->create([
            'email' => 'taylor@laravel.com',
        ]);

        $this->browse(function ($browser) use ($user) {
            $browser->visit('/login')
                    ->type('email', $user->email)
                    ->type('password', 'secret')
                    ->press('Login')
                    ->assertPathIs('/home');
        });
    }
```

Như bạn có thể thấy trong ví dụ trên, phương thức **browse** chấp nhận gọi lại. Một phiên bản trình duyệt sẽ tự động được chuyển đến cuộc gọi lại này bởi Dusk và là đối tượng chính được sử dụng để tương tác và đưa ra các xác nhận đối với ứng dụng của bạn.

**Tạo nhiều trình duyệt**

Đôi khi bạn có thể cần nhiều **browse** để thực hiện kiểm tra đúng cách:
```
$this->browse(function ($first, $second) {
    $first->loginAs(User::find(1))
          ->visit('/home')
          ->waitForText('Message');

    $second->loginAs(User::find(2))
           ->visit('/home')
           ->waitForText('Message')
           ->type('message', 'Hey Taylor')
           ->press('Send');

    $first->waitForText('Hey Taylor')
          ->assertSee('Jeffrey Way');
});
```

Bạn có thể sử dụng phương pháp **resize** để điều chỉnh kích thước của cửa sổ trình duyệt:
```
$browser->resize(1920, 1080);
```
Phương pháp **maximize** có thể được sử dụng để tối đa hóa cửa sổ trình duyệt:
```
$browser->maximize();
```

## Kết luận
Khi sử dụng Dusk mình chỉ muốn nói rằng nó thực sự rất vi diệu. Hãy cùng trải nghiệm nhé
Bạn có thể tham khảo thêm [tại đây](https://laravel.com/docs/5.8/dusk)