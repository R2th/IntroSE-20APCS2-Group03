# I.  Giới thiệu:
* Một bài toán thực tế là bạn cần quản lý một lớp học nào đó mà danh sách tên hoặc điểm số của các học sinh được sắp xếp không theo một thứ tự nào đó khiến cho bạn rất khó để quản lý chính vì vậy bài toán sắp xếp sẽ giúp chúng ta dễ dàng hơn trong việc quản lý một công việc gì đó.
* Sắp xếp là một trong những bài toán thực tế phổ biến nhất trong lập trình, nó giúp chúng ta sắp xếp một danh sách hoặc một mảng theo một thứ tự nào đó(thường là tăng dần hoặc giảm dần).
# II. Một số thuật toán hay gặp:
## 1. Thuật toán sắp xếp nổi bọt (Bubble Sort):
### Phân tích bài toán

Giả sử cần sắp xếp dãy 5 3 2 7 theo thứ tự tăng dần.


* vòng lặp 1:

[5 3 2 7] -> [3 5 2 7] , so sánh 5 và 3 thấy 3 nhỏ hơn 5 -> đổi chỗ 3 và 5.

[3 5 2 7] -> [3 2 5 7] , so sánh 5 và 2 thấy 2 nhỏ hơn 5 -> đổi chỗ 2 và 5.

[ 3 2 5 7] -> [3 2 5 7], 5 < 7 đúng -> không có gì thay đổi

-> kết thúc vòng lặp 1 ta được [3 2 5 7]

* vòng lặp 2:

[3 2 5 7] ->[2 3 5 7] , so sánh 3 và 2 thấy 2 nhỏ hơn 3 -> đổi chỗ 2 và 3.

[2 3 5 7] ->[2 3 5 7]], 3 < 5 đúng -> không có gì thay đổi.

[2 3 5 7] -> [2 3 5 7] , 5 < 7 đúng -> không có gì thay đổi.

Đến đây ta thu được dãy đã sắp xếp nhưng thuật toán chưa dừng ở đó mà nó tiếp tục lặp.

* vòng lặp 3:

[2 3 5 7] -> [2 3 5 7]

[2 3 5 7] -> [2 3 5 7]

[2 3 5 7] -> [2 3 5 7]

### Độ phức tạp thuật toán:

Trường hợp tốt nhất: O(n)

Trường hợp xấu nhất: O(n*n)
```
<?php
    function bubbleSort($array)  
	{  
		do  
		{  
			$swapped = false;  
			for($i = 0, $c = count($array) - 1; $i < $c; $i++)  
			{  
				if( $array[$i] > $array[$i + 1] )  
				{  
					list($array[$i + 1], $array[$i]) =  array($array[$i], $array[$i + 1]);  
					$swapped = true;  
				}  
			}  
		}  
		while($swapped);  
		
	return $array;  
	}  
	   
	$array = [3, 0, 2, 5, -1, 4, 1];  
	echo "Mảng ban đầu:<br>";  
	echo implode(', ' , $array );  
	echo "<br>Mảng đã qua sắp xếp:<br>";  
	echo implode(', ' , bubbleSort($array)) . PHP_EOL;
?>
```
## 2. Thuật toán sắp xếp chọn (Selection Sort):
### Phân tích bài toán:
Giả sử cần sắp xếp dãy 5 7 3 2 theo thứ tự tăng dần.
* Vòng lặp 1:

[5 7 3 2] -> [2 7 3 5] , tìm được 2 là số nhỏ nhất ta đổi vị trí 2 cho 5
-> kết thúc vòng lặp 1 ta được [2 7 3 5]
* Vòng lặp 2:

[2 7 3 5] -> [2 3 7 5], tìm 3 là số nhỏ nhất trong dãy ta đổi chỗ 3 cho 7

-> kết thúc vòng lặp 2 ta được [2 3 7 5]

* Vòng lặp 3:

[2 3 7 5] -> [2 3 5 7], tìm được 5 là số nhỏ nhất trong dãy ta đổi chỗ 5 cho 7

-> kết thúc vòng lặp 3 ta được [2 3 5 7]

Vòng lặp 3 cũng là vòng lặp cuối cùng vì dãy chỉ còn 1 phần tử thì n chắc chắn là lớn nhất, vậy ta đã thu được một dãy tăng dần với thuật toán sắp xếp chọn.

### Độ phức tạp thuật toán:

Trường hợp tốt nhất: O(n*n)

Trường hợp xấu nhất: O(n*n)
```
<?php
	function selectionSort($array)
	{
	    $number = count($array);
	    for ($i = 0; $i < $number - 1; $i++)
	    {
	        $max = $i;
	        for ($j = $i + 1; $j < $number; $j++){
	            if ($array[$j] > $array[$max]){
	                $max = $j;
	            }
	        }

	        $temp = $array[$i];
	        $array[$i] = $array[$max];
	        $array[$max] = $temp;
	    }

	    return $array;
	}

	$arrayTest = [3, 0, 2, 5, -1, 4, 1];  
	echo "Mảng ban đầu: <br>";  
	echo implode(', ' , $arrayTest );  
	echo "<br>Mảng đã qua sắp xếp:<br>";  
	echo implode(', ' , selectionSort($arrayTest));
 ?>
```
## 3. Thuật toán sắp xếp chèn (Insertion Sort):
### Phân tích bài toán:
Giả sử cần sắp xếp dãy 5 1 3 4 6 8 theo thứ tự tăng dần.
* Vòng lặp 1:

 Lấy phần tử thứ hai là số 1 gán vào đúng vị trí trong dãy 5
-> kết thúc vòng lặp 1 ta được [1 5 3 4 6 8]
* Vòng lặp 2:

Lấy phần tử thứ ba là số 3 gán vào đúng vị trí trong dãy [1 5]

-> kết thúc vòng lặp 2 ta được [1 3 5 4 6 8]

* Vòng lặp 3:

Lấy phần tử thứ tư là số 4 gán vào đúng vị trí trong dãy [1 3 5]

-> kết thúc vòng lặp 3 ta được [1 3 4 5 6 8]

Tương tự với các vòng lặp sau ta được kết quả:  [1 3 4 5 6 8]

### Độ phức tạp thuật toán:

Trường hợp tốt nhất: O(n*n)

Trường hợp xấu nhất: O(n*n)
```
<?php
    function insertionSort($array)  
        {  
            for($i = 0; $i < count($array); $i++){  
                $val = $array[$i];  
                $j = $i - 1;  
                while($j >= 0 && $array[$j] > $val){  
                    $array[$j + 1] = $array[$j];  
                    $j--;  
                }  

                $array[$j + 1] = $val;  
            }  

            return $array;  
        }  

    $arrayTest = array(3, 0, 2, 5, -1, 4, 1);  
    echo "Mảng ban đầu:<br>";  
    echo implode(', ' , $arrayTest );  
    echo "<br>Mảng đã qua sắp xếp:<br>";  
    echo implode(', ' , insertionSort($arrayTest));
?>
```

## 3. Thuật toán sắp xếp nhanh (Quick Sort):
### Phân tích bài toán:
Đặt pivot là phần tử cuối cùng của dãy số arr. Chúng ta bắt đầu từ phần tử trái nhất của dãy số có chỉ số là left, và phần tử phải nhất của dãy số có chỉ số là right -1(bỏ qua phần tử pivot). Chừng nào left < right mà arr[left] > pivot và arr[right] < pivot thì đổi chỗ hai phần tử left và right. Sau cùng, ta đổi chỗ hai phần tử left và pivot cho nhau. Xem hình minh họa phía dưới. Khi đó, phần tử left đã đứng đúng vị trí và chia dãy số làm đôi(bên trái và bên phải)
Trong ví dụ sau đây, chúng ta có mảng 6 số: 50, 23, 9, 18, 61, 32
Chọn pivot là số cuối cùng có giá trị 32.
* Vòng lặp 1:
So sánh số bên trái đầu tiên là 50 > 23(số bên phải) và 50 >  32 (pivot). => Đổi vị trí 50 với 23.
* Vòng lặp 2:
So sánh tiếp tục 50  > 9  (số bên phải) và 50 > 32 (pivot) => Đổi vị trí 50 với 9
* Vòng lặp 3:
So sánh tiếp tục 50 > 18  (số bên phải) và 50 > 32 (pivot) => Đổi vị trí 50 với 18
* Vòng lặp 4: 
So sánh tiếp tục 50 < 61  (số bên phải) và 50 > 32 (pivot) => Giữ nguyên vị trí 50
* Vòng lặp 5: 
So sánh tiếp tục 50 < 32  (số bên phải) và 50 > 32 (pivot) => Đổi ví trí 50 với 32.
Vậy sau bước này chúng ta có 2 mảng lớn hơn 32 và nhỏ hơn 32. Tiếp tục làm lại như vậy với 2 mảng.
```
<?php
    function quickSort($array)  
    {  
        $left = $right = [];  
        if(count($array) < 2)  
        {  
            return $array;  
        }  
        $pivot_key = key($array);  
        $pivot = array_shift($array);  
        foreach($array as $value)  
        {  
            if($value <= $pivot)  
            {  
                $left[] = $value;  
            } elseif ($value > $pivot)  
            {  
                $right[] = $value;  
            }  
        }  
        return array_merge(quickSort($left), array($pivot_key => $pivot), quickSort($right));  
    }  
        
    $arrayTest = [3, 0, 2, 5, -1, 4, 1];  
    echo 'Mảng ban đầu: ' . implode(', ' , $arrayTest) . '<br>';  
    $arrayTest = quickSort($arrayTest);  
    echo 'Mảng sau khi được sắp xếp: ' . implode(', ' , $arrayTest);
?>
```

![](https://images.viblo.asia/f73c1fdc-1dd0-4590-ac0d-7fb1cc7d14fc.png)

Source: https://giaphiep.com/blog/mot-so-thuat-toan-sap-xep-co-ban-quick-sort-co-phai-la-thuat-toan-sap-xep-nhanh-nhat-350

https://www.geeksforgeeks.org/quick-sort/

### Bài viết sau mình sẽ nói rõ hơn về độ phức tạp thuật toán của các giải thuật nhé!
###