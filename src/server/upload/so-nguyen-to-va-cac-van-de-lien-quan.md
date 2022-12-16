# I. Số nguyên tố và Hợp số

## 1. Giới thiệu

Số nguyên tố là số nguyên dương lớn hơn $1$ và chỉ có đúng hai ước là $1$ và chính nó. 

Hợp số, là các số nguyên dương lớn hơn $1$ và có nhiều hơn hai ước.

Lấy ví dụ: $5$ là một số nguyên tố, vì nó chỉ có đúng hai ước là $1$ và $5$. Ngược lại $10$ là một hợp số vì nó có bốn ước là $1, 2, 5$ và $10$. Số nguyên tố và các vấn đề xoay quanh nó luôn là một chủ đề được yêu thích trong Toán học nói chung và lập trình thi đấu nói riêng.

## 2. Kiểm tra tính nguyên tố của một số

### 2.1. Giải thuật cơ sở

Ý tưởng ban đầu rất đơn giản: Ta duyệt qua tất cả các số nguyên từ $2$ tới $N - 1,$ nếu như có số nào là ước của $N$ thì kết luận $N$ không phải số nguyên tố. Giải thuật có độ phức tạp $O(N)$.

```cpp
bool is_prime(int N)
{
    if (N < 2)
        return false;

    for (int i = 2; i < N; ++i)
        if (N % i == 0)
            return false;

    return true;
}
```

### 2.2. Cải tiến:

Xuất phát từ nhận xét sau: Giả sử số nguyên dương $N$ có ước là $D$ $(0 < D \le \sqrt{N}),$ khi đó $N$ sẽ có thêm một ước là $\frac{N}{D} (\sqrt{N} \le \frac{N}{D} \le N)$. Như vậy ta chỉ cần kiểm tra các số nguyên từ $2$ tới $\sqrt{N}$ xem $N$ có chia hết cho số nào không, nếu không thì kết luận $N$ là số nguyên tố. Giải thuật có độ phức tạp chỉ là $O(\sqrt{N})$.

```cpp
bool is_prime(int N)
{
    if (N < 2)
        return false;

    for (int i = 2; i * i <= N; ++i)
        if (N % i == 0)
            return false;

    return true;
}
```

# II. Sàng lọc số nguyên tố Eratosthenes

## 1. Giới thiệu

Sàng Eratosthenes là một giải thuật cổ xưa do nhà Toán học người Hy Lạp Eratosthenes phát minh ra để tìm các số nguyên tố nhỏ hơn $100$. Tương truyền, khi tìm ra thuật toán, ông đã lấy lá cọ và ghi tất cả các số từ $2$ cho đến $100$ lên đó, sau đó chọc thủng các hợp số và giữ nguyên các số nguyên tố. Bảng số nguyên tố còn lại trông rất giống một cái sàng. Do đó, nó có tên là sàng Eratosthenes. 


<img width="500" height="400"   style="display: block;  margin: 0 auto;"
     src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Animation_Sieb_des_Eratosthenes_%28vi%29.gif"> 


Với sự phát triển của máy tính, sàng Eratosthenes trở thành một công cụ rất hữu dụng để tìm ra các số nguyên tố trong một khoảng nhất định, với điều kiện bộ nhớ có thể lưu trữ được.

## 2. Cài đặt giải thuật

Nguyên lý hoạt động của sàng Eratosthenes như sau: Xét các số nguyên tố từ $2$ tới $\sqrt{N},$ với mỗi số nguyên tố ta sẽ đánh dấu các bội của nó mà lớn hơn nó đều là hợp số. Sau khi duyệt xong, tất cả các số chưa được đánh dấu sẽ là số nguyên tố. Dưới đây cài đặt sàng lọc các số nguyên tố từ $1$ tới $N$.

```cpp
void eratosthenes_sieve(int N)
{
    fill(is_prime, is_prime + 1 + N, true); // Mảng đánh dấu một số có phải số nguyên tố không.
    is_prime[0] = is_prime[1] = false; // 0 và 1 không phải số nguyên tố.
    
    for (int i = 2; i * i <= N; ++i)
        if (is_prime[i]) // Nếu i là số nguyên tố
            for (int j = i * i; j <= N; j += i) // Loại bỏ các bội của i lớn hơn i
                is_prime[j] = false;
}
```

Bạn đọc có thể thắc mắc tại sao các bội của $i$ lại không bắt đầu từ $2.i$. Lí do là vì, vòng lặp duyệt các số nguyên tố tăng dần, khi tới số nguyên tố $i$ thì các bội $2.i, 3.i,..., (i - 1).i$ đều đã bị loại đi trước đó bởi các số nguyên tố nhỏ hơn $i$ rồi. Cũng chính nhờ điều này nên vòng lặp bên ngoài chỉ cần duyệt từ $2$ tới $\sqrt{N}$, giúp giảm độ phức tạp của giải thuật đi nhiều.

Đánh giá độ phức tạp giải thuật: 
  - Với $i = 2$, vòng lặp bên trong lặp $\frac{N}{2}$ lần.
  - Với $i = 3$, vòng lặp bên trong lặp $\frac{N}{3}$ lần.
  - Với $i = 5$, vòng lặp bên trong lặp $\frac{N}{5}$ lần.
    $...$
Tổng số lần lặp sẽ là $N.(\frac{1}{2}+\frac{1}{3}+\frac{1}{5}+...)$, độ phức tạp sẽ tiến tới $O(N.log(N))$.

## 3. Sàng số nguyên tố trên đoạn

Ở một số trường hợp, người ta cần tìm các số nguyên tố trên đoạn $[L, R]$ cho trước và $R$ có thể lên tới $10^{12},$ với điều kiện có thể tạo được một mảng có độ dài $(R - L + 1)$. 

Ý tưởng giải thuật như sau: Sàng lọc trước một mảng gồm các số nguyên tố trong đoạn $[2...\sqrt{R}]$, sau đó duyệt qua các số nguyên tố này, loại bỏ các bội của chúng nằm trong đoạn $[L, R]$. Code dưới đây cải tiến một chút để bỏ bớt bước tạo mảng số nguyên tố trong đoạn $[2...\sqrt{R}],$ nhằm tiết kiệm thời gian chạy.

```cpp
void range_eratosthenes(int L, int R)
{
    int range = R - L + 1;
    fill(is_prime, is_prime + 1 + range, true);

    // Duyệt các bội của i từ bội nhỏ nhất thuộc đoạn [L, R].
    for (long long i = 2; i * i <= R; ++i)
        for (long long j = max(i * i, (L + i - 1) / i * i); j <= R; j += i)
            is_prime[j - L] = false;

    if (L == 1)
        is_prime[0] = false;
}
```

Như vậy với một số $X$ trong đoạn $[L, R], X$ là số nguyên tố khi và chỉ khi $\text{is\_prime}[X - L]=true$. Thuật toán có độ phức tạp là $O((R - L + 1).log(R) + \sqrt{R})$. Trên thực tế nó chạy khá nhanh.

# III. Phân tích thừa số nguyên tố

Vấn đề phân tích thừa số nguyên tố cũng khá được quan tâm trong lập trình thi đấu, và nó còn có một số ứng dụng khác trong số học. Dưới đây chúng ta sẽ xem xét vài phương pháp phân tích thừa số nguyên tố thường dùng.

## 1. Giải thuật cơ sở

Ta xét mọi số nguyên tố bắt đầu từ $2,$ nếu $N$ chia hết cho số nguyên tố $P$ thì chia $N$ cho $P$ tới khi không thể chia hết nữa, rồi tăng $P$ lên và lặp lại công việc tới khi $N=1$. Trên thực tế thừa số nguyên tố chính là thành phần cấu tạo nên một ước của $N,$ do đó khi tách hết một thừa số nguyên tố $X$ khỏi $N$ thì $N$ sẽ không thể chia hết cho các bội lớn hơn $X$ nữa.

***Cài đặt:***

```cpp
vector < int > extract(int N)
{
    int p = 2;
    vector < int > prime_factor; // Lưu thừa số nguyên tố vào vector.

    while (N > 1)
    {
        while (N % p == 0)
        {
            prime_factor.push_back(p);
            N /= p;
        }

        ++p;
    }

    return prime_factor;
}
```

## 2. Cải tiến lần 1

Xuất phát từ nhận xét sau: Không thể xảy ra trường hợp mọi thừa số nguyên tố của $N$ đều lớn hơn $\sqrt{N},$ do đó chúng ta chỉ cần xét các ước của $N$ từ $2$ tới $\sqrt{N}$ và chia dần $N$ cho các ước của nó tới khi $N$ bằng $1$. Nếu không thể tìm được ước nào từ $2$ tới $\sqrt{N}$ thì $N$ phải là một số nguyên tố. Độ phức tạp giải thuật là $O(\sqrt{N})$.

***Cài đặt:***

```cpp
vector < int > extract(int N)
{
    vector < int > prime_factor;

    for (int i = 2; i * i <= N; ++i)
        while (N % i == 0)
        {
            prime_factor.push_back(i);
            N /= i;
        }

    if (N > 1)
        prime_factor.push_back(i);

    return prime_factor;
}
```


## 3. Phân tích thừa số nguyên tố bằng sàng Eratosthenes:

Từ hai giải thuật trên ta thấy: Ở mỗi bước phân tích cần tìm ra ước nguyên tố nhỏ nhất của $N$ rồi chia $N$ cho ước đó. Ta sẽ thay đổi sàng Eratosthenes đi một chút để lấy được ngay ước nguyên tố nhỏ nhất của $N$ trong $O(1)$ ở mỗi bước phân tích, điều này sẽ giúp giảm thời gian chạy đi đáng kể.

***Cài đặt:***

```cpp
void eratosthenes_sieve(int N)
{
    fill(smallest_divisor + 1, smallest_divisor + 1 + N, 0); // Ước nguyên tố nhỏ nhất của N, lưu vào mảng.
    fill(is_prime, is_prime + 1 + N, true);
    is_prime[0] = is_prime[1] = false;

    for (int i = 2; i * i <= N; ++i)
        if (is_prime[i]) // Nếu i là số nguyên tố
            for (int j = i * i; j <= N; j += i)
            {
                is_prime[j] = false;
                    
                if (smallest_divisor[j] == 0)
                    smallest_divisor[j] = i; // Ước nguyên tố nhỏ nhất của j là i.
            }

    // Xét riêng các trường hợp i là số nguyên tố, ước nguyên tố nhỏ nhất là chính nó.
    for (int i = 2; i <= N; ++i)
        if (is_prime[i])
            smallest_divisor[i] = i;
}

vector < int > extract(int N)
{
    eratosthenes_sieve(maxN); // Sàng số nguyên tố tới một giá trị nào đó. 

    vector < int > prime_factor;

    while (N > 1)
    {
        int p = smallest_divisor[N];
        prime_factor.push_back(p);
        N /= p;
    }

    return prime_factor;
}
```

Mặc dù việc thực hiện sàng Eratosthenes vẫn mất $O(N.logN),$ tuy nhiên thao tác phân tích một số $P$ thành thừa số nguyên tố chỉ mất độ phức tạp $O(logP)$. Điều này sẽ rất có lợi trong các bài toán phải phân tích thừa số nguyên tố nhiều lần.

## 4. Đếm số ước của một số nguyên

Giả sử ta phân tích được $N$ thành các thừa số nguyên tố ở dạng:
$$N=p_1^{k_1}\times p_2^{k_2}\times ... \times p_m^{k_m}$$

Các ước số của $N$ sẽ phải có dạng:
$$p_1^{r_1}\times p_2^{r_2}\times ...\times p_m^{r_m}$$



với $0 \le r_1 \le k_1, 0 \le r_2 \le k_2,..., 0 \le r_m \le k_m$.


Theo nguyên lý nhân, ta thấy: $r_1$ có $k_1 + 1$ cách chọn, $r_2$ có $k_2 + 2$ cách chọn,..., $r_m$ có $k_m + 1$ cách chọn. Như vậy số lượng ước của $N$ sẽ được tính theo công thức:
$$F_N=(k_1+1)\times (k_2+1) \times ... \times (k_m+1)$$

Từ đây, ta có ý tưởng đếm số ước của một số nguyên dương N như sau:
- Phân tích $N$ thành thừa số nguyên tố.
- Đặt một biến $\text{cnt\_x}$ là số lần xuất hiện của thừa số nguyên tố $x$ trong phân tích của $N$. Ta vừa phân tích $N$ vừa cập nhật số lượng thừa số nguyên tố lên biến $\text{cnt\_x}$.

***Cài đặt:***

```cpp
int count_divisors(int N)
{
    int total_divisor = 1; // Chắc chắn N có ước là 1.
    for (int i = 2; i * i <= N; ++i)
    {
        int cnt = 0; // Đếm số lượng thừa số nguyên tố i trong phân tích của N.
        while (N % i == 0)
        {
            ++cnt;
            N /= i;
        }

        total_divisors *= (cnt + 1);
    }

    if (N > 1)
        total_divisors *= 2;

    return total_divisors;
}
```

Bạn đọc hãy tự suy nghĩ thêm cách sử dụng sàng Eratosthene để đếm số ước của số nguyên dương $N,$ sẽ rất hữu dụng trong các bài toán cần đếm nhanh số ước của $N$.

## 5. Tính tổng các ước số nguyên dương của một số nguyên dương

***Định lý:*** Nếu một số nguyên dương $N$ khi phân tích ra thừa số nguyên tố có dạng:

$N=p_1^{k_1}\times p_2^{k_2}\times ... \times p_m^{k_m} \text{ } (k_i \ne 0; \forall i: 1 \le i \le m)$ thì tổng các ước nguyên dương của nó được tính theo công thức:
$$\sigma(N) = \prod_{i = 1}^k (\frac{p_i^{m_i + 1}}{p_i - 1})$$

***Chứng minh:*** Các ước số của $N$ sẽ phải có dạng:
$$p_1^{r_1}\times p_2^{r_2}\times ...\times p_m^{r_m}$$



với $0 \le r_1 \le k_1, 0 \le r_2 \le k_2,..., 0 \le r_m \le k_m$.


$\rightarrow$ Tổng các ước của $N$ là:

$\sigma(N) = \sum_{r_1=0}^{k_1} \sum_{r_2=0}^{k_2} \cdots \sum_{r_m = 0}^{k_m} (p_1^{r_1} \times p_2^{r_2} \times \cdots \times p_m^{r_m} = \sum_{r_1=0}^{k_1} p_1^{r_1} \times \sum_{r_2=0}^{k_2} p_2^{r_2} \times \cdots \times \sum_{r_m=0}^{k_m} p_m^{r_m} \ (1)$

Mà ta có công thức dãy cấp số nhân sau:
$$p^0 + p^1 + p^2 +...+ p^n = \frac{p^{n + 1} - 1}{p - 1} \ (2)$$

Từ $(1)$ và $(2)$, ta có:
$$\sigma(N) = \frac{p_1^{k_1 + 1} - 1}{p_1 - 1} \times \frac{p_2^{k_2 + 1} - 1}{p_2 - 1} \times \cdots \times \frac{p_m^{k_m + 1} - 1}{p_m - 1}$$

***Cài đặt:***

```cpp
int exponentiation(int A, int B)
{
    if (B == 0)
        return 1;

    int half = exponentiation(A, B / 2);

    if (B & 1)
        return half * half * A;
    else 
        return half * half;
}

int get_sum_divisors(int N)
{
    if (N == 1)
        return 1;

    int sum_divisor = 1;
    for (int i = 2; i * i <= N; ++i)
    {
        int cnt = 0; // Đếm số lượng thừa số nguyên tố i trong phân tích của N.
        while (N % i == 0)
        {
            ++cnt;
            N /= i;
        }

        if (cnt != 0)
            sum_divisors *= ((exponentiation(i, cnt + 1) - 1) / (i - 1));
    }

    if (N > 1)
        sum_divisors *= (N * N / (N - 1));

    return sum_divisors;
}
```

Tương tự, bạn đọc hãy tự suy nghĩ cách cải tiến việc phân tích thừa số nguyên tố bằng sử dụng sàng lọc eratosthene, trong những bài toán multitest sẽ cực kỳ hữu dụng về mặt tối ưu thời gian chạy.

# Tài liệu tham khảo:

- [https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html](https://)
- [https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes](https://)
- [https://vnoi.info/wiki/translate/he/Number-Theory-2.md](https://)
- [https://cp-algorithms.com/algebra/factorization.html](https://)
- [https://www.geeksforgeeks.org/segmented-sieve-print-primes-in-a-range/?ref=rp](https://)
- https://www.mathvn.com/2020/01/chung-minh-inh-li-ve-ham-tong-cac-uoc.html
- https://www.mathvn.com/2020/01/cong-thuc-tinh-tong-cac-uoc-nguyen.html