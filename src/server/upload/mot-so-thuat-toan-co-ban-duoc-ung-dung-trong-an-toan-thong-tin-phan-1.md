# I. Giới thiệu 
Thuật toán hay giải thuật là các phương pháp để giải quyết vấn về toán học và khoa học máy tính, một tập hợp hữu hạn các hướng dẫn được xác định rõ ràng, có thể thực hiện được bằng máy tính, thường để giải quyết một lớp vấn đề hoặc để thực hiện một phép tính.

Lập trình chính là để yêu cầu, chỉ thị máy thực hiện, giải quyết 1 công việc, bài toán cụ thể nào đó của cuộc sống. Mỗi bài toán thực tế sẽ có cách giải quyết khác nhau. Am hiểu và sử dụng đúng thuật toán, sẽ giúp bạn giải quyết một cách dễ dàng, cùng với độ chính xác cao trong thời gian ngắn nhất.

Vậy thì trong an toàn thông tin chúng ta đã/sẽ sử dụng thuật toán như thế nào để giải quyết được các vấn đề.
![](https://cdn.123job.vn/123job//uploads/images/c%C3%B4ng-ngh%E1%BB%87-th%C3%B4ng-tin-4_0.jpg)
# II. Tính toán trên trường số lớn Fp
VD: Thời gian cần thiết để phân tích số nguyên n ra thừa số nguyên tố bằng thuật toán nhanh nhất hiện nay:

| Số chữ số thập phân | Số phép tính bits | Thời gian         |
|---------------------|-------------------|-------------------|
| $50$                | $1,4.10^{10}$     | $3,9$ giờ         |
| $75$                | $9.10^{12}$       | $104$ ngày        |
| $100$               | $2,3.10^{15}$     | $74$ năm          |
| $200$               | $1,2.10^{23}$     | $3,8.10^{9}$ năm  |
| $300$               | $1,5.10^{29}$     | $4,9.10^{15}$ năm |
| $500$               | $1,3.10^{39}$     | $4,2.10^{25}$ năm |

## 1. Giải thích về trường hữu hạn
1. Trường là một tập hợp với 2 phép toán (+, .) thỏa mãn các tính chất số học thông thường:
* $(F, +)$ là nhóm Abel với phép cộng
* (F \ {0}, .) là nhóm Abel với phép nhân
* Tính phân phối: $(a + b).c = a.c + b.c  ∀a, b, c ∈ F$
2. Trường hữu hạn (còn gọi là trường Galois) là những trường có hữu hạn số phần tử, số này gọi là bậc của trường đó.
3. Các phép toán trên trường hữu hạn:
* Có thể nói là có các phép toán cộng, trừ, nhân, chia số khác 0
* Phép trừ được coi như là cộng với số đối của phép cộng $a - b = a + (-b)$
* Phép chia là nhân với số đối của phép nhân $a/b = a.b^{-1}$
* Số lượng phần tử của một trường hữu hạn được gọi là cấp hoặc bậc của nó.
* Trường hữu hạn F cấp q nếu và chỉ nếu q là lũy thừa nguyên tố pm (trong đó p là số nguyên tố, m là số nguyên dương). Nếu $m = 1$ thì F được gọi là trường nguyên tố, nếu $m ≥ 2.F$ được gọi là trường mở rộng.
* Trường nguyên tố $Fp = {0, 1, ..., p - 1}$ với các phép toán (+, .) thực hiện theo modulo p.
* VD:
- $F_{29}$ = {0, 1, 2, 3, ..., 28}
+ Phép toán cộng: $17 + 20 = 8$ vì $37 mod 29 = 8$
+ Phép trừ: $17 - 20 = 26$ vì $-3 mod 29 = 26$
+ Phép nhân: $17.20 = 214 vì $340 mod 29 = 21$
+ Phép lấy nghịch đảo: $17 - 1 = 12$ vì $17.12 mod 29 = 1$.
## 2. Phép tính cộng và trừ
* Các thuật toán cộng, trừ, nhân, chia, ... giới thiệu trong chương này phù hợp với triển khai phần mềm
* Ta giả thiết nền tảng triển khai có kiến trúc W – bit trong đó W là bội số của 8 (phổ biến là 64 – 32 bit), các hệ thống máy có công suất thấp có thể có W nhỏ hơn, VD: hệ thống nhúng W = 16 bit, thẻ thông minh W = 8 bit.
* Các bit của một W-bit là từ U được đánh số từ phải qua trái bắt đầu từ 0 đến W -1.
* Ta có $F_{p}$ = {0 ... p - 1}.
* Tính $m = [\log_{2}(p)]$ là độ dài bit của p và $t = [m \ W]$ là độ dài từ của p
* Biểu diễn của phần tử a được lưu trữ trong một mảng $A$ $=$ $(A[t – 1], ...,A[2], A[1], A[0])$ của t các từ W bit, trong đó bit ngoài cùng bên phải của $A[0]$ là bit có trọng số thấp nhất.

| $A[t - 1]$ | ... | $A[2]$ | $A[1]$ | $A[0]$ |
|------------|-----|--------|--------|--------|

* Biểu diễn $a ∈ F_{p}$ như một mảng A của các từ W-bit:
![](https://i.imgur.com/JPlG9EK.png)
VD: cho W= 8, xét $F_{2147483647}$ , hãy biểu diễn số a = 23456789 dưới dạng mảng:
```python
import math

a = 23456789
W = 8
p = 2147483647

def solve(a, W, p):
	result = []
	m = round(math.log2(p))
	t = round(m/W)
	n = [pow(2, i*W) for i in range(t)]
	for i in n[::-1]:
		result.append(math.floor(a/i))
		a = a%i
	return result

if __name__ == "__main__":
	print(solve(a, W, p))
```
Còn tiếp....