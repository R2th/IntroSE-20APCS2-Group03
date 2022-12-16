# Giới thiệu chung
Kiến trúc FPN ( feature pyramid network) từ lâu đã được sử dụng trong object detection cho nhiệm vụ tăng cường thông tin của một mức scale bằng cách fusion đặc trưng từ  scale trước đó. Sau FPN cũng đã có khá nhiều biến thể của nó được sinh ra, và tất cả chúng đều cho thấy sự cải thiện về hiệu quả một cách đáng kinh ngạc. Một số mô hình khá nổi tiếng có thể kể đến như : Nas-FPN, AugFPN, PAFPN, Bi-FPN, BFP. 
![image.png](https://images.viblo.asia/f6d25bc9-9fd7-4025-a4de-99c7170c695c.png)
<div align="center"><b>Hình 1. So sánh RCNet và các SOTA khác </b></div>

Từ những nghiên cứu của các biến thể nói trên, ta có thể thấy rằng các cách fusion phức tạp kiểu 2 chiều cả bottom-up và top-down như PANet hay Bifpn đều cho kết quả cao, có thể là vì các kiến trúc nói trên đều có feature fusion pipeline dài hơn kiến trúc fpn thông thường.
![](https://images.viblo.asia/5fd87d08-53ef-4ba9-8545-f81507563605.png)  
<div align="center"><b>Hình 2. FPN và các biến thể nổi tiếng </b></div>

![image.png](https://images.viblo.asia/8baca324-d465-4c59-87a5-73c03e74141d.png)
<div align="center"><b>Bảng 1. Các thí nghiệm chứng minh độ hiệu quả của RCNet </b></div>

Tuy nhiên, điều này lại làm tăng thời gian training và inference, cụ thể có thể xem ở bảng 1. Từ những quan sát trên thì nhóm tác giả RCNet đã đề xuất một kiểu kiến trúc mới có tên là Reverse Feature Pyramid (RevFP) kèm theo Cross-scale Shift Network (CSN). Mô hình được đề xuất cho kết quả hoàn toàn vượt trội so với baseline fpn và các biến thể khác.
# RCNet
![](https://images.viblo.asia/223a93a4-41fc-4cc9-8e11-ae9404cbdbb2.png)

<div align="center"><b>Hình 3. Mô hình tổng quát của RCNet </b></div>
Như đã nói ở trên thì mặc dù BiFPN hay Aug FPN cho kết quả khá tốt, nhưng lại có nhược điểm là làm tăng đáng kể thời gian inference. Chính vì thế, nhóm tác giả đã rút ngắn feature pipeline lại nhằm giảm thời gian inference, đồng thời cũng đưa ra một insight rằng nếu đưa thêm một phép cộng nhánh ngược về scale trước đó thì có thể mô phỏng dòng đặc trưng hai chiều toàn cục mà vẫn giữ được tốc độ inference. Từ đó nhóm tác giả đã đề xuất khối RevFP (Reverse Feature Pyramid) bao gồm một đường bottom-up và cộng thêm kết nối cục bộ top-down, lưu ý là hướng ngược lại: top-down cộng kết nối cục bộ bottom-up cũng đã được thí nghiệm nhưng cho kết quả thấp hơn nên không được report.

Ngoài ra thì nhóm tác giả có sử dụng phép weighted fusion theo ý tưởng của BiFPN thay vì phép cộng thông thường của FPN.
Một vấn đề nữa mà các tác giả nói đến là mối tương quan giữa các feature map ở các mức scale khác nhau: thường thì feature map của 2 mức scale gần nhau sẽ có độ tương quan cao, nhưng mức chênh lệch scale càng cao thì độ tương quan sẽ càng giảm mạnh do phép fusion đặc trưng thường chỉ tập trung vào 2 mức scale ở gần, từ đó khiến các feature map ở xa nhau cho ra những kết quả chênh lệch với nhau làm ảnh hưởng đến hiệu quả của mạng. Để giải quyết vấn đề này, các tác giả có đề xuất mạng con Cross-scale Shift Network (CSN). CSN sẽ dịch đặc trưng theo channel giữa toàn bộ các mức scale cho nhiệm vụ trao đổi thông tin toàn cục từ đó tạo sự cân bằng đặc trưng trong mạng multi-level multi-scale. Một điều đặc biệt là khối này khá nhẹ bởi vì phép dịch không tạo thêm Param hay FLOPs cho mạng. 

## Reverse Feature Pyramid

### Pyramid Pathway
Đầu tiên mình sẽ nhắc lại một chút về kiến trúc của FPN truyền thống. FPN có cách thiết kế theo kiểu top - down, tức là thông tin sẽ đi từ mức đặc trưng sâu nhất (feature map nhỏ nhất) mang nhiều ngữ nghĩa đến các tầng lân cận nông hơn theo hướng từ trên xuống dưới như miêu tả ở hình 2a. Giả sử ảnh đầu vào có kích thước $H \times W \times 3$ , gọi $C_i$ và $P_i$ là feature map ở mức thứ $i$ của backbone và đầu ra của feature pyramid thứ $i$ tương ứng với kích thước là $\frac{H}{2^{i+1}} \times \frac{W}{2^{i+1}}$. Đầu ra $P_i$ của FPN được tính như sau:
$$P _ { i } = f _ { i } \left ( C _ { i } , P _ { i + 1 } \right )$$
Khối RevFP sẽ không đi theo hướng top-down mà đi theo hướng ngược lại, tức là bottom-up, đồng thời có thêm một nhánh top-down cục bộ giữa hai feature map gần nhau. Điều này sẽ tạo nên flow 2 chiều cho khối, hơn nữa còn có thể tận dụng cùng lúc đặc trưng biểu diễn ở bậc cao và bậc thấp. Phép fusion đặc trưng của RevFP được biểu diễn như sau:
$$P _ { i } = f _ { i } ( C _ { i } , C _ { i + 1 } , P _ { i - 1 } ) ,$$
### Feature-guided upsampling
Thông thường thì để fuse feature ở 2 mức với nhau, ta sẽ cần upsample feature nhỏ hơn, có độ phân giải thô hơn lên 2 lần trước khi thực hiện các phép fusion phía sau. Các đặc trưng ở mức thấp thường rất giàu thông tin vị trí, trong khi đó đặc trưng ở mức cao lại thiên về thông tin ngữ nghĩa. Từ ý tưởng này, các tác giả đã đề xuất phép upsampling nhưng kết hợp thêm thông tin vị trí đến từ feature ở mức thấp từ đó dẫn dắt quá trình upsampling tạo ra các feature map chính xác hơn. Đầu tiên, feature map $C_{i+1}$ sẽ được upsampling lên 2 lần sau đó concat với feature map $C_{i}$ để tổng hợp thông tin 2 mức feature rồi đưa qua 1 lớp $Conv3\times3$ để giảm số channel về 1 rồi thực hiện chuẩn hóa với softmax để tạo weight attention. Weight sẽ được nhân với $\frac { T } { \sqrt { d _ { i } } }$ để quá trình huấn luyện ổn định hơn, trong đó $T$ là một hằng số và $d_i$ là số channel của feature map. Cuối cùng weight này sẽ được nhân với feature map $C_{i+1}$ ban đầu để có thể tạo attention vào các đặc trưng mang thông tin vị trí
### Dynamic Weighted Fusion
Kế thừa ý tưởng của Bi-FPN, RCNet đã cải tiến weighted fusion thành dynamic weighted fusion ứng dụng trong thiết kế kiểu bottom-up của mình. Quá trình dynamic weighted fusion được chia làm 2 giai đoạn : weighted pre-fusion và weighted post-fusion. Nếu như coi $C_i$ là feature map đầu vào ở mức $i$, $C_{i+1}$ là feature map bậc cao đã được feature-guided upsampling bằng kích thước với $C_i$, weighted pre-fusion đầu tiên sẽ áp dụng global average pooling rồi concat 2 feature map lại để bắt được các mối tương quan giữa 2 mức scale. Sau đó $\text{conv} 1 \times 1$ và sigmoid được sử dụng để tạo weight động theo level $\mathcal { W } _ { i } ^ { \prime } \in R ^ { 1 \times 1 \times 1 }$ cho $C_i$ và $1 -\mathcal { W } _ { i } ^ { \prime }$ cho $C_{i+1}$. Quá trình trên được biểu diễn như sau:
$$P _ { i } ^ { \prime } = C o n v \left ( \mathcal { W } _ { i } ^ { \prime } * C _ { i } + \left ( 1 - \mathcal { W } _ { i } ^ { \prime } \right ) * C _ { i + 1 } \right ) $$
Trong đó $Conv$ là hàm $\text{Conv} \  3 \times 3$. Quá trình post-fusion cũng thực hiện tương tự :
$$P _ { i }= C o n v \left ( \mathcal { W } _ { i } ^ { \prime } * P _ { i } ^ { \prime } + \left ( 1 - \mathcal { W } _ { i } ^ { \prime } \right ) * P _ { i - 1 } \right ) $$

## CROSS-SCALE SHIFT NETWORK
![](https://images.viblo.asia/8df68320-3ed5-4a70-9285-dfa575b67e86.png)
<div align="center"><b>Hình 4. Cross-scale shift Network</b></div>

> Feature sau khi được tăng cường thông tin qua khối RevFP $\{ P _ { i } \quad | i = l _ { \min } \cdots , l _ { \max } \}$ sẽ đi qua khối CSN. Khối này gồm 2 module : multi-scale shift và dual global context.

### Multi-scale Shift Module
![image.png](https://images.viblo.asia/cb9a39c5-9b66-4667-a3a6-69df89695c98.png)
<div align="center"><b>Hình 5. Multi-scale Shift Module</b></div>

Gọi feature từ RevFP là  $\{ P _ { i } \quad | i = l _ { \min } \cdots , l _ { \max } \}$. Đầu tiên ta sẽ tính $P^{-2} , P^{-1}, P^{0}, P^{+1}, P^{+2}$ bằng cách dịch trái, phải 0, 1, 2 theo mức scale, sau đó nhân với chuỗi trọng số $W = \{ W _ { i } \ |\ i = 1 , \cdots , 5 \}$ và tính tổng : 
$$Y = \sum _ { j = 1 } ^ { 5 } W _ { j } * P ^ { j - 3 } .$$
Y có thể được chia thành $\{ Y _ { i } | i = l _ { m i n } \cdots , l _ { m a x } \} ,$ với $Y_i$ được tính như sau:
$$Y _ { i } = \sum _ { j = 1 } ^ { 5 } W _ { j } * P _ { i + j - 3 } .$$
Quá trình này có thể coi là tích chập với kernel 5 và padding theo chiều của scale. Trong đó, người ta sẽ dịch 1 phần của feature channel với tỉ lệ $r= \frac{1}{4}$ cho kết quả tốt nhất và residual connection để giảm tác động xấu của sự dịch chuyển dữ liệu. Hơn nữa, những kênh dữ liệu đã dịch sẽ được concat lại để lưu giữ thông tin tại những kênh đó. Ngoài ra để tổng hợp thông tin nhiều mức cũng như giảm số kênh thì tác giả có sử dụng $Conv \ 1\times 1$
### Dual Global Context
Để tạo mối tương quan mạnh hơn cho các khối đặc trưng đã được dịch ở trước đó, nhóm tác giả tiến hành tích hợp khai thác thông tin ngữ cảnh bằng cách thêm vào Dual Global Context Module. Module này gồm 2 nhánh : scale context branch và spatial context branch. Scale branch được tạo bằng cách nén các mức feature lại với phép squeeze sau đó áp dụng $conv \ 1\times1$ để lấy thông tin theo channel của các mức rồi đưa qua Softmax để tạo weight  rồi nhân với feature lúc chưa squeeze. Cuối cùng nó được average pooling theo chiều scale và đưa qua $conv \ 1\times1$. Spatial context branch cũng tương tự như vậy, chỉ khác thứ tự đổi từ spatial pooling, channel context fusion, scale pooling sang scale pooling, channel context fusion, spatial pooling.

# Kết quả
Tác giả sử dụng backbone ResNet-50 cho thí nghiệm 1-stage và 2-stage object detector để kiểm chứng hiệu quả của mô hình. 1-stage detector sử dụng RetinaNet kết hợp với các baseline khá mạnh như: ATSS và GFL
![image.png](https://images.viblo.asia/d53bb71b-57e8-4b6d-b060-428b3d0881a0.png)
<div align="center"><b>Bảng 2. Kết quả test với tập  COCO val2017 trên multi - stage và single - stage</b></div>
Có thể thấy ở  bảng trên rằng RCNet làm tăng performance của anchor-based model RetinaNet lên khá nhiều : 3.7 AP. Hơn nữa RCNet còn vượt qua baseline với khoảng cách khá lớn trên state-of-the-art one-stage detectors, cụ thể là 42.6 và 43.1 AP trên ATSS and GFL. RCNet cũng đạt kết quả khả quan với multi-stage khi cải thiện 1.5 mask AP với Mask R-CNN

![image.png](https://images.viblo.asia/1f5fd89e-ef31-40d4-8929-56885b5da5cd.png)
<div align="center"><b>Bảng 3. Kết quả test với tập  COCO val2017 với các cách feature fusion khác nhau</b></div>
Bảng trên cho thấy kết quả so sánh giữa RevFP với các biến thể FPN khác, cụ thể là FPN, PANet, PConv, AugFPN, BFP, NAS-FPN and BiFPN. RCNet cho kết quả vượt trội hơn so với các biến thể của FPN đồng thời có số Params khá khiêm tốn.
    
![image.png](https://images.viblo.asia/f4d07e60-5bdc-4006-b97b-a62ba98336ce.png)
<div align="center"><b>Bảng 4. Kết quả test với tập  COCO test-dev khi so sánh với các state-of-the-art</b></div>
Với backbone ResNeXt-101 và DCN, RCNet cho kết quả tốt nhất với 52.9 AP khi sử dụng ulti-scale testing strategy.  

# Kết luận
Paper được tác giả viết khá công phu, vẫn còn nhiều điều trong paper mà mình chưa kịp nói đến. Để hiểu rõ hơn thì có lẽ bạn đọc nên tìm hiểu thêm bản gốc của paper được để link ở phần tham khảo. Kết quả cuối cùng cho thấy RCNet có thể đẩy hiệu năng của detection với baseline lên khá cao, thậm chí đạt state-of-the-art mà không làm tăng chi phí tính toán và độ phức tạp thuật toán quá nhiều. Bài viết đến đây cũng đã dài, trong quá trình đọc có thấy sai sót mong mọi người tích cực góp ý để mình cải thiện hơn ở các bài viết sau.

# Reference
[1] Zhuofan Zong, Qianggang Cao, Biao Leng:
RCNet: Reverse Feature Pyramid and Cross-scale Shift Network for Object Detection. ACM Multimedia 2021: 5637-5645
https://arxiv.org/pdf/2110.12130.pdf  
[2] Tsung-Yi Lin, Piotr Dollár, Ross B. Girshick, Kaiming He, Bharath Hariharan, Serge J. Belongie:
Feature Pyramid Networks for Object Detection. CVPR 2017: 936-944 https://arxiv.org/pdf/1612.03144.pdf