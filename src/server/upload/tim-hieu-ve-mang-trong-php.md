## Mảng
**Mảng Là Gì?**

Mảng là kiểu dữ liệu cho phép chúng ta lưu trữ nhiều giá trị trong nó bao gồm  việc lưu trữ giá trị của một hoặc nhiều mảng khác.

**Mảng Trong PHP**

Mảng trong PHP được chia thành 3 loại khác nhau đó là:

- Mảng đánh số thứ tự (indexed array)
- Mảng kết hợp (associative array)
- Mảng đa chiều (multidimensional array)
Cả 3 loại trên đều có chung một cú pháp khi tạo mảng.

**Cú Pháp Tạo Mảng**

Để tạo mảng trong PHP chúng ta có thể sử dụng cú pháp:
```
$mang1 = array();     
```
Với các phiên bản PHP từ 5.4 trở về sau chúng ta có thể sử dụng cú pháp ngắn gọn hơn như sau:
```
$mang2 = [];
```
Ví dụ:
Nếu bạn có một danh sách các mục (ví dụ: một danh sách tên ô tô), thì việc lưu trữ các ô tô trong các biến đơn có thể trông giống như sau:
```
$cars1 = "Volvo";
$cars2 = "BMW";
$cars3 = "Toyota";
```
Tuy nhiên, nếu bạn muốn đi vòng qua những chiếc xe và tìm một chiếc cụ thể thì sao? Và nếu bạn không có 3 chiếc xe, mà là 300 chiếc?

Giải pháp là tạo một mảng!

Một mảng có thể chứa nhiều giá trị dưới một tên duy nhất và bạn có thể truy cập các giá trị bằng cách tham chiếu đến một số thứ tự.
Vậy ví dụ cú pháp tạo mảng như sau:
```
$cars = array("Volvo", "BMW", "Toyota");
```
Hoặc
```
$cars = ["Volvo", "BMW", "Toyota"];
```
## Đếm Số Phần Tử Trong Mảng
Để đếm số lượng phần tử trong một mảng PHP chúng ta sử dụng hàm count(). Các count() chức năng được sử dụng để trả lại chiều dài (số phần tử) của một mảng:
Ví dụ:
```
<?php
$cars = array("Volvo", "BMW", "Toyota");
echo count($cars);
?>
```
Giá trị đếm được là 3

## Mảng Đánh Số Thứ Tự - Indexed Array
Mảng đánh số thứ tự (indexed array) trong PHP là loại mảng mà các phần tử được đánh số thứ tự là các số tự nhiên:
Mảng dưới đây là một mảng đánh số thứ tự với các khoá là các số tự nhiên liên tiếp bắt đầu từ 0:
```
$cars = array("Volvo", "BMW", "Toyota");
```
hoặc một mảng đánh số thứ tự có thể được chỉ định theo cách thủ công:
```
$cars[0] = "Volvo";
$cars[1] = "BMW";
$cars[2] = "Toyota";
```
**Để lặp qua các phần tử trong mảng đánh số thứ tự chúng ta thường sử dụng vòng lặp for:**
```
<?php
$cars = array("Volvo", "BMW", "Toyota");
$arrlength = count($cars);

for($x = 0; $x < $arrlength; $x++) {
  echo $cars[$x];
  echo "<br>";
}
?>
```
## Mảng Kết Hợp - Associative Array
Mảng kết hợp (associative array) trong PHP là loại mảng sử dụng khoá là giá trị tuỳ ý thay vì các số tự nhiên liên tiếp.
**Có hai cách để tạo một mảng kết hợp:** 
```
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
```
Hoặc
```
$age['Peter'] = "35";
$age['Ben'] = "37";
$age['Joe'] = "43";
```
Ví dụ
```
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
echo "Peter is " . $age['Peter'] . " years old.";
?>
```
Kết quả: `Peter is 35 years old.`

**Để lặp qua từng phần tử trong mảng kết hợp chúng ta thường sử dụng foreach:**
```
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");

foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```
Kết quả: 
```
Key=Peter, Value=35
Key=Ben, Value=37
Key=Joe, Value=43
```
**Trường hợp bạn không cần tới khoá mà chỉ cần tới giá trị của phần tử:**
```
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
foreach ($age as $x_value) {
    echo "$x_value<br>";
}
?>
```
## Mảng Đa Chiều (Multidimensional Array)
Mảng đa chiều (multidimensional array) là loại mảng mà nó chứa một mảng khác bên trong nó:
PHP hỗ trợ các mảng đa chiều có độ sâu từ hai, ba, bốn, năm hoặc nhiều hơn. Tuy nhiên, hầu hết mọi người khó quản lý mảng sâu hơn ba cấp độ.

Ví dụ:
Ta có bảng sau:
| Name | Stock |Sold |
| -------- | -------- | -------- |
| Volvo     | 22    |7|
| BMW     | 10     |12|
| Saab     | 5     | 28   |
| Land Rover     |11  | 4 |
Chúng ta có thể lưu trữ dữ liệu từ bảng trên trong một mảng hai chiều.
Mảng $cars hai chiều chứa bốn mảng và nó có hai chỉ số: hàng và cột.
Để có quyền truy cập vào các phần tử của mảng $cars, chúng ta phải trỏ đến hai chỉ số (hàng và cột):
```
<?php
$cars = array (
  array("Volvo",22,7),
  array("BMW",10,12),
  array("Saab",5,28),
  array("Land Rover",11,4)
);
  
echo $cars[0][0].": In stock: ".$cars[0][1].", sold: ".$cars[0][2].".<br>";
echo $cars[1][0].": In stock: ".$cars[1][1].", sold: ".$cars[1][2].".<br>";
echo $cars[2][0].": In stock: ".$cars[2][1].", sold: ".$cars[2][2].".<br>";
echo $cars[3][0].": In stock: ".$cars[3][1].", sold: ".$cars[3][2].".<br>";
?>
```

Chúng ta cũng có thể đặt một forvòng lặp bên trong một forvòng lặp khác để lấy các phần tử của mảng $ ô tô (chúng ta vẫn phải trỏ đến hai chỉ số):
```
<?php
$cars = array (
  array("Volvo",22,7),
  array("BMW",10,12),
  array("Saab",5,28),
  array("Land Rover",11,4)
);
    
for ($row = 0; $row < 4; $row++) {
  echo "<p><b>Row number $row</b></p>";
  echo "<ul>";
  for ($col = 0; $col < 3; $col++) {
    echo "<li>".$cars[$row][$col]."</li>";
  }
  echo "</ul>";
}
?>
```

## Các hàm sắp xếp mảng
Nếu bạn cần thiết lập lại thứ tự các giá trị bên trong mảng thì có thể sử dụng các hàm sau đây:

**1. sort() – Xếp mảng theo thứ tự tăng dần.**

Ví dụ:  Sắp xếp các phần tử của mảng $car theo thứ tự bảng chữ cái tăng dần:
```
<?php
$cars = array("Volvo", "BMW", "Toyota");
sort($cars);

$clength = count($cars);
for($x = 0; $x < $clength; $x++) {
  echo $cars[$x];
  echo "<br>";
}
?>
```
**2. rsort() – Xếp mảng theo thứ tự giảm dần.**

Ví dụ: Sắp xếp các phần tử của mảng $number theo thứ tự số giảm dần:
```
<?php
$numbers = array(4, 6, 2, 22, 11);
rsort($numbers);

$arrlength = count($numbers);
for($x = 0; $x < $arrlength; $x++) {
  echo $numbers[$x];
  echo "<br>";
}
?>
```
**3. asort() – Xếp mảng theo thứ tự tăng dần, dựa vào giá trị.**

Ví dụ: Sắp xếp một mảng kết hợp theo thứ tự tăng dần, theo giá trị:
```
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
asort($age);

foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```
**4. ksort() – Xếp mảng theo thứ tự tăng dần, dựa vào key.**

Ví dụ: Sắp xếp một mảng kết hợp theo thứ tự tăng dần, theo khóa:
```
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
ksort($age);

foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```
**5. arsort() – Xếp mảng theo thứ tự giảm dần, dựa vào giá trị.**

Ví dụ: Sắp xếp một mảng kết hợp theo thứ tự giảm dần, theo giá trị:
```
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
arsort($age);

foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```
**6. krsort() – Xếp mảng theo thứ tự giảm dần, dựa vào key.**

Ví dụ: Sắp xếp một mảng kết hợp theo thứ tự giảm dần, theo khóa:
```
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
krsort($age);

foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```

Tài liệu tham khảo: [](https://www.w3schools.com/php/php_arrays.asp)