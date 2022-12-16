<div align="justify">
Đầu tiên chắc hẳn mọi người đã rất quen thuộc với những mô hình học máy , tuy nhiên chắc hẳn vài lần khi đọc những bài báo hay nghiên cứu tài liệu ở đâu đó chúng ta bắt gặp cụm từ "mô hình thống kê". Và thực sự khá mơ hồ về việc phân biệt hai mô hình này. Mục đích của bài viết này sẽ giúp chúng ta hình dung rõ hơn sự khác biệt của chúng dựa trên những nguồn tài liệu tham khảo khác. <br>
Có khá nhiều ý kiến về chủ đề này và sau đây là một câu nói khá phổ biến:
</div>

>"Sự khác biệt chính giữa học máy và thống kê là mục đích của chúng. Mô hình học máy được thiết kế để đưa ra những dự đoán chính xác nhất có thể, còn mô hình thống kê được thiết kế để suy luận về mối quan hệ giữa các biến." <br> 

<div align="justify">
Câu nói trên về mặt kỹ thuật là khá chính xác tuy nhiên nó chưa được rõ ràng lắm. Vì thế chúng ta cùng đi tìm hiểu sâu hơn về sự khác biệt giữa hai loại mô hình này. <br><br>
Đầu tiên, chúng ta cần biết rằng thống kê và mô hình thống kê không giống nhau. Thống kê là một nghiên cứu toán học về dữ liệu. Chúng ta không thể thống kê nếu không có dữ liệu. Trong khi đó một mô hình thống kê là mô hình cho dữ liệu được sử dụng để suy ra điều gì đó về các mối quan hệ bên trong dữ liệu hoặc để tạ ra một mô hình có thể dự đoán các giá trị trong tương lai. <br>
Như vậy có hai vấn đề cần thảo luận là: thống kê khác học máy như nào và mô hình thống kê khác mô hình học máy như nào ? Và bài viết này chỉ tập trung vào vấn đề thứ hai. <br>
Để làm mọi thứ rõ ràng hơn thì một vài mô hình thống kê có thể đưa ra dự đoán tuy nhiên khả năng dự đoán chính xác không phải điểm mạnh của chúng.<br>
Tương tự thế những mô hình học máy cung cấp những mức độ diễn giải khác nhau. Từ những mô hình có khả năng diễn giải cao như lasso regression cho tới ít khả năng diễn giải hơn như neural networks, nhưng chúng thường hy sinh khả năng diễn giải để đổi lại cho sức mạnh về dự đoán.<br>
Chúng ta hãy xem xét ví dụ về hồi quy tuyến tính để hiểu rõ hơn: <br>
</div>

![](https://images.viblo.asia/b3aa6a13-2f17-4dbd-b575-b4ac9ceecc4c.PNG) <br>
<div align="justify">
Hồi quy tuyến tính là một phương pháp thống kê, chúng ta có thể huấn luyện một bộ hồi quy tuyến tính và thu được kết quả tương tự như một mô hình hồi quy thống kê nhằm giảm thiểu sai số bình phương giữa các điểm dữ liệu.<br>
Chúng ta hãy cùng xem xét một trường hợp mà chúng ta hay làm đó là huấn luyện mô hình, tức là chúng ta cho mô hình học dựa trên training data mà chúng ta không biết nó tốt như thế nào cho đến khi chúng ta sử dụng tập test, đó chính là chúng ta đang sử dụng machine learning model và mục đích của nó là đạt được kết quả tốt nhất trên tập test. <br>
Còn đối với mô hình thống kê thì sao? chúng ta sẽ đi tìm một đường mà tối thiểu hóa lỗi bình phương trên toàn bộ dữ liệu, giả sử rằng dữ liệu tuân theo hồi quy tuyến tính và có thêm một số nhiễu. Với phương pháp này thì chúng ta không cần sử dụng đến tập train và tập test. Trong nhiều trường hợp đặc biệt là trong nghiên cứu, mục đích của mô hình thống kê là mô tả mối quan hệ giữa dữ liệu và biến kết quả chứ không phải là để đưa ra dự đoán về dữ liệu trong tương lai. Tuy vậy,mô hình thống kê vẫn có thể được sử dụng để đưa ra dự đoán và đây có thể là mục đích của chúng ta, tuy nhiên các mô hình được đánh giá sẽ không liên quan đến tập test mà thay vào đó sẽ liên quan đên việc đánh giá ý nghĩa và độ chắc chắn của các tham số mô hình.  Việc cả mô hình học máy và mô hình thống kê tạo ra cùng một kết quả là nguyên nhân mà người ta hay cho rằng chúng giống nhau.<br><br>
    
**Vậy sử dụng mô hình nào thì tốt hơn?** <br>
Điều này tùy thuộc vào mục đích sử dụng của bạn. Nếu bạn muốn tạo một thuật toán có khả năng dự đoán giá nhà với độ chính xác cao, hay sử dụng dữ liệu để xác định xem ai đó có khả năng mắc một số loại bênh hay không thì học máy là một cách tiếp cận tốt. Nếu bạn đang cố gắng tìm hiểu mối quan hệ giữa các biến hoặc là suy luận từ dữ liệu thì mô hình thống kê có thể là cách tiếp cận tốt hơn.<br>
Như vậy nếu bạn không có một nền tảng mạnh về thống kê, bạn vẫn có thể học và sử dụng machine learning một cách khá dễ dàng. Tuy nhiên khi đào sâu vào học máy để diễn giải và có những suy luận hợp lý thì kiến thức thống kê rất quan trọng.<br><br>
</div>

![](https://images.viblo.asia/4bc90107-3117-4c35-ac4a-0297f65e51d7.jpg) <br>
**Thanks for reading!**<br>

Tài liệu tham khảo: 
* https://towardsdatascience.com/the-actual-difference-between-statistics-and-machine-learning-64b49f07ea3