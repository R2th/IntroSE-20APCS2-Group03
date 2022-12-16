Những phần nội dung chính sẽ được đề cập trong bài blog lần này:
- OpenVINO?!
- Basic inference workflow
- Model Optimization
- Inference mode
- Benchmarks
- OpenVINO with OpenCV
- OpenVINO model server 
- Cons
- Some other toolkits / platforms
- Some common usecases and conclusion

---

- Loạt seri các bài viết khác về Model Compression, Model Pruning, Multi-tasks Learning by Model Pruning, Model Optimization, tất cả đều được thực hiện bởi các thành viên thuộc Team AI - Sun* R&D Unit:
    - Model Compression, tăng hiệu năng model Deep Learning - Quang Phạm: https://viblo.asia/p/Az45br0z5xY
    - Model Pruning, Bí kíp võ công để tạo mô hình siêu siêu nhỏ li ti với độ chính xác khổng lồ, ông Toàn vlog: https://viblo.asia/p/Qpmleon9Krd
    - Làm thế nào để dùng 1 model cho nhiều công chuyện, Ngọc Trần: https://viblo.asia/p/1VgZv40O5Aw
    - Model Optimization with OpenVINO toolkit: là bài này của mình đây =)) https://viblo.asia/p/924lJpPzKPM

- Trong suốt 1 quá trình làm ra 1 sản phẩm có ứng dụng Machine Learning bên trong đó, thì ngoài việc mô hình hóa thuật toán, các công đoạn liên quan đến engineering hoặc deployment cũng đóng 1 vai trò hết sức quan trọng để hoàn thiện sản phẩm. Có thể kể tới 1 số tác vụ như: model compression, model pruning, model quantization, .. để cắt tỉa, lượng tử hóa model khiến model nhẹ hơn, giảm thiểu thời gian inference mà độ chính xác của model không đổi hoặc sai khác không đáng kể. Sau đó, có thể áp dụng 1 số platform như tensorflow serving để tối ưu hóa performance khi có request tới model:

![Imgur](https://i.imgur.com/qzSB6DR.png)

Reference: https://mobile.twitter.com/mlpowered/status/1194788560357842944

- Tản mạn thêm tí nữa, lí do mình biết tới OpenVINO là trong quá trình thực hiện 1 số dự án tại công ty, cần yêu cầu annotate các dạng data khá đặc thù như: ảnh, video. Sau quá trình tìm tòi và lựa chọn 1 số tool annotate thì thấy rằng cvat khá phù hợp với nhu cầu của project. Có 1 điểm mà mình thấy khá ấn tượng của CVAT là có mode auto annotate dùng OpenVINO để tăng cải thiện đáng kể tốc độ inference time của 1 pretrained model. Do đó, với 1 đoạn video khoảng vài chục phút, Cvat (+OpennVINO) chỉ mất tầm dưới 1 phút để xử lí hết đoạn video đó.

- Góc quảng cáo, 1 số ưu điểm và tính năng khá hay ho của CVAT - annotate platform:
    - Free, OSS, web-based annotation platform cho computer vision task
    - Repo chính của OpenCV Oganization
    - Giao diện đơn giản, dễ dùng
    - REST API document, phù hợp cho việc custom lại chính CVAT để phục vụ cho các mục đích annotate dữ liệu khác nhau.
    - Nhiều annotate mode cho các bài toán khác nhau: Annotate mode (image classification), Interpolation mode (auto annotate mode) và Segmentation mode (auto segmentation mode)
    - Support nhiều định dạng annotate khác nhau: bbox (object detection), polygon (segmentation), polyline, point, auto segment.
    - Support export ra nhiều định dạng: CVAT format, Pascal VOC, YOLO, COCO json (object detection + segmentation), PNG Mask (segmentation), TFRecord (tensorflow object detection API)
    - Support auto-annotate mode cho object detection sử dụng các pretrained model của TF Model Zoo và OpenVINO.
    - Support auto-semi-segmentation với : https://www.youtube.com/watch?v=vnqXZ-Z-VTQ
    - Vì là OSS nên hoàn toàn có thể custom lại với những mục đích và use-case cụ thể. Phần core backend của CVAT được viết bằng Django (Python). 1 ví dụ điển hình là [Onepanel](https://www.onepanel.io/) cũng custom và tích hợp vào hệ thống của họ: https://www.onepanel.io/

- Vậy OpenVINO là gì, và nó có ý nghĩa thực tiễn như thế nào trong việc triển khai mô hình lên hệ thống, hãy cùng tìm hiểu sâu hơn nhé :D 

### OpenVINO?!

- OpenVINO toolkit được xây dựng và phát triển bởi Intel, được tạo ra nhằm mục đích tối ưu hóa hiệu năng của model trên chính các bộ vi xử lý của Intel, cải thiện thời gian inference khi tiến hành deploy model trên rất nhiều các platform khác nhau (CPU / GPU / VPU / FPGA). 

> OpenVINO provides developers with improved neural network performance on a variety of Intel® processors and helps them further unlock cost-effective, real-time vision applications

- OpenVINO là viết tắt của `Open Visual Inference and Neural network Optimization toolkit`. Như các bạn nhìn vào tên cũng có thể đoán được OpenVINO được phát triển với mục đích hướng tới cải thiện khả năng Inference của model, đặc biệt liên quan tới các bài toán về `Visual`, computer vision như: Image Classification, Object Detection, Object Tracking, ...

- 1 số điểm đáng lưu ý của OpenVINO toolkit:
    - Cải thiện performance, khả năng inference time của model
    - Chính vì do Intel phát triển nên support đa platform khác nhau, từ CPU / GPU tới các thiết bị nhúng, dạng edge device như: VPU (Vision Processing Unit), Myriad, Modivius, hay FPGA, .... 
    - Sử dụng chung 1 API cho công đoạn inference, nghĩa là bạn chỉ cần thay đổi mode đầu vào là có thể sử dụng các định dạng IR (Intermediate Representation của OpenVINO) trên nhiều các platform khác nhau.
    - Cung cấp khá nhiều các optimized model, việc convert sang định dạng trung gian IR của OpenVINO cũng khá dễ thực hiện.
    - Hỗ trợ việc gọi các file định dạng IR format (OpenVINO) bằng chính các thư viện phổ biến về xử lí ảnh / computer vision như: OpenCV và OpenVX
    - Gồm 2 phần chính:
        - Deep Learning deployment toolkit: https://github.com/opencv/dldt/
        - OpenVINO model zoo: https://github.com/opencv/open_model_zoo . Cung cấp các optimized model của OpenVINO cho các task cơ bản và các mô hình phổ biến. Tương tự như Tensorflow Model Zoo vậy.

###  Basic Inference Workflow

![](https://docs.openvinotoolkit.org/latest/workflow_steps.png)

- Ta cần convert pretrained model sang định dạng IR hay Intermediated Representation của OpenVINO. IR format gồm 1 số file như sau:
    - frozen-*.xml: `network topology`, là 1 file xml định nghĩa các layer của model, hay network graph.
    - frozen-*.bin: `contains the weights and biases binary data`, file chứa trọng số của model, có thể convert dưới các định dạng: FP32, FP16, INT8

- OpenVINO cũng hỗ trợ việc convert sang IR format cho đa số các framework phổ biến hiện nay như:
    - Caffe
    - Tensorflow
    - MXNet
    - Kaldi
    - ONNX
    - [Keras / Pytorch]

- Ngoài ra, 1 vài các framework khác như: Keras và Pytorch tuy không hỗ trợ convert trực tiếp từ các pretrained model nhưng hoàn toàn có thể thông qua các định dạng trung gian khác:
    - Keras: bạn có thể convert file .h5 của keras sang dạng format frozen graph .pb của tensorflow, rồi từ đó convert frozen model đó sang định dạng IR của OpenVINO. Link tham khảo chuyển đổi từ h5 model sang frozen model của tensorflow: 
        - https://stackoverflow.com/questions/45466020/how-to-export-keras-h5-to-tensorflow-pb
        - https://www.dlology.com/blog/how-to-convert-trained-keras-model-to-tensorflow-and-make-prediction/
    - Pytorch: hiện tại thì OpenVINO chưa thực sự support Pytorch nhưng file model .pth của pytorch có thể convert sang dạng format .onnx của ONNX, rồi từ đó convert sang IR format.

![](https://miro.medium.com/max/1846/1*jxraKe8Y_wy3maQ6TrH7RQ.png)

- 1 luồng xử lý với OpenVINO được mô tả qua hình trên.

###  Model Optimization

- OpenVINO hỗ trợ việc convert sang IR format với các định dạng FP32, FP16, INT8, cũng là 1 dạng của model quantization (hay lượng tử hóa model)

![](https://software.intel.com/sites/default/files/managed/95/b8/numerical-formats.png)

- Việc convert sang các định dạng như FP16, INT8 giúp giảm thiểu dung lượng của model, giảm thiểu bộ nhớ khi tiến hành request, đồng thời giúp handle được nhiều request hơn, tăng tốc độ inference time trong khi độ chính xác của model thay đổi không đáng kể.

- Tuy nhiên, việc hỗ trợ các định dạng còn phụ thuộc vào các thiết bị khác nhau (CPU / GPU / VPU / FPGA)

![Imgur](https://i.imgur.com/jsUZ0fT.png)

- Command mẫu, khá ngắn gọn:

```python
python3 /opt/intel/openvino/deployment_tools/model_optimizer/mo.py --input_model INPUT_MODEL
```

```python
# tensorflow model
python3 mo.py --framework tf --input_model /user/models/model.pb --data_type FP32
python3 mo_tf.py --input_model /user/models/model.pb --data_type FP16
```

- Ví dụ 1 đoạn command export YoloV3 model: https://docs.openvinotoolkit.org/latest/_docs_MO_DG_prepare_model_convert_model_tf_specific_Convert_YOLO_From_Tensorflow.html

```python
python3 /opt/intel/openvino/deployment_tools/model_optimizer/mo_tf.py \
--input_shape [1,416,416,3] \
--input_model ./1/frozen_darknet_yolov3_model.pb \
--tensorflow_use_custom_operations_config /opt/intel/openvino/deployment_tools/model_optimizer/extensions/front/tf/yolo_v3.json \
--batch 1 \
--data_type FP16 \
--output_dir ./openvino \
```

- Mặc định, OpenVINO cung cấp sẵn 1 số các file \*.py cho từng framework khác nhau. 

![Imgur](https://i.imgur.com/pYgD5n3.png)

- Các bạn có thể đọc thêm về các cách export sang IR format khác nhau tại link sau:
    - https://docs.openvinotoolkit.org/latest/_docs_MO_DG_prepare_model_convert_model_Converting_Model.html
    - https://docs.openvinotoolkit.org/latest/_docs_MO_DG_prepare_model_convert_model_Convert_Model_From_TensorFlow.html

- Hiện tại thì OpenVINO support khá nhiều các model và layer phổ biến, tuy nhiên 1 số model được viết thêm các custom layer kèm theo, các bạn có thể đọc thêm phần hướng dẫn tại 1 số link sau:
    - https://docs.openvinotoolkit.org/latest/_docs_MO_DG_prepare_model_customize_model_optimizer_Customize_Model_Optimizer.html
    - https://github.com/david-drew/OpenVINO-Custom-Layers

### Inference mode

- Code mẫu thực hiện inference từ IR format

```python
from openvino import inference_engine as ie
from openvino.inference_engine import IENetwork, IEPlugin

plugin_dir = None
model_xml = './model/frozen_model.xml'
model_bin = './model/frozen_model.bin'

# Devices: GPU (intel), CPU, MYRIAD
plugin = IEPlugin("CPU", plugin_dirs=plugin_dir)
plugin.add_cpu_extension(
    "/opt/intel/openvino/deployment_tools/inference_engine/lib/intel64/libcpu_extension_avx2.so",
)

# Read IR
net = IENetwork.from_ir(model=model_xml, weights=model_bin)
input_blob = next(iter(net.inputs))
out_blob = next(iter(net.outputs))

# Load network to the plugin
exec_net = plugin.load(network=net)
del net

# Run inference
img_fp = 'example.jpg'
image, processed_img, image_path = pre_process_image(img_fp)
res = exec_net.infer(inputs={input_blob: processed_img})
```

### Benchmarks

- Dưới đây là 1 số benchmarks với các định dạng, thiết bị khác nhau:

![](https://gitcdn.xyz/cdn/Tony607/blog_statics/e56cdcd7ab7ab13d7fe996939647eafc6daa4b77/images/openvino/benchmark.png)

- Số frame/second inference khi thực hiện test với các định dạng khác nhau trên InceptionV3 model: .h5 (keras), frozen .pb (tensorflow), .bin (IR-OpenVINO)

![Imgur](https://i.imgur.com/8F5IjKI.png)

![](https://software.intel.com/sites/default/files/managed/5a/d2/iqiyi-dl-model-inference-fig16.png)

- Tốc độ xử lý trên các con chip khác nhau của OpenVINO

![](https://software.intel.com/sites/default/files/managed/2c/58/openvino-fpga-benchmarks062018.JPG)

- FPS khi thực hiện inference trên 1 số Model phổ biến và các thiết bị khác nhau: CPU, GPU, FPGA

###  OpenVINO with OpenCV

![](https://www.learnopencv.com/wp-content/uploads/2018/11/openvino-5.png)

- 1 điểm đáng chú ý của OpenVINO là các file IR format sau khi đã được optimize thì hoàn toàn có thể đọc bởi OpenCV, 1 thư viện khá phổ biến về xử lý ảnh. Trong OpenVINO cung cấp sẵn method `readNetFromModelOptimizer` như hình bên dưới, 2 params truyền vào chính là 2 file .xml và .bin do OpenVINO tạo ra. Từ đó, các bạn có thể thực hiện predict như bình thường.

![Imgur](https://i.imgur.com/wLQuPaN.png)

- Ngoài ra, OpenCV cũng hỗ trợ đọc 1 số định dạng khác từ 1 vài framework phổ biến: Caffe, Tensorflow, Torch, ONNX, .. Ví dụ với Tensorflow thì có thể truyền params như sau:

```python
net = cv.dnn.readNetFromTensorflow('frozen_inference_graph.pb', 'prototxt.pbtxt')
```

###  OpenVINO model server

- Thông thường, sau khi đã huấn luyện và kiểm thử xong mô hình, mình thường sử dụng tensorflow serving để deploy và serving model 1 cách hiệu quả nhất. 1 vài ưu điểm nổi bật của Tensorflow Serving có thể kể tới như sau:
    - Thuộc TFX (Tensorflow Extended) - có thể coi như là 1 hệ sinh thái end-to-end cho việc deploy các ML pipelines.
    - Auto-reload và cập nhật mới nhất các version của model.
    - Serving cùng lúc nhiều model chỉ với 1 file config duy nhất.
    - Handle được lượng truy cập lớn hơn.
    - Hỗ trợ expose cho 2 kiểu giao tiếp gRPC và RestfulAPI
    - Hỗ trợ nhiều định dạng dữ liệu khác nhau: text, image, embedding, .... 
    - Dễ dàng đóng gói và tùy chỉnh tách biệt với phần request tới model

- OpenVINO cũng cung cấp 1 OSS cho việc dễ dàng deploy và serving model dưới dạng IR format. Điểm hay của OpenVINO model server là vẫn giữ được các ưu điểm nổi bật của Tensorflow Serving (serving nhiều model với 1 file config duy nhất, support gRPC + RestfulAPI, ...), cùng với đó là inference time của model cũng được cải thiện đáng kể do model đã được convert dưới dạng IR format tối ưu hơn về mặt hiệu năng.

- Mình có tiến hành 1 số thử nghiệm với 1 số Model + Backbone thông dụng như các model object detection (ssd / faster-rcnn), các mạng feature extraction phổ biến (mobilenet / resnet) thì OpenVINO model server trong mọi trường hợp đều cho kết quả tốt hơn so với Tensorflow Serving, thời gian inference nhanh hơn khoảng 1.3 --> 1.6 lần với OpenVINO.

- Với SSD-Resnet50

![Imgur](https://i.imgur.com/m7H6NH9.png)

- Với Faster-RCNN-Resnet50

![Imgur](https://i.imgur.com/nni53id.png)

- Ngoài ra, OpenVINO còn tích hợp được với 1 số nền tảng thông dụng khác như: Kubernetes, Sagemaker. Chi tiết các bạn có thể xem thêm tại mục `Usage Examples`: https://github.com/IntelAI/OpenVINO-model-server#usage-examples :D 

### Cons 

- 1 vài "hạn chế" của OpenVINO có thể kể tới như:
    - Các custom layer của 1 số model có thể không được support bởi OpenVINO, các bạn có thể thực hiện convert sau như tutorial sau: https://docs.openvinotoolkit.org/latest/_docs_MO_DG_prepare_model_customize_model_optimizer_Customize_Model_Optimizer.html nhưng nhìn chung khá khó khăn.
    - Không phải dạng optimized model (FP16, FP32, INT8) nào của OpenVINO cũng support đa nền tảng

### Some other toolkits / platforms

- NVIDIA TensorRT - Programmable Inference Accelerator - https://developer.nvidia.com/tensorrt : `NVIDIA TensorRT™ is a platform for high-performance deep learning inference`, cũng là 1 toolkit  hỗ trợ cải thiện performance và inference time của model, support rất tốt trên GPU

![](https://developer.nvidia.com/sites/default/files/akamai/deeplearning/tensorrt/trt-info.png)

- ONNX - open format to represent deep learning models - https://onnx.ai/: thực ra mục đích sử dụng của ONNX khác hoàn toàn so với OpenVINO và TensorRT. ONNX được sử dụng như 1 toolkit để chuyển đổi model sang 1 dạng format trung gian là .onnx, từ đó có thể gọi và inference với các framework khác nhau, hỗ trợ hầu hết các framework deep learning hiện nay. Bạn có thể training 1 model với Pytorch, lưu model dưới dạng `.pth`, dùng ONNX để convert sang định dạng `.onnx`, rồi sử dụng 1 lib trung gian khác như: [tensorflow-onnx](https://github.com/onnx/tensorflow-onnx) để convert .onnx sang dạng frozen model của tensorflow. Từ đó có thể thực hiện serving model bằng Tensorflow Serving như bình thường :D 

![](https://www.xenonstack.com/images/wp-content/uploads/xenonstack-onnx-overview-advantages.png)

### Some use-cases and conclusion

- Trên đây là bài giới thiệu về OpenVINO - 1 toolkit hỗ trợ cho việc cải thiện performance và inference time của model. Hi vọng bài blog của mình sẽ giúp các bạn có cái nhìn tổng quan nhất về OpenVINO và có thể áp dụng vào các project hiện tại để cải thiện hiệu năng của hệ thống. 1 vài bài toán điển hình mà việc optimize model đặc biệt quan trọng như: MOT (Multiple Object Tracking), Object Detection, Object Tracking, ... Mọi ý kiến đóng góp và phản hồi vui lòng comment bên dưới bài viết hoặc gửi mail về địa chỉ: hoangphan0710@gmail.com. Cảm ơn các bạn đã theo dõi và hẹn gặp lại trong các bài blog sắp tới! :D 

### Reference

- https://github.com/IntelAI/OpenVINO-model-server/blob/master/docs/benchmark.md
- https://docs.openvinotoolkit.org/latest/index.html
- https://01.org/openvinotoolkit
- https://software.intel.com/en-us/openvino-toolkit
- https://www.learnopencv.com/using-openvino-with-opencv/
- https://github.com/opencv/dldt
- https://github.com/IntelAI/OpenVINO-model-server/
- https://github.com/opencv/openvino_training_extensions
- https://github.com/opencv/open_model_zoo
- https://software.intel.com/en-us/blogs/2018/05/15/accelerate-computer-vision-from-edge-to-cloud-with-openvino-toolkit
- https://www.intel.ai/cpu-inference-performance-boost-openvino/#gs.fqz2tm
- https://medium.com/swlh/how-to-run-keras-model-inference-x3-times-faster-with-cpu-and-intel-openvino-85aa10099d27
- https://software.intel.com/en-us/articles/optimization-practice-of-deep-learning-inference-deployment-on-intel-processors