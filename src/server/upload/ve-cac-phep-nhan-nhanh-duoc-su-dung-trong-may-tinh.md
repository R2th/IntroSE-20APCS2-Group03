Đây là một bài trong series [Algorithms](https://viblo.asia/s/algorithms-ten-series-phai-it-nhat-15-chu-JzKmg8wEl9N).
# Mở bài
Chào các bạn, mình lại bắt đầu một series mới không liên quan gì đến chuyên ngành :D Lần này là các thuật toán nhân nhanh được sử dụng trong (phần cứng/mềm) máy tính nhé :) Không chần chừ gì nữa, hãy vào bài thôi!

*Bài này có liên quan đến một bài rank S trong Viblo Code nhé ;)*

# Thuật toán nhân cổ điển
Bình thường bạn nhân các số như thế nào? Ví dụ như 123 x 456? Như chúng ta được học ở trên trường, thì phải nhân dần các chữ số, rồi cộng lại theo cột đúng không?
```
  123
x 456
-----
  738
 615
492
-----
56088
```
Trong đó, tạm coi phép nhân từng chữ số có thể được coi là phép cộng. Coi phép cộng là đơn vị cơ bản, chúng ta có thể thấy thuật toán này sử dụng $4+5+6+2=17$ phép tính toán. Tạm thời bỏ qua các tối ưu liên quan đến caching trong lúc cộng dồn nhé.

Bây giờ để tránh việc phải nhân các số đơn kia, chúng ta chuyển sang tính dưới dạng nhị phân:
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
Ở đây chúng ta mất 9 phép cộng. Trong trường hợp xấu nhất, chúng ta cần cộng $O(n)$ (chú ý rằng khi tính asymptotic complexity chúng ta tính với kích cỡ bài toán/số bit của đầu vào nhé). Vậy có cách nào nhân nhanh hơn không?

# Thuật toán Karatsuba
Thuật toán này thực ra rất đơn giản. Là một dạng divide-and-conquer, Karatsuba chia nhỏ bài toán của chúng ta ra để tính lẻ:
$$
\begin{alignedat}{2}
& \mathbf{1111011 \times 111001000} \\
= & (1100000 + 11001) \times (111000000 + 1000) \\
= & 100000\times 100000 \times \mathbf{11 \times 1110} + 100000 \times \mathbf{11 \times 1000} + 100000  \times \mathbf{11001 \times 1110} + \mathbf{11001 \times 1000}
\end{alignedat}
$$

Chú ý công thức trên đang ở hệ nhị phân, và các số $0b100000=2^5$ sinh ra khi chúng ta rightshift higher-order bits của các thừa số. Từ một phép nhân 2 số 9-bit, chúng ta ra được 4 phép nhân 2 số 5-bit kèm 3 phép cộng. Điểm hay ở thuật toán này là chúng ta có thể sử dụng đệ quy và tiếp tục dùng Karatsuba cho các phép toán nhỏ hơn! Cứ như vậy chúng ta sẽ chỉ còn ra các phép cộng, và phép cộng thì nhanh hơn phép nhân (duh.)

Thuật toán này còn có thể tối ưu hơn nữa. Không dùng số nữa mà thay bằng chữ cho ngắn, ta có:
$$
\begin{alignedat}{2}
& (x_1 \times p + y_1) \times (x_2 \times p + y_2)\\
=& \mathbf{x_1\times x_2}\times p^2 + \mathbf{y_1\times y_2} + (\mathbf{(x_1 + y_1) \times (x_2+y_2)} - x_1 \times x_2 - y_1 \times y_2)\times p
\end{alignedat}
$$
Với công thức mới này chúng ta chỉ phải sử dụng 3 phép nhân và 6 phép cộng.

Vậy độ phức tạp của thuật toán này là gì? Tạm bỏ qua các phép cộng (hì), cứ mỗi lần chia đôi kích cỡ bài toán số lần nhân bị gấp 3. Từ đó số phép toán của chúng ta là

$$
\sum_{i=0}^{\log_2(l(n))-1}3^i=\frac{1}{2}(3^{\log_2l(n)}-1)=\frac{1}{2}(3^{\log_23\times\log_3l(n)}-1)=\frac{1}{2}(l(n)^{\log_23}-1)=O(l(n)^{\log_23}).
$$

#### Nhưng mà từ từ bạn ơi, thuật toán cơ bản kia tuyến tính với kích cỡ đầu vào mà, cái này là polynomial-time rồi???

Đúng là thuật toán cơ bản kia (có tên gọi là [shift-and-add](https://en.wikipedia.org/wiki/Multiplication_algorithm#Shift_and_add)) nhanh hơn Karatsuba thật. Tuy nhiên, bây giờ chúng ta sẽ gian lận và thay đổi bài toán một tí nhé: thay vì chỉ nhân 2 số, chúng ta cần nhân 2 đa thức thì sao? Thay hệ thập phân $10^i$ bằng các đơn thức $x^i$, ta có bài toán mới:

$$
\begin{alignedat}{2}
&(x^2 + 2x + 3) \times (4x^2 + 5x + 6)\\
=&\mathbf{1\times 4}\times x^4 + \mathbf{1\times 5}\times x^3 + \mathbf{1\times 6}\times x^2 + \mathbf{2\times 4}\times x^3 + \mathbf{2\times 5}\times x^2 + \mathbf{2\times 6}\times x^3 + \mathbf{3\times 4}\times x^2 + \mathbf{3\times 5}\times x + \mathbf{3\times 6}.
\end{alignedat}
$$

Bùm, ngay lập tức thế trận khác ngay. Do không còn là số nữa, bạn không thể sử dụng shift-and-add, mà phải phá tung phép nhân ra như thế này. Coi phép nhân số là phép toán cơ bản, cách tính trên mất $n^2$ phép toán, trong khi sử dụng Karatsuba bạn chỉ mất $n^{1.58}$ thôi.

#### Ơ thế bạn đổi bài toán rồi thì còn nói làm gì nữa???
Vấn đề là nhiều lúc bài toán nhân của bạn sẽ phải làm với các số rất lớn. Bình thường kết quả nhân của các bạn có thể vừa một biến 64-bit, thì shift-and-add nhanh là đúng rồi. Thế nếu bây giờ các số của bạn rất lớn thì sao? Ví dụ, khi sử dụng thuật toán RSA trong mã hóa, mỗi số nguyên tố thường là một số 4096-bit, và nhân 2 số như thế với nhau thì chắc chắn là mệt :) Những số to như vậy sẽ được lưu ở nhiều địa chỉ khác nhau (mỗi địa chỉ chứa một giá trị 64-bit), và phép toán xuyên các địa chỉ trong bộ nhớ sẽ tốn thời gian và không gian. Thay vào đó, chúng ta sử dụng thuật toán Karatsuba trên với $x=2^{64}$ và các coefficient là các giá trị được lưu trong từng địa chỉ đó.

#### Rồi tạm chịu, vậy phép nhân đa thức còn được dùng để làm gì nữa?
Phép nhân đa thức được sử dụng khá nhiều đó nhé :D Ví dụ như trong vật lý/3D modeling trong các game bạn hay chơi chẳng hạn, các particle/model di chuyển theo các đa thức trên hệ trục tọa độ. Hay trong các hệ mật mã (một phần khác mà mình hay tìm hiểu), các đa thức được sử dụng khá nhiều (như RSA có khá nhiều thuật toán phá sử dụng polynomial, hay elliptic curve sử dụng finite field extensions). Nói chung là nhiều lắm.

# Thuật toán Fast Fourier Transform
**Chú ý: RẤT NHIỀU TOÁN!**

Có một thuật toán nhân khác còn nhanh hơn Karatsuba nữa, và nó sử dụng một thuật toán bạn có thể không ngờ tới: đó là **Fast Fourier Transform**! Thuật toán này sử dụng các phép biến đổi trong một [Ring](https://en.wikipedia.org/wiki/Ring_(mathematics)) để tăng tốc độ tính toán.

### Ring là gì?
Đơn giản thì ring $R$ là một tập hợp các số (có thể vô hạn) và 2 phép toán, tạm gọi là $+$ và $\times$, thỏa mãn khá nhiều tính chất sau đây:
- Tồn tại các identity $i_+, i_\times\in R$ cho các phép toán: với mọi $x\in R$:
    - $i_+ + x = x+ i_+ = i$
    - $i_\times \times x = x\times x_\times = x$
- Cả 2 phép tính có tính kết hợp: với mọi $x, y, z\in R$:
    - $x + (y + z) = (x + y) + z$
    - $x\times (y \times z) = (x\times y)\times z$
- Phép cộng có tính giao hoán và nghịch đảo: với mọi $x, y\in R$:
    - $x + y = y + x$
    - $\exist -x:x + -x = 0$
- Có tính phân phối: với mọi $x, y, z\in R$:
    - $x\times(y+z) = x\times y + x\times z$
    - $(x + y)\times z = x\times z + y \times z$

Các số có multiplicative inverse trong một ring được gọi là *unit*. Ngoài ra, các số $x\in R|\exists x': x\times x'=0$ được gọi là *zero-divisors* trong R.

Chúng ta có thể thấy rằng tập số nguyên $\mathbb{Z}$ hay tập số thực $\mathbb{R}$ đều là các trường hợp đặc biệt của một Ring.

### Integers modulo a prime
Tuy nhiên, nếu làm trong tập số nguyên thì không nhanh được :D Chúng ta sẽ sử dụng ring $\mathbb{Z}/p\mathbb{Z}=\{0, 1, \dots,p-1\}$ với các phép toán modulo. Ví dụ, trong $\mathbb{Z}/5\mathbb{Z}$, thì $2+4 = 1$, và $2 \times 4 = 3$ (do sử dụng modulo 5).

Lựa chọn số nguyên tố nào cho bài toán này? Thực ra bạn có thể chọn bất cứ số nguyên tố nào lớn hơn kích cỡ bài toán, thì kết quả của phép toán sẽ không đổi: ví dụ như trong $\mathbb{Z}/11\mathbb{Z}$, thì $2\times 4=8$ giống như phép nhân trong $\mathbb{Z}$.

Tuy nhiên, để dễ dàng chúng ta có thể chọn **Fermat prime**: đó là các số nguyên tố có dạng $p=2^{2^n}+1$. Một ví dụ là khi $n=4$, khi đó $p=17$. Tại sao?

### Primitive root of unity
$\omega$ là một $n$-th root of unity trong ring $R$ nếu $\omega^n=1$. Ngoài ra, $\omega$ là một *primitive* root of unity nếu:
- $\omega^n=1$
- $n\in R$ là một unit (tồn tại multiplicative inverse)
- Với mọi ước nguyên tố $t$ của $n$, $\omega^{n/t}-1$ khác 0 và không phải một zero-divisor.

Để sử dụng thuật toán FFT, chúng ta cần một primitive $2^k$-th root of unity với $2^k$ lớn hơn bậc của kết quả phép nhân. Với Fermat prime, tất cả các số trong ring đó đều là $2^{p-1}$-th ring of unity theo định lý Fermat nhỏ (không phải primitive!) Còn nếu muốn tìm primitive root thì chắc chỉ có cách mò/tìm các số có sẵn trên mạng :(

### Discrete Fourier Transform
DFT là một $R$-linear mapping $\mathrm{DFT}_\omega:R^n\rightarrow R^n$ tính các giá trị của đa thức $f$ tại các giá trị mũ của $\omega$:
$$
f\rightarrow (f(1), f(\omega), \dots, f(\omega^{n-1}))
$$

Chúng ta có thể biểu diễn phép biến đổi tuyến tính này bằng phép toán ma trận: với $f=a_0 + a_1x+\dots a_{n-1}x^{n-1}$,
$$
\mathrm{DFT}_\omega(f)=
\begin{bmatrix}
\omega^0 & \omega^0 & \dots & \omega^0 \\
\omega^0 & \omega^1 & \dots & \omega^{n-1} \\
\vdots & \vdots & \ddots & \vdots \\
\omega^0 & \omega^{n-1} & \dots & \omega^{(n-1)^{n-1}}
\end{bmatrix}
\begin{bmatrix}
a_0 \\ a_1 \\ \vdots \\ a_{n-1}
\end{bmatrix}
$$

Trong đó ma trận to đùng bên trái được gọi là Vandemonde matrix $\mathrm{VDM}(\omega)$.

Để tính Inverse DFT, chúng ta chỉ cần nhân với nghịch đảo của nó:
$$
\mathrm{VDM}(\omega)^{-1}=\frac{1}{n}\mathrm{VDM}(\omega^{-1})
$$
Cách tìm nghịch đảo của 1 số modulo thì sử dụng Extended Euclidean Algorithm, các bạn có thể đọc tại [đây](https://viblo.asia/p/extended-euclidean-algorithm-cach-tinh-uoc-chung-lon-nhat-va-nghich-dao-modulo-maGK7GAaKj2).

### Tích chập của 2 đa thức
Xin lỗi người đọc vì mấy đoạn này khá khô khan :( Với 2 đa thức $f(x) = \sum_{i=0}^{n-1}f_ix^i$ và $g(x) = \sum_{i=0}^{n-1}g_ix^i$, chúng ta có $f *_n g = h(x) = \sum_{i=0}^{n-1}h_ix^i$ với
$$
h_l = \sum_{j+k\equiv l \mod n}f_jg_k = \sum_{j=0}^{n-1}f_jg_{l-j}
$$

Từ công thức trên, chúng ta có thể thấy $f*_n g\equiv f\times g\mod x^n-1$, chứng minh để dành cho bạn đọc :P Vì vậy, do chúng ta đã đặt $n$ là bậc của kết quả, nên $f*_ng=f\times g$.

**Chú ý quan trọng!** Một tính chất quan trọng của DFT mà sẽ giúp chúng ta là:

$$
\mathrm{DFT}_\omega(f*_n g)=\mathrm{DFT}_\omega(f)\cdot\mathrm{DFT}_\omega(g)
$$

trong đó $\cdot$ là elementwise multiplication.

### Ghép tất cả mọi thứ lại...
Từ 2 đa thứ $f,g$, chúng ta làm các bước đơn giản sau:
$$
f\times g = \mathrm{IDFT}(\mathrm{DFT}(f) \cdot \mathrm{DFT}(g))
$$

Vậy độ phức tạp của thuật toán này là gì?
- Bước tích chập: tổng $n$ tích là $O(n)$
- Bước elementwise multiplication 2 kết quả DFT: $n$ phép nhân là $O(n)$
- DFT và IDFT: 2x rất lâu :( ($O(n^2)$).

Vậy thì bằng với nhân bình thường rồi... Nhưng đừng quên chúng ta có FFT!

### Fast Fourier Transform
Phát minh bởi Cooley-Tukey, thuật toán này được sử dụng với các polynomial có bậc là $2^n$ bằng phương pháp divide-and-conquer. Chúng ta chia nhỏ đa thức $f$ thành 2 đa thức nhỏ hơn, nhưng khác với Karatsuba, chúng ta cắt so le:

$$
\begin{alignedat}{2}
f =& a_0 + a_1x + \dots + a_{2^k-1}x^{2^k-1} \\
=&a_0 + a_2x^2 + \dots + a_{2^k-2}x^{2^k-2} + \\
&a_1x + a_3x^3 + \dots + a_{2^k-1}x^{2^k-1} \\
=&f_0(x^2) + xf_1(x^2)
\end{alignedat}
$$

Có thể thấy $f_0$ và $f_1$ đều là các đa thức bậc $2^{k-1}$. Chúng ta sẽ đệ quy tính FFT của các hàm đó rồi ráp lại: với

$$
\mathrm{FFT}(f_0) = [c_0, c_1, \dots, c_{2^{k-1}-1}]
$$

và

$$
\mathrm{FFT}(f_1) = [d_0, d_1, \dots,d_{2^{k-1}-1}]
$$

Chúng ta ra được kết quả cuối

$$
\mathrm{FFT}(f) = [b_0, b_1, \dots, b_{2^k-1}]
$$
bằng công thức:
$$
b_k = c_k + \omega^kd_k,\;
b_{n+k}=c_k - \omega^kd_k; \;\forall 0\le k< n
$$

Phép cộng và trừ kia còn được gọi là *butterfly*, vì 2 phép tính kia chéo nhìn giống cánh bướm. Bạn có thể nhìn hình tượng cánh bướm ở dưới đây (cẩn thận xem xong quên luôn cả bài, lần đầu tiên mình nhìn cái ảnh này mình thấy hết hiểu tất cả những gì thầy vừa dạy luôn):

![](https://www.researchgate.net/profile/Varun-Gopi/publication/312460770/figure/fig1/AS:634742743523328@1528345871210/Radix-2-butterfly-diagram-for-8-point-FFT_W640.jpg)

<div align="center"><sup>Cánh bướm bay luôn hết kiến thức</sup></div>

Vậy độ phức tạp của thuật toán này là gì? Có $\log n$ bước đệ quy, và ở mỗi bước có $2^i$ phép FFT con, mỗi phép cần $O(n)/2^i$ phép toán. Nhân nhân cộng cộng lại chúng ta có độ phức tạp của thuật toán này là $O(n\log n)$.

Để ý rằng độ phức tạp của toàn bộ phép nhân này bị dominated bởi DFT/FFT (2 bước kia đều nhanh hơn FFT), nên độ phức tạp của thuật toán nhân đa thức này bằng độ phức tạp của FFT.

*Fun fact:* độ phức tạp này chỉ đúng khi chúng ta nhân các số nguyên, còn nếu nhân số thực thì thực tế là $O(n\log n\log\log^2n)$; nếu bạn muốn tìm hiểu thêm tại sao, hay đọc thêm tại [link này](http://numbers.computation.free.fr/Constants/Algorithms/fft.html) nhé.

### Bonus
Thuật toán này ngoài việc có asymptotic complexity thấp hơn Karatsuba, còn có 1 điểm cộng: chúng ta có thể dễ dàng tính mũ của một đa thức rất nhanh, bằng cách trong quá trình elementwise multiplication, chúng ta thay bằng elementwise exponentiation. Hàm mũ của một số có thể tính nhanh bằng [phương pháp cứ bình phương rồi nhân lại với nhau](https://viblo.asia/p/RQqKLGqr57z), gần giống với phương pháp shift-and-add :)

Bạn có thể tham khảo implementation của FFT tại [đây](https://cp-algorithms.com/algebra/fft.html), mình copy từ đây trong bài Viblo Code của mình :">

# Kết bài
Bây giờ bạn đã biết nhân các đa thức nhanh như thế nào rồi đó! Đi làm câu rank S kia đi ;)

Thực ra lĩnh vực này khá liên quan đến deep learning, không biết viết xong bài này mình có nghĩ ra gì hay ho không?

And last but not least, thank you Dr. Turner for teaching me this crap, tolerated me fucking up spectacularly in your class, and still give me an A and a distinction in Math. You're the man.