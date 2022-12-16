# Viết chương trình in ra hình tam giác sao.
Hướng giải quyết:
- Nhập vào số dòng in ra sao
- Sử dụng vòng lặp loop để in ra được các hình tam giác khác nhau

**Nhập vào số dòng**

```

<!DOCTYPE html>
<html>
<body>

<form action="testsao.php" method=POST>
Nhập vào số dòng: <input type="number" name="soDong"><br />
<input type="submit">
</form>


</body>
</html>
```

**Code demo**
### Tam giác vuông đơn giản

![](https://images.viblo.asia/fbe996e8-da3f-4440-98d5-be93c118fdb7.PNG)

```
<?php
    $n= $_POST["soDong"];
    //Tam giac vuông đơn giản
    for($i=0; $i<$n; $i++) {
        for($j=0; $j<$i; $j++) {
            echo "*";
        }
        echo "<br>";
    }
?>
```




### Tam giác vuông ngược

![](https://images.viblo.asia/4644fb2d-d8f3-4be5-8f45-50f05dec133f.PNG)

```
<?php
    $n= $_POST["soDong"];
    //Tam giac vuông ngược
    for ($i=0; $i<=$n; $i++) {
        for ($j=$n; $j>$i; $j--) {
            echo '*'; 
        }
        echo '<br>';
    }
?>
```


### Tam giác đều

![](https://images.viblo.asia/639715c7-bfe2-48ec-b7f2-38a0e8a8b3e0.PNG)

```
<?php
    $n= $_POST["soDong"];
    //Tam giác đều
    for ($i=0; $i<=$n; $i++){
        for ($j=$n; $j>$i; $j--) { 
            echo '&nbsp; &nbsp;'; 
        } 
        for ($k=0; $k<$i; $k++) { 
            echo '*&nbsp; &nbsp;'; 
        } 
        echo '<br>';
    }

?>
```