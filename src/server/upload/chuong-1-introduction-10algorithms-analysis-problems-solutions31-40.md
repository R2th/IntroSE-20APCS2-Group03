### Problem-31
Xác định giới hạn Θ cho hàm sau: $T ( n ) = T ( \lceil n / 2 \rceil ) + 7$\
Solution: Sử dụng [Master Theorem ](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov)
ta được: $\Theta ( l o g n )$

### Problem-32
Chứng minh rằng running time của đoạn code sau là $\Omega ( l o g n )$
```
	public void Read(int n) {
		int k = 1;
		while(k < n) {
			k = 3*k;
		}
	}
```

**Solution**: Vòng lặp while sẽ kết thúc khi giá trị của ‘k’ lớn hơn hoặc bằng giá trị của ‘n’. \
Trong mỗi lần lặp, giá trị của ‘k’ được nhân với 3.\
Nếu i là số lần lặp, thì ‘k’ có giá trị là 3*i sau i lần lặp.\
Vòng lặp được kết thúc khi đạt đến lần lặp thứ i khi $3 ^ { i } \geq n$ $\leftrightarrow i \geq \log _ { 3 } n$\
Điều này cho thấy $i = \Omega ( l o g n )$.

### Problem-33
Tìm độ phức tạp: 

![image.png](https://images.viblo.asia/1a099d07-2cb1-44eb-a3f0-ffe0508e92af.png)

**Solution**: Bằng cách lặp lại ta có:

$T ( n ) = T ( n - 2 ) + ( n - 1 ) ( n - 2 ) + n ( n - 1 )$\
...\
$T ( n ) = T ( 1 ) + \sum _ { i = 1 } ^ { n } i ( i - 1 )$\\

$T ( n ) = T ( 1 ) + \sum _ { i = 1 } ^ { n } i ^ { 2 } - \sum _ { i = 1 } ^ { n } i$

$T ( n ) = 1 + \frac { n ( n + 1 ) ( 2 n + 1 ) } { 6 } - \frac { n ( n + 1 ) } { 2 }$

$T ( n ) = \Theta ( n ^ { 3 } )$


Chứng minh tổng của bình phương i -> n:
![image.png](https://images.viblo.asia/b74a6bb3-1256-40b8-8f61-c58ded80e4e6.png)

Note: Chúng ta cũng có thể sử dụng [Subtraction and Conquer master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) để tìm ra đáp án.

### Problem-34
**Solution**: [Bài toán Fibonacci](https://viblo.asia/p/chuong-1-introduction-7cac-dinh-ly-chinh-ve-giai-thuat-subtract-and-conquer-recurrences-W13VM2w04Y7)

### Problem-35
Tìm độ phức tạp: 
```
	public void Funtion(int n) {
		for(int i = 1; i <= n; i++) {
			for(int j = 1; j <= n; j += i)
				System.out.println("*");
		}
	}
```
**Solution**: Xem xét đoạn code cùng với comment:
```
	public void Funtion(int n) {
        // Vòng lặp này thực thi n lần
		for(int i = 1; i <= n; i++) {
            \\Vòng lặp này thực hiện j lần với j tăng theo tốc độ của i
			for(int j = 1; j <= n; j += i)
				System.out.println("*");
		}
	}
```

Trong chương trình trên, vòng lặp bên trong thực hiện n / i lần cho mỗi giá trị của i => Running time: $( \sum _ { i = 1 } ^ { n } n / i ) ^ { - } = O ( n l o g n )$\
[Harmonic series](https://viblo.asia/p/chuong-1-introduction-5-ung-dung-trong-phan-tich-thuat-toan-r1QLxPY2LAw)

### Problem-36
Tìm độ phức tạp: $\sum _ { i = 1 } ^ { n } l o g i$\
**Solution**: Sử dụng thuộc tính logarit $l o g x y = l o g x + l o g y$, tổng trên tương đương với\
$\sum _ { i=1 } ^ { n }  log i = log1 +log2 + ... + logn = log(1*2*3*...*n) = log(n!) \leq log(n^n) \leq nlog(n)$ \
=> Time Complexity: $O ( n l o g n )$

### Problem-37
Tìm độ phức tạp: 
```
	public void Funtion(int n) {
        if(n <= 1) return;
		for(int i = 1; i <= 3; i++) {
			Funtion(n/3);
		}
	}
```
**Solution**: Xem xét comment:
```
	public void Funtion(int n) {
        //constant time
        if(n <= 1) return;
        //Vòng lặp này thực hiện với vòng lặp đệ quy có giá trị n/3
		for(int i = 1; i <= 3; i++) {
			Funtion(n/3);
		}
	}
```

Function đã cho có dạng: $T ( n ) = 3 T ( \frac { n } { 3} ) + \Theta ( 1 )$. Sử dụng [master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) , ta được $T ( n ) = \Theta ( n )$.

### Problem-38
Tìm độ phức tạp: 
```
	public void Funtion(int n) {
        if(n <= 1) return;
		for(int i = 1; i <= 3; i++) {
			Funtion(n-1);
		}
	}
```
**Solution**: Xem xét comment:
```
	public void Funtion(int n) {
        //constant time
        if(n <= 1) return;
        //Vòng lặp này thực hiện với vòng lặp đệ quy có giá trị n-1
		for(int i = 1; i <= 3; i++) {
			Funtion(n-1);
		}
	}
```

Câu lệnh if yêu cầu constant time O(1). \
Với vòng lặp for, chúng ta bỏ qua chi phí vòng lặp và chỉ đếm ba lần hàm được gọi đệ quy. Ta có công thức sau:
![image.png](https://images.viblo.asia/3527a360-5f55-4f17-af89-5a45fdcaafd9.png)

Sử dụng [Subtraction and Conquer master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov)  ta được $T ( n ) = \Theta ( 3 ^ { n } )$
 

### Problem-39
Tìm độ phức tạp: 
```
	public void Funtion(int n) {
        if(n <= 1) return;
		for(int i = 1; i <= n; i++) {
            System.out.println("*");
		}
			Funtion(0.8*n);
	}
```
**Solution**: Xem xét comment:
```
	public void Funtion(int n) {
        //constant time
        if(n <= 1) return;
        //Vòng lặp này thực thi n lần
		for(int i = 1; i <= n; i++) {
            System.out.println("*");
		}
		Funtion(0.8*n);
	}
```
Ta được công thức như sau: $T ( n ) = T ( \text 0.8 n ) { + }  O ( n ) = T ( \frac { 4 } { 5 n } )  + O ( n ) = \frac { 4 } { 5 } T ( n ) + O ( n )$
Sử dụng [master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) , ta được $T ( n ) = O( n )$

### Problem-40
Tìm độ phức tạp: $T ( n ) = 2 T ( \sqrt { n } ) + l o g n$\
**Solution**: Hàm đệ quy đã cho không ở định dạng master theorem nào. Chúng ta hãy thử chuyển nó sang dạng định lý chính bằng cách giả sử $n = 2^m$. \
Áp dụng lôgarit cả hai vế ta được: $logn = mlog2 ⇒ m = logn$\
Bây giờ, hàm đã cho trở thành:\
$T ( n ) = T ( 2 ^ { m } ) = 2 T ( \sqrt { 2 ^ { m } } ) + m = 2 T ( 2 ^ { \frac { m } { 2 } } ) + m$

Để làm cho nó đơn giản, chúng ta giả định\
$S ( m ) = T ( 2 ^ { m } ) \Rightarrow S ( \frac { m } { 2 }  ) = T ( 2 ^ { \frac { m } { 2 } } )$\
Thay vào công thức trên ta được: $S ( m ) = 2 S ( \frac { m } { 2 }  ) + m$\
Sử dụng [master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) ta có kết quả:\
$S ( m ) = O ( m l o g m )$\
Thay $m = logn$ trở lại ta được: $T ( n ) = S ( l o g n ) =O(log(n) loglogn)$