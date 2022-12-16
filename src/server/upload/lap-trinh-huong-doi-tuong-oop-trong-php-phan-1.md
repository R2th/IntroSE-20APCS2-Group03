Khi mới làm quen với lập trình chúng ta thường bắt đầu với các ngôn ngữ như Pascal, C là những ngôn ngữ lập trình cấu trúc với việc thực hiện mã lệnh tuần tự kèm theo các câu lệnh điều kiện và các vòng lặp. Kiểu lập trình này giúp chúng ta có thể nhanh chóng tiếp cận và thực hành, nhưng với các dự án dần dà nó có những yếu điểm trong phát triển phần mềm. Từ các các điểm yếu trên chúng ta có **"lập trình hướng đối tượng ra đời"**.

### **1. Lập trình hướng đối tượng là gì?**

OOP viết tắt của Object-Oriented Programming – Lập trình hướng đối tượng ra đời giải quyết các vấn đề mà lập trình truyền thống gặp phải. Lập trình hướng đối tượng không chỉ đơn giản là các cú pháp, câu lệnh mới mà còn là một cách tư duy mới khi giải quyết một vấn đề. Thực tế khi làm một việc gì đó, chúng ta sẽ quan tâm đến hai điều: vật bị tác động và hành động. Với lập trình cũng vậy, nếu chúng ta tập trung vào hành động thì đó là lập trình hướng thủ tục còn nếu tập trung vào các vật thể thì đó là lập trình hướng đối tượng. Với cả hai cách giải quyết vấn đề, đều cho chúng ta một kết quả như nhau, chỉ có một điều khác nhau là cách chúng ta tập trung vào cái gì?

Trong lập trình hướng đối tượng OOP, có hai thuật ngữ rất quan trọng là lớp (class) và đối tượng (object). Class là định nghĩa chung cho một vật, để dễ tưởng tượng bạn có thể nghĩ đến class là một bản thiết kế trong khi đó đối tượng là một thực hiện cụ thể của bản thiết kế. Ví dụ, object là một ngôi nhà cụ thể thì class là bản thiết kế ngôi nhà đó. Lập trình hướng đối tượng là cách bạn thiết kế các class và sau đó thực hiện chúng thành các đối tượng trong chương trình khi cần.

Lập trình hướng đối tượng có 4 tính chất chính:

- Tính trìu tượng (abstraction).
- Tính kế thừa (inheritance).
- Tính đóng gói (encapsulation).
- Tính đa hình (polymorphism).

### **2. Ưu điểm của lập trình hướng đối tượng**

Vì lập trình hướng đối tượng ra đời sau nên nó khắc phục được tất cả các điểm yếu của các phương pháp lập trình trước đó. Cụ thể nó các ưu điểm sau:

- Dễ dàng quản lý code khi có sự thay đổi chương trình.
- Dễ mở rộng dự án.
- Tiết kiệm được tài nguyên đáng kể cho hệ thống.
- Có tính bảo mật cao.
- Có tính tái sử dụng cao.

### **3. Một số khái niệm cơ bản trong lập trình hướng đối tượng**

***3.1. Đối tượng (object):***

- Trong lập trình hướng đối tượng, đối tượng được hiểu như là 1 thực thể: người, vật hoặc 1 bảng dữ liệu, . . .
- Một đối tượng bao gồm 2 thông tin: thuộc tính và phương thức:
    
    - Thuộc tính chính là những thông tin, đặc điểm của đối tượng. Ví dụ: một người sẽ có họ tên, ngày sinh, màu da, kiểu tóc, . . .
    -  Phương thức là những thao tác, hành động mà đối tượng đó có thể thực hiện. Ví dụ: một người sẽ có thể thực hiện hành động nói, đi, ăn, uống, . . .

***3.2 Lớp (class):***

- Các đối tượng có các đặc tính tương tự nhau được gom lại thành 1 lớp đối tượng.
- Bên trong lớp cũng có 2 thành phần chính đó là thuộc tính và phương thức.
- Ngoài ra, lớp còn được dùng để định nghĩa ra kiểu dữ liệu mới.

Và để khai báo nó trong PHP thì chúng ta sử dụng cú pháp sau:
```php
class Name
{
//code
}
```
Trong đó: Name là tên của class. Nó có các rằng buộc về tên giống như đặt tên hàm trong hướng thủ tục.

***3.3 Sự khác nhau giữa đối tượng và lớp:***

- Lớp là một khuôn mẫu còn đối tượng là một thể hiện cụ thể dựa trên khuôn mẫu đó.
- Để dễ hiểu hơn mình sẽ lấy một ví dụ thực tế:

    - Để dễ hiểu hơn mình sẽ lấy một ví dụ thực tế:
        
        - Các thông tin, đặc điểm như 4 chân, 2 mắt, có đuôi, có chiều cao, có cân nặng, màu lông . . .
        - Các hành động như: kêu meo meo, đi, ăn, ngủ, . . .
    -  Như vậy mọi động vật thuộc loài mèo sẽ có những đặc điểm như trên.
    -  Đối tượng chính là một con mèo cụ thể nào đó.

### **4. Các tính chất của lập trình hướng đối tượng**

***4.1. Tính trìu tượng (abstraction)***

Trìu tượng hóa là quá trình đơn giản hóa một đối tượng mà trong đó chỉ bao gồm những đặc điểm quan tâm và bỏ qua những đặc điểm chi tiết nhỏ. Quá trình trừu tượng hóa dữ liệu giúp ta xác định được những thuộc tính, hành động nào của đối tượng cần thiết sử dụng cho chương trình.

Để hiểu rõ về tính trìu tượng chúng ta sẽ tìm hiểu về `Abstract class` và `Interface.`

*4.1.1. Abstract class* 

Lớp `Abstract` sẽ định nghĩa các phương thức (hàm) mà từ đó các lớp con sẽ kế thừa nó và `Overwrite` lại (tính đa hình).

Đối với lớp này thì nó sẽ có các điểm khác sau:

- Các phương thức ( hàm ) khi được khai báo là abstract thì chỉ được định nghĩa chứ không được phép viết code xử lý trong phương thức.
- Trong `abstract class` nếu không phải là phương thức abstract thì vẫn khai báo và viết code được như bình thường.
- Phương thức abstract chỉ có thể khai báo trong `abstract class`. 
- Các thuộc tính trong abstract class thì không được khai báo là `abstract`.
- Không thể khởi tạo một `abstract class`.
- Vì không thể khởi tạo được `abstract class` nên các phương thức được khai báo là `abstract` chỉ được khai báo ở mức độ `protected` và `public`.
- Các lớp kế thừa một `abstract class` phải định nghĩa lại tất cả các phương thức trong `abstract class` đó ( nếu không sẽ bị lỗi).

Và để khai báo một `abstract class` ta dùng cú pháp sau:

```
abstract class ClassName
{

}
```
    
Trong đó: **ClassName** là tên của class chúng ta cần khai báo.

Cú pháp khai báo một phương thức `abstract`:

    abstract visibility function methodName();
    
Trong đó: `visibility` là một trong 2 từ khóa `public`, `protected` hoặc có thể bỏ trống (bỏ trống thì là `public`), methodName là tên của phương thức chúng ta cần khai báo.

*Ví dụ 1: khai báo một phương thức abstract trong abstract class*

```
abstract class ConNguoi
{
    //khai báo một abstract method đúng
    abstract public function getName();

    //Sai vì abstract class không thể viết code xử lý được
    abstract public function getHeight()
    {
        //
    }
}
```
    
*Ví dụ 2: Phải định nghĩa lại các phương thức `abstract` của `abstract class` đó khi kế thừa.*

```
abstract class ConNguoi
{
    protected $name;
    abstract protected function getName();
}

//class này sai vì chưa định nghĩa lại phương thức abstracs getName
class NguoiLon extends ConNguoi
{
    //
}

//class này đúng vì đã định nghĩa lại đầy đủ các phương thức abstract
class TreTrau extends ConNguoi
{
    public function getName()
    {
        return $this->name;
    }
}
```

*4.1.2. Interface*

`Interface` trong hướng đối tượng là một khuôn mẫu, giúp cho chúng ta tạo ra bộ khung cho một hoặc nhiều đối tượng và nhìn vào interface thì chúng ta hoàn toàn có thể xác định được các phương thức và các thuộc tính cố định (hay còn gọi là hằng) sẽ có trong đối tượng implement nó.

Để khai báo `interface` trong PHP chúng ta dùng cú pháp:

```
interface InterfaceName
{

}
```

Trong đó: **InterfaceName** là tên của interface các bạn muốn đặt.

**Tính chất của interface**

- `Interface` không phải là một đối tượng.
- Trong `interface` chúng ta chỉ được khai báo phương thức chứ không được định nghĩa chúng.
- Trong `interface` chúng ta có thể khai báo được hằng nhưng không thể khai báo biến.
- Một `interface` không thể khởi tạo được (vì nó không phải là một đối tượng).
- Các lớp `implement` `interface` thì phải khai báo và định nghĩa lại các phương thức có trong `interface` đó.
- Một `class` có thể `implements` nhiều `interface`.
- Các `interface` có thể kế thừa lẫn nhau.

*4.1.3. So sánh giữa `interface` và `abstract class`*

Những điểm giống nhau giữa interface và abstract class:

- Đều không thể khởi tạo đối tượng.
- Đều có thể chứa phương thức abstract.

Những điểm khác nhau:



| Interface | Abstract class |
| -------- | -------- |
| Chỉ có thể kế thừa nhiều interface khác.    | Có thể kế thừa từ 1 lớp và nhiều interface.     |
| Chỉ chứa các khai báo và không có phần nội dung  | Có thể chứa các thuộc tính thường và các phương thức bình thường bên trong.     |
| Không có constructor và cũng không có destructor.   | Có constructor và destructor.     |
| Phạm vi truy cập mặc định là public    | Có thể xác định modifier.    |
| Dùng để định nghĩa 1 khuôn mẫu hoặc quy tắc chung.    | Dùng để định nghĩa cốt lõi của lớp, thành phần chung của lớp và sử dụng cho nhiều đối tượng cùng kiểu.    |
| Cần thời gian để tìm phương thức thực tế tương ứng với lớp dẫn đến thời gian chậm hơn 1 chút.    | Nhanh hơn so với interface.     |
| Khi ta thêm mới 1 khai báo. Ta phải tìm hết tất cả những lớp có thực thi interface này để định nghĩa nội dung cho phương thức mới.    | Đối với abstract class, khi đĩnh nghĩa 1 phương thức mới ta hoàn toàn có thể định nghĩa nội dung phương thức là rỗng hoặc những thực thi mặc định nào đó. Vì thế toàn bộ hệ thống vẫn chạy bình thường.   |

***4.2. Tính kế thừa (inheritance)***

Tính kế thừa trong lập trình hướng đối tượng cho phép một lớp (class) có thể kế thừa các thuộc tính và phương thức từ các lớp khác đã được định nghĩa. Lớp được kế thừa còn được gọi là lớp cha và lớp kế thừa được gọi là lớp con.

Điều này cho phép các đối tượng có thể tái sử dụng hay mở rộng các đặc tính sẵn có mà không phải tiến hành định nghĩa lại.

Trong PHP để khai báo kế thừa từ một lớp cha chúng ta sử dụng từ khóa `extends` theo cú pháp:

```
class childClass extends parentClass
{
    //code
}
```
    
Trong đó: childClass là `class` mà các bạn đang muốn khởi tạo, parentClass là class cha mà childClass đang muốn kế thừa nó.

***4.3. Tính đóng gói (encapsulation)***

Tính đóng gói là tính chất không cho phép người dùng hay đối tượng khác thay đổi dữ liệu thành viên của đối tượng nội tại. Chỉ có các hàm thành viên của đối tượng đó mới có quyền thay đổi trạng thái nội tại của nó mà thôi. Các đối tượng khác muốn thay đổi thuộc tính thành viên của đối tượng nội tại, thì chúng cần truyền thông điệp cho đối tượng, và việc quyết định thay đổi hay không vẫn do đối tượng nội tại quyết định.
Trong PHP việc đóng gói được thực hiện nhờ sử dụng các từ khoá `public`, `private` và `protected`:

- `Private` là giới hạn hẹp nhất của thuộc tính và phương thức trong hướng đối tượng. Khi các thuộc tính và phương thức khai báo với giới hạn này thì các thuộc tính phương thức đó chỉ có thể sử dụng được trong class đó, bên ngoài class không thể nào có thể sử dụng được nó kể cả lớp kế thừa nó cũng không sử dụng được, nếu muốn lấy giá trị hoặc gán giá trị ở bên ngoài class thì chúng ta phải thông qua hai hàm `SET` và `GET`.
- Khác với `private` một chút thì các phương thức và  thuộc tính khi khai vào với visibility là `protected` thì chúng ngoài được sử dụng trong `class` đó ra thì `class` con kết thừa từ nó cũng có thể sử dụng được, như bên ngoài `class` không có thể sử dụng được.
- Đây là `visibility` có mức độ truy cập rộng nhất trong hướng đối tượng, khi một thuộc tính hay phương thức sử dụng `visibility` này thì chúng ta có thể tác động vào thuộc tính hay phương thức đó từ cả trong lẫn ngoài `class`. Thông thường khi không khai báo `visibility` thì chương trình dịch tự nhận nó là `public` nhưng để cho đúng chuẩn thì mọi người lên khai báo từ khóa này vào thay vì bỏ trống.

***4.4. Tính đa hình (polymorphism)***

Tính đa hình trong lập trình hướng đối tượng là sự đa hình của mỗi hành động cụ thể ở những đối tượng khác nhau. Ví dụ hành động ăn ở các loài động vật hoàn toàn khác nhau như: con heo ăn cám, hổ ăn thịt, con người thì ... ăn hết =)).

Đó là sự đa hình trong thực tế, còn đa hình trong lập trình thì được hiểu là Lớp Con sẽ viết lại những phương thức ở lớp cha (ovewrite).

Các class cùng `implement` một `interface` nhưng chúng có cách thức thực hiện khác nhau cho các `method` của `interface` đó.

### **5. Thế nào là một hàm static. Phân biệt cách dùng từ khoá static::method() với self::method()**

***5.1. Static là gì?***

Static trong lập trình hướng đối tượng là một thành phần tĩnh (có thể là thuộc tính hoặc phương thức) mà nó hoạt động như một biến toàn cục, dù cho nó có được xử lý ở trong bất kỳ một file nào đi nữa (trong cùng một chương trình) thì nó đều lưu lại giá trị cuối cùng mà nó được thực hiện vào trong lớp.

Để khai báo một thuộc tính hay một phương thức là `static` thì chúng ta chỉ việc thêm từ khóa `static` sau `vibsility`.

```
class ClassName
{
    //khai báo thuộc tính tĩnh
    visibility static $propertyName;
    //Khai báo phương thức tĩnh
    visibility static function methodName()
    {
        //
    }
}
```
    
Khi bạn khai báo một thuộc tính hay một phương thức ở dạng `static` thì bạn sẽ không thể gọi bằng cách thông thường là dùng từ khóa this được nữa mà sẽ có các cách gọi khác như sau:

**Gọi phương thức và thuộc tính tĩnh trong class**

Để gọi phương thức và thuộc tính tĩnh trong class thì chúng ta có thể sử dụng cú pháp selft::ten hoặc ClassName::ten hoặc static::ten.

```
class ConNguoi
{
    private static $name = 'Hoi lam gi';
    public static function getName()
    {
        //gọi thuộc tính tĩnh
        return self::$name;
        //hoặc
        return ConNguoi::$name;
    }

    public function showAll()
    {
        //gọi phương thức tĩnh
        return  self::getName();
        //hoặc 
        return ConNguoi::getName();
    }
}
```

**Gọi phương thức và thuộc tính tĩnh ngoài class**

Để gọi phương thức tĩnh ở bên ngoài class thì chúng ta gọi theo cú pháp ClassName::tenPhuongThuc(), ClassName::$tenthuoctinh.

```
class ConNguoi
{
    public static $name = 'Hoi lam gi';
    public static function getName()
    {
        //gọi thuộc tính tĩnh
        return self::$name;
        //hoặc
        return ConNguoi::$name;
    }
    public static function showAll()
    {
        //gọi phương thức tĩnh
        return  self::getName();
        //hoặc 
        return ConNguoi::getName();
    }
}
//gọi thuộc tính tĩnh
ConNguoi::$name;
//gọi phương thức tĩnh
ConNguoi::showAll();
```

***5.2. Phân biệt cách dùng từ khoá static::method() với self::method()***

Nhìn chung thì cả self và static đều dùng để gọi các thành phần tĩnh trong đối tượng, nhưng nếu chỉ đơn thuần như trong nội bộ class thì cả 2 keywords này đều cho ra kết quả tốt.

```
class ConNguoi
{
    private static $name = 'ConNguoi';

    public static function getName()
    {
        echo self::$name;
        echo '<br>';
        echo static::$name;
    }
}

ConNguoi::getName();

//ConNguoi
//ConNguoi
```
    
Vậy liệu nó có cho ra các giá trị khác nhau khi chúng ta sử dụng tính kế thừa trong class? Để biết rõ hơn thì chúng ta sẽ tạ ra các ví dụ để so sánh nó.

```
class ConNguoi
{
    private static $name = 'ConNguoi';

    public static function getName()
    {
        echo self::$name;
        echo '<br>';
        echo static::$name;
    }
}
class NguoiLon extends ConNguoi
{
    private static $name = 'NguoiLon';
}

NguoiLon::getName();
```
    
Sau khi chạy dòng trên thì mình thu được kết quả như sau:
    
    
```
ConNguoi

Fatal error: Cannot access private property NguoiLon::$name
```

Như các bạn đã thấy: Đối với self thì kết quả chạy như bình thường, còn với static thì sao nó lại báo là không thể truy cập vào thuộc tính private mà lại là NguoiLon::$name, phải chăng thằng static này đại diện cho đối tượng hiện tại nên không thể truy xuất được đến thuộc tính $name. Dể chắc ăn hơn thì mình thử đổi visibility của biến $name thành protected xem sao?

```
class ConNguoi
{
    protected static $name = 'ConNguoi';

    public function getName()
    {
        echo self::$name;
        echo '<br>';
        echo static::$name;
    }
}

class NguoiLon extends ConNguoi
{
    protected static $name = 'NguoiLon';
}
// NguoiLon::getName();
$a = new NguoiLon();
$a->getName();
```
    
Và đây là kết quả mình nhận được:

    ConNguoi
    NguoiLon
    
Giờ đã chạy được ngon lành, nhưng khi nó lại cho ra 2 kết quả khác nhau. Từ 2 ví dụ trên chúng ta tạm đưa ra  kết luận là static nó có nguyên tắc gần như $this, là đều truy xuất đến đối tượng hiện tại.

Để hiểu hơn nữa thì mình sẽ tiếp tục tạo ra ví dụ sau và chạy nó:

```
class ConNguoi
{
    protected static $name = 'ConNguoi';

    public static function getSelf()
    {
        return new self;
        // or
        // return new static();
    }
    public static function getStatic()
    {
        return new static;
        // or
        // return new static();
    }
}

class NguoiLon extends ConNguoi
{
}
echo get_class(NguoiLon::getSelf()); //ConNguoi
echo get_class(NguoiLon::getStatic()); //NguoiLon
```
    
Ok, nó đã chạy được và cho ra kết quả giống với kết luận ở trên.

**=> Kết luận:**
- Self: Truy xuất đến class khai báo nó.
- Static: Truy xuất đến đối tượng hiện tại.
     
### Kết luận
Trên đây là một số điều mình tổng hợp được về một số vấn đề về Lập trình hướng đối tượng trong PHP. Trong bài sau, mình sẽ đề cập đến `Trait`, `Namespaces`, `magic functions`, và` các quy tắc trong PSR-2`.
Cảm ơn các bạn đã theo dõi.

Nguồn tham khảo:

- https://freetuts.net/
- https://allaravel.com/
- https://toidicode.com/
- http://www.howkteam.vn/