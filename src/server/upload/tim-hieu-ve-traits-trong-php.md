### Lời mở đầu
Xin chào các bạn 😄 trong bài viết lần này chúng ta cùng nhau tìm hiểu về **Traits** trong PHP,  và cách sử dụng **Traits** nha!
### Giới thiệu về Traits
PHP là một ngôn ngữ kế thừa đơn, một lớp con chỉ có thể kế thừa từ một lớp cha duy nhất. Điều này có thể đặt ra vấn đề về việc sử dụng lại mã, nếu lớp cần kế thừa nhiều phương thức.

Từ PHP 5.4 trở đi, PHP đã hỗ trợ **Traits** để khắc phục những giới hạn của đơn kế thừa. **Traits** có thể hiểu là nơi tập hợp một nhóm phương thức cho phép lập trình viên tận dụng khả năng tái sử dụng lại code một cách đơn giản hơn là kế thừa như trước.
 
### Vì sao nên sử dụng  Traits

* **Traits** có chức năng gom lại các phương thức và thuộc tính mà chúng ta muốn sử dụng lại nhiều lần từ đó giúp giảm việc lặp code..
* **Traits** tránh được việc kế thừa nhiều tầng khá phức tạp trong tổng thể hệ thống, sẽ khó maintain sau này.
* Định nghĩa ngắn gọn, sau đó có thể đặt sử dụng ở những nơi cần thiết, sử dụng được ở nhiều class cùng lúc.
* Các phương thức trong **Traits** có thể bị override lại trong class sử dụng nó.
* **Traits** trong PHP có thể có các phương thức và phương thức trìu tượng để có thể sử dụng trong nhiều lớp và các phương thức có thể có bất kì mức độ truy cập nào (public, private hoặc protected).

### Nhược điểm của Traits
*  **Traits** được tạo ra chủ yếu dựa trên tư tưởng “copy and paste” code giữa các class. Điều này có thể tạo ra **Traits**  mang quá nhiều trách nhiệm dẫn đến vi phạm nguyên tắc Single Responsibility Principle trong SOLID.
* Sử dụng **Traits** khiến chúng ta khó khăn trong việc xem tất cả các phương thức của một class, do vậy khó để có thể phát hiện được một phương thức bất kỳ có bị trùng lặp hay không

### Cách sử dụng Traits
Tạo một **Traits** thật dễ dàng
```
<?php
trait TraitName {
    public function log() {
        echo "Hello world";
    }
}
```

Tiếp theo là để sử dụng **Trait** trong một class, ta sử dụng từ khóa  **use** như ví dụ sau :
```
class ClassName
{
    use TraitName; // goi den trait

    // code cua ban :D 
}
```

Trong đó:

* ClassName: là tên của class mà bạn sử dụng **Traits**
* TraitName: là tên của **Traits** mà bạn muốn dùng.

Thật dễ dàng phải không, nhưng điều gì sẽ xảy ra khi một class  tồn tại phương thức có cùng tên với một phương thức được bao gồm trong **Traits**? Hãy cùng xem ví dụ dưới đây
```
class ClassName {
    use TraitName;

    public function log() {
        echo "Hello Viet Nam";
    }
}
```
Và chúng ta sẽ nhận được kết quả
```
$test = new ClassName();
$test->log();
// "Hello Viet Nam"
```

Vậy điều gì xảy ra nếu class **ClassName** kế thừa phương thức log() từ một class cha khác

```
class Base {
    public function log() {
        echo "I am a method of the Base class!";
    }
}

class ClassName extends Base {
    use TraitName;
}

$test = new ClassName();
$test->log();
"Hello World"
```

Điều nay có nghĩa là phương thức log của class **Base** đã bị ghi đè với phương thức log của **Traits**. Khi sử dụng **Traits**  trong class bạn nên chú ý rằng
1. Các phương thức của **Traits** ghi đè các phương thức được kế thừa từ lớp cha
2.  Các phương thức của lớp hiện tại ghi đè lên phương thức của **Traits**


### Sử dụng nhiều Traits trong class

Bên trong một class, chúng ta có thể sử dụng nhiều **Traits** , tất cả những gì chúng ta phải làm là sử dụng từ khóa **use** và giữa các **TraitsName** được phân tách bằng dấu phẩy:
```
class ClassNameA {
    use TraitOne, TraitTwo;
}
```

### Ưu tiên phương thức trong traits

Giả sử các bạn có 2 **TraitA** và **TraitB**, và trong cả 2 traits này đều có chung một method tên là methodC():
```
<?php

trait TraitA
{
    public function methodA() 
    {
        echo 'Day la methodA cua TraitA';
    }

    public function methodC()
    {
        echo 'Day la methodC cua TraitA';
    }
}
```

```
<?php

trait TraitB
{
    public function methodB() 
    {
        echo 'Day la methodB cua TraitB';
    }

    public function methodC() 
    {
        echo 'Day la methodC cua TraitB';
    }
}
```

Tiếp theo là định nghĩa ClassA use hai Traits trên

```
?php

include 'traitA.php';
include 'traitB.php';

class ClassA
{
    use TraitA, TraitB;
}

$a = new ClassA;
$a->methodA(); // 'Day la methodA cua TraitA'
echo '<br>';
$a->methodB(); // 'Day la methodB cuar TraitB'
echo '<br>';
$a->methodC(); // Không có kết quả trả về.
```

Để xử lý tình huống trên, chúng ta sử dụng **insteadof** để xét độ ưu tiên cho phương thức  muốn sử dụng:
```
<?php

include 'traitA.php';
include 'traitB.php';

class ClassA
{
    use TraitA, TraitB {
        TraitB::methodC insteadOf TraitA;
    }
}
```
Hoặc có thể override lại methodC() ở trong ClassA:
```
<?php

include 'traitA.php';
include 'traitB.php';

class ClassA
{
    use TraitA, TraitB;

    public function methodC()
    {
        return $this->methodB();
    }   
}

$a = new ClassA;
$a->methodA(); // 'Day la methodA cua TraitA'
echo '<br>';
$a->methodB(); // 'Day la methodB cuar TraitB'
echo '<br>';
$a->methodC(); // 'Day la methodB cuar TraitB'
```

### Traits lồng nhau
Bạn có thể dễ dàng sử dụng **Traits** lồng nhau
```
trait A
{
   //
}
trait B
{
    use A;
   // 
}
```

### Sự khác biệt giữa Traits và Abstract Class
Traits khác với **Abstract Class** vì nó không dựa trên sự kế thừa.Class có thể sử dụng nhiều **Traits** nhưng chỉ kế thừa 1 **Abstract Class**.  **Abstract Class** được hiểu là class cha cho các class con có cùng bản chất  kế thừa, còn việc sử dụng **Traits** giống như là bạn copy lại những đoạn code có cùng một cách xử lý vào trong bất cứ class bạn cần dùng vậy.

###  Sự khác biệt giữa Traits và Interface
Có thể nói **Traits** và **Interface** khá giống nhau về tính chất sử dụng. Cả hai đều không thể sử dụng nếu không có một class được implements cụ thể. Tuy nhiên, **Interface**  được mô tả như là một bản thiết kế chung cho các class, **Interface** chỉ khai báo các phương thức  cho các class  implements sẽ phải override tất cả các phương thức đó, mỗi một class triển khai  lại có các cách triển khai khác nhau. Trong khi **Traits** là nơi triển khai những đoạn code dùng chung.

### Kết luận
**Traits** là một trong những tính năng mạnh mẽ được giới thiệu trong PHP 5.4. **Traits** cho phép sử dụng lại các đoạn mã theo chiều ngang trên nhiều lớp mà không phải nằm trong cùng một hệ thống phân cấp thừa kế. Trong bài viết này, mình đã giới thiệu xong đến mọi người kiến thức cơ bản của **Traits** trong PHP rồi, bài viết còn nhiều thiếu sót rất mong được các bạn góp ý thêm.
### Tài liệu tham khảo
https://culttt.com/2014/06/25/php-traits/

https://www.geeksforgeeks.org/traits-vs-interfaces-in-php/

https://medium.com/oceanize-geeks/traits-in-php-proper-way-of-implementation-afc4947cd6e8