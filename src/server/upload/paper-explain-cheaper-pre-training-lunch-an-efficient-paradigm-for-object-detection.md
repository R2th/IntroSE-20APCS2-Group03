# Đặt vấn đề
Pretraining trên các tập dữ liệu cho bài toán phân loại (e.g ImageNet) để khởi tạo model cho Object detection là hướng đi khá thông dụng bởi model có thể học được các đặc trưng có lợi từ tập dữ liệu lớn giúp hội tụ tốt hơn trong quá trình fine-tuning. Mặc dù vậy, gánh nặng tạo ra từ độ lớn của dataset là không thể bỏ qua, nó khiến cho quá trình training từ đầu trở nên chậm hơn và có thể sẽ cần nhiều vòng lặp hơn để đạt được kết quả mang tính đột phá.
Từ đó các tác giả đề xuất phương pháp pretrain mới - Montage pretraining và chỉ dựa trên các tập dữ liệu của bài toán detection. Khi so sánh với hướng ImageNet pre-training, Montage pre-training chỉ tốn $\frac{1}{4}$ chi phí tính toán để đạt được kết quả tương tự thậm chí là tốt hơn cho bài toán object detection.

Montage pre-training được xây dựng dựa trên ý tưởng: thông thường một lượng lớn pixel đưa qua model trong quá trình training không mang nhiều thông tin hữu ích, hầu hết pixel/neuron ở vùng background thường không mang lại gradient trong quá trình học, hơn thế nữa chúng còn dẫn đến lãng phí tài nguyên tính toán. Để giải quyết vấn đề này, tác giả trích các mẫu positive và negative từ ảnh gốc của  detection dataset để pre-train. Trước khi đưa vào mạng backbone, các mẫu nói trên sẽ được gộp thành một ảnh mới theo phương pháp montage với tỷ lệ đã cho trước để đảm bảo tính đặc thù về không gian. Đồng thời các tác giả cũng đề xuất chiến lược training ERF - adaptive dense classification sử dụng Effective Receptive field để gán nhãn soft label nhằm cải thiện đặc trưng ở cấp độ pixel.

# Montage pretrain
![](https://images.viblo.asia/f6731aca-d4bd-4f30-8a1d-e9b6f52cb67c.png)
<div align="center">Hình 1: Training Pipeline của Montage pre-training</div>

> Đầu tiên, , nhóm tác giả trích xuất ra các mẫu positive và negative từ bộ dataset detection để dựng dataset classification cho task pre-training. Quá trình training được thực hiện theo chiến lược Montage, 4 đối tượng sẽ được gộp chung vào 1 ảnh để đưa vào backbone và tối ưu hóa qua ERF - adaptive loss. Cuối cùng backbone sẽ được fine-tune cho detection task.

## Sample Selection
Các mẫu positive là những vùng thuộc một trong những class có trong detection dataset, trong khi đó mẫu negative thường là vùng chỉ chứa background. Để lấy mẫu đa dạng và hiệu quả, người ta đưa ra một số quy luật cho quá trình trích xuất mẫu:
* Positive : trích xuất những vùng của ảnh gốc dựa theo ground-truth bounding boxes. Bounding box sẽ được mở rộng một cách ngẫu nhiên để lấy được nhiều thông tin ngữ cảnh hơn với giả thuyết rằng những thông tin mang tính ngữ cảnh là quan trọng để mô hình học được các đặc trưng biểu diễn tốt hơn.
* Negative: được lấy mẫu ngẫu nhiên từ các vùng background với $IoU (pos,neg) = 0$, trong đó Iou là độ đo Intersection-over-Union

## Montage Assembly
Quá trình lấy mẫu nói trên có vẻ khá hợp lý nhưng việc ép tất cả mẫu về một kích thước sẽ phá hủy thông tin về kết cấu và làm sai lệch hình dạng ban đầu, trong khi padding để giữ tỷ lệ kích thước thì tạo nhiều khoảng không có giá trị cũng như lãng phí tài nguyên tính toán.

![image.png](https://images.viblo.asia/12062005-0527-43cf-a9cf-e9ce4d36ea0e.png)
<div align="center">Hình 2: Một số phương pháp khác nhau để điều chỉnh dữ liệu về kích thước đã cho trước</div>

Các đối tượng thường khác nhau về tỷ lệ kích thước, do đó Montage assembly xem xét đặc tính này để các mẫu có thể được ghép lại với nhau một cách tự nhiên hơn theo tỷ lệ khung hình của chúng. Vì vậy, trước tiên, các mẫu sẽ được chia thành ba Nhóm theo tỷ lệ khung hình của chúng, tức là Nhóm S (hình vuông), T (cao) và W (rộng). Các mẫu trong Nhóm S phải có tỷ lệ khung hình từ 0,5 đến 1,5, trong khi các mẫu trong Nhóm T và W tương ứng phải có tỷ lệ khung hình nhỏ hơn 0,5 và lớn hơn 1,5. Để đơn giản, các mẫu thuộc Nhóm S, T và W được gọi là mẫu S, mẫu T và mẫu W.

![image.png](https://images.viblo.asia/83eabfa4-2627-4e90-a0ef-b5569696ec8c.png)
<div align="center">Hình 3: Pipeline tạo ảnh gộp theo hướng Montage </div>


## Effective Receptive Fields
Một trong những khái niệm cơ bản trong mạng CNN là *vùng tiếp nhận* của một đơn vị trong một lớp của mạng. Không giống như các lớp fully connected để tính toán một đơn vị cần toàn bộ đầu vào, một đơn vị của lớp tích chập chỉ phụ thuộc vào một vùng nhỏ. Các tác giả đã khám phá ra rằng không phải toàn bộ pixel trong vùng tiếp nhận đều đóng góp như nhau cho đầu ra của một đơn vị, dễ nhận thấy rằng những pixel ở trung tâm của vùng tiếp nhận có ảnh hưởng lớn hơn đến đầu ra so với số khác ở vùng rìa. Trong quá trình forward, các pixel ở trung tâm có thể lan truyền thông tin đến đầu ra qua nhiều hướng khác nhau, trong khi pixel ở vùng rìa thì ít hơn. Với backward, gradients từ một đơn vị đầu ra được lan truyền đến toàn bộ các hướng và do đó thì những pixel ở trung tâm cũng có cường độ ảnh hướng lớn hơn cho gradient từ đầu ra đấy.

Trong bài  [$ERF$](https://arxiv.org/pdf/2004.12178.pdf), các tác giả muốn mô tả toán học về mức độ mà mỗi pixel đầu vào trong một trường tiếp nhận có thể tác động đến kết quả đầu ra của một mạng $n$ lớp, với $n \rightarrow \infty$. Giả sử các pixel ở mỗi lớp được đánh số $(i,j)$ với tâm ở $(0,0)$. Nếu coi một pixel ở lớp thứ $pth$ là $x_{i,j}^p$ thì $x_{i,j}^0$ là đầu vào của mạng, và $y_{i,j}=x_{i,j}^n$ là đầu ra ở lớp thứ $nth$, điều chúng ta cần tìm là mỗi $x_{i,j}^0$ đóng góp bao nhiêu vào $y_{0,0}$. Effective receptive field $(ERF)$ của một đơn vị đầu ra có thể coi là vùng chứa các pixel đầu vào với ảnh hưởng không đáng kể tới nó. Người ta dùng đạo hàm riêng $\frac{\partial y_{0,0}}{\partial x_{i,j}^0}$ để tính toán sự ảnh hưởng đó thông qua quá trình lan truyền ngược trong mạng. Giả sử $l$ là hàm loss bất kỳ, với quy tắc đạo hàm của hàm hợp ta có thể viết $\frac{\partial l}{\partial x_{i,j}^0} = \sum_{i',j'}\frac{\partial l}{\partial y_{i',j'}}\frac{\partial y_{i',j'}}{\partial x_{i,j}^0}$. Nếu $\frac{\partial l}{\partial y_{0,0}} =1$ and $\frac{\partial l}{\partial y_{i,j}}=0$  $\quad\forall i \neq 0$ và $j \neq 0$, thì $\frac{\partial l}{\partial x_{i,j}^0} =\frac{\partial y_{0,0}}{\partial x_{i,j}^0}$.
## ERF-adaptive Dense Classification

![image.png](https://images.viblo.asia/b8fe5eaf-8ce4-4a9c-8232-6ba87ee39fa1.png)
> Pipeline cơ bản : Feature map $\textbf{X}$ được nhân tích chập $1$ x $1$ để giảm số chiều xuống $C$ chiều. Nhân trọng số $w _ { i }$ với nhãn $\textbf{y}_i$, chúng ta sẽ có soft label cho mỗi điểm. Sau đó áp dụng hàm mất mát cross-entropy cho mỗi điểm tại feature map ta sẽ được loss map như trong hình. Cùng lúc đó, mất mát theo trọng số tại 1 vị trí cũng sẽ được tính toán dựa vào $ERF$ tại vị trí đó. Sau đó, ta tính average theo từng vị trí block xanh lá - đỏ - vàng - xanh lam để lấy average loss cho từng vùng. Hàm loss $ERF$-adaptive cuối cùng chính là trung bình của loss ở cả 4 vùng. 

Với 4 vùng trong đầu vào Montage như hình 3b, ta gọi $\textbf{y}_i$ là nhãn gốc cho vùng $R_i$ , $i=1,2,3,4$

Tại vị trí ($j,k$) của feature map $\textbf{X}$ $(j=1,...,\alpha H$, $k = 1,...,\alpha W)$, soft label $\tilde { y } ^ { j , k }$ chính là tổng trọng số của 4 nhãn:
$$\tilde { y } ^ { j , k } = \sum _ { i = 1 } ^ { 4 } w _ { i } ^ { j , k } y _ { i }, \qquad \qquad \text { (1) }$$
Trong đó trọng số $w _ { i } ^ { j , k }$ phụ thuộc vào $ERF$ của nó. Tại vị trí $(j,k)$ của feature map $\textbf{X}$ $(j=1,...,\alpha H$, $k = 1,...,\alpha W)$, ta sẽ tính toán $ERF$ $G ^ { j , k } \in R ^ { H \times W }$ tương ứng tại đầu vào. Nếu vị trí $(j,k)$ nằm trong vùng $R_i$, ta sẽ phải đặt ngưỡng $t$ để đảm bảo rằng $\textbf{y}_i$ là chủ đạo tại đấy. Do đó tại vị trí $(j,k)$ tại vùng $R_r$, ta sẽ tính được trọng số $w _ { i } ^ { j , k }$ của nhãn $\textbf{y}_i$ như sau : 
$$w _ { i } ^ { j , k } = \begin{cases}
\max ( \tau , \frac { \sum _ { h = 1 , w = 1 } ^ { H , W } g _ { h , w } ^ { j , k } \cdot m _ { h , w } ^ { i } } { \sum _ { h = 1 , w = 1 } ^ { H , W } g _ { h , w } ^ { j , k } } ) , &\text { if } i = r \\
( 1 - w _ { r } ^ { j , k } ) \frac { \sum _ { h = 1 , w = 1 } ^ { H , W } g _ { h , w } ^ { j , k } \cdot m _ { h , w } ^ { i } } { \sum _ { h = 1 , w = 1 } ^ { H , W } g _ { h , w } ^ { j , k } \cdot ( 1 - m _ { h , w } ^ { r } ) } , & \text { if } i \neq r
\end{cases} \quad \text{(2)} $$

Trong đó $g _ { h , w } ^ { j , k }$ là phần tử tại vị trí $(h,w)$ của ma trận $ERF$ $\bm{G^{j,k}}$ tương ứng, $m_{h,w}^i$ là giá trị tại vị trí $(h,w)$ của binary mask $\bm{M^i} \in \{ 0,1 \} ^ { H \times W }$, binary mask $\bm{M^i}$ sẽ được dùng để lựa chọn vùng $R_i$ trong $ERF$.

Gọi $\bm{x} ^ { j , k } \in R ^ { C }$ là đặc trưng tại vị trí $(j, k)$ của feature map $\textbf{X}$ $(j=1,...,\alpha H$, $k = 1,...,\alpha W)$, sau khi tính toán được trọng số $\{ w _ { i } ^ { j , k } \} _ { i = 1 } ^ { 4 }$, tác giả tiến hành bước dense classification trên đặc trưng $\bm{X}^{i,j}$ để có soft label $\tilde { y } ^ { j , k }$.

# Kết quả thí nghiệm
Kết quả cho thấy việc áp dụng montage đã giúp cho các mô hình cũ cải thiện được đáng kể độ chính xác. Vì đây là phương pháp Data Augmentation kết hợp chiến lược training nên việc áp dụng có thể đối với bất kì kiến trúc mạng nào. Chúng ta có thể xem xét kết quả thí nghiệm trong hình sau khi so sánh giữa ImageNet pretraining và Montage pretraining: 
![image.png](https://images.viblo.asia/ffebe9cd-7dcb-4349-92ec-be7c7aa2a620.png)


# Kết luận
**Montage** là phương pháp đơn giản nhưng khá hiệu quả với object detection khi giảm hao phí xuống $1 / 4$ khi so sánh với ImageNet pretraining nhưng vẫn đạt được kết quả ngang bằng thậm chí cao hơn. Phương pháp làm giảm chi phí tính toán giúp tạo điều kiện cho việc training from scratch dễ dàng hơn. mình đánh giá bài báo này đã có những khám phá mới giúp chúng ta có những hướng đi mới trong việc pretraining model và hiểu hơn về các yếu tố xung quanh việc huấn luyện mạng.

# References
1. [Cheaper Pre-training Lunch: An Efficient Paradigm for Object Detection](https://arxiv.org/pdf/2004.12178.pdf)