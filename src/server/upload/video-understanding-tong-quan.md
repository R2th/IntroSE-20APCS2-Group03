"Thợ lặn" hơi lâu, sau sự kiện MayFest thì đến bây giờ cũng là 3 tháng rồi mình không viết thêm bài mới. Thế nên là, hôm nay mình lại ngoi lên, đầu tiên là để luyện lại văn viết một chút, tiếp theo cũng là muốn chia sẻ thêm với mọi người về một lớp bài toán khá hay ho mà mình cũng đang tìm hiểu gần đây: **Video Understanding**. 

Đương nhiên, hay ho thì sẽ luôn đi kèm với nhiều thách thức, do đó, để bắt đầu chuỗi series chia sẻ sâu hơn về chủ đề này, mình sẽ mở đầu bằng bài viết hôm nay trước: ***TỔNG QUAN VỀ VIDEO UNDERSTANDING***. Hi vọng bài viết sẽ cho các bạn một cái nhìn toàn cảnh về lớp bài toán này, và biết đâu, sẽ có hứng thú để tìm hiểu sâu hơn :D

![imgur](https://i.imgur.com/RIxvCbk.png)
# 1. Giới thiệu
### 1.1 Mô tả chung
Video Understanding là thuật ngữ để chỉ chung các bài toán liên quan đến việc xử lí các **đầu vào là video**. Thông thường, bài toán phổ biến nhất và có thể được coi là đại diện cho Video Understanding là **Video Action Recognition**. Ngoài ra, còn có thể kể đến như Video **Action Detection**, Video **Action Localization**, ... cũng đều là những bài toán thú vị, đang dần nhận được nhiều quan tâm hơn trong thời gian gần đây.

> A crucial task of Video Understanding is to recognise and localise (in space and time) different actions or events appearing in the video.
> 
> Source: [Action Detection from a Robot-Car Perspective](https://arxiv.org/abs/1807.11332)

Nhìn chung, chúng ta đều đã quá quen với các bài toán xử lí ảnh thông thường: Image Classification, Object Detection, Object Segmentation, ... Đây là những tác vụ mà chỉ tập trung vào 1 hình ảnh, hay khi gọi trong 1 video, thì nó chỉ là 1 frame riêng rẽ. Khi nâng level từ ảnh lên video, nó sẽ là bài toán ở cấp độ khó hơn (không chỉ là mức tuyến tính). 

Đương nhiên, nhiều bài toán xử lí video thực tế cũng chỉ cần ở mức frame là đủ, ví dụ, tracking - tận dụng hiệu quả của object detection và chỉ quan tâm đến việc liên kết các object này xuyên suốt video. Nhưng hầu hết các bài toán video understanding khác thì không chỉ cần có thế, và thứ làm nên sự khác biệt giữa 1 bài toán xử lí video và 1 bài toán xử lí ảnh là ở 1 keyword: **Temporal Information** (mình tạm gọi nó là thông tin về thời gian).

![imgur](https://i.imgur.com/RGGsgTG.jpg)

Trong những phần tiếp theo, mình sẽ nói nhiều hơn về temporal information và spatial information, khi mà các bài toán xử lí ảnh cần quan tâm nhiều về **spatial information (thông tin không gian)** thì video understanding cần tận dụng hiệu quả cả về spatial information và temporal information, hay còn gọi là **spatial-temporal information (thông tin không-thời gian)**, thứ tạo nên những thách thức chính trong lớp bài toán này. 

Để có 1 cái nhìn thân thiện hơn với chủ đề này, chúng ta có thể tạm mapping như sau: 
* Action Recognition - tương ứng Image Classification ở mức độ video
* Action Detection - tương ứng Object Detection ở mức độ video
* Action Localization - tương ứng Object Localization ở mức độ video
* Video Captioning - tương ứng Image Captioning ở mức độ video
* ...
### 1.2 Tools/Open Source
Trước khi bắt đầu các phần kiến thức sâu hơn một chút phía sau, mình muốn giới thiệu qua một chút về các open source, tools khá hữu ích hiện nay, giúp chúng ta tiếp cận dễ dàng hơn với các bài toán Video Understanding, không bị ngộp thở ngay khi mới bắt đầu. 
* **PySlowFast**

> PySlowFast is an open source video understanding codebase from FAIR that provides state-of-the-art video classification models with efficient training.

PySlowFast là 1 opensource được xây dựng bởi đội ngũ Facebook AI Research, do đó đây là nguồn base code bằng pytorch đủ chất lượng để chúng ta có thể sử dụng những model state of the art với performance tối ưu nhất cũng như phát triển, thử nghiệm những model mới một cách nhanh nhất trong việc nghiên cứu lớp bài toán video understanding.

Repo: https://github.com/facebookresearch/SlowFast

> The goal of PySlowFast is to provide a high-performance, light-weight pytorch codebase provides state-of-the-art video backbones for video understanding research on different tasks (classification, detection, and etc). It is designed in order to support rapid implementation and evaluation of novel video research ideas.

Hiện tại, PySlowFast đã implement nhiều model khác nhau, bao gồm: **SlowFast**, **Slow**, **C2D**, **I3D**, **Non-local Network**, **X3D**, **Multiscale Vision Transformers**. - Hầu hết đều là những thuật toán sử dụng 3D CNN.
* **PyTorch Video**

![imgur](https://i.imgur.com/E2ydBPa.png)

> [PyTorch Video](https://pytorchvideo.org/) is a deep learning library for research and applications in video understanding. It provides easy-to-use, efficient, and reproducible implementations of state-of-the-art video models, data sets, transforms, and tools in PyTorch.

Lại thêm 1 opensource khác từ Facebook AI Research, PyTorchVideo tương tự như PySlowFast, đều hỗ trợ cho việc xây dựng và sử dụng model lớp bài toán video understanding. Tuy nhiên, khác một chút, nếu PySlowFast được xây dựng ban đầu là implement cho model SlowFast của Facebook, sau đó được mở rộng implement các model sử dụng 3D CNN khác thì PyTorchVideo được xây dựng ngay từ đầu để hỗ trợ các tác vụ Video Understanding và thiên nhiều hơn về việc ứng dụng, triển khai. 

Repo: https://github.com/facebookresearch/pytorchvideo

Các model hiện PyTorch Video support khá tương tự bên PySlowFast, các bạn có thể đọc thêm tại bài giới thiệu của FaceBook: [PyTorchVideo: A deep learning library for video understanding](https://ai.facebook.com/blog/pytorchvideo-a-deep-learning-library-for-video-understanding/)

* **MMAction2**

![imgur](https://i.imgur.com/2Im7Uyk.png)

OpenMMLab là 1 dự án open source nhằm cung cấp các projects cho mục đích academic research và industrial applications. Các source code này luôn được đánh giá chất lượng cao, nhận được hàng nghìn star trên github và bao phủ một lượng lớn nhiều topic khác nhau, với các repo lớn theo từng topic: 
* [mmdetection](https://github.com/open-mmlab/mmdetection) (16k star - OpenMMLab Detection Toolbox and Benchmark), 
* [mmcv](https://github.com/open-mmlab/mmcv) (2.8k star - OpenMMLab Computer Vision Foundation), 
* [mmediting](https://github.com/open-mmlab/mmediting) (2.3k star - OpenMMLab Image and Video Editing Toolbox)
* [mmsegmentation](https://github.com/open-mmlab/mmsegmentation) (2.2k star - OpenMMLab Semantic Segmentation Toolbox and Benchmark)
* [mmocr](https://github.com/open-mmlab/mmocr) (1.5k star - OpenMMLab Text Detection, Recognition and Understanding Toolbox)
* ...

Trong lớp bài toán Video Understanding, OpenMMLab cũng phát triển 1 repo tương ứng [MMAction 2 - OpenMMLab's Next Generation Video Understanding Toolbox and Benchmark](https://github.com/open-mmlab/mmaction2). Thật ra trước MMAction2, đã có [MMAction](https://github.com/open-mmlab/mmaction) được xây dựng cho topic này rồi, nhưng mình cũng chưa rõ lí do tại sao nhóm tác giả ko phát triển tiếp hay tổ chức lại code bên MMAction mà cho ra đời luôn thế hệ tiếp theo MMAction2, các bạn có thể hóng cùng mình về câu trả lời tại: https://github.com/open-mmlab/mmaction2/issues/16

Quay lại với chủ đề chính thì MMAction2 thật sự là 1 repo đáng để vọc vạch khi mà repo này implement một lượng lớn state of the art model trong topic Video Understanding, cả về Action Recognition (**TSN, TSM, I3D, R(2+1)D, SlowOnly, SLowFast, CSN, C3D, X3D, TRN, Timesformer, ...**), Temporal Action Detection (**BSN, BMN, SSN**), Spatial Temporal Action Detection (**ACRN, Long Term Feature Bank, ...**), Skeleton-based Action Recognition (**PoseC3D**)

Các bạn có thể đọc thêm về mmaction2 tại: https://mmaction2.readthedocs.io/en/latest/
# 2. Action Recognition
Oke, vào phần chính, mở đầu dài dòng quá :sweat_smile:

Như phần đầu mình có nói **"Video Action Recognition là bài toán phổ biến nhất và có thể được coi là đại diện cho Video Understanding"**, thế nên đây sẽ là phần chủ đạo mình tập trung trong bài viết. Các bài toán khác cũng sẽ được nhắc qua nhưng sẽ không sâu như Action Recognition.
### 2.1 Mô tả bài toán
Action Recognition liên quan đến việc nhận biết, xác định vị trí và dự đoán các hành vi của con người trong video. Một cách dễ hình dung nhất, Action Recognition là bài toán phân loại video, cụ thể là phân loại hành động trong video. 
* Input: Video
* Output: Class của video
* Algorithms: Sẽ được trình bày trong phần tiếp theo

![img](https://i.imgur.com/n10v1UL.png)

Bài toán định nghĩa khá đơn giản, nhưng muốn xây dựng được 1 giải pháp hiệu quả, chúng ta cần phải giải quyết khá nhiều vấn đề.
* Đầu tiên là vấn đề về dữ liệu: Video là 1 tập các frame, do đó, khá dễ để hiểu, **input size của video sẽ lớn hơn các bài xử lí ảnh thông thường rất nhiều**, chưa kể đến các vấn đề về video độ dài ngắn khác nhau, **chất lượng, độ phân giải của video cũng thường kém hơn ảnh**. Việc thu thập video cũng mất nhiều thời gian hơn, dù để training được mô hình đủ tốt thì lượng data cần là vô cùng lớn. Một số bộ dataset thường được sử dụng để làm benchmark cho các thuật toán hiện nay gồm: **UCF101, Charades, Kinetics Family, 20BN-Something-Something, AVA, ...**
* Thứ 2 là vấn đề về phương pháp: Muốn giải quyết được bài toán Action Recognition, chúng ta cần trả lời 2 câu hỏi: **Làm thề nào để có thể mô hình hóa được thông tin về thời gian trong video?** và **Làm thế nào để giảm được lượng tham số tính toán khi xử lí mà không ảnh hưởng đến chất lượng phân lớp?** - Do triển khai các mô hình xử lí video luôn sử dụng lượng tài nguyên tính toán cực kì lớn, nên đây là những câu hỏi nhất định phải giải quyết nếu muốn ứng dụng được vào thực tế.

Vậy bài toán này ứng dụng vào vấn đề gì? Action Recognition có vai trò rất lớn trong nhiều bài toán thực tế, bao gồm phân tích hành vi con người (**behavior analysis**), **video retrieval** - 1 mức độ cao hơn của image retrieval, hỗ trợ tương tác giữa người và robot (**human-robot interaction**), hỗ trợ các hệ thống gaming giải trí, ...


### 2.3 Một số hướng tiếp cận phổ biến
Trước khi Deep Learning phát triển, thông thường, để xử lí bài toán action recognition, người ta sẽ cố gắng trích xuất ra các **hand-crafted features** như Stacked Fisher Vectors, Improved Trajectories, Dense Trajectories, ... đặc trưng cho chuyển động của đối tượng, sau đó áp dụng các bộ phân lớp như SVM để phân loại video. Mặc dù kết quả tương đối tốt, những phương pháp này cần chi phí tính toán quá lớn cũng như khó để mở rộng và triển khai trong thực tế.

Bắt đầu từ 2014, Deep Video tiên phong, lần đầu sử dụng CNN vào bài toán Action Recognition, bằng việc áp dụng các mạng CNN trong bài toán image classification cho mỗi frame, sau đó tổng hợp lại bằng các hàm fusion: **late fusion, early fusion và slow fusion.**

![imgur](https://i.imgur.com/fGLGTtK.png)

Phía trên là tổng hợp các mô hình đã được xây dựng để giải quyết bài toán action recognition theo trình tự thời gian từ 2014 đến nay (Nguồn: [arXiv](https://arxiv.org/pdf/2012.06567.pdf)). Nếu có thể đọc và nghiên cứu được hết các paper này thì là 1 điều tuyệt vời, tuy nhiên, để dễ tiếp cận, mình sẽ chia các phương pháp thành 3 nhóm chính -  những trend nghiên cứu được quan tâm nhất hiện nay. 

* **CNN + RNN**
    
    Đây là hướng tiếp cận thường được nghĩ đến đầu tiên, do quan điểm **"video là chuỗi các frame liên tiếp nhau, vậy hãy xử lí bằng các mô hình dùng cho dạng chuỗi"**, và chúng ta có họ RNN (RNN, LSTM, GRU, ...). Nhìn hình mô tả bên dưới thì chắc các bạn cũng có thể hình dung được hướng xử lí chung của nhóm phương pháp này rồi :grinning:. 
    
    Các mô hình sẽ sử dụng kiến trúc bao gồm phần đầu là các mạng CNN để trích xuất thông tin từ frame (spatial information - thông tin không gian), tiếp đến các mạng RNN sẽ lấy input là các feature này để đưa ra kết quả dự đoán sau cùng với hi vọng RNN có thể mô hình hóa được temporal information trong video. 
    
    ![imgur](https://i.imgur.com/SwhKz7L.png)

    Một số paper đáng chú ý: 
    * ***Long-term Recurrent ConvNets for Visual Recognition and Description*** (LRCN) - một trong những paper đầu tiên áp dụng LSTM vào bài toán action recognition
    * ***VideoLSTM Convolves, Attends and Flows for Action Recognition*** - một trong những paper đầu tiên áp dụng thêm attention và đạt được những kết quả đáng kể.
    *   ***TS-LSTM and Temporal-Inception: Exploiting Spatiotemporal Dynamics for Activity Recognition*** - paper xây dựng baseline nhằm so sánh hiệu quả của việc mô hình hóa temporal information giữa các kiến trúc RNN

    Hơi ngoài lề so với nhóm phương pháp này, nhưng vì cùng chung ý tưởng nhận định video là chuỗi frame, nên mình để luôn một số phương pháp sử dụng **Transformer** ở mục này luôn (trend hiện nay):
    *  ***Is Space-Time Attention All You Need for Video Understanding?*** - Hay còn gọi là TimeSformer (đã được implement trong MMAction2)
    * ***Multiscale Vision Transformers*** - Hay MViT (đã được implement trong PySlowFast)

* **3D Convolution**
    
    Nhóm phương pháp sử dụng 3D CNN có góc nhìn khác 1 chút, tuy nhiên lại rất thực tế và đặc biệt hiệu quả trong các bài toán xử lí video. Thay vì sử dụng các input tensor 2 chiều như trong các tác vụ xử lí ảnh thông thường, 3D-CNN sẽ cố gắng xử lí **các input là tensor 3 chiều, trong đó 2 chiều đại diện cho không gian (chiều cao, chiều rộng của frame) và 1 chiều đại diện cho thời gian (số frame).** Bằng cách này, các mô hình có khả năng mô hình hóa đồng thời spatial-temporal information để đạt được kết quả tốt nhất.
    
    Nghe 3D có vẻ trừu tượng nhưng thực tế chúng ta chỉ cần thao tác khá đơn giản. Với 1 tập L frame có kích thước (H, W), ta sẽ thu được 1 tensor với số chiều là (L, H, W, 3), khi đó, chúng ta chỉ cần đơn giản reshape lại thành (3, L, H, W) để tạo thành tensor3D với 1 chiều thời gian có độ lớn K và 2 chiều không gian có độ lớn là H và W. Việc còn lại là đưa input này qua các module 3D-CNN đã được cung cấp sẵn trong pytorch, tensorflow, ... 
    
    ![imgur](https://i.imgur.com/xERZgyU.png)
    
    Dù hiệu quả, nhưng hiện tại nhóm phương pháp này cũng tồn tại 1 số vấn đề nhất định. Đầu tiên, 3D-CNN là
    những kiến trúc phức tạp, do đó, **rất khó để tối ưu được tham số của mạng**. Muốn training được một mô hình 3D-CNN đủ tốt, bên cạnh việc **mất thời gian hàng tuần cho việc đào tạo**, việc tìm ra các bộ dataset đủ lớn, đủ da dạng cũng là 1 vấn đề đáng quan tâm. Tiếp đến, do **không có các pretrain trên các dataset đủ lớn**, 3D-CNN hầu như chỉ được xem như 1 phương án trích xuất tính năng đủ tốt, chứ không được quá chú trọng vào việc tinh chỉnh, finetune mô hình. Mãi cho đến khi I3D ra đời, đề xuất sử dụng 1 kĩ thuật cho cho phép inflate ImageNet pre-trained weights của 2D model sang 3D model, các mô hình 3D-CNN mới được chú ý nhiều hơn.
    
    ![imgur](https://i.imgur.com/6Es19ww.png)

    Một số paper đáng chú ý:
    * ***Learning Spatiotemporal Features with 3D Convolutional Networks*** (C3D) - paper đầu tiên sử dụng các mạng 3D-CNN học sâu (deeper)
    * ***Quo Vadis, Action Recognition? A New Model and the Kinetics Dataset*** (I3D) 
    * ***SlowFast Networks for Video Recognition*** (SlowFast) 

* **Two-Stream Networks**
    
    Two-Stream Networks lần đầu được giới thiệu trong paper "Two-stream convolutional networks for action recognition in videos", với ý tưởng sử dụng 2 luồng khác nhau có chung kiến trúc, nhưng nhận 2 đầu vào lần lượt là RGB (chứa spatial information) và optical flow (chứa motion information hay temporal information), kết quả sau cùng sẽ được fusion từ 2 luồng (late fusion) và đưa ra dự đoán. 
    
    Các bạn có thể đọc thêm 1 bài phân tích khá chi tiết trên viblo về paper này: [[Xử lý video] Ứng dụng ConvNets trong kiến trúc hai luồng (Two-stream) cho nhận dạng video](https://viblo.asia/p/xu-ly-video-ung-dung-convnets-trong-kien-truc-hai-luong-two-stream-cho-nhan-dang-video-GrLZD1w2lk0)
    
    ![imgur](https://i.imgur.com/PDJ9J47.png)
    
    Bàn 1 chút thì việc tính toán optical flow khá mất thời gian, đồng thời cũng tốn không gian lưu trữ, do đó rất khó để mở rộng và triển khai thực tế. Tuy nhiên, ở mục này, chúng ta không chỉ bàn về phương pháp, Two-Stream Networks còn là 1 tư tưởng thiết kế mô hình nữa: **"Kết hợp để phân tích các phương thức thể hiện khác nhau của video"**
    
    Để dễ hiểu thì RGB hay optical flow được gọi là 1 dạng **modality** mà two-stream network quan tâm, ngoài ra với mỗi bài toán cụ thể, chúng ta sẽ quan tâm các modality khác nhau: nếu dataset chú trọng phân lớp dựa trên background, RGB sẽ là 1 modality quan trọng, nếu dataset chứa nhiều thông tin chuyển động, optical flow lại cần thiết, nếu video tập trung vào tư thế chuyển động của người, có thể sẽ cần các modality về dáng người (pose), nếu âm thanh ảnh hưởng đến kết quả phân lớp, chúng ta sẽ quan tâm đến các modality về âm thanh. 
    
    Ngoài ra, two-stream network không bị giới hạn trong khuôn khổ 2D-CNN, dó đó, việc sử dụng các 3D-CNN  trong two-stream network là hoàn toàn có thể. Chúng ta cũng có thể kết hợp nhiều hơn 2 modality, khi đó two-stream network sẽ trở thành multi-stream network. 
    
    Một số paper đáng chú ý: 
    * ***Two-stream convolutional networks for action recognition in videos***
    * ***Temporal Segment Networks: Towards Good Practices for Deep Action Recognition*** (TSN) - Hiện cũng đã có bài phân tích paper này trên viblo: [[Machinlearning] Nhận diện hành động với Temporal Segment Networks(TSN)](https://viblo.asia/p/machinlearning-nhan-dien-hanh-dong-voi-temporal-segment-networkstsn-gGJ5976rZX2)
    * ***TSM: Temporal Shift Module for Efficient Video Understanding*** (TSM)
    * ***MotionSqueeze: Neural Motion Feature Learning for Video Understanding***

# 3. Skeleton-Based Action Recognition
### 3.1 Mô tả bài toán
Skeleton-Based Action Recognition là 1 bài toán con của Action Recognition, tuy nhiên thì do có vài thứ khá đặc biệt và cũng đang được chú ý gần đây, nên mình cũng xin nêu riêng ra 1 phần nhỏ ở đây. 

Mặc dù việc phân loại hành động có thể dựa trên nhiều yếu tố khác nhau, chuyển động của người trong video vẫn là yếu tố chính quyết định đến kết quả phân loại. Chúng ta có thể dễ dàng phân biệt được 1 người đi bơi và 1 người đi đá bóng dựa vào background xung quanh, nhưng nếu là 1 người đi bộ và 1 người chạy bộ, với cùng background, thì yếu tố giúp phân định 2 lớp lại là tư thế, dáng người. 

![imgur](https://i.imgur.com/mmdGZbJ.png)

Với sự những tiến bộ vượt bậc về pose estimation hiện nay, người ta bắt đầu quan tâm hơn đến việc chỉ dùng pose, liệu có thể nhận dạng hành động được không? khi đó, mô hình sẽ không cần lo ngại các vấn đề overfit với background nữa.  Và topic Skeleton-Based Action Recognition ra đời, đi kèm là các bộ dataset đặc trưng như:  **NTU-RGB+D, NTU-RGB+D 120, Kinetics-Skeleton dataset, ...**

* Input: Image + Pose (hoặc Image + Pose Estimation model)
* Output: Class của video

### 3.2 Một số hướng tiếp cận phổ biến
* **Graph Convolutional Networks**
    
    Lấy cảm hứng từ việc quan sát rằng, **khung xương người (skeleton), chính là những đồ thị tô-pô tự nhiên (topological graph)**, các phương pháp theo hướng sử dụng GCN ra đời. Mở đầu là mô hình ST-GCN, dữ liệu skeleton được cung cấp (hoặc thu được từ các thuật toán pose estimation) sẽ được biểu diễn lại dưới dạng 1 đồ thị không-thời gian (spatial-temporal graph) với các đỉnh là các khớp (joints)  và các cạnh là các đường nối các khớp trong 1 frame và trong các frame liền nhau (Các bạn có thể quan sát hình dưới để dễ hình dung hơn). 
    
    ![imgur](https://i.imgur.com/SmMfYXc.jpg)
    
    Để hiểu hơn về ý tưởng của các mô hình GCN, các bạn nên đọc qua bài viết [**[Deep Learning] Graph Neural Network - A literature review and applications**](https://viblo.asia/p/deep-learning-graph-neural-network-a-literature-review-and-applications-6J3ZgP0qlmB)
    
    Với kết quả đáng kỳ vọng, các mô hình base trên GCN dần được chú ý và tập trung nghiên cứu nhiều hơn. Bên cạnh việc cố gắng xây dựng các kiến trúc GCN hiệu quả, việc xây dựng đồ thị từ skeleton cũng được các phương pháp này thử nghiệm để tìm ra cách biểu diễn tốt nhất làm input cho GCN.
    
    Một số paper đáng chú ý
    *  ***Spatial Temporal Graph Convolutional Networks for Skeleton-Based Action Recognition*** (ST-GCN)
    *  ***Skeleton-Based Action Recognition with Shift Graph Convolutional Network*** (Shift GCN)

* **2D-CNN, 3D-CNN**

    Đây là một hướng tiếp cận khác của Skeleton-Based Action Recognition. Nhóm các phương pháp này sẽ cố gắng **tập trung vào việc biểu diễn/mã hóa chuyển động của skeleton trong video thành hình ảnh, sau đó sử dụng các phương pháp xử lí ảnh quen thuộc** để xử lí bài toán. Dễ thấy, keyword chính tạo nên hiệu quả của những phương pháp này là ở cách mã hóa skeleton từ video thành image. Chúng ta sẽ điểm qua cách xử lí trong 1 vài paper dưới đây.
    * ***PoTion: Pose MoTion Representation for Action Recognition***
       
   ![imgur](https://i.imgur.com/83lJzJj.png)
   
   Quan sát ảnh bên trên, các bạn có thể dễ dàng hình dung được luồng xử lí của PoTion. Đầu tiên, với mỗi frame, PoTion trích xuất ra các heatmap (vốn là các đầu ra thông dụng của các mô hình pose estimation), cụ thể bao gồm 18 heatmap tương ứng cho 18 khớp được xác định và 1 heatmap cho background. Tiếp theo, khi xét toàn video, các heatmap từ các frame khác nhau sẽ được tổng hợp lại dựa trên từng khớp (joints) - cụ thể PoTion là 19 heatmap (18 khớp + 1 background). 
   
   Để mô hình hóa được thông tin thời gian, việc tổng hợp heatmap không chỉ đơn giản là cộng tensor mà những heatmap này cần đi qua 1 hàm tô màu - colorizing trước khi cộng lại. Gọi $C$ là số channel màu được sử dụng để colorize, với mỗi khớp $j$, PoTion sẽ tạo ra 3 image $\mathcal{U}_j, \mathcal{N}_j, \mathcal{I}_j$ với số channel lần lượt là $C$, $C$, $1$. Khi đó, ta sẽ thu được output của cả quá trình là 1 tensor có số chiều là $(H, W, 19*(2C + 1))$
   
    * ***Simple yet efficient real-time pose-based action recognition***

    ![imgur](https://i.imgur.com/17EvDZF.png)
    
    Khác với PoTion, phần encode skeleton được giới thiệu trong paper này đơn giản hơn 1 chút. Nhóm tác giả chỉ sử dụng nguyên giá trị về vị trí của 1 khớp để làm giá trị cho hệ màu của khớp (Ở đây tính theo hệ màu RGB thì R = x, G = y và B = 0). Giả sử số khớp đc xác định là 18, khi đó, với 1 frame, chúng ta sẽ thu được 1 vector có độ dài 18. Nếu độ dài video là 32 frame, bằng việc tổng hợp các vector của mỗi frame theo cột, output sẽ là 1 ảnh RGB có kích thước 18*32 - **Encoded Human Pose Image (EHPI)**. Để việc encode được chính xác hơn, nhóm tác giả cũng tiến hành normalize giá trị tọa độ của các khớp lại theo bounding box của đối tượng trước khi tiến hành encode. 
    
    * ***Revisiting Skeleton-based Action Recognition*** (PoseC3D) - SOTA.

    ![imgur](https://i.imgur.com/rcZV9Qe.png)
    
    PoseC3D có cách tiếp cận gần giống PoTion, chỉ khác là PoseC3D không sử dụng colorizing để mô hình hóa temporal information, thay vào đó, PoseC3D chỉ đơn giản stack các heatmap và tập trung xây dựng mô hình 3D-CNN để học được spatial-temporal information. Các bạn có thể quan sát hình trên để hình dung rõ ràng hơn.
    
    Hiện PoseC3D đang là state of the art trên Paper with code với các bộ dữ liệu NTU-RGB+D, Kinetics-Skeleton. Nếu có thể, sắp tới mình sẽ viết 1 bài Paper Explain phân tích kĩ hơn về paper này để mọi người nắm rõ hơn về tư tưởng và chi tiết cách xử lí của PoseC3D. Hiện PoseC3D được implement trên MMAction2, các bạn cũng có thể vọc vạch code để tìm hiểu thêm :smile:
# 4. Kết luận
Bài có vẻ hơi dài quá nên một số bài toán còn lại của Video Understanding như Action Detection, Action Localization, ..., mình xin phép tạm bỏ qua (1 phần cũng là bản thân chưa đủ tự tin để chia sẻ sâu thêm). Nếu có thời gian và khi nắm đủ kiến thức, mình sẽ viết thêm một số bài viết về các bài toán này. Các bạn nếu có hứng thú có thể tìm hiểu thêm tại link tổng hợp sau: https://github.com/jinwchoi/awesome-action-recognition

Cuối cùng nhưng vẫn khá quan trọng, đừng quên **Upvote + Clip + Share** bài viết này nếu các bạn cảm thấy hữu ích. See ya :metal:
# Tài liệu tham khảo
* [A Comprehensive Study of Deep Video Action Recognition](https://arxiv.org/pdf/2012.06567.pdf)
* [A Survey on 3D Skeleton-Based Action Recognition Using Learning Method](https://arxiv.org/pdf/2002.05907.pdf)
* [CS231N Section Video Understanding](http://cs231n.stanford.edu/slides/2018/cs231n_2018_ds08.pdf)
* ... (một số paper cụ thể mà mình đã nhắc đến trong bài)