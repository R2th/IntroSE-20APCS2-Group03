# 1. Tổng quan
- Các mô hình non-autogressive TTS song song trước đó, ví dụ như FastSpeech, có thể sinh mel-spectrogram nhanh hơn rõ rết so với autogressive models như Tacotron, cũng như giảm các lỗi về ngữ âm (lặp, mất từ). Tuy vậy, các nhược điểm trên được xử lý phần lớn nhờ attention map giữa text và speech. 
- Các mô hình TTS song song trước thường sử dụng aligners từ bên ngoài như pre-trained autogressive TTS models (ví dụ là FastSpeech) khiến cho performance bị phụ thuộc vào chúng

=> Qua bài báo [Glow-TTS: A Generative Flow for Text-to-Speech via
Monotonic Alignment Search](https://arxiv.org/pdf/2005.11129.pdf), các tác giả giới thiệu mô hình **GlowTTS**, *một flow-based generative model* có thể tự học các alignment mà không cần aligners từ bên ngoài bằng thuật toán **Monotonic Alignment Search**

# 2. Normalizing Flows
GlowTTS dựa trên **Normalizing Flows**, một lớp các mô hình sinh biểu diễn sự biến đổi của mật độ xác suất bằng cách sử dụng phép **đổi biến** thông qua một *chuỗi các phép biến đổi khả nghịch* (sequence of invertible mappings) được tham số hóa và học từ dữ liệu để biến đổi phân bố từ phức tạp thành đơn giản giúp tính toán xác suất dễ dàng hơn
- **Normalizing**: qua các phép đổi biến, ta có hàm mật độ xác suất (**probability density function - PDF**) được chuẩn hóa
- **Flows**: hàm mật độ ban đầu *flows* (đổi biến liên tục) qua chuỗi các phép biến đổi khả nghịch 

Flow-based models được huấn luyện sử dụng hàm mất mát *negative-log likelihood*

![](https://miro.medium.com/max/1400/1*DgSWBiBf-GOP4ybs88IWHQ.png)

với $p(z)$ là PDF, $det$ là định thức và đạo hàm là ma trận Jacobian, $h_i$ là kết quả biến đổi khả nghịch từ **x** sang **z** thông qua $f_i$. Nhìn hình dưới cho dễ hiểu:

![](https://images.viblo.asia/d420b7e5-75a3-40ee-a62f-15e2dec448d2.png)

Hàm biến đổi $f_i$ cần thỏa mãn:
- Dễ tính hàm nghịch đảo ($f^{-1}_{i}$)
- Dễ tính ma trận đạo hàm Jacobian

# 3. Monotonic Alignment Search (MAS)
Tác giả cần tìm 1 ma trận alignment $A$ mà không sử dụng aligners từ bên ngoài, vậy làm thế nào? Họ đã giả sử A là song ánh để đảm bảo GlowTTS không lặp hoặc mất text input, và giới thiệu hàm **Monotonic alignment search (MAS)**. **MAS** có nhiệm vụ tìm kiếm monotonic alignment khả dĩ nhất giữa *biến tiềm ẩn* (latent variable) và *thống kê phân phối xác suất trước*, gọi là $A*$

Gọi $Q_{i,j}$ là giá trị log-likelihood cực đại với $i$ là thống kê phân phối xác suất trước, $j$ là biến tiềm ẩn. $Q_{i,j}$ có thể được tính đệ quy theo $Q_{i-1,j-1}$ và $Q_{i,j-1}$:
$$
Q _ { i, j } = \max _ { A } \sum _ { k = 1 } ^ { j } \log N \left ( z _ { k } ; \mu _ { A \left ( k \right ) }, \sigma _ { A \left ( k \right ) } \right ) = \max \left ( Q _ { i - 1, j - 1 }, Q _ { i, j - 1 } \right ) + \log N \left ( z _ { j } ; \mu _ { i }, \sigma _ { i } \right )
$$

Ta tính tất cả giá trị $Q$ đến $Q_{T_{text}, T_{mel}}$ ($T_{mel}$ là độ dài chuỗi mel-spectrogram, $T_{text}$ là độ dài chuỗi text input). Ta có thể tìm các phần tử trong $A*$ bằng cách xác định giá trị $Q$ lớn hơn trong mỗi phương trình trên. Do vậy, việc tìm $A*$ có thể được thực hiện bằng quy hoạch động, và thực hiện quay lui ở cuối alignment. Bạn có thể nhìn hình cho dễ hiểu hơn:

![](https://images.viblo.asia/e1a04f0e-3b8f-4b2c-ba6b-88849fc4400e.png)

# 4. Kiến trúc mô hình
## 4.1. Encoder và Duration Predictor

![](https://images.viblo.asia/92539507-3e69-4cb0-9f87-c685fb57d935.png)

Kiến trúc phần **Encoder** dựa trên kiến trúc Encoder của [Transformer TTS](https://arxiv.org/pdf/1809.08895.pdf) với vài thay đổi nhỏ:
- Thay thế *positional encoding* bởi *relative position representations* trong các self-attention modules
- Thêm *residual connection* vào encoder pre-net
- Thêm lớp *linear projection* vào cuối encoder nhằm ước lượng phân phối xác suất trước

**Duration Predictor**: kiến trúc và các tham số thiết lập đều giống với FastSpeech 

## 4.2 Decoder

![](https://images.viblo.asia/c5bf0642-c3e0-4b5b-b53e-8a44b6023783.png)

Phần cốt lõi của GlowTTS là **flow-based Decoder**. Decoder nhận đầu vào là mel-spectrogram, *squeeze* nó trước khi được xử lý qua nhiều block (mô hình trong paper gồm 12 blocks), cuối cùng được *unsqueeze* về hình dạng ban đầu.

Quá trình *squeeze* và *unsqueeze*: Khi squeeze, channel size tăng gấp đôi và số lượng time step giảm 1 nửa (nếu số time step lẻ, ta bỏ qua phần tử cuối của mel-spectrogram sequence). Unsqueeze là quá trình đưa mel-spectrogram về hình dạng ban đầu

![](https://images.viblo.asia/0fde68b7-d0d6-4c46-a663-ff4bc8d081b9.png)

Về các block, chúng gồm:
- Activation Normalization (ActNorm) Layer: thường được sử dụng trong flow-based generative models. Nó thực hiện biến đổi affine, sử dụng các tham số scale và bias có thể huấn luyện được (tương tự batch normalization) 
- 1x1 Convolution khả nghịch: hình dưới là ví dụ được cung cấp trong [Glow-TTS: A Generative Flow for Text-to-Speech via
Monotonic Alignment Search](https://arxiv.org/pdf/2005.11129.pdf). 2 phần được sử dụng cho coupling layer được tô màu trắng và xanh. Với input channel là 8 như hình, ta dùng chung 1 ma trận 4x4 như là kernel cho 1x1 convolution khả nghịch. Sau khi mix channel, ta chia input thành các nhóm rồi thực hiện phép 1x1 convolution  

![](https://images.viblo.asia/a5b5e135-7218-4545-8cd5-c8f5ae9f76bd.png)

- Affine Coupling Layer: kiến trúc tương tự trong [WaveGlow](https://arxiv.org/pdf/1811.00002.pdf) bỏ đi local conditioning

Ta có thể xem thêm về 3 thành phần trên qua bảng dưới (từ [Glow: Generative Flow with Invertible 1×1 Convolutions](https://papers.nips.cc/paper/2018/file/d139db6a236200b21cc7f752979132d0-Paper.pdf))

![](https://images.viblo.asia/df75a1d2-91c0-44c4-b9d3-3bea7beeacb5.png)

## 4.3. Hyperparemeters
Trái với suy nghĩ của nhiều người rằng flow-based generative models cần số lượng tham số lớn, số lượng tham số của GlowTTS (28.6 triệu) thấp hơn FastSpeech (30.1 triệu)

![](https://images.viblo.asia/0bd4fdbc-4da6-4c76-b801-799ecc6de75d.png)


# 5. GlowTTS Pipeline
![](https://images.viblo.asia/1787517c-1087-4094-826b-e56e9512cf0c.png)
## 5.1. Training (hình a)
GlowTTS mô hình hóa *phân phối có điều kiện* của mel-spectrgram $(P_X(x|c))$ bằng cách biến đổi *phân phối trước có điều kiện* (conditional prior distribution) $P_Z(z|c)$ thông qua flow-based decoder $f_{dec}: z \rightarrow x$, với $x$ và $c$ lần lượt là mel-spectrogram và chuỗi văn bản đầu vào. Bằng phương pháp đổi biến, ta có thể tính log-likelihood của dữ liệu:
$$
\log P _ { X } \left ( x | c \right ) = \log P _ { Z } \left ( z | c \right ) + \log \left | \operatorname { d e t } \frac { \partial f _ { dec } ^ { - 1 } \left ( x \right ) } { \partial x } \right |
$$
Ta tham số hóa dữ liệu và phân phối trước bởi tham số $\theta$ và alignment $A$. Text encoder $f_{enc}$ ánh xạ từ text condition $c=c_{1:T_{text}}$ sang các giá trị thống kê $\mu=\mu_{1:T_{text}}$ và $\sigma=\sigma_{1:T_{text}}$. Phân phối trước có thể biểu diễn theo công thức: dưới đây:

$$
\log P _ { Z } \left ( z | c ; \theta, A \right ) = \sum _ { j = 1 } ^ { T_{mel} } \log \mathcal{N} \left ( z _ { j } ; \mu _ { A \left ( j \right ) }, \sigma _ { A \left ( j \right ) } \right ) 
$$

Ta cần tìm $\theta$ và $A$ sao cho giá trị log-likelihood của dữ liệu đạt cực đại: $\max _ { \theta, A } L \left ( \theta, A \right ) = \max _ { \theta, A } \log P _ { X } \left ( x | c ; A, \theta \right )$. Ta chia việc này thành 2 phần, thực hiện lần lượt ở mỗi traing step:
- Tìm alignment khả dĩ nhất $A*$ ứng với $\theta$ hiện tại: sử dụng **MAS** đã trình bày ở trên

$$
A ^ { * } = \arg \max _ { A } \log P _ { X } \left ( x | c ; A, \theta \right ) = \arg \max _ { A } ^ { T _ {mel} } \log X \left ( z _ { j } ; \mu _ { A \left ( j \right ) }, \sigma _ { A \left ( j \right ) } \right )
$$

- Cập nhật $\theta$ bằng gradient descent sao cho log-likelihood $\log P _ { X } \left ( x | c ; \theta, A \right )$ là lớn nhất

Để ước lượng $A*$ trong quá trình suy luận, ta huấn luyện **duration predictor** $f_{dur}$ để có thể cho kết quả giống duration label được tính bởi $A*$:

$$
d _ { i } = \sum _ { j = 1 } ^ { T _ { mel } } 1 _ { A ^ { * } \left ( j \right ) = i }, i = 1, \ldots, T _ { t e x t }
$$

Duration predictor có kiến trúc gần tương tự trong FastSpeech và cũng được đặt sau encoder. Điểm khác biệt là đầu vào của duration predictor có thêm phép toán **stop gradient** $sg[\cdot]$, nhằm loại bỏ đạo hàm ở đầu vào trong quá trình backward để chúng không ảnh hưởng tới maximum likelihood. 

**Hàm mất mát** của duration predictor:

$$
L _ { d u r } = M S E \left ( f _ { d u r } \left ( s g \left [ f _ { e n c } \left ( c \right ) \right ] \right ), d \right )
$$

với *MSE* là mean square error giữa các giá trị logarithm

## 5.2. Inference (hình b)
Trong quá trình suy luận, phân phối trước và alignment được dự đoán bởi text encoder và duration predictor. Sau đó, biến tiềm ẩn được lấy mẫu từ phân phối trước, và mel-spectrogram được sinh song song bằng việc sử dụng flow-based decoder để biến đổi các biến tiềm ẩn.

# 6. Kết quả
## 6.1. Chất lượng âm thanh
Trong 3 giá trị temperature $T$ của phân phối trước được thử nghiệm trong suy luận, GlowTTS đạt performance tốt nhất khi $T=0.333$. Với cả 3 giá trị $T$, MOS của GlowTTS đều nhỉnh hơn Tacotron2

![](https://images.viblo.asia/2bbf0adb-4770-4ddb-a8b8-dea3faaf2d6d.png)

## 6.2. Tốc độ suy luận
Trên tập test, tốc độ suy luận của GlowTTS ổn định ở 40ms bất kể độ dài, còn tốc độ của Tacotron2 giảm dần tuyến tính khi độ dài chuỗi text input tăng dần. GlowTTS suy luận nhanh hơn trung bình 15.6 lần so với Tacotron2

![](https://images.viblo.asia/db8b77ac-03ce-4bd8-8831-4cecc1af8d47.png)

## 6.3. Robustness
- *Tỉ lệ ký tự lỗi* (character error rate - **CER**) của Tacotron2 bắt đầu tăng khi độ dài chuỗi ký tự đầu vào vượt quá 260, còn GlowTTS vẫn ổn định với văn bản dài dù chúng không được sử dụng trong quá trình huấn luyện

![](https://images.viblo.asia/3b0743f4-f626-4b66-8269-386f5810886c.png)

- Tỷ lệ các lỗi về ngữ điệu (lặp, mất từ, phát âm sai) cũng rất thấp khi so sánh với nhiều TTS model khác. Dù tệ hơn Tacotron2, robustness của GlowTTS vẫn được giữ vững với chuỗi text input độ dài lớn, điều mà Tacotron2 không làm được

![](https://images.viblo.asia/7ae1988f-86c3-417a-9531-cff76368ce72.png)

# Reference
[Glow-TTS: A Generative Flow for Text-to-Speech via
Monotonic Alignment Search](https://arxiv.org/pdf/2005.11129.pdf)

[Glow: Generative Flow
with Invertible 1×1 Convolutions](https://papers.nips.cc/paper/2018/file/d139db6a236200b21cc7f752979132d0-Paper.pdf)

[WaveGlow](https://arxiv.org/pdf/1811.00002.pdf)

[Variational Inference with Normalizing Flows](https://arxiv.org/pdf/1505.05770.pdf)

https://jaketae.github.io/study/glowtts/