Trong bài này, chúng ta tiếp tục cùng nhau tìm hiểu về cấu trúc tổng quát của ngôn ngữ PHP nhé.
## Multiple-Line Commands
Trong thực tế, đôi khi ta cần output ra khá nhiều nội dung text, và nếu dùng nhiều lệnh `echo` (hoặc `print`) thì có vẻ khá tốn thời gian và trông lộn xộn. Để khắc phục điều này, PHP đã cung cấp 2 tiện ích. Một là, viết nhiều dòng nằm trong dấu nháy kép. Hai là, có thể gán giá trị cho biến rồi output ra một lần. <br>
Ví dụ, dưới đây là echo ra multiline string <br>
```php
<?php
  $author = "Steve Ballmer";

  echo "Developers, Developers, developers, developers, developers,
  developers, developers, developers, developers!
  - $author.";
?>
```
Còn dưới đây là kiểu gán multiline string cho biến: <br>
```php
<?php
  $author = "Bill Gates";

  $text = "Measuring programming progress by lines of code is like
  Measuring aircraft building progress by weight.
  - $author.";

  echo $text;
?>
```
PHP cung cấp cách hiển thị một chuỗi nhiều dòng bằng cách sử dụng toán tử `<<<` - ta thường gọi là **here-document** hay **heredoc**. Đây là cách chỉ định một chuỗi ký tự giữ nguyên cách xuống dòng, hay khoảng trắng khác (bao gồm cả thụt đầu dòng). Bạn có thể tham khảo ví dụ dưới đây: <br>
```php
<?php
  $author = "Brian W. Kernighan";

  echo <<<_END
  Debugging is twice as hard as writing the code in the first place.
  Therefore, if you write the code as cleverly as possible, you are,
  by definition, not smart enough to debug it.
  
  - $author.
_END;
?>
```
Đoạn code này sẽ yêu cầu PHP rằng , mọi nội dung trong cặp thẻ `_END`  là một chuỗi ký tự. Bằng cách này, developer có thể viết trực tiếp toàn bộ các phần HTML trong code PHP, gán nó vào biến và thay thế động khi cần thiết. <br>
Điều quan trọng bạn cần chú ý ở đây đó là, từ khóa đóng `_END` phải viết ở đầu dòng mới, và tồn tại duy nhất trên dòng đó. Không được phép chèn bất kỳ ký từ nào khác vào dòng đó. Và khi bạn đã đóng lại khối này, bạn có thể tiếp tục sử dụng cùng tên thẻ nó ở các phần khác. <br>
> **Tips**: Khi sử dụng cấu trục heredoc `<<<_END..._END`, khi muốn xuống dòng bạn không cần add thêm ký tự \n - mà chỉ cần Enter để xuống dòng mới. Và không giống như khi bạn sử dụng dấu nháy kép hay nháy đơn trong string, đối với heredoc bạn có thể thoái mái sử dụng dấu nháy đơn hay nháy kép mà không cần thêm ký tự dấu chéo ngược \

Dưới đây là cú pháp assign multiline cho một biến: <br>
```php
<?php
$author = "Scott Adams";

$out = <<<_END
  Normal people believe that if it ain’t broke, don’t fix it.
  Engineers believe that if it ain’t broke, it doesn’t have enough
  features yet.
  - $author.
_END;
echo $out;
```
Ở đây, biến $out sẽ được truyền vào giá trị là nội dung giữa 2 thẻ `_END`. Chú ý là bạn không được đặt dấu chấm phẩy ; ngay sau thẻ `_END` đầu tiên vì nó sẽ kết thúc multiline block code trước khi nó bắt đầu, và điều này sẽ gây ra lỗi *Parse error*. Vị trí đặt dấu chấm phẩy đó là sau thẻ đóng `_END`. (Trong đoạn nội dung text thì bạn có thể sử dụng bất kể ký tự nào, bao gồm cả dấu chấm phẩy) <br>
Trong các ví dụ trên, tôi đã sử dụng tên thẻ là `_END`. Tuy nhiên bạn có thể sử dụng bất kỳ tên thẻ nào bạn muốn, ví dụ như `_SECTION1` hay `_OUTPUT` ...vv. Ngoài ra, để phân biệt tên thẻ heredoc này với tên các biến, hoặc tên hàm khác, quy tắc chung là bạn nên để tên thẻ này bắt đầu bằng ký tự gạch dưới. (Nếu bạn thực sự không thích thì không dùng ký tự gạch dưới này cũng được) <br>
> **Tips**: Thực ra nếu bạn thiết lập nội dung text trên nhiều dòng như trên, thì nó chỉ giúp cho code PHP của bạn dễ đọc hơn. Một khi bạn mở nó bằng trình duyệt web, quy tắc HTML của trình duyệt sẽ không hiển thị các ký tự xuống dòng như bạn mong muốn. <br>
> Để trình duyệt có thể hiện thị chính xác layout như bạn đã nhập, bạn có thể add thêm các thẻ html như là `<br>`..., hoặc là dùng lệnh `echo nl2br($out);`

## Variable Typing
PHP là ngôn ngữ có cú pháp khá lỏng lẻo. Điều này có nghĩa là, các biến không cần phải được khai báo trước khi sử dụng, và PHP sẽ tự động chuyển đổi các biến đó thành kiểu dữ liệu phù hợp theo yêu cầu của ngữ cảnh. <br>
Giả sử bạn có thể tạo một multiple-digit number và trích xuất chữ số thứ n bằng cách coi nó như một string. Ví dụ dưới đây, ta nhân 12345 với 67890, ta được kết quả trả về là 838102050, sau đó gán nó vào biến $number. <br>
```php
<?php
  $number = 12345 * 67890;
  echo substr($number, 3, 1);
?>
```
Ta thấy rằng, tại thời điểm gán, $number là một numeric variable. Nhưng ở dòng tiếp theo, ta gọi tới function `substr` của PHP, hàm này yêu cầu trả về một ký tự từ biến `$number`, bắt đầu từ vị trí thứ 4 (Lưu ý là, PHP offset bắt đầu từ 0). Để làm điều này, PHP đã biến $number thành một chuỗi có 9 ký tự, qua đó giúp function `substr` có thể truy cập vào nó và trả về 1 ký tự, trong trường hợp này, kết quả trả về là 1. <br>
Và việc chuyển một chuỗi thành một số cũng tương tự như vậy. Trong ví dụ dưới đây, ta có biến $pi được set là một string, sau đó giá trị này đã được chuyển tự động thành floating-point number ở dòng thứ 3, bằng công thức tính diện tích hình tròn. Ta thu được kết quả là 78.5398175. <br>
```php
<?php
  $pi     = "3.1415927";
  $radius = 5;
  echo $pi * ($radius * $radius);
?>
```
Như vậy, trong thực tế ta không cần lo lắng quá nhiều tới kiểu dữ liệu của biến. Ta chỉ cần gán cho nó giá trị phù hợp và PHP sẽ tự động chuyển đổi nó nếu cần thiết. Sau đó, nếu bạn muốn truy xuất giá trị của nó chỉ cần request nó. Ví dụ sử dụng với câu lệnh `echo`.
## Constants
Constants cũng tương tự như variable - giữ thông tin để truy cập và sử dụng sau này. Tuy nhiên, khi ta đã xác định và set giá trị cho constant, thì giá trị của nó được sử dụng xuyên suốt, chứ không thể tùy ý thay đổi ở đoạn code sau. <br>
Ví dụ, ta có thể dùng constant để gán thông tin server root ( - là thư mục chứa các file chính của website). Có có thể định nghĩa nó như sau: <br>
`define("ROOT_LOCATION", "/usr/local/www/");` <br>
Sau đó, để đọc nội dung của nó, bạn chỉ cần coi nó như một biến thông thường (nhưng không có dấu $ phía trước): <br>
`$directory = ROOT_LOCATION;` <br>
Sau này, khi bạn cần chạy PHP code trên một server khác với một cấu hình khác, nếu muốn thay đổi lại giá trị của thông tin server root trên, bạn chỉ cần thay đổi tại một chỗ.
> **Tips:** Có 2 điều bạn phải nhớ về constant đó là, nó không có dấu $ đằng trước, vầ để define nó thì chỉ cần sử dụng function `define`.

Về convention thì ta nên sử dụng chữ in hoa cho tên của constant. Qua đó giúp người khác có thể dễ dàng đọc code của bạn hơn. 
## Predefined Constants
PHP trang bị sẵn khá nhiều constant mà bạn ít khi sử dụng tới nó khi mới bắt đầu tìm hiểu PHP. Tuy nhiên, có một số constant được gọi là *magic constants* - mà tôi thấy khá hữu ích. Tên của magic constants này luôn luôn có 2 dấu gạch dưới ở đầu và ở cuối. Do đó, giúp bạn không bị nhầm việc đặt tên các constant của riêng mình với tên đã được PHP sử dụng. Cụ thể, bạn có thể tham khảo một số magic contants ở bảng dưới đây: <br>

![](https://images.viblo.asia/43d04c3b-bcfe-4513-8341-55658bddb404.JPG)

Một cách sử dụng hữu ích nối với các constant này đó là dùng để debug, bạn có thể chèn nó vào khi debug để xem code của chúng ta có đang chạy đúng hay không. <br>
`echo "This is line " . __LINE__ . " of file " . __FILE__;` <br>
Dòng code trên sẽ in ra dòng code hiện tại của file hiện tại (bao gồm của path) trên web browser.
## The Difference Between the echo and print Commands
Cho đến thời điểm hiện tại, bạn thấy rằng ta đã sử dụng lệnh `echo` theo một số cách khác nhau để output ra nội dung text từ server tới browser. Ví dụ như in ra một chuỗi ký tự, một chuỗi ký tự kết hợp với giá trị của biến, hay là ouput ra nội dung text trên nhiều dòng. <br>
Tuy nhiên, ta có một giải pháp thay thế cho việc sử dụng lệnh `echo` đó là, sử dụng hàm: `print`. Thoạt nhìn, 2 lệnh này khá giống nhau, tuy nhiên bản chất `print` là một hàm cấu trúc nhận vào một tham số đơn và return về giá trị, trong khi đó, `echo` hoàn toàn là một cấu trúc ngôn ngữ của PHP. Cả 2 lệnh này đều không yêu cầu dấu ngoặc đơn. <br>
Nói chung, lệnh `echo` có tốc độ nhanh hơn `print` một chút, vì không thiết lập kiểu return value. Mặt khác, vì `echo` không được implement như một function nên nó không thể sử dụng trong các biểu thức phức tạp hơn, Trong khi `print` lại có thể. Ví dụ, dưới đây ta thực hiện output ra giá trị của biến là True hay False sử dụng `sprint` - Nhưng ở đây ta sẽ không thể sử dụng với `echo` vì PHP sẽ bắn ra lỗi *Parse error*: <br>
`$b ? print "TRUE" : print "FALSE";` <br>
Dấu chẩm hỏi ? ở trên, có nghĩa đơn giản đó là hỏi xem biến `$b` là True hay False. Và lệnh ở bên trái dấu 2 chấm : sẽ được thực thi nếu biến $b là True, trong khi lệnh ở bên phải dấu 2 chấm : sẽ được thực thi nếu biến $b là False. <br>
Tuy nhiên, hầu hết các ví dụ trong loạt series này tôi sẽ sử dụng `echo`, nếu bạn gặp phải tình huống bắt buộc sử dụng `sprint` thì hãy cứ thoải mái sử dụng nhé. 
## Functions
`Function` có nghĩa là sẽ tách nhỏ các phần của code để thực hiện một tác vụ cụ thể. Ví dụ, bạn thường xuyên cần tra cứu ngày tháng và return nó về một format nhất định, thì đây là một ví dụ tốt để biến nó thành một function. Cho dù đoạn code xử lý của bạn chỉ có độ dài khoảng 2, 3 dòng, nhưng nếu bạn không viết thành function mà cứ paste nó nhiều lần vào program của bạn, sẽ khiến cho chương trình của bạn phức tạp một cách không cần thiết. Nếu bạn viết nó thành một function thì một là làm cho code của bạn ngắn gọn hơn, 2 là khi cần thay đổi, bạn chỉ cần thay đổi ở một nơi duy nhất. <br>
Không những thế, function có thể hoạt động theo cách khác nhau tùy tham số truyền vào khác nhau. Ví dụ, ta có function dưới đây: <br>
```php
<?php
  function longdate($timestamp)
  {
    return date("l F jS Y", $timestamp);
  }
?>
```
Function này trả về date theo kiểu định dạng *Sunday May 2nd 2021*. Ta có thể thiết lập truyền vào nhiều tham số khác nhau trong ngoặc đơn, tuy nhiên ở đây t ví dụ chỉ truyền một tham số. Và nội dung code nằm bên trong dấu ngoặc nhọn {} sẽ được thực thi, khi function này được gọi. Lưu ý rằng, chữ cái đầu tiên trong hàm `date` này là chữ in thường của chữ L, chứ không phải số 1 bạn nhé. <br>
Để ouput ra date ngày hôm nay sử dụng function này, ta có thể viết như sau: <br>
`echo longdate(time());` <br>
Và nếu bạn muốn in ra date của 17 ngày trước, ta có thể viết như sau: <br>
`echo longdate(time() - 17 * 24 * 60 * 60);` <br>
Đoạn code này đầu tiên sẽ lấy giá trị time hiện tại trừ đi số giây của 17 ngày trước (17 ngày x 24 giờ x 60 phút x 60 giây).
Nói chung, Function có thể chấp nhận chuyền vào nhiều tham số, và trả về nhiều kết quả khác nhau.
## Variable Scope
Nếu program của bạn rất dài, có thể bạn sẽ sử dụng hết các tên biến phù hợp để đặt tên cho biến, tuy nhiên PHP cho phép bạn có thể thiết lập phạm vi (`scope`) cho biến. Chẳng hạn, bạn muốn biến `$temp` chỉ được sử dụng bên trong một function cụ thể, và hủy bỏ nó đi một khi hàm đã thực hiện return. Trên thực tế, đây là phạm vi mặc định cho các biến PHP. <br>
Ngoài ra, bạn có thể thiết lập một biến có phạm vi `global`, và cho phép tất cả các nơi khác có thể truy cập nó. <br>
### Local variables
*Local variables* là biến được tạo bên trong function và chỉ có thể được truy cập được bên trong function đó. Chúng thường là các biến tạm thời để lưu trữ các kết quả đang được xử lý, trược khi thực hiện lệnh return của function. <br>
Một tập các local variable là list các đối số của function. Trong phần trước, ta đã define một function chấp nhận tham số đầu vào, tên là `$timestamp`. Biến local này chỉ có ý nghĩa trong phần body của function, bạn không thể get hay set giá trị cho nó khi ở bên ngoài function. <br>
Dưới đây là một ví dụ khác về local variable, ta thử sửa lại một chút ở function `longdate` nhé. <br>
```php
<?php
  function longdate($timestamp)
  {
    $temp = date("l F jS Y", $timestamp);
    return "The date is $temp";
  }
?>
```
Ở đây, ta đã gán giá trị được return bởi hàm `date` cho biến tạm `$temp`, sau đó chèn giá trị của biến này vào trong lệnh return của function. Và ngay sao khi function được return, biến `$temp` và nội dung của nó sẽ biến mất như chưa từng được sử dụng. <br>
Tiếp theo, để xem tác động về phạm vi của biến, ta thử khởi tạo biến `$temp` trước khi gọi hàm `longdate`: <br>
```php
<?php
  $temp = "The date is ";
  echo longdate(time());

  function longdate($timestamp)
  {
    return $temp . date("l F jS Y", $timestamp);
  }
?>
```
Tuy nhiên, do `$temp` không được khởi tạo trong function `longdate`, cũng như không truyền vào nó dưới dạng tham số nào, cho nên `longdate` sẽ không thể truy cập vào biến này. Do đó, đoạn code này chỉ output ra date, chứ không bao gồm nội dung text của `$temp`. Trên thực tế, tùy thuộc vào config của PHP, nó có thể xuất message lỗi `Notice: Undefined variable: temp` ra màn hình - cái mà bạn không muốn hiển thị tới user. <br>
Lý do là, theo mặc định  các biến được tạo trong một hàm là cục bộ của hàm đó và các biến được tạo bên ngoài bất kỳ hàm nào chỉ có thể được truy cập bằng nonfunction code. <br>
Do đó, ta có thể sửa lại ví dụ trên như sau:  <br>
```php
<?php
  $temp = "The date is ";
  echo $temp . longdate(time());

  function longdate($timestamp)
  {
    return date("l F jS Y", $timestamp);
  }
?>
```
Ở trên, ta đã di chuyển `$temp` ra bên ngoài function. Và chỉ gọi nó ở nới biến đó được define.  <br>
Ngoài ra, ta có một giải pháp khác đó là truyền `$temp` vào function như một đối số. <br>
```php
<?php
  $temp = "The date is ";
  echo longdate($temp, time());

  function longdate($text, $timestamp)
  {
    return $text . date("l F jS Y", $timestamp);
  }
?>
```
> **Tips**: Việc quên hay nhầm lẫn về phạm vi của biến là một lỗi lập trình khá phổ biến, vì vậy việc ghi nhớ cách hoạt động của phạm vi của biến sẽ giúp ta debug ra một số vấn đề khó khăn. 


### Global variables
Nhiều lúc bạn muốn có một biến có phạm vi `global`, vì bạn muốn truy cập nó từ mọi nơi trong code. Ngoài ra, có một số trường hợp data lớn và phức tạp, và bạn không muốn cứ phải truyền nó vào function như là một đối số. <br>
Do đó, để truy cập các biến từ phạm vi global, ta cần thêm keyword **global**.
Ví dụ khi bạn muốn cho tất cả code của bạn có thể truy cập được biến chứa thông tin xem user đã login vào website của bạn hay chưa. Bạn có thể sử dụng biến global như sau: <br>
`global $is_logged_in; ` <br>
Giờ đây, ở function login bạn chỉ cần set biến trên thành 1 nếu login thành công, hoặc set nó thành 0 nếu login thất bại. Do biến `$is_logged_in` là global cho nên code ở mọi nơi trong program của bạn đều có thể truy cập biến này. <br>
Có điều, bạn nên sử dụng những biến được cấp quyền global này một cách thận trọng nhé. Tôi nghĩ rằng bạn chỉ nên tạo ra chúng khi không thể tìm được cách nào khác. Về cơ bản, program nếu được chia thành các phần nhỏ và tách biệt nhau ra thì sẽ ít lỗi và dễ bảo trì hơn đấy. Ví dụ, program của bạn có tới mấy nghìn dòng code, vào một ngày bạn phát hiện ra biến global bị sai giá trị, thì thật khó tưởng tượng bạn phải mất bao lâu để debug và sửa lại cho chính xác?. <br>
Ngoài ra, nếu bạn sử dụng quá nhiều biến với phạm vi global, có thể dẫn tới tình trạng bạn sử dụng lại những tên biến global đó cho local, hoặc nghĩ nhầm lẫn rằng mình đã sử dụng nó là local, trong khi thực tế lại là global. Có rất nhiều lỗi có thể phát sinh từ vấn đề này, nên bạn hạn chế sử dụng nhiều biến global nhé. <br>
> **Tips**: Đôi khi, tôi áp dụng convention cho biến global là yêu cầu viết chữ hoa (tương tự như khuyến nghị cho constant), qua đó chỉ cần nhìn vào tên biến là ngay lập tức ta biết được scope của nó là gì. 

### Static variables
Như đã trình bày ở trên về biến local, đó là loại biến này sẽ bị xóa khi function kết thúc. Nếu function này chạy nhiều lần, nó sẽ tạo ra bản sao mới, và các setting trước đó của biến sẽ không có hiệu lực. <br>
Vậy trường hợp bạn muốn có một biến local bên trong function, nhưng lại không muốn các chỗ khác ngoài function có thể truy cập nó, và cũng muốn giữ giá trị của nó cho những lần sau khi function được gọi ? Ví dụ, đó là khi bạn muốn có một bộ đếm để theo dõi số lần function được gọi chẳng hạn. → Giải pháp ở đây là ta có thể khai báo một `static variable`, như ví dụ dưới đây: <br>
```php
<?php

  echo test();
  echo "<br><br>";
  echo test();
    
  function test()
  {
    static $count = 0;
    echo $count;
    $count++;
  }
?>
```
Ở đây, dòng đầu tiên của function `test` đã tạo ra một `static variable` tên là `$count` và khởi tạo giá trị là 0. Dòng tiếp theo output ra giá trị của biến, và dòng cuối cùng là tăng giá trị của biến đếm đó. <br>
Ở những lần sau khi function được gọi, vì biến `$count` đã được khai báo nên dòng đầu tiên của function sẽ được skip. Sau đó, giá trị đã tăng trước đó của `$count` sẽ được hiển thị trước, rồi tiếp tục tăng lên một lần nữa. <br>
Nếu bạn định sử dụng các static varibale, thì cần lưu ý rằng bạn không thể gán kết quả của một biểu thức trong định nghĩa của chúng. Chúng chỉ có thể được khởi tạo với các giá trị xác định trước. <br>
```php
<?php
  static $int = 0;         // Allowed 
  static $int = 1+2;       // Disallowed (will produce a Parse error)
  static $int = sqrt(144); // Disallowed
?>
```
### Superglobal variables
Bắt đầu từ phiên bản PHP 4.1.0, PHP đã định nghĩa sẵn trước một số biến gọi là *Superglobal variables*, chúng có tính global trong toàn program, và có thể truy cập ở mọi nơi. <br>
Những *Superglobal* này chứa rất nhiều thông tin hữu ích về program đang chạy và môi trường của nó. Chúng được thiết lập - cấu trúc như là các associative arrays (mảng kết hợp). Dưới đây là các Superglobal variables mà PHP cung cấp: <br>

![](https://images.viblo.asia/5823a45c-0b3e-4754-853a-fb8f20cd3352.JPG)

Tất cả các superglobals (ngoại trừ $GLOBALS) đều được đặt tên bắt đầu bằng dấu gạch dưới _ và viết hoa các ký tự. Do đó, bạn nên tránh đặt tên các biến của mình theo tên này để tránh nhầm lẫn nhé.  <br>
Để minh họa cách sử dụng chúng ta cùng xem một ví dụ. Trong số rất nhiều thông tin được cung cấp bởi các biến superglobal, có thông tin URL của page đã giới thiệu user đến web page hiện tại. Thông tin page giới thiệu này có thể được truy cập như sau: <br>
`$came_from = $_SERVER['HTTP_REFERER'];` <br>
Khá đơn giản đúng không. Tuy nhiên nếu user truy cập thẳng vào web của bạn bằng cách nhập trực tiếp URL chẳng hạn, thì $came_from sẽ có giá trị trống. 
### Superglobals and security
Tôi có một lời cảnh báo đó là bạn cần hết sức cẩn thận khi sử dụng superglobal variables, bởi vì các hacker rất thường xuyên sử dụng để cố gắng tìm cách khai thác, và xâm nhập vào trang web của bạn. Đó là, họ tìm cách tải lên `$_POST`, hoặc `$_GET`, hoặc là các superglobal khác có mã độc hại, như là các lệnh Unix hoặc MySQL có thể làm hỏng hay hiển thị các dữ liệu nhạy cảm nếu bạn vô tình truy cập vào chúng. <br>
Vì vậy, bạn cần luôn luôn làm sạch các superglobal trước khi sử dụng chúng. Một trong các cách phổ biến đó là sử dụng hàm `htmlentities` của PHP. Hàm này sẽ chuyển đổi tất cả các ký tự thành các HTML entities. Ví dụ, các ký tự lớn hơn > , nhỏ hơn < sẽ được chuyển đổi thành `&lt;` và `&gt;` để chúng trở nên vô hại với hệ thống, và ký tự khác như các dấu ngoặc kép, dấu chéo ngược ...vv cũng được chuyển đổi tương tự. <br>
Do đó, một cách an toàn hơn để truy cập `$_SERVER` (và các biến superglobals) đó là cách sau: <br>
`$came_from = htmlentities($_SERVER['HTTP_REFERER']);` <br>
> **Tips**: Việc sử dụng function `htmlentities` cho việc làm sạch nội dung không chỉ áp dụng với superglobal variable, mà nó còn là một bước quan trọng trong bất kỳ trường hợp nào - nơi mà data của user hoặc của bên thứ 3 đang được xử lý cho đầu ra.

<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác về PHP ở các bài viết lần tới nhé.<br>
Nguồn: <br>Learning PHP, MySQL & JavaScript With jQuery, CSS & HTML5<br>[dammelaptrinh.com](http://dammelaptrinh.com/php-cac-bien-global-superglobal.html)*