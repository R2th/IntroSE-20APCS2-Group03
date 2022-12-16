# I. Bài toán Cái túi và những bài toán áp dụng

## 1. Lời mở đầu

Bài toán Cái túi, Bài toán Xếp ba lô, Bài toán Knapsack,...là những tên gọi khác nhau mà chúng ta thường nghe đến, nhưng tất cả đều dùng để chỉ chung một bài toán ***tối ưu hóa tổ hợp***, trong đó ta cần phải lựa chọn một số đồ vật để nhét vào một chiếc túi với tải trọng biết trước, sao cho tổng giá trị của các đồ vật nhét vào là lớn nhất có thể. Bài toán này đã được nghiên cứu trong hơn một thế kỷ, và nó là một trong những bài toán có ứng dụng vô cùng to lớn trong thực tế.


	
![](https://cdn.ucode.vn/uploads/2247/upload/vbjvCeRA.png)


Có rất nhiều dạng khác nhau của bài toán cái túi mà tôi đã giới thiệu tới các bạn ở những chuyên đề trước. Những dạng tiêu biểu của bài toán này có thể kể đến là:

- Bài toán Knapsack với các giá trị số thực: Trọng lượng và giá trị của các món đồ là số thực. Bài toán này chỉ có thể giải quyết bằng phương pháp Quay lui (hoặc cải tiến bằng Nhánh cận).
- Bài toán Knapsack cho phép cắt nhỏ đồ vật (Fractional Knapsack): Các đồ vật được phép cắt ra và lấy một phần. Bài toán này có thể giải quyết bằng phương pháp Tham lam.
- Bài toán Knapsack $0 - 1$: Các vật chỉ có thể chọn hoặc không chọn, ngoài ra giá trị và trọng lượng của các vật đều là số nguyên. Bài toán này có thể giải bằng phương pháp Quy hoạch động.

Trong bài viết này, chúng ta sẽ cùng tập trung nghiên cứu bài toán Knapsack $0 - 1$ và một số ứng dụng của nó trong việc giải những bài toán Quy hoạch động có tư duy tương tự. 

## 2. Phát biểu bài toán

Cho $n$ đồ vật khác nhau, đồ vật thứ $i$ có trọng lượng $w_i$ và giá trị $v_i$. Bạn mang theo một chiếc túi có tải trọng tối đa là $W,$ nhiệm vụ của bạn là chọn ra các đồ vật để cho vào túi sao cho tổng giá trị của các đồ vật lấy được là lớn nhất có thể?

***Input:***

- Dòng đầu tiên chứa hai số nguyên dương $n$ và $W$.
- $n$ dòng tiếp theo, mỗi dòng chứa hai số nguyên dương $w_i$ và $v_i$ phân tách nhau bởi dấu cách.

***Output:***

- Dòng đầu tiên in ra tổng giá trị lớn nhất của các vật lấy được.
- Dòng thứ hai in ra chỉ số của các vật được lựa chọn theo thứ tự tăng dần.

***Sample Input:***

```
3 50
10 60
20 100
30 120
```

***Sample Output:***

```
220
2 3
```

## 3. Ý tưởng

Gọi $dp[i][j]$ là tổng giá trị lớn nhất của các đồ vật lấy được khi chọn trong các đồ vật từ $1$ tới $i$ và giới hạn tổng trọng lượng của chúng là $j$. Kết quả của bài toán là tổng giá trị lớn nhất chọn được trong $n$ vật với giới hạn trọng lượng là $W,$ sẽ chính là $dp[n][W]$.

Xét đồ vật thứ $i,$ và giới hạn trọng lượng hiện tại là $j,$ ta có hai phương án để lựa chọn:

- Nếu vật thứ $i$ không được chọn vào phương án tối ưu, thì kết quả tối ưu sẽ được chọn trong $(i - 1)$ đồ vật trước đó với giới hạn trọng lượng vẫn là $j$.
- Nếu vật thứ $i$ được chọn vào phương án tối ưu, thì tải trọng còn lại có thể sử dụng là $(j - w_i)$ cho $(i - 1)$ đồ vật phía trước, và ta được thêm giá trị $v_i$ của vật thứ $i$. Dĩ nhiên, trường hợp này chỉ xét đến khi $j \ge w_i$.

Dễ thấy rằng, nếu như $j < w_i$ thì chỉ có duy nhất cách lựa chọn đầu tiên, còn nếu $j \ge w_i$ thì có thể lựa chọn theo cả hai cách để lấy cách tốt hơn. Tổng hợp lại, ta có công thức quy hoạch động:

$$dp[i][j] = \begin{cases} dp[i - 1][j]; &\text{if } w_i > j. \\ \text{max}\big(dp[i - 1][j], dp[i][j - w_i] + v_i\big); &\text{if } w_i < j.\end{cases}$$

Cơ sở quy hoạch động dễ thấy là $dp[0][j] = 0,$ vì giá trị lớn nhất có thể chọn được trong số $0$ đồ vật thì vẫn là $0$.

Để truy vết lại các món đồ được chọn, ta sẽ đi ngược về trên bảng phương án, bắt đầu từ vị trí kết quả là $dp[n][W]$ (hàng $n,$ cột $W$). Nếu như $dp[n][W] = dp[n - 1][W]$ tức là món đồ thứ $n$ không được chọn, ta truy ngược về $dp[n - 1][W]$. Ngược lại nếu $dp[n][W] \ne dp[n - 1][W]$ nghĩa là phương án lựa chọn tối ưu có chứa món đồ thứ $n$ và truy ngược lên $dp[n - 1][W - w_n]$. Tiếp tục như vậy cho tới khi đi về tới hàng $0$ của bảng phương án (tức là cơ sở quy hoạch động) thì dừng lại.

## 4. Cài đặt

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>

using namespace std;

void enter(int &n, int &W, vector < pair < int, int > > items)
{
    cin >> n >> W;

    items.resize(n + 1);

    // Sử dụng kiểu pair để nhập dữ liệu các món đồ.
    // items[i].first và items[i].second lần lượt là trọng lượng và giá trị của đồ vật thứ i.
    for (int i = 1; i <= n; ++i)
        cin >> items[i].first >> items[i].second;
}

// Truy vết các món đồ được chọn.
void trace_back(int n, int W, vector < vector < int > > &dp, vector < pair < int, int > > &items)
{
    vector < int > picked_items;
    while (n > 0)
    {
        if (dp[n][W] == dp[n - 1][W])
            --n;
        else 
        {
            picked_items.push_back(n);
            W -= items[n].second;
            --n;
        }
    }

    for (int i = picked_items.size() - 1; i >= 0; --i)
        cout << picked_items[i] << ' ';
}

// Quy hoạch động.
void solution(int n, int W, vector < pair < int, int > > &items)
{
    vector < vector < int > > dp(n + 1, vector < int >(W + 1, 0));

    for (int i = 1; i <= n; ++i)
        for (int j = 0; j <= W; ++j)
        {
            dp[i][j] = dp[i - 1][j];

            if (j >= items[i].first)
                dp[i][j] = max(dp[i][j], dp[i - 1][j - items[i].first] + items[i].second);
        }

    // In kết quả.
    cout << dp[n][W] << endl;
    trace_back(n, W, dp, items);
}

main()
{
    int n, W;
    vector < pair < int, int > > items;

    enter(n, W, items);
    solution(n, W, items);
}
```

***Ngôn ngữ Python:***

```python
def enter(n, W, items):
    n, W = map(int, input().split())

    items = [(0, 0) for _ in range(n + 1)]
    for i in range(1, n + 1):
        items[i] = map(int, input().split())


def trace_back(n, W, dp, items):
    picked_items = []
    while n > 0:
        if dp[n][W] == dp[n - 1][W]:
            n += 1
        else:
            picked_items.append(n)
            W -= items[n][0]
            n += 1
    
    print(reverse(picked_items))


def solution(n, W, items):
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for j in range(0, W + 1):
            dp[i][j] = dp[i - 1][j]

            if j >= items[j][0]:
                dp[i][j] = max(dp[i][j], dp[i - 1][j - items[j][0]] + items[j][1])

    print(dp[n][W])
    trace_back(n, W, dp, items)
```

# II. Một số bài toán ứng dụng

## 1. Bài toán Cái túi vô hạn

### Đề bài

Một tên trộm mang theo một chiếc túi có tải trọng $W$ vào trong một tiệm đá quý. Trong tiệm có $n$ loại đá quý, loại thứ $i$ có khối lượng $w_i$ và giá trị $v_i,$ với số lượng viên đá mỗi loại là không giới hạn. Tên trộm cần chọn ra một số viên đá quý để mang theo sao cho tổng giá trị của chúng là lớn nhất có thể.

Xác định tổng giá trị đá quý lớn nhất mà tên trộm có thể mang theo với chiếc túi tải trọng $W?$

***Input:***

- Dòng đầu tiên chứa hai số nguyên dương $n$ và $W \ (1 \le n, W \le 1000)$.
- $n$ dòng tiếp theo, mỗi dòng chứa hai số nguyên dương $w_i$ và $v_i$ phân tách nhau bởi dấu cách $(1 \le w_i, v_i \le 100; \forall i: 1 \le i \le n)$.

***Output:***

- Dòng đầu tiên in ra tổng giá trị lớn nhất của các viên đá quý mà tên trộm lấy được.
- Dòng thứ hai in ra $n$ số nguyên $c_1, c_2, \dots, c_n$ với $c_i$ là số lần được chọn của viên đá quý thứ $i$.

***Sample Input:***

```
2 100
1 1
50 30
```

***Sample Output:***

```
100
100 0
```

***Explanation:***

Có rất nhiều cách để tên trộm mang theo các viên đá quý:

- Mang theo $2$ viên có khối lượng $50,$ tổng giá trị là $60$.
- Mang theo $100$ viên có khối lượng $1,$ tổng giá trị là $100$.
- Mang theo $1$ viên có khối lượng $50$ và $50$ viên có khối lượng $1,$ tổng giá trị là $80$.

Vậy ta chọn phương án thứ $2$.

### Ý tưởng

Khác với bài toán cái túi bản gốc, ở bài toán này chúng ta được phép chọn một đồ vật nhiều lần. Nghĩa là ở mọi thời điểm lựa chọn, tất cả các đồ vật đều có thể được sử dụng.

Vì thế, ta chỉ cần sử dụng mảng một chiều $dp[i]$ với ý nghĩa là tổng giá trị đá quý lớn nhất thu được với giới hạn tải trọng là $i$ thay vì mảng hai chiều như bài toán gốc. Xét giới hạn tải trọng $i$ và viên đá quý có khối lượng $w_j,$ giá trị $v_j$. Nếu như $i \ge w_j$ thì ta lại có thể lựa chọn viên đá này vào tập các viên đá được chọn. Từ đó hình thành công thức:

$$dp[i] = \text{max}\big(dp[i - w_j] + v_j\big); \forall j: 1 \le j \le n \text{ and } i \ge w_j$$

Kết quả cuối cùng tất nhiên là $dp[W]$.

Để truy vết, ta sử dụng một mảng $\text{chosen\_times}[i]$ là số lần được chọn của viên đá quý thứ $i$. Bắt đầu từ vị trí $dp[W]$ trên bảng phương án. Duyệt qua từng viên đá quý, nếu như tới viên thứ $i$ mà $dp[W] = dp[W - w_i] + v_i$ thì viên đá thứ $i$ được chọn $1$ lần, cập nhật tăng vị trí $\text{chosen\_times}[i]$ thêm $1$ và truy ngược về vị trí $dp[W - w_i]$ trên bảng phương án. Cứ làm như vậy cho tới khi $W = 0$ thì dừng lại.

Ta sẽ thu được giải thuật có độ phức tạp $O(W \times n)$.

### Cài đặt

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>

using namespace std;

void enter(int &n, int &W, vector < pair < int, int > > gems)
{
    cin >> n >> W;

    gems.resize(n + 1);
    for (int i = 1; i <= n; ++i)
        cin >> gems[i].first >> gems[i].second;
}

void trace_back(int n, int W, vector < int > &dp, vector < pair < int, int > > &gems)
{
    vector < int > chosen_times(n + 1, 0);
    while (W != 0)
    {
        for (int i = 1; i <= n; ++i)
            if (dp[W] == dp[W - gems[i].first] + gems[i].second)
            {
                W -= gems[i].first;
                ++chosen_times[i];
                break;
            }
    }

    for (int e: chosen_times)
        cout << e << ' ';
}

void solution(int n, int W, vector < pair < int, int > > gems)
{
    vector < int > dp(W + 1, 0);
    for (int i = 0; i <= W; ++i)
        for (int j = 1; j <= n; ++j)
            if (i >= gems[j].first)
                dp[i] = max(dp[i], dp[i - gems[j].first] + gems[j].second);

    cout << dp[W] << endl;
    trace_back(n, W, dp, gems);
}

main()
{
    int n, W;
    vector < pair < int, int > > gems;

    enter(n, W, gems);
    solution(n, W, gems);
}
```

***Ngôn ngữ Python:***

```python
def enter(n, W, gems):
    n, W = map(int, input().split())

    gems = [(0, 0) for i in range(n + 1)]
    for i in range(1, n + 1):
        gems[i] = map(int, input().split())


def trace_back(n, W, dp, gems):
    chosen_times = [0 for i in range(n + 1)]
    while W != 0:
        for i in range(1, n + 1):
            if dp[W] == dp[W - gems[i][0]] + gems[i][1]:
                W -= gems[i][0]
                chosen_times[i] += 1
                break

    print(chosen_times)


def solution(n, W, gems):
    dp = [0 for i in (W + 1)]
    for i in range(W + 1):
        for j in range(1, n + 1):
            if i >= gems[j][0]:
                dp[i] = max(dp[i], dp[i - gems[i][0]] + gems[i][1])

    print(dp[W])
    trace_back(n, W, dp, gems)


if __name__ == '__main__':
    n, W = 0, 0
    gems = []

    enter(n, W, gems)
    solution(n, W, gems)
```

## 2. Dãy con tổng bằng K

## Đề bài

Cho một dãy số $A$ gồm $n$ phần tử nguyên $a_1, a_2, \dots, a_n$ và một số nguyên $K$. Hãy đếm số dãy con không liên tiếp của dãy $A$ có tổng đúng bằng $K?$

***Input:***

- Dòng đầu tiên chứa hai số nguyên $n$ và $K \ (1 \le n \le 1000; 1 \le K \le 1000)$.
- Dòng thứ hai chứa $n$ số nguyên $a_1, a_2, \dots, a_n$ phân tách nhau bởi dấu cách $(1 \le a_i \le 1000; \forall i: 1 \le i \le n)$.

***Output:***

- Số nguyên duy nhất là số lượng dãy con có tổng bằng $K$. Kết quả có thể rất lớn, nên hãy in ra phần dư của kết quả sau khi chia cho $10^9 + 7$.

***Sample Input:***

```
4 6
1 2 3 3
```

***Sample Output:***

```
3
```

## Ý tưởng

Dễ nhận thấy, có tổng cộng $2^n$ dãy con, nên phương pháp quay lui duyệt mọi dãy con là hoàn toàn không khả thi.

Ý tưởng ở đây là sử dụng quy hoạch động với tư duy giống như bài toán cái túi. Gọi $dp[i][j]$ là số lượng dãy con chọn ra trong mảng con $A[1...i]$ có tổng là $j$. Khi xét tới phần tử $a_i,$ ta có thể:

- Không chọn $a_i$ vào dãy con, khi đó tổng số dãy con tạo ra sẽ là từ mảng con $A[1...i - 1]$ với tổng là $j,$ số lượng là $dp[i - 1][j]$. Trường hợp này có thể xảy ra với cả $j < a_i$ hay $j \ge a_i$.
- Chọn $a_i$ vào dãy con, khi đó ta còn lại tổng bằng $(j - a_i)$ phải tạo ra từ mảng con $A[1...i - 1],$ số dãy con tạo ra cũng sẽ tương ứng là $dp[i - 1][j - a_i]$. Dễ thấy trường hợp này chỉ xảy ra nếu như $j \ge a_i$.

Vậy ta có công thức truy hồi:

$$dp[i][j] = \begin{cases}dp[i - 1][j]; &\forall j < a_i. \\ dp[i - 1][j] + dp[i - 1][j - a_i]; &\forall j \ge a_i.  \end{cases}$$

Kết quả cuối cùng sẽ là $dp[n][K]$.

Cơ sở quy hoạch động như sau: $dp[i][0] = 1,$ vì luôn luôn có một dãy con rỗng tổng bằng $0$ chọn trong mảng con $A[1...i]$. Tất nhiên, $dp[0][0]$ cũng bằng $1$.

Độ phức tạp giải thuật: $O(n \times K)$.

## Cài đặt

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>

using namespace std;

const long long mod = 1e9 + 7;

void enter(int &n, int &K, vector < int > &a)
{
    cin >> n >> K;

    a.resize(n + 1);
    for (int i = 1; i <= n; ++i)
        cin >> a[i];
}

void solution(int n, int K, vector < int > &a)
{
    vector < vector < long long > > dp(n + 1, vector < long long > (K + 1, 0));
    for (int i = 0; i <= n; ++i)
        dp[i][0] = 1;

    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= K; ++j)
        {
            dp[i][j] = dp[i - 1][j];

            if (j >= a[i])
                (dp[i][j] += dp[i - 1][j - a[i]]) %= mod;
        }

    cout << dp[n][K];
}

main()
{
    int n, K;
    vector < int > a;

    enter(n, K, a);
    solution(n, K, a);
}
```

***Ngôn ngữ Python:***

```python
def solution(n, K, a):
    mod = 10 ** 9 + 7
    dp = [[0] * (K + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        dp[i][0] = 1

    for i in range(1, n + 1):
        for j in range(1, K + 1):
            dp[i][j] = dp[i - 1][j]

            if j >= a[i]:
                dp[i][j] = (dp[i][j] + dp[i - 1][j - a[i]]) % mod

    print(dp[n][K])


if __name__ == '__main__':
    n, K = map(int, input().split())
    a = [0 for i in range(n + 1)]
    for i in range(1, n + 1):
        a[i] = int(input())

    solution(n, K, a)
```

# III. Tài liệu tham khảo

- https://www.geeksforgeeks.org/count-of-subsets-with-sum-equal-to-x/
- http://www.or.deis.unibo.it/knapsack.html
- https://en.wikipedia.org/wiki/Knapsack_problem
- https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/