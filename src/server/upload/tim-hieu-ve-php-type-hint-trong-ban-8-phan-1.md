## Giới thiệu. 
- Ở trong một vài viết trước, mình đã giới thiệu đến các bạn về type hint trong php, và cách sử dụng của chúng.
- Tham khảo thêm ở bài viết [php type hint](https://viblo.asia/p/php-type-hint-YWOZr8nY5Q0)
- Với sự ra mắt bản mới của php, bản 8, thì php cũng bổ sung thêm cho việc type hint này càng hoàn chỉnh hơn, đuổi kịp đến với các ngôn ngữ hiện đại khác như python, typescript. Qua đó tăng tính ứng dụng và rõ ràng hơn của ngôn ngữ lập trình này.
- Bài viết này, mình sẽ cùng nhau tìm hiểu về type hint, đặc biệt là union type trong bản php8.

## Nội dung 
- Với bản php8, thì việc khai báo kiểu dữ liệu có thể thực hiện ở các tham số của hàm, đồng thời cũng có thể khai báo được kiểu trả về của hàm. Điều này đảm bảo tính đúng đắn, rõ ràng và chính xác của hàm (function) khi được sử dụng. Nếu truyền sai kiểu tham số, hoặc giá trị trả về không chính xác như khai báo, thì exception về "sai kiểu dữ liệu" sẽ được tung ra (hoặc raise lên). Với những người dùng, ở đây là các lập trình viên, đã quá quen với việc sử dụng ngôn ngữ lập trình php ở các bản thấp hơn, thì điều này lại gây trở ngại, như không quen, hoặc hơi rắc rối trong việc áp dụng, hoặc đơn giản là thấy rườm rà, không thích, nhưng với bản thân mình, mình lại rất thích điều này. Khi các tham số được khai báo một cách rõ ràng, về kiểu, tên gợi nhớ, và đồng thời kiểu dữ liệu trả về cũng được khai báo, thì sẽ rất dễ dàng trong việc đọc hiểu code.
- Một điều đáng chú ý nữa, là với php8, khi bạn thực hiện việc khai báo kiểu của tham số, kiểu trả về của hàm, thì các class (lớp) con kế thừa từ class cha, khi muốn overriding lại hàm (function) của hàm cha, thì bắt buộc phải tuân thủ những kiểu tham số và kiểu trả về của hàm cha như đã khai báo. Trong trường hợp class cha không khai báo gì, thì class con cũng có thể làm như vậy, tức là sẽ không cần khai báo kiểu trả về của hàm, cũng như kiểu các tham số truyền vào.

### Các kiểu đơn. 
Các kiểu đơn được hỗ trợ bắt đầu từ bản versio php7.1, nhưng không phải kiểu đơn nào cũng được hỗ trợ từ version 7.1, nhưng nó cũng được thêm vào và hoàn thiện dần cho đến vesion 8. Chúng ta sẽ có các kiểu đơn như sau:
#### Class/interface name
**Mô tả**: Giá trị thuộc kiểu này phải là một thể hiện của class hoặc interface. 
**Ví dụ**:  public function hocvien() : Person;
Như trong ví dụ trên, thì giá trị trả về của hàm *hocvien* bắt buộc phải là thể hiện của class Person. 
#### self
**Mô tả**: Giá trị thuộc kiểu này phải giống với tên class mà nó được khai báo và sử dụng. Và nó cũng chỉ được sử dụng chỉ trong class đó thôi.
#### parent
**Mô tả**: Giá trị  thuộc kiểu này phải giống với tên class cha của class mà nó được khai báo và sử dụng. Chỉ sử dụng cho các class.
#### array
**Mô tả**: Giá trị phải là một mảng. 
#### callable
**Mô tả**: Gía trị phải là một callable khả dụng. Không thể sử dụng kiểu này để khai báo kiểu của thuộc tính trong một lớp
#### bool
**Mô tả**: Giá trị phải là kiểu boolean. 
#### float
**Mô tả**: Giá trị phải là kiểu số thực 
#### int
**Mô tả** : Giá trị phải là kiểu số nguyên (integer)
#### string 
**Mô tả**: Giá trị phải là một chuỗi
#### iterable 
**Mô tả**: Giá trị ít nhất là mảng hoặc là một thể hiện của **Traversable**, hỗ trợ từ version 7.1
#### object
**Mô tả**: Giá trị phải là một đối tượng (object), hỗ trợ từ version 7.2
#### mixed
**Mô tả**: Giá trị có thể là bất kỳ, hỗ trợ từ verssion 8
**Chú ý**:  Các kiểu cơ bản không được hỗ trợ. Ví dụ như chúng ta không thể khai báo một tham số kiểu boolean thay vì khai báo chính xác kiểu của nó là bool được. 
Kiểu **mixed** có thể là **union type, array, bool, callble, int, float, string, object, resource, null**
### Ví dụ
#### Ví dụ 1: Khai báo kiểu tham số là một class.
```php
<?php
class C {}
class D extends C {}

// class E không kế thừa từ class C
class E {}

function f(C $c) {
    echo get_class($c)."\n";
}

f(new C);
f(new D);
f(new E);
?>
```
thì chúng ta sẽ có output báo lỗi như sau
```
C
D

Fatal error: Uncaught TypeError: f(): Argument #1 ($c) must be of type C, E given, called in /in/gLonb on line 14 and defined in /in/gLonb:8
Stack trace:
#0 -(14): f(Object(E))
#1 {main}
  thrown in - on line 8
```

#### Ví dụ 2: Khai báo kiểu là interface
```php
<?php
interface I { public function f(); }
class C implements I { public function f() {} }

// class E là một class độc lập
class E {}

function f(I $i) {
    echo get_class($i)."\n";
}

f(new C);
f(new E);
?>
thì output chúng ta nhận được sẽ là 
```php
C
Fatal error: Uncaught TypeError: f(): Argument #1 ($i) must be of type I, E given, called in - on line 13 and defined in -:8
Stack trace:
#0 -(13): f(Object(E))
#1 {main}
  thrown in - on line 8
```
#### Ví dụ 3: Khai báo về kiểu trả về của function
```php
<?php
function sum($a, $b): float {
    return $a + $b;
}

// Note that a float will be returned.
var_dump(sum(1, 2));
?
```
Như vậy output sẽ là 3, nhưng là kiểu số thực, không phải kiểu integer.
#### Ví dụ 4: Kiểu trả về của một function là object
```php
<?php
class C {}

function getC(): C {
    return new C;
}

var_dump(getC());
?>
```
Output của đoạn code trên sẽ như sau
```
object(C)#1 (0) {
}
```
### Kết luận 
Tham khảo thêm tài [document](https://www.php.net/manual/en/language.types.declarations.php#language.types.declarations.union)
Các phần sau sẽ bổ sung thêm về nullable và type union