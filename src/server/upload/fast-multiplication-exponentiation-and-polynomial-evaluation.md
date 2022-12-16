Đây là một bài trong series [Algorithms](https://viblo.asia/s/algorithms-ten-series-phai-it-nhat-15-chu-JzKmg8wEl9N).

# Mở bài
Chào mừng các bạn đến với bài tiếp theo trong series các thuật toán :D Thuật toán này được sử dụng khá nhiều trong cả competitive programming lẫn cryptography, nên các bạn có đam mê chơi Viblo Code hay CTF đều nên đọc nhé!

Không chần chừ gì nữa, chúng ta vào bài thôi!

# Multiplication vs. Exponentiation vs. Polynomial Evaluation
3 thuật toán này có liên quan mật thiết tới nhau, và cái sau là phiên bản nâng cao của cái trước. Để tính nhanh, chúng ta sẽ sử dụng *binary representation* của các phần tử. Chúng ta bắt đầu từ phép nhân nhé: giả sử chúng ta có $123 \times 456$, chúng ta có thể biểu diễn dưới dạng sau: do $123 = 0b1111011$
$$
\begin{alignedat}{2}
123 \times 456 =& (2^0 + 2^1 + 2^3 + 2^4 + 2^5 + 2^6) \times 456\\
=& 456 \times 2^0 + 456 \times 2^1 + 0\times 2^2 + 456 \times 2^3 + 456 \times 2^4 + 456 \times 2^5 + 456 \times 2^6
\end{alignedat}
$$

Để chuyển từ phép nhân qua phép mũ, chúng ta chỉ cần thay $+$ bằng $\times$ và $\times$ bằng $^$:
$$
\begin{alignedat}{2}
456^{123} =& 456^{2^0 + 2^1 + 2^3 + 2^4 + 2^5 + 2^6}\\
=& 456^{2^0} \times 456^{2^1} \times 456^{2^3} \times 456^{2^4} \times 456^{2^5} \times 456^{2^6}
\end{alignedat}
$$

Từ công thức nhân, nếu bây giờ chúng ta thay đổi exponent $2$ bằng đơn thức $x$:

$$
456 \times x^0 + 456 \times x^1 + 0\times x^2 + 456 \times x^3 + 456 \times x^4 + 456 \times x^5 + 456 \times x^6
$$

Và nếu mỗi một đơn thức có một hệ số khác nhau:

$$
a_0x^0 + a_1x^1 +a_2x^2+ a_3x^3 + a_4x^4 + a_5x^5 + a_6x^6
$$

Các bạn đã thấy mối liên quan chưa? Giờ chúng ta đến phần thuật toán nhé.

# Lower-order to higher-order
Đơn giản là chúng ta tính từ trái sang phải trên công thức trên, và phải sang trái theo binary representation. Ở phép nhân, thuật toán này được gọi là [Russian Peasant method](https://en.wikipedia.org/wiki/Ancient_Egyptian_multiplication) (hay còn gọi là shift-and-add): với $456=0b111001000$

```
         1111011
     x 111001000
----------------
         0000000
        0000000
       0000000
      1111011
     0000000
    0000000
   1111011
  1111011
 1111011
----------------
1101101100011000
```

Implement thuật toán này khá đơn giản:
```python
def russian_peasant(x, y):
    result = 1
    power = 1
    while y:
        last_bit = y & 1
        if last_bit:
            result += power
        power <<= 1
        y >>= 1
    return result
```

Từ code trên chúng ta có thể tạo phiên bản cho hàm mũ, thuật toán này được gọi là [exponentiation-by-squaring](https://en.wikipedia.org/wiki/Exponentiation_by_squaring):
```python
def exp_by_sqr(x, e):
    result = 1
    power = 1
    while e:
        last_bit = e & 1
        if last_bit:
            result *= power
        power *= x
        y >>= 1
    return result
```

Và phiên bản để tính giá trị của một polynomial:
```python
def eval_polynomial(coeffs, x):
    # coeffs goes from lower-order to higher-order, some may be 0
    result = 0
    power = 1
    for coeff in coeffs:
        result += power * coeff
        power *= x
    return result
```

# Higher-order to lower-order
Nếu chúng ta có thể làm xuôi, chúng ta có thể làm ngược :) Có lẽ dễ nhất để hiểu thì mình sẽ giới thiệu luôn từ đầu phiên bản dành cho đa thức, và từ đó mọi người có thể tự làm ra phiên bản cho nhân và mũ:

$$
\begin{alignedat}{2}
f(x) =& a_0x^0 + a_1x^1 +a_2x^2+ a_3x^3 + a_4x^4 + a_5x^5 + a_6x^6\\
=& a_0 + x\times(a_1 + x\times(a_2 + x\times(a_3 + x\times(a_4 + x\times(a_5 + x\times a_6)))))
\end{alignedat}
$$

Phương pháp này được gọi là [Horner's method](https://en.wikipedia.org/wiki/Horner%27s_method).

Giờ chúng ta viết code cho tính giá trị của polynomial trước:
```python
def horners_method(coeffs, x):
    # coeffs goes from lower-order to higher-order, some may be 0
    result = 0
    for coeff in coeffs[::-1]:
        result = result * x + coeff
    return result
```

Như các bạn có thể thấy, lần này chúng ta chỉ cần lưu có mỗi kết quả thôi. Thuật toán này sẽ có lợi cho các phần cứng, khi chúng ta phải sử dụng tối thiểu bộ nhớ.

Giờ chúng ta sẽ sửa thuật toán trên cho phép nhân:
```python
def fast_mult(x, y):
    result = 0
    for bit in bin(y)[2:]:
        result = result * 2 + int(bit) * x
    return result
```

Và thuật toán cho phép mũ:
```python
def fast_exp(x, y):
    result = 1
    for bit in bin(y)[2:]:
        result = result * result * x ** int(bit)
    return result
```

### *Bonus:* Montgomery's Ladder
Trong một số trường hợp, chúng ta cần phép nhân phải mất lượng thời gian giống nhau không phụ thuộc vào đầu vào - ví dụ như trong mật mã, chúng ta có thể dùng timing attack (một loại side-channel attack) để biết được đầu vào là gì: nếu phép toán kết thúc nhanh hơn thì chúng ta biết bit đó là 0 và ngược lại. Để tránh tình trạng này, chúng ta sử dụng một phiên bản khác của thuật toán trên gọi là [Montgomery's ladder](https://en.wikipedia.org/wiki/Exponentiation_by_squaring#Montgomery's_ladder_technique):

```python
def montgomerys_ladder(x, e):
    result = x
    accumulator = x * x
    for bit in bin(e)[3:]:
        if bit == '0':
            accumulator *= result
            result *= result
        else:
            result *= accumulator
            accumulator *= accumulator
    return result
```

Trong thuật toán Montgomery's ladder, biến `result` sẽ lưu kết quả mũ $x^{e'}$ của iteration đó giống như thuật toán gốc, và biến `accumulator` sẽ luôn lưu $x^{e'+1}$. Nếu như bit tiếp theo là 0, `result` sẽ mũ 2 lên, và nếu bit tiếp theo là 1 thì `result = result * accumulator = result * result * x`, giống như thuật toán gốc. Các bạn có thể viết ra để xem: với exponent là $10 = 0b1010$:

```
                   1        0        1        0
 e (so far)      0b1     0b10    0b101   0b1010
     result        1        2        5       10
accumulator        2        3        6       11
```

Để ý rằng $e$ luôn bằng với số mũ của `result`, và số mũ của `accumulator` luôn hơn `result` là 1.
# Kết bài
Hãy để ý rằng những thuật toán này có thể sử dụng với bất cứ một field/ring nào. Đồng nghĩa với việc, bạn có thể sử dụng nó khi nhân ma trận, mũ ma trận, với các field extension, elliptic curve calculation, functional calculus, v.v. khả năng là vô hạn.

Bài này thực ra không nhiều lý thuyết nên toàn công thức với code là chính, các bạn thông cảm :-j