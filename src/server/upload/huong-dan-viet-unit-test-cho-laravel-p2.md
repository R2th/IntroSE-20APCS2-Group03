# Lời mở đầu
Chào mừng các bạn tới với phần 2 của serie hướng dẫn viết Unit Test trong Laravel. Sau phần 1 nói về những lợi ích mà Unit Test có thể mang lại cho ứng dụng của chúng ta, phần này mình sẽ hướng dẫn các bạn sử dụng PHPUnit và chạy những dòng Unit Test đầu tiên
# Nội dung
Để có thể bắt đầu chạy test cho Laravel, trước tiên chúng ta cần một project Laravel nhỉ. 

* Bước 1: Tạo một ứng dụng Laravel mới:

> composer create-project --prefer-dist laravel/laravel laravel-test-example
> 
Với "laravel-test-example" là tên thư mục chứa project Laravel.

Chú ý: Nếu sử dụng MacOS/Linux, bạn phải set lại permission cho thử mục **storage** và  **bootstrap/cache**

* Bước 2: Bắt tay vào sử dụng PHPUNit

Thật may mắn cho chúng ta, PHPUnit sẽ được Laravel cài đặt sẵn khi khởi tạo ứng dụng mới.

![](https://miro.medium.com/max/330/1*XY6C8MN6Egud65t0Hf2zUA.png)

Laravel sẽ khởi tạo sẵn chúng ta hai thư mục Là **Feature** và **Unit**. 2 thư mục này cũng sẽ tương ứng phương thức bạn test ứng dụng. Một số ví dụ về cách bạn sẽ test.

* Feature Test:  Bạn sẽ POST một dự liệu lên một REST endpoint, và kiểm tra xem API có trả về kết quả như mong muốn.
* Unit Test: Khởi tạo một Model, và kiểm tra Model đó có đầy đủ các tham số như mong muốn hay không.

Ngoài thư mục **./tests/**  thì bạn cần quan tâm tới file phpunit.xml. Nơi đây sẽ chứa toàn bộ các tham số để chạy PHPUnit.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit backupGlobals="false"
         backupStaticAttributes="false"
         bootstrap="vendor/autoload.php"
         colors="true"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         processIsolation="false"
         stopOnFailure="false">
    <testsuites>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>

        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
    </testsuites>
    <filter>
        <whitelist processUncoveredFilesFromWhitelist="true">
            <directory suffix=".php">./app</directory>
        </whitelist>
    </filter>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="CACHE_DRIVER" value="array"/>
        <env name="SESSION_DRIVER" value="array"/>
        <env name="QUEUE_DRIVER" value="sync"/>
    </php>
</phpunit>
```

Do trong serie này, mình sẽ hưỡng dẫn chủ yếu về Unit Test nên bạn không cần quá quan tâm tới thư mục Feature. Bên cạnh đó, bạn hoàn toàn có thể xoá bỏ Test Suite Feture đi.

```html
   <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
```

Sau khi save lại file, mở terminal lên và gõ command như sau 
> vendor\bin\phpunit
> 
Để kiểm tra xem PHPUnit đã chạy được chưa. Và ta sẽ được kết quả như sau:
![](https://images.viblo.asia/5c895d60-0f1f-4749-99bc-8a2542c15d2f.png)

Nếu như sau khi chạy ta được dòng chữ xanh nghĩa là tất cả các Test của chúng ta chạy thành công. Còn nếu có vấn đề gì khi chạy test, ta sẽ nhận được thông báo:
![](https://images.viblo.asia/763ecdab-42d1-420c-b643-bc9200cd878f.png)

* Bước 3: Khởi tạo file Test

Bạn sử dụng command này đẻ tạo file Test:
> php artisan make:test ExampleTest –unit
> 
Ta thấy trong câu lệnh có sử dụng **--unit**. Bằng việc thêm **--unit** là sẽ bảo Laravel hãy tạo vào thư mục Unit thay vì Feature.

Quy ước khí khởi tạo file test:

 Các file test cần được ánh xạ 1-1 với codebase và tên file được thêm chữ Test. 

| File trong thư mục app| File trong thư mục test | 
| -------- | -------- |
| ./app/Foo.php     | ./tests/Unit/FooTest.php     |
| ./app/Bar.php   | ./tests/Unit/BarTest.php     |
|./app/Controller/Baz.php  | ./tests/Unit/Controller/BazTest.php  |
  
  
Chúng ta thử mở file ExampleTest.php có sẵn trong folder Unit


```php:./tests/Unit/ExampleTest.php
<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }
}
```

Trước tiên ta nhận thấy khởi đầu file là **namespace**. Các Namespace khác nhau sẽ giúp ta tránh được tình trạng lặp tên.

Nhìn vào function **testBasicTest** ta thấy function đó gọi tới một hàm **assertTrue**. Vậy **assertTrue** là gì ta ???

**assertTrue** là một **Assertion**,  Mình có tham khảo định nghĩa Asertion trên wiki như sau:
> Assertion là một câu lệnh khẳng định cho kết quả true - false, nó được đặt trong chương trình để chỉ cho lập trình viên thấy rằng xác nhận này luôn đúng ở vị trí đặt câu lệnh, hay nói một cách khác assertion kiểm tra một câu lệnh là đúng. 
> 
Nói tó gọn như sau, ta sẽ truyền thao số vào các hàm Assertion và hàm sẽ trả ra true và false. Nếu true thì pass test , và ngược lại.

PHPUnit có hơn 90 Assertion, nhưng đa phần mình sử dụng một phần rất nhỏ trong số đấy. Đây là một số assertion thuờng gặp:


|  |   |   |
| -------- | -------- | -------- |
| assertTrue()     | assertFalse()     | Kiểm tra dữ liệu là kiểu boolean     |
| assertEquals()     | assertNotEquals()     | So sánh bằng     |
| assertSame()     | assertNotSame()     | So sánh bằng nhau và cùng kiểu dữ liệu     |
| assertContains()     | assertNotContains()     | Kiểm tra trong String hoặc Array có phần tử này không  |
| assertArrayHasKey()     | assertArrayNotHasKey()     |Kiểm tra trong Array có Key |
| assertInstanceOf()     | assertNotInstanceOf()     | Kiểm tra là kiểu dữ liệu|
| assertCount()     | |Kiểm tra số phần tử|
| expectException()  |    |Expect sẽ có Exception khi gọi chạy unit |

# Tổng kết 

Chúng ta đã đi các bước để có thể setup PHPUnit và học thêm một chút về Unit Test. Phần tiếp theo mình sẽ viết test trong một dự án thật và cách mock đúng cách :+1: