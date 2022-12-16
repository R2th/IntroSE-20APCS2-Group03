# Giới thiệu về mạng Faster R-CNN
1.    Faster R-CNN là mô hình tốt nhất của họ nhà R-CNN, được công bố đầu tiên vào năm 2015. Phiên bản đầu tiên của Faster R-CNN là R-CNN, với nguyên lí đơn giản. ( Bài này mình sẽ không đi sâu tìm hiểu về R-CNN,bạn đọc có thể tham khảo [ở đây.](https://towardsdatascience.com/r-cnn-3a9beddfd55a) )
2.    Trong các bài báo của các mạng họ R-CNN, sự phát triển giữa các phiên bản dựa vào hiệu năng tính toán (tích hợp các giai đoạn đào tạo khác nhau), giảm thời gian thử nghiệm và cải thiện hiệu suất (mAP). Các mạng này thường bao gồm- a) Một thuật toán để tìm ra các "bouding box"  hoặc các vị trí của đối tượng có thể có trong ảnh. b) Giai đoạn lấy ra các đặc trưng của đối tượng này, thường sử dụng mạng CNN. c) Một lớp phân loại để dự đoán lớp này thuộc đối tường nào và d) Một lớp hồi quy để làm các tọa độ của "bouding box" giới hạn đối tượng chính xác hơn.
# Mô hình Faster R-CNN
![](https://images.viblo.asia/46605fcf-2c8a-4e84-87e9-002ded440691.jpeg)

Faster R-CNN kết hợp 2 modules.Module thứ 1 là sử dụng DNN để đề xuất ra các vùng và module thứ 2 là mô hình Fast R-CNN sử dụng các vùng được đề xuất ra.Mình sẽ đi lần lượt các module, bắt đầu với RPN nhé.
### Region proposal network(RPN)
![](https://images.viblo.asia/32d3da12-9344-4804-8c66-e2fa66a42562.jpeg)

   RPN là sự cải tiến chính làm cho mạng Faster R-CNN trở nên tốt nhất trong họ nhà R-CNN, RPN giải quyết các vấn đề bằng cách huấn luyện mạng neural network để đảm nhận thay vai trò của các thuật toán như selective search vốn rất chậm chạp.

   Một Region Proposal Network nhận đầu vào là ảnh với kích thước bất kì và cho đầu ra là region proposal (tập vị trí của các hình chữ nhật có thể chứa vật thể), cùng với xác suất chứa vật thể của hình chữ nhật tương ứng.
#### Cấu trúc
   RPN có 2 bước chính:
1.    Feed forward ảnh qua DNN để thu được convolutional features:

        Ở đây , ta có thể sử dụng các mạng backbone có sẵn như VGG-16, resnet50,
        ![](https://images.viblo.asia/9dc351b8-6dd3-4da4-b303-348404951334.png)

2.  Sử dụng cửa sổ trượt lên convolutional features:

     Để tạo ra region proposals, chúng ta sử dụng một  cửa sổ trượt còn gọi là sliding window . Đầu ra của layer này là đầu vào của 2 fully-connected layer dự đoán vị trí của regions (box-regression layer), cũng như xác suất chứa object(box-classification) của hộp ấy. 
    ![](https://images.viblo.asia/5a7dea6e-344f-4759-ac88-e5cf0c03875a.png)
    
    source: https://arxiv.org/abs/1506.01497
    
     Tại mỗi vị trí của cửa sổ trượt chúng ta dự đoán đồng thời nhiều nhiều region proposal cùng một lúc, với k là số proposal tương ứng với mỗi vị trí. Vậy reg layer có 4k đầu ra dự đoán vị trí của k proposal, cls layer chứa 2k đầu ra dự đoán xác suất chứa vật thể hoặc không chứa vật thể của mỗi proposal. k proposals được tham chiếu hóa tới k boxes, còn được gọi là **anchor**.
##### Anchor
   Vậy câu hỏi đặt ra là tại sao phải tạo ra các anchors này?Theo mình hiểu thì trong bài toán phát hiện đối tượng trong ảnh thì số lượng đầu ra sẽ khác nhau.Vì vậy ta phải dựa vào anchor để cố định số lượng output.
     
   Các anchors này sẽ được gán mác là positive hoặc negative dựa vào diện tích overlap với ground truth box theo IoU(ở đây mình không nói thêm về IoU, bạn đọc có thể tự tìm hiểu nhé :wink:), anchor nào có IoU so với ground truth lớn hơn 0.7 sẽ là positive, nhỏ hơn 0.3 thì là negative, ở giữa thì vứt đi nhé.
     
   Từ đây ta xác định được tiêu đầu ra của box-regression layer và box-classification được nhắc tới ở phần cấu trúc mạng RPN.

   * Box-classification dự đoán xác suất chứa vật thể của k region proposal, tương ứng với k anchor tại từng vị trí của sliding-window.
   * Box-regression dự đoán khoảng cách tư anchor đến ground truth box tương ứng.          
   ####  Loss Function
 ![](https://images.viblo.asia/1bfde1cd-19b6-40a8-a85d-4086e1b63333.png)
 Với i là index của anchor trong mini-batch và pi là xác suất dự đoán của anchor i là một đối tượng. Giá trị nhãn ground-truth p∗i là một nếu anchor là positive, và là không khi anchor là negative.

* ti là một vector 4 chiều biểu diễn giá trị tọa độ của bounding box đã được dự đoán.
* t∗i là vector 4 chiều biểu diễn giá trị tọa độ của ground-truth box tương ứng với positive anchor.
* Lcls là log loss của 2 class (object và non-object)
* Lreg dùng SmoothL1Loss
### Nhiệm vụ của Fast R-CNN trong Faster R-CNN
Như mình đã nói ở trên, trong mô hình Faster R-CNN, Fast R-CNN sẽ lấy các vùng được đề xuất ra từ RPN để xác định các thực thể tương ứng với anchor.

Faster R-CNN cũng có một mạng backbone CNN, một lớp ROI pooling layer và một lớp kết nối đầy đủ, tiếp đến là 2 nhánh con để thực hiện 2 nhiệm vụ đó là phân lớp cho đối tượng và tìm bounding box tốt nhất dựa vào thuật toán regression.

Bài viết này mình sẽ không đi sâu vào Fast R-CNN, bạn đọc có thể xem chi tiết [ở đây.](https://towardsdatascience.com/fast-r-cnn-for-object-detection-a-technical-summary-a0ff94faa022)
# Lời kết
Mình đã gặp khó khăn rất nhiều khi tìm hiểu lý thuyết cũng như cách huấn luyện mạng Faster RCNN. Bài viết này nhằm chia sẽ những gì mình hiểu được sau quá trình tìm hiểu. Vẫn còn nhiều thiếu sót, mong các bạn góp ý cho mình để mình có thể hoàn thiện bài viết, camxamita :heart_eyes::heart_eyes::heart_eyes:
# Tài liệu tham khảo
1. https://towardsdatascience.com/faster-r-cnn-for-object-detection-a-technical-summary-474c5b857b46
2. https://arxiv.org/abs/1506.01497
3. https://deepmlml.com/rpn-explained.html