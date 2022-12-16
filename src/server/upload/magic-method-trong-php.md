# __construct()

PHP construct là phương thức tự đông được gọi đầu tiên sau khi đối tượng được khởi tạo. Mỗi class có 1 contructor . Nếu bạn không khai báo nó, thì sẽ có 1 hàm tạo mặc định không có đối số và nội dung được trống trong class.

**Cách sử dụng:**

Method contruct thường được sử dụng để thiết lập các giá trị khỏi tạo. Ví dụ thiết lập các giá trị cho các biến thành viên khi khởi tạo đối tượng.

**Cú pháp khai báo construct**

```
function __construct([parameter list]){

    //TODO setting value init

}
```

**Chú ý:** chỉ một constructor có thể được khai báo trong cùng một lớp

Example:

```php
<?php
    class Person
    {                                                                     
            public $name;       
            public $age;       
            public $sex;       

        /**
         * explicitly declare a constructor with parameters
         */                                                                                       
        public function __construct($name="", $sex="Male", $age=22)
        {     
            $this->name = $name;
            $this->sex = $sex;
            $this->age = $age;
        }

        /**
         * say method
         */
        public function say()
        {
            echo "Name：" . $this->name . ",Sex：" . $this->sex . ",Age：" . $this->age;
        }   

    }
```

Create object $Person1 without any parameters.

```php
$Person1 = new Person();
echo $Person1->say(); //print:Name：,Sex：Male,Age：22
```

Create object $Person2 with parameter "Jams".

```php
$Person2 = new Person("Jams");
echo $Person2->say(); // print: Name: Jams, Sex: Male, Age: 22
```

Create object $Person3 with three parameters.

```php
$Person3 = new Person ("Jack", "Male", 25);
echo $Person3->say(); // print: Name: Jack, Sex: Male, Age: 25
```

#  __destruct()

Bây giờ chúng ta đã biết hàm construct là gì, và destruct thì ngược lại.

Destructor cho phép bạn thực hiện một số thao tác trước khi hủy đối tượng, chẳng hạn như đóng file, làm trống tập kết quả, v.v.

Destructor là một tính năng mới được giới thiệu bởi PHP5.

Định dạng khai báo của hàm hủy tương tự như của hàm tạo construct (), có nghĩa là desturation () cũng được bắt đầu bằng hai dấu gạch dưới và tên của hàm hủy cũng được cố định.

**Cách khai báo:**

```php
function __destruct()
{
    //method body
}
```
Chú ý Destruct không thẻ có parameter nào

**Cách sử dụng**

Nói chung, destruct không phổ biến lắm trong PHP. Đây là một phần tùy chọn của một lớp, thường được sử dụng để hoàn thành một số nhiệm vụ dọn dẹp trước khi đối tượng bị phá hủy.

Dưới đây là một ví dụ về việc sử dụng hàm hủy:

```php
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

    /**
     * say method
     */
    public function say()
    {
        echo "Name：".$this->name.",Sex：".$this->sex.",Age：".$this->age;
    }   

    /**
     * declare a destructor method
     */
    public function __destruct()
    {
            echo "Well, my name is ".$this->name;
    }
}

$Person = new Person("John");
unset($Person); //destroy the object of $Person created above
```

kết quả của hàm trên là:
```
Well, my name is John
```

# __call()

Phương pháp này có hai tham số. Tham số đầu tiên  function_name sẽ tự động nhận tên phương thức không xác định, trong khi các đối số thứ hai sẽ nhận được nhiều đối số của phương thức dưới dạng một mảng.

**Cách khai báo**
```
function __call(string $function_name, array $arguments)
{
    // method body
}
```

Khi một phương thức không xác định được gọi trong một chương trình, phương thức call () sẽ được gọi tự động.

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
        echo "The static method you called：" . $funName . "(parameter：" ;  // Print the method's name that is not existed.
        print_r($arguments); // Print the parameter list of the method that is not existed.
        echo ")does not exist！<br>\n";
    }
}
$Person = new Person();
$Person::run("teacher"); // If the method which is not existed is called within the object, then the __callStatic() method will be called automatically.
$Person::eat("John", "apple");
$Person->say();
```

**kết quả:**
```
The static method you called: run (parameter: Array([0] => teacher)) does not exist!
The static method you called: eat (parameter: Array([0] => John[1] => apple)) does not exist!
Hello world!
```

#  __get()

Khi bạn cố gắng truy cập một thuộc tính riêng của một đối tượng bên ngoài trong một chương trình, chương trình sẽ đưa ra một ngoại lệ và kết thúc thực hiện. Chúng ta có thể sử dụng magic method get () để giải quyết vấn đề này. Nó có thể nhận được giá trị của tài sản riêng của đối tượng bên ngoài đối tượng. Đây là một ví dụ:

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
$Person = new Person("John", 60);   // Instantiate the object with the Person class and assign initial values to the properties with the constructor.
echo "Name：" . $Person->name . "<br>";   // When the private property is accessed, the __get() method will be called automatically,so we can get the property value indirectly.
echo "Age：" . $Person->age . "<br>";    // The __get() method is called automatically，and it returns different values according to the object itself.

```

**Kết quả**
```
Name: John
Age: 50
```

# __set()

Phương thức set ($ property, $ value) được sử dụng để đặt thuộc tính riêng của đối tượng. Khi một thuộc tính không xác định được gán, phương thức set () sẽ được kích hoạt và các tham số được truyền là tên và giá trị thuộc tính được đặt.
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

$Person=new Person("John", 25); //Note that the initial value will be changed by the code below.
$Person->name = "Lili";     //The "name" property is assigned successfully. If there is no __set() method, then the program will throw an exception.
$Person->age = 16; //The "age" property is assigned successfully.
$Person->age = 160; //160 is an invalid value, so it fails to be assigned.
$Person->say();  //print：My name is Lili, I'm 16 years old.
```

**Kết quả**
```
My name is Lili, I'm 16 years old
```

# __isset()

Trước khi sử dụng phương thức __isset (), trước tiên hãy để tôi giải thích việc sử dụng phương thức isset (). Phương thức isset () chủ yếu được sử dụng để xác định xem biến có được đặt hay không.

Nếu bạn sử dụng phương thức isset () bên ngoài đối tượng, có hai trường hợp:

Nếu tham số là thuộc tính công cộng, bạn có thể sử dụng phương thức isset () để xác định xem thuộc tính có được đặt hay không.
Nếu tham số là thuộc tính riêng tư, phương thức isset () sẽ không hoạt động.
Vì vậy, đối với tài sản tư nhân, có cách nào để biết nếu nó được thiết lập? Tất nhiên, miễn là chúng ta định nghĩa một phương thức __isset () trong một lớp, chúng ta có thể sử dụng phương thức isset () bên ngoài lớp để xác định xem thuộc tính riêng tư có được đặt hay không.

Khi gọietetet () hoặc rỗng () trên thuộc tính không xác định hoặc không thể truy cập, phương thức __isset () sẽ được gọi. Đây là một ví dụ:

```
<?php
class Person
{
    public $sex;
    private $name;
    private $age;

    public function __construct($name="",  $age=25, $sex='Male')
    {
        $this->name = $name;
        $this->age  = $age;
        $this->sex  = $sex;
    }

    /**
     * @param $content
     *
     * @return bool
     */
    public function __isset($content) {
        echo "The {$content} property is private，the __isset() method is called automatically.<br>";
        echo  isset($this->$content);
    }
}

$person = new Person("John", 25); // Initially assigned.
echo isset($person->sex),"<br>";
echo isset($person->name),"<br>";
echo isset($person->age),"<br>";
```

**Kết quả**
```
The sex property is private，the __isset() method is called automatically.
1
The name property is private，the __isset() method is called automatically.
1
The age property is private，the __isset() method is called automatically.
1
```

#  __unset()

Tương tự như phương thức __isset (), phương thức __unset () được gọi khi phương thức unset () được gọi trên một thuộc tính không xác định hoặc không thể truy cập. Đây là một ví dụ:
```
<?php
class Person
{
    public $sex;
    private $name;
    private $age;

    public function __construct($name="",  $age=25, $sex='Male')
    {
        $this->name = $name;
        $this->age  = $age;
        $this->sex  = $sex;
    }

    /**
     * @param $content
     *
     * @return bool
     */
    public function __unset($content) {
        echo "It is called automatically when we use the unset() method outside the class.<br>";
        echo  isset($this->$content);
    }
}

$person = new Person("John", 25); // Initially assigned.
unset($person->sex),"<br>";
unset($person->name),"<br>";
unset($person->age),"<br>";
```

**Kết quả:**
```
It is called automatically when we use the unset() method outside the class.
1
It is called automatically when we use the unset() method outside the class.
1
```


# Tổng kết

Bài viết được lầy từ nguồn https://www.tutorialdocs.com/article/16-php-magic-methods.html

Trên đây là 1 số magic method trong php.. hi vọng các bạn hiểu hơn về magic method trong php thông qua bài viết này.