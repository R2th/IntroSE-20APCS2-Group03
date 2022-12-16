Đây là một bài trong series [Báo khoa học trong vòng 5 phút](https://viblo.asia/s/bao-khoa-hoc-trong-vong-5-phut-rLZDX4YnZk0).

## Nguồn
Được viết bởi Tanaka *et. al*, Stanford University. Hiện vẫn là preprint.

https://arxiv.org/pdf/2006.05467.pdf

Trong lúc đọc hiểu bài này mình có xem video này của Yannic Kilcher có giải thích hướng dẫn khá kỹ.

{@embed: https://www.youtube.com/watch?v=8l-TDqpoUQs}

## Ý tưởng chính
- Các phương pháp pruning bị toang chính vì hiện tượng "layer-collapse": khi một layer bị prune sạch (và rất dễ bị) thì mạng sẽ dừng hoạt động (luôn predict ra một giá trị vô nghĩa).
- Nếu sử dụng one-shot pruning sẽ bị layer-collapse, nên phải prune từng bước (*iterative*): sau mỗi lần prune một ít, phải định giá lại độ quan trọng của mỗi trọng số trước khi prune tiếp.
- Tác giả đề xuất một công thức tổng quát cho các phương pháp pruning bằng giá trị **synaptic flow**:
$$
\mathcal{S}(\theta)=\frac{\partial\mathcal{R}}{\partial\theta}\odot \theta
$$
với $\mathcal{R}$ là một hàm mất mát nào đó.

<sup>Đồng thời tác giả cho thấy các phương pháp khác (như IMP/SNIP/GraSP) đều sử dụng một phiên bản tương tự của công thức này.</sup>
- Synaptic flow của một neuron được bảo toàn (*conservative*): với mỗi một neuron trong mạng thì tổng flow vào và ra nó bằng nhau:
$$
\sum\mathcal{S}(\theta^{in})=\sum\mathcal{S}(\theta^{out}),
$$
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
và cũng hoạt động tương tự với các bài toán về [luồng](https://vi.wikipedia.org/wiki/Lu%E1%BB%93ng_c%E1%BB%B1c_%C4%91%E1%BA%A1i).

<sub>Đồng thời, việc sử dụng SGD tương đương với việc cân bằng lại luồng sao cho tính bảo toàn được đảm bảo.</sub>

- Tương tự với magnitude pruning, tác giả chỉ quan tâm tới các thuật toán gán từng "điểm số" lên từng trọng số, và các trọng số có điểm thấp nhất sẽ bị xóa. Trong các thuật toán đó, nếu chúng:
    - Gán các giá trị dương cho điểm số (*positive*)
    - Xóa các trọng số theo từng bước (*iterative*)
    - Các giá trị điểm số phải tuân thủ luật bảo toàn (*conservative*)

    thì chúng sẽ không bị layer-collapse.
- Tác giả đề xuất gia một giá trị cụ thể cho hàm mất mát $\mathcal{R}$: công thức nhìn khá đáng sợ (và khó hiểu), nhưng từng bước thì đơn giản:
    - Tất cả các trọng số trong mạng được lấy giá trị tuyệt đối,
    - Cho đầu vào là một vector/ma trận toàn giá trị 1 qua mạng trên lấy đầu ra,
    - Cộng tất cả giá trị trong vector đầu ra đó với nhau.

    Sau đó chúng ta backprop để lấy đạo hàm riêng với từng trọng số (và để cân bằng lại flow), rồi nhân với giá trị tuyệt đối của trọng số đó để lấy pruning score. Làm vậy từng bước (*iterative*), mỗi lần loại bỏ một lượng trọng số có điểm số thấp nhất.

<sub>Trong paper có công thức closed-form để tính scores mà không cần forward pass, tuy nhiên các framework đều có automatic differentiation nên sử dụng công thức đó sẽ lằng nhằng hơn.</sub>

## Điểm cộng
- Không cần nhìn data.
- Có đưa ra (đôi chút) giải thích mang tính lý thuyết.

## Điểm trừ
- Lý thuyết chỉ hỗ trợ các hàm kích hoạt homogenous ($\phi(x)=\phi'(x)\cdot x$).

## Lỗ hổng
- Giải thích chưa thoả đáng. Liệu layer-collapse liệu có là nguyên nhân chính/duy nhất? Nếu không phải, thì tất cả các lý thuyết về Maximal Critical Compression axiom hay Synaptic Flow chỉ là để tham khảo. Cụ thể, paper về lottery ticket hypothesis cho thấy rằng nếu bạn bốc sai lá xổ số thì kết quả chỉ đi xuống chứ không về luôn một giá trị cố định (như là khi nếu 1 layer bị prune sạch.)
- Notation khá dị:
    - $\theta_{ij}$ đang nói đến một trọng số từ node $j$ đến node $i$.
    - $\Pi_i |W|$ có thứ tự $i$ ngược.
- Theorem 3 được trình bày và chứng minh khá khó hiểu (và có thể không đúng luôn?)

## Bình luận
- Thuật toán SynFlow chỉ hoạt động vì khi tất cả mọi thứ dương thì hàm ReLU sẽ là hàm identity; nghĩa là, khi tính $\mathcal{R}_{SF}$ thì chúng ta có thể forward pass thay vì tính bằng tay, đồng thời có công thức closed-form để tính từng trọng số môi lần backprop.
- Khá nhiều future directions:
    - Pruning score âm thì sao?
    - Các lựa chọn hàm mất mát $\mathcal{R}$ khác?
    - Phân tích mối liên quan tới flow algorithm?
    - Từ một lottery ticket **bất kỳ** train ra mạng, hoặc ra được trọng số ban đầu train được?
    - Các lý do khác khiến mô hình pruned bị toang? (nhìn ý đầu trong mục *Lỗ hổng*)

Nếu bạn nào có gì hứa hẹn hãy cho mình vào làm với =))

## Hết.
Hãy like và subscribe bởi vì nó miễn phí?