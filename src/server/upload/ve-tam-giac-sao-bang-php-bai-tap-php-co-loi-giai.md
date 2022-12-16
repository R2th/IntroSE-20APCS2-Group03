# Tam giác đều
![](https://images.viblo.asia/fbd02299-032a-4394-b5fa-8fc71768fd14.png)

```php
<?php

$h = 20;
$p = 0;
$n = 0;
$s = 0;


for ($i = 1; $i <= $h; $i += 2) {
    $s = $i; // vong lap thu i thi co i sao duoc hien thi
    $n = floor(($h - $s) / 2);
    for ($j = 0; $j < $n; $j++) {
        if ($j % 2 == 1) {
            echo "&nbsp;";
        }
        echo "&nbsp;&nbsp;";
    }

    for ($j = 0; $j < $i; $j++) {


        echo "&nbsp;*";

    }

    echo '</br>';
}
?>
```

# Tam giác vuông cân
## Kiểu thứ nhất
![](https://images.viblo.asia/8efdc1da-c18a-42e3-9eda-0930338c0011.png)
```php
<?php
$kq = '';
for ($i = 5; $i > 0; $i--) {
    for ($j = 0; $j < $i; $j++) {
        $kq .= '*';
    }
    $kq .= '</br>';
}
echo $kq;
?>
```

## kiểu thứ 2
![](https://images.viblo.asia/752c616e-01ea-4163-bb40-1d9ab90062b2.png)

```php
<?php
$kq = '';
for ($i = 0; $i < 5; $i++) {
    for ($j = 0; $j <= $i; $j++) {
        $kq .= '*';
    }
    $kq .= '<br>';
}
echo $kq;
?>
```