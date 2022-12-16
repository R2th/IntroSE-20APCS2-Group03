**Source paper**: https://arxiv.org/pdf/2104.09874.pdf

# Giới thiệu
Tiếp nối về bài viết [[Paper Explain] EFFICIENT MASKED FACE RECOGNITION METHOD DURING THECOVID-19 PANDEMIC](https://viblo.asia/p/paper-explain-efficient-masked-face-recognition-method-during-thecovid-19-pandemic-aWj53z8bl6m), hôm nay mình sẽ gửi tới các bạn 1 bài Paper Explain khác cũng cùng chủ đề là Masked face recognition.

Ý tưởng chính của paper này là dựa trên hoạt động của ArcFace, với một số chỉnh sửa trong backbone và loss function. Từ tập dữ liệu ảnh khuôn mặt ban đầu, ta sẽ tạo ra một tập dữ liệu nữa với việc tạo thêm mask vào ảnh, cả 2 tập dữ liệu này được kết hợp và đưa vào trong quá trình đào tạo.

Theo như bài báo, kết quả thử nghiệm cho thấy các cairt tiến đã năng cao độ chính xác của mô hình ban đầu khi xử lý các ảnh có khuôn mặt bị che, trong khi vẫn giữ được độ chính xác đối với tập dữ liệu ảnh không bị che ban đầu.

# Nội dung
Theo bài báo, mình sẽ phân làm 2 nội dung chính
* Xác định vấn đề
* Dataset sử dụng 
* Training pipeline 
* Kết quả thu được
## 1. Xác định vấn đề
Chắc hẳn không cần đi quá sâu các bạn cũng biết bài toán phân loại người đeo khẩu trang hay không là không quá phức tạp (cao hơn là cả thêm trường đeo sai cách nữa). Còn đối với bài toán nhận diện khi người đó có thể có hoặc không đeo khẩu trang là một bài toán tương đối nan giải, nó thật sự được quan tâm mạnh mẽ khi dịch Covid-19 bùng nổ.

Các mô hình về nhận diện khuôn mặt thời điểm hiện tại là tương đối tốt với độ chính xác cao (đâu đó mình nhớ không nhầm cũng ~99% rồi).

Tuy nhiên nếu sử dụng mô hình đó đối với tập dữ liệu pha trộn đeo mặt nạ và không đeo, thì chắc chắn hiệu suất sẽ giảm đáng kể.

Mục tiêu của paper này, tác giả hướng tới việc tăng độ chính xác mô hình đối với nhận diện khuôn mặt bị che (masked), đồng thời vẫn phải bào toàn được càng nhiều càng tốt độ chính xác ban đầu với dữ liệu khuôn mặt không bị che (non-masked)

Để đạt được điều này, mạng trước hết cần tìm hiểu xem đối tượng là masked hay non-masked để quyết định xem đặc điểm nào trên khuôn mặt có thể tin cậy cho quá trình phân loại. Tác giải đã có những chỉnh sửa nhất định để mạng ngoài việc phân loại khuông mặt thì đồng thời kiêm luôn đưa ra xác suất người này có đeo mặt nạ hay không (phần nhận dạng có đeo hay không là bắt buộc tỏng mô hình này, nên là một công đôi việc ấy mà :>)

## 2. Dataset sử dụng
* MS1MV2 (5.8M ảnh của 85.000 đối tượng)
* Sử dụng tool [MaskTheFace](https://arxiv.org/pdf/2008.11104.pdf) để sinh hình khẩu trang trên ảnh kết hợp với MS1MV2 dataset
* Với tool MaskThe Face, có rất nhiều kiểu khẩu trang như N95, KN95, khẩu trang y tế chúng ta hay đeo, … với xác suất mỗi loại khẩu trang được chọn là 50% về màu và 50% về áp dụng random texture
 
![image.png](https://images.viblo.asia/aa51506e-d8fe-4fe0-89ac-7104b929f299.png)
## 3. Training pipeline
  ![image.png](https://images.viblo.asia/b5311e71-3b66-4398-9ed7-bed6105e4da0.png)
 
Sau khi sử dụng tool để thêm ngẫu nhiên mask vào ảnh, 2 tập dữ liệu này sẽ được sử dụng cho quá trình training bằng cách chúng được xáo trộn để đảm bảo tính công bằng, sau đó với mỗi khuôn mặt được lấy từ input batch, ảnh sẽ được đưa vào là mask hoặc non-mask với xác suất 50-50

Tác giải sử dụng ArcFace là baseline network bởi 2 lý do:
* Nó sử dụng phương pháp dựa trên softmax-loss, không yêu cầu giai đoạn chuẩn bị dữ liệu đầy đủ (exhaustive training-datapreparation stage) 
* Nó được chứng mình là phương pháp báo cáo kết quả tốt nhất cho nhiệm vụ nhận dạng khuôn mặt

Tác giải sử dụng LResNET-50 làm backbone vì nó là kiến trúc “best trade-off” giữa độ chính xác và số lượng tham số. Về source code của LRestNet-50 triển khai trên Tensorflow, các bạn có thể tham khảo [tại đây](https://github.com/dmonterom/face_recognition_TF2) 

Với đầu ra của LRestNet, ngày sau dropout layer, ngoài việc tạo ra feature vector bằng Dense layer, tác giải còn tạo ra thêm 1 dense layer mới gồm 2 số thực sẽ là xác xuất của masked và non-masked (bài toán phân loại có 2 classed thì thường sẽ sử dụng dense layer với số chiều 2). Bằng cách này, mô hình sẽ học khi nào là masked và non-masked, thông tin này cũng hữu ích trong việc bổ trợ cho feature vector
![image.png](https://images.viblo.asia/88c4f7d0-b472-43bd-b7c9-8661a0568e97.png)

Có thể thấy lúc này, mô hình sẽ tạo ra 2 outputs, 1 cho việc sinh ra feature vector (tạo ra logits ArcFace), 1 cho việc nhận biết masked và non-masked (tạo ra logits Mask), tương ứng với nó sẽ là 2 hàm loss tương ứng:

![image.png](https://images.viblo.asia/adfc7b63-85ed-42d4-86cb-ff498a84b4c6.png)

![image.png](https://images.viblo.asia/f3c76994-409b-4d81-95f1-86f25a152a7f.png)

 
Theo dõi hình vẽ về mô hình như trên, bạn có thể thấy tác giả sử dụng 1 hàm Loss function duy nhất, vậy đó là hàm nào?  Cái tên gọi MTArcFace ra đời (Multi-Task ArcFace) là việc kết hợp 2 hàm loss bên trên làm 1. Tuy nhiên để làm giảm sự quan trọng của loss Mask đối với tổng thể hàm loss, tác giải sử dụng thêm logarit để mục đích này, đồng thời tham số 1.0 để tránh giá trị bên trong hàm log bị âm

![image.png](https://images.viblo.asia/14dc9f21-fd84-4f80-927c-ceb64c537d86.png)
 
Cuối cùng tác giả thêm regularization loss (như quá trình triển khai ban đầu) để tính toán loss sẽ được sử dụng cho việc optimization:

 ![image.png](https://images.viblo.asia/1f2e6c87-5c45-43d2-a8aa-0e79514e1de8.png)

## 4. Kết quả
Theo paper, cấu hình sử dụng training: 2 Tesla V100 GPUs, batch size=512, 300k steps, SGD optimizer, momentum=0.9, learning rate=0.0015. 
Kết quả huấn luyện mô hình như sau 
 
 ![image.png](https://images.viblo.asia/f303db5b-16c4-4f89-b9b0-e2cd781fb256.png)
 
Kết quả đánh giá trên tập gộp cả 2 tâp masked và non-masked với threshold = 0.5

![image.png](https://images.viblo.asia/ef2d31dc-87fd-4ff2-959c-b283a1be0da6.png)