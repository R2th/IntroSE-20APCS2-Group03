**Lưu ý**: những thuật ngữ Tiếng Anh không dịch sang Tiếng Việt vì nó không sát nghĩa, và để Tiếng Anh sẽ giúp người đọc làm quen với thuật ngữ Tiếng Anh, giúp cho việc sau này tiếp cận tài liệu Tiếng Anh một cách dễ dàng hơn.

## TL;DR
Giới thiệu cách tốt để tiếp cận Machine learning (ML) dễ dàng và giới thiệu qua các vấn đề cơ bản ML giải quyết.

## Bài viết này dành cho ai?

- Người chưa biết gì về Machine Learning
- Người mới bắt đầu tìm hiểu về Machine Learning
- Người học Machine Learning mãi mà chưa hiểu
- Người biết Machine Learning rồi nhưng chưa tự tin
- Người muốn học Machine Learning nghiêm túc

## Trở ngại khi học ML

Để có cách tiếp cận đúng đắn, đầu tiên, ta xem xét các trở ngại là gì trước. 

Machine learning được dạy trong các trường đại học cùng mục đích nghiên cứu, Machine learning rất khô khan và sử dụng nhiều toán. Phần toán có thể kế đến như đại số tuyến tính(Linear algebra), lý thuyết xác suất và thống kê (Probability theory and statistic), giải tích (Calculus), thuật toán và tối ưu (Algorithm and optimization), vv. ML được xây dựng dựa trên nền tảng toán học sâu sắc và phức tạp. Cho nên mặc định rằng bản thân cần có strong background về toán để vượt qua trở ngại này.

![trở ngại học machine learning](https://hocmachinelearning.com/static/4503e7ade2b55b7babb415bd663f4193/ddb38/tro-ngai-hoc-ml.jpg)

Tuy vậy, bản chất toán học không làm một thứ bình thường trở nên cao siêu hơn mà ngược lại, nó là công cụ để ta biểu diễn gọn hơn cũng như dễ dàng đào sâu hơn. Vì thế, mọi thứ phức tạp trong ML bao gồm phần toán học đều có thể diễn giải một cách đơn giản được. Khi được làm đơn giản hóa đi thì bất cứ ai cũng có thể hiểu được và vượt qua trở ngại này.

> "If you can't explain it simply, you don't understand it well enough"
> _Einstein

Thế giới đã có nhiều người trình bày lại các khái niệm toán học một cách vô cùng dễ hiểu mặc dù những khái niệm đó rất phức tạp. Có thể kể đến như `3Blue1Brown` hay [`BetterExplained`](https://betterexplained.com/) là những người rất xuất sắc trong việc làm đơn giản hóa khái niệm, dùng hình ảnh để tạo tính trực quan, và dùng những thứ tương đồng đã biết để diễn dãi thứ chưa biết. Họ làm rất xuất sắc.

Machine Learning chắc chắn cũng có thể diễn dãi bằng một cách nào đó dễ hiểu và ai cũng có thể học được, cho nên sự phức tạp của ML không phải là trở ngại lớn. 

![trở ngại học machine learning](https://hocmachinelearning.com/static/c4fbd6c72a18b48e9fd55576b41847a5/ddb38/tro-ngai-hoc-ml-2.jpg)

Vấn đề còn lại là cách tiếp cận ML của người học, nếu cách tiếp cận không khoa học có thể gây cho người đọc sự chán nản, khó khăn.

## Cách tiếp cận 

Thông qua trao đổi với nhiều bạn bè của tôi và nhiều người học ML khác, tôi rút ra được có 2 cách chính để tiếp cận ML:

- **Cách 1: Học đến đâu chắc đến đấy**, người học muốn thành thạo từng phần rồi mới chuyển qua phần khác. Học ML thì học chắc đại số, xong chắc giải tích, xong chuyển qua xác suất thống kê... cuối cùng mới chuyển qua học chắc lần lượt các model classification, regression, vv. Cách này giúp cho người học nắm vững căn bản và xây dựng một nền tảng tốt. Đây cũng là cách đào tạo bài bản của các trường đại học. Tuy nhiên, cách này phải đầu tư thời gian và công sức cũng như sự kiên trì theo đuổi. 

- **Cách 2: Từ khái quát đến cụ thể**, hay còn gọi là top-down, đối với cách này, người học sẽ không yêu cầu nền tảng toán học vững chắc ngay từ đầu để tiếp cận vào vấn đề, ngay từ đầu, người học ứng dụng ML để giải quyết vấn đề, cuối cùng mới đi vào cụ thể lý thuyết đằng sau. Với cách tiếp cận này, ngay từ đầu ta đã mừng tượng được ML là cái gì đó, giải quyết được một vấn đề gì đó. Điều đó giúp trong suy nghĩ của ta luôn thông, nó thôi thúc trí tò mò tìm hiểu chi tiết hơn đến một mức ta mong muốn. 

Phương pháp từ khái quát đến cụ thể chấp nhập coi một cái chưa biết là hộp đen. Hộp đen có input, output và chức năng của nó. Chỉ cần biết điều đó là ta đã ứng dụng được hộp đen vào giải quyết vấn đề. So với cách 1 thì cách 2 active hơn, tiếp cận nhanh hơn và dễ hơn. Đặc biệt phù hợp với những người trái ngành, muốn bắt đầu với ML mà chưa có căn bản.

![cách tiếp cận ml](https://hocmachinelearning.com/static/e67507a9ed60e8cb984983537715af93/fdf4b/cach-tiep-can.jpg)

Như mô tả ở hình minh họa trên, tiếp cận ML theo phương pháp từ khái quát đến cụ thể sẽ bao gồm nhiều level. Cứ sau mỗi level, bức tranh về ML lại càng dần dần rõ ra và ở level nào ta cũng có cái nhìn tổng quan về tổng thế ML. Cụ thể như sau:

- Level đầu tiên là nhìn khái quát bức tranh tổng thể ML từ top. Có 5 mức độ nhận thức: (1) không biết cái ta chưa biết; (2) biết cái ta chưa biết; (3) biết cái ta muốn biết; (4) biết cái ta đã biết; và (5) không biết cái ta đã biết - mức độ thượng thừa. Trước level đầu tiên, ta ở mức (1) là không biết cái gì trong ML cả, thậm chí không biết sự tồn tại của ML, sau level đầu tiên, nhận thức về ML ở mức (2) và (3) là biết cái ta chưa biết cũng như biết cái ta muốn biết. Điều này cực kỳ quan trọng!

- Level Tiếp theo có thể kể đến là sử dụng công cụ có sẵn để thử cách hoạt động của một số Model trong ML, để biết được model giải quyết vấn đề gì, ứng dụng vào đâu. Ở level này, ta có thể là đào sâu hơn một tí về tùy chỉnh model, chẳng hạn thay đổi các tham số, để khảo sát model phụ thuộc như thế nào vào tham số. Các công cụ để sử dụng model hiện nay phổ biến nhất là Python Sklearn, đối với các model phức tạp hơn thì có các framework như Pytorch, Tensorflow 2.0, Keras, Cafe, thậm chí Matlab. Ở mức độ này, người học có thể tham gia các cuộc thi hackathon, kaggle để giao lưu, cọ sát. Người học cũng có thể catch up với các bài viết kiểu "mỳ AI".

- Level tiếp theo nữa là đào sâu lý thuyết đằng sau. Lưu ý rằng ở 2 level đầu người học chỉ là người sử dụng tool không hơn không kém. Tuy nhiên, trải qua 2 level đầu, nó cung cấp cho ta những mừng tượng nhất định giúp cho ta dễ dàng nắm bắt lý thuyết, giải thích ý nghĩa từng thành phần trong lý thuyết. Ở mức độ này ta có thể catch-up với tình hình AI trên thế giới, đọc tin update những model mới (SOTA) của các nhà nghiên cứu khác trên thế giới. https://paperswithcode.com/ là một trang khá hay để theo dõi. Ngoài ra còn còn có thể subscribe những kênh newsletter về AI như https://jack-clark.net/ để được cập nhật chi tiết về AI hằng tuần.

- level cuối là tìm hiểu cặn kẽ tính chất từng thành phần trong model, hiểu nó ảnh hưởng như thế nào đến model, vì sao người ta lại lựa chọn nó, thay đổi các thành phần để phù hợp với data, xây dựng model tương tự để giải quyết vấn đề khác, vv. Ở level này tương đương với level của scientist.

Nếu như từ đầu có người chỉ cho tôi phương pháp này, có lẽ tôi đã không phí mất hơn 1 năm. Do đó, tôi hy vọng phương pháp này sẽ có ích cho bạn và giúp bạn không lãng phí thời gian như tôi.

## Tổng quát về ML

Trong bài này, ngoài trình bày phương pháp tiếp cận ML dễ dàng. Tôi trình bày luôn sơ qua một chút về ML.

> ML là thuật toán của thuật toán. 

Thế giới của chúng ta có vô vàn thông tin (data) D, cũng như các vấn đề (Problem) P. Để giải quyết vấn đề P, ta sử bộ não của mình phân tích data D để rút ra các luật lệ (Rule) R, sau đó đưa các luật lệ R này vào thuật toán (Algorithm) A. Đây là cách cổ điển.

ML là cách rút gọn một bước: từ data D ta tạo ra một thuật toán đặc biệt gọi là mô hình (Model) M, M thực hiện quan sát (train) trên thông tin data D và tự đưa ra các luật lệ R mà không cần con người. Tóm lại, ML là việc ta tạo ra model M có thể học trên dữ liệu D để giải quyết vấn đề P. Khi nhắc đến ML là phải nhắc đến data.

Người ta hay chia ML thành các loại theo cách học của model: Supervised Learning, Unsupervised Learning, Semi-Supervised learning, Reinforcement Learning. Tuy nhiên, chia theo chức năng sẽ dễ nhớ hơn. Trong hộp công cụ sửa xe có thể kể đến là kìm, cờ lê, tuốc vặn ốc, bơm. Ta nhớ đến chúng không phải bằng cách chúng có chất liệu gì và được tạo ra bằng cách nào. Ta nhớ đến chúng dễ dàng nhất bằng cách nhớ công dụng của chúng. Cách chia theo công dụng là dễ đi vào lòng người nhất.

![ml cheatsheet](https://hocmachinelearning.com/static/5caa3519b2074f51b04645558b88bfb2/eea4a/ml-cheatsheet.jpg)

Trong cuộc sống, cheatsheet như thế này cũng giống như cafe, bình thường như hiệu quả cao! 
Tải bản pdf [tại đây](https://hocmachinelearning.com/0a6474d4442aa1881990a211da57b6d0/ml-cheatsheet.pdf)

Lưu ý đối với data, trong data sẽ có nhiều mẫu (sample) tương ứng với 1 điểm dữ liệu ở trong data. Mỗi điểm dữ liệu sẽ gồm nhiều thông tin đặc trưng, mỗi thông tin đó được tính là 1 chiều dữ liêu. Ví dụ, MNIST là bộ dữ liệu chữ viết tay bao gồm 70 ngàn ảnh kích thước 28x28, vậy mỗi ảnh trong mnist sẽ là 1 điểm dữ liệu, mỗi pixel là một chiều dữ liệu. Mỗi điểm dữ liệu có 28*28 = 784 chiều dữ liệu.

Machine learning chia theo chức năng bao gồm:

- Phân loại (classification): model phân loại,  ví dụ data là tập ảnh chó mèo đã phân loại ra `ảnh chó` hoặc `ảnh mèo`, cho 1 bức ảnh mới, phân loại ảnh mới này là ảnh chó hoặc ảnh mèo. 
- Hồi quy (regression): model tìm ra mối quan hệ giữ các điểm trong dữ liêu. ví dụ, data là dữ liệu giá nhà các năm vừa rồi cũng như thông số của căn nhà đó, bài toán là cho thông tin một ngôi nhà mới, dự đoán giá của căn nhà đó. Thông tin ngôi nhà và giá nhà sẽ có mối quan hệ nào đó, chẳng hạn linear, ta có thể áp dụng model linear regression cho bài toán này để tìm ra tham số cụ thể.
- Tạo đề xuất (Recommendation): model giải quyết bài toán về đễ xuất, ví dụ thường gặp là các website bán hàng đề xuất các sản phẩm tương tự cho bạn.
- Phân cụm (Clustering): Model phân cụm dữ liệu, ví dụ cho một nhóm người có chiều cao nhất định, phân nhóm ra K nhóm sao cho những người cùng 1 nhóm có chiều cao ít lệch nhau nhất, tìm ra K và các thành viên trong K nhóm.

4 bài toán cơ bản nhất của ML, nhưng trong 4 bài toán này, mỗi bài toán lại có vài đến chục model khác nhau. Mỗi model có ưu, nhược điểm khác nhau.
Đừng choáng ngợp vì quá nhiều model, hãy nhớ cách tiếp cận của ta là tổng quát đến chi tiết, ta cứ nhớ tên model và bài toán nó giải quyết trước, chấp nhận nó như hộp đen. Ta sẽ dần đập hộp các hộp đen đó trong các phần tiếp theo.

## Kết luận

Vậy là ta đã biết cách tiếp cận ML hiệu quả, có cái nhìn tổng quan về các vấn đề ML có thể giải quyết cũng như tên các model để giải quyết chúng. Nếu bạn đọc có cách tiếp cận nhanh hơn, hiệu quả hơn, xin vui lòng chia sẻ.

nguồn: [hocmachinelearning.com](https://hocmachinelearning.com/cach-tiep-can-machine-learning)