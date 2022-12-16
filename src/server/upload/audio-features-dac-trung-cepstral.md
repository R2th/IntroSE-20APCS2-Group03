Nếu như [Spectral](https://viblo.asia/p/audio-features-dac-trung-spectral-4P856z3B5Y3) (spectrum, phổ tín hiệu) có được bằng cách thực hiện biến đổi Fourier rời rạc (DFT) thì đặc trưng Cepstral có được bằng cách biến đổi DFT (hoặc DCT) spectrum của tín hiệu đó. Các đặc trưng cepstral như Mel-frequency cepstral coefficients (MFCC) được sử dụng rộng rãi trong các bài toán xử lý tiếng nói vì tính trực quan của nó. Trong bài này mình sẽ giới thiệu hai đặc trưng cepstral phổ biến là MFCC và Gammatone frequency cepstral coefficients (GFCC).

# Mel-frequency cepstral coeficients
Trong xử lý âm thanh, mel-frequency cepstrum (MFC) là một biểu diễn của phổ năng lượng ngắn hạn của âm thanh, dựa trên biến đổi cosine tuyến tính của logarit phổ năng lượng trên thang tần số mel phi tuyến. Mel-frequency cepstral coefficients (MFCC) là các hệ số tạo thành một MFC. Thang tần số Mel được định nghĩa như sau:

 $$
m=2595 \log _{10}\left(1+\frac{f}{700}\right)
$$
 
![](https://images.viblo.asia/e5d4d49d-e10e-4e19-bac6-b5d5fa7a3225.png)


Để trích xuất MFCC, sau khi chia âm thanh dạng waveform thành các frame, ta biến đổi Fourier rời rạc trên frame đó:
$$
S_{i}(k)=\sum_{n=1}^{N} s_{i}(n) h(n) e^{-j 2 \pi k n / N} \quad 1 \leq k \leq K
$$
		
 
		
Trong đó $h(n)$ là cửa sổ phân tích (Hamming, Hanning,...) độ dài $N$ và $K$ là độ dài của DFT. Sau đó, power spectrum $P_i$  của $S_i$ được tính bằng công thức:

 $$
P_{i}(k)=\frac{1}{N}\left|S_{i}(k)\right|^{2}
$$

Bằng cách lấy một tần số $f_k$, ta sẽ ánh xạ được sang tần số $m_k$ trên thang Mel. Tuy nhiên, nếu chỉ chọn mẫu ở tần số $f_k$,  chúng ta sẽ mất tất cả các thông tin khác. Do đó, ta lấy tổng năng lượng có trọng số gần tần số mục tiêu $f_k$ trên power spectrum $P_i$ bằng công thức:
$$
u_{k}=\sum_{h=f_{k-1}+1}^{f_{k+1}-1} w_{k, h}\left|x_{h}\right|^{2}
$$
 

Trong đó $w_k,h$  là trọng số ứng với mẫu $x_h$ và thường là các bộ lọc tam giác:

 
$$
w_{k, h}=\left\{\begin{array}{ll}
\frac{h-f_{k-1}}{f_{k}-f_{k-1}} & \text { for } f_{k-1}<h \leq f_{k} \\
\frac{f_{k+1}-h}{f_{k+1}-f_{k}} & \text { for } f_{k}<h \leq f_{k+1} \\
0 & \text { otherwise }
\end{array}\right.
$$
![](https://images.viblo.asia/27d5ed88-cfc1-4ba6-b2a7-f8fc4e051c91.png)

	

Cuối cùng, bằng cách biến đổi cosine rời rạc (DCT) của các tham số $u_k$, chúng ta có được biểu diễn được gọi là Mel-frequency cepstral coefficients (MFCC). Tác dụng của DCT là làm giảm sự tuyến tính, sao cho các hệ số MFC không tương quan với nhau. (Ảnh: Từ trái qua phải: spectrogram, mel-spectrogram, MFCC)

![](https://images.viblo.asia/1427058a-d855-468d-ad10-76bcab7359c8.png)


Một số ưu điểm của MFCC:

* Loại bỏ những thông tin quá chi tiết (thường là dư thừa) và tập trung vào những thông tin về cấu trúc âm thanh (thường quan trọng hơn)
* Dễ hiểu và tính toán dễ dàng
* Hiệu quả đã được kiểm chứng 

Những vấn đề của MFCC:
* Việc lựa chọn thang Mel chưa được kiểm chứng chặt chẽ bằng toán học. Các thang đo như ERB hoặc gammatone filterbank có thể phù hợp hơn. Tuy nhiên, các bộ lọc thay thế này không cho thấy lợi ích nhất quán trong các bài toán khác nhau, do đó thang đo mel vẫn được sử dụng. 
* Nhạy cảm với nhiễu. Hiệu suất của các MFCC khi tín hiệu xuất hiện nhiễu, so với các đặc trưng khác không phải lúc nào cũng tốt hơn.
* Sự lựa chọn các bộ lọc tam giác thường là tự ý và không dựa trên một lập luận vững chắc nào
* Hoạt động tốt trong bài toán phân tích (analysis) nhưng không tốt trong bài toán tổng hợp (synthesis). Việc biến đổi ngược từ MFCC sang spectrogram rất khó khăn.

# Gammatone frequency cepstral coefficients
Một trong những vấn đề lớn nhất trong nhận diện âm thanh là tiếng ồn/nhiễu. Độ nhạy đối với nhiễu, như đã đề cập ở trên, là một trong những nhược điểm chính của MFCC. GFCC là đặc trưng dựa trên một tập hợp các bộ lọc Gammatone. Đầu ra của bộ lọc gammatone là một biểu diễn trên miền thời gian-tần số, được gọi là cochleagram. Để tính toán GFCC, ta cần phải trích xuất cochleagram; các bước tính toán khác có nhiều điểm tương đồng với MFCC.

Đầu tiên, ta cũng thực hiện biến đổi STFT trên tín hiệu đầu vào:

 $$
S_{i}(k)=\sum_{n=1}^{N} s_{i}(n) h(n) e^{-j 2 \pi k n / N} \quad 1 \leq k \leq K
$$
	
Sau đó trích xuất power cepstrum trước khi nhân chập với các bộ lọc Gammatone:

$$
P_{i}(k)=\frac{1}{N}\left|S_{i}(k)\right|^{2}
$$

Các bộ lọc Gammatone được thiết kế để mô phỏng quá trình xử lý tín hiệu của hệ thống thính giác của con người. Bộ lọc Gammatone có tần số trung tâm $f_c$ được định nghĩa là:

 $$
\boldsymbol{g}(\boldsymbol{t})=\boldsymbol{a} \boldsymbol{t}^{n-1} \boldsymbol{e}^{-2 \pi b t} \cos \left(2 \pi \boldsymbol{f}_{c}+\boldsymbol{\varphi}\right)
$$

Trong đó $\boldsymbol{\varphi}$ là pha nhưng thường được đặt thành 0, hằng số $\boldsymbol{a}$ điều khiển độ tăng (gain) và bậc của bộ lọc được xác định bởi giá trị $n$ (thường được đặt thành giá trị nhỏ hơn 4). Tham số b được định nghĩa là:

 $$
b=25.17\left(\frac{4.37 f_{c}}{1000}+1\right)
$$
Hình dưới đây mô tả đáp ứng tần số của các bộ lọc gammatone.
![](https://images.viblo.asia/5595cb44-74ad-4488-b2af-f91db22436ca.png)

Ta thực hiện nhân chập với bộ lọc Gammatone để tạo ra Cochleagram:

 $$
u_{k}=\sum_{h=f_{k-1}+1}^{f_{k+1}-1} w_{k, h}\left|x_{h}\right|^{2}
$$

 


Cochleagram được trích xuất tương tự như Mel-spectrogram trong MFCC, chỉ khác một điều rằng thay vì sử dụng bộ lọc tam giác như MFCC, ta sử dụng bộ lọc Gammatone như trên.

Biến đổi cosine rời rạc được áp dụng để thu được các hệ số cepstral phi tuyến. Tương tự như thao tác trên MFCC, hàm log được sử dụng trên spectrum $y(n,i)$:
	
 $$
g(n ; u)=\left(\frac{2}{M}\right)^{0.5} \sum_{i=0}^{M-1}\left\{\frac{1}{3} \log (\bar{y}(n ; i)) \cos \left[\frac{\pi u}{2 M}(2 i-1)\right]\right\}
$$

trong đó khoảng giá trị của $u$ thường là từ 0 đến 31. 12 hệ số đầu tiên sau đó được chọn ra để tạo thành GFCC 12 chiều:

 $$
g(n)=[g(n ; 0), \ldots g(n ; 11)]^{T}
$$

Ưu điểm của GFCC là ít nhạy cảm với nhiễu (so với MFCC) và mang nhiều thông tin ở vùng tần số thấp, dẫn đến phù hợp với các bàn toán xử lý tiếng nói. Tuy nhiên hiệu suất của GFCC cũng không nhất quán giữa các bài toán khác nhau và nó cũng ít được sử dụng hơn MFCC.

# Kết luận
Hai đặc trưng MFCC và GFCC rất hiệu quả trong các bài toán tiếng nói. Chúng là những biểu diễn đủ tốt và đủ nhỏ nên hay được sử dụng cho các thuật toán Machine Learning. Đối với Deep Learning, các phiên bản spectrogram của hai đặc trưng này, là mel-spectrogram và cochleagram, được ưu ái hơn do chúng giữ lại nhiều thông tin, giúp các mô hình học sâu tự trích xuất được các đặc trưng hữu ích. 
## Tham khảo
https://wiki.aalto.fi/display/ITSP/Introduction+to+Speech+Processing

Gammatone and MFCC Features in Spreaker Recognition