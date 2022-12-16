Chào các bạn , hôm trước mình có chia sẻ về các kiến thức cơ bản khi mới học PHP nếu ai chưa xem thì xem lại [Tại đây](https://viblo.asia/p/nhung-kien-thuc-co-ban-can-hoc-khi-moi-chuyen-qua-php-E375zL2WZGW) nhé . Hôm nay mình sẽ chia sẻ tiếp những nội dung tiếp theo cần học sau khi học qua kiến thức cơ bản.
# Lập trình hướng đối tượng (OOP) là gì ?
OOP (viết tắt của Object Oriented Programming) – lập trình hướng đối tượng là một phương pháp lập trình dựa trên khái niệm về lớp và đối tượng. OOP tập trung vào các đối tượng thao tác hơn là logic để thao tác chúng, giúp code dễ quản lý, tái sử dụng được và dễ bảo trì.

Bất kỳ lập trình viên nào muốn đi theo hướng lập trình nào cũng đều phải biết về OOP.

## Các đặc điểm cơ bản trong OOP
### **1.Tính đóng gói**

Tính đóng gói tức là kỹ thuật ẩn giấu thông tin không liên quan và hiện thị ra thông liên quan. Mục đích chính của đóng gói trong PHP là giảm thiểu mức độ phức tạp phát triển phần mềm.

Đóng gói cũng được sử dụng để bảo vệ trạng thái bên trong của một đối tượng. Bởi việc ẩn giấu các biến biểu diễn trạng thái của đối tượng. Việc chỉnh sửa đối tượng được thực hiện, xác nhận thông qua các phương thức. Hơn nữa, việc ẩn giấu các biến thì các lớp sẽ không chia sẻ thông tin với nhau được. Điều này làm giảm số lượng khớp nối có thể có trong một ứng dụng.

**Lợi ích của đóng gói** 

Bạn có thể tạo lớp **read-only** hoặc **write-only** bằng việc cài đặt phương thức **setter** hoặc **getter**.


Bạn có thể kiểm soát đối với dữ liệu. Giả sử bạn muốn đặt giá trị của id chỉ lớn hơn 100 bạn có thể viết logic bên trong lớp setter.

```php
    <?php
	abstract class supermarket{
		public $vegetable;
		public $drink;
		public $meat;
		protected $fish;
		private $milk;
		
		public function setData($vegetable = null, $drink = null, $meat = null, $fish = null, $milk = null){
			$this->vegetable = $vegetable;
			$this->drink = $drink;
			$this->meat = $meat;
			$this->fish = $fish;
			$this->milk = $milk;
		}
	}

	class order extends supermarket{
		public function __construct($vegetable, $drink, $meat, $fish, $milk){
				$this->setData($vegetable, $drink, $meat, $fish, $milk);
		}
		public function outputData(){
			echo $this->vegetable;
			echo "<br />";
			echo $this->drink;
			echo "<br />";
			echo $this->meat;
			echo "<br />";
			echo $this->fish;
			echo "<br />";
			echo $this->milk;
		}
	}

	$order = new order("xa lach", "Coca", "Thit lon", "Ca Map", "sua bo");
	$order -> outputData();
```
Kêt quả : 
```
    xa lach
    Coca
    Thit lon
    Ca map
    NOTICE Undefined property: order::$milk on line number 34
```

### **2. Tính kế thừa**

Kế thừa trong PHP là sự liên quan giữa hai class với nhau, trong đó có class cha (superclass) và class con (subclass). Khi kế thừa class con được hưởng tất cả các phương thức và thuộc tính của class cha. Tuy nhiên, nó chỉ được truy cập các thành viên public và protected của class cha. Nó không được phép truy cập đến thành viên private của class cha.

Tư tưởng của kế thừa trong PHP là có thể tạo ra một class mới được xây dựng trên các lớp đang tồn tại. Khi kế thừa từ một lớp đang tồn tại bạn có sử dụng lại các phương thức và thuộc tính của lớp cha, đồng thời có thể khai báo thêm các phương thức và thuộc tính khác.

```php
<?php
	abstract class supermarket{
		public $vegetable;
		public $drink;
		public $meat;
		
		public function setData($vegetable = null, $drink = null, $meat = null){
			$this->vegetable = $vegetable;
			$this->drink = $drink;
			$this->meat = $meat;
		}
	}

	class order extends supermarket{
		public $fish = "Ca Voi";

		public function __construct($vegetable, $drink, $meat){
				$this->setData($vegetable, $drink, $meat);
		}
		public function outputData(){
			echo $this->vegetable;
			echo "<br />";
			echo $this->drink;
			echo "<br />";
			echo $this->meat;
			echo "<br />";
			echo $this->fish;
		}
	}

	$order = new order("Xa lach", "Pepsi", "Thit bo");
	$order->outputData();
```
Kết quả : <br/>
```
    Xa lach
    Pepsi
    Thit bo
    Ca Voi
```

### **3. Tính đa hình**

Tính đa hình trong PHP hay còn gọi là tính đa hình trong lập trình hướng đối tượng là sự đa hình của mỗi hành động cụ thể ở những đối tượng khác nhau. Ví dụ hành động ăn ở các loài động vật hoàn toàn khác nhau như: con heo ăn cám, hổ ăn thịt, con người thì ăn con lợn và con hổ =)) .

Đó là sự đa hình trong thực tế, còn đa hình trong lập trình thì được hiểu là Lớp con sẽ viết lại những phương thức ở lớp cha (overwrite).

ví dụ : 

```php
// class Parent 
class Animal
{
    // animal eat
    public function Eat()
    {
        echo 'Animal Eating ....';
    }
}
  
// class Child
class Pig extends Animal
{
    public function Eat()
    {
        parent::Eat();
        echo 'Con Lợn Đang Ăn Cám';
    }
}
  
$pig = new Pig();
$pig->Eat();
```

**Vậy bản chất của tính đa hình là gì?**

Là kỹ thuật cho phép thay đổi nội dung cùng một hành vi (hàm) trong hai lớp cha và con, hay nói cách khác là viết lại hàm ở lớp cha trong lớp con.

### **4. Tính trừu tượng**  

Tính trừu tượng (abstraction) trong lập trình hướng đối tượng giúp giảm sự phức tạp thông qua việc tập trung vào các đặc điểm trọng yếu hơn là đi sâu vào chi tiết.

Ví dụ khi một lập trình viên tạo một lớp (class) dùng đại diên cho các tài khoản tiền gửi ngân hàng của các khách hàng và đặt tên cho lớp này là BankAccount. Lớp này có hai thuộc tính là $balance và $interest dùng để lưu dữ liệu số tiền dư và lãi suất tiền gửi của tài khoản.
```php
    class BankAccount {
        public $balance;
        public $interest;
    }
```
Tiếp theo lập trình viên này thêm các phương thức gửi tiền (deposit) và rút tiền (withdraw) như sau:
```php
    class BankAccount {
        public $balance; // số dư tài khoản
        public $interest; // lãi suất

        public function deposit ($amount) {
        // code...
        }

        public function withdraw ($amount) {
        // code...
        }
    }
```
Với tính trừu tượng (abstraction) thì toàn bộ sự phức tạp của việc xử lý quá trình gửi tiền và rút tiền sẽ được thực hiện trong 2 phương thức deposit và withdraw. Các lập trình viên không cần phải quan tâm tới sự phức tạp (hay nội dung chi tiết) của việc xử lý các công việc gửi tiền và rút tiền trên mà chỉ cần biết mục đích của từng phương thức là gì.

Dưới đây là một cách thực hiện (implementation) của phương thức deposit:
```php
    // nạp tiền vào tài khoản
    public function deposit ($amount) {
        if ($amount < 50000) { // số tiền nạp vào dưới mức tối thiểu 50 ngàn
            return "Error! The minimum amount is 50";
        }
        if ($amount  > 100000000) { // tài khoản này cho phép nạp tối đa 100 triệu một lần
            return "Error! You exceed the maximum amount, please upgrade your account";
        }
        $balance += $amount; // tăng số dư tài khoản
    }
```
Với tính trừu tượng thì lập trình viên chỉ cần quan tâm tới mục đích của phương thức deposit là để nạp tiền vào tài khoản. Toàn bộ chi tiết của quy trình xử lý gửi tiền sẽ được thực hiện ở bên trong phương thức deposit.

# Trait là gì và cách sử dụng trait trong PHP

## Vậy trait là gì?

Trong hướng đối tượng, Traits là một cơ chế để tái sử dụng code trong các ngôn ngữ đơn kế thừa như PHP. Một Trait nhằm giảm hạn chế của sự đơn thừa kế bằng cách cho phép nhà phát triển sử dụng lại các bộ phương thức một cách tự do trong một số lớp độc lập trong các hệ thống phân cấp lớp khác nhau.

Một Trait tương tự như một lớp (Class), nhưng chỉ nhằm mục đích nhóm chức năng một cách chi tiết và nhất quán. Và nó không có khả năng khởi tạo ví dụ: new class ABC(). Nó là một sự bổ sung cho sự thừa kế truyền thống (đơn kế thừa) trong ngôn ngữ PHP.

## Cách thức hoạt động của Trait như thế nào

Chúng ta sẽ cùng nhau tìm hiểu về cách hoạt động của Trait trong ví dụ bên dưới:
```php
        class Samsung extends smartPhone
        {
            public function showMessage(){
                echo 'Samsung .... ';
            }
        }

        class Iphone extends smartPhone
        {
            use FullMessage;
            public function showMessage(){
                echo 'Iphone ...';
            }
        }

        class Dell extends Laptop
        {
            use FullMessage;
            public function showMessage(){
                echo 'Dell ...';
            }
        }

        trait FullMessage
        {
            public function showMessage(){
                echo 'This is';
            }
        }
```
Ở đây mình có hai Class Samsung và Class Iphone cùng kế thừa một Class smartPhone, Class Dell kế thừa Class Laptop. Nếu muốn thêm dòng chữ This is cho hai Class Iphone và Class Dell, mình chỉ việc tạo một Trait FullMessage xuất thêm dòng chữ This is và use nó ở hai Class trên

Tại sao mình cần phải sử dụng Trait, vì nó ở đây đóng góp như một “Class” chứa những hàm bổ sung mình cần cho Class mình cần sử dụng và bản thân Class Dell và Class Iphone ở đây cùng kế thừa từ hai cha khác nhau. Do sự kế thừa khá phức tạp nên để đơn giản hoá chúng ta có thể sử dụng Trait để giải quyết vấn đề này

**Trait có giống Interface?**

Sau khi hiểu Trait là gì, thì một câu hỏi đặt ra là Trait có giống như Interface(Interface là gì mình sẽ đề cập vào bài viết khác, nếu có anh em chưa biết). Nhìn tổng quan Trait và Interface đều là tổng hợp một list các function và nhìn khá đơn giản.

Nhưng Interface khác là vì nó được xem như một giao kèo giữa nó và Class implements chính nó. Ví dụ:
 ```php
    class Iphone implements smartPhone
    {
        public function showMessage(){
            echo 'Iphone ...';
        }
    }

    interface smartPhone
    {
        public function showMessage() : string
    }
 ```
 Ở đây Class Iphone giao kèo với interface smartPhone là nó chỉ được có một hàm duy nhất là hàm showMessage và kết quả hàm này là một string. Interface có giá trị “sử dụng” nó không được dùng để lấy các hàm bên trong nó để sử dụng mà nó được xem là một giao ước để cam kết sự chặt chẽ trong Class mà bạn implements nó.

Và thường thì từ khoá đi cùng với interface sẽ là implements. Còn với Trait thì sẽ là từ khoá use.
```php
    class Iphone extends smartPhone {
        use smartPhoneSharing;
    }
```

# Namespaces trong PHP là gì

Từ PHP 5.3 namespaces được giới thiệu để đóng gói các item và làm cho script dễ quản lý hơn.

Khi một trang web trở nên lớn hơn, việc giữ tất cả các file class trong cùng một thư mục sẽ khó hơn. Ngoài ra, chúng ta phải sử dụng tên rất dài cho các file và class, Đó là một trở ngại trong quản lý mã nguồn. Namespaces được giới thiệu để ngăn chặn vấn đề này. Chúng ta hãy xem nó hoạt động như thế nào!

**khai báo namespaces**

Cú pháp:
```php
    namespace Name; 
```
Trong đó: Name là tên của namespace Khi khai báo namespace thì chúng ta phải đặt nó ở phía trên cùng của file. Khi đã thiết lập namespace chúng ta cần sử dụng namespace để lấy ra class như ví dụ trên: new SmartPhone\Iphone()
```php
<?php
 
namespace SmartPhone;
 
class Iphone
{
    private $name = 'Iphone 11';
 
    public function getName()
    {
        return $this->name;
    }
}
```
**Nạp namespace bằng từ khóa use**

Đôi khi trong những ứng dụng lớn, nhất là khi bạn sử dụng framework cấu trúc thư mục sẽ rất phức tạp và do đó namespace sẽ rất dài. Việc truyền full namespace khi gọi ra mỗi class sẽ làm cho code rất khó bảo trì và dài dòng do đó chúng ta sẽ sử dụng từ khóa use để nạp namespace trước hoặc định danh cho namespace, giúp cho code trở nên gọn gàng hơn.

```php
<?php
use SmartPhone\Iphone;
 
$iphone = new Iphone();
 
echo $iphone->getName();
```
Kết quả : 
```
Iphone 11
```

 Ở đây thay vì phải truyền đầy đủ namespace vào từ khóa new khi khởi tạo đối tượng, bạn chỉ cần gõ tên class, PHP sẽ tự biết chỗ nhờ lệnh use phía trên để nạp class Iphone trong thư mục smartphone.
 
 **Định danh cho Namespaces**
 
 Khi namespace quá dài bạn cũng có thể đặt tên lại cho nó ngắn gọi hơn bằng từ khóa as theo cú pháp sau:
 ```
     use name_space_name as alias; 
 ```
 ```php
<?php
    use SmartPhone as A;

    $iphone = new A\Iphone();
    echo $iphone->getName();
 ```

# Kết luận

Bài viết của mình cũng khá là dài rồi hi vọng nó sẽ giúp ích cho mọi người . Cảm ơn mọi người đã đọc đến đây .....