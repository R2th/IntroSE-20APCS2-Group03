### 1) Khái quát nội dung
| Access Modifiers | Class | Sub Class | World |
| -------- | -------- | -------- | -------- |
| Public     |   Yes     | Yes     |Yes     |
| Protected     | Yes     | Yes    | No     |
| Private    | Yes     | No     |No     |

- public- thuộc tính hoặc phương thức có thể được truy cập từ mọi nơi. Đây là mặc định

- protected - thuộc tính hoặc phương thức có thể được truy cập trong lớp và bởi các lớp dẫn xuất từ lớp đó

- private - thuộc tính hoặc phương thức chỉ có thể được truy cập trong lớp

### 2) Ví dụ cụ thể 
- Public: 
```php
    <?php  
		class Fruit {
			public $name;
			public $color;

			function setName($name) {
				$this->name = $name;
			}

			function setColor($color) {
				$this->color = $color;
			}

			function getName() {
				return $this->name;
			}

			function getColor() {
				return $this->color;
			}
		}

		class A extends Fruit {
			function call() {
				return $this->name;
			}
		}

		$fruit = new Fruit();
		$fruit->setName('a');
		echo $fruit->name; // OK
        echo $fruit->getName(); // OK 
        $a = new A();
        $a->setName('demo');
        echo $a->call(); // OK
	?>
```
Quyền truy cập là public, chúng ta có thể gọi ở bất kỳ vị trí nào:

- Bên ngoài gọi được bên trong Class mà không bị lỗi: echo $fruit->name;
- Tương tự Class con có thể gọi được và bên trong Class

-----

- Protected:
```php
    <?php  
		class Fruit {
			protected $name;
			public $color;

			function setName($name) {
				$this->name = $name;
			}

			function setColor($color) {
				$this->color = $color;
			}

			function getName() {
				return $this->name;
			}

			function getColor() {
				return $this->color;
			}
		}

		class A extends Fruit {
			function call() {
				return $this->name;
			}
		}

		$fruit = new Fruit();
		$fruit->setName('a');
		echo $fruit->name; // Error
        echo $fruit->getName(); // OK
        $a = new A();
        $a->setName('demo');
        echo $a->call(); // OK
	?>
```
Khi quyền truy cập là protected:

- Trong Class và Class con, ta có thể gọi và sử dụng 
- Ở ngoài Class, khi gọi đến và hiển thị ra màn hình. Sẽ báo lỗi do quyền truy cập thiết lập không đúng.

-----

- Private:
```php
    <?php  
		class Fruit {
			private $name;
			public $color;

			function setName($name) {
				$this->name = $name;
			}

			function setColor($color) {
				$this->color = $color;
			}

			function getName() {
				return $this->name;
			}

			function getColor() {
				return $this->color;
			}
		}

		class A extends Fruit {
			function call() {
				return $this->name;
			}
		}

		$fruit = new Fruit();
		$fruit->setName('a');
		echo $fruit->name; // Error
        echo $fruit->getName(); // OK
        $a = new A();
        $a->setName('demo');
        echo $a->call(); // Error
	?>
```
Quyền truy cập private:

- Class con và gọi từ bên ngoài sẽ báo lỗi do quyền truy cập không khả thi
- Từ trong Class, ta vẫn gọi được bình thường. Quyền truy cập là nội bộ, ở trong hàm có thể gọi được

### 3) Tài liệu liên hệ 
https://www.w3schools.com/php/php_oop_access_modifiers.asp