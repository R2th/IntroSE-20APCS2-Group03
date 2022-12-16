# Giới thiệu

Khi nhắc đến thuật toán để tìm đường đi ngắn nhất trong đồ thị, người ta sẽ thường nghĩ tới những thuật toán dễ tiếp cận và có thể chạy trong giới hạn cho phép như Breadth First Search, Dijkstra hay Bellman-Ford. Tuy nhiên, ba thuật toán trên đều chỉ có thể tìm được đường đi ngắn nhất từ một đỉnh nguồn nhất định đến các đỉnh khác và do đó, trong một số trường hợp cụ thể cần chỉ ra đường đi ngắn nhất của mọi cặp đỉnh trong đồ thị, các thuật toán này sẽ hoạt động chưa hiệu quả khi phải chạy lặp đi lặp lại khá nhiều thao tác.

Thuật toán Floyd-Warshall sẽ giúp chúng ta giải quyết vấn đề này chỉ trong một lần chạy duy nhất. Hơn thế nữa, cách tiếp cận và cài đặt của nó cũng khá đơn giản và quen thuộc.

Thuật toán Floyd-Warshall còn được gọi là thuật toán Floyd được Robert Floyd tìm ra năm 1962 là thuật toán để tìm đường đi ngắn nhất giữa mọi cặp đỉnh.
Floyd hoạt động được trên đồ thị có hướng, có thể có trọng số âm, tuy nhiên không có chu trình âm. Ngoài ra, Floyd còn có thể được dùng để phát hiện chu trình âm.

# Kĩ thuật

## Đặt vấn đề

Cho đồ thị vô hướng $G$ sau:

![graph](https://i.imgur.com/byiwSLE.png)

Tìm đường đi ngắn nhất giữa các cặp đỉnh trong đồ thị trên.

Bài toán trên yêu cầu tìm đường đi ngắn nhất của của tất cả các cặp đỉnh. Ta có thể sử dụng thuật toán Dijkstra cho toàn bộ đỉnh của đồ thị. Với đồ thị trên có $5$ đỉnh ta sẽ $5$ lần gọi hàm thực hiện thuật toán Dijkstra. Tất nhiên cách này hoàn toàn sử dụng được, tuy nhiên với số đỉnh $|V| \le 400$ ta có thể cài đặt thuật toán Floyd Warshall dễ code hơn nhiều.

## Mô tả thuật toán

Với ví dụ trên, ta mô tả cách thuật toán toán Floyd Warshall như sau:

Khởi tạo ma trận khoảng cách ban đầu, ta được:

|     | 1        | 2        | 3        | 4        | 5        |
| --- | -------- | -------- | -------- | -------- | -------- |
| 1   | 0        | 5        | $\infty$ | 9        | 1        |
| 2   | 5        | 0        | 2        | $\infty$ | $\infty$ |
| 3   | $\infty$ | 2        | 0        | 7        | $\infty$ |
| 4   | 9        | $\infty$ | 7        | 0        | 2        |
| 5   | 1        | $\infty$ | $\infty$ | 2        | 0        |

Quá trình thuật toán diễn ra như sau:

Chọn lần lượt từng đỉnh của đồ thị làm đỉnh trung gian (ta quy ước là $K$).
Chọn một cặp $2$ đỉnh phân biệt và không trùng với đỉnh trung gian (ta quy ước lần lượt là $I$ và $J$).

Thực hiện so sánh như ở trên: Đường đi ngắn nhất giữa $I$ và $J$ sẽ bằng giá trị nhỏ nhất của một trong hai giá trị sau:

- Giá trị đường đi ngắn nhất hiện thời giữa $I$ và $J$.
- Tổng của giá trị đường đi ngắn nhất hiện thời giữa $I$ và $K$, và đường đi ngắn nhất hiện thời giữa $K$ và $J$.

Đầu tiên, $K = 1$. Nhờ đỉnh $1$ làm trung gian, ta thấy xuất hiện đường đi từ đỉnh $2$ tới đỉnh $4$ (độ dài $14$), và từ đỉnh $2$ tới đỉnh $5$ (độ dài $6$).
Đường đi trung gian qua đỉnh $1$ để đi từ đỉnh $4$ tới đỉnh $5$ không tối ưu về chiều dài $(9 + 1 > 2)$ nên ta không cập nhật lại đường đi ngắn nhất giữa $2$ đỉnh $4$ và $5$.

Mảng lúc này trở thành:

|     | 1        | 2      | 3        | 4      | 5        |
| --- | -------- | ------ | -------- | ------ | -------- |
| 1   | 0        | 5      | $\infty$ | 9      | 1        |
| 2   | 5        | 0      | 2        | **14** | **6**    |
| 3   | $\infty$ | 2      | 0        | 7      | $\infty$ |
| 4   | 9        | **14** | 7        | 0      | 2        |
| 5   | 1        | **6**  | $\infty$ | 2      | 0        |

Tiếp theo, ta duyệt tới $K = 2$. Đường đi từ $3$ tới $1$ (độ dài $7$), từ $3$ tới $5$ (độ dài $8$) được hình thành. Đường đi từ $3$ tới $4$ không cập nhật độ dài $(7 < 2 + 5 + 9)$.

|     | 1     | 2   | 3     | 4   | 5     |
| --- | ----- | --- | ----- | --- | ----- |
| 1   | 0     | 5   | **7** | 9   | 1     |
| 2   | 5     | 0   | 2     | 14  | 6     |
| 3   | **7** | 2   | 0     | 7   | **8** |
| 4   | 9     | 14  | 7     | 0   | 2     |
| 5   | 1     | 6   | **8** | 2   | 0     |

Cứ tiếp tục lựa chọn $K$ như vậy cho tới hết, ta sẽ thu được mảng 2D hoàn chỉnh:

|     | 1   | 2   | 3   | 4   | 5   |
| --- | --- | --- | --- | --- | --- |
| 1   | 0   | 5   | 7   | 3   | 1   |
| 2   | 5   | 0   | 2   | 8   | 6   |
| 3   | 7   | 2   | 0   | 7   | 8   |
| 4   | 3   | 8   | 7   | 0   | 2   |
| 5   | 1   | 6   | 8   | 2   | 0   |

Giả sử, qua mảng này, ta thấy đường đi ngắn nhất từ đỉnh $2$ tới đỉnh $4$ có độ dài $8$. Dựa theo đồ thị thì nó là đoạn đường sau: $2 -> 1 -> 5 -> 4$

**Mã giả**

```cpp
let dist be a |V| × |V| array of minimum distances initialized to ∞ (infinity)
for each edge (u, v) do
    dist[u][v] ← w(u, v)  // The weight of the edge (u, v)
for each vertex v do
    dist[v][v] ← 0
for k from 1 to |V|
    for i from 1 to |V|
        for j from 1 to |V|
            if dist[i][j] > dist[i][k] + dist[k][j]
                dist[i][j] ← dist[i][k] + dist[k][j]
            end if
```

## Nhận xét

Thuật toán Floyd Warshall bản chất là một thuật toán quy hoạch động. Vì độ phức tạp thời gian của thuật toán là $O(|V|^3)$ ($3$ vòng lặp lồng nhau) nên ta có thể sử dụng cho đồ thị có số đỉnh $|V| \le 400$ trong các cuộc thi lập trình. Với các bài toán yêu cầu tìm đường đi ngắn nhất của toàn bộ cặp cạnh trong đồ thị, Floyd Warshall là một lựa chọn hợp lý so với các thuật toán tìm đường đi ngắn nhất trên nguồn đơn như Dijkstra và Bellman Ford. So sánh độ phức tạp thời gian dễ thấy:

- Thuật toán Dijkstra có độ phức tạp $O(|V|+|E|) \log |V|$. Khi thực hiện $|V|$ lần gọi, ta có độ phức tạp trở thành $O(|V|^3 \log |V|)$ nếu $|E| = O(V^2)$.
- Thuật toán Bellman Ford có độ phức tạp $O(|V||E|)$. Khi thực hiện $|V|$ lần gọi, ta có độ phức tạp trở thành $O(|V|^4)$ nếu $|E| = O(V^2)$.

# Cài đặt

**Code**:

```cpp
#include <bits/stdc++.h>
using namespace std;
const int oo = 99999;
int a[1812][1812];
int n, m;
int next1[100][100];
int graph[100][100];

int main() {
    cin >> n;
//    for (int i = 1; i <= m; i++) { // Nhap theo danh sach canh
//        int p, q, w;
//        cin >> p >> q >> w;
//        a[p][q] = a[q][p] = w;
//    }
	memset(next1, INT_MAX, sizeof next1);
	for(int i = 1; i <= n; i++){
		for(int j = 1; j <= n; j++){
			cin >> a[i][j];
			if(a[i][j] != oo && a[i][j] != 0){ // Co duong di giua i va j
				next1[i][j] = j;
			}
		}
	}

    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++){
            	if((a[i][j] >  a[i][k] + a[k][j]) && (a[i][k] != oo) && (a[k][j] != oo)){
            		a[i][j] = a[i][k] + a[k][j];
                	next1[i][j] = next1[i][k];
            	}
            }
    cout << "Ma tran khoang cach: \n";
    for (int i = 1; i <= n; i++){
        for (int j = 1; j <= n; j++){
        	cout << a[i][j] << " ";
    	}
    	cout << endl;
    }
    for(int i = 1; i <= n; i++){
    	for(int j = 1; j <= n; j++){
    		if(a[i][j] == oo){
    			cout << "Khong co duong di tu " << i << " toi " << j << endl;
    			continue;
			}
    		if (i != j){
    			cout << "Duong " << i << " toi " << j <<": ";
    			for(int tmp = i; tmp != j; tmp = next1[tmp][j]){
    				cout << tmp << " ";
			}
			cout << j << endl;
		}
	}
}
```

# Một số ứng dụng của thuật toán

Bên cạnh mục đích chính của thuật toán là tìm đường đi ngắn nhất của các cặp đỉnh. Floyd Warshall có thể ứng dụng trong một số bài toán khác được để cập sau đây.

## Giải bài toán tìm đường đi ngắn nhất từ nguồn đơn với đồ thị kích thước nhỏ có trọng số

Nếu ta có thông tin đường đi ngắn nhất của tất cả các cặp đỉnh dựa vào thuật toán Floyd Warshall thì việc tìm đường đi ngắn nhất từ nguồn đơn là điều dễ như ăn bánh. Tuy nhiên lưu ý rằng đồ thị này phải có số đỉnh nhỏ hơn $400$. Thuật toán Floyd Warshall trở nên hữu ích do code đơn giản, dễ debug hơn là sử dụng thuật toán Dijkstra.

## In ra đường đi ngắn nhất

Tìm ra được độ dài đường đi ngắn nhất giữa các cặp đỉnh thì tất nhiên cũng phải xác định được đường đi giữa ngắn nhất giữa các cặp đỉnh đó. Với thuật toán Dijkstra ta sử dụng mảng $1$ chiểu để truy vết ngược đường đi thì với thuật toán Floyd Warshall, vì thao tác trên mảng $2$ chiều nên ta sử dụng mảng $2$ chiều để truy vết đường đi. Code để truy vết đường đi được trình bày tại phần cài đặt.

## Xác định tính chất bắc cầu

Vấn đề tính chất bắc cầu được mô tả như sau: Cho một đò thị, xác định kết nối giữa $2$ đỉnh $i$ và $j$ là kết nối trực tiếp hay gián tiếp. Bài toán này sử dụng các toán tử logic nhanh hơn nhiều so với các toán tử số học. Ban đầu, $AdjMat[i][j]$ bằng $1$ nếu đỉnh $i$ được nối trực tiếp với đỉnh $j$ hoặc bằng $0$ nếu ngược lại. Sau khi chạy thuật toán Warshall với $O(V^3)$, ta có thể kiểm tra xem hai đỉnh $i$ và $j$ có được kết nối trực tiếp hay gián tiếp hay không bằng cách kiểm tra $AdjMat[i][j]$.

```cpp
for (int k = 0; k < V; k++)
	for (int i = 0; i < V; i++)
		for (int j = 0; j < V; j++)
			AdjMat[i][j] = (AdjMat[i][k] & AdjMat[k][j]);
```

## Tìm chu trình nhỏ nhất hoặc chu trình âm

Floyd Warshall’s kết thúc sau $O(V^3)$ bất kể đồ thị đầu vào như nào. Tính chất này cho phép Floyd Warshall’s được sử dụng để phát hiện xem đồ thị có chu kỳ hoặc chu kỳ âm hay không và thậm chí tìm chu kỳ (không âm) nhỏ nhất trong số tất cả các chu kỳ có thể có.

Để làm điều này, ban đầu ta đặt đường chéo chính của ma trận kề với giá trị rất lớn, tức là $AdjMat[i][i]$ = $INF (1B)$. Sau đó, chạy thuật toán Floyd Warshall với $O(V^3)$. Bây giờ, chúng ta kiểm tra giá trị của $AdjMat[i][i]$, hay nói một cách khác là chu trình đường đi ngắn nhất có trọng số bắt đầu từ đỉnh $i$ đi qua $V -1$ đỉnh trung gian khác và quay trở lại $i$. Nếu $AdjMat[i][i]$ không còn là $INF$ với mọi $i \in [0..V-1]$ thì ta có một chu trình. Giá trị không âm nhỏ nhất $AdjMat[i][i]$ $∀i \in [0..V-1]$ là chu kỳ nhỏ nhất. Nếu $AdjMat[i][i] <0$ với mọi $i \in [0..V-1]$ thì ta có một chu kỳ âm.

## Tìm đường đi ngắn nhất giữa các cặp đỉnh của đồ thị có giá trị lớn nhất

Nghe hơi xoắn não phải không :) Để tìm được đường đi như vậy thì hiển nhiên ta phải xác định được đường đi ngắn nhất giữa các cặp đỉnh của đồ thị rồi so sánh kết quả với nhau. Việc tìm đường đi ngắn nhát giữa các cặp đỉnh của đồ thị được thực hiện dễ dàng bằng thuật toán Floyd Warshall với độ phức tạp $O(V^3)$. Sau đó ta có thể tìm giá trị lớn nhất trong các giá trị vừa tìm được với độ phức tạp $O(V^2)$. Tuy nhiên, ta chỉ có thể thực hiện được điều này trên đồ thị có $|V| \le 400$.

# Tổng kết

Vậy là ta đã tìm hiểu các thuật toán tìm đường đi ngắn nhất của đồ thị. Mỗi thuật toán có những tính chất đặc trưng và do đó việc sử dụng phụ thuộc vào đặc điểm của đồ thị để tối ưu về độ phức tạp thời gian. Dưới đây là bảng tổng kết việc sử dụng các thuật toán tìm đường đi ngắn nhất cho các đồ thị có đặc điểm khác nhau.

| Đặc điểm đồ thị                  | BFS $O(V+E)$        | Dijsktra $O((V+E) \log V)$ | Bellman Ford $O(VE)$     | Floyd Warshall $O(V^3)$ |
| -------------------------------- | ------------------- | -------------------------- | ------------------------ | ----------------------- |
| Kích thước đồ thị có thể áp dụng | $V,E \le 10M$       | $V,E \le 300K$             | $VE \le 10M$             | $V \le 400$             |
| Không trọng số                   | Tốt nhất            | Ổn                         | Tệ                       | Đa phần là tệ           |
| Có trọng số                      | WA                  | Tốt nhất                   | Ổn                       | Đa phần là tệ           |
| Trọng số âm                      | WA                  | Ổn                         | Ổn                       | Đa phần là tệ           |
| Chu trình âm                     | Không xác định được | Không xác định được        | Xác định được            | Xác định được           |
| Đồ thị nhỏ                       | WA nếu có trọng số  | Lấy dao mổ trâu giết gà    | Lấy giao mổ trâu giết gà | Tốt nhất                |

\*WA: Wrong answer

# Tài liệu Tham khảo

1. [Wikipedia](https://vi.wikipedia.org/wiki/Thu%E1%BA%ADt_to%C3%A1n_Floyd-Warshall)
2. Giải thuật và lập trình - Thầy Lê Minh Hoàng
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim