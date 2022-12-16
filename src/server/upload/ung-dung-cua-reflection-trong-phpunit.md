# Reflection trong PHP
**Reflection** là một bộ API được cung cấp từ PHP5 trở đi, rất hữu dụng cho cho developer khi muốn phân tích source code trong trường hợp document không đầy đủ.

Ở bài viết này mình sẽ trình bày ứng dụng của **Reflection** trong Unit Test của PHP, cụ thể là trong PHP Unit.
# Private method
Trong một class rất nhiều trường hợp bạn sẽ gặp ***private method***, ví dụ như sau:
```php
class Robot
{
    private function greeting($name, $address)
    {
        return $name . ' at ' . $address;
    }
}
```
    
 Vì nhiều lý do mà method bắt buộc phải là ***private***, ví dụ đơn giản là khi bạn không muốn method được sử dụng bên ngoài class đó.
 
 Vấn đề bắt đầu khi bạn phải viết Unit test cho class **Robot** nói trên. Nếu tạo mới một *instance* của **Robot** thì chỉ gọi được các **public** method, còn nếu tạo một class mới kế thừa **Robot** thì cũng chỉ động được đến các **protected** method. Vậy với **private** method như **greeting** bên trên thì làm thế nào ?

Một giải pháp hay được sử dụng ở đây là sử dụng **ReflectionMethod** trong bộ Reflection API của PHP

```php
$instance = new Robot();
$rm = new ReflectionMethod("Robot", "greeting");
$rm->setAccessible(true);
$result = $rm->invokeArgs($instance, array("Batman","Gotham")); 
print $result;
// Batman at Gotham
```


Với cách sử dụng như trên thì có thể viết test cho method **greeting** như sau

```php
class RobotTest extends PHPUnit_Framework_TestCase
{
    public function testGreeting()
    {
        $instance = new Robot();
        $rm = new ReflectionMethod("Robot", "greeting");
        $rm->setAccessible(true);
        $result = $rm->invokeArgs($instance, array("Batman","Gotham"));
        $this->assertSame("Batman at Gotham", $result);
    }
}
```

# Private Property
Tương tự như ***private method***, bạn cũng có thể bắt gặp ***private property*** trong PHP, class **Robot** có thể như sau

```php
require_once "DbDao.php";

class Robot
{
    private $db;

    public function __construct()
    {
        $this->db = new DbDao();
    }

    public function greeting($name, $address)
    {
        $name = $this->db->getPerson($name);
        return $name . ' at ' . $address;
    }
}
```

Ở đây vấn đề phức tạp lên một chút. Class **Robot** có một ***private property*** là **db**, khởi tạo trong hàm **contruct** (khi tạo instance mới) và được sử dụng trong hàm **greeting**. **db** có thể phát sinh một kết nối đến Database, điều mà bạn muốn loại bỏ khi chạy test. Class **DbDao** có thể rất đơn giản, ở đây mình thử cho method **getPerson** ném ra một **Exception**.

```php
class DbDao {
    public function getPerson($name)
    {
        throw new Exception('Joker rule the Gotham!');
    }
}
```
Bạn có thể nhận thấy, muốn test được **greeting** trong trường hợp này, cần phải thay đế được **db** bằng một object tự tạo trước. Chúng ta có thể tạo một ***stub*** thay thế cho **db** và dùng Reflection để ***inject*** vào một instance của class **Robot**.
```php
require_once "DbDao.php";
require_once "Robot.php";

class RobotTest extends PHPUnit_Framework_TestCase
{
    private function dbStub($expected)
    {
        $stub = $this->getMockBuilder('DbDao')
            ->setMethods(array('getPerson'))
            ->getMock();
        $stub->expects($this->any())
            ->method('getPerson')
            ->with($this->anything())
            ->will($this->returnValue($expected));
        return $stub;
    }

    public function testGreeting()
    {
        $instance = $this->getMockBuilder('Robot')
            ->setMethods(null)
            ->disableOriginalConstructor()
            ->getMock();
        $rp = new ReflectionProperty("Robot", "db");
        $rp->setAccessible(true);
        $rp->setValue($instance, $this->dbStub("Mocked Person"));
        $result = $instance->greeting("Anything", "Gotham");
        $this->assertSame("Mocked Person at Gotham", $result);
    }
}
```
Mình sẽ giải thích rõ hơn một chút.
Hàm **dbStub** trả về một stub của class **DbDao** , Stub này khi gọi method **getPerson** sẽ trả về một giá trị chỉ định sẵn.
**testGreeting** là method test của chúng ta, tạo ra một instance của class **Robot** mà không chạy qua **construct**, sau đó inject một stub nói trên vào private property **db**.

Chạy method test nói trên sẽ không ném ra **Exception** .

```php
$ phpunit RobotTest.php
PHPUnit 3.7.8 by Sebastian Bergmann.

.

Time: 0 seconds, Memory: 3.50Mb

OK (1 test, 2 assertions)

```

# Kết luận

Hi vọng qua bài viết này các bạn có thể nắm bắt được rõ hơn về **Reflection** thông qua ví dụ cụ thể trong PHPUnit.