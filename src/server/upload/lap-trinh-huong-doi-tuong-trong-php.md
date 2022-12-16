## Giới thiệu
Cụm từ "Lập trình hướng đối tượng" ắt hẳn không còn quá xa lạ với dân developer. Vậy lập trình hướng đối tượng là gì? Tại sao cần phải biết Lập trình hướng đối tượng? Thể hiện của chúng với PHP như thế nào? Chúng ta cùng tìm hiểu qua bài viết này nhé :grinning::grinning::grinning:

## Nội dung
### Lập trình hướng đối tượng là gì? 
Theo wikipedia:
> Lập trình hướng đối tượng (tiếng Anh: Object-oriented programming, viết tắt: OOP) là một mẫu hình lập trình dựa trên khái niệm "công nghệ đối tượng", mà trong đó, đối tượng chứa đựng các dữ liệu, trên các trường, thường được gọi là các thuộc tính; và mã nguồn, được tổ chức thành các phương thức. Phương thức giúp cho đối tượng có thể truy xuất và hiệu chỉnh các trường dữ liệu của đối tượng khác, mà đối tượng hiện tại có tương tác (đối tượng được hỗ trợ các phương thức "this" hoặc "self"). Trong lập trình hướng đối tượng, chương trình máy tính được thiết kế bằng cách tách nó ra khỏi phạm vi các đối tượng tương tác với nhau. Ngôn ngữ lập trình hướng đối tượng khá đa dạng, phần lớn là các ngôn ngữ lập trình theo lớp, nghĩa là các đối tượng trong các ngôn ngữ này được xem như thực thể của một lớp, được dùng để định nghĩa một kiểu dữ liệu.

Có thể hiểu đơn giản là lập trình hướng đối tượng là lập trình theo cách chia ra thành các đối tượng để xử lý.
### Các khái niệm cơ bản trong lập trình hướng đối tượng 
#### 1. Lớp
Lớp(Class) là một nhóm các đối tượng có chung các thuộc tính. 
Mỗi một đối tượng được gọi là 1 thực thể(instance) của lớp
```php
class ConNguoi
{
    //code
}

```
#### 2. Thuộc tính
Thuộc tính(properties) là thành phần của đối tượng. Ví dụ; Con người sẽ có các thuộc tính như mắt, mũi, chân, tay, ...Người ta  sử dụng biến và hằng để biểu diễn thuộc tí-nh. 
```php
class ConNguoi
{
    var $name;
    var $chan;
    var $tay;
    var $mieng;
    const soTay = 2;
}
```

#### 3.  Phương thức
Phương thức(method) trong class biểu diễn các hành vi của đối tượng. Người ta sử dụng hàm để biểu diễn phương thức 
```php
class ConNguoi
{
    function an(){
        //code
    }

    function ngu(){
        //code
    }
    function laodong(){
        //code
    }
}
```
#### 4. Khởi tạo 1 đối tượng 
```php
$p = new ConNguoi();
```

#### 5. Truy xuất thuộc tính của class
Để truy xuất thuộc tính động trong class ta sử dụng từ khóa this . VD:
```php
function getName(){
    return $this->name;
}
```
Để truy xuất thuộc tính hằng trong class
```php
function getSoChan(){
    return self::sochan;
}
```
Để truy xuất thuộc tính khi đứng bên ngoài class
```php
$p = new ConNguoi();
$p->name;
ConNguoi::soChan;
```

#### 6.Phương thức khởi tạo và hủy 
**Phương thức khởi tạo** là một phương thức mà khi chúng ta khởi tạo một class thì nó luôn được gọi kèm theo. 
```php
class ConNguoi
{
    public function __construct()
    {
        echo "class da duoc khoi tao";
    }
}
```

**Phương thức hủy** trong class sẽ được gọi khi class đó được hủy. Nó thường dùng để giải phóng tài nguyên của một class và trong một class có thể có hoặc không có phương thức hủy.
```php
class ConNguoi
{
    public function __destruct()
    {
        echo "class da duoc huy";
    }
}
```

### Các tính chất của lập trình hướng đối tượng 
#### 1.Tính đóng gói (Encapsulation):
**Tính đóng gói** là cách để che dấu những tính chất xử lý bên trong của đối tượng, những đối tượng khác không thể tác động trực tiếp làm thay đổi trạng thái mà chỉ có thể tác động thông các method public của của đối tượng đó. 

Trong PHP việc đóng gói được thực hiện nhờ sử dụng các từ khoá `public`, `private` và `protected`:
* `public`: Cho phép truy cập ở mọi phạm vi
*  `protected`: Chỉ cho phép truy cập ở phạm vị class và các class kế thừa nó 
*  `private`: Chỉ cho phép truy cập ở phạm vi class 
``` php
class Car
{
    private $gas=0;
    protected $price;

    private function addGas($amount){
        $this->gas += $amount;
    }

    public function buyGas($amount){
        $this->addGas($amount);
    }

    public function showPrice(){
        echo "$this->price";
    }
}

class Lamborghini extends Car
{
    public function __construct()
    {
        $this->gas = 100; // Loi vi gas la private
        $this->price = 500000;
    }

    function discountPrice($percent){
        $this->price = $this->price * (1-$percent);
    }
    

}

$car1 = new Car();
$car1->gas; // Loi vi car1 la private

$car2 = new Lamborghini();
$car2->discountPrice(0.2); // 500000 * (1-0.2) = 400000

$car2->price; // Loi vi price la protected
$car2->showPrice(); //400000
```

#### 2. Tính kế thừa
**Tính kế thừa** là kỹ thuật cho phép kế thừa lại những tính năng mà một đối tượng khác đã có, giúp tránh việc code lặp dư thừa và có thể mở rộng, tái sử dụng code dễ dàng hơn.
```php
class People
{
    public $name = 'Noname';
    public $age = 18;

    function showInfo(){
        $this->name = "hj";
        echo "Name: $this->name \nAge: $this->age\n";
    }
}

class Student extends People
{
    var $student_code = "170211378";
    var $school = "UET";

    function an(){
        //code
    }

    function ngu(){
        //code
    }

    function showInfo()
    {
        parent::showInfo();
        $this->name = 'k';
        echo "Student_code: $this->student_code \nSchool: $this->school\n";
    }
}

$p1 = new People();
$p1->name = "Vu";
$p1->showInfo();
// Name: Vu
// Age: 18


$p2 = new Student();
$p2->name = "Vu";
$p2->showInfo();
//Name: Vu 
//Age: 18
//Student_code: 170211378 
//School: UET
```

#### 3. Tính đa hình.
**Tính đa hình** là một đối tượng thuộc các lớp khác nhau có thể hiểu cùng một thông điệp theo cách khác nhau.
```php
class DongVat
{
    function keu(){
        //code
    }
}

class Cho extends DongVat
{
    function keu(){
        echo "go go";
    }
}

class Meo extends DongVat
{
    function keu(){
        echo "meo meo";
    }
}
```
#### 4. Tính trừu tượng
**Tính trừu tượng** là phương pháp định ra một quy định cơ bản, và yêu cầu bất kể một lớp nào, hoặc phương thức nào khi muốn làm việc với nó, thì buộc phải định nghĩa theo các quy tắc mà nó đã đặt ra.
```php
abstract class Phone
{
    abstract function nghe();
    abstract function goi();
}

class CucGach extends Phone
{
    function nghe(){
        // code
    }

    function goi(){
        // code
    }
    
}

abstract class SmartPhone extends Phone
{
    abstract function nhantin();
    abstract function nghenhac();
    abstract function luotweb();
}

class Iphone extends SmartPhone
{
    function nghe(){
        // code
    }

    function goi(){
        // code
    }

    function nhantin(){
        // code
    }

    function nghenhac(){
        // code
    }

    function luotweb(){
        // code
    }
    function dangnhapIcloud(){
        
    }
}

```
### Abstract class và interface
#### 1. Abstract class là gì
* **Abstract Class**(Lớp trừu tượng) được xem như một class cha cho tất cả các class có cùng bản chất
* Abstract class không thể khởi tạo được đối tượng.
* Mỗi lớp con chỉ có thể kế thừa 1 lớp trừu tượng bằng từ khóa extend 
* Lớp con kế thừa từ lớp trừu tượng có thể override các phương thức abstract trong đó.
* abstract class có thể khai báo các thuộc tính và các phương thức bình thường và không có phương thức abstract.
* Ngược lại một phương thức abstract không thể thuộc 1 class thông thường mà  phải thuộc một abstract class nào đó  
* Các abstract class có thể kế thừa lẫn nhau.
```php
abstract class Laptop
{
    var $memory;
    abstract function choiGame();
}

class Dell extends Laptop
{
    // class bat buoc phai cai dat phuong thuc choiGame
    function choiGame()
    {
        // code
    }
}

class Asus extends Laptop
{
    // class bat buoc phai cai dat phuong thuc choiGame
    function choiGame()
    {
        // code
    }
}

$pc1 = new Laptop(); // error
$pc2 = new Asus(); 
```
#### 2. Interface
* **Interface** trong hướng đối tượng là một khuôn mẫu, giúp cho chúng ta tạo ra bộ khung cho một hoặc nhiều đối tượng và nhìn vào interface thì chúng ta hoàn toàn có thể xác định được các phương thức và các thuộc tính cố định (hay còn gọi là hằng) sẽ có trong đối tượng implement nó.
* Trong interface chúng ta chỉ được khai báo phương thức chứ không được định nghĩa chúng.
* Trong interface chúng ta có thể khai báo được hằng nhưng không thể khai báo biến.
* Một interface không thể khởi tạo được (vì nó không phải là một đối tượng).
* Một class có thể implement nhiều interface.
* Các interface có thể kế thừa lẫn nhau.
```php
interface DongVat
{
    function dichuyen();
}

interface Nguoi extends DongVat
{
    function an();
    function ngu();
    function hoc();
}

interface Soi extends DongVat
{
    function disan();
}

class NguoiSoi implements Nguoi, Soi
{

    function dichuyen(){
        //code
    }

    function an(){
        //code
    }

    function ngu(){
        //code
    }

    function hoc(){
        //code
    }

    function disan(){
        //code
    }

    function hoasoi(){
        //code
    }
}

$p = new Nguoi(); // error
$p = new NguoiSoi();
```

#### 3. So sánh Abstract class
	
|  |**Abstract Class** | **Interface**|
| - | - | - |
| Đa kế thừa | `extends` một và chỉ một Abstract Class | `implements` nhiều Interface |
| Khởi tạo | Có thể chứa thêm các Method đã được triển khai hoặc các biến, hằng | Chỉ chứa phương thức Abstract và hằng |
| Đóng gói | Mọi phương thức,thuộc đều mặc định là public. | Có thể xác định modifier. |

### Static
**Static** trong lập trình hướng đối tượng là một thành phần tĩnh (có thể là thuộc tính hoặc phương thức) mà nó hoạt động như một biến toàn cục, dù cho nó có được xử lý ở trong bất kỳ một file nào đi nữa (trong cùng một chương trình) thì nó đều lưu lại giá trị cuối cùng mà nó được thực hiện vào trong lớp.

```php
class Laptop
{
    public static $soluong = 0;
    public $name;
    /**
     * Laptop constructor.
     */
    public function __construct()
    {
        self::$soluong ++;
    }

    public static function inSoLuong(){
        echo Laptop::$soluong;
    }

}

$pc1 = new Laptop();
$pc2 = new Laptop();

echo Laptop::inSoLuong();
```

#### Static và self
* `self`: Truy xuất đến class khai báo nó.
* `static`: Truy xuất đến đối tượng hiện tại.

VD demo cho dễ hiểu 
```php
class ConNguoi
{
    protected static $name = 'ConNguoi';

    public function getName()
    {
        echo self::$name;
        echo '<br>';
        echo static::$name;
    }
}

class NguoiLon extends ConNguoi
{
    protected static $name = 'NguoiLon';
}

// NguoiLon::getName();
$a = new NguoiLon();
$a->getName();
```

### Trait
* Trait là một module giúp cho chúng ta có thể sử dụng lại các phương thức được khai báo trong trait  vào các class khác nhau một cách đơn giản hơn là kế thừa như trước.
* Traits có chức năng gom lại các phương thức và thuộc tính mà chúng ta muốn sử dụng lại nhiều lần.
* Traits giúp cho giảm việc lặp code đáp ứng được nguyên tắc(DRY - Don't Repeat Yoursefl).
```php
trait SetGetName
{
    public function getName(){
        return $this->name;
    }

    public function setName($name){
        $this->name = $name;
    }
}

class ConNguoi
{
    private $name;
    //gọi trait SetGetName
    use SetGetName;
}
```

Có thể sử dụng trait lồng nhau
```php
trait SetGetName
{
    public function getName(){
        return $this->name;
    }

    public function setName($name){
        $this->name = $name;
    }
}
trait SetGetInfo{
    use SetGetName;
    public function getAge(){
        return $this->age;
    }

    public function setAge($age){
        $this->age = $age;
    }
}
class ConNguoi
{
    private $name;
    private $age;
    //gọi trait SetGetName
    use SetGetInfo;
}
```

**insteadof**
Từ khóa được sử dụng khi 2 trait có hàm giống nhau, ta chỉ định sẽ dùng hàm nào
```php
trait SetGetName
{
    public function getName(){
        return $this->name;
    }

    public function setName($name){
        $this->name = $name;
    }
}
trait SetInfo{
    public function setName(){
        echo "Ten da duoc update\n";
        return $this->name;
    }

    public function setAge($age){
        $this->age = $age;
    }
}
class ConNguoi
{
    private $name;
    private $age;
    //gọi trait SetGetName
    use SetGetInfo, SetInfo
    {
        SetInfo::setName() insteadof SetGetInfo; 
    };
}

$p = new ConNguoi();
$p->setName("Vu"); 
echo $p->getName();
// Ten da duoc update
// Vu
```

### Namespace
Namespaces được hiểu là cách đóng gói các file php. Nó giúp giải quyết vấn đề tác quyền của thư viện đang sử dụng và việc phân biệt không gian tên của những thành phần code thường được tái sử dụng như class và function.
#### Định nghĩa namespace
`namespace.php`
```php
namespace nameSpace;
```
#### Nạp namespace bằng `use`
`test.php`
```php
include "namespace.php"
use nameSpace\className
```

### Magic functions
Magic funtions là các hàm tự động thực thi khi chúng ta thao tác tới đối tượng. Có thể nhận biết các hàm này bằng kiểu `__function_name() `

#### Một số magic functions thường dùng
* `__construct()`: hàm khởi tạo, được gọi khi khởi tạo mới đối tượng
* `__destruct()`: hàm hủy, được gọi khi đối tượng bị hủy
* `__get()`: hàm getter, được gọi khi lấy giá trị của thuộc tính
* `__set()`: hàm setter, được gọi khi gán giá trị cho thuộc tính
* `__call()`: hàm call, được gọi khi ta gọi đến một phương thức không tồn tại trong đối tượng
* `__callStatic()`: hàm call static, được gọi khi ta gọi đến một phương thức tĩnh không tồn tại trong đối - tượng
## Tạm kết 
Trên đây là tất cả những gì mình học được về Lập trình hướng đối tượng với PHP. Hy vọng nó có thể giúp ích phần nào cho các bạn trong việc sử dụng nó vào bài tập lớn cũng như dự án của mình. Cảm ơn mọi người đã theo dõi. Mọi ý kiến đóng góp các bạn để lại dưới phần comment của bài viết để bài viết được hoàn thiện hơn.