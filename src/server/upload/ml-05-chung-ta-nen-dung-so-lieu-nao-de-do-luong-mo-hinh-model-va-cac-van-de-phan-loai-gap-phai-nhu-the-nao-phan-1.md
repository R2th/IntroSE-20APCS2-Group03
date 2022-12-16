Trong 2 bài viết trước chúng ta đã cùng nhau tìm hiểu về "tấm bia" - nơi ta đánh giá mô hình của mình tốt xấu ra sao. Hôm nay chúng ta tiếp tục bàn về "thước đo", cụ thể hơn là "thước đo" cho mô hình giải quyết những vấn đề phân lớp.
## 1. Accuracy (Độ chính xác):
Đây là cách đơn giản nhất để đánh giá mô hình của ta tốt xấu ra sao. Trong bài toán phân lớp "accuracy" hay "độ chính xác" được tính như sau:
$$
accuracy = \frac{\mathbf{number} \space of \space \mathbf{right  \space prediction}}{\mathbf{number} \space of \space \mathbf{data}}
$$
Chẳng hạn ta thử nghiệm trên 1000 dữ liệu, số lần mô hình dự đoán đúng trên 1000 dữ liệu kia là 912 thì có nghĩa là độ chính xác của mô hình trên tập dữ liệu đó là
$$
accuracy = \frac{912}{1000} = 91,2 \%
$$
Tuy nhiên accuracy trong một vài trường hợp, accuracy lại có những nhược điểm chết người. Để ý một chút rằng thay vì tính số lần dự đúng của mô hình, ta tính số lần dự đoán đúng trên từng nhãn. Chẳng hạn với ví dụ sau:
* Data: Số lượng data đưa vào test là **1000**, có **4** loại nhãn {0,1,2,3}
* Nhãn 0: dự đoán đúng **250**, số lượng nhãn 0: **300** chiếm 30% data
* Nhãn 1: dự đoán đúng **0**, số lượng nhãn 1: **100** chiếm 10% data
* Nhãn 2: dự đoán đúng **150**, số lượng nhãn 2: **200** chiếm 20% data
* Nhãn 3: dự đoán đúng **300**, số lượng nhãn 3: **400** chiếm 40% data
Theo công thức trên thì accuracy sẽ là:
$$
accuracy = \frac{250 + 0 + 150 + 300}{300 + 100 + 200 + 400} = \frac{700}{1000} = 70\%
$$
Bên cạnh đó accuracy xét riêng lẻ trên từng nhãn:
$$
accuracy(label \space 0) = \frac{250}{300} = 83.33\%
$$
$$
accuracy(label \space 1) = \frac{0}{100} = 0\%
$$
$$
accuracy(label \space 2) = \frac{150}{200} = 75\%
$$
$$
accuracy(label \space 3) = \frac{300}{400} = 75\%
$$
Accuracy trên từng nhãn ảnh hưởng tới accuracy của tất cả theo số lượng data mà nhãn đó chiếm trong cả tập. Chẳng hạn nhãn 0, chiếm 30% lượng data và có độ chính xác là 83.33% nên nó sẽ góp vào độ chính xác chung là 83.33% * 30% = 25%. Nói cách khác:
$$
accuracy(from \space label \space 0) = \frac{number \space of \space right \space prediction \space label \space 0}{number \space of \space label \space 0} * \frac{number \space of \space label \space 0}{number \space of \space data}
$$
Hay
$$
accuracy(from \space label \space 0) = \frac{number \space of \space right \space prediction \space label \space 0}{number \space of \space data}
$$
Thử lại với toàn bộ nhãn xem ta có ra được accuracy ban đầu không!
$$
accuracy = 83.33\% * 30\% + 0\% * 10\% + 75\% * 20\% + 75\% * 40\% = 70\%
$$
Điều này có nghĩa là "**độ chính xác**" ta có được trên từng nhãn, được tổng hợp lại thành 1 độ chính xác duy nhất đã bị ảnh hưởng bởi lượng phân bố dữ liệu trên các nhãn của tập dữ liệu test này. Hay nói cách khác, khi ta thay đổi tập dữ liệu test này với phân bố dữ liệu trên các nhãn một cách phù hợp, ta có thể đạt được nhiều độ chính xác rất khác nhau :(. Hơn nữa ngay cả khi lượng dữ liệu được phân bố một cách đồng đều trên các nhãn, độ chính xác giữa các nhãn cũng sẽ bù trừ cho nhau khiến cho dù hệ thống có độ chính xác khá tốt nhưng lại vô cùng tồi tệ khi đưa vào sử dụng. Giả dụ dữ liệu có 2 nhãn, 1 nhãn độ chính xác 100%, 1 nhãn 70% thì hệ thống sẽ có kết quả là 100% * 50% + 70% * 50% = 85%. Chưa kể nhiều khi ta khó có thể có được dữ liệu một cách đồng đều. Vậy nên có lẽ chúng ta cần metric khác tốt hơn.
## 2. Confusion matrix (Ma trận)
Trước khi tính đến việc dựa vào một metric cụ thể nào, ta cần phải có được một "báo cáo" cụ thể về model của mình. Dù cho nó có thể sẽ phức tạp, nhưng ta sẽ biết model đang sai nhiều ở đâu, đang dự đoán quá thiên về nhãn nào hay thậm chí có thực sự là nó đang "dự đoán" hay không ! **Confusion matrix** chính là bản báo cáo ta cần. Vậy xây dựng nó ra sao và nó mang những thông tin gì ? Hãy xem một **confution matrix** trông như thế nào !
```
 Total: 1000 | Predicted | Predicted | Predicted | Predicted  
                 |        as: 0  |        as: 1  |        as: 2  | as: 3  
-------------|-----------|-----------|-----------|-------
 True: 0         |         250   |         10        |         10        | 30
-------------|-----------|-----------|-----------|-------
 True: 1         |         30        |         0         |         20        | 50
-------------|-----------|-----------|-----------|-------
 True: 2         |         50        |         0         |         150   | 0
-------------|-----------|-----------|-----------|-------
 True: 3         |         0         |         50        |         50        | 300
```
Giống như ví dụ trong phần 1, ở nhãn 0 model dự đoán đúng 250/300, 50 trường hợp dự đoán sai bị nhầm sang các nhãn 1 (10 lần), nhãn 2 (10 lần) và nhãn 3 (30 lần). Matrix này cung cấp thông tin chi tiết cho ta biết được rằng model đang làm tốt ở đâu, sai nhiều ở đâu, hay giữa những nhãn nào hay gây nhầm lẫn..
Những ô có cùng nhãn là dữ liệu model của ta dự đoán đúng, nhưng ô còn lại là dự đoán sai. Tổng của đường chéo trong matrix trên chính là số dự đoán đúng trên tất cả các nhãn phục vụ tính accuracy trên cả model như ở tren. Ngoài việc cho ta biết model dự đoán đúng tốt ra sao nó còn cho ta biết mô hình dự đoán sai ở đâu và nhiều như thế nào.
Có một vấn đề nho nhỏ ta thấy ở đây là khi lượng dữ liệu thay đổi, dù cùng một model nhưng Confusion matrix cũng sẽ thay đổi. Chẳng hạn test trên tập có 1000 dữ liệu kết quả của từng ô có thể sẽ bị nhiều hơn 10 lần so với test trên tập có 100 dữ liệu. Vì vậy điều ta nên làm là chia tất cả các giá trị trong matrix cho số lượng dữ liệu. Như vậy kết quả sẽ tương quan nhau hơn khi test giữa các tập dữ liệu. Khi đó matrix của ta trở thành:
```
 Total: 1000 | Predicted | Predicted | Predicted | Predicted  
                 |        as: 0  |        as: 1  |        as: 2  | as: 3  
-------------|-----------|-----------|-----------|-------
 True: 0         |         0.25  |         0.01  |         0.01  | 0.03
-------------|-----------|-----------|-----------|-------
 True: 1         |         0.03  |         0         |         0.02  | 0.05
-------------|-----------|-----------|-----------|-------
 True: 2         |         0.05  |         0         |         0.15  | 0
-------------|-----------|-----------|-----------|-------
 True: 3         |         0         |         0.05  |         0.05  | 0.3
```
Lúc này thông tin trong matrix luôn nằm trong khoảng [0,1]. Điều này rất tiện cho việc so sánh. Nhưng ở đây vẫn có một vấn đề như khi ta làm việc với accuracy, đó là nếu như chia các thông số trong matrix cho số lượng dữ liệu tức là ta lại vướng vào việc để cho phân bố dữ liệu giữa các nhãn ảnh hưởng tới kết quả. Cái ta cần ở đây là độ chính xác trên từng nhãn, việc đoán sai trên từng nhãn, chứ không phải trên cả tập dữ liệu. Nên để đảm bảo việc đó, thông số dự đoán trên từng nhãn nên chỉ phụ vào lượng dữ liệu của nhãn đó mà thôi ! Để ý rằng lượng dữ liệu của một nhãn chính là tổng của 1 dòng trong matrix. Vậy nên thay vì chia cho số lượng dữ liệu, ta chia các thông số cho tổng giá trị trên dòng của nó. Cụ thể:
```
 Total: 1000 | Predicted | Predicted | Predicted | Predicted  
                 |        as: 0  |        as: 1  |        as: 2  | as: 3  
-------------|-----------|-----------|-----------|-------
 True: 0         |         0.83  |         0.03  |         0.03  | 0.1
-------------|-----------|-----------|-----------|-------
 True: 1         |         0.3   |         0         |         0.2   | 0.5
-------------|-----------|-----------|-----------|-------
 True: 2         |         0.25  |         0         |         0.75  | 0
-------------|-----------|-----------|-----------|-------
 True: 3         |         0         |         0.125 |         0.125 | 0.75
```
Trước khi chuẩn hóa như matrix thứ 3, thì kết quả trên matrix thứ 2 cho thấy mô hình dự đoán rất tốt trên nhãn 0 (0.25) kém hơn so với nhãn 3 (0.3) và tốt hơn nhiều so với nhãn 2 (0.15). Nhưng khi đánh giá trên từng nhãn như matrix thứ 3 thì kết quả đã rất khác, cả 3 nhãn 0,1,3 đều được dự đoán tốt na ná nhau. Nhãn duy nhất ta cần lo lắng là nhãn 2. Vậy việc chuẩn hóa như matrix thứ 3 đem lại nhiều thông tin và tránh gây hiểu lầm hơn so với 2 matrix đầu tiên.
Tuy nhiên vì nó là thông tin chi tiết, nên ta rất khó để so sánh giữa các model khác nhau. Vậy nên với những thông tin này, việc ta cần làm là tổng hợp chúng thành các metric, hoặc 1 metric duy nhất là tốt nhất. Từ đó ta mới có thể so sánh giữa các model. Trong bài viết tiếp theo chúng ta sẽ đi vào tìm hiểu xem các metric nào được tổng hợp từ Confusion matrix, và sử dụng chúng trong quá trình đánh giá mô hình. Hẹn gặp lại các bạn trong bài tiếp theo .

Tài liệu tham khảo và dịch từ website http://www.deeplearningbook.org/