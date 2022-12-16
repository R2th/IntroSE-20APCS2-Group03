# 1. FastSpeech2 có gì mới?
**FastSpeech** - một non-aggressive model - có khả năng sinh ra giọng nói nhanh vượt trội so với các aggressive model thời bấy giờ với chất lượng gần tương đương nhờ xử lý khá tốt vấn đề **one-to-many** (1 phoneme ứng với nhiều mel-spectrogram). Dù vậy, nó vẫn có các nhược điểm:
- Việc xây dựng teacher-student pipeline theo phương pháp [Knowledge distillation](https://arxiv.org/pdf/1503.02531.pdf) rất phức tạp và tốn thời gian huấn luyện
- Mel-spectrogram sinh ra từ teacher model bị mất thông tin
- Phoneme Duration được trích xuất bởi attention map của teacher model không đủ chính xác

[FASTSPEECH 2: FAST AND HIGH-QUALITY END-TO-END TEXT TO SPEECH](https://arxiv.org/pdf/2006.04558.pdf) đã đề xuất mô hình FastSpeech2 nhằm giải quyết các vấn đề của FastSpeech cũng như giải quyết tốt hơn vấn đề **one-to-many**. Các giải pháp được trình bày:
- Để giúp training pipeline đơn giản hơn và tránh thất thoát thông tin do đơn giản hóa data trong teacher-student distillation => Huấn luyện trực tiếp model bằng giá trị ground-truth thay vì output được đơn giản hóa từ teacher model
- Sử dụng thêm các giá trị như *pitch* (cao độ), *energy* (năng lượng), tăng tính chính xác trong việc dự đoán phoneme duration => mel-spectrogram output vẫn giữ được nhiều thông tin từ text sequence input.
- Để đơn giản hóa quá trình tổng hợp giọng nói, giảm độ trễ trong quá trình suy luận (inference) tác giả giới thiệu mô hình **FastSpeech2s**, với output là speech waveform thay vì mel-spectrogram.

# 2. Kiến trúc FastSpeech2 và 2s

![image.png](https://images.viblo.asia/7027fe84-9fdb-466a-9b88-cc10621d4ad0.png)

## 2.1. Tổng quan mô hình (hình a)
Sau 2 thành phần cơ bản là **Phoneme Embedding** và **Positional Encoding**, phần **Encoder** chuyển chuỗi thành *chuỗi âm vị ẩn*. **Variance adaptor** thêm các thông tin như *duration*, *pitch* và *energy* vào chuỗi âm vị ẩn, trước khi chuỗi này bị chuyển thành chuỗi *mel-spectrogram* bởi **Mel-spectrogram Decoder** (với FastSpeech2s, chuỗi đầu ra sẽ là *waveform* được tạo bởi **Waveform Decoder**)

Ngoài việc kiến trúc cơ bản của **Encoder** và **Mel-spectrogram Decoder** là khối *FFT Block* đã được giới thiệu trong [bài trước](https://viblo.asia/p/tom-tat-vai-mo-hinh-text-to-speech-p2-jvElaRVx5kw), kiến trúc FastSpeech2 có nhiều sự cải thiện nhằm khắc phục các điểm yếu của FastSpeech:
- Loại bỏ teacher-student distillation pipeline và huấn luyện model trực tiếp bằng ground-truth mel-spectrogram, giúp tránh mất mát thông tin và tăng chất lượng âm thanh
- Thay vì chỉ dùng Duration Predictor, tác giả sử dụng module **Variance adaptor** bao gồm duration, pitch và energy predictor. Cụ thể hơn, *duration predictor* sử dụng phoneme duration thu được từ [forced alignment](https://www.researchgate.net/publication/319185277_Montreal_Forced_Aligner_Trainable_Text-Speech_Alignment_Using_Kaldi) để huấn luyện (chính xác hơn trích xuất từ attention map của teacher model - được kiểm chứng qua thực nghiệm). Hơn nữa, *pitch* và *energy predictor* có thể giúp bổ sung thông tin về âm thanh
- Nhằm đơn giản hóa pipeline, tác giả giới thiệu **FastSpeech2s**, mô hình có thể sinh waveform trực tiếp từ văn bản mà không cần tới acoustic model hoặc vocoder.

Bây giờ, mình sẽ trình bày rõ hơn về **Variance adaptor** cũng như phương pháp trực tiếp sinh waveform

## 2.2. Variance adaptor (hình b)
Nhiệm vụ của **variance adaptor** là thêm các thông tin về pitch, energy, duration... vào *chuỗi âm vị ẩn*. Trong quá trình huấn luyện, có 2 tác vụ thực hiện song song:
- Lấy giá trị ground-truth của duration, pitch, energy (trích xuất từ bản ghi) làm đầu vào cho chuỗi ẩn để dự đoán giọng nói
- Lấy giá trị ground-truth của duration, pitch, energy trên để làm target nhằm huấn luyện duration, pitch, energy predictor - dùng để suy luận giọng nói (inference target speech).

Như đề cập bên trên, **variance adaptor** gồm 3 phần với kiến trúc tương tự nhau  (hình c): đều gồm 2 lớp *1-D Convolution*, mỗi lớp sử dụng *ReLU activation*, theo sau là lớp *normalization* và *dropout*. Cuối cùng là lớp *Linear* để chuyển các trạng thái ẩn thành chuỗi đầu ra. Giờ hãy đến với chi tiết các phần:
### a. **Duration predictor**: 
Nhiệm vụ: Dự đoán thời lượng các âm vị dựa trên đầu vào là các *chuỗi âm vị ẩn*, và chuyển về dạng logarithm. Duration predictor sử dụng duration được trích xuất từ [Montreal forced alignment](https://www.researchgate.net/publication/319185277_Montreal_Forced_Aligner_Trainable_Text-Speech_Alignment_Using_Kaldi) làm target huấn luyện (thay vì autogressive TTS model như FastSpeech), và được tối ưu với MSE loss.
### b. **Pitch predictor**: 
Các hệ thống TTS trước đó mà có dự đoán pitch (DeepVoice, DeepVoice2,...) thường dự đoán trực tiếp *pitch contour* (đường viền cao độ). Tuy vậy, do đặc thù phương sai cao của pitch, phân phối của các giá trị pitch dự đoán được thường khá lệch so với phân phối của các giá trị ground-truth pitch. 

Do vậy, nhóm tác giả sử dụng **continous wavelet transform (CWT)** nhằm phân tích pitch contour thành pitch spectrogram, và lấy pitch spectrogram làm targer huấn luyện cho pitch predictor. Khi suy luận, pitch predictor dự đoán các pitch spectrogram trước khi chuyển chúng thành pitch contour sử dụng **inverse continous wavelet transform (iCWT)**. Ta có thể mô tả cụ thể hơn:

![image.png](https://images.viblo.asia/53818217-96fa-4988-b819-5d522402273d.png)

- Đầu tiên, sử dụng [PyWorldVocoder](https://github.com/JeremyCCHsu/Python-Wrapper-for-World-Vocoder) để trích xuất *pitch contour*. Sau đó, sử dụng phép nội suy tuyến tính (linear interpolation) để dự đoán các unvoiced frame (chả biết dịch thành gì) của pitch contour trước khi chuyển pitch contour sang thang đo logarithm. Normalize chúng để tuân theo *phân phối chuẩn Gauss* $\mathscr N(0, 1)$ - và lưu lại trung bình và phương sai để có thể tìm lại pitch contour ban đầu.
- Tiếp theo, chuyển pitch contour thành pitch spectrogram. Cho hàm pitch contour liên tục $F_0$, ta chuyển thành pitch spectrogram $W \left ( \tau, t \right )$ thông qua **CWT**:
$$
W \left ( \tau, t \right ) = \tau ^ { - 1 / 2 } \int _ { - \infty } ^ { + \infty } F _ { 0 } \left ( x \right ) \psi \left ( \frac { x - t } { \tau } \right ) d x
$$
với $\psi$ là [Mexican hat mother wavelet](http://www.dim.uchile.cl/~fmaldonado/Documentos/trabajos/lab/sep94-choice-of-wavelets.pdf), $F _ { 0 } \left ( x \right )$ là giá trị pitch ban đầu ở vị trí $x$, $\tau$ và $t$ lần lượt là tỷ lệ (scale) và vị trí của wavelet
- Ta có thể phục hồi $F_0$ bằng **iCWT**:
$$
F _ { 0 } \left ( t \right ) = \int _ { - \infty } ^ { + \infty } \int _ { 0 } ^ { + \infty } W \left ( \tau, t \right ) \tau ^ { - 5 / 2 } \psi \left ( \frac { x - t } { \tau } \right ) d x d \tau
$$

Để đưa pitch contour làm 1 phần đầu vào trong quá trình huấn luyện và suy luận, ta *lượng tử hóa (quantize)* $F_0$ ở mỗi vị trí thành 256 giá trị theo logarithm rồi chuyển đổi thành *pitch embedding vector* $p$ và thêm vào chuỗi ẩn.

### c. Energy predictor
*Energy* được tính bằng L2-Norm của biên độ mỗi *Short time Fourier Transform (STFT) frame*. Sau đó giá trị năng lượng được lượng tử hóa thành 256 giá trị, chuyển đổi thành *energy embedding* $e$ và thêm vào chuỗi ẩn (tương tự pitch). Energy predictor được sử dụng để dự đoán giá trị energy ban đầu thay vì giá trị lượng tử hóa

## 2.3. FastSpeech2s
FastSpeech2s sử dụng module **Waveform decoder** (hình d) nhằm sinh waveform trực tiếp từ văn bản mà không cần tới acoustic model hoặc vocoder. Về cơ bản, cấu trúc của waveform decoder được dựa trên [WaveNet](https://arxiv.org/pdf/1609.03499.pdf), nhưng các tác giả đã sử dụng vài kỹ thuật "hay ho":
- Sử dụng adversarial training (đề cập trong [Parallel WaveGan](https://arxiv.org/pdf/1910.11480.pdf)) trong waveform decoder để buộc nó tự khôi phục phase information (mình cũng không hiểu lắm) 
- Tận dụng mel-spectrogram decoder của FastSpeech2 nhằm trích xuất đặc trưng văn bản

# 3. Kết quả
## 3.1. Đánh giá chung
**Chất lượng âm thanh**: MOS của FastSpeech2 cao hơn và MOS của FastSpeech2s tương đương với Tacotron2 và Transformer TTS. Đặc biệt, FastSpeech2 vượt trội hơn hẳn FastSpeech, thể hiện rằng các giả thiết từ đầu của tác giả là chính xác

![image.png](https://images.viblo.asia/97d7f59c-8262-4b6a-916c-03b8a7a1eecc.png)

**Tốc độ huấn luyện và suy luận**: do loại bỏ teacher-student distillation pipeline nên FastSpeech2 có thời gian huấn luyện nhanh hơn 3.12 lần so với FastSpeech. Ta không so sánh thời gian huấn luyện của FastSpeech2s, vì bảng trên chỉ bao gồm thời gian huấn luyện acoustic model, không tính thời gian huấn luyện vocoder. Tốc độ suy luận của FastSpeech tuy nhanh hơn FastSpeech2 một chút nhưng vẫn chậm hơn FastSpeech2s - đương nhiên cả 3 đều nhanh hơn rất nhiều so với Transformer TTS

![image.png](https://images.viblo.asia/74607fd4-085a-4e1f-b74c-6216eb8f5eec.png)

## 3.2. Ablation study (cắt bỏ thành phần)
Tác giả xét sự quan trọng của các thành phần như *pitch* và *energy* bằng cách loại bỏ chúng khỏi mô hình và so sánh performance:

![image.png](https://images.viblo.asia/364c276a-7b6e-4ea0-a8ab-9b66007d4fed.png)

Ở cả 2 mô hình FastSpeech2 và FastSpeech2s, việc loại bỏ *energy* hoặc *pitch* (hoặc cả 2) đều gây sụt giảm chất lượng âm thanh (đặc biệt là pitch)

# Reference 
[FASTSPEECH 2: FAST AND HIGH-QUALITY END-TO-END TEXT TO SPEECH](https://arxiv.org/pdf/2006.04558.pdf)