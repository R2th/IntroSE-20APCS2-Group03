##### 1. Cho bài toán rút tiền ATM như sau:
- Nhập vào số tờ tiền trong máy ATM:
    + Số tờ tiền 500k có trong ATM
    + Số tờ tiền 200k có trong ATM
    + Số tờ tiền 100k có trong ATM
    + Số tờ tiền 50k có trong ATM
 - Nhập vào số tiền muốn rút và in ra số lượng các tờ tiền với các mệnh giá khác nhau.
 - Ví dụ:
 Ví dụ:
    + Số tờ tiền 500k có trong ATM: 2
    + Số tờ tiền 200k có trong ATM: 2
    + Số tờ tiền 100k có trong ATM: 2
    + Số tờ tiền 50k có trong ATM: 2

    => Nhập số tiền muốn rút: 2000k => ATM ko đủ tiền <br>
    => Nhập số tiền muốn rút: 1500k => 500K - 2 tờ, 200k - 2 tờ, 100k - 1 tờ <br>
    => Nhập số tiền muốn rút: 1555k => Số tiền muốn rút phải là bội số của 50


##### 2. Phân tích bài toán và hướng giải:

- Nhận các giá trị nhập vào từ Input và đưa các giá trị đó vào một Array.
- Check xem ATM có đủ tiền để rút không, không đủ thì báo ATM phá sản. :satisfied::satisfied:
- Check xem số tiền cần rút có phải là bội số của 50,000 không, không phải thì báo ngân hàng không có tiền lẻ. :weary:
- Rút ra n tờ tiền có mệnh giá lớn nhất chưa được tính đến trong ATM, với **n = min(Số tiền cần rút / Mệnh giá tờ tiền lớn nhất, Số tờ có mệnh giá lớn nhất)**:

   Giả sử cần rút **1,500,000** và tờ mệnh giá lớn nhất hiện tại là 500,000 thì số tờ expect là 3. Nếu số tờ còn lại là 2 thì ta chỉ rút 2 thôi (min(3, 2)), còn nếu số tờ còn lại là 4 thì ta rút 3 (min(3, 4)).
   
   
- Sau khi thực hiện xong bước ở trên thì tính toán lại số tiền còn lại sẽ là:
 **Số tiền cần rút (mới) = Số tiền cần rút (cũ) - n * Mệnh giá tiền lớn nhất**. Nếu số tiền cần rút mà về 0 thì kết thúc quá trình rút tiền, còn không thì tiếp tục lặp lại bước rút tiền ở trên với việc mệnh giá "lớn nhất" mới được chuyển xuống mệnh giá tiếp theo.

##### 3. Code demo

***- Đầu tiên khởi tạo 1 file có tên index.php/index.html gồm form chứa input để nhập vào số tờ tiền.***
```index.php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="atm.php" method="POST">
        Nhập vào số tiền ATM đang có: <br><br>
        Số tờ 500k: <input type="number" name="500"><br><br>
        Số tờ 200k: <input type="number" name="200"><br><br>
        Số tờ 100k: <input type="number" name="100"><br><br>
        Số tờ 50k: <input type="number" name="50"><br><br>
        Nhập vào số tiền cần rút: <br><input type="text" name="input-money"><br><br>

        <input type="submit" value="Nhận tiền">
    </form>
</body>

</html>
```
<br>

***- Tạo file có tên atm.php để gọi vào xử lý form trong file index.php.***

```atm.php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    //get money input from customer - nhận số tiền mà khách hàng nhập vào và cho vào 1 mảng
    $getMoney = $_POST["input-money"];

    $moneyArr = [500000, 200000, 100000, 50000];

    //get money denominations in ATM - nhận mệnh giá tiền trong ATM và cho 1 mảng
    $atm500 = $_POST["500"];
    $atm200 = $_POST["200"];
    $atm100 = $_POST["100"];
    $atm50 = $_POST["50"];

    $atm = [$atm500, $atm200, $atm100, $atm50];

    $sum = 0;
    for ($i = 0; $i < count($moneyArr); $i++) {
        $sum += $atm[$i] * $moneyArr[$i];
    }

    if ($getMoney > $sum) {

        echo "ATM không đủ tiền!";
    } elseif ($getMoney % 50000 != 0) {

        echo "Số tiền nhập vào phải là bội số của 50.";
    } else {

        if (($getMoney % 500000 == 0) && (floor($getMoney / 500000) <= $atm500)) {

            echo "Rút tiền thành công!" .
                "<br>Số tờ 500k: " . floor($getMoney / 500000);
        } else {
            for ($i = 0; $i < count($moneyArr); $i++) {
                $atmCheck = min($getMoney / $moneyArr[$i], $atm[$i]);
                $getMoney -= $atmCheck * $moneyArr[$i];
                echo "Số tờ $moneyArr[$i]: $atmCheck <br>";
                if ($getMoney == 0) {
                    break;
                }
            }
        }
    }
    ?>
</body>

</html>
```
<br>

### Kết quả:
**1. Kiểm tra số tiền trong ATM có đáp ứng số tiền muốn rút:**
![](https://images.viblo.asia/86403e0b-f00b-46ca-9536-1c970995a565.PNG)

<br>

![](https://images.viblo.asia/93119258-d18a-44f6-93be-b3bd32cf1132.PNG)

<br>
Kết quả:

![](https://images.viblo.asia/82e434ce-2d75-463c-92f6-8e0346a07c69.PNG)


**2. Kiểm tra số tiền muốn rút có phải là bội số của 50:**

![](https://images.viblo.asia/14fbc7e7-782c-4c64-8291-407ceae71a24.PNG)

<br>
Kết quả:

![](https://images.viblo.asia/586a4bd8-93b4-419f-95cc-561c897be3fc.PNG)


**3. Nhập vào số tiền hợp lệ:**

![](https://images.viblo.asia/6954c8cf-4b51-4222-ad58-853f7e3f8b2c.PNG)

<br>
Kết quả:

![](https://images.viblo.asia/535260a3-bf3a-41be-8c67-dae8ed3e4ca3.PNG)


Chân thành cảm ơn @thangtd90 và @thangnt đã tài trợ chương trình này! :kissing_heart::kissing_heart:

:maple_leaf:**𝔑𝔥ậ𝔱 𝔏𝔞𝔪**:maple_leaf: