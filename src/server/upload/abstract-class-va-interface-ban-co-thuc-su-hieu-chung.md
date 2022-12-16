Chắc hẳn mọi lập trình viên đều đã quá quen với lập trình hướng đối tượng, nhưng với Abstract Class và Interface bạn có thực sự hiểu chúng? 
Rất nhiều người trong số chúng ta đã sử dụng nhưng lại chưa thực sự hiểu bản chất, chúng ta cùng nhau tìm hiểu rõ hơn về Abstract Class và Interface để có thể ứng dụng chúng tốt hơn nhé.

## Abstract Class là gì ?
* Nó là một class
* Nó chứa phương thức trừu tượng
* Các class khi kế thừa một abstract class sẽ phải định nghĩa lại các phương thức trừu tượng của abstract class
* Một class chỉ có thể kế thừa 1 lớp trừu tượng
* Có 2 loại method là abstract method và method thường:
    1. abstract method là method trống không có thực thi.
    2. method thường là method có thực thi.
*  không thể khởi tạo đối tượng của abstract class
*  Không hỗ trợ đa kế thừa.
*  Phương thức abstract của abstract class không được phép khai báo nội dung phương thức. Nó chỉ có thể định nghĩa tên cũng như các tham số đầu vào.
*  Mức truy cập các hàm của abstract phải ở public hoặc protected để lớp kế thừa có thể định nghĩa lại và các thuộc tính của lớp abstract không được khai báo abstract.
Ví dụ : khai báo 1 abstract class

```
abstract class BaseClass
{
    // phương thức ở mức protected
    abstract protected function hello();
  
    // Phương thức ở mức public
    abstract public function hi();
}
```
Ví dụ : Lớp kế thừa từ lớp abstract
```
abstract class Person
{
    protected $ten;
    protected $cmnd;
    protected $namsinh;
  
    abstract public function showInfo();
}

// class extends cần phải viết lại đầy đủ các hàm abstract
class SinhVien extends Person
{
    public function showInfo(){
  
    }
}
```

## Interface là gì ?
* Interface là một Template (khuôn mẫu), nó không phải là một lớp đối tượng.
* Để khai báo một Interface ta dùng từ khóa interface để thay cho từ khóa class.
* Tất cả các hàm trong interface đều ở dạng khai báo và không được định nghĩa (giống lớp abstract). 
* Là cấu trúc trong OOP cho phép các class khác có thể implements.
* Một đối tượng implement một interface thì nó phải khai báo và định nghĩa tất cả các hàm trong Interface.
* Interface không thể khởi tạo. 
* Phương thức trong Interface bắt buộc toàn bộ là các phương thức trừu tượng.
* Các phương thức trong Interface chỉ có thể được định nghĩa với khả năng là public và cũng không được định nghĩa nội dung.
* Interface có thể được extends với nhau.
* 1 class có thể implements nhiều Interface.
Ví dụ
```
<?php
interface MoveInterface
{
    function run();
}
class Dog implements MoveInterface
{
    public function run () 
    {
        echo 'Con chó chạy bằng 4 chân<br>';
    }
}
class Person implements MoveInterface
{
    public function run ()
    {
        echo 'Loài người đi bằng 2 chân<br>';
    }
}
class Car implements MoveInterface
{
    public function run ()
    {
        echo 'Xe hơi chạy bằng 4 bánh';
    }
}
 
 
Dog::run();
Person::run();
Car::run();
?>
```
## Sự khác nhau giữa interface và abstract class
1. Tất cả phương thức trong interface luôn luôn(được hiểu) là abstract.
2. Các phương thức trong abstract class là abstract hoặc không phải là abstract.
3. Có thể implements nhiều interface nhưng không thể extends trực tiếp nhiều class.
4. Các phương thức trong interface luôn luôn phải để là public, khác với abstract class có thể là public hoặc protected.
## Sự giống nhau giữa interface và abstract class
1. Không thể tạo một biến kiểu interface hoặc abstract class.
2. Nếu là phương thức abstract thì phải được khai báo lại trong class con.
3. Cả interface và abstract class đều có tính kế thừa.
## Khi nào thì sử dụng interface, khi nào sử dụng abstract class
Khi một nhóm đối tượng có cùng bản chất kế thừa từ một class thì sử dụng abstract class.

Khi một nhóm đối tượng không có cùng bản chất nhưng chúng có hành động giống nhau thì sử dụng interface.
##  Lời kết
Trên đây là những hiểu biết của mình về abstract class và interface trong php. Kiến thức mình cũng có hạn có gì sai sót mong các bạn comment đóng góp để mình chỉnh sửa. Cảm ơn mọi người đã theo dõi, upvote cho mình nhé.
Nguồn : rất nhiều nguồn :)