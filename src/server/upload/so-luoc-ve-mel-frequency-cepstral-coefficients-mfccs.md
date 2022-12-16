# Giới thiệu
MFCC là một cách để trích xuất các đặc trưng (feature extraction) giọng nói (speech) thường được sử dụng trong các model nhận dạng giọng nói (Automatic Speech Recognition) hay phân loại giọng nói (Speech Classification). Đúng như tên gọi của nó, MFCC sẽ cho ra kết quả là các **hệ số** (coefficients) của **cepstral** (từ này mình không biết dịch sao hết) từ **Mel** filter trên phổ lấy được từ các file âm thanh chứa giọng nói.
# Nguyên lý hoạt động
Giọng nói thì thường sẽ được biểu diễn dưới dạng hai chiều $(x, y)$ với $x$ là thời gian (time) theo miliseconds (ms) và $y$ là amplitude (dịch ra là biên độ). Trong đó những giá trị trên $y$ được sinh ra trực tiếp từ bộ thu âm, do đó người ta thường gọi là **speech signal**.

![](https://images.viblo.asia/cf25b11f-537b-417a-b9bc-d10586817e1f.png)

Đầu tiên, ta sẽ biến đối **speech signal** thành *âm phổ* (hay còn gọi là **spectrum**) bằng cách áp dụng **Fast Fourier Transform**, mình sẽ không giải thích giải thuật này, các bạn có thể xem khái niệm ở [wikipedia](https://en.wikipedia.org/wiki/Fast_Fourier_transform).

![](https://images.viblo.asia/85feddd5-8e06-4d90-a38e-833505ae759f.png)

Kết quả của việc biến đổi này, tức là **spectrum**, được biểu diễn dưới dạng hai chiều $(x', y')$ với $x'$ là tần số (Hz) và $y'$ là cường độ (dB).

![](https://images.viblo.asia/b39782df-1de7-459c-85cc-03c327c22ec3.png)

Ở hình trên, các điểm màu đỏ được gọi là **Formants**, là nơi có các tần số áp đảo (dominant), mang đặc tính của âm thanh. Đường màu đỏ gọi là **Spectral Envelopes**. Mục tiêu chính của ta là lấy được đường màu đỏ này.

Gọi **spectrum** là $X[k]$ có hai thành phần là **spectral envelopes** $H[k]$ và **spectral details** $E[k]$

![](https://images.viblo.asia/d11f13fd-b123-4df1-8148-71dbb7d66f17.png)

Để tách được $H[k]$, ta cần phải lấy *logarithm* của *spectrum* và lấy phần ở tần số thấp (low frequency):

$$
\begin{aligned}
    X[k] &= H[k] * E[k] \\
    \Leftrightarrow log(X[k]) &= log(H[k]) + log(E[k])
\end{aligned}
$$

Người ta thấy rằng tai người hoạt động như một bộ lọc, chỉ tập trung vào một phần thay vì hết cả **spectral envelopes**. Thế là một bộ lọc lấy ý tưởng này ra đời, gọi là **Mel-Frequency Filter**:

![](https://images.viblo.asia/5d192bd0-2206-4ce5-aef0-ab8056895848.png)

Chi tiết về bộ lọc này sẽ được nói ở phần sau. Sau khi áp dụng bộ lọc này, ta sẽ sử dụng **Inverse Fast Fourier Transform** lên *logarithm* của *spectrum*:

$$
\begin{aligned}
    IFFT(log(X[k])) &= IFFT(log(H[k]) + log(E[k])) \\
    \Leftrightarrow x[k] &= h[k] + e[k]
\end{aligned}
$$

Trong đó, $x[k]$ được gọi là **cepstrum** vì IFFT là nghịch đảo của FFT và *cepstrum* cũng là nghịch đảo của *spectrum*, hay chứ nhỉ.

**Cepstrum** bây giờ sẽ giống như **Speech Signal**, biểu diễn dưới dạng hai chiều $(x'', y'')$, nhưng giá trị sẽ khác nên người ta cũng gọi hai cột với tên khác là $y''$ là magnitude (không có đơn vị) và $x''$ là quefrency (ms).

Và **MFCCs** cũng chính là các giá trị lấy từ **Cepstrum** này, thông thường người ta sẽ lấy 12 hệ số của $y''$ vì mấy cái còn lại không có tác dụng trong các hệ thống nhận diện âm thanh.

Tóm lại, pipeline của ta sẽ là **speech signal** $\rightarrow$ **spectrum** $\rightarrow$ **mel-freq filter** $\rightarrow$ **cepstral**.
# MFCCs được hiện thực như thế nào?
Với nguyên lý hoạt động ở trên, để hiện thực cho máy tính trích xuất được MFCCs thì ta sẽ phải thêm một số thành phần khác. Pipeline cơ bản như sau:

![](https://images.viblo.asia/d62a5349-d8e6-4239-85b5-cabeb93ecebe.png)

### Preemphasis
Ta sẽ áp dụng công thức sau lên **speech signal**:

$$
y(t) = x(t) - \alpha x(t-1)
$$

Có nhiều lý do để áp dụng *preemphasis*  như:
1. Tránh vấn đề về số khi áp dụng FFT
2. Làm cân bằng tần số **spectrum**
3. Khuếch đại tần số cao (để lọc tần số thấp dễ hơn)

Nhưng mà *preemphasis* không bắt buộc sử dụng nữa vì FFT đã được cải thiện.

### Framing
**Speech signal** ở dạng liên tục theo từng ms, do đó khó để giải quyết nên người ta sẽ chia *speech signal* thành các **frames**.

Mỗi **frame** có kích thước khoảng 20-40 ms và chồng lên nhau (tức là từ đầu frame sau tới cuối frame trước) khoảng 10-15 ms.

Kết quả sẽ ở dưới dạng hai chiều $(x, y)$ với $x$ là ```frame_length``` và $y$ là ```number_of_frames```.

### Windowing
Do framing làm rời rạc hóa **speech signal** ta sẽ áp dụng một hàm gọi là **Hamming Window** để làm smooth các frames:

$$
w[n] = 0.54 - 0.46cos \Big (\frac{2\pi n}{N - 1} \Big ), 0 \le n \le N - 1
$$

Trong đó $N$ là ```frame_length```

### Fourier Transform and Power Spectrum
Đây là bước ta chuyển **speech signal** thành **spectrum**, ta sẽ áp dụng công thức sau:

$$
P = \frac{\lvert FFT(x_i)^2 \lvert}{N_{FFT}}
$$

Trong đó $N_{FFT}$ bằng 256 hoặc 512, $x_i$ là frame thứ $i$ của **speech signal** $x$.

### Filter Banks
Đây là bước ta áp dụng bộ lọc **Mel-Frequency FIlter**.

Các phương trình sau dùng để chuyển giữa Hert $(f)$ và Mel $(m)$:

$$
\begin{aligned}
    m &= 2595log_{10}(1 + \frac{f}{700}) \\
    f &= 700(10^{m/2595} - 1)
\end{aligned}
$$

Sau đây là chi tiết về bộ lọc này, đó là các phương trình sau:

$$
\begin{aligned}
H_m(k) &= 0 & \text{iff} \space k < f(m - 1) \\
&= \frac{k - f(m-1)}{f(m) - f(m-1)} & \text{iff} \space f(m-1) \le k < f(m) \\
&= 1 & \text{iff} \space k = f(m) \\
&= \frac{f(m+1) - k}{f(m+1) - f(m)} & \text{iff} \space f(m) < k \le f(m+1) \\
&= 0 & \text{iff} \space k > f(m+1)
\end{aligned}
$$

### Discrete Cosine Transform and MFCCs 
Đây là bước ta chuyển từ **spectrum** qua **cepstrum**, áp dụng DCT (1 dạng IFFT) lên kết quả của *filter banks* ta sẽ có được các MFCCs, sau đó lấy 12 hệ số như đã nói.

# Tham khảo
1. [https://wiki.aalto.fi/display/ITSP/Cepstrum+and+MFCC](https://wiki.aalto.fi/display/ITSP/Cepstrum+and+MFCC)
2. [http://practicalcryptography.com/miscellaneous/machine-learning/guide-mel-frequency-cepstral-coefficients-mfccs/](http://practicalcryptography.com/miscellaneous/machine-learning/guide-mel-frequency-cepstral-coefficients-mfccs/)
3. [https://haythamfayek.com/2016/04/21/speech-processing-for-machine-learning.html](https://haythamfayek.com/2016/04/21/speech-processing-for-machine-learning.html) ở đây có cách hiện thực trong python
4. [http://www.speech.cs.cmu.edu/15-492/slides/03_mfcc.pdf](http://www.speech.cs.cmu.edu/15-492/slides/03_mfcc.pdf)