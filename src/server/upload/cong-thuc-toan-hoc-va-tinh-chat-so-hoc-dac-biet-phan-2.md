Đây là bài viết thứ hai trong series bài viết về Công thức Toán học và Tính chất số học đặc biệt trong Lập trình thi đấu. Để xem lại bài viết trước, các bạn có thể nhấn vào <a href="https://viblo.asia/p/cong-thuc-toan-hoc-va-tinh-chat-so-hoc-dac-biet-phan-1-gAm5y7gkZdb">đây</a>.

# V. Một số đẳng thức đáng lưu ý

Qua quá trình nghiên cứu và đúc kết từ các kỳ thi HSG Tin học các cấp và kinh nghiệm cá nhân, tác giả nhận thấy các dãy số với công thức có sẵn thường được áp dụng rất nhiều trong các bài toán về chủ đề Số học trong Tin học. Tất nhiên, không ai cho các bạn một dãy số rồi bắt tìm công thức của nó cả, nhưng những dãy số sẽ được lồng ghép vào các bài toán lớn để gây khó khăn cho người giải ở những bước tìm kết quả cuối cùng. Vì vậy, tôi đã tổng hợp những dãy số rất hữu ích có thể sử dụng trong lập trình thi đấu, hy vọng nó đủ dùng. Các dãy số chủ yếu sẽ có được công thức từ việc chứng minh quy nạp hoặc biến đổi theo phương pháp của THCS, bạn đọc cố gắng đọc kĩ để hiểu được thì sẽ nhớ rất lâu!

## 1. $1^2 + 2^2 + 3^2 + \cdots + n^2=\frac{n(n+1)(2n+1)}{6}$

***Chứng minh:*** Sử dụng quy nạp toán học:
- Với $n=1,$ ta thấy $1^2=\frac{1(1+1)(2+1)}{6}=1,$ đẳng thức đúng.
- Giả sử đẳng thức đúng với $n=k,$ tức là  $1^2 + 2^2 + 3^2 + \cdots + k^2=\frac{k(k+1)(2k+1)}{6} \cdot$
- Chứng minh đẳng thức đúng với $k+1$:
$1^2 + 2^2 + \cdots + k^2 + (k+1)^2$.
$= \frac{k(k + 1)(2k + 1)}{6} + (k+1)^2$ (Do giả thiết quy nạp).
$= \frac{1}{6}\cdot(k+1).[k(2k+1)+6(k+1)]$.
$= \frac{1}{6}\cdot (k+1).(2k^2+7k+6)$.
$= \frac{1}{6}\cdot(k+1).(k+2).(2k+3)$.
$= \frac{1}{6}\cdot(k+1).[(k+1)+1].[2(k+1)+1]$ (điều phải chứng minh).
    
Vậy đẳng thức đúng với mọi $n \in N^{*}$.

## 2. $1^3 + 2^3 + \cdots + n^3=(1+2+\cdots+n)^2$

***Chứng minh:***

- Với $n=1,$ ta có $1^3=1^2,$ đẳng thức đúng.
- Giả sử đẳng thức đúng với $n=k,$ tức là $1^3+2^3+\cdots + k^3=(1+2+\cdots+k)^2$.
- Chứng minh đẳng thức đúng với $n=(k+1)$:
$1^3+2^3 + \cdots + k^3 + (k+1)^3$.
$=(1+2+\cdots+k)^2 + (k+1)^3$.
$=(\frac{k(k+1)}{2})^2 + (k+1)^3$.
Giờ ta cần chứng minh: 
$(\frac{k(k+1)}{2})^2 + (k+1)^3=(\frac{(k+1)(k+2)}{2})^2 \ (1)$.
Thật vậy, ta có:
$(1)\Leftrightarrow (k^2+3k+2)^2-(k^2+k)^2=4.(k+1)^3$
$\Leftrightarrow 4k^3 +12k^2 + 12k + 4 = 4.(k+1)^3$
$\Leftrightarrow 4.(k+1)^3 = 4.(k+1)^3,$ đẳng thức đúng. 

Vậy đẳng thức (1) đúng với $n=k+1,$ đồng nghĩa với việc đẳng thức ban đầu đúng với $\forall n\in N^{*}$.

## 3. $1+3+5+ \cdots + (2n-1)=n^2$

***Chứng minh:***
- Với $n=1,$ ta có $1=1^2,$ đẳng thức đúng.
- Giả sử đẳng thức đúng với $n=k,$ tức là $1+3+5+...+(2k-1)=k^2$.
- Chứng minh đẳng thức đúng với $n=(k+1)$:
$1+3+5+ \cdots + (2k-1)+[2(k+1)-1]=(k+1)^2$.
Thật vậy, ta có:
$1+3+5+ \cdots + (2k-1)+[2(k+1)-1]$
$=k^2+[2(k+1)-1]$ (Do giả thiết quy nạp).
$=k^2+2k+1$.
$=(k+1)^2$.

Vậy ta có điều phải chứng minh, đẳng thức đúng với $\forall n \in N^{*}$.

## 4. $2+5+8+ \cdots + (3n-1)=\frac{n.(3n+1)}{2}$

***Chứng minh:***
- Với $n=1,$ ta có $2=\frac{1.4}{2},$ đẳng thức đúng.
- Giả sử đẳng thức đúng với $n=k,$ tức là $2+5+8+...+(3k-1)=\frac{k.(3k+1)}{2}$.
- Chứng minh đẳng thức đúng với $n=(k+1)$:
$2+5+8+ \cdots + (3k-1)+[3(k+1)-1]=\frac{(k+1).[3.(k+1)+1]}{2}$.
Thật vậy, ta có:
$2+5+8+ \cdots + (3k-1)+[3.(k+1)-1]$.
$=\frac{k.(3k+1)}{2}+[3.(k+1)-1]$ (Do giả thiết quy nạp).
$=\frac{3k^2+7k+4}{2} \cdot$
$=\frac{3(k+1)(k+\frac{4}{3})}{2} \cdot$
$=\frac{(k+1).[3.(k+1)+1]}{2} \cdot$

Vậy ta có điều phải chứng minh, đẳng thức đúng với $\forall n \in N^{*}$.

# VI. Bất đẳng thức

Các bất đẳng thức được ứng dụng nhiều nhất trong Toán học cũng như Tin học ở mức độ thi HSG sẽ là ***bất đẳng thức AM - GM*** và ***bất đẳng thức Bunyakovsky***. Trong các bài toán số học, hai bất đẳng thức này sẽ có tác dụng rất lớn trong việc đặt cận cho bài toán, từ đó dễ dàng thực hiện các công việc liên quan tới đếm số lượng. Quá trình chứng minh của các bất đẳng thức này là thành quả toán học lâu dài và cũng không cần thiết cho bạn đọc nên người viết xin phép không trình bày ở đây.

## 1. Bất đẳng thức AM - GM

Các bạn thường được biết đến bất đẳng thức này trong chương trình Toán trung học là bất đẳng thức Cauchy. Nhưng thực ra nó chỉ được chứng minh bởi Cauchy mà thôi, còn tên quốc tế của nó phải là ***Bất đẳng thức AM - GM***, hay ***Bất đẳng thức trung bình cộng - trung bình nhân***. Bất đẳng thức này được phát biểu như sau: "Trung bình cộng của $n$ số luôn luôn lớn hơn hoặc bằng trung bình nhân của chúng. Dấu bằng xảy ra khi và chỉ khi cả $n$ số đó bằng nhau":

$$\frac{x_1 + x_2 + \cdots + x_n}{n} \ge {\sqrt[ {n}]{x_{1}.x_{2}...x_{n}}}$$

<div align="center">
    
Dấu $=$ xảy ra $\Leftrightarrow x_1 =x_2=\cdots =x_n$
</div>


Bất đẳng thức này cũng hoàn toàn đúng trong trường hợp hai giá trị trung bình có hệ số: Với $n$ số $x_1, x_2,..., x_n$ và các hệ số $\alpha_1, \alpha_2,..., \alpha_n,$ nếu đặt $\alpha=\alpha_1 + \alpha_2 + \cdots + \alpha_n$ thì:
$$\frac{\alpha_1x_1 + \alpha_2x_2 + \cdots + \alpha_nx_n}{\alpha} \ge {\sqrt[ {\alpha}]{x_1^{\alpha_1}.x_2^{\alpha_2}...x_n^{\alpha_n}}}$$ 

<div align="center">
    
Dấu $=$ xảy ra $\Leftrightarrow x_1 =x_2=\cdots =x_n$
</div>

## 2. Bất đẳng thức Bunyakovsky

Là dạng cơ bản của bất đẳng thức Cauchy - Schwarz, một bất đẳng thức được áp dụng trong nhiều lĩnh vực của Toán học. Dưới đây là dạng tổng quát của bất đẳng thức Bunyakovsky cho hai bộ số $(a_1, a_2,..., a_n)$ và $b_1, b_2,..., b_n$:

$$(a_1^2+a_2^2 +\cdots + a_n^2)(b_1^2 + b_2^2 + \cdots + b_n^2) \ge (a_1b_1 + a_2b_2 + \cdots + a_nb_n)^2$$

<div align="center">
    
Dấu $=$ xảy ra $\Leftrightarrow \frac{a_1}{b_1}=\frac{a_2}{b_2}=\cdots \frac{a_n}{b_n}$. Quy ước nếu $b_i = 0$ thì $a_i=0.$
</div>

# VI. Bài tập áp dụng

## 1. Tổng liên tiếp

### Đề bài

Sau khi học về số học, Minh đã biết cách tính tổng của $N$ số tự nhiên liên tiếp. Minh làm thêm nhiều bài tập số học và băn khoăn, liệu với số tự nhiên $N$ thì có thể phân tích được $N$ thành tổng các số tự nhiên liên tiếp hay không? Ví dụ với $N=9$ thì có thể phân tích theo $3$ cách: $9=9;9=5+4;9=2+3+4$. 

***Yêu cầu:*** Hãy viết chương trình giúp Minh đếm số cách phân tích số tự nhiên $N$ thành tổng cách số tự nhiên liên tiếp?

***Input:***

- Gồm một dòng duy nhất chứa số tự nhiên $N$.

***Ràng buộc:***

- $1≤N≤10^{12}$.

***Output:***

- Chứa một số nguyên duy nhất là số lượng cách phân tích số tự nhiên $N$ thành tổng các số tự nhiên liên tiếp.

***Sample Input:***

```
9
```

***Sample Output:***

```
3
```

### Ý tưởng

Giả sử $N$ phân tích được thành một dãy liên tiếp:

$$N=a+(a+1)+(a+2)+⋯+(a+L)$$ 

$$=\frac{L.(L+1)}{2}+(L+1).a$$ 

$$\rightarrow a=N-\frac{\frac{L.(L+1)}{2}}{L+1}=\frac{N}{L+1}-\frac{L}{2} \ (1)$$
	
Giờ ta đánh giá cận trên và cận dưới của $L$: 
- Chắc chắn cận dưới của $L$ là 0.
- Giả sử $a=1,$ tức là $N$ phân tích thành một dãy số liên tiếp bắt đầu từ $1$ (nghĩa là $L$ sẽ đạt giá trị lớn nhất). Khi đó $N=\frac{L.(L+1)}{2}+(L+1),$ tức là $2N=(L+1).(L+2)$. Tới đây ta có thể duyệt tất cả các giá trị $L$ thỏa mãn $(L+1).(L+2)≤2N$ rồi tìm ra $a$ bằng công thức $(1)$. Nếu $a$ là số nguyên thì ta có một cách phân tích.

***Độ phức tạp:*** $O(\sqrt{N})$.

### Code mẫu

```cpp
#pragma GCC optimize("O3","unroll-loops")
#pragma GCC target("avx2")

#include <bits/stdc++.h>
#define int long long

using namespace std;

void solution(int n)
{
    int res = 0;
    
    for (int l = 0; (l + 1) * (l + 2) <= 2 * n; ++l)
    {
        double a = (double) n / (l + 1) - (double) l / 2;

        res += (a == (int) a);
    }

    cout << res;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    solution(n);

    return 0;
}
```

## 2. Thi đấu bóng đá

### Đề bài

Đất nước CP tổ chức một giải đấu bóng đá quốc nội. Có $n$ đội bóng tham gia thi đấu, mỗi đội đều đấu với tất cả các đội còn lại. Quốc vương của đất nước CP là một người rất yêu thích toán học, lần này, ông đặt ra một câu hỏi cho vị tể tướng đáng kính của mình như sau: Giả sử đội thứ $i$ giành chiến thắng trong $w_i$ trận đấu, thì tổng của mọi giá trị $w_i^2$ với i$=1,\ 2,\ 3,\dots,n$ là bao nhiêu? 

Tể tướng cảm thấy câu hỏi này rất khó, vì có quá nhiều trường hợp có thể xảy ra. Vì vậy, ông ấy xin phép trả lời nhà vua bằng cách đưa ra giá trị lớn nhất và giá trị nhỏ nhất có thể của tổng $\sum_{i=1}^{n}w_i^2$ và đã được nhà vua chấp thuận. Tuy nhiên, việc này vẫn không phải là một vấn đề đơn giản.

***Yêu cầu:*** Biết trước giá trị $n$ là số lượng đội tham gia giải đấu, hãy giúp tể tướng tìm ra giá trị nhỏ nhất và giá trị lớn nhất của tổng $\sum_{i=1}^{n}w_i^2?$

***Input:***

- Dòng đầu tiên chứa số nguyên dương $T$ – số lượng testcases.
- $T$ dòng tiếp theo, mỗi dòng chứa một số nguyên dương $n$.

***Ràng buộc:***

- $1 \le T \le 10^5$.
- $3 \le n \le 10^9$.

***Output:***

- Trên $T$ dòng, mỗi dòng đưa ra một số nguyên duy nhất là kết quả của testcase tương ứng. Chỉ cần đưa ra phần dư của kết quả sau khi chia cho $10^9+7$.

***Sample Input:***

```
2
3
5
```

***Sample Output:***

```
3 5
20 30
```

### Ý tưởng

Nhận xét: $(w_1 + w_2 + \cdots + w_n) = C^2_n = \frac{n(n - 1)}{2} \ (1)$.

Bài toán trở thành: Tìm min và max của $(w_1^2 + w_2^2 + \cdots + w_n^2)$ khi đã biết đẳng thức $(1)$. Ta có:

- $n \times (w_1^2 + w_2^2 + \cdots + w_n^2) \ge (w_1 + w_2 + \cdots + w_n)^2$. Bất đẳng thức này là hệ quả trực tiếp của bất đẳng thức Cauchy Schwarz, hay còn gọi là bất đẳng thức Bunyakovsky với hai bộ số $(w_1, w_2, \dots, w_n)$ và $(1, 1, \dots, 1)$. 
    $\Rightarrow$ Vậy $\text{min}(w_1^2 + w_2^2 + \cdots + w_n^2) = \frac{(C^2_n)^2}{n} = \frac{\big[n(n - 1)\big]^2}{4}$.

- Đối với tìm max, ta nhận xét thấy biểu thức $(w_1^2 + w_2^2 + \cdots + w_n^2)$ đạt giá trị max, thì $w_1, w_2, \dots, w_n$ tạo ra một dãy số liên tục, tức là đội thứ nhất thắng $0$ trận, đội thứ $2$ thắng $1$ trận,..., đội thứ $n$ thắng $(n - 1)$ trận (đội $i$ thắng toàn bộ $i - 1$ đội trước đó). Vậy max là $[0^2 + 1^2 + \cdots + (n - 1)^2] = \frac{n(n - 1)(2n - 1)}{6}$.

Ta cần lưu ý sử dụng nghịch đảo module đối với ngôn ngữ C++ để tránh bị tràn số.

***Độ phức tạp:*** $O(T \times \log mod)$.

### Code mẫu

```cpp
#pragma GCC optimize("O3","unroll-loops")
#pragma GCC target("avx2")

#include <bits/stdc++.h>
#define int long long

using namespace std;

const int mod = 1e9 + 7;

int modular_exponentiation(int a, int b, int m)
{
    if (b == 0)
        return 1;

    int half = modular_exponentiation(a, b / 2LL, m) % m;

    if (b & 1)
        return (((half * half) % m) * (a % m)) % m;
    else
        return (half * half) % m;
}

int inverse_modulo(int a, int m)
{
    return modular_exponentiation(a, m - 2, m);
}

void solution(int n, int m)
{
    int min_value = ((n % m) * modular_exponentiation(n - 1, 2, m)) % m;
    int max_value = ((((n % m) * ((n - 1) % m)) % m) * ((2 * n - 1) % m)) % m;

    min_value = (min_value * inverse_modulo(4, m)) % m;
    max_value = (max_value * inverse_modulo(6, m)) % m;

    cout << min_value << ' ' << max_value << endl;
}

main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    int ntest;
    cin >> ntest;

    while (ntest--)
    {
        int n;
        cin >> n;

        solution(n, mod);
    }

    return 0;
}
```

# VIII. Lời kết

Như vậy, chúng ta đã cùng nhau tìm hiểu những công thức, định lý rất thú vị và hữu ích trong Toán học có thể ứng dụng trong Tin học. Tuy nhiên, đó không phải là tất cả. Toán học là một chủ đề cực kỳ rộng lớn và chắc chắn không thể tóm gọn trong vài trang giấy. Vì vậy, trên đây chỉ là một phần rất nhỏ những thứ có thể giúp ích cho các bạn học sinh trong quá trình rèn luyện Thuật toán mà thôi.

Những bài tập của công thức Toán học rất phong phú, phần nhiều sẽ xuất phát từ những công thức rất đơn giản, chỉ cần biến đổi một chút là thu được kết quả. Vì vậy, trước khi suy nghĩ đến những công thức quá phức tạp, bạn đọc hãy tìm cách tạo ra công thức Toán học thông qua những biến đổi thông thường như giải phương trình, chuyển vế đổi dấu hay nhân phá ngoặc,...rất có thể sẽ giúp các bạn tìm ra đáp án bài toán nhanh chóng.

Cuối cùng, hãy chịu khó rèn luyện thật nhiều các bài toán số học để tăng cường khả năng tư duy và mở rộng tầm hiểu biết của bản thân về các công thức toán học. Nơi luyện tập phù hợp nhất chính là thông qua các kỳ thi trên các trang web online judge như codeforces.com hay hackkerank.com,...

# IX. Tài liệu tham khảo

- https://codeforces.com/blog/entry/55912
- https://toanhoc247.com/ly-thuyet-va-bai-tap-ve-phuong-phap-quy-nap-toan-hoc-a10798.html
- https://codeforces.com/blog/entry/51272
- https://vnoi.info/wiki/translate/he/Number-Theory-4.md
- https://www.geeksforgeeks.org/eulers-totient-function/
- https://www.geeksforgeeks.org/legendres-formula-highest-power-of-prime-number-that-divides-n/
- https://www.geeksforgeeks.org/largest-power-k-n-factorial-k-may-not-prime/
- https://vi.wikipedia.org/wiki/B%E1%BA%A5t_%C4%91%E1%BA%B3ng_th%E1%BB%A9c_Cauchy%E2%80%93Schwarz