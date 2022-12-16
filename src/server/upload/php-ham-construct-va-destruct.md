### 1) Giới thiệu:
Trong bài này nói về 2 hàm cơ bản trong hướng đối tượng (OOP) của PHP:

* __construct ()

Hàm ```__construct()```, cho phép người dùng khởi tạo các thuộc tính của một đối tượng khi tạo đối tượng.

Nếu tạo ```__construct()``` hàm, PHP tự động gọi hàm này khi tạo một đối tượng từ một lớp 

Chú ý: ```__construct()``` được tạo bằng 2 dấu gạch dưới ở phía trước. Khi sử dụng chúng ta cần lưu ý.

* __destruct ()

Một trình hủy được gọi khi đối tượng bị hủy hoặc tập lệnh bị dừng hoặc thoát

Khi gọi hàm ```__destruct()```, PHP tự động gọi hàm này ở cuối tập lệnh

Giống ```__construct()```,    được tạo bằng 2 dấu gạch dưới ở phía trước.

### 2) Code ví dụ:
```php
<?php
class Audi
	{
		public $infor;
		public $money;

		function __construct($infor, $money)
		{
			$this->infor = $infor;
			$this->money = $money;
		}

		function get_infor() 
		{
			return $this->infor;
		}

		function get_money()
		{
			return $this->money;
		}
	}

	$audi = new Audi('TT', '100000 USD');
    ?>
    
  ```
    
  Có thế thấy rằng hàm ```__construct()``` giúp ta giảm thiểu việc code, không cần sử dụng hàm ```set_infor()``` và ```set_money()```
  
  ```php
  <?php
class Fruit {
  public $name;
  public $color;

  function __construct($name) {
    $this->name = $name;
  }
  function __destruct() {
    echo "The fruit is {$this->name}.";
  }
}

$apple = new Fruit("Apple");
?>
```
2 hàm giúp giảm lượng mã đáng kể, rất hữu dụng với chúng ta.

### 3) Tài liệu xem thêm 
https://www.php.net/manual/en/language.oop5.decon.php
https://stackoverflow.com/questions/151660/can-i-trust-php-destruct-method-to-be-called