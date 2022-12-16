### Lời nói đầu
   Với những sinh viên, người mới học code thì việc đi thực tập giống như việc mở ra một cánh cửa mới vậy. Từ trên giảng đường bỗng nhiên lại độp cái vào luôn làm việc với mấy anh, mấy chị, mấy ai mà không hoang mang nhỉ. Đấy là phần tâm lý, còn về phần kiến thức, dù bạn có làm một sinh viên pro đến đâu, người học code chắc tay tới cỡ nào, việc thiếu một số kiến thức và cần phải tự mình tìm hiểu trong quá trình intern là điều hết sức bình thường. Để giúp mọi người có hành trang tốt hơn, mình hôm nay đã dựa vào tài liệu Training Scope mà công ty mình yêu cầu cho thực tập, làm một bài viết để tổng hợp các kiến thức nên trang bị sẵn khi đi intern, nó sẽ chú trọng nhiều vào lý thuyết căn bản hay những quy tắc code mà những người trước khi tham gia dự án nên biết/kiểm tra lại. Vì lượng nội dung cũng khá là khủng khiếp để có thể viết ra đầy đủ từng nội dung, mình xin phép được làm một tour tàu lượn siêu tốc 🚄 với các chỉ mục ngay bây giờ! 

Lét gô with PHP🦸.

## Mục lục
1. Lập trình hướng đối tượng trong PHP và những câu hỏi.
2. Functional Programming (Lập trình hàm).
3. Meta Programming (Lập trình meta).
4. Một số tiêu chuẩn code.
5. Một số đề mục khác.

# 1. Lập trình hướng đối tượng trong PHP và những câu hỏi.

### OOP trong PHP

Nếu mọi người chưa từng nghe tới khái niệm Lập Trình Hướng Đối Tượng hay chưa biết nó sẽ có những đặc điểm gì khác so với Java hay C++. Hãy ghé thăm w3schools với khóa học chất lượng [này](https://www.w3schools.com/php/php_oop_what_is.asp). ([Vn](https://vi-magento.com/oop-trong-php-la-gi/))

## Phân biệt Abstract và Interface

Phân biệt Abstract và Interface. 
Có rất nhiều bài viết trả lời về vấn đề này, mình xin trích lại 1 [bài viết](https://viblo.asia/p/lap-trinh-huong-doi-tuong-voi-php-va-nhung-dieu-can-biet-phan-1-GrLZDbzV5k0#_2-su-khac-biet-giua-abstract-class-va-interface-7) trong Viblo:
* **Abstract class**: là một class cha cho tất cả các class có cùng bản chất. Bản chất ở đây được hiểu là kiểu, loại, nhiệm vụ của class. Hai class cùng hiện thực một interface có thể hoàn toàn khác nhau về bản chất. Hiểu đơn giản như một thằng con (child class) chỉ có thể là con của một thằng cha, có tính cách giống cha (abstract class) nó.
* **Interface**: là một chức năng mà bạn có thể thêm và bất kì class nào. Từ chức năng ở đây không đồng nghĩa với phương thức (hoặc hàm). Interface có thể bao gồm nhiều hàm/phương thức và tất cả chúng cùng phục vụ cho một chức năng.

> Bạn không nên nhầm lẫn khi nói về việc một class được implement hay extend. Nhiều người thường hay đồng nhất là không phân biệt hai từ này, nhưng chính chúng đã nói lên sự khác biệt giữa interface và abstract class. Bạn chỉ có thể thừa kế (extend) từ một class và chỉ có thể hiện thực (implement) các chức năng (interface) cho class của mình.

## Static và Final

* **Static:** Static trong lập trình hướng đối tượng là một thành phần tĩnh (có thể là thuộc tính hoặc phương thức) mà nó hoạt động như một biến toàn cục, dù cho nó có được xử lý ở trong bất kỳ một file nào đi nữa (trong cùng một chương trình) thì nó đều lưu lại giá trị cuối cùng mà nó được thực hiện vào trong lớp.
* **Final:** Khi một class được khai báo là final thì không lớp nào có thể kế thừa nó. Khi báo một phương thức là final thì không có một phương thức nào có thể override.

Ghé thăm [cách khai báo và sử dụng Static và Final trong PHP](https://toidicode.com/static-va-final-trong-php-huong-doi-tuong-105.html) như thế nào nhé.

*Chú ý thêm về hàm static:*
Phương thức static là phương thức có thể truy cập mà không cần khởi tạo một đối tượng của class.
Phương thức static gắn liền với class hơn là với object (là thành phần khởi tạo class bằng từ khóa new), đây là những phương thức chỉ có một, có địa chỉ xác định và không thay đổi địa chỉ trên vùng nhớ (tĩnh).
Khi chương trình chạy, nó sẽ được sinh ra đầu tiên trước tất cả các truy nhập tới nó và tồn tại cho tới khi chương trình kết thúc.

Phương thức static có thể gọi ngay cả khi chưa khởi tạo object, nhưng ngược lại, nếu phương thức static gọi đến một phương thức non-static thì khi chưa khởi tạo object, sẽ không có biến $this (là đại diện của object) để gọi đến phương thức 'non-static' -> **Lỗi**.

## Phân biệt static::method() với self::method()

* **Self:** đại diện cho class khai báo nó.
* **Static:** đại diện cho class gọi đến nó.

Hãy thử suy ngẫm đoạn code dưới đây:
```
class Person
{
    public static function getSeflObject()
    {
        return new self;
    }
    public static function getStaticObject()
    {
        return new static;
    }
}
class Girl extends Person
{
}
echo get_class(Girl::getSeflObject()); 
echo get_class(Girl::getStaticObject()); 
```

Bạn đoán 2 lần echo này sẽ ra kết quả là gì?. Lần lượt sẽ là `Person` và `Girl` đấy.

Tại sao ư? Xem bài viết đầy đủ của phần này [tại đây](https://viblo.asia/p/lap-trinh-huong-doi-tuong-voi-php-va-nhung-dieu-can-biet-phan-1-GrLZDbzV5k0#_3-the-nao-la-mot-phuong-thuc-static-phan-biet-cach-dung-tu-khoa-staticmethod-voi-selfmethod-8).

## Khái niệm Trait
> Bạn thấy khó khăn vì PHP chỉ hỗ trợ đơn kế thừa? Mọi người cũng thế. Đó là lý do chúng ta có Trait.

* **Trait:** Traits là một module giúp cho chúng ta có thể sử dụng lại các phương thức được khai báo trong trait  vào các class khác nhau, nói đơn giản hơn thì chính là tương tự kế thừa. 

Tất nhiên, nếu bạn thấy hoang mang thì hãy ghé thăm bài viết đầy đủ mà mình [recommend](https://viblo.asia/p/tim-hieu-ve-trait-trong-php-bxjeZWENkJZ).

## Khái niệm Namespaces

* **Namespace** có thể hiểu đơn giản như là thư mục trên các hệ điều hành, để phân cấp và phân biệt các thực thể có tên giống nhau. Nó giúp giải quyết vấn đề tác quyền của thư viện đang sử dụng và việc phân biệt không gian tên của những thành phần code thường được tái sử dụng như class và function.

ĐỊnh nghĩa namepsaces:
```
<?php
namespace nameSpace;
```

Nạp namespaces bằng use:
```
<?php
namespace nameSpace;
use nameSpace\className;
```

##  Các phương pháp thiết kế hướng đối tượng (SOLID)

### SOLID là viết tắt của:
* S: Single Responsibility principle (nguyên lý đơn nhiệm).
* O: Open-Closed principle (nguyên lý mở rộng - hạn chế).
* L: Liskov substitution principle (nguyên lý thay thế Liskov).
* I: Interface segregation principle (nguyên lý giao diện phân biệt - hay phân tách interface).
* D: Dependency inversion principle (nguyên lý nghịch đảo phụ thuộc).

Nếu bạn vẫn đang không biết **Chất rắn** này là gì, thì hãy thử ngay ở bài viết [Các phương pháp thiết kế hướng đối tượng.](https://viblo.asia/p/lap-trinh-huong-doi-tuong-voi-php-va-nhung-dieu-can-biet-phan-3-bJzKmWBPl9N#_8-cac-phuong-phap-thiet-ke-huong-doi-tuong-solid-2)

# 2. Functional Programming (Lập trình hàm).
## First-class Function

**Định nghĩa:** Một ngôn ngữ lập trình được gọi là sở hữu First-class Function khi mà trong ngôn ngữ đó, function được đối xử y hệt các biến khác.

Các tính chất của nó bao gồm:
* Gán một biến cho một hàm
* Sử dụng một hàm làm argument
* Return về một function

Nếu bạn vẫn chưa nhận ra gương mặt thân quen này, mời bạn ghé thăm [bài viết này](https://anonystick.com/blog-developer/first-class-function-la-gi-2021070468764334).

## Anonymous function và closure

* **Anonymous Function:** Các hàm ẩn danh, còn được gọi là bao đóng, cho phép tạo các hàm không có tên cụ thể.
* **Closure:** Closure cũng là một hàm ẩn danh, nhưng closure có thêm chức năng là có thể sử dụng các biến bên ngoài phạm vi mà nó được tạo ra.

Xem thêm chức năng và cách sử dụng tại đây: [Hàm ẩn danh Lambda và Closure trong PHP](https://toidicode.com/ham-an-danh-lambda-va-closure-trong-php-110.html)

# 3. Meta Programming (Lập trình meta)

## Magic Function
* Magic methods là các phương thức đặc biệt được tạo ra nhằm giải quyết các vấn đề về sự kiện trong chương trình (cụ thể là với class), và đối với PHP cũng thế.

Thông thường mỗi magic method sẽ được kích hoạt (trigger) ở một sự kiện nào đó mà ta tác động vào đối tượng. Ví dụ hàm __get() và __set() sẽ được gọi khi ta tiến hành gán hay lấy giá trị của các thuộc tính trong đối tượng. Và vì nó có tính đặc biệt nên bạn dễ dàng nhận biết nó qua hai dấu gạch dưới (__), nghĩa là tất cả các phương thức Magic methods đều có tên bắt đầu bằng hai dấu gạch dưới. 

Bạn có thể tìm hiểu thêm tại: [Tìm hiểu Magic methods trong PHP](https://freetuts.net/tim-hieu-magic-methods-trong-php-352.html)

# 4. Một số tiêu chuẩn code

## PSR

* **Định nghĩa:** PSR có nghĩa là PHP Standards Recommendations, nó là tiêu chuẩn được khuyến nghị áp dụng khi lập trình PHP và được các lập trình viên, tổ chức chấp nhận sử dụng rộng rãi.
* PSR bao gồm 7 phần (http://www.php-fig.org/psr/) từ PSR-1, PSR-2, PSR-3, PSR-4, PSR-6, PSR-7. Các tiêu chuẩn thành phần hoàn chỉnh của PSR đó gồm:
1. Basic Coding Standard: Tiêu chuẩn cơ bản khi viết code PHP
2. Coding Style Guide: Tiêu chuẩn trình bày code
3. Logger Interface: Giao diện logger
4. Autoloading Standard: Tiêu chuẩn về tự động nạp
5. Caching Interface: Giao diện về Caching
6. HTTP Message Interface: Tiêu chuẩn Giao diện thông điệp HTTP

Bạn có thể tìm đọc tại: https://www.php-fig.org/psr/ 
Hoặc phiên [bản tiếng việt](https://lcdung.top/huong-dan-viet-code-php-chuan-psr-tieu-chuan-khi-lap-trinh-php/).

## PHP Code Sniffer

* **Định nghĩa:** PHP Code Sniffer (hay còn gọi là phpcs) là một cộng cụ phục vụ lập trình viên trong việc check các coding convention. Check coding convention là gì [tại đây](https://wiki.tino.org/code-convention-la-gi/).

PHP Code Sniffer bao gồm 2 tập lệnh PHP:
* Tập lệnh phpcs là tập lệnh chính mã hóa các tệp PHP, Javascript, CSS để phát hiện các vi phạm coding convention.
* Tập lệnh phpcbf để tự động sửa các phần code vi phạm tiêu chuẩn coding convention.

Bạn có thể xem cách cài đặt và sử dụng đã được viết chi tiết tại: [Tìm hiểu, cài đặt và sử dụng PHP Code Sniffer](https://viblo.asia/p/tim-hieu-cai-dat-va-su-dung-php-code-sniffer-Eb85ojgOl2G#_cai-dat-3)

# 5. Các đề mục khác

## Splat Operator

* **Định nghĩa:** Splat operator là một toán tử xuất hiện trong phiên bản PHP 5.6 trở lên. Bạn có thể sử dụng toán tử splat (...) để tạo các hàm đa dạng và đơn giản hơn như là các hàm nhận một số lượng đối số không xác định.

## Argument Unpacking
* **Định nghĩa:** Array và Traversable objects có thể được giải nén thành danh sách đối số khi gọi các hàm bằng cách sử dụng toán tử ...

Đón đọc bài viết đầy đủ tại: [Splat Operator trong PHP](https://blog.haposoft.com/splat-operator-trong-php/)

# Kết bài

Nếu bạn đọc hết một loạt chỉ mục dài này mà không còn lăn tăn ở đoạn nào, thì xin chúc mừng, bạn đã có kiến thức quá vững cho việc intern PHP. (Hoặc chí ít là đối với công ty mình 😅) 
Nếu bạn vẫn lăn tăn ở một vài điểm và cần đọc lại, thì lại càng chúc mừng hơn nữa 🥳 bạn vừa biết thêm các kiến thức cơ bản cho quá trình học hỏi của mình. 

Cảm ơn mọi người đã đọc bài ạ, rất hy vọng bài viết của mình có ích phần nào đó cho việc phát triển sự nghiệp coder của mọi người 🤖❣️.