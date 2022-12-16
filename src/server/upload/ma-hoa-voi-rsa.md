# Giới thiệu
Là 1 lập trình viên, có lẽ ít nhiều chúng ta cũng đã sử dụng mã hóa rsa, như dùng Git chẳng hạn, với câu lệnh huyền thoại: `ssh-keygen -t rsa`. Dòng lệnh này sẽ sinh ra 2 key là public_key và private_key. Copy public_key dán vào gitHub, thế là ta đã có thể clone code về, commit code,... Vậy 2 cái key kia là gì, RSA là gì, hãy cùng mình tìm hiểu sơ lược trong bài viết này. <br>
# Vấn đề đặt ra
Mã hóa là phương thức đã được sử dụng lâu đời để chuyển dữ liệu từ dạng này sang dạng khác mà chỉ những người có key mới có thể giải mã. Phương thức truyền thống được sử dụng là mã hóa đối xứng. Mã hóa đối xứng sử dụng 1 key duy nhất trong quá trình mã hóa và giải mã. Tuy nhiên, phương thức mã hóa đối xứng lại có 1 số hạn chế như sau:
* Key phải gửi cho tất cả những người cần mà hóa dữ liệu, vì vậy có chứa các nguy cơ về bảo mật
* Không thể thiết lập được chữ ký điện tử
* Cần kênh để chia sẻ khóa bảo mật giữa các bên
* Khó ứng dụng trong các hệ thống mở
* Không thể dùng cho mục đích xác thực<br>

Và mã hóa bất đối xứng được sinh ra để giải quyết các vấn đề trên. mã hóa bất đối xứng sẽ sinh ra 1 cặp key là public_key và private_key. Giả sử ta có 1 gói tin M cần gửi giữa 2 người dùng A và B. B sẽ dùng public_key của A (được công khai) để mã hóa gói tin, sau đó gửi cho A. A sẽ dùng chính private_key của mình để giải mã gói tin. Qua đó sẽ khắc phục được các nhược điểm kể trên. Trong bài này mình sẽ đề cập đến mã hóa rsa.
# Nguyên tắc hệ mật mã khóa công khai
* Dựa trên nguyên tắc xây dựng hàm 1 chiều
* Đối với mọi x tính y = f(x) 1 cách dễ dàng
* Khi biết y sẽ rất khó tính lại được x
* Xần hàm 1 chiều đặc biệt để sao cho biết được **nó** ta có thể tính lại nghịch đảo f dễ dàng
# Thiết kế hệ mật mã RSA
Hệ mật mã rsa có f(x) là hàm mũ và mod (chia lấy phần dư), được thiết kế dựa trên bài toán phân tích 1 số thành tích 2 thừa số nguyên tố. <br>
## Tạo khóa
* Chọn p và q là 2 số nguyên tố ngẫu nhiên khác nhau
* Tính n = p*q
* Tính Ɵ(n) = (p-1) * (q-1) (Ɵ(n) là giá trị hàm số Euler)
* Chọn 1 số tự nhiên e sao cho 1 < e < Ɵ(n) và là số nguyên tố cùng nhau với Ɵ(n). (2 số gọi là nguyên tố cùng nhau nếu ước chung lớn nhất = 1)
* Tìm 1 số d sao cho d * e đồng dư 1 khi mod Ɵ(n) <br>

Tới đây, ta đã có khóa công khai là (e,n), khóa riêng là (d,p,q)
Ta có gói tin M được mã hóa bằng khóa công khai:
```
(M ^ e) mod (n) = c
```
và sẽ được giải mã bằng khóa riêng:
```
(c ^ d) mod (n) = M
```
Đơn giản đến bất ngờ đúng không ^^.
Để dễ hiểu hơn, ta có 1 ví dụ sau: <br>
Gói tin cần mã hóa là 2 <br>
* Chọn p và q là 2 số nguyên tố: p = 11, q = 13
* n = p * q = 11 * 13 = 143
* Ɵ(n) = (p-1) * (q-1) = 10 * 12 = 120
* Chọn ngẫu nhiên số e = 37 (37 với 120 có UCLN = 1)
* Nhẩm ra số d = 13 vì 13 * 37 = 481 mod 120 = 1. Nếu không nhẩm được thì ta dùng [thuật toán Eulid mở rộng](https://vi.wikipedia.org/wiki/Gi%E1%BA%A3i_thu%E1%BA%ADt_Euclid_m%E1%BB%9F_r%E1%BB%99ng) <br>

---> Khóa công khai (37, 143) <br>
---> Khóa riêng (13, 11, 13) <br>
Mã hóa: 
```
(2 ^ 37) mod 143 = 106
```
Giải mã:
```
(106 ^ 13) mod 143 = 2
```
## Chứng minh tính đúng đắn
1 ví dụ không nói lên được điều gì, mình sẽ chứng minh tính đúng đắn của cách mã hóa trên <br>
Bài toán : Có  `c = m ^ e mod n` và `r = c ^ d mod n`. Chứng minh r = m. <br>
Thay `c = m ^ e mod n` vào `r = c ^ d mod n`, ta có: <br>
(1) `r = m ^ (e * d) mod n` <br>
Mà `e * d` là nguyên tố cùng nhau với Ɵ(n) nên ta có `e * d = 1 + k * Ɵ(n)`. Thay vào (1) ta có: <br>
`r = m * m ^ (k * Ɵ(n)) mod n` <br>
mà `Ɵ(n) = (p-1) * (q-1)` nên <br>
(2) `r = m * m ^ ((p-1) * (q-1) * k) mod n` <br>
Áp dụng định lý Fermat nhỏ:  <br>
> Nếu p là số nguyên tố và a là số nguyên không chia hết cho p, thì  a^{p-1}-1 sẽ chia hết cho p <br>


Thì
```
m ^ ( p -1) = 1 (mod p)
m ^ ( q -1) = 1 (mod q)
-> m ^ ( p -1) (q-1) = 1( mod p*q)
```
Thay vào (2) thì chỉ còn lại  `r = m * 1 = m`(đpcm)
Done~
# Độ phức tạp khi phá mã
Độ phức tạp khi phá mã rsa chính là độ phức tạp khi phân tích 1 số thành 2 số nguyên tố. Thuật toán hiệu quả nhất hiên nay là dùng sáng trường số. <br>
Giả sử nấu chạy trên siêu máy tính có tốc độ 1.000.000.000.000.000 phép tính 1s  thì thời gian phân tích sẽ là 

| Số chữ số thập phân  | Số chữ  số nhị phân | Thời gian |
| -------- | -------- | -------- |
| 225     | 747     | 0.1 năm     |
| 300     | 1000     | 100 năm     |
| 350     | 1162     | 10 000 000 năm    |
| 600     | 2000     | 100 000 000 000 năm   |
# So sánh tốc độ
So sánh với DES thì RSA: ​

+ Có tốc độ chậm hơn rất nhiều. Thường thì RSA chậm ít nhất 100 lần khi cài đặt bằng phần mềm và có thể chậm hơn từ 1000 đến 10000 lần khi cài đặt bằng phần cứng (còn tùy cách cài đặt). 

+ Kích thước của khóa mật lớn hơn rất nhiều.
# Lời kết
Trên đây mình đã giúp các bạn tìm hiểu sơ lược về mà hóa công khai, tiêu biểu là rsa. Bài viết còn sơ sài và không tránh khỏi sai xót, mong được góp ý từ các bạn <br>
Happy coding.