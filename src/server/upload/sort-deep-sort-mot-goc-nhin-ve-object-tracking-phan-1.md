> Note: Đây là chuỗi bài viết về Object Tracking nằm ở mức cao hơn beginner một chút. Nếu các bạn chưa từng nghe đến Object Tracking hoặc không hiểu Object Tracking là gì, hi vọng các bạn có thể dành chút thời gian tìm hiểu qua một chút trước khi đọc các bài viết trong series này. Bù lại, với những bạn có hứng thú về chủ đề Object Tracking, mình đảm bảo các bạn với các phần được trình bày sau đây sẽ không khiến các bạn thất vọng.  Chúc các bạn có một ngày học tập và làm việc vui vẻ !

![gif](https://i.imgur.com/68mRoZO.gif)

Phần note hầm hố vậy thôi, chứ bài mở đầu series cũng không thể nhảy bổ ngay vào mấy thuật toán hóc búa được. Thế nên, mình vẫn sẽ nhắc lại qua 1 chút về khái niệm cũng như những thông tin cần để ý khi giải quyết các bài toán họ Object Tracking. Hi vọng sẽ giúp các bạn hình dung ra một lộ trình đủ rõ ràng  để bám sát những phần mà mình sẽ trình bày tuần tự sau đó. 

Các bạn cũng có thể ghé qua đọc trước 1 bài viết về tracking khác của tác giả Việt Hoàng : [Computer Vision for object tracking](https://viblo.asia/p/computer-vision-for-object-tracking-jvElayLYlkw)
# 1. Tổng quan Object Tracking
### 1.1 Khái niệm
Object Tracking là bài toán theo dõi một hoặc nhiều đối tượng chuyển động theo thời gian trong một video.  Hiểu một cách đơn giản nhất, nó là bài toán ở mức độ cao hơn so với object detection, khi đối tượng được xử lí không đơn giản là một hình ảnh mà là một chuỗi các hình ảnh : video. 

Nếu đơn giản như vậy, chẳng phải cứ tách video ra thành các frame rồi áp dụng object detection với từng frame là đủ rồi sao? Cũng không có gì khó lắm! Đương nhiên không chỉ đơn giản như vậy, việc tracking bên cạnh việc xác định các bounding box, còn quan tâm đến khá nhiều yếu tố hoặc nhiễu khác nhau: 
* ID của mỗi đối tượng cần đảm bảo luôn không đổi qua các frame 
* Khi đối tượng bị che khuất hoặc biến mất sau 1 vài frame, hệ thống vẫn cần đảm bảo nhận diện lại được đúng ID khi đối tượng xuất hiện
* Các vấn đề liên quan đến tốc độ xử lí để đảm bảo realtime và tính ứng dụng cao
* ...
### 1.2 Phân loại
Object Tracking có thể chia thành 2 cách tiếp cận chính: 
* **Single Object Tracking (SOT)**: Cái tên nói lên tất cả, Single Object Tracking tập trung vào việc theo dõi một đối tượng duy nhất trong toàn bộ video. Và tất nhiên, để biết được cần theo dõi đối tượng nào, việc cung cấp một bounding box từ ban đầu là việc bắt buộc phải có. 

![gif](https://i.imgur.com/ASWx8ze.gif)

* **Mutiple Object Tracking (MOT)**: Mutliple Object Tracking hướng tới các ứng dụng có tính mở rộng cao hơn. Bài toán cố gắng phát hiện đồng thời theo dõi tất cả các đối tượng trong tầm nhìn, kể cả các đối tượng mới xuất hiện trong video. Vì điểu này, MOT thường là những bài toán khó hơn SOT và nhận được rất nhiều sự quan tâm của giới nghiên cứu. 

![gif](https://i.imgur.com/qdl714G.gif)

Bên cạnh việc tiếp cận, các phương pháp giải lớp bài toán này cũng được phân chia rất đa dạng, phổ biến nhất là: 
* Online Tracking : Khi xử lí video, Online Tracking chỉ sử dụng frame hiện tại và frame ngay trước đó để tracking. Cách xử lí này có thể sẽ làm giảm độ chính xác của thuật toán, tuy nhiên nó lại phản ảnh đúng cách vấn đề được xử lí trong thực tế, khi mà tính "online" là cần thiết
* Offline Tracking :  Các phương pháp Offline thường sử dụng toàn bộ frame của video, do đó thường đạt được độ chính xác cao hơn nhiều so với Online Tracking

Ngoài ra còn phân chia theo: 
* Detection based Tracking : Tập trung vào mối liên kết chặt chẽ giữa object detection và object tracking, từ đó dựa vào các kết quả của detection để theo dõi đối tượng qua các frame.
* Detection Free Tracking :  Coi video như 1 dạng dữ liệu dạng chuỗi, từ đó, áp dụng những phương pháp dành riêng cho "chuỗi" như RNN, LSTM, ...
### 1.3 Dataset và Metric đánh giá
Để bắt đầu tìm hiểu về Object Tracking, việc nắm bắt về các tập dữ liệu phổ biến cũng như các metric đánh giá là điều không thể thiếu 
Về dataset, object tracking thường đánh giá dựa trên các tập dữ liệu sau: 
* **MOT Challenge**: MOT Challenge là một cuộc thi thường niên, dataset của MOT Challenge thường được sử dụng để đánh giá điểm chuẩn cho các phương pháp giải quyết bài toán Mutiple Object Tracking. (MOT15, MOT16, MOT17, MOT20, ...). Dữ liệu là chuỗi các video đã được gán nhãn của người đi bộ, được thu thập từ nhiều nguồn khác nhau, với sự đa dạng về độ phân giải, độ chiếu sáng, ...

![img](https://i.imgur.com/6LpDU0F.png)
* **ImageNet VID**: Bên cạnh những bộ dataset nổi tiếng về classification, object detection, ImageNet cũng cung cấp một bộ dataset đủ lớn về object tracking. Đây là chuỗi các video được gán nhãn từ 30 nhóm đối tượng khác nhau. 

![img](https://i.imgur.com/SdjRwwv.png)

Về metric đánh giá, chúng ta cần quan tâm các metric sau:
* **FP** (False Positive) : tổng số lần xuất hiện một đối tượng được phát hiện mặc dù không có đối tượng nào tồn tại
* **FN** (False Negative) :  tổng số lần mà đối tượng hiện có không được phát hiện.
* **ID Switches** : tổng số lần 1 đối tượng bị gán cho 1 ID mới trong suốt quá trình tracking video
* **MOTA**: Mutiple Object Tracking Accuracy
$$
MOTA = 1 - \frac{\Sigma_t(fn_t + fp_t + id\_sw_t)}{\Sigma_t g_t}
$$
* **MOTP**: Mutiple Object Tracking Precision
$$
MOTP = \frac{\Sigma_{i, t}d_t^i}{\Sigma_t c_t}
$$
* **MT** (Most Tracked Target) : tính trong ít nhất 80% video
* **ML** (Most Lost Target) : tính trong 20% video
* **Hz (FPS)**: Tốc độ tracking
# 2. Các vấn đề đáng quan tâm trong Object Tracking 
Như mình đã nhắc đến ở phần đầu, Object Tracking vẫn tồn tại rất nhiều vấn đề cần giải quyết, cũng như cần có thêm nhiều hơn nữa các thuật toán mạnh mẽ để giải quyết bài toán này. Ở đây, mình xin nêu ra 2 vấn đề phổ biến và đáng quan tâm nhất hiện nay. 
### 2.1 Multiple Object Tracking
Một phương pháp Mutiple Object Tracking cố gắng hướng đến việc theo dõi tất cả các đối tượng xuất hiện trong khung hình bằng việc phát hiện và gắn định danh cho từng đối tượng. Bên cạnh đó, các ID đã được gán cho 1 đối tượng cần đảm bảo nhất quán qua từng frame. Vậy, có những vấn đề gì đáng quan tâm ở đây ?
* **Phát hiện "tất cả" các đối tượng**: Đây vẫn luôn là vấn đề được quan tâm nhất trong object detection và vẫn không ngừng có những phương pháp, những thuật toán cải thiện vấn đề này. Trong object tracking, đặc biệt là detection based tracking, việc đảm bảo tính chính xác của quá trình detect cũng vô cùng quan trọng
* **Đối tượng bị che khuất 1 phần hoặc toàn bộ**: Khi 1 ID được gán cho 1 đối tượng, ID cần đảm bảo nhất quán trong suốt video, tuy nhiên, khi một đối tượng bị che khuất, nếu chỉ dựa riêng vào object detection là không đủ để giải quyết vấn đề này
* **Đối tượng ra khỏi phạm vi của khung hình và sau đó xuất hiện lại** : Tương tự như vấn đề trước đó, chúng ta vẫn đang nói về chỉ số ID switches. Cần giải quyết tốt vấn đề nhận dạng lại đối tượng kể cả việc che khuất hay biến mất để giảm số lượng ID_switches xuống mức thấp nhất có thể 
* **Các đối tượng có quỹ đạo chuyển động giao nhau hoặc chồng chéo lên nhau**. : Việc các đối tượng có quỹ đạo chống chéo lên nhau cũng có thể dẫn đến hậu quả gán nhầm ID cho các đối tượng, đây cũng là vấn đề chúng ta cần chú ý xử lí khi làm việc với Multiple Object Tracking
### 2.2 Realtime Object Tracking
Realtime Object Tracking lại quan tâm nhiều hơn về tốc độ xử lí của phương pháp. Thật sự mà nói, vẫn chưa có định nghĩa, tốc độ như thế nào mới được gọi là realtime (30 FPS, 40 FPS hay phải nhanh hơn thế nữa). Thay vì xét về tốc độ, chúng ta hãy định nghĩa realtime một cách dễ hình dung hơn. Phương pháp được gọi là **realtime cần đảm bảo tốc độ đưa ra output là nhanh hơn hoặc ít nhất là nhanh bằng tốc độ đưa vào input.**  

Trong thực tế, nếu việc xử lí từng frame chỉ khiến video có độ trễ 1s so với tốc độ bình thường của nó, việc xử lí này cũng có thể chấp nhận rằng đó là realtime. Tuy nhiên, ngay cả khi chấp nhận có độ trễ, việc đảm bảo tính realtime vẫn luôn là một vấn đề nan giải. Thông thường, chúng ta có thể **bỏ qua 1 vài frame không xử lí cho đến khi frame hiện tại xử lí xong**, sau đó tiếp tục các frame sau - pha xử lí này vẫn sẽ đem lại cảm giác là việc xử lí đang là realtime, tuy nhiên, bù lại, việc tracking mỗi x frame lại làm giảm đáng kể tính chính xác mong muốn. 

Hiện nay, các nghiên cứu mới nhất vẫn luôn tìm kiếm những phương pháp đủ nhanh để hướng tới tính realtime trong xử lí. 

![img](https://i.imgur.com/OpEAUFR.png)
# 3. SORT - Simple Online Realtime Object Tracking
Phần này mình sẽ trình bày về Simple Online Realtime Object Tracking (SORT), một thuật toán thuộc dạng Tracking-by-detection (hay Detection based Tracking).

![img](https://i.imgur.com/1QxVsAS.png)

Một đặc điểm của lớp các thuật toán Tracking-by-detection là tách object detection ra như một bài toán riêng biệt và cố gắng tối ưu kết quả trong bài toán này. Công việc sau đó là tìm cách liên kết các bounding box thu được ở mỗi frame và gán ID cho từng đối tượng. Do đó, chúng ta có một khung quá trình xử lí với mỗi frame mới như sau: 
* **Detect**: phát hiện vị trí các đối tượng trong frame
* **Predict**: Dự đoán vị trí mới của các đối tượng dựa vào các frame trước đó
* **Associate**: Liên kết các vị trí detected với các vị trí dự đoán được để gán ID tương ứng

Vậy SORT xử lí các phần **Detect**, **Predict** và **Associate** như thế nào ? 
### 3.1 Giải thuật Hungary
Giải thuật Hungary được phát triển và công bố vào năm 1955, đề xuất để giải bài toán phân công công việc (assignment problem). Có thể các bạn sẽ thắc mắc là chúng ta đang nói về tracking cơ mà, sao tự nhiên lại có giao việc với nhận việc ở đây. Vậy nên trước tiên, chúng ta sẽ tìm hiểu sự liên quan giữa assignment problem với object tracking 

> Phát biểu bài toán phân công: Có n người (i = 1, 2, …, n) và n công việc (j = 1, 2, … n). Để giao cho người i thực hiện một công việc j cần một chi phí c. Bài toán đặt ra là cần giao cho người nào làm việc gì (mỗi người chi làm một việc và mỗi việc chỉ do một người làm) sao cho chi phí tổng cộng là nhỏ nhất. 

**Liên hệ object tracking**:

Có n detection (i = 1, 2, …, n) và n track predicted (j = 1, 2, … n). Để liên kết một detection i với một track j giả sử dựa vào 1 độ đo D - D là khoảng cách giữa i và j trong không gian vector . Bài toán đặt ra là cần liên kết mỗi detection với mỗi track tương ứng sao cho sai số của việc liên kết  là nhỏ nhất.

Mọi thứ có vẻ đã clear hơn rồi nhỉ, vậy chúng ta sẽ đi sâu hơn vào thuật toán !
![img](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeyZL-xPw3WyBJ5N6X-hyACuhAKcyM0izi3iFN72-V4I9a8v8Sgpq9Ro3WdiPkoDDGh0nkdI1XyWQfaLNyWoB2MnqHX0QTTwgydQ&usqp=CAU&ec=45750089)
Trước tiên, chúng ta mô hình hóa lại bài toán để giảm độ phức tạp khi xử lí 
$$
z = \sum^{n}_{i=1}\sum^{n}_{j=1}c_{ij}x_{ij}  \rightarrow min
$$
Với 
$$
\begin{cases}
\sum^{n}_{i=1}x_{ij} = 1 , i = 1, 2, ... \\
\sum^{n}_{j=1}x_{ij} = 1 , j = 1, 2, ...\\
x_{ij} \geq 0
\end{cases}
$$
Các số ${x_{ij}}$ thỏa mãn các điều kiện trên gọi là một phương án phân công, hay ngắn gọn là một phương án, một phương án đạt cực tiểu của z được gọi là một phương án tối ưu hay lời giải của bài toán.

Vậy, tìm $x_{ij}$ như thế nào ? Chúng ta sẽ dựa vào 2 định lí sau: 
> [Định lý]. Giả sử ma trận chi phí của bài toán giao việc là không âm và có ít nhất n phần tử bằng 0. Hơn nữa nếu n phần tử 0 này nằm ở n hàng khác nhau và n cột khác nhau thì phương án giao cho người i thực hiện công việc tương ứng với số 0 này ở hàng i sẽ là phương án tối ưu (lời giải) của bài toán. 

> [Định lý]. Cho $C = [c_{ij}]$  là ma trận chi phí của bài toán giao việc ($n$ người, $n$ việc) và $X^* = [x_{ij}]$ là một lời giải (phương án tối ưu) của bài toán này. Giả sử $C'$ là ma trận nhận được từ $C$ bằng cách thêm số  $\alpha \neq 0$ (dương hoặc âm) vào mỗi phần tử ở hàng r của $C$. Khi đó $X^*$ cũng là lời giải của bài toán giao việc với ma trận chi phí $C'$.

Thuật toán Hungary dựa vào 2 định lí này, từ đó hình thành được hướng xử lí bài toán : *Biến đổi ma trận (cộng trừ vào các hàng hoặc cột) để đưa về ma trận có n phần từ bằng 0 nằm ở các hàng và cột khác nhau, sau đó, lấy ra phương án tối ưu là các vị trị chứa các phần tử 0 này.*

Cụ thể hơn, có thể chia thuật toán thành các bước sau: 
* Bước 1 (Bước chuẩn bị). Trừ các phần tử trên mỗi hàng của C cho phần tử nhỏ nhất trên hàng đó, tiếp theo trừ các phần tử trên mỗi cột cho phần tử nhỏ nhất trên cột đó. Kết quả ta nhận được ma trận C' có tính chất: trên mỗi hàng, cột có ít nhất một phần tử 0 và bài toán giao việc với ma trận C' có cùng lời giải như bài toán với ma trận C.
* Bước 2: Vẽ một số tối thiểu các đường thẳng trên dòng và cột để đảm bảo mọi phần tử 0 đều được đi qua.
* Bước 3: Nếu có n đường thẳng được vẽ, kết thúc thuật toán và tiến hành phân công công việc. Nếu số đường thẳng được vẽ nhỏ hơn n, vẫn chưa tìm được phương án phân công tối ưu, tiến hành bước tiếp theo.
* Bước 4: Mỗi hàng (hoặc cột) có đường thẳng vẽ qua, ta gọi các hàng (cột) đó là các hàng (cột) thiết yếu. Các hàng (cột) còn lại là các hàng (cột) không thiết yếu. Tìm phần tử nhỏ nhất không nằm trong các hàng (cột) thiết yếu,  tiến hành trừ mỗi hàng không thiết yếu cho phần từ nhỏ nhất ấy và cộng giá trị nhỏ nhất ấy cho cột thiết yếu. Ta được ma trận C’’ có cùng lời giải với ma trận C’. Sau đó quay lại Bước 2

Các bạn có thể đọc thêm hoặc làm thử vài ví dụ nhỏ ở đây  để nắm vững hơn về giải thuật Hungary : [Hungarian Maximum Matching Algorithm](https://brilliant.org/wiki/hungarian-matching/)
```python
def linear_assignment(cost_matrix):
  try:
    import lap
    _, x, y = lap.lapjv(cost_matrix, extend_cost=True)
    return np.array([[y[i],i] for i in x if i >= 0]) #
  except ImportError:
    from scipy.optimize import linear_sum_assignment
    x, y = linear_sum_assignment(cost_matrix)
    return np.array(list(zip(x, y)))
```

### 3.2 Bộ lọc Kalman (Kalman Filter)
Bộ lọc Kalman (Kalman Filter) là một mô hình Linear-Gaussian State Space Model, được giới thiệu lần đầu năm 1960 và ứng dụng trong rất nhiều lĩnh vực khác nhau: Xe tự lái, thực tế ảo, kinh tế lượng, tracking, điều khiển tối ưu, ...

Trong object tracking, kalman filter được biết đến nhiều nhất với vai trò dự đoán các trạng thái của đối tượng hiện tại dựa vào các track trong quá khứ và update lại các detection sau khi đã được liên kết với các track trước đó. Vậy Kalman Filter thực hiện như thế nào ?

Trước tiên, hơi nhàm chán nhưng lí thuyết là thứ bắt buộc cần nắm, mình sẽ mô hình hóa lại bài toán cần giải quyết như sau: 

Quá trình cần xử lí là 1 quá trình ngẫu nhiên với các mô hình đã được định nghĩa từ trước : 
$$
\begin{array}{l}
x_k = \theta_{k-1}(x_{k-1}, u_{k-1}) ,  x_k \in R^n \\
\\
z_k = h_{k-1}(x_{k}, w_{k}) ,  z_k \in R^m 
\end{array}
$$
Ở đây, 
* $x_k$ là giá trị biến trạng thái của quá trình, thường là các giá trị ẩn, không thể quan sát được
* $z_k$ là giá trị đo được, quan sát được của quá trình. 
* $\theta_{k}, h_{k}$ là các mô hình định nghĩa từ trước. 
* $u_k, w_k$ lần lượt là nhiễu của quá trình và nhiễu trong lúc đo đạc 

Áp dụng Kalman Filter vào bài toán này như thế nào ?? Mình sẽ trình bày lí thuyết của loại Kalman Filter đơn giản nhất : **Linear Kalman Filter** (ngoài ra còn có Extended Kalman filter,  Unscented Kalman filter, ...)

Linear Kalman Filter giả định các mô hình của quá trình ($\theta_{k}, h_{k}$) đều là các mô hình tuyến tính. Khi đó: 
$$
\begin{array}{l}
x_k = F_{k-1}x_{k-1} + u_{k-1} \\
\\
z_k = H_{k-1}x_{k}  +w_{k}
\end{array}
$$
Với
* $x_k ∼ \text{N}(\hat{x}, \Sigma)$ :
$$
p(x_k) = \frac{1}{(2\pi)^{D/2}|\Sigma_k|^{1/2}}exp[\frac{-(x_k - \hat{x}_k)^T \Sigma_k^{-1}(x_k - \hat{x}_k)}{2}]
$$
* $F_{k}, H_{k}$ là các ma trận $n*n$ (state transistion matrix) và $m*n$ (measurement function)
* $u_k ∼ \text{N(0, Q)}  , w_k ∼ \text{N(0, R)}$ 

![img](https://i.imgur.com/Pk5VveP.png)
Các bước xử lí tiếp theo của Kalman Filter có thể chia làm 2 phần chính (cách tiếp cận dựa trên xác suất) : 

:car: **Dự đoán (Prediction)**
$$
x_k = F_{k-1}x_{k-1} + u_{k-1} 
$$
Để dự đoán các giá trị trạng thái của quá trình ngẫu nhiên, ta dự đoán các giá trị mean  $\hat{x}$ và covariance $\Sigma$. Theo tính chất kỳ vọng và ma trận hiệp phương sai với vector ngẫu nhiên, ta có :
$$
\begin{array}{l}
\hat{x}_k = E[x_k] = E[F_{k-1}x_{k-1} + u_{k-1}] = F_{k-1}E[x_{k-1}] + E[u_{k-1}] = F_{k-1}\hat{x}_{k-1} \\
\\
\Sigma_k = \text{Var}(x_k) = \text{Var}(F_{k-1}x_{k-1} + u_{k-1}) = F_{k-1}\Sigma_{k-1}F_{k-1}^T + Q_{k-1}
\end{array}
$$
:car: **Hiệu chỉnh (Update)**

Quá trình hiệu chỉnh phức tạp hơn 1 chút, ta có :
$$
z_k = H_{k-1}x_{k}  +w_{k}
$$
Áp dụng [định lí Bayes cho Linear Gaussian System](http://web4.cs.ucl.ac.uk/staff/C.Bracegirdle/bayesTheoremForGaussians.pdf), ta có :
$$
\begin{array}{l}
\Sigma_k^F = (\Sigma_k^{-1} + H_k^TR_k^{-1}H_k)^{-1}\\
\\
\hat{x}_k^F = (\Sigma_k^{-1} + H_k^TR_k^{-1}H_k)^{-1}[H_k^T R_k^{-1}(z_k-H_k\hat{x}_k) + \Sigma_k^{-1}\hat{x}_k]
\end{array}
$$
Tiếp tục áp dụng [đồng nhất thức ma trận Woodbury](https://en.wikipedia.org/wiki/Woodbury_matrix_identity), ta có :
> Đồng nhất thức ma trận Woodbury (Matrix Inversion Lemma) 
> 
> Cho 4 ma trận $A(n*n), U(n*k), C(k*k), V(k*n)$. 
> 
> Khi đó
$(A + UCV)^{-1} = A^{-1} - A^{-1}U(C^{-1} + VA^{-1}U)^{-1}VA^{-1}$

$$
\begin{array}{l}
\Sigma_k^F = (\Sigma_k^{-1} + H_k^TR_k^{-1}H_k)^{-1} = \Sigma_k- \Sigma_kH)k^T(R_k + H_k \Sigma_kH_k^T)^{-1}H_k\Sigma_k \\
\\
\hat{x}_{k}^{F} =\left[\Sigma_{k}-\Sigma_{k} H_{k}^{T}\left(R_{k}+H_{k} \Sigma_{k} H_{k}^{T}\right)^{-1} H_{k} \Sigma_{k}\right]\left[H_{k}^{T} R_{k}^{-1}\left(z_{k}-H_{k} \hat{x}_{k}\right)+\Sigma_{k}^{-1} \hat{x}_{k}\right]  =\hat{x}_{k}+\Sigma_{k} H_{k}^{T}\left(R_{k}+H_{k} \Sigma_{k} H_{k}^{T}\right)^{-1}\left(z_{k}-H_{k} \hat{x}_{k}\right)
\end{array}
$$
Để rút gọn 2 biểu thúc dài ngoằng trên, chúng ta đặt  $K_{k}=\Sigma_{k} H_{k}^{T}\left(R_{k}+H_{k} \Sigma_{k} H_{k}^{T}\right)^{-1}$, ($K_k$ được gọi là hệ số Kalman tại thời điểm k), khi đó:
$$
\begin{aligned}
\hat{x}_{k}^{F} &=\hat{x}_{k}+K_{k}\left(z_{k}-H_{k} \hat{x}_{k}\right) \\
\Sigma_{k}^{F} &=\Sigma_{k}\left(I-K_{k} H_{k}\right)
\end{aligned}
$$

Kalman Filter có thể tóm tắt lại như sau (ma trận A trong hình là ma trận F ở trên nha): 

![](https://images.viblo.asia/1fd8e207-1b91-4822-96db-233ec0b7074d.PNG)

Để khởi tạo một Kalman Filter, chúng ta có thể đơn giản sử dụng [filterpy.kalman](https://filterpy.readthedocs.io/en/latest/kalman/KalmanFilter.html)

```python
from filterpy.kalman import KalmanFilter
f = KalmanFilter (dim_x=2, dim_z=1)
```
### 3.3 SORT explain + Code explain
SORT - Simple Online Realtime Object Tracking, được giới thiệu lần đầu năm 2016, chỉnh sửa bổ sung v2 vào năm 2017, đề xuất giải pháp cho object tracking, đồng thời giải quyết cả 2 vấn đề mutiple object tracking và realtime object tracking. 

SORT tập trung vào vấn đề liên kết giữa các detection và track sau khi đã detect được từ frame, do đó, phần object detection có thể là bất cứ mô hình detector nào hiện nay như : **YOLO** (v1, v2, v3, v4, v5), **SSD**, **RCNN** (RCNN, Fast RCNN, Faster RCNN, Mask RCNN), **CenterNet** - Object as Point, ... . Trong original paper, tác giả sử dụng detector là **Faster Region CNN** (FrCNN) với backbone là **VGG 16**

2 thuật toán cốt lõi của SORT là Kalman Filter và giải thuật Hungary đã được mình trình bày ở các phần trên, trong phần này, mình sẽ nói sâu hơn về cách mà Kalman Filter và giải thuật Hungary được kết hợp với nhau, về mô hình bài toán, về các vấn đề nhỏ hơn những vẫn vô cùng quan trọng trong SORT

![](https://images.viblo.asia/d2d9877b-61e2-42ef-8def-de9275da76a5.png)

Phía trên là hình ảnh về luồng xử lí của SORT, mình sẽ diễn giải lại thuật toán theo luồng xử lí này. Tuy nhiên, trước đó hãy nói về Kalman Filter được dùng trong SORT.

Để ứng dụng được Kalman Filter, việc xác định được các dạng biến cũng như mô hình ban đầu của quá trình là điều bắt buôc cần có. Với giả định các đối tượng chuyển động đều, và độc lập với các đối tượng khác, một track được xác định bằng 
$$
x = [x, y, s, r, \dot{x}, \dot{y}, \dot{s}]^T
$$
Với 
* $x$ có ma trận hiệp phương sai ban đầu được khởi tạo với giá trị lớn để thẻ hiện sử không chắc chắn của trạng thái 
* $u, v$ lần lượt là tọa độ của tâm đối tượng (ở đây là tâm bounding box)
* $s$ là diện tích của bounding box
* $r$ là ti lệ aspect ratio của bounding box
* $\dot{x}, \dot{y}, \dot{s}$ lần lượt là các giá trị vận tốc tương ứng của $x, y, s$

Do giả định các đối tượng chuyển động đều, ta có 
$$
\begin{cases}
x_k = x_{k-1} + \dot{x}_{k-1} dt \\
y_k = y_{k-1} + \dot{y}_{k-1} dt \\
s_k = s_{k-1} + \dot{s}_{k-1} dt \\
r_k = r_{k-1} \\
\dot{x}_{k} = \dot{x}_{k-1} \\
\dot{y}_{k} = \dot{y}_{k-1} \\
\dot{s}_{k} = \dot{s}_{k-1} \\
\end{cases}
$$
Khi đó, phương trình 
$$
x_k = F_{k-1}x_{k-1} + u_{k-1} 
$$
tương đương với ($u_{k}$ được khởi tạo tuân theo phân phối chuẩn có mean = 0 và covariance không đổi)

![img](https://i.imgur.com/bIPuIGi.png)

Phương trình 
$$
z_k = H_{k-1}x_{k}  +w_{k}
$$
tương đương với (($w_{k}$ được khởi tạo tuân theo phân phối chuẩn có mean = 0 và covariance không đổi))

![img](https://i.imgur.com/Y2m8utt.png)

```python
from filterpy.kalman import KalmanFilter

#define constant velocity model
self.kf = KalmanFilter(dim_x=7, dim_z=4) 
self.kf.F = np.array([[1,0,0,0,1,0,0],[0,1,0,0,0,1,0],[0,0,1,0,0,0,1],[0,0,0,1,0,0,0],  [0,0,0,0,1,0,0],[0,0,0,0,0,1,0],[0,0,0,0,0,0,1]])
self.kf.H = np.array([[1,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,1,0,0,0,0],[0,0,0,1,0,0,0]])

self.kf.R[2:,2:] *= 10.
self.kf.P[4:,4:] *= 1000. #give high uncertainty to the unobservable initial velocities
self.kf.P *= 10.
self.kf.Q[-1,-1] *= 0.01
self.kf.Q[4:,4:] *= 0.01
```

Tiếp đến là luồng xử lí của SORT
* **Bước 1**: SORT tiến hành sử dụng Kalman Filter để **dự đoán** các trạng thái track mới dựa trên các track trong quá khứ. 
```python
  def predict(self):
    """
    Advances the state vector and returns the predicted bounding box estimate.
    """
    if((self.kf.x[6]+self.kf.x[2])<=0):
      self.kf.x[6] *= 0.0
    self.kf.predict()
    self.age += 1
    if(self.time_since_update>0):
      self.hit_streak = 0
    self.time_since_update += 1
    self.history.append(convert_x_to_bbox(self.kf.x))
    return self.history[-1]
```
* **Bước 2**: Sử dụng những track vừa dự đoán được, kết hợp với các detection thu được từ detector, **xây dựng ma trận chi phí** cho Assignment Problem. Chi phí được sử dụng để đánh giá ở đây là giá trị IOU giữa các bouding box của track và detection. 
```python
def iou_batch(bb_test, bb_gt):
  """
  From SORT: Computes IOU between two bboxes in the form [x1,y1,x2,y2]
  """
  bb_gt = np.expand_dims(bb_gt, 0)
  bb_test = np.expand_dims(bb_test, 1)
  
  xx1 = np.maximum(bb_test[..., 0], bb_gt[..., 0])
  yy1 = np.maximum(bb_test[..., 1], bb_gt[..., 1])
  xx2 = np.minimum(bb_test[..., 2], bb_gt[..., 2])
  yy2 = np.minimum(bb_test[..., 3], bb_gt[..., 3])
  w = np.maximum(0., xx2 - xx1)
  h = np.maximum(0., yy2 - yy1)
  wh = w * h
  o = wh / ((bb_test[..., 2] - bb_test[..., 0]) * (bb_test[..., 3] - bb_test[..., 1])                                      
    + (bb_gt[..., 2] - bb_gt[..., 0]) * (bb_gt[..., 3] - bb_gt[..., 1]) - wh)                                              
  return(o)  
```
* **Bước 3**: Sử dụng **giải thuật Hungary** giải bài toán Assignment Problem với ma trận chi phí vừa lập
```python
  iou_matrix = iou_batch(detections, trackers)

  if min(iou_matrix.shape) > 0:
    a = (iou_matrix > iou_threshold).astype(np.int32)
    if a.sum(1).max() == 1 and a.sum(0).max() == 1:
        matched_indices = np.stack(np.where(a), axis=1)
    else:
      matched_indices = linear_assignment(-iou_matrix)
  else:
    matched_indices = np.empty(shape=(0,2))
```
* **Bước 4**: Xử lí, phân loại các detection
```python
  unmatched_detections = []
  for d, det in enumerate(detections):
    if(d not in matched_indices[:,0]):
      unmatched_detections.append(d)
  unmatched_trackers = []
  for t, trk in enumerate(trackers):
    if(t not in matched_indices[:,1]):
      unmatched_trackers.append(t)

  #filter out matched with low IOU
  matches = []
  for m in matched_indices:
    if(iou_matrix[m[0], m[1]]<iou_threshold):
      unmatched_detections.append(m[0])
      unmatched_trackers.append(m[1])
    else:
      matches.append(m.reshape(1,2))
  if(len(matches)==0):
    matches = np.empty((0,2),dtype=int)
  else:
    matches = np.concatenate(matches,axis=0)
```
* **Bước 5**: Sử dụng Kalman filter để **update** những detection đã được liên kết với track. 
```python
  def update(self,bbox):
    """
    Updates the state vector with observed bbox.
    """
    self.time_since_update = 0
    self.history = []
    self.hits += 1
    self.hit_streak += 1
    self.kf.update(convert_bbox_to_z(bbox))
```

Full source code đã được tác giả của SORT public tại  https://github.com/abewley/sort 

Một số chú ý liên quan: 
* Khi khởi tạo một track mới, giá trị hiệp phương sai của track nên để các giá trị lớn để thể hiện **sự không chắc chắn** của mô hình.Bên cạnh đó,  các giá trị vận tốc ban đầu được cũng được khởi tạo bằng 0
* Đặt ngưỡng $T_{loss}$ để **lọc đi những track không được theo dõi nữa** sau $T_{loss}$ frame . Trong paper, ngưỡng $T_{loss} được đặt bằng 1, do tắc giả chú trọng vào vấn đề theo dõi frame-to-frame. Ngoài ra, giả định mô hình vận tốc không đổi cũng là 1 giả định kém trong thực tế, vậy nên nếu để $T_{loss}$ quá cao thậm chí có thể làm giảm độ chính xác theo dõi
# 4. Tạm kết
Trong bài viết đầu tiên này, mình đã đi sâu vào SORT - một thuật toán cho Object Tracking khá mạnh mẽ những cũng vô cùng đơn giản, dễ implement và tính ứng dụng cực cao. Dù vậy, đánh giá một cách khách quan, SORT vẫn tồn tại những vấn đề chưa thể giải quyết: 
* Giả định tuyến tính : SORT đang sử dụng Linear Kalman Filter trong thuật toán cốt lõi, điều này trong thực tế là chưa phù hợp. Để cải thiện vấn đề này, chúng ta cần quan tâm đến các Kalman Filter phức tạp hơn, như Extended Kalman filter,  Unscented Kalman filter, ...
* ID Switches : Đây là vấn đề lớn nhất của SORT hiện tại. Do việc liên kết giữa detection và track trong SORT chỉ đơn giản dựa trên độ đo IOU (tức SORT chỉ quan tâm đến hình dạng của đối tượng), điều này gây ra hiện tượng số lượng ID Switches của 1 đối tượng là vô cùng lớn khi đối tượng bị che khuất, khi quỹ đạo trùng lặp, ...

Trong [phần tiếp theo](https://viblo.asia/p/sort-deep-sort-mot-goc-nhin-ve-object-tracking-phan-2-djeZ1m78ZWz), mình sẽ trình bày về deep SORT - một phiên bản nâng cấp xịn sò của SORT với sự góp mặt của deep learning. Cụ thể, deep SORT có những nâng cấp gì và xịn sò ra sao, chờ bài viết sau, các bạn sẽ rõ. 

Đừng quên Upvote nếu các bạn có hứng thú với chủ đề này! See ya :metal:
# 5. References
* SORT paper: https://arxiv.org/pdf/1602.00763.pdf
* Hungarian Algorithm : https://brilliant.org/wiki/hungarian-matching/
* Kalman Filter https://www.cs.unc.edu/~welch/kalman/media/pdf/Kalman1960.pdf
* Và rất nhiều nguồn tài liệu khác trên medium.com, thetalog.com, ...