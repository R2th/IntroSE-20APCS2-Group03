Đây là một bài trong series [Algorithms](https://viblo.asia/s/algorithms-ten-series-phai-it-nhat-15-chu-JzKmg8wEl9N).

# Mở bài
Chào mừng các bạn đến với bài tiếp theo trong series các thuật toán :D Thuật toán này được sử dụng khá nhiều trong cả competitive programming lẫn cryptography, nên các bạn có đam mê chơi Viblo Code hay CTF đều nên đọc nhé!

Không chần chừ gì nữa, chúng ta vào bài thôi!

# Cách tìm ước chung lớn nhất bằng Euclidean Algorithm

Với $g=\gcd(x,y)$, chúng ta có $g|x$ và $g|y$. Điều đó dẫn tới $g|x-y$, và chúng ta có một thuật toán cơ bản (nhưng chậm):

```python
def gcd_naive(x, y):
    while True:
        if x < y:
            x, y = y, x
        if y == 0:
            return x
        x, y = x - y, y
```

Để ý rằng chúng ta đang trừ $y$ khỏi $x$ cho đến lúc $x < y$ - phép toán này tương đương với việc tìm số dư của $x$ chia $y$. Từ đó, chúng ta có được thuật toán Euclidean để tìm GCD:

```python
def gcd(x, y):
    while y:
        x, y = y, x % y
    return x
```

Chú ý rằng đầu vào của thuật toán này phải là số nguyên không âm nhé! Ngoài ra, nếu bạn sử dụng Python 3.8 trở lên, bạn có thể import luôn hàm này từ module `math`:

```python
from math import gcd
```

# Cách tìm nghịch đảo modulo bằng Extended Euclidean Algorithm
Hàm trên đơn giản và dễ hiểu, nhưng nó chỉ tìm được ước chung lớn nhất. Để tìm được nghịch đảo modulo của một số, chúng ta cần một phiên bản nặng ký hơn, tên là Extended Euclidean Algorithm.

Với $x$ và $y$ nguyên tố cùng nhau ($\gcd(x,y)=1$), luôn tồn tại nghịch đảo $x^{-1}$ của $x$ modulo $y$:

$$
xx^{-1} \equiv 1 \mod y
$$

Công thức trên tương đương với: tồn tại $b$ sao cho

$$
x\times x' + y\times b= 1
$$

Bài toán đó là kết quả thuật toán Extended Euclidean Algorithm: cho $x$ và $y$, thuật toán sẽ tìm ra các giá trị $a,b,c$ sao cho

$$
x\times a + y\times b= c
$$

với $c=\gcd(x, y)$. Bạn có thể thấy tại sao nó lại là phiên bản nâng cao rồi đó: ngoài việc tìm ra $c$, nó còn lưu lại các trọng số liên quan. Nếu $c=1$, chúng ta có thể thấy công thức đó giống công thức ở trên, nghĩa là $a$ sẽ là nghịch đảo của $x$ modulo $y$; và tương tự $b$ sẽ là nghịch đảo của $y$ modulo $x$.

Giải thích vậy nhiều rồi, chúng ta đi thẳng vào thuật toán nhé: điểm khác nhau của EEA so với phiên bản thông thường là ở mỗi bước, thuật toán này lưu các trọng số tương ứng với *input* sao cho tổng tuyến tính đó bằng giá trị modulo hiện tại. Có lẽ giải thích thế này hơi khó hiểu, nên ví dụ sẽ dễ hơn nhé:

Cho $x = 50$ và $y=21$. Ban đầu chúng ta có:

$$
\begin{alignedat}{2}
50 =& 1\times 50 + 0 \times 21 \\
21 =& 0\times 50 + 1 \times 21
\end{alignedat}
$$

Tương tự với thuật toán Euclidean cơ bản, ta tìm số dư của $x$ chia $y$, tuy nhiên bây giờ chúng ta phải keep track những trọng số trên: vì $50=21\times 2+8$, chúng ta update công thức trên:

$$
\begin{alignedat}{2}
8 =& 50 - 21 \times 2 \\
=& (1\times 50 + 0 \times 21) - 2\times (0\times 50 + 1 \times 21) \\
=& (1 - 2\times 0)\times 50 + (0 - 2 \times 1) \times 21 \\
=& 1 \times 50 - 2\times 21
\end{alignedat}
$$

Từ đó chúng ta update những giá trị cần lưu:

$$
\begin{alignedat}{2}
21 =& 0\times 50 + 1 \times 21 \\
8 =& 1 \times 50 - 2\times 21
\end{alignedat}
$$

Tiếp tục lấy modulo của 2 giá trị mới: do $21=8\times 2 + 5$:

$$
\begin{alignedat}{2}
5 =& 21 - 8 \times 2 \\
=& (0\times 50 + 1 \times 21) - 2\times (1 \times 50 - 2\times 21) \\
=& (0 - 2\times 1)\times 50 + (1 - 2 \times -2) \times 21 \\
=& -2 \times 50 + 5\times 21
\end{alignedat}
$$

Và update các trọng số:

$$
\begin{alignedat}{2}
8 =& 1 \times 50 - 2\times 21 \\
5 =& -2\times 50 + 5\times 21
\end{alignedat}
$$

Cứ tương tự như vậy, qua các bước tiếp theo chúng ta có tiếp:

$$
\begin{alignedat}{2}
3 =& 3\times 50 + -7 \times 21 \\
2 =& -5 \times 50 + 12\times 21 \\
1 =& 8 \times 50 - 19\times 21
\end{alignedat}
$$

Do $2\%1=0$ nên thuật toán sẽ dừng ở đây. Từ kết quả này, chúng ta có:
- $\gcd(50, 21) = 1$
- $50^{-1} \mod 21 = 8$
- $21^{-1} \mod 50 = 31$, do $-19 \equiv 31\mod 50$.

Đơn giản, phải không? Từ đó ta viết thuật toán đầy đủ:

```python
def eea(x, y):
    x_c1, x_c2 = 1, 0
    y_c1, y_c2 = 0, 1
    while True:
        # get quotient and remainder
        q, r = divmod(x, y)
        # if found GCD, return
        if r == 0:
            return y_c1, y_c2, y
        # else, keep track
        x_c1, x_c2, y_c1, y_c2 = y_c1, y_c2, \
            x_c1 - q * y_c1, x_c2 - q * c_2
        x, y = y, r
```

Ngoài ra, nếu bạn dùng Python 3.8+, hàm có sẵn `pow` có thể được sử dụng để tính nghịch đảo modulo:

```python
assert 8 == pow(50, -1, 21) and 31 == pow(21, -1, 50)
```

Vài điểm cần lưu ý khi dùng hàm builtin này:
- Đầu vào đều phải là các số nguyên có dạng `int`
- **Không** được import `pow` từ module `math`. Tuy nhìn nhanh có vẻ giống nhau nhưng `math.pow` không hỗ trợ gì các phép toán mũ số nguyên trong modulo cả.

# Bonus
Trong trường hợp bạn có các ước của modulo (ví dụ như nếu modulo là số nguyên tố, một trường hợp hay gặp phải), bạn có thể sử dụng định lý Fermat nhỏ để tìm nghịch đảo. Chúng ta có

$$
x^\varphi(n)\equiv 1\mod n
$$

Từ đó, đơn giản chúng ta tìm nghịch đảo bằng cách

$$
x^{\varphi(n)-1}\equiv x^{-1}\mod n
$$

Trong đó, [Euler's phi](https://en.wikipedia.org/wiki/Euler%27s_totient_function) có thể tính theo công thức sau: nếu $n$ có phân tích thừa số nguyên tố là

$$
n = \Pi_ip_ie^i
$$

thì

$$
\varphi(n)=\Pi_i(p_i-1)p_i^{e_i-1}
$$

Còn để tính nhanh mũ thì chúng ta có thể sử dụng phương pháp [exponentiation-by-squaring](https://viblo.asia/p/RQqKLGqr57z) nhé :)

# Kết bài
Có vẻ như Python 3.8+ đã giải quyết hết các vấn đề rồi nhỉ? :( Với những phiên bản/ngôn ngữ lập trình khác, bạn có thể theo hướng dẫn này để tự viết một hàm EEA cho riêng mình nhé! Good luck, and have fun B-)