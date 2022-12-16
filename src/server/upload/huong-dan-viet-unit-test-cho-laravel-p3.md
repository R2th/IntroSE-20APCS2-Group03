Vậy là chung ta đã trai qua 2 phần về Unit Test, trong phần này mình sẽ hướng dẫn các bạn cách Mock và ứng dụng của Mock để test một chương trình. 


# Mocking là gì?
Mocking là một kĩ thụât giúp ta khởi tạo một đối tượng ảo của một class có thật. Trong quá trình test, chúng ta chỉ sử dụng một số phương thức nhất định của đối tượng nào đó nhưng mà không muốn nó thực hiện, thay vào đó chỉ mong muốn nó được gọi tới và trà một giá trị. Mình đưa một ví dụ sẽ giúp bạn hiểu được câu nói kia có nghĩa là gì.

```php
function showValue(){
    $value = getValueFromDatabase();
    
    return $value;
}
```
Theo ví du này ta thấy được rằng phương thức showValue() sẽ gọi tới cơ dở dữ liệu để hiển thị dữ liệu. Khi thực hiện việc test phương thức này, ta không muốn phải kết nối tới bất kì một cô sở dữ liệu. Việc kết nối sẽ khiển cho vịêc tốc độ chạy test giảm đi rõ rệt, bên cạnh đó, nếu không config chính xác bạn có thể hoàn toàn làm sai lệch cơ sở dữ liệu bạn đang dùng. Trong những trường hợp này, các tốt nhất là "fake" phương thức **getValueFromDatabase()** và làm giả dữ liệu trả ra từ phương thức đó. Việc này giúp chúng ta đẩm bảo rằng code sẽ không gọi tới cơ sở dữ liệu cũng nhưng dữ liệu sẽ nhất quán sau các lần test. Và đó chính là **Mocking**.

Ta có thể hiểu được là Mocking giúp chúng ta tạo các dữ liệu test với định dạng mà ta mong muốn, bên cạnh đó là điều khiển luồng dữ liệu hoạt động. Nhờ đó mà dữ liệu test sẽ không phải lưu trữ cùng như lấy ra từ database. Bên cạnh đó, Mocking tạo ra các đối tượng giả lập mà không cần đầy đủ chức năng như một đối tượng thật, chỉ những phương thức hoặc thuộc tính mà ta mong muốn sử dụng trong test.

Có 5 loại Mocking, mỗi loại sẽ được sử dụng trong các trường hợp cụ thể là :
- Dummy Object
- Test Stubs
- Test Spies
- Test Mocks
- Test Fakes

## Dummies
Dummy objects là các đối tượng được truyền vào các phương thức nhưng không được sử dụng. Thông thuơng, chúng dùng để truyền vào các phương thức để cho đủ các parameter cần thiết để một function có thể hoạt động.


## Spies

Test Spies là một đối tượng để kiểu tra việc tương tác giữa các đối tượng với nhau. Khi mà kết quả của một test case phụ thuộc vào vịêc một phương thức nào đó có được tương tác đúng theo ý muốn của mình không như số lần phương thức đó được gọi, số lượng các tham số truyền vào có đúng hay không,...

```php
// arrange
$spy = \Mockery::spy('MyDependency');
$sut = new MyClass($spy);

// act
$sut->callFoo();

// assert
$spy->shouldHaveReceived()
    ->foo()
    ->with('bar');
```

Như ví dụ này, ta chỉ kỉêm tra rằng **MyDependency** có được gọi tới và được truyền một tham số là **bar** hay không.

## Stubs

Test stubs là tạo ra một object với các tham số được lập trình sẵn. Thông thường, các stubs sẽ trả ra các giá trị mà sẽ được hard-code vào.
```php

function getName(Stubs $s){
        return $s->name;
}


function test(){
        $testStubs = new Stubs();
        $testStubs->name = 'Viblo';

        // Sẽ pass 
        $this->assertEquals('Viblo', getName($testStubs));
}
```

## Fake
Test Fake là một object được giản lược và có thể thao tác lên gần giống với những đối trượng ta tương tác lên ở "production". Đây là một khái niệm tương đối trìu tượng với những cách hiểu khác nhau.
![](https://miro.medium.com/max/2048/0*snrzYwepyaPu3uC9.png)
Như ví dụ ta có thể thấy, để test function login thì ta phải sử dụng một Login Service. Thay vì việc phải kết nối tới database hay gửi các request tới một bên thứ 3, ta tạo một service giả có cơ sở dữ liệu lưu trữ ở bộ nhớ tạm thời với các phương thức như service thật nhưng trả ra các giá trị giả để ta có thể thực hiện việc test.  Có thể coi Fake là một dạng nâng cao của Stubs khi nó không những trả ra những đối tượng với  tham số mà ta yêu câu mà ta có thể tương tác lên được giống với những gì ở "production".

## Mock

Khi mọi người nói tới Mock thì thuờng nhắc tới là Test Doubles. Test Doubles là một thuật ngữ ám chỉ vịêc bạn thay thế một đối tượng trên production dùng cho vịêc test. Đối tượng này vừa dùng để test chính bản thân cũng như giúp phương thức tổng có thể chạy được từ đó ta có thể test.

Một Mock Object thực sự chạy khi các phương thức của đối tượng này được gọi tới. Nó có thể throw các exception tương ứng nếu chúng được gọi mà không được chỉ định gọi hay kiểm tra số lưọng các tham số truyền vào có đúng như những gì chúng mong đợi.

Ta sử dụng Mock khi test 1 chức năng với nhiều tham số liên quan tới nhau và mỗi tham số sẽ hoạt động một cách riêng biệt và trả ra các giá trị tương ứng.

```php
$mock = \Mockery::mock('MyClass');

$mock->shouldReceive('foo')->withArgs(function ($arg) {
    if ($arg % 2 == 0) {
        return true;
    }
    return false;
});

$mock->foo(4); // matches the expectation
$mock->foo(3); // throws a NoMatchingExpectationException
```



# Mock trong Laravel

Mặc dù PHPUnit cũng có thể tạo ra các Mock Object nhưng không cung cấp đẩy đủ chức năng như [Mockery](http://docs.mockery.io/en/latest/) Thật may mắn là Laravel sẽ cài sẵn cho bạn Mockery nên chúng ta không phải mất công cài đặt hay config mà có thể bắt tay vào làm vịêc.

Trước tiên chúng ta cần một đoạn code mẫu để có thể sử dụng. Ta sẽ sử dụng 2 class là Math và Calculate. Class Math sẽ phụ thuộc và Calucule. Hay tạo một file với đường dẫn là "app/Math.php"
```php:app\Math.php
<?php

namespace App;

class Math
{
    /**
     * @var Calculate
     */
    public $calculate;
    /**
     * Math constructor.
     *
     * @param Calculate $calculate
     */
    public function __construct(Calculate $calculate)
    {
        $this->calculate = $calculate;
    }
    /**
     * Get Area
     * 
     * @param $length
     * 
     * @return float|int
     */
    public function getArea($length)
    {
        return $this->calculate->areaOfSquare($length);
    }
}
```

```php:app\Calculate.php
<?php

namespace App;

class Calculate
{
    public function areaOfSquare($length)
    {
        return pow($length, 2);
    }
}
```

**Chú ý:** Khi viết code, luôn sử dụng dependency injections thông qua contructor thay vì vịêc khởi tạo chúng bằng cú pháp "new". Vịêc này sẽ giúp chúng ta dễ dàng test hơn khi tạo các Mock. 

Thêm một tip nhỏ là hay luôn sử dụng **Facade** thay các helper function của Laravel, vịêc này sẽ giúp ích cho chúng ta ít nhiều trong việc test đó. [https://laravel.com/docs/master/mocking#mocking-facades](https://laravel.com/docs/master/mocking#mocking-facades)

```php:/tests/Unit/MathTest
<?php

namespace Tests\Unit;

use App\Math;
use Mockery as m;
use Tests\TestCase;

class MathTest extends TestCase
{
    public function setUp() 
    {
        $this->calculate = m::mock('App\Calculate');
        $this->math = new Math($this->calculate);
    }
    
    public function test_getArea_WhenCalledWithLength2_Return4()
    {
        $this->calculate->shouldReceive('areaOfSquare')
            ->andReturn(4)
            ->once();
            
        $length = 2;
        $response = $this->math->getArea($length);
        
        $this->assertTrue(is_int($response));
        $this->assertEquals(4, $response);
    }
}
```
Chạy thử test trong terminator:
![](https://images.viblo.asia/ad84ee8a-2073-438d-bf5b-4090e46bb6c1.png)

Vây là ta test và thành công. Nhưng tạo sao của chúng ta có 2 function assertion là *assertTrue* và *assertEquals* mà trong kết quả ta lại nhận được 3.

Một assertion nữa chính là *shouldReceive*. Như mình đã đề cập bên trên đây chính là Test Double. Chúng ta vừa kiểm tra rằng phương thức areaOfSquare trong class Calculate được gọi tới, vừa gán dữ liệu trả ra để ta có thể test hoàn chỉnh test case **test_getArea_WhenCalledWithLength2_Return4**.

Không những vậy, ta còn kiểm tra rằng phương thức *areaOfSquare* được gọi duy nhất một lần trong *getArea*. Nếu chúng ta thay *once* bằng *twice* hoăc *times({number})* thì test case sẽ báo lỗi.

Ngoài ra còn một số kĩ thụât và một số hàm Expectation mà bạn có tham khảo tại docs của Mockery: [http://docs.mockery.io/en/latest/reference/expectations.html](http://docs.mockery.io/en/latest/reference/expectations.html)

# Tổng kết
Đến đấy là kết thúc serie hướng dẫn viết Unit Test cho Laravel của mình rồi. Nếu bạn có bất kì câu hỏi hay thắc mắc, vui lòng comment phía dưới nhé :grin: