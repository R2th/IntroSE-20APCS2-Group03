Như chúng ta đã biết Array là một kiểu dữ liệu rất quan trọng trong PHP, hầu hết ở những dự án chúng ta đều phải xử lý dữ liệu Array.Hôm nay mình sẽ ôn tập một chút kiến thức về Array

**1. Mảng là gì?**
- Một mảng là một cấu trúc dữ liệu mà lưu giữ một hoặc nhiều kiểu giá trị giống nhau trong một giá trị đơn. Ví dụ, nếu bạn muốn lưu 100 số, thì thay vì định nghĩa 100 biến, nó là dễ dàng để định nghĩa một mảng có độ dài là 100.

**2. Làm thế nào để tạo 1 mảng?**
- Để tạo 1 mảng chúng ta sử dụng cú pháp array().

Cú pháp: 
```php
$array = array( values );
```

Ví dụ: 
```php
$directors = array( "1", "7", "17", "23" );
```

**3. Có bao nhiêu loại mảng?**
* Có 3 loại mảng khác nhau và mỗi giá trị mảng được truy cập bởi sử dụng một ID, mà được gọi là chỉ mục mảng.
- Mảng số nguyên : Một mảng có chỉ mục ở dạng số. Giá trị được lưu trữ và truy cập tuyến tính.

- Mảng liên hợp : Một mảng với chỉ mục ở dạng chuỗi kí tự. Mảng này lưu trữ các giá trị phần tử bằng sự kết hợp với các giá trị key thay vì trong một trật tự chỉ mục tuyến tính nghiêm ngặt như mảng số nguyên.
- Mảng đa chiều : Một mảng chứa một hoặc nhiều mảng và các giá trị được truy cập bằng cách sử dụng nhiều chỉ mục.

**4. Sự khác nhau giữa array_pop() và array_push()?**
- array_pop() : Được sử dụng để loại bỏ phần tử cuối cùng của mảng truyền vào,trả về phần tử bị loại bỏ.

 Ví dụ:
 ```php
 $array = array(
    "css",
    "html",
    "php",
    "js"
);
$result = array_pop($array);
echo $result;
echo "<pre>";
   print_r($array);
echo "</pre>";
```

Output: 
```php
js
Array
(
    [0] => css
    [1] => html
    [2] => php
)
```

- array_push() : Được sử dụng để chèn một hoặc nhiều phần tử vào cuối mảng

 Ví dụ: 
 ```php
 $a=array("apple","banana");
 array_push($a,"mango","pineapple");
 ```
 
 Output:
 ```php
 Array (
     [0] => apple
     [1] => banana
     [2] => mango
     [3] => pineapple
 )
 ```
 
 **5. Sự khác nhau giữa array_merge() và array_combine()?**
 - array_combine(): Được sử dụng để tạo ra mảng mới bằng cách sử dụng key của 1 mảng làm keys và value của mảng khác là values.Điều quan trọng nhất kh sử dụng array_combine() là số phần tử của cả 2 mảng phải bằng nhau.Trả về False nếu số phần tử của mỗi mảng là không cân bằng với nhau hoặc nếu các mảng là trống.
 
 Ví dụ: 
 ```php
 <?php 
  $keys = ['sky', 'grass', 'orange'];
  $values = ['blue', 'green', 'orange'];
 
  $array = array_combine($keys, $values);
  print_r($array);
?> 
 ```
 
 Output: 
 ```php
 Array
(
     [sky] => blue
     [grass] => green
     [orange] => orange
 )
 ```
 
 - array_merge(): Sử dụng để nối hai hay nhiều mảng lại thành một mảng. Nếu trong các mảng truyền vào có những phần tử có cùng khóa, phần tử của mảng cuối cùng được truyền vào sẽ được chọn để nối vào mảng kết quả.
 
 Ví dụ:
 ```php
 <?php
     $array1 = array(
        "php" => "laravel",
        "css", "html"
    );
    $array2 = array(
        "python",
        "php" => "zend",
        "js" => "nodeJs"
    );
    $result = array_merge($array1, $array2);
    echo "<pre>";
        print_r($result);
    echo "</pre>";
 ?>
 ```
 
 Output:
```php
 Array
(
    [php] => zend
    [0] => css
    [1] => html
    [2] => python
    [js] => nodeJs
)
 ```
 
 **6. Làm thế nào để đếm tổng số phần tử trong mảng?**
 - Chúng ta có thể sử dụng hàm count () hoặc sizeof () để đếm tổng số phần tử trong mảng
 
 Ví dụ:
 ```php
     $array1 = array("1","4","3");

     echo count($array1);
 ```
 
 Output:  `3`
 
 **7. Sự khác nhau giữa count() và sizeof() là gì ?**
 - Khi làm việc với mảng thì hàm count() có lẽ được dùng rất là thông dùng, nhưng bên cạnh đó có một hàm nữa có chức năng tương tự, đó là hàm sizeof(). Nhưng tại sao PHP lại có hai hàm mà chức năng lại giống nhau là đếm số phần tử của mảng? Điều này cho thấy có sự khác biệt ở đâu đó chăng? Thật ra thì không có sự khác biệt mấy, hàm sizeof() là một hàm mà ta có thể gọi là một alias của hàm count() nên chức năng hoàn toàn giống nhau.Hàm count() nhanh và tốt hơn hàm sizeof().
 
 
 **8. Làm thế nào để kiểm tra 1 khóa đã tồn tại trong mảng?**
 - Để kiểm tra 1 khóa tồn tại trong mảng, chúng ta sử dụng array_key_exists()
 
 Ví dụ:
 ```php
    $item=array("name"=>"umesh","class"=>"mca");
    if (array_key_exists("name",$item))
    {
    echo "Key is exists";
    }
    else
    {
    echo "Key does not exist!";
}
 ```
 
 Output: `Key is exists`
 
 **9.  Sử dụng is_array() và in_array() như thế nào?**
 - is_array () : Đây là một hàm sẵn có được sử dụng trong PHP. Nó được sử dụng để kiểm tra xem một biến có phải là một mảng hay không.
 
 Ví dụ:
 ```php
 <?php
$yes = array('đây', 'là', 'mảng');

echo is_array($yes) ? 'Mảng' : 'Không phải mảng';
echo "\n";

$no = 'đây là chuổi';

echo is_array($no) ? 'Mảng' : 'Không phải mảng';
?>
 ```
 
 Output: 
 ```php
 Mảng
 
 Không phải mảng
```

 - in_array () : Nó được sử dụng để kiểm tra xem một giá trị đã cho có tồn tại trong một mảng hay không. Nó trả về TRUE nếu giá trị tồn tại trong mảng và trả về FALSE nếu không.
 
 Ví dụ:
 ```php
 <?php
$people = array("Peter", "Joe", "Glenn", "Cleveland");

if (in_array("Glenn", $people))
  {
  echo "Match found";
  }
else
  {
  echo "Match not found";
  }
?>
```

Output: `Match found`

**10. Các hàm sắp xếp mảng ?**
- sort () : Nó được sử dụng để sắp xếp một mảng theo thứ tự tăng dần
- rsort () : Nó được sử dụng để sắp xếp một mảng theo thứ tự giảm dần
- asort () : Nó được sử dụng để sắp xếp một mảng kết hợp theo thứ tự tăng dần, theo value
- ksort () : Nó được sử dụng để sắp xếp một mảng kết hợp theo thứ tự tăng dần, theo key
- arsort () : Nó được sử dụng để sắp xếp một mảng kết hợp theo thứ tự giảm dần, theo value
- krsort () : Nó được sử dụng để sắp xếp một mảng kết hợp theo thứ tự giảm dần, theo key

**11. Hàm implode() là gì?**
- Hàm implode() để nối các phân tử của mảng lại thành một chuỗi, hàm sẽ trả về chuỗi bao gồm các phần tử của mảng được ngăn cách bằng một kí tự nào đó được truyền vào.

Ví dụ:
```php
$array = array('My','Name','Is','Quy');

echo implode(" ",$array)

```
Output: `My Name Is Quy`

**12. Hàm explode() là gì?**
- Hàm explode() để chuyển một chuỗi thành một mảng và mỗi phần tử được cắt bởi một chuỗi con nào đó. 

Cú pháp:  
```php
array explode ( string $delimiter , string $string [, int $limit ] )
```
Trong đó: 
$delimiter: Chuỗi phân cách.

$string: Chuỗi ký tự đầu vào.

$limit: Nếu tham số $limit  được thiết lập và là số dương, hàm sẽ trả về một mảng với số lượng phần tử lớn nhất không vượt quá $limit và phân tử cuối cùng sẽ chứa phần còn lại của chuỗi $string.
            Nếu tham số $limit là một số âm, hàm sẽ trả về 1 mảng với số phần tử = (tổng số phần tử – $limit)
            Nếu tham số $limit bằng 0, thì được coi như là bằng 1.
            
Ví dụ:
```php
<?php
$str = 'one|two|three|four';
 
// Tham số duương
print_r(explode('|', $str, 2));
 
// Tham số âm
print_r(explode('|', $str, -1));
?>

```

Output: 
```php
Array
(
    [0] => one
    [1] => two|three|four
)
Array
(
    [0] => one
    [1] => two
    [2] => three
)
```

**13. Cách sử dụng array_search() ?**
- array_search () là một hàm sẵn có của PHP, được sử dụng để tìm kiếm một giá trị cụ thể trong một mảng và nếu giá trị được tìm thấy thì nó trả về khóa tương ứng của nó.

Ví dụ: 
```php
$array = array("1"=>"My", "2"=>"Name", "3"=>"is", "4"=>"Quy"); 

echo array_search("Quy",$array);
```
Output: `4`

**14. Làm thế nào để có được các phần tử theo thứ tự ngược trong mảng ?**
- Chúng ta sử dụng hàm array_reverse().

Ví dụ: 
```php
$array  = array(
    "php",
    "js",
    "css",
    "html"
);
$reversed = array_reverse($array);
print_r($reversed);
```
Output: 
```php
Array
(
    [0] => html
    [1] => css
    [2] => js
    [3] => php
)
```

**15. Làm thế nào để loại bỏ tất cả các phần tử trùng nhau trong mảng ?**
- Chúng ta sử dụng hàm array_unique() để loại bỏ tất cả các phần tử trùng nhau trong mảng.

Ví dụ: 
```php
$array = array(
    "a" => "php",
    "js",
    "b" => "python",
    "C#",
    "php"
);
$result = array_unique($array);
print_r($result);
```

Output: 
```php
Array
(
    [a] => php
    [0] => js
    [b] => python
    [1] => C#
)
```

**16. Hàm array_count_values() là gì ?**
- Đây là một trong những hàm đơn giản nhất được sử dụng để đếm tất cả các giá trị bên trong một mảng. Nói cách khác, chúng ta có thể nói rằng nó được sử dụng để tính tần số của tất cả các phần tử của một mảng.

 Ví dụ: 
 ```php
 $array = array("B","Cat","Dog","B","Dog","Dog","Cat");

print_r(array_count_values($array)); 
 ```
 
 Output: 
 ```php
 Array(
     [B] => 2
     [Cat] => 2
     [Dog] => 3 
     )
 ```
 
 **17. Sự khác nhau giữa array_keys() và array_key_exists() ?**
 - array_key_exists(): Nó được sử dụng để kiểm tra một mảng cho một khóa cụ thể và trả về TRUE nếu khóa tồn tại và FALSE nếu khóa không tồn tại.
 - array_keys():
  Cú pháp: 
 ```php
  array_keys ( $input [, $search_value [, $strict]] );
  ```
      
 Trong đó:  $input: Bắt buộc. Xác định một mảng
 
   $search_value: Bắt buộc. Bạn có thể xác định một value, thì chỉ có các key với value sẽ được trả về
                     
   $strict: Tùy ý. Được sử dụng với tham số value. Các giá trị có thể có là: true - Trả về các key với value đã xác định, phụ thuộc vào kiểu (số 5 là không giống với chuỗi "5"). false - Giá trị mặc định. Không phụ thuộc vào kiểu (số 5 là giống với chuỗi "5")
   
  Trả về các key, dạng số hoặc chuỗi, từ mảng input. Nếu tham số tùy ý search_value được xác định, thì chỉ các key với value đó sẽ được trả về. Nếu không, tất cả key từ mảng input đó sẽ được trả về.
  Ví dụ: 
  ```php
  <?php
   $a=array("a"=>"Horse","b"=>"Cat","c"=>"Dog");
   print_r(array_keys($a));
   
   $a=array("a"=>"Horse","b"=>"Cat","c"=>"Dog");
   print_r(array_keys($a,"Dog"));
   
   $a=array(10,20,30,"10");
   print_r(array_keys($a,"10",false));
?> 
```
Output: 
```php
Array(
    [0] => a
    [1] => b
    [2] => c
)

Array(
    [0] => c
)

Array(
    [0] => 0
    [1] => 3
)
```

**18. Cách sử dụng hàm array_splice() ?**
- Cú pháp : 
```php
array_splice( $input, $offset [,$length [,$replacement]] );
```
Trong đó: $input: Bắt buộc, xác định một mảng

   $offset: Bắt buộc. Giá trị số. Xác định nơi hàm bắt đầu việc gỡ bỏ phần tử. 0 = phần tử đầu tiên. Nếu giá trị này là số âm, thì hàm sẽ bắt đầu từ phần tử cuối cùng (-2 nghĩa là bắt đầu từ phần tử cuối cùng thứ hai của mảng)
                   
   $length: Tùy ý. Giá trị số. Xác định bao nhiêu phần tử bị gỡ bỏ, và nó cũng là length của mảng trả về. Nếu giá trị này là số âm, nó sẽ dừng ở phần tử cuối cùng. Nếu giá trị này không được thiết lập, nó sẽ gỡ bỏ tất cả phần tử, bắt đầu từ vị trí được xác định bởi start-parameter
       
   $replacement: Tùy ý. Xác định một mảng với các phần tử mà sẽ được chèn vào mảng nguồn. Nếu nó chỉ là một phần tử, nó có thể là một chuỗi, không phải là một mảng
   
Ví dụ: 
```php
<?php
   $input = array("red", "green", "blue", "yellow");
   array_splice($input, 2);
   print_r($input);
   print "<br>";

   $input = array("red", "green", "blue", "yellow");
   array_splice($input, 1, -1);
   print_r($input);
   print "<br>";

   $input = array("red", "green", "blue", "yellow");
   array_splice($input, 1, count($input), "orange");
   print_r($input);
   print "<br>";

   $input = array("red", "green", "blue", "yellow");
   array_splice($input, -1, 1, array("black", "maroon"));
   print_r($input);
   print "<br>";

   $input = array("red", "green", "blue", "yellow");
   array_splice($input, 3, 0, "purple");
   print_r($input);
   print "<br>";

?> 
```
Output: 
```php
Array(
    [0] => red
    [1] => green
)

Array(
    [0] => red
    [1] => yellow
)

Array(
    [0] => red
    [1] => orange
)

Array(
    [0] => red
    [1] => green
    [2] => blue
    [3] => black
    [3] => maroon
)

Array(
    [0] => red
    [1] => green
    [2] => blue
    [3] => purple
    [3] => yellow
)
```

**Tổng kết**

Trên đây mình đã liệt kê những kiến thức ôn tập về array rất hữu ích  ^^.Cảm ơn các bạn đã đọc bài của mình

**Nguồn tham khảo**

[Doc PHP](http://php.net/)

[PHP Array Interview Question](https://www.bestinterviewquestion.com/php-arrays)