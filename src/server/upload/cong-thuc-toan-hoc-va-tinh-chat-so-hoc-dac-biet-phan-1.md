# I. Lời mở đầu

Xét bài toán sau đây: Tính giá trị biểu thức:
$$S = 1^2 + 2^2 + \cdots + N^2, \text{với }1 \le N \le 10^9$$ 

Đối với những ai đã tiếp cận với ngôn ngữ lập trình, hẳn ban đầu sẽ thấy bài toán này rất đơn giản. Chỉ cần chạy một vòng lặp biến $i$ với $i$ từ $1$ tới $N,$ rồi gán `S = S + (i * i)` là xong! Nhưng sự thật có đơn giản như vậy? Ta để ý thấy giới hạn $N$ của bài toán lên đến $10^9,$ do đó nếu thực hiện vòng lặp từ $1$ tới $N$ sẽ khiến cho thời gian thực thi chương trình không đảm bảo.

Vậy giải pháp là gì? Lúc này những bạn học sinh nào có nền tảng toán chắc chắn sẽ biết ngay công thức tổng quát của $S$ là $\frac{N(N+1)(2N+1)}{6},$ từ đây có thể tính được $S$ chỉ trong một phép tính. Thậm chí nếu nâng cấp bài toán lên thành tìm số dư của $S$ sau khi chia cho một số nguyên tố nào đó, thì chúng ta vẫn giải quyết được rất nhanh nếu như đã nắm được kiến thức về ***Nghịch đảo modulo***.

Như vậy, điểm mấu chốt của bài toán không nằm ở cách tính, mà nằm ở việc ***làm sao để tìm ra công thức tổng quát?*** Trong lập trình thi đấu có vô số những bài toán oái ăm kiểu như vậy, từ vấn đề dễ dàng nhất là tìm công thức tổng quát của các dãy số, cho đến những thứ "khó nhằn" như phải áp dụng các tính chất số học, các định lý, tiên đề, bổ đề,...kỳ lạ mà có tìm mỏi mắt cũng không thấy trong các cuốn sách Toán bậc Trung học. Và thực tế trong các kỳ thi đã cho thấy, khi gặp những bài toán kiểu này, số lượng các bạn học sinh chứng minh được hoàn thiện một công thức là rất ít. Chủ yếu các bạn sẽ làm dựa vào cảm quan (nhìn ra công thức rồi làm cầu may rằng nó đúng), hoặc nếu tình cờ đã biết công thức từ trước thì...lấy được điểm.

Từ kinh nghiệm của bản thân và đúc kết qua nhiều kỳ thi HSG Tin học, tôi quyết định cho ra đời chuyên đề này nhằm hỗ trợ các bạn học sinh chuyên Tin trong quá trình giải những bài toán về công thức Toán hoặc Tính chất số học, giúp các bạn biết được nhiều hơn về những lý thuyết số học có thể không bao giờ được học trong Toán nhưng lại xuất hiện thường xuyên trong Tin học. Hy vọng sẽ giúp các bạn tiếp cận các bài toán về số học tốt hơn.

Trước khi tiếp cận chuyên đề này, các bạn nên hiểu sơ lược về những kiến thức trong Toán học như ***Phương pháp chứng minh Quy nạp***, ***Bất đẳng thức***, ***Tiên đề, Định lý và Bổ đề***. Và tất nhiên, cả toán tổ hợp cũng sẽ cần thiết cho việc chứng minh các công thức. Để bổ sung lại các kiến thức nói trên, các bạn có thể tìm đọc lại lý thuyết thuộc series ***Toán học tổ hợp.*** 

# II. Những kiến thức Toán cần nắm vững

Trước tiên, tôi sẽ nhắc lại một vài khái niệm toán học quan trọng mà các bạn nên nắm vững để thuận tiện hơn trong quá trình nghiên cứu chuyên đề. Tất nhiên đây không phải một bài giảng về Toán học, do đó người viết sẽ cố gắng nói ngắn gọn nhất có thể (và sẽ bỏ qua công đoạn chứng minh nếu không cần thiết).

## 1. Phương pháp Quy nạp toán học

Phương pháp chứng minh ***Quy nạp toán học*** là phương pháp để chứng minh một mệnh đề đúng với $\forall n \in N^{*}$ thông qua $3$ bước:
- Bước $1$: Kiểm tra mệnh đề đúng với $n=1$.
- Bước $2$: Giả sử mệnh đề đúng với $n=k \ge 1$ (Gọi là giả thiết quy nạp).
- Bước $3$: Chứng minh mệnh đề đúng với $n=k+1$.
    
Lưu ý, trong trường hợp cần chứng minh một mệnh đề đúng với mọi số tự nhiên $n \ge p$ ($p$ là số tự nhiên) thì thuật toán là:
- Bước $1$: Kiểm tra mệnh đề đúng với $n = p$.
- Bước $2$: Giả sử mệnh đề đúng với $n=k≥1$ (giả thiết quy nạp)
- Bước $3$: Cần chứng minh mệnh đề đúng với $n=k+1$.

Rất nhiều các dãy số có được công thức tổng quát là nhờ vào phương pháp Quy nạp toán học. Bạn đọc hết sức lưu ý phương pháp quan trọng này. 

## 2. Tiên đề, định lý và bổ đề

***Tiên đề (Định đề - Axioms):*** Là những phát biểu được coi là đúng, làm cơ sở cho các suy luận tiếp theo. Ví dụ như ***Hệ tiên đề Euclid*** hay ***Hệ tiên đề số học***,...

***Định lý (Theorems):*** Một định lý là một mệnh đề mà tính đúng đắn của nó có được thông qua việc chứng minh dựa trên các tiên đề và quy tắc suy luận. Ví dụ như ***Định lý Pythagoras*** hay ***Định lý Fermat***. Chúng ta được phép sử dụng luôn các định lý mà không cần chứng minh lại.

***Bổ đề (Lemmas):*** Có thể xem một bổ đề như một ***tiền định lý***, nó là một giả thuyết đã được chứng minh hoặc chắc chắn sẽ được chứng minh, sử dụng để làm nền tảng cho các kết quả cao hơn. Giữa Bổ đề và Định lý không có sự phân biệt rõ ràng, nhưng thường thì các Bổ đề sẽ được dùng để chứng minh các Định lý. Một vài bổ đề nổi tiếng có thể kể đến là ***Bổ đề Harmonic***, ***Bổ đề phép chia*** hay ***Bổ đề Burnside***,...

Ngoài ra, còn những khái niệm khác như ***Giả thuyết (Phỏng đoán)*** hay ***Quy tắc***,...nhưng đều rất đơn giản nên không cần đề cập tới.

# III. Các công thức và hàm Toán học đáng lưu ý

## 1. Phi hàm Euler

### 1.1. Định nghĩa

Phi hàm Euler của $N,$ viết tắt là $\phi(N)$ - là số lượng các số nguyên dương không vượt quá $N$ và nguyên tố cùng nhau với $N$. Công thức thường gặp của phi hàm Euler là: 

$$\phi(N) = N\times\prod_{p|N}\left(1-\frac{1}{p}\right)$$

<div align="center">
    
với $p$ là các ước nguyên tố của $N$.
</div>

#### Cài đặt

Dưới đây là chương trình tính phi hàm Euler với độ phức tạp $O(\sqrt{N})$. Bạn đọc hoàn toàn có thể cải tiến độ phức tạp thành $O\big(\log(N)\big)$ bằng việc phân tích thừa số nguyên tố sử dụng sàng Eratosthenes trong những trường hợp cụ thể.

```cpp
int phi_euler(int N)
{
    int res = N;
    for (int i = 2; i * i <= N; ++i)
        if (N % i == 0)
        {
            res -= res / i;

            while (N % i == 0)
                N /= i;
        }

    if (N > 1)
        res -= res / N;

    return res;
}
```

Trong một số trường hợp đặc biệt, $\phi(N)$ có thể tính nhanh như sau:
- Nếu $N$ là một số nguyên tố: $\phi(N) = N-1$.
- Nếu $N=p^k$ với p là một số nguyên tố: $\phi(N) = p^{k - 1}\times (p - 1)$.

### 1.2. Tính phi hàm Euler cho mọi số từ $1$ tới $N$

Như đã đề cập bên trên, công thức của phi hàm Euler là:
$$\phi(N) = N\times\prod_{p|N}\left(1-\frac{1}{p}\right)$$ 

Dựa vào công thức này, chúng ta hoàn toàn có thể xây dựng được một giải thuật tính phi hàm Euler cho mọi số từ $1$ tới $N$ bằng cách ứng dụng sàng Eratosthenes như sau:
- Bước $1$: Khởi tạo một mảng $\text{phi\_euler[i]}$ là giá trị $\phi(i)$ với mọi $i$ từ $1$ tới $N$. Ban đầu $\text{phi\_euler[i]} = i$ với mọi $i$ để thể hiện là giá trị $\phi(i)$ này chưa được tính. 
- Bước $2$: Xét $i$ từ $1$ tới $N,$ nếu $\text{phi\_euler[i]}\ne i$ tức là $\phi(i)$ đã được tính một lần rồi, ngược lại thì $i$ phải là một số nguyên tố, ta cập nhật lên các bội $j$ của $i$: $\text{phi\_euler[j]} = \text{phi\_euler[j]} - \left \lfloor \frac{\text{phi\_euler[j]}}{i} \right \rfloor \cdot$ 

Độ phức tạp của giải thuật là $O\big(N\log(N)\big)$.

#### Cài đặt

```cpp
vector < int > cnt_all_phi(int N)
{
    vector < int > phi_euler(N + 1);
    for (int i = 1; i <= N; ++i)
        phi_euler[i] = i;

    for (int i = 2; i <= N; ++i)
        if (phi_euler[i] == i)
            for (int j = i; j <= N; j += i)
                phi_euler[j] -= phi_euler[j] / i;

    return phi_euler;
}
```

## 2. Công thức Legendre (Legendre's formula)

### 2.1. Định nghĩa

***Công thức Legendre*** là một công thức được đặt theo tên của người tìm ra nó - Adrien-Marie Legendre. Với số nguyên dương $N$ và một số nguyên tố $p$ cho trước, công thức Legendre sử dụng để tìm ra số nguyên $k$ lớn nhất thỏa mãn $N!$ chia hết cho $p^k,$ kí hiệu là $\nu_p(N!)$:

$$\nu_p(N!) = \sum_{i=1}^{\infty} \left\lfloor{\frac{N}{p^i}} \right\rfloor$$  

<div align="center">
    
với $\left \lfloor{\frac{N}{p^i}} \right \rfloor$ là giá trị phần nguyên của $\frac{N}{p^i} \cdot$
</div>

Như vậy, $\left \lfloor{\frac{N}{p^i}} \right \rfloor$ sẽ bằng $0$ với $\forall i:p^i > N$.

> ***Chứng minh:*** Từ $1$ tới $N,$ cứ $p$ số liên tiếp chắc chắn sẽ có một số chia hết cho $p,$ do đó số lượng số chia hết cho $p$ từ $1$ tới $N$ là $\left \lfloor{\frac{N}{p}} \right \rfloor$. Tương tự ta có số lượng số chia hết cho $p^2, p^3,...$ lần lượt là $\left \lfloor{\frac{N}{p^2}} \right \rfloor, \left \lfloor{\frac{N}{p^3}} \right \rfloor,...$ 
> 
> Lưu ý rằng, mỗi số chia hết cho $p^2$ sẽ chỉ đóng góp thêm một thừa số $p$ vào kết quả, vì một thừa số đã được tính ở $\left\lfloor{\frac{n}{p}}\right\rfloor$ rồi, tương tự với $p^3, p^4,...$
> 
> Vậy $\nu_p(N!)=\left \lfloor{\frac{N}{p}} \right \rfloor + \left \lfloor{\frac{N}{p^2}} \right \rfloor + \left \lfloor{\frac{N}{p^3}} \right \rfloor+ \cdots$

***Cài đặt:***

```cpp
int legendre_formula(int N, int p)
{
    int res = 0;
    while (N > 0)
    {
        res += (N / p);
        N /= p; // Đếm số lượng số chia hết cho p, p^2, p^3,...
    }

    return res;
}
```

Giải thuật có độ phức tạp rơi vào khoảng $O\big(\log_p(N)\big)$.

### 2.2. Áp dụng với hợp số

Trong trường hợp bài toán thay đổi thành tìm $k$ lớn nhất sao cho $N!$ chia hết cho $M^k$ với $M$ là một hợp số, ta vẫn áp dụng được công thức Legendre để giải quyết bài toán. Giả sử $M$ phân tích ra thừa số nguyên tố có dạng:
$$M=p_1^{r_1} \times p_2^{r_2} \times \cdots p_n^{r_n}$$ 
thì kết quả bài toán sẽ là $\min \left \lfloor{\frac{\nu_{p_i}(N!)}{r_i}} \right \rfloor; \forall i: 1 \le i \le n$.

***Chứng minh:*** Giả sử $N!$ phân tích ra thừa số nguyên tố có dạng: 
$$N!=p_1^{r'_1} \times p_2^{r'_2} \times \cdots p_n^{r'_n}$$ 

Để $M^k$ là ước của $N!$ thì: 
$$k.r_1 \le r'_1; k.r_2 \le r'_2;...; k.r_n \le r'_n$$

Nói cách khác, $\nu_{p_i}(N!)=\left \lfloor{\frac{r'_i}{r_i}} \right \rfloor$. Từ đó suy ra $k_{max}=\min\left \lfloor{\frac{\nu_{p_i}(N!)}{r_i}} \right \rfloor; \forall i: 1 \le i \le n$.

#### Cài đặt

Chương trình dưới đây sử dụng lại code tính công thức Legendre với số nguyên tố ở trên.

```cpp
int legendre_for_composite(int N, int M)
{
    int res = 0;
    for (int i = 2; i * i <= M; ++i)
        if (M % i == 0)
        {
            int cnt_div = 0;
            while (M % i == 0)
            {
                ++cnt_div; 
                M /= i;
            }

            res = max(res, legrende_formula(N, i) / cnt_div);
        }

    return res;
}
```

### 2.3. Ứng dụng tìm số ước của $N!$

Một ứng dụng hay của công thức Legendre là tìm số ước của $N!$. Ta đã biết một số nguyên dương khi được phân tích dưới dạng $p_1^{r_1} \times p_2^{r_2} \times \cdots \times p_n^{r_n}$ thì tổng số ước nguyên dương của nó sẽ là $(r_1 + 1).(r_2+1)...(r_n+1)$. Như vậy mục tiêu là tìm số mũ lớn nhất của các số nguyên tố $p$ trong $N!,$ ta có thể áp dụng công thức Legendre như sau:
- Bước $1$: Sàng lọc số nguyên tố từ $1$ tới $N,$ lưu vào một mảng.
- Bước $2$: Với mỗi số nguyên tố $p$ không vượt quá $N,$ tìm $\nu_p(N!),$ đó chính là số mũ của số nguyên tố $p$ trong phân tích của $N!.$ Kết quả cuối cùng sẽ là $\prod_{p}\big(\nu_p(N!) + 1\big),$ với $p$ là các số nguyên tố từ $1$ tới $N$. 

#### Cài đặt

Giải thuật dưới đây có độ phức tạp tổng quát là $O\big(N.\log(N)\big)$:

```cpp
vector < int > eratosthenes_sieve(int limit) // Sàng lọc số nguyên tố.
{
    vector < bool > is_prime(limit + 1, true);
    is_prime[0] = is_prime[1] = true;

    for (int i = 2; i * i <= limit; ++i)
        if (is_prime[i])
            for (int j = i * i; j <= limit; j += i)
                is_prime[j] = false;

    vector < int > prime;
    for (int i = 2; i <= limit; ++i)
        if (is_prime[i])
            prime.push_back(i);

    return prime;
}

int factorial_cnt_divisors(int N) // Đếm số ước của N!
{
    vector < int > prime = eratosthenes_sieve(N);

    int div_cnt = 1;
    for (int p: prime)
        div_cnt *= (legendre_formula(N, p) + 1);

    return div_cnt;
}
```

## 3. Đếm số cặp nghiệm nguyên của phương trình $\frac{1}{x}+\frac{1}{y}=\frac{1}{N}$

Bài toán đặt ra là với số nguyên dương $N$ cho trước, đếm số lượng cặp nghiệm nguyên dương $(x, y)$ thỏa mãn phương trình: $\frac{1}{x}+\frac{1}{y}=\frac{1}{N} \cdot$ Biến đổi phương trình như sau:

$$\frac{1}{x}+\frac{1}{y}=\frac{1}{N}$$ 

$$\Leftrightarrow \frac{x+y}{xy}=\frac{1}{N}$$ 

$$\Leftrightarrow xy-N.(x+y)=0$$ 

Thêm $N^2$ vào cả hai vế, ta có:

$$\Leftrightarrow xy-N.(x+y)+N^2=N^2$$ 

$$\Leftrightarrow xy-Nx-Ny+N^2=N^2$$ 

$$\Leftrightarrow x.(y-N)-N.(y-N)=N^2$$ 

$$\Leftrightarrow (y-N).(x-N)=N^2$$ 

Từ đây ta thấy số cặp nghiệm nguyên dương của phương trình chính là số ước nguyên dương của $N^2,$ vì ứng với một ước $i$ của $N^2$ thì sẽ có một ước nữa là $\frac{N}{i},$ khi đó $(y-N)=i$ và $(x-N)=\frac{N}{i} \cdot$

#### Cài đặt

Dưới đây là chương trình đếm số cặp nghiệm nguyên dương của phương trình bằng phương pháp phân tích thừa số nguyên tố:

```cpp
int count_solutions(int N)
{
    // Tổng số cặp nghiệm của phương trình, cũng là số ước của N^2.
    int total_solutions = 1; 
    for (int i = 2; i * i <= N; ++i)
        if (N % i == 0)
        {
            int power = 0;
            while (N % i == 0)
            {
                ++power;
                N /= i;
            }

            total_solutions *= (2 * power + 1);
        }

    return total_solutions;
}
```

## 4. Dãy số Harmonic (Harmonic Series)

### 4.1. Định nghĩa

Dãy số Harmonic là dãy số có thể nhiều bạn đã khá quen thuộc. Trong Toán học, đây là một dãy tổng vô hạn các số phân biệt:
$$\sum_{n = 1}^\infty\frac{1}{n}=1+\frac{1}{2}+\frac{1}{3}+\frac{1}{4}+\cdots$$

Tổng của dãy số này có cận trên là $\log(n) + \gamma$ với $\gamma$ là hằng số Euler. Điều này đôi khi rất hữu dụng trong việc tính toán độ phức tạp thuật toán, ví dụ như trong giải thuật sàng lọc số nguyên tố Eratosthene. Đó là lí do giải thuật này có độ phức tạp là $\approx O(n\log(n)),$ trên thực tế còn nhanh hơn rất rất nhiều.

### 4.2. Bổ đề Harmonic

***Phát biểu:*** Xét dãy số: $\lfloor{\frac{n}{1}} \rfloor,  \lfloor{\frac{n}{2}} \rfloor, \lfloor{\frac{n}{3}}\rfloor,..., \left \lfloor{\frac{n}{n}} \right \rfloor$. Bổ đề Harmonic nói rằng:
- Dãy số trên là một dãy không tăng và có tối đa $2\sqrt{n}$ giá trị phân biệt.
- Dãy số trên có tổng tiến tới $n.\log(n)$.

***Chứng minh:***
- Đối với ý đầu tiên của bổ đề, ta có: Giả sử $d(i) =  \lfloor{\frac{n}{i}} \rfloor$. Xét đoạn giá trị $i$ từ 1 tới $\sqrt{n},$ có tối đa $\sqrt{n}$ giá trị khác nhau của $d(i)$ trong đoạn này (vì có $\sqrt{n}$ giá trị $i$ khác nhau). 
Phần còn lại gồm các giá trị $i$ lớn hơn $\sqrt{n}$ thì $d(i) < \sqrt{n}$ và $d(i)$ là một số nguyên dương, vì vậy có tối đa $\sqrt{n}$ giá trị khác nhau của $d(i)$ trong đoạn này. 
Vậy số lượng giá trị khác nhau nhiều nhất của dãy số là $2.\sqrt{n}$.
- Đối với ý thứ hai, ta chứng minh đơn giản vì dãy số Harmonic có tổng tiến tới $\log(n) + \gamma,$ nên dãy số ban đầu sẽ có tổng xấp xỉ bằng $n.\log(n) + n.\gamma \approx n.\log(n)$. 

Bổ đề Harmonic chỉ được sử dụng trong một số bài toán rất đặc biệt, chẳng hạn như tính tổng các ước nguyên dương của mọi số từ $1$ tới $N$. Nhìn chung, các định lý, bổ đề trong Tin học sẽ ít khi gặp trong bài thi, chỉ trong một vài bài toán rất cụ thể thì mới phải dùng đến chúng mà thôi. 

## 5. Tìm biểu diễn thập phân của một số hữu tỉ

Chúng ta đều biết rằng, một số hữu tỉ là số có thể biểu diễn được dưới dạng phân số $\frac{a}{b},$ với $a$ và $b$ là các số nguyên với $b \ne 0$. Khi biểu diễn số hữu tỉ dưới hệ cơ số $10,$ ta có hai dạng là số thập phân hữu hạn và số thập phân vô hạn tuần hoàn. Dưới đây ta có hai tính chất quan trọng của số hữu tỉ:
- Một phân số tối giản với mẫu dương và mẫu không có ước nguyên tố nào ngoài $2$ và $5$ thì viết được dưới dạng số thập phân hữu hạn. Ví dụ như $\frac{4}{25}$ có mẫu $25=5^2$ nên $\frac{4}{25}=0.16$. Một số thập phân hữu hạn cũng có thể coi là một số thập phân vô hạn tuần hoàn với chu kỳ là $0$.
- Một phân số tối giản với mẫu dương và mẫu có ít nhất một ước nguyên tố ngoài $2$ và $5$ thì viết được dưới dạng số thập phân vô hạn tuần hoàn.

Bài toán đặt ra ở đây là làm sao tìm được chu kỳ của số thập phân vô hạn tuần hoàn khi biết dạng phân số của nó là $\frac{a}{b}$, nếu như ta coi số thập phân hữu hạn cũng là số thập phân vô hạn tuần hoàn với chu kỳ là $0$. Dưới đây tôi sẽ giới thiệu một phương pháp của trung học cơ sở:
- Bước $1$: Đặt phép $a$ chia $b,$ ghi nhận thương nguyên ở lần chia đầu tiên. Thương này là phần nguyên của số thập phân. Kế đến tiếp tục đặt phép chia với số dư của phép chia đầu tiên, lưu các thương và số dư ở mỗi lần chia tiếp theo vào hai mảng phân biệt.
- Bước $2$: Lặp lại liên tục quá trình chia $a$ cho $b$ giống như phép chia số thập phân: Lấy số dư nhân thêm $10$ rồi chia cho $b,$ tiếp tục lưu thương và số dư của phép chia mới và lại lặp lại quá trình,…
- Bước $3$: Lặp lại bước $2$ cho tới khi thấy số dư bị lặp lại. Gọi vị trí xuất hiện đầu tiên của số dư này trên dãy số dư là $x,$ thì chu kỳ của số thập phân sẽ bắt đầu từ vị trí $x$ trên dãy thương cho tới hết dãy thương. Còn các chữ số nằm trước vị trí $x$ trên dãy thương sẽ là các chữ số thập phân tự do.

***Ví dụ:*** Giả sử phân số là $\frac{1}{14}$. Thương nguyên ban đầu là $0,$ đây chính là phần nguyên của biểu diễn thập phân của phân số này. Gọi thương và số dư của các phép chia tiếp theo lần lượt là $k$ và $r,$ quy trình để tìm ra biểu diễn thập phân của nó là:

- Lần chia thứ nhất: $k = 0, r = 1$.
- Lần chia thứ hai: $k = 7, r = 2$.
- Lần chia thứ ba: $k = 1, r = 6$.
- Lần chia thứ tư: $k = 4, r = 4$.
- Lần chia thứ năm: $k = 2, r = 12$.
- Lần chia thứ sáu: $k = 8, r = 8$.
- Lần chia thứ bảy: $k = 5, r = 10$.
- Lần chia thứ tám: $k = 7, r = 2$ (số dư bị lặp lại ở vị trí $2,$ không lưu thương này mà tính luôn chu kỳ). Số thập phân lúc này sẽ là: $0.0(714285)$.

#### Cài đặt

```cpp
void decimal_presentation(int a, int b)
{
    cout << a / b << '.'; // Đưa ra phần nguyên trước.

    int pos = 0;
    mark[a % b] = pos++; // Mảng mark lưu vị trí xuất hiện của các số dư.
    a %= b; // Đặt a = a % b để tiếp tục phép chia.

    int loop_start = 0;
    vector < int > quotient; // Vector lưu các thương.
    while (true) // Tiếp tục quá trình chia để tìm các số sau dấu chấm.
    {
        a *= 10;
        long long r = a % b;
        quotient.push_back(a / b);
        if (mark[r]) // Số dư bị lặp lại.
        {
            loop_start = mark[r]; // Vị trí bắt đầu chu kỳ.
            break;
        }
        else // Nếu chưa lặp lại thì tiếp tục chia và lưu số dư.
        {
            mark[r] = pos++;
            a = r; 
        }
    }

    // In ra biểu diễn thập phân của số hữu tỉ a/b.
    for (int i = 0; i < loop_start; ++i)
        cout << quotient[i];
    cout << '(';
    for (int i = loop_start; i < quotient.size(); ++i)
        cout << quotient[i];
    cout << ')';
}
```

# IV. Một số bài tập áp dụng

## 1. Chữ số 0

### Đề bài

Hôm nay, sau khi học xong tiết học về giai thừa của một số, Hanna rất thích thú. Vốn là một cô bé yêu thích các con số $0,$ Hanna quyết tâm sẽ tìm hiểu về những chữ số $0$ giai thừa để khoe với các bạn. Vấn đề cụ thể mà cô bé đang nghiên cứu là với một số nguyên không âm $n$ bất kì thì trong $n!$ sẽ có bao nhiêu chữ số $0$ liên tiếp tính từ phải qua trái, bắt đầu từ hàng đơn vị. Lấy ví dụ:

- Với $n = 8$ thì $8! = 1.2.3.4.5.6.7.8 = 40320,$ số này có $1$ chữ số $0$ liên tiếp tính từ phải qua trái, bắt đầu từ hàng đơn vị.
- Với $n = 10$ thì $10! = 1.2.3.4.5.6.7.8.9.10 = 3628800,$ số này có $2$ chữ số $0$ liên tiếp tính từ phải qua trái, bắt đầu từ hàng đơn vị.

***Yêu cầu:*** Với một số $n$ cho trước, hãy giúp Hanna tính số lượng chữ số $0$ liên tiếp tính từ phải qua trái của $n!,$ bắt đầu từ hàng đơn vị?

***Input:***

- Một dòng duy nhất chứa số nguyên $n$.

***Ràng buộc:***

- $1 \le n \le 10^6$.

***Subtasks:***

- Subtask $1$ ($30\%$ số điểm): $0 \le n \le 20$.
- Subtask $2$ ($70\%$ số điểm): Không có ràng buộc gì thêm.

***Output:***

- In ra số lượng chữ số $0$ liên tiếp tính từ phải qua trái của $n!$.

***Sample Input:***

```
10
```

***Sample Output:***

```
2
```

### Ý tưởng


Tính trực tiếp $n!,$ lưu vào chuỗi kí tự rồi đếm số chữ số $0$ tận cùng.

***Độ phức tạp:*** $O(n)$.

### Subtask 2

Ta không thể tính cụ thể $n!$ ở subtask này, do sẽ bị tràn số (trừ khi bạn code Python, tuy nhiên code Python thì thực tế cũng là gọi ra thuật toán xử lý số lớn, nên thời gian chạy sẽ khá lâu).

Nhận xét rằng, thực tế số lượng chữ số $0$ ở tận cùng của $n!$ chính là số lượng cặp thừa số $2 \times 5$ trong phân tích nguyên tố của $n!$. Mà số lượng thừa số $2$ chắc chắn sẽ nhiều hơn số lượng thừa số $5,$ do đó bài toán quy về đếm số lượng thừa số $5$ trong $n!,$ tức là xác định giá trị $k$ lớn nhất sao cho $n!$ chia hết cho $5^k$.

Ta có thể áp dụng công thức Legendre để tính kết quả này:

$$res = \sum_{i = 1}^{\infty} \left\lfloor{\frac{N}{5^i}} \right\rfloor$$

***Độ phức tạp:*** $O(\log_5 n)$.

### Code mẫu

```cpp
#pragma GCC optimize("O3","unroll-loops")
#pragma GCC target("avx2")

#include <bits/stdc++.h>

using namespace std;

void solution(int n)
{
    int res = 0;
    while (n != 0)
    {
        res += n / 5;
        n /= 5;
    }
    
    cout << res;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    solution(n);

    return 0;
}
```

## 2. Tổng các ước

### Đề bài

Đối với một số nguyên dương $M,$ định nghĩa hàm $F(M)$ là tổng các ước số nguyên dương của $M$. Lấy ví dụ, $F(5)=1+5=7,F(10)=1+2+5+10=18,…$

Việc tính $F(M)$ đối với một học sinh siêu giỏi Toán như Huyền Trang là việc quá đơn giản. Chính vì thế, thầy giáo quyết định nâng cấp bài toán lên hòng làm khó Trang. Bài toán thầy giáo đặt ra là: Cho trước số nguyên dương $N,$ hãy tính tổng:
$$\sum_{i=1}^NF(i)$$

***Yêu cầu:*** Hãy giúp Huyền Trang trả lời câu hỏi của thầy giáo? Vì kết quả có thể rất lớn, hãy đưa ra phần dư của kết quả sau khi chia cho $10^9+7$.

***Input:***

- Dòng đầu tiên chứa số nguyên dương $T$ – số lượng test cases.
- $T$ dòng tiếp theo, mỗi dòng chứa một số nguyên dương $N$.

***Ràng buộc:***

- $1≤T≤100$. 
- $1≤N≤10^9$.

***Subtasks:***

- Subtask $1$ ($30\%$ số điểm): $1≤N≤10^3$.
- Subtask $2$ ($30\%$ số điểm): $10^3<N≤10^6$.
- Subtask $3$ ($40\%$ số điểm): $10^6<N≤10^9$.

***Output:***

- Trên $T$ dòng, mỗi dòng đưa ra một số nguyên là kết quả của mỗi test case.

***Sample Input:***

```
3
5
10
1000000
```

***Sample Output:***

```
21
87
468112683
```

### Ý tưởng

### Subtask 1

Duyệt qua từng số $i$ từ $1$ tới $N$ và tính tổng ước của chúng theo cách thông thường, ta có giải thuật với độ phức tạp $O(N.\sqrt{N})$.

### Subtask 2

#### Cách 1 

Nhận xét, với mỗi số $i,$ sẽ có tổng cộng $\left \lfloor{\frac{N}{i}} \right \rfloor$ số từ $1$ tới $N$ nhận $i$ làm ước. Do đó, $i$ sẽ đóng góp $\left \lfloor{\frac{N}{i}} \right \rfloor$ lần vào các hàm $F(j)$ mà $i \le j \le N$ và $j$ là bội của $i$. Vậy kết quả bài toán trở thành:
$$\sum_{i = 1}^N \left(i \times \left \lfloor{\frac{N}{i}} \right \rfloor\right)$$

Tới đây ta thu được giải thuật có độ phức tạp $O\big(N.\log(N)\big)$.

#### Cách 2

Duyệt qua tất cả các số từ $1$ tới $N,$ rồi áp dụng công thức tính tổng các ước nguyên dương của một số dựa trên phân tích thừa số nguyên tố của nó. Việc phân tích thừa số nguyên tố có thể giảm độ phức tạp về $O\big(\log(n)\big)$ bằng cách áp dụng thêm Sàng Eratosthene. Giải thuật ở cách này cũng có độ phức tạp $O(N.\log(N))$.

### Subtask 3

Ta sử dụng một lý thuyết toán học là Bổ đề Harmonic (nhắc tới ở mục $4$ của phần **II**): Xét dãy số $\left \lfloor{\frac{N}{1}} \right \rfloor, \left \lfloor{\frac{N}{2}} \right \rfloor,..., \left \lfloor{\frac{N}{N}} \right \rfloor$ với $\left \lfloor{\frac{N}{i}} \right \rfloor$ là kết quả làm tròn xuống của phân thức $\frac{N}{i},$ thì dãy số này là một dãy không tăng và có tối đa $2 \times \sqrt{N}$ giá trị khác nhau (xem lại chuyên đề Công thức toán học và Tính chất số học).

Vì dãy số là dãy không tăng, nên những giá trị bằng nhau chắc chắn sẽ nằm trên một đoạn liên tiếp cạnh nhau từ $l$ tới $r$. Ta sẽ tìm lần lượt những đoạn này và tính tổng của mọi giá trị $\left \lfloor{\frac{N}{i}} \right \rfloor$ với $i$ thuộc $[l, r]$:
- Bước $1$: Đầu tiên đặt $l = 1$. Giả sử đoạn từ $l$ tới $r$ mang giá trị $K \Rightarrow K = \left \lfloor{\frac{N}{l}} \right \rfloor$ và $r = \left \lfloor{\frac{N}{K}} \right \rfloor$.
- Bước $2$: Mọi $i$ thuộc đoạn $[l, r]$ sẽ có tổng các giá trị $\left \lfloor{\frac{N}{i}} \right \rfloor$ bằng $K,$ ta tính tổng tất cả chúng bằng công thức:
$$[l + (l + 1) + ... + r] \times K = [\text{sum}(1, r) - \text{sum}(1, l - 1)] \times K$$
- Bước $3$: Tăng $l$ lên bằng $r + 1,$ tiếp tục lặp lại từ bước $1$ tới khi $l$ vượt quá $N$ thì kết thúc thuật toán. 

Lưu ý trong quá trình tính toán cần vận dụng nghịch đảo modulo và phép nhân modulo ở những chỗ cần thiết để tránh tràn số. Hết sức chú ý công thức ở bước $2$ sau khi $\text{mod}$ sẽ có thể ra số âm, do đó cần làm dương giá trị $\text{mod}$. Giải thuật này có độ phức tạp chỉ là $O(\sqrt{N}),$ do việc tịnh tiến $[l, r]$ sẽ diễn ra không quá $2 \times \sqrt{N}$ lần.

### Code mẫu

```cpp
#pragma GCC optimize("O3","unroll-loops")
#pragma GCC target("avx2")

#include <bits/stdc++.h>
#define int long long

using namespace std;

const int mod = 1e9 + 7;

// Tính (A^B) % M, phục vụ cho việc tính nghịch đảo modulo.
int modular_exponentiation(int A, int B, int M) 
{
    if (B == 0)
        return 1;

    int half = modular_exponentiation(A, B / 2, M) % M;

    if (B % 2 == 0)
        return (half * half) % M;
    else
        return ((half * half) % M * (A % M)) % M;
}

// Nghịch đảo modulo M của N.
int inverse_modulo(int N, int M) 
{
    return modular_exponentiation(N, M - 2, M);
}

// Tính tổng từ 1 tới N bằng công thức: N * (N + 1) / 2.
int modular_sum(int N, int M) 
{
    int x = ((N % M) * ((N + 1) % M)) % M;
    int y = inverse_modulo(2, M);

    return (x * y) % M;
}

void solution(int N)
{
    int l = 1, res = 0;
    while (l <= N)
    {
        int const_value = N / l, r = N / const_value;
        const_value %= mod;

        int temp = (modular_sum(r, mod) - modular_sum(l - 1, mod) + mod) % mod;
        res = ((res % mod) + (temp * const_value) % mod) % mod;

        l = r + 1;
    }

    cout << res << '\n';
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    int ntest;
    cin >> ntest;

    while (ntest--)
    {
        int N;
        cin >> N;

        solution(N);
    }

    return 0;
}
```

Để tiếp tục theo dõi phần $2$ của series này, các bạn hãy nhấn vào <a href="https://viblo.asia/p/cong-thuc-toan-hoc-va-tinh-chat-so-hoc-dac-biet-phan-2-gDVK2oyrZLj">đây</a>.