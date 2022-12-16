# I. Mở đầu về Toán học tổ hợp

Toán tổ hợp là một chuyên đề lớn và có tính ứng dụng cao trong lập trình thi đấu, đặc biệt trong các bài toán đếm. Chuyên đề Toán học tổ hợp trong Tin học sẽ đề cập tới những vấn đề cơ bản và quan trọng nhất của Toán tổ hợp gắn liền với những bài toán của nó trong lập trình thi đấu. Nắm vững Toán học tổ hợp sẽ giúp cho các bạn có năng lực giải được nhiều bài toán khó về chủ đề số học trong lập trình thi đấu. 
Trước khi đọc chuyên đề này, bạn đọc cần nắm vững những kiến thức lập trình căn bản, các kiến thức toán học về ***Số học đồng dư, Lũy thừa modulo*** và ***Phép nhân Ấn Độ***, nhằm phục vụ cho quá trình lập trình giải các bài toán áp dụng các công thức tổ hợp phức tạp.

# II. Lý thuyết tập hợp

## 1. Định nghĩa tập hợp

***Tập hợp (Sets)*** là khái niệm cơ bản nhất trong Toán học. Định nghĩa tập hợp là một tập gồm các phần tử phân biệt với nhau. Lấy ví dụ, $3, 5, 7$ là các phần tử phân biệt khi chúng ta xét từng số một, nhưng nếu nhóm ba số đó lại thì ta được một tập hợp gồm ba phần tử là $\{3, 5, 7\}$.

## 2. Tập hợp con (Subset)

Nếu như mọi phần tử của tập hợp $A$ cũng là các phần tử của tập hợp $B,$ thì $A$ gọi là ***tập hợp con*** của $B$. Kí hiệu:

<div align="center">
    
$A \subset B$
</div>

hoặc có thể viết là:

<div align="center">
    
$B \supset A$
</div>

nghĩa là $B$ là tập cha của $A,$ hay $B$ chứa $A$.

Quan hệ cha-con giữa các tập hợp còn được gọi là ***quan hệ chứa nhau (containment)*** hay ***quan hệ bao hàm (inclusion).***

Nếu một tập hợp $A$ là tập con của tập hợp $B$ nhưng không bằng $B,$ thì $A$ gọi là ***tập con không tầm thường (proper subset)*** hay ***tập con chân chính, tập con thực sự*** của B, kí hiệu:
$$A \subsetneq B$$ 

và $B$ được gọi là ***tập cha không tầm thường (proper superset)*** của $A,$ kí hiệu:
$$B \supsetneq A$$

Một tập hợp $A$ khác rỗng luôn luôn có ít nhất hai tập hợp con là ***tập hợp rỗng*** (kí hiệu $\emptyset$) và chính nó. Hai tập hợp này gọi là các ***tập con tâm thường*** của $A$.

Hai tập hợp $A$ và $B$ gọi là bằng nhau nếu như $A$ là tập con của $B$ và $B$ cũng là tập con của $A,$ kí hiệu:
$$A = B$$

***Ví dụ:*** 
- $\{3, 5\} \subset \{3, 5, 9, 11\}$.
- $\{1, 2, 3, 4\} \supset \{1, 2\}$.
- $\{100, 1000\} = \{100, 1000\}$.

## 3. Phân hoạch tập hợp

Giả sử có một họ các tập con $P$ gồm $N$ tập con $\{p_1, p_2,..., p_n\}$ của tập hợp $X$. Khi đó, $P$ được gọi là một ***phân hoạch*** của tập hợp $X$ khi và chỉ khi:
- Họ $P$ không chứa tập hợp rỗng: $\emptyset \notin P$.
- Hợp của các tập con trong $P$ bằng $X$: $(p_1 \cup p_2 \cup \cdots \cup p_n) = X$.
- Giao của bất kỳ hai tập hợp nào trong $P$ đều là tập rỗng: $p_i \cap p_j = \emptyset; \forall p_i \ne p_j$.

Ví dụ, tập hợp $\{1, 2, 3\}$ có $5$ phân hoạch là:
- $\{\{1\}, \{2\}, \{3\}\}$.
- $\{\{1, 2\}, \{3\}\}$.
- $\{\{1, 3\}, \{2\}\}$.
- $\{\{1\}, \{2, 3\}\}$.
- $\{\{1, 2, 3\}\}$.

## 4. Các phép toán trên tập hợp

Xét hai tập hợp $A=\{1, 2, 3, 4\}$ và $B=\{2, 3, 5, 7\},$ ta có các phép toán sau trên hai tập hợp $A$ và $B$:

### a) Phép lấy phần bù

Phần bù (complement) của $A$ trong $X,$ kí hiệu $C_X^A,$ hoặc $\overline A$ là tập hợp các phần tử của $X$ mà không thuộc $A$:
$$\overline A = \{x \in X:x \notin A\}$$

***Ví dụ:*** Phần bù của $A$ trong tập số tự nhiên $N$ là:
$$\overline A = \{x \in N \mid x \ne \{1, 2, 3, 4\}\}$$

### b) Phép hợp

***Hợp (Union)*** của $A$ và $B,$ kí hiệu $A \cup B,$ là tập hợp các phần tử thuộc vào $A$ hoặc thuộc vào $B$:
$$A \cup B = \{x: x \in A \text{ hoặc } x \in B\}$$

***Ví dụ:*** $A \cup B = \{1, 2, 3, 4, 5, 7\}$.

### c) Phép giao

***Giao (Intersection)*** của $A$ và $B$, kí hiệu $A \cap B,$ là tập các phần tử đồng thời thuộc cả $A$ và $B$:
$$A \cap B=\{x: x \in A \text{ và } x \in B\}$$

***Ví dụ:*** $A \cap B=\{2, 3\}$.

### d) Phép lấy hiệu

***Phép lấy hiệu (difference)*** giữa $A$ và $B,$ kí hiệu $A \backslash B,$ là tập hợp các phần tử thuộc $A$ nhưng không thuộc $B$:
$$A \backslash B=\{x: x \in A \text{ và } x \notin B\}$$

***Ví dụ:*** $A \backslash B = \{1, 4\}$.

## 5. Tính chất của các phép toán trên tập hợp

***Kết hợp:***

<div align="center">

$(A \cup B) \cup C = A \cup (B \cup C)$
   
$(A \cap B) \cap C = A \cap (B \cap C)$
</div>

***Giao hoán:***

<div align="center">
    
$A \cup B = B \cup A$ 

$A \cap B = B \cap A$
</div>

***Phân phối:***

<div align="center">
    
$A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ 

$A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$
</div>

***Đối ngẫu (Luật De Morgan):***

<div align="center">
    
$\overline {A \cup B} = \overline A \cap \overline B$

$\overline {A \cap B} = \overline A \cup \overline B$
</div>

### 1.5. Tích Descartes của các tập hợp

Tích Descartes ghép hai tập hợp:
$$A \times B = \{(a, b) \mid a \in A, b \in B\}$$

Tích Descartes mở rộng ghép nhiều tập hợp:
$$A_1 \times A_2 \times ... \times A_k = \{(a_1, a_2, ..., a_k) \mid a_i \in A_i, 1 \le i \le k \}$$

# II. Nguyên lí cộng và nguyên lí nhân

***Nguyên lí cộng*** và ***nguyên lí nhân*** là những nguyên lí cơ bản của tổ hợp, được sử dụng rộng rãi trong các bài toán đếm, còn được gọi là ***quy tắc cộng (sum rule)*** và ***quy tắc nhân (product rule).***

## 1. Nguyên lí cộng

***Định nghĩa:*** Nếu như có một công việc mà ta có thể thực hiện theo $N$ phương án ***khác nhau,*** trong đó:
- Phương án thứ nhất có $m_1$ cách thực hiện.
- Phương án thứ hai có $m_2$ cách thực hiện.
$...$
- Phương án thứ $N$ có $m_n$ cách thực hiện.

thì tổng số cách hoàn thành công việc đã cho là: $m_1 + m_2 + m_3 + \cdots + m_n$.

Đối với lý thuyết tập hợp, nguyên lí cộng được phát biểu như sau: Nếu $A$ và $B$ là hai tập hợp rời nhau thì: 
$$|A \cup B| = |A| + |B|$$ 

với $|A|, |B|$ là số lượng phần tử của hai tập hợp $A$ và $B$.

Nguyên lí cộng mở rộng cho nhiều tập hợp con rời nhau: Nếu $\{A_1, A_2,..., A_k\}$ là một ***phân hoạch*** của tập hợp $X$ thì:
$$|X| = |A_1| + |A_2| + ... + |A_k|$$

***Ví dụ:*** Đếm số lượng số có $4$ chữ số có đúng $3$ chữ số $9?$

***Lời giải:*** Gọi số đó là $\overline {abcd},$ các trường hợp có thể xảy ra là: $\{\overline {a999}, \overline {9b99}, \overline{99c9}, \overline{999d} \}$. Có $9$ khả năng chọn số $a,$ $10$ khả năng chọn số $b,$ $10$ khả năng chọn số $c$ và $10$ khả năng chọn số $d$. Vậy kết quả là tổng số cách chọn của các trường hợp: $9 + 10 + 10 + 10 = 39$.

## 2. Nguyên lí nhân

***Định nghĩa:*** Nếu một công việc phải hoàn thành thông qua $N$ giai đoạn ***liên tiếp***, trong đó:
- Giai đoạn $1$ có $m_1$ cách thực hiện.
- Giai đoạn $2$ có $m_2$ cách thực hiện.
$...$
- Giai đoạn $N$ có $m_n$ cách thực hiện.
    
thì tổng số cách để hoàn thành công việc là: $m_1 \times m_2 \times \cdots \times m_n$. 

Đối với lý thuyết tập hợp, nguyên lí nhân được phát biểu như sau: Xét một bộ có thứ tự gồm $k$ thành phần $\{a_1, a_2,..., a_k\},$ nếu mỗi bộ $a_i$ có $m_i$ phương án lựa chọn $1 \le i \le k$ thì tổng số bộ được tạo ra là tích số của các khả năng này: $m_1 \times m_2 \times \cdots \times m_n$.

***Hệ quả:*** $|A_1 \times A_2 \times \cdots \times A_k| = |A_1| \times |A_2| \times \cdots \times |A_k|$.

***Ví dụ:*** Từ Hà Nội đến Huế có $7$ tuyến xe khác nhau, từ Huế tới Thành phố Hồ Chí Minh có $5$ tuyến xe khác nhau. Hỏi có bao nhiêu cách để đi từ Hà Nội tới Thành phố Hồ Chí Minh?

***Lời giải:*** Ta chia công việc "Đi từ Hà Nội tới Thành phố Hồ Chí Minh" làm $2$ giai đoạn bắt buộc: Giai đoạn $1$ là đi từ Hà Nội tới Huế, giai đoạn này có $7$ cách làm ($7$ tuyến xe khác nhau); giai đoạn $2$ là đi từ Huế tới Thành phố Hồ Chí Minh, giai đoạn này có $5$ cách làm. Áp dụng nguyên lí nhân, ta có tổng số cách đi từ Hà Nội tới Thành phố Hồ Chí Minh là $7 \times 5 = 35$ cách.

## 3. Phân biệt giữa nguyên lí nhân và nguyên lí cộng

Từ các ví dụ trên, ta nhận thấy sự khác biệt trong việc sử dụng nguyên lí nhân và nguyên lí cộng như sau:
- Nếu như khi thực hiện công việc, tồn tại $N$ phương án khác nhau nhưng nếu bỏ đi một phương án thì chúng ta vẫn hoàn thành được công việc đó bằng các phương án còn lại, khi đó ta áp dụng nguyên lí cộng. Chẳng hạn với bài toán ví dụ ở phần nguyên lí cộng, mặc dù có $4$ cách để hoàn thành việc tạo ra một số có $4$ chữ số có chứa $3$ chữ số $9,$ nhưng chúng ta có thể bỏ bớt đi $1$ cách thì vẫn tạo được số như ý muốn.
- Nếu như khi thực hiện công việc, cần phải thực hiện qua $N$ giai đoạn liên tiếp nhau, nghĩa là giai đoạn thứ $k$ chỉ được phép thực hiện sau khi đã thực hiện xong các giai đoạn $1, 2, 3,..., (k - 1),$ và chỉ cần bỏ đi một giai đoạn thì công việc sẽ không thể hoàn thành, khi đó ta áp dụng nguyên lí nhân. Chẳng hạn với bài toán ví dụ ở phần nguyên lí nhân, nếu ta bỏ đi công đoạn đi từ Hà Nội tới Huế hoặc đi từ Huế tới Thành phố Hồ Chí Minh thì không thể nào đi được từ Hà Nội tới Huế.

# III. Chỉnh hợp - Tổ hợp - Hoán vị

Chỉnh hợp, tổ hợp và hoán vị là những quy tắc đếm rất căn bản trong Toán học tổ hợp và thường xuyên được sử dụng trong các bài toán đếm. Dưới đây sẽ giới thiệu khái niệm, công thức và cài đặt C++ để tính toán các công thức khi cần thiết.

## 1. Chỉnh hợp lặp

Xét tập hữu hạn gồm $n$ phần tử $A =\{a_1, a_2,..., a_n\}$. Một ***chỉnh hợp lặp*** chập $k$ của $n$ phần tử là một bộ có thứ tự gồm $k$ phần tử của $A,$ các phần tử có thể lặp lại. Theo nguyên lí nhân, số các chỉnh hợp lặp chập $k$ của $n$ sẽ là $n^k$:
$$\overline{P_n^k} = n^k$$

***Cài đặt:*** Tính số lượng chỉnh hợp lặp chập $k$ của $n,$ đưa ra kết quả sau khi chia cho $10^9+7$ và lấy số dư: 

```cpp
long long M = 1e9 + 7;

long long repetition_permutation(long long N, long long K)
{
    if (K == 0)
        return 1;

    long long half = repetition_permutation(N, K / 2) % M;

    if (K % 2 == 0)
        return (half * half) % M;
    else 
        return ((half * half) % M * (N % M)) % M;
}
```

## 2. Chỉnh hợp không lặp

Một ***chỉnh hợp không lặp*** chập $k$ của $n$ phần tử $(k \le n)$ là một bộ có thứ tự gồm $k$ thành phần lấy từ $n$ phần tử của tập đã cho, các thành phần không được lặp lại. Để xây dựng một chỉnh hợp không lặp, ta xây dựng dần từng thành phần: Bắt đầu từ thành phần thứ nhất có n khả năng lựa chọn; từ thành phần thứ hai tới thành phần thứ $k,$ mỗi thành phần có số cách chọn giảm đi $1$. Theo nguyên lí nhân, tổng số cách chọn là $n\times (n - 1) \times \cdots (n - k + 1)$. Do đó số chỉnh hợp không lặp chập $k$ của $n$ là:
$$P_n^k = n\times (n - 1)\times \cdots \times (n - k + 1) = \frac{n!}{(n - k)!}$$

***Cài đặt:*** Tính số lượng chỉnh hợp không lặp chập $k$ của $n,$ đưa ra kết quả sau khi chia cho $10^9+7$ và lấy số dư:

```cpp
long long M = 1e9 + 7;

long long distinct_permutation(long long N, long long K)
{
    long long res = 1;
    for (long long i = N - K + 1; i <= N; ++i)
        res = ((res % M) * (i % M)) % M;

    return res;
}
```

## 3. Tổ hợp không lặp

Một ***tổ hợp*** chập $k$ của $n$ phần tử $(k \le n)$ là một bộ không xét đến thứ tự gồm $k$ thành phần khác nhau lấy từ $n$ phần tử của tập đã cho. Trong tổ hợp, các bộ gồm các phần tử giống nhau nhưng có cách sắp xếp khác nhau vẫn chỉ tính là một bộ - điều này khác với chỉnh hợp. Ta có công thức:
$$C^k_n = \frac{n \times (n - 1) \times \cdots \times (n - k + 1)}{k!} = \frac{n!}{k! \times (n - k)!}$$

Một số tính chất khá quan trọng của tổ hợp cần ghi nhớ:
- $C^k_n = C^{n - k}_n$.
- $C^0_n = C^n_n = 1$.
- $C^k_n = C^{k - 1}_{n - 1} + C^k_{n - 1} \ (0 < k < n)$.
- $C^k_n$ chính là số lượng dãy nhị phân độ dài $n$ mà có đúng $k$ số $1,$ vì ta chọn ra $k$ vị trí khác nhau trong $n$ vị trí để đặt làm số $1$.

***Cài đặt:*** Đếm số lượng tổ hợp chập $k$ của $n,$ đưa ra kết quả sau khi chia cho $10^9 + 7$ và lấy phần dư:

```cpp
/*
    - Rút gọn công thức tính C(K, N), ta có: 
        C(K, N) = (N - K + 1)(N - K + 2)...N / K!
                = [(N - K + 1)(N - K + 2)...N] * 1/K!
    - Áp dụng công thức nghịch đảo modulo, ta có:
        C(K, N) = [(N - K + 1)(N - K + 2)...N] * inverse_modulo(K!, M).
                = [(N - K + 1)(N - K + 2)...N] * (K!)^(M - 2)
                  (vì M = 10^9 + 7 là số nguyên tố).
   - Tới đây chỉ cần áp dụng các công thức modulo để tính toán C(K, N).
*/

long long M = 1e9 + 7;

long long modular_exponentiation(long long A, long long B, long long M) // Lũy thừa modulo A^B % M.
{
    if (B == 0)
        return 1;

    long long half = modular_exponentiation(A, B / 2, M) % M;

    if (B & 1)
        return ((half * half) % M * (A % M)) % M;
    else
        return (half * half) % M;
}

long long modular_inverse(long long A, long long M) // Nghịch đảo modulo M của A.
{
    return modular_exponentiation(A, M - 2, M);
}

long long ckn(long long N, long long K)
{
    long long x = 1, y = 1; 
    for (long long i = N - K + 1; i <= N; ++i) // x = (N - K + 1) * ... * N.
        x = (x * i) % M;
    for (long long i = 1; i <= K; ++i) // y = K!
        y = (y * i) % M;
    y = modular_inverse(y, M); // Tính (1/y) % M.

    long long res = (x * y) % M; // Kết quả cuối cùng là C(K, N).

    return res;
}
```

## 4. Tổ hợp lặp

Tương tự như chỉnh hợp lặp, một tổ hợp lặp chập $k$ của $n$ phần tử là một cách chọn ra $k$ phần tử thuộc tập hợp, mỗi phần tử được phép chọn nhiều lần nhưng không xét tính thứ tự. Công thức tính số tổ hợp lặp chập $k$ của $n$ là:
$$\overline{C^k_n} = \frac{(n + k - 1)!}{k!\times (n - 1)!}$$

Một tính chất rất thú vị của tổ hợp lặp đó là: $\overline{C^k_n}$ chính là số nghiệm nguyên không âm của phương trình: $x_1 + x_2 + \cdots + x_n = k,$ với $k$ là hằng số nguyên dương.

***Cài đặt:*** Đếm số lượng tổ hợp chập $k$ của $n,$ đưa ra kết quả sau khi chia cho $10^9 + 7$ và lấy phần dư:

```cpp
/* 
Tương tự với tính tổ hợp không lặp, ta cần rút gọn công thức tổ hợp lặp để tính toán dễ 
dàng hơn. Công thức sẽ trở thành: 
        C'(K, N) = [N * (N + 1) * ... * (N + K - 1)] / K!

Tới đây tính x = [N * (N + 1) * ... * (N + K - 1)] % (1e9 + 7), y = (1 / K!) % (1e9 + 7),
rồi đưa ra kết quả cuối cùng là (x * y) % (1e9 + 7)
*/

long long M = 1e9 + 7;

long long modular_exponentiation(long long A, long long B, long long M) 
{
    if (B == 0)
        return 1;

    long long half = modular_exponentiation(A, B / 2, M) % M;

    if (B & 1)
        return ((half * half) % M * (A % M)) % M;
    else
        return (half * half) % M;
}

long long modular_inverse(long long A, long long M) 
{
    return modular_exponentiation(A, M - 2, M);
}

long long repetition_ckn(int N, int K)
{
    long long x = 1, y = 1;
    for (long long i = N; i <= N + K - 1; ++i)
        x = (x * i) % M;
    for (long long i = 1; i <= K; ++i) // y = K!
        y = (y * i) % M;
    y = modular_inverse(y, M);

    long long res = (x * y) % M;

    return res;
}
```

## 5. Hoán vị

Một ***hoán vị*** của $n$ phần tử là một cách sắp xếp thứ tự các phần tử đó. Hoán vị của $n$ phần tử có thể coi như một trường hợp đặc biệt của chỉnh hợp không lặp với $k = n,$ do đó, số lượng hoán vị của $n$ là $n!$

***Cài đặt:*** Đếm số lượng hoán vị của $n$ phần tử, đưa ra kết quả sau khi chia cho $10^9 + 7$ và lấy phần dư:

```cpp
long long M = 1e9 + 7;

long long permutation(int N)
{
    long long res = 1;
    for (long long i = 1; i <= N; ++i)
        res = (res * i) % M;

    return res;
}
```

***Hoán vị*** có một số dạng đặc biệt cần lưu tâm:
- ***Hoán vị vòng quanh (Circular Permutation):*** Là dạng hoán vị mà $n$ phần tử của tập được xoay chuyển quanh một vòng tròn có các vị trí được đánh số từ $1$ tới $n$. Theo đó, dãy các hoán vị vòng quanh được tạo ra bằng cách: Đưa phần tử cuối cùng lên đầu dãy, sau đó đẩy tất cả các phần tử còn lại về phía sau một vị trí, ta được hoán vị vòng quanh thứ nhất; tiếp tục lặp lại thao tác này tới khi thu được chính dãy ban đầu thì kết thúc. Như vậy, tổng số hoán vị vòng quanh của $n$ phần tử sẽ chính bằng $n$.
- ***Hoán vị Josephus:*** Được phát biểu dưới dạng một trò chơi như sau: Cho $n$ người đứng quanh vòng tròn theo chiều kim đồng hồ được đánh số từ $1$ tới $n$. Họ bắt đầu đếm từ người thứ nhất theo chiều kim đồng hồ, người nào đếm đến $m$ thì bị loại khỏi vòng tròn và người kế tiếp sẽ đếm lại từ $1$. Trò chơi tiếp diễn cho đến khi vòng tròn không còn lại người nào. Nếu ta xếp số hiệu của $n$ người theo thứ tự mà họ bị loại khỏi vòng tròn thì ta được một hoán vị $(j_1, j_2,..., j_n)$ của dãy số $(1, 2,..., n)$ gọi là hoán vị Josephus $(n, m)$.
- ***Hoán vị derangements:*** Một hoán vị $\{p_1, p_2,...,p_n\}$ của $n$ phần tử $\{1, 2,..., n\}$ được gọi là một ***derangement*** khi và chỉ khi $p_i \ne i \ (\forall i: 1 \le i \le n)$. Số lượng derangements của $n$ là $D(n) = n!\sum_{k=0}^n(-1)^k\times \frac{1}{k!}$.

# IV. Tài liệu tham khảo

- https://www.geeksforgeeks.org/eulerian-number/
- https://vnoi.info/wiki/translate/he/Number-Theory-5
- https://www.hackerearth.com/practice/notes/number-theory-ii/
- https://vnoi.info/wiki/translate/he/Number-Theory-7.md
- <a href="https://tailieu.vn/doc/tai-lieu-giao-khoa-chuyen-tin-quyen-1--2035191.html">Tài liệu giáo khoa chuyên Tin quyển 1 - thầy Hồ Sĩ Đàm</a>