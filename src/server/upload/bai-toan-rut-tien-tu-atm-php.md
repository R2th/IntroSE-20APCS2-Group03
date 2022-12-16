### 1. Bài toán 
Bài toán rút tiền từ cây ATM

- Số tờ tiền 500k có trong ATM
    
    Số tờ tiền 200k có trong ATM

    Số tờ tiền 100k có trong ATM
    
    Số tờ tiền 50k có trong ATM

    Nhập số tiền muốn rút

=> In ra số lượng các tờ tiền với các mệnh giá khác nhau
### 2. Phân tích bài toán
Chúng ta cần nhập số tiền cần rút

Nhập số lượng mỗi mệnh giá theo từng trường hợp 

Bước 1)

Kiểm tra só tiền nhập vào có là bội số của 50,000

Bước 2)

Kiểm tra ATM đủ tiền để rút số tiền vừa nhập

Bước 3)

Tính số lượng tờ tiền theo từng mệnh giá

### 3. Code ví dụ

Tạo file Show.php để tạo giao diện 

```PHP
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Money</title>
	<link rel="stylesheet" type="text/css" href="">
</head>
<body>
	<h1>Rut tien</h1>
	<form action="Set.php" method="GET">
		So tien can rut: <input type="text" name="money"> <br>
		So to 500k: <input type="text" name="500k"> <br>
		So to 200k: <input type="text" name="200k"> <br>
		So to 100k: <input type="text" name="100k"> <br>
		So to 50k: <input type="text" name="50k"> <br>


		<input type="submit" value="getMoney">
		
	</form>
</body>
</html>
```
Từ file show.php, chúng ta kết hợp với file Set.php để thực hiện tính
```PHP
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>PHP</title>
</head>
<body>
	<?php
		$money = $_GET['money'];
		$a = $_GET['500k'];
		$b = $_GET['200k'];
		$c = $_GET['100k'];
		$d = $_GET['50k'];

		$listMoneyAtm = [$a, $b, $c, $d];

		$listMoney = [500000, 200000, 100000, 50000];

		$sum = 0;
		for ($i=0; $i < count($listMoney) ; $i++) { 
			$sum += $listMoney[$i] * $listMoneyAtm[$i];
		}

		if ($money % 50000 != 0) {
			echo 'Số tiền muốn rút phải là bội số của 50.000 !!';
		}
		if ($money > $sum) {
			echo 'ATM không đủ số tiền';
		}
		if ($money % 50000 == 0 && $money < $sum) {
			for ($i=0; $i < count($listMoney); $i++) { 
				$numberMoney = min(floor($money / $listMoney[$i]), $listMoneyAtm[$i]);
				$money -= $numberMoney * $listMoney[$i];
				echo 'Số tờ ' . $listMoney[$i] . ': ' . $numberMoney . '<br>' ;
			}
		}
	?>
	
</body>
</html>
```

Thank you mọi người....