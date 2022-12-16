# 1. Autogressive và Non-Autogressive model
- Autogressive model hiểu đơn giản chỉ là 1 feed-forward model mà dự đoán các giá trị tương lai dựa trên các giá trị quá khứ. Các kiến trúc TTS tiêu biểu cho Autogressive model có thể kể đến mô hình Tacotron và Tacotron2 được giới thiệu trong bài viết trước của mình

<div align="center">
<img src="https://media.giphy.com/media/8xE7aPwFUKnOpZ5SRB/giphy.gif">
    <p>Source: <a href="https://arxiv.org/pdf/1711.10433.pdf">WaveNet: A generative model for raw audio</a></p>
</div>

- Non-autogressive model sẽ sinh ra các token của chuỗi một cách **song song**, giúp tốc độ sinh chuỗi nhanh hơn các Autogressive models, đổi lại độ chính xác sẽ thấp hơn. Các kiến trúc TTS tiêu biểu cho Non-autogressive model có thể kể đến mô hình FastSpeech và FastSpeech2

<div align="center">
<img src="https://homes.cs.washington.edu/~jkasai/images/parallel_wavenet.gif">
</div>

# 2. FastSpeech
## a. Ra đời:
- Từ bài báo [FastSpeech: Fast, Robust and Controllable Text to Speech](https://arxiv.org/pdf/1905.09263.pdf)

 ## b. Ý tưởng: 

Các mô hình trước đó thường có điểm chung: đầu vào là text, sinh ra âm thanh từ *mel-spectrogram* thông qua các *vocoder* như Griffin-Lim, WaveNet, Parallel WaveNet,... Chúng đều là các hệ thống dựa trên nền tảng Neural Net, và vượt xa các phương pháp cổ điển như **Statistical Parametric Synthesis**   
  
Dù vậy, do mel-spectrogram được sinh tuần tự dựa trên giá trị trước của chúng (autogressive mà) nên các hệ thống này có vài nhược điểm "cố hữu":
- **Tốc độ suy luận (inference) chậm:** do chuỗi mel-spectrogram thường rất dài, việc sinh mel-spectrogram tuần tự sẽ rất chậm
- **Not robust:** âm thanh sinh ra thường gặp các vấn đề như bỏ qua từ, lặp từ
- **Không kiểm soát được ngữ điệu:** âm thanh sinh ra khó kiểm soát về tốc độ, ngữ điệu, ngắt nghỉ,...

Từ đó, tác giả đề xuất mô hình **FastSpeech**, nhận đầu vào là 1 chuỗi âm vị (phoneme) và sinh spectrogram non-aggressively (có thể hiểu là song song, đồng thời). Một số điểm đặc biệt của **FastSpeech** 
- Sử dụng **feed-forward network** dựa trên *self-attention trong Transformer* và *1-D Convolution* giúp sinh mel-spectrogram song song, tăng tốc quá trình tổng hợp âm thanh
- **Phoneme duration predictor** giúp đảm bảo hard-alignment giữa phoneme và mel-spectrogram, từ đó giảm tỷ lệ mất, lặp từ
- **Length regulator** giúp điều chỉnh tốc độ giọng nói bằng cách kéo dài/làm ngắn độ dài âm vị, cũng như kiểm soát được 1 phần âm điệu bằng cách thêm các quãng nghỉ giữa các âm vị liền kề

Dù vậy, mô hình cũng có nhược điểm: việc sử dụng *hard alignment* thay vì *soft alignment* và *automatic attention alignment* như các autogressive model khiến âm thanh thiếu tự nhiên hơn

## c. Kiến trúc:

<div align="center">
<img src="https://images.viblo.asia/a989ecf3-bcbe-47c0-b03a-18cfa6fa7f9f.png">
    <p>Source: <a href="https://arxiv.org/pdf/1905.09263.pdf">FastSpeech: Fast, Robust and Controllable Text to Speech</a></p>
</div>

### Feed-forward Transformer (hình a)
- Ngoài 2 thành phần cơ bản là Embedding (ở đây là Phoneme Embedding do input là phoneme) và Positional Encoding, **Feed-Forward Transformer** gồm nhiều khối FFT nhằm chuyển từ phoneme sang mel-spectrogram, chia làm 2 phần rõ rệt là Phoneme side và mel-spectrogram side, mỗi phần có N khối FFT. 2 phần được kết nối bởi **Length Regulator**
- Nói về khối FFT (hình b): mỗi khối FFT gồm self-attention network (thực ra là multi-head attention) + 2 lớp 1-D Convolution thay vì 2 lớp Dense trong Transformer. Tác giả giải thích rằng các trạng thái ấn liền kề thường liên quan chặt chẽ hơn trong âm vị và chuỗi mel-spectrogram - đã được đánh giá qua thực nghiệm

### Length Regulator (hình c)
- **Length regulator**(LR) được sử dụng để giải quyết vấn đề về sự không đồng nhất giữa chuỗi âm vị và chuỗi mel-spectrogram trong **Feed-Forward Transformer** (do 1 âm có thể ứng với nhiều mel-spectrogram độ dài khác nhau), cũng như điều khiển tốc độ giọng và một phần âm vị. 
- Tác giải nhận ra rằng độ dài chuỗi phoneme thường nhỏ hơn độ dài chuỗi mel-spectrogram, và có sự tương ứng nào đó giữa chúng - tác giả gọi là **phoneme duration**(thời lượng âm). Việc dự đoán phoneme duration sẽ được đề cập ở phần sau.

Giả sử ta đã có chuỗi phoneme là $H _ { p h o } = \left [ h _ { 1 }, h _ { 2 }, \ldots, h _ { n } \right ]$, phoneme duration dự đoán được là $D _ { p h o } = \left [ d _ { 1 }, d _ { 2 }, \ldots, d _ { n } \right ]$ thỏa mãn $\sum _ { i - 1 } ^ { n } d _ { i } = m$ với m là độ dài chuỗi mel-spectrogram.<br>
Hàm **length regulator**: 
$$
H _ { m e l } = L R \left ( H _ { p h o }, D, \alpha \right )
$$
với $\alpha$ là hyperparameter để xác định độ dài chuỗi mel-spectrogram $H_{mel}$, từ đó kiểm soát tốc độ giọng nói: $\alpha = 1$ thì tốc độ bình thường, $\alpha < 1$ thì là tốc độ chậm, $\alpha > 1$ thì là tốc độ nhanh. Ví dụ, xét: 
$$
H _ { p h o } = \left [ h _ { 1 }, h _ { 2 }, h _ { 3 }, h _ { 4 } \right ] \\
D = \left [ 2, 2, 3, 1 \right ]
$$
với $\alpha = 1.8$

$$\Rightarrow D _ { \alpha = 1. 8 } = \left [ 3.6, 3.6, 5.4, 1. 8  \right ] \approx \left [ 4, 4, 5, 2 \right ]$$

Từ đó 
$$
H _ { m e l } = \left [ h _ { 1 }, h _ { 1 }, h _ { 1 }, h_1,h _ { 2 }, h _ { 2 }, h _ { 2 }, h_2, h _ { 3 }, h _ { 3 }, h _ { 3 }, h_3, h_3, h _ { 4 }, h_4 \right ]
$$

- Ngoài ra, LR còn có thể điều chỉnh độ dài các quãng ngắt, giúp giọng đọc sinh ra đa dạng hơn

### Duration Predictor (hình d)
**Duration Predictor** được sử dụng để dự đoán mỗi âm vị ứng với bao nhiêu cửa sổ mel-spectrogram, chính là $D_{pho}$ được đề cập ở trên. Về cơ bản, cấu trúc của Duration Predictor gồm 2 lớp **1-D Convolution**, mỗi lớp sử dụng *Relu activation* theo sau là *Batch normalization* và lớp *dropout*. Cuối cùng là lớp **Linear** để chuyển output thành 1 số.

Để huấn luyện **Duration Predictor**, tác giả sử dụng *autogressive teacher TTS model* như trong hình d nhằm trích xuất phoneme duration. Các bước cụ thể:
- Huấn luyện mô hình *Autogressive encoder-attention-decoder* dựa trên mạng Transformer TTS
- Với mỗi cặp dữ liệu, tác giả trích xuất các decoder-to-encoder attention alignment từ mô hình trên. Để chọn head thích hợp, tác giả đặt ra hàm *focus rate* dựa trên thuộc tính diagonal của các head:
$$
F = \frac { 1 } { S } \sum _ { s = 1 } ^ { S } \underset { 1 \leq t \leq T } { \operatorname { max } } a _ { s, t }
$$
trong đó S và T lần lượt là chiều dài của ground-truth spectrogram và phones, $a_{s,t}$ chỉ phần tử ở hàng $s$, cột $t$ trong ma trận attention. Tác giả sẽ chọn head nào có giá trị F lớn nhất.
- Cuối cùng, tác giả tính $D _ { p h o } = \left [ d _ { 1 }, d _ { 2 }, \ldots, d _ { n } \right ]$ theo công thức gọi là *duration extractor*: 
$$
d _ { i } = \sum _ { s = 1 } ^ { S } \left [ \arg \operatorname { m a x } _ { t } a _ { s, t } = i \right ]
$$

## d. Kết quả:
- **Chất lượng âm thanh**: đạt MOS 3.84, gần bằng các hệ thống như Tacotron2 và Transformer TTS

![image.png](https://images.viblo.asia/faeb0abd-b094-4f00-adcf-6646006a2d85.png)

- **Tốc độ suy luận**: sinh mel-spectrogram nhanh gấp 269.40 lần Transformer TTS. Kể cả có dùng vocoder *WaveGlow*, tốc độ sinh audio của FastSpeech vẫn hơn 38.3. lần so với Transformer TTS

![image.png](https://images.viblo.asia/9157d8c0-0489-411e-b6a5-98d6814f2d93.png)

- **Robustness**: FastSpeech đã hạn chế được các vấn đề lặp hay mất từ ở các autogressive model

![image.png](https://images.viblo.asia/e11edf0e-3662-462d-afe5-ef50f211b427.png)

- **Length Control**: FastSpeech có thể điều chỉnh tốc độ âm thanh bằng cách điều chỉnh độ dài phoneme duration, cũng như thêm ngắt nghỉ giữa các từ bằng cách kéo dài thời lượng của các ký tự cách (space).

# Reference
https://www.georgeho.org/deep-autoregressive-models/

https://arxiv.org/pdf/2004.10454.pdf

https://viblo.asia/p/tim-hieu-kien-truc-text2speech-fastspeech-V3m5WRexlO7

https://viblo.asia/p/bo-doi-anh-em-nha-fast-speech-ong-vua-moi-ke-vi-tacotron-phan-2-924lJRzmlPM