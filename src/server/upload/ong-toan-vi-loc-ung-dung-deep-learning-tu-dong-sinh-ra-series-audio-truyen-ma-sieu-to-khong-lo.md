Xin chào các cháu, chắc hẳn có rất nhiều cháu, nhất là các cháu đam mê truyện ma kinh dị hẳn không còn lạ lẫm gì với những audio truyện ma nổi tiếng của các bác Nguyễn Ngọc Ngạn, Đình Soạn hay bác Hồng Nhung. Tuy nhiên các ông đấy do là phải thường xuyên đọc nhiều nên cũng mỏi mồm lắm các cháu ạ. Thế nên là khi các cháu muốn nghe một truyện mới cũng phải chờ các ông ấy chữa mồm thì mới hi vọng được. Với cả không phải truyện ma nào các ông ấy đọc các cháu cũng thích phải không, có truyện mình thích thì ổng không đọc, có truyện ổng đọc thì mình lại chẳng thích. Như vậy thật là không thú vị phải không nào? Nếu mà có một cách nào để thích nghe truyện gì thì tự các ông ấy phải đọc cho mình nghe một cách tự động thì tốt quá phải không các cháu. Vậy nên hôm nay ông sẽ hướng dẫn các cháu làm một series truyện ma **siêu to khổng lồ** như thế nhé. Ông làm không phải vì tiền đâu nhưng nếu các cháu cho ông một vote up thì ông vui lắm đấy. OK giờ chúng ta bắt đầu thôi. 

# Định hướng bài toán

Về cơ bản thì hôm nay ông sẽ hướng dẫn các cháu làm một ứng dụng tự động để đọc truyện ma (chỉ là ví dụ thôi, các cháu có thể tự làm với bất kì loại truyện nào khác). Phần lớn trong bài này nói đến công nghệ tổng hợp tiếng nói và các bước thực hiện trong một bài toán tổng hợp tiếng nói. Với giọng đọc của MC Đình Soạn, ông sẽ sử dụng để làm hướng dẫn cho các cháu. Để thực hiện bài toán này chúng ta cần thực hiện các bước như sau: 

* **Chuẩn bị dữ liệu**: Giống như mọi bài toán khác thì bước chuẩn bị dữ liệu là vô cùng cần thiết. Trong bài này ông sẽ hướng dẫn các cháu các bước từ đầu đến cuối đến chuẩn bị cho việc training mô hình. 
* **Tìm hiểu lý thuyết tổng hợp tiếng nói**: Rõ ràng rằng chúng ta cần phải hiểu được cái mà chúng ta đang làm thì chúng ta mới tiến hành làm được phải không nào. Tìm hiểu lý thuyết và làm survey là một bước rất quan trọng trong quá trình làm việc trên thực tế. Các cháu muốn rõ hơn có thể tìm hiểu bài trước đó của ông nhé. Link tại [đây](https://viblo.asia/p/cac-buoc-can-thuc-hien-khi-lam-mot-san-pham-ai-trong-thuc-te-RnB5pyLYKPG)
* **Lựa chọn và hiểu được lý thuyết mô hình Tacotron2**: **Tacotron2** được coi là một trong những phương pháp tốt nhất hiện nay trong lĩnh vực tổng hợp tiếng nói. Chúng ta sẽ cùng nhau tìm hiểu chi tiết về phương pháp này trong các phần tiếp theo nhé. 
* **Tiền xử lý dữ liệu và lựa chọn tham số**: Việc tiền xử lý dữ liệu là bước không thể thiếu và quyết định khá nhiều đến độ chính xác của mô hình AI mà các cháu làm ra. Đặc biệt việc hiểu và lựa chọn các tham số sao cho phù hợp để training ra được mô hình tốt nhất là một điều mà các cháu nên tìm hiểu.
* **Training và đánh giá mô hình**: Đây là bước tất nhiên là quan trọng trong quá trình thực hiện một bài toán AI bởi lẽ nếu không
* **Chạy thử kết quả**: Tất nhiên là sau khi training thì cần thử nghiệm kết quả rồi phải không nào. 
* **Hậu xử lý audio**: Đây là việc khá quan trọng để có được một audio truyện ma hay đó các cháu ạ. Giờ chúng ta sẽ bắt đầu vào chi tiết của từng phần 1 nhé 

# Chuẩn bị dữ liệu 

## Bước 1: Thu thập dữ liệu mẫu 
Bước này là bước quan trọng và cũng là bước mất nhiều thời gian nhất đó các cháu ạ. Để có được dữ liệu **sạch** thì các cháu phải bỏ công sức ra đi tìm những nguồn audio âm thanh có chất lượng thu âm tốt. Ở đây ông sử dụng giọng đọc của MC Đình Soạn - MC truyện ma mà ông khá thích để làm dữ liệu cho các cháu nhé. Các cháu có thể lên trang [nghe đọc truyện](https://truyenaudio.org/giong-doc/mc-dinh-soan.html) để kiếm dữ liệu về. Mỗi một tập truyện dài của Đình Soạn có thể cho chúng ta gần chục giờ dữ liệu. Các cháu chỉ cần làm vài ba truyện là có đến mấy chục giờ dữ liệu thì cũng đủ để training một cái demo nho nhỏ rồi các cháu ạ.

![](https://images.viblo.asia/2a9912e4-97df-4bf7-9bdd-fce4f20e4142.png)

## Bước 2:  Sinh text cho dữ liệu 

Các cháu nhớ việc tải dữ liệu audio về thì dễ dàng thôi nhưng đó mới chỉ là bắt đầu của một câu truyện buồn thê lương, sầu thảm mang tên annotate dữ liệu. Về cơ bản đề annotate dữ liệu cho bài toán **Text To Speech** thì không có cách nào khác là các cháu phải tự mình ghi lại text tương ứng với từng đoạn audio đó. Nếu các cháu tự làm việc này thì thật là quá sức tưởng tượng. Tuy nhiên bằng một vài thủ thuật nho nhỏ cũng sẽ đỡ hơn cho các cháu khá nhiều công sức. Về cơ bản chúng ta sẽ sử dụng một thư viện **speech to text** để chuyển audio với thời gian tương ứng thành text. Tuy nhiên do độ chính xác của thư viện có thể chưa chuẩn xác nên cần chúng ta phải validate và sửa lại text cho chính xác. Công việc này tuy khá mất thời gian nhưng còn đỡ hơn là việc chúng ta ngồi gõ lại từ đầu các cháu ạ. Để làm được điều đó chúng ta sử dụng thư viện [autosub](https://github.com/agermanidis/autosub). Cài đặt đơn giản như sau:

```python
pip install autosub
```

Các cháu nhớ cài **ffmpeg** trước nhé. Sau khi cài đặt xong thì vào trong thư mục chứa các audio đọc truyện ma vừa mới tải về lúc nãy. Chạy từng truyện một. Ví dụ với truyện **ma_bup_be.mp3** thì các cháu chạy lệnh sau:

```go
autosub -S vi -D vi ma_bup_be.mp3
```

Đợi khoảng 1 phút cho nó chạy xong, các cháu sẽ thấy được một file dạng subtitle (**ma_bup_be.srt**) trong đó có thời gian bắt đầu và thời gian kết thúc với text tương ứng của từng câu. Theo nhiều lần thí nghiệm của ông thì về mặt thời gian start và end của từng câu thì rất chính xác còn về text thì có câu chuẩn có câu không nên các cháu cần phải điều chỉnh lại nhé. Có rất nhiều phần mềm hỗ trợ việc chỉnh sửa file subtitle nên các cháu phải chịu khó nghe kĩ lại rồi sửa cho đúng nhé. Lười tải app thì có thể dùng trực tiếp bản online tại [đây](https://www.nikse.dk/subtitleedit/online#)

## Bước 3: Cắt dữ liệu thành các file nhỏ

Do việc training **text to speech** sẽ phải tách dữ liệu thành từng cặp câu nhỏ nên các cháu cần phải cắt các cái file **siêu to khổng lồ** kia thành các file **siêu bé tí hon** nhé. Và chúng ta sẽ cần cắt theo thời gian bắt đầu và kết thúc trong file srt. Và do đã tách ra thành nhiều file nhỏ nên chúng ta cần lưu text tương ứng với filename trong một file csv. Output của chúng ta sẽ có dạng như sau các cháu nhé:

![](https://images.viblo.asia/a2df097a-7d15-4d42-b858-038df5deed29.png)

Để thực hiện điều này các cháu cần thực hiện như sau:

```python
import pysrt
from pydub import AudioSegment

audio_name = 'ma_bup_be.mp3'
sub_name = 'ma_bup_be.srt'
audio_outdir = 'audios'
csv_output = 'output.csv'

song = AudioSegment.from_file(audio_name)
subs = pysrt.open(sub_name, encoding='utf-8')

# Define lambda function convert time to miliseconds 
time_to_ms = lambda x: (x.hours*3600 + x.minutes * 60 + x.seconds) * 1000 + x.milliseconds

# Extract data 
with open(csv_output, 'w') as fd:
    for sub in subs:
        # Get start time, end time in miliseconds
        start_ms = time_to_ms(sub.start)
        end_ms = time_to_ms(sub.end)   
        # Audio extracted file name
        audio_extract_name = '{}/{}_{}_{}.wav'.format(audio_outdir, audio_name, start_ms, end_ms)
        text = str(sub.text)
        # Extract file
        extract = song[start_ms:end_ms]
        # Saving 
        extract.export(audio_extract_name, format="wav")
        # Write to csv file
        fd.write('{}|{}\n'.format(audio_extract_name, text))
```

## Chuẩn hoá dữ liệu 

Sau khi đx chuẩn bị xong dữ liệu giờ các cháu phải làm đến bước tiếp theo đó là chuẩn hoá các cháu nhé. Việc chuẩn hoá này bao gồm chuẩn hoá text và chuẩn hoá audio.
### Chuẩn hoá text 
 Về chuẩn hoá text có một số bước như convert từ chữ hoa về chữ thường, convert từ số sang chữ,  convert thời gian, ngày tháng sang chữ ... Bước này gồm một vài hàm như sau, các cháu có thể tham khảo hoặc custom thêm các hàm khác nữa nhé.

 ```python 
 import re 
from num2words import num2words
from unicodedata import normalize

def vi_num2words(num):
    return num2words(num, lang='vi')

def convert_time_to_text(time_string):
    # Support only hh:mm format
    try:
        h, m = time_string.split(":")
        time_string = vi_num2words(int(h)) + " giờ " + vi_num2words(int(m)) + " phút" 
        return time_string
    except:
        return None

def replace_time(text):
    # Define regex to time hh:mm
    result = re.findall(r'\d{1,2}:\d{1,2}|', text)
    match_list = list(filter(lambda x : len(x), result))

    for match in match_list:
        if convert_time_to_text(match):
            text = text.replace(match, convert_time_to_text(match))
    return text

def replace_number(text):
    return re.sub('(?P<id>\d+)', lambda m: vi_num2words(int(m.group('id'))), text)

def normalize_text(text):
    text = normalize("NFC", text)
    text = text.lower()
    text = replace_time(text)
    text = replace_number(text)
    return text
 ```

 Sau khi các cháu chạy hàm **normalize_text** thì sẽ có kết quả của chuỗi được chuẩn hoá. Tiếp theo chúng ta sẽ đến một bước khá quan trọng đó là chuẩn hoá audio. Ông nhắc lại là đây là bước khá quan trọng nhé. Cháu nào làm sai lúc sau không training được thì đừng kêu nha 

### Chuẩn hoá audio 

Về cơ bản thì muốn dùng được framework **Tacotron 2** dưới đây thì các bạn cần phải thực hiện chuẩn hoá audio về theo format giống như tập dữ liệu tiếng anh. Có một số đặc điểm như:

* Sampling rate: 22050
* Data format WAV Mono 
* Decoding PCMS16LE

Các cháu có thể sử dụng FFMPEG để thực hiện các bước chuẩn hoá này nhé. 

# Tìm hiểu về Tacotron 2

Các cháu thân mến, vậy ông cháu ta đã vừa chuẩn bị xong dữ liệu nào rồi phải không. Tiếp theo chúng ta sẽ đến phần chế biến các dữ liệu đó thành một món ngon **siu siu to khổng lồ** luôn. Nhưng trước hết chúng ta cần phải hiểu lý thuyết cái đã nhé. Mô hình mà chúng ta sử dụng cho bài toán này đó là mô hình **Tacotron2**. Để hiểu rõ hơn về mô hình này chúng ta sẽ lướt qua một vài khái niệm trong đó nhé:

## Tacotron 2 là gì?

Các cháu ạ, **Tacotron 2** chính là một mạng nơ ron nhân tạo được phát minh ra bởi đồng chí Google vào cuối năm 2018 để giải quyết vấn đề tổng hợp giọng nói với một chất lượng có thể coi là **bá cháy** nhất trong những Framework được public hiện tại về Text To Speech. Để hiểu được độ bá cháy của nó thế nào ông mời các cháu xem qua chính các kết quả của nhóm nghiên cứu sau khi thử nghiệm trên tập dữ liệu của tiếng anh tại [đây](https://google.github.io/tacotron/publications/tacotron2/). Và mô hình chung của **Tacotron 2** có thể được minh hoạ trong sơ đồ sau:

![](https://miro.medium.com/max/1248/1*fOfgv91uW0osDqddnJjdww.jpeg)

Nhìn sơ đồ trên chắc hẳn nhiều cháu không hiểu phải không. Để ông túm váy lại cho các cháu dễ hiểu nhé:

> Túm váy lại, kiến trúc **tacontron 2** sử dụng một mô hình **Sequence to Sequence** rất thông dụng trong các bài toán dịch tự động hay image captioning. Tuy nhiên đầu vào của chúng ta là một chuỗi các kí tự và đầu ra tương ứng là một chuỗi các features (ở đây là mel spectrogram) nhưng features này có đặc điểm là nó không chỉ biểu diễn được độ chính xác của phát âm của các từ mà còn biểu diễn được nhiều sự tính chất khác của âm thanh con người như âm lượng, tốc độ và ngữ điệu. Để làm được điều này người ta sử dụng một cơ chế đó là **‘Location sensitive attention**. Kiến trúc này ông sẽ giải thích kĩ hơn trong phần tiếp theo. Sau đó các đặc trưng này được đưa vào một mạng vocoder như Wavenet để chuyển từ mel spectrogram sang spectrogram và chuyển thành audio. 

Đại ý kiến trúc của chúng ta là như vậy. **Tacotron 2** sẽ bao gồm 2 phần đó là Seq2Seq để chuyển từ chuỗi các kí tự sang đặc trưng mel spectrogram và một phần nữa để chuyển mel spectrogram đó thành audio thông qua một wave-net model.  Giờ chúng ta đi tìm hiểu chi tiết từng phần một các cháu nhé 

## Mạng convert Text sang Mel Spectrogram

Như ông đã trình bày phía trên thì dây chính là phần mà chúng ta sẽ xem xét đầu tiên, làm sao chuyển từ mỗi chuỗi các kí tự sáng một chuỗi các đặc trưng **mel spectrograms**. Có một điểm thú vị của **Tacotron 2** đó là các cháu có thể training độc lập hai mô hình Seq2seq này với mô hình Wavenet phía sau nên hôm nay chúng ta sẽ đi làm rõ về phần đầu tiên nhé.  Mô hình này là một mạng nơ ron kết hợp của 3 thành phần là **encoder-attention-decoder** trong đó sử dụng cơ chế  **Location sensitive attention** với mục đích đã nói phía trên. Sơ đồ chung của nó có thể diễn tả trong  hình bên dưới. Giờ chúng ta cùng tìm hiểu chi tiết về các phần này nhé 

![](https://analyticsindiamag.com/wp-content/uploads/2018/01/Master.png)

### Encoder 
Phần đầu tiên là một **Encoder** chuyển đổi chuỗi ký tự thành vector word embeding. Các đặc trưng này sau đó được sử dụng để bộ **Decoder** dự đoán các phổ. Trong trường hợp bài toán của chúng ta cần phải sử dụng tập từ tiếng Việt nên các kí tự mà chúng ta sử dụng cũng là tập các kí tự của tiếng Việt nhé các cháu. Trong sơ đồ trên thì Encoder chính là thành phần màu xanh dương phía bên trái, nó bao gồm các mạng con như sau:

* **Mạng Character Embeding** sử dụng để mã hoá kí tự, kích thước của mạng này tuỳ thuộc vào số lượng từ mà chúng ta config trong từ điển 
* **Mạng 3 Conv** sau khi kết quả đầu ra của mạng embeding sẽ được đưa vào 3 lớp Convolution 1D và mỗi lớp trong số đó chứa 512 filters kích thước 5 x 1 và sau cùng là lớp **Batch Normalization** và hàm kích hoạt **ReLU**
* **Mạng LSTM** Đầu ra của lớp tích chập cuối cùng được đưa vào một mạng LSTM hai chiều chứa 512 units (256 units cho mỗi chiều) để sinh ra các đặc trưng được encoded. 

### Attention 

Mục đích của lớp Attention (màu xám trên hình phía trên) là giúp cho mô hình focus vào không chỉ các đặc trưng ở các step trước đó mà còn là cả đặc trưng tại vị trí hiện tại.  Giải thích nhanh một chút nhé. Giả sử chúng ta có dữ liệu $x = {x1,x2,x3….xN}$ sau khi di qua mạng encoder phía trên cho ra một chuỗi kết quả $h = {h1,h2,h3….hN}$. Một vector $A(i) = Attention( s(i-1), A(i-1), h )$ được gọi là **alignment** trong đó thì $s(i-1)$ là trạng thái decoding trước đó và $A(i-1$ là **alignment** của step trước đó. 

Hàm **Attention** thường được tính toán bằng cách tính điểm riêng các thành phần trong **h** một cách độc lập sau đó normalize kết quả. 

Chúng ta định nghĩa hai hàm đặc trưng sau:

$$G(i) = A(i,0) h(0) + A(i,1) h(1) + ……. + A(i,N) h(N)$$

và 

$$Y(i) = Generate ( s(i-1), G(i) )$$

cuối cùng trạng thái tiếp theo được tính toán dựa vào các hàm trên với cơ chế **Attention** 

$$s(i) = LSTM ( s(i-1), G(i), Y(i) )$$

Phần tiếp theo chúng ta sẽ cùng tìm hiểu về thành phần cuối cùng (màu da cam) được gọi là **Decoder**

### Decoder 

Mục đích của mạng decoder là sinh ra mel spectrogram từ kết quả đầu ra của bước trước. Đầu tiên phải xét đến mạng pre-net với **2 fully connected layers** gồm 256 units và hàm kích hoạt ReLU. Đầu ra của mạng pre-net được concatnate với đầu ra của mạng attention và được đưa qua 2 lớp LSTM với 1024 units. Cuối cùng để predict ra mel spectrogram thì vector đầu ra được đưa qua 5 layers convolution được gọi là post-net. Chắc là lý thuyết đến như vậy là đủ rồi các cháu nhỉ. Giờ chúng ta bắt tay ngay vào phần thực hành thôi nhé.

# Training mô hình 

Rất khuyến khích nếu cháu nào đọc hết phần lý thuyết bên trên nhưng cũng đã đến lúc chúng ta cần phải đi sâu vào thực tế hơn một chút rồi đó. Ở đây để cho dễ dàng chúng ta sẽ sử dụng **Pytorch** để training mô hình Tacotron 2 này. Một trong những repo implêmnt mô hình này tuyệt vời nhất đó là [NVIDIA/tacontron-2](https://github.com/NVIDIA/tacotron2). Trong đó chúng ta cùng đi sâu phân tích cách họ implement mô hình nhé. Các cháu mở file [model.py](https://github.com/NVIDIA/tacotron2/blob/master/model.py) ra sẽ thấy toàn bộ các phần code implement đến mô hình. Ông rất khuyến khích các cháu thử dành ra một vài giờ để ngồi đọc code của họ xem họ xử lý ra sao. Tất cả các phần họ sử dụng đã được trình bày ở phần lý thuyết phía trên nhưng có vẻ như việc đọc code sẽ dễ hiểu hơn rất nhiều so với việc đọc lý thuyết phải không các cháu. 

```python 
class Tacotron2(nn.Module):
    def __init__(self, hparams):
        super(Tacotron2, self).__init__()
        self.mask_padding = hparams.mask_padding
        self.fp16_run = hparams.fp16_run
        self.n_mel_channels = hparams.n_mel_channels
        self.n_frames_per_step = hparams.n_frames_per_step
        self.embedding = nn.Embedding(
            hparams.n_symbols, hparams.symbols_embedding_dim)
        std = sqrt(2.0 / (hparams.n_symbols + hparams.symbols_embedding_dim))
        val = sqrt(3.0) * std  # uniform bounds for std
        self.embedding.weight.data.uniform_(-val, val)
        self.encoder = Encoder(hparams)
        self.decoder = Decoder(hparams)
        self.postnet = Postnet(hparams)

    def parse_batch(self, batch):
        text_padded, input_lengths, mel_padded, gate_padded, \
            output_lengths = batch
        text_padded = to_gpu(text_padded).long()
        input_lengths = to_gpu(input_lengths).long()
        max_len = torch.max(input_lengths.data).item()
        mel_padded = to_gpu(mel_padded).float()
        gate_padded = to_gpu(gate_padded).float()
        output_lengths = to_gpu(output_lengths).long()

        return (
            (text_padded, input_lengths, mel_padded, max_len, output_lengths),
            (mel_padded, gate_padded))

    def parse_output(self, outputs, output_lengths=None):
        if self.mask_padding and output_lengths is not None:
            mask = ~get_mask_from_lengths(output_lengths)
            mask = mask.expand(self.n_mel_channels, mask.size(0), mask.size(1))
            mask = mask.permute(1, 0, 2)

            outputs[0].data.masked_fill_(mask, 0.0)
            outputs[1].data.masked_fill_(mask, 0.0)
            outputs[2].data.masked_fill_(mask[:, 0, :], 1e3)  # gate energies

        return outputs

    def forward(self, inputs):
        text_inputs, text_lengths, mels, max_len, output_lengths = inputs
        text_lengths, output_lengths = text_lengths.data, output_lengths.data

        embedded_inputs = self.embedding(text_inputs).transpose(1, 2)

        encoder_outputs = self.encoder(embedded_inputs, text_lengths)

        mel_outputs, gate_outputs, alignments = self.decoder(
            encoder_outputs, mels, memory_lengths=text_lengths)

        mel_outputs_postnet = self.postnet(mel_outputs)
        mel_outputs_postnet = mel_outputs + mel_outputs_postnet

        return self.parse_output(
            [mel_outputs, mel_outputs_postnet, gate_outputs, alignments],
            output_lengths)
```

## Tạo dữ liệu training và testing 

Việc tiếp theo chúng ta cần thực hiện đó là phân chia dữ liệu thành hai tập training và testing. Bước này khá đơn giản, chúng ta sẽ lấy ngẫu nhiên khoảng 80% của dữ liệu để làm dữ liệu training và 20% còn lại để làm dữ liệu testing. Các cháu phân chia rồi ghi kết quả ra file .txt theo format từng dòng là 

```python 
absolute_audio_path | coressponding text
```

Để làm được điều đó các cháu vào trong thư mục data đã normalize ở phần đầu, thực hiện như sau:

^ Mở file `output.csv` và shuffle random dữ liệu. Việc này khiến cho dữ liệu của chúng ta được trộn lẫn một cách random trước khi chia training và testing 

```python 
# Training testing split
import pandas as pd

data = pd.read_csv('output.csv', sep='|', header=-1)

# Suffle
data = data.sample(frac=1)
```

* Chia training và testing file:

```python 
import os

train_ratio = 0.8
train_index = int(train_ratio * len(data))

with open('training.txt', 'w') as fd:
    for i, fname in enumerate(data[0][:train_index]):
        fd.write('{}|{}\n'.format(os.path.join(os.getcwd(), fname), data[1][i]))

with open('testing.txt', 'w') as fd:
    for i, fname in enumerate(data[0][train_index:]):
        fd.write('{}|{}\n'.format(os.path.join(os.getcwd(), fname), data[1][i]))
```

Sau đó chúng ta sẽ có hai file trong cùng thư mục để thực hiện cho việc training sau này.
## Tạo characters set cho tiếng Việt

Đây là bước rất quan trọng. Các cháu vào trong thư mục 'text/symbols.py' và thay thế dòng sau:

```python 
_letters  = '0123456789aáảàãạâấẩầẫậăắẳằẵặbcdđeéẻèẽẹêếểềễệfghiíỉìĩịjklmnoóỏòõọôốổồỗộơớởờỡợpqrstuúủùũụưứửừữựvwxyýỷỳỹỵz'
```

Đây chính là tập các kí tự tiếng Việt sau khi đã tiến hành normalize text. Các cháu có thể bổ sung thêm các kí tự khác nếu trong tập dữ liệu có thêm các loại kí tự đặc biệt. Nhưng với các trường hợp phổ thông của tiếng Việt thì như vậy là đủ rồi. 

## Cấu hình tham số 

Các tham số của mô hình **Tacotron2** được config tại file [hparams.py](https://github.com/NVIDIA/tacotron2/blob/master/hparams.py) các cháu không nên thay đổi các tham số mặc định của mô hình. Chỉ thay đổi một vài thông số cơ bản sau:

* Các cháu thay dòng 

```python 
ignore_layers=['embedding.weight'],
``` 
thành 
```python 
ignore_layers=[''],
```
Do chúng ta không sử dụng **Transfer Learning** mà sẽ training lại từ đầu trên tập dữ liệu truyện ma tiếng Việt luôn 

* Các cháu thay đổi đường dẫn đến hai file đã sinh ra ở phần tạo dữ liệu training và testing. Nhớ là dùng đường dẫn tuyệt đối nhé 

```python 
training_files='filelists/ljs_audio_text_train_filelist.txt',
validation_files='filelists/ljs_audio_text_val_filelist.txt',
```
* Các cháu đổi lại tham số **text_cleaners** từ **english_cleaners** thành **basic_cleaners** để nó nhận từ điển tiếng Việt mà chúng ta đã config phía bên trên 
* Các cháu đổi lại batct_size nếu như máy của các cháu không đủ tài nguyên GPU. 

OK vậy là bước cấu hình đã xong, giờ chúng ta bắt đầu vào training thôi nhé.

## Training mô hình:

Sau khi tiến hành đầy đủ các bước trên các cháu tiến hành training bằng câu lệnh đơn giản sau:

```python 
 python train.py -o output_vi -l logs
```

Thời gian training thông thường mất khá lâu (khoảng 1 ngày với máy tính GPU 2080 Ti / 5h dữ liệu) thì mới có thể thấy kết quả ở mức chấp nhận được. Các cháu cứ bình tĩnh. Không có điều gì là dễ dàng cả đâu các cháu ạ. Nếu cháu nào lười training thì ông có sẵn pretrained model cho các cháu đây. Các cháu có thể download thử [tại đây](https://drive.google.com/file/d/1C7579RXn-A1jwOBIqJ0KFunD1Htj-1Ro/view?usp=sharing) nhé. Ông mới training với khoảng 13h dữ liệu và khoảng 2 ngày training thôi các cháu nhé. 

# Thử nghiệm mô hình

Sau khi đã training được mô hình các cháu có thể mở file inference.py ra để thử nghiệm mô hình này. Lưu ý rằng các cháu chưa động gì đến phần Wavenet phía sau nên trong phần vocder các cháu để nguyên nhé, chỉ thay các tham số của mô hình Tacotron2 mà chúng ta vừa training xong thôi nhé. Các cháu có thể nghe thử mấy câu nha:

> Các cháu của ông ơi, hôm nay các cháu có khỏe không  [nghe thử tại đây](https://drive.google.com/file/d/1dRaAdqSsl-gYjOQR2FUaCotvecaQqrit/view?usp=sharing)

# Hậu xử lý với nhiều câu
Kết quả trên là thử nghiệm với một câu đơn. Đối với một đoạn văn bản dài chúng ta cần có một vài bước hậu xử lý nữa. Ở đây chúng ta chưa bàn quá sâu về bước này, chỉ đơn giản là ghép các câu lại với nhau và thêm các khoảng ngắt nghỉ thích hợp với dấu chấm và dấu phất thôi. Các cháu có thể tham khảo hai hàm sau 

```python 
import re

def tts(text):    
    text = normalize("NFC", text).lower()
    sequence = np.array(text_to_sequence(text, ['basic_cleaners']))[None, :]
    sequence = torch.autograd.Variable(
        torch.from_numpy(sequence)).cuda().long()

    with torch.no_grad():
        mel_outputs, mel_outputs_postnet, _, alignments = model.inference(sequence)
        audio = waveglow.infer(mel_outputs_postnet, sigma=0.666)
    audio_denoised = denoiser(audio, strength=0.005)[:, 0].cpu().numpy()

    return audio_denoised

def pts(para):
    audio = np.zeros((1,0))
    sentence_ls = para.split(".")

    for sen in sentence_ls:
        sub_stn_ls = re.split(",|;|-|:", sen)
        for sub_stn in sub_stn_ls:
            audio = np.append(audio, tts(sub_stn), axis=1)
            audio = np.append(audio, np.zeros((1, int(hparams.sampling_rate/8)), dtype=np.uint8) , axis=1)
        audio = np.append(audio, np.zeros((1, int(hparams.sampling_rate/4)), dtype=np.uint8) , axis=1)
    return audio
```
Để sinh ra một audio dài các cháu sử dụng lệnh 

```python 
pts("Câu gì đó, gì đó. Câu gì đó nữa, câu gì đó, gì gì đó. Chả biết viết câu gì đó nữa, tóm lại là câu gì đó")
```

Và kết quả các cháu có thể thấy ở [đây](https://drive.google.com/file/d/1s6YubHGGvysl1obgQlyGeNaiJAItbaCu/view?usp=sharing)
# Kết quả cuối cùng
Mời các cháu nghe thử một vài câu nha. 
> Xin chào các cháu, các cháu nhớ cho ông một like để ủng hộ ông nha. Ông đang rất là vui, hôm nay ông sẽ hướng dẫn các cháu làm món bánh siêu to khổng lồ nhé
 [nghe thử tại đây](https://drive.google.com/file/d/1jqwMPjWzZn-zhdXKdF-HE_o8xGahNxvU/view?usp=sharing)

> Ra đường sợ nhất công nông. Về nhà sợ nhất vợ không nói gì  [nghe thử tại đây](https://drive.google.com/file/d/1_5kdZaFEhLRO5u4gMAVgs0D2rqTe9PPk/view?usp=sharing)

Còn đọc truyện ma siêu to khổng lồ luôn nhé các cháu.

> Vì lòng tham mà bọn chúng đã cắt mái tóc của cô gái đã chết đem bán ngoài tiệm làm tóc giả. Từ đây nhiều điều ma quái đã xuất hiện trong ngôi nhà. Cô chị là một kẻ ăn chơi, vào một ngày nọ cô ta nhốt cô em gái của mình vào nhà, ngôi nhà bị cháy nhưng kì lạ thay người chết là người chị chứ không phải người em. Cô chị không hề biết bản thân mình đã chết. Cho đến khi cô em gặp được bố mẹ mình và khóc kêu rằng chị gái đã chết   [nghe thử tại đây](https://drive.google.com/file/d/152j7pi41RFTEEvb-P7jRgkaZKbuVtdbm/view?usp=sharing)
# Tổng kết

Vậy là hôm nay ông đã hướng dẫn các cháu sơ qua các bước để làm một mô hình speech to text. Kết quả bước đầu như vậy là khá tốt nhưng vẫn còn cần phải cải tiến nhiều thứ trong phần  hậu xử lý cũng như làm dữ liệu cho chuẩn xác hơn. Rất hi vọng sẽ là món quà cho các cháu trong mùa hè nóng nực này. Thân ái chào tạm biệt các cháu