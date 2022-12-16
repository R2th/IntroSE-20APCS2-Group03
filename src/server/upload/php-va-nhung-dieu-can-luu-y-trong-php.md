# 1. Giới thiệu
PHP là một ngôn ngữ lập trình kịch bản được chạy phía server chủ yếu được dùng để phát triển web. Một số framework của php như là laravel, cake php, zend. Trong bài viết này chúng ta sẽ tìm hiểu về một số vấn đề trong lập trình php.
# 2. Lập trình hướng đối tượng trong php
## Một số điều cần biết về hướng đối tượng
* Lập trình hướng đối tượng là kỹ thuật lập trình cho phép các lập trình viên tạo ra các đối tượng trong code giống như các đối tượng ngoài đời thực.

* Một đối tượng bao gồm phương thức và thuộc tính trong đó phương thức cho chúng ta biết những hành động mà đối tượng đó có thể thực hiện còn thuộc tính cho chúng ta biết về thông tin, đặc điểm của đối tượng.

* Lớp là một kiểu dữ liệu bao gồm các thuộc tính và các phương thức được định nghĩa từ trước. Đây là sự trừu tượng hóa của đối tượng. Lớp được xem như là một khuôn mẫu để tạo ra các đối tượng. Các đối tượng có chung đặc điểm và cách hành động có thể được gom vào một lớp.

## Các tính chất của lập trình hướng đối tượng
### Tính đóng gói (Encapsulation)
Các dữ liệu và phương thức được đóng gói nhằm mục đích che giấu thông tin không cho truy cập thì phía bên ngoài.

Tính đọc gói được thể hiện qua access modifier. Có 3 loại access modifier là : private, protected, public theo thứ tự tăng dần của mức độ cho phép truy cập thông tin. 

Private chỉ cho phép truy cập các phương thức thuộc tính từ bên trong class.

Protected cho phép truy cập các phương thức thuộc tính từ bên trong class và các class kế thừa class đó.

Public cho phép truy cập các phương thức thuộc tính từ tất cả mọi nơi. Nếu bạn không khai báo access modifier thì public được xem là mặc định.
### Tính kế thừa (Inheritance)
Cho phép một lớp được xây dựng dựa trên một lớp khác mà có thể sử dụng các thuộc tính và phương thức của lớp đó.Ngoài ra lớp con kế thừa có thể mở rộng bằng cách bổ sung thêm các thành phần mới. Sử dụng từ khóa `extends` để khai báo kế thừa một lớp khác.
```php
<?php
class Fruit {
  public $name;
  public $color;
  public function __construct($name, $color) {
    $this->name = $name;
    $this->color = $color;
  }
  public function intro() {
    echo "The fruit is {$this->name} and the color is {$this->color}.";
  }
}

// Strawberry is inherited from Fruit
class Strawberry extends Fruit {
  public function message() {
    echo "I am a berry";
  }
}
$strawberry = new Strawberry("Strawberry", "red");
$strawberry->message();
// I am a berry
$strawberry->intro();
// The fruit is Strawberry and the color is red.
?>
```
### Tính đa hình (Polymorphism)
Tính đa hình có nghĩa là một hành động được thực hiện theo nhiều cách khác nhau bởi nhiều lớp giống nhau. (Ví dụ tiếng sủa của các loài động vật khác nhau, đó được gọi là đa hình).

```php
<?php
abstract class animal {
  public function animalSound() {
  }
}
class Dog extends Animal {
  public function animalSound() {
    echo "Gau Gau";
  }
}

class Cat extends Animal {
  public function animalSound() {
    echo "Meo Meo";
  }
}
$dog = new Dog();
$cat = new Cat();
echo $dog->call();
// Gau Gau
echo $cat->call();
//Meo Meo
?>
```
### Tính trừu tượng (Abstraction)

Tính trừu tượng trong oop được hiểu là một cách trừu tượng hóa một cái gì đó lên, chỉ quan tâm tới những thứ cốt lõi tạo nên nó và có thể bỏ qua những chi tiết nhỏ nhặt.

Tính trường tượng trong oop được thể hiện qua abstract class và interface

**Abstract class** cũng giống như các class khác nhưng nó có chứa abstract method. Vì nó giống như là một class bình thường nên nó cũng có thể được kế thừa và mở rộng nhưng nó không thể dùng để khởi tạo một đối tượng.
```php
// Abstract class
abstract class Animal {
  // Abstract method (does not have a body)
  public abstract void animalSound();
  // Regular method
  public void sleep() {
    echo "Sleeping .... ZZZZ";
  }
}

// Subclass (inherit from Animal)
class Pig extends Animal {
  public void animalSound() {
    // The body of animalSound() is provided here
    echo "The pig says: wee wee";
  }
}

    $myPig = new Pig(); // Create a Pig object
    myPig->animalSound();
    // The pig says: wee wee
    myPig->sleep();
    //Sleeping .... ZZZZ
```

**Interface** thì hơi khác so với một class thông thường, nó chỉ có thể chứa các abstract method mà không thể chứ các property và method bình thường. Một class có thể sử dụng các abstract method thông qua việc implements các interface, và một class có thể implements nhiều interface.
```php
//Interface
interface FirstInterface {
  public void myMethod(); // interface method
}

interface SecondInterface {
  public void myOtherMethod(); // interface method
}

class DemoClass implements FirstInterface, SecondInterface {
  public void myMethod() {
    echo "Some text..";
  }
  public void myOtherMethod() {
    echo "Some other text...";
  }
}
```
Nhìn chung thì interface và abstract đều có điểm giống nhau là cả hai đều có chứa các abstract method và các class đều phải thực hiện các abstract method đó. Ngoài ra thì interface và abstract class có những điểm khác nhau rõ ràng như là abstract class có thể chứ các thuộc tính và phương thức bình thường như các class khác còn interface thì không. Điểm thứ hai là về mặt kế thừa, đối với abstract class thì mỗi class chỉ có thể kế thừa một abstract class còn đối với interface thì mỗi class có thể triển khai nhiều interface khác nhau.

# 3. Một số vấn đề khác trong php
## Static method trong php
Static method là một method có thể được gọi trực tiếp mà không cần khởi tạo một đối tượng. Các static method được khai báo với từ kháo là static.
```php
<?php
class greeting {
  public static function welcome() {
    echo "Hello World!";
  }
}

// Call static method
greeting::welcome();
// Hello World!
?>
```
Như các bạn thấy chúng ta khởi tạo một static method bằng từ khóa static và chúng ta gọi tới nó bằng cách sử dụng dấu ` :: ` mà không khởi tạo một đối tượng nào của lớp greeting trước đó. 

Trong một lớp thì chúng ta có thể có gọi đến một thành phần static bằng cách sử dụng `static::` hoặc `self::` .
```php
<?php
class greeting {
  public static function welcome() {
    echo "Hello World!";
  }

  public function message() {
    self::welcome();
    echo '<br />';
    static::welcome();
  }
}
$greeting = new greeting();
$greeting->message();
//Hello World
// 
//Hello World
?>
```
Nhưng nếu chỉ truy cập như vậy thì tại sao cần tới hai câu lệnh `self::` và `static::`? Bạn có từng nghĩa nếu một class A kế thừa một class B có thành phần static thì khi class A gọi thành phần static đó sẽ như thế nào. Đấy là sự khác biệt giữa hai câu lệnh `self::` và `static::`.
```
class A { // Base Class
    protected static $name = 'ClassA';
    public static function getSelfName() {
        return self::$name;
    }
    public static function getStaticName() {
        return static::$name;
    }
}

class B extends A {
    protected static $name = 'ClassB';
}

echo B::getSelfName(); // ClassA
echo B::getStaticName(); //ClassB
```
Các bạn có thể thấy rõ sự khác biệt của hai câu lệnh thông qua ví dụ trên. Đối với `static::` thì nó gọi đến thành phần static của lớp hiện tại gọi nó còn đối với `self::` thì nó gọi tới thành phần static của lớp khởi tạo nên nó.
## Trait
Đối với một số bạn thì trait có vẻ là một cái gì đó khá xa lạ, nhưng thật ra nó lại được sử dụng khá là phổ biến mà các bạn không để ý. Hiểu đơn giản thì trait ra đời nhằm giải quyết vấn đề đơn kế thừa trong lập trình hướng đối tượng của php.
```php
<?php
trait message1 {
public function msg1() {
    echo "OOP is fun! ";
  }
}

class Welcome {
  use message1;
}

$obj = new Welcome();
$obj->msg1(); //OOP is fun
?>
```
Dựa vào ví dụ trên chúng ta có thể thấy việc khai báo và sử dụng trait khá đơn giản. Chúng ta chỉ cần khai báo với từ khóa `trait` và viết nó như các class. Ngoài ra để sử dụng trait thì chúng ta sử dụng từ khóa `use` để khai báo việc sử dụng trait trong một class khác.

Vậy sẽ ra nào nếu chúng ta sử dụng hai trait có cùng một hàm giống nhau, trong tình huống đó thì hàm của chúng ta sẽ thực thi dựa trên trait nào? Câu trả lời là chúng ta sử dụng từ khóa insteadof để khai báo việc sử dụng method nào trong class đó. Hãy cùng xem ví dụ dưới đây để hiểu rõ hơn.

```php
<?php
trait message1 {
  public function msgA() {
    echo "My favorite color is red. ";
  }

  public function msgB() {
    echo "My favorite number is 5. ";
  }
}

trait message2 {
  public function msgA() {
    echo "My favorite color is blue. ";
  }
  
  public function msgB() {
    echo "My favorite number is 7. ";
  }
}

class MyClass {
  use message1, message2 {
    message1::msgA insteadof message2;
    message2::msgB insteadof message1;
  }
}

$obj = new MyClass();
$obj->msgA(); //My favorite color is red. 
$obj->msgB(); //My favorite number is 7. 
?>
```

## Namespaces
Namespaces dùng để giải quyết hai vấn đề là:

- Chúng cho phép tổ chức tốt hơn bằng việc nhóm các lớp làm việc cùng nhau để thực hiện một nhiệm vụ.
- Chúng cho phép sử dụng cùng một tên cho nhiều lớp

Namespaces bắt buộc phải được khai báo ở đầu file bằng từ khóa `namspaces`.
# 4. Kết luận
Hôm nay chúng ta đã tìm hiểu về những vấn đề cần lưu ý trong php. Cảm ơn các bạn đã theo dõi bài viết, mong bài viết sẽ mang lại kiến thức hữu ích cho các bạn.