## Lập trình hướng đối tượng trong PHP


Từ khóa OOP hay lập trình hướng đối tượng có lẽ không còn quá xa lạ với những bạn đam mê theo đuổi ngành lập trình. Nó giống như như các hằng đẳng thức đáng nhớ mà ta học thời còn 14 tuổi vậy, nó là thứ mà bạn phải khắc từng chi tiết vào đầu :) đó là thứ thầy mình dậy, còn thực tế các bạn không cần quá sợ đâu, nó rất gần gũi với cuộc sống sinh hoạt hàng ngày của các bạn, mình sẽ có lấy những ví dụ để các bạn bây giờ mới tìm hiểu, hay ôn lại, hoặc tìm hiểu sâu có thể sử dụng. Ok nhưng cũng phải nói lại, nếu bạn muốn phát triển trong ngành này thì buộc bạn phải hiểu chi tiết về vấn đề này :D, dưới đây là định nghĩa hướng đối tượng theo wikipedia.

> là một mẫu hình lập trình dựa trên khái niệm "công nghệ đối tượng", mà trong đó, đối tượng chứa đựng các dữ liệu, trên các trường, thường được gọi là các thuộc tính; và mã nguồn, được tổ chức thành các phương thức. Phương thức giúp cho đối tượng có thể truy xuất và hiệu chỉnh các trường dữ liệu của đối tượng khác, mà đối tượng hiện tại có tương tác (đối tượng được hỗ trợ các phương thức "this" hoặc "self"). Trong lập trình hướng đối tượng, chương trình máy tính được thiết kế bằng cách tách nó ra khỏi phạm vi các đối tượng tương tác với nhau. Ngôn ngữ lập trình hướng đối tượng khá đa dạng, phần lớn là các ngôn ngữ lập trình theo lớp, nghĩa là các đối tượng trong các ngôn ngữ này được xem như thực thể của một lớp, được dùng để định nghĩa một kiểu dữ liệu.
> 

Để dễ hiểu, lập trình hướng đối tượng là một kỹ thuật lập trình cho phép lập trình viên tạo ra các đối tượng trong code trừu tượng hóa các đối tượng thực tế trong cuộc sống.

## Nội dung
<hr>

### 1. Đóng gói(Encapsulation)
 Là cách che dấu những tính chất bên trong của đối tượng, không thể tác động trực tiếp làm thay đổi tính chất của đối tượng. Chỉ có thể tác động vào những `method public` của đối tượng đó. Nghe nó vẫn hàn lâm đúng không ạ, như ông anh mình từng nói nếu học lập trình mà chỉ nghe lý thuyết thì khó mà có thể hiểu được, trừ một số chuyên gia :D, vậy nên mình sẽ lấy một số ví dụ để chia sẻ cùng các bạn nhé :)
 ```js
 <?php
   class payment{
       private $price;
       private $quantity;
       public function __construct($newPrice, $newQuantity)
       {
           $this->price=$newPrice;
           $this->quantity=$newQuantity;
       }
       public function pay()
       {
           return $this->price*$this->quantity;
       }
       protected function event(){
           return 20/100*$this->pay();
       }
   }

   $cake = new payment(50000, 10);
   echo $cake->pay();
?>
 ```
Như các bạn đã thấy` $price` và` $quantity` là các tính chất của đối tượng `payment`, đối tượng này có một method public để tương tác với các đối tượng khác.

Nếu bạn cố gắng ép kiểu đầu vào là một ký tự vd: $cake=new payment("a", "10") thì khi chạy trương chình nó sẽ hiển thị 0 chứ không báo lỗi, đây là một trong những tác dụng quan trọng của tính đóng gói.

**Chú ý:** Nếu như đối tượng này không thể hiện `public` và bạn cố gắng `echo $cake->event();` thì sẽ báo lỗi. 

**Một số từ khóa các bạn cần chú ý:**
* **Public**: Cho phép truy cập và sử dụng đến các phương thức cũng như thuộc tính ở phạm vi trong, ngoài class và nó hỗ trợ sự kế thừa
* **Private**: Chỉ cho phép truy cập và sử dụng đến các phương thức cũng như thuộc tính ở phạm vi trong class
* **Protected**: Cho phép truy cập và sử dụng đến các phương thức cũng như thuộc tính ở phạm vi trong class và nó hỗ trợ sự kế thừa.
### 2. Kế thừa(Inheritance)
Từ khóa của kế thừa là: **Extend**

Là kỹ thuật cho phép kế thừa lại những tính năng mà một đối tượng khác đã có, giúp tránh việc code lặp dư thừa mà chỉ xử lý công việc tương tự.
* Kế thừa một cấp (**Single level Inheritance**): Với một class cha và một class con
```js
class car{
   public function wheel(){
       echo "4 banh";
   }
   protected function carFrame(){
       echo "mu tran";
   }
   private function boot(){
       echo "ghe xin";
   }
}
class pickupTruck extends car{
   public function weight(){
       parent::wheel();
       echo "4 tan";
   }
}
$information = new pickupTruck();
$information->weight();
```
Trong class `pickupTruck` không có `function wheel `nhưng vẫn có thể sử dụng nhờ vào việc kế thừa từ class `car`
* (**Multiple level Inheritance**): Kế thừa nhiều class.
```js
class car{
   public function wheel(){
       echo "4 banh";
   }
   protected function carFrame(){
       echo "mu tran";
   }
   private function boot(){
       echo "ghe xin";
   }
}
class pickupTruck extends car{
   public function weight(){
       parent::wheel();
       echo "4 tan";
   }
}
class truck extends pickupTruck{
   public function weight()
   {
       parent::wheel();
       echo "16 tan";
   }
}
$information = new truck();
$information->weight();
```
Class `truck` chỉ kế thừa từ class `pickupTruck` nhưng vẫn có thể truy cập method` whell()` được viết từ class `car`.

**Một chú ý nhỏ**: bạn chỉ có thể kế thừa từ các method có mức truy cập là `public` hoặc `protected` chứ không thể kế thừa từ mức truy cập `private`

### 3. Đa hình(Polymorphism)

`Là một đối tượng thuộc các lớp khác nhau có thể hiểu cùng một thông điệp theo cách khác nhau.`

Ví dụ về tính đa hình trong thực tế, ta có 2 con vật: chó và khỉ khi nhân được lệnh kêu, con chó sẽ kêu "gâu gâu", con khỉ sẽ kêu "...".Như vậy ta có thể thấy mặc dù đều nhận được thông điệp nhưng 2 con vật thực hiện theo cách của riêng chúng.

Trong đa hình có 2 tính chất:
* Nạp chồng (Method Overloading)
* Ghi đè(Method Overriding) 

Method Overloading: hay có thể gọi là nạp chồng, tức là method có cùng tên nhưng khác tham số truyền vào, chương trình sẽ dựa vào tham số chuyền vào để nhận biết xem bạn đang gọi method nào. Thường thì mình khuyên các bạn nếu đặt tên hàm lên đặt một cách tường mình, nhất quán, nếu được thì lên là duy nhất, trên hết cần tóm gọn nội dung của hàm đấy. Nó sẽ giúp các rất nhiều trong việc đọc hiểu code :D. PHP không hỗ trợ tính chất này nếu các bạn muốn tìm xâu thì từ khóa các bạn có thể sử dụng là magic method nhé, hoặc bạn có thể theo dõi bài sau mình sẽ cùng bàn luận kỹ hơn vào vấn đề này :)

Method Overriding: Đây là phương thức ghi đè lại các method của lớp cha trước đó, tức là lớp con đặt trùng tên, cùng tham số chuyền vào với phương thức của lớp cha, khi ta gọi lớp con thì phương thức của lớp con sẽ thay thế cho phương thức của lớp cha. Vẫn hơi khó hiểu đúng không ạ, mình xin lấy một ví dụ nhỏ để có thể làm tỏ tường vấn đề hơn nhé :)

```js
class car{
   public function wheel(){
       echo "4 banh";
   }
   protected function carFrame(){
       echo "mu tran";
   }
   private function boot(){
       echo "ghe xin";
   }
}
class pickupTruck extends car{
   public function wheel()
   {
       echo "8 banh";
   }
}
$information = new pickupTruck();
$information->wheel();
```
Như các bạn có thể thấy sau khi chạy kết quả thu được là 8 bánh thay vì 4 bánh như của thằng cha đúng không ạ, cũng tương đối dễ hiểu phải không ạ :).
### 4. Trừu tượng(Abstraction)
`Lớp trừu tượng là một lớp mà nó không thể thực thể hóa thành một đối tượng thực dụng được. Lớp này được thiết kế nhằm tạo ra một lớp có các đặc tính tổng quát nhưng bản thân lớp đó chưa có ý nghĩa (hay không đủ ý nghĩa) để có thể tiến hành viết mã cho việc thực thể hóa.`

Nếu bạn đang tìm kiếm một định nghĩa thì bên trên mình có trích dẫn của wikipedia, nhưng bài viết này mình cố gắng đưa về mức basic nhất và là những gì mà mình đúc kết được nhé. 

Ok :), tính chất này giúp giảm sự phức tạp, tập chung vào những điểm chung nhất hơn là đi sâu khai thác vào từng chi tiết nhỏ, trừu tượng gồm có 2 phương pháp để triển khai gồm abstract class và interface. Như vậy vẫn hơi khó hiểu đúng không ạ :)) ok chúng ta cùng đi vào ví dụ ở phần sau để thấy rõ hơn nhé

### 5. Sự khác biệt giữa abstract class với interface

Chắc chắn khi nhắc đến trừu tượng là các bạn thấy khó hiểu và tương đối buồn ngủ đúng không ạ. Thực chất khi mình còn đang ngồi trên ghế nhà trường cũng từng như vậy rồi ạ nhưng mình sẽ cố nói một cách dễ hiểu nhất để các bạn tiện theo dõi. Nhắc đến đây ta có khái niệm như sau: 

**Abstract class:** Là lớp trừu tượng đơn giản được xem như một class cha cho tất cả các class con cùng bản chất. Do đó mỗi lớp con chỉ có thể kế thừa từ một lớp cha. Bên cạnh đó nó không cho phép tạo instance, nghĩa là sẽ không thể tạo được các đối tượng thuộc lớp đó.

**Interface:** Lớp này được xem như một mặt nạ cho tất cả các Class cùng cách thức hoạt động nhưng có thể khác nhau về bản chất. Từ đó lớp dẫn xuất có thể kế thừa từ nhiều lớp Interface để bổ sung đầy đủ cách thức hoạt động của mình (đa kế thừa - Multiple inheritance).

Vâng đọc song cái khái niệm này mình đoán đa phần các bạn đang ngáp ạ. Nhất là với những bạn mới bắt đầu, đừng vội nản lòng bây giờ chúng cùng đi vào ví dụ để làm rõ vấn đề này hơn nhé :).

Đầu tiên là **interface**, Ok mình cố lấy một ví dụ để các bạn cảm thấy vui vẻ và không nặng nề quá nhé. 
```js
interface peopel{
   public function communication();
   public function think();
}
```
Đầu tiên mình có một interface là `peopel` bên trong mình có các hàm là `communication()` và `think()`, văng một con người cơ bản ta có những đặc điểm đó :).
```js
interface animal{
   public function eat();
   public function sleep();
}
```
Tiếp theo mình có interface là `animal` và mình có những hàm là `eat()` và `sleep()`
```js
class supper{
   public function fly(){
       echo "supper man";
   }
}
```
Tiếp theo tới phần hay này, mình có một class là `supper` đã là supper thì ta cần cái gì đó khác thường đúng không ạ, ở đâu mình có một method là `fly()`
```js
class dcComics extends supper implements peopel, animal {
   public function communication()
   {
       echo "communication interface peopel ";
   }
   public function think()
   {
       echo "think interface peopel";
   }
   public function eat()
   {
       echo "eat interface animal";
   }
   public function sleep()
   {
       echo "sleep interface animal";
   }
}
$supperMan = new dcComics();
$supperMan->fly();
```
Như các bạn đã thấy mình tạo một class là `dcComics` class này mình thực hiện kế thừa từ các `interface peopel` và `animal`, từ khóa để kế thừa interface là **implements** nhé. Và mình cũng thực hiện kế thừa từ một class là `supper`. Văng nếu 2 interface định nghĩa một con người thì `dcComics` cần những người hùng đúng không ạ :). Các bạn cần chú ý 1 chút nếu `dcComics` mà đã **implements** thì tất cả các hàm được khai báo trong `peopel` và `animal` thì bắt buộc bạn phải triển khai, giống như nếu các bạn là một người hùng thì các bạn trước tiên phải là một con người trước đó, và các bạn chú ý nếu các bạn không triển khai thì nó sẽ báo lỗi. 

Hàm interface hỗ trợ đa kế thừa nhé!!!. OK đó là một số chú ý với interface :).

Tiếp theo ta cùng tới với abstract class nhé, mình sẽ tiếp tục làm theo ví dụ trên để các bạn tiện theo dõi nhé :)
```js
abstract class dcComics{
   public function fly(){
       echo "herro fly";
   }
   abstract function abnormal();
}
```
Mình có một abstract là `dcComics`, các bạn chú ý từ khóa **abstract function** có nghĩa là các class con muốn kế thừa từ `dcComics` thì bặt buộc nó phải triển khai hàm `abnormal`
```js
class supperMan extends dcComics{
   public function abnormal()
   {
       echo "fly";
   }
}
class theFlash extends dcComics{
   public function abnormal()
   {
       echo "run quickly";
   }
}
```
Như các bạn có thể thấy như mình đã đề cập ở trên thì để kế thừa từ `dcCommics` thì bắt buộc phải triển khai hàm` abnormal(),` Và từ khóa để kế thừa từ một abstract class là **extends**. Các bạn chú ý mỗi lớp con chỉ có thể kế thừa từ một lớp cha đây là một nhược điểm so với interface. Nhưng bù lại thì nó có thể triển khai trực tiếp code vào trong các hàm của abstract.

Để so sánh tốt hơn các bạn có thể chú ý vào ảnh sau:
![](https://images.viblo.asia/1bd6fb8e-c94b-46ab-a625-813fd0246020.png)

## Tạm kết:
Trên đây là một số điều mình tổng hợp được về một số vấn đề về Lập trình hướng đối tượng trong PHP. Trong bài sau, mình sẽ đề cập đến `Trait`, `Namespaces`, `magic functions`, và các quy tắc trong `PSR-2.` Đây cũng là những kiến thức rất quan trọng trong lập trình PHP. Mong nhận được sự theo dõi và ủng hộ của các bạn. Tạm biệt!