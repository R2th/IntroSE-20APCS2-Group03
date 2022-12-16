# **OOP - Khái niệm về lập trình hướng đối tượng**
***Hướng đối tượng là gì?***
OOP - lập trình hướng đối tượng không chỉ sử dụng các cú pháp viết code mới mà nó làm bạn thay đổi cách nghĩ về một vấn đề bài toán đặt ra. Rất nhiều lập trình viên mắc lỗi khi ứng dụng một cách không thích hợp lý thuyết về lập trình hướng đối tượng. 

Một cách tương đối, bạn cần xác định các động từ, danh từ cần thiết cho ứng dụng. Dựa trên so sánh của hai tập hợp này mà chọn cho mình mô hình thiết kế ứng dụng sao cho phù hợp là dựa trên hướng đối tượng hay hướng thủ tục

***Một vài khái niệm cơ sở về OOP***
class và object
Hai khái niệm quan trọng nhất trong OOP là lớp(class) và đối tượng (object). Một lớp class là định nghĩa về đối sự việc tổng quát. Còn một đối tượng object là một triển khai cụ thể về điều được định nghĩa bởi class. Để lập trình theo OOP, bạn phải thiết kế ra các class và triển khai (ứng dụng) chúng để sinh ra các đối tượng cần thiết.

***Module hóa ứng dụng***
Một trong các triết lý của OOP đó là module hóa: chia ứng dụng ra thành nhiều phần nhỏ tách biệt. Ví dụ một website có rất nhiều thứ cần làm: tương tác với CSDL, gửi email, nhận lý dữ liệu gửi đến từ form, sinh mã HTML cho trang ... Thế thì mỗi thứ này, có thể phát triển riêng biệt gọi chúng là các module và nhiều khi chúng sẽ tương ứng với class. Bằng cách tách biết sự liên quan giữa các phần tử như vậy, giúp bạn phát triển, cập nhật, gỡ rối đơn giản hơn rất nhiều.

***Trừu tượng hóa abstract***
Trừu tượng trong OOP liên quan tới việc các lớp được định nghĩa rất chung - bao quát, điều khá khó hiểu với người mới. Ví dụ, thay vì thiết kế thẳng một lớp chuyên tương tác với CSDL MySQL, bạn lại thiết kế một lớp tương tác với không phải một CSDL cụ thể nào mà là chung thì lớp đó gọi là trừu tượng. Từ lớp chung đó, khi cần dùng riêng cho MySQL bạn sẽ quá tải các hàm, có thể định nghĩa thêm một số đặc tính đặc thù là có thể sử dụng với MySQL, tương tự với các loại CSDL cụ thể khác.

***Tính đóng gói***
Đóng gói cũng là một khái niệm cơ sở của OOP, có nghĩa là cách hoạt động sao cho có kết quả yêu cầu/cách thay đổi trạng thái của đối tượng sẽ không cần biết bởi đối tượng sử dụng. Có nghĩa nó là một hộp đen, không cần biết bên trong hoạt động ra sao mà chỉ quan tâm kết quả phản ứng của hộp đen đó với các yêu cầu.

Trên đây là các khái niệm rất cơ bản, chúng được làm rõ qua các ví dụ cụ thể.

***Tạo class (lớp)***
Để tạo ra một lớp bạn sử dụng từ khóa class tiếp theo là tên class, toàn bộ nội dung class định nghĩa trong cặp {}

```php
<?php
class MyClass
{
    // Các thuộc tính của lớp (dữ liệu)
    // Các phương thức - method của lớp (hàm) định nghĩa ở đây
}
?>
```
Sau khi có được định nghĩa lớp như vậy, việc tạo ra một đối tượng của lớp thì dùng toán tử new: $obj = new MyClass;, để xem nội dung class có thể dùng var_dump

Bạn ghi đoạn code sau vào file ví dụ test.php và chạy thử

```php
<?php
    class MyClass
    {
        
    }
    
    $obj = new MyClass;
    var_dump($obj);
?>
```
//Out: object(MyClass)
Các thuộc tính, phương thức là thành viên của lớp
Bên trong class có biến và hàm được gọi với tên là thuộc tính của lớp, phương thức của lớp. Toàn bộ tập hợp các thuộc tính và phương thức của lớp được gọi là thành viên (member) của lớp.

Các phương thức được định nghĩa, khai báo bên trong lóp giống như cách khai bảo một hàm bên ngoài thông thường, nó có thể trả về giá trị, nó có thể có tham số, tham số mặc định ...Ví dụ sau định nghĩa hàm functionName trong lớp.

```php
class ClassName {
  function functionName() {
    // Code của hàm ở đây.
  }
}
```
Lưu ý, với hàm trong lớp (phương thức) khi định nghĩa thì nó thường bắt đầu bằng các từ xác định phạm vi truy cập (visibility bạn sẽ tìm hiểu kỹ hơn ở phần kế thừa) với các từ khóa: public, private hoặc protected nếu khi định nghĩa hàm không chỉ ra một trong các từ khóa này thì phương thức đó được hiểu là public

Một thành viên lớp (method và thuộc tính), có các khả năng truy cập khi định nghĩa như sau:

public thành viên này có thể truy cập ở bất kỳ đâu
private chỉ có thể truy cập từ chính lớp định nghĩa ra thành viên
protected chỉ có thể truy cập từ chính lớp định nghĩa ra thành viên và các lớp kế thừa nó
Định nghĩa các thuộc tính (biến) của lớp giống với định nghĩa biến thông thường nhưng có kèm theo tiền tố là các từ khóa xác định phạm vi truy cập. Ví dụ sau định nghĩa lớp có thuộc tính và phương thức sử dụng các từ khóa định nghĩa phạm vi truy cập:

```php
<?php
class User
{
    public  $name = "User Name";
    private $age;
    private $info;

    public function setAge($name, $age)
    {
        $this->age = $age;
        $this->name = $name;
        $this->processInfomation();
    }
    protected function processInfomation()
    {
        return $this->info = $this->name.' is '.$this->age.' years old';
    }
}
?>
```
Truy cập thành viên với -> và thuộc tính $this
Khi bạn đã có một đối tượng tạo ra từ lớp (ví dụ $obj) thì để truy cập thành viên public của lớp sẽ dùng ký hiệu mũi tên ->. Ví dụ $obj->name; $obj->setAge() ...

Từ một thành viên hàm của lớp, bạn muốn truy cập tới thành viên hàm khác thì trong OOP với PHP sử dụng ký hiệu $this như là đối tượng, nó kết hợp với -> để tham khảo đến thành viên khác. Bạn ghi code sau vào file ví dụ test.php và chạy thử, để ý cách sử dụng ->; $this; protect ...

```php
<?php
class User
{
    public  $name = "User Name";
    private $age;
    private $info;

    public function setAge($name, $age)
    {
        $this->age = $age;
        $this->name = $name;
        $this->processInfomation();
    }
    protected function processInfomation()
    {
        return $this->info = $this->name.' is '.$this->age.' years old';
    }

    public function getInfo() {
        return $this->info;
    }
}

$user = new User();

$user->setAge("Nam", 20);
echo $user->getInfo();

?>
```
Hàm tạo
Hàm tạo là loại hàm đặc biệt trong lớp, sự khác biệt của nó với các hàm thông thường ở 3 điểm:

```php
<?
class bookdef {

    protected $price;
    protected $title;

    function __construct( $title, $price ){
        $this->price = $price;
        $this->title = $title;
    }

    public function getTitle()
    {
        return $this->title;
    }
}

$vatly = new bookdef("VAT LY LOP 10",20000);
$toan = new bookdef("TOAN 10",30000);

echo $vatly->getTitle();
echo $toan->getTitle(); 

?>
```
Tính kế thừa
Khi định nghĩa các lớp (lớp con) bạn có thể cho lớp đó kế thừa các đặc tính từ một lớp khác (gọi là lớp cha) bằng từ khóa extends.

```php
 class Child extends Parent { 
     //..
  }
```

Ví dụ tạo lớp cha Pet và lớp con Dog và Cat kế thừa từ Pet

```php
<?
class Pet {
    public $name;
    function __construct($pet_name) {
        $this->name = $pet_name;
    }
    function eat() {
        echo "<p>$this->name is eating.</p>";
        $this->play();
    }
    function sleep() {
        echo "<p>$this->name is sleeping.</p>";
    }
    function play() {
        echo "<p>$this->name is playing.</p>";
    }
}
```

```php
class Cat extends Pet {
    function play() {
        echo "<p>$this->name is climbing.</p>";
    }
}

class Dog extends Pet {
    function play() {
        echo "<p>$this->name is fetching.</p>";
    }
}

$dog = new Dog('Satchel');
$cat = new Cat('Bucky');
$pet = new Pet('Rob');

$dog->eat();
$cat->eat();
$pet->eat();

$dog->sleep();
$cat->sleep();
$pet->sleep();

$dog->play();
$cat->play();
$pet->play();

?>
```
undefined

Giao diện - Interface

Interface nó cung cấp tên các hàm chung để triển khai mã. Có thể nói interface (giao diện) là bộ khung mẫu để triển khai mã.

Để tạo ra interface cách tạo tương tự như class với keyword là interface và phần thân các phương thức không phải định nghĩa. Tất cả các phương thức trong interface là public

Ví dụ về tạo một interface

```php
<?php
    interface ILogger
    {
        public function log($message);
    }
?>
```
Như vậy bạn thấy interface chỉ có tên interface và tên các phương thức. Giờ một lớp triển khai mã theo giao diện này sẽ định nghĩa lớp với cách sử dụng từ khóa implements

```php
<?php
    class ClassName implements InterfaceName1, InterfaceName2 
    {
         
    }
?>
```
Khi lớp triển khai theo giao diện nào thì tất cả các hàm của giao diện đó lớp phải định nghĩa code đầy đủ. Ví dụ triển khai giao diện ILogger

```php
<?php  

class FileLogger implements ILogger{ 
	public function log($message){
		echo sprintf("Log %s to the file\n",$message);			 
	}
}


class DBLogger implements ILogger{
	public function log($message){
		echo sprintf("Log %s to the database\n",$message);
	}
}
```

Lớp trừu tượng

Phương thức trừu tượng(hàm) là hàm khai báo với từ khóa abstract, nó chỉ là tên phương thức không chứa mã triển khai. Hàm khai báo như sau:

    abstract public function abstractMethod();
Khi một lớp có ít nhất một hàm trừu tượng thì lớp đó được gọi là lớp trừu tượng và trong khai báo lớp cũng chỉ ra từ khóa abstract

```php
<?php
abstract class abstractClass{
    abstract public function abstractMethod();
    //.. các phương thức - thuộc tính khác
}
```

Lớp trừu tượng trong PHP được dùng như một lớp mẫu, không được sử dụng trực tiếp mà phải triển khai kế thừa lớp trừu tượng và định nghĩa lại các hàm trừu tượng.

Ví dụ về lớp trừu tượng:

```php    
<?php
abstract class Person{
    protected $firstName;
    protected $lastName;

    public function __construct($firstName,$lastName){
        $this->firstName = $firstName;
        $this->lastName  = $lastName;
    }

    public function __toString(){
        return sprintf("%s, %s",$this->lastName, $this->firstName);
    }

    abstract public function getSalary();
} 
?>
```

Với lớp trừu tượng Person trên nếu dùng khởi tạo trực tiếp lớp như sau sẽ lỗi:

    $p = new Person('John','Doe');

Để sử dụng đúng, cần kế thừa lớp trừu tượng và định nghĩa lại hàm trừu tượng cần thiết:

```php     
<?php
 
class Employee extends Person{
	private $salary;
 
	public function __construct($firstName,$lastName,$salary){
		parent::__construct($firstName, $lastName);
		$this->salary = $salary;
	}
 
	public function getSalary(){
		return $salary;
	}
 
}

 
$e = new Employee('John','Doe',5000);
echo $e;
```