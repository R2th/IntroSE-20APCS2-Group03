### [MEMO] Một số hàm khá hữu ích khi làm việc với Array trong PHP 
![](https://images.viblo.asia/2a3b9a68-07a5-4e3d-a504-0a704849a4b4.jpg)

Gần đây, mình có làm một dự án PHP. 
Và mình cảm thấy Array của PHP khá thú vị, cảm giác nó rất flexible và PHP cũng support rất nhiều hàm để làm việc với Array thực sự rất mạnh mẽ. 
Bài viết này mình xin memo lại những hàm đó. Mục đích chính là memo, sau quên có thể xem lại.  
Còn bạn, nếu thấy function nào hay thì comment chỉ thêm cho mình với nhé.  
Let's go! 

### 1. array_unique()
Hàm này có nhiệm vụ loại bỏ những phẩn tử bị trùng lặp và trả về 1 mảng chứa các phần tử unique

```PHP
<?php
$arr = [
    "red",
    "green",
    "red"
];

print_r(array_unique($a));
```
Output: 
```
$arr = [
    "red",
    "green",
];
```

### 2. array_column()
Nhiệm vụ: pick up (nhặt ra ) các giá trị của một array_key từ một nested array và trả về một array mới.
```PHP
$records = array(
    array(
        'id' => 2135,
        'first_name' => 'John',
        'last_name' => 'Doe',
    ),
    array(
        'id' => 3245,
        'first_name' => 'Sally',
        'last_name' => 'Smith',
    ),
    array(
        'id' => 5342,
        'first_name' => 'Jane',
        'last_name' => 'Jones',
    ),
    array(
        'id' => 5623,
        'first_name' => 'Peter',
        'last_name' => 'Doe',
    )
);
 
$first_names = array_column($records, 'first_name');
print_r($first_names);
```

Output:
```
Array
(
    [0] => John
    [1] => Sally
    [2] => Jane
    [3] => Peter
)
```

### 3. array_flip()
Nhiệm vụ: đảo ngược vị trí của key và value trong mảng.
Giá trị nó trả về là 1 Array bị đảo ngược vị trí giữa key và value.

```PHP
$input = array("oranges", "apples", "pears");
$flipped = array_flip($input);

print_r($flipped);
```
Output:
```
Array
(
    [oranges] => 0
    [apples] => 1
    [pears] => 2
)
```

### 4.array_diff ($array1, $array2)
Nhiệm vụ: tìm ra những phần tử có trong array1 mà không có trong các array còn lại.

```
$array1 = array("a" => "green", "red", "blue", "red");
$array2 = array("b" => "green", "yellow", "red");
$result = array_diff($array1, $array2);

print_r($result);
```
Output: 

```
Array
(
    [1] => blue
)
```

### 5. array_reverse()
Nhiệm vụ: đảo ngược array
```PHP
$input  = array("php", 4.0, array("green", "red"));
$reversed = array_reverse($input);

print_r($reversed);
```
Output: 

```
Array
(
    [0] => Array
        (
            [0] => green
            [1] => red
        )

    [1] => 4
    [2] => php
)
```

Còn rất nhiều hàm hay ho khác, các bạn có thể tham khả thêm [tại đây](https://www.php.net/manual/en/function.array-reverse.php)
À, cú pháp khai báo array mình đang dùng cú pháp cũ, do copy từ php.net và lười sửa.  :joy:  
Các bạn hoàn toàn có thể sử dụng cú pháp mới là dấu "[]" nhé.  
Thân ái!