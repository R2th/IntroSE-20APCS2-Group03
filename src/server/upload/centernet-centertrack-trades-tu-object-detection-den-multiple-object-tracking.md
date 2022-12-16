# 1. Mở đầu
Xin chào các bạn, mình lại quay trở lại sau ... 2 ngày không ra bài mới :D. Còn ngày cuối cùng của sự kiện MayFest nên mình cũng cố gắng viết cho kịp thêm bài nữa để hưởng ứng trọn vẹn sự kiện như lời đã nói, cũng nhân dịp chia sẻ phần tìm hiểu khá hay ho gần đây của mình. Hm nay lại tiếp tục là một chủ đề mà mình chưa từng viết qua trước đây: **Paper Explain**

![imgur](https://i.imgur.com/4SFnNjr.jpg)

IEEE Conference on Computer Vision and Pattern Recognition (CVPR) là một trong những hội nghị hàng đầu thế giới trong lĩnh vực Computer Vision. Với tỉ lệ accept cực thấp, các paper được publish tại CVPR luôn là những paper chất lượng của chất lượng với những ý tưởng đột phá, những cải tiến vượt bậc. 

CVPR năm nay (2021) sẽ diễn ra từ 19 đến 25 tháng 6, hiện tại, các paper gửi đến vẫn đang review sát sao, còn với những paper được accept, các bạn có thể cập nhật hàng ngày tại link: **https://github.com/52CV/CVPR-2021-Papers**

Trong bài viết này, mình sẽ cùng các bạn phân tích 1 paper được accept tại CVPR 2021 năm nay, trong mảng Mutilple Object Tracking: **TraDeS: Track to Detect and Segment**. Với những ý tưởng cải tiến khá mới mẻ, TraDeS hiện đang đứng top 2 trên Paper with Code ở "Multi-Object Tracking on MOT16" và "Multi-Object Tracking on MOT17". 

Do 1 sự liên quan dây mơ, rễ má, khi mà **TraDeS được base trên CenterTrack, CenterTrack lại base trên CenterNet**, ... thế nên là trong bài viết hm nay, chúng ta sẽ bắt đầu đào từ CenterNet để đào đi :D. Bài viết sẽ khá dài nhưng mình đảm bảo nó sẻ đủ sức cuốn hút để các bạn có cảm hứng đọc đến cuối bài. 

**Note**: Các bạn có thể đọc thêm 2 bài viết khác về multiple object tracking của mình tại **SORT - Deep SORT : Một góc nhìn về Object Tracking [(phần 1)](https://viblo.asia/p/sort-deep-sort-mot-goc-nhin-ve-object-tracking-phan-1-Az45bPooZxY) và [(phần 2)](https://viblo.asia/p/sort-deep-sort-mot-goc-nhin-ve-object-tracking-phan-2-djeZ1m78ZWz)**
# 2. CenterNet: Object As Point
Mạch liên kết của bài viết này là Object Tracking, nhưng xuất phát điểm nó là từ 1 mạng object detection: CenterNet. Được ra mắt năm 2019, CenterNet có thiết kế cực kỳ đơn giản, nhưng lại đạt được cân bằng giữa tốc độ và độ chính xác tốt, trở thành state of the art và nhanh chóng đón nhận được sự công nhận từ cộng đồng. Vậy keyword đằng sau những thành công của CenterNet đến từ đâu?

![imgur](https://i.imgur.com/aNbMAd2.png)

**Note**: Ở đây, CenterNet mình đang nói đến là [**CenterNet - Objects as Points**](https://arxiv.org/pdf/1904.07850.pdf), mn cần tránh nhầm lẫn với **CenterNet: Keypoint Triplets for Object Detection**. Một vấn đề nữa là CenterNet trong paper gốc được giới thiệu giải quyết cho 3 tác vụ khác nhau: Object Detection, Human Pose Estimation và 3D Object Detection, nhưng mình sẽ **chỉ bàn đến Object Detection** ở đây. 
### 2.1 Điểm đột phá
Điểm đột phá lớn nhất của CenterNet là đưa ra một cách tiếp cận hoàn toàn mới: **đưa bài toán object detection về bài toán tìm điểm đặc trưng (keypoint estimation), từ đó cũng suy ra kích thước và tính toán được bounding box cho bài toán object detection.**

Cách tiếp cận này có những ưu điểm gì so với các object detection hiện tại?
* Bỏ qua các quá trình tính toán với nhiều bước rời rạc, khó tối ưu về tốc độ (vượt trội Faster RCNN)
* Không cần pre-define quá nhiều anchor box gây lãng phí tính toán, tránh hậu xử lí (NMS) sau khi detect 
* Training 1 mạng end to end duy nhất, cân bằng về tốc độ và accuracy

Để đạt được điều này, CenterNet tập trung vào 3 vấn đề chính: 
* **Ước lượng vị trí tâm của vật** (Dựa trên các bản đồ nhiệt - heatmap)
* **Ước lượng độ lệch của tâm**
* **Ước lượng kích thước bounding box chứa vật**

Chúng ta sẽ cùng phân tích cách mà CenterNet giải quyết các vấn đề này.
### 2.2 Phân tích
#### 2.2.1 Ước lượng vị trí của tâm vật

![img](https://i.imgur.com/lytPxJb.png)

CenterNet kế thừa những ý tưởng từ bài toán keypoint estimation, coi mỗi điểm trung tâm của vật là 1 keypoint, đồng thời tiến hành dự đoán điểm trung tâm này thông qua bản đồ heatmap. Cụ thể, **mỗi ô trong bản đồ heatmap này sẽ thể hiện xác suất trong ô đó chứa tâm của vật**. Tiếp đến CenterNet thực hiện lọc các điểm cực đại trên heatmap để xác định tâm của các vật trên ảnh.

Keyword chúng ta cần quan tâm ở đây là **heatmap**, cụ thể bao gồm 2 câu hỏi chính: **mô hình sẽ học cách tạo ra heatmap như thế nào?** và **làm sao tạo ra heatmap ground truth** để giúp mô hình so sánh và tối ưu trong quá trình lan truyền ngược?

Thứ nhất, câu trả lời đương nhiên sẽ là mô hình sẽ tối ưu các tham số của kiến trúc mạng để có ra được output là heatmap $\hat{Y}$. **Kiến trúc này sẽ bao gồm 1 backbone để trích xuất đặc trưng và 1 head (ở đây là heatmap head) để biến đổi đặc trưng thành heatmap.** 

Cụ thể, với 1 ảnh đầu vào $I \in R^{W \times H \times 3}$,  output sẽ là 1 heatmap $\hat{Y} \in [0, 1]^{\frac{W}{R} \times \frac{H}{R} \times C}$ với $R$ là stride (được định nghĩa từ trước, trong paper, tác giả sử dụng R = 4), và $C$ là số class.  

![imgur](https://i.imgur.com/DjXoAkP.png)

Thứ 2, từ ảnh đầu vào $I$, để **tạo ra heatmap ground truth**, tác giả sử dụng 1 thuật toán như sau (quan sát ảnh trên để có cái nhìn trực quan):
* Trước tiên, tạo 1 heatmap $Y \in [0]^{\frac{W}{R} \times \frac{H}{R} \times C}$ (khởi tạo)
* Từ bounding box của vật, xác định điểm keypoint là tâm của vật $p_c \in R^2$ với c là class
* Xác định điểm tương ứng của $p_c$ trên heatmap là $\tilde{p}_c = \left\lfloor \frac{p_c}{R} \right\rfloor$ (lấy phần nguyên)
* Thay thế $Y_{xyc} = exp(- \frac{(x - \tilde{p}_x)^2+(y - \tilde{p}_y)^2}{2 \sigma_p^2})$ với $x \in [0, \frac{W}{R}], y \in [0, \frac{H}{R}], c \in [0, C]$ (lan dần từ điểm trung tâm ra theo phân phối chuẩn)

Công việc còn lại là định nghĩa hàm loss để model học được cách tạo ra heatmap fit với heatmap groundtruth, chúng ta sẽ bàn ở phần sau.
#### 2.2.2 Ước lượng độ lệch của tâm
Đây là 1 phần khác được paper quan tâm và cũng có sự ảnh hưởng khá lớn đến kết quả sau cùng. Vậy tại sao lại có độ lệch ở đây mà cần ước lượng? Vấn đề nằm ở phần lấy $\tilde{p}_c = \left\lfloor \frac{p_c}{R} \right\rfloor$ - đã có 1 phép lấy phần nguyên ở đây, và nó **tạo ra 1 độ lệch giữa điểm trung tâm thực tế và điểm trung tâm trong heatmap**. 

Để học được độ lệch (offset) này, CenterNet sử dụng thêm 1 head nữa - **offset head** với output là 1 tensor đại diện cho độ lệch về chiều ngang và chiều dọc: $\hat{O} \in R^{\frac{W}{R} \times \frac{H}{R} \times 2}$ 

#### 2.2.3 Ước lượng kích thước của vật
Phần cuối, song song với việc ước lượng vị trí của tâm, chính là việc ước lượng kích thước của vật, cụ thể là **chiều rộng và chiều cao.** 

Tương tự cho việc ước lượng offset,CenterNet cũng sử dụng 1 head - **dimension head** để ước lượng chiều rộng và chiều cao của vật. Output của wh head là 1 tensor $\hat{S} \in R^{\frac{W}{R} \times \frac{H}{R} \times 2}$ 
### 2.3 Kiến trúc và Loss function
Phần trên mình đã nhắc qua về việc CenterNet sử dụng 3 head network (3 mạng CNN) để học 3 tác vụ khác nhau: heatmap head, offset head, dimension head. Để dễ hình dung hơn, các bạn có thể quan sát hình bên dưới (**bên trái: CenterNet khi training, bên phải: CenterNet khi inference**)

![imgur](https://i.imgur.com/fbLSlrK.png)

Về loss function, tác giả sử dụng 1 loss function chung bằng việc lấy tổng có trọng số 3 loss function con tương ứng với 3 head ($\lambda_{size} = 0.1, \lambda_{off} = 1$). Cụ thể
$$
L_{det} = L_k + \lambda_{size} L_{size} + \lambda_{off} L_{off}
$$

Trong đó:

* **Heatmap Loss ($L_k$)** - ứng với Heatmap Head: Sử dụng focal loss (do tính mất cân bằng giữa điểm là keypoint và điểm là background). Ở đây, $\alpha, \beta$ là các siêu tham số của focal loss (tác giả sử dụng $\alpha = 2, \beta = 4$), $N$ là số điểm keypoint có trong ảnh.
$$L_k = -\frac{1}{N}\sum_{xyc}
\begin{cases}
(1 - \hat{Y}_{xyc})^\alpha log( \hat{Y}_{xyc}) & \text{if } Y_{xyc} = 1\\
(1 - Y_{xyc})^\beta (\hat{Y}_{xyc})^\alpha log(1 -\hat{Y}_{xyc}) & \text{other wise}
\end{cases}
$$

* **Offset Loss ($L_{off}$)** - ứng với Offset Head: Là L1 loss với 
$$
L_{off} =  -\frac{1}{N}\sum_{p}|\hat{O}_{\tilde{p}} - (\frac{p}{R} - \tilde{p})|
$$

* **Size loss ($L_{size}$)** - ứng với Dimention Head: Là L1 loss với $s_k = (x_2^{(k)} - x_1^{(k)}, y_2^{(k)} - y_1^{(k)})$
$$
L_{size} =  -\frac{1}{N}\sum_{k=1}|\hat{S}_{pk} - s_k|
$$

Về backbone, CenterNet tiến hành thử nghiệm trên 4 backbone để trade-off giữa accuracy và speed: **ResNet18, ResNet101, DLA-34 và Hourglass-104**

![imgur](https://i.imgur.com/T66hG9D.png)

Oke, tạm kết phần trình bày về CenterNet tại đây. Trong phần tiếp theo, chúng ta sẽ đến với mạch liên kết chính của bài viết này: Multiple Object Tracking.
# 3. CenterTrack: Tracking Object As Point (ECCV 2020)
### 3.1 Tổng quan vấn đề
Với sự bùng nổ mạnh mẽ của deep learning, bên cạnh các tác vụ về image classification, image segmentation, object detection, ... thì object tracking cũng đang được dần để ý nhiều hơn đồng thời cũng có nhiều nghiên cứu với những kết quả đáng kinh ngạc. Trong bài viết này, chúng ta quan tâm đến **Multiple Object Tracking** - Theo dõi đồng thời nhiều đối tượng

![imgur](https://i.imgur.com/qdl714G.gif)

Hầu hết các phương pháp để giải quyết bài toán muliple object tracking hiện nay có thể chia thành 2 nhóm chính: **Tracking-by-Detection (TBD)** và **Joint detection and tracking (JDT)**

Tracking-by-Detection (TBD): Là tập hợp những phương pháp **lấy object detection làm gốc**, tức là, sẽ tồn tại 1 object detector đủ tốt để generate ra bounding box của những frame riêng rẽ, công việc tracking sẽ chỉ đơn giản là **tìm cách để liên kết các frame này xuyên suốt video** (Hungarian Algorithms, Graph, ...), sao cho đảm bảo tính chính xác cũng như tốc độ xử lí. Tiêu biểu của nhóm phương pháp này có thể kể đến **SORT, Deep SORT, ...**

Mặc dù TBD đủ đơn giản và cũng đã thông dụng trong 1 thời gian dài, những phương pháp này gặp phải những **nhược điểm** dễ nhận thấy như: **tách biệt object detector và object tracker** (làm giảm performance cũng như tăng thời gian xử lí), phụ thuộc quá nhiều vào object detector, ... 

Joint detection and tracking (JDT): JDT ra đời nhằm khắc phục những nhược điểm này và trở thành một hướng phát triển mới nhận được nhiều chú ý hiện nay. 1 đặc điểm chung của những phương pháp này là sẽ tìm cách **thêm 1 branch nữa vào object detector (Faster RCNN, YOLO, ...) nhằm học tập tác vụ re-ID** dùng cho việc liên kết data (data association). Tiêu biểu cho nhóm phương pháp này có thể kể đến **FairMOT**, hiện đang là state of the art của Multiple Object Tracking trên 2 tập dataset MOT16 và MOT17.

![imgur](https://i.imgur.com/G6yUDeq.png)

Vào ngày 2/4/2020, tác giả của CenterNet lần đầu public bài báo về CenterTrack - mở rộng tư tưởng của CenterNet sang object tracking. Mặc dù được coi là thuộc nhóm JDT, CenterTrack lại có những ý tưởng mới mẻ, khác biệt so với những thuật toán JDT cùng thời: **Sử dụng object tracker như 1 phương pháp tăng cường kết quả của object detector, từ đó đồng thời làm tăng hiệu quả của việc tracking.**
### 3.2 Ý tưởng
Ý tưởng của CenterTrack rất đơn giản: **Object Detection và Object Tracking chỉ khác nhau ở chuyển động của vật qua từng frame. Vậy nếu học được sự di chuyển này (displayment), object detector có thể mở rộng thành object tracker.**

Một mong muốn nữa của tác giả là xây dựng được một **Tracking-conditioned detection**, cái mà tận dụng được feature từ những frame trước để giúp detector có thể detect được cả những đối tượng tạm thời bị che khuất, làm mờ, ... ở frame hiện tại. Chúng ta sẽ phân tích kĩ hơn sau đây.

![imgur](https://i.imgur.com/GEwE2E2.png)

**CenterTrack**: 
* Input: 
    * Frame hiện tại $I^{(t)} \in R^{W \times H \times 3}$
    * Frame trước đó: $I^{(t-1)} \in R^{W \times H \times 3}$
    * Những đối tượng đã tracking được từ frame trước: $T^{(t-1)} = \{b_0^{(t-1)}, b_1^{(t-1)}, ...\}$ với $b = (p, s, w, id)$ - $p$: vị trí trung tâm đối tượng, $s$: size, $w$: confidence score, $id$: id
* Output:
    * $T^{(t)} = \{b_0^{(t)}, b_1^{(t)}, ...\}$

Để xây dựng được Tracking-conditioned detection, CenterTrack tiến hành sử dụng đồng thời frame tại thời điểm $t$ và $t-1$. Điều này cho phép mô hình học được sự thay đổi của môi trường và đối tượng trong quá khứ, tăng khả năng detect ra đối tượng ở hiện tại. 

Nếu đọc kĩ source code, các bạn sẽ thấy, đầu tiên CenterTrack sẽ **biến $T^{(t-1)}$ thành 1 class-agnostic single-channel heatmap** (tức sẽ không quan tâm đến việc phân lớp đối tượng nữa) hay còn gọi là **tracklet  heatmap**: $H^{(t-1)} = R(T^{(t-1)}) \in R^{W \times H \times 1}$ Tiếp theo, tiến hành đưa lần lượt $I^{(t)}, I^{(t-1)}, H^{(t-1)}$ qua 1 mạng covolution để cộng lại với nhau, tạo thành 1 input duy nhất đưa vào backbone.
```python
self.base_layer = nn.Sequential(
    nn.Conv2d(3, channels[0], kernel_size=7, stride=1,
              padding=3, bias=False),
    nn.BatchNorm2d(channels[0], momentum=BN_MOMENTUM),
    nn.ReLU(inplace=True))
            
self.pre_img_layer = nn.Sequential(
    nn.Conv2d(3, channels[0], kernel_size=7, stride=1,
              padding=3, bias=False),
    nn.BatchNorm2d(channels[0], momentum=BN_MOMENTUM),
    nn.ReLU(inplace=True))

self.pre_hm_layer = nn.Sequential(
    nn.Conv2d(1, channels[0], kernel_size=7, stride=1,
            padding=3, bias=False),
    nn.BatchNorm2d(channels[0], momentum=BN_MOMENTUM),
    nn.ReLU(inplace=True))
```
```python
x = self.base_layer(x)
if pre_img is not None:
    x = x + self.pre_img_layer(pre_img)
if pre_hm is not None:
    x = x + self.pre_hm_layer(pre_hm)
```

So sánh với kiến trúc CenterNet mình đã trình bày ở phần trước, **CenterTrack chỉ bổ sung thêm 4 channels cho input (3 channels của $I^{(t-1)}$ và 1 channel của $H^{(t-1)}$), ngoài ra thêm 2 channels cho output** (mình sẽ trình bày ở phần sau). Do đó, tác giả quyết định sử dụng lại weights của CenterNet cho những phần tương đồng với CenterTrack, những phần còn lại thì weights được khởi tạo ngẫu nhiên và thực hiện training giống như training CenterNet.

Một vấn đề khác được tác giả quan tâm là vấn đề tracklet heatmap $H^{(t-1)}$ là ground truth, do đó nó sẽ không cover được các trường hợp như **tracking bị thiếu, bắt nhầm đối tượng hoặc false positive** - Tình trạng sẽ rất hay gặp khi inference. Để giải quyết điều này, tác giả đã ngẫu nhiên sinh thêm các lỗi này trong quá trình training bao gồm **add noise, thêm false positive, hoặc tăng false negative bằng cách xóa đi một vài đối tượng.** Điều này giúp mô hình có tính khai quát hơn trong thực tế.

### 3.3  Association through offsets
Như mình có nói trong phần ý tưởng ban đầu: "*Nếu học được sự di chuyển (displayment) của đối tượng giữa các frame, object detector có thể mở rộng thành object tracker*.", CenterTrack tiến hành học "displayment" bằng việc đơn giản thêm 1 head nữa (so với 3 head của CenterNet): **Displayment Head**. Output của head này sẽ là 1 tensor $\hat{D}^{(t)} \in R^{\frac{W}{R} \times \frac{H}{R} \times 2}$.

Loss function: 
$$L_{size} =  \frac{1}{N}\sum_{i=1}^N|\hat{D}_{p_i^{(t)}} - (p_i^{(t-1)} - p_i^{(t)})|$$

Sau khi có giá trị $\hat{D}_{\hat{p}}$, tác giả sử dụng 1 **thuật toán matching tham lam** cực kì đơn giản (đã được xác thực là tốt hơn Hungarian Algorithm trong phần này - 1 ưu điểm khác của tracking object as point) để liên kết id của các đối tượng xuyên suốt video. Với mỗi detection tại vị trí $\hat{p}$ ở thời điểm t, tìm kiếm tại thời điểm t-1, **trong vòng tròn có tâm tại $(\hat{p} - \hat{D}{\hat{p}})$  và bán kính $k$ là trung bình nhân của chiều rộng và chiều cao của box**, chọn ra unmatched detection gần nhất, có confidence score cao nhất để match ID. Trong trường hợp không có detection nào match, sẽ khởi tạo ID mới cho đối tượng.
### 3.4 Tổng kết
> One-sentence method summary: Our model takes the current frame, the previous frame, and a heatmap rendered from previous tracking results as input, and predicts the current detection heatmap as well as their offsets to centers in the previous frame.

**Note**: CenterTrack có thể training cả trên ảnh tĩnh
> The idea is simple: we simulate the previous frame by randomly scaling and translating
the current frame.
# 4. TraDeS: Track to Detect and Segment (CVPR 2021)
OK, bây giờ đến với phần chính của bài viết này: **TraDeS (CVPR2021)** , kiến trúc này có gì đặc biệt? Tại sao mình phải mất 2 phần bên trên đề cập đến CenterNet và CenterTrack chỉ để chuẩn bị cho phần này? Tư tưởng áp dụng ở đây là gì? ... Chúng ta sẽ cùng nhau trả lời 10 vạn câu hỏi vì sao ngay sau đây. 
### 4.1 Ý tưởng
Phần trước mình đã nói về CenterTrack, nhưng mình mới nói về nhiều về ưu điểm chứ chưa nhắc gì đến nhược điểm. Và giờ, chúng ta sẽ bàn về nhược điểm:
* **Center point collision** - Hoạt động kém với các vật có tâm ở gần nhau: Đây là vấn đề chung của cả CenterNet và CenterTrack.
* **Khả năng liên kết dữ liệu dài hạn kém**: IDSWs của CenterTrack tương đối cao so với các phương pháp khác, điều này được hiểu là do matching algorithms và cách learn displayment của CenterTrack.
* **Chưa quan tâm quá nhiều đến đặc trưng của đối tượng**: Đây là nguyên nhân khiến CenterTrack kém trong việc liên kết dài hạn, khi mà loss function mới chỉ quan tâm đến 2 điểm trung tâm.

Nhận thấy những nhược điểm này, nhóm tác giả của TraDeS cố gắng giải quyết vấn đề của CenterTrack bằng việc **tìm cách thêm 1 module Re-ID Embedding vào trong mô hình và sử dụng module đó 1 cách hiệu quả nhất.**

![imgur](https://i.imgur.com/cRP1GhK.png)

Bàn về việc thêm module Re-ID Embedding, đã có rất nhiều phương pháp thực hiện ý tưởng tương tự, tuy nhiên, mỗi phương pháp lại có những nhược điểm riêng:
* Đối với nhóm Tracking by Detection (TBD), việc thêm Re-ID Embedding chỉ đơn giản là **thêm 1 nhánh riêng rẽ, độc lập với object detector, dùng để trích xuất đặc trưng** các bounding box dùng trong liên kết dữ liệu. Cách làm này thật sự đã giúp các mô hình chính xác hơn, IDSWs cũng giảm đáng kể nhưng đánh đổi lại là tốc độ xử lí tương đối lâu.
* Để tối ưu hơn về thời gian, nhóm Joint Detection and Tracking (JDT) cố gắng tìm cách **thêm 1 branch nữa vào mô hình để training đồng thời cả detector và re-id embedding**. Cách làm này được JDE, FairMOT, ... áp dụng và thực sự đã tăng tốc xử lí lên khá nhiều.  Thế nhưng 1 vấn đề đáng quan ngại cũng xuất hiện: cân bằng được performance của 2 nhánh. Tại sao cần cân bằng? Đó là do mục tiêu tối ưu của 2 nhánh là khác nhau, thậm chí có thể là đối lập nhau. **Nhánh re-id sẽ tập trung phân biệt từng cá thể, đối tượng với nhau** (tối ưu intra-class variance) trong khi **nhánh detection sẽ tập trung phân biệt đối tượng giữa các lớp với nhau** (tối ưu inter-class variance, làm giảm intra-class variance).

> The reason is that re-ID focuses on intra-class variance, but detection aims to enlarge inter-class difference and minimize intra-class variance.

TraDeS cũng tìm cách thêm re-id embedding vào, nhưng dưới 1 góc nhìn khác: **Qua 2 modules Cost Volume based Association (CVA) và Motion-guided Feature Warper (MFW)**. Trong phần tiếp theo, chúng ta sẽ cùng tìm hiểu cụ thể hơn về cách hoạt động của 2 modules này.
### 4.2 Tổng quan kiến trúc
![imgur](https://i.imgur.com/xu84rw5.png)

Khá may mắn, nhóm tác giả TraDeS đã vẽ 1 hình đủ chi tiết để mô tả kiến trúc của toàn bộ mô hình. Về mặt tổng quan, có thể chia khối kiến trúc này thành 4 khối nhỏ hơn:
* **Backbone**: Dùng để trích xuất đặc trưng của ảnh. Phần này thì các bạn cũng khá quen thuộc rồi, nó giống y xì với CenterNet và CenterTrack. Cụ thể hơn thì tác giả sử dụng DLA-34 làm backbone chính cho các thử nghiệm phía sau, các thông số khác thì tương tự như CenterTrack.
* **CVA**: Dùng để trích xuất re-id embedding. Cụ thể thì CVA sẽ bao gồm 1 mạng CNN nhỏ kèm 1 Cost Volume Map, lát nữa chúng ta sẽ đi vào chi tiết sau.
* **MFW**: Tận dụng các dấu hiệu theo dõi từ CVA để lan truyền và tăng cường cho feature map, dùng làm input cho các head network của mô hình.
* **Head**: Tương tự như các Head Network của CenterTrack. Ngoài ra, tùy vào từng bài toán cụ thể (3D Tracking, Segmentation Tracking) có thể bổ sung thêm 3D Head hoặc Mask Head. (**Chú ý: TraDeS không sử dụng Displayment Head để dự đoán sự dịch chuyển như CenterTrack, thay vào đó sử dụng CVA và MFW để thực hiện điều này**)

Các bạn có thể quan sát ảnh trên để hình dung luồng xử lí của mô hình. Hoặc nếu muốn rõ tường tận hơn, hãy đọc paper gốc và truy cập trực tiếp source code: https://github.com/JialianW/TraDeS/blob/HEAD/src/lib/model/networks/base_model.py
### 4.3 Cost Volume based Association (CVA)
![imgur](https://i.imgur.com/WGgAj8g.png)

Bây giờ, chúng ta sẽ phân tích về CVA (phần màu xanh lá trong hình trên) - 1 trong 2 đóng góp lớn nhất của nhóm tác giả trong công trình nghiên cứu này. Một cách tóm tắt, **CVA thực hiện lấy những feature từ mạng $\sigma$, chuyển thành Cost Volume rồi tính toán offset tracking** dùng cho MFW. 

Nói qua 1 chút về Cost Volume ở đây, thì Cost Volume là 1 đại lượng khá lạ lẫm đối với các bài toán xử lí ảnh 2D nhưng lại đặc biệt phổ biến trong các bài toán xử lí ảnh 3D, có thể kể đến như depth estimation, stereo matching, ... . Hiểu đơn giản, cost volume lưu trữ độ tương đồng của 1 điểm với các điểm xung quanh nó.

Trong TraDeS, cost volume được tính như sau: 
* Gọi 2 feature $f^t$ và  $f^{t-\tau}$ là 2 output thu được từ backbone của $I^t$ và $I^{t-\tau}$
* Ta có $e^t = \sigma (f^t)$ và  $e^{t-\tau} = \sigma (f^{t-\tau})$ $\in R^{W_F \times H_F \times 128}$ là ouput sau khi đi qua $\sigma$ - mạng trích xuất re-id embedding (gồm 3 lớp convolution).
* Để giảm thiểu tham số tính toán, tác giả downsample từ $e$ xuống $e' \in R^{W_C \times H_C \times 128}$ với $W_C = \frac{W_F}{2}, H_C = \frac{H_F}{2}$
* Tính toán cost volume 4 chiều $C \in R^{W_C \times H_C \times W_C \times H_C}$ với $C_{ijkl} = e'^t_{ij}e'^{t - \tau T}_{ij}$. Ở đây, mỗi giá trị $C_{ijkl}$ đại diện cho độ tương đồng giữa embedding ở vị trí $(i, j)$ tại thời điểm $t$ và embedding ở vị trí $(k, l)$ ở thời điểm $t - \tau$

Để tính toán offset tracking - ma trận $O \in R^{W_C \times H_C \times 2}$ - **lưu trữ thông tin displayment từ frame $t$ đến frame $t - \tau$**, TraDeS lần lượt thực hiện các bước sau
* Đầu tiên, sử dụng max pooled với 2 kernel  $1 \times W_C, H_C \times 1$ + normalized bằng softmax, thu được $C^W_{i, j} \in [0, 1]^{1 \times W_C}$ và $C^H_{i, j} \in [0, 1]^{H_C \times 1}$ - đại diện cho khả năng đối tượng xuất hiện ở vị trí $(i, j)$ tại thời điểm $t-\tau$
* Tiếp theo tính toán $M_{i, j} \in R^{1 \times W_C}$ và $V_{i, j} \in R^{H_C \times 1}$ đại diện cho horizontal và vertical offset templates.
$$
\begin{cases}
M_{i, j, l} = (l-j) \times s & 1 \leq l \leq W_C\\
V_{i, j, k} = (l-j) \times s & 1 \leq k \leq H_C
\end{cases}
$$
* Cuối cùng, thu được $O_{i, j} = [C^{HT}_{i, j}V_{i, j}, C_WM_{i, j}^T]^T$

$\sigma$ là 1 mạng learnable trong CVA, là phần chính để trích xuất re-id embedding. Như mình có nhắc qua phía trên, việc training re-id và detection có thể conflict do target ảnh hưởng lẫn nhau, do đó, TraDeS thực hiện tác động lên cost-volume để giám sát quá trình học của $\sigma$ thay vì tác động trực tiếp lên $e$ như những phương pháp thông thường.
$$
L_{CVA} = \frac{-1}{\Sigma_{ijkl}Y_{ijkl}}\sum_{ijkl}
\begin{cases}
(1-C^W_{i,j,l})^\beta log(C^W_{i,j,l}) + (1-C^H_{i,j,k})^\beta log(C^H_{i,j,k}) & \text{if } Y_{ijkl} = 1 \\
0 & other wise
\end{cases}
$$

Với $Y_{ijkl} = 1$ khi 1 đối tượng ở vị trí $(i, j)$ tại thời gian $t$, xuất hiện ở vị trí $(k, l)$ tại thời gian $t-\tau$. Các trường hợp còn lại, $Y_{ijkl} = 0$. $\beta$ là hyper-parameter của focal loss.

Tóm lại, **CVA giúp TraDeS sử dụng 1 cách hiệu quả hơn embedding vector (qua cost volume), đồng thời đưa ra 1 phương pháp mới xác định displayment một cách hiệu quả.**
### 4.3 Motion-guided Feature Warper (MFW)
![imgur](https://i.imgur.com/WGgAj8g.png)

Module thứ 2 là MFW (phần xanh dương trong ảnh trên), gồm 2 chức năng chính: Lan truyền thông tin (Temporal Propagation) và tăng cường feature (Feature Enhancement) làm đầu ra cho output. 

Thật ra cũng không có gì đặc biệt lắm, TraDeS chỉ đơn giản kết hợp $O$ từ phần CVA (cụ thể là $O^D = \gamma(O^C)$)và  $\overline{f}^{t-\tau}$ (được tạo ra bằng cách nhân element wise $f^{t-\tau}$ và heatmap tại thời điểm $t - \tau$ ). 2 giá trị này sau đó sẽ được đưa qua mạng Deformable convolution network (DCN) để tạo $\hat{f}^{t-\tau}$ tăng cường cho $f^t$.

Các bạn có thể đọc thêm về DCN tại: [Review: DCN / DCNv1](https://towardsdatascience.com/review-dcn-deformable-convolutional-networks-2nd-runner-up-in-2017-coco-detection-object-14e488efce44) 

MFW có thể tổng hợp được $\hat{f}^{t}$ từ nhiều $\hat{f}^{t-\tau}$, nhưng thử nghiệm cho thấy **$\tau = 2$ cho trade-off tốt nhất**
 
**MFW giúp TraDeS có khả năng khôi phục các đối tượng bị bỏ sót và giảm flase negative, cũng như giúp các tracklet hoàn chỉnh, đạt được MOTA và IDF1 cao hơn**
### 4.3 Data Association
Nhờ việc sử dụng thêm re-id embedding, TraDeS bên cạnh khả năng theo dõi ngắn hạn như CenterTrack, còn có thêm khả năng theo dõi dài hạn với các đối tượng bị che phủ lâu, hoặc biến mất khỏi hình ảnh, từ đó làm giảm số lượng IDSWs đi đáng kể

Việc liên kết dữ liệu của TraDeS có thể được chia làm 2 pha chính: 
* **Pha 1 (Theo dõi ngắn hạn)**: Tương tự CenterTrack, với mỗi detection tại vị trí $\hat{p}$ ở thời điểm t, tìm kiếm tại thời điểm t-1, **trong vòng tròn có tâm tại $(i, j) + O^C_{i, j}$  và bán kính $r$ là trung bình nhân của chiều rộng và chiều cao của box**, chọn ra unmatched detection gần nhất, có confidence score cao nhất để match ID.
* **Pha 2 (Theo dõi dài hạn)**: Trong trường hợp pha 1 không match được với track nào trong frame gần nhất, pha 2 được sử dụng để match với những frame xa hơn. Cụ thể, TraDeS sẽ **sử dụng những embedding $e$ (output của $\sigma$) để tính toán độ tương đồng** với những embedding trong quá khứ, Một track sẽ được coi là match nếu nó có độ tương đồng lớn nhất và vượt qua 1 ngưỡng cụ thể (Ví dụ 0.3).
* Nếu cả 2 pha đều không tìm được track để match, khi đó sẽ tiến hành khởi tạo ID mới cho đối tượng
### 4.4 Tổng kết
Tổng kết lại, TraDeS có những cải tiến mới mẻ và đáng chú ý sau:
* TraDeS giới thiệu một Tracking-conditioned-Detection end-to-end mạnh mẽ, cho phép sử dụng các kết quả tracking để cải thiện performance của detection, đồng thời cũng tăng hiệu quả tracking (Tương tự CenterTrack nhưng mạnh mẽ hơn) .
* TraDeS đưa ra hướng tiếp cận mới, sử dụng Cost Volume giúp đảm bảo việc trainning đồng thời re-id embedding và detection mà không bị conflict (Chi tiết đọc phần CVA).
* TraDeS trình bày về MFW, một module cho phép lan truyền các feature trong quá khứ để tăng cường các feature hiện tại.
* TraDeS sử dụng data association với 2 pha, cho phép theo dõi ngắn hạn và dài hạn, giúp giảm IDSWs.
* Source code của TraDeS được base và chỉnh sửa từ source code của CenterTrack: https://github.com/JialianW/TraDeS
* Paper: https://arxiv.org/pdf/2103.08808v1.pdf
# 5. Kết luận
OK Done! Chắc đọc cái bài này các bạn mệt não lắm, mình viết cũng vừa mệt não vừa mỏi tay mà @@. 

Trong bài viết này, mình đã cùng các bạn tìm hiểu TraDeS - một paper được accept tại CVPR 2021. Hàng CVPR thì vẫn luôn là hàng xịn rồi, nên mình đã viết bài phân tích này để nêu lên những ý tưởng mới mẻ, độc đáo của nó. Sẵn tiện, chúng ta cũng đã điểm qua 2 mô hình nổi tiếng khác CenterNet, CenterTrack - những mô hình ảnh hưởng lớn đến TraDeS. 

Hi vọng qua bài viết này, các bạn có thể nhiều góc nhìn hơn về object tracking, cũng như có hứng thú để tìm hiểu nhiều hơn trong lĩnh vực này. 

Cuối cùng, nhưng vô cùng quan trọng, đừng quên **Upvote + Comment + Share** bài viết để mình có thêm động lực viết nhiều bài chất lượng hơn nha. 

See ya :metal::metal::metal: