### Magic methods là gì.?
Magic methods là các phương thức đặc biệt được tạo ra nhằm giải quyết các vấn đề về sự kiện trong chương trình (cụ thể là với class), và đối với PHP cũng thế.Phương thức magic là những phương thức được đặt tên với kí tự đặc biệt, bắt đầu với dấu 2 gạch dưới.

### Ưu nhược điểm của magic methods. 
- Bất kì một cái gì đó đều có ưu và nhược điểm cả (không có gì là hoàn hảo).

**Ưu điểm**
- Từ khái niệm trên thì các bạn chắc cũng có thể nhận ra các ưu điểm của nó rồi chứ? nó gồm có các ưu điểm như sau:
Giúp cho chúng ta tùy biến được các hành vi.
Nó giúp cho chúng ta có thể khởi tạo một đối tượng theo cách mình muốn.

**Nhược điểm**
Một magic methods có tốc độ chậm hơn các phương thức bình thường.

### Một số magic method hay sử dụng trong PHP
- Trong PHP có hỗ trợ chúng ta magic method với từng chức năng khác nhau:
* construct(): gọi khi khởi tạo đối tượng.
* destruct(): gọi khi hủy đối tượng.
* set(): gọi khi ta truyền dữ liệu cho một thuộc tính không được phép truy cập.
* get(): khi đọc dữ liệu từ một thuộc tính không được phép truy cập.
* isset(): được gọi khi gọi hàm isset() hoặc empty() trên một thuộc tính không được phép truy cập.
* unset(): được gọi khi hàm unset() được sử dụng trong một thuộc tính không được phép truy cập.
* call():được gọi khi ta gọi một phương thức không được phép truy cập trong phạm vi của một đối tượng.
*  callstatic(): được kích hoạt khi ta gọi một phương thức không được phép truy cập trong phạm vi của một phương thức tĩnh.
*  toString(): phương thức này giúp class chỉ định xem sẽ in ra cái gì khi nó được dùng.
 
**1. Construct và Destruct**

Trong PHP, Magic Method phổ biến nhất chính là construct() method. Hàm construct(), cho phép người dùng khởi tạo các thuộc tính của một đối tượng khi tạo đối tượng.. Hàm khởi tạo có thẻ có tham số hoặc không có tham số, có thể có giá trị trả về hoặc không. Ở một hàm bình thường khác bạn cũng có thể gọi lại hàm khởi tạo được và hàm khởi tạo cũng có thể gọi một hàm bình thường khác. 
Ví dụ: 
```
<?php
    class Person
    {                                                                     
            public $name;       
            public $age;       
            public $sex;       
                                                                                     
        public function __construct($name="", $sex="Male", $age=22)
        {     
            $this->name = $name;
            $this->sex = $sex;
            $this->age = $age;
        }

        public function say()
        {
            echo "Name：" . $this->name . ",Sex：" . $this->sex . ",Age：" . $this->age;
        }   

    }
```

Khởi tạo object không tham số
```
$Person1 = new Person();
echo $Person1->say(); //print:Name：,Sex：Male,Age：22
```
Khởi tạo object có tham số
```
$Person2 = new Person("Jams");
echo $Person2->say(); // print: Name: Jams, Sex: Male, Age: 22
```
 
 Ngược lại với hàm contruct là hàm destruct. Một trình hủy được gọi khi đối tượng bị hủy hoặc tập lệnh bị dừng hoặc thoát. Khi gọi hàm destruct(), PHP tự động gọi hàm này ở cuối tập lệnh.
 Ví dụ: 
 
```
<?php
class Person{     

    public $name;         
    public $age;         
    public $sex;         

    public function __construct($name="", $sex="Male", $age=22)
    {   
        $this->name = $name;
        $this->sex  = $sex;
        $this->age  = $age;
    }

    public function say()
    {
        echo "Name：".$this->name.",Sex：".$this->sex.",Age：".$this->age;
    }   
    public function __destruct()
    {
            echo "Well, my name is ".$this->name;
    }
}

$Person = new Person("John");
unset($Person); 
```

Kết quả sẽ là 
```
Well, my name is John
```

**2. Phương thức call() **

Phương thức call() sẽ được gọi khi bạn gọi đến một phương thức (không phải static) chưa được định nghĩa trong lớp của đối tượng
```
function __call(string $function_name, array $arguments)
{
    // method body
}
```
Có hai tham số truyền vào như sau
$function_name là tên của phương thức đang gọi
$arguments là danh sách các tham số truyền vào của phương thức đó

Ví dụ:

```
<?php
class Person
{                             
    function say()
    {
           echo "Hello, world!<br>";
    }     

    function __call($funName, $arguments)
    {
          echo "The function you called：" . $funName . "(parameter：" ; 
          print_r($arguments); // Print the parameter list of the method that is not existed.
          echo ")does not exist!！<br>\n";                   
    }                                         
}
$Person = new Person();           
$Person->run("teacher");
$Person->eat("John", "apple");             
$Person->say();
```

Kết quả: 

```
The function you called: run (parameter: Array([0] => teacher)) does not exist!
The function you called: eat (parameter: Array([0] => John[1] => apple)) does not exist!
Hello world!
```

**3. callstatic():**
- Giống với phương thức call, nhưng chỉ khác là phương thức này dùng cho trường hợp bạn gọi các phương thức static

Ví dụ :

```
<?php
class Person
{
    function say()
    {
        echo "Hello, world!<br>";
    }

    public static function __callStatic($funName, $arguments)
    {
        echo "The static method you called：" . $funName . "(parameter：" ;
        print_r($arguments); // Print the parameter list of the method that is not existed.
        echo ")does not exist！<br>\n";
    }
}
$Person = new Person();
$Person::run("teacher"); 
$Person::eat("John", "apple");
$Person->say();
```

Kết quả: 

```
The static method you called: run (parameter: Array([0] => teacher)) does not exist!
The static method you called: eat (parameter: Array([0] => John[1] => apple)) does not exist!
Hello world!
```

**4. set():**
-Phương thức set() sẽ tự động được gọi khi chúng ta thiết lập giá trị cho một thuộc tính không được phép truy cập từ bên ngoài, hoặc không tồn tại.

Ví dụ: 
```
<?php
class Person
{
    private $name;
    private $age;

    public function __construct($name="",  $age=25)
    {
        $this->name = $name;
        $this->age  = $age;
    }

    public function __set($property, $value) {
        if ($property=="age")
        {
            if ($value > 150 || $value < 0) {
                return;
            }
        }
        $this->$property = $value;
    }

    public function say(){
        echo "My name is ".$this->name.",I'm ".$this->age." years old";
    }
}
```

Ta thấy 2 thuộc tính $name, $age đều có mức truy cập là private

```
$Person=new Person("John", 25); 
$Person->name = "Lili";     //Gán giá trị thành công. Nếu ko sử dụng no __set() method, đoạn mã sẽ trả ra một exception, do thuộc tính $name không được phép truy cập.
$Person->say();
```

Note : Nếu chúng ta cố gắng thiết lập một property không thể access,  set() method sẽ được kích hoạt. Phương thức này lấy property mà chúng ta đã cố gắng truy cập và các giá trị mà ta đang cố để thiết lập như là hai đối số.
**6. get()**

-Phương thức get() sẽ tự động được gọi khi chúng ta lấy ra giá trị của các thuộc tính trong đối mà chúng ta không được phép truy cập nó từ bên ngoài hoặc không tồn tại.

```
<?php
class Person
{
    private $name;
    private $age;

    function __construct($name="", $age=1)
    {
        $this->name = $name;
        $this->age = $age;
    }

    public function __get($propertyName)
    {   
        if ($propertyName == "age") {
            if ($this->age > 30) {
                return $this->age - 10;
            } else {
                return $this->$propertyName;
            }
        } else {
            return $this->$propertyName;
        }
    }
}
$Person = new Person("John", 60);
echo "Name：" . $Person->name . "<br>"; 
echo "Age：" . $Person->age . "<br>";
```

Phương pháp get() chấp nhận tên của các property mà ta đang tìm kiếm như một tham số. Chúng ta không cần phải gọi phương thức get() vì PHP sẽ tự động gọi chúng khi ta cố gắng truy cập vào một property mà không phải public.

### Kết luận
Qua bài này hi vọng các bạn có thể hiểu được khái niệm về và một số magic function hay sử dụng trong PHP.

### Tài liệu tham khảo
https://www.tutorialdocs.com/article/16-php-magic-methods.html

https://www.php.net/manual/en/language.oop5.magic.php