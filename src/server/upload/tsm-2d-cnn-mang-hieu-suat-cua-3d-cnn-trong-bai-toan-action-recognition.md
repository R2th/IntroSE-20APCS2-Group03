Tiếp nối chủ đề của bài viết lần trước: ["Video Understanding: Tổng quan"](https://viblo.asia/p/video-understanding-tong-quan-GrLZDRzJ5k0), hôm nay mình muốn cùng mọi người phân tích 1 paper khá hay trong lớp bài toán video understanding/action recognition: [**TSM: Temporal Shift Module for Efficient Video Understanding**](https://arxiv.org/pdf/1811.08383.pdf).

TSM không mới (đã được giới thiệu lần đầu từ 2019), cũng không phải SOTA hiện tại (nhưng là SOTA tại thời điểm nó ra mắt), tuy nhiên, tính đơn giản trong giải pháp cũng như khả năng ứng dụng cao của TSM lại đáng để chúng ta cùng ngồi bàn luận và nghiền ngẫm mô hình này.

Oke, không úp mở thêm nữa, bắt đầu bài viết thôi nào!
# 1. Bàn luận ngoài lề
### 1.1 Deep Video Recognition
Nếu đã đọc qua bài viết trước, *"tổng quan về video understanding"* của mình, các bạn hẳn đã nắm được keyword cần quan tâm chính trong bài toán này là cần đảm bảo được tính mô hình hóa không-thời gian (spatial-temporal information) của các phương pháp. Nếu nhìn từ góc độ của CNN, chúng ta có thể chia các phương pháp thành 2 nhóm chính 
* **2D-CNN**: Đây là nhóm phương pháp sử dụng các convolution 2D thông thường, như trong các bài xử lí ảnh, để cố gắng trích xuất các spatial information từ các frame, việc xử lí temporal infomation sau đó sẽ được giao cho hoặc là 1 nhánh song song, nhận đầu vào là optical flow (đại diện cho motion trong video), hoặc là 1 lớp RNN (LSTM/GRU/...) phía sau để tổng hợp thông tin, xử lí giống với dữ liệu dạng chuỗi.
* **3D-CNN**: Nhóm phương pháp này có quan điểm khác 1 chút, không xử lí riêng rẽ spatial information và temporal information, mà coi toàn bộ video như 1 tensor đầu vào với h và w (chiều cao, chiều rộng) của video sẽ đại diện cho spatial còn số frame sẽ đại diện cho temporal. Mô hình sẽ sử dụng các 3D-CNN để xử lí input 3D dạng này và trả ra kết quả phân loại video.

![kaggle](https://i.imgur.com/jriyCTU.png?1)

<sub>HÌnh ảnh được dẫn nguồn từ [3D Convolutions : Understanding + Use Case - Drug Discovery](https://www.kaggle.com/shivamb/3d-convolutions-understanding-use-case), các bạn cũng có thể đọc thêm bài viết này để hiểu hơn về 3D-CNN</sub>
### 1.2 Trade-offs 
Từ hướng tiếp cận của 2 nhóm phương pháp 3D-CNN và 2D-CNN, chúng ta có thể dễ dàng nhận thấy là 3D-CNN sẽ có khả năng mô hình hóa spatital-temporal information tốt hơn. Và một điều khác cũng dễ nhận thấy là 3D-CNN cần lượng chi phí tính toán (computation cost) cũng lớn hơn 2D-CNN rất nhiều. Đây là **trade-off** mà mình muốn nhắc đến trong phần này: **trade off expressiveness và computation costs**

Để giải quyết vấn đề trade-off này, một số phương án giải quyết được đưa ra: 
- Sử dụng 3D-CNN ở đầu mô hình và 2D-CNN ở cuối mô hình hoặc ngược lại
- Phân rã 3D convolution thành 2D spatial convolution and 1D temporal convolution
- Sử dụng thêm motion filter để sinh spatio-temporal features từ 2D CNN.
- ...

Tuy nhiên các phương pháp này đều sẽ làm mất đi hoặc là khả năng low-level temporal modeling hoặc là khả năng high-level temporal modeling so với 3D-CNN. 

Khi đó TSM ra đời, giới thiệu 1 module mới **"Temporal Shift Module"** với cách giải quyết đơn giản đến khó tin, nhưng lại đem lại hiệu quả vượt trội: ***Đạt được khả năng mô hình hóa spatial-temporal infomation như các mô hình 3D-CNN nhưng độ phức tạp, chi phí tính toán chỉ như các mô hình 2D-CNN.***

# 2. Temporal Shift Module
> In this paper, we propose a generic and effective Temporal Shift Module (TSM) that enjoys both high efficiency and high performance. Specifically, it can achieve the performance of 3D CNN but maintain 2D CNN’s complexity. 
> 
> It can be inserted into 2D CNNs to achieve temporal modeling at zero computation and zero parameters

Đó là đoạn giới thiệu ngầu lòi ở phần abtract của paper. Ở phần này, chúng ta sẽ tìm hiểu là dựa trên cơ sở gì mà 1 phương pháp có thể đạt được performance vượt trội nhưng lại chỉ cần "zero computation and zero parameters". Một ý tưởng đầy thú vị :D 

* Paper: [TSM: Temporal Shift Module for Efficient Video Understanding](https://arxiv.org/pdf/1811.08383.pdf)
* Original Implementation: https://github.com/mit-han-lab/temporal-shift-module
* Authors: Nhóm tác giả từ đại học MIT

### 2.1 Intuition
Phần này sẽ nhắc lại về lí thuyết CNN, cũng là nền tảng khai thác cho TSM. Để ôn lại 1 chút, các bạn có thể xem qua bài viết này: [Tại sao mạng tích chập lại hoạt động hiệu quả?](https://viblo.asia/p/tai-sao-mang-tich-chap-lai-hoat-dong-hieu-qua-jvEla076Zkw) 

Đầu tiên chúng ta hãy xem xét một phép toán tích chập thông thường. Để ngắn gọn, paper sử dụng 1-D convolution với kích thước kernel là 3 làm ví dụ. 

Giả sử trọng số của convolution là $W = (w1, w2, w3)$ và đầu vào $X$ là vectơ 1-D có độ dài vô hạn. Gọi $Y$ là vector đầu ra của $X$ sau khi đi qua toán tử convolution $Y = Conv(W, X)$, ta có 
$$
Y_i = w_1X_{i-1} + w_2X_{i} + w_3X_{i+1} 
$$
với $i$ chạy từ $0 \rightarrow \inf$. 

Một cách dễ hiểu, chúng ta có thể chia phép convolution làm 2 công đoạn: **shift** (dịch chuyển) và **multiply-accumulate** (nhân tích lũy). Nhìn vào ví dụ trên, thì shift là quá trình từ $X_i$, dịch chuyển sang các giá trị $X_{i-1}$ và $X_{i+1}$ và multiply-accumulate là việc nhân các $X$ với các trọng số tương ứng, rồi tính tổng lại. 

Về mặt tính toán, việc **"shift" hầu như không mất chi phí tính toán nào (hoặc chi phí tính toán không đáng kể)**, còn phần "multiply-accumulate" lại phải thực hiện nhiều phép nhân và tổng hợp, là phần chi phí tính toán chính ảnh hưởng đến toàn bộ phép convolution. **Tuy nhiên, nếu nhìn từ 1 góc nhìn khác, "shift" ảnh hưởng đến đầu vào và đầu ra của phép convolution và việc ảnh hưởng này liên quan đến temporal infomation.** 

Xuất phát từ quan sát này, nhóm tác giả đề xuất 1 ý tưởng giải quyết cho bài toán temporal modeling trong action recognition mà không ảnh hưởng đến chi phí tính toán của mô hình: **Shift 1 phần channel giữa feature map của các frame trong video cho nhau**

![imgur](https://i.imgur.com/0p9NHTT.png)
### 2.2  Module Design
Oke, xuất phát điểm của phương pháp khá dễ hiểu, nhưng nhóm tác giả nhận ra rằng: **việc áp dụng việc shift 1 cách đơn giản lên chiều thời gian trong video không thể giúp mang lại hiệu suất cũng như hiệu quả cao**. Có 2 nguyên nhân chính dẫn đến các kết quả tệ có thể kể đến là:
- ***Thao tác "shift" không cần tính toán, nhưng nó liên quan đến việc di chuyển dữ liệu***. Di chuyển dữ liệu làm tăng dung lượng bộ nhớ và độ trễ suy luận trên phần cứng. Khi sử dụng chiến lược dịch chuyển tương tự như shift vẫn thường dùng với spatial information, độ trễ CPU tăng 13,7% và độ trễ GPU tăng 12,4%, làm cho suy luận tổng thể bị chậm lại.
- ***Bằng cách chuyển một phần channel sang các frame lân cận, thông tin chứa trong các channel của frame hiện tại bị mất đi, điều này có thể gây hại cho khả năng mô hình hóa không gian của 2D CNN backbone***. Việc shift sai chiến lược khiến độ chính xác giảm 2,6% so với sử dụng 2D-CNN thông thường.

Do đó, nhóm tác giả đã thực hiện nhiều thí nghiệm để tìm ra cách thiết kế module một cách hiệu quả nhất. Xuất phát điểm từ TSN (đổi sang sử dụng backbone ResNet), mục tiêu là xây dựng tích hợp thêm 1 module "Temporal Shift Module" ứng dụng được ý tưởng về toán tử shift và hạn chế các ảnh hưởng đã nêu ở trên 

<sub>(mọi người có thể đọc thêm về TSN tại ["Nhận diện hành động với Temporal Segment Networks(TSN)"](https://viblo.asia/p/machinlearning-nhan-dien-hanh-dong-voi-temporal-segment-networkstsn-gGJ5976rZX2))</sub>

2 đóng góp chính trong module: 
- **Hạn chế việc di chuyển dữ liệu (Reducing Data Movement):** Lần lượt thử nghiệm **no shift** (2D baseline), **partial shift** (1/8, 1/4, 1/2) và **all shift** (shift tất channels). Kết quả sau cùng **partial shift (1/8)** giúp hạn chế được độ trễ suy luận cũng như bớt ảnh hưởng đến bộ nhớ phần cứng
    
    ![imgur](https://i.imgur.com/Q8Eeu8A.png)
    
- **Bảo đảm khả năng mô hình hóa không gian (Keeping Spatial Feature Learning Capacity)**: Sử dụng 1 thiết kế chỉnh sửa từ residual block trong resnet (quan sát hình dưới) kết hợp với partial shift. Thiết kế này giúp mô hình vẫn giữ được các channel của feature kể cả khi shift, đồng thời, số channel shift cũng không phải toàn bộ, do đó ít ảnh hưởng đến khả năng mô hình hoán thông tin không gian (spatial information)

    ![imgur](https://i.imgur.com/YTQFsFR.png)

```python
def shift(x, n_segment=3, fold_div=8, inplace=False):
    nt, c, h, w = x.size()
    n_batch = nt // n_segment
    x = x.view(n_batch, n_segment, c, h, w)

    fold = c // fold_div
    if inplace:
        raise NotImplementedError  
    else:
        out = torch.zeros_like(x)
        out[:, :-1, :fold] = x[:, 1:, :fold]  # shift left
        out[:, 1:, fold: 2 * fold] = x[:, :-1, fold: 2 * fold]  # shift right
        out[:, :, 2 * fold:] = x[:, :, 2 * fold:]  # not shift

    return out.view(nt, c, h, w)
```
# 3. Online video recognition
Video understanding từ các luồng video trực tuyến rất quan trọng trong các tình huống thực tế. Nhiều ứng dụng thời gian thực yêu cầu nhận dạng video trực tuyến với độ trễ thấp, chẳng hạn như AR / VR, xe tự lái, ... 
Bằng việc thay đổi 1 chút việc lựa chọn frame để shift, TSM có thể đồng thời giải quyết cả 2 bài toán offline và online video recognition. 

### 3.1 Uni-directional TSM
Offline TSM dịch chuyển một phần của các channel theo hai hướng (quan sát hình vẽ trong phần 2.1), điều này yêu cầu các feature từ các frame trong tương lai để thay thế các feature trong frame hiện tại và có thể giúp TSM có khả năng mô hình hóa temporal information tốt hơn. 

Tuy nhiên, online video recognition không cho phép sử dụng thông tin của các frame trong tương lai (do bản chất, tương lai là chưa xảy ra). Do đó, bằng việc sử dụng 1 thiết kế mới, cho phép chỉ chuyển feature từ các frame trước đó sang frame hiện tại, TSM có thể xử lí được các bài toán online recognition: **Uni-directional TSM**.

![imgur](https://i.imgur.com/jOe34w9.png)

### 3.2 Advantages
Sử dụng Uni-directional TSM cho video online recognition có một số thuận lợi sau: 
- **Low latency inference**: Đối với mỗi frame, chúng ta chỉ cần thay thế và lưu vào bộ nhớ cache 1/8 features mà không phải tính toán thêm. Do đó, độ trễ của việc đưa ra dự đoán trên mỗi frame gần giống như các mô hình 2D-CNN thông thường
- **Low memory consumption**: Vì chúng ta chỉ lưu trữ một phần nhỏ feature (1/8) trong bộ nhớ nên mức tiêu thụ bộ nhớ thấp. Đối với ResNet-50, chúng ta chỉ cần thêm 0,9MB bộ nhớ đệm để lưu trữ intermediate feature.
-  **Multi-level temporal fusion**: Như đã trình bày ở phần trade-off, các phương pháp trước đố cần đánh đổi hoặc là khả năng low-level temporal modeling hoặc là khả năng high-level temporal modeling, nhưng TSM có khả năng Multi-level temporal fusion, là do các TSM module được thêm vào trong backbone, xuyên suốt cả kiến trúc - multi level.
# 4. Nhận xét và đánh giá
Oke, phía trên là toàn bộ những gì mình muốn trình bày về TSM, có thể tóm lược lại 1 số điểm mình muốn nhấn mạnh sau đây: 
-  TSM là mô hình đạt được khả năng mô hình hóa spatial-temporal infomation như các mô hình 3D-CNN nhưng độ phức tạp, chi phí tính toán chỉ như các mô hình 2D-CNN.
-  TSM chỉ đơn giản là thực hiện shift channel theo temporal cùng với 1 thiết kế shift tối ưu
-  TSM có khả năng ứng dụng là rất lớn, khi có thể đồng thời adapt được sang online video recognition
- Ý tưởng của nhóm tác giả ở đây là cực kì đơn giản, dễ hiểu, nhưng hiệu quả đạt được thì vô cùng vượt trội => Không phải cứ những mô hình, thiết kế phức tạp đao to búa lớn mới đem lại kết quả tốt, hiệu quả của mô hình đến từ quan sát của người thiết kế. 

Cảm ơn mọi người đã cùng đọc đến cuối bài viết này. Hi vọng bài viết có ích và truyền được cảm hứng đến mọi người. :D Hẹn gặp mọi người ở những bài phân tích paper sau. See ya!