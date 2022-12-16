### 1. Giới thiệu bài toán:
Vẽ hình tam giác vuông, cân. Hiển thị lên màn hình bằng những ngôi sao.

Dùng những vòng lặp (loop) như: for, while, .....

Một số hình minh họa: 

![](https://images.viblo.asia/328169d4-09d8-4cf0-be09-5cab96ff478f.png)


### 2. Thực hiện:
a) Hình 1:

Gọi i, j là hàng và cột của hình.

Dùng 2 loop, vẽ i và j. 

i <= j, vẽ ra những *.

Code ví dụ:

```php
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>PHP</title>
</head>
<body>
	<?php
		for ($i=0; $i < 5  ; $i++) { 
			for ($j=0; $j <= $i ; $j++) { 
				echo '*';
			}
			echo '<br>';
		}

		echo '<br>';

	?>
</body>
</html>
```

b) Hình 2:
Giống như hình 1, chúng ta chọn i và j 

Dùng 2 vòng lặp (loop)

i <= j, hiển thị * và đảo ngược vị trị của hình 1

Code ví dụ: 

```php
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>PHP</title>
</head>
<body>
	<?php

		for ($i=5; $i > 0 ; $i--) { 
			for ($j=0; $j < $i ; $j++) { 
				echo '*';
			}
			echo '<br>';
		}

		echo '<br>';

	?>
</body>
</html>
```