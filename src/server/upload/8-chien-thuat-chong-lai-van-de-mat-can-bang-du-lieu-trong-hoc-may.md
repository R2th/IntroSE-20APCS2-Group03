# Abstract

Chắc hẳn đối với ai làm việc với dữ liệu đều sẽ gặp ít nhất một vài lần với vấn đề mất cân bằng dữ liệu. Đây cũng là một vấn đề rất quan trọng đối với các bài toán học máy. Vậy mất cân bằng dữ liệu là gì?

Mất cân bằng dữ liệu (Imbalanced dataset) là tập dữ liệu có tỷ lệ categories khác nhau, thường là chênh nhau khá xa. Ví dụ dữ liệu y tế, chắc hẳn dữ liệu về một số bệnh sẽ có nhiều mẫu âm tính nhiều hơn nhiều so với mẫu dương tính, có thể lên tới tỷ lệ 98%-2%. Điều này ảnh hưởng rất lớn tới mô hình dự đoán, khi mà sự mất cân bằng như vậy sẽ khiến mô hình dự báo kém chính xác trên nhóm thiểu số, bởi đa phần kết quả dự báo thường thiên về 1 nhóm là nhóm đa số

Vậy đứng trước vấn đề mất cân bằng dữ liệu, chúng ta phải xử lý thế nào. Khi mình google search thì ra khá là nhiều giải pháp, kết quả, có cả code ví dụ luôn :D. Tuy nhiên mình bắt gặp một bài viết thiên về kiểu lý giải nhiều hơn, của nước ngoài và đọc khá là dễ hiểu. Vậy để mình chia sẻ kiến thức mình đọc được nhé. 

# 8 chiến thuật cho mất cân bằng dữ liệu

## 1. Thu thập thêm dữ liệu
Đây có thể là điều mà ai cũng nghỉ tới đầu tiến, có thể nghe khá là điên rồ bởi nếu bạn có thể thu thập được thêm thì đã chẳng google search. 

Bình tĩnh lại nào, việc thu thập dữ liệu ở đây phần lớn thường bị bỏ qua vì cho rằng không thể.  Tuy nhiên, có thể có nhiều cách, thử suy ngẫm xem liệu bạn có thể thu thập thêm dữ liệu không?

## 2. Thử thay đổi Metric đánh giá

Nếu các bạn chưa hiểu hay chưa nắm rõ về các metric đánh giá thì có thể đọc thêm ở[ đây](https://viblo.asia/p/danh-gia-cac-mo-hinh-hoc-may-RnB5pp4D5PG)  (Cũng là một bài viết của mình :D)

Trong các độ đo, chắc hẳn các bạn từng nghe đến độ đo Accuracy, khá là phổ biến trong các bài toán học máy. Hiểu đơn giản là độ đo này sẽ tính tỷ lệ số mẫu được dự đoán đúng trên toàn bộ số mẫu cần dự đoán. 

Hmm, Với một bài toán cho dữ liệu là 10000 mẫu là A, 100 mẫu là B, coi như ta chia ra 2 tập train và test với tỷ lệ 7-3, vậy ta sẽ đánh giá trên tập dữ liệu gồm 3000 mẫu A và 30 mẫu B. Tất nhiên khi mô hình học với dữ liệu mất cân bằng thế kia sẽ nghiêng về dự đoán là A nhiều hơn rồi. Vậy giả sự mô hình dự đoán tất cả đều là A, lúc này Accuracy sẽ đạt được là 3000/3030 ~ 99%. Vâng các bạn không nghe nhầm đâu, mô hình dự đoán tệ kinh khủng mà độ chính xác đạt 99% =))

Ở bài viết này, mình khuyên bạn nên sử dụng một vài thước đo hiệu suất mô hình khác mà có thể đánh giá đúng mô hình dù có mất cân bằng dữ liệu đi chăng nữa. Có thể kể tới 1 số metrics đánh giá mô hình sau:

* Confusion Matrix
* Precision
* Recall
* F1 Score

Bên cạnh đó bạn cũng có thể sử dụng một số thước đo sau
* Kappa (https://en.wikipedia.org/wiki/Cohen%27s_kappa )
* Đường cong ROC

## 3. Thử lấy lại mẫu trong tập dữ liệu

Bạn có thể thay đổi dataset mà bạn sử dụng để xây dựng mô hình dự đoán để dữ liệu cân bằng hơn

Thay đổi này được gọi là lấy mẫu tập dữ liệu, có 2 phương pháp chính có thể sử dụng để tang đều các lớp
* Thêm bản sao của các mẫu từ lớp ít được đại diện, gọi là over sampling
* Xóa các cá thể khỏi lớp được đại diện quá mức, gọi là under-sampling

Những cách tiếp cận này thường dễ thực hiện và chạy nhanh. Có rất nhiều công cụ hỗ trợ việc này, bạn đọc có thể tham khảo thêm tại [đây](https://machinelearningmastery.com/random-oversampling-and-undersampling-for-imbalanced-classification/)

Trên thực tế bạn nên thử đồng thời cả 2 cách tiếp cận, vừa thêm vừa bớt, nghe có vẻ công bằng và hợp lý hơn ^^, xem độ chính xác có tốt hơn không

Về Over-sampling và Under-sampling, các bạn có thể đọc thêm bài viết của Wikipedia ở [đây](https://en.wikipedia.org/wiki/Oversampling_and_undersampling_in_data_analysis)

Một vài nguyên tắc chú ý:
* Cân nhắc thử nghiệm Under-sampling khi bạn có rất nhiều dữ liệu (~ 10 – 100k bản ghi hoặc hơn)
* Cân nhắc thử nghiệm Over-sampling khi bạn không có nhiều dữ liệu (<10k bản ghi)
* Xem xét thử nghiệm lấy theo random và non-random 
* Xem xét  thử nghiệm các tỷ lệ được lấy mẫu khác nhau (Thông thường với một bài toán, tỷ lệ 1:1 là khá hiếm, và bạn không cần nhắm tới tỷ lệ đó, thử các tỷ lệ khác xem sao, không quá mất cân bằng là được)

## 4. Thử tạo mẫu tổng hợp

Một  cách đơn giản để tạo ra mẫu tổng hợp là lấy ngẫu nhiên các thuộc tính từ cá thể trong lớp thiểu số

Bạn có thể lấy mẫu theo kinh nghiệm cá nhân hoặc sử dụng phương pháp như Naïve Bayes có thể lấy mẫu từng thuộc tính một cách độc lập. Có thể bạn sẽ có càng nhiều dữ liệu khác nhau, tuy nhiên tính phi tuyến giữa các thuộc tính là không được bảo toàn
Có nhiều thuật toán có hệ thống mà bạn có thể sử dụng để tạo ra các mẫu tổng hợp. Thuật toán phổ biến nhất được gọi là SMOTE (Synthetic Minority Over-sampling Technique). 

SMOTE hoạt động bằng các tạo ra các mẫu tổng hợp từ các lớp thiểu số thay cho việc tạo ra các bản sao. Thuật toán chọn 2 hay nhiều trường hợp giống nhau (sử dụng thước đo khoảng cách để so sánh) và xáo trộn một cá thể một thuộc tính tại một thời điểm bằng một lượng ngẫu nhiên trong khoảng chênh lệnh với các trường hợp lân cận

Bạn đọc có thể xem một bài viết khá chi tiết về phần này của tác giả Tô Đức Thắng ở [đây](https://viblo.asia/p/imbalanced-multiclass-datasets-Do754dmQ5M6)

## 5. Thử các thuật toán khác nhau

Tất nhiên không thể sử dụng 1 thuận toán cho mọi vấn đề. Phải là nhiều thuật toán cho 1 vấn đề nhất định sẽ tốt hơn

Câu quyết định thường hoạt động tốt trên các tập dữ liệu không cân bằng. Các quy tắc phân tách xem xét biến lớp được sử dụng trong việc tạo cây, có thể bắt buojc cả 2 lớp phải được giải quyết

Hãy thử một vài thuật toán cây quyết định phổ biến như C4.5, C5.0, CART và Random Forest 

## 6. Thử Penalized Models

Việc phân loại bị penalized gây ra một thêm một giá trị cost cho mô hình nếu mắc lỗi phân loại đối với lớp thiểu số trong mô hình phân loại (bị phạt, “lấy lại công bằng” cho lớp thiểu số). Những hình phạt này có thể làm mô hình sai lệch 1 chút để chú ý tới các lớp thiểu số

Một vài thuật toán điển hình như penalized-SVM, penalized-LDA 

Nên sử dụng hình phạt nếu bạn bị khóa trong một thuật toán cụ thể và không thể lấy mẫu lại hoặc nhận được kết quả kém, thì chiến thuật này cung cấp một cách để cân bằng các lớp. Việc thiết lập ma trận phạt có thể khá phức tạp và có thể phải thử nhiều hình phạt khác nhau để chọn ra hình phạt phù hợp với vấn đề mà bạn đang gặp phải

## 7. Thử một góc nhìn khác
Có những lĩnh vực, bài toán nghiên cứu dành riêng cho các bộ dữ liệu không cân bằng, có các thuật toán, biện pháp riêng

Có 2 thứ mà bạn có thể muốn xem xét, đó là phát hiện bất thường và phát hiện thay đổi
* Phát hiện bất thường là phát hiện các sự kiện hiếm, Ở đây ta có thể coi đó là ngoại lai. Việc thay đổi tư duy như vậy sẽ giúp bạn nghĩ ra những cách mới để tách và phân loại các mẫu
* Phát hiện thay đổi tương tự như phát hiện bất thường, ngoài trừ việc thay vì tìm sự bất thường thì nó tìm kiếm sự thay đổi hoặc khác biệt. Đây có thể là thay đổi trong hành vi người dùng, giao dịch, ….

Nói nghe khá là long vòng và không liên quan, tuy nhiên 2 sự thay đổi này có thể cung cấp cho bạn một cách nhìn, 1 cách suy nghĩ mới về vấn đề bạn gặp phải cũng như một số kĩ thuật bạn sẽ nghỉ tới để thử

## 8. Thử sáng tạo 
Cái gì lớn quá khó làm thì mình chia nhỏ ra mình làm. Đi sâu vào vấn đề bài toán và suy nghỉ về cách chia nhỏ nó thành những vấn đề nhỏ hơn để giải quyết

Ta có thể phân ra lớp lớn hơn thành một số lớp khác nhỏ hơn, điều này sẽ tăng số lượng classes, nhưng sẽ giải quyết được phần nào mất cân bằng dữ liệu

Bên cạnh đó là tham khảo một số thảo luận từ cộng đồng với các câu hỏi liên quan, mình khuyên bạn nên tra cả tiễng việt lẫn tiếng anh, nội dung sẽ phòng phú hơn. Mộ vài ví dụ về các câu hỏi liên quan vấn đề mất cân bằng dữ liệu đem lại thông tin vô cùng hữu ích 
* [In classification, how do you handle an unbalanced training set?](https://www.quora.com/In-classification-how-do-you-handle-an-unbalanced-training-set)
* [ Classification when 80% of my training set is of one class.](https://www.reddit.com/r/MachineLearning/comments/12evgi/classification_when_80_of_my_training_set_is_of/)

# Summary 
Tóm lại thì chúng ta không thể biết được cụ thể cách tiếp cận nào sẽ giải quyết vấn đề của mình cho tới khi mình thử và đánh giá kết quả. Vì vậy bắt tay vào thử thôi. Lời khuyên của mình là khi gặp một vấn đề, bạn nên thử đưa ra cho bản than một vài ý tưởng, hỏi bạn bè, hỏi trên các forum liên quan, tra google search, … thường thì 99% sẽ giải quyết được vấn đề ^^ 

Cảm ơn các bạn đã đọc đến đây, chúc mọi người cuối tuần vui vẻ!

# References 
* [ 8 Tactics to Combat Imbalanced Classes in Your Machine Learning Dataset](https://machinelearningmastery.com/tactics-to-combat-imbalanced-classes-in-your-machine-learning-dataset/)