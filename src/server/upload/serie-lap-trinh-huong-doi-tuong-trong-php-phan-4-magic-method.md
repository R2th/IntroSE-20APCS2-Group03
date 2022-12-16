## Lời mở đầu

Tiếp tục với phần cuối của serie, cảm ơn các bạn đã theo dõi serie và ủng hộ mình, mình không biết nói gì hơn là cảm ơn các bạn rất rất nhiều. Để đáp lại tìm cảm ấy mình sẽ cố gắng tìm hiểu và chia sẻ tới các bạn những bài viết chất lượng và tâm huyết nhất :). Đây là phần mà mình đã đề cập từ phần một (**OOP**) là **magic method** vậy còn chờ gì nữa chúng ta cùng bắt đầu ngay thôi !!!
## Nội dung

### 1. PHP magic method là gì
Ok ở trong bài Lập trình hướng đối tượng mình đã nhắc đến từ khóa **magic method** đúng không ạ. Thực chất **magic method** tương đối là rộng và khó lòng mình có thể giải thích cho các bạn trong bài đấy, thay vào đó mình sẽ có giải thích một cách tường minh nhất trong bài này các bạn hãy cùng theo dõi nhé :) 

Đầu tiên chúng ta cùng tìm hiểu **magic method** là gì nào :) Ok, thực gia đây là một số chức năng được xây dựng để giúp lập trình viên có thể triển khai hiệu quả hơn, các hàm **magic method** thường không bao giờ được gọi trực tiếp mà thường nó sẽ hỗ trợ chúng ta xử lý một số tác vụ sau khi code chạy. Nghe khó hiểu đúng không ạ, văng vẫn giữ nguyên quan điểm chỉ có supper đọc song mới hiểu nó là gì, chúng ta là người thường vì vậy phải thông qua ví dụ thực tế để có thể chuyển từ trừu tượng đến thứ ngôn ngữ mà mình có thể tiếp thu đúng không ạ !! Vậy chúng ta cùng bắt đầu nào.

Giả sử chúng ta có một class
```js
class SupperHero
{
  
}
```
Bây giờ chúng ta cùng áp dụng các magic method vào class này nhé

### 2. Các hàm hay sử dụng trong magic method

**construct():**

Có lẽ nếu bạn là một lập trình viên PHP thì chắc ít nhất cũng đã thấy thoáng qua hàm này ở đâu đấy, ok chúng ta cùng tìm hiểu kỹ xem nó là gì và nó làm được cái gì nhé. 
```js
class SupperHero
{
   private $abnormal;
   private $name;

   public function __construct($newAbnormal, $newName)
   {
       $this->abnormal = $newAbnormal;
       $this->name = $newName;
   }
}

$supperMan = new SupperHero('fly', 'supper man');
```
Các bạn còn nhớ về bài oop trước mình viết về tính đóng gói không, mình đã đề cập đến tính toàn vẹn của hàm và chương trình, **construct()** được gọi một cách tự động khi bạn khởi tạo hàm và giúp bạn truyền các **parameters** vào đối tượng đó, trên thực tế các bạn chỉ cần khởi tạo lên đối tượng `SupperHero` và truyền tham số còn tất cả từ khởi tạo, truyền như thế nào thì **construct()** đã đảm nhận rồi

Trong một số trường hợp bạn muốn gọi **construct()** của lớp cha thì cũng hết sức đơn giản bạn chỉ cần viết `parent::_construct(tham_số_cần_của_lớp_cha)` ở function mà bạn cần

**destruct()**

có khởi tạo thì cũng phải có xóa, sau khi bạn khởi tạo bạn không mong muốn nó nữa thì bạn hoàn toàn có thể sử dụng hàm này. Và cũng giống như **construct()** php cũng sẽ tự động gọi bạn không cần phải cấu hình nó. Hàm này thật sự cũng rất hiếm khi sử dụng nên mình sẽ chỉ giới thiệu cho các bạn biết chứ không đi vào xâu nhé

**Getting && Setting**

Các bạn có thấy quen quen không, thực ra nó cũng giống **get** và **set** trong c++ hay c# đấy. Tính chất của nó cũng tương tự, khi bạn khởi tạo 1 class và cố truy cập vào thuộc tính trong đó, mà thuộc tính đó có mức truy cập khác public hoặc không tồn tại thường thì nó sẽ không trả về gì cả, thật bất tiện đúng không ạ. Khi sử dụng phương thức **get()** bạn có thể quy định các thông báo trả nếu cố gắng truy cập vào class một cách sai phạm
```js
class SupperHero
{
   private $abnormal;
   private $name;
   public function __get($key)
   {
       echo "Ban dang truy cap tt k ton tai: " . $key;
   }
}

$supperMan = new SupperHero();
$supperMan->name;
```
Khác với **get()** khi bạn cố gắng truyền vào một biến không tồn tại hoặc không public thì nó cũng sẽ không thể hiển thị, một ví dụ về **set()**
```js
class SupperHero
{
   private $abnormal;
   private $name;
   public function __set($key, $value)
   {
       echo "Ban dang truy cap tt k ton tai: " . $key. " gtri" . $value;
   }
}

$supperMan = new SupperHero();
$supperMan->name = "xin chao";
```
**Chú ý:** Nó truyền dưới dạng key => value. Như ở ví dụ trên, ta **set** giá trị cho thuộc tính name mà không tồn tại trong class. Nó sẽ gọi đến hàm **set()** với `$key` là thuộc tính đã gọi, `$value` là giá trị đã gán

**call()**

Được gọi khi gọi một method không được phép truy cập hoặc không tồn tại trong đối tượng. Dễ thấy nó có điểm tương đồng với **get()** đúng không ạ, chúng chỉ khác ở chỗ **get()** là khi ta cố gắng truy cập vào một thuộc tính còn **call()** là ta cố gắng truy cập vào một method. Ta cũng có thể sử dụng hàm **call()** để thực hiện overload trong PHP.
```js
public function __call($method_name, $prameter)
   {
       if ($method_name == 'supperMan')
       {
           $countPrameSupper =  count($prameter);
           switch ($countPrameSupper)
           {
               case "1":
                   echo 'Ban nhap 1 doi so';
                   break;
               case "2":
                   echo 'Ban nhap 2 doi so';
                   break;
           }
       }
   }
   protected function supperMan($name, $newAbnormal="fly")
   {
       echo $name . " Abnormal " . $newAbnormal;
   }
}

$supperMan = new SupperHero();
$supperMan->supperMan();
```
Với `$method_name` là tên của method mà đang cố gắng truy cập vào đối tượng nhưng không được phép, và `$prameter` là các tham số chuyền vào. Chúng ta có thể thấy method `supperMan()` có mức truy cập không phải publlic vì vậy khi chúng ta cố gọi method `supperMan()` thì PHP sẽ hướng vào hàm **call()**

**toString()**

Method này sẽ hỗ trợ bạn cố gắng trả về một object như một string
```js
  private $abnormal;
   private $name;

   public function __construct($newAbnormal, $newName)
   {
       $this->abnormal = $newAbnormal;
       $this->name = $newName;
   }
   public function __toString()
   {
       return $this->name . ' abnormal ' . $this->abnormal;
   }
}

$supperMan = new SupperHero('fly', 'supperMan');
echo $supperMan;
```
Như bạn có thể thấy `$supperMan` là một object nhưng bạn cố gắng echo nó thường thì sẽ không được đúng không nào, nhưng **toString()** hỗ trợ bạn

**debugInfo()**

Hàm sẽ hỗ trợ bạn **vardump()** một object không được phép
```js
class SupperHero
{
   public function __debugInfo()
   {
       echo "Bug!!!";
   }
}

$supperMan = new SupperHero();
var_dump($supperMan);
```

**clone()**

Được sử dụng khi chúng ta **clone** (sao chép 1 đối tượng thành 1 đối tượng hoàn toàn mới không liên quan đến đối tượng cũ) một object
```js
class SupperHero
{
   public function __clone()
   {
       echo "Bạn đã sao chép kĩ năng của hero này!!!";
   }
}

$supperMan = new SupperHero();
$theFlash = clone($supperMan);
```
**isset()**

Phương thức **isset()** sẽ được gọi khi chúng ta thực hiện kiểm tra một thuộc tính không được phép truy cập của một đối tượng, hay kiểm tra một thuộc tính không tồn tại trong đối tượng đó. Cụ thể là hàm **isset()** và hàm **empty()**

**Chú ý:** phương thức **isset()** không sử dụng được với thuộc tính tĩnh

```js
class SupperHero
{
   public function __isset($name)
   {
       echo "thuc tinh nay khong ton tai!!!";
   }
}

$supperMan = new SupperHero();
isset($supperMan->name);
```
## Kết bài
Trong serie mình đã trình bày những kỹ năng từ cơ bản đến nâng cao về PHP cảm ơn các bạn rất nhiều đã theo dõi và ủng hộ mình tới thời điểm này, chúc ae thành công trong con đường tu đạo này :).