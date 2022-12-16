# Giới thiệu
Như trong mô tả series này mình cũng đã đề cập đến việc nhận dạng văn bản từ một ảnh bất kì trước đây đều chia thành 2 phần đó là phát hiện được bao đóng (bounding box) chứa text sau đó sẽ đưa ảnh đã được cắt dựa trên tọa độ bao đóng đó để đưa nó vào mô hình nhận dạng văn bản. Việc phải sử dụng 2 mô hình tách biệt làm cho việc thời gian gán nhãn, huấn luyện và dự đoán trở nên lâu, rất khó cho việc đưa vào các sản phẩm, thiết bị biên. Do vậy text spotting được ra đời để giải quyết vấn đề này.
# Tổng quan
Bài báo đưa ra một giải pháp mới cho bài toán text spotting, mô hình đã chứng minh được nó có tốc độ xử lí nhanh vì 2 tác vụ là phát hiện và nhận dạng văn bản đều sử dụng chung một mạng backbone sau đó sẽ chia về 2 nhánh. Việc sử dụng chung một mạng trích xuất giúp cho mô hình nhận dạng trở nên đơn giản hơn.
![](https://images.viblo.asia/38edb09c-cc38-4c73-be1f-7685a432efa5.png)

Hình 1: So sánh tốc độ của mô hình

Ở trong mô hình này, bài báo giới thiệu 3 đóng góp như sau:
* Bài báo cung cấp một mô hình huấn luyện end-to-end phát hiện nhanh văn bản theo hướng. Bởi việc chia sẽ tính năng tích chập, mô hình có thể phát hiện và nhận dạng văn bản với ít phép tính hơn, điều này làm cho mô hình có thể chạy bởi thời gian thực.
* Bài báo giới thiệu  Roi Rotate, một hệ thông mới để trích xuất các vùng văn bản từ feature map. Hệ thông là cầu nối thống nhất giữa phát hiện văn bản và nhận dạng văn bản từ đó đưa ra hệ thông end-to-end.
* FOTS cho kết quả rất cao trên các tập benchmarks, như là ICDAR 2015, ICDAR 2017 MLT và ICDAR 2013
# Ý tưởng chính
Mô hình gồm 4 phần chính : Share_Conv, Roi_Rotate, Detector và Recognizer:
![](https://images.viblo.asia/db506a82-cd1c-4a23-88d1-b1d2c9eefee2.png)

Hình 2: Cấu trúc chính của mô hình

Mô hình sử dụng một mạng Shared_Conv để trích xuất đặc trưng cho ảnh sau đó đưa vào nhánh Text Detection có nhiệm vụ phát hiện tọa độ box, Roi_Rotate có nhiệm vụ lấy các đặc trưng và biến đổi không gian từ Shared_Features sử dụng tọa độ bao đóng được dự đoán ra từ nhánh Detection thu được đặc trưng chứa văn bản rồi đưa vào Text Recognition để nhận dạng văn bản cần dự đoán.
## Shared Convolutions
Mạng này sử dụng mạng backbone Resnet50 và kiến trúc Feature Paramid Network (FPN), một kiến trúc rất quan trọng trong hầu hết các mô hình Object Detection hiện này, nó giúp cho mô hình có thể học sâu, các đặc trưng được tổng quát hóa hơn và tránh bị mất các object nhỏ bằng cách tăng tỉ lệ kích thước của featured_map, các bạn có thể tham khảo thêm paper về FPN [tại đây](https://arxiv.org/pdf/1612.03144.pdf).

Kiến trúc chi tiết về mạng Shared Convolutions như sau:
![](https://images.viblo.asia/30d48b13-2eaa-4d70-bd0a-fca4633825e5.png)
Hình 3: Kiến trúc mạng Shared Convolutions

Kiến trúc cũng khá đơn giản, từ ảnh đầu vào đưa qua 5 layer của resnet50 sau đó upsampling lên feature_map có kích thước bằng 1/4 so với kích thước ban đầu. Để upsampling thì mô hình sử dụng module Deconv gồm 1 layer Convolution để giảm số channels của feature và 1 bilinear upsampling. Ở đây thì bài báo sử dụng layer2, layer3 và layer4 của resnet50 để thực hiện ghép với featured_map tương ứng.

Ví dụ : input (N,3,512,512) -> Shared_Conv -> output(N,C,128,128)

Trong đó N là số batch_size, C là số channel đầu ra
## Text Detection Branch
Sau khi nhận được featured_map từ Shared_Conv, đưa nó vào nhành Detection. Ở đây, bài báo sử dụng một layer Convolution để dự đoán văn bản trên từng pixel. Channel đầu tiên để tính toán xác suất của mỗi pixel để nó là một positive example, ở đây các pixel nằm trong vùng được gán nhãn là văn bản được coi là positive. 4 channels tiếp theo, với mỗi pixel là positive, mô hình dự đoán khoảng cách từ nó đến cạnh trên, dưới, trái, phải của bao đóng chưa pixel đó và channel cuối cùng để dự đoán hướng của bao đóng chứa văn bản đó. 

Hàm loss thứ nhất là Cross Entropy để phạt những thằng dự đoán sai về lớp positive và tối ưu mô hình học được những pixel positive. Công thức như sau:

$$L_{cls} = \frac{1}{|\Omega|}\sum_{x \in \Omega}H(p_x,p_x^*)$$
$$=\frac{1}{|\Omega|}\sum_{x\in\Omega}(-p_x^*logp_x - (1-p_x^*)log(1-p_x))$$
Trong đó |.| là số lượng phần tử trong batch đấy, và $H(p_x,p_x^*)$  biểu diễn hàm Cross Entropy giữa $p_x$ và score map được dự đoán ra, $p_x^*$ là nhãn nhị phân cho nhãn text và non-text.

Hàm loss thứ 2 làm hàm regression, bài báo sử dụng kết hợp hàm IoU và hàm phạt góc để tối ưu tọa độ và hướng của box được dự đoán ra. Theo công thức sau:

$$L_{reg}=\frac{1}{|\Omega|}\sum_{x\in|Omega}IoU(R_x,R_x^*) + \lambda_\theta(1-cos(\theta_x,\theta_x^*))$$

Trong đó hàm $IoU(R_x,R_x^*)$ là hàm loss giữa tọa độ bao đóng dự đoán và tọa độ bao đóng nhãn. $\theta_x$ và $\theta_x^*$ biểu diễn hướng góc dự đoán và nhãn.

Cuối cùng thì hàm loss cho nhánh Detection như sau:

$$L_{detect}=L_{cls}+\lambda_{reg}L_{reg}$$
## Roi Rotate
Roi Rotate được sử dụng để trích xuất vùng thông tin trong tọa độ box mà nhãn hay nhánh Detection dự đoán ra. Roi Rotate sử dụng mô ma trận có tên là affine transformation để biển đổi không gian từ xiên về thắng đứng. Ngoài ra, Roi Rotate còn giữ được tỉ lệ của ảnh khi đưa về kích thước cố định, với box có chiều dài nhỏ hơn sẽ được padding thêm.

Dưới đây là ví dụ áp dụng Roi Rotate vào ảnh gốc :
![](https://images.viblo.asia/ecf5228c-f2f7-48d0-b31a-0f711e75cbe1.png)
Hình 4: Áp dụng Roi Rotate vào ảnh gốc

Như ảnh trên các bạn cũng dễ dàng thấy nó biển đổi không gian rất tốt và vẫn giữ được đặc trưng của ảnh. Điều này làm cho việc mô hình Recognizer sẽ trở nên dễ dàng hơn khi học nó. 
## Text Recognition Branch
Ở nhánh này , bài báo sử dụng mô hình CRNN với một vài block convolutional và đi qua mô hình LSTM sau đó được decode bởi CTC. Cấu trúc cụ thể dưới hình sau:

![](https://images.viblo.asia/e58c94aa-3b87-4b5d-9347-2999ac7bd979.png)
Hình 5: Cấu trúc mô hình Recognition

Vì kiến trúc CRNN với CTC rất phổ biến nên mình sẽ không giải thích cụ thể phần này. Các bạn chưa biết có thể tham khảo [bài viết này](https://viblo.asia/p/nhan-dien-text-trong-hinh-anh-voi-crnnctc-Eb85o9rBZ2G).
# Ưu và nhược điểm
## Ưu điểm
* 2 mô hình detection và recognition sử dụng chung một mạng backbone làm cho thời gian trở nên nhanh hơn rất nhiều cả lúc train và test.
* Áp dụng Roi Rotate làm cho mô hình Recognizer học tốt và dễ dàng hơn. Hơn nữa nó còn giúp mô hình có thể nhận dạng các text cong, xiên,...
* Ý tưởng đơn giản nhưng hiệu quả, rất dễ implement.
* Bài báo còn chỉ ra việc kết hợp cả 2 mô hình tốt hơn việc chỉ train mô hình detection ở hình 6.
![](https://images.viblo.asia/26349e96-a78e-4349-882a-b427bb751871.png)
Hình 6: So sánh kết quả mô hình FOTS và mô hình chỉ riêng mô hình Detection

## Nhược điểm
* Kinh nghiệm của mình cho thấy việc các tham số của mạng Share_Conv là rất quan trọng, ở đây có thể nói là kernel, nếu để kernel quá cao(>128) thì việc detection sẽ học rất chậm, ngược lại thì recognition thì học được tốt hơn.
* Với việc chia sẻ mạng trích xuất đặc trưng thì với các dữ liệu có nền và kí tự trong box đó hơi giống nhau sẽ làm cho mô hình không học được.
# Tổng kết
Đây là bài báo đầu tiên trong series về Text spotting của mình, mong các bạn sẽ ủng hộ bằng cách like và subcribes, à quên upvote cho mình nhé (^^) để mình có động lực viết các bài tiếp theo. Xin chào và hẹn gặp lại !