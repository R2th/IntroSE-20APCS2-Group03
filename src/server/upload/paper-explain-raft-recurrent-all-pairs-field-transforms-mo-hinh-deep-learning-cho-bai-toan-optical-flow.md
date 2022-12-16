Bài toán ước lượng Optical Flow là một trong những bài toán quan trọng trong Computer Vision. Nhiệm vụ của bài toán là ước lượng vector 2 chiều mô tả chuyển động đối ứng với từng pixel trong ảnh. Bài viết này sẽ giới thiệu một mô hình Deep Learning cho bài toán ước lượng Optical Flow, mô hình có tên gọi RAFT: Recurrent All-Pairs Field Transforms, ra mắt năm 2020 và nhận giải thưởng ECCV 2020 Best Paper Award.

# 1. Bài toán Optical Flow
![Screenshot from 2022-08-19 14-21-44.png](https://images.viblo.asia/0afcc9f7-ab5d-4dfc-9030-7a13232e01c7.png)

Optical Flow hiểu "nôm na" là sự chuyển động của đối tượng giữa 2 frame (khung hình) liên tiếp trong 1 đoạn video, sự chuyển động này được sinh ra do có sự di chuyển của đối tượng với camera quay đoạn video đó. Hình ảnh trên mô tả sự chuyển động của điểm pixel có tọa độ $(x, y)$ ở thời điểm $t$, đến thời điểm $t+1$, điểm pixel này dịch chuyển đến tọa độ $(x + dx, y+dy)$ và vector 2 chiều $(dx, dy)$ chính là vector mô tả dự dịch chuyển đó. Optical Flow có nhiều ứng dụng để giải quyết các bài toán như ước lượng chuyển động, vận tốc, hướng dịch chuyển của đối tượng, ... Cách giải quyết thường giống với một bài toán tìm quy tắc matching tối ưu nhất giữa các điểm trong frame $I_1$ và các điểm trên frame $I_2$.  Có nhiều phương pháp để giải quyết bài toán Optical Flow, từ các phương pháp truyền thống cho tới các phương pháp hiện đại như Deep Learning, bài viết này sẽ trình bày về RAFT, là một mô hình Deep Learning hiện đại để giải quyết bài toán này.

# 2. Mô hình RAFT
![Screenshot from 2022-09-29 09-16-25.png](https://images.viblo.asia/2516ca19-4a6e-49f7-9c11-5e70be527fb0.png)
Mô hình RAFT nhận đầu vào là 2 frame liên tiếp $I1$ và $I2$, nhiệm vụ của mô hình là ước lượng ra một trường chuyển động (dense displacement field), kí hiệu displacement field này là $\left(\mathbf{f}^{1}, \mathbf{f}^{2}\right)$ sao cho với mỗi pixel $(u, v)$ trên ảnh $I1$ sẽ được ánh xạ với điểm $\left(u^{\prime}, v^{\prime}\right)=\left(u+f^{1}(u), v+f^{2}(v)\right)$ trên ảnh $I2$ và displacement field này cũng chính là kết quả Optical Flow ta cần tìm. Hình [] mô tả tổng quan cách tiếp cận của mô hình, gồm 3 thành phần chính:
* **Feature Extraction** là mạng CNN, nhận đầu vào là ảnh của 2 frame liên tiếp và đưa ra feature map có kích thước $(H/8, H/8, C)$.
* **Computing Visual Similarity** là cơ chế xây dựng khối tương quan kích cỡ 4D giữa 2 feature map đầu ra của 2 frame liên tiếp.
* **Iterative Updates** là cơ chế giúp mô hình cập nhật, điều chỉnh lại kết quả Optical Flow.

Phần tiếp theo sẽ giới thiệu chi tiết từng thành phần.

## 2.1. Feature Extraction
Phần này đơn giản là sử dụng một mạng CNN gồm 6 block để trích chọn đặc trưng từ 2 frame $I1$, $I2$ và trả về kết quả là feature map có kích thước giảm 8 lần so với ảnh đầu vào $(H/8, H/8, C)$. Frame ảnh sau khi đưa qua 2 khối đầu sẽ giảm còn $1/2$ kích thước, đi qua tiếp 2 khối sau giảm còn $1/4$ kích thước và sau khi đi qua 2 khối cuối cùng thì còn $1/8$ kích thước ban đầu.

Mô hình có sử dụng thêm một mạng CNN nữa gọi là context network, nhiệm vụ là trích chọn đặc trưng ngữ cảnh từ ảnh $I1$. Phần feature extraction này khá cơ bản nên mình không trình bày chi tiết.

## 2.2. Computing Visual Similarity
![Screenshot from 2022-09-29 09-34-19.png](https://images.viblo.asia/6f7e9e5b-d3d5-413d-93c1-a4c106bcbb6b.png)

Ở bước trước, mô hình đã tính toán 2 feature map cho frame $I1$ và frame $I2$.
Ở bước này, mô hình thực hiện tính toán Visual Similarity bằng cách xây dựng khối tương quan 4D giữa từng pixel của ảnh $I1$ với từng pixel của ảnh $I2$ như minh họa tại hình vẽ trên. Việc xây dựng khối tương quan này sẽ giúp mô hình có thêm thông tin về tính tương quan giữa từng điểm pixel thuộc frame $I_1$ với từng điểm pixel thuộc frame $I_2$. Như đã trình bày ở trên, kí hiệu feature map của ảnh $I1$ là $g{\theta}\left(I{1}\right) \in \mathbb{R}^{H \times W \times D}$ và feature map của ảnh $I2$ là $g{\theta}\left(I{2}\right) \in \mathbb{R}^{H \times W \times D}$ (với $H, W$ là kích thước ảnh gốc đã được downscale đi 8 lần sau khi đưa qua CNN), khối tương quan (correlation volume) kí hiệu là $\mathbf{C}$ được định nghĩa như sau:
$$\mathbf{C}\left(g{\theta}\left(I{1}\right), g{\theta}\left(I{2}\right)\right) \in \mathbb{R}^{H \times W \times H \times W}$$
$$C{i j k l}=\sum{h} g{\theta}\left(I{1}\right){i j h} \cdot g{\theta}\left(I{2}\right){k l h}$$
Nhìn vào công thức trên, ta có thể hiểu đơn giản như sau: từng điểm trên feature map $I1$, $I2$ coi như là vector $C$ chiều, có tổng cộng $H \times W$ điểm như vậy, việc tính tương quan giữa từng điểm của feature map $I1$ kích thước $H \times W$ và feature map $I2$ kích thước $H \times W$ là khối 4D $H \times W \times H \times W$, trong đó từng phần tử của khối tương quan 4D được tính toán bằng tích vô hướng của 2 vector $C$ chiều.

**Correlation Pyramid:** Sau bước trên, mô hình đã tính toán được khối tương quan 4D, bước này sẽ tiến hành xây dựng 4-layer pyramid (kim tự tháp 4 tầng) là $\left\{\mathbf{C}^{1}, \mathbf{C}^{2}, \mathbf{C}^{3}, \mathbf{C}^{4}\right\}$ bằng cách pooling 2 chiều cuối cùng của khối tương quan 4D. Cụ thể, khối $\mathbf{C}^{k}$ trong kim tự tháp có kích thước $H \times W \times H / 2^{k} \times W / 2^{k}$. Việc xây dựng kim tự tháp này có thể coi như một cách làm tăng độ phong phú của đặc trưng, 4 tầng kim tự tháp với các kích thước khác nhau sẽ giúp mô hình bắt được những chuyển động dài ngắn khác nhau, những chuyển động nhanh của các đối tượng có kích thước nhỏ, ...

**Correlation Lookup:** Sau khi đã có kim tự tháp đặc trưng 4 tầng, ta phải đưa đặc trưng này qua thành phần cuối cùng là Iterative Updates để tính toán và cập nhật Optical Flow - tức đầu ra của bài toán. Tuy nhiên ta không thể đưa cả 4 tầng kim tự tháp này vào phần Iterative Updates do kích thước lớn và không phải đặc trưng trong kim tự tháp này cũng cần thiết cho bài toán. Tác giả đưa ra một thao tác có tên là Correlation Lookup, nhiệm vụ của thao tác này là chọn những đặc trưng (hay chính xác hơn là những vị trí nào trong kim tự tháp 4 tầng sẽ được đưa vào phần Iterative Updates). Phần tiếp theo sẽ mô tả cách thực hiện của thao tác Correlation Lookup này.

Đầu tiên, định nghĩa một phép toán tìm kiếm (lookup operator) , kí hiệu $L{\mathbf{C}}$. Phép toán $L{\mathbf{C}}$ có nhiệm vụ lựa chọn ra feature map bằng cách indexing (hiểu "nôm na" indexing là lấy ra những giá trị tại các vị trí cho trước) từ kim tự tháp 4 tầng ở bước trên. Cho trước kết quả Optical Flow tạm thời tại thời điểm đang xét là $\left(\mathbf{f}^{1}, \mathbf{f}^{2}\right)$ (ban đầu kết quả Optical Flow sẽ được khởi tại bằng 0 và cập nhật dần qua từng bước), ta sẽ ánh xạ được sự dịch chuyển của pixel $\mathbf{x}=(u, v)$ của frame $I1$ với điểm pixel $\mathbf{x}^{\prime}=\left(u+f^{1}(u), v+f^{2}(v)\right)$ trên $I2$, ta định nghĩa một local grid (vùng cục bộ) xung quanh điểm pixel $\mathbf{x}^{\prime}$ tại frame $I_2$ như sau:
$$\mathcal{N}\left(\mathbf{x}^{\prime}\right){r}=\left\{\mathbf{x}^{\prime}+\mathbf{d} \mathbf{x} \mid \mathbf{d} \mathbf{x} \in \mathbb{Z}^{2},\|\mathbf{d} \mathbf{x}\|{1} \leq r\right\}$$
Vùng local grid (vùng màu vàng, ảnh dưới) là một tập hợp các số nguyên thể hiện cho các vị trí điểm ảnh thoả mãn điều kiện khoảng cách từ 1 điểm trong local grid đến điểm $\mathbf{x}^{\prime}$ nhỏ hơn bán kính $r$.
![image.png](https://images.viblo.asia/1e91bc58-b173-44fc-8d7f-179e6ad08fdb.png)

Ảnh trên thể hiện cách indexing để lấy đặc trưng từ kim tự tháp 4 tầng, với mỗi điểm $\mathbf{x}$ trên $I1$ ta sẽ ánh xạ với 1 điểm $\mathbf{x}^{\prime}$ trên $I2$, với mỗi điểm $\mathbf{x}^{\prime}$ trên $I2$ ta lại lấy ra 1 vùng cục bộ (local grid) tương ứng với điểm đó, cứ làm như vậy và concat các vùng cục bộ này ta thu được khối đặc trưng 4D có kích thước $H \times W \times LEN \times 4$, trong đó $LEN$ là diện tích của vùng cục bộ local grid, 4 là số tầng của kim tự tháp đặc trưng.

## 2.3. Iterative Updates
Nhiệm vụ của Iterative Updates là lặp đi lặp lại $N$ lần và đưa ra chuỗi ước lượng Optical Flow $\left\{\mathbf{f}_{1}, \ldots, \mathbf{f}_{N}\right\}$ với giá trị khởi tạo $\mathbf{f}_{0} = 0$. Mỗi lần lặp, Iterative Updates sẽ tính toán ra lượng cập nhật là $\Delta \mathbf{f}$, sau đó tiến hành cập nhất kết quả Optical Flow tại bước $k+1$ như sau: $\mathbf{f}_{k+1}=\Delta \mathbf{f}+\mathbf{f}_{k}$.
Iterative Updates nhận đầu vào là flow, correlation và last hidden state, đầu ra là hidden state và lượng cập nhật flow $\Delta \mathbf{f}$.

Luồng chạy của quá trình này "hơi rối", trong paper cũng không nói chi tiết nên bài viết này sẽ đưa phần code của tác giả để minh hoạ dễ hiểu hơn luồng hoạt động và cách biểu diễn Optical Flow trong implementation.
Đầu tiên là input, gồm flow, correlation và last hidden state, trong đó correlation là đặc trưng đã trích chọn từ kim tự tháp 4 tầng (đã trình bày ở phần trước), last hidden state giống như các mô hình chuỗi (RNN, LSTM, GRU, ...), phần này sẽ tập trung trình bày cách tác giả biểu diễn và implement flow như sau:
* Đầu tiên, định nghĩa 2 ma trận toạ độ là $coords0$ và $coords1$ tương ứng với frame $I1$ và $I2$, ma trận toạ độ này có kích thước $H \times W \times 2$. Trong đó phần tử thứ $(i, j)$ có giá trị là vector 2 chiều $(u, v)$: $A{ij} = (u, v)$, điều này có nghĩa điểm tại vị trí ban đầu có toạ độ $(i, j)$ sẽ được ánh xạ với điểm có toạ độ mới là $(u, v)$ và sự ánh xạ này chính là Optical Flow.
 Theo cách định nghĩa trên, ma trận $coords0$ luôn có định là $A{ij} = (i, j)$ thể hiện cho sự không đổi của toạ độ gốc, còn ma trận $coords1$ sẽ được thay đổi liên tục cho đến khi hội tụ, biểu thị cho sự dịch chuyển Optical Flow (hình minh hoạ bên dưới).
![Screenshot 2022-08-17 at 09.20.55.png](https://images.viblo.asia/ac5e6097-674d-4e99-9e64-a75d6026d64a.png) 
* Ma trận $coords1$ ban đầu sẽ được khởi tạo như ma trận $coords0$, nhưng giá trị của ma trận ma trận $coords1$ sẽ được thay đổi theo quá trình cập nhật và trường chuyển động $\mathbf{f}$ ta cần tìm chính là $\mathbf{f} = coords1 - coords0$.

Như vậy, các bạn đã hiểu được cách biểu diễn của input cho Iterative Updates, ta sẽ tìm hiểu bên trong khối update tính toán như nào, công thức của khối này như sau:
$$\begin{aligned}
    &z_{t}=\sigma\left(\operatorname{Conv}_{3 \times 3}\left(\left[h_{t-1}, x_{t}\right], W_{z}\right)\right) \\
    &r_{t}=\sigma\left(\operatorname{Conv}_{3 \times 3}\left(\left[h_{t-1}, x_{t}\right], W_{r}\right)\right) \\
    &\tilde{h}_{t}=\tanh \left(\operatorname{Conv}_{3 \times 3}\left(\left[r_{t} \odot h_{t-1}, x_{t}\right], W_{h}\right)\right) \\
    &h_{t}=\left(1-z_{t}\right) \odot h_{t-1}+z_{t} \odot \tilde{h}_{t}
    \end{aligned}$$
 
**Dự đoán Optical Flow:** Vector hidden state $h$ được tính toán từ khối GRU được đưa qua 2 tầng tích chập để đưa ra kết quả cập nhật $\Delta f$. Đầu ra Optical Flow dự đoán có kích thước bằng 1/8 ảnh gốc, là tensor kích thước $(H/8 \times W/8 \times 2)$ (2 biểu diễn cho độ dịch chuyển theo 2 phương x và y), do vậy cần phóng to (upsampling) để đưa về kích thước ban đầu.

Mô hình RAFT huấn luyện theo cách học có giám sát với hàm mất mát như sau:
$$\mathcal{L}=\sum_{i=1}^{N} \gamma^{i-N}\left\|\mathbf{f}_{gt}-\mathbf{f}_{i}\right\|_{1}$$
Trong đó $\gamma$ được đặt là $0.8$, $\mathbf{f}_{g t}$ là nhãn chính xác của dữ liệu, $\mathbf{f}_{i}$ là dự đoán optical flow tại bước thứ $i$.

# 3. Kết luận
![Screenshot from 2022-09-29 10-16-52.png](https://images.viblo.asia/f4bc033e-d5d7-45ad-a534-2aa5b31dbc34.png)
Tại thời điểm ra mắt mô hình RAFT đạt kết quả SOTA trên một số tập dữ liệu benchmark phổ biến cho bài toán Optical Flow, các bạn có thể đọc chi tiết hơn trong paper gốc của tác giả. Hình vẽ trên trong paper gốc minh họa một số kết quả của mô hình trên tập dữ liệu KITTI, ở cặp ảnh đầu tiên, xe ô tô di chuyển từ trái sang phải và ảnh kết quả Optical Flow bên cạnh phần ứng với chiếc xe ô tô đó từ có màu đỏ thể hiện sự dịch chuyển của xe ô tô, còn phần nền có màu trắng thể hiện sự không dịch chuyển của nền khi camera đặt cố định và chỉ có duy nhất xe ô tô di chuyển.

![Color-map-used-to-visualize-the-optical-flow (2).png](https://images.viblo.asia/96d378fe-472d-4e13-a8a3-8deacb48c51e.png)

Đầu ra của mô hình là tensor kích thước $(H \times W \times 2)$ tương ứng với mỗi điểm ảnh sẽ được biểu diễn dưới dạng vector 2 chiều thể hiện phương dịch chuyển theo 2 thành phần x và y, kết quả này sẽ được ánh xạ với bảng màu như hình vẽ trên và đưa ra kết quả minh họa.

Bài biết này trình bày sơ lược về mô hình RAFT: Recurrent All-Pairs Field Transforms for Optical Flow, cảm ơn các bạn đã đọc bài, nếu có góp ý cho bài viết, các bạn vui lòng để ở phần comment.
# Tham khảo
* https://homes.cs.washington.edu/~shapiro/EE596/notes/Optical_Flow.pdf
* RAFT: Recurrent All-Pairs Field Transforms for Optical Flow (https://arxiv.org/abs/2003.12039)
* https://www.youtube.com/watch?v=r3ZtW30exoo&ab_channel=jonassenli
* https://github.com/princeton-vl/RAFT