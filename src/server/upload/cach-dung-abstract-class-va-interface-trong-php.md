# Giới thiệu
* Hiện nay mặc dù OOP (Object Oriented Programming) đã rất phổ biến nhưng đa số (trong đó có mình :D) vẫn còn khá mơ hồ trong việc phân biệt và định nghĩa hai khái niệm Interface và Abstract class.
* Thậm chí có một số người đã đi làm từ 1 đến 2 năm mà khi mình hỏi khi nào dùng Abstract, khi nào dùng Interface củng không biết trả lời sao. Chắc khi do đi làm toàn dùng framework nên ít đụng đến cái này :D.
* Bài viết này chúng ta sẽ tìm hiểu kỹ hơn về khái niệm và sự khác biệt giữa Interface và Abstract trong OOP nói chung và trong PHP nói riêng.
# Nội dung
### Đầu tiên chúng ta sẻ tìm hiểu khái niệm của chúng
**1.  Abstract Class là gì ?**
* Lớp trừu tượng đơn giản được xem như một class cha cho tất cả các Class có cùng bản chất. 
* Do đó mỗi lớp dẫn xuất (lớp con) chỉ có thể kế thừa từ một lớp trừu tượng bằng từ khóa extends.
* Lớp con kế thừa từ lớp trừu tượng có thể override các phương thức trừu tượng trong đó.
* Lớp trừu tượng có thể khai báo các thuộc tính và các phương thức bình thường và không có thuộc tính trừu tượng (lớp trừu tượng không cho phép khởi tạo tham số, chỉ khai báo mà thôi).
* Bên cạnh đó nó không cho phép tạo instance, nghĩa là sẽ không thể tạo được các đối tượng thuộc lớp đó. 
Ví dụ Animal là 1 class trừu tượng thì không thể khai báo : `$animal = new Animal`

* Các phương thức được định nghĩa là abstract trong abstract class thì chỉ khai báo tên hàm và không viết nội dung hàm trong đó. Nội dung sẻ được viết trong class kế thừa khi override lại phương thức đó.

**Mình có 1 cái ví dụ đơn giản như thế này.**
```
<?php
// lop truu tuong Animal
abstract class Animal
{
    protected $name;
    
    abstract function run();  // phuong thuc truu tuong voi khai báo với tu khoa abstract và không có thân hàm
}

// lớp Dog kế thừa từ lớp trừu tượng Animal  
class Dog extends Animal
{
    public function run () //phương thức này được override lại và viết thân hàm cho nó
    {
        echo "Con chó chạy bằng 4 chân";
    }
}

// lớp Person kế thừa từ lớp trừu tượng Animal 
class Person extends Animal
{
    public function run () //phương thức này được override lại và viết thân hàm cho nó
    {
        echo "Con người chạy bằng 2 chân";
    }
}
```
**2.  Interface là gì ?**
* Interface không phải là 1 lớp. Nó được mô tả như là 1 bản thiết kế cho các class có chung cách thức hoạt động.
* Vì không phải là 1 lớp nên không thể định nghĩa các thuộc tính, khởi tạo đối tượng mà chỉ khai báo các phương thức.
* Các phương thức chỉ khai báo tên hàm và không viết nội dung hàm trong đó. 
* Không có khái niệm phạm vi của phương thức, tất cả đều là public.
* Lớp con kế thừa từ interface sẻ phải override tất cả các phương thức trong đó.
* Một lớp có thể kế thừa từ nhiều interface khác nhau bằng từ khóa implements

**Mình củng có ví dụ đơn giản về interface.**
```
<?php
// interface Move
interface Move 
{
    function run();
}

// lớp Dog kế thừa interface Move 
class Dog implements Move
{
    public function run () //phương thức này được override lại và viết thân hàm cho nó
    {
        echo "Con chó chạy bằng 4 chân";
    }
}

// lớp Car kế thừa interface Move  
class Car implements Move
{
    public function run () //phương thức này được override lại và viết thân hàm cho nó
    {
        echo "Xe hơi chạy bằng 4 bánh";
    }
}
```
### Khi nào dùng interface và khi nào dùng Abstract Class.
Đọc xong cái đống trên kia chắc bạn đang tự hỏi. Vậy Abstract và Interface có cách dùng khá giống nhau. Vậy tại sao phải tạo ra 2 cái làm gì ? :D.
* Nhìn chung abstract class và interface đều được coi như 1 "bản thiết kế" cho các class con kế thừa nó. 
>  Vì sao lại gọi là "bản thiết kế"?
* Gọi là "bản thiết kế" vì  ví dụ như trong 1 dự án, bạn muốn ép buộc người lập trình phải tuân thủ theo một số các phương thức và các phương thức này đã được định nghĩa sẵn những thứ cơ bản, để giúp cho lập trình viên có thể kế thừa các phương thức này và phát triển lớp con của họ. Thì bạn phải tạo ra các abstract class hoặc interface và liệt kê các phương thức cần thiết trong đó.  Do đó abstract class và interface chỉ chứa các khai báo mà không quan tâm bên trong các hàm thực hiện những gì.

**Abstract Class là "bản thiết kế" cho Class:**

*  Về bản chất thì abstract class là 1 class nên nó có thể khai báo thêm các thuộc tính và phương thức khác không phải trừu tượng. Nó được xem như "bản thiết kế" cho class vì những class extends lại từ nó ngoài override lại các phương thức trừu tượng của nó thì còn có thể sử dụng các thuộc tính của nó.
* Trong ví dụ abstract class ở trên, 2 class kế thừa abstract class Animal đều có cùng bản chất là động vật. Chúng có thể sử dụng được biến `$name` trong abstract class Animal.

**Interface là "bản thiết kế" cho Method:**

* Interface không phải là class nên chỉ dùng để khai báo các phương thức. Nó được xem như "bản thiết kế" cho method vì những class implements lại nó đều phải override lại các phương thức của nó.
* Trong ví dụ interface ở trên, 2 class kế thừa từ interface Move không có cùng bản chất. 1 class thuộc động vật và 1 class thuộc phương tiện đi lại. Nhưng chúng có chung hành động là `run()`.

# Kết luận
Sau khi đọc bài này hy vọng các bạn sẻ hiểu hơn về abstract class và interface. Bài viết khá nhiều chữ nên chắc dể gây nhàm chán nhưng tổng kết lại chỉ có 1 số ý sau:
* Abstract thường được sử dụng trong trường hợp các class kế thừa từ nó có cùng bản chất (thuộc 1 nhóm đối tượng)
* Interface thường được sử dụng trong trường hợp các class kế thừa không có cùng bản chất (nhóm đối tượng) nhưng chúng có thể thực hiện các hành động giống nhau.