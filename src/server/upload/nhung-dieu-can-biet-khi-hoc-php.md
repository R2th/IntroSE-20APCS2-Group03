# Lời mở đầu:
Để bắt đầu với một ngôn ngữ thì không đâu chuẩn chỉ bằng trang chủ của nó, và [PHP](http://php.net/) cũng vậy. Tuy nhiên, để ngồi đọc hết chỗ text trong document ấy thì rất là gian nan. Vì vậy mình xin tổng hợp một số mục mà mình nghĩ là tiêu biểu khi tìm hiểu về ngôn ngữ PHP. 
# Nội dung:

## Các đặc điểm cơ bản của lập trình hướng đối tượng (OOP) trong PHP
Trước hết hãy cùng đến với khái niệm **OOP- Object Oriented programming**: là một kĩ thuật lập trình cho phép lập trình viên tập trung vào các đối tượng giống như trong thực tế. Bên cạnh lập trình hướng đối tượng còn có lập trình hướng thủ tục và lập trình hướng modun (có điều kiện sẽ tìm hiểu và phân tích ưu nhược điểm từng phương pháp sau ^^).

Trong lập trình hướng đối tượng, khi mô tả một đối tượng, chúng ta chỉ quan tâm đến 2 vấn đề:
- Các thuộc tính của đối tượng: những thông tin đặc điểm để phân biệt đối tượng (**VD**: với đối tượng người thì sẽ quan tâm đến thuộc tính như tên, tuổi, giới tính, ...)
- Các phương thức của đối tượng: tức là những hành động đối tượng ấy có thể thực hiện mà ta đang quan tâm (**VD**: đối tượng người thì có thể chạy, ngồi, ... ) 

### TÍnh kế thừa (Inheritance):
Cái tên của nó đã nói lên tất cả rồi đúng không. Tính chất này cho phép bạn tận dụng những thuộc tính/phương thức có sẵn thay vì phải viết lại. Từ đó có thể tái sử dụng và mở rộng một cách dễ dàng. Để có thể thực hiện kế thừa, ta cần có:
- Một class *'cha'* (**superclass**) đã khai báo các thuộc tính, phương thức.
- Một class *'con'* (**subclass**) kế thừa lại những thuộc tính, phương thức (**public và protected**) của lớp cha.

--> một cha có thể có nhiều con, nhưng một con thì chỉ có một cha. 

Để sử dụng tính kế thừa này thì ta chỉ cần sử dụng từ khóa **extends + <Tên-lớp-cha>** khi khai báo lớp con.

### Tính đóng gói (Encapsulation):
Tính đóng gói hiểu đơn giản là việc giới hạn xem dữ liệu bên trong đối tượng được phép sử dụng (gọi ra) ở đâu. Những dữ liệu này thường là thuộc tính và các phương thức.

Có 3 mức độ giới hạn ứng với 3 từ khóa khai báo:
- **Public**: các thuộc tính và phương thức được khai báo với từ khóa public sẽ có thể truy cập được từ **bên ngoài class** (giống như những nơi công cộng ai cũng có thể tự do ra vào)
- **Protected**: các thuộc tính và phương thức được khai báo với từ khóa protected có thể truy cập được từ **bên trong class** và **các class kế thừa** nó (giống như nhà bạn thì sẽ chỉ có bạn và 'con' của bạn có thể vào)
- **Private**: các thuộc tính và phương thức được khai báo với từ khóa private chỉ có thể truy cập từ **bên trong class** (còn đây giống như phòng riêng của bạn vậy, chỉ có bạn vào được và sử dụng được).

### Tính đa hình (Polymorphism):
Tính đa hình cũng có liên quan đến tính kế thừa ở trên. Khi mà một class con kế thừa class cha thì không phải là dùng y nguyên những phương thức từ lớp cha, mà class con có thể viết lại các phương thức ấy.

Tức là nhiều lớp con cùng kế thừa từ một lớp cha, cùng sử dụng một phương thức nhưng kết quả của mỗi lớp con có thể khác nhau do phương thức đã được viết lại phù hợp với từng lớp.
- Ví dụ: 
    - Có một lớp cha là đa giác: có phương thức tính chu vi.
    - Có 2 lớp con là tam giác và hình chữ nhật cùng kế thừa từ lớp cha đa giác.
    - Khi tính chu vi thì mỗi lớp con lại phải viết lại hàm tính chu vi cho phù hợp.
### Tính trừu tượng (Abstraction): 
Gọi là trừu tượng đã thấy khó hiểu rồi :) 

Mọi người cứ tạm hiểu là khi lập trình hướng đối tượng, một đối tượng sẽ có thể có rất nhiều những thuộc tính cũng như là phương thức. Tuy nhiên, ta chỉ quan tâm đến một số mục cốt lõi nhất định, những thứ khác không cần quan tâm đến.

Và để trừu tượng hóa một đối tượng, chúng ta sẽ cần quan tâm đến **"abstract class"** và **"interface"**.

## Sự khác biệt giữa Abstract Class và Interface, khi nào thì dùng cái nào.
Đây chắc chắn là một câu hỏi huyền thoại khi đi phỏng vấn vị trí lập trình viên và không phải ai cũng trả lời được một cách rõ ràng (và mình ngày xưa cũng vậy ^^ ).

Trước hết, bạn có thể hiểu nôm na là **Abstract Class** khai báo bản chất "**là gì**", còn **Interface** thì sẽ khai báo "**làm gì**".

Hãy cùng xem so sánh chi tiết hơn bằng bảng so sánh sau:

- Giống nhau:
    -  Không thể khởi tạo đối tượng.
    -   Có thể khai báo các phương thức abstract (chỉ khai báo mà không thức hiện)
- Khác nhau:

|  | Abstract Class | Interface |
| -------- | -------- | -------- |
| Khái niệm     | Là class cha cho tcho các class có cùng bản chất, định nghĩa class đó là gì     | Một "mặt nạ" chung cho các class có cùng cách thức hoạt động nhưng khác nhau về bản chất    |
| Kế thừa     | 1 class chỉ có thể kế thừa (**extends**) 1 abstract class duy nhất  | 1 class có thể kế thừa (**implement**) từ nhiều interface   |
| Phương thức hợp lệ     | **Có thể** chứa các phương thức static, constructor    | **Không thể** chứa các phương thức static, constructor     |
| Khả năng kế thừa     | Có thể **implements** interface và **extends** class khác như class bình thường     | Có thể **extends** interface khác     |

## Thế nào là một hàm static?
- Hàm **static** là hàm có thể được gọi mà không cần một đối tượng của class đó. Nó được sử dụng như một biến toàn cụ dù cho nó được xử lý ở trong bất kỳ file nào trong chương trình thì nó đều lưu lại giá trị cuối cùng mà nó thực hiện vào trong lớp.
- Cũng vì đặc tính có thể gọi mà không cần khởi tạo đối tượng nên mới có chuyện:
    - 1 hàm static không thể gọi một hàm non-static vì khi đó đối tượng của hàm non-static chưa được khởi tạo.
    - Nhưng 1 hàm non-static có thể gọi được hàm static vì hàm static đã tồn tại ngay từ khi chạy chương trình mà chưa cần khởi tạo đối tượng.

- Ngoài ra trong phần này ta cần phân biệt được **static::method()** và **self::method()**: cả 2 đều dùng để gọi các thành phần tĩnh trong đối tượng, nhưng nếu chỉ đơn thuần như trong nội bộ class thì cả 2 cách đều cho kết quả giống nhau. Nhưng khi đặt ở các class khác nhau thì ta sẽ thấy được sự khác biệt. Ví dụ: 
```
class Person
{
    public static function getSelf()
    {
        return new self;
    }
    public static function getStatic()
    {
        return new static;
    }
}

class Girl extends Person
{

}
echo get_class(Girl::getSelf()); //Person
echo get_class(Girl::getStatic()); //Girl
```

Nhìn vào kết quả của ví dụ trên chắc bạn đã có được câu trả lời cho mình đúng không nào.
- **self::method()** sẽ trả về giá trị tại class mà nó được khai báo, không cần biết gọi ở đâu.
- **static::method()** sẽ trả về giá trị tại class mà nó được gọi ra.

## Thế nào là Trait?
Trước kia (nghe cho xa xôi), PHP chỉ hỗ trợ đơn kế thừa. Điều này khiến cho việc lập trình trở nên khó khăn hơn. Và một ngày đẹp trời, **PHP 5.4** ra mắt, **trait** được đưa vào giúp chúng ta có thể sử dụng lại các phương thức từ các class khác nhau một cách dễ dàng hơn.
- Khai báo trait:
```
trait traitName
    {
        public function traitMethod ()
        {
            return 'test trait';
        }
    }
```
- Sử dụng trait:
```
class useTrait
{
    use traitName;
}
```

Ngoài ra, chúng ta cũng có thể sử dụng nhiều trait trong một class. Khi đó sẽ xảy ra trường hợp là 2 trait được use trong class sẽ có function trùng tên, bạn sẽ phải quyết định sử dụng function nào, và **insteadof** sẽ giúp bạn giải quyết vấn đề đó:
```
trait traitName2
{
    public function traitMethod ()
    {
    //
    }

class useTrait
{
    use traitName, traitName2
    {
        traitName::traitMethod() insteadof traitName2;
    }
}
```
Khi này, function **traitMethod** trong **traitName** sẽ được sử dụng, chứ không phải **traitName2** nhé, cẩn thận không lại nhớ ngược.
## Thế nào là Namespaces?
Theo như định nghĩa trên trang chủ PHP thì namespaces được thiết kế để giải quyết vấn đề khi tái sử dụng code ví dụ như các class hay function. 

Trong thực tế, có trường hợp khi tái sử dụng 2 file có 2 class trùng tên vào cùng một file để tái sử dụng thì sẽ xảy ra lỗi vì không biết sử dụng class nào. Và namespace sinh ra để giải quyết vấn đề đó.
- Khai báo tên namespace ở ngay đầu file:
```
namespace name;
```
Về việc đặt tên cho namespace, trong PHP cũng có quy tắc nhất định, mọi người nên tham khảo PSR-0 và [PSR-4](https://viblo.asia/p/coding-convention-doi-voi-mot-project-php-ORNZqNPrl0n) 

Ngoài ra *'name'* có thể đặt tên theo các cấp được, ví dụ bạn muốn khai báo namespace Controllers nằm trong thư mục App thì có thể khai báo như sau:
```
namespace App\Controllers;
```
- Gọi namespace: khi đã khai báo namespace rồi thì chỉ việc gọi ra và sử dụng thôi
```
use namespaceName\className;
```
## Thế nào là magic functions?
- Định nghĩa: là các phương thức đặc biệt được xây dựng sẵn, nó sẽ bắt một sự kiện nào đó khi chúng ta thao tác với đối tượng. 
- "Đặc điểm nhận dạng": magic function khá đặc biệt và rất dễ dàng nhận biết, nó có **2 dấu _** trước tên function.
- Một số magic function phổ biến và chức năng của nó:
```
__construct() //hàm khởi tạo, được gọi khi khởi tạo đối tượng mới
__destruct() //hàm hủy, được gọi khi đối tượng bị hủy
__get() //hàm getter, được gọi khi lấy giá trị của thuộc tính
__set() //hàm setter, được gọi khi gán giá trị cho thuộc tính
```
Trên đây là 4 function mà mình nghĩ là sẽ sử dụng nhiều nhất, ngoài ra PHP còn rất nhiều magic function nữa mà các bạn có thể [tìm hiểu thêm](http://php.net/manual/en/language.oop5.magic.php). 
## [Tìm hiểu về các quy tắc trong PSR](https://viblo.asia/p/coding-convention-doi-voi-mot-project-php-ORNZqNPrl0n) 
# Lời kết:
Bài viết này có vẻ hơi nhiều kiến thức, nhưng mình mong rằng các bạn có thể từ tưf"hấp thụ" nó, vì mình nghĩ đây là những điều tiêu biểu cần tìm hiểu về ngôn ngữ PHP. Trong bài viết có điều gì chưa ổn, mong các bạn sẽ góp ý để sau này mình có thể mang lại những bài viết chất lượng hơn.

Hẹn gặp lại các bạn!
# Tài liệu tham khảo:
https://freetuts.net/lap-trinh-huong-doi-tuong-la-gi-27.html

http://vietjack.com/php/lap_trinh_huong_doi_tuong_trong_php.jsp

http://php.net/manual/en/index.php