## 1. Yêu cầu
In các hình như bên dưới, sử dụng Loop trong PHP:

![](https://images.viblo.asia/b5646c32-e07e-423a-bbde-bfe65f1a01c4.JPG)

## 2. Giải bài toán
### 2.1. Code PHP để in ra hình dạng 1

```
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                line-height: 40px;
                letter-spacing: 10px;
            }
        </style>
    </head>
    <body>
        <?php
        for($i = 0; $i <= 5; $i ++) {
            for($j = (5 - $i); $j < 5; $j ++) {
                echo "*";
            }
            echo "<br>";
        }
        ?>
    </body>
</html>
```

### 2.2. Code PHP để in ra hình dạng 2

```
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                text-align: right;
                line-height: 40px;
                letter-spacing: 10px;
            }
        </style>
    </head>
    <body>
        <?php
        for($i = 0; $i <= 5; $i ++) {
            for($j = (5 - $i); $j < 5; $j ++) {
                echo "*";
            }
            echo "<br>";
        }
        ?>
    </body>
</html>
```

### 2.3. Code PHP để in ra hình dạng 3

```
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                text-align: center  ;
                line-height: 40px;
                letter-spacing: 10px;
            }
        </style>
    </head>
    <body>
        <?php
        for($i = 1; $i <= 9; $i= $i+2) {
            for($j = (5 - $i); $j < 5; $j ++) {
                echo "*";
            }
            echo "<br>";
        }
        ?>
    </body>
</html>
```

### 2.4. Code PHP để in ra hình dạng 4

```
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                line-height: 40px;
                letter-spacing: 10px;
            }
        </style>
    </head>
    <body>
        <?php
        for($i = 0; $i <= 5; $i ++) {
            for($j = ($i); $j < 5; $j ++) {
                echo "*";
            }
            echo "<br>";
        }
        ?>
    </body>
</html>
```

### 2.5. Code PHP để in ra hình dạng 5

```
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                text-align: right;
                line-height: 40px;
                letter-spacing: 10px;
            }
        </style>
    </head>
    <body>
        <?php
        for($i = 0; $i <= 5; $i ++) {
            for($j = ($i); $j < 5; $j ++) {
                echo "*";
            }
            echo "<br>";
        }
        ?>
    </body>
</html>
```

### 2.6. Code PHP để in ra hình dạng 6

```
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                text-align: center  ;
                line-height: 40px;
                letter-spacing: 10px;
            }
        </style>
    </head>
    <body>
        <?php
        for($i = 1; $i <= 9; $i= $i+2) {
            for($j = ($i); $j <= 9; $j ++) {
                echo "*";
            }
            echo "<br>";
        }
        ?>
    </body>
</html>
```