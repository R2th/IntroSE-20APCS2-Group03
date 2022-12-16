![](https://images.viblo.asia/622ac011-32a8-4e15-92af-21e517028c53.jpeg)
### I. Giới thiệu
Xin chào các bạn và lại là mình đây, trong thời gian gần đây mình có tìm hiểu về cách triển khai các mô hình deep learning trên các thiết bị Edge và trong bài viết lần trước mình có giới thiệu tới mọi người bài viết về [Hướng dẫn convert Pytorch sang TF Lite](https://viblo.asia/p/huong-dan-convert-pytorch-sang-tf-lite-YWOZrV8RZQ0) các bạn nên đọc qua bài viết này của mình để có thể hiểu được các chuyển đổi mô hình từ Pytorch sang định dạng ONNX như thế nào nhé. Về chủ đề OpenVINO thì tác giải Phan Hoàng cũng có một bài viết [Tối ưu hóa model với OpenVINO toolkit](https://viblo.asia/p/model-optimization-toi-uu-hoa-model-voi-openvino-toolkit-model-optimization-with-openvino-toolkit-924lJpPzKPM) rất hay các bạn có thể tham khảo. Nhiều bạn sẽ đặt câu hỏi là tại sao người ta viết thì viết lại làm gì.... ờ thì đơn giản mình viết để mình có một cơ hội tổng hợp lại kiến thức khi nào quên thì xem nên có gì sau mong anh em chỉ bảo :). <br>
Hiện nay chúng ta đang sống trong thời đại của điện toán đám mây (cloud computing). Mọi thứ bây giờ đều có trên cloud. Các dịch vụ cloud như AWS, Azure, GCP, v.v. đã giúp các thiết bị IoT của bạn dễ dàng bù đắp cho việc thiếu tốc độ xử lý trong máy cục bộ và sử dụng sức mạnh xử lý trên cloud. Nhưng không phải trong mọi trường hợp, bạn có thể tin tưởng vào các dịch vụ cloud. Luôn có nguy cơ rò rỉ dữ liệu cá nhân nhạy cảm của bạn nếu bạn gửi dữ liệu đó lên cloud. Có thể có vấn đề về mạng hoặc vấn đề về độ trễ khi bạn muốn triển khai mô hình AI của mình để đưa ra quyết định trong thời gian thực, chẳng hạn như ô tô tự lái. Bạn thực sự không muốn ô tô tự lái của mình phải chờ phản hồi từ máy chủ trong khi đang lái. Hoặc thậm chí có thể có tình huống mà mạng hoàn toàn không khả dụng. <br>
Sự phát triển của các thiết bị IoT đã làm tăng ứng dụng tiên tiến của AI,  có rất nhiều thiết bị mục tiêu có tài nguyên phần cứng hạn chế mà bạn có thể muốn triển khai mô hình AI. Cạnh có nghĩa là xử lý cục bộ. Điều đó có nghĩa là bạn có thể sử dụng mô hình AI trong một thiết bị và sử dụng sức mạnh xử lý của nó để đưa ra quyết định mà không cần kết nối với dịch vụ đám mây.
### II. Intel OpenVINO là gì?
Tên OpenVINO là viết tắt của Open Visual Inferencing and Neural Network Optimization. Nó là một phần mềm mã nguồn mở được phát triển bởi Intel. Trọng tâm chính của OpenVINO là tối ưu hóa mạng nơ-ron để có thể suy luận nhanh trên các phần cứng khác nhau của Intel như CPU, GPU, VPU, FPGA, IPU, v.v. bằng một API chung. Phần mềm OpenVINO tối ưu hóa kích thước và tốc độ của mô hình để mô hình có thể chạy vượt trội với tài nguyên phần cứng hạn chế. Nó không làm tăng độ chính xác của mô hình. Thay vào đó, đôi khi bạn có thể cần chọn giảm độ chính xác để có hiệu suất cao hơn ở rìa. Gồm 2 phần chính: <br>
1.  Model Optimizer
2.  Inference Engine <br>
### III. Quy trình làm việc của OpenVINO
![](https://images.viblo.asia/c29fa099-a25c-4fd7-851e-a3ab10061291.png)
Các bước như sau:
1. Huấn luyện mô hình
2. Feed model vào Optimizer  với mục đích nén mô hình với đầu ra là Intermediate Representation bao gồm 2 file .xml và .bin
3. Feed Intermediate Representation vào Inference Engine với mục đích để kiểm tra tính tương thích của mô hình trên framework (được sử dụng để huấn luyện mô hình) với mô trường (hardware)
4. Triển khai trên ứng dụng
#### 3.1. Model Optimizer
Model Optimizer để nén mô hình convert model trên các framework khác nhau sang Intermediate Representation là định dạng của OpenVINO. Nó bao gồm:
* frozen-*.xml: network topology, là 1 file xml định nghĩa các layer của model, hay network graph
* frozen-*.bin:  file chứa weight + bias của model, có thể convert dưới các định dạng: FP32, FP16, INT8

Một số framework OpenVINO cung cấp hỗ trợ convert sang định dạng IR như sau:
* Tensorflow
* Caffe
* MXNet
* ONNX(PyTorch and Apple ML)
* Kaldi

Quá trình convert pretrained là một quá trình khá đơn giản. Bạn cần configure optimizer cho từng framework [tại đây](https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_Config_Model_Optimizer.html)  sau đó thực hiện chạy [lệnh](https://docs.openvinotoolkit.org/latest/openvino_docs_MO_DG_prepare_model_convert_model_Converting_Model_General.html).
OpenVINO support khá nhiều [pretrained model](https://docs.openvinotoolkit.org/2019_R1/_docs_Pre_Trained_Models.html) với các mục đích như:
*  Object Detection
*  Object Recognition
*  Segmentation
*  OCR
*  Pose Estimation

OpenVINO cũng cung cấp một số phương thức Optmizer model với mục đích để mô hình nhẹ và nhanh hơn. Trong bài viết này tôi sẽ chỉ trình bày về 3 phương pháp
* Quantization
* Freezing
* Fusion

Về các phương pháp tối ưu mô hình thì có khá nhiều phương pháp các bạn có thể tham khảo các bài viết dưới đây mà tôi khá tâm đắc:
* [Compression model: Áp dụng các kỹ thuật nén để tăng hiệu năng sử dụng các mô hình deep learning(Phần 1) ](https://viblo.asia/p/compression-model-ap-dung-cac-ky-thuat-nen-de-tang-hieu-nang-su-dung-cac-mo-hinh-deep-learningphan-1-Az45br0z5xY) của tác giả Phạm Hữu Quang.
* [[Deep Learning][Optimization] Neural Network Compression - All essential things You Need!](https://viblo.asia/p/deep-learningoptimization-neural-network-compression-all-essential-things-you-need-bWrZnmBbKxw) của tác giả Nguyễn Văn Đạt
##### Quantization
Weights và bias của các mô hình được đào tạo trước trong OpenVINO có các phân biệt khác nhau:
* FP32- Floating Point 32-bit
* FP16- Floating Point 16-bit
* INT8- Integer 8-bit

Các mô hình có độ chính xác cao có thể mang lại kết quả tốt tuy nhiên nó lại khá lớn nên lúc inference sẽ gây ra chậm và tốn tài nguyên khi chạy. Mặt khác với những mô hình có độ chính xác thấp hơn nhưng tốc độ  nhanh hơn nên tùy vào từng yêu cầu cụ thể của bài toán mà các bạn lựa chọn. Quantization quan tâm tới việc tối ưu hóa lưu weight làm sao để hiệu qủa nhất. Bạn có thể đánh đổi một chút độ chính xác để lưu weight từ dạng FP32 xuống FP16 hoặc INT8.
![](https://images.viblo.asia/5e410e15-d6a2-47c7-bebc-8f4d5c193701.jpeg)
##### Freezing
Freezing ở đây khác với Freezing trong quá trình huấn luyện mô hình nên bạn đừng nhầm lẫn nhé. Trong huấn luyện mô hình, điều này có nghĩa là đóng băng các lớp nhất định để bạn có thể tinh chỉnh và đào tạo chỉ trên một tập hợp con của các lớp. Ở đây, nó được sử dụng trong bối cảnh của toàn bộ mô hình và mô hình Tensorflow nói riêng. Đóng băng các mô hình TensorFlow sẽ loại bỏ một số hoạt động nhất định và siêu dữ liệu chỉ cần thiết cho đào tạo. Ví dụ, việc lan truyền ngược chỉ được yêu cầu trong khi đào tạo và không được yêu cầu trong khi inference. Đóng băng mô hình TensorFlow thường là một ý tưởng hay cho dù trước khi thực hiện suy luận trực tiếp hoặc chuyển đổi với Trình tối ưu hóa mô hình. 
![](https://images.viblo.asia/796375ab-7752-4b56-a102-227fcfa2bafa.jpeg)
##### Fusion
Fusion có nghĩa là kết hợp nhiều lớp thành một lớp duy nhất. Ví dụ, một lớp chuẩn hóa hàng loạt, lớp kích hoạt và lớp phức hợp có thể được kết hợp thành một lớp duy nhất.![](https://images.viblo.asia/46dad1d8-dea5-438a-a69a-71567bd0c212.jpeg)
#### 3.2. Inference Engine
 Inference Engine, như tên cho thấy, chạy suy luận thực tế trên mô hình. Nó chỉ hoạt động với Biểu diễn trung gian (IR) đến từ trình tối ưu hóa mô hình hoặc các mô hình được đào tạo trước của Intel đã có mặt ở định dạng IR. <br>
 Giống như Trình tối ưu hóa mô hình, cung cấp các cải tiến trên cơ sở kích thước và độ phức tạp của mô hình để cải thiện bộ nhớ và thời gian tính toán, Công cụ suy luận cung cấp các tối ưu hóa dựa trên phần cứng để có được những cải tiến hơn nữa trong mô hình. <br>
 Bản thân Inference Engine thực sự được xây dựng trên C ++, dẫn đến các hoạt động tổng thể nhanh hơn; tuy nhiên, việc sử dụng trình bao bọc Python tích hợp sẵn để tương tác với nó trong Python là rất phổ biến. <br>
 Hỗ trợ trên tất cả các thiết bị phần cứng của Intel như sau:
* CPU (Central Processing Unit)
* GPU (Graphics Processing Unit)
* NCS-2 (Neural Compute Stick)
* FPGA (Field Programmable Gate Array)

Inference Engine có 2 classes chính như sau :
* IECore-> Python Wrapper để làm việc với IE
* IENetwork -> Lấy các tệp .xml và .bin và load mô hình vào IECore.

Sau khi tải IENetwork lên IECore thành công, bạn sẽ nhận được một Executable Network, nơi bạn sẽ gửi Inference Requests.

Có 2 loại Inference Requests:
* Synchronous
* Asynchronous
##### Synchronous
Trong trường hợp Suy luận Đồng bộ, hệ thống sẽ đợi và không hoạt động cho đến khi phản hồi suy luận được trả về (chặn luồng chính). Trong trường hợp này, chỉ một khung được xử lý cùng một lúc và không thể tập hợp khung tiếp theo cho đến khi hoàn tất suy luận của khung hiện tại
##### Asynchronous
Như bạn có thể đã đoán, trong trường hợp Suy luận không đồng bộ, nếu phản hồi cho một yêu cầu cụ thể mất nhiều thời gian, thì bạn không cần chờ đợi, thay vào đó bạn tiếp tục với quy trình tiếp theo trong khi quy trình hiện tại đang thực thi. Suy luận không đồng bộ đảm bảo suy luận nhanh hơn so với Suy luận đồng bộ.
### IV. Kết luận
Bài viết của mình đến đây là kết thúc hết phần 1 và mình đang viết tiếp phần 2 hướng dẫn thực hiện convert 1 mô hình thực tế từ pytorch hãy follow để xem các bài viết tiếp theo nhé. Cảm ơn các bạn đã theo dõi bài viết của mình. Đừng tiếc gì hãy cho mình xin 1 lượt upvote nha các bạn.