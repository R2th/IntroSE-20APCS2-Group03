# I. Phép đồng dư thức cơ bản

Đồng dư thức là phép toán lấy số dư của số này khi chia cho số khác, kí hiệu là $\%$. Ví dụ: $5 \% 2=1$, khi đó có thể viết là $5 \equiv 1$ $(mod$ $2)$.

Phép đồng dư thức có tính chất phân phối đối với phép cộng, phép nhân và phép trừ, cụ thể như sau: 

- $(a + b)$ $\%$ $c$ $= [(a$ $\%$ $c) + (b$ $\%$ $c)]$ $\%$ $c$.
- $(a - b)$ $\%$ $c$ $= [(a$ $\%$ $c) - (b$ $\%$ $c)]$ $\%$ $c$.
- $(a \times b)$ $\%$ $c$ $= [(a$ $\%$ $c) \times (b$ $\%$ $c)]$ $\%$ $c$.

Riêng đối với phép chia, chúng ta không có tính chất phân phối, mà phải sử dụng một lí thuyết là ***Nghịch đảo modulo***.

# II. Nghịch đảo modulo của một số

# 1. Định nghĩa

Như chúng ta đều biết ở chương trình Toán phổ thông, nghịch đảo của một số nguyên $a$ (kí hiệu $a^{-1}$) là số thỏa mãn: $a.a^{-1}=1$.

Đối với nghịch đảo modulo, ta cũng có khái niệm tương tự, nhưng là xét trên tập số dư khi chia cho $M$. Nghịch đảo modulo $M$ của một số $a$ (cũng kí hiệu $a^{-1}$) là số nguyên thỏa mãn: $a.a^{-1}\equiv1\ (mod$ $M)$ (Nói cách khác, $a^{-1}$ chính là $\frac{1}{a}$ $\%$ $M)$. Lấy ví dụ, nếu ta chọn $M={10}^9+7, a=2$ thì $a^{-1}=500000004$.

Không phải lúc nào cũng tồn tại $a^{-1}$. Chỉ khi $GCD(a, M)=1$ thì mới tồn tại $a^{-1}$ là nghịch đảo modulo $M$ của $a$. Để tính nghịch đảo modulo của một số, ta có thể sử dụng hai giải thuật: Giải thuật Euclid mở rộng hoặc dựa trên định lý Fermat nhỏ (áp dụng giải thuật chia để trị tính $a^b\ %\ c$).

## 2. Giải thuật Euclid mở rộng 

$\text{GCD}(A,B)$ có một tính chất là luôn có thể biểu diễn dưới dạng phương trình:

$$Ax+By=\text{GCD}(A,B) \ (1)$$

Giải thuật Euclid mở rộng sử dụng để tìm một cặp số nguyên $(x,y)$ thỏa mãn phương trình trên, và còn dùng để tính nghịch đảo modulo (mình sẽ nói tới ở phần sau). Cặp số $(x,y)$ có thể có giá trị âm, hoặc bằng $0$ đều được. Dưới đây tôi sẽ trình bày giải thuật tìm $\text{GCD}(A,B)$ và một cặp $(x,y)$ thỏa mãn phương trình.

```cpp=
long long d, x, y; // UCLN và cặp nghiệm (x, y).

void extended_euclid(long long A, long long B)
{
    if (B == 0)
    {
        x = 1;
        y = 0;
        d = A;
    }
    else
    {
        extended_euclid(B, A % B);
        long long temp = x;
        x = y;
        y = temp – (A / B) * y;
    }
}

int main()
{
    cin >> A >> B;
    extended_euclid(A, B);
    cout << d << ' ' << x << ‘  ‘ << y;
    return 0;
}
```

Cơ chế của giải thuật như sau: Ban đầu chương trình thực thi giống giải thuật Euclid, tới khi $B=0,$ khi đó ta sẽ có $A$ là ước chung lớn nhất của $A$ và $B,$ sau đó đặt $x=1,y=0$. Bởi vì $B=0$ và hiện tại $\text{GCD}(A,B)=A$ nên phương trình $(1)$ trở thành: 
$$A.1+0.0=A$$

Sau đó chương trình gọi lại các lệnh dưới lời gọi đệ quy để tìm ra $x$ và $y$. Chứng minh như sau: 
- Sau khi gọi đệ quy, phương trình ở bước tiếp theo của giải thuật là: 
$$B.x+(A \% B).y=\text{GCD}(A,B) \ (2)$$

- Thay $A \ \% \ B=A-\left \lfloor{\frac{A}{B}} \right \rfloor .B$, phương trình $(2)$ trở thành: 
$$B.x+(A-\left \lfloor{\frac{A}{B}} \right \rfloor.B).y=\text{GCD}(A,B)$$ $$\Leftrightarrow A.y+B.(x-\left \lfloor{\frac{A}{B}} \right \rfloor.y)=\text{GCD}(A,B)$$ 

- Từ đây được công thức đệ quy: 
$$x' = y; y' = x - \left \lfloor{\frac{A}{B}} \right \rfloor.y$$

- Như vậy từ bước cơ bản $x=1,y=0;$ chương trình sẽ tiếp tục tính ngược lên để ra được $x,y$ thỏa mãn phương trình ban đầu. Độ phức tạp giải thuật là $O\Big(\log\big(\text{max}⁡(A,B)\big)\Big)$.

Ngoài ra, giải thuật Euclid mở rộng còn có thể sử dụng để giải ***phương trình Diophantine tuyến tính,*** sẽ được đề cập tới ở một bài viết khác.

## 3. Tính toán nghịch đảo Modulo của một số

### Sử dụng giải thuật Euclid mở rộng

Như đã trình bày ở trên, theo giải thuật Euclid mở rộng, nếu $GCD\left(a,M\right)=1$, ta luôn tìm được $x$ và $y$ thỏa mãn: $a.x+M.y=1$. Mà $M.y$ chia hết cho $M$, do đó phương trình trở thành: 
$$a.x \equiv 1 (\text{mod} \ M)$$

Từ đây suy ra $x$ chính là $a^{-1}$. Tuy nhiên trong giải thuật Euclid mở rộng, $x$ có thể mang giá trị âm, nên ta sẽ điều chỉnh một chút để tính được giá trị $a^{-1}$ luôn không âm. Code dưới đây sẽ tái sử dụng lại đoạn code giải thuật Euclid mở rộng ở phía trên:

```cpp=
long long modulo_inverse(long long a, long long M)
{
    extended_euclid(a, M);
	  
    // a và M không nguyên tố cùng nhau, không tồn tại nghịch đảo modulo M của a.
    if (d != 1)
        return -1; 

    // Do x có thể âm, ta làm dương nó.
    return (x % M + M) % M; 
}
```

### Tính nghịch đảo modulo bằng định lý Fermat nhỏ

Theo định lý Fermat nhỏ, ta có: Nếu $M$ là số nguyên tố và $a$ không chia hết cho $M$ thì: 
$$a^{M-1}\equiv 1 \ (\text{mod} \ M)$$ hay nói cách khác:
$$a\times a^{M-2} \equiv 1 \ (\text{mod} \ M)$$

Điều này tương đương với việc nếu $M$ là số nguyên tố và $a$ không chia hết cho $M$ thì $a^{M-2}$ chính là nghịch đảo modulo $M$ của $a$, cũng tương đương với  $a^{M-2}$ $\%$ $M$ là nghịch đảo modulo $M$ của $a$.

```cpp=
long long power_mod(long long a, long long b, long long M) // Tính a^b % M.
{
      if (b == 0)
           return 1;
      if (b == 1)
           return a;

      long long half = power_mod(a, b / 2, M) % M;

      if (b % 2 == 0)
           return (half * half) % M;
      else 
           return (((half * half) % M) * a) % M;
}

long long modulo_inverse(int a, int M)
{
      return power_mod(a, M – 2, M);
}
```

## 4. Áp dụng nghịch đảo modulo để tính $\frac{a}{b} \ \% \ c$

Mình đã đề cập ở mục $1$, phép chia không có tính chất phân phối đối với phép đồng dư thức giống như các phép cộng, trừ và nhân. Để tính $\frac{a}{b} \ \% \ c,$ ta làm như sau:
- Tách $\frac{a}{b} = \left(a \times \frac{1}{b}\right) \ \% \ c =\left(a \times b^{-1}\right) \ \% \ c,$ trong đó $b^{-1}$ là nghịch đảo modulo $c$ của $b$.
- Sau đó áp dụng tính chất phân phối của phép nhân đối với phép đồng dư thức, lúc này phép chia modulo trở thành phép nhân với nghịch đảo modulo. Lưu ý, tùy vào giá trị $c$ mà ta chọn cách tìm nghịch đảo modulo thích hợp ($c$ có là số nguyên tố hay không). 
 
***Cài đặt:***

```cpp=
long long modulo_divide(long long a, long long b, long long c)
{
      long long inverse = modulo_inverse(b, c);
      return (a % c * inverse) % c;
}
```

# III. Một số kiến thức nâng cao khác

## 1. Bậc lũy thừa theo modulo $N$ (Multiplicative Order)

Xét hai số nguyên $a$ và $N$ nguyên tố cùng nhau, ***bậc lũy thừa*** của $a$ theo modulo $N$ là số nguyên dương $K$ nhỏ nhất thỏa mãn: $a^K \equiv 1 \text{ } (mod \text{ } N)$, kí hiệu là $ord_N(a)$.

Theo định lý Euler, vì $a$ và $N$ là hai số nguyên tố cùng nhau nên $a^{\phi(N)} \equiv 1 \ (\text{mod} \ N),$ với $\phi(N)$ là số lượng số nguyên dương không vượt quá $N$ và nguyên tố cùng nhau với $N$. Mà $\phi(N) \le N$, do đó $ord_N(a) \le N$, vậy để tìm $ord_N(a)$ chỉ cần duyệt một vòng lặp từ $1$ tới $N$ với độ phức tạp $O(N - 1)$.

```cpp=
int find_m_order(int a, int N)
{
    int mul = 1;

    for (int i = 1; i <= N; ++i)
    {
        mul = (mul * a) % N;

        if (mul == 1)
            return i;
    }
}
```

## 2. Tiêu chuẩn Euler (Euler's Criterion)

Đầu tiên, ta làm quen với khái niệm ***Thặng dư bậc hai:*** Một số nguyên $q$ được gọi là ***thặng dư bậc hai*** theo modulo $N$ nếu như nó đồng dư với một số chính phương theo modulo $N,$ nghĩa là tồn tại một số nguyên $x$ sao cho $x^2 \equiv q \ (\text{mod} \ N)$.

Trong lý thuyết số, ***tiêu chuẩn Euler*** là một công thức dùng để xác định xem một số nguyên có phải là một thặng dư bậc hai theo modulo $P$ (với $P$ là một số nguyên tố) hay không. Theo đó, xét hai số nguyên $a$ và $P$ nguyên tố cùng nhau, trong đó $P$ là một số nguyên tố lẻ. Ta có công thức sau:
$$a^{\frac{P - 1}{2}} \equiv \begin{cases}1 \text{ }(\text{mod} \ P),&\text{nếu }a \text{ là thặng dư bậc hai của }P. \\ -1\text{ }(\text{mod} \ P),& \text{nếu }a \text{ không là thặng dư bậc hai của }P.\end{cases}$$
 
Đối với trường hợp $P=2,$ mọi số nguyên đều là thặng dư bậc hai theo modulo $P$.

Ví dụ, xét $P = 7$, ta có $a = 2$ là thặng dư bậc hai của $7$, vì tồn tại hai số nguyên $x = 3$ và $x = 4$ thỏa mãn $a \equiv x^2 \text{ } (mod \text{ } P)$.  

```cpp=
long long power_mod(long long a, long long b, long long P)
{
      if (b == 0)
           return 1;
      if (b == 1)
           return a;

      long long half = power_mod(a, b / 2, P) % P;

      if (b % 2 == 0)
           return (half * half) % P;
      else 
           return (((half * half) % P) * (a % P)) % P;
}
    
// Kiểm tra N có phải thặng dư bậc 2 của P hay không.
bool check_quadratic_residue(long long N, long long P)
{
    if (P == 2)
        return true;
    else
        return (power_mod(N, (P - 1) / 2, P) == 1);
}
```

Trong trường hợp $N$ và $P$ cùng có dạng $4i + 3 \ (i > 0)$, thì giá trị $x$ thỏa mãn $x^2 \equiv N \ (\text{mod} \ P)$ (nếu tồn tại) chỉ có thể là: $x=\pm \text{ }N^{\frac{P + 1}{4}}$. Dựa vào nhận xét này ta có thể tính nhanh ra giá trị $x$. Chứng minh nhận xét như sau:
- Theo định lý Euler, ta có: $N^{\frac{P - 1}{2}} \  \% \  P = 1$.
- Nhân cả hai vế với $N$: 
$$N^{\frac{P + 1}{2}} \ \% \ P = N \ \% \  P \ (1)$$

- Lại có:  $x^2 \equiv N \ (\text{mod} \ P)$.
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$\Leftrightarrow x^2 \equiv N^{\frac{P+1}{2}} \ (\text{mod} \ P)$ (do đẳng thức $(1)$).
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$\Leftrightarrow x^2 \equiv N^{2i + 2} \ (\text{mod} \ P)$ (do $N=4i + 3$).
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$\Leftrightarrow x \equiv \ N^{i + 1} \ (\text{mod} \ P)$.
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$\Leftrightarrow x \equiv \pm \ N^{\frac{P + 1}{4}} \ (\text{mod} \ P)$ (do $P=4i + 3$).

***Cài đặt:***

```cpp=
int find_quadratic_residue(int N, int P)
{
    // P và N không ở đúng dạng 4i + 3, không tính được theo cách này.
    if (P % 4 != 3 || N % 4 != 3)
        return -1;
            
    int x = power_mod(N, (P + 1) / 2, P);

    // Kiểm tra giá trị x thứ nhất có hợp lệ không.
    if ((x * x) % P == N % P)
        return x;

    // Kiểm tra giá trị x thứ hai có hợp lệ không.
    x = P - x;
    if ((x * x) % P == N % P)
        return x;

     // Nếu không tồn tại x, kết luận N không phải thặng dư bậc 2 của P
    return -1;
}
```

# IV. Tài liệu tham khảo

- [https://en.wikipedia.org/wiki/Quadratic_residue](https://)
- [https://en.wikipedia.org/wiki/Euler%27s_criterion](https://)
- [https://vnoi.info/wiki/translate/he/So-hoc-Phan-1-Modulo-gcd.md](https://)
- [https://vnoi.info/wiki/algo/math/modular-inverse.md](https://)
- [https://en.wikipedia.org/wiki/Modular_multiplicative_inverse](https://)
- [https://en.wikipedia.org/wiki/Multiplicative_order](https://)
- [https://vi.wikipedia.org/wiki/%C4%90%E1%BB%8Bnh_l%C3%BD_Euler](https://)
- [https://www.geeksforgeeks.org/find-square-root-under-modulo-p-set-1-when-p-is-in-form-of-4i-3/](https://)