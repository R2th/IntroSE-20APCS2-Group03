## 1. Định nghĩa
Một mảng là một cấu trúc dữ liệu mà lưu giữ một hoặc nhiều kiểu giá trị giống nhau trong một giá trị đơn. 
Nói đơn giản thì mảng như các dòng xe ô tô, từng dòng xe mang từng giá trị riêng (*value*) và được đánh số bằng thứ tự phổ biến trên thị trường (*key*).

## 2. Cú pháp
Để tạo mảng chúng ta sử dụng hàm `array()` trong PHP (Từ PHP 5.4 trở lên bạn chỉ cần viết giá trị trong cặp dấu [ ] cũng được)

```php
array(
    key  => value,
    key2 => value2,
    key3 => value3,
    ...
)
```
Ví dụ:
```php
<?php
    $cars=array("Volvo","BMW","Toyota");
    var_dump( $cars );
?>
```
Kết quả bạn có như sau:
```php
array(3) {
    [0]=> string(5) "Volvo"
    [1]=> string(3) "BMW"
    [2]=> string(6) "Toyota"
}
```
Như ví dụ trên chúng ta có mảng 3 giá trị. Trong đó nó có 3 key đánh số từ [0] đến [2] cho 3 giá trị (dòng xe) tương ứng. Mỗi giá trị bên trong nó sẽ hiển thị kèm theo tên kiểu dữ liệu. 
Như vậy bạn có thể hiểu, Volvo, BMW, Toyota là giá trị trong mảng `$cars` mà ta `dump` ra. Các key nó sẽ tự động gán khi khởi tạo mảng.
Để lấy giá trị trong mảng như ý muốn của mình, chúng ta sẽ lấy ra bằng cách viết tên biến kèm theo key cần lấy giá trị như sau:

```php
<?php
    echo $cars[2];
?>
```

## 3. Các loại mảng
### **3.1. Mảng số nguyên**
Một mảng có chỉ mục ở dạng số. Giá trị được lưu trữ và truy cập tuyến tính.
VD:
```php
<?php
    $numbers = array( 1, 2, 3, 4, 5);
    foreach( $numbers as $value )
    {
        echo "Giá trị phần tử mảng là $value";
    }
    /* Phương thức thứ hai để tạo mảng trong PHP. */
    $numbers[0] = "Volvo";
    $numbers[1] = "BMW";
    $numbers[2] = "Toyota";
    $numbers[3] = "Mazda";
    $numbers[4] = "Kia";
    foreach( $numbers as $value )
    {
        echo "Giá trị phần tử mảng là $value";
    }  
?>
```
KQ:
```
    Giá trị phần tử mảng là 1 
    Giá trị phần tử mảng là 2 
    Giá trị phần tử mảng là 3 
    Giá trị phần tử mảng là 4 
    Giá trị phần tử mảng là 5 
    Giá trị phần tử mảng là Volvo 
    Giá trị phần tử mảng là BMW 
    Giá trị phần tử mảng là Toyota 
    Giá trị phần tử mảng là Mazda 
    Giá trị phần tử mảng là Kia
```
### **3.2. Mảng liên hợp**
Một mảng với chỉ mục ở dạng chuỗi kí tự. Mảng này lưu trữ các giá trị phần tử bằng sự kết hợp với các giá trị key thay vì trong một trật tự chỉ mục tuyến tính nghiêm ngặt như mảng số nguyên.
Các mảng liên hợp là khá giống với các mảng số nguyên về tính năng, nhưng chúng khác nhau về chỉ mục. Mảng liên hợp sẽ có chỉ mục ở dạng chuỗi để mà bạn có thể thiết lập một liên kết mạnh giữa `key` và `value`.

VD:
```php
<?php   
     /* Phương thức thứ nhất để tạo mảng liên hợp. */
     $dong_xe = array("volvo" => 3, "bmw" => 2, "toyota" => 1);
 
     echo "Mức độ phổ biến của Volvo là ". $dong_xe['volvo']. "";
     echo "Mức độ phổ biến của BMW là ".  $dong_xe['bmw']. "";
     echo "Mức độ phổ biến của Toyota là ".  $dong_xe['toyota']. "";
 
     /* Phương thức thứ hai để tạo mảng liên hợp. */
     $dong_xe['volvo'] = "low";
     $dong_xe['bmw'] = "medium";
     $dong_xe['toyota'] = "high";
 
     echo "Mức độ phổ biến của Volvo là ". $dong_xe['volvo'] . "";
     echo "Mức độ phổ biến của BMW là ".  $dong_xe['bmw']. "";
     echo "Mức độ phổ biến của Toyota là ".  $dong_xe['toyota']. "";
?>
```
Kq:
```
    Mức độ phổ biến của Volvo là 3
    Mức độ phổ biến của BMW là 2
    Mức độ phổ biến của Toyota là 1
    Mức độ phổ biến của Volvo là low
    Mức độ phổ biến của BMW là medium
    Mức độ phổ biến của Toyota là high
```
### **3.3. Mảng đa chiều**
Một mảng chứa một hoặc nhiều mảng và các giá trị được truy cập bằng cách sử dụng nhiều chỉ mục có nghĩa là mỗi phần tử cũng có thể là một mảng. Và mỗi phần tử trong một mảng phụ có thể là một mảng, và cứ tiếp tục như vậy. Các giá trị trong mảng đa dạng được truy cập bởi sử dụng nhiều chỉ mục.
VD:
```php
<?php
    $diemdanhgia = array( 
    "volvo" => array
    (
        "mausac" => 7,
        "kieudang" => 8,  
        "tocdo" => 9
    ),

    "bmw" => array
    (
        "mausac" => 7,
        "kieudang" => 9,
        "tocdo" => 6
    ),

    "toyota" => array
    (
        "mausac" => 8,
        "kieudang" => 8,
        "tocdo" => 9
    )
);
 
    /* truy cập các giá trị của mảng đa chiều */
    echo "Điểm đánh giá màu sắc của Volvo là: " ;
    echo $diemdanhgia['volvo']['mausac'] . ""; 
 
    echo "Điểm đánh giá kiểu dáng của BMW là: ";
    echo $diemdanhgia['bmw']['kieudang'] . ""; 
 
    echo "Điểm đánh giá tốc độ của Toyotalà: " ;
    echo $diemdanhgia['toyota']['tocdo'] . "";
?>
```
KQ:
```
    Điểm đánh giá màu sắc của Volvo là: 7
    Điểm đánh giá kiểu dáng của BMW là: 9
    Điểm đánh giá tốc độ của Toyotalà: 9
```


## 4. Phép lặp trong mảng

### **4.1. Phép lặp mảng tuần tự:**
Cú pháp:
```php
foreach($array as $temp)
    { Hành Động }
```
Trong đó `$array` là mảng mà ta muốn thực thi việc lặp dữ liệu, và `$temp` là một biến trong đó ta sẽ tạm thời lưu trữ mỗi phần tử.
Ví dụ:
```php
<?php
    $cars= array("Volvo", "BMW", "Toyota");
    foreach ($cars as $car){ 
        echo "$car"; 
    }
?>
```
### **4.2. Lặp lại qua một mảng kết hợp:**
Cú pháp:
```php
foreach($array as $key=>$value)
	{ Hành Động }
```
Trong đó `$array` là mảng mà ta muốn thực thi việc lặp dữ liệu, `$key` là một biến vốn tạm thời chứa mỗi khóa, và `$value` là một biến vốn tạm thời chữa mỗi giá trị.
Ví dụ:
```php
<?php
    $car= array( "ten"   	=>"Volvo", 
                 "tocdo"    	=>"230", 
                 "kieudang"  	=>"co_dien", 
                 "mausac"    	=>"nau_xam");
    foreach($car as $key=>$val){
        echo "Key: $key. Gia Tri: $val";
    }
?>
```
## 5. Các hàm xử lý mảng trong PHP
| Hàm | Mô tả | PHP |
| -------- | -------- | -------- |
|`array()`|Tạo một mảng|3|
|`array_change_key_case()`|Trả về một mảng với tất cả key trong dạng chữ hoa hoặc chữ thường|4|
|`array_chunk()`|Chia một mảng thành một mảng các mảng|4|
|`array_combine()`|Tạo một mảng bởi sử dụng một mảng cho key và mảng khác cho value|5|
|`array_count_values()`|Trả về một mảng với số lần xuất hiện mỗi value|4|
|`array_diff()`|So sánh các value của mảng, và trả về các sự khác nhau|4|
|`array_diff_assoc()`|So sánh key và value của mảng, và trả về sự khác nhau|4|
|`array_diff_key()`|So sánh các key của mảng, và trả về các sự khác nhau|5|
|`array_diff_uassoc()`|So sánh key và value của mảng, với một hàm kiểm tra bổ sung do người dùng tạo, và trả về các sự khác nhau|5|
|`array_diff_ukey()`|So sánh key của mảng, với một hàm kiểm tra bổ sung do người dùng tạo, và trả về các sự khác nhau|5|
|`array_fill()`|Điền value vào một mảng|4|
|`array_fill_keys()`|Điền value vào một mảng, chỉ rõ các key|5|
|`array_filter()`|Lọc các phần tử của một mảng bởi sử dụng một hàm do người dùng tạo|4|
|`array_flip()`|Trao đổi tất cả key với value được liên hợp với chúng trong một mảng|4|
|`array_intersect()`|So sánh các value trong mảng và trả về các so khớp|4|
|`array_intersect_assoc()`|So sánh các key và value trong mảng và trả về các so khớp|4|
|`array_intersect_key()`|So sánh các key trong mảng và trả về các so khớp|5|
|`array_intersect_uassoc()`|So sánh các key và value trong mảng, với một hàm kiểm tra bổ sung do người dùng tạo và trả về các so khớp|5|
|`array_intersect_ukey()`|So sánh các key trong mảng, với một hàm kiểm tra bổ sung do người dùng tạo và trả về các so khớp|5|
|`array_key_exists()`|Kiểm tra xem key đã cho có tồn tại trong mảng không|4|
|`array_keys()`|Trả về tất cả key của một mảng|4|
|`array_map()`|Gửi mỗi value của một mảng tới một hàm do người dùng tạo, mà trả về các value mới|4|
|`array_merge()`|Sáp nhập một hoặc nhiều mảng thành một mảng|4|
|`array_merge_recursive()`|Sáp nhập một hoặc nhiều mảng thành một mảng|4|
|`array_multisort()`|Sắp xếp các mảng đa chiều|4|
|`array_pad()`|Chèn số lượng item đã xác định với một value đã xác định vào một mảng|4|
|`array_pop()`|Xóa phần tử cuối cùng của một mảng|4|
|`array_product()`|Tính toán tích các value trong một mảng|5|
|`array_push()`|Chèn một hoặc nhiều phần tử vào phần cuối của một mảng|4|
|`array_rand()`|Trả về một hoặc nhiều key ngẫu nhiên từ một mảng|4|
|`array_reduce()`|Trả về một mảng ở dạng string, sử dụng hàm do người dùng tạo|4|
|`array_reverse()`|Trả về một mảng với thứ tự bị đảo ngược|4|
|`array_search()`|Tìm kiếm một mảng cho một value đã cho và trả về key|4|
|`array_shift()`|Gỡ bỏ phần tử đầu tiên từ một mảng, và trả về value của phần tử bị gỡ bỏ|4|
|`array_slice()`|Trả về các phần đã chọn của một mảng|4|
|`array_splice()`|Gỡ bỏ và thay thế các phần tử đã xác định của một mảng|4|
|`array_sum()`|Trả về tổng các value trong một mảng|4|
|`array_udiff()`|So sánh các value của mảng trong một hàm do người dùng tạo và trả về một mảng|5|
|`array_udiff_assoc()`|So sánh các key của mảng, và so sánh các value của mảng trong một hàm do người dùng tạo, và trả về một mảng|5|
|`array_udiff_uassoc()`|So sánh các key và value của mảng trong một hàm do người dùng tạo, và trả về một mảng|5|
|`array_uintersect()`|So sánh các value của mảng trong một hàm do người dùng tạo, và trả về một mảng|5|
|`array_uintersect_assoc()`|So sánh các key của mảng, và so sánh các value của mảng trong một hàm do người dùng tạo, và trả về một mảng|5|
|`array_uintersect_uassoc()`|So sánh các value của mảng trong một hàm do người dùng tạo, và trả về một mảng|5|
|`array_unique()`|Gỡ bỏ bản sao các value từ một mảng|4|
|`array_unshift()`|Thêm một hoặc nhiều phần tử tới phần đầu của mảng|4|
|`array_values()`|Trả về tất cả value của một mảng|4|
|`array_walk()`|Áp dụng một hàm do người dùng tạo tới mỗi thành viên của một mảng|3|
|`array_walk_recursive()`|Áp dụng một hàm một cách đệ qui do người dùng tạo tới mỗi thành viên của một mảng|5|
|`arsort()`|Sắp xếp một mảng với thứ tự đảo ngược và duy trì liên kết chỉ mục|3|
|`asort()`|Sắp xếp một mảng và duy trì liên kết chỉ mục|3|
|`compact()`|Tạo một mảng chứa các biến và các value của chúng|4|
|`count()`|Đếm các phần tử trong một mảng, hoặc các thuộc tính trong một đối tượng|3|
|`current()`|Trả về phần tử hiện tại trong một mảng|3|
|`each()`|Trả về cặp key và value hiện tại từ một mảng|3|
|`end()`|Thiết lập con trỏ nội bộ của một mảng tới phần tử cuối cùng của nó|3|
|`extract()`|Nhập các biến vào trong bảng biểu tượng hiện tại từ một mảng|3|
|`in_array()`|Kiểm tra nếu một value đã xác định là tồn tại trong một mảng|4|
|`key()`|Lấy một key từ một mảng|3|
|`krsort()`|Sắp xếp một mảng bằng các key theo thứ tự đảo ngược|3|
|`ksort()`|Sắp xếp một mảng bằng các key|3|
|`list()`|Gán các biến như nếu chúng là một mảng|3|
|`natcasesort()`|Sắp xếp một mảng bởi sử dụng một thuật toán "natural order" không phân biệt kiểu chữ|4|
|`natsort()`|Sắp xếp một mảng bởi sử dụng một thuật toán "natural order"|4|
|`next()`|Tăng con trỏ mảng nội bộ hay trỏ tới phần tử kế tiếp của một mảng|3|
|`pos()`|Alias của hàm current()|3|
|`prev()`|Giảm con trỏ mảng nội bộ hay trỏ tới phần tử ở trước của một mảng|3|
|`range()`|Tạo một mảng chứa một phạm vi phần tử|3|
|`reset()`|Thiết lập con trỏ nội bộ của mảng về phần tử đầu tiên của nó|3|
|`rsort()`|Sắp xếp một mảng theo thứ tự đảo ngược|3|
|`shuffle()`|Xáo trộn một mảng|3|
|`sizeof()`|Alias của hàm count()|3|
|`sort()`|Sắp xếp một mảng|3|
|`uasort()`|Sắp xếp một mảng với một hàm do người dùng tạo và duy trì liên kết chỉ mục|3|
|`uksort()`|Sắp xếp một mảng bằng các key bởi sử dụng một hàm do người dùng tạo|3|
|`usort()`|Sắp xếp một mảng bằng các value bởi sử dụng một hàm do người dùng tạo|3|


Bài viết có tham khảo từ các nguồn\
https://www.w3schools.com/php/php_arrays.asp \
http://vietjack.com/php/ham_xu_ly_mang_trong_php.jsp \
http://www.qhonline.info/php-can-ban/25/bai-6--tong-quan-ve-mang-va-cac-ham-ho-tro-trong-php.html