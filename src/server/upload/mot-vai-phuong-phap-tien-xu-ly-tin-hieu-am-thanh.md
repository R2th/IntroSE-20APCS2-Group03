# Giới thiệu
Tiền xử lý dữ liệu tín hiệu nói chung và dữ liệu âm thanh nói riêng đóng vai trò cực kỳ quan trọng trong bất cứ một phương pháp học máy nào. Các mô hình học sâu cho tín hiệu âm thanh rất nhạy cảm với dữ liệu đầu vào, vì vậy bước làm sạch dữ liệu đầu vào sẽ quyết định hiệu suất mô hình tốt hay kém. Trong bài này mình sẽ giới thiệu một vài phương pháp tiền xử lý cho tín hiệu âm thanh.
# Bộ lọc butterworth
Trong nhiều ứng dụng, ta cần một bộ lọc thông thấp (low-pass filter), thông cao (high-pass filter), thông dải (band-pass filter) hay chắn dải (band-stop filter) thỏa mãn các yêu cầu về dải thông, dải chắn cụ thể. Ta có thể thiết kế bộ lọc dựa vào một phương pháp xấp xỉ hóa bộ lọc lý tưởng nào đó. Trong phần này, mình xét phương pháp xấp xỉ Butterworth và việc thiết kế bộ lọc ở đây bắt đầu từ thiết kế bộ lọc thông thấp Butterworth, sau đó bằng các phép biến đổi tần số ta có thể chuyển đổi thành thiết kế bộ lọc thông cao, thông dải và chắn dải. 
Ta sẽ xét các bước thiết kế đối với bộ lọc thông thấp Butterworth chuẩn hóa, tức là bộ lọc có tần số cắt (cutoff frequency) là $\omega_c$ = 1 rad/s. Việc thiết kế các bộ lọc có tần số cắt khác $\omega_c$ = 1 rad/s sẽ được thực hiện bằng cách co giãn tần số. 

Bước đầu tiên trong thiết kế là lựa chọn tần số cắt $\omega_c$ . Tần số này được xác định bởi băng thông yêu cầu. 

Bước thứ hai là lựa chọn bậc của bộ lọc. Ta thường chọn bậc của bộ lọc từ độ lợi (gain) tại một tần số cụ thể $\omega_1$ nào đó trong dải chắn. Độ lợi $G(\omega)$ của một bộ lọc thông thấp bậc $n$ được định nghĩa:
$$
G^{2}(\omega)=|H(j \omega)|^{2}=\frac{G_{0}{ }^{2}}{1+\left(\frac{j \omega}{j \omega_{c}}\right)^{2 n}}
$$
Trong đó $n$ là bậc của bộ lọc, $\omega_c$ là tần số cắt và $G_{0}$ là độ lợi ở tần số 0.

Các đường cong biểu diễn độ lợi thay đổi theo tần số với các bậc bộ lọc khác nhau thường được dùng để xác định bậc của bộ lọc.

Bước thứ ba là tính các hệ số của mẫu số của hàm truyền đạt:

$$
\mathrm{H}_{\mathrm{N}}\left(\mathrm{S}_{\mathrm{N}}\right)=\mathrm{a}_{0} /\left(\mathrm{b}_{0}+\mathrm{b}_{1} \mathrm{~S}_{\mathrm{N}}+\ldots+\mathrm{b}_{\mathrm{n}-1} \mathrm{~S_N}^{\mathrm{n}-1}+\mathrm{S}_{N}^{\mathrm{n}}\right)
$$

Ở đây chữ N là để ký hiệu cho bộ lọc chuẩn hóa. Ta chọn hệ số $a_0$, chọn sao cho bộ lọc có độ lợi lớn nhất.

Bước cuối cùng, ta thay đổi thang tần số để có được bộ lọc có tần số cắt thỏa mãn yêu cầu: 

$$
\mathrm{H}_{\mathrm{L}}(\mathrm{s})=\mathrm{a}_{0} /\left(\mathrm{b}_{0}+\mathrm{b}_{1}\left(\mathrm{~s} / \omega_{\mathrm{c}}\right)+\ldots+\mathrm{b}_{\mathrm{n}-1}\left(\mathrm{~s} / \omega_{\mathrm{c}}\right)^{\mathrm{n}-1}+\left(\mathrm{s} / \omega_{\mathrm{c}}\right)^{\mathrm{n}}\right)
$$

Tăng/giảm bậc n dẫn đến tăng/giảm độ dốc của vùng chuyển. n càng cao, khả năng phân tách giữa các tần số gần nhau của bộ lọc càng tốt và ngược lại.

![](https://images.viblo.asia/268f1ac7-97c6-46ce-b073-4e40c0487928.png)

# Resampling tín hiệu
Resampling là phương pháp kết hợp nội suy (interpolation) và thập phân hóa (decimation) để thay đổi tỷ lệ lấy mẫu. Resampling thường được thực hiện để giao tiếp giữa hai hệ thống có tốc độ lấy mẫu khác nhau. Nếu tỷ lệ sampling rate của hai hệ thống là một số nguyên, thì thập phân hóa hoặc phép nội suy có thể được sử dụng để thay đổi tốc độ lấy mẫu (tùy thuộc vào tốc độ cần giảm hay tăng); nếu ngược lại, phép nội suy và thập phân hóa phải được sử dụng cùng nhau để thay đổi sampling rate. Ví dụ các thiết bị âm thanh chuyên nghiệp sử dụng tốc độ lấy mẫu là 48 kHz, nhưng thiết bị âm thanh tiêu dùng sử dụng tốc độ 44,1 kHz. Do đó, để chuyển nhạc từ bản ghi chuyên nghiệp sang đĩa CD, tốc độ lấy mẫu phải được thay đổi theo hệ số:
(44100 / 48000) = (441 / 480) = (147 / 160). 
Trong ví dụ này, chúng ta nội suy theo hệ số 147, sau đó thập phân hóa theo hệ số 160
# Chuẩn hóa biên độ
Chuẩn hóa biên độ là một toán tử cơ bản được thực hiện trên tín hiệu để đa dạng hóa cường độ âm thanh. Nó được biểu diễn bằng công thức:

$$
Y(t)=\boldsymbol{\alpha} X(\mathrm{t})
$$

Trong đó $\boldsymbol{\alpha}$ là hệ số tỉ lệ.

![](https://images.viblo.asia/13f3ba0c-c359-4746-b26f-6a95877cf938.png)



Có thể thấy tín hiệu bị suy yếu khi \boldsymbol{\alpha} = 0.5 (hình b) và được tăng cường khi \boldsymbol{\alpha} = 1.5 (hình c)
# Biến đổi Fourier rời rạc
Trong toán học, phép biến đổi Fourier rời rạc (DFT), đôi khi còn được gọi là biến đổi Fourier hữu hạn, là một biến đổi trong giải tích Fourier cho các tín hiệu thời gian rời rạc. Đầu vào của biến đổi này là một chuỗi hữu hạn các số thực hoặc số phức, khiến cho biến đổi này là một công cụ lý tưởng để xử lý thông tin trên các máy tính.
Với chuỗi tín hiệu x(n) đầu vào, DFT biến đổi thành chuỗi số phức bằng công thức:

$$
\begin{aligned}
X_{k} &=\sum_{n=0}^{N-1} x_{n} \cdot e^{-\frac{i \pi \pi}{N} k n} \\
&=\sum_{n=0}^{N-1} x_{n} \cdot[\cos (2 \pi k n / N)-i \cdot \sin (2 \pi k n / N)]
\end{aligned}
$$

Phổ biên độ của tín hiệu x(n):
$$|X^{(j\omega)}|$$
 
# Bộ lọc pre-emphasis
Bộ lọc pre-emphasis để khuếch đại tần số cao. Bộ lọc này rất hữu ích trong những trường hơp: 
1. Cân bằng phổ tần số vì tần số cao thường có cường độ nhỏ hơn so với tần số thấp hơn
1. Tránh các vấn đề về số học trong biến đổi Fourier và
1. Cũng có thể cải thiện tỉ số tín hiệu cực đại trên nhiễu (SNR). 

Pre-emphasis filter áp dụng vào tín hiệu $x(n)$ theo công thức sau:

$$y(t) = x(t) - \alpha x(t-1)$$

Hình dưới đây mô tả tín hiệu trước (a) và sau (b) khi áp dụng bộ lọc pre-emphasis:

![](https://images.viblo.asia/9254ef23-e5d0-454e-8cb9-2244b4f7a9de.png)


Có thể thấy bộ lọc đã tăng cường vùng tần số cao đồng thời làm suy giảm vùng tần số thấp
# Tỉa khoảng lặng
Trong xử lý tiếng nói, những khoảng lặng (silence) thường không mang nhiều thông tin và dễ gây nhiễu cho quá trình huấn luyện mô hình. Vì vậy một bước thường có trong quá trình tiền xử lý là tỉa khoảng lặng

![](https://images.viblo.asia/fa3e894d-3e25-4d53-a2d4-a19252db6d47.png)

Tỉa khoảng lặng được thực hiện bằng cách sử dụng một ngưỡng và loại bỏ những frame liên tiếp có cường độ nhỏ hơn giá trị ngưỡng đó.

# Kết luận
Trong bài này mình đã giới thiệu các phương pháp thông dụng để tiền xử lý dữ liệu âm thanh đầu vào. Tùy thuộc vào bài toán và dữ liệu, ta có thể sẽ phải xử lý thêm như biến đổi về miền tần số, trích xuất các đặc trưng về phổ, phân đoạn,... Với dữ liệu sạch, việc huấn luyện mô hình học máy hay học sâu sẽ trở nên dễ dàng hơn rất nhiều.