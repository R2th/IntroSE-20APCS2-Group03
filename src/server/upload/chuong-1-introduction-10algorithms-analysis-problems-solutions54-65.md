### Problem-54
```
	public int isPrime(int n) {
		for(int i=2; i <= Math.sqrt(n); i++) {
			if(n%i == 0) {
				System.out.println("Not Prime");
				return 0;
			}
		}
		return 1;
	}
```
Cho function sau, ý nào sau đây là đúng:
1. $T ( n ) = O ( \sqrt { n } )$ và $T ( n ) = \Omega ( \sqrt { n } )$
2.  $T ( n ) = O ( \sqrt { n } )$ và $T ( n ) = \Omega ( 1 )$
3.  $T ( n ) = O ({ n } )$ và $T ( n ) = \Omega ( \sqrt { n } )$
4.  Không đáp án nào ở trên

**Solution**: Ký hiệu Big O mô tả giới hạn trên chặt chẽ và ký hiệu Big Omega mô tả giới hạn dưới chặt chẽ cho một thuật toán.\
Vòng lặp for trong câu hỏi được chạy tối đa $\sqrt { n }$ lần và tối thiểu 1 lần. Vì vậy, $T ( n ) = O ( \sqrt { n } )$ và $T ( n ) = \Omega ( 1 )$

### Problem-55
```
	public int gcd(int n, int m) {
		if(n%m == 0) return m;
		n = n%m;
		return gcd(m,n);
	}
```
Cho đoạn code sau với n >=m, tìm độ phức tạp của bài toán.
1. $\Theta ( l o g _ { 2 } ^ { n } )$
2. $\Omega ( n )$
3. $\Theta ( l o g _ { 2 } l o g _ { 2 } ^ { n } )$
4. $\Theta ( n )$

**Solution**: Không có lựa chọn nào là chính xác.\
Giả sử m = 2 và với mọi n = 2 i, thời gian chạy là O (1), điều này mâu thuẫn với mọi lựa chọn.

### Problem-56
Giả sử $T(n) = 2T(n/2) + n, T(0)=T(1)=1$. Lựa chọn nào dưới đây là sai
1. $T ( n ) = O ( n ^ { 2 } )$
2. $T ( n ) = \Theta ( n log n )$
3. $T ( n ) = \Omega ( n ^ { 2 } )$
4. $T ( n ) = O ( n log n )$

**Solution**:
Ký hiệu Big O mô tả giới hạn trên chặt chẽ và ký hiệu Big Omega mô tả giới hạn dưới chặt chẽ cho một thuật toán.\
Dựa vào [master theorem ](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov), ta có 
$T ( n ) = \Theta ( n log n )$. Nó đồng nghĩa với Big O và Big Omega là như nhau, (2) và (4) đúng.


### Problem-57
Tìm độ phức tạp:
```
	public void function(int n) {
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < i*i; j++) {
				if(j%i == 0) {
					for(int k = 0; k < j; k++) {
						System.out.println("*");
					}
				}
			}
		}
	}
```
**Solution**:
Xem xét comment:
```
	public void function(int n) {
		for (int i = 0; i < n; i++) { //Vòng lặp này thực thi n lần
			for (int j = 0; j < i*i; j++) { //Vòng lặp này thực thi n*n lần
				if(j%i == 0) {
					for(int k = 0; k < j; k++) {//Vòng lặp này thực thi j=n*n lần
						System.out.println("*");
					}
				}
			}
		}
	}
```
Time Complexity: $O(n^5)$.

Đây là solution mà tác giả giải thích trong sách, mình thấy có vẻ chưa chuẩn lắm, mình sẽ giải thích lại theo ý mình hiểu(Mọi người nếu thấy mình giải thích chưa đúng comment giúp để mình sửa lại nhé):
```
	public void function(int n) {
		for (int i = 0; i < n; i++) { //Vòng lặp này thực thi n lần
			for (int j = 0; j < i*i; j++) { //Vòng lặp này thực thi i*i lần
				if(j%i == 0) {
					for(int k = 0; k < j; k++) {//Vòng lặp này thực thi j=i*i lần
						System.out.println("*");
					}
				}
			}
		}
	}
```
Vậy ta có $T ( n ) = \sum _ { i = 1 } ^ { n } i^4$. [Áp dụng công thức cuối cùng trong bài này](https://viblo.asia/p/chuong-1-introduction-5-ung-dung-trong-phan-tich-thuat-toan-r1QLxPY2LAw), ta được $T(n) = (1/(4 + 1)) * n^5 = O(n^5)$

### Problem-58
Để tính toán $9^n$, hãy đưa ra một thuật toán và thảo luận về độ phức tạp của nó.

**Solution**:\
Bắt đầu với 1 và nhân với 9 cho đến khi đạt $9^n$.\
Time Complexity: Có **n-1** phép nhân và mỗi phép nhân cần thời gian không đổi để thực thi => $Θ(n)$

### Problem-59
Đối với Bài toán-58, chúng ta có thể cải thiện độ phức tạp về thời gian không?

**Solution**: Có, chi tiết mình sẽ trình ở chương Divide and Conquer.

### Problem-60
Tìm độ phức tạp
```
	public void function(int n) {
		int sum = 0;
		for(int i = 0; i < n; i++) {
			if(i > j) {
				sum += 1;
			} else {
				for(int k = 0; k < n; k++) {
					sum -= 1;
				}
			}
		}
	}
```
**Solution**:\
Xem xét trường hợp tệ nhất worst-case
```
	public void function(int n) {
		int sum = 0;
		for(int i = 0; i < n; i++) { //Vòng lặp này thực thi n lần
			if(i > j) {
				sum += 1;   //Lệnh này thực thi n lần
			} else {
				for(int k = 0; k < n; k++) {//Vòng lặp này thực thi n lần
					sum -= 1;
				}
			}
		}
	}
```
Time Complexity: Trường hợp tệ nhất vòng lặp luôn vào else => $O(n^2)$

### Problem-61
Giải quan hệ lặp lại sau bằng phương pháp cây đệ quy: $T ( n ) = T ( \frac { n } { 2 } ) + T ( \frac { 2 n } { 3 } ) + n ^ { 2 }$

**Solution**: Câu hỏi đặt ra là: chúng ta thực hiện bao nhiêu công việc trong mỗi cấp của cây đệ quy?
![image.png](https://images.viblo.asia/4e77833f-4fc0-429d-8087-d0e5d7f59573.png)

Ở mức 0, chúng ta mất $n^2$ lần.

Ở mức 1, chia thành 2 vấn đề con cần: $\left ( \frac { 1 } { 2 } n \right ) ^ { 2 } + \left ( \frac { 2 } { 3 } n \right ) ^ { 2 } = \left ( \frac { 1 } { 4 } + \frac { 4 } { 9 } \right ) n ^ { 2 } = \left ( \frac { 2 5 } { 36 } \right ) n ^ { 2 }$

Ở mức 2, chia thành 4 vấn đề con với zize $\frac { 1 } { 2 }$$\frac { n } { 2 }$, $\frac { 2 } { 3 }$$\frac { n } { 2 }$, $\frac { 1 } { 2 }$$\frac { 2n } { 3 }$ và $\frac { 2 } { 3 }$$\frac { 2n } { 3 }$, 2 vấn đề con cần: 

$\left ( \frac { 1 } { 4 } n \right ) ^ { 2 } + \left ( \frac { 1 } { 3 } n \right ) ^ { 2 } + \left ( \frac { 1 } { 3 } \right )n  ^ { 2 } + \left ( \frac { 4 } { 9 }  \right ) n^ { 2 } = \left ( \frac { 625 } { 1296 } \right ) n ^ { 2 } = \left ( \frac { 2 5 } { 36 } \right )^2 n ^ { 2 }$

Tương tự khối lượng công việc ở cấp độ k tối đa là $(\frac { 2 5 } { 36 }) ^k n ^ { 2 }$

Đặt $\alpha = \frac { 2 5 } { 3 6 }$, tổng runtime cần là:

$T ( n ) \leq \sum _ { k = 0 } ^ { \infty } \alpha ^ { k } n ^ { 2 }$

$= \frac { 1 } { 1 - \alpha } n ^ { 2 }$

$= \frac { 1 } { 1 - \frac { 2 5 } { 3 6 } } n ^ { 2 }$

$= \frac { 1 } { \frac { 1 1 } { 3 6 } } n ^ { 2 }$

$= \frac { 3 6 } { 1 1 } n ^ { 2 }$

$= O ( n ^ { 2 } )$

### Problem-62
Tìm độ phức tạp: $T ( n ) = T ( \frac { n } { 2 } ) + T ( \frac { n } { 4 } ) + T ( \frac { n } { 8 } ) + n$

**Solution**: \
Chúng ta thử giải quyết vấn đề bằng phương pháp guessing. Ta thấy tổng kích thước trên mỗi level lặp lại đều nhỏ hơn n, vậy ta đoán rằng $f(n) = n$ sẽ chiếm ưu thế.\
Giả sử với mọi i < n thì $c _ { 1 } n \leq T ( i ) \leq c _ { 2 } n$, ta được:

$c _ { 1 } \frac { n } { 2 } + c _ { 4 } \frac { n } { 4 } + c _ { 1 } \frac { n } { 8 } + kn \leq T ( n ) \leq c _ { 2 } \frac { n } { 2 } + c _ { 2 } \frac { n } { 4 } + k n$

$<=>c _ { 1 } n ( \frac { 1 } { 2 } + \frac { 1 } { 4 } + \frac { 1 } { 8 } + \frac { k } { c1 } ) + \leq T ( n ) \leq c _ { 2 } n ( \frac { 1 } { 2 } + \frac { 1 } { 4 } + \frac { 1 } { 8 } + \frac { k } { c2 } )$

$<=>c _ { 1 } n ( \frac { 7 } { 8 } + \frac { k } { c _ { 1 } } ) \quad \leq T ( n ) \quad \leq \quad c _ { 2 } n ( \frac { 7 } { 8 } + \frac { k } { c _ { 2 } } )$

Nếu $c1 \geq 8k$ và $c2 \leq 8k$ thì $c _ { 1 } n = T(n) =c _ { 2 } n$, như vậy $T(n) = Θ(n)$.\

Kết luận: nếu ta có nhiều lệnh gọi đệ quy, tổng các đối số của các lệnh gọi đó nhỏ hơn n(trong trường hợp này $\frac { n } { 2 } + \frac { n } { 4 } + \frac { n } { 8 } < n$), và f(n) đủ lớn thì một dự đoán tốt là $T(n) = Θ(n)$.

### Problem-63
Xếp hạng các chức năng sau theo thứ tự rate of growth:
![image.png](https://images.viblo.asia/46015210-8aca-46ca-b255-b97ad1689657.png)

**Solution**:

![image.png](https://images.viblo.asia/b11e2839-16c0-462e-9883-5aef0c5b6cf3.png)

### Problem-64
Ta có thể nói $3 ^ { n ^ { 0 . 7 5 } } = O ( 3 ^ { n } )$ ?

**Solution**: Yes, bởi vì $3 ^ { n ^ { 0 . 7 5 } } < 3 ^ { n ^ { 1 } }$

### Problem-65
Ta có thể nói  $2 ^ { 3 n } = O ( 2 ^ { n } )$ ?

**Solution**: Không, bởi vì $2 ^ { 3 n } = ( 2 ^ { 3 } ) ^ { n } = 8 ^ { n }$ không nhỏ hơn $2^n$.

### Kết chương 1
Cảm ơn mọi người đã đọc tới đây, vậy là mình đã trình bày xong toàn bộ lý thuyết và bài tập của chương 1. Chương này khá khó và sử dụng nhiều kiến thức toán, bắt đầu từ chương sau sẽ đi vào các bài toán cụ thể và sẽ được áp dụng code nhiều hơn 😁😁😁