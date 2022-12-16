Trong bài này mình sẽ giới thiệu sơ bộ về chứng chỉ Tensorflow Developer Certificate cùng với chia sẻ kinh nghiệm học và thi đỗ chứng chỉ này của mình
# 1. Giới thiệu về chứng chỉ Tensorflow Developer Certificate

TensorFlow là chứng chỉ được Google cấp cho các lập trình viên, kỹ sư máy tính, làm việc trong lĩnh vực trí tuệ nhân tạo và học máy. Từ tháng 3/2020, công ty này thông báo bắt đầu mở đơn cho mọi người cùng đăng ký và trải qua các vòng thi kiểm tra. Mục tiêu của chứng chỉ này là cung cấp cho tất cả mọi người trên thế giới cơ hội thể hiện kiến thức chuyên môn của họ về Machine learning trong một thị trường việc làm toàn cầu mà AI ngày càng chiếm vai trò quan trọng. 

Các developer vượt qua bài test có thể lựa chọn tham gia [Certificate Network của Google](https://developers.google.com/certification/directory/tensorflow), nếu tham gia thì thông tin của bạn sẽ được hiển thị trên trang web của chương trình, nghe cũng "oách" phết phải không nào :D Như vậy CV của bạn cũng sẽ có thêm một "điểm cộng", mức độ chuyên nghiệp cũng tăng lên nhiều.

Hiện tại thì liên quan đến Tensorflow mới chỉ có một chứng chỉ Tensorflow Developer Certificate này ở cấp độ 1 thôi. Nó kiểm tra kiến thức nền tảng của nhà phát triển về việc tích hợp học máy vào các công cụ và ứng dụng. Chương trình chứng chỉ yêu cầu hiểu biết về việc xây dựng các mô hình TensorFlow để giải quyết các bài toán về Computer Vision, Natural Language Processing, Time Series, vv.

Để làm bài thi, người tham gia cần có các kiến thức về: 

- Các nguyên lý nền tảng của Machine Learning và Deep Learning

- Xây dựng mô hình ML trong TensorFlow 2.x

- Xây dựng thuật toán nhận dạng hình ảnh (image recognition), phát hiện đối tượng (object detection), nhận dạng văn bản (text recognition) với deep neural networks và convolutional neural networks.

- Sử dụng hình ảnh trong thế giới thực với các hình dạng và kích thước khác nhau để trực quan hóa hành trình của một hình ảnh qua các lớp convolutions để hiểu cách máy tính “nhìn thấy” thông tin, thế hiện loss và accuracy của mô hình trên đồ thị 

- Thực hiện các biện pháp ngăn chặn tình trạng overfitting, bao gồm augmentation và dropouts

- Áp dụng neural network để giải quyết các bài toán về NLP bằng TensorFlow

# 2. Một số thông tin về thi và nhận kết quả thi mà có thể bạn quan tâm
- **Lệ phí thi?** 100 USD
- **Thời gian làm bài thi?** tối đa 5 tiếng. Bạn có thể nộp bài trước thời gian, hoặc đến hết thời gian bài thi sẽ được tự động submit. Nghe thì có vẻ căng thẳng nhưng cũng không đến mức bạn phải ngồi trước màn hình máy tính suốt 5 tiếng đồng hồ. Bạn có thể tranh thủ lúc mô hình đang train để làm một cốc cafe chẳng hạn :D 
- **Số câu trong đề thi?** 5 câu, mức độ từ dễ đến khó, bài dễ nhất có thể không mất đến 10 phút. Phạm vi kiến thức bao gồm mạng Neural network cơ bản, image classification, text classification, time series prediction. 
- **Thời gian tổ chức thi?** bất cứ khi nào, chỉ cần sắp xếp được khoảng 5-7 tiếng thời gian có thể tập trung và không bị làm phiền là bạn có thể đăng ký thi rồi :D 
- **Hình thức chấm điểm?** sau khi train model và save xong sẽ có chỗ để submit, hệ thống sẽ check và trả về điểm luôn. Thang điểm của mỗi câu là 5 nhưng mỗi câu sẽ có hệ số khác nhau.
- **Bao nhiêu điểm thì đỗ?** Cái này không có trong hướng dẫn hay các tài liệu chính thức khác nhưng mình có đọc được [bài báo](https://www.infoq.com/news/2020/03/google-tensorflow-certification/) nói rằng điểm pass là 90%. 
- **Nếu trượt thì sao?** Thì bạn sẽ mất lệ phí thi mà mình đã đóng và phải có thời gian chờ trước khi làm lại bài thi. Lần đầu fail thì sẽ phải chờ 2 tuần, sau đó lần lượt là 2 tháng và 1 năm mới có thể đóng lệ phí và thi lại.
- **Sau bao lâu thì có kết quả?** Sau khi nộp bài không lâu (trong trường hợp của mình là khoảng 5 phút) thì hệ thống sẽ gửi email báo kết quả đỗ/ trượt cho bạn. Chứng chỉ dạng digital được thông báo là sẽ đến trong vòng 2 tuần, nhưng mình hôm sau đã nhận được rồi. 
- **Không có máy cấu hình mạnh, GPU thì có thi được không?** Vô tư, phần lớn các câu trong bài thi được mình train trên CPU, một phần nhỏ trên Colab và cũng không mất quá nhiều thời gian

# 3. Kinh nghiệm học và thi của mình

**Đầu tiên phải nói về background của mình**. Mình không tốt nghiệp đại học ngành liên quan đến CNTT mà là sinh viên kinh tế, cũng chỉ tập code python và làm quen với AI khoảng 1-1.5 năm trở lại đây thôi. Trong khoảng thời gian làm công việc có liên quan đến AI thì mình có làm quen với Tensorflow và Keras nhưng thỉnh thoảng lại bị đứt quãng. Sau nhiều lần trì hoãn thì cuối tháng 6 vừa rồi mình mới tiến hành làm bài thi và tổng thời gian ôn thi nghiêm túc của mình là khoảng 1 tháng :cry:

**Đánh giá của mình về bài thi:** đề bài thật sự không khó nếu bạn đã ôn theo syllabus trong handbook của ban tổ chức và **bỏ thời gian học khóa học được recommend trên Coursera**. Bài thi không yêu cầu lập đồ thị tính toán phức tạp hay dùng các kỹ thuật khủng khiếp gì mà chỉ cần biết xử lý dữ liệu dạng ảnh và text bằng các công cụ của Tensorflow, cộng với hiểu và biết cách dùng **Keras** để xây dựng các mạng neural network, convolutional neural network, LSTM khá cơ bản, một số công cụ tránh overfit như augmentation, dropout là có thể làm được rồi.

**Học:** Mình học theo khóa DeepLearning.AI TensorFlow Developer Professional Certificate trên [Coursera](https://www.coursera.org/professional-certificates/tensorflow-in-practice). Khóa học chia thành 4 khóa nhỏ hơn, mỗi khóa nhỏ tương đương với 1-2 vấn đề cần cover trong bài thi. Trong bài giảng thầy cũng không đi sâu vào phần toán mà chủ yếu là cho học viên nắm bắt được khái niệm cũng như hướng dẫn xử lý dữ liệu, xây dựng mô hình trên colab. Phần mô hình được hướng dẫn bằng Keras nên rất dễ học và sử dụng. Do vậy người mới hoặc không mạnh về toán vẫn hoàn toàn có thể theo học được. Thời gian để theo học hết cả 4 khóa mất khoảng 2-3 tuần tùy vào mức độ đầu tư của bạn. 

Mỗi khóa trong 4 khóa học nhỏ được free trial tuần đầu tiên và có mức học phí là 49 usd/ tháng kể từ tuần thứ 2. Tuy nhiên bạn có thể cố gắng tập trung học hết 1 khóa trong vòng 1 tuần (bỏ ra 2-3 tiếng một ngày thì việc này hoàn toàn có thể làm được) thì sẽ không mất học phí và còn được cấp chứng nhận hoàn thành khóa học trên Coursera. (Hoặc nếu các bạn sinh viên không có nhiều thời gian, không quá quen thuộc với các kiến thức được giới thiệu hoặc các lý do khác dẫn đến thời gian học kéo dài, thì các bạn có thể "cân nhắc" lựa chọn audit course, tức là được xem miễn phí các nội dung bài giảng và bài đọc, nhưng không được truy cập các phần chấm điểm như Quiz hoặc bài assignment cuối tuần. Với các khóa trong phạm vi bài này thì mình thấy làm vậy không ảnh hưởng gì lắm.) Nói chung chỉ cần nắm chắc nội dung khóa học này thì bạn có thể tự tin đi thi rồi :D

Kinh nghiệm của mình là ngoài ghi chép trong khi nghe giảng ra thì mình **làm một file Colab code lại các bài được hướng dẫn trong quá trình học**. Cái này giúp ích khá nhiều vì bên cạnh việc giúp ôn lại kiến thức, chúng mình có thể lấy nó ra để tham khảo khi đang code thì ... quên mất câu lệnh hoặc không chắc chắn về cách thiết lập các lớp trong mô hình, chẳng hạn, mà không cần phải tìm kiếm google hoặc tìm lại trong nội dung bài giảng.

**Thi:** Để đăng ký thi thì bạn cần có thẻ thanh toán quốc tế (Visa, MasterCard, vv.) để thanh toán lệ phí thi và cần chuẩn bị sẵn hình chụp hộ chiếu hoặc căn cước công dân. ảnh chân dung. Trước đó thì bạn có thể cài môi trường PyCharm và các package cần thiết theo hướng dẫn để quá trình thi diễn ra suôn sẻ. Việc đăng ký thi và thiết lập, làm quen với môi trường mất khoảng 1-2 tiếng. Đăng ký thi xong bạn cũng có thể từ từ cài đặt chứ không nhất thiết phải thi luôn.

Vì bài thi có nhiều câu nên bạn có thể kết hợp training trên môi trường của bài thi và train trên Colab để tiết kiệm thời gian. Có thể làm song song, trong lúc code hoặc tùy chỉnh mô hình B thì mô hình A đang được train rồi. Train trên Colab xong thì chỉ cần save model vào file .h5 rồi copy lại vào PyCharm rồi submit là được :D Nếu máy cá nhân không mạnh thì nên train trên Colab sẽ đạt kết quả tốt hơn. 

Tạm thời mình mới nghĩ ra có chừng này, nếu có gì mới mình sẽ cập nhật ngay tại bài này và nếu có câu hỏi gì các bạn cũng có thể trao đổi với mình tại đây nhé ^^

# 4. Các link và tài liệu cần thiết

- Trang chủ, trang đăng ký thi: https://www.tensorflow.org/certificate
- Sổ tay về chứng chỉ, những nội dung kiến thức cần thiết tất cả đều có trong: https://www.tensorflow.org/extras/cert/TF_Certificate_Candidate_Handbook.pdf
- Hướng dẫn cài đặt môi trường: https://www.tensorflow.org/extras/cert/Setting_Up_TF_Developer_Certificate_Exam.pdf
- Link khóa học trên Coursera: https://www.coursera.org/professional-certificates/tensorflow-in-practice
- Github các bài code trong khóa học: https://github.com/lmoroney/dlaicourse