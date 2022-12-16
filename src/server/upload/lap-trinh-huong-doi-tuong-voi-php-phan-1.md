## Mở đầu
Lập trình hướng đối tượng (gọi tắt là `OOP` - object-oriented programming) là một kĩ thuật lập trình hỗ trợ công nghệ đối tượng. Nếu như trước kia là các kiểu lập trình hướng thủ tục, hướng module,.. thì giờ đây thế giới đang ưu về sử dụng hướng đối tượng.Nếu như trước đây chúng ta lập trình với hướng thủ tục thì sẽ chia thành các hàm để xử lý, thì giờ đây khi sử dụng hướng đối tượng thì chúng ta sẽ chia ra thành các đối tượng để xử lý.

Bài viết dưới đây sẽ tập trung giải đáp các vấn đề sau:

* Các đặc điểm cơ bản của lập trình hướng đối tượng. Chúng được thể hiện như thế nào trong PHP.
* Sự khác biệt giữa Abstract Class và Interface.
* Thế nào là một hàm static. Phân biệt cách dùng từ khoá static::method() với self::method().
* Thế nào là Trait.
* Thế nào là Namespaces.

### 1. Các đặc điểm cơ bản của lập trình hướng đối tượng. Chúng được thể hiện như thế nào trong PHP.
Lập trình hướng đối tượng (`OOP`) có 4 đặc trưng cơ bản:
* Tính đóng gói (**Encapsulation**)
* Tính kế thừa (**Inheritance**)
* Tính đa hình (**Polymorphism**)
* Tính trừu tượng (**Abstraction**)
---
**Tính đóng gói** : Tính đóng gói được thể hiện qua việc các thuộc tính, phương thức được che giấu trong một lớp (`class`), nhằm mục đích kiểm soát quyền sử dụng, truy cập đến các thuộc tính, phương thức.

Tính đóng gói trong PHP được thể hiện thông qua việc sử dụng các từ khóa `public`, `private`, `protected`:
* `public`: Cho phép sử dụng thuộc tính và phương thức của `class` ở phạm vi trong, ngoài `class`, các `class` con kế thừa từ đó đều có thể linh động sử dụng lại.
* `private`: Chỉ cho phép sử dụng trong phạm vi `class` đó.
* `protected`: Cho phép sử dụng ở phạm vi trong `class` cha và các `class` kế thừa từ `class` cha.

---
**Tính kế thừa**: được thể hiện qua việc các `class` con kế thừa lại các phương thức, thuộc tính của `class` cha.

```php
class Cha
{
    public $quoctinh = 'Viet Nam';

    public function noi()
    {
        echo "Noi tieng Viet Nam";
    }
}

class Con extends Cha
{
    public function __construct()
    {
        parent::noi();
    }
}

new Con();
=> Noi tieng Viet Nam
```
---
**Tính trừu tượng** : trong lập trình hướng đối tượng giúp giảm sự phức tạp thông qua việc tập trung vào các đặc điểm trọng yếu hơn là đi sâu vào chi tiết.
Như vậy khi tương tác với đối tượng chỉ cần quan tâm đến các thuộc tính, phương thức cần thiết. Chi tiết về nội dung không cần chú ý đến.

PHP có `abstract class` và `interface` để trừu tượng hóa các đối tượng.
```php
interface Animal
{
    public function noi();
}

class Dog implements Animal
{
    public function noi()
    {
        echo "Go go go";
    }
}
```
---
**Tính đa hình**: thể hiện qua việc các `class` con có thể viết lại các phương thức từ `class` cha, thông qua việc `extends` và `implements`
```php
interface Animal
{
    public function noi();
}

class Dog implements Animal
{


    public function __construct()
    {
        $this->noi();
    }
    public function noi()
    {
        echo "Go go go";
    }
}

class Cat implements Animal
{


    public function __construct()
    {
        $this->noi();
    }
    public function noi()
    {
        echo "Meowwww";
    }
}

new Dog();
=> Go go go
new Cat();
=> Meowwww
```
### 2. Sự khác biệt giữa Abstract Class và Interface.
Ở phần 1, chúng ta có nhắc tới 2 khái niệm `abstract class` và `interface`. `Interface `và `Abstract class `là 2 khái niệm cơ bản trong lập trình OOP. Nhưng phân lớn mọi người cảm thấy mơ hồ và lẫn lộn 2 khái niệm này. 

`Abstract class`: là một `class` trừu tượng cho tất cả các class có cùng bản chất.Do đó mỗi lớp dẫn xuất (lớp con) chỉ có thể kế thừa từ một lớp trừu tượng. Bên cạnh đó nó không cho phép tạo `instance`, nghĩa là sẽ không thể tạo được các đối tượng thuộc lớp đó. 
```php
abstract class  Animal
{
    public function noi()
    {
        echo "Noi...";
    }
}
new Dog();
// => Báo lỗi

class Cat extends Animal
{


    public function __construct()
    {
        $this->noi();
    }
}

new Cat();
// => Noi...
```
`Interface`: Lớp này được xem như một mặt nạ cho tất cả các Class cùng cách thức hoạt động nhưng có thể khác nhau về bản chất. Từ đó lớp con dẫn xuất có thể kế thừa từ nhiều lớp `Interface` để bổ sung đầy đủ cách thức hoạt động của mình (**đa kế thừa - Multiple inheritance**).
```php
interface  A
{
    public function method_a();
}

interface B
{
    public function method_b();
}

class C implements A, B
{
    public function __construct()
    {
        $this->noi();
    }
    
    public function method_b()
    {
        // TODO: Implement method_b() method.
    }
    
    public function method_a()
    {
        // TODO: Implement method_a() method.
    }
}
```

### 3. Thế nào là một hàm static. Phân biệt cách dùng từ khoá static::method() với self::method().
**Thế nào là một hàm static?**: Hàm `static` là hàm có thể được gọi mà không cần một đối tượng của `class` đó. `Static` nó hoạt động như một biến toàn cục dù cho nó có được xử lý ở trong bất kỳ một file nào đi nữa (trong cùng một chương trình) thì nó đều lưu lại giá trị cuối cùng mà nó được thực hiện vào trong lớp.
```php
public static function staticMethod()
{
    //TODO
}
```
> Việc thực thi hàm static trong class có thể thực hiện bằng lệnh: `static::staticMethod()`, `self::staticMethod()` hoặc `$this->staticMethod()`, trong đó `self` và `static` là đại diện của `class`, còn `$this` là đại diện của `object`. Trong phương thức `static` không thể gọi phương thức hoặc thuộc tính `non-static`. Nhưng phương thức `non-static` có thể gọi phương thức hoặc thuộc tính `static`. Bởi vì có thể hiểu đơn giản như sau:
> * Phương thức `static` có thể gọi ngay cả khi chưa khởi tạo `object`, do đó nếu phương thức `static` gọi đến một phương thức `non-static `thì khi chưa khởi tạo `object`, sẽ không có biến` $this` (là đại diện của `object`) để gọi đến phương thức `non-static`.
> * Đương nhiên phương thức `non-static` luôn luôn có thể gọi đến phương thức `static` vì phương thức `static` đã tồn tại ngay từ khi chạy chương trình, khi `object` chưa được khởi tạo.
> 

**Phân biệt cách dùng từ khoá `static::method()` với `self::method()`**:

* `static`: đại diện cho chính đối tượng đang gọi đến phương thực
* `self`: đại diện cho chính đối tượng khai báo nó.

```php
class Person
{
    public static function getSeflObject()
    {
        return new self;
    }
    public static function getStaticObject()
    {
        return new static;
    }
}
class Girl extends Person
{
}
echo get_class(Girl::getSeflObject()); //Person
echo get_class(Girl::getStaticObject()); //Girl
```
### 4. Thế nào là Trait.
`Traits` hiểu đơn giản là một nhóm các methods mà bạn muốn include nó trong một class khác. Một `Trait` giống với` abstract class `không thể khởi tạo trên chính nó. `Trait` giảm bớt hạn chế của việc `đơn kế thừa `, cho phép chúng ta sử dụng lại một nhóm các phương thức trên `class`.

Một `Trait` đơn giản có thể là: 
```php
trait Sharable
{
    public function share($item)
    {
        return 'share this item';
    }
}
```
Chúng ta có thể sử dụng nó trong các `class` khác nhau như sau: 
```php
class Post
{
    use Sharable;
}

class Comment 
{
    use Sharable;
}
```
Như vậy, khi bạn khởi tạo các đối tượng từ class `Post`, `Comment`, đối tượng đó sẽ có sẵn phương thức `share()`.

Chúng ta có thể sử dụng nhiều `Trait` trong 1 `class`.
### 5. Thế nào là Namespaces.
Namespace giúp tạo ra một không gian tên cho hàm và lớp trong lập trình nói chung và trong PHP nói riêng. Với PHP, `Namespaces` được thiết kế để giải quyết hai vấn đề là tác giả của thư viện và các ứng dụng khi tái sử dụng lại các lớp và các hàm.
* Namespaces tránh việc tên hàm, tên lớp có thể trùng lặp, xung đột khi bạn tạo ra với các hàm, lớp, biến của PHP hay của bên thứ ba.
* Namespaces có khả năng tạo ra bí danh, rút ngắn cách đặt tên làm cho mã nguồn dễ đọc hiểu hơn.
```php
namespace App\Controllers;

class NewsController
{
    public function index() 
    {
        echo __NAMESPACE__;
    }
}
```
 PHP `Namespaces ` cung cấp cách để nhóm các `class`, `interface`, `function`, `constant` liên quan.
 
 ### Kết luận
 Qua bài viết, hy vọng các bạn đã hiểu được cơ bản về hướng đối tượng và việc thể hiện nó trong PHP, một vài khái niệm được sử dụng rộng rãi.