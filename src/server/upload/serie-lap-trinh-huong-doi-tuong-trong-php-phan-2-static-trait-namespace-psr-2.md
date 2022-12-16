# Serie lập trình hướng đối tượng trong PHP (Phần 2: static, trait, namespace, PSR-2)
Chào các bạn mình đã quay trở lại với phần 2 của series chia sẻ về PHP, cảm ơn các bạn đã theo dõi tới thời điểm này. Trong bài viết này mình sẽ trình bày về static, trait, namespace, PSR-2 không chần chừ nữa chúng ta cùng bắt đầu nào.  
<hr>

## Nội dung

### 1. Thế nào là một hàm static
Hàm **static** là hàm có thể truy cập mà không cần khởi tạo một đối tượng của class, trong lập trình hướng đối tượng là một thành phần tĩnh (có thể là thuộc tính hoặc phương thức) mà nó hoạt động như một biến **global**, dù cho nó có được xử lý ở trong bất kỳ một file nào đi nữa (trong cùng một chương trình) thì nó đều lưu lại giá trị cuối cùng mà nó được thực hiện vào trong lớp
```js
public static function superMan ()
{
    //code::
}
```
**Chú ý:** Vì hàm **static** có phạm vi toàn cục lên có thể sử dụng trong hàm **non-static** để gọi, nhưng không thể làm trường hợp ngược lại. Và không lên sử dụng **$this** để gọi một hàm **static**, vì thực chất nếu bạn sử dụng **$this** để làm việc với **static** thì thực ra PHP sẽ tự tạo một biến **non-static** để thay thế, cái gì mập mờ quá cũng không lên đúng không ạ :)
### Phân biệt cách dùng từ khoá static::method() với self::method()
Vậy **static::method()** và **self::method** khác nhau ở điểm nào. Nếu các bạn đã có kinh nghiệm về lập trình một chút thì các bạn không lạ gì với từ khóa **self**, một hàm mà tham chiếu đến chính class hiện tại (thay vì tham chiếu đến đối tượng hiện tại như **$this**). Hơi khó hiểu đúng không ạ, vậy chúng ta cùng đi vào ví dụ để hiểu **seft::method()** là gì và từ khóa mới **static::method()** thôi nào :)
```js
class DcCommic
{
   public function supperMan()
   {
       self::getModel();
   }
   protected static function getModel()
   {
       echo "abnormal";
   }
}
```
Ví dụ mình tạo một class `DcCommic` và tạo một hàm static `getModel()` và tại hàm` non-static supperMan()` mình dùng từ khóa **self** để gọi hàm static. Bây giờ chúng ta thử kiểm tra xem kết quả là gì
```js
$supper = new DcCommic();
$supper->supperMan();
```
Kết quả thì hiển thị đúng là `"abnormal"` nếu đến đây thì đúng là không có gì để nói. Nhưng bây giờ mình tạo một *class Hero* kế thừa từ *class DcCommic*, và mình ghi đè lên hàm *getModel()* thì kết quả sẽ như thế nào nhỉ ???
```js
class Hero extends DcCommic
{
   public static function getModel()
   {
       echo "fly";
   }
}	
```
Các bạn gọi class Hero ra để xem kết quả
```js
$supperMan = new Hero();
$supperMan->supperMan();
```
Kết quả hiển thị là `"abnormal"` thay vì `"fly"` thế này là thế nào, nó đã phá vỡ tình chất **Overriding** của oop phải không, làm thế nào để nó ghi đè lên vv... Nếu đây là các câu hỏi trong đầu bạn thì đừng lo. Thực chất đây là tính chất đặc biệt của hàm **seft** tham chiếu đến class định nghĩa nó *(DcCommic)*, vì vậy thay vì nó gọi đến hàm *getModel()* của *class Hero* thì nó sẽ gọi *getModel()* của *class DcCommic*. Vậy làm thế nào để class con ghi đè lên class cha. Từ phiên bản PHP 5.3 đã cung cấp cho chúng ta một giải pháp **late static bindings**

### Static và late static bindings
Mình xin phép được sử dụng lại ví dụ vừa nãy để các bạn tiện theo dõi
```js
class DcCommic
{
   public function supperMan()
   {
       static::getModel();
   }
   protected static function getModel()
   {
       echo "abnormal";
   }
}
```
Mình thay vì **self** thì mình sử dụng hàm **static** để gọi hàm `getModel()` và tiếp tục sử dụng *class Hero* để kế thừa lại xem sao nhé
```js
class Hero extends DcCommic
{
   public static function getModel()
   {
       echo "fly";
   }
}
```
Các bạn đoán xem kết quả sẽ hiển thị ra là gì nào :)
```js
$supper = new DcCommic();
$supper->supperMan();
$supperMan = new Hero();
$supperMan->supperMan();
```
Chúc mừng các bạn đã đoán đúng rồi ạ, bây giờ thì khi gọi *class con Hero* thì nó sẽ chạy *getModel()* của Hero và chả ra kết quả `"fly"`, bây giờ thì chúng ta đã ghi đè được rồi. Các bạn nhớ được hai từ khóa seft::method() và static::method() là thành công rồi. Chúc các bạn may mắn :D

### 2. Trait

Một trong các vấn đề của đa số các ngôn ngữ lập trình là việc chỉ có thể đơn kế thừa(**single inheritance**), điều đó có nghĩa là một class chỉ có thể kế thừa được từ một class. Tuy vậy để xây dựng một một bài toán thì chúng ta có hàng trăm, hàng ngàn class việc đơn kế thừa này trở lên bất tiện khi một class chúng ta muốn kế thừa từ nhiều class khác nhau. Từ PHP 5.4 chúng ta đã được hỗ trợ một trong các tính năng tuyệt vời với từ khóa là **trait**. Một **Trait** giống với Mixin ở chỗ  nó cho phép kết hợp các **Trait classes** vào một class hiện có. Điều này có nghĩa là bạn có thể làm giảm sự trùng lặp code và có được những lợi ích trong khi tránh các vấn đề về đa kế thừa.

### Trait là gi ???

**Traits** hiểu đơn giản là một nhóm các methods mà bạn muốn `include` nó trong một class khác. Một Trait giống với `abstract class` không thể khởi tạo trên chính nó, nhưng trait không nhận `parameter` (**constructor paramenter**). Nghe vẫn mông lung đúng không ạ, mình sẽ lấy một ví dụ nhỏ để làm rõ vấn đề này.

Đầu tiên mình sẽ tạo một **trait**
```js
trait DcCommic
{
   public function abnormal()
   {
       return "abnormal of the Hero";
   }
}
```
Giờ mình sẽ tạo ra hai class và use trait này vào
```js
class HeroMan
{
   use DcCommic;
}
class HeroWomen
{
   use DcCommic;
}
```
Nếu bạn tạo đối tượng từ một trong hai class này các bạn sẽ thấy hàm `abnormal()` có sẵn trong đó
```js
$heroMan = new HeroMan();
$heroMan->abnormal();
$heroWomen = new HeroWomen();
$heroWomen->abnormal();
```
### Trait hoạt động như thế nào ???

Nếu các bạn đã học php căn bản thì sẽ không lạ với hàm `include` hàm này sẽ copy code của các bạn từ một file vào một file khác. **Trait** cũng tương tự như vậy nhưng nó làm ở cấp nhỏ hơn và mang tính hướng đối tượng hơn, nó sẽ copy code từ một class vào một class được chỉ định với từ khóa là use.

### Trait khác abstract class như thế nào ???

Nếu các bạn đã theo dõi từ đầu đến giờ thì các bạn thắc mắc **trait** khác **abstract class** khác gì nhau, điều khác nhau cơ bản giữa chúng là **trait** không cần phải kế thừa. Nếu các bạn sét ở một bài toán nhỏ chỉ có 2 đến 3 class thì sẽ chưa thấy rõ vấn đề này này lắm đâu ạ. Mình sẽ lấy một ví dụ nhỏ để các bạn có thể thấy được sự khác biệt này nhé !!!
Giả sử mình có class *supperMan* là một *HeroMan* và *HeroMan* lại thuộc *DcCommic* thì nếu ta sử dụng abtract sẽ như thế nào nhỉ.
```js
abstract Hero extends DcCommc{}
abstract supperMan extends Hero{}
```
Nếu nó không chỉ là 3 class mà là hàng trăm class thì sao nhỉ, chắc bệnh luôn mất :D. Từ đây các bạn có thể thấy được tác dụng của trait như thế nào.

### Trait khác interface như thế nào ???

**Trait** và **interface** có một số đặc điểm tương đồng cả hai đều tương đối đơn giản, ngắn gọn và một hàm có thể kế thừa thừa từ nhiều **trait** khác nhau(tính năng này gọi là mixin hoặc `multiple inheritence`). Nhưng khác nhau về bản chất vì **interface** có thể hiểu là bố cục của cả class, có nghĩa là nếu bạn đã **implements** thì bắt buộc phải thực hiện các method đã khai báo trên **interface**, và bạn không được code trực tiếp vào method tại **interface**. Còn **trait** thì các bạn có thể triển khai code ngay trực tiếp vào method mình triển khai và các bạn có thể **use** ở bất kì đâu bạn muốn (trait tương copy và parse) mình sẽ tiếp tục lấy một ví dụ để làm tỏ tường vấn đề này :D.
```js
interface InterFaceBase
{
   public function getModel();

   public function getName();

   public function getFullName();
}

trait TraitBase
{
   public function getFullName()
   {
       return $this->getModelBase();
   }
   abstract public function getModelBase();
}

trait TraitFN
{
   public function getName()
   {
       return $this->name;
   }
   public function getModel()
   {
       echo "Model User";
   }
}

class objExInter implements InterFaceBase
{
   use TraitFN;
   use TraitBase;
   public $name = "thanh";
     public function getModelBase()
    {
      echo 'trung' . $this->getName();
    }
}
```
Trong ví dụ này mình sẽ tạo một **interface** `InterFaceBase` với các method `getModel() getName() getFullName()` như vậy trong class kế thừa `objExInter` Kế thừa lại mình cần thực thi các method đó thay vào đó mình tạo ra các **trait** đảm nhiệm công việc đó và bây giờ mình chỉ cần **use** các **trait** đó là song. Ở đây mình cố tình thực hiện thêm một số chức năng mình cảm thấy tương đối thú vị ở **trait**.

Chúng ta có thể sử dụng từ khóa `$this` để xác định các đối tượng được tham chiếu đến object trong **trait** để thực hiện một số công việc thú vị, chú ý mình sử dụng ở hàm `getName()` trong **trait** `TraitFN` và phải ở tận hàm `objExInter` mình mới khai báo biến `$name` đúng không ạ. Rất thú vị đúng không ạ :D.
```js
$objTrait = new objExInter();
$objTrait->getFullName();
```
**Chú ý:** Các bạn cũng có thể sử dụng từ khóa `abstract function` hàm này bắt buộc các class con kế thừa phải triển khai method này. OK các bạn chỉ cần nhớ **trait** như thể copy code từ một class và parse vào class được bạn chỉ định bằng từ khóa **use** là được :D, chúc bạn thành công. 

### 3. Nameamespaces

* Namespace là một cơ chế cho phép chúng ta phân nhóm các thực thể như class, object, function thành những nhóm riêng biệt, mỗi nhóm đó được đặt cho một cái tên.
* Việc dùng Namespace sẽ để tránh xung đột khi sử dụng nhiều thư viện, trong code có các class với tên giống nhau.
* Namespace có thể hiểu đơn giản như là thư mục trên các hệ điều hành, để phân cấp và phân biệt các thực thể có tên giống nhau

### 4. Các quy tắc trong PSR-2
Viết code chuẩn (coding convention) là chúng ta tuân thủ một quy định trong viết code của một tập thể hay một công ty dựa theo quy chuẩn trong lập trình. Tùy thuộc vào ngôn ngữ sẽ có chuẩn viết code khác nhau. Trong bài viết này mình sẽ nói về chuẩn code PSR-2 trong PHP.

PSR có nghĩa là PHP Standards Recommendations. Có rất nhiều PSR từ PSR-0 đến PSR-7. Trong đó PSR-1 và PSR-2 chúng ta sẽ tiếp xúc rất nhiều. PSR-1 sẽ giúp chúng ta biết thề nào và làm thế nào để đặt tên biến, tên hàm sau cho dể hiểu, dể đọc mang tính thống nhất toàn bộ.

Khác với PSR-1, PSR-2 sẽ mang tính trình bày là chính. Nó có nhiệm vụ rất quan trong trong việc trình bài các dòng code của bạn. từ các dòng tab hay xuống hàng giữa các dòng, các hàm một cách tỉ mỉ.
### Vậy tại sao lại phải viết code chuẩn
* Như mình đã đề cập ở trên việc viết code chuẩn rất quan trọng. đối với những ai thường không tuân theo quy định viết code chuẩn (viết tùy ý) đó chỉ có thể làm việc cá nhân.
* Các bạn nên nhớ rằng khi đi làm chúng ta điều làm teamwork không thể mõi người một cách viết. Mõi người một cách viết là đúng khi nói về tư duy logic trong lập trình có thể cùng một kết quả nhưng lại có nhiều cách viết khác nhau.
* Sự thống nhất về cách trình bày. Bạn viết như thế nào khi người khác xem lại hoặc sữa code của bạn vẫn hiểu được cái function của bạn đang viết cái gì phải không nào.
### Tạm kết
Đến đây, mình xin tạm dừng bài viết về Lập trình hướng đối tượng trong PHP tại đây. Cảm ơn các bạn đã theo dõi. Qua phần 1 và phần 2 này hi vọng các bạn đã có một cái nhìn rõ ràng hơn về lập trình hướng đối tượng. Trong phần 3, mình sẽ viết về lambda. Mong được sự theo dõi và ủng hộ từ các bạn.