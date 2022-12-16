Các khái niệm trong lập trình hướng đối tượng giả sử rằng mọi thứ như một đối tượng và triển khai một phần mềm bởi sử dụng các đối tượng khác nhau, giống như một khu rừng được tạo từ nhiều đối tượng cây cối, động vật, ... 

Theo như Steve Jobs đã từng nói về hướng đối tượng như sau: *Đối tượng giống như con người. Chúng là những vật thể sống, có hơi thở, chúng biết cần phải làm việc như thế nào và có bộ nhớ để ghi nhớ mọi thứ. Và thay vì tương tác với chúng ở trình độ thấp, bạn tương tác với chúng ở mức độ trừu tượng rất cao, như chúng tôi đang làm ngay tại đây.*

### Các khái niệm đối tượng trong PHP

* **Class**

Là một kiểu dữ liệu được định nghĩa bởi lập trình viên, mà gồm các hàm cục bộ cũng như dữ liệu cục bộ. Bạn có thể nghĩ về một Class như là một Template để tạo nhiều instance (sự thể hiện) của cùng loại (hoặc lớp) của đối tượng.
Để hiểu khái niệm ta có một ví dụ về class `Persion` như sau:
```
<?php
class Persion
{
  public $firstName;
  public $lastName;
  public $age;
  
  public function __construct($firstName, $lastName, $age)
  {
    $this->firstName = $firstName;
    $this->lastName = $lastName;
    $this->age = $age;
  }
  public function getFirstName()
  {
    return $this->firstName;
  }
  public function getLastName()
  {
    return $this->lastName;
  } 
  public function getAge()
  {
    return $this->age;
  }
}
?>
```
**Thuộc tính của class trong PHP**

Bạn có thể nghĩ các thuộc tính của class là các biến được sử dụng để chứa thông tin về object. Trong ví dụ trên, ta đã xác định ba thuộc tính của `firstName`, `lastName` và `age`. Trong đa số các trường hợp, các thuộc tính của class được truy xuất thông qua các object được khởi tạo. Các thuộc tính này là `public`, có nghĩa là chúng chỉ có thể được truy xuất từ bên trong hay bên ngoài class. Đây là mức truy xuất có độ truy suất cao nhất cho các thuộc tính. Ngoài ra còn có `private` và `protected` giúp độ truy xuất an toàn hơn tùy từng trường hợp và mục đích sử dụng.

**Constructor cho các class PHP**

Hàm constructor là một phương thức class đặc biệt tự động được gọi khi bạn khởi tạo một object. Chúng ta sẽ xem xét cách khởi tạo các object trong vài phần tiếp theo, nhưng bây giờ bạn chỉ cần biết rằng một hàm constructor được sử dụng để khởi tạo các thuộc tính object khi object được tạo ra.

Bạn có thể xác định hàm constructor bằng cách định nghĩa phương thức __construct.

* **Object** 

Là một instance (sự thể hiện) riêng biệt của cấu trúc dữ liệu được định nghĩa bởi một Class. Một khi bạn định nghĩa một Class, và sau đó tạo nhiều Object của Class đó. Các Object cũng còn được biết như là Instance.

Trong ngữ cảnh của class Persion mà chúng ta vừa tạo trong phần trước, hãy xem cách khởi tạo một object của class đó.

```
$exE=new Persion(' Thanh ',' Nguyen ' ,' 23');
 echo $exE->getFirstName();
 echo $exE->getLastName();
 echo $exE->getAge();
```

Bạn cần sử dụng từ khóa `new` khi bạn muốn khởi tạo một object của bất kỳ class nào cùng với tên class của nó và bạn sẽ nhận lại một giá trị object mới của class đó. Nếu một class đã định nghĩa phương thức construct và nó yêu cầu các đối số, bạn cần truyền các đối số đó khi bạn khởi tạo một object. 

*  **Biến thành viên**

Đây là các biến được định nghĩa bên trong một Class. Dữ liệu này sẽ không nhìn thấy với ngoại vi lớp đó và có thể được truy cập thông qua các hàm thành viên. Những biến này được gọi là attribute của đối tượng một khi đối tượng đã được tạo.

* **Hàm thành viên**

Đây là hàm được định nghĩa bên trong một Class và được sử dụng để truy cập dữ liệu đối tượng.

* **Inheritance - Tính kế thừa **

Khi một lớp được định nghĩa bằng việc kế thừa hàm đang tồn tại của một lớp cha, thì nó được gọi là tính kế thừa. Ở đây, lớp con sẽ kế thừa tất cả hoặc một số hàm và biến thành viên của lớp cha.

Như ví dụ trên với class `Persion` ta tạo thêm class `Student` là class con của class `Persion` bằng lệnh `extends`:
```
class Student extends Persion{

  public function getFirstName()
  {
    return $this->firstName;
  }
 
  public function getLastName()
  {
    return $this->lastName;
  }
}
```

Như vậy class Student đã có thể kế thửa hết hết các hàmpublic `$firstName`, `$lastName`, `$age`. Lưu ý tùy thuộc ta khai báo là `public` hay `private` thì mức độ truy vấn khác nhau và kế thừa cũng khác nhau.

* **Encapsulation - Tính  đóng gói **

 Liên quan tới một khái niệm mà chúng ta có thể bao đóng tất cả dữ liệu và hàm thành viên với nhau để tạo thành một Object.
Đóng gói là một khía cạnh quan trọng của OOP cho phép bạn hạn chế quyền truy xuất vào các thuộc tính hoặc phương thức nhất định của object. 

Trên đây chỉ là khái niệm cơ bản để ta hiểu qua về OOP trong PHP còn nhiều điều cần tìm hiểu. Còn nhiều thiếu sót, cảm ơn đã đọc bài.

Tài liệu tham khảo:

https://quantrimang.com/steve-jobs-dinh-nghia-lap-trinh-huong-doi-tuong-khien-ca-the-gioi-than-phuc-131900

https://quantrimang.com/lap-trinh-huong-doi-tuong-trong-php-155972

https://code.tutsplus.com/vi/tutorials/basics-of-object-oriented-programming-in-php--cms-31910