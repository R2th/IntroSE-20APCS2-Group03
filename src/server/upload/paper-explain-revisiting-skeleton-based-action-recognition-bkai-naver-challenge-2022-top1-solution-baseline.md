Tiêu đề hơi giật tít một chút, nhưng gần đây, mình cùng team có tham gia một challenge được tổ chức bởi trung tâm nghiên cứu BKAI kết hợp với tập đoàn NAVER, trong 1 tác vụ về "[**Body Segmentation and Gesture Recognition**](https://bkai.ai/thong-bao-cuoc-thi-bkai-naver-challenge-2022/)", may mắn giật nhẹ cái :1st_place_medal: . 

Thật ra thì tác vụ này bao gồm 2 phần chính (như chính tên tác vụ): **Segmentation** và **Recognition**. Nếu các bạn quan tâm về giải pháp đầy đủ của các team tham gia, các bạn có thể xem lại livestream tại [link này](https://fb.watch/da0JxlNcAn/) (team mình thuyết trình bắt đầu từ 1:55:07 - team Overfit).

Bài viết này không bàn về giải pháp của team, mà như tiêu đề của nó: "\[Paper Explain\]", mình sẽ đi sâu và phân tích về paper được sử dụng làm baseline của nhóm trong phần Gesture Recognition. Ban đầu mình cũng không định viết về vấn đề này, do khi mình đọc paper và sử dụng source code thấy ý tưởng tương đối đơn giản và dễ hiểu, cứ nghĩ là chỉ cần gửi link paper cho ai quan tâm là đủ rồi. 

Ý định viết bắt đầu xuất hiện khi bản thân mình đi giải thích paper cho người khác, lại khá là khó diễn tả, cũng như không thoát được ý rõ ràng. Thế là chúng ta có bài viết này, cũng là 1 phần để mình note lại mọi thứ giúp rèn lại khả năng trình bày cho bản thân. 

![imgur](https://i.imgur.com/XEZF0Cu.png)

# 1. Tổng quan
Đầu tiên, để lại một số thông tin để mọi người tìm hiểu qua trước: 
- paper: https://arxiv.org/pdf/2104.13586.pdf (Oral paper - CVPR 2022)
- github: https://github.com/kennymckormick/pyskl (vẫn đang update khá thường xuyên)
- paper with code: https://paperswithcode.com/paper/revisiting-skeleton-based-action-recognition
- Tên gọi tắt: PoseC3D (v1) hoặc **PoseConv3D** (v2)

PoseConv3D không được đề xuất làm giải pháp chung cho bài toán action recognition, mà là một bài toán hẹp hơn: "**skeleton based action recognition**", sử dụng modality chính là "pose" - output của các bài toán Pose Estimation. Bàn 1 chút về ưu-nhược điểm của pose, thì chúng ta sẽ không lo vấn đề bị ảnh hưởng bởi background, tránh được các nhiễu từ môi trường cũng như làm giảm về kích thước input, có thể sử dụng các mô hình nhẹ, có tốc độ training và inference nhanh, tuy nhiên lại chịu ảnh hưởng trực tiếp từ chất lượng pose của các mô hình Pose Estimation.

Quay lại paper, theo ý kiến cá nhân của mình, đóng góp lớn nhất của PoseConv3D là việc đề xuất ra 1 phương pháp chuyển đổi pose đầu vào thành dạng **3D heatmap volumes**, có khả năng biểu diễn tính không thời gian cao (spatial-temporal information). Trong khi hầu hết các paper những năm gần đây (2019, 2020, 2021), biến đổi pose thành dạng graph và sử dụng GNN, GCN, ..., PoseConv3D quay lại với việc sử dụng CNN, cụ thể là **3D-CNN** và đạt được những kết quả không ngờ, đạt top1 trên leaderboard của nhiều tập dataset khác nhau

![imgur](https://i.imgur.com/os1VccT.png)

# 2. Heatmap Input Processing
### 2.1 Tại sao lại là 3D heatmap? 
Như mình có nhắc qua, riêng đối với bài toán skeleton based action recognition thì GCN based method mới thật sự là một hướng đi phổ biến và tiêu chuẩn hiện nay, tức là với pose/skeleton, thông thường sẽ được xử lí thành các graph, với đỉnh là các keypoint và cạnh là các đường nối giữa các keypoint trong 1 frame cũng như giữa các frame liên tiếp nhau. Vậy biểu diễn pose dưới dạng 3D heatmap thì có ưu điểm gì vượt trội hơn? 
- **Robustness**: Graph input rất nhạy cảm với thông tin các node, một sự nhiễu loạn nhỏ trong tọa độ các keypoint có thể dẫn đến những kết quả hoàn toàn khác nhau, do đó, đôi khi việc sử dụng những Pose Estimator khác nhau có thể ảnh hưởng lớn đến performance của mô hình (dù cùng ước lượng các keypoint như nhau). Việc sử dụng heatmap để biểu diễn keypoint có thể làm giảm được mức độ nhạy cảm này.
- **Interoperability**: Các nghiên cứu trước đây chỉ ra rằng, các modality khác nhau (RGB, optical flow, ...) có khả năng bổ sung cho nhau, do đó, việc sử dụng heatmap giúp việc kết hợp pose với các modality này trở nên dễ dàng hơn, thay vì sử dụng graph (*1 phần lí do cho việc team mình quyết định sử dụng PoseConv3D làm baseline cho solution*)
- **Scalability**: GCN coi mỗi keypoint của một người là một node, nên mức độ phức tạp của GCN tỷ lệ tuyến tính với số lượng người có trong video, hạn chế khả năng áp dụng của nó cho các tình huống liên quan đến nhiều người, chẳng hạn như nhận dạng hoạt động nhóm. Trong khi đó, PoseConv3D có thể biểu diễn 1 hoặc nhiều người trong cùng heatmap, vẫn đảm bảo performance mà không ảnh hưởng đến độ phức tạp của mô hình.

Ngoài ra, so với 2D Heatmap được tạo bởi những thuật toán colorization (PoTion) hay temporal convolutions (PA3D), 3D heatmap bảo toàn được thông tin hơn, không bị mất mát quá nhiều đặc biệt là về thông tin thời gian (temporal information).

Về cơ bản, mọi người có thể xem qua hình ảnh dưới đây để hình dung pipeline tạo 3D heatmap trước, sau đó, mình sẽ đi vào chi tiết từng phần sau: 

![imgur](https://i.imgur.com/5cfdfBw.png)

### 2.2 Một số kĩ thuật tiền xử lí đáng chú ý
- Uniform Sampling

    Vì số lượng frame của mỗi video là khác nhau, chúng ta cần một phương pháp lấy mẫu T frame để kích thước input được xác định. Dựa trên 1 quan sát: "**The input sampled from a small temporal window may not capture the entire dynamic of the human action**", nhóm tác giả tiến hành thử nghiệm so sánh lấy mẫu 32 frame từ video bằng Sampling với Fixed Temporal Strides  lần lượt là 2, 3, 4 với Uniform Sampling. Kết quả là Uniform Sampling vượt trội hơn so với phần còn lại, do khả năng capture thông tin toàn bộ video đầy đủ hơn.

    Để lấy mẫu một clip T-frame từ video, Uniform Sampling về cơ bản chia video thành T đoạn có độ dài bằng nhau và lấy mẫu ngẫu nhiên một frame từ mỗi đoạn.
    
    ![imgur](https://i.imgur.com/QxiIS3V.png)

- Subject Center Cropping

    Vì vị trí và kích thước đối tượng trong mỗi video là khác nhau, việc có thể crop, tập trung vào đối tượng sẽ là keyword chính giúp mô hình nắm giữ thông tin hành động một cách tốt nhất với kích thước input phù hợp nhất. 

    Subject Center Cropping được thực hiện như sau: trước tiên nó sẽ tìm một bounding box (hộp giới hạn) chặt chẽ bao quanh tất cả các keypoint trong mỗi frame (cụ thể là tìm x_max, x_min, y_max, y_min từ tọa độ của các keypoint), sau đó tiến hành mở rộng bounding box này theo một tỷ lệ padding nhất định. Ví dụ: nếu 'padding == 0,25', thì bounding box được mở rộng sẽ có tâm không thay đổi còn chiều rộng và chiều cao sẽ x1,25 lần.

    Dựa vào đây, tiến hành tính toán lại tọa độ keypoint theo kích thước mới đồng thời có thể crop các modality khác liên quan nếu có (RGB, mask, optical flow, ...). Điều này mọi người có thể dễ thấy trong hình minh họa pipeline phía trên.

### 2.3 Từ 2D Pose đến 3D Heatmap Volume
Mục này có thể coi là phần trọng tâm của Input Processing: tạo ra heatmap như thế nào? PoseConv3D đề xuất 2 loại heatmap: **Joint heatmap** dùng cho biểu diễn các điểm keypoint  và **Limb heatmap** dùng cho biểu diễn các khung xương - trong hình ảnh pipeline phía trên cũng có hình minh họa về 2 loại heatmap này
- Joint Heatmap

    Cách tạo joint heatmap tương đối đơn giản và quen thuộc, do nó tương tự như cách tạo heatmap trong CenterNet (một mô hình anchor-free bên Object Detection), mình sẽ viết lại từng bước đơn giản như sau. 

    Với mỗi frame, có $k$ điểm keypoint $(x_k, y_k, c_k)$: 

    - Đầu tiên, tạo 1 heatmap $J \in [0]^{K*H*W}$ với $H, W$ là kích thước output, $K$ là số điểm joint (keypoint)
    - Tiến hành cập nhật lại giá trị của heatmap $J$ theo công thức
        $$
        J_{kij} = e^-\frac{(i-x_k)^2 + (j-y_k)^2}{2*\sigma^2}*c_k
        $$
        với $k\in[0, K], i\in[0, H], j\in[0, W]$ và $\sigma$ (default = 0.6) được sử dụng để kiểm soát phân phối giá trị của các điểm quanh keypoint (phân phối chuẩn)

- Limb heatmap

    Cách tạo limb heatmap thì phức tạp hơn so với joint heatmap, tuy nhiên, quy trình vẫn vậy, thứ thay đổi duy nhất chỉ là công thức cập nhật heatmap theo giá trị keypoint. Ở đây, với heatmap $L \in [0]^{K*H*W}$, $K$ lúc này lại là số lượng limb, ta có công thức sau: 
    $$
    L_{kij} = e^-\frac{\mathcal{D}((i, j), seg[a_k, b_k])^2}{2*\sigma^2}*min(c_{a_k}, c_{b_k})
    $$
    Với $l\in[0, K], i\in[0, H], j\in[0, W]$, limb thứ $k$ tương ứng với khung xương được tạo bới 2 điểm keypoint $a_k, b_k$, $\mathcal{D}$ là 1 hàm tính khoảng cách từ điểm $(i, j)$ đến đường nối $[a_k, b_k]$

Khi đó, với mỗi frame, chúng ta có 1 heatmap có số chiều là $K*H*W$. Tương ứng, stack lại T frames, chúng ta thu được một 3D heatmap volume có số chiều là $T*K*H*W$ (reshape lại thành $K*T*H*W$ để tạo input cho các kiến trúc 3D-CNN)

Full source code phần tạo heatmap voulume, mọi người có thể xem tại [heatmap_related.py](https://github.com/kennymckormick/pyskl/blob/main/pyskl/datasets/pipelines/heatmap_related.py)
```python
def generate_a_heatmap(self, arr, centers, max_values):
        """Generate pseudo heatmap for one keypoint in one frame.

        Args:
            arr (np.ndarray): The array to store the generated heatmaps. Shape: img_h * img_w.
            centers (np.ndarray): The coordinates of corresponding keypoints (of multiple persons). Shape: M * 2.
            max_values (np.ndarray): The max values of each keypoint. Shape: M.

        Returns:
            np.ndarray: The generated pseudo heatmap.
        """

        sigma = self.sigma
        img_h, img_w = arr.shape

        for center, max_value in zip(centers, max_values):
            if max_value < EPS:
                continue

            mu_x, mu_y = center[0], center[1]
            st_x = max(int(mu_x - 3 * sigma), 0)
            ed_x = min(int(mu_x + 3 * sigma) + 1, img_w)
            st_y = max(int(mu_y - 3 * sigma), 0)
            ed_y = min(int(mu_y + 3 * sigma) + 1, img_h)
            x = np.arange(st_x, ed_x, 1, np.float32)
            y = np.arange(st_y, ed_y, 1, np.float32)

            # if the keypoint not in the heatmap coordinate system
            if not (len(x) and len(y)):
                continue
            y = y[:, None]

            patch = np.exp(-((x - mu_x)**2 + (y - mu_y)**2) / 2 / sigma**2)
            patch = patch * max_value
            arr[st_y:ed_y, st_x:ed_x] = np.maximum(arr[st_y:ed_y, st_x:ed_x], patch)
```

Dưới đây là 1 ví dụ nhỏ về 3D joint heatmap volume và 3D limb heatmap volume (video mẫu lấy trong tập dataset của BKAI-NAVER Challenge)

![imgur](https://i.imgur.com/BkOb0kn.gif)
# 3. 3D-CNN Architectures
Để chứng minh sức mạnh của 3D-CNN trong việc nắm bắt thông tin không-thời gian của skeleton sequences, nhóm tác giả tiến hành thiết kế và thử nghiệm 2 họ 3D-CNN chính: **PoseConv3D** cho Pose Modality và **RGBPose-Conv3D** cho RGB + Pose dual-modality.

### 3.1 PoseConv3D
PoseConv3D chỉ tập trung vào pose, nên 3D Heatmap Volume tạo từ keypoint là đầu vào duy nhất của nhóm mô hình này. 

Có 2 điểm cần chú ý trong thiết kế ở đây: 
- Thứ nhất là không cần thiết sử dụng down-sampling trong những stage đầu tiên vì spatial resolution của 3D Heatmap Volume cũng không lớn như RGB clips thông thường.
- Thứ hai, heatmap volume vốn có thể coi như là một mid-level feature, do đó, các model 3D-CNN sử dụng không cần quá nặng hoặc sâu, mà nên thiết kế các model nhẹ hơn (ít channel hơn), nông hơn (ít layers hơn), cũng phù hợp với việc xử lí realtime trong thực tế.

3 model 3D-CNN được nhóm tác giả lựa chọn và thiết kế lại để phù hợp với input, bao gồm 
- **C3D**: C3D là một trong những model 3D-CNN đầu tiên được phát triển cho bài toán action recognition (vai trò tiên phong như AlexNet trong bài toán image classification), bao gồm 8 lớp 3D-CNN. Để áp dụng lên heatmap volume, C3D được giảm đi 1 nửa channel-width (từ 64 thành 32). Ngoài ra, trong 1 phiên bản nhỏ gọn hơn **C3D-s** (hoặc C3D Light), thậm chí bỏ hẳn đi 2 layer cuối. 
- **SlowOnly**: SlowOnly cũng là 1 model 3D-CNN giải quyết bài toán RGB based action recognition. Nó được xây dựng bằng cách inflating các lớp ResNet trong hai stage cuối để chuyển từ 2D sang 3D. Về cơ bản thì ko có paper riêng về SlowOnly, do nó lần đầu được giới thiệu như thiết kế của Slow Pathway trong mô hình SlowFast. Để áp dụng lên heatmap volume, SlowOnly cũng tương tự, được giảm 1 nửa channel-width (từ 64 thành 32), đồng thời loại bỏ stage đầu trong 4 stage. Một số biến thể khác của SlowOnly như **SlowOnly-wd, SlowOnly-HR** với thí nghiệm nâng độ phức tạp trong thiết kế, nhưng kết quả đạt được không cải thiện gì nhiều.
- **X3D**: X3D có thể được coi như SOTA hiện tại trong 3D-CNN model (cả về performance, số lượng parameters hay FLOPs). Để hiểu hơn về X3D, mình nghĩ mọi người nên đọc paper trực tiếp, chứ một vài dòng giới thiệu là không đủ để diễn tả. Do X3D cũng đủ nhỏ nhẹ rồi, nên nhóm tác giả cũng không thay đối thiết kế quá nhiều ngoại trừ việc bỏ đi stage đầu tiên. Với phiên bản nhỏ gọn **X3D-s** (hoặc X3D shallow) cũng chỉ đơn giản là loại bỏ đi 1 số layers ở mỗi stage của mô hình

![imgur](https://i.imgur.com/DEujyjn.png)

Các source code liên quan đến phần model, mọi người có thể xem tại: https://github.com/kennymckormick/pyskl/tree/main/pyskl/models/cnns

### 3.2 RGBPose-Conv3D

Để kiểm tra tính "Interoperability" của heatmap volume, RGBPose-Conv3D được phát triển, xem xét khả năng kết hợp của pose keypoint với RGB frame. Được lấy cảm hứng từ thiết kế của SlowFast, RGBPose-Conv3D là một general framework, có thể khởi tạo với bất cứ mô hình 3D-CNN nào (trong paper thì nhóm tác giả mới thí nghiệm với SlowOnly)

![imgur](https://i.imgur.com/eCtiwhT.png)

Để nắm được thiết kế này, mình cực kì recommend mọi người đọc paper của SlowFast trước (mình sẽ không giải thích ở đây): [SlowFast Networks for Video Recognition](https://openaccess.thecvf.com/content_ICCV_2019/papers/Feichtenhofer_SlowFast_Networks_for_Video_Recognition_ICCV_2019_paper.pdf)

Về cơ bản, **RGB Pathway ~ Fast Pathway** và **Pose Pathway ~ Slow Pathway**, RGB Pathway có frame rate nhỏ hơn, channel-width lớn hơn do RGB là low-level feature, trong khi Pose Pathway có frame rate lớn và channel-width nhỏ do input là heatmap volume. 2 nhánh này cũng được training với loss độc lập, việc sử dụng jointly loss có thể dẫn đến tình trạng overfit.

Một điều hơi tiếc là source code liên quan đến RGBPose-Conv3D lại chưa được công bố (hoặc chưa update), mình vẫn đang khá hóng thêm về phần này. 
# 4. Kết luận
PoseConv3D được giới thiệu không phải dưới dạng 1 model cụ thể, mà nó bàn nhiều về tư tưởng giải quyết bài toán cũng như phương hướng thiết kế mô hình, do đó, khả năng mở rộng của nó là rất cao, ứng dụng được nhiều bài toán trong thực tế.

* Chúng ta có thể dễ dàng thay thế 1 Pose Estimator để sử dụng cho những bài toán riêng, có thể chỉ quan tâm đến keypoint của tay, hoặc pose phần thân trên, ... hoặc thậm chí biến đổi từ keypoint 3D -> 2D, miễn là vẫn tạo ra được 3D Heatmap Volume.
* Chúng ta có thể dễ dàng kết hợp multi-modality: có thể sử dụng RGBPose-Conv3D hoặc concat các feature lại với nhau, ...
* Chúng ta có thể dễ dàng thay thế và thử nghiệm các model 3D phù hợp hơn với mỗi bài toán.
* ...

Phía trên là 1 bài phân tích nhỏ của bản thân mình về khả năng cũng như tiềm năng của PoseConv3D - model được team mình lựa chọn làm baseline để phát triển giải pháp cho task gesture recognition. Nếu bài viết có gì khó hiểu hoặc chưa thoát ý, các bạn cứ comment đóng góp thêm ở ngay dưới phần Bình Luận, mình sẽ tích cực cùng mọi người thảo luận để hoàn thiện thêm chất lượng bài viết. 

Rất cảm ơn mọi người đã đọc đến đây. Nếu thấy hay, đừng quên upvote + share giúp mình để mình có động lực viết thêm nhiều bài phân tích khác (đây là bài đầu tiên sau 8 tháng không viết bài của mình rồi - lười quá :3)

Chúc mọi người một ngày làm việc và học tập thật hiệu quả! See ya ✌️