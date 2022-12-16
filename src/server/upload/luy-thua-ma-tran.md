#

Trong bài viết này, chúng ta cùng thảo luận về một dạng đặc biệt của ma trận đó là ma trận vuông, cùng với đó là một thao tác tính toán cơ bản nhưng rất quan trọng trên ma trận đó là lũy thừa ma trận.

# Một số định nghĩa và ví dụ

Trước khi bắt đầu thảo luận về lũy thừa của ma trận, ta cần làm rõ một số khái niệm sau:

- Ma trận vuông là ma trận có số hàng và số cột.
- Với ma trận vuông $M$, ta có $M^0 = I$ và $M^p = \prod_{i=1}^pM$ trong đó $I$ là ma trận đơn vị và $p$ là số mũ cho trước của ma trận.

Việc thực hiện tính toán lũy thừa ma trận mở rộng ra cho ta rất nhiều bài toán thú vị :) Hãy cùng xét một số ví dụ dưới đây:

**Ví dụ 1:** Tìm một số Fibonacci $fib(p)$ với độ phức tạp thời gian $O(\log p)$ trong đó $p$ là số thứ tự của số Fibonacci trong dãy Fibonacci. Nếu bạn đã tìm hiểu thuật toán Quy hoạch động thì ta có thể ứng dụng vào bài toán này với độ phức tạp $O(p)$ lâu hơn so với $O(\log p)$. Tưởng tượng nếu $p = 2^30$, giải pháp có độ phức tạp $O(p)$ sẽ cho kết quả TLE trong bài toán lập trình thi đấu. Khi đó, giải pháp có độ phức tạp thời gian $O (\log_2p)$ thể hiện sức mạnh của mình vì chỉ cần thực hiện 30 bước tính toán. Điều này có thể thực hiện được bằng cách sử dụng đẳng thức sau:

$\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix}^p = \begin{bmatrix}
fib(p+1) & fib(p) \\
fib(p) & fib(p-1)
\end{bmatrix}$

Ví dụ, để tính $fib (11)$, ta chỉ lũy thừa ma trận Fibonacci với số mũ 11. Đáp án nằm ở đường chéo phụ của ma trận kết quả.

$\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix}^{11} = \begin{bmatrix}
144 & 89 \\
89 & 55
\end{bmatrix} =  \begin{bmatrix}
fib(12) & fib(11) \\
fib(11) & fib(10)
\end{bmatrix}$

**Ví dụ 2:** Đếm số đường đi có độ dài $L$ của một đồ thị được lưu trữ trong ma trận kề - là ma trận vuông - với độ phức tạp thời gian $O (n^3 \log L)$. Ví dụ: Với đồ thị nhỏ có kích thước $n = 4$ được lưu trữ trong ma trận kề $M$ bên dưới. Số đường đi khác nhau từ đỉnh $0$ đến đỉnh $1$ với độ dài $L$ là giá trị của phần tử $M [0][1]$ sau khi lũy thừa ma trận $M$ với số mũ $L$.

Đồ thị có dạng như sau: 0 -> 1 -> 2 -> 3 (0,1,2,3 là các đỉnh)

Các đường đi từ đỉnh 0 tới đỉnh 1 với các độ dài khác nhau được mô tả bên dưới.

- 0->1 với độ dài 1: 0->1 (chỉ 1 đường)
- 0->1 với độ dài 2: không tồn tại
- 0->1 với độ dài 3: 0->1->2->1 (và 0->1->0->1)
- 0->1 với độ dài 4: không tồn tại
- 0->1 với độ dài 5: 0->1->2->3->2->1 (và 4 đường đi khác)

$M = \begin{bmatrix}
0 & 1 & 0 & 0 \\
1 & 0 & 1 & 0 \\
0 & 1 & 0 & 1 \\
0 & 0 & 1 & 0 \\
\end{bmatrix}$

$M^2 = \begin{bmatrix}
1 & 0 & 1 & 0 \\
0 & 2 & 0 & 1 \\
1 & 0 & 2 & 0 \\
0 & 1 & 0 & 1 \\
\end{bmatrix}$

$M^3 = \begin{bmatrix}
0 & 2 & 0 & 1 \\
2 & 0 & 3 & 0 \\
0 & 3 & 0 & 2 \\
1 & 0 & 2 & 0 \\
\end{bmatrix}$

$M^5 = \begin{bmatrix}
0 & 5 & 0 & 3 \\
5 & 0 & 8 & 0 \\
0 & 8 & 0 & 5 \\
3 & 0 & 5 & 0 \\
\end{bmatrix}$

**Ví dụ 3:** Việc tính toán lũy thừa ma trận còn cải thiện tốc độ của một số thuật toán quy hoạch động. Chi tiết mình sẽ trình bày trong phần tiếp theo của bài viết.

# Ý tưởng tối ưu để tính lũy thừa

Để thảo luận, hãy giả sử rằng các hàm thư viện tích hợp sẵn như $pow (base, p)$ hoặc các hàm liên quan khác có thể nâng cơ số lên một lũy thừa số nguyên $p$ không tồn tại. Khi đó, nếu thực hiện phép lũy thừa ‘theo định nghĩa’ như đoạn code dưới, ta sẽ có một giải pháp không tối ưu có độ phức tạp là $O (p)$, đặc biệt nếu p lớn thì thời gian thực thi đoạn code sẽ rất lâu.

```cpp
int normalExp(int base, int p) { // for simplicity, we use int data type
    int ans = 1; // we also assume that ans will not exceed 2^31 - 1
    for (int i = 0; i < p; i++) ans *= base; // this is O(p)
    return ans;
}
```

Có một giải pháp khác tốt hơn đó là sử dụng Chia để trị. Ta có thể tính $A^p$ như sau:

$A^0 = 1$ (trường hợp cơ sở)
$A^1 = A$ (trường hợp cơ sở khác)
$A^p = A^{p-1} . A$ (nếu $p$ lẻ)
$A^p = (A^{p/2})^2$ (trường $p$ chẵn)

Ví dụ, theo định nghĩa: $2^9 = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 ≈ O (p)$ phép nhân. Nhưng với Chia để trị: $2^9 = 2^8 × 2 = (2^4)^2 × 2 = ((2^2)^ 2)^ 2 × 2 ≈ O (\log p)$ phép nhân. Đoạn code dưới triển khai kĩ thuật Chia để trị:

```cpp
int fastExp(int base, int p) { // O(log p)
    if (p == 0) return 1;
    else if (p == 1) return base;
    else {
        int res = fastExp(base, p / 2);
        res *= res;
        if (p % 2 == 1) res *= base;
        return res;
    }
}
```

# Lũy thừa ma trận

Ta có thể sử dụng kỹ thuật tính lũy thừa bằng kỹ thuật chia để trị ở phần trước với độ phức tạp $O (log p)$ để thực hiện tính lũy thừa cho ma trận vuông với độ phức tạp $O (n^3 log p)$ vì mỗi phép nhân ma trận có độ phức tạp $O (n^3)$.

Code C++:

```cpp
// Modular Fibonacci

#include <cmath>
#include <cstdio>
#include <cstring>
using namespace std;

typedef long long ll;
ll MOD;

#define MAX_N 2                                  // increase this if needed
struct Matrix { ll mat[MAX_N][MAX_N]; };     // to let us return a 2D array

Matrix matMul(Matrix a, Matrix b) {            // O(n^3), but O(1) as n = 2
  Matrix ans; int i, j, k;
  for (i = 0; i < MAX_N; i++)
    for (j = 0; j < MAX_N; j++)
      for (ans.mat[i][j] = k = 0; k < MAX_N; k++) {
        ans.mat[i][j] += (a.mat[i][k] % MOD) * (b.mat[k][j] % MOD);
        ans.mat[i][j] %= MOD;             // modulo arithmetic is used here
      }
  return ans;
}

Matrix matPow(Matrix base, int p) {  // O(n^3 log p), but O(log p) as n = 2
  Matrix ans; int i, j;
  for (i = 0; i < MAX_N; i++)
    for (j = 0; j < MAX_N; j++)
      ans.mat[i][j] = (i == j);                  // prepare identity matrix
  while (p) {       // iterative version of Divide & Conquer exponentiation
    if (p & 1)                    // check if p is odd (the last bit is on)
      ans = matMul(ans, base);                                // update ans
    base = matMul(base, base);                           // square the base
    p >>= 1;                                               // divide p by 2
  }
  return ans;
}

int main() {
  int i, n, m;

  while (scanf("%d %d", &n, &m) == 2) {
    Matrix ans;                            // special matrix for Fibonaccci
    ans.mat[0][0] = 1;  ans.mat[0][1] = 1;
    ans.mat[1][0] = 1;  ans.mat[1][1] = 0;
    for (MOD = 1, i = 0; i < m; i++)                       // set MOD = 2^m
      MOD *= 2;
    ans = matPow(ans, n);                                       // O(log n)
    printf("%lld\n", ans.mat[0][1]);                      // this if fib(n)
  }

  return 0;
}
```

Code java:

```java
// Modular Fibonacci, 0.282s in Java, 0.019s in C++

import java.util.*;

class Main {
  static int i, n, m, MAX_N = 2;
  static long MOD;

  static long[][] matMul(long[][] a, long[][] b) {    // O(n^3 ~> 1) as n=2
    long[][] ans = new long[2][2]; int i, j, k;
    for (i = 0; i < MAX_N; i++)
      for (j = 0; j < MAX_N; j++)
        for (ans[i][j] = k = 0; k < MAX_N; k++) {
          ans[i][j] += (a[i][k] % MOD) * (b[k][j] % MOD);
          ans[i][j] %= MOD;               // modulo arithmetic is used here
        }
    return ans;
  }

  static long[][] matPow(long[][] base, int p) {   // O(n^3 log p ~> log p)
    long[][] ans = new long[MAX_N][MAX_N]; int i, j;
    for (i = 0; i < MAX_N; i++)
      for (j = 0; j < MAX_N; j++)
        ans[i][j] = (i == j ? 1 : 0);            // prepare identity matrix
    while (p > 0) { // iterative version of Divide & Conquer exponentiation
      if ((p & 1) == 1)           // check if p is odd (the last bit is on)
        ans = matMul(ans, base);                              // update ans
      base = matMul(base, base);                         // square the base
      p >>= 1;                                             // divide p by 2
    }
    return ans;
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    while (sc.hasNext()) {
      n = sc.nextInt(); m = sc.nextInt();
      long[][] ans = new long[MAX_N][MAX_N];   // special Fibonaccci matrix
      ans[0][0] = 1;  ans[0][1] = 1;
      ans[1][0] = 1;  ans[1][1] = 0;
      for (MOD = 1, i = 0; i < m; i++)                     // set MOD = 2^m
        MOD *= 2;
      ans = matPow(ans, n);                                     // O(log n)
      System.out.println(ans[0][1]);                      // this if fib(n)
    }
  }
}
```

# Tăng tốc độ thuật toán quy hoạch động bằng lũy thừa ma trận

Trong phần này mình sẽ trình bày việc lũy thừa ma trận có thể cải thiện một số vấn đề sử dụng quy hoạch động như nào.

Ta bắt đầu với ma trận Fibonacci $2 × 2$. Trường hợp cơ sở $fib (0) = 0, fib (1) = 1$. Với $n ≥ 2$ ta có công thức $fib (n) = fib (n - 1) + fib (n - 2)$. Ta có thể tính $fib (n)$ với độ phức tạp $O (n)$ bằng cách sử dụng quy hoạch động đó là tính $fib (n)$ với từng $n \in [2..n]$. Tuy nhiên, hoàn toàn có thể thực hiện nhanh hơn bằng cách viết các số Fibonacci dưới dạng ma trận :D

Đầu tiên, ta có công thức tính số Fibonacci như sau:

$fib(n + 1) + fib(n) = fib(n + 2)$

$fib(n) + fib(n − 1) = fib(n + 1)$

Sau đó ta viết lại công thức dưới dạng ma trận:

$\begin{bmatrix}
a & b \\
c & d
\end{bmatrix} × \begin{bmatrix}
fib(n+1) \\
fib(n)
\end{bmatrix} = \begin{bmatrix}
fib(n+2) \\
fib(n+1)
\end{bmatrix}$

Theo đẳng thức trên ta có $a  fib (n + 1) + b × fib (n) = fib (n + 2)$ và $c × fib (n + 1) + d × fib (n) = fib (n + 1)$. Việc bây giờ là cần xác định giá trị cho các phần tử trong ma trận vuông $2 × 2$. Các giá trị thích hợp cho $a, b, c$ và $d$ phải là $1, 1, 1, 0$. Để tìm $p$ số fibonacci tiếp theo, ta chỉ cần lũy thừa ma trận $2 × 2$.

$\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix}^p × \begin{bmatrix}
fib(n+1) \\
fib(n)
\end{bmatrix} = \begin{bmatrix}
fib(n+1+p)\\
fib(n+p)
\end{bmatrix}$

Ma trận Fibonacci có thể viết lại như sau:

$\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix}^p = \begin{bmatrix}
fib(p+1) & fib(p) \\
fib(p) & fib(p-1)
\end{bmatrix}$

Ứng dụng lũy thừa ma trận, bạn hãy thử giải bài toán này xem sao nhé :D Nội dung bài toán là: Cho 3 số $p = a+b, q = a × b, n$. Hãy tính giá trị $a^n + b^n$.

Để giải bài toán này, ta phải tinh tế nhìn ra công thức tính $a^n+b^n$ có xuất hiện $p$ và $q$, cụ thể:

$a^n + b^n = (a + b) × (a^{n−1} + b^{n−1}) − (a × b) × (a^{n−2} + b^{n−2})$

Đặt $X_n = a^n + b^n$, ta có: $X^n = p × X^{n−1} − q × X{n−2}$.

Ta có phương trình như sau:

$p × X^{n+1} − q × X^n = X{n+2}$

$p × X^n − q × X^{n−1} = X^{n+1}$

Công thức dưới dạng ma trận

$\begin{bmatrix}
p & -q \\
1 & 0
\end{bmatrix} × \begin{bmatrix}
X_{n+1} \\
X_n
\end{bmatrix} = \begin{bmatrix}
X_{n+2}\\
X_{n+1}
\end{bmatrix}$

Ta viết lại công thức chuẩn chỉnh hơn

$\begin{bmatrix}
p & -q \\
1 & 0
\end{bmatrix}^n × \begin{bmatrix}
X_1 \\
X_0
\end{bmatrix} = \begin{bmatrix}
X_{n+1}\\
X_n
\end{bmatrix}$

với $X_0 = a^0 + b^0 = 1 + 1 = 2$ và $X_1 = a^1 + b^1 = a+b = p$. Với công thức trên, ta có thể tính $X_n$ với độ phức tạp nhanh hơn $O(n)$ khi sử dụng thuật toán quy hoạch động đơn thuần.

Code C++ cho bài toán:

```cpp
#include <cstdio>
using namespace std;

long long p, q, n;

int A[2][2];

void mult(long long a[2][2], long long b[2][2]){
	int i, j, k;
	long long c[2][2] = {{0}};

	for (i = 0; i < 2; i++)
		for (j = 0; j < 2; j++)
			for (k = 0; k < 2; k++)
				c[i][j] += a[i][k] * b[k][j];

	for (i = 0; i < 2; i++)
		for (j = 0; j < 2; j++)
			a[i][j] = c[i][j];
}

int main() {
	long long n, b;

	A[1][0] = 1; A[1][1] = 0;

	while (scanf("%llu %llu %llu", &p, &q, &n) == 3){
		A[0][0] = p;
		A[0][1] = -q;

		if (n == 0){
			printf("2\n");
			continue;
		}

		long long B[2][2];

		for (int i = 0; i < 2; i++)
			for (int j = 0; j < 2; j++)
				B[i][j] = A[i][j];

		long long m[2][2] = {{1,0},{0,1}};

		for (n--; n; n /= 2){
			if (n % 2)
				mult(m, B);
			mult(B, B);
		}

		printf("%lld\n", m[0][0] * p + m[0][1] * 2);
	}
}
```

# Tổng kết

Vậy là trong bài viết mình đã cung cấp thêm cho bạn một phương án mới để cải thiện và áp dụng cho những bài toán sử dụng quy hoạch động đơn thuần. Việc "ma trận hóa" và ứng dụng chia để trị để tính lũy thừa được áp dụng trong rất nhiều bài toán lập trình thi đấu hay và khó. Điểm khó ở đây là xây dựng ma trận như nào để phù hợp với mỗi bài toán :) Do vậy, hãy luyện tập thật nhiều để thành thạo phương pháp này nhé :)

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. [onlinejudge.org](https://onlinejudge.org/)
6. Algorithms in a nutshell - Geogre T. Heineman, Gary Pollice & Stanley Selkow