Ở [phần trước](https://viblo.asia/p/lap-trinh-huong-doi-tuong-trong-php-phan-1-vyDZOW4QZwj) mình đã có nói đến một số vấn đề về lập trình hướng đối tượng trong PHP như về 4 tính chất hay về Abstract Class, Interface... Để tiếp nội dung của các bài viết về OOP trong PHP, nội dung bài này mình sẽ nói về 1 số vấn đề như:
* [Traits](#_traits-0)
* [Namespaces](https://viblo.asia/p/lap-trinh-huong-doi-tuong-trong-php-phan-2-RnB5p0Y75PG#_namespaces-1)
* [Magic Functions](https://viblo.asia/p/lap-trinh-huong-doi-tuong-trong-php-phan-2-RnB5p0Y75PG#_magic-functions-2)
* [Splat Operator](https://viblo.asia/p/lap-trinh-huong-doi-tuong-trong-php-phan-2-RnB5p0Y75PG#_splat-operator-3)
# Traits
Traits là cơ chế để tái sử dụng mã nguồn trong ngôn  ngữ không hỗ trợ đa kế thừa như PHP. Trait làm giảm bớt hạn chế của việc kế thừa đơn lẻ bằng cách cho phép lập trình viên sử dụng lại các phương thức 1 cách tự do. Trait tương tự như 1 lớp, mục đích của nó là nhóm chức năng 1 cách nhất quán hơn. Các phương thức trong Traits có thể bị **override - ghi đè** trong các class sử dụng nó.
Ví dụ về Trait:
```php
trait A
{
    public function share($item)
    {
        return "share this item" + $item;
    }
}

// Use Shareable Trait in other class
class B
{
    use A;
}

$b = new B();
echo $b->share($item);
```
Bạn cũng có thể sử dụng các Trait lồng nhau:
```php
trait A
{
    //
}

trait B
{
    use A;
}
```
Với việc dùng nhhiều trait trong cùng 1 class thì khả năng cao là trong các trait ấy có những phương thức tên trùng nhau. Để giải quyết vấn đề này, bạn hãy dùng đến **insteadof**:
```php
trait A
{
    public function getAll()
    {
        //
    }
}

trait B
{
    public function getAll()
    {
        //
    }
}

class C
{
    use A, B
    {
        A::getAll insteadof B;
    }
}
```
# Namespaces
Namespaces chịu trách nhiệm đóng gói phạm vi cho các hàm và biến. Nó cho phép bạn sử dụng cùng 1 hàm hoặc tên lớp trong các thành phần khác nhau của cùng 1 chương trình mà không gây ra xung đột do cùng tên.

**Định nghĩa namespaces** ở trên cùng của file
```php
namespace my\namespace;
```
**Sử dụng namsepaces**:
```php
use foo;

// Or use Namespaces with alias
use My\Full\Classname as Another;
```
# Magic Functions
Magic functions là các phương thức có tên đặc biệt, bắt đầu bằng 2 dấu gạch dưới, biểu thị các phương thức sẽ được kích hoạt để đáp ứng với các sự kiện cụ thể trong PHP.

Một số hàm:
* __construct(): được gọi khi đối tượng được khởi tạo
* __destruct(): khi đối tượng bị hủy và xóa bỏ mọi tài nguyên được sử dụng bởi đối tượng
* __set(): khi truyền dữ liệu vào 1 thuộc tính không được phép truy cập
* __get(): khi truy cập dữ liệu của 1 thuộc tính không được cho phép
* __isset(): khi mà gọi các hàm isset() hoặc empty() không được chấp nhận
* __unset(): khi hàm unset() được sử dụng trong 1 thuộc tính không thể truy cập
* __call(): khi gọi các phương thức không tiếp cận được trong ngữ cảnh đối tượng
* __callStatic(): khi gọi các phương thức không tiếp cận được trong ngữ cảnh **tĩnh**
* __toString(): khi dùng đối tượng như là 1 string
* __invoke(): khi sử dụng đối tượng như là 1 hàm
* __sleep(): khi gọi hàm serialize() đối tượng
* __wakeup(): khi gọi hàm unserialize() đối tượng
* __set_state(): khi gọi var_export() lên đối tượng
* __clone(): khi clone 1 đối tượng
* __debugInfo(): được gọi bởi var_dump()
# Splat Operator
Từ PHP5.6, bạn có thể sử dụng toán tử splat (...) để tạo các hàm variadic (các hàm có 1 đối số không xác định). Xem ví dụ sau:
## Hàm Variadic
```php
<?php
function f($req, $opt = null, ...$params) {
    // $params is an array containing the remaining arguments.
    printf('$req: %d; $opt: %d; number of params: %d'."\n",
           $req, $opt, count($params));
}

f(1); // $req: 1; $opt: 0; number of params: 0
f(1, 2); // $req: 1; $opt: 2; number of params: 0
f(1, 2, 3); // $req: 1; $opt: 2; number of params: 1
f(1, 2, 3, 4); // $req: 1; $opt: 2; number of params: 2
f(1, 2, 3, 4, 5); // $req: 1; $opt: 2; number of params: 3
```
## Hủy bỏ đối số - Argument Unpacking
Bạn cũng có thể sử dụng toán tử splat để thực hiện ngược lại khi truyền đối số cho hàm. Mảng và đối tượng **Traversable** có thể sử dụng làm đối số truyền vào
```php
<?php
function add($a, $b, $c) {
    return $a + $b + $c;
}

$operators = [2, 3];
echo add(1, ...$operators); // 6
```
## Hàm lũy thừa sử dụng **
Toán tử **\**** đã được đưa vào để hỗ trợ chức năng lũy thừa, cùng với đó là toán tử **\**=** dùng trong trường hợp viết tắt.
```php
<?php
printf("2 ** 3 ==      %d\n", 2 ** 3); //2 ** 3 ==      8
printf("2 ** 3 ** 2 == %d\n", 2 ** 3 ** 2); // 2 ** 3 ** 2 == 512

$a = 2;
$a **= 3;
printf("a ==           %d\n", $a); // a ==           8
```
# Kết
Bài này mình xin kết thúc ở đây. Trong phần Lập trình hướng đối tượng trong PHP mình sẽ viết tiếp 1 bài chủ yếu là giới thiệu chuẩn PSR và SOLID trong lập trình PHP. Cảm ơn mọi người đã theo dõi.