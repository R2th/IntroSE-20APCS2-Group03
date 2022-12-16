# 1. Thế nào là mock?
Mock là một đoạn code giả lập giúp function test của mình chạy một cách độc lập so với những function tương ứng.

> *Ví dụ: chúng ta có thể mô phỏng một hàm để trả về các giá trị của các chức năng liên quan, xem nó pass hay fail so với hàm test của mình.*

Hàm mock sẽ giả lập dữ liệu phù hợp với dữ liệu được trả về từ database. Điều này rất hữu ích trong unit test vì chúng ta không muốn thực sự call vào database, mà là test chức năng đó tương tác như thế nào với một dữ liệu giả lập giống trong database.

# 2. Khi nào nên sử dụng mock?
Có một số trường hợp phổ biến mà ta có thể sẽ muốn dùng mock:

* Truy vấn cơ sở dữ liệu
* Sử dụng thư viện của bên thứ 3
* http requests
* Một vài thứ của hệ điều hành (ví dụ: ngày giờ liên quan hoặc đọc và ghi vào một tệp trên đĩa)
* Hàm có kết quả không thể đoán trước (số ngẫu nhiên)

Vấn đề chung ở đây là chúng ta không nhất thiết muốn test bất cứ thứ gì nằm ngoài phạm vi của function mà chúng ta viết. Tuy nhiên, điều đáng nói là bạn muốn kiểm tra xem đoạn code được tích hợp với một trong những services bên ngoài có đảm bảo rằng nó thực sự hoạt động đúng như mong đợi. Điều này khiến ta phải có một hàm test rắc rối, đó là [integration test](https://en.wikipedia.org/wiki/Integration_testing). Một integration test về cơ bản là assert nhiều thành phần chính hoạt động cùng nhau như mong đợi.

# 3. Những đoạn code thực tế
Ví dụ ở đây, mình sẽ tạo ra một class person có thể làm hành động hiển thị thông điệp "Hello World".

```
<?php

class Person
{
    public function greeting()
    {
        return 'Hello World';
    }
}
```

Bây giờ chúng ta có thể tạo ra một người mới và bảo họ "Hello world".

```
$person = new Person();
echo $person->greeting();
```

Chúng ta có thể dễ dàng chuyển cái này thành một test assertion cơ bản.

```
require __DIR__ . '/Person.php';

use PHPUnit\Framework\TestCase;

class MockPerson extends TestCase
{
    public function test_greeting()
    {
        $test = new Person();
        $this->assertEquals('Hello World', $test->greeting());
    }
}
```

Bây giờ mình muốn dựa vào ID được truyền vào function `greeting()`, hãy trả về tên của người đó.

```
<?php

class Database
{
    public function getPersonById($id)
    {
        // Truy vấn vào DB để lấy ra người có ID tương ứng
        return sql("select * from person where id = $id limit 1;")[0];
    }
}
```

Bây giờ chúng ta có thể đưa cái này vào class person để sử dụng nó:

```
<?php

class Person
{
    public $db = null;
    
    function __contruct($db)
    {
        $this->db = $db;
    }
    
    public function greeting($id)
    {
        $friend = $this->db->getPersonById($id);
        $friendName = $friend->name;
        
        return 'Hello' . $friendName;
    }
    
    require __DIR__ . '/Database.php';
    
    $db = new Database();
    $person = new Person($db);
    
    // Trong DB, ta có một người có ID là 2 và tên là "Bob" 
    echo $person->greeting(2);
    
    // Kết quả: Hello Bob
}
```

Ta không thực sự muốn test hàm `getPersonById()` trả về kết quả từ database, nhưng thay vào đó `person->greeting(2)` cho ta một kết quả mong đợi.

Về lý thuyết, code test sẽ như thế này (đây là một ví dụ về bad code):

```
<?php

require __DIR__ . '/Person.php';
require __DIR__ . '/Database.php';

use PHPUnit\Framework\TestCase;

class MockPerson extends TestCase
{
    public function test_greeting()
    {
        $db = new Database();
        $test = new Person($db);
        $this->assertEquals('Hello Bob', $test->greeting(2));
    }
}
```

Để tránh truy vấn cơ sở dữ liệu, ta có thể mock một lớp cơ sở dữ liệu trong hàm test.

```
<?php

require __DIR__ . '/Database.php';
require __DIR__ . '/Person.php';

use PHPUnit\Framework\TestCase;

class MockTest extends TestCase
{
    public function test_greeting()
    {
        $dbMock = $this->getMockBuilder(Database::class)
            ->setMethods(['getPersonById'])
            ->getMock();
            
        $mockPerson = new stdClass();
        
        $mockPerson->name = 'Bob';
        
        $dbMock->method('getPersonById')->willReturn($mockPerson);
        
        $test = new Person($dbMock);
        
        $this->assertEquals('Hello Bob', $test->greeting(2));
    }
}
```

Ta dừng lại ở phần này một lúc để xem đoạn code nó thực hiện những gì:

Đầu tiên, ta mock class Database sử dụng MockBuilder, với thiết lập gọi vào hàm `getPersonById`

`$dbMock` bây giờ chính là `$db` ở đoạn bad code.

```
$dbMock = $this->getMockBuilder(Database::class)
    ->setMethods(['getPersonByID'])
    ->getMock();
```

Tiếp theo, ta tạo một object "fake" của person được trả về từ DB là loại standard class với name attribute là "Bob":

```
$mockPerson = new stdClass();

$mockPerson->name = 'Bob';
```

Tiếp theo ta gọi tới class mới được mock để trả về person "fake" bất cứ khi nào hàm `getPersonById` được gọi, thay vì gọi hàm thật đang tồn tại trên class Database:

```
$dbMock->method('getPersonById')->willReturn($mockPerson);
```

Tiếp theo, ta truyền instance Database được mock vào constructor của class Person:

```
$test = new Person($dbMock);
```

Cuối cùng, ta gọi đến hàm `greeting` để gọi vào các instance Database đã mock trong quá trình chạy.

```
$this->assertEquals('Hello Bob', $test->greeting(2));
```

# 4. Kết luận
Ví dụ trên khá đơn giản về bản chất và mocking có thể trở nên phức tạp hơn khi phát triển một dự án. Cần có một lượng kiến thức hợp lý để mock khi viết viết test cho code, nhưng điều này sẽ trở nên dễ dàng hơn khi bạn thực hành nhiều hơn.

# 5. Tham khảo
Bài viết trên mình đọc được và đã dịch ra trên medium:

https://medium.com/nona-web/mocking-in-phpunit-802f91112645

Cảm ơn mọi người! :see_no_evil::see_no_evil::see_no_evil: