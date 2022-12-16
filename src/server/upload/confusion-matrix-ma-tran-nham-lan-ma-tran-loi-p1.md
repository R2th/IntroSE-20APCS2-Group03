**Confusion Matrix** ma trận nhầm lẫn hay ma trận lỗi là một bố cục bảng cụ thể cho phép hình dung hiệu suất của một thuật toán.<br> <br>
 **Ma trận nhầm lẫn** là một trong những kỹ thuật đo lường hiệu suất phổ biến nhất và được sử dụng rộng rãi cho các mô hình phân loại. Nhìn thuât ngữ của nó thì trông có vẻ khó hiểu nhưng thực tế nó lại rất dễ hiểu. Do đó, bài viết này có thể giúp nó trở lên dễ hình dung, dễ hiểu hơn.<br><br>
 **Xét ví dụ thực tế** : Vào ngày 16/04/2021 tại bệnh viện A có 100 bệnh nhân đến khám một loại bệnh, giả sử biết trước trong 100 bệnh nhân có 60 người mắc bệnh, 40 người không có bênh. Sau khi thăm khám, bệnh viện đưa ra kết quả: 
*   Trong 60 người bệnh thật thì có 45 người chuẩn đoán có bệnh, 15 người chuẩn đoán không mắc bệnh.
*   Trong 40 người không mắc bệnh thì có 30 người chuẩn đoán không mắc bệnh, 10 người chuẩn đoán là mắc bệnh.<br><br>

    ![](https://images.viblo.asia/12e9d40a-7dfe-4fef-8fb7-86e5aa5a5a59.png)
<br>

Từ ma trận cơ bản này, ta sẽ có một số thuật ngữ sau:
* <strong>Condition positive (P)</strong>: Tổng số  ca dương tính thực tế.
* <strong>Condition Negative (N</strong>: Tổng số ca âm tính thực tế.
* <strong>True positive (TP)</strong>: Số các ca dự đoán dương tính đúng hay dương tính thật.
* <strong>True negative (TN)</strong>: Số các ca dự đoán âm tính đúng hay âm tính thật.
* <strong>False positive (FP)</strong>: Số các ca dự đoán dương tính sai hay dương tính giả.
* <strong>False negative (FN)</strong>:: Số các ca dự đoán âm tính sai hay âm tính giả.
<br><br>

Với các thuật ngữ trên, ta có các chỉ số đánh giá sau:
* **Độ chính xác** – **Accuracy**:<br>![image.png](https://images.viblo.asia/ec22619f-e02e-4de0-a889-49be1c1ae67f.png)
* Sensitivity, **Recall**, Hit Rate, Or True Positive Rate (TPR): **Độ nhạy - Tỷ lệ dương tính thực**:<br>![image.png](https://images.viblo.asia/7ca9a4ba-d24a-4924-b1b6-d750fe4c181c.png)
* **Precision** Or Positive Predictive Value (PPV): **Tỉ lệ dương tính đoán đúng**<br>![image.png](https://images.viblo.asia/737e6efb-5680-432a-8d6c-46671788264c.png)
* **NegativePredictive Value**  (NPV): **Tỉ lê âm tính đoán đúng**
<br>![image.png](https://images.viblo.asia/00923d59-5097-4e85-9c89-44cf0f9c7d78.png)
* **Miss Rate** Or False Negative Rate (FNR): **Tỉ lệ dương tính giả**<br>
![image.png](https://images.viblo.asia/f10a0695-12e1-4490-96d4-e89a4f588e25.png)
* **Fall-Out**  Or  False Positive Rate (FPR): Tỉ lệ âm tính giả
<br>![image.png](https://images.viblo.asia/3d37dbc0-a91d-4fcb-9e96-d1d35ca3820c.png)
*  False Discovery Rate(FDR): **Tỉ lệ đoán dương tính sai**<br>
![image.png](https://images.viblo.asia/06d62868-776d-468f-bbe6-c0abf811c17e.png)
*  False Omission Rate (FOR): **Tỉ lệ đoán âm tính sai**
<br>![image.png](https://images.viblo.asia/32e1f2e4-cf9e-454f-a5f5-daf39e18d63d.png)
*  **F1 score - Điểm F1**: Điểm F1 là một trung bình hài hòa **Precision** và **Recall**.<br>
![image.png](https://images.viblo.asia/268bb23f-5c80-49e1-93f1-cb7815846542.png)
*  Và còn một số thông số khác nữa, bạn có thể tìm hiểu chi tiết
[:Tại đây](https://en.wikipedia.org/wiki/Confusion_matrix)
<br><br>

**Kết luận:** Với mỗi bài toán thì tùy vào mục đích và độ ưu tiên kết quả về mặt dương tính hay âm tính ta sẽ sử dụng những chỉ số khác nhau. Tuy nhiên thì ta sẽ hay dùng Accuracy như một chỉ số đánh giá tổng quát cho mô hình.
<br>
**PS:** Mình cũng mới viết bài nên sẽ còn nhiều sai sót, mong mọi người góp ý, bỏ qua cho mình nhé.