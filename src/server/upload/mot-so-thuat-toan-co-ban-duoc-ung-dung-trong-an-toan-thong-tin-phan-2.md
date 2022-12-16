Phần 1: https://viblo.asia/p/mot-so-thuat-toan-co-ban-duoc-ung-dung-trong-an-toan-thong-tin-phan-1-Ljy5VvRk5ra
### a. Thuật toán cộng chính xác bội
* Thuật toán cộng và trừ trên trường hữu hạn được đưa ra dưới dạng các thuật toán tương ứng cho các số nguyên w. Phép gán dạng "(ɛ, z) ← w" được định nghĩa như sau:

1. z ← W mod $2^{W}$ và ε ← 0 nếu w ∈ \[0, $2^{W}$), ngược lại ε ← 1.
2. Nếu w = x + y + ε' với x, y ∈ \[0, $2^{W}$) và ε ∈ {0, 1} , thì w = ε $2^{W}$ + z và ε được gọi là “bit nhớ” (carry bit) cho phép cộng mỗi một từ đơn (ε = 1 nếu và chỉ nếu z < x + ε' )

VD: Cho a = (0, 11, 173, 248); b = (0, 1, 226, 64), với w = 8, t = 4. Tìm c = a + b mod $2^{Wt}$

```python
a = [0, 11, 173, 248]
b = [0, 1, 226, 64]
W = 8
t = 4

def solve(a, b, W, t):
	a.reverse()
	b.reverse()
	c = []
	epsilon = 0
	e = pow(2, 8)
	for i in range(t):
		s = a[i] + b[i] + epsilon
		x = s%e
		if(s > e): epsilon = 1
		else: epsilon = 0 
		c.append(x)
	return [epsilon, c[::-1]]
	
if __name__ == '__main__':
	print(solve(a, b, W, t))
```

### b. Thuật toán trừ chính xác bội
VD: Cho a = (0, 11, 173, 248); b = (0, 1, 226, 64), với w = 8, t = 4. tìm c = a - b mod $2^{Wt}$

```python
a = [0, 11, 173, 248]
b = [0, 1, 226, 64]
W = 8
t = 4

def solve(a, b, W, t):
	a.reverse()
	b.reverse()
	c = []
	epsilon = 0
	e = pow(2, 8)
	for i in range(t):
		d = a[i] - b[i] - epsilon
		if(d < 0): 
			d += e
			epsilon = 1
		else: epsilon = 0
		x = d%e
		c.append(x)
	return epsilon, c[::-1]

if __name__ == '__main__':
	print(solve(a, b, W, t))
```

### c. Thuật toán cộng trên $F_{p}$
Cho p = 2.147.483.647, W = 8; ta có m = $[\log_{2}(p)]$ = 31; t = \[m/W] = 4. a = (0, 11, 173, 248); b = (0, 1, 226, 64).  3 Tìm c = a + b mod p
```python
import math, re

p = 2147483647
a = [157, 0, 173, 23]
b = [169, 1, 0, 64]
W = 8
m = round(math.log2(p))
t = round(m/W)

def int_to_dec(n):
	n = bin(n)[2:].zfill(8*t)
	b = re.findall('\d{8}', n)
	c = ['0b' + i for i in b]
	return [int(i, 2) for i in c]

def dec_to_int(n):
	n = ''.join([bin(i)[2:].zfill(8) for i in n])
	return int(n, 2)


def multiprecision_addition(a, b, W, t):
	a.reverse()
	b.reverse()
	c = []
	epsilon = 0
	e = pow(2, 8)
	for i in range(t):
		s = a[i] + b[i] + epsilon
		x = s%e
		if(s > e): epsilon = 1
		else: epsilon = 0 
		c.append(x)
	return [epsilon, c[::-1]]

def multiprecision_subtraction(a, b, W, t):
	a.reverse()
	b.reverse()
	c = []
	epsilon = 0
	e = pow(2, 8)
	for i in range(t):
		d = a[i] - b[i] - epsilon
		if(d < 0): 
			d += e
			epsilon = 1
		else: epsilon = 0
		x = d%e
		c.append(x)
	return epsilon, c[::-1]

if __name__ == '__main__':
	[epsilon, c] = multiprecision_addition(a, b, W, t)
	p = int_to_dec(p)
	if epsilon == 1:
		d = multiprecision_subtraction(c, p, W, t)
	elif epsilon == 0:
		d = multiprecision_subtraction(p, c, W, t)
	print(d)	
```
### d. Thuật toán trừ trên $F_{p}$
Cho p = 2.147.483.647, W = 8; ta có m = $[\log_{2}(p)]$ = 31; t = \[m/W] = 4. a = (0, 11, 173, 248); b = (0, 1, 226, 64).  3 Tìm c = a - b mod p
```python
import math, re

p = 2147483647
a = [0, 11, 173, 248]
b = [0, 1, 226, 64]
W = 8
m = round(math.log2(p))
t = round(m/W)

def int_to_dec(n):
	n = bin(n)[2:].zfill(8*t)
	b = re.findall('\d{8}', n)
	c = ['0b' + i for i in b]
	return [int(i, 2) for i in c]

def dec_to_int(n):
	n = ''.join([bin(i)[2:].zfill(8) for i in n])
	return int(n, 2)

def multiprecision_addition(a, b, W, t):
	a.reverse()
	b.reverse()
	c = []
	epsilon = 0
	e = pow(2, 8)
	for i in range(t):
		s = a[i] + b[i] + epsilon
		x = s%e
		if(s > e): epsilon = 1
		else: epsilon = 0 
		c.append(x)
	return [epsilon, c[::-1]]

def multiprecision_subtraction(a, b, W, t):
	a.reverse()
	b.reverse()
	c = []
	epsilon = 0
	e = pow(2, 8)
	for i in range(t):
		d = a[i] - b[i] - epsilon
		if(d < 0): 
			d += e
			epsilon = 1
		else: epsilon = 0
		x = d%e
		c.append(x)
	return epsilon, c[::-1]

if __name__ == '__main__':
	[epsilon, c] = multiprecision_subtraction(a, b, W, t)
	p = int_to_dec(p)
	if epsilon == 1:
		d = multiprecision_addition(c, p, W, t)
	elif epsilon == 0:
		d = c
	print(d)	
```
Còn tiếp....