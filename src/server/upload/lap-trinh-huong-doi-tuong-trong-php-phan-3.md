Xin chào mọi người, đây sẽ là bài viết cuối cùng trong các bài viết về Lập trình hướng đối tượng trong PHP. Ở 2 phần trước mình đã nói tổng quan về lập trình hướng đối tượng trong PHP. Bài viết này mình sẽ nói đến chuẩn PSR và SOLID. Đây là những chuẩn về coding convention trong lập trình PHP. Mong rằng mọi người có thể hiểu và áp dụng chúng vào những dòng code của mình.
# PSR - PHP Standard Recommendation
PSR là 1 đặc tả PHP được xuất bản bởi PHP Framework Interop Group. Nó đưa ra các tiêu chuẩn để chuẩn hóa các khái niệm trong lập trình PHP. Tiêu chuẩn này được các lập trình viên, tổ chức chấp nhận sử dụng.
## Lý do bạn nên viết code theo chuẩn PSR:
1. Là tiêu chuẩn được áp dụng vào các dự án lớn hoặc framework PHP
2. Việc viết code chuẩn giúp không chỉ có bạn mà người đọc code, hay người sẽ tiếp tục tham gia vào dự án, bảo trì có thể hiểu code hơn
3.  Có sự thống nhất trong cách thức viết code, tổ chức các class...
4.  Dễ dàng trong đọc, hiểu code
## PSR-2: Coding Style Guide
Tiêu chuẩn này thừa kế và mở rộng của tiêu chuẩn PSR-1. Tiêu chuẩn này là về 1 số quy tắc cú pháp trong code.
* Code PHẢI tuân thủ PSR-1
* Code PHẢI sử dụng 4 khoảng trắng thay vì tab để lùi vào
* Không có giới hạn cứng về độ dài của dòng, giới hạn mềm PHẢI là 120 ký tự, dòng NÊN có 80 ký tự trở xuống
* PHẢI có 1 dòng trống sau khai báo `namespace`, và PHẢI có 1 dòng trống sau khổi khai báo `use`
* Ký tự `{` mở 1 class PHẢI ở dòng tiếp theo và `}` đóng class PHẢI ở dòng tiếp theo sau phần nội dung class
* Ký tự `{` cho phương thức PHẢI ở dòng tiếp theo và `}` PHẢI ở dòng tiếp theo sau phần nội dung
* Các **visibility** PHẢI được khai báo trên tất cả các thuộc tính và phương thức. `abstract` và `final` phải được khai báo trước **visibility**, `static` PHẢI được khai báo sau **visibility**
*  Các từ khóa của cấu trúc điểu khiển PHẢI có 1 khoảng trắng sau chúng, việc gọi phương thức và hàm thì không phải
*  Ký tự `{` của các cấu trúc điều khiển PHẢI ở cùng hàng và ký tự `}` PHẢI ở hàng tiếp theo sau phần nội dung
*  Ký tự `(` cho các cấu trúc điểu khiển KHÔNG PHẢI có khoảng trắng sau chúng, và ký tự `)` KHÔNG PHẢI có khoảng trắng trước nó
## PSR-0 và PSR-4: Autoloading Standard
### PSR-0
Tiêu chuẩn này đã không còn được chấp nhận từ 21/10/2014 và được chấp nhận thay thế bằng chuẩn PSR-4.
* Điều kiện đủ của namespace và class phải có cấu trúc như sau: `\<Vendor Name>\(<Namespace>\)*<Class Name>`
* Mỗi namspace bắt buộ phải có namspace của cấp cao nhất (“Vendor Name”)
* Mỗi namspace có thể có nhiều namespace con
* Mỗi dấu phân cách namespace được chuyển đổi thành **DIRECTORY_SEPARATOR** khi tải từ hệ thống tập tin
* Mỗi ký tự **_** trong tên class được chuyển đổi thành **DIRECTORY_SEPARATOR**. Ký tự **_** không có ý nghĩa đặc biệt trong namespace
* Một namespace và class tiêu chuẩn cần có hậu tố **.php** khi tải từ hệ thống tập tin
* Tên trong Vendor name, namespace, class có thể là tổ hợp của ký tự thường và ký tự hoa
### PSR-4
Tiêu chuẩn PSR-4 mô tả các đặc điểm kỹ thuật cho việc tự động tải các class từ đường dẫn tập tin. Nó hoàn toàn tương thích và có thể được sử dụng ngoài bất kỳ mục nào khác của đặc tả tự động tải, bao gồm PSR-0. PSR này cũng mô tả nơi để đặt các tệp sẽ được tự động tri theo đặc điểm kỹ thuật.
* Thuật ngữ *"class"* đề cập đến các class, interface, trait và các loại cấu trúc tương tự khác
* Tên class tiêu chuẩn theo mẫu: `\<NamespaceName>(\<SubNamespaceNames>)*\<ClassName>`

    * Tên class tiêu chuẩn PHẢI có namspace cấp cao nhất, có thể hiểu là **vendor namespace**
    * Tên class tiêu chuẩn CÓ THỂ có 1 hoặc nhiều namespace con
    * Tên class tiêu chuẩn PHẢI có 1 tên class kết thúc
    * Dấu gạch dưới không có ý nghĩa đặc biệt trong bất kỳ phần nào của tên class tiêu chuẩn
    * Ký tự trong tên class tiêu chuẩn CÓ THỂ kết hợp của ký tự thường và ký tự hoa
    * Tất cả các tên class PHẢI được tham chiếu trong trường hợp phù hợp
* Khi tải 1 tệp tương ứng với tên đẩy đủ của class
     * 1 chuỗi liên tiếp của 1 hoặc nhiều namespace dẫn đầu và namespace con, không bao gồm dấu phân tách namespace dẫn đầu, trong tên lớp đạt đầy đủ điều kiện tương ứng với ít nhất 1 "thư mục cơ sở"
     * Các namespace con liền kề sau "namespace prefix" tương ứng với thư mục con trong "thư mục cơ sở", trong đó bộ phân tách namespace đại diện cho thư mục phân tách. Tên thư mục con PHẢI khớp với trường hợp của các namespace phụ
     * Tên lớp kết thúc tương ứng với tên tệp kết thúc bằng `.php`
* Việc triển khai trình tự động tải KHÔNG ĐƯỢC ném (throw) các ngoại lệ, KHÔNG ĐƯỢC sinh thêm lỗi ở bất kỳ cấp độ nào và KHÔNG NÊN trả về giá trị
# Nguyên tắc thiết kế hướng đối tượng S.O.L.I.D
S.O.L.I.D là 1 từ viết tắt cho 5 nguyên tắc thiết kế hướng đối tượng đầu tiên (OOD) của Robert C. Martin. Những nguyên tắc này khi kết hợp với nhau giúp cho người lập trình dễ dàng phát triển phần mềm cũng như dễ cho việc bảo trì và mở rộng.

Vì mình cũng mới tìm hiểu phẩn này nên kiến thức có thể không chắc chắn ở 1 số phần. Nội dung sau đây mình lấy từ [đây](https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#single-responsibility-principle). Các bạn có thể tham khảo kỹ hơn.

## S - Single reponsibity principle: Nguyên tắc đơn nhiệm
> 1 lớp nên có 1 và chỉ 1 lý do để thay đổi, có nghĩa là 1 lớp chỉ nên có 1 công việc.

Ví dụ, chúng ta có 1 vài hình và cần tính tổng diện tích các hình.
```php
class Circle {
    public $radius;

    public function __construct($radius)
    {
        $this->radius = $radius;
    }
}

class Square {
    public $length;

    public function __construct($length)
    {
        $this->length = $length;
    }
}
```
Đầu tiên, chúng ta tạo các class hình và có các `constructor` thiết lập các thông số cần thiết. Tiếp theo, chúng ta tạo class `AreaCalculator` và viết logic để tính tổng diện tích các hình.
```php
class AreaCalculator {

    protected $shapes;

    public function __construct($shapes = array())
    {
        $this->shapes = $shapes;
    }

    public function sum()
    {
        // logic to sum the areas
    }

    public function output()
    {
        return implode('', array(
            "",
                "Sum of the areas of provided shapes: ",
                $this->sum(),
            ""
        ));
    }
}
```
Để sử dụng lớp AreaCalculator, chúng ta chỉ đơn giản là khởi tạo lớp và truyền vào 1 mảng các hình và hiển thị đầu ra.
```php
$shapes = array(
    new Circle(2),
    new Square(5),
    new Square(6)
);

$areas = new AreaCalculator($shapes);

echo $areas->output();
```
Vấn đề với phương thức `output` là lớp AreaCalculator xử lý logic để xuất dữ liệu. Vì vậy, nếu người dùng muốn xuất dữ liệu như JSON hay 1 dạng gì khác thì sao?

Tất cả các logic đó sẽ được xử lý bởi lớp Tất cả các logic đó sẽ được xử lý bởi lớp AreaCalculator, đây là không phù hợp với nguyên tắc đơn nhiệm. Lớp AreaCalculator nên chỉ tính tổng diện tích được cung cấp bởi các hình. Nó không nên quan tâm đến việc người dùng muốn trả về JSON hay HTML.

Vì vậy để giải quyết vấn đề chúng ta có thể taọ lớp SumCalculatorOutputter và sử dụng nó để giải quyết bất kỳ vấn để gì về logic mà bạn bạn cần để xử lý cách tính tổng diện tích của tất cả các hình được cung cấp.

Lớp SumCalculatorOutputter sẽ làm việc như sau:
```php
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
## O - Open - closed principle: Nguyên tắc mở - đóng
> Các đối tượng hoặc thực thể nên được mở để mở rộng, nhưng đóng để sửa đổi.

Điều này đơn giản có nghĩa là 1 lớp nên dễ dàng để được mở rộng mà không sửa đổi chính lớp đó. Chúng ta xem xét phương thức `sum` của lớp AreaCalculator.
```php
public function sum()
{
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
Nếu chúng ta muốn phương thức `sum` có thể tính tổng diện tích của 1 vài hình nữa thì chúng ta cần thêm các khối `if/else` và nó đi ngược lại nguyên tắc đóng - mở.

1 cách mà chúng ta có thể làm cho phương thức `sum` tốt hơn là loại bỏ phần logic tính diện tích của mỗi hình ra khỏi phương thức `sum` và đính kém nó vào lơp của hình.
```php
class Square {
    public $length;

    public function __construct($length)
    {
        $this->length = $length;
    }

    public function area()
    {
        return pow($this->length, 2);
    }
} 
```
Bây giờ, để tính tổng của bất kỳ hình nào chúng ta có thể đơn giản phương thức `sum` như sau:
```php
public function sum()
{
    foreach($this->shapes as $shape) {
        $area[] = $shape->area();
    }

    return array_sum($area);
}
```
Bây giờ, chúng ta có thể tạo 1 lớp đại diện cho hình khác và chuyển nó vào khi tính tổng mà không ảnh hưởng đến code. Tuy nhiên, bây giờ có 1 vấn đề khác nảy sinh, làm thế nào mà chúng ta biết rằng đối tượng được truyền vào trong AreaCalculator thực sự là 1 hình hoặc nếu hình có 1 phương thức tên là `area`?

Việc sử dụng `interface` là 1 phần không thể thiếu của S.O.L.I.D, chúng ta tạo 1 `interface` để mọi hình có thể `implements`:
```php
interface ShapeInterface
{
    public function area();
}

class Circle implements ShapeInterface
{
    public $radius;

    public function __construct($radius)
    {
        $this->radius = $radius;
    }

    public function area() 
    {
        return pi() * pow($this->radius, 2);
    }
} 
```
Phương thức `sum` của `AreaCalculator` có thể kiểm tra xem các hình được cung cấp có thực sự là trường hợp của `ShapeInterface` hay không, nếu không thì chúng ta có thể ném 1 ngoại lệ:
```php
public function sum() 
{
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
## L: Liskov substitution principle - Nguyên tắc thay thế Liskov
> Gọi `q(x)` là 1 thuộc tính có thể chứng minh được về các đối tượng của x của kiểu T. Sau đó, `q(y)` phải được chứng minh cho các đối tượng y kiểu S, trong đó S là 1 kiểu con của T.

Tất cả những điểu trên có nghĩa là tất cả các lơp con / lớp dẫn xuất nên được thay thế cho các lớp cơ sở / lớp cha của chúng.

Vẫn với việc sử dụng lớp `AreaCalculator`, chúng ta có 1 lớp `VolumeCalculator` thừa kế lớp `AreaCalculator`:
```php
class VolumeCalculator extends AreaCalulator 
{
    public function __construct($shapes = array()) 
    {
        parent::__construct($shapes);
    }

    public function sum() 
    {
        // logic to calculate the volumes and then return and array of output
        return array($summedData);
    }
}
```
Lớp `SumCalculatorOutputter`:
```php
class SumCalculatorOutputter 
{
    protected $calculator;

    public function __constructor(AreaCalculator $calculator) 
    {
        $this->calculator = $calculator;
    }

    public function JSON() 
    {
        $data = array(
            'sum' => $this->calculator->sum();
        );

        return json_encode($data);
    }

    public function HTML() 
    {
        return implode('', array(
            '',
                'Sum of the areas of provided shapes: ',
                $this->calculator->sum(),
            ''
        ));
    }
}
```
Nếu chúng ta thử chạy ví dụ trên như sau:
```php
$areas = new AreaCalculator($shapes);
$volumes = new AreaCalculator($solidShapes);

$output = new SumCalculatorOutputter($areas);
$output2 = new SumCalculatorOutputter($volumes);
```
Khi chúng ta gọi phương thức `HTML` trên đối tượng `\$output2` thì sẽ trả về lỗi E_NOTICE thông báo chuyển đổi mảng sang chuỗi.

Để giải quyết nó, thay vì trả về mảng từ phương thức `sum` của lớp `VolumeCalculator`, bạn nên đơn giản nó:
```php
public function sum()
{
    // logic to calculate the volumes and then return and array of output
    return $summedData;
}
```
## I: Interface segregation principle - Nguyên tắc giao diện phân biệt
> 1 khách hàng không bao giờ bị buộc phải `implements` 1 `interface` mà nó không sử dụng hoắc các khách hàng không nên bị phụ thuộc vào các phương thức mà họ không sử dụng.
 
Vẫn với ví dụ trên, chúng ta biết rằng chúng ta cũng có hình dạng rắn nên chúng ta có thể muốn tính toán khối lượng của hình khối, chúng ta có thể thêm 1 "hợp đồng - contract" vào `ShapeInterface`:
```php
interface ShapeInterface 
{
    public function area();
    public function volume();
}
```
Bất kỳ hình nào chúng ta tạo bắt buộc phải `implements` phương thức `volume`, nhưng chúng ta biết rằng hình vuông là hình phẳng và không có khối lượng, vì vậy `interface` này sẽ bắt buộc lớp `Square` thực hiện 1 phương thức mà nó không sử dụng.

Nguyên tắc này không cho phép thực hiện như vậy, thay vào đó bạn có thể tạo 1 giao diện khác gọi là `SolidShapeInterface` có hợp đồng là `volume` và các hình dạng rắn như hình khối có thể triển khai giao diện này:
```php
interface ShapeInterface
{
    public function area();
}

interface SolidShapeInterface 
{
    public function volume();
}

class Cuboid implements ShapeInterface, SolidShapeInterface 
{
    public function area() 
    {
        // calculate the surface area of the cuboid
    }

    public function volume() 
    {
        // calculate the volume of the cuboid
    }
}
```
Đây là 1 cách giải quyết tương đối tốt, nhưng đáng buồn là để xem khi loại gợi ý các giao diện này, thay vì sử dụng 1 `ShapeInterface` hoặc 1 `SolidShapeInterface`.

Bạn có thể tạo 1 giao diện khác, ví dụ là `ManageShapeInterface` và `implements` nó trong cả các lớp hình phẳng và hình khối rắn. Đây là cách mà bạn có thể dễ dàng thấy rằng nó có 1 API duy nhất để quản lý các hình.
```php
interface ManageShapeInterface
{
    public function calculate();
}

class Square implements ShapeInterface, ManageShapeInterface 
{
    public function area() 
    { 
        /*Do stuff here*/ 
    }

    public function calculate() 
    {
        return $this->area();
    }
}

class Cuboid implements ShapeInterface, SolidShapeInterface, ManageShapeInterface 
{
    public function area() 
    { 
        /*Do stuff here*/ 
    }
    public function volume() 
    { 
        /*Do stuff here*/ 
    }

    public function calculate() 
    {
        return $this->area() + $this->volume();
    }
}
```
Bây giờ, trong lớp `AreaCalculator`, chúng ta có thể dễ dàng thay thế việc gọi đến phương thức `area` với `calculate` và cũng kiểm tra nếu đối tượng là 1 thể hiện của `ManageShapeInterface` và không phải là `ShapeInterface`.
## D: Dependency inversion principle - Nguyên tắc nghịch đảo phụ thuộc
> Các thực thể phải phụ thuộc vào sự trừu tượng hóa không phải là các concretion. Nó nói rằng mô-đun mức cao không được phụ thuộc vào mô-đun mức thấp, nhưng chúng phải phụ thuộc vào sự trừu tượng hóa.

Điều này có vẻ cồng kềnh, nhưng nó thực sự rất dễ hiểu. Nguyên tắc này cho phép tách rời.
```php
class PasswordReminder 
{
    private $dbConnection;

    public function __construct(MySQLConnection $dbConnection) 
    {
        $this->dbConnection = $dbConnection;
    }
}
```
Đầu tiên, `MySQLConnection` là mô-đun cấp thấp trong khi `PasswordReminder` là mô-đun cấp cao, nhưng theo định nghĩa của **D** trong S.O.L.I.D nói rằng phụ thuộc vào trừu tượng hóa không trên concretion, đoạn mã trên vi phạm nguyên tắc này đối với lớp `PasswordReminder` bị buộc phụ thuộc vào lớp `MySQLConnection`.

Sau này, nếu bạn muốn thay đổi cơ sở dữ liệu, bạn cũng sẽ phải chỉnh sửa lớp `PasswordReminder` và vi phạm nguyên tắc **O**.

Lớp `PasswordReminder` không nên quan tâm đến cơ sở dữ liệu mà ứng dụng đang sử dụng, để giải quyết vấn đề chúng ta "code vào 1 giao diện", vì các mô-đun mức cap và mức thấp nên phụ thuộc vào sự trừu tượng, chúng ta có thể tạo ra 1 giao diện như sau:
```php
interface DBConnectionInterface
{
    public function connect();
} 
```
Giao diện này có phương thức `connect` và lớp `MySQLConnection` thực thi giao diện này. Cũng thay vì trực tiếp lớp `MySQLConnection` trong `constructor` của `PasswordReminder`. Thay vào đó, chúng ta gợi ý giao diện và bất kể loại cơ sở dữ liệu nào mà ứng dụng của bạn đang sử dụng, lớp `PasswordReminder` có thể dễ dàng kết nối đến cơ sở dữ liệu mà không gặp bất kỳ vấn đề nào và nguyên lý **O** không bị vi phạm.
```php
class MySQLConnection implements DBConnectionInterface 
{
    public function connect() 
    {
        return "Database connection";
    }
}

class PasswordReminder 
{
    private $dbConnection;

    public function __construct(DBConnectionInterface $dbConnection) 
    {
        $this->dbConnection = $dbConnection;
    }
}  
```
Thông qua đoạn mã ở trên, bây giờ bạn có thể thấy rằng cả mô-đun cấp cao và cấp thấp để phụ thuộc vào sự trừu tượng.
# Kết luận
Phần cuối này, bản thân mình tìm hiểu về nguyên tắc SOLID cũng đang vẫn tương đối mơ hồ. Mong rằng, chúng ta có thêm nhiều thời gian để cọ xát với các dự án thực tế để nắm bắt cũng như hiểu rõ thêm. Mình cũng xin cảm ơn nếu bạn nào cũng có lỡ đọc cả 3 bài về Lập trình hướng đối tượng trong PHP của mình. Bài viết còn tương đối thiếu sót do kiến thức của bản thân. Mong rằng những góp ý của các bạn giúp mình có thể tiến bộ hơn (bowbowbow).
# Tham khảo
* https://www.php-fig.org/psr/
* https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design