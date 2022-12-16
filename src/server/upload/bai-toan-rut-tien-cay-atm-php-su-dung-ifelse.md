Bài toán rút tiền từ cây ATM
- Số tờ tiền 500k có trong ATM
- Số tờ tiền 200k có trong ATM
- Số tờ tiền 100k có trong ATM
- Số tờ tiền 50k có trong ATM

Nhập số tiền muốn rút

=> In ra số lượng các tờ tiền với các mệnh giá khác nhau

Ví dụ:
- Số tờ tiền 500k có trong ATM: 2
- Số tờ tiền 200k có trong ATM: 2
- Số tờ tiền 100k có trong ATM: 2
- Số tờ tiền 50k có trong ATM: 2

- Nhập số tiền muốn rút: 2000k => ATM ko đủ tiền
- Nhập số tiền muốn rút: 1500k => 500K - 2 tờ, 200k - 2 tờ, 100k - 1 tờ
- Nhập số tiền muốn rút: 1555k => Số tiền muốn rút phải là bội số của 50

Hướng giải bài toán : Đầu tiên chúc ta sẽ tạo một cái form với 5 dòng text 
- dòng text nhâp vào số tờ 500k mà atm có
-  dòng text nhâp vào số tờ 200k mà atm có
-  dòng text nhâp vào số tờ 100k mà atm có
-  dòng text nhâp vào số tờ 50k mà atm có
-  dòng text nhập vào số tiền bạn muốn rút

=> chúng ta sẽ tạo 2 file 1 file là index.php và 1 file là welcome.php , bên file index.php chúng ta tạo form , bn welcome chúng ta xử lý bài toán ,
- Bước 1: -lấy giá trị từ form 
- Bước 2: -kiểm tra xem nếu số tiền muốn rút lớn hơn số tiền của cây atm chúng ta sẽ báo lỗi cây atm không đủ tiền
- Bước 3: -kiểm tra xem số tiền nếu không phải là bội số của 50000 thì báo lỗi vì mệnh giá bé nhất dược rút là 50000
- Bước 4: 
  - TH1_kiểm tra xem nếu số tiền cần rút chia hết cho 500000 mênh giá lớn nhất thì sẽ thông báo rút được (số tiền cần rút /500000) tờ 500k
  - TH2_trường hợp chia không hết cho 500k thì chúng ta làm tròn xuống phép chia trên để in ra số tờ 500k ,  rồi lấy phần dư phép chia trước chia tiếp cho 200k lại ra 2 trường hợp
    - TH1_Kiểm tra phần dư kia chia hết cho 200k không  nếu chia hết thì in ra số tờ 200k bằng cách lấy phần dư chia cho 200k
    - TH2_Không chia hết ta lấy kết quả phép chia làm tròn xuống để in số tờ 200k rồi lấy phần dư sau khi chia cho 200k chia tiếp cho 100k , lại ra 2 trường hợp
      - TH1_kiểm tra phần dư kia nếu chia hết cho 100k thì in ra số tờ 100k = phần dư của phép chia 200k chia cho 100k 
      - TH2_Không chia hết ta lấy kết quả phép chia làm tròn xuống để in số tờ 100k rồi lấy phần dư sau khi chia cho 100k chia tiếp cho 50k , sau đó in ra số tờ 50k = số dư phép chia 100k chia cho 50k

**dưới đây là code và hình minh họa**

code index.php (code form)
   
```php:index.php
<!DOCTYPE html>
<html>
<head>
	<title></title>
    <style type="text/css">
        body{
            padding:0px;
            margin: 0px;
            background-color: #FF00FF;
            color: black;
            font-size: 20px;
        }
    </style>
</head>
<body>
	<h1 style="text-align: center;">Cây rút tiền ATM</h1>
	
		<form method="post" action="welcome.php">
            <pre>   
                    Nhập vào số tờ tiền 500k :<input type="text" name="nt" value=""/><br>
                    Nhập vào số tờ tiền 200k :<input type="text" name="ht" value=""/><br>
                    Nhập vào số tờ tiền 100k :<input type="text" name="mt" value=""/><br>
                    Nhập vào số tờ tiền 50k  :<input type="text" name="nm" value=""/><br>
                    Nhập vào số tiền cần rút :<input type="text" name="r" value=""/><br>
                    
                                                    <input type="submit" name="submit" value="Rút" />
            </pre>
            
        </form>
		
</body>
</html>
```
![](https://images.viblo.asia/493efa0e-14a8-4695-b6e7-a154e4515492.png)

***code welcome.php

```php:welcome.php
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<?php 
        $nt= $_POST['nt'];
        $ht= $_POST['ht'];
        $mt= $_POST['mt'];
        $nm= $_POST['nm'];
        $r = $_POST['r'];
    	$monneyAtm= $nt*500000+$ht*200000+$mt*100000+$nm*50000;
        if($r>$monneyAtm)
        {
            echo 'Cây ATM không đủ tiền!';
        }
        else if($r%50000!=0)
        {
            
            echo 'Số tiền phải là bội số của 50000';
                
        }
        else if ($r % 500000 == 0)
        {
            echo 'Số tiền rút được là: ' . $r/500000 . '  tờ 500k  ';
        }else{

            $d=$r % 500000;
            
            if($d%200000 == 0)
            {
                echo 'Số tiền rút được là: ' . floor($r/500000) . '  tờ 500k  ' . ' , ' . floor($d/200000) . '  tờ 200k  '  ;
            }

            else {

                $d1=$d%200000;

                if($d1%100000==0)
                {
                echo 'Số tiền rút được là: ' . floor($r/500000) . '  tờ 500k  ' . ' , ' . floor($d/200000) . '  tờ 200k  ' . ' , ' . floor($d1/100000) . '  tờ 100k  ';
                }
                else{
                    $d2=$d1%100000;
                    if($d2!=0)
                    {

                    echo 'Số tiền rút được là: ' . floor($r/500000) . '  tờ 500k  ' . ' , ' . floor($d/200000) . '  tờ 200k  ' . ' , ' . floor($d1/100000) . '  tờ 100k  ' . ' , '  . floor($d2/50000) . '  tờ 50k  ';
                    }   
                }
            }
        }
        
	?>
		
</body>
</html>
```

![](https://images.viblo.asia/b1c78472-d396-4426-8ade-66708b0e636b.png)