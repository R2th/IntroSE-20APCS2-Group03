# 1. Giới thiệu chung
Trong bài viết lần trước mình đã giới thiệu về DETR một hướng tiếp cận mới cho bài toán Object Detection để hiểu một cách chọn vẹn Deformable DETR mình khuyến nghị mọi người nên đọc bài viết về DETR của mình trước https://viblo.asia/p/object-detection-with-transfromer-detr-eW65GpmjKDO.
Mặc dù hướng tiếp cận khá hay nhưng DETR vẫn còn một số vấn đề như: 
- DETR có kết quả khá tệ trong việc phát hiện các đối tượng nhỏ. Các mô hình object detection gần đây sử dụng high-resolution feature map sẽ tốt hơn cho việc phát hiện đối tượng nhỏ. tuy nhiên, high-resolution feature map sẽ làm độ phức tạp của self-attention trong DETR encoder tăng rất nhiều (self-attention DETR encoder có độ phức tạp là bình phương của feature map size). 
- DETR tốn khá nhiều epochs để hội tụ. Lý do chính bởi vì attention module xử lý image features khá khó để train.

# 2. Transformer và DETR
## 2.1. Multi-Head Attention trong Transformer
Giả sử ta có một query element (cụ thể là một từ ở trong câu output) và một tập các key element (là các từ ở câu input), *multi-head attetion mudule* tổng hợp các key contents tương ứng với key element theo một trọng số attention weight (được học trong quá trình training). Multi-head attetion được tác giả viết lại bằng công thức dưới đây.

![Screenshot from 2022-08-05 10-13-01.png](https://images.viblo.asia/b5f65180-868c-43e3-9f7e-bd01a5702ee1.png)

Trong đó:
- $q\in\Omega_q$ là một query element và $z_q$ là feature tương ứng với nó, $z _ { q } \in \mathbb{R} ^ { C }$ trong đó $C$ là feature dimmension (tương tự như $d_k, d_q$ trong Attetion is All you need);
- *M* là số attention head;
- $k\in\Omega_k$ là một key element và $x_k$ là feature tương ứng, $x_k\in\Omega_k$;
- $A_{mqk}$ là attention weight của query thứ $q$ tới key thứ $k$ tại $m$ head; $A_{mqk }\propto \exp \{ \frac { z_{q}U_m ^{ T} V_ {m}x_ { k } } { \sqrt { C _ { v } } } \}$ và $\sum_ { k \in \Omega_k}A _ { m q k } = 1$, $U_{ m }, V _ { m } \in \mathbb{R}^{C_v \times C}$ là những tham số được học trong quá trình training. 

Giả sử số query elements và số key elements lần lượt là $N_q, N_k$ . Độ phức tạp của thuật toán là $O(N_qC^2+N_kC^2+N_qN_kC)$. Số query element và số key element đều là số pixel trên feature map, vậy nên $N_q=N_k \gg C$. Cuối cùng, độ phức tạp của thuật toán sẽ là $\boldsymbol{O(N_qN_kC)}$. **Độ phức tạp của thuật toán sẽ là bình phương của feature map size**.
## 2.2. DETR
Như bài trước mình cũng đã giới thiệu thì DETR được xây dựng dựa trên kiến trúc của Transformer. Sự dụng *bipartite matching* và thuật toán Hungrarian để map giữa prediction box và ground-truth box.

*Với Transformer encoder*, thì số key elements và số query elements đều là số pixel trên feature map. giả sử chiều dài và chiều rộng của feature map lần lượt là $H, W$. Độ phức tạp của thuật toán self attention là $O(H^2W^2C)$. **Độ phức tạp của thuật toán có độ phức tạp là bình phương của spatial size**. \
*Với Transformer decoder*, đầu vào là feature map từ encoder và N object query (learnable positional embeddings). Có 2 kiểu attention trong transformer decoder là cross-attention và self-attention. Trong cross-attention $N_q=N, N_k=H\times W$, độ phức tạp của thuật toán là $O(HWC^2+NHWC)$ độ phức tạp là tuyến tính của feature map size. Trong self-attention, object query tương tác với nhau $N_q=N_k=N$ độ phức tạp của thuật toán là $O(2NC^2+N^2C)$.

# 3. Deformable Transformer
Transformer attention thông thường thực hiện attention trên toàn bộ feature map nó dẫn đến độ phức tạp của thuật toán tăng cao khi spatial size của feature map tăng.
Tác giả đưa ra một kiểu attention mới mà chỉ attend vào một số sample locations (sample locations này cũng không cố định mà được học trong quá trình training tương tự như trong deformable convolution) qua đó giúp giảm độ phức tạp của thuật toán và làm giảm thời gian training mô hình.
## 3.1 Deformable Attention Module
![Screenshot from 2022-08-08 12-54-33.png](https://images.viblo.asia/7a45b949-8c8f-4d12-86c5-1b1acda72e74.png)
Giả sử đầu vào là feature map là $x \in \mathbb{R}^{C\times H \times W}$, $q$ là 1 query element và $z_q$ là content feature tương ứng với $q$ và $p_q$ là 2-d **reference point**, deformable attention được tính bởi công thức dưới đây 

![image.png](https://images.viblo.asia/f4331c7f-aa72-49a5-80db-f88a4fa0d2ef.png)

$\Delta p_{mqk} \in \mathbb{R}^2$ là sampling ofset. Cả $\Delta p_{mqk}$ và $A_{mqk}$ đều được tính thông qua lớp linear từ $z_q$.\
Hình minh họa phía trên giúp ta dễ hiểu hơn, ở giữa là quá trình dự đoán ra sampling offsets ($\Delta p_{mqk}$), và bên phải cùng là quá trình dự đoán ra attention weight ($A_{mqk}$) cho từng sampling points và $\sum _ { l = 1 } ^ { L } \sum _ { k = 1 } ^ { K } A _ { m l q k } = 1$.\
Độ phức tạp của thuật toán deformable attention là $O ( 2 N _ { q } C ^ { 2 } + \min ( H W C ^ { 2 }, N _ { q } K C ^ { 2 } ) )$ 
## 3.2 Multi-scale Deformable Attention Module.
![Screenshot from 2022-08-08 14-10-46.png](https://images.viblo.asia/a1e78e06-3da5-4c34-8eec-b1a7e10be6b0.png)
$L$ là số layers multi-scale feature map, $\hat{p}_q \in [0,1]^2$ là tọa độ đã được chuẩn hóa, và hàm $\phi_l(\hat{p}_q)$ sẽ chuẩn hóa $\hat{p}_q$ tương ứng với feature map thứ l. Multi-scale deformable attention khá tương đồng so với deformable attention ngoại từ việc nó lấy ra $LK$ điểm từ multi-scale feature map thay vì $K$ điểm từ single-scale feature map.
![image.png](https://images.viblo.asia/32f451a6-de99-418f-940e-779b9c19d00c.png)
Khi $L=1,K=1$ và $W_m^{'}$ là ma trận đơn vị ta có thể coi *multi-scale deformable attentio
n* là phép deformable convolution trên mỗi attention head.

## 3.3 Deformable Attention Encoder.
Đầu vào và đầu ra của encoder đều là multi-scale feature maps có cùng độ phân giải. Multi-scale deformable attention module được sử dung thay cho transformer attention modules trong DETR. Multi-scale feature map từ $C_3$ đến $C_6$ của ResNet được sử dụng.
![Screenshot from 2022-08-10 15-11-38.png](https://images.viblo.asia/13961973-5076-4eca-91bf-f04de63c27cd.png)
## 3.4 Deformable Attention Decoder.
Có 2 kiểu attention trong Decoder là cross-attetion và self-attention. Query elements ở trong cả 2 kiểu attention là Object Query. Chỉ có cross-attention module được thay bởi multi-scale deformable attention module và self-attention module vẫn giữ nguyên. Multi-scale deformable attention module sẽ extract image features xung quanh reference points, bounding boxes sẽ được dự đoán dựa vào việc dự đoán offset với reference points.
Reference points có thể coi như là dự đoán ban đầu của tâm bounding box.
# 4. Kết quả
![Screenshot from 2022-08-11 15-08-21.png](https://images.viblo.asia/6284a77e-e260-4025-854c-58c745cab8f9.png)


![Screenshot from 2022-08-11 15-26-19.png](https://images.viblo.asia/92739fcb-dd8f-4d5f-a2f8-df0519757408.png)
Từ hình minh họa ta có thể thấy là Deformabled DETR để ý vào lề bên phải và lề bên trái để dự đoán tọa độ x và chiều rộng, để ý vào phía trên và dưới để dự đoán tọa độ y và chiều cao, và để ý và pixel phía trong đối tượng để dự đoán class.

![Screenshot from 2022-08-11 16-22-48.png](https://images.viblo.asia/e36cb0fd-6bfb-4fcd-a28c-fdbecbec742b.png)

Sampling points và attention weights tương ứng ở lớp cuối cùng trong encoder và decoder cũng được minh họa trong hình phía trên.

# 5. Personal Comment
Khi tìm hiểu về Deformable DETR cũng giúp mình hiểu hơn về self-attetion, vision transformer cũng như là DETR. Bằng việc đưa ra 2 khái niệm mới là Multi-scale Deformabled Attention và reference point Deformable DETR đã giải quyết được một số vấn đề còn tại của DETR là độ phức tạp thuật toán ở encoder quá cao, đồng thời cũng tăng đáng kể performance và cũng là tiền để tác tác giả phía sau tiếp tục cải tiến. Bài viết phía sau mình sẽ tiếp tục giới thiệu về DAB DETR cũng như là DINO sota của object detection hiện tại.

# 6. Tham khảo
Deformable DETR https://arxiv.org/pdf/2010.04159.pdf \
DETR https://arxiv.org/pdf/2005.12872.pdf \
Attention is All You Need https://arxiv.org/pdf/1706.03762.pdf