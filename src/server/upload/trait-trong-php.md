## Đặt vấn đề
ta có ví dụ sau:
ta có hai class `Messenger` và `Hello`
```php
class Messenger
{
}

class Hello
{
    public function hello()
    {
        echo "Hello","\n"
    }
}
```
giả sử, bạn muốn class `Messenger` có thể sử dụng hàm `hello()` của class `Hello`. Vì class `Messenger` chưa `extends` bất kì một class nào nên ta chỉ cần `extends` class `Hello` là xong.

```php
class Messenger extends Hello
{
}

$o = new Messenger;
$o->hello();
```

bây giờ ta có thêm 1 class nữa:
```php
class Goodbye
{
    public function goodbye()
    {
        echo "Goodbye","\n";
    }
}
```
giả sử, bạn cũng muốn class `Messenger` cũng có thể sử dụng hàm `goodbye()` của class `Goodbye`. Vì class `Messenger` đã extends class `Hello` rồi nên ta không thể `extends` thêm class `Goodbye` nữa. Đó là bởi vì trong PHP, một class chỉ có thể có một class cha. Một số ngôn ngữ khác cho phép một class có thể có nhiều class cha(đa kế thừa). Tuy nhiên, đa kế thừa sẽ kéo theo một loạt vấn đề nhập nhằng và nó có tiếng xấu là làm phức tạp trong việc kế thừa các lớp đơn giản hơn.
Traits được sinh ra để giải quyết vấn đề này.

## Tạo Traits
cú pháp của Trait cũng gần giống như 1 class bình thường.
```php
trait Hello
{
    public function hello()
    {
         echo "Hello World";
    }
}
```

bây giờ trong class `Messenger` ta dùng từ khóa `use` để sử dụng trait
```php
class Messenger
{
    use Hello;
}

$o = new Messenger;
$o->hello();
```
rất đơn giản phải không nào. <br>
Để giải quyết bài toán trong ví dụ mình đã nêu ở đầu, ta chỉ cần tạo 2 trait `Hello` và `Goodbye` và use nó trong class `Message` là xong. <br>
```php
trait Goodbye
{
    public function goodbye()
    {
        echo "Goodbye","\n";
    }    
}

trait Hello
{
    public function hello()
    {
        echo "Hello World","\n";
    }
} 

class Messenger
{
    use Hello, Goodbye;
    public function sendMessage()
    {
        echo 'You say goodbye',"\n";
        echo $this->goodbye();

        echo 'and I say hello',"\n";
        echo $this->hello(),"\n";
    }
}

$o = new Messenger;
$o->sendMessage();
```

ta sẽ có được output như sau:
> You say goodbye <br>
Goodbye <br>
and I say hello <br>
Hello World <br>

<br>



## Những lưu ý khi sử dụng Trait
### **Trait được ưu tiên hơn extends.** <br>
ta có 1 class `Base` và 1 trait `SayWorld` đều có phương thức `sayHello()`. Class `MyHelloWorld` vừa extends class `Base` vừa use trait `SayWorld`.
```php
class Base {
    public function sayHello() {
        echo 'Hello ';
    }
}

trait SayWorld {
    public function sayHello() {
        echo 'World!';
    }
}

class MyHelloWorld extends Base {
    use SayWorld;
}

$o = new MyHelloWorld();
$o->sayHello();
```
kết quả
> World!

### **Sử lí conflict khi sử dụng nhiều trait có hàm có tên giống nhau**
trong ví dụ này, ta có 3 trait A, B, C đều có chung 2 phương thức `smallTalk()` và `bigTalk()`. Nếu class `Talker` muốn sử dụng cả 3 trait này thì phải chỉ định phải dùng hàm nào của trait nào bằng từ khóa `insteadof`. Nếu ta muốn sử dụng hàm của C nữa, ta phải sử dụng 1 cái tên khác cho hàm đó.
```php
trait A {
    public function smallTalk() {
        echo 'a';
    }
    public function bigTalk() {
        echo 'A';
    }
}

trait B {
    public function smallTalk() {
        echo 'b';
    }
    public function bigTalk() {
        echo 'B';
    }
}

trait C {
    public function smallTalk() {
        echo 'c';
    }
    public function bigTalk() {
        echo 'C';
    }
}

class Talker {
    use A, B, C {
        B::smallTalk insteadof A, C;
        A::bigTalk insteadof B, C;
        C::bigTalk as talk;
    }
}
```

### **Thay đổi phạm vi cho phép sử dụng phương thức**
```php
trait HelloWorld {
    public function sayHello() {
        echo 'Hello World!';
    }
}

// thay đổi phạm vi sử dụng của phương thức sayHello
class MyClass1 {
    use HelloWorld { sayHello as protected; }
}

// Alias method bị thay đổi phạm vi
// phạm vi của sayHello sẽ không bị thay đổi
class MyClass2 {
    use HelloWorld { sayHello as private myPrivateHello; }
}
```

### **trong trait cũng có thể có các` abstract method`.**

```php
trait Hello
{
    abstract public function sendMessage();

    public function hello()
    {
        echo "Hello World","\n";
    }

} 

class Messenger
{
    use Hello;
    public function sendMessage()
    {
        echo 'I am going to say hello',"\n";
        echo $this->hello(),"\n";
    }
}

$o = new Messenger;
$o->sendMessage();
```

kết quả ta thu được:
> I am going to say hello <br>
Hello World

### **biến và hàm static**
trong trait cũng có thể định nghĩa biến và hàm static
```php
trait Counter {
    public function inc() {
        static $c = 0;
        $c = $c + 1;
        echo "$c\n";
    }
}

class C1 {
    use Counter;
}

class C2 {
    use Counter;
}

$o = new C1(); $o->inc(); // echo 1
$p = new C2(); $p->inc(); // echo 1
```

```php
trait StaticExample {
    public static function doSomething() {
        return 'Doing something';
    }
}

class Example {
    use StaticExample;
}

Example::doSomething();
```

### **Định nghĩa thuộc tính trong trait**
```php
trait PropertiesTrait {
    public $x = 1;
}

class PropertiesExample {
    use PropertiesTrait;
}

$example = new PropertiesExample;
echo $example->x;
```
một class không thể có một thuộc tính trùng với tên thuộc tính của trait trừ khi nó tương thích (cùng phạm vi và cùng giá trị).
```php
trait PropertiesTrait {
    public $same = true;
    public $different = false;
}

class PropertiesExample {
    use PropertiesTrait;
    public $same = true; // Allowed as of PHP 7.0.0; E_STRICT notice formerly
    public $different = true; // Fatal error
}
```

## Tài liệu tham khảo
[http://php.net/manual/en/language.oop5.traits.php](http://php.net/manual/en/language.oop5.traits.php) <br>
[https://alanstorm.com/php_traits/](https://alanstorm.com/php_traits/)