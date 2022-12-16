# Mở đầu

Ở bài viết lần trước, mình đã trình bày về YOLOv1: Lý do tại sao YOLO lại ra đời, đồng thời phân tích ý tưởng chính và hàm Loss của YOLOv1. Tiếp tục với series phân tích YOLO, lần này mình sẽ trình bày về 2 phiên bản khác trong họ nhà YOLO, cụ thể là YOLOv2 và YOLOv3. Mình sẽ tập trung phân tích về kiến trúc mạng, những thay đổi trong quá trình training, cách sử dụng Anchor Box cũng như là hàm Loss và so sánh các phiên bản YOLO với nhau.   
Các bạn có thể đọc phần 1 của series này ở đây: https://viblo.asia/p/tong-hop-kien-thuc-tu-yolov1-den-yolov5-phan-1-naQZRRj0Zvx
# YOLOv2
Sau khi error analysis cho YOLOv1, nhóm tác giả nhận thấy rằng YOLOv1 gặp vấn đề về localization khá nhiều (Bounding Box không tốt), hơn nữa, Recall của YOLOv1 cũng khá là thấp (Phát hiện được ít vật thể), đã đề cập đến ở phần 1 của series. Vì vậy, trong YOLOv2 nhóm tác giả tập trung vào cải thiện 2 vấn đề này mà vẫn giữ được độ chính xác tốt.

### Kiến trúc mạng
![image.png](https://images.viblo.asia/18e51a23-800e-4203-ad7c-2048766e3a65.png)  

**Darknet-19**. Kiến trúc mạng của YOLOv2 được thể hiện ở bảng 1, được gọi là Darknet-19 vì có 19 lớp Convolution (Conv). Phần này mình sẽ nói về những thay đổi trong kiến trúc cũng như là cách training của YOLOv2.  
**Batch Norm**. Kiến trúc của YOLOv2 đã được thêm vào đó những lớp BatchNorm để việc training nhanh hơn và ổn định hơn. Với việc thêm vào BatchNorm, DropOut được loại bỏ khỏi model mà không sợ bị overfitting.  
**High-res Classifier**. Backbone của YOLOv2 được pretrained trên ImageNet. Trong YOLOv1, backbone được train trên ImageNet với kích thước ảnh $224 \times 224$, lúc train detection với toàn bộ model thì lại sử dụng kích thước ảnh $448 \times 448$. Việc chuyển đột ngột như vậy khiến model phải vừa học Object Detection lại còn vừa phải thích ứng với kích thước ảnh mới. Vì vậy, trong YOLOv2, backbone trước tiên được finetune trên ImageNet với kích thước ảnh $448 \times 448$ trong vòng 10 epochs, rồi mới chuyển sang dạng Object Detection.  
![image.png](https://images.viblo.asia/81711460-2b8d-4372-bc6f-0a92f916b10b.png)  
**Fine-grained Features**. Thay vì predict trên $7 \times 7$ grid feature map như YOLOv1 thì YOLOv2 predict trên một $13 \times 13$ grid feature map, việc này sẽ khiến YOLOv2 predict những object nhỏ tốt hơn. Hơn nữa, YOLOv2 cũng sử dụng một skip-connection để kết hợp thông tin từ feature map ở layer trước đó vào feature map cuối (Hình 1).  
**Multi-scale training**. Trước đó, YOLOv2 chỉ train với kích thước ảnh $448 \times 448$. Sau khi áp dụng Anchor Box (sẽ nói ở phần sau), YOLO đổi kích thước ảnh thành $416 \times 416$. Tuy nhiên, YOLOv2 muốn model có thể detect tốt với nhiều kích thước ảnh khác nhau, vì vậy, cứ mỗi 10 batches, YOLOv2 lại thay đổi kích thước ảnh đầu vào một lần. Sở dĩ điều này có thể thực hiện được vì kiến trúc mạng của YOLOv2 hoàn toàn tạo từ các lớp Conv và có hệ số suy giảm là 32. Do đó, kích thước ảnh đầu vào của YOLOv2 thay đổi với kích thước là bội số của 32, được lấy trong khoảng $\{320, 352,...,608\}$. 

### Những thay đổi khác
**Áp dụng Anchor Box**. Trong YOLOv2, tác giả áp dụng Anchor Box được sử dụng trong Faster R-CNN. Lúc này, kích thước ảnh đầu vào được chuyển từ $448 \times 448$ thành $416 \times 416$ vì tác giả muốn feature map thu được ở lớp cuối cùng là số lẻ (với kích thước ảnh $448 \times 448$ thì feature map ở lớp cuối là $14 \times 14$) để luôn có một ô trung tâm của feature map. Ý tưởng này đến từ việc các ảnh trong dataset COCO thường có một vật ở giữa ảnh, vì vậy, việc có một ô trung tâm của feature map để Anchor Box có thể dễ dàng lấy được luôn vật đó. Sử dụng Anchor Box, YOLOv2 bị giảm đi 0.3 mAP nhưng bù lại, Recall tăng lên. Tức là việc sử dụng Anchor Box khiến YOLOv2 phát hiện được nhiều vật thể hơn, nhưng bù lại, khả năng phát hiện chính xác lại kém đi.   
Trong các mô hình 2 pha (họ nhà R-CNN), việc Anchor Box hoạt động rất tốt vì pha thứ nhất đã bao gồm việc tối ưu vị trí cho Bounding Box từ Anchor Box, còn trong YOLO thì không có. Do vậy, việc có các Anchor Box đẹp được sinh ra ngay từ lúc đầu khá là quan trọng. YOLOv2 đã thêm vào bước chọn các chỉ số cho Anchor Box được sinh ra ngay từ lúc đầu thông qua thuật toán k-means.  
Thêm vào đó, việc tối ưu vị trí Bounding Box từ Anchor Box sinh ra được sử dụng trong Faster R-CNN đó chính là: model sẽ dự đoán độ dịch chuyển của Anchor Box gọi là $t_x, t_y$ để suy ra vị trí của tâm Bounding Box $x, y$ thông qua một công thức biến đổi. 
YOLOv2 nhận thấy việc này là không phù hợp, nên đã thêm vào một số giới hạn. YOLOv2 cũng vẫn dự đoán độ dịch chuyển $t_x, t_y, t_w, t_h$ và Objectness Score $t_o$, nhưng, lúc này, $t_x, t_y$ bị giới hạn giá trị của chúng trong khoảng $[0, 1]$, việc này giới hạn vị trí tâm $x, y$ của Bounding Box khi thực hiện phép biến đổi với $t_x, t_y$, tức là khi predict $t_x, t_y$ tại một grid cell sẽ không khiến cho tâm $x, y$ bị ra ngoài grid cell đó. Nếu vẫn còn khó hiểu, các bạn có thể xem Hình 2 để hiểu rõ hơn công thức giới hạn được áp dụng cho $t_x, t_y$ của YOLOv2. Nếu vẫn chưa hiểu, hãy đọc tiếp đến YOLOv3 bên dưới. 
![image.png](https://images.viblo.asia/b2e0a905-c7f9-4f3b-a47b-6fda0446a705.png)

### Tổng kết
Những cải tiến của YOLOv2 bao gồm 2 phần chính:
- Sử dụng một kiến trúc mạng mới và cách training mới.
- Áp dụng và thay đổi Anchor Box cho phù hợp.

# YOLOv3
YOLOv3 là một bản nâng cấp đáng giá của YOLOv2 đồng thời giải thích những gì còn chưa rõ của YOLOv2
### Kiến trúc mạng
**Backbone**. YOLOv3 xây dựng một backbone mới, gọi là Darknet-53. Backbone của YOLOv1 thì sử dụng $1 \times 1$ Convolution (gọi là Bottleneck) của Inception Network, lên YOLOv2 thì áp dụng thêm BatchNorm, sang YOLOv3 thì áp dụng thêm skip-connection từ ResNet, gọi là một Residual Block (Bảng 2).  

![image.png](https://images.viblo.asia/fc4070db-f7c6-4468-ba7c-258fb0771176.png)  

**Neck**. Từ các phiên bản YOLO trước, phát hiện vật thể nhỏ luôn là một điểm yếu. Dù trong YOLOv2 đã sử dụng skip-connection từ layer trước đó để đưa thông tin từ feature map có kích thước lớn hơn vào feature map đằng sau, nhưng điều đó là không đủ. YOLOv3 là một sự nâng cấp cho vấn đề này, áp dụng Feature Pyramid Network, thực hiện phát hiện object ở 3 scale khác nhau của feature map (Hình 3).  
![image.png](https://images.viblo.asia/154c3d46-b21e-4eb4-8031-142138c341a8.png)   

Thật ra lúc đầu nhìn hình kiến trúc bên trên thì mình vẫn chưa hiểu cái Feature Pyramid Network của nó lắm, nên là mình có làm thêm một cái hình bên dưới để mọi người dễ hình dung hơn.   

![image.png](https://images.viblo.asia/cba150e8-cced-4352-b3e3-7c4587751f84.png)

### Những thay đổi khác
Xét một grid cell trong feature map, vector dự đoán của YOLO sẽ dự đoán $t_x, t_y, t_w, t_h, t_o, \hat{y_1}, ..., \hat{y_C}$ với $C$ là tổng số class.  
**Classification prediction**. Các phiên bản YOLO trước sử dụng hàm *softmax* ở output của classification. Nhưng từ YOLOv3, output của classification được chuyển thành *sigmoid*. Điều này là vì với một số dataset, ví dụ như Open Images Dataset, có một số object sẽ được phân tới tận 2 class (class person và class woman).  
**Bounding Box prediction**. Giữ nguyên ý tưởng Anchor Box với k-means từ YOLOv2, YOLOv3 làm rõ cách chọn Anchor Box của mình. Ở một grid cell trong feature map, YOLOv3 tạo ra 9 Anchor Box (YOLOv2 là 5), cứ mỗi 3 Anchor Box sẽ thuộc về một scale. Ở YOLOv2 có nhắc đến hàm biến đổi để biến đổi Anchor Box được tạo ra thành Bounding Box cho object. Mình sẽ làm rõ công thức đấy ở đây.  
Gọi 4 giá trị dịch chuyển mà YOLOv3 predict ra là $t_x, t_y, t_w, t_h$. Như đã nói ở trên, YOLOv2 giới hạn $t_x, t_y$ ở trong khoảng $[0,1]$, việc giới hạn này được áp dụng sử dụng hàm *sigmoid* $\sigma$. Xét một grid cell ($c_x, c_y$) trong feature map, Anchor Box được sinh ra có chiều dài, chiều rộng là ($p_w, p_h$), với các giá trị dự đoán $t_x, t_y, t_w, t_h$, công thức biến đổi có dạng:  
![image.png](https://images.viblo.asia/28983e39-248f-42eb-a9b2-b02439ce34e8.png)  
với $(b_x, b_y)$ là tâm của Bounding Box, $(b_w, b_h)$ là chiều dài, chiều rộng của Bounding Box. Nếu các bạn chưa hiểu tại sao chúng ta phải giới hạn $t_x, t_y$ thì một lần nữa hãy nhìn lại Hình 2 ở trên. Với $c_x = 0$ và $c_y=1$, nếu không giới hạn thì $t_x + c_x$ sẽ khiến tâm $b_x$ của Bounding Box vượt ra ngoài cái grid cell $c_x=0, c_y=1$ đó, sang hẳn grid cell $c_x=1, c_y=1$.  
**Loss function**. Loss function của YOLOv3 khá là khác so với các phiên bản YOLO trước nhưng lại không hề được đề cập đến trong paper. Mình khuyến khích nên so sánh với Loss function của YOLOv1 mình đã viết tại [đây](https://viblo.asia/p/tong-hop-kien-thuc-tu-yolov1-den-yolov5-phan-1-naQZRRj0Zvx#_loss-function-4) để có thể dễ dàng hiểu được các sự thay đổi.  
![image.png](https://images.viblo.asia/60b8398e-3c68-4d87-8a24-34629208e0cc.png)  
Xét Classification Loss, với việc áp dụng *sigmoid* trong classification, Classification Loss của YOLOv3 sẽ áp dụng Binary Cross Entropy chứ không còn là squared loss nữa. Tiếp tục thực hiện chia nhỏ hàm loss này cho dễ hiểu nhé. Xét một grid cell có tồn tại object, lặp qua $C$ giá trị trong vector Classification, tính BCE Loss giữa classification target $y_k$ và classification prediction $\hat{y}_k$. Xét toàn bộ Anchor Box ($\sum^B_{j=0}$) ở trên toàn bộ grid cell ($\sum^{S^2}_{i=0}$), ta sẽ có được công thức của Classification Loss như trên.  
![image.png](https://images.viblo.asia/265bbc46-eba6-4d08-b973-5c72bb9d6534.png)  
Xét Confidence Loss, ta có thể thấy thay vì là squared loss như YOLOv1, YOLOv3 đã áp dụng Binary Cross Entropy Loss. Nhưng không chỉ mỗi hàm loss là thay đổi, cả Confidence target cũng thay đổi. Confidence target trong YOLOv1 là IoU score giữa Bounding Box được dự đoán và ground truth Bounding Box, còn trong YOLOv3, confidence target $=1$ nếu IoU score giữa một Anchor Box trong số 9 Anchor Box sinh ra với ground truth Bounding Box là lớn nhất, và được đưa vào vế trên của Confidence Loss để tính. Với những Anchor Box mà có IoU score giữa chúng với ground truth Bounding Box nhỏ hơn một threshold là $0.5$ thì chúng sẽ được đưa vào đưa vào vế dưới của Confidence Loss. Còn những Anchor Box mà có IoU score lớn hơn threshold $0.5$ nhưng lại không phải là Anchor Box được chọn ở trong vế trên thì chúng sẽ không được đưa vào hàm loss.  
![image.png](https://images.viblo.asia/f1260f08-bf11-4b2b-8f43-354731993d2a.png)  
Còn Regresion Loss thì gần như tương đương, chỉ bỏ đi căn bậc 2 khi ở phần chiều dài và chiều rộng.  
### Tổng kết
Những cải tiến của YOLOv3 bao gồm: 
- Một backbone mới: kết hợp skip-connection vào trong backbone, tăng số lớp Convolution lên. 
- Thêm Feature Pyramid Network, thực hiện predict tại 3 scale
- Hàm loss mới 
# Kết
Bài này đã trình bày hiểu biết của mình về YOLOv2 và YOLOv3, đồng thời so sánh chúng với nhau để các bạn có thể thấy được sự khác biệt. Nếu có gì sai sót, mong mọi người có thể góp ý cho mình.