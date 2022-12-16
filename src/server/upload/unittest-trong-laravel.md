Kiểm thử phần mềm là một khâu quan trọng trong phát triển phần mềm, trước đây chúng ta thường xem nhẹ việc này vì mấy lý do: thích làm tùy tiện cho nhanh, thực hiện tốn kém hơn… Những sản phẩm được gọt dũa cẩn thận mang lại trải nghiệm tốt cho người dùng và cũng vì thế nó tồn tại lâu hơn, thành công hơn.

Kiểm thử phần mềm được chia thành nhiều dạng khác nhau theo phạm vi và giai đoạn triển khai, chúng ta cùng xem một số dạng kiểm thử chính:

- Unit testing: Kiểm thử ở mức đơn vị mã nguồn. Một đơn vị mã nguồn là thành phần nhỏ nhất trong mã nguồn mà chúng ta có thể kiểm tra. Như vậy, trong Unit testing chúng ta sẽ kiểm thử các lớp (class), phương thức (method)… Mục tiêu của unit testing là kiểm tra tính đúng đắn trong các xử lý của từng đơn vị mã nguồn.
- Integration testing: Kiểm thử tích hợp các thành phần một ứng dụng, được thực hiện sau Unit test. Trong Integration testing chúng ta có thể kiểm tra cấu trúc ứng dụng, kiểm tra chức năng, hiệu năng sản phẩm cũng như khả năng chịu tải ứng dụng.
- Ngoài ra còn rất nhiều các dạng kiểm thử khác như Acceptance testing, kiểm tra xem ứng dụng đã đạt được yêu cầu khách hàng chưa, security testing – kiểm tra tính bảo mật của ứng dụng…

Trong bài viết này, chúng ta sẽ chỉ tập trung vào Unit test với Laravel.
## 1/ PHPUnit là gì?
- PHPUnit là một trong những gói thử nghiệm đơn vị nổi tiếng nhất và được tối ưu hóa cao nhất của PHP được phát triển bởi Sebastian Bergmann. Nó là lựa chọn hàng đầu của nhiều developer để khắc phục các lỗ hổng phát triển khác nhau của ứng dụng. Chức năng chính của nó là thực hiện kiểm tra đơn vị tổng thể cho các ứng dụng, do đó, bạn có thể kiểm tra mã của mình một cách chi tiết. Tuy nhiên, bạn cũng có thể sử dụng nó cho các chức năng khác nhau, vì nó cực kỳ linh hoạt để thực hiện nhiều hơn so với thử nghiệm đơn vị. Hơn nữa, nó hỗ trợ tất cả các framework PHP chính bao gồm cả Laravel. Nhiều developer khuyên dùng nó cho tất cả các quy trình thử nghiệm đơn vị của Laravel, vì các tiêu chuẩn thử nghiệm được tối ưu hóa của nó.

- PHPUnit được phát triển với các xác nhận đơn giản, giúp bạn kiểm tra code hoàn toàn dễ dàng hơn. Hơn nữa, nó mang lại kết quả tối ưu khi bạn đang kiểm tra từng thành phần mã, cho bạn kết quả được phóng to, để có thể dễ dàng tìm ra lỗi. Tuy nhiên, điều này có nghĩa là việc kiểm tra các thành phần tiên tiến hơn nhiều như controllers, models và form validation cũng có thể hơi phức tạp.
## 2/ UnitTest trong Laravel
Unit Test trong Laravel là kiểm tra các class như Models, Repositories, kiểm tra các thuộc tính trong Models có đúng như mong đợi không.... và nó là một công cụ thực sự để xem cách bạn có thể sử dụng các Unit Test để kiếm tra business logic của ứng dụng.
### a/ Điều kiện tiên quyết
Với mục đích của hướng dẫn Unit Test Laravel, giả sử rằng đã cài đặt ứng dụng Laravel trên máy chủ web. Điều kiện cần là: 

- PHP 7.x 
- Laravel 5.7
### b/ Tạo Laravel Unit Test Case
Trong khi sử dụng PHPUnit, bước đầu tiên là tạo các class test mới. Các class test này được lưu trữ trong thư mục. / Tests / của ứng dụng Laravel của bạn. Mỗi class test nên được đặt tên là ...Test.php trong một thư mục. Vì định dạng này giúp PHPUnit tìm thấy từng lớp kiểm tra một cách dễ dàng và hơn nữa nó sẽ bỏ qua bất kỳ class nào khác không có dạng ...Test.php. 

Ở Laravel 5.7 sẽ chia thành 2 thư mục Feature và Unit, ở bài này chúng ta tìm hiểu Unit test nên để tạo ra file nằm trong folder Unit thì phải thêm `--unit` vì mặc định sẽ tạo ra trong Feature.

Mở terminal và gõ lệnh:
`php artisan make:Test BasicTest --unit`

Laravel sẽ tạo ra  basic test class trông như thế này:
```
<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BasicTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
}
```
### c/ Viết Basic Unit Test
```
<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class BasicTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $user = new User;
        $this->assertInstanceOf(User::class, $user);
    }
}
```

Chạy `vendor/bin/phpunit tests/Unit/BasicTest.php`  trên terminal sẽ có được: 
```
PHPUnit 7.5.1 by Sebastian Bergmann and contributors.
.                                                                   1 / 1 (100%)
Time: 209 ms, Memory: 12.00MB

OK (1 test, 1 assertion)
```

Vậy là chúng ta đã test đc biến $user là instance của class User.

- Chúng ta có thể sử dụng những basic PHPUnit assertions để viết test:

    + assertTrue()
    + assertFalse()
    + assertEquals()
    + assertNull()
    + assertContains()
    + assertCount()
    + assertEmpty()
    
 -  Ngoài ra còn có các kiểu khác của PHPUnit assertions: [tại đây](https://phpunit.readthedocs.io/en/8.0/assertions.html)

Ví dụ:
```
<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class BasicTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $user = new User;
        $this->assertInstanceOf(User::class, $user);
    }

    public function testAssert()
    {
        $user = factory(User::class)->make([
            'name' => 'test',
        ]);

        $this->assertTrue(is_string($user->email));

        $this->assertFalse(is_null($user->password));

        $this->assertEquals($user->name, 'test');
        
        $this->assertNull($user->test);

        $this->assertEmpty($user->username);
    }
}
```

Kết quả:
```
PHPUnit 7.5.1 by Sebastian Bergmann and contributors.
..                                                                  2 / 2 (100%)
Time: 74 ms, Memory: 14.00MB

OK (2 tests, 6 assertions)
```

****Qua bài này, chúng ta đã tìm hiểu phần nào về Unit Test trong Laravel, những thứ cơ bản của nó. Ngoài UnitTest thì Laravel còn có FeatureTest và BrowserTest nữa, chúng ta sẽ cùng tìm hiểu ở bài sau.**