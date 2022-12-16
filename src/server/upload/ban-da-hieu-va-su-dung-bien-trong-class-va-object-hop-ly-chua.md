# Mở đầu
Nếu bạn là một lập trình viên thì chắc hẳn các bạn đã từng học và làm việc với OOP.  Như bạn đã biết là ```class là một bản thiết kế mà từ đó nó có thể tạo ra nhiều object cụ thể```. Nhưng có lúc ta lại dùng **$this**, có lúc lại dùng  **self** để gọi biến hay gọi hàm trong OOP. Tại sao lại như vậy? 
# Biến class và biến object
Ví dụ class Student.php
```
class Student {
		// value config class
		const FEMALE = 1;
		const MALE = 0;

		private $name;// variable of object
		public $class;
		public $sex;
        public static $count = 0;
        
		public function __construct($name, $class, $sex)
		{
			$this->name = $name;
			$this->class = $class;
			$this->sex = $sex;
            self::$count++;
		}

		public function getName()
		{
			if ($this->sex == self::FEMALE) {
				return 'Miss'.$this->name;
			}

			if ($this->sex == self::MALE) {
				return 'Mir'.$this->name;
			}
			
		}

		public function setName($value)
		{
			$this->name = $value;
		}
        
        public static function getCount()
		{
			return self::$count;
		}
	}
?>
```

Sử dụng tại UserController.php
```
<?php

    $sudent = new Student('Trang', 'PHP', 1);
    $student->getName();
    Student::getCount();
?>
```
Nhìn vào class trên ta thấy có loại biến được sử dụng đó là biến class và biến object.

### 1.  Biến class

Biến class là biến thuộc class, nó chỉ được sử dụng bởi class và không bị thay đổi khi khởi tạo object. 
+ Trong  class, chúng ta có thể truy cập vào biến bằng cách là dùng **self::FEMALE**.
+ Bên ngoài class chúng ta có thể truy cập vào biến bằng cách là dùng **Student::FEMALE**.
Chúng ta có hai cách để khai báo biến class:
+ Constant ( chỉ được dùng cho thuộc tính và không bị thay đổi trong quá trình sử dụng) khai báo như sau; **const FEMALE = 1;** và nó dùng để lưu các giá trị mặc định của class và thường là điều kiện để so sánh. Chúng ta chỉ có thể get data const nhưng không thể set giá trị cho const ( đây là kiến thức về biến hằng số mà các bạn đã được học mình xin nhắc lại)
+ Khai báo Static cho thuộc tính và phương thức, nó dùng cho các thuộc tính và phương thức mà không cần thông qua object và được xử lý bởi chính class.
+ Chúng ta có thể get và set giá trị cho các properties là static. Nó được khai báo như sau:
```
  public static $count = 0;
   public static function getCount()
		{
			return self::$count;
		}
```

```
 Student::getCount();
```
### 2.  Biến object
Chính là các thuộc tính và method của class mà không được khai báo bằng static. 
Mỗi lần chúng ta khởi tạo đối tượng thì giá trị của các biến này sẽ bị thay đổi theo. Muốn set hay get giá trị cho biến object thì mình sẽ thông qua `object` hay là `$this`
Nó được sử dụng bằng biến `$this->name = $name;` hay object `$student->getName()`
```
       private $name;
		public function setName($value)
		{
			$this->name = $value;
		}

```

```
     $sudent = new Student('Trang', 'PHP', 1);
    $student->getName();
```
# Kết thúc
Đây có thể là một kiến thức không hề cũ với một số người nhưng lại là một dấu chấm hỏi cho các bạn mới tìm hiểu về lập trình OOP. Hy vọng qua bài viết này có thể giúp ích cho các bạn hơn.