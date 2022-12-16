# 1. Abstract class là gì?
- Lớp trừu tượng(abstract class) đơn giản được xem như một class cha cho tất cả class có cùng bản chất.
- Mỗi lớp con chỉ có thể kế thừa trực tiếp từ một lớp cha bằng từ khóa extends.
- Không thể khởi tạo được các đối tượng thuộc lớp abstract.
- Các phương thức trong abstract class có thể là phương thức abstract hoặc không. Nếu là phương thức abstract thì chỉ được khai báo tên nhưng không viết phần nội dung.
- Lớp con kế thừa từ lớp abstract phải override các phương thức abstract trong đó.

Ví dụ:
```
<?php
// Parent class
abstract class Car {
  public $name;
  public function __construct($name) {
    $this->name = $name;
  }
  abstract public function intro() : string; 
}

// Child classes
class Audi extends Car {
  public function intro() : string {
    return "Choose German quality! I'm an $this->name!"; 
  }
}

class Volvo extends Car {
  public function intro() : string {
    return "Proud to be Swedish! I'm a $this->name!"; 
  }
}

// Create objects from the child classes
$audi = new audi("Audi");
echo $audi->intro();
echo "<br>";

$volvo = new volvo("Volvo");
echo $volvo->intro();
echo "<br>";

?>
```


# 2. Interface là gì?
- Interface không phải là một class, mà là bản thiết kế cho các class có cùng cách thức hoạt động.
- Không thể định nghĩa các thuộc tính, khởi tạo đối tượng mà chỉ khai báo các phương thức trong interface.
- Các phương thức chỉ được khai báo tên nhưng không được viết nội dung trong đó.
- Các phương thức của interface phải để dưới dạng public.
- Nếu lớp kế thừa từ interface thì phải override tất cả các phương thức trong đó.
- Một lớp có thể kế thừa từ nhiều interface khác nhau.

Ví dụ
```
<?php
interface Animal {
  public function makeSound();
}

class Cat implements Animal {
  public function makeSound() {
    echo "Meow";
  }
}

$animal = new Cat();
$animal->makeSound();
?>
```

## Sự khác nhau giữa interface và abstract class
- Tất cả phương thức trong interface luôn luôn(được hiểu) là abstract.
- Các phương thức trong abstract class là abstract hoặc không phải là abstract.
- Có thể implements nhiều interface nhưng không thể extends trực tiếp nhiều class.
- Các phương thức trong interface luôn luôn phải để là public, khác với abstract class có thể là public, private hoặc protected.
## Sự giống nhau giữa interface và abstract class
- Không thể tạo một biến kiểu interface hoặc abstract class.
- Nếu là phương thức abstract thì phải được khai báo lại trong class con.
- Cả interface và abstract class đều có tính kế thừa.

## Khi nào thì sử dụng interface, khi nào sử dụng abstract class
- Khi một nhóm đối tượng có cùng bản chất kế thừa từ một class thì sử dụng abstract class.
- Khi một nhóm đối tượng không có cùng bản chất nhưng chúng có hành động giống nhau thì sử dụng interface.