## 1. Giới thiệu
Nếu là một lập trình viên PHP, chắc hẳn bạn đã từng ít nhất một lần sử dụng traits. Traits được giới thiệu từ PHP 5.4, là một cơ chế giúp ta tái sử dụng code trong các ngôn ngữ đơn kế thừa như PHP. Với traits, ta có thể  nhóm các phương thức ta muốn thành một class và sử dụng các phương thức trong traits mà không cần phải kế thừa traits.

Tiếp theo ta sẽ đi tìm hiểu về cách sử dụng và một số lưu ý khi sử dụng trait nhá. 
## 2. Thứ tự ưu tiên
Đầu tiên hãy tìm hiểu về thứ tự thực hiện các method khi sử dụng trait nhé. Ta có một ví dụ như sau:
```
<?php
class ClassBase {
   public function sayHello() {
       echo 'Hello !';
   }
}
 
trait TraitA {
   public function sayHello() {
       echo 'Hello, this is a trait !';
   }
}
 
class ClassA extends ClassBase {
   use TraitA;
}
 
$test = new ClassA();
$test->sayHello();
// Hello, this is a trait !
?>
```
Trong ví dụ trên ClassA đã extends ClassBase, đồng thời cũng sử dụng TraitA, cả ClassBase và TraitA đều có phương thức sayHello. Vậy khi một instance của ClassA gọi đến phương thức sayHello thì kết quả sẽ là gì ? Ta có thể thấy phương thức sayHello của TraitA đã được thực hiện, vậy phương thức của ClassBase đã bị ghi đè bởi phương thức của TraitA.
Vậy khi ta thực hiện ghi đè phương thức sayHello trong ClassA thì sao ?
```
<?php
class ClassBase {
   public function sayHello() {
       echo 'Hello !';
   }
}
 
trait TraitA {
   public function sayHello() {
       echo 'Hello, this is a trait !';
   }
}
 
class ClassA extends ClassBase {
   use TraitA;
 
   public function sayHello() {
       echo 'Hello, this is class A !';
   }
}
 
$test = new ClassA();
$test->sayHello();
// Hello, this is a class A !
?>
```
Ta thấy phương thức của ClassA đã ghi đè phương thức của trait.
Vậy hãy chú ý, thứ tự ưu tiên khi sử dụng trait đó là: phương thức của class hiện tại > phương thức của trait > phương thức của class kế thừa.
## 3. Sử dụng nhiều trait và xử lý xung đột khi sử dụng nhiều trait
Nếu ta sử dụng nhiều trait và các trait này có cùng một phương thức giống nhau thì chuyện gì sẽ xảy ra, ta hãy xem ví dụ dưới đây.
```
trait TraitA {
   public function sayHello() {
       echo 'Hello, this is trait A !';
   }
}
 
trait TraitB {
   public function sayHello() {
       echo 'Hello, this is trait B!';
   }
}
 
class ClassA {
   use TraitA, TraitB;
}
 
$test = new ClassA();
$test->sayHello();
// PHP Fatal error:  Trait method sayHello has not been applied,
// because there are collisions with other trait methods on ClassA
```
Ở đây ClassA đã sử dụng cả TraitA và TraitB, cả hai trait này đều có phương thức sayHello, vậy khi instance của ClassA gọi đến phương thức này thì phương thức của trait nào sẽ được thực hiện ? Thật ra trong trường hợp này ta lại gặp lỗi như trên, vậy có cách nào để xử lý trong trường hợp này không ? Hãy xem tiếp dưới đây nhé.
```
class ClassA {
   use TraitA, TraitB {
       TraitB::sayHello insteadOf TraitA;
   }
}
 
$test = new ClassA();
$test->sayHello();
// Hello, this is trait B!
```
Bằng cách sử dụng toán tử *inseadOf* ta có thể chỉ định phương thức của trait nào sẽ được thực hiện. Vậy nếu ta vẫn muốn sử dụng phương thức sayHello của TraitA thì sao ? Đây là lúc ta sử dụng toán tử *as*.
```
class ClassA {
   use TraitA, TraitB {
       TraitB::sayHello insteadOf TraitA;
       TraitA::sayHello as sayHelloA;
   }
}
 
$test = new ClassA();
$test->sayHello();
// Hello, this is trait B!
$test->sayHelloA();
// Hello, this is trait A!
```
## 4. Thay đổi method visibility
Sử dụng toán tử *as* ta cũng có thể thay đổi method visibility của các method mà ta dùng từ trait.
```
class ClassA {
   use TraitA {
       sayHello as protected;
   }
}
 
$test = new ClassA();
$test->sayHello();
// PHP Fatal error:  Access level to TraitA::sayHello() must be public
```
Ta cũng có thể tạo ra một alias method và thay đổi visibility của alias method này.
```
class ClassA {
   use TraitA {
       sayHello as private sayPrivateHello;
   }
}
 
$test = new ClassA();
$test->sayHello();
// Hello, this is trait A !
$test->sayPrivateHello();
// PHP Fatal error:  Uncaught Error: Call to private method ClassA::sayPrivateHello()
?>
```
## 5. Kết hợp nhiều trait
Trong trường hợp ta phải sử dụng nhiều trait, ta có thể gộp nhiều trait này thành một trait, sau đó ta sử dụng trait đã kết hợp này.
```
trait TraitA {
   public function sayHelloA() {
       echo 'Hello, this is trait A !';
   }
}
 
trait TraitB {
   public function sayHelloB() {
       echo 'Hello, this is trait B!';
   }
}
 
trait TraitComposed {
   use traitA, traitB;
}
 
class ClassA {
   use TraitComposed;
}
 
$test = new ClassA();
$test->sayHelloA();
// Hello, this is trait A !
$test->sayHelloB();
// Hello, this is trait B !
```
## 6. Các thành phần abstract và static trong trait
Trong trait ta cũng có thể định nghĩa các thành phần abstract và static.
```
trait TraitA {
   abstract public function sayHello();
 
   public static function staticSayHello() {
       echo 'Hello, this is a static function';
   }
}
 
class ClassA {
   use TraitA;
 
   public function sayHello() {
       echo 'Hello, this is class A';
   }
}
 
$test = new ClassA();
$test->sayHello();
// Hello, this is class A !
ClassA::staticSayHello();
// Hello, this is a static function
```
## 7. Property trong trait
Trong một trait ta còn có thể định nghĩa các property. Nhưng hãy chú ý, khi property đã được định nghĩa trong trait thì class sử dụng trait này không thể định nghĩa một property cùng tên trừ khi cùng giá trị khởi tạo và visibility.
```
trait TraitA {
   public $age = 10;
   public function sayHello() {
       echo 'Hello, this is trait A';
   }
 
}
 
class ClassA {
   use TraitA;
  
   public $age = 12;
}
 
$test = new ClassA();
$test->sayHello();
// PHP Fatal error:  ClassA and TraitA define the same property ($age) in the composition of ClassA.
// However, the definition differs and is considered incompatible
```
Điều tương tự cũng xảy ra khi ta định nghĩa cùng property ở hai trait khác nhau.
```
trait TraitA {
   public $age = 10;
   public function sayHello() {
       echo 'Hello, this is trait A';
   }
 
}
 
trait TraitB {
   public $age = 12;
}
 
class ClassA extends classBase {
   use TraitA, traitB;
}
 
$test = new ClassA();
$test->sayHello();
// PHP Fatal error:  TraitA and TraitB define the same property ($age) in the composition of ClassA
// However, the definition differs and is considered incompatible
```
## 8. Tổng kết
Trên đây là một số kiến thức cơ bản về traits và một vài lưu ý khi sử dụng traits. Hi vọng có thể giúp ích cho mọi người trong công việc hằng ngày của mình. Cảm ơn mọi người đã đọc bài. 

Tham khảo: https://www.php.net/manual/en/language.oop5.traits.php