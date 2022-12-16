# Tại sao lại là TOOD?
- Vì trong paper này có một phần mà các paper về Object Detection hiện nay áp dụng khá nhiều, tiêu biểu là YOLOv6 hay DAMO-YOLO mới ra gần đây. 
- Cách giải quyết vấn đề dễ hiểu, trực quan, kèm theo chứng minh về mặt hình ảnh rõ ràng 
- Author thân thiện :v 

# Task conflict, Task misalignment 
Trong Object Detection (**OD**), ta phải làm 2 nhiệm vụ: Xác định vật thể nằm ở đâu trong ảnh (Localization, Regression) và phân loại xem vật thể đó là vật thể gì (Classification). Vì vậy, bài toán OD là một bài toán Multi-task learning (làm nhiều việc cùng một lúc). Một model OD thì gồm 2-3 phần: Backbone, Neck (có thể có hoặc không) và Head. Phần Backbone dùng để lấy ra các đặc trưng của ảnh, phần Head thì sẽ sử dụng các đặc trưng đó để làm 2 nhiệm vụ đã nói ở trên.    
![image.png](https://images.viblo.asia/30f8933f-526b-4741-ba8f-9c069bbc73d0.png)  
![image.png](https://images.viblo.asia/f10fd0b0-9db1-4432-be32-fa2dc2a9ff79.png)  
<div align="center">Hình 1. Kiến trúc Faster RCNN (trên) và YOLO (dưới)</div>

Ở những model OD thế hệ cũ (Faster R-CNN, YOLO, yada yada), thì việc Localization và Classification được thực hiện trên cùng một nhánh của Head (Hình 1). Điều này thì có gì không tốt? Như ta đã biết, một model OD phải làm 2 việc cùng một lúc: Localization và Classification. Tuy nhiên, tính chất của 2 việc này lại khá là khác nhau. Classification thì cần sử dụng những features mang tính biểu hiện cho sự vật nào đó mạnh mẽ (discriminative features) còn Localization thì lại cần sử dụng những features mang tính hiểu được sự vật đó có giới hạn, kích cỡ như nào (thường tập trung vào vùng bao quanh sự vật - boundary region) (Hình 2)

![image.png](https://images.viblo.asia/53287a5c-2216-4947-a1ea-adaa9dbe9826.png)
<div align="center">Hình 2. Sự khác nhau về features của 2 task. Classification thì tập trung nhiều vào phần cổ + đầu và chân của con hươu cao cổ, còn Regression (Localization) thì tập trung nhiều vào giới hạn về kích cỡ của con hươu cao cổ trong ảnh (kiểu dạng Bounding Box)</div>

Sự khác nhau trong features của task như trên gọi là **task conflict**. 

Vì vậy, ta cần phải tách biệt 2 task này với nhau trong Head của model. Và YOLOX (Hình 3) đã làm được điều đó. Head lúc này sẽ có nhiều nhánh, thay vì chỉ một nhánh, và mỗi nhánh sẽ chịu trách nhiệm cho một task khác nhau. 

![image.png](https://images.viblo.asia/86ba25d9-9ee4-4f25-ae74-9e932e7aa89d.png)
<div align="center">Hình 3. Decoupled Head của YOLOX</div>

Thế còn gì băn khoăn nữa, tách thành 2 nhánh cho 2 task khác nhau trong head, quá đơn giản. Tuy nhiên, với việc tách ra như này thì khi model thực hiện predict, kết quả giữa 2 task sẽ không thật sự thống nhất (Hình 4). Hiện tượng này gọi là **task misalignment**

![image.png](https://images.viblo.asia/6c933c9a-d9d1-44d5-b1e2-f4caddbf0a21.png)
<div align="center">Hình 4. Trái: kết quả của các prediction được đưa ra bởi model có Decoupled Head, màu vàng là ground truth box, box xanh là bounding box sinh ra từ ô vuông màu xanh, box đỏ là bounding box sinh ra từ ô vuông màu đỏ. Giữa: Tổng hợp classification score của các điểm trong feature maps. Phải: Tổng hợp IoU score của các điểm trong feature maps. Ta cần xác định cái "dining table" ở trong ảnh bên trái. Tuy nhiên, ở giữa, điểm có classification score cao nhất lại có vẻ nằm ở vùng của cái Pizza hơn là cái bàn. Và ở hình bên phải, điểm có IoU Score cao nhất giữa box được predict và ground truth box là cao nhất sẽ nằm trong vùng có cái bàn. Đây gọi là hiện tượng 2 task không thống nhất với nhau. Vùng có Classification score cao không phải là vùng có IoU Score cao. Điều này thì ảnh hưởng gì? Nếu ta sử dụng thuật toán NMS (Non Max Supression), điểm của Object trong ảnh sẽ được tính theo Classification score * IoU Score -> Box đỏ có điểm là 0.13 * 0.4 = 0.052, Box xanh có điểm là 0.04 * 0.93 = 0.0372, do đó, box xanh sẽ bị loại trong quá trình NMS dù box xanh rõ ràng là tốt hơn</div>

Ta đã hiểu việc không thống nhất giữa 2 tasks sẽ có ảnh hưởng như nào rồi, thế nguyên nhân của sự không thống nhất này là gì? Có 2 nguyên do: 
- **Không có sự tương tác giữa 2 tasks.** Việc tách 2 nhánh trong Head để học các task phân biệt giúp tránh được **task conflict**, nhưng trớ trêu là nó lại làm giảm tương tác giữa 2 tasks với nhau. 
- **Label Assignment (LA) không quan tâm đến task.** Hầu hết các chiến lược LA sử dụng các luật như: IoU cao (YOLO, RetinaNet,...) hay gần tâm của object (FCOS, ATSS,...). Tuy nhiên, như đã thấy ở Hình 4, những điểm có IoU cao thì chưa chắc ở đó Classification score đã, hay những điểm có IoU cao thì lại không hề gần tâm của object. LA hiện đại như OTA đã, không biết vô tình hay cố ý, có một chút sự tương tác giữa các task khi thực hiện assignment. Nhớ lại để OTA chọn được positive anchor giữa các anchor, thì **cost** phải đạt được giá trị như nào đó. Và **cost** trong OTA là tổng có trọng số của Classification Loss và Localization Loss ($c^{fg}=L_{cls} + L{reg}$). Chi tiết về OTA các bạn có thể đọc ở [đây](https://viblo.asia/p/paper-explain-yolov7-su-dung-cac-trainable-bag-of-freebies-dua-yolo-len-mot-tam-cao-moi-phan-2-0gdJz0YEVz5). 

Với 2 nguyên do trên, TOOD đề xuất luôn cách xử lý bao trọn cả 2 nguyên do đó: một liên quan đến kiến trúc của Head, và một liên quan đến Label Assignment.
# Task-aligned Head
Ta sẽ thiết kế một Head để model có thể thống nhất 2 task này với nhau (**task align**) nhưng đồng thời vẫn phải giữ cho chúng không xảy ra hiện tượng **task conflict**. Task-aligned Head (T-Head) làm điều này thông qua 2 bước: align ở mức features, và align ở mức prediction. Thay vì tách thẳng thành 2 nhánh từ ban đầu để tránh **task conflict**, T-Head cho chúng 1 nhánh trước, để lấy sự tương tác giữa 2 task với nhau, rồi sau đó mới tách thành 2 nhánh (nghe tới đây thì có vẻ bất hợp lý vì 1 nhánh phần đầu sẽ gây ra task conflict, lúc sau mới tách thì có muộn không? Đọc tiếp các bạn sẽ rõ được tại sao lúc sau T-Head vẫn có thể tránh được task conflict). 

Phần 1 nhánh lúc đầu sẽ dùng để 2 task tương tác vs nhau, gọi là *task interactive features*. Gọi $X^{fpn} \in \R^{C \times H \times W}$ là output features của FPN, ta tạo ra $N$ lớp Conv liên tiếp nhau để học *task interactive features* $X^{inter}$: 

$$
X_k^{inter} = \begin{cases}
\delta (conv_k(X^{fpn})) & k=1 \\
\delta(conv_k(X_{k-1}^{inter})) & k \in [2,...N]
\end{cases}
$$
với $X_k^{inter}$ là output task interactive features ở Conv layer thứ $k$ trong số $N$ Conv layers. $conv_k$ là Conv layer thứ $k$, $\delta$ là ReLU activation. Trong TOOD, $N=6$ để cho có cùng số Parameters với các models 2 nhánh khác. 

## Task-aligned predictor

![image.png](https://images.viblo.asia/f4253423-7f60-46a5-a024-790fd3592130.png)
<div align="center">Hình 5. Kiến trúc 2 nhánh thông thường (trái) so với T-Head (phải)</div>

Như đã nói ở trên, kiến trúc 1 nhánh sẽ gây ra hiện tượng **task conflict**. Và giờ ta phải tách features của từng task ra một cách **hợp lý**. Hợp lý là như nào? Nếu tách như thông thường, áp dụng một loạt các Conv layers nữa thì khác gì các Head của model khác đâu. Lúc này, ta sẽ sử dụng kĩ thuật Attention để model tự chọn các features cần thiết cho các task (các bạn có thể đọc bài [này](https://viblo.asia/p/mot-chut-ve-co-che-attention-trong-computer-vision-x7Z4D622LnX) để có cái nhìn chi tiết hơn về kĩ thuật Attention, một kĩ thuật cực kì quan trọng). Ở phía trên, ta đã có được $N$ *task interactive features* $X^{inter}$ với $N$ là số Conv layers để học task interactive features. Ta sẽ thực hiện **Layer Attention** để phân task interactive features ở layer thứ $k$: $X_k^{inter}$ về với task phù hợp cho nó. Ủa thế thì mất đi sự tương tác giữa 2 task rồi còn đâu, lại task nào về nhà của task đấy? Đúng nếu sử dụng một ngưỡng cứng để phân $X_k^{inter}$ thì có vẻ là chả khác gì như ban đầu, nhưng ta sử dụng ngưỡng mềm, tức là 0.7 $X_k^{inter}$ có thể về task Classification, và 0.3 $X_k^{inter}$ có thể về task Localization. Features thu được sau khi đi qua Layer Attention gọi là **Task specific features**.

![image.png](https://images.viblo.asia/ff9d7330-c750-4008-b522-ca44d7e14ee3.png)
<div align="center">Hình 6. Layer Attention trên task interactive features để tạo ra task specific features</div>

Quá trình Layer Attention được thực hiện như sau (Hình 6): 

$$
X_k^{task} = w_k \cdot X_k^{inter}, \quad \forall k \in [1,...,N]
$$

Với $w_k$ là attention weight cho task interactive features $X_k^{inter}$ được lấy từ $w \in \R^N$. $w$ được tạo ra như sau:

$$
w = \sigma(fc_2(\delta(fc_1(x^{inter}))))
$$

Với $x^{inter}$ là $X^{inter}$ sau khi thực hiện Global Average Pooling (GAP), $fc_1, fc_2$ là 2 lớp Fully Connected (FC), $\delta$ là ReLU activation và $\sigma$ là sigmoid activation. Quá trình tính $w$ được thể hiện trên Hình 6. Quá trình tính Layer Attention gần như y hệt với cách tính Channel Attention của Squeeze and Excitation, chỉ khác là số neurons trong $fc_2$ không bằng số channel của $x^{inter}$ mà bằng $N$. Mình đã có hỏi tác giả rằng tại sao lại sử dụng Layer Attention thay vì Channel Attention của Squeeze and Excitation, thì tác giả nói rằng chúng có chung một mục đích, tuy nhiên Layer Attention lại nhẹ hơn khá nhiều và tác giả cũng nghĩ rằng như thế là đủ tốt rồi. 

Rồi sau đó **tiền prediction** $Z^{task}$ (ngay trước khi đưa ra prediction) của task tương ứng sẽ được thực hiện tính với $X^{task}$:

$$
Z^{task} = f^{task}(conv_2(\delta(conv_1(X^{task}))))
$$

Với $X^{task}$ là concatenation của các $X_k^{task}$, $conv_1$ là $1 \times 1$ Conv để giảm chiều channels của cái feature maps được concatenate lại, $\delta$ là ReLU activation, $conv_2$ là $3 \times 3$ Conv với số channel tương ứng của task và $f^{task}$ là function ứng với task của nó: *sigmoid* với nhánh Classification và *distance -> box* với nhánh Localization. 

## Prediction alignment

![image.png](https://images.viblo.asia/4fd5d362-36cd-4454-a66f-66157bb548bd.png)
<div align="center">Hình 7. T-Head kèm prediction alignment</div>

Nếu chỉ dừng lại ở bên trên, thì đã đủ để làm một cái Head có vẻ chất lượng rồi, prediction ổn áp các kiểu r. Cơ mà có lý do bên trên mới chỉ là **tiền prediction** $Z^{task}$. Sau đó, tác giả tiếp tục đưa thêm sự tương tác giữa 2 task trong quá trình prediction để 2 tasks align hơn nữa. Trong các model khác, ta có một nhánh phụ được sinh ra từ nhánh Localization, gọi chung là LQE (Localization quality estimation): ví dụ như Centerness của FCOS, IoU Score của ATSS, Objectness Score của YOLOX,... Nhược điểm của chúng là ta chỉ có thể align task Classification dựa trên features của task Localization **trong quá trình inference**. GFL (nếu chưa rõ về GFL, các bạn có thể đọc ở [đây](https://viblo.asia/p/paper-explain-generalized-focal-loss-learning-qualified-and-distributed-bounding-boxes-for-dense-object-detection-bWrZnAwmKxw)) đã nhận thấy điều này là hơi bất hợp lý, và đã có thể align chúng cả trong quá trình training. Tuy nhiên, nó vẫn chỉ là align 1 phía (Classification nhận features từ Localization). TOOD thực hiện align 2 phía (Hình 7). 

Gọi tiền prediction của nhánh Classification là $P$, tiền prediction của nhánh Localization là $B$. Ta sẽ thực hiện alignment với cả 2 nhánh. Xét nhánh Classification, ta sẽ sinh ra **spatial probability map** $M \in \R^{H \times W \times 1}$ để align classification prediction trên từng điểm không gian của feature maps như sau: 

$$
P^{align} = \sqrt{P \times M}
$$

$M$ được tính từ task interactive features $X^{inter}$ như sau:

$$
M = \sigma(conv_2(\delta(conv_1(X^{inter}))))
$$

với $conv_1$ là $1 \times 1$ Conv, $\delta$ là ReLU activation, $conv_2$ là $3\times 3$ Conv với output channel là 1, $\sigma$ là sigmoid activation. 

Tiếp theo đó, để align nhánh Localization, ta thực hiện học **spatial offset map** $O \in \R^{H \times W \times 8}$ (8 là 2 lần 4, tức là mỗi giá trị của Bounding Box sẽ được điều chỉnh theo 2 chiều $x,y$) để điều chỉnh prediction Bounding Box tại mỗi địa điểm trên feature maps như sau:

$$
B_{i,j,c}^{align} = B(i +O(i,j,2 \times c), j + O(i, j, 2 \times c + 1), c)
$$

Đây chính là một phép Spatial Attention đặc biệt, bản chất **spatial offset map** $O$ mà ta học được chính là học offset map của **Deformable Convolution**, và quá trình tạo ra $B^{align}$ chính là quá trình thực hiện phép Deformable Convolution với input feature maps $B$ và offset $O$. Nếu chưa rõ về cách Deformable Convolution hoạt động, các bạn có thể đọc ở [đây](https://viblo.asia/p/mot-chut-ve-co-che-attention-trong-computer-vision-x7Z4D622LnX#_spatial-attention-5).

Tương tự, $O$ cũng được tính từ task interactive features $X^{inter}$:

$$
O = conv_2(\delta(conv_1(X^{inter})))
$$

# Task Alignment Learning (TAL)
TOOD tạo ra TAL để tăng cường khả năng alignment của model thông qua 2 quá trình: Label Assignment (LA) và tính Loss. 
## Task-aligned Sample Assignment
Xét Classification Score và IoU Score chính là 2 nhân tố để đánh giá chất lượng của prediction, ta sẽ đo độ align giữa 2 task sử dụng một chỉ số kết hợp giữa Classification Score va IoU Score như sau:

$$
t = s^{\alpha} \times u^{\beta}
$$

với $s$ và $u$ lần lượt là Classification Score và IoU Score, 2 hyper-parameter $\alpha$ và $\beta$ dùng để điều chỉnh trọng số giữa 2 nhân tố. $t$ lúc này gọi là alignment metric

Để tăng cường sự align trong quá trình LA, ta sẽ tìm cách để sử dụng alignment metric $t$. Chiến thuật LA của TOOD cực kì đơn giản: với mỗi object trong ảnh, ta sẽ chọn $m$ anchors có giá trị $t$ cao nhất làm positive samples, còn lại là negative. Nó cũng na ná SimOTA của YOLOX. SimOTA của YOLOX thì chọn $k$ anchors có giá trị **foreground cost** thấp nhất. Tuy nhiên, $k$ trong SimOTA được chọn theo thuật toán Dynamic-k, chứ không phải chọn tay như $m$ trong TAL của TOOD :v 

## Task-aligned Loss 
Không chỉ dừng lại ở việc sử dụng alignment metric trong LA, tác giả còn "to infinity and beyond", sử dụng cả alignment metric trong cả Loss.
**Classification Loss.** Thông thường, Classification sử dụng BCE làm Loss, tức là lúc này, target cho BCE Loss chỉ có $0$ hoặc $1$. Tuy nhiên, để align Classification theo Localization thì ta sẽ tìm cách đưa alignment metric $t$ nói trên vào Classification Loss. Tuy nhiên, $s$ và $u$ (Classification Score và IoU Score) là 2 giá trị luôn $<0$, nên khi $\alpha$ và $\beta$ lớn thì $t$ sẽ trở nên cực cực nhỏ, và lúc này, Classification Loss với target $t$ như vậy sẽ khiến model khó hội tụ. Vì vậy, ta sử dụng normalized $t$ là $\hat{t}$ làm target. $\hat{t}$ sẽ được xác định như nào? Khi prediction, ta biết là sẽ có nhiều vị trí trên feature maps đưa ra prediction cho một object, và mỗi vị trí sẽ sinh ra một Bounding Box (BBox), và ứng với nó chính là IoU Score của BBox đó. Thì $\hat{t}$ lúc này sẽ được chọn là giá trị IoU Score cao nhất trong số toàn bộ các IoU Score từ prediction. Classification Loss được định nghĩa như sau:

$$
L_{cls} = \sum_{i=1}^{N_{pos}} |\hat{t}_i - s_i|^{\gamma} BCE(s_i, \hat{t}_i) + \sum_{j=1}^{N_{neg}} s_j^{\gamma} BCE(s_j, 0)
$$ 

Classification Loss gồm 2 phần, phần đầu là cho Positive anchor, phần sau là Negative anchor. $N_{pos}$ là số lượng positive anchor, $N_{neg}$ là số lượng negative anchors, $s_i$ là predicted Classification Score, $\hat{t}_i$ là IoU Score lớn nhất trong số các BBox được predict ra với GT Box, $\gamma$ là hệ số cân bằng. Nhìn thì có vẻ khủng bố nhưng thực chất nó chính là Quality Focal Loss được lấy từ Generalized Focal Loss. Chi tiết về Quality Focal Loss các bạn có thể đọc ở đây: https://viblo.asia/p/paper-explain-generalized-focal-loss-learning-qualified-and-distributed-bounding-boxes-for-dense-object-detection-bWrZnAwmKxw#_quality-focal-loss-qfl-5

**Localization Loss.** Một Box được predict tốt thì sẽ có Classification Score cao và IoU cũng cao, hay $t$ cao. Hơn nữa, việc học từ một BBox có chất lượng cao như vậy thì sẽ lợi cho model hơn là học từ BBox có chất lượng thấp $\rightarrow$ BBox có chất lượng cao và BBox có chất lượng thấp sẽ không nên được đánh giá ngang bằng với nhau trong quá trình training $\rightarrow$ Sử dụng $\hat{t}$ làm hệ số cho Localization Loss. Cụ thể, Localization Loss được tính như sau: 

$$
L_{reg} = \sum_{i=1}^{N_{pos}} \hat{t}_i L_{GIoU}(b_i, \hat{b}_i)
$$

Với $b_i$ và $\hat{b}_i$ lần lượt là ground truth và predicted BBox. $L_{GIoU}$ là GIoU Loss

# Kết quả
![image.png](https://images.viblo.asia/52894a4e-81fc-4cae-9576-2aabc1532253.png)

# Reference 
TOOD: Task-aligned One-stage Object Detection: https://arxiv.org/abs/2108.07755