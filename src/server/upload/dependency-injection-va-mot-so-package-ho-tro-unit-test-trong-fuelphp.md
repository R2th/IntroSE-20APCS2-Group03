# 1. Dependency Injection
Dependency Injejection (DI) không chỉ là một cách thiết kế code tốt, giúp tách biệt các phần chức năng cho code mà một trong những lợi ích nó mang lại không nhỏ đó là phục vụ cho Unit Test. Với một số framework đã hỗ trợ sẵn DI như Laravel thì không nói nhưng với một số framework khác của PHP không hỗ trợ DI, bạn phải cài package hỗ trợ để có thể tiến hành Unit Test

Không mạnh như Laravel tuy nhiên FuelPHP vẫn hỗ trợ DI mặc dù hơi tù @@

## 1.1. Cài đặt

Cập nhật composer.json

```json
"require": {
    ...
        "fuelphp/dependency": "dev-master",
    },
```

Chạy update composer
```
$ composer update
```
Sử dụng container: Container dược coi là thành phần chính để các gói dependency và liên kết chúng với nhau. Container cũng là nơi bạn đăng kí tài nguyên, service provider và truy xuất vào các thành phần dependency.
```php
$container = new Fuel\Dependency\Container;
```
## 1.2. Sử dụng

Có 3 cách sử dụng DI

* Định nghĩa qua string
```php
// Register
$container->add('string', 'stdClass');

// Resolve
$instance = $container->get('string');
```

* Định nghĩa qua Closure
```php
// Register
$container->add('closure.object', function() {
	return new stdClass;
});

// Resolve
$instance = $container->get('closure.object');
```

* Sử dụng thông qua Service Providers

Cách này được sử dụng cho giống Laravel, dễ dàng kiểm soát các lớp phụ thuộc hơn nữa :D

Container:  (**fuel/app/classes/container.php**)
```php
<?php
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace

use Fuel\Dependency\Container as FuelContainer;

class Container
{
    private static $instance;

    private static $providers = [
        \Provider\Provider::class,
    ];

    public static function getInstance()
    {
        if (is_null(static::$instance)) {
            static::$instance = new FuelContainer;

            foreach (static::$providers as $provider) {
                static::$instance->addServiceProvider($provider);
            }
        }

        return static::$instance;
    }

    public static function __callStatic($method, $arguments)
    {
        return call_user_func_array([static::getInstance(), $method], $arguments);
    }
}
```

Provider: Tạo thư mục và class với đường dẫn **fuel/app/provider/provider.php**

```php
<?php

namespace Provider;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Model\Book;

class Provider extends AbstractServiceProvider
{
    protected $provides = ['book'];

    public function register()
    {
        $this->getContainer()->add('book', new Book());
    }
}
```
Ví dụ ở trên là lớp book sẽ được DI

Gọi class
```php
Container::get('book')
```
Khi test, bạn muốn thay đổi DI, lúc đó chỉ cần sử dụng phương thức add()
```php
Container::add('book', $newBookClass)
```

# 2. Một vài package hỗ trợ Unit Test

Các package giúp bạn hỗ trợ bạn trong việc test tốt hơn, nếu bạn cố tình sử dụng các phương thức tĩnh thay vì DI mà không muốn thay đổi code @@ hoặc một số trường hợp khác

Để đơn giản, ta sẽ viết testcase cho controller Test
```php
<?php
/**
 * Created by PhpStorm.
 * User: FRAMGIA\nguyen.van.minhb
 * Date: 03/07/2018
 * Time: 14:27
 */
use Model\Test;
class Controller_Test extends Controller
{
    // For testing static method
    public function action_doYouLoveMe()
    {
        return Test::doYouLoveMe();
    }
    public function action_testRedirect()
    {
        $test = Test::doYouLoveMe();
        return Response::redirect('book/index');
    }
}
```
## 2.1. Mockery

Mockery hỗ trợ việc PHP mock object cái mà được sử dụng trong PHP Unit, PHPSpec và một vài trường hợp test khác. Mục đích cốt lõi của nó là cũng cấp các API cô đọng, dễ hiểu cho các phương thức test

Hơn nữa Mockery còn hỗ trợ cho việc test các phương thức static khá hiệu quả. Xem xét ví dụ sau

Cài đặt
```json
"require": {
    ...
        "mockery/mockery": "dev-master",
    },
```

Sử dụng để test phương thức trong controller

```php
public function test_testStaticMethodWithMockery()
{
    $newTestClass = \Mockery::mock('alias:Test');
    $newTestClass
        ->shouldReceive('doYouLoveMe')
        ->once()
        ->andReturn(true);
    $result = $newTestClass::doYouLoveMe();
    $this->assertTrue($result);
}
```

## 2.2. Aspect

Sử dụng Mockery giúp test các phương thức static rất tốt, tuy nhiên những phương thức static được gọi nhiều lần thì mình vẫn chưa biết cách sử dụng Mockery để mock cho các phương thức static khác nhau ý @@ ( ví dụ như giả lập dữ liệu trả về từ phương thức tĩnh login cho nhiều test case :D). Mình được giúp đỡ với package Aspect.

Cài đặt 

```json
"require": {
    ...
        "codeception/aspect-mock": "1.*",
    },
```

Aspect test thông qua việc tạo request thông qua class `Request`
```php
 public function test_testStaticMethosWithAspect()
{
    $return = true;
    // Mock các phương thức
    Aspect::double(Test::class, [
        'doYouLoveMe' => $return,
    ]);
    // Execute a request to 'test/redirect'
    $response = Request::forge('test/doYouLoveMe')
        ->set_method('GET')
        ->execute()
        ->response();
    // Xác nhận tham số redirect có phải project/top không?
    $this->assertEquals(200, $response->status);
    // Note: truyen tham so theo post
    /*
    // Execute a request to 'test/redirect'
    $response = Request::forge('project/auth/login')
        ->set_method('POST')
        ->set_post([
            'user_id' => 1,
            'member_id' => 32443,
        ], null)
        ->execute()
        ->response();
    */
}
```
Đây là test cho phương thức `redirect`
```php
public function test_testRedirect()
{
    // Replace Response::redirect() with a test double which only returns true
    $res = Aspect::double(Response::class, [
        'redirect' => true
    ]);
    // Execute a request to 'test/testRedirect'
    $response = Request::forge('test/testRedirect')
        ->set_method('GET')
        ->execute()
        ->response();
    $res->verifyInvoked('redirect', ['book/index']); // tương đương assert
    $this->assertEquals(200, $response->status);
}
```

# Tài liệu tham khảo
* DI trong Unit Test: https://viblo.asia/p/php-unit-test-501-su-dung-mock-objects-stub-methods-va-dependency-injection-YWOZryg7KQ0
* Aspect with FuelPHP: http://blog.a-way-out.net/blog/2014/01/10/fuelphp-aspectmock/
* Mockery: http://docs.mockery.io/en/latest/
* Link github Unit Test: https://github.com/minhnv2306/authencation_fuelphp/pull/1/files
* Link viblo tham khảo: https://viblo.asia/s/php-unit-testing-with-phpunit-Wj53OmBb56m