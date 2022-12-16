Hẳn các dev khi viết unit test đều đã từng ít nhiều sử dụng các mock objects. Tuy nhiên, một số người vẫn không hiểu rõ tại sao mình phải thực hiện mocking mà chỉ sử dụng một cách đại khái "vì mọi người khác làm vậy". Sau đây chúng ta sẽ đi vào tìm hiểu một số lý do để mock một objects và các cách thông dụng để mock trong Laravel.
# MỤC LỤC
1. What is Mocking?
2. Why Mocking in the first place?
3. What is Mockery?
4. How to use Mockery?
# I. What is Mocking?

Mocking là một cách tiếp cận đối với unit test sử dụng các mock object để thực hiện làm giả các phương thức tương tác giữa các đối tượng trong module khác. Trong mock testing, các đối tượng phụ thuộc bên ngoài sẽ được thay thế bằng một bản mô phỏng với các hành vi giống như đối tượng thật.

# II. Why Mocking in the first place?

Một đối tượng đang được test có thể có rất nhiều các phụ thuộc. Để dễ dàng thực hiện kiểm thử ta nên thay thế các đối tượng phụ thuộc đó với mock object. Việc mock một object không hề thừa thãi, hơn thế nữa nó lại mang lại rất nhiều lợi ích:
* 	Đảm bảo tính cô lập trong quá trình test: Vì không thực tế gọi tới các phương thức đối tượng phụ thuộc, các tương tác đối với cơ sở dữ liệu, file hệ thống đều sẽ không thực hiện, và vì thế không ảnh hưởng tới test. Các giá trị đầu vào, đầu ra sẽ được xác định cho mỗi lần gọi phương thức. Hơn thế nữa việc này cũng đảm bảo quy trình kiểm thử là độc lập giữa unit đang test đối với các phụ thuộc của nó. Nếu phụ thuộc bị sai, nhưng unit đang test chính xác, kết quả trả về vẫn sẽ đúng.
* 	Dễ dàng mô phỏng các tình huống: Thay vì phải tính toán đầu vào một cách khéo léo để bao phủ tất cả các test case, bằng cách thay các phụ thuộc nằm ngoài phạm vi test, ta có thể định nghĩa rõ ràng các giá trị đầu vào, đầu ra theo mong đợi. Qua đó, ta sẽ dễ dàng bao phủ hết các tình huống kể cả là những tình huống khó có thể xảy ra.
* 	Tăng tốc độ trong quá trình test: Vì các hàm test không thực hiện truy vấn hay tính toán thực tế đối với các đối tượng nằm ngoài phạm vi, việc kiểm thử đối với mỗi test case sẽ nhanh hơn nhiều so với không sử dụng mock objects.

# III. What is Mockery?

Mockery là một framework test đơn giản dễ sử dụng của PHP nhằm thực hiện làm giả (mock) các đối tượng trong unit test. Mock objects là một bản mô phỏng của một đối tượng thật. Hàm mock sẽ giả lập giá trị đầu vào, đầu ra, v.v... phù hợp với mong đợi khi thực hiện chạy các hàm/hành vi của class được làm giả.

# IV. How to use Mockery?

## Yêu cầu hệ thống
* Mockery yêu cầu tối thiểu phiên bản PHP 5.6.
## Cài đặt
Đối với Laravel phiên bản 5.4 trở lên, Mockery đã đi kèm khi cài đặt framework. Tuy nhiên, nếu cần thiết ta cũng có thể cài đặt cho các phiên bản thấp hơn. Để cài đặt mockery ta có thể sử dụng composer chạy câu lệnh:

```
composer require --dev mockery/mockery.
```

## Cơ bản về cách sử dụng Mockery

### a. Tạo mock object sử dụng Mockery
Để tạo mock object ta sử dụng phương thức `mock('MyClass')`. Mockery cho phép ta làm giả toàn bộ cả class hoặc chỉ một số hàm sử dụng phương thức `makePartial()`.
VD:
```php
namespace Tests\Unit;

use App\ClassToMock;
use ControllerToTest;
use Tests\TestCase;
use Mockery;

class ControllerTestCase extends TestCase
{
    protected $controller, $mockObject;

    public function setUp() : void
    {
        parent::setUp();
        $this->mockObject = Mockery::mock(ClassToMock::class);
        /* 
            hoặc 
            $this->mockObject = Mockery::mock('App\ClassToMock');
            để giả lập một vài method
            $this->mockObject = Mockery::mock(ClassToMock::class)->makePartial();
            $this->mockObject = Mockery::mock('App\ClassToMock[method]');
            
        */
        $this->controller = new ControllerToTest($this->mockObject);
        // Other setting up ...
    }
    
    public function tearDown()
    {
        // Other tearing down ...
        Mockery::close();
        unset($this->controller);
        parent::tearDown();
    }
    
    // Testing functions...
}
```

### b. Options
Để việc kiểm thử chặt chẽ nhất có thể, ta nên thêm vào các options Mockery cung cấp. Sau đây, em xin phép giới thiệu một số options hay sử dụng trong quá trình test. 
Thông thường khi thực hiện mock một đối tượng chúng ta sẽ cần xác định:
* Tên hàm cần mock
* Tham số đầu vào
* Kết quả trả về
* Số lần chạy

#### Tên hàm cần mock
Để xác định hàm cần mock ta có thể khai báo khi khởi tạo đối tượng `Mockery::mock('App\ClassToMock[method_1, method_2]')` hoặc sử dụng phương thức `shouldReceive('method')`.
VD:
```php
$this->mockObject = Mockery::mock(ClassToMock::class)->makePartial();
$this->mockObject
    ->shouldReceive('method');
```

#### Tham số đầu vào
Mặc định, Mockery sẽ khởi tạo các hàm với option `withAnyArgs()`. Với option này, Mockery sẽ cho phép bất cứ giá trị đầu vào nào. 
Tuy nhiên, nếu ta muốn testcase chặt chẽ hơn ta có thể xác định đầu vào sử dụng các options:
```php
// không có tham số đầu vào
$this->mockObject
    ->shouldReceive('method')
    ->withNoArgs();
// với các tham số đầu vào cụ thể
$this->mockObject
    ->shouldReceive('method')
    ->with($arg_1, $arg_2);
    // hoặc withArgs([$arg_1, $arg_2]);
```

#### Kết quả trả về
Trong trường hợp hàm của chúng ta có kết quả trả về, ta có thể sử dụng phương thức `andReturn()`, `andReturnNull()` để trả về kết quả hoặc `andThrow()` để ném một ngoại lệ sau khi gọi hàm.
VD:
```php
// không có tham số đầu vào
$this->mockObject
    ->shouldReceive('method')
    ->withNoArgs()
    ->andReturn($response);
// với các tham số đầu vào cụ thể
$exception = new Exception();
$this->mockObject
    ->shouldReceive('method')
    ->with($arg_1, $arg_2)
    ->andThrow($exception);
```

#### Số lần chạy
Ta có thể xác định số lần chạy của method bằng phương thức `once()`, `twice()`, `times($number_of_times)` hay `never()`.
VD:
```php
// Hàm 'method' sẽ được gọi 2 lần với đầu vào là $arg và ném ra ngoại lệ $exception.
$this->mockObject
    ->shouldReceive('method')
    ->with($arg)
    ->andThrow($exception)
    ->twice();
```

#### Một số options khác
Ngoài các options đã giới thiệu trên. Mockery cũng bao gồm:
```php
// cho phép mock các hàm protected.
shouldAllowMockingProtectedMethods()
// cho phép loại phương thức khỏi mock object.
shouldNotReceive('name_of_method');
// trả về nhiều giá trị khác nhau.
andReturnValues([$value_1, $value_2]);
// trả về giá trị theo closure
andReturnUsing(closure, ...);
// trả về chính nó
andReturnSelf();
// đặt giá trị thuộc tính
andSet($property, $value);
// đặt số lần gọi tối đa, tối thiểu
atMost($max);
atLeast($min);
between($min, $max);
```

### c. Mock các Facades trong Laravel.

#### Mock Event, Mail, Notification, Queue, Storage.
Để mock các facades này ta sử dụng phương thức `fake()`. Sau khi gọi, hàm sẽ thay thế instance hiện tại thành một mock object trong suốt quá trình test. Nếu mọi người muốn biết chi tiết hơn cách các Facades này hoạt động mình có viết một bài viết khác đi sâu vào vấn đề này trong link bên dưới.
VD:
```php
Queue::fake();
```
Laravel cũng đồng thời cung cấp các assertion hỗ trợ cho việc test các facades fake như:
```php
// Event fake
Event::assertDispatched();
```
```php
// Mail fake
Mail::assertSent();
Mail::assertNotSent();
```
```php
// Notification fake
Notification::assertSentTo();
Notification::assertNotSentTo();
```
```php
// Queue fake
Queue::assertPushed();
Queue::assertPushedOn();
Queue::assertNotPushed();
```
```php
// Storage fake
Storage::disk('disk_name')->assertExists();
Storage::disk('disk_name')->assertMissing();
```
#### Các Facades khác
Đối với hầu hết các Facades khác trong Laravel, ta cũng có thể thực hiện mock chúng trong quá trình test một cách dễ dàng.
VD:
```php
Cache::shouldReceive('get')
    ->once()
    ->with('key')
    ->andReturn($value);
```
# TỔNG KẾT
Trong bài viết vừa rồi chúng ta đã đi vào tìm hiểu về mocking, lợi ích của việc sử dụng mock object, cách để thực hiện mock một object sử dụng Mockery trong Laravel. Bài viết có gì thiếu sót xin mọi người góp ý.
# TÀI LIỆU THAM KHẢO
* http://docs.mockery.io/en/latest/index.html
* https://laravel.com/docs/8.x/mocking
* https://www.telerik.com/products/mocking/unit-testing.aspx
* https://viblo.asia/p/tim-hieu-ve-laravel-facade-RnB5pjx2ZPG