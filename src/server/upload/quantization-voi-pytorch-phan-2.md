# 3. Giải thuật quantization (Tiếp theo)
Tiếp tục phần giới thiệu giải thiệu quantization với pytorch, ta đến thuật toán đạt hiệu quả cao nhất trong ba phương pháp mà mình có đề cập trong bài [Quantization với Pytorch (Phần 1)](https://viblo.asia/p/quantization-voi-pytorch-phan-1-3Q75wv6GlWb): **Quantize Aware Training**.

## 3.3. Quantize Aware Training (QAT)

### 3.1. QAT hoạt động như thế nào ?
**QAT** mô hình hóa những ảnh hưởng của quantization trong suốt quá trình huấn luyện và hiệu chỉnh nó nhờ đó giúp cho phương pháp này đạt hiệu quả cao hơn so với các phương pháp quantization khác. 

**QAT** bao gồm 4 bước như sau:

1. Huấn luyện mạng với các phép tính ở dạng dấu phẩy động.
2. Chèn các lớp *Fake quantization Q* vào trong mạng vừa được huấn luyện xong.
3. Thực hiện finetune mô hình. Lưu ý trong quá trình này gradient vẫn được sử dụng dưới dạng dấu phẩy động.
4. Thực hiện inference bằng cách loại bỏ Q và load weight đã được quantize.

![](https://images.viblo.asia/bbe234c9-c8f2-44ca-8b9e-da9156826197.png)

### 3.2. Lớp fake quantization 
**QAT** hoạt động bằng cách chèn những lớp *Fake Quantization* vào trong mô hình.  
$Q_{fake}(x) =  D(Q(x))$

trong đó:

- Q là một hàm quantization sẽ ánh xạ các giá trị ở số phẩy động về dạng số nguyên.
- D là hàm dequantization  sẽ ánh xạ ngược các giá trị đã được quantize bằng hàm Q về dạng số phẩy động. 

Gọi chúng là các lớp **Fake Quantization** bởi vì chúng mô hình phỏng quantization  bằng cách sử dụng các phép tính ở dạng số phẩy động. Và tất nhiên quá trình này diễn ra ở hai chiều **forward** và **backward propagation.**

Ví dụ ta có một lớp **Fake Quantization** có công thức hoạt động như sau: 

$Q_{fake}(x, s, b) = \frac{s}{2^{b - 1}}clamp(round(\frac{2^{b - 1}x}{s}), -2^{b - 1}, 2^{b - 1} - 1)$

trong đó:

- x là input tensor ở dạng số phẩy động
- s là một scale factos
- b là số bit để quantize
- round: hàm làm tròn
- clamp(x, min, max): hàm giới hạn x trong khoảng [min, max]

Ở đây ta nhận thấy phần tử **$\frac{s}{2^{b - 1}}$** đóng vai trò như hàm dequantization trong khi phần còn lại là hàm quantization. **Scale factor s** ở đây đóng vai trò là giới hạn biểu diễn của x sau khi quantize. Giá trị hàm Q sẽ nằm trong khoảng [-s, s]. Nếu s nhỏ thì sẽ giới hạn dải x có thể biếu diễn sau khi quantize tuy nhiên sai số sẽ nhỏ. Còn nếu s lớn thì ngược lại.

Ở phần bên dưới bài viết, chúng ta cùng đi vào phần thực hành sử dụng phương pháp này với thư viện [vietocr](https://github.com/pbcquoc/vietocr). Nhưng tạm thời chúng ta sẽ gác lại để lướt qua một vài điểm cần lưu ý khi sử dụng quantization với pytorch.

## 4. Một số lưu ý 
Phần này mình có thấy bài viết [A developer-friendly guide to model quantization with PyTorch](https://spell.ml/blog/pytorch-quantization-X8e7wBAAACIAHPhT) khá đầy đủ, mình tham khảo và bổ sung chi tiết hơn theo ý hiểu của mình. Các bạn có thể đọc bài viết gốc bằng cách vào trực tiếp đường dẫn bên trên.

### 4.1. Quantzation chỉ là phương pháp dùng khi inference.
<p align="center">
    <img src="https://www.researchgate.net/profile/Masoud-Riazi/publication/280575557/figure/fig1/AS:381526572322818@1467974431446/Architecture-of-three-layer-feed-forward-ANN-with-back-propagation-algorithm.png" >
Ảnh minh họa forward and backpropagation (Nguồn Internet)
</p>

Như chúng ta đã biết các số dấu phẩy động có khả năng biểu diễn chính xác hơn nhiều so với các số nguyên (int8). Do đó **int8** không thể dùng trong quá trình lan truyền ngược (backpropagation) vì quá trình này rất nhạy cảm với biểu diễn không chính xác của weight và dẫn tới mô hình bị phân kỳ.

### 4.2. Độ chính xác sẽ giảm sau khi quantization ? 

Quantization thường làm giảm độ chính xác của mô hình. Đây là vấn đề tradeoff giữa độ chính xác và thời gian xử lý. Tuy nhiên, việc chúng ta đánh đổi bao nhiêu độ chính xác để giảm thời gian xử lý phụ thuộc vào rất nhiều yếu tố như kích thước mô hình ban đầu, kĩ thuật quantization hay việc chúng ta quantize bao nhiêu lớp trong mô hình và lớp đó có ảnh hưởng như thế nào đến toàn bộ mô hình,.... Ví dụ một mô hình có kích thước lớn thường có  nhiều kết nối dư thừa hay mô hình vẫn biếu diễn tốt với ít kết nối hơn do đó quantize sẽ không gây ảnh hưởng quá nhiều. Những yếu tố này đều được cần nghiên cứu kĩ càng để chúng ta có thể thực hiện tối ưu mô hình một cách tốt nhất.

### 4.3. Không cần thực hiện quantization đối với toàn bộ mô hình.

Chúng ta hoàn toàn có thể quantize một phần mô hình và xác định lớp nào được quantize hay không. Để thực hiện điều này, Pytorch cung cấp cho chúng ta hai cách để thực hiện như sau:

- Tắt / bật chế độ quantization của từng lớp bằng gán các giá trị .**qconfig** của các lớp với một giá trị **qconfig_dict** cụ thể.  Ví dụ conv1.qconfig = None nghĩa là conv1 không được quantize hoặc conv1.qconfig = custom_qconfig có nghĩa là sử dụng **custom_qconfig** thay cho config mà ta đã chỉ định sẵn.
- Dùng **QuantStub và DeQuantSub**. 

```python 
import torch

# define a floating point model where some layers could be statically quantized
class M(nn.Module):
    def __init__(self, model_fp32):
        super(M, self).__init__()
        
        # QuantStub converts tensors from floating point to quantized.
        # This will only be used for inputs.
        self.quant = torch.quantization.QuantStub()
        
        # DeQuantStub converts tensors from quantized to floating point.
        # This will only be used for outputs.
        self.dequant = torch.quantization.DeQuantStub()
        
        # FP32 model
        self.model_fp32 = model_fp32

    def forward(self, x):
        # manually specify where tensors will be converted from floating
        # point to quantized in the quantized model
        x = self.quant(x)
        x = self.model_fp32(x)
        
        # manually specify where tensors will be converted from quantized
        # to floating point in the quantized model
        x = self.dequant(x)
        return x
```

### 4.4. Pytorch chỉ hỗ trợ quantization với CPU

Bạn có thể vô tư thực hiện huấn luyện với Quantize Aware Training ở trên các thiết bị GPU tuy nhiên khi thực hiện inference sử dụng quantization bắt buộc bạn phải sử dụng cpu hoặc trên mobie.


## 5.  Thực hành quantize mô hình VietOCR

Mọi người chắc hẳn đã quen thuộc với [thư viện VietOCR](https://github.com/pbcquoc/vietocr) - một thư viện OCR cho tiếng Việt. Ở bài trước, mình cũng đã có bài [Chuyển đổi mô hình học sâu về ONNX](https://viblo.asia/p/chuyen-doi-mo-hinh-hoc-sau-ve-onnx-bWrZnz4vZxw) hướng dẫn mọi người chuyển mô hình VietOCR qua dạng ONNX - một định dạng được Pytorch hỗ trợ tối ưu cũng như dễ dàng trong triển khai mô hình. Ở trong bài viết hôm nay, mình cũng sẽ giới thiệu phương pháp quantization giúp cho mô hình VietOCR chạy nhanh hơn trên những thiết bị CPU hoặc edge device. Các bạn có thể xem toàn bộ phần mã nguồn [ở đây](https://github.com/buiquangmanhhp1999/QuantizeVietOcrWithPytorch) nhé.  Mình cùng bắt tay vào làm nào :)

### 5.1. Định nghĩa cấu hình huấn luyện
Mình sẽ định nghĩa các tham số dùng cho lúc huấn luyện mô hình ở đây.
```python
config = Cfg.load_config_from_name('vgg_seq2seq')
dataset_params = {
    'name':'hw',
    'data_root':'./data_line/',
    'train_annotation':'train_line_annotation.txt',
    'valid_annotation':'test_line_annotation.txt'
}

params = {
         'print_every':200,
         'valid_every':15*200,
          'iters':20000,
          'checkpoint':'./weights/transformerocr.pth',    
          'export':'./weights/transformerocr.pth',
          'metrics': 10000
         }

config['trainer'].update(params)
config['dataset'].update(dataset_params)
config['device'] = 'cuda:1'
config['cnn']['pretrained']=False
config['weights'] = "./weights/transformerocr.pth"
```

### 5.2. Chuẩn bị mô hình cho quantize aware training.
Khởi tạo mô hình và load dữ liệu từ weight có sẵn.
```python
# get pretrained model
model, vocab = build_model(config)
weights = config['weights']
model.load_state_dict(torch.load(weights, map_location=torch.device(device)))
```
Mô hình bên dưới  sẽ giúp chúng ta quantize một phần nhỏ trong toàn bộ mô hình
```python
class QuantizedCNN(nn.Module):
    def __init__(self, model_fp32):
        super(QuantizedCNN, self).__init__()
        
        # QuantStub converts tensors from floating point to quantized.
        # This will only be used for inputs.
        self.quant = torch.quantization.QuantStub()
        
        # DeQuantStub converts tensors from quantized to floating point.
        # This will only be used for outputs.
        self.dequant = torch.quantization.DeQuantStub()
        
        # FP32 model
        self.model_fp32 = model_fp32

    def forward(self, x):
        # manually specify where tensors will be converted from floating
        # point to quantized in the quantized model
        x = self.quant(x)
        x = self.model_fp32(x)
        
        # manually specify where tensors will be converted from quantized
        # to floating point in the quantized model
        x = self.dequant(x)
        return x
  ```
  
  Thực hiện ***fuse layer***. **Fuse layer** là kỹ thuật gộp các layer riêng lẻ như **Conv + Bathcnorm + Relu**, **Conv + Relu**, **Conv + BatchNorm**, **Linear + Relu** vào một nhóm nhờ đó có thể tính toán trong một lần qua đó cải thiện hiệu suất và tăng tốc độ tính toán. 
```python
model = model.train()
for m in model.cnn.model.modules():
    if type(m) == nn.Sequential:
        for n, layer in enumerate(m):
            if type(layer) == nn.Conv2d:
                torch.quantization.fuse_modules(m, [str(n), str(n + 1), str(n + 2)], inplace=True)
 ```
Trong Pytorch, quantization chỉ hỗ trợ cho một số hàm do đó phụ thuộc vào phương pháp mà mình sử dụng hoặc thiết bị backend mà chúng ta định sử dụng là cpu hay mobie nên chúng ta cần phải chọn cấu hình cho phù hợp.
 ```python
 quantized_cnn = QuantizedCNN(model_fp32=model.cnn)
quantized_cnn.qconfig = torch.quantization.get_default_qconfig("fbgemm")

# Print quantization configurations
print(quantized_cnn.qconfig)

# the prepare() is used in post training quantization to prepares your model for the calibration step
quantized_cnn = torch.quantization.prepare_qat(quantized_cnn, inplace=True)

model.cnn = quantized_cnn
```

### 5.3. Huấn luyện mô hình
```python
model.train()
model = model.to(device)
trainer = Trainer(qmodel=model, config=config, pretrained=False)
trainer.train()
```

Và chúng ta thu được kết quả là kích thước mô hình đã giảm từ 85MB xuống còn 29MB. Phụ thuộc vào bộ dữ liệu sử dụng huấn luyện sẽ dẫn đến kết quả khác nhau. Trong bài hướng dẫn này, mình sử dụng tạm thời bộ dữ liệu mẫu do thư viện VietOCR cung cấp. 

### 5.4. Inference
Ở bước này, chúng ta sẽ sử dụng mô hình đã được quantize để dự đoán.
```python
# define config for inference mode
config = Cfg.load_config_from_name('vgg_seq2seq')
# Pytorch support only cpu device
config['device'] = 'cpu'
config['cnn']['pretrained']=False
config['weights'] = "./weights/quantize_transformerocr.pth"

# create quantized model
qmodel, vocab = build_model(config)

## fuse layer
qmodel = model.train()
for m in qmodel.cnn.model.modules():
    if type(m) == nn.Sequential:
        for n, layer in enumerate(m):
            if type(layer) == nn.Conv2d:
                torch.quantization.fuse_modules(m, [str(n), str(n + 1), str(n + 2)], inplace=True)
  
 # prepare model for quantize aware training
quantized_cnn = QuantizedCNN(model_fp32=qmodel.cnn)
quantized_cnn.qconfig = torch.quantization.get_default_qconfig("fbgemm")

# Print quantization configurations
print(quantized_cnn.qconfig)

# the prepare() is used in post training quantization to prepares your model for the calibration step
quantized_cnn = torch.quantization.prepare_qat(quantized_cnn, inplace=True)
quantized_cnn = quantized_cnn.to(torch.device('cpu'))
qmodel.cnn = torch.quantization.convert(quantized_cnn, inplace=True)   

# create detector
detector = Predictor(config, qmodel=qmodel)
  ```
  Tải bộ dữ liệu mẫu do thư viện VietOCR cung cấp
  ```
  # Download sample image
! gdown --id 1uMVd6EBjY4Q0G2IkU5iMOQ34X0bysm0b
! unzip  -qq -o sample.zip
  ```
  Tiến hành dự đoán kết quả
  ```python
img = './sample/031189003299.jpeg'
img = Image.open(img)
plt.imshow(img)
s = detector.predict(img)
s
```

## 6. Lời kết
**Đến đây nhiều bạn chắc chắn sẽ có thắc mắc tại sao mình mới quantize phần CNN còn phần encoder và decoder thì sao ?** Bởi vì QAT chỉ tốt nhất cho những kiến trúc convolution. Còn đối với kiến trúc như LSTM, GRU, Transformer, chúng ta thường sử dụng phương pháp dynamic quantization. Cách này tương đối đơn giản. Các bạn có thể xem lại bài viết trước để nắm rõ thêm. Cảm ơn các bạn đã theo dõi bài viết của mình và đừng quên upvote cho mình. Nếu có bất cứ thắc mắc nào về bài viết, các bạn hãy comment xuống bên dưới để được giải đáp nhé!


## Tham khảo.

1. [A developer-friendly guide to model quantization with PyTorch](https://spell.ml/blog/pytorch-quantization-X8e7wBAAACIAHPhT)
2. [Aspects and best practices of quantization aware
training for custom network accelerators](https://iiw.kuleuven.be/onderzoek/eavise/starttodeeplearn/aspects-and-best-practices-of-quantization-aware-t.pdf)