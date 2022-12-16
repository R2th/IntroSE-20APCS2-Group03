# I. Giới thiệu

Quy hoạch động trên cây ($\text{Dp On Tree}$), là một dạng bài quy hoạch động đặc biệt, sử dụng để giải các bài toán quy hoạch động trên đồ thị có dạng cây. Ở dạng bài này, thường sẽ phải tìm công thức truy hồi cho các nút trên cây dựa vào các nút con của nó. Khi đặt hàm mục tiêu, thường sẽ xuất hiện $1$ trạng thái là $i$, có nghĩa là chúng ta đang đi giải bài toán trên cây con có nút gốc là nút $i$. Dạng bài này giống với quy hoạch động thông thường, khi chúng ta cần xác định cấu trúc con tối ưu, tuy nhiên điểm khác biệt là ta sẽ định nghĩa hàm mục tiêu cho từng nút và tính toán dựa trên các nút con của nút đó.

Trước khi đọc chuyên đề này, bạn đọc cần nắm được những kiến thức cơ bản của quy hoạch động, các thuật toán duyệt đồ thị $\text{DFS, BFS}$; cũng như các khái niệm về cây. 

# II. Một số bài toán Quy hoạch động trên cây

## Bài toán 1

***Đề bài:*** Cho một cây $T$ gồm $N$ $(N \le 10^5)$ đỉnh, nút thứ $i$ của cây có gắn lượng tiền $c_i$. Cần chọn ra một dãy các nút trên cây, sao cho không có bất kỳ hai nút kề nhau nào được chọn (hai nút kề nhau là hai nút có cạnh nối trực tiếp), và tổng lượng tiền thu được từ các nút được chọn là lớn nhất có thể.

***Nhận xét:*** Bài toán này khá giống với bài toán quy hoạch động cơ bản trên mảng một chiều: Cho trước dãy số $A$ gồm $N$ phần tử $a_1, a_2,..., a_N$, chọn ra một dãy con sao cho tổng của chúng là lớn nhất và không có hai phần tử liên tiếp nào cùng được chọn. Ta đặt $dp_i$ là tổng lớn nhất thu được từ $a_1$ tới $a_i$, và sẽ thu được công thức $dp_i = max(dp_{i - 2} + a_i, dp_{i - 1})$ - nghĩa là lấy max giữa việc chọn $a_i$ và không chọn $a_i$.

***Hướng tiếp cận:*** 
- Khác với bài toán trên mảng một chiều, bài toán của chúng ta cần phải giải trên một cấu trúc cây. Vậy đầu tiên ta cần đặt gốc cho cây, giả sử đó là nút 1 (dfs từ 1), sau đó đặt $dp_u$ là kết quả cho bài toán con ở cây con gốc $u$, thì kết quả cuối cùng sẽ là $dp_1$.

***Công thức truy hồi:***
- Bây giờ, giống với bài toán trên mảng $1$ chiều, ta sẽ thử chọn nút $u$ hoặc không chọn nút $u$. Nếu ta chọn nút $u$, thì không được chọn các nút con trực tiếp của $u$; ngược lại nếu không chọn nút $u$ thì có thể chọn bất kỳ nút con nào của $u$. Như vậy công thức có thể viết ở dạng khái quát như sau:
$$dp_u = max(dp_v, c_u + \sum(\text{mọi }dp_j)), \text{v là con của u và j là các nút con của v}$$

- Để đơn giản hóa, ta đặt $f_u$ và $g_u$ lần lượt là tổng lớn nhất thu được trên cây con gốc $u$, có chọn nút $u$ và không chọn nút $u$. Kết quả cuối cùng sẽ là $\text{max}f_1, g_1)$. Khi đó, công thức quy hoạch động sẽ trở nên rất đơn giản: 
    - $f_u=c_u + \sum(g_v), \text{v là con của u}$ (chọn $u$ nên không được chọn con của nó).
    - $g_u=\sum(\text{max}(f_v, g_v)), \text{v là con của u}$ (không chọn $u$ nên có thể chọn con của nó, nhưng bài toán ở nút con $v$ cũng có thể chọn hoặc không chọn $v$).

- Lưu ý rằng, kết quả của bài toán ở một nút $u$ sẽ phụ thuộc vào tất cả các nút con của nó, do đó ta sẽ gọi đệ quy với tất cả các con của $u$ rồi cuối cùng mới cập nhật lên nút $u$ khi đã duyệt xong nhanh dfs gốc $u$.

***Độ phức tạp:*** Giải thuật có độ phức tạp bằng với độ phức tạp của thao tác DFS là $O\big(N + (N - 1)\big) \approx O(N)$.

***Cài đặt:***

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 1e5 + 10;
int c[maxn], f[maxn], g[maxn];
vector < int > adj[maxn]; // Danh sách kề của các nút.

void dfs(int u, int par_u)
{
    // Hai biến tổng lưu sum(g[v]) và sum(max(f[v], g[v]))
    int sum_f = 0, sum_g = 0;

    for (int v: adj[u])
    {
        if (v == par_u)
            continue;

        dfs(v, u);

        sum_f += g[v];
        sum_g += max(f[v], g[v]);
    }

    f[u] = c[u] + sum_f;
    g[u] = sum_g;
}

int main()
{
    int N;
    cin >> N;

    for (int i = 1; i <= N; ++i)
        cin >> c[i];

    for (int i = 1; i < N; ++i)
    {
        int u, v;
        cin >> u >> v;

        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    dfs(1, 0);

    cout << max(f[1], g[1]);
}
```

## Bài toán 2

***Đề bài:*** Cho một cây $T$ gồm $N$ đỉnh $(N \le 10^5)$. Một cây con của cây $T$ là một cách xóa đi một số đỉnh cùng các cạnh liên thuộc với nó, sao cho các đỉnh còn lại vẫn liên thông. Trọng số của một cây là tổng trọng số của tất cả các cạnh trên cây đó, nếu như cây chỉ có $1$ đỉnh thì xem như trọng số là $0$. Hãy xác định cây con có trọng số lớn nhất?

***Hướng tiếp cận:*** Đặt $dp_u$ là trọng số của cây con lớn nhất với gốc là $u$. Giả sử $u$ có các nút con là $v_1, v_2,..., v_k$. Từ cây con ban đầu chỉ bao gồm đỉnh $u$, ta sẽ thử thêm các nhánh gốc $v_1, v_2,.., v_k$ nối vào nếu như trọng số mới tạo thành là một số không âm. Ta sẽ đặt gốc của cây là đỉnh $1$, kết quả sẽ là $\text{max}(dp_u), 1 \le u \le N$.

***Công thức truy hồi:*** 
$$dp_u+=dp_u+(dp_{v_i} + c_{u, v_i}); \forall i:1 \le i \le N$$

***Cài đặt:***

```cpp
#include <bits/stdc++.h>
#define int long long
#define task "MaxTree."
#define inf 1e9 + 7
#define x first
#define y second

using namespace std;
const int maxn = 50001;
int N, dp[maxn];
vector < pair < int, int > > adj[maxn]; // Danh sách kề và trọng số cạnh của các đỉnh.

void enter()
{
    cin >> N;

    for (int i = 1; i < N; ++i)
    {
        int u, v, c;
        cin >> u >> v >> c;

        adj[u].push_back({v, c});
        adj[v].push_back({u, c});
    }
}

void dfs(int u, int par)
{
    dp[u] = 0; // Khởi tạo cây con đầu tiên chỉ gồm đỉnh u.

    for (auto vertex: adj[u])
    {
        int v = vertex.first, c = vertex.second;

        if (v == par)
            continue;

        dfs(v, u);

        if (dp[v] + c > 0)
            dp[u] += (dp[v] + c);
    }
}

void solution()
{
    dfs(1, 0);

    int res = *max_element(dp + 1, dp + 1 + N);
    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    enter();
    solution();

    return 0;
}
```

Vừa rồi là những bài toán cơ bản để bạn đọc có những hình dung cụ thể về quy hoạch động trên cây. Bây giờ chúng ta sẽ đi vào nghiên cứu một số bài toán nâng cao hơn.


### Bài toán 3

***Đề bài:*** Cho một cây $T$ gồm $N$ đỉnh, hãy tính độ dài đường đi dài nhất giữa hai nút bất kỳ trên cây (còn gọi là đường kính của cây). Độ dài đường đi giữa hai nút trên cây được tính bằng số cạnh đi qua trên đường đi đó.

***Hướng tiếp cận:*** Đầu tiên, đặt gốc của cây ở nút $1$. Với mỗi nút $x$ của cây, sẽ tồn tại hai đường đi dài nhất như sau: 
- Đường đi dài nhất xuất phát từ $x$, đi vào một nút thuộc cây con gốc $x$. Đặt đường đi này là $f(x)$ (đường màu xanh).
- Đường đi dài nhất xuất phát từ $1$ đỉnh $u$ thuộc cây con gốc $x$, đi qua $x$ rồi kết thúc tại một đỉnh $v$ cũng thuộc cây con gốc $x$ $(u \ne v)$. Gọi đường đi này là $g(x)$ (đường màu đỏ). 

![](https://images.viblo.asia/b4e9f0b6-d273-48a5-b9d7-c85829e44589.jpg)


- Nếu như ta tính $\text{max}(f(x), g(x))$ của mọi nút $x$ trên cây, thì ta sẽ tìm được đường kính của cây. Bây giờ ta sẽ xem xét cách tính các giá trị $f(x)$ và $g(x)$.

***Công thức truy hồi:***
- Giả sử một nút $u$ có các nút con lần lượt là $v_1, v_2,...,v_k$, vậy $f_u = 1 + \text{max}(f_{v_1}, f_{v_2},..., f_{v_k})$ (Có thêm $1$ cạnh nối giữa nút $u$ và nút con có $f_v \text{ max})$.
- Đối với $g_u$, vì đường đi này sẽ xuất phát từ 1 đỉnh $v_1$ và kết thúc tại một đỉnh $v_2$ cùng thuộc cây con gốc $u$. Mà ta cần đường đi này dài nhất, nên công thức là $g_u = 2 + \text{(2 giá trị lớn nhất trong tập }\{f_{v_1}, f_{v_2},..., f_{v_k}\})$ (Có thêm hai cạnh nối giữa $u$ và $v_1, v_2)$. 

***Đánh giá độ phức tạp:*** Độ phức tạp tổng quát của giải thuật là $O(Nlog(N)),$ vì trong khi $\text{DFS},$ ta cần sử dụng thêm một cấu trúc dữ liệu `priority_queue` hoặc `set` để tăng tốc thuật toán.

***Cài đặt:*** Khi tính toán trên cây con gốc $u$, ta cần phải lưu trữ hết các giá trị $f(v)$ với $v$ là con của $u$ để lấy hai giá trị lớn nhất trong tập đó. Để làm việc này ta có thể lưu các giá trị $f(v)$ vào một set hoặc `priority_queue` trong quá trình $\text{DFS}$ xuống các nút con của $u$.

```cpp
int diameter, f[maxn], y[maxn];

void dfs(int u, int par)
{
    priority_queue < int > f_values;

    for (int v: adj[u])
    {
        if (v == par)
            continue;

        dfs(v, u);

        f_values.push(f[v]);
    }

    f[u] = 0;

    if (!f_values.empty())
        f[u] = 1 + f_values.top();
    if (f_values.size() >= 2)
    {
        g[u] = 2 + f_values.top();
        f_values.pop();
        g[u] += f_values.top();
    }

    diameter = max(diameter, max(f[u], g[u]));
}
```

## Bài toán 4

***Đề bài:*** Cho một cây gồm $N$ đỉnh và $N-1$ cạnh. Đỉnh thứ $i$ của cây được gán một nhãn $c_i\text{ }(1≤i≤N)$ – gọi là trọng số của đỉnh $i$. Định nghĩa một cây con của cây ban đầu là một cách chọn ra một số đỉnh của cây ban đầu sao cho chúng vẫn liên thông với nhau. Trọng số của cây con được tính bằng tổng trọng số của tất cả các đỉnh trên cây con đó. Hãy tìm cây con gồm đúng $P$ đỉnh có tổng trọng số lớn nhất?

***Hướng tiếp cận:*** 
- Vẫn giống như các bài trước, ta sẽ hướng đến đặt hàm mục tiêu trên cây con gốc $u$. Ở bài này, các đỉnh được chọn cần phải liên thông, nên ta sẽ đặt $f_{u, j}$ là trọng số lớn nhất thu được trên cây con gốc $u$ khi chọn $j$ đỉnh liên thông (bao gồm cả đỉnh $u$). Không cần thiết phải xét trường hợp không chọn đỉnh $u$, vì nếu không chọn đỉnh $u$ thì phải chọn đủ $j$ đỉnh trên một nhánh con nào đó của nó (không thể chọn trên nhiều nhánh con mà không chọn đỉnh $u$ vì khi đó tập đỉnh chọn ra sẽ không liên thông được), và bài toán lại trở thành chọn $j$ đỉnh trên một cây con gốc $v$ (bao gồm cả $v$).
- Đặt gốc của cây là đỉnh $1$. Giả sử đỉnh $u$ có $k$ đỉnh con là $v_1, v_2,..., v_k$. Giờ để tính $f_{u, j}$, ta cần chọn ra $(j - 1)$ đỉnh liên thông ở các nhánh con của $u$ (1 đỉnh chính là $u$). Bài toán lại trở thành tìm $(j - 1)$ đỉnh trên $k$ nhánh con sao cho tổng trọng số là lớn nhất. Ta sẽ đặt $g_{i, j}$ là tổng trọng số lớn nhất thu được khi chọn $j$ đỉnh trên các nhánh con $v_1, v_2,..., v_i$. Trước khi tính $f_{u, j},$ quy hoạch động tính các $g_{v, j}$ trước, cuối cùng $f_{u, j}=g_{k, j - 1} + c_u$.

***Công thức truy hồi:*** 
- Tính $g_{i, j}:$ Xét tới cây con gốc $v_i$, có thể chọn từ các cây con gốc $v_1, v_2,..., v{i - 1}$ đúng $k$ đỉnh, vậy cần chọn tiếp $j - k$ đỉnh từ cây con gốc $v_i$. Ta có công thức:
$$g_{i, j} = \begin{cases} \text{max}(g_{i - 1, k}, f_{v_i, j - k})\\ 0 \le j < P; 0 \le k \le j \end{cases}$$

- Tính $f_{u, j}:$ $f_{u, j}=g_{k, j - 1}+c_u; 1 \le j \le P$.

***Cài đặt:***

```cpp
void dfs(int u, int par)
{
    for (int v: adj[u])
    {
        if (v == par)
            continue;

        dfs(v, u);
    }

    fill(g[0] + 1, g[0] + 1 + P, -inf);

    int i = 0;
    for (int v: adj[u])
    {
        if (v == par)
            continue;

        ++i; // Đếm số thứ tự các nút con của nút u.

        // Tính các g[i][j] cho mỗi f[u][j]. Lưu ý ở mỗi f[u][j] lại phải 
        // tính lại một lần tất cả các g[i][j].
        for (int j = 0; j < P; ++j)
        {
            g[i][j] = -inf;

            for (int k = 0; k <= j; ++k)
                g[i][j] = max(g[i][j], g[i - 1][k] + f[v][j - k]);
        }
    }

    f[u][0] = 0;
    f[u][1] = c[u];
    for (int j = 2; j <= P; ++j)
        f[u][j] = g[i][j - 1] + c[u];
}

void solution()
{
    for (int i = 1; i <= N; ++i)
        fill(f[i], f[i] + 1 + P, -inf);

    dfs(1, 0);

    int res = -inf;
    for (int u = 1; u <= N; ++u)
        res = max(res, f[u][P]);
    cout << res;
}
```

## Bài toán 5

***Đề bài:*** Đất nước Delta là quốc đảo lớn nhất thế giới, tuy nhiên lại rất nghèo khó. Đất nước gồm tổng cộng $N \text{ }(N \le 10^5)$ hòn đảo nhỏ được đánh số từ $1$ tới $N$, nhà nước phải rất khó khăn mới xây dựng được $N-1$ tuyến phà đảm bảo giữa hai hòn đảo bất kỳ đều tới được nhau, tuyến phà thứ $i$ có độ dài là $l_i$. Những tuyến phà di chuyển khá chậm chạp với vận tốc $VP \text{ }(m/s)$. Gần đây, đất nước Delta đột nhiên nhận được sự đầu tư của các nhà tư bản để phát triển du lịch, họ quyết định xây dựng $K$ cây cầu để thay thế cho $K$ tuyến phà bất kỳ. Nếu như di chuyển trên cầu, thì vận tốc di chuyển sẽ là $VC \text{ }(m/s)$. Cần chọn ra $K$ tuyến phà để xây cầu thay thế sao cho tổng thời gian để đi lại giữa mọi cặp đảo là nhỏ nhất (đường đi giữa hai đảo $A$ và $B$ coi như chỉ tính một lần từ $A$ tới $B$, không xét đi từ $B$ về $A$).

***Hướng tiếp cận:*** Để biết được cần thay thế những con đường nào, ta cần tính xem với con đường thứ $i$, nếu thay phà bằng cầu thì tổng thời gian đi lại sẽ giảm đi bao nhiêu, từ đó chọn ra $K$ con đường có chênh lệch thời gian di chuyển nhiều nhất để xây cầu thay thế. Đặt $h_u$ là số lượng đỉnh thuộc cây con gốc $u$ và $dp_i$ là thời gian di chuyển giảm đi nếu như thay tuyến phà thứ $i$ bằng một cây cầu.

***Công thức truy hồi:***
- Tính $h_u$: Khi bắt đầu $\text{DFS}$, đặt $h_u=1$ (mọi cây con đều có $1$ đỉnh là chính nó). Giả sử đỉnh $u$ có các đỉnh con là $v_1, v_2,..., v_m$, thì $h_u = h_u+ \sum_{i=1}^m v_i$.
- Tính $dp_i$: 
    - Giả sử cạnh thứ $i$ nối hai đỉnh $(u, v)$. Nếu bỏ cạnh này đi thì đồ thị chia làm hai cây con: Thứ nhất là cây con gốc $v$, thứ hai là $(N-h[v])$ đỉnh còn lại. Các đỉnh thuộc cây con gốc $v$ đều phải đi qua cạnh $(u, v)$ để tới được các đỉnh còn lại không thuộc cây con gốc $v$. Vậy số lần cạnh thứ $i$ được sử dụng là: $t_i=h_v \times (N-h_v)$.
    - Tổng chi phí giảm đi trên cạnh thứ $i$ sẽ là $dp_i=t_i \times (\frac{l_i}{VP} - \frac{l_i}{VC})=\frac{t_i \times l_i \times (VC-VP)}{VC \times VP}$.

***Cài đặt:***

```cpp
const int maxn = 1e5 + 10;

// Cấu trúc kề của 1 đỉnh, gồm đỉnh kề, độ dài cạnh và vị trí cạnh.
struct edge 
{
    int v, l, pos;
};

int N, K, VP, VC;
double dp[maxn], n_children[maxn];
vector < edge > adj[maxn];
priority_queue < pair < double, int > > route_minimize_cost;

void enter()
{
    cin >> N >> K >> VP >> VC;

    for (int i = 1; i < N; ++i)
    {
        int u, v, l;
        cin >> u >> v >> l;

        adj[u].push_back({v, l, i});
        adj[v].push_back({u, l, i});
    }
}

void dfs(int u, int par)
{
    n_children[u] = 1;

    for (edge adjacent: adj[u])
    {
        int v = adjacent.v, l = adjacent.l, p = adjacent.pos;

        if (v == par)
            continue;

        dfs(v, u);

        // Tính các giá trị h[u] và dp[i].
        n_children[u] += n_children[v];

        double cost_minimize = (double)l * (double)(VC - VP) / (double)(VC * VP);
        dp[p] = n_children[v] * (N - n_children[v]) * cost_minimize;

        // Lưu dp[i] vào 1 priority_queue để lấy ra K giá trị lớn nhất.
        route_minimize_cost.push({dp[p], p});
    }
}

void solution()
{
    dfs(1, 0);

    int replace_route = 0;
    while (replace_route < K)
    {
        ++replace_route;

        // Đưa ra số hiệu các tuyến phà bị thay thế.
        cout << route_minimize_cost.top().second << ' ';
        route_minimize_cost.pop();
    }
}
```

# III. Nhận xét chung về phương pháp

Đối với những bài toán quy hoạch động trên cây, bước $1$ chúng ta luôn luôn đặt gốc cho cây, sau đó tiến hành $\text{DFS}$ từ gốc đó đi xuống.

Khi đặt hàm mục tiêu, thông thường ta sẽ chú ý đến việc đặt hàm mục tiêu hướng đến tính kết quả trên cây con gốc $u$ của cây ban đầu, rồi dựa vào các nút con của $u$ để tính ra bài toán của cây con gốc $u$. Cần lưu ý xem bài toán ở cây gốc u có thể tính liên tục hay cần phải tính hết các bài toán ở các nút con $v$ của nó rồi mới được tính chính nó.

Sau khi đã gọi hàm mục tiêu hướng đến cây con gốc $u$, ta mới xem xét thêm các trạng thái để kiểm soát các điều kiện khác của bài toán. Các trạng thái có thể là chọn đỉnh $u$ hoặc không chọn đỉnh $u$, hay chọn bao nhiêu đỉnh trong cây con gốc $u$,...

# IV. Tài liệu tham khảo

- [https://codeforces.com/blog/entry/20935](https://)
- [https://vnoi.info/problems/list/?tag=65&page=1](https://)