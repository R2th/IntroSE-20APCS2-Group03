## Nội dung
### Tại sao phải sử dụng loop?

Khi cố gắng lặp lại code nhiều lần, có thể bằng cách nhập lại hoặc copy và paste cùng một dòng hoặc đoạn code. Khi đó, lỗi syntax có thể là nguyên nhân gây ra lỗi trong chương trình của mình vì những sơ suất khi copy paste code.

Như ví dụ dưới đây, yêu cầu là in tất cả các số từ 1 đến 10. Nếu không sử dụng vòng lặp thì đoạn code của mình sẽ giống như sau:
```php
echo "1\n";
echo "2\n";
echo "3\n";
echo "4\n";
echo "5\n";
echo "6\n";
echo "7\n";
echo "8\n";
echo "9\n";
echo "10";
```

Qua ví dụ trên có thể thấy, mình đã phải viết lặp lại một dòng code 10 lần. Và điều gì sẽ xảy ra khi mình thêm một đoạn text 'Đây là số: ' trước mỗi số khi in ra? Mình lại phải copy rồi paste vào từng dòng một :confused:

May mắn thay, hầu hết các ngôn ngữ lập trình đều chứa một tính năng gọi là các vòng lặp, để lặp lại code tự động cho đến khi đáp ứng một số điều kiện nhất định. Đôi khi sự lặp lại được gọi là lần lặp và mỗi lần code được thực thi được coi là lần lặp. Vòng lặp có thể được sử dụng để giảm số lượng dòng code đồng thời giúp sửa đổi sau này dễ dàng hơn nhiều.

PHP cũng không ngoại lệ và cung cấp một số cách để lặp lại việc thực thi một đoạn code, nó sẽ bao gồm các vòng lặp sau:

* while 
* do-while
* for
* foreach

Mỗi vòng lặp này chứa các điều kiện để dừng thực thi vòng lặp. Việc thực hiện không đúng các điều kiện này có thể gây ra một vòng lặp vô hạn và máy tính sẽ không bao giờ ngừng thực thi đoạn code đó.

### While

Đầu tiên sẽ là vòng lặp `while`, đây là kiểu vòng lặp sẽ tiếp tục chạy miễn là điều kiện của nó là đúng. Cú pháp vòng lặp `while`:
```php
while (/*conditional*/) {
  #code block
}
```

Tiếp tục với ví dụ in ra số từ 1 đến 10 ở trên như sau:

```php
$count = 1;
while ($count < 11)
{
  echo "The count is: " . $count . "\n";
  $count += 1;
}
```

Lần đầu tiên khi biên dịch đoạn code trên nó sẽ kiểm tra điều kiện. Nếu nó kiểm tra điều kiện là `true`, code sẽ được thực thi. Sau đó, nó sẽ kiểm tra lại điều kiện và nếu vẫn `true`, thực thi lại đoạn code. Nó tiếp tục theo cách này cho đến khi điều kiện là `false`. Tức là nó xét điều kiện trước rồi mới chạy code.

Trong ví dụ này, đoạn code trong dấu ngoặc nhọn ({}) được thực thi trong khi điều kiện trong ngoặc ($count < 11) vẫn đúng. $count bắt đầu ở giá trị 1 vì vậy điều kiện là đúng trong lần lặp đầu tiên.

Biến $count được tăng thêm 1 trong mỗi lần lặp của vòng lặp ($count += 1). Khi $count bằng 11, điều kiện không còn đúng nữa và vòng lặp `while` kết thúc.

### Do While

Vòng lặp `do-while` là một biến thể của vòng lặp while, nó đánh giá điều kiện ở cuối mỗi lần lặp của vòng lặp. Với vòng lặp `do-while`, đoạn code được thực thi một lần và sau đó điều kiện được xét đến , nếu điều kiện là `true`, câu lệnh được lặp lại miễn là điều kiện được chỉ định được đánh giá là `true`.. Cú pháp vòng lặp `do-while`:
```php
do {
    #code block
} while (/*conditional*/);
```

Áp dụng vào ví dụ ở trên như sau:
```php
// This loop counts from 0 to 10
$count = 0;
do {
  echo "The count is: " . $count . "\n";
  $count += 1;
} while ($count <= 10);
```
Vòng lặp sẽ bắt đầu từ giá trị $count = 0, sau đó nó sẽ in đầu ra và tăng thêm cho biến $count 1 đơn vị. Tiếp theo nó sẽ được xét điều kiện và vòng lặp sẽ tiếp tục chạy miễn sao $count nhỏ hơn hoặc bằng 10.

### For

Vòng lặp for lặp lại một đoạn code miễn là một điều kiện nhất định được đáp ứng. Nó thường được sử dụng để thực thi một đoạn code trong một số lần nhất định.
```php
for(initialization; condition; increment){
    // Code to be executed
}
```
Các tham số của vòng lặp `for` có ý nghĩa như sau:

* `initialization` - Được sử dụng để khởi tạo các biến đếm và được đánh giá một lần vô điều kiện trước khi thực hiện lần đầu tiên của phần thân của vòng lặp.

* `condition` - Kiểm tra vào đầu mỗi lần lặp, điều kiện được đánh giá. Nếu nó đánh giá là `true`, vòng lặp tiếp tục và các câu lệnh lồng nhau được thực thi. Nếu nó đánh giá thành `false`, việc thực hiện vòng lặp kết thúc.

* `increment` - Cập nhật bộ đếm vòng lặp với một giá trị mới. Nó được đánh giá vào cuối mỗi lần lặp.

Ví dụ bên dưới định nghĩa một vòng lặp bắt đầu từ $count = 1, vòng lặp sẽ tiếp tục chạy cho đến khi giá trị biến $count nhỏ hơn 11. Biến $count sẽ tăng dần sau mỗi một lần lặp.
```php
// This for loop counts from 1 to 10
for ($count = 1; $count < 11; $count++)
{
  echo "The count is: " . $count . "\n";
}
```

### Foreach

Vòng lặp `foreach` được sử dụng để lặp qua các mảng.

```php
foreach ($array as $value) {
  #code block
}
```
Ví dụ như in ra các phần tử trong mảng sau `$array = [1, 2, 3, 4, 5];`
```php
// This foreach loop counts from 1 to 5
$array = [1, 2, 3, 4, 5];
foreach ($array as $item {
  echo "The number is: " . $item . "\n";
}
```

Để lấy giá các key của từng phần tử trong mảng thì ta sẽ sử dụng syntax mở rộng sau:
```php
foreach ($array as $key => $value) {
  #code block
}
```

### Break và Continue

Trong PHP, `break` có thể được sử dụng để chấm dứt việc thực hiện một vòng lặp `for, foreach, while hoặc do-while`. Nhược điểm của việc sử dụng quá nhiều `break` thì sẽ khiến việc đọc logic code sẽ khó đọc hơn.
```php
// We can use the break statement to end the loop once the count reaches 4
$count = 1;
while ($count < 10)
{
  echo "The count is: " . $count . "\n";
  if ($count === 4) {
    break;
  }
  $count += 1;
}
```

Còn đối với `continue` được sử dụng để chấm dứt việc thực hiện một lần lặp trong một vòng lặp `for, foreach, while hoặc do-while`.  Khi đó vòng lặp sẽ tiếp tục được chạy cho lần lặp tiếp theo.
```php
// This code counts from 1 to 10 but skips over 5
$count = 1;
while ($count < 11)
{
  if ($count === 5) {
    $count += 1;
    continue;
  }
  echo "The count is: " . $count . "\n";
  $count += 1;
}
```

Từ khóa `continue` tương tự như `break` nhưng nó chỉ kết thúc sớm lần lặp hiện tại chứ không phải toàn bộ vòng lặp.

## Kết luận
Trên đây chúng ta vừa tìm hiểu về các vòng lặp trong PHP, hi vọng sẽ giúp ích cho các bạn mới tìm hiểu PHP có thể áp dụng khi nào sử dụng vòng lặp này, khi nào nên sử dụng vòng lặp kia cho phù hợp. Cảm ơn các bạn đã đọc bài viết của mình!

Tài liệu tham khảo:
https://www.php.net/manual/en/language.control-structures.php