# I. Đặt vấn đề

Chắc hẳn, ai trong chúng ta cũng đã quá quen thuộc với bài toán đếm số ước nguyên dương của $n$. Giải thuật thông thường nhất mà mọi người thường sử dụng là giải thuật $O(\sqrt{n}),$ dựa trên một nhận định rằng nếu như số $n$ có một ước là $i \ (1 \le i \le \sqrt{n})$ thì nó cũng sẽ có một ước nữa là $\frac{n}{i} \ \left(\sqrt{n} \le \frac{n}{i} \le n \right)$. Bằng phương pháp này, chúng ta có thể giải quyết mọi bài toán với giới hạn $n$ khoảng $10^{15}$ trở xuống (Các bạn xem lại trong chuyên đề <b><a href="https://viblo.asia/p/tim-cac-uoc-cua-mot-so-nguyen-duong-va-gcd-lcm-RQqKL696l7z">Tìm các ước của một số nguyên</a></b>).

Một phương pháp hay khác mà chúng ta cũng sử dụng là phân tích thừa số nguyên tố và đếm ước của $n$ dựa trên phân tích nguyên tố của nó. Cách làm này có thể khiến thao tác đếm ước của số $n$ giảm xuống độ phức tạp $O(\log(n))$ khi kết hợp với sàng lọc số nguyên tố, và thường được áp dụng trong các bài toán multi-testcase (các bạn xem lại trong chuyên đề <b><a href="https://viblo.asia/p/so-nguyen-to-va-cac-van-de-lien-quan-ORNZqnx8l0n">Số nguyên tố</a></b>). Tuy nhiên, nhược điểm của phương pháp này là bạn buộc phải tạo ra được một mảng có độ dài $n$ để đánh dấu các số nguyên tố, đồng nghĩa với việc nếu $n \le 10^9,$ các bạn không thể sử dụng được nó.

Điều gì sẽ xảy ra khi chúng ta cần đếm ước của một số nguyên dương $n \le 10^{18}?$ Phân tích thừa số nguyên tố? Không thể, vì ta không thể sàng lọc được số nguyên tố ở giới hạn này. Vậy phân tích theo phương pháp $O(\sqrt{n})$ truyền thống thì sao? Cũng không thể, vì $O(\sqrt{n}) \approx O(10^9),$ độ phức tạp này không đủ tốt. Khi đó, người ta sử dụng phương pháp đếm ước trong $O(n^{\frac{1}{3}}),$ một phương pháp rất hiệu quả nhưng lại được ít người biết đến, có lẽ vì chúng ta không thường xuyên gặp phải những bài toán như vậy. Trong chuyên đề này, chúng ta sẽ cùng nghiên cứu ý tưởng và cách cài đặt của phương pháp này bằng C++. Trước khi đọc bài viết, các bạn cần có kiến thức đầy đủ về sàng lọc số nguyên tố, đếm ước theo phương pháp thông thường cũng như kĩ năng code ở mức khá. Nếu chưa nắm được những kiến thức này, các bạn hãy quay lại nghiên cứu những chuyên đề cũ mà mình đã để link ở trên nhé!

# II. Phương pháp đếm số ước của một số trong $O(n^{\frac{1}{3}})$

## 1. Phương pháp kiểm tra nguyên tố Fermat

Để sử dụng được giải thuật đếm ước trong $O(n^{\frac{1}{3}}),$ trước tiên ta cần tìm hiểu về phương pháp của Fermat dùng để kiểm tra tính nguyên tố của một số. Đây là một phương pháp kiểm tra nguyên tố có tính xác suất, nghĩa là nó có thể xảy ra trường hợp sai, tuy nhiên, trong giải thuật này sự sai khác đó có thể chấp nhận được. 

***Ý tưởng:*** 
Phương pháp kiểm tra tính nguyên tố của Fermat được xây dựng dựa trên định lý Fermat nhỏ: *Nếu $n$ là một số nguyên tố, thì với mọi giá trị $a$ sao cho $1 \le a < n$ ta đều có: $a^{n - 1} \equiv 1 \ (\text{mod }n)$*. Chi tiết chứng minh định lý các bạn có thể đọc thêm ở <b><a href="https://en.wikipedia.org/wiki/Proofs_of_Fermat's_little_theorem">Wikipedia</a></b>. 

Dựa vào định lý trên, ta triển khai giải thuật như sau:
- Lấy ngẫu nhiên một số $a$ thuộc đoạn $[1, n - 1]$.
- Kiểm tra đẳng thức $a^{n - 1} \equiv 1 \ (\text{mod }n),$ nếu đẳng thức sai thì $n$ không phải là số nguyên tố, ngược lại $n$ ***có khả năng*** là một số nguyên tố.
- Lặp lại hai thao tác kiểm tra trên $k$ lần, giá trị $k$ càng lớn thì xác suất chính xác sẽ càng tăng.

Giải thuật kiểm tra tính nguyên tố của Fermat sẽ luôn luôn đúng nếu như $n$ đã là một số nguyên tố, ngược lại nó sẽ có thể sai. Tuy nhiên, như đã nói xác suất xảy ra sai khi $n$ là hợp số khá nhỏ, nên chúng ta hoàn toàn có thể sử dụng giải thuật Fermat trong một số trường hợp cụ thể. Bên cạnh đó, các bạn có thể tìm hiểu về một số giải thuật kiểm tra nguyên tố xác suất khác như Miller - Rabin hay Solovay - Strassen.

***Cài đặt:***

```cpp
// Phép nhân Ấn Độ (a * b) % mod. Sử dụng để tránh tràn số khi thực hiện phép nhân.
long long indian_multiplication(long long a, long long b, long long mod)
{
    if (b == 0)
        return 0LL;

    long long half = indian_multiplication(a, b / 2LL, mod) % mod;

    if (b & 1)
        return (half + half + a) % mod;
    else
        return (half + half) % mod;
}

// Tính (a^b) % mod. Sử dụng kết hợp với phép nhân Ấn Độ để tránh tràn số khi thực hiện phép nhân.
long long modular_exponentiation(long long a, long long b, long long mod)
{
    if (b == 0)
        return 1LL;

    long long half = modular_exponentiation(a, b / 2LL, mod) % mod;
    long long product = indian_multiplication(half, half, mod);

    if (b & 1)
        return indian_multiplication(product, a, mod);
    else
        return product;
}

// Thực hiện kiểm tra Fermat với k = 50 lần.
bool fermat_checking(long long n, int k = 50)
{
    // Xủ lý trước một số trường hợp để tăng tính chính xác.
    // Cần tránh trước trường hợp n = 4, do trường hợp này kiểm tra Fermat bị sai.
    if (n < 4)
        return n == 2 || n == 3;
    
    if (n != 2 && n % 2 == 0)
        return false;
        
    for (int i = 1; i <= k; ++i)
    {
        long long a = 2 + rand() % (n - 3);
        if (modular_exponentiation(a, n - 1, n) != 1)
            return false;
    }
    
    return true;
}
```

Giải thuật có độ phức tạp $O(k \times \log(n))$.

## 2. Phương pháp kiểm tra nguyên tố Miller - Rabin

Phương pháp nói trên của Fermat có ưu thế là cài đặt đơn giản, ngắn gọn, tuy nhiên xác suất sai sẽ dễ xảy ra trong trường hợp số $n$ đưa vào là một số ***giả nguyên tố*** (tức là hợp số nhưng vẫn thỏa mãn $a^n \equiv 1 \ (\text{mod }n)$ với $a$ nào đó). Chính vì thế, khi cần tới độ chính xác cao, người ta thường sử dụng phương pháp kiểm tra tính nguyên tố Miller - Rabin, một phương pháp rất mạnh trong các phương pháp kiểm tra nguyên tố có tính xác suất.

***Ý tưởng:*** 
Giải thuật Miller - Rabin được xây dựng dựa trên một số nhận định sau:
- Đối với một số chẵn $n$ bất kỳ, ta luôn luôn có thể viết nó dưới dạng $n = 2^r \times d,$ với $d$ là một số lẻ và $r > 0 \ (1)$.
- Theo định lý nhỏ Fermat, nếu $n$ là một số nguyên tố, thì với mọi giá trị $a$ sao cho $1 \le a < n$ ta đều có: $a^{n - 1} \equiv 1 \ (\text{mod }n) \ (2)$.
- Theo bổ đề Euclid, giả sử $n$ là một số nguyên tố và $n = a \times b,$ thì chắc chắn $n$ phải chia hết cho một trong hai số $a$ hoặc $b$. Vậy nếu giả sử $n = (x^2 - 1) = (x - 1).(x + 1)$ thì chắc chắn $x \equiv 1 \ (\text{mod } n)$ hoặc $x \equiv -1 \ (\text{mod }n) \ (3)$.
- Từ $(1)$ và $(2),$ ta xây dựng dãy số $x_k = a^{2^k \times d}, \forall k: 0 \le k \le r$. Khi đó:
$$\begin{cases}x_k = (x_{k - 1})^2;&& \forall k: 1 \le k \le r.\\ x_r = a^{n - 1}. \end{cases} \ (4)$$
- Từ $(2)$ và $(4)$ ta có:
 
    $$x_r \equiv 1 \ (\text{mod }n)$$ 
    
    hay 
    
    $$(x_{r - 1})^2 \equiv 1 \ (\text{mod }n)$$ 
    
    nên $x_{r - 1} \equiv 1 \ (\text{mod }n)$ hoặc $x_{r - 1} \equiv -1 \ (\text{mod }n)$. Nếu thực hiện một số hữu hạn bước như trên với các giá trị $r$ giảm dần về $0,$ thì ta có:
    - Hoặc tồn tại $k \ (0 \le k < r)$ sao cho: $x_k \equiv -1 \ (\text{mod }n)$.
    - Hoặc $\forall k: 0 \le k < r$ thì $x_k \equiv 1 \ (\text{mod }n)$.

Dựa vào tất cả các nhận xét trên, ta có mệnh đề kiểm tra nguyên tố Miller - Rabin như sau: *Nếu $n$ là một số nguyên tố lẻ và $n - 1 = 2^r \times d \ (r > 0, d \text{ mod }2 \ne 0)$ thì $\forall a: 1 \le a < n,$ ta có:*
- *Hoặc $x_k = a^{2^k \times d} \equiv 1 \ (\text{mod }n); \forall k: 0 \le k \le r$*.
- *Hoặc $\exists k: 0 \le k \le r$ thỏa mãn: $x_k = a^{2^k \times d} \equiv -1 \ (\text{mod }n)$*.

Như vậy giải thuật có thể triển khai thành các bước sau:
- Bước $1$: Phân tích $n - 1 = 2^r \times d$ với $d$ là số tự nhiên lẻ và $r > 0$.
- Bước $2$: Chọn ngẫu nhiên $a$ thuộc $[1, n - 1]$ rồi đặt $\text{mod_val} = a^d \text{ mod } n$.
- Bước $3$: Liên tục bình phương $\text{mod_val}$ và lấy số dư khi chia cho $n,$ nếu như gặp một số dư khác $1$ hoặc $n - 1 \ ($ tương tự với $-1)$ thì trả về $\text{false}$.
- Bước $4$: Nếu như sau khi kiểm tra mọi $x_k \text{ mod } n$ mà không tồn tại giá trị nào khác $1$ hoặc $n - 1$ thì kết luận $\text{true}$. 

Thực hiện giải thuật trên $k$ lần, với $k$ càng lớn ta sẽ có độ chính xác càng cao. Đối với giải thuật Miller - Rabin thì chỉ cần sử dụng $k = 10$ là đã đủ an toàn.

***Cài đặt:*** 

```cpp
// Phép nhân Ấn Độ (a * b) % mod. Sử dụng để tránh tràn số khi thực hiện phép nhân.
int indian_multiplication(int a, int b, int mod)
{
    if (b == 0)
        return 0;

    int half = indian_multiplication(a, b / 2LL, mod) % mod;

    if (b & 1)
        return (half + half + a) % mod;
    else
        return (half + half) % mod;
}

// Tính (a^b) % mod. Sử dụng kết hợp với phép nhân Ấn Độ để tránh tràn số khi thực hiện phép nhân.
int modular_exponentiation(int a, int b, int mod)
{
    if (b == 0)
        return 1LL;

    int half = modular_exponentiation(a, b / 2LL, mod) % mod;
    int product = indian_multiplication(half, half, mod);

    if (b & 1)
        return indian_multiplication(product, a, mod);
    else
        return product;
}

vector < int > eratosthenes_sieve(int max_value)
{
    vector < bool > is_prime(max_value + 1, true);
    is_prime[0] = is_prime[1] = false;

    for (int i = 2; i * i <= max_value; ++i)
        if (is_prime[i])
            for (int j = i * i; j <= max_value; j += i)
                is_prime[j] = false;

    vector < int > primes;
    for (int i = 2; i <= max_value; ++i)
        if (is_prime[i])
            primes.push_back(i);

    return primes;
}

// Kiểm tra nguyên tố Miller - Rabin k lần.
bool check_prime_by_miller_rabin(int n, int k)
{
    // Xử lý trước các trường hợp đặc biệt.
    if (n < 2)
        return false;

    if (n != 2 && n % 2 == 0)
        return false;

    // Tìm d là số lẻ sao cho n - 1 = 2^r * d và r != 0.
    // Sau khi tìm ra d, r sẽ bằng số lần nhân 2 vào d để tiến tới n - 1.
    int d = n - 1;
    while (d % 2 == 0)
        d /= 2;

    // Bắt đầu kiểm tra .
    for (int i = 1; i <= k; ++i)
    {
        // Chọn a là một số ngẫu nhiên trong đoạn [2, n - 1].
        int a = rand() % (n - 1) + 1;
        int temp = d;
        
        // Tính a^d % n.
        int mod_val = modular_exponentiation(a, temp, n);

        // Trong khi d != n và a^(2^k * d) % n != 1 và a^(2^k * d) % n != (n - 1).
        // Bước này bản chất là thử kiểm tra mọi x(k) % n với k = 0...r.
        while (temp != n - 1 && mod_val != 1 && mod_val != n - 1)
        {
            mod_val = indian_multiplication(mod_val, mod_val, n);
            temp *= 2;
        }

        // Nếu không thể chạm được tới x(r) thì nghĩa là đã tồn tại giá trị k khiến cho
        // a^(2^k * d) % n != 1 hoặc a^(2^k * d) % n != -1
        if (mod_val != n - 1 && temp % 2 == 0)
            return false;
    }

    return true;
}
```

Giải thuật có độ phức tạp $O(k \times \log(n))$.

## 3. Đếm số ước của một số trong $O(n^{\frac{1}{3}})$

***Ý tưởng:*** Nói dài dòng như vậy, nhưng bây giờ chúng ta mới đi vào ý chính của bài viết. Trước tiên, ta sẽ viết $n$ dưới dạng tích của hai số $x, y$ sao cho:
- Phân tích nguyên tố của $x$ chỉ gồm các số nguyên tố không vượt quá $n^{\frac{1}{3}}$.
- Phân tích nguyên tố của $y$ chỉ gồm các số nguyên tố lớn hơn $n^{\frac{1}{3}}$.

Dễ dàng nhận thấy, $x$ và $y$ là hai số nguyên tố cùng nhau, do chúng không có chung bất kỳ thừa số nguyên tố nào cả. Việc tìm ra $x$ có thể thực hiện rất dễ, bằng cách duyệt qua tất cả các số nguyên dương trong đoạn $[2, n^{\frac{1}{3}}]$ và thử chia $n$ cho những số đó tới khi không thể chia hết được nữa (giống với cách phân tích thừa số nguyên tố trong $O(\sqrt{n})$). Ở bước này ta sẽ áp dụng thêm sàng lọc số nguyên tố để tìm nhanh ra các số nguyên tố không vượt quá $n^{\frac{1}{3}}$.

Đến đây, bạn đọc có thể thắc mắc rằng, tại sao lại cần viết $n$ ở dạng $x \times y?$ Cần biết rằng, hàm $F(n)$ đếm số lượng ước nguyên dương của $n$ là một ***Hàm nhân tính***, tức là $F(n) = F(x) \times F(y)$ nếu như $x$ và $y$ là hai số nguyên tố cùng nhau. Do đó, việc tính $F(n)$ sẽ được đưa về việc tính $F(x)$ và $F(y)$. Cụ thể ta tính $F(x)$ và $F(y)$ như sau:
- Đối với $F(x)$: Sử dụng sàng lọc số nguyên tố Eratosthenes để sinh ra tất cả các số nguyên tố không vượt quá $n^{\frac{1}{3}}$. Sau đó, duyệt qua từng số nguyên tố và áp dụng Legendre's Formula để tính số mũ của từng thừa số nguyên tố đó trong $x,$ từ đó tính được $F(x)$.
- Đối với $F(y)$: Giả sử $y$ có thể được phân tích thành tích của ba số nguyên tố khác nhau, tức là $y = p_1 \times p_2 \times p_3$. Vì $y$ chỉ bao gồm các thừa số nguyên tố lớn hơn $n^{\frac{1}{3}},$ nên $p_1 \times p_2 \times p_3 > n,$ điều này vô lí. Do đó điều giả sử không thể xảy ra và $y$ chỉ có thể chứa tối đa $2$ thừa số nguyên tố. Như vậy, ta nhận xét được rằng, sau khi chia $n$ cho $x,$ số $y$ chỉ có thể rơi vào một trong ba trường hợp:
    - *TH1:* $y$ là một số nguyên tố. Khi đó $F(y) = 2$.
    - *TH2:* $y$ là bình phương của một số nguyên tố. Khi đó $F(y) = 3$.
    - *TH3:* $y$ là tích của hai số nguyên tố khác nhau. Khi đó $F(y) = 4$. 

Việc kiểm tra $y$ thuộc vào trường hợp nào có thể được thực hiện bằng cách sử dụng giải thuật kiểm tra tính nguyên tố của Fermat hoặc Miller - Rabin như mình đã đề cập ở trên! Như vậy, chúng ta đã có thể cài đặt giải thuật đếm số ước của $n$ trong $O(n^{\frac{1}{3}})$!

***Cài đặt:*** Dưới đây là cài đặt C++ của giải thuật, đã được sử dụng để nộp thành công bài tập https://codeforces.com/gym/100753/attachments trên codeforces. Mình sẽ thực hiện bằng cả hai phương pháp kiểm tra số nguyên tố của Fermat và Miller - Rabin.

*Code bằng giải thuật Fermat:*

```cpp
#include <bits/stdc++.h>
#define int long long
#define task "Divisions_Fermat."

using namespace std;

// Sàng lọc số nguyên tố.
vector < int > eratosthenes_sieve(int max_value)
{
    vector < bool > is_prime(max_value + 1, true);
    is_prime[0] = is_prime[1] = false;

    for (int i = 2; i * i <= max_value; ++i)
        if (is_prime[i])
            for (int j = i * i; j <= max_value; j += i)
                is_prime[j] = false;

    vector < int > primes;
    for (int i = 2; i <= max_value; ++i)
        if (is_prime[i])
            primes.push_back(i);

    return primes;
}

void solution(int n)
{
    // Sàng lọc các số nguyên tố từ 1 tới 10^6 (bằng với n^(1/3) trong trường hợp lớn nhất).
    vector < int > primes = eratosthenes_sieve(1000000);

    // Tính F(x) với x bao gồm tất cả các thừa số nguyên tố nhỏ hơn hoặc bằng n^(1/3). Lưu luôn F(x) vào res.
    long long res = 1;
    for (int p: primes)
    {
        if (p * p * p > n)
            break;

        int cnt = 0;
        while (n % p == 0)
        {
            n /= p;
            ++cnt;
        }

        res *= (cnt + 1);
    }

    // Tính F(y) với y bao gồm tất cả các thừa số nguyên tố lớn hơn n^(1/3). Chắc chắn y chỉ có thể ở một trong ba
    // trường hợp: là số nguyên tố, là bình phương một số nguyên tố hoặc là tích của hai số nguyên tố phân biệt.
    if (fermat_checking(n))
        res *= 2LL;
    else
    {
        int squaroot = sqrt(n);
        if (squaroot * squaroot == n && fermat_checking(squaroot))
            res *= 3;
        else if (n != 1)
            res *= 4;
    }

    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;

    solution(n);

    return 0;
}
```
   
*Code bằng giải thuật Miller - Rabin:*

```cpp
#include <bits/stdc++.h>
#define int long long
#define task "Divisions_Miller_Rabin."

using namespace std;

bool sqrt_is_integer(int n)
{
    int squaroot = sqrt(n);

    return (squaroot * squaroot == n);
}

void solution(int n, int k)
{
    // Sàng lọc các số nguyên tố từ 1 tới 10^6 
    // (bằng với n^(1/3) trong trường hợp lớn nhất).
    vector < int > primes = eratosthenes_sieve(1000000);

    // Tính F(x) với x bao gồm tất cả các thừa số nguyên tố nhỏ hơn hoặc bằng n^(1/3). 
    // Lưu luôn F(x) vào res.
    long long res = 1;
    for (int p: primes)
    {
        if (p * p * p > n)
            break;

        int cnt = 0;
        while (n % p == 0)
        {
            n /= p;
            ++cnt;
        }

        res *= (cnt + 1);
    }

    // Tính F(y) với y bao gồm tất cả các thừa số nguyên tố lớn hơn n^(1/3). 
    // Chắc chắn y chỉ có thể ở một trong ba trường hợp: là số nguyên tố, là bình phương 
    // của một số nguyên tố hoặc là tích của hai số nguyên tố phân biệt.
    if (check_prime_by_miller_rabin(n, k))
        res *= 2LL;
    else if (sqrt_is_integer(n) && check_prime_by_miller_rabin((int)sqrt(n), k))
        res *= 3LL;
    else if (n != 1)
        res *= 4LL;

    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); 

    int n;
    cin >> n;

    solution(n, 10);

    return 0;
}

```

# III. Tài liệu tham khảo

- https://www.geeksforgeeks.org/primality-test-set-2-fermet-method/
- https://codeforces.com/blog/entry/22317
- https://www.sanfoundry.com/c-program-implement-rabin-miller-primality-test-check-number-prime/
- https://vi.wikipedia.org/wiki/Ki%E1%BB%83m_tra_Miller-Rabin#Gi%E1%BA%A3i_thu%E1%BA%ADt_ki%E1%BB%83m_tra_Miller-Rabin
- https://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/