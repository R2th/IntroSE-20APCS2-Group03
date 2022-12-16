# Giới thiệu
Trong bài viết này, chúng ta hãy cùng phân tích và tìm lời giải cho bài luyện tập dùng biến.  Các bạn dùng https://replit.com/languages/php_cli như mọi khi nhé.
# Vui vẻ luyện tập 0
Bài này khá đơn giản:
```
$myName = 'John Doe';
$message = 'John Doe: Hello, my name is John Doe.';

$yourFriendlyNeighborhoodName = 'Jane Doe';
$reply = 'Jane Doe: Hello John Doe. My name is Jane Doe. Nice to meet you.';

echo $message . PHP_EOL;
echo $reply . PHP_EOL;
```
Vậy là chúng ta sẽ có được kết quả mình mong muốn:
```
John Doe: Hello, my name is John Doe.
Jane Doe: Hello John Doe. My name is Jane Doe. Nice to meet you.
```
Tuy nhiên, nếu chúng ta muốn thay đổi giá trị của biến `myName` và biến `yourFriendlyNeighborhoodName` thì chúng cũng đồng thời phải thay đổi giá trị của biến `message` và `reply`. 
```
$myName = 'Bizz Doe';
$message = 'Bizz Doe: Hello, my name is Bizz Doe.';

$yourFriendlyNeighborhoodName = 'Ai Doe';
$reply = 'Ai Doe: Hello Bizz Doe. My name is Ai Doe. Nice to meet you.';

echo $message . PHP_EOL;
echo $reply . PHP_EOL;
```
Nếu như phải làm vậy, thì chúng ta đã không khai thác hết được những lợi ích của việc dùng biến. Vậy thì, nếu như mình có thể sử dụng giá trị của biến `myName` ở trong biến `message` thì hay biết mấy. PHP cung cấp cho chúng ta một các khá đơn giản, các bạn chỉ cần đổi nháy đơn thành nháy kép và dùng tên biến ở những chỗ cần là xong.
```
$myName = 'John Doe';
$message = "$myName : Hello, my name is $myName.";

$yourFriendlyNeighborhoodName = 'Jane Doe';
$reply = "$yourFriendlyNeighborhoodName: Hello $myName. My name is $yourFriendlyNeighborhoodName. Nice to meet you.";

echo $message . PHP_EOL;
echo $reply . PHP_EOL;
```
Kết quả thì vẫn ra như cũ nhưng cách viết của chúng ta đã thay đổi, với cách viết này, chúng ta đã khai thác được những lợi ích từ việc sử dụng biến. Thử thay đổi để thấy được lợi ích nhé. Giờ mình sẽ thay đổi biến `myName` thành `'Bizz Doe'` và `yourFriendlyNeighborhoodName` thành `'Ai Doe'` nhé.
```
$myName = 'Bizz Doe';
$message = "$myName : Hello, my name is $myName.";

$yourFriendlyNeighborhoodName = 'Ai Doe';
$reply = "$yourFriendlyNeighborhoodName: Hello $myName. My name is $yourFriendlyNeighborhoodName. Nice to meet you.";

echo $message . PHP_EOL;
echo $reply . PHP_EOL;
```
Nhìn code ta thấy, việc chúng ta cần làm đơn giản là thay đổi giá trị của biến `myName` và biến `yourFriendlyNeighborhoodName`. Và thế là message và reply sẽ tự động thay đổi theo. Với code này, chúng ta không cần phải tìm và thay đổi ở nhiều chỗ khi giá trị biến thay đổi. Đồng thời sẽ giúp chúng ta mắc ít sai lầm hơn trong quá trình thay đổi. Đây là toàn bộ code nãy giờ và kết quả:
![](https://images.viblo.asia/357c9f0e-30e9-43d0-9439-12d3720ea0b6.png)

# Vui vẻ luyện tập 1
Bài này cũng khá đơn giản phải không
```
$message = "My name is John Doe. I am a PHP developer. In my free time, I enjoy learning PHP. If you have any PHP job, please contact me. Thank you. Signature: John Doe";

echo $message . PHP_EOL;
```
Chắc hẳn các bạn sẽ thấy chúng ta cần thay đổi ở nhiều chỗ khi muốn đổi từ `PHP` thành `Javascript` và `John Doe` thành `Jane Doe`. Và giải pháp là chúng ta sẽ sử dụng biến.
```
$myName = 'John Doe';
$myProgrammingLanguage = 'PHP';
$message = "My name is $myName. I am a $myProgrammingLanguage developer. In my free time, I enjoy learning $myProgrammingLanguage. If you have any $myProgrammingLanguage job, please contact me. Thank you. Signature: $myName";

echo $message . PHP_EOL;
```
Khi thay đổi, chúng ta chỉ việc thay đổi giá trị của biến:
```
$myName = 'Jane Doe';
$myProgrammingLanguage = 'Javascript';
$message = "My name is $myName. I am a $myProgrammingLanguage developer. In my free time, I enjoy learning $myProgrammingLanguage. If you have any $myProgrammingLanguage job, please contact me. Thank you. Signature: $myName";

echo $message . PHP_EOL;
```
Đây là code và kết quả mình làm trên replit:
![](https://images.viblo.asia/1705cbe8-3f5e-4e6b-9aaf-01c895b85179.png)
# Kết luận
Như vậy hôm nay chúng ta đã cùng phân tích, bàn luận và tìm lời giải đáp cho hai bài tập về biến. Như vậy, luồng để mà code thường là giải quyết vấn đề trước, thành công rồi thì xem lại code và tối ưu code. Ví dụ như hai bài luyện tập trên, mình sẽ tiếp cận bằng cách code cho ra kết quả mong muốn đã, sau đó xem xem chỗ nào lặp lại nhiều mà lại thường xuyên thay đổi thì đặt thành biến, đọc lại và xem xét tên biến hợp lí không. Sau tất cả, chúng ta sẽ có được một đoạn code giải quyết được vấn đề mình cần và gọn gàng.