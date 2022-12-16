Hàm là một chương trình thực hiện một tác vụ cụ thể, chúng thực chất là những đoạn chương trình nhỏ giúp giải quyết một vấn đề lớn. Hàm là một phương pháp lập trình hướng thủ tục trong ngôn ngữ PHP và các ngôn ngữ bậc cao khác, hiểu được nó các bạn mới có thể tiếp tục học những kiến thức như lập trình đối tượng. 

### Hàm là gì ? 

Hàm nghĩa là một tập hợp các đoạn mã và nó sẽ thực thi các đoạn mã đó khi gọi hàm ra, nó sẽ được thực thi lại nhiều lần hoặc thực thi trong một trường hợp nhất định.

Hàm trong PHP dùng để thực hiện một khối lệnh liên tiếp có điểm đầu và điểm cuối. Một hàm được xác định thực hiện một công việc cụ thể nào đó. Giả sử bạn cần viết một chương trình cho người dùng đăng nhập vào hệ thống và bạn sẽ sử dụng nó ở hai ứng dụng backend và frontend. Nhưng sau một thời gian bạn muốn sửa lại một số thông tin lúc kiểm tra thì bạn sẽ phải vào hai chương trình đó và sửa lại, điều này thật tệ hại vì chương trình sẽ bị dư thừa, khó quản lý và bảo trì. Nhưng nếu bạn sử dụng hàm thì chỉ cần sửa trong hàm đó là được.

### **Cách xây dựng hàm**

Để tạo một hàm, chúng ta khai báo bằng từ khoá function tên_hàm() như sau:
```
function func_name($vars)
{
    // các đoạn code của hàm
    return $val;
}
```
`func_name `là tên của hàm, `$vars` là các biến sẽ truyền vào trong hàm, return `$val` là hàm sẽ trả về giá trị `$val`. Nếu hàm không có trả về giá trị nào thì ta không có dòng return này.

### Hàm có tham số

Một trong những tính năng hữu dụng nhất của hàm là bạn có thể truyền tham số vào trong giá trị của hàm. Ví dụ như bạn tạo một hàm tính tổng, cho phép tính tổng của hai số mà người dùng nhập vào thì bạn sẽ cần sử dụng tham số, sau đó truyền giá trị của tham số vào bên trong hàm để nó xử lý rồi trả về kết quả.

```
<?php
function tinh_tong( $x, $y )
{
$total = $x + $y;
return $total;
}
// Gọi hàm ra kèm giá trị tham số
echo tinh_tong( 5,10 );
?>
```

Điều này có nghĩa là, bạn mặc định hàm tinh_tong() có hai tham số là $x và $y theo thứ tự giá trị đứng trước là x, đứng sau là y. Sau đó trong nội dung của hàm, chúng ta có hàm $total là tổng của $x và $. Cuối cùng là trả về biến $total để in kết quả. Khi ta gọi hàm `tinh_tong(5,10)` thì hàm sẽ thực hiện, với giá trị theo thứ tự là $x = 5 và $y = 10.

Ta cũng có thể gán giá trị mặc định cho biến: 

```
<?php
$x = 5;
$y = 10;
function tinh_tong( $x, $y )
{
$total = $x + $y;
return $total;
}
?>
```

### Cách gọi hàm trong PHP

* Truyền bằng giá trị:

Mặc định tất cả các đối số truyền vào hàm đều là truyền bằng giá trị. Điều này có nghĩa là khi các đối số được truyền đến hàm được gọi, giá trị được truyền thông qua các biến tạm (tham số hình thức). mọi thao tác chỉ thực hiện trên biến tạm này nên nó không hề tác động đến biến chính của mình. Điều này có nghĩa là nếu truyền bằng giá trị thì trong hàm nếu ta tác động đến giá trị biến truyền vào thì sau khi thoát khỏi hàm giá trị đó không thay đổi. Ví dụ:

```
// Biến
$a = 1;
  
// Hàm tăng giá trị tham số truyền vào lên 1
function tang_len_1($a)
{
    return $a + 1;
}
  
// Xuất giá trị trả về của hàm
echo tang_len_1($a);
  
// Xuất giá trị của biến
echo $a;
```
Kết quả xuất ra màn hình sẽ là 2 và 1. Như thế biến $a vẫn giữ nguyên giá trị bằng 1 sau khi hàm kết thúc. Còn trong hàm thì biến $a có giá trị là 2.

*  Truyền bằng tham chiếu:

Khi các đối số được truyền bằng giá trị thì giá trị của các đối số của hàm đang gọi không bị thay đổi. Tuy nhiên đôi khi bạn muốn những giá trị đó thay đổi theo thì lúc này bạn phải truyền biến vào hàm dạng tham chiếu.
```
// Biến
 $a = 1;
  
// Hàm tăng giá trị tham số truyền vào lên 1
 function tang_len_1(&$a)
 {
    $a = $a + 1;
     return $a; 
 }
  
// Xuất giá trị trả về của hàm
 echo tang_len_1($a);
  
// Xuất giá trị của biến
 echo $a;
```

Kết quả xuất ra màn hình là 2 và 2. như vậy biến $a đã bị thay đổi. Sự khác biệt ở đoạn code này so với đoạn code trên là biến $a ở hàm tang_len_1 có dấu &, đây chính là cú pháp trong PHP báo cho trình biên dịch biết đó là một biến ở dạng tham chiếu.

Đây là một trong các bài quan trọng nhất trong PHP  vì hàm có rất bổ ích sau này khi bạn viết code, nó sẽ giúp bạn xử lý các tác vụ trong code tốt hơn cũng như có thể viết một hàm để làm một công việc mang tính chất lặp đi lặp lại. Cảm ơn đã đọc bài.

Tài liệu tham khảo: 

https://thachpham.com/wordpress/wordpress-development/php-co-ban-ham-function.html

https://freetuts.net/xay-dung-ham-trong-php-11.html