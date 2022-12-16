Ở [bài trước](https://viblo.asia/p/lap-trinh-huong-doi-tuong-oop-trong-php-gGJ59gyaZX2) chúng ta đã tìm hiểu về các tính chất đặc thù về OOP trong PHP và bài này chúng ta cùng tìm hiểu về:

- `Trait`
- `Namespace`
- `Magic Functions`
- `các quy tắc trong PSR2`

## **Nội dung**

### 1.Trait

**1.1. Trait là gì???**

PHP hay Ruby đều là những ngôn ngữ hướng đối tượng chỉ hỗ trợ single inheritance(đơn kế thừa). Để khắc phục những giới hạn của đơn kế thừa trong việc sử dụng lại source code, từ PHP 5.4 trở đi PHP hỗ trợ Traits là cơ chế giúp cho lập trình viên có thể sử dụng lại các phương thức từ các class khác nhau một cách dễ dàng hơn.
Một trait tương tự như là 1 class nhưng chỉ nhằm mục đích nhóm chức năng lại. Và trait không thể khởi tạo giống class và trait sinh ra để bổ sung cho kế thừa truyền thống. Thay vì phải kế thừa 1 class hay interface để sử dụng lại 1 nhóm chức năng, thì với trait bạn không cần phải kế thừa vẫn có thể sử dụng được

***Các đặc điểm của Traits:***

- Traits có chức năng gom lại các phương thức và thuộc tính mà chúng ta muốn sử dụng lại nhiều lần.
- Traits như một abstract class ( đều không thể khởi tạo được) nhưng không hoàn toàn giống nhau.
- Các phương thức trong Traits có thể bị override lại trong class sử dụng nó.

***Ưu điểm của Traits:***

- Giảm việc lặp code đáp ứng được nguyên tắc(DRY - Don't Repeat Yoursefl).
- Khắc phục được điểm yếu đơn kế thừa của PHP.

***Nhược điểm của Traits:***

- Traits đó là sẽ gây khó khăn có chúng ta đọc được các phương thức từ một class có sử dụng traits.
- Traits tạo ra việc bạn có thể dễ viết các classes cồng kềnh và có quá nhiều chức năng. Một Trait bản chất là một cách để copy và paste code giữa các classes. Bởi có một cách đơn giản để thêm một nhóm các methods vào một class.

**1.2. Khai báo Trait**

- Để khai báo một trait trong PHP ta sử dụng cú pháp:

```
trait Name
{
   //code
}
```

Trong đó: Name là tên của trait các bạn muốn đặt.

Ví dụ: Khai báo trait demo:

```
trait Demo {
  public function demo()
  {
    return 'Demo Traits';
  }
}
```

**1.3. Sử dụng Trait trong class**

Để sử dụng trait trong class thì các bạn chỉ cần sử dụng cú pháp:

```
class ClassName
{
    use TraitName;

    //code
}
```

Ví dụ khai báo một trait và sử dụng trong class

```
trait Demo {
      public function demo()
      {
        return 'Demo Traits';
      }
}

class Test {
      use Demo;
}

$test = new Test();

echo $test->demo();

// Chạy lên ta được kết quả:
// Demo Traits
```

**1.4. Trait lồng nhau**

Cũng như các cấu trúc điều khiển hay vòng lặp thì bạn cũng có thể sử dụng trait lồng nhau.

Ví đụ:

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

Lúc này khi bạn gọi trait B là bạn cũng có thể sử dụng được chức năng của trait A.

**1.5. Ưu tiên phương thức trong Trait**

Giả sử như bạn có hai trait như sau:

```
trait Game
{
    function play() {
        echo "Playing a game";
    }
}
 
trait Music
{
    function play() {
        echo "Playing music";
    }
}

class Player
{
    use Game, Music;
}
 
$player = new Player();
$player->play();

//chương trình báo lỗi.
//Fatal error: Trait method play has not been applied,
//because there are collisions with other trait methods on Player
```

Bây giờ nếu như bạn gọi 2 trait trên vào trong một class và sử dụng thì lập tức chương trình lỗi ngay.

Giờ đây sẽ có 2 giải pháp để sử lỗi trên như sau:

**Cách 1:** Là bạn sẽ phải override lại phương thức trùng tên đó ở trong class sử dụng.

```
class Player
{
    use Game, Music;
    
        public function play()
	{
            echo 'Player';
	}
}
```

**Cách 2:** Xử dụng insteadof để xét độ ưu tiên cho phương thức bạn muốn sử dụng.

```
class Player
{
    use Game, Music {
        Music::play insteadof Game;
        //ưu tiên sử dụng phương thức play của trait Music
    }
}
```

**1.6. Phương thức tĩnh và thươc tính tĩnh trong trait**
Trong Traits có hỗ trợ cho chúng ta cả phương thức tĩnh và thuộc tính tĩnh như một class bình thường.

*1.6.1. Thuộc tính tĩnh*

Ví dụ
```
// Khai báo trait Game
trait Game
{
	private static $name = 'Chưa xét';
	public function setName($name)
	{
		self::$name = $name;
	}
	public function getName()
	{
		return self::$name;
	}
}
//Khai báo class Player_1
class Player_1
{
	//gọi trait Game
	use Game;
}

//Khai báo class Player_2
class Player_2
{
    //gọi trait Game
    use Game;
}

// khởi tạo class Player_1
$player = new Player_1();
//setName
$player->setName('LOL);
//getName
echo $player->getName();
//Kết Quả: LOL

// Tiếp tục khởi tạo class Player_1
$player_1 = new Player_1();
//getName
echo $player_1->getName();
//Kết Quả: LOL

//Khởi tạo class Player_2 
$player_2 = new Player_2();
//getName
echo $player_2->getName();
//Kết Quả: Chưa xét
```

**Kết Luận:** Như vậy Thuộc tính tĩnh trong Trait chỉ ảnh hưởng bên trong một class thôi còn khi gọi nó ở tron một class khác thì hoàn toàn bình thường.

**1.7. Phương thức tĩnh**

Ví dụ

```
// Khai báo trait Game
trait Game
{
	public static function getName()
	{
		return 'LOL';
	}
}
//Khai báo class ConNguoi
class Player
{
	//gọi trait Game
	use Game;
}

echo ConNguoi::getName();
//Kết Quả: LOL
```

**1.8. Phương thức trừu tượng trong trait.**

Trait cũng hỗ trợ chúng ta sử dụng phương thức trừu tượng

```
<?php
// Khai báo trait Game
trait Game
{
	//khai báo thuộc tính name
	private $name = 'LOL';
	//định nghĩa phương thức getName
	abstract public function getName();
}
//Khai báo class Player
class Player
{
	//gọi trait Game
	use Game;
	//khai báo và định nghĩa lại phương thức getName()
	public function getName()
	{
		return $this->name;
	}
}
// khởi tọa class Player
$player = new Player();
//getName
echo $player->getName();
//Kết Quả: LOL
```

**1.9. Thay đổi visibility của phương thức trait.**

Trong PHP cũng có hỗ trợ chúng ta thay đổi visibility của phương thức trong traits với cú pháp như sau:

```
    use methodName as visibility;
```

Nhìn thế này chúng ta có vẻ thấy mơ hồ vậy chúng ta cùng nhìn qua ví dụ dưới đây để hiểu rõ hơn:

```
<?php
trait Game
{
	private $name = 'PUPG;
	private function getName()
	{
		return $this->name;
	}
}
class Player
{
	use Game {
		//thay đổi visibitily thành public
		getName as public;
	}
}
$player = new Player();
echo $player->getName();
//Kết Quả: PUPG
```

**1.10. Tạo định danh mới cho Traits.**

Không những bạn có thể ưu tiên phương thức trong traits hay thay đổi visibility, mà bạn còn có thể tạo định danh mới cho traits trong PHP nữa.

Ví dụ:

```
<?php
trait Game
{
    private $name = 'Gunny';
    public function getName()
    {
        return $this->name;
    }
}
class Player
{
    use Game{
        //Định danh mới cho getName
        getName as doName;
    }
}
$player = new Player();
echo $player->doName();
//Kết Quả: Gunny
```

**1.11. So sánh Traits với abstract và interface**

*a) Trait với Interface*

**Giống nhau**: Đều không có thể khởi tạo được mà chỉ có thể khai báo.

**Khác nhau:**
| Trait | Interface |
| -------- | -------- | 
| Có thể khai báo thuộc tính.     | Chỉ có thể khai báo thuộc tính cố định (hằng).     |
| Có thể định nghĩa và khởi tạo phương thức.     | Chỉ có thể khai báo không thể định nghĩa.     |

*b) Trait với Abstract class*

**Giống nhau:** Đều không có thể khởi tạo được mà chỉ có thể khai báo.

**Khác nhau:**


| Trait | Abstract class |
| -------- | -------- |
| Có thể lồng nhau một cách đơn giản     | Khi muốn sử dụng lẫn nhau phải kế thừa hết sức lằng nhằng.     |

### 2. Namespace

**2.1 Namespace là gì???**

`Namespace` giúp tạo ra một không gian tên cho hàm và lớp trong lập trình nói chung và trong `PHP` nói riêng.

**2.2 Khai báo namespace**

Để khai báo `namespace` ta sử dụng cú pháp sau:

```
namespace name
```

Trong đó: **name** là tên của `namespace` mà bạn muốn đặt.

Chú ý: khi khai báo `namespace` thì chúng ta phải đặt nó ở phía trên cùng của `file`.

**2.3 Gọi namespace**

Khi mà một class đã được một namespace định danh thì bạn sẽ không thể gọi theo cách thông thường được nữa mà phải gọi với cú pháp:

```
new tenNamespace\tenClass();
```

**2.4 Nạp namespace bằng use**

Nếu như bạn không muốn gọi namespace theo cách trên thì bạn sử dụng từ khóa use để nạp theo cú pháp sau:

```
use tenNamespace\tenClass;
```

Ví Dụ:

```
<?php
include 'Game.php';

use Game\Game;

$game = new Game();
echo $game->getName();
```

**2.5 Định danh cho namespace**
Để định đanh cho namespace ta sử dụng cú pháp sau:

```
use tenNamespace as tenMoi;
```

### 3. Magic methods

**3.1 Magic methods là gì**

Magic methods là các phương thức đặc biệt được tạo ra nhằm giải quyết các vấn đề về sự kiện trong chương trình (cụ thể là với class), và đối với PHP cũng thế.

**3.2 Một số Magic methods trong PHP**

+ **__construct()**: gọi khi khởi tạo đối tượng.

+ **__destruct()**: gọi khi hủy đối tượng.

+ **__set()**: gọi khi ta truyền dữ liệu cho một thuộc tính không được phép truy cập.

+ **__get()**: khi đọc dữ liệu từ một thuộc tính không được phép truy cập.

+ **__isset()**: được gọi khi gọi hàm isset() hoặc empty() trên một thuộc tính không được phép truy cập.

+ **__unset()**: được gọi khi hàm unset() được sử dụng trong một thuộc tính không được phép truy cập.

+ **__call()**:được gọi khi ta gọi một phương thức không được phép truy cập trong phạm vi của một đối tượng.

+ **__callstatic()**: được kích hoạt khi ta gọi một phương thức không được phép truy cập trong phạm vi của một phương thức tĩnh.

+ **__toString()**: phương thức này giúp class chỉ định xem sẽ in ra cái gì khi nó được dùng.

+ **__invoke()**:phương thức này được gọi khi một lệnh cố gắng gọi một đối tượng như một hàm.

+ **__sleep()**: được gọi khi serialize() một đối tượng.

+ **__wakeup**: được gọi khi unserialize() đối tượng.

+ **__set_state()**:  được gọi khi chúng ta var_export() đối tượng.

+ **__clone()**: được sử dụng khi chúng ta clone một object.

+ **__debugInfo()**: được gọi khi chúng ta sử dụng hàm vardump().

### 4. Các quy tắc trong PSR-2

Trước khi tìm hiểu PSR-2 là gì thì chúng ta cùng tìm hiểu qua khái niệm về PRS

PSR có nghĩa là PHP Standards Recommendations, nó là tiêu chuẩn được khuyến nghị áp dụng khi lập trình PHP và được các lập trình viên, tổ chức chấp nhận sử dụng.

PSR bao gồm 7 phần (http://www.php-fig.org/psr/) từ PSR-1, PSR-2, PSR-3, PSR-4, PSR-6, PSR-7. Các tiêu chuẩn thành phần hoàn chỉnh của PSR đó gồm:

**Các quy tắc trong PSR-2**

- Code PHẢI tuân thủ PSR-1
- Code PHẢI sử dụng 4 ký tự space để lùi khối (không dùng tab)
- Mỗi dòng code PHẢI dưới 120 ký tự, NÊN dưới 80 ký tự.
- PHẢI có 1 dòng trắng sau namespace, và PHẢI có một dòng trắng sau mỗi khối code.
- Ký tự mở lớp { PHẢI ở dòng tiếp theo, và đóng lớp } PHẢI ở dòng tiếp theo của thân class.
- Ký tự { cho hàm PHẢI ở dòng tiếp theo, và ký tự } kết thúc hàm PHẢI ở dòng tiếp theo của thân hàm.
- Các visibility (public, private, protected)  PHẢI được khai báo cho tất cả các hàm và các thuộc tính của lớp;
- Các từ khóa điều khiển khối(if, elseif, else) PHẢI có một khoảng trống sau chúng; hàm và lớp thì KHÔNG ĐƯỢC làm như vậy.
- Mở khối { cho cấu trúc điều khiển PHẢI trên cùng một dòng; và đóng khối này } với ở dòng tiếp theo của thân khối.
- Hằng số true, false, null PHẢI viết với chữ thường.
- Từ khóa extends và implements phải cùng dòng với class.
- implements nhiều lớp, thì mỗi lớp trên một dòng
- keyword var KHÔNG ĐƯỢC dùng sử dụng khai báo property.
- Tên property KHÔNG NÊN có tiền tố _ nhằm thể hiện thuộc protect hay private.
- Tham số cho hàm, phương thức: KHÔNG được thêm space vào trước dấu , và PHẢI có một space sau ,. Các tham số CÓ THỂ trên nhiều dòng, nếu làm như vậy thì PHẢI mỗi dòng 1 tham số.
abstract, final PHẢI đứng trước visibility, còn static phải đi sau.

### Kết luận
Đến đây, mình xin tạm dừng bài viết về Lập trình hướng đối tượng (OOP) trong PHP tại đây. Trong phần cuối, mình sẽ viết về các phương pháp thiết kế hướng đối tượng (SOLID). Mong được sự theo dõi và ủng hộ từ các bạn. 

Cảm ơn các bạn đã theo dõi.

Nguồn tham khảo:

- https://techtalk.vn/

- https://techblog.vn/

- https://toidicode.com/

- https://lcdung.top/huong-dan-viet-code-php-chuan-psr-tieu-chuan-khi-lap-trinh-php/