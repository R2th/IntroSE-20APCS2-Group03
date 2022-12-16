### 1) Nội dung cơ bản:

A. Interface:

* Cú pháp:

Khi sử dụng, từ khóa **interface** được khai báo. 

Các Class con muốn sử dụng được cần có từ khóa **implements**.
```php 
<?php
interface InterfaceName {
  public function name1();
  public function name2($name, $color);
  public function name3() : string;
}
class Name implement InterfaceName {
  public function name1(){
      //code//
  }
}
?>
```
* Định nghĩa:

Cho phép chỉ định một lớp nên triển khai.

Nhiều class sử dụng chung cùng interface, gọi là đa hình.

B.Abstract:

* Cú pháp:
```php
<?php
abstract class ParentClass {
  abstract public function someMethod1();
  abstract public function someMethod2();
  abstract public function someMethod3();
}
?>
```
Từ khóa abstract được sử dụng trước class.

Class con kế thừa bằng extends

Khi một lớp con được kế thừa từ một lớp trừu tượng, chúng ta có các quy tắc sau:

+ Phương thức lớp con phải được định nghĩa với cùng tên và nó khai báo lại phương thức trừu tượng mẹ

+ Phương thức lớp con phải được xác định với công cụ sửa đổi quyền truy cập giống hoặc ít bị hạn chế hơn

+ Số lượng đối số bắt buộc phải giống nhau. Tuy nhiên, lớp con có thể có thêm các đối số tùy chọn 

### 2) Ví dụ:
A. Abstract:
```php
<?php 
    abstract class Info
{
    public $name;
    public $age;
    abstract public function __construct($name, $age);
    abstract public function getInfo();
}

class A extends Info
{
    public function __construct($name, $age)
    {
        $this->name = $name;
        $this->age  = $age;
    }
    public function getInfo()
    {
        return $this->name . '-' . $this->age;
    }
}

$a = new A('hi', 18);
echo $a->getInfo();
?>
```

B. Interface
```php
<?php
 interface Height {
	public function __construct($height);
}

interface Height1 {
	public function getHeight();
}

class B implements Height, Height1 {
	public function __construct($height) {
		$this->height = $height;
	} 
	public function getHeight() {
		return $this->height;
	}
}

$b = new B(175);
echo $b->getHeight();

?>
```
Trong ví dụ này, có thể thấy được rằng 1 class implements từ nhiều interface. Khá thú vị phải không :)

### 3) Kết luận 
Có thể hiểu nôm na rằng, 2 phương thức này dùng để tạo khung sườn cho project của chủng ta. Giúp ta làm việc nhanh chóng.

1 vài tài liệu tham khảo:

https://www.w3schools.com/php/php_oop_classes_abstract.asp
https://www.php.net/manual/en/function.interface-exist

Cảm ơn mọi người đã đọc bài :)