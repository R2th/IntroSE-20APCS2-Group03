Các **magic method** là các phương method có tên đặc biệt, bắt đầu bằng __, biểu thị các method sẽ được kích hoạt để đáp ứng với các event trong các class PHP.

Chúng ta sẽ bắt gặp rất nhiều các magic method đặc biệt khi tiếp xúc với các framework và các thư viện package. Chúng ta sẽ cùng tìm hiểu một vài magic methods thông dụng mà hay bắt gặp.
# 1. __construct
```
class Developer {
  private $name;
  private $gender;
  
  public function __construct($name = '', $gender = 'female') {
    $this->name = $name;
    $this->gender = $gender;
  }
}
```
Methods __construct sẽ tự động được kích hoạt mỗi khi chúng ta khởi tạo một instance của class Developer.
```
$developer = new Developer();
var_dump($developer->gender); // female
```
Một vài lưu ý:
> Chúng ta không thể gọi một cách trực tiếp ```$developer->__construct();```

> Mặc định lớp con khi kế thừa (inherit) lớp cha thì sẽ được tự động kế thừa construct của lớp cha nếu tại lớp con không khai báo hàm __construct() còn nếu tại lớp con có khai báo __construct() thì phải sử dụng parent::__construct();

# 2. __destruct
```
class Developer {
  private $name;
  private $gender;
  
  public function __construct($name = '', $gender = 'female') {
    $this->name = $name;
    $this->gender = $gender;
  }

  public function __destruct() {
    return 'Đừng quên tên anh em nhé';
  }
}
```
Tương tự hàm __construct nhưng hàm __destruct sẽ được kích hoạt khi chúng ta muốn xóa bỏ instance của class đó đi.

Một vài lưu ý:
> Tương tự __construct chúng ta không thể gọi một cách trực tiếp ```$developer->__destruct();```

> Tương tự __construct khi inherit (kế thừa) chúng ta cũng phải sử dụng parent::__construct();

# 3. __get && __set
__get và __set là 2 magic methods cực kì thông dung, nó giúp các đoạn code khi khai báo get và set cổ điện được gọn lại một cách bất ngờ.

Nếu không sử dụng __get và __set thì với mỗi attribute chúng ta lại phải khai báo 1 hàm set và 1 get như vậy code sẽ rất cồng kềnh.
```
class Developer {
    private $name;
    private $gender;

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getGender() {
        return $this->gender;
    }

    public function setGender($gender) {
        $this->gender = $gender;
    }

}

$developer = new Developer();

$developer->setName('Dao Anh Dung');
$developer->setGender('female');

echo $developer->getName(); // Dao Anh Dung
echo $developer->getGender(); // female

```
Tối giản bằng __get và __set:
```
class Developer {
    private $name;
    private $gender;

    public function __get($property) {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }

    public function __set($property, $value) {
        if (property_exists($this, $property)) {
            $this->$property = $value;
        }
    }
}

$developer = new Developer();

$developer->name = 'Nguyen Ba Long';
$developer->gender = 'female';

echo $developer->name; // Nguyen Ba Long
echo $developer->gender; // female
```
# 4. __clone
Sử dụng clone để nhân bản và tạo một bản sao của một đối tượng thay vì có hai biến trỏ đến cùng một instande.
Chúng ta cùng thử xem xét ví dụ sau:
```
//Không sử dụng clone

$developer = new Developer();
$developer->setName('Dao Anh Dung');

echo $developer->getName();  // Dao Anh Dung

$brse = $developer;
$brse->setName('Ba Long');

echo $brse->getName(); // Ba Long
echo $developer->getName(); // Ba Long

// Sử dụng clone
$developer = new Developer();
$developer->setName('Dao Anh Dung');

echo $developer->getName();  // Dao Anh Dung

$brse = (clone) $developer;
$brse->setName('Ba Long');

echo $brse->getName(); // Ba Long
echo $developer->getName(); // Dao Anh Dung
```

```
Caution
PHP reserves all function names starting with __ as magical. It is recommended that you do not use function names with __ in PHP unless you want some documented magic functionality.
```
> Việc quá lạm dụng magic methods có thể dẫn tới khó sửa lỗi và cảm thấy khó control.
> Tùy vào cảm nhận của mỗi người, có những người rất thích việc sử dụng nó và cũng có những người hạn chế khi sử dụng.
> Nếu không sử dụng ma thuật đúng cách chúng ta có thể tạo ra những quả bug mà không thể fix nổi =]]