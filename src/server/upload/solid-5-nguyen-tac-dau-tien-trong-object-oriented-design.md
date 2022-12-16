S.O.L.I.D là từ viết tắt chữ cái đầu của năm **nguyên tắc** đầu tiên trong thiết kế hướng đối tượng (OOD)  của Robert C. Martin.

Việc sử dụng kết hợp những nguyên tắc này với nhau tạo điều kiện cho lập trình viên tạo ra những phần mềm có tính bảo trì và mở rộng, đồng thời giúp dev dễ dàng tránh mã xấu (code smells) và refactor code. Đây cũng là một phần của nguyên lý agile.

Lưu ý: Đây chỉ là một bài viết đơn giản mang tính chất giới thiệu người đọc với SOLID mà sẽ không đi sâu vào chi tiết.

S.O.L.I.D là viết tắt của:

S - Single-responsiblity principle
O - Open-closed principle
L - Liskov substitution principle
I - Interface segregation principle
D - Dependency Inversion Principle

Chúng ta hãy mổ xẻ từng nguyên tắc để hiểu tại sao S.O.L.I.D có thể giúp chúng ta có thể trở thành một dev "cứng" hơn.

### Single-responsiblity principle (SRP)

SRP phát biểu:
> Mỗi class chỉ nên có một lí do duy nhất có thể khiến nó thay đổi, tức mỗi class chỉ nên chịu trách nhiệm cho một nhiệm vụ cụ thể.

Ví dụ: giả sử chúng ta có một số hình dạng và chúng ta muốn tính tổng tất cả các diện tích của nhiều hình dạng. Điều này khá đơn giản phải không?

```
class Circle {
    public $radius;

    public function construct($radius) {
        $this->radius = $radius;
    }
}

class Square {
    public $length;

    public function construct($length) {
        $this->length = $length;
    }
}
```

Đầu tiên, chúng ta tạo các class tương ứng với các hình dạng và cho constructor thiết lập các tham số cần thiết. Tiếp theo, chúng ta tạo class AreaCalculator và sau đó viết logic tính tổng diện tích của tất cả các hình dạng được cung cấp.

```
class AreaCalculator {

    protected $shapes;

    public function __construct($shapes = array()) {
        $this->shapes = $shapes;
    }

    public function sum() {
        // logic to sum the areas
    }

    public function output() {
        return implode('', array(
            "",
                "Sum of the areas of provided shapes: ",
                $this->sum(),
            ""
        ));
    }
}
```

Để sử dụng class AreaCalculator, chúng ta chỉ cần khởi tạo class và pass một mảng các hình dạng và hiện output ở cuối trang.

```
$shapes = array(
    new Circle(2),
    new Square(5),
    new Square(6)
);

$areas = new AreaCalculator($shapes);

echo $areas->output();
```

Vấn đề với phương pháp này là ta dùng class AreaCalculator để xử lý logic để xuất dữ liệu. Điều gì sẽ xảy ra nếu người dùng muốn xuất dữ liệu dưới dạng json hoặc dạng gì đấy khác?
Tất cả logic đó sẽ được xử lý bởi class AreaCalculator, đây là điều đi ngược lại nguyên tắc SRP. Class AreaCalculator chỉ nên tính tổng các diện tích của các hình dạng được cung cấp, nó không nên quan tâm tới việc người dùng muốn json hay HTML.
Vì vậy, để khắc phục điều này, ta có thể tạo một class SumCalculatorOutputter và sử dụng class này để xử lý logic hiển thị tổng diện tích các hình dạng.
Class SumCalculatorOutputter sẽ hoạt động như sau:

```
$shapes = array(
    new Circle(2),
    new Square(5),
    new Square(6)
);

$areas = new AreaCalculator($shapes);
$output = new SumCalculatorOutputter($areas);

echo $output->JSON();
echo $output->HAML();
echo $output->HTML();
echo $output->JADE();
```

Bây giờ, logic ta cần để xuất dữ liệu cho người dùng sẽ được xử lý bởi class SumCalculatorOutputter.

### Open-closed principle (OCP)

OCP phát biểu:
> Không được sửa đổi một class có sẵn, nhưng có thể mở rộng

Điều này đơn giản có nghĩa là một class nên được dễ dàng mở rộng mà không cần sửa đổi. Chúng ta hãy xem class AreaCalculator, đặc biệt là method tính tổng.

```
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
```

Nếu chúng ta muốn method sum có thể tính tổng diện tích của nhiều hình dạng hơn, chúng ta sẽ phải thêm nhiều khối if/else và điều đó đi ngược lại với nguyên tắc OCP.

Một cách chúng ta có thể cải thiện phương thức tính tổng này là loại bỏ logic để tính diện tích của mỗi hình dạng ra khỏi phương thức tổng và đưa nó vào class của mỗi hình dạng cụ thể.
```
class Square {
    public $length;

    public function __construct($length) {
        $this->length = $length;
    }

    public function area() {
        return pow($this->length, 2);
    }
}
```

Chúng ta làm điều tương tự với class Circle. Bây giờ, việc tính tổng của một hình dạng bất kỳ sẽ rất đơn giản như sau:

```
public function sum() {
    foreach($this->shapes as $shape) {
        $area[] = $shape->area();
    }

    return array_sum($area);
}
```

Bây giờ chúng ta có thể tạo một class hình dạng khác và pass nó vào khi tính tổng mà không làm phá tan tành code. Tuy nhiên, bây giờ có một vấn đề khác phát sinh, là làm thế nào để chúng ta biết rằng đối tượng được truyền vào AreaCalculator thực sự là một hình dạng, và nếu là hình dạng thật, thì nó có một phương thức là area hay không?

Interface là một phần không thể thiếu của S.O.L.I.D, ví dụ, chúng ta sẽ tạo ra một giao diện mà mọi hình dạng đều implement:

```
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

Trong phương pháp tính tổng AreaCalculator của chúng ta, chúng ta có thể kiểm tra xem các hình dạng được cung cấp có thực sự là các instance của ShapeInterface hay không, nếu không chúng ta sẽ trả về một exception:

```
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

### Liskov substitution principle (LSP)

LSP phát biểu:
> Một class con nên có thể thay thế cho class cha của nó mà không gây ra lỗi.

Tiếp tục sử dụng class AreaCalculator, giả sử chúng ta có class VolumeCalculator mở rộng class AreaCalculator:

```
class VolumeCalculator extends AreaCalulator {
    public function construct($shapes = array()) {
        parent::construct($shapes);
    }

    public function sum() {
        // logic to calculate the volumes and then return and array of output
        return array($summedData);
    }
}
```

Trong class SumCalculatorOutputter:

```
class SumCalculatorOutputter {
    protected $calculator;

    public function __constructor(AreaCalculator $calculator) {
        $this->calculator = $calculator;
    }

    public function JSON() {
        $data = array(
            'sum' => $this->calculator->sum();
        );

        return json_encode($data);
    }

    public function HTML() {
        return implode('', array(
            '',
                'Sum of the areas of provided shapes: ',
                $this->calculator->sum(),
            ''
        ));
    }
}
```

Nếu chúng ta cố chạy thử đoạn code sau:

```
$areas = new AreaCalculator($shapes);
$volumes = new AreaCalculator($solidShapes);

$output = new SumCalculatorOutputter($areas);
$output2 = new SumCalculatorOutputter($volumes);
```

Chương trình của chúng ta sẽ chạy ngon lành, nhưng khi chúng ta gọi phương thức HTML trên đối tượng $output2, chúng ta gặp lỗi E_NOTICE thông báo cho chúng ta về lỗi chuyển đổi mảng sang string.

Để khắc phục điều này, thay vì trả về một mảng từ phương thức sum của class VolumeCalculator, ta chỉ cần:

```
public function sum() {
    // logic to calculate the volumes and then return and array of output
    return $summedData;
}
```

### Interface segregation principle (ISP)
ISP phát biểu:
> Một client không nên bao giờ bị buộc phải implement một giao diện mà nó không sử dụng hay phụ thuộc vào các phương pháp mà nó không sử dụng.

Vẫn sử dụng ví dụ về hình dạng, chúng ta biết rằng có tồn tại hình dạng rắn, mà hình dạng rắn thì cũng tồn tại cả tính chất là "thể tích", nên chúng ta có thể thêm một contract khác vào ShapeInterface như sau:

```
interface ShapeInterface {
    public function area();
    public function volume();
}
```

Bất kỳ hình dạng nào chúng ta tạo cũng sẽ phải implement phương thức volumn, nhưng chúng ta biết rằng hình vuông là hình 2D và chúng không có khối lượng, vì vậy giao diện này sẽ buộc class Square implement một phương thức mà nó không sử dụng.
ISP nói không với điều này, và thay vào đó ta có thể tạo một giao diện khác gọi là SolidShapeInterface có contract chứa tính chất "thể tích" và các hình dạng rắn, ví dụ là khối lập phương, có thể implement interface này:

```
interface ShapeInterface {
    public function area();
}

interface SolidShapeInterface {
    public function volume();
}

class Cuboid implements ShapeInterface, SolidShapeInterface {
    public function area() {
        // calculate the surface area of the cuboid
    }

    public function volume() {
        // calculate the volume of the cuboid
    }
}
```

Đây là một cách tiếp cận tốt hơn nhiều, nhưng ta sẽ phải đặc biệt cẩn thận khi type-hint các giao diện này thay vì sử dụng ShapeInterface hoặc SolidShapeInterface.
Ta có thể tạo một giao diện khác, có thể là ManageShapeInterface và implement nó trên cả hình phẳng và hình khối, bằng cách này ta có thể dễ dàng thấy rằng nó có một API duy nhất để quản lý các hình dạng. Ví dụ:

```
interface ManageShapeInterface {
    public function calculate();
}

class Square implements ShapeInterface, ManageShapeInterface {
    public function area() { /Do stuff here/ }

    public function calculate() {
        return $this->area();
    }
}

class Cuboid implements ShapeInterface, SolidShapeInterface, ManageShapeInterface {
    public function area() { /Do stuff here/ }
    public function volume() { /Do stuff here/ }

    public function calculate() {
        return $this->area() + $this->volume();
    }
}
```

Bây giờ trong class AreaCalculator, chúng ta có thể dễ dàng thay thế các lần gọi phương thức area bằng calculate và cũng kiểm tra xem đối tượng có phải là một instance của ManageShapeInterface chứ không phải là của ShapeInterface.

### Dependency Inversion principle (DIP)
Nguyên tắc cuối cùng nhưng cũng  không kém phần quan trọng, đó là DIP. DIP phát biểu:
> Các entities chỉ nên phụ thuộc vào những abstractions, không nên phụ thuộc vào các concretions hoặc implementations cụ thể. Ngoài ra, module level cao không được phụ thuộc vào module level thấp, nhưng nên phụ thuộc vào các abstractions.

Nghe có vẻ dài dòng văn tự, nhưng thực sự là rất dễ hiểu. Nguyên tắc này cho phép áp dụng decoupling. Ví dụ là cách tốt nhất để giải thích nguyên tắc này:

```
class PasswordReminder {
    private $dbConnection;

    public function __construct(MySQLConnection $dbConnection) {
        $this->dbConnection = $dbConnection;
    }
}
```

Đầu tiên, MySQLConnection là một low level module trong khi PasswordReminder là high level, nhưng theo định nghĩa của D trong S.O.L.I.D. phát biểu rằng "chỉ nên phụ thuộc vào những abstractions, không nên phụ thuộc vào các concretions", đoạn snippet trên đây vi phạm nguyên tắc này vì class PasswordReminder đang bị buộc phải phụ thuộc vào class MySQLConnection.

Sau này nếu bạn thay đổi database engine, bạn cũng sẽ phải chỉnh sửa class PasswordReminder và do đó vi phạm nguyên tắc OCP.

Class PasswordReminder không nên quan tâm ứng dụng của chúng ta sử dụng cơ sở dữ liệu nào. Để sửa lỗi này, chúng ta "code vào interface". Vì các module cấp cao và cấp thấp nên phụ thuộc vào abstraction, chúng ta có thể tạo ra một interface:

```
interface DBConnectionInterface {
    public function connect();
}
```

Interface có một phương thức connect và class MySQLConnection implement interface này, đồng thời, thay vì type-hint class MySQLConnection trực tiếp trong constructor của PasswordReminder, chúng ta type-hint interface . Bây giờ, cho dù ta dùng loại database gì đi chăng nữa,  class PasswordReminder có thể dễ dàng kết nối với cơ sở dữ liệu mà không có bất kỳ vấn đề nào và OCP sẽ không bị vi phạm.
 
```
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

Theo đoạn snippet ở trên, bây giờ ta có thể thấy rằng cả hai mô-đun cấp cao và cấp thấp đều phụ thuộc vào abstraction.

### Kết luận
Thật ra, S.O.L.I.D ban đầu có vẻ khá phiền, nhưng với việc sử dụng liên tục và tuân thủ các nguyên tắc của nó, bạn sẽ thấy quen và sẽ viết ra được những dòng code có tính mở rộng, thay đổi, kiểm thử và refactor.