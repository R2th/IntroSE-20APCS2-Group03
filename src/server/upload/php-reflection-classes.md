### Sơ lược
Kể từ PHP 5 trở đi, Programmer PHP đã có bộ API Reflection rất hữu dụng để reverse-engineering các class, interfaces, function hay các extension.

Với các ngôn ngữ lập trình thuộc loại dynamic-type thì kiểu của dữ liệu (biến, hàm, object, v.v..) là động, nghĩa là kiểu của dữ liệu được xác định khi code được chạy. Vậy nếu bạn viết một hàm nhận vào một tham số không định kiểu trước thì làm sao bạn biết được kiểu của nó là gì để xử lý cho phù hợp, nếu không xử lý thì có thể code sẽ sinh ra lỗi. Và bạn cũng không thể kiểm tra lỗi từ trước như static type, do đó sinh ra TypeScript cho JavaScript.

### Tóm tắt Reflection
Là nơi một đối tượng có thể tự check chính nó để thông báo về các phương thức và thuộc tính của nó trong thời gian chạy.

Reflection trông như không phải là đặc biệt hữu ích. Tuy nhiên, Reflection thực sự là một khía cạnh thực sự hữu ích để phát triển phần mềm và nó là một thứ mà chúng ta vẫn hay sử dụng.
### Ví dụ
Mình sử dụng luôn ví dụ từ trang mình đã đọc qua.

Cho 2 class:
```php
<?php
class Author 
{
    private $name;
    private $birth;

    public function __construct($name, $birth)
    {
        $this->name = $name;
        $this->birth = $birth;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getBirth()
    {
        return $this->birth;
    }

}
```
```php
<?php
class Book 
{
    private $author;
    public function setAuthor($author)
    {
        $this->author = $author; 
    }
    public function getAuthor()
    {
        return $this->author;
    }
}
```
Các bạn hãy để ý hai class Book và Author bên trên.

Book hoàn toàn có thể được setAuthor() là 1 string hay là 1 instance của class Author. Không khó để hình dung ra kết quả của đoạn code dưới đây.
```php
<?php
$book1 = new Book;
$book1->setAuthor("Nam Cao");
var_dump($book1->getAuthor());

$book2 = new Book;
$book2->setAuthor(new Author("Nam Cao","29-10-1915"));
var_dump($book1->getAuthor());
```
Điều đáng chú ý ở đây là 1 instance của 1 class Book khi gọi đến hàm setAuthor hoàn toàn không có 1 khái niệm nào về $author cả. Nói cách khác, $author có thể là bất cứ 1 object nào. Điều gì sẽ xảy ra khi modify class Book 1 chút như sau:
```php
<?php
class Book 
{
    private $author;
    public function setAuthor($author)
    {
        $this->author = $author; 
        var_dump($author->getName()); // Attention here! Now we try to call getName() of variable $author
    }
    public function getAuthor()
    {
        return $this->author;
    }
}
```
Thử chạy lại đoạn code bên trên với class ```Book``` mới, thì thấy $book1 trả về ```Fatal Error``` nhưng $book2 sẽ chạy qua bình thường.

Vào thời điểm runtime $book2, PHP sẽ "inspect" object $author truyền vào cho ```setAuthor()``` và tự hiểu $author là 1 instance của class Author và có 1 method là ```getName()```.

Vậy là PHP nói riêng và các dynamically-typed language nói chung làm thế nào để nhận biết được type của object truyền vào là function hay class ?

Câu trả lời là reflection class! Bạn đã nhận ra PHP dùng reflection như thế nào qua ví dụ bên trên, bạn thậm chí có thể tự sử dụng reflection class.

### Lấy giá trị từ thuộc tính Protected 
Một ví dụ nữa nhé

Trong trường hợp, nếu thuộc tính là non-static, một đối tượng cần sử dụng từ thuộc tính đó. Trường hợp này nếu muốn lấy thuộc tính mặc định nhưng không cần cung cấp đối tượng thì ```ReflectionClass::getDefaultProperties()``` là sự lựa chọn tốt nhất.

Bạn có thể tạo một thuộc tính protected hoặc privated có thể truy cập bằng cách sử dụng ```ReflectionProperty::setAccessible()```

Ví dụ đơn giản:
```php
<?php
class Color {
    public static $staticProperty = 'Blue';
    
    public $property = 'Yellow';
    protected $privateProperty = 'Black';
}
```
Trường hợp trên, mình muốn lấy giá trị của các thuộc tính mặc dù nó là protected:
```php
$reflectionClass = new ReflectionClass('Foo');

var_dump($reflectionClass->getProperty('staticProperty')->getValue());// will output "Blue"
var_dump($reflectionClass->getProperty('property')->getValue(new Foo));// will output "Yellow"

$reflectionProperty = $reflectionClass->getProperty('privateProperty');
// Sử dụng ReflectionProperty::setAccessible() để cấp quyền truy cập (set là true)
$reflectionProperty->setAccessible(true);
var_dump($reflectionProperty->getValue(new Foo));// will output "Black"
```
Reflection thực sự hữu ích, ngoài ra nó còn có các hàm khác như [link](http://php.net/manual/en/book.reflection.php) 

Thực chất, mình biết Reflection là do phải viết Unit test trong FuelPHP. Mọi thứ nó cũng đơn giản hơn khi cái này chỉ cần cấp quyền truy cập.

Bài viết của mình dựa theo một số Source:

https://www.culttt.com/2014/07/02/reflection-php/

https://medium.com/12bit/reflection-trong-php-7427915a4696

https://kipalog.com/posts/Reflection-va-Reverse-Engineering-trong-PHP

http://php.net/manual/en/reflectionproperty.setaccessible.php