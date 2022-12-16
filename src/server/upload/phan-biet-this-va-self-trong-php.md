# Giới thiệu
Xin chào các bạn, trong quá trình mới học PHP, chắc hẳn nhiều bạn cũng gặp khó khăn trong việc phân biệt $this và self trong PHP và mình cũng không phải là ngoại lệ. Trong bài viết này, hi vọng những kinh nghiệm đã trả qua và những kiến thức mình đã tìm hiểu có thể giúp các bạn mới tìm hiểu ngôn ngữ PHP phần nào trong việc phân biệt giữa $this và self nhée :D.
### Tổng quan
Từ khóa self và $this đều được sử dụng để tham chiếu tới các thành viên của lớp trong phạm vi của một lớp. Các thành viên ở đây có thể là một biến hoặc hàm. Self dùng để gọi thành phần tĩnh trong PHP còn $this để gọi các thành phần không phải tĩnh,  nhưng liệu $thís có thể gọi các phương thức thuộc tính tĩnh không, self có thể gọi các phương thức thuộc tính thường không, chúng ta hãy cùng tìm hiểu nào.
### 1. $this và self trong đối tượng
Các bạn theo dõi ví dụ sau đây của mình (làm cùng thì càng tốt nha hề hề).
- Tạo một class DoAn và class Pho kế thừa và override phương thức classType() của class DoAn.
```
class DoAn
{
    public function classType()
    {
        echo "Đây là DoAn";
    }

    public function echoClass() {
        self::classType();
    }
}

class Pho extends DoAn
{
    public function classType() {
        echo "Đây là Pho";
    }
}

$pho = new Pho(); 
$pho->echoClass(); // kết quả là Đây là DoAn
```
Trong đoạn code trên, trong hàm echoClass mình sử dụng **self::classType()** nên kết quả sẽ trả về "Đây là DoAn" của lớp DoAn do phương thức echoClass() được khai báo ở class DoAn, và khi mình thay self bằng $this thì:
```
class DoAn
{
    public function classType()
    {
        echo "Đây là DoAn";
    }

    public function echoClass() {
        $this->classType();
    }
}

class Pho extends DoAn
{
    public function classType() {
        echo "Đây là Pho";
    }
}

$pho = new Pho();
$pho->echoClass(); // kết quả là Đây là Pho
```
Kết quả lúc này sẽ là "Đây là Pho" do $this tham chiếu đến các thành viên của đối tượng hiện tại Pho chứ không phải là lớp DoAn. 
Tại đây thì anh em mình có những kết luận là:
> *self sẽ tham chiếu đến class khai báo nó, $this sẽ tham chiếu đến đối tượng hiện tại.
> *self có thể gọi các phương thức không phải là tĩnh (non-static).

### 2. $this và self trong phương thức tĩnh

Mình sẽ tới ví dụ tiếp theo nha
```
class DoAn
{
    public static $type;

    public static function echoClass() {
        $this->type = 'Do An';
    }
}
$doan = new DoAn();
$doan->echoClass(); // lỗi Fatal error: Uncaught Error: Using $this when not in object context in...
```
Xuất hiện lỗi này khi chúng ta sử dụng $this trong static function. Static function có thể gọi trực tiếp từ class mà không cần tạo đối tượng:
```
DoAn::echoClass();
```
Nếu dùng theo cách này thì việc dùng $this là vô nghĩa, do $this dùng để tham chiếu đến đối tượng hiện tại mà chúng ta lại không làm việc với đối tượng nào lúc này. Bây giờ mình sẽ thay $this bằng self:
```
class DoAn
{
    public static $type;

    public static function echoClass() {
        echo self::$type = 'Do An';
    }
}
$doan = new DoAn();
$doan->echoClass(); // Do An
DoAn::echoClass(); // Do An
```
Kết quả của đoạn code kia lại chạy được như bình thường khi phương thức echoClass() được gọi bằng cả 2 cách.
Nếu mình thay static $type sang $type thì đoạn code sẽ lỗi Fatal error: Access to undeclared static property.. do là các thành phần non-static không được truy cập vào trong một static function.
Chúng ta lại có những kết luận tiếp theo là:
> *$thís không thể sử dụng trong các phương thức tĩnh.
### 3. $this và self khi truy cập phương thức tĩnh và thuộc tính tĩnh

Đầu tiên chúng ta cùng xem xem liệu $this và self có thể gọi các phương thức tĩnh hay không nha. Mình có 2 ví dụ sau, đầu tiên sử dụng self:
```
class DoAn
{
    public static function echoClass()
    {
        echo 'Do An';
    }

    public function useSelf()
    {
        self::echoClass();
    }
}
$doan = new DoAn();
$doan->useSelf(); // kết quả là Do An
```
và 
```
class DoAn
{
    public static function echoClass()
    {
        echo 'Do An';
    }

    public function useSelf()
    {
        $this->echoClass();
    }
}
$doan = new DoAn();
$doan->useSelf(); // kết quả là Do An
```
Kết quả của cả ví dụ trên đều như nhau, vậy nên:
> Có thể gọi static function bằng $this

Sau khi qua các phương thức static, mình sẽ thử với thuộc tính static thông qua ví dụ, đầu tiên là sử dụng $this:
```
class DoAn
{
    public static $type = 'Do An';

    public function setType($type)
    {
        $this->type = $type;
    }

    public function echoType()
    {
        echo $this->type;
    }
}

$doan = new DoAn();
$doan->echoType(); // lỗi Notice: Undefined property: DoAn::$type
```
Mình có khai báo $type trong class, vậy tại sao lại báo lỗi thuộc tính không được định nghĩa nhỉ ??:D??. Thực ra $type đó không phải là $type ở dòng đầu tiên mà PHP sẽ tự động tạo ra thuộc tính non-static có tên là $type và $this không hề gọi được các thuộc tính tĩnh, khi thay $this bằng self:
```
class DoAn
{
    public static $type = 'Do An';

    public function setType($type)
    {
        self::$type = $type;
    }

    public function echoType()
    {
        echo self::$type;
    }
}

$doan = new DoAn();
$doan->echoType(); // kết quả là Do An
```
thì code sẽ chạy bình thường. Từ đây ta có tiếp là:
> Không thể dùng $this để truy cập cũng như thay đổi giá trị thuộc tính static mà bắt buộc phải dùng self

Qua những ví dụ trên, mình tóm tắt lại như sau:

| $this | self |
| -------- | -------- |
| Tham chiếu đến các thành phần của đối tượng hiện tại     | Tham chiếu đến các thành phần của class hiện tại     |
|Không dùng được dùng trong static function|Có dùng được bên trong static function|
|Không thể truy cập cũng như thay đổi giá trị của thuộc tính static|Có thể truy cập cũng như thay đổi giá trị của thuộc tính static|
|Đều có thể gọi static function |Đều có thể gọi static function |
||Làm mất tính đa hình|
Cảm ơn các bạn đã theo dõi bài viết của mình, mong rằng có thể giúp các bạn :D.
* Tài liệu tham khảo: https://www.programmerinterview.com/php-questions/php-self-vs-this/