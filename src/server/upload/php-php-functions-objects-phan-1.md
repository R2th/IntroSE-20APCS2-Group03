Có một số yêu cầu cơ bản đối với các ngôn ngữ lập trình như là: Cần một nơi để lưu trữ data, quản lý flow program, đánh giá biểu thức, quản lý file, và text output ... Vv. Và PHP có đáp ứng được tất cả những thứ này, cộng thêm nó có support các câu lệnh như `else` hay `elseif` giúp ta điều khiển program một cách dễ dàng. Tuy nhiên, ngay cả khi ta dùng những thứ này thì việc lập trình vẫn sẽ trở nên khá tốn công và buồn chán, đặc biệt khi bạn phải viết lại các đoạn code giống nhau mỗi khi cần dùng chúng. <br>
Đó là lý do, người ta tạo ra các khái niệm về functions và objects. Và có thể bạn đã biết, thì `function` là một tập hợp các câu lệnh thực hiện một chức năng cụ thể, và return về một value tùy ý. Bạn có thể đặt một đoạn code - cần sử dụng nhiều lần vào trong một function và gọi function đó theo tên khi cần dùng tới nó. <br>
Functions có rất nhiều ưu điểm so với inline code. Ví dụ như: <br>
* Gõ ít code hơn
* Giảm lỗi liên quan tới cú syntax và các lỗi lập trình khác
* Giảm thời gian load của program files
* Giảm thời gian thực thi, vì mỗi function chỉ biên dịch một lần, bất kể bạn gọi hàm đó nhiều như thế nào
* Có thể truyền vào function các arguments, cho nên ta có thể tái sử dụng trong nhiều trường hợp khác nhau

Ngoài ra, một `object` kết hợp với một hay nhiều funtion, và dữ liệu chúng sử dụng trong một cấu trúc duy nhất gọi là một `class`. <br>
Trong loạt bài viết này, ta sẽ tìm hiểu về cách sử dụng function, từ việc define nó, đến việc gọi nó ra để truyền các đối số. Với các kiến thức này, ta có thể bắt đầu tạo các function và sử dụng nó cho các object của chúng ta. (ta gọi đây là các `methods`.)
> **Tips**: Hiện nay, có rất nhiều version PHP khác nhau. Nhưng tôi khuyên bạn nên sử dụng PHP version 5.6 trở lên, để bạn có thể dễ dàng folow theo những bài viết này.

## PHP Functions
PHP có hàng trăm các functions được tích hợp sẵn, làm nó trở thành một ngôn ngữ rất tiện ích và phong phú. Để sử dụng function, hãy gọi nó ra thông qua tên. Ví dụ, bạn có thể xem function date dưới đây: <br>
`echo date("l"); // Hiển thị ngày trong tuần` <br>
Dấu ngoặc đơn ở trên sẽ nói cho PHP biết rằng, bạn đang tham chiếu tới một function. Nếu không có, PHP sẽ nghĩ rằng bạn đang tham chiếu tới một contant. 
Một function có thể không nhận vào bất kỳ argument nào. Ví dụ, function `phpinfo` dưới đây hiển thị rất nhiều thông tin về cài đặt của PHP hiện tại, nhưng không yêu cầu argument. <br>
`phpinfo();` <br>
![](https://images.viblo.asia/20cfe210-aed7-4c8f-b6c8-8e39dd17a3d0.png) <br>
> **Tips**: function `phpinfo` cực kỳ hữu ích để ta biết được thông tin về các cài đặt PHP hiện tại, nhưng nó cũng có thể rất hữu ích đối với các hacker. Do đó, đừng bao giờ để lại đoạn function này trong các đoạn code của bạn. 
> 
Ta có thể tiếp tục xem một số function tích hợp sẵn, yêu cầu một hay nhiều argument đầu vào như dưới đây: 
```php
<?php
  echo strrev(" .dlrow olleH"); // Reverse string
  echo str_repeat("Hip ", 2);   // Repeat string
  echo strtoupper("hooray!");   // String to upper case
?>
```
Ví dụ trên đã sử dụng 3 string function để ouput ra đoạn text dưới đây: <br>
`Hello world. Hip Hip HOORAY!` <br>
Ta thấy rằng, funtion `strrev` sẽ đảo ngược thứ tự các ký tự trong string, function str_repeat sẽ lặp lại string `"Hip "` 2 lần (theo yêu cầu của argument thứ 2). Và function `strtoupper` sẽ chuyển đổi `"hooray!"` thành chữ viết hoa. 
### Defining a Function
Cú pháp chung cho việc define một function như sau: <br>
```php
function function_name([parameter [, ...]]) 
{
　// Statements 
}
```
Ý nghĩa của dòng đầu tiên như sau: <br>
* Define một function sẽ bắt đầu bằng từ khóa `function`
* Tên hàm theo sau phải bắt đầu bằng một chữ cái hoặc dấu gạch dưới, và theo sau đó là chữ cái, số, hoặc dấu gạch dưới.
* Bắt buộc phải có dấu ngoặc đơn đi kèm
* Các tham số của hàm được phân tách bằng dấu phẩy

Ngoài ra, tên function sẽ không phân biệt chữ hoa - thường, vì vậy tất cả các string sau đều tham chiếu tới `print` function: `PRINT, Print, và PrInT`. <br>
Các câu lệnh của function sẽ được viết trong cặp dấu ngoặc nhọn mở - đóng, các cấu lệnh này có thể bao gồm một hay nhiều lệnh `return`, lệnh `return` sẽ ép buộc dừng thực thi và thực hiện trả về giá trị yêu cầu.
### Returning a Value
Ta cùng nhau xem một function đơn giản dưới đây giúp convert fullname của peron thành lowercase và thực hiện viết hoa chữ cái đầu tiên. <br>
Ở phần trên, ta đã làm quen với function `strtoupper` được tích hợp sẵn của PHP. Sau đây ta sẽ sử dụng một function tương tự đó là `strtolower`: <br>
```php
$lowered = strtolower("aNY # of Letters and Punctuation you WANT");
echo $lowered;
```
Ta có output như sau: <br>
`any # of letters and punctuation you want` <br>
Tuy nhiên, tôi không muốn tất cả các ký tự đều là chữ thường, tôi muốn viết hoa chữ cái đầu tiên. May mắn là trong PHP cũng có cung cấp một function tên là `ucfirst` giúp chuyển đổi ký tự đầu tiên string thành chữ in hoa: <br>
```php
$ucfixed = ucfirst("any # of letters and punctuation you want");
echo $ucfixed;
```
Ta có output như sau: <br>
`Any # of letters and punctuation you want` <br>
Giờ ta có thể thực hiện thiết kế một program đơn giản đầu tiên: đó là, để có được một từ viết hoa chữ cái đầu tiên, ta sẽ gọi `strtolower` trước, sau đó tiếp tục gọi `ucfirst`. Cách để thực hiện điều này đó là ta lồng function `strtolower` trong `ucfirst`. Điều quan trọng là ta phải chú ý đến thứ tự thực thi của biểu thức.  <br>
Trước hết, ta thử thực hiện gọi tới function như sau: <br>
`print(5-8);` <br>
Ở trên, biểu thức 5 - 8 sẽ được thực thi trước, và ta có ouput là -3. (Ở đây, PHP sẽ convert kết quả thành một string và hiển thị nó ra màn hình). Và nếu biểu thức này bao gồm một function khác bên trong, thì function này sẽ được thực thi trước: <br>
`print(abs(5-8));` <br>
Trong biểu thức trên, PHP đã thực hiện một số việc theo trình tự như sau: <br>
* Thực hiện phép tính 5 - 8 để trả về giá trị là -3
* Dùng function `abs` để biến đổi - 3 thành 3
* Convert kết quả thành string và ouput ra bằng function `print`

Tóm lại, PHP đã thực thi biểu thức từ trong ra ngoài. Và biểu thức dưới đây cũng hoạt động theo trình tự tương tự: <br>
`ucfirst(strtolower("aNY # of Letters and Punctuation you WANT"))` <br>
Ở đây, PHP sẽ gọi tới `strtolower` trước, sau đó gọi tới `ucfirst` function, ta được output như sau: <br>
`Any # of letters and punctuation you want` <br>
Ở ví dụ tiếp theo dưới đây, ta sẽ define một function có 3 đối số names, mỗi name là chữ thường có ký tự đầu tiên viết hoa. <br>
```php
<?php
  echo fix_names("WILLIAM", "henry", "gatES");

  function fix_names($n1, $n2, $n3)
  {
    $n1 = ucfirst(strtolower($n1));
    $n2 = ucfirst(strtolower($n2));
    $n3 = ucfirst(strtolower($n3));

    return $n1 . " " . $n2 . " " . $n3;
  }
?>
```
Ta thu được output như sau: <br>
`William Henry Gates` <br>
### Returning an Array
Trước version PHP 5.3, ta có thể mở đầu một biến bằng ký tự `&` tại thời điểm gọi funcion (ví dụ, `increment(&$myvar);`) để yêu cầu trình phân tích truyền một tham chiếu tới biến, chứ không phải giá trị của biến. Điều này đã cho phép một function truy cập vào biến (cho phép các giá trị khác nhau được ghi ngược lại vào nó)
> **Tips**: Kiểu truyền tham chiếu theo thời gian gọi này đã không được dùng trong PHP 5.3 và được xóa bỏ hoàn toàn ở PHP 5.4. Do đó, bạn không nên dùng tính năng này ngoại trừ những trang web cũ. Lời khuyên là, bạn nên viết lại code mà đã dùng theo kiểu truyền tham chiếu này, bởi vì nó sẽ gặp phải lỗi cực kỳ nghiêm trọng ở các phiên bản PHP mới hơn.

Tuy nhiên, trong chỗ định nghĩa function, bạn vẫn có thể tiếp tục truy cập các đối số thông qua tham chiếu. Khái niệm này có thể hơi khó hiểu chút, do đó ta sẽ cùng quay lại với ví dụ về hộp diêm ở các bài viết trước. <br>
Hãy tưởng tượng rằng, thay vì lấy một mảnh giấy ra khỏi hộp diêm, đọc nó, copy những gì trong nó sang một mảnh giấy khác, đặt bản gốc quay trở lại hộp, và truyền bản copy đó tới một function. Thì ta có một cách đơn giản hơn đó là đính kèm một sợi chỉ vào mảnh giấy ban đầu, và truyền đầu còn lại tới functoin.
![](https://images.viblo.asia/a52641b2-9d3e-4c77-ada4-c895c8501f83.png)
Sau đó thì function có thể theo dõi luồng này để tìm dữ liệu được truy cập. Điều này sẽ tránh được quá tải việc tạo ra các bản copy của biến chỉ cho function sử dụng. Hơn nữa, function này giờ có thể chỉnh sửa trực tiếp giá trị của biến. <br>
Sau đây ta sẽ viết lại ví dụ về function `fix_names` bên trên để truyền các tham chiếu cho tất cả các tham số, và sau đó function có thể chỉnh sửa trực tiếp các tham số này. 
```php
<?php
  $a1 = "WILLIAM";
  $a2 = "henry";
  $a3 = "gatES";

  echo $a1 . " " . $a2 . " " . $a3 . "<br>";
  fix_names($a1, $a2, $a3);
  echo $a1 . " " . $a2 . " " . $a3;

  function fix_names(&$n1, &$n2, &$n3)
  {
    $n1 = ucfirst(strtolower($n1));
    $n2 = ucfirst(strtolower($n2));
    $n3 = ucfirst(strtolower($n3));
  }
?>
```
Thay vì truyền trực tiếp các string vào function, đầu tiên ta sẽ gán nó tới các biến, và in nó ra để xem giá trị đầu tiên của nó trước đã. Sau đó, ta gọi tới function như bình thường, có điều đặc biệt là ở chỗ định nghĩa function ta sẽ đặt thêm ký tự `&` ở trước mỗi tham số mà sẽ thực hiện truyền tham chiếu. <br>
Giờ đây, thì các biến` $n1`, `$n2`, và `$n3` sẽ được gắn vào "threads" nối tới các giá trị của `$a1`, `$a2`, và `$a3`. Nói cách khác, đây là một nhóm các giá trị, nhưng có 2 tập tên biến được phép truy cập vào chúng. 
Dó đó, function `fix_names` chỉ cần gán các giá trị mới cho ` $n1`, `$n2`, và `$n3` để update giá trị cho `$a1`, `$a2`, và `$a3`. Ta có output của đoạn code này như sau: 
```
WILLIAM henry gatES
William Henry Gates
```
Như bạn thấy cả 2 câu lệnh `echo` chỉ sử dụng giá trị của `$a1`, `$a2`, và `$a3`.
### Returning Global Variables
Có một cách tốt hơn để cho phép funcion truy cập một biến được tạo phía bên ngoài đó là khai báo nó có có quyền truy cập global từ bên trong của function.  Theo sau từ khoá `global` là tên biến, cho phép mọi phần trong code của bạn có full quyền truy cập.
```php
<?php
  $a1 = "WILLIAM";
  $a2 = "henry";
  $a3 = "gatES";

  echo $a1 . " " . $a2 . " " . $a3 . "<br>";
  fix_names();
  echo $a1 . " " . $a2 . " " . $a3;

  function fix_names()
  {
    global $a1; $a1 = ucfirst(strtolower($a1));
    global $a2; $a2 = ucfirst(strtolower($a2));
    global $a3; $a3 = ucfirst(strtolower($a3));
  }
?>
```
Giờ đây bạn không phải truyền các tham số cho function nữa. Sau khi được khai báo, các biến này sẽ giữ lại quyền truy cập global, và được sẵn sàng truy cập trong mọi phần còn lại của program, bao gồm cả functions của nó. 
### Recap of Variable Scope
Để nhớ lại kiến thức, tôi sẽ tóm tắt lại kiến thức quan trọng về Variable Scope: <br>
* *Local variables* chỉ có thể truy cập được trong phạm vi chỗ code mà bạn đã define nó. Nếu nó nằm bên ngoài function, thì nó có thể được truy cập bởi tất cả các code bên ngoài function, class, ...vv. Nếu một biến nằm bên trong một function, thì chỉ có function đó có thể truy cập biến này, và giá trị của biến này sẽ mất khi function được return.
* *Global variables* biến này có thể được truy cập từ bất kỳ đâu trong code của bạn
* *Static variables* ngược lại với một biến được khai báo như một function parameter - loại mà giá trị sẽ bị phá huỷ khi exit function, thì static variable sẽ không bị mất giá trị khi exit function, và nó sẽ vẫn giữ được giá trị khi function được gọi lại. Ta có thể tham khảo giá trị dưới đây: 
```php
<?php
   function keep_track() {
      STATIC $count = 0;
      $count++;
      print $count;
      print "<br />";
   }
   
   keep_track();
   keep_track();
   keep_track();
?>
```
Ta thu được kết quả như sau: 
```php
1
2
3
```
## Including and Requiring Files
Khi đã quen thuộc hơn với việc lập trình PHP, có thể bạn sẽ muốn build một library các functions mà bạn nghĩ sẽ cần dùng lại nó trong tương lại. Hoặc có thể bạn muốn sử dụng các library sẵn có do các lập trình viên khác đã viết. <br>
Chúng ta sẽ không cần copy và paste các functions vào code. Vì ta có thể lưu chúng vào các file riêng biệt và dùng command để gọi chúng về. Có 2 command để thực hiện hành động này đó là: `include` and `require`.
### The include Statement
Khi dùng `include`, bạn sẽ yêu cầu PHP fetch về một file cụ thể và load tất cả nội dung của nó. Nó giống như thể là bạn paste một included file vào file hiện tại. Dưới đây là cách ta include một file tên là *library.php*.
```php
<?php
  include "library.php";
  // Your code goes here
?>
```
### Using include_once
Mỗi khi bạn đưa ra yêu cầu `include`, nó sẽ include lại file được đã được yêu cầu include, ngay cả khi bạn đã insert nó rồi. Ví dụ, giả sử rằng file *library.php* chứa rất nhiều function hữu ích, và bạn include nó vào file, nhưng bạn cũng include một library khác - đang include *library.php*. Do đó, bạn đã vô tình include file *library.php* 2 lần. Điều này sẽ gây ra message lỗi, vì bạn đang cố gắng define cùng một constant hay function nhiều lần. Do vậy, bạn nên sử dụng `include_once` để thay thế cho include.
```php
<?php
  include_once "library.php";
  // Your code goes here
?>
```
Sau đó thì dù bạn có cố gắng include file trùng nhau đi nữa (bằng `include` hoặc `include_once`) thì nó cũng sẽ được bỏ qua. Để xác định liệu requested file có được executed hay không, thì absolute file path sẽ được matched sau khi relative paths được giải quyết và file được tìm thấy trong include path. 
> **Tips**: Nói chung là, bạn nên sử dụng câu lệnh `include_once` và bỏ qua lệnh `include`. Bằng cách này, thì bạn sẽ không bao giờ gặp vấn đề về file bị include nhiều lần.

### Using require and require_once
Một vấn đề tiềm ẩn đối với `include` và `include_once`đó là PHP chỉ "cố gắng" include file được yêu cầu. Program sẽ vẫn tiếp tục chạy cho dù file không được tìm thấy. <br>
Khi thấy thực sự cần thiết bắt buộc phải include một file nào đó, ta hãy dùng `require`. Các lý do cũng tương tự như với `include_once`, tôi khuyên bạn nên dùng `require_once`khi bạn cần require file.


<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác về PHP ở các bài viết lần tới nhé.<br>
Nguồn: <br>Learning PHP, MySQL & JavaScript With jQuery, CSS & HTML5*