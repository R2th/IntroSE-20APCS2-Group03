# 1. Mảng là gì? Mảng trong PHP là gì?
**Mảng (Array) trong PHP** là một biến sử dụng để lưu trữ các giá trị, dữ liệu liên quan. 
Bạn cứ tưởng tưởng một mảng như một hộp sôcôla với các khe bên trong.
Hộp đại diện cho chính mảng trong khi sôcôla đại diện cho các giá trị được lưu trữ trong mảng.
# 2. Mảng chỉ số (Numeric Array) trong PHP
Mảng chỉ số (Numeric Array) sử dụng chỉ số (index) làm khóa truy cập (Access key). 

Access Key là tham chiếu đến khe cắm bộ nhớ trong biến mảng.

Access Key được sử dụng bất cứ khi nào chúng ta muốn đọc hoặc gán giá trị mới cho một phần tử mảng. 
Dưới đây là cú pháp để tạo mảng chỉ số trong PHP:
```php
// Cú pháp tạo mảng chỉ số
$array = [giaTri1, giaTri2];
```
Giải thích các thành phần trong mảng:

* `$array`: là tên của biến mảng
* `giaTri`: là giá trị được gán cho phần tử mảng (ở vị trí index).

Bây giờ hãy xem một ví dụ về một mảng số:

* Giả sử chúng ta có 5 bộ phim mà chúng ta muốn lưu trữ trong các biến mảng.
* Chúng ta có thể sử dụng ví dụ hiển thị như bên dưới để làm điều đó.
```php
// Gán giá trị cho từng vị trí trong mảng
$phim[0] = 'One Piece';
$phim[1] = 'Dragon Ball';
$phim[2] = 'Doremon';
$phim[3] = 'One-Punch Man';
$phim[4] = 'Naruto';
```
Các số 0, 1, 2, 3, 4 đó chính là vị trí (index) lưu trữ của các giá trị.

Mỗi mảng được cung cấp một số chỉ mục được sử dụng để truy xuất hoặc sửa đổi giá trị của nó.
```php
$phim[0]="One Piece";
$phim[1]="Dragon Ball";
$phim[2]="Doremon";
$phim[3]="One-Punch Man";
$phim[4]="Naruto";

echo $phim[3];
$phim[3] = "Fairy Tail";
echo "<br />";
echo $phim[3];
```
Kết quả:
```
One-Punch Man
Fairy Tail
```
# 3. Mảng kết hợp (Associative Array) trong PHP
Mảng kết hợp khác với mảng chỉ số theo nghĩa là mảng kết hợp sử dụng Tên mô tả (key) cho các Access Key.
Dưới đây là cú pháp để tạo mảng kết hợp trong php:
```php
// Cách 1
// Cú pháp này PHP engine tự động tạo 1 mảng $ten_mang
// rồi gán cho nó một cặp key => value
$array["key"] = value;

// Cách 2
$array = ['key' => value];
```
Giải thích các phần tử trong cú pháp trên:

* `$array` là tên của biến mảng
* `["key"]` là tên của định danh của phần tử sẽ được sử dụng để truy cập phần tử sau này (access key hoặc là key)
* `value` là giá trị được gán cho phần tử mảng.

Chúng ta hãy giả sử rằng chúng ta có một nhóm người và chúng ta muốn phân định giới tính của mỗi người theo tên của họ.
Đoạn code dưới đây giúp chúng ta làm điều đó:
```php
$sinhVien = array("Hải" => "Nam", "Doanh" => "Nam", "Nhung" => "Nữ");
print_r($sinhVien);
```
Bạn có thể thấy, thay vì đánh chỉ số từ 0, 1, 2, 3 thì chúng ta sử dụng keyname là:

* Hải
* Doanh
* Nhung

Mảng kết hợp này rất hữu ích khi bạn lấy dữ liệu từ cơ sở dữ liệu.

Bởi vì tên trường thường không đánh theo chỉ số 1, 2, 3, 4 mà được đánh theo ID (Ví dụ: SV001, SV003, SP001....)
# 4. Mảng đa chiều trong PHP
**Mảng đa chiều** là các mảng có chứa các mảng lồng nhau khác. 

Ưu điểm của mảng đa chiều là chúng cho phép chúng ta nhóm các dữ liệu liên quan lại với nhau trong khi vẫn chia tách được rõ ràng các nhóm nhỏ hơn. 

Hãy xem xét một ví dụ thực tế triển khai mảng đa chiều trong php. Bảng dưới đây cho thấy một danh sách các bộ phim theo thể loại phim:
```php
// Khai báo mảng đa chiều
$phims =array(
  "Hành động" => array("Jonh Wick", "Người vận chuyển", "Nhiệm vụ bất khả thi"),
  "Viễn tưởng" => array("Endgame", "Infinity War"),
  "Lãng mạn" => array("La La land"),
  "Kịch tính" => array("Tên trộm và cô chủ nhà")
);

// In ra cấu trúc mảng
print_r($phims);
```
Bạn có thể thấy các thể loại phim:

* Hành động
* Viễn tưởng
* Lãng mạn
* Kịch tính

Mà trong mỗi thể loại phim ta lại có từ 1 đến 2 bộ phim khác nhau. Kết quả chúng ta nhận được sẽ là:
```
Array ( [Hành động] => Array ( [0] => Jonh Wick [1] => Người vận chuyển [2] => Nhiệm vụ bất khả thi ) [Viễn tưởng] => Array ( [0] => Endgame [1] => Infinity War ) [Lãng mạn] => Array ( [0] => La La land ) [Kịch tính] => Array ( [0] => Tên trộm và cô chủ nhà ) )
```
# 5. Sử dụng toán tử thao tác với mảng trong PHP
### Toán tử "+" để cộng 2 mảng trong PHP
Ta sử dụng toán tử "+" để kết hợp các phần tử từ cả hai mảng:
Ví dụ kết hợp phần tử của 2 mảng như sau:
```php
$x = array('id' => 1);
$y = array('value' => 10);
$z = $x + $y;
```
### So sánh 2 mảng có bằng nhau không bằng toán tử "==" trong PHP

Toán tử == so sánh hai mảng nếu chúng bằng nhau và trả về true hoặc 1 nếu đúng:
```php
$x = array("id" => 1);
$y = array("id" => "1");

if($x == $y) {
    echo "true";
} else {
    echo "false";
}
// Kết quả true hoặc 1
```
### Sử dụng toán tử "===" để so sáng 2 mảng trong PHP
Toán tử "===" sẽ so sánh cả **giá trị và kiểu dữ liệu** trong 2 mảng được đem ra so sánh:
```php
$x = array("id" => 1);
$y = array("id" => "1");

if($x === $y) {
    echo "true";
} else {
    echo "false";
}
// Kết quả False hoặc 0
```
### Sử dụng toán tử "!=" và "<>" để so sánh mảng trong PHP
```php
$x = array("id" => 1);

$y = array("id" => "1");

if($x != $y) {
    echo "true";
} else {
    echo "false";
}

// Kết quả trả về là False hoặc 0
```
# 6. Tìm hiểu về Array Functions trong PHP
### Hàm count: Đếm số lượng phần tử trong mảng PHP
Để đếm số phần tử trong một mảng trong PHP ta sử dụng hàm count, như ví dụ sau:
```php
// Khai báo mảng $phims
$phims = array("Jonh Wick", "Người vận chuyển", "Nhiệm vụ bất khả thi");

// Xuất ra số lượng phần tử trong mảng $phims
echo count($phims);
// Kết quả sẽ là 3
```
### Sử dụng Hàm is_array để kiểm tra liệu đây có phải một mảng trong PHP
Muốn biết một biến trong PHP có phải là một mảng hay không. Chúng ta sẽ sử dụng hàm is_array.
```php
// Khai báo 1 mảng $phims để sử dụng
$phims = array("Jonh Wick", "Người vận chuyển", "Nhiệm vụ bất khả thi");

// Xuất thông báo xem biến $phims có phải 1 mảng hay không
echo is_array($phims);

// Kết quả sẽ là 1 (true)
```
### Cách sử dụng Hàm sort trong PHP
* Hàm này được sử dụng để sắp xếp các mảng theo các giá trị chứa trong mảng.
* Nếu các giá trị là chữ và số, nó sắp xếp chúng theo thứ tự bảng chữ cái.
* Nếu các giá trị là số, nó sắp xếp chúng theo thứ tự tăng dần.
* Nó loại bỏ các khóa truy cập hiện có và thêm các phím số mới.
* Đầu ra của hàm này là một mảng chỉ số
```php
// Khai báo mảng $sinhVien
$sinhVien = array("Hải" => "Nam", "Doanh" => "Nam", "Nhung" => "Nữ");

// Sắp xếp các giá trị trong mảng $sinhVien
sort($sinhVien);

// In ra mảng $sinhVien để kiểm tra
print_r($sinhVien);

// kết quả: Array ( [0] => Nam [1] => Nam [2] => Nữ )
```
# 7. Tại sao nên sử dụng mảng để chứa dữ liệu?
Trong trường hợp cần thiết, chúng ta nên sử dụng mảng để chứa dữ liệu vì 3 lý do sau đây:

* Nội dung của Mảng có thể được kéo dài mà vẫn tiết kiệm bộ nhớ
* Mảng giúp dễ dàng lưu trữ và thao tác với các thông tin có liên quan đến nhau
* Sử dụng mảng giúp viết code sạch hơn.