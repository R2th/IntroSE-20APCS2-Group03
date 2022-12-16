![](https://images.viblo.asia/9f54792b-e53e-4c23-ad43-4630404479a8.png)

### I. Giới thiệu
Xin chào các bạn lâu lắm rồi mình mới ngóc lại sau một thời gian khá dài không chia sẻ bất cứ bài viết nào trên Viblo cả, kể cũng hơi buồn và nhớ viết lách. Một phần lý do là do mình lười và cũng không biết chọn chủ đề gì để chia sẻ tới mọi người, phần vì gần đây mình tham gia mấy cuộc thi nên cũng hơi bận thành ra lười hơn :)

Như các bạn cũng biết rồi đó hiện nay các ứng dụng AI ngày càng phát triển và gần hơn với cuộc sống trong các ứng dụng cho người dùng. Hàng trăm nghìn thí nghiệm học máy được thực hiện trên toàn cầu mỗi ngày. Các kỹ sư học máy thực hiện thí nghiệm trên nhiều framework khác nhau như : TensorFlow, Keras, PyTorch.... Do đó các mô hình hiện nay sẽ cần chạy trên các môi triển khác nhau như trên Edge device hay Mobile... nên việc export model sang các định dạng khác nhau là rất cần thiết. Khá tình cờ trong thời gian gần đây mình đang muốn convert model yolov5s từ pytorch sang TF Lite nên mình cũng chia sẻ luôn để các bạn đóng góp. Đừng tiếc gì một cái upvote cho mình nhé. Cảm ơn các bạn :))

Ngoài ra các bạn có thể tham khảo một số bài viết dưới đây : 
* [Deploy mô hình PyTorch lên web browser sử dụng ONNX.js](https://viblo.asia/p/pytorch-tutorial-deploy-mo-hinh-pytorch-len-web-browser-su-dung-onnxjs-YWOZroLRlQ0) - của tác giả Phạm Văn Toàn về deploy mô hình lên web browser trong đó có quá trình convert model từ pytorch sang định dạng onnx. 
* [Tối ưu hóa model với OpenVINO toolkit - Model Optimization with OpenVINO toolkit](https://viblo.asia/p/model-optimization-toi-uu-hoa-model-voi-openvino-toolkit-model-optimization-with-openvino-toolkit-924lJpPzKPM#_openvino-0) - một bài viết không thể tuyệt vời hơn từ tác giả Phan Huy Hoàng, trong bài viết này mình học được rất nhiều thứ kể cả quá trình convert model từ Pytorch sang OpenVINO.
* [Hướng dẫn convert TF Lite không vấp lỗi](https://viblo.asia/p/huong-dan-convert-tf-lite-khong-vap-loi-d-vyDZO3XPZwj) - tác giả Nguyễn Văn Đức, nghe tên tiêu đề thôi cũng thấy bro rồi.

### II. ONNX là gì và tại sao nó lại hữu ích?
![](https://images.viblo.asia/29ffcff8-13ea-4c16-8d0f-e035cdc3683c.png)
Open Neural Network Exchange (ONNX) được sử dụng như một toolkit để chuyển đổi model từ 1 dạng này sang 1 dạng trung gian là .onnx, từ đó có thể gọi và inference với các framework khác nhau, hầu hết hỗ trợ các framework hiện nay. ONNX được phát triển và hỗ trợ bởi cộng đồng các đối tác như Microsoft, Facebook và AWS. Đây là một dự án cộng đồng mã nguồn mở, cung cấp và cho phép các nhà phát triển đóng góp. ONNX giúp giải quyết các thách thức về sự phụ thuộc vào phần cứng liên quan đến mô hình AI và cho phép các mô hình AI tương tự cho một số mục tiêu tăng tốc.
### III. Thực hành
Thôi không dài dòng loằng ngoằng nữa chúng ta cùng vào chi tiết code nhé. Mình sẽ convert model resnet18 từ pytorch sang định dạng TF Lite. Trước tiên mình sẽ convert model từ Pytorch sang định dạng .onnx bằng ONNX, rồi sử dụng 1 lib trung gian khác là [tensorflow-onnx](https://github.com/onnx/tensorflow-onnx) để convert .onnx sang dạng frozen model của tensorflow. 
#### Bước 1: Import các thư viện cần thiết
```python
import os
import shutil
import sys

import cv2
import numpy as np 
import onnx
import torch
import tensorflow as tf 
from PIL import Image
from torchvision import transforms
from torchvision.models import *
from torchsummary import summary
from onnx_tf.backend import prepare
```
#### Bước 2: Chuyển đổi mô hình từ Pytorch sang .onnx
```python
def convert_torch_to_onnx(onnx_path, image_path, model=None, torch_path=None):
    """
        Coverts Pytorch model file to ONNX
        :param torch_path: Torch model path to load
        :param onnx_path: ONNX model path to save
        :param image_path: Path to test image to use in export progress
    """
    if torch_path is not None:
        pytorch_model = get_torch_model(torch_path)
    else:
        pytorch_model = model
    
    image, _, torch_image = get_example_input(image_path)

    torch.onnx.export(
        model = pytorch_model,
        args = torch_image,
        f = onnx_path,
        verbose = False,
        export_params=True,
        do_constant_folding = False,
        input_names = ['input'],
        opset_version = 10,
        output_names = ['output'])
```
Sau khi load model pytorch thực hiện export sang định dạng .onnx sử dụng câu lệnh torch.onnx.export. Với các tham số như mình đã comment trong code các bạn theo dõi nhé. Như trong hướng dẫn này thì mình sử dụng mô hình resenet được load trực tiếp từ torchvision nên mình sẽ không sử dụng hàm get_torch_model nữa. Với hàm get_example_input như sau:
```python
def get_example_input(image_file):
    """
        Load image from disk and converts to compatible shape
        :param image_file: Path to single image file
        :return: Orginal image, numpy.ndarray instance image, torch.Tensor image
    """
    transform = transforms.Compose([
        transforms.Resize((224,224)),
        transforms.ToTensor(),
    ])

    image = cv2.imread(image_file)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(image)
    torch_img = transform(pil_img)
    torch_img = torch_img.unsqueeze(0)
    torch_img = torch_img.to(torch.device("cpu"))
    print(torch_img.shape)
    return image, torch_img.numpy(), torch_img
```
Thực hiện convert model từ pytorch sang .onnx
```python
model = resnet18()
model.eval()

onnx_model_path ='model/model.onnx'
image_path = "path_to_image"

convert_torch_to_onnx(onnx_model_path,image_path, model=model)
```
Chúng ra sẽ được 1 file model với model.onnx lưu tại thư mục model
#### Bước 3: Chuyển đổi mô hình từ .onnx sang tf
```python
def convert_onnx_to_tf(onnx_path, tf_path):
    """
        Converts ONNX model to TF 2.X saved file
        :param onnx_path: ONNX model path to load
        :param tf_path: TF model path to save
    """
    onnx_model = onnx.load(onnx_path)
    onnx.checker.check_model(onnx_model)
    tf_rep = prepare(onnx_model)  #Prepare TF representation
    tf_rep.export_graph(tf_path)  #Export the model
```
Về cơ bản thì cũng chỉ có vài dòng lệnh trước tiên mình sẽ load model bằng onnx.load sau đó chứng model và export. Các bạn chịu khó đọc comment trong code nhé mình giải thích thêm thành ra hơi thừa :)  

Thực hiện convert model từ .onnx sang tf
```python
onnx_path ="model/model.onnx"
tf_path = "model/model_tf"

convert_onnx_to_tf(onnx_path, tf_path)
```
Sau đó trong thư mục model của các bạn sẽ có thư mục model_tf. Các bạn có thể check xem việc convert của mình có đúng hay không như sau nhé:
```python
tf_model_path ="model/model_tf"
image_test_path = "test.png"

_, _, input_tensor = get_example_input(image_test_path) 

model = tf.saved_model.load(tf_model_path)
model.trainable = False

out = model(**{'input':input_tensor})
print(out)
```
#### Bước 4: Chuyển đổi mô hình từ TF sang TF Lite
Phần này các bạn có thể đọc chi tiết hơn từ bài viết của tác giả Nguyễn Văn Đức ở trên nhé. Trong bài viết này tác gỉa đã nêu chi tiết các định dạng chuyển như thế nào và lý thuyết cụ thể cũng như hướng dẫn nên mình xin phép không nhắc lại :)) về cơ bản thì mình lười và cũng thấy nó không cần thiết cho lắm
```python
def convert_tf_to_tflite(tf_path, tf_lite_path):
    """
        Converts TF saved model into TFLite model
        :param tf_path: TF saved model path to load
        :param tf_lite_path: TFLite model path to save
    """
    converter = tf.lite.TFLiteConverter.from_saved_model(tf_path)
    tflite_model  = converter.convert()
    with open(tf_lite_path, 'wb') as f:
        f.write(tflite_model)
```
Thực hiện convert model
```python
tf_model_path = "model/model_tf"
tflite_model_path ="model/model.tflite"

convert_tf_to_tflite(tf_model_path, tflite_model_path)
```
Sau khi chuyển đổi xong mô hình các bạn có thể kiểm tra xem việc mình convert đúng hay không như sau nhé :
```python
tflite_model_path = 'model/model.tflite'
# Load the TFLite model and allocate tensors
interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Test the model on random input data
input_shape = input_details[0]['shape']
input_data = np.array(np.random.random_sample(input_shape), dtype=np.float32)
interpreter.set_tensor(input_details[0]['index'], input_data)

interpreter.invoke()

# get_tensor() returns a copy of the tensor data
# use tensor() in order to get a pointer to the tensor
output_data = interpreter.get_tensor(output_details[0]['index'])
print(output_data)
```

### IV. Kết luận
Vâng bài viết của mình tới đây là kết thúc rồi đó, cảm ơn các bạn đã theo dõi bài của mình cảm ơn các bạn rất nhiều. Đừng tiếc cho mình xin một lượt upvote bạn nhé trông vậy thôi chứ cả ngày viết của mình đó. 
### V. Tài liệu tham khảo 
https://pytorch.org/tutorials/advanced/ONNXLive.html

https://onnx.ai/