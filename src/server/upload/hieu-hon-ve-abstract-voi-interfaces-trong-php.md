![](https://images.viblo.asia/dc2612a5-ef32-4f1a-98bf-9faad32950ff.jpeg)
### The Abstract Class
Abstract class là 1 class có ít nhất 1 abstract method. 1 abstract method là 1 method được khai báo nhưng không được implemented trong code. Class kế thừa abstract class này cần phải định nghĩa method đó.<br>
Từ khóa `abstract` phải được đặt trước class để hiểu rằng nó là 1 abstract class. Chúng ta không thể tạo các object từ các abstract class. <br>
Mỗi class con chỉ có thể kế thừa từ một abstrac class bằng từ khóa extends. <br>
Class con kế thừa từ abstrac class có thể override các method abstract trong đó.
```
// abstract class
abstract class DataAccess {
  public $varAbstract;
  protected $varHost;
 // this abstract method confirm need to define in child class
  abstract function db_connect();
  protected function getResultArray(){
  }
}
```
### The Interface
interface giống như là template hoặc contract cho các class cụ thể của bạn. Class hoàn toàn abstract thì được gọi là interface. Bất kì class nào implements interface này đều phải sử dụng từ khóa `implements` và tất cả các method được khai báo trong class interface phải được định nghĩa ở đây. Nếu không, class này cũng cần được định nghĩa là abstract. Khi một hoặc nhiều class sử dụng cùng một interface, nó được gọi là “đa hình”. Vì không phải là 1 class nên không thể định nghĩa các thuộc tính, khởi tạo đối tượng mà chỉ khai báo các method.
```
// interface
interface class DataInterface {
  public function insertData($varDataRecord);
  public function deleteData($varRecordId);
}
interface class DataFilterInterface {
  public function getList($varFilter);
}
```
### Implementation of Abstract and interface
Nếu chúng ta cố gắng khởi tạo class Data_Access dưới dạng một object độc lập:<br>
Do đó, chúng ta không thể tạo các object từ các abstract class. Thay vào đó, chúng ta cần tạo các class con bổ sung code vào phần thân của các method và sử dụng các class con này để tạo các object.
```
$cDataAccess = new Data_Access;
```
Nó sẽ xuất hiện lỗi sau:
```
PHP Fatal error:  Uncaught Error: Cannot instantiate abstract class Data_Access ...
// Concrete class extend abstract and implement interfaces
class Customers extend DataAccess implements DataInterface,DataFilterInterface {
public function __construct(){
   $this->db_connect();
}
// inherited interface class
public function insertData($varDataRecord){
}
// inherited interface class
public function deleteData($varRecordId){
}
// inherited interface class
public function getList($varFilter){
}
}
```
Bởi vì interface có rule thực thi implementation của nó. Nếu chúng ta cố gắng lọai bỏ các function trong Customers. Ví dụ insertRecord và cố gắng khởi tạo nó, chúng ta sẽ nhận được lỗi nghiêm trọng:
```
PHP Fatal error:  Class Customers contains 1 abstract method and must therefore be declared abstract or implement the remaining methods (Data_Interface::insertRecord)
```
### Difference between Abstract and interface
PHP abstract classes và interface tương tự như trong các ngôn ngữ oops khác sự khác biệt chính trong quan điểm lập trình là:<br>
1. Trong abstract classes, điều này không cần thiết mà mọi method phải abstract. Nhưng trong interface, mọi phương thức đều abstract.<br>
2. Method của interface php phải public, không thể có công cụ sửa đổi quyền truy cập theo mặc định, mọi thứ được coi là công khai. Method trong abstract class trong php có thể là cả public hoặc protected.<br>
3. Interface hỗ trợ đa kế thừa nhưng abstract class không hỗ trợ đa kế thừa<br>
Nó có nghĩa là bạn có thể mở rộng giao diện với một hoặc nhiều giao diện (do đó đa kế thừa) như:<br>
```
interface Interface_A { } 
interface Interface_B { } 
interface Interface_C { }  
interface MyInterface extends Interface_A, Interface_B, Interface_C { }
```
Có thể thấy, chúng ta đang mở rộng `MyInterface` với ba interfaces khác là `Interface_A`, `Interface_B` and `Interface_C`.<br>
Bây giờ chũng ta hãy thử mở rộng 1 abstract class.
```
class Class_A { }  
abstract class MyAbstractClass extends Class_A { 
}
```
Không có vấn đề gì ở đó, bạn CÓ THỂ mở rộng một abstract class với chính xác một class nhưng nếu bạn cố gắng thêm một class nữa:<br>
```
class Class_A { } 
class Class_B { }  
abstract class MyAbstractClass extends Class_A, Class_B { 
}
```
Lần này PHP sẽ cho bạn một lỗi lạ mà không cho bạn biết bạn đang làm gì sai:
```
Parse error: syntax error, unexpected ',', expecting '{'
```
Tôi ước gì PHP sẽ đưa ra thông báo giống như vậy (hy vọng PHP đưa ra thông báo lỗi thông minh hơn trong các phiên bản sau):
```
Fatal Error: You cannot extend an abstract class with more than one classes
```
4. Interface không chứa constructor nhưng abstract có thể chứa constructor
5. Function của interface không thể tĩnh trong khi abstract có thể tĩnh
```
abstract class MyAbstractClass {     
  public static $foo = null;      
  public static function foo() {} 
}
abstract class MyAbstractClass {     
  public static $foo = null;      
  abstract static function foo() {} // error 
}
```

Bài viết được dịch từ: https://rifatcse09.medium.com/abstract-vs-interfaces-classes-in-php-47067351c519