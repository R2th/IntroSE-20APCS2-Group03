Các nội dung sẽ được đề cập trong bài blog lần này 
- What is Saliency Prediction?
- Usecases cụ thể
- 1 số tập dữ liệu về saliency prediction
- Mô hình thuật toán
- Các phương pháp đánh giá
- Áp dụng vào bài toán (flower) image search retrieval
- Tổng kết
- Tài liệu tham khảo 

- Link github: https://github.com/huyhoang17/flowers102_retrieval_streamlit

# What is Saliency Prediction?!

- Khi nhìn vào bức ảnh này, bạn bị thu hút hay tập trung vào vùng nào trên bức ảnh đầu tiên?

![Imgur](https://i.imgur.com/hID4Jnt.jpg)

- Có lẽ đa số các bạn đều đồng tình với mình rằng vùng trọng tâm của bức ảnh là phần bông hoa sen trên đó. Cũng dễ hiểu bởi sự khác biệt về màu sắc và vị trí so với phần background còn lại. 

- 1 thuật ngữ hay được sử dụng để nói về vấn đề này là **Saliency Prediction**. **Saliency Prediction** chính là việc mô phỏng sự tập trung của mắt người khi nhìn vào 1 bối cảnh cụ thể. Thông thường, mắt người khi nhìn vào 1 bức ảnh sẽ không có khả năng bao quát toàn bộ bức hình ngay trong lần tiếp xúc đầu tiên. Mà sẽ bị tập trung vào 1 số chủ thể / đối tượng "chính". Ở đây, chủ thể chính có thể được biểu hiện bởi nhiều cách giúp mắt người dễ nhận biết và chú ý hơn như: sự khác biệt về màu sắc, độ tương phản, độ trong mờ của các đối tượng, sự khác biệt về kích thước, hình dáng; ... Hay còn được gọi với 1 cái tên khác là: **Human-eye Fixation**

# Usecase cụ thể

- Gần đây, mình có biết đến và dùng thử 1 ứng dựng khá hay ho của google là [Google-lens](https://lens.google.com/), đều có app trên cả 2 nền tảng là android và iOS cả.  Về cơ bản, Google-lens support 3 modules chính:
    - **OCR**: bao gồm phần **text detection** và **text recognition**. Mình có dùng thử thì thấy khá ổn, text bắt theo dạng rotated-box và cho dù mình có xoay ngược chữ lại thì google-lens vẫn nhận biết được và nhận diện ra đúng chữ đó. Khá thú vị
    - **Multi-lingual Machine Translation**: từ phần OCR, ứng dụng cho phép translate các đoạn text về ngôn ngữ mong muốn, support khá nhiều các ngôn ngữ
    - **Image Search Retrieval**: phần module này cho phép bạn chụp ảnh đồ vật hoặc các món ăn. Từ đó, kết quả trả về sẽ là các sản phẩm tương đồng, kèm theo cả thông tin sản phẩm khá chi tiết

- Về 2 phần OCR và Machine Translation, nếu có cơ hội mình sẽ đề cập kĩ hơn về bài toán cụ thể trong các blog sắp tới. Gần đây, mình có viết 1 bài về OCR cho **nhận diện chữ cổ Nhật Bản**, các bạn có thể tham khảo: https://viblo.asia/p/V3m5WPngKO7

- Về phần **Image Search Retrieval**, lúc mình sử dụng app thì có để ý là phần nhận diện của google-lens thường tập chung vào 1 hoặc 1 vài chủ thể chính trong bức ảnh và được biểu thị bằng các vòng tròn trắng xanh như hình dưới

![Imgur](https://i.imgur.com/uXvaYDP.jpg)

- Sau một hồi research thì mình có tìm hiểu được keyword về `Saliency Prediction` từ bài blog [này](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2018/Smart-Auto-Cropping-of-Images.html) của Twitter. Để minh họa rõ hơn cho điều mình muốn nói, các bạn có thể xem ảnh bên dưới

![Imgur](https://i.imgur.com/0KktXf3.png)

- Mục đích là để focus được chính xác vào vùng chủ thể "chính" của bức ảnh, chứa các vùng hình ảnh có thể gọi là "quan trọng" hơn, thay vì đơn giản là auto scale vào chính giữa bức hình. Với mục đích cải thiện trải nghiệm người dùng khi lướt mạng xã hội. Vùng chủ thể "chính" tương tự như hình ảnh bông hoa sen mình có minh họa ở đầu bài. 

- Dưới đây là 1 số hình ảnh về **Saliency Prediction** của 1 số model và Ground-truth (GT) 

![Imgur](https://i.imgur.com/zQhpnz9.jpg)

# 1 số tập dữ liệu về saliency prediction 

- Vì bài tóan khá đặc thù nên phần dữ liệu cũng đặc biệt không kém. 1 số tập dữ liệu như **MIT1003** và **CAT2000**, dữ liệu được tiến hành thu lại và annotate bằng **eye-tracking**, tức có 1 thiết bị dùng để ghi lại các chuyển động của mắt, log lại xem các vùng mắt đã điều hướng tới hoặc di chuyển từ vùng này qua vùng khác. Tuy nhiên, cách annotate dữ liệu này khá khó thực hiện và cần những thiết bị đặc thù mới làm được

![Imgur](https://i.imgur.com/JEmJjSL.png)

- Ngoài ra, còn 2 cách annotate data khác dễ thực hiện hơn. Thứ nhất là [**Web-based eye tracking**](https://arxiv.org/abs/1504.06755), sử dụng các facial landmark để thu dữ liệu

![Imgur](https://i.imgur.com/XVKEU3j.png)

- Thứ hai là **Mouse Movement**, được sử dụng với tập dữ liệu [salicon.net](salicon.net). Nhìn chung, cách annotate dữ liệu này đơn giản và dễ thực hiện hơn so với các cách trên, khi không cần phải sử dụng 1 thiết bị chuyên dụng bên ngoài. Qua thực nghiệm, người ta cũng thấy rằng phần annotate theo cách này cũng khá tương đồng với các cách tiếp cận trước

>>> We designed a new mouse-contingent multi-resolutional paradigm based on neurophysiological and psychophysical studies of peripheral vision to simulate the natural viewing behavior of humans. The new paradigm allowed using a general-purpose mouse instead of eye tracker to record viewing behaviors. The experiment is deployed on the Amazon Mechanical Turk to enable large-scale data collection. The aggregation of the mouse trajectories from different viewers indicates the probability distribution of visual attention.

![Imgur](https://i.imgur.com/K9NN0wT.png)

- Các bạn có thể xem thêm tại link sau http://salicon.net/explore/

# Mô hình thuật toán 

- Đây là kiến trúc mạng CNN được sử dụng trong paper [Contextual Encoder-Decoder Network for Visual Saliency Prediction](https://arxiv.org/abs/1902.06634)

![Imgur](https://i.imgur.com/31fmr5c.png)

- Nhìn chung, kiến trúc có dạng encoder-decoder, thoạt nhìn có vẻ giống 1 mạng CNN cho bài toán segmentation. Về cơ bản, có 1 số điểm đáng chú ý về phần model như sau:
    - Ảnh input với size (240, 360, 3). Output là 1 saliency map, kích thước (240, 360, 1),  biểu thị cho các vùng saliency của bức hình
    - Gồm 3 module chính: Encoder, ASPP, Decoder

- **Encoder** ngoài các lớp conv và pooling thông thường thì còn sử dụng thêm các atrous convolution (ở đây là các layer Dilation-15/16/17 trên hình) với dilatation_rate = 2

- **ASPP hay Atrous Spatial Pyramid Pooling**: là 1 module được kế thừa và xây dựng trong các mô hình DeepLabv2 + v3 cho bài toán semantic segmentation. Như tên gọi, ASPP sử dụng các atrous convolution với các dilation_rate khác nhau để có thể lưu giữ và kết hợp nhiều thông tin từ **global context** hơn.

- **Decoder** cũng ko quá đặc biệt với các upsampling layer sử dụng bilinear-interpolation. Với output có kích thước bằng với input image, với 1 channel biểu thị cho saliency map

- Model không sử dụng hàm loss phổ biến là Cross-Entropy, mà sử dụng hàm loss **Kullback-Leibler Divergence**. Thực chất công thức của Cross-Entropy và Kullback-Leibler Divergence có mối liên hệ với nhau, KL divergence dùng để kiểm định độ khác nhau giữa 2 phân bố xác suất. Về phần này mình sẽ đề cập kĩ hơn bên dưới

### Atrous Convolution (Dilated Convolution)

![Imgur](https://i.imgur.com/B1P3cnA.gif)

![Imgur](https://i.imgur.com/sc1R3Sl.gif)

- Atrous Convolution được sử dụng trong 2 mô hình phổ biến về Semantic Segmentation là DeepLabv2 + v3, đặc biệt Deeplabv3 hiện tại là 1 trong những model SOTA cho task về Semantic Segmentation.

- Atrous Convolution sử dụng 1 khái niệm gọi là **dilation rate**. Hay trong lúc thực hiện elemenwise multiplication giữa feature map và filter, ta sẽ bỏ qua (k - 1) điểm trên feature map, với k là dilation rate. Các conv bình thường được sử dụng các dilation rate mặc định bằng 1. Dilation rate càng lớn thì vùng "nhin thấy" trên feature map càng rộng và thu được càng nhiều thông tin từ **global context**

- Như hình minh họa bên trên, hình vuông màu xanh dương biểu thị input feature map, hình vuông màu xanh lá biểu thị output feature map, kernel vẫn là 3x3 nhưng với dilation rate = 2 nên có vùng bao quát như 1 kernel kích thước 5x5 nhưng số lượng param thì ít hơn (3x3=9 so với 5x5=25)

- Atrous (Dilated Convolution) cũng được sử dụng trong các domain khác như signal processing, TTS, Machine Translation, ... 1 vài ví dụ tiêu biểu như mô hình WaveNet cho Text-to-Speech và ByteNet sử dụng CNN cho bài toán NMT (Neural Machine Translation). Cả 2 đều sử dụng Dilated Convolution nhằm capture được lượng thông tin dài và rộng hơn từ input mà số lượng parameter lại ít hơn (ít hơn trong trường hợp sử dụng cùng 1 kernel size CNN nhưng thu được vùng receptive field lớn hơn) 

![Imgur](https://i.imgur.com/iXsv3En.png)

### ASPP (Atrous Spatial Pyramid Pooling)

- Module ASPP trong được sửa lại 1 số tham số so với ASPP từ mô hình Deeplabv3

![Imgur](https://i.imgur.com/7um4Sus.png)

- Với ảnh input (240, 320, 3), sau khi qua encoder sẽ thu được 1 feature map với kích thước 30 * 40 * 1280 (**output_stride = 16**)

- Input feature map của ASPP là feature map với kích thước 30 * 40 * 1280 (sau khi thực hiện concatenate feature map từ 3 pooling layer có strides=1, với kích thước (h, w) giống nhau, depth size lần lượt là 256, 512, 512), việc dùng pooling layer có strides=1 để feature map không bị giảm kích thước. Sau đó, input feature map được đưa riêng rẽ vào 5 branch, nhằm lưu giữ được tối đa các **spatial feature** từ ảnh đầu vào, hay **multi-scale image information**

- 3 branch đầu ứng với 3 conv layer với kernel_size = (3, 3) nhưng với lần lượt các dilation_rate = 4, 8, 12; gồm 256 channels. Trong paper gốc của DeepLabv3, các dilation_rate = 6, 12, 18

- 1 conv layer với kernel_size = (1, 1), 256 channels

- 1 branch được gọi là **image-level context** để lưu giữ global-context của feature map (phần này paper mượn lại ý tưởng từ 1 paper khá lâu trước đó là [ParseNet_1506](https://arxiv.org/abs/1506.04579)). Sử dụng **Global Average Pooling** lên input feature map, thu được 1 feature map với kích thước = (1, 1, 1280), đưa qua 1 conv với kernel_size (1, 1) với 256 channels, rồi thực hiện Un-pooling (với bilinear upsampling) để thu được feature map kích thước (30, 40, 256) tương tự như tại các branch khác 

![Imgur](https://i.imgur.com/qMvwceh.png)

- Cuối cùng, thực hiện concatenate feature map từ 5 branch lại (thu được 1 feature map với kích thước (30, 40, 1280)). Tiếp tục sử dụng 1 conv layer, kernel_size = (1, 1), với 256 channels để giảm kích thước đầu ra của feature map xuống còn (30, 40, 256) 

### Contextual Saliency model 

- Phần model mình có code lại bằng keras, tương tự model mình họa trong paper. Các bạn tham khảo thêm về model tại link sau: [models.py](https://github.com/huyhoang17/flowers102_retrieval_streamlit/blob/master/models.py)

### Loss function

- KL divergence còn được gọi với 1 cái tên khác là **relative entropy**, là độ đo sự khác nhau giữa 2 phân bố xác suất, xác định lượng thông tin trung bình thêm vào dùng để mã hóa thông tin của phân bố Q thay cho phân bố P. Thực chất, 2 công thức giữa cross-entropy và KL divergence có mối liên hệ với nhau. Với:

$$
\begin{aligned}
D_{KL}(P || Q) = \sum{P(x)log(\frac{P(x)}{Q(x)})} \\ 
= \sum{P(x)logP(x)} - \sum{P(x)logQ(x)} \\
= H(P, Q) - H(P)
\end{aligned} 
$$

- Với $P, Q$ lần lượt là 2 phân phối đúng và phân bố hiện tại (hay y_true và y_pred). $H(P, Q)$ là cross entropy của P và Q. 

Reference
- https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence
- https://thetalog.com/statistics/ly-thuyet-thong-tin/

- Trong keras cũng đã có sẵn KL loss

```python
keras.losses.kullback_leibler_divergence(y_true, y_pred)
```

- hoặc có thể custom lại hàm loss function như sau

```python
def kullback_leibler_divergence(y_true, y_pred):
    y_true = K.clip(y_true, K.epsilon(), 1)
    y_pred = K.clip(y_pred, K.epsilon(), 1)
    return K.sum(y_true * K.log(y_true / y_pred), axis=-1)
```

Reference
- https://datascience.stackexchange.com/questions/69839/non-categorical-loss-in-keras
- https://www.machinecurve.com/index.php/2019/12/21/how-to-use-kullback-leibler-divergence-kl-divergence-with-keras/
- https://stats.stackexchange.com/questions/265966/why-do-we-use-kullback-leibler-divergence-rather-than-cross-entropy-in-the-t-sne/265989

### Các phương pháp đánh giá

- 1 vài metric được sử dụng trong bài toán saliency prediction như:  shuffled AUC (SAUC), information gain (IG), normalizedscanpath saliency (NSS), and linear correlation coefficients (CC). Các bạn có thể tham khảo thêm tại các đường link sau: 
    - http://salicon.net/challenge-2017/
    - https://github.com/cvzoya/saliency/tree/master/code_forMetrics

# Áp dụng vào bài toán (flower) image search retrieval 

- Trong phần này mình sẽ áp dụng vào 1 bài toán khá phổ biến là **image search retrieval**. Tập dữ liệu mình sử dụng là: Oxford 102 dataset gồm 102 loài hoa khác nhau https://www.robots.ox.ac.uk/~vgg/data/flowers/102/

- Nói sơ qua về phần model 1 chút. Các bạn có thể hoàn toàn làm theo cách đơn giản là train 1 model classify cho 102 loại hoa, và lấy feature vector ở các layer gần cuối để thực hiện feature extraction cho ảnh.

- Còn ở đây mình sử dụng 1 cách tiếp cận khác, mặc dù cách thiết kế mạng vẫn giống với 1 bài toán image classify bình thường nhưng ở đây mình còn sử dụng thêm 1 module từ mô hình ArcFace (1 trong những model SOTA hiện tại cho face recognition). Các bạn có thể tham khảo thêm tại paper sau: [ArcFace](https://arxiv.org/abs/1801.07698)

- Nhìn chung, sau khi thực hiện training xong model, mỗi ảnh đầu vào sẽ được encode thành 1 vector 128D (sau khi đã bỏ phần cuối của mạng). Công việc cần làm tiếp theo là tìm kiếm các ảnh tương đồng nhất với giả định rằng 2 ảnh càng tương đồng thì khoảng cách euclide giữa 2 vector càng nhỏ

- Chú ý, ở đây vì tập dữ liệu không quá lớn, nên với mỗi query vector, mình thực hiện tính toán với tất cả các vector có trong database (khoảng 6k). Nhưng trên thực tế, tính toán exhaustive search như vậy hoàn toàn không tối ưu cho 1 bài toán lớn hơn, với hàng triệu tới hàng chục triệu ảnh

- 1 số phương pháp về **Approximate Nearest Neighbor Search** (ANN Search) các bạn có thể tìm hiểu như: LSH (local sensitive hasing), PQ (Product Quantization), ... Các thư viện phổ biến hỗ trợ như: [Faiss](https://github.com/facebookresearch/faiss) hoặc [Annoy](https://github.com/spotify/annoy)

- 1 số các bài Viblo khác các bạn có thể tham khảo như:
    - [Image Retrieval với thư viện Facebook AI Similarity Search](https://viblo.asia/p/LzD5ddJo5jY) - Đoàn Bảo Linh
    - [Làm quen bài toán nhận dạng khuôn mặt với Approximate Nearest Neighbors Oh Yeah(Annoy)](https://viblo.asia/p/RQqKL9V6Z7z) - Nguyễn Trung Sơn
    - [Phương pháp encode cho hệ thống tìm kiếm hình ảnh với Elasticsearch](https://viblo.asia/p/bWrZnwymlxw) - Nguyễn Quang Trung B

- Quay trở lại với phần ví dụ về Image Search Retrieval, mình có build 1 web demo nhỉ, sử dụng streamlit cho phép upload ảnh lên và trả về các ảnh tương đồng. Phần source code các bạn có thể tham khảo thêm tại link sau: https://github.com/huyhoang17/flowers102_retrieval_streamlit . Ví dụ với ảnh bông hoa sen ở phần đầu bài viết. Khi chưa áp dụng **Saliency Prediction** thì các ảnh trả về khá lung tung và sai nhãn

![Imgur](https://i.imgur.com/uyrrUmD.png)

- Thực hiện saliency prediction thu được saliency map như sau

![Imgur](https://i.imgur.com/WeI4Tgo.jpg)

![Imgur](https://i.imgur.com/lKk1iks.png)

- Còn phía dưới là kết quả sau khi đã sử dụng **Saliency Prediction** để crop vào vùng chủ thể chính của bức ảnh. Kết quả ảnh trả về chính xác hơn nhiều rồi

![Imgur](https://i.imgur.com/PbBtod7.png)

- Ảnh ví dụ khác

![Imgur](https://i.imgur.com/ez9IIV4.jpg)

![Imgur](https://i.imgur.com/kSt8bIH.png)

- Và kết quả sau khi thực hiện saliency prediction

![Imgur](https://i.imgur.com/pyjlPiw.png)

# Tổng kết

- Trong bài blog này, mình cũng đã giới thiệu về 1 số điểm chính của Saliency Prediction và hướng xây dựng model từ paper [Contextual Encoder-Decoder Network for Visual Saliency Prediction - 1902](https://arxiv.org/abs/1902.06634). Trong các bài blog sắp tới hi vọng có thể chia sẻ thêm cho các bạn về 1 số module khác như: OCR (text detection + text recognition), Neural Machine Translation, ...

- Mọi thắc mắc, phản hồi vui lòng comment bên dưới hoặc gửi mail về địa chỉ: hoangphan0710@gmail.com . Cảm ơn các bạn đã theo dõi và hẹn gặp lại trong các bài blog sắp tới! :smiley: 

# Reference

- Link github: https://github.com/huyhoang17/flowers102_retrieval_streamlit

- [Contextual Encoder-Decoder Network for Visual Saliency Prediction
](https://arxiv.org/abs/1902.06634)

- https://github.com/alexanderkroner/saliency

- https://blog.twitter.com/engineering/en_us/topics/infrastructure/2018/Smart-Auto-Cropping-of-Images.html

- https://medium.com/@kelam.goutam/image-saliency-prediction-using-deep-learning-models-part-1-580c0801f38b

- http://salicon.net/explore/

- https://www.machinecurve.com/index.php/2019/12/21/how-to-use-kullback-leibler-divergence-kl-divergence-with-keras/

- https://www.reddit.com/r/MachineLearning/comments/4mebvf/why_train_with_crossentropy_instead_of_kl/

- https://stats.stackexchange.com/questions/265966/why-do-we-use-kullback-leibler-divergence-rather-than-cross-entropy-in-the-t-sne/265989

- https://datascience.stackexchange.com/questions/69839/non-categorical-loss-in-keras

- https://stackoverflow.com/questions/43599082/how-do-i-compute-the-kl-divergence-in-keras-with-tensorflow-backend

- Cross Entropy https://en.wikipedia.org/wiki/Cross_entropy

- KL divergence https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence

- Jenson-Shannon divergence https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence

- http://www.erogol.com/dilated-convolution/