Trong bài này, chúng ta sẽ tìm hiểu những kiến thức nền tảng quan trọng của PHP, nó không quá khó nhưng bạn đọc nên tìm hiểu thật cẩn thận, qua đó dễ dàng tiếp cận những kiến thức sâu hơn nhé.
## Using Comments
Có 2 cách để bạn có thể add thêm comment vào code PHP của mình. Đầu tiên là comment kiểu dòng đơn, bằng cách thêm cặp dầu gạch chéo đằng trước:<br>
`// This is a comment`
<br> Bạn cũng có thể dùng kiểu comment này ngày phía sau một dòng code để mô tả nội dung hành động của dòng code đó, ví dụ: <br>
`$x += 10; // Increment $x by 10`
<br>
KHi cần comment trên nhiều dòng, bạn dùng kiểu multiple-line như dưới đây: <br>
```php
<?php
/* This is a section 
of multiline comments 
which will not be interpreted */
?>
```
Ở đây, ta có thể dùng cặp ký tự` /*` và `*/ `để mở và đóng comment ở bất kỳ chỗ nào trong source code của bạn. Tôi thấy rằng, hầu hết lập trình viên thường sử dụng kiểu comment này để comment lại đoạn code mà không sử dụng nữa.  <br>

> **Tips:** Có một lỗi khá phổ biến, đó là dùng kiểu comment multiple line ` /*` và `*/ ` này để comment lại một lượng lớn sourcecode, mà trong đó đã tồn tại chỗ có các ký tự comment rồi. Quy tắc là, bạn không thể lồng comment theo kiểu này,  trình thông dịch PHP sẽ không thể biết được nơi kết thúc của comment và sẽ hiển thị ra message lỗi. Nếu bạn sử dụng các IDE hiện đại - support tính năng highline syntax, kiểu lỗi này sẽ dễ dàng được phát hiện.

## Basic Syntax
PHP là một ngôn ngữ khá đơn giản bắt nguồn từ C và Perl, nhưng nó lại khá giống Java. Nó cũng khá là linh hoạt, tuy nhiên có một vài quy tắc mà bạn cần tìm hiểu về cú pháp và cấu trúc của nó. 
### Semicolons
Bạn có thể thấy rằng, trong các ví dụ bên trên, các lệnh PHP cần kết thúc bằng dấu chấm phẩy, như sau: <br>
`$x += 10;`<br>
Có lẽ một lỗi phổ biến bạn sẽ gặp phải với PHP là việc quên dấu chấm phẩy này. Điều này khiến PHP xử lý nhiều câu lệnh như một câu lệnh mà nó không thể hiểu được, do đó nó sẽ hiển thị lỗi *Parse error* message.
### The $ symbol
Ký tự **$** đã được sử dụng theo nhiều cách khác nhau bởi các ngôn ngữ lập trình khác nhau. Ví dụ, trong ngôn ngữ BASIC, nó được sử dụng để kết thúc tên biến, để biểu thị chúng dưới dạng chuỗi. <br>
Tuy nhiên, trong PHP bạn phải đặt ký tự $ trước tất cả các biến. Điều này là cần thiết để làm cho PHP phân tích cú pháp nhánh hơn, vì qua ký tự này nó biết ngay lập tức đây có phải là một biến hay không. Cho dù các biến đó là số, chuỗi, hay mảng. Như ví dụ dưới đây: <br>
```php
<?php
$mycounter = 1; 
$mystring = "Hello"; 
$myarray = array("One", "Two", "Three");
?>
```
Và đó là cú pháp bạn cần phải nhớ. Không giống như Python, ngôn ngữ yêu cầu rất nghiêm ngặt về cách thụt lề, cách sắp xếp code, còn đối với PHP thì nó cho phép bạn hoàn toàn tự do sử dụng (hoặc không sử dụng) thụt lề (indent) hay khoảng cách (space). Tuy nhiên, trong thực tế tôi khuyến khích bạn sử dụng indent hay space một cách hợp lý để code dễ đọc hơn khi thực hiện maintain.
## Variables
Có một phép ẩn dụ đơn giản sẽ giúp bạn hiểu các biến PHP là gì. Đó là hãy nghĩ biến như một hộp diêm nhỏ (hoặc lớn), mà bạn đã viết tên hoặc tô lên bên trên, bên trong hộp diêm chưa que diêm (hoặc một thứ gì đó, ta gọi là giá trị) 
### String variables
Hãy tưởng tượng bạn có một hộp diêm, và bặt đặt tên và viết lên đó là *username*. Sau đó, bạn viết *Fred Smith* lên một tờ giấy, và đặt tờ giấy đó vào trong hộp diêm. <br>
Vâng, đó cũng là quy trình gán giá trị string cho biến, cụ thể như sau: <br>
`$username = "Fred Smith";` <br>

![](https://images.viblo.asia/b67e773d-ab39-473f-8687-9b10eab4845f.JPG)


Dấu ngoặc kép bên trên chỉ ra rằng “Fred Smith” là một string (chuỗi ký tự). 
Bạn phải đặt một string trong dấu ngoặc kép hoặc dấu nháy đơn, mặc dù 2 dấu này có chút sự khác biệt, và tôi sẽ giải thích trong phần sau. Và khi bạn muốn xem có gì trong hộp, thì mở nó ra và lấy mảnh giấy trong đó. Trong PHP ta có thể làm tương tự bằng cách như sau (Hiển thị nội dung của variable ra màn hình): <br>
`echo $username;` <br>
Hoặc ta có thể gán giá trị đó cho một biến khác (copy tờ giấy và đặt nó vào một hộp diêm khác), như thế này: <br>
`$current_user = $username;` <br>
Bạn có thể nhập thử đoạn code dưới đây để xem cách nó chạy như thế nào nhé. <br>
```test1.php
<?php 
$username = "Fred Smith";
echo $username;
echo "<br>";
$current_user = $username;
echo $current_user;
```
Bạn có thể chạy file này bằng cách nhập địa chỉ sau (có thể khác nhau tùy máy) vào address bar của trình duyệt: <br>
`http://localhost/test1.php`

> **Tips**: Trong trường hợp bạn đã thay đổi port khác với port 80 thì bạn phải nhập cụ thể port vào url. Ví dụ bạn đã thay đổi port thành 8080, thì url cần nhập là: <br>
> `http://localhost:8080/test1.php`
> Tóm lại, bạn cần nhớ port bạn đã setting là gì, và thêm nó vào url là được.

Kết quả là sẽ hiển thị ra 2 lần tên Fred Smith, lần đầu là giá trị của lệnh `echo $username` và lần sau là giá trị của lệnh `echo $current_user`

### Numeric variables
Các biến không chỉ chứa giá trị chuỗi, mà nó có thể chứa cả giá trị số. Quay lại với hình ảnh hộp diêm, để lưu trữ số 17 trong biến `$count`, thì tương đương với việc ta đặt 17 hạt trong hộp diêm đó, bằng cách viết như sau: <br>
`$count = 17;` <br>
Hoặc ta cũng có thể lưu giá trị thập phân (floating-point number). Cú pháp như sau: <br>
`$count = 17.5;` <br>

### Arrays
Vậy mảng (array) nghĩa là gì ? Đơn giản, ta có thể coi nó như là một vài hộp diêm được dán lại với nhau. <br>
Ví dụ, ta muốn lưu tên các cầu thủ trong một đội bóng đã có 5 người vào một mảng gọi là `$team`. Để làm được điều này, ta có thể dán 5 hộp diêm cạnh nhau, trong đó mỗi hộp diêm chứa một tờ giấy có ghi tên mỗi cầu thủ. <br>
Và bên trên của toàn bộ các hộp diêm, ta viết tên mảng là `team`. Điều này tương đương với code PHP như sau: <br>
`$team = array('Bill', 'Mary', 'Mike', 'Chris', 'Anne');` <br>

![](https://images.viblo.asia/1cce70eb-e588-4d59-9caa-f47d43934cb1.JPG)

Cú pháp này có vẻ phức tạp hơn một chút đúng không. Cụ thể, cũ pháp tạo mảng sẽ như sau: <br>
`array();` <br>

Với 5 string bên trong. Mỗi string được đặt trong dấu nháy đơn, và được phân cách bằng dấu phẩy. <br>
Nếu ta muốn biết cầu thủ thứ 4 là ai, ta sử dụng cú pháp sau: <br>
`echo $team[3]; // Displays the name Chris` <br>
Lý do ta điền số 3 (không phải 4) ở câu lệnh trên là do phần tử đầu tiên trong mảng sẽ bắt đầu từ 0, do đó thứ tự của cầu thủ sẽ là từ 0 -> 4. 
### Two-dimensional arrays
Thực tế ta có thể làm rất nhiều việc với mảng. Ví dụ, thay vì dùng những gắn những hộp diêm theo từng hàng đơn, ta có thể làm thành những mảng ma trận 2 chiều hoặc nhiều chiều hơn. <br>
Ví dụ trò trơi cờ caro với 9 ô được sắp xếp theo hình vuông 3x3 là một ví dụ về mảng 2 chiều. Hoặc đối với ví dụ về những hộp diêm, ta hãy tưởng tượng rằng chúng là 9 hộp được dán vào nhau theo ma trận 3 hàng x 3 cột.

![](https://images.viblo.asia/2fe84e67-f478-488a-a52c-12e51a067b18.JPG)

Để thực hiện điều này trong code PHP, bạn phải thiết lập một mảng chưa 3 mảng, ví dụ dưới đây là một ví dụ về trò trơi cờ caro
```php
<?php
  $oxo = array(array('x', ' ', 'o'),
               array('o', 'o', 'x'),
               array('x', 'o', ' '));
?>
```
Một lần nữa, ta đã đi tăng thêm một bước nữa về sự phức tạp, tuy nhiên bạn sẽ quen dần nếu nắm vững cú pháp cơ bản về mảng. Ở trên, ta thấy rằng  cấu trúc 3 array() được lồng vào trong 1 array(). Và đây chính là minh họa về mảng 2 chiều. <br>
Để return về phần tử thứ 3 của dòng thứ 2 của array, ta có dùng cú pháp PHP dưới đây: <br>
`echo $oxo[1][2];` -> Kết quả hiển thị ra sẽ là: x
> **Tips**: Hãy nhớ rằng index của mảng bắt đầu từ 0, chứ không phải là 1. Do vậy, [1] trong ví dụ trên sẽ tham chiếu tới mảng thứ 2 trong 3 mảng đã khai báo, và [2] thì tham chiếu tới mảng thứ 3. Tóm lại, câu lệnh trên sẽ trả về giá trị của phần tử ở hàng thứ 2 - cột thứ 3.

Ngoài mảng 2 chiều, ta có thể tạo ra mảng nhiều chiều hơn bằng cách add thêm mảng trong đó. Cụ thể hơn, thì bạn google thêm nhé!
### Variable-naming rules
Khi tạo các biến trong PHP, bạn phải tuân thủ 4 quy tắc sau: 
1. Tên biến nằm sau dấu đô la. Và phải bắt đầu bằng một chữ cái trong bảng chữ cái hoặc là dấu gạch dưới _
2. Tên biến chỉ có thể chứa các ký tự a-z, A-Z, 0-9 và _ (gạch dưới).
3. Tên biến không được chứa khoảng trắng. Nếu một tên biến phải bao gồm nhiều hơn một từ, bạn nên tách các từ bằng ký tự _ (gạch dưới) (ví dụ: `$user_name`).
4. Tên biến phân biệt chữ hoa chữ thường. Biến `$High_Score` không giống với biến `$high_score`.
> **Tips**: Để cho phép mở rộng bảng ký tự ASCII bao gồm dấu, PHP support bytes từ 127 tới 255 trong tên biến. Trừ khi code của bạn đã sử dụng những ký tự dấu này rồi, thì tốt nhất là bạn nên tránh sử dụng chúng, bởi vì hầu hết các lập trình viên sử dụng bàn phím tiếng anh sẽ gặp khó khăn khi thao tác với chúng. 
## Operators
Operator (toán tử) cho phép bạn sử dụng các phép toán như là cộng, trừ, nhân và chia. Ngoài ra, nó cũng hỗ trợ các toán tử khác như là, string, so sánh, và toán tử logic. Trong PHP các phép toán trông khá giống với số học thuần túy, ví dụ code dưới đây sẽ in ra kết quả là 8: <br>
`echo 6 + 2;`<br>
Sau đây, chúng ta sẽ cùng tìm hiểu một chút về các toán tử mà PHP cung cấp nhé. 
### Arithmetic operators
Các toán tử số học sẽ thực hiện các phép toán học cơ bản. Trong đó bao gồm 4 phép toán chính như là: cộng, trừ, nhân, chia. Và phép toán liên quan tới tìm modulus (phần dư của phép chia), hoặc tăng, giảm giá trị của phần tử...

![](https://images.viblo.asia/7ede4363-bacb-402d-bb0f-4c4bf4168753.JPG)

### Assignment operators
Các toán tử này có vai trò gán giá trị cho các biến. Bao gồm các phép gán đơn giản như dấu =, và phức tạp hơn một chú như là +=, -=, ... vv. Ví dụ, toán tử += sẽ cộng thêm giá trị bên phải vào biến bên trái, thay vì là thay thế hoàn toàn giá trị bên trái. Do đó, nếu biến $count có giá trị là 5, thì câu lệnh dưới đây: <br>
`$count += 1;` <br>
sẽ set giá trị của $count thành 6. Và cách viết quen thuộc hơn là như dưới đây: <br>
`$count = $count + 1;`

![](https://images.viblo.asia/a821721c-9ed3-4731-9729-3d988479f8d8.JPG)

### Comparison operators
Các toán tử so sánh thường được sử dụng bên trong một logic chẳng hạn như câu lệnh if,  trong đó bạn cần so sánh hai mục. Ví dụ, bạn muốn so sánh xem một biến đang tăng giá trị đã đạt đến giá trị mong muốn hay chưa, hoặc là giá trị một biến có nhỏ hơn giá trị đã set hay không ...vv. 

![](https://images.viblo.asia/fbdbfc2b-db75-4da5-a871-76511ccd96ce.JPG)

Ta cần chú ý sự khác biệt giữa toán tử = và ==. Cái đầu tiên là toán tử gán, cái thứ 2 là toán tử so sánh. Ngay cả những lập trình viên có kinh nghiệm đôi khi cũng hay bị nhầm lẫn giữa chúng, nên bạn cẩn thận nhé.

### Logical operators
Nếu bạn chưa từng sử dụng loại toán tử này, thoạt nhìn có vẻ phức tạp. Tuy nhiên, hãy nghĩ về chúng như cách bạn sử dụng tiếng anh vậy. Ví dụ, bạn có thể nói rằng "nếu thời gian muộn hơn 12 giờ và sớm hơn 2 giờ chiều thì hãy đi ăn trưa". Trong PHP nó có thể được minh họa bằng đoạn code như sau: <br>
`if ($hour > 12 && $hour < 14) dolunch();` <br>
Như ví dụ bên trên, ta thường sử dụng toán tử logic để kết hợp kết quả của 2 toán tử so sánh. Hoặc ta cũng có thể kết hợp nhiều toán tử so logic với nhau, ví dụ: "Nếu thời gian muộn hơn 12 giờ đêm và sớm hơn 2 giờ chiều, hoặc nếu mùi thịt nướng lan tỏa khắp hành lang và có những chiếc đĩa trên bàn." Quy tắc là, nếu một thứ gì đó là True hoặc False thì nó có thể kết hợp với toán tử logic khác. Toán tử logic nhận 2 đầu vòa là True hoặc False thì nó sẽ tạo ra kết quả là True hoặc False. 

![](https://images.viblo.asia/21d0e093-e29e-4367-9185-29756a40c5e1.png)

Bạn chú ý rằng, toán tử **$$** sẽ có mộtc chút sự khác biệt với **and**, tương tự **||** sẽ có một chút sự khác biệt với **or**.  Điểm khác biệt đó là toán tử **and** hoặc **or** sẽ có độ ưu tiên thấp hơn toán tử khác. Ví dụ: <br>
```php
$tBool = true;
$fBool = false;

$aBool = $tBool AND $fBool;
```
Theo bạn thì giá trị của biến **$aBool** sẽ là gì?
Không ít các lập trình viên có nhiều năm kinh nghiệm đưa ra trả lời sau:<br>
Biểu thức **$tBool AND $fBool** trả về **FALSE** và giá trị này sẽ được gán cho biến **$aBool** do đó biến **$aBool** sẽ có giá trị là **FALSE**.<br>
Tuy nhiên giá trị của biến **$aBool** trong trường hợp này là **TRUE**! <br>
Tại sao? <br>
Nguyên nhân ở đây là bởi vì toán tử **AND** có mức độ ưu tiên thấp hơn toán tử gán giá trị **=**. Dó đó biểu thức ngoài cùng bên tay trái **$aBool = $tBool** sẽ được thực hiện trước. Do đó biến **$aBool** sẽ nhận giá trị là **TRUE**. <br>
Tuy nhiên với đoạn mã sau: <br>
```php
$tBool = true;
$fBool = false;

$aBool = $tBool && $fBool;
```
Thì biến **$aBool** lại có giá trị là **FALSE**. Lúc này toán tử **&&** có mức độ ưu tiên cao hơn toán tử **=** và do đó biểu thức **$tBool && $fBool** sẽ được đánh giá trước và kết quả cuối cùng trả về (là **FALSE**) sẽ được dùng để gán giá trị cho biến **$aBool**.
Trong trường hợp này, theo tôi bạn nên sử dụng **&&** thay vì **AND** vì sẽ tránh rơi vào các trường hợp dễ gây nhầm lẫn như trên, dễ phát sinh ra lỗi trong chương trình. <br>
Tuy nhiên, có thể cũng có những trường hợp bắt buộc phải sử dụng toán tử **or** (bởi vì toán tử || không thể ép buộc câu lệnh thứ 2 thực hiện nếu câu lệnh đầu tiên fails.) <br>
`$html = file_get_contents($site) or die("Cannot download from $site");`
Một toán tử khá khó hiểu nữa đó là **xor**, cái này sẽ return True nếu một trong 2 giá trị là True, nhưng sẽ return False nếu cả 2 giá trị là True hoặc cả 2 giá trị là False. Để hiểu điều này, bạn hãy tưởng tượng rằng bạn muốn tự pha chế chất tẩy rửa cho các vật dụng trong nhà. Trong đó Ammonia là chất tẩy rửa tốt, và thuốc tẩy cũng vậy, và bạn muốn chất tẩy rửa của bạn có một trong 2 chất này. Tuy nhiên, nếu kết hợp cả 2 chất này sẽ rất nguy hiểm, cho nên bạn không được phép kết hợp cả 2 chất này. Trong PHP, ta có thể biểu diễn điều này như sau: <br>
`$ingredient = $ammonia xor $bleach;` <br>
Trong ví dụ này, nếu $ammonia hoặc $bleach là True, thì $ingredient sẽ có giá trị True. Và nếu cả 2 chất này là True hoặc False thì $ingredient sẽ có giá trị False. 
## Variable Assignment
Cú pháp để gán giá trị cho một biến luôn là `variable = value`. Hoặc để gán giá trị cho một biến khác thì đó là `other_variable = variable`. <br>
Ngoài ra, còn một vài toán tử hữu ích khác như là: <br>
`$x += 10;` <br>
Điều này yêu cầu trình phân tích cú pháp PHP add thêm giá trị ở bên phải vào biến $x (trườn hợp này giá trị là 10). Tương tự, với phép trừ ta có thể viết như sau: <br>
`$y -= 10; ` 
### Variable incrementing and decrementing
PHP có các hộ trợ đặc biệt để có thể nhanh chóng cộng thêm hoặc trừ 1 đơn vị cho giá trị của biến. Bạn có thể dùng một trong các lệnh sau để thay thế cho += và -= trong một số trường hợp: <br>
```php
++$x;
--$y;
```
Kết hợp với cậu lệnh if, bạn có thể viết như sau: <br>
`if (++$x == 10) echo $x;` <br>
Điều này yêu cầu PHP, đầu tiên là tăng giá trị của $x lên, sau đó là kiểm tra xem nó có giá trị bằng 10 hay không, nếu có thì in ra màn hình. Tuy nhiên, ngược lại bạn cũng có thể yêu cầu PHP chỉ tăng hoặc giảm giá trị của biến sau khi kiểm tra - so sánh giá trị của nó, như sau: <br>
`  if ($y-- == 0) echo $y;` <br>
và điều này sẽ mang lại kết quả khác biệt một chút. Giả sử $y có giá trị bắt đầu là 0 trước khi thực hiện câu lệnh trên. Sau khi thực hiện câu lệnh so sánh trên, thì sẽ trả về kết quả là True, tuy nhiên $y sau đó sẽ bị set giá trị thành -1 sau khi câu lệnh thực hiện xong. Vậy câu lệnh *echo* trên sẽ hiển thị ra giá trị là 0 hay -1 ? Bạn hãy thử đoán xem và thử lại với trình biên dịch PHP nhé. <br>
Tóm lại là, một biến sẽ được tăng hoặc giảm giá trị trước câu lệnh test nếu toán tử được trước biến. Và biến được tăng hoặc giảm giá trị sau câu lệnh test nếu toán tử được đặt sau biến. <br>
Do vậy, câu trả lời cho ví dụ bên trên là câu lệnh echo sẽ in ra kết quả là -1. Vì $y đã được giảm giá trị ngay sau khi nó được thực thi ở câu lệnh if và trước câu lệnh echo. 
### String concatenation
Concatenation là một thuật ngữ chỉ việc đặt một thứ gì đó sau một thứ khác. <br>
Do đó, string concatenation sử dụng dấu chấm (.) để nối một chuỗi ký tự này với một chuỗi ký tự khác. Cách thực hiện đơn giản như sau: <br>
`echo "You have " . $msgs . " messages.";` <br>
Giả sử rằng biến `$msgs` có giá trị là 5, thì output của dòng kết như trên sẽ như sau: <br>
`You have 5 messages.` <br>
Tương tự như bạn có thể cộng thêm giá trị vào numeric variable bằng toán tử **+=**, thì bạn cũng có thể nối một chuỗi vào một chuỗi khác bằng cách sử dụng **.=**, như sau: <br>
`$bulletin .= $newsflash;` <br>
Trong trường hợp này, $bulletin chứa nội dung của 1 bản tin, và $newsflash cũng chứa một tin tức khác, câu lệnh này sẽ nối bản tin khác đó vào bản tin bản đầu. Khi này, $bulletin sẽ có nội dung là kết hợp của cả 2 chuỗi. 
### String types
PHP hỗ trợ 2 kiểu string, đó là string nằm trong dấu nháy đơn và dấu nháy kép. Nếu bạn muốn gán một chuỗi ký tự đơn thuần, và đảm bảo rằng nội dung được hiển thị chính xác một cách thuần túy, bạn hãy sử dụng dấu nháy đơn như sau: <br>
`$info = 'Preface variables with a $ like this: $variable';` <br>
Khi này, mọi ký tự nằm trong dấu ngoặc đơn sẽ được gán chính xác cho biến $info. Còn nếu bạn sử dụng dấu nháy kép, PHP sẽ hiểu là bạn đang cố gằng truyền vào giá trị của` $variable` như là một biến. <br>
Vậy nên, nếu bạn muốn include giá trị của một biến khác vào trong string đó, thì bạn hãy sử dụng dấu nháy kép: <br>
`echo "This week $count people have viewed your profile";` <br>
Ta thấy rằng, cú pháp này cho phép ta nối chuỗi một cách đơn giản mà không cần dùng dấu chấm, hay đóng mở nháy kép. Ta thường gọi điều này với thuật ngữ là *variable substitution*, một số lập trình viên thường dùng kiểu viết này, tuy nhiên cũng có các lập trình viên khác hoàn toàn không sử dụng kiểu này, đây là thói quen tùy vào mỗi người. 
### Escaping characters
Đôi khi một string có thể chứa những ký tự với ý nghĩa đặc biệt, tuy nhiên trình biên dịch lại hiểu sai nó dẫn đến lỗi biên dịch. Ví dụ, trong dòng code dưới đây sẽ không hoạt động vì dấu nháy đơn gặp phải ở từ *spelling’s*  sẽ làm cho PHP hiểu sai rằng đến đó là kết thúc một chuỗi rồi. Do đó, phần còn lại của chuỗi PHP sẽ coi nó như một error: <br>
`  $text = 'My spelling's atroshus'; // Erroneous syntax` <br>
Để khắc phục điều này, bạn có thể add thêm dấu gạch chéo ngược trước dấu nháy đơn đặc biệt đó, để yêu cầu PHP hiển thị ký tự một cách thuần túy và chính xác: <br>
`$text = 'My spelling\'s still atroshus';` <br>
Và bạn có thể sửu dụng trick (thủ thuật) này trong hầu hết các tình huống. Ví dụ dấu nháy kép dưới đây sẽ được gán và hiển thị một cách chính xác: <br>
`$text = "She wrote upon it, \"Return to sender\".";` <br>
Ngoài ra, bạn có thể sử dụng các escape characters để chèn vào rất nhiều các ký tự đặc biệt khác vào string, như là tabs (\t), newline (\n) ... vv.  Ví dụ dưới đây là ví dụ minh họa cách sử dụng ký tự tabs (\n) để điều chỉnh heading. <br>
`$heading = "Date\tName\tPayment";` <br>
Chú ý là các ký tự này chỉ hoạt động trong các string dùng dấu nháy kép. Trong các chuỗi mà dùng dấu nháy đơn, nó sẽ hiển thị văn bản một cách thuần túy, như là \t, \n ... Và trong string sử dụng dấu nháy đơn, chỉ có **\'**  và **\\** được coi là một escaped characters.

<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác về PHP ở các bài viết lần tới nhé.<br>
Nguồn: <br>Learning PHP, MySQL & JavaScript With jQuery, CSS & HTML5<br>[codehub](https://www.codehub.com.vn/PHP-nen-su-dung-hay-AND#_=_)*