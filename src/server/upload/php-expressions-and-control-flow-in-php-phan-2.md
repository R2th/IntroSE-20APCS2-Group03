## Conditionals
Conditionals sẽ điều khiển flow của program. Chúng cho phép hỏi, đặt ra các điều kiện và phản hồi lại với mỗi điều kiện, qua đó giúp điều khiển program xử lý theo ý muốn. Mục tiêu cốt lõi của Conditionals là giúp tạo ra các dynamic web pages, vì ta có thể điều khiển, thiết lập các ouput khác nhau ứng với mỗi điều kiện, mỗi khi page được xem. <br>
Tôi sẽ trình bày 3 conditional cơ bản trong phần này: đó là, câu lệnh `if`,  lệnh `switch`, và toán tử `?`. Ngoài ra, chúng ta cũng sẽ tìm hiểu về looping conditionals, cái giúp ta thực hiện lặp đi lặp lại đoạn code cho tới khi đáp ứng được điều kiện. 
### The if Statement
Có một cách hiểu đơn giản về program flow, đó là bạn hãy tưởng tượng bạn đang lái xe trên một đường cao tốc một chiều, và đường cao tốc này hầu như là thẳng tắp. Tuy nhiên, đôi khi bạn gặp các biển báo, báo hiệu cho biết bạn phải đi đâu. 
Trong trường hợp của lệnh `if`, bạn hãy tưởng tượng rằng, bạn gặp phải một biển báo hiệu đường vòng,  và bạn phải đi theo biển báo này nếu điều kiện nào đó là Đúng. Trong trường hợp này, bạn cần lái xe đi theo đường vòng này cho tới khi đi đến đường chính, rồi tiếp tục đi theo hướng bạn đầu của bạn. Ngược lại, nếu điều kiện này là Không Đúng, bạn sẽ bỏ qua biển báo đường vòng này, và cứ tiếp tục chạy theo hướng ban đầu bạn đã định. (Tham khảo hình dưới đây) <br>
![](https://images.viblo.asia/e8d7503f-196b-40ca-8d65-675d130f43aa.png)
Nội dung của điều `if` có thể là bất kỳ biểu thức PHP hợp lệ nào, bao gồm: kiểm tra, so sánh bằng, kiểm tra giá trị là 0 hay `NULL`, thậm chí chứa các function. <br>
Nội dung thực hiện của hàm `if` sẽ được đặt trong dấu ngoặc kép `{}`.  Và bạn có thể không cần dấu ngoặc nhọn {} nếu như hàm `if` chỉ thực thi một câu lệnh duy nhất. Nhưng theo kinh nghiệm của tôi, chúng ta nên luôn luôn dùng dấu ngoặc nhọn cho hàm if, để tránh các lỗi tiềm năng, ví dụ như một lúc nào đó bạn cần thêm một dòng xử lý cho hàm if, nếu thiếu dấu ngoặc nhọn, nó sẽ phát sinh bug và làm ta rất mất thời gian để điều tra. <br>
> **Tips**: Có một lỗ hổng bảo mật cực kỳ nổi tiếng được gọi là "goto fail", đã ảnh hưởng nghiêm trọng tới Secure Sockets Layer (SSL) tồn tại trong các sản phẩm của Apple trong nhiều năm, bời vì một programmer đã quên mất dấu ngoặc nhọn {} bao quanh lệnh `if`, lỗi này khiến cho một function đôi khi trả về trạng thái connect thành công, trong khi thực tế nó không phải như vậy. Điều này cho phép kẻ tấn công có được chứng chỉ bảo mật được chấp nhận, trong khi đáng lẽ ra nó phải bị từ chối. Tóm lại, nếu nghi ngờ có bug phát sinh, bạn nên đặt dấu ngoặc nhọn trong lệnh `if`.

Tuy nhiên, để cho ngắn gọn, trong loạt bài này, tôi sẽ bỏ qua các dấu ngoặc nhọn cho các câu lệnh đơn. <br>
Trong ví dụ dưới đây, ta có ví dụ rằng, giả sử hiện tại đã đến cuối tháng, và bạn đã thanh toán tất cả các hóa đơn cần thiết, sau đó bạn sẽ thực hiện maintain tài khoản ngân hàng của bạn. 
```php
<?php
  if ($bank_balance < 100)
  {
    $money         = 1000;
    $bank_balance += $money;
  }
?>
```
Trong ví dụ này, ta đã thực hiện hiện kiểm tra xem số dư ($bank_balance) trong tài khoản có nhỏ hơn 100$ hay không. Nếu có, ta sẽ nạp thêm 1000$.
Nếu số dư > 100$, thì câu lệnh điều kiện if sẽ không được thực hiện, và program flow sẽ nhảy qua line tiếp theo. <br>
Trong các bài hướng dẫn này, tôi thường đặt dấu ngoặc nhọn trên một dòng mới. Tuy nhiên, một số người lại thích đặt dấu ngoặc nhọn đầu tiên ngay bên phải của biểu thực điều kiện. Nói chung một trong hai cách này đều tốt, vì PHP cho phép ta thiết lập các ký tự khoảng trắng theo bất kỳ cách nào bạn muốn (ví dụ, dấu cách, newline, tab ...). Tuy nhiên, kinh nghiệm của tôi cho thấy rằng, code của bạn sẽ dễ đọc và debug hơn nếu bạn thụt đầu dòng trên dòng mới với 1 tab.
### The else Statement
Đôi khi một điều kiện không phải là TRUE, và bạn không muốn nó tiếp tục thực hiện theo luồng chương trình chính mà muốn nó thực hiện một điều khác, thì đây chính là lúc chúng ta dùng đến lệnh `else`. Với lệnh `else` này bạn có thể thiết lập program đi theo con đường vòng thứ 2, như trong hình dưới đây. <br>
![](https://images.viblo.asia/828654f9-a637-47a2-bde6-a1729e0265da.png)
Với biểu thức `if ... else`, câu lệnh đầu tiên sẽ được thực hiện nếu điều kiện là TRUE. Ngược lại, nếu điều kiện là FALSE thì câu lệnh thứ 2 sẽ được thực thi. Tóm lại là một trong 2 lựa chọn sẽ được thực hiện. Không có trường hợp nào mà cả 2 lựa chọn đều được thực thi, hoặc đều không được thực thi. Bạn có thể xem ví dụ về cấu trúc `if ... else` dưới đây: <br>
```php
<?php
  if ($bank_balance < 100)
  {
    $money         = 1000;
    $bank_balance += $money;
  }
  else
  {
    $savings      += 50;
    $bank_balance -= 50;
  }
?>
```
Trong ví dụ này, nếu bạn có >= 100$ trong tài khoản ngân hàng, thì câu lệnh `else` sẽ được thực thi, và sẽ thực hiện tiết kiệm một khoản tiền là 50$. <br>
Cũng giống như lệnh `if`, nếu `else` chỉ có một câu lệnh đơn, thì bạn có thể không cần thêm vào dấu ngoặc kép. (Tuy nhiên, như lời khuyên bên trên, bạn nên thêm vào dấu ngoặc kép. Thứ nhất, nó giúp code của bạn dễ đọc hơn. Thứ hai là bạn có thể dễ dàng bổ sung thêm nhiều logic trong tương lai) 
### The elseif Statement
Đôi khi bạn muốn xét tới các khả năng khác nhau xảy ra dựa trên chuỗi các điều kiện khác nhau. Bạn có thể thực hiện điều này bằng cách sử dụng câu lệnh `elseif`. Nó cũng tương tự như lệnh else, tuy nhiện bạn cần bổ sung thêm điều kiện cho nó.  Dưới đây là cấu trúc `if...elseif...else`
```php
<?php
  if ($bank_balance < 100)
  {
  	$money         = 1000;
  	$bank_balance += $money;
  }
  elseif ($bank_balance > 200)
  {
  	$savings      += 100;
  	$bank_balance -= 100;
  }
  else
  {
  	$savings      += 50;
  	$bank_balance -= 50;
  }
?>
```
Trong ví dụ trên, lệnh `elseif` đã được chèn vào giữa lệnh `if` và `else`. Nó kiểm tra xem tài khoản ngân hàng của bạn có lớn hơn 200$ hay không? Nếu có, thì sẽ thực hiện tiết kiệm 100$ trong tháng này. <br>
Bạn có thể tưởng tượng về cấu trúc này là nó bao gồm nhiều con đường rẽ khác nhau. <br>
![](https://images.viblo.asia/e3686b48-5d53-4112-9d67-91a6152c0935.png)

> **Tips**: Câu lệnh `else` là câu lệnh đóng của cấu trúc `if...else` hoặc `if...elseif...else`. Bạn có thể đặt nó ở cuối cùng, tuy nhiên bạn không thể đặt nó trước `elseif`. Tương tự, bạn không thể đặt lệnh `elseif` trước lệnh `if`.

Bạn có thể đặt bao nhiêu lệnh `elseif` tùy ý muốn. Tuy nhiên, nếu số lượng lệnh `elseif` tăng lên đáng kể, bạn nên sử dụng một dụng câu lệnh `switch` mà tôi sẽ giới thiệu dưới đây.
### The switch Statement
Câu lệnh `switch` sẽ rất hữu ích trong trường hợp một biến hay kết quả của biểu thức có nhiều giá trị khác nhau, và với mỗi giá trị đó sẽ thực thi một hành động khác nhau. <br>
Dưới đây, ta có một ví dụ về PHP-driven menu,  chức năng này thực hiện chuyển đổi một single string thành các option main menu theo những gì user đã yêu cầu. Ta có các option menu là Home, About, News, Login, và Links, và ta sẽ đặt một biến `$page` để lưu lựa chọn của user. <br>
Nếu viết theo cấu trúc `if...elseif...else`, ví dụ của chúng ta sẽ trông như sau: 
```php
<?php
  $page = "test";

  if     ($page == "Home")  echo "You selected Home";
  elseif ($page == "About") echo "You selected About";
  elseif ($page == "News")  echo "You selected News";
  elseif ($page == "Login") echo "You selected Login";
  elseif ($page == "Links") echo "You selected Links";
  else                      echo "Unrecognized selection";
?>
```
Và khi chuyển sang dùng `switch`, ví dụ của chúng ta sẽ trở nên như sau: 
```php
<?php
  switch ($page)
  {
  	case "Home":  echo "You selected Home";
  		break;
  	case "About": echo "You selected About";
  		break;
  	case "News":  echo "You selected News";
  		break;
  	case "Login": echo "You selected Login";
  		break;
  	case "Links": echo "You selected Links";
  		break;
  }
?>
```
Như bạn thấy ở trên, biến `$page` chỉ cần viết một lần ở đầu câu lệnh switch. Sau đó, lệnh `case` sẽ kiểm tra các kết quả phù hợp, khi một điều kiện thỏa mãn thì câu lệnh tương ứng sẽ được thực thi. Đây chỉ là một ví dụ đơn giản, trong ứng dụng thực tế ta sẽ có code xử lý để user thực hiện chuyển sang page tương ứng, hoặc xử lý các logic phức tạp hơn.
> **Tips**: Với lệnh `switch`, thì ta sẽ không sử dụng dấu ngoặc kép bên trong lệnh `case`. Thay vào đó, code xử lý của mỗi `case` sẽ bắt đầu bằng đầu bằng dấu 2 chấm và kết thúc bằng lệnh `break`. Tuy nhiên là, toàn bộ các `case` của `switch` sẽ được bao quanh bởi dấu ngoặc nhọn.

#### Breaking out
Nếu bạn muốn thoát khỏi `switch` bời vì một điều kiện đã được thỏa mãn thì hãy sử dùng lệnh `break`. Câu lệnh này sẽ yêu cầu PHP thoát khỏi `switch` và nhảy tới lệnh tiếp theo của program. <br>
Ở ví dụ trên, giả sử nếu bạn không dùng lệnh `switch` và case của Home là TRUE, thì tất cả 5 case này đều được thực thi. Tương tự, giả sử nếu `$page` có giá trị là `News`thì tất cả các `case` từ `News` trở đi đều được thực thi. Việc này là do xử lý có chủ đích của PHP nhằm phục vụ cho một số kỹ năng lập trình nâng cao. Về cơ bản, bạn cần luôn luôn nhớ là phải dụng lệnh `break` mỗi khi điều kiện `case` được thực thi xong. Trên thực tế, việc quên lệnh `break` là một lỗi khá phổ biến của các lập trình viên. 
#### Default action
Một yêu cầu cơ bản nữa trong switch đó là nhảy vào lệnh `default` actionn trong trường hợp không có `case` nào thỏa mãn điều kiện. Trong ví dụ về menu code bên trên, bạn có thể thêm xử lý `default`  vào ngay trước dấu ngoặc nhọn cuối cùng. 
```php
default:
    echo "Unrecognized selection";
    break;
```
Thực ra cái này nó cũng tương tự với `else` trong cấu trúc `if ... else` bên trên. <br>
Chú ý rằng, lệnh `break` của `default` là không bắt buộc, bời vì lệnh `default` đã là lệnh con cuối cùng rồi, và program sẽ tự động chạy tới dấu ngoặc nhọn đóng. Tuy nhiên, nếu bạn đặt lệnh `default` ở mức cao hơn, thì chắc chắn ta cần lệnh `break` để ngăn chặn program chạy tiếp đến `case` tiếp theo. Tóm lại, cách thực hiện an toàn nhất là luôn bao gồm lệnh `break`.
#### Alternative syntax
Nếu muốn, bạn có thể thay thế dấu ngoặc nhọn đầu tiên trong switch bằng dấu 2 chấm `:`, và dấu ngoặc nhọn cuối cùng bằng lệnh `endswitch`. Tuy nhiên, đây là cách viết không phổ biến, tôi để cập ở đây chỉ muốn bạn biết về sự tồn tại của chúng. 
```php
<?php
  switch ($page):
  	case "Home":
  		echo "You selected Home";
  		break;
  
  	// etc...
  
  	case "Links":
  		echo "You selected Links";
  		break;
  endswitch;
?>
```
### The ? Operator
Có một cách để không phải viết cấu trúc `if ... else` dài dòng đó là sử dụng toán tử 3 ngôi `?`, khi dùng toán tử này ta cần đến 3 toán hạng, thay vì chỉ viết 2 toán hạng như thông thường. <br>
Ở các bài viết trước, ta đã tìm hiểu về sự khác biệt giữa lệnh `print` và `echo`, có những trường hợp nó hoạt động tốt với `print` nhưng lại không tốt với `echo`. <br>
Toán tử `?` được dùng trong biểu thức đánh giá, với 2 trạng thái sẽ được thực thi: một là khi biểu thức có giá trị TRUE, cái còn lại là khi biểu thức có giá trị FALSE. Dưới đây ta sẽ áp dụng toán tử này để viết một ví dụ về cảnh báo mức nhiên liệu của ô tô hiển thị trên bảng điện tử.
```php
<?php
  echo $fuel <= 1 ? "Fill tank now" : "There's enough fuel";
?>
```
Ở ví dụ trên, nếu lượng nhiên liệu còn lại nhỏ hơn hoặc bằng 1 gallon thì thực hiện return string `"Fill tank now"`. Nếu không, thì sẽ return string `"There's enough fuel"`. Mặc khác, ta cũng có thể gán giá trị sẽ return cho một biến như sau: 
```php
<?php
  $enough = $fuel <= 1 ? FALSE : TRUE;
?>
```
Ở đây, biến `$enough` sẽ được gán giá trị là TRUE nếu còn lại nhiều hơn 1 gallon nhiên liệu, ngược lại nó sẽ được gán giá trị là FALSE. <br>
Nếu bạn thấy toán tử `?` này khó hiểu, bạn có thể sử dụng hàm `if` để thay thế. Tuy nhiên, tôi khuyên bạn nên tập làm quen sử dụng nó, vì nó được sử dụng rất thường xuyên bởi các lập trình viên khác. Trong một số trường hợp, nó có thể khá khó đọc bởi vì nó lặp lại một biến nhiều lần. Ví dụ như đoạn code dưới đây được viết khá phổ biến. <br>
`$saved = $saved >= $new ? $saved : $new;` <br>
Để cho dễ hiểu, tôi sẽ tách nó ra và giải thích từng chút một
```php
$saved =              // Thực hiện gán giá trị cho $saved
$saved >= $new        // So sánh giá trị giữa $saved và $new
?                     // Nếu giá trị biểu thức so sánh là đúng
$saved                // Thực hiện gán giá trị hiện tại của $saved
:                     // Nếu giá trị biểu thức so sánh là false
$new;                 // Thực hiện gán giá trị của $new
```
Đây là cách ngắn gọn để theo dõi giá trị lớn nhất khi chương trình chạy. Bạn sẽ lưu giá trị lớn nhất vào biến `$saved` và so sánh nó với `$new` mỗi khi nhận giá trị mới. Khi lập trình viên quen với toán tử `?` thường thấy nó thuận tiện hơn so với cấu trúc `if` khi xử lý các biểu thức so sánh ngắn. Ngoài ra, toán tử này còn thường được sử dụng trong những quyết định nội tuyến, như là kiểm tra xem liệu một biến đã được khởi tạo hay chưa? trước khi truyền nó vào cho một function.
## Looping
Một trong những việc tuyệt vời mà máy tính support chúng ta đó là nó có thể lặp lại các công việc tính toán một cách nhanh chóng và không biết mệt mỏi. Ví dụ như bạn muốn program lặp đi lặp lại một đoạn code cho tới khi một điều gì đó xảy ra. Và đương nhiên, cấu trúc vòng lặp của PHP support chúng ta một cách hảo để thực hiện việc này. <br>
Tưởng tượng về Loop trong PHP, thì nó cũng giống như hình ảnh đường cao tốc để minh hoạ về cấu trúc `if ... else`, có một điểm khác là đối với Loop, một khi xe đã đi vào đường vòng này, nó sẽ lặp đi lặp lại cho tới khi gặp điều kiện phù hợp.<br>
![](https://images.viblo.asia/d26c809e-c869-40f9-aa3b-1a25938c794c.png)
### while Loops
Tiếp tục với ví dụ về bảng điều khiển kỹ thuật số kiểm tra mức nhiên liệu ở trên, ta sẽ xử lý nó với một vòng lặp liên tục để kiểm tra mức nhiên liệu khi lái xe. Cụ thể ta sẽ sử dụng vòng lặp `while`.
```php
<?php
  $fuel = 10;

  while ($fuel > 1)
  {
	// Keep driving …
	echo "There's enough fuel";
  }
?>
```
Có thể bạn không muốn in ra text mà muổn hiển thị đèn màu xanh đi chăng nữa, thì tóm lại bất kỳ xử lý tín hiệu nào cũng cần đặt trong vòng lặp `while`. Ngoài ra, nếu bạn chạy thử ví dụ này trên máy tính của bạn, thì cần chú ý rằng chương trình này nó sẽ chạy liên tục cho tới khi bạn bấm thủ công button Stop trên browser để tắt nó.<br>
> **Tips**: Cũng tương tự như cấu trúc lệnh `if`, vòng lặp while cũng yêu cầu các xử lý phải được đặt trong dấu ngoặc kép, trừ khi vòng lặp while này của bạn chỉ có một câu lệnh đơn. 

Ta xem xét tiếp một ví dụ về phép nhân với 12, như dưới đây: 
```php
<?php
  $count = 1;

  while ($count <= 12)
  {
	echo "$count times 12 is " . $count * 12 . "<br>";
	++$count;
  }
?>
```
Ở đây, biến `$count` được khởi tạo với giá trị là 1, sau đó vòng lặp `while` sẽ bắt đầu với biểu thức so sánh `$count <= 12`. Vòng lặp này sẽ được thực hiện lặp đi lặp lại cho tới khi giá trị của biến lớn hơn 12. Ta có output của đoạn code này như sau: 
```php
1 times 12 is 12 
2 times 12 is 24 
3 times 12 is 36
//...vv
```
Ở vòng lặp trên, ta đã in ra các string chứa giá trị của `$count` và kết quả của phép nhân với 12. Theo sau đó là thẻ `<br>` để thực hiện xuống dòng sau mỗi string. Sau đó biến $count được tăng cho tới khi không thoả mãn điều kiện vòng lặp while nữa thì sẽ thoát ra. <br>
Chú ý rằng, nếu không có lệnh `++$count` thì vòng lặp này sẽ chạy vô hạn, không bao giờ kết thúc, và nó chỉ hiển thị ra kết quả của 1 * 12 mãi mãi. <br>
Có một cách viết gọn gàng hơn nhiều để refactor lại vòng lặp while này như sau, tôi tin rằng bạn sẽ thích nó: <br>
```php
<?php
  $count = 0;

  while (++$count <= 12)
	echo "$count times 12 is " . $count * 12 . "<br>";
?>
```
Ở trên, ta đã di chuyển lệnh `++$count` từ bên trong vòng lặp while vào biểu thức điều kiện của vòng lặp. Do đó, mỗi khi PHP gặp biến `$count` lúc bắt đầu vòng lặp, PHP sẽ thấy nó có toán tử tăng ở phía trước, nên nó sẽ thực hiện tăng giá trị của biến trước, rồi sau đó mới thực hiện so sánh nó với 12. Bạn có thể thấy rằng, biến `$count` đã được khởi tạo với giá trị là 0 chứ không phải 1, bởi vì biến này nó sẽ tăng ngay khi vòng lặp bắt đầu. Nếu bạn khởi tạo nó là 1 thì bạn chỉ nhận được giá trị từ 2 tới 12. 
### do...while Loops
Một biến thế nhỏ của vòng lặp `while` đó là `do...while`, loại loop này được dùng khi bạn muốn block code sẽ được thực thi ít nhất một lần và đặt điều kiện loop ở phía sau. Dưới đây là ví dụ về phép nhân với 12 nhưng sử dụng vòng lặp `do...while`
```php
<?php
  $count = 1;

  do
	echo "$count times 12 is " . $count * 12 . "<br>";
  while (++$count <= 12);
?>
```
Ở trên, ta đã khởi tạo biến` $count` với giá trị là 1 chứ không phải là 0, lý do là vì câu lệnh `echo` của vòng lặp sẽ được thực thi trước khi biến `$count` được tăng lên. <br>
Như đã nói nhiều lần ở phần trước, nếu bạn có nhiều hơn 1 câu lệnh trong vòng lặp thì hãy nhớ sử dụng dấu ngoặc kép nhé.
```php
<?php
  $count = 1;
  
  do {
	echo "$count times 12 is " . $count * 12;
	echo "<br>";
  } while (++$count <= 12);
?>
```
### for Loops
Loại vòng lặp cuối tôi muốn đề cập đó là vòng lặp `for`, đây cũng là loại vòng lặp mạnh mẽ nhất, vì nó có khả năng thiết lập các biến khi vào vòng lặp, kiểm tra các điều kiện trong khi lặp, và chỉnh sửa biến sau mỗi vòng lặp. 
```php
<?php
  for ($count = 1 ; $count <= 12 ; ++$count)
	echo "$count times 12 is " . $count * 12 . "<br>";
?>
```
Nào, giờ ta hãy xem cách hoạt động của vòng lặp `for` nhé. Mỗi câu lệnh `for` có 3 tham số, đó là : 
* Một biểu thức khởi tạo
* Một biểu thức điều kiện
* Biểu thức sửa đổi

Nó được phân tách với nhau bởi dấu chấm phẩy` ;` như thế này: `for (expr1 ; expr2 ; expr3)`. Khi bắt đầu vòng lặp đầu tiên thì biểu thức khởi tạo được thực thi. Ở trong ví dụ trên, biến `$count` đã được khởi tạo giá trị là 1. Mỗi lần lặp thì biểu thức điều kiện (`$count <= 12`) sẽ được kiểm tra, và vòng lặp chỉ được tiếp tục khi điều kiện lặp vẫn đúng. Cuối cùng, vào thời điểm cuối mỗi vòng lặp thì biểu thức sửa đổi sẽ được thực thi. Trong ví dụ trên, giá trị của biến `$count` được tăng lên sau mỗi vòng lặp.<br>
Trong cấu trúc này, tất cả các biến sẽ được huỷ bỏ sau khi vòng lặp kết thúc. Và hãy nhớ dùng dấu ngoặc kép nếu bạn có nhiều hơn một câu lệnh.
```php
<?php
  for ($count = 1 ; $count <= 12 ; ++$count)
  {
	echo "$count times 12 is " . $count * 12;
	echo "<br>";
  }
?>
```
Chúng ta hãy so sánh xem khi nào nên dùng vòng lặp `for`, khi nào nên dùng vòng lặp `while` nhé. <br>
Trước hết, vòng lặp for được thiết kế xử lý cho giá trị duy nhất mà thay đổi thường xuyên. Thông thường, bạn sẽ có một giá trị tăng dần, như là khi bạn truyền một list lựa chọn của user, và bạn muốn xử lý lần lượt từng lựa chọn đó. Và bạn có thể biến đổi giá trị của biến theo bất kỳ cách nào bạn muốn. Có một dạng phức tạp hơn của vòng lặp `for`, thậm chí còn cho phép bạn thực hiện nhiều thao tác cho mỗi tham số trong 3 tham số: <br>
```php
for ($i = 1, $j = 1 ; $i + $j < 10 ; $i++ , $j++)
    {
// ... }
```
Tuy nhiên, dạng này khá phức tạp nên nó không được khuyến khích sử dụng cho những người mới bắt đầu. Điều chú ý ở đây, là bạn cần phân biết chỗ đặt dấu phẩy và dấu chấm phẩy. Cụ thể là, 3 tham số sẽ được phân tách bởi dấu chấm phẩy, và trong mỗi tham số, các câu lệnh sẽ được phân tách bởi dấu phẩy. Như ta thấy ở ví dụ trên, tham số đầu tiên và tham số thứ 3 sẽ chứa 2 câu lệnh: 
```php
$i = 1, $j = 1 // Initialize $i and $j
$i + $j < 10  // Terminating condition
$i++ , $j++   // Modify $i and $j at the end of each iteration
```
Vậy khi nào thì việc dùng vòng lặp `while` sẽ thích hợp hơn vòng lặp `for`? Đó là khi điều kiện của bạn không phụ thuộc vào một biến thường xuyên thay đổi giá trị. Ví dụ như,  khi bạn muốn kiểm tra một giá trị input hay một error đặc biệt nào đó, và thực hiện kết thúc vòng lặp khi nó xảy ra, thì hãy sử dụng vòng lặp while.
### Breaking Out of a Loop
Như bạn đã thấy cách thoát khỏi câu lệnh `switch` ở phần trên, ta có thể thoát khỏi vòng lặp `for` bằng lệnh `break`. Điều này cần thiết trong trường hợp, khi một trong các câu lệnh của bạn return error và vòng lặp không thể tiếp tục thực thi một cách an toàn. <br>
Một trường có khả năng xảy ra lỗi đó là khi ta write vào file và nó return về error, nguyên nhân có thể do đầy ổ đĩa. 
```php
<?php
  $fp = fopen("text.txt", 'wb');

  for ($j = 0 ; $j < 100 ; ++$j)
  {
	$written = fwrite($fp, "data");

	if ($written == FALSE) break;
  }

  fclose($fp);
?>
```
Ở ví dụ trên, thoạt nhìn có vẻ nó khá phức tạp, tuy nhiên t tin bạn hoàn toàn có thể hiểu được nó. Chúng ta sẽ tìm hiểu chi tiết hơn về cách xử lý file trong các bài viết sau, tuy nhiên, hiện tại t sẽ giải thích sơ qua ý nghĩa ý của nó. Ở dòng đầu tiên, ta thực hiện mở file `text.txt` để thực hiện ghi ở chế độ nhị phân (binary mode), sau đó return pointer tới file trong biến  `$fp`, biến này dùng để tham chiếu tới file đang mở. <br>
Vòng lặp này thực hiện lặp 100 lần (từ 0 tới 99) để thực hiện ghi string data vào file. Sau mỗi lần ghi, biến `$written` sẽ được gán giá trị bởi function `fwrite` thể hiện số ký tự được ghi. Nhưng nếu có lỗi, thì function `fwrite` sẽ gán giá trị cho nó là FALSE. <br>
Hàm `fwrite` sẽ kiểm tra xem biến `$written` liệu nó có bị set thành FALSE hay không, nếu có nó sẽ thoát khỏi vòng lặp, sau đó thực hiện close file. <br>
Nếu bạn muốn refactor code, ta có thể viết lại dòng code dưới đây một cách ngắn gọn hơn: <br>
`if ($written == FALSE) break;` <br>
đó là sử dụng toán tử NOT, như sau: <br>
`if (!$written) break;` <br>
Thậm chí, ta có thể rút ngắn thành chỉ 1 câu lệnh như sau: <br>
`if (!fwrite($fp, "data")) break;` <br>
Nói cách khác, là ta có thể bỏ đi biến `$written`, bởi vì nó tồn tại chỉ với mục đích là kiểm tra giá trị trả về. từ hàm `fwrite`. Thay vào đó, ta có thể kiểm tra giá trị trả về một cách trực tiếp như bên trên. <br>
Thực sự, lệnh `break` có thể nó còn mạnh mẽ hơn bạn nghĩ đấy, đó là nếu bạn có đoạn code với mức độ lồng nhau (nested) nhiều hơn 1 layer, và bạn muốn thoát ra thì bạn có thể dụng lệnh break kèm theo số layer bạn muốn thoát ra, như sau: <br>
`break 2;`
### The continue Statement
Lệnh `continue` cũng khá giống lệnh `break`, ngoại trừ việc nó yêu cầu PHP chỉ stop vòng lặp hiện tại, và thực hiện chạy luôn sang vòng lặp tiếp theo. Do đó, thay vì thoát ra khỏi hoàn toàn vòng lặp, PHP chỉ thoát ra vòng lặp hiện tại.  <br>
Cách tiếp cận này sẽ rất hữu ích trong trường hợp bạn biết rằng, đến lần lặp này sẽ không cần thực hiện tiếp và muốn lưu lại chu trình xử lý, hoặc ngăn lỗi xảy ra và thực hiện chuyển ngay sang lần lặp tiếp theo. Ở ví dụ dưới đây, lệnh `continue` dùng để ngăn chặn trường hợp chia cho 0.
```php
<?php
  $j = 10;
  while ($j > -10)
  {
    $j--;
    if ($j == 0) continue;
    echo (10 / $j) . "<br>";
  }
?>
```
Đối với tất cả các giá trị của biến `$j` từ 10 -> -10, ngoại trừ 0, thì kết quả của phép tính 10 chia cho `$j` được hiển thị. Đối với trường hợp $j = 0, lệnh `continue` được thực thi, và ngay lập tức skip qua lần lặp hiện tại để nhảy sang lần lặp tiếp theo. 
## Implicit and Explicit Casting
PHP là một ngôn ngữ đánh máy lỏng lẻo, nó cho phép bạn khai báo một biến và kiểu của nó bằng cách sử dụng nó. Nó sẽ tự động chuyển đổi giá trị từ kiểu này sang kiểu khác khi cần thiết. Ta gọi đây là *implicit casting* (ép kiểu ngầm) <br>
Tuy nhiên, *implicit casting* của PHP có thể hoạt động không được như ta mong muốn. Ở ví dụ dưới đây, giá trị đầu vào cho phép chia là integer (số nguyên). Theo mặc định, PHP sẽ convert output thành float, sao cho nó có thể hiển thị giá trị chính xác nhất. 
```php
<?php
  $a = 56;
  $b = 12;
  $c = $a / $b;

  echo $c;
?>
```
Tuy nhiên, nếu ta muốn biến $c phải là một integer thì phải làm sao? Có nhiều cách để làm việc này, một trong số đó là ép kiểu kết quả của `$a / $b` thành giá trị integer bằng cách sử dụng `(int)`, như sau: <br>
`$c = (int) ($a / $b);` <br>
Ta gọi đây là *explicit casting*. Chú ý rằng, để đảm bảo rằng, giá trị của toàn bộ biểu thực được ép kiểu thành integer, ta cần đặt biểu thức trong dấu ngoặc đơn. Nếu không, thì chỉ có biến $a được ép kiểu thành integer. <br>
![](https://images.viblo.asia/b540fb45-9b94-4214-85a6-d8aa1665b259.png)

> **Tips**: Để tránh phải sử dụng ép kiểu, ta có thể gọi hàm tích hợp sẵn của PHP. Ví dụ, để lấy giá trị integer, ta có thể sử dụng hàm `intval`.

## PHP Dynamic Linking
Bởi vì PHP là một ngôn ngữ lập trình, cho nên output hiển thị ra có thể tuỳ biến khác nhau cho mỗi user khác nhau, và toàn bộ website có thể chạy từ một single PHP web page. Mỗi khi User click vào một thứ gì đó, thì thông tin chi tiết sẽ được gửi tới web page, nó sẽ quyết định phải làm gì tiếp theo tuỳ thuộc vào cookies hay session tương ứng mà nó đã lưu. <br>
Tuy là có thể xây dựng toàn bộ website theo cách này, nhưng điều đó không được khuyến khích. Bởi vì, sourcecode của bạn ngày càng phát triển và nở to ra, và vì hệ thống dần trở nên khó sử dụng, vì nó phải tính đến mọi hành động mà user có thể thực hiện. <br>
Cho nên, sẽ hợp lý hơn nếu ta chia việc phát triển website  thành nhiều phần khác nhau. Ví dụ, một process riêng biệt cho việc đăng ký thanh viên website, cùng với tất cả các kiểm tra đầu vào như là validate địa chỉ email, xác định xem username đã được sử dụng hay chưa ... vv. <br>
Module thứ 2 có thể là module đăng nhập user vào hệ thống. Sau đó, Có thể tiếp tục xây dựng module giúp user có thể comment, một module khác chứa các link và thông tin hữu ích, hoặc là một module giúp upload hình ảnh, video ... vv. <br>
Miễn là bạn đã tạo ra một cách để theo dõi user của mình thông qua cookies hay session, bạn có thể tách website thành các phần hợp lý, mỗi tính năng đều độc lập, điều này sẽ giúp bạn dễ dàng trong việc phát triển chức năng mới và duy trì chức năng cũ. Ngoài ra, nếu bạn có một team, mỗi người người có thể phụ trách làm một module khác nhau.
## Dynamic Linking in Action
Một trong những ứng dụng web phổ biến nhất dựa trên PHP ngày nay đó là WordPress. Là một blogger hoặc người đọc bạn có thể không nhận ra rằng, mỗi phần chính đều được cung cấp file PHP riêng biệt, và các hàm dùng chung sẽ được đặt vào một file khác, và sẽ được include vào khi cần thiết. <br>
![](https://images.viblo.asia/f9c451b4-92f0-4342-9966-4da6ff285e8f.png)
Toàn bộ platform được tổ chức dưới dạng behind-the-scenes session tracking, sao cho bạn khó biết khi nào mình đang chuyển từ tiểu mục này sang tiểu mục khác. Do đó, một developer - người muốn chỉnh sửa WordPress có thể dễ dàng tìm ra các file họ cần, chỉnh sửa nó, test, và debug nó mà không làm rối tung các phần không được connect tới program. Lần tới, khi sử dụng WordPress, hãy để ý tới thanh address bar của trình duyệt, đặc biệt là nếu bạn đang quản lý một blog bạn sẽ thấy một số file PHP khác nhau đang được sử dụng.


<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác về PHP ở các bài viết lần tới nhé.<br>
Nguồn: <br>Learning PHP, MySQL & JavaScript With jQuery, CSS & HTML5*