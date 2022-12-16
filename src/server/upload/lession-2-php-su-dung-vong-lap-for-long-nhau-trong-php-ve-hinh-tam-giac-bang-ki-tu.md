**Ngôn ngữ lập trình C/C++, C#, Java, ... hay bất kì ngôn ngữ lập trình nào đều sử dụng vòng lặp. Vậy PHP thì sao? PHP có 4 Loops quan trọng, trong bài hôm nay tôi muốn nói về vòng lặp For.**

### 1. Vòng lặp là gì?

> **Vòng lặp** là một mã lệnh trong đó chương trình được thực hiện lặp đi lặp lại nhiều lần cho đến khi thỏa một điều kiện nào đó.


### 2. Vòng lặp for là gì?

#####  - Cú pháp:
<br>

```php
for ($bien_dieu_khien; $bieu_thuc_dieu_kien; $bieu_thuc_thay_doi_bien_dieu_khien) {
    // Lệnh
}
```
<br>
Trong đó:

- **$bien_dieu_khien** : Chứa giá trị khởi tạo trước hoặc truyền giá trị trực tiếp trong vòng lặp đều được chấp nhận. Lệnh này chỉ thực hiện một lần duy nhất.
- **$bieu_thuc_dieu_kien** : Đây là một biểu thức quan hệ xác định thời điểm nào thì thoát vòng lặp
- **$bieu_thuc_thay_doi_bien_dieu_khien** : Biểu thức này xác định rằng **$bien_dieu_khien** sẽ thay đổi như thế nào sau mỗi lần lặp.

Ví dụ: Xét một vòng lặp đơn giản sau
```php
for ($i = 0; $i < 10; $i++){
    echo $i . ' - ';
}
```

Ta thấy: 

+ Giải thích về vòng lặp trên: Biến điều khiển **$i** khởi tạo bằng 0, với điều kiện là **$i** sẽ lặp đi lặp lại số lần bé hơn 10 tức là đến lần thứ 9 thì *stop*. Và sau mỗi lần lặp thì tăng **$i** lên 1. 
+ Lệnh **echo** cho phép in ra kí tự chứa trong dấu nháy kép " " hoặc dấu nháy đơn ' '.
+ Kết quả của ví dụ trên in ra một chuỗi như sau:
**“0 – 1 – 2 – 3 – 4 – 5 – 6 – 7 – 8 – 9 – ”**.
Tức là: 
<br>
Lần lặp đầu tiên **$i = 0** , kiểm tra 0 đúng là bé hơn 10 thì tiến hành in ra số 0 và dấu gạch ngang ' - ' đầu tiên: "**0 -** "

  Tăng $i lên 1 ở lần lặp thứ 2, lúc này **$i = 1** và 1 bé hơn 10. Vậy là ở lần lặp này ta có được chuỗi: "**0 – 1 –**"
  
  Tương tự với các bước 2-3-4-5-6-7-8-9.


### 3. Vòng lặp for lồng nhau:
> Vòng lặp for trong php có thể lồng nhau để xử lý bài toán. Ở mỗi vòng lặp cha thì vòng lặp con sẽ được thực hiện, thực hiện hết nội dung bên trong vòng lặp mới thực hiện vòng tiếp theo.

Ở vòng lặp for lồng nhau bạn cần tham chiếu với ***mô hình ma trận*** để dễ hiểu hơn, 

![](https://images.viblo.asia/6d1da055-90d0-43fa-a934-0528e37b3033.JPG)

Trên đây là ma trận A, có **m hàng và n cột**, trong vòng lặp for tương ứng với hàng `m là $i`, `cột n là $j`. Hãy nắm chắc điều này để khi nhìn vào các ví dụ bên dưới bạn sẽ dễ hiểu hơn.
<br>

### 4. Ứng dụng vòng lặp for vẽ hình tam giác bằng kí tự *
#### 4.1. Tam giác vuông trái:
<br>

```php
for ($i = 1; $i <= 5; $i++) {
        for ($j = 1; $j <= $i; $j++) {
            echo "*";
        }
        echo "<br>";
    }
```

**Kết quả**: 

![](https://images.viblo.asia/93eebe51-6d77-4fea-b8f6-4b23292a8e80.PNG)

**Giải thích về vòng lặp trên**: 

Tưởng tượng đây là một ma trận, $i là số hàng và $j là số cột

![](https://images.viblo.asia/6d1da055-90d0-43fa-a934-0528e37b3033.JPG)


+ Vòng 1: Vòng lặp cha khởi tạo **hàng đầu tiên** **$i = 1**, kiểm tra 1 luôn bé hơn và bằng 5 nên chạy đến vòng lặp con bên trong là **cột đầu tiên** **$j = 1**, kiểm tra **$j lúc này bé hơn và bằng $i** => ***true*** nên in ra được dòng đầu tiên và dấu sao đầu tiên. 
    
    Tham chiếu theo hình ảnh ma trận cho ở trên, lúc này ta đã in ra được **a11**   :heart_eyes: với một sao: `*` .

+ Và đừng quên `echo "<br>";` để ngắt dòng mỗi khi xong một vòng lặp con.

+ Vòng 2: $i cộng 1, các bước kiểm tra tương tự bước 1. 

    Chiếu theo bảng ma trận, lúc này $i = 2 tức là $i đã nhảy xuống hàng 2 cột 1 tức **a21**, chạy đến vòng lặp con $j lúc này bằng 1 thỏa mãn điều kiện và in ra một " * ", $j lúc này cộng thêm 1 vẫn thỏa mãn điều kiện bé hơn và bằng $i nên in ra được **a22**  :  `* *`.

+ Vòng thứ 3, 4, 5 tương tự.

<br>

#### 4.2. Tam giác vuông phải
<br>

```php
for ($i = 1; $i <= 5; $i++) {
        for ($j = 1; $j <=  5; $j++) {
            if ($j <= 5 - $i) {
                echo "&nbsp&nbsp";
            } else {
                echo "*";
            }
        }
        echo "<br>";
    }
```


**Kết quả** :

![](https://images.viblo.asia/34dbe1ae-881a-4fa9-8341-b004a52376fb.PNG)

**Giải thích về vòng lặp trên**: 

+ Khác với tam giác vuông trái, tam giác vuông phải sau khi kiểm tra vòng lặp cha và chạy đến vòng lặp con thì cần in ra kí tự khoảng trắng đầu tiên. Trong PHP cần dùng **`&nbsp`** để in ra kí tự khoảng trắng. 
+ Vòng 1: Tham chiếu với mô hình ma trận, **hàng đầu tiên $i = 1, cột đầu tiên $j =1** thì thực hiện `if($j <= 5 - $i)`, điều kiện này kiểm soát số khoảng trắng được in ra theo mỗi lần lặp. 

  Với hàng đầu tiên, ta thấy vòng lặp con `$j <= 5` tức là $j được phân phối 5 cột, `$j = 5-1 = 4`. Vậy sẽ có **4 cột có kí tự khoảng trắng, cột còn lại sẽ là kí tự `*`** được in ra.
  
+ Và đừng quên `echo "<br>";` để ngắt dòng mỗi khi xong một vòng lặp con.
+ Vòng 2: Hàng thứ 2 là $i = 2, cột $j chạy từ 1, in ra một kí tự `*` , sau đó $j tăng lên 1 vẫn thỏa mãn điều kiện, thực hiện điều kiện `if($j <= 5 - $i)` thì lúc này `$j = 5-2 = 3`. 

   Vậy là có 3 cột có kí tự khoảng trắng, cột còn lại sẽ là 2 kí tự `* *` được in ra.
+ Vòng 3, 4, 5 tương tự.

#### 4.3. Tam giác cân:
<br>

```php
for ($i = 1; $i <= 5; $i++) {
        for ($j = $i; $j < 5; $j++) {
            echo "&nbsp&nbsp";
        }

        for ($j = 1; $j <= (2 * $i - 1); $j++) {
            echo "*";
        }

        echo "<br>";
    }

```

**Kết quả**:  

![](https://images.viblo.asia/f7c52aa0-0840-4a39-aba6-b0a07b4ad2ed.PNG)

<br>

**Giải thích về vòng lặp trên**: 

+ Vòng 1: Tiếp tục tham chiếu mô hình ma trận, vòng lặp cha hàng đầu tiên $i = 1, vòng lặp con thứ nhất cột $j = $i (Số hàng bằng số cột) sau đó in ra các kí tự khoảng trắng. 
    Đến vòng lặp con thứ 2 ta cho $j = 1, lúc này kiểm tra xem `$j <= (2 * $i - 1)` tức là `$j = (2*1-1) = 1` => true. Thực hiện chèn một kí tự `*`. 
 + Và đừng quên `echo "<br>";` để ngắt dòng mỗi khi xong một vòng lặp con.
 + Vòng 2: Hàng thứ hai $i = 2, $j = 2, thực hiện in ra kí tự khoảng trắng trước.
     Đến vòng lặp con thứ hai $j = 1 và chèn kí từ `*` trước sau đó khi $j tăng lên 2 thì chèn thêm hai kí tự sao. Vậy hàng thứ hai có 3 kí tự `*`.
     
 + Vòng 3, 4, 5 tương tự.

#### 4.4. Tam giác cân ngược
<br>

```php
$row = 5;
    for ($i = 1; $i <= $row; $i++) {
        for ($j = 1; $j < $i; $j++) {
            echo "&nbsp&nbsp";
        }

        for ($j = 1; $j <= ($row * 2 - (2 * $i - 1)); $j++) {
            echo "*";
        }

        echo "<br>";
    }
```

**Kết quả**:  

![](https://images.viblo.asia/3e118da2-3ca0-4a04-baf1-b7fdbdea0d20.PNG)

<br>

**Giải thích về vòng lặp trên**: 

+ Khởi tạo biến hàng là $row = 5.
+ Vòng 1: Hàng đầu tiên $i = 1, vào vòng lặp con đầu tiên cho $j =1 với biểu thức điều kiện là `$j < $i` thì in ra kí tự khoảng trắng.
    Vòng lặp con thứ hai cho cột $j = 1 với biểu thức điều kiện là `$j <= ($row * 2 - (2 * $i - 1))` tức là `$j = (5*2 - (2*$i -1)) = 9` => true. Thực hiện chèn chín kí tự `*`.
+ Và đừng quên `echo "<br>";` để ngắt dòng mỗi khi xong một vòng lặp con.
+ Vòng 2: Hàng thứ hai $i = 2, vào vòng lặp con đầu tiên $j = 1 và tiếp tục thực hiện in khoảng trắng.
     Vào vòng lặp con thứ hai cho cột $j = 1với biểu thức điều kiện là `$j <= ($row * 2 - (2 * $i - 1))` tức là `$j = (5*2 - (2*2 -1)) = 7` => true. Thực hiện chèn bảy kí tự `*`.
     
 + Vòng 3, 4, 5 tương tự.
 
 <br>

### 5. Code tổng quát:
<br>

```php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php

    //Tam giác vuông trái
    for ($i = 1; $i <= 5; $i++) {
        for ($j = 1; $j <= $i; $j++) {
            echo "*";
        }
        echo "<br>";
    }

    //Tam giác vuông phải
    echo "<br>";

    for ($i = 1; $i <= 5; $i++) {
        for ($j = 1; $j <=  5; $j++) {
            if ($j <= 5 - $i) {
                echo "&nbsp&nbsp";
            } else {
                echo "*";
            }
        }
        echo "<br>";
    }


    //Tam giác cân
    echo "<br>";
    for ($i = 1; $i <= 6; $i++) {
        for ($j = $i; $j < 6; $j++) {
            echo "&nbsp&nbsp";
        }

        for ($j = 1; $j <= (2 * $i - 1); $j++) {
            echo "*";
        }

        echo "<br>";
    }


    //Tam giác cân ngược
    echo "<br>";
    $row = 5;
    for ($i = 1; $i <= $row; $i++) {
        for ($j = 1; $j < $i; $j++) {
            echo "&nbsp&nbsp";
        }

        for ($j = 1; $j <= ($row * 2 - (2 * $i - 1)); $j++) {
            echo "*";
        }

        echo "<br>";
    }

    //Tam giác vuông cân góc phải
    echo "<br>";
    for ($i = 0; $i < 6; $i++) {
        for ($j = 0; $j < $i; $j++) {
            echo "&nbsp&nbsp";
        }
        for ($j = $i; $j < 6; $j++) {
            echo "&nbsp*";
        }
        echo '<br>';
    }

    //Tam giác vuông góc trái
    echo "<br>";
    for ($i = 6; $i >= 1; $i--) {
        for ($j = 1; $j <= $i; $j++) {
            echo "*&nbsp";
        }
        echo '<br>';
    }


    ?>
</body>

</html>
```


<br>

Tự mình thử để cùng nhau thành thạo nhé! :blush::blush:

Như vậy bài thứ 3 trong chuỗi bài học PHP của tôi đã hoàn thành, nếu có gì cần góp ý xin hãy cmt bên dưới nhé!


:maple_leaf:**𝔑𝔥ậ𝔱 𝔏𝔞𝔪**:maple_leaf: