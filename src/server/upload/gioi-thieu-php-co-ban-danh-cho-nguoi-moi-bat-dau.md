## PHP là gì

PHP là ngôn ngữ back-end trong lập trình website. Người ta nói rằng nó dễ học hơn các ngôn ngữ khác không chỉ nhờ vào cú pháp đơn giản mà còn nhờ ít ràng buộc. 

PHP được dùng để tạo ra nhiều ứng dụng web khác nhau, bao gồm cả Wordpress, nhờ việc tích hợp dễ dàng với cơ sở dữ liệu như MySQL.

## Sự khác biệt giữa HTML / Javascript và PHP

Trong khi PHP được dùng để tạo ra các trang “web động”, HTML thường được dùng như markup của các trang ”web tĩnh”. 

Nói sơ qua 2 thuật ngữ này, “web tĩnh” là website có nội dung không đổi, trong khi “web động” có thể được dùng để hiển thị nội dung thay đổi dựa trên một số điều kiện, ví dụ như quyền truy cập, thời gian duyệt web … vv. 

Ví dụ đơn giản như số lượt comment hay tương tác trên Facebook, những con số này thay đổi theo thời gian và tùy theo từng bài viết, đã được trích xuất nhờ PHP, và hiển thị dưới dạng HTML.

PHP có thể trích xuất ra HTML dùng để hiển thị lên giao diện người dùng, nhưng đặc biệt hơn cả là khả năng tùy biến và nhúng mã PHP vào giữa các thành phần HTML trong file giao diện. 

Nhờ đó, developer không cần phải tách riêng file HTML và PHP, sao phải chia hai trong khi chúng ta có thể dùng 2 trong 1, phải không 😊

Một thành phần không thể thiếu nữa của website thông dụng là Javascript, cũng đóng vai trò thực hiện tùy biến và thay đổi giao diện. 

PHP được gọi là ngôn ngữ server-side, Javascript thì lại được gọi là ngôn ngữ client-side. 

Sở dĩ, mã PHP được thực thi tại server, ngay khi request được thực thi và trước khi giao diện được trả về cho người dùng, còn Javascript phải chờ được load ra khi giao diện đã trả về xong.

## PHP có thể được sử dụng như thế nào

PHP thường được dùng trên nhiều nền tảng, đóng vai trò sâu rộng đến các thành phần nhỏ trên các ứng dụng web, từ việc tạo ra các diễn đàn, mẫu điền thông tin, cho đến giỏ hàng. 

Ví dụ như người dùng có thể nhập số lượng hàng hóa muốn mua khi thanh toán online, và PHP có thể được dùng để xử lí thông số này.

## Một số quy tắc code của PHP

### Đuôi file được dùng là .php

Những file mặc định được xử lí như mã PHP có đuôi file định nghĩa là “.php”. Như đã nói ở trên, PHP có thể được lồng ghép trong code HTML như sau, ví dụ một file tên “index.php”

```	
<html>
<body>

*** mã PHP ***

</body>
</html>

```

### Nơi đặt mã PHP

Mã PHP được đặt ở giữa phần mở đầu ở dòng 1 và phần kết thực ở dòng 3 như sau

```php
<?php
echo ‘Hello World’;
?>
```

Đoạn code trên sẽ hiển thị chữ “Hello World” ra ngoài màn hình

### Đặt dấu chấm phẩy ở cuối mỗi dòng code

PHP quy định mỗi dòng mã cần phải kết thực bằng dấu chấm phẩy (;), ví dụ như:

```php
<?php
    echo ‘Message 1’;
    echo ‘Message 2’;
?>
```
Trong ví dụ trên, các dòng chữ “Message 1” và “Message 2” sẽ lần lượt hiển thị ra màn hình, bạn có thể thấy mỗi dòng echo đều được kết thúc bằng dấu chấm phẩy.

### Cách comment code

Các dòng comment là những đoạn ghi chú hỗ trợ cho việc đọc hiểu code. 

Việc viết comment code không phải lúc nào cũng bắt buộc, nhưng việc viết chúng có thể giúp ích cho việc review sau này.

Có 3 cách để viết comment trong mã PHP như sau:

-	Gõ “//” ở đầu dòng

-	Gõ “#” ở đầu dòng

-	Hoặc bao bọc đoạn comment ở giữa 2 dấu “/*” và “*/”

```php
<?php
    echo ‘Hello World’;
// Ghi chú 1
# Ghi chú 2
/*
   Ghi chú 3 này có
   nhiều dòng
*/
?>
```

## Cú pháp cơ bản của PHP

Sau đây là một số cú pháp cơ bản của PHP

### Khai báo biến

Khi viết phần mềm, sẽ có những chuỗi thông tin có thể sử dụng lại, được lưu dưới dạng biến (variable). 

Biến có thể được dùng để lưu hầu hết loại dữ liệu, từ những chuỗi text dài ngoằng, đến những con số, true false (Boolean) …

Tuy nhiên, PHP có một số biến được định nghĩa sẵn không thể bị ghi đè, ví dụ như $GLOBALS, hay $_GET.

Ví dụ ta có một đoạn code sau:

```php
<?php
    $name = ‘Songoku’;
    echo $name;
?>
```

Khi đó, dòng text “Songoku” sẽ được hiển thị trên giao diện, do nó được lưu dưới dạng chuỗi vào biến “$name”, biến “$name” sau đó có thể được thay đổi tùy theo logic của ứng dụng.

Có một số quy tắc cho việc định nghĩa biến trong PHP như sau:

-	Bắt đầu bằng kí tự dollar ($)

-	Nhưng ký tự được cho phép dùng cho tên biến bao gồm a-z, A-Z, 0-9 và _

-	Không thể đặt tên biến bắt đầu bằng chữ số 0-9

-	Tiếng nhật cũng có thể được dùng như tên biến, nhưng không nên vậy 😊

Các đặt tên biến cũng không quá khắt khe, tuy nhiên nên đặt sao cho rõ ràng, dễ hiểu và đúng bản chất biến.

### Các toán tử (operator)

Toán tử trong PHP là các ký hiệu có thể được sử dụng trong việc tính toán. 

Có các toán tử số học như cộng trừ nhân chia, các toán tử dùng để so sánh, hoặc toán tử dùng cho suy luận…

Ví dụ ta có một đoạn code sau:

```php
<?php
    $sum = 2 + 3;
    echo “2 + 3 = $sum”;
?>
```

Dòng text “2 + 3 = 5” sẽ được hiển thị lên giao diện.

### If statement / while statement

Đoạn mã “if” thường được dùng để kiểm tra phần sau đó có giá trị đúng (TRUE) hay không, và sẽ thực thị đoạn mã bên trong nếu thỏa điều kiện trên.

```php
<?php
    $condition = 3;
    If ($condition === 3) {
       echo “Thỏa điều kiện”;
    } else {
       echo “Không thỏa điều kiện”;
    }
?>
```

Như vậy, đoạn text “Thỏa điều kiện” sẽ được hiển thị cho giá trị của biến “$condition” bằng 3.

Đoạn mã “while” được dùng để chạy những đoạn code lặp đi lặp lại, cho đến khi điều kiện while không còn được thỏa.

```php
<?php
    $increment = 1;
    while ($increment <= 5) {
       echo “Chạy 5 lần”;
       $increment++;
    }
?>
```

Đoạn text “Chạy 5 lần” sẽ hiển thị đúng 5 lần trên màn hình, cho đến khi biến “$increment” được tăng lên 1 sau 5 vòng lặp và giá trị cuối cũng sau 5 lần tăng lớn hơn 5.
 
### Khai báo hàm (function)

Các hàm (function) trong PHP là tổng hợp của nhiều đoạn code được nhóm lại và có thể thực thi toàn bộ khi hàm được gọi. 

Ví dụ ta có hàm tính tổng sau:

```php
<?php
    function sum ($a, $b) {
       return $a + $b; 
    }
?>
```

Khi gọi hàm “sum” như sau, ta lấy được tổng của 2 số là 5 và được hiển thị ra giao diện:

```php
<?php
    echo sum(2, 3);
?>
```

## Tổng kết

Khi nói về lập trình, người ta thường nghĩ đó là việc chỉ các chuyên gia mới làm được, nhưng việc sử dụng PHP thật ra không hề khó như bạn nghĩ. Hy vọng bài viết này sẽ giúp cho bạn có một khởi đầu dễ dàng hơn với việc bắt đầu tìm hiểu lập trình nói chung, PHP nói riêng.