Xin chào tất cả các mọi người, bài viết này mình xin trình bày kiến thức về SOLID mà mình tìm hiểu, rất mong được sự theo dõi của mọi người

### 1) SOLID là gì?
- SOLID là năm nguyên lý cơ bản trong thiết kế phần mềm hướng đối tượng, giúp code trở nên dễ hiểu, linh động và dễ bảo trì hơn.
- Tác giả của SOLID là kỹ sư phần mềm nổi tiếng Robert C. Martin.
- SOLID là 5 nguyên lý sau trong thiết kế hướng đối tượng:
1.     S - Single-responsiblity principle
2.     O - Open-closed principle
3.     L - Liskov substitution principle
4.     I - Interface segregation principle
5.     D - Dependency Inversion Principle

### 1.1) S - Single-responsiblity principle

> Một Class chỉ nên có duy nhất một lý do để thay đổi nghĩa là class chỉ chịu trách nhiệm về một công việc nào đó.
> 
**Ví Dụ**

```php
class ReportManager()
{
   public function ReadDataFromDB() {};
   public function ProcessData() {};
   public function PrintReport() {};
}
```

- Class này giữ tới 3 trách nhiệm: Đọc dữ liệu từ DB, xử lý dữ liệu, in kết quả. Chỉ cần ta thay đổi DB, thay đổi cách in kết quả thì ta sẽ phải sửa đổi class này. Về sau class sẽ càng phình to ra sẽ rất khó quản lý.
- Theo đúng nguyên lý, ta phải tách class này ra làm 3 class riêng. Tuy số lượng class nhiều hơn những việc sửa chữa sẽ đơn giản hơn, class ngắn hơn nên cũng ít bug hơn.

### 1.2)  O - Open-closed principle

> Không được sửa đổi một Class có sẵn, nhưng có thể mở rộng bằng kế thừa
> 

**Ví Dụ**

```php
class Circle {
    public $radius;
    
    public function __construct($radius) {
        $this->radius = $radius;
    }
}
class Square {
    public $length;
    
    public function __construct($length) {
        $this->length = $length;
    }
}

class AreaCalculator {
    protected $shapes;
    
    public function __construct($shapes = array()) {
        $this->shapes = $shapes;
    }
    
    public function sum() {
        foreach($this->shapes as $shape) {
            if(is_a($shape, 'Square')) {
                $area[] = pow($shape->length, 2);
            } else if(is_a($shape, 'Circle')) {
                $area[] = pi() * pow($shape->radius, 2);
            }
        }
        
        return array_sum($area);
    }
}
```

Giả sử nếu bạn muốn phương thức sum() có thể tính tổng diện tích của các hình khác nữa, thì chúng ta lại phải thêm vài cái if/else nữa như vậy nó vi phạm nguyên lý Open-closed. Để giải quyết vấn đề chúng ta đưa hàm sum() và trong class định nghĩa của từng hình.

```php
class Square {
    public $length;
    
    public function __construct($length) {
        $this->length = $length;
    }
    public function area() {
        return pow($this->length, 2);
    }
}

class Circle {
    public $radius;
    
    public function __construct($radius) {
        $this->radius = $radius;
    }
    
    public function area() {
        return pi() * pow($this->radius, 2);
    }
}

class AreaCalculator {
    protected $shapes;
    
    public function __construct($shapes = array()) {
        $this->shapes = $shapes;
    }
    
    public function sum() {
        foreach($this->shapes as $shape) {
            $area[] = $shape->area();
        }

        return array_sum($area);
    }
}
```

Như vậy việc tính tổng sẽ trở nên dễ ràng hơn và dễ mở rộng hơn. Ví dụ nếu bạn muốn tính toán tổng diện tích có cả hình  tam giác, chúng ta sẽ tạo thêm một class Triangle cho hình tam giác mà không cần thay đổi nội dung class tính toán. Tuy nhiên giả sử đối tượng được truyền vào AreaCalculator là không phải là một instance của các class hình và nếu nó là một hình rồi thì nó có phương thức area hay chưa, để giải quyết vấn đề này chúng ta tạo ra một interface mà các class về hình sẽ thực hiện interface này

```php
interface ShapeInterface {
    public function area();
}
class Circle implements ShapeInterface {
    public $radius;
    
    public function __construct($radius) {
        $this->radius = $radius;
    }
    
    public function area() {
        return pi() * pow($this->radius, 2);
    }
}
```

Khi đó ở class AreaCalculator tại phương thức sum() chúng ta kiểm tra nếu các hình đưa vào không phải là một instance của ShapeInterface thì bắn ra lỗi:

```php
public function sum() {
    foreach($this->shapes as $shape) {
        if(is_a($shape, 'ShapeInterface')) {
            $area[] = $shape->area();
            continue;
        }
        throw new AreaCalculatorInvalidShapeException;
    }
    return array_sum($area);
}
```

### 1.3) L - Liskov substitution principle

> Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình
> 
**Ví dụ**

```php
class Rectangle{
    public $width;
    public $height;
    
    public function setWidth($width) {
        $this->width = $width;
    }
    
    public function setHeight($height) {
        $this->height= $height;
    }
    
    public function area() {
        return $this->width * $this->height;
    }
}

class Square extends Rectangle { 
    public function setWidth($width) {
        $this->width = $width;
        $this->height = $width;
    }
    
    public function setHeight($height) {
        $this->width = $height;
        $this->height = $height;
    }    
}

$rect = new Rectangle();
$rect->setWidth(5);
$rect->setHeight(10);
echo $rect->area(); // Kết quả là 5 * 10

$square = new Square(); 
$square->setWidth(5);
$square->setHeight(10);
echo $square->area();
```
-  Kết quả 10 * 10, như vậy class Square đã sửa định nghĩa class cha Rectangle
- Nhìn ví dụ trên ta thấy mọi tính toán đều rất hợp lý. Do hình vuông có 2 cạnh bằng nhau, mỗi khi set độ dài 1 cạnh thì ta set luôn độ dài của cạnh còn lại.
- Tuy nhiên, Class Square kế thừa từ class Rectangle nhưng class Square có những hình vi khác và nó đã thay đổi hành vi của của class Rectangle, dẫn đến vi phạm LSP
- Trong trường hợp này, để code không vi phạm nguyên lý LSP, chúng ta phải tạo 1 class cha là class Shape, sau đó cho Square và Rectangle kế thừa class Shape này.

### 1.4) I - Interface segregation principle

> Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể.
> 

**Ví dụ**

ví dụ ta muốn tính toán thể tích của hình, chúng ta có thể đưa vào ShapeInterface:

```php
interface ShapeInterface {
    public function area();
    public function volume();
}
```

Bây giờ thì bất kỳ hình nào được tạo ra đều phải implement phương thức volume(), nhưng như chúng ta đã biết thì các hình học phẳng thì sẽ không thể tính được thể tích do đó chúng không có thể tích, như vậy interface này ép buộc lớp Square phải implement một phương thức mà không sử dụng như vậy sẽ đi ngược lại với nguyên lý này thay vào đó chúng ta tạo thêm 1 interface  mới tên là SolidShapeInterface có phương thức volume 

```php
interface ShapeInterface {
    public function area();
}

interface SolidShapeInterface {
    public function volume();
}
// Lớp hình hộp chữ nhật thực hiện cả hai interface
class Cuboid implements ShapeInterface, SolidShapeInterface {
    public function area() {
        // Tính toán diện tích bề mặt hình hộp chữ nhật
    }
    public function volume() {
        // Tính toán thể tích hình hộp chữ nhật
    }
}
```

### 1.5) D - Dependency Inversion Principle

> Các thành phần hệ thống (class, module, …) chỉ nên phụ thuộc vào những abstractions, không nên phụ thuộc vào các concretions hoặc implementations cụ thể
> 
> Interface không nên phụ thuộc vào chi tiết, mà ngược lại. ( Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation)
>

**Ví dụ**
```php
class PasswordReminder {
    private $dbConnection;

    public function __construct(MySQLConnection $dbConnection) {
        $this->dbConnection = $dbConnection;
    }
}
```

Chúng ta thấy class PasswordReminder là một class cao cấp hơn class MySQLConnection nó vi phạm D trong SOLID vì PasswordReminder bị ép buộc phụ thuộc vào lớp MySQLConnection. Giả sử sau đó bạn muốn thay đổi CSDL khác thì chúng ta phải chỉnh sửa lại class PasswordReminder như  vậy thì sẽ vi phạm nguyên lý Open-closed. Để giải quyết vấn đề chúng ta tạo ra một interface mới

```php
interface DBConnectionInterface {
    public function connect();
}
```

Interface này có một phương thức connect và lớp MySQLConnection implement interface này thay vì sử dụng MySQLConnection trong contructor của PasswordReminder.

```php
class MySQLConnection implements DBConnectionInterface {
    public function connect() {
        return "Database connection";
    }
}

class PasswordReminder {
    private $dbConnection;

    public function __construct(DBConnectionInterface $dbConnection) {
        $this->dbConnection = $dbConnection;
    }
}
```
### Kết luận
- Có rất nhiều nguyên tắc trong thiết kế phần mềm và trên đây là 5 nguyên tắc thiết kế hướng đối tượng (SOLID) quan trọng nhất.
- Việc nắm vững và vận dụng được các nguyên lý trong thiết kế sẽ giúp cho mã nguồn chương trình của chúng ta nhìn rõ ràng hơn, tận dụng được các ưu điểm của OOP, các thành phần không bị phụ thuộc quá nhiều vào nhau, để thuận tiện cho việc bảo trì và mở rộng sau này.
- Cám ơn mọi người đã theo dõi.