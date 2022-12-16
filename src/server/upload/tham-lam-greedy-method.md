# I. Tổng quan 

## 1. Giới thiệu phương pháp

Trong bài viết trước, mình đã giới thiệu tới các bạn về giải thuật Nhánh và Cận để giải bài toán tối ưu (nhấn vào <b><a href="https://hackmd.io/Qcdix6DPThy777xbHpcjDQ">đây</a></b> để đọc lại bài viết). Mặc dù phương pháp Nhánh và Cận đã cải tiến từ phương pháp Quay lui nhằm loại bỏ đi nhiều nhánh nghiệm không tốt, nhưng thực tế thì việc đánh giá các nghiệm mở rộng là rất khó, thậm chí không thể làm được. Hoặc nếu đã loại bỏ đi các cận thì số lượng phương án có thể sinh ra vẫn còn rất lớn, không thể duyệt hết được. Trong các bài toán như vậy, thì phương pháp ***Tham lam (Greedy Method)*** là một phương án rất được ưa chuộng.

Tư tưởng chung của phương pháp là chấp nhận tìm ra các ***nghiệm gần đúng*** với nghiệm tối ưu (nghĩa là có thể sai), rồi tìm cách xây dựng một hàm tính toán độ tối ưu cho phương án sao cho khả năng ra được nghiệm tối ưu là lớn nhất có thể. Ưu điểm của phương pháp này là độ phức tạp khá nhỏ, và nếu triển khai đúng cách có thể cho ra nghiệm tối ưu nhanh hơn nhiều so với Quay lui hay Nhánh và Cận. Thực tế, có nhiều thuật toán sử dụng chiến lược giải thuật này và vẫn cho được kết quả tối ưu, chẳng hạn như Giải thuật Prim hay Kruskal để tìm cây khung nhỏ nhất trên đồ thị.

## 2. Ý tưởng

Giả sử các bạn có thể biểu diễn nghiệm của bài toán dưới dạng một vector $X = (x_1, x_2, \dots, x_n)$ và mỗi thành phần $x_i$ chọn ra từ một tập $S_i$ các ứng cử viên. Vẫn tương tự như trong bài toán tối ưu, các nghiệm sẽ được xác định độ tốt bằng một hàm $f(X),$ và mục tiêu là cần đi tìm nghiệm có $f(X)$ tốt nhất (theo nghĩa lớn nhất hoặc nhỏ nhất).

Khác với các chiến lược trước đó, ở chiến lược Tham lam, chúng ta sẽ tìm cách tối ưu lựa chọn ở từng thành phần nghiệm. Giả sử đã xây dựng được $i$ thành phần của nghiệm là $x_1, x_2, \dots, x_i,$ thì khi xây dựng thành phần $x_{i + 1},$ ta hãy cố gắng chọn nó là ứng cử viên "tốt nhất" trong tập ứng cử viên $S_{i + 1}$. Để đánh giá được độ tốt của các ứng cử viên thì các bạn cần xây dựng một hàm chọn để làm điều đó. Tiếp tục xây dựng như vậy cho tới khi tạo ra đủ $n$ thành phần của nghiệm.

Giải thuật có thể mô tả bằng mô hình tổng quát như sau:

```cpp
void greedy_method()
{
    X = empty;
    i = 0;
    while ({X_chưa_có_đủ_n_thành_phần})
    {
        i = i + 1;
        {Xác_định_S[i]}

        // Chọn ứng cử viên tốt nhất cho thành phần thứ i.
        x[i] = select_best(S[i]);
    }
}
```

Thực tế, trong nhiều bài toán, nếu như các bạn xây dựng được một hàm chọn `select_best()` phù hợp, kết quả thu được sẽ là kết quả tối ưu, chẳng hạn như trong các giải thuật trên đồ thị. Cùng phân tích một số bài toán sau đây để hiểu rõ hơn về Greedy nhé!

# II. Một số bài toán minh họa

## 1. Phân số Ai Cập (Egyptian Fraction)

### Đề bài

Mỗi phân số dương đều có thể được biểu diễn dưới dạng tổng của các phân số đơn vị khác nhau (phân số đơn vị là phân số có tử số bằng $1,$ và mẫu số là một số nguyên dương). Cách biểu diễn phân số như vậy được gọi là biểu diễn theo ***Phân số Ai Cập***, và mỗi phân số có rất nhiều cách biểu diễn như vậy. Cho trước một phân số $\frac{a}{b},$ hãy tìm biểu diễn phân số Ai Cập của nó với số lượng số hạng là ít nhất có thể?

***Input:***

- Một dòng duy nhất chứa hai số nguyên dương $a, b \ (1 \le a < b \le 1000)$.

***Output:***

- In ra các phân số trong phân tích tìm được, mỗi phân số trên một dòng theo thứ tự giảm dần về giá trị.

***Sample Input:***

```
6 14
```

***Sample Output:***

```
1 3
1 11
1 231
```

### Phân tích ý tưởng

Nghiệm của bài toán được biểu diễn dưới dạng một vector $X = (x_1, x_2, \dots, x_n)$ sao cho:

$$\frac{a}{b} = \frac{1}{x_1} + \frac{1}{x_2} + \cdots + \frac{1}{x_n}$$


với $x_1 < x_2 < \cdots < x_n,$ và $n$ nhỏ nhất có thể.


Mỗi phân số dương có tử số nhỏ hơn mẫu số đều có thể được rút gọn về một phân số tối giản. Vì thế, ta có thể áp dụng giải thuật tham lam như sau:

- Nếu $\frac{a}{b}$ có mẫu số chia hết cho tử số thì bài toán đã có lời giải, vì khi đó nó có thể viết dưới dạng $\frac{1}{b / a}$.
- Với một phân số $\frac{a}{b} \ (1 < a < b),$ tìm phân số đơn vị lớn nhất không vượt quá $\frac{a}{b}$ bằng cách tính giá trị $x = \left \lceil{\frac{b}{a}} \right\rceil,$ phân số đơn vị tìm được sẽ là $\frac{1}{x}$. Sở dĩ ta tìm phân số $\frac{1}{x}$ lớn nhất là để cho số lượng số hạng tạo ra sẽ nhỏ nhất có thể.
- Tiếp tục lặp lại quá trình trên với hiệu $\frac{a}{b} - \frac{1}{x},$ cho tới khi phân tích xong.

### Cài đặt

Cài đặt dưới đây sử dụng mô hình đệ quy để liên tục phân tích $\frac{a}{b}$ thành tổng của các phân số đơn vị $\frac{1}{x}$:

```cpp
#include <bits/stdc++.h>

using namespace std;

void egyptian_representation(int a, int b)
{
    // Nếu a = 0 hoặc b = 0 thì đã phân tích xong.
    if (a == 0 || b == 0)
        return;

    // Nếu b chia hết cho a thì rút gọn luôn về phân số đơn vị.
    if (b % a == 0)
    {
        cout << 1 << ' ' << b / a;
        return;
    }
	
    // Tìm phân số đơn vị lớn nhất không vượt quá a / b.
    int x = b / a + 1;
    cout << 1 << ' ' << x << endl;
	
    // Tiếp tục phân tích hiệu a / b - 1 / x.
    egyptian(a * x - b, b * x);
}

main()
{
    int a, b;
    cin >> a >> b;
	
    egyptian_representation(a, b);
}
```

### Đánh giá độ phức tạp

Không ổn định, tùy thuộc vào việc lựa chọn các phân số đơn vị, tuy nhiên sẽ chạy rất nhanh.

## 2. Lựa chọn công việc (Activity Seletion Problem)

### Đề bài

Một nhà máy đang có $n$ công việc cần hoàn thành, công việc thứ $i$ phải bắt đầu tại thời điểm $a_i$ và kết thúc tại thời điểm $b_i$. Tuy nhiên, do nhân lực có hạn nên nhà máy đó không thể thực hiện nhiều công việc một lúc, mà chỉ có thể thực hiện một công việc tại một thời điểm.

Hãy tìm cách lựa chọn các công việc mà nhà máy sẽ làm sao cho số công việc được hoàn thành là nhiều nhất có thể?

***Input:***

- Dòng đầu tiên chứa số nguyên dương $n$ - số lượng công việc $(1 \le n \le 10^6)$.
- $n$ dòng tiếp theo, dòng thứ $i$ chứa hai số nguyên $a_i, b_i$ là thời điểm bắt đầu và thời điểm kết thúc của công việc thứ $i \ (0 \le a_i, b_i \le 10^6)$.

***Output:*** 

- Đưa ra một số nguyên duy nhất là số lượng công việc tối đa có thể hoàn thành.

***Sample Input:***

```
6
0 6
5 7
3 4
8 9
5 9
1 2
```

***Sample Output:***

```
4
```

***Explanation:***

Lựa chọn các công việc số $6,$ số $3,$ số $2$ và số $4$.

### Phân tích ý tưởng

Giả sử đã lựa chọn được $i$ công việc để thực hiện là $(x_1, x_2, \dots, x_i)$. Khi lựa chọn công việc $x_{i + 1},$ muốn phương án có thể tối ưu nhất, thì ta sẽ phải lựa chọn công việc nào có thời gian bắt đầu lớn hơn hoặc bằng thời gian kết thúc của công việc $x_i,$ nhưng thời gian kết thúc của $x_{i + 1}$ lại phải là nhỏ nhất.

Từ nhận xét trên, ta rút ra ý tưởng tham lam như sau:

- Đầu tiên, sắp xếp các công việc tăng dần theo thời gian kết thúc.
- Lựa chọn công việc đầu tiên vào danh sách các công việc sẽ làm. Coi công việc gần nhất vừa được chọn là công việc thứ $j$.
- Duyệt qua các công việc từ vị trí $2$ tới vị trí $n,$ nếu công việc nào có thời gian bắt đầu $(a_i)$ lớn hơn hoặc bằng thời gian kết thúc của công việc gần nhất vừa chọn $(b_j)$ thì lựa chọn nó, rồi cập nhật lại $j = i$. Do các công việc đã được sắp xếp tăng dần theo thời gian kết thúc, nên công việc được chọn sẽ luôn luôn có thời gian kết thúc nhỏ nhất.

### Chứng minh tính tối ưu

Phương pháp làm trên mặc dù là Tham lam, nhưng nó lại luôn luôn cho ra kết quả tối ưu. Thật vậy, hãy giả sử $S = \{x_1, x_2, \dots, x_n\}$ là danh sách các công việc đã được sắp xếp tăng dần theo thời gian kết thúc, và tập $A \subseteq S$ là một phương án lựa chọn tối ưu nhưng công việc đầu tiên được lựa chọn trong tập $A$ không phải là $x_1$ (như vậy không phải là cách chọn Tham lam). Khi đó ta có:

- Đặt $k$ là chỉ số của công việc đầu tiên được chọn trong tập $A$ (tức là chọn $x_k$ đầu tiên). Gọi $B = \left(A \setminus \{k\}\right) \cup \{x_1\};$ có nghĩa $B$ là một phương án lựa chọn Tham lam với $x_1$ là công việc đầu tiên.
- Ta có $b_1 \le b_k$ (vì dãy các công việc đã sắp xếp tăng dần). Bởi vì các công việc được chọn trong $A$ là hoàn toàn không giao nhau, nên chắc chắn các công việc trong $B$ cũng sẽ không giao nhau, do đó $|B| = |A|,$ suy ra $|B|$ cũng là một phương án lựa chọn tối ưu.
- Ta tiếp tục chứng minh nếu như phương án $B$ là một phương án tối ưu được chọn theo phương pháp Tham lam, thì $B' = B \setminus \{x_1\}$ sẽ là một phương án tối ưu cho tập các công việc còn lại: $S' = \{x_i \in S: b_i \ge a_1 \}$. Thật vậy, nếu như $B'$ không phải một phương án tối ưu cho $S',$ nghĩa là ta có thể chọn ra một phương án $A'$ gồm nhiều công việc hơn $B'$ theo phương pháp Tham lam đối với tập $S'$. Sau đó, thêm $x_1$ vào tập $A'$ sẽ tạo thành một tập $A$ tối ưu hơn tập $B$ ban đầu, điều này mâu thuẫn với giả thiết $B$ là một phương án tối ưu.

Vì thế, phương pháp Tham lam sẽ luôn luôn cho ra kết quả tối ưu đối với bài toán lựa chọn công việc.

### Cài đặt

Trong solution dưới đây sẽ sử dụng cấu trúc `pair` trong C++ STL để lưu trữ các công việc cho thuận tiện.

```cpp
#include <bits/stdc++.h>
#define int long long
#define task "activity_selection."

using namespace std;

const int maxn = 1e5 + 10;
int n;
pair < int, int > activity[maxn];

void enter()
{
    cin >> n;

    for (int i = 1; i <= n; ++i)
        cin >> activity[i].first >> activity[i].second;
}

bool cmp(pair < int, int > a, pair < int, int > b)
{
    return a.second < b.second;
}

void solution()
{
    sort(activity + 1, activity + n + 1, cmp);

    int res = 1;
    int last_index = 1;
    for (int i = 2; i <= n; ++i)
        if (activity[i].first >= activity[last_index].second)
        {
            last_index = i;
            ++res;
        }

    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    enter();
    solution();

    return 0;
}
```

### Đánh giá độ phức tạp

Sắp xếp lại các công việc: $O\big(n.\log(n)\big)$.
Duyệt chọn các công việc: $O(n)$.
Độ phức tạp tổng quát: $O\big(n.\log(n)\big)$.

## 3. Rút tiền cây ATM

### Đề bài

Một khách hàng muốn rút số tiền $T$ từ một cây ATM bên đường. Bên trong cây ATM hiện đang có $n$ tờ tiền có mệnh giá $a_1, a_2,…, a_n$. Hãy tìm một cách trả tiền của máy ATM cho khách hàng?

***Input:*** 

- Dòng đầu tiên chứa hai số nguyên dương $n$ và $T \ (1 \le n \le 1000; 1 \le T \le 1000)$.
- Dòng thứ hai chứa $n$ số nguyên dương $a_1, a_2, \dots, a_n$ - mệnh giá của các tờ tiền $(1 \le a_i \le 1000)$.

***Output:*** 

- In ra số nguyên duy nhất là số tờ tiền tối thiểu cần sử dụng. Nếu không có phương án trả tiền thì in ra $-1$.

### Phân tích ý tưởng

Với giới hạn này, bài toán không thể giải quyết bằng giải pháp Quay lui hay Nhánh và Cận. Phương pháp tốt nhất sẽ là ***Quy hoạch động***, tuy nhiên ở đây mình sẽ phân tích một ý tưởng Tham lam đơn giản như sau:

- Sắp xếp các tờ tiền theo mệnh giá giảm dần.
- Tại mỗi bước lựa chọn, luôn luôn chọn tờ tiền có mệnh giá lớn nhất và không vượt quá số tiền còn lại phải trả.

Giải thuật trên sẽ tìm ra nghiệm rất nhanh, tuy nhiên không phải luôn luôn tối ưu và cũng có thể sẽ không tìm được nghiệm. Đó chính là nhược điểm của phương pháp Tham lam mà chúng ta buộc phải chấp nhận.

### Cài đặt

```cpp
#include <bits/stdc++.h>

using namespace std;

main()
{
    int n, T;
    cin >> n >> T;
	
    int a[n + 1];
    for (int i = 1; i <= n; ++i)
        cin >> a[i];
		
    sort(a + 1, a + n + 1, greater < int >());
	
    int res = 0;
    for (int i = 1; i <= n; ++i)
        if (T >= a[i])
        {
            T -= a[i];
            ++res;
        }

    // Tìm được nghiệm thì in ra số tờ tiền cần dùng.
    // Ngược lại in ra -1.
    if (T == 0)
        cout << res;
    else
        cout << -1;
}
```

Theo cách làm này, nếu như bộ dữ liệu vào là:

```
6 100
50 20 20 20 20 20
```

Thì kết quả in ra sẽ là:

```
-1
```

Dễ thấy kết quả này hoàn toàn sai, vì bài toán vẫn có nghiệm là $5$.

# III. Tài liệu tham khảo

- https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/
- https://www.geeksforgeeks.org/greedy-algorithms/
- https://en.wikipedia.org/wiki/Greedy_algorithm
- <a href="https://cuongquach.com/ebook-giai-thuat-va-lap-trinh-lmh-pdf.html">Sách Giải thuật và Lập trình - thầy Lê Minh Hoàng</a>.
- <a href="https://downloadsachmienphi.com/tai-lieu-giao-khoa-chuyen-tin-quyen-1/">Tài liệu giáo khoa chuyên Tin quyển 1 - thầy Hồ Sĩ Đàm</a>.