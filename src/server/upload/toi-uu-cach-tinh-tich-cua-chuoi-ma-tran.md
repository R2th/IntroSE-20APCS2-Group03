Ma trận là một khái niệm rất cơ bản trong toán học nhưng nó lại có vai trò to lớn trong nhiều lĩnh vực và đóng góp nhiều ứng dụng thực tế. Trong lập trình thi đấu, việc thao tác tính toán trên ma trận với các bài toán hay và khó là điều không thể tránh khỏi. Đôi khi chỉ là những thao tác rất cơ bản như nhân ma trận cũng cần phải tối ưu một cách triệt để. Trong bài viết này, mình sẽ trình bày một số vấn đề về việc tối ưu việc tính tích của ma trận.

# Đặt vấn đề

Nếu đã học tới chương trình đại học thì chắc các bạn đều biết cách tính tích của 2 ma trận :D Nói một ngắn gọn, ta nhân lần lượt các phần tử theo hàng ở ma trận này với các phần tử theo cột tương ứng ở ma trận kia rồi lấy tổng để ra phần tử ở vị trí tương ứng của ma trận kết quả. Điều kiện để 2 ma trận có thể nhân được với nhau là số cột của ma trận trước phải bằng số hàng của ma trận sau :). Vấn đề ở đây là, khi phải tính tích của nhiều ma trận với nhau hoặc khi kích thước của ma trận lớn, ta phải tìm cách tối ưu tốc độ thực thi. Nếu sử dụng cách tính đơn thuần trên thì chưa chắc làm cho chương trình đạt hiệu suất tốt.
 
Cho ma trận $a$ có kích thước $p$ x $q$ và ma trận $b$ có kích thước $q$ x $r$. Nếu sử dụng cách nhân ma trận phổ thông để lập trình, độ phức tạp của thuật toán sẽ là $O(p * q *r)$. Ta có thể cài đặt thuật toán bằng C++ như sau: 

```cpp
#define MAX_N 10 

// increase/decrease this value as needed

struct Matrix { 
   int mat[MAX_N][MAX_N]; 
};

Matrix matMul(Matrix a, Matrix b, int p, int q, int r){  // O(pqr)
   Matrix c; int i, j, k;
   for (i = 0; i < p; i++)
      for (j = 0; j < r; j++)
         for (c.mat[i][j] = k = 0; k < q; k++)
            c.mat[i][j] += a.mat[i][k] + b.mat[k][j];
   return c; 
}
```

Khi ta phải tính tích của nhiều ma trận thì cách làm trên chưa thật sự tối ưu. Mình sẽ mô tả lại bài toán ở đây như sau: Cho $n$ ma trận $A_1, A_2,...,A_n$ trong đó mỗi ma trận $A_i$ có kích thước $P_{i-1}$ x $P_i$. Tính tích của $n$ ma trận trên. Một suy nghĩ rất tự nhiên để giảm thời gian thực thi thì ta phải để cho máy tính làm ít các phép toán thôi :D. Hay ở đây, ta phải giảm đi số các phép tính nhân các phần tử khi thực hiện nhân ma trận. Ví dụ: Tính tích 3 ma trận $X,Y,Z$. Ma trận $X$ có kích thước $5$ x $10$, ma trận $Y$ có kích thước $10$ x $20$ và ma trận $Z$ có kích thước $20$ x $35$. Vì phép nhân ma trận có tính chất kết hợp nên ta có thể tính tích bằng 1 trong 2 cách: $(XY)Z$ hoặc $X(YZ)$. Hãy phân tích hai cách tính này:

- Tính bằng cách $(XY)Z$, ta thực hiện $5$ x $20$ x $10$ $= 1000$ phép tính nhân để tính ra kết quả của $(XY)$. $(XY)$ là một ma trận có kích thước $5$ x $20$. Sau đó, tiếp tục thực hiện $5$ x $35$ x $20 = 3500$ phép nhân để ra kết quả cuối cùng. Vậy ta đã thực hiện tổng cộng $1000 + 3500 = 4500$ phép tính nhân. :D

- Nếu tính bằng cách $X(YZ)$, ta thực hiện $10$ x $35$ x $20$ $= 7000$ phép tính nhân để tính ra kết quả của $(YZ)$. $(YZ)$ là một ma trận có kích thước $10$ x $35$. Sau đó, tiếp tục thực hiện $5$ x $35$ x $10 = 1750$ phép nhân để ra kết quả cuối cùng. Vậy ta đã thực hiện tổng cộng $7000 + 1750 = 8750$ phép tính nhân.

Oh! Tính theo cách $X(YZ)$ ta phải thực hiện nhiều phép tính hơn $(XY)Z$. Do đó, thời gian thực thi chương trình cho phép tính $(XY)Z$ sẽ nhanh hơn rồi :) Cơ mà làm như nào để biết trình tự tính như vậy bây giờ. mình sẽ đến một bài toán lập trình thi đấu như sau: 

Xác định một trình tự tính toán nhân ma trận tối ưu sử dụng tính chất kết hợp của phép nhân ma trận.

**INPUT**

Đối với mỗi ma trận trong chuỗi nhiều ma trận được nhân với nhau, bạn sẽ chỉ được cung cấp các kích thước của ma trận. Mỗi chuỗi bao gồm một số nguyên $N$ cho biết số ma trận. Tiếp theo là $N$ cặp số nguyên, mỗi cặp cho biết số hàng và số cột trong một ma trận. Thứ tự kích thước của ma trận được đưa ra giống như thứ tự của ma trận trong chuỗi. Giá trị $0$ của $N$ đánh dấu kết thúc input. $N$ đảm bảo điều kiện không lớn hơn $10$.

**OUTPUT**

Giả sử các ma trận được lần lượt là $A1, A2 ,. . . , AN$. Output cho mỗi testcase input là một dòng chứa biểu thức được đặt trong ngoặc đơn chỉ rõ thứ tự nhân các ma trận. Tiền tố output cho mỗi testcase bằng số testcase (được đánh số tuần tự, bắt đầu bằng 1). Nếu có nhiều kết quả chính xác, bất kỳ kết quả nào trong số kết quả này đều được coi là đáp án hợp lệ.

**Input mẫu**

```
3
1 5
5 20
20 1
3
5 10
10 20
20 35
6
30 35
35 15
15 5
5 10
10 20
20 25
0
```

**Output mẫu**
```
Case 1: (A1 x (A2 x A3))
Case 2: ((A1 x A2) x A3)
Case 3: ((A1 x (A2 x A3)) x ((A4 x A5) x A6))
```

# Hướng giải quyết

Nếu làm theo cách "ngây thơ" thì việc duyệt từng trường hợp đặt dấu ngoặc đơn sẽ rất mất thời gian vì có rất nhiều trường hợp. Ta sẽ sử dụng chiến lược Quy hoạch động để giải quyết bài toán này. Thực chất đây chỉ là ví dụ kinh điển sử dụng quy hoạch động. 

Ta định nghĩa hàm $cost(i, j)$ trong đó $i < j$ là số phép tính nhân các phân tử cần thiết để tính tích của chuỗi ma trận $A_i$ x $A_{i+1}$ x ... x $A_j$. Ta xác định công thức truy hồi cho thuật toán như sau: 

- $cost(i, j) = 0$ nếu $i = j$
- $cost(i, j) = min(cost(i, k) + cost(k + 1, j) + P_{i−1} × P_k × P_j), \forall k \in [i...j-1]$

$cost(1, n)$ là kết quả tối ưu cần tìm (số phép nhân phần tử trong ma trận ít nhất). Ta có $O (n^2)$ các cặp bài toán con $(i, j)$ khác nhau. Do đó, cần một mảng $DP$ có kích thước là $O (n^2)$. Mỗi bài toán con yêu cầu tính toán tối đa $O (n)$. Do đó, độ phức tạp về thời gian của giải pháp quy hoạch động này cho bài toán là $O (n^3)$.

**Solution mẫu**

```cpp
#include<stdio.h>
int DP[11][11] = {}, a, b, c, d;
int Wy[11][11] = {};
void Backtracking(int l, int r) {
	if(l+1 < r) {
		int m = Wy[l][r];
		printf("(");
		Backtracking(l, m);
		printf(" x ");
		Backtracking(m+1, r);
		printf(")");
	}
	if(l == r)
		printf("A%d", l+1);
	if(l+1 == r)
		printf("(A%d x A%d)", l+1, r+1);
}
main() {
	int n, A[11], C = 0;
	while(scanf("%d", &n) == 1 && n) {

		for(a = 0; a < n; a++)
			scanf("%d %d", &A[a], &A[a+1]);
		for(a = 1; a < n; a++) {
			for(b = 0, c= a + b; c < n; b++, c++) {
				int min = 2147483647, t, set;
				for(d = b; d < c; d++) {
					t = DP[b][d] + DP[d+1][c] + A[b]*A[d+1]*A[c+1];
					if(min > t) {
						min = t, set = d;
					}
				}
				DP[b][c] = min, Wy[b][c] = set;
			}
		}
		printf("Case %d: ", ++C);
		Backtracking(0, n-1);
		puts("");
	}
	return 0;
}
```

# Tổng kết

Trong bài viết mình đã trình bày cho các bạn cách tối ưu để thực hiện nhân một chuỗi ma trận. Điểm chú ý ở đây đó là việc ứng dụng tính chất kết hợp của phép nhân ma trận, thứ tự các phép nhân ma trận khác nhau có thể cho ta thời gian thực thi khác nhau, nhưng vẫn cho cùng một kết quả. Việc chọn trình tự tính toán hợp lý sẽ cải thiện hiệu suất của chương trình. Một lần nữa, ứng dụng của quy hoạch động lại được sử dụng trong các bài toán tối ưu, ta lại tiếp tục thấy được vai trò quan trọng của thuật toán này :D

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. [onlinejudge.org](https://onlinejudge.org/)