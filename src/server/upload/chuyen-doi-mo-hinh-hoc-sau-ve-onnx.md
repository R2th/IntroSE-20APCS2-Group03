Ngày nay bên cạnh nghiên cứu ra các mô hình học sâu chính xác hơn, nhanh hơn thì việc ứng dụng đưa các mô hình học sâu vào trong các sẩn phẩm cũng không kém phần quan trọng và gặp rất nhiều thách thức. Đặc biệt trong việc chuyển từ mô hình được viết bằng framework này sang framework khác vì mỗi thư viện có các hàm và kiểu dữ liệu khác nhau. Ví dụ khi nghiên cứu thử nghiệm mô hình mình thường sử dụng pytorch vì dễ sử dụng và cộng đồng nghiên cứu cũng dùng torch nhiều rất tiện việc tra cứu. Tuy nhiên, khi triển khai thành sản phẩm thì trong một số công cụ lại chỉ hỗ trợ tensorflow do đó để sử dụng cần phải chuyển mô hình từ torch sang tensorflow. Lúc này chúng ta cần một dạng dữ liệu chuẩn cho các hàm cũng như các dạng dữ liệu (data types) để chuyển đổi. Và ONNX là chìa khóa có thể giải quyết tất cả vấn đề trên. Hôm này mình cùng các bạn cùng tìm hiểu về ONNX và cách để chuyển một mô hình từ pytorch sang ONNX nhé.

<p align="center">
    <img src="https://deci.ai/wp-content/uploads/2021/05/Header-deci-pytorch-to-onnx.jpg" >
Ảnh minh hoạ: Nguồn internet
</p>

## 1. ONNX là gì ?
**ONNX** là viết tắt của Open Neural Network Exchange, là một công cụ đóng vai trò như một trung gian hỗ trợ chuyển đổi mô hình học máy từ các framework khác nhau về dạng ONNX cung cấp nhờ đó giúp chúng ta chuyển đổi dễ dàng giữa các framework khác nhau. ONNX hỗ trợ chuyển đổi giữa nhiều framework phổ biến hiện nay như Keras, Tensorfow, Scikit-learn, Pytorch và XGBoost. 

Vậy ONNX có bí quyết gì  để thực hiện điều đó:

* **Cung cấp đồ thị biểu diễn chuẩn**: Mỗi framework khác nhau sẽ có đồ thị biểu diễn tính toán khác nhau. ONNX cung cấp một đồ thị chuẩn được biểu diễn bằng nhiều nút tính toán có thể biểu diễn đồ thị của tất cả framework.
* **Cung cấp kiểu dữ liệu chuẩn**: ONNX cung cấp các kiểu dữ liệu chuẩn bao gồm int8,int16, float16, ...
* **Cung cấp các hàm chuẩn**: ONNX cung cấp các hàm có thể chuyển đổi với các hàm tương ứng trong framework mong muốn. Ví dụ hàm softmax trong torch sẽ được chuyển tương ứng thành hàm softmax trong ONNX.

ONNX cung cấp hai kiểu chuyển đổi:

* **Trace-based**: cung cấp cho mô hình một đầu vào và tiến hành chạy mô hình. Các hàm (operators) được mô hình dùng trong quá trình chạy sẽ được lưu vết lại. Có một chú ý nếu mô hình của bạn là mô hình động ví dụ như mô hình sẽ dùng các hàm khác nhay tùy dữ liệu đầu vào thì mô hình sau khi chuyển đổi sẽ không chính xác. 
* **Script-based**: ở dạng này, mô hình sẽ được export như [ScriptModule](https://pytorch.org/docs/stable/jit.html).

## 2. Chuyển mô hình VietOCR từ pytorch sang ONNX
Chắc các bạn làm về Computer Vision nhiều hẳn đã không còn xa lạ gì nhiều với thư viện VietOCR. Ở phần này, mình sẽ cùng các bạn chuyển đổi VietOCR sang ONNX. Các bạn có thể xem toàn bộ mã nguồn mà mình đã chỉnh sửa riêng cho bài này [ở đây nhé](https://github.com/buiquangmanhhp1999/ConvertVietOcr2Onnx).

**Bước 1: Import thư viện và khởi tạo cấu hình cần thiết**

Ở đây mình chọn cấu hình mình là **cpu**, các bạn có thể dùng gpu  bằng cách đặt **config['device'] = 'cuda:0'**.
```python
import matplotlib.pyplot as plt
from PIL import Image
from tool.config import Cfg
from tool.translate import build_model, process_input, translate
import torch
import onnxruntime
import numpy as np

config = Cfg.load_config_from_file('./config/vgg-seq2seq.yml')
config['cnn']['pretrained']=False
config['device'] = 'cpu'
weight_path = './weight/transformerocr.pth'
```

**Bước 2: Xây dựng mô hình và tải pretrained weight**
```python
# build model
model, vocab = build_model(config)

# load weight
model.load_state_dict(torch.load(weight_path, map_location=torch.device(config['device'])))
model = model.eval() 
```

**Bước 3: Chuyển mô hình về dạng ONNX**

Do mô hình OCR tương đối phức tạp nên mình chia mô hình thành ba phần tương ứng với việc cần chuyển đổi thành 3 graph: phần cnn, phần encoder, phần decoder. Ở mỗi phần đều cần khởi tạo một đầu vào mẫu để chạy cùng mô hình, đầu vào này **cần có kích thước giống như khi dùng thực tế.**

Một số tham số của **hàm export**:

* **model:** mô hình đã được load weight
* **dummy input**: một tensor hoặc một tuple chứa nhiều tensor tượng trưng cho đầu vào của model
* **save_path**: đường dẫn nơi lưu mô hình sau khi convert
* **Input names**: đặt tên cho tham số đầu vào
* **output_names**: đặt tên cho các giá trị trả về 
* **export_params**: Xác định có dùng pretrained weight hay không ? Có đặt là True
* **verbose:** Bằng True thì sẽ in ra đồ thị mô hình dưới dạng con người có thể đọc được

**Export mô hình CNN**
```python
def convert_cnn_part(img, save_path, model): 
    with torch.no_grad(): 
        src = model.cnn(img)
        torch.onnx.export(model.cnn, img, save_path, export_params=True, opset_version=12, do_constant_folding=True, verbose=True, input_names=['img'], output_names=['output'], dynamic_axes={'img': {3: 'lenght'}, 'output': {0: 'channel'}})
    
    return src
    
img = torch.rand(1, 3, 32, 475)
src = convert_cnn_part(img, './weight/cnn.onnx', model)
```

**Export mô hình Encoder**

```python
def convert_encoder_part(model, src, save_path): 
    encoder_outputs, hidden = model.transformer.encoder(src) 
    torch.onnx.export(model.transformer.encoder, src, save_path, export_params=True, opset_version=11, do_constant_folding=True, input_names=['src'], output_names=['encoder_outputs', 'hidden'], dynamic_axes={'src':{0: "channel_input"}, 'encoder_outputs': {0: 'channel_output'}}) 
    return hidden, encoder_outputs
    
hidden, encoder_outputs = convert_encoder_part(model, src, './weight/encoder.onnx')
```

**Export mô hình Decoder**
```python
def convert_decoder_part(model, tgt, hidden, encoder_outputs, save_path):
    tgt = tgt[-1]
    
    torch.onnx.export(model.transformer.decoder,
        (tgt, hidden, encoder_outputs),
        save_path,
        export_params=True,
        opset_version=11,
        do_constant_folding=True,
        input_names=['tgt', 'hidden', 'encoder_outputs'],
        output_names=['output', 'hidden_out', 'last'],
        dynamic_axes={'encoder_outputs':{0: "channel_input"},
                    'last': {0: 'channel_output'}})
                    
device = img.device
tgt = torch.LongTensor([[1] * len(img)]).to(device)
convert_decoder_part(model, tgt, hidden, encoder_outputs, './weight/decoder.onnx')
```
## 3. Kiểm tra mô hình sau khi chuyển đổi
Sau khi hoàn thiện chuyển đổi các mô hình về dạng ONNX, ta thử load mô hình và kiểm tra

```python
import onnx

# load model from onnx
cnn = onnx.load('./weight/cnn.onnx')
decoder = onnx.load('./weight/encoder.onnx')
encoder = onnx.load('./weight/decoder.onnx')

# confirm model has valid schema
onnx.checker.check_model(cnn)
onnx.checker.check_model(decoder)
onnx.checker.check_model(encoder)

# Print a human readable representation of the graph
onnx.helper.printable_graph(encoder.graph)
```

## 4. Dự đoán cùng với ONNX Runtime 
Giới thiệu sương sương một chút, **ONNX Runtime** là bộ công cụ giúp tăng tốc training và inferencing mô hình machine learning trên nhiêu nền tảng và cung cấp giao diện linh hoạt . Một số ưu điểm khi dùng ONNX Runtime như sau:

* Cải thiện hiệu năng của model 
* Có thể chạy trên nhiều phần cứng và hệ điều hành khác nhau 
* Huấn luyện trên  python nhưng triển khai trên  C#/C++/Java app 
* Có thể train và inference mô hình đã tạo trên nhiều framework khác nhau 


Ngoài ra các bạn có thể tìm hiểu thêm [ở đây nhé .](https://onnxruntime.ai/)Sau đây là ví dụ dự đoán mô hình OCR được load từ định dạng ONNX

```python
def translate_onnx(img, session, max_seq_length=128, sos_token=1, eos_token=2):
    """data: BxCxHxW"""
    cnn_session, encoder_session, decoder_session = session
    
    # create cnn input
    cnn_input = {cnn_session.get_inputs()[0].name: img}
    src = cnn_session.run(None, cnn_input)
    
    # create encoder input
    encoder_input = {encoder_session.get_inputs()[0].name: src[0]}
    encoder_outputs, hidden = encoder_session.run(None, encoder_input)
    translated_sentence = [[sos_token] * len(img)]
    max_length = 0

    while max_length <= max_seq_length and not all(
        np.any(np.asarray(translated_sentence).T == eos_token, axis=1)
    ):
        tgt_inp = translated_sentence
        decoder_input = {decoder_session.get_inputs()[0].name: tgt_inp[-1], decoder_session.get_inputs()[1].name: hidden, decoder_session.get_inputs()[2].name: encoder_outputs}

        output, hidden, _ = decoder_session.run(None, decoder_input)
        output = np.expand_dims(output, axis=1)
        output = torch.Tensor(output)

        values, indices = torch.topk(output, 1)
        indices = indices[:, -1, 0]
        indices = indices.tolist()

        translated_sentence.append(indices)
        max_length += 1

        del output

    translated_sentence = np.asarray(translated_sentence).T

    return translated_sentence

# create inference session
cnn_session = onnxruntime.InferenceSession("./weight/cnn.onnx")
encoder_session = onnxruntime.InferenceSession("./weight/encoder.onnx")
decoder_session = onnxruntime.InferenceSession("./weight/decoder.onnx")

session = (cnn_session, encoder_session, decoder_session)
s = translate_onnx(np.array(img), session)[0].tolist()
s = vocab.decode(s)
print("Result: ", s)
```


## 5. Lời kết
Nội dung của bài chỉ là một phần nhỏ về ONNX. Để tìm hiểu và vận dung tốt hơn, các bạn cần thực hành và tìm hiểu nhiều nguồn tài liệu hơn nữa nhé. Có một câu mình rất thích "Mô hình ở trên paper mãi là mô hình chết", việc ứng dụng các mô hình ngày càng trở nên được quan tâm hơn bao giờ hết đồng nghĩa để phát triển được thì các kỹ năng về Engineer là vô cùng cần thiết bên cạnh các kiến thức khác. Cảm ơn các bạn đã theo dõi bài viết của mình.
## Tham khảo
* [How to Convert a PyTorch Model to ONNX in 5 Minutes
](https://deci.ai/resources/blog/how-to-convert-a-pytorch-model-to-onnx/)
* [TORCH.ONNX
](https://pytorch.org/docs/stable/onnx.html)
* [ONNX Runtime Docs](https://onnxruntime.ai/)