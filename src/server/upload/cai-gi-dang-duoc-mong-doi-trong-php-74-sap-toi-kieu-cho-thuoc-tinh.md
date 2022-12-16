Theo như thông tin từ [Laravel News](https://laravel-news.com/php7-typed-properties), [Typed Properties 2.0 RFC](https://wiki.php.net/rfc/typed_properties_v2) tại thời điểm tháng 10/2018 đã được con dân sử dụng PHP bầu với tỉ lệ 70 phiếu thuận và 1 phiếu chống. Đây chắc chắn sẽ là 1 cập nhật mới bởi vì đây là 1 thay đổi lớn về ngôn ngữ và cần ít nhất 2/3 đa số đồng ý theo như luật định.

Và cái thay đổi đó sẽ cho cái kết quả ra như thế này: 
```php
class User {
    public int $id;
    public string $name;
 
    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }
}
```
Ơ mà trông cũng thân quen mà? Có cái thay đổi gì đâu? Thực ra thì trước khi thành như trên(PHP 7.4 ra mắt) thì đây là hiện tại
```php
class User {
    /** @var int $id */
    private $id;
    /** @var string $name */
    private $name;
 
    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }
 
    public function getId(): int {
        return $this->id;
    }
    public function setId(int $id): void {
        $this->id = $id;
    }
 
    public function getName(): string {
        return $this->name;
    }
    public function setName(string $name): void {
        $this->name = $name;
    }
}
```
So sánh 2 code chúng ta có thể thấy biến `$id` ở code trên đã được định nghĩa sẵn kiểu `int`, chỉ cần viết ngắn gọn. Còn code dưới thì `$id` chỉ là biến bất kì, và các code sau ta phải định nghĩa kiểu `int` cho nó mỗi lần gọi code.

Và ĐẶC BIỆT, viết kiểu trên vẫn sẽ đảm bảo toàn vẹn cho kiểu dữ liệu. Chả trách tại sao tỉ lệ đồng ý là 70/1. Đến mình còn muốn dơ hết các chân tay lên đồng ý cơ mà (dance4)
 
(Ơ mà khoan, tôi đang ở vũ trụ PHP mà. Sao bị bay màu sang vũ trụ Java thế? Tôi là ai? Đây là đâu =)) )(Đúng là cú pháp này hao hao Java thật)
 
Chúng ta sẽ cùng đến với mô tả từ RFC:

"Với các kiểu vô hướng và trả về, PHP đã có 1 sức mạnh đáng kể cho hệ thống kiểu dữ liệu sẵn có của PHP. Tuy nhiên, việc không thể khai báo kiểu cho các thuộc tính lớp đã và đang buộc các nhà phát triển dùng các phương thức get và set để thực thi việc đặt kiểu. Điều này đã và đang khiến quá nhiều thứ không cần thiết, làm việc sử dụng thiếu gọn nhẹ và hiệu suất cũng không cao. RFC này sẽ giải quyết vấn đề này bằng cách giới thiệu việc hỗ trợ việc khai báo kiểu thuộc tính cho các first-class"

Và đây là hỗ trợ về các kiểu ở trong bản PHP 7.4 được đề nghị sắp tới
```php
class Example {
    // All types with the exception of "void" and "callable" are supported
    public int $scalarType;
    protected ClassName $classType;
    private ?ClassName $nullableClassType;
 
    // Types are also legal on static properties
    public static iterable $staticProp;
 
    // Types can also be used with the "var" notation
    var bool $flag;
 
    // Typed properties may have default values (more below)
    public string $str = "foo";
    public ?string $nullableStr = null;
 
    // The type applies to all properties in one declaration
    public float $x, $y;
    // equivalent to:
    public float $x;
    public float $y;
}
```
Ồ và ở đây chúng ta không bàn tới kiểu callable và kiểu void.

Lý do được giải thích như sau:

"Loại void không được hỗ trợ, bởi vì nó không hữu ích và có ngữ nghĩa không rõ ràng. Theo một cách giải thích cứng, các thuộc tính của kiểu void có thể không được đọc và cũng không được ghi vào, vì không có cách nào để xây dựng một giá trị của kiểu void trong PHP. Theo một giải thích linh hoạt hơn (phù hợp với thực tế là chúng ta cho phép sử dụng các giá trị trả về của các hàm void) một thuộc tính của loại void chỉ có thể giữ giá trị null. Theo như 2 cách giải thích trên, chúng ta không cần các thuộc tính void. Điều này phù hợp với chú thích loại tham số.
"

Còn với kiểu callable thì cú pháp sẽ hơi kì dị 1 tẹo
```php
class Test {
    public callable $cb;
 
    public function __construct() {
        // $this->cb is callable here
        $this->cb = [$this, 'method'];
    }
 
    private function method() {}
}
 
$obj = new Test;
// $obj->cb is NOT callable here
($obj->cb)();
```
Hiện tại đó là thay đổi có thể sẽ đến với PHP 7.4. Các bạn có thể đọc kỹ hơn lại link Laravel News và wiki của PHP mình đã đưa ra bên trên. Cảm ơn các bạn đã đọc bài viết