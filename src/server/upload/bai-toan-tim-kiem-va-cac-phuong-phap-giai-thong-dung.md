# I. Mở đầu về bài toán tìm kiếm

## 1. Tìm kiếm - một khái niệm quen thuộc trong cuộc sống

Có bao giờ bạn phải đau đầu vì để quên chiếc ví ở đâu đó trong nhà mà tìm mãi không thấy? Hay việc các bạn nữ luôn không thể nào tìm thấy bộ quần áo phù hợp để lên phố mặc dù số lượng trang phục xếp nặng trĩu trong tủ quần áo?
Cuộc sống chúng ta luôn gắn liền với việc tìm kiếm. Từ một đứa trẻ tò mò tìm kiếm khám phá từng điều thú vị của thế giới đến khi trưởng thành chúng ta phải chật vật tìm kiếm một nửa mảnh ghép còn lại của đời mình, mà ... có nhiều người còn phải chịu thua số phận và đành cam lòng gắn lên mình danh hiệu "FA".

Đừng nản chí, để giúp bạn giải quyết những vấn đề đó, hôm nay chúng ta sẽ cùng khám phá về thuật toán tìm kiếm trong lập trình - một giải thuật quen thuộc, hữu ích vô cùng trong Tin học mà còn có thể áp dụng ra đời sống, giúp bạn tìm thấy chân ái của đời mình!

## 2. Bài toán tìm kiếm trong Tin học

Cùng so sánh hai sự việc sau đây:
- Bạn đang cần tìm cục tẩy trong hộp bút.
- Tìm kiếm số $6$ ở vị trí nào trong một dãy số cho trước.

Mục tiêu tìm kiếm trong cả hai bài toán đều đã được xác định, đó là "cục tẩy" và "số $6$" (cần tìm thấy số $6$ xong mới có được vị trí). Và tập "dữ liệu" của chúng ta có (hay phạm vi tìm kiếm) chính là "những đồ vật trong hộp bút" hoặc "các số trong dãy số đã cho trước". Có thể hiểu, tìm kiếm là quá trình tìm một phần tử nằm trong một tập hợp rất nhiều phần tử dựa vào một yêu cầu nào đó.

Trong Tin học, với sự giúp đỡ của máy tính, rất nhiều thuật toán tìm kiếm đã ra đời với tính hiệu quả ngày càng tăng cao. Những thuật toán tìm kiếm cơ bản nhất có thể kể đến là ***Tìm kiếm tuần tự*** và ***Tìm kiếm nhị phân***. Ngoài ra, áp dụng thêm những cấu trúc dữ liệu trong khi tìm kiếm có thể cho ra những thuật toán có hiệu quả cao hơn nữa. 

Bài toán tìm kiếm trong Tin học có thể phát biểu như sau:
"Cho một dãy gồm $n$ đối tượng $a_1, a_2,..., a_n$. Mỗi đối tượng $a_i$ có một khóa $key \ (1 \le i \le n)$ gọi là ***khóa tìm kiếm***. Cần tìm kiếm đối tượng có khóa bằng $k$ cho trước, tức là $a_i.key = k$".
Quá trình tìm kiếm sẽ hoàn thành nếu như có một trong hai trường hợp sau đây xảy ra:
- Tìm được đối tượng có khóa tương ứng bằng $k,$ khi đó phép tìm kiếm thành công.
- Không tìm được đối tượng nào có khóa tương ứng bằng $k,$ khi đó phép tìm kiếm thất bại.

Dưới đây, mình sẽ trình bày một số thuật toán thông dụng để giải quyết bài toán trên!

# II. Giải thuật tìm kiếm tuần tự (Sequential Search)

***Ý tưởng:*** Tìm kiếm tuần tự (Sequential Search hay Linear Search) là một giải thuật đơn giản, rất dễ cài đặt. Bắt đầu từ đối tượng $a_1,$ duyệt qua tất cả các đối tượng, cho tới khi tìm thấy đối tượng có khóa mong muốn, hoặc duyệt hết toàn bộ dãy mà không tìm thấy khóa đó.


![](https://images.viblo.asia/full/a3a7040d-a94c-4bb8-a1b0-471c9b973698.gif)

***Mô phỏng giải thuật C++:***

```cpp
sequential_search(a[], n, k)
{
    for (i = 1; i <= n; ++i)
        if (a[i].key == k)
            return i;
            
    // Không tìm thấy đối tượng nào có khóa bằng k, trả về -1.
    return -1;
}
```

***Đánh giá:*** Mặc dù giải thuật Tìm kiếm tuần tự rất đơn giản và dễ cài đặt, tuy nhiên nhược điểm của nó nằm ở độ phức tạp. Trong trường hợp tốt nhất, giải thuật có độ phức tạp là $O(1),$ nhưng trong trường hợp xấu nhất lên tới $O(n)$. Vì vậy độ phức tạp tổng quát của giải thuật là $O(n),$ chỉ phù hợp với những bài toán có kích thước không gian tìm kiếm nhỏ.

***Ví dụ:*** Cho một dãy số $a$ gồm $n$ số nguyên $a_1, a_2,..., a_n \ (1 \le n \le 1000)$. Hãy xác định xem số fibonacci thứ $k \ (1 \le k \le 100)$ có xuất hiện trong dãy số hay không, nếu có thì đưa ra vị trí xuất hiện đầu tiên, ngược lại đưa ra $-1$.

Trước tiên, ta dùng vòng lặp để tìm ra số fibonacci thứ $k,$ rồi tìm kiếm tuần tự trên dãy số ban đầu để tìm ra vị trí của số fibonacci thứ $k$ trong dãy.

***Cài đặt:*** 

```cpp
#include <bits/stdc++.h>

using namespace std;

// Tìm kiếm tuần tự.
int sequential_search(int a[], int n, long long kth_fibo)
{
    for (int i = 1; i <= n; ++i)
        if (a[i] == kth_fibo)
            return i;
            
    return -1;
}

// Tìm số fibonacci thứ k.
long long find_kth_fibo(int k)
{
    if (k <= 1)
        return k;
        
    long long f0 = 0, f1 = 1, fk;
    for (int i = 2; i <= k; ++i)
    {
        fk = f0 + f1;
        f0 = f1;
        f1 = fk;
    }
    
    return fk;
}

int main()
{
    // Nhập dữ liệu n, k và dãy số.
    int n, k;
    cin >> n >> k;
    
    int a[n + 1];
    for (int i = 1; i <= n; ++i)
        cin >> a[i];
        
    cout << sequential_search(a, n, find_kth_fibo(k));
}
```

# III. Giải thuật tìm kiếm nhị phân

***Ý tưởng:*** Trước tiên, không gian tìm kiếm cần được sắp xếp lại theo chiều tăng dần hoặc giảm dần của khóa tìm kiếm (mục tiêu là để tạo ra dãy có tính thứ tự). Giả sử dãy đã được sắp xếp tăng dần theo khóa, giải thuật tìm kiếm nhị phân được thực hiện như sau:
- Giả sử cần tìm kiếm trong đoạn $a[l...r]$ với khóa tìm kiếm là $k,$ trước hết ta xét phần tử nằm ở giữa dãy là $a_{mid}$ với $mid = \left \lfloor{\frac{l + r}{2}} \right \rfloor$.
- Nếu $a_{mid}.key < k$ thì nghĩa là đoạn từ $a_l$ tới $a_{mid}$ chỉ chứa toàn các đối tượng có khóa nhỏ hơn $k,$ nên ta tiếp tục quá trình tìm kiếm trên đoạn từ $a_{mid + 1}$ tới $a_n$.
- Nếu $a_{mid}.key > k$ thì nghĩa là đoạn từ $a_{mid}$ tới $a_r$ chỉ chứa toàn các đối tượng có khóa lớn hơn $k,$ nên ta tiếp tục quá trình tìm kiếm trên đoạn từ $a_1$ tới $a_{mid - 1}$.
- Nếu $a_{mid}.key = k$ thì quá trình tìm kiếm thành công. 

Quá trình tìm kiếm sẽ thất bại nếu như đến một bước nào đó, tập tìm kiếm bị rỗng $(l > r)$.

***Mô phỏng giải thuật C++:***

```cpp
binary_search(a, k)
{
    // Sắp xếp lại các đối tượng tăng dần theo khóa tìm kiếm.
    sort(a);

    l = 1, r = n;
    // Trong khi tập tìm kiếm chưa rỗng th
    while (l <= r)
    {
        mid = (l + r) / 2;

        // Đã tìm thấy đối tượng có khóa bằng k, trả về vị trí.
        if (a[mid].key == k)
            return mid;
        
        /// Điều chỉnh khoảng tìm kiếm cho phù hợp.
        if (a[mid].key < k)
            l = mid + 1;
        else 
            r = mid - 1;
    }
    
    // Không tìm thấy khóa, trả về -1.
    return -1;
}
```

***Đánh giá:*** 
- Trong trường hợp tốt nhất, giải thuật Tìm kiếm nhị phân cho ta độ phức tạp $O(1)$. Còn trong trường hợp xấu nhất, do tập tìm kiếm luôn luôn được chia đôi ra, nên số thao tác chỉ mất $O(\log_2(n))$. Vì thế, độ phức tạp tổng quát của giải thuật là $O(\log(n))$.
- Tuy nhiên, giải thuật Tìm kiếm nhị phân chỉ có thể thực hiện trên một tập đã sắp xếp, chính vì thế chi phí sắp xếp cũng cần được tính đến. Nếu như dãy số bị thay đổi bởi các thao tác thêm, xóa hay sửa phần tử, thì việc sắp xếp cũng phải thực hiện lại liên tục, từ đó dẫn đến thời gian thực thi bị tăng lên.
- Hình minh họa dưới đây sẽ thể hiện so sánh tương quan giữa hai giải thuật ***Sequential Search*** và ***Binary Search*** trong cả ba trường hợp: Tốt nhất, trung bình và xấu nhất:

<div style='text-align: center'>

![](https://i.imgur.com/sSg753Z.gif)


***Trường hợp tốt nhất***

![](https://i.imgur.com/YHi00l7.gif)



***Trường hợp trung bình***

![](https://i.imgur.com/ce2dkRv.gif)


***Trường hợp xấu nhất***
</div>

***Ví dụ:*** Cho dãy số $A$ gồm $n \ (1 \le n \le 10^5)$ phần tử nguyên dương $a_1, a_2,..., a_n \ (a_i \le 10^9)$. hãy xác định số chính phương nhỏ nhất không xuất hiện trong dãy số?

Với bài toán này, phương pháp đếm phân phối cũng có thể được áp dụng, tuy nhiên mình sẽ trình bày phương pháp tìm kiếm nhị phân để minh họa cách áp dụng giải thuật. Đầu tiên, sắp xếp dãy số đã cho theo thứ tự tăng dần. Ta nhận thấy, do $a_i \le 10^9$ nên $\sqrt{a_i} \le \sqrt{10^9}$. Vậy chỉ cần duyệt qua các giá trị $i$ từ $0$ tới $\sqrt{\text{max}(a_i)} + 1,$ sau đó tìm kiếm nhị phân trên dãy xem có tồn tại giá trị $i^2$ hay không, nếu không thì đó chính là số chính phương nhỏ nhất không xuất hiện trong dãy.

```cpp
#include <bits/stdc++.h>

using namespace std;

int binary_search(int a[], int n, int value)
{
    // Tìm kiếm nhị phân, nếu tìm thấy giá trị value trong dãy số thì trả về true.
    int l = 1, r = n;
    while (l <= r)
    {
        int mid = (l + r) / 2;
        
        if (a[mid] == value)
            return true;
            
        if (a[mid] < value)
            l = mid + 1;
        else 
            r = mid - 1;
    }
    
    // Nếu không tìm thấy, trả về false.
    return false;
}

int main()
{
    int n;
    cin >> n;
    
    int a[n + 1];
    for (int i = 1; i <= n; ++i)
        cin >> a[i];
        
    // Sắp xếp mảng tăng dần.
    sort(a + 1, a + n + 1);
    
    // Tìm giá trị lớn nhất trong mảng.
    int max_value = *max_element(a + 1, a + n + 1);
    // Duyệt các căn bậc hai có thể, tìm kiếm nhị phân bình phương của nó.
    for (int i = 0; i <= sqrt(max_value) + 1; ++i)
        if (!binary_search(a, n, i * i))
        {
            cout << i * i;
            break;
        }
}
```

# IV. Tài liệu tham khảo

- https://www.geeksforgeeks.org/binary-search/
- <a href="https://cuongquach.com/ebook-giai-thuat-va-lap-trinh-lmh-pdf.html">Sách Giải thuật và Lập trình - thầy Lê Minh Hoàng</a>
- https://vi.wikipedia.org/wiki/T%C3%ACm_ki%E1%BA%BFm_nh%E1%BB%8B_ph%C3%A2n
- https://vnoi.info/wiki/algo/basic/binary-search.md