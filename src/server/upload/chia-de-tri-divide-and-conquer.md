# I. Sơ lược về giải thuật Chia để trị

Chia để trị (Divide and Conquer) là một trong các thiết kế giải thuật rất phổ biến thường được sử dụng trong những bài toán có kích thước lớn. Trong lập trình thi đấu, chúng ta thường nghe đến chiến lược này gắn liền cùng với những thuật toán như Sắp xếp nhanh (Quicksort), Sắp xếp trộn (Mergesort),..., hay thuật toán lũy thừa $a^n$. Tuy nhiên, đó chỉ là bề nổi của vấn đề. Ý nghĩa thực sự của Chia để trị nằm ở chỗ, nó giúp cho chúng ta giải quyết những bài toán lớn trong thời gian nhỏ, mà kĩ thuật lập trình lại không quá phức tạp. Thông qua bài viết này, mình sẽ giới thiệu tới các bạn tư tưởng của cchiến lược giải thuật này, kèm theo một số bài toán ứng dụng của nó.

## 1. Phương pháp chung

Tư tưởng của chiến lược Chia để trị có thể được chia làm ba bước theo đúng tên gọi của nó như sau:
- ***Divide:*** Chia bài toán lớn ban đầu thành các bài toán nhỏ.
- ***Conquer:*** Gọi đệ quy về các bài toán con tới khi thu được bài toán con hoặc đã có lời giải, hoặc có thể giải một cách dễ dàng.
- ***Combine:*** Kết hợp nghiệm của các bài toán con lại để thu được nghiệm của bài toán lớn hơn, từ đó tiến tới nghiệm của bài toán gốc.

Nghe qua thì có vẻ khá giống với Giải thuật đệ quy đúng không nào? Kỳ thực, chiến lược Chia để trị chính là một sự phát triển của Giải thuật đệ quy, áp dụng kĩ thuật đệ quy để giải bài toán một cách nhanh hơn, hiệu quả hơn. Đối với Giải thuật đệ quy, việc giải các bài toán con có thể sinh ra bất lợi về mặt thời gian thực thi do gặp phải rất nhiều bài toán con gối nhau (trùng lặp), nhưng với chiến lược Chia để trị thì điều đó không xảy ra, vì những bài toán con trong chiến lược này thường được thu nhỏ với tốc độ rất nhanh, có thể chỉ tương đương với hàm $\log$. Ngoài ra, do đặc điểm của phương pháp có sử dụng tới lời gọi đệ quy, nên các bài toán áp dụng Chia để trị cũng không có hoặc xuất hiện rất ít những bài toán con gối nhau gây tốn kém thời gian tính toán.

Một số giải thuật được phát triển từ chiến lược Chia để trị có thể kể đến như:
- Sắp xếp nhanh và Sắp xếp trộn.
- Duyệt phân đôi tập hợp.
- Giải thuật FFT để nhân nhanh đa thức.
$...$

## 2. Mã giả

Chiến lược Chia để trị có thể được mô tả bằng một mô hình đệ quy như sau:

```cpp
divide_and_conquer(A, x) // Tìm nghiệm x của bài toán A.
{
    if (A_đủ_nhỏ)
        {Giải_bài_toán_A};
    else 
    {
        {Phân_rã_A_thành_các_bài_toán_con: A_1, A_2,..., A_m}
        for (i = 1 to m)
            divide_and_conquer(A_i, x_i); // Gọi đệ quy để tìm nghiệm x_i của bài toán con A_i.
            
        {Kết_hợp_nghiệm_của_m_bài_toán_con -> Thu_được_nghiệm_bài_toán_A}
    }
}
```

Trong thiết kế giải thuật trên, có một vấn đề mà ta cần lưu tâm, đó là như thế nào thì bài toán A gọi là "đủ nhỏ"? Một bài toán có thể coi là đủ nhỏ khi mà nó trở thành một ***bài toán suy biến***, tức là lời giải của nó coi như hiển nhiên, hoặc quá dễ dàng. Chẳng hạn, trong bài toán tìm số Fibonacci thứ $n,$ thì bài toán con đủ nhỏ đạt được khi $n = 0$ hoặc $n = 1,$ vì $f_0 = 0$ và $f_1 = 1$ là hai kết quả suy ra từ định nghĩa, hay trong bài toán tính $n!$ thì bài toán con đủ nhỏ đạt được khi $n = 0,$ vì $0!$ hiển nhiên bằng $1,...$

Có một trường hợp đặc biệt mà nhiều người vẫn lầm tưởng rằng đó là ví dụ của chiến lược Chia để trị, đó là giải thuật Tìm kiếm nhị phân (Binary Searching). Tuy nhiên, như các bạn đã biết, giải thuật Tìm kiếm nhị phân ở mỗi bước sẽ luôn luôn xác định một và chỉ một bài toán con (hoặc thu hẹp khoảng tìm kiếm về bên phải, hoặc thu hẹp khoảng tìm kiếm về bên trái), trong khi chiến lược Chia để trị cần ít nhất hai bài toán con ở mỗi bước phân rã để có thể kết hợp nghiệm của chúng lại với nhau. Bởi thế, giải thuật Tìm kiếm nhị phân được coi là một giải thuật ứng dụng chiến lược ***Giảm để trị (Decrease and Conquer)*** - sẽ được giới thiệu tới các bạn ở một chuyên đề khác!

# II. Một số bài toán ứng dụng kĩ thuật Chia để trị

Ngoài những bài toán rất quen thuộc mà chúng ta đã đề cập ở những chuyên đề trước như tính $a^n$ hay sắp xếp nhanh, dưới đây mình sẽ giới thiệu thêm tới các bạn một số bài toán rất điển hình của kĩ thuật Chia để trị, hy vọng sẽ giúp bạn đọc hiểu rõ hơn về cách sử dụng kĩ thuật này!

## 1. Bài toán Diff

***Phát biểu bài toán:*** Cho một mảng số nguyên $A$ gồm $n$ số $a_1, a_2,..., a_n$. Đặt hàm $\text{Diff}(a_1...a_n) =\text{max}(a_j - a_i) \ (1 \le i \le j \le n)$. Hãy xác định $\text{Diff}(a_1...a_n)?$

***Ý tưởng:*** 
- Cách $1$: Sử dụng phương pháp duyệt $O(n^2)$ để duyệt qua tất cả các cặp số $(i, j)$ và tìm $\text{Diff}(i, j)$ lớn nhất:

    ```cpp
    int find_max_diff(int n, int a[])
    {
        int max_diff = 0;
        for (int i = 1; i <= n; ++i)
            for (int j = i; j <= n; ++j)
                max_diff = max(max_diff, a[j] - a[i]);
                
        return max_diff;
    }
    ```

- Cách $2$: Nếu áp dụng kĩ thuật chia để trị, chia mảng ban đầu thành hai mảng con $\{a_1, a_2,..., a_{mid}\}$ và $\{a_{mid + 1}, a_{mid + 2},..., a_n\}$ với $mid = \left \lfloor{\frac{n}{2}} \right \rfloor;$ thì ta có:
$$\text{Diff}(a_1...a_n) = \text{max}\begin{cases}\text{Diff}(a_1...a_{mid}).\\ \text{Diff}(a_{mid + 1}...a_n).\\ \text{max}(a_{mid + 1}...a_n) - \text{min}(a_1...a_{mid}). \end{cases}$$ Từ công thức kết hợp trên, ta nhận thấy rằng nếu có thể tìm được giá trị $\text{Diff},$ giá trị lớn nhất và giá trị nhỏ nhất của hai mảng con $\{a_1,a_2,...,a_{mid}\}$ và $\{a_{mid+1},a_{mid+2},...,a_n\}$. Để tìm được những yếu tố trên, ta sẽ lại tiếp tục gọi đệ quy để chia đôi hai mảng con trên ra. Quá trình phân rã mảng sẽ dừng lại khi nhận được mảng con kích thước bằng $1$ - chính là bài toán suy biến với giá trị lớn nhất, nhỏ nhất và $\text{Diff}$ của nó được xác định trong một nốt nhạc!

    Dựa trên những nhận xét vừa rồi, chúng ta sẽ xây dựng một hàm đệ quy `find_max_diff(l, r, diff, max_value, min_value)` để tìm được $\text{Diff},$ giá trị lớn nhất và giá trị nhỏ nhất trên mảng con $\{a_l, a_{l + 1},..., a_r\} \ (1 \le l \le r \le n)$:
    
***Cài đặt:***

```cpp
#include <bits/stdc++.h>
#define task "diff."
#define inf 1e9 + 7
#define x first
#define y second

using namespace std;

const int maxn = 1e6 + 10;
int n, a[maxn];

void enter()
{
    cin >> n;

    for (int i = 1; i <= n; ++i)
        cin >> a[i];
}

int find_max_diff(int l, int r, int &max_value, int &min_value)
{
    // Trường hợp suy biến, mảng con chỉ gồm 1 phần tử.
    if (l == r)
    {
        max_value = min_value = a[r];

        return INT_MIN;
    }

    // Các biến để lưu min và max của hai mảng con bên trái và bên phải.
    int max_v1 = INT_MIN, min_v1 = INT_MAX, max_v2 = INT_MIN, min_v2 = INT_MAX;

    // Giải bài toán con ở hai mảng con trái phải.
    int mid = (l + r) >> 1;
    int diff_left = find_max_diff(l, mid, max_v1, min_v1);
    int diff_right = find_max_diff(mid + 1, r, max_v2, min_v2); 

    // Cập nhật min - max của đoạn [l, r] đang xét.
    max_value = max(max_v1, max_v2);
    min_value = min(min_v1, min_v2);

    // Trả về diff của mảng con [l, r].
    return max(max_v2 - min_v1, max(diff_left, diff_right));
}

void solution()
{
    int max_value = INT_MIN, min_value = INT_MAX;
    cout << find_max_diff(1, n, max_value, min_value);
}

main()
{
    //freopen(task"inp", "r", stdin);
    //freopen(task"out", "w", stdout);
    ios_base::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    enter();
    solution();

    return 0;
}
```

***Đánh giá độ phức tạp:*** Nếu đặt $T(n)$ là số phép toán cần thực hiện trên mảng $A$ gồm $n$ phần tử, ta có:
$$T(n) = \begin{cases}0, &n = 1.\\ T\left(\frac{n}{2}\right) + T\left(\frac{n}{2}\right) + \alpha, &n > 1. \end{cases}$$

Nếu giả sử $n = 2^k,$ thì bằng phương pháp thế, ta có $T(n) = (n - 1).\alpha$. Như vậy giải thuật có độ phức tạp tổng quát là $O(n)$. Dĩ nhiên, trong thực tế chúng ta có thể sử dụng phương án cài đặt dễ hơn nhiều để giải bài toán này vẫn trong độ phức tạp $O(n),$ nhưng đây chỉ là một ví dụ để bạn đọc hiểu thêm về Chia để trị mà thôi!

## 2. Giải thuật sắp xếp trộn Merge-sort

***Phát biểu bài toán:*** Cho một mảng số nguyên $A$ gồm $n$ phần tử $a_1, a_2,..., a_n$. Sử dụng giải thuật sắp xếp trộn để sắp xếp mảng đó theo thứ tự tăng dần?

***Ý tưởng:*** Gần giống với giải thuật Sắp xếp nhanh, ta cũng chia mảng $A[1...n]$ thành hai mảng con $A[1...(mid)]$ và $A[(mid + 1)...n]$ với $mid = \left \lfloor{\frac{n}{2}} \right \rfloor$. Kế đến, ta sắp xếp hai mảng con này tăng dần rồi trộn chúng lại để thu được mảng $A$ ban đầu tăng dần. Để sắp xếp hai mảng con, ta lại tiếp tục gọi đệ quy chia đôi chúng. Vậy các bạn cần thiết kế hai hàm: `merge_sort(i, j)` dùng để sắp xếp tăng dần mảng con $A[i...j]$ và `merge(i, mid, j)` để gộp hai mảng con $A[i...mid]$ và $A[(mid + 1)...j]$ đã sắp xếp tăng dần thành một mảng mới cũng tăng dần.

***Cài đặt:***

```cpp
void merge(int i, int mid, int j)
{
    // Tạo hai mảng trung gian left_arr và right_arr để lưu hai mảng con hai bên.
    vector < int > left_arr, right_arr;
    for (int k = i; k <= mid; ++k)
        left_arr.push_back(a[k]);
    for (int k = mid + 1; k <= j; ++k)
        right_arr.push_back(a[k]);
        
    /* 
      Gộp hai mảng con lại thành một, bằng cách dùng hai chỉ số left_index và right_index 
      để kiểm soát các phần tử trên hai mảng con. Ở mỗi bước, phần tử bên nào nhỏ hơn thì 
      điền nó vào mảng gốc và tăng chỉ số bên đó lên.
    */
    int left_index = 0, right_index = 0, merge_index = i;
    while (left_index < left_arr.size() && right_index < right_arr[right_index])
    {
        if (left_arr[left_index] < right_arr[right_index])
        {
            a[merge_index++] = left_arr[left_index];
            ++left_index;
        }
        else 
        {
            a[merge_index++] = right_arr[right_index];
            ++right_index;
        }
    }
    
    // Nếu còn phần tử ở hai mảng phụ thì gộp nốt nó vào mảng gốc.
    while (left_index < left_arr.size())
    {
        a[merge_index++] = left_arr[left_index];
        ++left_index;
    }
    while (right_index < right_arr.size())
    {
        a[merge_index++] = right_arr[right_index];
        ++right_index;
    }
}

void merge_sort(int i, int j)
{
    if (i < j)
    {
        int mid = (i + j) / 2;
        
        // Gọi đệ quy để sắp xếp hai mảng con trái phải.
        merge_sort(i, mid);
        merge_sort(mid + 1, j);
        merge(i, mid, j);
    }
}
```

Sau khi thiết kế xong hai hàm trên, khi sử dụng giải thuật để sắp xếp một mảng $A$ gồm $n$ phần tử $a_1, a_2,..., a_n,$ các bạn chỉ cần gọi hàm `merge_sort(1, n)` là được!

***Đánh giá độ phức tạp:*** Quá trình chia đôi một mảng thành hai mảng con sẽ diễn ra không quá $\log_2(n)$ lần. Còn quá trình gộp hai mảng con đã sắp xếp lại thành một mảng luôn luôn diễn ra trong thời gian tuyến tính $(tốt nhất nhất là $O(1),$ tệ nhất là $O(n)),$ do đó giải thuật có độ phức tạp tổng quát là $O(n.\log_2(n))$.

## 3. Bài toán tiền tố chung dài nhất

***Phát biểu bài toán:*** Cho $n$ chuỗi kí tự $s_1, s_2,..., s_n$ chỉ gồm toàn các chữ cái latin in thường, các chuỗi có độ dài tối đa là $m$. Hãy xác định tiền tố chung dài nhất của cả $n$ chuỗi? Biết rằng, tiền tố của một chuỗi (***Longest Common Prefix - LCP***) là một cách chọn ra $1$ hoặc nhiều kí tự liên tiếp của chuỗi đó, tính từ kí tự đầu tiên.

***Ý tưởng:*** Dưới đây là ý tưởng Chia để trị cho bài toán này, mặc dù có thuật toán tốt hơn để giải nó là Tìm kiếm nhị phân, nhưng đây vẫn là một ví dụ rất hay về cách áp dụng Chia để trị:
- Đầu tiên, xét bài toán tìm tiền tố chung dài nhất giữa hai chuỗi $x$ và $y$: Duyệt qua các kí tự $x_i$ và $y_j$ của hai chuỗi, nếu như xuất hiện một cặp chuỗi $x_i \ne y_j$ thì tiền tố chung dài nhất sẽ là $x_{0...i - 1} = y_{0...j - 1}$ (vì hai chuỗi sẽ khác nhau khi tồn tại một kí tự khác nhau). Hàm `lcp_two_strings(x, y)` dùng để tìm tiền tố chung dài nhất của hai chuỗi $x$ và $y$.
- Áp dụng ý tưởng trên với $n$ chuỗi, ta có công thức:
$$\text{LCP}(s_1, s_2,..., s_n) = \text{LCP}\Big(...\text{LCP}\big(\text{LCP}(s_1, s_2), s_3\big),..., s_n\Big)$$
- Kế đến, chia đôi tập hợp các chuỗi ban đầu, tìm tiền tố chung dài nhất của hai nửa rồi gộp lại với nhau để tạo được tiền tố chung dài nhất của tất cả các chuỗi. Việc tìm tiền tố chung dài nhất của hai tập hợp con trái phải lại được thực hiện bằng cách chia đôi tập hợp đó ra cho tới khi thu được tập hợp chỉ gồm một chuỗi duy nhất. Hàm `lcp_n_strings(a, l, r)` dùng để tìm tiền tố chung dài nhất của tập hợp các chuỗi $\{a_l, a_{l + 1},..., a_r\}$.

***Cài đặt:*** 

```cpp
// Tìm tiền tố chung dài nhất của hai chuỗi x và y.
string lcp_two_strings(string x, string y)
{
    int lcp_length = 0;
    for (int i = 0, j = 0; i < s.size() && j < y.size(); ++i, ++j)
    {
        if (x[i] != y[j])
            break;
        ++lcp_length;
    }
    
    return x.substr(0, lcp_length);
}

// Sử dụng chia để trị, tìm tiền tố chung dài nhất của cả n chuỗi.
string lcp_n_strings(string a[], int l, int r)
{
    if (l == r)
        return a[l];
        
    if (l < r)
    {
        int mid = (l + r) / 2;
        
        string lcp_left = lcp_n_strings(a, l, mid);
        string lcp_right = lcp_n_strings(a, mid + 1, r);
        
        return lcp_two_strings(lcp_left, lcp_right);
    }
}
```

Tương tự với giải thuật Merge-sort, khi cần tìm tiền tố chung dài nhất của cả $n$ chuỗi, chỉ cần gọi hàm `lcp_n_strings(a, 1, n)` là được!

***Đánh giá độ phức tạp:*** Giải thuật sẽ duyệt qua tất cả các kí tự của cả $n$ chuỗi, nên độ phức tạp tổng quát sẽ là $O(n \times m)$ với $m$ là độ dài của chuỗi dài nhất.

# III. Tài liệu tham khảo

- https://www.geeksforgeeks.org/divide-and-conquer/?ref=ghm.
- https://www.geeksforgeeks.org/longest-common-prefix-using-divide-and-conquer-algorithm/.
- <a href="https://downloadsachmienphi.com/tai-lieu-giao-khoa-chuyen-tin-quyen-1/">Tài liệu giáo khoa chuyên Tin quyển 1 - thầy Hồ Sĩ Đàm</a>.