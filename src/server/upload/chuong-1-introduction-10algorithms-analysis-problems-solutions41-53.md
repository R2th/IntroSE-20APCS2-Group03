### Problem-41
Tìm độ phức tạp của hàm đệ quy: $T ( n ) = T ( \sqrt { n } ) + 1$\
**Solution:**
Áp dụng logic của Problem-40 ta được: \
$S ( m ) = S ( \frac { m } { 2 } ) + 1$\
Sử dụng [master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) ta có kết quả:\
$S ( m ) = O ( l o g m )$\
Thay m = logn trở lại ta được: $T ( n ) = S ( l o g n ) =O(loglogn)$

### Problem-42
Tìm độ phức tạp của hàm đệ quy: $T ( n ) = 2T ( \sqrt { n } ) + 1$\
**Solution:**
Áp dụng logic của Problem-40 ta được: \
$S ( m ) = 2S ( \frac { m } { 2 } ) + 1$\
Sử dụng [master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) ta có kết quả:\
$S ( m ) = O ( m ^ { l o g _ { 2 } ^ { 2 } } ) = O ( m )$\
Thay m = logn trở lại ta được: $T ( n ) =O(logn)$

### Problem-43
Tìm độ phức tạp của hàm đệ quy:
```
    public static int function(int n){
        if(n <= 2) return 1;
        else return (function((int) Math.floor(Math.sqrt(n))) + 1);
    }
```
**Solution:**
Xem xét comments 
```
    public static int function(int n){
        if(n <= 2) return 1; //constant time
        else return (function((int) Math.floor(Math.sqrt(n))) + 1); //execute sqrt(n) + 1 lần
    }
```
Ta có thể xác định T(n) như sau: \
$T ( n ) = T ( \sqrt { n } ) + 1$\
Bài toán này giống Problem 41


### Problem-44
Tìm độ phức tạp của hàm đệ quy:
```
	static int counter;
    public static void function(int n){
        if(n < 2) return;
        else counter = 0;
        for (int i = 1; i <= 8; i++) {
        	function(n/2);
		}
        for (int i = 1; i <= Math.pow(n, 3); i++) {
        	counter++;
		}
    }
```
**Solution:**
Xem xét comments 
```
	static int counter;
    public static void function(int n){
        if(n < 2) return; //constant time
        else counter = 0;
        
        //Vòng lặp thực thi 8 lần với giá trị của n giảm 1 nửa mỗi lần gọi
        for (int i = 1; i <= 8; i++) {
        	function(n/2);
		}
        
        //Vòng lặp này thực thi n^3 lần với thời gian mỗi vòng lặp là không đổi
        for (int i = 1; i <= Math.pow(n, 3); i++) {
        	counter++;
		}
    }
```
Ta có thể xác định T(n) như sau: \
$T ( n ) = 1 (if n < 2)$\
$= 8 T ( \frac { n } { 2 } ) + n ^ { 3 } + 1 (otherwise)$

Sử dụng [master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) ta có kết quả:\
$T ( n ) = \Theta ( n ^ { lo g _ { 2 } ^ { 8 } } l o g n ) = \Theta ( n ^ { 3 } l o g n )$


### Problem-45
Tìm độ phức tạp của đoạn pseudocode sau:
```
    temp = 1
    repeat
        for i = 1 to n
            temp = temp + 1;
        n = n/2;
     until n <= 1
```
**Solution:**
Xem xét comments 
```
    temp = 1      //constatnt time
    repeat
        //Vòng lặp này thực thi n lần
        for i = 1 to n
            temp = temp + 1;
            
        //Tiếp tục vòng lặp với giá trị n giảm 1 nửa
        n = n/2;
     until n <= 1
```
Ta có thể xác định T(n) như sau: \
$T(n) = T(n/2) + n$

Sử dụng [master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) ta có kết quả:\
$T(n) = O(n)$

### Problem-46
Tìm độ phức tạp:
```
	public void function(int n) {
		for (int i = 1; i < n; i++) {
			for (int j = 1; j < n; j = j*2) {
				System.out.println("*");
			}
		}
	}
```
**Solution:**
Xem xét comments 
```
	public void function(int n) {
        //Vòng lặp này thực thi n lần
		for (int i = 1; i < n; i++) {
            //Vòng lặp này thực thi log(n) lần
			for (int j = 1; j < n; j = j*2) {
				System.out.println("*");
			}
		}
	}
```
=> Độ phức tạp của chương trình $O(nlogn)$

### Problem-47
Tìm độ phức tạp:
```
	public void function(int n) {
		for (int i = 1; i < n/3; i++) {
			for (int j = 1; j < n; j = j + 4) {
				System.out.println("*");
			}
		}
	}
```
**Solution:**
Xem xét comments 
```
	public void function(int n) {
        //Vòng lặp này thực thi n/3 lần
		for (int i = 1; i < n/3; i++) {
            //Vòng lặp này thực thi n/4 lần
			for (int j = 1; j < n; j = j + 4) {
				System.out.println("*");
			}
		}
	}
```
=> Độ phức tạp của chương trình $O(n^2)$

### Problem-48
Tìm độ phức tạp:
```
	public void function(int n) {
		if(n <= 1) return;
        if(n > 1){
            System.out.println("*");
            function(n/2);
            function(n/2);
        }
	}
```
**Solution:**
Xem xét comments 
```
	public void function(int n) {
		if(n <= 1) return;  //constatnt time
        if(n > 1){
            System.out.println("*"); //constant time
            function(n/2); //Gọi lại hàm với giá trị n giảm 1 nửa
            function(n/2); //Gọi lại hàm với giá trị n giảm 1 nửa
        }
	}
```
Ta có thể xác định T(n) như sau: \
$T ( n ) = 2 T ( \frac { n } { 2 } ) + 1$\
Sử dụng [master theorem](https://viblo.asia/p/chuong-1-introduction-6cac-dinh-ly-chinh-ve-giai-thuat-chia-de-tri-y37LdAgoVov) ta có kết quả:\
$T(n) = O(n)$

### Problem-49
Tìm độ phức tạp:
```
	public void function(int n) {
		int i = 1;
		while (i < n) {
			int j = n;
			while (j > 0)
				j = j / 2;
			i = 2 * i;
		}
	}
```
**Solution:**
Xem xét comments 
```
	public void function(int n) {
		int i = 1;
		while (i < n) {
			int j = n;
			while (j > 0)
				j = j / 2;  //logn lần
                
			i = 2 * i;    //logn lần
		}
	}
```
=> Độ phức tạp của chương trình $O(logn * logn) = O(log^2 n)$

### Problem-50
$\Sigma _ { 1 \leq k \leq n } O ( n )$, trong đó O (n) là viết tắt của bậc n thì tổng trên có độ phức tạp:\
1. $O(n)$
2. $O(n^2)$
3. $O(n^3)$
4. $O(3n^2)$
5. $O(1.5n^2)$

**Solution:** (2) $\Sigma _ { 1 \leq k \leq n } O ( n ) = O ( n )  \Sigma _ { 1 \leq k \leq n } 1 = O ( n ^ { 2 } ) .$

### Problem-51
Khẳng định nào sau đây là đúng\
I) $\left ( n + k \right ) ^ { m } = \Theta ( n ^ { m }  )$\
II) $2 ^ { n + 1 } = O ( 2 ^ { n } )$\
III) $2 ^ { 2n + 1 } = O ( 2 ^ { n } )$

1. I và II
2. I và III
3. II và III
4. Cả 3

**Solution:** (1) $( n + k ) ^ { m } = n ^ { k } + c 1 ^ { * } n ^ { k - 1 } + \ldots k ^ { m } = \Theta ( n ^ { k } )$\
(2) $2 ^ { n + 1 } = 2 ^ { * } 2 ^ { n } = O ( 2 ^ { n } )$
 
### Problem-52
Xem xét hàm sau: $f ( n ) = 2 ^ { n } \operatorname { g } ( n ) = n ! \operatorname { h } ( n ) = n ^ { l o g n }$\
Phát biểu nào sau đây về tiệm cận của f(n), g(n), và h(n) là đúng\
1. $f(n) = O(g(n)); g(n) = O(h(n))$
2. $f(n) = Ω (g(n)); g(n) = O(h(n))$
3. $g(n) = O(f(n)); h(n) = O(f(n))$
4. $h(n) = O(f(n)); g(n) = Ω (f(n))$

**Solution:** (4) Theo tốc độ tăng trưởng: $h(n) < f(n) < g(n)$ (g(n) tiệm cận đứng lớn hơn f(n) và f (n) tiệm cận đứng lớn hơn h(n)).\
Ta có thể dễ dàng nhận thấy thứ tự trên bằng cách lấy logarit của 3 hàm đã cho: $lognlogn < n < log(n!)$. Lưu ý rằng: $log(n!) = O(nlogn)$

### Problem-53
```
    int j=1, n;
    while(j <= n)
        j=j*2;
```
Số phép so sánh được thực hiện khi thực hiện vòng lặp cho n> 0 bất kỳ là:\
1. $\operatorname { c e i l } ( l o g _ { 2 } ^ { n } ) { + } 1$
2. n
3. $\operatorname { c e i l } ( l o g _ { 2 } ^ { n } )$
4. $\operatorname { floor } ( l o g _ { 2 } ^ { n } ) { + } 1$

**Solution:**
Giả sử rằng vòng lặp thực hiện k lần. Sau bước thứ k, giá trị của j là $2^k$.\
Lấy loga 2 vế ta được $k = l o g _ { 2 } ^ { n }$.\
Vì chúng ta đang thực hiện một so sánh nữa cho việc thoát khỏi vòng lặp => đáp án (1)