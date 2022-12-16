Trong bài này chúng ta cùng nhau tìm hiểu sâu về cách thiết lập flow hoạt động của một trương trình PHP nhé. <br>
## Expressions
Ta hãy bắt đầu với phần cơ bản nhất của mọi ngôn ngữ lập trình nào, đó là: *expressions*. <br>
Một expression (biểu thức) là sự kết hợp của các values, variables, operators, và functions để hiển thị ra được một kết quả. Trong đại số toán học thì ta thường viết biểu thức như sau: <br>
`y = 3 (|2x| + 4)` <br>
Còn trong PHP ta sẽ viết như sau: <br>
`$y = 3 * (abs(2 * $x) + 4);` <br>
Giá trị được trả về của y ở trên, có thể là một số, một chuỗi, hoặc một giá trị boolean. Có thể bạn đã biết về 2 giá trị đầu, do đó tôi sẽ giải thích về giá trị thứ 3. 
### TRUE or FALSE?
Một giá trị boolean cơ bản thì có giá trị là True hoặc False. Ví dụ, biểu thức 20 > 9 thì trả về True, và biểu thức 5 == 6 thì trả về False. Ngoài ra bạn có thể kết hợp nhiều toán tử boolean cổ điển khác như là AND, OR, hay XOR. <br>
Chú ý rằng, PHP sẽ tự động gán giá trị 1 cho hằng số TRUE, và không hiển thị giá trị nào cho FALSE, vì trong PHP hằng số FALSE được định nghĩa là NULL. <br>
```php
<?php // test2.php
  echo "a: [" . TRUE  . "]<br>";
  echo "b: [" . FALSE . "]<br>";
?>
```
Thẻ `<br>` dùng để ngắt dòng trong HTML, và đây là output: <br>
```php
a: [1]
b: []
```
Ta xem thêm một ví dụ khác về biểu thức Boolean, dưới đây: 
```php
<?php
  echo "a: [" . (20 > 9) . "]<br>";
  echo "b: [" . (5 == 6) . "]<br>";
  echo "c: [" . (1 == 0) . "]<br>";
  echo "d: [" . (1 == 1) . "]<br>";
?>
```
Ta thu được output như sau: 
```php
a: [1]
b: []
c: []
d: [1]
```
Chú ý rằng, trong một số ngôn ngữ khác, FALSE có thể được định nghĩa là 0 hoặc thậm chí là -1, do đó bạn nên kiểm tra lại document xem ngôn ngữ đó đang định nghĩa như thế nào nhé. Thông thường đối với biểu thức Boolean, ta chỉ quan tâm tới nó là true hoặc false, chứ cũng hiếm khi quan tâm giá trị bên trong của nó là gì. 
### Literals and Variables
Literal có nghĩa đơn giản đó là một giá trị nào nào đó, ví dụ như số 73, hay string "Hello". Còn variable thì có ký tự đô la phía trước, chứa một giá trị nào đó. Biểu thức đơn giản nhất là biểu thức chỉ bao gồm một Literal hay một Variable. Dưới đây là ví dụ về 3 literal và 2 variable: <br>
```php
<?php
  $myname = "Brian";
  $myage  = 37;

  echo "a: " . 73      . "<br>"; // Numeric literal
  echo "b: " . "Hello" . "<br>"; // String literal
  echo "c: " . FALSE   . "<br>"; // Constant literal
  echo "d: " . $myname . "<br>"; // String variable
  echo "e: " . $myage  . "<br>"; // Numeric variable
?>
```
Do FALSE không trả về giá trị nên ta thu được kết quả như sau: 
```php
a: 73
b: Hello
c:
d: Brian
e: 37
```
Ta có thể kết hợp với các toán tử khác để tạo thành các `statements` (câu lệnh) khác phức tạp hơn. Dưới đây, ta sẽ tạo ra 2 statement. Đầu tiên, ta gán kết quả của biểu thức `366 - $day_number` cho biến` $days_to_new_year`, câu lệnh thứ 2 ta sẽ thông báo ra msg nếu biểu thức `$days_to_new_year < 30` có giá trị là TRUE.
```php
<?php
  $day_number       = 340;                // Assignment by Value
  $days_to_new_year = 366 - $day_number;  // Assignment by Expression

  if ($days_to_new_year < 30)             // Condition
  {
    echo "Not long now till new year";    // Statement
  }
```
## Operators
PHP cung cấp rất nhiều các toán tử mạnh mẽ khác nhau như là arithmetic, string, logical, assignment, comparison ... vv . <br>

![](https://images.viblo.asia/d1c3d27c-c176-4105-bc0a-1eb1f6766a89.JPG)

Mỗi toán tử sẽ nhận một số toán hạng khác nhau: 
* Toán tử *Unary* (ví dụ như loại tăng dần (a++), hoặc phủ định (!$a)) nhận một toán hạng duy nhất.
* Toán tử *Binary* (đại diện cho phần lớn các toán tử PHP như cộng, trừ, nhân, chia) nhận 2 toán hạng.
* Toán tử *Ternary* (có dạng `expr ? x : y`) yêu cầu 3 toán hạng.  Đây là câu lệnh if kiểu ngắn gọn, return giá trị x nếu expr là TRUE và return y nếu expr là FALSE. 

### Operator Precedence
Nếu tất cả các toán tử có cùng một mức độ ưu tiên, chúng sẽ xử lý theo thứ tự lần lượt từ trái qua phải. Trên thực tế, có khá nhiều toán tử có mức độ ưu tiên giống nhau. Ví dụ: <br>
```php
1 + 2 + 3 - 4 + 5
2 - 4 + 5 + 3 + 1
5 + 2 - 4 + 1 + 3
```
Ở 3 biểu thức trên ta thấy rằng chúng đều có kết quả là 7, bởi vì các toán tử Cộng và Trừ có độ ưu tiên giống nhau (nên sẽ xử lý từ trái qua phải). Ta có thể thử tương tự với phép nhân và phép chia: <br>
```php
1 * 2 * 3 / 4 * 5 
2 / 4 * 5 * 3 * 1 
5 * 2 / 4 * 1 * 3
```
Và kết quả in ra của 3 biểu thức trên cũng đều là 7.5. Tuy nhiên, kết quả sẽ thay đổi nếu ta kết hợp các toán tử với độ ưu tiên khác nhau: <br>
```php
1 + 2 * 3 - 4 * 5 
2 - 4 * 5 * 3 + 1 
5 + 2 - 4 + 1 * 3
```
Nếu không có các toán tử ưu tiên khác nhau, 3 biểu thức trên sẽ có kết quả lần lượt là 25, -29, và 12. Nhưng do phép nhân và phép chia có độ ưu tiên cao hơn phép cộng và trừ, cho nên ta có thể thêm các dấu ngoặc đơn như dưới đây để dễ hiểu hơn: <br>
```php
1 + (2 * 3) - (4 * 5) 
2 - (4 * 5 * 3) + 1 
5 + 2 - 4 + (1 * 3)
```
PHP sẽ thực thi các biểu thức con trong dấu ngoặc đơn trước, ta thu được như sau: 
```php
1 + (6) - (20) 
2 - (60) + 1 
5 + 2 - 4 + (3)
```
Kết quả cuối cùng của các biểu thức này lần lượt là –13, –57 và 6 (hoàn toàn khác với kết quả của 25, –29 và 12 mà chúng ta đã thấy nếu không có toán tử ưu tiên khác). <br>
Và bạn có thể ghi đè độ ưu tiên theo bất kỳ thứ tự nào bạn muốn, bằng cách chèn thêm dấu ngoặc đơn: 
```php
((1 + 2) * 3 - 4) * 5 
(2 - 4) * 5 * 3 + 1 
(5 + 2 - 4 + 1) * 3
```
Sau khi chèn dấu ngoặc đơn để thay đổi độ ưu tiên như trên, ta có kết quả lần lượt là 25, -29 và 12. <br>
Dưới đây là danh sách các  toán tử PHP theo độ ưu tiên từ cao tới thấp: <br>
![](https://images.viblo.asia/ce631615-9b39-4d47-b57b-e9cae4861b4d.JPG)
### Associativity
 Ở trên chúng ta đã xem xét một số toán tử thực thi từ trái qua phải, (Ngoại trừ trường hợp kết hợp với các toán tử có độ ưu tiên cao hơn). Tuy nhiên, cũng có những toán tử yêu cầu thực thi từ phải qua trái và trình tự xử lý này gọi là tính liên kết (*associativity*) của toán tử. Đặc biệt, có một số toán tử không có tính liên kết. <br>
 Tính liên kết(*associativity*) trở nên quan trọng trong những trường hợp bạn không thiết lập độ ưu tiên một cách rõ ràng, vì vậy bạn cần phải biết các action mặc định của các toán tử. <br>
 ![](https://images.viblo.asia/1ad68f98-9055-4a56-974c-61f382e03616.JPG)
Ví dụ ta cùng xem ví dụ về toán tử gán như dưới đấy, trong đó cả 3 biến đều đươcj set giá trị thành 0. 
```php
<?php
  $level = $score = $time = 0;
?>
```
Việc gán liên tiếp này chỉ có thể được thực hiện nếu phần ngoài cùng bên phải của biểu thức được thực thi trước, sau đó tiếp tục được xử lý từ phải qua trái. <br>
> **Tips:** Nếu bạn là một newbie về PHP, bạn nên tránh những cách xử lý dễ gây nhầm lẫn của toán tử liên kết, bằng cách luôn lồng biểu thực phụ của bạn trong dấu ngoặc đơn để thiết lập rõ ràng về độ ưu tiên. Qua đó, giúp bạn và người maintain code sau này dễ đọc code của bạn hơn. 
### Relational Operators
Toán tử quan hệ (*Relational Operators*) sẽ trả lời các câu hỏi như là "Biến này có giá trị bằng 0 không?" và "Biến nào có giá trị lớn hơn?" ... Các toán tử này sẽ kiểm tra 2 toán hạng, và trả về kết quả boolean là TRUE hoặc FALSE. Có 3 loại toán tử quan hệ đó là: *equality*, *comparison*, và *logical*.
#### Equality
Có thể bạn đã thấy ở các phần trước, toán tử bằng (*Equality*) có ký hiệu là `==` (2 dấu bằng). Và bạn đừng nhầm nó với toán tử gán `=` (1 dấu bằng) nhé. Trong ví dụ dưới đây, câu lệnh đầu tiên ta sẽ gán 1 giá trị đơn, và câu lệnh thứ 2 sẽ kiểm tra xem 2 giá trị có bằng nhau hay không. <br>
```php
<?php
  $month = "March";

  if ($month == "March") echo "It's springtime";
?>
```
Ta thấy rằng, bằng cách trả về TRUE hoặc FALSE, toán tử bằng cho phép ta kiểm tra các điều kiện bằng cách sử dụng lệnh if. Do PHP là loại ngôn ngữ "lỏng lẻo", cho nên nếu 2 toán hạng của biểu thức so sánh bằng, mà lại có kiểu khác nhau, thì PHP sẽ tự động chuyển đổi chúng thành kiểu phù hợp nhất. Bên cạnh đó thì ta hiếm khi sử dụng toán tử *identity* (gồm 3 dấu bằng ===), toán tử này so sánh các item với nhau mà không thực hiện convert.  <br>
Ví dụ, bất kỳ string nào mà bao gồm toàn số, thì khi so sánh với số, nó sẽ được tự động convert thành số. Bên dưới, ta có 2 biến `$a` và `$b` là 2 string khác nhau: 
```php
<?php
  $a = "1000";
  $b = "+1000";

  if ($a == $b)  echo "1";
  if ($a === $b) echo "2";
?>
```
Thoạt nhìn, đây là 2 string khác nhau thì sẽ không thể bằng nhau, tuy nhìn khi chạy, ta có output in ra là 1. Điều này có nghĩa là cậu lệnh `if` đầu tiên được chạy và có kết quả là TRUE. Lý do là cả 2 string bên trên đã được convert thành giá trị số, và 1000 thì cũng giống như +1000. Ngược lại, ở lệnh if thứ 2, ta đã sử dụng toán tử *identiry* (===), do đó nó không convert mà so sánh `$a` và `$b` dưới dạng chuỗi, thấy rằng chúng khác nhau và không in ra bất cứ thứ gì.  <br>
Tương tự như cách sử dụng toán tử bằng ở trên, ta có thể kiểm tra chúng là không bằng nhau bằng cách sử dụng toán tử *inequality operator* (!=). Ta thử xem ví dụ dưới đây: <br>
```php
<?php
  $a = "1000";
  $b = "+1000";

  if ($a != $b)  echo "1";
  if ($a !== $b) echo "2";
?>
```
Khi chạy code, ta thấy rằng câu lệnh if đầu tiên đã không in ra output là 1, bởi ví nó đang so sánh dưới dạng số. Thay vào đó, kết quả in ra là 2 bởi vì nó đang so sánh dạng chuỗi. 
#### Comparison operators
Ngoài việc so sánh bằng nhau, và không bằng nhau, PHP còn cung cấp nhiều toán tử so sánh khác như là: > (lớn hơn), < (nhỏ hơn), >= (lớn hơn hoặc bằng), <= (nhỏ hơn hoặc bằng)... 
```php
<?php
  $a = 2; $b = 3;
  if ($a > $b)  echo "$a is greater than $b<br>";
  if ($a < $b)  echo "$a is less than $b<br>";
  if ($a >= $b) echo "$a is greater than or equal to $b<br>";
  if ($a <= $b) echo "$a is less than or equal to $b<br>";
?>
```
Trong ví dụ trên, ta có giá trị của $a là 2, $b là 3 nên output in ra là: 
```php
2 is less than 3
2 is less than or equal to 3
```
#### Logical operators
Toán tử logic (Logical operators) sẽ return về kết quả là TRUE hoặc FALSE, cho nên nó còn được gọi là toán tử Boolean. <br>

![](https://images.viblo.asia/a63a4e8a-f48b-40ea-974b-7b14bd783b37.JPG)

Chú ý rằng, các toán tử bên trên có thể viết bằng chữ thường, hoặc chữ hoa. Ta có ví dụ dưới đây: 
```php
<?php
  $a = 1; $b = 0;

  echo ($a AND $b) . "<br>";
  echo ($a or $b)  . "<br>";
  echo ($a XOR $b) . "<br>";
  echo !$a         . "<br>";
?>
```
Ta thu được output lẫn lượt là, không có gì, 1, 1, không có gì. Điều này có nghĩa là câu lệnh echo thứ 2 và thứ 3 có kết quả là TRUE, các câu lệnh echo còn lại có giá trị FALSE nên không in ra cái gì. Câu lệnh AND sẽ trả về TRUE, nếu cả 2 toán hạng là TRUE, trong khi đó câu lệnh thứ 4 là thực hiện phủ định giá trị của $a, nên trả về kết quả FALSE. <br>
> **Tips**: Khi code, bạn cần chú ý rằng, độ ưu tiên của AND và OR sẽ thấp hơn của && và ||.
Toán tử OR có thể gây ra vấn đề nhầm lẫn trong lệnh if nếu bạn không hiểu rõ nó. Lý do là, toán hạng thứ 2 sẽ không được thực thi nếu toán hạng đầu tiên có giá trị TRUE. Như ví dụ dưới đây, function `getnext` sẽ không được gọi nếu biến `$finished` có giá trị là 1. 
```php
<?php
  if ($finished == 1 or getnext() == 1) exit;
?>
```
Nếu bạn cần function  `getnext` được gọi ở mỗi câu lệnh if. bạn có thể viết lại code như dưới đây: 
```php
<?php
  $gn = getnext();

  if ($finished == 1 or $gn == 1) exit;
?>
```
Trong trường hợp này, code sẽ thự thi function `getnext` và lưu giá trị vào biến `$gn` trước khi thực thi lệnh if.
> **Tips**: Có một giải pháp khác đó là ta có đổi chỗ thứ tự 2 mệnh đề sao cho getnext xuất hiện trước và được thực thi trước.

Dưới đây là bảng tổng hợp kết quả khi kết hợp các toán tử bằng toán tử logic. Một điều bạn cần nhớ rằng, !TRUE thì sẽ bằng với FALSE, và !FALSE sẽ bằng với TRUE. <br>

![](https://images.viblo.asia/38c5fe1c-9a1f-436a-b9d8-2ed32b380298.JPG)


<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác về PHP ở các bài viết lần tới nhé.<br>
Nguồn: <br>Learning PHP, MySQL & JavaScript With jQuery, CSS & HTML5*