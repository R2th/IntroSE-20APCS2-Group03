Chào các bạn, trong bài viết trước chúng ta đã cùng nhau tìm hiểu về cách đánh giá mô hình thông qua độ chính xác, ưu và nhược điểm của metric này, đồng thời ta cũng đã hiểu về "Confusion matrix". Hôm nay ta sẽ tiếp tục tìm hiểu về các metric được tổng hợp từ Confusion matrix giúp cho việc đánh giá mô hình trở nên dễ dàng hơn thậm chí có thể tự động hóa được phần nào! 

## 1. TP/FP/TN/FN:
Với mỗi nhãn, chúng ta có thể cần tới 4 đại lượng để đong đếm mô hình dự đoán tốt như thế nào trên nhãn đó. Cụ thể với nhãn X: 

* TP - True Positive: Đại lượng này cho ta biết số lượng dữ liệu dự đoán đúng trên nhãn X. 
* FP - False Positive: Đại lượng này cho ta biết số lượng dữ liệu được dự đoán là nhãn X nhưng thực tế lại không phải là nhãn X. Trong trường hợp này mô hình của ta sai.
* TN - True Negative: Đại lượng này cho ta biết số lượng dữ liệu được dự đoán không phải nhãn X và thực tế chúng ... không phải là nhãn X. Trong trường hợp này mô hình của ta đúng vì đã không dự đoán là nhãn X.
* FN - False Negative: Đại lượng này cho ta biết số lượng dữ liệu được dự đoán không phải nhãn X nhưng thực tế chúng lại đúng là nhãn X. Trong trường hợp này mô hình của ta sai vì đã không dự đoán là nhãn X.

Trong bảng sau các bạn sẽ dễ hình dung hơn.

```
 Total: 1130 | Predicted | Predicted |
             |    as: X  | as: not X |
-------------|-----------|-----------|
 True: X     |    200    |    100    |
-------------|-----------|-----------|
 True: not X |     30    |    800    |
-------------|-----------|-----------|

```

Cũng như trên Confusion matrix, TP/FP/TN/FN cũng có dạng chưa chuẩn hóa như trên và đã chuẩn hóa như dưới đây: 

```
 Total: 1130 |    Predicted     |     Predicted      |
             |      as: X       |     as: not X      |
-------------|------------------|--------------------|
 True: X     |   200/(200+100)  |    100/(200+100)   |
-------------|------------------|--------------------|
 True: not X |    30/(30+800)   |    800/(30+800)    |
-------------|------------------|--------------------|

```

hay tổng quát: 

```
 Total: 1130 |    Predicted     |     Predicted      |
             |      as: X       |     as: not X      |
-------------|------------------|--------------------|
 True: X     |   TP/(TP+FN)     |    TP/(TP+FN)      |
-------------|------------------|--------------------|
 True: not X |    FP/(FP+TN)    |    TN/(FP+TN)      |
-------------|------------------|--------------------|

```

Trong trường hợp đã được chuẩn hóa, thay vì sử dụng tên gọi TP/FP/TN/FN như trên, ta gọi là TPR/FPR/TNR/FNR - thêm từ Rate vào đuôi các đại lượng.

Như vậy với việc đánh giá mỗi nhãn thông qua 4 đại lượng trên, ta có thể biết khi nào nhãn đó được mô hình dự đoán tốt, có hay bị dự đoán nhầm sang nhãn khác không, có hay đoán thiên về nhãn đó quá không.. Tuy nhiên mỗi nhãn có tới 4 đại lượng, điều này khiến cho việc quyết định mô hình nào tốt hơn vẫn không hề dễ dàng -_-

## 2. Precision & Recall:
Giờ chúng ta sẽ gom 4 đại lượng trên lại thành.. 2 đại lượng để dễ bề quan sát hơn: 

$$
Precision = \frac{TP}{TP + FP} 
$$
$$
Recall = \frac{TP}{TP + FN}
$$

**Precision** thể hiện khả năng model dự đoán đúng nhãn X, các bạn để ý rằng trong công thức, thành phần khiến cho **Precision** tăng hay giảm không phải là **TP** mà là **FP**. Chính vì vậy khi **Precision** cao đồng nghĩa với việc **FP** nhỏ hay số nhãn dự đoán nhầm sang nhãn X là thấp.

**Recall** thể hiện khả năng model dự đoán không bị sót nhãn X, cũng như **Precision**, **Recall** phụ thuộc vào **FN** hay nói cách khác là nó phụ thuộc vào khả năng model dự đoán sai nhãn đúng ra là X.

Các bạn sẽ thắc mắc rằng vậy **TP** và **TN** không đóng vai trò gì ở đây sao ? Thực tế ngoài **Precision** và **Recall** còn có những metric tương tự (Chẳn g hạn Sensitive..) Nhưng chỉ với **Precision** và **Recall** chúng ta đã có thể tập trung vào giảm thiểu **FN** và **FP**. 2 thành phần khiến cho mô hình của ta dự đoán kém chính xác.

Điều ta mong muốn là cả Precision và Recall đều cao. Nhưng thật không may là luôn có trade-off giữa chúng, khi Precision cao thường kéo theo Recall thấp hơn và ngược lại. Lý do là bởi nếu Precision cao đồng nghĩa với việc model phải rất chắc chắn mới dám dự đoán là nhãn X, nhưng điều này lại khiến cho model bị dự đoán thiếu những dữ liệu thực sự là nhãn X. Ngược lại cũng tương tự. Vậy nên ta cần phải tổng hợp 2 metric này làm 1, để tuning model theo 1 hướng duy nhất mà không phải lo ngại quá coi trọng Precision hay Recall. Trong bài tiếp theo chúng ta hãy cùng tìm hiểu về F1-score, ROC và AUC

Tài liệu tham khảo và dịch từ website http://www.deeplearningbook.org/