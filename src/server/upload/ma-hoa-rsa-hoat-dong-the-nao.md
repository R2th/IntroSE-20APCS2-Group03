Bài viết giải thích chi tiết việc RSA hoạt động như thế nào. Các kiến thức trong bài nếu có phần nào tối nghĩa hãy comment để mình giải thích rõ hơn.
# Cơ sở lý thuyết
RSA xoay quanh các phép toán modulo, nên để mở đầu hãy bắt đầu với các phép toán cơ bản.
## Đồng dư
Ta viết:
$$
a\equiv b{\pmod {n}}
$$
Nghĩa là a đồng dư với b trong modulo n. Hay nói cơ bản a%n = b%n (% là phép chia lấy phần dư). Ví dụ:
$$
11\equiv 2{\pmod {3}}
$$
$$
11\equiv 8{\pmod {3}}
$$
$$
11\equiv -1{\pmod {3}}
$$
## Các phép toán.
Ta dễ dàng thấy được 1 số phép toán sau đây:
```ruby
(a + b) % m == (a % m + b % m) % m
(7 + 8) % 3 == (7 % 3 + 8 % 3) % 3
```
```ruby
(a * b) % m == (a % m * b % m) % m
(7 * 8) % 3 == (7 % 3 * 8 % 3) % 3
```
```ruby
(a - b) % m == (a % m - b % m + m) % m
(7 - 8) % 3 == (7 % 3 - 8 % 3 + 3) % 3
```
## Lũy thừa
Mấy cái kia dễ rồi nhỉ, Giờ đến phép lũy thừa. Dễ thấy:
$$
a^b\%m = ((a \% m)*a \% m)*a \% m....)\%m
$$
Đại loại là nhân từng lần a vào rồi mod m luôn thôi. Đây là cách tính cơ bản. Nhưng nếu b lớn tới cả trăm chữ số thì sao. Ta dựa vào 1 tính chất như sau:
```ruby
(a ^ b) % m = (a ^ (b/2) % m * a ^ (b/2) % m) * (b % 2 == 0 ? 1 : a) % m 
```
Đại loại là cứ chia đôi b ra, nếu b lẻ thì nhân thêm 1 lần a nữa vào. Ta dễ thấy bài toán cơ bản khi b = 1 thi kết quả là a % n. Từ đó ta có thể code như sau:
```ruby
def pow a, b, m
  return a % m if b == 1
  t = pow a, b/2, m
  return t * t % m if b.even?
  t * t * a % m
end
```
## Nghịch đảo
Phép toàn này hơi loằng ngoằng tí. Đại loại ta có:
```ruby
a * b % m = 1
```
Thì ta nói b là nghịch đảo của a trong modulo m, hay b = a^-1. Ví dụ:
```ruby
7 * 3 = 21 % 10 = 1
=> 7 = 3^-1 (mod 10)
```
Vấn đề là nếu cho 1 số và số modulo thì tính số nghịch đảo làm sao.
Cách đơn giản nhất là dùng thuật toán eclipse mở rộng.

[https://vi.wikipedia.org/wiki/Gi%E1%BA%A3i_thu%E1%BA%ADt_Euclid_m%E1%BB%9F_r%E1%BB%99ng](https://vi.wikipedia.org/wiki/Gi%E1%BA%A3i_thu%E1%BA%ADt_Euclid_m%E1%BB%9F_r%E1%BB%99ng)

Đơn giản thì nó sẽ tuân theo thuật toán như sau:

```pascal
Procedure Euclid_Extended (a,m)
int,  y0=0,y1:=1;

While a>0 do {
     r:= m mod a 
     if r=0 then Break      
     q:= m div a
     y:= y0-y1*q
     y0:=y1     
     y1:=y
     m:=a
     a:=r
     
  }
 If a>1 Then Return "A không khả nghịch theo mođun m" 
 else Return " Nghịch đảo modulo m của a là y"
```
Chỉ là thuật toán tìm ước chung lớn nhất kèm theo 1 vài phép tính nữa thôi. Vẫn khó hiểu nhỉ, Giờ vẽ cái bảng thế này nhé. thử tính 30^-1(mod 101) nhé.

| Bước | m | a | r = m % a | q = m / a | y0 | y1 | y = y0-y1*q |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
|0|101|30|11|3|0|1|-3|
|1|30|11|8|2|1|-3|7|	
|2|11|8|3|1|-3|7|-10|
|3|8|3|2|2|7|-10|27|
|4|3|2|1|1|-10|27|-37|
|5|2|1|0||

Qua đó ta thấy -37 là nghịch đảo của 30 trong modulo 101. Nhưng -37 âm nên cộng 101 vào ta đc 64
``` ruby
64 * 30 = 1920 % 101 = 1
```
# RSA
Nào giờ đến phần chính rsa. 
Ý tưởng cơ bản của rsa là tìm ra 1 cặp d*e sao cho:
```ruby
m^(d*e) = m (mod n)
```
Nếu n đủ lớn thì việc tìm được 1 cặp d*e như vậy tốn rất nhiều thời gian. Vì sao à, thử xem thuật toán rsa từ đầu nhé.
## Sinh khóa
- Bước 1: chọn 2 nguyên tố p và q lớn và tính n = p * q. Vậy khi n lớn, ta không thể tìm cặp p q nhanh chóng được, và vì p q đều nguyên tố nên n sẽ chỉ có các ước là  p và q (và 1 và n, dĩ nhiên rồi). Nên việc tìm cặp p q này sẽ chỉ có thể thực hiện bằng việc duyệt tất cả các số từ 1 đến n, và vì n rất lớn nên duyệt đến mùa quýt.

- Bước 2: Tính phi(n) = (p-1) * (q-1). Phi(n) là phi hàm Euler, được định nghĩa là số lượng số nguyên tố cùng nhau với n. Phi(n) có một số tính chất, bạn có thể đọc thêm ở đây. [https://vnoi.info/wiki/translate/he/Number-Theory-4.md](https://vnoi.info/wiki/translate/he/Number-Theory-4.md)

- Bước 3: Chọn 1 số e nguyên tố cùng nhau với phi(n) và nhỏ hơn n.

- Bước 4: Tính d = e^-1 (mod phi(n))

Nào tính tử nhé.
```ruby
n = p * q = 61 * 53 = 3233
phi(n) = 60 * 52 = 3120
e = 17
d = e^-1 = 2753
```
Từ đó dễ thấy là không có phi(n) thì không tính được d dựa vào e và n. Nhưng nếu muốn tính phi thì phải biết p và q. Và duyệt để tìm thì đến lúc nào...

Rồi ta có private key là n và d, public key là n và e.

##  Mã hóa và giải mã
### Mã hóa.
Mã hóa số 123 đi nhé:
```ruby
123^17 mod 3233 = 855
```
Rồi giờ gửi số 855 đi.
### Giải mã
```ruby
885^2753 mod 3223 = 123
```
Đấy đơn giản thế thôi.
# Kết.
Vì không quen với cách viết công thức toán nên mình viết bằng code. Hơi khó hiểu nhỉ. Giờ còn 1 vấn đề nữa phải lo, đó là làm sao chọn được 2 số nguyên tố lớn để làm p và q. Như bộ thư viện số lớn của java sử dụng miller-rabin, nhưng còn một thuật toán tốt hơn của mấy anh Ấn Độ là AKS [https://en.wikipedia.org/wiki/AKS_primality_test](https://en.wikipedia.org/wiki/AKS_primality_test)