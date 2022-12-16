# I. Bài toán dãy con tăng dài nhất (Longest Increasing Subsequence)

## 1. Mở đầu

Trong bài viết trước về chủ đề [Nhập môn Quy hoạch động](https://viblo.asia/p/tat-ca-nhung-gi-ban-can-la-quy-hoach-dong-jvElaqVDlkw), tôi đã giới thiệu tới các bạn những khái niệm cơ bản về Quy hoạch động, đồng thời giới thiệu một số bài toán Quy hoạch động điển hình (xem lại tại [đây](https://viblo.asia/p/cach-tiep-can-bai-toan-quy-hoach-dong-phan-1-bWrZnoRQlxw)), trong đó có bài toán Dãy con tăng dài nhất. Tuy nhiên, tôi mới chỉ giới thiệu tới các bạn phương pháp làm đơn giản bằng thuật toán $O(n^2),$ mà tôi sẽ nhắc lại nó sơ lược dưới đây:

- Gọi $dp[i]$ là độ dài dãy con tăng dài nhất kết thúc tại phần tử $a_i$. 
- Tìm cách ghép $a_i$ vào một dãy con nào đó kết thúc tại vị trí $a_j$ ở phía trước nó, sao cho dãy con đó là dài nhất và $a_j < a_i$. 
- Từ đây suy ra công thức quy hoạch động:
    $$dp[i] = \text{max}\big(dp[j]\big) + 1; \forall j: 1 \le j \le n, a_j < a_i.$$
	
Với phương pháp này, độ phức tạp lên tới $O(n^2)$ và không thể giải quyết bài toán với $n$ lớn hơn được. Bài toán nâng cao hơn đặt ra ở đây là:

Cho dãy số $A$ gồm $n$ phần tử $a_1, a_2, \dots, a_n \ (n \le 10^6);$ hãy xác định dãy con tăng ngặt dài nhất của dãy số đã cho?

***Input:***

- Dòng đầu tiên chứa số nguyên dương $n \ (1 \le n \le 10^6)$.
- Dòng thứ hai chứa $n$ số nguyên dương $a_1, a_2, \dots, a_n \ (1 \le a_i \le 10^9)$ phân tách nhau bởi dấu cách - các phần tử của dãy số.

***Output:***

- Dòng đầu tiên đưa ra độ dài của dãy con tìm được.
- Dòng thứ hai in ra các phần tử của dãy con tìm được. Nếu tồn tại nhiều dãy con tăng có cùng độ dài, đưa ra một dãy bất kỳ.

***Sample Input:***

```
5
1 4 2 3 2
```

***Sample Output:***

```
3
1 2 3
```

## 2. Phân tích ý tưởng

Với mỗi giá trị $k,$ ta sử dụng mảng $\text{endpos}[k]$ là chỉ số $x$ của phần tử $a_x$ ***nhỏ nhất*** thỏa mãn độ dài dãy con tăng dài nhất kết thúc tại $a_x$ đúng bằng $k$.

Ban đầu, coi rằng mới chỉ xác định được duy nhất dãy con tăng kết thúc tại vị trí $a_1,$ thì dĩ nhiên ta có $\text{endpos}[1] = 1$. Vẫn sử dụng mảng $dp[i]$ để lưu độ dài dãy con tăng dài nhất kết thúc tại $a_i,$ và mảng $trace[i]$ để lưu vị trí của phần tử liền trước $a_i$ trong dãy con tăng dài nhất kết thúc tại $a_i$. 

Ta sẽ xây dựng một sơ đồ tính toán sao cho với mỗi vị trí $i,$ phải biết được những điều sau:

- $res$: Độ dài của dãy con tăng dài nhất trong đoạn $a[1...i]$. Mỗi khi xuất hiện một phần tử mới khiến cho độ dài dãy con tăng tại đó kéo dài ra thì cập nhật tăng $res$ thêm $1$ đơn vị $(1)$.
- $\text{endpos}[k] \ (1 \le k \le i)$: Vị trí của phần tử nhỏ nhất thỏa mãn độ dài dãy con tăng dài nhất kết thúc tại $a_{\text{endpos}[k]}$ là $k$. Các giá trị $\text{endpos}[k]$ được tính đồng thời với các $dp[i]$ trong quá trình duyệt, nên $a_{\text{endpos}[1]} < a_{\text{endpos}[2]} < \cdots < a_{\text{endpos}[k]} \ (2)$.

Sơ đồ đó như sau:

```cpp
end_pos[1] = 1;
res = 1;

for (i = 1; i <= n; i = i + 1)
{
    {Tính dp[i]};
    {k = dp[i]};
	
    // Độ dài dãy con tăng dài nhất kết thúc tại a[i] 
    // dài hơn kết quả trước đó.
    if (k > res)
    {
        res = k;
        end_pos[res] = i;
    }
    // Nếu có nhiều dãy con tăng độ dài k thì ghi nhận 
    // phần tử kết thúc có giá trị nhỏ nhất.
    else if (a[i] > a[end_pos[k]])
        end_pos[k] = i;
}
```

Bây giờ, nếu như các bạn muốn có được dãy con tăng dài nhất độ dài $p + 1$ kết thúc tại $a_i,$ thì bắt buộc $a_{\text{endpos}[p]} < a_i$. Ngoài ra, nếu đem $a_i$ ghép vào cuối dãy con tăng dài nhất kết thúc tại $a_{\text{endpos}[p]}$ mà vẫn thu được dãy tăng thì kể cả đem $a_i$ ghép vào cuối dãy con tăng dài nhất kết thúc tại $a_{\text{endpos}[p - 1]}$ cũng vẫn thu được dãy tăng $\big($ do điều $(2)\big)$. Vì thế, để tính được $dp[i],$ ta có thể áp dụng tìm kiếm nhị phân để tìm ra độ dài $p \ (1 \le p \le res)$ lớn nhất thỏa mãn $a_{\text{endpos}[p]} < a_i,$ khi đó ghép $a_i$ vào cuối dãy con tăng dài nhất kết thúc tại $a_{\text{endpos}[p]}$.

Điều này đồng nghĩa với việc $dp[i] = p + 1$. Và dĩ nhiên ta có $trace[i] = \text{endpos}[p],$ vì bây giờ $a_{\text{endpos}[p]}$ đã là phần tử liền trước của $a_i$ trong dãy con tăng dài nhất kết thúc tại $a_i$.

Ý tưởng như vậy là hoàn thiện, giờ chúng ta sẽ cài đặt giải thuật này!

## 3. Cài đặt

***Ngôn ngữ C++:***

```cpp=
#include <bits/stdc++.h>
#define task "LIQ."
#define int long long

using namespace std;

const int maxn = 1e6 + 10;

void enter(int &n, vector < int > &a)
{
    cin >> n;

    a.resize(n + 1, 0);

    for (int i = 1; i <= n; ++i)
        cin >> a[i];
}

// In kết quả và truy vết dãy con tăng dài nhất.
void print_result(int n, vector < int > &a, vector < int > &dp, vector < int > &trace)
{
    int best = 1;
    for (int i = 2; i <= n; ++i)
        if (dp[i] > dp[best])
            best = i;

    cout << dp[best] << endl;

    vector < int > elements;
    while (best)
    {
        elements.push_back(a[best]);
        best = trace[best];
    }

    for (int i = elements.size() - 1; i >= 0; --i)
        cout << elements[i] << ' ';
}

/**
  * Tìm kiếm nhị phân giá trị p lớn nhất mà a[end_pos[p]] < a[i].
  * max_length: Độ dài dãy con tăng dài nhất đã ghi nhận được 
                trong đoạn a[1...i - 1].
  * a: Dãy số ban đầu.
  * val: Tham số đại diện cho a[i].
*/
int binary_searching(int max_length, vector < int > &a, vector < int > &end_pos, int val)
{
    int p = 0;

    int l = 1, r = max_length;
    while (l <= r)
    {
        int mid = (l + r) >> 1;

        if (a[end_pos[mid]] < val)
        {
            p = mid;
            l = mid + 1;
        }
        else
            r = mid - 1;
    }

    return p;
}

void solution(int n, vector < int > &a)
{
    vector < int > dp(n + 1, 0);
    vector < int > end_pos(n + 1, 0);
    vector < int > trace(n + 1, 0);

    int res = 1;
    end_pos[1] = 1;

    for (int i = 1; i <= n; ++i)
    {
        // Tìm kiếm nhị phân độ dài p tốt nhất để ghép a[i] vào phía sau
        // dãy con tăng dài nhất kết thúc tại a[end_pos[p]].
        int p = binary_searching(res, a, end_pos, a[i]);
        int k = p + 1;

        // Cập nhật độ dài dãy con tăng dài nhất hiện tại.
        // Luôn giữ cho phần tử kết thúc của các dãy con tăng là nhỏ nhất có thể.
        if (k > res)
        {
            res = k;
            end_pos[k] = i;
        }
        else if (a[end_pos[k]] > a[i])
            end_pos[k] = i;

        // Cập nhật các kết quả ở vị trí i.
        dp[i] = k;
        trace[i] = end_pos[p];
    }

    print_result(n, a, dp, trace);
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    int n;
    vector < int > a;

    enter(n, a);
    solution(n, a);

    return 0;
}

```

***Ngôn ngữ Python:***

```python=
# In kết quả và truy vết dãy con tăng dài nhất.
def print_result():
    best = 1
    for i in range(2, n + 1):
        if dp[i] > dp[best]:
            best = i
			
    print(dp[best])
	
    elements = []
    while best != 0:
        elements.append(a[best])
        best = trace[best]

    elements.reverse()
    print(elements)
		

'''
  * Tìm kiếm nhị phân giá trị p lớn nhất mà a[end_pos[p]] < a[i].
  * max_length: Độ dài dãy con tăng dài nhất đã ghi nhận được 
                trong đoạn a[1...i - 1].
  * a: Dãy số ban đầu.
  * val: Tham số đại diện cho a[i].
''' 
def binary_searching(max_length, a, end_pos, val):
    p = 0

    l = 1, r = max_length
    while l <= r:
        mid = (l + r) >> 1

        if a[end_pos[mid]] < val:
            p = mid
            l = mid + 1
        else:
            r = mid - 1

    return p


def solution(n, a):
    dp = [0] * (n + 1)
    end_pos = [0] * (n + 1)
    trace = [0] * (n + 1)
	
    res = 1
    end_pos[1] = 1
	
    for i in range(1, n + 1):
        # Tìm kiếm nhị phân độ dài p tốt nhất để ghép a[i] vào phía sau
        # dãy con tăng dài nhất kết thúc tại a[end_pos[p]].
        p = binary_searching(res, a, end_pos, a[i])
        k = p + 1
		
        # Cập nhật độ dài dãy con tăng dài nhất hiện tại.
        # Luôn giữ cho phần tử kết thúc của các dãy con tăng là nhỏ nhất có thể.
        if k > res:
            res = k
            end_pos[k] = i
        elif a[end_pos[k]] > a[i]:
            end_pos[k] = i
		
        # Cập nhật các kết quả ở vị trí i.
        dp[i] = k
        trace[i] = end_pos[p]
		
    print_result(n, a, dp, trace)
	
	
if __name__ == '__main__':
    n = int(input())
	
    a = [0] * (n + 1)
    for i in range(1, n + 1):
        a[i] = int(input())
	
    solution(n, a)
```

***Đánh giá độ phức tạp:*** Giải thuật có độ phức tạp $O\big(n \times \log(n)\big)$. Ngoài phương pháp Tìm kiếm nhị phân, bài toán này cũng có thể giải bằng cách sử dụng cấu trúc dữ liệu Interval Tree hoặc Binary Indexed Tree với độ phức tạp tương đương, nhưng tôi sẽ không đề cập ở đây vì cách đó thuộc vào phạm trù kiến thức khó hơn.

# II. Một số bài toán ứng dụng

## 1. Tô màu dãy số

### Đề bài

Cho dãy số $A$ gồm $n$ phần tử $a_1, a_2, \dots, a_n$. Hãy tìm cách tô màu các phần tử của dãy số bằng ít màu nhất có thể, sao cho các phần tử được tô cùng màu thì đều tạo thành dãy con không tăng?

***Input:***

- Dòng đầu tiên chứa số nguyên dương $n$ - số lượng phần tử của dãy số $(1 \le n \le 10^6)$.
- Dòng thứ hai chứa $n$ số nguyên $a_1, a_2, \dots, a_n$ phân tách nhau bởi dấu cách.

***Output:***

- Số nguyên duy nhất là số lượng màu tối thiểu cần sử dụng để tô màu dãy số.

***Sample Input:***

```
6
5 2 4 1 3 0
```

***Sample Output:***

```
2
```

### Phân tích ý tưởng

Có thể khẳng định rằng, số lượng màu ít nhất cần sử dụng chính là độ dài của dãy con tăng dài nhất trong dãy $A$.

***Chứng minh:*** Gọi $x$ là độ dài dãy con tăng dài nhất, và $y$ là số lượng tối thiểu dãy con không tăng sao cho những dãy đó chứa toàn bộ các phần tử của dãy số. Ta sẽ chứng minh rằng $x = y$.

Thật vậy, ta thấy rằng trường hợp $y < x$ là không thể xảy ra, bởi vì một khi ta đã có $x$ phần tử tăng ngặt, thì không thể có hai phần tử nào trong tập đó cùng thuộc vào một dãy con không tăng. Do đó, mỗi phần tử trong dãy con tăng dài nhất phải thuộc vào một dãy con không tăng khác nhau, nhờ thế $y \ge x$.

Bây giờ, giả sử $y > x$. Coi như ta đã có một tập gồm $y$ dãy con không tăng, mỗi dãy tô một màu và $y$ là nhỏ nhất (tối ưu). Ta biến đổi tập các dãy này theo cách sau: 
- Chọn ra hai dãy con sao cho dãy thứ nhất bắt đầu trước dãy thứ hai trong dãy số ban đầu, và phần tử bắt đầu của dãy thứ nhất lớn hơn hoặc bằng phần tử bắt đầu của dãy thứ hai. 
- Kế đến, lấy phần tử bắt đầu của dãy thứ nhất đem ghép vào dãy thứ hai (đổi màu tô cho nó). 
- Thực hiện như vậy sau một số bước hữu hạn, chắc chắn ta sẽ thu được $y$ dãy con mà các phần tử bắt đầu của chúng tạo thành một dãy con tăng độ dài $y$. Mà $x$ là độ dài dãy con tăng dài nhất, nên $y < x \to$ mâu thuẫn với giả sử. 

Vì thế, chắc chắn $x = y$ và ta có điều phải chứng minh.

### Cài đặt

Do bài toán không yêu cầu truy vết lại dãy con tăng dài nhất, nên ta có thể cải tiến cài đặt bằng cách sử dụng hàm tìm kiếm nhị phân có sẵn trong C++ hoặc Python. Ý tưởng là lưu dãy $a_{\text{endpos}[1]}, a_{\text{endpos}[2]},...$ vào một mảng $d[i]$ - tức là $d[i]$ lưu phần tử nhỏ nhất mà dãy con tăng dài nhất kết thúc tại nó có độ dài $i,$ rồi tìm kiếm nhị phân trên mảng $d$ để chọn ra độ dài $p$ nhỏ nhất mà $d[p] \ge a_i,$ khi đó ta sẽ xem xét thay $a_i$ thành phần tử cuối của dãy con tăng độ dài $p$. Còn nếu không tìm thấy giá trị $p$ nào như vậy, nghĩa là dãy con tăng kết thúc tại $a_i$ được nối dài thành $p + 1$.

***Ngôn ngữ C++:***

```cpp=
#include <bits/stdc++.h>

using namespace std;

const int maxn = 1e6 + 10;

void enter(int &n, vector < int > &a)
{
    cin >> n;

    a.resize(n + 1, 0);

    for (int i = 1; i <= n; ++i)
        cin >> a[i];
}

void solution(int n, vector < int > &a)
{
    vector < int > d(n + 1, 0);
	
    int res = 0;
    for (int i = 1; i <= n; ++i)
    {
        int p = lower_bound(d.begin() + 1, d.begin() + res + 1, a[i]) - d.begin();
        res = max(res, p);
        d[p] = a[i];
    }

    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    int n;
    vector < int > a;

    enter(n, a);
    solution(n, a);

    return 0;
}
```

***Ngôn ngữ Python:***

```python=
def solution(n, a):
    d = [0] * (n + 1)

    res = 1
    d[1] = a[0]

    for i in range(1, n):
        p = res + 1

        l, r = 1, res
        while l <= r:
            mid = (l + r) // 2

            if d[mid] >= a[i]:
                p = mid
                r = mid - 1
            else:
                l = mid + 1

        res = max(res, p)
        d[p] = a[i]

    print(res)


if __name__ == '__main__':
    n = int(input())
    a = [int(i) for i in input().split()]

    solution(n, a)
```

## 2. Dãy con hình nón

### Đề bài

Cho một dãy số $A$ gồm $n$ phần tử $a_1, a_2, \dots, a_n$. Một dãy con $a_{i_1}, a_{i_2}, \dots, a_{i_k}$ của $A$ được gọi là dãy con hình nón nếu như trong dãy đó tồn tại một vị trí $i_{mid}$ thỏa mãn:

$$a_{i_1} < a_{i_2} < \dots < a_{i_{mid}} > a_{i_{mid + 1}} > \dots > a_{i_k}$$

Hãy tìm dãy con hình nón dài nhất trong dãy đã cho?

***Input:***

- Dòng đầu tiên chứa số nguyên dương $n$ - số phần tử dãy số $(1 \le n \le 10^6)$.
- Dòng thứ hai chứa $n$ số nguyên $a_1, a_2, \dots, a_n$ phân tách nhau bởi dấu cách.

***Output:***

- Số nguyên duy nhất là độ dài dãy con hình nón dài nhất tìm được.

***Sample Input:***

```
6
1 5 2 8 9 5 0
```

***Sample Output:***

```
5
```

### Phân tích ý tưởng

Ta nhận thấy, một dãy con hình nón sẽ được chia làm hai nửa: nửa phía trước là một dãy con tăng ngặt, nửa phía sau là một dãy con giảm ngặt, và hai dãy này sẽ có chung phần tử ở giữa.

Gọi $l[i]$ là độ dài dãy con tăng dài nhất kết thúc tại $a_i,$ xét theo chiều từ $1$ tới $i$. Tương tự, gọi $r[i]$ là độ dài dãy con tăng dài nhất kết thúc tại $a_i$ nhưng xét theo chiều từ $n$ về $i$. Ta tính hai mảng này bằng phương pháp Quy hoạch động kết hợp với Tìm kiếm nhị phân giống như bài toán dãy con tăng dài nhất.

Sau đó, xét mọi vị trí $i,$ ta sẽ có được độ dài dãy con hình nón nhận $a_i$ làm tâm là: $l[i] + r[i] - 1$. Chọn kết quả lớn nhất ở tất cả các vị trí $i,$ ta sẽ thu được kết quả cuối cùng.

### Cài đặt

***Ngôn ngữ C++:***

```cpp=
#include <bits/stdc++.h>
#define int long long
#define task "wavio."

using namespace std;

void enter(int &n, vector < int > &a)
{
    cin >> n;

    a.resize(n + 1, 0);
    for (int i = 1; i <= n; ++i)
        cin >> a[i];
}

void solution(int &n, vector < int > &a)
{
    vector < int > d(n + 1, 0);
    vector < int > l(n + 1, 0);
    vector < int > r(n + 1, 0);
    int max_length = 0;

    for (int i = 1; i <= n; ++i)
    {
        int p = lower_bound(d.begin() + 1, d.begin() + max_length + 1, a[i]) - d.begin();
        max_length = max(max_length, p);

        l[i] = p;
        d[p] = a[i];
    }

    d.resize(n + 1, 0);
    max_length = 0;

    for (int i = n; i >= 1; --i)
    {
        int p = lower_bound(d.begin() + 1, d.begin() + max_length + 1, a[i]) - d.begin();
        max_length = max(max_length, p);

        r[i] = p;
        d[p] = a[i];
    }

    int res = 0;
    for (int i = 1; i <= n; ++i)
        res = max(res, r[i] + l[i] - 1);

    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    vector < int > a;

    enter(n, a);
    solution(n, a);

    return 0;
}
```

***Ngôn ngữ Python:***

```python=
def solution(n, a):
    d = [0] * (n + 1)
    l = [0] * (n + 1)
    r = [0] * (n + 1)
	
    max_length = 1
    d[1] = a[0]

    for i in range(1, n):
        p = max_length + 1

        l, r = 1, res
        while l <= r:
            mid = (l + r) // 2

            if d[mid] >= a[i]:
                p = mid
                r = mid - 1
            else:
                l = mid + 1

        max_length = max(max_length, p)
        d[p] = a[i]

    max_length = 1
    d[1] = a[-1]
	
    for i in range(n - 2, -1, -1):
        p = max_length + 1

        l, r = 1, res
        while l <= r:
            mid = (l + r) // 2

            if d[mid] >= a[i]:
                p = mid
                r = mid - 1
            else:
                l = mid + 1

        max_length = max(max_length, p)
        d[p] = a[i]
		
		
    res = 0
    for i in range(0, n):
        res = max(res, l[i] + r[i] - 1)
		
    print(res)


if __name__ == '__main__':
    n = int(input())
    a = [int(i) for i in input().split()]

    solution(n, a)
```

# III. Tài liệu tham khảo

- https://cp-algorithms.com/sequences/longest_increasing_subsequence.html
- <a href="https://github.com/prasadgujar/CompetitiveProgramming/blob/master/book/Competitive%20Programming%203.pdf">Competitive Programming 3 - Steven Halim & Felix Halim</a>.
- <a href="https://cuongquach.com/ebook-giai-thuat-va-lap-trinh-lmh-pdf.html">Sách Giải thuật và Lập trình - thầy Lê Minh Hoàng</a>.
- <a href="https://downloadsachmienphi.com/tai-lieu-giao-khoa-chuyen-tin-quyen-1/">Tài liệu giáo khoa chuyên Tin quyển 1 - thầy Hồ Sĩ Đàm</a>.