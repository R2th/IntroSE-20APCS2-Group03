Các hàm toán học có thể xử lý các giá trị trong phạm vi các kiểu số nguyên và số thực.
## 1. Danh sách các hàm toán học
|Hàm	|Mô tả|
|---|---|
|abs()|	Trả về giá trị tuyệt đối (dương) của một số|
|acos()|Trả về cung cosin của một số
|acosh()|Trả về hyperbol cosin nghịch đảo của một số
|asin()|	Trả về cung cosin của một số
|asinh()|	Trả về hyperbol cosin nghịch đảo của một số
|atan()|	Trả về tiếp tuyến cung của một số tính bằng radian
|atan2()|	Trả về tiếp tuyến cung của hai biến x và y
|atanh()|	Trả về tiếp tuyến hyperbol nghịch đảo của một số
|base_convert()|	Chuyển đổi kiểu base một số
|bindec()|	Chuyển đổi số nhị phân thành số thập phân
|ceil()|	Làm tròn số lên tới số nguyên gần nhất
|cos()|	Trả về cosin của một số
|cosh()	|Trả về hyperbol cosin của một số
|decbin()|	Chuyển đổi một số thập phân thành một số nhị phân (binary number)
|dechex()|	Chuyển đổi số thập phân thành số thập lục phân (hexadecimal number)
|decoct()|	Chuyển đổi một số thập phân thành một số bát phân
|deg2rad()|	Chuyển đổi giá trị độ thành giá trị radian
|exp()| Tính số mũ của e
|expm1()|	Trả về exp(x) - 1
|floor()|	Làm tròn một số xuống số nguyên gần nhất
|fmod()|	Trả về số dư của x/y
|getrandmax()|	Trả về giá trị lớn nhất có thể được trả về bởi rand()
|hexdec()|	Chuyển đổi số thập lục phân thành số thập phân
|hypot()|	Tính cạnh huyền của một tam giác góc vuông
|is_finite()|	Kiểm tra xem một giá trị có hữu hạn hay không
|is_infinite()|	Kiểm tra xem một giá trị là vô hạn hay không
|is_nan()|	 Kiểm tra xem một giá trị có phải là 'không phải là số' không
|lcg_value()|	 Trả về số giả ngẫu nhiên trong phạm vi từ 0 đến 1
|log()|	Trả về logarit tự nhiên của một số
|log10()|	Trả về logarit cơ số 10 của một số
|log1p()|	Trả về log(1+number)
|max()|	Trả về giá trị cao nhất trong một mảng hoặc giá trị cao nhất của một số giá trị được chỉ định
|min()|Trả về giá trị thấp nhất trong một mảng hoặc giá trị thấp nhất của một số giá trị được chỉ định
|mt_getrandmax()|	 Trả về giá trị lớn nhất có thể được trả về bởi mt_rand()
|mt_rand()| Tạo một số nguyên ngẫu nhiên bằng thuật toán Mersenne Twister
|mt_srand()| Seeds tạo số ngẫu nhiên bằng thuật toán Mersenne Twister
|octdec()|	Chuyển đổi một số bát phân thành một số thập phân
|pi()	|Trả về giá trị PI
|pow()	|Trả về x tăng lên power của y
|rad2deg()	|Chuyển đổi giá trị radian thành giá trị độ
|rand()	|Tạo một số nguyên ngẫu nhiên
|round()	|Làm tròn số dấu phẩy động
|sin()|	Trả về cosin của một số
|sinh()|	Trả về hyperbol cosin của một số
|sqrt()	|Trả về căn bậc hai của một số
|srand()| Seeds trình tạo số ngẫu nhiên
|tan()|	Trả về tiếp tuyến của một số
|tanh()|	Trả về tiếp tuyến hyperbol của một số|

## 2. Cú pháp và ví dụ
### 2.1. abs()
Cú pháp:
```php
abs(number);
```
VD:
```php
<?php
echo abs(6.7); // 6.7
echo abs(-6.7); // 6.7
echo abs(-3); // 3
echo abs(3); // 3
?>
```
### 2.2. acos()
Cú pháp:
```php
acos(number);
```
Chú thích:
- number: Là số trong phạm vi từ -1 đến 1
- acos (-1) trả về giá trị của Pi.

VD:
```php
<?php
echo acos(0.64); // 0.87629806116834
echo acos(-0.4); // 1.9823131728624
echo acos(0); //1.5707963267949
echo acos(-1); // 3.1415926535898
echo acos(1); // 0
echo acos(2); // NAN
?>
```
### 2.3. acosh()
Cú pháp:
```php
acosh(number);
```
VD:
```php
<?php
echo acosh(7);2.6339157938496
echo acosh(56); //4.7184191423729
echo acosh(2.45); //1.5447131178707
?>
```
### 2.4. asin()
Cú pháp:
```php
asin(number);
```
Chú thích:
- number: trong khoảng -1 đến 1
- asin(1) trả về giá trị của Pi/2.

VD:
```php
<?php
echo asin(0.64); // 0.69449826562656
echo asin(-0.4); // -0.41151684606749
echo asin(0); // 0
echo asin(-1); // -1.5707963267949
echo asin(1); // 1.5707963267949
echo asin(2); // NAN
?>
```
### 2.5. asinh()

Cú pháp:
```php
asinh(number);
```
VD:
```php
<?php
echo asinh(7); //2.6441207610586
echo asinh(56) ; //4.7185785811518
echo asinh(2.45); //1.6284998192842
?>
```
### 2.6. atan()
Cú pháp:
```php
atan(arg);
```
VD:
```php
<?php
echo atan(0.5);//0.46364760900081
echo atan(-0.5);//-0.46364760900081
echo atan(5);//1.373400766945
echo atan(-5);//-1.373400766945
echo atan(100);//1.5607966601082
echo atan(-100);//-1.5607966601082
?>
```
### 2.7. atan2()
Cú pháp:
```php
atan2(y,x);
```

Chú thích:
- y: số phải chia
- x: ước số

VD:
```php
<?php
echo atan2(0.50,0.50);//0.78539816339745
echo atan2(-0.50,-0.50);//-2.3561944901923
echo atan2(5,5);//0.78539816339745
echo atan2(10,20);//0.46364760900081
echo atan2(-5,-5);//-2.3561944901923
echo atan2(-10,10); //-0.78539816339745
?>
```
### 2.8. atanh()
Cú pháp:
```php
atanh(number);
```
Chú thích:
- number: số chỉ định

VD:
```php
<?php
echo atanh(M_PI_4); //1.0593061708232
echo atanh(0.50); //0.54930614433405
echo atanh(-0.50); //-0.54930614433405
echo atanh(1); //INF
echo atanh(-1); //-INF
?>
```
### 2.9. base_convert()
Cú pháp:
```php
base_convert(number, frombase, tobase);
```
Chú thích: 
- **number**: số cần chuyển đổi
- **frombase**: Chỉ định cơ sở ban đầu của số. Phải từ 2 đến 36, bao gồm: các chữ số trong số có số cơ sở cao hơn 10 sẽ được biểu thị bằng các chữ cái a-z, với ý nghĩa 10, b có nghĩa là 11 và z có nghĩa là 35
- **tobase**: Chỉ định cơ sở để chuyển đổi sang. Phải từ 2 đến 36, bao gồm: các chữ số trong số có số cơ sở cao hơn 10 sẽ được biểu thị bằng các chữ cái a-z, với ý nghĩa 10, b có nghĩa là 11 và z có nghĩa là 35

VD:
```php
<?php
$hex = "E196"; 
echo base_convert($hex,16,8); //160626
?>
```
### 2.10. bindec()
Cú pháp:
```php
bindec(binary_string);
```
Chú thích:
- **binary_string**: Chuỗi nhị phân để chuyển đổi.
(Giá trị tham số phải là một chuỗi)

VD:
```php
<?php
echo bindec("0011"); // 3
echo bindec("01"); // 1
echo bindec("11000110011"); // 1587
echo bindec("111"); // 7
?>
```
### 2.11. ceil()
Cú pháp:
```php
ceil(number);
```

Chú thích:
- number: Giá trị cần làm tròn

VD:
```php
<?php
echo ceil(0.60);//1
echo ceil(0.40); // 1
echo ceil(5); // 5
echo ceil(5.1); // 6
echo ceil(-5.1); //-5
echo ceil(-5.9); //-5
?>
```
### 2.12. cos()
Cú pháp:
```php
cos(number);
```
Chú thích:
- number: Số cần tính cosin
- Hàm cos () trả về một giá trị số nằm giữa -1 và 1, đại diện cho cosin của góc.

VD:
```php
<?php
echo cos(3);//-0.98999249660045
echo cos(-3);//-0.98999249660045
echo cos(0);//1
echo cos(M_PI);//-1
echo cos(2*M_PI);//1
?>
```
### 2.13. cosh()
Cú pháp:
```php
cosh(number);
```
VD:
```php
<?php
echo cosh(3); // 10.067661995778
echo cosh(-3); // 10.067661995778
echo cosh(0); // 1
echo cosh(M_PI); // 11.591953275522
echo cosh(2*M_PI); // 267.74676148375
?>
```
### 2.14. decbin()
Cú pháp:
```php
decbin(number);
```
VD:
```php
<?php
echo decbin("3"); // 11
echo decbin("1"); // 1
echo decbin("1587"); // 11000110011
echo decbin("7"); // 111
?>
```
### 2.15. dechex()
Cú pháp:
```php
dechex(number);
```
VD:
```php
<?php
echo dechex("30"); //1e
echo dechex("10"); //a
echo dechex("1587"); //633
echo dechex("70"); //46
?>
```
### 2.16. decoct()
Cú pháp:
```php
decoct(number);
```
Chú thích:
- number: Giá trị thập phân cần chuyển đổi

VD:
```php
<?php
echo decoct("30"); // 36
echo decoct("10"); //12
echo decoct("1587"); //3063
echo decoct("70"); //106 
?>
```

(Continue... )

Source: https://www.w3schools.com/php/php_ref_math.asp