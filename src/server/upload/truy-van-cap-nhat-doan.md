Trong chuyên đề này, tôi sẽ chia sẻ tới các bạn một kĩ thuật khá hữu ích trong các kì thi lập trình, sử dụng cho các bài toán liên quan tới nhiều truy vấn cập nhật tăng/giảm một đoạn liên tiếp trên dãy số hoặc ma trận. Chúng ta sẽ tiếp cận các kĩ thuật này thông qua một số bài toán cụ thể để cho dễ hình dung. Những bài toán tôi giới thiệu dưới đây cũng có thể coi là những kĩ thuật cơ bản của truy vấn cập nhật đoạn, ta sẽ áp dụng chúng như một bước của thuật toán trong những bài toán lớn hơn.

# Bài toán 1

## Đề bài

Cho dãy số nguyên $A$ gồm $n$ phần tử $a_1, a_2, \dots, a_n$. Ban đầu tất cả các phần tử đều mang giá trị $0$. Bạn cần thực hiện $Q$ thao tác cập nhật trên dãy số này, với mỗi thao tác, cần tăng đoạn gồm các phần tử từ vị trí $l$ tới vị trí $r$ của dãy số thêm $k$ đơn vị.

***Yêu cầu:*** Tìm giá trị lớn nhất của dãy số sau khi thực hiện xong cả $Q$ thao tác cập nhật?

***Input:***

- Dòng đầu tiên chứa hai số nguyên dương $n$ và $Q$ - độ dài dãy số và số lượng thao tác cập nhật.
- $Q$ dòng tiếp theo, mỗi dòng chứa ba số nguyên dương $l, r, k$ thể hiện một thao tác cập nhật.

***Ràng buộc:***

- $1 \le n \le 10^5$.
- $1 \le Q \le 10^5$.
- $1 \le k \le 10^9$.

***Output:***

- In ra giá trị lớn nhất của dãy số sau $Q$ thao tác cập nhật.

***Sample Input:***

```
5 4
1 4 3
2 5 3
1 5 10
2 2 1
```

***Sample Output:***

```
17
```

## Ý tưởng

Với bài toán này, hiển nhiên cách làm sử dụng hai vòng lặp để cập nhật lại dãy số với từng truy vấn sẽ không thỏa mãn thời gian chạy, vì độ phức tạp sẽ lên tới $O(Q \times n)$.

Tuy nhiên, ta có thể cải tiến cách làm như sau để giảm độ phức tạp: Ứng với mỗi truy vấn $(l, r, k)$:

- Cộng thêm $k$ vào $a_l$.
- Trừ đi $k$ ở $a_{r + 1}$.

Sau khi làm hết như vậy với $Q$ truy vấn, sau đó thực hiện cộng dồn từ đầu mảng ra cuối mảng:

$$a_i = a_i + a_{i - 1}; \forall i: 2 \le i \le n$$

Như vậy ta có được mảng số nguyên sau khi cập nhật. Cuối cùng chỉ cần in ra phần tử lớn nhất của mảng.

Độ phức tạp thu được là: $O(n + q)$.

## Cài đặt 

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>
#define int long long

using namespace std;

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    cin >> n >> q;

    vector < int > a(n + 2);

    while (q--)
    {
        int l, r, k;
        cin >> l >> r >> k;

        a[l] += k;
        a[r + 1] -= k;
    }

    for (int i = 1; i <= n; ++i)
        a[i] += a[i - 1];

    cout << *max_element(a.begin() + 1, a.begin() + n);

    return 0;
}
```

***Ngôn ngữ Python:***

```python
if __name__ == '__main__':
    n, q = map(int(input().split()))
    a = [0] * (n + 2)

    for _ in range(q):
        l, r, k = map(int, input().split())

        a[l] += k
        a[r + 1] -= k

    for i in range(1, n + 1):
        a[i] += a[i - 1]
    
    res = 0
    for i in range(1, n + 1):
        res = max(res, a[i])

    print(res)
```

## Bài toán 2

## Đề bài

Cho dãy số $A$ gồm $n$ phần tử, các phần tử được đánh số từ $1$ tới $n$. Ban đầu tất cả các phần tử trong mảng đều mang giá trị $0$. Người ta tiến hành điều chỉnh dãy số bằng $Q$ thao tác có dạng $[l,r];$ với mỗi thao tác, phần tử $a_l$ sẽ tăng thêm $1$ đơn vị, phần tử $a_{l + 1}$ tăng thêm $2$ đơn vị,..., $a_r$ tăng thêm $r-l+1$ đơn vị.

***Yêu cầu:*** Hãy đưa ra dãy số sau khi tất cả các thao tác được thực hiện?

***Input:***

- Dòng đầu chứa hai số nguyên $n$ và $Q$ – số lượng phần tử trong mảng và số thao tác điều chỉnh.
- $Q$ dòng tiếp theo, mỗi dòng chứa hai số nguyên $l,r$ – biểu thị một thao tác điều chỉnh.

***Ràng buộc:***

- $1≤n ≤ 10^6$. 
- $1≤Q ≤ 2×10^5$.
- $1≤l≤r≤n$.

***Output:***

- Đưa ra $n$ số nguyên là các phần tử của dãy số sau khi thực hiện $Q$ thao tác cập nhật, các số phân tách nhau bởi dấu cách.

***Sample Input:***

```
5 3
1 2 
2 5 
3 4 
```

***Sample Output:***

```
1 3 3 5 4
```

## Ý tưởng

Vẫn tương tự như bài toán trước, ta không thể sử dụng hai vòng lặp để giải quyết bài tập này. Thay vào đó, ta sẽ tìm cách đưa nó về bài toán cơ bản vừa rồi.

Xét truy vấn [l, r]; việc cập nhật sẽ diễn ra như sau:
- $a_l += 1$.
- $a_{l + 1} += 2$.
$\dots$
- $a_r += (r - l + 1)$.

Cộng thêm $0 = (l - 1) - (l - 1)$ vào vế phải của các phép biến đổi, ta có:
- $a_l = \big[1 + (l - 1)\big] - (l - 1) = l - (l - 1)$.
- $a_{l + 1} = \big[2 + (l - 1)\big] - (l - 1) = (l + 1) - (l - 1)$.
$...$
- $a_r = \big[(r - l + 1) + (l - 1)\big] - (l - 1) = r - (l - 1)$.

Như vậy, ta có thể tách truy vấn $[l, r]$ thành hai truy vấn nhỏ:
- Truy vấn $1$: Giảm đoạn $[l, r]$ đi $(l - 1)$ đơn vị. Truy vấn này giống bài toán cập nhật đoạn cơ bản số $1$.
- Truy vấn $2$: Với mỗi $i$ thuộc $[l, r];$ tăng $a_i$ lên $i$ đơn vị. Truy vấn này ta có thể đếm số lần $a_i$ được tăng lên bằng mảng $\text{i\_count[i]},$ như vậy sau khi xử lý xong ta chỉ cần cập nhật $a_i = i \times \text{i\_count}[i]$. Việc cập nhật mảng $\text{i\_count}[i]$ cũng có thể thực hiện giống như bài toán cập nhật đoạn cơ bản.

## Cài đặt 

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>
#define int long long

using namespace std;

const int maxn = 1e6 + 10;
int n, q, decrease[maxn], i_count[maxn], a[maxn];

void update_queries(int l, int r)
{
    // Truy vấn nhỏ 1: Giảm đoạn [l, r] đi (l - 1) đơn vị.
    decrease[l] -= (l - 1);
    decrease[r + 1] += (l - 1);

    // Truy vấn nhỏ 2: Vì a[i] += i, nên ta đếm số lần a[i] được tăng, 
    // rồi lưu vào mảng i_count[i].
    i_count[l]++;
    i_count[r + 1]--;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    cin >> n >> q;

    while (q--)
    {
        int l, r;
        cin >> l >> r;

        update_queries(l, r);
    }

    for (int i = 1; i <= n; ++i)
    {
        decrease[i] += decrease[i - 1];
        i_count[i] += i_count[i - 1];
        a[i] = decrease[i] + i * i_count[i];

        cout << a[i] << ' ';
    }

    return 0;
}
```

***Ngôn ngữ Python:***

```python
def update_queries(l, r, decrease, i_count):
    # Truy vấn nhỏ 1: Giảm đoạn [l, r] đi (l - 1) đơn vị.
    decrease[l] -= (l - 1)
    decrease[r + 1] += (l - 1)

    # Truy vấn nhỏ 2: Vì a[i] += i, nên ta đếm số lần a[i] được tăng, 
    # rồi lưu vào mảng i_count[i].
    i_count[l] += 1
    i_count[r + 1] -= 1


if __name__ == '__main__':
    n, q = map(int, input.split())

    decrease = [0] * (n + 2)
    i_count = [0] * (n + 2)

    for _ in range(q):
        l, r = map(int, input().split())

        update_queries(l, r, decrease, i_count)

    a = [0] * (n + 1)
    for i in range(1, n + 1):
        decrease[i] += decrease[i - 1]
        i_count[i] += i_count[i - 1]
        a[i] = decrease[i] + i * i_count[i]
        
        print(a[i], end=' ')
```

## Bài toán 3

## Đề bài

Cho một bảng kích thước $m \times n$ ($m$ dòng, $n$ cột). Ucoder muốn thực hiện $Q$ truy vấn trên bảng này, mỗi truy vấn có dạng $(x_1, y_1, x_2, y_2, val)$ yêu cầu cộng vào tất cả các ô thuộc hình chữ nhật có góc trái trên là $(x_1, y_1)$ và góc phải dưới là $(x_2, y_2)$ một giá trị bằng $val$. 

***Yêu cầu:*** Hãy thực hiện các truy vấn và in ra bảng số sau khi thực hiện hết $Q$ truy vấn?

***Input:***

- Dòng đầu tiên chứa ba số nguyên dương $m, n$ và $Q$ - kích thước bảng và số truy vấn.
- $m$ dòng tiếp theo, mỗi dòng chứa $n$ số nguyên $a_{i, j}$ thể hiện một dòng của bảng số.
- $Q$ dòng tiếp theo, mỗi dòng ghi năm số nguyên thể hiện một truy vấn.

***Ràng buộc:***

- $1 \le m, n \le 1000$.
- $1 \le Q \le 10^5$.
- $|a_{i, j}| \le 10^9; \forall i, j: 1 \le i \le m, 1 \le j \le n$.
- $1 \le val \le 10^9$.

***Output:***

- In ra bảng số sau khi thực hiện hết $Q$ truy vấn.

***Sample Input:***

```
3 3 2
1 2 3
0 2 2
3 3 5
1 1 2 2 -1
2 2 3 3 2
```

***Sample Output:***

```
0 1 3
-1 3 4
3 5 7
```

## Ý tưởng

Ta sẽ phát triển cách làm lần lượt từ dễ đến khó.

### Các cách làm đơn giản

Cách đơn giản nhất là với mỗi truy vấn, sử dụng hai vòng lặp để duyệt qua hình chữ nhật tương ứng (hàng từ $x_1 \to x_2,$ cột từ $y_1 \to y_2$) và cập nhật trực tiếp trên ma trận. Độ phức tạp của cách này là $O(Q \times m \times n)$.

Ta có thể cải tiến một chút như sau: Ứng với mỗi truy vấn, ta sẽ cập nhật trên từng hàng $x$ từ $x_1$ tới $x_2$ bằng kĩ thuật cập nhật đoạn trên mảng một chiều:

$$a[x][y_1] = a[x][y_1] + val, a[x][y_2 + 1] = a[x][y_2 + 1] - val$$

Sau đó, duyệt lại toàn bộ ma trận và cập nhật trên từng hàng từ trước ra sau:

$$a[x][j] = a[x][j - 1] + a[x][j]; \forall j: 2 \le j \le n$$

Ta sẽ thu được ma trận đã cập nhật. Lúc này độ phức tạp giảm xuống còn: $O(Q \times m)$. Nhưng như vậy vẫn chưa đủ tốt, ta cần một cách làm tốt hơn.

### Cách làm tối ưu

Ta sẽ cập nhật các hình chữ nhật con dựa trên ý tưởng tương tự với tổng tiền tố trên ma trận.

Sử dụng bảng $b[i][j]$ để lưu các cập nhật diễn ra ở các truy vấn, $b[i][j]$ sẽ là giá trị cập nhật thêm của hình chữ nhật con $(1, 1, i, j)$.

Xét một yêu cầu cập nhật $(x_1, y_1, x_2, y_2, val),$ ta sẽ cập nhật hình chữ nhật con như sau:

$$\begin{cases}b[x_2][y_2] = b[x_2][y_2] + val.\\ b[x_1 - 1][y_2] = b[x_1 - 1][y_2] + val.\\ b[x_2][y_1 - 1] = b[x_2][y_1 - 1] + val. \\ b[x_1 - 1][y_1 - 1] = b[x_1 - 1][y_1 - 1] - val. \end{cases}$$

Theo cách cập nhật này, thì ta thấy rằng, mỗi một ô trong hình chữ nhật con $(x, y, m, n)$ được cập nhật đều sẽ khiến cho ô $(x, y)$ bị cập nhật tăng lên. Vì thế, tổng giá trị tăng thêm sau $Q$ lần cập nhật của ô $(x, y)$ sẽ là tổng hình chữ nhật con $(x, y, m, n)$ trên mảng $b$.

Vậy sau khi cập nhật xong, ta tính lại mảng $b$ bằng quy hoạch động hình chữ nhật trên chính nó theo công thức:

$$b[i][j] = b[i + 1][j] + b[i][j + 1] - b[i + 1][j + 1] + b[i][j]$$

Rồi lấy $a[i][j] + b[i][j]$ để thu được kết quả tại ô $(i, j)$ sau khi cập nhật.

Độ phức tạp: $O(m \times n)$.

## Cài đặt 

***Ngôn ngữ C++:***

```cpp
#include <bits/stdc++.h>
#define int long long
#define task "table."

using namespace std;

const int max_size = 1010;
int a[max_size][max_size], b[max_size][max_size];

void query(int m, int n, int a[][max_size], int b[][max_size])
{
    int x1, y1, x2, y2, val;
    cin >> x1 >> y1 >> x2 >> y2 >> val;

    b[x2][y2] += val;
    b[x1 - 1][y2] -= val;
    b[x2][y1 - 1] -= val;
    b[x1 - 1][y1 - 1] += val;
}

void print_result(int m, int n, int a[][max_size], int b[][max_size])
{
    // Cập nhật lại bảng b cho chính xác.
    for (int i = m; i >= 1; --i)
        for (int j = n; j >= 1; --j)
            b[i][j] = b[i + 1][j] + b[i][j + 1] - b[i + 1][j + 1] + b[i][j];

    // Tính kết quả đã cập nhật trên bảng a.
    for (int i = 1; i <= m; ++i)
    {
        for (int j = 1; j <= n; ++j)
            cout << a[i][j] + b[i][j] << ' ';

        cout << endl;
    }
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int m, n, q;
    cin >> m >> n >> q;

    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= n; ++j)
            cin >> a[i][j];

    for (int i = 1; i <= q; ++i)
        query(m, n, a, b);

    print_result(m, n, a, b);

    return 0;
}
```

Các bạn có thể luyện tập thêm về dạng bài tập này tại series Range Queries của CSES, tôi để link tại đây: https://cses.fi/problemset/task/1646.